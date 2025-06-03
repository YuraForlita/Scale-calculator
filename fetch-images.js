document.getElementById("fetchImagesBtn").addEventListener("click", async () => {
  const input = document.getElementById("productLinkInput").value.trim();
  if (!input) return alert("Введіть посилання або код товару");

  try {
    // 1. Отримаємо зображення зі стороннього сайту (приклад для open graph / img тегів)
    const response = await fetch(`/proxy?target=${encodeURIComponent(input)}`);
    if (!response.ok) throw new Error("Не вдалося отримати сторінку");

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // 2. Знайдемо всі зображення
    const imageUrls = Array.from(doc.images)
      .map((img) => img.src)
      .filter((src) => /\.(jpe?g|png|webp)$/i.test(src));

    if (!imageUrls.length) return alert("Зображення не знайдено");

    // 3. Завантажуємо і додаємо в попередній перегляд
    for (const url of imageUrls) {
      const res = await fetch(url);
      const blob = await res.blob();
      const file = new File([blob], url.split("/").pop(), { type: blob.type });

      const obj = {
        file,
        individualPadding: withPadding,
        removeBgBlob: null,
        croppedBlob: null,
      };
      previewImages.push(obj);
      createPreview(obj);
    }

    previewContainer.style.display = "flex";
  } catch (err) {
    console.error(err);
    alert("Помилка при завантаженні зображень");
  }
});
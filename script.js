const imageInput = document.getElementById("imageInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const processBtn = document.getElementById("processBtn");
const togglePaddingBtn = document.getElementById("togglePaddingBtn");
const codePrefix = document.getElementById("codePrefix");
const previewArea = document.getElementById("previewArea");

let withPadding = true;

togglePaddingBtn.addEventListener("click", () => {
  withPadding = !withPadding;
  togglePaddingBtn.textContent = withPadding
    ? "🔲 Вимкнути відступи"
    : "✅ Увімкнути відступи";
});

processBtn.addEventListener("click", async () => {
  const files = imageInput.files;
  const zip = new JSZip();
  const prefix = codePrefix.value.trim() || "image";

  previewArea.innerHTML = "";

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const img = new Image();
    const imgURL = URL.createObjectURL(file);

    await new Promise((resolve) => {
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const padding = withPadding ? 50 : 0;
        const maxSize = 1200 - 2 * padding;
        const scale = Math.min(maxSize / img.width, maxSize / img.height);
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;
        const x = (canvas.width - newWidth) / 2;
        const y = (canvas.height - newHeight) / 2;

        ctx.drawImage(img, x, y, newWidth, newHeight);

        canvas.toBlob(
          (blob) => {
            const fileName = `${prefix}_${i + 1}.jpg`;
            zip.file(fileName, blob);

            const imgPreview = new Image();
            imgPreview.src = URL.createObjectURL(blob);
            previewArea.appendChild(imgPreview);

            resolve();
          },
          "image/jpeg",
          1.0
        );
      };
      img.src = imgURL;
    });
  }

  zip.generateAsync({ type: "blob" }).then((content) => {
    const zipName = `${prefix}_images.zip`;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = zipName;
    link.click();
  });
});

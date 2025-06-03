  const openBtn = document.querySelector('.open-modal-btn');
  const closeBtn = document.querySelector('.close-modal-btn');
  const modal = document.querySelector('.modal-overlay');

  openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

    function toggleMultiplier() {
      const mode = document.getElementById("mode").value;
      const group = document.getElementById("multiplier-group");
      group.classList.toggle("hidden", mode === "standard");
    }

    function calculate() {
      const width = parseFloat(document.getElementById("width").value);
      const height = parseFloat(document.getElementById("height").value);
      const mode = document.getElementById("mode").value;
      const multiplier = parseFloat(document.getElementById("multiplier").value);
      const resultDiv = document.getElementById("result");

      if (!width || !height || width <= 0 || height <= 0) {
        resultDiv.textContent = "Будь ласка, введіть коректні значення ширини і висоти.";
        return;
      }

      const baseSize = 1000;
      let scale;

      if (width >= height) {
        scale = (baseSize / width) * 100;
      } else {
        scale = (baseSize / height) * 100;
      }

      if (mode === "extended") {
        scale *= multiplier;
      }

      const dimension = width >= height ? "ширині" : "висоті";
      const description = mode === "extended"
        ? `з коефіцієнтом x${multiplier}`
        : "звичайне вписування";

      resultDiv.innerHTML = `
        <strong>${scale.toFixed(1).replace('.', ',')}%</strong> по <strong>${dimension}</strong><br>
        (${description})
      `;
    }
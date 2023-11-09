(() => {
  const btnCollapse = document.querySelector(".main-footer .js-btn-collapse");

  if (btnCollapse) {
    btnCollapse.addEventListener("click", function (e) {
      e.preventDefault();
      const cats = document.querySelector(".main-footer__cats-inner");

      this.classList.toggle("active");

      if (this.classList.contains("active")) {
        this.querySelector("span").innerText = this.dataset.hideText;
      } else {
        this.querySelector("span").innerText = this.dataset.showText;
      }

      if (cats) {
        cats.classList.toggle("active");
      }
    });
  }
})();
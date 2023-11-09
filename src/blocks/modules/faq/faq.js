(() => {
    const btnsCollapse = document.querySelectorAll(".collapsed-text-block .js-collapse-text");

    if (btnsCollapse.length) {
        btnsCollapse.forEach(btn => {
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                const textBlock = this.closest(".collapsed-text-block").querySelector(".collapsed-text");

                this.classList.toggle("active");

                if (this.classList.contains("active")) {
                    this.querySelector("span").innerText = this.dataset.hideText;
                } else {
                    this.querySelector("span").innerText = this.dataset.showText;
                }

                if (textBlock) {
                    textBlock.classList.toggle("collapsed");
                }
            });
        });
    }
})();
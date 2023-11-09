(() => {
    const catalogBtn = document.querySelector(".js-show-catalog");
    const closeCatalog = document.querySelector(".close-catalog");

    function close() {
        const catalog = document.querySelector(".catalog-full");

        catalogBtn.classList.remove("active");

        if (catalog) {
            catalog.classList.remove("active");
        }
    }

    if (catalogBtn) {
        catalogBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const catalog = document.querySelector(".catalog-full");

            this.classList.toggle("active");

            if (catalog) {
                catalog.classList.toggle("active");
            }
        });
    }

    if (closeCatalog) {
        closeCatalog.addEventListener("click", function (e) {
            e.preventDefault();
            close();
        });
    }

    document.querySelector("html").addEventListener("click", (e) => {
        if (!e.target.closest(".catalog-full") && !e.target.closest(".js-show-catalog")) {
            close();
        }
    });
})();
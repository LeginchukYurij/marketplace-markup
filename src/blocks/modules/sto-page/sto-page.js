import Swiper from "swiper";
import { Navigation } from "swiper/modules";

(() => {
    const slider = document.querySelector(".sto-gallery");

    if (slider) {
        const gal = new Swiper(slider, {
            slidesPerView: "auto",
            spaceBetween: 10,
            modules: [Navigation],
            navigation: {
                nextEl: ".sto-gallery-container .next",
                prevEl: ".sto-gallery-container .prev",
            },

            breakpoints: {
                320: {
                    spaceBetween: 5
                },

                768: {
                    spaceBetween: 10
                },
            }
        });

        setTimeout(() => {
            gal.update();
        }, 300);
    }

    const comfort = document.querySelector(".comfort-slider");

    if (comfort) {
        new Swiper(comfort, {
            slidesPerView: "auto",
            spaceBetween: 10,
            modules: [Navigation],
            navigation: {
                nextEl: ".comfort-slider-container .next",
                prevEl: ".comfort-slider-container .prev",
            },
        });
    }


    const showSpecBtn = document.querySelector(".spec-show-more");

    if (showSpecBtn) {
        showSpecBtn.addEventListener("click", function (e) {
            e.preventDefault();

            const hiddenItems = document.querySelectorAll(".spec-item[data-hidden=\"true\"]");

            if (hiddenItems.length) {
                this.querySelector("span").innerText = this.dataset.hideText;
                hiddenItems.forEach((item) => {
                    item.dataset.hidden = "false";
                });
            } else {
                const hiddenItems = document.querySelectorAll(".spec-item[data-hidden=\"false\"]");
                this.querySelector("span").innerText = this.dataset.showText;
                hiddenItems.forEach((item) => {
                    item.dataset.hidden = "true";
                });
            }
        });
    }

    const salSlider = document.querySelector(".salaries__slider");

    if (salSlider) {
        new Swiper(salSlider, {
            slidesPerView: 1,
            spaceBetween: 10,
            modules: [Navigation],
            navigation: {
                nextEl: salSlider.querySelector(".next"),
                prevEl: salSlider.querySelector(".prev"),
            },

            breakpoints: {
                320: {
                    spaceBetween: 20
                },

                768: {
                    spaceBetween: 10
                },
            }
        });
    }

    const tabsSlider = document.querySelector(".tab-row-container");

    if (tabsSlider) {
        new Swiper(tabsSlider, {
            slidesPerView: "auto",
            spaceBetween: 31,
        });
    }


    if (document.querySelector(".spec-list")) {
        let slider = null;

        function initSlider() {
            if (window.matchMedia("(max-width: 768px)").matches) {
                slider = new Swiper(".spec-list", {
                    slidesPerView: "auto",
                    spaceBetween: 6,
                });
            } else {
                console.log(slider);
                if (slider) {
                    slider.destroy();
                }
            }
        }

        initSlider();

        window.addEventListener("resize", () => {
            initSlider();
        });
    }

})();
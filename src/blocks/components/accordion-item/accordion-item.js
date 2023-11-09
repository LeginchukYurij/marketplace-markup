(() => {
    const accordions = document.querySelectorAll(".accordion-item ");

    const openAccordion = (accordion) => {
        const content = accordion.querySelector(".accordion-item__content");
        accordion.classList.add("accordion-item__active");
        content.style.maxHeight = content.scrollHeight + "px";
    };

    const closeAccordion = (accordion) => {
        const content = accordion.querySelector(".accordion-item__content");
        accordion.classList.remove("accordion-item__active");
        content.style.maxHeight = null;
    };

    accordions.forEach((accordion) => {
        const intro = accordion.querySelector(".accordion-item__intro");
        const content = accordion.querySelector(".accordion-item__content");

        intro.onclick = () => {
            if (content.style.maxHeight) {
                closeAccordion(accordion);
            } else {
                accordions.forEach((accordion) => closeAccordion(accordion));
                openAccordion(accordion);
            }
        };
    });
})();
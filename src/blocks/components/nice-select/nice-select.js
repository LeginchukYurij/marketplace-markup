import NiceSelect from "../../../../node_modules/nice-select2/dist/js/nice-select2";

const selects = document.querySelectorAll(".nice-select");

if (selects.length) {
    selects.forEach((select) => {
        const s = new NiceSelect(select);

        if (select.classList.contains("x3")) {

            const list = s.options;

            let rows = Math.ceil(list.length / 3);
            s.dropdown.querySelector(".list").style.gridTemplateRows = `repeat(${rows}, 1fr)`;



        }
    });
}

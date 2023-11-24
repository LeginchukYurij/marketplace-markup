import { JSR, ModuleRail, ModuleSlider, ModuleBar, ModuleLabel, ModuleLimit } from "mm-jsr";


(() => {
    const container = document.getElementById("price-range");

    if (container) {
        new JSR({
            modules: [
                new ModuleRail(),
                new ModuleBar(),
                new ModuleLabel(),
                new ModuleSlider(),
            ],
            config: {
                min: 0,
                max: 12434,
                step: 1,
                initialValues: [100, 10000],
                container: document.getElementById("price-range"),
            }
        });
    }


})();
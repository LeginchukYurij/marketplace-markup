import $ from "jquery";


var locations = [
    {
        lat: 43.25276622541227,
        lng: 76.87671499145237,
        id: 1,
        isActive: true,
    },
    {
        lat: 43.25451658501177,
        lng: 76.91963033408042,
        id: 2,
        isActive: false,
    },
    {
        lat: 43.23038219405782,
        lng: 76.90057592195356,
        id: 3,
        isActive: false,
    },
    {
        lat: 43.224503459542724,
        lng: 76.87740163693442,
        id: 4,
        isActive: false,
    },

    {
        lat: 43.23704821670787,
        lng: 76.85019062377678,
        id: 5,
        isActive: false,
    },

    {
        lat: 43.231545256450374,
        lng: 76.82038604818763,
        id: 5,
        isActive: false,
    },


];


(() => {
    const catalogBtn = document.querySelectorAll(".js-show-catalog");
    const closeCatalog = document.querySelector(".close-catalog");

    function close() {
        const catalog = document.querySelector(".catalog-full");

        catalogBtn.forEach(btn => {
            btn.classList.remove("active");
        });


        if (catalog) {
            catalog.classList.remove("active");
        }

        const allActiveLevels = document.querySelectorAll(".catalog-full .level.active");
        const allActiveLi = document.querySelectorAll(".catalog-full li.active");

        if (allActiveLevels.length) {
            allActiveLevels.forEach(level => {
                level.classList.remove("active");
            });
        }

        if (allActiveLi.length) {
            allActiveLi.forEach(li => {
                li.classList.remove("active");
            });
        }
    }

    if (catalogBtn.length) {
        catalogBtn.forEach(btn => {
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                const catalog = document.querySelector(".catalog-full");

                this.classList.toggle("active");

                if (catalog) {
                    catalog.classList.toggle("active");
                }
            });
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


    const filterBtn = document.querySelector(".filter-btn");

    if (filterBtn) {
        filterBtn.addEventListener("click", () => {
            const filter = document.querySelector(".catalog-sidebar");

            if (filter) {
                filter.classList.add("active");
            }
        });
    }

    const closeFilterBtn = document.querySelector(".close-filter");

    if (closeFilterBtn) {
        closeFilterBtn.addEventListener("click", () => {
            const filter = document.querySelector(".catalog-sidebar");

            if (filter) {
                filter.classList.remove("active");
            }
        });
    }

    const levelBackBtns = document.querySelectorAll(".level-back-btn");

    if (levelBackBtns.length) {
        levelBackBtns.forEach(btn => {
            btn.addEventListener("click", function (e) {
                e.preventDefault();

                this.closest(".level").classList.remove("active");
            });
        });
    }


    const hasChildMenuItems = document.querySelectorAll(".catalog-full li.has-child");

    if (hasChildMenuItems.length) {
        hasChildMenuItems.forEach(item => {
            item.addEventListener("click", function (e) {
                if (window.matchMedia("(max-width: 1098px)")) {
                    e.stopPropagation();

                    const _this = this;

                    if (!e.target.closest("a") && !e.target.closest(".level-back-btn")) {
                        const allActiveLevels = document.querySelectorAll(".catalog-full .level.active");
                        const allActiveLi = document.querySelectorAll(".catalog-full li.active");

                        if (allActiveLevels.length) {
                            allActiveLevels.forEach(level => {
                                level.classList.remove("active");
                            });
                        }

                        if (allActiveLi.length) {
                            allActiveLi.forEach(li => {
                                li.classList.remove("active");
                            });
                        }

                        this.classList.add("active");
                        this.querySelector(".level").classList.add("active");

                        const activateParentsLevels = function () {
                            const level = this.closest(".level");

                            console.log(this);

                            if (level && !level.classList.contains("active")) {
                                level.classList.add("active");

                                activateParentsLevels.call(level);
                            }

                            return;
                        };

                        activateParentsLevels.call(_this);
                    }
                }
            }, false);
        });
    }


    const favBtns = document.querySelectorAll(".fav");

    if (favBtns.length) {
        favBtns.forEach(btn => {
            btn.addEventListener("click", function (e) {
                e.preventDefault();

                this.classList.toggle("is-fav");
            });
        });
    }


    let mapScript = document.getElementById("js_map");
    let mapContainer = document.querySelector("#points-map");

    if (mapScript && mapContainer) {
        const iconDefault = "./img/svg/dot1.svg";
        const iconActive = "./img/svg/dot2.svg";



        function onClick() {
            const ID = this.id;

            locations.forEach(n => n.marker.setIcon(n.marker !== this ? iconDefault : iconActive));

            $(".sto-cards-list .comp-card").removeClass("active");
            $(".sto-cards-list .comp-card").removeClass("animated");

            $(`.sto-cards-list .comp-card[data-id="${ID}"]`).addClass("active");

            setTimeout(() => {
                $(`.sto-cards-list .comp-card[data-id="${ID}"]`).addClass("animated");
            }, 200);
        }

        var map = new google.maps.Map(mapContainer, {
            center: new google.maps.LatLng(0, 0),
            zoom: 15,
            gestureHandling: "greedy",
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
        });

        var markersBounds = new google.maps.LatLngBounds();

        for (var i = 0; i < locations.length; i++) {
            var markerPosition = new google.maps.LatLng(locations[i].lat, locations[i].lng);
            markersBounds.extend(markerPosition);
        }

        map.setCenter(markersBounds.getCenter(), map.fitBounds(markersBounds));

        locations.forEach(n => {
            n.marker = new google.maps.Marker({
                position: new google.maps.LatLng(n.lat, n.lng),
                map: map,
                icon: n.isActive ? iconActive : iconDefault,
                id: n.id
            });
            n.marker.addListener("click", onClick);
        });
    }


    const showOnMapBtns = document.querySelectorAll(".show-on-map");

    if (showOnMapBtns.length) {
        showOnMapBtns.forEach(btn => {
            btn.addEventListener("click", function (e) {
                e.preventDefault();

                const cardsList = document.querySelector(".sto-cards-list");

                if (cardsList) {
                    showOnMapBtns.forEach(btn => {
                        btn.classList.toggle("active");
                    });

                    cardsList.classList.toggle("onmap");
                }
            });
        });
    }

})();
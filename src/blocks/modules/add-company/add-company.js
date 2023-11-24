import Swiper from "swiper";
import { FreeMode, EffectFade, Thumbs } from "swiper/modules";

import $ from "jquery";
import "select2";

import Inputmask from "../../../../node_modules/inputmask/dist/inputmask.es6";


(() => {

    function validateEmail(email) {
        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return re.test(String(email).toLowerCase());
    }




    function validateTextInput(inp) {
        if (inp.tagName === "SELECT") {
            if (inp.value === "no-chosen") {
                return [inp, false];
            }

            return [inp, true];
        }

        if (inp.dataset?.type === "phone") {
            const value = inp.value.replace(/[^0-9]/g, "");

            if (value.length !== 11) {
                return [inp, false];
            }

            return [inp, true];
        }

        if (inp.getAttribute("type") === "email") {

            if (!validateEmail(inp.value)) {
                return [inp, false];
            }

            return [inp, true];
        }

        if (inp.getAttribute("type") === "text" || inp.tagName === "TEXTAREA") {
            const maxChars = inp.dataset?.max;

            if (maxChars) {
                if (inp.value === "" || inp.value.length > maxChars) {
                    return [inp, false];
                }

                return [inp, true];
            }

            if (inp.value === "" || inp.value.length < 2) {
                return [inp, false];
            }
        }


        return [inp, true];
    }


    function realtimeValidate() {
        const allReqInputs = document.querySelectorAll("input.req, textarea.req, select.req, input.fraq, textarea.fraq");

        if (allReqInputs.length) {
            allReqInputs.forEach(inp => {
                ["input", "change", "paste"].map(event => {
                    inp.addEventListener(event, () => {
                        const [input, isValid] = validateTextInput(inp);

                        const container = inp.closest(".input-wrap__row");

                        if (isValid) {
                            inp.classList.remove("error");

                            if (container) {
                                container.classList.add("is-valid");
                                container.closest(".input-wrap").classList.add("may-add-more");
                            }
                        } else {
                            if (container) {
                                container.classList.remove("is-valid");
                                container.closest(".input-wrap").classList.remove("may-add-more");
                            }
                        }
                    });
                });
            });
        }

        const phoneInputs = document.querySelectorAll("input[data-type=\"phone\"]");

        if (phoneInputs.length) {
            phoneInputs.forEach(input => {
                var im = new Inputmask("+ 7 (999) 999 999 9");
                im.mask(input);
            });
        }
    }

    realtimeValidate();


    const addMoreBtns = document.querySelectorAll(".add-more");

    if (addMoreBtns.length) {
        addMoreBtns.forEach(btn => {
            btn.addEventListener("click", function (e) {
                e.preventDefault();

                const container = $(this).closest(".input-wrap__grid");

                const target = container.find(".input-wrap__row")[0];
                const clone = $(target).clone(true).unwrap();

                clone.find("input").val("");
                clone.removeClass("is-valid");
                container.closest(".input-wrap").removeClass(" may-add-more");

                container.find(".ex").before(clone);

                realtimeValidate();
            });
        });
    }

    function validate(inputsContainer) {
        const reqInputs = inputsContainer.querySelectorAll(".req");
        const noValidInputs = [];

        if (reqInputs.length) {
            reqInputs.forEach(input => {
                const attr = input.getAttribute("type");

                if (attr == "text") {
                    const [inp, isValid] = validateTextInput(input);
                    if (!isValid) {
                        noValidInputs.push(inp);
                    }
                }

                if (input.tagName === "TEXTAREA") {
                    const [inp, isValid] = validateTextInput(input);
                    if (!isValid) {
                        noValidInputs.push(inp);
                    }
                }

                if (input.tagName === "SELECT") {
                    const [inp, isValid] = validateTextInput(input);
                    if (!isValid) {
                        noValidInputs.push(inp);
                    }
                }
            });
        }


        if (!noValidInputs.length) {
            return true;
        }

        noValidInputs.forEach(inp => {
            inp.classList.add("error");
        });

    }



    const stepsSlider = document.querySelector(".steps-slider");

    var steps;

    if (stepsSlider) {
        steps = new Swiper(stepsSlider, {
            slidesPerView: "auto",
            spaceBetween: 0,
            direction: "vertical",
            noSwiping: false,
            allowTouchMove: false,
            freeMode: true,
            watchSlidesProgress: true,
            modules: [FreeMode],

            breakpoints: {
                320: {
                    direction: "horizontal",
                    spaceBetween: 48,
                },

                980: {
                    direction: "vertical",
                    spaceBetween: 0,
                },
            }
        });
    }


    const stepsContentSlider = document.querySelector(".steps-content");

    if (stepsContentSlider) {
        const contentSlider = new Swiper(stepsContentSlider, {
            slidesPerView: 1,
            autoHeight: true,
            spaceBetween: 0,
            modules: [Thumbs, EffectFade],
            effect: "fade",
            noSwiping: false,
            allowTouchMove: false,
            fadeEffect: {
                crossFade: true
            },
            thumbs: {
                swiper: steps,
            },
        });

        $(".next-step").on("click", function (e) {
            e.preventDefault();

            const isValid = validate(this.closest(".step"));

            if (isValid) {
                contentSlider.slideNext();
            }

        });

        $(".submit-add-company").on("click", function (e) {
            e.preventDefault();

            const isValid = validate(this.closest(".step"));

            if (isValid) {
                console.log("SUBMIT");
            }

        });

        $(".back-btn").on("click", function (e) {
            e.preventDefault();
            contentSlider.slidePrev();
        });
    }



    var mapScript = document.getElementById("js_map");
    var mapContainer = document.querySelector("#map");

    if (mapScript && mapContainer) {
        // var map = new google.maps.Map(document.getElementById("map"), {
        //     center: {
        //         lat: 43.25720453929965,
        //         lng: 76.89001874766707,
        //     },
        //     zoom: 15,
        //     gestureHandling: "greedy",
        //     zoomControl: false,
        //     mapTypeControl: false,
        //     scaleControl: false,
        //     streetViewControl: false,
        //     rotateControl: false,
        //     fullscreenControl: true,
        // });
        // var marker = new google.maps.Marker({
        //     position: map.getCenter(),
        //     map: map,
        // });
        // marker.setMap(map);

        var map;

        function initialize() {
            var city = new google.maps.LatLng(43.24720224830525, 76.90100507537984);
            const input = document.querySelector("#map-coords");

            var mapOptions = {
                zoom: 13,
                center: city,
                gestureHandling: "greedy",
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                // fullscreenControl: false,
            };

            map = new google.maps.Map(document.getElementById("map"),
                mapOptions);

            var marker = new google.maps.Marker({
                position: city,
                draggable: true,
                map: map,
                animation: google.maps.Animation.DROP,
            });


            google.maps.event.addListener(map, "click", function (event) {
                let position_x = event.latLng.lat();
                let position_y = event.latLng.lng();
                marker.setPosition(event.latLng);
                console.log(position_x + " " + position_y);

                input.value = position_x + " " + position_y;

            });

            google.maps.event.addListener(marker, "dragend", function (event) {
                let position_x = marker.getPosition().lat();
                let position_y = marker.getPosition().lng();
                console.log(position_x + " " + position_y);

                input.value = position_x + " " + position_y;
            });

        }



        // Add a marker to the map and push to the array.
        function addMarker(location) {
            var marker = new google.maps.Marker({
                position: location,
                draggable: true,

                map: map,
            });

            markers.push(marker);
            $("#map_coordinates").empty().append(location.e + " " + location.d);

        }

        // Sets the map on all markers in the array.
        function setAllMap(map) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        }


        // Removes the markers from the map, but keeps them in the array.
        function clearMarkers() {
            setAllMap(null);
        }


        // Shows any markers currently in the array.
        function showMarkers() {
            setAllMap(map);
        }

        google.maps.event.addDomListener(window, "load", initialize);
    }


    if ($(".select-multiple").length) {
        $(".select-multiple").select2({
            placeholder: "Не выбрано"
        });
    }


    const MAX_FILES_COUNT = 10;
    const MAX_FILE_SIZE = 100;

    function ID() {
        return "_" + Math.random().toString(36).substr(2, 9);
    }


    function toMB(size) {
        return (size / 1000000).toFixed(2);
    }



    function initDropArea(area) {
        let LOCAL_UPLOADED_FILES = [];


        function validateFile(file) {

            if (
                !file.type.match("png") &&
                !file.type.match("jpeg") &&
                !file.type.match("jpg") &&
                file.type !== ""
            ) {

                return `Некорректный тип файла. Файл - ${file.name} не может быть загружен. Выберите другой файл. Возможные форматы файлов: .png,.jpg,.jpeg `;
            }

            let fileSize = toMB(file.size);

            if (fileSize > MAX_FILE_SIZE) {
                return `Максимальный размер файла - 100 МБ. Файл - ${file.name} не загружен.`;
            }

            if (LOCAL_UPLOADED_FILES.length >= MAX_FILES_COUNT) {


                return `Максимальное кол-во файлов ${MAX_FILES_COUNT}шт. Файл - "${file.name}" не загружен.`;
            }

            return "VALID";
        }


        let dropArea = area;

        const multi = dropArea.querySelector("input[multiple]");

        const fileInp = dropArea.querySelector("input[type=\"file\"]");
        const uploadTrigger = dropArea.querySelector(".uploadHandler");
        const preview = dropArea.querySelector(".files-gallery");
        const clearDwnldFileshandler = dropArea.querySelector(".clearFiles");

        function handleClick() {
            console.log(fileInp);
            fileInp.click();
        }



        if (clearDwnldFileshandler) {
            clearDwnldFileshandler.addEventListener("click", function (e) {
                e.preventDefault();

                let filesGallery = $(preview).find(".preview-image-container");

                if (filesGallery.length) {
                    filesGallery.remove();
                }

                $(fileInp).val("");

                preview.style.display = "none";
            });
        }



        let hoverClassName = "hover";

        dropArea.addEventListener("dragenter", function (e) {
            e.preventDefault();
            dropArea.classList.add(hoverClassName);
        });

        dropArea.addEventListener("dragover", function (e) {
            e.preventDefault();
            dropArea.classList.add(hoverClassName);
        });

        dropArea.addEventListener("dragleave", function (e) {
            e.preventDefault();
            dropArea.classList.remove(hoverClassName);
        });


        dropArea.addEventListener("drop", function (e) {
            e.preventDefault();
            dropArea.classList.remove(hoverClassName);

            const files = Array.from(e.dataTransfer.files);

            if (!multi) {
                LOCAL_UPLOADED_FILES = [];
                files.length = 1;
            }



            handleFiles(files);
        });


        uploadTrigger.addEventListener("click", function (e) {
            e.preventDefault();
            handleClick();
        });

        preview.addEventListener("click", (e) => {
            if (e.target.closest(".remove-img")) {
                const container = e.target.closest(".preview-image");
                const id = container.dataset.id;

                container.remove();

                LOCAL_UPLOADED_FILES = LOCAL_UPLOADED_FILES.filter((file) => {
                    return file.id !== id;
                });

                console.log("del ", LOCAL_UPLOADED_FILES);

            }
        });

        // dropArea.addEventListener("click", function (e) {
        //     console.log(e.target.closest("label"));
        //     if (e.target.closest("label") || e.target.closest(".clearFiles") || e.target.closest(".uploadHandler")) {
        //         return;
        //     }

        //     handleClick();
        // });

        fileInp.addEventListener("change", handleChange, false);

        function handleChange(e) {
            let dt = e.target;
            let files = dt.files;

            // LOCAL_UPLOADED_FILES = [];



            handleFiles(files);
        }

        function handleFiles(files) {
            files = [...files];

            const validFiles = [];

            let noValidFiles = [];

            files.forEach((file) => {
                let status = validateFile(file);

                if (status != "VALID") {
                    noValidFiles.push(file);
                    alert(status);
                } else {
                    validFiles.push(file);
                    file.id = ID();
                    LOCAL_UPLOADED_FILES.push(file);
                }
            });

            // validFiles.forEach(checkupFile);

            previewFiles();
        }

        // function checkupFile(file) {
        //     file.id = ID();
        //     LOCAL_UPLOADED_FILES.push(file);

        // }

        function previewFiles() {

            let filesGallery = $(preview).find(".preview-image");

            if (filesGallery.length) {
                filesGallery.remove();
            }

            console.log(LOCAL_UPLOADED_FILES);

            LOCAL_UPLOADED_FILES.forEach(file => {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function (ev) {
                    // areaInfo.style.display = 'none';
                    preview.style.display = "flex";
                    var src = ev.target.result;

                    preview.insertAdjacentHTML(
                        "afterbegin",
                        `
            <div class="preview-image" title="${file.name}" data-id="${file.id}">
                
                <figure>
                    <img src="${src}" alt="${file.name}" />
                </figure>

                <button class="remove-img" type="button"></button>
                
            </div>
           
            `,
                    );
                };
            });



        }

        return {
            getFiles: () => {
                return LOCAL_UPLOADED_FILES;
            }
        };
    }



    const mainPhoto = document.querySelector("#mainPhoto");
    const galleryPhotos = document.querySelector("#galleryPhotos");

    let mainPhotoArea;
    let galleryPhotosArea;

    if (mainPhoto) {
        mainPhotoArea = initDropArea(mainPhoto);
    }

    if (galleryPhotos) {
        galleryPhotosArea = initDropArea(galleryPhotos);
    }

})();
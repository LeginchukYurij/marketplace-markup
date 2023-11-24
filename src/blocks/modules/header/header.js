(() => {
  const searchBtn = document.querySelector(".search-btn");
  const searchForm = document.querySelector(".search-form");

  if (searchBtn) {
    searchBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (searchForm) {
        this.classList.toggle("active");
        searchForm.classList.toggle("active");
      }
    });


    document.querySelector("html").addEventListener("click", (e) => {
      if (!e.target.closest(".search-btn") && !e.target.closest(".search-form")) {
        searchForm.classList.remove("active");
        searchBtn.classList.remove("active");
      }
    });
  }


  const cabinetBtn = document.querySelector(".cabinet-widget");

  if (cabinetBtn) {
    cabinetBtn.addEventListener("click", function (e) {
      if (window.matchMedia("max-width: 1240px")) {
        this.classList.toggle("active");
      }
    });

    document.querySelector("html").addEventListener("click", (e) => {
      if (!e.target.closest(".cabinet-widget")) {
        cabinetBtn.classList.remove("active");
      }
    });
  }



  const menuBtn = document.querySelector(".burger-menu");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeMenu = document.querySelector(".close-menu");


  if (menuBtn) {
    menuBtn.addEventListener("click", function (e) {

      if (mobileMenu) {
        mobileMenu.classList.add("active");
      }
    });
  }

  if (closeMenu) {
    closeMenu.addEventListener("click", function (e) {
      if (mobileMenu) {
        mobileMenu.classList.remove("active");
      }
    });
  }


})();
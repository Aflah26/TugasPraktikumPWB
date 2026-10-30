
const tombolBackToTop = document.getElementById("backToTop");


window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
        tombolBackToTop.style.display = "block";
    } else {
        tombolBackToTop.style.display = "none";
    }
});


tombolBackToTop.addEventListener("mouseenter", function () {
    tombolBackToTop.style.opacity = "1";
});


tombolBackToTop.addEventListener("mouseleave", function () {
    tombolBackToTop.style.opacity = "0.5";
});


tombolBackToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

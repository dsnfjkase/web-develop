function showimg(num) {
    pic = document.getElementById("holder");

    switch (parseInt(num)) {
        case 1:
            pic.src = "img/Anderson.jpg";
            pic.alt = "Anderson Hall";
            break;
        case 2:
            pic.src = "img/keller.jpg";
            pic.alt = "Keller Hall";
            break;
        case 3:
            pic.src = "img/carlson.jpg";
            pic.alt = "Carlson School";
            break;
        case 4:
            pic.src = "img/amundson.jpg";
            pic.alt = "Amundson Hall";
            break;
        case 5:
            pic.src = "img/Normandale.jpg";
            pic.alt = "Normandale Community College";
            break;
        case 6:
            pic.src = "img/Kolthoff.jpg";
            pic.alt = "Kolthoff Hall";
            break;
        case 7:
            pic.src = "img/HSEC.jpg";
            pic.alt = "Health Science Education Center";
            break;
        case 8:
            pic.src = "img/Rec.jpg";
            pic.alt = "University Recreation and Wellness Center";
            break;
        case 9:
            pic.src = "img/Martina.jpg";
            pic.alt = "Martina restaurant";
            break;
    }
}

let slideshowActive = false;
let slideshowInterval;
let currentSlideIndex = 0;

const slideshowImages = [
    { src: "img/Anderson.jpg", alt: "Anderson Hall" },
    { src: "img/keller.jpg", alt: "Keller Hall" },
    { src: "img/carlson.jpg", alt: "Carlson School" },
    { src: "img/amundson.jpg", alt: "Amundson Hall" },
    { src: "img/Normandale.jpg", alt: "Normandale Community College" },
];

function startSlideshow() {
    if (slideshowActive) return; 

    slideshowActive = true;
    slideshowInterval = setInterval(() => {
        if (!slideshowActive) return;

        let holder = $("#holder");

        holder.fadeOut(500, function () {
            currentSlideIndex = (currentSlideIndex + 1) % slideshowImages.length;
            holder.attr("src", slideshowImages[currentSlideIndex].src);
            holder.attr("alt", slideshowImages[currentSlideIndex].alt);
            holder.fadeIn(300);
        });
    }, 3000);
}

function stopSlideshow() {
    slideshowActive = false;
    clearInterval(slideshowInterval);
}

    $(document).ready(function () {
    $("#startSlideshow").on("click", startSlideshow);
    $("#stopSlideshow").on("click", stopSlideshow);
});

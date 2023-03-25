async function loadImage() {
    let image = document.getElementById("img_profile");
    image.src = localStorage.getItem("userDp");
}
loadImage();
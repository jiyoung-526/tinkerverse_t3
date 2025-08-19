let currentSet = 1;
let currentIndex = 1;
let totalImages = 0;
let basePath = "";

// 팝업 열기
function viewExpwork(setNum) {
    currentSet = setNum;
    currentIndex = 1;

    if (setNum === 1) { basePath = "2025_Asset/Images/3-1.Exp_work_Img/3-1-1/"; totalImages = 5; }
    else if (setNum === 2) { basePath = "2025_Asset/Images/3-1.Exp_work_Img/3-1-2/"; totalImages = 15; }
    else if (setNum === 3) { basePath = "2025_Asset/Images/3-1.Exp_work_Img/3-1-3/"; totalImages = 12; }

    document.getElementById("popupOverlay").style.display = "flex";
    updateImage();
}
function updateImage() {
    document.getElementById("popupImg").src = basePath + currentIndex + ".jpg";
}

// 이전 이미지
function prevImg() {
    if (currentIndex > 1) {
        currentIndex--;
        updateImage();
    }
}

// 다음 이미지
function nextImg() {
    if (currentIndex < totalImages) {
        currentIndex++;
        updateImage();
    }
}

// 팝업 닫기
function closePopup() {
    document.getElementById("popupOverlay").style.display = "none";
}
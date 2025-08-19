// 팝업 열기
function openVideoPopup() {
    document.getElementById("videoPopupOverlay").style.display = "flex";
    document.getElementById("introVideo").play();
}

// 팝업 닫기
function closeVideoPopup() {
    const video = document.getElementById("introVideo");
    video.pause();
    video.currentTime = 0;
    document.getElementById("videoPopupOverlay").style.display = "none";
}

// 항상 홈에 오면 팝업 열기
window.addEventListener('load', () => {
    openVideoPopup();
});
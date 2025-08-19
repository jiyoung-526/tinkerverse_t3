const popupData = {
    1: { 
        artImg: "2025_Asset/Images/ArtAll_Img/1.png", 
        letterImg: "2025_Asset/Images/Letter_Img/1.png", 
        artKey: 'art1', 
        letterKey: 'letter1' 
    },
    2: { 
        artImg: "2025_Asset/Images/ArtAll_Img/2.png", 
        letterImg: "2025_Asset/Images/Letter_Img/2.png", 
        artKey: 'art2', 
        letterKey: 'letter2' 
    },
    3: { 
        artImg: "2025_Asset/Images/ArtAll_Img/3.png", 
        letterImg: "2025_Asset/Images/Letter_Img/3.png", 
        artKey: 'art3', 
        letterKey: 'letter3' 
    },
    4: { 
        artImg: "2025_Asset/Images/ArtAll_Img/4.png", 
        letterImg: "2025_Asset/Images/Letter_Img/4.png", 
        artKey: 'art4', 
        letterKey: 'letter4' 
    },
    5: { 
        artImg: "2025_Asset/Images/ArtAll_Img/5.png", 
        letterImg: "2025_Asset/Images/Letter_Img/5.png", 
        artKey: 'art5', 
        letterKey: 'letter5' 
    },
    6: { 
        artImg: "2025_Asset/Images/ArtAll_Img/6.png", 
        letterImg: "2025_Asset/Images/Letter_Img/6.png", 
        artKey: 'art6', 
        letterKey: 'letter6' 
    },
};

const fieldsUsingInnerHTML = ['art_material'];

let isLetterView = false;
let currentPoint = null;

async function loadPopup() {
    const response = await fetch('2025_popup_art.html');
    const popupHTML = await response.text();
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // 팝업 로드 직후 이벤트리스너 등록
    addPopupEventListeners();
    addToLetterBtnListener();
}

function fillPopupData(pointClass, letterView) {
    const data = popupData[pointClass];
    if (!data) return;

    const imgSrc = letterView ? data.letterImg : data.artImg;
    const dataKey = letterView ? data.letterKey : data.artKey;

    const artworkImg = document.querySelector('.artwork_img');
    if (artworkImg) artworkImg.src = imgSrc;

    const keysMap = letterView 
        ? { name: 'letter_name', title: 'letter_title', detail: 'letter_detail' } 
        : { name: 'art_name', title: 'art_title', detail: 'art_detail' };

    document.querySelectorAll('.text > div').forEach(el => {
        const key = keysMap[el.className];
        const content = translations?.[currentLang]?.['art_popups']?.[dataKey]?.[key] || '';

        if (fieldsUsingInnerHTML.includes(key)) {
            el.innerHTML = content;
        } else {
            el.textContent = content;
        }
    });

    const closeBtn = document.querySelector('.close-button[data-key="art_popup_close_btn"]');
    if (closeBtn) {
        const closeBtnText = translations?.[currentLang]?.['art_popup_close_btn'] || '닫기';
        closeBtn.textContent = closeBtnText;
    }

    const toLetterBtn = document.querySelector('.toletter_btn');
    if (toLetterBtn) {
        toLetterBtn.textContent = letterView ? '선물 보기' : '편지 읽기';
    }

    isLetterView = letterView;
}

function openPopup(pointClass) {
    currentPoint = pointClass;

    if (!document.querySelector('.popup-window')) {
        loadPopup().then(() => {
            fillPopupData(pointClass, false);
            showPopup();
        });
    } else {
        fillPopupData(pointClass, false);
        showPopup();
    }
}

function showPopup() {
    const overlay = document.querySelector('.popup-overlay');
    const popup = document.querySelector('.popup-window');
    if (overlay) overlay.style.display = 'block';
    if (popup) popup.style.display = 'block';
}

function closePopup() {
    const overlay = document.querySelector(".popup-overlay");
    const popup = document.querySelector(".popup-window");
    if (overlay) overlay.style.display = "none";
    if (popup) popup.style.display = "none";

    isLetterView = false;
    currentPoint = null;
}

function addPopupEventListeners() {
    const overlay = document.querySelector('.popup-overlay');
    const closeBtn = document.querySelector('.close-button');
    const closeIcon = document.querySelector('.close-icon');

    if (overlay) overlay.addEventListener('click', closePopup);
    if (closeBtn) closeBtn.addEventListener('click', closePopup);
    if (closeIcon) closeIcon.addEventListener('click', closePopup);
}

function addToLetterBtnListener() {
    const toLetterBtn = document.querySelector('.toletter_btn');
    if (!toLetterBtn) return;

    toLetterBtn.onclick = () => {
        if (!currentPoint) return;
        fillPopupData(currentPoint, !isLetterView);
    };
}

// 초기 팝업 HTML 로드만 실행 (필요시 openPopup으로 교체)
window.addEventListener("DOMContentLoaded", loadPopup);
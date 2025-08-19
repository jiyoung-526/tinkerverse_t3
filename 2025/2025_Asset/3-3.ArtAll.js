// points
const points = document.querySelectorAll('.point');

// 포인트 위치 데이터
const desktopPointPositions = {
    p1: { top: 69, left: 81 },
    p2: { top: 23, left: 81 },
    p3: { top: 27, left: 25.5 },
    p4: { top: 66, left: 34.3 },
    p5: { top: 26, left: 54 },
    p6: { top: 75, left: 56 },
};

const mobilePointPositions = {
    p1: { top: 14, left: 25 },
    p2: { top: 7, left: 74 },
    p3: { top: 40, left: 31 },
    p4: { top: 62, left: 20 },
    p5: { top: 68, left: 77 },
    p6: { top: 36, left: 76 },
};

function updatePoints() {
    const illust = window.innerWidth <= 1000 
        ? document.querySelector('.illust-mobile') 
        : document.querySelector('.illust-desktop');
    if (!illust) return;

    const illustRect = illust.getBoundingClientRect();
    const isMobile = window.innerWidth <= 1000;
    const pointPositions = isMobile ? mobilePointPositions : desktopPointPositions;

    points.forEach((point) => {
        const id = point.classList[1];
        const position = pointPositions[id];
        if (position) {
            point.style.top = `${illustRect.top + (illustRect.height * position.top) / 100}px`;
            point.style.left = `${illustRect.left + (illustRect.width * position.left) / 100}px`;
        }
    });
}

// 팝업 데이터 (art와 letter용 데이터키를 나눠서 관리)
const popupData = {
    p1: { artImg: '2025_Asset/Images/ArtAll_Img/1.png', letterImg: '2025_Asset/Images/Letter_Img/1.png', artKey: 'art1', letterKey: 'letter1' },
    p2: { artImg: '2025_Asset/Images/ArtAll_Img/2.png', letterImg: '2025_Asset/Images/Letter_Img/2.png', artKey: 'art2', letterKey: 'letter2' },
    p3: { artImg: '2025_Asset/Images/ArtAll_Img/3.png', letterImg: '2025_Asset/Images/Letter_Img/3.png', artKey: 'art3', letterKey: 'letter3' },
    p4: { artImg: '2025_Asset/Images/ArtAll_Img/4.png', letterImg: '2025_Asset/Images/Letter_Img/4.png', artKey: 'art4', letterKey: 'letter4' },
    p5: { artImg: '2025_Asset/Images/ArtAll_Img/5.png', letterImg: '2025_Asset/Images/Letter_Img/5.png', artKey: 'art5', letterKey: 'letter5' },
    p6: { artImg: '2025_Asset/Images/ArtAll_Img/6.png', letterImg: '2025_Asset/Images/Letter_Img/6.png', artKey: 'art6', letterKey: 'letter6' },
};

const fieldsUsingInnerHTML = ['art_material', 'art_size'];

// 상태 추적용 변수
let isLetterView = false;
let currentPoint = null;

// 팝업 HTML을 동적으로 불러와 삽입
async function loadPopup() {
    try {
        const response = await fetch('2025_popup_art.html');
        if (!response.ok) throw new Error('Popup HTML load failed');
        const popupHTML = await response.text();
        document.body.insertAdjacentHTML('beforeend', popupHTML);
    } catch (error) {
        console.error(error);
    }
}

function fillPopupData(pointClass, letterView) {
    const data = popupData[pointClass];
    if (!data) return;

    const imgSrc = letterView ? data.letterImg : data.artImg;
    const dataKey = letterView ? data.letterKey : data.artKey;

    document.querySelector('.artwork_img').src = imgSrc;

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
            addPopupEventListeners();
            addToLetterBtnListener();
        });
    } else {
        fillPopupData(pointClass, false);
        showPopup();
    }
}

function showPopup() {
    document.querySelector('.popup-overlay').style.display = 'block';
    document.querySelector('.popup-window').style.display = 'block';
}

function closePopup() {
    const overlay = document.querySelector('.popup-overlay');
    const popup = document.querySelector('.popup-window');
    if (overlay) overlay.style.display = 'none';
    if (popup) popup.style.display = 'none';

    // 상태 초기화
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

window.addEventListener('resize', updatePoints);

window.addEventListener('load', () => {
    updatePoints();

    document.querySelectorAll('.point').forEach(point => {
        point.addEventListener('click', (e) => {
            const pointClass = e.target.classList[1];
            openPopup(pointClass);
        });
    });
});
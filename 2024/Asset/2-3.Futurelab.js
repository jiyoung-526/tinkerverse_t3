//points
const illust = document.querySelector('.illust');
const points = document.querySelectorAll('.point');

const pointPositions = {
    p1: { top: 60, left: 41.5 }, //중앙
    p2: { top: 68, left: 55 }, //무대
    p3: { top: 50, left: 65 }, //철물점
    p4: { top: 71.5, left: 34 }, //모바일 철물점
    p5: { top: 45, left: 52 }, //주방
    p6: { top: 34.5, left: 49 }, //하늘섬
};

function updatePoints() {
    const illustRect = illust.getBoundingClientRect(); // illust 현재 크기와 위치

    points.forEach((point) => {
        const id = point.classList[1]; // 포인트 ID 가져오기
        const position = pointPositions[id];

        if (position) {
            // 상대적 위치를 illust의 크기와 위치를 기준으로 계산
            point.style.top = `${illustRect.top + (illustRect.height * position.top) / 100}px`;
            point.style.left = `${illustRect.left + (illustRect.width * position.left) / 100}px`;
        }
    });
}

// 포인트 위치 업데이트
window.addEventListener('resize', updatePoints);
window.addEventListener('load', updatePoints);

//popup
const popupData = {
    p1: { imgSrc: 'Asset/Images/Space_Img/1.png', dataKey: 'space1' },
    p2: { imgSrc: 'Asset/Images/Space_Img/2.png', dataKey: 'space2' },
    p3: { imgSrc: 'Asset/Images/Space_Img/3.png', dataKey: 'space3' },
    p4: { imgSrc: 'Asset/Images/Space_Img/4.png', dataKey: 'space4' },
    p5: { imgSrc: 'Asset/Images/Space_Img/5.png', dataKey: 'space5' },
    p6: { imgSrc: 'Asset/Images/Space_Img/6.png', dataKey: 'space6' },
};

function openPopup(pointClass) {
    const data = popupData[pointClass];
    if (!data) return;
    
    const { imgSrc, dataKey } = data;
    
    document.querySelector('.space_img').src = imgSrc;

    // Set text values for name and detail using data-key
    document.querySelectorAll('.text [data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[currentLang] && translations[currentLang]['space_popups'][dataKey]) {
            element.textContent = translations[currentLang]['space_popups'][dataKey][key];
        } else {
            element.textContent = ''; // Fallback if translations are missing
        }
    });

    // Show popup and overlay
    document.querySelector('.popup-overlay').style.display = 'block';
    document.querySelector('.popup-window').style.display = 'block';
}

function closePopup() {
    document.querySelector('.popup-overlay').style.display = 'none';
    document.querySelector('.popup-window').style.display = 'none';
}

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.point').forEach(point => {
        point.addEventListener('click', (e) => {
            const pointClass = e.target.classList[1];
            openPopup(pointClass);
        });
    });

    document.querySelector('.popup-overlay').addEventListener('click', closePopup);
    document.querySelector('.close-button').addEventListener('click', closePopup);
    document.querySelector('.close-icon').addEventListener('click', closePopup);
});

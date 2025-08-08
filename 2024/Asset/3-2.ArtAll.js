// points
const points = document.querySelectorAll('.point');

// 포인트 위치
const desktopPointPositions = {
    p1: { top: 50, left: 83.5 },
    p2: { top: 77, left: 39 },
    p3: { top: 80, left: 91 },
    p4: { top: 57, left: 19.2 },
    p5: { top: 32.5, left: 34.6 },
    p6: { top: 61, left: 53.2 },
    p7: { top: 39.5, left: 66.3 },
    p8: { top: 82.5, left: 66.3 },
    p9: { top: 23, left: 11.5 },
    p10: { top: 17, left: 86.5 },
    p11: { top: 83, left: 14 },
    p12: { top: 17, left: 55.3 },
};

const mobilePointPositions = {
    p1: { top: 81, left: 52 },
    p2: { top: 41, left: 80 },
    p3: { top: 89, left: 84 },
    p4: { top: 30, left: 65 },
    p5: { top: 19.5, left: 43 },
    p6: { top: 57, left: 51 },
    p7: { top: 68.5, left: 31 },
    p8: { top: 67, left: 79 },
    p9: { top: 6.5, left: 16 },
    p10: { top: 5, left: 81 },
    p11: { top: 88, left: 19 },
    p12: { top: 46, left: 20 },
};

function updatePoints() {
    // 현재 활성화된 illust 가져오기 (모바일 또는 데스크톱)
    const illust = window.innerWidth <= 1000 
        ? document.querySelector('.illust-mobile') 
        : document.querySelector('.illust-desktop');

    const illustRect = illust.getBoundingClientRect();

    // 현재 화면 크기에 따라 위치 데이터 선택
    const isMobile = window.innerWidth <= 1000;
    const pointPositions = isMobile ? mobilePointPositions : desktopPointPositions;

    points.forEach((point) => {
        const id = point.classList[1];
        const position = pointPositions[id];

        if (position) {
            // 상대적 위치, illust 기준으로 계산
            point.style.top = `${illustRect.top + (illustRect.height * position.top) / 100}px`;
            point.style.left = `${illustRect.left + (illustRect.width * position.left) / 100}px`;
        }
    });
}

// 이벤트 리스너 추가
window.addEventListener('resize', updatePoints);
window.addEventListener('load', updatePoints);

//Popup
const popupData = {
    p1: { imgSrc: 'Asset/Images/ArtAll_Img/1.png', dataKey: 'art1' },
    p2: { imgSrc: 'Asset/Images/ArtAll_Img/2.png', dataKey: 'art2' },
    p3: { imgSrc: 'Asset/Images/ArtAll_Img/3.png', dataKey: 'art3' },
    p4: { imgSrc: 'Asset/Images/ArtAll_Img/4.png', dataKey: 'art4' },
    p5: { imgSrc: 'Asset/Images/ArtAll_Img/5.png', dataKey: 'art5' },
    p6: { imgSrc: 'Asset/Images/ArtAll_Img/6.png', dataKey: 'art6' },
    p7: { imgSrc: 'Asset/Images/ArtAll_Img/7.png', dataKey: 'art7' },
    p8: { imgSrc: 'Asset/Images/ArtAll_Img/8.png', dataKey: 'art8' },
    p9: { imgSrc: 'Asset/Images/ArtAll_Img/9.png', dataKey: 'art9' },
    p10: { imgSrc: 'Asset/Images/ArtAll_Img/10.png', dataKey: 'art10' },
    p11: { imgSrc: 'Asset/Images/ArtAll_Img/11.png', dataKey: 'art11' },
    p12: { imgSrc: 'Asset/Images/ArtAll_Img/12.png', dataKey: 'art12' },
};

// List of keys that require innerHTML (to process <br> tags)
const fieldsUsingInnerHTML = ['art_material', 'art_size'];

function openPopup(pointClass) {
    const data = popupData[pointClass];
    if (!data) return;
    
    const { imgSrc, dataKey } = data;

    // Set image source
    document.querySelector('.artwork_img').src = imgSrc;

    // Set text values for each data-key
    document.querySelectorAll('.text [data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        const content = translations?.[currentLang]?.['art_popups']?.[dataKey]?.[key] || ''; 

        if (fieldsUsingInnerHTML.includes(key)) {
            element.innerHTML = content; // for what have <br>
        } else {
            element.textContent = content;
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

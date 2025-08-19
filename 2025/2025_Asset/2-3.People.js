//points
const illust = document.querySelector('.illust');
const points = document.querySelectorAll('.point');

const pointPositions = {
    p1: { top: 67, left: 36.5 },
    p2: { top: 82, left: 60.7 },
    p3: { top: 56, left: 47 },
    p4: { top: 66, left: 56 },
    p5: { top: 41.5, left: 60.2 },
    p6: { top: 44, left: 68.2 },
    p7: { top: 38, left: 48 },
    p8: { top: 46.2, left: 33 },
    p9: { top: 69, left: 70.5 },
}

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


//Popup
const popupData = {
    p1: { imgSrc: '2025_Asset/Images/People_Img/1.png', dataKey: 'member1' },
    p2: { imgSrc: '2025_Asset/Images/People_Img/2.png', dataKey: 'member2' },
    p3: { imgSrc: '2025_Asset/Images/People_Img/3.png', dataKey: 'member3' },
    p4: { imgSrc: '2025_Asset/Images/People_Img/4.png', dataKey: 'member4' },
    p5: { imgSrc: '2025_Asset/Images/People_Img/5.png', dataKey: 'member5' },
    p6: { imgSrc: '2025_Asset/Images/People_Img/6.png', dataKey: 'member6' },
    p7: { imgSrc: '2025_Asset/Images/People_Img/7.png', dataKey: 'member7' },
    p8: { imgSrc: '2025_Asset/Images/People_Img/8.png', dataKey: 'member8' },
    p9: { imgSrc: '2025_Asset/Images/People_Img/9.png', dataKey: 'member9' },
};

function openPopup(pointClass) {
    const data = popupData[pointClass];
    if (!data) return;

    const { imgSrc, dataKey } = data;

    // 팝업 이미지 설정
    document.querySelector('.member_img').src = imgSrc;

    // 텍스트 설정
    document.querySelectorAll('.text [data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[currentLang] && translations[currentLang]['people_popups'][dataKey]) {
            element.textContent = translations[currentLang]['people_popups'][dataKey][key];
        } else {
            element.textContent = ''; // Fallback
        }
    });

    // 팝업과 오버레이 표시
    document.querySelector('.popup-overlay').style.display = 'block';
    document.querySelector('.popup-window').style.display = 'block';

    // 효과음 재생
    playSound(pointClass);
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

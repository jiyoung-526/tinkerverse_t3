//points
const illust = document.querySelector('.illust');
const points = document.querySelectorAll('.point');

const pointPositions = {
    p1: { top: 56.3, left: 38.7 },
    p2: { top: 48.2, left: 59.7 },
    p3: { top: 67.5, left: 48.3 },
    p4: { top: 62.7, left: 73.7 },
    p5: { top: 54, left: 47.5 },
    p6: { top: 37.6, left: 55.5 },
    p7: { top: 45.3, left: 63.2 },
    p8: { top: 23, left: 65.2 },
    p9: { top: 49, left: 70.2 },
    p10: { top: 32.3, left: 64.5 },
    p11: { top: 57.2, left: 30 },
    p12: { top: 71.5, left: 36.5 },
    p13: { top: 57.3, left: 43 },
    p14: { top: 46.5, left: 67.5 },
    p15: { top: 74.6, left: 39 },
    p16: { top: 44.8, left: 33.7 },
    p17: { top: 40.5, left: 49.2 },
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
    p1: { imgSrc: 'Asset/Images/People_Img/1.png', dataKey: 'member1' },
    p2: { imgSrc: 'Asset/Images/People_Img/2.png', dataKey: 'member2' },
    p3: { imgSrc: 'Asset/Images/People_Img/3.png', dataKey: 'member3' },
    p4: { imgSrc: 'Asset/Images/People_Img/4.png', dataKey: 'member4' },
    p5: { imgSrc: 'Asset/Images/People_Img/5.png', dataKey: 'member5' },
    p6: { imgSrc: 'Asset/Images/People_Img/6.png', dataKey: 'member6' },
    p7: { imgSrc: 'Asset/Images/People_Img/7.png', dataKey: 'member7' },
    p8: { imgSrc: 'Asset/Images/People_Img/8.png', dataKey: 'member8' },
    p9: { imgSrc: 'Asset/Images/People_Img/9.png', dataKey: 'member9' },
    p10: { imgSrc: 'Asset/Images/People_Img/10.png', dataKey: 'member10' },
    p11: { imgSrc: 'Asset/Images/People_Img/11.png', dataKey: 'member11' },
    p12: { imgSrc: 'Asset/Images/People_Img/12.png', dataKey: 'member12' },
    p13: { imgSrc: 'Asset/Images/People_Img/13.png', dataKey: 'member13' },
    p14: { imgSrc: 'Asset/Images/People_Img/14.png', dataKey: 'member14' },
    p15: { imgSrc: 'Asset/Images/People_Img/15.png', dataKey: 'member15' },
    p16: { imgSrc: 'Asset/Images/People_Img/16.png', dataKey: 'member16' },
    p17: { imgSrc: 'Asset/Images/People_Img/17.png', dataKey: 'member17' },
};

function playSound(pointClass) {
    const audioPlayer = document.getElementById('audio-player');
    const soundIndex = parseInt(pointClass.slice(1)); // 'p1' -> 1
    if (soundIndex >= 1 && soundIndex <= 12) {
        audioPlayer.src = `Asset/Sounds/peoplebgm/${soundIndex}.wav`;
        audioPlayer.play();
    }
}

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

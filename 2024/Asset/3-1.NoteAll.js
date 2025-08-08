// points
const points = document.querySelectorAll('.point');

// 포인트 위치
const desktopPointPositions = {
    p1: { top: 10, left: 3.5 },
    p2: { top: 10, left: 10.55 },
    p3: { top: 10, left: 18.1 },
    p4: { top: 11, left: 29.4 },
    p5: { top: 11, left: 36.8 },
    p6: { top: 10, left: 46.7 },
    p7: { top: 10, left: 53 },
    p8: { top: 10, left: 61.8 },
    p9: { top: 10, left: 70.3 },
    p10: { top: 10, left: 76.5 },
    p11: { top: 10, left: 83.1 },
    p12: { top: 11, left: 92.4 },
};

const mobilePointPositions = {
    p1: { top: 0.5, left: 47 },
    p2: { top: 8.5, left: 61 },
    p3: { top: 16.8, left: 46 },
    p4: { top: 25, left: 55 },
    p5: { top: 33.5, left: 49 },
    p6: { top: 42, left: 40 },
    p7: { top: 50.5, left: 54 },
    p8: { top: 59, left: 54 },
    p9: { top: 67, left: 46 },
    p10: { top: 76, left: 50 },
    p11: { top: 84, left: 40 },
    p12: { top: 93, left: 51 },
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

//popup
const popupData = {
    p1: { imgSrc: 'Asset/Images/Note_F_Img/1.png', dataKey: 'space1' },
    p2: { imgSrc: 'Asset/Images/Note_F_Img/2.png', dataKey: 'space2' },
    p3: { imgSrc: 'Asset/Images/Note_F_Img/3.png', dataKey: 'space3' },
    p4: { imgSrc: 'Asset/Images/Note_F_Img/4.png', dataKey: 'space4' },
    p5: { imgSrc: 'Asset/Images/Note_F_Img/5.png', dataKey: 'space5' },
    p6: { imgSrc: 'Asset/Images/Note_F_Img/6.png', dataKey: 'space6' },
    p7: { imgSrc: 'Asset/Images/Note_F_Img/7.png', dataKey: 'space7' },
    p8: { imgSrc: 'Asset/Images/Note_F_Img/8.png', dataKey: 'space8' },
    p9: { imgSrc: 'Asset/Images/Note_F_Img/9.png', dataKey: 'space9' },
    p10: { imgSrc: 'Asset/Images/Note_F_Img/10.png', dataKey: 'space10' },
    p11: { imgSrc: 'Asset/Images/Note_F_Img/11.png', dataKey: 'space11' },
    p12: { imgSrc: 'Asset/Images/Note_F_Img/12.png', dataKey: 'space12' },
};
const soundPaths = {
    p1: 'Asset/Sounds/notebgm/1.wav',
    p2: 'Asset/Sounds/notebgm/2.wav',
    p3: 'Asset/Sounds/notebgm/3.wav',
    p4: 'Asset/Sounds/notebgm/4.wav',
    p5: 'Asset/Sounds/notebgm/5.wav',
    p6: 'Asset/Sounds/notebgm/6.wav',
    p7: 'Asset/Sounds/notebgm/7.wav',
    p8: 'Asset/Sounds/notebgm/8.wav',
    p9: 'Asset/Sounds/notebgm/9.wav',
    p10: 'Asset/Sounds/notebgm/10.wav',
    p11: 'Asset/Sounds/notebgm/11.wav',
    p12: 'Asset/Sounds/notebgm/12.wav',
};

//현재 열려 있는 point 저장
let currentPoint = null;

function playSoundAndOpenPopup(pointClass) {
    currentPoint = pointClass; // 현재 point 저장

    const soundPath = soundPaths[pointClass];
    if (soundPath) {
        const audio = new Audio(soundPath);
        audio.play();
    }

    openPopup(pointClass);
}

function openPopup(pointClass) {
    const data = popupData[pointClass];
    if (!data) return;
    
    const { imgSrc } = data;
    
    document.querySelector('.note_img').src = imgSrc;

    //Show popup and overlay
    document.querySelector('.popup-overlay').style.display = 'block';
    document.querySelector('.popup-window').style.display = 'block';
}

function closePopup() {
    document.querySelector('.popup-overlay').style.display = 'none';
    document.querySelector('.popup-window').style.display = 'none';
    currentPoint = null; //팝업 닫힐 때 초기화
}

window.addEventListener('DOMContentLoaded', () => {
    //Point 클릭
    document.querySelectorAll('.point').forEach(point => {
        point.addEventListener('click', (e) => {
            const pointClass = e.target.classList[1];
            playSoundAndOpenPopup(pointClass);
        });
    });

    //작품노트펼치기 클릭
    document.querySelector('.artnote_open_btn').addEventListener('click', () => {
        if (currentPoint) {
            const notePage = `3.noteA${currentPoint.replace('p', '')}.html`;
            window.location.href = notePage;
        }
    });

    //상품노트펼치기 클릭
    document.querySelector('.prodnote_open_btn').addEventListener('click', () => {
        if (currentPoint) {
            const notePage = `3.noteP${currentPoint.replace('p', '')}.html`;
            window.location.href = notePage;
        }
    });

    //팝업 닫기
    document.querySelector('.close-button').addEventListener('click', closePopup);
});

window.addEventListener('popstate', (event) => {
    if (event.state && event.state.popupOpen) {
        // 팝업 상태가 열려있으면 다시 열기
        openPopup(event.state.popupClass);
    }
});

// 팝업 열 때 상태 저장
function openPopup(pointClass) {
    const data = popupData[pointClass];
    if (!data) return;

    // 팝업 데이터 렌더링
    document.querySelector('.note_img').src = data.imgSrc;
    document.querySelector('.popup-overlay').style.display = 'block';
    document.querySelector('.popup-window').style.display = 'block';

    // 상태 추가
    history.pushState({ popupOpen: true, popupClass: pointClass }, '', '');
}

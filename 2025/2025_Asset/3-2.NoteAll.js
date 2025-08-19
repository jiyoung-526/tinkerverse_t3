// points
const points = document.querySelectorAll('.point');

// 포인트 위치
const desktopPointPositions = {
    p1: { top: 38, left: 11 }, //채은
    p2: { top: 17, left: 61 }, //세현
    p3: { top: 60, left: 38 }, //유선
    p4: { top: 57, left: 82 }, //윤제
    p5: { top: 8, left: 90 }, //승준
    p6: { top: 9, left: 32 }, //윤하
};

const mobilePointPositions = {
    p1: { top: 21, left: 23 },
    p2: { top: 37, left: 74 },
    p3: { top: 50, left: 26 },
    p4: { top: 82, left: 37 },
    p5: { top: 66, left: 80 },
    p6: { top: 10, left: 73 },
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
    p1: { imgSrc: '2025_Asset/Images/Note_F_Img/1.png', dataKey: 'space1' },
    p2: { imgSrc: '2025_Asset/Images/Note_F_Img/2.png', dataKey: 'space2' },
    p3: { imgSrc: '2025_Asset/Images/Note_F_Img/3.png', dataKey: 'space3' },
    p4: { imgSrc: '2025_Asset/Images/Note_F_Img/4.png', dataKey: 'space4' },
    p5: { imgSrc: '2025_Asset/Images/Note_F_Img/5.png', dataKey: 'space5' },
    p6: { imgSrc: '2025_Asset/Images/Note_F_Img/6.png', dataKey: 'space6' },
};

//현재 열려 있는 point 저장
let currentPoint = null;

function playSoundAndOpenPopup(pointClass) {
    currentPoint = pointClass; // 현재 point 저장

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
            const notePage = `2025_3.noteA${currentPoint.replace('p', '')}.html`;
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

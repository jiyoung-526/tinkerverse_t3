// 일러스트와 책갈피 위치 업뎃
const illust = document.querySelector('#zoomable-illust');
const bookshelf = document.querySelector('#zoomable-bookshelf');

// bookshelf의 상대적 위치 (illust 기준 비율)
const bookshelfPosition = {
    top: 45,
    left: 48,
};

// bookshelf 위치 업데이트 함수
function updateBookshelfPosition() {
    const illustRect = illust.getBoundingClientRect(); // illust 현재 크기와 위치

    // bookshelf의 위치를 illust의 크기와 위치를 기준으로 계산
    bookshelf.style.top = `${illustRect.top + (illustRect.height * bookshelfPosition.top) / 100}px`;
    bookshelf.style.left = `${illustRect.left + (illustRect.width * bookshelfPosition.left) / 100}px`;
}

// 이벤트 리스너 등록
window.addEventListener('resize', updateBookshelfPosition);
window.addEventListener('load', updateBookshelfPosition);

//Music - - - - - - - -
const musicButton = document.querySelector('.music-button');
const backgroundAudio = new Audio('../Asset/Sounds/homeBGM.mp3');

// 초기 상태
backgroundAudio.loop = true;
backgroundAudio.play(); // 페이지 로드 시 자동 재생
let isPlaying = true;

// 버튼 클릭 이벤트 리스너
musicButton.addEventListener('click', () => {
    if (isPlaying) {
        backgroundAudio.pause();
        musicButton.textContent = '▶';
    } else {
        backgroundAudio.play();
        musicButton.textContent = '||';
    }
    isPlaying = !isPlaying;
});

//Zoom - - - - - - - -
const zoomableImages = document.querySelectorAll('#zoomable-illust, #zoomable-bookshelf');
const zoomButton = document.querySelector('.zoom-button');
const zoomTrack = document.querySelector('.zoom-track');
const container = document.querySelector('body'); // 이미지 이동 범위

let isDraggingZoom = false; // 줌 버튼 드래그 상태
let isDraggingImage = false; // 이미지 드래그 상태
let zoomScale = 1;
let offsetX = 0; // 이미지 이동 오프셋 X
let offsetY = 0; // 이미지 이동 오프셋 Y
let startX = 0; // 마우스 시작 위치 X
let startY = 0; // 마우스 시작 위치 Y

// 이벤트 리스너 추가 (줌 버튼 및 트랙)
zoomButton.addEventListener('mousedown', (e) => startDragZoom(e));
zoomButton.addEventListener('touchstart', (e) => startDragZoom(e, true));
document.addEventListener('mouseup', endDragZoom);
document.addEventListener('touchend', endDragZoom);
document.addEventListener('mousemove', (e) => dragZoom(e));
document.addEventListener('touchmove', (e) => dragZoom(e, true));
zoomTrack.addEventListener('click', (e) => handleZoomTrackClick(e));

// 줌 버튼 드래그 시작 이벤트
function startDragZoom(e, isTouch = false) {
    isDraggingZoom = true;
    if (isTouch) e.preventDefault(); // 줌 버튼 드래그에만 기본 동작 방지
}

// 줌 버튼 드래그 중 이벤트
function dragZoom(e, isTouch = false) {
    if (isDraggingZoom) {
        const clientX = isTouch ? e.touches[0].clientX : e.clientX;
        updateZoomButtonAndScale(clientX);

        if (isTouch) e.preventDefault(); // 줌 버튼 드래그에만 기본 동작 방지
    }
}

// 줌 버튼 드래그 종료 이벤트
function endDragZoom() {
    isDraggingZoom = false;
    isDraggingImage = false;
}

// 줌 트랙 클릭 이벤트
function handleZoomTrackClick(e) {
    const clientX = e.clientX;
    updateZoomButtonAndScale(clientX);
}

// 이미지 드래그 시작 이벤트 (zoomableImages 전체 적용)
zoomableImages.forEach((image) => {
    image.addEventListener('mousedown', (e) => startDragImage(e));
    image.addEventListener('touchstart', (e) => startDragImage(e, true));
});

// 이미지 드래그 시작
function startDragImage(e, isTouch = false) {
    isDraggingImage = true;
    startX = isTouch ? e.touches[0].clientX : e.clientX;
    startY = isTouch ? e.touches[0].clientY : e.clientY;

    if (isTouch) e.stopPropagation(); // 터치 드래그 중 스크롤 허용
}

// 이미지 드래그 중 이벤트
document.addEventListener('mousemove', (e) => {
    if (isDraggingImage) handleImageDrag(e.clientX, e.clientY);
});

document.addEventListener('touchmove', (e) => {
    if (isDraggingImage) {
        handleImageDrag(e.touches[0].clientX, e.touches[0].clientY);
        e.stopPropagation(); // 터치 이벤트의 스크롤 충돌 방지
    }
});

// 이미지 드래그 종료 이벤트
document.addEventListener('mouseup', () => (isDraggingImage = false));
document.addEventListener('touchend', () => (isDraggingImage = false));

// 이미지 이동 및 줌 업데이트 함수
function updateImageTransform() {
    zoomableImages.forEach((image) => {
        image.style.transform = `
            translate(calc(-50% + ${offsetX}px), calc(-40% + ${offsetY}px))
            scale(${zoomScale})
        `;
    });
}

// 이미지 중심 리셋 함수
function resetImagePosition() {
    offsetX = 0;
    offsetY = 0;
    updateImageTransform();
}

// 줌 버튼과 확대 비율 업데이트 함수
function updateZoomButtonAndScale(clientX) {
    const trackRect = zoomTrack.getBoundingClientRect();
    let newLeft = clientX - trackRect.left;

    // 버튼 이동 제한 (트랙의 범위 안에서만)
    newLeft = Math.max(0, Math.min(newLeft, trackRect.width));

    // 버튼 위치 업데이트
    zoomButton.style.left = `${newLeft}px`;

    const zoomRatio = newLeft / trackRect.width;

    const minScale = 1; // 기본 크기
    const maxScale = 2.5; // 최대 확대 배율
    const previousZoomScale = zoomScale; // 이전 줌배율 저장
    zoomScale = minScale + zoomRatio * (maxScale - minScale);

    // 줌아웃 > 이미지 중심 리셋
    if (zoomScale < previousZoomScale) {
        resetImagePosition();
    }

    updateImageTransform();
}

// 이미지 드래그 처리 함수
function handleImageDrag(clientX, clientY) {
    const deltaX = clientX - startX;
    const deltaY = clientY - startY;
    startX = clientX;
    startY = clientY;

    // 오프셋 업데이트
    offsetX = Math.max(
        Math.min(offsetX + deltaX, container.offsetWidth / 2),
        -container.offsetWidth / 2
    );
    offsetY = Math.max(
        Math.min(offsetY + deltaY, container.offsetHeight / 2),
        -container.offsetHeight / 2
    );

    updateImageTransform();
}

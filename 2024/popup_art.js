const popupData = {
    1: { img: "Asset/Images/ArtAll_Img/1.png", dataKey: 'art1' },
    2: { img: "Asset/Images/ArtAll_Img/2.png", dataKey: 'art2' },
    3: { img: "Asset/Images/ArtAll_Img/3.png", dataKey: 'art3' },
    4: { img: "Asset/Images/ArtAll_Img/4.png", dataKey: 'art4' },
    5: { img: "Asset/Images/ArtAll_Img/5.png", dataKey: 'art5' },
    6: { img: "Asset/Images/ArtAll_Img/6.png", dataKey: 'art6' },
    7: { img: "Asset/Images/ArtAll_Img/7.png", dataKey: 'art7' },
    8: { img: "Asset/Images/ArtAll_Img/8.png", dataKey: 'art8' },
    9: { img: "Asset/Images/ArtAll_Img/9.png", dataKey: 'art9' },
    10: { img: "Asset/Images/ArtAll_Img/10.png", dataKey: 'art10' },
    11: { img: "Asset/Images/ArtAll_Img/11.png", dataKey: 'art11' },
    12: { img: "Asset/Images/ArtAll_Img/12.png", dataKey: 'art12' },
};

async function loadPopup() {
    const response = await fetch('popup_art.html');
    const popupHTML = await response.text();
    document.body.insertAdjacentHTML('beforeend', popupHTML);
}

// (to process <br> tags)
const fieldsUsingInnerHTML = ['art_material'];

function openPopup(pointClass) {
    const data = popupData[pointClass];
    if (!data) return;
    
    const { img, dataKey } = data;

    document.querySelector('.artwork_img').src = img;

    document.querySelectorAll('.text [data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        const content = translations?.[currentLang]?.['art_popups']?.[dataKey]?.[key] || ''; 

        if (fieldsUsingInnerHTML.includes(key)) {
            element.innerHTML = content; // for what have <br>
        } else {
            element.textContent = content;
        }
    });

    document.querySelector('.popup-overlay').style.display = 'block';
    document.querySelector('.popup-window').style.display = 'block';
}

function closePopup() {
    document.querySelector(".popup-overlay").style.display = "none";
    document.querySelector(".popup-window").style.display = "none";
}

// DOMContentLoaded 이벤트에서 팝업 HTML 파일 로드
window.addEventListener("DOMContentLoaded", loadPopup);

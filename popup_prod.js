const popupData = {
    1: { img: "Asset/Images/ProdAll_Img/1.png", dataKey: 'prod1' },
    2: { img: "Asset/Images/ProdAll_Img/2.png", dataKey: 'prod2' },
    3: { img: "Asset/Images/ProdAll_Img/3.png", dataKey: 'prod3' },
    4: { img: "Asset/Images/ProdAll_Img/4.png", dataKey: 'prod4' },
    5: { img: "Asset/Images/ProdAll_Img/5.png", dataKey: 'prod5' },
    6: { img: "Asset/Images/ProdAll_Img/6.png", dataKey: 'prod6' },
    7: { img: "Asset/Images/ProdAll_Img/7.png", dataKey: 'prod7' },
    8: { img: "Asset/Images/ProdAll_Img/8.png", dataKey: 'prod8' },
    9: { img: "Asset/Images/ProdAll_Img/9.png", dataKey: 'prod9' },
    10: { img: "Asset/Images/ProdAll_Img/10.png", dataKey: 'prod10' },
    11: { img: "Asset/Images/ProdAll_Img/11.png", dataKey: 'prod11' },
    12: { img: "Asset/Images/ProdAll_Img/12.png", dataKey: 'prod12' },
};

async function loadPopup() {
    const response = await fetch('popup_prod.html');
    const popupHTML = await response.text();
    document.body.insertAdjacentHTML('beforeend', popupHTML);
}

function openPopup(index) {
    const data = popupData[index];
    const { img, dataKey } = data;

    document.querySelector('.prod_img').src = img;

    document.querySelectorAll('.text [data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        element.textContent = translations[currentLang]['prod_popups'][dataKey][key];
    });

    document.querySelector('.popup-overlay').style.display = 'block';
    document.querySelector('.popup-window').style.display = 'block';
}

function closePopup() {
    document.querySelector('.popup-overlay').style.display = 'none';
    document.querySelector('.popup-window').style.display = 'none';
}

window.addEventListener('DOMContentLoaded', loadPopup);
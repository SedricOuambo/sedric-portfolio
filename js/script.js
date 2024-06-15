/**************** Validation *************** */
/**
 * Vérifier si le courriel envoyé au serveur est valide
 * @param {string} courriel 
 * @returns bool
 */
function isCourrielValide(couriel) {
    //Reference : https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return couriel.length >= 8 &&
        String(couriel).toLowerCase().match(reg);
}

const success = () => {
    document.getElementById('sender_subject').value = "";
    document.getElementById('sender_message').value = "";
    document.getElementById('infos').style.color = 'green';
    document.getElementById('infos').textContent = 'Courriel envoyé avec succès.'
}

/**************** Envoi de message ************************* */
function sendMail() {
    let nom = document.getElementById('sender_name').value;
    let objet = document.getElementById('sender_subject').value;
    let email = document.getElementById('sender_email').value;
    let message = document.getElementById('sender_message').value;
    const language_button = document.getElementById('home__language');
    const language = language_button.textContent.toString();

    const infos = document.getElementById('infos');

    if (nom === "" || email === "" || message === "") {
        infos.style.color = 'red';
        if (!language === 'FR') {
            infos.textContent = "Veuillez remplir tous les champs obligatoires.";
        }
        else {
            infos.textContent = "Please fill in all required fields.";
        }
    }
    else if (!isCourrielValide(email)) {
        infos.style.color = 'red';
        if (!language === 'FR') {
            infos.textContent = "Adresse courrielle invalide.";
        }
        else{
            infos.textContent = "Invalid email address.";
        }
    } else {
        let parms = {
            name: nom,
            subject: objet,
            email: email,
            message: message,
        }
        emailjs.send("service_7xr0l1o", "template_qxyqu87", parms)
            .then(success())
    }
}

const send_button = document.getElementById('send_button');
send_button.addEventListener('click', sendMail);

/************************ Gestion des nav__item du header************************/
const nav_item_list = document.querySelectorAll('#nav__item');
nav_item_list.forEach(item => {
    item.addEventListener('click', () => {
        nav_item_list.forEach(nav_item => {
            nav_item.classList.remove('active__nav__item');
        });
        item.classList.add('active__nav__item');
    });
});

/************************ MAMAGE LANGUAGE************************/
const language_button = document.getElementById('home__language');
const download_link = document.getElementById('download_link');

language_button.addEventListener('click', changeLanguage);

async function changeLanguage() {
    const language = language_button.textContent.toString();
    if (language === 'FR') await setContent('FR');
    else await setContent('EN');
}

async function setContent(language) {
    //Recuperation du dictionnaire du fichier json
    let content = await fetch('./json/dictionnary.json');
    let dictionnary = await content.json();
    dictionnary.forEach(element => {
        let node = document.getElementsByClassName(element['title'])[0];
        node.textContent = element[language];
    });

    if (language === 'FR') {
        // let displayMode2 = document.getElementById('display__mode');
        // let displayModeContent = displayMode2.innerText.toString();
        language_button.textContent = 'EN';
        // displayMode2.innerText = displayModeContent === 'Dark mode' ? 'Mode sombre' : 'Mode clair';
        download_link.setAttribute('href', './pdf/Ouambo_Silatchom_Sedric_CV_FR.pdf')
    }
    else {
        // let displayMode2 = document.getElementById('display__mode');
        // let displayModeContent = displayMode2.innerText.toString();
        language_button.textContent = 'FR';
        // displayMode2.textContent = displayModeContent === 'Mode sombre' ? 'Dark mode' : 'Light mode';
        download_link.setAttribute('href', './pdf/Ouambo_Silatchom_Sedric_CV_EN.pdf')
    }
}

/************************ MENU SHOW Y HIDDEN ************************/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');

/************************ MENU SHOW  ************************/
/* validate if constant esxists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/************************ MENU HIDDEN ************************/
/* validate if constant esxists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/************************* REMOVE MENU MOBILE**********************/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/************************* ACCORDION SKILLS**********************/
const skillsContent = document.getElementsByClassName('skills__content'),
    skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
    let itemClass = this.parentNode.className;
    for (i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close';
    }
    if (itemClass === 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open';
    }
}

skillsHeader.forEach((element) => {
    element.addEventListener('click', toggleSkills);
})

/************************* QUALIFICATION TABS **********************/
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active');
        });
        target.classList.add('qualification__active');

        tabs.forEach(tab => {
            tab.classList.remove('qualification__active');
        })
        tab.classList.add('qualification__active');
    })
})

/************************* SERVICES MODAL**********************/
const modalViews = document.querySelectorAll('.services__modal'),
    modalBtns = document.querySelectorAll('.services__button'),
    modalCloses = document.querySelectorAll('.services__modal-close');

let modal = function (modalClick) {
    modalViews[modalClick].classList.add('active-modal');
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i);
    })
});

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal');
        });
    });
});

/************************* PORTFOLIO SWIPER**********************/
let swiper = new Swiper(".portfolio__container", {
    cssMode: true,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    mousewheel: true,
    keyboard: true,
});

/********************** PORTFOLIO MODAL *****************************/
const portfolioDescBtns = document.querySelectorAll('.portfolio__button2'),
    portfolioCloses = document.querySelectorAll('.portfolio__modal-close'),
    portfolioModal = document.querySelectorAll('.portfolio__modal');

portfolioDescBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        let id = btn.getAttribute('id');
        let modal = document.getElementById('portfolio__modal' + id);
        modal.classList.add('active-modal');
    });
});

portfolioCloses.forEach((btnClose) => {
    btnClose.addEventListener('click', () => {
        portfolioModal.forEach((modal) => {
            modal.classList.remove('active-modal');
        });
    });
});

/*********************** PORTFOLIO DISPLAY PROJECT**************************** */
const projectsHeader = document.querySelectorAll('#project__header'),
    projectsContent = document.querySelectorAll('#project__content');

projectsHeader.forEach(projet => {
    projet.addEventListener('click', () => {
        if (projet.nextElementSibling.classList.contains('cache')) {
            projectsContent.forEach(projetContent => {
                projetContent.classList.add('cache');
            });
            projectsHeader.forEach(projetHeader => {
                projetHeader.classList.remove('skills__open');
            });
            projet.classList.add('skills__open');
            projet.nextElementSibling.classList.remove('cache');
        } else {
            projet.classList.remove('skills__open');
            projet.nextElementSibling.classList.add('cache');
        }
    });
});

/********************** SCROLL SECTIONS ACTIVE LINK *****************************/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        let sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__nemu a[href*=' + sectionId + ']').classList.add('active-link');
        }
        else {
            document.querySelector('.nav__nemu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/********************** CHANGE BACKGROUND HEADER *****************************/
function scrollHeader() {
    const nav = document.getElementById('header');
    if (this.scrollY >= 80) {
        nav.classList.add('scroll-header');
    } else {
        nav.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

/********************** SHOW SCROLL UP *****************************/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (this.scrollY >= 560) {
        scrollUp.classList.add('show-scroll');
    }
    else {
        scrollUp.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollUp);

/********************** DARK LIGHT THEME*****************************/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

//sujet precedemment selectionne (si l'utilisateur a selectionner)
const selectedTheme = localStorage.getItem('selected-them');
const selectedIcon = localStorage.getItem('selected-icon');

//On obtient le them courant 
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

//On valide si l'utilisateur a precedemment choisi un sujet
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
}

//Activer ou desactiver le theme avec le bouton
themeButton.addEventListener('click', () => {
    let displayLanguage = document.getElementById('home__language');
    let displayMode = document.getElementById('display__mode');
    let displayLanguageContent = displayLanguage.innerText;
    //add or remove dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    //save the theme and current icon that user choose
    localStorage.setItem('selected-them', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());

    if (getCurrentTheme() === 'dark') {
        displayMode.innerText = displayLanguageContent === 'English' ? 'Mode clair' : 'Light mode';
    }
    else {
        displayMode.innerText = displayLanguageContent === 'English' ? 'Mode sombre' : 'Dark mode';
    }
});

// function initDarkMode(mode){
//     let displayLanguage2 = document.getElementById('home__language');
//     let displayMode2 = document.getElementById('display__mode');

//     const themeButton2 = document.getElementById('theme-button');
//     const darkTheme2 = 'dark-theme';
//     const iconTheme2 = 'uil-sun';

//     document.body.classList.toggle(darkTheme2);
//     themeButton2.classList.toggle(iconTheme2);
// }

//Load English Content first
// initDarkMode();
setContent('EN');
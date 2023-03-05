window.addEventListener('load', () => {
  const animItems = document.querySelectorAll('.anim-item');
  animItems.forEach((el) => {
    el.classList.add('active');
  })
})

window.addEventListener('scroll', () => {
  const image = document.querySelector('.main__bg-image');
  image.classList.remove('active');
  image.classList.add('out');
})

const link = document.querySelector('.nav__item-wrapper');
const button = document.querySelector('.nav__button');
const menu = document.querySelector('.nav__dropdown-menu');

link.addEventListener('click', () => {
  if (button.classList.contains('nav__button--close') && menu.classList.contains('nav__dropdown-menu--close')) {
    button.classList.remove('nav__button--close');
    menu.classList.remove('nav__dropdown-menu--close');
  } 
})

button.addEventListener('click', () => {
  if (!button.classList.contains('nav__button--close') && !menu.classList.contains('nav__dropdown-menu--close')) {
    button.classList.add('nav__button--close');
    menu.classList.add('nav__dropdown-menu--close');
  }
})

const scrollButton = document.querySelector('.main__scroll-wrapper');
scrollButton.addEventListener('click', () => {
  const image = document.querySelector('.main__bg-image');
  image.classList.remove('active');
  image.classList.add('out');
})

// Бургер-меню
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.header__navigation-button');

navToggle.addEventListener('click', function () {
  if (nav.classList.contains('nav__menu--closed')) {
    nav.classList.remove('nav__menu--closed');
    nav.classList.add('nav__menu--opened');
  } else {
    nav.classList.add('nav__menu--closed');
    nav.classList.remove('nav__menu--opened');
  }
});
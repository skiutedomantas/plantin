import './style.css'
import gsap from 'gsap';


const hamburger = document.querySelector('.hamburger');
const menuOverlay = document.querySelector('.menu-overlay');
const body = document.body;
const menuLinks = document.querySelectorAll('.menu-nav a');
const country = document.querySelector('.country');

const toggleMenu = () => {
  menuOverlay.classList.toggle('open');
  body.classList.toggle('no-scroll');
}
const closeMenu =() => {
  menuOverlay.classList.remove('open');
  body.classList.remove('no-scroll');
}

hamburger.addEventListener('click', toggleMenu);

menuLinks.forEach(link => link.addEventListener('click', closeMenu));



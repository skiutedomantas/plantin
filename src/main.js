import './style.css'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);


const hamburger = document.querySelector('.hamburger');
const menuOverlay = document.querySelector('.menu-overlay');
const menuLinks = document.querySelectorAll('.menu-nav a');
const counters = document.querySelectorAll('.counter h2');
const exploreButton = document.querySelector("#explore-button");
const closeButton = document.querySelector('.closing-button')
const booksOverlay = document.getElementById("books-overlay");
const books = document.querySelectorAll(".carousel-image");
const items = document.querySelectorAll(".items-list li");

const body = document.body;
const images = [
 '/src/assets/Press3.png', 
 '/src/assets/Press2.png', 
 '/src/assets/Press3.png', 
];

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

const animateCounter = (counter) => {
  const targetValue = +counter.dataset.value;
  
  gsap.fromTo(
    counter,
    { textContent: 0 },
    {
      textContent: targetValue,
      duration: 2,
      ease: "power1.out",
      scrollTrigger: {
        trigger: '.printing-container',
        start:"center center",
        toggleActions: "play reset play reset",
      },
      snap: { textContent: 1 },
    }
  );
}; 
 counters.forEach(counter => animateCounter(counter));



const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: '.timeline-container',
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});


images.forEach((image, index) => {
  timeline.to('.left', {
    y: `${22 * (index + 1)}%`, 
    ease: "linear",
  })
  .call(() => {
    document.querySelector('.left img').src = image;
  })
});

gsap.to('.left h2', {
  scrollTrigger: {
    trigger: '.timeline-container',
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
      const value = Math.round(self.progress * 22);
      document.querySelector('.left h2').textContent = value;
    }
  }
});


const showBookOverlay = () => {
  booksOverlay.style.display = "flex";
  body.classList.add('no-scroll');
  setActiveImage(0); 
}
exploreButton.addEventListener('click', showBookOverlay);


const hideBookOverlay = () => {
  booksOverlay.style.display = "none"; 
  body.classList.remove('no-scroll');
}
closeButton.addEventListener('click', hideBookOverlay);

function setActiveImage(index) {
  books.forEach((img, i) => {
    img.classList.toggle("active", i === index); 
  });
}

items.forEach((item) => {
  item.addEventListener("click", () => {
    const imageIndex = parseInt(item.getAttribute("data-image-index"));
    setActiveImage(imageIndex);
  });
});

const countries = document.querySelectorAll(".available");
const svgContainer = document.querySelector("#svg-container");

const countryData = {
  Spain: {
    title: "Spain",
    description: "Plantin’s Polyglot Bible had a big impact in Spain, especially among religious groups. His books played a role in the religious debates during the Counter-Reformation and helped spread Catholic beliefs.",
  },
  Italy: {
    title: "Italy",
    description: "Plantin’s books, especially his typefaces, influenced the printing style in Italy. His work with fonts, especially Garamond, helped shape how printing looked in Italy during the 16th century.",
  },
  England: {
    title: "England",
    description: "Plantin’s scientific books influenced English scholars and the development of science. His books about astronomy and nature helped spread important knowledge in England.",
  },
  France: {
    title: "France",
    description: "Plantin’s typefaces and scholarly books had a strong effect in France, especially in the church and royal circles. His books, like the Polyglot Bible, spread important ideas in France.",
  },
  Germany: {
    title: "Germany",
    description: "Plantin’s Polyglot Bible and other works influenced German scholars during the Reformation. His books helped shape debates about religion and philosophy in Germany.",
  },
  Netherlands: {
    title: "Netherlands",
    description: "Plantin’s work had a huge influence in his own country, the Netherlands. His books helped shape intellectual thought, especially during the Dutch Revolt.",
  },
};



const showInfo = (event) => {
  const countryName = event.target.dataset.country;

  countries.forEach((country) => country.classList.remove("golden"));

  event.target.classList.add("golden"); 

  if (countryData[countryName]) {
    let container = document.querySelector("#info-box");
    
    if (!container) {
      container = document.createElement("div");
      container.id = "info-box";
      svgContainer.appendChild(container);

      gsap.set(container, { opacity: 0, x: 50 });

      gsap.to(container, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.fromTo(
        container,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }

    container.innerHTML = `
      <h1>${countryData[countryName].title}</h1>
      <p>${countryData[countryName].description}</p>
    `;
  }
};

countries.forEach((country) => {
  country.addEventListener("click", showInfo);
});
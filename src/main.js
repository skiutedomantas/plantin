import './style.css'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';
import lottie from 'lottie-web';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

const hamburger = document.querySelector('.hamburger');
const menuOverlay = document.querySelector('.menu-overlay');
const menuLinks = document.querySelectorAll('.menu-nav a');
const counters = document.querySelectorAll('.counter h2');
const exploreButton = document.querySelector("#explore-button");
const closeButton = document.querySelector('.closing-button')
const mobileClosingButton = document.querySelector('.mobile-closing-button')
const booksOverlay = document.getElementById("books-overlay");
const listItems = document.querySelectorAll('.items-list li');
const cards = document.querySelectorAll('.card');
const countries = document.querySelectorAll(".available");
const svgContainer = document.querySelector("#svg-container");
const timelineWrapper = document.querySelector(".timeline-wrapper");
const timeline = document.querySelector(".timeline");
const mobileCarouselImage = document.querySelectorAll(".mobile-carousel img");
const mobileBookTitle = document.querySelector(".mobile-book-title");
const mobileBookDescription = document.querySelector(".mobile-book-description");
const prevButton = document.querySelector(".carousel-btn.prev");
const nextButton = document.querySelector(".carousel-btn.next");
const mobileProgressIndicator = document.querySelector(".mobile-progress-indicator");
const timelineContainer = document.querySelector('.right');
const images = document.querySelectorAll('.left img');
const containerHeight = timelineContainer.offsetHeight;
const movementStep = containerHeight / 3;
const timelineWidth = timelineWrapper.scrollWidth;
let currentIndex = 0;
const mm = gsap.matchMedia();
const mobileBooksOverlay = document.querySelector("#mobile-books-overlay"); 
const printingAnimation = document.querySelector(".printing-animation");
const bookAnimation = document.querySelector('.book-animation');
const bookInfoContainer = document.querySelector(".book-info")
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const body = document.body;
const isMobile = () => window.matchMedia("(max-width: 833px)").matches;
const triggerElement = isMobile() ? '.map-container' : '.printing-container';
const animationContainers = document.querySelectorAll('.animation');
const booksInfo = [
  {
    title: "Biblia Polyglotta",
    description: "Printed between 1568 and 1572, this eight-volume work featured the Bible in multiple languages, including Hebrew, Greek, Latin, and Aramaic. It was a masterpiece of Renaissance scholarship and a key tool for biblical studies.",
  },
  {
    title: "Hebrew Bible",
    description: "Plantin’s Hebrew Bible was a milestone for Hebrew typography, designed for scholars and religious leaders. Its high-quality print and detailed type made it popular across Europe.",
  },
  {
    title: "Corpus Juris Canonici",
    description: "This legal text was a major work on canon law, showcasing Plantin’s role in publishing works of intellectual and societal importance.",
  },
];
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

const toggleMenu = () => {
  menuOverlay.classList.toggle('open');
  body.classList.toggle('no-scroll');
};

hamburger.addEventListener('click', toggleMenu);

const closeMenu =() => {
  menuOverlay.classList.remove('open');
  body.classList.remove('no-scroll');
};

menuLinks.forEach(link => link.addEventListener('click', closeMenu));

const printingAnim = lottie.loadAnimation({
  container: printingAnimation,
  renderer: "svg",
  loop: true,
  autoplay: !prefersReducedMotion,
  path: new URL('./animation/printing.json', import.meta.url).href,
});

const bookAnim = lottie.loadAnimation({
  container: bookAnimation,
  renderer: "svg",
  loop: true,
  autoplay: !prefersReducedMotion,
  path: new URL('./animation/book.json', import.meta.url).href,
});

const stopLotties = () => {if (prefersReducedMotion) {
  printingAnim.goToAndStop(0, true);
  bookAnim.goToAndStop(0, true);    
}};

const animateCounter = (counter) => {
  const targetValue = +counter.dataset.value;


  if (!prefersReducedMotion) {
    gsap.fromTo(
      counter,
      { textContent: 0 },
      {
        textContent: targetValue,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: triggerElement,
          start: "center center",
          toggleActions: 'restart none restart none',
          markers: true,
        },
        snap: { textContent: 1 },
      }
    );
  } else {
    counter.textContent = targetValue;
  }
};
 counters.forEach(counter => animateCounter(counter));

const showBookOverlay = () => {
  if (isMobile()) {
    mobileBooksOverlay.style.display = "flex";
  } else {
    booksOverlay.classList.add('visible');
  }
  body.classList.add('no-scroll');
};

exploreButton.addEventListener('click', showBookOverlay);

const hideBookOverlay = () => {
  booksOverlay.classList.remove('visible'); 
  body.classList.remove('no-scroll');
};

closeButton.addEventListener('click', hideBookOverlay);

const hideMobileBookOverlay = () => {
  mobileBooksOverlay.style.display = "none"; 
  body.classList.remove('no-scroll');
};

mobileClosingButton.addEventListener('click', hideMobileBookOverlay);


const bookNavigation = () => {
  listItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      cards.forEach((card, cardIndex) => {
        if (index === cardIndex) {
          card.classList.add('visible'); 
        } else {
          card.classList.remove('visible');
        }
      });
      const book = booksInfo[index];
      bookInfoContainer.innerHTML = book.description;

      gsap.fromTo(
        bookInfoContainer, 
        { x: 50, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    });
  });
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

const mobileTimeline = () => {
  mm.add("(max-width: 833px)", () => {
    gsap.to(timeline, {
      x: () => -(timelineWidth - window.innerWidth + 100),
      ease: "none",
      scrollTrigger: {
        trigger: timelineWrapper,
        start: "top top",
        end: () => `+=${timelineWidth}`,
        scrub: true,
        pin: ".timeline-container",
      },
    });

    gsap.to(images, {
      scrollTrigger: {
        trigger: timelineWrapper,
        start: "top top",
        end: () => `+=${timelineWidth}`,
        scrub: true,
        onUpdate: (self) => {
          const index = Math.floor(self.progress * (images.length - 1));
          images.forEach((img, i) => {
            img.classList.toggle("visible", i === index);
            img.classList.toggle("hidden", i !== index);
          });
        },
      },
    });

    gsap.to(".left h2", {
      textContent: 22,
      roundProps: "textContent",
      scrollTrigger: {
        trigger: timelineWrapper,
        start: "top top",
        end: `+=${timelineWidth}`,
        scrub: true,
      },
    });
  });
};

const dekstopTimeline = () => {
    mm.add("(min-width: 834px)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
  
      images.forEach((_, index) => {
        timeline.to(".left", {
          y: `${movementStep * 0.75 * (index + 1)}px`,
          ease: "linear",
        }).call(() => {
          images.forEach((img, imgIndex) => {
            img.classList.toggle("visible", imgIndex === index);
            img.classList.toggle("hidden", imgIndex !== index);
          });
        });
      });
  
      gsap.to(".left h2", {
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            document.querySelector(".left h2").textContent = Math.round(
              self.progress * 22
            );
          },
        },
      });
    });
};
  
const updateMobileCarousel = (index) => {
  mobileCarouselImage.forEach((image, i) => {
    if (i === index) {
      image.classList.add("visible");
      image.classList.remove("hidden");
    } else {
      image.classList.add("hidden");
      image.classList.remove("visible");
    }
  });

  mobileBookTitle.textContent = booksInfo[index].title;
  mobileBookDescription.textContent = booksInfo[index].description;

  const dots = mobileProgressIndicator.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
};

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + booksInfo.length) % booksInfo.length; 
  updateMobileCarousel(currentIndex);
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % booksInfo.length;
  updateMobileCarousel(currentIndex);
});

const createProgressDots = () => {
  booksInfo.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active"); 
    dot.dataset.index = index;
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateMobileCarousel(currentIndex);
    });
    mobileProgressIndicator.appendChild(dot);
  });
};

const animateText = (element) => {
  gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out"
  });
  
};

const initTextAnimation = () => {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  animationContainers.forEach((el) => observer.observe(el));
};

const init = () => {
  bookNavigation();
  mobileTimeline();
  dekstopTimeline();
  createProgressDots();
  updateMobileCarousel(currentIndex);
  initTextAnimation();
  stopLotties();
};

init();




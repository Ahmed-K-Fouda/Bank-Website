'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const dollar = document.querySelector('.dollar');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const image = document.querySelectorAll('img[data-src]');

const slides = document.querySelectorAll('.slide');
const next = document.querySelector('.slider__btn--right');
const prev = document.querySelector('.slider__btn--left');
const maxSlide = slides.length;
const dotContainer = document.querySelector('.dots');
let currSlide = 0;

const openMenu = document.getElementById('open');
const closeMenu = document.getElementById('close');
const navLink = document.getElementsByClassName('nav__links');
const navItem = document.querySelectorAll('.nav__item');

const btnCookie = document.querySelector('.btn__cookie');
const cookieDiv = document.querySelector('.cookie');

// Nav bar
openMenu.addEventListener('click', () => {
  nav.style.opacity = '1';
  navItem.forEach(n => (n.style.transform = 'translateY(0px)'));
  for (const x of navLink) {
    x.style.height = '55vh';
  }
  openMenu.style.display = 'none';
  closeMenu.style.display = 'block';
});
closeMenu.addEventListener('click', () => {
  nav.style.opacity = '0';
  navItem.forEach(n => (n.style.transform = 'translateY(-550px)'));
  for (const x of navLink) {
    x.style.height = '0vh';
  }
  openMenu.style.display = 'block';
  closeMenu.style.display = 'none';
});
// scroll top

// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// cookie message
btnCookie.addEventListener('click', () => {
  cookieDiv.style.cssText = 'transform:translate(-50%,450px)';
});

// scroll down
window.addEventListener('scroll', () => {
  if (window.scrollY >= 60) {
    dollar.style.opacity = '1';
  } else {
    dollar.style.opacity = '0';
  }
});
dollar.addEventListener('click', () =>
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
);

// handle learn more click
btnScrollTo.addEventListener('click', () => {
  /* const sec1cord = section1.getBoundingClientRect();
  window.scrollTo({
    left: sec1cord.left + window.pageXOffset,
    top: sec1cord.top + window.pageYOffset,
    behavior: 'smooth',
  });
   OR */
  section1.scrollIntoView({ behavior: 'smooth' });
});

// scroll to all sections

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const refrence = e.target.getAttribute('href');
    document.querySelector(refrence).scrollIntoView({ behavior: 'smooth' });
  }
});

// controll operation container

tabsContainer.addEventListener('click', function (e) {
  const clickedBtn = e.target.closest('.operations__tab');
  if (!clickedBtn) return;

  // add class active for tabs
  tabs.forEach(btn => btn.classList.remove('operations__tab--active'));
  clickedBtn.classList.add('operations__tab--active');

  // remove class active from content
  tabsContent.forEach(con =>
    con.classList.remove('operations__content--active')
  );
  // add class for operations content
  document
    .querySelector(`.operations__content--${clickedBtn.dataset.tab}`)
    .classList.add('operations__content--active');
});

// handel hover on links

const handleHover = function (opacity) {
  return function (e) {
    if (e.target.classList.contains('nav__link')) {
      const link = e.target;
      const logo = e.target.closest('nav').querySelector('img');
      const siblings = link.closest('nav').querySelectorAll('.nav__link');
      siblings.forEach(sib => {
        if (link !== sib) {
          sib.style.opacity = opacity;
          logo.style.opacity = opacity;
        }
      });
    }
  };
};
nav.addEventListener('mouseover', handleHover(0.5));

nav.addEventListener('mouseout', handleHover(1));

// handle position of navigation
const navHeight = document.querySelector('.nav').getBoundingClientRect().height;
const stickyNav = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
    openMenu.classList.add('fixed');
    closeMenu.classList.add('fixed');
  } else {
    nav.classList.remove('sticky');
    openMenu.classList.remove('fixed');
    closeMenu.classList.remove('fixed');
  }
};

const obsHeader = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

obsHeader.observe(header);

// reavel sections
const reavelSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const obsSections = new IntersectionObserver(reavelSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  section.classList.add('section--hidden');
  obsSections.observe(section);
});

// lazy loading image

const lazyImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const observeImg = new IntersectionObserver(lazyImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

image.forEach(img => observeImg.observe(img));

// slider Image
slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);
const nextSlide = function () {
  currSlide = (currSlide + 1) % maxSlide;
  activeOne(currSlide);
  goToSlide(currSlide);
};
const prevSlide = function () {
  currSlide = (currSlide - 1 + maxSlide) % maxSlide;
  goToSlide(currSlide);
  activeOne(currSlide);
};
next.addEventListener('click', nextSlide);

prev.addEventListener('click', prevSlide);

// key left && right

document.addEventListener('keydown', function (e) {
  e.key === 'ArrowRight' && nextSlide();
  e.key === 'ArrowLeft' && prevSlide();
  activeOne(currSlide);
});

// dots
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `
      <button class="dots__dot" data-slide="${i}"></button>
      `
    );
  });
};
createDots();
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activeOne(slide);
  }
});

const activeOne = function (act) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${act}"]`)
    .classList.add('dots__dot--active');
};

activeOne(0);

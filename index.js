var film = 1;

const numberOfFilm = 3;

const animationLength = 450;

const slides = {
  1: document.querySelectorAll('[data-active="1"]'),
  2: document.querySelectorAll('[data-active="2"]'),
  3: document.querySelectorAll('[data-active="3"]'),
};

const increaseFilm = () => {
  if (film < numberOfFilm) {
    enableArrow(document.querySelector('#previousArrow'));
    if (film === numberOfFilm - 1) {
      disableArrow(document.querySelector('#nextArrow'));
    }
    changeFilm(film, film + 1, 'hideAnimationPrevious', 'showNextAnimation');
    advanceProgressBar(film + 1);
    changePoster(film, film + 1);
    film++;
  }
};

const reduceFilm = () => {
  if (film > 1) {
    if (film === 2) {
      disableArrow(document.querySelector('#previousArrow'));
    }
    enableArrow(document.querySelector('#nextArrow'));
    changeFilm(film, film - 1, 'hideAnimationNext', 'showPreviousAnimation');
    reduceProgressBar(film);
    changePoster(film, film - 1);
    film--;
  }
};

document.querySelector('#previousArrow').addEventListener('click', reduceFilm);
document.querySelector('#nextArrow').addEventListener('click', increaseFilm);

const changeFilm = (oldFilm, newFilm, oldClass, newClass) => {
  const listOld = slides[oldFilm];
  const listNew = slides[newFilm];
  for (let i = 0; i < listOld.length; ++i) {
    listOld[i].classList.add(oldClass);
    setTimeout(() => {
      listOld[i].classList.remove(oldClass);
      listOld[i].classList.add('hidden');
    }, animationLength);
  }

  for (let i = 0; i < listNew.length; ++i) {
    listNew[i].classList.add(newClass);
    listNew[i].classList.remove('hidden');

    setTimeout(() => {
      listNew[i].classList.remove(newClass);
    }, animationLength);
  }
};

const disableArrow = (node) => {
  node.classList.remove('enableArrow');
  node.classList.add('disableArrowAnimation');
  node.classList.add('disabledArrow');
  setTimeout(() => {
    node.classList.remove('disableArrowAnimation');
  }, animationLength);
};
const enableArrow = (node) => {
  node.classList.remove('disabledArrow');
  node.classList.add('enableArrowAnimation');
  node.classList.add('enableArrow');
  setTimeout(() => {
    node.classList.remove('enableArrowAnimation');
  }, animationLength);
};

const advanceProgressBar = (step) => {
  const node = document.querySelector(`#film-${step}`);
  node.classList.add('advanceProgressBarAnimation');
  node.classList.add('eltPassed');
  node.classList.remove('eltAfter');
  const parentNode = document.querySelector(`#li-film-${step - 1}`);
  parentNode.classList.add('progressPassed');
  parentNode.classList.remove('progressAfter');
  setTimeout(() => {
    node.classList.remove('advanceProgressBarAnimation');
  }, animationLength);
};

const reduceProgressBar = (step) => {
  const node = document.querySelector(`#film-${step}`);
  node.classList.add('reduceProgressBarAnimation');
  node.classList.add('eltAfter');
  node.classList.remove('eltPassed');
  const parentNode = document.querySelector(`#li-film-${step - 1}`);
  parentNode.classList.add('progressAfter');
  parentNode.classList.remove('progressPassed');

  setTimeout(() => {
    node.classList.remove('reduceProgressBarAnimation');
  }, animationLength);
};

const changePoster = (oldStep, newStep) => {
  const previousFilmNode = document.querySelector(`#id-film-${oldStep}`);
  console.log('previousFilmNode', previousFilmNode);
  previousFilmNode.classList.add('hiddenPoster');
  const newFilmNode = document.querySelector(`#id-film-${newStep}`);
  console.log('newFilmNode', newFilmNode);

  newFilmNode.classList.remove('hiddenPoster');
};

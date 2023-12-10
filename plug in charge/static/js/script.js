$(document).ready(function () {
  const $cont = $('.cont');
  const $slider = $('.slider');
  const $nav = $('.nav');
  const winW = $(window).width();
  const animSpd = 750; // Change also in CSS
  const distOfLetGo = winW * 0.2;
  let curSlide = 1;
  let animation = false;
  let autoScrollVar = true;
  let diff = 0;

  // Generating slides
  let arrCities = ['Amsterdam', 'Rome', 'New—York', 'Singapore', 'Prague']; // Change number of slides in CSS also
  let numOfCities = arrCities.length;
  let arrCitiesDivided = [];

  arrCities.map(city => {
    let length = city.length;
    let letters = Math.floor(length / 4);
    let exp = new RegExp(".{1," + letters + "}", "g");

    arrCitiesDivided.push(city.match(exp));
  });

  let generateSlide = function (city) {
    let frag1 = $(document.createDocumentFragment());
    let frag2 = $(document.createDocumentFragment());
    const numSlide = arrCities.indexOf(arrCities[city]) + 1;
    const firstLetter = arrCitiesDivided[city][0].charAt(0);

    const $slide =
    $(`<div data-target="${numSlide}" class="slide slide--${numSlide}">
							<div class="slide__darkbg slide--${numSlide}__darkbg"></div>
							<div class="slide__text-wrapper slide--${numSlide}__text-wrapper"></div>
						</div>`);

    const letter =
    $(`<div class="slide__letter slide--${numSlide}__letter">
							${firstLetter}
						</div>`);

    for (let i = 0, length = arrCitiesDivided[city].length; i < length; i++) {
      const text =
      $(`<div class="slide__text slide__text--${i + 1}">
								${arrCitiesDivided[city][i]}
							</div>`);
      frag1.append(text);
    }

    const navSlide = $(`<li data-target="${numSlide}" class="nav__slide nav__slide--${numSlide}"></li>`);
    frag2.append(navSlide);
    $nav.append(frag2);

    $slide.find(`.slide--${numSlide}__text-wrapper`).append(letter).append(frag1);
    $slider.append($slide);

    if (arrCities[city].length <= 4) {
      $('.slide--' + numSlide).find('.slide__text').css("font-size", "12vw");
    }
  };

  for (let i = 0, length = numOfCities; i < length; i++) {
    generateSlide(i);
  }

  $('.nav__slide--1').addClass('nav-active');

  // Navigation
  function bullets(dir) {
    $('.nav__slide--' + curSlide).removeClass('nav-active');
    $('.nav__slide--' + dir).addClass('nav-active');
  }

  function timeout() {
    animation = false;
  }

  function pagination(direction) {
    animation = true;
    diff = 0;
    $slider.addClass('animation');
    $slider.css({
      'transform': 'translate3d(-' + (curSlide - direction) * 100 + '%, 0, 0)' });


    $slider.find('.slide__darkbg').css({
      'transform': 'translate3d(' + (curSlide - direction) * 50 + '%, 0, 0)' });


    $slider.find('.slide__letter').css({
      'transform': 'translate3d(0, 0, 0)' });


    $slider.find('.slide__text').css({
      'transform': 'translate3d(0, 0, 0)' });

  }

  function navigateRight() {
    if (!autoScrollVar) return;
    if (curSlide >= numOfCities) return;
    pagination(0);
    setTimeout(timeout, animSpd);
    bullets(curSlide + 1);
    curSlide++;
  }

  function navigateLeft() {
    if (curSlide <= 1) return;
    pagination(2);
    setTimeout(timeout, animSpd);
    bullets(curSlide - 1);
    curSlide--;
  }

  function toDefault() {
    pagination(1);
    setTimeout(timeout, animSpd);
  }

  // Events
  $(document).on('mousedown touchstart', '.slide', function (e) {
    if (animation) return;
    let target = +$(this).attr('data-target');
    let startX = e.pageX || e.originalEvent.touches[0].pageX;
    $slider.removeClass('animation');

    $(document).on('mousemove touchmove', function (e) {
      let x = e.pageX || e.originalEvent.touches[0].pageX;
      diff = startX - x;
      if (target === 1 && diff < 0 || target === numOfCities && diff > 0) return;

      $slider.css({
        'transform': 'translate3d(-' + ((curSlide - 1) * 100 + diff / 30) + '%, 0, 0)' });


      $slider.find('.slide__darkbg').css({
        'transform': 'translate3d(' + ((curSlide - 1) * 50 + diff / 60) + '%, 0, 0)' });


      $slider.find('.slide__letter').css({
        'transform': 'translate3d(' + diff / 60 + 'vw, 0, 0)' });


      $slider.find('.slide__text').css({
        'transform': 'translate3d(' + diff / 15 + 'px, 0, 0)' });

    });
  });

  $(document).on('mouseup touchend', function (e) {
    $(document).off('mousemove touchmove');

    if (animation) return;

    if (diff >= distOfLetGo) {
      navigateRight();
    } else if (diff <= -distOfLetGo) {
      navigateLeft();
    } else {
      toDefault();
    }
  });

  $(document).on('click', '.nav__slide:not(.nav-active)', function () {
    let target = +$(this).attr('data-target');
    bullets(target);
    curSlide = target;
    pagination(1);
  });

  $(document).on('click', '.side-nav', function () {
    let target = $(this).attr('data-target');

    if (target === 'right') navigateRight();
    if (target === 'left') navigateLeft();
  });

  $(document).on('keydown', function (e) {
    if (e.which === 39) navigateRight();
    if (e.which === 37) navigateLeft();
  });

  $(document).on('mousewheel DOMMouseScroll', function (e) {
    if (animation) return;
    let delta = e.originalEvent.wheelDelta;

    if (delta > 0 || e.originalEvent.detail < 0) navigateLeft();
    if (delta < 0 || e.originalEvent.detail > 0) navigateRight();
  });
});
* {
  box-sizing: border-box;
}

body {
  
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
}

.card {
  position: sticky;
  top: 0;
}

.card__inner {
  will-change: transform;
  background: white;
  border-radius: 14px;
  display: flex;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px hsla(265.3, 20%, 10%, 35%);
  transform-origin: center top;
}

.cards {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: repeat(var(--cards-count), var(--card-height));
  gap: 40px 0;
}

.card__image-container {
  display: flex;
  width: 40%;
  flex-shrink: 0;
}

.card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1;
}

.card__content {
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
}

.card__title {
  padding: 0;
  margin: 0;
  font-size: 60px;
  font-weight: 600;
  color: #16263a;
}

.card__description {
  line-height: 1.4;
  font-size: 24px;
  color: #16263a;
}

.space {
  height: 90vh;
}

.space--small {
  height: 40vh;
}

@media (max-width: 600px) {
  .card__inner {
    flex-direction: column;
  }

  .card__image-container {
    width: 100%;
  }

  .card__image {
    aspect-ratio: 16 / 9;
  }

  .card__title {
    font-size: 32px;
  }

  .card__description {
    font-size: 16px;
  }

  .card__content {
    padding: 30px 20px;
  }
}


function initializeUI() {

  const selectmap = document.querySelector('.mapselect');
  const mapContainers = document.getElementsByClassName('map-container');

  selectmap?.addEventListener('change', function () {

    const selectedMap = selectmap.value;

    for (let i = 0; i < mapContainers.length; i++) {
      if (mapContainers[i].id === selectedMap) {
        mapContainers[i].style.display = 'block';
      } else {
        mapContainers[i].style.display = 'none';
      }
    }
  });

  // faq
  const faqItems = document.querySelectorAll('.faq__item-title');
  faqItems.forEach(item => {
    item.addEventListener('click', function () {
      const faqItem = this.closest('.faq__item');
      const content = faqItem.querySelector('.faq__item-content');
      faqItem.classList.toggle('active');
    });
  });

  // Таб
  document.querySelectorAll('.tabs-wrapper').forEach(wrapper => {
    const tabs = wrapper.querySelectorAll('.tabs .tab');
    const items = wrapper.querySelectorAll('.tabs-items .item');
    tabs[0].click();
    wrapper.addEventListener('click', function (event) {
      const tab = event.target.closest('.tab');
      if (tab) {
        const index = Array.from(tabs).indexOf(tab);
        tabs.forEach(t => t.classList.remove('on'));
        items.forEach(i => i.classList.remove('on'));
        tab.classList.add('on');
        items[index].classList.add('on');
      }
    });
  });

  ['footer__menu-title', 'withsubmenu > a'].forEach(selector => {
    document.querySelectorAll(`.${selector}`).forEach(el => {
      el.addEventListener('click', function () {
        this.classList.toggle('open');
      });
    });
  });
}

function initializeLoadMore() {
  const searchList = document.querySelector('.searchlist');
  const loadMoreBtn = document.querySelector('.loadMore');
  const items = document.querySelectorAll('.searchlist__item');
  let currentIndex = 0;

  let isInitialLoad = true;

  function loadItems() {
    const endIndex = Math.min(currentIndex + 3, items.length);
    for (let i = currentIndex; i < endIndex; i++) {
      const item = items[i];
      item.style.display = 'block';

      if (!isInitialLoad) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';

        setTimeout(() => {
          item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 50 * (i - currentIndex));
      } else {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }
    }

    currentIndex = endIndex;
    if (currentIndex >= items.length && loadMoreBtn) {
      loadMoreBtn.classList.add('hide');
    }

    isInitialLoad = false;
  }

  loadItems();
  loadMoreBtn?.addEventListener('click', loadItems);
}

function initializeEventListeners() {
  const menuBtn = document.querySelector('.burger');
  const menuMobile = document.querySelector('.header');
  const searchRegion = document.querySelector('.search-region__btn');
  const regionList = document.querySelector('.search-region__list');
  const headerSearch = document.querySelector('.header__search');
  const openHS = document.querySelector('.header__search-btn');
  const closeHS = document.querySelector('.header__search-close');

  menuBtn?.addEventListener('click', () => menuMobile.classList.toggle('menu--open'));

  searchRegion?.addEventListener('click', () => regionList.classList.toggle('show'));

  regionList?.addEventListener('click', event => {
    if (event.target.tagName === 'LI') {
      const selectedRegion = event.target.textContent;
      const selectedRegionId = event.target.getAttribute('data-id');
      searchRegion.querySelector('span').textContent = selectedRegion;
      searchRegion.setAttribute('data-id', selectedRegionId);
      regionList.classList.remove('show');
    }
  });

  openHS?.addEventListener('click', () => headerSearch.classList.add('show'));
  closeHS?.addEventListener('click', () => headerSearch.classList.remove('show'));
}

function initializePlugins() {
  const fieldTel = document.querySelector('.field-tel');
  const fieldReceipt = document.querySelector('.field-receipt');
  const fieldCard = document.querySelector('.field-card');


  if (fieldTel) {
    Inputmask('+38099-999-99-99', {
      // oncomplete: () => fieldTel.classList.remove('error'),
      // onincomplete: () => fieldTel.classList.add('error')
    }).mask(fieldTel);
  }

  if (fieldCard) {
    Inputmask('9999 9999 9999 9999', {}).mask(fieldCard);
  }


  if (fieldReceipt) {
    Inputmask('999999.99.999.99999', {
      // oncomplete: () => fieldReceipt.classList.remove('error'),
      // onincomplete: () => fieldReceipt.classList.add('error')
    }).mask(fieldReceipt);
  }

  document.querySelectorAll('.selectall').forEach(select => {
    NiceSelect.bind(select, {
      placeholder: false
    });
  });

  document.querySelectorAll('.select-search').forEach(select => {
    NiceSelect.bind(select, {
      placeholder: false,
      searchable: true
    });
  });

  const reviews__masonry = document.querySelector('.reviews__masonry');
  var newWindowWidth = window.innerWidth;
  if (reviews__masonry) {
    if (newWindowWidth > 767) {

      var masonry = new MiniMasonry({
        container: '.reviews__masonry',
        baseWidth: 400,
        gutter: 30,
        surroundingGutter: false
      });

    } else { }
  }


  const fieldDate = document.querySelector('.field-date');

  if (fieldDate) {
    new AirDatepicker('.field-date', {
      locale: {
        days: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'Пятниця', 'Субота'],
        daysShort: ['Нед', 'Пнд', 'Вів', 'Срд', 'Чтв', 'Птн', 'Сбт'],
        daysMin: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        months: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
        monthsShort: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'],
        today: 'Сьогодні',
        clear: 'Очистити',
        dateFormat: 'dd/MM/yyyy',
        timeFormat: 'HH:mm',
        firstDay: 1
      }
    });
  }


}

function initializeSwipers() {
  new Swiper('.swiper-container', {
    slidesPerView: 2,
    spaceBetween: 15,
    grid: {
      rows: 2,
      fill: 'column'
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
      clickable: true,
      dragSize: 50
    },
    breakpoints: {
      767: {
        slidesPerView: 4,
        spaceBetween: 15,
      }
    }
  });

  new Swiper('.partners__list', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    loop: true,
    lazy: true,
    grid: {
      rows: 1,
      fill: 'row'
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      loop: true,
    }
  });
}

function initializeFormValidation() {
  const forms = document.querySelectorAll('.form');
  if (!forms) return;

  forms.forEach(form => {

    const formSelects = form.querySelectorAll('select');
    const nameInput = form.querySelector('input[name="name"]');
    const checkbox = form.querySelector('input[type="checkbox"]');
    const nameMail = form.querySelector('input[name="mail"]');
    const fieldTel = form.querySelector('.field-tel');
    const fieldCard = form.querySelector('.field-card');
    const fieldDate = form.querySelector('.field-date');
    const fieldSummob = form.querySelector('.field-sum-mob');
    const fieldSumcard = form.querySelector('.field-sum-card');
    const fieldReceipt = form.querySelector('.field-receipt');


    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (validateForm()) {
        form.submit();
      }

    });

    function validateForm() {
      let isValid = true;


      formSelects.forEach(select => {
        if (select && select.value !== select.options[1].value) {
          isValid = false;
          select.classList.add('error');
        } else {
          select.classList.remove('error');
        }
      });

      if (fieldTel && fieldTel.classList.contains('required')) {
        const valuefieldtel = fieldTel.value.replace(/[-_]/g, '');
        if (valuefieldtel.length < 13) {
          isValid = false;
          fieldTel.classList.add('error');
        } else {
          fieldTel.classList.remove('error');
        }
      }

      if (fieldReceipt && fieldReceipt.classList.contains('required')) {
        const valuefieldReceipt = fieldReceipt.value.replace(/[-_]/g, '');
        if (valuefieldReceipt.length < 13) {
          isValid = false;
          fieldReceipt.classList.add('error');
        } else {
          fieldReceipt.classList.remove('error');
        }
      }


      if (fieldCard && fieldCard.classList.contains('required')) {
        const valuefieldcard = fieldCard.value.replace(/[-_]/g, '');
        if (valuefieldcard.length < 19) {
          isValid = false;
          fieldCard.classList.add('error');
        } else {
          fieldCard.classList.remove('error');
        }
      }


      if (checkbox) {

        if (!checkbox.checked) {
          isValid = false;
          checkbox.classList.add('error');
        } else {
          checkbox.classList.remove('error');
        }
      }


      if (fieldSumcard) {
        if (fieldSumcard.classList.contains('required')) {

          if (fieldSumcard.value > 1 && fieldSumcard.value < 25001) {
            fieldSumcard.classList.remove('error');
          } else {
            isValid = false;
            fieldSumcard.classList.add('error');
          }
        }
      }


      if (fieldSummob && fieldSummob.classList.contains('required')) {

        if (fieldSummob.value > 1 && fieldSummob.value < 999999) {
          fieldSummob.classList.remove('error');
        } else {
          isValid = false;
          fieldSummob.classList.add('error');
        }
      }

      if (nameMail) {
        const regMail = /[0-9a-zA-Z]+@(?:[-a-z0-9]+\.)+[a-z]{2,6}/;
        if ((!nameMail.value.trim() && nameMail.classList.contains('required')) || !regMail.test(nameMail.value.trim())) {
          isValid = false;
          nameMail.classList.add('error');
        } else {
          nameMail.classList.remove('error');
        }
      }

      if (nameInput) {
        if (nameInput.classList.contains('required') && !nameInput.value.trim()) {
          isValid = false;
          nameInput.classList.add('error');
        } else {
          nameInput.classList.remove('error');
        }
      }

      if (fieldDate && fieldDate.classList.contains('required')) {
        if (!fieldDate.value.trim()) {
          isValid = false;
          fieldDate.classList.add('error');
          fieldDate.classList.remove('valid');
        } else {
          fieldDate.classList.remove('error');
          fieldDate.classList.add('valid');
        }
      }

      return isValid;
    }


  });


}

function initializeScrollAnimations() {
  let scrollPrev = 0;
  const header = document.querySelector(".header");


  window.addEventListener('scroll', () => {
    const winScrollTop = window.scrollY;
    const btnScrollToTop = document.querySelector('.btn-up');

    document.querySelectorAll('.animate').forEach(block => {
      const blockPosition = block.getBoundingClientRect().top;
      if (blockPosition < window.innerHeight / 1) {
        block.classList.add('show');
      } else {
        block.classList.remove('show');
      }
    });


   
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (btnScrollToTop) {
      btnScrollToTop.style.display = scrollTop > 300 ? "block" : "none";
    }

    btnScrollToTop.addEventListener('click', function() {
      window.scrollTo({
      top: 0,
      behavior: 'smooth'
      });
    });


    if (winScrollTop > 50 && winScrollTop > scrollPrev) {
      header.classList.add("out", "header-white");
    } else {
      header.classList.remove("out");
    }
    scrollPrev = winScrollTop;

    if (winScrollTop === 0 && header.classList.contains("header-home")) {
      header.classList.remove('header-white');
    }
  });


}

function limitDigits(input, maxDigits) {
  if (input.value.length > maxDigits) {
    input.value = input.value.slice(0, maxDigits);
  }
}

function initializeNumbers() {
  function animateNumbers() {
    document.querySelectorAll(".count").forEach(counter => {
      const target = parseInt(counter.getAttribute("data-target"));
      const duration = 2000; 
      const stepTime = 50; 
      const steps = duration / stepTime;
      const increment = target / steps;
      let count = 0;

      const updateCount = () => {
        if (count < target) {
          count = Math.min(count + increment, target);
          counter.innerText = Math.round(count);
          setTimeout(updateCount, stepTime);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
  }

  let animationExecuted = false;

  const numberBlock = document.getElementById("count");
  if (numberBlock) {
    const numberBlockPos = numberBlock.offsetTop;
    window.addEventListener('scroll', function () {
      const scrollToElem = window.scrollY + window.innerHeight;
      if (scrollToElem - 50 > numberBlockPos && !animationExecuted) {
        animateNumbers();
        animationExecuted = true;
      }
    });
  }
}


document.addEventListener("DOMContentLoaded", () => {
  initializeUI();
  initializeLoadMore();
  initializeEventListeners();
  initializePlugins();
  initializeSwipers();
  initializeFormValidation();
  initializeScrollAnimations();
  initializeNumbers();


  const anchors = document.querySelectorAll('a[href*="#"]')
  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const blockID = anchor.getAttribute('href').substr(1)
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  }

})
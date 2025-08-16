'use strict';

// Ensure DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function () {
  // Element toggle function
  const elementToggleFunc = function (elem) {
    if (elem) {
      elem.classList.toggle('active');
    }
  };

  // Sidebar variables and toggle functionality for mobile
  const sidebar = document.querySelector('[data-sidebar]');
  const sidebarBtn = document.querySelector('[data-sidebar-btn]');
  if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener('click', function () {
      elementToggleFunc(sidebar);
    });
  }

  // Testimonials variables and modal functionality
  const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
  const modalContainer = document.querySelector('[data-modal-container]');
  const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
  const overlay = document.querySelector('[data-overlay]');
  const modalImg = document.querySelector('[data-modal-img]');
  const modalTitle = document.querySelector('[data-modal-title]');
  const modalText = document.querySelector('[data-modal-text]');

  const testimonialsModalFunc = function () {
    if (modalContainer && overlay) {
      modalContainer.classList.toggle('active');
      overlay.classList.toggle('active');
    }
  };

  for (let i = 0; i < testimonialsItem.length; i++) {
    if (testimonialsItem[i]) {
      testimonialsItem[i].addEventListener('click', function () {
        if (modalImg && modalTitle && modalText) {
          const avatar = this.querySelector('[data-testimonials-avatar]');
          const title = this.querySelector('[data-testimonials-title]');
          const text = this.querySelector('[data-testimonials-text]');
          if (avatar && title && text) {
            modalImg.src = avatar.src;
            modalImg.alt = avatar.alt;
            modalTitle.innerHTML = title.innerHTML;
            modalText.innerHTML = text.innerHTML;
            testimonialsModalFunc();
          }
        }
      });
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', testimonialsModalFunc);
  }
  if (overlay) {
    overlay.addEventListener('click', testimonialsModalFunc);
  }

  // Portfolio filter variables and functionality
  const select = document.querySelector('[data-select]');
  const selectItems = document.querySelectorAll('[data-select-item]');
  const selectValue = document.querySelector('[data-select-value]');
  const filterBtn = document.querySelectorAll('[data-filter-btn]');
  const filterItems = document.querySelectorAll('[data-filter-item]');

  const filterFunc = function (selectedValue) {
    if (!filterItems) return;
    for (let i = 0; i < filterItems.length; i++) {
      const itemCategory = filterItems[i].dataset.category ? filterItems[i].dataset.category.toLowerCase() : '';
      if (selectedValue.toLowerCase() === 'all' || selectedValue.toLowerCase() === itemCategory) {
        filterItems[i].classList.add('active');
      } else {
        filterItems[i].classList.remove('active');
      }
    }
  };

  if (select) {
    select.addEventListener('click', function () {
      elementToggleFunc(this);
    });
  }

  for (let i = 0; i < selectItems.length; i++) {
    if (selectItems[i]) {
      selectItems[i].addEventListener('click', function () {
        const selectedValue = this.innerText;
        if (selectValue) {
          selectValue.innerText = selectedValue;
        }
        filterFunc(selectedValue);
        if (select) {
          elementToggleFunc(select);
        }
        for (let j = 0; j < filterBtn.length; j++) {
          if (filterBtn[j]) {
            filterBtn[j].classList.toggle('active', filterBtn[j].innerText === selectedValue);
          }
        }
      });
    }
  }

  let lastClickedBtn = filterBtn[0];
  for (let i = 0; i < filterBtn.length; i++) {
    if (filterBtn[i]) {
      filterBtn[i].addEventListener('click', function () {
        const selectedValue = this.innerText;
        if (selectValue) {
          selectValue.innerText = selectedValue;
        }
        filterFunc(selectedValue);
        if (lastClickedBtn) {
          lastClickedBtn.classList.remove('active');
        }
        this.classList.add('active');
        lastClickedBtn = this;
      });
    }
  }

  // Initialize filter to show all projects
  filterFunc('All');

  // Contact form variables and validation
  const form = document.querySelector('[data-form]');
  const formInputs = document.querySelectorAll('[data-form-input]');
  const formBtn = document.querySelector('[data-form-btn]');

  for (let i = 0; i < formInputs.length; i++) {
    if (formInputs[i]) {
      formInputs[i].addEventListener('input', function () {
        if (form && formBtn) {
          if (form.checkValidity()) {
            formBtn.removeAttribute('disabled');
          } else {
            formBtn.setAttribute('disabled', '');
          }
        }
      });
    }
  }

  // Page navigation variables and functionality
  const navigationLinks = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('[data-page]');

  for (let i = 0; i < navigationLinks.length; i++) {
    if (navigationLinks[i]) {
      navigationLinks[i].addEventListener('click', function () {
        const pageName = this.innerHTML.toLowerCase();
        for (let j = 0; j < pages.length; j++) {
          if (pages[j] && pageName === pages[j].dataset.page.toLowerCase()) {
            pages[j].classList.add('active');
            navigationLinks[i].classList.add('active');
            window.scrollTo(0, 0);
          } else if (pages[j]) {
            pages[j].classList.remove('active');
            navigationLinks[j]?.classList.remove('active');
          }
        }
      });
    }
  }

  // Initialize navigation to show the first page (e.g., about)
  if (navigationLinks[0] && pages[0]) {
    navigationLinks[0].classList.add('active');
    pages[0].classList.add('active');
  }
});
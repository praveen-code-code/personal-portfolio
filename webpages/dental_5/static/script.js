document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade animations
    const fadeObserverOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                try {
                    entry.target.style.animationPlayState = 'running';
                    fadeObserver.unobserve(entry.target);
                } catch (error) {
                    console.error('Error in fade animation:', error);
                }
            }
        });
    }, fadeObserverOptions);

    // Apply fade observer to elements
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    fadeElements.forEach(element => {
        try {
            element.style.animationPlayState = 'paused';
            fadeObserver.observe(element);
        } catch (error) {
            console.error('Error setting up fade element:', error);
        }
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            try {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
                const isExpanded = hamburger.classList.contains('active');
                hamburger.setAttribute('aria-expanded', isExpanded);
            } catch (error) {
                console.error('Error in hamburger menu:', error);
            }
        });

        document.addEventListener('click', (event) => {
            if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Stats number animation
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = `${currentValue} +`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                try {
                    const statsNumber = entry.target.querySelector('.stats-number') || 
                                      document.querySelector('.stats-number');
                    if (statsNumber && !statsNumber.dataset.animated) {
                        const targetValue = parseInt(statsNumber.dataset.target || '875');
                        animateValue(statsNumber, 0, targetValue, 2000);
                        statsNumber.dataset.animated = 'true'; // Prevent re-animation
                    } else if (!statsNumber) {
                        console.warn('Stats number element not found');
                    }
                    statsObserver.unobserve(entry.target);
                } catch (error) {
                    console.error('Error in stats animation:', error);
                }
            }
        });
    }, { threshold: 0.5, rootMargin: '0px' });

    // Apply stats observer to the correct container
    const statsContainer = document.querySelector('.image-container') || 
                         document.querySelector('.stats-container') || 
                         document.querySelector('[data-stats]');
    if (statsContainer) {
        statsObserver.observe(statsContainer);
    } else {
        console.warn('Stats container not found');
        const statsNumber = document.querySelector('.stats-number');
        if (statsNumber && !statsNumber.dataset.animated) {
            animateValue(statsNumber, 0, parseInt(statsNumber.dataset.target || '875'), 2000);
            statsNumber.dataset.animated = 'true';
        }
    }
});

//testimonials

const testimonials = [
        {
          id: 1,
          name: "Dianne Russell",
          role: "Patient",
          content: "I want to say thank you to my doctor Steve! Vivamus sagittis massa vitae bibendum rhoncus. Duis cursus. Thank you for helping me overcome my fear of the dentist! Vivamus sagittis massa vitae bibendum rhoncus. Duis cursus.",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
          id: 2,
          name: "Jane Cooper",
          role: "Patient",
          content: "I want to say thank you to my doctor Steve! Vivamus sagittis massa vitae bibendum rhoncus. Duis cursus. Thank you for helping me overcome my fear of the dentist! Vivamus sagittis massa vitae bibendum rhoncus. Duis cursus.",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
          id: 3,
          name: "Artemisia Udinese",
          role: "Patient",
          content: "I want to say thank you to my doctor Steve! Vivamus sagittis massa vitae bibendum rhoncus. Duis cursus. Thank you for helping me overcome my fear of the dentist! Vivamus sagittis massa vitae bibendum rhoncus. Duis cursus.",
          image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
          id: 3,
          name: "Artemisia Udinese",
          role: "Patient",
          content: "I want to say thank you to my doctor Steve! Vivamus sagittis massa vitae bibendum rhoncus. Duis cursus. Thank you for helping me overcome my fear of the dentist! Vivamus sagittis massa vitae bibendum rhoncus. Duis cursus.",
          image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
          id: 3,
          name: "Artemisia Udinese",
          role: "Patient",
          content: "I want to say thank you to my doctor Steve! Vivamus sagittis massa vitae bibendum rhoncus. Duis cursus. Thank you for helping me overcome my fear of the dentist! Vivamus sagittis massa vitae bibendum rhoncus. Duis cursus.",
          image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
          id: 3,
          name: "Artemisia Udinese",
          role: "Patient",
          content: "I want to say thank you to my doctor Steve! Vivamus sagittis massa vitae bibendum rhoncus. Duis cursus. Thank you for helping me overcome my fear of the dentist! Vivamus sagittis massa vitae bibendum rhoncus. Duis cursus.",
          image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }
        
      ];

      const track = document.getElementById('testimonialsTrack');
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      let currentIndex = 0;
      let autoScrollInterval;

      function createTestimonialCard(testimonial) {
        return `
          <div class="testimonial-card">
            <div class="quote-icon">"</div>
            <p class="testimonial-content">${testimonial.content}</p>
            <div class="testimonial-author">
              <img src="${testimonial.image}" alt="${testimonial.name}" class="author-image">
              <div class="author-info">
                <h4>${testimonial.name}</h4>
                <p>${testimonial.role}</p>
              </div>
            </div>
          </div>
        `;
      }

      function renderTestimonials() {
        track.innerHTML = testimonials.map(createTestimonialCard).join('');
        updateSlidePosition();
      }

      function updateSlidePosition() {
        const slideWidth = document.querySelector('.testimonial-card').offsetWidth;
        const gap = 32; // 2rem gap
        track.style.transform = `translateX(-${currentIndex * (slideWidth + gap)}px)`;
        updateButtons();
      }

      function updateButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= testimonials.length - getVisibleSlides();
      }

      function getVisibleSlides() {
        const width = window.innerWidth;
        if (width >= 1024) return 3;
        if (width >= 768) return 2;
        return 1;
      }

      function nextSlide() {
        if (currentIndex < testimonials.length - getVisibleSlides()) {
          currentIndex++;
          updateSlidePosition();
        }
      }

      function prevSlide() {
        if (currentIndex > 0) {
          currentIndex--;
          updateSlidePosition();
        }
      }

      function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
          if (currentIndex >= testimonials.length - getVisibleSlides()) {
            currentIndex = 0;
          } else {
            currentIndex++;
          }
          updateSlidePosition();
        }, 5000);
      }

      function stopAutoScroll() {
        clearInterval(autoScrollInterval);
      }

      // Event Listeners
      prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoScroll();
      });

      nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoScroll();
      });

      // Initialize
      renderTestimonials();
      startAutoScroll();

      // Responsive handling
      window.addEventListener('resize', () => {
        currentIndex = 0;
        updateSlidePosition();
      });

      // Pause auto-scroll on hover
      track.addEventListener('mouseenter', stopAutoScroll);
      track.addEventListener('mouseleave', startAutoScroll);

      //facility
        // Add hover effect to play button
        const playButton = document.querySelector('.play-button');
        
        playButton.addEventListener('click', () => {
            // Here you can add video play functionality
            console.log('Play video');
        });

        // Add smooth scroll for better UX
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
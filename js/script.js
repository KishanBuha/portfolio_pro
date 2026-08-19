document.addEventListener('DOMContentLoaded', () => {
    
  // 1. Scroll Reveal Animation using Intersection Observer
  const reveals = document.querySelectorAll('.reveal');
  
  const revealOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Stop observing once revealed
      });
  }, revealOptions);

  reveals.forEach(reveal => {
      revealOnScroll.observe(reveal);
  });

  // 2. Enhanced Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
          event.preventDefault();
          
          const name = document.getElementById('name').value;
          const btn = contactForm.querySelector('button[type="submit"]');
          
          // Loading state for button
          const originalText = btn.innerHTML;
          btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Sending...';
          btn.disabled = true;

          // Simulate network request
          setTimeout(() => {
              showToast(`Success! Thanks for reaching out, ${name}. I'll reply soon.`);
              contactForm.reset();
              btn.innerHTML = originalText;
              btn.disabled = false;
          }, 1500);
      });
  }

  // 3. Custom Toast Notification Builder
  function showToast(message) {
      const toastContainer = document.createElement('div');
      toastContainer.style.position = 'fixed';
      toastContainer.style.bottom = '30px';
      toastContainer.style.right = '30px';
      toastContainer.style.backgroundColor = 'var(--accent-color)';
      toastContainer.style.color = '#fff';
      toastContainer.style.padding = '15px 25px';
      toastContainer.style.borderRadius = '8px';
      toastContainer.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
      toastContainer.style.zIndex = '9999';
      toastContainer.style.transform = 'translateY(100px)';
      toastContainer.style.opacity = '0';
      toastContainer.style.transition = 'all 0.4s ease';
      
      toastContainer.innerText = message;
      document.body.appendChild(toastContainer);

      // Animate In
      setTimeout(() => {
          toastContainer.style.transform = 'translateY(0)';
          toastContainer.style.opacity = '1';
      }, 100);

      // Animate Out & Remove
      setTimeout(() => {
          toastContainer.style.transform = 'translateY(100px)';
          toastContainer.style.opacity = '0';
          setTimeout(() => document.body.removeChild(toastContainer), 400);
      }, 4000);
  }
});
// Ensure all scripts run after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Loading Animation
  window.addEventListener('load', () => {
    document.getElementById('loading').style.display = 'none';
  });

  // Typing Animation
  const typedText = document.querySelector('.typed-text');
  const roles = [
    'A Computer Science Student',
    'Passionate & Enthusiastic Software Developer',
    'Web Developer'
  ];
  let roleIndex = 0,
      charIndex = 0,
      isDeleting = false;
  function type() {
    if (roleIndex === roles.length) roleIndex = 0;
    let currentRole = roles[roleIndex];
    if (!isDeleting) {
      typedText.textContent = currentRole.slice(0, ++charIndex);
      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(type, 1200);
        return;
      }
    } else {
      typedText.textContent = currentRole.slice(0, --charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex++;
      }
    }
    setTimeout(type, isDeleting ? 50 : 110);
  }
  type();

  // tsParticles (Linked Circles)
  tsParticles.load("particles-js", {
    particles: {
      number: { value: 48 },
      color: { value: "#90caf9" },
      shape: { type: "circle" },
      line_linked: {
        enable: true,
        distance: 120,
        color: "#1976d2",
        opacity: 0.7,
        width: 1,
      },
      size: { value: 3 },
      opacity: { value: 0.75 },
      move: { speed: 1.1 },
    },
  });

  // Dark Mode Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const darkPreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (
    localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && darkPreferred)
  )
    body.classList.add('dark');
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
  });

  // Hamburger Menu (Mobile)
  const menuToggle = document.getElementById('menu-toggle');
  const navbar = document.querySelector('.navbar');
  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('open');
  });

  // Scroll-to-Top Button
  const scrollTopBtn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 120) body.classList.add('scrolled');
    else body.classList.remove('scrolled');
  });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Contact Form
  document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const status = this.querySelector('.form-status');
    status.textContent = "Sending...";
    setTimeout(() => status.textContent = "Message sent! (Demo)", 1000);
  });

  // Custom Cursor
  const cursor = document.querySelector('.cursor');
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
  });
  document.querySelectorAll('button,a,.btn').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });

  // GitHub Repos (API) - Correct & Secure Integration
  fetch('https://api.github.com/users/divya-07-04/repos?sort=updated')
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(data => {
      const list = document.getElementById('repo-list');
      if (!list) return;
      data.slice(0, 4).forEach(repo => {
        let li = document.createElement('li');
        li.innerHTML = `<a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a>`;
        list.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error fetching repos:', error);
      const list = document.getElementById('repo-list');
      if (list) list.innerHTML = '<li>Unable to load repositories</li>';
    });
});

const yearSpan = document.getElementById('year');
const dateTimeOutput = document.getElementById('dateTime');
const showDetailsBtn = document.getElementById('showDetailsBtn');
const detailsOutput = document.getElementById('detailsOutput');
const profileImage = document.getElementById('profileImage');
const heading = document.querySelector('h1');
const contactBtn = document.getElementById('contactBtn');
const hero = document.querySelector('.hero');
const projectCards = document.querySelectorAll('.card');
const projectMessage = document.getElementById('projectMessage');
const projectPopup = document.getElementById('projectPopup');
const closePopupBtn = document.getElementById('closePopupBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const copyEmailBtn = document.getElementById('copyEmailBtn');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const typingText = document.getElementById('typingText');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');

yearSpan.textContent = new Date().getFullYear();

function updateDateTime() {
  const now = new Date();
  dateTimeOutput.textContent = `Current Date and Time: ${now.toLocaleString()}`;
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  if (themeToggleBtn) {
    themeToggleBtn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  }
  localStorage.setItem('portfolio-theme', theme);
}

function toggleTheme() {
  const currentTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
}

function highlightActiveLink() {
  const scrollPosition = window.scrollY + 120;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}

function updateScrollButton() {
  if (!scrollTopBtn) return;
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}

function typeLoop() {
  if (!typingText) return;

  const words = ['Web Developer', 'UI Designer', 'Frontend Creator'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const tick = () => {
    const currentWord = words[wordIndex];
    typingText.textContent = isDeleting
      ? currentWord.substring(0, charIndex--)
      : currentWord.substring(0, charIndex++);

    if (!isDeleting && charIndex > currentWord.length) {
      isDeleting = true;
      setTimeout(tick, 1200);
      return;
    }

    if (isDeleting && charIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(tick, isDeleting ? 70 : 100);
  };

  tick();
}

updateDateTime();
setInterval(updateDateTime, 1000);
applyTheme(localStorage.getItem('portfolio-theme') || 'light');
highlightActiveLink();
updateScrollButton();
typeLoop();

showDetailsBtn.addEventListener('click', () => {
  detailsOutput.textContent = 'Native: Chennai, Pincode: 600100, Nationality: Indian';
});

profileImage.addEventListener('mouseover', () => {
  heading.textContent = 'Welcome to My Portfolio!';
});

profileImage.addEventListener('mouseout', () => {
  heading.textContent = "Hi, I'm Sukesh";
});

contactBtn.addEventListener('click', () => {
  hero.style.background = 'linear-gradient(135deg, #111827, #7c3aed, #ec4899)';
});

projectCards.forEach((card) => {
  card.addEventListener('click', () => {
    projectCards.forEach((item) => item.classList.remove('clicked'));
    card.classList.add('clicked');

    const cardType = card.getAttribute('data-card');
    if (cardType === '1') {
      projectMessage.textContent = 'Project 1: Personal Website — Built with HTML, CSS, and JS.';
      projectMessage.style.color = '#2563eb';
    } else if (cardType === '2') {
      projectMessage.textContent = 'Project 2: Business Landing Page — Designed for strong brand impact.';
      projectMessage.style.color = '#b45309';
    } else if (cardType === '3') {
      projectMessage.textContent = 'Project 3: Web App UI — Focused on clean and interactive design.';
      projectMessage.style.color = '#7c3aed';
    }

    projectPopup.classList.add('active');
  });
});

closePopupBtn.addEventListener('click', () => {
  projectPopup.classList.remove('active');
});

projectPopup.addEventListener('click', (event) => {
  if (event.target === projectPopup) {
    projectPopup.classList.remove('active');
  }
});

themeToggleBtn?.addEventListener('click', toggleTheme);
copyEmailBtn?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('besukesh007@gmail.com');
    detailsOutput.textContent = 'Email copied to clipboard!';
  } catch (error) {
    detailsOutput.textContent = 'Clipboard access is not available.';
  }
});

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  highlightActiveLink();
  updateScrollButton();
});
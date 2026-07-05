const togglePanelsBtn = document.getElementById('togglePanelsBtn');
const tabButtons = document.querySelectorAll('.tab-button');
const sections = document.querySelectorAll('.detail-section');
const skillSearch = document.getElementById('skillSearch');
const skillsGrid = document.getElementById('skillsGrid');
const liveClock = document.getElementById('liveClock');

const skills = [
  'React JS',
  'MySQL Database',
  'Advanced Python',
  'File Handling',
  'OOPs',
  'Machine Learning',
  'Tkinter Applications',
  'Responsive Web Design'
];

function renderSkills(filter = '') {
  const query = filter.toLowerCase();
  const filtered = skills.filter((skill) => skill.toLowerCase().includes(query));

  skillsGrid.innerHTML = '';
  filtered.forEach((skill) => {
    const card = document.createElement('div');
    card.className = 'skill-chip';
    card.textContent = skill;
    skillsGrid.appendChild(card);
  });
}

function updateClock() {
  const now = new Date();
  liveClock.textContent = now.toLocaleTimeString();
}

function switchSection(targetId) {
  sections.forEach((section) => {
    section.classList.toggle('active-section', section.id === targetId);
  });

  tabButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.target === targetId);
  });
}

tabButtons.forEach((button) => {
  button.addEventListener('click', () => switchSection(button.dataset.target));
});

togglePanelsBtn?.addEventListener('click', () => {
  const firstSection = document.querySelector('.detail-section');
  if (firstSection) {
    switchSection(firstSection.id);
  }
});

skillSearch?.addEventListener('input', (event) => {
  renderSkills(event.target.value);
});

updateClock();
setInterval(updateClock, 1000);
renderSkills();

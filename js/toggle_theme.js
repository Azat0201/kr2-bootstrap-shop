const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme, false);

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-bs-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme, true);
  localStorage.setItem('theme', newTheme);
});

themeIcon.addEventListener('animationend', () => {
  themeIcon.classList.remove('spin');
});

function applyTheme(theme, animate) {
  htmlElement.setAttribute('data-bs-theme', theme);
  themeIcon.textContent = theme !== 'dark' ? '☀️' : '🌙';

  if (animate) {
    themeIcon.classList.remove('spin');
    void themeIcon.offsetWidth;
    themeIcon.classList.add('spin');
  }
}
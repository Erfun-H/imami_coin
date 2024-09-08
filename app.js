let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;

// به‌روزرسانی نمایش امتیاز با فرمت کاما
function updateScoreDisplay() {
    document.getElementById('score').innerText = score.toLocaleString();
}

// به‌روزرسانی نمایش امتیاز در ابتدا
updateScoreDisplay();

// افزایش امتیاز و تغییر اندازه دکمه در هر کلیک
document.getElementById('coin_click_id').addEventListener('click', function() {
    score++;
    updateScoreDisplay();
    localStorage.setItem('score', score);
});

const image = document.getElementById('image');

image.addEventListener('click', (e) => {
const width = image.offsetWidth;
const height = image.offsetHeight;
const xVal = e.layerX;
const yVal = e.layerY;

const rotateX = ((height / 2 - yVal) / height) * 30; // Calculate rotation for Y axis
const rotateY = ((xVal - width / 2) / width) * 30;  // Calculate rotation for X axis

image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

// Reset back to original position after 1 second
setTimeout(() => {
    image.style.transform = `rotateX(0deg) rotateY(0deg)`;
}, 400); // Change this value for longer/shorter duration
});

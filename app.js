let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
let initialWidth = 256;  // عرض اولیه دکمه
let initialHeight = 256;  // ارتفاع اولیه دکمه
let currentWidth = initialWidth;  // عرض کنونی دکمه
let currentHeight = initialHeight;  // ارتفاع کنونی دکمه
const maxWidth = initialWidth * 1.33;  // دو برابر عرض اولیه
const maxHeight = initialHeight * 1.33;  // دو برابر ارتفاع اولیه
const minWidth = initialWidth;  // حداقل عرض
const minHeight = initialHeight;  // حداقل ارتفاع
const growthRate = 0.05;  // نرخ رشد به ازای هر کلیک
const shrinkRate = 0.01;  // نرخ کوچک شدن
let shrinkTimer;  // تایمر برای شروع کوچک شدن
let shrinkInterval;  // فاصله زمانی برای کوچک کردن دکمه

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

    // اگر دکمه هنوز به حداکثر اندازه نرسیده باشد، بزرگ‌تر شود
    if (currentWidth < maxWidth && currentHeight < maxHeight) {
        currentWidth += initialWidth * growthRate;  // عرض به اندازه 0.05 برابر رشد می‌کند
        currentHeight += initialHeight * growthRate;  // ارتفاع به اندازه 0.05 برابر رشد می‌کند
        document.getElementById('coin_click_id').style.maxWidth = `${currentWidth}px`;  // به‌روزرسانی عرض دکمه
        document.getElementById('coin_click_id').style.maxHeight = `${currentHeight}px`;  // به‌روزرسانی ارتفاع دکمه
    }

    // تایمر کوچک شدن را متوقف کن و دوباره شروع کن
    clearTimeout(shrinkTimer);
    clearInterval(shrinkInterval);  // جلوگیری از کوچک شدن فوری
    shrinkTimer = setTimeout(startShrinking, 1500);  // 1.5 ثانیه صبر کن
});

// شروع فرآیند کوچک شدن بعد از 1.5 ثانیه
function startShrinking() {
    shrinkInterval = setInterval(shrinkButton, 100);  // هر 100 میلی‌ثانیه کوچک شود
}

// تابع کوچک شدن دکمه
function shrinkButton() {
    if (currentWidth > minWidth && currentHeight > minHeight) {
        currentWidth -= initialWidth * shrinkRate;  // عرض به اندازه 0.01 برابر کوچک می‌شود
        currentHeight -= initialHeight * shrinkRate;  // ارتفاع به اندازه 0.01 برابر کوچک می‌شود
        document.getElementById('coin_click_id').style.maxWidth = `${currentWidth}px`;  // به‌روزرسانی عرض دکمه
        document.getElementById('coin_click_id').style.maxHeight = `${currentHeight}px`;  // به‌روزرسانی ارتفاع دکمه
    } else {
        clearInterval(shrinkInterval);  // وقتی به اندازه اولیه بازگشت، کوچک شدن متوقف شود
    }
}
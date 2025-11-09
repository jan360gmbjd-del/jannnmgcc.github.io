document.addEventListener('DOMContentLoaded', () => {

    const startButton = document.getElementById('startButton');
    const mainImage = document.getElementById('mainImage');
    const mainContainer = document.getElementById('main-container');

    // Массив для хранения всех прыгающих окон
    const bouncers = [];
    
    // URL для гифок в окнах (можно найти на giphy.com)
    const gifUrls = [
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmo3cWFvYmdtNGh2cnR2eG5wcTd5bjY4dmJxd3J5eTVjYWV6cm12NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5oWpOD8Thsmo8/giphy.gif',
        'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bGhqZTRybGZtZm0wY3Jub285MjNuNGp1bTRsMjh5cTRramFudXU5byZlcD12MV9naWZzX3NlYXJjaCZjdD1n/F6ub4AQXz13xK/giphy.gif',
        'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bGhqZTRybGZtZm0wY3Jub285MjNuNGp1bTRsMjh5cTRramFudXU5byZlcD12MV9naWZzX3NlYXJjaCZjdD1n/oVmJpctjWDmi4/giphy.gif',
    ];

    // --- Функция для входа в полноэкранный режим ---
    function enterFullscreen() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }

    // --- Функция для создания нового прыгающего окна ---
    function createBouncingWindow() {
        const bouncer = document.createElement('div');
        bouncer.classList.add('bouncing-window');

        // Добавляем случайную гифку в окно
        const gif = document.createElement('img');
        gif.src = gifUrls[Math.floor(Math.random() * gifUrls.length)];
        bouncer.appendChild(gif);

        // Случайная начальная позиция
        const startX = Math.random() * (window.innerWidth - 150);
        const startY = Math.random() * (window.innerHeight - 150);

        // Случайная скорость и направление
        const velocityX = (Math.random() - 0.5) * 8;
        const velocityY = (Math.random() - 0.5) * 8;

        // Сохраняем данные об окне в объект
        const bouncerData = {
            element: bouncer,
            x: startX,
            y: startY,
            vx: velocityX,
            vy: velocityY
        };

        // Добавляем окно на страницу и в массив
        document.body.appendChild(bouncer);
        bouncers.push(bouncerData);

        // При клике на окно - создаем новое
        bouncer.addEventListener('click', createBouncingWindow);
    }
    
    // --- Функция анимации ---
    function animate() {
        bouncers.forEach(b => {
            // Двигаем окно
            b.x += b.vx;
            b.y += b.vy;

            // Отталкивание от краев экрана
            if (b.x + b.element.offsetWidth > window.innerWidth || b.x < 0) {
                b.vx = -b.vx;
            }
            if (b.y + b.element.offsetHeight > window.innerHeight || b.y < 0) {
                b.vy = -b.vy;
            }

            // Применяем новую позицию
            b.element.style.left = b.x + 'px';
            b.element.style.top = b.y + 'px';
        });

        requestAnimationFrame(animate); // Продолжаем анимацию
    }

    // --- Обработчики событий ---

    // Клик по кнопке "Принять и продолжить"
    startButton.addEventListener('click', () => {
        enterFullscreen(); // Входим в полноэкранный режим
        startButton.style.display = 'none'; // Скрываем кнопку
        mainImage.style.display = 'block'; // Показываем картинку
        
        // Создаем первое прыгающее окно
        createBouncingWindow();

        // Запускаем анимацию
        animate();
    });

    // Клик по картинке
    mainImage.addEventListener('click', () => {
        createBouncingWindow(); // Создаем еще одно окно
    });

});
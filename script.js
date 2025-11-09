// Ждем, пока окно полностью загрузится
window.onload = function() {
    let moveInterval;

    function startJumping() {
        // Устанавливаем интервал движения (каждые 600 миллисекунд)
        moveInterval = setInterval(() => {
            // Генерируем случайные координаты
            // screen.width/height - размеры всего экрана
            // -200, -200 - чтобы окно не улетало за край экрана полностью
            const randomX = Math.floor(Math.random() * (screen.width - 200));
            const randomY = Math.floor(Math.random() * (screen.height - 200));

            // Двигаем окно
            window.moveTo(randomX, randomY);
        }, 600);
    }

    // Попытка сделать окно поверх всех (работает не везде)
    window.focus();

    // Начинаем прыгать
    startJumping();

    // Если пользователь попытается закрыть окно, мы будем пытаться ему помешать (злобно!)
    window.addEventListener('beforeunload', () => {
        // Открываем еще одно такое же окно на прощание!
        window.open(window.location.href, '_blank', 'width=400,height=400');
    });
};

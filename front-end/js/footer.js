document.addEventListener("DOMContentLoaded", () => {

    // Автоматически ставим текущий год
    const year = document.getElementById("currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Плавная обработка Telegram-кнопок
    const telegramButtons = document.querySelectorAll(
        'a[href*="t.me"]'
    );

    telegramButtons.forEach(button => {

        button.addEventListener("click", () => {
            button.classList.add("telegram-clicked");

            setTimeout(() => {
                button.classList.remove("telegram-clicked");
            }, 300);
        });

    });

});
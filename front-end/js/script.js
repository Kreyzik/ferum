/* =========================================================
DATA
========================================================= */

let clients = [];


/* =========================================================
LOAD CLIENTS FROM DATABASE
========================================================= */

async function loadClients() {

    try {

        const response = await fetch(
            "http://localhost:3000/api/clients"
        );

        if (!response.ok) {
            throw new Error("Ошибка загрузки клиентов");
        }

        const data = await response.json();

        clients = data.map(client => {

            const nameParts =
                (client.name || "")
                    .trim()
                    .split(/\s+/);

            const firstName =
                nameParts[0] || "";

            const lastName =
                nameParts.slice(1).join(" ") || "";


            let status =
                client.status || "inactive";

            let statusText =
                "Неактивен";


            if (status === "active") {
                statusText = "Активен";
            }

            if (status === "expired") {
                statusText = "Истёк";
            }

            if (status === "trial") {
                statusText = "Пробный";
            }


            return {

                id: client.id,

                firstName: firstName,

                lastName: lastName,

                phone: client.phone || "",

                email: client.email || "",

                subscription: "Без абонемента",

                date:
                    client.created_at
                        ? new Date(
                            client.created_at
                        ).toLocaleDateString("ru-RU")
                        : "",

                status: status,

                statusText: statusText
            };

        });


        console.log(
            "Клиенты загружены из PostgreSQL:",
            clients
        );


    } catch (error) {

        console.error(
            "Ошибка загрузки клиентов:",
            error
        );


        alert(
            "Не удалось загрузить клиентов из базы данных.\n" +
            "Проверьте, запущен ли backend."
        );

    }

}


/* =========================================================
PAGE CONFIG
========================================================= */

const pageInfo = {

    dashboard: {
        title: "Главная",
        subtitle: "Панель управления ФЕРУМ"
    },

    clients: {
        title: "Клиенты",
        subtitle: "Управление клиентами"
    },

    subscriptions: {
        title: "Абонементы",
        subtitle: "Управление абонементами"
    },

    payments: {
        title: "Платежи",
        subtitle: "История оплат"
    },

    visits: {
        title: "Посещения",
        subtitle: "Посещения спортивного зала"
    },

    training: {
        title: "Тренировки",
        subtitle: "Расписание тренировок"
    },

    trainers: {
        title: "Тренеры",
        subtitle: "Управление тренерами"
    },

    reports: {
        title: "Отчёты",
        subtitle: "Статистика спортивного зала"
    },

    settings: {
        title: "Настройки",
        subtitle: "Настройки CRM"
    }

};


/* =========================================================
ELEMENTS
========================================================= */

const pageContainer =
    document.getElementById("pageContainer");

const pageTitle =
    document.getElementById("pageTitle");

const pageSubtitle =
    document.getElementById("pageSubtitle");


/* =========================================================
NAVIGATION
========================================================= */

document
    .querySelectorAll(".nav-item")
    .forEach(button => {

        button.addEventListener("click", () => {

            const page =
                button.dataset.page;


            document
                .querySelectorAll(".nav-item")
                .forEach(item =>
                    item.classList.remove("active")
                );


            button.classList.add("active");


            renderPage(page);

        });

    });


/* =========================================================
RENDER PAGE
========================================================= */

function renderPage(page) {

    const info =
        pageInfo[page];


    pageTitle.textContent =
        info.title;

    pageSubtitle.textContent =
        info.subtitle;


    if (page === "dashboard") {

        renderDashboard();

        return;

    }


    if (page === "clients") {

        renderClients();

        return;

    }


    renderPlaceholder(page);

}


/* =========================================================
DASHBOARD
========================================================= */

function renderDashboard() {

    pageContainer.innerHTML = `

        <div class="welcome">

            <h1>
                Добро пожаловать 👋
            </h1>

            <p>
                Сегодня ${new Date().toLocaleDateString(
        "ru-RU",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    )}
            </p>

        </div>


        <div class="stats">

            <div class="stat-card">

                <div class="stat-top">

                    <div class="stat-title">
                        Всего клиентов
                    </div>

                    <div class="stat-icon">
                        ♙
                    </div>

                </div>

                <div class="stat-value">
                    ${clients.length}
                </div>

                <div class="stat-bottom">
                    зарегистрировано в CRM
                </div>

            </div>


            <div class="stat-card">

                <div class="stat-top">

                    <div class="stat-title">
                        Активные
                    </div>

                    <div class="stat-icon">
                        ✓
                    </div>

                </div>

                <div class="stat-value">
                    ${
        clients.filter(
            c => c.status === "active"
        ).length
    }
                </div>

                <div class="stat-bottom">
                    действующие абонементы
                </div>

            </div>


            <div class="stat-card">

                <div class="stat-top">

                    <div class="stat-title">
                        Посещения сегодня
                    </div>

                    <div class="stat-icon">
                        ↗
                    </div>

                </div>

                <div class="stat-value">
                    24
                </div>

                <div class="stat-bottom">
                    +12% к прошлой неделе
                </div>

            </div>


            <div class="stat-card">

                <div class="stat-top">

                    <div class="stat-title">
                        Выручка
                    </div>

                    <div class="stat-icon">
                        ₴
                    </div>

                </div>

                <div class="stat-value">
                    48 600 ₴
                </div>

                <div class="stat-bottom">
                    за текущий месяц
                </div>

            </div>

        </div>


        <div class="dashboard-grid">

            <div class="card">

                <div class="card-header">

                    <div>

                        <div class="card-title">
                            Быстрые действия
                        </div>

                        <div class="card-subtitle">
                            Основные операции CRM
                        </div>

                    </div>

                </div>


                <div class="quick-actions">

                    <button
                        class="quick-action"
                        onclick="openAddClient()"
                    >

                        <div class="quick-icon">
                            +
                        </div>

                        <div>

                            <div class="quick-title">
                                Добавить клиента
                            </div>

                            <div class="quick-text">
                                Создать новую карточку
                            </div>

                        </div>

                    </button>


                    <button
                        class="quick-action"
                        onclick="openClients()"
                    >

                        <div class="quick-icon">
                            ♙
                        </div>

                        <div>

                            <div class="quick-title">
                                Клиенты
                            </div>

                            <div class="quick-text">
                                Открыть список клиентов
                            </div>

                        </div>

                    </button>


                    <button
                        class="quick-action"
                        onclick="showPage('payments')"
                    >

                        <div class="quick-icon">
                            ₴
                        </div>

                        <div>

                            <div class="quick-title">
                                Новый платёж
                            </div>

                            <div class="quick-text">
                                Добавить оплату
                            </div>

                        </div>

                    </button>


                    <button
                        class="quick-action"
                        onclick="showPage('visits')"
                    >

                        <div class="quick-icon">
                            ↗
                        </div>

                        <div>

                            <div class="quick-title">
                                Посещение
                            </div>

                            <div class="quick-text">
                                Отметить клиента
                            </div>

                        </div>

                    </button>

                </div>

            </div>


            <div class="card">

                <div class="card-header">

                    <div>

                        <div class="card-title">
                            Последние действия
                        </div>

                        <div class="card-subtitle">
                            Сегодня
                        </div>

                    </div>

                </div>


                <div class="activity-list">

                    <div class="activity">

                        <div class="activity-dot"></div>

                        <div class="activity-text">

                            Новый клиент —
                            <strong>
                                Александр Иванов
                            </strong>

                            <div class="activity-time">
                                10 минут назад
                            </div>

                        </div>

                    </div>


                    <div class="activity">

                        <div class="activity-dot"></div>

                        <div class="activity-text">

                            Оплачен абонемент —
                            <strong>
                                3 500 ₴
                            </strong>

                            <div class="activity-time">
                                35 минут назад
                            </div>

                        </div>

                    </div>


                    <div class="activity">

                        <div class="activity-dot"></div>

                        <div class="activity-text">

                            Посещение —
                            <strong>
                                Максим Петренко
                            </strong>

                            <div class="activity-time">
                                1 час назад
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    `;

}


/* =========================================================
CLIENTS
========================================================= */

function renderClients() {

    pageContainer.innerHTML = `

        <div class="clients-toolbar">

            <div class="search-box">

                <span class="search-icon">
                    ⌕
                </span>

                <input
                    id="clientSearch"
                    type="text"
                    placeholder="Поиск по имени или телефону..."
                >

            </div>


            <div class="toolbar-right">

                <select
                    class="select"
                    id="statusFilter"
                >

                    <option value="all">
                        Все статусы
                    </option>

                    <option value="active">
                        Активные
                    </option>

                    <option value="expired">
                        Истёкшие
                    </option>

                    <option value="trial">
                        Пробные
                    </option>

                    <option value="inactive">
                        Неактивные
                    </option>

                </select>


                <button
                    class="btn btn-primary"
                    onclick="openAddClient()"
                >
                    + Добавить
                </button>

            </div>

        </div>


        <div class="card">

            <div class="card-header">

                <div>

                    <div class="card-title">
                        Все клиенты
                    </div>

                    <div class="card-subtitle">
                        ${clients.length} клиентов в базе
                    </div>

                </div>

            </div>


            <div class="table-wrap">

                <table class="table">

                    <thead>

                        <tr>

                            <th class="col-client">
                                Клиент
                            </th>

                            <th class="col-phone">
                                Телефон
                            </th>

                            <th class="col-sub">
                                Абонемент
                            </th>

                            <th class="col-date">
                                Дата
                            </th>

                            <th class="col-status">
                                Статус
                            </th>

                            <th class="col-action">
                            </th>

                        </tr>

                    </thead>

                    <tbody id="clientsTable">
                    </tbody>

                </table>

            </div>


            <div class="pagination">

                <div
                    class="pagination-info"
                    id="paginationInfo"
                >
                </div>

                <div class="pagination-buttons">

                    <button class="page-btn active">
                        1
                    </button>

                    <button class="page-btn">
                        2
                    </button>

                    <button class="page-btn">
                        →
                    </button>

                </div>

            </div>

        </div>
    `;


    document
        .getElementById("clientSearch")
        .addEventListener(
            "input",
            filterClients
        );


    document
        .getElementById("statusFilter")
        .addEventListener(
            "change",
            filterClients
        );


    drawClients(clients);

}


/* =========================================================
DRAW CLIENTS
========================================================= */

function drawClients(data) {

    const table =
        document.getElementById(
            "clientsTable"
        );

    const info =
        document.getElementById(
            "paginationInfo"
        );


    if (!table) {
        return;
    }


    info.textContent =
        `Показано ${data.length} из ${clients.length} клиентов`;


    if (data.length === 0) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    style="
                        height:180px;
                        text-align:center;
                        color:#777;
                    "
                >
                    Клиенты не найдены
                </td>

            </tr>

        `;

        return;

    }


    table.innerHTML = data.map(client => {

        const initials =

            (client.firstName[0] || "") +

            (client.lastName[0] || "");


        return `

            <tr>

                <td>

                    <div class="client-cell">

                        <div class="client-avatar">
                            ${initials}
                        </div>

                        <div>

                            <div class="client-name">
                                ${client.firstName}
                                ${client.lastName}
                            </div>

                            <div class="client-email">
                                ${
            client.email ||
            "Email не указан"
        }
                            </div>

                        </div>

                    </div>

                </td>


                <td>
                    ${client.phone}
                </td>


                <td>
                    ${client.subscription}
                </td>


                <td class="muted">
                    ${client.date}
                </td>


                <td>

                    <span class="status ${client.status}">
                        ${client.statusText}
                    </span>

                </td>


                <td class="col-action">

                    <button
                        class="row-action"
                        onclick="openClient(${client.id})"
                        title="Открыть"
                    >
                        →
                    </button>

                </td>

            </tr>

        `;

    }).join("");

}


/* =========================================================
FILTER
========================================================= */

function filterClients() {

    const search =

        document
            .getElementById("clientSearch")
            .value
            .toLowerCase()
            .trim();


    const status =

        document
            .getElementById("statusFilter")
            .value;


    const filtered =

        clients.filter(client => {

            const fullName =

                `${client.firstName} ${client.lastName}`
                    .toLowerCase();


            const phone =

                client.phone.toLowerCase();


            const matchesSearch =

                fullName.includes(search) ||

                phone.includes(search);


            const matchesStatus =

                status === "all" ||

                client.status === status;


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    drawClients(filtered);

}


/* =========================================================
OPEN CLIENT
========================================================= */

function openClient(id) {

    const client =
        clients.find(
            item => item.id === id
        );


    if (!client) {
        return;
    }


    const initials =

        (client.firstName[0] || "") +

        (client.lastName[0] || "");


    document
        .getElementById("drawerContent")
        .innerHTML = `

        <div class="profile">

            <div class="profile-avatar">
                ${initials}
            </div>

            <div>

                <div class="profile-name">
                    ${client.firstName}
                    ${client.lastName}
                </div>

                <div class="profile-phone">
                    ${client.phone}
                </div>

            </div>

        </div>


        <div class="detail-section">

            <div class="detail-title">
                Информация
            </div>


            <div class="detail-row">

                <div class="detail-label">
                    Email
                </div>

                <div class="detail-value">
                    ${
        client.email ||
        "Не указан"
    }
                </div>

            </div>


            <div class="detail-row">

                <div class="detail-label">
                    Статус
                </div>

                <div class="detail-value">

                    <span class="status ${client.status}">
                        ${client.statusText}
                    </span>

                </div>

            </div>


            <div class="detail-row">

                <div class="detail-label">
                    Регистрация
                </div>

                <div class="detail-value">
                    ${client.date}
                </div>

            </div>

        </div>


        <div class="detail-section">

            <div class="detail-title">
                Абонемент
            </div>


            <div class="detail-row">

                <div class="detail-label">
                    Тип
                </div>

                <div class="detail-value">
                    ${client.subscription}
                </div>

            </div>


            <div class="detail-row">

                <div class="detail-label">
                    Последнее посещение
                </div>

                <div class="detail-value">
                    Сегодня, 18:42
                </div>

            </div>


            <div class="detail-row">

                <div class="detail-label">
                    Всего посещений
                </div>

                <div class="detail-value">
                    27
                </div>

            </div>

        </div>


        <div class="client-actions">

            <button
                class="btn btn-primary"
                onclick="alert('Здесь можно добавить оплату')"
            >
                Добавить оплату
            </button>

            <button
                class="btn btn-secondary"
                onclick="alert('Редактирование клиента')"
            >
                Изменить
            </button>

        </div>


        <div class="delete-client-section">

            <div class="delete-warning">
                Удаление клиента необратимо
            </div>

            <button
                class="btn btn-danger delete-client-btn"
                onclick="deleteClient(${client.id})"
            >
                🗑 Удалить клиента
            </button>

        </div>

    `;


    document
        .getElementById("drawerOverlay")
        .classList.add("show");


    document
        .getElementById("clientDrawer")
        .style.display = "block";

}


/* =========================================================
CLOSE DRAWER
========================================================= */

function closeDrawer() {

    document
        .getElementById("drawerOverlay")
        .classList.remove("show");


    document
        .getElementById("clientDrawer")
        .style.display = "none";

}


/* =========================================================
ADD CLIENT MODAL
========================================================= */

function openAddClient() {

    document
        .getElementById("addClientModal")
        .classList.add("show");


    setTimeout(() => {

        document
            .getElementById("firstName")
            .focus();

    }, 50);

}


function closeAddClient() {

    document
        .getElementById("addClientModal")
        .classList.remove("show");

}


/* =========================================================
CREATE CLIENT IN DATABASE
========================================================= */

document
    .getElementById("clientForm")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const form = this;


            const firstName =

                document
                    .getElementById("firstName")
                    .value
                    .trim();


            const lastName =

                document
                    .getElementById("lastName")
                    .value
                    .trim();


            const phone =

                document
                    .getElementById("phone")
                    .value
                    .trim();


            const email =

                document
                    .getElementById("email")
                    .value
                    .trim();


            const subscription =

                document
                    .getElementById("subscription")
                    .value;


            const fullName =

                `${firstName} ${lastName}`.trim();


            const status =

                subscription === "Без абонемента"
                    ? "inactive"
                    : "active";


            try {

                const response =

                    await fetch(
                        "http://localhost:3000/api/clients",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                name: fullName,

                                phone: phone,

                                email: email,

                                status: status

                            })
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        "Не удалось добавить клиента"
                    );

                }


                const savedClient =
                    await response.json();


                console.log(
                    "Клиент сохранён в PostgreSQL:",
                    savedClient
                );


                closeAddClient();

                form.reset();


                /*
                 * После добавления снова
                 * загружаем клиентов из БД.
                 */

                await loadClients();


                showPage("clients");


                alert(
                    `Клиент "${fullName}" успешно добавлен.`
                );


            } catch (error) {

                console.error(
                    "Ошибка добавления клиента:",
                    error
                );


                alert(
                    "Не удалось добавить клиента в базу данных.\n\n" +
                    "Проверьте, запущен ли backend."
                );

            }

        }
    );


/* =========================================================
OPEN CLIENTS
========================================================= */

function openClients() {

    showPage("clients");

}


/* =========================================================
SHOW PAGE
========================================================= */

function showPage(page) {

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.toggle(
                "active",
                item.dataset.page === page
            );

        });


    renderPage(page);

}


/* =========================================================
PLACEHOLDER
========================================================= */

function renderPlaceholder(page) {

    const info =
        pageInfo[page];


    const icons = {

        subscriptions: "▣",

        payments: "₴",

        visits: "↗",

        training: "◆",

        trainers: "♟",

        reports: "▤",

        settings: "⚙"

    };


    pageContainer.innerHTML = `

        <div class="card placeholder">

            <div>

                <div class="placeholder-icon">
                    ${icons[page] || "◆"}
                </div>

                <h2>
                    ${info.title}
                </h2>

                <p>
                    Раздел готовится к подключению
                </p>

            </div>

        </div>

    `;

}


/* =========================================================
MODAL CLICK OUTSIDE
========================================================= */

document
    .getElementById("addClientModal")
    .addEventListener(
        "click",
        function(event) {

            if (event.target === this) {

                closeAddClient();

            }

        }
    );


/* =========================================================
ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key !== "Escape") {
            return;
        }


        closeAddClient();

        closeDrawer();

    }
);


/* =========================================================
DELETE CLIENT FROM DATABASE
========================================================= */

async function deleteClient(id) {

    const client =
        clients.find(
            item => item.id === id
        );


    if (!client) {
        return;
    }


    const fullName =

        `${client.firstName} ${client.lastName}`;


    const confirmed =

        confirm(
            `Вы действительно хотите удалить клиента "${fullName}"?\n\n` +
            `Это действие нельзя отменить.`
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =

            await fetch(
                `http://localhost:3000/api/clients/${id}`,
                {
                    method: "DELETE"
                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Не удалось удалить клиента"
            );

        }


        console.log(
            "Клиент удалён из PostgreSQL:",
            result
        );


        /*
         * Снова загружаем список
         * непосредственно из БД.
         */

        await loadClients();


        closeDrawer();


        renderClients();


        setTimeout(() => {

            alert(
                `Клиент "${fullName}" был удалён.`
            );

        }, 100);


    } catch (error) {

        console.error(
            "Ошибка удаления клиента:",
            error
        );


        alert(
            "Не удалось удалить клиента из базы данных.\n\n" +
            "Проверьте, запущен ли backend."
        );

    }

}


/* =========================================================
INITIAL PAGE
========================================================= */

loadClients()
    .then(() => {

        renderPage("dashboard");

    });
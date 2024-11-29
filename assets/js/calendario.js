const calendarData = {
    1: { currentYear: new Date().getFullYear(), currentMonth: new Date().getMonth() },
    2: { currentYear: new Date().getFullYear(), currentMonth: new Date().getMonth() }
};

function renderCalendar(containerId, daysId, monthId, currentYear, currentMonth) {
const daysElement = document.getElementById(daysId);
const monthElement = document.getElementById(monthId);
const today = new Date();

if (!daysElement || !monthElement) {
console.error(`Elementos não encontrados para renderizar o calendário: ${daysId}, ${monthId}`);
return;
}

daysElement.innerHTML = '';

const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
const daysInPreviousMonth = new Date(currentYear, currentMonth, 0).getDate();

monthElement.textContent = new Date(currentYear, currentMonth)
.toLocaleString("pt-BR", { month: "long" }) +
" " +
currentYear;

for (let i = firstDayOfMonth; i > 0; i--) {
const day = document.createElement("div");
day.innerHTML = `<span class="day-number">${daysInPreviousMonth - i + 1}</span>`;
day.classList.add("other-month");
daysElement.appendChild(day);
}

for (let i = 1; i <= daysInMonth; i++) {
const day = document.createElement("div");
const isToday = today.getDate() === i && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
day.innerHTML = `<span class="day-number ${isToday ? 'current-day' : ''}">${i}</span>`;
day.classList.add("current-month");
daysElement.appendChild(day);
}

const remainingDays = 42 - daysElement.childElementCount;
for (let i = 1; i <= remainingDays; i++) {
const day = document.createElement("div");
day.innerHTML = `<span class="day-number">${i}</span>`;
day.classList.add("other-month");
daysElement.appendChild(day);
}
}

function changeMonth(calendarId, offset) {
    const calendar = calendarData[calendarId];
    if (!calendar) {
        console.error(`Calendário com ID ${calendarId} não encontrado.`);
        return;
    }

    calendar.currentMonth += offset;
    if (calendar.currentMonth < 0) {
        calendar.currentMonth = 11;
        calendar.currentYear -= 1;
    } else if (calendar.currentMonth > 11) {
        calendar.currentMonth = 0;
        calendar.currentYear += 1;
    }
    renderCalendar(
        `calendarContainer${calendarId}`,
        `days${calendarId}`,
        `month${calendarId}`,
        calendar.currentYear,
        calendar.currentMonth
    );
}

function changeView(view, calendarId) {
    const daysElement = document.getElementById(`days${calendarId}`);
    const monthElement = document.getElementById(`month${calendarId}`);
    const monthButton = document.getElementById(`btnMes`);
    const weekButton = document.getElementById(`btnSemana`);

    if (view === 'month') {
        // Restaurar a visualização de mês
        const currentYear = calendarData[calendarId].currentYear;
        const currentMonth = calendarData[calendarId].currentMonth;

        daysElement.classList.remove('week-view'); // Remove a classe de semana
        renderCalendar(
            `calendarContainer${calendarId}`,
            `days${calendarId}`,
            `month${calendarId}`,
            currentYear,
            currentMonth
        );

        toggleActiveClass(monthButton.id, weekButton.id);
    } else if (view === 'week') {
        // Alternar para a visualização de semana
        const today = new Date(); // Data atual
        const currentYear = calendarData[calendarId].currentYear;
        const currentMonth = calendarData[calendarId].currentMonth;

        // Pegar a data de hoje ajustada para a semana atual
        const dayOfWeek = today.getDay(); // 0 para domingo, 1 para segunda, etc.
        const firstDayOfWeek = new Date(today); // Base para o início da semana
        firstDayOfWeek.setDate(today.getDate() - dayOfWeek); // Ajusta para domingo

        const weekDays = []; // Armazena os dias da semana
        for (let i = 0; i < 7; i++) {
            const day = new Date(firstDayOfWeek); // Copia o primeiro dia da semana
            day.setDate(firstDayOfWeek.getDate() + i); // Adiciona o deslocamento de dias
            weekDays.push(day);
        }

        daysElement.innerHTML = ''; // Limpa os dias existentes
        daysElement.classList.add('week-view'); // Adiciona a classe de semana
        weekDays.forEach((day) => {
            const dayElement = document.createElement('div');
            const isToday = day.toDateString() === new Date().toDateString();
            dayElement.innerHTML = `<span class="day-number ${isToday ? 'current-day' : ''}">${day.getDate()}</span>`;
            dayElement.classList.add('week-view-day');
            daysElement.appendChild(dayElement);
        });

        toggleActiveClass(weekButton.id, monthButton.id);
    }
}



function toggleActiveClass(activeId, inactiveId) {
    document.getElementById(activeId).classList.add('active');
    document.getElementById(inactiveId).classList.remove('active');
}


function toggleActiveClass(activeId, inactiveId) {
    document.getElementById(activeId).classList.add('active');
    document.getElementById(inactiveId).classList.remove('active');
}

// Inicializar calendários
renderCalendar("calendarContainer1", "days1", "month1", calendarData[1].currentYear, calendarData[1].currentMonth);
renderCalendar("calendarContainer2", "days2", "month2", calendarData[2].currentYear, calendarData[2].currentMonth);
class Calendar extends Window {
    constructor() {
        super('Calendar', 'calendar', true, 'assets/images/icons/calendar.png');

        this.generateElement(this.generateHTML());
        this.state = "date"
    }

    toggleCalendarTab(tab) {
        if (this.state === "date" && tab === "time") {
            this.state = "time"
            this.setCalendarToTime()
        } else if (this.state === "time" && tab === "date") {
            this.state = "date"
            this.setCalendarToDate()
        }
    }

    setCalendarToDate() {
        $(this.elem).find("#dateButton")[0].style.boxShadow = "inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080";
        $(this.elem).find("#timeButton")[0].style.boxShadow = null
    }

    setCalendarToTime() {
        $(this.elem).find("#timeButton")[0].style.boxShadow = "inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080";
        $(this.elem).find("#dateButton")[0].style.boxShadow = null
    }

    generateHTML() {
        const container = document.createElement('div');

        const dateButton = document.createElement('button');
        dateButton.id = "dateButton";
        dateButton.onclick = () => this.toggleCalendarTab("date");
        dateButton.innerHTML = 'Date';
        dateButton.style.outline = 'none';
        container.append(dateButton);

        const timeButton = document.createElement('button');
        timeButton.id = 'timeButton';
        timeButton.onclick = () => this.toggleCalendarTab("time");
        timeButton.innerHTML = 'Time';
        timeButton.style.outline = 'none';
        container.append(timeButton);

        const calendarContainer = document.createElement('div');
        calendarContainer.id = 'calendarBody';
        container.append(calendarContainer);

        return container;
    }
}

function openCalendar() {
    const calendar = new Calendar();
    calendar.render();
}
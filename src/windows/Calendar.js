class Calendar extends Window {
    constructor() {
        super('Calendar', 'calendar', true, 'assets/images/icons/calendar.png');

        this.generateElement(this.generateHTML());
        this.state = "date"
        this.setCalendar()
        this.setToCurrentDate()
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

    setCalendar() {
        $(this.elem).find("#dateButton")[0].style.boxShadow = "inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080";
        $(this.elem).find("#timeButton")[0].style.boxShadow = null

        const d = new Date();
        const currentMonth = d.getMonth();
        const currentYear = d.getFullYear();

        let months = ""
        for (let i = 0; i < 12; i += 1) {
            let selectedTag = ""
            if (i === currentMonth) selectedTag = "selected"
            months += `<option ${selectedTag}>${this.convert(i, "month")}</option>`
        }

        const monthSelector = document.createElement('select');
        monthSelector.id = "monthSelector";
        monthSelector.innerHTML = months;

        const yearSelector = document.createElement('button');
        yearSelector.id = "yearSelector";
        yearSelector.innerHTML = currentYear;

        const yearUpButton = document.createElement('button');
        yearUpButton.id = "yearUpButton";
        yearUpButton.innerHTML = "▲";
        yearUpButton.onclick = () => this.yearUp();

        const yearDownButton = document.createElement('button');
        yearDownButton.id = "yearDownButton";
        yearDownButton.innerHTML = "▼";
        yearDownButton.onclick = () => this.yearDown();

        const calendarMainDisplay = document.createElement('div');
        calendarMainDisplay.id = "calendarMainDisplay";

        const calendarDisplay = document.createElement('div');
        calendarDisplay.id = "calendarDisplay";

        const dayDisplay = document.createElement('div');
        dayDisplay.id = "dayDisplay";

        calendarMainDisplay.append(calendarDisplay, dayDisplay)
        $(this.elem).find("#calendarBody").append(monthSelector, yearSelector, yearUpButton, yearDownButton, calendarMainDisplay);
    }

    setToCurrentDate() {
        const d = new Date();
        this.updateCalendar(d.getFullYear(), d.getMonth())
        this.updateDay(d.getDate(), d.getMonth(), d.getFullYear())
    }

    updateDay(day, month, year) {
        const formattedMonth = this.convert(month, "month")

        let nationalDays = $.getJSON(`https://national-api-day.herokuapp.com/api/date/${month + 1}/${day}`, (data) => {
            nationalDays = data.holidays
            let formattedNationalDays = ""
            for (let i = 0; i < nationalDays.length; i += 1)
                formattedNationalDays += `<li>${nationalDays[i]}</li>`

            // TODO: make dayheader position fixed and parent relative
            const content = `
                <div id="dayHeader">
                    <p>${formattedMonth} ${day}, ${year}</p>
                </div>
                <div id="dayBody">
                    ${formattedNationalDays}
                </div>
            `

            $(this.elem).find("#dayDisplay").html(content)
        })
    }

    updateCalendar(year, month) {
        const {
            firstDay,
            daysInMonth
        } = this.getMonthInfo(year, month);
        let dates = ``
        for (let i = 0; i < firstDay; i += 1)
            dates += `<li>&nbsp</li>`

        for (let i = 0; i < daysInMonth; i += 1)
            dates += `<li>${i+1}</li>`


        const content = `
        <ul id="weekdays">
            <li>S</li>
            <li>M</li>
            <li>T</li>
            <li>W</li>
            <li>T</li>
            <li>F</li>
            <li>S</li>
        </ul>
        <ul id="days">
            ${dates}
        </ul>
        `

        $(this.elem).find("#calendarDisplay").html(content)
    }

    convert(data, type) {
        switch (type) {
            case "month":
                switch (data) {
                    case 0:
                        return "January"
                    case 1:
                        return "February"
                    case 2:
                        return "March"
                    case 3:
                        return "April"
                    case 4:
                        return "May"
                    case 5:
                        return "June"
                    case 6:
                        return "July"
                    case 7:
                        return "August"
                    case 8:
                        return "September"
                    case 9:
                        return "October"
                    case 10:
                        return "November"
                    case 11:
                        return "December"
                    default:
                        return null
                }
                case "number":
                    switch (data) {
                        case "January":
                            return 0
                        case "February":
                            return 1
                        case "March":
                            return 2
                        case "April":
                            return 3
                        case "May":
                            return 4
                        case "June":
                            return 5
                        case "July":
                            return 6
                        case "August":
                            return 7
                        case "September":
                            return 8
                        case "October":
                            return 9
                        case "November":
                            return 10
                        case "December":
                            return 11
                        default:
                            return null
                    }
                    default:
                        return null
        }
    }

    getMonthInfo(year, month) {
        // Get the first day of the month
        const firstDay = (new Date(year, month)).getDay()
        // Get the number of days in the month
        const daysInMonth = 32 - new Date(year, month, 32).getDate();
        return {
            firstDay,
            daysInMonth
        }
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
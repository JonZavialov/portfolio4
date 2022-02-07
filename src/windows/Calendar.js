class Calendar extends Window {
    constructor() {
        super(
            'Calendar',
            'calendar',
            true,
            'assets/images/icons/calendar.png'
        )

        this.generateElement(this.generateHTML());
    }

    toggleCalendarTab(direction) {
        // TODO: redo the way the tabs are styled
        const elem = $(this.elem)
        const borderCovers = [elem.find("#borderCover")[0], elem.find("#borderCoverVertical")[0], elem.find("#borderCoverVertical2")[0]]
        for (let i = 0; i < borderCovers.length; i += 1) {
            const transformX = parseInt(getComputedStyle(borderCovers[i]).getPropertyValue('transform').split(' ')[4].slice(0, -1))
            const transformY = parseInt(getComputedStyle(borderCovers[i]).getPropertyValue('transform').split(' ')[5].slice(0, -1))
            if (direction === -1 && transformX < 10) return
            if (direction === 1 && transformX > 50) return
            borderCovers[i].style.transform = `translate(${transformX + (77 * direction)}px, ${transformY}px)`
        }
        if (direction === -1) this.setCalendarToDate()
        else this.setCalendarToTime()
    }

    setCalendarToDate() {
        console.log('setting to date')
    }

    setCalendarToTime() {
        console.log('setting to time')
    }

    generateHTML() {
        const container = document.createElement('div');

        const dateButton = document.createElement('button');
        dateButton.onclick = () => this.toggleCalendarTab(-1);
        dateButton.innerHTML = 'Date';
        dateButton.style.outline = "none";
        container.append(dateButton);

        const timeButton = document.createElement('button');
        timeButton.onclick = () => this.toggleCalendarTab(1);
        timeButton.innerHTML = 'Time';
        timeButton.style.outline = "none";
        container.append(timeButton);

        const borderCoverHorizontal = document.createElement('div');
        borderCoverHorizontal.id = "borderCover"
        container.append(borderCoverHorizontal);

        const borderCoverVertical1 = document.createElement('div');
        borderCoverVertical1.id = "borderCoverVertical"
        container.append(borderCoverVertical1);

        const borderCoverVertical2 = document.createElement('div');
        borderCoverVertical2.id = "borderCoverVertical2"
        container.append(borderCoverVertical2);

        const calendarContainer = document.createElement('div');
        calendarContainer.id = "calendarBody";
        container.append(calendarContainer);

        return container
    }
}

function openCalendar() {
    const calendar = new Calendar();
    calendar.render()
}
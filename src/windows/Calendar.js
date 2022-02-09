class Calendar extends Window {
  /**
   * The Calendar app.
   */
  constructor() {
    super('Calendar', 'calendar', true, 'assets/images/icons/calendar.png');

    this.generateElement(this.generateHTML());
    this.state = 'date';

    const d = new Date();
    this.year = d.getFullYear();
    this.month = d.getMonth();
    this.day = d.getDate();

    this.MONTHSARR = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    this.setCalendar();
    this.setToStoredDate();
  }

  /**
   * Toggles the tab between the clock and the calendar.
   * @param  {string} tab - The tab to toggle.
   */
  toggleCalendarTab(tab) {
    if (this.state === 'date' && tab === 'time') {
      this.state = 'time';
      this.setTime();
    } else if (this.state === 'time' && tab === 'date') {
      this.state = 'date';
      this.setCalendar();
      this.setToStoredDate();
    }
  }

  /**
   * Sets the calendar to the stored date.
   */
  setToStoredDate() {
    this.updateCalendar(this.year, this.month);
    this.clickDay(this.day, this.month, this.year);
  }

  /**
   * Highlights the day in the calendar and clears every other day.
   * @param  {HTMLElement} elem - The element to highlight.
   */
  highlightDay(elem) {
    elem.style.backgroundColor = 'rgb(221, 221, 221)';

    $(this.elem)
      .find('#days')
      .find('li')
      .each((i) => {
        const indexElem = $(this.elem).find('#days').find('li')[i];
        if (indexElem !== elem) indexElem.style.backgroundColor = null;
      });
  }

  /**
   * Clears the holidays display.
   */
  clearDay() {
    $(this.elem).find('#dayDisplay').empty();
  }

  /**
   * Increases the year by one.
   */
  yearUp() {
    this.year += 1;
    this.updateCalendar(this.year, this.month);
    this.clearDay();

    $(this.elem).find('#yearSelector').html(this.year);
  }

  /**
   * Decreases the year by one.
   */
  yearDown() {
    this.year -= 1;
    this.updateCalendar(this.year, this.month);
    this.clearDay();

    $(this.elem).find('#yearSelector').html(this.year);
  }

  /**
   * Called when a day is clicked.
   * @param  {number} day - The day of the month.
   * @param  {number} month - The month.
   * @param  {number} year - The year.
   * @param  {HTMLElement} [elem=null] - The element of the day tile.
   */
  clickDay(day, month, year, elem = null) {
    this.day = day;
    if (elem) this.highlightDay(elem);
    else
      $(this.elem)
        .find('#days')
        .find('li')
        .each((i) => {
          const indexElem = $(this.elem).find('#days').find('li')[i];
          if (indexElem.innerHTML === day.toString())
            this.highlightDay(indexElem);
        });

    const formattedMonth = this.convert(month, 'month');

    let nationalDays = $.getJSON(
      `https://national-api-day.herokuapp.com/api/date/${month + 1}/${day}`,
      (data) => {
        nationalDays = data.holidays;
        let formattedNationalDays = '';
        for (let i = 0; i < nationalDays.length; i += 1)
          formattedNationalDays += `<li>${nationalDays[i]}</li>`;

        const content = `
                <div id="dayHeader">
                    <p>${formattedMonth} ${day}, ${year}</p>
                </div>
                <div id="dayBody">
                    ${formattedNationalDays}
                </div>
            `;

        $(this.elem).find('#dayDisplay').html(content);
      }
    );
  }

  /**
   * Updates the calendar to the month and year.
   * @param  {number} year - The year.
   * @param  {number} month - The month.
   */
  updateCalendar(year, month) {
    this.year = year;
    this.month = month;
    const { firstDay, daysInMonth } = this.getMonthInfo(year, month);
    let dates = ``;
    for (let i = 0; i < firstDay; i += 1) dates += `<li>&nbsp</li>`;

    for (let i = 0; i < daysInMonth; i += 1) dates += `<li>${i + 1}</li>`;

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
        `;

    $(this.elem).find('#calendarDisplay').html(content);

    $(this.elem)
      .find('#days')
      .find('li')
      .each((i) => {
        const elem = $(this.elem).find('#days').find('li')[i];
        if (elem.innerHTML === '&nbsp;') return;
        elem.onclick = () => this.clickDay(elem.innerHTML, month, year, elem);
      });
  }

  /**
   * Converts the number of a month to its name or vice versa.
   * @param  {string|number} data - The data to convert.
   * @param  {string} type - The type of data to convert to.
   * @returns {string|number|null} - The converted data.
   */
  convert(data, type) {
    if (type === 'month') return this.MONTHSARR[data];
    if (type === 'number') return this.MONTHSARR.indexOf(data);

    return null;
  }

  /**
   * Gets the first day of the month and the number of days in the month.
   * @param  {number} year - The year.
   * @param  {number} month - The month.
   * @returns {object} - The first day and number of days in the month.
   */
  getMonthInfo(year, month) {
    // Get the first day of the month
    const firstDay = new Date(year, month).getDay();
    // Get the number of days in the month
    const daysInMonth = 32 - new Date(year, month, 32).getDate();
    return {
      firstDay,
      daysInMonth,
    };
  }

  /**
   * Sets the window to the clock tab.
   */
  setTime() {
    $(this.elem).find('#timeButton')[0].style.boxShadow =
      'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080';
    $(this.elem).find('#dateButton')[0].style.boxShadow = null;

    $(this.elem).find('#calendarBody').empty();
  }

  /**
   * Generates the outer DOM elements for the window.
   * @returns {HTMLElement} - The outer DOM elements for the window.
   */
  generateHTML() {
    const container = document.createElement('div');

    const dateButton = document.createElement('button');
    dateButton.id = 'dateButton';
    dateButton.onclick = () => this.toggleCalendarTab('date');
    dateButton.innerHTML = 'Date';
    dateButton.style.outline = 'none';
    container.append(dateButton);

    const timeButton = document.createElement('button');
    timeButton.id = 'timeButton';
    timeButton.onclick = () => this.toggleCalendarTab('time');
    timeButton.innerHTML = 'Time';
    timeButton.style.outline = 'none';
    container.append(timeButton);

    const calendarContainer = document.createElement('div');
    calendarContainer.id = 'calendarBody';
    container.append(calendarContainer);

    return container;
  }

  /**
   * Sets the window to the calendar tab.
   */
  setCalendar() {
    $(this.elem).find('#dateButton')[0].style.boxShadow =
      'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080';
    $(this.elem).find('#timeButton')[0].style.boxShadow = null;

    let months = '';
    for (let i = 0; i < 12; i += 1) {
      let selectedTag = '';
      if (i === this.month) selectedTag = 'selected';
      months += `<option ${selectedTag}>${this.convert(i, 'month')}</option>`;
    }

    const monthSelector = document.createElement('select');
    monthSelector.id = 'monthSelector';
    monthSelector.innerHTML = months;
    monthSelector.onchange = () => {
      this.updateCalendar(
        this.year,
        this.convert(monthSelector.value, 'number')
      );
      this.clearDay();
    };

    const yearSelector = document.createElement('button');
    yearSelector.id = 'yearSelector';
    yearSelector.innerHTML = this.year;

    const yearUpButton = document.createElement('button');
    yearUpButton.id = 'yearUpButton';
    yearUpButton.innerHTML = '▲';
    yearUpButton.onclick = () => this.yearUp();

    const yearDownButton = document.createElement('button');
    yearDownButton.id = 'yearDownButton';
    yearDownButton.innerHTML = '▼';
    yearDownButton.onclick = () => this.yearDown();

    const calendarMainDisplay = document.createElement('div');
    calendarMainDisplay.id = 'calendarMainDisplay';

    const calendarDisplay = document.createElement('div');
    calendarDisplay.id = 'calendarDisplay';

    const dayDisplay = document.createElement('div');
    dayDisplay.id = 'dayDisplay';

    calendarMainDisplay.append(calendarDisplay, dayDisplay);
    $(this.elem)
      .find('#calendarBody')
      .append(
        monthSelector,
        yearSelector,
        yearUpButton,
        yearDownButton,
        calendarMainDisplay
      );
  }
}

/**
 * Opens the Calendar app.
 */
function openCalendar() {
  const calendar = new Calendar();
  calendar.render();
}

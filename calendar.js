/**
 *  JavaScript Binary calendar
 */

'use strict';

/**
 *    Constructor
 */
var BinaryCalendar = function () {
    this.date = new Date();
    this.currentYear = this.date.getFullYear();
    this.currentMonth = this.date.getMonth();
    this.daysShort = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    this.monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    this.MIN_YEAR = 1970;
    this.MAX_YEAR = 2150;

    //Armenian Holidays
    this.holydays  = [
        {month:0, day: 1, week: "Monday", title:"New Year's Day", status:"National holiday"},
        {month:0, day: 2, week: "Tuesday", title:"New Year's Day (Day 2)", status:"National holiday"},
        {month:0, day: 3, week: "Wednesday", title:"New Year's Day (Day 3)", status:"National holiday"},
        {month:0, day: 4, week: "Thursday", title:"New Year's Day (Day 4)", status:"National holiday"},
        {month:0, day: 5, week: "Friday", title:"Armenian Christmas Eve", status:"National holiday"},
        {month:0, day: 6, week: "Saturday", title:"Armenian Christmas Day", status:"National holiday"},
        {month:0, day: 28, week: "Sunday", title:"Army Day", status:"National holiday"},

        {month:1, day: 6, week: "Tuesday", title:"Translators' Day", status:"Observance"},
        {month:1, day: 8, week: "Thursday", title:"Feast of Saint Vartan", status:"Observance"},
        {month:1, day: 14, week: "Wednesday", title:"Valentine's Day", status:"Observance"},
        {month:1, day: 14, week: "Wednesday", title:"Valentine's Day", status:"Observance"},

        {month:2, day: 8, week: "Thursday", title:"International Women's Day", status:"National holiday"},
        {month:2, day: 20, week: "Tuesday", title:"March equinox", status:"Season"},
        {month:2, day: 30, week: "Friday", title:"Good Friday", status:"Observance"},
        {month:2, day: 31, week: "Saturday", title:"Holy Saturday", status:"Observance"},

        {month:3, day: 1, week: "Sunday", title:"Easter Sunday", status:"National holiday"},
        {month:3, day: 2, week: "Monday", title:"Easter Monday", status:"Observance"},
        {month:3, day: 7, week: "Saturday", title:"Motherhood and Beauty Day", status:"Observance"},
        {month:3, day: 24, week: "Tuesday", title:"Genocide Remembrance Day", status:"National holiday"},

        {month:4, day: 1, week: "Tuesday", title:"Labour Day/May Day", status:"National holiday"},
        {month:4, day: 8, week: "Tuesday", title:"Congress", status:"Observance"},
        {month:4, day: 9, week: "Wednesday", title:"Victory and Peace Day", status:"National holiday"},
        {month:4, day: 28, week: "Monday", title:"Republic Day", status:"National holiday"},

        {month:5, day: 1, week: "Friday", title:"Children's Day", status:"Observance"},
        {month:5, day: 17, week: "Sunday", title:"Fathers' Day", status:"Observance"},
        {month:5, day: 21, week: "Thursday", title:"June Solstice", status:"Season"},

        {month:6, day: 5, week: "Thursday", title:"Constitution Day", status:"National holiday"},
        {month:6, day: 8, week: "Sunday", title:"Vardavar", status:"National holiday"},

        {month:8, day: 1, week: "Saturday", title:"Knowledge and Literature Day", status:"Observance"},
        {month:8, day: 21, week: "Friday", title:"Independence Day", status:"National holiday"},
        {month:8, day: 23, week: "Sunday", title:"September equinox", status:"Season"},

        {month:9, day: 31, week: "Wednesday", title:"Halloween", status:"Observance"},

        {month:11, day: 7, week: "Friday", title:"Spitak Remembrance Day", status:"Observance"},
        {month:11, day: 21, week: "Friday", title:"December Solstice", status:"Season"},
        {month:11, day: 31, week: "Monday", title:"New Year's Eve", status:"National holiday"}
    ]
};

/**
 *    Create new HTML element with a class.
 *  @param element Element tag name
 *  @param className Element class name
 *  @return HTML element
 */
BinaryCalendar.prototype.createHtmlElement = function (element, className) {
    var el = document.createElement(element);
    el.classList.add(className);
    return el;
};

/**
 *    Store and parse month data
 *  @param month, year
 *    @return monthData object
 */
BinaryCalendar.prototype.monthData = function (month, year) {
    var monthData = {
        year: year,
        month: month,
        // Number of days in current month
        monthDaysCount: function () {
            var _this = this;
            var daysCount = new Date(_this.year, _this.month + 1, 0).getDate();
            return daysCount;
        },
        // Get week day for every day in the month 0 to 6.
        weekDay: function (d) {
            var _this = this;
            var dayNum = new Date(_this.year, _this.month, d);
            var weekDay = (dayNum.getDay() == 0) ? 6 : dayNum.getDay()-1;
            return weekDay;
        }
    };

    return monthData;
};

/**
 *    Get the name of the month
 * @param monthNumber Number of the month (0 - 11)
 *    @return String name of the month
 */
BinaryCalendar.prototype.getMonthName = function (monthNumber) {
    for (var i = 0; i < this.monthNames.length; i++) {
        if (i === monthNumber) {
            return this.monthNames[i];
        }
    }
};

/**
 *    Construct HTML with month name and year
 * @param monthData object
 *    @return HTML with month name and year
 */
BinaryCalendar.prototype.createMonthNameWrap = function (monthData) {
    var div = this.createHtmlElement("div", "month");
    div.innerHTML = this.getMonthName(monthData.month);
    return div;
};

/**
 *    Construct HTML thead element
 *    @return HTML
 */
BinaryCalendar.prototype.createMonthTableHead = function () {
    var ul = this.createHtmlElement("ul", "weekdays");
    var li;

    for (var i = 0; i < this.daysShort.length; i++) {
        li = this.createHtmlElement("li", "day-item");
        li.innerHTML = this.daysShort[i];
        ul.appendChild(li);
    }
    return ul;
};

/**
 * Decimal To Binary converter
 * @desc adds zeros at the beginning of the binary representation if it's size less then {@param length}
 *
 * @param day is decimal number of day
 * @param length is binary representation length
 * @return binary string
 */
BinaryCalendar.prototype.decimalToBinary = function (day, length) {
    var binaryDay = parseInt(day, 10).toString(2);
    var zeroes = "";
    for (var i = 0; i < length - binaryDay.length; ++i) {
        zeroes += "0";
    }
    return zeroes+binaryDay;
};


BinaryCalendar.prototype.isHoliday = function (month, day) {
    for (var key in this.holydays) {
        if (this.holydays[key].month == month && this.holydays[key].day == day) {
            return true;
        }
    }
    return false;
};

/**
 *    Distribute month days to the according table cells
 *
 * @param monthData object
 * @return HTML
 */
BinaryCalendar.prototype.distributeDays = function (monthData, ulDays) {
    var day = 1;
    var dayCount = monthData.monthDaysCount();

    while (day < dayCount) {
        var weekRow;
        for (var i = 0; i < 7; i++) {
            weekRow = document.createElement("li");
            if (monthData.weekDay(day) == i) {
                if (monthData.weekDay(day) == 5) {

                    var holidayEl = this.createHtmlElement("span", "saturday");
                    holidayEl.innerHTML = this.decimalToBinary(day, 5);
                    weekRow.appendChild(holidayEl);

                } else if (monthData.weekDay(day) == 6) {

                    var holidayEl = this.createHtmlElement("span", "sunday");
                    holidayEl.innerHTML = this.decimalToBinary(day, 5);
                    weekRow.appendChild(holidayEl);

                } else if (this.isHoliday(monthData.month, day)) {

                    var holidayEl = this.createHtmlElement("span", "holiday");
                    holidayEl.innerHTML = this.decimalToBinary(day, 5);
                    weekRow.appendChild(holidayEl);

                } else {
                    weekRow.innerHTML = this.decimalToBinary(day, 5);
                }
                day++;
            } else {
                weekRow.innerHTML = "";
            }
            if (day > dayCount) {
                break;
            }
            ulDays.appendChild(weekRow);
        }
    }
};

/**
 *    Construct HTML ul element for days
 *  @param monthData object
 *  @return HTML
 */
BinaryCalendar.prototype.createMonthTableBody = function (monthData) {
    var ulDays = this.createHtmlElement("ul", "days");
    this.distributeDays(monthData, ulDays);
    return ulDays;
};

/**
 *    Construct HTML table element
 * @param monthData object
 * @return HTML table element inside wrapper element
 */
BinaryCalendar.prototype.createMonthTableWrap = function (monthData) {
    var div = this.createHtmlElement("div", "calendar-month");
    var table = this.createHtmlElement("div", "calendar");
    table.appendChild(this.createMonthTableHead());
    table.appendChild(this.createMonthTableBody(monthData));
    div.appendChild(table);
    return div;
};

/**
 *    Create wrapper element for calendar month
 * @param monthData object
 * @return HTML element
 */
BinaryCalendar.prototype.createMonthWrapper = function (monthData) {
    var div = this.createHtmlElement("div", "item");
    div.appendChild(this.createMonthNameWrap(monthData));
    div.appendChild(this.createMonthTableWrap(monthData));
    return div;
};

/**
 *
 *    Update monthData object by incrementing month and year accordingly
 * @param monthData, counter Object with month data, loop counter
 * @param counter is counter number
 *    @return monthData Updated monthData object
 *
 */
BinaryCalendar.prototype.updateMonthData = function (monthData, counter) {
    if (counter !== 0) {
        if (monthData.month < 11) {
            monthData.month++
        } else {
            monthData.month = 0;
            monthData.year++;
        }
    }
    return monthData;
};

/**
 *    Assigns properties values to render calendar
 * @desc data Object containing initial calendar data
 *        id required Element id to contain calendar
 *        month optional Starting month to display (values from 0 to 11)
 *           year optional Year of the starting month to display (min value 1970)
 *        count Months optional to display (min value of 1)
 */
BinaryCalendar.prototype.parseInputData = function (id, count, month, year) {
    this.startMonth = month > 11 || month === undefined ? this.currentMonth : month;
    this.startMonthsYear = year < this.MIN_YEAR || year > this.MAX_YEAR || year === undefined ? this.currentYear : year;
    this.monthCount = count === 0 || count > 12 || count === undefined ? 1 : count;
    this.containerId = id;
};

BinaryCalendar.prototype.createYearsRange = function() {
    var yearsSelectBox = calendar.createHtmlElement("select", "yearsSelectBox");
    //yearsSelectBox.setAttribute("onchange", function() {onchangeEventHandler(this.value);} );
    yearsSelectBox.setAttribute("onChange", "onchangeEventHandler(this.value)" );

    for (var j = this.MIN_YEAR; j < this.MAX_YEAR; ++j) {
        var option = document.createElement("option");
        option.value = j;
        option.text = j;
        yearsSelectBox.add(option);
    }


    return yearsSelectBox;

};

/**
 *    Render calendar HTML to page
 */
BinaryCalendar.prototype.renderCalendar = function (id, count, month, year) {
    this.parseInputData(id, count, month, year);
    var monthData = this.monthData(this.startMonth, this.startMonthsYear);
    var calendarContainer = document.getElementById(this.containerId);

    var yearsSelectBox = this.createYearsRange();
    yearsSelectBox.value = year;
    document.getElementById("chosenYear").innerHTML = "Year: " + year;
    calendarContainer.appendChild(yearsSelectBox);

    for (var i = 0; i < this.monthCount; i++) {
        var updatedData = this.updateMonthData(monthData, i);
        calendarContainer.appendChild(this.createMonthWrapper(updatedData));
    }
};


var calendar = new BinaryCalendar();
calendar.renderCalendar("calendar", 12, 0, 2018);

function onchangeEventHandler(val) {
    var calendarEl = document.getElementById(calendar.containerId);
    calendarEl.innerHTML = "";
    calendar.renderCalendar("calendar", 12, 0, val);
}
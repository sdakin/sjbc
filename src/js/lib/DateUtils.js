define([], function() {

    /* jshint node: true, strict: true */
    "use strict";

    function DateUtils() {}

    DateUtils.millisPerDay = 24 * 60 * 60 * 1000;
    DateUtils.millisPerWeek = DateUtils.millisPerDay * 7;

    DateUtils.dateToJulianDay = function(date) {
        var year = date.getFullYear();
        var yearStart = new Date(year, 0, 1).getTime();
        var julianDay = 0;
        var dateTime = date.getTime();
        while (dateTime >= yearStart) {
            julianDay++;
            dateTime -= DateUtils.millisPerDay;
        }
        return julianDay;
    };

    DateUtils.dateToWeekNum = function(date) {
        while(date.getDay() != 1)
            date = new Date(date.getTime() - DateUtils.millisPerDay);
        var year = date.getFullYear();
        var yearStart = new Date(year, 0, 1);
        var weekNum = 1;
        var dateTime = date.getTime();
        while (dateTime >= yearStart) {
            weekNum++;
            dateTime -= DateUtils.millisPerWeek;
        }
        return weekNum;
    };

    /**
     * Given a date this function will find the preceding Monday and following 
     * Sunday dates and return them in an object with properties, startDate
     * and endDate.
     */
    DateUtils.getMondayWeekRange = function(date, weeksBack) {
        if (weeksBack && Number(weeksBack) > 0) {
            date = new Date(date.getTime() - (DateUtils.millisPerWeek * Number(weeksBack)));
        }
        var curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        var startDay = new Date(curDay.getTime());
        var endDay = new Date(curDay.getTime());
        while(startDay.getDay() !== 1)   // back up to previous Monday
            startDay = new Date(startDay.getTime() - DateUtils.millisPerDay);
        while(endDay.getDay() !== 0)     // forward to next Sunday
            endDay = new Date(endDay.getTime() + DateUtils.millisPerDay);
        return {
            startDate: startDay,
            endDate: endDay
        };
    };

    // given a date and a day of the week (0 = Sunday, ... 6 = Saturday)
    // this fucntion returns a Date object of the previous occurrence of the 
    // specified day
    DateUtils.getPreviousDay = function(date, day) {
        var curDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        var startDay = new Date(curDay.getTime());
        // back up to the previous occurrence of the specified day
        while(startDay.getDay() !== day)
            startDay = new Date(startDay.getTime() - DateUtils.millisPerDay);
        return startDay;
    };

    return DateUtils;
});

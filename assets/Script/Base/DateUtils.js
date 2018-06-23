const i18n = require('i18n');
export default class DateUtils{
    static totalDaysInMonth = function(year, month) {
        let thisMonth = new Date(year, month);
        let nextMonthYear = year;
        let nextMonthMonth = month + 1;
        let nextMonth = new Date(nextMonthYear, nextMonthMonth);
        let days = (nextMonth.getTime() - thisMonth.getTime()) / (1000 * 3600 * 24);
        return Math.round(days);
    }

    /**
    * 返回本地化Month名称。Month从0开始，0表示一月份。
    */
    // 不要将这些key翻译多语言后变成DateUtils的一个成员数组，会导致i18的多语言是en。
    static i18nMonth = function(month) {
        let I18nMonthsKey = [
            'TID_SYS_JAN',
            'TID_SYS_FEB',
            'TID_SYS_MAR',
            'TID_SYS_APR',
            'TID_SYS_MAY',
            'TID_SYS_JUN',
            'TID_SYS_JUL',
            'TID_SYS_AUG',
            'TID_SYS_SEP',
            'TID_SYS_OCT',
            'TID_SYS_NOV',
            'TID_SYS_DEC',
        ];
        return i18n.t(I18nMonthsKey[month]);
    }

    static toYYYYMMDDString (date){
        if(date instanceof Date){
            return  ""+date.getFullYear() + (date.getMonth() + 1) + (date.getDate() < 10 ? '0'+ date.getDate() :  date.getDate());
        }else{
            return "";
        }
    }

}
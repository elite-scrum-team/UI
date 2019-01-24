import moment from 'moment';

export const SEVEN_DAYS = 0;
export const THIRTY_DAYS = 1;
export const CUR_YEAR = 2;

export const timeData =
[
    {value: SEVEN_DAYS, label: 'Siste 7 dager'},
    {value: THIRTY_DAYS, label: 'Siste 30 dager'},
    {value: CUR_YEAR, label: 'Dette året'},
];

export const getDateData = (value) => {
    let startDate = null;
    let dateFormat = '%Y-%m-%d';
    let momentFormat = 'YYYY-MM-DD';
    let allDates = {};

    // Dates
    const sevenDaysAgo = moment().subtract(7, 'days').format(momentFormat);
    const thirtyDaysAgo = moment().subtract(30, 'days').format(momentFormat);
    const oneYearAgo = moment().subtract(12, 'months').format(momentFormat);

    let numberOfColumns = 7;
    let attr = 'days';

    if(value === SEVEN_DAYS) {
        startDate = sevenDaysAgo;
    }
    else if (value === THIRTY_DAYS) {
        numberOfColumns = 30;
        startDate = thirtyDaysAgo;
    }
    else if(value === CUR_YEAR) {
        numberOfColumns = 12;
        attr = 'months';
        startDate = oneYearAgo;
        dateFormat = '%Y-%m';
        momentFormat = 'YYYY-MM';
    }
    else {
        startDate = moment();
    }

    // Initialize object with all wanted dates
    const tempDate = moment(startDate);
    for(let i = 0; i < numberOfColumns; i++) {
        const curDate = tempDate.add(1, attr);
        allDates[curDate.format(momentFormat)] = 0;
    }

    return {
        startDate,
        dateFormat,
        allDates,
        sevenDaysAgo,
        thirtyDaysAgo,
        oneYearAgo,
    }
}
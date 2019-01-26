import moment from 'moment';

export const ALL = 'ALL_MUNICIPALITIES';

export const SEVEN_DAYS = 0;
export const THIRTY_DAYS = 1;
export const CUR_YEAR = 2;

export const timeData =
[
    {value: SEVEN_DAYS, label: 'Siste 7 dager'},
    {value: THIRTY_DAYS, label: 'Siste 30 dager'},
    {value: CUR_YEAR, label: 'Dette året'},
];

export const getDateData = (startDate, endDate) => {
    let dateFormat = '%Y-%m-%d';
    let momentFormat = 'YYYY-MM-DD';
    let allDates = {};
    startDate = moment(startDate);
    endDate = moment(endDate);

    const diffInDays = endDate.diff(startDate, 'days');

    // Dates
    const sevenDaysAgo = moment().subtract(7, 'days').format(momentFormat);
    const thirtyDaysAgo = moment().subtract(30, 'days').format(momentFormat);
    const oneYearAgo = moment().subtract(12, 'months').format(momentFormat);

    let numberOfColumns = diffInDays;
    console.log('DIFF IN DAYS: ', numberOfColumns);
    let attr = 'days';

    if(diffInDays >= 90) {
        numberOfColumns = 12;
        attr = 'months';
        dateFormat = '%Y-%m';
        //momentFormat = 'YYYY-MM';
    }

    // Initialize object with all wanted dates
    const tempDate = moment(startDate);
    allDates[tempDate.format(momentFormat)] = 0;
    for(let i = 0; i < numberOfColumns; i++) {
        const curDate = tempDate.add(1, attr);
        allDates[curDate.format(momentFormat)] = 0;
    }

    return {
        startDate: startDate.format(momentFormat),
        endDate: endDate.add(1, 'days').format(momentFormat),
        dateFormat,
        allDates,
        sevenDaysAgo,
        thirtyDaysAgo,
        oneYearAgo,
    }
}
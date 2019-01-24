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
    const endDate = moment().toISOString();
    let startDate = null;
    let dateFormat = '%Y/%M/%D';
    if(value === SEVEN_DAYS) {
        startDate = moment().subtract(7, 'days');
    } else if (value === THIRTY_DAYS) {
        startDate = moment().subtract(30, 'days');
    } else if(value === CUR_YEAR) {
        startDate = moment().subtract(12, 'months');
        dateFormat = '%Y/%M';
    } else {
        startDate = moment();
    }

    return {
        startDate: startDate.toISOString(),
        endDate,
        dateFormat,
    }
}
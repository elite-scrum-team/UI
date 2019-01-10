import {makeStyles} from '@material-ui/styles';

export const statusColorStyles = [
    {
        backgroundColor: 'var(--rejected)',
    },
    {
        backgroundColor: 'var(--inactive)',
    },
    {
        backgroundColor: 'var(--progress)',
    },
    {
        backgroundColor: 'var(--done)',
    }
];

export const statusBGColorStyles = [
    {
        border: '2px solid var(--rejected)',
    },
    {
        border: '2px solid var(--inactive)',
    },
    {
        border: '2px solid var(--progress)',
    },
    {
        border: '2px solid var(--done)',
    }
];

export const statusTextColorStyles = [
    {
        color: 'var(--rejected)',
    },
    {
        color: 'var(--inactive)',
    },
    {
        color: 'var(--progress)',
    },
    {
        color: 'var(--done)',
    }
];

export default {
    statusNames: ['Avslått', 'Inaktiv', 'Pågående', 'Ferdig'],

    getStatusClasses: (statusCode) => makeStyles({
        color: statusColorStyles[statusCode],
        border: statusBGColorStyles[statusCode],
        textColor: statusTextColorStyles[statusCode],
    }),
}
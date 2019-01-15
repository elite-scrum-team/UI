import {makeStyles} from '@material-ui/styles';

export const statusColorStyles = [
    {
        backgroundColor: 'var(--inactive)',
    },
    {
        backgroundColor: 'var(--inactive)',
    },
    {
        backgroundColor: 'var(--progress)',
    },
    {
        backgroundColor: 'var(--done)',
    },
    {
        backgroundColor: 'var(--rejected)',
    },
];

export const statusBGColorStyles = [
    {
        border: '2px solid var(--inactive)',
    },
    {
        border: '2px solid var(--inactive)',
    },
    {
        border: '2px solid var(--progress)',
    },
    {
        border: '2px solid var(--done)',
    },
    {
        border: '2px solid var(--rejected)',
    },
];

export const statusTextColorStyles = [
    {
        color: 'var(--inactive)',
    },
    {
        color: 'var(--inactive)',
    },
    {
        color: 'var(--progress)',
    },
    {
        color: 'var(--done)',
    },
    {
        color: 'var(--rejected)',
    },
];

export default {
    statusNames: ['Ikke behandlet', 'Behandlet', 'Pågående', 'Ferdig', 'Avslått'],

    //MÅ STÅ I RIKTIG REKKEFØLGE
    statusLabels: ['Anerkjent', 'Arbeid påbegynt','Ferdig','Avslått'],

    getStatusClasses: (statusCode) => makeStyles({
        color: statusColorStyles[statusCode],
        border: statusBGColorStyles[statusCode],
        textColor: statusTextColorStyles[statusCode],
    }),
}
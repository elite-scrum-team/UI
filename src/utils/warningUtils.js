import {makeStyles} from '@material-ui/styles';

export const statusColorStyles = [
    {
        backgroundColor: 'var(--inactive)',
    },
    {
        backgroundColor: 'var(--acknowledged)',
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
        border: '2px solid var(--acknowledged)',
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
        color: 'var(--acknowledged)',
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

    //Brukt i dialog for statusendring
    statusLabelsWithNumbers: [  {number: 1, label: 'Anerkjent'},
                                {number: 2, label: 'Arbeid påbegynt'},
                                {number: 3, label: 'Ferdig'},
                                {number: 4, label: 'Avslått'}],


    getStatusClasses: (statusCode) => makeStyles({
        color: statusColorStyles[statusCode],
        border: statusBGColorStyles[statusCode],
        textColor: statusTextColorStyles[statusCode],
    }),

    getAllStatusClasses: [
        makeStyles({
            color: statusColorStyles[0],
            border: statusBGColorStyles[0],
            textColor: statusTextColorStyles[0],
        }),
        makeStyles({
            color: statusColorStyles[1],
            border: statusBGColorStyles[1],
            textColor: statusTextColorStyles[1],
        }),
        makeStyles({
            color: statusColorStyles[2],
            border: statusBGColorStyles[2],
            textColor: statusTextColorStyles[2],
        }),
        makeStyles({
            color: statusColorStyles[3],
            border: statusBGColorStyles[3],
            textColor: statusTextColorStyles[3],
        }),
        makeStyles({
            color: statusColorStyles[4],
            border: statusBGColorStyles[4],
            textColor: statusTextColorStyles[4],
        }),
    ]
}
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

// Material UI components
import Typography from '@material-ui/core/Typography';

// Icons
import ProblemIcon from '../../../assets/img/Problem.png';
import SolutionIcon from '../../../assets/img/Solution.png';
import SolvedIcon from '../../../assets/img/Solved.png';

// Project components
import TutorialItem from './TutorialItem';

const styles = {
    root: {
        display: 'block',
        margin: 'auto',
        maxWidth: 600,
        padding: 12,
        marginTop: 48,
    },
}

class Tutorial extends Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <div className='mb-30'>
                    <Typography variant='h4' align='center'>Hvordan fungerer det?</Typography>
                </div>
                <TutorialItem
                    image={ProblemIcon}
                    title='Oppdag et kommunalt problem'
                    description='Dette kan for eksempel være hull i veien, dårlig vann i springen, stjålet sykkel osv...'
                />
                <TutorialItem
                    reverse
                    image={SolutionIcon}
                    title='Varsle din kommune med HverdagsHelt'
                    description='Finner du et problem bør kommunen din vite om det. Send inn en varsel til HverdagsHelt, og din kommune får vite om problemet.'
                />
                <TutorialItem
                    image={SolvedIcon}
                    title='Se på at kommunen løser problemet'
                    description='Med en gang kommunen observerer problemet vil de løse problemet så kjapt som mulig.'
                />
            </div>
        )
    }
}

export default withStyles(styles)(Tutorial);
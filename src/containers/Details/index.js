import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import URLS from '../../URLS';

// Material UI components
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

// Service import
import WarningService from '../../api/services/WarningService';
import ContractService from '../../api/services/ContractService';

// Icons

// Project components
import Navigation from '../../components/navigation/Navigation';
import WarningDetails from '../../components/layout/WarningDetails';
import ImageGrid from '../../components/layout/ImageGrid';
import ActionModule from '../../components/layout/ActionModule';
import FeedModule from '../../components/layout/FeedModule';


const styles = {
  root: {
    maxWidth: 1100,
    margin: 'auto',
    paddingTop: 16,
    paddingBottom: 100
  },
  content: {
    display: 'grid',

    gridTemplateColumns: '1fr 3fr',
    gridGap: '14px',

    marginTop: 14,

    '@media only screen and (max-width: 1000px)': {
      padding: '0 4px'
    },
    '@media only screen and (max-width: 800px)': {
      gridTemplateColumns: '1fr'
    }
  },
  actionMod: {
    padding: 0,
    display: 'inline',
    height: 'auto'
  }
};

class Details extends Component {
  state = {
    isLoading: false,
    contracts: null,
    company: null,

    id: null,
    title: null,
    posted: null,
    status: 1,
    statusMessage: null,
    description: null,
    location: {
      lat: 0,
      lng: 0
    },
    municipality: null,
    images: null,
    userId: null,

    items: []
  };

  getWarningId = () => this.props.match.params.id;

  componentDidMount() {
    // Get id
    const id = this.getWarningId();
    console.log(this.getWarningId());

    this.setState({ id: id, isLoading: true });

    // Get warning
    WarningService.getWarning(id, async (isError, e) => {
      if (isError === false) {
        await this.setState({
          title: e.category.name,
          posted: e.createdAt,
          status: e.status ? e.status.type : 0,
          statusMessage: e.status ? e.status.description : '',
          description: e.description,
          location: e.location,
          images: e.images,
          municipality: e.municipality,
          userId: e.userId,
          municipalityId: e.municipalityId,
          contracts: e.contracts,
          city: e.city,
          street: e.street,
        });
        this.setState({ isLoading: false });

        // Get warning content (comments, statuses, contracts)
        await WarningService.getWarningItems(id).then(data => {
          this.setState({ items: data });
        });
      } else {
        // The warning does not exist, go to frontpage
        this.props.history.push(URLS.home);
      }
    });
  }

  changeStatus = newStatus => {
    console.log(this.state);
    const status = newStatus.status;

    WarningService.createStatus(
      this.getWarningId(),
      status,
      newStatus.statusMsg
    ).then(data => {
      this.addItem({
        type: 'statuses',
        data
      });
      WarningService.getWarningItems(this.getWarningId()).then(data => {
        this.setState({ items: data, status: status });
      });
    });
  };

  changeContract = newContract => {
    const warningId = this.getWarningId();
    ContractService.createContract(
      warningId,
      newContract.companyId,
      newContract.description
    ).then(data => {
      WarningService.getWarningItems(this.getWarningId()).then(data => {
        this.setState({ items: data });
      });
    });
  };

  addItem = item => {
    WarningService.addWarningItem(this.getWarningId(), item.type, item.data);
    const items = Object.assign([], this.state.items);
    items.push(item);
    this.setState({ items });
  };

  onCommentCreated = () => {
    WarningService.getWarningItems(this.getWarningId()).then(data => {
      this.setState({ items: data });
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Navigation isLoading={this.state.isLoading}>
        {this.state.isLoading ? null : (
          <div className={classes.root}>
            <Paper elevation={1}>
              <WarningDetails
                title={this.state.title}
                date={this.state.posted}
                status={this.state.status}
                statusMessage={this.state.statusMessage}
                description={this.state.description}
                location={this.state.location}
                municipality={this.state.municipality}
                city={this.state.city}
                street={this.state.street}
              />
              <Divider />
              <ImageGrid images={this.state.images} />
            </Paper>
            <div className={classes.content}>
              <div>
                <Paper elevation={1} className='p-20'>
                  <ActionModule
                    className={classes.actionMod}
                    updateStatus={this.changeStatus}
                    updateContract={this.changeContract}
                    contracts={this.state.contracts}
                    company={this.state.company}
                    userId={this.state.userId}
                    status={this.state.status}
                    municipalityId={this.state.municipalityId}
                  />
                </Paper>
              </div>
              <div>
                <FeedModule
                  id={this.state.id}
                  items={this.state.items}
                  onCommentCreated={this.onCommentCreated}
                />
              </div>
            </div>
          </div>
        )}
      </Navigation>
    );
  }
}

export default withStyles(styles)(Details);

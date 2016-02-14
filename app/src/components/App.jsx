import React from 'react';
import NavHeader from './NavHeader';
import Grid from 'react-flexbox-grid/lib/components/Grid';
import Row from 'react-flexbox-grid/lib/components/Row';
import Col from 'react-flexbox-grid/lib/components/Col';
import Snackbar from 'material-ui/lib/snackbar';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import ErrorMsg from './ErrorMsg';

require('./App.scss');

const App  = React.createClass ({

  getInitialState() {
    return {
      isDialogOpen: false
    };
  },
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors.length)
      this.setState({ isDialogOpen: true});
  },
  closeDialog() {
    this.setState({ isDialogOpen: false});
    this.props.clearErr();
  },

  render() {
    const {isSnackbarOpen, user, isAuthenticated, errors, closeSnackbar, message} = this.props;
    const {isDialogOpen} = this.state;
    return (
      <div>
        <NavHeader {...this.props}/>
        <Grid fluid>
        <Row>
          <Col xs={6}>
          <h1> Hello {isAuthenticated ? user.name : 'unathenticated user'}! </h1>
          </Col>
        </Row>
          <Row>
            <Col xs={12}>
            {this.props.children}
            </Col>
          </Row>
          </Grid>
          <Snackbar
          open={isSnackbarOpen}
          message={message}
          autoHideDuration={4000}
          onRequestClose={closeSnackbar}
        />
        <Dialog
        title="Error!"
          actions={
            <FlatButton
            label="Ok"
            secondary={true}
            onTouchTap={this.closeDialog} />
          }
          modal={false}
          open={this.state.isDialogOpen}
          onRequestClose={this.closeDialog}>
          <ErrorMsg errors = {errors}/>
        </Dialog>
      </div>
      );
  }
});

export default App;

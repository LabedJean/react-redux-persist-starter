import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom';
import Profile from '../components/Profile';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import RandomRequest from '../components/RandomRequest';
import Dojo from '../components/Dojo';

class AppRouter extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Profile} />
          <Route exact path="/random-request" component={RandomRequest} />
          <Route exact path="/dojos" component={Dojo} />
        </Switch>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({

})

const mapStateToProps = state => ({
  ...state
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppRouter));
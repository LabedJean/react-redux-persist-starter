import React, { Component } from 'react'
import {Switch, Route, withRouter} from 'react-router-dom';
import Profile from '../components/Profile';
import { connect } from 'react-redux';

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Profile}/>
      </Switch>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  
})

const mapStateToProps = state => ({
  ...state
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppRouter));
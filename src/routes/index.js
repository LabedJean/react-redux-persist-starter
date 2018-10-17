import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom';
import Profile from '../components/Profile';
import Admin from '../components/Admin';
import { connect } from 'react-redux';

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/profile" component={Profile}/>
        {
          // All routes under this verification are reserved for admin users
          this.props.authentification.user.userData.isAdmin &&
          <Route exact path='/admin' component={Admin}/>
        }
      </Switch>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  
})

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
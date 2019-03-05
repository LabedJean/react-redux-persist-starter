import React, { Component } from 'react'
import {authAction} from '../stores/actions/auth'
import { connect } from 'react-redux';


class Profile extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello Wilders !</h1>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  authAction: (userData) => dispatch(authAction(userData))
})

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

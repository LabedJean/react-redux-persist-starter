import React, { Component } from 'react'
import {authAction} from '../stores/actions/auth'
import { connect } from 'react-redux';


class Profile extends Component {
  render() {
    return (
      <div>
        <button
          onClick={() => this.props.authAction({userId: 1, isAdmin: true, username: 'Jh0n_D03', isConnected: true})}
        >Click ME to login as Admin</button>
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

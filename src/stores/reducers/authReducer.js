const defaultStates = {
  user: {
    userData: {
      user: '',
      isAdmin: false,
      id: 0,
      token: '',
      isConnected: false
    }
  }
}
export default (state = defaultStates, action) => {
  switch (action.type) {
    case 'AUTH_USER':
    return {
      user: action.payload
    }
    default:
      return state
  }
}
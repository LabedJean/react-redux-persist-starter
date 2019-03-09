import React, { Component } from 'react'
import Axios from 'axios';
import { dojoGroup, dojoUser } from '../utils/urls';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Spinner } from 'reactstrap';
import '../assets/dojo.scss'
const defaultGroup = { users: [] }

export default class Dojo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      groups: [],
      currentGroup: defaultGroup,
      groupName: '',
      userName: ''
    }
  }


  componentDidMount() {
    this.fetchGroups()
    document.addEventListener('click', this.fetchGroups);
  }

  fetchGroups(resetCurrent = true) {
    Axios.get(dojoGroup)
      .then((response) => {
        const currentGroup = resetCurrent ? defaultGroup : response.data.find((x) => x.id === this.state.currentGroup.id)
        const groupName = resetCurrent ? '' : this.state.currentGroup.name
        const userName = ''
        this.setState({ groups: response.data, currentGroup, groupName, userName })
      })
      .catch((err) => console.log(err))
  }

  groupAction() {
    if (this.state.currentGroup.id) {
      Axios.put(`${dojoGroup}/${this.state.currentGroup.id}`, { name: this.state.groupName })
        .then((response) => {
          console.log(response)
          this.fetchGroups()
        })
        .catch((err) => console.log(err))
    } else {
      Axios.post(`${dojoGroup}`, { name: this.state.groupName })
        .then((response) => {
          console.log(response)
          this.fetchGroups()
        })
        .catch((err) => console.log(err))
    }
  }
  addUser() {
    Axios.post(`${dojoGroup}/${this.state.currentGroup.id}/add_user`, { name: this.state.userName })
      .then((response) => {
        console.log(response)
        this.fetchGroups(false)
      })
      .catch((err) => console.log(err.response))
  }

  deleteUser(userId) {
    Axios.delete(`${dojoGroup}/${this.state.currentGroup.id}/delete_user`, { data: { dojo_user_id: userId } })
      .then((response) => {
        console.log(response)
        this.fetchGroups(false)
      })
      .catch((err) => console.log(err.response))
  }

  render() {
    console.log(this.state)
    return (
      <Container>
        <Row>
          <Col>
            <Row>
              <Button onClick={() => this.fetchGroups()} color="success">+</Button>
            </Row>
            <Row>
              <div className="group-container marged-top full-widh">
                <div className="form-group">
                  <label htmlFor="groupName">Nom du groupe</label>
                  <input
                    id="groupName"
                    name="groupName"
                    type="text"
                    value={this.state.groupName}
                    onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                  />
                  <Button size="sm" onClick={() => this.groupAction()} color="primary">Valider</Button>
                </div>
              </div>
            </Row>
            <hr />
            <Row>
              <div className="users-container marged-top full-widh">
                <div className="form-group">
                  <label htmlFor="userName">Nom d'utilisateur</label>
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    value={this.state.userName}
                    onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                  />
                  <Button onClick={() => this.addUser()} color="primary" >Valider</Button>
                </div>
                <div className="username-list-container marged-top">
                  {
                    this.state.currentGroup.users.map((user) => {
                      return <span key={`li-u-${user.id}`}>
                        {user.name}
                        <span>
                          <Button
                            size="sm"
                            onClick={() => this.deleteUser(user.id)}
                            color="warning"
                          >
                            X
                          </Button>
                        </span>
                      </span>
                    })
                  }
                </div>
              </div>
            </Row>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nom du groupe</th>
                  <th>Nombre de participant(s)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.groups.map((group, idx) => {
                    return (
                      <tr key={`dg-${group.id}`}>
                        <th scope="row">{idx + 1}</th>
                        <td>{group.name}</td>
                        <td>{group.users.length}</td>
                        <td>
                          <Button
                            onClick={() => this.setState({ currentGroup: group, groupName: group.name })}
                            size="sm"
                          >Sélectionner</Button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    )
  }
}

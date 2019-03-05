import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import { randomResult } from '../utils/urls'

const defaultResult = { fields: [{}] };

export class RandomRequest extends Component {
  constructor(props) {
    super(props)

    this.state = {
      requestResults: [],
      currentSelected: defaultResult,
      modal: false,
      fieldTitle: '',
      currentRandomField: '',
      showForm: false,
      requestTitle: '',
      requestDescription: ''
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  componentDidMount() {
    this.fetchResults()
  }

  fetchResults(setCurrent=false){
    Axios.get(`${randomResult}`)
      .then((res) => {
        console.log(res)
        const current = setCurrent ? res.data.find(x => x.id === this.state.currentSelected.id) : defaultResult
        this.setState({ requestResults: res.data, currentSelected: current, fieldTitle: '' })
      })
      .catch((err) => console.log(err))
  }

  linkField(){
    Axios.post(`${randomResult}/${this.state.currentSelected.id}/add_field`, {title: this.state.fieldTitle})
      .then((res) => {
        console.log(res)
        this.fetchResults(true)
      })
      .catch((err) => console.log(err))
  }

  deleteField(fieldId){
    Axios.delete(`${randomResult}/${this.state.currentSelected.id}/delete_field`, {data: {field_id: fieldId}})
      .then((res) => {
        console.log(res)
        this.fetchResults(true)
      })
      .catch((err) => console.log(err))
  }

  createResult(event){
    event.preventDefault()
    Axios.post(`${randomResult}`, {title: this.state.requestTitle, description: this.state.requestDescription})
      .then((res) => {
        console.log(res)
        this.fetchResults()
      })
      .catch((err) => console.log(err))
  }

  deleteResult(id){
    Axios.delete(`${randomResult}/${id}`)
      .then((res) => {
        console.log(res)
        this.fetchResults()
      })
      .catch((err) => console.log(err))
  }

  getRandomField(){
    const fields = this.state.currentSelected.fields
    const rand = fields[Math.floor(Math.random() * fields.length)];
    this.setState({currentRandomField: rand ? rand.title : ''})
  }

  render() {
    console.log(this.state)
    const buttonTitle = this.state.showForm ? 'Fermer' : 'Ajouter'
    return (
      <div>
        <Button color="primary" onClick={() => this.setState({showForm: !this.state.showForm})}>{buttonTitle}</Button>{' '}
        {
          this.state.showForm &&
          <div>
            <form
              onSubmit={(e) => this.createResult(e)}
            >
              <span>
                <label htmlFor="requestTitle">Titre</label>
                <input 
                  onChange={(e) => this.setState({[e.target.name]: e.target.value})} 
                  type="text" 
                  name="requestTitle" 
                  id="requestTitle" 
                  value={this.state.requestTitle}
                />
              </span>
              <span>
                <label htmlFor="requestDescription">Description</label>
                <input 
                  onChange={(e) => this.setState({[e.target.name]: e.target.value})} 
                  type="text" 
                  name="requestDescription" 
                  id="requestDescription" 
                  value={this.state.requestDescription}
                />
              </span>
              <input type="submit" value="Créer"/>
            </form>
          </div>
        }
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Titre</th>
              <th>Description</th>
              <th>Détails</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.requestResults.map((rr, idx) => {
                return (
                  <tr key={`rr-${rr.id}`}>
                    <th scope="row">{idx + 1}</th>
                    <td>{rr.title}</td>
                    <td>{rr.description}</td>
                    {/* <td>
                      <ul>
                        {
                          rr.fields.map((field) => {
                            return <li key={`field-${field.id}`}>{field.title}</li>
                          })
                        }
                      </ul>
                    </td> */}
                    <td
                      onClick={() => this.setState({ currentSelected: rr, modal: true })}
                    >Voir</td>
                    <td
                      onClick={() => this.deleteResult(rr.id)}
                    >Supprimer</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>{this.state.currentSelected.title}</ModalHeader>
            <ModalBody>
              <Container>
                <Row>
                  <Col>
                    <p>{this.state.currentSelected.description}</p>
                    <h3>{this.state.currentRandomField}</h3>
                  </Col>
                  <Col>
                    <div>
                      <span>
                        <input 
                          type="text"
                          name="fieldTitle"
                          value={this.state.fieldTitle}
                          onChange={(e) => this.setState({[e.target.name]: e.target.value})}
                        />
                        <Button 
                          color="primary" 
                          onClick={() => this.linkField()}
                        >
                          Add
                        </Button>
                      </span>
                    </div>
                    <ul>
                      {
                        this.state.currentSelected.fields.map((field) => {
                          return (
                            <li key={`li-f-${field.id}`}>
                              {field.title}
                              <span
                                onClick={() => this.deleteField(field.id)}
                              >X</span>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </Col>
                </Row>
              </Container>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.getRandomField()}>Get Random</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RandomRequest)

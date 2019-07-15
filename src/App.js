import React, { Component } from 'react';
import './App.css';

const User = (props) => (
  <ul>
    <li>Usuarios: {props.name}</li>
    <li>Email: {props.email}</li>
    <li>Image: {props.picture}</li>
    <img src={props.picture} width="100" height="100"></img>
  </ul>

)

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      users:[]
    }
  }
  componentWillMount(){
    fetch('https://randomuser.me/api/?results=500')
    .then(response => response.json())
    .then(users =>{
      users.results.forEach(user =>{
        let data = {
          name:user.name.first,
          email:user.email,
          password:user.login.password,
          picture:user.picture.large
        }
        console.log('aqui van los datos de los usuarios del rest api ' + data)
        this.setState({users:this.state.users.concat([data])})
      })
    })
  }

  render(){
    console.log(this.state.users.length)

    if(this.state.users.length > 0){
      return(
        <div>
          {this.state.users.map(user => <User key={user.password} name={user.name} email={user.email} picture={user.picture} />)}
        </div>
      )
    }
    return(
      <p>Cargando Usuarios...</p>
    )
  }
}

export default App;

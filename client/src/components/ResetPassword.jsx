import React, { Component } from 'react';
import axios from 'axios';

export default class ResetPassword extends Component {
  constructor(){
    super();

    this.state = {
      username:'',
      password:'',
      confirmPassword:'',
      update: false,
      isLoading: true,
      error: false
    }
  }

  async componentDidMount() {
    console.log(this.props.match.params.token);

  //   await axios
  //     .get('/resetpassword', {
  //       params: {
  //         resetPasswordToken: this.props.match.params.token
  //       }
  //     })
  //     .then(response => {
  //       console.log(response);
  //       if (response.data.message === 'password verified'){
  //         this.setState({
  //           username: response.data.username,
  //           update: false,
  //           isLoading: false,
  //           error: false,
  //         })
  //       } else {
  //         this.setState({
  //           update: false,
  //           isLoading: false,
  //           error: true
  //         })
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error.data)
  //     })
  // }

  // handleChange = name => event => {
  //   this.setState({
  //     [name]: event.target.value
  //   })
  // }

  // updatePassword = e => {
  //   e.preventDefault();
  //   axios
  //     .put('/updatePasswordViaEmail', {
  //       username: this.state.username,
  //       password: this.state.password,
  //     })
  //     .then(response => {
  //       console.log(response.data)
  //       if (response.data.message === 'password updated'){
  //         this.setState({
  //           updated: true,
  //           error: false,
  //         })
  //       }else {
  //         this.setState({
  //           updated: false,
  //           error: true
  //         })
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error.data)
  //     })
  }

  render(){
    const { password, error, isLoading, updated } = this.state;
    return (
      <h1>
        Password Reset
      </h1>
    )
  }
}
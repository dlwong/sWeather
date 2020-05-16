import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled.div`
  font-family: 'Montserrat';
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

class Password extends Component {
  constructor(){
    super();
    this.state = {
                  email:''
                  }
  }

  handleChange = (evt) => {
    this.setState({email: evt.target.value})
  }

  handleForgotPassword(evt) {
    evt.preventDefault();

    if (this.state.email !== '') {
      axios.post('/forgotPassword',{
        email: this.state.email,
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.data)
      })
    }
  }

  render() {
    return (
      <Wrapper>
        <div className="l-text-centered">
          <h2>Reset password</h2>
          <p>Please enter your email address to request a password reset</p>
        </div>
        <form data-test-ref="form">
          <div className="m-field">
            <label className="m-field--label">Email Address</label>&nbsp;
            <input type="email" onChange={this.handleChange} />
          </div><br/>
          <button className="m-button bg-azuren" onClick={(evt) => this.handleForgotPassword(evt)}>
            <span className="l-nowrap">Reset Password</span>
          </button>
        </form>
      </Wrapper>
    )
  }
}

export default Password;
import React, { Component } from 'react';
import styled from 'styled-components';
import history from './history';
import axios from 'axios';

const Form = styled.form`
  font-family: 'Montserrat';
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Label = styled.label`
  font-family: 'Montserrat';
`;

const Input = styled.input`
  font-family: 'Montserrat';
`;

const Wrapper = styled.div`
  padding: 4em;
  text-align: center;
`;

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleRecommendation = this.handleRecommendation.bind(this);
  }

  handleChange(e){
    console.log(e.target.name)
    this.setState(
        {[e.target.name]: e.target.value}
    )
  }

  handlePassword(e) {
    e.preventDefault();
    history.push('/password');
  }

  handleRecommendation(e) {
    e.preventDefault();
    const { username, password } = this.state;
    axios.post('/login', {
      username,
      password
    })
      .then(response => {
        if (response.data === 'success') {
          history.push('/recommendation');
        } else {
          console.log('Sign-up error');
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() { 
    return (
      <Wrapper>
        <Form>
          <div>
            <Label>Username:</Label>
            <input type="text" name="username" placeholder="Username" onChange={e => this.handleChange(e)} />
          </div><br />
          <div>
            <Label>Password:</Label>
            <input type="password" name="password" placeholder="Password" onChange={e => this.handleChange(e)}/>
          </div><br />
          <div>
            <Input type="submit" value="LOGIN"  onClick={(e)=> this.handleRecommendation(e)}/><br/><br/>
            <Input type="submit" value="FORGOT PASSWORD" onClick={this.handlePassword} />
          </div>
        </Form>
      </Wrapper>
    )
  }
}

export default Login;

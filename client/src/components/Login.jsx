import React, { Component } from 'react';
import styled from 'styled-components';
import history from './history';

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

  handlePassword(e) {
    e.preventDefault();
    console.log('something')
    history.push('/password')
    //this.props.history.push('');
  }

  render() { 
    return (
      <Wrapper>
        <Form>
          <div>
            <Label>Username:</Label>
            <input type="text" name="username" placeholder="Username" />
          </div><br />
          <div>
            <Label>Password:</Label>
            <input type="password" name="password" placeholder="Password" />
          </div><br />
          <div>
            <Input type="submit" value="LOGIN" /><br/><br/>
            <Input type="submit" value="FORGOT PASSWORD" onClick={this.handlePassword} />
          </div>
        </Form>
      </Wrapper>
    )
  }
}

export default Login;

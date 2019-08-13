import React, { Component }  from 'react';
import styled from 'styled-components';
import history from './history';
import axios from 'axios';

const Wrapper = styled.div`
  padding: 4em;
  text-align: center;
`;

const Form = styled.form`
  font-family: 'Montserrat';
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

class Signup extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleRecommendation = this.handleRecommendation.bind(this);
  }

  handleChange(e) {
    this.setState(
        {[e.target.name]: e.target.value}
    )
  }

  handleRecommendation(e) {
    e.preventDefault();
    const { username, password } = this.state;
    axios.post('/register', {
      username,
      password
    })
      .then(response => {
        if (response.data === 'success') {
          history.push('/recommendation');
        } else {
          this.setState({error: true})
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
            <label>Username:</label>
            <input type="text" name="username" placeholder="username" onChange={e => this.handleChange(e)} /><br />
            <br/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" placeholder="password" onChange={e => this.handleChange(e)} />
          </div><br />
          <div>
            <label>Do You Get Cold Easily?</label><br />
            <input type="radio" name="cold" value="Yes" /><span>Yes</span>
            <input type="radio" name="cold" value="No" /><span>No</span>
          </div><br />
          <div>
            <label>Do You Get Hot Easily?</label><br />
            <input type="radio" name="hot" value="Yes" /><span>Yes</span>
            <input type="radio" name="hot" value="No" /><span>No</span>
          </div><br />
          <div>
            <label>What Jackets Do You Own?</label><br />
            <input type="checkbox" name="jackets" /><span>Hoodie</span><br />
            <input type="checkbox" name="jackets" /><span>Puffer</span><br />
            <input type="checkbox" name="jackets" /><span>Raincoat/Trenchcoat</span><br />
            <input type="checkbox" name="jackets" /><span>Windbreaker</span><br />
          </div><br />
          <div>
            <label>Zip Code</label><br />
            <input type="text" name="zipcode" /><br />
          </div><br />
          <div>
            <input type="submit" value="CREATE AN ACCOUNT" onClick={(e)=> this.handleRecommendation(e)} />
          </div><br />
        </Form>
      </Wrapper>
    )
  }
}

export default Signup;
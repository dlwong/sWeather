import React from 'react';
import styled from 'styled-components';
import history from './history';

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

const Signup = () => {

  const handleRecommendation = (e) => {
    e.preventDefault();
    history.push('/recommendation');
  }
    
  return (
    <Wrapper>
      <Form>
        <div>
          <label>Username:</label>
          <input type="text" name="username" placeholder="username" /><br />
          <br/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" placeholder="password" />
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
          <input type="submit" value="CREATE AN ACCOUNT" onClick={handleRecommendation} />
        </div><br />
      </Form>
    </Wrapper>
  )
}

export default Signup;
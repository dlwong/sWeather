import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: 'Montserrat';
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function Password() {
  return (
        <Wrapper>
          <div className="l-text-centered">
            <h2>Reset password</h2>
            <p>Please enter your email address to request a password reset</p>
          </div>
          <form data-test-ref="form">
            <div className="m-field">
              <label className="m-field--label">Email Address</label>&nbsp;
              <input type="email" name="recoverPassword.email" value="" />
            </div><br/>
            <button className="m-button bg-azuren" type="submit" tabindex="0">
              <span className="l-nowrap">Reset Password</span>
            </button>
          </form>
        </Wrapper>
  )
}
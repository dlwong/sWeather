import react from 'react';

export default function Password() {
  return (
        <div data-test-ref="form-div">
          <div className="l-text-centered">
            <h2>Reset password</h2>
            <p>Please enter your email address to request a password reset</p>
          </div>
          <form data-test-ref="form">
            <div className="m-field">
              <label className="m-field--label">Email Address</label>
              <input type="email" name="recoverPassword.email" value="" />
            </div>
            <button className="m-button bg-azuren" type="submit" tabindex="0">
              <span className="l-nowrap">Reset Password</span>
            </button>
          </form>
        </div>
  )
}
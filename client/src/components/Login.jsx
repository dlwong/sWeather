import React from 'react';

const Login = () => (
    <form>
      <div>
        <label>Username:</label>
        <input type="text" name="username" placeholder="Username" />
      </div><br />
      <div>
        <label>Password:</label>
        <input type="password" name="password" placeholder="Password" />
      </div><br />
      <div>
        <input type="submit" value="LOGIN" /><br/><br/>
        <input type="submit" value="FORGOT PASSWORD" />
      </div>
    </form>
)

export default Login;
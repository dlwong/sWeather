import React from 'react';

const Signup = () => (
    <form>
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
        <input type="submit" value="CREATE AN ACCOUNT" />
      </div><br />
    </form>
)

export default Signup;
import React, { Component } from 'react';
import axios from 'axios';

class ResetPassword extends Component {
  constructor(props){
    super(props);

    this.state = {
      username:'',
      password:'',
      confirmPassword:'',
      update: false,
      isLoading: true,
      error: false
    }
  }

  componentDidMount() {
    // console.log(this.props.match.params.token);

    axios
      .get('/resetpassword', {
            params: {
          resetPasswordToken: this.props.match.params.token
          }
      })
      .then(response => {
        if (response.data.message === 'password link is fine'){
          console.log(response.data.username);
          this.setState({
            username: response.data.username,
            // update: false,
            // isLoading: false,
            error: false,
          })
        } else {
          this.setState({
            // update: false,
            // isLoading: false,
            error: true
          })
        }
      })
      .catch(error => {
        console.log(error.data)
      })
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleUpdatePassword = evt => {
    evt.preventDefault();
    axios
      .put('/updatePassword', {
        username: this.state.username,
        password: this.state.password,
      })
      .then(response => {
        console.log(response.data)
        if (response.data.message === 'Successfully saved new password'){
          this.setState({
            updated: true,
            error: false,
          })
        }else {
          this.setState({
            updated: false,
            error: true
          })
        }
      })
      .catch(error => {
        console.log(error.data)
      })
  }

  render(){
    // console.log(this.props.match.params.token);
    // const { error } = this.state;
    return (
      <div>
        {/* {error &&
        <div>Problem resetting, please submit a new reset link</div>
        } */}
        <div>
          <label>New Password:</label>
          <input type="password" name="password" placeholder="new password" onChange={evt => this.handleChange(evt)} />
        </div><br />
        <div>
          <input type="submit" value="SUBMIT" onClick={evt => this.handleUpdatePassword(evt)}/>
        </div>
      </div>
    )
  }
}

export default ResetPassword;
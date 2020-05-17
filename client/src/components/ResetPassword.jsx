import React, { Component } from 'react';
import axios from 'axios';

class ResetPassword extends Component {
  constructor(props){
    super(props);

    this.state = {
      username:'',
      password:'',
      updated: false,
      error: false,
      canUpdate: false
    }
  }

  componentDidMount() {
    axios
      .get('/resetpassword', {
            params: {
          resetPasswordToken: this.props.match.params.token
          }
      })
      .then(response => {
        if (response.data.message === 'password link is fine'){
          this.setState({
            username: response.data.username,
            canUpdate: true,
            error: false,
          })
        } else {
          this.setState({
            canUpdate: false,
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
        if (response.data === "success"){
          this.setState({
            canUpdate: false,
            updated: true,
            error: false,
          })
        }else {
          this.setState({
            canUpdate: false,
            updated: false,
            error: true
          })
          console.log('or is the problem here')
        }
      })
      .catch(error => {
        console.log("error updating in db", error.data)
      })
  }

  render(){
    const { error, canUpdate, updated } = this.state;

    return (
      <div>
        {error &&
        <div>Problem resetting, please submit a new reset form</div>
        }
        {canUpdate && 
        <form>
            <div>
            <label>New Password:</label>
            <input type="password" name="password" placeholder="new password" onChange={evt => this.handleChange(evt)} />
          </div><br />
          <div>
            <input type="submit" value="SUBMIT" onClick={evt => this.handleUpdatePassword(evt)}/>
          </div>
        </form>
        }
        {updated &&
          <div>SUCCESSFULY UPDATED</div>
        }
      </div>
    )
  }
}

export default ResetPassword;
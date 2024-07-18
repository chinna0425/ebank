import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {userId: '', password: '', errorMsg: ''}

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitLoginPage = async event => {
    event.preventDefault()
    const {userId, password} = this.state
    const userDetails = {user_id: userId, pin: password}
    const converted = JSON.stringify(userDetails)
    const options = {
      method: 'POST',
      body: converted,
    }
    const req = await fetch('https://apis.ccbp.in/ebank/login', options)
    const res = await req.json()
    console.log(res)
    if (req.ok) {
      Cookies.set('jwt_token', res.jwtToken, {expires: 30})
      const {history} = this.props
      this.setState({userId: '', password: ''})
      history.replace('/')
    } else {
      this.setState({errorMsg: res.error_msg})
    }
  }

  render() {
    const {userId, password, errorMsg} = this.state
    const jwt = Cookies.get('jwt_token')
    if (jwt !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <div className="login-sub-container">
          <div className="login-left-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-page-left-image"
            />
          </div>
          <div className="login-right-container">
            <form
              className="login-submit-form"
              onSubmit={this.onSubmitLoginPage}
            >
              <h1 className="login-right-title-heading">Welcome Back!</h1>
              <div>
                <label htmlFor="userid" className="login-input-label">
                  User ID
                </label>
                <br />
                <input
                  id="userid"
                  type="text"
                  placeholder="Enter User Id"
                  className="login-input-field"
                  value={userId}
                  onChange={this.onChangeUserId}
                />
              </div>
              <div>
                <label htmlFor="pin" className="login-input-label">
                  PIN
                </label>
                <br />
                <input
                  id="pin"
                  type="password"
                  placeholder="Enter PIN"
                  className="login-input-field"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <button type="submit" className="login-button-style">
                Login
              </button>
            </form>
            {errorMsg.length > 0 && (
              <p className="login-error-text">{errorMsg}</p>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default LoginPage

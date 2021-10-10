import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './Login.css'

class Login extends Component {
  state = {userName: '', userpassword: '', isSuccess: false, err: ''}

  ChangeInput = event => {
    this.setState({userName: event.target.value})
  }

  ChangePasswoard = event => {
    this.setState({userpassword: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = err => {
    this.setState({isSuccess: true, err})
  }

  submitFrom = async event => {
    try {
      event.preventDefault()
      const {userName, userpassword} = this.state
      const userDetails = {username: userName, password: userpassword}
      const url = 'https://apis.ccbp.in/login'
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok === true) {
        this.onSubmitSuccess(data.jwt_token)
      } else {
        this.onSubmitFailure(data.error_msg)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {userName, userpassword, isSuccess, err} = this.state

    return (
      <form onSubmit={this.submitFrom}>
        <div className="login-container">
          <div className="login-container-fluid">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="login-img"
              alt="website logo"
            />
            <div className="login-flex">
              <div className="input1">
                <label className="label" htmlFor="username">
                  UserName
                </label>
                <input
                  value={userName}
                  onChange={this.ChangeInput}
                  placeholder="Username"
                  type="text"
                  className="input-text"
                  id="username"
                />
              </div>
              <div className="input2">
                <label className="label" htmlFor="password">
                  PASSWORD
                </label>
                <input
                  value={userpassword}
                  onChange={this.ChangePasswoard}
                  placeholder="Password"
                  type="password"
                  id="password"
                  className="input-text"
                />
              </div>
              <button className="login-btn" type="submit">
                Login
              </button>
              {isSuccess ? <p className="err">*{err}</p> : ''}
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default Login

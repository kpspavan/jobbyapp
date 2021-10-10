import {Component} from 'react'
import './User.css'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserInfo extends Component {
  state = {
    Profile: {},
    apistatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.UserProfile()
  }

  getProfiles = eachProfile => ({
    name: eachProfile.name,
    profileImageUrl: eachProfile.profile_image_url,
    shortBio: eachProfile.short_bio,
  })

  UserProfile = async () => {
    this.setState({apistatus: apiStatusConstants.inProgress})
    const url1 = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options1 = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url1, options1)
    if (response.ok === true) {
      const data = await response.json()

      const Profiles = this.getProfiles(data.profile_details)

      this.setState({
        Profile: Profiles,
        apistatus: apiStatusConstants.success,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loading-view" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllUserview = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case apiStatusConstants.success:
        return this.renderUserListview()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  renderFailureView = () => (
    <div className="center-loading">
      <button className="btn-failure" type="button">
        Retry
      </button>
    </div>
  )

  renderUserListview = () => {
    const {Profile} = this.state
    const {name, profileImageUrl, shortBio} = Profile
    return (
      <div className="jobs-container">
        <img src={profileImageUrl} className="profile-img" alt="profile" />
        <h1 className="profile-header">{name}</h1>
        <p className="profile-para">{shortBio}</p>
      </div>
    )
  }

  render() {
    return <div>{this.renderAllUserview()}</div>
  }
}

export default UserInfo

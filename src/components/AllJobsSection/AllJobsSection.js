import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {ImSearch} from 'react-icons/im'
import FilterGroup from '../FilterGroup/FilterGroup'
import UserInfo from '../User/User'

import Jobs from '../Jobs/Jobs'
import Header from '../Header/Header'

import './AllJobsSection.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Alljobs extends Component {
  state = {
    JobsData: [],
    isLoading: true,
    employmentType: employmentTypesList[0].employmentTypeId,
    salaryType: salaryRangesList[0].salaryRangeId,
    apistatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apistatus: apiStatusConstants.inProgress})
    const {employmentType, salaryType, searchInput} = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryType}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const UpdatedData = data.jobs.map(eachJob => ({
        title: eachJob.title,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        packagePerAnnum: eachJob.package_per_annum,
      }))
      this.setState({
        JobsData: UpdatedData,
        isLoading: false,
        searchInput: '',
        apistatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apistatus: apiStatusConstants.failure,
      })
    }
  }

  enterSearchInput = () => {
    this.getJobDetails()
    if (this.getJobDetails === undefined) {
      console.log('saas')
    }
  }

  changeemploymentTypesList = employmentType => {
    this.setState({employmentType}, this.getJobDetails)
  }

  changeSalarayList = salaryType => {
    this.setState({salaryType}, this.getJobDetails)
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  renderJobListview = () => {
    const {JobsData, isLoading} = this.state

    const onEnterSearchInput = event => {
      if (event.key === 'Enter') {
        this.enterSearchInput()
      }
    }

    const onChangeSearchInput = event => {
      this.changeSearchInput(event.target.value)
    }
    return (
      <>
        <div className="background">
          <Header />
          <div className="search-input-container">
            <button type="button">
              <input
                onChange={onChangeSearchInput}
                onKeyDown={onEnterSearchInput}
                placeholder="search"
                className="search-input"
                type="search"
              />
              <ImSearch className="search-icon" />
            </button>
          </div>
        </div>

        <div className="bg">
          <div className="column">
            <UserInfo />
            <ul>
              <FilterGroup
                changeemploymentTypesList={this.changeemploymentTypesList}
                key={employmentTypesList[0].employmentTypeId}
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                changeSalarayList={this.changeSalarayList}
              />
            </ul>
          </div>

          <div className="loading">
            {isLoading ? (
              <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
            ) : (
              <ul className="ul">
                {JobsData.map(JobsData1 => (
                  <Jobs key={JobsData1.id} JobsData1={JobsData1} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </>
    )
  }

  renderAllProductsview = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case apiStatusConstants.success:
        return this.renderJobListview()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  renderLoadingView = () => (
    <div className="loading-view">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failute-container">
      <div>
        <img
          className="failure-img"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt=" failure view"
        />
        <div className="center">
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>

          <button className="failute-btn" type="button">
            Retry
          </button>
        </div>
      </div>
    </div>
  )

  render() {
    return <div>{this.renderAllProductsview()}</div>
  }
}

export default Alljobs

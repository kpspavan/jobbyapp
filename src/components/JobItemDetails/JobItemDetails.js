import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {HiLocationMarker} from 'react-icons/hi'
import {GiShoppingBag} from 'react-icons/gi'
import {FcRating} from 'react-icons/fc'
import Header from '../Header/Header'
import Skills from '../Skills/Skills'
import SimilarJobsItems from '../SimilarJobs/SimilarJobs'

import './JobItemDetails.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apistatus: apiStatusConstants.initial,
    getJobDetails: {},
    skillsarray: [],
    lifeAtCompany: {},
    similarjobs: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getJobDetailsList()
  }

  getCompanyDetails = CompanyDetails => ({
    description: CompanyDetails.description,
    imageUrl: CompanyDetails.image_url,
  })

  getFormatedData = eachDetail => ({
    companyLogoUrl: eachDetail.company_logo_url,
    companyWebsiteUrl: eachDetail.company_website_url,
    employmentType: eachDetail.employment_type,
    id: eachDetail.id,
    jobDescription: eachDetail.job_description,
    location: eachDetail.location,
    packagePerAnnum: eachDetail.package_per_annum,
    rating: eachDetail.rating,
    title: eachDetail.title,
  })

  getJobDetailsList = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apistatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/jobs/${id}`
    const JwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const UpdatedJobs = this.getFormatedData(data.job_details)
      console.log(UpdatedJobs)
      const lifeAtCompanyDetails = this.getCompanyDetails(
        data.job_details.life_at_company,
      )
      const Skills1 = data.job_details.skills.map(eachDetail => ({
        imageUrl: eachDetail.image_url,
        name: eachDetail.name,
      }))

      const SimilarDetails = data.similar_jobs.map(eachSimilar => ({
        companyLogoUrl: eachSimilar.company_logo_url,
        employmentType: eachSimilar.employment_type,
        id: eachSimilar.id,
        jobDescription: eachSimilar.job_description,
        location: eachSimilar.location,
        rating: eachSimilar.rating,
        title: eachSimilar.title,
      }))

      console.log(Skills1)
      this.setState({
        apistatus: apiStatusConstants.success,
        getJobDetails: UpdatedJobs,
        similarjobs: SimilarDetails,
        lifeAtCompany: lifeAtCompanyDetails,
        skillsarray: Skills1,
        isLoading: false,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loading-view" testid="loader">
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
          <h1>Opps SomeThing Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>

          <button className="failute-btn" type="button">
            Retry
          </button>
        </div>
      </div>
    </div>
  )

  renderJobDetails = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case apiStatusConstants.success:
        return this.renderDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderDetailsView = () => {
    const {getJobDetails, lifeAtCompany, skillsarray, similarjobs} = this.state
    console.log(skillsarray)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      location,
      packagePerAnnum,
      rating,
      employmentType,
      title,
      jobDescription,
      id,
    } = getJobDetails

    const {description, imageUrl} = lifeAtCompany
    return (
      <div>
        <div className="header-job">
          <Header />
        </div>

        <div className="bg-color-job">
          <div className="job-header">
            <div className="main-container">
              <img
                src={companyLogoUrl}
                className="netflix"
                alt="job details company logo"
              />
              <div className="ml">
                <p>{employmentType}</p>
                <p className="jobs-para">{title}</p>
                <div className="jobs-rating">
                  <FcRating className="ml" />
                  <p>{rating}</p>
                </div>
              </div>
            </div>
            <div className="end">
              <div className="flex-1">
                <div className="location">
                  <HiLocationMarker className="ml" />
                  <p>{location}</p>
                </div>
                <div className="location">
                  <GiShoppingBag className="ml" />
                  <h1>{title}</h1>
                </div>
              </div>
              <p>{packagePerAnnum}</p>
            </div>
            <hr />
            <div className="flex-4">
              <h1 className="para-2">Description</h1>
              <a href={companyWebsiteUrl}>Visit</a>
            </div>

            <p className="para-2">{jobDescription}</p>
            <h1>Skills</h1>
            <ul className="skill-flex">
              {skillsarray.map(eachSkills => (
                <Skills key={id} skillsarray2={eachSkills} />
              ))}
            </ul>

            <div className="pd">
              <h1 className="para-2">Life at Company</h1>
              <div className="job-flex1">
                <p className="para-3">{description}</p>
                <div>
                  <img
                    src={imageUrl}
                    className="netflix1"
                    alt="life at company"
                  />
                </div>
              </div>
            </div>
          </div>
          <h1>Similar Jobs</h1>
          <ul className="job-flex2">
            {similarjobs.map(eachjob => (
              <SimilarJobsItems key={id} eachjob={eachjob} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    return <div>{this.renderJobDetails()}</div>
  }
}

export default JobItemDetails

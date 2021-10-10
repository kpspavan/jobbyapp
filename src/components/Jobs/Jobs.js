import {Link} from 'react-router-dom'
import {FcRating} from 'react-icons/fc'
import {HiLocationMarker} from 'react-icons/hi'
import {GiShoppingBag} from 'react-icons/gi'
import './Jobs.css'

const Jobs = props => {
  const {JobsData1} = props
  const {
    title,
    employmentType,
    id,
    companyLogoUrl,
    jobDescription,
    location,
    rating,
    packagePerAnnum,
  } = JobsData1
  return (
    <>
      <Link className="link" to={`/jobs/${id}`}>
        <li className="color">
          <div className="jobs-container-fluid">
            <div className="bg-color">
              <div className="padding">
                <div className="main-container">
                  <img
                    src={companyLogoUrl}
                    className="company_logo_url"
                    alt="company logo"
                  />
                  <div className="ml">
                    <h1 className="jobs-para">{title}</h1>
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
                      <p>{employmentType}</p>
                    </div>
                  </div>
                  <p>{packagePerAnnum}</p>
                </div>

                <hr />
                <h1 className="para-2">Description</h1>
                <p className="para-2">{jobDescription}</p>
              </div>
            </div>
          </div>
        </li>
      </Link>
    </>
  )
}

export default Jobs

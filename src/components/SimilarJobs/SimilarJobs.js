import {GiShoppingBag} from 'react-icons/gi'
import {FcRating} from 'react-icons/fc'
import {HiLocationMarker} from 'react-icons/hi'
import './SimilarJobs.css'

const SimilarJobsItems = props => {
  const {eachjob} = props
  const {
    companyLogoUrl,
    rating,
    title,
    employmentType,
    jobDescription,
    location,
  } = eachjob

  return (
    <li className="job-flex">
      <div className="bg-color-job1">
        <div className="job-header">
          <div className="main-container">
            <img
              src={companyLogoUrl}
              className="netflix"
              alt="similar job company logo"
            />

            <div className="ml">
              <h1>{title}</h1>

              <div className="jobs-rating">
                <FcRating className="ml" />
                <p>{rating}</p>
              </div>
            </div>
          </div>

          <h1 className="para-2">Description</h1>
          <p className="description">{jobDescription}</p>
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
          </div>
          <hr />
        </div>
      </div>
    </li>
  )
}
export default SimilarJobsItems

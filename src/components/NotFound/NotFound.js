import './NotFound.css'
import Header from '../Header/Header'

const NotFound = () => (
  <>
    <div>
      <Header />
    </div>
    <div className="not-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        className="image-1"
        alt="not found"
      />
      <h1 className="para">Page Not Found</h1>
      <p className="paragraph">
        we’re sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound

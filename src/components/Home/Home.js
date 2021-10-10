import {Link} from 'react-router-dom'
import Header from '../Header/Header'
import './Home.css'

const Home = () => (
  <div>
    <Header />
    <div className="home-container">
      <div className="home-container-fluid">
        <h1 className="para-2">Find The Job That Fits Your Life </h1>
        <p className="para-1">Millions of people are searching for jobs</p>
      </div>
      <Link className="li-items" to="/jobs">
        <button className="home-btn" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)
export default Home

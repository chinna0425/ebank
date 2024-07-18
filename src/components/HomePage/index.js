import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const HomePage = props => {
  const onLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  const jwt = Cookies.get('jwt_token')
  if (jwt === undefined) {
    return <Redirect to="/ebank/login" />
  }
  return (
    <div className="home-main-container">
      <nav className="home-page-nav-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button
          type="button"
          className="logout-button"
          onClick={onLogoutButton}
        >
          Logout
        </button>
      </nav>
      <div className="home-page-card-container">
        <h1 className="home-page-title">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </div>
  )
}
export default HomePage

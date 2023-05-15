import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import './index.css'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiStatusConstants.inProgress, resultList: []}

  componentDidMount() {
    this.getApiResults()
  }

  getApiResults = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        apiStatus: apiStatusConstants.success,
        resultList: data,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failed})
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="loading-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {resultList} = this.state
    const updatedResultList = {
      last7DaysVaccination: resultList.last_7_days_vaccination,
      vaccinationByAge: resultList.vaccination_by_age,
      vaccinationByGender: resultList.vaccination_by_gender,
    }
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = updatedResultList
    console.log(updatedResultList)
    return (
      <div className="success-container">
        <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-msg">Something Went Wrong</h1>
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failed:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <div className="navbar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          <p className="logo-name">Co-WIN</p>
        </div>
        <h1 className="heading">CoWIN Vaccination In India</h1>
        {this.renderAllProducts()}
      </div>
    )
  }
}

export default CowinDashboard

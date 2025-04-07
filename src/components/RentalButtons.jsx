import { Link } from 'react-router-dom'
import './components.css'

function RentalButtons() {
  return (
    <div className="rental-buttons">
      <Link to="/forms">
        <button>Manage Rentals & Cabs</button>
      </Link>
    </div>
  )
}

export default RentalButtons

import './components.css'

function About() {
  return (
    <div className="about">
      <h2>About Hello Rentals</h2>
      <p>
        Welcome to Hello Rentals, your one-stop solution for all your transportation needs! We take pride in offering reliable, convenient, and affordable services to make your journey smooth and enjoyable.
      </p>
      <h3>Our Services</h3>
      <div className="services">
        <div className="service-item">
          <h4>Cab Booking Service</h4>
          <p>
            Our cab booking service offers economy, premium, and luxury rides to fit your comfort and budget.
          </p>
        </div>
        <div className="service-item">
          <h4>Vehicle Rental Service</h4>
          <p>
            Choose from a wide range of vehicles - cars, bikes, and scooters - and travel at your own pace.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About

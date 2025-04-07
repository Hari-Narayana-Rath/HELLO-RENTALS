import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import Navbar from './components/Navbar';
import RentalForm from './components/RentVehicle';
import CabForm from './components/BookCab';
import Footer from './components/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './app.css';

function App() {
  const [activeForm, setActiveForm] = useState(null);
  const footerRef = useRef(null);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const hasPendingRequest = user?.currentRequest === 1;

  const handleShowForm = (formType) => {
    setActiveForm(formType);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

  return (
    <div className="app">
      <Navbar onAboutClick={scrollToFooter} />

      <div className="buttons-container">
        {!hasPendingRequest && (
          <button onClick={() => handleShowForm('rental')}>Rent a Vehicle</button>
        )}
        <button onClick={() => handleShowForm('cab')}>Book a Cab</button>
        <button onClick={() => navigate("/current-request")}>Current Requests</button>
        <button className="inactive-btn">Last Ride</button>
      </div>

      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <img src="/temp1.png" alt="Slide 1" className="slide-image" />
          </div>
          <div>
            <img src="/2.png" alt="Slide 2" className="slide-image" />
          </div>
          <div>
            <img src="/3.png" alt="Slide 3" className="slide-image" />
          </div>
        </Slider>
      </div>

      <div ref={formRef} className="form-display">
        {activeForm === 'rental' && <RentalForm />}
        {activeForm === 'cab' && <CabForm />}
      </div>

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}

export default App;

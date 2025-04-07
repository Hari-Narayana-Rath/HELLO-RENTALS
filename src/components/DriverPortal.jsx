import { useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function DriverPortal() {
  const footerRef = useRef(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar onAboutClick={scrollToFooter} />
      <div style={{ textAlign: 'center', marginTop: '50px', minHeight: '70vh' }}>
        <h2>Welcome to Driver Portal</h2>
        <p>This section is under construction...</p>
      </div>
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
}

export default DriverPortal;

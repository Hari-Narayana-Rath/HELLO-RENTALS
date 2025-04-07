import './components.css'

function Navbar({ onAboutClick }) {
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/logo2.jpg" alt="Logo" className="logo" />
        <span className="title">Hello Rentals</span>
      </div>
      <div className="navbar-right">
        {onAboutClick && (
          <button onClick={onAboutClick} className="about-btn">About</button>
        )}
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;

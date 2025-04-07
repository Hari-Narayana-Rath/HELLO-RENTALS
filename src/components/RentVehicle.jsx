import React, { useState } from "react"
import { useNavigate } from "react-router-dom" // added for redirect
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "./components.css"

function RentVehicle() {
  const [pickupLocation, setPickupLocation] = useState("")
  const [mapVisible, setMapVisible] = useState(false)
  const [markerPosition, setMarkerPosition] = useState([16.5, 80.6])
  const navigate = useNavigate() // 🔁 used for redirection

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        )
        const data = await response.json()
        if (data.display_name) {
          setPickupLocation(data.display_name)
        } else {
          alert("Could not retrieve address.")
        }
      })
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        setMarkerPosition([lat, lng])
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
          .then((res) => res.json())
          .then((data) => setPickupLocation(data.display_name || "Unknown Location"))
      },
    })

    return markerPosition ? <Marker position={markerPosition} /> : null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem("currentUser"))
    if (!user) {
      alert("User not authenticated. Please log in again.")
      return
    }

    const rentalData = {
      userId: user.id,
      pickupLocation,
      vehicleType: e.target.vehicleType.value,
      fromDate: e.target.fromDate.value,
      toDate: e.target.toDate.value,
      fullName: e.target.fullName.value,
      phone: e.target.phone.value,
    }

    try {
      await fetch("http://localhost:5000/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rentalData),
      })

      await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentRequest: 1 }),
      })

      // update user in localStorage
      localStorage.setItem("currentUser", JSON.stringify({ ...user, currentRequest: 1 }))

      alert("Rental request submitted successfully!")

      // 🔁 redirect to current request page
      navigate("/current-request")

    } catch (err) {
      console.error("Error submitting rental request:", err)
    }
  }

  return (
    <div className="form-section rent-vehicle">
      <h2>Rent a Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" required />
        <input type="tel" name="phone" placeholder="Phone Number" required />
        <input type="date" name="fromDate" required />
        <input type="date" name="toDate" required />
        <select name="vehicleType" required>
          <option value="">Select Vehicle Type</option>
          <option value="car">Car</option>
          <option value="bike">Bike</option>
          <option value="scooter">Scooter</option>
        </select>

        <input type="text" placeholder="Pickup Location" value={pickupLocation} readOnly required />

        <div className="location-buttons">
          <button type="button" onClick={getCurrentLocation}>Current Location</button>
          <button type="button" onClick={() => setMapVisible(true)}>Select on Map</button>
        </div>

        <input type="submit" value="Submit Rental Request" />
      </form>

      {mapVisible && (
        <div className="map-modal">
          <div className="map-container">
            <MapContainer center={[16.5, 80.6]} zoom={7} className="leaflet-map">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker />
            </MapContainer>
            <button onClick={() => setMapVisible(false)}>Close Map</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RentVehicle

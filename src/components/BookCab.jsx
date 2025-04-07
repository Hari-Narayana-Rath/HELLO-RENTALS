import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import Modal from "react-modal";
import "leaflet/dist/leaflet.css";
import "./components.css";

function LocationPicker({ onLocationSelect }) {
  const [position, setPosition] = useState([16.5062, 80.648]);

  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      onLocationSelect([e.latlng.lat, e.latlng.lng]);
    },
  });

  return (
    <Marker position={position}>
      <Popup>Selected Location</Popup>
    </Marker>
  );
}

function BookCab() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [locationType, setLocationType] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState([16.5062, 80.648]);
  const [suggestions, setSuggestions] = useState([]);

  const openMapModal = (type) => {
    setLocationType(type);
    setModalOpen(true);
  };

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&countrycodes=IN&limit=5`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      const filteredResults = data.filter(
        (place) => place.address.state === "Andhra Pradesh"
      );

      setSuggestions(filteredResults.map((place) => place.display_name));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleLocationSelect = (position) => {
    setSelectedPosition(position);
  };

  const confirmLocation = async () => {
    const [latitude, longitude] = selectedPosition;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await res.json();

      if (data.display_name) {
        if (locationType === "pickup") setPickup(data.display_name);
        else setDropoff(data.display_name);
      } else {
        alert("Could not fetch location name.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }

    setModalOpen(false);
  };

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          if (data.display_name) {
            setPickup(data.display_name);
          } else {
            alert("Could not fetch location name");
          }
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      },
      (error) => {
        alert("Unable to retrieve location");
        console.error(error);
      }
    );
  };

  const handleSuggestionClick = (suggestion) => {
    if (locationType === "pickup") setPickup(suggestion);
    else setDropoff(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="form-section book-cab">
      <h2>Book a Cab</h2>
      <form>
        <input type="text" placeholder="Full Name" required />
        <input type="tel" placeholder="Phone Number" required />

        <div className="location-input">
          <input
            type="text"
            value={pickup}
            placeholder="Pickup Location"
            onChange={(e) => {
              setPickup(e.target.value);
              fetchSuggestions(e.target.value);
            }}
            required
          />
          <div className="location-buttons">
            <button
              type="button"
              className="current-location-btn"
              onClick={getCurrentLocation}
            >
              Current Location
            </button>
            <button
              type="button"
              className="select-on-map-btn"
              onClick={() => openMapModal("pickup")}
            >
              Select on Map
            </button>
          </div>
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="location-input">
          <input
            type="text"
            value={dropoff}
            placeholder="Drop-off Location"
            onChange={(e) => {
              setDropoff(e.target.value);
              fetchSuggestions(e.target.value);
            }}
            required
          />
          <div className="location-buttons">
            <button
              type="button"
              className="select-on-map-btn"
              onClick={() => openMapModal("dropoff")}
            >
              Select on Map
            </button>
          </div>
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input type="datetime-local" required />
        <select required>
          <option value="">Select Cab Type</option>
          <option value="economy">Economy</option>
          <option value="premium">Premium</option>
          <option value="luxury">Luxury</option>
        </select>
        <input type="number" placeholder="Passengers" min="1" required />
        <input type="submit" value="Book Cab" />
      </form>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="modal-container"
      >
        <h2>Select Location</h2>
        <MapContainer
          center={selectedPosition}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationPicker onLocationSelect={handleLocationSelect} />
        </MapContainer>

        <div className="modal-buttons">
          <button onClick={confirmLocation} className="confirm-btn">
            Confirm Location
          </button>
          <button onClick={() => setModalOpen(false)} className="close-btn">
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default BookCab;

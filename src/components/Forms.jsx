// import { useState } from "react";
// import AsyncSelect from "react-select/async";
// import axios from "axios";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import Modal from "react-modal";

// function LocationPicker({ onLocationSelect }) {
//   const [position, setPosition] = useState([20.5937, 78.9629]); // Default to center of India

//   useMapEvents({
//     click(e) {
//       setPosition([e.latlng.lat, e.latlng.lng]);
//     },
//   });

//   return (
//     <>
//       <Marker position={position} />
//       <button
//         onClick={() => onLocationSelect(position)}
//         className="confirm-btn"
//       >
//         Confirm Location
//       </button>
//     </>
//   );
// }

// function Forms() {
//   const [pickupLocation, setPickupLocation] = useState("");
//   const [dropoffLocation, setDropoffLocation] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [locationType, setLocationType] = useState(null);

//   const fetchLocationOptions = async (inputValue) => {
//     if (!inputValue) return [];

//     try {
//       const response = await axios.get(
//         `https://nominatim.openstreetmap.org/search`,
//         {
//           params: { format: "json", q: inputValue, countrycodes: "IN" },
//         }
//       );

//       return response.data.map((place) => ({
//         label: place.display_name,
//         value: place.display_name,
//       }));
//     } catch (error) {
//       console.error("Error fetching location:", error);
//       return [];
//     }
//   };

//   const openMapModal = (type) => {
//     setLocationType(type);
//     setModalOpen(true);
//   };

//   const handleLocationSelect = (position) => {
//     const latLng = `${position[0]}, ${position[1]}`;
//     if (locationType === "pickup") {
//       setPickupLocation(latLng);
//     } else {
//       setDropoffLocation(latLng);
//     }
//     setModalOpen(false);
//   };

//   return (
//     <div className="forms-container">
//       <div className="form-section book-cab">
//         <h2>Book a Cab</h2>
//         <form>
//           <input type="text" placeholder="Full Name" required />
//           <input type="tel" placeholder="Phone Number" required />

//           <div className="location-input">
//             <AsyncSelect
//               cacheOptions
//               loadOptions={fetchLocationOptions}
//               onChange={(e) => setPickupLocation(e.value)}
//               placeholder="Pickup Location (India)"
//             />
//             <button type="button" onClick={() => openMapModal("pickup")}>
//               Pick on Map
//             </button>
//           </div>

//           <div className="location-input">
//             <AsyncSelect
//               cacheOptions
//               loadOptions={fetchLocationOptions}
//               onChange={(e) => setDropoffLocation(e.value)}
//               placeholder="Drop-off Location (India)"
//             />
//             <button type="button" onClick={() => openMapModal("dropoff")}>
//               Pick on Map
//             </button>
//           </div>

//           <input type="submit" value="Book Cab" />
//         </form>
//       </div>

//       <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
//         <h2>Select Location on Map</h2>
//         <MapContainer
//           center={[20.5937, 78.9629]}
//           zoom={5}
//           style={{ height: "400px", width: "100%" }}
//         >
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <LocationPicker onLocationSelect={handleLocationSelect} />
//         </MapContainer>
//         <button onClick={() => setModalOpen(false)}>Close</button>
//       </Modal>
//     </div>
//   );
// }

// export default Forms;

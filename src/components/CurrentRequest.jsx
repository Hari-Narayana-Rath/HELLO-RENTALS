import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CurrentRequest() {
  const [request, setRequest] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    fetch(`http://localhost:5000/requests?userId=${user.id}`)
      .then(res => res.json())
      .then(data => setRequest(data[0] || null));
  }, []);

  const cancelRequest = async () => {
    try {
      if (!request) return;

      await fetch(`http://localhost:5000/requests/${request.id}`, {
        method: "DELETE",
      });

      await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentRequest: 0 }),
      });

      localStorage.setItem("currentUser", JSON.stringify({ ...user, currentRequest: 0 }));

      alert("Your request has been cancelled.");

      setTimeout(() => {
        navigate("/app");
      }, 2000);
    } catch (err) {
      console.error("Error cancelling request:", err);
    }
  };

  const getStatusMessage = (status) => {
    if (status === "accepted") {
      return "Request accepted. You will receive a call from the provider soon.";
    }
    return "We have let the vehicle provider know. Please wait for their confirmation.";
  };

  return (
    <div className="current-request">
      <h2>Current Request for - {user.name}</h2>
      {request ? (
        <div>
          <p><strong>Pickup Location:</strong> {request.pickupLocation}</p>
          <p><strong>Vehicle Type:</strong> {request.vehicleType}</p>
          <p><strong>From:</strong> {request.fromDate}</p>
          <p><strong>To:</strong> {request.toDate}</p>

          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#1a1a3a",
              borderLeft: "5px solid #007bff",
              borderRadius: "4px",
            }}
          >
            <strong>Status:</strong> {getStatusMessage(request.status || "pending")}
          </div>

          <button
            onClick={cancelRequest}
            style={{
              marginTop: "20px",
              padding: "8px 16px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel Request
          </button>
        </div>
      ) : (
        <p>No current request found.</p>
      )}
    </div>
  );
}

export default CurrentRequest;

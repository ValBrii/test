import React, { useEffect, useState } from "react";
import ManageSpaces from "./ManageSpaces";
import ManageUsers from "./ManageUsers";
import AddUser from "./AddUser";
import AddSpaceForm from "./AddSpaceForm";
import CreateBooking from "./CreateBooking";
import GenerateInvoice from "./GenerateInvoice";
import "../index.css";

const AdminDashboard = () => {
  const [summary, setSummary] = useState({
    totalSpaces: 0,
    activeBookings: 0,
    registeredUsers: 0,
  });

  const [spaces, setSpaces] = useState([]);
  const [editingSpaceId, setEditingSpaceId] = useState(null);
  const [currentView, setCurrentView] = useState("dashboard");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch("/api/dashboard-summary");
        const data = await response.json();
        setSummary(data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };

    const fetchSpaces = async () => {
      try {
        const response = await fetch("/api/spaces");
        const data = await response.json();
        setSpaces(data);
      } catch (error) {
        console.error("Error fetching spaces:", error);
      }
    };

    fetchSummary();
    fetchSpaces();
  }, []);

  const refreshSpaces = async () => {
    try {
      const response = await fetch("/api/spaces");
      const data = await response.json();
      setSpaces(data);
    } catch (error) {
      console.error("Error refreshing spaces:", error);
    }
  };

  const handleEdit = (spaceId) => {
    setEditingSpaceId(spaceId);
  };

  const handleCancelEdit = () => {
    setEditingSpaceId(null);
  };

  const handleSaveEdit = () => {
    setEditingSpaceId(null);
    refreshSpaces();
  };

  const renderContent = () => {
    if (editingSpaceId) {
      return (
        <ManageSpaces
          selectedSpaceId={editingSpaceId}
          onCancel={handleCancelEdit}
          onSave={handleSaveEdit}
        />
      );
    }

    switch (currentView) {
      case "dashboard":
        return (
          <>
            <h1>Welcome, Admin!</h1>
            <div className="summary">
              <div>
                Total Spaces<br />
                <strong>{summary.totalSpaces} Listed</strong>
              </div>
              <div>
                Active Bookings<br />
                <strong>{summary.activeBookings} Ongoing</strong>
              </div>
              <div>
                Registered Users<br />
                <strong>{summary.registeredUsers} Members</strong>
              </div>
            </div>
            <div className="listed-spaces">
              <h3>All Listed Spaces</h3>
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Location</th>
                    <th>Price/Day</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {spaces.map((space) => (
                    <tr key={space.id}>
                      <td>
                        <img src={space.imageUrl} alt={space.title} />
                      </td>
                      <td>{space.title}</td>
                      <td>{space.description}</td>
                      <td>{space.location}</td>
                      <td>{space.price}</td>
                      <td>
                        <button onClick={() => handleEdit(space.id)}>Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );
      case "manageUsers":
        return <ManageUsers />;
      case "addUser":
        return <AddUser />;
      case "addSpace":
        return <AddSpaceForm />;
      case "booking":
        return <CreateBooking />;
      case "billing":
        return <GenerateInvoice />;
      default:
        return <p>Page not found</p>;
    }
  };

  return (
    <div className="admin-panel">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setCurrentView("dashboard")}>Dashboard</li>
          <li onClick={() => setCurrentView("manageUsers")}>View Users</li>
          <li onClick={() => setCurrentView("addUser")}>Add New User</li>
          <li onClick={() => setCurrentView("addSpace")}>Add New Space</li>
          <li onClick={() => setCurrentView("booking")}>Booking</li>
          <li onClick={() => setCurrentView("billing")}>Billing & Invoicing</li>
        </ul>
      </div>
      <div className="main">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;


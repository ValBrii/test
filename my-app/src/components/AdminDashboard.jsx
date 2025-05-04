import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import ManageSpaces from "./ManageSpaces";
import "../index.css";

const AdminDashboard = () => {
  const [summary, setSummary] = useState({
    totalSpaces: 0,
    activeBookings: 0,
    registeredUsers: 0,
  });

  const [spaces, setSpaces] = useState([]);
  const [editingSpaceId, setEditingSpaceId] = useState(null);

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

  const addSpaceForm = useFormik({
    initialValues: {
      title: "",
      location: "",
      price: "",
    },
    onSubmit: (values) => {
      console.log("New Space:", values);
    },
  });

  const registerForm = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      role: "",
    },
    onSubmit: (values) => {
      console.log("Register User:", values);
    },
  });

  const bookingForm = useFormik({
    initialValues: {
      email: "",
      space: "",
      date: "",
      time: "",
    },
    onSubmit: (values) => {
      console.log("Booking:", values);
    },
  });

  const invoiceForm = useFormik({
    initialValues: {
      email: "",
      amount: "",
      date: "",
    },
    onSubmit: (values) => {
      console.log("Invoice:", values);
    },
  });

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

  return (
    <div className="admin-panel">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li>Dashboard</li>
          <li>View All Spaces</li>
          <li>Manage Users</li>
          <li>Bookings</li>
          <li>Billing & Invoicing</li>
          <li>Logout</li>
        </ul>
      </div>
      <div className="main">
        <h1>Welcome, Admin!</h1>
        <div className="summary">
          <div>Total Spaces<br /><strong>{summary.totalSpaces} Listed</strong></div>
          <div>Active Bookings<br /><strong>{summary.activeBookings} Ongoing</strong></div>
          <div>Registered Users<br /><strong>{summary.registeredUsers} Members</strong></div>
        </div>

        {!editingSpaceId ? (
          <>
            <div className="forms">
              <form onSubmit={addSpaceForm.handleSubmit} className="form-card">
                <h3>Add New Space</h3>
                <input name="title" onChange={addSpaceForm.handleChange} value={addSpaceForm.values.title} placeholder="Space Title" />
                <input name="location" onChange={addSpaceForm.handleChange} value={addSpaceForm.values.location} placeholder="Location" />
                <input name="price" type="number" onChange={addSpaceForm.handleChange} value={addSpaceForm.values.price} placeholder="Price per Day" />
                <button type="submit">Add Space</button>
              </form>

              <form onSubmit={registerForm.handleSubmit} className="form-card">
                <h3>Register New User</h3>
                <input name="fullName" onChange={registerForm.handleChange} value={registerForm.values.fullName} placeholder="Full Name" />
                <input name="email" onChange={registerForm.handleChange} value={registerForm.values.email} placeholder="Email Address" />
                <select name="role" onChange={registerForm.handleChange} value={registerForm.values.role}>
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                <button type="submit">Register User</button>
              </form>

              <form onSubmit={bookingForm.handleSubmit} className="form-card">
                <h3>Create Booking</h3>
                <input name="email" onChange={bookingForm.handleChange} value={bookingForm.values.email} placeholder="User Email" />
                <input name="space" onChange={bookingForm.handleChange} value={bookingForm.values.space} placeholder="Space Name" />
                <input name="date" type="date" onChange={bookingForm.handleChange} value={bookingForm.values.date} />
                <input name="time" type="time" onChange={bookingForm.handleChange} value={bookingForm.values.time} />
                <button type="submit">Book Now</button>
              </form>

              <form onSubmit={invoiceForm.handleSubmit} className="form-card">
                <h3>Generate Invoice</h3>
                <input name="email" onChange={invoiceForm.handleChange} value={invoiceForm.values.email} placeholder="User Email" />
                <input name="amount" type="number" onChange={invoiceForm.handleChange} value={invoiceForm.values.amount} placeholder="Amount" />
                <input name="date" type="date" onChange={invoiceForm.handleChange} value={invoiceForm.values.date} />
                <button type="submit">Generate</button>
              </form>
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
                  {spaces.map((space, index) => (
                    <tr key={index}>
                      <td><img src={space.imageUrl} alt={space.title} /></td>
                      <td>{space.title}</td>
                      <td>{space.description}</td>
                      <td>{space.location}</td>
                      <td>{space.price}</td>
                      <td><button onClick={() => handleEdit(space.id)}>Edit</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <ManageSpaces selectedSpaceId={editingSpaceId} onCancel={handleCancelEdit} onSave={handleSaveEdit} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;







import React from "react";
import { Formik, Form, Field } from "formik";
import "../index.css"; // Ensure your CSS has general styles

const AddUser = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        alert("User registered successfully!");
        resetForm();
      } else {
        alert("Failed to register user.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="add-user-container">
      <h2>Register New User</h2>
      <Formik
        initialValues={{ fullName: "", email: "", role: "Admin" }}
        onSubmit={handleSubmit}
      >
        <Form className="add-user-form">
          <label htmlFor="fullName">Full Name</label>
          <Field id="fullName" name="fullName" placeholder="Jane Doe" />

          <label htmlFor="email">Email Address</label>
          <Field
            id="email"
            name="email"
            type="email"
            placeholder="jane@example.com"
          />

          <label htmlFor="role">Role</label>
          <Field as="select" id="role" name="role">
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </Field>

          <button type="submit" className="submit-btn">
            Register User
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddUser;


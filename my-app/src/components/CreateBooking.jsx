import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../index.css"; // for styling

const bookingSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  space: Yup.string().required("Required"),
  date: Yup.date().required("Required"),
  time: Yup.string().required("Required"),
});

const CreateBooking = () => {
  return (
    <div className="booking-container">
      <div className="booking-form-wrapper">
        <h2>Create Booking</h2>
        <Formik
          initialValues={{ email: "", space: "", date: "", time: "" }}
          validationSchema={bookingSchema}
          onSubmit={(values, { resetForm }) => {
            console.log("Booking submitted:", values);
            resetForm();
          }}
        >
          {() => (
            <Form className="booking-form">
              <label>User Email</label>
              <Field type="email" name="email" placeholder="User email" />
              <ErrorMessage name="email" component="div" className="error" />

              <label>Space</label>
              <Field type="text" name="space" placeholder="Space name" />
              <ErrorMessage name="space" component="div" className="error" />

              <label>Date</label>
              <Field type="date" name="date" />
              <ErrorMessage name="date" component="div" className="error" />

              <label>Time</label>
              <Field type="time" name="time" />
              <ErrorMessage name="time" component="div" className="error" />

              <button type="submit">Book Now</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateBooking;

  
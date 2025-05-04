import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../index.css"; // Ensure this CSS file is imported

const AddSpaceForm = () => {
  const initialValues = {
    name: "",
    location: "",
    pricePerDay: "",
    image: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    pricePerDay: Yup.number()
      .typeError("Must be a number")
      .required("Required"),
    image: Yup.mixed().required("Image is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("location", values.location);
    formData.append("pricePerDay", values.pricePerDay);
    formData.append("image", values.image);

    try {
      const response = await fetch("http://localhost:5000/api/spaces", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add space");
      }

      alert("Space added successfully!");
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding space");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Add New Space</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form encType="multipart/form-data">
              <label>Space Name</label>
              <Field name="name" type="text" />
              <ErrorMessage name="name" component="div" className="error" />

              <label>Location</label>
              <Field name="location" type="text" />
              <ErrorMessage name="location" component="div" className="error" />

              <label>Price per Day</label>
              <Field name="pricePerDay" type="text" />
              <ErrorMessage
                name="pricePerDay"
                component="div"
                className="error"
              />

              <label>Upload Image</label>
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setFieldValue("image", event.currentTarget.files[0])
                }
              />
              <ErrorMessage name="image" component="div" className="error" />

              <button type="submit">Add Space</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddSpaceForm;

  
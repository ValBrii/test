import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import "../index.css";

const ManageSpaces = ({ selectedSpaceId, onCancel, onSave }) => {
  const [spaceData, setSpaceData] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const response = await fetch(`/api/spaces/${selectedSpaceId}`);
        const data = await response.json();
        setSpaceData(data);
      } catch (error) {
        console.error("Failed to fetch space data", error);
      }
    };

    if (selectedSpaceId) {
      fetchSpace();
    }
  }, [selectedSpaceId]);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await fetch(`/api/spaces/${selectedSpaceId}`, {
        method: "PUT",
        body: formData,
      });

      onSave();
    } catch (error) {
      console.error("Failed to update space", error);
    }
  };

  if (!spaceData) return <p>Loading space details...</p>;

  return (
    <div className="edit-space-form">
      <h2>Edit Space</h2>
      <Formik
        initialValues={{
          title: spaceData.title || "",
          description: spaceData.description || "",
        }}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="edit-form">
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" />

            <label htmlFor="description">Description</label>
            <Field as="textarea" id="description" name="description" rows="4" />

            <label htmlFor="image">Upload New Image</label>
            <input type="file" id="image" onChange={handleImageChange} />

            <p><strong>Current Image:</strong></p>
            {spaceData.imageUrl && (
              <img
                src={spaceData.imageUrl}
                alt="Current"
                className="current-image"
              />
            )}

            <div className="button-group">
              <button type="submit" className="save-button">Save</button>
              <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ManageSpaces;

      
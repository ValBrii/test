import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../index.css";

const GenerateInvoice = () => {
  const initialValues = {
    email: "",
    amount: "",
    billingDate: "",
    notes: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    amount: Yup.number().positive("Must be positive").required("Required"),
    billingDate: Yup.date().required("Required"),
    notes: Yup.string(),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Invoice data:", values);
    // Add submission logic here (e.g., POST to API)
    resetForm();
  };

  return (
    <div className="invoice-container">
      <div className="invoice-form-wrapper">
        <h2>Generate Invoice</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="invoice-form">
            <label>User Email</label>
            <Field type="email" name="email" placeholder="Enter user email" />
            <ErrorMessage name="email" component="div" className="error" />

            <label>Amount</label>
            <Field type="number" name="amount" placeholder="e.g., 2500" />
            <ErrorMessage name="amount" component="div" className="error" />

            <label>Billing Date</label>
            <Field type="date" name="billingDate" />
            <ErrorMessage name="billingDate" component="div" className="error" />

            <label>Notes</label>
            <Field as="textarea" name="notes" placeholder="Optional notes..." />
            <ErrorMessage name="notes" component="div" className="error" />

            <button type="submit">Generate</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default GenerateInvoice;

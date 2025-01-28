"use client";

import React, { useState, useRef } from "react";
import { IFormData, IJob } from "@/types/components";
import { formLabels } from "@/labels/labels";
import { validateField } from "@/utils/validation";
import { submitCandidate } from "@/app/api/greenhouse/candidates/candidates";
import InputComponent from "./InputField";
import Modal from "./Modal";

import styles from "../styles/application-form.module.scss";

interface ApplicationFormProps {
  job: IJob;
}

const initialFormDataState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  resume: null,
};

const ApplicationForm = ({ job }: ApplicationFormProps) => {
  const [formData, setFormData] = useState<IFormData>(initialFormDataState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const files = e.target.type === "file" ? e.target.type : null;
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
      }
    });
    setFormErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        job_id: process.env.JOB_ID,
      };
      await submitCandidate(payload);

      setTimeout(() => {
        setShowModal(true);
      }, 1000);
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData(initialFormDataState);
  };

  const InputFieldsList = formLabels.map((label) => {
    return (
      <li key={label.id}>
        <InputComponent
          formLabel={label}
          formData={formData}
          handleChange={handleChange}
          error={formErrors[label.id]}
        />
      </li>
    );
  });

  return (
    <form onSubmit={handleSubmit} className="application-form">
      <div className={styles["application-form-container"]}>
        <h2>{`Apply to ${job.name}`}</h2>
        <ul>{InputFieldsList}</ul>
        <div className={styles["resume-upload-container"]}>
          <div className={styles["resume-upload"]} onClick={handleClick}>
            <p className={styles["upload-text"]}>
              Click to upload your <span>Resume</span>
            </p>
          </div>
          <input type="file" ref={fileInputRef} hidden />
        </div>
        <button className={styles["submit-button"]}>Apply</button>
      </div>
      <Modal
        isOpen={showModal}
        title="Application Submitted 🎉"
        message="Your application has been successfully submitted."
        buttonText="Close"
        onClose={closeModal}
      />
    </form>
  );
};

export default ApplicationForm;

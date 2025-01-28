import React from "react";

import styles from "../styles/input-component.module.scss";
import { IFormData, IFormLabel } from "@/types/components";

interface InputFieldProps {
  formLabel: IFormLabel;
  formData: IFormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
}

const InputField = ({
  formLabel,
  formData,
  handleChange,
  error,
}: InputFieldProps) => {
  const value = formData[formLabel.id as keyof IFormData] ?? "";

  return (
    <div className={styles["input-field-container"]}>
      <label>{formLabel.title}</label>
      <input
        id={formLabel.id}
        type={formLabel.type || "text"}
        name={formLabel.id}
        value={value as string}
        onChange={handleChange}
      />
      <p
        className={`${styles["error-message"]} ${
          error ? styles["visible"] : ""
        }`}>
        {error || ""}
      </p>
    </div>
  );
};

export default InputField;

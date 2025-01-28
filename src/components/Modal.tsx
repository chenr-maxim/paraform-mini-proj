"use client";
import React from "react";
import styles from "../styles/modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  buttonText: string;
  onClose: () => void;
}

const Modal = ({ isOpen, title, message, buttonText, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        <h2>{title}</h2>
        <p>{message}</p>
        <button className={styles["close-button"]} onClick={onClose}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Modal;

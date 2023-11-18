// Modal.jsx
"use client";
import React from "react";

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative z-50 bg-white p-8 rounded-lg">
        {children}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;

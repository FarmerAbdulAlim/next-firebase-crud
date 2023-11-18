// Create a new component EditForm.jsx

"use client";
import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const EditForm = ({ editData, setEditData, onUpdateData }) => {
  const [suggestion, setSuggestion] = useState(editData.suggestion);
  const [priority, setPriority] = useState(editData.priority);
  const [language, setLanguage] = useState(editData.language);

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "message", editData.id), {
        suggestion,
        priority,
        language,
      });
      console.log("Document successfully updated!");
      setEditData(null); // Clear editData state
      onUpdateData(); // Refresh the data
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-center text-2xl font-bold mb-4">Edit Data</h1>
      <form className="flex space-between max-w-md p-4 bg-white shadow-md rounded-lg">
        <div className="me-2">
          <label htmlFor="suggestion" className="block text-gray-700 font-bold mb-2">
            Suggestion
          </label>
          <input
            type="text"
            id="suggestion"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="me-2">
          <label htmlFor="priority" className="block text-gray-700 font-bold mb-2">
            Priority
          </label>
          <input
            type="text"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="me-2">
          <label htmlFor="language" className="block text-gray-700 font-bold mb-2">
            Language
          </label>
          <input
            type="text"
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="text-center mt-7">
          <button
            type="button" // Change to type="button" to prevent form submission
            onClick={handleUpdate}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;

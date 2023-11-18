'use client'
import { db } from "../firebaseConfig";
import {collection, addDoc} from "firebase/firestore";
import React, {useState} from "react";


async function addDataToFirestore(suggestion, priority, language, onUpdateData) {
  try {
    const docRef = await addDoc(collection(db, "message"), {
      suggestion: suggestion,
      priority: priority,
      language: language
    });
    console.log("Document Writted with ID: ", docRef.id);
    onUpdateData();
    return true;
  }
  catch(error) {
    console.error("Error Adding Document: ", error);
    return false;
  }
}

const AddData = ({onUpdateData})=> {
  const [suggestion, setSuggestion] = useState("");
  const [priority, setPriority] = useState(0);
  const [language, setLanguage] = useState("");

  const handleSubmit = async(e)=> {
    e.preventDefault();
    const added = await addDataToFirestore(suggestion, priority, language, onUpdateData);
    if(added) {
      setSuggestion("");
      setPriority(0);
      setLanguage("");
    }
  }

  return (
    <main className="flex flex-col  items-center mt-5">
      <h1 className='text-2xl font-bold mb-11'>Add Data to Firestore</h1>
      <form 
      onSubmit={handleSubmit} 
      className="flex space-between p-4 bg-white shadow-md rounded-lg"
      >
        <div className="me-2">
          <label htmlFor="suggestion" className="block text-gray-700 font-bold mb-2">Suggestion</label>
          <input 
          type="text" 
          id="suggestion"
          value={suggestion}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          onChange={(e)=>setSuggestion(e.target.value)}
          />
        </div>
        <div className="me-2">
          <label htmlFor="priority" className="block text-gray-700 font-bold mb-2">Priority</label>
          <input 
          type="text" 
          id="priority"
          value={priority}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          onChange={(e)=>setPriority(e.target.value)}
          />
        </div>
        <div className="me-2">
          <label htmlFor="language" className="block text-gray-700 font-bold mb-2">Language</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value=""></option>
            <option value="English">English</option>
            <option value="Spanish">German</option>
            <option value="French">French</option>
            <option value="German">Arabic</option>
          </select>
        </div>
        <div className="text-center mt-7">
          <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg
          ">Add
          </button>
        </div>
      </form>
    </main>
  )
}

export default AddData;
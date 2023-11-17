'use client'
import { db } from "../firebaseConfig";
import {collection, addDoc} from "firebase/firestore";
import React, {useState} from "react";


async function addDataToFirestore(name, email, message, onUpdateData) {
  try {
    const docRef = await addDoc(collection(db, "message"), {
      name: name,
      email: email,
      message: message
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async(e)=> {
    e.preventDefault();
    const added = await addDataToFirestore(name, email, message, onUpdateData);
    if(added) {
      setName("");
      setEmail("");
      setMessage("");
    }
  }

  return (
    <main className="flex flex-col  items-center mt-5">
      <h1 className='text-2xl font-bold mb-11'>Add Data to Firestore</h1>
      <form 
      onSubmit={handleSubmit} 
      className="flex space-between max-w-md p-4 bg-white shadow-md rounded-lg"
      >
        <div className="me-2">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input 
          type="text" 
          id="name"
          value={name}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div className="me-2">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input 
          type="email" 
          id="email"
          value={email}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="me-2">
          <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
          <textarea 
          rows={1}
          id="message"
          value={message}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          onChange={(e)=>setMessage(e.target.value)}
          />
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
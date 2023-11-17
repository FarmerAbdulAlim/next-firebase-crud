"use client"
import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const ViewData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "message"));
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
        });
        setData(documents);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "message", id));
      setData((prevData) => prevData.filter((item) => item.id !== id));
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-center text-2xl font-bold mb-4">View Data from Firestore</h1>
      <ul>
        {data.map((item) => (
          <li
            key={item.id}
            className="mb-4 p-4 bg-white shadow-md rounded-lg"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-bold">
                  <strong>Name:</strong> {item.name}
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> {item.email}
                </p>
                <p className="mt-2">
                  <strong>Message:</strong> {item.message}
                </p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewData;

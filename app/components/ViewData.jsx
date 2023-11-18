"use client"
import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import EditForm from "./EditForm";
import Modal from "./Modal";
// ... (other imports and code)

// ... (other imports and code)

// ... (other imports and code)

const ViewData = () => {
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState(null);
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
    useEffect(() => {  
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
  
    const handleEdit = (item) => {
        console.log(item);
      setEditData(item);
    };
  
    return (
      <div className="mt-8">
        <h1 className="text-center text-2xl font-bold mb-4">View Data from Firestore</h1>
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Suggestion</th>
              <th className="p-2">Priority</th>
              <th className="p-2">Language</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="p-2">{item.id}</td>
                <td className="p-2">{item.suggestion}</td>
                <td className="p-2">{item.priority}</td>
                <td className="p-2">{item.language}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {editData && (
        <Modal isOpen={!!editData} onClose={() => setEditData(null)}>
          <EditForm
            editData={editData}
            setEditData={setEditData}
            onUpdateData={fetchData}
          />
        </Modal>
      )}
      </div>
    );
  };
  
  export default ViewData;
  
  
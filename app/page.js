"use client"
import { useState } from "react";
import AddData from "./components/AddData";
import ViewData from "./components/ViewData";
const page = () => {
  const [updateData, setUpdateData] = useState(false);

  const handleUpdateData = ()=> {
    setUpdateData((prev)=>!prev);
  }

  return (
    <div>
      <AddData onUpdateData = {handleUpdateData}/>
      <ViewData key={updateData}/>
    </div>
  )
}

export default page
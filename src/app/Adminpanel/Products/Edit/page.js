"use client";
import { useEffect, useState } from "react";
import "../../../Adminpanel/style.css";
import Link from "next/link";
import axios from "axios";

const Page = ({searchParams}) => {
    const [formData, setFormData] = useState({
        id: searchParams.ID || "" ,
        title: searchParams.Title || "",
        details: searchParams.Detail || "",
        price: searchParams.Price || "",
        category: [],
        image: null,
      });
    
      const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
      };
    
      const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
      
        setFormData((prevFormData) => {
          let updatedCategories;
      
          if (checked) {
            // Add the category to the array if checked
            updatedCategories = [...prevFormData.category, value];
          } else {
            // Remove the category from the array if unchecked
            updatedCategories = prevFormData.category.filter((category) => category !== value);
          }
      
          return {
            ...prevFormData,
            category: updatedCategories,
          };
        });
      };
      


  const EditHandle = async(e) => {
    e.preventDefault();
    try {
        const EditedData = await axios.post('http://localhost:3001/edit',formData)
        console.log(formData);
    } catch (error) {
        console.log(error);
    }
    
  }
  return (
    <>
      <head>
        <title>AdminPanel</title>
      </head>
      <form onSubmit={EditHandle}>
      <input
                type="hidden"
                name="ID"
                value={formData.id}
                onChange={handleInputChange}
              />
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />

              <label>Details:</label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
              />

<label>Price:</label>
              <input
              type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />

<label>Category:</label>
<div className="categoryContaner">
  <input
    type="checkbox"
    name="category"
    value="Backpack"
    checked={formData.category.includes("Backpack")}
    onChange={handleCategoryChange}
  />
  <label>Backpack</label>

  <input
    type="checkbox"
    name="category"
    value="Bucket Bag"
    checked={formData.category.includes("Bucket Bag")}
    onChange={handleCategoryChange}
  />
  <label>Bucket Bag</label>
<br/>
  <input
    type="checkbox"
    name="category"
    value="Plap Bag"
    checked={formData.category.includes("Plap Bag")}
    onChange={handleCategoryChange}
  />
  <label>Plap Bag</label>

  <input
    type="checkbox"
    name="category"
    value="Baguette Bag"
    checked={formData.category.includes("Baguette Bag")}
    onChange={handleCategoryChange}
  />
  <label>Baguette Bag</label>

<br/>
  <input
    type="checkbox"
    name="category"
    value="Hand Bag"
    checked={formData.category.includes("Hand Bag")}
    onChange={handleCategoryChange}
  />
  <label>Hand Bag</label>
</div>


              <label>Image:</label>
              <div className="file-input-container">
  <label className="file-label">
    Choose File
    <input
      type="file"
      className="file-input"
      name="image"
      accept="image/*"
      onChange={handleFileChange}
    />
  </label>
  {/* <img src={`http://localhost:3001/uploads/${formData.image}`} alt={formData.image} style={{
    width:'420px', borderRadius:"6px", marginLeft:"50px", position:'fixed', left:'-2%', top:'10%'
  }}/> */}
  {/* <span>{formData.image}</span> */}
</div>


              <button type="submit">Submit</button>
            </form>
    </>
  );
};

export default Page;

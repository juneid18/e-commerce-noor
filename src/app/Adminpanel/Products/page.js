"use client";
import { useEffect, useState } from "react";
import "../../Adminpanel/style.css";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Page = () => {
  const router = useRouter()
  const [product, setproduct] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    price: "",
    category: [],
    image: null,
  });
    // Handle input change
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    // Handle file change
    const handleFileChange = (e) => {
      setFormData({ ...formData, image: e.target.files[0] });
    };
  
    // Handle category change
    const handleCategoryChange = (e) => {
      const { value, checked } = e.target;
      const updatedCategories = checked
        ? [...formData.category, value]
        : formData.category.filter((category) => category !== value);
  
      setFormData({
        ...formData,
        category: updatedCategories,
      });
    };

  function toggleNav() {
    const nav = document.querySelector(".navcontainer");
    const currentWidth = nav.style.width;
    nav.style.width = currentWidth === "80px" ? "250px" : "80px";
  }
  const fetchUserData = async () => {
    try {
      const result = await axios.get("http://localhost:3001/products");
      setproduct(result.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleDelete = async (productID) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/deleteproduct",
        { productID }
      );
      console.log("Product deleted successfully:");
      router.push('./Products')
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <Head>
        <title>AdminPanel</title>
      </Head>
      <header>
        <div className="logosec">
          <div class="logo">AdminPanel</div>
          <Image
                width={30}
                height={30}

            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182541/Untitled-design-(30).png"
            className="icn menuicn"
            id="menuicn"
            alt="menu-icon"
            onClick={toggleNav}
          />
        </div>

        <div className="searchbar">
          <input type="text" placeholder="Search" />
          <div className="searchbtn">
            <Image
                width={30}
                height={30}

              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
              className="icn srchicn"
              alt="search-icon"
            />
          </div>
        </div>

        <div className="message">
          <div className="circle"></div>
          <Image
                width={30}
                height={30}

            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/8.png"
            className="icn"
            alt=""
          />
          <div className="dp">
            <Image
                width={30}
                height={30}

              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
              className="dpicn"
              alt="dp"
            />
          </div>
        </div>
      </header>

      <div className="main-container">
        <div className="navcontainer">
          <nav className="nav">
            <div className="nav-upper-options">
              <Link
                href={"./Dashboard"}
                style={{
                  backgroundColor: "#fff",
                  color: "#3f0097",
                  border: "none",
                }}
                className="nav-option option1"
              >
                <Image
                width={30}
                height={30}

                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182148/Untitled-design-(29).png"
                  className="nav-Image
                width={30}
                height={30}
"
                  alt="dashboard"
                />
                <h3> Dashboard</h3>
              </Link>
              <Link href={"./Upload"}>
                <div
                  style={{
                    backgroundColor: "#fff",
                    color: "#3f0097",
                    border: "none",
                  }}
                  className="option2 nav-option"
                >
                  <Image
                width={30}
                height={30}

                    src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                    className="nav-Image
                width={30}
                height={30}
"
                    alt="articles"
                  />
                  <h3> Upload</h3>
                </div>
              </Link>
              <Link href={"./Users"}>
                <div
                  style={{
                    backgroundColor: "#fff",
                    color: "#3f0097",
                    border: "none",
                    textDecoration: "none",
                  }}
                  className="nav-option option3"
                >
                  <Image
                width={30}
                height={30}

                    src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/5.png"
                    className="nav-Image
                width={30}
                height={30}
"
                    alt="report"
                  />
                  <h3> Users</h3>
                </div>
              </Link>

              <Link href={"./Products"}>
                <div
                  style={{
                    backgroundColor: "#3f0097",
                    color: "#fff",
                    borderLeft: "5px solid #010058af",
                    textDecoration: "none",
                  }}
                  className="nav-option option4"
                >
                  <Image
                width={30}
                height={30}

                    src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/6.png"
                    className="nav-Image
                width={30}
                height={30}
"
                    alt="institution"
                  />
                  <h3> Products</h3>
                </div>
              </Link>
              <Link href={"./Feedback"}>
              <div className="nav-option option5" style={{
                    backgroundColor: "#fff",
                    color: "#3f0097",
                    border: "none",
                  }}>
                <Image
                width={30}
                height={30}

                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183323/10.png"
                  className="nav-Image
                width={30}
                height={30}
"
                  alt="blog"
                />
                <h3> FeedBack</h3>
              </div>
              </Link>

              <Link href={"./Contactus"}>
              <div className="nav-option option6">
                <Image
                width={30}
                height={30}
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/4.png"
                  className="nav-Image
                width={30}
                height={30}
"
                  alt="settings"
                />
                <h3> ContactUS</h3>
              </div>
</Link>

            </div>
          </nav>
        </div>
        <div className="main">
          <div className="searchbar2">
            <input type="text" name="" id="" placeholder="Search" />
            <div className="searchbtn">
              <Image
                width={30}
                height={30}

                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
                className="icn srchicn"
                alt="search-button"
              />
            </div>
          </div>

          <div className="report-container">
            <div className="report-header">
              <h1 className="recent-Articles">Products</h1>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Details</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {product.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <Image
                width={30}
                height={30}

                        src={`http://localhost:3001/uploads/${item.imagePath}`}
                        alt={item.imagePath}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>{item.details}</td>
                    <td className="action-buttons">
                      <Link href={{
                        pathname: './Products/Edit',
                        query:{
                          ID:item._id,
                          Image: item.imagePath,
                          Title: item.title,
                          Detail: item.details,
                          Category: item.category,
                          Price: item.price,  
                        },
                      }} className="btn">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(item._id)} className="btn btn-delete">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

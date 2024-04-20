"use client";
import "../style.css";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [clientdata, setclientdata] = useState();
  const [status, setstatus] = useState("false");
  useEffect(() => {
    try {
      setclientdata(JSON.parse(Cookies.get("clientinfo")));
      setstatus(Cookies.get("userlogged"));
    } catch (error) {
      console.log("Cookies is not set or defiend yet !!", error);
    }
  }, []);
  // console.log(clientdata);

  useEffect(() => {
    const video = document.getElementById("video");
    video.pause();
    video.addEventListener("canplay", function () {
      setTimeout(function () {
        video.play();
      }, 500);
    });
  }, []);

  function shownav() {
    var element = document.querySelector(".nav_con");
    element.classList.toggle("toggleclass");
  }
  function profile_open() {
    document.querySelector(".account-con").style.left = "76%";
  }
  function profile_close() {
    document.querySelector(".account-con").style.left = "100%";
  }

  const filterButtons = document.querySelectorAll('.category button');
  const items = document.querySelectorAll('#card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
  
        items.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'All' || itemCategory === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
  });
  



  // LogoutHAndle
  function LogoutHandle() {
    Cookies.remove("userlogged");
    Cookies.remove("clientinfo");
    router.push('/Registration')
  }
  const [itemData, updateitemData] = useState([])

  const fetchItemData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products");
      updateitemData(response.data);
    } catch (error) {
      console.error("Error fetching items data:", error);
    }
  };  
const inputscroll = () => {
  // items.style.display = 'block';
}
  useEffect(() => {
    fetchItemData();
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter items based on search query
  const filteredItems = itemData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
        <Head>
        <title>NOOR</title>
      </Head>
      <nav>
        <div className="logo">
          <div className="nav">
            <span onClick={shownav}>&#9776;</span>
          </div>

          <video id="video" width="140" autoPlay muted>
            <source src=".\images\Logo.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="nav-searchcon">
            <input
              id="searchbar"
              type="text"
              placeholder="Search Product Here ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={inputscroll}
            />
        </div>
        <Link href="./Cart">
          <FontAwesomeIcon
            icon={faShoppingCart}
            style={{
              fontSize: "30px",
              margin: "16px",
              color: "black",
              cursor: "pointer",
            }}
          />
        </Link>
        <FontAwesomeIcon
          icon={faUser}
          onClick={profile_open}
          style={{
            fontSize: "30px",
            marginRight: "18px",
            cursor: "pointer",
          }}
        />
      </nav>
      <div className="nav_con">
        <span onClick={shownav}>&times;</span>
        <Link href={"./Home"}>HOME</Link>
        <Link href={"./MyOrders"}>My Orders</Link>
        <Link href={"./Contact"}>CONTACT</Link>
        <Link href={"./Feedback"}>FeedBack</Link>
        <Link href={"./Aboutus"}>ABOUT US</Link>
      </div>

      {/* <!-- Banner IMG --> */}
      <div className="banner">
        <video className="banner-animetion" autoPlay muted>
          <source src="./images/NOOR.mp4" type="video/mp4" />
        </video>

        <Image src="/images/model.png" alt="Logo" width={400} height={600} />
        <br /><br /><br /><br />
        <button id="click-btn">Click Here</button>
 
        <div className="banner-floting-con">
          <div className="icons">
            <div className="icon-container bag1">
              <div
                className="icon"
                style={{
                  backgroundImage:
                    "url(https://cdn-icons-png.flaticon.com/512/5258/5258189.png)",
                  width: "50px",
                  height: "50px",
                }}
              ></div>
            </div>

            <div className="icon-container bag2">
              <div
                className="icon"
                style={{
                  backgroundImage:
                    "url(https://cdn-icons-png.flaticon.com/512/120/120006.png)",
                  width: "50px",
                  height: "50px",
                }}
              ></div>
            </div>

            <div className="icon-container bag3">
              <div
                className="icon"
                style={{
                  backgroundImage:
                    "url(https://cdn-icons-png.flaticon.com/512/3301/3301039.png)",
                  width: "40px",
                  height: "40px",
                }}
              ></div>
            </div>

            <div className="icon-container bag4">
              <div
                className="icon"
                style={{
                  backgroundImage:
                    "url(https://cdn-icons-png.flaticon.com/512/868/868041.png)",
                  width: "50px",
                  height: "50px",
                }}
              ></div>
            </div>

            <div className="icon-container bag5">
              <div
                className="icon"
                style={{
                  backgroundImage:
                    "url(https://cdn-icons-png.flaticon.com/512/3301/3301039.png)",
                  width: "35px",
                  height: "35px",
                }}
              ></div>
            </div>

            <div className="icon-container bag6">
              <div
                className="icon"
                style={{
                  backgroundImage:
                    "url(https://cdn-icons-png.flaticon.com/128/272/272539.png)",
                  width: "35px",
                  height: "35px",
                }}
              ></div>
            </div>

            <div className="icon-container bag7">
              <div
                className="icon"
                style={{
                  backgroundImage:
                    "url(https://cdn-icons-png.flaticon.com/512/6734/6734555.png)",
                  width: "30px",
                  height: "30px",
                }}
              ></div>
            </div>

            <div className="icon-container bag8">
              <div
                className="icon"
                style={{
                  backgroundImage:
                    "url(https://cdn-icons-png.flaticon.com/512/1380/1380616.png)",
                  width: "30px",
                  height: "30px",
                }}
              ></div>
            </div>

            <div className="icon-container bag9">
              <div
                className="icon"
                style={{
                  backgroundImage:
                    "url(https://cdn.iconscout.com/icon/premium/png-256-thumb/bags-2-129405.png)",
                  width: "70px",
                  height: "70px",
                }}
              ></div>
            </div>

            <div className="icon-container bag10">
              <div
                className="icon"
                style={{
                  backgroundImage:
                    "url(https://cdn.iconscout.com/icon/premium/png-256-thumb/ladies-hand-bag-1720149-1460885.png)",
                  width: "45px",
                  height: "45px",
                }}
              ></div>
            </div>

            <div className="icon-container bag11">
              <div
                className="icon"
                style={{
                  backgroundImage:
                    "url(https://previews.123rf.com/images/dxinerz/dxinerz1711/dxinerz171100293/90359765-lady-bag-icon.jpg)",
                  width: "15px",
                  height: "15px",
                }}
              ></div>
            </div>

            <div className="icon-container bag12">
              <div
                className="icon"
                style={{
                  backgroundImage:
                    "url(https://cdn-icons-png.flaticon.com/512/547/547280.png)",
                  width: "15px",
                  height: "15px",
                }}
              ></div>
            </div>

            <div className="icon-container bag13">
              <div
                className="icon"
                style={{
                  backgroundImage:
                    "url(https://cdn.iconscout.com/icon/free/png-256/women-bag-1583319-1337129.png)",
                  width: "15px",
                  height: "15px",
                }}
              ></div>
            </div>

            <div className="icon-container bag14">
              <div
                className="icon"
                style={{
                  backgroundImage:
                    "url(https://static.thenounproject.com/png/2229920-200.png)",
                  width: "20px",
                  height: "20px",
                }}
              ></div>
            </div>
          </div>
        </div>
        
      </div>
      <div id="content" className="item-container">
        <h1>
          OUR BEST
          <br /> COLLECTIONS
        </h1>
        <div className="category">
          <button data-category="All">All Categories</button>
          <button data-category="Backpack">Backpack</button>
          <button data-category="Bucket Bag">Bucket Bag</button>
          <button data-category="Plap Bag">Plap Bag</button>
          <button data-category="Baguette Bag">Baguette Bag</button>
          <button data-category="Hand Bag">Hand Bag</button>
        </div>
      </div>

      <div className="account-con">
        <div id="close-btn">
          <span onClick={profile_close}>&times;</span>
          <p>Hello,</p>
        </div>
        <div className="profile_img">
          <Image
            src="/images/output-onlinegiftools.gif"
            alt="Account"
            width={140}
            height={100}
          />
        </div>
        <div className="profile-category">
          <b>Name</b>
          <p>{clientdata?.name}</p>

          <b>Email</b>
          <p>{clientdata?.email}</p>
          <button
            style={{
              textAlign: "center",
              textDecoration: "none",
              fontSize: "16px",
            }}
            id="log_out"
            onClick={LogoutHandle}
          >
            LOG OUT
          </button>
        </div>
      </div>
  <div className="cards-container">
{filteredItems.map((item) => (
        <Link key={item._id} style={{ textDecoration: "none", color: "#000" }} href={{
          pathname: './Detail',
          query: {
            ID: item._id,
            title: item.title,
            category: item.category,
            image: item.imagePath,
            detail: item.details,
            price: item.price,
          }
        }}>
          <div data-category={item.category} id="card">
            <Image id="card-img" src={`http://localhost:3001/uploads/${item.imagePath}`} alt={item.title} width={300} height={300} />
            <div id="card-description">
              <p>{item.title}</p>
              <span>{item.price}</span>
            </div>
          </div>
        </Link>
))}
       </div>


      {/* <div className="about-noor-container">
        <div className="about-noor-desc">
          <h1>NOOR BAG</h1>
          <p>
            The bags available on NOOR may also vary in terms of size, material,
            color, and design. Some bags may be made of leather, canvas, or
            synthetic materials, while others may have unique features such as
            multiple compartments, detachable straps, or RFID-blocking
            technology. The colors and designs may range from classNameic and
            elegant to bold and trendy, depending on the brand and collection.
          </p>
          <br />
          <p>
            To help customers make informed purchase decisions, NOOR may provide
            detailed product descriptions, specifications, and images of each
            bag. They may also offer customer reviews and ratings to give
            shoppers an idea of the quality and user experience of each product.
          </p>
          <br />
          <p>
            Overall, as a bag shopping website, NOOR strives to provide a wide
            selection of bags that cater to various styles, preferences, and
            budgets, while offering a convenient and reliable online shopping
            experience.
          </p>
          <br />
        </div>
        <div className="noor-model">
          <Image width={} style={{ width: "24rem" }} src="images/model1.jpg" alt="" />
          <img
            style={{
              width: "24rem",
              position: "absolute",
              marginTop: "175px",
              marginLeft: "-111px",
              zIndex: "-1",
            }}
            src="images/model2.jpg"
            alt=""
          />
        </div>
      </div> */}

      <footer>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "84%",
          }}
        >
          <Image width={10000} height={500} alt="footer" src="/images/footerimg.png" style={{position:'relative', top:'100%', zIndex:'-1'}} />
          <h2 style={{ margin: "16px", fontSize: "2.5rem" }}>Subscribe</h2>
          <form action="https://formspree.io/f/xgebndgy" method="post">
            <input
              name="email"
              style={{
                width: "300px",
                height: "40px",
                fontSize: "14px",
                marginBottom: "14px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                paddingLeft: "6px",
              }}
              type="email"
              placeholder="Email Address"
            />
            <br />
            <input
              type="hidden"
              name="message"
              value="Thanks For Subscribing"
            />
            <button
              type="submit"
              value="submit"
              style={{
                width: "140px",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "40px",
                border: "1px solid #fff",
                backgroundColor: "#ff5517",
                color: "#fff",
              }}
            >
              Submit
            </button>
          </form>
        </div>
        <div>
          <a
            style={{ color: "#fff", textDecoration: "none", margin: "4px" }}
            href="/"
          >
            Home
          </a>
          <a
            style={{
              color: "#fff",
              textDecoration: "none",
              margin: "4px",
              fontSize: "14px",
            }}
            href="contactus.php"
          >
            Contact
          </a>
          <a
            style={{
              color: "#fff",
              textDecoration: "none",
              margin: "4px",
              fontSize: "14px",
            }}
            href="#"
          >
            Service
          </a>
          <a
            style={{
              color: "#fff",
              textDecoration: "none",
              margin: "4px",
              fontSize: "14px",
            }}
            href="#"
          >
            Top of page
          </a>
        </div>
        <div style={{ fontSize: "12px", marginTop: "10px" }}>
          Copyright © <span id="spanyear"> </span> Noor, LLC. All rights
          reserved.
        </div>
      </footer>
    </>
  );
}

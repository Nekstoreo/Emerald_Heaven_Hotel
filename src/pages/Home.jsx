import React from "react";
import { Link } from 'react-router-dom';

function Index() {
  return (
    <div>
      {/* Banner Section */}
      <section className="banner">
        <div className="content">
          <div className="title">Emerald Haven</div>
          <div className="top-subtitle subtitle">Best Memories Start Here</div>
        </div>
        <div className="search-box">
          <div className="input-box">
            <p>Location</p>
            <input type="text" name="" id="" placeholder="Delhi" />
          </div>
          <div className="input-box">
            <p>Check-In Date</p>
            <input type="date" name="" id="" placeholder="01/01/2021" />
          </div>
          <div className="input-box">
            <p>Guests</p>
            <input type="number" name="" id="" placeholder="100" />
          </div>
          <div className="input-box">
            <br />

                        <span className="inline-flex rounded-md shadow-sm">
                          <Link
                            to="/book"
                            style={{
                              padding: "12px 15px 12px 15px",
                              fontSize: "17px",
                              fontFamily: "Inter",
                            }}
                            className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Book now
                          </Link>
                        </span>
            <br />
          </div>
        </div>
      </section>
      {/* About Section */}
      <section
        className="text-gray-600 body-font"
        id="about"
        style={{ fontFamily: "Inter", marginTop: "12%" }}
      >
        <div
          className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center"
          style={{ margin: "auto", width: "70%" }}
        >
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bHV4dXJ5JTIwcmVzb3J0fGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="sec-head">About Us</h1>
            <p className="mb-8 leading-relaxed" style={{ width: "auto" }}>
              Over the last 25 years, Emerald Haven organisation has been known
              for dependably providing the best Colombian hospitality
              experience. It combines modern style and comfort with the warmth
              of Old World hospitality. With more than 50 hotels and resorts
              across the world, it is one of the world's largest hotel chains.
              We believe in the values of Colombian hospitality, and our crew is
              our most valuable asset, providing passionate and memorable
              hospitality to everyone we meet.
            </p>
            <div className="flex justify-center">
              <span className="inline-flex rounded-md shadow-sm">
                <a
                  href="pages/team.html"
                  className="button button__header focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Know More
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Section */}
      <section className="hotels" id="hotels">
        <h1 className="sec-head" id="hotels-head">
          Our Hotels
        </h1>
      </section>
      <div className="wrapper">
        <div className="carousel owl-carousel">
          <div className="card card-1"></div>
          <div className="card card-2"></div>
          <div className="card card-3"></div>
          <div className="card card-4"></div>
          <div className="card card-5"></div>
          <div className="card card-6"></div>
          <div className="card card-7"></div>
          <div className="card card-8"></div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="vision">
        <div className="row">
          <div className="column">
            <div className="vision-column">
              <h1 className="sec-head">Our Vision</h1>
              <p>
                Emerald Haven shall be the world's largest and best hotel and
                resort chain, with upscale, mid-scale, and budget properties. We
                will be dedicated to ensuring the well-being and self-worth of
                our coworkers, who are vital to our success. Making a difference
                in our community and in India as a whole. Our fundamental reason
                for being is to delight our guests, whose comfort, safety,
                security, and well-being are our primary concerns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <h1
        className="sec-head"
        style={{ textAlign: "center", margin: "40px", marginTop: "100px" }}
      >
        Testimonials
      </h1>
      <div className="wrapper-rev">
        <div className="box">
          <i className="bx bxs-quote-left quote"></i>
          <p>
            Beyond 5 stars! Stayed last week at this wonderful hotel. Everything
            exceeds ones wildest dream of a hotel. On top they have the most
            wonderful staff, extremely kind and helpful with every wish.
          </p>
          <div className="content">
            <div className="info">
              <div className="name">Oshane Smith</div>
              <div className="stars">
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
              </div>
            </div>
            <div className="image">
              <img
                src="https://png.pngtree.com/png-vector/20190930/ourlarge/pngtree-hooded-computer-hacker-with-laptop-icon-png-image_1762179.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="box">
          <i className="bx bxs-quote-left quote"></i>
          <p>
            This is indeed a place you do not want to leave, and when you do it
            is with one hope to come back. Everything was great, staff was very
            helpful and we were extremely happy with the meeting!
          </p>
          <div className="content">
            <div className="info">
              <div className="name">Rajesh Singh</div>
              <div className="stars">
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bx-star"></i>
              </div>
            </div>
            <div className="image">
              <img
                src="https://png.pngtree.com/png-vector/20190930/ourlarge/pngtree-hooded-computer-hacker-with-laptop-icon-png-image_1762179.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="box">
          <i className="bx bxs-quote-left quote"></i>
          <p>
            The service here has just been fantastic; whatever we needed was
            brought to us right away. The food was so delicious; the entire
            experience was really great. A must stay hotel for everyone.
          </p>
          <div className="content">
            <div className="info">
              <div className="name">Khushi Mittal</div>
              <div className="stars">
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star-half"></i>
              </div>
            </div>
            <div className="image">
              <img
                src="https://png.pngtree.com/png-vector/20190930/ourlarge/pngtree-hooded-computer-hacker-with-laptop-icon-png-image_1762179.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="text-gray-100 px-8 py-12" style={{ fontFamily: "Inter" }}>
        <div className="text-center w-full"></div>
        <div className="max-w-screen-xl mt-24 px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto bg-gray-100 text-gray-900 rounded-lg">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="sec-head">Contact Us</h2>
              <img
                src="assets/img/contact.svg"
                style={{ marginTop: "50px", paddingRight: "50px" }}
                alt=""
              />
            </div>
          </div>
          <div className="">
            <div>
              <span className="uppercase text-sm text-gray-600 font-bold">
                Full Name
              </span>
              <input
                className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                placeholder=""
              />
            </div>
            <div className="mt-8">
              <span className="uppercase text-sm text-gray-600 font-bold">
                Email
              </span>
              <input
                className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
              />
            </div>
            <div className="mt-8">
              <span className="uppercase text-sm text-gray-600 font-bold">
                Message
              </span>
              <textarea className="w-full h-32 bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"></textarea>
            </div>
            <div className="mt-8">
              <button className="uppercase text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Index;

import React from "react";
import styles from "./Dining.module.css";

function Dining() {
  return (
    <div>
      {/* <!-- Banner Section --> */}
      <section class="banner" style={{ height: "85vh" }}>
        <div class="content">
          <div class="title">Dining</div>
          <div class="top-subtitle subtitle">Emerald Haven</div>
        </div>
      </section>

      {/* <!-- Dining Section --> */}
      <h1 class="sec-head" style={{ textAlign: "center", marginTop: "100px" }}>
        Taste the difference
      </h1>
      <div
        style={{
          textAlign: "justify",
          fontFamily: "Inter",
          fontSize: "18px",
          width: "60%",
          margin: "auto",
          marginTop: "10px",
        }}
      >
        When you dine at one of our restaurants, you will be treated to great
        dining and "futuristic cuisine". The restaurant provides a stylish
        environment for your next lunch or dinner, with sumptuous seating and
        aesthetic details.
      </div>
      <div class="py-1" style={{ fontFamily: "Inter", marginTop: "70px" }}>
        <div
          class="container"
          style={{ paddingRight: "100px", paddingLeft: "100px" }}
        >
          <div style={{ margin: "auto" }}>
            {/* <!-- Order Section --> */}
            <h1
              class="sec-head"
              style={{
                textAlign: "center",
                marginTop: "100px",
                marginBottom: "60px",
              }}
            >
              Order Now
            </h1>
            <div className={styles["big"]}>
              <article className={styles["recipe"]}>
                <div className={styles["pizza-box"]}>
                  <img
                    src="https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216054.jpg"
                    width="1500"
                    height="1368"
                    alt=""
                  />
                </div>
                <div className={styles["recipe-content"]}>
                  <h1 className={styles["recipe-title"]}>
                    <a href="/#"> Pepperoni Pan Pizza</a>
                  </h1>
                  <p className={styles["recipe-metadata"]}>
                    <span className={styles["recipe-rating"]}>
                      ★★★★<span>☆</span>
                    </span>
                    <span className={styles["recipe-votes"]}>
                      {" "}
                      (54 votes)
                    </span>
                  </p>
                  <p className={styles["recipe-desc"]}>
                    This pepperoni pan pizza is made with a simple yet
                    superlative from-scratch tomato sauce, two types of
                    mozzarella, Parmesan cheese, pepperoni, and either
                    store-bought or homemade dough.
                  </p>
                  <br />
                  <button className={styles["recipe-save"]} type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#000000"
                    >
                      <path
                        d="M 6.0097656 2 C 4.9143111 2 4.0097656 2.9025988 4.0097656 3.9980469 L 4 22 L 12 19 L 20 22 L 20 20.556641 L 20 4 C 20 2.9069372 19.093063 2 18 2 L 6.0097656 2 z M 6.0097656 4 L 18 4 L 18 19.113281 L 12 16.863281 L 6.0019531 19.113281 L 6.0097656 4 z"
                        fill="currentColor"
                      />
                    </svg>
                    Order
                  </button>
                </div>
              </article>
              <br />
              <br />
              <article className={styles["recipe"]}>
                <div className={styles["pizza-box"]}>
                  <img
                    src="https://media.istockphoto.com/photos/lasagna-on-a-square-white-plate-picture-id535851351?k=20&m=535851351&s=612x612&w=0&h=jdWOk9G_OOzHvPrvFrigqzk3EoucmIhUZr1-ey9NcGM="
                    width="1500"
                    height="1368"
                    alt=""
                  />
                </div>
                <div cclassName={styles["recipe-content"]}>
                  <h1 className={styles["recipe-title"]}>
                    <a href="/#"> Lasagne</a>
                  </h1>
                  <p className={styles["recipe-metadata"]}>
                    <span className={styles["recipe-rating"]}>
                      ★★★★<span>☆</span>
                    </span>
                    <span className={styles["recipe-votes"]}>(54 votes)</span>
                  </p>
                  <p className={styles["recipe-desc"]}>
                    Lasagne are a type of pasta, possibly one of the oldest
                    types, made of very wide, flat sheets. Either term can
                    also refer to an Italian dish made of stacked layers of
                    lasagne alternating with fillings.
                  </p>
                  <br />
                  <button className={styles["recipe-save"]} type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#000000"
                    >
                      <path
                        d="M 6.0097656 2 C 4.9143111 2 4.0097656 2.9025988 4.0097656 3.9980469 L 4 22 L 12 19 L 20 22 L 20 20.556641 L 20 4 C 20 2.9069372 19.093063 2 18 2 L 6.0097656 2 z M 6.0097656 4 L 18 4 L 18 19.113281 L 12 16.863281 L 6.0019531 19.113281 L 6.0097656 4 z"
                        fill="currentColor"
                      />
                    </svg>
                    Order
                  </button>
                </div>
              </article>
              <br />
              <br />
              <article className={styles["recipe"]}>
                <div className={styles["pizza-box"]}>
                  <img
                    src="https://www.curiouscuisiniere.com/wp-content/uploads/2013/06/Japanese-Sushi-0458.450-450x270.jpg"
                    width="1500"
                    height="1368"
                    alt=""
                  />
                </div>
                <div className={styles["recipe-content"]}>
                  <h1 className={styles["recipe-title"]}>
                    <a href="/#"> Sushi</a>
                  </h1>
                  <p className={styles["recipe-metadata"]}>
                    <span className={styles["recipe-rating"]}>
                      ★★★★<span>☆</span>
                    </span>
                    <span className={styles["recipe-votes"]}>(54 votes)</span>
                  </p>
                  <p className={styles["recipe-desc"]}>
                    Sushi, a staple rice dish of Japanese cuisine, consisting
                    of cooked rice flavoured with vinegar and a variety of
                    vegetable, egg, or raw seafood garnishes and served cold.
                  </p>
                  <br />
                  <button className={styles["recipe-save"]} type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#000000"
                    >
                      <path
                        d="M 6.0097656 2 C 4.9143111 2 4.0097656 2.9025988 4.0097656 3.9980469 L 4 22 L 12 19 L 20 22 L 20 20.556641 L 20 4 C 20 2.9069372 19.093063 2 18 2 L 6.0097656 2 z M 6.0097656 4 L 18 4 L 18 19.113281 L 12 16.863281 L 6.0019531 19.113281 L 6.0097656 4 z"
                        fill="currentColor"
                      />
                    </svg>
                    Order
                  </button>
                </div>
              </article>
              <br />
              <br />
              <article className={styles["recipe"]}>
                <div className={styles["pizza-box"]}>
                  <img
                    src="https://lp-cms-production.imgix.net/image_browser/tacos_mexico_G.jpg"
                    width="1500"
                    height="1368"
                    alt=""
                  />
                </div>
                <div className={styles["recipe-content"]}>
                  <h1 className={styles["recipe-title"]}>
                    <a href="/#">Mexican Tacos</a>
                  </h1>
                  <p className={styles["recipe-metadata"]}>
                    <span className={styles["recipe-rating"]}>
                      ★★★★<span>☆</span>
                    </span>
                    <span className={styles["recipe-votes"]}>(54 votes)</span>
                  </p>
                  <p className={styles["recipe-desc"]}>
                    A taco is a traditional Mexican dish consisting of a small
                    hand-sized corn or wheat tortilla topped with a filling.
                    The tortilla is then folded around the filling and eaten
                    by hand.
                  </p>
                  <br />
                  <button className={styles["recipe-save"]} type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#000000"
                    >
                      <path
                        d="M 6.0097656 2 C 4.9143111 2 4.0097656 2.9025988 4.0097656 3.9980469 L 4 22 L 12 19 L 20 22 L 20 20.556641 L 20 4 C 20 2.9069372 19.093063 2 18 2 L 6.0097656 2 z M 6.0097656 4 L 18 4 L 18 19.113281 L 12 16.863281 L 6.0019531 19.113281 L 6.0097656 4 z"
                        fill="currentColor"
                      />
                    </svg>
                    Order
                  </button>
                </div>
              </article>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dining;

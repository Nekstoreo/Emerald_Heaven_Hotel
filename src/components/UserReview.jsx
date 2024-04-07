import React from 'react';

const UserReview = ({ quote, content, name, stars, image }) => {
  return (
    <div className="box">
      <i className="bx bxs-quote-left quote"></i>
      <p>{quote}</p>
      <div className="content">
        <div className="info">
          <div className="name">{name}</div>
          <div className="stars">
            {stars.map((star, index) => (
              <i key={index} className={`bx ${star}`}></i>
            ))}
          </div>
        </div>
        <div className="image">
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default UserReview;

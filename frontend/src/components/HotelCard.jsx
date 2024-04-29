import React from 'react';
import styles from './HotelCard.module.css';

const HotelCard = ({ hotel, handleCheckAvailability }) => {
  const { image, name, location, description, rating, review, reviewCount, price } = hotel;

  return (
    <div className={styles.hotelContainer}>
      <div className={styles.leftContent}>
        <img src={image} alt="Hotel" width="300" height="250" />
      </div>
      <div className={styles.centerContent}>
        <div className={styles.hotelInfo}>
          <h2>{name}</h2>
          <p>{location}</p>
          <p>{description}</p>
        </div>
      </div>
      <div className={styles.rightContent}>
        <div className={styles.hotelRating}>
          <p>Rating: {rating}</p>
          <p>Review: {review}</p>
          <p>Review Count: {reviewCount}</p>
        </div>
        <p>Prices starting from {price} per night</p>
        <button className={styles.viewAvailabilityBtn} onClick={() => handleCheckAvailability(name)}>
          Check availability
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
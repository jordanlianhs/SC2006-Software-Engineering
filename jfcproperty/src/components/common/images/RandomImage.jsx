import React from "react";
import getImageUrls from "./GetImageUrls";

const RandomImage = ({ images }) => {
    const imageUrls = getImageUrls(images, "/assets/images/property/rand/");
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    const imageUrl = imageUrls[randomIndex];
  
    return <img src={imageUrl} alt="" />;
};

export default RandomImage;
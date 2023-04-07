import React, { useState, useEffect } from "react";
import axios from "axios";

const ResaleFlatImage = ({ flat }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await axios.get(
          `https://source.unsplash.com/1600x900/?${flat.flatType} ?{flat.blockNumber}}`
        );
        setImage(response.config.url);
      } catch (error) {
        console.log(error);
      }
    }

    fetchImage();
  }, [flat.flatType]);

  if (!image) {
    return <div>Loading...</div>;
  }

  return (
    <img
      src={image}
      alt={`${flat.blockNumber} ${flat.streetName}`}
      className="img-fluid"
    />
  );
};

export default ResaleFlatImage;
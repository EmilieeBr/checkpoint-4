import React, { useState, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AjoutArticle() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    // Create an object with the data to be sent to the database
    const newArticle = {
      picture: url,
      title,
      description,
      price,
    };

    // Make a POST request to your API endpoint to save the new article
    axios
      .post(`${import.meta.env.VITE_BASE_API}/articles`, newArticle)
      .then(() => {
        // The request was successful, show the popup notification
        setShowPopup(true);
        // Reset the input fields after saving the article
        setUrl("");
        setTitle("");
        setDescription("");
        setPrice("");
      })
      .catch((error) => {
        console.error(error);
        // Handle errors if needed
      });
  };

  useEffect(() => {
    if (showPopup) {
      const timeoutId = setTimeout(() => {
        setShowPopup(false);
        navigate("/"); // Navigate back to the homepage after the popup is closed
      }, 3000); // Change the value (in milliseconds) to adjust the popup duration
      return () => clearTimeout(timeoutId);
    }
    // Add a default cleanup function here in case showPopup is false
    return () => {};
  }, [showPopup, navigate]);
  return (
    <div className="container-form">
      <h1 className="title-add-article">Ajouter un article</h1>
      <form className="container-input">
        <input
          type="text"
          className="add-url"
          name="url"
          placeholder="Collez l'URL de l'image"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          type="text"
          className="add-title"
          name="title"
          placeholder="Titre de l'article"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="text"
          className="add-description"
          name="description"
          placeholder="Ajouter une description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          className="add-price"
          name="price"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="button" onClick={handleSave}>
          Sauvegarder
        </button>

        {/* Popup notification */}
        {showPopup && <div className="popup">Article saved successfully!</div>}
      </form>
    </div>
  );
}

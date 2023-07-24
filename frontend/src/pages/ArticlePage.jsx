import React, { useEffect, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useParams, useNavigate } from "react-router-dom";
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";
import Crayon from "../assets/pictures/crayon.png";
import Croix from "../assets/pictures/croix-rouge.png";

function ArticlePage() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Charger les données de l'article au chargement de la page
    axios
      .get(`${import.meta.env.VITE_BASE_API}/articles/${id}`)
      .then((response) => {
        setData(response.data);
        setUpdatedData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleEditMode = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    // Si les données ont été modifiées, effectuer la mise à jour
    if (
      updatedData.title !== data.title ||
      updatedData.description !== data.description ||
      updatedData.price !== data.price
    ) {
      axios
        .put(`${import.meta.env.VITE_BASE_API}/articles/${id}`, updatedData)
        .then(() => {
          // Mise à jour réussie, mettre à jour l'état "data" avec les nouvelles données de l'article
          setData(updatedData);
          // Sortir du mode d'édition après la mise à jour
          setIsEditMode(false);
        })
        .catch((error) => {
          console.error(error);
          // Gérer les erreurs de mise à jour ici si nécessaire
        });
    } else {
      // Aucune modification, simplement sortir du mode d'édition
      setIsEditMode(false);
    }
  };

  const handleDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_BASE_API}/articles/${id}`)
      .then(() => {
        // Suppression réussie, naviguer vers la page d'accueil après la suppression
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        // Gérer les erreurs de suppression ici si nécessaire
      });
  };

  const handleChange = (e) => {
    // Mettre à jour les données de l'article en fonction de l'input modifié
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      {Object.keys(data).length > 0 && (
        <div className="article">
          <div className="container-img-p">
            <img className="img-article" src={data.picture} alt="article" />
            <div className={`container-article ${isEditMode ? "is_edit" : ""}`}>
              <input
                type="text"
                className="article-title"
                name="title"
                value={updatedData.title}
                onChange={handleChange}
                disabled={!isEditMode} // Disable input when not in edit mode
              />
              <textarea
                type="text"
                className="article-description"
                name="description"
                value={updatedData.description}
                onChange={handleChange}
                disabled={!isEditMode}
                size="300"
                maxLength="500" // Disable input when not in edit mode
              />
              <div className="container-price">
                <input
                  type="number"
                  className="article-price"
                  name="price"
                  value={updatedData.price}
                  onChange={handleChange}
                  disabled={!isEditMode} // Disable input when not in edit mode
                />
                <p className="euros">€</p>
              </div>
              <div className="container-button">
                {!isEditMode && (
                  <button
                    type="button"
                    className="button-modifier"
                    onClick={handleEditMode}
                  >
                    Modifier l'article
                    <img className="crayon" src={Crayon} alt="" />
                  </button>
                )}
                {isEditMode && (
                  <>
                    <button
                      type="button"
                      className="button-save"
                      onClick={handleSave}
                    >
                      Sauvegarder
                    </button>
                    <button
                      type="button"
                      className="button-annuler"
                      onClick={() => {
                        // Annuler les modifications et réinitialiser les données aux valeurs initiales
                        setIsEditMode(false);
                        setUpdatedData(data);
                      }}
                    >
                      Annuler
                    </button>
                  </>
                )}
                <button
                  type="button"
                  className="button-supprimer"
                  onClick={handleDelete}
                >
                  Supprimer l'article
                  <img className="croix" src={Croix} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticlePage;

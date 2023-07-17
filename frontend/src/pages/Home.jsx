import React, { useEffect, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";
import Logo from "../assets/pictures/logo.png";
import Article from "../components/Article";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_API}/articles`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(data);
  return (
    <div className="container-home">
      <div className="container-img">
        <img className="logo-home" src={Logo} alt="logo" />
      </div>
      <div className="container-articles">
        {data.map((article) => (
          <Article article={article} />
        ))}
      </div>
    </div>
  );
}

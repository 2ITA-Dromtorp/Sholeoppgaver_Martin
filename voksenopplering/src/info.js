import React from "react";
import { Link, useParams } from "react-router-dom";
import json from "./fag";

const Info = () => {
  const { fag } = useParams();
  let jsonIndex;

  for (let i in json.kursinfo) {
    if (json.kursinfo[i].kursnavn.toLowerCase() === fag.toLowerCase()) {
      jsonIndex = i;
    }
  }

  const infoContainerStyle = {
    padding: "20px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    margin: "20px",
  };

  const titleStyle = {
    color: "#3498db",
    fontSize: "2.5em",
    marginBottom: "10px",
  };

  const homeButtonContainerStyle = {
    marginBottom: "20px",
  };

  const homeButtonStyle = {
    textDecoration: "none",
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "#fff",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
    display: "inline-block",
    fontSize: "1.2em",
  };

  const boxStyle = {
    border: "2px solid #3498db",
    borderRadius: "8px",
    padding: "20px",
    marginTop: "20px",
  };

  return (
    <div style={infoContainerStyle}>
      <div style={homeButtonContainerStyle}>
        <Link to="/" style={homeButtonStyle}>
          Home
        </Link>
      </div>
      <div style={boxStyle}>
        <h1 style={titleStyle}>{json.kursinfo[jsonIndex].kursnavn}</h1>
        <p>{json.kursinfo[jsonIndex].info}</p>
      </div>
    </div>
  );
};

export default Info;

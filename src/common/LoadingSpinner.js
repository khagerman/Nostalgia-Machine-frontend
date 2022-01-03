import React from "react";
import "./LoadingSpinner.css";

/** Loading spinner used by components that fetch API data. */

function LoadingSpinner() {
  return (
    <div className="LoadingSpinner">
      <h2 className="fas fa-spinner"></h2>
    </div>
  );
}

export default LoadingSpinner;

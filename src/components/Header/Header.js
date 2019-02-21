import React from "react";
import "./Header.css";

const Header = () => {
  let now, month, months, year, monthYear;
  now = new Date();
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Novemeber",
    "December"
  ];
  month = months[now.getMonth()];
  year = now.getFullYear();
  monthYear = `${month}, ${year}`;

  return (
    <header className="Header">
      <div>
        <h1>Account balance </h1>
        <h4 className="Heading">{monthYear}</h4>
      </div>
    </header>
  );
};

export default Header;

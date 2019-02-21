import React from "react";

import "./Balance.css";
const Balance = ({ balanceApp }) => {
  const formatNumber = num => {
    let numSplit, intPart, decimalPart, result;
    num = num.toFixed(2);
    numSplit = num.split(".");
    intPart = numSplit[0];
    // Add ',' to seperate thousand
    if (intPart.length > 6) {
      intPart = `${intPart.substring(
        0,
        intPart.length - 6
      )} ${intPart.substring(
        intPart.length - 6,
        intPart.length - 3
      )} ${intPart.substring(intPart.length - 3, intPart.length)}`;
    } else if (intPart.length > 3) {
      intPart = `${intPart.substring(
        0,
        intPart.length - 3
      )} ${intPart.substring(intPart.length - 3, intPart.length)}`;
    }
    decimalPart = numSplit[1];
    num > 0
      ? (result = `+${intPart}.${decimalPart}`)
      : (result = `${intPart}.${decimalPart}`);
    return result;
  };

  const changeColor = number => {
    if (number > 0) {
      return "green";
    } else if (number < 0) {
      return "red";
    } else {
      return "default";
    }
  };

  return (
    <section>
      <div className={`${changeColor(balanceApp)}`}>
        Balance: {`${formatNumber(balanceApp)} €`}
      </div>
    </section>
  );
};

export default Balance;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Transaction.css";

const Transaction = ({
  idItems,
  descriptionItems,
  amountItems,
  dateItems,
  deleteItemItems
}) => (
  <div className="transaction">
    <div>
      <p>{dateItems}</p>
      <p className="">{descriptionItems}</p>
    </div>
    <p className="">{amountItems}</p>
    <button className="btn" onClick={() => deleteItemItems(idItems)}>
      <FontAwesomeIcon className="icon-delete" icon={faTrash} />
    </button>
  </div>
);

export default Transaction;

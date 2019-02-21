import React from "react";

import "./InputField.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, lg } from "@fortawesome/free-solid-svg-icons";

const InputField = ({
  selectChangeApp,
  selectTypeApp,
  descriptionValueApp,
  amountValueApp,
  changedDescriptionValueApp,
  changedAmountValueApp,
  clickedAddItemApp
}) => {
  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <section>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="InputField-wrapper">
            <select onChange={selectChangeApp} className="selectOption">
              <option value={selectTypeApp}>Income</option>
              <option value={selectTypeApp}>Expense</option>
            </select>

            <input
              type="text"
              className="description"
              placeholder="  Description"
              value={descriptionValueApp}
              onChange={changedDescriptionValueApp}
              required
            />

            <input
              className="description"
              type="number"
              placeholder="  Value"
              value={amountValueApp}
              onChange={changedAmountValueApp}
              required
            />

            <button className="btn" onClick={clickedAddItemApp}>
              <FontAwesomeIcon className="icon" icon={faPlusCircle} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default InputField;

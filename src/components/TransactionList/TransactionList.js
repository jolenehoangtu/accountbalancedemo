import React from "react";

import "./TransactionList.css";
import Transaction from "./Transaction/Transaction";

const TransactionList = ({
  incomeDataApp,
  expensesDataApp,
  totalIncomeApp,
  totalExpensesApp,
  deleteItemApp
}) => {
  const formatNumber = (num, type) => {
    let numSplit, intPart, decimalPart, sign, result;

    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split(".");
    intPart = numSplit[0];

    // Add ',' to seperate thousand 100,000
    if (intPart.length > 6) {
      intPart = `${intPart.substring(
        0,
        intPart.length - 6
      )},${intPart.substring(
        intPart.length - 6,
        intPart.length - 3
      )},${intPart.substring(intPart.length - 3, intPart.length)}`;
    } else if (intPart.length > 3) {
      intPart = `${intPart.substring(
        0,
        intPart.length - 3
      )},${intPart.substring(intPart.length - 3, intPart.length)}`;
    }
    decimalPart = numSplit[1];

    type === "income" ? (sign = "+") : (sign = "-");

    num > 0
      ? (result = `${sign} ${intPart}.${decimalPart}`)
      : (result = `${intPart}.${decimalPart}`);
    return result;
  };

  return (
    <section>
      <div className="container js-event-delagation">
        <div className="wrapper">
          <div className="Income-wrapper">
            <h4 className="title-income">INCOME</h4>
            <div>
              {incomeDataApp.map(income => {
                return (
                  <Transaction
                    key={income.id}
                    idItems={`income-${income.id}`}
                    dateItems={`${income.date}`}
                    descriptionItems={income.description}
                    amountItems={`${formatNumber(income.amount, "income")} €`}
                    deleteItemItems={deleteItemApp}
                  />
                );
              })}
            </div>

            <div className="total">
              <p>Total income: </p>
              <p className="">
                {`${formatNumber(totalIncomeApp, "income")} €`}
              </p>
            </div>
          </div>

          <div className="Expense-wrapper">
            <h4 className="title-expense">EXPENSE</h4>
            <div className="">
              {expensesDataApp.map(expense => {
                return (
                  <Transaction
                    key={expense.id}
                    idItems={`expense-${expense.id}`}
                    dateItems={`${expense.date}`}
                    descriptionItems={expense.description}
                    amountItems={`${formatNumber(expense.amount, "expense")} €`}
                    deleteItemItems={deleteItemApp}
                  />
                );
              })}
            </div>

            <div className="total">
              <p>Total expenses: </p>
              <p className="">
                {`${formatNumber(totalExpensesApp, "expense")} €`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionList;

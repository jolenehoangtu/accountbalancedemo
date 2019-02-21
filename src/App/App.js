import React, { Component } from "react";
import Header from "../components/Header/Header";
import InputField from "../components/InputField/InputField";
import Balance from "../components/Balance/Balance";
import TransactionList from "../components/TransactionList/TransactionList";

import "./App.css";

class App extends Component {
  state = {
    type: "income",
    descriptionValue: "",
    amountValue: "",
    data: {
      allItems: {
        income: [],
        expense: []
      },
      totals: {
        income: 0,
        expense: 0
      },
      balance: 0
    }
  };

  displayDate = () => {
    let today = new Date();
    let datestring = `
      ${today.toLocaleDateString("en-FI")}
      ${today.getHours()}:${today.getMinutes()}
    `;
    return datestring;
  };

  calculateTotal = type => {
    let sum = 0;
    let newData = this.state.data;

    sum = this.state.data.allItems[type].reduce((accummulator, currValue) => {
      accummulator += parseFloat(currValue.amount);
      return accummulator;
    }, 0);
    let totalsType = (newData.totals[type] = sum);
    this.setState({ data: newData });
  };

  calculateBalance = () => {
    let total = 0;
    let newData = this.state.data;
    total = this.state.data.totals.income - this.state.data.totals.expense;
    let balance = (newData.balance = total);
    this.setState({ data: newData });
  };

  addItem = () => {
    if (
      this.state.descriptionValue !== "" &&
      !isNaN(this.state.amountValue) &&
      this.state.amountValue > 0
    ) {
      let newItem, itemID;
      // Create item's ID
      if (this.state.data.allItems[this.state.type].length > 0) {
        itemID =
          this.state.data.allItems[this.state.type][
            this.state.data.allItems[this.state.type].length - 1
          ].id + 1;
      } else {
        itemID = 0;
      }
      // Capitalized first letter of description
      const descriptionCapitalized =
        this.state.descriptionValue.charAt(0).toUpperCase() +
        this.state.descriptionValue.slice(1);
      // Add new item into its respective position
      if (this.state.type === "income") {
        newItem = {
          id: itemID,
          date: this.displayDate(),
          description: descriptionCapitalized,
          amount: this.state.amountValue
        };
      } else if (this.state.type === "expense") {
        newItem = {
          id: itemID,
          date: this.displayDate(),
          description: descriptionCapitalized,
          amount: this.state.amountValue
        };
      }
      this.state.data.allItems[this.state.type].push(newItem);

      // Clear input fields
      this.setState({ descriptionValue: "", amountValue: "" });
      // Calculate totals income and expenses
      this.calculateTotal("income");
      this.calculateTotal("expense");
      // Calculate balance
      this.calculateBalance();
    }
  };

  deleteItem = (type, id) => {
    let itemIDIndex;
    // Store ids of all remaining items
    const ids = this.state.data.allItems[type].map(currItem => {
      return currItem.id;
    });
    // Find the index number of current target
    itemIDIndex = ids.indexOf(id);
    // Delete the target if it's still inside the array
    if (itemIDIndex !== -1) {
      this.state.data.allItems[type].splice(itemIDIndex, 1);
    }
  };

  changedTypeHandler = () => {
    if (this.state.type === "income") {
      this.setState({ type: "expense" });
    } else if (this.state.type === "expense") {
      this.setState({ type: "income" });
    }
  };

  changedDescriptionValueHandler = event => {
    this.setState({ descriptionValue: event.target.value });
  };

  changedAmountValueHandler = event => {
    this.setState({ amountValue: event.target.value });
  };

  clickedAddItemHandler = () => {
    this.addItem();
  };

  clickDeleteItem = itemID => {
    let type, id;

    const typeIDArr = itemID.split("-");
    type = typeIDArr[0];
    id = parseInt(typeIDArr[1]);
    this.deleteItem(type, id);
    // Calculate totals income and expenses
    this.calculateTotal("income");
    this.calculateTotal("expense");
    // Calculate balance
    this.calculateBalance();
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <main>
          <InputField
            selectTypeApp={this.state.type}
            selectChangeApp={this.changedTypeHandler}
            descriptionValueApp={this.state.descriptionValue}
            amountValueApp={this.state.amountValue}
            changedDescriptionValueApp={this.changedDescriptionValueHandler}
            changedAmountValueApp={this.changedAmountValueHandler}
            clickedAddItemApp={this.clickedAddItemHandler}
            keyPressAddItemApp={this.keyPressAddItemHandler}
          />
          <Balance balanceApp={this.state.data.balance} />
          <TransactionList
            incomeDataApp={this.state.data.allItems.income}
            expensesDataApp={this.state.data.allItems.expense}
            totalIncomeApp={this.state.data.totals.income}
            totalExpensesApp={this.state.data.totals.expense}
            deleteItemApp={this.clickDeleteItem}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;

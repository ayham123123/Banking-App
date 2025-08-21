import React, { useState } from "react";

function CreateAccount() {
  const [initialDeposit, setInitialDeposit] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseColor, setResponseColor] = useState("black");

  function createAccount() {
    const name = accountHolder;
    const deposit = parseFloat(initialDeposit);

    if (!name || isNaN(deposit) || deposit <= 0) {
      setResponseMessage("Please provide valid inputs.");
      setResponseColor("red");
      return;
    }

    fetch("http://localhost:5175/api/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, balance: deposit }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((data) => {
        setResponseMessage(`Account created successfully. Account ID: ${data.id}`);
        setResponseColor("green");
        setAccountHolder("");
        setInitialDeposit("");
      })
      .catch((error) => {
        setResponseMessage(`Error: ${error.message}`);
        setResponseColor("red");
      });
  }

  return (
    <div id="AccountCreation">
      <h2>Create a New Account</h2>

      <label htmlFor="accountHolder">Account Holder Name</label>
      <input
        type="text"
        id="accountHolder"
        placeholder="Enter name"
        value={accountHolder}
        onChange={(e) => setAccountHolder(e.target.value)}
      />

      <label htmlFor="initialDeposit">Initial Deposit</label>
      <input
        type="number"
        id="initialDeposit"
        placeholder="Enter initial deposit"
        value={initialDeposit}
        onChange={(e) => setInitialDeposit(e.target.value)}
      />

      <button onClick={createAccount}>Create Account</button>

      <div
        className="message"
        id="createAccountResponseMessage"
        style={{ color: responseColor, marginTop: "10px" }}
      >
        {responseMessage}
      </div>
    </div>
  );
}

export default CreateAccount;
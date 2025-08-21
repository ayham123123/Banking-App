import React, { useState } from "react";

function Deposit() {
  const [depositAmount, setDepositAmount] = useState("");
  const [depositAccountId, setDepositAccountId] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseColor, setResponseColor] = useState("black");

  function depositToAccount() {
    const amt = parseFloat(depositAmount);

    if (!depositAccountId || isNaN(amt) || amt <= 0) {
      setResponseMessage("Please enter a valid account ID and amount greater than 0.");
      setResponseColor("red");
      return;
    }

    fetch(`http://localhost:8080/api/accounts/${depositAccountId}/deposit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amt }),
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
        setResponseMessage(`Deposit processed successfully. Total Balance: ${data.balance}`);
        setResponseColor("green");
      })
      .catch((error) => {
        setResponseMessage(`Error: ${error.message}`);
        setResponseColor("red");
      });
  }

  return (
    <div id="Deposit">
      <h2>Deposit</h2>

      <label>Account ID</label>
      <input
        type="text"
        value={depositAccountId}
        onChange={(e) => setDepositAccountId(e.target.value)}
        placeholder="Enter account ID"
      />

      <label>Deposit Amount</label>
      <input
        type="number"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        placeholder="Enter amount"
      />

      <button onClick={depositToAccount}>Deposit</button>

      <div className="message" style={{ color: responseColor }}>
        {responseMessage}
      </div>
    </div>
  );
}

export default Deposit;
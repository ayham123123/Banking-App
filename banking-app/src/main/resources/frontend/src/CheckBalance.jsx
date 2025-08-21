import React, { useState } from "react";

function CheckBalance() {
  const [accountId, setAccountId] = useState("");
  const [responseColor, setResponseColor] = useState("black");
  const [responseMessage, setResponseMessage] = useState("");

  function checkBalance() {
    if (!accountId.trim()) {
      setResponseMessage("Please enter an account ID");
      setResponseColor("red");
      return;
    }

    fetch(`http://localhost:5175/api/accounts/${accountId}`)
      .then((response) => {
        if (response.status === 404) {
          throw new Error("Account ID is not valid");
        }
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        setResponseMessage(`Account ID: ${data.id}. Balance: $${data.balance}`);
        setResponseColor("green");
      })
      .catch((error) => {
        setResponseMessage(`Error: ${error.message}`);
        setResponseColor("red");
      });
  }

  return (
    <section id="CheckBalance">
      <h2>Check Balance</h2>
      <label>Account ID</label>
      <input
        type="text"
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
        placeholder="Enter account ID"
      />
      <button onClick={checkBalance}>Check Balance</button>
      <div className="message" style={{ color: responseColor }}>
        {responseMessage}
      </div>
    </section>
  );
}

export default CheckBalance;
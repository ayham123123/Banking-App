import React, { useState } from "react";

function DeleteAccount() {
  const [accountId, setAccountId] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("black");

  function deleteAccount() {
    if (!accountId) {
      setMessage("Please provide a valid account ID.");
      setColor("red");
      return;
    }

    fetch(`http://localhost:8080/api/accounts/${accountId}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.ok) {
          setMessage(`Account with ID ${accountId} deleted successfully.`);
          setColor("green");
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
        setColor("red");
      });
  }

  return (
    <section id="DeleteAccount">
      <h2>Delete Account</h2>
      <label>Account ID</label>
      <input
        type="text"
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
        placeholder="Enter account ID"
      />
      <button onClick={deleteAccount}>Delete Account</button>
      <div className="message" style={{ color }}>{message}</div>
    </section>
  );
}

export default DeleteAccount;
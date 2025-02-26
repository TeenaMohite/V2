import { useState } from "react";

const Transaction = () => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      refCode: "202202-00003",
      client: "Blake, Claire C",
      policy: "987654321 - Commercial Policy1001",
      vehicleRegNo: "8798754564",
      registration: "2022-01-29",
      expiration: "2023-01-29",
      cost: 4000,
    },
  ]);
  const [newTransaction, setNewTransaction] = useState({
    refCode: "",
    client: "",
    policy: "",
    vehicleRegNo: "",
    registration: "",
    expiration: "",
    cost: "",
  });

  const handleAddTransaction = () => {
    if (
      !newTransaction.refCode.trim() ||
      !newTransaction.client.trim() ||
      !newTransaction.policy.trim() ||
      !newTransaction.vehicleRegNo.trim() ||
      !newTransaction.registration ||
      !newTransaction.expiration ||
      !newTransaction.cost.trim()
    ) {
      alert("Please fill all fields!");
      return;
    }

    const costValue = parseFloat(newTransaction.cost);
    if (isNaN(costValue) || costValue <= 0) {
      alert("Please enter a valid cost!");
      return;
    }

    setTransactions([
      ...transactions,
      {
        id: transactions.length + 1,
        ...newTransaction,
        cost: costValue,
      },
    ]);

    setNewTransaction({
      refCode: "",
      client: "",
      policy: "",
      vehicleRegNo: "",
      registration: "",
      expiration: "",
      cost: "",
    });
  };

  return (
    <div className="transaction-container bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 text-white min-h-screen p-6">
      <h1 className="page-title text-2xl font-bold text-black mb-6">Transaction Management</h1>
      <div className="filter-box bg-purple-600 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-300 mb-4">Filter</h2>
        <div className="filter-inputs grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Date From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Date To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black"
            />
          </div>
        </div>
      </div>
      <div className="add-transaction-box bg-purple-600 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-300 mb-4">Add New Transaction</h2>
        <div className="input-group space-y-4">
          {Object.keys(newTransaction).map((key) => (
            <input
              key={key}
              type={key === "cost" ? "number" : key.includes("date") ? "date" : "text"}
              placeholder={key.replace(/([A-Z])/g, " $1").trim()}
              value={(newTransaction as Record<string, string>)[key]}
              onChange={(e) => setNewTransaction({ ...newTransaction, [key]: e.target.value })}
              className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black"
            />
          ))}
        </div>
        <button
          className="add-btn bg-purple-800 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out w-full mt-4"
          onClick={handleAddTransaction}
        >
          Add Transaction
        </button>
      </div>
      <div className="table-responsive overflow-x-auto">
        <table className="transaction-table w-full bg-purple-600 rounded-lg shadow-md">
          <thead className="bg-purple-700">
            <tr>
              {Object.keys(transactions[0]).map((key) => (
                <th key={key} className="py-2 px-4 text-left text-sm font-medium text-gray-300">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-t border-yellow-700">
                {Object.values(transaction).map((value, index) => (
                  <td key={index} className="py-2 px-4 text-sm text-black">
                    {typeof value === "number" ? `$${value.toFixed(2)}` : value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;

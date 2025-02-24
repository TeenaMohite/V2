import React, { useState } from "react";

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
      registration: "Jan 29, 2022",
      expiration: "Jan 29, 2023",
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
      !newTransaction.refCode ||
      !newTransaction.client ||
      !newTransaction.policy ||
      !newTransaction.vehicleRegNo ||
      !newTransaction.registration ||
      !newTransaction.expiration ||
      !newTransaction.cost
    ) {
      alert("Please fill all fields!");
      return;
    }
    setTransactions([...transactions, { id: transactions.length + 1, ...newTransaction }]);
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
      {/* Header */}
      <h1 className="page-title text-2xl font-bold text-black mb-6">Transaction Management</h1>

      {/* Filter Section */}
      <div className="filter-box bg-purple-600 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-300 mb-4">Filter</h2>
        <div className="filter-inputs grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Date From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Date To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
        </div>
        <div className="filter-buttons flex space-x-4 mt-4">
          <button className="filter-btn bg-purple-800 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out">
            Filter
          </button>
          <button className="print-btn bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out">
            Print
          </button>
        </div>
      </div>

      {/* Add Transaction Section */}
      <div className="add-transaction-box bg-purple-600 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-300 mb-4">Add New Transaction</h2>
        <div className="input-group space-y-4">
          <input
            type="text"
            placeholder="Ref. Code"
            value={newTransaction.refCode}
            onChange={(e) => setNewTransaction({ ...newTransaction, refCode: e.target.value })}
            className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          />
          <input
            type="text"
            placeholder="Client Name"
            value={newTransaction.client}
            onChange={(e) => setNewTransaction({ ...newTransaction, client: e.target.value })}
            className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          />
          <input
            type="text"
            placeholder="Policy"
            value={newTransaction.policy}
            onChange={(e) => setNewTransaction({ ...newTransaction, policy: e.target.value })}
            className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          />
          <input
            type="text"
            placeholder="Vehicle Reg. No."
            value={newTransaction.vehicleRegNo}
            onChange={(e) => setNewTransaction({ ...newTransaction, vehicleRegNo: e.target.value })}
            className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          />
          <input
            type="date"
            value={newTransaction.registration}
            onChange={(e) => setNewTransaction({ ...newTransaction, registration: e.target.value })}
            className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          />
          <input
            type="date"
            value={newTransaction.expiration}
            onChange={(e) => setNewTransaction({ ...newTransaction, expiration: e.target.value })}
            className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          />
          <input
            type="number"
            placeholder="Cost"
            value={newTransaction.cost}
            onChange={(e) => setNewTransaction({ ...newTransaction, cost: e.target.value })}
            className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <button
          className="add-btn bg-purple-800 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out w-full mt-4"
          onClick={handleAddTransaction}
        >
          Add Transaction
        </button>
      </div>

      {/* Transactions Table */}
      <div className="table-responsive overflow-x-auto">
        <table className="transaction-table w-full bg-purple-600 rounded-lg shadow-md">
          <thead className="bg-purple-700">
            <tr>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Ref. Code</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Client</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Policy</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Vehicle Reg. No.</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Registration</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Expiration</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Cost</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-t border-yellow-700">
                <td className="py-2 px-4 text-sm text-black">{transaction.refCode}</td>
                <td className="py-2 px-4 text-sm text-black">{transaction.client}</td>
                <td className="py-2 px-4 text-sm text-black">{transaction.policy}</td>
                <td className="py-2 px-4 text-sm text-black">{transaction.vehicleRegNo}</td>
                <td className="py-2 px-4 text-sm text-black">{transaction.registration}</td>
                <td className="py-2 px-4 text-sm text-black">{transaction.expiration}</td>
                <td className="py-2 px-4 text-sm text-black">${transaction.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
import { createContext, useEffect, useState } from "react";

export const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction, result) => {
    const nuevaTransaccion = {
      ...transaction,
      resultado: result,
      fechaRegistro: new Date().toISOString(),
    };

    setTransactions((prev) => [nuevaTransaccion, ...prev]);
  };

  const clearTransactions = () => {
    setTransactions([]);
    localStorage.removeItem("transactions");
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        clearTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
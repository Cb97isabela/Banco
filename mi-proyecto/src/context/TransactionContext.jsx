import { createContext, useState } from "react";

export const TransactionContext = createContext();

export function TransactionProvider({ children }) {

  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction, result) => {

    setTransactions(prev => [

      {
        ...transaction,
        resultado: result,
        fechaRegistro: new Date().toISOString()
      },

      ...prev

    ]);

  };

  return (

    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction
      }}
    >

      {children}

    </TransactionContext.Provider>

  );

}
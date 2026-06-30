import { useState } from "react";
import TransactionForm from "../components/transaction/TransactionForm";
import RiskResultCard from "../components/transaction/RiskResultCard";

function Transactions() {
  const [iaResult, setIaResult] = useState(null);

  return (
    <div className="simulator-grid">
      <TransactionForm onResult={setIaResult} />

      <RiskResultCard result={iaResult} />
    </div>
  );
}

export default Transactions;
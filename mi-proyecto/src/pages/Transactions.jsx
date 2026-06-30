import { useState } from "react";

import TransactionForm from "../components/transaction/TransactionForm";
import RiskResultCard from "../components/transaction/RiskResultCard";

function Transactions() {
  const [resultadoIA, setResultadoIA] = useState(null);

  return (
    <section className="dashboard-page">
      <div className="transaction-layout">
        <div className="transaction-left">
          <TransactionForm onResult={setResultadoIA} />
        </div>

        <div className="transaction-right">
          <RiskResultCard result={resultadoIA} />
        </div>
      </div>
    </section>
  );
}

export default Transactions;
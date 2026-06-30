import TransactionForm from "../components/transaction/TransactionForm";

function Transactions() {
  return (
    <div className="simulator-grid">
      <TransactionForm />

      <section className="result-placeholder">
        <h2>Resultado IA</h2>

        <p>
          Aquí se mostrará la respuesta enviada por el modelo de Inteligencia
          Artificial.
        </p>

        <br />

        <strong>Clasificación:</strong>
        <p>---</p>

        <br />

        <strong>Puntaje de Riesgo:</strong>
        <p>0 / 100</p>

        <br />

        <strong>Nivel:</strong>
        <p>---</p>

        <br />

        <strong>Explicación:</strong>
        <p>
          Una vez enviada la transacción al backend, aquí aparecerá la
          explicación generada por el modelo.
        </p>
      </section>
    </div>
  );
}

export default Transactions;
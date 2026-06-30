import "./styles/transaction.css";
import "./styles/layout.css";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import TransactionForm from "./components/transaction/TransactionForm";

function App() {
  return (
    <div className="app">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <main className="content">
          <div className="simulator-grid">
            <TransactionForm />

            <section className="result-placeholder">
              <h2>Resultado IA</h2>
              <p>
                Aquí aparecerá la clasificación, el puntaje de riesgo y la explicación
                del modelo cuando se analice una transacción.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
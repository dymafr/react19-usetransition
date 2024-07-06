import { useState, useTransition } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        // Simuler un appel asynchrone
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (name === 'error') {
              reject(new Error('Erreur de soumission'));
            } else {
              resolve();
            }
          }, 2000);
        });
        setError(null);
        alert(`Nom soumis: ${name}`);
      } catch (err) {
        setError(err.message);
      }
    });
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React 19</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Entrez votre nom"
          />
          <button type="submit" disabled={isPending}>
            {isPending ? (
              <img
                style={{ height: '40px' }}
                src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
                alt="Chargement..."
              />
            ) : (
              'Soumettre'
            )}
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </>
  );
}

export default App;

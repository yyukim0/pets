import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getPets } from '../services/api';
import { PetCard } from '../components/PetCard';

export const Home = () => {
  const navigate = useNavigate();
  const { signOut, user } = useApp();

  const storedUserRaw = localStorage.getItem("@PetAdopt:user");
  const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;

  const nomeExibicao = user?.username || user?.name || storedUser?.username || 'Usuário';

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const loadPets = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getPets(); 
      setPets(data);
    } catch (err) {
      setError(err.message || 'Não foi possível carregar os pets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPets();
  }, []);

  const petsFiltrados = pets.filter((pet) =>
    pet.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleNavigateToDetails = (id) => {
    navigate(`/pet/${id}`);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-user-info">
          <span>Olá, <strong>{nomeExibicao}</strong>! 👋</span>
        </div>
        <div className="header-actions">
          <button onClick={() => navigate('/favorites')} className="btn-nav-favorites">
            ❤️ Meus Favoritos
          </button>
          <Link to="/create-pet" className="btn-nav-favorites" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            ➕ Cadastrar Pet
          </Link>
          <button onClick={signOut} className="btn-logout">
            Sair (Logout)
          </button>
        </div>
      </header>

      <section className="search-section">
        <h1>Encontre seu novo amigo</h1>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input 
            type="text" 
            placeholder="Busque por nome do pet..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="search-input"
          />
          <button type="submit" className="btn-search">
            Buscar
          </button>
        </form>
      </section>

      <main className="main-content">
        
        {loading && (
          <div className="loading-container">
            <p>Buscando pets disponíveis...</p>
          </div>
        )}

        {!loading && error && (
          <div className="error-container">
            <p className="error-message">⚠️ {error}</p>
            <button onClick={loadPets} className="btn-retry">
              Tentar Novamente
            </button>
          </div>
        )}

        {!loading && !error && petsFiltrados.length === 0 && (
          <div className="empty-container">
            <p>Nenhum pet encontrado com o nome "{searchQuery}". 🐶🐱</p>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="btn-clear-filter">
                Limpar Filtros
              </button>
            )}
          </div>
        )}

        {!loading && !error && petsFiltrados.length > 0 && (
          <div className="pets-grid">
            {petsFiltrados.map((pet) => (
              <PetCard 
                key={pet._id} 
                pet={pet} 
                onNavigateToDetails={handleNavigateToDetails} 
              />
            ))}
          </div>
        )}

      </main>
    </div>
  );
};
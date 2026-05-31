import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PetCard } from '../components/PetCard';

export const Favorites = () => {
  const navigate = useNavigate();
  const { favorites } = useApp();

  const handleNavigateToDetails = (id) => {
    navigate(`/pet/${id}`);
  };

  return (
    <div className="favorites-container">
      <header className="favorites-header">
        <button onClick={() => navigate('/home')} className="btn-back">
          ← Voltar para a Home
        </button>
        <h1>Meus Pets Favoritos ❤️</h1>
      </header>

      <main className="favorites-content">
        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <div className="empty-icon">🐾</div>
            <h2>Sua lista está vazia</h2>
            <p>Você ainda não favoritou nenhum bichinho. Explore a página principal para encontrar pets incríveis!</p>
            <button onClick={() => navigate('/home')} className="btn-explore">
              Explorar Pets
            </button>
          </div>
        ) : (
          <div className="pets-grid">
            {favorites.map((pet) => (
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
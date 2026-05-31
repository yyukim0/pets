import React from 'react';
import { useApp } from '../context/AppContext';

export const PetCard = ({ pet, onNavigateToDetails }) => {
  const { favorites, toggleFavorite } = useApp();
  
  const isFavorite = favorites.some(fav => fav._id === pet._id);

  return (
    <div className="pet-card">
      <img 
        src={pet.images && pet.images.length > 0 ? pet.images[0] : "https://via.placeholder.com/150"} 
        alt={pet.name} 
        className="sua-classe-de-estilo-aqui"
      />
      <div className="pet-card-info">
        <h3>{pet.name}</h3>
        <p>{pet.breed || 'Raça não informada'}</p>
        <p>{pet.age ? `${pet.age} anos` : 'Idade não informada'}</p>
      </div>
      
      <div className="pet-card-actions">
        <button 
          onClick={() => onNavigateToDetails(pet._id)}
          className="btn-details"
        >
          Ver Detalhes
        </button>
        
        <button 
          onClick={() => toggleFavorite(pet)} 
          className={`btn-favorite ${isFavorite ? 'active' : ''}`}
        >
          {isFavorite ? '❤️ Favoritado' : '🤍 Favoritar'}
        </button>
      </div>
    </div>
  );
};
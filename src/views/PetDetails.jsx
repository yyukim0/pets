import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getPetById } from '../services/api';

export const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useApp();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPetDetails = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getPetById(id);
        setPet(data);
      } catch (err) {
        setError(err.message || 'Não foi possível carregar os detalhes deste pet.');
      } finally {
        setLoading(false);
      }
    };

    loadPetDetails();
  }, [id]);

  const isFavorite = pet && favorites.some(fav => fav.id === pet._id);

  return (
    <div className="details-container">
      <header className="details-header">
        <button onClick={() => navigate('/home')} className="btn-back">
          ← Voltar para a Home
        </button>
      </header>

      <main className="details-content">
        {loading && (
          <div className="loading-container">
            <p>Carregando informações detalhadas...</p>
          </div>
        )}

        {!loading && error && (
          <div className="error-container">
            <p className="error-message">⚠️ {error}</p>
            <button onClick={() => navigate('/home')} className="btn-retry">
              Voltar para Listagem
            </button>
          </div>
        )}

        {!loading && !error && pet && (
          <div className="pet-details-card">
            <div className="pet-details-image-wrapper">
              <img 
                src={pet.image || 'https://via.placeholder.com/400'} 
                alt={pet.name} 
                className="pet-details-image"
              />
            </div>

            <div className="pet-details-info">
              <div className="pet-details-title-row">
                <h1>{pet.name}</h1>
                <button 
                  onClick={() => toggleFavorite(pet)} 
                  className={`btn-favorite-large ${isFavorite ? 'active' : ''}`}
                >
                  {isFavorite ? '❤️ Favoritado' : '🤍 Adicionar aos Favoritos'}
                </button>
              </div>

              <div className="pet-specs-grid">
                <div className="spec-item">
                  <strong>Raça:</strong> {pet.breed || 'Não especificada'}
                </div>
                <div className="spec-item">
                  <strong>Idade:</strong> {pet.age ? `${pet.age} anos` : 'Não informada'}
                </div>
                <div className="spec-item">
                  <strong>Porte:</strong> {pet.size || 'Não informado'}
                </div>
                <div className="spec-item">
                  <strong>Cidade:</strong> {pet.city || 'Não informada'}
                </div>
              </div>

              <div className="pet-description">
                <h3>História e Personalidade</h3>
                <p>{pet.description || 'Este pet está esperando por um lar cheio de amor! Entre em contato para saber mais sobre o temperamento e rotina dele.'}</p>
              </div>

              <div className="pet-contact-section">
                <h3>Interessado em adotar?</h3>
                <p>Entre em contato com o abrigo ou responsável:</p>
                <div className="contact-info">
                  <p>📞 Telefone/WhatsApp: {pet.contactPhone || '(00) 00000-0000'}</p>
                  <p>✉️ E-mail: {pet.contactEmail || 'contato@abrigo.org'}</p>
                </div>
                <button className="btn-adopt" onClick={() => alert('Obrigado pelo interesse! O responsável recebeu sua intenção de adoção.')}>
                  Quero Adotar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
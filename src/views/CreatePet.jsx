import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPet } from '../services/api';

export const CreatePet = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState('6758971d7203bce5d0315e5f'); 
  const [name, setName] = useState('');
  const [story, setStory] = useState('');
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [breed, setBreed] = useState('');
  const [imageUrl, setImageUrl] = useState(''); 

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !story || !color || !weight || !age || !breed || !imageUrl) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const petPayload = {
        category,
        name,
        story,
        color,
        weight: Number(weight), 
        age: Number(age),      
        breed,
        images: [imageUrl]    
      };

      await createPet(petPayload);
      
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/home');
      }, 2000);

    } catch (err) {
      setError(err.message || 'Erro ao cadastrar o pet. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Cadastrar Novo Pet 🐾</h2>
        <p>Insira os dados do animalzinho para colocá-lo para adoção.</p>

        {error && <div className="auth-error-message">⚠️ {error}</div>}
        {success && (
          <div className="auth-success-message">
            ✅ Pet cadastrado com sucesso! Redirecionando...
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Nome do Pet</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Max" disabled={loading || success} />
          </div>

          <div className="form-group">
            <label>História</label>
            <textarea value={story} onChange={(e) => setStory(e.target.value)} placeholder="Conte um pouco sobre ele..." disabled={loading || success} rows="3" style={{width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}} />
          </div>

          <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label>Cor</label>
              <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="Ex: Caramelo" disabled={loading || success} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Raça</label>
              <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} placeholder="Ex: Vira-lata" disabled={loading || success} />
            </div>
          </div>

          <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label>Idade (anos)</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Ex: 2" disabled={loading || success} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Peso (kg)</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Ex: 10" disabled={loading || success} />
            </div>
          </div>

          <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label>Gênero</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} disabled={loading || success} style={{width: '100%', padding: '8px', borderRadius: '4px', height: '38px'}}>
                <option value="male">Macho (male)</option>
                <option value="female">Fêmea (female)</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label>ID da Categoria</label>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} disabled={loading || success} />
            </div>
          </div>

          <div className="form-group">
            <label>URL da Imagem (Link da internet)</label>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://exemplo.com/foto.jpg" disabled={loading || success} />
          </div>

          <button type="submit" className="btn-auth" disabled={loading || success}>
            {loading ? 'Cadastrando...' : 'Salvar Pet'}
          </button>
        </form>

        <div className="auth-footer">
          <button onClick={() => navigate('/home')} className="btn-retry" style={{background: '#999', marginTop: '10px'}}>Voltar para Home</button>
        </div>
      </div>
    </div>
  );
};
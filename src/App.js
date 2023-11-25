import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import Character from './Character';

const App = () => {
  // Estado para almacenar los personajes y personajes filtrados
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  // Estado para almacenar los géneros disponibles
  const [genders, setGenders] = useState([]);
  // Estado para almacenar el género seleccionado por el usuario
  const [selectedGender, setSelectedGender] = useState('');

  // Obtener datos de la API al cargar la aplicación
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        setCharacters(response.data.results);
        setFilteredCharacters(response.data.results);
        // Obtener géneros únicos de los personajes y filtrar valores vacíos
        const uniqueGenders = [...new Set(response.data.results.map((character) => character.gender))];
        setGenders(uniqueGenders.filter((gender) => gender !== ""));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Manejar la búsqueda por nombre de personaje
  const handleSearch = (searchTerm) => {
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharacters(filtered);
  };

  // Manejar el cambio en el selector de género
  const handleGenderChange = (event) => {
    const selected = event.target.value;
    setSelectedGender(selected);
    if (selected === 'All') {
      setFilteredCharacters(characters);
    } else {
      const filtered = characters.filter((character) => character.gender === selected);
      setFilteredCharacters(filtered);
    }
  };

  return (
    <div className="App">
      <h1>Rick and Morty Character Search</h1>
      {/* Componente de búsqueda */}
      <Search onSearch={handleSearch} />
      {/* Selector de género */}
      <select value={selectedGender} onChange={handleGenderChange}>
        <option value="All">All Genders</option>
        {genders.map((gender, index) => (
          <option key={index} value={gender}>{gender}</option>
        ))}
      </select>
      {/* Componente que muestra la lista de personajes */}
      <Character characters={filteredCharacters} />
    </div>
  );
};

export default App;

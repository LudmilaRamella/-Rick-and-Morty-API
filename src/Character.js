import React from 'react';

const Character = ({ characters }) => {
  return (
    <div className="Character">
      {characters.map((character) => (
        <div key={character.id} className="character-card">
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name} />
          <p>Species: {character.species}</p>
          {}
        </div>
      ))}
    </div>
  );
};

export default Character;

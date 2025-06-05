import React, { useState, useEffect } from 'react';

function App() {
  const [fact, setFact] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [theme, setTheme] = useState('dark');
  const [animating, setAnimating] = useState(false);
  const [fade, setFade] = useState(false);
  const [loading, setLoading] = useState(false);
  const [surpriseMode, setSurpriseMode] = useState(false);
  const [favoritos, setFavoritos] = useState([]);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);


  // Estados para tamagotchi
  const [tamaMessage, setTamaMessage] = useState('Olá! Eu sou seu gatinho 🐱');
  const [tamaAnimation, setTamaAnimation] = useState(null);

  async function fetchCatData() {
    setLoading(true);
    setAnimating(true);

    try {
      const factResponse = await fetch('https://catfact.ninja/fact');
      const factData = await factResponse.json();

      const imageResponse = await fetch('https://api.thecatapi.com/v1/images/search');
      const imageData = await imageResponse.json();

      setFade(false);
      setTimeout(() => {
        setFact(factData.fact);
        setImageUrl(imageData[0].url);
        setFade(true);
        setLoading(false);
      }, 300);
    } catch (error) {
      setFact('Erro ao buscar dados. Tente novamente.');
      setImageUrl('');
      setLoading(false);
    }

    setTimeout(() => setAnimating(false), 1200);
  }

  // Para modo surpresa - mostra várias imagens animadas
  const catSurpriseImages = [
    'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg',
    'https://cdn2.thecatapi.com/images/MTY3ODI1OQ.jpg',
    'https://cdn2.thecatapi.com/images/MTY3ODI0NQ.jpg',
    'https://cdn2.thecatapi.com/images/MTY3ODI3Nw.jpg',
    'https://cdn2.thecatapi.com/images/MTY3ODI3OQ.jpg',
  ];

  // Muda o tema e também o modo surpresa
  function toggleSurpriseMode() {
    if (surpriseMode) {
      fetchCatData();
    }
    setSurpriseMode(!surpriseMode);
  }

  // Toggle para o botão de tema/fatos no modo surpresa
  function toggleTheme() {
    if (surpriseMode) {
      // volta para fatos e modo normal
      setSurpriseMode(false);
      fetchCatData();
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  }

  // Funções do tamagotchi para interações
  function feedCat() {
    setTamaMessage('Mmmm, obrigado pela comida! 😸');
    setTamaAnimation('feed');
    setTimeout(() => setTamaAnimation(null), 1000);
  }

  function petCat() {
    setTamaMessage('Ronronando... Muito gostoso! 🐾');
    setTamaAnimation('pet');
    setTimeout(() => setTamaAnimation(null), 1000);
  }

  function playCat() {
    setTamaMessage('Vamos brincar! 🎾');
    setTamaAnimation('play');
    setTimeout(() => setTamaAnimation(null), 1000);
  }

  useEffect(() => {
    fetchCatData();
  }, []);

  function handleShowFavorites() {
  const storedFavorites = JSON.parse(localStorage.getItem('favoritos')) || [];
  setFavoritos(storedFavorites);
  setShowFavoritesModal(true); 
  }

  function handleCloseFavorites() {
    setShowFavoritesModal(false);
  }



  return (
    <div
      className={`app ${theme}`}
      style={{
        height: '100vh',
        width: '100vw',
        boxSizing: 'border-box',
        padding: '2rem 4rem 2rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme === 'dark' ? '#121212' : '#fafafa',
        color: theme === 'dark' ? '#eee' : '#222',
        transition: 'background-color 0.3s, color 0.3s',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Botões de tema e surpresa */}
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
        <button
          onClick={toggleTheme}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            background: surpriseMode ? '#555' : theme === 'dark' ? '#f5f5f5' : '#222',
            color: surpriseMode ? '#eee' : theme === 'dark' ? '#222' : '#f5f5f5',
            fontWeight: '600',
            userSelect: 'none',
            minWidth: '90px',
          }}
          aria-label="Trocar tema ou voltar aos fatos"
          title={surpriseMode ? 'Voltar aos fatos' : `Tema ${theme === 'dark' ? 'Claro' : 'Escuro'}`}
        >
          {surpriseMode ? 'Fatos 🐱' : theme === 'dark' ? '🌞 Claro' : '🌙 Escuro'}
        </button>

        <button
          onClick={toggleSurpriseMode}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            background: '#8e44ad',
            color: '#fff',
            fontWeight: '600',
            userSelect: 'none',
            minWidth: '90px',
          }}
          aria-label="Modo surpresa"
          title="Modo surpresa"
        >
          🐾 Surpresa

        </button>

                  {/* Novo botão de Favoritos */}

          <button 

          onClick={handleShowFavorites}
          style={{
            
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            background: '#f39c12',
            color: '#fff',
            fontWeight: '600',
            userSelect: 'none',
            minWidth: '90px',
            
          }}
          aria-label="Ver Favoritos"
          title="Ver Favoritos"
          
          >
            ⭐ Favoritos
          </button>
      </div>

      {/* Conteúdo principal */}
      {!surpriseMode ? (
        loading ? (
          <div
            style={{
              fontSize: '1.4rem',
              fontWeight: '600',
              marginTop: '5rem',
              textAlign: 'center',
              minHeight: '300px',
            }}
            aria-live="polite"
          >
            Carregando...
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              maxWidth: '600px',
              width: '100%',
            }}
            className={fade ? 'fade show' : 'fade'}
          >
            <h1 style={{ fontWeight: '700', fontSize: '2rem', marginBottom: '0.5rem' }}>
              <span role="img" aria-label="cat">
                🐱
              </span>{' '}
              Fato Aleatório de Gato
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>{fact}</p>

            {imageUrl && (
              <img
                src={imageUrl}
                alt="Gato aleatório"
                style={{
                  display: 'block',
                  margin: '0 auto 1.5rem auto',
                  width: '100%',
                  maxWidth: '300px',
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                }}
              />
            )}

            <button
              onClick={fetchCatData}
              className={animating ? 'button-pulse' : ''}
              style={{
                background: theme === 'dark' ? '#444' : '#ddd',
                color: theme === 'dark' ? '#fff' : '#000',
                padding: '0.8rem 1.2rem',
                fontSize: '1rem',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.3s, color 0.3s',
                userSelect: 'none',
              }}
              disabled={loading}
            >
              Buscar outro fato 🔁
            </button>
          </div>
        )
      ) : (
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '3rem',
          }}
        >
          {catSurpriseImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Gato surpresa ${i + 1}`}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '15px',
                animation: `float 4s ease-in-out infinite ${i * 0.5}s`,
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                objectFit: 'cover',
              }}
            />
          ))}
        </div>
      )}

      {/* Botão favoritos */}

      <button 
      
         onClick={() => { 
          const newFavorite = { fact, image: imageUrl };
          const updatedFavorites = [...favoritos, newFavorite];
          setFavoritos(updatedFavorites);
          localStorage.setItem('favoritos', JSON.stringify(updatedFavorites));
         }}

         style={{
          background: '#8e44ad',
          color: '#fff',
          padding: '0.8rem 1.2rem',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s, color 0.3s',
          userSelect: 'none',
          marginLeft: '0rem',
          marginTop: '1rem'
          
         }}
      
      >

        ❤️ Favoritar

      </button>

      {showFavoritesModal && (

        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}
        >

          <div style={{
            background: '#222',
            padding: '2rem',
            borderRadius: '12px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80%',
            overflowY: 'auto',
            color: '#fff',
          }}
          >

            <h2>⭐ Meus Favoritos</h2>
            <button onClick={() => handleCloseFavorites}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#f39c12',
              fontSize: '1.5rem',
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              cursor: 'pointer',
            }}
            aria-label="Fechar"
            >❌
            </button>

            {favoritos.length === 0 ? (<p>Você ainda não tem favoritos. 🐾</p>
            ) : (
              <ul style={{ listStyleType: 'none', padding: 0 }}>
              {favorites.map((fav, index) => (
                <li 
                key={index}
                style={{
                  background: '#333',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '0.5rem',
                }}
                >
                <p>{fav.fact}</p>
                {fav.image && (
                  <img
                    src={fav.image}
                    alt="Gato favorito"
                    style={{
                      maxWidth: '100%',
                      borderRadius: '8px',
                      marginTop: '0.5rem',
                    }}
                  />
                )}
                </li>
            ))}
          </ul>
          )}
          
          </div>
          
        </div>

      )
    
    }

      {/* Mini tamagotchi no canto inferior esquerdo */}
      <div
        style={{
          position: 'fixed',
          bottom: '1rem',
          left: '1rem',
          backgroundColor: theme === 'dark' ? '#222' : '#eee',
          borderRadius: '12px',
          padding: '0.7rem 1rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          width: '140px',
          userSelect: 'none',
          fontSize: '0.85rem',
          color: theme === 'dark' ? '#eee' : '#222',
          fontWeight: '600',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 15,
        }}
      >
        <img
          src="https://img.freepik.com/vetores-gratis/personagem-de-desenho-animado-de-gatinho-de-olhos-doces_1308-134970.jpg?semt=ais_hybrid&w=740"
          alt="Gato virtual"
          style={{
            width: '80px',
            height: '80px',
            marginBottom: '0.3rem',
            borderRadius: '50%',
            boxShadow:
              tamaAnimation === 'feed'
                ? '0 0 10px #ff9f43'
                : tamaAnimation === 'pet'
                ? '0 0 10px #3c40c6'
                : tamaAnimation === 'play'
                ? '0 0 10px #0abde3'
                : 'none',
            transition: 'box-shadow 0.3s ease',
            objectFit: 'cover',
          }}
        />
        <div style={{ textAlign: 'center', minHeight: '40px' }}>{tamaMessage}</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          <button
            onClick={feedCat}
            title="Alimentar"
            aria-label="Alimentar gatinho"
            style={{
              cursor: 'pointer',
              borderRadius: '6px',
              border: 'none',
              padding: '0.3rem 0.5rem',
              backgroundColor: '#ff9f43',
              color: '#fff',
              fontWeight: '700',
              fontSize: '1.1rem',
              userSelect: 'none',
            }}
          >
            🍖
          </button>
          <button
            onClick={petCat}
            title="Acariciar"
            aria-label="Acariciar gatinho"
            style={{
              cursor: 'pointer',
              borderRadius: '6px',
              border: 'none',
              padding: '0.3rem 0.5rem',
              backgroundColor: '#3c40c6',
              color: '#fff',
              fontWeight: '700',
              fontSize: '1.1rem',
              userSelect: 'none',
            }}
          >
            🤗
          </button>
          <button
            onClick={playCat}
            title="Brincar"
            aria-label="Brincar com gatinho"
            style={{
              cursor: 'pointer',
              borderRadius: '6px',
              border: 'none',
              padding: '0.3rem 0.5rem',
              backgroundColor: '#0abde3',
              color: '#fff',
              fontWeight: '700',
              fontSize: '1.1rem',
              userSelect: 'none',
            }}
          >
            🔍
          </button>
        </div>
      </div>

      {/* Estilos para animações */}
      <style>{`
        .fade {
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }
        .fade.show {
          opacity: 1;
        }
        .button-pulse {
          animation: pulse 1.2s ease-in-out;
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 5px rgba(0,0,0,0.2);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 15px rgba(0,0,0,0.5);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Responsividade */
        @media (max-width: 600px) {
          .app {
            padding: 1.5rem 1rem 2rem 1rem !important;
          }
          h1 {
            font-size: 1.8rem;
          }
          p {
            font-size: 1rem;
          }
          button {
            font-size: 0.9rem;
            padding: 0.7rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default App;

import { useAuth } from "../login/contexto.jsx";
import React, { useEffect, useState } from "react";
import Header from "./header/header.jsx";
import './principal.css';
import Howler from 'howler';

const Home = () => {
  const { token } = useAuth(); // Obtén el token de autenticación del contexto
  const [userProfile, setUserProfile] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isLoadingTracks, setIsLoadingTracks] = useState(false);
  const [error, setError] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null); // Estado para manejar la canción en reproducción

  useEffect(() => {

    const fetchUserProfile = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        setUserProfile(data); // Guarda los datos del usuario en el estado
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    const fetchUserPlaylists = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error al obtener las playlists: ${response.statusText}`);
        }
        const data = await response.json();
        setPlaylists(data.items); // Actualiza el estado con las playlists
      } catch (error) {
        console.error("Error al obtener playlists:", error);
      }
    };

    const fetchPlaylistTracks = async (playlistId) => {
      setIsLoadingTracks(true);
      setError(null);
      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error al obtener las pistas de la playlist: ${response.statusText}`);
        }
        const data = await response.json();
        setPlaylistTracks(data.items.map(item => item.track));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoadingTracks(false);
      }
    };

    if (token) {
      fetchUserProfile();
      fetchUserPlaylists();
    }

    if (selectedPlaylistId) {
      fetchPlaylistTracks(selectedPlaylistId);
    }
  }, [token, selectedPlaylistId]);

  const handlePlay = (track) => {
    if (!track.preview_url) {
      console.error("No hay URL de vista previa para esta canción");
  
      // Si no hay preview_url, puedes intentar usar el track.uri
      // Pero recuerda que esto no reproducirá la canción, solo permitirá mostrar su URI
      alert(`Esta canción no tiene vista previa. URI: ${track.uri}`);
      return;
    }
  
    // Detenemos la canción anterior si existe
    if (currentTrack && currentTrack.id !== track.id) {
      currentTrack.sound.stop();
    }
  
    const sound = new Howler.Howl({
      src: track.preview_url,  // Usa el preview_url de la canción
      html5: true,  // Activar HTML5 para canciones grandes
      onend: () => {
        console.log("La canción terminó de reproducirse");
        setCurrentTrack(null);  // Limpiar el estado cuando la canción termine
      },
    });
  
    sound.play();
    setCurrentTrack({ track, sound });  // Guardamos el estado de la canción en reproducción
  };
  
/*
  const fetchPlaylistTracks = async (playlistId) => {
    setIsLoadingTracks(true);
    setError(null);
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error al obtener las pistas de la playlist: ${response.statusText}`);
      }
      const data = await response.json();
      
      // Aquí puedes imprimir el objeto para verificar su estructura
      console.log(data.items);  // Muestra las canciones para ver si el preview_url está presente
  
      setPlaylistTracks(data.items.map(item => item.track));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoadingTracks(false);
    }
  };*/
  

  return (
    <>
      <Header
        profilePhoto={userProfile?.images[0]?.url}
        username={userProfile?.display_name}
      />
  
      <main className="contenidoPrincipal">
        {userProfile && (
          <div>
            <ul className="listaMusicas">
              {playlists.map((playlist) => (
                <li key={playlist.id} onClick={() => setSelectedPlaylistId(playlist.id)}>
                  {playlist.name}
                </li>
              ))}
            </ul>
  
            {selectedPlaylistId && (
              <div className="listaIndivGrup">
                <h2>Canciones de: {playlists.find(playlist => playlist.id === selectedPlaylistId)?.name}</h2>
                {isLoadingTracks ? (
                  <p>Cargando canciones...</p>
                ) : error ? (
                  <p>Error al cargar las canciones: {error}</p>
                ) : (
                  <ul className="listaIndividual">
                    {playlistTracks.map(track => (
                      <li key={track.id} onClick={() => handlePlay(track)}>
                        <div className="cancionInfo">
                          {/* Mostrar imagen de la canción */}
                          <img src={track.album.images[0]?.url} alt={track.name} className="albumImagen" />
                          <div className="cancionDetalles">
                            <span className="nombreCancion">{track.name}</span> - 
                            <span className="nombreArtista">{track.artists[0].name}</span>
                          </div>
                        </div>
                        {/* Ícono de reproducir */}
                        <i className="fa-solid fa-play"></i>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
}

export default Home;

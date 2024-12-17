import { useAuth } from "../login/contexto.jsx";
import React, { useEffect, useState } from "react";
import Header from "./header/header.jsx";
import './principal.css';


const Home = () => {
  const { token } = useAuth(); // Obtén el token de autenticación del contexto
  const [userProfile, setUserProfile] = useState(null);
  const [playlists, setPlaylists] = useState([]); // Estado para almacenar las playlists

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

    if (token) {
      fetchUserProfile();
      fetchUserPlaylists(); // Llama a la función para obtener las playlists
    }
  }, [token]);

  return (
    <>
      <Header
        profilePhoto={userProfile?.images[0]?.url}
        username={userProfile?.display_name}
      />

      <main className="contenidoPrincipal">
        {userProfile && (
          <div>
            {playlists.length > 0 ? (
              <ul className="listaMusicas">
                {playlists.map((playlist) => (
                  <li key={playlist.id}>{playlist.name}</li>
                ))}
              </ul>
            ) : (
              <p>Cargando playlists...</p>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
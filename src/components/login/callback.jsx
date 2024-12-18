import { useEffect } from "react";
import { useAuth } from "./contexto.jsx"; // Importa el contexto
import { useNavigate } from "react-router-dom";

const CLIENT_ID = "d6b9bdbfbe01437391ba4b54fa7c108c";
const CLIENT_SECRET = "364742d89a1241babd7810e062ecda6f";
const REDIRECT_URI = "http://localhost:3000/callback";

const Callback = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getAccessToken = async (code) => {
      try {
        // Realiza una solicitud POST a la API de Spotify para obtener el token de acceso
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`, // Codificación Base64
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: REDIRECT_URI,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Token de acceso obtenido:", data.access_token);
          setToken(data.access_token); // Guarda el token en el contexto
          navigate("/home"); // Redirige al componente Home
        } else {
          console.error("Error al obtener el token:", data);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        // Manejo de errores: Puedes mostrar un mensaje al usuario o redirigir a una página de error
        console.error("Error al redirigir al usuario. Verifica la configuración de rutas.");
      }
    };

    // Obtiene el código de autorización de la URL
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      getAccessToken(code);
    } else {
      console.error("No se encontró el parámetro 'code' en la URL.");
    }
  }, [setToken, navigate]);

  return <p>Procesando inicio de sesión...</p>;
};

export default Callback;
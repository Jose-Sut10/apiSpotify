const fetchUserProfile = async (accessToken) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Incluye el token en el encabezado
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Datos del usuario:", data);
      return data;
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    }
  };
  
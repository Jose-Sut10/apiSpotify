import './login.css';

const CLIENT_ID = 'd6b9bdbfbe01437391ba4b54fa7c108c';
const REDIRECT_URI = 'http://localhost:3000/callback'; // Redirige a /callback
const SCOPES = 'user-read-private user-read-email'; // Scopes que necesitas

const Login = () => {
    const handleLogin = () => {
        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
        window.location.href = authUrl; // Redirigir al usuario a Spotify
    };

    return (
        <main className="contenidoLogin flex">
            <section className="contenidoLogin--container flex">
                <div className="cajaLogin flex">
                    <img src="/img/spotify.png" alt="" />
                    <h1>Spotify</h1>
                </div>
                <div className="btnLogin">
                    <p>Visualiza toda la información de tu perfil de Spotify</p>
                    <button onClick={handleLogin}>Iniciar Sesión</button>
                </div>
            </section>
        </main>
    );
};

export default Login;

import './login.css';

const Login = ()=>{
    return <main className="contenidoLogin flex">
        <section className="contenidoLogin--container flex">
            <div className="cajaLogin flex">
                <img src="/img/spotify.png" alt="" />
                <h1>Spotify</h1>
            </div>
            <div className="btnLogin">
                <p>Visualiza toda la información de tu perfil de Spotify</p>
                <button>Iniciar Sesión</button>
            </div>
        </section>
    </main>
}

export default Login; 
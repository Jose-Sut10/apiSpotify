import './header.css';

const Header = ({ profilePhoto, username })=>{

    return <header className="encabezado">
        <section className="encabezado--container flex">
            <div className="cajaSeleccion">
                <i class="fa-solid fa-ellipsis"></i>
                <i class="fa-solid fa-angle-left"></i>
                <i class="fa-solid fa-angle-right"></i>
            </div>

            <div className="cajaBusqueda">
                <input type="search" name="buscar" id="iconoBuscar" placeholder='¿Qué quieres reproducir?'/>
            </div>

            <div className="cajaUsuario">
                <div className="fotoUsuario">
                {profilePhoto ? (
                    <img
                        src={profilePhoto}
                        alt="Foto de perfil"
                        className="fotoUsuario--img"
                    />
                    ) : (
                    <span>No hay foto</span>
                    )}
                </div>
            </div>
        </section>
        <div className="bienvenida">
            <h1>Bienvenido {username}</h1>
        </div>
    </header>

}

export default Header;
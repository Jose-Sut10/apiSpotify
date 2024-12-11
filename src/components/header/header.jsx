import './header.css';

const Header = ()=>{

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

                </div>
            </div>
        </section>
    </header>

}

export default Header;
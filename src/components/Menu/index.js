import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../assets/img/lari6A3ACE.png';
import './Menu.css';
import Button from '../Button';

// import ButtonLink from './components/ButtonLink';

function Menu(){
    return (
        <nav className="Menu">
            <Link to="/">
                <img className="Logo" src={Logo} alt="Lariflix Logo"></img>
            </Link>

            <Button as={Link} className="ButtonLink" to="/cadastro/video">
                Novo vídeo
            </Button>
        </nav>
    );
}

export default Menu;
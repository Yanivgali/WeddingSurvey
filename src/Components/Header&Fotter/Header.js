import style from './Header.module.css';
import logoImage from '../Images/rings.jpg';


const Header = (props) => {

    return (
        <header className={style.header}>
            <img className={style.logo} src={logoImage} alt="" />
            <button onClick={props.onClick} className={style.card}>Admin Login</button>
        </header>
    );
};

export default Header;
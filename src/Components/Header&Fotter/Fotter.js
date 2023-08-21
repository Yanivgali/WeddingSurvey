import style from './Fotter.module.css';
import leftImage from '../Images/shape-1.png';
import rightImage from '../Images/shape-2.png';
import CountDownCard from '../Countdown/CountDownCard';

const Fotter = () => {
    return (
        <footer className={style.footer} id="foot" >
            <img className={style.image1} src={leftImage} alt="" />
            <center><CountDownCard /></center>
            <img className={style.image2} src={rightImage} alt="" />
    </footer>
    );
};

export default Fotter;
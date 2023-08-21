import Header from './Components/Header&Fotter/Header';
import Submit from './Components/UI/Submit';
import style from './App.module.css';
import { useState } from 'react';
import AdminLogin from './Components/Admin/AdminLogin';
import Fotter from './Components/Header&Fotter/Fotter';


function App() {
   
    const [isVisble, setisVisble] = useState(false);
    const showCartHandler = () => {
        setisVisble(true);
    };
    const hideCartHandler = (props) => {
        setisVisble(false);
    };
    return (
        <>
            {isVisble && <AdminLogin onClose={hideCartHandler}></AdminLogin>}            
            <Header onClick={showCartHandler} />
            <div className={style.submit}>
                <Submit />
            </div>
            <Fotter />
        </>
  );
}

export default App;

import React, { useState, useRef,useEffect } from 'react';
import style from './Submit.module.css';
import Bankai from '../Songs/bankai.mp3'

const Submit = () => {
    const [ipAddress, setIPAddress] = useState('');
    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => setIPAddress(data.ip))
            .catch(error => console.log(error))
        if (localStorage.getItem('Voted')) {
            setisValid(true);
            setisVoted(true);
        }
    }, []);
    const [selectedOption, setSelectedOption] = useState('MosheParatz');
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const nameRef = useRef('');
    const [isVoted, setisVoted] = useState(false);
    const [isbtnClicked, setbtnClicked] = useState(false);
    const [isVotedip, setisVotedip] = useState(false);
    const [isValid, setisValid] = useState(false);
    const [Valid, setValid] = useState('');

    const onClickHandler = async (event) => {
        event.preventDefault();
        
        setbtnClicked(true);
        const responses = await fetch('https://react-http-f8b73-default-rtdb.firebaseio.com/users.json');
    const datas = await responses.json();
        for (const key in datas)
        {
        const userIpAddress = datas[key].Userip; 
            if (ipAddress === userIpAddress)
            {
                setisValid(true);
                setisVotedip(true);
                return;
            }
        }
        if (!isVotedip) {
            setisValid(true);
            setValid('sending data...');
            const events = {
                nameVoter: nameRef.current.value,
                Song: selectedOption,
                Userip: ipAddress,
            };
            const response = await fetch('https://react-http-f8b73-default-rtdb.firebaseio.com/users.json', {
                method: 'POST',
                body: JSON.stringify(events),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            setValid('Thank you for your response.');
            localStorage.setItem('Voted', 1);
        }
    }
    const bisclicked = isVoted || isbtnClicked;
    if (bisclicked) {
        window.scrollTo(0, 0);
        document.body.style.transform = "scale(1)";
    }
    return (<>
        <div>
            <hr className={style['style-seven']} />
            <center> <div className={style.continerH}>
                <h2>WE ARE GETTING MARRIED</h2><br />
                <h2><span>20/03/2024</span></h2>
    </div>
            </center>
            <hr className={style['style-seven']} />
        </div> 
        <div className={style[`div${bisclicked ? 'click':''}`]}>
            {!isValid && <form onSubmit={onClickHandler}>
                <h5>.בבקשה תציעו שיר לטקס הנישואין שלנו</h5><br />
                <label><input ref={nameRef} required="required"></input> :הזן שם מלא</label><br />
                <div className={style["radio-container"]} dir="rtl" >
                    <label ><input type="radio" name="option" value="MosheParatz" checked={selectedOption === 'MosheParatz'} onChange={handleOptionChange} />משה פרץ - יפה בלבן</label><audio preload="auto" controls>
                        <source src={Bankai} type="audio/mpeg"  />
                    </audio>
                    <label><input type="radio" name="option" value="אליה והב" checked={selectedOption === 'אליה והב'} onChange={handleOptionChange} />אליה והב - אשת חיל שלי</label><audio preload="auto" controls>
                        <source src={Bankai} type="audio/mpeg"  />
                    </audio>
                    <label><input type="radio" name="option" value="עומר אדם" checked={selectedOption === 'עומר אדם'} onChange={handleOptionChange} />עומר אדם - שיר למעלות</label><audio preload="auto" controls>
                        <source src={Bankai}  type="audio/mpeg"  />
                    </audio>
                    <label><input type="radio" name="option" value="בן סנוף" checked={selectedOption === 'בן סנוף'} onChange={handleOptionChange} />בן סנוף - שערי חופה</label><audio preload="auto" controls>
                        <source src={Bankai}  type="audio/mpeg" />
                    </audio>
                    <label><input type="radio" name="option" value="בן צור" checked={selectedOption === 'בן צור'} onChange={handleOptionChange} />בן צור - ממעמקים</label><audio preload="auto" controls>
                        <source src={Bankai} type="audio/mpeg" />
                    </audio>
</div>                    <br />
                <button className={style['button-85']} type="submit">Submit song</button>
        </form>}
            {isValid && !isVotedip && <p>{Valid}</p>}
            {isVoted && <h3>You already vote ~-~, enjoy your staying....</h3>}
            {isVotedip &&<span>You already vote and you delete lochalhost, Just enjoy your staying and leave your phone *-*</span> }
        </div>
    </>
    );
};

export default Submit;
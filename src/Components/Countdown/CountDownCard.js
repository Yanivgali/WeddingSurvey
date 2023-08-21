import { useState, useEffect} from 'react';
import './CountDownCard.css';
const CountDownSquare = () => {
    const targetDate = new Date('2024-03-20');
    const [Days, setDays] = useState(0);
    const [Hours, setHours] = useState(0);
    const [Mins, setMins] = useState(0);
    const [Secs, setSecs] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const timeDiff = targetDate - now;

            if (timeDiff > 0) {
                const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hoursLeft = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minsLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const secsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

                const formattedDays = daysLeft < 10 ? `0${daysLeft}` : daysLeft;
                const formattedHours = hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft;
                const formattedMins = minsLeft < 10 ? `0${minsLeft}` : minsLeft;
                const formattedSecs = secsLeft < 10 ? `0${secsLeft}` : secsLeft;

                setDays(formattedDays);
                setHours(formattedHours);
                setMins(formattedMins);
                setSecs(formattedSecs);
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className="countdowndiv">
            <div className="continer">
                <div><div className="wrap">{Days}</div><label>Days</label></div>
                <div><div className="wrap">{Hours}</div><label>Hours</label></div>
                <div><div className="wrap">{Mins}</div><label>Min</label></div>
                <div><div className="wrap">{Secs}</div><label>Sec</label></div>
            </div>
        </div>
  );
};

export default CountDownSquare;
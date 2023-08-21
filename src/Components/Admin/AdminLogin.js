import Modal from './Modal';
import style from './AdminLogin.module.css';
import React, { useState, useRef } from 'react';

const AdminLogin = (props) => {
    const nameRef = useRef('');
    const passwordRef = useRef('');
    const [log, islog] = useState(false);
    const [mostCommonInfo, setMostCommonInfo] = useState(null);
    const [gridViewData, setGridview] = useState([]);
    const [wastouch, setwastouch] = useState(false);
    const errormassage = !log && wastouch;
    const submitHandler = async () => {
        const adminUserName = nameRef.current.value;
        const admiAdminPassword = passwordRef.current.value;
        const response = await fetch('https://react-http-f8b73-default-rtdb.firebaseio.com/AdminInfo.json/');
        const data = await response.json();
        const admininfo = [];
        for (const key in data) {
            admininfo.push({
                id: key,
                AdminUserName: data[key].AdminUserName,
                AdminPassword: data[key].AdminPassword,
            });
            
            for (const admin of admininfo) {
                if (adminUserName === admin.AdminUserName && admiAdminPassword === admin.AdminPassword) {
                    console.log("Logged in");
                    const topSong = await fetch('https://react-http-f8b73-default-rtdb.firebaseio.com/users.json/');
                    const datasong = await topSong.json();
                    const songCounter = {};
                    for (const key in datasong) {
                        const songName = datasong[key].Song;
                        if (songCounter[songName]) {
                            songCounter[songName]++;
                        } else {
                            songCounter[songName] = 1;
                        }
                    }
                    let mostCommonSong = null;
                    let maxCount = 0;
                    for (const songName in songCounter) {
                        if (songCounter[songName] > maxCount) {
                            mostCommonSong = songName;
                            maxCount = songCounter[songName];
                        }
                    }
                    islog(true);                    
                    setMostCommonInfo(
                        <strong>
                            Most common song: {mostCommonSong}, Occurrences: {maxCount}
                        </strong>
                    );
                    setGridview(Object.values(datasong)); 
                }
                else {
                    islog(false);
                    setwastouch(true);
                    console.log("failed");
                }
            }
        }

    };
    return (
        <Modal onClose={props.onClose} className={style.gridview}>
            {!log && <div><label>User Name:<input ref={nameRef}></input></label><br/>
            <label>Password:<input type="password" ref={passwordRef}></input></label><br />
            <div className={style.actions}>
            <button onClick={props.onClose} className={style.button}>Close</button>
                    <button onClick={submitHandler} className={style.button}>Submit</button>{errormassage &&<p> Invalid info please try again</p> }
                </div></div>}
            {log && <grid>
                {mostCommonInfo}
                {gridViewData.map(song => (
                    <><hr />
                        <p><strong>Voter name:</strong> {song.nameVoter}</p>
                        <h3>Choose: {song.Song}</h3> 
                    </>
                ))}
            </grid>}
    </Modal>
    );
}
export default AdminLogin;
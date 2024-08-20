import React, { useState, useEffect } from 'react';
import styles from './ui/Leaderboard.module.css';
import ProfileCard from './ProfileCard';
    

const handles = ['tourist','PramodJ21','AmodJ10' , 'jiangly','radewoosh' , 'jenil0108',
    'rajat1603','RachitJain','queue','Uzuha_Narusuke' , 'Brash_Ketchup'
];

const Leaderboard = () => {
    const [userData, setUserData] = useState([]);
    const [trigger,setTrigger] = useState(false);
    const [currentUser, setCurrentUser] = useState();
    const [rank, setRank] = useState(0);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            // Join handles array into a comma-separated string
            const handlesStr = handles.join(';');
            const response = await fetch(`https://codeforces.com/api/user.info?handles=${handlesStr}`);
            const data = await response.json();
                console.log(data.result)
            if (data.status === 'OK') {
                setUserData(data.result);  // Update state with fetched user data
            } else {
                console.error('Error fetching user data:', data.comment);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    userData.sort((a, b) => b.rating - a.rating);

    const displayCard = (index) => {
        setCurrentUser(userData[index])
        setTrigger(true)
        setRank(index+1)
    }

    return (
        <div className={styles.Leaderboard}>
            <div className={styles.heading}>
                <h2>Leaderboard</h2>
            </div>
            <div className={styles.leaderboard}>
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Username</th>
                            <th>Rating</th>
                            <th>Codeforces Rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((player, index) => (
                            <tr key={index} onClick={() => {displayCard(index)}}>
                                <td><p>{index + 1}</p></td>
                                <td><img src={player.avatar || 'pfp.jpg'} alt='pfp' /><p>{player.handle}</p></td>
                                <td><p>{player.rating}</p></td>
                                <td><p>{player.rank}</p></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ProfileCard trigger={trigger} setTrigger={setTrigger} data={currentUser} rank={rank}/>
        </div>
    );
};

export default Leaderboard;

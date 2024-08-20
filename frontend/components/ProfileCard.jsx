import React, { useLayoutEffect, useRef } from 'react';
import styles from './ui/ProfileCard.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faXmark } from '@fortawesome/free-solid-svg-icons';
const ProfileCard = (props) => {

    return (props.trigger ? (
        <div className={styles.profileCard}>
            
            
            <div className={styles.cardImage}>
            <div className={styles.cancel}>
            <button onClick={() => { props.setTrigger(false) }}>X</button>
            </div> 
            
            <img src={props.data.avatar} />
            <div className={styles.details}>
            {/* <div className={styles.realRank}>
                <div className={styles.inner}>
                        <p>1</p>
                </div>
            </div> */}
            
            </div>
                
            </div>
            <div className={styles.cardContent}>
            <div className={styles.heading}>
                        <h1>#  {props.rank} </h1>
                        <h1>{props.data.handle}</h1>
                </div>
                <div className={styles.hr}><hr /></div>
                <div className={styles.cardHistory}>
                    <div className={styles.col1}>
                        <div className={styles.country}>
                            <p>Country</p>
                            <h1>{props.data.country ? props.data.country : "-"}</h1>
                        </div>
                        <div className={styles.maxRating}>
                            <p>Max Rating</p>
                            <h1>{props.data.maxRating}</h1>
                        </div>
                    </div>
                    <div className={styles.col2}>
                        <div className={styles.city}>
                            <p>City</p>
                            <h1>{props.data.city ? props.data.city : "-"}</h1>
                        </div>
                        <div className={styles.maxRank}>
                            <p>Max Rank</p>
                            <h1>{props.data.maxRank}</h1>
                        </div>
                    </div>
                </div>
                <div className={styles.cardCurrent}>
                    <div className={styles.currentRank}>
                            <h1>{props.data.rank}</h1>
                            <p>Rank</p>
                    </div>
                    <div className={styles.currentRating}>
                            <h1>{props.data.rating}</h1>
                            <p>Rating</p>
                    </div>
                </div>
            </div>
        </div>
    ) : ""
  );
}

export default ProfileCard;

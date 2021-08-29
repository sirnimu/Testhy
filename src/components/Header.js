import React, {useContext} from 'react';
import Button from './Button'
import testhy from '../assets/logo.svg';
import info from '../assets/icons/info.svg';
import styles from '../styles/Header.module.scss';
import GifContext from '../store/gifs-context';


function Header() {
    const gifsCtx = useContext(GifContext);

    return (
        <header className={styles.Header}>
            <img src={testhy} alt="logo"/>
            <nav>
                {gifsCtx.isLoading && <p>New gifs are loading...</p>}
                <img src={info} alt="info icon"></img>
                <p>Press <span>spacebar</span> to shuffle or</p>
                <Button text="Click here" onClick={gifsCtx.shuffle} />
            </nav>
        </header>
    )
}

export default Header

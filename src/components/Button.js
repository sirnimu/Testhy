import React from 'react';
import styles from '../styles/Button.module.scss'

function Button(props) {
    return (
        <button className={styles.Button} onClick={props.onClick}>
            {props.text}
        </button>
    )
}

export default Button

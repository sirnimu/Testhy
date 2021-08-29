import React from 'react';
import styles from '../styles/ImageSlot.module.scss';

function ImageSlot(props) {
    return (
        <img 
            className={`${styles.ImageSlot} ${props.gif.locked ? styles.locked : ''}`}
            src={props.gif.images['downsized'].url}
            alt={props.gif.title}
            width="335"
            height="260"
            onClick={() => { props.clickImage(props.gif.id); }}
        />
    )
}

export default ImageSlot

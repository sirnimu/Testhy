import React, { useState, useReducer, useEffect } from 'react';
import { API } from '../configs';
import axios from "axios";

const GifContext = React.createContext({
    data: [],
    shuffle: () => {},
    toggleLockSlot: (id) => {},
    isLoading: false
});

export const GifContextProvider = (props) => {
    const [data, dispatch] = useReducer(reducer, []);

    function reducer(state, action) {
        switch (action.type) {
          case 'updateAll':
            const lockedGifsIDs = [];
            action.payload.forEach(gif => {
                if (gif.locked){
                    lockedGifsIDs.push(gif.id);
                }
            })
            localStorage.setItem('locked', lockedGifsIDs.join(','));
            return [...action.payload];
          default:
            throw new Error();
        }
      }

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('locked')){
            // TODO: replace with API call to get gifs by ID
            axios(API.TRENDING_15)
            .then(res => {
              res.data.data.sort((a, b) => a.import_datetime > b.import_datetime ? 1 : -1);
              dispatch({type: 'updateAll', payload: res.data.data});
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        } else {
            axios(API.TRENDING_15)
            .then(res => {
              res.data.data.sort((a, b) => a.import_datetime > b.import_datetime ? 1 : -1);
              dispatch({type: 'updateAll', payload: res.data.data});
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }
      }, []);
      
    const toggleLockSlot = (id) => {
        const newData = [...data];
        const clickedGifIndex = newData.findIndex(gif => gif.id === id);
        newData.splice(clickedGifIndex, 1, {...newData[clickedGifIndex], locked: !newData[clickedGifIndex].locked})
        dispatch({type: 'updateAll', payload: newData});
    };

    /* Could be optimized */
    const shuffle = () => {
        const shuffleCount = data.filter((gif)=> !gif.locked).length;
        const fetchedGifs = [];

        let promises = [];
        for (let i = 0; i < shuffleCount; i++) {
            promises.push(
                axios.get(API.RANDOM)
                .then(res => {
                    fetchedGifs.push(res.data.data);
                })
            )
        }

        setIsLoading(true);
        Promise.all(promises).then(
            () => {
                const newData = [...data];
                newData.forEach((gif, i) => {
                    if(!gif.locked){
                        newData.splice(i, 1, fetchedGifs.pop())
                    }
                })
                setIsLoading(false);
                dispatch({type: 'updateAll', payload: newData});
            });
      };
    

    return (
        <GifContext.Provider value={{
            data: data,
            shuffle: shuffle,
            toggleLockSlot: toggleLockSlot,
            isLoading: isLoading
        }}>
            {props.children}
        </GifContext.Provider>
    )
}

export default GifContext;
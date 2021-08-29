import { useContext, useEffect } from 'react';
import ImageSlot from './ImageSlot';
import Header from './Header';
import styles from '../styles/App.module.scss';
import GifContext from '../store/gifs-context';

function App() {
  const gifsCtx = useContext(GifContext);

  useEffect(()=>{
    const shuffleOnSpacebar = (e) => {
      if (e.key === " ") {
        gifsCtx.shuffle();
      }
    };

    window.addEventListener("keydown", shuffleOnSpacebar);
    
    return () => {
      window.removeEventListener("keydown", shuffleOnSpacebar);
    }

  }, [gifsCtx]);

  return (
      <div className={styles.App}>
        <Header/>
        <main>
          {gifsCtx.data.map((gif) => <ImageSlot key={gif.id} gif={gif} clickImage={gifsCtx.toggleLockSlot}/> )}
        </main>
      </div>
  );
}

export default App;

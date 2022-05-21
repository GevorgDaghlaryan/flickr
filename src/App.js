
import { useState } from 'react';
import './App.css';


const apiKay = '64f9546e63e627508a25a9ec05364128';
const per_page = 5;

function App() {
  const [inputValue, setInputValue] = useState(null)
  function handleChange(event) {
    setInputValue(event.target.value)

  }
  const [photos, setPhotos] = useState(null)

  async function search() {
    debugger
    const texArr = inputValue.split(' ');
    let newDate = [];
    for (let i = 0; i < texArr.length; i++) {
      let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKay}&text=${texArr[i]}&per_page=${per_page}&format=json&nojsoncallback=1`
      try {
        const response = await fetch(url, { method: 'GET' });
        const data = await response.json();
        if (newDate) {
          newDate = { [texArr[i]]: data.photos.photo, ...newDate };
          setPhotos(newDate);
        } else {
          setPhotos({ [texArr[i]]: data.photos.photo });
        }

      } catch (err) {
        console.log(err);
      }
    }

  }
  return (
    <>
      <div className='search'>
        <input className='searchInput' type="text" onChange={handleChange} />
        <button className='searchButton' type="button" onClick={search}>
          Search
        </button>
      </div>
      {photos && (<div className='imgList'>
        {
          Object.keys(photos).map((item, ind, keysArr) => {
            return <span key={ind}>
              {photos[item].map((itm, index) => (<span key={itm.id}>
                <img draggable="true" alt={item} className='photos' key={itm.id} src={`https://live.staticflickr.com/${itm.server}/${itm.id}_${itm.secret}.jpg`} width="200" height="200" />
                {index === photos[item].length - 1 && ind === keysArr.length - 1 && (
                  
                  <div className='dropBlocks'>
                    {console.log({keysArr},{photos},  photos[item] )}
                 { keysArr.map((item) => (
                    <div key={item} name={item} className="dropBlock">{item}</div>
                  ))}
                  </div>
                )}
              </span>))}
            </span>
          })
        }
      </div>)}
    </>

  )
}

export default App;

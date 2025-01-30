import { useState, useEffect } from 'react';
import '../styles/MemeGenerator.css';

function MemeGenerator() {
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg',
    fontSize: 40,
  });
  const [allMemes, setAllMemes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const foundMeme = allMemes.find(
      (meme) => meme.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (foundMeme) {
      setMeme((prevMeme) => ({
        ...prevMeme,
        randomImage: foundMeme.url,
      }));
    } else {
      alert('No meme found with that name!');
    }
  };

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();

    image.crossOrigin = 'anonymous';
    image.src = meme.randomImage;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw image
      ctx.drawImage(image, 0, 0);

      // Configure text
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.textAlign = 'center';
      ctx.font = `${meme.fontSize}px Impact`;

      // Draw top text
      ctx.fillText(meme.topText, canvas.width / 2, 60);
      ctx.strokeText(meme.topText, canvas.width / 2, 60);

      // Draw bottom text
      ctx.fillText(meme.bottomText, canvas.width / 2, canvas.height - 20);
      ctx.strokeText(meme.bottomText, canvas.width / 2, canvas.height - 20);

      // Create download link
      const link = document.createElement('a');
      link.download = 'meme.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
  };

  return (
    <div className="meme-container">
      <div className="controls-panel">
        <div className="meme-controls">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search meme by name"
              className="input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch} className="button secondary-button">
              Search Meme
            </button>
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Top text"
              className="input-field"
              name="topText"
              value={meme.topText}
              onChange={handleChange}
            />
            <div className="font-size-control">
              <label>Font Size:</label>
              <input
                type="range"
                min="20"
                max="80"
                name="fontSize"
                value={meme.fontSize}
                onChange={handleChange}
              />
              <span>{meme.fontSize}px</span>
            </div>
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Bottom text"
              className="input-field"
              name="bottomText"
              value={meme.bottomText}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="buttons-container">
          <button onClick={getMemeImage} className="button secondary-button">
            Get Random Meme 🖼️
          </button>
          <button onClick={handleDownload} className="button primary-button">
            Download Meme 💾
          </button>
        </div>
      </div>

      <div className="meme-preview">
        <img src={meme.randomImage} className="meme-image" alt="meme" />
        <h2
          className="meme-text top-text"
          style={{ fontSize: `${meme.fontSize}px` }}
        >
          {meme.topText}
        </h2>
        <h2
          className="meme-text bottom-text"
          style={{ fontSize: `${meme.fontSize}px` }}
        >
          {meme.bottomText}
        </h2>
      </div>
    </div>
  );
}

export default MemeGenerator;



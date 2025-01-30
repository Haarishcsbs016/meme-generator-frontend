import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MemeEditor.css';

const MEME_TEMPLATES = [
  {
    id: 1,
    url: 'https://i.imgflip.com/30b1gx.jpg',
    name: 'Drake Hotline Bling'
  },
  {
    id: 2,
    url: 'https://i.imgflip.com/1bij.jpg',
    name: 'One Does Not Simply'
  },
  {
    id: 3,
    url: 'https://i.imgflip.com/1g8my4.jpg',
    name: 'Two Buttons'
  },
  {
    id: 4,
    url: 'https://i.imgflip.com/261o3j.jpg',
    name: 'Buff Doge vs Cheems'
  },
  {
    id: 5,
    url: 'https://i.imgflip.com/3lmzyx.jpg',
    name: 'Disappointed Black Guy'
  },
  {
    id: 6,
    url: 'https://i.imgflip.com/4acd7j.png',
    name: 'Trade Offer'
  },
  {
    id: 7,
    url: 'https://i.imgflip.com/24y43o.jpg',
    name: 'Distracted Boyfriend'
  },
  {
    id: 8,
    url: 'https://i.imgflip.com/28j0te.jpg',
    name: 'Change My Mind'
  },
  {
    id: 9,
    url: 'https://i.imgflip.com/gtj5t.jpg',
    name: 'Grus Plan'
  },
  {
    id: 10,
    url: 'https://i.imgflip.com/1e7ql7.jpg',
    name: 'Running Away Balloon'
  },
  {
    id: 11,
    url: 'https://i.imgflip.com/9vct.jpg',
    name: 'Hide the Pain Harold'
  },
  {
    id: 12,
    url: 'https://i.imgflip.com/4t0m5.jpg',
    name: 'Evil Kermit'
  },
  {
id:13,
url:'https://images.app.goo.gl/8enXmTNx2Z3wgNer5',
name:'dragon'
  },
  {
  id:14,
url:'https://images.app.goo.gl/vjRoCUS4DmHxiPkE8',
name:'krishna'
  }
];

const MemeEditor = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(MEME_TEMPLATES[0]);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  const downloadMeme = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Configure text style
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.font = 'bold 48px Impact';
      ctx.textAlign = 'center';

      // Add top text
      if (topText) {
        ctx.strokeText(topText, canvas.width / 2, 60);
        ctx.fillText(topText, canvas.width / 2, 60);
      }

      // Add bottom text
      if (bottomText) {
        ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
        ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
      }

      // Download the meme
      const link = document.createElement('a');
      link.download = 'meme.png';
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      });
    };
    img.src = selectedTemplate.url;
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back
        </button>
        <h2>Meme Editor</h2>
      </div>
      
      <div className="editor-content">
        <div className="meme-canvas">
          <div className="meme-preview">
            <img 
              src={selectedTemplate.url} 
              alt={selectedTemplate.name}
              className="meme-image"
            />
            <div className="meme-text top">{topText}</div>
            <div className="meme-text bottom">{bottomText}</div>
          </div>
        </div>

        <div className="editor-controls">
          <div className="templates-section">
            <label>Choose Template</label>
            <div className="templates-grid">
              {MEME_TEMPLATES.map((template) => (
                <div 
                  key={template.id}
                  className={`template-thumb ${selectedTemplate.id === template.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <img src={template.url} alt={template.name} />
                </div>
              ))}
            </div>
          </div>

          <div className="text-controls">
            <div className="control-group">
              <label>Top Text</label>
              <input
                type="text"
                value={topText}
                onChange={(e) => setTopText(e.target.value.toUpperCase())}
                placeholder="Enter top text"
              />
            </div>
            
            <div className="control-group">
              <label>Bottom Text</label>
              <input
                type="text"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value.toUpperCase())}
                placeholder="Enter bottom text"
              />
            </div>
          </div>

          <div className="action-buttons">
            <button className="download-btn" onClick={downloadMeme}>
              Download Meme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeEditor; 
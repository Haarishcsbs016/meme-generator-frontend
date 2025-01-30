import { useRef, useEffect } from 'react';

const EditorPreview = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Draw background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw editor interface elements
    // Toolbar
    ctx.fillStyle = 'white';
    ctx.fillRect(20, 20, canvas.width - 40, 60);
    ctx.strokeStyle = '#e6e6e6';
    ctx.strokeRect(20, 20, canvas.width - 40, 60);

    // Meme preview area
    ctx.fillStyle = 'white';
    ctx.fillRect(20, 100, canvas.width - 300, canvas.height - 120);
    ctx.strokeStyle = '#e6e6e6';
    ctx.strokeRect(20, 100, canvas.width - 300, canvas.height - 120);

    // Sidebar
    ctx.fillStyle = 'white';
    ctx.fillRect(canvas.width - 260, 100, 240, canvas.height - 120);
    ctx.strokeStyle = '#e6e6e6';
    ctx.strokeRect(canvas.width - 260, 100, 240, canvas.height - 120);

    // Draw sample meme
    const drawMeme = () => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        // Draw meme image
        ctx.drawImage(img, 40, 120, canvas.width - 340, 400);
        
        // Add sample text
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.font = 'bold 40px Impact';
        ctx.textAlign = 'center';
        
        // Top text
        const topText = "WHEN YOU FINALLY";
        ctx.strokeText(topText, (canvas.width - 340) / 2 + 40, 180);
        ctx.fillText(topText, (canvas.width - 340) / 2 + 40, 180);
        
        // Bottom text
        const bottomText = "CREATE THE PERFECT MEME";
        ctx.strokeText(bottomText, (canvas.width - 340) / 2 + 40, 480);
        ctx.fillText(bottomText, (canvas.width - 340) / 2 + 40, 480);
      };
      img.src = 'https://i.imgflip.com/30b1gx.jpg';
    };

    drawMeme();
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: 'auto' }} />;
};

export default EditorPreview; 
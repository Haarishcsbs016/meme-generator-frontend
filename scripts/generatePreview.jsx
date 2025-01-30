import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';

async function generatePreview() {
  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext('2d');

  // Same drawing code as EditorPreview component...

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(process.cwd(), 'public', 'editor-preview.png'), buffer);
}

generatePreview(); 
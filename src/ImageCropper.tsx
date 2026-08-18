import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import type { Point, Area } from 'react-easy-crop';

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImageBase64: string) => void;
  onCancel: () => void;
  accentColor?: string;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ imageSrc, onCropComplete, onCancel, accentColor = '#FF9E00' }) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropCompleteCallback = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;

    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(croppedImage);
    } catch (e) {
      console.error(e);
      onCancel();
    }
  };

  return (
    <div className="cropper-modal-overlay">
      <div className="cropper-modal-content">
        <div className="cropper-container">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropCompleteCallback}
            onZoomChange={setZoom}
          />
        </div>
        <div className="cropper-controls">
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(Number(e.target.value))}
            className="zoom-slider"
          />
        </div>
        <div className="cropper-actions">
          <button className="btn-secondary" onClick={onCancel}>Cancelar</button>
          <button className="btn-primary" style={{ backgroundColor: accentColor, borderColor: accentColor }} onClick={handleSave}>Salvar</button>
        </div>
      </div>
    </div>
  );
};

// Helper function to create the cropped image
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  flip = { horizontal: false, vertical: false }
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  // set canvas size to match the bounding box
  canvas.width = image.width;
  canvas.height = image.height;

  ctx.translate(image.width / 2, image.height / 2);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement('canvas');
  const croppedCtx = croppedCanvas.getContext('2d');

  if (!croppedCtx) {
    throw new Error('No 2d context');
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Resize the cropped image to a max dimension of 320px to save storage
  const maxDim = 320;
  let finalWidth = pixelCrop.width;
  let finalHeight = pixelCrop.height;

  if (finalWidth > finalHeight) {
    if (finalWidth > maxDim) {
      finalHeight = Math.round((finalHeight * maxDim) / finalWidth);
      finalWidth = maxDim;
    }
  } else {
    if (finalHeight > maxDim) {
      finalWidth = Math.round((finalWidth * maxDim) / finalHeight);
      finalHeight = maxDim;
    }
  }

  const resizedCanvas = document.createElement('canvas');
  resizedCanvas.width = finalWidth;
  resizedCanvas.height = finalHeight;
  const resizedCtx = resizedCanvas.getContext('2d');
  
  if (resizedCtx) {
    resizedCtx.drawImage(
      croppedCanvas,
      0, 0, pixelCrop.width, pixelCrop.height,
      0, 0, finalWidth, finalHeight
    );
    return resizedCanvas.toDataURL('image/jpeg', 0.85);
  }

  // Fallback
  return croppedCanvas.toDataURL('image/jpeg', 0.85);
}

export default ImageCropper;

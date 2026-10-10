import { useRef, useState, useEffect } from 'react';

export default function SignaturePad({ onSave, onClose }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasSignature(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleSave = () => {
    if (!hasSignature) return;
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    onSave(dataUrl);
    if (onClose) onClose();
  };

  return (
    <div
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '24px',
        maxWidth: '480px',
        width: '100%',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem' }}>✍️ Digital Signature</h3>
      <p style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', marginBottom: '16px' }}>
        Draw your signature inside the box below to embed it into your document PDF.
      </p>

      <div style={{ border: '2px dashed var(--accent)', borderRadius: '12px', background: '#ffffff', overflow: 'hidden' }}>
        <canvas
          ref={canvasRef}
          width={430}
          height={160}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{ cursor: 'crosshair', display: 'block', width: '100%', touchAction: 'none' }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <button className="btn btn-ghost btn-sm" onClick={clearCanvas}>
          🗑️ Clear
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          {onClose && (
            <button className="btn btn-ghost btn-sm" onClick={onClose}>
              Cancel
            </button>
          )}
          <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={!hasSignature}>
            💾 Save Signature
          </button>
        </div>
      </div>
    </div>
  );
}

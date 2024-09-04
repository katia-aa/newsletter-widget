/** @jsx h */
import { h, render } from "preact";
import { useEffect, useRef } from "preact/hooks";
import SignaturePad from "signature_pad";

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let signaturePad: SignaturePad | null = null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      signaturePad = new SignaturePad(canvas);
    }
  }, []); // This runs after the component has mounted

  const handleClear = () => {
    if (signaturePad) signaturePad.clear();
  };

  return (
    <div className="signature-pad-container">
      <h2>Please Sign Below</h2>
      <canvas
        className="signature-pad-canvas"
        ref={canvasRef}
        width={400}
        height={200}
      />
      <br />
      <button
        className="signature-pad-button"
        type="button"
        onClick={handleClear}
      >
        Clear
      </button>
    </div>
  );
};

const rootElement = document.getElementById(
  "preact-signature-pad-root"
) as HTMLElement;

// Create a shadow root
const shadowRoot = rootElement.attachShadow({ mode: "open" });

// Create a style element and append it to the shadow root
const style = document.createElement("style");
style.textContent = `
    .signature-pad-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: Arial, sans-serif;
    }

    .signature-pad-canvas {
      border: 2px solid #333;
      border-radius: 8px;
      width: 100%;
      max-width: 400px;
      height: auto;
    }

    .signature-pad-button {
      margin: 10px;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      width: 100%;
      max-width: 200px;
    }

    .signature-pad-button:hover {
      background-color: #45a049;
    }
  `;

// Append the style to the shadow root
shadowRoot.appendChild(style);

// Render the component into the shadow root
render(<App />, shadowRoot);

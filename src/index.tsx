/** @jsx h */
import { h, render } from "preact";
import { useEffect, useRef } from "preact/hooks";
import SignaturePad from "signature_pad";

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let signaturePad: SignaturePad | null = null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Ensure the signature pad is initialized
    const signatureInput = document.getElementById(
      "signature-field"
    ) as HTMLInputElement;

    const initializeSignaturePad = () => {
      if (!signaturePad) signaturePad = new SignaturePad(canvas);

      const updateSignatureField = () => {
        console.log("Event listener triggered");
        if (signaturePad && !signaturePad.isEmpty()) {
          const signatureData = signaturePad.toDataURL();
          signatureInput.value = signatureData; // Update the hidden input with signature data
          console.log(
            "Signature captured and updated in hidden field:",
            signatureData
          );
        }
      };

      // Attach listeners for mouse and touch events
      if (signaturePad) {
        // Add continuous update listeners
        canvas.addEventListener("mousemove", updateSignatureField); // Continuous update during mouse move
        canvas.addEventListener("touchmove", updateSignatureField); // Continuous update during touch move

        // Final update when drawing finishes
        canvas.addEventListener("mouseup", updateSignatureField); // For mouse interactions
        canvas.addEventListener("touchend", updateSignatureField); // For touch interactions

        console.log("Event listeners installed");
      }

      return () => {
        // Cleanup listeners on unmount
        canvas.removeEventListener("mousemove", updateSignatureField);
        canvas.removeEventListener("touchmove", updateSignatureField);
        canvas.removeEventListener("mouseup", updateSignatureField);
        canvas.removeEventListener("touchend", updateSignatureField);
      };
    };

    // Use requestAnimationFrame to delay the initialization until the canvas is ready
    const rafId = requestAnimationFrame(() => {
      initializeSignaturePad();
    });

    // Cleanup when unmounting or when canvas is not available
    return () => {
      cancelAnimationFrame(rafId);
      if (canvas) {
        canvas.removeEventListener("mouseup", initializeSignaturePad);
        canvas.removeEventListener("touchend", initializeSignaturePad);
      }
    };
  }, []); // this runs after the component has mounted

  return (
    <div className="signature-pad-container">
      <canvas
        ref={canvasRef}
        className="signature-pad-canvas"
        width={400}
        height={200}
      ></canvas>
      <br />
      <button
        type="button"
        className="signature-pad-button"
        onClick={() => {
          if (signaturePad) signaturePad.clear();
        }}
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
    :host {
        all: initial; /* Reset all styles */
        font-family: inherit; /* Inherit font from the host */
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
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }

    .signature-pad-button:hover {
      background-color: #45a049;
    }
  `;

// Append the style to the shadow root
shadowRoot.appendChild(style);

// Render the component into the shadow root
render(<App />, shadowRoot);

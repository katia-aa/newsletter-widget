/** @jsx h */
import { h, render } from "preact";
import { useRef } from "preact/hooks";
import SignaturePad from "signature_pad";

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const signaturePad = new SignaturePad(canvas);
      signaturePad.clear();
    }
  };

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    if (canvas) {
      const signaturePad = new SignaturePad(canvas);
      if (!signaturePad.isEmpty()) {
        const signatureData = signaturePad.toDataURL();
        console.log("Signature Data:", signatureData);
        // Hook this up to form submission or backend processing
      } else {
        alert("Please provide a signature.");
      }
    }
  };

  return (
    <div>
      <h2>Please Sign Below</h2>
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        style="border: 1px solid #000"
      ></canvas>
      <br />
      <button type="button" onClick={handleClear}>
        Clear
      </button>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

// Render the component to a root element
render(
  <App />,
  document.getElementById("preact-signature-pad-root") as HTMLElement
);

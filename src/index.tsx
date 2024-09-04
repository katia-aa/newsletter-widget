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
    if (signaturePad) {
      signaturePad.clear();
    }
  };

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    if (signaturePad && !signaturePad.isEmpty()) {
      const signatureData = signaturePad.toDataURL();
      console.log("Signature Data:", signatureData);
    } else {
      alert("Please provide a signature.");
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

document.addEventListener("DOMContentLoaded", () => {
  render(
    <App />,
    document.getElementById("preact-signature-pad-root") as HTMLElement
  );
});

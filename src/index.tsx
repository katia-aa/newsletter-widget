/** @jsx h */
import { h, render } from "preact";

const App = () => <div>Hello World!!</div>;

// Assuming the script will be embedded in an element with an ID
render(<App />, document.getElementById("preact-widget-root") as HTMLElement);

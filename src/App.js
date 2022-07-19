import "./App.css";
import Home from "./pages/Home";
import Clock from "./pages/Clock";
import Cards from "./pages/Cards";
import TrySvg from "./pages/TrySvg";
import Circle from "./pages/Circle";
import Canvas from "./pages/Canvas";
import Backga from "./pages/backga";
import Try from "./pages/try";

function App() {
  return (
    <div className="App">
      <Clock />
      <Home />
      <Cards />
      <TrySvg />
      <Circle />
      <Canvas />
      <Backga />
      <Try />
    </div>
  );
}

export default App;

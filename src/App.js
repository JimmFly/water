import "./App.css";
import Home from "./pages/Home";
import Clock from "./pages/Clock";
import Cards from "./pages/Cards";
import TrySvg from "./pages/TrySvg";
import Circle from "./pages/Circle";

function App() {
  return (
    <div className="App">
      <Clock />
      <Home />
      <Cards />
      <TrySvg />
      <Circle />
    </div>
  );
}

export default App;

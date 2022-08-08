import "./App.css";
import Home from "./pages/Water";
import Clock from "./pages/Clock";
import Cards from "./pages/Cards";
import TrySvg from "./pages/TrySvg";
import Circle from "./pages/Circle";
import Canvas from "./pages/Canvas";
import Backga from "./pages/backga";
import Try from "./pages/tryJotai";
import Slate from "./pages/TrySlate";
import { Provider } from "jotai";

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
      <Provider>
        <Try />
      </Provider>
      <Slate />
    </div>
  );
}

export default App;

// const ItemList = (itemAtom) => {
//   const [list] = useAtom(filteredByAliasListAtom);
//   const [selected, setSelected] = useAtom(selectItemAtom);

//   const isSelected = selected === itemAtom;

//   const onSelect = () => {
//     console.log(list);
//     // setSelected(itemAtom);
//   };
//   return (
//     <div>
//       List
//       <ul>
//         {list.map((item, i) => (
//           <li key={i}>
//             <div
//               onClick={(e) => onSelect(e.target)}
//               style={{ backgroundColor: isSelected ? "grey" : "#fff" }}
//             >
//               <span>{item.init.alias}</span>
//               <span> - </span>
//               <span>{item.init.text}</span>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

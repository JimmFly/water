import { useAtom } from "jotai";
import {
  aliasAtom,
  textAtom,
  selectItemAtom,
  filteredByAliasListAtom,
  updateItemAtom,
  deleteItemAtom,
  filterAtom,
  createItemAtom,
} from "../store/atom";

const AliasInput = () => {
  const [alias, setAlias] = useAtom(aliasAtom);
  return (
    <div>
      <span>Alias</span>
      <input value={alias} onChange={(e) => setAlias(e.target.value)} />
    </div>
  );
};

const TextInput = () => {
  const [text, setText] = useAtom(textAtom);
  return (
    <div>
      <span>Text</span>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
};

const FilterInput = () => {
  const [filter, setFilter] = useAtom(filterAtom);
  return (
    <div>
      <span>Filter</span>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
};

const OptButtonGroup = () => {
  const [, create] = useAtom(createItemAtom);
  const [, update] = useAtom(updateItemAtom);
  const [, deleteItem] = useAtom(deleteItemAtom);

  return (
    <>
      <button onClick={create}>Create</button>
      <button onClick={deleteItem}>Delete</button>
      <button onClick={update}>Update</button>
    </>
  );
};

const Item = ({ itemAtom }) => {
  const [value] = useAtom(itemAtom);
  const [selected, setSelected] = useAtom(selectItemAtom);
  const { alias, text } = value;

  const isSelected = selected === itemAtom;

  const onSelect = () => {
    setSelected(itemAtom);
  };

  return (
    <div
      onClick={onSelect}
      style={{ backgroundColor: isSelected ? "grey" : "#fff" }}
    >
      <span>{alias}</span>
      <span> - </span>
      <span>{text}</span>
    </div>
  );
};

const ItemList = () => {
  const [list] = useAtom(filteredByAliasListAtom);

  return (
    <div>
      List
      <ul>
        {list.map((item, i) => (
          <li key={i}>
            <Item itemAtom={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Try() {
  return (
    <div className="App">
      <AliasInput />
      <TextInput />
      <FilterInput />
      <div>
        <OptButtonGroup />
      </div>
      <div>
        <ItemList />
      </div>
    </div>
  );
}

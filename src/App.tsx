import { useState, useEffect } from "react";
import { data } from "./script/data";
import { itemsType } from "./type";
import { List } from "./components/List";
import "./App.css";

function App() {
  const [items, setItems] = useState<itemsType[]>([]);

  useEffect(() => {
    const obj = async () => {
      const result = await data();
      setItems(result);
    };
    obj();
  }, []);

  const setNewItems = (todo: itemsType) => {
    const newItems = items.map((item) => {
      if (item.id === todo.id) {
        return {
          ...item,
          ...todo,
        };
      }
      return item;
    });
    setItems(newItems);
  };

  return (
    <div className="App">
      <h1>Todo Matic Ver.3</h1>
      <div className="d-flex">
        <div className="w50">
          <h2>未完了</h2>
          {items
            .filter((item) => !item.completed)
            .map((item) => (
              <List key={item.id} item={item} setNewItems={setNewItems} />
            ))}
        </div>
        <div className="w50">
          <h2>完了</h2>
          {items
            .filter((item) => item.completed)
            .map((item) => (
              <List key={item.id} item={item} setNewItems={setNewItems} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;

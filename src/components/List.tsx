import { useState } from "react";
import { itemsType } from "../type";

type itemsPropsType = {
  item: itemsType;
  setNewItems: (todo: itemsType) => void;
};

export const List = ({ item, setNewItems }: itemsPropsType) => {
  const [title, setTitle] = useState<string>(item.title);
  const [date, setDate] = useState<Date>(item.limit);
  const [complete, setComplete] = useState<boolean>(item.completed);
  const [text, setText] = useState<string>("期限内");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (complete === false && new Date() >= date) {
      setText("期間内");
    } else if (complete === false && new Date() < date) {
      setText("期間外");
    } else if (complete === true) {
      setText("達成");
    }

    item.title = title;
    item.limit = date;
    item.completed = complete;

    setNewItems(item);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(e.target.value));
  };

  const handleCompChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "done") {
      setComplete(true);
    } else {
      setComplete(false);
    }
  };

  return (
    <>
      <div className="card">
        <p>{item.id}</p>
        <h3>{title}</h3>
        <p>{text}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" onChange={handleTitleChange} value={title} />
          </div>
          <div>
            <input
              type="date"
              onChange={handleDateChange}
              value={date.toISOString().substring(0, 10)}
            />
          </div>
          <div role="radiogroup">
            <label>
              <input
                type="radio"
                name="test"
                value="done"
                checked={complete === true}
                onChange={handleCompChange}
              />
              完了
            </label>
            <label>
              <input
                type="radio"
                name="test"
                value=""
                checked={complete === false}
                onChange={handleCompChange}
              />
              未完了
            </label>
          </div>
          <button>保存</button>
        </form>
      </div>
    </>
  );
};

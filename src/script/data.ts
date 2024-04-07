import { itemsType } from "../type";

export const data = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos/?userId=1",
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: itemsType[] = await response.json();

  const items = data.map((item) => {
    let newItem = {
      ...item,
      limit: new Date(),
    };

    return newItem;
  });

  return items;
};

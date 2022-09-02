import { v4 as uuid } from "uuid";

const generateData = (col = 3, row = 3) => {
  const data = [];

  for (let i = 1; i <= col; i++) {
    const tasks = [];
    for (let j = 1; j <= row; j++) {
      tasks.push({
        id: uuid(),
        title: `Row ${i}${j}`,
      });
    }

    data.push({
      id: uuid(),
      title: `Column ${i}`,
      tasks,
    });
  }

  return data;
};

export default generateData;

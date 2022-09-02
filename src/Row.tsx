import { Draggable } from "react-beautiful-dnd";

interface PropsType {
  row: {
    id: string;
    title: string;
  };
  index: number;
}

const Row = ({ row, index }: PropsType) => {
  return (
    <Draggable draggableId={`${row.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          className="row"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p className="id">ID: {row.id}</p>
          <p>Title: {row.title}</p>
        </div>
      )}
    </Draggable>
  );
};

export default Row;

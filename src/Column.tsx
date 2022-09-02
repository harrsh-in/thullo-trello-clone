import { Draggable, Droppable } from "react-beautiful-dnd";
import Row from "./Row";

interface PropsType {
  column: {
    id: string;
    title: string;
    tasks: {
      id: string;
      title: string;
    }[];
  };
  index: number;
}

const Column = ({ column, index }: PropsType) => {
  return (
    <Draggable draggableId={`${column.id}`} index={index}>
      {(provided) => (
        <div
          className="col"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <p {...provided.dragHandleProps} className="title">
            Col: {column.title}
          </p>
          <Droppable droppableId={`${column.id}`} type="task">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="tasks"
              >
                {column.tasks.map((row, index) => (
                  <Row row={row} index={index} key={row.id} />
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;

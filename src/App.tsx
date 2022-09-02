import { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Column from "./Column";
import generateData from "./generateData";

interface reorderPayloadType {
  tempData: {
    id: string;
    title: string;
    tasks: {
      id: string;
      title: string;
    }[];
  }[];
  sourceIndex: number;
  destinationIndex: number;
  droppableId: string;
  sourceDroppableId: string;
  destinationDroppableId: string;
}

const App = () => {
  const [data, setData] = useState(generateData(4, 10));

  const columnReOrder = (payload: any) => {
    const { tempData, sourceIndex, destinationIndex } = payload;
    const tempCols = tempData;

    const [removed] = tempCols.splice(sourceIndex, 1);
    tempCols.splice(destinationIndex, 0, removed);
    setData(tempCols);
    return;
  };

  // When source and destination is the same column.
  const reOrder = (payload: reorderPayloadType) => {
    const { tempData, sourceIndex, destinationIndex, droppableId } = payload;
    const droppableIndex = tempData.findIndex((x) => x.id === droppableId);
    const tempTasks = [...tempData[droppableIndex].tasks];

    const [removed] = tempTasks.splice(sourceIndex, 1);
    tempTasks.splice(destinationIndex, 0, removed);

    tempData[droppableIndex].tasks = [...tempTasks];
    setData(tempData);
  };

  const changeColumn = (payload: reorderPayloadType) => {
    const {
      tempData,
      sourceIndex,
      destinationIndex,
      sourceDroppableId,
      destinationDroppableId,
    } = payload;
    const sourceDroppableIndex = tempData.findIndex(
      (x) => x.id === sourceDroppableId
    );
    const destinationDroppableIndex = tempData.findIndex(
      (x) => x.id === destinationDroppableId
    );

    const sourceTempTasks = [...tempData[sourceDroppableIndex].tasks];
    const destinationTempTasks = [...tempData[destinationDroppableIndex].tasks];

    const [removed] = sourceTempTasks.splice(sourceIndex, 1);
    destinationTempTasks.splice(destinationIndex, 0, removed);

    tempData[sourceDroppableIndex].tasks = [...sourceTempTasks];
    tempData[destinationDroppableIndex].tasks = [...destinationTempTasks];
    setData(tempData);
  };

  const handleDragEnd = (result: DropResult) => {
    console.log({
      result,
    });

    if (
      !result.destination ||
      (result.destination.index === result.source.index &&
        result.destination.droppableId === result.source.droppableId)
    ) {
      return;
    }

    const { source, destination } = result;

    if (result.type === "task") {
      const payload = {
        tempData: data,
        sourceIndex: source.index,
        destinationIndex: destination.index,
        droppableId: source.droppableId,
        sourceDroppableId: source.droppableId,
        destinationDroppableId: destination.droppableId,
      };

      if (result.destination.droppableId === result.source.droppableId) {
        // When source and destination is the same column.
        reOrder(payload);
      } else {
        changeColumn(payload);
      }
    } else if (result.type === "column") {
      const payload = {
        tempData: data,
        sourceIndex: source.index,
        destinationIndex: destination.index,
        droppableId: +source.droppableId,
        sourceDroppableId: +source.droppableId,
        destinationDroppableId: +destination.droppableId,
      };
      columnReOrder(payload);
      return;
    }
  };

  return data ? (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="all-columns" type="column" direction="horizontal">
        {(provided) => (
          <div
            className="main"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.map((column, index) => (
              <Column column={column} index={index} key={column.id} />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : null;
};

export default App;

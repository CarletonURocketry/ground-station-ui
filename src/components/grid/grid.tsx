import React, { Dispatch, SetStateAction } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { ComponentPosition } from '../../constants/types';
import Card from '../card/Card';
import 'react-grid-layout/css/styles.css';

const ReactGridLayout = WidthProvider(RGL);

interface EditorProps {
  layout: ComponentPosition[];
  setLayout: Dispatch<SetStateAction<ComponentPosition[]>>;
  deleteComponent: (i: string) => void;
  isEditorModeOn: boolean;
  componentMap: { [key: string]: React.ReactNode };
}

function ComponentGrid({ layout, setLayout, deleteComponent, isEditorModeOn, componentMap }: EditorProps) {
  return (
    <ReactGridLayout
      className="layout"
      layout={layout}
      cols={6}
      isDraggable={isEditorModeOn}
      isResizable={isEditorModeOn}
      onLayoutChange={(newLayout) => setLayout(newLayout)}
    >
      {layout.map((item) => (
        <div key={item.i} data-grid={item}>
          <Card
            deleteComponent={deleteComponent}
            i={item.i}
            isEditorModeOn={isEditorModeOn}
            bodyComponent={componentMap[item.i]}
          />
        </div>
      ))}
    </ReactGridLayout>
  );
}

export default ComponentGrid;

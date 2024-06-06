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

/**
 * ComponentGrid Component
 * @param {ComponentPosition[]} layout - The layout configuration for the grid items.
 * @param {Dispatch<SetStateAction<ComponentPosition[]>>} setLayout - The function to update the layout state.
 * @param {Function} deleteComponent - The function to delete a component from the grid.
 * @param {boolean} isEditorModeOn - A flag indicating if the editor mode is enabled, allowing dragging and resizing.
 * @param {Object} componentMap - A mapping of component keys to React components to be displayed in the grid.
 * @returns {JSX.Element} The rendered ComponentGrid component.
 * @example
 * const initialLayout = [
 *   { i: '1', x: 0, y: 0, w: 2, h: 2 },
 *   { i: '2', x: 2, y: 0, w: 2, h: 2 },
 * ];
 *
 * const componentMap = {
 *   '1': <MyComponent1 />,
 *   '2': <MyComponent2 />,
 * };
 *
 * <ComponentGrid
 *   layout={initialLayout}
 *   setLayout={setLayout}
 *   deleteComponent={deleteComponent}
 *   isEditorModeOn={true}
 *   componentMap={componentMap}
 * />
 */
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

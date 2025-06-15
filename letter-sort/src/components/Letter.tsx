import { Draggable } from '@hello-pangea/dnd';
import type { Letter } from './types';

type Props = { letter: Letter; index: number };

export default function Letter({ letter, index }: Props) {
    const palette = ['blue', 'green', 'red', 'orange'];
    const color = palette[
    (letter.char.toLowerCase().charCodeAt(0) - 97) % palette.length
        ];

    return (
        <Draggable draggableId={letter.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    data-color={color}
                    className={`letter ${snapshot.isDragging ? 'dragging' : ''}`}
                    style={{
                        ...provided.draggableProps.style,
                        transform: snapshot.isDragging
                            ? `${provided.draggableProps.style?.transform} scale(1.15)`
                            : provided.draggableProps.style?.transform,
                        transition: snapshot.isDragging ? 'transform .15s ease' : undefined,
                    }}
                >
                    {letter.char}
                </div>
            )}
        </Draggable>
    );
}

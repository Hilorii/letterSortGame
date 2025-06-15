import { Draggable } from '@hello-pangea/dnd';
import type { Letter } from './types.ts';

type Props = { letter: Letter; index: number };

export default function Letter({ letter, index }: Props) {
    return (
        <Draggable draggableId={letter.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        ...provided.draggableProps.style,
                        transform: snapshot.isDragging
                            ? `${provided.draggableProps.style?.transform} scale(1.15)`
                            : provided.draggableProps.style?.transform,
                        transition: snapshot.isDragging ? 'transform .15s ease' : undefined,
                    }}
                    className="letter"
                >
                    {letter.char}
                </div>
            )}
        </Draggable>
    );
}
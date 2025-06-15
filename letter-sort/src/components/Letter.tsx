import { Draggable } from '@hello-pangea/dnd';
import type { Letter } from './types';

type Props = { letter: Letter; index: number; locked?: boolean };

export default function Letter({ letter, index, locked = false }: Props) {
    const palette = ['blue', 'green', 'red', 'orange'];
    const color =
        palette[(letter.char.toLowerCase().charCodeAt(0) - 97) % palette.length];

    return (
        <Draggable
            draggableId={letter.id}
            index={index}
            isDragDisabled={locked}
        >
            {(provided, snapshot) => {
                const base = provided.draggableProps.style?.transform ?? '';
                const scale = snapshot.isDragging ? 1.15 : 1;
                const rotate = letter.rotate ?? 0;
                const transform = `${base} rotate(${rotate}deg) scale(${scale})`;

                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        data-color={color}
                        className={`letter${snapshot.isDragging ? ' dragging' : ''}`}
                        style={{
                            ...provided.draggableProps.style,
                            transform,
                            transition: provided.draggableProps.style?.transition,
                            fontFamily: letter.font,
                        }}
                    >
                        {letter.char}
                    </div>
                );
            }}
        </Draggable>
    );
}

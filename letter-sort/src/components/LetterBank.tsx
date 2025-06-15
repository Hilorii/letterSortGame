import { Droppable } from '@hello-pangea/dnd';
import Letter from './Letter';
import type { Letter as L } from './types';

type Props = {
    letters: L[];
    locked: boolean;
};

export default function LetterBank({ letters, locked }: Props) {
    return (
        <section className="bank">
            <Droppable droppableId="bank" direction="horizontal" isDropDisabled={locked}>
                {(provided) => (
                    <div
                        className="lane"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {letters.map((l, i) => (
                            <Letter key={l.id} letter={l} index={i} locked={locked} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </section>
    );
}

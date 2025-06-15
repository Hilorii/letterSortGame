import { Droppable } from '@hello-pangea/dnd';
import LetterCard from './Letter';
import type { Letter } from './types';

type Props = {
    letters: Letter[];
};

export default function LetterBank({ letters }: Props) {
    return (
        <section className="bank">
            <Droppable droppableId="bank" direction="horizontal">
                {(provided) => (
                    <div
                        className="lane"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {letters.map((l, i) => (
                            <LetterCard key={l.id} letter={l} index={i} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </section>
    );
}

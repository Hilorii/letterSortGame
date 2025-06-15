import { Droppable } from '@hello-pangea/dnd';
import Letter from './Letter';
import type { Letter as L } from './types';

type Props = { bank: L[] };

export default function LetterBank({ bank }: Props) {
    return (
        <section className="bank">
            <Droppable droppableId="bank" direction="horizontal">
                {provided => (
                    <div
                        className="lane"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {bank.map((l, i) => (
                            <Letter key={l.id} letter={l} index={i} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </section>
    );
}

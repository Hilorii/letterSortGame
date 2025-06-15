import { Droppable } from '@hello-pangea/dnd';
import Letter from './Letter';
import type { Letter as L } from './types';

type Props = {
    longSticks: L[];
    noSticks: L[];
};

const Column = ({
                    id,
                    title,
                    letters
                }: {
    id: string;
    title: string;
    letters: L[];
}) => (
    <Droppable droppableId={id}>
        {provided => (
            <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
                <h3>{title}</h3>
                {letters.map((l, i) => (
                    <Letter key={l.id} letter={l} index={i} />
                ))}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
);

export default function SortBoard({ longSticks, noSticks }: Props) {
    return (
        <section className="board">
            <Column id="longSticks" title="long sticks" letters={longSticks} />
            <Column id="noSticks" title="no long sticks" letters={noSticks} />
        </section>
    );
}

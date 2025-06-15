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
                    letters,
                }: {
    id: string;
    title: string;
    letters: L[];
}) => (
    <div className="column-wrapper">
        <h3 className="column-label">{title}</h3>
        <Droppable droppableId={id}>
            {(provided) => (
                <div
                    className="column-droppable"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {letters.map((l, i) => (
                        <Letter key={l.id} letter={l} index={i} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </div>
);


export default function SortBoard({ longSticks, noSticks }: Props) {
    return (
        <section className="board-top">
            <h2 className="board-title">Sort the letters’</h2>
            <div className="board-content">
                <Column id="longSticks" title="long sticks" letters={longSticks} />
                <Column id="noSticks" title="no long sticks" letters={noSticks} />
            </div>
        </section>
    );
}

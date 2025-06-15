import { Droppable } from '@hello-pangea/dnd';
import Letter from './Letter';
import type { Letter as L } from './types';

type Props = {
    longSticks: L[];
    noSticks: L[];
};

const Column = ({
                    id,
                    letters,
                }: {
    id: string;
    title: string;
    letters: L[];
}) => (
    <div className="column-wrapper">
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
            <div className="label-row">
                <h3 className="column-label long">long sticks</h3>
                <h3 className="column-label no-long">no long sticks</h3>
            </div>
            <div className="board-content">
                <Column id="longSticks" title="long sticks" letters={longSticks} />
                <Column id="noSticks" title="no long sticks" letters={noSticks} />
            </div>
        </section>
    );
}

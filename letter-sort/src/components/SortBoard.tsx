import { Droppable } from '@hello-pangea/dnd';
import Letter from './Letter';
import type { Letter as L } from './types';

type Props = {
    longSticks: L[];
    noSticks: L[];
    locked: boolean;
};

const Column = ({
                    id,
                    letters,
                    locked,
                }: {
    id: 'longSticks' | 'noSticks';
    letters: L[];
    locked: boolean;
}) => (
    <Droppable droppableId={id} isDropDisabled={locked}>
        {(provided) => (
            <div
                className="column-droppable"
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
);

export default function SortBoard({ longSticks, noSticks, locked }: Props) {
    return (
        <section className="board-top">
            <h2 className="board-title">Sort the letters’</h2>
            <div className="label-row">
                <h3 className="column-label long">long sticks</h3>
                <h3 className="column-label no-long">no long sticks</h3>
            </div>
            <div className="board-content">
                <Column id="longSticks" letters={longSticks} locked={locked}/>
                <Column id="noSticks" letters={noSticks} locked={locked}/>
            </div>
        </section>
);
}

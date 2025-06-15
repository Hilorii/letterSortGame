import { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import { letters as initial } from './data/letters';
import SortBoard from './components/SortBoard';
import LetterBank from './components/LetterBank';
import './styles.css';

export default function App() {
    const [bank, setBank] = useState(initial);
    const [longSticks, setLongSticks] = useState<typeof bank>([]);
    const [noSticks, setNoSticks] = useState<typeof bank>([]);

    const onDragEnd = ({ source, destination }: DropResult) => {
        if (!destination) return;
        if (source.droppableId === destination.droppableId &&
            source.index === destination.index) return;

        const listMap: Record<string, [typeof bank, React.Dispatch<any>]> = {
            bank: [bank, setBank],
            longSticks: [longSticks, setLongSticks],
            noSticks: [noSticks, setNoSticks]
        };

        const [sourceArr, setSource] = listMap[source.droppableId];
        const [destArr, setDest]   = listMap[destination.droppableId];

        const [moved] = sourceArr.splice(source.index, 1);
        destArr.splice(destination.index, 0, moved);

        setSource([...sourceArr]);
        setDest([...destArr]);

        if (destination.droppableId !== 'bank') {
            const correct =
                moved.hasStick === (destination.droppableId === 'longSticks');
            if (correct) {
                console.log('️Correct');
            } else {
                console.log('Wrong');
            }
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <h1 className="title">Letter Sort</h1>
            <div className="frame">
                <SortBoard longSticks={longSticks} noSticks={noSticks} />
                <LetterBank bank={bank} />
            </div>
        </DragDropContext>
    );
}

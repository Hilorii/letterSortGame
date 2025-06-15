import { useState, useEffect, useCallback } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';

import SortBoard   from './components/SortBoard';
import LetterBank  from './components/LetterBank';
import './styles.css';

import {
    generateLetters,
    isLongStick,
} from './data/letters';
import type { Letter } from './data/letters';

const SND = {
    correct: new Audio('/sounds/correct_match.mp3'),
    wrong:   new Audio('/sounds/incorrect_match.mp3'),
    win:     new Audio('/sounds/win.mp3'),
    lose:    new Audio('/sounds/lose.mp3'),
};

export default function App() {
    const [bank,       setBank]       = useState<Letter[]>(generateLetters);
    const [longStick,  setLongStick]  = useState<Letter[]>([]);
    const [noStick,    setNoStick]    = useState<Letter[]>([]);

    const listMap = {
        bank:       [bank,      setBank]      as const,
        longSticks: [longStick, setLongStick] as const,
        noSticks:   [noStick,   setNoStick]   as const,
    };

    const resetGame = useCallback(() => {
        setBank(generateLetters());
        setLongStick([]);
        setNoStick([]);
    }, []);

    const onDragEnd = ({ source, destination }: DropResult) => {
        if (!destination) return;
        if (
            source.droppableId === destination.droppableId &&
            source.index       === destination.index
        ) return;

        const [srcArr, setSrc] = listMap[source.droppableId as keyof typeof listMap];
        const [dstArr, setDst] = listMap[destination.droppableId as keyof typeof listMap];

        const [moved] = srcArr.splice(source.index, 1);
        dstArr.splice(destination.index, 0, moved);

        setSrc([...srcArr]);
        setDst([...dstArr]);

        if (destination.droppableId !== 'bank') {
            const correct =
                isLongStick(moved.char) === (destination.droppableId === 'longSticks');
            const clip = correct ? SND.correct : SND.wrong;
            clip.currentTime = 0;
            clip.play();
        }
    };

    useEffect(() => {
        if (bank.length > 0) return;

        const allCorrect =
            longStick.every((l) => isLongStick(l.char)) &&
            noStick.every((l) => !isLongStick(l.char));

        const clip = allCorrect ? SND.win : SND.lose;
        clip.currentTime = 0;
        clip.play();

        const id = setTimeout(resetGame, 2500);
        return () => clearTimeout(id);
    }, [bank.length, longStick, noStick, resetGame]);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <h1 className="title">Letter Sort</h1>

            <div className="frame">
                <SortBoard longSticks={longStick} noSticks={noStick} />
                <LetterBank bank={bank} />
            </div>
        </DragDropContext>
    );
}

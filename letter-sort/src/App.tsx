import { useState, useEffect, useCallback } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import SortBoard from './components/SortBoard';
import LetterBank from './components/LetterBank';
import './styles.css';

const ALPHABET = [...'abcdefghijklmnopqrstuvwxyz'];
const LONG_STICKS = ['b', 'd', 'f', 'h', 'k', 'l', 't'];

const shuffle = <T,>(arr: T[]) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

const generateLetters = () =>
    shuffle(ALPHABET)
        .slice(0, 12)
        .map((ch) => ({
            id:
                typeof crypto === 'object' && 'randomUUID' in crypto
                    ? crypto.randomUUID()
                    : `${Date.now()}-${ch}-${Math.random()}`,
            char: ch,
            hasStick: LONG_STICKS.includes(ch),
        }));

const SND = {
    correct: new Audio('/sounds/correct_match.mp3'),
    wrong:   new Audio('/sounds/incorrect_match.mp3'),
    win:     new Audio('/sounds/win.mp3'),
    lose:    new Audio('/sounds/lose.mp3'),
};

export default function App() {
    /* --- stan gry --- */
    const [bank,        setBank]        = useState(generateLetters);
    const [longSticks,  setLongSticks]  = useState<typeof bank>([]);
    const [noSticks,    setNoSticks]    = useState<typeof bank>([]);
    const listMap = {
        bank:       [bank,       setBank]       as const,
        longSticks: [longSticks, setLongSticks] as const,
        noSticks:   [noSticks,   setNoSticks]   as const,
    };

    const resetGame = useCallback(() => {
        setBank(generateLetters());
        setLongSticks([]);
        setNoSticks([]);
    }, []);

    const onDragEnd = ({ source, destination }: DropResult) => {
        if (!destination) return;
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        )
            return;

        const [srcArr, setSrc] = listMap[
            source.droppableId as keyof typeof listMap
            ];
        const [dstArr, setDst] = listMap[
            destination.droppableId as keyof typeof listMap
            ];

        const [moved] = srcArr.splice(source.index, 1);
        dstArr.splice(destination.index, 0, moved);

        setSrc([...srcArr]);
        setDst([...dstArr]);

        if (destination.droppableId !== 'bank') {
            const correct =
                moved.hasStick === (destination.droppableId === 'longSticks');
            const clip = correct ? SND.correct : SND.wrong;
            clip.currentTime = 0;
            clip.play();
        }
    };

    useEffect(() => {
        if (bank.length > 0) return; // wciąż litery do przeniesienia

        const allCorrect =
            longSticks.every((l) => l.hasStick) &&
            noSticks.every((l) => !l.hasStick);

        const clip = allCorrect ? SND.win : SND.lose;
        clip.currentTime = 0;
        clip.play();

        const id = setTimeout(resetGame, 2500); // pauza 2,5 s
        return () => clearTimeout(id);
    }, [bank.length, longSticks, noSticks, resetGame]);

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

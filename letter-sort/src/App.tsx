import { useState, useEffect, useRef } from 'react';
import {
    DragDropContext,
    type DragStart,
    type DropResult,
} from '@hello-pangea/dnd';
import SortBoard from './components/SortBoard';
import LetterBank from './components/LetterBank';
import './styles.css';
import {
    generateLetters,
    isLongStick,
    type Letter,
} from './data/letters';

/* źródła dźwięków */
const SND_SRC = {
    correct: '/sounds/correct_match.mp3',
    wrong:   '/sounds/incorrect_match.mp3',
    win:     '/sounds/win.mp3',
    lose:    '/sounds/lose.mp3',
};
/* helper – zawsze nowy obiekt Audio */
const playSound = (key: keyof typeof SND_SRC) => {
    const a = new Audio(SND_SRC[key]);
    a.play().catch(() => {});
};

const MAX_LVL = 3;

export default function App() {
    const [level, setLevel]           = useState(0);
    const [bank, setBank]             = useState<Letter[]>(() => generateLetters(0));
    const [longSticks, setLongSticks] = useState<Letter[]>([]);
    const [noSticks, setNoSticks]     = useState<Letter[]>([]);
    const [locked, setLocked]         = useState(false);
    const [audioOn, setAudioOn]       = useState(false);

    /* aktualny stan audioOn w ref */
    const audioRef = useRef(audioOn);
    useEffect(() => { audioRef.current = audioOn; }, [audioOn]);

    const speak = (txt: string) => {
        if (!audioRef.current) return;
        const u = new SpeechSynthesisUtterance(txt);
        u.lang = 'en-US';
        speechSynthesis.cancel();
        speechSynthesis.speak(u);
    };

    const startRound = (lvl: number) => {
        setBank(generateLetters(lvl));
        setLongSticks([]);
        setNoSticks([]);
        setLocked(false);
    };

    const listMap = {
        bank:       [bank,       setBank]       as const,
        longSticks: [longSticks, setLongSticks] as const,
        noSticks:   [noSticks,   setNoSticks]   as const,
    };

    /* ── TTS litery ─────────────────────────── */
    const onDragStart = ({ draggableId }: DragStart) => {
        const l = [...bank, ...longSticks, ...noSticks].find(x => x.id === draggableId);
        if (!l) return;
        const label = l.char === l.char.toUpperCase()
            ? `uppercase ${l.char}`
            : `lowercase ${l.char}`;
        speak(label);
    };

    /* ── obsługa dropu ──────────────────────── */
    const onDragEnd = ({ source, destination }: DropResult) => {
        if (locked || !destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index)
            return;

        const [srcArr, setSrc] = listMap[source.droppableId as keyof typeof listMap];
        const [dstArr, setDst] = listMap[destination.droppableId as keyof typeof listMap];

        const [moved] = srcArr.splice(source.index, 1);
        dstArr.splice(destination.index, 0, moved);

        setSrc([...srcArr]);
        setDst([...dstArr]);

        if (destination.droppableId !== 'bank') {
            const correct =
                isLongStick(moved.char) === (destination.droppableId === 'longSticks');
            playSound(correct ? 'correct' : 'wrong');
        }
    };

    /* ── koniec rundy ───────────────────────── */
    useEffect(() => {
        if (bank.length > 0) return;

        setLocked(true);
        const allCorrect =
            longSticks.every(l => isLongStick(l.char)) &&
            noSticks.every(l => !isLongStick(l.char));

        playSound(allCorrect ? 'win' : 'lose');

        const next = allCorrect ? Math.min(level + 1, MAX_LVL) : level;
        const id = setTimeout(() => {
            setLevel(next);
            startRound(next);
        }, 2500);

        return () => clearTimeout(id);
    }, [bank.length, longSticks, noSticks, level]);

    /* ── UI ─────────────────────────────────── */
    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <header className="header">
                <h1 className="title">Letter Sort</h1>
                <button
                    className="audio-btn"
                    onClick={() => setAudioOn(v => !v)}
                    aria-label={audioOn ? 'Turn audio off' : 'Turn audio on'}
                >
                    {audioOn ? '🔊' : '🔇'}
                </button>
            </header>

            <h2 className="subtitle">Level {level + 1}</h2>

            <div className="frame">
                <SortBoard longSticks={longSticks} noSticks={noSticks} locked={locked} />
                <LetterBank letters={bank} locked={locked} />
            </div>
        </DragDropContext>
    );
}

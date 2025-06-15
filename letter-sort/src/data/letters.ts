import { v4 as uuid } from 'uuid';
import type { Letter } from '../components/types';

const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];

const longSticks = ['b', 'd', 'f', 'h', 'k', 'l', 't'];

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export const letters: Letter[] = shuffle(alphabet)
    .slice(0, 12)
    .map((ch) => ({
        id: uuid(),
        char: ch,
        hasStick: longSticks.includes(ch),
    }));

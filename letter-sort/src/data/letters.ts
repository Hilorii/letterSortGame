export const ALPHABET = [...'abcdefghijklmnopqrstuvwxyz'];

export const LONG_STICKS = [
    'b', 'd', 'f', 'h', 'k', 'l', 't', 'p', 'q', 'j', 'y'
];

export const isLongStick = (ch: string) =>
    LONG_STICKS.includes(ch.toLowerCase());

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export type Letter = {
    id: string;
    char: string;
};

export const generateLetters = (count = 12): Letter[] =>
    shuffle(ALPHABET)
        .slice(0, count)
        .map((ch) => ({
            id: crypto.randomUUID(),
            char: ch,
        }));

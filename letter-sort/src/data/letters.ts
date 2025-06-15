export const ALPHABET = [...'abcdefghijklmnopqrstuvwxyz'];

export const LONG_STICKS = [
    'b', 'd', 'f', 'h', 'k', 'l', 't',
    'p', 'q', 'j', 'y',
];

export const isLongStick = (ch: string) =>
    LONG_STICKS.includes(ch.toLowerCase());

const shuffle = <T,>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

export type Letter = {
    id: string;
    char: string;
    rotate?: number;
};

export function generateLetters(level = 0, count = 12): Letter[] {
    return shuffle(ALPHABET)
        .slice(0, count)
        .map((ch) => {
            const char =
                level >= 1 && Math.random() < 0.5 ? ch.toUpperCase() : ch;

            return {
                id: crypto.randomUUID(),
                char,
                rotate: level >= 3 ? Math.random() * 60 - 30 : undefined,
            };
        });
}

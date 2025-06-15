export const ALPHABET = [...'abcdefghijklmnopqrstuvwxyz'];

const LONG_LOWER = ['b', 'd', 'f', 'h', 'k', 'l', 't', 'p', 'q', 'j', 'y'];
const LONG_UPPER = [
    'A', 'B', 'D', 'F', 'H', 'I', 'J', 'K', 'L', 'P',
    'T', 'Y', 'V', 'Z', 'X', 'E', 'R', 'W', 'N', 'M'
];

export const isLongStick = (ch: string) =>
    LONG_LOWER.includes(ch) || LONG_UPPER.includes(ch);

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
    font?: string;
};

export const FONT_FAMILIES = [
    '"Comic Sans MS", cursive, sans-serif',
    '"Courier New", monospace',
    '"Times New Roman", serif',
    '"Lucida Console", monospace',
];

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
                font: level >= 2
                    ? FONT_FAMILIES[
                        Math.floor(Math.random() * FONT_FAMILIES.length)
                        ]
                    : undefined,
            };
        });
}

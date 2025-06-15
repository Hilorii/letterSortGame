import { v4 as uuid } from 'uuid';
import type { Letter } from '../components/types.ts';

const raw = ['b','k','t','l','o','s','a','m'];

export const letters: Letter[] = raw.map(ch => ({
    id: uuid(),
    char: ch,
    hasStick: ['b','k','l','t'].includes(ch)
}));

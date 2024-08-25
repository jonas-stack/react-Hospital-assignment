// atoms/DiagnosesAtom.ts
import { atom } from 'jotai';
import { Diagnoses } from '../Api';

export const diagnosesAtom = atom<Diagnoses[]>([]);

import { atom } from 'jotai';
import { Disease } from '../components/Diseases/DiseaseList';

export const diseaseAtom = atom<Disease[]>([]);
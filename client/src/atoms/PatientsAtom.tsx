// client/src/atoms/PatientsAtom.tsx
import { atom } from 'jotai';
import {Patients} from "../Api.ts";

export const patientsAtom = atom<Patients[]>([]);
import { Step } from './step';

export interface Section {
    name: string;
    isValid: boolean;
    steps: Step[]; 
}
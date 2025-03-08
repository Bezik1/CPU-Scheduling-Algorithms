import { Process } from "../classes/Process";
import { generateTestSequence } from "./generateTestSequence";

export const generateMultipleTestSequences = (numSequences: number, numProcesses: number, maxReportingTime: number): Process[][] =>{
    return Array.from({ length: numSequences }, () => generateTestSequence(numProcesses, maxReportingTime));
}
import { Process } from "../Process";

export interface Algorithm {
    handleProcesses(processes: Process[]): void;
    handleNewProcess(processes: Process[], process: Process): void;
}
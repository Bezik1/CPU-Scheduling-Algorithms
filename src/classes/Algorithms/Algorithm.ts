import { Process } from "../Process";

export interface Algorithm {
    name: string

    reInitialize(processes: Process[]): Process[];
    handleProcesses(processes: Process[], newProcess?: Process): Process[];
    filterExpiredProcesses(processes: Process[]): Process[]
    calculateAverageWaitingTime(processes: Process[]): number
}
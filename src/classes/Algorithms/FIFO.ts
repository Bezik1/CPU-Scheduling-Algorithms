import { NO_PROCESS_TO_HANDLE } from "../../const/errors";
import { ROUNDING_BASE } from "../../const/math";
import { Process } from "../Process";
import { Algorithm } from "./Algorithm";

export class FIFO implements Algorithm {
    name: string

    constructor() {
        this.name = "FIFO"
    }

    reInitialize(processes: Process[]): Process[] {
        return processes.sort((a, b) => a.reportingTime - b.reportingTime)
    }

    calculateAverageWaitingTime(processes: Process[]): number {
        const newProcesses = processes.slice(0, processes.length-1)
        return parseFloat((newProcesses.reduce((sum, process) => sum+process.averageWaitingTime, 0) / processes.length).toFixed(ROUNDING_BASE))
    }

    filterExpiredProcesses(processes: Process[]): Process[] {
        return processes.filter(processes => processes.currentWaitingTime != processes.averageWaitingTime)
    }

    handleProcesses(processes: Process[], newProcess?: Process): Process[] {
        if(newProcess) processes = this.reInitialize([...processes, newProcess])

        if(processes.length <= 0) throw new Error(NO_PROCESS_TO_HANDLE)
        const firstProcess = processes[0]
        const updatedFirstProcess: Process = { ...firstProcess, currentWaitingTime: firstProcess.currentWaitingTime+1 }

        processes.shift()
        let updatedProcesses = [updatedFirstProcess, ...processes]
        return this.filterExpiredProcesses(updatedProcesses)
    }
}
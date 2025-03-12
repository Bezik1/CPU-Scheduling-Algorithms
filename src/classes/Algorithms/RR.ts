import { NO_PROCESS_TO_HANDLE } from "../../const/errors";
import { ROUNDING_BASE } from "../../const/math";
import { Process } from "../Process";
import { Algorithm } from "./Algorithm";

export class RR implements Algorithm {
    name: string
    delta: number

    constructor(delta: number=2) {
        this.name = "Round Robin"
        this.delta = delta
    }

    reInitialize(processes: Process[]): Process[] {
        return processes
    }

    calculateAverageWaitingTime(processes: Process[]): number {
        return parseFloat((processes.reduce((acc, _, i) => acc + this.delta*i, 0) / processes.length).toFixed(ROUNDING_BASE))
    }

    handleProcesses(processes: Process[], newProcess?: Process): Process[] {
        if (newProcess) processes = this.reInitialize([...processes, newProcess]);
        if (processes.length <= 0) throw new Error(NO_PROCESS_TO_HANDLE);

        let updated = false;
        let updatedProcesses: Process[] = [];
        let i = 0;

        let maxCurrentWaitingProcess = 0;
        while (i < processes.length) {
            let process = processes[i];

            if ((process.currentWaitingTime === 0 || process.currentWaitingTime % this.delta !== 0) && !updated) {
                process.currentWaitingTime += 1;
                updated = true
            }
            maxCurrentWaitingProcess = Math.max(process.currentWaitingTime, maxCurrentWaitingProcess)
            updatedProcesses.push(process);
            i++;
        }

        if(!updated) {
            updatedProcesses = []
            i = 0
            while(i < processes.length) {
                let process = processes[i]
                if(process.currentWaitingTime != maxCurrentWaitingProcess && !updated) {
                    process.currentWaitingTime += 1
                    updated = true
                }
                updatedProcesses.push(process)
                i++
            }
        }

        if(!updated) {
            const firstProcess = processes[0]
            const updatedFirstProcess: Process = { ...firstProcess, currentWaitingTime: firstProcess.currentWaitingTime+1 }

            processes.shift()
            updatedProcesses = [updatedFirstProcess, ...processes]
        }

        return this.filterExpiredProcesses(updatedProcesses);
    }

    filterExpiredProcesses(processes: Process[]): Process[] {
        return processes.filter(processes => processes.currentWaitingTime != processes.averageWaitingTime)
    }
}
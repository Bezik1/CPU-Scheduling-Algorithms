import { Process } from "../classes/Process";
import { getRandomPhaseLength } from "./getRandomPhaseLength";

export const generateTestSequence = (numProcesses: number, maxReportingTime: number): Process[] =>{
    const processes: Process[] = [];
    for (let i = 0; i < numProcesses; i++) {
            processes.push({
            id: i + 1,
            processorPhaseLength: getRandomPhaseLength(),
            reportingTime: Math.floor(Math.random() * maxReportingTime),
            waitingTime: 0,
        });
    }
    processes.sort((a, b) => a.reportingTime - b.reportingTime);
    return processes;
}
import { Process } from "../classes/Process";
import { getRandomAverageWaitingTime } from "./getRandomAverageWaitingTime";

export const generateTestSequence = (numProcesses: number, maxAverageWaitingTime: number): Process[] =>{
    const processes: Process[] = [];
    for (let i = 0; i < numProcesses; i++) {
            processes.push({
                id: i + 1,
                averageWaitingTime: getRandomAverageWaitingTime(),
                reportingTime: Math.floor(Math.random() * maxAverageWaitingTime + 1),
                currentWaitingTime: 0,
        });
    }
    return processes;
}
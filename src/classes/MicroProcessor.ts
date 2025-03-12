import { NO_ALGORITHM_DETECTED_ERROR } from "../const/errors";
import { Algorithm } from "./Algorithms/Algorithm";
import { Process } from "./Process";

export class MicroProcessor {
    public finished: boolean;
    public processes: Process[] = []
    private algorithm?: Algorithm

    constructor(algorithm: Algorithm) {
        this.algorithm = algorithm
        this.finished = false
    }

    public update(processes: Process[], process?: Process): MicroProcessor {
        this.updateProcesses(processes)
        this.handleProcesses(process)

        if(this.processes.length == 0) this.updateStatus()
        return this
    }

    private updateStatus() {
        this.finished = true
    }

    private handleProcesses(process?: Process) {
        if(typeof this.algorithm === "undefined") throw new Error(NO_ALGORITHM_DETECTED_ERROR)
        this.updateProcesses(this.algorithm.handleProcesses(this.processes, process))
    }

    public getProcesses(): Process[] {
        return this.processes
    }

    public updateProcesses(processes: Process[]) {
        this.processes = processes
    }

    public switchAlgorithm(algorithm: Algorithm) {
        this.algorithm = algorithm
    }
}
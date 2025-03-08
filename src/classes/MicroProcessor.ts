import { NO_ALGORITHM_DETECTED_ERROR } from "../const/errors";
import { Algorithm } from "./Algorithms/Algorithm";
import { Process } from "./Process";

export class MicroProcessor {
    public processes: Process[] = []
    private algorithm?: Algorithm

    constructor(algorithm: Algorithm) {
        this.algorithm = algorithm
    }

    public update(process?: Process) {
        if(typeof process === "undefined") this.handleProcesses()
        else this.handleNewProcess(process)
    }

    public updateProcesses(processes: Process[]) {
        this.processes = processes
    }

    public switchAlgorithm(algorithm: Algorithm) {
        this.algorithm = algorithm
    }

    private handleProcesses() {
        if(typeof this.algorithm === "undefined") throw new Error(NO_ALGORITHM_DETECTED_ERROR)
        this.algorithm.handleProcesses(this.processes);
    }

    private handleNewProcess(process: Process) {
        if(typeof this.algorithm === "undefined") throw new Error(NO_ALGORITHM_DETECTED_ERROR)
        this.algorithm.handleNewProcess(this.processes, process)
    }
}
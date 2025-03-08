export class Process {
    id: number;
    processorPhaseLength: number;
    reportingTime: number;
    waitingTime: number;

    constructor(id: number, processorPhaseLength: number, reportingTime: number, waitingTime=0) {
        this.id = id;
        this.processorPhaseLength = processorPhaseLength;
        this.reportingTime = reportingTime;
        this.waitingTime = waitingTime;
    }
}
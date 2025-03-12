export class Process {
    id: number;
    reportingTime: number;
    averageWaitingTime: number;
    currentWaitingTime: number;

    constructor(id: number, reportingTime: number, averageWaitingTime: number, currentWaitingTime=0) {
        this.id = id;
        this.reportingTime = reportingTime;
        this.averageWaitingTime = averageWaitingTime;
        this.currentWaitingTime = currentWaitingTime;
    }
}
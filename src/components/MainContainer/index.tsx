import "./index.css";
import { useEffect, useState, useRef } from "react";
import { MicroProcessor } from "../../classes/MicroProcessor";
import { NO_ALGORITHM_DETECTED_ERROR, NO_MP_DETECTED_ERROR } from "../../const/errors";
import { Algorithm } from "../../classes/Algorithms/Algorithm";
import { FIFO } from "../../classes/Algorithms/FIFO";
import { Process } from "../../classes/Process";
import { generateMultipleTestSequences } from "../../utils/generateMultipleTestSequences";
import { SJF } from "../../classes/Algorithms/SJF";
import { RR } from "../../classes/Algorithms/RR";
import { getRandomAverageWaitingTime } from "../../utils/getRandomAverageWaitingTime";
import { MenuBtn } from "../UI/MenuBtn";
import { DEFAULT_GENERATED_SEQUANCE_AMOUNT, DEFAULT_LOADED_TEST_DATA_AMOUNT, MAX_AVERAGE_WAITING_TIME, ROUND_ROBIN_DEFAULT_DELTA } from "../../const/processes";
import Menu from "../Menu";

const MainWindow = () => {
    const [generatedSequAmount, setGeneratedSequanceAmount] = useState(DEFAULT_GENERATED_SEQUANCE_AMOUNT)
    const [loadedTestSamplesAmount, setLoadedTestSamplesAmount] = useState(DEFAULT_LOADED_TEST_DATA_AMOUNT)
    const [roundRobinDelta, setRoundRobinDelta] = useState(ROUND_ROBIN_DEFAULT_DELTA)
    const [executeTime, setExecuteTime] = useState(0.1)
    const [newProcess, setNewProcess] = useState<Process>();
    const [microProcessor, setMicroProcessor] = useState<MicroProcessor>();
    const [processesSeq, setProcessesSeq] = useState<Process[][]>([]);
    const [firstProcessesSeq, setFirstProcessSeq] = useState<Process[][]>([])
    const [processes, setProcesses] = useState<Process[]>([]);
    const [currentAlgorithm, setCurrentAlgorithm] = useState<Algorithm>(new FIFO());

    const [simulation, setSimulation] = useState(false);
    const [algorithmListVisible, setAlgorithmsListVisible] = useState(false);

    const [toggleMenu, setToggleMenu] = useState(false)

    const processSeqIndex = useRef(0);
    const processIdCounter = useRef<number>(1);

    useEffect(() => {
        const generatedProcessesSeq = generateMultipleTestSequences(generatedSequAmount, loadedTestSamplesAmount, MAX_AVERAGE_WAITING_TIME);
        setFirstProcessSeq(generatedProcessesSeq)
        console.log(generatedProcessesSeq)
        setProcessesSeq(generatedProcessesSeq);
    }, [generatedSequAmount, loadedTestSamplesAmount]);

    useEffect(() => {
        if (processSeqIndex.current < processesSeq.length) {
            const currentProcess = processesSeq[processSeqIndex.current] || [];
            setProcesses(currentProcess);

            processIdCounter.current =
                currentProcess.length > 0 ? Math.max(...currentProcess.map(p => p.id)) + 1 : 1;
        }
    }, [processSeqIndex.current, processesSeq]);

    useEffect(() => {
        if (!currentAlgorithm) {
            throw new Error(NO_ALGORITHM_DETECTED_ERROR);
        }
        const newMicroProcessor = new MicroProcessor(currentAlgorithm);
        setMicroProcessor(newMicroProcessor);
        currentAlgorithm.reInitialize(processes);
    }, [currentAlgorithm, processes]);

    const simulate = () => {
        if (!microProcessor) {
            throw new Error(NO_MP_DETECTED_ERROR);
        }

        let updatedMicroProcessor: MicroProcessor;
        if (newProcess) {
            updatedMicroProcessor = microProcessor.update(processes, newProcess);
            setNewProcess(undefined);
        } else {
            updatedMicroProcessor = microProcessor.update(processes);
        }

        if (updatedMicroProcessor.finished) {
            increaseProcessIndex();
        }

        setProcesses(updatedMicroProcessor.getProcesses());
        setMicroProcessor(updatedMicroProcessor);
    };

    useEffect(() => {
        if (simulation) {
            const interval = setInterval(simulate, executeTime*1000);
            return () => clearInterval(interval);
        }
    }, [simulation, microProcessor, processes, newProcess]);

    const decreaseProcessIndex = () =>{
        if (processSeqIndex.current !== 0) {
            processSeqIndex.current -= 1;
            setProcesses(processesSeq[processSeqIndex.current]);
        }
    }

    const increaseProcessIndex = () => {
        if (processSeqIndex.current < processesSeq.length - 1) {
            processSeqIndex.current += 1;
            setProcesses(processesSeq[processSeqIndex.current]);
        }
    };

    const handleAddProcess = () => {
        const maxReportingTime = processes.length > 0 ? Math.max(...processes.map(p => p.reportingTime)) : 0;

        const newProc: Process = {
            id: processIdCounter.current++,
            averageWaitingTime: getRandomAverageWaitingTime(),
            currentWaitingTime: 0,
            reportingTime: maxReportingTime + 1,
        };

        setNewProcess(newProc);
    };

    useEffect(() => {
        if (currentAlgorithm.name === "Round Robin") {
            setCurrentAlgorithm(new RR(roundRobinDelta));
        }
    }, [roundRobinDelta]);

    const resetTestSeq = () => {
        console.log("Before reset:", processSeqIndex.current, processesSeq)

        setProcessesSeq([...firstProcessesSeq])
        processIdCounter.current = 1
        processSeqIndex.current = 0
    };

    return (
        <div className="main-container">
            <div className="menu">
                <MenuBtn onClick={() => setToggleMenu(!toggleMenu)} className="menu-btn"/>
            </div>
            {toggleMenu && <Menu
                                resetTestSeq={resetTestSeq}
                                executeTime={executeTime}
                                generatedSequAmount={generatedSequAmount}
                                loadedTestSamplesAmount={loadedTestSamplesAmount}
                                roundRobinDelta={roundRobinDelta}
                                setGeneratedSequAmount={setGeneratedSequanceAmount}
                                setLoadedTestSamplesAmount={setLoadedTestSamplesAmount}
                                setRoundRobinDelta={setRoundRobinDelta}
                                setExecuteTime={setExecuteTime}
                            />}
            <div className="test-seq">
                <div className="test-seq btn" onClick={decreaseProcessIndex}>{"<"}</div>
                <div className="test-seq-title">Current Test Sequance: {processSeqIndex.current+1}</div>
                <div className="test-seq btn" onClick={increaseProcessIndex}>{">"}</div>
            </div>
            <div className="algorithm-container">
                <div className="algorithm-title">Current Algorithm: </div>
                {!algorithmListVisible && <div className="algorithm-name" onClick={() => setAlgorithmsListVisible(!algorithmListVisible)}>
                    {currentAlgorithm.name}
                </div>}
                {algorithmListVisible && (
                    <div className="algorithm-list">
                        <div className="algorithm-list-el" onClick={() => { setCurrentAlgorithm(new FIFO()); setAlgorithmsListVisible(false); }}>FIFO</div>
                        <div className="algorithm-list-el" onClick={() => { setCurrentAlgorithm(new SJF(true)); setAlgorithmsListVisible(false); }}>SJF Preemptive</div>
                        <div className="algorithm-list-el" onClick={() => { setCurrentAlgorithm(new SJF(false)); setAlgorithmsListVisible(false); }}>SJF Non-Preemptive</div>
                        <div className="algorithm-list-el" onClick={() => { setCurrentAlgorithm(new RR(roundRobinDelta)); setAlgorithmsListVisible(false); }}>RR</div>
                    </div>
                )}
            </div>
            <div className="schedule-container">
                <div className="mp-container">
                    <div className="mp">
                        <div className="mp-title">Micro Processor</div>
                    </div>
                </div>
                <div className="processes-container">
                    {processes.map(({ id, currentWaitingTime, averageWaitingTime, reportingTime }) => (
                        <div key={id} className="process-container">
                            <div className="process-id">Process ID: {id}</div>
                            <div className="process-currentWaitingTime">CWT: {currentWaitingTime}</div>
                            <div className="process-reportingTime">RT: {reportingTime}</div>
                            <div className="process-averageWaitingTime">AWT: {averageWaitingTime}</div>
                        </div>
                    ))}
                    <div className="process-container">
                        <div className="add-process-title" onClick={handleAddProcess}>Add Process</div>
                    </div>
                </div>
            </div>
            <div className="footer-container">
                <div className="average-waiting-time-container">
                    Average Waiting Time: {currentAlgorithm.calculateAverageWaitingTime(processes)}
                </div>
                <div className="simulate-btn" onClick={() => setSimulation(!simulation)}>
                    {simulation ? "Stop" : "Start"} Simulation
                </div>
            </div>
        </div>
    );
};

export default MainWindow;

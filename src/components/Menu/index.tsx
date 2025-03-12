import "./index.css"

type MenuProps = {
    resetTestSeq: () => void
    generatedSequAmount: number
    loadedTestSamplesAmount: number
    roundRobinDelta: number
    executeTime: number
    setGeneratedSequAmount: React.Dispatch<React.SetStateAction<number>>
    setLoadedTestSamplesAmount: React.Dispatch<React.SetStateAction<number>>
    setRoundRobinDelta: React.Dispatch<React.SetStateAction<number>>
    setExecuteTime: React.Dispatch<React.SetStateAction<number>>
}

const Menu = ({ resetTestSeq,
                setExecuteTime,
                setLoadedTestSamplesAmount,
                setRoundRobinDelta,
                setGeneratedSequAmount,
                executeTime,
                generatedSequAmount,
                loadedTestSamplesAmount,
                roundRobinDelta,
    } : MenuProps) =>{
    return (
        <div className="menu-container">
            <h1 className="menu-title">Parameters</h1>
            <div className="menu-el">
                <div className="menu-el-title">Execute Time: </div>
                <div className="menu-el-sub">
                    <input type="range" min={.00001} max={5.0} step={0.01} className="menu-el-input" onChange={e => setExecuteTime(Number(e.target.value))}/>
                    <div className="menu-el-value">{executeTime}</div>
                </div>
            </div>
            <div className="menu-el">
                <div className="menu-el-title">Round Robin Delta: </div>
                <div className="menu-el-sub">
                    <input type="range" min={1} max={20} className="menu-el-input" onChange={e => setRoundRobinDelta(Number(e.target.value))}/>
                    <div className="menu-el-value">{roundRobinDelta}</div>
                </div>
            </div>
            <div className="menu-el">
                <div className="menu-el-title">Sequances Count: </div>
                <div className="menu-el-sub">
                    <input type="range" min={1} className="menu-el-input" onChange={e => setGeneratedSequAmount(Number(e.target.value))}/>
                    <div className="menu-el-value">{generatedSequAmount}</div>
                </div>
            </div>
            <div className="menu-el">
                <div className="menu-el-title">Test Sample Count: </div>
                <div className="menu-el-sub">
                    <input type="range"  className="menu-el-input" onChange={e => setLoadedTestSamplesAmount(Number(e.target.value))}/>
                    <div className="menu-el-value">{loadedTestSamplesAmount}</div>
                </div>
            </div>
            <div className="menu-el">
                <div className="menu-el-title">Reset Test Seq</div>
                <div className="menu-el-sub">
                    <button className="menu-el-btn" onClick={resetTestSeq}>Reset</button>
                </div>
            </div>
        </div>
    )
}

export default Menu
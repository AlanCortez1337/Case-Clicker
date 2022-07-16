import Counter from '../hooks/useCounter'

function Timer() {
    const [time, updateTime, updateType] = Counter(0, 1000, "increment", 1);

    const handleCringe = () => {
        updateTime(prevTime => prevTime + 1);
        updateType("tap");
    }


    return(
        <button onClick={handleCringe}>Time Lasted: {time}</button>
    );
}

export default Timer;
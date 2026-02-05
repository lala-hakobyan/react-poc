import {useEffect, useState} from "react";

export default function useCounter() {
    const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
        console.log("✅ ChildComponent mounted");
        const interval = setInterval(() => {
            setCounter((count) => count + 1);
        }, 1000);

        return () => {
            console.log('console.log("✅ ChildComponent unmounted");');
            clearInterval(interval);
        }
    }, []);

    return <p>Seconds passed {counter}</p>
}
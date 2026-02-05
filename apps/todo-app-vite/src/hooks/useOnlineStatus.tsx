import {useSyncExternalStore} from "react";

// import {useEffect, useState} from "react";
// export function useOnlineStatus1() {
//     const [isOnline, setIsOnline] = useState(true);
//
//     useEffect(() => {
//         function setOnline(value: boolean) {
//             setIsOnline(value);
//         }
//
//         window.addEventListener('online', setOnline.bind(null,true));
//         window.addEventListener('offline', setOnline.bind(null,false));
//
//         return () => {
//             window.removeEventListener('online', setOnline.bind(null,true));
//             window.removeEventListener('offline', setOnline.bind(null,false));
//         }
//
//     }, []);
//
//     return isOnline;
// }

function subscribe(callback: any) {
    window.addEventListener('online', callback);
    window.addEventListener('offline', callback);

    return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
    }
}

export default function useOnlineStatus() {
    return useSyncExternalStore(
        subscribe,
        () => navigator.onLine, // How to get the value on the client
        () => true // How to get the value on the server
    )
}
import useOnlineStatus from "../hooks/useOnlineStatus";
import Nav from "./Nav";

export default function Header() {
    const isOnline = useOnlineStatus();
    return (
        <header className="app-header">
            <div className="app-header-content">
                <div className="app-header-title">
                <img className="logo-icon" src="assets/logo-icon.png" alt="My Page" width="30" height="30" />
                <h1 className="logo-text">MY TODOS</h1>
                </div>
                <Nav className="app-nav-desktop" />
                <div className="app-header-sync-status">            
                    <p>Sync Status: {isOnline ? '✅' : '❌'}</p>
                </div>
            </div>
            
            <Nav className="app-nav-mobile" />
        </header>
        
    );
}

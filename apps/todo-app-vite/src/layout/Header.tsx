import { NavLink } from "react-router-dom";
import useOnlineStatus from "../hooks/useOnlineStatus";

export default function Header() {
    const isOnline = useOnlineStatus();
    return (
        <header className="app-header">
            <div className="app-header-title">
              <h1 >MY TODOS</h1>
            </div>
            <nav className="app-nav">
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            className={({isActive}) => (isActive ? 'link-active': '')}
                        >Home</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/todo"
                            className={({isActive}) => (isActive ? 'link-active': '')}
                        >My Todos</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contact"
                            className={({isActive}) => (isActive ? 'link-active': '')}
                        >Contact</NavLink>
                    </li>
                </ul>
            </nav>
            <div className="app-header-sync-status">            
                <p>Sync Status: {isOnline ? '✅' : '❌'}</p>
            </div>
        </header>
        
    );
}

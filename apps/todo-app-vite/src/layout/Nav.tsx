import { NavLink } from "react-router-dom";

export default function Nav({className}: {className?: string}) {
    return (
        <nav className={`app-nav ${className ? className : ''}`}>
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
    );
}
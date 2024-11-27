import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(() =>{

        return localStorage.getItem('theme') === 'dark';
    });

    const toggleSidebar =() => {
        setIsOpen(!isOpen);
    };
    
    const handleOutsideClick = (event) =>{
        if (isOpen && !event.target.closest('sidebar')&& !event.target.closest('.hamburger')){
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    },[isOpen]);

    const toggleTheme = () => {
        const newTheme = isDarkTheme ? 'light' : 'dark';
        setIsDarkTheme(!isDarkTheme);
        document.body.className = newTheme === 'light' ? 'light-theme' : 'dark';
        localStorage.setItem('theme', newTheme);
    };

    useEffect (() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.className = savedTheme === 'light' ? 'light-theme' : 'dark';
    }, []);

    return (
        <div>
            {/* Hamburger Button */}
            <button className="hamburger" onClick={toggleSidebar}>
                ☰
            </button>

            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                <ul className="sidebar-list">
                    <li>
                        <Link to="/" onClick={toggleSidebar}>Home</Link>
                    </li>
                    <li>
                        <Link to="/about" onClick={toggleSidebar}>About</Link>
                    </li>
                    <li>
                        <Link to="/contact" onClick={toggleSidebar}>Contact</Link>
                    </li>
                </ul>
                <button className="theme-toggle" onClick={toggleTheme}>
                    {isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                </button>
            </div>
        </div>
    );
};


export default sidebar;
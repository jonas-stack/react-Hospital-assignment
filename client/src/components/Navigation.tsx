import React from 'react'; // Import React
import ThemeSwitcher from './ThemeSwitcher';
import logo from '../Styles/png-DoctorLogo.png';

export default function Navigation() {
    return (
        <div className="navbar bg-base-100 h-16 min-h-[4rem] flex justify-between items-center px-4">
            <div className="flex-1">
                <img src={logo} alt="logo" className="h-12" />
            </div>
            <div className="flex-none">
                <ThemeSwitcher />
            </div>
        </div>
    );
}

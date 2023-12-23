import React from 'react'
import Logo from "./logo"

function NavBar({children}) {
    return (
        <nav className="nav-bar">
        <Logo />
            {children}
        </nav>
    )
}

export default NavBar
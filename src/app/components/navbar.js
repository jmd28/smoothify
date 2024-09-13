'use client';
import { useState } from 'react'
import { title } from '../constants';

const navItems = [
    { name: "playlists", route: "/playlists" },
    { name: "about", route: "/about" },
]

function NavLink({ to, children }) {
    return <a href={to} className={`mx-4`}>
        {children}
    </a>
}

export default function Navbar() {
    return <div className='px-4 py-4'>
        {title}
        {navItems.map((x, i) => <NavLink key={i} to={x.route}>{x.name}</NavLink>)}
    </div>
}

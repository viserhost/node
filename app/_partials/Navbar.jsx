"use client";

import { getCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useLoginHandler from '../(auth)/login/_hooks/useLoginHandler';
import useUtility from '@/app/_hooks/useUtility';
import LangControl from './LangControl';
import { getLogo } from '@/lib/helpers';
import { useSelector } from 'react-redux';


export default function Navbar() {
    const {trans} = useUtility();
    const menuLinks = [
        {
            "title": "Home",
            "url": "/"
        },
        {
            "title": "Contact",
            "url": "/contact"
        }
    ];

    const authorizedLinks = [
        {
            "title": "Dashboard",
            "url": "/user/dashboard"
        }
    ];
    const authLinks = [
        {
            "title": "Login",
            "url": "/login"
        },
        {
            "title": "Register",
            "url": "/register"
        }
    ];
    const customPageData = useSelector((state) => state.customPage.data);
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    // Update isLoggedIn once when component mounts
    useEffect(() => {
        setIsLoggedIn(!!getCookie('is_logged_in'));
    }, []);

    const { logout } = useLoginHandler();

    return (
        <>
            <div className="document-header d-flex flex-wrap justify-content-between align-items-center mb-2">
                <div className="logo">
                    <Link href="/">
                        <Image src={getLogo()} width={275} height={48} alt="Logo" priority />
                    </Link>
                </div>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto">
                            {
                                menuLinks.map((menuLink, index) => (
                                    <li key={index} className="nav-item">
                                        <Link href={menuLink.url} className='nav-link'>{trans(menuLink.title)}</Link>
                                    </li>
                                ))
                            }
                            {
                                customPageData.data.pages.map((page, index) => (
                                    <li key={index} className="nav-item">
                                        <Link href={'/'+page.slug} className='nav-link'>{trans(page.name)}</Link>
                                    </li>
                                ))
                            }
                            {!isLoggedIn && (
                                authLinks.map((menuLink, index) => (
                                    <li key={index} className="nav-item">
                                        <Link href={menuLink.url} className='nav-link'>{trans(menuLink.title)}</Link>
                                    </li>
                                ))
                            )}
                            {isLoggedIn && (
                                authorizedLinks.map((menuLink, index) => (
                                    <li key={index} className="nav-item">
                                        <Link href={menuLink.url} className='nav-link'>{trans(menuLink.title)}</Link>
                                    </li>
                                ))
                            )}
                            {isLoggedIn && (
                                <li className="nav-item">
                                    <Link href="#" className="nav-link" onClick={logout}>{trans('Logout')}</Link>
                                </li>
                            )}
                            <LangControl />
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import useLoginHandler from "@/app/(auth)/login/_hooks/useLoginHandler";
import { getLogo, getUser } from "@/lib/helpers";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/store/userSlice";
import Dropdown from "@/app/_partials/Dropdown";
import useUtility from "@/app/_hooks/useUtility";

export default function UserNav() {
    const {trans} = useUtility();
    const dispatch = useDispatch();
    const { data: userData } = useSelector(state => state?.user);
    const { logout } = useLoginHandler();

    useEffect(() => {
        dispatch(setUserData(getUser()));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fullName = useMemo(() => userData?.firstname + ' ' + userData?.lastname, [userData]);

    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                <div className="container">
                    <Link href="/" className="navbar-brand">
                        <Image src={getLogo()} width={275} height={48} alt="Logo" priority />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link href="/user/dashboard" className="nav-link">{trans('Dashboard')}</Link>
                            </li>

                            <Dropdown
                                title='Support Ticket'
                            >
                                <Link href={'/user/support-ticket/create'} className="dropdown-item">{trans('Create New')}</Link>
                                <Link href={'/user/support-ticket'} className="dropdown-item">{trans('My Ticket')}</Link>
                            </Dropdown>

                            <Dropdown
                                title='Deposit'
                            >
                                <Link href={'/user/deposit'} className="dropdown-item">{trans('Deposit Money')}</Link>
                                <Link href={'/user/deposit/history'} className="dropdown-item">{trans('Deposit Log')}</Link>
                            </Dropdown>

                            <Dropdown
                                title='Withdraw'
                            >
                                <Link href={'/user/withdraw'} className="dropdown-item">{trans('Withdraw Money')}</Link>
                                <Link href={'/user/withdraw/history'} className="dropdown-item">{trans('Withdraw Log')}</Link>
                            </Dropdown>

                            <li className="nav-item">
                                <Link className="nav-link" href="/user/transactions">{trans('Transactions')}</Link>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#!" onClick={logout}>{trans('Logout')}</a>
                            </li>

                            {userData && (
                                <Dropdown
                                    title={fullName}
                                >
                                    <Link href={'/user/profile'} className="dropdown-item">{trans('Profile')}</Link>
                                    <Link href={'/user/change-password'} className="dropdown-item">{trans('Change Password')}</Link>
                                    <Link href={'/user/two-factor-authentication'} className="dropdown-item">{trans('2FA')}</Link>
                                </Dropdown>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
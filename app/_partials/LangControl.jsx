"use client";

import Link from 'next/link';
import useLanguage from '../_hooks/useLanguage';
import Dropdown from './Dropdown';
import Image from 'next/image';

export default function LangControl() {
    const {changeLang, languages, selectedLanguage} = useLanguage();
    return (
        <>
            <Dropdown title={
                <>
                    <Image src={process.env.baseUrl + '/assets/images/language/' + selectedLanguage.image} width={20} height={20} alt={selectedLanguage.name} /> {selectedLanguage.name}
                </>
            }>
                {languages() && languages().map((lang) => (
                    <Link href='#' key={lang.code} className="dropdown-item" onClick={() => changeLang(lang.code)}>
                        <Image src={process.env.baseUrl + '/assets/images/language/' + lang.image} width={20} height={20} alt={lang.name} /> {lang.name}
                    </Link>
                ))}
            </Dropdown>
        </>
    )
}

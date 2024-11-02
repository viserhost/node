"use client";

import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from '@/store';
import SetGeneralSetting from './_partials/SetGeneralSetting';
import SetLanguage from './_partials/SetLanguage';
import SetCustomPages from './_partials/SetCustomPages';
import HandleChildren from './_partials/HandleChildren';
import TopLoader from './_partials/TopLoader';

import 'react-loading-skeleton/dist/skeleton.css' 

import Cookie from './_partials/Cookie'; 
export default function Wrapper({ children }) {

    return (
        <>
            <Provider store={store}>
                <SetGeneralSetting />
                <SetLanguage />
                <SetCustomPages />
                <HandleChildren>
                    <TopLoader />
                    <div className="container">
                        <Toaster position='top-right' reverseOrder={false} />
                    </div>
                    {children}
                    <Cookie />
                </HandleChildren>
            </Provider>
        </>
    )
}
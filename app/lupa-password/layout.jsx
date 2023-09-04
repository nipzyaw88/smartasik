'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../globals.css'
import LeftNav from '@app/components/LeftNav'
import { useEffect } from 'react'
import Footer from '@app/components/Footer'
import Header from '@app/components/Header'

const page = ({ children }) => {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    return (
        <>
            <Header/>
            <main className='d-flex flex-column'>
                <div className='content'>
                    {children}
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default page
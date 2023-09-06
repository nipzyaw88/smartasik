'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../globals.css'
import LeftNav from '@app/components/LeftNav'
import { useEffect } from 'react'
import Header from '@app/components/Header'

const page = ({ children }) => {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    return (
        <>
            <Header />
            <div className='container-fluid'>
                <div className='row'>
                    <LeftNav />
                    <div className='col'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default page
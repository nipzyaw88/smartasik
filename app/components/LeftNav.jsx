'use client'
import Link from 'next/link'
import '../globals.css'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const LeftNav = ({ list }) => {
    const [menu, setMenu] = useState([])
    const {data: session, status} = useSession()

    useEffect(() => {}, [session])
    console.log('list menu', list)

    // const getMenu = async (userId) => {
    //     console.log('sessionnyaaa', session)
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/listmenu?user_id=${userId}`, {
    //         method: "GET",
    //         headers: {
    //             'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
    //             'Content-Type': 'application/json',
    //             'Cache-Control': 'no-cache'
    //         }
    //     }).then((response) => response.json())
    //     .then((data) => {
    //         setMenu(data)
    //         console.log(data)
    //     })
    //     .catch(console.error);
    // }

    // useEffect(() => {
    //     if(menu.length == 0) {
    //         getMenu(session?.user?.userId)
    //     }
    // }, [session])
    
    // useEffect(() => {
    //     setMenu(list);
    // }, [])

    return (
        <div className="col-2 left-nav">
            <ul className="list-unstyled ps-0">
                <li className='mb-1'>
                    <Link href="/halaman/dashboard" className='link-body-emphasis d-inline-flex text-decoration-none rounded'>Beranda</Link>
                </li>
                {list.map((m) => {
                    // console.log(m)
                    return (
                        <li className="mb-1" key={m.judul}>
                            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0" data-bs-toggle="collapse" data-bs-target={`#${m.judul.split(' ').join('-')}`} aria-expanded="false">
                                {m.judul}
                            </button>
                            <div className="collapse" id={`${m.judul.split(' ').join('-')}`}>
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    {m.children.map((c) => {
                                        return (
                                            <li key={c.nama_menu}><Link href={`/${c.url_menu}`} className='link-body-emphasis d-inline-flex text-decoration-none rounded'>{c.nama_menu}</Link></li>
                                        )
                                    })}
                                    {/* <li><Link href="/halaman/daftar-pasien-klinik" className='link-body-emphasis d-inline-flex text-decoration-none rounded'>Daftar Pasien Klinik</Link></li> */}
                                </ul>
                            </div>
                        </li>
                    )
                })}
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                        Akun
                    </button>
                    <div className="collapse" id="account-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Profil</a></li>
                            {/* <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Pengaturan</a></li> */}
                            <li><a href="#" onClick={() => signOut({callbackUrl: '/'})} className="link-body-emphasis d-inline-flex text-decoration-none rounded">Sign out</a></li>
                        </ul>
                    </div>
                </li>
                {/* <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0" data-bs-toggle="collapse" data-bs-target="#home-collapse2" aria-expanded="false">
                        Layar Publik
                    </button>
                    <div className="collapse" id="home-collapse2">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><Link href="/layar-antrian-pendaftaran" target='_blank' className='link-body-emphasis d-inline-flex text-decoration-none rounded'>Layar Panggilan Antrian Pendaftaran</Link></li>
                            <li><Link href="/layar-antrian-klinik" target='_blank' className='link-body-emphasis d-inline-flex text-decoration-none rounded'>Layar Antrian Klinik</Link></li>
                            <li><Link href="/antrian" target='_blank' className='link-body-emphasis d-inline-flex text-decoration-none rounded'>Layar Ambil Antrian Pendaftaran</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0" data-bs-toggle="collapse" data-bs-target="#master-data" aria-expanded="false">
                        Master Data
                    </button>
                    <div className="collapse" id="master-data">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><Link href="/halaman/master/agama" className='link-body-emphasis d-inline-flex text-decoration-none rounded'>Agama</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                        Account
                    </button>
                    <div className="collapse" id="account-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Profile</a></li>
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Settings</a></li>
                            <li><a href="#" onClick={() => signOut({callbackUrl: '/'})} className="link-body-emphasis d-inline-flex text-decoration-none rounded">Sign out</a></li>
                        </ul>
                    </div>
                </li> */}
                {/* <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                        Dashboard
                    </button>
                    <div className="collapse" id="dashboard-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Overview</a></li>
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Weekly</a></li>
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Monthly</a></li>
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Annually</a></li>
                        </ul>
                    </div>
                </li>
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                        Orders
                    </button>
                    <div className="collapse" id="orders-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">New</a></li>
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Processed</a></li>
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Shipped</a></li>
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Returned</a></li>
                        </ul>
                    </div>
                </li>
                <li className="border-top my-3"></li>
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                        Account
                    </button>
                    <div className="collapse" id="account-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">New...</a></li>
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Profile</a></li>
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Settings</a></li>
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Sign out</a></li>
                        </ul>
                    </div>
                </li> */}
            </ul>
        </div>
    )
}

export default LeftNav
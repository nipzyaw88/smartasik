'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../globals.css'
import LeftNav from '@app/components/LeftNav'
import { useEffect, useState } from 'react'
import Header from '@app/components/Header'
import { useSession } from 'next-auth/react'

const page = ({ children }) => {
    const [menu, setMenu] = useState([]);
    const {data: session, status} = useSession();

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    useEffect(() => {
        if(session) {
            // console.log('user_id', session?.user);
            // const getMenu = async (userId) => {
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/listmenu/${session?.user?.id}`, {
                    method: "GET",
                    headers: {
                        'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache'
                    }
                }).then((response) => response.json())
                .then((data) => {
                    var parent = [];
                    for(const imp in data.data) {
                        parent[data.data[imp]['kelompokmenu']] = [];
                        // data.data[imp].children = [];
                        // if(parent.includes(data.data[imp]['kelompokmenu'])) {
                        //     continue;
                        // } else {
                        //     parent.push(data.data[imp]['kelompokmenu'])
                        // }
                    }
                    var cparent = [];
                    for(const p in parent) {
                        var child = [];
                        for(const imp in data.data) {
                            if(p == data.data[imp]['kelompokmenu']) {
                                data.data[imp].parent = p;
                                child.push(data.data[imp]);
                                parent[p].children = child;
                            }
                        }
                        cparent.push({judul: p, children:child});
                    }
                    // console.log(cparent);return false;
                    setMenu(cparent)
                    // console.log('menu', data)
                })
                .catch(console.error);
            // }
    
            // getMenu(session?.user?.id);
        }
    }, [session]);

    if(status == 'loading') {
        return (
            <div className="col d-flex flex-column vh-100 justify-content-center align-items-center">
                <img src='/assets/images/logo.png' style={{width: '260px'}}/>
                <h3>Memuat Halaman...</h3>
            </div>
        )
    } else if(status == 'authenticated') {
        console.log('menuzz', menu)
        return (
            <>
                <Header />
                <div className='container-fluid'>
                    <div className='row'>
                        <LeftNav list={menu}/>
                        <div className='col'>
                            {children}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default page
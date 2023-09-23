'use client'
import AntrianPendaftaran from '@app/components/AntrianPendaftaran';
import { useEffect, useState } from 'react'

const LayarAntrianPendaftaran = () => {
    const [antrian, setAntrian] = useState();
    const [loket, setLoket] = useState();

    const getAntrianx = (id_jenisantrian, id_loket) => new Promise(resolve => {
        const antrianLoket1 = fetch(`${process.env.NEXT_PUBLIC_API_URL}/t_antrianregistrasi/get/by/1/0/DESC`, {
            method: "POST",
            body: JSON.stringify({
                id_loket: id_loket,
                id_jenisantrian: id_jenisantrian,
                is_panggil: true,
                limited: 0
            }),
            headers: {
                'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((data) => {
            if(data.data.length > 0) {
                const nomorAntrian = data.data[0].no_antrianregistrasi;
                resolve(nomorAntrian)
            } else {
                resolve('')
            }
        })
        .catch(console.error);
    })

    useEffect(() => {
        async function getAntrian() {
            const loket = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/loket/get/by/10/0`, {
                method: "POST",
                body: JSON.stringify({
                    id_jenisantrian: 1,
                    loket_aktif: true
                }),
                headers: {
                    'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json())
                .then(async (data) => {
                    if(data.data.length > 0) {
                        for(let i = 0; i < data.data.length; i++) {
                            // console.log(`ini : ${JSON.stringify(data.data[i])}`)
                            const antr = await getAntrianx(data.data[i].id_jenisantrian, data.data[i].id_loket);
                            data.data[i]['noDipanggil'] = antr ?? null;
                        }
                    }
                    setLoket(data.data)
                })
                .catch(console.error);
        }

        // getAntrian()

        const inte = setInterval(() => {getAntrian()}, 1000)
        return () => clearInterval(inte);
    }, [])

    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <h1>ANTRIAN PENDAFTARAN</h1>
            <h1>KLINIK PRATAMA EDELWEIS</h1>
            <div className='col-12 mt-5'>
                <div className='row'>
                    <div className='col-7 px-5'>
                        <div className='bg-tv'>

                        </div>
                    </div>
                    <div className='col-5 text-center'>
                        <h2>ANTRIAN DIPANGGIL</h2>
                        <AntrianPendaftaran loket={loket} />
                        {/* {loket && loket.map((l, i) => {
                            return (
                                <div key={i} className='col-12 mb-5'>
                                    <div className="row">
                                        <div className='col' onClick={hitantrian}>
                                            <div className="box-p-kecil box-klinik-umum rounded-5">
                                                <div className='row d-flex align-items-end'>
                                                    <div className='col'>
                                                        <h4 className='label-antrian'>LOKET {l.nourut_loket}</h4>
                                                    </div>
                                                    <div className='col'>
                                                        <h4 className='angka-antrian'>{l.formatnomor_loket.substring(2,0)}{l.noDipanggil}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })} */}
                        {/* <div className='col-12'>
                            <div className="row">
                                <div className='col'>
                                    <div className="box-p-kecil box-loket-2 rounded-5">
                                        <div className='row d-flex align-items-end'>
                                            <div className='col'>
                                                <h4 className='label-antrian'>LOKET 2</h4>
                                            </div>
                                            <div className='col'>
                                                <h4 className='angka-antrian'>U-{antrian}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayarAntrianPendaftaran
'use client'

import { fetchData } from "next-auth/client/_utils";
import { useEffect, useState } from "react";

const Antrian = () => {
    const datex = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const [antrianklinik, setantrianklinik] = useState(0);
    const [totalantrianklinik, settotalantrianklinik] = useState(0);
    const [antrianKlinikGigi, setAntrianKlinikGigi] = useState(0);
    const [totalAntrianKlinikGigi, setTotalAntrianKlinikGigi] = useState(0);
    const [antrianKlinikKia, setAntrianKlinikKia] = useState(0);
    const [totalAntrianKlinikKia, setTotalAntrianKlinikKia] = useState(0);

    async function fetchKlinikUmum() {
        const totalAntrianKlinikUmum = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/t_antrianregistrasi/get/by/10/0`, {
            method: "POST",
            body: JSON.stringify({
                id_jenisantrian : 1,
            }),
            headers: {
                'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((data) => {
            settotalantrianklinik(data.total);
        })
        .catch(console.error);
        
        const antrianKlinikUmum = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/t_antrianregistrasi/get/by/10/0`, {
            method: "POST",
            body: JSON.stringify({
                id_jenisantrian : 1,
                is_panggil: false
            }),
            headers: {
                'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((data) => {
            const nomorAntrian = parseInt(data.data.pop().no_antrianregistrasi) + 1;
            console.log(nomorAntrian);
            setantrianklinik(nomorAntrian);
        })
        .catch(console.error);
    }

    useEffect(() => {
        fetchKlinikUmum()
    }, [])

    const hitantrian = async (kat) => {
        console.log(kat);
        if(kat === 'klinik_umum') {
            const antrianKlinikUmum = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/t_antrianregistrasi/add`, {
                method: "POST",
                body: JSON.stringify({
                    id_jenisantrian:1, 
                    id_pasien: '', 
                    id_ruangan:1, 
                    id_dokter:1, 
                    id_kelompokpenjamin: '', 
                    id_penjamin: '', 
                    id_registrasi: '', 
                    tanggal_antrian: '', 
                    statuspasien: '', 
                    id_profilfaskes: ''
                }),
                headers: {
                    'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json())
            .then((data) => {
                fetchKlinikUmum();
            })
            .catch(console.error);
        }
    }
    return (
        <div className='container-fluid vh-100'>
            <div className='d-flex flex-column justify-content-center align-items-center h-100'>
                <h1><strong>ANTRIAN PASIEN</strong></h1>
                <h1>KLINIK PRATAMA EDELWEIS</h1>
                <h3>{datex}</h3>
                <div className='col-12 d-flex justify-content-center mt-5'>
                    <div className='row gx-5'>
                        <div className='col' onClick={() => hitantrian('klinik_umum')}>
                            <div className="box box-klinik-umum text-center">
                                <h4 className="label-antrian ">KLINIK UMUM</h4>
                                <p className="angka-antrian">{antrianklinik}</p>
                                <h4 className="label-antrian">SISA ANTRIAN</h4>
                                <p className="angka-antrian">{totalantrianklinik}</p>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="box box-klinik-gigi text-center">
                                <h4 className="label-antrian">KLINIK GIGI</h4>
                                <p className="angka-antrian">{antrianKlinikGigi}</p>
                                <h4 className="label-antrian">SISA ANTRIAN</h4>
                                <p className="angka-antrian">{totalAntrianKlinikGigi}</p>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="box box-klinik-kia text-center">
                                <h4 className="label-antrian">KLINIK KIA</h4>
                                <p className="angka-antrian">{antrianKlinikKia}</p>
                                <h4 className="label-antrian">SISA ANTRIAN</h4>
                                <p className="angka-antrian">{totalAntrianKlinikKia}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="logo mt-5">
                    <img className="img-fluid" src="/assets/images/logo.png" />
                    <p className="copyright text-center">
                        Copyright SmartAsik<br/>
                        PT. Citra Solusi Komputama<br/>
                        v1.0.0 @2023
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Antrian
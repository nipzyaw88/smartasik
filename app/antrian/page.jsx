'use client'

import { fetchData } from "next-auth/client/_utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "react-bootstrap";

const Antrian = () => {
    const router = useRouter();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
    const [jenisAntrian, setJenisAntrian] = useState([])
    const [dokter, setDokter] = useState([])
    const [aktifAntrian, setAktifAntrian] = useState(null);
    const [idAntrian, setIdAntrian] = useState(null);
    // window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');

    async function fetchKlinikUmum() {
        const jenisAntrian = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jenisantrian/get/by/10/0`, {
            method: "POST",
            body: JSON.stringify({
                jenisantrian_aktif : 1,
            }),
            headers: {
                'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then(async (data) => {
            // console.log(data.data)
            const nnAntrian = {};
            if(data.data.length > 0) {
                for(let i = 0; i < data.data.length; i++) {
                    const angka = await getAntrian(data.data[i].id_jenisantrian)
                    data.data[i]['noAntrian'] = angka
                }
            }
            console.log(data.data)
            setJenisAntrian(data.data);
        })
        .catch(console.error);
        
        // const totalAntrianKlinikUmum = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/t_antrianregistrasi/get/by/10/0/ASC`, {
        //     method: "POST",
        //     body: JSON.stringify({
        //         id_jenisantrian : 1,
        //     }),
        //     headers: {
        //         'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
        //         'Content-Type': 'application/json'
        //     }
        // }).then((response) => response.json())
        // .then((data) => {
        //     settotalantrianklinik(data.total);
        // })
        // .catch(console.error);
        
        // const antrianKlinikUmum = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/t_antrianregistrasi/get/by/10/0/ASC`, {
        //     method: "POST",
        //     body: JSON.stringify({
        //         id_jenisantrian : 1,
        //         is_panggil: false
        //     }),
        //     headers: {
        //         'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
        //         'Content-Type': 'application/json'
        //     }
        // }).then((response) => response.json())
        // .then((data) => {
        //     if(data.data.length > 0) {
        //         const nomorAntrian = parseInt(data.data.pop().no_antrianregistrasi) + 1;
        //         console.log(nomorAntrian);
        //         setantrianklinik(nomorAntrian);
        //     }
        // })
        // .catch(console.error);
    }

    useEffect(() => {
        fetchKlinikUmum()
    }, [])

    const getDokter = async (id_jenisantrian) => {
        const dd = new Date();
        const day = dd.getDay()
        const dateFormat = dd.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: "2-digit",
            day: '2-digit'
        })
        console.log(dateFormat)
        const doki = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jadwaldokter/get/by/10/0`, {
            method: "POST",
            body: JSON.stringify({
                id_ruangan: id_jenisantrian,
                kodehari_jadwaldokter: day,
                // createtime: `${dd.getFullYear()}-${dd.toLocaleDateString('id-ID', {month:'2-digit'})}-${dd.toLocaleDateString('id-ID',{day: '2-digit'})}`
            }),
            headers: {
                'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log(data);
            setDokter(data.data);
            setIdAntrian(id_jenisantrian)
            setShow(true);
            // setAktifAntrian(id_jenisantrian)
        })
        .catch(console.error);
    }

    const getAntrian = id_jenisantrian => new Promise(resolve => {
        let noAntrian = null;
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/t_antrianregistrasi/get/by/10/0/ASC`, {
            method: "POST",
            body: JSON.stringify({
                id_jenisantrian : id_jenisantrian,
                // is_panggil: false
            }),
            headers: {
                'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((data) => {
            if(data.data.length > 0) {
                const nomorAntrian = parseInt(data.data.pop().no_antrianregistrasi) + 1;
                noAntrian = nomorAntrian;
                // console.log(nomorAntrian);
                // resolve(nomorAntrian)
                // setantrianklinik(nomorAntrian);
            }
        })
        .finally(() => {
            resolve(noAntrian)
        })
        .catch(console.error);

    })

    const hitantrian = async (id_dokter, id_ruangan) => {
        // if(kat === 'klinik_umum') {
            const antrianKlinikUmum = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/t_antrianregistrasi/add`, {
                method: "POST",
                body: JSON.stringify({
                    id_jenisantrian:idAntrian, 
                    id_pasien: '', 
                    id_ruangan:id_ruangan, 
                    id_dokter:id_dokter, 
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
                setShow(false);
                fetchKlinikUmum();
            })
            .catch(console.error);
        // }
    }
    return (
        <div className='container-fluid vh-100'>
            <div className='d-flex flex-column justify-content-center align-items-center h-100'>
                <h1><strong>ANTRIAN PASIEN</strong></h1>
                <h1>KLINIK PRATAMA EDELWEIS</h1>
                <h3>{datex}</h3>
                <div className='col-12 d-flex justify-content-center mt-5'>
                    <div className='row m-auto gx-5'>
                        {jenisAntrian && jenisAntrian.map((l, i) => {
                            return (
                                <>
                                <div key={i} className='col mb-5' onClick={() => getDokter(l.id_jenisantrian)}>
                                    <div className="box rounded-4 text-center" style={{backgroundColor: `${l.jenisantrian_warna}`, border: '4px solid #817e7e'}}>
                                        <h4 className="label-antrian ">{l.nama_jenisantrian}</h4>
                                        <p className="angka-antrian">{l.noAntrian ?? 0}</p>
                                        <h4 className="label-antrian">SISA ANTRIAN</h4>
                                        <p className="angka-antrian">{l.maksimum_antrian - l.noAntrian}</p>
                                    </div>
                                </div>
                                {/* {(i+1) % 3 == 0 ? <div className="row"></div> : null} */}
                                </>
                            )
                        })}
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
            {/* <ModalAntrian data={dokter} id_jenisantrian={idAntrian} isShow={show}/> */}
            <Modal size="xl" backdrop='static' show={show}>
                <Modal.Body>
                    <div className='d-flex flex-column justify-content-center align-items-center h-100'>
                        <div className='col-12 d-flex justify-content-center mt-5'>
                            <div className='row m-auto gx-5'>
                                {dokter && dokter.map((l,i) => {
                                    return (
                                        <div key={i} className='col mb-5' onClick={() => hitantrian(l.id_dokter, l.id_ruangan)}>
                                        <div className="box rounded-4 text-center" style={{backgroundColor: 'green', border: '4px solid #817e7e'}}>
                                            <h4 className="label-antrian ">DOKTER <br></br>{l.nama_dokter}</h4>
                                            <p className="angka-antrian">{l.antrian}</p>
                                            <h4 className="label-antrian">SISA ANTRIAN</h4>
                                            <p className="angka-antrian">{l.kuotareservasi_jadwaldokter - l.antrian}</p>
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose} type="button" className="btn btn-lg btn-primary">KEMBALI</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Antrian
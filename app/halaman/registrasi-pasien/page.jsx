'use client'
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const RegistrasiPasien = () => {
    const [loket, setLoket] = useState([]);
    const [jenisAntrian, setJenisAntrian] = useState([]);
    const [nomorAntrian, setNomorAntrian] = useState(1);
    const [totalAntrian, settotalAntrian] = useState(0);
    const [daftarPasien, setDaftarPasien] = useState([]);
    const [arrayAntrian, setArrayAntrian] = useState([]);
    const [currentAntrian, setCurrentAntrian] = useState(0);
    const [prevAntrian, setPrevAntrian] = useState(0);
    const [nextAntrian, setNextAntrian] = useState(0);

    const prevRef = useRef();
    const nextRef = useRef();
    const jenisRef = useRef()

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/loket/get/10/0`, {
                method: "GET",
                headers: {
                    'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json())
            .then((data) => {
                setLoket(data.data);
            })
            .catch(console.error);
            
            const jenis = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jenisantrian/get/10/0`, {
                method: "GET",
                headers: {
                    'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                    'Content-Type': 'application/json'
                }
            }).then((jenis) => jenis.json())
            .then((data) => {
                setJenisAntrian(data.data);
            })
            .catch(console.error);

            const daftarPasien = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/t_registrasipasien/get/10/0`, {
                method: "GET",
                headers: {
                    'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                    'Content-Type': 'application/json'
                }
            }).then((jenis) => jenis.json())
            .then((data) => {
                setDaftarPasien(data.data);
            })
            .catch(console.error);
        }

        fetchData();
        getAntrian(1);
    }, []);

    const getAntrian = (jenis) => {
        // const param = typeof jenis.target === 'undefined' ? 1 : jenis.target.value;
        // console.log(typeof jenisRef.current.value);
        const param = jenisRef.current.value;
        if(param !== '') {
            const antrian = fetch(`${process.env.NEXT_PUBLIC_API_URL}/t_antrianregistrasi/get/by/10/0`, {
                method: "POST",
                body: JSON.stringify({
                    id_jenisantrian : param,
                    is_panggil: false
                }),
                headers: {
                    'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json())
            .then((data) => {
                console.log(data);
                if(data.data.length > 0) {
                    setArrayAntrian(data.data);
                    setCurrentAntrian(data.data[0].no_antrianregistrasi);
                    if(data.data.length > 1) {
                        setNextAntrian(1);
                    }
                    settotalAntrian(data.data.length);
                } else {
                    setArrayAntrian([]);
                    setCurrentAntrian(0);
                    settotalAntrian(0);
                }
            })
            .catch(console.error);
        }
    }

    const handlePrevAntrian = () => {
        const currNo = arrayAntrian[parseInt(prevRef.current.value) - 1].no_antrianregistrasi;
        console.log(currNo);
        // console.log(parseInt(prevRef.current.value) - 1);
        setCurrentAntrian(parseInt(currNo));
        setNextAntrian(parseInt(currNo));
        if(typeof arrayAntrian[parseInt(prevRef.current.value) - 1] === 'undefined') {
            setPrevAntrian(0);
        } else {
            const val = parseInt(currNo) - 1;
            // console.log(currNo, val);
            setPrevAntrian(val);
        }
    }

    const handleNextAntrian = () => {
        getAntrian();
        // const curNo = arrayAntrian[nextRef.current.value].no_antrianregistrasi;
        // console.log(curNo);
        // setCurrentAntrian(curNo);
        // setPrevAntrian(parseInt(curNo) - 1);
        // if(typeof arrayAntrian[parseInt(nextRef.current.value) + 1] === 'undefined') {
        //     setNextAntrian(0);
        // } else {
        //     setNextAntrian(parseInt(curNo));
        // }
    }

    if(!arrayAntrian) return <p>Loading..</p>

    return (
        <div className='p-2 h-100'>
            <h3 className='judul'>
                Registrasi Pasien
            </h3>
            <div className='card bg-light mb-3'>
                <div className="card-header bg-info fw-bold">Pemanggilan Pasien</div>
                <div className='card-body'>
                    <div className='d-flex flex-row justify-content-center align-items-center gx-3'>
                        <div className='mb-1 me-5'>
                            <label className='form-label'>Loket Antrian</label>
                            <select className="form-select form-select-sm">
                                {loket.map((option) => {
                                    return (
                                        <option key={option.id_loket} value={option.id_loket}>{option.nama_loket}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='mb-1 me-5'>
                            <label className='form-label'>Jenis Antrian</label>
                            <select className="form-select form-select-sm" onChange={getAntrian} ref={jenisRef}>
                                <option value="">-- Pilih Jenis Antrian --</option>
                                {jenisAntrian.map((option) => {
                                    return (
                                        <option key={option.id_jenisantrian} value={option.id_jenisantrian}>{option.nama_jenisantrian}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='row mb-1 me-5 text-center d-flex align-items-center gx-2'>
                            <div className="col">
                                <input type="hidden" name="prev" value={prevAntrian} ref={prevRef}/>
                                <button type="button" onClick={handlePrevAntrian} className="btn btn-light shadow-none" disabled={prevAntrian == 0}><i className="bi bi-arrow-left-square-fill" style={{fontSize: '30px', color: "black"}}></i></button>
                            </div>
                            <div className="col">
                                <label className='form-label text-nowrap'>Nomor Antrian</label>
                                <h3 className="mb-0 fs-1 fw-bold">{currentAntrian}</h3>
                            </div>
                            <div className="col">
                                <input type="hidden" name="next" value={nextAntrian} ref={nextRef}/>
                                <button onClick={handleNextAntrian} type="button" className="btn btn-light shadow-none" disabled={nextAntrian == 0}><i className="bi bi-arrow-right-square-fill" style={{fontSize: '30px', color: "black"}}></i></button>
                            </div>
                        </div>
                        <div className="mb-1 me-5">
                            <button className="btn btn-info btn-sm">Panggil</button>
                        </div>
                        <div className='mb-1 me-5 text-center d-flex align-items-center gx-2'>
                            <div className="col">
                                <label className='form-label text-nowrap'>Total Antrian</label>
                                <h3 className="mb-0 fs-1 fw-bold">{totalAntrian}</h3>
                            </div>
                        </div>
                        <div className="mb-1 me-5">
                            <button className="btn btn-info btn-sm">Info Seluruh Antrian</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='card bg-light mb-3'>
                <div className="card-header bg-info fw-bold">Pencarian Pasien</div>
                <div className='card-body'>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">No. Induk Kependudukan</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" name="tes" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">No. Peserta BPJS</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" name="tes" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">No. Rekam Medik</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" name="tes" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Nama Pasien</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" name="tes" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Tanggal Lahir</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" name="tes" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Alamat Pasien</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" name="tes" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-row">
                            <button className="btn btn-info me-2">Cari</button>
                            <Link className="btn btn-info" href='/halaman/pencatatan-pasien'>Pasien Baru</Link>
                    </div>
                </div>
            </div>
            <div className='card bg-light mb-3'>
                <div className="card-header bg-info fw-bold">Tabel Data Pasien</div>
                <div className='card-body'>
                    <table className="table table-bordered">
                        <thead className="table-primary">
                            <tr>
                                <th scope="col">NIK</th>
                                <th scope="col">No. BPJS</th>
                                <th scope="col">No. RM</th>
                                <th scope="col">Nama Pasien</th>
                                <th scope="col">Tanggal Lahir</th>
                                <th scope="col">Alamat Pasien</th>
                                <th scope="col">Ubah</th>
                                <th scope="col">Registrasi</th>
                            </tr>
                        </thead>
                        <tbody className="table-info">
                            {/* <tr>
                                <td scope="row"></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr> */}
                            {daftarPasien.map((pasien) => {
                                return (
                                    <tr>
                                        <td scope="row"></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default RegistrasiPasien

// export async function getServerSideProps() {
//     const [operationsRes, incidentsRes] = await Promise.all([
//         fetch(`${process.env.APP_DOMAIN}/api/${apiRoute}`),
//         fetch(`${process.env.APP_DOMAIN}/api/${apiRoute2}`)
//     ]);
//     const [operations, incidents] = await Promise.all([
//         operationsRes.json(),
//         incidentsRes.json()
//     ]);
//     return { props: { operations, incidents } };
// }
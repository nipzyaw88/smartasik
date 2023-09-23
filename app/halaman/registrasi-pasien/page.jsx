'use client'
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"
import { Modal } from "react-bootstrap";

const RegistrasiPasien = () => {
    const [loket, setLoket] = useState([]);
    const [aktifLoket, setAktifLoket] = useState(null);
    const [jenisAntrian, setJenisAntrian] = useState([]);
    const [nomorAntrian, setNomorAntrian] = useState(1);
    const [totalAntrian, settotalAntrian] = useState(0);
    const [daftarPasien, setDaftarPasien] = useState([]);
    const [arrayAntrian, setArrayAntrian] = useState([]);
    const [currentAntrian, setCurrentAntrian] = useState(0);
    const enable = currentAntrian > 0 ? '' : 'disabled';
    const [prevAntrian, setPrevAntrian] = useState(0);
    const [nextAntrian, setNextAntrian] = useState(0);
    const [infoAntrian, setInfoAntrian] = useState([]);

    const [text, setText] = useState('hello');
    const [utterance, setUtterance] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)

    const prevRef = useRef();
    const nextRef = useRef();
    const jenisRef = useRef();
    const loketRef = useRef();

    const router = useRouter()
    // let synth = window.speechSynthesis;
    let voicesArray = speechSynthesis.getVoices();
    // speechSynthesis.getVoices().forEach(function(voice) {
    //     console.log(voice.name, voice.default ? voice.default :'');
    // });

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
        }

        fetchData();
        getAntrian(0);
        getTotalAntrian(0);
    }, []);

    const getAntrian = (jenis) => {
        const param = jenisRef.current.value;
        const loketx = loketRef.current.value;
        if(param !== '' && loket !== '') {
            const antrian = fetch(`${process.env.NEXT_PUBLIC_API_URL}/t_antrianregistrasi/get/by/10/0/ASC`, {
                method: "POST",
                body: JSON.stringify({
                    id_jenisantrian : param,
                    // id_loket : loketx,
                    is_panggil: false
                }),
                headers: {
                    'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json())
            .then((data) => {
                // console.log(data);
                if(data.data.length > 0) {
                    setArrayAntrian(data.data);
                    setCurrentAntrian(data.data[0].no_antrianregistrasi);
                    getAntrianSekarang(jenisRef.current.value, data.data[0].id_antrianregistrasi)
                    if(data.data.length > 1) {
                        setNextAntrian(1);
                    }
                    getTotalAntrian()
                } else {
                    setArrayAntrian([]);
                    setCurrentAntrian(0);
                    getTotalAntrian()
                }
            })
            .catch(console.error);
        }
    }
    
    const getTotalAntrian = (jenis) => {
        const param = jenisRef.current.value;
        if(param !== '') {
            const antrian = fetch(`${process.env.NEXT_PUBLIC_API_URL}/t_antrianregistrasi/get/by/10/0/ASC`, {
                method: "POST",
                body: JSON.stringify({
                    id_jenisantrian : param,
                    // is_panggil: false
                }),
                headers: {
                    'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json())
            .then((data) => {
                // console.log(data);
                if(data.data.length > 0) {
                    settotalAntrian(data.data.length);
                } else {
                    settotalAntrian(0);
                }
            })
            .catch(console.error);
        }
    }

    const getAntrianSekarang = async (id_jenisantrian, id_antrianregistrasi) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/t_antrianregistrasi/antrian-sekarang/${id_jenisantrian}/${id_antrianregistrasi}`, {
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((data) => {
            if(typeof data.data.id_antrianregistrasi !== 'undefined') {
                setPrevAntrian(data.data.id_prev == null ? 0 : data.data.id_prev);
                setNextAntrian(data.data.id_next == null ? 0 : data.data.id_next);
                setCurrentAntrian(data.data.no_antrianregistrasi)
            }
        })
        .catch(console.error);
    }

    const handlePrevAntrian = () => {
        getAntrianSekarang(jenisRef.current.value, prevRef.current.value)
    }

    const handleNextAntrian = () => {
        getAntrianSekarang(jenisRef.current.value, nextRef.current.value)
    }

    const handlePanggil = () => {
        let u = new SpeechSynthesisUtterance(`Antrian nomor ${currentAntrian}. Ke loket ${loketRef.current.value.split('|')[1]}`);
        u.voice = voicesArray[11];
        u.volume= 1;
        const date = new Date();
        const formatedDate = date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).split('/').reverse().join('-')
        const antrian = fetch(`${process.env.NEXT_PUBLIC_API_URL}/t_antrianregistrasi/panggil`, {
            method: "PUT",
            body: JSON.stringify({
                tanggal_antrian: formatedDate,
                no_antrianregistrasi : currentAntrian, 
                is_panggil : true,
                id_loket: loketRef.current.value.split('|')[0],
                id_jenisantrian: jenisRef.current.value
            }),
            headers: {
                'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            speechSynthesis.speak(u);
            getAntrian()
        })
        .catch(console.error);
    }

    const handleCari = async (e) => {
        setDaftarPasien([])
        e.preventDefault()
        var formData = new FormData(e.target);
        const form_values = Object.fromEntries(Object.entries(Object.fromEntries(formData)).filter(([_, v]) => v !== ''))
        // console.log()
        const pasienx = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pasien/get/by/10/0`, {
            method: "POST",
            body: JSON.stringify(form_values),
            headers: {
                'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((data) => {
            // console.log(data);
            if(data.data.length > 0) {
                setDaftarPasien(data.data)
            }
        })
        .catch(console.error);
    }

    const handleSummaryAntrian = async (e) => {
        e.preventDefault()
        const pasienx = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/t_antrianregistrasi/get_totalantrian`, {
            method: "POST",
            // body: JSON.stringify(form_values),
            headers: {
                'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((data) => {
            // console.log('info antrian',data);
            setInfoAntrian(data.data);
            setShow(true)
        })
        .catch(console.error);
    }

    const handleUbah = (e) => {
        e.preventDefault();
        const id_pasien = e.target.attributes.getNamedItem("data-id").value;
        // console.log('pasiennya : ',id_pasien)
        router.push(`/halaman/pencatatan-pasien/update/${id_pasien}`)
    }

    const getAktifLoket = (e) => {
        // console.log(e.target.value);
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
                            <select className="form-select form-select-sm" ref={loketRef} onChange={getAktifLoket}>
                                <option value="">-- Pilih Loket --</option>
                                {loket.map((option) => {
                                    return (
                                        <option key={option.id_loket} value={`${option.id_loket}|${option.nourut_loket}`}>{option.nama_loket}</option>
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
                                <button type="button" onClick={handlePrevAntrian} className="btn btn-light shadow-none" disabled={prevAntrian === 0}><i className="bi bi-arrow-left-square-fill" style={{fontSize: '30px', color: "black"}}></i></button>
                            </div>
                            <div className="col">
                                <label className='form-label text-nowrap'>Nomor Antrian</label>
                                <h3 className="mb-0 fs-1 fw-bold">{currentAntrian}</h3>
                            </div>
                            <div className="col">
                                <input type="hidden" name="next" value={nextAntrian} ref={nextRef}/>
                                <button onClick={handleNextAntrian} type="button" className="btn btn-light shadow-none" disabled={nextAntrian === 0}><i className="bi bi-arrow-right-square-fill" style={{fontSize: '30px', color: "black"}}></i></button>
                            </div>
                        </div>
                        <div className="mb-1 me-5">
                            <button className={`btn btn-info btn-sm ${enable}`} onClick={handlePanggil}>Panggil</button>
                        </div>
                        <div className='mb-1 me-5 text-center d-flex align-items-center gx-2'>
                            <div className="col">
                                <label className='form-label text-nowrap'>Total Antrian</label>
                                <h3 className="mb-0 fs-1 fw-bold">{totalAntrian}</h3>
                            </div>
                        </div>
                        <div className="mb-1 me-5">
                            <button onClick={handleSummaryAntrian} className="btn btn-info btn-sm">Info Seluruh Antrian</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='card bg-light mb-3'>
                <div className="card-header bg-info fw-bold">Pencarian Pasien</div>
                <div className='card-body'>
                    <form id="cari-pasien" onSubmit={handleCari}>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">No. Induk Kependudukan</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" type="text" name="nomor_induk_kependudukan" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">No. Peserta BPJS</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" type="text" name="nomor_peserta_bpjs"/>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">No. Rekam Medik</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" type="text" name="nomor_rekam_medik" />
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
                                        <input className="form-control" type="text" name="nama_pasien" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Tanggal Lahir</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" type="text" name="tanggallahir_pasien" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Alamat Pasien</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" type="text" name="alamat_pasien" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-row">
                            <button className="btn btn-info me-2" type="submit">Cari</button>
                            <Link className="btn btn-info" href='/halaman/pencatatan-pasien'>Pasien Baru</Link>
                    </div>
                    </form>
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
                            {daftarPasien.map((pasien, i) => {
                                return (
                                    <tr key={i}>
                                        <td scope="row">{pasien.nomor_induk_kependudukan}</td>
                                        <td></td>
                                        <td>{pasien.nomor_rekam_medik}</td>
                                        <td>{pasien.nama_pasien}</td>
                                        <td>{pasien.tanggallahir_pasien}</td>
                                        <td>{pasien.alamat_pasien}</td>
                                        <td>
                                            <button type="button" data-id={pasien.id_pasien} className="btn btn-sm btn-primary" onClick={handleUbah}>Ubah</button>
                                        </td>
                                        <td>
                                            <Link href={`/halaman/registrasi-klinik/${pasien.id_pasien}`} className="btn btn-sm btn-primary">Registrasi</Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal backdrop="static" centered={true} show={show} size="lg">
                <Modal.Body>
                    <table className="table table-bordered">
                        <thead className="table-primary align-middle text-center">
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Jenis Antrian</th>
                                <th scope="col">Total Antrian</th>
                                <th scope="col">Total Antrian Dipanggil</th>
                                <th scope="col">Sisa Antrian</th>
                            </tr>
                        </thead>
                        <tbody>
                            {infoAntrian && infoAntrian.map((l,i) => {
                                return (
                                    <tr>
                                        <td align="middle">{i+1}</td>
                                        <td>{l.jenis_antrian}</td>
                                        <td align="right">{l.total_seluruh}</td>
                                        <td align="right">{l.total_dipanggil}</td>
                                        <td align="right">{l.total_sisa}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose} type="button" className="btn btn-primary">Tutup</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default RegistrasiPasien
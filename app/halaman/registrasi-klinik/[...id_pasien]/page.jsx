'use client'

import { useEffect, useRef, useState } from 'react'
import ReactInputDateMask from 'react-input-date-mask';
// import { useSearchParams } from 'next/navigation'

const RegistrasiKlinik = ({ params }) => {
    const id_pasien = params.id_pasien[0];
    // const no_antrian = params.id_pasien[1];
    // const paramsx = useSearchParams()
    // const idPasien = paramsx.get('pasien') ?? '';
    
    const [kelompokPenjamin, setKelompokPenjamin] = useState([])
    const [penjamin, setPenjamin] = useState([])
    const [ruangan, setRuangan] = useState([])
    const [tglLahir, setTglLahir] = useState()
    const [dokter, setDokter] = useState()
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        async function fetchData() {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pasien/get_detilpasien/${id_pasien}`, {
                method: "GET",
                // body: JSON.stringify({
                //     id_pasien: parseInt(id_pasien)
                // }),
                headers: {
                    'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json())
            .then((data) => {
                const datex = new Date(data.data[0].tanggallahir_pasien)
                const dateNow = new Date();
                const tahun = dateNow.getFullYear() - datex.getFullYear();
                const bulan = dateNow.getMonth() - datex.getMonth() + 12;
                const hari = dateNow.getDate() - datex.getDate();
                const umur = `${tahun} Tahun ${bulan} Bulan ${hari} Hari`;
                const formatedDate = datex.toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                })
                document.getElementsByName('nomor_rekam_medik')[0].value = data.data[0].nomor_rekam_medik
                document.getElementsByName('nomor_induk_kependudukan')[0].value = data.data[0].nomor_induk_kependudukan
                document.getElementsByName('nama_pasien')[0].value = data.data[0].nama_pasien
                setTglLahir(formatedDate)
                document.getElementsByName('umur')[0].value = umur
                document.getElementsByName('id_jeniskelamin')[0].value = data.data[0].id_jeniskelamin
                document.getElementsByName('alamat_pasien')[0].value = data.data[0].alamat_pasien
                document.getElementsByName('tgl_registrasi')[0].value = dateNow.toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                })
            })
            .catch(console.error);
        }

        async function getMasterData() {
            const kelompokPenjamin = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kelompokpenjamin/get/10/0`, {
                method: "GET",
                headers: {
                    'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                    'Content-Type': 'application/json'
                }
            }).then((pendidikan) => pendidikan.json())
            .then((data) => {
                setKelompokPenjamin(data.data);
            })
            .catch(console.error);
            
            const dpjp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dokter/get/10/0`, {
                method: "GET",
                headers: {
                    'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                    'Content-Type': 'application/json'
                }
            }).then((data) => data.json())
            .then((data) => {
                setDokter(data.data);
            })
            .catch(console.error);
            
            const penjamin = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/penjamin/get/10/0`, {
                method: "GET",
                headers: {
                    'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                    'Content-Type': 'application/json'
                }
            }).then((pendidikan) => pendidikan.json())
            .then((data) => {
                setPenjamin(data.data);
            })
            .catch(console.error);
        }

        if(id_pasien !== '') {
            fetchData()
        }
        getMasterData()
    }, [])

    const getRuanganDokter = async (e) => {
        console.log(e.target.value);
        const ruangan = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ruangan/get/by/10/0`, {
            method: "POST",
            body: JSON.stringify({
                id_ruangan: e.target.value
            }),
            headers: {
                'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                'Content-Type': 'application/json'
            }
        }).then((pendidikan) => pendidikan.json())
        .then((data) => {
            setRuangan(data.data);
        })
        .catch(console.error);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        var formData = new FormData(e.target);
        const form_values = Object.fromEntries(formData);
        const tgl = form_values.tgl_registrasi.split('/');
        form_values.tgl_registrasi = `${tgl[2]}-${tgl[1]}-${tgl[0]}`
        const pasien = fetch(`${process.env.NEXT_PUBLIC_API_URL}/t_registrasipasien/add`, {
            method: "POST",
            body: JSON.stringify(form_values),
            headers: {
                'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log(data);
            router.push(`/halaman/pencatatan-pasien/update/${data.data.id_pasien}`)
        })
        .catch(console.error);
        setIsSubmit(false);
    }

    if(id_pasien == '') return <p>Tidak ditemukan</p>

    return (
        <div className='p-2 h-100'>
            <form id='form-registrasi-klinik' onSubmit={handleSubmit}>
                <div className='card bg-light mb-3'>
                    <div className="card-header bg-info fw-bold">Registrasi Klinik</div>
                    <div className='card-body'>
                        <div className="row">
                            <div className="col">
                                <div className="mb-1">
                                    <div className="row g-3 align-items-center">
                                        <div className="col-md-4">
                                            <label className="form-label">No. Rekam Medik</label>
                                        </div>
                                        <div className="col-md-5">
                                            {/* <input type='hidden' name='no_antrian' value={no_antrian} />
                                            <input type='hidden' name='antrian_dipanggil' value={no_antrian} /> */}
                                            <input type='hidden' name='id_pasien' value={id_pasien} />
                                            <input className="form-control form-control-sm" type='text' name="nomor_rekam_medik" readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-1">
                                    <div className="row g-3 align-items-center">
                                        <div className="col-md-4">
                                            <label className="form-label">No. Induk Kependudukan</label>
                                        </div>
                                        <div className="col-md-5">
                                            <input className="form-control form-control-sm" type='text' name="nomor_induk_kependudukan" readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-1">
                                    <div className="row g-3 align-items-center">
                                        <div className="col-md-4">
                                            <label className="form-label">Nama Pasien</label>
                                        </div>
                                        <div className="col-md-5">
                                            <input className="form-control form-control-sm" type='text' name="nama_pasien" readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-1">
                                    <div className="row g-3 align-items-center">
                                        <div className="col-md-4">
                                            <label className="form-label">Tanggal Lahir</label>
                                        </div>
                                        <div className="col-md-5">
                                            {/* <input className="form-control form-control-sm" type='text' name="tanggallahir_pasien" readOnly /> */}
                                            <ReactInputDateMask className="form-control form-control-sm" value={tglLahir} mask='dd/mm/yyyy' showMaskOnFocus={true} readOnly/>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-1">
                                    <div className="row g-3 align-items-center">
                                        <div className="col-md-4">
                                            <label className="form-label">Jenis Kelamin</label>
                                        </div>
                                        <div className="col-md-5">
                                            <input className="form-control form-control-sm" type='text' name="id_jeniskelamin" readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-1">
                                    <div className="row g-3 align-items-start">
                                        <div className="col-md-4">
                                            <label className="form-label">Alamat KTP</label>
                                        </div>
                                        <div className="col-md-5">
                                            <textarea className="form-control form-control-sm" type='textarea' name="alamat_pasien" rows={3} required readOnly></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col'>
                                <div className='rounded h-100' style={{ border: '1px solid #000000', backgroundColor: 'white' }}>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card bg-light mb-3'>
                    <div className="card-header bg-info fw-bold">Data Kunjungan</div>
                    <div className='card-body'>
                        <div className="row">
                            <div className="col">
                                <div className="mb-1">
                                    <div className="row g-3 align-items-center">
                                        <div className="col-md-4">
                                            <label className="form-label">Tanggal Pendaftaran</label>
                                        </div>
                                        <div className="col-md-5">
                                            <input className="form-control form-control-sm" type='text' name="tgl_registrasi" readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-1">
                                    <div className="row g-3 align-items-center">
                                        <div className="col-md-4">
                                            <label className="form-label">Umur Pasien</label>
                                        </div>
                                        <div className="col-md-5">
                                            <input className="form-control form-control-sm" type='text' name="umur" readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-1'>
                                    <div className="row g-3 align-items-center">
                                        <div className="col-md-4">
                                            <label className="form-label">Kelompok Penjamin</label>
                                        </div>
                                        <div className="col-md-5">
                                            <select className="form-select form-select-sm" name='id_kelompokpenjamin'>
                                                <option value="">-- Pilih Kelompok Penjamin --</option>
                                                {kelompokPenjamin && kelompokPenjamin.map((option, i) => {
                                                    return (
                                                        <option key={i} value={option.id_kelompokpenjamin}>{option.kelompokpenjamin}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-1'>
                                    <div className="row g-3 align-items-center">
                                        <div className="col-md-4">
                                            <label className="form-label">Penjamin Pasien</label>
                                        </div>
                                        <div className="col-md-5">
                                            <select className="form-select form-select-sm" name='id_penjamin'>
                                                <option value="">-- Pilih Penjamin --</option>
                                                {penjamin && penjamin.map((option, i) => {
                                                    return (
                                                        <option key={i} value={option.id_penjamin}>{option.nama_penjamin}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-1">
                                    <div className="row g-3 align-items-center">
                                        <div className="col-md-4">
                                            <label className="form-label">No. Peserta BPJS</label>
                                        </div>
                                        <div className="col-md-5">
                                            <div className='input-group '>
                                                <input className="form-control form-control-sm" type='text' name="no_bpjs" />
                                                <button className="btn btn-primary btn-sm" type="button" id="button-addon2"><i className="bi bi-search"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-1'>
                                    <div className="row g-3 align-items-center">
                                        <div className="col-md-4">
                                            <label className="form-label">DPJP</label>
                                        </div>
                                        <div className="col-md-5">
                                            <select className="form-select form-select-sm" name='id_dokter' onChange={getRuanganDokter}>
                                                <option value="">-- Pilih DPJP --</option>
                                                {dokter && dokter.map((option, i) => {
                                                    return (
                                                        <option key={i} value={option.id_dokter}>{option.nama_dokter}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-1'>
                                    <div className="row g-3 align-items-center">
                                        <div className="col-md-4">
                                            <label className="form-label">Ruangan Klinik</label>
                                        </div>
                                        <div className="col-md-5">
                                            <select className="form-select form-select-sm" name='id_ruangan'>
                                                <option value="">-- Pilih Ruangan --</option>
                                                {ruangan && ruangan.map((option, i) => {
                                                    return (
                                                        <option key={i} value={option.id_ruangan}>{option.nama_ruangan}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col'>
                                <div className='rounded' style={{ border: '1px solid transparent', maxWidth: '70%' }}>
                                    <div className='header' style={{ backgroundColor: '#1D9D60', padding: '5px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
                                        <h3 className='text-center text-white'>KARTU INDONESIA SEHAT</h3>
                                    </div>
                                    <div className='body py-5' style={{ backgroundColor: '#d2d3d5', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                                        <h2 className='text-center'>AKTIF</h2>
                                        <div className='px-5'>
                                            <table className='table table-borderless fw-bold'>
                                                <tbody>
                                                    <tr>
                                                        <td>Nomor Kartu</td>
                                                        <td>:</td>
                                                        <td>012345</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Nama Peserta</td>
                                                        <td>:</td>
                                                        <td>Budi Prabudi</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Alamat</td>
                                                        <td>:</td>
                                                        <td>Jl. Gatot Subroto Bandung</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tanggal Lahir</td>
                                                        <td>:</td>
                                                        <td>11 September 1967</td>
                                                    </tr>
                                                    <tr>
                                                        <td>NIK</td>
                                                        <td>:</td>
                                                        <td>32457834675843</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card-footer'>
                        <div className="">
                            <button type="submit" className="btn btn-primary me-3">{isSubmit ? 'Menyimpan...' : 'Simpan'}</button>
                            <button type="submit" className="btn btn-primary me-3">Inform Concern</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegistrasiKlinik
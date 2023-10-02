'use client'
import Link from "next/link";
import { useState, useEffect, useRef } from "react"
import Select from 'react-select'
import SelectNipz from '@app/components/SelectNipz'
import AsyncSelect from 'react-select/async'
import { useRouter } from "next/navigation";
import ReactInputDateMask from 'react-input-date-mask'

const PencatatanPasien = () => {
    const router = useRouter()
    const [timer, setTimer] = useState(null)
    const [agama, setagama] = useState([]);
    const [statusNikah, setStatusPernikahan] = useState([]);
    const [pendidikan, setPendidikan] = useState([]);
    const [pekerjaan, setPekerjaan] = useState([]);
    const [suku, setSuku] = useState([]);
    const [kelurahan, setKelurahan] = useState([]);
    const [kecamatan, setKecamatan] = useState([]);
    const [kabkot, setKabkot] = useState([]);
    const [provinsi, setProvinsi] = useState([]);
    const golonganDarah = [
        {
            'nama' : 'O+'
        },
        {
            'nama' : 'A+'
        },
    ]
    const wargaNegara = [
        {
            'nama' : 'WNI'
        },
        {
            'nama' : 'WNA'
        },
    ]
    const [isPasienLama, setIsPasienLama] = useState(false);
    const [jenisKelamin, setJenisKelamin] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [optionsKelurahan, setOptionsKelurahan] = useState([]);

    const noRekamMedikRef = useRef()
    const nikRef = useRef()
    const namaPasienRef = useRef()
    const tempatLahirRef = useRef()
    const tglLahirRef = useRef()
    const jenisKelaminRef = useRef()
    const agamaRef = useRef()
    const statusPernikahanRef = useRef()
    const golonganDarahRef = useRef()
    const namaIbuRef = useRef()
    const namaAyahRef = useRef()
    const namaPasanganRef = useRef()
    const pendidikanRef = useRef()
    const pekerjaanRef = useRef()
    const sukuRef = useRef()
    const wargaNegaraRef = useRef()
    const alamatRef = useRef()
    const alamatDomisiliRef = useRef()
    const noTeleponRef = useRef()
    const emailPasienRef = useRef()
    const kelurahanRef = useRef()
    const KecamatanRef = useRef()
    const kotaRef = useRef()
    const propinsiRef = useRef()
    const kodeSatuSehatRef = useRef()
    const photoRef = useRef('')

    useEffect(() => {
        // nikRef.current.value = '32732132'
        // setKecamatan([{value:'', label: '-- Pilih Kecamatan --'}])
        async function fetchData() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agama/get/100/0`, {
                method: "GET",
                headers: {
                    'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            }).then((response) => response.json())
            .then((data) => {
                setagama(data.data);
            })
            .catch(console.error);
            
            const jk = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jeniskelamin/get/100/0`, {
                method: "GET",
                headers: {
                    'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            }).then((response) => response.json())
            .then((data) => {
                setJenisKelamin(data.data);
            })
            .catch(console.error);
            
            const jenis = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/statuspernikahan/get/10/0`, {
                method: "GET",
                headers: {
                    'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            }).then((statusnikah) => statusnikah.json())
            .then((data) => {
                setStatusPernikahan(data.data);
            })
            .catch(console.error);

            const daftarPasien = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pendidikan/get/10/0`, {
                method: "GET",
                headers: {
                    'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            }).then((pendidikan) => pendidikan.json())
            .then((data) => {
                setPendidikan(data.data);
            })
            .catch(console.error);
            
            const pekerjaan = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pekerjaan/get/10/0`, {
                method: "GET",
                headers: {
                    'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            }).then((pekerjaan) => pekerjaan.json())
            .then((data) => {
                setPekerjaan(data.data);
            })
            .catch(console.error);
            
            const suku = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/suku/get/10/0`, {
                method: "GET",
                headers: {
                    'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            }).then((suku) => suku.json())
            .then((data) => {
                setSuku(data.data);
            })
            .catch(console.error);
        }

        fetchData();
    }, []);

    const handleIsPasienLama = (val) => {
        // console.log(val.target.checked);
        setIsPasienLama(val.target.checked);
    }

    const submitDataPasien = async (e) => {
        e.preventDefault();
        setIsSubmit(true);
        var formData = new FormData(e.target);
        const form_values = Object.fromEntries(formData);
        // console.log('www', form_values)
        // document.getElementById("pencatatan-pasien").reset();
        const url = isPasienLama ? 'add' : 'addauto';
        const pasien = fetch(`${process.env.NEXT_PUBLIC_API_URL}/pasien/${url}`, {
            method: "POST",
            body: JSON.stringify(form_values),
            // JSON.stringify({
            //     id_propinsi: propinsiRef.current.value, 
            //     id_kotakabupaten: kotaRef.current.value, 
            //     id_kecamatan: KecamatanRef.current.value, 
            //     id_kelurahan: kelurahanRef.current.value, 
            //     id_suku: sukuRef.current.value, 
            //     id_pendidikan: pendidikanRef.current.value, 
            //     id_pekerjaan: pekerjaanRef.current.value, 
            //     id_statuspernikahan: statusPernikahanRef.current.value, 
            //     id_agama: agamaRef.current.value, 
            //     id_jeniskelamin: jenisKelaminRef.current.value, 
            //     id_dokumenrekammedik: "", 
            //     id_satusehat: "", 
            //     nomor_rekam_medik: noRekamMedikRef.current.value, 
            //     tanggal_rekam_medik: "", 
            //     nomor_induk_kependudukan: nikRef.current.value, 
            //     nomor_kartukeluarga: "", 
            //     nama_pasien: namaPasienRef.current.value, 
            //     tempatlahir_pasien: tempatLahirRef.current.value, 
            //     tanggallahir_pasien: tglLahirRef.current.value, 
            //     alamat_pasien: alamatRef.current.value, 
            //     alamat_domisili_pasien: alamatDomisiliRef.current.value, 
            //     golongandarah_pasien: golonganDarahRef.current.value, 
            //     nomortelepon_pasien: noTeleponRef.current.value, 
            //     warganegara_pasien: wargaNegaraRef.current.value, 
            //     photo_pasien: "", 
            //     alamatemail_pasien: emailPasienRef.current.value, 
            //     nama_ayah: namaAyahRef.current.value, 
            //     nama_ibu_kandung: namaIbuRef.current.value, 
            //     nama_suami: namaPasanganRef.current.value, 
            //     nama_istri: namaPasanganRef.current.value, 
            //     namaperusahaan_bekerja: "", 
            //     is_pasienluar: "", 
            //     createtime: "", 
            //     create_id_ruangan: "", 
            //     create_id_login: "", 
            //     pasien_aktif: "", 
            //     id_profilfaskes: ""
            // }),
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

    const promiseOptions = inputValue => new Promise(resolve => {
        clearTimeout(timer)
        const newTimer = setTimeout(() => {
            const kelurahanx = []
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/v_wilayah/filterx/by/50/0`, {
                method: "POST",
                body: JSON.stringify({
                    nama_kelurahan: inputValue
                }),
                headers: {
                    'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            }).then((response) => response.json())
            .then((data) => {
                if(data.data.length > 0) {
                    data.data.map((d) => {
                        kelurahanx.push({value : `${d.id_kelurahan}|${d.id_kecamatan}|${d.id_kotakabupaten}|${d.id_propinsi}`, label : `${d.nama_kelurahan} / ${d.nama_kecamatan} / ${d.nama_kotakabupaten} / ${d.nama_propinsi}`});
                    })
                }
                // return kelurahanx
                // setOptionsKelurahan(kelurahan)
            })
            .finally(() => {
                resolve(kelurahanx)
            })
            .catch(console.error)
        }, 1000)

        setTimer(newTimer)
    })

    const handleSetWilayah = (e) => {
        // console.log(e.value);
        console.log(e);
        if(typeof e !== 'undefined' && e !== null) {
            const label = e.label.split(' / ');
            const value = e.value.split('|');
            e.value = value[0];
            const kecamatanx = [];
            kelurahanRef.current.value = value[0];
            KecamatanRef.current.value = value[1];
            kotaRef.current.value = value[2];
            propinsiRef.current.value = value[3];
            console.log(propinsiRef.current.value)
            kecamatanx.push({value: value[1], label: label[1]})
            setKecamatan(kecamatanx)
            setKabkot([{value: value[2], label: label[2]}])
            setProvinsi([{value: value[3], label: label[3]}])
            setKelurahan(e)
            // console.log(kelurahanRef.current.value);
        } else {
            setKabkot([])
            setKecamatan([])
            setProvinsi([])
            setKelurahan([])
        }
    }

    const handleResetForm = (e) => {
        e.preventDefault()
        document.getElementById("pencatatan-pasien").reset()
        setKelurahan([])
        setKecamatan([])
        setKabkot([])
        setProvinsi([])
    }

    const handleTglLahir = (e) => {
        console.log(e);
        const tgl = e.split('/');
        document.getElementsByName('tanggallahir_pasien')[0].value = `${tgl[2]}-${tgl[1]}-${tgl[0]}`;
    }

    return (
        <div className='p-2 h-100'>
            <div className='card bg-light mb-3'>
                <form id="pencatatan-pasien" onSubmit={submitDataPasien}>
                <div className="card-header bg-info fw-bold">Pencatatan Pasien</div>
                <div className='card-body'>
                    <div className="row">
                        <div className="col">
                            <div className="mb-1">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">No. Rekam Medik</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control form-control-sm" type='text' name="nomor_rekam_medik" disabled={!isPasienLama} required={isPasienLama} ref={noRekamMedikRef}/>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-1'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        {/* <label className="form-label">No. Induk Kependudukan</label> */}
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-check">
                                            <input className="form-check-input" onChange={handleIsPasienLama} type="checkbox" id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Pasien Lama?
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-1">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">No. Induk Kependudukan</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control form-control-sm" type='text' name="nomor_induk_kependudukan" ref={nikRef} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-1">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Nama Pasien</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control form-control-sm" type='text' name="nama_pasien" ref={namaPasienRef} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-1">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Tempat Lahir</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control form-control-sm" type='text' name="tempatlahir_pasien" ref={tempatLahirRef} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-1">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Tanggal Lahir</label>
                                    </div>
                                    <div className="col-md-5">
                                        {/* <input className="form-control form-control-sm" type='text' name="tanggallahir_pasien" ref={tglLahirRef} required/> */}
                                        <ReactInputDateMask className="form-control form-control-sm" mask='dd/mm/yyyy' onChange={handleTglLahir} showMaskOnFocus={false}/>
                                        <input type="hidden" id="tanggallahir_pasien" name="tanggallahir_pasien"/>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-1">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Jenis Kelamin</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" name='id_jeniskelamin' ref={jenisKelaminRef} required>
                                            <option value="">-- Pilih Jenis Kelamin --</option>
                                            {jenisKelamin.map((option, i) => {
                                                return (
                                                    <option key={i} value={option.id_jeniskelamin}>{option.jeniskelamin}</option>
                                                )
                                            })}
                                        </select>
                                        {/* <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="L" checked={jenisKelamin === 'L'} onChange={(e) => {setJenisKelamin(e.target.value)}}/>
                                            <label className="form-check-label" htmlFor="inlineRadio1">Laki-laki</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="P" checked={jenisKelamin === 'P'} onChange={(e) => {setJenisKelamin(e.target.value)}}/>
                                            <label className="form-check-label" htmlFor="inlineRadio2">Perempuan</label>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className='mb-1'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Agama</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" name='id_agama' ref={agamaRef} required>
                                            <option value="">-- Pilih Agama --</option>
                                            {agama.map((option) => {
                                                return (
                                                    <option key={option.id_agama} value={option.id_agama}>{option.nama_agama}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-1'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Status Pernikahan</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" name='id_statuspernikahan' ref={statusPernikahanRef} required>
                                            <option value="">-- Pilih Status Pernikahan --</option>
                                            {statusNikah.map((option) => {
                                                return (
                                                    <option key={option.id_statuspernikahan} value={option.id_statuspernikahan}>{option.nama_statuspernikahan}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-1'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Golongan Darah</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" name='golongandarah_pasien' ref={golonganDarahRef}>
                                            <option value="">-- Pilih Golongan Darah --</option>
                                            {golonganDarah.map((option) => {
                                                return (
                                                    <option key={option.nama} value={option.nama}>{option.nama}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-1">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Nama Ibu</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control form-control-sm" type='text' name="nama_ibu_kandung" ref={namaIbuRef} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-1">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Nama Ayah</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control form-control-sm" type='text' name="nama_ayah" ref={namaAyahRef} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-1">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Nama Pasangan</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control form-control-sm" type='text' name="nama_pasangan" ref={namaPasanganRef}/>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-1'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Pendidikan</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" name='id_pendidikan' ref={pendidikanRef} required>
                                            <option value="">-- Pilih Pendidikan Terakhir --</option>
                                            {pendidikan.map((option) => {
                                                return (
                                                    <option key={option.id_pendidikan} value={option.id_pendidikan}>{option.nama_pendidikan}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-1'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Pekerjaan</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" name='id_pekerjaan' ref={pekerjaanRef}>
                                            <option value="">-- Pilih Pekerjaan --</option>
                                            {pekerjaan.map((option) => {
                                                return (
                                                    <option key={option.id_pekerjaan} value={option.id_pekerjaan}>{option.nama_pekerjaan}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-1'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Suku</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" name='id_suku' ref={sukuRef} required>
                                            <option value="">-- Pilih Ras/Suku --</option>
                                            {suku.map((option) => {
                                                return (
                                                    <option key={option.id_suku} value={option.id_suku}>{option.nama_suku}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-1'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Warga Negara</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" name='warganegara_pasien' ref={wargaNegaraRef}>
                                            <option value="">-- Pilih Warga Negara --</option>
                                            {wargaNegara.map((option) => {
                                                return (
                                                    <option key={option.nama} value={option.nama}>{option.nama}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-1">
                                <div className="row g-3 align-items-start">
                                    <div className="col-md-4">
                                        <label className="form-label">Alamat KTP</label>
                                    </div>
                                    <div className="col-md-5">
                                        <textarea className="form-control form-control-sm" type='textarea' name="alamat_pasien" rows={3} ref={alamatRef} required></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-1'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        {/* <label className="form-label">No. Induk Kependudukan</label> */}
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Sesuai KTP
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-1">
                                <div className="row g-3 align-items-start">
                                    <div className="col-md-4">
                                        <label className="form-label">Alamat Domisili</label>
                                    </div>
                                    <div className="col-md-5">
                                        <textarea className="form-control form-control-sm" type='textarea' name="alamat_domisili_pasien" rows={3} ref={alamatDomisiliRef} required></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-1">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">No. Telepon</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control form-control-sm" type='text' name="nomortelepon_pasien" ref={noTeleponRef} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-1">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Email</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control form-control-sm" type='text' name="alamatemail_pasien" ref={emailPasienRef}/>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-1'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Kelurahan</label>
                                    </div>
                                    <div className="col-md-5">
                                        <AsyncSelect 
                                            id="kelurahan"
                                            name="id_kelurahan"
                                            cacheOptions={true}
                                            placeholder="Ketik nama Kelurahan.."
                                            loadOptions={promiseOptions}
                                            onChange={handleSetWilayah}
                                            instanceId="kelurahan"
                                            value={kelurahan}
                                            // onInputChange={handleKelurahanChange}
                                            // options={optionsKelurahan}
                                            // onChange={handleSetWilayah}
                                            isClearable={true}
                                            backspaceRemovesValue={true}
                                            ref={kelurahanRef}
                                            // isSearchable={true}
                                            // input
                                        />
                                        {/* <select className="form-select form-select-sm" name='kelurahan' ref={kelurahanRef}>
                                            {wargaNegara.map((option) => {
                                                return (
                                                    <option key={option.id_kelurahan} value={option.id}>{option.nama_kelurahan}</option>
                                                )
                                            })}
                                        </select> */}
                                    </div>
                                </div>
                            </div>
                            <div className='mb-1'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Kecamatan</label>
                                    </div>
                                    <div className="col-md-5">
                                        <SelectNipz name={'id_kecamatan'} options={kecamatan} reff={KecamatanRef}></SelectNipz>
                                        {/* <input className="form-control form-control-sm" ref={KecamatanRef}></input> */}
                                        {/* <select className="form-select form-select-sm" name='kecamatan' ref={KecamatanRef} disabled>
                                            {wargaNegara.map((option) => {
                                                return (
                                                    <option key={option.id} value={option.id}>{option.nama}</option>
                                                )
                                            })}
                                        </select> */}
                                    </div>
                                </div>
                            </div>
                            <div className='mb-1'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Kabupaten/Kota</label>
                                    </div>
                                    <div className="col-md-5">
                                        <SelectNipz name={"id_kotakabupaten"} options={kabkot} reff={kotaRef}></SelectNipz>
                                        {/* <select className="form-select form-select-sm" name='kabkota' ref={kotaRef} disabled>
                                            {wargaNegara.map((option) => {
                                                return (
                                                    <option key={option.id} value={option.id}>{option.nama}</option>
                                                )
                                            })}
                                        </select> */}
                                    </div>
                                </div>
                            </div>
                            <div className='mb-1'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Propinsi</label>
                                    </div>
                                    <div className="col-md-5">
                                        <SelectNipz name={'id_propinsi'} options={provinsi} reff={propinsiRef}></SelectNipz>
                                        {/* <select className="form-select form-select-sm" name='propinsi' ref={propinsiRef} disabled>
                                            {wargaNegara.map((option) => {
                                                return (
                                                    <option key={option.id} value={option.id}>{option.nama}</option>
                                                )
                                            })}
                                        </select> */}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-1">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Kode Satu Sehat</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control form-control-sm" type='text' name="kode_satu_sehat" ref={kodeSatuSehatRef} disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-1">
                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <label className="form-label">Foto Pasien</label>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="foto rounded bg-info mb-3" style={{minHeight: '200px', width: '100%'}}>

                                        </div>
                                        <Link href="#" className="btn btn-warning">Ambil Foto</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="">
                        <button type="submit" className="btn btn-primary me-3">{isSubmit ? 'Menyimpan...' : 'Simpan'}</button>
                        <button type="submit" className="btn btn-primary me-3">Cetak Kartu</button>
                        <button type="submit" onClick={handleResetForm} className="btn btn-primary me-3">Ulang</button>
                        {/* <button type="submit" className="btn btn-primary">Registrasi</button> */}
                        <Link href='/halaman/registrasi-klinik' className="btn btn-primary disabled" aria-disabled="true">Registrasi</Link>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}

export default PencatatanPasien
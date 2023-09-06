'use client'
import Link from "next/link";
import { useState, useEffect, useRef } from "react"

const PencatatanPasien = () => {
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
    const [jenisKelamin, setJenisKelamin] = useState('L');
    const [isSubmit, setIsSubmit] = useState(false);

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
        nikRef.current.value = '32732132'
        async function fetchData() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agama/get/100/0`, {
                method: "GET",
                headers: {
                    'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json())
            .then((data) => {
                setagama(data.data);
            })
            .catch(console.error);
            
            const jenis = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/statuspernikahan/get/10/0`, {
                method: "GET",
                headers: {
                    'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                    'Content-Type': 'application/json'
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
                    'Content-Type': 'application/json'
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
                    'Content-Type': 'application/json'
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
                    'Content-Type': 'application/json'
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
        const pasien = fetch(`${process.env.NEXT_PUBLIC_API_URL}/pasien/add`, {
            method: "POST",
            body: JSON.stringify({
                id_propinsi: propinsiRef.current.value, 
                id_kotakabupaten: kotaRef.current.value, 
                id_kecamatan: KecamatanRef.current.value, 
                id_kelurahan: kelurahanRef.current.value, 
                id_suku: sukuRef.current.value, 
                id_pendidikan: pendidikanRef.current.value, 
                id_pekerjaan: pekerjaanRef.current.value, 
                id_statuspernikahan: statusPernikahanRef.current.value, 
                id_agama: agamaRef.current.value, 
                id_jeniskelamin: jenisKelamin, 
                id_dokumenrekammedik: "", 
                id_satusehat: "", 
                nomor_rekam_medik: noRekamMedikRef.current.value, 
                tanggal_rekam_medik: "", 
                nomor_induk_kependudukan: nikRef.current.value, 
                nomor_kartukeluarga: "", 
                nama_pasien: namaPasienRef.current.value, 
                tempatlahir_pasien: tempatLahirRef.current.value, 
                tanggallahir_pasien: tglLahirRef.current.value, 
                alamat_pasien: alamatRef.current.value, 
                alamat_domisili_pasien: alamatDomisiliRef.current.value, 
                golongandarah_pasien: golonganDarahRef.current.value, 
                nomortelepon_pasien: noTeleponRef.current.value, 
                warganegara_pasien: wargaNegaraRef.current.value, 
                photo_pasien: "", 
                alamatemail_pasien: emailPasienRef.current.value, 
                nama_ayah: namaAyahRef.current.value, 
                nama_ibu_kandung: namaIbuRef.current.value, 
                nama_suami: namaPasanganRef.current.value, 
                nama_istri: namaPasanganRef.current.value, 
                namaperusahaan_bekerja: "", 
                is_pasienluar: "", 
                createtime: "", 
                create_id_ruangan: "", 
                create_id_login: "", 
                pasien_aktif: "", 
                id_profilfaskes: ""
            }),
            headers: {
                'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch(console.error);
        setIsSubmit(false);
    }

    return (
        <div className='p-2 h-100'>
            <div className='card bg-light mb-3'>
                <form onSubmit={submitDataPasien}>
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
                                        <input className="form-control form-control-sm" type='text' name="no_rekam_medik" disabled={!isPasienLama} required={isPasienLama} ref={noRekamMedikRef}/>
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
                                        <input className="form-control form-control-sm" type='text' name="no_induk_kependudukan" ref={nikRef} required/>
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
                                        <input className="form-control form-control-sm" type='text' name="tempat_lahir" ref={tempatLahirRef} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-1">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Tanggal Lahir</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control form-control-sm" type='text' name="tgl_lahir" ref={tglLahirRef} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-1">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Jenis Kelamin</label>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="L" checked={jenisKelamin === 'L'} onChange={(e) => {setJenisKelamin(e.target.value)}}/>
                                            <label className="form-check-label" htmlFor="inlineRadio1">Laki-laki</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="P" checked={jenisKelamin === 'P'} onChange={(e) => {setJenisKelamin(e.target.value)}}/>
                                            <label className="form-check-label" htmlFor="inlineRadio2">Perempuan</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-1'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Agama</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" nama='agama' ref={agamaRef} required>
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
                                        <select className="form-select form-select-sm" nama='satus_pernikahan' ref={statusPernikahanRef} required>
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
                                        <select className="form-select form-select-sm" nama='golongan_darah' ref={golonganDarahRef}>
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
                                        <input className="form-control form-control-sm" type='text' name="nama_ibu" ref={namaIbuRef} required/>
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
                                        <select className="form-select form-select-sm" nama='pendidikan' ref={pendidikanRef} required>
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
                                        <select className="form-select form-select-sm" nama='pekerjaan' ref={pekerjaanRef}>
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
                                        <select className="form-select form-select-sm" nama='suku' ref={sukuRef} required>
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
                                        <select className="form-select form-select-sm" nama='warga_negara' ref={wargaNegaraRef}>
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
                                        <textarea className="form-control form-control-sm" type='textarea' name="alamat_ktp" rows={3} ref={alamatRef} required></textarea>
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
                                        <textarea className="form-control form-control-sm" type='textarea' name="alamat_domisili" rows={3} ref={alamatDomisiliRef} required></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-1">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">No. Telepon</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control form-control-sm" type='text' name="no_telp" ref={noTeleponRef} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-1">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Email</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control form-control-sm" type='text' name="email" ref={emailPasienRef}/>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-1'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Kelurahan</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" nama='kelurahan' ref={kelurahanRef}>
                                            {wargaNegara.map((option) => {
                                                return (
                                                    <option key={option.id_kelurahan} value={option.id}>{option.nama_kelurahan}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-1'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Kecamatan</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" nama='kecamatan' ref={KecamatanRef} disabled>
                                            {/* {wargaNegara.map((option) => {
                                                return (
                                                    <option key={option.id} value={option.id}>{option.nama}</option>
                                                )
                                            })} */}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-1'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Kabupaten/Kota</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" nama='kabkota' ref={kotaRef} disabled>
                                            {/* {wargaNegara.map((option) => {
                                                return (
                                                    <option key={option.id} value={option.id}>{option.nama}</option>
                                                )
                                            })} */}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-1'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Propinsi</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" nama='propinsi' ref={propinsiRef} disabled>
                                            {/* {wargaNegara.map((option) => {
                                                return (
                                                    <option key={option.id} value={option.id}>{option.nama}</option>
                                                )
                                            })} */}
                                        </select>
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
                        <button type="submit" className="btn btn-primary me-3">Ulang</button>
                        <button type="submit" className="btn btn-primary">Registrasi</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}

export default PencatatanPasien
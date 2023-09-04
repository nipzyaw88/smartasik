'use client'
import Link from "next/link";
import { useState, useEffect } from "react"

const PencatatanPasien = () => {
    const [agama, setagama] = useState([]);
    const [statusNikah, setStatusPernikahan] = useState([]);
    const [pendidikan, setPendidikan] = useState([]);
    const [pekerjaan, setPekerjaan] = useState([]);
    const [suku, setSuku] = useState([]);
    const [wargaNegara, setWargaNegara] = useState([]);

    useEffect(() => {
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

    return (
        <div className='p-2 h-100'>
            <div className='card bg-light mb-3'>
                <div className="card-header bg-info fw-bold">Pencatatan Pasien</div>
                <div className='card-body'>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">No. Rekam Medik</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" type='text' name="no_rekam_medik" readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        {/* <label className="form-label">No. Induk Kependudukan</label> */}
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Pasien Lama?
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">No. Induk Kependudukan</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" type='text' name="no_induk_kependudukan" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Nama Pasien</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" type='text' name="nama_pasien" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Tempat Lahir</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" type='text' name="tempat_lahir" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Tanggal Lahir</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" type='text' name="tgl_lahir" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Jenis Kelamin</label>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="L" checked onChange={() => {}}/>
                                            <label className="form-check-label" htmlFor="inlineRadio1">Laki-laki</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="P"/>
                                            <label className="form-check-label" htmlFor="inlineRadio2">Perempuan</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Jenis Kelamin</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" nama='agama'>
                                            {agama.map((option) => {
                                                return (
                                                    <option key={option.id_agama} value={option.id_agama}>{option.nama_agama}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Status Pernikahan</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" nama='satus_pernikahan'>
                                            {statusNikah.map((option) => {
                                                return (
                                                    <option key={option.id} value={option.id}>{option.nama}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Golongan Darah</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" nama='satus_pernikahan'>
                                            {statusNikah.map((option) => {
                                                return (
                                                    <option key={option.id} value={option.id}>{option.nama}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Nama Ibu</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" type='text' name="nama_ibu" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Nama Ayah</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" type='text' name="nama_ayah" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Nama Pasangan</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" type='text' name="nama_pasangan" />
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Pendidikan</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" nama='pendidikan'>
                                            {pendidikan.map((option) => {
                                                return (
                                                    <option key={option.id} value={option.id}>{option.nama}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Pekerjaan</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" nama='pekerjaan'>
                                            {pekerjaan.map((option) => {
                                                return (
                                                    <option key={option.id} value={option.id}>{option.nama}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Suku</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" nama='suku'>
                                            {suku.map((option) => {
                                                return (
                                                    <option key={option.id} value={option.id}>{option.nama}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Warga Negara</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" nama='warga_negara'>
                                            {wargaNegara.map((option) => {
                                                return (
                                                    <option key={option.id} value={option.id}>{option.nama}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <div className="row g-3 align-items-start">
                                    <div className="col-md-4">
                                        <label className="form-label">Alamat KTP</label>
                                    </div>
                                    <div className="col-md-5">
                                        <textarea className="form-control" type='textarea' name="alamat_ktp" rows={3}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        {/* <label className="form-label">No. Induk Kependudukan</label> */}
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Sesuai KTP
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row g-3 align-items-start">
                                    <div className="col-md-4">
                                        <label className="form-label">Alamat Domisili</label>
                                    </div>
                                    <div className="col-md-5">
                                        <textarea className="form-control" type='textarea' name="alamat_domisili" rows={3}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">No. Telepon</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" type='text' name="no_telp" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Email</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" type='text' name="email" />
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Kelurahan</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" nama='kelurahan'>
                                            {wargaNegara.map((option) => {
                                                return (
                                                    <option key={option.id} value={option.id}>{option.nama}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Kecamatan</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" nama='kecamatan'>
                                            {wargaNegara.map((option) => {
                                                return (
                                                    <option key={option.id} value={option.id}>{option.nama}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Kabupaten/Kota</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" nama='kabkota'>
                                            {wargaNegara.map((option) => {
                                                return (
                                                    <option key={option.id} value={option.id}>{option.nama}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Propinsi</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select className="form-select form-select-sm" nama='propinsi'>
                                            {wargaNegara.map((option) => {
                                                return (
                                                    <option key={option.id} value={option.id}>{option.nama}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-4">
                                        <label className="form-label">Kode Satu Sehat</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className="form-control" type='text' name="kode_satu_sehat" disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <label className="form-label">Foto Pasien</label>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="foto rounded bg-info mb-3" style={{minHeight: '200px', width: '100%'}}>

                                        </div>
                                        <Link href="#" className="btn btn-primary">Ambil Foto</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="">
                        <button type="submit" className="btn btn-primary me-3">Simpan</button>
                        <button type="submit" className="btn btn-primary me-3">Cetak Kartu</button>
                        <button type="submit" className="btn btn-primary me-3">Ulang</button>
                        <button type="submit" className="btn btn-primary">Registrasi</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PencatatanPasien
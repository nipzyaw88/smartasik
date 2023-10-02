'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

const Update = ({ params }) => {
    const { id_agama } = params
    const [isSubmit, setIsSubmit] = useState(false);
    const [agama, setAgama] = useState()
    const [tempAgama, setTempAgama] = useState({id_agama: '', nama_agama: '', kode_satusehat_agama: '', agama_aktif: false})

    const router = useRouter();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/agama/get/by/1/0`, {
            method: "POST",
            body: JSON.stringify({
                id_agama : id_agama
            }),
            headers: {
                'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then((data) => {
            console.log(data.data[0])
            setAgama(data.data[0]);
            setTempAgama(data.data[0]);
        })
        .catch(console.error);
    }, [])

    const submit = async (e) => {
        e.preventDefault();
        setIsSubmit(true);
        var formData = new FormData(e.target);
        const form_values = Object.fromEntries(formData);
        const pasien = fetch(`${process.env.NEXT_PUBLIC_API_URL}/agama/edit`, {
            method: "PUT",
            body: JSON.stringify(form_values),
            headers: {
                'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then((data) => {
            console.log(data);
            router.push(`/halaman/master/agama/`)
        })
        .catch(console.error);
        setIsSubmit(false);
    }

    const handleChange = (val) => {
        setTempAgama({id_agama: tempAgama.id_agama, nama_agama: tempAgama.nama_agama, kode_satusehat_agama: tempAgama.kode_satusehat_agama, agama_aktif: val.target.checked})
    }

    return (
        <div className='p-2 h-100'>
            <div className='card bg-light mb-3'>
                <form id="pencatatan-pasien" onSubmit={submit}>
                    <div className="card-header bg-info fw-bold">Tambah Data Agama</div>
                    <div className='card-body'>
                        <div className="row">
                            <div className="col">
                                <div className="mb-1">
                                    <div className="row g-3 align-items-center">
                                        <div className="col-md-4">
                                            <label className="form-label">Nama Agama</label>
                                        </div>
                                        <div className="col-md-5">
                                            <input className="form-control form-control-sm" type='hidden' name="id_agama" defaultValue={tempAgama.id_agama}/>
                                            <input className="form-control form-control-sm" type='text' name="nama_agama" defaultValue={tempAgama.nama_agama}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-1">
                                    <div className="row g-3 align-items-center">
                                        <div className="col-md-4">
                                            <label className="form-label">Kode Satu Sehat Agama</label>
                                        </div>
                                        <div className="col-md-5">
                                            <input className="form-control form-control-sm" type='text' name="kode_satusehat_agama" defaultValue={tempAgama.kode_satusehat_agama}/>
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
                                                <input className="form-check-input" name='agama_aktif' type="checkbox" id="flexCheckDefault" onChange={handleChange} checked={tempAgama.agama_aktif}/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Aktif ?
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="">
                            <button type="submit" className="btn btn-primary me-3">{isSubmit ? 'Menyimpan...' : 'Simpan'}</button>
                            <button type="button" className="btn btn-danger me-3" onClick={() => router.back()}>Batal</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Update
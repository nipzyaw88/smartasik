'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

const Create = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const router = useRouter();

    const submit = async (e) => {
        e.preventDefault();
        setIsSubmit(true);
        var formData = new FormData(e.target);
        const form_values = Object.fromEntries(formData);
        const pasien = fetch(`${process.env.NEXT_PUBLIC_API_URL}/administrasi/add`, {
            method: "POST",
            body: JSON.stringify(form_values),
            headers: {
                'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log(data);
            router.push(`/halaman/master/administrasi/`)
        })
        .catch(console.error);
        setIsSubmit(false);
    }

    const handleAktif = (val) => {
        // setIsPasienLama(val.target.checked);
    }
  return (
    <div className='p-2 h-100'>
        <div className='card bg-light mb-3'>
            <form id="pencatatan-pasien" onSubmit={submit}>
            <div className="card-header bg-info fw-bold">Tambah Data Administrasi</div>
            <div className='card-body'>
                <div className="row">
                    <div className="col">
                        <div className="mb-1">
                            <div className="row g-3 align-items-center">
                                <div className="col-md-4">
                                    <label className="form-label">Nama Administrasi</label>
                                </div>
                                <div className="col-md-5">
                                    <input className="form-control form-control-sm" type='text' name="nama_administrasi"/>
                                </div>
                            </div>
                        </div>
                        <div className="mb-1">
                            <div className="row g-3 align-items-center">
                                <div className="col-md-4">
                                    <label className="form-label">Nama Lain Administrasi</label>
                                </div>
                                <div className="col-md-5">
                                    <input className="form-control form-control-sm" type='text' name="namalain_administrasi"/>
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
                                        <input className="form-check-input" onChange={handleAktif} name='is_pasienbaru' type="checkbox" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Pasien Baru ?
                                        </label>
                                    </div>
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
                                        <input className="form-check-input" onChange={handleAktif} name='administrasi_aktif' type="checkbox" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Administrasi Aktif ?
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

export default Create
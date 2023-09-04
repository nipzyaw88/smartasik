'use client'

import { useEffect } from "react";

const Antrian = () => {
    const datex = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    return (
        <div className='container-fluid vh-100'>
            <div className='d-flex flex-column justify-content-center align-items-center h-100'>
                <h1><strong>ANTRIAN PASIEN</strong></h1>
                <h1>KLINIK PRATAMA EDELWEIS</h1>
                <h3>{datex}</h3>
                <div className='col-12 d-flex justify-content-center mt-5'>
                    <div className='row gx-5'>
                        <div className='col'>
                            <div className="box box-klinik-umum text-center">
                                <h4 className="label-antrian ">KLINIK UMUM</h4>
                                <p className="angka-antrian">21</p>
                                <h4 className="label-antrian">SISA ANTRIAN</h4>
                                <p className="angka-antrian">9</p>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="box box-klinik-gigi text-center">
                                <h4 className="label-antrian">KLINIK GIGI</h4>
                                <p className="angka-antrian">21</p>
                                <h4 className="label-antrian">SISA ANTRIAN</h4>
                                <p className="angka-antrian">9</p>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="box box-klinik-kia text-center">
                                <h4 className="label-antrian">KLINIK KIA</h4>
                                <p className="angka-antrian">21</p>
                                <h4 className="label-antrian">SISA ANTRIAN</h4>
                                <p className="angka-antrian">9</p>
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
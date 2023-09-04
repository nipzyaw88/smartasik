import React from 'react'

const LayarAntrianKlinik = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
        <h1>ANTRIAN POLIKLINIK</h1>
        <h1>KLINIK PRATAMA EDELWEIS</h1>
        <div className='col-12 mt-5'>
            <div className='row'>
                <div className='col-7 px-5'>
                    <div className='bg-tv'>

                    </div>
                </div>
                <div className='col-5 text-center'>
                    <h2>ANTRIAN DIPANGGIL</h2>
                    <div className='col-12 mb-5'>
                        <div className="row gx-5">
                            <div className='col'>
                                <div className="box-p-kecil box-klinik-umum text-center">
                                    <h4 className="label-antrian ">KLINIK UMUM 1</h4>
                                    <p className="angka-antrian">21</p>
                                    <h4 className="label-antrian">Dr. Budi</h4>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="box-p-kecil box-klinik-umum text-center">
                                    <h4 className="label-antrian ">KLINIK UMUM 2</h4>
                                    <p className="angka-antrian">21</p>
                                    <h4 className="label-antrian">Dr. Gina</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className="row gx-5">
                            <div className='col'>
                                <div className="box-p-kecil box-klinik-gigi text-center">
                                    <h4 className="label-antrian ">KLINIK GIGI</h4>
                                    <p className="angka-antrian">21</p>
                                    <h4 className="label-antrian">Dr. Iwan</h4>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="box-p-kecil box-klinik-kia text-center">
                                    <h4 className="label-antrian ">KLINIK KIA</h4>
                                    <p className="angka-antrian">21</p>
                                    <h4 className="label-antrian">Dr. Dani</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LayarAntrianKlinik
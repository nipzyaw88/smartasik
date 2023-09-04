import React from 'react'

const LayarAntrianKlinik = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
        <h1>ANTRIAN PENDAFTARAN</h1>
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
                        <div className="row">
                            <div className='col'>
                                <div className="box-p-kecil box-klinik-umum rounded-5">
                                    <div className='row d-flex align-items-end'>
                                        <div className='col'>
                                            <h4 className='label-antrian'>LOKET 1</h4>
                                        </div>
                                        <div className='col'>
                                            <h4 className='angka-antrian'>U-1</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className="row">
                            <div className='col'>
                                <div className="box-p-kecil box-loket-2 rounded-5">
                                    <div className='row d-flex align-items-end'>
                                        <div className='col'>
                                            <h4 className='label-antrian'>LOKET 2</h4>
                                        </div>
                                        <div className='col'>
                                            <h4 className='angka-antrian'>U-3</h4>
                                        </div>
                                    </div>
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
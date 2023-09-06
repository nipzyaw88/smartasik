import React from 'react'

const RegistrasiKlinik = () => {
  return (
    <div className='p-2 h-100'>
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
                                    <input className="form-control form-control-sm" type='text' name="no_rekam_medik" disabled/>
                                </div>
                            </div>
                        </div>
                        <div className="mb-1">
                            <div className="row g-3 align-items-center">
                                <div className="col-md-4">
                                    <label className="form-label">No. Induk Kependudukan</label>
                                </div>
                                <div className="col-md-5">
                                    <input className="form-control form-control-sm" type='text' name="no_rekam_medik" disabled/>
                                </div>
                            </div>
                        </div>
                        <div className="mb-1">
                            <div className="row g-3 align-items-center">
                                <div className="col-md-4">
                                    <label className="form-label">Nama Pasien</label>
                                </div>
                                <div className="col-md-5">
                                    <input className="form-control form-control-sm" type='text' name="nama_pasien" disabled/>
                                </div>
                            </div>
                        </div>
                        <div className="mb-1">
                            <div className="row g-3 align-items-center">
                                <div className="col-md-4">
                                    <label className="form-label">Tanggal Lahir</label>
                                </div>
                                <div className="col-md-5">
                                    <input className="form-control form-control-sm" type='text' name="tgl_lahir" disabled/>
                                </div>
                            </div>
                        </div>
                        <div className="mb-1">
                            <div className="row g-3 align-items-center">
                                <div className="col-md-4">
                                    <label className="form-label">Jenis Kelamin</label>
                                </div>
                                <div className="col-md-5">
                                    <input className="form-control form-control-sm" type='text' name="jenis_kelamin" disabled/>
                                </div>
                            </div>
                        </div>
                        <div className="mb-1">
                            <div className="row g-3 align-items-start">
                                <div className="col-md-4">
                                    <label className="form-label">Alamat KTP</label>
                                </div>
                                <div className="col-md-5">
                                    <textarea className="form-control form-control-sm" type='textarea' name="alamat_ktp" rows={3} required disabled></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='rounded h-100' style={{border: '1px solid #000000', backgroundColor: 'white'}}>

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
                                    <input className="form-control form-control-sm" type='text' name="no_rekam_medik" disabled/>
                                </div>
                            </div>
                        </div>
                        <div className="mb-1">
                            <div className="row g-3 align-items-center">
                                <div className="col-md-4">
                                    <label className="form-label">Umur Pasien</label>
                                </div>
                                <div className="col-md-5">
                                    <input className="form-control form-control-sm" type='text' name="no_rekam_medik" disabled/>
                                </div>
                            </div>
                        </div>
                        <div className='mb-1'>
                            <div className="row g-3 align-items-center">
                                <div className="col-md-4">
                                    <label className="form-label">Kelompok Penjamin</label>
                                </div>
                                <div className="col-md-5">
                                    <select className="form-select form-select-sm" nama='kelurahan'>
                                        {/* {wargaNegara.map((option) => {
                                            return (
                                                <option key={option.id_kelurahan} value={option.id}>{option.nama_kelurahan}</option>
                                            )
                                        })} */}
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
                                    <select className="form-select form-select-sm" nama='kelurahan'>
                                        {/* {wargaNegara.map((option) => {
                                            return (
                                                <option key={option.id_kelurahan} value={option.id}>{option.nama_kelurahan}</option>
                                            )
                                        })} */}
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
                                        <input className="form-control form-control-sm" type='text' name="no_rekam_medik" />
                                        <button className="btn btn-primary btn-sm" type="button" id="button-addon2"><i class="bi bi-search"></i></button>
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
                                    <select className="form-select form-select-sm" nama='kelurahan'>
                                        {/* {wargaNegara.map((option) => {
                                            return (
                                                <option key={option.id_kelurahan} value={option.id}>{option.nama_kelurahan}</option>
                                            )
                                        })} */}
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
                                    <select className="form-select form-select-sm" nama='kelurahan'>
                                        {/* {wargaNegara.map((option) => {
                                            return (
                                                <option key={option.id_kelurahan} value={option.id}>{option.nama_kelurahan}</option>
                                            )
                                        })} */}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='rounded' style={{border: '1px solid transparent', maxWidth: '70%'}}>
                            <div className='header' style={{backgroundColor: '#1D9D60', padding: '5px', borderTopLeftRadius: '20px', borderTopRightRadius :'20px'}}>
                                <h3 className='text-center text-white'>KARTU INDONESIA SEHAT</h3>
                            </div>
                            <div className='body py-5' style={{backgroundColor: '#d2d3d5', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'}}>
                                <h2 className='text-center'>AKTIF</h2>
                                <div className='px-5'>
                                    <table className='table no-border fw-bold'>
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
                                    </table>
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

export default RegistrasiKlinik
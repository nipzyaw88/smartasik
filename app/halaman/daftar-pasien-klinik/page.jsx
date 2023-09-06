import Link from 'next/link'
import React from 'react'

const DaftarPasienKlinik = () => {
  return (
    <div className='p-2 h-100'>
        <div className='card bg-light mb-3'>
            <div className="card-header bg-info fw-bold">Pencarian Pasien</div>
            <div className='card-body'>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <div className="row g-3 align-items-center">
                                <div className="col-md-4">
                                    <label className="form-label">No. Registrasi</label>
                                </div>
                                <div className="col-md-5">
                                    <input className="form-control" name="tes" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="row g-3 align-items-center">
                                <div className="col-md-4">
                                    <label className="form-label">No. Rekam Medik</label>
                                </div>
                                <div className="col-md-5">
                                    <input className="form-control" name="tes" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="row g-3 align-items-center">
                                <div className="col-md-4">
                                    <label className="form-label">Nama Pasien</label>
                                </div>
                                <div className="col-md-5">
                                    <input className="form-control" name="tes" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="row g-3 align-items-center">
                                <div className="col-md-4">
                                    <label className="form-label">Tanggal Registrasi</label>
                                </div>
                                <div className="col-md-5">
                                    <input className="form-control" name="tes" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-1">
                            <div className="row g-3 align-items-center">
                                <div className="col-md-4">
                                    <label className="form-label">DJP Pasien</label>
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
                    </div>
                </div>
                <div className="d-flex flex-row">
                        <button className="btn btn-info me-2">Cari</button>
                        {/* <Link className="btn btn-info" href='/halaman/pencatatan-pasien'>Pasien Baru</Link> */}
                </div>
            </div>
        </div>
        <div className='card bg-light mb-3'>
            <div className="card-header bg-info fw-bold">Data Kunjungan Pasien</div>
            <div className='card-body'>
                <table className="table table-bordered">
                    <thead className="table-primary align-middle text-center">
                        <tr>
                            <th scope="col">Antrian</th>
                            <th scope="col">Tanggal Registrasi</th>
                            <th scope="col">No. Registrasi / No. Rekam Medik</th>
                            <th scope="col">Nama Pasien / Tanggal Lahir / Umur</th>
                            <th scope="col">Penjamin Pasien</th>
                            <th scope="col">DPJP Klinik</th>
                            <th scope="col">Riwayat Pemeriksaan</th>
                            <th scope="col">Asesmen Keperawatan</th>
                            <th scope="col">Pemeriksaan Dokter</th>
                        </tr>
                    </thead>
                    <tbody className="table-info">
                        {/* <tr>
                            <td scope="row"></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr> */}
                        {/* {daftarPasien.map((pasien) => {
                            return (
                                <tr>
                                    <td scope="row"></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            )
                        })} */}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default DaftarPasienKlinik
'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Suspense } from 'react'
import { useRouter } from 'next/navigation'

const Administrasi = () => {
  const [data, setData] = useState([])
  const router = useRouter()
  
  function refreshData() {
    // router.replace(router.refresh.asPath);
    // router.push('/halaman/master/administrasi')
    getAdministrasi()
  }

  async function getAdministrasi() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/administrasi/get/10/0`, {
      method: "GET",
      headers: {
          'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
          'Content-Type': 'application/json'
      }
    })
  
    if(!res.ok) {
      throw new Error("Gagal mengambil data")
      // console.log(`${process.env.NEXT_PUBLIC_API_URL}/administrasi/10/0`)
    }

    await res.json().then((d) => setData(d.data));  
  }
  
  async function hapusData(id_administrasi) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/administrasi/delete`, {
      method: "DELETE",
      headers: {
          'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_administrasi: id_administrasi
      })
    })
  
    if(!res.ok) {
      throw new Error("Gagal menghapus data")
      // console.log(`${process.env.NEXT_PUBLIC_API_URL}/administrasi/10/0`)
    }
  
    refreshData()
  }

  useEffect(() => {
    getAdministrasi()
  }, [])

  return (
    <div className='p-2 h-100'>
      <h3 className='judul'>
          Master Data Administrasi
      </h3>
      <div className='card bg-light mb-3'>
        <div className='card-body'>
            <div className='row m-auto mb-2'>
              <Link href={'/halaman/master/administrasi/create'} className='btn btn-success'>Tambah</Link>
            </div>
            <table className="table table-bordered">
                <thead className="table-primary">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tindakan</th>
                        <th scope="col">Ruangan</th>
                        <th scope="col">Nama Administrasi</th>
                        <th scope="col">Nama Lain Administrasi</th>
                        <th scope="col">Pasien Baru</th>
                        <th scope="col">Administrasi Aktif</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody className="table-info">
                    {data.map((d, i) => {
                      return (
                        <tr key={i}>
                          <td>{d.id_administrasi}</td>
                          <td>{d.id_tindakan}</td>
                          <td>{d.id_ruangan}</td>
                          <td>{d.nama_administrasi}</td>
                          <td>{d.namalain_administrasi}</td>
                          <td>{d.is_pasienbaru ? 'Ya' : 'Tidak'}</td>
                          <td>{d.administrasi_aktif ? 'Ya' : 'Tidak'}</td>
                          <td>
                            <div className='col'>
                              <Link href={`/halaman/master/administrasi/update/${d.id_administrasi}`}><i className='bi bi-pencil-fill'></i></Link>
                              <span className='me-2'></span>
                              <Link href={'#'} data-id={d.id_administrasi} onClick={() => hapusData(d.id_administrasi)}><i className='bi bi-trash-fill'></i></Link>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
            </table>
        </div>
    </div>
    </div>
  )
}

export default Administrasi
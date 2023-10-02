'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Suspense } from 'react'
import { useRouter } from 'next/navigation'

const MasterAgama = () => {
  const [data, setData] = useState([])
  const router = useRouter()
  
  function refreshData() {
    // router.replace(router.refresh.asPath);
    // router.push('/halaman/master/agama')
    getAgama()
  }

  async function getAgama() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agama/get/10/0`, {
      method: "GET",
      headers: {
          'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
          'Content-Type': 'application/json'
      }
    })
  
    if(!res.ok) {
      throw new Error("Gagal mengambil data")
      // console.log(`${process.env.NEXT_PUBLIC_API_URL}/agama/10/0`)
    }

    await res.json().then((d) => setData(d.data));  
  }
  
  async function hapusData(id_agama) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agama/delete`, {
      method: "DELETE",
      headers: {
          'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_agama: id_agama
      })
    })
  
    if(!res.ok) {
      throw new Error("Gagal menghapus data")
      // console.log(`${process.env.NEXT_PUBLIC_API_URL}/agama/10/0`)
    }
  
    refreshData()
  }

  useEffect(() => {
    getAgama()
  }, [])

  return (
    <div className='p-2 h-100'>
      <h3 className='judul'>
          Master Data Agama
      </h3>
      <div className='card bg-light mb-3'>
        <div className='card-body'>
            <div className='row m-auto mb-2'>
              <Link href={'/halaman/master/agama/create'} className='btn btn-success'>Tambah</Link>
            </div>
            <table className="table table-bordered">
                <thead className="table-primary">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Kode Satu Sehat</th>
                        <th scope="col">Aktif</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody className="table-info">
                    {data.map((d, i) => {
                      return (
                        <tr key={i}>
                          <td>{d.id_agama}</td>
                          <td>{d.nama_agama}</td>
                          <td>{d.kode_satusehat_agama}</td>
                          <td>{d.agama_aktif ? 'Aktif' : 'Tidak Aktif'}</td>
                          <td>
                            <div className='col'>
                              <Link href={`/halaman/master/agama/update/${d.id_agama}`}><i className='bi bi-pencil-fill'></i></Link>
                              <span className='me-2'></span>
                              <Link href={'#'} data-id={d.id_agama} onClick={() => hapusData(d.id_agama)}><i className='bi bi-trash-fill'></i></Link>
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

export default MasterAgama
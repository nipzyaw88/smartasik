'use client'
import {useEffect} from 'react'

const AntrianPendaftaran = ({ loket }) => {
  console.log(loket)
  if(typeof loket !== 'undefined') {
    return (
      <>
      {loket && loket.map((l, i) => {
        return (
          <div key={i} className='col-12 mb-5'>
              <div className="row m-auto">
                  <div className='col'>
                      <div className="box-p-kecil box-klinik-umum rounded-5">
                          <div className='row d-flex align-items-end'>
                              <div className='col'>
                                  <h4 className='label-antrian'>LOKET {l.nourut_loket}</h4>
                              </div>
                              <div className='col'>
                                  <h4 className='angka-antrian'>{l.kodeJenisAntrian}-{l.noDipanggil}</h4>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        )
      })}
      </>
    )
  }
  // useEffect(() => {
  //   // return () => {
      
  //   // }
  // }, [])
}

export default AntrianPendaftaran
// import React from 'react'

const Header = () => {
    const datex = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
  return (
    <header>
        <div className='d-flex align-items-center flex-row bg p-3'>
            <div className='col-2'>
                <img src='/assets/images/logo.png' style={{width: '160px'}}/>
            </div>
            <div className='col-10'>
                <h2 className='float-end text-white'>{datex}</h2>
            </div>
        </div>
    </header>
  )
}

export default Header
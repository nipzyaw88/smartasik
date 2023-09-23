import Link from 'next/link'
import '../globals.css'
const LeftNav = () => {
    return (
        <div className="col-2 left-nav">
            <ul className="list-unstyled ps-0">
                <li className='mb-1'>
                    <Link href="/halaman/dashboard" className='link-body-emphasis d-inline-flex text-decoration-none rounded'>Beranda</Link>
                </li>
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                        Admisi Rumah Sakit
                    </button>
                    <div className="collapse" id="home-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><Link href="/halaman/registrasi-pasien" className='link-body-emphasis d-inline-flex text-decoration-none rounded'>Registrasi Pasien</Link></li>
                            <li><Link href="/halaman/daftar-pasien-klinik" className='link-body-emphasis d-inline-flex text-decoration-none rounded'>Daftar Pasien Klinik</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0" data-bs-toggle="collapse" data-bs-target="#home-collapse2" aria-expanded="false">
                        Layar Publik
                    </button>
                    <div className="collapse" id="home-collapse2">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><Link href="/layar-antrian-pendaftaran" target='_blank' className='link-body-emphasis d-inline-flex text-decoration-none rounded'>Layar Antrian Pendaftaran</Link></li>
                            <li><Link href="/layar-antrian-klinik" target='_blank' className='link-body-emphasis d-inline-flex text-decoration-none rounded'>Layar Antrian Klinik</Link></li>
                            <li><Link href="/antrian" target='_blank' className='link-body-emphasis d-inline-flex text-decoration-none rounded'>Layar Antrian Pendaftaran</Link></li>
                        </ul>
                    </div>
                </li>
                {/* <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                        Dashboard
                    </button>
                    <div className="collapse" id="dashboard-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Overview</a></li>
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Weekly</a></li>
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Monthly</a></li>
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Annually</a></li>
                        </ul>
                    </div>
                </li>
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                        Orders
                    </button>
                    <div className="collapse" id="orders-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">New</a></li>
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Processed</a></li>
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Shipped</a></li>
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Returned</a></li>
                        </ul>
                    </div>
                </li>
                <li className="border-top my-3"></li>
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                        Account
                    </button>
                    <div className="collapse" id="account-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">New...</a></li>
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Profile</a></li>
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Settings</a></li>
                            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Sign out</a></li>
                        </ul>
                    </div>
                </li> */}
            </ul>
        </div>
    )
}

export default LeftNav
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="d-flex flex-row justify-content-center align-items-center">
        <img className="img-fluid" src="/assets/images/logo_citra_solusi.png" style={{maxWidth: '100px'}} />
        <div className="w-full flex flex-center">
            <p className="text-center text-xs">Copyright &copy;2023 Smart Asik<br/>PT. Citra Solusi Komputindo<br/>v1.0.0</p>
        </div>
    </footer>
  )
}

export default Footer
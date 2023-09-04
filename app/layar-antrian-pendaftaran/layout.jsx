import Footer from '@app/components/Footer'
import Header from '@app/components/Header'

const layout = ({ children }) => {
    return (
        <>
            <Header />
            <div className='content flex-grow-1'>
                {children}
            </div>
            <div className='col-12 position-fixed bottom-0'>
                <div id='scroll-container' className='px-5'>
                    <div id='scroll-text'>
                        SELAMAT DATANG DI KLINIK PRATAMA EDELWEIS
                    </div>
                </div>
            </div>
        </>
    )
}

export default layout
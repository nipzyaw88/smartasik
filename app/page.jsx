'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession, getSession, signIn, signOut, getCsrfToken } from 'next-auth/react'
import LoginForm from './components/LoginForm'
import Footer from "./components/Footer"
import Header from "./components/Header"

const page = () => {
    const router = useRouter();
    // const { data: session } = useSession();

    const [submitting, setIsSubmitting] = useState(false);
    const [login, setLogin] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);
    const session = async () => { await getSession() }
    console.log(session);
    const userLogin = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const res = await signIn('credentials', {
            redirect: false,
            email: login.username,
            password: login.password,
            callbackUrl: `${window.location.origin}`,
        });
        if (res?.error) {
            setError(res.error);
        } else {
            setError(null);
        }
        // console.log(session);
        if (res.url) router.push('/halaman/dashboard');
        // setIsSubmitting(false);
        // setIsSubmitting(true);

        // try {
        // } catch (error) {
        //     console.log(error);
        // } finally {
        //     setIsSubmitting(false);
        // }
    }

    const setCsrfToken = async (context) => {
        await getCsrfToken(context);
    }

    async function getToken() {
        const csrfToken = await getCsrfToken()
        console.log(csrfToken);
        return csrfToken
    }

    // if(session) {
    //     return <>
    //         Signed in as {session.user} <br/>
    //         <button onClick={() => signOut()}>Sign out</button>
    //     </>
    // }
    return (
        <>
            <Header />
            <section className='container-fluid'>
                <div className='row'>
                    <div className='col d-flex justify-content-center align-items-center'>
                        <img className='img-fluid' src='/assets/images/bg.png' />
                    </div>
                    <div className='col d-flex flex-column justify-content-center align-items-center'>
                        <div>
                            {error}
                        </div>
                        <div>
                            {error}
                        </div>
                        <div className='radius-full mb-5'>

                        </div>
                        <h1>SISTEM INFORMASI</h1>
                        <h1>Klinik Pratama Edelweis</h1>
                        <LoginForm
                            type='Masuk'
                            login={login}
                            setLogin={setLogin}
                            submitting={submitting}
                            handleSubmit={userLogin}
                        />
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default page
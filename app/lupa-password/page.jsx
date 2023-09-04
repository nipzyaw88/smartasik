'use client'
import LupaPasswordForm from '@app/components/LupaPassword'
import { useState } from 'react'

const LupaPassword = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const [forgot, setForgot] = useState({ username: "", nopeg: "", tgl_lahir: '', password: "" });

  const lupaPassword = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/editPassword`, {
            method: "PUT",
            body: JSON.stringify({
                nama_pengguna : forgot.username,
                katakunci : forgot.password,
            }),
            headers: {
                'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                'Content-Type' : 'application/json'
            }
        });

        if (response.ok) {
            router.push("/pages/dashboard");
        }
    } catch (error) {
        console.log(error);
    } finally {
        setIsSubmitting(false);
    }
  };
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='col-4'>
        <div className='card'>
          <h2 className='card-title text-center'>Lupa Password</h2>
          <div className='card-body'>
            <LupaPasswordForm
              type='Lupa Password'
              forgot={forgot}
              setForgot={setForgot}
              submitting={submitting}
              handleSubmit={lupaPassword}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LupaPassword
import Link from "next/link";
import { useState } from "react";

const LoginForm = ({ type, login, setLogin, submitting, handleSubmit }) => {
  const [visible, setVisible] = useState(false);
  return (
    <section className='col-md-5'>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className='mt-5'
      >
        <div className="mb-3">
            {/* <label className="form-label">Nama Akun</label> */}
            <input
                value={login.username}
                onChange={(e) => setLogin({ ...login, username: e.target.value })}
                type='text'
                placeholder='Nama pengguna...'
                required
                className='form-control'
            />
        </div>
        <div className="input-group mb-3">
            {/* <label className="form-label">Kata Kunci</label> */}
            <input
                value={login.password}
                onChange={(e) => setLogin({ ...login, password: e.target.value })}
                type={visible ? 'text' : 'password'}
                placeholder='Kata kunci...'
                required
                className='form-control'
            />
            <span className="input-group-text" id="basic-addon2" onClick={() => setVisible(!visible)}><i className="bi bi-eye"></i></span>
        </div>

        <div className='row'>
            <div className="col d-flex justify-content-start align-items-center">
                <Link className="" href='/lupa-password'>Lupa password?</Link>
            </div>
            <div className="col d-flex justify-content-end align-items-center">
                <button
                    type='submit'
                    disabled={submitting}
                    className='btn btn-primary'
                >
                    {submitting ? 'Harap tunggu..' : type}
                </button>
            </div>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
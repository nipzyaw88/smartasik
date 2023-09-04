import Link from "next/link";

const LupaPasswordForm = ({ type, forgot, setForgot, submitting, handleSubmit }) => {
  return (
    <section className=''>
      <form
        onSubmit={handleSubmit}
        className='mt-5'
      >
        <div className="mb-3">
            <label className="form-label">Username</label>
            <input
                value={forgot.username}
                onChange={(e) => setForgot({ ...forgot, username: e.target.value })}
                type='text'
                placeholder='Username...'
                required
                className='form-control'
            />
        </div>
        <div className="mb-3">
            <label className="form-label">No. Induk Kepegawaian</label>
            <input
                value={forgot.nopeg}
                onChange={(e) => setForgot({ ...forgot, nopeg: e.target.value })}
                type='text'
                placeholder='No. Induk Kepegawaian...'
                className='form-control'
            />
        </div>
        <div className="mb-3">
            <label className="form-label">Tgl. Lahir</label>
            <input
                value={forgot.tgl_lahir}
                onChange={(e) => setForgot({ ...forgot, tgl_lahir: e.target.value })}
                type='text'
                placeholder='dd/mm/yyyy'
                className='form-control'
            />
        </div>
        <div className="mb-3">
            <label className="form-label">Password Baru</label>
            <input
                value={forgot.password}
                onChange={(e) => setForgot({ ...forgot, password: e.target.value })}
                type='text'
                placeholder='Password baru...'
                className='form-control'
            />
        </div>

        <div className='row'>
            <div className="col d-flex justify-content-center align-items-center">
                <button
                    type='submit'
                    disabled={submitting}
                    className='btn btn-primary btn-block'
                >
                    {submitting ? 'Harap tunggu..' : type}
                </button>
            </div>
        </div>
      </form>
    </section>
  );
};

export default LupaPasswordForm;
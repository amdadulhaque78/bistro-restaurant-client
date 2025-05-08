import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {

    const [disabled, setDisabled] = useState(true);
    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    console.log('state in the location login page', location.state)

    useEffect(()=>{
        loadCaptchaEnginge(6);
    },[])

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            Swal.fire({
                title: "User Login Successful",
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
              });
              navigate(from, { replace: true });
        })
    }

    const handleValidateCaptcha = (e) => {
        const user_Captcha_Value = e.target.value;
        // console.log(userCaptchaValue);
        if(validateCaptcha(user_Captcha_Value)){
            setDisabled(false)
        }
        else{
            setDisabled
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <title>Bistro Boss | Login</title>
            <div className="hero-content flex md:flex">
                <div className="text-center md:w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 md:w-1/2 max-w-sm shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" name="email" className="input" placeholder="Email" />
                            <label className="label">Password</label>
                            <input type="password" name="password" className="input" placeholder="Password" />
                            <label className="label">
                            <LoadCanvasTemplate />
                            </label>
                            <input onBlur={handleValidateCaptcha} type="text" name="captcha" className="input" placeholder="type the captcha above" />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            {/* todo apply disable for recaptcha */}
                            <input disabled={false} className="btn btn-neutral mt-4" type="submit" value="Login" />
                        </fieldset>
                    </form>
                    <p><small>New Here? <Link to="/signup">SignUp</Link></small></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
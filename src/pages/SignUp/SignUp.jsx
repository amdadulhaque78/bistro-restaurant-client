import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



const SignUp = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {createUser, updateUserProfile} = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {

        console.log(data);
        createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            updateUserProfile(data.name, data.photoUrl)
            .then(()=>{
                console.log('user profile info updated')
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your profile info updated",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/');
            })
            .catch(error=>console.log(error))
        })
    };


    return (
        <div className="hero bg-base-200 min-h-screen">
            <title>Bistro Boss | SignUp</title>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">SignUp!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <fieldset className="fieldset">

                            <label className="label">Name</label>
                            <input type="text" {...register("name", { required: true })} name="name" className="input" placeholder="Your Name" /> {errors.name && <span className="text-red-600">Name is required</span>}

                            <label className="label">Photo Url</label>
                            <input type="text" {...register("photoUrl", { required: true })} className="input" placeholder="Photo Url" /> {errors.photoUrl && <span className="text-red-600">photoUrl is required</span>}

                            <label className="label">Email</label>
                            <input type="email" {...register("email", { required: true })} name="email" className="input" placeholder="Email" /> {errors.email && <span className="text-red-600">Email is required</span>}

                            <label className="label">Password</label>
                            <input type="password" {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z]).{6}/
                            })} name="password" className="input" placeholder="Password" />

                            {errors.password?.type === 'required' && <p className="text-red-600">password is required</p>}

                            {errors.password?.type === 'minLength' && <p className="text-red-600">six character is required</p>}

                            {errors.password?.type === 'maxLength' && <p className="text-red-600">twenty character is required</p>}

                            {errors.password?.type === 'pattern' && <p className="text-red-600">must have one uppercase one lower case one number and one special number</p>}

                            <div><a className="link link-hover">Forgot password?</a></div>
                            <input className="btn btn-neutral mt-4" type="submit" value="SignUp" />
                        </fieldset>
                    </form>
                    <p><small>Already have an account? <Link to="/login">Login</Link> </small></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
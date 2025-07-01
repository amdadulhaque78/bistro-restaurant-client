import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {

    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async data => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data)
            if (menuRes.data.insertedId) {
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data)
    };

    return (
        <div>
            <SectionTitle heading="add an item" subHeading="whats new"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <fieldset className="fieldset">

                        <legend className="fieldset-legend">Recipe Name</legend>

                        <input type="text" {...register('name', { required: true })} className="input w-full" placeholder="Recipe Name" />


                    </fieldset>

                    <div className="flex gap-6 my-6">

                        {/* category */}
                        <fieldset className="fieldset w-full">

                            <legend className="fieldset-legend">Category</legend>

                            <select {...register('category', { required: true })} defaultValue="Pick One" className="select w-full">
                                <option disabled={true}>Select a Category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>


                        </fieldset>

                        {/* price */}

                        <fieldset className="fieldset w-full">

                            <legend className="fieldset-legend">Price</legend>

                            <input type="number" {...register('price', { required: true })} className="input w-full" placeholder="Price" />


                        </fieldset>



                    </div>

                    {/* recipe details */}

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Your bio</legend>
                        <textarea {...register('recipe', { required: true })} className="textarea h-24 w-full" placeholder="Bio"></textarea>
                        <div className="label">Optional</div>
                    </fieldset>



                    <input {...register('image', { required: true })} type="file" className="file-input w-full my-6" />


                    <button className="btn">Add Item <FaUtensils className="ml-4"></FaUtensils></button>



                </form>
            </div>
        </div>
    );
};

export default AddItems;
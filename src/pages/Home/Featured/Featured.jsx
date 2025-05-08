import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg"
import './Featured.css'

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-10 my-20">
            <SectionTitle
             subHeading="check it out"
             heading="Featured item"
            ></SectionTitle>
            <div className="md:flex justify-center items-center bg-slate-500 bg-opacity-40 pb-20 pt-12 px-36">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Aug 20, 2019</p>
                    <p className="uppercase">where can i get some ?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At quisquam sit tempore iure, libero dignissimos tenetur culpa nisi nesciunt quae porro exercitationem beatae sunt fugiat cumque quas ex maxime quibusdam perferendis sed, voluptates reprehenderit aliquid unde. Error provident ab mollitia officiis omnis dolore asperiores? Temporibus optio dolorum pariatur debitis explicabo.</p>
                    <button className="btn btn-outline border-0 border-b-2 mt-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;
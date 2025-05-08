import Cover from "../../Shared/Cover/Cover";
import menuImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import PopularMenu from "../../Home/PopularMenu/PopularMenu";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category ==='dessert')
    const soup = menu.filter(item => item.category ==='soup')
    const salad = menu.filter(item => item.category ==='salad')
    const pizza = menu.filter(item => item.category ==='pizza')
    const offered = menu.filter(item => item.category ==='offered')
    return (
        <div>
            <title>Bistro Boss | Menu</title>
            <Cover img={menuImg} title="our menu"></Cover>
            {/* main cover */}
            <SectionTitle subHeading="Dont Miss" heading="Todays Offer"></SectionTitle>

            {/* offered menu items */}
            <MenuCategory items={offered}></MenuCategory>

            {/* dessert menu items */}
            <MenuCategory
            items={dessert}
            title="dessert"
            img={dessertImg}
            ></MenuCategory>

            {/* pizza items */}
            <MenuCategory
            items={pizza}
            title="pizza"
            img={pizzaImg}
            ></MenuCategory>

            {/* salad */}
            <MenuCategory
            items={salad}
            title="salad"
            img={saladImg}
            ></MenuCategory>

            {/* soup */}
            <MenuCategory
            items={soup}
            title="soup"
            img={soupImg}
            ></MenuCategory>
        </div>
    );
};

export default Menu;
import Menus from "@/controllers/menus";
import Back_button from "@/components/back_button";

const Consumer_menu = ({menu = {}} ) => {
    const name = menu.name
    const categories = menu.categories ? menu.categories : []
    const products = menu.products ? menu.products : []

    return (
        <div>
            <Back_button/>

            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="text-center text-3xl text-white">
                    <a> {name} </a>
                </div>

                <hr/>

                <ul className="p-4">
                    {categories.map((category) => {
                        const category_name = category.name
                        const category_description = category.description
                        const category_products = Menus.getProductsForCategory(products, category_name)

                        return (
                            <li
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 p-1 rounded-xl"
                                key={category_name}
                            >
                                <div className="text-white flex justify-between items-center">
                                    <a className="p-1 text-left text-2xl">{category_name}</a> <a
                                    className="text-right p-1">{category_description}</a>
                                </div>

                                <div>
                                    <table
                                        className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 w-full max-w-screen-xl mx-auto p-4 md:py-8">
                                        <thead
                                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Name</th>
                                            <th scope="col" className="px-6 py-3">Price</th>
                                            <th scope="col" className="px-6 py-3">Description</th>
                                            <th scope="col" className="px-6 py-3">Addons</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {category_products.map((product) => {
                                            const product_name = product.name
                                            const product_price = product.price
                                            const product_description = product.description
                                            const product_addons_string = Menus.getAddonsInAString(product.addons)

                                            return (
                                                <tr
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                                                    key={`${product_name} + ${product_price}`}
                                                >
                                                    <td className="px-6 py-4">{product_name}</td>
                                                    <td className="px-6 py-4">{`$${product_price}`}</td>
                                                    <td className="px-6 py-4">{product_description}</td>
                                                    <td className="px-6 py-4">{product_addons_string}</td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Consumer_menu;
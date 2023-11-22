import PageLayout from "../../components/layout.tsx";
import {ChannelType} from "../../types/channel.types.ts";
import useProducts from "../../hooks/useProducts.ts";
import Loading from "../../components/loading.tsx";
import {IProduct} from "../../types/products.types.ts";
import {IoSearchOutline } from "react-icons/io5";
import {getCategories, getProductsWithCategory} from "../../helpers/categories.ts";
import {FaMinus, FaPlus} from "react-icons/fa";

const channelDict = {
	"HAIR_CARE": "FRISØR",
	"COSMETIC": "KOSMETIKER"
}

function SearchBar({products}:{products:IProduct[]}) {
	return (
		<div className="flex items-center">
			<input type="text" placeholder="SØG EFTER PRODUKT" className="p-4 outline-none w-80 placeholder:text-next-blue placeholder:font-semibold"/>
			<div className="bg-white p-4">
				<IoSearchOutline className="text-next-blue w-full text-2xl"/>
			</div>
		</div>
	);
}

function NavCategory({category}:{category:string}) {
	return (
		<a
			href={`#${category}`}
			className="font-semibold text-next-darker-orange cursor-pointer border p-2 border-next-darker-orange hover:bg-next-darker-orange hover:text-next-blue w-full"
		>
			{category}
		</a>
	);
}

function CategoriesNav({products}:{products:IProduct[]}) {
	const categories = getCategories(products);
	return (
		<div className="flex flex-col gap-4 items-start">
			{categories.map((category) => (<NavCategory category={category}/>))}
		</div>
	);
}

function SearchAndFilter({products}:{products:IProduct[]}) {
	return (
		<div className="flex flex-col items-center fixed bg-next-blue h-screen right-20 top-20 p-2 gap-8">
			<SearchBar products={products}/>
			<CategoriesNav products={products}/>
		</div>
	);
}

interface IHeaderProps {
	channel: ChannelType;
	products: IProduct[];
}
function Header({channel, products}:IHeaderProps) {

	return (
		<div className="fixed left-20 right-20 top-20 z-20">
			<div className="bg-next-blue flex items-center justify-between gap-8 p-5 h-[79px]">
				<h2 className="text-next-orange text-3xl font-bold">{channelDict[channel]} PRODUKTER</h2>
			</div>
			<SearchAndFilter products={products}/>
		</div>
	);
}

function Product({product}:{product:IProduct}) {
	return(
		<div className="p-4 w-[calc(100%-1px)] bg-next-white flex flex-col gap-4">
			<div className="flex justify-between">
				<div className="flex flex-col text-lg font-semibold">
					<h3 className="text-2xl font-bold">{product.name}</h3>
					<p>LAGER: {product.stock} stk.</p>
					<p>Pris: {product.price},-</p>
				</div>
				<div className="flex flex-col gap-2">
					<button className="border border-next-blue p-2 text-next-blue text-xl font-semibold hover:bg-next-blue hover:text-next-darker-orange transition-colors">
						<FaPlus className="text-xl inline-block"/> Tilføj til salg
					</button>
					<button className="border border-next-blue p-2 text-next-blue text-xl font-semibold hover:bg-next-blue hover:text-next-darker-orange transition-colors">
						<FaMinus className="text-xl inline-block"/> Fjern fra salg
					</button>
				</div>
			</div>
		</div>
	);
}

function Category({category, products}:{category:string, products:IProduct[]}) {
	return(
		<div id={category} className="scroll-mt-40">
			<h2 className="text-2xl p-4 font-bold bg-next-blue mb-[1px] w-full text-next-darker-orange text-center">{category}</h2>
			<div className="flex flex-wrap w-full gap-[1px]">
				{products.map((product:IProduct) => (<Product product={product}/>))}
			</div>
		</div>
	);
}

function Products({channel}:{channel:ChannelType}) {
	const {products, isLoading} = useProducts(channel);
	if(isLoading) return (<Loading.LoadingPage/>);
	if(!products || products.length === 0) return (<PageLayout>No products found...</PageLayout>);
	const categories = getCategories(products);

	return (
        <PageLayout>
			<Header channel={channel} products={products}/>
			<div className="mt-40 flex w-full">
				<div className="flex flex-col gap-[1px]">
					{categories.map((category) => (
						<Category
							category={category}
							products={getProductsWithCategory(products, category)}
						/>
						))}
				</div>
				<div className="w-[392px] flex-shrink-0"></div>
			</div>
        </PageLayout>
    );
}

export default Products
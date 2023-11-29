import type {PropsWithChildren} from "react";
import StyledToaster from "./Toaster.tsx";

function Footer() {
	return (
		<footer className="fixed bottom-0 left-0 right-0 h-[calc(60vh-80px)] text-next-grey flex justify-evenly mr-20 ml-20 p-4 gap-8 bg-next-white" >
			<div className="w-80">
				<h3 className="text-xl text-next-blue font-bold">VEMC</h3>
				<p className="text-next-grey">Vi er en gruppe af 4 studerende fra Københavns Erhvervsakademi, der har lavet denne hjemmeside som en del af vores førsteårs projekt.</p>
			</div>
			<div>
				<h3 className="text-xl text-next-blue font-bold">KONTAKT</h3>
				<p className="text-next-blue">Viktor</p>
				<a href="mailto:example@example.com" className="cursor-pointer">example@example.com</a>
				<p className="text-next-blue">Emil</p>
				<a href="mailto:emilvnielsen@hotmail.com">emilvnielsen@hotmail.com</a>
				<p className="text-next-blue">Martin</p>
				<a href="mailto:example@example.com">example@example.com</a>
				<p className="text-next-blue">Christian</p>
				<a href="mailto:example@example.com">example@example.com</a>
			</div>
		</footer>
	);
}

function PageLayout({ children }:PropsWithChildren) {
	return (<>
			<main className="mt-20 mx-20 w-auto z-10 relative">
				{children}
			</main>
			<div className="h-[calc(60vh-80px)] bg-next-white"></div>
			<Footer/>
			<StyledToaster/>
	</>
	);
}

export default PageLayout;
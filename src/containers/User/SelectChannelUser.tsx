import type {Dispatch, SetStateAction} from "react";
import type {ChannelType} from "../../types/channel.types.ts";
import PageLayout from "../../components/layout.tsx";
import {Link} from "react-router-dom";

interface SelectChannelProps {
	setChannel: Dispatch<SetStateAction<ChannelType>>

}
function SelectChannelUser({setChannel}: SelectChannelProps) {
	return (
		<PageLayout>
			<div className="flex justify-center items-center bg-[url('/images/Admin.png')] w-full min-h-screen bg-cover bg-center">
				<Link to={"user/products"} onClick={()=> setChannel("COSMETIC")}>
					Kosmetiker
				</Link>
				<Link to={"/user/products"}>
					Frisør
				</Link>
			</div>
		</PageLayout>
	);
}

export default SelectChannelUser;
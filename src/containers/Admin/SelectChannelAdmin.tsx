import type {Dispatch, SetStateAction} from "react";
import type {ChannelType} from "../../types/channel.types.ts";
import PageLayout from "../../components/layout.tsx";
import {Link} from "react-router-dom";

interface SelectChannelProps {
	setChannel: Dispatch<SetStateAction<ChannelType|null>>

}
function SelectChannelAdmin({setChannel}: SelectChannelProps) {
	return (
		<PageLayout>
			<div className="flex items-center bg-[url('/images/Admin.png')] w-full min-h-screen bg-cover bg-center justify-between">
				<Link
					to={"admin/dashboard"}
					onClick={()=> setChannel("COSMETIC")}
					className="hover:bg-opacity-0 hover:backdrop-blur-0 transition-colors text-2xl lg:text-5xl w-full flex justify-center items-center bg-next-blue min-h-screen bg-opacity-50 backdrop-blur-sm"
				>
					<div className="p-4 bg-next-blue rounded text-next-darker-orange font-bold">
						KOSMETIKERE
					</div>
				</Link>
				<Link
					to={"/admin/dashboard"}
					onClick={() => setChannel("HAIR_CARE")}
					className="hover:bg-opacity-0 hover:backdrop-blur-0 transition-colors text-2xl lg:text-5xl w-full flex justify-center items-center bg-next-blue min-h-screen bg-opacity-50 backdrop-blur-sm"
				>
					<div className="p-4 bg-next-blue rounded text-next-darker-orange font-bold">
						FRISØRER
					</div>
				</Link>
			</div>
		</PageLayout>
	);
}

export default SelectChannelAdmin;
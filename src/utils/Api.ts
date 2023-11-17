import {ChannelType} from "../types/channel.types.ts";

abstract class Api<DataType,NewDataType>{
	protected abstract url: string;
	public readonly endpoint = "http://localhost:3333";
	abstract getByChannel(channel: ChannelType): Promise<DataType[]>;
	abstract getById(id: string): Promise<DataType>;
	abstract create(data: NewDataType): Promise<DataType>;
	abstract deleteById(id: string): Promise<DataType>;
}
export default Api;
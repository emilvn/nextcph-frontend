abstract class Api<DataType, NewDataType> {
    protected abstract url: string;
    public readonly endpoint =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:3333";

    abstract create(data: NewDataType): Promise<DataType>;

    abstract deleteById(id: string): Promise<DataType>;
}

export default Api;

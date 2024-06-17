function handleChangeModelProp<M = { [key: string]: any }>(
    prop: keyof M,
    updateModel: (updates: Partial<M>) => void,
    isCheckbox?: boolean
) {
    return (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = evt.target[
            isCheckbox ? "checked" : "value"
        ] as M[keyof M];

        updateModel({
            [prop]: value,
        } as Partial<M>);
    };
}

export default handleChangeModelProp;
export { handleChangeModelProp };

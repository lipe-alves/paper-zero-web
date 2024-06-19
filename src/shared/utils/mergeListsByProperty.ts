function mergeListsByProperty<T = any>(prop: keyof T, list1: T[], list2: T[]) {
    const map = new Map();

    for (const item of list1) {
        map.set(item[prop], item);
    }

    for (const item of list2) {
        map.set(item[prop], item);
    }

    return Array.from(map.values()).sort((a, b) =>
        a[prop].localeCompare(b[prop])
    );
}

export default mergeListsByProperty;
export { mergeListsByProperty };

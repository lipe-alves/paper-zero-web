function classNames(...classList: string[]): string {
    return classList.filter(Boolean).join(" ");
}

export { classNames };
export default classNames;

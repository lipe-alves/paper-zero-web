function generateId(): `${number}-${number}` {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${timestamp}-${randomNumber}`;
}

export default generateId;
export { generateId };

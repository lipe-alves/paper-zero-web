import { useState } from "react";

function useForceUpdate() {
    const [, setValue] = useState(0);
    return () => setValue((value) => value + 1);
}

export default useForceUpdate;
export { useForceUpdate };

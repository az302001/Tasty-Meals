import { useEffect, useState } from 'react';

export const SafeHydrate = ({ children }) => {
    const [hydrate, SetHydrate] = useState(null);

    useEffect(() => {
        SetHydrate(children);
    }, [children]);

    return <div suppressHydrationWarning>{hydrate}</div>;
};
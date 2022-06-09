import { Variants } from 'framer-motion';

export const variantsModel: {
    model: Variants,
    inner: Variants
} = {
    model: {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
        },
    },
    inner: {
        hidden: {
            y: '-100vh',
        },
        visible: {
            y: 0,
        },
        exit: {
            y: '100vh',
        },
    },
};

export const variantDashboard = {
    initial: { opacity: 0 },
    animate: (index: number) => ({
        opacity: 1,
        transition: { delay: index * .05, type: 'spring' },
    }),
};
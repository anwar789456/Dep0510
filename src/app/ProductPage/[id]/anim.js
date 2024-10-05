export const scaleVariants = {
    initial: {
        scale: 0,
        opacity: 0,
    },
    enter: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: [1, 0.29, 0, 0.02],
        },
    },
    exit: {
        scale: 0,
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: [.72, .34, 0, 1.58],
        },
    },
};
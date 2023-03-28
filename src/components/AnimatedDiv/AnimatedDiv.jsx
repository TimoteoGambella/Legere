import { motion } from 'framer-motion';

const animations = {
    initial: { x: "-100%", opacity: 0},
    animate: { x: 0, opacity: 1},
    exit: { x: "100%", opacity: 0},
};

export const AnimatedDiv = ({ children }) => {
    return (
        <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.15 }}
        >
            {children}
        </motion.div>
    );
};

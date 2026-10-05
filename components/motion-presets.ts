export const easeOut = [0.22, 1, 0.36, 1] as const;

export const easeInOut = [0.76, 0, 0.24, 1] as const;

export const spring = {
  type: "spring" as const,
  stiffness: 340,
  damping: 24,
  mass: 0.75,
};

export const softSpring = {
  type: "spring" as const,
  stiffness: 160,
  damping: 20,
  mass: 0.9,
};

export const cardHover = { y: -6 };

export const cardTap = { scale: 0.985 };

export const inView = { once: true, amount: 0.3 } as const;

export const riseIn = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

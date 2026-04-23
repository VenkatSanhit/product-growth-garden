import type { ReactNode } from "react";
import { motion } from "framer-motion";

const headingVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

type Props = {
  level: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
};

export function LandingAnimatedHeading({ level, children, className, delay = 0, id }: Props) {
  const common = {
    id,
    className,
    variants: headingVariants,
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.28 },
    transition: { delay },
  };

  if (level === 1) return <motion.h1 {...common}>{children}</motion.h1>;
  if (level === 2) return <motion.h2 {...common}>{children}</motion.h2>;
  return <motion.h3 {...common}>{children}</motion.h3>;
}

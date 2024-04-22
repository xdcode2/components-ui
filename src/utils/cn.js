import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string.
 * @param {...string|string[]} inputs - Class names to be combined.
 * @returns {string} - Combined class names string.
 */

export const cn = (...inputs) => {
    return twMerge(clsx(inputs));
};

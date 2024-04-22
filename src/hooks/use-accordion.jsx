import React from "react";
import { isArray, isFunction, isString } from "../utils";

/**
 * Custom hook for managing accordion state.
 * @param {Object} options - The value of the item to expand when initially rendered.
 * @param {string | string[]} [options.defaultValue] - The value of the item to expand when initially rendered.
 * @param {boolean} [options.multiple = false] - Whether multiple accordion items can be open together.
 * @param {Function} [options.onToggle] - Callback function invoked when an accordion item is toggled.
 * @param {Function} [options.onCollapse] - Callback function invoked when an accordion item is collapsed.
 * @param {Function} [options.onExpand] - Callback function invoked when an accordion item is expanded.
 * @returns {Object} An object containing functions to manage accordion state.
 */

export const useAccordion = ({ defaultValue, multiple = false, onToggle, onCollapse, onExpand }) => {
    const [openIndexes, setOpenIndexes] = React.useState(() => {
        if (isArray(defaultValue) && defaultValue.length > 0) {
            return multiple ? defaultValue : [defaultValue[0]];
        } else if (isString(defaultValue)) {
            return [defaultValue];
        } else {
            return [];
        }
    });

    const handleToggle = (value) => {
        let indexes = [];
        if (multiple) {
            // If accordion is already open, close it
            if (openIndexes.includes(value)) {
                indexes = openIndexes.filter((i) => i !== value);
                setOpenIndexes(indexes);
                if (isFunction(onCollapse)) onCollapse(value);
                if (isFunction(onToggle)) onToggle(value);
            } else {
                // If accordion is closed, open it
                indexes = [...openIndexes, value];
                setOpenIndexes(indexes);
                if (isFunction(onExpand)) onExpand(value);
                if (isFunction(onToggle)) onToggle(value);
            }
        } else {
            // If accordion is already open, close it
            if (openIndexes.includes(value)) {
                indexes = [];
                if (isFunction(onCollapse)) onCollapse(value);
            } else {
                // If accordion is closed, open it
                indexes = [value];
                if (isFunction(onExpand)) onExpand(value);
            }

            setOpenIndexes(indexes);
            if (isFunction(onToggle)) onToggle(value);
        }
    };

    // Function to check if a specific value is open
    const isOpen = (value) => {
        return multiple ? openIndexes.includes(value) : openIndexes[0] === value;
    };

    return {
        isOpen,
        handleToggle,
    };
};

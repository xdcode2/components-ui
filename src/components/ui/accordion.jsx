import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils";
import { useAccordion } from "../../hooks";
import PropTypes from "prop-types";

const AccordionContext = React.createContext();

/* ================ Accordion ================ */

export const Accordion = React.forwardRef((props, ref) => {
    const { children, className, defaultValue, multiple, onToggle, onCollapse, onExpand, ...rest } = props;

    const { isOpen, handleToggle } = useAccordion({ defaultValue: defaultValue, multiple: multiple, onToggle: onToggle, onCollapse: onCollapse, onExpand: onExpand });

    return (
        <AccordionContext.Provider value={{ isOpen, handleToggle }}>
            <div
                ref={ref}
                className={cn("flex flex-col gap-2 w-full", className)}
                {...rest}
            >
                {children}
            </div>
        </AccordionContext.Provider>
    );
});

Accordion.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    multiple: PropTypes.bool,
    onToggle: PropTypes.func,
    onCollapse: PropTypes.func,
    onExpand: PropTypes.func,
};

Accordion.displayName = "Accordion";

/* ================ AccordionItem ================ */

const AccordionItemContext = React.createContext({});

export const AccordionItem = React.forwardRef((props, ref) => {
    const { children, value, className, ...rest } = props;
    const { isOpen } = React.useContext(AccordionContext);

    return (
        <AccordionItemContext.Provider value={{ value }}>
            <div
                ref={ref}
                data-id={value}
                data-state={isOpen(value) ? "open" : "closed"}
                className={cn("flex flex-col w-full h-full bg-transparent outline-0 border border-solid border-gray-20 rounded-md text-gray-90 text-base font-normal", className)}
                {...rest}
            >
                {children}
            </div>
        </AccordionItemContext.Provider>
    );
});

AccordionItem.propTypes = {
    children: PropTypes.node,
    value: PropTypes.string.isRequired,
    className: PropTypes.string,
};

AccordionItem.displayName = "AccordionItem";

/* ================ AccordionHeader ================ */

export const AccordionHeader = React.forwardRef((props, ref) => {
    const { children, className, ...rest } = props;
    const { isOpen } = React.useContext(AccordionContext);
    const { value } = React.useContext(AccordionItemContext);

    return (
        <div
            ref={ref}
            data-state={isOpen(value) ? "open" : "closed"}
            className={cn("flex flex-row items-center justify-between h-12 font-medium", className)}
            {...rest}
        >
            {children}
        </div>
    );
});

AccordionHeader.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

AccordionHeader.displayName = "AccordionHeader";

/* ================ AccordionTrigger ================ */

export const AccordionTrigger = React.forwardRef((props, ref) => {
    const { children, className, asChild, ...rest } = props;
    const { handleToggle } = React.useContext(AccordionContext);
    const { isOpen } = React.useContext(AccordionContext);
    const { value } = React.useContext(AccordionItemContext);

    return asChild ? (
        React.Children.map(children, (child) => {
            if (child.type) {
                return React.cloneElement(child, {
                    className: cn("cursor-pointer", child.props.className),
                    onClick: () => handleToggle(value),
                    "data-state": isOpen(value) ? "open" : "closed",
                    ...rest,
                });
            }
            return child;
        })
    ) : (
        <button
            ref={ref}
            type="button"
            data-state={isOpen(value) ? "open" : "closed"}
            className={cn("flex items-center justify-between flex-shrink-0 w-full h-full rounded p-2 cursor-pointer", className)}
            onClick={() => handleToggle(value)}
            {...rest}
        >
            {children}
        </button>
    );
});

AccordionTrigger.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    asChild: PropTypes.bool,
};

AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef((props, ref) => {
    const { children, className, ...rest } = props;
    const { isOpen } = React.useContext(AccordionContext);
    const { value } = React.useContext(AccordionItemContext);

    return (
        <AnimatePresence initial={false}>
            {isOpen(value) && (
                <motion.div
                    ref={ref}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    data-state={isOpen(value) ? "open" : "closed"}
                    className={cn("accordion-content overflow-hidden", className)}
                    {...rest}
                >
                    {isOpen(value) && <div className="p-2">{children}</div>}
                </motion.div>
            )}
        </AnimatePresence>
    );
});

AccordionContent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

AccordionContent.displayName = "AccordionContent";

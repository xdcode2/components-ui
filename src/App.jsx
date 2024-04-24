import { Accordion, AccordionContent, AccordionHeader, AccordionItem, AccordionTrigger } from "./components";
import { ChevronDown } from "lucide-react";

const App = () => {
    return (
        <div className="flex items-center justify-center min-h-screen h-full">
            <div className="max-w-[500px] w-full">
                <Accordion defaultValue="item-01">
                    <AccordionItem value="item-01">
                        <AccordionHeader>
                            <AccordionTrigger className="group">
                                Accordion One <ChevronDown className="group-[[data-state='open']]:rotate-180 transition-transform" />
                            </AccordionTrigger>
                        </AccordionHeader>
                        <AccordionContent>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores reiciendis porro nobis adipisci aliquam deleniti culpa ex soluta doloremque ut!
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-02">
                        <AccordionHeader>
                            <AccordionTrigger className="group">
                                Accordion Two <ChevronDown className="group-[[data-state='open']]:rotate-180 transition-transform" />
                            </AccordionTrigger>
                        </AccordionHeader>
                        <AccordionContent>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores reiciendis porro nobis adipisci aliquam deleniti culpa ex soluta doloremque ut!
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-03">
                        <AccordionHeader>
                            <AccordionTrigger className="group">
                                Accordion Three <ChevronDown className="group-[[data-state='open']]:rotate-180 transition-transform" />
                            </AccordionTrigger>
                        </AccordionHeader>
                        <AccordionContent>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores reiciendis porro nobis adipisci aliquam deleniti culpa ex soluta doloremque ut!
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};

export default App;

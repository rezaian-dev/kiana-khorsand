"use client";

import { createContext, useContext } from "react";

export const AccordionState = createContext<readonly string[]>([]);
export const AccordionItemState = createContext(false);
export function useAccordionOpen() { return useContext(AccordionItemState); }

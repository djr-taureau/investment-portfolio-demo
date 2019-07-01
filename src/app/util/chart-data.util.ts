import { IconizedItem } from "@shared/iconized-searchable-combo/iconized-item";
import { Logger } from "./logger";

/**
 * Internal logger.
 */
const logger: Logger = Logger.getLogger("ChartUtil");

// TODO: GMAN: Move to core.domain in future story
export interface ChartUnit extends IconizedItem {
    // type: "QTR" | "YEAR";
    date: Date;
    quarter: number;
}
export function makeFinancialQuarters(month: number, fye: number) {
    const financialYearStart = fye - 11;

    // const q4 = {start: fye - 3, end: fye }
    // const q3 = {start: fye - 6, end: fye }
    // const q2 = {start: fye - 9, end: fye }
    // const q1 = {start: fye - 3, end: fye }
}
export function getFinancialQuarters(data: { date: Date }, fye: number): IconizedItem[] {
    const results: IconizedItem[] = [];
    const q4 = fye;
    // loop over the data and populate the id, text, and data

    //
    return results;
}

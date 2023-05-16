// export interface TemplateMapping {
//     Input?: TemplateCell;
//     Output?: TemplateCell;
// }

export interface TemplateIOMapping {
    I_CellRange?: string;
    I_CellValue?: string;
    O_CellRange?: string;
    O_CellFormula?: string;
}

export interface TemplateTableMapping {
    CellRange?: string;
    Columns?: string[];
}

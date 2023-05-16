import { Component } from '@angular/core';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcXlsx from '@grapecity/wijmo.xlsx';
import '@grapecity/wijmo.styles/wijmo.css';
import { BlueModal } from '@moodys/blue-ng';

@Component({
    selector: 'app-home-page-container',
    templateUrl: './home-page-container.component.html',
    styleUrls: ['./home-page-container.component.scss']
})
export class HomePageContainerComponent {
    workbook!: wjcXlsx.Workbook;
    sheetIndex!: number;
    sheets: wjcXlsx.WorkSheet[] = [];
    uploading = false;
    files!: File[];
    uploadedFile!: File;

    constructor() {}

    //
    tabClicked(e: MouseEvent, index: number) {
        e.preventDefault();
        this._drawSheet(index);
    }
    //
    private _loadWorkbook() {
        const reader = new FileReader();
        //
        reader.onload = (e) => {
            const workbook = new wjcXlsx.Workbook();
            workbook.loadAsync(<string>reader.result, (result: wjcXlsx.Workbook) => {
                this.workbook = result;
                this.sheets = this.workbook.sheets;
                this._drawSheet(this.workbook.activeWorksheet || 0);
            });
        };

        if (this.uploadedFile) {
            reader.readAsDataURL(this.uploadedFile);
        }
    }
    //
    private _drawSheet(sheetIndex: number) {
        const drawRoot = document.getElementById('tableHost');
        this.sheetIndex = sheetIndex;
        if (drawRoot) {
            drawRoot.textContent = '';
            this._drawWorksheet(this.workbook, sheetIndex, drawRoot, 200, 100);
        }
    }
    //
    private _drawWorksheet(
        workbook: wjcXlsx.IWorkbook,
        sheetIndex: number,
        rootElement: HTMLElement,
        maxRows: number,
        maxColumns: number
    ) {
        //NOTES:
        //Empty cells' values are numeric NaN, format is "General"
        //
        //Excessive empty properties:
        //fill.color = undefined
        //
        // netFormat should return '' for ''. What is 'General'?
        // font.color should start with '#'?
        // Column/row styles are applied to each cell style, this is convenient, but Column/row style info should be kept,
        // for column/row level styling
        // formats conversion is incorrect - dates and virtually everything; netFormat - return array of formats?
        // ?row heights - see hello.xlsx
        if (!workbook || !workbook.sheets || sheetIndex < 0 || workbook.sheets.length == 0) {
            return;
        }
        //
        sheetIndex = Math.min(sheetIndex, workbook.sheets.length - 1);
        //
        if (maxRows == null) {
            maxRows = 200;
        }
        //
        if (maxColumns == null) {
            maxColumns = 100;
        }
        //
        // Namespace and XlsxConverter shortcuts.
        const sheet = workbook.sheets[sheetIndex],
            defaultRowHeight = 20,
            defaultColumnWidth = 60,
            tableEl = document.createElement('table');
        //
        tableEl.border = '1';
        //tableEl.style.borderCollapse = 'collapse';
        //
        let maxRowCells = 0;
        for (let r = 0; sheet.rows && r < sheet.rows.length; r++) {
            if (sheet && sheet.rows[r] && sheet.rows[r].cells) {
                maxRowCells = Math.max(maxRowCells, sheet?.rows[r]?.cells?.length ?? 0);
            }
        }
        //
        // add columns
        const columns = sheet.columns || [],
            invisColCnt = columns.filter((col) => col.visible === false).length;
        //
        if (sheet.columns) {
            maxRowCells = Math.min(Math.max(maxRowCells, columns.length), maxColumns);
            //
            for (let c = 0; c < maxRowCells; c++) {
                const col = columns[c];
                //
                if (col && !col.visible) {
                    continue;
                }
                //
                const colEl = document.createElement('col');
                tableEl.appendChild(colEl);
                let colWidth = defaultColumnWidth + 'px';
                if (col) {
                    if (col.style) this._importStyle(colEl.style, col.style);
                    if (col.autoWidth) {
                        colWidth = '';
                    } else if (col.width != null) {
                        colWidth = col.width + 'px';
                    }
                }
                colEl.style.width = colWidth;
            }
        }
        //
        // generate rows
        const rowCount = Math.min(maxRows, sheet.rows ? sheet.rows.length : 0);
        for (let r = 0; sheet.rows && r < rowCount; r++) {
            const row = sheet.rows[r];
            let cellsCnt = 0; // including colspan
            //
            if (row && !row.visible) {
                continue;
            }
            //
            const rowEl = document.createElement('tr');
            tableEl.appendChild(rowEl);
            //
            if (row) {
                if (row.style) this._importStyle(rowEl.style, row.style);
                if (row.height != null) {
                    rowEl.style.height = row.height + 'px';
                }
                //
                for (let c = 0; row.cells && c < row.cells.length; c++) {
                    const cell = row.cells[c];
                    const cellEl = document.createElement('td');
                    cellEl.style.cursor = 'pointer';

                    // cellEl.addEventListener('click', (e) => {
                    //     const target = e.target as HTMLElement;
                    //     alert('Clicked ' + target.innerText);
                    // });

                    cellEl.addEventListener('mouseover', (e) => {
                        cellEl.style.borderWidth = '2px';
                        cellEl.style.borderColor = 'red';
                    });
                    cellEl.addEventListener('mouseleave', (e) => {
                        cellEl.style.borderWidth = '';
                        cellEl.style.borderColor = '';
                    });
                    const col = columns[c];
                    //
                    if (col && !col.visible) {
                        continue;
                    }
                    //
                    cellsCnt++;
                    //
                    rowEl.appendChild(cellEl);
                    if (cell) {
                        if (cell.style) this._importStyle(cellEl.style, cell.style);
                        let value = cell.value;
                        //
                        if (!(value == null || value !== value)) {
                            // TBD: check for NaN should be eliminated
                            if (wjcCore.isString(value) && value.charAt(0) == "'") {
                                value = value.substr(1);
                            }
                            let netFormat = '';
                            if (cell.style && cell.style.format) {
                                netFormat = wjcXlsx.Workbook.fromXlsxFormat(cell.style.format)[0];
                            }
                            const fmtValue = netFormat ? wjcCore.Globalize.format(value, netFormat) : value;
                            cellEl.innerHTML = wjcCore.escapeHtml(fmtValue);
                        }
                        //
                        if (cell.colSpan && cell.colSpan > 1) {
                            cellEl.colSpan = this._getVisColSpan(columns, c, cell.colSpan);
                            cellsCnt += cellEl.colSpan - 1;
                            c += cell.colSpan - 1;
                        }
                        //
                        if (cell.note) {
                            wjcCore.addClass(cellEl, 'cell-note');
                            cellEl.title = cell.note.text ? cell.note.text : '';
                        }
                    }
                }
            }
            //
            // pad with empty cells
            const padCellsCount = maxRowCells - cellsCnt - invisColCnt;
            for (let i = 0; i < padCellsCount; i++) {
                rowEl.appendChild(document.createElement('td'));
            }
            //
            if (!rowEl.style.height) {
                rowEl.style.height = defaultRowHeight + 'px';
            }
        }
        //
        // do it at the end for performance
        rootElement.appendChild(tableEl);
    }
    //
    private _getVisColSpan(columns: wjcXlsx.IWorkbookColumn[], startFrom: number, colSpan: number) {
        let res = colSpan;
        //
        for (let i = startFrom; i < columns.length && i < startFrom + colSpan; i++) {
            const col = columns[i];
            if (col && !col.visible) {
                res--;
            }
        }
        //
        return res;
    }
    //
    private _importStyle(cssStyle: CSSStyleDeclaration, xlsxStyle: wjcXlsx.IWorkbookStyle) {
        if (!xlsxStyle) {
            return;
        }
        //
        if (xlsxStyle.fill) {
            if (xlsxStyle.fill.color) {
                cssStyle.backgroundColor = xlsxStyle.fill.color;
            }
        }
        //
        if (xlsxStyle.hAlign && xlsxStyle.hAlign != wjcXlsx.HAlign.Fill) {
            cssStyle.textAlign = wjcXlsx.HAlign[xlsxStyle.hAlign].toLowerCase();
        }
        //
        const font = xlsxStyle.font;
        if (font) {
            if (font.family) {
                cssStyle.fontFamily = font.family;
            }
            if (font.bold) {
                cssStyle.fontWeight = 'bold';
            }
            if (font.italic) {
                cssStyle.fontStyle = 'italic';
            }
            if (font.size != null) {
                cssStyle.fontSize = font.size + 'px';
            }
            if (font.underline) {
                cssStyle.textDecoration = 'underline';
            }
            if (font.color) {
                cssStyle.color = font.color;
            }
        }
    }

    uploadExcelTemplate(modal: BlueModal): void {
        this.uploading = true;
        this.uploadedFile = this.files[0];
        this._loadWorkbook();
        this.closeUploadModal(modal);
        this.uploading = false;
    }

    openUploadModal(modal: BlueModal): void {
        this.files = [];
        modal?.open();
    }

    closeUploadModal(modal: BlueModal): void {
        this.files = [];
        modal?.close();
    }
}

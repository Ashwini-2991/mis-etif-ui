import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TemplateCell } from '@app/home/types/TemplateCell';
import { TemplateMetadata } from '@app/home/types/TemplateMetadata';
import { TemplateIOMapping, TemplateTableMapping } from '@app/home/types/TemplateMapping';
import { SpreadsheetComponent, CellModel } from '@syncfusion/ej2-angular-spreadsheet';
import { lettersToNumber } from '@app/shared/helper';
import { BlueModal } from '@moodys/blue-ng';
import { BlueToastData, BlueToastRole, BlueToastService, BlueToastTheme } from '@moodys/blue-ng';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '@app/helper';
import { Template } from '@app/home/types/Template';

@Component({
    selector: 'app-spread-sheet',
    templateUrl: './spread-sheet.component.html',
    styleUrls: ['./spread-sheet.component.scss']
})
export class SpreadSheetComponent implements OnInit {
    @ViewChild('spreadsheet')
    spreadsheetObj!: SpreadsheetComponent;

    @ViewChild('templateListTab')
    templateListTab!: ElementRef;

    @ViewChild('templateCreateTab')
    templateCreateTab!: ElementRef;

    templateName = '';
    keys: string[] = [];

    templateMappings: TemplateIOMapping[] = [];
    templateTableMappings: TemplateTableMapping[] = [];
    sheets: string[] = [];

    currentTemplateMetadata!: TemplateMetadata;
    currentTemplateIOMapping!: TemplateIOMapping;
    currentTemplateTableMapping!: TemplateTableMapping;

    selectedTemplateCells: TemplateCell[] = [];
    isOpen = false;

    uploading = false;
    files!: File[];
    uploadedFile!: File;
    fileUploaded = false;
    processing = false;
    templates: Template[] = [];

    error: BlueToastData = {
        title: 'Failed to save template.',
        theme: BlueToastTheme.Error,
        content: `Please enter template name.`,
        role: BlueToastRole.Alert
    };

    saveSuccess: BlueToastData = {
        title: `Success`,
        content: 'Template saved successfully!',
        theme: BlueToastTheme.Success
    };

    saveError: BlueToastData = {
        title: `Error`,
        content: 'Failed to save template!! Please contact ETIF support team.',
        theme: BlueToastTheme.Error,
        role: BlueToastRole.Alert
    };

    constructor(private _toastService: BlueToastService, private httpClient: HttpClient) {}

    ngOnInit(): void {
        this.getTemplates();
    }

    getTemplates() {
        this.processing = true;
        this.httpClient.get(`${baseUrl}/templates`).subscribe({
            next: (res: any) => {
                this.templates = res.data;
                this.processing = false;
            },
            error: (err: unknown) => {
                console.log(err);
                this.processing = false;
            }
        });
    }

    fileMenuBeforeOpen() {
        this.spreadsheetObj.hideFileMenuItems(['Save As'], true);
    }

    onOpenComplete(args: any) {
        if (!this.currentTemplateMetadata) {
            this.currentTemplateMetadata = {};
        }
        args.response.data.sheets.forEach((sheet: any) => {
            this.sheets.push(sheet.name);
        });
        this.currentTemplateMetadata.FileName = args.response.eventArgs.file.name;
        this.currentTemplateMetadata.SheetNames = this.sheets;
    }

    contextMenuBeforeOpen(args: { element: HTMLElement; items: any; event: any; range: any }) {
        this.selectedTemplateCells = [];
        if (args.element.id === this.spreadsheetObj.element.id + '_contextmenu') {
            // To add context menu items.
            this.spreadsheetObj.addContextMenuItems([{ text: 'Mark as Input' }], 'Paste Special', false); //To pass the items, Item before / after that the element to be inserted, Set false if the items need to be inserted before the text.
            this.spreadsheetObj.addContextMenuItems([{ text: 'Mark as Output' }], 'Paste Special', false);
            this.spreadsheetObj.addContextMenuItems([{ text: 'Mark as Table' }], 'Paste Special', false);
            this.spreadsheetObj.addContextMenuItems([{ text: 'Mark as Key' }], 'Paste Special', false);

            const selectedRange = this.spreadsheetObj.getActiveSheet().selectedRange;
            const range = this.spreadsheetObj.getActiveSheet().name + '!' + selectedRange;
            this.spreadsheetObj.getData(range).then((value: Map<string, CellModel>): void => {
                (value as Map<string, CellModel>).forEach((cell: CellModel, key: string): void => {
                    if (cell) {
                        const templateCell: TemplateCell = {
                            Number: key,
                            Range: selectedRange,
                            Value: cell.value,
                            ColSpan: cell.colSpan,
                            RowSpan: cell.rowSpan,
                            Formula: cell.formula
                        };
                        this.selectedTemplateCells.push(templateCell);
                    }
                });
            });
        }
    }

    contextMenuItemSelect(args: any) {
        const selectedMenuItem = args.event.target.textContent;
        if (selectedMenuItem === 'Mark as Input') {
            this.processInput();
        } else if (selectedMenuItem === 'Mark as Output') {
            this.processOutput();
        } else if (selectedMenuItem === 'Mark as Table') {
            this.processTable();
        } else if (selectedMenuItem === 'Mark as Key') {
            this.processKey();
        }
    }

    uploadExcelTemplate(modal: BlueModal): void {
        this.fileUploaded = true;
        this.uploading = true;
        this.uploadedFile = this.files[0];
        this.spreadsheetObj.open({ file: this.uploadedFile }); // open the file into Spreadsheet
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

    private processOutput() {
        if (!this.currentTemplateIOMapping) {
            this.currentTemplateIOMapping = {};
        }
        this.currentTemplateIOMapping.O_CellRange = this.selectedTemplateCells[0].Range;
        this.currentTemplateIOMapping.O_CellFormula = this.selectedTemplateCells[0].Formula;

        if (
            this.currentTemplateIOMapping &&
            this.currentTemplateIOMapping.I_CellRange &&
            this.currentTemplateIOMapping.O_CellRange
        ) {
            this.templateMappings.push({ ...this.currentTemplateIOMapping });
        }
    }

    private processInput() {
        if (!this.currentTemplateIOMapping) {
            this.currentTemplateIOMapping = {};
        }
        this.currentTemplateIOMapping.I_CellRange = this.selectedTemplateCells[0].Range;
        this.currentTemplateIOMapping.I_CellValue = this.selectedTemplateCells.filter((e) => e != null)[0].Value;
        this.currentTemplateIOMapping.O_CellRange = '';
    }

    private processTable() {
        if (!this.currentTemplateTableMapping) {
            this.currentTemplateTableMapping = {};
        }

        const selectedColCount = this.getSelectedColumnCount();

        this.currentTemplateTableMapping.CellRange = this.selectedTemplateCells[0].Range;
        this.currentTemplateTableMapping.Columns = [];
        for (let i = 0; i < selectedColCount; i++) {
            this.currentTemplateTableMapping.Columns.push(this.selectedTemplateCells[i].Value!);
        }

        if (this.currentTemplateTableMapping && this.currentTemplateTableMapping.CellRange) {
            this.templateTableMappings.push({ ...this.currentTemplateTableMapping });
        }
    }

    private processKey() {
        this.keys.push(this.selectedTemplateCells[0].Value!);
    }

    private getSelectedColumnCount(): number {
        const range = this.selectedTemplateCells[0].Range;
        const rangeValues = range?.split(':');
        let match = rangeValues ? rangeValues[0].match(/[a-zA-Z]/) : null;
        const startCell = match ? match[0] : null;
        match = rangeValues ? rangeValues[1].match(/[a-zA-Z]/) : null;
        const endCell = match ? match[0] : null;
        const startNumber = lettersToNumber(startCell!);
        const endNumber = lettersToNumber(endCell!);
        return endNumber - startNumber + 1;
    }

    submit() {
        if (!this.templateName) {
            this.launchToast(this.error);
        } else {
            this.processing = true;
            const data = {
                name: this.templateName,
                templateKeys: this.keys,
                templateMetadata: this.currentTemplateMetadata,
                templateMappings: this.templateMappings,
                templateTableMappings: this.templateTableMappings,
                file: this.uploadedFile
            };

            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('templateKeys', JSON.stringify(data.templateKeys));
            formData.append('templateMetadata', JSON.stringify(data.templateMetadata));
            formData.append('templateMappings', JSON.stringify(data.templateMappings));
            formData.append('templateTableMappings', JSON.stringify(data.templateTableMappings));
            formData.append('file', this.uploadedFile);

            this.httpClient.post(`${baseUrl}/create/template`, formData).subscribe({
                next: () => {
                    const template: Template = {
                        name: data.name,
                        capturedPoints: data.templateMappings.length,
                        capturedTables: data.templateTableMappings.length,
                        templateMetadata: data.templateMetadata
                    };
                    const templateList = [...this.templates];
                    templateList.push({ ...template });
                    this.templates = [...templateList];
                    this.launchToast(this.saveSuccess);
                    this.templateListTab.nativeElement.click();
                    this.processing = false;
                },
                error: (err: unknown) => {
                    console.log(err);
                    this.launchToast(this.saveError);
                    this.processing = false;
                }
            });
        }
    }

    launchToast(toast: BlueToastData) {
        this._toastService.addToast(toast);
    }
}

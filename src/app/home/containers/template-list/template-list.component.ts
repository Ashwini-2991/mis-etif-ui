import { Component, Input, OnChanges } from '@angular/core';
import { BlueTableData } from '@moodys/blue-ng';
import { Template } from '@app/home/types/Template';
import { Router } from '@angular/router';

@Component({
    selector: 'app-template-list',
    templateUrl: './template-list.component.html',
    styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnChanges {
    processing = false;
    templateData: BlueTableData = [];

    @Input()
    templates: Template[] = [];

    constructor(private router: Router) {}

    ngOnChanges(): void {
        this.processing = true;
        const templateDataTemp: BlueTableData = [];
        this.templates.forEach((template) => {
            templateDataTemp.push({ data: template });
        });
        this.templateData = [...templateDataTemp];
        this.processing = false;
    }

    navigateToTemplateDetail(template: Template): void {
        this.router.navigate(['/template/', template._id]);
    }
}

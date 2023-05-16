import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BlueTableData } from '@moodys/blue-ng';
import { baseUrl } from '@app/helper';
import { Template } from '@app/home/types/Template';

@Component({
    selector: 'app-template-list',
    templateUrl: './template-list.component.html',
    styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {
    processing = false;
    templateData: BlueTableData = [];

    constructor(private httpClient: HttpClient) {}

    ngOnInit(): void {
        this.processing = true;
        this.httpClient.get(`${baseUrl}/templates`).subscribe({
            next: (res: any) => {
                const templates: Template[] = res.data;
                templates.forEach((template) => {
                    this.templateData.push({ data: template });
                });
                this.processing = false;
            },
            error: (err: unknown) => {
                console.log(err);
                this.processing = false;
            }
        });
    }
}

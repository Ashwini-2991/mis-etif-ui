import { Component } from '@angular/core';
import { BlueModal } from '@moodys/blue-ng';

@Component({
    selector: 'app-file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.scss']
})
export class FileComponent {
    uploading = false;
    files!: File[];
    uploadedFile!: File;

    uploadExcelFile(modal: BlueModal): void {
        this.uploading = true;
        this.uploadedFile = this.files[0];
        this.handleFile();
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

    handleFile() {
        const reader = new FileReader();

        reader.onload = (e) => {
            const contents = e.target?.result;
            console.log(contents);
        };

        reader.readAsDataURL(this.uploadedFile);
    }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BlueNgModule } from '@moodys/blue-ng';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [],
    imports: [CommonModule, BlueNgModule, FormsModule],
    exports: [HttpClientModule, BlueNgModule, CommonModule, FormsModule],
    providers: []
})
export class SharedModule {}

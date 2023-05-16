import { Injectable } from '@angular/core';
import { AppSettingsService as BaseAppSettingsService } from '@moodys/emtn-ng';
import { AppSettings } from '../../config';

@Injectable({
    providedIn: 'root'
})
export class AppSettingsService extends BaseAppSettingsService<AppSettings> {}

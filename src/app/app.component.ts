import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import localeEn from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private readonly _translateService: TranslateService) {
        const defaultLang = _translateService.getBrowserLang() || 'en';
        _translateService.setDefaultLang(defaultLang);
        registerLocaleData(localeEn, 'en');
    }
}

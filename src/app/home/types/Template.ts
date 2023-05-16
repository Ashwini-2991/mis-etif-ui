import { TemplateMetadata } from './TemplateMetadata';

export interface Template {
    _id?: number;
    name?: string;
    capturedPoints?: number;
    capturedTables?: number;
    templateMetadata?: TemplateMetadata;
}

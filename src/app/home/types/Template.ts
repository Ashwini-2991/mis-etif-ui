import { TemplateMetadata } from './TemplateMetadata';

export interface Template {
    name?: string;
    capturedPoints?: number;
    capturedTables?: number;
    templateMetadata?: TemplateMetadata;
}

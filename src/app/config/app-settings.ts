import { AuthConfig } from '@moodys/emtn-ng/auth';
import { FeatureConfig } from '@moodys/emtn-ng/feature-flag';
import { AnalyticsConfig } from '@moodys/emtn-ng/analytics';

export interface AppSettings {
    auth: AuthConfig;
    featureFlag: FeatureConfig;
    analytics: AnalyticsConfig;
    environment: 'dev' | 'qa' | 'uat' | 'prd';
}

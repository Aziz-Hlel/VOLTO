import { IAppSettings } from '../types/AppSettings';

export class CreateAppSettingDto {
  key: IAppSettings;
  value: string;
}

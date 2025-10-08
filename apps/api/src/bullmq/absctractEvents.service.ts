export class AbstractEventsService {
  private readonly _hour = 1000 * 60 * 60;
  private readonly firstNotificationDelay = this._hour * 24;
  private readonly secondNotificationDelay = this._hour * 2;

  private readonly oneSignalUrl = 'https://api.onesignal.com/notifications';
}

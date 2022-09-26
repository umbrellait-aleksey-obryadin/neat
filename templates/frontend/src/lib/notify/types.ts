export enum NotificationTypes {
  Error,
  Success,
}

export interface Message {
  type: NotificationTypes | string
  text: string
}

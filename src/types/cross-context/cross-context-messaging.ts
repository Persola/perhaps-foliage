import type { CrossContextMessageData } from './cross-context-message-data';

export type CrossContextMessageSender = (
  type: string,
  data: CrossContextMessageData,
) => void;

export type CrossContextMessageHandlerRegister = (
  messageType: string,
  callback: (data: CrossContextMessageData) => void,
) => void;

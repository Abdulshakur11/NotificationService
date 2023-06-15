export interface GetUserResponse {
  message: string;
  status: boolean;
}

export interface Message {
  telegramId: string;
  message: string;
}

export interface AssigneesRequest {
  telegramId: number;
  message: string;
}

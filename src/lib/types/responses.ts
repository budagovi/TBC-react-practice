// -=-=-=-=-=-=-=- API Responses -=-=-=-=-=-=-=-
export type ICustomApiResponse = {
  message: string
}

// -=-=-=-=-=-=-=- Action Responses -=-=-=-=-=-=-=-

export type IActionResponse = {
  success: true;
  payload?: any
} | {
  success: false;
  message: string;
  status: number;
}
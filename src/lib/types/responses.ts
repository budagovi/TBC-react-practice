// -=-=-=-=-=-=-=- API Responses -=-=-=-=-=-=-=-
/**
 * ```typescript
 *  {
      message: string
    }
 * ```
 */
export interface ICustomApiResponse {
  message: string
}

// -=-=-=-=-=-=-=- Action Responses -=-=-=-=-=-=-=-

/**
 * ```typescript
 *  {
      success: true;
    } | {
      success: false;
      message: string;
      status: number;
    }
 * ```
 */
export type IActionResponse = {
  success: true;
  payload?: any
} | {
  success: false;
  message: string;
  status: number;
}
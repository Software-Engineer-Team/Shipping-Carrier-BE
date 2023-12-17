type ErrorMessage = {
  path: string[];
  message: string;
  name: string;
};

type TransformedErrors = {
  [key: string]: string[];
};

export interface ValidationErrors {
  [field: string]:
  | string
  | string[]
  | boolean
  | { key: string; message: string };
}

export interface HttpError extends Record<string, any> {
  message: string;
  statusCode: number;
  errors?: ValidationErrors;
}

export const transformErrorMessages = (
  errorMessages: ErrorMessage[],
): TransformedErrors => {
  const transformedErrors: TransformedErrors = {};

  for (const error of errorMessages) {
    const key = error.path[0];

    if (transformedErrors[key]) {
      transformedErrors[key].push(error.message);
    } else {
      transformedErrors[key] = [error.message];
    }
  }

  return transformedErrors;
};

export const transformHttpError = (error: any): HttpError => {
  const message =
    error.response?.data?.error?.message ||
    error.response?.data?.message ||
    error.details?.error?.message ||
    error.details?.message ||
    error?.response?.data?.data?.message ||
    "Unknow error message";
  const statusCode =
    error?.response?.data?.error?.status || error?.response?.status || 500;

  const httpError: HttpError = {
    statusCode,
    message,
  };

  return httpError;
};

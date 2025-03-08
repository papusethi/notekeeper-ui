import { AxiosError } from 'axios';

export const formatErrorMessage = (error: AxiosError | Error): string => {
  const errorMessage = ((error as AxiosError)?.response?.data as { message: string })?.message || error.message;
  return errorMessage;
};

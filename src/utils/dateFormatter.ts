import { format } from 'date-fns';

export const formatDate = (value: string) => {
  return format(new Date(value), 'dd/MM/yyyy');
};

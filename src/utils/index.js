import { format } from 'date-fns';

const formCreateDate = (dateStr) => {
  return format(new Date(dateStr), 'LLLL d, y');
};

export { formCreateDate };

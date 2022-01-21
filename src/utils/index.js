
import { format } from 'date-fns';

const formCreateDate = function(dateStr) {
  return format(new Date(dateStr), 'LLLL d, y');
};

export default formCreateDate;
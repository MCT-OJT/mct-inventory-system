import { clsx } from 'clsx';
import moment from 'moment';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
export function getDateString(date) {
    //! also singapore time
    return moment(date).format('MMMM Do YYYY');
}

import { type ClassValue, clsx } from 'clsx';
import {
  format,
  isThisYear,
  isToday,
  isValid,
  isWithinInterval,
  isYesterday,
  sub,
} from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupByDate<T>(array: Array<T>, key: string) {
  const storeDate = <T>(
    group: Record<string, Array<T>>,
    key: string,
    value: T
  ): Record<string, Array<T>> => {
    if (!group[key]) {
      group[key] = [];
    }
    group[key].push(value);
    return group;
  };

  return array.reduce((group: Record<string, Array<T>>, item: T) => {
    const today = new Date();
    const itemDate = item[key as keyof T] as string;
    if (isValid(itemDate)) {
      return group;
    }
    const date = format(itemDate, 'MM/dd/yyyy');

    // Today
    if (isToday(date)) {
      return storeDate(group, 'Today', item);
    }

    if (isYesterday(date)) {
      return storeDate(group, 'Yesterday', item);
    }

    const sevenDaysAgo = sub(today, { days: 7 });
    if (
      isWithinInterval(date, {
        start: today,
        end: sevenDaysAgo,
      })
    ) {
      return storeDate(group, '7 days ago', item);
    }

    const oneMonthAgo = sub(today, { months: 1 });
    if (
      isWithinInterval(date, {
        start: today,
        end: oneMonthAgo,
      })
    ) {
      return storeDate(group, '30 days ago', item);
    }

    if (isThisYear(date)) {
      const month = format(date, 'LLLL');
      return storeDate(group, month, item);
    } else {
      const month = format(date, 'yyyy');
      return storeDate(group, month, item);
    }
  }, {});
}

type Data<T> = Record<string, T>;

export function sortObjectByOrder<T extends object>(
  data: Data<T>,
  order: Array<string>
): Record<string, T> {
  const dataArray = Object.entries(data);

  dataArray.sort((a, b) => {
    let indexA = order.indexOf(a[0]);
    let indexB = order.indexOf(b[0]);
    if (indexA === -1) indexA = order.length;
    if (indexB === -1) indexB = order.length;
    return indexA - indexB;
  });

  return Object.fromEntries(dataArray);
}

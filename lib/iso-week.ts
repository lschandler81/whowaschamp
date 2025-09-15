/**
 * ISO Week utilities for PPV Flashback feature
 * ISO weeks start on Monday and are numbered 1-53
 */

/**
 * Get the ISO week number for a given date
 * @param date Date to get the ISO week for
 * @returns ISO week number (1-53)
 */
export function getISOWeekNumber(date: Date): number {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
}

/**
 * Get the ISO week year for a given date
 * @param date Date to get the ISO week year for
 * @returns ISO week year
 */
export function getISOWeekYear(date: Date): number {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  return target.getFullYear();
}

/**
 * Get the start date (Monday) of the ISO week for a given date
 * @param date Date to get the week start for
 * @returns Date representing the Monday of that ISO week
 */
export function getISOWeekStart(date: Date): Date {
  const target = new Date(date.valueOf());
  const dayOfWeek = (date.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
  target.setDate(target.getDate() - dayOfWeek);
  target.setHours(0, 0, 0, 0);
  return target;
}

/**
 * Get the end date (Sunday) of the ISO week for a given date
 * @param date Date to get the week end for
 * @returns Date representing the Sunday of that ISO week
 */
export function getISOWeekEnd(date: Date): Date {
  const target = new Date(date.valueOf());
  const dayOfWeek = (date.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
  target.setDate(target.getDate() - dayOfWeek + 6);
  target.setHours(23, 59, 59, 999);
  return target;
}

/**
 * Get the current ISO week number
 * @returns Current ISO week number
 */
export function getCurrentISOWeek(): number {
  return getISOWeekNumber(new Date());
}

/**
 * Check if two dates are in the same ISO week
 * @param date1 First date
 * @param date2 Second date
 * @returns True if both dates are in the same ISO week
 */
export function areSameISOWeek(date1: Date, date2: Date): boolean {
  const week1 = getISOWeekNumber(date1);
  const week2 = getISOWeekNumber(date2);
  const year1 = getISOWeekYear(date1);
  const year2 = getISOWeekYear(date2);
  
  return week1 === week2 && year1 === year2;
}

/**
 * Get all dates in the database that fall in the same ISO week as the current date
 * This is used to find historical PPVs that happened "this week in history"
 * @param currentDate Current date (defaults to today)
 * @returns Function that can be used to filter dates by ISO week
 */
export function getISOWeekMatcher(currentDate: Date = new Date()) {
  const currentWeek = getISOWeekNumber(currentDate);
  
  return (date: Date): boolean => {
    return getISOWeekNumber(date) === currentWeek;
  };
}

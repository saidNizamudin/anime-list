import moment from 'moment';

export default function formatDate(date: { year: number; month: number; day: number }) {
	const now = moment();
	const givenDate = moment(`${date.year}-${date.month}-${date.day}`, 'YYYY-MM-DD');
	const diffInYears = now.diff(givenDate, 'years');
	const diffInMonths = now.diff(givenDate, 'months');
	const diffInDays = now.diff(givenDate, 'days');

	if (diffInYears > 0) {
		return `${diffInYears} years ago`;
	} else if (diffInMonths > 0) {
		return `${diffInMonths} months ago`;
	} else {
		return `${diffInDays} days ago`;
	}
}

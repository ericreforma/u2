import md5 from 'js-md5';
import withAuth from './withAuth';
import useWindowDimensions from './useWindowDimensions'; 

/* Check if web app is in standalone mode
	*/
export function isStandalone () {
	// return (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone) || document.referrer.includes('android-app://');
	return true;
}

/* Check if web app is in production mode
	*/
export function isProduction () {
	return process.env.NODE_ENV === 'production';
}

/* Generates auth key
	*/
export function getAuthKey () {

	const key = 'fghrtrvdfger';

	const time = Math.round(+ new Date() / 1000)
		.toString()
		.substring(0, 7);

	return md5(`${time}${key}`);

}

/* Parses data time string to unix time or js date
	*/
export function toDate (string, unix) {

	if (!string) {
		return unix ? 0 : new Date();
	}

	let [ date, time ] = string.split(' ');

	if (!time) {
		time = '00:00:00';
	}

	const [ year, month, day ] = date.split('-');

	const [ hour, minute, second ] = time.split(':');

	const jsDate = new Date(year, month - 1, day, hour, minute, second);

	return unix ? Math.round(+ jsDate/1000) : jsDate;

}

/* Creates dates
	*/
export function getDates (conf) {

	const daysInMonth = (m, y) => new Date(y, m, 0).getDate();

	const _date = new Date();

	const _dates = {
		year: [],
		month: [],
		day: [],
	};

	const _year = _date.getFullYear() - conf.year[0];
	const _year2 = _year - conf.year[1];

	for (let i = _year; i >= _year2; i--) {
		_dates.year.push(i);
	}

	for (let i = 1; i < 13; i++) {
		_dates.month.push(i);
	}

	const _d = { ...conf.date };

	if (!_d.month) {
		_d.month = _dates.month[0];
	}

	if (!_d.year) {
		_d.year = _dates.year[0];
	}

	const _days = daysInMonth(_d.month, _d.year);

	for (let i = 1; i <= _days; i++) {
		_dates.day.push(i);
	}

	return _dates;

}

export {
	withAuth,
	useWindowDimensions,
};

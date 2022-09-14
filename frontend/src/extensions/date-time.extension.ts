import * as moment from 'moment';

Date.prototype.toJSON = function () {
	return moment(this).format('YYYY-MM-DDTHH:mm:ss.SSS');
};

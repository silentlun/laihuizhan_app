var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'周': 604800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr, type = '月') {
		//var date = this.parse(dateStr)
		var date = new Date(dateStr*1000);
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS[type]) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '-' + _format(date.getMonth() + 1) + '-' + _format(date.getDate());
	},
	formatToString: function (dateStr, type = 0) {
		var date = new Date(dateStr*1000);
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		if(type == 1){
			return date.getFullYear() + '-' + _format(date.getMonth() + 1) + '-' + _format(date.getDate());
		}
		return date.getFullYear() + '-' + _format(date.getMonth() + 1) + '-' + _format(date.getDate()) + ' ' + _format(date.getHours()) + ':' + _format(date.getMinutes());
	}
};


export {
	dateUtils
}


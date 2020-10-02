export interface UAClientDescription {
	browser: 'firefox' | 'edge' | 'chrome' | 'facebook' | 'google_app' | 'ie' | 'safari' | 'safari_mobile' | 'other';
	browserVersion: number;
	isMobile: boolean;
	os: 'ios' | 'android' | 'linux' | 'mac' | 'windows' | 'playstation' | 'other';
	osVersion: number;
}
/**
 * Get Client description for a user agent string.
 */
export function getClient(ua?: string) {
	interface os {
		regex: RegExp;
		os: 'ios' | 'android' | 'linux' | 'mac' | 'windows' | 'playstation' | 'other';
		apply: Function;
	}
	interface browser {
		browser: 'firefox' | 'edge' | 'chrome' | 'facebook' | 'google_app' | 'ie' | 'safari' | 'safari_mobile' | 'other';
		regex: RegExp;
	}

	let o: UAClientDescription = {
		browser: 'other',
		browserVersion: 0,
		isMobile: false,
		os: 'other',
		osVersion: 0
	};
	ua = ua || navigator.userAgent;
	let a: browser[] = [
		{ browser: 'facebook', regex: /FBAV\/([0-9\.]+)/i },
		{ browser: 'facebook', regex: /FBSV\/([0-9\.]+)/i },
		{ browser: 'google_app', regex: /GSA\/([0-9\.]+)/i },
		{ browser: 'firefox', regex: /Firefox\/([0-9\.]+)/i },
		{ browser: 'firefox', regex: /FxiOS\/([0-9\.]+)/i },
		{ browser: 'edge', regex: /Edge\/([0-9\.]+)/i },
		{ browser: 'chrome', regex: /Chrome\/([0-9\.]+)/i },
		{ browser: 'chrome', regex: /CriOS\/([0-9\.]+)/i },
		{ browser: 'ie', regex: /Trident\/.+rv[: ]?([0-9]+)/i },
		{ browser: 'safari', regex: /Version\/([0-9\.]+).+Safari/ }
	];
	for (let i = 0; i < a.length; i++) {
		let reg = ua.match(a[i].regex);
		if (reg) {
			o.browser = a[i].browser;
			o.browserVersion = parseFloat(reg[1]);
			break;
		}
	}
	if (ua.match(/Mobile/)) {
		o.isMobile = true;
	}
	let opSys: os[] = [
		{
			os: 'ios',
			regex: /([0-9_]+) like Mac OS X/,
			apply: (v: string) => v.replace(/_/g, '.')
		},
		{
			os: 'ios',
			regex: /CPU like Mac OS X/,
			apply: () => '0'
		},
		{
			os: 'android',
			regex: /Android ([0-9\.]+)/,
			apply: (v: string) => v
		},
		{
			os: 'linux',
			regex: /Linux (x86_64|x86)/,
			apply: (v: string) => (v == 'x86_64' ? '64' : '32')
		},
		{
			os: 'mac',
			regex: /Macintosh.+Mac OS X ([0-9_]+)/,
			apply: (v: string) => v.replace(/_/g, '.')
		},
		{
			os: 'windows',
			regex: /Windows NT ([0-9\.]+)/,
			apply: (v: string) => v.replace(/_/g, '.')
		},
		{
			os: 'playstation',
			regex: /PlayStation ([0-9\.]+)/,
			apply: (v: string) => v.replace(/_/g, '.')
		}
	];
	for (let i = 0; i < opSys.length; i++) {
		let reg = ua.match(opSys[i].regex);
		if (reg) {
			o.os = opSys[i].os;
			o.osVersion = reg.length > 1 ? parseFloat(opSys[i].apply(reg[1])) : 0;
			break;
		}
	}
	return o;
}

/**
 * Return the set of capabilities for a user agent string.
 */
export function browserCapabilities(userAgent: string) {
	/**
	 * Return whether `version` is at least as high as `atLeast`.
	 */
	function versionAtLeast(atLeast: number[], browserVersion: number[]) {
		for (let i = 0; i < atLeast.length; i++) {
			const r = atLeast[i];
			const v = browserVersion.length > i ? browserVersion[i] : 0;
			if (v > r) {
				return true;
			}
			if (v < r) {
				return false;
			}
		}
		return true;
	}
	/**
	 * Parse a "x.y.z" version string of any length into integer parts. Returns -1
	 * for a part that doesn't parse.
	 */
	function parseVersion(version?: number) {
		if (!version) {
			return [];
		}
		return new String(version).split('.').map(part => {
			const i = parseInt(part, 10);
			return isNaN(i) ? -1 : i;
		});
	}
	/**
	 * Make a predicate that checks if the browser version is at least this high.
	 */
	function since(...atLeast: number[]) {
		return (ua: UAClientDescription) => versionAtLeast(atLeast, parseVersion(ua.browserVersion));
	}
	/**
	 * Make a predicate that checks if the OS version is at least this high.
	 */
	function sinceOS(...atLeast: number[]) {
		return (ua: UAClientDescription) => versionAtLeast(atLeast, parseVersion(ua.osVersion));
	}
	const chrome = {
		es2015: since(49),
		es2016: since(58),
		es2017: since(58),
		es2018: since(64),
		customElementsV1: since(54),
		push: since(41),
		serviceworker: since(45),
		modules: since(64)
	};
	const browserPredicates = {
		chrome: chrome,
		opera: {
			es2015: since(36),
			es2016: since(45),
			es2017: since(45),
			es2018: since(51),
			customElementsV1: since(41),
			push: since(28),
			serviceworker: since(32),
			modules: since(48)
		},
		vivaldi: {
			es2015: since(1),
			es2016: since(1, 14),
			es2017: since(1, 14),
			es2018: since(1, 14),
			customElementsV1: since(1),
			push: since(1),
			serviceworker: since(1),
			modules: since(1, 14)
		},
		safari_mobile: {
			es2015: sinceOS(10),
			es2016: sinceOS(10, 3),
			es2017: sinceOS(10, 3),
			es2018: sinceOS(11, 3),
			customElementsV1: since(10, 3),
			push: sinceOS(9, 2),
			serviceworker: sinceOS(11, 3),
			modules: sinceOS(11, 3)
		},
		safari: {
			es2015: since(10),
			es2016: since(10, 1),
			es2017: since(10, 1),
			es2018: sinceOS(11, 1),
			customElementsV1: since(10, 1),
			push: (ua: UAClientDescription) => {
				return (
					versionAtLeast([9], parseVersion(ua.browserVersion)) &&
					// HTTP/2 on desktop Safari requires macOS 10.11 according to
					// caniuse.com.
					versionAtLeast([10, 11], parseVersion(ua.osVersion))
				);
			},
			// https://webkit.org/status/#specification-service-workers
			serviceworker: since(11, 1),
			modules: since(11, 1)
		},
		edge: {
			// Edge versions before 15.15063 may contain a JIT bug affecting ES6
			// constructors (https://github.com/Microsoft/ChakraCore/issues/1496).
			// Since this bug was fixed after es2016 and 2017 support, all these
			// versions are the same.
			es2015: since(15, 15063),
			es2016: since(15, 15063),
			es2017: since(15, 15063),
			es2018: since(18),
			customElementsV1: since(79),
			push: since(12),
			serviceworker: since(79),
			modules: since(79)
		},
		firefox: {
			es2015: since(51),
			es2016: since(52),
			es2017: since(52),
			es2018: since(58),
			customElementsV1: since(63),
			// Firefox bug - https://bugzilla.mozilla.org/show_bug.cgi?id=1409570
			push: since(63),
			serviceworker: since(44),
			modules: since(67)
		}
	};
	type tCapabilities = keyof typeof chrome;
	const ua = getClient(userAgent);
	const capabilities = new Set<tCapabilities>();
	let browserName = ua.browser;
	if (ua.os === 'ios') {
		// if iOS is really safari_mobile.
		browserName = 'safari_mobile';
	} else if (ua.browser == 'facebook') {
		browserName = 'chrome';
	}
	const predicates = browserPredicates[browserName as 'chrome'] || {};
	for (const capability of Object.keys(predicates)) {
		if (predicates[capability as 'push'](ua)) {
			capabilities.add(capability as tCapabilities);
		}
	}
	return capabilities;
}
/**
 * Get GeoLocation in browser
 */
export function getGeoLocation(): Promise<{ lat: number; lon: number }> {
	return new Promise((solve, err) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				p => {
					solve({
						lat: p.coords.latitude,
						lon: p.coords.longitude
					});
				},
				() => {
					err({ error: 'Haz denagado los permisos de ubicación', code: 0 });
				}
			);
		} else {
			err({ error: 'Tu navegador no soporta la Geolocalizacion', code: -1 });
		}
	});
}
/**
 * Sleep Promise
 */
export let sleep = (time: number) => new Promise(resolve => setTimeout(() => resolve(), time));

/**
 * Generate Random ID
 */
export class PushID {
	// Modeled after base64 web-safe chars, but ordered by ASCII.
	PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

	// Timestamp of last push, used to prevent local collisions if you push twice in one ms.
	lastPushTime = 0;

	// We generate 72-bits of randomness which get turned into 12 characters and appended to the
	// timestamp to prevent collisions with other clients.  We store the last characters we
	// generated because in the event of a collision, we'll use those same characters except
	// "incremented" by one.
	lastRandChars: number[] = [];

	next(length = 20) {
		// 12
		let computeTotal = length - 8;
		let now = new Date().getTime();
		let duplicateTime = now === this.lastPushTime;
		this.lastPushTime = now;

		let timeStampChars = new Array(8);
		for (let i = 7; i >= 0; i--) {
			timeStampChars[i] = this.PUSH_CHARS.charAt(now % 64);
			// NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
			now = Math.floor(now / 64);
		}
		if (now !== 0) throw new Error('We should have converted the entire timestamp.');

		let id = timeStampChars.join('');
		let i;
		if (!duplicateTime) {
			for (i = 0; i < computeTotal; i++) {
				this.lastRandChars[i] = Math.floor(Math.random() * 64);
			}
		} else {
			// If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
			for (i = computeTotal - 1; i >= 0 && this.lastRandChars[i] === 63; i--) {
				this.lastRandChars[i] = 0;
			}
			this.lastRandChars[i]++;
		}
		for (i = 0; i < computeTotal; i++) {
			id += this.PUSH_CHARS.charAt(this.lastRandChars[i]);
		}
		//if (id.length != 20) throw new Error('Length should be 20.');

		return id;
	}
	decodePushID(str: string) {
		let alphabet = this.PUSH_CHARS;
		if (str[0] == '-') str = str.substring(1, 8);
		var decoded = 0;
		while (str) {
			var index = alphabet.indexOf(str[0]);
			var power = str.length - 1;
			decoded += index * Math.pow(alphabet.length, power);
			str = str.substring(1);
		}
		return decoded;
	}
}

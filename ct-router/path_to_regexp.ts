/**
 * Match matching groups in a regular expression.
 */
var MATCHING_GROUP_REGEXP = /\((?!\?)/g;

interface OptionsType {
	sensitive?: boolean,
	strict?: boolean,
	end?: boolean,
	start?: boolean,
	delimiter?: boolean,
	endsWith?: string,
	whitelist?: any[]
}

export interface C2RegexpType {
	regexp: RegExp,
	groups: string[]
}

/**
 * Normalize the given path string,
 * returning a regular expression.
 *
 * An empty array should be passed,
 * which will contain the placeholder
 * key names. For example "/user/:id" will
 * then contain ["id"].
 *
 * @param  {String|RegExp|Array} path
 * @param  {Array} keys
 * @param  {OptionsType} options
 * @return {RegExp}
 * @api private
 */
export function pathtoRegexp(path: string | RegExp | Array<any>, keys: Array<any>, options: OptionsType): RegExp {
	options = options || {};
	keys = keys || [];
	var strict = options.strict;
	var end = options.end !== false;
	var flags = options.sensitive ? '' : 'i';
	var extraOffset = 0;
	var keysOffset = keys.length;
	var i = 0;
	var name = 0;
	var m;

	if (path instanceof RegExp) {
		while (m = MATCHING_GROUP_REGEXP.exec(path.source)) {
			keys.push({
				name: name++,
				optional: false,
				offset: m.index
			});
		}

		return path;
	}

	if (Array.isArray(path)) {
		// Map array parts into regexps and return their source. We also pass
		// the same keys and options instance into every generation to get
		// consistent matching groups before we join the sources together.
		path = path.map(function (value) {
			return pathtoRegexp(value, keys, options).source;
		});

		return new RegExp('(?:' + path.join('|') + ')', flags);
	}

	path = ('^' + path + (strict ? '' : path[path.length - 1] === '/' ? '?' : '/?'))
		.replace(/\/\(/g, '/(?:')
		.replace(/([\/\.])/g, '\\$1')
		.replace(/(\\\/)?(\\\.)?:(\w+)(\(.*?\))?(\*)?(\?)?/g, function (match, slash, format, key, capture, star, optional, offset) {
			slash = slash || '';
			format = format || '';
			capture = capture || '([^\\/' + format + ']+?)';
			optional = optional || '';

			keys.push({
				name: key,
				optional: !!optional,
				offset: offset + extraOffset
			});

			var result = ''
				+ (optional ? '' : slash)
				+ '(?:'
				+ format + (optional ? slash : '') + capture
				+ (star ? '((?:[\\/' + format + '].+?)?)' : '')
				+ ')'
				+ optional;

			extraOffset += result.length - match.length;

			return result;
		})
		.replace(/\*/g, function (_star, index) {
			var len = keys.length

			while (len-- > keysOffset && keys[len].offset > index) {
				keys[len].offset += 3; // Replacement length minus asterisk length.
			}

			return '(.*)';
		});

	// This is a workaround for handling unnamed matching groups.
	while (m = MATCHING_GROUP_REGEXP.exec(path)) {
		var escapeCount = 0;
		var index = m.index;

		while (path.charAt(--index) === '\\') {
			escapeCount++;
		}

		// It's possible to escape the bracket.
		if (escapeCount % 2 === 1) {
			continue;
		}

		if (keysOffset + i === keys.length || keys[keysOffset + i].offset > m.index) {
			keys.splice(keysOffset + i, 0, {
				name: name++, // Unnamed matching groups must be consistently linear.
				optional: false,
				offset: m.index
			});
		}

		i++;
	}

	// If the path is non-ending, match until the end or a slash.
	path += (end ? '$' : (path[path.length - 1] === '/' ? '' : '(?=\\/|$)'));
	
	return new RegExp(path, flags);
};

/**
 * https://www.npmjs.com/package/path-to-regexp
 * let c2 = C2Regexp("/:username/job/:name--:jid(\\d+)");
 * let c3 = C2Evaluate("/conectate/job/nameee--123", c2);
 */
var opts = {
	strict: false,
	sensitive: false,
	end: true
}

export function EvaluateParams(path: string, c2regexp: C2RegexpType) {
	let r = path.match(c2regexp.regexp);
	if (r != null) {
		let result: any = {};
		for (let i = 0; i < c2regexp.groups.length; i++) {
			result[c2regexp.groups[i]] = r[i + 1];
		}
		return result; // {username : "herberth","jid" : 1234}
	}
}

export function C2Regexp(path: string) : C2RegexpType {
	try {
		let keys: any[] = [], finalKeys: string[] = [];
		let r = pathtoRegexp(path, keys, opts);
		for (let i = 0; i < keys.length; i++) {
			finalKeys.push(keys[i].name);
		}
		return {
			regexp: r,
			groups: finalKeys
		}
	} catch (e) {
		console.error(e,'Error al generar', path)
		return {
			regexp: /^\/?$/i,
			groups: []
		};
	}
}
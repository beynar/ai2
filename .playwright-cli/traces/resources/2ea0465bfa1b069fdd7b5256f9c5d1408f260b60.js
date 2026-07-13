//#region node_modules/.pnpm/@shikijs+engine-javascript@4.3.0/node_modules/@shikijs/engine-javascript/dist/scanner-DX8LRFGE.mjs
var MAX = 4294967295;
var JavaScriptScanner = class {
	patterns;
	options;
	regexps;
	constructor(patterns, options = {}) {
		this.patterns = patterns;
		this.options = options;
		const { forgiving = false, cache, regexConstructor } = options;
		if (!regexConstructor) throw new Error("Option `regexConstructor` is not provided");
		this.regexps = patterns.map((p) => {
			if (typeof p !== "string") return p;
			const cached = cache?.get(p);
			if (cached) {
				if (cached instanceof RegExp) return cached;
				if (forgiving) return null;
				throw cached;
			}
			try {
				const regex = regexConstructor(p);
				cache?.set(p, regex);
				return regex;
			} catch (e) {
				cache?.set(p, e);
				if (forgiving) return null;
				throw e;
			}
		});
	}
	findNextMatchSync(string, startPosition, _options) {
		const str = typeof string === "string" ? string : string.content;
		const pending = [];
		function toResult(index, match, offset = 0) {
			return {
				index,
				captureIndices: match.indices.map((indice) => {
					if (indice == null) return {
						start: MAX,
						end: MAX,
						length: 0
					};
					return {
						start: indice[0] + offset,
						end: indice[1] + offset,
						length: indice[1] - indice[0]
					};
				})
			};
		}
		for (let i = 0; i < this.regexps.length; i++) {
			const regexp = this.regexps[i];
			if (!regexp) continue;
			try {
				regexp.lastIndex = startPosition;
				const match = regexp.exec(str);
				if (!match) continue;
				if (match.index === startPosition) return toResult(i, match, 0);
				pending.push([
					i,
					match,
					0
				]);
			} catch (e) {
				if (this.options.forgiving) continue;
				throw e;
			}
		}
		if (pending.length) {
			const minIndex = Math.min(...pending.map((m) => m[1].index));
			for (const [i, match, offset] of pending) if (match.index === minIndex) return toResult(i, match, offset);
		}
		return null;
	}
};
//#endregion
//#region node_modules/.pnpm/oniguruma-parser@0.12.2/node_modules/oniguruma-parser/dist/utils.js
function r$2(e) {
	if ([...e].length !== 1) throw new Error(`Expected "${e}" to be a single code point`);
	return e.codePointAt(0);
}
function l$1(e, t, n) {
	return e.has(t) || e.set(t, n), e.get(t);
}
var i = /* @__PURE__ */ new Set([
	"alnum",
	"alpha",
	"ascii",
	"blank",
	"cntrl",
	"digit",
	"graph",
	"lower",
	"print",
	"punct",
	"space",
	"upper",
	"word",
	"xdigit"
]), o$1 = String.raw;
function u(e, t) {
	if (e == null) throw new Error(t ?? "Value expected");
	return e;
}
//#endregion
//#region node_modules/.pnpm/oniguruma-parser@0.12.2/node_modules/oniguruma-parser/dist/tokenizer/tokenize.js
var m$1 = o$1`\[\^?`, b$1 = `c.? | C(?:-.?)?|${o$1`[pP]\{(?:\^?[-\x20_]*[A-Za-z][-\x20\w]*\})?`}|${o$1`x[89A-Fa-f]\p{AHex}(?:\\x[89A-Fa-f]\p{AHex})*`}|${o$1`u(?:\p{AHex}{4})? | x\{[^\}]*\}? | x\p{AHex}{0,2}`}|${o$1`o\{[^\}]*\}?`}|${o$1`\d{1,3}`}`, y$1 = /[?*+][?+]?|\{(?:\d+(?:,\d*)?|,\d+)\}\??/, C$1 = new RegExp(o$1`
  \\ (?:
    ${b$1}
    | [gk]<[^>]*>?
    | [gk]'[^']*'?
    | .
  )
  | \( (?:
    \? (?:
      [:=!>({]
      | <[=!]
      | <[^>]*>
      | '[^']*'
      | ~\|?
      | #(?:[^)\\]|\\.?)*
      | [^:)]*[:)]
    )?
    | \*[^\)]*\)?
  )?
  | (?:${y$1.source})+
  | ${m$1}
  | .
`.replace(/\s+/g, ""), "gsu"), T$1 = new RegExp(o$1`
  \\ (?:
    ${b$1}
    | .
  )
  | \[:(?:\^?\p{Alpha}+|\^):\]
  | ${m$1}
  | &&
  | .
`.replace(/\s+/g, ""), "gsu");
function M$1(e, n = {}) {
	const t = {
		flags: "",
		...n,
		rules: {
			captureGroup: !1,
			singleline: !1,
			...n.rules
		}
	};
	if (typeof e != "string") throw new Error("String expected as pattern");
	const o = Y(t.flags), s = [o.extended], a = {
		captureGroup: t.rules.captureGroup,
		getCurrentModX() {
			return s.at(-1);
		},
		numOpenGroups: 0,
		popModX() {
			s.pop();
		},
		pushModX(u) {
			s.push(u);
		},
		replaceCurrentModX(u) {
			s[s.length - 1] = u;
		},
		singleline: t.rules.singleline
	};
	let r = [], i;
	for (C$1.lastIndex = 0; i = C$1.exec(e);) {
		const u = F$1(a, e, i[0], C$1.lastIndex);
		u.tokens ? r.push(...u.tokens) : u.token && r.push(u.token), u.lastIndex !== void 0 && (C$1.lastIndex = u.lastIndex);
	}
	const l = [];
	let c = 0;
	r.filter((u) => u.type === "GroupOpen").forEach((u) => {
		u.kind === "capturing" ? u.number = ++c : u.raw === "(" && l.push(u);
	}), c || l.forEach((u, S) => {
		u.kind = "capturing", u.number = S + 1;
	});
	const g = c || l.length;
	return {
		tokens: r.map((u) => u.type === "EscapedNumber" ? ee$1(u, g) : u).flat(),
		flags: o
	};
}
function F$1(e, n, t, o) {
	const [s, a] = t;
	if (t === "[" || t === "[^") {
		const r = K$1(n, t, o);
		return {
			tokens: r.tokens,
			lastIndex: r.lastIndex
		};
	}
	if (s === "\\") {
		if ("AbBGyYzZ".includes(a)) return { token: w$1(t, t) };
		if (/^\\g[<']/.test(t)) {
			if (!/^\\g(?:<[^>]+>|'[^']+')$/.test(t)) throw new Error(`Invalid group name "${t}"`);
			return { token: R$1(t) };
		}
		if (/^\\k[<']/.test(t)) {
			if (!/^\\k(?:<[^>]+>|'[^']+')$/.test(t)) throw new Error(`Invalid group name "${t}"`);
			return { token: A$1(t) };
		}
		if (a === "K") return { token: I$1("keep", t) };
		if (a === "N" || a === "R") return { token: k$1("newline", t, { negate: a === "N" }) };
		if (a === "O") return { token: k$1("any", t) };
		if (a === "X") return { token: k$1("text_segment", t) };
		const r = x$1(t, { inCharClass: !1 });
		return Array.isArray(r) ? { tokens: r } : { token: r };
	}
	if (s === "(") {
		if (a === "*") return { token: j(t) };
		if (t === "(?{") throw new Error(`Unsupported callout "${t}"`);
		if (t.startsWith("(?#")) {
			if (n[o] !== ")") throw new Error("Unclosed comment group \"(?#\"");
			return { lastIndex: o + 1 };
		}
		if (/^\(\?[-imx]+[:)]$/.test(t)) return { token: L$1(t, e) };
		if (e.pushModX(e.getCurrentModX()), e.numOpenGroups++, t === "(" && !e.captureGroup || t === "(?:") return { token: f("group", t) };
		if (t === "(?>") return { token: f("atomic", t) };
		if (t === "(?=" || t === "(?!" || t === "(?<=" || t === "(?<!") return { token: f(t[2] === "<" ? "lookbehind" : "lookahead", t, { negate: t.endsWith("!") }) };
		if (t === "(" && e.captureGroup || t.startsWith("(?<") && t.endsWith(">") || t.startsWith("(?'") && t.endsWith("'")) return { token: f("capturing", t, { ...t !== "(" && { name: t.slice(3, -1) } }) };
		if (t.startsWith("(?~")) {
			if (t === "(?~|") throw new Error(`Unsupported absence function kind "${t}"`);
			return { token: f("absence_repeater", t) };
		}
		throw t === "(?(" ? /* @__PURE__ */ new Error(`Unsupported conditional "${t}"`) : /* @__PURE__ */ new Error(`Invalid or unsupported group option "${t}"`);
	}
	if (t === ")") {
		if (e.popModX(), e.numOpenGroups--, e.numOpenGroups < 0) throw new Error("Unmatched \")\"");
		return { token: Q$1(t) };
	}
	if (e.getCurrentModX()) {
		if (t === "#") {
			const r = n.indexOf(`
`, o);
			return { lastIndex: r === -1 ? n.length : r };
		}
		if (/^\s$/.test(t)) {
			const r = /\s+/y;
			return r.lastIndex = o, { lastIndex: r.exec(n) ? r.lastIndex : o };
		}
	}
	if (t === ".") return { token: k$1("dot", t) };
	if (t === "^" || t === "$") return { token: w$1(e.singleline ? {
		"^": o$1`\A`,
		$: o$1`\Z`
	}[t] : t, t) };
	return t === "|" ? { token: P$1(t) } : y$1.test(t) ? { tokens: te$1(t) } : { token: d(r$2(t), t) };
}
function K$1(e, n, t) {
	const o = [E$1(n[1] === "^", n)];
	let s = 1, a;
	for (T$1.lastIndex = t; a = T$1.exec(e);) {
		const r = a[0];
		if (r[0] === "[" && r[1] !== ":") s++, o.push(E$1(r[1] === "^", r));
		else if (r === "]") {
			if (o.at(-1).type === "CharacterClassOpen") o.push(d(93, r));
			else if (s--, o.push(z$1(r)), !s) break;
		} else {
			const i = X$1(r);
			Array.isArray(i) ? o.push(...i) : o.push(i);
		}
	}
	return {
		tokens: o,
		lastIndex: T$1.lastIndex || e.length
	};
}
function X$1(e) {
	if (e[0] === "\\") return x$1(e, { inCharClass: !0 });
	if (e[0] === "[") {
		const n = /\[:(?<negate>\^?)(?<name>[a-z]+):\]/.exec(e);
		if (!n || !i.has(n.groups.name)) throw new Error(`Invalid POSIX class "${e}"`);
		return k$1("posix", e, {
			value: n.groups.name,
			negate: !!n.groups.negate
		});
	}
	return e === "-" ? U$1(e) : e === "&&" ? H(e) : d(r$2(e), e);
}
function x$1(e, { inCharClass: n }) {
	const t = e[1];
	if (t === "c" || t === "C") return Z(e);
	if ("dDhHsSwW".includes(t)) return q(e);
	if (e.startsWith(o$1`\o{`)) throw new Error(`Incomplete, invalid, or unsupported octal code point "${e}"`);
	if (/^\\[pP]\{/.test(e)) {
		if (e.length === 3) throw new Error(`Incomplete or invalid Unicode property "${e}"`);
		return V$1(e);
	}
	if (/^\\x[89A-Fa-f]\p{AHex}/u.test(e)) try {
		const o = e.split(/\\x/).slice(1).map((i) => parseInt(i, 16)), s = new TextDecoder("utf-8", {
			ignoreBOM: !0,
			fatal: !0
		}).decode(new Uint8Array(o)), a = new TextEncoder();
		return [...s].map((i) => {
			const l = [...a.encode(i)].map((c) => `\\x${c.toString(16)}`).join("");
			return d(r$2(i), l);
		});
	} catch {
		throw new Error(`Multibyte code "${e}" incomplete or invalid in Oniguruma`);
	}
	if (t === "u" || t === "x") return d(J$1(e), e);
	if ($$1.has(t)) return d($$1.get(t), e);
	if (/\d/.test(t)) return W$1(n, e);
	if (e === "\\") throw new Error(o$1`Incomplete escape "\"`);
	if (t === "M") throw new Error(`Unsupported meta "${e}"`);
	if ([...e].length === 2) return d(e.codePointAt(1), e);
	throw new Error(`Unexpected escape "${e}"`);
}
function P$1(e) {
	return {
		type: "Alternator",
		raw: e
	};
}
function w$1(e, n) {
	return {
		type: "Assertion",
		kind: e,
		raw: n
	};
}
function A$1(e) {
	return {
		type: "Backreference",
		raw: e
	};
}
function d(e, n) {
	return {
		type: "Character",
		value: e,
		raw: n
	};
}
function z$1(e) {
	return {
		type: "CharacterClassClose",
		raw: e
	};
}
function U$1(e) {
	return {
		type: "CharacterClassHyphen",
		raw: e
	};
}
function H(e) {
	return {
		type: "CharacterClassIntersector",
		raw: e
	};
}
function E$1(e, n) {
	return {
		type: "CharacterClassOpen",
		negate: e,
		raw: n
	};
}
function k$1(e, n, t = {}) {
	return {
		type: "CharacterSet",
		kind: e,
		...t,
		raw: n
	};
}
function I$1(e, n, t = {}) {
	return e === "keep" ? {
		type: "Directive",
		kind: e,
		raw: n
	} : {
		type: "Directive",
		kind: e,
		flags: u(t.flags),
		raw: n
	};
}
function W$1(e, n) {
	return {
		type: "EscapedNumber",
		inCharClass: e,
		raw: n
	};
}
function Q$1(e) {
	return {
		type: "GroupClose",
		raw: e
	};
}
function f(e, n, t = {}) {
	return {
		type: "GroupOpen",
		kind: e,
		...t,
		raw: n
	};
}
function D$1(e, n, t, o) {
	return {
		type: "NamedCallout",
		kind: e,
		tag: n,
		arguments: t,
		raw: o
	};
}
function _$1(e, n, t, o) {
	return {
		type: "Quantifier",
		kind: e,
		min: n,
		max: t,
		raw: o
	};
}
function R$1(e) {
	return {
		type: "Subroutine",
		raw: e
	};
}
var B$1 = /* @__PURE__ */ new Set([
	"COUNT",
	"CMP",
	"ERROR",
	"FAIL",
	"MAX",
	"MISMATCH",
	"SKIP",
	"TOTAL_COUNT"
]), $$1 = /* @__PURE__ */ new Map([
	["a", 7],
	["b", 8],
	["e", 27],
	["f", 12],
	["n", 10],
	["r", 13],
	["t", 9],
	["v", 11]
]);
function Z(e) {
	const n = e[1] === "c" ? e[2] : e[3];
	if (!n || !/[A-Za-z]/.test(n)) throw new Error(`Unsupported control character "${e}"`);
	return d(r$2(n.toUpperCase()) - 64, e);
}
function L$1(e, n) {
	let { on: t, off: o } = /^\(\?(?<on>[imx]*)(?:-(?<off>[-imx]*))?/.exec(e).groups;
	o ??= "";
	const s = (n.getCurrentModX() || t.includes("x")) && !o.includes("x"), a = v(t), r = v(o), i = {};
	if (a && (i.enable = a), r && (i.disable = r), e.endsWith(")")) return n.replaceCurrentModX(s), I$1("flags", e, { flags: i });
	if (e.endsWith(":")) return n.pushModX(s), n.numOpenGroups++, f("group", e, { ...(a || r) && { flags: i } });
	throw new Error(`Unexpected flag modifier "${e}"`);
}
function j(e) {
	const n = /\(\*(?<name>[A-Za-z_]\w*)?(?:\[(?<tag>(?:[A-Za-z_]\w*)?)\])?(?:\{(?<args>[^}]*)\})?\)/.exec(e);
	if (!n) throw new Error(`Incomplete or invalid named callout "${e}"`);
	const { name: t, tag: o, args: s } = n.groups;
	if (!t) throw new Error(`Invalid named callout "${e}"`);
	if (o === "") throw new Error(`Named callout tag with empty value not allowed "${e}"`);
	const a = s ? s.split(",").filter((g) => g !== "").map((g) => /^[+-]?\d+$/.test(g) ? +g : g) : [], [r, i, l] = a, c = B$1.has(t) ? t.toLowerCase() : "custom";
	switch (c) {
		case "fail":
		case "mismatch":
		case "skip":
			if (a.length > 0) throw new Error(`Named callout arguments not allowed "${a}"`);
			break;
		case "error":
			if (a.length > 1) throw new Error(`Named callout allows only one argument "${a}"`);
			if (typeof r == "string") throw new Error(`Named callout argument must be a number "${r}"`);
			break;
		case "max":
			if (!a.length || a.length > 2) throw new Error(`Named callout must have one or two arguments "${a}"`);
			if (typeof r == "string" && !/^[A-Za-z_]\w*$/.test(r)) throw new Error(`Named callout argument one must be a tag or number "${r}"`);
			if (a.length === 2 && (typeof i == "number" || !/^[<>X]$/.test(i))) throw new Error(`Named callout optional argument two must be '<', '>', or 'X' "${i}"`);
			break;
		case "count":
		case "total_count":
			if (a.length > 1) throw new Error(`Named callout allows only one argument "${a}"`);
			if (a.length === 1 && (typeof r == "number" || !/^[<>X]$/.test(r))) throw new Error(`Named callout optional argument must be '<', '>', or 'X' "${r}"`);
			break;
		case "cmp":
			if (a.length !== 3) throw new Error(`Named callout must have three arguments "${a}"`);
			if (typeof r == "string" && !/^[A-Za-z_]\w*$/.test(r)) throw new Error(`Named callout argument one must be a tag or number "${r}"`);
			if (typeof i == "number" || !/^(?:[<>!=]=|[<>])$/.test(i)) throw new Error(`Named callout argument two must be '==', '!=', '>', '<', '>=', or '<=' "${i}"`);
			if (typeof l == "string" && !/^[A-Za-z_]\w*$/.test(l)) throw new Error(`Named callout argument three must be a tag or number "${l}"`);
			break;
		case "custom": throw new Error(`Undefined callout name "${t}"`);
		default: throw new Error(`Unexpected named callout kind "${c}"`);
	}
	return D$1(c, o ?? null, s?.split(",") ?? null, e);
}
function O$1(e) {
	let n = null, t, o;
	if (e[0] === "{") {
		const { minStr: s, maxStr: a } = /^\{(?<minStr>\d*)(?:,(?<maxStr>\d*))?/.exec(e).groups, r = 1e5;
		if (+s > r || a && +a > r) throw new Error("Quantifier value unsupported in Oniguruma");
		if (t = +s, o = a === void 0 ? +s : a === "" ? Infinity : +a, t > o && (n = "possessive", [t, o] = [o, t]), e.endsWith("?")) {
			if (n === "possessive") throw new Error("Unsupported possessive interval quantifier chain with \"?\"");
			n = "lazy";
		} else n || (n = "greedy");
	} else t = e[0] === "+" ? 1 : 0, o = e[0] === "?" ? 1 : Infinity, n = e[1] === "+" ? "possessive" : e[1] === "?" ? "lazy" : "greedy";
	return _$1(n, t, o, e);
}
function q(e) {
	const n = e[1].toLowerCase();
	return k$1({
		d: "digit",
		h: "hex",
		s: "space",
		w: "word"
	}[n], e, { negate: e[1] !== n });
}
function V$1(e) {
	const { p: n, neg: t, value: o } = /^\\(?<p>[pP])\{(?<neg>\^?)(?<value>[^}]+)/.exec(e).groups;
	return k$1("property", e, {
		value: o,
		negate: n === "P" && !t || n === "p" && !!t
	});
}
function v(e) {
	const n = {};
	return e.includes("i") && (n.ignoreCase = !0), e.includes("m") && (n.dotAll = !0), e.includes("x") && (n.extended = !0), Object.keys(n).length ? n : null;
}
function Y(e) {
	const n = {
		ignoreCase: !1,
		dotAll: !1,
		extended: !1,
		digitIsAscii: !1,
		posixIsAscii: !1,
		spaceIsAscii: !1,
		wordIsAscii: !1,
		textSegmentMode: null
	};
	for (let t = 0; t < e.length; t++) {
		const o = e[t];
		if (!"imxDPSWy".includes(o)) throw new Error(`Invalid flag "${o}"`);
		if (o === "y") {
			if (!/^y{[gw]}/.test(e.slice(t))) throw new Error("Invalid or unspecified flag \"y\" mode");
			n.textSegmentMode = e[t + 2] === "g" ? "grapheme" : "word", t += 3;
			continue;
		}
		n[{
			i: "ignoreCase",
			m: "dotAll",
			x: "extended",
			D: "digitIsAscii",
			P: "posixIsAscii",
			S: "spaceIsAscii",
			W: "wordIsAscii"
		}[o]] = !0;
	}
	return n;
}
function J$1(e) {
	if (/^(?:\\u(?!\p{AHex}{4})|\\x(?!\p{AHex}{1,2}|\{\p{AHex}{1,8}\}))/u.test(e)) throw new Error(`Incomplete or invalid escape "${e}"`);
	const n = e[2] === "{" ? /^\\x\{\s*(?<hex>\p{AHex}+)/u.exec(e).groups.hex : e.slice(2);
	return parseInt(n, 16);
}
function ee$1(e, n) {
	const { raw: t, inCharClass: o } = e, s = t.slice(1);
	if (!o && (s !== "0" && s.length === 1 || s[0] !== "0" && +s <= n)) return [A$1(t)];
	const a = [], r = s.match(/^[0-7]+|\d/g);
	for (let i = 0; i < r.length; i++) {
		const l = r[i];
		let c;
		if (i === 0 && l !== "8" && l !== "9") {
			if (c = parseInt(l, 8), c > 127) throw new Error(o$1`Octal encoded byte above 177 unsupported "${t}"`);
		} else c = r$2(l);
		a.push(d(c, (i === 0 ? "\\" : "") + l));
	}
	return a;
}
function te$1(e) {
	const n = [], t = new RegExp(y$1, "gy");
	let o;
	for (; o = t.exec(e);) {
		const s = o[0];
		if (s[0] === "{") {
			const a = /^\{(?<min>\d+),(?<max>\d+)\}\??$/.exec(s);
			if (a) {
				const { min: r, max: i } = a.groups;
				if (+r > +i && s.endsWith("?")) {
					t.lastIndex--, n.push(O$1(s.slice(0, -1)));
					continue;
				}
			}
		}
		n.push(O$1(s));
	}
	return n;
}
//#endregion
//#region node_modules/.pnpm/oniguruma-parser@0.12.2/node_modules/oniguruma-parser/dist/parser/node-utils.js
function o(e, t) {
	if (!Array.isArray(e.body)) throw new Error("Expected node with body array");
	if (e.body.length !== 1) return !1;
	const r = e.body[0];
	return !t || Object.keys(t).every((n) => t[n] === r[n]);
}
function s(e) {
	return y.has(e.type);
}
var y = /* @__PURE__ */ new Set([
	"AbsenceFunction",
	"Backreference",
	"CapturingGroup",
	"Character",
	"CharacterClass",
	"CharacterSet",
	"Group",
	"Quantifier",
	"Subroutine"
]);
//#endregion
//#region node_modules/.pnpm/oniguruma-parser@0.12.2/node_modules/oniguruma-parser/dist/parser/parse.js
function J(e, r = {}) {
	const n = {
		flags: "",
		normalizeUnknownPropertyNames: !1,
		skipBackrefValidation: !1,
		skipLookbehindValidation: !1,
		skipPropertyNameValidation: !1,
		unicodePropertyMap: null,
		...r,
		rules: {
			captureGroup: !1,
			singleline: !1,
			...r.rules
		}
	}, o = M$1(e, {
		flags: n.flags,
		rules: {
			captureGroup: n.rules.captureGroup,
			singleline: n.rules.singleline
		}
	}), i = (p, N) => {
		const u = o.tokens[t.nextIndex];
		switch (t.parent = p, t.nextIndex++, u.type) {
			case "Alternator": return b();
			case "Assertion": return W(u);
			case "Backreference": return X(u, t);
			case "Character": return m(u.value, { useLastValid: !!N.isCheckingRangeEnd });
			case "CharacterClassHyphen": return ee(u, t, N);
			case "CharacterClassOpen": return re(u, t, N);
			case "CharacterSet": return ne(u, t);
			case "Directive": return I(u.kind, { flags: u.flags });
			case "GroupOpen": return te(u, t, N);
			case "NamedCallout": return U(u.kind, u.tag, u.arguments);
			case "Quantifier": return oe(u, t);
			case "Subroutine": return ae(u, t);
			default: throw new Error(`Unexpected token type "${u.type}"`);
		}
	}, t = {
		capturingGroups: [],
		hasNumberedRef: !1,
		namedGroupsByName: /* @__PURE__ */ new Map(),
		nextIndex: 0,
		normalizeUnknownPropertyNames: n.normalizeUnknownPropertyNames,
		parent: null,
		skipBackrefValidation: n.skipBackrefValidation,
		skipLookbehindValidation: n.skipLookbehindValidation,
		skipPropertyNameValidation: n.skipPropertyNameValidation,
		subroutines: [],
		tokens: o.tokens,
		unicodePropertyMap: n.unicodePropertyMap,
		walk: i
	}, d = B(T(o.flags));
	let s = d.body[0];
	for (; t.nextIndex < o.tokens.length;) {
		const p = i(s, {});
		p.type === "Alternative" ? (d.body.push(p), s = p) : s.body.push(p);
	}
	const { capturingGroups: a, hasNumberedRef: l, namedGroupsByName: c, subroutines: f } = t;
	if (l && c.size && !n.rules.captureGroup) throw new Error("Numbered backref/subroutine not allowed when using named capture");
	for (const { ref: p } of f) if (typeof p == "number") {
		if (p > a.length) throw new Error("Subroutine uses a group number that's not defined");
		p && (a[p - 1].isSubroutined = !0);
	} else if (c.has(p)) {
		if (c.get(p).length > 1) throw new Error(o$1`Subroutine uses a duplicate group name "\g<${p}>"`);
		c.get(p)[0].isSubroutined = !0;
	} else throw new Error(o$1`Subroutine uses a group name that's not defined "\g<${p}>"`);
	return d;
}
function W({ kind: e }) {
	return F(u({
		"^": "line_start",
		$: "line_end",
		"\\A": "string_start",
		"\\b": "word_boundary",
		"\\B": "word_boundary",
		"\\G": "search_start",
		"\\y": "text_segment_boundary",
		"\\Y": "text_segment_boundary",
		"\\z": "string_end",
		"\\Z": "string_end_newline"
	}[e], `Unexpected assertion kind "${e}"`), { negate: e === o$1`\B` || e === o$1`\Y` });
}
function X({ raw: e }, r) {
	const n = /^\\k[<']/.test(e), o = n ? e.slice(3, -1) : e.slice(1), i = (t, d = !1) => {
		const s = r.capturingGroups.length;
		let a = !1;
		if (t > s) if (r.skipBackrefValidation) a = !0;
		else throw new Error(`Not enough capturing groups defined to the left "${e}"`);
		return r.hasNumberedRef = !0, k(d ? s + 1 - t : t, { orphan: a });
	};
	if (n) {
		const t = /^(?<sign>-?)0*(?<num>[1-9]\d*)$/.exec(o);
		if (t) return i(+t.groups.num, !!t.groups.sign);
		if (/[-+]/.test(o)) throw new Error(`Invalid backref name "${e}"`);
		if (!r.namedGroupsByName.has(o)) throw new Error(`Group name not defined to the left "${e}"`);
		return k(o);
	}
	return i(+o);
}
function ee(e, r, n) {
	const { tokens: o, walk: i } = r, t = r.parent, d = t.body.at(-1), s = o[r.nextIndex];
	if (!n.isCheckingRangeEnd && d && d.type !== "CharacterClass" && d.type !== "CharacterClassRange" && s && s.type !== "CharacterClassOpen" && s.type !== "CharacterClassClose" && s.type !== "CharacterClassIntersector") {
		const a = i(t, {
			...n,
			isCheckingRangeEnd: !0
		});
		if (d.type === "Character" && a.type === "Character") return t.body.pop(), L(d, a);
		throw new Error("Invalid character class range");
	}
	return m(r$2("-"));
}
function re({ negate: e }, r, n) {
	const { tokens: o, walk: i } = r, t = [C()], d = o[r.nextIndex];
	let s = z(d);
	for (; s.type !== "CharacterClassClose";) {
		if (s.type === "CharacterClassIntersector") t.push(C()), r.nextIndex++;
		else {
			const l = t.at(-1);
			l.body.push(i(l, n));
		}
		s = z(o[r.nextIndex], d);
	}
	const a = C({ negate: e });
	return t.length === 1 ? a.body = t[0].body : (a.kind = "intersection", a.body = t.map((l) => l.body.length === 1 ? l.body[0] : l)), r.nextIndex++, a;
}
function ne({ kind: e, negate: r, value: n }, o) {
	const { normalizeUnknownPropertyNames: i$1, skipPropertyNameValidation: t, unicodePropertyMap: d } = o;
	if (e === "property") {
		const s = w(n);
		if (i.has(s) && !d?.has(s)) e = "posix", n = s;
		else return Q(n, {
			negate: r,
			normalizeUnknownPropertyNames: i$1,
			skipPropertyNameValidation: t,
			unicodePropertyMap: d
		});
	}
	return e === "posix" ? R(n, { negate: r }) : E(e, { negate: r });
}
function te(e, r, n) {
	const { tokens: o, capturingGroups: i, namedGroupsByName: t, skipLookbehindValidation: d, walk: s } = r, a = ie(e), l = a.type === "AbsenceFunction", c = $(a), f = c && a.negate;
	if (a.type === "CapturingGroup" && (i.push(a), a.name && l$1(t, a.name, []).push(a)), l && n.isInAbsenceFunction) throw new Error("Nested absence function not supported by Oniguruma");
	let p = D(o[r.nextIndex]);
	for (; p.type !== "GroupClose";) {
		if (p.type === "Alternator") a.body.push(b()), r.nextIndex++;
		else {
			const N = a.body.at(-1), u = s(N, {
				...n,
				isInAbsenceFunction: n.isInAbsenceFunction || l,
				isInLookbehind: n.isInLookbehind || c,
				isInNegLookbehind: n.isInNegLookbehind || f
			});
			if (N.body.push(u), (c || n.isInLookbehind) && !d) {
				const v = "Lookbehind includes a pattern not allowed by Oniguruma";
				if (f || n.isInNegLookbehind) {
					if (M(u) || u.type === "CapturingGroup") throw new Error(v);
				} else if (M(u) || $(u) && u.negate) throw new Error(v);
			}
		}
		p = D(o[r.nextIndex]);
	}
	return r.nextIndex++, a;
}
function oe({ kind: e, min: r, max: n }, o) {
	const i = o.parent, t = i.body.at(-1);
	if (!t || !s(t)) throw new Error("Quantifier requires a repeatable token");
	const d = _(e, r, n, t);
	return i.body.pop(), d;
}
function ae({ raw: e }, r) {
	const { capturingGroups: n, subroutines: o } = r;
	let i = e.slice(3, -1);
	const t = /^(?<sign>[-+]?)0*(?<num>[1-9]\d*)$/.exec(i);
	if (t) {
		const s = +t.groups.num, a = n.length;
		if (r.hasNumberedRef = !0, i = {
			"": s,
			"+": a + s,
			"-": a + 1 - s
		}[t.groups.sign], i < 1) throw new Error("Invalid subroutine number");
	} else i === "0" && (i = 0);
	const d = O(i);
	return o.push(d), d;
}
function G(e, r) {
	if (e !== "repeater") throw new Error(`Unexpected absence function kind "${e}"`);
	return {
		type: "AbsenceFunction",
		kind: e,
		body: h(r?.body)
	};
}
function b(e) {
	return {
		type: "Alternative",
		body: V(e?.body)
	};
}
function F(e, r) {
	const n = {
		type: "Assertion",
		kind: e
	};
	return (e === "word_boundary" || e === "text_segment_boundary") && (n.negate = !!r?.negate), n;
}
function k(e, r) {
	const n = !!r?.orphan;
	return {
		type: "Backreference",
		ref: e,
		...n && { orphan: n }
	};
}
function P(e, r) {
	const n = {
		name: void 0,
		isSubroutined: !1,
		...r
	};
	if (n.name !== void 0 && !se(n.name)) throw new Error(`Group name "${n.name}" invalid in Oniguruma`);
	return {
		type: "CapturingGroup",
		number: e,
		...n.name && { name: n.name },
		...n.isSubroutined && { isSubroutined: n.isSubroutined },
		body: h(r?.body)
	};
}
function m(e, r) {
	const n = {
		useLastValid: !1,
		...r
	};
	if (e > 1114111) {
		const o = e.toString(16);
		if (n.useLastValid) e = 1114111;
		else throw e > 1310719 ? /* @__PURE__ */ new Error(`Invalid code point out of range "\\x{${o}}"`) : /* @__PURE__ */ new Error(`Invalid code point out of range in JS "\\x{${o}}"`);
	}
	return {
		type: "Character",
		value: e
	};
}
function C(e) {
	const r = {
		kind: "union",
		negate: !1,
		...e
	};
	return {
		type: "CharacterClass",
		kind: r.kind,
		negate: r.negate,
		body: V(e?.body)
	};
}
function L(e, r) {
	if (r.value < e.value) throw new Error("Character class range out of order");
	return {
		type: "CharacterClassRange",
		min: e,
		max: r
	};
}
function E(e, r) {
	const n = !!r?.negate, o = {
		type: "CharacterSet",
		kind: e
	};
	return (e === "digit" || e === "hex" || e === "newline" || e === "space" || e === "word") && (o.negate = n), (e === "text_segment" || e === "newline" && !n) && (o.variableLength = !0), o;
}
function I(e, r = {}) {
	if (e === "keep") return {
		type: "Directive",
		kind: e
	};
	if (e === "flags") return {
		type: "Directive",
		kind: e,
		flags: u(r.flags)
	};
	throw new Error(`Unexpected directive kind "${e}"`);
}
function T(e) {
	return {
		type: "Flags",
		...e
	};
}
function A(e) {
	const r = e?.atomic, n = e?.flags;
	if (r && n) throw new Error("Atomic group cannot have flags");
	return {
		type: "Group",
		...r && { atomic: r },
		...n && { flags: n },
		body: h(e?.body)
	};
}
function K(e) {
	const r = {
		behind: !1,
		negate: !1,
		...e
	};
	return {
		type: "LookaroundAssertion",
		kind: r.behind ? "lookbehind" : "lookahead",
		negate: r.negate,
		body: h(e?.body)
	};
}
function U(e, r, n) {
	return {
		type: "NamedCallout",
		kind: e,
		tag: r,
		arguments: n
	};
}
function R(e, r) {
	const n = !!r?.negate;
	if (!i.has(e)) throw new Error(`Invalid POSIX class "${e}"`);
	return {
		type: "CharacterSet",
		kind: "posix",
		value: e,
		negate: n
	};
}
function _(e, r, n, o) {
	if (r > n) throw new Error("Invalid reversed quantifier range");
	return {
		type: "Quantifier",
		kind: e,
		min: r,
		max: n,
		body: o
	};
}
function B(e, r) {
	return {
		type: "Regex",
		body: h(r?.body),
		flags: e
	};
}
function O(e) {
	return {
		type: "Subroutine",
		ref: e
	};
}
function Q(e, r) {
	const n = {
		negate: !1,
		normalizeUnknownPropertyNames: !1,
		skipPropertyNameValidation: !1,
		unicodePropertyMap: null,
		...r
	};
	let o = n.unicodePropertyMap?.get(w(e));
	if (!o) {
		if (n.normalizeUnknownPropertyNames) o = de(e);
		else if (n.unicodePropertyMap && !n.skipPropertyNameValidation) throw new Error(o$1`Invalid Unicode property "\p{${e}}"`);
	}
	return {
		type: "CharacterSet",
		kind: "property",
		value: o ?? e,
		negate: n.negate
	};
}
function ie({ flags: e, kind: r, name: n, negate: o, number: i }) {
	switch (r) {
		case "absence_repeater": return G("repeater");
		case "atomic": return A({ atomic: !0 });
		case "capturing": return P(i, { name: n });
		case "group": return A({ flags: e });
		case "lookahead":
		case "lookbehind": return K({
			behind: r === "lookbehind",
			negate: o
		});
		default: throw new Error(`Unexpected group kind "${r}"`);
	}
}
function h(e) {
	if (e === void 0) e = [b()];
	else if (!Array.isArray(e) || !e.length || !e.every((r) => r.type === "Alternative")) throw new Error("Invalid body; expected array of one or more Alternative nodes");
	return e;
}
function V(e) {
	if (e === void 0) e = [];
	else if (!Array.isArray(e) || !e.every((r) => !!r.type)) throw new Error("Invalid body; expected array of nodes");
	return e;
}
function M(e) {
	return e.type === "LookaroundAssertion" && e.kind === "lookahead";
}
function $(e) {
	return e.type === "LookaroundAssertion" && e.kind === "lookbehind";
}
function se(e) {
	return /^[\p{Alpha}\p{Pc}][^)]*$/u.test(e);
}
function de(e) {
	return e.trim().replace(/[- _]+/g, "_").replace(/[A-Z][a-z]+(?=[A-Z])/g, "$&_").replace(/[A-Za-z]+/g, (r) => r[0].toUpperCase() + r.slice(1).toLowerCase());
}
function w(e) {
	return e.replace(/[- _]+/g, "").toLowerCase();
}
function z(e, r) {
	const n = r;
	return u(e, `Unclosed character class${n?.type === "Character" && n.value === 93 && n.raw === "]" ? " (started with \"]\")" : ""}`);
}
function D(e) {
	return u(e, "Unclosed group");
}
//#endregion
//#region node_modules/.pnpm/oniguruma-parser@0.12.2/node_modules/oniguruma-parser/dist/traverser/traverse.js
function S(a, v, N = null) {
	function b(e, s) {
		for (let t = 0; t < e.length; t++) {
			const r = n(e[t], s, t, e);
			t = Math.max(-1, t + r);
		}
	}
	function n(e, s = null, t = null, r = null) {
		let i = 0, c = !1;
		const d = {
			node: e,
			parent: s,
			key: t,
			container: r,
			root: a,
			remove() {
				x(r).splice(Math.max(0, l(t) + i), 1), i--, c = !0;
			},
			removeAllNextSiblings() {
				return x(r).splice(l(t) + 1);
			},
			removeAllPrevSiblings() {
				const o = l(t) + i;
				return i -= o, x(r).splice(0, Math.max(0, o));
			},
			replaceWith(o, m = {}) {
				const y = !!m.traverse;
				r ? r[Math.max(0, l(t) + i)] = o : u(s, "Can't replace root node")[t] = o, y && n(o, s, t, r), c = !0;
			},
			replaceWithMultiple(o, m = {}) {
				const y = !!m.traverse;
				if (x(r).splice(Math.max(0, l(t) + i), 1, ...o), i += o.length - 1, y) {
					let g = 0;
					for (let p = 0; p < o.length; p++) g += n(o[p], s, l(t) + p + g, r);
				}
				c = !0;
			},
			skip() {
				c = !0;
			}
		}, { type: f } = e, u$1 = v["*"], h = v[f], R = typeof u$1 == "function" ? u$1 : u$1?.enter, P = typeof h == "function" ? h : h?.enter;
		if (R?.(d, N), P?.(d, N), !c) switch (f) {
			case "AbsenceFunction":
			case "Alternative":
			case "CapturingGroup":
			case "CharacterClass":
			case "Group":
			case "LookaroundAssertion":
				b(e.body, e);
				break;
			case "Assertion":
			case "Backreference":
			case "Character":
			case "CharacterSet":
			case "Directive":
			case "Flags":
			case "NamedCallout":
			case "Subroutine": break;
			case "CharacterClassRange":
				n(e.min, e, "min"), n(e.max, e, "max");
				break;
			case "Quantifier":
				n(e.body, e, "body");
				break;
			case "Regex":
				b(e.body, e), n(e.flags, e, "flags");
				break;
			default: throw new Error(`Unexpected node type "${f}"`);
		}
		return h?.exit?.(d, N), u$1?.exit?.(d, N), i;
	}
	return n(a), a;
}
function x(a) {
	if (!Array.isArray(a)) throw new Error("Container expected");
	return a;
}
function l(a) {
	if (typeof a != "number") throw new Error("Numeric key expected");
	return a;
}
//#endregion
//#region node_modules/.pnpm/regex@6.1.0/node_modules/regex/src/utils-internals.js
var noncapturingDelim = String.raw`\(\?(?:[:=!>A-Za-z\-]|<[=!]|\(DEFINE\))`;
/**
Updates the array in place by incrementing each value greater than or equal to the threshold.
@param {Array<number>} arr
@param {number} threshold
*/
function incrementIfAtLeast$1(arr, threshold) {
	for (let i = 0; i < arr.length; i++) if (arr[i] >= threshold) arr[i]++;
}
/**
@param {string} str
@param {number} pos
@param {string} oldValue
@param {string} newValue
@returns {string}
*/
function spliceStr(str, pos, oldValue, newValue) {
	return str.slice(0, pos) + newValue + str.slice(pos + oldValue.length);
}
//#endregion
//#region node_modules/.pnpm/regex-utilities@2.3.0/node_modules/regex-utilities/src/index.js
var Context = Object.freeze({
	DEFAULT: "DEFAULT",
	CHAR_CLASS: "CHAR_CLASS"
});
/**
Replaces all unescaped instances of a regex pattern in the given context, using a replacement
string or callback.

Doesn't skip over complete multicharacter tokens (only `\` plus its folowing char) so must be used
with knowledge of what's safe to do given regex syntax. Assumes UnicodeSets-mode syntax.
@param {string} expression Search target
@param {string} needle Search as a regex pattern, with flags `su` applied
@param {string | (match: RegExpExecArray, details: {
context: 'DEFAULT' | 'CHAR_CLASS';
negated: boolean;
}) => string} replacement
@param {'DEFAULT' | 'CHAR_CLASS'} [context] All contexts if not specified
@returns {string} Updated expression
@example
const str = '.\\.\\\\.[[\\.].].';
replaceUnescaped(str, '\\.', '@');
// → '@\\.\\\\@[[\\.]@]@'
replaceUnescaped(str, '\\.', '@', Context.DEFAULT);
// → '@\\.\\\\@[[\\.].]@'
replaceUnescaped(str, '\\.', '@', Context.CHAR_CLASS);
// → '.\\.\\\\.[[\\.]@].'
*/
function replaceUnescaped(expression, needle, replacement, context) {
	const re = new RegExp(String.raw`${needle}|(?<$skip>\[\^?|\\?.)`, "gsu");
	const negated = [false];
	let numCharClassesOpen = 0;
	let result = "";
	for (const match of expression.matchAll(re)) {
		const { 0: m, groups: { $skip } } = match;
		if (!$skip && (!context || context === Context.DEFAULT === !numCharClassesOpen)) {
			if (replacement instanceof Function) result += replacement(match, {
				context: numCharClassesOpen ? Context.CHAR_CLASS : Context.DEFAULT,
				negated: negated[negated.length - 1]
			});
			else result += replacement;
			continue;
		}
		if (m[0] === "[") {
			numCharClassesOpen++;
			negated.push(m[1] === "^");
		} else if (m === "]" && numCharClassesOpen) {
			numCharClassesOpen--;
			negated.pop();
		}
		result += m;
	}
	return result;
}
/**
Runs a callback for each unescaped instance of a regex pattern in the given context.

Doesn't skip over complete multicharacter tokens (only `\` plus its folowing char) so must be used
with knowledge of what's safe to do given regex syntax. Assumes UnicodeSets-mode syntax.
@param {string} expression Search target
@param {string} needle Search as a regex pattern, with flags `su` applied
@param {(match: RegExpExecArray, details: {
context: 'DEFAULT' | 'CHAR_CLASS';
negated: boolean;
}) => void} callback
@param {'DEFAULT' | 'CHAR_CLASS'} [context] All contexts if not specified
*/
function forEachUnescaped(expression, needle, callback, context) {
	replaceUnescaped(expression, needle, callback, context);
}
/**
Returns a match object for the first unescaped instance of a regex pattern in the given context, or
`null`.

Doesn't skip over complete multicharacter tokens (only `\` plus its folowing char) so must be used
with knowledge of what's safe to do given regex syntax. Assumes UnicodeSets-mode syntax.
@param {string} expression Search target
@param {string} needle Search as a regex pattern, with flags `su` applied
@param {number} [pos] Offset to start the search
@param {'DEFAULT' | 'CHAR_CLASS'} [context] All contexts if not specified
@returns {RegExpExecArray | null}
*/
function execUnescaped(expression, needle, pos = 0, context) {
	if (!new RegExp(needle, "su").test(expression)) return null;
	const re = new RegExp(`${needle}|(?<$skip>\\\\?.)`, "gsu");
	re.lastIndex = pos;
	let numCharClassesOpen = 0;
	let match;
	while (match = re.exec(expression)) {
		const { 0: m, groups: { $skip } } = match;
		if (!$skip && (!context || context === Context.DEFAULT === !numCharClassesOpen)) return match;
		if (m === "[") numCharClassesOpen++;
		else if (m === "]" && numCharClassesOpen) numCharClassesOpen--;
		if (re.lastIndex == match.index) re.lastIndex++;
	}
	return null;
}
/**
Checks whether an unescaped instance of a regex pattern appears in the given context.

Doesn't skip over complete multicharacter tokens (only `\` plus its folowing char) so must be used
with knowledge of what's safe to do given regex syntax. Assumes UnicodeSets-mode syntax.
@param {string} expression Search target
@param {string} needle Search as a regex pattern, with flags `su` applied
@param {'DEFAULT' | 'CHAR_CLASS'} [context] All contexts if not specified
@returns {boolean} Whether the pattern was found
*/
function hasUnescaped(expression, needle, context) {
	return !!execUnescaped(expression, needle, 0, context);
}
/**
Extracts the full contents of a group (subpattern) from the given expression, accounting for
escaped characters, nested groups, and character classes. The group is identified by the position
where its contents start (the string index just after the group's opening delimiter). Returns the
rest of the string if the group is unclosed.

Assumes UnicodeSets-mode syntax.
@param {string} expression Search target
@param {number} contentsStartPos
@returns {string}
*/
function getGroupContents(expression, contentsStartPos) {
	const token = /\\?./gsu;
	token.lastIndex = contentsStartPos;
	let contentsEndPos = expression.length;
	let numCharClassesOpen = 0;
	let numGroupsOpen = 1;
	let match;
	while (match = token.exec(expression)) {
		const [m] = match;
		if (m === "[") numCharClassesOpen++;
		else if (!numCharClassesOpen) {
			if (m === "(") numGroupsOpen++;
			else if (m === ")") {
				numGroupsOpen--;
				if (!numGroupsOpen) {
					contentsEndPos = match.index;
					break;
				}
			}
		} else if (m === "]") numCharClassesOpen--;
	}
	return expression.slice(contentsStartPos, contentsEndPos);
}
//#endregion
//#region node_modules/.pnpm/regex@6.1.0/node_modules/regex/src/atomic.js
/**
@import {PluginData, PluginResult} from './regex.js';
*/
var atomicPluginToken = new RegExp(String.raw`(?<noncapturingStart>${noncapturingDelim})|(?<capturingStart>\((?:\?<[^>]+>)?)|\\?.`, "gsu");
/**
Apply transformations for atomic groups: `(?>…)`.
@param {string} expression
@param {PluginData} [data]
@returns {Required<PluginResult>}
*/
function atomic(expression, data) {
	const hiddenCaptures = data?.hiddenCaptures ?? [];
	let captureTransfers = data?.captureTransfers ?? /* @__PURE__ */ new Map();
	if (!/\(\?>/.test(expression)) return {
		pattern: expression,
		captureTransfers,
		hiddenCaptures
	};
	const aGDelim = "(?>";
	const emulatedAGDelim = "(?:(?=(";
	const captureNumMap = [0];
	const addedHiddenCaptures = [];
	let numCapturesBeforeAG = 0;
	let numAGs = 0;
	let aGPos = NaN;
	let hasProcessedAG;
	do {
		hasProcessedAG = false;
		let numCharClassesOpen = 0;
		let numGroupsOpenInAG = 0;
		let inAG = false;
		let match;
		atomicPluginToken.lastIndex = Number.isNaN(aGPos) ? 0 : aGPos + 7;
		while (match = atomicPluginToken.exec(expression)) {
			const { 0: m, index, groups: { capturingStart, noncapturingStart } } = match;
			if (m === "[") numCharClassesOpen++;
			else if (!numCharClassesOpen) {
				if (m === aGDelim && !inAG) {
					aGPos = index;
					inAG = true;
				} else if (inAG && noncapturingStart) numGroupsOpenInAG++;
				else if (capturingStart) if (inAG) numGroupsOpenInAG++;
				else {
					numCapturesBeforeAG++;
					captureNumMap.push(numCapturesBeforeAG + numAGs);
				}
				else if (m === ")" && inAG) {
					if (!numGroupsOpenInAG) {
						numAGs++;
						const addedCaptureNum = numCapturesBeforeAG + numAGs;
						expression = `${expression.slice(0, aGPos)}${emulatedAGDelim}${expression.slice(aGPos + 3, index)}))<$$${addedCaptureNum}>)${expression.slice(index + 1)}`;
						hasProcessedAG = true;
						addedHiddenCaptures.push(addedCaptureNum);
						incrementIfAtLeast$1(hiddenCaptures, addedCaptureNum);
						if (captureTransfers.size) {
							const newCaptureTransfers = /* @__PURE__ */ new Map();
							captureTransfers.forEach((from, to) => {
								newCaptureTransfers.set(to >= addedCaptureNum ? to + 1 : to, from.map((f) => f >= addedCaptureNum ? f + 1 : f));
							});
							captureTransfers = newCaptureTransfers;
						}
						break;
					}
					numGroupsOpenInAG--;
				}
			} else if (m === "]") numCharClassesOpen--;
		}
	} while (hasProcessedAG);
	hiddenCaptures.push(...addedHiddenCaptures);
	expression = replaceUnescaped(expression, String.raw`\\(?<backrefNum>[1-9]\d*)|<\$\$(?<wrappedBackrefNum>\d+)>`, ({ 0: m, groups: { backrefNum, wrappedBackrefNum } }) => {
		if (backrefNum) {
			const bNum = +backrefNum;
			if (bNum > captureNumMap.length - 1) throw new Error(`Backref "${m}" greater than number of captures`);
			return `\\${captureNumMap[bNum]}`;
		}
		return `\\${wrappedBackrefNum}`;
	}, Context.DEFAULT);
	return {
		pattern: expression,
		captureTransfers,
		hiddenCaptures
	};
}
var baseQuantifier = String.raw`(?:[?*+]|\{\d+(?:,\d*)?\})`;
var possessivePluginToken = new RegExp(String.raw`
\\(?: \d+
  | c[A-Za-z]
  | [gk]<[^>]+>
  | [pPu]\{[^\}]+\}
  | u[A-Fa-f\d]{4}
  | x[A-Fa-f\d]{2}
  )
| \((?: \? (?: [:=!>]
  | <(?:[=!]|[^>]+>)
  | [A-Za-z\-]+:
  | \(DEFINE\)
  ))?
| (?<qBase>${baseQuantifier})(?<qMod>[?+]?)(?<invalidQ>[?*+\{]?)
| \\?.
`.replace(/\s+/g, ""), "gsu");
/**
Transform posessive quantifiers into atomic groups. The posessessive quantifiers are:
`?+`, `*+`, `++`, `{N}+`, `{N,}+`, `{N,N}+`.
This follows Java, PCRE, Perl, and Python.
Possessive quantifiers in Oniguruma and Onigmo are only: `?+`, `*+`, `++`.
@param {string} expression
@returns {PluginResult}
*/
function possessive(expression) {
	if (!new RegExp(`${baseQuantifier}\\+`).test(expression)) return { pattern: expression };
	const openGroupIndices = [];
	let lastGroupIndex = null;
	let lastCharClassIndex = null;
	let lastToken = "";
	let numCharClassesOpen = 0;
	let match;
	possessivePluginToken.lastIndex = 0;
	while (match = possessivePluginToken.exec(expression)) {
		const { 0: m, index, groups: { qBase, qMod, invalidQ } } = match;
		if (m === "[") {
			if (!numCharClassesOpen) lastCharClassIndex = index;
			numCharClassesOpen++;
		} else if (m === "]") if (numCharClassesOpen) numCharClassesOpen--;
		else lastCharClassIndex = null;
		else if (!numCharClassesOpen) {
			if (qMod === "+" && lastToken && !lastToken.startsWith("(")) {
				if (invalidQ) throw new Error(`Invalid quantifier "${m}"`);
				let charsAdded = -1;
				if (/^\{\d+\}$/.test(qBase)) expression = spliceStr(expression, index + qBase.length, qMod, "");
				else {
					if (lastToken === ")" || lastToken === "]") {
						const nodeIndex = lastToken === ")" ? lastGroupIndex : lastCharClassIndex;
						if (nodeIndex === null) throw new Error(`Invalid unmatched "${lastToken}"`);
						expression = `${expression.slice(0, nodeIndex)}(?>${expression.slice(nodeIndex, index)}${qBase})${expression.slice(index + m.length)}`;
					} else expression = `${expression.slice(0, index - lastToken.length)}(?>${lastToken}${qBase})${expression.slice(index + m.length)}`;
					charsAdded += 4;
				}
				possessivePluginToken.lastIndex += charsAdded;
			} else if (m[0] === "(") openGroupIndices.push(index);
			else if (m === ")") lastGroupIndex = openGroupIndices.length ? openGroupIndices.pop() : null;
		}
		lastToken = m;
	}
	return { pattern: expression };
}
//#endregion
//#region node_modules/.pnpm/regex-recursion@6.0.2/node_modules/regex-recursion/src/index.js
var r$1 = String.raw;
var recursiveToken = r$1`\(\?R=(?<rDepth>[^\)]+)\)|${r$1`\\g<(?<gRNameOrNum>[^>&]+)&R=(?<gRDepth>[^>]+)>`}`;
var namedCaptureDelim = r$1`\(\?<(?![=!])(?<captureName>[^>]+)>`;
var captureDelim = r$1`${namedCaptureDelim}|(?<unnamed>\()(?!\?)`;
var token = new RegExp(r$1`${namedCaptureDelim}|${recursiveToken}|\(\?|\\?.`, "gsu");
var overlappingRecursionMsg = "Cannot use multiple overlapping recursions";
/**
@param {string} pattern
@param {{
flags?: string;
captureTransfers?: Map<number, Array<number>>;
hiddenCaptures?: Array<number>;
mode?: 'plugin' | 'external';
}} [data]
@returns {{
pattern: string;
captureTransfers: Map<number, Array<number>>;
hiddenCaptures: Array<number>;
}}
*/
function recursion(pattern, data) {
	const { hiddenCaptures, mode } = {
		hiddenCaptures: [],
		mode: "plugin",
		...data
	};
	let captureTransfers = data?.captureTransfers ?? /* @__PURE__ */ new Map();
	if (!new RegExp(recursiveToken, "su").test(pattern)) return {
		pattern,
		captureTransfers,
		hiddenCaptures
	};
	if (mode === "plugin" && hasUnescaped(pattern, r$1`\(\?\(DEFINE\)`, Context.DEFAULT)) throw new Error("DEFINE groups cannot be used with recursion");
	const addedHiddenCaptures = [];
	const hasNumberedBackref = hasUnescaped(pattern, r$1`\\[1-9]`, Context.DEFAULT);
	const groupContentsStartPos = /* @__PURE__ */ new Map();
	const openGroups = [];
	let hasRecursed = false;
	let numCharClassesOpen = 0;
	let numCapturesPassed = 0;
	let match;
	token.lastIndex = 0;
	while (match = token.exec(pattern)) {
		const { 0: m, groups: { captureName, rDepth, gRNameOrNum, gRDepth } } = match;
		if (m === "[") numCharClassesOpen++;
		else if (!numCharClassesOpen) {
			if (rDepth) {
				assertMaxInBounds(rDepth);
				if (hasRecursed) throw new Error(overlappingRecursionMsg);
				if (hasNumberedBackref) throw new Error(`${mode === "external" ? "Backrefs" : "Numbered backrefs"} cannot be used with global recursion`);
				const left = pattern.slice(0, match.index);
				const right = pattern.slice(token.lastIndex);
				if (hasUnescaped(right, recursiveToken, Context.DEFAULT)) throw new Error(overlappingRecursionMsg);
				const reps = +rDepth - 1;
				pattern = makeRecursive(left, right, reps, false, hiddenCaptures, addedHiddenCaptures, numCapturesPassed);
				captureTransfers = mapCaptureTransfers(captureTransfers, left, reps, addedHiddenCaptures.length, 0, numCapturesPassed);
				break;
			} else if (gRNameOrNum) {
				assertMaxInBounds(gRDepth);
				let isWithinReffedGroup = false;
				for (const g of openGroups) if (g.name === gRNameOrNum || g.num === +gRNameOrNum) {
					isWithinReffedGroup = true;
					if (g.hasRecursedWithin) throw new Error(overlappingRecursionMsg);
					break;
				}
				if (!isWithinReffedGroup) throw new Error(r$1`Recursive \g cannot be used outside the referenced group "${mode === "external" ? gRNameOrNum : r$1`\g<${gRNameOrNum}&R=${gRDepth}>`}"`);
				const startPos = groupContentsStartPos.get(gRNameOrNum);
				const groupContents = getGroupContents(pattern, startPos);
				if (hasNumberedBackref && hasUnescaped(groupContents, r$1`${namedCaptureDelim}|\((?!\?)`, Context.DEFAULT)) throw new Error(`${mode === "external" ? "Backrefs" : "Numbered backrefs"} cannot be used with recursion of capturing groups`);
				const groupContentsLeft = pattern.slice(startPos, match.index);
				const groupContentsRight = groupContents.slice(groupContentsLeft.length + m.length);
				const numAddedHiddenCapturesPreExpansion = addedHiddenCaptures.length;
				const reps = +gRDepth - 1;
				const expansion = makeRecursive(groupContentsLeft, groupContentsRight, reps, true, hiddenCaptures, addedHiddenCaptures, numCapturesPassed);
				captureTransfers = mapCaptureTransfers(captureTransfers, groupContentsLeft, reps, addedHiddenCaptures.length - numAddedHiddenCapturesPreExpansion, numAddedHiddenCapturesPreExpansion, numCapturesPassed);
				pattern = `${pattern.slice(0, startPos)}${expansion}${pattern.slice(startPos + groupContents.length)}`;
				token.lastIndex += expansion.length - m.length - groupContentsLeft.length - groupContentsRight.length;
				openGroups.forEach((g) => g.hasRecursedWithin = true);
				hasRecursed = true;
			} else if (captureName) {
				numCapturesPassed++;
				groupContentsStartPos.set(String(numCapturesPassed), token.lastIndex);
				groupContentsStartPos.set(captureName, token.lastIndex);
				openGroups.push({
					num: numCapturesPassed,
					name: captureName
				});
			} else if (m[0] === "(") {
				const isUnnamedCapture = m === "(";
				if (isUnnamedCapture) {
					numCapturesPassed++;
					groupContentsStartPos.set(String(numCapturesPassed), token.lastIndex);
				}
				openGroups.push(isUnnamedCapture ? { num: numCapturesPassed } : {});
			} else if (m === ")") openGroups.pop();
		} else if (m === "]") numCharClassesOpen--;
	}
	hiddenCaptures.push(...addedHiddenCaptures);
	return {
		pattern,
		captureTransfers,
		hiddenCaptures
	};
}
/**
@param {string} max
*/
function assertMaxInBounds(max) {
	const errMsg = `Max depth must be integer between 2 and 100; used ${max}`;
	if (!/^[1-9]\d*$/.test(max)) throw new Error(errMsg);
	max = +max;
	if (max < 2 || max > 100) throw new Error(errMsg);
}
/**
@param {string} left
@param {string} right
@param {number} reps
@param {boolean} isSubpattern
@param {Array<number>} hiddenCaptures
@param {Array<number>} addedHiddenCaptures
@param {number} numCapturesPassed
@returns {string}
*/
function makeRecursive(left, right, reps, isSubpattern, hiddenCaptures, addedHiddenCaptures, numCapturesPassed) {
	const namesInRecursed = /* @__PURE__ */ new Set();
	if (isSubpattern) forEachUnescaped(left + right, namedCaptureDelim, ({ groups: { captureName } }) => {
		namesInRecursed.add(captureName);
	}, Context.DEFAULT);
	const rest = [
		reps,
		isSubpattern ? namesInRecursed : null,
		hiddenCaptures,
		addedHiddenCaptures,
		numCapturesPassed
	];
	return `${left}${repeatWithDepth(`(?:${left}`, "forward", ...rest)}(?:)${repeatWithDepth(`${right})`, "backward", ...rest)}${right}`;
}
/**
@param {string} pattern
@param {'forward' | 'backward'} direction
@param {number} reps
@param {Set<string> | null} namesInRecursed
@param {Array<number>} hiddenCaptures
@param {Array<number>} addedHiddenCaptures
@param {number} numCapturesPassed
@returns {string}
*/
function repeatWithDepth(pattern, direction, reps, namesInRecursed, hiddenCaptures, addedHiddenCaptures, numCapturesPassed) {
	const startNum = 2;
	const getDepthNum = (i) => direction === "forward" ? i + startNum : reps - i + startNum - 1;
	let result = "";
	for (let i = 0; i < reps; i++) {
		const depthNum = getDepthNum(i);
		result += replaceUnescaped(pattern, r$1`${captureDelim}|\\k<(?<backref>[^>]+)>`, ({ 0: m, groups: { captureName, unnamed, backref } }) => {
			if (backref && namesInRecursed && !namesInRecursed.has(backref)) return m;
			const suffix = `_$${depthNum}`;
			if (unnamed || captureName) {
				const addedCaptureNum = numCapturesPassed + addedHiddenCaptures.length + 1;
				addedHiddenCaptures.push(addedCaptureNum);
				incrementIfAtLeast(hiddenCaptures, addedCaptureNum);
				return unnamed ? m : `(?<${captureName}${suffix}>`;
			}
			return r$1`\k<${backref}${suffix}>`;
		}, Context.DEFAULT);
	}
	return result;
}
/**
Updates the array in place by incrementing each value greater than or equal to the threshold.
@param {Array<number>} arr
@param {number} threshold
*/
function incrementIfAtLeast(arr, threshold) {
	for (let i = 0; i < arr.length; i++) if (arr[i] >= threshold) arr[i]++;
}
/**
@param {Map<number, Array<number>>} captureTransfers
@param {string} left
@param {number} reps
@param {number} numCapturesAddedInExpansion
@param {number} numAddedHiddenCapturesPreExpansion
@param {number} numCapturesPassed
@returns {Map<number, Array<number>>}
*/
function mapCaptureTransfers(captureTransfers, left, reps, numCapturesAddedInExpansion, numAddedHiddenCapturesPreExpansion, numCapturesPassed) {
	if (captureTransfers.size && numCapturesAddedInExpansion) {
		let numCapturesInLeft = 0;
		forEachUnescaped(left, captureDelim, () => numCapturesInLeft++, Context.DEFAULT);
		const recursionDelimCaptureNum = numCapturesPassed - numCapturesInLeft + numAddedHiddenCapturesPreExpansion;
		const newCaptureTransfers = /* @__PURE__ */ new Map();
		captureTransfers.forEach((from, to) => {
			const numCapturesInRight = (numCapturesAddedInExpansion - numCapturesInLeft * reps) / reps;
			const numCapturesAddedInLeft = numCapturesInLeft * reps;
			const newTo = to > recursionDelimCaptureNum + numCapturesInLeft ? to + numCapturesAddedInExpansion : to;
			const newFrom = [];
			for (const f of from) if (f <= recursionDelimCaptureNum) newFrom.push(f);
			else if (f > recursionDelimCaptureNum + numCapturesInLeft + numCapturesInRight) newFrom.push(f + numCapturesAddedInExpansion);
			else if (f <= recursionDelimCaptureNum + numCapturesInLeft) for (let i = 0; i <= reps; i++) newFrom.push(f + numCapturesInLeft * i);
			else for (let i = 0; i <= reps; i++) newFrom.push(f + numCapturesAddedInLeft + numCapturesInRight * i);
			newCaptureTransfers.set(newTo, newFrom);
		});
		return newCaptureTransfers;
	}
	return captureTransfers;
}
//#endregion
//#region node_modules/.pnpm/oniguruma-to-es@4.3.6/node_modules/oniguruma-to-es/dist/esm/index.js
var cp = String.fromCodePoint;
var r = String.raw;
var envFlags = {};
var globalRegExp = globalThis.RegExp;
envFlags.flagGroups = (() => {
	try {
		new globalRegExp("(?i:)");
	} catch {
		return false;
	}
	return true;
})();
envFlags.unicodeSets = (() => {
	try {
		new globalRegExp("[[]]", "v");
	} catch {
		return false;
	}
	return true;
})();
envFlags.bugFlagVLiteralHyphenIsRange = envFlags.unicodeSets ? (() => {
	try {
		new globalRegExp(r`[\d\-a]`, "v");
	} catch {
		return true;
	}
	return false;
})() : false;
envFlags.bugNestedClassIgnoresNegation = envFlags.unicodeSets && new globalRegExp("[[^a]]", "v").test("a");
function getNewCurrentFlags(current, { enable, disable }) {
	return {
		dotAll: !disable?.dotAll && !!(enable?.dotAll || current.dotAll),
		ignoreCase: !disable?.ignoreCase && !!(enable?.ignoreCase || current.ignoreCase)
	};
}
function getOrInsert(map, key, defaultValue) {
	if (!map.has(key)) map.set(key, defaultValue);
	return map.get(key);
}
function isMinTarget(target, min) {
	return EsVersion[target] >= EsVersion[min];
}
function throwIfNullish(value, msg) {
	if (value == null) throw new Error(msg ?? "Value expected");
	return value;
}
var EsVersion = {
	ES2025: 2025,
	ES2024: 2024,
	ES2018: 2018
};
var Target = (
/** @type {const} */
{
	auto: "auto",
	ES2025: "ES2025",
	ES2024: "ES2024",
	ES2018: "ES2018"
});
function getOptions(options = {}) {
	if ({}.toString.call(options) !== "[object Object]") throw new Error("Unexpected options");
	if (options.target !== void 0 && !Target[options.target]) throw new Error(`Unexpected target "${options.target}"`);
	const opts = {
		accuracy: "default",
		avoidSubclass: false,
		flags: "",
		global: false,
		hasIndices: false,
		lazyCompileLength: Infinity,
		target: "auto",
		verbose: false,
		...options,
		rules: {
			allowOrphanBackrefs: false,
			asciiWordBoundaries: false,
			captureGroup: false,
			recursionLimit: 20,
			singleline: false,
			...options.rules
		}
	};
	if (opts.target === "auto") opts.target = envFlags.flagGroups ? "ES2025" : envFlags.unicodeSets ? "ES2024" : "ES2018";
	return opts;
}
var asciiSpaceChar = "[	-\r ]";
var CharsWithoutIgnoreCaseExpansion = /* @__PURE__ */ new Set([cp(304), cp(305)]);
var defaultWordChar = r`[\p{L}\p{M}\p{N}\p{Pc}]`;
function getIgnoreCaseMatchChars(char) {
	if (CharsWithoutIgnoreCaseExpansion.has(char)) return [char];
	const set = /* @__PURE__ */ new Set();
	const lower = char.toLowerCase();
	const upper = lower.toUpperCase();
	const title = LowerToTitleCaseMap.get(lower);
	const altLower = LowerToAlternativeLowerCaseMap.get(lower);
	const altUpper = LowerToAlternativeUpperCaseMap.get(lower);
	if ([...upper].length === 1) set.add(upper);
	altUpper && set.add(altUpper);
	title && set.add(title);
	set.add(lower);
	altLower && set.add(altLower);
	return [...set];
}
var JsUnicodePropertyMap = /* @__PURE__ */ new Map(`C Other
Cc Control cntrl
Cf Format
Cn Unassigned
Co Private_Use
Cs Surrogate
L Letter
LC Cased_Letter
Ll Lowercase_Letter
Lm Modifier_Letter
Lo Other_Letter
Lt Titlecase_Letter
Lu Uppercase_Letter
M Mark Combining_Mark
Mc Spacing_Mark
Me Enclosing_Mark
Mn Nonspacing_Mark
N Number
Nd Decimal_Number digit
Nl Letter_Number
No Other_Number
P Punctuation punct
Pc Connector_Punctuation
Pd Dash_Punctuation
Pe Close_Punctuation
Pf Final_Punctuation
Pi Initial_Punctuation
Po Other_Punctuation
Ps Open_Punctuation
S Symbol
Sc Currency_Symbol
Sk Modifier_Symbol
Sm Math_Symbol
So Other_Symbol
Z Separator
Zl Line_Separator
Zp Paragraph_Separator
Zs Space_Separator
ASCII
ASCII_Hex_Digit AHex
Alphabetic Alpha
Any
Assigned
Bidi_Control Bidi_C
Bidi_Mirrored Bidi_M
Case_Ignorable CI
Cased
Changes_When_Casefolded CWCF
Changes_When_Casemapped CWCM
Changes_When_Lowercased CWL
Changes_When_NFKC_Casefolded CWKCF
Changes_When_Titlecased CWT
Changes_When_Uppercased CWU
Dash
Default_Ignorable_Code_Point DI
Deprecated Dep
Diacritic Dia
Emoji
Emoji_Component EComp
Emoji_Modifier EMod
Emoji_Modifier_Base EBase
Emoji_Presentation EPres
Extended_Pictographic ExtPict
Extender Ext
Grapheme_Base Gr_Base
Grapheme_Extend Gr_Ext
Hex_Digit Hex
IDS_Binary_Operator IDSB
IDS_Trinary_Operator IDST
ID_Continue IDC
ID_Start IDS
Ideographic Ideo
Join_Control Join_C
Logical_Order_Exception LOE
Lowercase Lower
Math
Noncharacter_Code_Point NChar
Pattern_Syntax Pat_Syn
Pattern_White_Space Pat_WS
Quotation_Mark QMark
Radical
Regional_Indicator RI
Sentence_Terminal STerm
Soft_Dotted SD
Terminal_Punctuation Term
Unified_Ideograph UIdeo
Uppercase Upper
Variation_Selector VS
White_Space space
XID_Continue XIDC
XID_Start XIDS`.split(/\s/).map((p) => [w(p), p]));
var LowerToAlternativeLowerCaseMap = /* @__PURE__ */ new Map([["s", cp(383)], [cp(383), "s"]]);
var LowerToAlternativeUpperCaseMap = /* @__PURE__ */ new Map([
	[cp(223), cp(7838)],
	[cp(107), cp(8490)],
	[cp(229), cp(8491)],
	[cp(969), cp(8486)]
]);
var LowerToTitleCaseMap = new Map([
	titleEntry(453),
	titleEntry(456),
	titleEntry(459),
	titleEntry(498),
	...titleRange(8072, 8079),
	...titleRange(8088, 8095),
	...titleRange(8104, 8111),
	titleEntry(8124),
	titleEntry(8140),
	titleEntry(8188)
]);
var PosixClassMap = /* @__PURE__ */ new Map([
	["alnum", r`[\p{Alpha}\p{Nd}]`],
	["alpha", r`\p{Alpha}`],
	["ascii", r`\p{ASCII}`],
	["blank", r`[\p{Zs}\t]`],
	["cntrl", r`\p{Cc}`],
	["digit", r`\p{Nd}`],
	["graph", r`[\P{space}&&\P{Cc}&&\P{Cn}&&\P{Cs}]`],
	["lower", r`\p{Lower}`],
	["print", r`[[\P{space}&&\P{Cc}&&\P{Cn}&&\P{Cs}]\p{Zs}]`],
	["punct", r`[\p{P}\p{S}]`],
	["space", r`\p{space}`],
	["upper", r`\p{Upper}`],
	["word", r`[\p{Alpha}\p{M}\p{Nd}\p{Pc}]`],
	["xdigit", r`\p{AHex}`]
]);
function range(start, end) {
	const range2 = [];
	for (let i = start; i <= end; i++) range2.push(i);
	return range2;
}
function titleEntry(codePoint) {
	const char = cp(codePoint);
	return [char.toLowerCase(), char];
}
function titleRange(start, end) {
	return range(start, end).map((codePoint) => titleEntry(codePoint));
}
var UnicodePropertiesWithSpecificCase = /* @__PURE__ */ new Set([
	"Lower",
	"Lowercase",
	"Upper",
	"Uppercase",
	"Ll",
	"Lowercase_Letter",
	"Lt",
	"Titlecase_Letter",
	"Lu",
	"Uppercase_Letter"
]);
function transform(ast, options) {
	const opts = {
		accuracy: "default",
		asciiWordBoundaries: false,
		avoidSubclass: false,
		bestEffortTarget: "ES2025",
		...options
	};
	addParentProperties(ast);
	const firstPassState = {
		accuracy: opts.accuracy,
		asciiWordBoundaries: opts.asciiWordBoundaries,
		avoidSubclass: opts.avoidSubclass,
		flagDirectivesByAlt: /* @__PURE__ */ new Map(),
		jsGroupNameMap: /* @__PURE__ */ new Map(),
		minTargetEs2024: isMinTarget(opts.bestEffortTarget, "ES2024"),
		passedLookbehind: false,
		strategy: null,
		subroutineRefMap: /* @__PURE__ */ new Map(),
		supportedGNodes: /* @__PURE__ */ new Set(),
		digitIsAscii: ast.flags.digitIsAscii,
		spaceIsAscii: ast.flags.spaceIsAscii,
		wordIsAscii: ast.flags.wordIsAscii
	};
	S(ast, FirstPassVisitor, firstPassState);
	const globalFlags = {
		dotAll: ast.flags.dotAll,
		ignoreCase: ast.flags.ignoreCase
	};
	const secondPassState = {
		currentFlags: globalFlags,
		prevFlags: null,
		globalFlags,
		groupOriginByCopy: /* @__PURE__ */ new Map(),
		groupsByName: /* @__PURE__ */ new Map(),
		multiplexCapturesToLeftByRef: /* @__PURE__ */ new Map(),
		openRefs: /* @__PURE__ */ new Map(),
		reffedNodesByReferencer: /* @__PURE__ */ new Map(),
		subroutineRefMap: firstPassState.subroutineRefMap
	};
	S(ast, SecondPassVisitor, secondPassState);
	S(ast, ThirdPassVisitor, {
		groupsByName: secondPassState.groupsByName,
		highestOrphanBackref: 0,
		numCapturesToLeft: 0,
		reffedNodesByReferencer: secondPassState.reffedNodesByReferencer
	});
	ast._originMap = secondPassState.groupOriginByCopy;
	ast._strategy = firstPassState.strategy;
	return ast;
}
var FirstPassVisitor = {
	AbsenceFunction({ node, parent, replaceWith }) {
		const { body, kind } = node;
		if (kind === "repeater") {
			const innerGroup = A();
			innerGroup.body[0].body.push(K({
				negate: true,
				body
			}), Q("Any"));
			const outerGroup = A();
			outerGroup.body[0].body.push(_("greedy", 0, Infinity, innerGroup));
			replaceWith(setParentDeep(outerGroup, parent), { traverse: true });
		} else throw new Error(`Unsupported absence function "(?~|"`);
	},
	Alternative: {
		enter({ node, parent, key }, { flagDirectivesByAlt }) {
			const flagDirectives = node.body.filter((el) => el.kind === "flags");
			for (let i = key + 1; i < parent.body.length; i++) {
				const forwardSiblingAlt = parent.body[i];
				getOrInsert(flagDirectivesByAlt, forwardSiblingAlt, []).push(...flagDirectives);
			}
		},
		exit({ node }, { flagDirectivesByAlt }) {
			if (flagDirectivesByAlt.get(node)?.length) {
				const flags = getCombinedFlagModsFromFlagNodes(flagDirectivesByAlt.get(node));
				if (flags) {
					const flagGroup = A({ flags });
					flagGroup.body[0].body = node.body;
					node.body = [setParentDeep(flagGroup, node)];
				}
			}
		}
	},
	Assertion({ node, parent, key, container, root, remove, replaceWith }, state) {
		const { kind, negate } = node;
		const { asciiWordBoundaries, avoidSubclass, supportedGNodes, wordIsAscii } = state;
		if (kind === "text_segment_boundary") throw new Error(`Unsupported text segment boundary "\\${negate ? "Y" : "y"}"`);
		else if (kind === "line_end") replaceWith(setParentDeep(K({ body: [b({ body: [F("string_end")] }), b({ body: [m(10)] })] }), parent));
		else if (kind === "line_start") replaceWith(setParentDeep(parseFragment(r`(?<=\A|\n(?!\z))`, { skipLookbehindValidation: true }), parent));
		else if (kind === "search_start") if (supportedGNodes.has(node)) {
			root.flags.sticky = true;
			remove();
		} else {
			const prev = container[key - 1];
			if (prev && isAlwaysNonZeroLength(prev)) replaceWith(setParentDeep(K({ negate: true }), parent));
			else if (avoidSubclass) throw new Error(r`Uses "\G" in a way that requires a subclass`);
			else {
				replaceWith(setParent(F("string_start"), parent));
				state.strategy = "clip_search";
			}
		}
		else if (kind === "string_end" || kind === "string_start") {} else if (kind === "string_end_newline") replaceWith(setParentDeep(parseFragment(r`(?=\n?\z)`), parent));
		else if (kind === "word_boundary") {
			if (!wordIsAscii && !asciiWordBoundaries) {
				const b = `(?:(?<=${defaultWordChar})(?!${defaultWordChar})|(?<!${defaultWordChar})(?=${defaultWordChar}))`;
				const B = `(?:(?<=${defaultWordChar})(?=${defaultWordChar})|(?<!${defaultWordChar})(?!${defaultWordChar}))`;
				replaceWith(setParentDeep(parseFragment(negate ? B : b), parent));
			}
		} else throw new Error(`Unexpected assertion kind "${kind}"`);
	},
	Backreference({ node }, { jsGroupNameMap }) {
		let { ref } = node;
		if (typeof ref === "string" && !isValidJsGroupName(ref)) {
			ref = getAndStoreJsGroupName(ref, jsGroupNameMap);
			node.ref = ref;
		}
	},
	CapturingGroup({ node }, { jsGroupNameMap, subroutineRefMap }) {
		let { name } = node;
		if (name && !isValidJsGroupName(name)) {
			name = getAndStoreJsGroupName(name, jsGroupNameMap);
			node.name = name;
		}
		subroutineRefMap.set(node.number, node);
		if (name) subroutineRefMap.set(name, node);
	},
	CharacterClassRange({ node, parent, replaceWith }) {
		if (parent.kind === "intersection") replaceWith(setParentDeep(C({ body: [node] }), parent), { traverse: true });
	},
	CharacterSet({ node, parent, replaceWith }, { accuracy, minTargetEs2024, digitIsAscii, spaceIsAscii, wordIsAscii }) {
		const { kind, negate, value } = node;
		if (digitIsAscii && (kind === "digit" || value === "digit")) {
			replaceWith(setParent(E("digit", { negate }), parent));
			return;
		}
		if (spaceIsAscii && (kind === "space" || value === "space")) {
			replaceWith(setParentDeep(setNegate(parseFragment(asciiSpaceChar), negate), parent));
			return;
		}
		if (wordIsAscii && (kind === "word" || value === "word")) {
			replaceWith(setParent(E("word", { negate }), parent));
			return;
		}
		if (kind === "any") replaceWith(setParent(Q("Any"), parent));
		else if (kind === "digit") replaceWith(setParent(Q("Nd", { negate }), parent));
		else if (kind === "dot") {} else if (kind === "text_segment") {
			if (accuracy === "strict") throw new Error(r`Use of "\X" requires non-strict accuracy`);
			const eBase = "\\p{Emoji}(?:\\p{EMod}|\\uFE0F\\u20E3?|[\\x{E0020}-\\x{E007E}]+\\x{E007F})?";
			const emoji = r`\p{RI}{2}|${eBase}(?:\u200D${eBase})*`;
			replaceWith(setParentDeep(parseFragment(r`(?>\r\n|${minTargetEs2024 ? r`\p{RGI_Emoji}` : emoji}|\P{M}\p{M}*)`, { skipPropertyNameValidation: true }), parent));
		} else if (kind === "hex") replaceWith(setParent(Q("AHex", { negate }), parent));
		else if (kind === "newline") replaceWith(setParentDeep(parseFragment(negate ? "[^\n]" : "(?>\r\n?|[\n\v\f\u2028\u2029])"), parent));
		else if (kind === "posix") if (!minTargetEs2024 && (value === "graph" || value === "print")) {
			if (accuracy === "strict") throw new Error(`POSIX class "${value}" requires min target ES2024 or non-strict accuracy`);
			let ascii = {
				graph: "!-~",
				print: " -~"
			}[value];
			if (negate) ascii = `\0-${cp(ascii.codePointAt(0) - 1)}${cp(ascii.codePointAt(2) + 1)}-\u{10FFFF}`;
			replaceWith(setParentDeep(parseFragment(`[${ascii}]`), parent));
		} else replaceWith(setParentDeep(setNegate(parseFragment(PosixClassMap.get(value)), negate), parent));
		else if (kind === "property") {
			if (!JsUnicodePropertyMap.has(w(value))) node.key = "sc";
		} else if (kind === "space") replaceWith(setParent(Q("space", { negate }), parent));
		else if (kind === "word") replaceWith(setParentDeep(setNegate(parseFragment(defaultWordChar), negate), parent));
		else throw new Error(`Unexpected character set kind "${kind}"`);
	},
	Directive({ node, parent, root, remove, replaceWith, removeAllPrevSiblings, removeAllNextSiblings }) {
		const { kind, flags } = node;
		if (kind === "flags") if (!flags.enable && !flags.disable) remove();
		else {
			const flagGroup = A({ flags });
			flagGroup.body[0].body = removeAllNextSiblings();
			replaceWith(setParentDeep(flagGroup, parent), { traverse: true });
		}
		else if (kind === "keep") {
			const firstAlt = root.body[0];
			const topLevel = root.body.length === 1 && o(firstAlt, { type: "Group" }) && firstAlt.body[0].body.length === 1 ? firstAlt.body[0] : root;
			if (parent.parent !== topLevel || topLevel.body.length > 1) throw new Error(r`Uses "\K" in a way that's unsupported`);
			const lookbehind = K({ behind: true });
			lookbehind.body[0].body = removeAllPrevSiblings();
			replaceWith(setParentDeep(lookbehind, parent));
		} else throw new Error(`Unexpected directive kind "${kind}"`);
	},
	Flags({ node, parent }) {
		if (node.posixIsAscii) throw new Error("Unsupported flag \"P\"");
		if (node.textSegmentMode === "word") throw new Error("Unsupported flag \"y{w}\"");
		[
			"digitIsAscii",
			"extended",
			"posixIsAscii",
			"spaceIsAscii",
			"wordIsAscii",
			"textSegmentMode"
		].forEach((f) => delete node[f]);
		Object.assign(node, {
			global: false,
			hasIndices: false,
			multiline: false,
			sticky: node.sticky ?? false
		});
		parent.options = {
			disable: {
				x: true,
				n: true
			},
			force: { v: true }
		};
	},
	Group({ node }) {
		if (!node.flags) return;
		const { enable, disable } = node.flags;
		enable?.extended && delete enable.extended;
		disable?.extended && delete disable.extended;
		enable?.dotAll && disable?.dotAll && delete enable.dotAll;
		enable?.ignoreCase && disable?.ignoreCase && delete enable.ignoreCase;
		enable && !Object.keys(enable).length && delete node.flags.enable;
		disable && !Object.keys(disable).length && delete node.flags.disable;
		!node.flags.enable && !node.flags.disable && delete node.flags;
	},
	LookaroundAssertion({ node }, state) {
		const { kind } = node;
		if (kind === "lookbehind") state.passedLookbehind = true;
	},
	NamedCallout({ node, parent, replaceWith }) {
		const { kind } = node;
		if (kind === "fail") replaceWith(setParentDeep(K({ negate: true }), parent));
		else throw new Error(`Unsupported named callout "(*${kind.toUpperCase()}"`);
	},
	Quantifier({ node }) {
		if (node.body.type === "Quantifier") {
			const group = A();
			group.body[0].body.push(node.body);
			node.body = setParentDeep(group, node);
		}
	},
	Regex: {
		enter({ node }, { supportedGNodes }) {
			const leadingGs = [];
			let hasAltWithLeadG = false;
			let hasAltWithoutLeadG = false;
			for (const alt of node.body) if (alt.body.length === 1 && alt.body[0].kind === "search_start") alt.body.pop();
			else {
				const leadingG = getLeadingG(alt.body);
				if (leadingG) {
					hasAltWithLeadG = true;
					Array.isArray(leadingG) ? leadingGs.push(...leadingG) : leadingGs.push(leadingG);
				} else hasAltWithoutLeadG = true;
			}
			if (hasAltWithLeadG && !hasAltWithoutLeadG) leadingGs.forEach((g) => supportedGNodes.add(g));
		},
		exit(_, { accuracy, passedLookbehind, strategy }) {
			if (accuracy === "strict" && passedLookbehind && strategy) throw new Error(r`Uses "\G" in a way that requires non-strict accuracy`);
		}
	},
	Subroutine({ node }, { jsGroupNameMap }) {
		let { ref } = node;
		if (typeof ref === "string" && !isValidJsGroupName(ref)) {
			ref = getAndStoreJsGroupName(ref, jsGroupNameMap);
			node.ref = ref;
		}
	}
};
var SecondPassVisitor = {
	Backreference({ node }, { multiplexCapturesToLeftByRef, reffedNodesByReferencer }) {
		const { orphan, ref } = node;
		if (!orphan) reffedNodesByReferencer.set(node, [...multiplexCapturesToLeftByRef.get(ref).map(({ node: node2 }) => node2)]);
	},
	CapturingGroup: {
		enter({ node, parent, replaceWith, skip }, { groupOriginByCopy, groupsByName, multiplexCapturesToLeftByRef, openRefs, reffedNodesByReferencer }) {
			const origin = groupOriginByCopy.get(node);
			if (origin && openRefs.has(node.number)) {
				const recursion2 = setParent(createRecursion(node.number), parent);
				reffedNodesByReferencer.set(recursion2, openRefs.get(node.number));
				replaceWith(recursion2);
				return;
			}
			openRefs.set(node.number, node);
			multiplexCapturesToLeftByRef.set(node.number, []);
			if (node.name) getOrInsert(multiplexCapturesToLeftByRef, node.name, []);
			const multiplexNodes = multiplexCapturesToLeftByRef.get(node.name ?? node.number);
			for (let i = 0; i < multiplexNodes.length; i++) {
				const multiplex = multiplexNodes[i];
				if (origin === multiplex.node || origin && origin === multiplex.origin || node === multiplex.origin) {
					multiplexNodes.splice(i, 1);
					break;
				}
			}
			multiplexCapturesToLeftByRef.get(node.number).push({
				node,
				origin
			});
			if (node.name) multiplexCapturesToLeftByRef.get(node.name).push({
				node,
				origin
			});
			if (node.name) {
				const groupsWithSameName = getOrInsert(groupsByName, node.name, /* @__PURE__ */ new Map());
				let hasDuplicateNameToRemove = false;
				if (origin) hasDuplicateNameToRemove = true;
				else for (const groupInfo of groupsWithSameName.values()) if (!groupInfo.hasDuplicateNameToRemove) {
					hasDuplicateNameToRemove = true;
					break;
				}
				groupsByName.get(node.name).set(node, {
					node,
					hasDuplicateNameToRemove
				});
			}
		},
		exit({ node }, { openRefs }) {
			if (openRefs.get(node.number) === node) openRefs.delete(node.number);
		}
	},
	Group: {
		enter({ node }, state) {
			state.prevFlags = state.currentFlags;
			if (node.flags) state.currentFlags = getNewCurrentFlags(state.currentFlags, node.flags);
		},
		exit(_, state) {
			state.currentFlags = state.prevFlags;
		}
	},
	Subroutine({ node, parent, replaceWith }, state) {
		const { isRecursive, ref } = node;
		if (isRecursive) {
			let reffed = parent;
			while (reffed = reffed.parent) if (reffed.type === "CapturingGroup" && (reffed.name === ref || reffed.number === ref)) break;
			state.reffedNodesByReferencer.set(node, reffed);
			return;
		}
		const reffedGroupNode = state.subroutineRefMap.get(ref);
		const isGlobalRecursion = ref === 0;
		const expandedSubroutine = isGlobalRecursion ? createRecursion(0) : cloneCapturingGroup(reffedGroupNode, state.groupOriginByCopy, null);
		let replacement = expandedSubroutine;
		if (!isGlobalRecursion) {
			const reffedGroupFlagMods = getCombinedFlagModsFromFlagNodes(getAllParents(reffedGroupNode, (p) => p.type === "Group" && !!p.flags));
			const reffedGroupFlags = reffedGroupFlagMods ? getNewCurrentFlags(state.globalFlags, reffedGroupFlagMods) : state.globalFlags;
			if (!areFlagsEqual(reffedGroupFlags, state.currentFlags)) {
				replacement = A({ flags: getFlagModsFromFlags(reffedGroupFlags) });
				replacement.body[0].body.push(expandedSubroutine);
			}
		}
		replaceWith(setParentDeep(replacement, parent), { traverse: !isGlobalRecursion });
	}
};
var ThirdPassVisitor = {
	Backreference({ node, parent, replaceWith }, state) {
		if (node.orphan) {
			state.highestOrphanBackref = Math.max(state.highestOrphanBackref, node.ref);
			return;
		}
		const participants = state.reffedNodesByReferencer.get(node).filter((reffed) => canParticipateWithNode(reffed, node));
		if (!participants.length) replaceWith(setParentDeep(K({ negate: true }), parent));
		else if (participants.length > 1) replaceWith(setParentDeep(A({
			atomic: true,
			body: participants.reverse().map((reffed) => b({ body: [k(reffed.number)] }))
		}), parent));
		else node.ref = participants[0].number;
	},
	CapturingGroup({ node }, state) {
		node.number = ++state.numCapturesToLeft;
		if (node.name) {
			if (state.groupsByName.get(node.name).get(node).hasDuplicateNameToRemove) delete node.name;
		}
	},
	Regex: { exit({ node }, state) {
		const numCapsNeeded = Math.max(state.highestOrphanBackref - state.numCapturesToLeft, 0);
		for (let i = 0; i < numCapsNeeded; i++) {
			const emptyCapture = P();
			node.body.at(-1).body.push(emptyCapture);
		}
	} },
	Subroutine({ node }, state) {
		if (!node.isRecursive || node.ref === 0) return;
		node.ref = state.reffedNodesByReferencer.get(node).number;
	}
};
function addParentProperties(root) {
	S(root, { "*"({ node, parent }) {
		node.parent = parent;
	} });
}
function areFlagsEqual(a, b) {
	return a.dotAll === b.dotAll && a.ignoreCase === b.ignoreCase;
}
function canParticipateWithNode(capture, node) {
	let rightmostPoint = node;
	do {
		if (rightmostPoint.type === "Regex") return false;
		if (rightmostPoint.type === "Alternative") continue;
		if (rightmostPoint === capture) return false;
		const kidsOfParent = getKids(rightmostPoint.parent);
		for (const kid of kidsOfParent) {
			if (kid === rightmostPoint) break;
			if (kid === capture || isAncestorOf(kid, capture)) return true;
		}
	} while (rightmostPoint = rightmostPoint.parent);
	throw new Error("Unexpected path");
}
function cloneCapturingGroup(obj, originMap, up, up2) {
	const store = Array.isArray(obj) ? [] : {};
	for (const [key, value] of Object.entries(obj)) if (key === "parent") store.parent = Array.isArray(up) ? up2 : up;
	else if (value && typeof value === "object") store[key] = cloneCapturingGroup(value, originMap, store, up);
	else {
		if (key === "type" && value === "CapturingGroup") originMap.set(store, originMap.get(obj) ?? obj);
		store[key] = value;
	}
	return store;
}
function createRecursion(ref) {
	const node = O(ref);
	node.isRecursive = true;
	return node;
}
function getAllParents(node, filterFn) {
	const results = [];
	while (node = node.parent) if (!filterFn || filterFn(node)) results.push(node);
	return results;
}
function getAndStoreJsGroupName(name, map) {
	if (map.has(name)) return map.get(name);
	const jsName = `$${map.size}_${name.replace(/^[^$_\p{IDS}]|[^$\u200C\u200D\p{IDC}]/gu, "_")}`;
	map.set(name, jsName);
	return jsName;
}
function getCombinedFlagModsFromFlagNodes(flagNodes) {
	const flagProps = ["dotAll", "ignoreCase"];
	const combinedFlags = {
		enable: {},
		disable: {}
	};
	flagNodes.forEach(({ flags }) => {
		flagProps.forEach((prop) => {
			if (flags.enable?.[prop]) {
				delete combinedFlags.disable[prop];
				combinedFlags.enable[prop] = true;
			}
			if (flags.disable?.[prop]) combinedFlags.disable[prop] = true;
		});
	});
	if (!Object.keys(combinedFlags.enable).length) delete combinedFlags.enable;
	if (!Object.keys(combinedFlags.disable).length) delete combinedFlags.disable;
	if (combinedFlags.enable || combinedFlags.disable) return combinedFlags;
	return null;
}
function getFlagModsFromFlags({ dotAll, ignoreCase }) {
	const mods = {};
	if (dotAll || ignoreCase) {
		mods.enable = {};
		dotAll && (mods.enable.dotAll = true);
		ignoreCase && (mods.enable.ignoreCase = true);
	}
	if (!dotAll || !ignoreCase) {
		mods.disable = {};
		!dotAll && (mods.disable.dotAll = true);
		!ignoreCase && (mods.disable.ignoreCase = true);
	}
	return mods;
}
function getKids(node) {
	if (!node) throw new Error("Node expected");
	const { body } = node;
	return Array.isArray(body) ? body : body ? [body] : null;
}
function getLeadingG(els) {
	const firstToConsider = els.find((el) => el.kind === "search_start" || isLoneGLookaround(el, { negate: false }) || !isAlwaysZeroLength(el));
	if (!firstToConsider) return null;
	if (firstToConsider.kind === "search_start") return firstToConsider;
	if (firstToConsider.type === "LookaroundAssertion") return firstToConsider.body[0].body[0];
	if (firstToConsider.type === "CapturingGroup" || firstToConsider.type === "Group") {
		const gNodesForGroup = [];
		for (const alt of firstToConsider.body) {
			const leadingG = getLeadingG(alt.body);
			if (!leadingG) return null;
			Array.isArray(leadingG) ? gNodesForGroup.push(...leadingG) : gNodesForGroup.push(leadingG);
		}
		return gNodesForGroup;
	}
	return null;
}
function isAncestorOf(node, descendant) {
	const kids = getKids(node) ?? [];
	for (const kid of kids) if (kid === descendant || isAncestorOf(kid, descendant)) return true;
	return false;
}
function isAlwaysZeroLength({ type }) {
	return type === "Assertion" || type === "Directive" || type === "LookaroundAssertion";
}
function isAlwaysNonZeroLength(node) {
	const types = [
		"Character",
		"CharacterClass",
		"CharacterSet"
	];
	return types.includes(node.type) || node.type === "Quantifier" && node.min && types.includes(node.body.type);
}
function isLoneGLookaround(node, options) {
	const opts = {
		negate: null,
		...options
	};
	return node.type === "LookaroundAssertion" && (opts.negate === null || node.negate === opts.negate) && node.body.length === 1 && o(node.body[0], {
		type: "Assertion",
		kind: "search_start"
	});
}
function isValidJsGroupName(name) {
	return /^[$_\p{IDS}][$\u200C\u200D\p{IDC}]*$/u.test(name);
}
function parseFragment(pattern, options) {
	const alts = J(pattern, {
		...options,
		unicodePropertyMap: JsUnicodePropertyMap
	}).body;
	if (alts.length > 1 || alts[0].body.length > 1) return A({ body: alts });
	return alts[0].body[0];
}
function setNegate(node, negate) {
	node.negate = negate;
	return node;
}
function setParent(node, parent) {
	node.parent = parent;
	return node;
}
function setParentDeep(node, parent) {
	addParentProperties(node);
	node.parent = parent;
	return node;
}
function generate(ast, options) {
	const opts = getOptions(options);
	const minTargetEs2024 = isMinTarget(opts.target, "ES2024");
	const minTargetEs2025 = isMinTarget(opts.target, "ES2025");
	const recursionLimit = opts.rules.recursionLimit;
	if (!Number.isInteger(recursionLimit) || recursionLimit < 2 || recursionLimit > 20) throw new Error("Invalid recursionLimit; use 2-20");
	let hasCaseInsensitiveNode = null;
	let hasCaseSensitiveNode = null;
	if (!minTargetEs2025) {
		const iStack = [ast.flags.ignoreCase];
		S(ast, FlagModifierVisitor, {
			getCurrentModI: () => iStack.at(-1),
			popModI() {
				iStack.pop();
			},
			pushModI(isIOn) {
				iStack.push(isIOn);
			},
			setHasCasedChar() {
				if (iStack.at(-1)) hasCaseInsensitiveNode = true;
				else hasCaseSensitiveNode = true;
			}
		});
	}
	const appliedGlobalFlags = {
		dotAll: ast.flags.dotAll,
		ignoreCase: !!((ast.flags.ignoreCase || hasCaseInsensitiveNode) && !hasCaseSensitiveNode)
	};
	let lastNode = ast;
	const state = {
		accuracy: opts.accuracy,
		appliedGlobalFlags,
		captureMap: /* @__PURE__ */ new Map(),
		currentFlags: {
			dotAll: ast.flags.dotAll,
			ignoreCase: ast.flags.ignoreCase
		},
		inCharClass: false,
		lastNode,
		originMap: ast._originMap,
		recursionLimit,
		useAppliedIgnoreCase: !!(!minTargetEs2025 && hasCaseInsensitiveNode && hasCaseSensitiveNode),
		useFlagMods: minTargetEs2025,
		useFlagV: minTargetEs2024,
		verbose: opts.verbose
	};
	function gen(node) {
		state.lastNode = lastNode;
		lastNode = node;
		return throwIfNullish(generator[node.type], `Unexpected node type "${node.type}"`)(node, state, gen);
	}
	const result = {
		pattern: ast.body.map(gen).join("|"),
		flags: gen(ast.flags),
		options: { ...ast.options }
	};
	if (!minTargetEs2024) {
		delete result.options.force.v;
		result.options.disable.v = true;
		result.options.unicodeSetsPlugin = null;
	}
	result._captureTransfers = /* @__PURE__ */ new Map();
	result._hiddenCaptures = [];
	state.captureMap.forEach((value, key) => {
		if (value.hidden) result._hiddenCaptures.push(key);
		if (value.transferTo) getOrInsert(result._captureTransfers, value.transferTo, []).push(key);
	});
	return result;
}
var FlagModifierVisitor = {
	"*": {
		enter({ node }, state) {
			if (isAnyGroup(node)) {
				const currentModI = state.getCurrentModI();
				state.pushModI(node.flags ? getNewCurrentFlags({ ignoreCase: currentModI }, node.flags).ignoreCase : currentModI);
			}
		},
		exit({ node }, state) {
			if (isAnyGroup(node)) state.popModI();
		}
	},
	Backreference(_, state) {
		state.setHasCasedChar();
	},
	Character({ node }, state) {
		if (charHasCase(cp(node.value))) state.setHasCasedChar();
	},
	CharacterClassRange({ node, skip }, state) {
		skip();
		if (getCasesOutsideCharClassRange(node, { firstOnly: true }).length) state.setHasCasedChar();
	},
	CharacterSet({ node }, state) {
		if (node.kind === "property" && UnicodePropertiesWithSpecificCase.has(node.value)) state.setHasCasedChar();
	}
};
var generator = {
	/**
	@param {AlternativeNode} node
	*/
	Alternative({ body }, _, gen) {
		return body.map(gen).join("");
	},
	/**
	@param {AssertionNode} node
	*/
	Assertion({ kind, negate }) {
		if (kind === "string_end") return "$";
		if (kind === "string_start") return "^";
		if (kind === "word_boundary") return negate ? r`\B` : r`\b`;
		throw new Error(`Unexpected assertion kind "${kind}"`);
	},
	/**
	@param {BackreferenceNode} node
	*/
	Backreference({ ref }, state) {
		if (typeof ref !== "number") throw new Error("Unexpected named backref in transformed AST");
		if (!state.useFlagMods && state.accuracy === "strict" && state.currentFlags.ignoreCase && !state.captureMap.get(ref).ignoreCase) throw new Error("Use of case-insensitive backref to case-sensitive group requires target ES2025 or non-strict accuracy");
		return "\\" + ref;
	},
	/**
	@param {CapturingGroupNode} node
	*/
	CapturingGroup(node, state, gen) {
		const { body, name, number } = node;
		const data = { ignoreCase: state.currentFlags.ignoreCase };
		const origin = state.originMap.get(node);
		if (origin) {
			data.hidden = true;
			if (number > origin.number) data.transferTo = origin.number;
		}
		state.captureMap.set(number, data);
		return `(${name ? `?<${name}>` : ""}${body.map(gen).join("|")})`;
	},
	/**
	@param {CharacterNode} node
	*/
	Character({ value }, state) {
		const char = cp(value);
		const escaped = getCharEscape(value, {
			escDigit: state.lastNode.type === "Backreference",
			inCharClass: state.inCharClass,
			useFlagV: state.useFlagV
		});
		if (escaped !== char) return escaped;
		if (state.useAppliedIgnoreCase && state.currentFlags.ignoreCase && charHasCase(char)) {
			const cases = getIgnoreCaseMatchChars(char);
			return state.inCharClass ? cases.join("") : cases.length > 1 ? `[${cases.join("")}]` : cases[0];
		}
		return char;
	},
	/**
	@param {CharacterClassNode} node
	*/
	CharacterClass(node, state, gen) {
		const { kind, negate, parent } = node;
		let { body } = node;
		if (kind === "intersection" && !state.useFlagV) throw new Error("Use of character class intersection requires min target ES2024");
		if (envFlags.bugFlagVLiteralHyphenIsRange && state.useFlagV && body.some(isLiteralHyphen)) body = [m(45), ...body.filter((kid) => !isLiteralHyphen(kid))];
		const genClass = () => `[${negate ? "^" : ""}${body.map(gen).join(kind === "intersection" ? "&&" : "")}]`;
		if (!state.inCharClass) {
			if ((!state.useFlagV || envFlags.bugNestedClassIgnoresNegation) && !negate) {
				const negatedChildClasses = body.filter((kid) => kid.type === "CharacterClass" && kid.kind === "union" && kid.negate);
				if (negatedChildClasses.length) {
					const group = A();
					const groupFirstAlt = group.body[0];
					group.parent = parent;
					groupFirstAlt.parent = group;
					body = body.filter((kid) => !negatedChildClasses.includes(kid));
					node.body = body;
					if (body.length) {
						node.parent = groupFirstAlt;
						groupFirstAlt.body.push(node);
					} else group.body.pop();
					negatedChildClasses.forEach((cc) => {
						const newAlt = b({ body: [cc] });
						cc.parent = newAlt;
						newAlt.parent = group;
						group.body.push(newAlt);
					});
					return gen(group);
				}
			}
			state.inCharClass = true;
			const result = genClass();
			state.inCharClass = false;
			return result;
		}
		const firstEl = body[0];
		if (kind === "union" && !negate && firstEl && ((!state.useFlagV || !state.verbose) && parent.kind === "union" && !(envFlags.bugFlagVLiteralHyphenIsRange && state.useFlagV) || !state.verbose && parent.kind === "intersection" && body.length === 1 && firstEl.type !== "CharacterClassRange")) return body.map(gen).join("");
		if (!state.useFlagV && parent.type === "CharacterClass") throw new Error("Uses nested character class in a way that requires min target ES2024");
		return genClass();
	},
	/**
	@param {CharacterClassRangeNode} node
	*/
	CharacterClassRange(node, state) {
		const min = node.min.value;
		const max = node.max.value;
		const escOpts = {
			escDigit: false,
			inCharClass: true,
			useFlagV: state.useFlagV
		};
		const minStr = getCharEscape(min, escOpts);
		const maxStr = getCharEscape(max, escOpts);
		const extraChars = /* @__PURE__ */ new Set();
		if (state.useAppliedIgnoreCase && state.currentFlags.ignoreCase) getCodePointRangesFromChars(getCasesOutsideCharClassRange(node)).forEach((value) => {
			extraChars.add(Array.isArray(value) ? `${getCharEscape(value[0], escOpts)}-${getCharEscape(value[1], escOpts)}` : getCharEscape(value, escOpts));
		});
		return `${minStr}-${maxStr}${[...extraChars].join("")}`;
	},
	/**
	@param {CharacterSetNode} node
	*/
	CharacterSet({ kind, negate, value, key }, state) {
		if (kind === "dot") return state.currentFlags.dotAll ? state.appliedGlobalFlags.dotAll || state.useFlagMods ? "." : "[^]" : r`[^\n]`;
		if (kind === "digit") return negate ? r`\D` : r`\d`;
		if (kind === "property") {
			if (state.useAppliedIgnoreCase && state.currentFlags.ignoreCase && UnicodePropertiesWithSpecificCase.has(value)) throw new Error(`Unicode property "${value}" can't be case-insensitive when other chars have specific case`);
			return `${negate ? r`\P` : r`\p`}{${key ? `${key}=` : ""}${value}}`;
		}
		if (kind === "word") return negate ? r`\W` : r`\w`;
		throw new Error(`Unexpected character set kind "${kind}"`);
	},
	/**
	@param {FlagsNode} node
	*/
	Flags(node, state) {
		return (state.appliedGlobalFlags.ignoreCase ? "i" : "") + (node.dotAll ? "s" : "") + (node.sticky ? "y" : "");
	},
	/**
	@param {GroupNode} node
	*/
	Group({ atomic: atomic2, body, flags, parent }, state, gen) {
		const currentFlags = state.currentFlags;
		if (flags) state.currentFlags = getNewCurrentFlags(currentFlags, flags);
		const contents = body.map(gen).join("|");
		const result = !state.verbose && body.length === 1 && parent.type !== "Quantifier" && !atomic2 && (!state.useFlagMods || !flags) ? contents : `(?${getGroupPrefix(atomic2, flags, state.useFlagMods)}${contents})`;
		state.currentFlags = currentFlags;
		return result;
	},
	/**
	@param {LookaroundAssertionNode} node
	*/
	LookaroundAssertion({ body, kind, negate }, _, gen) {
		return `(?${`${kind === "lookahead" ? "" : "<"}${negate ? "!" : "="}`}${body.map(gen).join("|")})`;
	},
	/**
	@param {QuantifierNode} node
	*/
	Quantifier(node, _, gen) {
		return gen(node.body) + getQuantifierStr(node);
	},
	/**
	@param {SubroutineNode & {isRecursive: true}} node
	*/
	Subroutine({ isRecursive, ref }, state) {
		if (!isRecursive) throw new Error("Unexpected non-recursive subroutine in transformed AST");
		const limit = state.recursionLimit;
		return ref === 0 ? `(?R=${limit})` : r`\g<${ref}&R=${limit}>`;
	}
};
var BaseEscapeChars = /* @__PURE__ */ new Set([
	"$",
	"(",
	")",
	"*",
	"+",
	".",
	"?",
	"[",
	"\\",
	"]",
	"^",
	"{",
	"|",
	"}"
]);
var CharClassEscapeChars = /* @__PURE__ */ new Set([
	"-",
	"\\",
	"]",
	"^",
	"["
]);
var CharClassEscapeCharsFlagV = /* @__PURE__ */ new Set([
	"(",
	")",
	"-",
	"/",
	"[",
	"\\",
	"]",
	"^",
	"{",
	"|",
	"}",
	"!",
	"#",
	"$",
	"%",
	"&",
	"*",
	"+",
	",",
	".",
	":",
	";",
	"<",
	"=",
	">",
	"?",
	"@",
	"`",
	"~"
]);
var CharCodeEscapeMap = /* @__PURE__ */ new Map([
	[9, r`\t`],
	[10, r`\n`],
	[11, r`\v`],
	[12, r`\f`],
	[13, r`\r`],
	[8232, r`\u2028`],
	[8233, r`\u2029`],
	[65279, r`\uFEFF`]
]);
var casedRe = /^\p{Cased}$/u;
function charHasCase(char) {
	return casedRe.test(char);
}
function getCasesOutsideCharClassRange(node, options) {
	const firstOnly = !!options?.firstOnly;
	const min = node.min.value;
	const max = node.max.value;
	const found = [];
	if (min < 65 && (max === 65535 || max >= 131071) || min === 65536 && max >= 131071) return found;
	for (let i = min; i <= max; i++) {
		const char = cp(i);
		if (!charHasCase(char)) continue;
		const charsOutsideRange = getIgnoreCaseMatchChars(char).filter((caseOfChar) => {
			const num = caseOfChar.codePointAt(0);
			return num < min || num > max;
		});
		if (charsOutsideRange.length) {
			found.push(...charsOutsideRange);
			if (firstOnly) break;
		}
	}
	return found;
}
function getCharEscape(codePoint, { escDigit, inCharClass, useFlagV }) {
	if (CharCodeEscapeMap.has(codePoint)) return CharCodeEscapeMap.get(codePoint);
	if (codePoint < 32 || codePoint > 126 && codePoint < 160 || codePoint > 262143 || escDigit && isDigitCharCode(codePoint)) return codePoint > 255 ? `\\u{${codePoint.toString(16).toUpperCase()}}` : `\\x${codePoint.toString(16).toUpperCase().padStart(2, "0")}`;
	const escapeChars = inCharClass ? useFlagV ? CharClassEscapeCharsFlagV : CharClassEscapeChars : BaseEscapeChars;
	const char = cp(codePoint);
	return (escapeChars.has(char) ? "\\" : "") + char;
}
function getCodePointRangesFromChars(chars) {
	const codePoints = chars.map((char) => char.codePointAt(0)).sort((a, b) => a - b);
	const values = [];
	let start = null;
	for (let i = 0; i < codePoints.length; i++) if (codePoints[i + 1] === codePoints[i] + 1) start ??= codePoints[i];
	else if (start === null) values.push(codePoints[i]);
	else {
		values.push([start, codePoints[i]]);
		start = null;
	}
	return values;
}
function getGroupPrefix(atomic2, flagMods, useFlagMods) {
	if (atomic2) return ">";
	let mods = "";
	if (flagMods && useFlagMods) {
		const { enable, disable } = flagMods;
		mods = (enable?.ignoreCase ? "i" : "") + (enable?.dotAll ? "s" : "") + (disable ? "-" : "") + (disable?.ignoreCase ? "i" : "") + (disable?.dotAll ? "s" : "");
	}
	return `${mods}:`;
}
function getQuantifierStr({ kind, max, min }) {
	let base;
	if (!min && max === 1) base = "?";
	else if (!min && max === Infinity) base = "*";
	else if (min === 1 && max === Infinity) base = "+";
	else if (min === max) base = `{${min}}`;
	else base = `{${min},${max === Infinity ? "" : max}}`;
	return base + {
		greedy: "",
		lazy: "?",
		possessive: "+"
	}[kind];
}
function isAnyGroup({ type }) {
	return type === "CapturingGroup" || type === "Group" || type === "LookaroundAssertion";
}
function isDigitCharCode(value) {
	return value > 47 && value < 58;
}
function isLiteralHyphen({ type, value }) {
	return type === "Character" && value === 45;
}
var EmulatedRegExp = class _EmulatedRegExp extends RegExp {
	/**
	@type {Map<number, {
	hidden?: true;
	transferTo?: number;
	}>}
	*/
	#captureMap = /* @__PURE__ */ new Map();
	/**
	@type {RegExp | EmulatedRegExp | null}
	*/
	#compiled = null;
	/**
	@type {string}
	*/
	#pattern;
	/**
	@type {Map<number, string>?}
	*/
	#nameMap = null;
	/**
	@type {string?}
	*/
	#strategy = null;
	/**
	Can be used to serialize the instance.
	@type {EmulatedRegExpOptions}
	*/
	rawOptions = {};
	get source() {
		return this.#pattern || "(?:)";
	}
	/**
	@overload
	@param {string} pattern
	@param {string} [flags]
	@param {EmulatedRegExpOptions} [options]
	*/
	/**
	@overload
	@param {EmulatedRegExp} pattern
	@param {string} [flags]
	*/
	constructor(pattern, flags, options) {
		const lazyCompile = !!options?.lazyCompile;
		if (pattern instanceof RegExp) {
			if (options) throw new Error("Cannot provide options when copying a regexp");
			const re = pattern;
			super(re, flags);
			this.#pattern = re.source;
			if (re instanceof _EmulatedRegExp) {
				this.#captureMap = re.#captureMap;
				this.#nameMap = re.#nameMap;
				this.#strategy = re.#strategy;
				this.rawOptions = re.rawOptions;
			}
		} else {
			const opts = {
				hiddenCaptures: [],
				strategy: null,
				transfers: [],
				...options
			};
			super(lazyCompile ? "" : pattern, flags);
			this.#pattern = pattern;
			this.#captureMap = createCaptureMap(opts.hiddenCaptures, opts.transfers);
			this.#strategy = opts.strategy;
			this.rawOptions = options ?? {};
		}
		if (!lazyCompile) this.#compiled = this;
	}
	/**
	Called internally by all String/RegExp methods that use regexes.
	@override
	@param {string} str
	@returns {RegExpExecArray?}
	*/
	exec(str) {
		if (!this.#compiled) {
			const { lazyCompile, ...rest } = this.rawOptions;
			this.#compiled = new _EmulatedRegExp(this.#pattern, this.flags, rest);
		}
		const useLastIndex = this.global || this.sticky;
		const pos = this.lastIndex;
		if (this.#strategy === "clip_search" && useLastIndex && pos) {
			this.lastIndex = 0;
			const match = this.#execCore(str.slice(pos));
			if (match) {
				adjustMatchDetailsForOffset(match, pos, str, this.hasIndices);
				this.lastIndex += pos;
			}
			return match;
		}
		return this.#execCore(str);
	}
	/**
	Adds support for hidden and transfer captures.
	@param {string} str
	@returns
	*/
	#execCore(str) {
		this.#compiled.lastIndex = this.lastIndex;
		const match = super.exec.call(this.#compiled, str);
		this.lastIndex = this.#compiled.lastIndex;
		if (!match || !this.#captureMap.size) return match;
		const matchCopy = [...match];
		match.length = 1;
		let indicesCopy;
		if (this.hasIndices) {
			indicesCopy = [...match.indices];
			match.indices.length = 1;
		}
		const mappedNums = [0];
		for (let i = 1; i < matchCopy.length; i++) {
			const { hidden, transferTo } = this.#captureMap.get(i) ?? {};
			if (hidden) mappedNums.push(null);
			else {
				mappedNums.push(match.length);
				match.push(matchCopy[i]);
				if (this.hasIndices) match.indices.push(indicesCopy[i]);
			}
			if (transferTo && matchCopy[i] !== void 0) {
				const to = mappedNums[transferTo];
				if (!to) throw new Error(`Invalid capture transfer to "${to}"`);
				match[to] = matchCopy[i];
				if (this.hasIndices) match.indices[to] = indicesCopy[i];
				if (match.groups) {
					if (!this.#nameMap) this.#nameMap = createNameMap(this.source);
					const name = this.#nameMap.get(transferTo);
					if (name) {
						match.groups[name] = matchCopy[i];
						if (this.hasIndices) match.indices.groups[name] = indicesCopy[i];
					}
				}
			}
		}
		return match;
	}
};
function adjustMatchDetailsForOffset(match, offset, input, hasIndices) {
	match.index += offset;
	match.input = input;
	if (hasIndices) {
		const indices = match.indices;
		for (let i = 0; i < indices.length; i++) {
			const arr = indices[i];
			if (arr) indices[i] = [arr[0] + offset, arr[1] + offset];
		}
		const groupIndices = indices.groups;
		if (groupIndices) Object.keys(groupIndices).forEach((key) => {
			const arr = groupIndices[key];
			if (arr) groupIndices[key] = [arr[0] + offset, arr[1] + offset];
		});
	}
}
function createCaptureMap(hiddenCaptures, transfers) {
	const captureMap = /* @__PURE__ */ new Map();
	for (const num of hiddenCaptures) captureMap.set(num, { hidden: true });
	for (const [to, from] of transfers) for (const num of from) getOrInsert(captureMap, num, {}).transferTo = to;
	return captureMap;
}
function createNameMap(pattern) {
	const re = /(?<capture>\((?:\?<(?![=!])(?<name>[^>]+)>|(?!\?)))|\\?./gsu;
	const map = /* @__PURE__ */ new Map();
	let numCharClassesOpen = 0;
	let numCaptures = 0;
	let match;
	while (match = re.exec(pattern)) {
		const { 0: m, groups: { capture, name } } = match;
		if (m === "[") numCharClassesOpen++;
		else if (!numCharClassesOpen) {
			if (capture) {
				numCaptures++;
				if (name) map.set(numCaptures, name);
			}
		} else if (m === "]") numCharClassesOpen--;
	}
	return map;
}
function toRegExp(pattern, options) {
	const d = toRegExpDetails(pattern, options);
	if (d.options) return new EmulatedRegExp(d.pattern, d.flags, d.options);
	return new RegExp(d.pattern, d.flags);
}
function toRegExpDetails(pattern, options) {
	const opts = getOptions(options);
	const regexPlusAst = transform(J(pattern, {
		flags: opts.flags,
		normalizeUnknownPropertyNames: true,
		rules: {
			captureGroup: opts.rules.captureGroup,
			singleline: opts.rules.singleline
		},
		skipBackrefValidation: opts.rules.allowOrphanBackrefs,
		unicodePropertyMap: JsUnicodePropertyMap
	}), {
		accuracy: opts.accuracy,
		asciiWordBoundaries: opts.rules.asciiWordBoundaries,
		avoidSubclass: opts.avoidSubclass,
		bestEffortTarget: opts.target
	});
	const generated = generate(regexPlusAst, opts);
	const recursionResult = recursion(generated.pattern, {
		captureTransfers: generated._captureTransfers,
		hiddenCaptures: generated._hiddenCaptures,
		mode: "external"
	});
	const atomicResult = atomic(possessive(recursionResult.pattern).pattern, {
		captureTransfers: recursionResult.captureTransfers,
		hiddenCaptures: recursionResult.hiddenCaptures
	});
	const details = {
		pattern: atomicResult.pattern,
		flags: `${opts.hasIndices ? "d" : ""}${opts.global ? "g" : ""}${generated.flags}${generated.options.disable.v ? "u" : "v"}`
	};
	if (opts.avoidSubclass) {
		if (opts.lazyCompileLength !== Infinity) throw new Error("Lazy compilation requires subclass");
	} else {
		const hiddenCaptures = atomicResult.hiddenCaptures.sort((a, b) => a - b);
		const transfers = Array.from(atomicResult.captureTransfers);
		const strategy = regexPlusAst._strategy;
		const lazyCompile = details.pattern.length >= opts.lazyCompileLength;
		if (hiddenCaptures.length || transfers.length || strategy || lazyCompile) details.options = {
			...hiddenCaptures.length && { hiddenCaptures },
			...transfers.length && { transfers },
			...strategy && { strategy },
			...lazyCompile && { lazyCompile }
		};
	}
	return details;
}
//#endregion
//#region node_modules/.pnpm/@shikijs+engine-javascript@4.3.0/node_modules/@shikijs/engine-javascript/dist/engine-compile.mjs
/**
* The default regex constructor for the JavaScript RegExp engine.
*/
function defaultJavaScriptRegexConstructor(pattern, options) {
	return toRegExp(pattern, {
		global: true,
		hasIndices: true,
		lazyCompileLength: 3e3,
		rules: {
			allowOrphanBackrefs: true,
			asciiWordBoundaries: true,
			captureGroup: true,
			recursionLimit: 5,
			singleline: true
		},
		...options
	});
}
/**
* Use the modern JavaScript RegExp engine to implement the OnigScanner.
*
* As Oniguruma supports some features that can't be emulated using native JavaScript regexes, some
* patterns are not supported. Errors will be thrown when parsing TextMate grammars with
* unsupported patterns, and when the grammar includes patterns that use invalid Oniguruma syntax.
* Set `forgiving` to `true` to ignore these errors and skip any unsupported or invalid patterns.
*/
function createJavaScriptRegexEngine(options = {}) {
	const _options = {
		target: "auto",
		cache: /* @__PURE__ */ new Map(),
		...options
	};
	_options.regexConstructor ||= (pattern) => defaultJavaScriptRegexConstructor(pattern, { target: _options.target });
	return {
		createScanner(patterns) {
			return new JavaScriptScanner(patterns, _options);
		},
		createString(s) {
			return { content: s };
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@shikijs+engine-javascript@4.3.0/node_modules/@shikijs/engine-javascript/dist/engine-raw.mjs
/**
* Raw JavaScript regex engine that only supports precompiled grammars.
*
* This further simplifies the engine by excluding the regex compilation step.
*
* Zero dependencies.
*/
function createJavaScriptRawEngine() {
	const options = {
		cache: /* @__PURE__ */ new Map(),
		regexConstructor: () => {
			throw new Error("JavaScriptRawEngine: only support precompiled grammar");
		}
	};
	return {
		createScanner(patterns) {
			return new JavaScriptScanner(patterns, options);
		},
		createString(s) {
			return { content: s };
		}
	};
}
//#endregion
export { JavaScriptScanner, createJavaScriptRawEngine, createJavaScriptRegexEngine, defaultJavaScriptRegexConstructor };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpa2lfZW5naW5lX2phdmFzY3JpcHQuanMiLCJuYW1lcyI6WyJyIiwibCIsIm8iLCJtIiwiYiIsInkiLCJDIiwiVCIsIk0iLCJGIiwiZWUiLCJLIiwidyIsIlIiLCJBIiwiSSIsImsiLCJ4IiwiTCIsIlEiLCJQIiwidGUiLCJoIiwiRSIsInoiLCJYIiwiRyIsIlUiLCJWIiwiSiIsIiQiLCJXIiwiTiIsIkQiLCJfIiwiQiIsIk8iLCJxIiwiZyIsIkgiLCJpIiwieCIsIloiLCJTIiwidSIsImluY3JlbWVudElmQXRMZWFzdCIsInIiLCJzbHVnIiwiY3JlYXRlR3JvdXAiLCJjcmVhdGVMb29rYXJvdW5kQXNzZXJ0aW9uIiwiY3JlYXRlVW5pY29kZVByb3BlcnR5IiwiY3JlYXRlUXVhbnRpZmllciIsImNyZWF0ZUFsdGVybmF0aXZlIiwiY3JlYXRlQXNzZXJ0aW9uIiwiY3JlYXRlQ2hhcmFjdGVyIiwiY3JlYXRlQ2hhcmFjdGVyQ2xhc3MiLCJjcmVhdGVDaGFyYWN0ZXJTZXQiLCJzbHVnMiIsImhhc09ubHlDaGlsZCIsImNyZWF0ZUJhY2tyZWZlcmVuY2UiLCJjcmVhdGVDYXB0dXJpbmdHcm91cCIsImNyZWF0ZVN1YnJvdXRpbmUiLCJwYXJzZSIsImNyZWF0ZUNoYXJhY3RlcjIiLCJjcmVhdGVHcm91cDIiLCJjcmVhdGVBbHRlcm5hdGl2ZTIiLCIjcGF0dGVybiIsIiNjYXB0dXJlTWFwIiwiI25hbWVNYXAiLCIjc3RyYXRlZ3kiLCIjY29tcGlsZWQiLCIjZXhlY0NvcmUiLCJwYXJzZTIiXSwic291cmNlcyI6WyIuLi8uLi8ucG5wbS9Ac2hpa2lqcytlbmdpbmUtamF2YXNjcmlwdEA0LjMuMC9ub2RlX21vZHVsZXMvQHNoaWtpanMvZW5naW5lLWphdmFzY3JpcHQvZGlzdC9zY2FubmVyLURYOExSRkdFLm1qcyIsIi4uLy4uLy5wbnBtL29uaWd1cnVtYS1wYXJzZXJAMC4xMi4yL25vZGVfbW9kdWxlcy9vbmlndXJ1bWEtcGFyc2VyL2Rpc3QvdXRpbHMuanMiLCIuLi8uLi8ucG5wbS9vbmlndXJ1bWEtcGFyc2VyQDAuMTIuMi9ub2RlX21vZHVsZXMvb25pZ3VydW1hLXBhcnNlci9kaXN0L3Rva2VuaXplci90b2tlbml6ZS5qcyIsIi4uLy4uLy5wbnBtL29uaWd1cnVtYS1wYXJzZXJAMC4xMi4yL25vZGVfbW9kdWxlcy9vbmlndXJ1bWEtcGFyc2VyL2Rpc3QvcGFyc2VyL25vZGUtdXRpbHMuanMiLCIuLi8uLi8ucG5wbS9vbmlndXJ1bWEtcGFyc2VyQDAuMTIuMi9ub2RlX21vZHVsZXMvb25pZ3VydW1hLXBhcnNlci9kaXN0L3BhcnNlci9wYXJzZS5qcyIsIi4uLy4uLy5wbnBtL29uaWd1cnVtYS1wYXJzZXJAMC4xMi4yL25vZGVfbW9kdWxlcy9vbmlndXJ1bWEtcGFyc2VyL2Rpc3QvdHJhdmVyc2VyL3RyYXZlcnNlLmpzIiwiLi4vLi4vLnBucG0vcmVnZXhANi4xLjAvbm9kZV9tb2R1bGVzL3JlZ2V4L3NyYy91dGlscy1pbnRlcm5hbHMuanMiLCIuLi8uLi8ucG5wbS9yZWdleC11dGlsaXRpZXNAMi4zLjAvbm9kZV9tb2R1bGVzL3JlZ2V4LXV0aWxpdGllcy9zcmMvaW5kZXguanMiLCIuLi8uLi8ucG5wbS9yZWdleEA2LjEuMC9ub2RlX21vZHVsZXMvcmVnZXgvc3JjL2F0b21pYy5qcyIsIi4uLy4uLy5wbnBtL3JlZ2V4LXJlY3Vyc2lvbkA2LjAuMi9ub2RlX21vZHVsZXMvcmVnZXgtcmVjdXJzaW9uL3NyYy9pbmRleC5qcyIsIi4uLy4uLy5wbnBtL29uaWd1cnVtYS10by1lc0A0LjMuNi9ub2RlX21vZHVsZXMvb25pZ3VydW1hLXRvLWVzL2Rpc3QvZXNtL2luZGV4LmpzIiwiLi4vLi4vLnBucG0vQHNoaWtpanMrZW5naW5lLWphdmFzY3JpcHRANC4zLjAvbm9kZV9tb2R1bGVzL0BzaGlraWpzL2VuZ2luZS1qYXZhc2NyaXB0L2Rpc3QvZW5naW5lLWNvbXBpbGUubWpzIiwiLi4vLi4vLnBucG0vQHNoaWtpanMrZW5naW5lLWphdmFzY3JpcHRANC4zLjAvbm9kZV9tb2R1bGVzL0BzaGlraWpzL2VuZ2luZS1qYXZhc2NyaXB0L2Rpc3QvZW5naW5lLXJhdy5tanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8jcmVnaW9uIHNyYy9zY2FubmVyLnRzXG5jb25zdCBNQVggPSA0Mjk0OTY3Mjk1O1xudmFyIEphdmFTY3JpcHRTY2FubmVyID0gY2xhc3Mge1xuXHRwYXR0ZXJucztcblx0b3B0aW9ucztcblx0cmVnZXhwcztcblx0Y29uc3RydWN0b3IocGF0dGVybnMsIG9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMucGF0dGVybnMgPSBwYXR0ZXJucztcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXHRcdGNvbnN0IHsgZm9yZ2l2aW5nID0gZmFsc2UsIGNhY2hlLCByZWdleENvbnN0cnVjdG9yIH0gPSBvcHRpb25zO1xuXHRcdGlmICghcmVnZXhDb25zdHJ1Y3RvcikgdGhyb3cgbmV3IEVycm9yKFwiT3B0aW9uIGByZWdleENvbnN0cnVjdG9yYCBpcyBub3QgcHJvdmlkZWRcIik7XG5cdFx0dGhpcy5yZWdleHBzID0gcGF0dGVybnMubWFwKChwKSA9PiB7XG5cdFx0XHRpZiAodHlwZW9mIHAgIT09IFwic3RyaW5nXCIpIHJldHVybiBwO1xuXHRcdFx0Y29uc3QgY2FjaGVkID0gY2FjaGU/LmdldChwKTtcblx0XHRcdGlmIChjYWNoZWQpIHtcblx0XHRcdFx0aWYgKGNhY2hlZCBpbnN0YW5jZW9mIFJlZ0V4cCkgcmV0dXJuIGNhY2hlZDtcblx0XHRcdFx0aWYgKGZvcmdpdmluZykgcmV0dXJuIG51bGw7XG5cdFx0XHRcdHRocm93IGNhY2hlZDtcblx0XHRcdH1cblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IHJlZ2V4ID0gcmVnZXhDb25zdHJ1Y3RvcihwKTtcblx0XHRcdFx0Y2FjaGU/LnNldChwLCByZWdleCk7XG5cdFx0XHRcdHJldHVybiByZWdleDtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Y2FjaGU/LnNldChwLCBlKTtcblx0XHRcdFx0aWYgKGZvcmdpdmluZykgcmV0dXJuIG51bGw7XG5cdFx0XHRcdHRocm93IGU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0ZmluZE5leHRNYXRjaFN5bmMoc3RyaW5nLCBzdGFydFBvc2l0aW9uLCBfb3B0aW9ucykge1xuXHRcdGNvbnN0IHN0ciA9IHR5cGVvZiBzdHJpbmcgPT09IFwic3RyaW5nXCIgPyBzdHJpbmcgOiBzdHJpbmcuY29udGVudDtcblx0XHRjb25zdCBwZW5kaW5nID0gW107XG5cdFx0ZnVuY3Rpb24gdG9SZXN1bHQoaW5kZXgsIG1hdGNoLCBvZmZzZXQgPSAwKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRpbmRleCxcblx0XHRcdFx0Y2FwdHVyZUluZGljZXM6IG1hdGNoLmluZGljZXMubWFwKChpbmRpY2UpID0+IHtcblx0XHRcdFx0XHRpZiAoaW5kaWNlID09IG51bGwpIHJldHVybiB7XG5cdFx0XHRcdFx0XHRzdGFydDogTUFYLFxuXHRcdFx0XHRcdFx0ZW5kOiBNQVgsXG5cdFx0XHRcdFx0XHRsZW5ndGg6IDBcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRzdGFydDogaW5kaWNlWzBdICsgb2Zmc2V0LFxuXHRcdFx0XHRcdFx0ZW5kOiBpbmRpY2VbMV0gKyBvZmZzZXQsXG5cdFx0XHRcdFx0XHRsZW5ndGg6IGluZGljZVsxXSAtIGluZGljZVswXVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH0pXG5cdFx0XHR9O1xuXHRcdH1cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucmVnZXhwcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgcmVnZXhwID0gdGhpcy5yZWdleHBzW2ldO1xuXHRcdFx0aWYgKCFyZWdleHApIGNvbnRpbnVlO1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0cmVnZXhwLmxhc3RJbmRleCA9IHN0YXJ0UG9zaXRpb247XG5cdFx0XHRcdGNvbnN0IG1hdGNoID0gcmVnZXhwLmV4ZWMoc3RyKTtcblx0XHRcdFx0aWYgKCFtYXRjaCkgY29udGludWU7XG5cdFx0XHRcdGlmIChtYXRjaC5pbmRleCA9PT0gc3RhcnRQb3NpdGlvbikgcmV0dXJuIHRvUmVzdWx0KGksIG1hdGNoLCAwKTtcblx0XHRcdFx0cGVuZGluZy5wdXNoKFtcblx0XHRcdFx0XHRpLFxuXHRcdFx0XHRcdG1hdGNoLFxuXHRcdFx0XHRcdDBcblx0XHRcdFx0XSk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZm9yZ2l2aW5nKSBjb250aW51ZTtcblx0XHRcdFx0dGhyb3cgZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHBlbmRpbmcubGVuZ3RoKSB7XG5cdFx0XHRjb25zdCBtaW5JbmRleCA9IE1hdGgubWluKC4uLnBlbmRpbmcubWFwKChtKSA9PiBtWzFdLmluZGV4KSk7XG5cdFx0XHRmb3IgKGNvbnN0IFtpLCBtYXRjaCwgb2Zmc2V0XSBvZiBwZW5kaW5nKSBpZiAobWF0Y2guaW5kZXggPT09IG1pbkluZGV4KSByZXR1cm4gdG9SZXN1bHQoaSwgbWF0Y2gsIG9mZnNldCk7XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG59O1xuLy8jZW5kcmVnaW9uXG5leHBvcnQgeyBKYXZhU2NyaXB0U2Nhbm5lciBhcyB0IH07XG4iLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe2lmKFsuLi5lXS5sZW5ndGghPT0xKXRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgXCIke2V9XCIgdG8gYmUgYSBzaW5nbGUgY29kZSBwb2ludGApO3JldHVybiBlLmNvZGVQb2ludEF0KDApfWZ1bmN0aW9uIGwoZSx0LG4pe3JldHVybiBlLmhhcyh0KXx8ZS5zZXQodCxuKSxlLmdldCh0KX1jb25zdCBpPW5ldyBTZXQoW1wiYWxudW1cIixcImFscGhhXCIsXCJhc2NpaVwiLFwiYmxhbmtcIixcImNudHJsXCIsXCJkaWdpdFwiLFwiZ3JhcGhcIixcImxvd2VyXCIsXCJwcmludFwiLFwicHVuY3RcIixcInNwYWNlXCIsXCJ1cHBlclwiLFwid29yZFwiLFwieGRpZ2l0XCJdKSxvPVN0cmluZy5yYXc7ZnVuY3Rpb24gdShlLHQpe2lmKGU9PW51bGwpdGhyb3cgbmV3IEVycm9yKHQ/P1wiVmFsdWUgZXhwZWN0ZWRcIik7cmV0dXJuIGV9ZXhwb3J0e3IgYXMgY3BPZixsIGFzIGdldE9ySW5zZXJ0LGkgYXMgUG9zaXhDbGFzc05hbWVzLG8gYXMgcix1IGFzIHRocm93SWZOdWxsaXNofTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWxzLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7aW1wb3J0e2NwT2YgYXMgaCxQb3NpeENsYXNzTmFtZXMgYXMgRyxyIGFzIHAsdGhyb3dJZk51bGxpc2ggYXMgTn1mcm9tXCIuLi91dGlscy5qc1wiO2NvbnN0IG09cGBcXFtcXF4/YCxiPWBjLj8gfCBDKD86LS4/KT98JHtwYFtwUF1cXHsoPzpcXF4/Wy1cXHgyMF9dKltBLVphLXpdWy1cXHgyMFxcd10qXFx9KT9gfXwke3BgeFs4OUEtRmEtZl1cXHB7QUhleH0oPzpcXFxceFs4OUEtRmEtZl1cXHB7QUhleH0pKmB9fCR7cGB1KD86XFxwe0FIZXh9ezR9KT8gfCB4XFx7W15cXH1dKlxcfT8gfCB4XFxwe0FIZXh9ezAsMn1gfXwke3Bgb1xce1teXFx9XSpcXH0/YH18JHtwYFxcZHsxLDN9YH1gLHk9L1s/KitdWz8rXT98XFx7KD86XFxkKyg/OixcXGQqKT98LFxcZCspXFx9XFw/Py8sQz1uZXcgUmVnRXhwKHBgXG4gIFxcXFwgKD86XG4gICAgJHtifVxuICAgIHwgW2drXTxbXj5dKj4/XG4gICAgfCBbZ2tdJ1teJ10qJz9cbiAgICB8IC5cbiAgKVxuICB8IFxcKCAoPzpcbiAgICBcXD8gKD86XG4gICAgICBbOj0hPih7XVxuICAgICAgfCA8Wz0hXVxuICAgICAgfCA8W14+XSo+XG4gICAgICB8ICdbXiddKidcbiAgICAgIHwgflxcfD9cbiAgICAgIHwgIyg/OlteKVxcXFxdfFxcXFwuPykqXG4gICAgICB8IFteOildKls6KV1cbiAgICApP1xuICAgIHwgXFwqW15cXCldKlxcKT9cbiAgKT9cbiAgfCAoPzoke3kuc291cmNlfSkrXG4gIHwgJHttfVxuICB8IC5cbmAucmVwbGFjZSgvXFxzKy9nLFwiXCIpLFwiZ3N1XCIpLFQ9bmV3IFJlZ0V4cChwYFxuICBcXFxcICg/OlxuICAgICR7Yn1cbiAgICB8IC5cbiAgKVxuICB8IFxcWzooPzpcXF4/XFxwe0FscGhhfSt8XFxeKTpcXF1cbiAgfCAke219XG4gIHwgJiZcbiAgfCAuXG5gLnJlcGxhY2UoL1xccysvZyxcIlwiKSxcImdzdVwiKTtmdW5jdGlvbiBNKGUsbj17fSl7Y29uc3QgdD17ZmxhZ3M6XCJcIiwuLi5uLHJ1bGVzOntjYXB0dXJlR3JvdXA6ITEsc2luZ2xlbGluZTohMSwuLi5uLnJ1bGVzfX07aWYodHlwZW9mIGUhPVwic3RyaW5nXCIpdGhyb3cgbmV3IEVycm9yKFwiU3RyaW5nIGV4cGVjdGVkIGFzIHBhdHRlcm5cIik7Y29uc3Qgbz1ZKHQuZmxhZ3MpLHM9W28uZXh0ZW5kZWRdLGE9e2NhcHR1cmVHcm91cDp0LnJ1bGVzLmNhcHR1cmVHcm91cCxnZXRDdXJyZW50TW9kWCgpe3JldHVybiBzLmF0KC0xKX0sbnVtT3Blbkdyb3VwczowLHBvcE1vZFgoKXtzLnBvcCgpfSxwdXNoTW9kWCh1KXtzLnB1c2godSl9LHJlcGxhY2VDdXJyZW50TW9kWCh1KXtzW3MubGVuZ3RoLTFdPXV9LHNpbmdsZWxpbmU6dC5ydWxlcy5zaW5nbGVsaW5lfTtsZXQgcj1bXSxpO2ZvcihDLmxhc3RJbmRleD0wO2k9Qy5leGVjKGUpOyl7Y29uc3QgdT1GKGEsZSxpWzBdLEMubGFzdEluZGV4KTt1LnRva2Vucz9yLnB1c2goLi4udS50b2tlbnMpOnUudG9rZW4mJnIucHVzaCh1LnRva2VuKSx1Lmxhc3RJbmRleCE9PXZvaWQgMCYmKEMubGFzdEluZGV4PXUubGFzdEluZGV4KX1jb25zdCBsPVtdO2xldCBjPTA7ci5maWx0ZXIodT0+dS50eXBlPT09XCJHcm91cE9wZW5cIikuZm9yRWFjaCh1PT57dS5raW5kPT09XCJjYXB0dXJpbmdcIj91Lm51bWJlcj0rK2M6dS5yYXc9PT1cIihcIiYmbC5wdXNoKHUpfSksY3x8bC5mb3JFYWNoKCh1LFMpPT57dS5raW5kPVwiY2FwdHVyaW5nXCIsdS5udW1iZXI9UysxfSk7Y29uc3QgZz1jfHxsLmxlbmd0aDtyZXR1cm57dG9rZW5zOnIubWFwKHU9PnUudHlwZT09PVwiRXNjYXBlZE51bWJlclwiP2VlKHUsZyk6dSkuZmxhdCgpLGZsYWdzOm99fWZ1bmN0aW9uIEYoZSxuLHQsbyl7Y29uc3RbcyxhXT10O2lmKHQ9PT1cIltcInx8dD09PVwiW15cIil7Y29uc3Qgcj1LKG4sdCxvKTtyZXR1cm57dG9rZW5zOnIudG9rZW5zLGxhc3RJbmRleDpyLmxhc3RJbmRleH19aWYocz09PVwiXFxcXFwiKXtpZihcIkFiQkd5WXpaXCIuaW5jbHVkZXMoYSkpcmV0dXJue3Rva2VuOncodCx0KX07aWYoL15cXFxcZ1s8J10vLnRlc3QodCkpe2lmKCEvXlxcXFxnKD86PFtePl0rPnwnW14nXSsnKSQvLnRlc3QodCkpdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGdyb3VwIG5hbWUgXCIke3R9XCJgKTtyZXR1cm57dG9rZW46Uih0KX19aWYoL15cXFxca1s8J10vLnRlc3QodCkpe2lmKCEvXlxcXFxrKD86PFtePl0rPnwnW14nXSsnKSQvLnRlc3QodCkpdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGdyb3VwIG5hbWUgXCIke3R9XCJgKTtyZXR1cm57dG9rZW46QSh0KX19aWYoYT09PVwiS1wiKXJldHVybnt0b2tlbjpJKFwia2VlcFwiLHQpfTtpZihhPT09XCJOXCJ8fGE9PT1cIlJcIilyZXR1cm57dG9rZW46ayhcIm5ld2xpbmVcIix0LHtuZWdhdGU6YT09PVwiTlwifSl9O2lmKGE9PT1cIk9cIilyZXR1cm57dG9rZW46ayhcImFueVwiLHQpfTtpZihhPT09XCJYXCIpcmV0dXJue3Rva2VuOmsoXCJ0ZXh0X3NlZ21lbnRcIix0KX07Y29uc3Qgcj14KHQse2luQ2hhckNsYXNzOiExfSk7cmV0dXJuIEFycmF5LmlzQXJyYXkocik/e3Rva2VuczpyfTp7dG9rZW46cn19aWYocz09PVwiKFwiKXtpZihhPT09XCIqXCIpcmV0dXJue3Rva2VuOmoodCl9O2lmKHQ9PT1cIig/e1wiKXRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgY2FsbG91dCBcIiR7dH1cImApO2lmKHQuc3RhcnRzV2l0aChcIig/I1wiKSl7aWYobltvXSE9PVwiKVwiKXRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgY29tbWVudCBncm91cCBcIig/I1wiJyk7cmV0dXJue2xhc3RJbmRleDpvKzF9fWlmKC9eXFwoXFw/Wy1pbXhdK1s6KV0kLy50ZXN0KHQpKXJldHVybnt0b2tlbjpMKHQsZSl9O2lmKGUucHVzaE1vZFgoZS5nZXRDdXJyZW50TW9kWCgpKSxlLm51bU9wZW5Hcm91cHMrKyx0PT09XCIoXCImJiFlLmNhcHR1cmVHcm91cHx8dD09PVwiKD86XCIpcmV0dXJue3Rva2VuOmYoXCJncm91cFwiLHQpfTtpZih0PT09XCIoPz5cIilyZXR1cm57dG9rZW46ZihcImF0b21pY1wiLHQpfTtpZih0PT09XCIoPz1cInx8dD09PVwiKD8hXCJ8fHQ9PT1cIig/PD1cInx8dD09PVwiKD88IVwiKXJldHVybnt0b2tlbjpmKHRbMl09PT1cIjxcIj9cImxvb2tiZWhpbmRcIjpcImxvb2thaGVhZFwiLHQse25lZ2F0ZTp0LmVuZHNXaXRoKFwiIVwiKX0pfTtpZih0PT09XCIoXCImJmUuY2FwdHVyZUdyb3VwfHx0LnN0YXJ0c1dpdGgoXCIoPzxcIikmJnQuZW5kc1dpdGgoXCI+XCIpfHx0LnN0YXJ0c1dpdGgoXCIoPydcIikmJnQuZW5kc1dpdGgoXCInXCIpKXJldHVybnt0b2tlbjpmKFwiY2FwdHVyaW5nXCIsdCx7Li4udCE9PVwiKFwiJiZ7bmFtZTp0LnNsaWNlKDMsLTEpfX0pfTtpZih0LnN0YXJ0c1dpdGgoXCIoP35cIikpe2lmKHQ9PT1cIig/fnxcIil0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGFic2VuY2UgZnVuY3Rpb24ga2luZCBcIiR7dH1cImApO3JldHVybnt0b2tlbjpmKFwiYWJzZW5jZV9yZXBlYXRlclwiLHQpfX10aHJvdyB0PT09XCIoPyhcIj9uZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGNvbmRpdGlvbmFsIFwiJHt0fVwiYCk6bmV3IEVycm9yKGBJbnZhbGlkIG9yIHVuc3VwcG9ydGVkIGdyb3VwIG9wdGlvbiBcIiR7dH1cImApfWlmKHQ9PT1cIilcIil7aWYoZS5wb3BNb2RYKCksZS5udW1PcGVuR3JvdXBzLS0sZS5udW1PcGVuR3JvdXBzPDApdGhyb3cgbmV3IEVycm9yKCdVbm1hdGNoZWQgXCIpXCInKTtyZXR1cm57dG9rZW46USh0KX19aWYoZS5nZXRDdXJyZW50TW9kWCgpKXtpZih0PT09XCIjXCIpe2NvbnN0IHI9bi5pbmRleE9mKGBcbmAsbyk7cmV0dXJue2xhc3RJbmRleDpyPT09LTE/bi5sZW5ndGg6cn19aWYoL15cXHMkLy50ZXN0KHQpKXtjb25zdCByPS9cXHMrL3k7cmV0dXJuIHIubGFzdEluZGV4PW8se2xhc3RJbmRleDpyLmV4ZWMobik/ci5sYXN0SW5kZXg6b319fWlmKHQ9PT1cIi5cIilyZXR1cm57dG9rZW46ayhcImRvdFwiLHQpfTtpZih0PT09XCJeXCJ8fHQ9PT1cIiRcIil7Y29uc3Qgcj1lLnNpbmdsZWxpbmU/e1wiXlwiOnBgXFxBYCwkOnBgXFxaYH1bdF06dDtyZXR1cm57dG9rZW46dyhyLHQpfX1yZXR1cm4gdD09PVwifFwiP3t0b2tlbjpQKHQpfTp5LnRlc3QodCk/e3Rva2Vuczp0ZSh0KX06e3Rva2VuOmQoaCh0KSx0KX19ZnVuY3Rpb24gSyhlLG4sdCl7Y29uc3Qgbz1bRShuWzFdPT09XCJeXCIsbildO2xldCBzPTEsYTtmb3IoVC5sYXN0SW5kZXg9dDthPVQuZXhlYyhlKTspe2NvbnN0IHI9YVswXTtpZihyWzBdPT09XCJbXCImJnJbMV0hPT1cIjpcIilzKyssby5wdXNoKEUoclsxXT09PVwiXlwiLHIpKTtlbHNlIGlmKHI9PT1cIl1cIil7aWYoby5hdCgtMSkudHlwZT09PVwiQ2hhcmFjdGVyQ2xhc3NPcGVuXCIpby5wdXNoKGQoOTMscikpO2Vsc2UgaWYocy0tLG8ucHVzaCh6KHIpKSwhcylicmVha31lbHNle2NvbnN0IGk9WChyKTtBcnJheS5pc0FycmF5KGkpP28ucHVzaCguLi5pKTpvLnB1c2goaSl9fXJldHVybnt0b2tlbnM6byxsYXN0SW5kZXg6VC5sYXN0SW5kZXh8fGUubGVuZ3RofX1mdW5jdGlvbiBYKGUpe2lmKGVbMF09PT1cIlxcXFxcIilyZXR1cm4geChlLHtpbkNoYXJDbGFzczohMH0pO2lmKGVbMF09PT1cIltcIil7Y29uc3Qgbj0vXFxbOig/PG5lZ2F0ZT5cXF4/KSg/PG5hbWU+W2Etel0rKTpcXF0vLmV4ZWMoZSk7aWYoIW58fCFHLmhhcyhuLmdyb3Vwcy5uYW1lKSl0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgUE9TSVggY2xhc3MgXCIke2V9XCJgKTtyZXR1cm4gayhcInBvc2l4XCIsZSx7dmFsdWU6bi5ncm91cHMubmFtZSxuZWdhdGU6ISFuLmdyb3Vwcy5uZWdhdGV9KX1yZXR1cm4gZT09PVwiLVwiP1UoZSk6ZT09PVwiJiZcIj9IKGUpOmQoaChlKSxlKX1mdW5jdGlvbiB4KGUse2luQ2hhckNsYXNzOm59KXtjb25zdCB0PWVbMV07aWYodD09PVwiY1wifHx0PT09XCJDXCIpcmV0dXJuIFooZSk7aWYoXCJkRGhIc1N3V1wiLmluY2x1ZGVzKHQpKXJldHVybiBxKGUpO2lmKGUuc3RhcnRzV2l0aChwYFxcb3tgKSl0aHJvdyBuZXcgRXJyb3IoYEluY29tcGxldGUsIGludmFsaWQsIG9yIHVuc3VwcG9ydGVkIG9jdGFsIGNvZGUgcG9pbnQgXCIke2V9XCJgKTtpZigvXlxcXFxbcFBdXFx7Ly50ZXN0KGUpKXtpZihlLmxlbmd0aD09PTMpdGhyb3cgbmV3IEVycm9yKGBJbmNvbXBsZXRlIG9yIGludmFsaWQgVW5pY29kZSBwcm9wZXJ0eSBcIiR7ZX1cImApO3JldHVybiBWKGUpfWlmKC9eXFxcXHhbODlBLUZhLWZdXFxwe0FIZXh9L3UudGVzdChlKSl0cnl7Y29uc3Qgbz1lLnNwbGl0KC9cXFxceC8pLnNsaWNlKDEpLm1hcChpPT5wYXJzZUludChpLDE2KSkscz1uZXcgVGV4dERlY29kZXIoXCJ1dGYtOFwiLHtpZ25vcmVCT006ITAsZmF0YWw6ITB9KS5kZWNvZGUobmV3IFVpbnQ4QXJyYXkobykpLGE9bmV3IFRleHRFbmNvZGVyO3JldHVyblsuLi5zXS5tYXAoaT0+e2NvbnN0IGw9Wy4uLmEuZW5jb2RlKGkpXS5tYXAoYz0+YFxcXFx4JHtjLnRvU3RyaW5nKDE2KX1gKS5qb2luKFwiXCIpO3JldHVybiBkKGgoaSksbCl9KX1jYXRjaHt0aHJvdyBuZXcgRXJyb3IoYE11bHRpYnl0ZSBjb2RlIFwiJHtlfVwiIGluY29tcGxldGUgb3IgaW52YWxpZCBpbiBPbmlndXJ1bWFgKX1pZih0PT09XCJ1XCJ8fHQ9PT1cInhcIilyZXR1cm4gZChKKGUpLGUpO2lmKCQuaGFzKHQpKXJldHVybiBkKCQuZ2V0KHQpLGUpO2lmKC9cXGQvLnRlc3QodCkpcmV0dXJuIFcobixlKTtpZihlPT09XCJcXFxcXCIpdGhyb3cgbmV3IEVycm9yKHBgSW5jb21wbGV0ZSBlc2NhcGUgXCJcXFwiYCk7aWYodD09PVwiTVwiKXRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgbWV0YSBcIiR7ZX1cImApO2lmKFsuLi5lXS5sZW5ndGg9PT0yKXJldHVybiBkKGUuY29kZVBvaW50QXQoMSksZSk7dGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIGVzY2FwZSBcIiR7ZX1cImApfWZ1bmN0aW9uIFAoZSl7cmV0dXJue3R5cGU6XCJBbHRlcm5hdG9yXCIscmF3OmV9fWZ1bmN0aW9uIHcoZSxuKXtyZXR1cm57dHlwZTpcIkFzc2VydGlvblwiLGtpbmQ6ZSxyYXc6bn19ZnVuY3Rpb24gQShlKXtyZXR1cm57dHlwZTpcIkJhY2tyZWZlcmVuY2VcIixyYXc6ZX19ZnVuY3Rpb24gZChlLG4pe3JldHVybnt0eXBlOlwiQ2hhcmFjdGVyXCIsdmFsdWU6ZSxyYXc6bn19ZnVuY3Rpb24geihlKXtyZXR1cm57dHlwZTpcIkNoYXJhY3RlckNsYXNzQ2xvc2VcIixyYXc6ZX19ZnVuY3Rpb24gVShlKXtyZXR1cm57dHlwZTpcIkNoYXJhY3RlckNsYXNzSHlwaGVuXCIscmF3OmV9fWZ1bmN0aW9uIEgoZSl7cmV0dXJue3R5cGU6XCJDaGFyYWN0ZXJDbGFzc0ludGVyc2VjdG9yXCIscmF3OmV9fWZ1bmN0aW9uIEUoZSxuKXtyZXR1cm57dHlwZTpcIkNoYXJhY3RlckNsYXNzT3BlblwiLG5lZ2F0ZTplLHJhdzpufX1mdW5jdGlvbiBrKGUsbix0PXt9KXtyZXR1cm57dHlwZTpcIkNoYXJhY3RlclNldFwiLGtpbmQ6ZSwuLi50LHJhdzpufX1mdW5jdGlvbiBJKGUsbix0PXt9KXtyZXR1cm4gZT09PVwia2VlcFwiP3t0eXBlOlwiRGlyZWN0aXZlXCIsa2luZDplLHJhdzpufTp7dHlwZTpcIkRpcmVjdGl2ZVwiLGtpbmQ6ZSxmbGFnczpOKHQuZmxhZ3MpLHJhdzpufX1mdW5jdGlvbiBXKGUsbil7cmV0dXJue3R5cGU6XCJFc2NhcGVkTnVtYmVyXCIsaW5DaGFyQ2xhc3M6ZSxyYXc6bn19ZnVuY3Rpb24gUShlKXtyZXR1cm57dHlwZTpcIkdyb3VwQ2xvc2VcIixyYXc6ZX19ZnVuY3Rpb24gZihlLG4sdD17fSl7cmV0dXJue3R5cGU6XCJHcm91cE9wZW5cIixraW5kOmUsLi4udCxyYXc6bn19ZnVuY3Rpb24gRChlLG4sdCxvKXtyZXR1cm57dHlwZTpcIk5hbWVkQ2FsbG91dFwiLGtpbmQ6ZSx0YWc6bixhcmd1bWVudHM6dCxyYXc6b319ZnVuY3Rpb24gXyhlLG4sdCxvKXtyZXR1cm57dHlwZTpcIlF1YW50aWZpZXJcIixraW5kOmUsbWluOm4sbWF4OnQscmF3Om99fWZ1bmN0aW9uIFIoZSl7cmV0dXJue3R5cGU6XCJTdWJyb3V0aW5lXCIscmF3OmV9fWNvbnN0IEI9bmV3IFNldChbXCJDT1VOVFwiLFwiQ01QXCIsXCJFUlJPUlwiLFwiRkFJTFwiLFwiTUFYXCIsXCJNSVNNQVRDSFwiLFwiU0tJUFwiLFwiVE9UQUxfQ09VTlRcIl0pLCQ9bmV3IE1hcChbW1wiYVwiLDddLFtcImJcIiw4XSxbXCJlXCIsMjddLFtcImZcIiwxMl0sW1wiblwiLDEwXSxbXCJyXCIsMTNdLFtcInRcIiw5XSxbXCJ2XCIsMTFdXSk7ZnVuY3Rpb24gWihlKXtjb25zdCBuPWVbMV09PT1cImNcIj9lWzJdOmVbM107aWYoIW58fCEvW0EtWmEtel0vLnRlc3QobikpdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBjb250cm9sIGNoYXJhY3RlciBcIiR7ZX1cImApO3JldHVybiBkKGgobi50b1VwcGVyQ2FzZSgpKS02NCxlKX1mdW5jdGlvbiBMKGUsbil7bGV0e29uOnQsb2ZmOm99PS9eXFwoXFw/KD88b24+W2lteF0qKSg/Oi0oPzxvZmY+Wy1pbXhdKikpPy8uZXhlYyhlKS5ncm91cHM7bz8/PVwiXCI7Y29uc3Qgcz0obi5nZXRDdXJyZW50TW9kWCgpfHx0LmluY2x1ZGVzKFwieFwiKSkmJiFvLmluY2x1ZGVzKFwieFwiKSxhPXYodCkscj12KG8pLGk9e307aWYoYSYmKGkuZW5hYmxlPWEpLHImJihpLmRpc2FibGU9ciksZS5lbmRzV2l0aChcIilcIikpcmV0dXJuIG4ucmVwbGFjZUN1cnJlbnRNb2RYKHMpLEkoXCJmbGFnc1wiLGUse2ZsYWdzOml9KTtpZihlLmVuZHNXaXRoKFwiOlwiKSlyZXR1cm4gbi5wdXNoTW9kWChzKSxuLm51bU9wZW5Hcm91cHMrKyxmKFwiZ3JvdXBcIixlLHsuLi4oYXx8cikmJntmbGFnczppfX0pO3Rocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBmbGFnIG1vZGlmaWVyIFwiJHtlfVwiYCl9ZnVuY3Rpb24gaihlKXtjb25zdCBuPS9cXChcXCooPzxuYW1lPltBLVphLXpfXVxcdyopPyg/OlxcWyg/PHRhZz4oPzpbQS1aYS16X11cXHcqKT8pXFxdKT8oPzpcXHsoPzxhcmdzPltefV0qKVxcfSk/XFwpLy5leGVjKGUpO2lmKCFuKXRocm93IG5ldyBFcnJvcihgSW5jb21wbGV0ZSBvciBpbnZhbGlkIG5hbWVkIGNhbGxvdXQgXCIke2V9XCJgKTtjb25zdHtuYW1lOnQsdGFnOm8sYXJnczpzfT1uLmdyb3VwcztpZighdCl0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgbmFtZWQgY2FsbG91dCBcIiR7ZX1cImApO2lmKG89PT1cIlwiKXRocm93IG5ldyBFcnJvcihgTmFtZWQgY2FsbG91dCB0YWcgd2l0aCBlbXB0eSB2YWx1ZSBub3QgYWxsb3dlZCBcIiR7ZX1cImApO2NvbnN0IGE9cz9zLnNwbGl0KFwiLFwiKS5maWx0ZXIoZz0+ZyE9PVwiXCIpLm1hcChnPT4vXlsrLV0/XFxkKyQvLnRlc3QoZyk/K2c6Zyk6W10sW3IsaSxsXT1hLGM9Qi5oYXModCk/dC50b0xvd2VyQ2FzZSgpOlwiY3VzdG9tXCI7c3dpdGNoKGMpe2Nhc2VcImZhaWxcIjpjYXNlXCJtaXNtYXRjaFwiOmNhc2VcInNraXBcIjppZihhLmxlbmd0aD4wKXRocm93IG5ldyBFcnJvcihgTmFtZWQgY2FsbG91dCBhcmd1bWVudHMgbm90IGFsbG93ZWQgXCIke2F9XCJgKTticmVhaztjYXNlXCJlcnJvclwiOmlmKGEubGVuZ3RoPjEpdGhyb3cgbmV3IEVycm9yKGBOYW1lZCBjYWxsb3V0IGFsbG93cyBvbmx5IG9uZSBhcmd1bWVudCBcIiR7YX1cImApO2lmKHR5cGVvZiByPT1cInN0cmluZ1wiKXRocm93IG5ldyBFcnJvcihgTmFtZWQgY2FsbG91dCBhcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyIFwiJHtyfVwiYCk7YnJlYWs7Y2FzZVwibWF4XCI6aWYoIWEubGVuZ3RofHxhLmxlbmd0aD4yKXRocm93IG5ldyBFcnJvcihgTmFtZWQgY2FsbG91dCBtdXN0IGhhdmUgb25lIG9yIHR3byBhcmd1bWVudHMgXCIke2F9XCJgKTtpZih0eXBlb2Ygcj09XCJzdHJpbmdcIiYmIS9eW0EtWmEtel9dXFx3KiQvLnRlc3QocikpdGhyb3cgbmV3IEVycm9yKGBOYW1lZCBjYWxsb3V0IGFyZ3VtZW50IG9uZSBtdXN0IGJlIGEgdGFnIG9yIG51bWJlciBcIiR7cn1cImApO2lmKGEubGVuZ3RoPT09MiYmKHR5cGVvZiBpPT1cIm51bWJlclwifHwhL15bPD5YXSQvLnRlc3QoaSkpKXRocm93IG5ldyBFcnJvcihgTmFtZWQgY2FsbG91dCBvcHRpb25hbCBhcmd1bWVudCB0d28gbXVzdCBiZSAnPCcsICc+Jywgb3IgJ1gnIFwiJHtpfVwiYCk7YnJlYWs7Y2FzZVwiY291bnRcIjpjYXNlXCJ0b3RhbF9jb3VudFwiOmlmKGEubGVuZ3RoPjEpdGhyb3cgbmV3IEVycm9yKGBOYW1lZCBjYWxsb3V0IGFsbG93cyBvbmx5IG9uZSBhcmd1bWVudCBcIiR7YX1cImApO2lmKGEubGVuZ3RoPT09MSYmKHR5cGVvZiByPT1cIm51bWJlclwifHwhL15bPD5YXSQvLnRlc3QocikpKXRocm93IG5ldyBFcnJvcihgTmFtZWQgY2FsbG91dCBvcHRpb25hbCBhcmd1bWVudCBtdXN0IGJlICc8JywgJz4nLCBvciAnWCcgXCIke3J9XCJgKTticmVhaztjYXNlXCJjbXBcIjppZihhLmxlbmd0aCE9PTMpdGhyb3cgbmV3IEVycm9yKGBOYW1lZCBjYWxsb3V0IG11c3QgaGF2ZSB0aHJlZSBhcmd1bWVudHMgXCIke2F9XCJgKTtpZih0eXBlb2Ygcj09XCJzdHJpbmdcIiYmIS9eW0EtWmEtel9dXFx3KiQvLnRlc3QocikpdGhyb3cgbmV3IEVycm9yKGBOYW1lZCBjYWxsb3V0IGFyZ3VtZW50IG9uZSBtdXN0IGJlIGEgdGFnIG9yIG51bWJlciBcIiR7cn1cImApO2lmKHR5cGVvZiBpPT1cIm51bWJlclwifHwhL14oPzpbPD4hPV09fFs8Pl0pJC8udGVzdChpKSl0aHJvdyBuZXcgRXJyb3IoYE5hbWVkIGNhbGxvdXQgYXJndW1lbnQgdHdvIG11c3QgYmUgJz09JywgJyE9JywgJz4nLCAnPCcsICc+PScsIG9yICc8PScgXCIke2l9XCJgKTtpZih0eXBlb2YgbD09XCJzdHJpbmdcIiYmIS9eW0EtWmEtel9dXFx3KiQvLnRlc3QobCkpdGhyb3cgbmV3IEVycm9yKGBOYW1lZCBjYWxsb3V0IGFyZ3VtZW50IHRocmVlIG11c3QgYmUgYSB0YWcgb3IgbnVtYmVyIFwiJHtsfVwiYCk7YnJlYWs7Y2FzZVwiY3VzdG9tXCI6dGhyb3cgbmV3IEVycm9yKGBVbmRlZmluZWQgY2FsbG91dCBuYW1lIFwiJHt0fVwiYCk7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgbmFtZWQgY2FsbG91dCBraW5kIFwiJHtjfVwiYCl9cmV0dXJuIEQoYyxvPz9udWxsLHM/LnNwbGl0KFwiLFwiKT8/bnVsbCxlKX1mdW5jdGlvbiBPKGUpe2xldCBuPW51bGwsdCxvO2lmKGVbMF09PT1cIntcIil7Y29uc3R7bWluU3RyOnMsbWF4U3RyOmF9PS9eXFx7KD88bWluU3RyPlxcZCopKD86LCg/PG1heFN0cj5cXGQqKSk/Ly5leGVjKGUpLmdyb3VwcyxyPTFlNTtpZigrcz5yfHxhJiYrYT5yKXRocm93IG5ldyBFcnJvcihcIlF1YW50aWZpZXIgdmFsdWUgdW5zdXBwb3J0ZWQgaW4gT25pZ3VydW1hXCIpO2lmKHQ9K3Msbz1hPT09dm9pZCAwPytzOmE9PT1cIlwiPzEvMDorYSx0Pm8mJihuPVwicG9zc2Vzc2l2ZVwiLFt0LG9dPVtvLHRdKSxlLmVuZHNXaXRoKFwiP1wiKSl7aWYobj09PVwicG9zc2Vzc2l2ZVwiKXRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgcG9zc2Vzc2l2ZSBpbnRlcnZhbCBxdWFudGlmaWVyIGNoYWluIHdpdGggXCI/XCInKTtuPVwibGF6eVwifWVsc2Ugbnx8KG49XCJncmVlZHlcIil9ZWxzZSB0PWVbMF09PT1cIitcIj8xOjAsbz1lWzBdPT09XCI/XCI/MToxLzAsbj1lWzFdPT09XCIrXCI/XCJwb3NzZXNzaXZlXCI6ZVsxXT09PVwiP1wiP1wibGF6eVwiOlwiZ3JlZWR5XCI7cmV0dXJuIF8obix0LG8sZSl9ZnVuY3Rpb24gcShlKXtjb25zdCBuPWVbMV0udG9Mb3dlckNhc2UoKTtyZXR1cm4gayh7ZDpcImRpZ2l0XCIsaDpcImhleFwiLHM6XCJzcGFjZVwiLHc6XCJ3b3JkXCJ9W25dLGUse25lZ2F0ZTplWzFdIT09bn0pfWZ1bmN0aW9uIFYoZSl7Y29uc3R7cDpuLG5lZzp0LHZhbHVlOm99PS9eXFxcXCg/PHA+W3BQXSlcXHsoPzxuZWc+XFxePykoPzx2YWx1ZT5bXn1dKykvLmV4ZWMoZSkuZ3JvdXBzO3JldHVybiBrKFwicHJvcGVydHlcIixlLHt2YWx1ZTpvLG5lZ2F0ZTpuPT09XCJQXCImJiF0fHxuPT09XCJwXCImJiEhdH0pfWZ1bmN0aW9uIHYoZSl7Y29uc3Qgbj17fTtyZXR1cm4gZS5pbmNsdWRlcyhcImlcIikmJihuLmlnbm9yZUNhc2U9ITApLGUuaW5jbHVkZXMoXCJtXCIpJiYobi5kb3RBbGw9ITApLGUuaW5jbHVkZXMoXCJ4XCIpJiYobi5leHRlbmRlZD0hMCksT2JqZWN0LmtleXMobikubGVuZ3RoP246bnVsbH1mdW5jdGlvbiBZKGUpe2NvbnN0IG49e2lnbm9yZUNhc2U6ITEsZG90QWxsOiExLGV4dGVuZGVkOiExLGRpZ2l0SXNBc2NpaTohMSxwb3NpeElzQXNjaWk6ITEsc3BhY2VJc0FzY2lpOiExLHdvcmRJc0FzY2lpOiExLHRleHRTZWdtZW50TW9kZTpudWxsfTtmb3IobGV0IHQ9MDt0PGUubGVuZ3RoO3QrKyl7Y29uc3Qgbz1lW3RdO2lmKCFcImlteERQU1d5XCIuaW5jbHVkZXMobykpdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGZsYWcgXCIke299XCJgKTtpZihvPT09XCJ5XCIpe2lmKCEvXnl7W2d3XX0vLnRlc3QoZS5zbGljZSh0KSkpdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG9yIHVuc3BlY2lmaWVkIGZsYWcgXCJ5XCIgbW9kZScpO24udGV4dFNlZ21lbnRNb2RlPWVbdCsyXT09PVwiZ1wiP1wiZ3JhcGhlbWVcIjpcIndvcmRcIix0Kz0zO2NvbnRpbnVlfW5be2k6XCJpZ25vcmVDYXNlXCIsbTpcImRvdEFsbFwiLHg6XCJleHRlbmRlZFwiLEQ6XCJkaWdpdElzQXNjaWlcIixQOlwicG9zaXhJc0FzY2lpXCIsUzpcInNwYWNlSXNBc2NpaVwiLFc6XCJ3b3JkSXNBc2NpaVwifVtvXV09ITB9cmV0dXJuIG59ZnVuY3Rpb24gSihlKXtpZigvXig/OlxcXFx1KD8hXFxwe0FIZXh9ezR9KXxcXFxceCg/IVxccHtBSGV4fXsxLDJ9fFxce1xccHtBSGV4fXsxLDh9XFx9KSkvdS50ZXN0KGUpKXRocm93IG5ldyBFcnJvcihgSW5jb21wbGV0ZSBvciBpbnZhbGlkIGVzY2FwZSBcIiR7ZX1cImApO2NvbnN0IG49ZVsyXT09PVwie1wiPy9eXFxcXHhcXHtcXHMqKD88aGV4PlxccHtBSGV4fSspL3UuZXhlYyhlKS5ncm91cHMuaGV4OmUuc2xpY2UoMik7cmV0dXJuIHBhcnNlSW50KG4sMTYpfWZ1bmN0aW9uIGVlKGUsbil7Y29uc3R7cmF3OnQsaW5DaGFyQ2xhc3M6b309ZSxzPXQuc2xpY2UoMSk7aWYoIW8mJihzIT09XCIwXCImJnMubGVuZ3RoPT09MXx8c1swXSE9PVwiMFwiJiYrczw9bikpcmV0dXJuW0EodCldO2NvbnN0IGE9W10scj1zLm1hdGNoKC9eWzAtN10rfFxcZC9nKTtmb3IobGV0IGk9MDtpPHIubGVuZ3RoO2krKyl7Y29uc3QgbD1yW2ldO2xldCBjO2lmKGk9PT0wJiZsIT09XCI4XCImJmwhPT1cIjlcIil7aWYoYz1wYXJzZUludChsLDgpLGM+MTI3KXRocm93IG5ldyBFcnJvcihwYE9jdGFsIGVuY29kZWQgYnl0ZSBhYm92ZSAxNzcgdW5zdXBwb3J0ZWQgXCIke3R9XCJgKX1lbHNlIGM9aChsKTthLnB1c2goZChjLChpPT09MD9cIlxcXFxcIjpcIlwiKStsKSl9cmV0dXJuIGF9ZnVuY3Rpb24gdGUoZSl7Y29uc3Qgbj1bXSx0PW5ldyBSZWdFeHAoeSxcImd5XCIpO2xldCBvO2Zvcig7bz10LmV4ZWMoZSk7KXtjb25zdCBzPW9bMF07aWYoc1swXT09PVwie1wiKXtjb25zdCBhPS9eXFx7KD88bWluPlxcZCspLCg/PG1heD5cXGQrKVxcfVxcPz8kLy5leGVjKHMpO2lmKGEpe2NvbnN0e21pbjpyLG1heDppfT1hLmdyb3VwcztpZigrcj4raSYmcy5lbmRzV2l0aChcIj9cIikpe3QubGFzdEluZGV4LS0sbi5wdXNoKE8ocy5zbGljZSgwLC0xKSkpO2NvbnRpbnVlfX19bi5wdXNoKE8ocykpfXJldHVybiBufWV4cG9ydHtNIGFzIHRva2VuaXplfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRva2VuaXplLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbyhlLHQpe2lmKCFBcnJheS5pc0FycmF5KGUuYm9keSkpdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgbm9kZSB3aXRoIGJvZHkgYXJyYXlcIik7aWYoZS5ib2R5Lmxlbmd0aCE9PTEpcmV0dXJuITE7Y29uc3Qgcj1lLmJvZHlbMF07cmV0dXJuIXR8fE9iamVjdC5rZXlzKHQpLmV2ZXJ5KG49PnRbbl09PT1yW25dKX1mdW5jdGlvbiBhKGUpe3JldHVybiEoIWkuaGFzKGUudHlwZSl8fGUudHlwZT09PVwiQWJzZW5jZUZ1bmN0aW9uXCImJmUua2luZCE9PVwicmVwZWF0ZXJcIil9Y29uc3QgaT1uZXcgU2V0KFtcIkFic2VuY2VGdW5jdGlvblwiLFwiQ2FwdHVyaW5nR3JvdXBcIixcIkdyb3VwXCIsXCJMb29rYXJvdW5kQXNzZXJ0aW9uXCIsXCJSZWdleFwiXSk7ZnVuY3Rpb24gcyhlKXtyZXR1cm4geS5oYXMoZS50eXBlKX1jb25zdCB5PW5ldyBTZXQoW1wiQWJzZW5jZUZ1bmN0aW9uXCIsXCJCYWNrcmVmZXJlbmNlXCIsXCJDYXB0dXJpbmdHcm91cFwiLFwiQ2hhcmFjdGVyXCIsXCJDaGFyYWN0ZXJDbGFzc1wiLFwiQ2hhcmFjdGVyU2V0XCIsXCJHcm91cFwiLFwiUXVhbnRpZmllclwiLFwiU3Vicm91dGluZVwiXSk7ZXhwb3J0e28gYXMgaGFzT25seUNoaWxkLGEgYXMgaXNBbHRlcm5hdGl2ZUNvbnRhaW5lcixzIGFzIGlzUXVhbnRpZmlhYmxlfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vZGUtdXRpbHMuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtpbXBvcnR7dG9rZW5pemUgYXMgcX1mcm9tXCIuLi90b2tlbml6ZXIvdG9rZW5pemUuanNcIjtpbXBvcnR7Y3BPZiBhcyBILGdldE9ySW5zZXJ0IGFzIFosUG9zaXhDbGFzc05hbWVzIGFzIHgsciBhcyB5LHRocm93SWZOdWxsaXNoIGFzIGd9ZnJvbVwiLi4vdXRpbHMuanNcIjtpbXBvcnR7aGFzT25seUNoaWxkIGFzIFksaXNBbHRlcm5hdGl2ZUNvbnRhaW5lciBhcyBqLGlzUXVhbnRpZmlhYmxlIGFzIFN9ZnJvbVwiLi9ub2RlLXV0aWxzLmpzXCI7ZnVuY3Rpb24gSihlLHI9e30pe2NvbnN0IG49e2ZsYWdzOlwiXCIsbm9ybWFsaXplVW5rbm93blByb3BlcnR5TmFtZXM6ITEsc2tpcEJhY2tyZWZWYWxpZGF0aW9uOiExLHNraXBMb29rYmVoaW5kVmFsaWRhdGlvbjohMSxza2lwUHJvcGVydHlOYW1lVmFsaWRhdGlvbjohMSx1bmljb2RlUHJvcGVydHlNYXA6bnVsbCwuLi5yLHJ1bGVzOntjYXB0dXJlR3JvdXA6ITEsc2luZ2xlbGluZTohMSwuLi5yLnJ1bGVzfX0sbz1xKGUse2ZsYWdzOm4uZmxhZ3MscnVsZXM6e2NhcHR1cmVHcm91cDpuLnJ1bGVzLmNhcHR1cmVHcm91cCxzaW5nbGVsaW5lOm4ucnVsZXMuc2luZ2xlbGluZX19KSxpPShwLE4pPT57Y29uc3QgdT1vLnRva2Vuc1t0Lm5leHRJbmRleF07c3dpdGNoKHQucGFyZW50PXAsdC5uZXh0SW5kZXgrKyx1LnR5cGUpe2Nhc2VcIkFsdGVybmF0b3JcIjpyZXR1cm4gYigpO2Nhc2VcIkFzc2VydGlvblwiOnJldHVybiBXKHUpO2Nhc2VcIkJhY2tyZWZlcmVuY2VcIjpyZXR1cm4gWCh1LHQpO2Nhc2VcIkNoYXJhY3RlclwiOnJldHVybiBtKHUudmFsdWUse3VzZUxhc3RWYWxpZDohIU4uaXNDaGVja2luZ1JhbmdlRW5kfSk7Y2FzZVwiQ2hhcmFjdGVyQ2xhc3NIeXBoZW5cIjpyZXR1cm4gZWUodSx0LE4pO2Nhc2VcIkNoYXJhY3RlckNsYXNzT3BlblwiOnJldHVybiByZSh1LHQsTik7Y2FzZVwiQ2hhcmFjdGVyU2V0XCI6cmV0dXJuIG5lKHUsdCk7Y2FzZVwiRGlyZWN0aXZlXCI6cmV0dXJuIEkodS5raW5kLHtmbGFnczp1LmZsYWdzfSk7Y2FzZVwiR3JvdXBPcGVuXCI6cmV0dXJuIHRlKHUsdCxOKTtjYXNlXCJOYW1lZENhbGxvdXRcIjpyZXR1cm4gVSh1LmtpbmQsdS50YWcsdS5hcmd1bWVudHMpO2Nhc2VcIlF1YW50aWZpZXJcIjpyZXR1cm4gb2UodSx0KTtjYXNlXCJTdWJyb3V0aW5lXCI6cmV0dXJuIGFlKHUsdCk7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgdG9rZW4gdHlwZSBcIiR7dS50eXBlfVwiYCl9fSx0PXtjYXB0dXJpbmdHcm91cHM6W10saGFzTnVtYmVyZWRSZWY6ITEsbmFtZWRHcm91cHNCeU5hbWU6bmV3IE1hcCxuZXh0SW5kZXg6MCxub3JtYWxpemVVbmtub3duUHJvcGVydHlOYW1lczpuLm5vcm1hbGl6ZVVua25vd25Qcm9wZXJ0eU5hbWVzLHBhcmVudDpudWxsLHNraXBCYWNrcmVmVmFsaWRhdGlvbjpuLnNraXBCYWNrcmVmVmFsaWRhdGlvbixza2lwTG9va2JlaGluZFZhbGlkYXRpb246bi5za2lwTG9va2JlaGluZFZhbGlkYXRpb24sc2tpcFByb3BlcnR5TmFtZVZhbGlkYXRpb246bi5za2lwUHJvcGVydHlOYW1lVmFsaWRhdGlvbixzdWJyb3V0aW5lczpbXSx0b2tlbnM6by50b2tlbnMsdW5pY29kZVByb3BlcnR5TWFwOm4udW5pY29kZVByb3BlcnR5TWFwLHdhbGs6aX0sZD1CKFQoby5mbGFncykpO2xldCBzPWQuYm9keVswXTtmb3IoO3QubmV4dEluZGV4PG8udG9rZW5zLmxlbmd0aDspe2NvbnN0IHA9aShzLHt9KTtwLnR5cGU9PT1cIkFsdGVybmF0aXZlXCI/KGQuYm9keS5wdXNoKHApLHM9cCk6cy5ib2R5LnB1c2gocCl9Y29uc3R7Y2FwdHVyaW5nR3JvdXBzOmEsaGFzTnVtYmVyZWRSZWY6bCxuYW1lZEdyb3Vwc0J5TmFtZTpjLHN1YnJvdXRpbmVzOmZ9PXQ7aWYobCYmYy5zaXplJiYhbi5ydWxlcy5jYXB0dXJlR3JvdXApdGhyb3cgbmV3IEVycm9yKFwiTnVtYmVyZWQgYmFja3JlZi9zdWJyb3V0aW5lIG5vdCBhbGxvd2VkIHdoZW4gdXNpbmcgbmFtZWQgY2FwdHVyZVwiKTtmb3IoY29uc3R7cmVmOnB9b2YgZilpZih0eXBlb2YgcD09XCJudW1iZXJcIil7aWYocD5hLmxlbmd0aCl0aHJvdyBuZXcgRXJyb3IoXCJTdWJyb3V0aW5lIHVzZXMgYSBncm91cCBudW1iZXIgdGhhdCdzIG5vdCBkZWZpbmVkXCIpO3AmJihhW3AtMV0uaXNTdWJyb3V0aW5lZD0hMCl9ZWxzZSBpZihjLmhhcyhwKSl7aWYoYy5nZXQocCkubGVuZ3RoPjEpdGhyb3cgbmV3IEVycm9yKHlgU3Vicm91dGluZSB1c2VzIGEgZHVwbGljYXRlIGdyb3VwIG5hbWUgXCJcXGc8JHtwfT5cImApO2MuZ2V0KHApWzBdLmlzU3Vicm91dGluZWQ9ITB9ZWxzZSB0aHJvdyBuZXcgRXJyb3IoeWBTdWJyb3V0aW5lIHVzZXMgYSBncm91cCBuYW1lIHRoYXQncyBub3QgZGVmaW5lZCBcIlxcZzwke3B9PlwiYCk7cmV0dXJuIGR9ZnVuY3Rpb24gVyh7a2luZDplfSl7cmV0dXJuIEYoZyh7XCJeXCI6XCJsaW5lX3N0YXJ0XCIsJDpcImxpbmVfZW5kXCIsXCJcXFxcQVwiOlwic3RyaW5nX3N0YXJ0XCIsXCJcXFxcYlwiOlwid29yZF9ib3VuZGFyeVwiLFwiXFxcXEJcIjpcIndvcmRfYm91bmRhcnlcIixcIlxcXFxHXCI6XCJzZWFyY2hfc3RhcnRcIixcIlxcXFx5XCI6XCJ0ZXh0X3NlZ21lbnRfYm91bmRhcnlcIixcIlxcXFxZXCI6XCJ0ZXh0X3NlZ21lbnRfYm91bmRhcnlcIixcIlxcXFx6XCI6XCJzdHJpbmdfZW5kXCIsXCJcXFxcWlwiOlwic3RyaW5nX2VuZF9uZXdsaW5lXCJ9W2VdLGBVbmV4cGVjdGVkIGFzc2VydGlvbiBraW5kIFwiJHtlfVwiYCkse25lZ2F0ZTplPT09eWBcXEJgfHxlPT09eWBcXFlgfSl9ZnVuY3Rpb24gWCh7cmF3OmV9LHIpe2NvbnN0IG49L15cXFxca1s8J10vLnRlc3QoZSksbz1uP2Uuc2xpY2UoMywtMSk6ZS5zbGljZSgxKSxpPSh0LGQ9ITEpPT57Y29uc3Qgcz1yLmNhcHR1cmluZ0dyb3Vwcy5sZW5ndGg7bGV0IGE9ITE7aWYodD5zKWlmKHIuc2tpcEJhY2tyZWZWYWxpZGF0aW9uKWE9ITA7ZWxzZSB0aHJvdyBuZXcgRXJyb3IoYE5vdCBlbm91Z2ggY2FwdHVyaW5nIGdyb3VwcyBkZWZpbmVkIHRvIHRoZSBsZWZ0IFwiJHtlfVwiYCk7cmV0dXJuIHIuaGFzTnVtYmVyZWRSZWY9ITAsayhkP3MrMS10OnQse29ycGhhbjphfSl9O2lmKG4pe2NvbnN0IHQ9L14oPzxzaWduPi0/KTAqKD88bnVtPlsxLTldXFxkKikkLy5leGVjKG8pO2lmKHQpcmV0dXJuIGkoK3QuZ3JvdXBzLm51bSwhIXQuZ3JvdXBzLnNpZ24pO2lmKC9bLStdLy50ZXN0KG8pKXRocm93IG5ldyBFcnJvcihgSW52YWxpZCBiYWNrcmVmIG5hbWUgXCIke2V9XCJgKTtpZighci5uYW1lZEdyb3Vwc0J5TmFtZS5oYXMobykpdGhyb3cgbmV3IEVycm9yKGBHcm91cCBuYW1lIG5vdCBkZWZpbmVkIHRvIHRoZSBsZWZ0IFwiJHtlfVwiYCk7cmV0dXJuIGsobyl9cmV0dXJuIGkoK28pfWZ1bmN0aW9uIGVlKGUscixuKXtjb25zdHt0b2tlbnM6byx3YWxrOml9PXIsdD1yLnBhcmVudCxkPXQuYm9keS5hdCgtMSkscz1vW3IubmV4dEluZGV4XTtpZighbi5pc0NoZWNraW5nUmFuZ2VFbmQmJmQmJmQudHlwZSE9PVwiQ2hhcmFjdGVyQ2xhc3NcIiYmZC50eXBlIT09XCJDaGFyYWN0ZXJDbGFzc1JhbmdlXCImJnMmJnMudHlwZSE9PVwiQ2hhcmFjdGVyQ2xhc3NPcGVuXCImJnMudHlwZSE9PVwiQ2hhcmFjdGVyQ2xhc3NDbG9zZVwiJiZzLnR5cGUhPT1cIkNoYXJhY3RlckNsYXNzSW50ZXJzZWN0b3JcIil7Y29uc3QgYT1pKHQsey4uLm4saXNDaGVja2luZ1JhbmdlRW5kOiEwfSk7aWYoZC50eXBlPT09XCJDaGFyYWN0ZXJcIiYmYS50eXBlPT09XCJDaGFyYWN0ZXJcIilyZXR1cm4gdC5ib2R5LnBvcCgpLEwoZCxhKTt0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGNoYXJhY3RlciBjbGFzcyByYW5nZVwiKX1yZXR1cm4gbShIKFwiLVwiKSl9ZnVuY3Rpb24gcmUoe25lZ2F0ZTplfSxyLG4pe2NvbnN0e3Rva2VuczpvLHdhbGs6aX09cix0PVtDKCldLGQ9b1tyLm5leHRJbmRleF07bGV0IHM9eihkKTtmb3IoO3MudHlwZSE9PVwiQ2hhcmFjdGVyQ2xhc3NDbG9zZVwiOyl7aWYocy50eXBlPT09XCJDaGFyYWN0ZXJDbGFzc0ludGVyc2VjdG9yXCIpdC5wdXNoKEMoKSksci5uZXh0SW5kZXgrKztlbHNle2NvbnN0IGw9dC5hdCgtMSk7bC5ib2R5LnB1c2goaShsLG4pKX1zPXoob1tyLm5leHRJbmRleF0sZCl9Y29uc3QgYT1DKHtuZWdhdGU6ZX0pO3JldHVybiB0Lmxlbmd0aD09PTE/YS5ib2R5PXRbMF0uYm9keTooYS5raW5kPVwiaW50ZXJzZWN0aW9uXCIsYS5ib2R5PXQubWFwKGw9PmwuYm9keS5sZW5ndGg9PT0xP2wuYm9keVswXTpsKSksci5uZXh0SW5kZXgrKyxhfWZ1bmN0aW9uIG5lKHtraW5kOmUsbmVnYXRlOnIsdmFsdWU6bn0sbyl7Y29uc3R7bm9ybWFsaXplVW5rbm93blByb3BlcnR5TmFtZXM6aSxza2lwUHJvcGVydHlOYW1lVmFsaWRhdGlvbjp0LHVuaWNvZGVQcm9wZXJ0eU1hcDpkfT1vO2lmKGU9PT1cInByb3BlcnR5XCIpe2NvbnN0IHM9dyhuKTtpZih4LmhhcyhzKSYmIWQ/LmhhcyhzKSllPVwicG9zaXhcIixuPXM7ZWxzZSByZXR1cm4gUShuLHtuZWdhdGU6cixub3JtYWxpemVVbmtub3duUHJvcGVydHlOYW1lczppLHNraXBQcm9wZXJ0eU5hbWVWYWxpZGF0aW9uOnQsdW5pY29kZVByb3BlcnR5TWFwOmR9KX1yZXR1cm4gZT09PVwicG9zaXhcIj9SKG4se25lZ2F0ZTpyfSk6RShlLHtuZWdhdGU6cn0pfWZ1bmN0aW9uIHRlKGUscixuKXtjb25zdHt0b2tlbnM6byxjYXB0dXJpbmdHcm91cHM6aSxuYW1lZEdyb3Vwc0J5TmFtZTp0LHNraXBMb29rYmVoaW5kVmFsaWRhdGlvbjpkLHdhbGs6c309cixhPWllKGUpLGw9YS50eXBlPT09XCJBYnNlbmNlRnVuY3Rpb25cIixjPSQoYSksZj1jJiZhLm5lZ2F0ZTtpZihhLnR5cGU9PT1cIkNhcHR1cmluZ0dyb3VwXCImJihpLnB1c2goYSksYS5uYW1lJiZaKHQsYS5uYW1lLFtdKS5wdXNoKGEpKSxsJiZuLmlzSW5BYnNlbmNlRnVuY3Rpb24pdGhyb3cgbmV3IEVycm9yKFwiTmVzdGVkIGFic2VuY2UgZnVuY3Rpb24gbm90IHN1cHBvcnRlZCBieSBPbmlndXJ1bWFcIik7bGV0IHA9RChvW3IubmV4dEluZGV4XSk7Zm9yKDtwLnR5cGUhPT1cIkdyb3VwQ2xvc2VcIjspe2lmKHAudHlwZT09PVwiQWx0ZXJuYXRvclwiKWEuYm9keS5wdXNoKGIoKSksci5uZXh0SW5kZXgrKztlbHNle2NvbnN0IE49YS5ib2R5LmF0KC0xKSx1PXMoTix7Li4ubixpc0luQWJzZW5jZUZ1bmN0aW9uOm4uaXNJbkFic2VuY2VGdW5jdGlvbnx8bCxpc0luTG9va2JlaGluZDpuLmlzSW5Mb29rYmVoaW5kfHxjLGlzSW5OZWdMb29rYmVoaW5kOm4uaXNJbk5lZ0xvb2tiZWhpbmR8fGZ9KTtpZihOLmJvZHkucHVzaCh1KSwoY3x8bi5pc0luTG9va2JlaGluZCkmJiFkKXtjb25zdCB2PVwiTG9va2JlaGluZCBpbmNsdWRlcyBhIHBhdHRlcm4gbm90IGFsbG93ZWQgYnkgT25pZ3VydW1hXCI7aWYoZnx8bi5pc0luTmVnTG9va2JlaGluZCl7aWYoTSh1KXx8dS50eXBlPT09XCJDYXB0dXJpbmdHcm91cFwiKXRocm93IG5ldyBFcnJvcih2KX1lbHNlIGlmKE0odSl8fCQodSkmJnUubmVnYXRlKXRocm93IG5ldyBFcnJvcih2KX19cD1EKG9bci5uZXh0SW5kZXhdKX1yZXR1cm4gci5uZXh0SW5kZXgrKyxhfWZ1bmN0aW9uIG9lKHtraW5kOmUsbWluOnIsbWF4Om59LG8pe2NvbnN0IGk9by5wYXJlbnQsdD1pLmJvZHkuYXQoLTEpO2lmKCF0fHwhUyh0KSl0aHJvdyBuZXcgRXJyb3IoXCJRdWFudGlmaWVyIHJlcXVpcmVzIGEgcmVwZWF0YWJsZSB0b2tlblwiKTtjb25zdCBkPV8oZSxyLG4sdCk7cmV0dXJuIGkuYm9keS5wb3AoKSxkfWZ1bmN0aW9uIGFlKHtyYXc6ZX0scil7Y29uc3R7Y2FwdHVyaW5nR3JvdXBzOm4sc3Vicm91dGluZXM6b309cjtsZXQgaT1lLnNsaWNlKDMsLTEpO2NvbnN0IHQ9L14oPzxzaWduPlstK10/KTAqKD88bnVtPlsxLTldXFxkKikkLy5leGVjKGkpO2lmKHQpe2NvbnN0IHM9K3QuZ3JvdXBzLm51bSxhPW4ubGVuZ3RoO2lmKHIuaGFzTnVtYmVyZWRSZWY9ITAsaT17XCJcIjpzLFwiK1wiOmErcyxcIi1cIjphKzEtc31bdC5ncm91cHMuc2lnbl0saTwxKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc3Vicm91dGluZSBudW1iZXJcIil9ZWxzZSBpPT09XCIwXCImJihpPTApO2NvbnN0IGQ9TyhpKTtyZXR1cm4gby5wdXNoKGQpLGR9ZnVuY3Rpb24gRyhlLHIpe2lmKGUhPT1cInJlcGVhdGVyXCIpdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIGFic2VuY2UgZnVuY3Rpb24ga2luZCBcIiR7ZX1cImApO3JldHVybnt0eXBlOlwiQWJzZW5jZUZ1bmN0aW9uXCIsa2luZDplLGJvZHk6aChyPy5ib2R5KX19ZnVuY3Rpb24gYihlKXtyZXR1cm57dHlwZTpcIkFsdGVybmF0aXZlXCIsYm9keTpWKGU/LmJvZHkpfX1mdW5jdGlvbiBGKGUscil7Y29uc3Qgbj17dHlwZTpcIkFzc2VydGlvblwiLGtpbmQ6ZX07cmV0dXJuKGU9PT1cIndvcmRfYm91bmRhcnlcInx8ZT09PVwidGV4dF9zZWdtZW50X2JvdW5kYXJ5XCIpJiYobi5uZWdhdGU9ISFyPy5uZWdhdGUpLG59ZnVuY3Rpb24gayhlLHIpe2NvbnN0IG49ISFyPy5vcnBoYW47cmV0dXJue3R5cGU6XCJCYWNrcmVmZXJlbmNlXCIscmVmOmUsLi4ubiYme29ycGhhbjpufX19ZnVuY3Rpb24gUChlLHIpe2NvbnN0IG49e25hbWU6dm9pZCAwLGlzU3Vicm91dGluZWQ6ITEsLi4ucn07aWYobi5uYW1lIT09dm9pZCAwJiYhc2Uobi5uYW1lKSl0aHJvdyBuZXcgRXJyb3IoYEdyb3VwIG5hbWUgXCIke24ubmFtZX1cIiBpbnZhbGlkIGluIE9uaWd1cnVtYWApO3JldHVybnt0eXBlOlwiQ2FwdHVyaW5nR3JvdXBcIixudW1iZXI6ZSwuLi5uLm5hbWUmJntuYW1lOm4ubmFtZX0sLi4ubi5pc1N1YnJvdXRpbmVkJiZ7aXNTdWJyb3V0aW5lZDpuLmlzU3Vicm91dGluZWR9LGJvZHk6aChyPy5ib2R5KX19ZnVuY3Rpb24gbShlLHIpe2NvbnN0IG49e3VzZUxhc3RWYWxpZDohMSwuLi5yfTtpZihlPjExMTQxMTEpe2NvbnN0IG89ZS50b1N0cmluZygxNik7aWYobi51c2VMYXN0VmFsaWQpZT0xMTE0MTExO2Vsc2UgdGhyb3cgZT4xMzEwNzE5P25ldyBFcnJvcihgSW52YWxpZCBjb2RlIHBvaW50IG91dCBvZiByYW5nZSBcIlxcXFx4eyR7b319XCJgKTpuZXcgRXJyb3IoYEludmFsaWQgY29kZSBwb2ludCBvdXQgb2YgcmFuZ2UgaW4gSlMgXCJcXFxceHske299fVwiYCl9cmV0dXJue3R5cGU6XCJDaGFyYWN0ZXJcIix2YWx1ZTplfX1mdW5jdGlvbiBDKGUpe2NvbnN0IHI9e2tpbmQ6XCJ1bmlvblwiLG5lZ2F0ZTohMSwuLi5lfTtyZXR1cm57dHlwZTpcIkNoYXJhY3RlckNsYXNzXCIsa2luZDpyLmtpbmQsbmVnYXRlOnIubmVnYXRlLGJvZHk6VihlPy5ib2R5KX19ZnVuY3Rpb24gTChlLHIpe2lmKHIudmFsdWU8ZS52YWx1ZSl0aHJvdyBuZXcgRXJyb3IoXCJDaGFyYWN0ZXIgY2xhc3MgcmFuZ2Ugb3V0IG9mIG9yZGVyXCIpO3JldHVybnt0eXBlOlwiQ2hhcmFjdGVyQ2xhc3NSYW5nZVwiLG1pbjplLG1heDpyfX1mdW5jdGlvbiBFKGUscil7Y29uc3Qgbj0hIXI/Lm5lZ2F0ZSxvPXt0eXBlOlwiQ2hhcmFjdGVyU2V0XCIsa2luZDplfTtyZXR1cm4oZT09PVwiZGlnaXRcInx8ZT09PVwiaGV4XCJ8fGU9PT1cIm5ld2xpbmVcInx8ZT09PVwic3BhY2VcInx8ZT09PVwid29yZFwiKSYmKG8ubmVnYXRlPW4pLChlPT09XCJ0ZXh0X3NlZ21lbnRcInx8ZT09PVwibmV3bGluZVwiJiYhbikmJihvLnZhcmlhYmxlTGVuZ3RoPSEwKSxvfWZ1bmN0aW9uIEkoZSxyPXt9KXtpZihlPT09XCJrZWVwXCIpcmV0dXJue3R5cGU6XCJEaXJlY3RpdmVcIixraW5kOmV9O2lmKGU9PT1cImZsYWdzXCIpcmV0dXJue3R5cGU6XCJEaXJlY3RpdmVcIixraW5kOmUsZmxhZ3M6ZyhyLmZsYWdzKX07dGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIGRpcmVjdGl2ZSBraW5kIFwiJHtlfVwiYCl9ZnVuY3Rpb24gVChlKXtyZXR1cm57dHlwZTpcIkZsYWdzXCIsLi4uZX19ZnVuY3Rpb24gQShlKXtjb25zdCByPWU/LmF0b21pYyxuPWU/LmZsYWdzO2lmKHImJm4pdGhyb3cgbmV3IEVycm9yKFwiQXRvbWljIGdyb3VwIGNhbm5vdCBoYXZlIGZsYWdzXCIpO3JldHVybnt0eXBlOlwiR3JvdXBcIiwuLi5yJiZ7YXRvbWljOnJ9LC4uLm4mJntmbGFnczpufSxib2R5OmgoZT8uYm9keSl9fWZ1bmN0aW9uIEsoZSl7Y29uc3Qgcj17YmVoaW5kOiExLG5lZ2F0ZTohMSwuLi5lfTtyZXR1cm57dHlwZTpcIkxvb2thcm91bmRBc3NlcnRpb25cIixraW5kOnIuYmVoaW5kP1wibG9va2JlaGluZFwiOlwibG9va2FoZWFkXCIsbmVnYXRlOnIubmVnYXRlLGJvZHk6aChlPy5ib2R5KX19ZnVuY3Rpb24gVShlLHIsbil7cmV0dXJue3R5cGU6XCJOYW1lZENhbGxvdXRcIixraW5kOmUsdGFnOnIsYXJndW1lbnRzOm59fWZ1bmN0aW9uIFIoZSxyKXtjb25zdCBuPSEhcj8ubmVnYXRlO2lmKCF4LmhhcyhlKSl0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgUE9TSVggY2xhc3MgXCIke2V9XCJgKTtyZXR1cm57dHlwZTpcIkNoYXJhY3RlclNldFwiLGtpbmQ6XCJwb3NpeFwiLHZhbHVlOmUsbmVnYXRlOm59fWZ1bmN0aW9uIF8oZSxyLG4sbyl7aWYocj5uKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcmV2ZXJzZWQgcXVhbnRpZmllciByYW5nZVwiKTtyZXR1cm57dHlwZTpcIlF1YW50aWZpZXJcIixraW5kOmUsbWluOnIsbWF4Om4sYm9keTpvfX1mdW5jdGlvbiBCKGUscil7cmV0dXJue3R5cGU6XCJSZWdleFwiLGJvZHk6aChyPy5ib2R5KSxmbGFnczplfX1mdW5jdGlvbiBPKGUpe3JldHVybnt0eXBlOlwiU3Vicm91dGluZVwiLHJlZjplfX1mdW5jdGlvbiBRKGUscil7Y29uc3Qgbj17bmVnYXRlOiExLG5vcm1hbGl6ZVVua25vd25Qcm9wZXJ0eU5hbWVzOiExLHNraXBQcm9wZXJ0eU5hbWVWYWxpZGF0aW9uOiExLHVuaWNvZGVQcm9wZXJ0eU1hcDpudWxsLC4uLnJ9O2xldCBvPW4udW5pY29kZVByb3BlcnR5TWFwPy5nZXQodyhlKSk7aWYoIW8pe2lmKG4ubm9ybWFsaXplVW5rbm93blByb3BlcnR5TmFtZXMpbz1kZShlKTtlbHNlIGlmKG4udW5pY29kZVByb3BlcnR5TWFwJiYhbi5za2lwUHJvcGVydHlOYW1lVmFsaWRhdGlvbil0aHJvdyBuZXcgRXJyb3IoeWBJbnZhbGlkIFVuaWNvZGUgcHJvcGVydHkgXCJcXHB7JHtlfX1cImApfXJldHVybnt0eXBlOlwiQ2hhcmFjdGVyU2V0XCIsa2luZDpcInByb3BlcnR5XCIsdmFsdWU6bz8/ZSxuZWdhdGU6bi5uZWdhdGV9fWZ1bmN0aW9uIGllKHtmbGFnczplLGtpbmQ6cixuYW1lOm4sbmVnYXRlOm8sbnVtYmVyOml9KXtzd2l0Y2gocil7Y2FzZVwiYWJzZW5jZV9yZXBlYXRlclwiOnJldHVybiBHKFwicmVwZWF0ZXJcIik7Y2FzZVwiYXRvbWljXCI6cmV0dXJuIEEoe2F0b21pYzohMH0pO2Nhc2VcImNhcHR1cmluZ1wiOnJldHVybiBQKGkse25hbWU6bn0pO2Nhc2VcImdyb3VwXCI6cmV0dXJuIEEoe2ZsYWdzOmV9KTtjYXNlXCJsb29rYWhlYWRcIjpjYXNlXCJsb29rYmVoaW5kXCI6cmV0dXJuIEsoe2JlaGluZDpyPT09XCJsb29rYmVoaW5kXCIsbmVnYXRlOm99KTtkZWZhdWx0OnRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBncm91cCBraW5kIFwiJHtyfVwiYCl9fWZ1bmN0aW9uIGgoZSl7aWYoZT09PXZvaWQgMCllPVtiKCldO2Vsc2UgaWYoIUFycmF5LmlzQXJyYXkoZSl8fCFlLmxlbmd0aHx8IWUuZXZlcnkocj0+ci50eXBlPT09XCJBbHRlcm5hdGl2ZVwiKSl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGJvZHk7IGV4cGVjdGVkIGFycmF5IG9mIG9uZSBvciBtb3JlIEFsdGVybmF0aXZlIG5vZGVzXCIpO3JldHVybiBlfWZ1bmN0aW9uIFYoZSl7aWYoZT09PXZvaWQgMCllPVtdO2Vsc2UgaWYoIUFycmF5LmlzQXJyYXkoZSl8fCFlLmV2ZXJ5KHI9PiEhci50eXBlKSl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGJvZHk7IGV4cGVjdGVkIGFycmF5IG9mIG5vZGVzXCIpO3JldHVybiBlfWZ1bmN0aW9uIE0oZSl7cmV0dXJuIGUudHlwZT09PVwiTG9va2Fyb3VuZEFzc2VydGlvblwiJiZlLmtpbmQ9PT1cImxvb2thaGVhZFwifWZ1bmN0aW9uICQoZSl7cmV0dXJuIGUudHlwZT09PVwiTG9va2Fyb3VuZEFzc2VydGlvblwiJiZlLmtpbmQ9PT1cImxvb2tiZWhpbmRcIn1mdW5jdGlvbiBzZShlKXtyZXR1cm4vXltcXHB7QWxwaGF9XFxwe1BjfV1bXildKiQvdS50ZXN0KGUpfWZ1bmN0aW9uIGRlKGUpe3JldHVybiBlLnRyaW0oKS5yZXBsYWNlKC9bLSBfXSsvZyxcIl9cIikucmVwbGFjZSgvW0EtWl1bYS16XSsoPz1bQS1aXSkvZyxcIiQmX1wiKS5yZXBsYWNlKC9bQS1aYS16XSsvZyxyPT5yWzBdLnRvVXBwZXJDYXNlKCkrci5zbGljZSgxKS50b0xvd2VyQ2FzZSgpKX1mdW5jdGlvbiB3KGUpe3JldHVybiBlLnJlcGxhY2UoL1stIF9dKy9nLFwiXCIpLnRvTG93ZXJDYXNlKCl9ZnVuY3Rpb24geihlLHIpe2NvbnN0IG49cjtyZXR1cm4gZyhlLGBVbmNsb3NlZCBjaGFyYWN0ZXIgY2xhc3Mke24/LnR5cGU9PT1cIkNoYXJhY3RlclwiJiZuLnZhbHVlPT09OTMmJm4ucmF3PT09XCJdXCI/JyAoc3RhcnRlZCB3aXRoIFwiXVwiKSc6XCJcIn1gKX1mdW5jdGlvbiBEKGUpe3JldHVybiBnKGUsXCJVbmNsb3NlZCBncm91cFwiKX1leHBvcnR7RyBhcyBjcmVhdGVBYnNlbmNlRnVuY3Rpb24sYiBhcyBjcmVhdGVBbHRlcm5hdGl2ZSxGIGFzIGNyZWF0ZUFzc2VydGlvbixrIGFzIGNyZWF0ZUJhY2tyZWZlcmVuY2UsUCBhcyBjcmVhdGVDYXB0dXJpbmdHcm91cCxtIGFzIGNyZWF0ZUNoYXJhY3RlcixDIGFzIGNyZWF0ZUNoYXJhY3RlckNsYXNzLEwgYXMgY3JlYXRlQ2hhcmFjdGVyQ2xhc3NSYW5nZSxFIGFzIGNyZWF0ZUNoYXJhY3RlclNldCxJIGFzIGNyZWF0ZURpcmVjdGl2ZSxUIGFzIGNyZWF0ZUZsYWdzLEEgYXMgY3JlYXRlR3JvdXAsSyBhcyBjcmVhdGVMb29rYXJvdW5kQXNzZXJ0aW9uLFUgYXMgY3JlYXRlTmFtZWRDYWxsb3V0LFIgYXMgY3JlYXRlUG9zaXhDbGFzcyxfIGFzIGNyZWF0ZVF1YW50aWZpZXIsQiBhcyBjcmVhdGVSZWdleCxPIGFzIGNyZWF0ZVN1YnJvdXRpbmUsUSBhcyBjcmVhdGVVbmljb2RlUHJvcGVydHksWSBhcyBoYXNPbmx5Q2hpbGQsaiBhcyBpc0FsdGVybmF0aXZlQ29udGFpbmVyLFMgYXMgaXNRdWFudGlmaWFibGUsSiBhcyBwYXJzZSx3IGFzIHNsdWd9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFyc2UuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtpbXBvcnR7dGhyb3dJZk51bGxpc2ggYXMgQX1mcm9tXCIuLi91dGlscy5qc1wiO2Z1bmN0aW9uIFMoYSx2LE49bnVsbCl7ZnVuY3Rpb24gYihlLHMpe2ZvcihsZXQgdD0wO3Q8ZS5sZW5ndGg7dCsrKXtjb25zdCByPW4oZVt0XSxzLHQsZSk7dD1NYXRoLm1heCgtMSx0K3IpfX1mdW5jdGlvbiBuKGUscz1udWxsLHQ9bnVsbCxyPW51bGwpe2xldCBpPTAsYz0hMTtjb25zdCBkPXtub2RlOmUscGFyZW50OnMsa2V5OnQsY29udGFpbmVyOnIscm9vdDphLHJlbW92ZSgpe3gocikuc3BsaWNlKE1hdGgubWF4KDAsbCh0KStpKSwxKSxpLS0sYz0hMH0scmVtb3ZlQWxsTmV4dFNpYmxpbmdzKCl7cmV0dXJuIHgocikuc3BsaWNlKGwodCkrMSl9LHJlbW92ZUFsbFByZXZTaWJsaW5ncygpe2NvbnN0IG89bCh0KStpO3JldHVybiBpLT1vLHgocikuc3BsaWNlKDAsTWF0aC5tYXgoMCxvKSl9LHJlcGxhY2VXaXRoKG8sbT17fSl7Y29uc3QgeT0hIW0udHJhdmVyc2U7cj9yW01hdGgubWF4KDAsbCh0KStpKV09bzpBKHMsXCJDYW4ndCByZXBsYWNlIHJvb3Qgbm9kZVwiKVt0XT1vLHkmJm4obyxzLHQsciksYz0hMH0scmVwbGFjZVdpdGhNdWx0aXBsZShvLG09e30pe2NvbnN0IHk9ISFtLnRyYXZlcnNlO2lmKHgocikuc3BsaWNlKE1hdGgubWF4KDAsbCh0KStpKSwxLC4uLm8pLGkrPW8ubGVuZ3RoLTEseSl7bGV0IGc9MDtmb3IobGV0IHA9MDtwPG8ubGVuZ3RoO3ArKylnKz1uKG9bcF0scyxsKHQpK3ArZyxyKX1jPSEwfSxza2lwKCl7Yz0hMH19LHt0eXBlOmZ9PWUsdT12W1wiKlwiXSxoPXZbZl0sUj10eXBlb2YgdT09XCJmdW5jdGlvblwiP3U6dT8uZW50ZXIsUD10eXBlb2YgaD09XCJmdW5jdGlvblwiP2g6aD8uZW50ZXI7aWYoUj8uKGQsTiksUD8uKGQsTiksIWMpc3dpdGNoKGYpe2Nhc2VcIkFic2VuY2VGdW5jdGlvblwiOmNhc2VcIkFsdGVybmF0aXZlXCI6Y2FzZVwiQ2FwdHVyaW5nR3JvdXBcIjpjYXNlXCJDaGFyYWN0ZXJDbGFzc1wiOmNhc2VcIkdyb3VwXCI6Y2FzZVwiTG9va2Fyb3VuZEFzc2VydGlvblwiOmIoZS5ib2R5LGUpO2JyZWFrO2Nhc2VcIkFzc2VydGlvblwiOmNhc2VcIkJhY2tyZWZlcmVuY2VcIjpjYXNlXCJDaGFyYWN0ZXJcIjpjYXNlXCJDaGFyYWN0ZXJTZXRcIjpjYXNlXCJEaXJlY3RpdmVcIjpjYXNlXCJGbGFnc1wiOmNhc2VcIk5hbWVkQ2FsbG91dFwiOmNhc2VcIlN1YnJvdXRpbmVcIjpicmVhaztjYXNlXCJDaGFyYWN0ZXJDbGFzc1JhbmdlXCI6bihlLm1pbixlLFwibWluXCIpLG4oZS5tYXgsZSxcIm1heFwiKTticmVhaztjYXNlXCJRdWFudGlmaWVyXCI6bihlLmJvZHksZSxcImJvZHlcIik7YnJlYWs7Y2FzZVwiUmVnZXhcIjpiKGUuYm9keSxlKSxuKGUuZmxhZ3MsZSxcImZsYWdzXCIpO2JyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIG5vZGUgdHlwZSBcIiR7Zn1cImApfXJldHVybiBoPy5leGl0Py4oZCxOKSx1Py5leGl0Py4oZCxOKSxpfXJldHVybiBuKGEpLGF9ZnVuY3Rpb24geChhKXtpZighQXJyYXkuaXNBcnJheShhKSl0aHJvdyBuZXcgRXJyb3IoXCJDb250YWluZXIgZXhwZWN0ZWRcIik7cmV0dXJuIGF9ZnVuY3Rpb24gbChhKXtpZih0eXBlb2YgYSE9XCJudW1iZXJcIil0aHJvdyBuZXcgRXJyb3IoXCJOdW1lcmljIGtleSBleHBlY3RlZFwiKTtyZXR1cm4gYX1leHBvcnR7UyBhcyB0cmF2ZXJzZX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD10cmF2ZXJzZS5qcy5tYXBcbiIsIi8vIFNlcGFyYXRpbmcgc29tZSB1dGlscyBmb3IgaW1wcm92ZWQgdHJlZSBzaGFraW5nIG9mIHRoZSBgLi9pbnRlcm5hbHNgIGV4cG9ydFxuXG5jb25zdCBub25jYXB0dXJpbmdEZWxpbSA9IFN0cmluZy5yYXdgXFwoXFw/KD86Wzo9IT5BLVphLXpcXC1dfDxbPSFdfFxcKERFRklORVxcKSlgO1xuXG4vKipcblVwZGF0ZXMgdGhlIGFycmF5IGluIHBsYWNlIGJ5IGluY3JlbWVudGluZyBlYWNoIHZhbHVlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB0aGUgdGhyZXNob2xkLlxuQHBhcmFtIHtBcnJheTxudW1iZXI+fSBhcnJcbkBwYXJhbSB7bnVtYmVyfSB0aHJlc2hvbGRcbiovXG5mdW5jdGlvbiBpbmNyZW1lbnRJZkF0TGVhc3QoYXJyLCB0aHJlc2hvbGQpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYXJyW2ldID49IHRocmVzaG9sZCkge1xuICAgICAgYXJyW2ldKys7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuQHBhcmFtIHtzdHJpbmd9IHN0clxuQHBhcmFtIHtudW1iZXJ9IHBvc1xuQHBhcmFtIHtzdHJpbmd9IG9sZFZhbHVlXG5AcGFyYW0ge3N0cmluZ30gbmV3VmFsdWVcbkByZXR1cm5zIHtzdHJpbmd9XG4qL1xuZnVuY3Rpb24gc3BsaWNlU3RyKHN0ciwgcG9zLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgcmV0dXJuIHN0ci5zbGljZSgwLCBwb3MpICsgbmV3VmFsdWUgKyBzdHIuc2xpY2UocG9zICsgb2xkVmFsdWUubGVuZ3RoKTtcbn1cblxuZXhwb3J0IHtcbiAgaW5jcmVtZW50SWZBdExlYXN0LFxuICBub25jYXB0dXJpbmdEZWxpbSxcbiAgc3BsaWNlU3RyLFxufTtcbiIsIi8vIENvbnN0YW50IHByb3BlcnRpZXMgZm9yIHRyYWNraW5nIHJlZ2V4IHN5bnRheCBjb250ZXh0XG5leHBvcnQgY29uc3QgQ29udGV4dCA9IE9iamVjdC5mcmVlemUoe1xuICBERUZBVUxUOiAnREVGQVVMVCcsXG4gIENIQVJfQ0xBU1M6ICdDSEFSX0NMQVNTJyxcbn0pO1xuXG4vKipcblJlcGxhY2VzIGFsbCB1bmVzY2FwZWQgaW5zdGFuY2VzIG9mIGEgcmVnZXggcGF0dGVybiBpbiB0aGUgZ2l2ZW4gY29udGV4dCwgdXNpbmcgYSByZXBsYWNlbWVudFxuc3RyaW5nIG9yIGNhbGxiYWNrLlxuXG5Eb2Vzbid0IHNraXAgb3ZlciBjb21wbGV0ZSBtdWx0aWNoYXJhY3RlciB0b2tlbnMgKG9ubHkgYFxcYCBwbHVzIGl0cyBmb2xvd2luZyBjaGFyKSBzbyBtdXN0IGJlIHVzZWRcbndpdGgga25vd2xlZGdlIG9mIHdoYXQncyBzYWZlIHRvIGRvIGdpdmVuIHJlZ2V4IHN5bnRheC4gQXNzdW1lcyBVbmljb2RlU2V0cy1tb2RlIHN5bnRheC5cbkBwYXJhbSB7c3RyaW5nfSBleHByZXNzaW9uIFNlYXJjaCB0YXJnZXRcbkBwYXJhbSB7c3RyaW5nfSBuZWVkbGUgU2VhcmNoIGFzIGEgcmVnZXggcGF0dGVybiwgd2l0aCBmbGFncyBgc3VgIGFwcGxpZWRcbkBwYXJhbSB7c3RyaW5nIHwgKG1hdGNoOiBSZWdFeHBFeGVjQXJyYXksIGRldGFpbHM6IHtcbiAgY29udGV4dDogJ0RFRkFVTFQnIHwgJ0NIQVJfQ0xBU1MnO1xuICBuZWdhdGVkOiBib29sZWFuO1xufSkgPT4gc3RyaW5nfSByZXBsYWNlbWVudFxuQHBhcmFtIHsnREVGQVVMVCcgfCAnQ0hBUl9DTEFTUyd9IFtjb250ZXh0XSBBbGwgY29udGV4dHMgaWYgbm90IHNwZWNpZmllZFxuQHJldHVybnMge3N0cmluZ30gVXBkYXRlZCBleHByZXNzaW9uXG5AZXhhbXBsZVxuY29uc3Qgc3RyID0gJy5cXFxcLlxcXFxcXFxcLltbXFxcXC5dLl0uJztcbnJlcGxhY2VVbmVzY2FwZWQoc3RyLCAnXFxcXC4nLCAnQCcpO1xuLy8g4oaSICdAXFxcXC5cXFxcXFxcXEBbW1xcXFwuXUBdQCdcbnJlcGxhY2VVbmVzY2FwZWQoc3RyLCAnXFxcXC4nLCAnQCcsIENvbnRleHQuREVGQVVMVCk7XG4vLyDihpIgJ0BcXFxcLlxcXFxcXFxcQFtbXFxcXC5dLl1AJ1xucmVwbGFjZVVuZXNjYXBlZChzdHIsICdcXFxcLicsICdAJywgQ29udGV4dC5DSEFSX0NMQVNTKTtcbi8vIOKGkiAnLlxcXFwuXFxcXFxcXFwuW1tcXFxcLl1AXS4nXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VVbmVzY2FwZWQoZXhwcmVzc2lvbiwgbmVlZGxlLCByZXBsYWNlbWVudCwgY29udGV4dCkge1xuICBjb25zdCByZSA9IG5ldyBSZWdFeHAoU3RyaW5nLnJhd2Ake25lZWRsZX18KD88JHNraXA+XFxbXFxeP3xcXFxcPy4pYCwgJ2dzdScpO1xuICBjb25zdCBuZWdhdGVkID0gW2ZhbHNlXTtcbiAgbGV0IG51bUNoYXJDbGFzc2VzT3BlbiA9IDA7XG4gIGxldCByZXN1bHQgPSAnJztcbiAgZm9yIChjb25zdCBtYXRjaCBvZiBleHByZXNzaW9uLm1hdGNoQWxsKHJlKSkge1xuICAgIGNvbnN0IHswOiBtLCBncm91cHM6IHskc2tpcH19ID0gbWF0Y2g7XG4gICAgaWYgKCEkc2tpcCAmJiAoIWNvbnRleHQgfHwgKGNvbnRleHQgPT09IENvbnRleHQuREVGQVVMVCkgPT09ICFudW1DaGFyQ2xhc3Nlc09wZW4pKSB7XG4gICAgICBpZiAocmVwbGFjZW1lbnQgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICByZXN1bHQgKz0gcmVwbGFjZW1lbnQobWF0Y2gsIHtcbiAgICAgICAgICBjb250ZXh0OiBudW1DaGFyQ2xhc3Nlc09wZW4gPyBDb250ZXh0LkNIQVJfQ0xBU1MgOiBDb250ZXh0LkRFRkFVTFQsXG4gICAgICAgICAgbmVnYXRlZDogbmVnYXRlZFtuZWdhdGVkLmxlbmd0aCAtIDFdLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCArPSByZXBsYWNlbWVudDtcbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAobVswXSA9PT0gJ1snKSB7XG4gICAgICBudW1DaGFyQ2xhc3Nlc09wZW4rKztcbiAgICAgIG5lZ2F0ZWQucHVzaChtWzFdID09PSAnXicpO1xuICAgIH0gZWxzZSBpZiAobSA9PT0gJ10nICYmIG51bUNoYXJDbGFzc2VzT3Blbikge1xuICAgICAgbnVtQ2hhckNsYXNzZXNPcGVuLS07XG4gICAgICBuZWdhdGVkLnBvcCgpO1xuICAgIH1cbiAgICByZXN1bHQgKz0gbTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcblJ1bnMgYSBjYWxsYmFjayBmb3IgZWFjaCB1bmVzY2FwZWQgaW5zdGFuY2Ugb2YgYSByZWdleCBwYXR0ZXJuIGluIHRoZSBnaXZlbiBjb250ZXh0LlxuXG5Eb2Vzbid0IHNraXAgb3ZlciBjb21wbGV0ZSBtdWx0aWNoYXJhY3RlciB0b2tlbnMgKG9ubHkgYFxcYCBwbHVzIGl0cyBmb2xvd2luZyBjaGFyKSBzbyBtdXN0IGJlIHVzZWRcbndpdGgga25vd2xlZGdlIG9mIHdoYXQncyBzYWZlIHRvIGRvIGdpdmVuIHJlZ2V4IHN5bnRheC4gQXNzdW1lcyBVbmljb2RlU2V0cy1tb2RlIHN5bnRheC5cbkBwYXJhbSB7c3RyaW5nfSBleHByZXNzaW9uIFNlYXJjaCB0YXJnZXRcbkBwYXJhbSB7c3RyaW5nfSBuZWVkbGUgU2VhcmNoIGFzIGEgcmVnZXggcGF0dGVybiwgd2l0aCBmbGFncyBgc3VgIGFwcGxpZWRcbkBwYXJhbSB7KG1hdGNoOiBSZWdFeHBFeGVjQXJyYXksIGRldGFpbHM6IHtcbiAgY29udGV4dDogJ0RFRkFVTFQnIHwgJ0NIQVJfQ0xBU1MnO1xuICBuZWdhdGVkOiBib29sZWFuO1xufSkgPT4gdm9pZH0gY2FsbGJhY2tcbkBwYXJhbSB7J0RFRkFVTFQnIHwgJ0NIQVJfQ0xBU1MnfSBbY29udGV4dF0gQWxsIGNvbnRleHRzIGlmIG5vdCBzcGVjaWZpZWRcbiovXG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaFVuZXNjYXBlZChleHByZXNzaW9uLCBuZWVkbGUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIC8vIERvIHRoaXMgdGhlIGVhc3kgd2F5XG4gIHJlcGxhY2VVbmVzY2FwZWQoZXhwcmVzc2lvbiwgbmVlZGxlLCBjYWxsYmFjaywgY29udGV4dCk7XG59XG5cbi8qKlxuUmV0dXJucyBhIG1hdGNoIG9iamVjdCBmb3IgdGhlIGZpcnN0IHVuZXNjYXBlZCBpbnN0YW5jZSBvZiBhIHJlZ2V4IHBhdHRlcm4gaW4gdGhlIGdpdmVuIGNvbnRleHQsIG9yXG5gbnVsbGAuXG5cbkRvZXNuJ3Qgc2tpcCBvdmVyIGNvbXBsZXRlIG11bHRpY2hhcmFjdGVyIHRva2VucyAob25seSBgXFxgIHBsdXMgaXRzIGZvbG93aW5nIGNoYXIpIHNvIG11c3QgYmUgdXNlZFxud2l0aCBrbm93bGVkZ2Ugb2Ygd2hhdCdzIHNhZmUgdG8gZG8gZ2l2ZW4gcmVnZXggc3ludGF4LiBBc3N1bWVzIFVuaWNvZGVTZXRzLW1vZGUgc3ludGF4LlxuQHBhcmFtIHtzdHJpbmd9IGV4cHJlc3Npb24gU2VhcmNoIHRhcmdldFxuQHBhcmFtIHtzdHJpbmd9IG5lZWRsZSBTZWFyY2ggYXMgYSByZWdleCBwYXR0ZXJuLCB3aXRoIGZsYWdzIGBzdWAgYXBwbGllZFxuQHBhcmFtIHtudW1iZXJ9IFtwb3NdIE9mZnNldCB0byBzdGFydCB0aGUgc2VhcmNoXG5AcGFyYW0geydERUZBVUxUJyB8ICdDSEFSX0NMQVNTJ30gW2NvbnRleHRdIEFsbCBjb250ZXh0cyBpZiBub3Qgc3BlY2lmaWVkXG5AcmV0dXJucyB7UmVnRXhwRXhlY0FycmF5IHwgbnVsbH1cbiovXG5leHBvcnQgZnVuY3Rpb24gZXhlY1VuZXNjYXBlZChleHByZXNzaW9uLCBuZWVkbGUsIHBvcyA9IDAsIGNvbnRleHQpIHtcbiAgLy8gUXVpY2sgcGFydGlhbCB0ZXN0OyBhdm9pZCB0aGUgbG9vcCBpZiBub3QgbmVlZGVkXG4gIGlmICghKG5ldyBSZWdFeHAobmVlZGxlLCAnc3UnKS50ZXN0KGV4cHJlc3Npb24pKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0IHJlID0gbmV3IFJlZ0V4cChgJHtuZWVkbGV9fCg/PCRza2lwPlxcXFxcXFxcPy4pYCwgJ2dzdScpO1xuICByZS5sYXN0SW5kZXggPSBwb3M7XG4gIGxldCBudW1DaGFyQ2xhc3Nlc09wZW4gPSAwO1xuICBsZXQgbWF0Y2g7XG4gIHdoaWxlIChtYXRjaCA9IHJlLmV4ZWMoZXhwcmVzc2lvbikpIHtcbiAgICBjb25zdCB7MDogbSwgZ3JvdXBzOiB7JHNraXB9fSA9IG1hdGNoO1xuICAgIGlmICghJHNraXAgJiYgKCFjb250ZXh0IHx8IChjb250ZXh0ID09PSBDb250ZXh0LkRFRkFVTFQpID09PSAhbnVtQ2hhckNsYXNzZXNPcGVuKSkge1xuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH1cbiAgICBpZiAobSA9PT0gJ1snKSB7XG4gICAgICBudW1DaGFyQ2xhc3Nlc09wZW4rKztcbiAgICB9IGVsc2UgaWYgKG0gPT09ICddJyAmJiBudW1DaGFyQ2xhc3Nlc09wZW4pIHtcbiAgICAgIG51bUNoYXJDbGFzc2VzT3Blbi0tO1xuICAgIH1cbiAgICAvLyBBdm9pZCBhbiBpbmZpbml0ZSBsb29wIG9uIHplcm8tbGVuZ3RoIG1hdGNoZXNcbiAgICBpZiAocmUubGFzdEluZGV4ID09IG1hdGNoLmluZGV4KSB7XG4gICAgICByZS5sYXN0SW5kZXgrKztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuQ2hlY2tzIHdoZXRoZXIgYW4gdW5lc2NhcGVkIGluc3RhbmNlIG9mIGEgcmVnZXggcGF0dGVybiBhcHBlYXJzIGluIHRoZSBnaXZlbiBjb250ZXh0LlxuXG5Eb2Vzbid0IHNraXAgb3ZlciBjb21wbGV0ZSBtdWx0aWNoYXJhY3RlciB0b2tlbnMgKG9ubHkgYFxcYCBwbHVzIGl0cyBmb2xvd2luZyBjaGFyKSBzbyBtdXN0IGJlIHVzZWRcbndpdGgga25vd2xlZGdlIG9mIHdoYXQncyBzYWZlIHRvIGRvIGdpdmVuIHJlZ2V4IHN5bnRheC4gQXNzdW1lcyBVbmljb2RlU2V0cy1tb2RlIHN5bnRheC5cbkBwYXJhbSB7c3RyaW5nfSBleHByZXNzaW9uIFNlYXJjaCB0YXJnZXRcbkBwYXJhbSB7c3RyaW5nfSBuZWVkbGUgU2VhcmNoIGFzIGEgcmVnZXggcGF0dGVybiwgd2l0aCBmbGFncyBgc3VgIGFwcGxpZWRcbkBwYXJhbSB7J0RFRkFVTFQnIHwgJ0NIQVJfQ0xBU1MnfSBbY29udGV4dF0gQWxsIGNvbnRleHRzIGlmIG5vdCBzcGVjaWZpZWRcbkByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIHRoZSBwYXR0ZXJuIHdhcyBmb3VuZFxuKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNVbmVzY2FwZWQoZXhwcmVzc2lvbiwgbmVlZGxlLCBjb250ZXh0KSB7XG4gIC8vIERvIHRoaXMgdGhlIGVhc3kgd2F5XG4gIHJldHVybiAhIWV4ZWNVbmVzY2FwZWQoZXhwcmVzc2lvbiwgbmVlZGxlLCAwLCBjb250ZXh0KTtcbn1cblxuLyoqXG5FeHRyYWN0cyB0aGUgZnVsbCBjb250ZW50cyBvZiBhIGdyb3VwIChzdWJwYXR0ZXJuKSBmcm9tIHRoZSBnaXZlbiBleHByZXNzaW9uLCBhY2NvdW50aW5nIGZvclxuZXNjYXBlZCBjaGFyYWN0ZXJzLCBuZXN0ZWQgZ3JvdXBzLCBhbmQgY2hhcmFjdGVyIGNsYXNzZXMuIFRoZSBncm91cCBpcyBpZGVudGlmaWVkIGJ5IHRoZSBwb3NpdGlvblxud2hlcmUgaXRzIGNvbnRlbnRzIHN0YXJ0ICh0aGUgc3RyaW5nIGluZGV4IGp1c3QgYWZ0ZXIgdGhlIGdyb3VwJ3Mgb3BlbmluZyBkZWxpbWl0ZXIpLiBSZXR1cm5zIHRoZVxucmVzdCBvZiB0aGUgc3RyaW5nIGlmIHRoZSBncm91cCBpcyB1bmNsb3NlZC5cblxuQXNzdW1lcyBVbmljb2RlU2V0cy1tb2RlIHN5bnRheC5cbkBwYXJhbSB7c3RyaW5nfSBleHByZXNzaW9uIFNlYXJjaCB0YXJnZXRcbkBwYXJhbSB7bnVtYmVyfSBjb250ZW50c1N0YXJ0UG9zXG5AcmV0dXJucyB7c3RyaW5nfVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRHcm91cENvbnRlbnRzKGV4cHJlc3Npb24sIGNvbnRlbnRzU3RhcnRQb3MpIHtcbiAgY29uc3QgdG9rZW4gPSAvXFxcXD8uL2dzdTtcbiAgdG9rZW4ubGFzdEluZGV4ID0gY29udGVudHNTdGFydFBvcztcbiAgbGV0IGNvbnRlbnRzRW5kUG9zID0gZXhwcmVzc2lvbi5sZW5ndGg7XG4gIGxldCBudW1DaGFyQ2xhc3Nlc09wZW4gPSAwO1xuICAvLyBTdGFydGluZyBzZWFyY2ggd2l0aGluIGFuIG9wZW4gZ3JvdXAsIGFmdGVyIHRoZSBncm91cCdzIG9wZW5pbmdcbiAgbGV0IG51bUdyb3Vwc09wZW4gPSAxO1xuICBsZXQgbWF0Y2g7XG4gIHdoaWxlIChtYXRjaCA9IHRva2VuLmV4ZWMoZXhwcmVzc2lvbikpIHtcbiAgICBjb25zdCBbbV0gPSBtYXRjaDtcbiAgICBpZiAobSA9PT0gJ1snKSB7XG4gICAgICBudW1DaGFyQ2xhc3Nlc09wZW4rKztcbiAgICB9IGVsc2UgaWYgKCFudW1DaGFyQ2xhc3Nlc09wZW4pIHtcbiAgICAgIGlmIChtID09PSAnKCcpIHtcbiAgICAgICAgbnVtR3JvdXBzT3BlbisrO1xuICAgICAgfSBlbHNlIGlmIChtID09PSAnKScpIHtcbiAgICAgICAgbnVtR3JvdXBzT3Blbi0tO1xuICAgICAgICBpZiAoIW51bUdyb3Vwc09wZW4pIHtcbiAgICAgICAgICBjb250ZW50c0VuZFBvcyA9IG1hdGNoLmluZGV4O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtID09PSAnXScpIHtcbiAgICAgIG51bUNoYXJDbGFzc2VzT3Blbi0tO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZXhwcmVzc2lvbi5zbGljZShjb250ZW50c1N0YXJ0UG9zLCBjb250ZW50c0VuZFBvcyk7XG59XG4iLCJpbXBvcnQge2luY3JlbWVudElmQXRMZWFzdCwgbm9uY2FwdHVyaW5nRGVsaW0sIHNwbGljZVN0cn0gZnJvbSAnLi91dGlscy1pbnRlcm5hbHMuanMnO1xuaW1wb3J0IHtDb250ZXh0LCByZXBsYWNlVW5lc2NhcGVkfSBmcm9tICdyZWdleC11dGlsaXRpZXMnO1xuLyoqXG5AaW1wb3J0IHtQbHVnaW5EYXRhLCBQbHVnaW5SZXN1bHR9IGZyb20gJy4vcmVnZXguanMnO1xuKi9cblxuY29uc3QgYXRvbWljUGx1Z2luVG9rZW4gPSBuZXcgUmVnRXhwKFN0cmluZy5yYXdgKD88bm9uY2FwdHVyaW5nU3RhcnQ+JHtub25jYXB0dXJpbmdEZWxpbX0pfCg/PGNhcHR1cmluZ1N0YXJ0PlxcKCg/OlxcPzxbXj5dKz4pPyl8XFxcXD8uYCwgJ2dzdScpO1xuXG4vKipcbkFwcGx5IHRyYW5zZm9ybWF0aW9ucyBmb3IgYXRvbWljIGdyb3VwczogYCg/PuKApilgLlxuQHBhcmFtIHtzdHJpbmd9IGV4cHJlc3Npb25cbkBwYXJhbSB7UGx1Z2luRGF0YX0gW2RhdGFdXG5AcmV0dXJucyB7UmVxdWlyZWQ8UGx1Z2luUmVzdWx0Pn1cbiovXG5mdW5jdGlvbiBhdG9taWMoZXhwcmVzc2lvbiwgZGF0YSkge1xuICBjb25zdCBoaWRkZW5DYXB0dXJlcyA9IGRhdGE/LmhpZGRlbkNhcHR1cmVzID8/IFtdO1xuICAvLyBDYXB0dXJlIHRyYW5zZmVyIGlzIHVzZWQgYnkgPGdpdGh1Yi5jb20vc2xldml0aGFuL29uaWd1cnVtYS10by1lcz5cbiAgbGV0IGNhcHR1cmVUcmFuc2ZlcnMgPSBkYXRhPy5jYXB0dXJlVHJhbnNmZXJzID8/IG5ldyBNYXAoKTtcbiAgaWYgKCEvXFwoXFw/Pi8udGVzdChleHByZXNzaW9uKSkge1xuICAgIHJldHVybiB7XG4gICAgICBwYXR0ZXJuOiBleHByZXNzaW9uLFxuICAgICAgY2FwdHVyZVRyYW5zZmVycyxcbiAgICAgIGhpZGRlbkNhcHR1cmVzLFxuICAgIH07XG4gIH1cblxuICBjb25zdCBhR0RlbGltID0gJyg/Pic7XG4gIGNvbnN0IGVtdWxhdGVkQUdEZWxpbSA9ICcoPzooPz0oJztcbiAgY29uc3QgY2FwdHVyZU51bU1hcCA9IFswXTtcbiAgY29uc3QgYWRkZWRIaWRkZW5DYXB0dXJlcyA9IFtdO1xuICBsZXQgbnVtQ2FwdHVyZXNCZWZvcmVBRyA9IDA7XG4gIGxldCBudW1BR3MgPSAwO1xuICBsZXQgYUdQb3MgPSBOYU47XG4gIGxldCBoYXNQcm9jZXNzZWRBRztcbiAgZG8ge1xuICAgIGhhc1Byb2Nlc3NlZEFHID0gZmFsc2U7XG4gICAgbGV0IG51bUNoYXJDbGFzc2VzT3BlbiA9IDA7XG4gICAgbGV0IG51bUdyb3Vwc09wZW5JbkFHID0gMDtcbiAgICBsZXQgaW5BRyA9IGZhbHNlO1xuICAgIGxldCBtYXRjaDtcbiAgICBhdG9taWNQbHVnaW5Ub2tlbi5sYXN0SW5kZXggPSBOdW1iZXIuaXNOYU4oYUdQb3MpID8gMCA6IGFHUG9zICsgZW11bGF0ZWRBR0RlbGltLmxlbmd0aDtcbiAgICB3aGlsZSAobWF0Y2ggPSBhdG9taWNQbHVnaW5Ub2tlbi5leGVjKGV4cHJlc3Npb24pKSB7XG4gICAgICBjb25zdCB7MDogbSwgaW5kZXgsIGdyb3Vwczoge2NhcHR1cmluZ1N0YXJ0LCBub25jYXB0dXJpbmdTdGFydH19ID0gbWF0Y2g7XG4gICAgICBpZiAobSA9PT0gJ1snKSB7XG4gICAgICAgIG51bUNoYXJDbGFzc2VzT3BlbisrO1xuICAgICAgfSBlbHNlIGlmICghbnVtQ2hhckNsYXNzZXNPcGVuKSB7XG5cbiAgICAgICAgaWYgKG0gPT09IGFHRGVsaW0gJiYgIWluQUcpIHtcbiAgICAgICAgICBhR1BvcyA9IGluZGV4O1xuICAgICAgICAgIGluQUcgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGluQUcgJiYgbm9uY2FwdHVyaW5nU3RhcnQpIHtcbiAgICAgICAgICBudW1Hcm91cHNPcGVuSW5BRysrO1xuICAgICAgICB9IGVsc2UgaWYgKGNhcHR1cmluZ1N0YXJ0KSB7XG4gICAgICAgICAgaWYgKGluQUcpIHtcbiAgICAgICAgICAgIG51bUdyb3Vwc09wZW5JbkFHKys7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG51bUNhcHR1cmVzQmVmb3JlQUcrKztcbiAgICAgICAgICAgIGNhcHR1cmVOdW1NYXAucHVzaChudW1DYXB0dXJlc0JlZm9yZUFHICsgbnVtQUdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobSA9PT0gJyknICYmIGluQUcpIHtcbiAgICAgICAgICBpZiAoIW51bUdyb3Vwc09wZW5JbkFHKSB7XG4gICAgICAgICAgICBudW1BR3MrKztcbiAgICAgICAgICAgIGNvbnN0IGFkZGVkQ2FwdHVyZU51bSA9IG51bUNhcHR1cmVzQmVmb3JlQUcgKyBudW1BR3M7XG4gICAgICAgICAgICAvLyBSZXBsYWNlIGBleHByZXNzaW9uYCBhbmQgdXNlIGA8JCROPmAgYXMgYSB0ZW1wb3Jhcnkgd3JhcHBlciBmb3IgdGhlIGJhY2tyZWYgc28gaXRcbiAgICAgICAgICAgIC8vIGNhbiBhdm9pZCBiYWNrcmVmIHJlbnVtYmVyaW5nIGFmdGVyd2FyZC4gV3JhcCB0aGUgd2hvbGUgc3Vic3RpdHV0aW9uIChpbmNsdWRpbmcgdGhlXG4gICAgICAgICAgICAvLyBsb29rYWhlYWQgYW5kIGZvbGxvd2luZyBiYWNrcmVmKSBpbiBhIG5vbmNhcHR1cmluZyBncm91cCB0byBoYW5kbGUgZm9sbG93aW5nXG4gICAgICAgICAgICAvLyBxdWFudGlmaWVycyBhbmQgbGl0ZXJhbCBkaWdpdHNcbiAgICAgICAgICAgIGV4cHJlc3Npb24gPSBgJHtleHByZXNzaW9uLnNsaWNlKDAsIGFHUG9zKX0ke2VtdWxhdGVkQUdEZWxpbX0ke1xuICAgICAgICAgICAgICAgIGV4cHJlc3Npb24uc2xpY2UoYUdQb3MgKyBhR0RlbGltLmxlbmd0aCwgaW5kZXgpXG4gICAgICAgICAgICAgIH0pKTwkJCR7YWRkZWRDYXB0dXJlTnVtfT4pJHtleHByZXNzaW9uLnNsaWNlKGluZGV4ICsgMSl9YDtcbiAgICAgICAgICAgIGhhc1Byb2Nlc3NlZEFHID0gdHJ1ZTtcbiAgICAgICAgICAgIGFkZGVkSGlkZGVuQ2FwdHVyZXMucHVzaChhZGRlZENhcHR1cmVOdW0pO1xuICAgICAgICAgICAgaW5jcmVtZW50SWZBdExlYXN0KGhpZGRlbkNhcHR1cmVzLCBhZGRlZENhcHR1cmVOdW0pO1xuICAgICAgICAgICAgaWYgKGNhcHR1cmVUcmFuc2ZlcnMuc2l6ZSkge1xuICAgICAgICAgICAgICBjb25zdCBuZXdDYXB0dXJlVHJhbnNmZXJzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICBjYXB0dXJlVHJhbnNmZXJzLmZvckVhY2goKGZyb20sIHRvKSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3Q2FwdHVyZVRyYW5zZmVycy5zZXQoXG4gICAgICAgICAgICAgICAgICB0byA+PSBhZGRlZENhcHR1cmVOdW0gPyB0byArIDEgOiB0byxcbiAgICAgICAgICAgICAgICAgIGZyb20ubWFwKGYgPT4gZiA+PSBhZGRlZENhcHR1cmVOdW0gPyBmICsgMSA6IGYpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGNhcHR1cmVUcmFuc2ZlcnMgPSBuZXdDYXB0dXJlVHJhbnNmZXJzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIG51bUdyb3Vwc09wZW5JbkFHLS07XG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIGlmIChtID09PSAnXScpIHtcbiAgICAgICAgbnVtQ2hhckNsYXNzZXNPcGVuLS07XG4gICAgICB9XG4gICAgfVxuICAvLyBTdGFydCBvdmVyIGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgYXRvbWljIGdyb3VwJ3MgY29udGVudHMsIGluIGNhc2UgdGhlIHByb2Nlc3NlZCBncm91cFxuICAvLyBjb250YWlucyBhZGRpdGlvbmFsIGF0b21pYyBncm91cHNcbiAgfSB3aGlsZSAoaGFzUHJvY2Vzc2VkQUcpO1xuXG4gIGhpZGRlbkNhcHR1cmVzLnB1c2goLi4uYWRkZWRIaWRkZW5DYXB0dXJlcyk7XG5cbiAgLy8gU2Vjb25kIHBhc3MgdG8gYWRqdXN0IG51bWJlcmVkIGJhY2tyZWZzXG4gIGV4cHJlc3Npb24gPSByZXBsYWNlVW5lc2NhcGVkKFxuICAgIGV4cHJlc3Npb24sXG4gICAgU3RyaW5nLnJhd2BcXFxcKD88YmFja3JlZk51bT5bMS05XVxcZCopfDxcXCRcXCQoPzx3cmFwcGVkQmFja3JlZk51bT5cXGQrKT5gLFxuICAgICh7MDogbSwgZ3JvdXBzOiB7YmFja3JlZk51bSwgd3JhcHBlZEJhY2tyZWZOdW19fSkgPT4ge1xuICAgICAgaWYgKGJhY2tyZWZOdW0pIHtcbiAgICAgICAgY29uc3QgYk51bSA9ICtiYWNrcmVmTnVtO1xuICAgICAgICBpZiAoYk51bSA+IGNhcHR1cmVOdW1NYXAubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQmFja3JlZiBcIiR7bX1cIiBncmVhdGVyIHRoYW4gbnVtYmVyIG9mIGNhcHR1cmVzYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGBcXFxcJHtjYXB0dXJlTnVtTWFwW2JOdW1dfWA7XG4gICAgICB9XG4gICAgICByZXR1cm4gYFxcXFwke3dyYXBwZWRCYWNrcmVmTnVtfWA7XG4gICAgfSxcbiAgICBDb250ZXh0LkRFRkFVTFRcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIHBhdHRlcm46IGV4cHJlc3Npb24sXG4gICAgY2FwdHVyZVRyYW5zZmVycyxcbiAgICBoaWRkZW5DYXB0dXJlcyxcbiAgfTtcbn1cblxuY29uc3QgYmFzZVF1YW50aWZpZXIgPSBTdHJpbmcucmF3YCg/Ols/KitdfFxce1xcZCsoPzosXFxkKik/XFx9KWA7XG4vLyBDb21wbGV0ZSB0b2tlbml6ZXIgZm9yIGJhc2Ugc3ludGF4OyBkb2Vzbid0IChuZWVkIHRvKSBrbm93IGFib3V0IGNoYXJhY3Rlci1jbGFzcy1vbmx5IHN5bnRheFxuY29uc3QgcG9zc2Vzc2l2ZVBsdWdpblRva2VuID0gbmV3IFJlZ0V4cChTdHJpbmcucmF3YFxuXFxcXCg/OiBcXGQrXG4gIHwgY1tBLVphLXpdXG4gIHwgW2drXTxbXj5dKz5cbiAgfCBbcFB1XVxce1teXFx9XStcXH1cbiAgfCB1W0EtRmEtZlxcZF17NH1cbiAgfCB4W0EtRmEtZlxcZF17Mn1cbiAgKVxufCBcXCgoPzogXFw/ICg/OiBbOj0hPl1cbiAgfCA8KD86Wz0hXXxbXj5dKz4pXG4gIHwgW0EtWmEtelxcLV0rOlxuICB8IFxcKERFRklORVxcKVxuICApKT9cbnwgKD88cUJhc2U+JHtiYXNlUXVhbnRpZmllcn0pKD88cU1vZD5bPytdPykoPzxpbnZhbGlkUT5bPyorXFx7XT8pXG58IFxcXFw/LlxuYC5yZXBsYWNlKC9cXHMrL2csICcnKSwgJ2dzdScpO1xuXG4vKipcblRyYW5zZm9ybSBwb3Nlc3NpdmUgcXVhbnRpZmllcnMgaW50byBhdG9taWMgZ3JvdXBzLiBUaGUgcG9zZXNzZXNzaXZlIHF1YW50aWZpZXJzIGFyZTpcbmA/K2AsIGAqK2AsIGArK2AsIGB7Tn0rYCwgYHtOLH0rYCwgYHtOLE59K2AuXG5UaGlzIGZvbGxvd3MgSmF2YSwgUENSRSwgUGVybCwgYW5kIFB5dGhvbi5cblBvc3Nlc3NpdmUgcXVhbnRpZmllcnMgaW4gT25pZ3VydW1hIGFuZCBPbmlnbW8gYXJlIG9ubHk6IGA/K2AsIGAqK2AsIGArK2AuXG5AcGFyYW0ge3N0cmluZ30gZXhwcmVzc2lvblxuQHJldHVybnMge1BsdWdpblJlc3VsdH1cbiovXG5mdW5jdGlvbiBwb3NzZXNzaXZlKGV4cHJlc3Npb24pIHtcbiAgaWYgKCEobmV3IFJlZ0V4cChgJHtiYXNlUXVhbnRpZmllcn1cXFxcK2ApLnRlc3QoZXhwcmVzc2lvbikpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdHRlcm46IGV4cHJlc3Npb24sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IG9wZW5Hcm91cEluZGljZXMgPSBbXTtcbiAgbGV0IGxhc3RHcm91cEluZGV4ID0gbnVsbDtcbiAgbGV0IGxhc3RDaGFyQ2xhc3NJbmRleCA9IG51bGw7XG4gIGxldCBsYXN0VG9rZW4gPSAnJztcbiAgbGV0IG51bUNoYXJDbGFzc2VzT3BlbiA9IDA7XG4gIGxldCBtYXRjaDtcbiAgcG9zc2Vzc2l2ZVBsdWdpblRva2VuLmxhc3RJbmRleCA9IDA7XG4gIHdoaWxlIChtYXRjaCA9IHBvc3Nlc3NpdmVQbHVnaW5Ub2tlbi5leGVjKGV4cHJlc3Npb24pKSB7XG4gICAgY29uc3QgezA6IG0sIGluZGV4LCBncm91cHM6IHtxQmFzZSwgcU1vZCwgaW52YWxpZFF9fSA9IG1hdGNoO1xuICAgIGlmIChtID09PSAnWycpIHtcbiAgICAgIGlmICghbnVtQ2hhckNsYXNzZXNPcGVuKSB7XG4gICAgICAgIGxhc3RDaGFyQ2xhc3NJbmRleCA9IGluZGV4O1xuICAgICAgfVxuICAgICAgbnVtQ2hhckNsYXNzZXNPcGVuKys7XG4gICAgfSBlbHNlIGlmIChtID09PSAnXScpIHtcbiAgICAgIGlmIChudW1DaGFyQ2xhc3Nlc09wZW4pIHtcbiAgICAgICAgbnVtQ2hhckNsYXNzZXNPcGVuLS07XG4gICAgICAvLyBVbm1hdGNoZWQgYF1gXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsYXN0Q2hhckNsYXNzSW5kZXggPSBudWxsO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIW51bUNoYXJDbGFzc2VzT3Blbikge1xuXG4gICAgICBpZiAocU1vZCA9PT0gJysnICYmIGxhc3RUb2tlbiAmJiAhbGFzdFRva2VuLnN0YXJ0c1dpdGgoJygnKSkge1xuICAgICAgICAvLyBJbnZhbGlkIGZvbGxvd2luZyBxdWFudGlmaWVyIHdvdWxkIGJlY29tZSB2YWxpZCB2aWEgdGhlIHdyYXBwaW5nIGdyb3VwXG4gICAgICAgIGlmIChpbnZhbGlkUSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBxdWFudGlmaWVyIFwiJHttfVwiYCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNoYXJzQWRkZWQgPSAtMTsgLy8gLTEgZm9yIHJlbW92ZWQgdHJhaWxpbmcgYCtgXG4gICAgICAgIC8vIFBvc3Nlc3Npdml6aW5nIGZpeGVkIHJlcGV0aXRpb24gcXVhbnRpZmllcnMgbGlrZSBgezJ9YCBkb2VzJ3QgY2hhbmdlIHRoZWlyIGJlaGF2aW9yLCBzb1xuICAgICAgICAvLyBhdm9pZCBkb2luZyBzbyAoY29udmVydCB0aGVtIHRvIGdyZWVkeSlcbiAgICAgICAgaWYgKC9eXFx7XFxkK1xcfSQvLnRlc3QocUJhc2UpKSB7XG4gICAgICAgICAgZXhwcmVzc2lvbiA9IHNwbGljZVN0cihleHByZXNzaW9uLCBpbmRleCArIHFCYXNlLmxlbmd0aCwgcU1vZCwgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChsYXN0VG9rZW4gPT09ICcpJyB8fCBsYXN0VG9rZW4gPT09ICddJykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZUluZGV4ID0gbGFzdFRva2VuID09PSAnKScgPyBsYXN0R3JvdXBJbmRleCA6IGxhc3RDaGFyQ2xhc3NJbmRleDtcbiAgICAgICAgICAgIC8vIFVubWF0Y2hlZCBgKWAgd291bGQgYnJlYWsgb3V0IG9mIHRoZSB3cmFwcGluZyBncm91cCBhbmQgbWVzcyB3aXRoIGhhbmRsaW5nLlxuICAgICAgICAgICAgLy8gVW5tYXRjaGVkIGBdYCB3b3VsZG4ndCBiZSBhIHByb2JsZW0sIGJ1dCBpdCdzIHVubmVjZXNzYXJ5IHRvIGhhdmUgZGVkaWNhdGVkIHN1cHBvcnRcbiAgICAgICAgICAgIC8vIGZvciB1bmVzY2FwZWQgYF0rK2Agc2luY2UgdGhpcyB3b24ndCB3b3JrIHdpdGggZmxhZyB1IG9yIHYgYW55d2F5XG4gICAgICAgICAgICBpZiAobm9kZUluZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB1bm1hdGNoZWQgXCIke2xhc3RUb2tlbn1cImApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXhwcmVzc2lvbiA9IGAke2V4cHJlc3Npb24uc2xpY2UoMCwgbm9kZUluZGV4KX0oPz4ke2V4cHJlc3Npb24uc2xpY2Uobm9kZUluZGV4LCBpbmRleCl9JHtxQmFzZX0pJHtleHByZXNzaW9uLnNsaWNlKGluZGV4ICsgbS5sZW5ndGgpfWA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4cHJlc3Npb24gPSBgJHtleHByZXNzaW9uLnNsaWNlKDAsIGluZGV4IC0gbGFzdFRva2VuLmxlbmd0aCl9KD8+JHtsYXN0VG9rZW59JHtxQmFzZX0pJHtleHByZXNzaW9uLnNsaWNlKGluZGV4ICsgbS5sZW5ndGgpfWA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNoYXJzQWRkZWQgKz0gNDsgLy8gYCg/PilgXG4gICAgICAgIH1cbiAgICAgICAgcG9zc2Vzc2l2ZVBsdWdpblRva2VuLmxhc3RJbmRleCArPSBjaGFyc0FkZGVkO1xuICAgICAgfSBlbHNlIGlmIChtWzBdID09PSAnKCcpIHtcbiAgICAgICAgb3Blbkdyb3VwSW5kaWNlcy5wdXNoKGluZGV4KTtcbiAgICAgIH0gZWxzZSBpZiAobSA9PT0gJyknKSB7XG4gICAgICAgIGxhc3RHcm91cEluZGV4ID0gb3Blbkdyb3VwSW5kaWNlcy5sZW5ndGggPyBvcGVuR3JvdXBJbmRpY2VzLnBvcCgpIDogbnVsbDtcbiAgICAgIH1cblxuICAgIH1cbiAgICBsYXN0VG9rZW4gPSBtO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwYXR0ZXJuOiBleHByZXNzaW9uLFxuICB9O1xufVxuXG5leHBvcnQge1xuICBhdG9taWMsXG4gIHBvc3Nlc3NpdmUsXG59O1xuIiwiaW1wb3J0IHtDb250ZXh0LCBmb3JFYWNoVW5lc2NhcGVkLCBnZXRHcm91cENvbnRlbnRzLCBoYXNVbmVzY2FwZWQsIHJlcGxhY2VVbmVzY2FwZWR9IGZyb20gJ3JlZ2V4LXV0aWxpdGllcyc7XG5cbmNvbnN0IHIgPSBTdHJpbmcucmF3O1xuY29uc3QgZ1JUb2tlbiA9IHJgXFxcXGc8KD88Z1JOYW1lT3JOdW0+W14+Jl0rKSZSPSg/PGdSRGVwdGg+W14+XSspPmA7XG5jb25zdCByZWN1cnNpdmVUb2tlbiA9IHJgXFwoXFw/Uj0oPzxyRGVwdGg+W15cXCldKylcXCl8JHtnUlRva2VufWA7XG5jb25zdCBuYW1lZENhcHR1cmVEZWxpbSA9IHJgXFwoXFw/PCg/IVs9IV0pKD88Y2FwdHVyZU5hbWU+W14+XSspPmA7XG5jb25zdCBjYXB0dXJlRGVsaW0gPSByYCR7bmFtZWRDYXB0dXJlRGVsaW19fCg/PHVubmFtZWQ+XFwoKSg/IVxcPylgO1xuY29uc3QgdG9rZW4gPSBuZXcgUmVnRXhwKHJgJHtuYW1lZENhcHR1cmVEZWxpbX18JHtyZWN1cnNpdmVUb2tlbn18XFwoXFw/fFxcXFw/LmAsICdnc3UnKTtcbmNvbnN0IG92ZXJsYXBwaW5nUmVjdXJzaW9uTXNnID0gJ0Nhbm5vdCB1c2UgbXVsdGlwbGUgb3ZlcmxhcHBpbmcgcmVjdXJzaW9ucyc7XG5cbi8qKlxuQHBhcmFtIHtzdHJpbmd9IHBhdHRlcm5cbkBwYXJhbSB7e1xuICBmbGFncz86IHN0cmluZztcbiAgY2FwdHVyZVRyYW5zZmVycz86IE1hcDxudW1iZXIsIEFycmF5PG51bWJlcj4+O1xuICBoaWRkZW5DYXB0dXJlcz86IEFycmF5PG51bWJlcj47XG4gIG1vZGU/OiAncGx1Z2luJyB8ICdleHRlcm5hbCc7XG59fSBbZGF0YV1cbkByZXR1cm5zIHt7XG4gIHBhdHRlcm46IHN0cmluZztcbiAgY2FwdHVyZVRyYW5zZmVyczogTWFwPG51bWJlciwgQXJyYXk8bnVtYmVyPj47XG4gIGhpZGRlbkNhcHR1cmVzOiBBcnJheTxudW1iZXI+O1xufX1cbiovXG5mdW5jdGlvbiByZWN1cnNpb24ocGF0dGVybiwgZGF0YSkge1xuICBjb25zdCB7aGlkZGVuQ2FwdHVyZXMsIG1vZGV9ID0ge1xuICAgIGhpZGRlbkNhcHR1cmVzOiBbXSxcbiAgICBtb2RlOiAncGx1Z2luJyxcbiAgICAuLi5kYXRhLFxuICB9O1xuICAvLyBDYXB0dXJlIHRyYW5zZmVyIGlzIHVzZWQgYnkgPGdpdGh1Yi5jb20vc2xldml0aGFuL29uaWd1cnVtYS10by1lcz5cbiAgbGV0IGNhcHR1cmVUcmFuc2ZlcnMgPSBkYXRhPy5jYXB0dXJlVHJhbnNmZXJzID8/IG5ldyBNYXAoKTtcbiAgLy8gS2VlcCB0aGUgaW5pdGlhbCBmYWlsLWNoZWNrICh3aGljaCBhdm9pZHMgdW5uZWVkZWQgcHJvY2Vzc2luZykgYXMgZmFzdCBhcyBwb3NzaWJsZSBieSB0ZXN0aW5nXG4gIC8vIHdpdGhvdXQgdGhlIGFjY3VyYWN5IGltcHJvdmVtZW50IG9mIHVzaW5nIGBoYXNVbmVzY2FwZWRgIHdpdGggYENvbnRleHQuREVGQVVMVGBcbiAgaWYgKCEobmV3IFJlZ0V4cChyZWN1cnNpdmVUb2tlbiwgJ3N1JykudGVzdChwYXR0ZXJuKSkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcGF0dGVybixcbiAgICAgIGNhcHR1cmVUcmFuc2ZlcnMsXG4gICAgICBoaWRkZW5DYXB0dXJlcyxcbiAgICB9O1xuICB9XG4gIGlmIChtb2RlID09PSAncGx1Z2luJyAmJiBoYXNVbmVzY2FwZWQocGF0dGVybiwgcmBcXChcXD9cXChERUZJTkVcXClgLCBDb250ZXh0LkRFRkFVTFQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdERUZJTkUgZ3JvdXBzIGNhbm5vdCBiZSB1c2VkIHdpdGggcmVjdXJzaW9uJyk7XG4gIH1cblxuICBjb25zdCBhZGRlZEhpZGRlbkNhcHR1cmVzID0gW107XG4gIGNvbnN0IGhhc051bWJlcmVkQmFja3JlZiA9IGhhc1VuZXNjYXBlZChwYXR0ZXJuLCByYFxcXFxbMS05XWAsIENvbnRleHQuREVGQVVMVCk7XG4gIGNvbnN0IGdyb3VwQ29udGVudHNTdGFydFBvcyA9IG5ldyBNYXAoKTtcbiAgY29uc3Qgb3Blbkdyb3VwcyA9IFtdO1xuICBsZXQgaGFzUmVjdXJzZWQgPSBmYWxzZTtcbiAgbGV0IG51bUNoYXJDbGFzc2VzT3BlbiA9IDA7XG4gIGxldCBudW1DYXB0dXJlc1Bhc3NlZCA9IDA7XG4gIGxldCBtYXRjaDtcbiAgdG9rZW4ubGFzdEluZGV4ID0gMDtcbiAgd2hpbGUgKChtYXRjaCA9IHRva2VuLmV4ZWMocGF0dGVybikpKSB7XG4gICAgY29uc3QgezA6IG0sIGdyb3Vwczoge2NhcHR1cmVOYW1lLCByRGVwdGgsIGdSTmFtZU9yTnVtLCBnUkRlcHRofX0gPSBtYXRjaDtcbiAgICBpZiAobSA9PT0gJ1snKSB7XG4gICAgICBudW1DaGFyQ2xhc3Nlc09wZW4rKztcbiAgICB9IGVsc2UgaWYgKCFudW1DaGFyQ2xhc3Nlc09wZW4pIHtcblxuICAgICAgLy8gYCg/Uj1OKWBcbiAgICAgIGlmIChyRGVwdGgpIHtcbiAgICAgICAgYXNzZXJ0TWF4SW5Cb3VuZHMockRlcHRoKTtcbiAgICAgICAgaWYgKGhhc1JlY3Vyc2VkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG92ZXJsYXBwaW5nUmVjdXJzaW9uTXNnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzTnVtYmVyZWRCYWNrcmVmKSB7XG4gICAgICAgICAgLy8gQ291bGQgYWRkIHN1cHBvcnQgZm9yIG51bWJlcmVkIGJhY2tyZWZzIHdpdGggZXh0cmEgZWZmb3J0LCBidXQgaXQncyBwcm9iYWJseSBub3Qgd29ydGhcbiAgICAgICAgICAvLyBpdC4gVG8gdHJpZ2dlciB0aGlzIGVycm9yLCB0aGUgcmVnZXggbXVzdCBpbmNsdWRlIHJlY3Vyc2lvbiBhbmQgb25lIG9mIHRoZSBmb2xsb3dpbmc6XG4gICAgICAgICAgLy8gLSBBbiBpbnRlcnBvbGF0ZWQgcmVnZXggdGhhdCBjb250YWlucyBhIG51bWJlcmVkIGJhY2tyZWYgKHNpbmNlIG90aGVyIG51bWJlcmVkXG4gICAgICAgICAgLy8gICBiYWNrcmVmcyBhcmUgcHJldmVudGVkIGJ5IGltcGxpY2l0IGZsYWcgbikuXG4gICAgICAgICAgLy8gLSBBIG51bWJlcmVkIGJhY2tyZWYsIHdoZW4gZmxhZyBuIGlzIGV4cGxpY2l0bHkgZGlzYWJsZWQuXG4gICAgICAgICAgLy8gTm90ZSB0aGF0IFJlZ2V4KydzIGV4dGVuZGVkIHN5bnRheCAoYXRvbWljIGdyb3VwcyBhbmQgc29tZXRpbWVzIHN1YnJvdXRpbmVzKSBjYW4gYWxzb1xuICAgICAgICAgIC8vIGFkZCBudW1iZXJlZCBiYWNrcmVmcywgYnV0IHRob3NlIHdvcmsgZmluZSBiZWNhdXNlIGV4dGVybmFsIHBsdWdpbnMgbGlrZSB0aGlzIG9uZSBydW5cbiAgICAgICAgICAvLyAqYmVmb3JlKiB0aGUgdHJhbnNmb3JtYXRpb24gb2YgYnVpbHQtaW4gc3ludGF4IGV4dGVuc2lvbnNcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAvLyBXaGVuIHVzZWQgaW4gYGV4dGVybmFsYCBtb2RlIGJ5IHRyYW5zcGlsZXJzIG90aGVyIHRoYW4gUmVnZXgrLCBiYWNrcmVmcyBtaWdodCBoYXZlXG4gICAgICAgICAgICAvLyBnb25lIHRocm91Z2ggY29udmVyc2lvbiBmcm9tIG5hbWVkIHRvIG51bWJlcmVkLCBzbyBhdm9pZCBhIG1pc2xlYWRpbmcgZXJyb3JcbiAgICAgICAgICAgIGAke21vZGUgPT09ICdleHRlcm5hbCcgPyAnQmFja3JlZnMnIDogJ051bWJlcmVkIGJhY2tyZWZzJ30gY2Fubm90IGJlIHVzZWQgd2l0aCBnbG9iYWwgcmVjdXJzaW9uYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGVmdCA9IHBhdHRlcm4uc2xpY2UoMCwgbWF0Y2guaW5kZXgpO1xuICAgICAgICBjb25zdCByaWdodCA9IHBhdHRlcm4uc2xpY2UodG9rZW4ubGFzdEluZGV4KTtcbiAgICAgICAgaWYgKGhhc1VuZXNjYXBlZChyaWdodCwgcmVjdXJzaXZlVG9rZW4sIENvbnRleHQuREVGQVVMVCkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Iob3ZlcmxhcHBpbmdSZWN1cnNpb25Nc2cpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlcHMgPSArckRlcHRoIC0gMTtcbiAgICAgICAgcGF0dGVybiA9IG1ha2VSZWN1cnNpdmUoXG4gICAgICAgICAgbGVmdCxcbiAgICAgICAgICByaWdodCxcbiAgICAgICAgICByZXBzLFxuICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgIGhpZGRlbkNhcHR1cmVzLFxuICAgICAgICAgIGFkZGVkSGlkZGVuQ2FwdHVyZXMsXG4gICAgICAgICAgbnVtQ2FwdHVyZXNQYXNzZWRcbiAgICAgICAgKTtcbiAgICAgICAgY2FwdHVyZVRyYW5zZmVycyA9IG1hcENhcHR1cmVUcmFuc2ZlcnMoXG4gICAgICAgICAgY2FwdHVyZVRyYW5zZmVycyxcbiAgICAgICAgICBsZWZ0LFxuICAgICAgICAgIHJlcHMsXG4gICAgICAgICAgYWRkZWRIaWRkZW5DYXB0dXJlcy5sZW5ndGgsXG4gICAgICAgICAgMCxcbiAgICAgICAgICBudW1DYXB0dXJlc1Bhc3NlZFxuICAgICAgICApO1xuICAgICAgICAvLyBObyBuZWVkIHRvIHBhcnNlIGZ1cnRoZXJcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBgXFxnPG5hbWUmUj1OPmAsIGBcXGc8bnVtYmVyJlI9Tj5gXG4gICAgICB9IGVsc2UgaWYgKGdSTmFtZU9yTnVtKSB7XG4gICAgICAgIGFzc2VydE1heEluQm91bmRzKGdSRGVwdGgpO1xuICAgICAgICBsZXQgaXNXaXRoaW5SZWZmZWRHcm91cCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IGcgb2Ygb3Blbkdyb3Vwcykge1xuICAgICAgICAgIGlmIChnLm5hbWUgPT09IGdSTmFtZU9yTnVtIHx8IGcubnVtID09PSArZ1JOYW1lT3JOdW0pIHtcbiAgICAgICAgICAgIGlzV2l0aGluUmVmZmVkR3JvdXAgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGcuaGFzUmVjdXJzZWRXaXRoaW4pIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG92ZXJsYXBwaW5nUmVjdXJzaW9uTXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzV2l0aGluUmVmZmVkR3JvdXApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmBSZWN1cnNpdmUgXFxnIGNhbm5vdCBiZSB1c2VkIG91dHNpZGUgdGhlIHJlZmVyZW5jZWQgZ3JvdXAgXCIke1xuICAgICAgICAgICAgbW9kZSA9PT0gJ2V4dGVybmFsJyA/IGdSTmFtZU9yTnVtIDogcmBcXGc8JHtnUk5hbWVPck51bX0mUj0ke2dSRGVwdGh9PmBcbiAgICAgICAgICB9XCJgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGFydFBvcyA9IGdyb3VwQ29udGVudHNTdGFydFBvcy5nZXQoZ1JOYW1lT3JOdW0pO1xuICAgICAgICBjb25zdCBncm91cENvbnRlbnRzID0gZ2V0R3JvdXBDb250ZW50cyhwYXR0ZXJuLCBzdGFydFBvcyk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBoYXNOdW1iZXJlZEJhY2tyZWYgJiZcbiAgICAgICAgICBoYXNVbmVzY2FwZWQoZ3JvdXBDb250ZW50cywgcmAke25hbWVkQ2FwdHVyZURlbGltfXxcXCgoPyFcXD8pYCwgQ29udGV4dC5ERUZBVUxUKVxuICAgICAgICApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAvLyBXaGVuIHVzZWQgaW4gYGV4dGVybmFsYCBtb2RlIGJ5IHRyYW5zcGlsZXJzIG90aGVyIHRoYW4gUmVnZXgrLCBiYWNrcmVmcyBtaWdodCBoYXZlXG4gICAgICAgICAgICAvLyBnb25lIHRocm91Z2ggY29udmVyc2lvbiBmcm9tIG5hbWVkIHRvIG51bWJlcmVkLCBzbyBhdm9pZCBhIG1pc2xlYWRpbmcgZXJyb3JcbiAgICAgICAgICAgIGAke21vZGUgPT09ICdleHRlcm5hbCcgPyAnQmFja3JlZnMnIDogJ051bWJlcmVkIGJhY2tyZWZzJ30gY2Fubm90IGJlIHVzZWQgd2l0aCByZWN1cnNpb24gb2YgY2FwdHVyaW5nIGdyb3Vwc2BcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGdyb3VwQ29udGVudHNMZWZ0ID0gcGF0dGVybi5zbGljZShzdGFydFBvcywgbWF0Y2guaW5kZXgpO1xuICAgICAgICBjb25zdCBncm91cENvbnRlbnRzUmlnaHQgPSBncm91cENvbnRlbnRzLnNsaWNlKGdyb3VwQ29udGVudHNMZWZ0Lmxlbmd0aCArIG0ubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgbnVtQWRkZWRIaWRkZW5DYXB0dXJlc1ByZUV4cGFuc2lvbiA9IGFkZGVkSGlkZGVuQ2FwdHVyZXMubGVuZ3RoO1xuICAgICAgICBjb25zdCByZXBzID0gK2dSRGVwdGggLSAxO1xuICAgICAgICBjb25zdCBleHBhbnNpb24gPSBtYWtlUmVjdXJzaXZlKFxuICAgICAgICAgIGdyb3VwQ29udGVudHNMZWZ0LFxuICAgICAgICAgIGdyb3VwQ29udGVudHNSaWdodCxcbiAgICAgICAgICByZXBzLFxuICAgICAgICAgIHRydWUsXG4gICAgICAgICAgaGlkZGVuQ2FwdHVyZXMsXG4gICAgICAgICAgYWRkZWRIaWRkZW5DYXB0dXJlcyxcbiAgICAgICAgICBudW1DYXB0dXJlc1Bhc3NlZFxuICAgICAgICApO1xuICAgICAgICBjYXB0dXJlVHJhbnNmZXJzID0gbWFwQ2FwdHVyZVRyYW5zZmVycyhcbiAgICAgICAgICBjYXB0dXJlVHJhbnNmZXJzLFxuICAgICAgICAgIGdyb3VwQ29udGVudHNMZWZ0LFxuICAgICAgICAgIHJlcHMsXG4gICAgICAgICAgYWRkZWRIaWRkZW5DYXB0dXJlcy5sZW5ndGggLSBudW1BZGRlZEhpZGRlbkNhcHR1cmVzUHJlRXhwYW5zaW9uLFxuICAgICAgICAgIG51bUFkZGVkSGlkZGVuQ2FwdHVyZXNQcmVFeHBhbnNpb24sXG4gICAgICAgICAgbnVtQ2FwdHVyZXNQYXNzZWRcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcHJlID0gcGF0dGVybi5zbGljZSgwLCBzdGFydFBvcyk7XG4gICAgICAgIGNvbnN0IHBvc3QgPSBwYXR0ZXJuLnNsaWNlKHN0YXJ0UG9zICsgZ3JvdXBDb250ZW50cy5sZW5ndGgpO1xuICAgICAgICAvLyBNb2RpZnkgdGhlIHN0cmluZyB3ZSdyZSBsb29waW5nIG92ZXJcbiAgICAgICAgcGF0dGVybiA9IGAke3ByZX0ke2V4cGFuc2lvbn0ke3Bvc3R9YDtcbiAgICAgICAgLy8gU3RlcCBmb3J3YXJkIGZvciB0aGUgbmV4dCBsb29wIGl0ZXJhdGlvblxuICAgICAgICB0b2tlbi5sYXN0SW5kZXggKz0gZXhwYW5zaW9uLmxlbmd0aCAtIG0ubGVuZ3RoIC0gZ3JvdXBDb250ZW50c0xlZnQubGVuZ3RoIC0gZ3JvdXBDb250ZW50c1JpZ2h0Lmxlbmd0aDtcbiAgICAgICAgb3Blbkdyb3Vwcy5mb3JFYWNoKGcgPT4gZy5oYXNSZWN1cnNlZFdpdGhpbiA9IHRydWUpO1xuICAgICAgICBoYXNSZWN1cnNlZCA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKGNhcHR1cmVOYW1lKSB7XG4gICAgICAgIG51bUNhcHR1cmVzUGFzc2VkKys7XG4gICAgICAgIGdyb3VwQ29udGVudHNTdGFydFBvcy5zZXQoU3RyaW5nKG51bUNhcHR1cmVzUGFzc2VkKSwgdG9rZW4ubGFzdEluZGV4KTtcbiAgICAgICAgZ3JvdXBDb250ZW50c1N0YXJ0UG9zLnNldChjYXB0dXJlTmFtZSwgdG9rZW4ubGFzdEluZGV4KTtcbiAgICAgICAgb3Blbkdyb3Vwcy5wdXNoKHtcbiAgICAgICAgICBudW06IG51bUNhcHR1cmVzUGFzc2VkLFxuICAgICAgICAgIG5hbWU6IGNhcHR1cmVOYW1lLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAobVswXSA9PT0gJygnKSB7XG4gICAgICAgIGNvbnN0IGlzVW5uYW1lZENhcHR1cmUgPSBtID09PSAnKCc7XG4gICAgICAgIGlmIChpc1VubmFtZWRDYXB0dXJlKSB7XG4gICAgICAgICAgbnVtQ2FwdHVyZXNQYXNzZWQrKztcbiAgICAgICAgICBncm91cENvbnRlbnRzU3RhcnRQb3Muc2V0KFN0cmluZyhudW1DYXB0dXJlc1Bhc3NlZCksIHRva2VuLmxhc3RJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgb3Blbkdyb3Vwcy5wdXNoKGlzVW5uYW1lZENhcHR1cmUgPyB7bnVtOiBudW1DYXB0dXJlc1Bhc3NlZH0gOiB7fSk7XG4gICAgICB9IGVsc2UgaWYgKG0gPT09ICcpJykge1xuICAgICAgICBvcGVuR3JvdXBzLnBvcCgpO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmIChtID09PSAnXScpIHtcbiAgICAgIG51bUNoYXJDbGFzc2VzT3Blbi0tO1xuICAgIH1cbiAgfVxuXG4gIGhpZGRlbkNhcHR1cmVzLnB1c2goLi4uYWRkZWRIaWRkZW5DYXB0dXJlcyk7XG5cbiAgcmV0dXJuIHtcbiAgICBwYXR0ZXJuLFxuICAgIGNhcHR1cmVUcmFuc2ZlcnMsXG4gICAgaGlkZGVuQ2FwdHVyZXMsXG4gIH07XG59XG5cbi8qKlxuQHBhcmFtIHtzdHJpbmd9IG1heFxuKi9cbmZ1bmN0aW9uIGFzc2VydE1heEluQm91bmRzKG1heCkge1xuICBjb25zdCBlcnJNc2cgPSBgTWF4IGRlcHRoIG11c3QgYmUgaW50ZWdlciBiZXR3ZWVuIDIgYW5kIDEwMDsgdXNlZCAke21heH1gO1xuICBpZiAoIS9eWzEtOV1cXGQqJC8udGVzdChtYXgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGVyck1zZyk7XG4gIH1cbiAgbWF4ID0gK21heDtcbiAgaWYgKG1heCA8IDIgfHwgbWF4ID4gMTAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGVyck1zZyk7XG4gIH1cbn1cblxuLyoqXG5AcGFyYW0ge3N0cmluZ30gbGVmdFxuQHBhcmFtIHtzdHJpbmd9IHJpZ2h0XG5AcGFyYW0ge251bWJlcn0gcmVwc1xuQHBhcmFtIHtib29sZWFufSBpc1N1YnBhdHRlcm5cbkBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gaGlkZGVuQ2FwdHVyZXNcbkBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gYWRkZWRIaWRkZW5DYXB0dXJlc1xuQHBhcmFtIHtudW1iZXJ9IG51bUNhcHR1cmVzUGFzc2VkXG5AcmV0dXJucyB7c3RyaW5nfVxuKi9cbmZ1bmN0aW9uIG1ha2VSZWN1cnNpdmUoXG4gIGxlZnQsXG4gIHJpZ2h0LFxuICByZXBzLFxuICBpc1N1YnBhdHRlcm4sXG4gIGhpZGRlbkNhcHR1cmVzLFxuICBhZGRlZEhpZGRlbkNhcHR1cmVzLFxuICBudW1DYXB0dXJlc1Bhc3NlZFxuKSB7XG4gIGNvbnN0IG5hbWVzSW5SZWN1cnNlZCA9IG5ldyBTZXQoKTtcbiAgLy8gQ2FuIHNraXAgdGhpcyB3b3JrIGlmIG5vdCBuZWVkZWRcbiAgaWYgKGlzU3VicGF0dGVybikge1xuICAgIGZvckVhY2hVbmVzY2FwZWQobGVmdCArIHJpZ2h0LCBuYW1lZENhcHR1cmVEZWxpbSwgKHtncm91cHM6IHtjYXB0dXJlTmFtZX19KSA9PiB7XG4gICAgICBuYW1lc0luUmVjdXJzZWQuYWRkKGNhcHR1cmVOYW1lKTtcbiAgICB9LCBDb250ZXh0LkRFRkFVTFQpO1xuICB9XG4gIGNvbnN0IHJlc3QgPSBbXG4gICAgcmVwcyxcbiAgICBpc1N1YnBhdHRlcm4gPyBuYW1lc0luUmVjdXJzZWQgOiBudWxsLFxuICAgIGhpZGRlbkNhcHR1cmVzLFxuICAgIGFkZGVkSGlkZGVuQ2FwdHVyZXMsXG4gICAgbnVtQ2FwdHVyZXNQYXNzZWQsXG4gIF07XG4gIC8vIERlcHRoIDI6ICdsZWZ0KD86bGVmdCg/OilyaWdodClyaWdodCdcbiAgLy8gRGVwdGggMzogJ2xlZnQoPzpsZWZ0KD86bGVmdCg/OilyaWdodClyaWdodClyaWdodCdcbiAgLy8gRW1wdHkgZ3JvdXAgaW4gdGhlIG1pZGRsZSBzZXBhcmF0ZXMgdG9rZW5zIGFuZCBhYnNvcmJzIGEgZm9sbG93aW5nIHF1YW50aWZpZXIgaWYgcHJlc2VudFxuICByZXR1cm4gYCR7bGVmdH0ke1xuICAgIHJlcGVhdFdpdGhEZXB0aChgKD86JHtsZWZ0fWAsICdmb3J3YXJkJywgLi4ucmVzdClcbiAgfSg/Oikke1xuICAgIHJlcGVhdFdpdGhEZXB0aChgJHtyaWdodH0pYCwgJ2JhY2t3YXJkJywgLi4ucmVzdClcbiAgfSR7cmlnaHR9YDtcbn1cblxuLyoqXG5AcGFyYW0ge3N0cmluZ30gcGF0dGVyblxuQHBhcmFtIHsnZm9yd2FyZCcgfCAnYmFja3dhcmQnfSBkaXJlY3Rpb25cbkBwYXJhbSB7bnVtYmVyfSByZXBzXG5AcGFyYW0ge1NldDxzdHJpbmc+IHwgbnVsbH0gbmFtZXNJblJlY3Vyc2VkXG5AcGFyYW0ge0FycmF5PG51bWJlcj59IGhpZGRlbkNhcHR1cmVzXG5AcGFyYW0ge0FycmF5PG51bWJlcj59IGFkZGVkSGlkZGVuQ2FwdHVyZXNcbkBwYXJhbSB7bnVtYmVyfSBudW1DYXB0dXJlc1Bhc3NlZFxuQHJldHVybnMge3N0cmluZ31cbiovXG5mdW5jdGlvbiByZXBlYXRXaXRoRGVwdGgoXG4gIHBhdHRlcm4sXG4gIGRpcmVjdGlvbixcbiAgcmVwcyxcbiAgbmFtZXNJblJlY3Vyc2VkLFxuICBoaWRkZW5DYXB0dXJlcyxcbiAgYWRkZWRIaWRkZW5DYXB0dXJlcyxcbiAgbnVtQ2FwdHVyZXNQYXNzZWRcbikge1xuICBjb25zdCBzdGFydE51bSA9IDI7XG4gIGNvbnN0IGdldERlcHRoTnVtID0gaSA9PiBkaXJlY3Rpb24gPT09ICdmb3J3YXJkJyA/IChpICsgc3RhcnROdW0pIDogKHJlcHMgLSBpICsgc3RhcnROdW0gLSAxKTtcbiAgbGV0IHJlc3VsdCA9ICcnO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHJlcHM7IGkrKykge1xuICAgIGNvbnN0IGRlcHRoTnVtID0gZ2V0RGVwdGhOdW0oaSk7XG4gICAgcmVzdWx0ICs9IHJlcGxhY2VVbmVzY2FwZWQoXG4gICAgICBwYXR0ZXJuLFxuICAgICAgcmAke2NhcHR1cmVEZWxpbX18XFxcXGs8KD88YmFja3JlZj5bXj5dKyk+YCxcbiAgICAgICh7MDogbSwgZ3JvdXBzOiB7Y2FwdHVyZU5hbWUsIHVubmFtZWQsIGJhY2tyZWZ9fSkgPT4ge1xuICAgICAgICBpZiAoYmFja3JlZiAmJiBuYW1lc0luUmVjdXJzZWQgJiYgIW5hbWVzSW5SZWN1cnNlZC5oYXMoYmFja3JlZikpIHtcbiAgICAgICAgICAvLyBEb24ndCBhbHRlciBiYWNrcmVmcyB0byBncm91cHMgb3V0c2lkZSB0aGUgcmVjdXJzZWQgc3VicGF0dGVyblxuICAgICAgICAgIHJldHVybiBtO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN1ZmZpeCA9IGBfJCR7ZGVwdGhOdW19YDtcbiAgICAgICAgaWYgKHVubmFtZWQgfHwgY2FwdHVyZU5hbWUpIHtcbiAgICAgICAgICBjb25zdCBhZGRlZENhcHR1cmVOdW0gPSBudW1DYXB0dXJlc1Bhc3NlZCArIGFkZGVkSGlkZGVuQ2FwdHVyZXMubGVuZ3RoICsgMTtcbiAgICAgICAgICBhZGRlZEhpZGRlbkNhcHR1cmVzLnB1c2goYWRkZWRDYXB0dXJlTnVtKTtcbiAgICAgICAgICBpbmNyZW1lbnRJZkF0TGVhc3QoaGlkZGVuQ2FwdHVyZXMsIGFkZGVkQ2FwdHVyZU51bSk7XG4gICAgICAgICAgcmV0dXJuIHVubmFtZWQgPyBtIDogYCg/PCR7Y2FwdHVyZU5hbWV9JHtzdWZmaXh9PmA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJgXFxrPCR7YmFja3JlZn0ke3N1ZmZpeH0+YDtcbiAgICAgIH0sXG4gICAgICBDb250ZXh0LkRFRkFVTFRcbiAgICApO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuVXBkYXRlcyB0aGUgYXJyYXkgaW4gcGxhY2UgYnkgaW5jcmVtZW50aW5nIGVhY2ggdmFsdWUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZSB0aHJlc2hvbGQuXG5AcGFyYW0ge0FycmF5PG51bWJlcj59IGFyclxuQHBhcmFtIHtudW1iZXJ9IHRocmVzaG9sZFxuKi9cbmZ1bmN0aW9uIGluY3JlbWVudElmQXRMZWFzdChhcnIsIHRocmVzaG9sZCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhcnJbaV0gPj0gdGhyZXNob2xkKSB7XG4gICAgICBhcnJbaV0rKztcbiAgICB9XG4gIH1cbn1cblxuLyoqXG5AcGFyYW0ge01hcDxudW1iZXIsIEFycmF5PG51bWJlcj4+fSBjYXB0dXJlVHJhbnNmZXJzXG5AcGFyYW0ge3N0cmluZ30gbGVmdFxuQHBhcmFtIHtudW1iZXJ9IHJlcHNcbkBwYXJhbSB7bnVtYmVyfSBudW1DYXB0dXJlc0FkZGVkSW5FeHBhbnNpb25cbkBwYXJhbSB7bnVtYmVyfSBudW1BZGRlZEhpZGRlbkNhcHR1cmVzUHJlRXhwYW5zaW9uXG5AcGFyYW0ge251bWJlcn0gbnVtQ2FwdHVyZXNQYXNzZWRcbkByZXR1cm5zIHtNYXA8bnVtYmVyLCBBcnJheTxudW1iZXI+Pn1cbiovXG5mdW5jdGlvbiBtYXBDYXB0dXJlVHJhbnNmZXJzKGNhcHR1cmVUcmFuc2ZlcnMsIGxlZnQsIHJlcHMsIG51bUNhcHR1cmVzQWRkZWRJbkV4cGFuc2lvbiwgbnVtQWRkZWRIaWRkZW5DYXB0dXJlc1ByZUV4cGFuc2lvbiwgbnVtQ2FwdHVyZXNQYXNzZWQpIHtcbiAgaWYgKGNhcHR1cmVUcmFuc2ZlcnMuc2l6ZSAmJiBudW1DYXB0dXJlc0FkZGVkSW5FeHBhbnNpb24pIHtcbiAgICBsZXQgbnVtQ2FwdHVyZXNJbkxlZnQgPSAwO1xuICAgIGZvckVhY2hVbmVzY2FwZWQobGVmdCwgY2FwdHVyZURlbGltLCAoKSA9PiBudW1DYXB0dXJlc0luTGVmdCsrLCBDb250ZXh0LkRFRkFVTFQpO1xuICAgIC8vIElzIDAgZm9yIGdsb2JhbCByZWN1cnNpb25cbiAgICBjb25zdCByZWN1cnNpb25EZWxpbUNhcHR1cmVOdW0gPSBudW1DYXB0dXJlc1Bhc3NlZCAtIG51bUNhcHR1cmVzSW5MZWZ0ICsgbnVtQWRkZWRIaWRkZW5DYXB0dXJlc1ByZUV4cGFuc2lvbjtcbiAgICBjb25zdCBuZXdDYXB0dXJlVHJhbnNmZXJzID0gbmV3IE1hcCgpO1xuICAgIGNhcHR1cmVUcmFuc2ZlcnMuZm9yRWFjaCgoZnJvbSwgdG8pID0+IHtcbiAgICAgIGNvbnN0IG51bUNhcHR1cmVzSW5SaWdodCA9IChudW1DYXB0dXJlc0FkZGVkSW5FeHBhbnNpb24gLSAobnVtQ2FwdHVyZXNJbkxlZnQgKiByZXBzKSkgLyByZXBzO1xuICAgICAgY29uc3QgbnVtQ2FwdHVyZXNBZGRlZEluTGVmdCA9IG51bUNhcHR1cmVzSW5MZWZ0ICogcmVwcztcbiAgICAgIGNvbnN0IG5ld1RvID0gdG8gPiAocmVjdXJzaW9uRGVsaW1DYXB0dXJlTnVtICsgbnVtQ2FwdHVyZXNJbkxlZnQpID8gdG8gKyBudW1DYXB0dXJlc0FkZGVkSW5FeHBhbnNpb24gOiB0bztcbiAgICAgIGNvbnN0IG5ld0Zyb20gPSBbXTtcbiAgICAgIGZvciAoY29uc3QgZiBvZiBmcm9tKSB7XG4gICAgICAgIC8vIEJlZm9yZSB0aGUgcmVjdXJzZWQgc3VicGF0dGVyblxuICAgICAgICBpZiAoZiA8PSByZWN1cnNpb25EZWxpbUNhcHR1cmVOdW0pIHtcbiAgICAgICAgICBuZXdGcm9tLnB1c2goZik7XG4gICAgICAgIC8vIEFmdGVyIHRoZSByZWN1cnNlZCBzdWJwYXR0ZXJuXG4gICAgICAgIH0gZWxzZSBpZiAoZiA+IChyZWN1cnNpb25EZWxpbUNhcHR1cmVOdW0gKyBudW1DYXB0dXJlc0luTGVmdCArIG51bUNhcHR1cmVzSW5SaWdodCkpIHtcbiAgICAgICAgICBuZXdGcm9tLnB1c2goZiArIG51bUNhcHR1cmVzQWRkZWRJbkV4cGFuc2lvbik7XG4gICAgICAgIC8vIFdpdGhpbiB0aGUgcmVjdXJzZWQgc3VicGF0dGVybiwgb24gdGhlIGxlZnQgb2YgdGhlIHJlY3Vyc2lvbiB0b2tlblxuICAgICAgICB9IGVsc2UgaWYgKGYgPD0gKHJlY3Vyc2lvbkRlbGltQ2FwdHVyZU51bSArIG51bUNhcHR1cmVzSW5MZWZ0KSkge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHJlcHM7IGkrKykge1xuICAgICAgICAgICAgbmV3RnJvbS5wdXNoKGYgKyAobnVtQ2FwdHVyZXNJbkxlZnQgKiBpKSk7XG4gICAgICAgICAgfVxuICAgICAgICAvLyBXaXRoaW4gdGhlIHJlY3Vyc2VkIHN1YnBhdHRlcm4sIG9uIHRoZSByaWdodCBvZiB0aGUgcmVjdXJzaW9uIHRva2VuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gcmVwczsgaSsrKSB7XG4gICAgICAgICAgICBuZXdGcm9tLnB1c2goZiArIG51bUNhcHR1cmVzQWRkZWRJbkxlZnQgKyAobnVtQ2FwdHVyZXNJblJpZ2h0ICogaSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbmV3Q2FwdHVyZVRyYW5zZmVycy5zZXQobmV3VG8sIG5ld0Zyb20pO1xuICAgIH0pO1xuICAgIHJldHVybiBuZXdDYXB0dXJlVHJhbnNmZXJzO1xuICB9XG4gIHJldHVybiBjYXB0dXJlVHJhbnNmZXJzO1xufVxuXG5leHBvcnQge1xuICByZWN1cnNpb24sXG59O1xuIiwiLy8gc3JjL3V0aWxzLmpzXG52YXIgY3AgPSBTdHJpbmcuZnJvbUNvZGVQb2ludDtcbnZhciByID0gU3RyaW5nLnJhdztcbnZhciBlbnZGbGFncyA9IHt9O1xudmFyIGdsb2JhbFJlZ0V4cCA9IGdsb2JhbFRoaXMuUmVnRXhwO1xuZW52RmxhZ3MuZmxhZ0dyb3VwcyA9ICgoKSA9PiB7XG4gIHRyeSB7XG4gICAgbmV3IGdsb2JhbFJlZ0V4cChcIig/aTopXCIpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59KSgpO1xuZW52RmxhZ3MudW5pY29kZVNldHMgPSAoKCkgPT4ge1xuICB0cnkge1xuICAgIG5ldyBnbG9iYWxSZWdFeHAoXCJbW11dXCIsIFwidlwiKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufSkoKTtcbmVudkZsYWdzLmJ1Z0ZsYWdWTGl0ZXJhbEh5cGhlbklzUmFuZ2UgPSBlbnZGbGFncy51bmljb2RlU2V0cyA/ICgoKSA9PiB7XG4gIHRyeSB7XG4gICAgbmV3IGdsb2JhbFJlZ0V4cChyYFtcXGRcXC1hXWAsIFwidlwiKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSkoKSA6IGZhbHNlO1xuZW52RmxhZ3MuYnVnTmVzdGVkQ2xhc3NJZ25vcmVzTmVnYXRpb24gPSBlbnZGbGFncy51bmljb2RlU2V0cyAmJiBuZXcgZ2xvYmFsUmVnRXhwKFwiW1teYV1dXCIsIFwidlwiKS50ZXN0KFwiYVwiKTtcbmZ1bmN0aW9uIGdldE5ld0N1cnJlbnRGbGFncyhjdXJyZW50LCB7IGVuYWJsZSwgZGlzYWJsZSB9KSB7XG4gIHJldHVybiB7XG4gICAgZG90QWxsOiAhZGlzYWJsZT8uZG90QWxsICYmICEhKGVuYWJsZT8uZG90QWxsIHx8IGN1cnJlbnQuZG90QWxsKSxcbiAgICBpZ25vcmVDYXNlOiAhZGlzYWJsZT8uaWdub3JlQ2FzZSAmJiAhIShlbmFibGU/Lmlnbm9yZUNhc2UgfHwgY3VycmVudC5pZ25vcmVDYXNlKVxuICB9O1xufVxuZnVuY3Rpb24gZ2V0T3JJbnNlcnQobWFwLCBrZXksIGRlZmF1bHRWYWx1ZSkge1xuICBpZiAoIW1hcC5oYXMoa2V5KSkge1xuICAgIG1hcC5zZXQoa2V5LCBkZWZhdWx0VmFsdWUpO1xuICB9XG4gIHJldHVybiBtYXAuZ2V0KGtleSk7XG59XG5mdW5jdGlvbiBpc01pblRhcmdldCh0YXJnZXQsIG1pbikge1xuICByZXR1cm4gRXNWZXJzaW9uW3RhcmdldF0gPj0gRXNWZXJzaW9uW21pbl07XG59XG5mdW5jdGlvbiB0aHJvd0lmTnVsbGlzaCh2YWx1ZSwgbXNnKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1zZyA/PyBcIlZhbHVlIGV4cGVjdGVkXCIpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuLy8gc3JjL29wdGlvbnMuanNcbnZhciBFc1ZlcnNpb24gPSB7XG4gIEVTMjAyNTogMjAyNSxcbiAgRVMyMDI0OiAyMDI0LFxuICBFUzIwMTg6IDIwMThcbn07XG52YXIgVGFyZ2V0ID0gKFxuICAvKiogQHR5cGUge2NvbnN0fSAqL1xuICB7XG4gICAgYXV0bzogXCJhdXRvXCIsXG4gICAgRVMyMDI1OiBcIkVTMjAyNVwiLFxuICAgIEVTMjAyNDogXCJFUzIwMjRcIixcbiAgICBFUzIwMTg6IFwiRVMyMDE4XCJcbiAgfVxuKTtcbmZ1bmN0aW9uIGdldE9wdGlvbnMob3B0aW9ucyA9IHt9KSB7XG4gIGlmICh7fS50b1N0cmluZy5jYWxsKG9wdGlvbnMpICE9PSBcIltvYmplY3QgT2JqZWN0XVwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBvcHRpb25zXCIpO1xuICB9XG4gIGlmIChvcHRpb25zLnRhcmdldCAhPT0gdm9pZCAwICYmICFUYXJnZXRbb3B0aW9ucy50YXJnZXRdKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIHRhcmdldCBcIiR7b3B0aW9ucy50YXJnZXR9XCJgKTtcbiAgfVxuICBjb25zdCBvcHRzID0ge1xuICAgIC8vIFNldHMgdGhlIGxldmVsIG9mIGVtdWxhdGlvbiByaWdvci9zdHJpY3RuZXNzLlxuICAgIGFjY3VyYWN5OiBcImRlZmF1bHRcIixcbiAgICAvLyBEaXNhYmxlcyBhZHZhbmNlZCBlbXVsYXRpb24gdGhhdCByZWxpZXMgb24gcmV0dXJuaW5nIGEgYFJlZ0V4cGAgc3ViY2xhc3MsIHJlc3VsdGluZyBpblxuICAgIC8vIGNlcnRhaW4gcGF0dGVybnMgbm90IGJlaW5nIGVtdWxhdGFibGUuXG4gICAgYXZvaWRTdWJjbGFzczogZmFsc2UsXG4gICAgLy8gT25pZ3VydW1hIGZsYWdzOyBhIHN0cmluZyB3aXRoIGBpYCwgYG1gLCBgeGAsIGBEYCwgYFNgLCBgV2AsIGB5e2d9YCBpbiBhbnkgb3JkZXIgKGFsbFxuICAgIC8vIG9wdGlvbmFsKS4gT25pZ3VydW1hJ3MgYG1gIGlzIGVxdWl2YWxlbnQgdG8gSmF2YVNjcmlwdCdzIGBzYCAoYGRvdEFsbGApLlxuICAgIGZsYWdzOiBcIlwiLFxuICAgIC8vIEluY2x1ZGUgSmF2YVNjcmlwdCBmbGFnIGBnYCAoYGdsb2JhbGApIGluIHRoZSByZXN1bHQuXG4gICAgZ2xvYmFsOiBmYWxzZSxcbiAgICAvLyBJbmNsdWRlIEphdmFTY3JpcHQgZmxhZyBgZGAgKGBoYXNJbmRpY2VzYCkgaW4gdGhlIHJlc3VsdC5cbiAgICBoYXNJbmRpY2VzOiBmYWxzZSxcbiAgICAvLyBEZWxheSByZWdleCBjb25zdHJ1Y3Rpb24gdW50aWwgZmlyc3QgdXNlIGlmIHRoZSB0cmFuc3BpbGVkIHBhdHRlcm4gaXMgYXQgbGVhc3QgdGhpcyBsZW5ndGguXG4gICAgbGF6eUNvbXBpbGVMZW5ndGg6IEluZmluaXR5LFxuICAgIC8vIEphdmFTY3JpcHQgdmVyc2lvbiB1c2VkIGZvciBnZW5lcmF0ZWQgcmVnZXhlcy4gVXNpbmcgYGF1dG9gIGRldGVjdHMgdGhlIGJlc3QgdmFsdWUgYmFzZWQgb25cbiAgICAvLyB5b3VyIGVudmlyb25tZW50LiBMYXRlciB0YXJnZXRzIGFsbG93IGZhc3RlciBwcm9jZXNzaW5nLCBzaW1wbGVyIGdlbmVyYXRlZCBzb3VyY2UsIGFuZFxuICAgIC8vIHN1cHBvcnQgZm9yIGFkZGl0aW9uYWwgZmVhdHVyZXMuXG4gICAgdGFyZ2V0OiBcImF1dG9cIixcbiAgICAvLyBEaXNhYmxlcyBtaW5pZmljYXRpb25zIHRoYXQgc2ltcGxpZnkgdGhlIHBhdHRlcm4gd2l0aG91dCBjaGFuZ2luZyB0aGUgbWVhbmluZy5cbiAgICB2ZXJib3NlOiBmYWxzZSxcbiAgICAuLi5vcHRpb25zLFxuICAgIC8vIEFkdmFuY2VkIG9wdGlvbnMgdGhhdCBvdmVycmlkZSBzdGFuZGFyZCBiZWhhdmlvciwgZXJyb3IgY2hlY2tpbmcsIGFuZCBmbGFncyB3aGVuIGVuYWJsZWQuXG4gICAgcnVsZXM6IHtcbiAgICAgIC8vIFVzZWZ1bCB3aXRoIFRleHRNYXRlIGdyYW1tYXJzIHRoYXQgbWVyZ2UgYmFja3JlZmVyZW5jZXMgYWNyb3NzIHBhdHRlcm5zLlxuICAgICAgYWxsb3dPcnBoYW5CYWNrcmVmczogZmFsc2UsXG4gICAgICAvLyBVc2UgQVNDSUkgYFxcYmAgYW5kIGBcXEJgLCB3aGljaCBpbmNyZWFzZXMgc2VhcmNoIHBlcmZvcm1hbmNlIG9mIGdlbmVyYXRlZCByZWdleGVzLlxuICAgICAgYXNjaWlXb3JkQm91bmRhcmllczogZmFsc2UsXG4gICAgICAvLyBBbGxvdyB1bm5hbWVkIGNhcHR1cmVzIGFuZCBudW1iZXJlZCBjYWxscyAoYmFja3JlZmVyZW5jZXMgYW5kIHN1YnJvdXRpbmVzKSB3aGVuIHVzaW5nXG4gICAgICAvLyBuYW1lZCBjYXB0dXJlLiBUaGlzIGlzIE9uaWd1cnVtYSBvcHRpb24gYE9OSUdfT1BUSU9OX0NBUFRVUkVfR1JPVVBgOyBvbiBieSBkZWZhdWx0IGluXG4gICAgICAvLyBgdnNjb2RlLW9uaWd1cnVtYWAuXG4gICAgICBjYXB0dXJlR3JvdXA6IGZhbHNlLFxuICAgICAgLy8gQ2hhbmdlIHRoZSByZWN1cnNpb24gZGVwdGggbGltaXQgZnJvbSBPbmlndXJ1bWEncyBgMjBgIHRvIGFuIGludGVnZXIgYDJg4oCTYDIwYC5cbiAgICAgIHJlY3Vyc2lvbkxpbWl0OiAyMCxcbiAgICAgIC8vIGBeYCBhcyBgXFxBYDsgYCRgIGFzYFxcWmAuIEltcHJvdmVzIHNlYXJjaCBwZXJmb3JtYW5jZSBvZiBnZW5lcmF0ZWQgcmVnZXhlcyB3aXRob3V0IGNoYW5naW5nXG4gICAgICAvLyB0aGUgbWVhbmluZyBpZiBzZWFyY2hpbmcgbGluZSBieSBsaW5lLiBUaGlzIGlzIE9uaWd1cnVtYSBvcHRpb24gYE9OSUdfT1BUSU9OX1NJTkdMRUxJTkVgLlxuICAgICAgc2luZ2xlbGluZTogZmFsc2UsXG4gICAgICAuLi5vcHRpb25zLnJ1bGVzXG4gICAgfVxuICB9O1xuICBpZiAob3B0cy50YXJnZXQgPT09IFwiYXV0b1wiKSB7XG4gICAgb3B0cy50YXJnZXQgPSBlbnZGbGFncy5mbGFnR3JvdXBzID8gXCJFUzIwMjVcIiA6IGVudkZsYWdzLnVuaWNvZGVTZXRzID8gXCJFUzIwMjRcIiA6IFwiRVMyMDE4XCI7XG4gIH1cbiAgcmV0dXJuIG9wdHM7XG59XG5cbi8vIHNyYy91bmljb2RlLmpzXG5pbXBvcnQgeyBzbHVnIH0gZnJvbSBcIm9uaWd1cnVtYS1wYXJzZXIvcGFyc2VyXCI7XG52YXIgYXNjaWlTcGFjZUNoYXIgPSBcIltcdC1cXHIgXVwiO1xudmFyIENoYXJzV2l0aG91dElnbm9yZUNhc2VFeHBhbnNpb24gPSAvKiBAX19QVVJFX18gKi8gbmV3IFNldChbXG4gIGNwKDMwNCksXG4gIC8vIMSwXG4gIGNwKDMwNSlcbiAgLy8gxLFcbl0pO1xudmFyIGRlZmF1bHRXb3JkQ2hhciA9IHJgW1xccHtMfVxccHtNfVxccHtOfVxccHtQY31dYDtcbmZ1bmN0aW9uIGdldElnbm9yZUNhc2VNYXRjaENoYXJzKGNoYXIpIHtcbiAgaWYgKENoYXJzV2l0aG91dElnbm9yZUNhc2VFeHBhbnNpb24uaGFzKGNoYXIpKSB7XG4gICAgcmV0dXJuIFtjaGFyXTtcbiAgfVxuICBjb25zdCBzZXQgPSAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpO1xuICBjb25zdCBsb3dlciA9IGNoYXIudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgdXBwZXIgPSBsb3dlci50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCB0aXRsZSA9IExvd2VyVG9UaXRsZUNhc2VNYXAuZ2V0KGxvd2VyKTtcbiAgY29uc3QgYWx0TG93ZXIgPSBMb3dlclRvQWx0ZXJuYXRpdmVMb3dlckNhc2VNYXAuZ2V0KGxvd2VyKTtcbiAgY29uc3QgYWx0VXBwZXIgPSBMb3dlclRvQWx0ZXJuYXRpdmVVcHBlckNhc2VNYXAuZ2V0KGxvd2VyKTtcbiAgaWYgKFsuLi51cHBlcl0ubGVuZ3RoID09PSAxKSB7XG4gICAgc2V0LmFkZCh1cHBlcik7XG4gIH1cbiAgYWx0VXBwZXIgJiYgc2V0LmFkZChhbHRVcHBlcik7XG4gIHRpdGxlICYmIHNldC5hZGQodGl0bGUpO1xuICBzZXQuYWRkKGxvd2VyKTtcbiAgYWx0TG93ZXIgJiYgc2V0LmFkZChhbHRMb3dlcik7XG4gIHJldHVybiBbLi4uc2V0XTtcbn1cbnZhciBKc1VuaWNvZGVQcm9wZXJ0eU1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKFxuICBgQyBPdGhlclxuQ2MgQ29udHJvbCBjbnRybFxuQ2YgRm9ybWF0XG5DbiBVbmFzc2lnbmVkXG5DbyBQcml2YXRlX1VzZVxuQ3MgU3Vycm9nYXRlXG5MIExldHRlclxuTEMgQ2FzZWRfTGV0dGVyXG5MbCBMb3dlcmNhc2VfTGV0dGVyXG5MbSBNb2RpZmllcl9MZXR0ZXJcbkxvIE90aGVyX0xldHRlclxuTHQgVGl0bGVjYXNlX0xldHRlclxuTHUgVXBwZXJjYXNlX0xldHRlclxuTSBNYXJrIENvbWJpbmluZ19NYXJrXG5NYyBTcGFjaW5nX01hcmtcbk1lIEVuY2xvc2luZ19NYXJrXG5NbiBOb25zcGFjaW5nX01hcmtcbk4gTnVtYmVyXG5OZCBEZWNpbWFsX051bWJlciBkaWdpdFxuTmwgTGV0dGVyX051bWJlclxuTm8gT3RoZXJfTnVtYmVyXG5QIFB1bmN0dWF0aW9uIHB1bmN0XG5QYyBDb25uZWN0b3JfUHVuY3R1YXRpb25cblBkIERhc2hfUHVuY3R1YXRpb25cblBlIENsb3NlX1B1bmN0dWF0aW9uXG5QZiBGaW5hbF9QdW5jdHVhdGlvblxuUGkgSW5pdGlhbF9QdW5jdHVhdGlvblxuUG8gT3RoZXJfUHVuY3R1YXRpb25cblBzIE9wZW5fUHVuY3R1YXRpb25cblMgU3ltYm9sXG5TYyBDdXJyZW5jeV9TeW1ib2xcblNrIE1vZGlmaWVyX1N5bWJvbFxuU20gTWF0aF9TeW1ib2xcblNvIE90aGVyX1N5bWJvbFxuWiBTZXBhcmF0b3JcblpsIExpbmVfU2VwYXJhdG9yXG5acCBQYXJhZ3JhcGhfU2VwYXJhdG9yXG5acyBTcGFjZV9TZXBhcmF0b3JcbkFTQ0lJXG5BU0NJSV9IZXhfRGlnaXQgQUhleFxuQWxwaGFiZXRpYyBBbHBoYVxuQW55XG5Bc3NpZ25lZFxuQmlkaV9Db250cm9sIEJpZGlfQ1xuQmlkaV9NaXJyb3JlZCBCaWRpX01cbkNhc2VfSWdub3JhYmxlIENJXG5DYXNlZFxuQ2hhbmdlc19XaGVuX0Nhc2Vmb2xkZWQgQ1dDRlxuQ2hhbmdlc19XaGVuX0Nhc2VtYXBwZWQgQ1dDTVxuQ2hhbmdlc19XaGVuX0xvd2VyY2FzZWQgQ1dMXG5DaGFuZ2VzX1doZW5fTkZLQ19DYXNlZm9sZGVkIENXS0NGXG5DaGFuZ2VzX1doZW5fVGl0bGVjYXNlZCBDV1RcbkNoYW5nZXNfV2hlbl9VcHBlcmNhc2VkIENXVVxuRGFzaFxuRGVmYXVsdF9JZ25vcmFibGVfQ29kZV9Qb2ludCBESVxuRGVwcmVjYXRlZCBEZXBcbkRpYWNyaXRpYyBEaWFcbkVtb2ppXG5FbW9qaV9Db21wb25lbnQgRUNvbXBcbkVtb2ppX01vZGlmaWVyIEVNb2RcbkVtb2ppX01vZGlmaWVyX0Jhc2UgRUJhc2VcbkVtb2ppX1ByZXNlbnRhdGlvbiBFUHJlc1xuRXh0ZW5kZWRfUGljdG9ncmFwaGljIEV4dFBpY3RcbkV4dGVuZGVyIEV4dFxuR3JhcGhlbWVfQmFzZSBHcl9CYXNlXG5HcmFwaGVtZV9FeHRlbmQgR3JfRXh0XG5IZXhfRGlnaXQgSGV4XG5JRFNfQmluYXJ5X09wZXJhdG9yIElEU0JcbklEU19UcmluYXJ5X09wZXJhdG9yIElEU1RcbklEX0NvbnRpbnVlIElEQ1xuSURfU3RhcnQgSURTXG5JZGVvZ3JhcGhpYyBJZGVvXG5Kb2luX0NvbnRyb2wgSm9pbl9DXG5Mb2dpY2FsX09yZGVyX0V4Y2VwdGlvbiBMT0Vcbkxvd2VyY2FzZSBMb3dlclxuTWF0aFxuTm9uY2hhcmFjdGVyX0NvZGVfUG9pbnQgTkNoYXJcblBhdHRlcm5fU3ludGF4IFBhdF9TeW5cblBhdHRlcm5fV2hpdGVfU3BhY2UgUGF0X1dTXG5RdW90YXRpb25fTWFyayBRTWFya1xuUmFkaWNhbFxuUmVnaW9uYWxfSW5kaWNhdG9yIFJJXG5TZW50ZW5jZV9UZXJtaW5hbCBTVGVybVxuU29mdF9Eb3R0ZWQgU0RcblRlcm1pbmFsX1B1bmN0dWF0aW9uIFRlcm1cblVuaWZpZWRfSWRlb2dyYXBoIFVJZGVvXG5VcHBlcmNhc2UgVXBwZXJcblZhcmlhdGlvbl9TZWxlY3RvciBWU1xuV2hpdGVfU3BhY2Ugc3BhY2VcblhJRF9Db250aW51ZSBYSURDXG5YSURfU3RhcnQgWElEU2Auc3BsaXQoL1xccy8pLm1hcCgocCkgPT4gW3NsdWcocCksIHBdKVxuKTtcbnZhciBMb3dlclRvQWx0ZXJuYXRpdmVMb3dlckNhc2VNYXAgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcChbXG4gIFtcInNcIiwgY3AoMzgzKV0sXG4gIC8vIHMsIMW/XG4gIFtjcCgzODMpLCBcInNcIl1cbiAgLy8gxb8sIHNcbl0pO1xudmFyIExvd2VyVG9BbHRlcm5hdGl2ZVVwcGVyQ2FzZU1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKFtcbiAgW2NwKDIyMyksIGNwKDc4MzgpXSxcbiAgLy8gw58sIOG6nlxuICBbY3AoMTA3KSwgY3AoODQ5MCldLFxuICAvLyBrLCDihKogKEtlbHZpbilcbiAgW2NwKDIyOSksIGNwKDg0OTEpXSxcbiAgLy8gw6UsIOKEqyAoQW5nc3Ryb20pXG4gIFtjcCg5NjkpLCBjcCg4NDg2KV1cbiAgLy8gz4ksIOKEpiAoT2htKVxuXSk7XG52YXIgTG93ZXJUb1RpdGxlQ2FzZU1hcCA9IG5ldyBNYXAoW1xuICB0aXRsZUVudHJ5KDQ1MyksXG4gIHRpdGxlRW50cnkoNDU2KSxcbiAgdGl0bGVFbnRyeSg0NTkpLFxuICB0aXRsZUVudHJ5KDQ5OCksXG4gIC4uLnRpdGxlUmFuZ2UoODA3MiwgODA3OSksXG4gIC4uLnRpdGxlUmFuZ2UoODA4OCwgODA5NSksXG4gIC4uLnRpdGxlUmFuZ2UoODEwNCwgODExMSksXG4gIHRpdGxlRW50cnkoODEyNCksXG4gIHRpdGxlRW50cnkoODE0MCksXG4gIHRpdGxlRW50cnkoODE4OClcbl0pO1xudmFyIFBvc2l4Q2xhc3NNYXAgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcChbXG4gIFtcImFsbnVtXCIsIHJgW1xccHtBbHBoYX1cXHB7TmR9XWBdLFxuICBbXCJhbHBoYVwiLCByYFxccHtBbHBoYX1gXSxcbiAgW1wiYXNjaWlcIiwgcmBcXHB7QVNDSUl9YF0sXG4gIFtcImJsYW5rXCIsIHJgW1xccHtac31cXHRdYF0sXG4gIFtcImNudHJsXCIsIHJgXFxwe0NjfWBdLFxuICBbXCJkaWdpdFwiLCByYFxccHtOZH1gXSxcbiAgW1wiZ3JhcGhcIiwgcmBbXFxQe3NwYWNlfSYmXFxQe0NjfSYmXFxQe0NufSYmXFxQe0NzfV1gXSxcbiAgW1wibG93ZXJcIiwgcmBcXHB7TG93ZXJ9YF0sXG4gIFtcInByaW50XCIsIHJgW1tcXFB7c3BhY2V9JiZcXFB7Q2N9JiZcXFB7Q259JiZcXFB7Q3N9XVxccHtac31dYF0sXG4gIFtcInB1bmN0XCIsIHJgW1xccHtQfVxccHtTfV1gXSxcbiAgLy8gVXBkYXRlZCB2YWx1ZSBmcm9tIE9uaWcgNi45Ljk7IGNoYW5nZWQgZnJvbSBVbmljb2RlIGBcXHB7cHVuY3R9YFxuICBbXCJzcGFjZVwiLCByYFxccHtzcGFjZX1gXSxcbiAgW1widXBwZXJcIiwgcmBcXHB7VXBwZXJ9YF0sXG4gIFtcIndvcmRcIiwgcmBbXFxwe0FscGhhfVxccHtNfVxccHtOZH1cXHB7UGN9XWBdLFxuICBbXCJ4ZGlnaXRcIiwgcmBcXHB7QUhleH1gXVxuXSk7XG5mdW5jdGlvbiByYW5nZShzdGFydCwgZW5kKSB7XG4gIGNvbnN0IHJhbmdlMiA9IFtdO1xuICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpKyspIHtcbiAgICByYW5nZTIucHVzaChpKTtcbiAgfVxuICByZXR1cm4gcmFuZ2UyO1xufVxuZnVuY3Rpb24gdGl0bGVFbnRyeShjb2RlUG9pbnQpIHtcbiAgY29uc3QgY2hhciA9IGNwKGNvZGVQb2ludCk7XG4gIHJldHVybiBbY2hhci50b0xvd2VyQ2FzZSgpLCBjaGFyXTtcbn1cbmZ1bmN0aW9uIHRpdGxlUmFuZ2Uoc3RhcnQsIGVuZCkge1xuICByZXR1cm4gcmFuZ2Uoc3RhcnQsIGVuZCkubWFwKChjb2RlUG9pbnQpID0+IHRpdGxlRW50cnkoY29kZVBvaW50KSk7XG59XG52YXIgVW5pY29kZVByb3BlcnRpZXNXaXRoU3BlY2lmaWNDYXNlID0gLyogQF9fUFVSRV9fICovIG5ldyBTZXQoW1xuICBcIkxvd2VyXCIsXG4gIFwiTG93ZXJjYXNlXCIsXG4gIFwiVXBwZXJcIixcbiAgXCJVcHBlcmNhc2VcIixcbiAgXCJMbFwiLFxuICBcIkxvd2VyY2FzZV9MZXR0ZXJcIixcbiAgXCJMdFwiLFxuICBcIlRpdGxlY2FzZV9MZXR0ZXJcIixcbiAgXCJMdVwiLFxuICBcIlVwcGVyY2FzZV9MZXR0ZXJcIlxuICAvLyBUaGUgYENoYW5nZXNfV2hlbl8qYCBwcm9wZXJ0aWVzIChhbmQgdGhlaXIgYWxpYXNlcykgY291bGQgYmUgaW5jbHVkZWQsIGJ1dCB0aGV5J3JlIHZlcnkgcmFyZS5cbiAgLy8gU29tZSBvdGhlciBwcm9wZXJ0aWVzIGluY2x1ZGUgYSBoYW5kZnVsIG9mIGNoYXJzIHdpdGggc3BlY2lmaWMgY2FzZXMgb25seSwgYnV0IHRoZXNlIGNoYXJzIGFyZVxuICAvLyBnZW5lcmFsbHkgZXh0cmVtZSBlZGdlIGNhc2VzIGFuZCB1c2luZyBzdWNoIHByb3BlcnRpZXMgY2FzZSBpbnNlbnNpdGl2ZWx5IGdlbmVyYWxseSBwcm9kdWNlc1xuICAvLyB1bmRlc2lyZWQgYmVoYXZpb3IgYW55d2F5XG5dKTtcblxuLy8gc3JjL3RyYW5zZm9ybS5qc1xuaW1wb3J0IHsgY3JlYXRlQWx0ZXJuYXRpdmUsIGNyZWF0ZUFzc2VydGlvbiwgY3JlYXRlQmFja3JlZmVyZW5jZSwgY3JlYXRlQ2FwdHVyaW5nR3JvdXAsIGNyZWF0ZUNoYXJhY3RlciwgY3JlYXRlQ2hhcmFjdGVyQ2xhc3MsIGNyZWF0ZUNoYXJhY3RlclNldCwgY3JlYXRlR3JvdXAsIGNyZWF0ZUxvb2thcm91bmRBc3NlcnRpb24sIGNyZWF0ZVF1YW50aWZpZXIsIGNyZWF0ZVN1YnJvdXRpbmUsIGNyZWF0ZVVuaWNvZGVQcm9wZXJ0eSwgaGFzT25seUNoaWxkLCBwYXJzZSwgc2x1ZyBhcyBzbHVnMiB9IGZyb20gXCJvbmlndXJ1bWEtcGFyc2VyL3BhcnNlclwiO1xuaW1wb3J0IHsgdHJhdmVyc2UgfSBmcm9tIFwib25pZ3VydW1hLXBhcnNlci90cmF2ZXJzZXJcIjtcbmZ1bmN0aW9uIHRyYW5zZm9ybShhc3QsIG9wdGlvbnMpIHtcbiAgY29uc3Qgb3B0cyA9IHtcbiAgICAvLyBBIGNvdXBsZSBlZGdlIGNhc2VzIGV4aXN0IHdoZXJlIG9wdGlvbnMgYGFjY3VyYWN5YCBhbmQgYGJlc3RFZmZvcnRUYXJnZXRgIGFyZSB1c2VkOlxuICAgIC8vIC0gYENoYXJhY3RlclNldGAga2luZCBgdGV4dF9zZWdtZW50YCAoYFxcWGApOiBBbiBleGFjdCByZXByZXNlbnRhdGlvbiB3b3VsZCByZXF1aXJlIGhlYXZ5XG4gICAgLy8gICBVbmljb2RlIGRhdGE7IGEgYmVzdC1lZmZvcnQgYXBwcm94aW1hdGlvbiByZXF1aXJlcyBrbm93aW5nIHRoZSB0YXJnZXQuXG4gICAgLy8gLSBgQ2hhcmFjdGVyU2V0YCBraW5kIGBwb3NpeGAgd2l0aCB2YWx1ZXMgYGdyYXBoYCBhbmQgYHByaW50YDogVGhlaXIgY29tcGxleCBVbmljb2RlXG4gICAgLy8gICByZXByZXNlbnRhdGlvbnMgd291bGQgYmUgaGFyZCB0byBjaGFuZ2UgdG8gQVNDSUkgdmVyc2lvbnMgYWZ0ZXIgdGhlIGZhY3QgaW4gdGhlIGdlbmVyYXRvclxuICAgIC8vICAgYmFzZWQgb24gYHRhcmdldGAvYGFjY3VyYWN5YCwgc28gcHJvZHVjZSB0aGUgYXBwcm9wcmlhdGUgc3RydWN0dXJlIGhlcmUuXG4gICAgYWNjdXJhY3k6IFwiZGVmYXVsdFwiLFxuICAgIGFzY2lpV29yZEJvdW5kYXJpZXM6IGZhbHNlLFxuICAgIGF2b2lkU3ViY2xhc3M6IGZhbHNlLFxuICAgIGJlc3RFZmZvcnRUYXJnZXQ6IFwiRVMyMDI1XCIsXG4gICAgLi4ub3B0aW9uc1xuICB9O1xuICBhZGRQYXJlbnRQcm9wZXJ0aWVzKGFzdCk7XG4gIGNvbnN0IGZpcnN0UGFzc1N0YXRlID0ge1xuICAgIGFjY3VyYWN5OiBvcHRzLmFjY3VyYWN5LFxuICAgIGFzY2lpV29yZEJvdW5kYXJpZXM6IG9wdHMuYXNjaWlXb3JkQm91bmRhcmllcyxcbiAgICBhdm9pZFN1YmNsYXNzOiBvcHRzLmF2b2lkU3ViY2xhc3MsXG4gICAgZmxhZ0RpcmVjdGl2ZXNCeUFsdDogLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKSxcbiAgICBqc0dyb3VwTmFtZU1hcDogLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKSxcbiAgICBtaW5UYXJnZXRFczIwMjQ6IGlzTWluVGFyZ2V0KG9wdHMuYmVzdEVmZm9ydFRhcmdldCwgXCJFUzIwMjRcIiksXG4gICAgcGFzc2VkTG9va2JlaGluZDogZmFsc2UsXG4gICAgc3RyYXRlZ3k6IG51bGwsXG4gICAgLy8gU3Vicm91dGluZXMgY2FuIGFwcGVhciBiZWZvcmUgdGhlIGdyb3VwcyB0aGV5IHJlZiwgc28gY29sbGVjdCByZWZmZWQgbm9kZXMgZm9yIGEgc2Vjb25kIHBhc3MgXG4gICAgc3Vicm91dGluZVJlZk1hcDogLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKSxcbiAgICBzdXBwb3J0ZWRHTm9kZXM6IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KCksXG4gICAgZGlnaXRJc0FzY2lpOiBhc3QuZmxhZ3MuZGlnaXRJc0FzY2lpLFxuICAgIHNwYWNlSXNBc2NpaTogYXN0LmZsYWdzLnNwYWNlSXNBc2NpaSxcbiAgICB3b3JkSXNBc2NpaTogYXN0LmZsYWdzLndvcmRJc0FzY2lpXG4gIH07XG4gIHRyYXZlcnNlKGFzdCwgRmlyc3RQYXNzVmlzaXRvciwgZmlyc3RQYXNzU3RhdGUpO1xuICBjb25zdCBnbG9iYWxGbGFncyA9IHtcbiAgICBkb3RBbGw6IGFzdC5mbGFncy5kb3RBbGwsXG4gICAgaWdub3JlQ2FzZTogYXN0LmZsYWdzLmlnbm9yZUNhc2VcbiAgfTtcbiAgY29uc3Qgc2Vjb25kUGFzc1N0YXRlID0ge1xuICAgIGN1cnJlbnRGbGFnczogZ2xvYmFsRmxhZ3MsXG4gICAgcHJldkZsYWdzOiBudWxsLFxuICAgIGdsb2JhbEZsYWdzLFxuICAgIGdyb3VwT3JpZ2luQnlDb3B5OiAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpLFxuICAgIGdyb3Vwc0J5TmFtZTogLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKSxcbiAgICBtdWx0aXBsZXhDYXB0dXJlc1RvTGVmdEJ5UmVmOiAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpLFxuICAgIG9wZW5SZWZzOiAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpLFxuICAgIHJlZmZlZE5vZGVzQnlSZWZlcmVuY2VyOiAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpLFxuICAgIHN1YnJvdXRpbmVSZWZNYXA6IGZpcnN0UGFzc1N0YXRlLnN1YnJvdXRpbmVSZWZNYXBcbiAgfTtcbiAgdHJhdmVyc2UoYXN0LCBTZWNvbmRQYXNzVmlzaXRvciwgc2Vjb25kUGFzc1N0YXRlKTtcbiAgY29uc3QgdGhpcmRQYXNzU3RhdGUgPSB7XG4gICAgZ3JvdXBzQnlOYW1lOiBzZWNvbmRQYXNzU3RhdGUuZ3JvdXBzQnlOYW1lLFxuICAgIGhpZ2hlc3RPcnBoYW5CYWNrcmVmOiAwLFxuICAgIG51bUNhcHR1cmVzVG9MZWZ0OiAwLFxuICAgIHJlZmZlZE5vZGVzQnlSZWZlcmVuY2VyOiBzZWNvbmRQYXNzU3RhdGUucmVmZmVkTm9kZXNCeVJlZmVyZW5jZXJcbiAgfTtcbiAgdHJhdmVyc2UoYXN0LCBUaGlyZFBhc3NWaXNpdG9yLCB0aGlyZFBhc3NTdGF0ZSk7XG4gIGFzdC5fb3JpZ2luTWFwID0gc2Vjb25kUGFzc1N0YXRlLmdyb3VwT3JpZ2luQnlDb3B5O1xuICBhc3QuX3N0cmF0ZWd5ID0gZmlyc3RQYXNzU3RhdGUuc3RyYXRlZ3k7XG4gIHJldHVybiBhc3Q7XG59XG52YXIgRmlyc3RQYXNzVmlzaXRvciA9IHtcbiAgQWJzZW5jZUZ1bmN0aW9uKHsgbm9kZSwgcGFyZW50LCByZXBsYWNlV2l0aCB9KSB7XG4gICAgY29uc3QgeyBib2R5LCBraW5kIH0gPSBub2RlO1xuICAgIGlmIChraW5kID09PSBcInJlcGVhdGVyXCIpIHtcbiAgICAgIGNvbnN0IGlubmVyR3JvdXAgPSBjcmVhdGVHcm91cCgpO1xuICAgICAgaW5uZXJHcm91cC5ib2R5WzBdLmJvZHkucHVzaChcbiAgICAgICAgLy8gSW5zZXJ0IG93biBhbHRzIGFzIGBib2R5YFxuICAgICAgICBjcmVhdGVMb29rYXJvdW5kQXNzZXJ0aW9uKHsgbmVnYXRlOiB0cnVlLCBib2R5IH0pLFxuICAgICAgICBjcmVhdGVVbmljb2RlUHJvcGVydHkoXCJBbnlcIilcbiAgICAgICk7XG4gICAgICBjb25zdCBvdXRlckdyb3VwID0gY3JlYXRlR3JvdXAoKTtcbiAgICAgIG91dGVyR3JvdXAuYm9keVswXS5ib2R5LnB1c2goXG4gICAgICAgIGNyZWF0ZVF1YW50aWZpZXIoXCJncmVlZHlcIiwgMCwgSW5maW5pdHksIGlubmVyR3JvdXApXG4gICAgICApO1xuICAgICAgcmVwbGFjZVdpdGgoc2V0UGFyZW50RGVlcChvdXRlckdyb3VwLCBwYXJlbnQpLCB7IHRyYXZlcnNlOiB0cnVlIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGFic2VuY2UgZnVuY3Rpb24gXCIoP358XCJgKTtcbiAgICB9XG4gIH0sXG4gIEFsdGVybmF0aXZlOiB7XG4gICAgZW50ZXIoeyBub2RlLCBwYXJlbnQsIGtleSB9LCB7IGZsYWdEaXJlY3RpdmVzQnlBbHQgfSkge1xuICAgICAgY29uc3QgZmxhZ0RpcmVjdGl2ZXMgPSBub2RlLmJvZHkuZmlsdGVyKChlbCkgPT4gZWwua2luZCA9PT0gXCJmbGFnc1wiKTtcbiAgICAgIGZvciAobGV0IGkgPSBrZXkgKyAxOyBpIDwgcGFyZW50LmJvZHkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZm9yd2FyZFNpYmxpbmdBbHQgPSBwYXJlbnQuYm9keVtpXTtcbiAgICAgICAgZ2V0T3JJbnNlcnQoZmxhZ0RpcmVjdGl2ZXNCeUFsdCwgZm9yd2FyZFNpYmxpbmdBbHQsIFtdKS5wdXNoKC4uLmZsYWdEaXJlY3RpdmVzKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGV4aXQoeyBub2RlIH0sIHsgZmxhZ0RpcmVjdGl2ZXNCeUFsdCB9KSB7XG4gICAgICBpZiAoZmxhZ0RpcmVjdGl2ZXNCeUFsdC5nZXQobm9kZSk/Lmxlbmd0aCkge1xuICAgICAgICBjb25zdCBmbGFncyA9IGdldENvbWJpbmVkRmxhZ01vZHNGcm9tRmxhZ05vZGVzKGZsYWdEaXJlY3RpdmVzQnlBbHQuZ2V0KG5vZGUpKTtcbiAgICAgICAgaWYgKGZsYWdzKSB7XG4gICAgICAgICAgY29uc3QgZmxhZ0dyb3VwID0gY3JlYXRlR3JvdXAoeyBmbGFncyB9KTtcbiAgICAgICAgICBmbGFnR3JvdXAuYm9keVswXS5ib2R5ID0gbm9kZS5ib2R5O1xuICAgICAgICAgIG5vZGUuYm9keSA9IFtzZXRQYXJlbnREZWVwKGZsYWdHcm91cCwgbm9kZSldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBBc3NlcnRpb24oeyBub2RlLCBwYXJlbnQsIGtleSwgY29udGFpbmVyLCByb290LCByZW1vdmUsIHJlcGxhY2VXaXRoIH0sIHN0YXRlKSB7XG4gICAgY29uc3QgeyBraW5kLCBuZWdhdGUgfSA9IG5vZGU7XG4gICAgY29uc3QgeyBhc2NpaVdvcmRCb3VuZGFyaWVzLCBhdm9pZFN1YmNsYXNzLCBzdXBwb3J0ZWRHTm9kZXMsIHdvcmRJc0FzY2lpIH0gPSBzdGF0ZTtcbiAgICBpZiAoa2luZCA9PT0gXCJ0ZXh0X3NlZ21lbnRfYm91bmRhcnlcIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCB0ZXh0IHNlZ21lbnQgYm91bmRhcnkgXCJcXFxcJHtuZWdhdGUgPyBcIllcIiA6IFwieVwifVwiYCk7XG4gICAgfSBlbHNlIGlmIChraW5kID09PSBcImxpbmVfZW5kXCIpIHtcbiAgICAgIHJlcGxhY2VXaXRoKHNldFBhcmVudERlZXAoY3JlYXRlTG9va2Fyb3VuZEFzc2VydGlvbih7IGJvZHk6IFtcbiAgICAgICAgY3JlYXRlQWx0ZXJuYXRpdmUoeyBib2R5OiBbY3JlYXRlQXNzZXJ0aW9uKFwic3RyaW5nX2VuZFwiKV0gfSksXG4gICAgICAgIGNyZWF0ZUFsdGVybmF0aXZlKHsgYm9keTogW2NyZWF0ZUNoYXJhY3RlcigxMCldIH0pXG4gICAgICAgIC8vIGBcXG5gXG4gICAgICBdIH0pLCBwYXJlbnQpKTtcbiAgICB9IGVsc2UgaWYgKGtpbmQgPT09IFwibGluZV9zdGFydFwiKSB7XG4gICAgICByZXBsYWNlV2l0aChzZXRQYXJlbnREZWVwKHBhcnNlRnJhZ21lbnQocmAoPzw9XFxBfFxcbig/IVxceikpYCwgeyBza2lwTG9va2JlaGluZFZhbGlkYXRpb246IHRydWUgfSksIHBhcmVudCkpO1xuICAgIH0gZWxzZSBpZiAoa2luZCA9PT0gXCJzZWFyY2hfc3RhcnRcIikge1xuICAgICAgaWYgKHN1cHBvcnRlZEdOb2Rlcy5oYXMobm9kZSkpIHtcbiAgICAgICAgcm9vdC5mbGFncy5zdGlja3kgPSB0cnVlO1xuICAgICAgICByZW1vdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHByZXYgPSBjb250YWluZXJba2V5IC0gMV07XG4gICAgICAgIGlmIChwcmV2ICYmIGlzQWx3YXlzTm9uWmVyb0xlbmd0aChwcmV2KSkge1xuICAgICAgICAgIHJlcGxhY2VXaXRoKHNldFBhcmVudERlZXAoY3JlYXRlTG9va2Fyb3VuZEFzc2VydGlvbih7IG5lZ2F0ZTogdHJ1ZSB9KSwgcGFyZW50KSk7XG4gICAgICAgIH0gZWxzZSBpZiAoYXZvaWRTdWJjbGFzcykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyYFVzZXMgXCJcXEdcIiBpbiBhIHdheSB0aGF0IHJlcXVpcmVzIGEgc3ViY2xhc3NgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXBsYWNlV2l0aChzZXRQYXJlbnQoY3JlYXRlQXNzZXJ0aW9uKFwic3RyaW5nX3N0YXJ0XCIpLCBwYXJlbnQpKTtcbiAgICAgICAgICBzdGF0ZS5zdHJhdGVneSA9IFwiY2xpcF9zZWFyY2hcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoa2luZCA9PT0gXCJzdHJpbmdfZW5kXCIgfHwga2luZCA9PT0gXCJzdHJpbmdfc3RhcnRcIikge1xuICAgIH0gZWxzZSBpZiAoa2luZCA9PT0gXCJzdHJpbmdfZW5kX25ld2xpbmVcIikge1xuICAgICAgcmVwbGFjZVdpdGgoc2V0UGFyZW50RGVlcChwYXJzZUZyYWdtZW50KHJgKD89XFxuP1xceilgKSwgcGFyZW50KSk7XG4gICAgfSBlbHNlIGlmIChraW5kID09PSBcIndvcmRfYm91bmRhcnlcIikge1xuICAgICAgaWYgKCF3b3JkSXNBc2NpaSAmJiAhYXNjaWlXb3JkQm91bmRhcmllcykge1xuICAgICAgICBjb25zdCBiID0gYCg/Oig/PD0ke2RlZmF1bHRXb3JkQ2hhcn0pKD8hJHtkZWZhdWx0V29yZENoYXJ9KXwoPzwhJHtkZWZhdWx0V29yZENoYXJ9KSg/PSR7ZGVmYXVsdFdvcmRDaGFyfSkpYDtcbiAgICAgICAgY29uc3QgQiA9IGAoPzooPzw9JHtkZWZhdWx0V29yZENoYXJ9KSg/PSR7ZGVmYXVsdFdvcmRDaGFyfSl8KD88ISR7ZGVmYXVsdFdvcmRDaGFyfSkoPyEke2RlZmF1bHRXb3JkQ2hhcn0pKWA7XG4gICAgICAgIHJlcGxhY2VXaXRoKHNldFBhcmVudERlZXAocGFyc2VGcmFnbWVudChuZWdhdGUgPyBCIDogYiksIHBhcmVudCkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgYXNzZXJ0aW9uIGtpbmQgXCIke2tpbmR9XCJgKTtcbiAgICB9XG4gIH0sXG4gIEJhY2tyZWZlcmVuY2UoeyBub2RlIH0sIHsganNHcm91cE5hbWVNYXAgfSkge1xuICAgIGxldCB7IHJlZiB9ID0gbm9kZTtcbiAgICBpZiAodHlwZW9mIHJlZiA9PT0gXCJzdHJpbmdcIiAmJiAhaXNWYWxpZEpzR3JvdXBOYW1lKHJlZikpIHtcbiAgICAgIHJlZiA9IGdldEFuZFN0b3JlSnNHcm91cE5hbWUocmVmLCBqc0dyb3VwTmFtZU1hcCk7XG4gICAgICBub2RlLnJlZiA9IHJlZjtcbiAgICB9XG4gIH0sXG4gIENhcHR1cmluZ0dyb3VwKHsgbm9kZSB9LCB7IGpzR3JvdXBOYW1lTWFwLCBzdWJyb3V0aW5lUmVmTWFwIH0pIHtcbiAgICBsZXQgeyBuYW1lIH0gPSBub2RlO1xuICAgIGlmIChuYW1lICYmICFpc1ZhbGlkSnNHcm91cE5hbWUobmFtZSkpIHtcbiAgICAgIG5hbWUgPSBnZXRBbmRTdG9yZUpzR3JvdXBOYW1lKG5hbWUsIGpzR3JvdXBOYW1lTWFwKTtcbiAgICAgIG5vZGUubmFtZSA9IG5hbWU7XG4gICAgfVxuICAgIHN1YnJvdXRpbmVSZWZNYXAuc2V0KG5vZGUubnVtYmVyLCBub2RlKTtcbiAgICBpZiAobmFtZSkge1xuICAgICAgc3Vicm91dGluZVJlZk1hcC5zZXQobmFtZSwgbm9kZSk7XG4gICAgfVxuICB9LFxuICBDaGFyYWN0ZXJDbGFzc1JhbmdlKHsgbm9kZSwgcGFyZW50LCByZXBsYWNlV2l0aCB9KSB7XG4gICAgaWYgKHBhcmVudC5raW5kID09PSBcImludGVyc2VjdGlvblwiKSB7XG4gICAgICBjb25zdCBjYyA9IGNyZWF0ZUNoYXJhY3RlckNsYXNzKHsgYm9keTogW25vZGVdIH0pO1xuICAgICAgcmVwbGFjZVdpdGgoc2V0UGFyZW50RGVlcChjYywgcGFyZW50KSwgeyB0cmF2ZXJzZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH0sXG4gIENoYXJhY3RlclNldCh7IG5vZGUsIHBhcmVudCwgcmVwbGFjZVdpdGggfSwgeyBhY2N1cmFjeSwgbWluVGFyZ2V0RXMyMDI0LCBkaWdpdElzQXNjaWksIHNwYWNlSXNBc2NpaSwgd29yZElzQXNjaWkgfSkge1xuICAgIGNvbnN0IHsga2luZCwgbmVnYXRlLCB2YWx1ZSB9ID0gbm9kZTtcbiAgICBpZiAoZGlnaXRJc0FzY2lpICYmIChraW5kID09PSBcImRpZ2l0XCIgfHwgdmFsdWUgPT09IFwiZGlnaXRcIikpIHtcbiAgICAgIHJlcGxhY2VXaXRoKHNldFBhcmVudChjcmVhdGVDaGFyYWN0ZXJTZXQoXCJkaWdpdFwiLCB7IG5lZ2F0ZSB9KSwgcGFyZW50KSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzcGFjZUlzQXNjaWkgJiYgKGtpbmQgPT09IFwic3BhY2VcIiB8fCB2YWx1ZSA9PT0gXCJzcGFjZVwiKSkge1xuICAgICAgcmVwbGFjZVdpdGgoc2V0UGFyZW50RGVlcChzZXROZWdhdGUocGFyc2VGcmFnbWVudChhc2NpaVNwYWNlQ2hhciksIG5lZ2F0ZSksIHBhcmVudCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAod29yZElzQXNjaWkgJiYgKGtpbmQgPT09IFwid29yZFwiIHx8IHZhbHVlID09PSBcIndvcmRcIikpIHtcbiAgICAgIHJlcGxhY2VXaXRoKHNldFBhcmVudChjcmVhdGVDaGFyYWN0ZXJTZXQoXCJ3b3JkXCIsIHsgbmVnYXRlIH0pLCBwYXJlbnQpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGtpbmQgPT09IFwiYW55XCIpIHtcbiAgICAgIHJlcGxhY2VXaXRoKHNldFBhcmVudChjcmVhdGVVbmljb2RlUHJvcGVydHkoXCJBbnlcIiksIHBhcmVudCkpO1xuICAgIH0gZWxzZSBpZiAoa2luZCA9PT0gXCJkaWdpdFwiKSB7XG4gICAgICByZXBsYWNlV2l0aChzZXRQYXJlbnQoY3JlYXRlVW5pY29kZVByb3BlcnR5KFwiTmRcIiwgeyBuZWdhdGUgfSksIHBhcmVudCkpO1xuICAgIH0gZWxzZSBpZiAoa2luZCA9PT0gXCJkb3RcIikge1xuICAgIH0gZWxzZSBpZiAoa2luZCA9PT0gXCJ0ZXh0X3NlZ21lbnRcIikge1xuICAgICAgaWYgKGFjY3VyYWN5ID09PSBcInN0cmljdFwiKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyYFVzZSBvZiBcIlxcWFwiIHJlcXVpcmVzIG5vbi1zdHJpY3QgYWNjdXJhY3lgKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGVCYXNlID0gXCJcXFxccHtFbW9qaX0oPzpcXFxccHtFTW9kfXxcXFxcdUZFMEZcXFxcdTIwRTM/fFtcXFxceHtFMDAyMH0tXFxcXHh7RTAwN0V9XStcXFxceHtFMDA3Rn0pP1wiO1xuICAgICAgY29uc3QgZW1vamkgPSByYFxccHtSSX17Mn18JHtlQmFzZX0oPzpcXHUyMDBEJHtlQmFzZX0pKmA7XG4gICAgICByZXBsYWNlV2l0aChzZXRQYXJlbnREZWVwKHBhcnNlRnJhZ21lbnQoXG4gICAgICAgIC8vIENsb3NlIGFwcHJveGltYXRpb24gb2YgYW4gZXh0ZW5kZWQgZ3JhcGhlbWUgY2x1c3Rlcjsgc2VlIDx1bmljb2RlLm9yZy9yZXBvcnRzL3RyMjkvPlxuICAgICAgICByYCg/Plxcclxcbnwke21pblRhcmdldEVzMjAyNCA/IHJgXFxwe1JHSV9FbW9qaX1gIDogZW1vaml9fFxcUHtNfVxccHtNfSopYCxcbiAgICAgICAgLy8gQWxsb3cgSlMgcHJvcGVydHkgYFJHSV9FbW9qaWAgdGhyb3VnaFxuICAgICAgICB7IHNraXBQcm9wZXJ0eU5hbWVWYWxpZGF0aW9uOiB0cnVlIH1cbiAgICAgICksIHBhcmVudCkpO1xuICAgIH0gZWxzZSBpZiAoa2luZCA9PT0gXCJoZXhcIikge1xuICAgICAgcmVwbGFjZVdpdGgoc2V0UGFyZW50KGNyZWF0ZVVuaWNvZGVQcm9wZXJ0eShcIkFIZXhcIiwgeyBuZWdhdGUgfSksIHBhcmVudCkpO1xuICAgIH0gZWxzZSBpZiAoa2luZCA9PT0gXCJuZXdsaW5lXCIpIHtcbiAgICAgIHJlcGxhY2VXaXRoKHNldFBhcmVudERlZXAocGFyc2VGcmFnbWVudChuZWdhdGUgPyBcIlteXFxuXVwiIDogXCIoPz5cXHJcXG4/fFtcXG5cXHZcXGZcXHg4NVxcdTIwMjhcXHUyMDI5XSlcIiksIHBhcmVudCkpO1xuICAgIH0gZWxzZSBpZiAoa2luZCA9PT0gXCJwb3NpeFwiKSB7XG4gICAgICBpZiAoIW1pblRhcmdldEVzMjAyNCAmJiAodmFsdWUgPT09IFwiZ3JhcGhcIiB8fCB2YWx1ZSA9PT0gXCJwcmludFwiKSkge1xuICAgICAgICBpZiAoYWNjdXJhY3kgPT09IFwic3RyaWN0XCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBPU0lYIGNsYXNzIFwiJHt2YWx1ZX1cIiByZXF1aXJlcyBtaW4gdGFyZ2V0IEVTMjAyNCBvciBub24tc3RyaWN0IGFjY3VyYWN5YCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGFzY2lpID0ge1xuICAgICAgICAgIGdyYXBoOiBcIiEtflwiLFxuICAgICAgICAgIHByaW50OiBcIiAtflwiXG4gICAgICAgIH1bdmFsdWVdO1xuICAgICAgICBpZiAobmVnYXRlKSB7XG4gICAgICAgICAgYXNjaWkgPSBgXFwwLSR7Y3AoYXNjaWkuY29kZVBvaW50QXQoMCkgLSAxKX0ke2NwKGFzY2lpLmNvZGVQb2ludEF0KDIpICsgMSl9LVxcdXsxMEZGRkZ9YDtcbiAgICAgICAgfVxuICAgICAgICByZXBsYWNlV2l0aChzZXRQYXJlbnREZWVwKHBhcnNlRnJhZ21lbnQoYFske2FzY2lpfV1gKSwgcGFyZW50KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXBsYWNlV2l0aChzZXRQYXJlbnREZWVwKHNldE5lZ2F0ZShwYXJzZUZyYWdtZW50KFBvc2l4Q2xhc3NNYXAuZ2V0KHZhbHVlKSksIG5lZ2F0ZSksIHBhcmVudCkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoa2luZCA9PT0gXCJwcm9wZXJ0eVwiKSB7XG4gICAgICBpZiAoIUpzVW5pY29kZVByb3BlcnR5TWFwLmhhcyhzbHVnMih2YWx1ZSkpKSB7XG4gICAgICAgIG5vZGUua2V5ID0gXCJzY1wiO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoa2luZCA9PT0gXCJzcGFjZVwiKSB7XG4gICAgICByZXBsYWNlV2l0aChzZXRQYXJlbnQoY3JlYXRlVW5pY29kZVByb3BlcnR5KFwic3BhY2VcIiwgeyBuZWdhdGUgfSksIHBhcmVudCkpO1xuICAgIH0gZWxzZSBpZiAoa2luZCA9PT0gXCJ3b3JkXCIpIHtcbiAgICAgIHJlcGxhY2VXaXRoKHNldFBhcmVudERlZXAoc2V0TmVnYXRlKHBhcnNlRnJhZ21lbnQoZGVmYXVsdFdvcmRDaGFyKSwgbmVnYXRlKSwgcGFyZW50KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBjaGFyYWN0ZXIgc2V0IGtpbmQgXCIke2tpbmR9XCJgKTtcbiAgICB9XG4gIH0sXG4gIERpcmVjdGl2ZSh7IG5vZGUsIHBhcmVudCwgcm9vdCwgcmVtb3ZlLCByZXBsYWNlV2l0aCwgcmVtb3ZlQWxsUHJldlNpYmxpbmdzLCByZW1vdmVBbGxOZXh0U2libGluZ3MgfSkge1xuICAgIGNvbnN0IHsga2luZCwgZmxhZ3MgfSA9IG5vZGU7XG4gICAgaWYgKGtpbmQgPT09IFwiZmxhZ3NcIikge1xuICAgICAgaWYgKCFmbGFncy5lbmFibGUgJiYgIWZsYWdzLmRpc2FibGUpIHtcbiAgICAgICAgcmVtb3ZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBmbGFnR3JvdXAgPSBjcmVhdGVHcm91cCh7IGZsYWdzIH0pO1xuICAgICAgICBmbGFnR3JvdXAuYm9keVswXS5ib2R5ID0gcmVtb3ZlQWxsTmV4dFNpYmxpbmdzKCk7XG4gICAgICAgIHJlcGxhY2VXaXRoKHNldFBhcmVudERlZXAoZmxhZ0dyb3VwLCBwYXJlbnQpLCB7IHRyYXZlcnNlOiB0cnVlIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoa2luZCA9PT0gXCJrZWVwXCIpIHtcbiAgICAgIGNvbnN0IGZpcnN0QWx0ID0gcm9vdC5ib2R5WzBdO1xuICAgICAgY29uc3QgaGFzV3JhcHBlckdyb3VwID0gcm9vdC5ib2R5Lmxlbmd0aCA9PT0gMSAmJiAvLyBOb3QgZW11bGF0YWJsZSBpZiB3aXRoaW4gYSBgQ2FwdHVyaW5nR3JvdXBgXG4gICAgICBoYXNPbmx5Q2hpbGQoZmlyc3RBbHQsIHsgdHlwZTogXCJHcm91cFwiIH0pICYmIGZpcnN0QWx0LmJvZHlbMF0uYm9keS5sZW5ndGggPT09IDE7XG4gICAgICBjb25zdCB0b3BMZXZlbCA9IGhhc1dyYXBwZXJHcm91cCA/IGZpcnN0QWx0LmJvZHlbMF0gOiByb290O1xuICAgICAgaWYgKHBhcmVudC5wYXJlbnQgIT09IHRvcExldmVsIHx8IHRvcExldmVsLmJvZHkubGVuZ3RoID4gMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmBVc2VzIFwiXFxLXCIgaW4gYSB3YXkgdGhhdCdzIHVuc3VwcG9ydGVkYCk7XG4gICAgICB9XG4gICAgICBjb25zdCBsb29rYmVoaW5kID0gY3JlYXRlTG9va2Fyb3VuZEFzc2VydGlvbih7IGJlaGluZDogdHJ1ZSB9KTtcbiAgICAgIGxvb2tiZWhpbmQuYm9keVswXS5ib2R5ID0gcmVtb3ZlQWxsUHJldlNpYmxpbmdzKCk7XG4gICAgICByZXBsYWNlV2l0aChzZXRQYXJlbnREZWVwKGxvb2tiZWhpbmQsIHBhcmVudCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgZGlyZWN0aXZlIGtpbmQgXCIke2tpbmR9XCJgKTtcbiAgICB9XG4gIH0sXG4gIEZsYWdzKHsgbm9kZSwgcGFyZW50IH0pIHtcbiAgICBpZiAobm9kZS5wb3NpeElzQXNjaWkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgZmxhZyBcIlBcIicpO1xuICAgIH1cbiAgICBpZiAobm9kZS50ZXh0U2VnbWVudE1vZGUgPT09IFwid29yZFwiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGZsYWcgXCJ5e3d9XCInKTtcbiAgICB9XG4gICAgW1xuICAgICAgXCJkaWdpdElzQXNjaWlcIixcbiAgICAgIC8vIEZsYWcgRFxuICAgICAgXCJleHRlbmRlZFwiLFxuICAgICAgLy8gRmxhZyB4XG4gICAgICBcInBvc2l4SXNBc2NpaVwiLFxuICAgICAgLy8gRmxhZyBQXG4gICAgICBcInNwYWNlSXNBc2NpaVwiLFxuICAgICAgLy8gRmxhZyBTXG4gICAgICBcIndvcmRJc0FzY2lpXCIsXG4gICAgICAvLyBGbGFnIFdcbiAgICAgIFwidGV4dFNlZ21lbnRNb2RlXCJcbiAgICAgIC8vIEZsYWcgeXtnfSBvciB5e3d9XG4gICAgXS5mb3JFYWNoKChmKSA9PiBkZWxldGUgbm9kZVtmXSk7XG4gICAgT2JqZWN0LmFzc2lnbihub2RlLCB7XG4gICAgICAvLyBKUyBmbGFnIGc7IG5vIE9uaWcgZXF1aXZcbiAgICAgIGdsb2JhbDogZmFsc2UsXG4gICAgICAvLyBKUyBmbGFnIGQ7IG5vIE9uaWcgZXF1aXZcbiAgICAgIGhhc0luZGljZXM6IGZhbHNlLFxuICAgICAgLy8gSlMgZmxhZyBtOyBubyBPbmlnIGVxdWl2IGJ1dCBpdHMgYmVoYXZpb3IgaXMgYWx3YXlzIG9uIGluIE9uaWcuIE9uaWcncyBvbmx5IGxpbmUgYnJlYWtcbiAgICAgIC8vIGNoYXIgaXMgbGluZSBmZWVkLCB1bmxpa2UgSlMsIHNvIHRoaXMgZmxhZyBpc24ndCB1c2VkIHNpbmNlIGl0IHdvdWxkIHByb2R1Y2UgaW5hY2N1cmF0ZVxuICAgICAgLy8gcmVzdWx0cyAoYWxzbyBhbGxvd3MgYF5gIGFuZCBgJGAgdG8gYmUgdXNlZCBpbiB0aGUgZ2VuZXJhdG9yIGZvciBzdHJpbmcgc3RhcnQgYW5kIGVuZClcbiAgICAgIG11bHRpbGluZTogZmFsc2UsXG4gICAgICAvLyBKUyBmbGFnIHk7IG5vIE9uaWcgZXF1aXYsIGJ1dCB1c2VkIGZvciBgXFxHYCBlbXVsYXRpb25cbiAgICAgIHN0aWNreTogbm9kZS5zdGlja3kgPz8gZmFsc2VcbiAgICAgIC8vIE5vdGU6IFJlZ2V4KyBkb2Vzbid0IGFsbG93IGV4cGxpY2l0bHkgYWRkaW5nIGZsYWdzIGl0IGhhbmRsZXMgaW1wbGljaXRseSwgc28gbGVhdmUgb3V0XG4gICAgICAvLyBwcm9wZXJ0aWVzIGB1bmljb2RlYCAoSlMgZmxhZyB1KSBhbmQgYHVuaWNvZGVTZXRzYCAoSlMgZmxhZyB2KS4gS2VlcCB0aGUgZXhpc3RpbmcgdmFsdWVzXG4gICAgICAvLyBmb3IgYGlnbm9yZUNhc2VgIChmbGFnIGkpIGFuZCBgZG90QWxsYCAoSlMgZmxhZyBzLCBidXQgT25pZyBmbGFnIG0pXG4gICAgfSk7XG4gICAgcGFyZW50Lm9wdGlvbnMgPSB7XG4gICAgICBkaXNhYmxlOiB7XG4gICAgICAgIC8vIE9uaWcgdXNlcyBkaWZmZXJlbnQgcnVsZXMgZm9yIGZsYWcgeCB0aGFuIFJlZ2V4Kywgc28gZGlzYWJsZSB0aGUgaW1wbGljaXQgZmxhZ1xuICAgICAgICB4OiB0cnVlLFxuICAgICAgICAvLyBPbmlnIGhhcyBubyBmbGFnIHRvIGNvbnRyb2wgXCJuYW1lZCBjYXB0dXJlIG9ubHlcIiBtb2RlIGJ1dCBjb250ZXh0dWFsbHkgYXBwbGllcyBpdHNcbiAgICAgICAgLy8gYmVoYXZpb3Igd2hlbiBuYW1lZCBjYXB0dXJpbmcgaXMgdXNlZCwgc28gZGlzYWJsZSBSZWdleCsncyBpbXBsaWNpdCBmbGFnIGZvciBpdFxuICAgICAgICBuOiB0cnVlXG4gICAgICB9LFxuICAgICAgZm9yY2U6IHtcbiAgICAgICAgLy8gQWx3YXlzIGFkZCBmbGFnIHYgYmVjYXVzZSB3ZSdyZSBnZW5lcmF0aW5nIGFuIEFTVCB0aGF0IHJlbGllcyBvbiBpdCAoaXQgZW5hYmxlcyBKU1xuICAgICAgICAvLyBzdXBwb3J0IGZvciBPbmlnIGZlYXR1cmVzIG5lc3RlZCBjbGFzc2VzLCBpbnRlcnNlY3Rpb24sIFVuaWNvZGUgcHJvcGVydGllcywgZXRjLikuXG4gICAgICAgIC8vIEhvd2V2ZXIsIHRoZSBnZW5lcmF0b3IgbWlnaHQgZGlzYWJsZSBmbGFnIHYgYmFzZWQgb24gaXRzIGB0YXJnZXRgIG9wdGlvblxuICAgICAgICB2OiB0cnVlXG4gICAgICB9XG4gICAgfTtcbiAgfSxcbiAgR3JvdXAoeyBub2RlIH0pIHtcbiAgICBpZiAoIW5vZGUuZmxhZ3MpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeyBlbmFibGUsIGRpc2FibGUgfSA9IG5vZGUuZmxhZ3M7XG4gICAgZW5hYmxlPy5leHRlbmRlZCAmJiBkZWxldGUgZW5hYmxlLmV4dGVuZGVkO1xuICAgIGRpc2FibGU/LmV4dGVuZGVkICYmIGRlbGV0ZSBkaXNhYmxlLmV4dGVuZGVkO1xuICAgIGVuYWJsZT8uZG90QWxsICYmIGRpc2FibGU/LmRvdEFsbCAmJiBkZWxldGUgZW5hYmxlLmRvdEFsbDtcbiAgICBlbmFibGU/Lmlnbm9yZUNhc2UgJiYgZGlzYWJsZT8uaWdub3JlQ2FzZSAmJiBkZWxldGUgZW5hYmxlLmlnbm9yZUNhc2U7XG4gICAgZW5hYmxlICYmICFPYmplY3Qua2V5cyhlbmFibGUpLmxlbmd0aCAmJiBkZWxldGUgbm9kZS5mbGFncy5lbmFibGU7XG4gICAgZGlzYWJsZSAmJiAhT2JqZWN0LmtleXMoZGlzYWJsZSkubGVuZ3RoICYmIGRlbGV0ZSBub2RlLmZsYWdzLmRpc2FibGU7XG4gICAgIW5vZGUuZmxhZ3MuZW5hYmxlICYmICFub2RlLmZsYWdzLmRpc2FibGUgJiYgZGVsZXRlIG5vZGUuZmxhZ3M7XG4gIH0sXG4gIExvb2thcm91bmRBc3NlcnRpb24oeyBub2RlIH0sIHN0YXRlKSB7XG4gICAgY29uc3QgeyBraW5kIH0gPSBub2RlO1xuICAgIGlmIChraW5kID09PSBcImxvb2tiZWhpbmRcIikge1xuICAgICAgc3RhdGUucGFzc2VkTG9va2JlaGluZCA9IHRydWU7XG4gICAgfVxuICB9LFxuICBOYW1lZENhbGxvdXQoeyBub2RlLCBwYXJlbnQsIHJlcGxhY2VXaXRoIH0pIHtcbiAgICBjb25zdCB7IGtpbmQgfSA9IG5vZGU7XG4gICAgaWYgKGtpbmQgPT09IFwiZmFpbFwiKSB7XG4gICAgICByZXBsYWNlV2l0aChzZXRQYXJlbnREZWVwKGNyZWF0ZUxvb2thcm91bmRBc3NlcnRpb24oeyBuZWdhdGU6IHRydWUgfSksIHBhcmVudCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIG5hbWVkIGNhbGxvdXQgXCIoKiR7a2luZC50b1VwcGVyQ2FzZSgpfVwiYCk7XG4gICAgfVxuICB9LFxuICBRdWFudGlmaWVyKHsgbm9kZSB9KSB7XG4gICAgaWYgKG5vZGUuYm9keS50eXBlID09PSBcIlF1YW50aWZpZXJcIikge1xuICAgICAgY29uc3QgZ3JvdXAgPSBjcmVhdGVHcm91cCgpO1xuICAgICAgZ3JvdXAuYm9keVswXS5ib2R5LnB1c2gobm9kZS5ib2R5KTtcbiAgICAgIG5vZGUuYm9keSA9IHNldFBhcmVudERlZXAoZ3JvdXAsIG5vZGUpO1xuICAgIH1cbiAgfSxcbiAgUmVnZXg6IHtcbiAgICBlbnRlcih7IG5vZGUgfSwgeyBzdXBwb3J0ZWRHTm9kZXMgfSkge1xuICAgICAgY29uc3QgbGVhZGluZ0dzID0gW107XG4gICAgICBsZXQgaGFzQWx0V2l0aExlYWRHID0gZmFsc2U7XG4gICAgICBsZXQgaGFzQWx0V2l0aG91dExlYWRHID0gZmFsc2U7XG4gICAgICBmb3IgKGNvbnN0IGFsdCBvZiBub2RlLmJvZHkpIHtcbiAgICAgICAgaWYgKGFsdC5ib2R5Lmxlbmd0aCA9PT0gMSAmJiBhbHQuYm9keVswXS5raW5kID09PSBcInNlYXJjaF9zdGFydFwiKSB7XG4gICAgICAgICAgYWx0LmJvZHkucG9wKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgbGVhZGluZ0cgPSBnZXRMZWFkaW5nRyhhbHQuYm9keSk7XG4gICAgICAgICAgaWYgKGxlYWRpbmdHKSB7XG4gICAgICAgICAgICBoYXNBbHRXaXRoTGVhZEcgPSB0cnVlO1xuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShsZWFkaW5nRykgPyBsZWFkaW5nR3MucHVzaCguLi5sZWFkaW5nRykgOiBsZWFkaW5nR3MucHVzaChsZWFkaW5nRyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhhc0FsdFdpdGhvdXRMZWFkRyA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaGFzQWx0V2l0aExlYWRHICYmICFoYXNBbHRXaXRob3V0TGVhZEcpIHtcbiAgICAgICAgbGVhZGluZ0dzLmZvckVhY2goKGcpID0+IHN1cHBvcnRlZEdOb2Rlcy5hZGQoZykpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZXhpdChfLCB7IGFjY3VyYWN5LCBwYXNzZWRMb29rYmVoaW5kLCBzdHJhdGVneSB9KSB7XG4gICAgICBpZiAoYWNjdXJhY3kgPT09IFwic3RyaWN0XCIgJiYgcGFzc2VkTG9va2JlaGluZCAmJiBzdHJhdGVneSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmBVc2VzIFwiXFxHXCIgaW4gYSB3YXkgdGhhdCByZXF1aXJlcyBub24tc3RyaWN0IGFjY3VyYWN5YCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBTdWJyb3V0aW5lKHsgbm9kZSB9LCB7IGpzR3JvdXBOYW1lTWFwIH0pIHtcbiAgICBsZXQgeyByZWYgfSA9IG5vZGU7XG4gICAgaWYgKHR5cGVvZiByZWYgPT09IFwic3RyaW5nXCIgJiYgIWlzVmFsaWRKc0dyb3VwTmFtZShyZWYpKSB7XG4gICAgICByZWYgPSBnZXRBbmRTdG9yZUpzR3JvdXBOYW1lKHJlZiwganNHcm91cE5hbWVNYXApO1xuICAgICAgbm9kZS5yZWYgPSByZWY7XG4gICAgfVxuICB9XG59O1xudmFyIFNlY29uZFBhc3NWaXNpdG9yID0ge1xuICBCYWNrcmVmZXJlbmNlKHsgbm9kZSB9LCB7IG11bHRpcGxleENhcHR1cmVzVG9MZWZ0QnlSZWYsIHJlZmZlZE5vZGVzQnlSZWZlcmVuY2VyIH0pIHtcbiAgICBjb25zdCB7IG9ycGhhbiwgcmVmIH0gPSBub2RlO1xuICAgIGlmICghb3JwaGFuKSB7XG4gICAgICByZWZmZWROb2Rlc0J5UmVmZXJlbmNlci5zZXQobm9kZSwgWy4uLm11bHRpcGxleENhcHR1cmVzVG9MZWZ0QnlSZWYuZ2V0KHJlZikubWFwKCh7IG5vZGU6IG5vZGUyIH0pID0+IG5vZGUyKV0pO1xuICAgIH1cbiAgfSxcbiAgQ2FwdHVyaW5nR3JvdXA6IHtcbiAgICBlbnRlcih7XG4gICAgICBub2RlLFxuICAgICAgcGFyZW50LFxuICAgICAgcmVwbGFjZVdpdGgsXG4gICAgICBza2lwXG4gICAgfSwge1xuICAgICAgZ3JvdXBPcmlnaW5CeUNvcHksXG4gICAgICBncm91cHNCeU5hbWUsXG4gICAgICBtdWx0aXBsZXhDYXB0dXJlc1RvTGVmdEJ5UmVmLFxuICAgICAgb3BlblJlZnMsXG4gICAgICByZWZmZWROb2Rlc0J5UmVmZXJlbmNlclxuICAgIH0pIHtcbiAgICAgIGNvbnN0IG9yaWdpbiA9IGdyb3VwT3JpZ2luQnlDb3B5LmdldChub2RlKTtcbiAgICAgIGlmIChvcmlnaW4gJiYgb3BlblJlZnMuaGFzKG5vZGUubnVtYmVyKSkge1xuICAgICAgICBjb25zdCByZWN1cnNpb24yID0gc2V0UGFyZW50KGNyZWF0ZVJlY3Vyc2lvbihub2RlLm51bWJlciksIHBhcmVudCk7XG4gICAgICAgIHJlZmZlZE5vZGVzQnlSZWZlcmVuY2VyLnNldChyZWN1cnNpb24yLCBvcGVuUmVmcy5nZXQobm9kZS5udW1iZXIpKTtcbiAgICAgICAgcmVwbGFjZVdpdGgocmVjdXJzaW9uMik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIG9wZW5SZWZzLnNldChub2RlLm51bWJlciwgbm9kZSk7XG4gICAgICBtdWx0aXBsZXhDYXB0dXJlc1RvTGVmdEJ5UmVmLnNldChub2RlLm51bWJlciwgW10pO1xuICAgICAgaWYgKG5vZGUubmFtZSkge1xuICAgICAgICBnZXRPckluc2VydChtdWx0aXBsZXhDYXB0dXJlc1RvTGVmdEJ5UmVmLCBub2RlLm5hbWUsIFtdKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG11bHRpcGxleE5vZGVzID0gbXVsdGlwbGV4Q2FwdHVyZXNUb0xlZnRCeVJlZi5nZXQobm9kZS5uYW1lID8/IG5vZGUubnVtYmVyKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXVsdGlwbGV4Tm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgbXVsdGlwbGV4ID0gbXVsdGlwbGV4Tm9kZXNbaV07XG4gICAgICAgIGlmIChcbiAgICAgICAgICAvLyBUaGlzIGdyb3VwIGlzIGZyb20gc3Vicm91dGluZSBleHBhbnNpb24sIGFuZCB0aGVyZSdzIGEgbXVsdGlwbGV4IHZhbHVlIGZyb20gZWl0aGVyIHRoZVxuICAgICAgICAgIC8vIG9yaWdpbiBub2RlIG9yIGEgcHJpb3Igc3Vicm91dGluZSBleHBhbnNpb24gZ3JvdXAgd2l0aCB0aGUgc2FtZSBvcmlnaW5cbiAgICAgICAgICBvcmlnaW4gPT09IG11bHRpcGxleC5ub2RlIHx8IG9yaWdpbiAmJiBvcmlnaW4gPT09IG11bHRpcGxleC5vcmlnaW4gfHwgLy8gVGhpcyBncm91cCBpcyBub3QgZnJvbSBzdWJyb3V0aW5lIGV4cGFuc2lvbiwgYW5kIGl0IGNvbWVzIGFmdGVyIGEgc3Vicm91dGluZSBleHBhbnNpb25cbiAgICAgICAgICAvLyBncm91cCB0aGF0IHJlZmVycyB0byB0aGlzIGdyb3VwXG4gICAgICAgICAgbm9kZSA9PT0gbXVsdGlwbGV4Lm9yaWdpblxuICAgICAgICApIHtcbiAgICAgICAgICBtdWx0aXBsZXhOb2Rlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG11bHRpcGxleENhcHR1cmVzVG9MZWZ0QnlSZWYuZ2V0KG5vZGUubnVtYmVyKS5wdXNoKHsgbm9kZSwgb3JpZ2luIH0pO1xuICAgICAgaWYgKG5vZGUubmFtZSkge1xuICAgICAgICBtdWx0aXBsZXhDYXB0dXJlc1RvTGVmdEJ5UmVmLmdldChub2RlLm5hbWUpLnB1c2goeyBub2RlLCBvcmlnaW4gfSk7XG4gICAgICB9XG4gICAgICBpZiAobm9kZS5uYW1lKSB7XG4gICAgICAgIGNvbnN0IGdyb3Vwc1dpdGhTYW1lTmFtZSA9IGdldE9ySW5zZXJ0KGdyb3Vwc0J5TmFtZSwgbm9kZS5uYW1lLCAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpKTtcbiAgICAgICAgbGV0IGhhc0R1cGxpY2F0ZU5hbWVUb1JlbW92ZSA9IGZhbHNlO1xuICAgICAgICBpZiAob3JpZ2luKSB7XG4gICAgICAgICAgaGFzRHVwbGljYXRlTmFtZVRvUmVtb3ZlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGdyb3VwSW5mbyBvZiBncm91cHNXaXRoU2FtZU5hbWUudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmICghZ3JvdXBJbmZvLmhhc0R1cGxpY2F0ZU5hbWVUb1JlbW92ZSkge1xuICAgICAgICAgICAgICBoYXNEdXBsaWNhdGVOYW1lVG9SZW1vdmUgPSB0cnVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZ3JvdXBzQnlOYW1lLmdldChub2RlLm5hbWUpLnNldChub2RlLCB7IG5vZGUsIGhhc0R1cGxpY2F0ZU5hbWVUb1JlbW92ZSB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGV4aXQoeyBub2RlIH0sIHsgb3BlblJlZnMgfSkge1xuICAgICAgaWYgKG9wZW5SZWZzLmdldChub2RlLm51bWJlcikgPT09IG5vZGUpIHtcbiAgICAgICAgb3BlblJlZnMuZGVsZXRlKG5vZGUubnVtYmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIEdyb3VwOiB7XG4gICAgZW50ZXIoeyBub2RlIH0sIHN0YXRlKSB7XG4gICAgICBzdGF0ZS5wcmV2RmxhZ3MgPSBzdGF0ZS5jdXJyZW50RmxhZ3M7XG4gICAgICBpZiAobm9kZS5mbGFncykge1xuICAgICAgICBzdGF0ZS5jdXJyZW50RmxhZ3MgPSBnZXROZXdDdXJyZW50RmxhZ3Moc3RhdGUuY3VycmVudEZsYWdzLCBub2RlLmZsYWdzKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGV4aXQoXywgc3RhdGUpIHtcbiAgICAgIHN0YXRlLmN1cnJlbnRGbGFncyA9IHN0YXRlLnByZXZGbGFncztcbiAgICB9XG4gIH0sXG4gIFN1YnJvdXRpbmUoeyBub2RlLCBwYXJlbnQsIHJlcGxhY2VXaXRoIH0sIHN0YXRlKSB7XG4gICAgY29uc3QgeyBpc1JlY3Vyc2l2ZSwgcmVmIH0gPSBub2RlO1xuICAgIGlmIChpc1JlY3Vyc2l2ZSkge1xuICAgICAgbGV0IHJlZmZlZCA9IHBhcmVudDtcbiAgICAgIHdoaWxlIChyZWZmZWQgPSByZWZmZWQucGFyZW50KSB7XG4gICAgICAgIGlmIChyZWZmZWQudHlwZSA9PT0gXCJDYXB0dXJpbmdHcm91cFwiICYmIChyZWZmZWQubmFtZSA9PT0gcmVmIHx8IHJlZmZlZC5udW1iZXIgPT09IHJlZikpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc3RhdGUucmVmZmVkTm9kZXNCeVJlZmVyZW5jZXIuc2V0KG5vZGUsIHJlZmZlZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHJlZmZlZEdyb3VwTm9kZSA9IHN0YXRlLnN1YnJvdXRpbmVSZWZNYXAuZ2V0KHJlZik7XG4gICAgY29uc3QgaXNHbG9iYWxSZWN1cnNpb24gPSByZWYgPT09IDA7XG4gICAgY29uc3QgZXhwYW5kZWRTdWJyb3V0aW5lID0gaXNHbG9iYWxSZWN1cnNpb24gPyBjcmVhdGVSZWN1cnNpb24oMCkgOiAoXG4gICAgICAvLyBUaGUgcmVmZmVkIGdyb3VwIG1pZ2h0IGl0c2VsZiBjb250YWluIHN1YnJvdXRpbmVzLCB3aGljaCBhcmUgZXhwYW5kZWQgZHVyaW5nIHN1Yi10cmF2ZXJzYWxcbiAgICAgIGNsb25lQ2FwdHVyaW5nR3JvdXAocmVmZmVkR3JvdXBOb2RlLCBzdGF0ZS5ncm91cE9yaWdpbkJ5Q29weSwgbnVsbClcbiAgICApO1xuICAgIGxldCByZXBsYWNlbWVudCA9IGV4cGFuZGVkU3Vicm91dGluZTtcbiAgICBpZiAoIWlzR2xvYmFsUmVjdXJzaW9uKSB7XG4gICAgICBjb25zdCByZWZmZWRHcm91cEZsYWdNb2RzID0gZ2V0Q29tYmluZWRGbGFnTW9kc0Zyb21GbGFnTm9kZXMoZ2V0QWxsUGFyZW50cyhcbiAgICAgICAgcmVmZmVkR3JvdXBOb2RlLFxuICAgICAgICAocCkgPT4gcC50eXBlID09PSBcIkdyb3VwXCIgJiYgISFwLmZsYWdzXG4gICAgICApKTtcbiAgICAgIGNvbnN0IHJlZmZlZEdyb3VwRmxhZ3MgPSByZWZmZWRHcm91cEZsYWdNb2RzID8gZ2V0TmV3Q3VycmVudEZsYWdzKHN0YXRlLmdsb2JhbEZsYWdzLCByZWZmZWRHcm91cEZsYWdNb2RzKSA6IHN0YXRlLmdsb2JhbEZsYWdzO1xuICAgICAgaWYgKCFhcmVGbGFnc0VxdWFsKHJlZmZlZEdyb3VwRmxhZ3MsIHN0YXRlLmN1cnJlbnRGbGFncykpIHtcbiAgICAgICAgcmVwbGFjZW1lbnQgPSBjcmVhdGVHcm91cCh7XG4gICAgICAgICAgZmxhZ3M6IGdldEZsYWdNb2RzRnJvbUZsYWdzKHJlZmZlZEdyb3VwRmxhZ3MpXG4gICAgICAgIH0pO1xuICAgICAgICByZXBsYWNlbWVudC5ib2R5WzBdLmJvZHkucHVzaChleHBhbmRlZFN1YnJvdXRpbmUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXBsYWNlV2l0aChzZXRQYXJlbnREZWVwKHJlcGxhY2VtZW50LCBwYXJlbnQpLCB7IHRyYXZlcnNlOiAhaXNHbG9iYWxSZWN1cnNpb24gfSk7XG4gIH1cbn07XG52YXIgVGhpcmRQYXNzVmlzaXRvciA9IHtcbiAgQmFja3JlZmVyZW5jZSh7IG5vZGUsIHBhcmVudCwgcmVwbGFjZVdpdGggfSwgc3RhdGUpIHtcbiAgICBpZiAobm9kZS5vcnBoYW4pIHtcbiAgICAgIHN0YXRlLmhpZ2hlc3RPcnBoYW5CYWNrcmVmID0gTWF0aC5tYXgoc3RhdGUuaGlnaGVzdE9ycGhhbkJhY2tyZWYsIG5vZGUucmVmKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcmVmZmVkTm9kZXMgPSBzdGF0ZS5yZWZmZWROb2Rlc0J5UmVmZXJlbmNlci5nZXQobm9kZSk7XG4gICAgY29uc3QgcGFydGljaXBhbnRzID0gcmVmZmVkTm9kZXMuZmlsdGVyKChyZWZmZWQpID0+IGNhblBhcnRpY2lwYXRlV2l0aE5vZGUocmVmZmVkLCBub2RlKSk7XG4gICAgaWYgKCFwYXJ0aWNpcGFudHMubGVuZ3RoKSB7XG4gICAgICByZXBsYWNlV2l0aChzZXRQYXJlbnREZWVwKGNyZWF0ZUxvb2thcm91bmRBc3NlcnRpb24oeyBuZWdhdGU6IHRydWUgfSksIHBhcmVudCkpO1xuICAgIH0gZWxzZSBpZiAocGFydGljaXBhbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IGdyb3VwID0gY3JlYXRlR3JvdXAoe1xuICAgICAgICBhdG9taWM6IHRydWUsXG4gICAgICAgIGJvZHk6IHBhcnRpY2lwYW50cy5yZXZlcnNlKCkubWFwKChyZWZmZWQpID0+IGNyZWF0ZUFsdGVybmF0aXZlKHtcbiAgICAgICAgICBib2R5OiBbY3JlYXRlQmFja3JlZmVyZW5jZShyZWZmZWQubnVtYmVyKV1cbiAgICAgICAgfSkpXG4gICAgICB9KTtcbiAgICAgIHJlcGxhY2VXaXRoKHNldFBhcmVudERlZXAoZ3JvdXAsIHBhcmVudCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlLnJlZiA9IHBhcnRpY2lwYW50c1swXS5udW1iZXI7XG4gICAgfVxuICB9LFxuICBDYXB0dXJpbmdHcm91cCh7IG5vZGUgfSwgc3RhdGUpIHtcbiAgICBub2RlLm51bWJlciA9ICsrc3RhdGUubnVtQ2FwdHVyZXNUb0xlZnQ7XG4gICAgaWYgKG5vZGUubmFtZSkge1xuICAgICAgaWYgKHN0YXRlLmdyb3Vwc0J5TmFtZS5nZXQobm9kZS5uYW1lKS5nZXQobm9kZSkuaGFzRHVwbGljYXRlTmFtZVRvUmVtb3ZlKSB7XG4gICAgICAgIGRlbGV0ZSBub2RlLm5hbWU7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBSZWdleDoge1xuICAgIGV4aXQoeyBub2RlIH0sIHN0YXRlKSB7XG4gICAgICBjb25zdCBudW1DYXBzTmVlZGVkID0gTWF0aC5tYXgoc3RhdGUuaGlnaGVzdE9ycGhhbkJhY2tyZWYgLSBzdGF0ZS5udW1DYXB0dXJlc1RvTGVmdCwgMCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNhcHNOZWVkZWQ7IGkrKykge1xuICAgICAgICBjb25zdCBlbXB0eUNhcHR1cmUgPSBjcmVhdGVDYXB0dXJpbmdHcm91cCgpO1xuICAgICAgICBub2RlLmJvZHkuYXQoLTEpLmJvZHkucHVzaChlbXB0eUNhcHR1cmUpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgU3Vicm91dGluZSh7IG5vZGUgfSwgc3RhdGUpIHtcbiAgICBpZiAoIW5vZGUuaXNSZWN1cnNpdmUgfHwgbm9kZS5yZWYgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbm9kZS5yZWYgPSBzdGF0ZS5yZWZmZWROb2Rlc0J5UmVmZXJlbmNlci5nZXQobm9kZSkubnVtYmVyO1xuICB9XG59O1xuZnVuY3Rpb24gYWRkUGFyZW50UHJvcGVydGllcyhyb290KSB7XG4gIHRyYXZlcnNlKHJvb3QsIHtcbiAgICBcIipcIih7IG5vZGUsIHBhcmVudCB9KSB7XG4gICAgICBub2RlLnBhcmVudCA9IHBhcmVudDtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gYXJlRmxhZ3NFcXVhbChhLCBiKSB7XG4gIHJldHVybiBhLmRvdEFsbCA9PT0gYi5kb3RBbGwgJiYgYS5pZ25vcmVDYXNlID09PSBiLmlnbm9yZUNhc2U7XG59XG5mdW5jdGlvbiBjYW5QYXJ0aWNpcGF0ZVdpdGhOb2RlKGNhcHR1cmUsIG5vZGUpIHtcbiAgbGV0IHJpZ2h0bW9zdFBvaW50ID0gbm9kZTtcbiAgZG8ge1xuICAgIGlmIChyaWdodG1vc3RQb2ludC50eXBlID09PSBcIlJlZ2V4XCIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHJpZ2h0bW9zdFBvaW50LnR5cGUgPT09IFwiQWx0ZXJuYXRpdmVcIikge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChyaWdodG1vc3RQb2ludCA9PT0gY2FwdHVyZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBraWRzT2ZQYXJlbnQgPSBnZXRLaWRzKHJpZ2h0bW9zdFBvaW50LnBhcmVudCk7XG4gICAgZm9yIChjb25zdCBraWQgb2Yga2lkc09mUGFyZW50KSB7XG4gICAgICBpZiAoa2lkID09PSByaWdodG1vc3RQb2ludCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChraWQgPT09IGNhcHR1cmUgfHwgaXNBbmNlc3Rvck9mKGtpZCwgY2FwdHVyZSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9IHdoaWxlIChyaWdodG1vc3RQb2ludCA9IHJpZ2h0bW9zdFBvaW50LnBhcmVudCk7XG4gIHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgcGF0aFwiKTtcbn1cbmZ1bmN0aW9uIGNsb25lQ2FwdHVyaW5nR3JvdXAob2JqLCBvcmlnaW5NYXAsIHVwLCB1cDIpIHtcbiAgY29uc3Qgc3RvcmUgPSBBcnJheS5pc0FycmF5KG9iaikgPyBbXSA6IHt9O1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhvYmopKSB7XG4gICAgaWYgKGtleSA9PT0gXCJwYXJlbnRcIikge1xuICAgICAgc3RvcmUucGFyZW50ID0gQXJyYXkuaXNBcnJheSh1cCkgPyB1cDIgOiB1cDtcbiAgICB9IGVsc2UgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgc3RvcmVba2V5XSA9IGNsb25lQ2FwdHVyaW5nR3JvdXAodmFsdWUsIG9yaWdpbk1hcCwgc3RvcmUsIHVwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGtleSA9PT0gXCJ0eXBlXCIgJiYgdmFsdWUgPT09IFwiQ2FwdHVyaW5nR3JvdXBcIikge1xuICAgICAgICBvcmlnaW5NYXAuc2V0KHN0b3JlLCBvcmlnaW5NYXAuZ2V0KG9iaikgPz8gb2JqKTtcbiAgICAgIH1cbiAgICAgIHN0b3JlW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0b3JlO1xufVxuZnVuY3Rpb24gY3JlYXRlUmVjdXJzaW9uKHJlZikge1xuICBjb25zdCBub2RlID0gY3JlYXRlU3Vicm91dGluZShyZWYpO1xuICBub2RlLmlzUmVjdXJzaXZlID0gdHJ1ZTtcbiAgcmV0dXJuIG5vZGU7XG59XG5mdW5jdGlvbiBnZXRBbGxQYXJlbnRzKG5vZGUsIGZpbHRlckZuKSB7XG4gIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgd2hpbGUgKG5vZGUgPSBub2RlLnBhcmVudCkge1xuICAgIGlmICghZmlsdGVyRm4gfHwgZmlsdGVyRm4obm9kZSkpIHtcbiAgICAgIHJlc3VsdHMucHVzaChub2RlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5mdW5jdGlvbiBnZXRBbmRTdG9yZUpzR3JvdXBOYW1lKG5hbWUsIG1hcCkge1xuICBpZiAobWFwLmhhcyhuYW1lKSkge1xuICAgIHJldHVybiBtYXAuZ2V0KG5hbWUpO1xuICB9XG4gIGNvbnN0IGpzTmFtZSA9IGAkJHttYXAuc2l6ZX1fJHtuYW1lLnJlcGxhY2UoL15bXiRfXFxwe0lEU31dfFteJFxcdTIwMENcXHUyMDBEXFxwe0lEQ31dL3VnLCBcIl9cIil9YDtcbiAgbWFwLnNldChuYW1lLCBqc05hbWUpO1xuICByZXR1cm4ganNOYW1lO1xufVxuZnVuY3Rpb24gZ2V0Q29tYmluZWRGbGFnTW9kc0Zyb21GbGFnTm9kZXMoZmxhZ05vZGVzKSB7XG4gIGNvbnN0IGZsYWdQcm9wcyA9IFtcImRvdEFsbFwiLCBcImlnbm9yZUNhc2VcIl07XG4gIGNvbnN0IGNvbWJpbmVkRmxhZ3MgPSB7IGVuYWJsZToge30sIGRpc2FibGU6IHt9IH07XG4gIGZsYWdOb2Rlcy5mb3JFYWNoKCh7IGZsYWdzIH0pID0+IHtcbiAgICBmbGFnUHJvcHMuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgaWYgKGZsYWdzLmVuYWJsZT8uW3Byb3BdKSB7XG4gICAgICAgIGRlbGV0ZSBjb21iaW5lZEZsYWdzLmRpc2FibGVbcHJvcF07XG4gICAgICAgIGNvbWJpbmVkRmxhZ3MuZW5hYmxlW3Byb3BdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChmbGFncy5kaXNhYmxlPy5bcHJvcF0pIHtcbiAgICAgICAgY29tYmluZWRGbGFncy5kaXNhYmxlW3Byb3BdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIGlmICghT2JqZWN0LmtleXMoY29tYmluZWRGbGFncy5lbmFibGUpLmxlbmd0aCkge1xuICAgIGRlbGV0ZSBjb21iaW5lZEZsYWdzLmVuYWJsZTtcbiAgfVxuICBpZiAoIU9iamVjdC5rZXlzKGNvbWJpbmVkRmxhZ3MuZGlzYWJsZSkubGVuZ3RoKSB7XG4gICAgZGVsZXRlIGNvbWJpbmVkRmxhZ3MuZGlzYWJsZTtcbiAgfVxuICBpZiAoY29tYmluZWRGbGFncy5lbmFibGUgfHwgY29tYmluZWRGbGFncy5kaXNhYmxlKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVkRmxhZ3M7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5mdW5jdGlvbiBnZXRGbGFnTW9kc0Zyb21GbGFncyh7IGRvdEFsbCwgaWdub3JlQ2FzZSB9KSB7XG4gIGNvbnN0IG1vZHMgPSB7fTtcbiAgaWYgKGRvdEFsbCB8fCBpZ25vcmVDYXNlKSB7XG4gICAgbW9kcy5lbmFibGUgPSB7fTtcbiAgICBkb3RBbGwgJiYgKG1vZHMuZW5hYmxlLmRvdEFsbCA9IHRydWUpO1xuICAgIGlnbm9yZUNhc2UgJiYgKG1vZHMuZW5hYmxlLmlnbm9yZUNhc2UgPSB0cnVlKTtcbiAgfVxuICBpZiAoIWRvdEFsbCB8fCAhaWdub3JlQ2FzZSkge1xuICAgIG1vZHMuZGlzYWJsZSA9IHt9O1xuICAgICFkb3RBbGwgJiYgKG1vZHMuZGlzYWJsZS5kb3RBbGwgPSB0cnVlKTtcbiAgICAhaWdub3JlQ2FzZSAmJiAobW9kcy5kaXNhYmxlLmlnbm9yZUNhc2UgPSB0cnVlKTtcbiAgfVxuICByZXR1cm4gbW9kcztcbn1cbmZ1bmN0aW9uIGdldEtpZHMobm9kZSkge1xuICBpZiAoIW5vZGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb2RlIGV4cGVjdGVkXCIpO1xuICB9XG4gIGNvbnN0IHsgYm9keSB9ID0gbm9kZTtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYm9keSkgPyBib2R5IDogYm9keSA/IFtib2R5XSA6IG51bGw7XG59XG5mdW5jdGlvbiBnZXRMZWFkaW5nRyhlbHMpIHtcbiAgY29uc3QgZmlyc3RUb0NvbnNpZGVyID0gZWxzLmZpbmQoKGVsKSA9PiBlbC5raW5kID09PSBcInNlYXJjaF9zdGFydFwiIHx8IGlzTG9uZUdMb29rYXJvdW5kKGVsLCB7IG5lZ2F0ZTogZmFsc2UgfSkgfHwgIWlzQWx3YXlzWmVyb0xlbmd0aChlbCkpO1xuICBpZiAoIWZpcnN0VG9Db25zaWRlcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmIChmaXJzdFRvQ29uc2lkZXIua2luZCA9PT0gXCJzZWFyY2hfc3RhcnRcIikge1xuICAgIHJldHVybiBmaXJzdFRvQ29uc2lkZXI7XG4gIH1cbiAgaWYgKGZpcnN0VG9Db25zaWRlci50eXBlID09PSBcIkxvb2thcm91bmRBc3NlcnRpb25cIikge1xuICAgIHJldHVybiBmaXJzdFRvQ29uc2lkZXIuYm9keVswXS5ib2R5WzBdO1xuICB9XG4gIGlmIChmaXJzdFRvQ29uc2lkZXIudHlwZSA9PT0gXCJDYXB0dXJpbmdHcm91cFwiIHx8IGZpcnN0VG9Db25zaWRlci50eXBlID09PSBcIkdyb3VwXCIpIHtcbiAgICBjb25zdCBnTm9kZXNGb3JHcm91cCA9IFtdO1xuICAgIGZvciAoY29uc3QgYWx0IG9mIGZpcnN0VG9Db25zaWRlci5ib2R5KSB7XG4gICAgICBjb25zdCBsZWFkaW5nRyA9IGdldExlYWRpbmdHKGFsdC5ib2R5KTtcbiAgICAgIGlmICghbGVhZGluZ0cpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBBcnJheS5pc0FycmF5KGxlYWRpbmdHKSA/IGdOb2Rlc0Zvckdyb3VwLnB1c2goLi4ubGVhZGluZ0cpIDogZ05vZGVzRm9yR3JvdXAucHVzaChsZWFkaW5nRyk7XG4gICAgfVxuICAgIHJldHVybiBnTm9kZXNGb3JHcm91cDtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIGlzQW5jZXN0b3JPZihub2RlLCBkZXNjZW5kYW50KSB7XG4gIGNvbnN0IGtpZHMgPSBnZXRLaWRzKG5vZGUpID8/IFtdO1xuICBmb3IgKGNvbnN0IGtpZCBvZiBraWRzKSB7XG4gICAgaWYgKGtpZCA9PT0gZGVzY2VuZGFudCB8fCBpc0FuY2VzdG9yT2Yoa2lkLCBkZXNjZW5kYW50KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGlzQWx3YXlzWmVyb0xlbmd0aCh7IHR5cGUgfSkge1xuICByZXR1cm4gdHlwZSA9PT0gXCJBc3NlcnRpb25cIiB8fCB0eXBlID09PSBcIkRpcmVjdGl2ZVwiIHx8IHR5cGUgPT09IFwiTG9va2Fyb3VuZEFzc2VydGlvblwiO1xufVxuZnVuY3Rpb24gaXNBbHdheXNOb25aZXJvTGVuZ3RoKG5vZGUpIHtcbiAgY29uc3QgdHlwZXMgPSBbXG4gICAgXCJDaGFyYWN0ZXJcIixcbiAgICBcIkNoYXJhY3RlckNsYXNzXCIsXG4gICAgXCJDaGFyYWN0ZXJTZXRcIlxuICBdO1xuICByZXR1cm4gdHlwZXMuaW5jbHVkZXMobm9kZS50eXBlKSB8fCBub2RlLnR5cGUgPT09IFwiUXVhbnRpZmllclwiICYmIG5vZGUubWluICYmIHR5cGVzLmluY2x1ZGVzKG5vZGUuYm9keS50eXBlKTtcbn1cbmZ1bmN0aW9uIGlzTG9uZUdMb29rYXJvdW5kKG5vZGUsIG9wdGlvbnMpIHtcbiAgY29uc3Qgb3B0cyA9IHtcbiAgICBuZWdhdGU6IG51bGwsXG4gICAgLi4ub3B0aW9uc1xuICB9O1xuICByZXR1cm4gbm9kZS50eXBlID09PSBcIkxvb2thcm91bmRBc3NlcnRpb25cIiAmJiAob3B0cy5uZWdhdGUgPT09IG51bGwgfHwgbm9kZS5uZWdhdGUgPT09IG9wdHMubmVnYXRlKSAmJiBub2RlLmJvZHkubGVuZ3RoID09PSAxICYmIGhhc09ubHlDaGlsZChub2RlLmJvZHlbMF0sIHtcbiAgICB0eXBlOiBcIkFzc2VydGlvblwiLFxuICAgIGtpbmQ6IFwic2VhcmNoX3N0YXJ0XCJcbiAgfSk7XG59XG5mdW5jdGlvbiBpc1ZhbGlkSnNHcm91cE5hbWUobmFtZSkge1xuICByZXR1cm4gL15bJF9cXHB7SURTfV1bJFxcdTIwMENcXHUyMDBEXFxwe0lEQ31dKiQvdS50ZXN0KG5hbWUpO1xufVxuZnVuY3Rpb24gcGFyc2VGcmFnbWVudChwYXR0ZXJuLCBvcHRpb25zKSB7XG4gIGNvbnN0IGFzdCA9IHBhcnNlKHBhdHRlcm4sIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIC8vIFByb3ZpZGluZyBhIGN1c3RvbSBzZXQgb2YgVW5pY29kZSBwcm9wZXJ0eSBuYW1lcyBhdm9pZHMgY29udmVydGluZyBzb21lIEpTIFVuaWNvZGVcbiAgICAvLyBwcm9wZXJ0aWVzIChleDogYFxccHtBbHBoYX1gKSB0byBPbmlnIFBPU0lYIGNsYXNzZXNcbiAgICB1bmljb2RlUHJvcGVydHlNYXA6IEpzVW5pY29kZVByb3BlcnR5TWFwXG4gIH0pO1xuICBjb25zdCBhbHRzID0gYXN0LmJvZHk7XG4gIGlmIChhbHRzLmxlbmd0aCA+IDEgfHwgYWx0c1swXS5ib2R5Lmxlbmd0aCA+IDEpIHtcbiAgICByZXR1cm4gY3JlYXRlR3JvdXAoeyBib2R5OiBhbHRzIH0pO1xuICB9XG4gIHJldHVybiBhbHRzWzBdLmJvZHlbMF07XG59XG5mdW5jdGlvbiBzZXROZWdhdGUobm9kZSwgbmVnYXRlKSB7XG4gIG5vZGUubmVnYXRlID0gbmVnYXRlO1xuICByZXR1cm4gbm9kZTtcbn1cbmZ1bmN0aW9uIHNldFBhcmVudChub2RlLCBwYXJlbnQpIHtcbiAgbm9kZS5wYXJlbnQgPSBwYXJlbnQ7XG4gIHJldHVybiBub2RlO1xufVxuZnVuY3Rpb24gc2V0UGFyZW50RGVlcChub2RlLCBwYXJlbnQpIHtcbiAgYWRkUGFyZW50UHJvcGVydGllcyhub2RlKTtcbiAgbm9kZS5wYXJlbnQgPSBwYXJlbnQ7XG4gIHJldHVybiBub2RlO1xufVxuXG4vLyBzcmMvZ2VuZXJhdGUuanNcbmltcG9ydCB7IGNyZWF0ZUFsdGVybmF0aXZlIGFzIGNyZWF0ZUFsdGVybmF0aXZlMiwgY3JlYXRlQ2hhcmFjdGVyIGFzIGNyZWF0ZUNoYXJhY3RlcjIsIGNyZWF0ZUdyb3VwIGFzIGNyZWF0ZUdyb3VwMiB9IGZyb20gXCJvbmlndXJ1bWEtcGFyc2VyL3BhcnNlclwiO1xuaW1wb3J0IHsgdHJhdmVyc2UgYXMgdHJhdmVyc2UyIH0gZnJvbSBcIm9uaWd1cnVtYS1wYXJzZXIvdHJhdmVyc2VyXCI7XG5mdW5jdGlvbiBnZW5lcmF0ZShhc3QsIG9wdGlvbnMpIHtcbiAgY29uc3Qgb3B0cyA9IGdldE9wdGlvbnMob3B0aW9ucyk7XG4gIGNvbnN0IG1pblRhcmdldEVzMjAyNCA9IGlzTWluVGFyZ2V0KG9wdHMudGFyZ2V0LCBcIkVTMjAyNFwiKTtcbiAgY29uc3QgbWluVGFyZ2V0RXMyMDI1ID0gaXNNaW5UYXJnZXQob3B0cy50YXJnZXQsIFwiRVMyMDI1XCIpO1xuICBjb25zdCByZWN1cnNpb25MaW1pdCA9IG9wdHMucnVsZXMucmVjdXJzaW9uTGltaXQ7XG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihyZWN1cnNpb25MaW1pdCkgfHwgcmVjdXJzaW9uTGltaXQgPCAyIHx8IHJlY3Vyc2lvbkxpbWl0ID4gMjApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHJlY3Vyc2lvbkxpbWl0OyB1c2UgMi0yMFwiKTtcbiAgfVxuICBsZXQgaGFzQ2FzZUluc2Vuc2l0aXZlTm9kZSA9IG51bGw7XG4gIGxldCBoYXNDYXNlU2Vuc2l0aXZlTm9kZSA9IG51bGw7XG4gIGlmICghbWluVGFyZ2V0RXMyMDI1KSB7XG4gICAgY29uc3QgaVN0YWNrID0gW2FzdC5mbGFncy5pZ25vcmVDYXNlXTtcbiAgICB0cmF2ZXJzZTIoYXN0LCBGbGFnTW9kaWZpZXJWaXNpdG9yLCB7XG4gICAgICBnZXRDdXJyZW50TW9kSTogKCkgPT4gaVN0YWNrLmF0KC0xKSxcbiAgICAgIHBvcE1vZEkoKSB7XG4gICAgICAgIGlTdGFjay5wb3AoKTtcbiAgICAgIH0sXG4gICAgICBwdXNoTW9kSShpc0lPbikge1xuICAgICAgICBpU3RhY2sucHVzaChpc0lPbik7XG4gICAgICB9LFxuICAgICAgc2V0SGFzQ2FzZWRDaGFyKCkge1xuICAgICAgICBpZiAoaVN0YWNrLmF0KC0xKSkge1xuICAgICAgICAgIGhhc0Nhc2VJbnNlbnNpdGl2ZU5vZGUgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhhc0Nhc2VTZW5zaXRpdmVOb2RlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGNvbnN0IGFwcGxpZWRHbG9iYWxGbGFncyA9IHtcbiAgICBkb3RBbGw6IGFzdC5mbGFncy5kb3RBbGwsXG4gICAgLy8gLSBUdXJuIGdsb2JhbCBmbGFnIGkgb24gaWYgYSBjYXNlIGluc2Vuc2l0aXZlIG5vZGUgd2FzIHVzZWQgYW5kIG5vIGNhc2Ugc2Vuc2l0aXZlIG5vZGVzIHdlcmVcbiAgICAvLyAgIHVzZWQgKHRvIGF2b2lkIHVubmVjZXNzYXJ5IG5vZGUgZXhwYW5zaW9uKS5cbiAgICAvLyAtIFR1cm4gZ2xvYmFsIGZsYWcgaSBvZmYgaWYgYSBjYXNlIHNlbnNpdGl2ZSBub2RlIHdhcyB1c2VkIChzaW5jZSBjYXNlIHNlbnNpdGl2aXR5IGNhbid0IGJlXG4gICAgLy8gICBmb3JjZWQgd2l0aG91dCB0aGUgdXNlIG9mIEVTMjAyNSBmbGFnIGdyb3VwcylcbiAgICBpZ25vcmVDYXNlOiAhISgoYXN0LmZsYWdzLmlnbm9yZUNhc2UgfHwgaGFzQ2FzZUluc2Vuc2l0aXZlTm9kZSkgJiYgIWhhc0Nhc2VTZW5zaXRpdmVOb2RlKVxuICB9O1xuICBsZXQgbGFzdE5vZGUgPSBhc3Q7XG4gIGNvbnN0IHN0YXRlID0ge1xuICAgIGFjY3VyYWN5OiBvcHRzLmFjY3VyYWN5LFxuICAgIGFwcGxpZWRHbG9iYWxGbGFncyxcbiAgICBjYXB0dXJlTWFwOiAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpLFxuICAgIGN1cnJlbnRGbGFnczoge1xuICAgICAgZG90QWxsOiBhc3QuZmxhZ3MuZG90QWxsLFxuICAgICAgaWdub3JlQ2FzZTogYXN0LmZsYWdzLmlnbm9yZUNhc2VcbiAgICB9LFxuICAgIGluQ2hhckNsYXNzOiBmYWxzZSxcbiAgICBsYXN0Tm9kZSxcbiAgICBvcmlnaW5NYXA6IGFzdC5fb3JpZ2luTWFwLFxuICAgIHJlY3Vyc2lvbkxpbWl0LFxuICAgIHVzZUFwcGxpZWRJZ25vcmVDYXNlOiAhISghbWluVGFyZ2V0RXMyMDI1ICYmIGhhc0Nhc2VJbnNlbnNpdGl2ZU5vZGUgJiYgaGFzQ2FzZVNlbnNpdGl2ZU5vZGUpLFxuICAgIHVzZUZsYWdNb2RzOiBtaW5UYXJnZXRFczIwMjUsXG4gICAgdXNlRmxhZ1Y6IG1pblRhcmdldEVzMjAyNCxcbiAgICB2ZXJib3NlOiBvcHRzLnZlcmJvc2VcbiAgfTtcbiAgZnVuY3Rpb24gZ2VuKG5vZGUpIHtcbiAgICBzdGF0ZS5sYXN0Tm9kZSA9IGxhc3ROb2RlO1xuICAgIGxhc3ROb2RlID0gbm9kZTtcbiAgICBjb25zdCBmbiA9IHRocm93SWZOdWxsaXNoKGdlbmVyYXRvcltub2RlLnR5cGVdLCBgVW5leHBlY3RlZCBub2RlIHR5cGUgXCIke25vZGUudHlwZX1cImApO1xuICAgIHJldHVybiBmbihub2RlLCBzdGF0ZSwgZ2VuKTtcbiAgfVxuICBjb25zdCByZXN1bHQgPSB7XG4gICAgcGF0dGVybjogYXN0LmJvZHkubWFwKGdlbikuam9pbihcInxcIiksXG4gICAgLy8gQ291bGQgcmVzZXQgYGxhc3ROb2RlYCBhdCB0aGlzIHBvaW50IHZpYSBgbGFzdE5vZGUgPSBhc3RgLCBidXQgaXQgaXNuJ3QgbmVlZGVkIGJ5IGZsYWdzXG4gICAgZmxhZ3M6IGdlbihhc3QuZmxhZ3MpLFxuICAgIG9wdGlvbnM6IHsgLi4uYXN0Lm9wdGlvbnMgfVxuICB9O1xuICBpZiAoIW1pblRhcmdldEVzMjAyNCkge1xuICAgIGRlbGV0ZSByZXN1bHQub3B0aW9ucy5mb3JjZS52O1xuICAgIHJlc3VsdC5vcHRpb25zLmRpc2FibGUudiA9IHRydWU7XG4gICAgcmVzdWx0Lm9wdGlvbnMudW5pY29kZVNldHNQbHVnaW4gPSBudWxsO1xuICB9XG4gIHJlc3VsdC5fY2FwdHVyZVRyYW5zZmVycyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gIHJlc3VsdC5faGlkZGVuQ2FwdHVyZXMgPSBbXTtcbiAgc3RhdGUuY2FwdHVyZU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgaWYgKHZhbHVlLmhpZGRlbikge1xuICAgICAgcmVzdWx0Ll9oaWRkZW5DYXB0dXJlcy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGlmICh2YWx1ZS50cmFuc2ZlclRvKSB7XG4gICAgICBnZXRPckluc2VydChyZXN1bHQuX2NhcHR1cmVUcmFuc2ZlcnMsIHZhbHVlLnRyYW5zZmVyVG8sIFtdKS5wdXNoKGtleSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbnZhciBGbGFnTW9kaWZpZXJWaXNpdG9yID0ge1xuICBcIipcIjoge1xuICAgIGVudGVyKHsgbm9kZSB9LCBzdGF0ZSkge1xuICAgICAgaWYgKGlzQW55R3JvdXAobm9kZSkpIHtcbiAgICAgICAgY29uc3QgY3VycmVudE1vZEkgPSBzdGF0ZS5nZXRDdXJyZW50TW9kSSgpO1xuICAgICAgICBzdGF0ZS5wdXNoTW9kSShcbiAgICAgICAgICBub2RlLmZsYWdzID8gZ2V0TmV3Q3VycmVudEZsYWdzKHsgaWdub3JlQ2FzZTogY3VycmVudE1vZEkgfSwgbm9kZS5mbGFncykuaWdub3JlQ2FzZSA6IGN1cnJlbnRNb2RJXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSxcbiAgICBleGl0KHsgbm9kZSB9LCBzdGF0ZSkge1xuICAgICAgaWYgKGlzQW55R3JvdXAobm9kZSkpIHtcbiAgICAgICAgc3RhdGUucG9wTW9kSSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgQmFja3JlZmVyZW5jZShfLCBzdGF0ZSkge1xuICAgIHN0YXRlLnNldEhhc0Nhc2VkQ2hhcigpO1xuICB9LFxuICBDaGFyYWN0ZXIoeyBub2RlIH0sIHN0YXRlKSB7XG4gICAgaWYgKGNoYXJIYXNDYXNlKGNwKG5vZGUudmFsdWUpKSkge1xuICAgICAgc3RhdGUuc2V0SGFzQ2FzZWRDaGFyKCk7XG4gICAgfVxuICB9LFxuICBDaGFyYWN0ZXJDbGFzc1JhbmdlKHsgbm9kZSwgc2tpcCB9LCBzdGF0ZSkge1xuICAgIHNraXAoKTtcbiAgICBpZiAoZ2V0Q2FzZXNPdXRzaWRlQ2hhckNsYXNzUmFuZ2Uobm9kZSwgeyBmaXJzdE9ubHk6IHRydWUgfSkubGVuZ3RoKSB7XG4gICAgICBzdGF0ZS5zZXRIYXNDYXNlZENoYXIoKTtcbiAgICB9XG4gIH0sXG4gIENoYXJhY3RlclNldCh7IG5vZGUgfSwgc3RhdGUpIHtcbiAgICBpZiAobm9kZS5raW5kID09PSBcInByb3BlcnR5XCIgJiYgVW5pY29kZVByb3BlcnRpZXNXaXRoU3BlY2lmaWNDYXNlLmhhcyhub2RlLnZhbHVlKSkge1xuICAgICAgc3RhdGUuc2V0SGFzQ2FzZWRDaGFyKCk7XG4gICAgfVxuICB9XG59O1xudmFyIGdlbmVyYXRvciA9IHtcbiAgLyoqXG4gIEBwYXJhbSB7QWx0ZXJuYXRpdmVOb2RlfSBub2RlXG4gICovXG4gIEFsdGVybmF0aXZlKHsgYm9keSB9LCBfLCBnZW4pIHtcbiAgICByZXR1cm4gYm9keS5tYXAoZ2VuKS5qb2luKFwiXCIpO1xuICB9LFxuICAvKipcbiAgQHBhcmFtIHtBc3NlcnRpb25Ob2RlfSBub2RlXG4gICovXG4gIEFzc2VydGlvbih7IGtpbmQsIG5lZ2F0ZSB9KSB7XG4gICAgaWYgKGtpbmQgPT09IFwic3RyaW5nX2VuZFwiKSB7XG4gICAgICByZXR1cm4gXCIkXCI7XG4gICAgfVxuICAgIGlmIChraW5kID09PSBcInN0cmluZ19zdGFydFwiKSB7XG4gICAgICByZXR1cm4gXCJeXCI7XG4gICAgfVxuICAgIGlmIChraW5kID09PSBcIndvcmRfYm91bmRhcnlcIikge1xuICAgICAgcmV0dXJuIG5lZ2F0ZSA/IHJgXFxCYCA6IHJgXFxiYDtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIGFzc2VydGlvbiBraW5kIFwiJHtraW5kfVwiYCk7XG4gIH0sXG4gIC8qKlxuICBAcGFyYW0ge0JhY2tyZWZlcmVuY2VOb2RlfSBub2RlXG4gICovXG4gIEJhY2tyZWZlcmVuY2UoeyByZWYgfSwgc3RhdGUpIHtcbiAgICBpZiAodHlwZW9mIHJlZiAhPT0gXCJudW1iZXJcIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBuYW1lZCBiYWNrcmVmIGluIHRyYW5zZm9ybWVkIEFTVFwiKTtcbiAgICB9XG4gICAgaWYgKCFzdGF0ZS51c2VGbGFnTW9kcyAmJiBzdGF0ZS5hY2N1cmFjeSA9PT0gXCJzdHJpY3RcIiAmJiBzdGF0ZS5jdXJyZW50RmxhZ3MuaWdub3JlQ2FzZSAmJiAhc3RhdGUuY2FwdHVyZU1hcC5nZXQocmVmKS5pZ25vcmVDYXNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVc2Ugb2YgY2FzZS1pbnNlbnNpdGl2ZSBiYWNrcmVmIHRvIGNhc2Utc2Vuc2l0aXZlIGdyb3VwIHJlcXVpcmVzIHRhcmdldCBFUzIwMjUgb3Igbm9uLXN0cmljdCBhY2N1cmFjeVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIFwiXFxcXFwiICsgcmVmO1xuICB9LFxuICAvKipcbiAgQHBhcmFtIHtDYXB0dXJpbmdHcm91cE5vZGV9IG5vZGVcbiAgKi9cbiAgQ2FwdHVyaW5nR3JvdXAobm9kZSwgc3RhdGUsIGdlbikge1xuICAgIGNvbnN0IHsgYm9keSwgbmFtZSwgbnVtYmVyIH0gPSBub2RlO1xuICAgIGNvbnN0IGRhdGEgPSB7IGlnbm9yZUNhc2U6IHN0YXRlLmN1cnJlbnRGbGFncy5pZ25vcmVDYXNlIH07XG4gICAgY29uc3Qgb3JpZ2luID0gc3RhdGUub3JpZ2luTWFwLmdldChub2RlKTtcbiAgICBpZiAob3JpZ2luKSB7XG4gICAgICBkYXRhLmhpZGRlbiA9IHRydWU7XG4gICAgICBpZiAobnVtYmVyID4gb3JpZ2luLm51bWJlcikge1xuICAgICAgICBkYXRhLnRyYW5zZmVyVG8gPSBvcmlnaW4ubnVtYmVyO1xuICAgICAgfVxuICAgIH1cbiAgICBzdGF0ZS5jYXB0dXJlTWFwLnNldChudW1iZXIsIGRhdGEpO1xuICAgIHJldHVybiBgKCR7bmFtZSA/IGA/PCR7bmFtZX0+YCA6IFwiXCJ9JHtib2R5Lm1hcChnZW4pLmpvaW4oXCJ8XCIpfSlgO1xuICB9LFxuICAvKipcbiAgQHBhcmFtIHtDaGFyYWN0ZXJOb2RlfSBub2RlXG4gICovXG4gIENoYXJhY3Rlcih7IHZhbHVlIH0sIHN0YXRlKSB7XG4gICAgY29uc3QgY2hhciA9IGNwKHZhbHVlKTtcbiAgICBjb25zdCBlc2NhcGVkID0gZ2V0Q2hhckVzY2FwZSh2YWx1ZSwge1xuICAgICAgZXNjRGlnaXQ6IHN0YXRlLmxhc3ROb2RlLnR5cGUgPT09IFwiQmFja3JlZmVyZW5jZVwiLFxuICAgICAgaW5DaGFyQ2xhc3M6IHN0YXRlLmluQ2hhckNsYXNzLFxuICAgICAgdXNlRmxhZ1Y6IHN0YXRlLnVzZUZsYWdWXG4gICAgfSk7XG4gICAgaWYgKGVzY2FwZWQgIT09IGNoYXIpIHtcbiAgICAgIHJldHVybiBlc2NhcGVkO1xuICAgIH1cbiAgICBpZiAoc3RhdGUudXNlQXBwbGllZElnbm9yZUNhc2UgJiYgc3RhdGUuY3VycmVudEZsYWdzLmlnbm9yZUNhc2UgJiYgY2hhckhhc0Nhc2UoY2hhcikpIHtcbiAgICAgIGNvbnN0IGNhc2VzID0gZ2V0SWdub3JlQ2FzZU1hdGNoQ2hhcnMoY2hhcik7XG4gICAgICByZXR1cm4gc3RhdGUuaW5DaGFyQ2xhc3MgPyBjYXNlcy5qb2luKFwiXCIpIDogY2FzZXMubGVuZ3RoID4gMSA/IGBbJHtjYXNlcy5qb2luKFwiXCIpfV1gIDogY2FzZXNbMF07XG4gICAgfVxuICAgIHJldHVybiBjaGFyO1xuICB9LFxuICAvKipcbiAgQHBhcmFtIHtDaGFyYWN0ZXJDbGFzc05vZGV9IG5vZGVcbiAgKi9cbiAgQ2hhcmFjdGVyQ2xhc3Mobm9kZSwgc3RhdGUsIGdlbikge1xuICAgIGNvbnN0IHsga2luZCwgbmVnYXRlLCBwYXJlbnQgfSA9IG5vZGU7XG4gICAgbGV0IHsgYm9keSB9ID0gbm9kZTtcbiAgICBpZiAoa2luZCA9PT0gXCJpbnRlcnNlY3Rpb25cIiAmJiAhc3RhdGUudXNlRmxhZ1YpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVzZSBvZiBjaGFyYWN0ZXIgY2xhc3MgaW50ZXJzZWN0aW9uIHJlcXVpcmVzIG1pbiB0YXJnZXQgRVMyMDI0XCIpO1xuICAgIH1cbiAgICBpZiAoZW52RmxhZ3MuYnVnRmxhZ1ZMaXRlcmFsSHlwaGVuSXNSYW5nZSAmJiBzdGF0ZS51c2VGbGFnViAmJiBib2R5LnNvbWUoaXNMaXRlcmFsSHlwaGVuKSkge1xuICAgICAgYm9keSA9IFtjcmVhdGVDaGFyYWN0ZXIyKDQ1KSwgLi4uYm9keS5maWx0ZXIoKGtpZCkgPT4gIWlzTGl0ZXJhbEh5cGhlbihraWQpKV07XG4gICAgfVxuICAgIGNvbnN0IGdlbkNsYXNzID0gKCkgPT4gYFske25lZ2F0ZSA/IFwiXlwiIDogXCJcIn0ke2JvZHkubWFwKGdlbikuam9pbihraW5kID09PSBcImludGVyc2VjdGlvblwiID8gXCImJlwiIDogXCJcIil9XWA7XG4gICAgaWYgKCFzdGF0ZS5pbkNoYXJDbGFzcykge1xuICAgICAgaWYgKFxuICAgICAgICAvLyBBbHJlYWR5IGVzdGFibGlzaGVkIGBraW5kICE9PSAnaW50ZXJzZWN0aW9uJ2AgaWYgYCFzdGF0ZS51c2VGbGFnVmA7IGRvbid0IGNoZWNrIGFnYWluXG4gICAgICAgICghc3RhdGUudXNlRmxhZ1YgfHwgZW52RmxhZ3MuYnVnTmVzdGVkQ2xhc3NJZ25vcmVzTmVnYXRpb24pICYmICFuZWdhdGVcbiAgICAgICkge1xuICAgICAgICBjb25zdCBuZWdhdGVkQ2hpbGRDbGFzc2VzID0gYm9keS5maWx0ZXIoXG4gICAgICAgICAgKGtpZCkgPT4ga2lkLnR5cGUgPT09IFwiQ2hhcmFjdGVyQ2xhc3NcIiAmJiBraWQua2luZCA9PT0gXCJ1bmlvblwiICYmIGtpZC5uZWdhdGVcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG5lZ2F0ZWRDaGlsZENsYXNzZXMubGVuZ3RoKSB7XG4gICAgICAgICAgY29uc3QgZ3JvdXAgPSBjcmVhdGVHcm91cDIoKTtcbiAgICAgICAgICBjb25zdCBncm91cEZpcnN0QWx0ID0gZ3JvdXAuYm9keVswXTtcbiAgICAgICAgICBncm91cC5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgICAgZ3JvdXBGaXJzdEFsdC5wYXJlbnQgPSBncm91cDtcbiAgICAgICAgICBib2R5ID0gYm9keS5maWx0ZXIoKGtpZCkgPT4gIW5lZ2F0ZWRDaGlsZENsYXNzZXMuaW5jbHVkZXMoa2lkKSk7XG4gICAgICAgICAgbm9kZS5ib2R5ID0gYm9keTtcbiAgICAgICAgICBpZiAoYm9keS5sZW5ndGgpIHtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gZ3JvdXBGaXJzdEFsdDtcbiAgICAgICAgICAgIGdyb3VwRmlyc3RBbHQuYm9keS5wdXNoKG5vZGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBncm91cC5ib2R5LnBvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBuZWdhdGVkQ2hpbGRDbGFzc2VzLmZvckVhY2goKGNjKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdBbHQgPSBjcmVhdGVBbHRlcm5hdGl2ZTIoeyBib2R5OiBbY2NdIH0pO1xuICAgICAgICAgICAgY2MucGFyZW50ID0gbmV3QWx0O1xuICAgICAgICAgICAgbmV3QWx0LnBhcmVudCA9IGdyb3VwO1xuICAgICAgICAgICAgZ3JvdXAuYm9keS5wdXNoKG5ld0FsdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGdlbihncm91cCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHN0YXRlLmluQ2hhckNsYXNzID0gdHJ1ZTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGdlbkNsYXNzKCk7XG4gICAgICBzdGF0ZS5pbkNoYXJDbGFzcyA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgY29uc3QgZmlyc3RFbCA9IGJvZHlbMF07XG4gICAgaWYgKFxuICAgICAgLy8gQWxyZWFkeSBlc3RhYmxpc2hlZCB0aGF0IHRoZSBwYXJlbnQgaXMgYSBjaGFyIGNsYXNzIHZpYSBgaW5DaGFyQ2xhc3NgOyBkb24ndCBjaGVjayBhZ2FpblxuICAgICAga2luZCA9PT0gXCJ1bmlvblwiICYmICFuZWdhdGUgJiYgZmlyc3RFbCAmJiAvLyBBbGxvd3MgbWFueSBuZXN0ZWQgY2xhc3NlcyB0byB3b3JrIHdpdGggYHRhcmdldGAgRVMyMDE4IHdoaWNoIGRvZXNuJ3Qgc3VwcG9ydCBuZXN0aW5nXG4gICAgICAoKCFzdGF0ZS51c2VGbGFnViB8fCAhc3RhdGUudmVyYm9zZSkgJiYgcGFyZW50LmtpbmQgPT09IFwidW5pb25cIiAmJiAhKGVudkZsYWdzLmJ1Z0ZsYWdWTGl0ZXJhbEh5cGhlbklzUmFuZ2UgJiYgc3RhdGUudXNlRmxhZ1YpIHx8ICFzdGF0ZS52ZXJib3NlICYmIHBhcmVudC5raW5kID09PSBcImludGVyc2VjdGlvblwiICYmIC8vIEpTIGRvZXNuJ3QgYWxsb3cgaW50ZXJzZWN0aW9uIHdpdGggdW5pb24gb3IgcmFuZ2VzXG4gICAgICBib2R5Lmxlbmd0aCA9PT0gMSAmJiBmaXJzdEVsLnR5cGUgIT09IFwiQ2hhcmFjdGVyQ2xhc3NSYW5nZVwiKVxuICAgICkge1xuICAgICAgcmV0dXJuIGJvZHkubWFwKGdlbikuam9pbihcIlwiKTtcbiAgICB9XG4gICAgaWYgKCFzdGF0ZS51c2VGbGFnViAmJiBwYXJlbnQudHlwZSA9PT0gXCJDaGFyYWN0ZXJDbGFzc1wiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVc2VzIG5lc3RlZCBjaGFyYWN0ZXIgY2xhc3MgaW4gYSB3YXkgdGhhdCByZXF1aXJlcyBtaW4gdGFyZ2V0IEVTMjAyNFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIGdlbkNsYXNzKCk7XG4gIH0sXG4gIC8qKlxuICBAcGFyYW0ge0NoYXJhY3RlckNsYXNzUmFuZ2VOb2RlfSBub2RlXG4gICovXG4gIENoYXJhY3RlckNsYXNzUmFuZ2Uobm9kZSwgc3RhdGUpIHtcbiAgICBjb25zdCBtaW4gPSBub2RlLm1pbi52YWx1ZTtcbiAgICBjb25zdCBtYXggPSBub2RlLm1heC52YWx1ZTtcbiAgICBjb25zdCBlc2NPcHRzID0ge1xuICAgICAgZXNjRGlnaXQ6IGZhbHNlLFxuICAgICAgaW5DaGFyQ2xhc3M6IHRydWUsXG4gICAgICB1c2VGbGFnVjogc3RhdGUudXNlRmxhZ1ZcbiAgICB9O1xuICAgIGNvbnN0IG1pblN0ciA9IGdldENoYXJFc2NhcGUobWluLCBlc2NPcHRzKTtcbiAgICBjb25zdCBtYXhTdHIgPSBnZXRDaGFyRXNjYXBlKG1heCwgZXNjT3B0cyk7XG4gICAgY29uc3QgZXh0cmFDaGFycyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KCk7XG4gICAgaWYgKHN0YXRlLnVzZUFwcGxpZWRJZ25vcmVDYXNlICYmIHN0YXRlLmN1cnJlbnRGbGFncy5pZ25vcmVDYXNlKSB7XG4gICAgICBjb25zdCBjaGFyc091dHNpZGVSYW5nZSA9IGdldENhc2VzT3V0c2lkZUNoYXJDbGFzc1JhbmdlKG5vZGUpO1xuICAgICAgY29uc3QgcmFuZ2VzID0gZ2V0Q29kZVBvaW50UmFuZ2VzRnJvbUNoYXJzKGNoYXJzT3V0c2lkZVJhbmdlKTtcbiAgICAgIHJhbmdlcy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICBleHRyYUNoYXJzLmFkZChcbiAgICAgICAgICBBcnJheS5pc0FycmF5KHZhbHVlKSA/IGAke2dldENoYXJFc2NhcGUodmFsdWVbMF0sIGVzY09wdHMpfS0ke2dldENoYXJFc2NhcGUodmFsdWVbMV0sIGVzY09wdHMpfWAgOiBnZXRDaGFyRXNjYXBlKHZhbHVlLCBlc2NPcHRzKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBgJHttaW5TdHJ9LSR7bWF4U3RyfSR7Wy4uLmV4dHJhQ2hhcnNdLmpvaW4oXCJcIil9YDtcbiAgfSxcbiAgLyoqXG4gIEBwYXJhbSB7Q2hhcmFjdGVyU2V0Tm9kZX0gbm9kZVxuICAqL1xuICBDaGFyYWN0ZXJTZXQoeyBraW5kLCBuZWdhdGUsIHZhbHVlLCBrZXkgfSwgc3RhdGUpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJkb3RcIikge1xuICAgICAgcmV0dXJuIHN0YXRlLmN1cnJlbnRGbGFncy5kb3RBbGwgPyBzdGF0ZS5hcHBsaWVkR2xvYmFsRmxhZ3MuZG90QWxsIHx8IHN0YXRlLnVzZUZsYWdNb2RzID8gXCIuXCIgOiBcIlteXVwiIDogKFxuICAgICAgICAvLyBPbmlnJ3Mgb25seSBsaW5lIGJyZWFrIGNoYXIgaXMgbGluZSBmZWVkLCB1bmxpa2UgSlNcbiAgICAgICAgcmBbXlxcbl1gXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoa2luZCA9PT0gXCJkaWdpdFwiKSB7XG4gICAgICByZXR1cm4gbmVnYXRlID8gcmBcXERgIDogcmBcXGRgO1xuICAgIH1cbiAgICBpZiAoa2luZCA9PT0gXCJwcm9wZXJ0eVwiKSB7XG4gICAgICBpZiAoc3RhdGUudXNlQXBwbGllZElnbm9yZUNhc2UgJiYgc3RhdGUuY3VycmVudEZsYWdzLmlnbm9yZUNhc2UgJiYgVW5pY29kZVByb3BlcnRpZXNXaXRoU3BlY2lmaWNDYXNlLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmljb2RlIHByb3BlcnR5IFwiJHt2YWx1ZX1cIiBjYW4ndCBiZSBjYXNlLWluc2Vuc2l0aXZlIHdoZW4gb3RoZXIgY2hhcnMgaGF2ZSBzcGVjaWZpYyBjYXNlYCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYCR7bmVnYXRlID8gcmBcXFBgIDogcmBcXHBgfXske2tleSA/IGAke2tleX09YCA6IFwiXCJ9JHt2YWx1ZX19YDtcbiAgICB9XG4gICAgaWYgKGtpbmQgPT09IFwid29yZFwiKSB7XG4gICAgICByZXR1cm4gbmVnYXRlID8gcmBcXFdgIDogcmBcXHdgO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgY2hhcmFjdGVyIHNldCBraW5kIFwiJHtraW5kfVwiYCk7XG4gIH0sXG4gIC8qKlxuICBAcGFyYW0ge0ZsYWdzTm9kZX0gbm9kZVxuICAqL1xuICBGbGFncyhub2RlLCBzdGF0ZSkge1xuICAgIHJldHVybiAoXG4gICAgICAvLyBUaGUgdHJhbnNmb3JtZXIgc2hvdWxkIG5ldmVyIHR1cm4gb24gdGhlIHByb3BlcnRpZXMgZm9yIGZsYWdzIGQsIGcsIG0gc2luY2UgT25pZyBkb2Vzbid0XG4gICAgICAvLyBoYXZlIGVxdWl2cy4gRmxhZyBtIGlzIG5ldmVyIHVzZWQgc2luY2UgT25pZyB1c2VzIGRpZmZlcmVudCBsaW5lIGJyZWFrIGNoYXJzIHRoYW4gSlNcbiAgICAgIC8vIChub2RlLmhhc0luZGljZXMgPyAnZCcgOiAnJykgK1xuICAgICAgLy8gKG5vZGUuZ2xvYmFsID8gJ2cnIDogJycpICtcbiAgICAgIC8vIChub2RlLm11bHRpbGluZSA/ICdtJyA6ICcnKSArXG4gICAgICAoc3RhdGUuYXBwbGllZEdsb2JhbEZsYWdzLmlnbm9yZUNhc2UgPyBcImlcIiA6IFwiXCIpICsgKG5vZGUuZG90QWxsID8gXCJzXCIgOiBcIlwiKSArIChub2RlLnN0aWNreSA/IFwieVwiIDogXCJcIilcbiAgICApO1xuICB9LFxuICAvKipcbiAgQHBhcmFtIHtHcm91cE5vZGV9IG5vZGVcbiAgKi9cbiAgR3JvdXAoeyBhdG9taWM6IGF0b21pYzIsIGJvZHksIGZsYWdzLCBwYXJlbnQgfSwgc3RhdGUsIGdlbikge1xuICAgIGNvbnN0IGN1cnJlbnRGbGFncyA9IHN0YXRlLmN1cnJlbnRGbGFncztcbiAgICBpZiAoZmxhZ3MpIHtcbiAgICAgIHN0YXRlLmN1cnJlbnRGbGFncyA9IGdldE5ld0N1cnJlbnRGbGFncyhjdXJyZW50RmxhZ3MsIGZsYWdzKTtcbiAgICB9XG4gICAgY29uc3QgY29udGVudHMgPSBib2R5Lm1hcChnZW4pLmpvaW4oXCJ8XCIpO1xuICAgIGNvbnN0IHJlc3VsdCA9ICFzdGF0ZS52ZXJib3NlICYmIGJvZHkubGVuZ3RoID09PSAxICYmIC8vIFNpbmdsZSBhbHRcbiAgICBwYXJlbnQudHlwZSAhPT0gXCJRdWFudGlmaWVyXCIgJiYgIWF0b21pYzIgJiYgKCFzdGF0ZS51c2VGbGFnTW9kcyB8fCAhZmxhZ3MpID8gY29udGVudHMgOiBgKD8ke2dldEdyb3VwUHJlZml4KGF0b21pYzIsIGZsYWdzLCBzdGF0ZS51c2VGbGFnTW9kcyl9JHtjb250ZW50c30pYDtcbiAgICBzdGF0ZS5jdXJyZW50RmxhZ3MgPSBjdXJyZW50RmxhZ3M7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcbiAgLyoqXG4gIEBwYXJhbSB7TG9va2Fyb3VuZEFzc2VydGlvbk5vZGV9IG5vZGVcbiAgKi9cbiAgTG9va2Fyb3VuZEFzc2VydGlvbih7IGJvZHksIGtpbmQsIG5lZ2F0ZSB9LCBfLCBnZW4pIHtcbiAgICBjb25zdCBwcmVmaXggPSBgJHtraW5kID09PSBcImxvb2thaGVhZFwiID8gXCJcIiA6IFwiPFwifSR7bmVnYXRlID8gXCIhXCIgOiBcIj1cIn1gO1xuICAgIHJldHVybiBgKD8ke3ByZWZpeH0ke2JvZHkubWFwKGdlbikuam9pbihcInxcIil9KWA7XG4gIH0sXG4gIC8qKlxuICBAcGFyYW0ge1F1YW50aWZpZXJOb2RlfSBub2RlXG4gICovXG4gIFF1YW50aWZpZXIobm9kZSwgXywgZ2VuKSB7XG4gICAgcmV0dXJuIGdlbihub2RlLmJvZHkpICsgZ2V0UXVhbnRpZmllclN0cihub2RlKTtcbiAgfSxcbiAgLyoqXG4gIEBwYXJhbSB7U3Vicm91dGluZU5vZGUgJiB7aXNSZWN1cnNpdmU6IHRydWV9fSBub2RlXG4gICovXG4gIFN1YnJvdXRpbmUoeyBpc1JlY3Vyc2l2ZSwgcmVmIH0sIHN0YXRlKSB7XG4gICAgaWYgKCFpc1JlY3Vyc2l2ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBub24tcmVjdXJzaXZlIHN1YnJvdXRpbmUgaW4gdHJhbnNmb3JtZWQgQVNUXCIpO1xuICAgIH1cbiAgICBjb25zdCBsaW1pdCA9IHN0YXRlLnJlY3Vyc2lvbkxpbWl0O1xuICAgIHJldHVybiByZWYgPT09IDAgPyBgKD9SPSR7bGltaXR9KWAgOiByYFxcZzwke3JlZn0mUj0ke2xpbWl0fT5gO1xuICB9XG59O1xudmFyIEJhc2VFc2NhcGVDaGFycyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KFtcbiAgXCIkXCIsXG4gIFwiKFwiLFxuICBcIilcIixcbiAgXCIqXCIsXG4gIFwiK1wiLFxuICBcIi5cIixcbiAgXCI/XCIsXG4gIFwiW1wiLFxuICBcIlxcXFxcIixcbiAgXCJdXCIsXG4gIFwiXlwiLFxuICBcIntcIixcbiAgXCJ8XCIsXG4gIFwifVwiXG5dKTtcbnZhciBDaGFyQ2xhc3NFc2NhcGVDaGFycyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KFtcbiAgXCItXCIsXG4gIFwiXFxcXFwiLFxuICBcIl1cIixcbiAgXCJeXCIsXG4gIC8vIExpdGVyYWwgYFtgIGRvZXNuJ3QgcmVxdWlyZSBlc2NhcGluZyB3aXRoIGZsYWcgdSwgYnV0IHRoaXMgY2FuIGhlbHAgd29yayBhcm91bmQgcmVnZXggc291cmNlXG4gIC8vIGxpbnRlcnMgYW5kIHJlZ2V4IHN5bnRheCBwcm9jZXNzb3JzIHRoYXQgZXhwZWN0IHVuZXNjYXBlZCBgW2AgdG8gY3JlYXRlIGEgbmVzdGVkIGNsYXNzXG4gIFwiW1wiXG5dKTtcbnZhciBDaGFyQ2xhc3NFc2NhcGVDaGFyc0ZsYWdWID0gLyogQF9fUFVSRV9fICovIG5ldyBTZXQoW1xuICBcIihcIixcbiAgXCIpXCIsXG4gIFwiLVwiLFxuICBcIi9cIixcbiAgXCJbXCIsXG4gIFwiXFxcXFwiLFxuICBcIl1cIixcbiAgXCJeXCIsXG4gIFwie1wiLFxuICBcInxcIixcbiAgXCJ9XCIsXG4gIC8vIERvdWJsZSBwdW5jdHVhdG9yczsgYWxzbyBpbmNsdWRlcyBhbHJlYWR5LWxpc3RlZCBgLWAgYW5kIGBeYFxuICBcIiFcIixcbiAgXCIjXCIsXG4gIFwiJFwiLFxuICBcIiVcIixcbiAgXCImXCIsXG4gIFwiKlwiLFxuICBcIitcIixcbiAgXCIsXCIsXG4gIFwiLlwiLFxuICBcIjpcIixcbiAgXCI7XCIsXG4gIFwiPFwiLFxuICBcIj1cIixcbiAgXCI+XCIsXG4gIFwiP1wiLFxuICBcIkBcIixcbiAgXCJgXCIsXG4gIFwiflwiXG5dKTtcbnZhciBDaGFyQ29kZUVzY2FwZU1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKFtcbiAgWzksIHJgXFx0YF0sXG4gIC8vIGhvcml6b250YWwgdGFiXG4gIFsxMCwgcmBcXG5gXSxcbiAgLy8gbGluZSBmZWVkXG4gIFsxMSwgcmBcXHZgXSxcbiAgLy8gdmVydGljYWwgdGFiXG4gIFsxMiwgcmBcXGZgXSxcbiAgLy8gZm9ybSBmZWVkXG4gIFsxMywgcmBcXHJgXSxcbiAgLy8gY2FycmlhZ2UgcmV0dXJuXG4gIFs4MjMyLCByYFxcdTIwMjhgXSxcbiAgLy8gbGluZSBzZXBhcmF0b3JcbiAgWzgyMzMsIHJgXFx1MjAyOWBdLFxuICAvLyBwYXJhZ3JhcGggc2VwYXJhdG9yXG4gIFs2NTI3OSwgcmBcXHVGRUZGYF1cbiAgLy8gWldOQlNQL0JPTVxuXSk7XG52YXIgY2FzZWRSZSA9IC9eXFxwe0Nhc2VkfSQvdTtcbmZ1bmN0aW9uIGNoYXJIYXNDYXNlKGNoYXIpIHtcbiAgcmV0dXJuIGNhc2VkUmUudGVzdChjaGFyKTtcbn1cbmZ1bmN0aW9uIGdldENhc2VzT3V0c2lkZUNoYXJDbGFzc1JhbmdlKG5vZGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgZmlyc3RPbmx5ID0gISFvcHRpb25zPy5maXJzdE9ubHk7XG4gIGNvbnN0IG1pbiA9IG5vZGUubWluLnZhbHVlO1xuICBjb25zdCBtYXggPSBub2RlLm1heC52YWx1ZTtcbiAgY29uc3QgZm91bmQgPSBbXTtcbiAgaWYgKG1pbiA8IDY1ICYmIChtYXggPT09IDY1NTM1IHx8IG1heCA+PSAxMzEwNzEpIHx8IG1pbiA9PT0gNjU1MzYgJiYgbWF4ID49IDEzMTA3MSkge1xuICAgIHJldHVybiBmb3VuZDtcbiAgfVxuICBmb3IgKGxldCBpID0gbWluOyBpIDw9IG1heDsgaSsrKSB7XG4gICAgY29uc3QgY2hhciA9IGNwKGkpO1xuICAgIGlmICghY2hhckhhc0Nhc2UoY2hhcikpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBjb25zdCBjaGFyc091dHNpZGVSYW5nZSA9IGdldElnbm9yZUNhc2VNYXRjaENoYXJzKGNoYXIpLmZpbHRlcigoY2FzZU9mQ2hhcikgPT4ge1xuICAgICAgY29uc3QgbnVtID0gY2FzZU9mQ2hhci5jb2RlUG9pbnRBdCgwKTtcbiAgICAgIHJldHVybiBudW0gPCBtaW4gfHwgbnVtID4gbWF4O1xuICAgIH0pO1xuICAgIGlmIChjaGFyc091dHNpZGVSYW5nZS5sZW5ndGgpIHtcbiAgICAgIGZvdW5kLnB1c2goLi4uY2hhcnNPdXRzaWRlUmFuZ2UpO1xuICAgICAgaWYgKGZpcnN0T25seSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZvdW5kO1xufVxuZnVuY3Rpb24gZ2V0Q2hhckVzY2FwZShjb2RlUG9pbnQsIHsgZXNjRGlnaXQsIGluQ2hhckNsYXNzLCB1c2VGbGFnViB9KSB7XG4gIGlmIChDaGFyQ29kZUVzY2FwZU1hcC5oYXMoY29kZVBvaW50KSkge1xuICAgIHJldHVybiBDaGFyQ29kZUVzY2FwZU1hcC5nZXQoY29kZVBvaW50KTtcbiAgfVxuICBpZiAoXG4gICAgLy8gQ29udHJvbCBjaGFycywgZXRjLjsgY29uZGl0aW9uIG1vZGVsZWQgb24gdGhlIENocm9tZSBkZXZlbG9wZXIgY29uc29sZSdzIGRpc3BsYXkgZm9yIHN0cmluZ3NcbiAgICBjb2RlUG9pbnQgPCAzMiB8fCBjb2RlUG9pbnQgPiAxMjYgJiYgY29kZVBvaW50IDwgMTYwIHx8IC8vIFVuaWNvZGUgcGxhbmVzIDQtMTY7IHVuYXNzaWduZWQsIHNwZWNpYWwgcHVycG9zZSwgYW5kIHByaXZhdGUgdXNlIGFyZWFcbiAgICBjb2RlUG9pbnQgPiAyNjIxNDMgfHwgLy8gQXZvaWQgY29ycnVwdGluZyBhIHByZWNlZGluZyBiYWNrcmVmIGJ5IGltbWVkaWF0ZWx5IGZvbGxvd2luZyBpdCB3aXRoIGEgbGl0ZXJhbCBkaWdpdFxuICAgIGVzY0RpZ2l0ICYmIGlzRGlnaXRDaGFyQ29kZShjb2RlUG9pbnQpXG4gICkge1xuICAgIHJldHVybiBjb2RlUG9pbnQgPiAyNTUgPyBgXFxcXHV7JHtjb2RlUG9pbnQudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCl9fWAgOiBgXFxcXHgke2NvZGVQb2ludC50b1N0cmluZygxNikudG9VcHBlckNhc2UoKS5wYWRTdGFydCgyLCBcIjBcIil9YDtcbiAgfVxuICBjb25zdCBlc2NhcGVDaGFycyA9IGluQ2hhckNsYXNzID8gdXNlRmxhZ1YgPyBDaGFyQ2xhc3NFc2NhcGVDaGFyc0ZsYWdWIDogQ2hhckNsYXNzRXNjYXBlQ2hhcnMgOiBCYXNlRXNjYXBlQ2hhcnM7XG4gIGNvbnN0IGNoYXIgPSBjcChjb2RlUG9pbnQpO1xuICByZXR1cm4gKGVzY2FwZUNoYXJzLmhhcyhjaGFyKSA/IFwiXFxcXFwiIDogXCJcIikgKyBjaGFyO1xufVxuZnVuY3Rpb24gZ2V0Q29kZVBvaW50UmFuZ2VzRnJvbUNoYXJzKGNoYXJzKSB7XG4gIGNvbnN0IGNvZGVQb2ludHMgPSBjaGFycy5tYXAoKGNoYXIpID0+IGNoYXIuY29kZVBvaW50QXQoMCkpLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgY29uc3QgdmFsdWVzID0gW107XG4gIGxldCBzdGFydCA9IG51bGw7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29kZVBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChjb2RlUG9pbnRzW2kgKyAxXSA9PT0gY29kZVBvaW50c1tpXSArIDEpIHtcbiAgICAgIHN0YXJ0ID8/PSBjb2RlUG9pbnRzW2ldO1xuICAgIH0gZWxzZSBpZiAoc3RhcnQgPT09IG51bGwpIHtcbiAgICAgIHZhbHVlcy5wdXNoKGNvZGVQb2ludHNbaV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZXMucHVzaChbc3RhcnQsIGNvZGVQb2ludHNbaV1dKTtcbiAgICAgIHN0YXJ0ID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbHVlcztcbn1cbmZ1bmN0aW9uIGdldEdyb3VwUHJlZml4KGF0b21pYzIsIGZsYWdNb2RzLCB1c2VGbGFnTW9kcykge1xuICBpZiAoYXRvbWljMikge1xuICAgIHJldHVybiBcIj5cIjtcbiAgfVxuICBsZXQgbW9kcyA9IFwiXCI7XG4gIGlmIChmbGFnTW9kcyAmJiB1c2VGbGFnTW9kcykge1xuICAgIGNvbnN0IHsgZW5hYmxlLCBkaXNhYmxlIH0gPSBmbGFnTW9kcztcbiAgICBtb2RzID0gKGVuYWJsZT8uaWdub3JlQ2FzZSA/IFwiaVwiIDogXCJcIikgKyAoZW5hYmxlPy5kb3RBbGwgPyBcInNcIiA6IFwiXCIpICsgKGRpc2FibGUgPyBcIi1cIiA6IFwiXCIpICsgKGRpc2FibGU/Lmlnbm9yZUNhc2UgPyBcImlcIiA6IFwiXCIpICsgKGRpc2FibGU/LmRvdEFsbCA/IFwic1wiIDogXCJcIik7XG4gIH1cbiAgcmV0dXJuIGAke21vZHN9OmA7XG59XG5mdW5jdGlvbiBnZXRRdWFudGlmaWVyU3RyKHsga2luZCwgbWF4LCBtaW4gfSkge1xuICBsZXQgYmFzZTtcbiAgaWYgKCFtaW4gJiYgbWF4ID09PSAxKSB7XG4gICAgYmFzZSA9IFwiP1wiO1xuICB9IGVsc2UgaWYgKCFtaW4gJiYgbWF4ID09PSBJbmZpbml0eSkge1xuICAgIGJhc2UgPSBcIipcIjtcbiAgfSBlbHNlIGlmIChtaW4gPT09IDEgJiYgbWF4ID09PSBJbmZpbml0eSkge1xuICAgIGJhc2UgPSBcIitcIjtcbiAgfSBlbHNlIGlmIChtaW4gPT09IG1heCkge1xuICAgIGJhc2UgPSBgeyR7bWlufX1gO1xuICB9IGVsc2Uge1xuICAgIGJhc2UgPSBgeyR7bWlufSwke21heCA9PT0gSW5maW5pdHkgPyBcIlwiIDogbWF4fX1gO1xuICB9XG4gIHJldHVybiBiYXNlICsge1xuICAgIGdyZWVkeTogXCJcIixcbiAgICBsYXp5OiBcIj9cIixcbiAgICBwb3NzZXNzaXZlOiBcIitcIlxuICB9W2tpbmRdO1xufVxuZnVuY3Rpb24gaXNBbnlHcm91cCh7IHR5cGUgfSkge1xuICByZXR1cm4gdHlwZSA9PT0gXCJDYXB0dXJpbmdHcm91cFwiIHx8IHR5cGUgPT09IFwiR3JvdXBcIiB8fCB0eXBlID09PSBcIkxvb2thcm91bmRBc3NlcnRpb25cIjtcbn1cbmZ1bmN0aW9uIGlzRGlnaXRDaGFyQ29kZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPiA0NyAmJiB2YWx1ZSA8IDU4O1xufVxuZnVuY3Rpb24gaXNMaXRlcmFsSHlwaGVuKHsgdHlwZSwgdmFsdWUgfSkge1xuICByZXR1cm4gdHlwZSA9PT0gXCJDaGFyYWN0ZXJcIiAmJiB2YWx1ZSA9PT0gNDU7XG59XG5cbi8vIHNyYy9zdWJjbGFzcy5qc1xudmFyIEVtdWxhdGVkUmVnRXhwID0gY2xhc3MgX0VtdWxhdGVkUmVnRXhwIGV4dGVuZHMgUmVnRXhwIHtcbiAgLyoqXG4gIEB0eXBlIHtNYXA8bnVtYmVyLCB7XG4gICAgaGlkZGVuPzogdHJ1ZTtcbiAgICB0cmFuc2ZlclRvPzogbnVtYmVyO1xuICB9Pn1cbiAgKi9cbiAgI2NhcHR1cmVNYXAgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuICAvKipcbiAgQHR5cGUge1JlZ0V4cCB8IEVtdWxhdGVkUmVnRXhwIHwgbnVsbH1cbiAgKi9cbiAgI2NvbXBpbGVkID0gbnVsbDtcbiAgLyoqXG4gIEB0eXBlIHtzdHJpbmd9XG4gICovXG4gICNwYXR0ZXJuO1xuICAvKipcbiAgQHR5cGUge01hcDxudW1iZXIsIHN0cmluZz4/fVxuICAqL1xuICAjbmFtZU1hcCA9IG51bGw7XG4gIC8qKlxuICBAdHlwZSB7c3RyaW5nP31cbiAgKi9cbiAgI3N0cmF0ZWd5ID0gbnVsbDtcbiAgLyoqXG4gIENhbiBiZSB1c2VkIHRvIHNlcmlhbGl6ZSB0aGUgaW5zdGFuY2UuXG4gIEB0eXBlIHtFbXVsYXRlZFJlZ0V4cE9wdGlvbnN9XG4gICovXG4gIHJhd09wdGlvbnMgPSB7fTtcbiAgLy8gT3ZlcnJpZGUgdGhlIGdldHRlciB3aXRoIG9uZSB0aGF0IHdvcmtzIHdpdGggbGF6eS1jb21waWxlZCByZWdleGVzXG4gIGdldCBzb3VyY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuI3BhdHRlcm4gfHwgXCIoPzopXCI7XG4gIH1cbiAgLyoqXG4gIEBvdmVybG9hZFxuICBAcGFyYW0ge3N0cmluZ30gcGF0dGVyblxuICBAcGFyYW0ge3N0cmluZ30gW2ZsYWdzXVxuICBAcGFyYW0ge0VtdWxhdGVkUmVnRXhwT3B0aW9uc30gW29wdGlvbnNdXG4gICovXG4gIC8qKlxuICBAb3ZlcmxvYWRcbiAgQHBhcmFtIHtFbXVsYXRlZFJlZ0V4cH0gcGF0dGVyblxuICBAcGFyYW0ge3N0cmluZ30gW2ZsYWdzXVxuICAqL1xuICBjb25zdHJ1Y3RvcihwYXR0ZXJuLCBmbGFncywgb3B0aW9ucykge1xuICAgIGNvbnN0IGxhenlDb21waWxlID0gISFvcHRpb25zPy5sYXp5Q29tcGlsZTtcbiAgICBpZiAocGF0dGVybiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHByb3ZpZGUgb3B0aW9ucyB3aGVuIGNvcHlpbmcgYSByZWdleHBcIik7XG4gICAgICB9XG4gICAgICBjb25zdCByZSA9IHBhdHRlcm47XG4gICAgICBzdXBlcihyZSwgZmxhZ3MpO1xuICAgICAgdGhpcy4jcGF0dGVybiA9IHJlLnNvdXJjZTtcbiAgICAgIGlmIChyZSBpbnN0YW5jZW9mIF9FbXVsYXRlZFJlZ0V4cCkge1xuICAgICAgICB0aGlzLiNjYXB0dXJlTWFwID0gcmUuI2NhcHR1cmVNYXA7XG4gICAgICAgIHRoaXMuI25hbWVNYXAgPSByZS4jbmFtZU1hcDtcbiAgICAgICAgdGhpcy4jc3RyYXRlZ3kgPSByZS4jc3RyYXRlZ3k7XG4gICAgICAgIHRoaXMucmF3T3B0aW9ucyA9IHJlLnJhd09wdGlvbnM7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICAgIGhpZGRlbkNhcHR1cmVzOiBbXSxcbiAgICAgICAgc3RyYXRlZ3k6IG51bGwsXG4gICAgICAgIHRyYW5zZmVyczogW10sXG4gICAgICAgIC4uLm9wdGlvbnNcbiAgICAgIH07XG4gICAgICBzdXBlcihsYXp5Q29tcGlsZSA/IFwiXCIgOiBwYXR0ZXJuLCBmbGFncyk7XG4gICAgICB0aGlzLiNwYXR0ZXJuID0gcGF0dGVybjtcbiAgICAgIHRoaXMuI2NhcHR1cmVNYXAgPSBjcmVhdGVDYXB0dXJlTWFwKG9wdHMuaGlkZGVuQ2FwdHVyZXMsIG9wdHMudHJhbnNmZXJzKTtcbiAgICAgIHRoaXMuI3N0cmF0ZWd5ID0gb3B0cy5zdHJhdGVneTtcbiAgICAgIHRoaXMucmF3T3B0aW9ucyA9IG9wdGlvbnMgPz8ge307XG4gICAgfVxuICAgIGlmICghbGF6eUNvbXBpbGUpIHtcbiAgICAgIHRoaXMuI2NvbXBpbGVkID0gdGhpcztcbiAgICB9XG4gIH1cbiAgLyoqXG4gIENhbGxlZCBpbnRlcm5hbGx5IGJ5IGFsbCBTdHJpbmcvUmVnRXhwIG1ldGhvZHMgdGhhdCB1c2UgcmVnZXhlcy5cbiAgQG92ZXJyaWRlXG4gIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAgQHJldHVybnMge1JlZ0V4cEV4ZWNBcnJheT99XG4gICovXG4gIGV4ZWMoc3RyKSB7XG4gICAgaWYgKCF0aGlzLiNjb21waWxlZCkge1xuICAgICAgY29uc3QgeyBsYXp5Q29tcGlsZSwgLi4ucmVzdCB9ID0gdGhpcy5yYXdPcHRpb25zO1xuICAgICAgdGhpcy4jY29tcGlsZWQgPSBuZXcgX0VtdWxhdGVkUmVnRXhwKHRoaXMuI3BhdHRlcm4sIHRoaXMuZmxhZ3MsIHJlc3QpO1xuICAgIH1cbiAgICBjb25zdCB1c2VMYXN0SW5kZXggPSB0aGlzLmdsb2JhbCB8fCB0aGlzLnN0aWNreTtcbiAgICBjb25zdCBwb3MgPSB0aGlzLmxhc3RJbmRleDtcbiAgICBpZiAodGhpcy4jc3RyYXRlZ3kgPT09IFwiY2xpcF9zZWFyY2hcIiAmJiB1c2VMYXN0SW5kZXggJiYgcG9zKSB7XG4gICAgICB0aGlzLmxhc3RJbmRleCA9IDA7XG4gICAgICBjb25zdCBtYXRjaCA9IHRoaXMuI2V4ZWNDb3JlKHN0ci5zbGljZShwb3MpKTtcbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBhZGp1c3RNYXRjaERldGFpbHNGb3JPZmZzZXQobWF0Y2gsIHBvcywgc3RyLCB0aGlzLmhhc0luZGljZXMpO1xuICAgICAgICB0aGlzLmxhc3RJbmRleCArPSBwb3M7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLiNleGVjQ29yZShzdHIpO1xuICB9XG4gIC8qKlxuICBBZGRzIHN1cHBvcnQgZm9yIGhpZGRlbiBhbmQgdHJhbnNmZXIgY2FwdHVyZXMuXG4gIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAgQHJldHVybnNcbiAgKi9cbiAgI2V4ZWNDb3JlKHN0cikge1xuICAgIHRoaXMuI2NvbXBpbGVkLmxhc3RJbmRleCA9IHRoaXMubGFzdEluZGV4O1xuICAgIGNvbnN0IG1hdGNoID0gc3VwZXIuZXhlYy5jYWxsKHRoaXMuI2NvbXBpbGVkLCBzdHIpO1xuICAgIHRoaXMubGFzdEluZGV4ID0gdGhpcy4jY29tcGlsZWQubGFzdEluZGV4O1xuICAgIGlmICghbWF0Y2ggfHwgIXRoaXMuI2NhcHR1cmVNYXAuc2l6ZSkge1xuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH1cbiAgICBjb25zdCBtYXRjaENvcHkgPSBbLi4ubWF0Y2hdO1xuICAgIG1hdGNoLmxlbmd0aCA9IDE7XG4gICAgbGV0IGluZGljZXNDb3B5O1xuICAgIGlmICh0aGlzLmhhc0luZGljZXMpIHtcbiAgICAgIGluZGljZXNDb3B5ID0gWy4uLm1hdGNoLmluZGljZXNdO1xuICAgICAgbWF0Y2guaW5kaWNlcy5sZW5ndGggPSAxO1xuICAgIH1cbiAgICBjb25zdCBtYXBwZWROdW1zID0gWzBdO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbWF0Y2hDb3B5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB7IGhpZGRlbiwgdHJhbnNmZXJUbyB9ID0gdGhpcy4jY2FwdHVyZU1hcC5nZXQoaSkgPz8ge307XG4gICAgICBpZiAoaGlkZGVuKSB7XG4gICAgICAgIG1hcHBlZE51bXMucHVzaChudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcHBlZE51bXMucHVzaChtYXRjaC5sZW5ndGgpO1xuICAgICAgICBtYXRjaC5wdXNoKG1hdGNoQ29weVtpXSk7XG4gICAgICAgIGlmICh0aGlzLmhhc0luZGljZXMpIHtcbiAgICAgICAgICBtYXRjaC5pbmRpY2VzLnB1c2goaW5kaWNlc0NvcHlbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNmZXJUbyAmJiBtYXRjaENvcHlbaV0gIT09IHZvaWQgMCkge1xuICAgICAgICBjb25zdCB0byA9IG1hcHBlZE51bXNbdHJhbnNmZXJUb107XG4gICAgICAgIGlmICghdG8pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY2FwdHVyZSB0cmFuc2ZlciB0byBcIiR7dG99XCJgKTtcbiAgICAgICAgfVxuICAgICAgICBtYXRjaFt0b10gPSBtYXRjaENvcHlbaV07XG4gICAgICAgIGlmICh0aGlzLmhhc0luZGljZXMpIHtcbiAgICAgICAgICBtYXRjaC5pbmRpY2VzW3RvXSA9IGluZGljZXNDb3B5W2ldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXRjaC5ncm91cHMpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuI25hbWVNYXApIHtcbiAgICAgICAgICAgIHRoaXMuI25hbWVNYXAgPSBjcmVhdGVOYW1lTWFwKHRoaXMuc291cmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuI25hbWVNYXAuZ2V0KHRyYW5zZmVyVG8pO1xuICAgICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICBtYXRjaC5ncm91cHNbbmFtZV0gPSBtYXRjaENvcHlbaV07XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNJbmRpY2VzKSB7XG4gICAgICAgICAgICAgIG1hdGNoLmluZGljZXMuZ3JvdXBzW25hbWVdID0gaW5kaWNlc0NvcHlbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXRjaDtcbiAgfVxufTtcbmZ1bmN0aW9uIGFkanVzdE1hdGNoRGV0YWlsc0Zvck9mZnNldChtYXRjaCwgb2Zmc2V0LCBpbnB1dCwgaGFzSW5kaWNlcykge1xuICBtYXRjaC5pbmRleCArPSBvZmZzZXQ7XG4gIG1hdGNoLmlucHV0ID0gaW5wdXQ7XG4gIGlmIChoYXNJbmRpY2VzKSB7XG4gICAgY29uc3QgaW5kaWNlcyA9IG1hdGNoLmluZGljZXM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBhcnIgPSBpbmRpY2VzW2ldO1xuICAgICAgaWYgKGFycikge1xuICAgICAgICBpbmRpY2VzW2ldID0gW2FyclswXSArIG9mZnNldCwgYXJyWzFdICsgb2Zmc2V0XTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgZ3JvdXBJbmRpY2VzID0gaW5kaWNlcy5ncm91cHM7XG4gICAgaWYgKGdyb3VwSW5kaWNlcykge1xuICAgICAgT2JqZWN0LmtleXMoZ3JvdXBJbmRpY2VzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgYXJyID0gZ3JvdXBJbmRpY2VzW2tleV07XG4gICAgICAgIGlmIChhcnIpIHtcbiAgICAgICAgICBncm91cEluZGljZXNba2V5XSA9IFthcnJbMF0gKyBvZmZzZXQsIGFyclsxXSArIG9mZnNldF07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gY3JlYXRlQ2FwdHVyZU1hcChoaWRkZW5DYXB0dXJlcywgdHJhbnNmZXJzKSB7XG4gIGNvbnN0IGNhcHR1cmVNYXAgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuICBmb3IgKGNvbnN0IG51bSBvZiBoaWRkZW5DYXB0dXJlcykge1xuICAgIGNhcHR1cmVNYXAuc2V0KG51bSwge1xuICAgICAgaGlkZGVuOiB0cnVlXG4gICAgfSk7XG4gIH1cbiAgZm9yIChjb25zdCBbdG8sIGZyb21dIG9mIHRyYW5zZmVycykge1xuICAgIGZvciAoY29uc3QgbnVtIG9mIGZyb20pIHtcbiAgICAgIGdldE9ySW5zZXJ0KGNhcHR1cmVNYXAsIG51bSwge30pLnRyYW5zZmVyVG8gPSB0bztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNhcHR1cmVNYXA7XG59XG5mdW5jdGlvbiBjcmVhdGVOYW1lTWFwKHBhdHRlcm4pIHtcbiAgY29uc3QgcmUgPSAvKD88Y2FwdHVyZT5cXCgoPzpcXD88KD8hWz0hXSkoPzxuYW1lPltePl0rKT58KD8hXFw/KSkpfFxcXFw/Li9nc3U7XG4gIGNvbnN0IG1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gIGxldCBudW1DaGFyQ2xhc3Nlc09wZW4gPSAwO1xuICBsZXQgbnVtQ2FwdHVyZXMgPSAwO1xuICBsZXQgbWF0Y2g7XG4gIHdoaWxlIChtYXRjaCA9IHJlLmV4ZWMocGF0dGVybikpIHtcbiAgICBjb25zdCB7IDA6IG0sIGdyb3VwczogeyBjYXB0dXJlLCBuYW1lIH0gfSA9IG1hdGNoO1xuICAgIGlmIChtID09PSBcIltcIikge1xuICAgICAgbnVtQ2hhckNsYXNzZXNPcGVuKys7XG4gICAgfSBlbHNlIGlmICghbnVtQ2hhckNsYXNzZXNPcGVuKSB7XG4gICAgICBpZiAoY2FwdHVyZSkge1xuICAgICAgICBudW1DYXB0dXJlcysrO1xuICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgIG1hcC5zZXQobnVtQ2FwdHVyZXMsIG5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtID09PSBcIl1cIikge1xuICAgICAgbnVtQ2hhckNsYXNzZXNPcGVuLS07XG4gICAgfVxuICB9XG4gIHJldHVybiBtYXA7XG59XG5cbi8vIHNyYy9pbmRleC5qc1xuaW1wb3J0IHsgcGFyc2UgYXMgcGFyc2UyIH0gZnJvbSBcIm9uaWd1cnVtYS1wYXJzZXIvcGFyc2VyXCI7XG5pbXBvcnQgeyBhdG9taWMsIHBvc3Nlc3NpdmUgfSBmcm9tIFwicmVnZXgvaW50ZXJuYWxzXCI7XG5pbXBvcnQgeyByZWN1cnNpb24gfSBmcm9tIFwicmVnZXgtcmVjdXJzaW9uXCI7XG5mdW5jdGlvbiB0b1JlZ0V4cChwYXR0ZXJuLCBvcHRpb25zKSB7XG4gIGNvbnN0IGQgPSB0b1JlZ0V4cERldGFpbHMocGF0dGVybiwgb3B0aW9ucyk7XG4gIGlmIChkLm9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IEVtdWxhdGVkUmVnRXhwKGQucGF0dGVybiwgZC5mbGFncywgZC5vcHRpb25zKTtcbiAgfVxuICByZXR1cm4gbmV3IFJlZ0V4cChkLnBhdHRlcm4sIGQuZmxhZ3MpO1xufVxuZnVuY3Rpb24gdG9SZWdFeHBEZXRhaWxzKHBhdHRlcm4sIG9wdGlvbnMpIHtcbiAgY29uc3Qgb3B0cyA9IGdldE9wdGlvbnMob3B0aW9ucyk7XG4gIGNvbnN0IG9uaWd1cnVtYUFzdCA9IHBhcnNlMihwYXR0ZXJuLCB7XG4gICAgZmxhZ3M6IG9wdHMuZmxhZ3MsXG4gICAgbm9ybWFsaXplVW5rbm93blByb3BlcnR5TmFtZXM6IHRydWUsXG4gICAgcnVsZXM6IHtcbiAgICAgIGNhcHR1cmVHcm91cDogb3B0cy5ydWxlcy5jYXB0dXJlR3JvdXAsXG4gICAgICBzaW5nbGVsaW5lOiBvcHRzLnJ1bGVzLnNpbmdsZWxpbmVcbiAgICB9LFxuICAgIHNraXBCYWNrcmVmVmFsaWRhdGlvbjogb3B0cy5ydWxlcy5hbGxvd09ycGhhbkJhY2tyZWZzLFxuICAgIHVuaWNvZGVQcm9wZXJ0eU1hcDogSnNVbmljb2RlUHJvcGVydHlNYXBcbiAgfSk7XG4gIGNvbnN0IHJlZ2V4UGx1c0FzdCA9IHRyYW5zZm9ybShvbmlndXJ1bWFBc3QsIHtcbiAgICBhY2N1cmFjeTogb3B0cy5hY2N1cmFjeSxcbiAgICBhc2NpaVdvcmRCb3VuZGFyaWVzOiBvcHRzLnJ1bGVzLmFzY2lpV29yZEJvdW5kYXJpZXMsXG4gICAgYXZvaWRTdWJjbGFzczogb3B0cy5hdm9pZFN1YmNsYXNzLFxuICAgIGJlc3RFZmZvcnRUYXJnZXQ6IG9wdHMudGFyZ2V0XG4gIH0pO1xuICBjb25zdCBnZW5lcmF0ZWQgPSBnZW5lcmF0ZShyZWdleFBsdXNBc3QsIG9wdHMpO1xuICBjb25zdCByZWN1cnNpb25SZXN1bHQgPSByZWN1cnNpb24oZ2VuZXJhdGVkLnBhdHRlcm4sIHtcbiAgICBjYXB0dXJlVHJhbnNmZXJzOiBnZW5lcmF0ZWQuX2NhcHR1cmVUcmFuc2ZlcnMsXG4gICAgaGlkZGVuQ2FwdHVyZXM6IGdlbmVyYXRlZC5faGlkZGVuQ2FwdHVyZXMsXG4gICAgbW9kZTogXCJleHRlcm5hbFwiXG4gIH0pO1xuICBjb25zdCBwb3NzZXNzaXZlUmVzdWx0ID0gcG9zc2Vzc2l2ZShyZWN1cnNpb25SZXN1bHQucGF0dGVybik7XG4gIGNvbnN0IGF0b21pY1Jlc3VsdCA9IGF0b21pYyhwb3NzZXNzaXZlUmVzdWx0LnBhdHRlcm4sIHtcbiAgICBjYXB0dXJlVHJhbnNmZXJzOiByZWN1cnNpb25SZXN1bHQuY2FwdHVyZVRyYW5zZmVycyxcbiAgICBoaWRkZW5DYXB0dXJlczogcmVjdXJzaW9uUmVzdWx0LmhpZGRlbkNhcHR1cmVzXG4gIH0pO1xuICBjb25zdCBkZXRhaWxzID0ge1xuICAgIHBhdHRlcm46IGF0b21pY1Jlc3VsdC5wYXR0ZXJuLFxuICAgIGZsYWdzOiBgJHtvcHRzLmhhc0luZGljZXMgPyBcImRcIiA6IFwiXCJ9JHtvcHRzLmdsb2JhbCA/IFwiZ1wiIDogXCJcIn0ke2dlbmVyYXRlZC5mbGFnc30ke2dlbmVyYXRlZC5vcHRpb25zLmRpc2FibGUudiA/IFwidVwiIDogXCJ2XCJ9YFxuICB9O1xuICBpZiAob3B0cy5hdm9pZFN1YmNsYXNzKSB7XG4gICAgaWYgKG9wdHMubGF6eUNvbXBpbGVMZW5ndGggIT09IEluZmluaXR5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMYXp5IGNvbXBpbGF0aW9uIHJlcXVpcmVzIHN1YmNsYXNzXCIpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBoaWRkZW5DYXB0dXJlcyA9IGF0b21pY1Jlc3VsdC5oaWRkZW5DYXB0dXJlcy5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgY29uc3QgdHJhbnNmZXJzID0gQXJyYXkuZnJvbShhdG9taWNSZXN1bHQuY2FwdHVyZVRyYW5zZmVycyk7XG4gICAgY29uc3Qgc3RyYXRlZ3kgPSByZWdleFBsdXNBc3QuX3N0cmF0ZWd5O1xuICAgIGNvbnN0IGxhenlDb21waWxlID0gZGV0YWlscy5wYXR0ZXJuLmxlbmd0aCA+PSBvcHRzLmxhenlDb21waWxlTGVuZ3RoO1xuICAgIGlmIChoaWRkZW5DYXB0dXJlcy5sZW5ndGggfHwgdHJhbnNmZXJzLmxlbmd0aCB8fCBzdHJhdGVneSB8fCBsYXp5Q29tcGlsZSkge1xuICAgICAgZGV0YWlscy5vcHRpb25zID0ge1xuICAgICAgICAuLi5oaWRkZW5DYXB0dXJlcy5sZW5ndGggJiYgeyBoaWRkZW5DYXB0dXJlcyB9LFxuICAgICAgICAuLi50cmFuc2ZlcnMubGVuZ3RoICYmIHsgdHJhbnNmZXJzIH0sXG4gICAgICAgIC4uLnN0cmF0ZWd5ICYmIHsgc3RyYXRlZ3kgfSxcbiAgICAgICAgLi4ubGF6eUNvbXBpbGUgJiYgeyBsYXp5Q29tcGlsZSB9XG4gICAgICB9O1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGV0YWlscztcbn1cbmV4cG9ydCB7XG4gIEVtdWxhdGVkUmVnRXhwLFxuICB0b1JlZ0V4cCxcbiAgdG9SZWdFeHBEZXRhaWxzXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCJpbXBvcnQgeyB0IGFzIEphdmFTY3JpcHRTY2FubmVyIH0gZnJvbSBcIi4vc2Nhbm5lci1EWDhMUkZHRS5tanNcIjtcbmltcG9ydCB7IHRvUmVnRXhwIH0gZnJvbSBcIm9uaWd1cnVtYS10by1lc1wiO1xuLy8jcmVnaW9uIHNyYy9lbmdpbmUtY29tcGlsZS50c1xuLyoqXG4qIFRoZSBkZWZhdWx0IHJlZ2V4IGNvbnN0cnVjdG9yIGZvciB0aGUgSmF2YVNjcmlwdCBSZWdFeHAgZW5naW5lLlxuKi9cbmZ1bmN0aW9uIGRlZmF1bHRKYXZhU2NyaXB0UmVnZXhDb25zdHJ1Y3RvcihwYXR0ZXJuLCBvcHRpb25zKSB7XG5cdHJldHVybiB0b1JlZ0V4cChwYXR0ZXJuLCB7XG5cdFx0Z2xvYmFsOiB0cnVlLFxuXHRcdGhhc0luZGljZXM6IHRydWUsXG5cdFx0bGF6eUNvbXBpbGVMZW5ndGg6IDNlMyxcblx0XHRydWxlczoge1xuXHRcdFx0YWxsb3dPcnBoYW5CYWNrcmVmczogdHJ1ZSxcblx0XHRcdGFzY2lpV29yZEJvdW5kYXJpZXM6IHRydWUsXG5cdFx0XHRjYXB0dXJlR3JvdXA6IHRydWUsXG5cdFx0XHRyZWN1cnNpb25MaW1pdDogNSxcblx0XHRcdHNpbmdsZWxpbmU6IHRydWVcblx0XHR9LFxuXHRcdC4uLm9wdGlvbnNcblx0fSk7XG59XG4vKipcbiogVXNlIHRoZSBtb2Rlcm4gSmF2YVNjcmlwdCBSZWdFeHAgZW5naW5lIHRvIGltcGxlbWVudCB0aGUgT25pZ1NjYW5uZXIuXG4qXG4qIEFzIE9uaWd1cnVtYSBzdXBwb3J0cyBzb21lIGZlYXR1cmVzIHRoYXQgY2FuJ3QgYmUgZW11bGF0ZWQgdXNpbmcgbmF0aXZlIEphdmFTY3JpcHQgcmVnZXhlcywgc29tZVxuKiBwYXR0ZXJucyBhcmUgbm90IHN1cHBvcnRlZC4gRXJyb3JzIHdpbGwgYmUgdGhyb3duIHdoZW4gcGFyc2luZyBUZXh0TWF0ZSBncmFtbWFycyB3aXRoXG4qIHVuc3VwcG9ydGVkIHBhdHRlcm5zLCBhbmQgd2hlbiB0aGUgZ3JhbW1hciBpbmNsdWRlcyBwYXR0ZXJucyB0aGF0IHVzZSBpbnZhbGlkIE9uaWd1cnVtYSBzeW50YXguXG4qIFNldCBgZm9yZ2l2aW5nYCB0byBgdHJ1ZWAgdG8gaWdub3JlIHRoZXNlIGVycm9ycyBhbmQgc2tpcCBhbnkgdW5zdXBwb3J0ZWQgb3IgaW52YWxpZCBwYXR0ZXJucy5cbiovXG5mdW5jdGlvbiBjcmVhdGVKYXZhU2NyaXB0UmVnZXhFbmdpbmUob3B0aW9ucyA9IHt9KSB7XG5cdGNvbnN0IF9vcHRpb25zID0ge1xuXHRcdHRhcmdldDogXCJhdXRvXCIsXG5cdFx0Y2FjaGU6IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCksXG5cdFx0Li4ub3B0aW9uc1xuXHR9O1xuXHRfb3B0aW9ucy5yZWdleENvbnN0cnVjdG9yIHx8PSAocGF0dGVybikgPT4gZGVmYXVsdEphdmFTY3JpcHRSZWdleENvbnN0cnVjdG9yKHBhdHRlcm4sIHsgdGFyZ2V0OiBfb3B0aW9ucy50YXJnZXQgfSk7XG5cdHJldHVybiB7XG5cdFx0Y3JlYXRlU2Nhbm5lcihwYXR0ZXJucykge1xuXHRcdFx0cmV0dXJuIG5ldyBKYXZhU2NyaXB0U2Nhbm5lcihwYXR0ZXJucywgX29wdGlvbnMpO1xuXHRcdH0sXG5cdFx0Y3JlYXRlU3RyaW5nKHMpIHtcblx0XHRcdHJldHVybiB7IGNvbnRlbnQ6IHMgfTtcblx0XHR9XG5cdH07XG59XG4vLyNlbmRyZWdpb25cbmV4cG9ydCB7IGNyZWF0ZUphdmFTY3JpcHRSZWdleEVuZ2luZSwgZGVmYXVsdEphdmFTY3JpcHRSZWdleENvbnN0cnVjdG9yIH07XG4iLCJpbXBvcnQgeyB0IGFzIEphdmFTY3JpcHRTY2FubmVyIH0gZnJvbSBcIi4vc2Nhbm5lci1EWDhMUkZHRS5tanNcIjtcbi8vI3JlZ2lvbiBzcmMvZW5naW5lLXJhdy50c1xuLyoqXG4qIFJhdyBKYXZhU2NyaXB0IHJlZ2V4IGVuZ2luZSB0aGF0IG9ubHkgc3VwcG9ydHMgcHJlY29tcGlsZWQgZ3JhbW1hcnMuXG4qXG4qIFRoaXMgZnVydGhlciBzaW1wbGlmaWVzIHRoZSBlbmdpbmUgYnkgZXhjbHVkaW5nIHRoZSByZWdleCBjb21waWxhdGlvbiBzdGVwLlxuKlxuKiBaZXJvIGRlcGVuZGVuY2llcy5cbiovXG5mdW5jdGlvbiBjcmVhdGVKYXZhU2NyaXB0UmF3RW5naW5lKCkge1xuXHRjb25zdCBvcHRpb25zID0ge1xuXHRcdGNhY2hlOiAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpLFxuXHRcdHJlZ2V4Q29uc3RydWN0b3I6ICgpID0+IHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkphdmFTY3JpcHRSYXdFbmdpbmU6IG9ubHkgc3VwcG9ydCBwcmVjb21waWxlZCBncmFtbWFyXCIpO1xuXHRcdH1cblx0fTtcblx0cmV0dXJuIHtcblx0XHRjcmVhdGVTY2FubmVyKHBhdHRlcm5zKSB7XG5cdFx0XHRyZXR1cm4gbmV3IEphdmFTY3JpcHRTY2FubmVyKHBhdHRlcm5zLCBvcHRpb25zKTtcblx0XHR9LFxuXHRcdGNyZWF0ZVN0cmluZyhzKSB7XG5cdFx0XHRyZXR1cm4geyBjb250ZW50OiBzIH07XG5cdFx0fVxuXHR9O1xufVxuLy8jZW5kcmVnaW9uXG5leHBvcnQgeyBjcmVhdGVKYXZhU2NyaXB0UmF3RW5naW5lIH07XG4iXSwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMSwyLDMsNCw1LDYsNyw4LDksMTAsMTEsMTJdLCJtYXBwaW5ncyI6IjtBQUNBLElBQU0sTUFBTTtBQUNaLElBQUksb0JBQW9CLE1BQU07Q0FDN0I7Q0FDQTtDQUNBO0NBQ0EsWUFBWSxVQUFVLFVBQVUsQ0FBQyxHQUFHO0VBQ25DLEtBQUssV0FBVztFQUNoQixLQUFLLFVBQVU7RUFDZixNQUFNLEVBQUUsWUFBWSxPQUFPLE9BQU8scUJBQXFCO0VBQ3ZELElBQUksQ0FBQyxrQkFBa0IsTUFBTSxJQUFJLE1BQU0sMkNBQTJDO0VBQ2xGLEtBQUssVUFBVSxTQUFTLEtBQUssTUFBTTtHQUNsQyxJQUFJLE9BQU8sTUFBTSxVQUFVLE9BQU87R0FDbEMsTUFBTSxTQUFTLE9BQU8sSUFBSSxDQUFDO0dBQzNCLElBQUksUUFBUTtJQUNYLElBQUksa0JB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QUFNLE9BQUssRUFBRSxLQUFLLENBQUM7Q0FBQyxDQUFDLEdBQUUsS0FBRyxFQUFFLFNBQVMsR0FBRSxNQUFJO0VBQUMsRUFBRSxPQUFLLGFBQVksRUFBRSxTQUFPLElBQUU7Q0FBQyxDQUFDO0NBQUUsTUFBTSxJQUFFLEtBQUcsRUFBRTtDQUFPLE9BQU07RUFBQyxRQUFPLEVBQUUsS0FBSSxNQUFHLEVBQUUsU0FBTyxrQkFBZ0JJLEtBQUcsR0FBRSxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSztFQUFFLE9BQU07Q0FBQztBQUFDO0FBQUMsU0FBU0QsSUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0NBQUMsTUFBSyxDQUFDLEdBQUUsS0FBRztDQUFFLElBQUcsTUFBSSxPQUFLLE1BQUksTUFBSztFQUFDLE1BQU0sSUFBRUUsSUFBRSxHQUFFLEdBQUUsQ0FBQztFQUFFLE9BQU07R0FBQyxRQUFPLEVBQUU7R0FBTyxXQUFVLEVBQUU7RUFBUztDQUFDO0NBQUMsSUFBRyxNQUFJLE1BQUs7RUFBQyxJQUFHLFdBQVcsU0FBUyxDQUFDLEdBQUUsT0FBTSxFQUFDLE9BQU1DLElBQUUsR0FBRSxDQUFDLEVBQUM7RUFBRSxJQUFHLFdBQVcsS0FBSyxDQUFDLEdBQUU7R0FBQyxJQUFHLENBQUMsMkJBQTJCLEtBQUssQ0FBQyxHQUFFLE1BQU0sSUFBSSxNQUFNLHVCQUF1QixFQUFFLEVBQUU7R0FBRSxPQUFNLEVBQUMsT0FBTUMsSUFBRSxDQUFDLEVBQUM7RUFBQztFQUFDLElBQUcsV0FBVyxLQUFLLENBQUMsR0FBRTtHQUFDLElBQUcsQ0FBQywyQkFBMkIsS0FBSyxDQUFDLEdBQUUsTUFBTSxJQUFJLE1BQU0sdUJBQXVCLEVBQUUsRUFBRTtHQUFFLE9BQU0sRUFBQyxPQUFNQyxJQUFFLENBQUMsRUFBQztFQUFDO0VBQUMsSUFBRyxNQUFJLEtBQUksT0FBTSxFQUFDLE9BQU1DLElBQUUsUUFBTyxDQUFDLEVBQUM7RUFBRSxJQUFHLE1BQUksT0FBSyxNQUFJLEtBQUksT0FBTSxFQUFDLE9BQU1DLElBQUUsV0FB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QUFFLElBQUcsRUFBRSxPQUFLLEtBQUk7RUFBQyxNQUFNLElBQUUsc0NBQXNDLEtBQUssQ0FBQztFQUFFLElBQUcsQ0FBQyxLQUFHLENBQUNTLEVBQUUsSUFBSSxFQUFFLE9BQU8sSUFBSSxHQUFFLE1BQU0sSUFBSSxNQUFNLHdCQUF3QixFQUFFLEVBQUU7RUFBRSxPQUFPVixJQUFFLFNBQVEsR0FBRTtHQUFDLE9BQU0sRUFBRSxPQUFPO0dBQUssUUFBTyxDQUFDLENBQUMsRUFBRSxPQUFPO0VBQU0sQ0FBQztDQUFDO0NBQUMsT0FBTyxNQUFJLE1BQUlXLElBQUUsQ0FBQyxJQUFFLE1BQUksT0FBSyxFQUFFLENBQUMsSUFBRSxFQUFFTCxJQUFFLENBQUMsR0FBRSxDQUFDO0FBQUM7QUFBQyxTQUFTTCxJQUFFLEdBQUUsRUFBQyxhQUFZLEtBQUc7Q0FBQyxNQUFNLElBQUUsRUFBRTtDQUFHLElBQUcsTUFBSSxPQUFLLE1BQUksS0FBSSxPQUFPLEVBQUUsQ0FBQztDQUFFLElBQUcsV0FBVyxTQUFTLENBQUMsR0FBRSxPQUFPLEVBQUUsQ0FBQztDQUFFLElBQUcsRUFBRSxXQUFXLEdBQUMsS0FBSyxHQUFFLE1BQU0sSUFBSSxNQUFNLHlEQUF5RCxFQUFFLEVBQUU7Q0FBRSxJQUFHLFlBQVksS0FBSyxDQUFDLEdBQUU7RUFBQyxJQUFHLEVBQUUsV0FBUyxHQUFFLE1BQU0sSUFBSSxNQUFNLDJDQUEyQyxFQUFFLEVBQUU7RUFBRSxPQUFPVyxJQUFFLENBQUM7Q0FBQztDQUFDLElBQUcsMEJBQTBCLEtBQUssQ0FBQyxHQUFFLElBQUc7RUFBQyxNQUFNLElBQUUsRUFBRSxNQUFNLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSSxNQUFHLFNBQVMsR0FBRSxFQUFFLENBQUMsR0FBRSxJQUFFLElBQUksWUFBWSxTQUFRO0dBQUMsV0FBVSxDQUFDO0dBQUUsT0FBTSxDQUFDO0VBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxDQUFDLEdBQUUsSUFBRSxJQUFJLFlBQVU7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QUFNLGtDQUFrQyxFQUFFLEVBQUU7Q0FBQztDQUFDLE9BQU9GLElBQUUsR0FBRSxLQUFHLE1BQUssR0FBRyxNQUFNLEdBQUcsS0FBRyxNQUFLLENBQUM7QUFBQztBQUFDLFNBQVNHLElBQUUsR0FBRTtDQUFDLElBQUksSUFBRSxNQUFLLEdBQUU7Q0FBRSxJQUFHLEVBQUUsT0FBSyxLQUFJO0VBQUMsTUFBSyxFQUFDLFFBQU8sR0FBRSxRQUFPLE1BQUcsd0NBQXdDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBTyxJQUFFO0VBQUksSUFBRyxDQUFDLElBQUUsS0FBRyxLQUFHLENBQUMsSUFBRSxHQUFFLE1BQU0sSUFBSSxNQUFNLDJDQUEyQztFQUFFLElBQUcsSUFBRSxDQUFDLEdBQUUsSUFBRSxNQUFJLEtBQUssSUFBRSxDQUFDLElBQUUsTUFBSSxLQUFHLFdBQUksQ0FBQyxHQUFFLElBQUUsTUFBSSxJQUFFLGNBQWEsQ0FBQyxHQUFFLEtBQUcsQ0FBQyxHQUFFLENBQUMsSUFBRyxFQUFFLFNBQVMsR0FBRyxHQUFFO0dBQUMsSUFBRyxNQUFJLGNBQWEsTUFBTSxJQUFJLE1BQU0sNkRBQTJEO0dBQUUsSUFBRTtFQUFNLE9BQU0sTUFBSSxJQUFFO0NBQVMsT0FBTSxJQUFFLEVBQUUsT0FBSyxNQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsT0FBSyxNQUFJLElBQUUsVUFBSSxJQUFFLEVBQUUsT0FBSyxNQUFJLGVBQWEsRUFBRSxPQUFLLE1BQUksU0FBTztDQUFTLE9BQU9GLElBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFDO0FBQUMsU0FBUyxFQUFFLEdBQUU7Q0FBQyxNQUFNLElBQUUsRUFBRSxFQUFFLENBQUMsWUFBWTtDQUFFLE9BQU9sQixJQUFFO0VBQUMsR0FBRTtFQUFRLEdBQUU7RUFBTSxHQUFFO0VBQVEsR0FBRTtDQUFNLEVBQUUsSUFBRyxHQUFFLEVBQUMsUUFBTyxFQUFFLE9BQUssRUFBQyxDQUFDO0FBQUM7QUFBQyxTQUFTWSxJQUFFLEdBQUU7Q0FBQyxNQUFLLEVBQUMsR0FBRSxHQUFFLEtBQUksR0FBRSxPQUFNLE1BQUcsNENBQTRDLEtBQUssQ0FBQyxDQUFDLENBQUM7Q0FBTyxPQUFPWixJQUFFLFlBQVcsR0FBRTtFQUFDLE9BQU07RUFBRSxRQUFPLE1BQUksT0FBSyxDQUFDLEtBQUcsTUFBSSxPQUFLLENBQUMsQ0FBQztDQUFDLENBQUM7QUFBQztBQUFDLFNBQVMsRUFBRSxHQUFFO0NBQUMsTUFBTSxJQUFFLENBQUM7Q0FBRSxPQUFPLEVBQUUsU0FBUyxHQUFHLE1BQUksRUFBRSxhQUFXLENBQUMsSUFBRyxFQUFFLFNBQVMsR0FBRyxNQUFJLEVBQUUsU0FBTyxDQUFDLElBQUcsRUFBRSxTQUFTLEdBQUcsTUFBSSxFQUFFLFdBQVMsQ0FBQyxJQUFHLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFPLElBQUU7QUFBSTtBQUFDLFNBQVMsRUFBRSxHQUFFO0NBQUMsTUFBTSxJQUFFO0VBQUMsWUFBVyxDQUFDO0VBQUUsUUFBTyxDQUFDO0VBQUUsVUFBUyxDQUFDO0VBQUUsY0FBYSxDQUFDO0VBQUUsY0FBYSxDQUFDO0VBQUUsY0FBYSxDQUFDO0VBQUUsYUFBWSxDQUFDO0VBQUUsaUJBQWdCO0NBQUk7Q0FBRSxLQUFJLElBQUksSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUk7RUFBQyxNQUFNLElBQUUsRUFBRTtFQUFHLElBQUcsQ0FBQyxXQUFXLFNBQVMsQ0FBQyxHQUFFLE1BQU0sSUFBSSxNQUFNLGlCQUFpQixFQUFFLEVBQUU7RUFBRSxJQUFHLE1BQUksS0FBSTtHQUFDLElBQUcsQ0FBQyxXQUFXLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFFLE1BQU0sSUFBSSxNQUFNLHdDQUFzQztHQUFFLEVBQUUsa0JBQWdCLEVBQUUsSUFBRSxPQUFLLE1BQUksYUFBVyxRQUFPLEtBQUc7R0FBRTtFQUFRO0VBQUMsRUFBRTtHQUFDLEdBQUU7R0FBYSxHQUFFO0dBQVMsR0FBRTtHQUFXLEdBQUU7R0FBZSxHQUFFO0dBQWUsR0FBRTtHQUFlLEdBQUU7RUFBYSxFQUFFLE1BQUksQ0FBQztDQUFDO0NBQUMsT0FBTztBQUFDO0FBQUMsU0FBU2EsSUFBRSxHQUFFO0NBQUMsSUFBRyxrRUFBa0UsS0FBSyxDQUFDLEdBQUUsTUFBTSxJQUFJLE1BQU0saUNBQWlDLEVBQUUsRUFBRTtDQUFFLE1BQU0sSUFBRSxFQUFFLE9BQUssTUFBSSw4QkFBOEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLE1BQUksRUFBRSxNQUFNLENBQUM7Q0FBRSxPQUFPLFNBQVMsR0FBRSxFQUFFO0FBQUM7QUFBQyxTQUFTbkIsS0FBRyxHQUFFLEdBQUU7Q0FBQyxNQUFLLEVBQUMsS0FBSSxHQUFFLGFBQVksTUFBRyxHQUFFLElBQUUsRUFBRSxNQUFNLENBQUM7Q0FBRSxJQUFHLENBQUMsTUFBSSxNQUFJLE9BQUssRUFBRSxXQUFTLEtBQUcsRUFBRSxPQUFLLE9BQUssQ0FBQyxLQUFHLElBQUcsT0FBTSxDQUFDSSxJQUFFLENBQUMsQ0FBQztDQUFFLE1BQU0sSUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLE1BQU0sYUFBYTtDQUFFLEtBQUksSUFBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sS0FBSTtFQUFDLE1BQU0sSUFBRSxFQUFFO0VBQUcsSUFBSTtFQUFFLElBQUcsTUFBSSxLQUFHLE1BQUksT0FBSyxNQUFJO09BQVEsSUFBRSxTQUFTLEdBQUUsQ0FBQyxHQUFFLElBQUUsS0FBSSxNQUFNLElBQUksTUFBTSxHQUFDLDZDQUE2QyxFQUFFLEVBQUU7RUFBQSxPQUFPLElBQUVRLElBQUUsQ0FBQztFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUcsTUFBSSxJQUFFLE9BQUssTUFBSSxDQUFDLENBQUM7Q0FBQztDQUFDLE9BQU87QUFBQztBQUFDLFNBQVNELEtBQUcsR0FBRTtDQUFDLE1BQU0sSUFBRSxDQUFDLEdBQUUsSUFBRSxJQUFJLE9BQU9oQixLQUFFLElBQUk7Q0FBRSxJQUFJO0NBQUUsT0FBSyxJQUFFLEVBQUUsS0FBSyxDQUFDLElBQUc7RUFBQyxNQUFNLElBQUUsRUFBRTtFQUFHLElBQUcsRUFBRSxPQUFLLEtBQUk7R0FBQyxNQUFNLElBQUUsbUNBQW1DLEtBQUssQ0FBQztHQUFFLElBQUcsR0FBRTtJQUFDLE1BQUssRUFBQyxLQUFJLEdBQUUsS0FBSSxNQUFHLEVBQUU7SUFBTyxJQUFHLENBQUMsSUFBRSxDQUFDLEtBQUcsRUFBRSxTQUFTLEdBQUcsR0FBRTtLQUFDLEVBQUUsYUFBWSxFQUFFLEtBQUsrQixJQUFFLEVBQUUsTUFBTSxHQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQUU7SUFBUTtHQUFDO0VBQUM7RUFBQyxFQUFFLEtBQUtBLElBQUUsQ0FBQyxDQUFDO0NBQUM7Q0FBQyxPQUFPO0FBQUM7OztBQ2hDcm1RLFNBQVMsRUFBRSxHQUFFLEdBQUU7Q0FBQyxJQUFHLENBQUMsTUFBTSxRQUFRLEVBQUUsSUFBSSxHQUFFLE1BQU0sSUFBSSxNQUFNLCtCQUErQjtDQUFFLElBQUcsRUFBRSxLQUFLLFdBQVMsR0FBRSxPQUFNLENBQUM7Q0FBRSxNQUFNLElBQUUsRUFBRSxLQUFLO0NBQUcsT0FBTSxDQUFDLEtBQUcsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU0sTUFBRyxFQUFFLE9BQUssRUFBRSxFQUFFO0FBQUM7QUFBb0wsU0FBUyxFQUFFLEdBQUU7Q0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUk7QUFBQztBQUFDLElBQU0sb0JBQUUsSUFBSSxJQUFJO0NBQUM7Q0FBa0I7Q0FBZ0I7Q0FBaUI7Q0FBWTtDQUFpQjtDQUFlO0NBQVE7Q0FBYTtBQUFZLENBQUM7OztBQ0EzUyxTQUFTLEVBQUUsR0FBRSxJQUFFLENBQUMsR0FBRTtDQUFDLE1BQU0sSUFBRTtFQUFDLE9BQU07RUFBRywrQkFBOEIsQ0FBQztFQUFFLHVCQUFzQixDQUFDO0VBQUUsMEJBQXlCLENBQUM7RUFBRSw0QkFBMkIsQ0FBQztFQUFFLG9CQUFtQjtFQUFLLEdBQUc7RUFBRSxPQUFNO0dBQUMsY0FBYSxDQUFDO0dBQUUsWUFBVyxDQUFDO0dBQUUsR0FBRyxFQUFFO0VBQUs7Q0FBQyxHQUFFLElBQUVDLElBQUUsR0FBRTtFQUFDLE9BQU0sRUFBRTtFQUFNLE9BQU07R0FBQyxjQUFhLEVBQUUsTUFBTTtHQUFhLFlBQVcsRUFBRSxNQUFNO0VBQVU7Q0FBQyxDQUFDLEdBQUUsS0FBRyxHQUFFLE1BQUk7RUFBQyxNQUFNLElBQUUsRUFBRSxPQUFPLEVBQUU7RUFBVyxRQUFPLEVBQUUsU0FBTyxHQUFFLEVBQUUsYUFBWSxFQUFFLE1BQWxDO0dBQXdDLEtBQUksY0FBYSxPQUFPLEVBQUU7R0FBRSxLQUFJLGFBQVksT0FBTyxFQUFFLENBQUM7R0FBRSxLQUFJLGlCQUFnQixPQUFPLEVBQUUsR0FBRSxDQUFDO0dBQUUsS0FBSSxhQUFZLE9BQU8sRUFBRSxFQUFFLE9BQU0sRUFBQyxjQUFhLENBQUMsQ0FBQyxFQUFFLG1CQUFrQixDQUFDO0dBQUUsS0FBSSx3QkFBdUIsT0FBTyxHQUFHLEdBQUUsR0FBRSxDQUFDO0dBQUUsS0FBSSxzQkFBcUIsT0FBTyxHQUFHLEdBQUUsR0FBRSxDQUFDO0dBQUUsS0FBSSxnQkFBZSxPQUFPLEdBQUcsR0FBRSxDQUFDO0dBQUUsS0FBSSxhQUFZLE9BQU8sRUFBRSxFQUFFLE1BQUssRUFBQyxPQUFNLEVBQUUsTUFBSyxDQUFDO0dBQUUsS0FBSSxhQUFZLE9BQU8sR0FBRyxHQUFFLEdBQUUsQ0FBQztHQUFFLEtBQUksZ0JBQWUsT0FBTyxFQUFFLEVBQUUsTUFBSyxFQUFFLEtBQUksRUFBRSxTQUFTO0dBQUUsS0FBSSxjQUFhLE9BQU8sR0FBRyxHQUFFLENBQUM7R0FBRSxLQUFJLGNBQWEsT0FBTyxHQUFHLEdBQUUsQ0FBQztHQUFFLFNBQVEsTUFBTSxJQUFJLE1BQU0sMEJBQTBCLEVBQUUsS0FBSyxFQUFFO0VBQUM7Q0FBQyxHQUFFLElBQUU7RUFBQyxpQkFBZ0IsQ0FBQztFQUFFLGdCQUFlLENBQUM7RUFBRSxtQ0FBa0IsSUFBSSxJQUFFO0VBQUUsV0FBVTtFQUFFLCtCQUE4QixFQUFFO0VBQThCLFFBQU87RUFBSyx1QkFBc0IsRUFBRTtFQUFzQiwwQkFBeUIsRUFBRTtFQUF5Qiw0QkFBMkIsRUFBRTtFQUEyQixhQUFZLENBQUM7RUFBRSxRQUFPLEVBQUU7RUFBTyxvQkFBbUIsRUFBRTtFQUFtQixNQUFLO0NBQUMsR0FBRSxJQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQztDQUFFLElBQUksSUFBRSxFQUFFLEtBQUs7Q0FBRyxPQUFLLEVBQUUsWUFBVSxFQUFFLE9BQU8sU0FBUTtFQUFDLE1BQU0sSUFBRSxFQUFFLEdBQUUsQ0FBQyxDQUFDO0VBQUUsRUFBRSxTQUFPLGlCQUFlLEVBQUUsS0FBSyxLQUFLLENBQUMsR0FBRSxJQUFFLEtBQUcsRUFBRSxLQUFLLEtBQUssQ0FBQztDQUFDO0NBQUMsTUFBSyxFQUFDLGlCQUFnQixHQUFFLGdCQUFlLEdBQUUsbUJBQWtCLEdBQUUsYUFBWSxNQUFHO0NBQUUsSUFBRyxLQUFHLEVBQUUsUUFBTSxDQUFDLEVBQUUsTUFBTSxjQUFhLE1BQU0sSUFBSSxNQUFNLGtFQUFrRTtDQUFFLEtBQUksTUFBSyxFQUFDLEtBQUksT0FBSyxHQUFFLElBQUcsT0FBTyxLQUFHLFVBQVM7RUFBQyxJQUFHLElBQUUsRUFBRSxRQUFPLE1BQU0sSUFBSSxNQUFNLG1EQUFtRDtFQUFFLE1BQUksRUFBRSxJQUFFLEVBQUUsQ0FBQyxnQkFBYyxDQUFDO0NBQUUsT0FBTSxJQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUU7RUFBQyxJQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFPLEdBQUUsTUFBTSxJQUFJLE1BQU0sR0FBQyw4Q0FBOEMsRUFBRSxHQUFHO0VBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxnQkFBYyxDQUFDO0NBQUMsT0FBTSxNQUFNLElBQUksTUFBTSxHQUFDLHVEQUF1RCxFQUFFLEdBQUc7Q0FBRSxPQUFPO0FBQUM7QUFBQyxTQUFTLEVBQUUsRUFBQyxNQUFLLEtBQUc7Q0FBQyxPQUFPLEVBQUVDLEVBQUU7RUFBQyxLQUFJO0VBQWEsR0FBRTtFQUFXLE9BQU07RUFBZSxPQUFNO0VBQWdCLE9BQU07RUFBZ0IsT0FBTTtFQUFlLE9BQU07RUFBd0IsT0FBTTtFQUF3QixPQUFNO0VBQWEsT0FBTTtDQUFvQixFQUFFLElBQUcsOEJBQThCLEVBQUUsRUFBRSxHQUFFLEVBQUMsUUFBTyxNQUFJLEdBQUMsUUFBTSxNQUFJLEdBQUMsS0FBSSxDQUFDO0FBQUM7QUFBQyxTQUFTLEVBQUUsRUFBQyxLQUFJLEtBQUcsR0FBRTtDQUFDLE1BQU0sSUFBRSxXQUFXLEtBQUssQ0FBQyxHQUFFLElBQUUsSUFBRSxFQUFFLE1BQU0sR0FBRSxFQUFFLElBQUUsRUFBRSxNQUFNLENBQUMsR0FBRSxLQUFHLEdBQUUsSUFBRSxDQUFDLE1BQUk7RUFBQyxNQUFNLElBQUUsRUFBRSxnQkFBZ0I7RUFBTyxJQUFJLElBQUUsQ0FBQztFQUFFLElBQUcsSUFBRSxHQUFFLElBQUcsRUFBRSx1QkFBc0IsSUFBRSxDQUFDO09BQU8sTUFBTSxJQUFJLE1BQU0sb0RBQW9ELEVBQUUsRUFBRTtFQUFFLE9BQU8sRUFBRSxpQkFBZSxDQUFDLEdBQUUsRUFBRSxJQUFFLElBQUUsSUFBRSxJQUFFLEdBQUUsRUFBQyxRQUFPLEVBQUMsQ0FBQztDQUFDO0NBQUUsSUFBRyxHQUFFO0VBQUMsTUFBTSxJQUFFLGtDQUFrQyxLQUFLLENBQUM7RUFBRSxJQUFHLEdBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEtBQUksQ0FBQyxDQUFDLEVBQUUsT0FBTyxJQUFJO0VBQUUsSUFBRyxPQUFPLEtBQUssQ0FBQyxHQUFFLE1BQU0sSUFBSSxNQUFNLHlCQUF5QixFQUFFLEVBQUU7RUFBRSxJQUFHLENBQUMsRUFBRSxrQkFBa0IsSUFBSSxDQUFDLEdBQUUsTUFBTSxJQUFJLE1BQU0sdUNBQXVDLEVBQUUsRUFBRTtFQUFFLE9BQU8sRUFBRSxDQUFDO0NBQUM7Q0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQUM7QUFBQyxTQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUU7Q0FBQyxNQUFLLEVBQUMsUUFBTyxHQUFFLE1BQUssTUFBRyxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUUsRUFBRSxLQUFLLEdBQUcsRUFBRSxHQUFFLElBQUUsRUFBRSxFQUFFO0NBQVcsSUFBRyxDQUFDLEVBQUUsc0JBQW9CLEtBQUcsRUFBRSxTQUFPLG9CQUFrQixFQUFFLFNBQU8seUJBQXVCLEtBQUcsRUFBRSxTQUFPLHdCQUFzQixFQUFFLFNBQU8seUJBQXVCLEVBQUUsU0FBTyw2QkFBNEI7RUFBQyxNQUFNLElBQUUsRUFBRSxHQUFFO0dBQUMsR0FBRztHQUFFLG9CQUFtQixDQUFDO0VBQUMsQ0FBQztFQUFFLElBQUcsRUFBRSxTQUFPLGVBQWEsRUFBRSxTQUFPLGFBQVksT0FBTyxFQUFFLEtBQUssSUFBSSxHQUFFLEVBQUUsR0FBRSxDQUFDO0VBQUUsTUFBTSxJQUFJLE1BQU0sK0JBQStCO0NBQUM7Q0FBQyxPQUFPLEVBQUVDLElBQUUsR0FBRyxDQUFDO0FBQUM7QUFBQyxTQUFTLEdBQUcsRUFBQyxRQUFPLEtBQUcsR0FBRSxHQUFFO0NBQUMsTUFBSyxFQUFDLFFBQU8sR0FBRSxNQUFLLE1BQUcsR0FBRSxJQUFFLENBQUMsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLEVBQUU7Q0FBVyxJQUFJLElBQUUsRUFBRSxDQUFDO0NBQUUsT0FBSyxFQUFFLFNBQU8sd0JBQXVCO0VBQUMsSUFBRyxFQUFFLFNBQU8sNkJBQTRCLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRSxFQUFFO09BQWdCO0dBQUMsTUFBTSxJQUFFLEVBQUUsR0FBRyxFQUFFO0dBQUUsRUFBRSxLQUFLLEtBQUssRUFBRSxHQUFFLENBQUMsQ0FBQztFQUFDO0VBQUMsSUFBRSxFQUFFLEVBQUUsRUFBRSxZQUFXLENBQUM7Q0FBQztDQUFDLE1BQU0sSUFBRSxFQUFFLEVBQUMsUUFBTyxFQUFDLENBQUM7Q0FBRSxPQUFPLEVBQUUsV0FBUyxJQUFFLEVBQUUsT0FBSyxFQUFFLEVBQUUsQ0FBQyxRQUFNLEVBQUUsT0FBSyxnQkFBZSxFQUFFLE9BQUssRUFBRSxLQUFJLE1BQUcsRUFBRSxLQUFLLFdBQVMsSUFBRSxFQUFFLEtBQUssS0FBRyxDQUFDLElBQUcsRUFBRSxhQUFZO0FBQUM7QUFBQyxTQUFTLEdBQUcsRUFBQyxNQUFLLEdBQUUsUUFBTyxHQUFFLE9BQU0sS0FBRyxHQUFFO0NBQUMsTUFBSyxFQUFDLCtCQUE4QkMsS0FBRSw0QkFBMkIsR0FBRSxvQkFBbUIsTUFBRztDQUFFLElBQUcsTUFBSSxZQUFXO0VBQUMsTUFBTSxJQUFFLEVBQUUsQ0FBQztFQUFFLElBQUdDLEVBQUUsSUFBSSxDQUFDLEtBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFFLElBQUUsU0FBUSxJQUFFO09BQU8sT0FBTyxFQUFFLEdBQUU7R0FBQyxRQUFPO0dBQUUsK0JBQThCRDtHQUFFLDRCQUEyQjtHQUFFLG9CQUFtQjtFQUFDLENBQUM7Q0FBQztDQUFDLE9BQU8sTUFBSSxVQUFRLEVBQUUsR0FBRSxFQUFDLFFBQU8sRUFBQyxDQUFDLElBQUUsRUFBRSxHQUFFLEVBQUMsUUFBTyxFQUFDLENBQUM7QUFBQztBQUFDLFNBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRTtDQUFDLE1BQUssRUFBQyxRQUFPLEdBQUUsaUJBQWdCLEdBQUUsbUJBQWtCLEdBQUUsMEJBQXlCLEdBQUUsTUFBSyxNQUFHLEdBQUUsSUFBRSxHQUFHLENBQUMsR0FBRSxJQUFFLEVBQUUsU0FBTyxtQkFBa0IsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEtBQUcsRUFBRTtDQUFPLElBQUcsRUFBRSxTQUFPLHFCQUFtQixFQUFFLEtBQUssQ0FBQyxHQUFFLEVBQUUsUUFBTUUsSUFBRSxHQUFFLEVBQUUsTUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFHLEtBQUcsRUFBRSxxQkFBb0IsTUFBTSxJQUFJLE1BQU0sb0RBQW9EO0NBQUUsSUFBSSxJQUFFLEVBQUUsRUFBRSxFQUFFLFVBQVU7Q0FBRSxPQUFLLEVBQUUsU0FBTyxlQUFjO0VBQUMsSUFBRyxFQUFFLFNBQU8sY0FBYSxFQUFFLEtBQUssS0FBSyxFQUFFLENBQUMsR0FBRSxFQUFFO09BQWdCO0dBQUMsTUFBTSxJQUFFLEVBQUUsS0FBSyxHQUFHLEVBQUUsR0FBRSxJQUFFLEVBQUUsR0FBRTtJQUFDLEdBQUc7SUFBRSxxQkFBb0IsRUFBRSx1QkFBcUI7SUFBRSxnQkFBZSxFQUFFLGtCQUFnQjtJQUFFLG1CQUFrQixFQUFFLHFCQUFtQjtHQUFDLENBQUM7R0FBRSxJQUFHLEVBQUUsS0FBSyxLQUFLLENBQUMsSUFBRyxLQUFHLEVBQUUsbUJBQWlCLENBQUMsR0FBRTtJQUFDLE1BQU0sSUFBRTtJQUF5RCxJQUFHLEtBQUcsRUFBRTtTQUFzQixFQUFFLENBQUMsS0FBRyxFQUFFLFNBQU8sa0JBQWlCLE1BQU0sSUFBSSxNQUFNLENBQUM7SUFBQSxPQUFPLElBQUcsRUFBRSxDQUFDLEtBQUcsRUFBRSxDQUFDLEtBQUcsRUFBRSxRQUFPLE1BQU0sSUFBSSxNQUFNLENBQUM7R0FBQztFQUFDO0VBQUMsSUFBRSxFQUFFLEVBQUUsRUFBRSxVQUFVO0NBQUM7Q0FBQyxPQUFPLEVBQUUsYUFBWTtBQUFDO0FBQUMsU0FBUyxHQUFHLEVBQUMsTUFBSyxHQUFFLEtBQUksR0FBRSxLQUFJLEtBQUcsR0FBRTtDQUFDLE1BQU0sSUFBRSxFQUFFLFFBQU8sSUFBRSxFQUFFLEtBQUssR0FBRyxFQUFFO0NBQUUsSUFBRyxDQUFDLEtBQUcsQ0FBQ0MsRUFBRSxDQUFDLEdBQUUsTUFBTSxJQUFJLE1BQU0sd0NBQXdDO0NBQUUsTUFBTSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztDQUFFLE9BQU8sRUFBRSxLQUFLLElBQUksR0FBRTtBQUFDO0FBQUMsU0FBUyxHQUFHLEVBQUMsS0FBSSxLQUFHLEdBQUU7Q0FBQyxNQUFLLEVBQUMsaUJBQWdCLEdBQUUsYUFBWSxNQUFHO0NBQUUsSUFBSSxJQUFFLEVBQUUsTUFBTSxHQUFFLEVBQUU7Q0FBRSxNQUFNLElBQUUscUNBQXFDLEtBQUssQ0FBQztDQUFFLElBQUcsR0FBRTtFQUFDLE1BQU0sSUFBRSxDQUFDLEVBQUUsT0FBTyxLQUFJLElBQUUsRUFBRTtFQUFPLElBQUcsRUFBRSxpQkFBZSxDQUFDLEdBQUUsSUFBRTtHQUFDLElBQUc7R0FBRSxLQUFJLElBQUU7R0FBRSxLQUFJLElBQUUsSUFBRTtFQUFDLEVBQUUsRUFBRSxPQUFPLE9BQU0sSUFBRSxHQUFFLE1BQU0sSUFBSSxNQUFNLDJCQUEyQjtDQUFDLE9BQU0sTUFBSSxRQUFNLElBQUU7Q0FBRyxNQUFNLElBQUUsRUFBRSxDQUFDO0NBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxHQUFFO0FBQUM7QUFBQyxTQUFTLEVBQUUsR0FBRSxHQUFFO0NBQUMsSUFBRyxNQUFJLFlBQVcsTUFBTSxJQUFJLE1BQU0scUNBQXFDLEVBQUUsRUFBRTtDQUFFLE9BQU07RUFBQyxNQUFLO0VBQWtCLE1BQUs7RUFBRSxNQUFLLEVBQUUsR0FBRyxJQUFJO0NBQUM7QUFBQztBQUFDLFNBQVMsRUFBRSxHQUFFO0NBQUMsT0FBTTtFQUFDLE1BQUs7RUFBYyxNQUFLLEVBQUUsR0FBRyxJQUFJO0NBQUM7QUFBQztBQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUU7Q0FBQyxNQUFNLElBQUU7RUFBQyxNQUFLO0VBQVksTUFBSztDQUFDO0NBQUUsUUFBTyxNQUFJLG1CQUFpQixNQUFJLDZCQUEyQixFQUFFLFNBQU8sQ0FBQyxDQUFDLEdBQUcsU0FBUTtBQUFDO0FBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRTtDQUFDLE1BQU0sSUFBRSxDQUFDLENBQUMsR0FBRztDQUFPLE9BQU07RUFBQyxNQUFLO0VBQWdCLEtBQUk7RUFBRSxHQUFHLEtBQUcsRUFBQyxRQUFPLEVBQUM7Q0FBQztBQUFDO0FBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRTtDQUFDLE1BQU0sSUFBRTtFQUFDLE1BQUssS0FBSztFQUFFLGVBQWMsQ0FBQztFQUFFLEdBQUc7Q0FBQztDQUFFLElBQUcsRUFBRSxTQUFPLEtBQUssS0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLEdBQUUsTUFBTSxJQUFJLE1BQU0sZUFBZSxFQUFFLEtBQUssdUJBQXVCO0NBQUUsT0FBTTtFQUFDLE1BQUs7RUFBaUIsUUFBTztFQUFFLEdBQUcsRUFBRSxRQUFNLEVBQUMsTUFBSyxFQUFFLEtBQUk7RUFBRSxHQUFHLEVBQUUsaUJBQWUsRUFBQyxlQUFjLEVBQUUsY0FBYTtFQUFFLE1BQUssRUFBRSxHQUFHLElBQUk7Q0FBQztBQUFDO0FBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRTtDQUFDLE1BQU0sSUFBRTtFQUFDLGNBQWEsQ0FBQztFQUFFLEdBQUc7Q0FBQztDQUFFLElBQUcsSUFBRSxTQUFRO0VBQUMsTUFBTSxJQUFFLEVBQUUsU0FBUyxFQUFFO0VBQUUsSUFBRyxFQUFFLGNBQWEsSUFBRTtPQUFhLE1BQU0sSUFBRSwwQkFBUSxJQUFJLE1BQU0sd0NBQXdDLEVBQUUsR0FBRyxvQkFBRSxJQUFJLE1BQU0sOENBQThDLEVBQUUsR0FBRztDQUFDO0NBQUMsT0FBTTtFQUFDLE1BQUs7RUFBWSxPQUFNO0NBQUM7QUFBQztBQUFDLFNBQVMsRUFBRSxHQUFFO0NBQUMsTUFBTSxJQUFFO0VBQUMsTUFBSztFQUFRLFFBQU8sQ0FBQztFQUFFLEdBQUc7Q0FBQztDQUFFLE9BQU07RUFBQyxNQUFLO0VBQWlCLE1BQUssRUFBRTtFQUFLLFFBQU8sRUFBRTtFQUFPLE1BQUssRUFBRSxHQUFHLElBQUk7Q0FBQztBQUFDO0FBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRTtDQUFDLElBQUcsRUFBRSxRQUFNLEVBQUUsT0FBTSxNQUFNLElBQUksTUFBTSxvQ0FBb0M7Q0FBRSxPQUFNO0VBQUMsTUFBSztFQUFzQixLQUFJO0VBQUUsS0FBSTtDQUFDO0FBQUM7QUFBQyxTQUFTLEVBQUUsR0FBRSxHQUFFO0NBQUMsTUFBTSxJQUFFLENBQUMsQ0FBQyxHQUFHLFFBQU8sSUFBRTtFQUFDLE1BQUs7RUFBZSxNQUFLO0NBQUM7Q0FBRSxRQUFPLE1BQUksV0FBUyxNQUFJLFNBQU8sTUFBSSxhQUFXLE1BQUksV0FBUyxNQUFJLFlBQVUsRUFBRSxTQUFPLEtBQUksTUFBSSxrQkFBZ0IsTUFBSSxhQUFXLENBQUMsT0FBSyxFQUFFLGlCQUFlLENBQUMsSUFBRztBQUFDO0FBQUMsU0FBUyxFQUFFLEdBQUUsSUFBRSxDQUFDLEdBQUU7Q0FBQyxJQUFHLE1BQUksUUFBTyxPQUFNO0VBQUMsTUFBSztFQUFZLE1BQUs7Q0FBQztDQUFFLElBQUcsTUFBSSxTQUFRLE9BQU07RUFBQyxNQUFLO0VBQVksTUFBSztFQUFFLE9BQU1MLEVBQUUsRUFBRSxLQUFLO0NBQUM7Q0FBRSxNQUFNLElBQUksTUFBTSw4QkFBOEIsRUFBRSxFQUFFO0FBQUM7QUFBQyxTQUFTLEVBQUUsR0FBRTtDQUFDLE9BQU07RUFBQyxNQUFLO0VBQVEsR0FBRztDQUFDO0FBQUM7QUFBQyxTQUFTLEVBQUUsR0FBRTtDQUFDLE1BQU0sSUFBRSxHQUFHLFFBQU8sSUFBRSxHQUFHO0NBQU0sSUFBRyxLQUFHLEdBQUUsTUFBTSxJQUFJLE1BQU0sZ0NBQWdDO0NBQUUsT0FBTTtFQUFDLE1BQUs7RUFBUSxHQUFHLEtBQUcsRUFBQyxRQUFPLEVBQUM7RUFBRSxHQUFHLEtBQUcsRUFBQyxPQUFNLEVBQUM7RUFBRSxNQUFLLEVBQUUsR0FBRyxJQUFJO0NBQUM7QUFBQztBQUFDLFNBQVMsRUFBRSxHQUFFO0NBQUMsTUFBTSxJQUFFO0VBQUMsUUFBTyxDQUFDO0VBQUUsUUFBTyxDQUFDO0VBQUUsR0FBRztDQUFDO0NBQUUsT0FBTTtFQUFDLE1BQUs7RUFBc0IsTUFBSyxFQUFFLFNBQU8sZUFBYTtFQUFZLFFBQU8sRUFBRTtFQUFPLE1BQUssRUFBRSxHQUFHLElBQUk7Q0FBQztBQUFDO0FBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0NBQUMsT0FBTTtFQUFDLE1BQUs7RUFBZSxNQUFLO0VBQUUsS0FBSTtFQUFFLFdBQVU7Q0FBQztBQUFDO0FBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRTtDQUFDLE1BQU0sSUFBRSxDQUFDLENBQUMsR0FBRztDQUFPLElBQUcsQ0FBQ0csRUFBRSxJQUFJLENBQUMsR0FBRSxNQUFNLElBQUksTUFBTSx3QkFBd0IsRUFBRSxFQUFFO0NBQUUsT0FBTTtFQUFDLE1BQUs7RUFBZSxNQUFLO0VBQVEsT0FBTTtFQUFFLFFBQU87Q0FBQztBQUFDO0FBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7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QUFDLFNBQVMsRUFBRSxHQUFFLEdBQUU7Q0FBQyxNQUFNLElBQUU7Q0FBRSxPQUFPSCxFQUFFLEdBQUUsMkJBQTJCLEdBQUcsU0FBTyxlQUFhLEVBQUUsVUFBUSxNQUFJLEVBQUUsUUFBTSxNQUFJLDBCQUFzQixJQUFJO0FBQUM7QUFBQyxTQUFTLEVBQUUsR0FBRTtDQUFDLE9BQU9BLEVBQUUsR0FBRSxnQkFBZ0I7QUFBQzs7O0FDQTd4VCxTQUFTLEVBQUUsR0FBRSxHQUFFLElBQUUsTUFBSztDQUFDLFNBQVMsRUFBRSxHQUFFLEdBQUU7RUFBQyxLQUFJLElBQUksSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUk7R0FBQyxNQUFNLElBQUUsRUFBRSxFQUFFLElBQUcsR0FBRSxHQUFFLENBQUM7R0FBRSxJQUFFLEtBQUssSUFBSSxJQUFHLElBQUUsQ0FBQztFQUFDO0NBQUM7Q0FBQyxTQUFTLEVBQUUsR0FBRSxJQUFFLE1BQUssSUFBRSxNQUFLLElBQUUsTUFBSztFQUFDLElBQUksSUFBRSxHQUFFLElBQUUsQ0FBQztFQUFFLE1BQU0sSUFBRTtHQUFDLE1BQUs7R0FBRSxRQUFPO0dBQUUsS0FBSTtHQUFFLFdBQVU7R0FBRSxNQUFLO0dBQUUsU0FBUTtJQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksR0FBRSxFQUFFLENBQUMsSUFBRSxDQUFDLEdBQUUsQ0FBQyxHQUFFLEtBQUksSUFBRSxDQUFDO0dBQUM7R0FBRSx3QkFBdUI7SUFBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBRSxDQUFDO0dBQUM7R0FBRSx3QkFBdUI7SUFBQyxNQUFNLElBQUUsRUFBRSxDQUFDLElBQUU7SUFBRSxPQUFPLEtBQUcsR0FBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRSxLQUFLLElBQUksR0FBRSxDQUFDLENBQUM7R0FBQztHQUFFLFlBQVksR0FBRSxJQUFFLENBQUMsR0FBRTtJQUFDLE1BQU0sSUFBRSxDQUFDLENBQUMsRUFBRTtJQUFTLElBQUUs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
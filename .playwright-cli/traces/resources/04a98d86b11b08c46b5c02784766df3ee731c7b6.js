//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/.pnpm/@shikijs+types@4.3.0/node_modules/@shikijs/types/dist/index.mjs
var ShikiError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "ShikiError";
	}
};
//#endregion
//#region node_modules/.pnpm/@shikijs+vscode-textmate@10.0.2/node_modules/@shikijs/vscode-textmate/dist/index.js
function clone(something) {
	return doClone(something);
}
function doClone(something) {
	if (Array.isArray(something)) return cloneArray(something);
	if (something instanceof RegExp) return something;
	if (typeof something === "object") return cloneObj(something);
	return something;
}
function cloneArray(arr) {
	let r = [];
	for (let i = 0, len = arr.length; i < len; i++) r[i] = doClone(arr[i]);
	return r;
}
function cloneObj(obj) {
	let r = {};
	for (let key in obj) r[key] = doClone(obj[key]);
	return r;
}
function mergeObjects(target, ...sources) {
	sources.forEach((source) => {
		for (let key in source) target[key] = source[key];
	});
	return target;
}
function basename(path) {
	const idx = ~path.lastIndexOf("/") || ~path.lastIndexOf("\\");
	if (idx === 0) return path;
	else if (~idx === path.length - 1) return basename(path.substring(0, path.length - 1));
	else return path.substr(~idx + 1);
}
var CAPTURING_REGEX_SOURCE = /\$(\d+)|\${(\d+):\/(downcase|upcase)}/g;
var RegexSource = class {
	static hasCaptures(regexSource) {
		if (regexSource === null) return false;
		CAPTURING_REGEX_SOURCE.lastIndex = 0;
		return CAPTURING_REGEX_SOURCE.test(regexSource);
	}
	static replaceCaptures(regexSource, captureSource, captureIndices) {
		return regexSource.replace(CAPTURING_REGEX_SOURCE, (match, index, commandIndex, command) => {
			let capture = captureIndices[parseInt(index || commandIndex, 10)];
			if (capture) {
				let result = captureSource.substring(capture.start, capture.end);
				while (result[0] === ".") result = result.substring(1);
				switch (command) {
					case "downcase": return result.toLowerCase();
					case "upcase": return result.toUpperCase();
					default: return result;
				}
			} else return match;
		});
	}
};
function strcmp(a, b) {
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
}
function strArrCmp(a, b) {
	if (a === null && b === null) return 0;
	if (!a) return -1;
	if (!b) return 1;
	let len1 = a.length;
	let len2 = b.length;
	if (len1 === len2) {
		for (let i = 0; i < len1; i++) {
			let res = strcmp(a[i], b[i]);
			if (res !== 0) return res;
		}
		return 0;
	}
	return len1 - len2;
}
function isValidHexColor(hex) {
	if (/^#[0-9a-f]{6}$/i.test(hex)) return true;
	if (/^#[0-9a-f]{8}$/i.test(hex)) return true;
	if (/^#[0-9a-f]{3}$/i.test(hex)) return true;
	if (/^#[0-9a-f]{4}$/i.test(hex)) return true;
	return false;
}
function escapeRegExpCharacters(value) {
	return value.replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&");
}
var CachedFn = class {
	constructor(fn) {
		this.fn = fn;
	}
	cache = /* @__PURE__ */ new Map();
	get(key) {
		if (this.cache.has(key)) return this.cache.get(key);
		const value = this.fn(key);
		this.cache.set(key, value);
		return value;
	}
};
var Theme = class {
	constructor(_colorMap, _defaults, _root) {
		this._colorMap = _colorMap;
		this._defaults = _defaults;
		this._root = _root;
	}
	static createFromRawTheme(source, colorMap) {
		return this.createFromParsedTheme(parseTheme(source), colorMap);
	}
	static createFromParsedTheme(source, colorMap) {
		return resolveParsedThemeRules(source, colorMap);
	}
	_cachedMatchRoot = new CachedFn((scopeName) => this._root.match(scopeName));
	getColorMap() {
		return this._colorMap.getColorMap();
	}
	getDefaults() {
		return this._defaults;
	}
	match(scopePath) {
		if (scopePath === null) return this._defaults;
		const scopeName = scopePath.scopeName;
		const effectiveRule = this._cachedMatchRoot.get(scopeName).find((v) => _scopePathMatchesParentScopes(scopePath.parent, v.parentScopes));
		if (!effectiveRule) return null;
		return new StyleAttributes(effectiveRule.fontStyle, effectiveRule.foreground, effectiveRule.background);
	}
};
var ScopeStack = class _ScopeStack {
	constructor(parent, scopeName) {
		this.parent = parent;
		this.scopeName = scopeName;
	}
	static push(path, scopeNames) {
		for (const name of scopeNames) path = new _ScopeStack(path, name);
		return path;
	}
	static from(...segments) {
		let result = null;
		for (let i = 0; i < segments.length; i++) result = new _ScopeStack(result, segments[i]);
		return result;
	}
	push(scopeName) {
		return new _ScopeStack(this, scopeName);
	}
	getSegments() {
		let item = this;
		const result = [];
		while (item) {
			result.push(item.scopeName);
			item = item.parent;
		}
		result.reverse();
		return result;
	}
	toString() {
		return this.getSegments().join(" ");
	}
	extends(other) {
		if (this === other) return true;
		if (this.parent === null) return false;
		return this.parent.extends(other);
	}
	getExtensionIfDefined(base) {
		const result = [];
		let item = this;
		while (item && item !== base) {
			result.push(item.scopeName);
			item = item.parent;
		}
		return item === base ? result.reverse() : void 0;
	}
};
function _scopePathMatchesParentScopes(scopePath, parentScopes) {
	if (parentScopes.length === 0) return true;
	for (let index = 0; index < parentScopes.length; index++) {
		let scopePattern = parentScopes[index];
		let scopeMustMatch = false;
		if (scopePattern === ">") {
			if (index === parentScopes.length - 1) return false;
			scopePattern = parentScopes[++index];
			scopeMustMatch = true;
		}
		while (scopePath) {
			if (_matchesScope(scopePath.scopeName, scopePattern)) break;
			if (scopeMustMatch) return false;
			scopePath = scopePath.parent;
		}
		if (!scopePath) return false;
		scopePath = scopePath.parent;
	}
	return true;
}
function _matchesScope(scopeName, scopePattern) {
	return scopePattern === scopeName || scopeName.startsWith(scopePattern) && scopeName[scopePattern.length] === ".";
}
var StyleAttributes = class {
	constructor(fontStyle, foregroundId, backgroundId) {
		this.fontStyle = fontStyle;
		this.foregroundId = foregroundId;
		this.backgroundId = backgroundId;
	}
};
function parseTheme(source) {
	if (!source) return [];
	if (!source.settings || !Array.isArray(source.settings)) return [];
	let settings = source.settings;
	let result = [], resultLen = 0;
	for (let i = 0, len = settings.length; i < len; i++) {
		let entry = settings[i];
		if (!entry.settings) continue;
		let scopes;
		if (typeof entry.scope === "string") {
			let _scope = entry.scope;
			_scope = _scope.replace(/^[,]+/, "");
			_scope = _scope.replace(/[,]+$/, "");
			scopes = _scope.split(",");
		} else if (Array.isArray(entry.scope)) scopes = entry.scope;
		else scopes = [""];
		let fontStyle = -1;
		if (typeof entry.settings.fontStyle === "string") {
			fontStyle = 0;
			let segments = entry.settings.fontStyle.split(" ");
			for (let j = 0, lenJ = segments.length; j < lenJ; j++) switch (segments[j]) {
				case "italic":
					fontStyle = fontStyle | 1;
					break;
				case "bold":
					fontStyle = fontStyle | 2;
					break;
				case "underline":
					fontStyle = fontStyle | 4;
					break;
				case "strikethrough":
					fontStyle = fontStyle | 8;
					break;
			}
		}
		let foreground = null;
		if (typeof entry.settings.foreground === "string" && isValidHexColor(entry.settings.foreground)) foreground = entry.settings.foreground;
		let background = null;
		if (typeof entry.settings.background === "string" && isValidHexColor(entry.settings.background)) background = entry.settings.background;
		for (let j = 0, lenJ = scopes.length; j < lenJ; j++) {
			let segments = scopes[j].trim().split(" ");
			let scope = segments[segments.length - 1];
			let parentScopes = null;
			if (segments.length > 1) {
				parentScopes = segments.slice(0, segments.length - 1);
				parentScopes.reverse();
			}
			result[resultLen++] = new ParsedThemeRule(scope, parentScopes, i, fontStyle, foreground, background);
		}
	}
	return result;
}
var ParsedThemeRule = class {
	constructor(scope, parentScopes, index, fontStyle, foreground, background) {
		this.scope = scope;
		this.parentScopes = parentScopes;
		this.index = index;
		this.fontStyle = fontStyle;
		this.foreground = foreground;
		this.background = background;
	}
};
var FontStyle = /* @__PURE__ */ ((FontStyle2) => {
	FontStyle2[FontStyle2["NotSet"] = -1] = "NotSet";
	FontStyle2[FontStyle2["None"] = 0] = "None";
	FontStyle2[FontStyle2["Italic"] = 1] = "Italic";
	FontStyle2[FontStyle2["Bold"] = 2] = "Bold";
	FontStyle2[FontStyle2["Underline"] = 4] = "Underline";
	FontStyle2[FontStyle2["Strikethrough"] = 8] = "Strikethrough";
	return FontStyle2;
})(FontStyle || {});
function resolveParsedThemeRules(parsedThemeRules, _colorMap) {
	parsedThemeRules.sort((a, b) => {
		let r = strcmp(a.scope, b.scope);
		if (r !== 0) return r;
		r = strArrCmp(a.parentScopes, b.parentScopes);
		if (r !== 0) return r;
		return a.index - b.index;
	});
	let defaultFontStyle = 0;
	let defaultForeground = "#000000";
	let defaultBackground = "#ffffff";
	while (parsedThemeRules.length >= 1 && parsedThemeRules[0].scope === "") {
		let incomingDefaults = parsedThemeRules.shift();
		if (incomingDefaults.fontStyle !== -1) defaultFontStyle = incomingDefaults.fontStyle;
		if (incomingDefaults.foreground !== null) defaultForeground = incomingDefaults.foreground;
		if (incomingDefaults.background !== null) defaultBackground = incomingDefaults.background;
	}
	let colorMap = new ColorMap(_colorMap);
	let defaults = new StyleAttributes(defaultFontStyle, colorMap.getId(defaultForeground), colorMap.getId(defaultBackground));
	let root = new ThemeTrieElement(new ThemeTrieElementRule(0, null, -1, 0, 0), []);
	for (let i = 0, len = parsedThemeRules.length; i < len; i++) {
		let rule = parsedThemeRules[i];
		root.insert(0, rule.scope, rule.parentScopes, rule.fontStyle, colorMap.getId(rule.foreground), colorMap.getId(rule.background));
	}
	return new Theme(colorMap, defaults, root);
}
var ColorMap = class {
	_isFrozen;
	_lastColorId;
	_id2color;
	_color2id;
	constructor(_colorMap) {
		this._lastColorId = 0;
		this._id2color = [];
		this._color2id = /* @__PURE__ */ Object.create(null);
		if (Array.isArray(_colorMap)) {
			this._isFrozen = true;
			for (let i = 0, len = _colorMap.length; i < len; i++) {
				this._color2id[_colorMap[i]] = i;
				this._id2color[i] = _colorMap[i];
			}
		} else this._isFrozen = false;
	}
	getId(color) {
		if (color === null) return 0;
		color = color.toUpperCase();
		let value = this._color2id[color];
		if (value) return value;
		if (this._isFrozen) throw new Error(`Missing color in color map - ${color}`);
		value = ++this._lastColorId;
		this._color2id[color] = value;
		this._id2color[value] = color;
		return value;
	}
	getColorMap() {
		return this._id2color.slice(0);
	}
};
var emptyParentScopes = Object.freeze([]);
var ThemeTrieElementRule = class _ThemeTrieElementRule {
	scopeDepth;
	parentScopes;
	fontStyle;
	foreground;
	background;
	constructor(scopeDepth, parentScopes, fontStyle, foreground, background) {
		this.scopeDepth = scopeDepth;
		this.parentScopes = parentScopes || emptyParentScopes;
		this.fontStyle = fontStyle;
		this.foreground = foreground;
		this.background = background;
	}
	clone() {
		return new _ThemeTrieElementRule(this.scopeDepth, this.parentScopes, this.fontStyle, this.foreground, this.background);
	}
	static cloneArr(arr) {
		let r = [];
		for (let i = 0, len = arr.length; i < len; i++) r[i] = arr[i].clone();
		return r;
	}
	acceptOverwrite(scopeDepth, fontStyle, foreground, background) {
		if (this.scopeDepth > scopeDepth) console.log("how did this happen?");
		else this.scopeDepth = scopeDepth;
		if (fontStyle !== -1) this.fontStyle = fontStyle;
		if (foreground !== 0) this.foreground = foreground;
		if (background !== 0) this.background = background;
	}
};
var ThemeTrieElement = class _ThemeTrieElement {
	constructor(_mainRule, rulesWithParentScopes = [], _children = {}) {
		this._mainRule = _mainRule;
		this._children = _children;
		this._rulesWithParentScopes = rulesWithParentScopes;
	}
	_rulesWithParentScopes;
	static _cmpBySpecificity(a, b) {
		if (a.scopeDepth !== b.scopeDepth) return b.scopeDepth - a.scopeDepth;
		let aParentIndex = 0;
		let bParentIndex = 0;
		while (true) {
			if (a.parentScopes[aParentIndex] === ">") aParentIndex++;
			if (b.parentScopes[bParentIndex] === ">") bParentIndex++;
			if (aParentIndex >= a.parentScopes.length || bParentIndex >= b.parentScopes.length) break;
			const parentScopeLengthDiff = b.parentScopes[bParentIndex].length - a.parentScopes[aParentIndex].length;
			if (parentScopeLengthDiff !== 0) return parentScopeLengthDiff;
			aParentIndex++;
			bParentIndex++;
		}
		return b.parentScopes.length - a.parentScopes.length;
	}
	match(scope) {
		if (scope !== "") {
			let dotIndex = scope.indexOf(".");
			let head;
			let tail;
			if (dotIndex === -1) {
				head = scope;
				tail = "";
			} else {
				head = scope.substring(0, dotIndex);
				tail = scope.substring(dotIndex + 1);
			}
			if (this._children.hasOwnProperty(head)) return this._children[head].match(tail);
		}
		const rules = this._rulesWithParentScopes.concat(this._mainRule);
		rules.sort(_ThemeTrieElement._cmpBySpecificity);
		return rules;
	}
	insert(scopeDepth, scope, parentScopes, fontStyle, foreground, background) {
		if (scope === "") {
			this._doInsertHere(scopeDepth, parentScopes, fontStyle, foreground, background);
			return;
		}
		let dotIndex = scope.indexOf(".");
		let head;
		let tail;
		if (dotIndex === -1) {
			head = scope;
			tail = "";
		} else {
			head = scope.substring(0, dotIndex);
			tail = scope.substring(dotIndex + 1);
		}
		let child;
		if (this._children.hasOwnProperty(head)) child = this._children[head];
		else {
			child = new _ThemeTrieElement(this._mainRule.clone(), ThemeTrieElementRule.cloneArr(this._rulesWithParentScopes));
			this._children[head] = child;
		}
		child.insert(scopeDepth + 1, tail, parentScopes, fontStyle, foreground, background);
	}
	_doInsertHere(scopeDepth, parentScopes, fontStyle, foreground, background) {
		if (parentScopes === null) {
			this._mainRule.acceptOverwrite(scopeDepth, fontStyle, foreground, background);
			return;
		}
		for (let i = 0, len = this._rulesWithParentScopes.length; i < len; i++) {
			let rule = this._rulesWithParentScopes[i];
			if (strArrCmp(rule.parentScopes, parentScopes) === 0) {
				rule.acceptOverwrite(scopeDepth, fontStyle, foreground, background);
				return;
			}
		}
		if (fontStyle === -1) fontStyle = this._mainRule.fontStyle;
		if (foreground === 0) foreground = this._mainRule.foreground;
		if (background === 0) background = this._mainRule.background;
		this._rulesWithParentScopes.push(new ThemeTrieElementRule(scopeDepth, parentScopes, fontStyle, foreground, background));
	}
};
var EncodedTokenMetadata = class _EncodedTokenMetadata {
	static toBinaryStr(encodedTokenAttributes) {
		return encodedTokenAttributes.toString(2).padStart(32, "0");
	}
	static print(encodedTokenAttributes) {
		const languageId = _EncodedTokenMetadata.getLanguageId(encodedTokenAttributes);
		const tokenType = _EncodedTokenMetadata.getTokenType(encodedTokenAttributes);
		const fontStyle = _EncodedTokenMetadata.getFontStyle(encodedTokenAttributes);
		const foreground = _EncodedTokenMetadata.getForeground(encodedTokenAttributes);
		const background = _EncodedTokenMetadata.getBackground(encodedTokenAttributes);
		console.log({
			languageId,
			tokenType,
			fontStyle,
			foreground,
			background
		});
	}
	static getLanguageId(encodedTokenAttributes) {
		return (encodedTokenAttributes & 255) >>> 0;
	}
	static getTokenType(encodedTokenAttributes) {
		return (encodedTokenAttributes & 768) >>> 8;
	}
	static containsBalancedBrackets(encodedTokenAttributes) {
		return (encodedTokenAttributes & 1024) !== 0;
	}
	static getFontStyle(encodedTokenAttributes) {
		return (encodedTokenAttributes & 30720) >>> 11;
	}
	static getForeground(encodedTokenAttributes) {
		return (encodedTokenAttributes & 16744448) >>> 15;
	}
	static getBackground(encodedTokenAttributes) {
		return (encodedTokenAttributes & 4278190080) >>> 24;
	}
	/**
	* Updates the fields in `metadata`.
	* A value of `0`, `NotSet` or `null` indicates that the corresponding field should be left as is.
	*/
	static set(encodedTokenAttributes, languageId, tokenType, containsBalancedBrackets, fontStyle, foreground, background) {
		let _languageId = _EncodedTokenMetadata.getLanguageId(encodedTokenAttributes);
		let _tokenType = _EncodedTokenMetadata.getTokenType(encodedTokenAttributes);
		let _containsBalancedBracketsBit = _EncodedTokenMetadata.containsBalancedBrackets(encodedTokenAttributes) ? 1 : 0;
		let _fontStyle = _EncodedTokenMetadata.getFontStyle(encodedTokenAttributes);
		let _foreground = _EncodedTokenMetadata.getForeground(encodedTokenAttributes);
		let _background = _EncodedTokenMetadata.getBackground(encodedTokenAttributes);
		if (languageId !== 0) _languageId = languageId;
		if (tokenType !== 8) _tokenType = fromOptionalTokenType(tokenType);
		if (containsBalancedBrackets !== null) _containsBalancedBracketsBit = containsBalancedBrackets ? 1 : 0;
		if (fontStyle !== -1) _fontStyle = fontStyle;
		if (foreground !== 0) _foreground = foreground;
		if (background !== 0) _background = background;
		return (_languageId << 0 | _tokenType << 8 | _containsBalancedBracketsBit << 10 | _fontStyle << 11 | _foreground << 15 | _background << 24) >>> 0;
	}
};
function toOptionalTokenType(standardType) {
	return standardType;
}
function fromOptionalTokenType(standardType) {
	return standardType;
}
function createMatchers(selector, matchesName) {
	const results = [];
	const tokenizer = newTokenizer(selector);
	let token = tokenizer.next();
	while (token !== null) {
		let priority = 0;
		if (token.length === 2 && token.charAt(1) === ":") {
			switch (token.charAt(0)) {
				case "R":
					priority = 1;
					break;
				case "L":
					priority = -1;
					break;
				default: console.log(`Unknown priority ${token} in scope selector`);
			}
			token = tokenizer.next();
		}
		let matcher = parseConjunction();
		results.push({
			matcher,
			priority
		});
		if (token !== ",") break;
		token = tokenizer.next();
	}
	return results;
	function parseOperand() {
		if (token === "-") {
			token = tokenizer.next();
			const expressionToNegate = parseOperand();
			return (matcherInput) => !!expressionToNegate && !expressionToNegate(matcherInput);
		}
		if (token === "(") {
			token = tokenizer.next();
			const expressionInParents = parseInnerExpression();
			if (token === ")") token = tokenizer.next();
			return expressionInParents;
		}
		if (isIdentifier(token)) {
			const identifiers = [];
			do {
				identifiers.push(token);
				token = tokenizer.next();
			} while (isIdentifier(token));
			return (matcherInput) => matchesName(identifiers, matcherInput);
		}
		return null;
	}
	function parseConjunction() {
		const matchers = [];
		let matcher = parseOperand();
		while (matcher) {
			matchers.push(matcher);
			matcher = parseOperand();
		}
		return (matcherInput) => matchers.every((matcher2) => matcher2(matcherInput));
	}
	function parseInnerExpression() {
		const matchers = [];
		let matcher = parseConjunction();
		while (matcher) {
			matchers.push(matcher);
			if (token === "|" || token === ",") do
				token = tokenizer.next();
			while (token === "|" || token === ",");
			else break;
			matcher = parseConjunction();
		}
		return (matcherInput) => matchers.some((matcher2) => matcher2(matcherInput));
	}
}
function isIdentifier(token) {
	return !!token && !!token.match(/[\w\.:]+/);
}
function newTokenizer(input) {
	let regex = /([LR]:|[\w\.:][\w\.:\-]*|[\,\|\-\(\)])/g;
	let match = regex.exec(input);
	return { next: () => {
		if (!match) return null;
		const res = match[0];
		match = regex.exec(input);
		return res;
	} };
}
function disposeOnigString(str) {
	if (typeof str.dispose === "function") str.dispose();
}
var TopLevelRuleReference = class {
	constructor(scopeName) {
		this.scopeName = scopeName;
	}
	toKey() {
		return this.scopeName;
	}
};
var TopLevelRepositoryRuleReference = class {
	constructor(scopeName, ruleName) {
		this.scopeName = scopeName;
		this.ruleName = ruleName;
	}
	toKey() {
		return `${this.scopeName}#${this.ruleName}`;
	}
};
var ExternalReferenceCollector = class {
	_references = [];
	_seenReferenceKeys = /* @__PURE__ */ new Set();
	get references() {
		return this._references;
	}
	visitedRule = /* @__PURE__ */ new Set();
	add(reference) {
		const key = reference.toKey();
		if (this._seenReferenceKeys.has(key)) return;
		this._seenReferenceKeys.add(key);
		this._references.push(reference);
	}
};
var ScopeDependencyProcessor = class {
	constructor(repo, initialScopeName) {
		this.repo = repo;
		this.initialScopeName = initialScopeName;
		this.seenFullScopeRequests.add(this.initialScopeName);
		this.Q = [new TopLevelRuleReference(this.initialScopeName)];
	}
	seenFullScopeRequests = /* @__PURE__ */ new Set();
	seenPartialScopeRequests = /* @__PURE__ */ new Set();
	Q;
	processQueue() {
		const q = this.Q;
		this.Q = [];
		const deps = new ExternalReferenceCollector();
		for (const dep of q) collectReferencesOfReference(dep, this.initialScopeName, this.repo, deps);
		for (const dep of deps.references) if (dep instanceof TopLevelRuleReference) {
			if (this.seenFullScopeRequests.has(dep.scopeName)) continue;
			this.seenFullScopeRequests.add(dep.scopeName);
			this.Q.push(dep);
		} else {
			if (this.seenFullScopeRequests.has(dep.scopeName)) continue;
			if (this.seenPartialScopeRequests.has(dep.toKey())) continue;
			this.seenPartialScopeRequests.add(dep.toKey());
			this.Q.push(dep);
		}
	}
};
function collectReferencesOfReference(reference, baseGrammarScopeName, repo, result) {
	const selfGrammar = repo.lookup(reference.scopeName);
	if (!selfGrammar) {
		if (reference.scopeName === baseGrammarScopeName) throw new Error(`No grammar provided for <${baseGrammarScopeName}>`);
		return;
	}
	const baseGrammar = repo.lookup(baseGrammarScopeName);
	if (reference instanceof TopLevelRuleReference) collectExternalReferencesInTopLevelRule({
		baseGrammar,
		selfGrammar
	}, result);
	else collectExternalReferencesInTopLevelRepositoryRule(reference.ruleName, {
		baseGrammar,
		selfGrammar,
		repository: selfGrammar.repository
	}, result);
	const injections = repo.injections(reference.scopeName);
	if (injections) for (const injection of injections) result.add(new TopLevelRuleReference(injection));
}
function collectExternalReferencesInTopLevelRepositoryRule(ruleName, context, result) {
	if (context.repository && context.repository[ruleName]) {
		const rule = context.repository[ruleName];
		collectExternalReferencesInRules([rule], context, result);
	}
}
function collectExternalReferencesInTopLevelRule(context, result) {
	if (context.selfGrammar.patterns && Array.isArray(context.selfGrammar.patterns)) collectExternalReferencesInRules(context.selfGrammar.patterns, {
		...context,
		repository: context.selfGrammar.repository
	}, result);
	if (context.selfGrammar.injections) collectExternalReferencesInRules(Object.values(context.selfGrammar.injections), {
		...context,
		repository: context.selfGrammar.repository
	}, result);
}
function collectExternalReferencesInRules(rules, context, result) {
	for (const rule of rules) {
		if (result.visitedRule.has(rule)) continue;
		result.visitedRule.add(rule);
		const patternRepository = rule.repository ? mergeObjects({}, context.repository, rule.repository) : context.repository;
		if (Array.isArray(rule.patterns)) collectExternalReferencesInRules(rule.patterns, {
			...context,
			repository: patternRepository
		}, result);
		const include = rule.include;
		if (!include) continue;
		const reference = parseInclude(include);
		switch (reference.kind) {
			case 0:
				collectExternalReferencesInTopLevelRule({
					...context,
					selfGrammar: context.baseGrammar
				}, result);
				break;
			case 1:
				collectExternalReferencesInTopLevelRule(context, result);
				break;
			case 2:
				collectExternalReferencesInTopLevelRepositoryRule(reference.ruleName, {
					...context,
					repository: patternRepository
				}, result);
				break;
			case 3:
			case 4:
				const selfGrammar = reference.scopeName === context.selfGrammar.scopeName ? context.selfGrammar : reference.scopeName === context.baseGrammar.scopeName ? context.baseGrammar : void 0;
				if (selfGrammar) {
					const newContext = {
						baseGrammar: context.baseGrammar,
						selfGrammar,
						repository: patternRepository
					};
					if (reference.kind === 4) collectExternalReferencesInTopLevelRepositoryRule(reference.ruleName, newContext, result);
					else collectExternalReferencesInTopLevelRule(newContext, result);
				} else if (reference.kind === 4) result.add(new TopLevelRepositoryRuleReference(reference.scopeName, reference.ruleName));
				else result.add(new TopLevelRuleReference(reference.scopeName));
				break;
		}
	}
}
var BaseReference = class {
	kind = 0;
};
var SelfReference = class {
	kind = 1;
};
var RelativeReference = class {
	constructor(ruleName) {
		this.ruleName = ruleName;
	}
	kind = 2;
};
var TopLevelReference = class {
	constructor(scopeName) {
		this.scopeName = scopeName;
	}
	kind = 3;
};
var TopLevelRepositoryReference = class {
	constructor(scopeName, ruleName) {
		this.scopeName = scopeName;
		this.ruleName = ruleName;
	}
	kind = 4;
};
function parseInclude(include) {
	if (include === "$base") return new BaseReference();
	else if (include === "$self") return new SelfReference();
	const indexOfSharp = include.indexOf("#");
	if (indexOfSharp === -1) return new TopLevelReference(include);
	else if (indexOfSharp === 0) return new RelativeReference(include.substring(1));
	else return new TopLevelRepositoryReference(include.substring(0, indexOfSharp), include.substring(indexOfSharp + 1));
}
var HAS_BACK_REFERENCES = /\\(\d+)/;
var BACK_REFERENCING_END = /\\(\d+)/g;
var endRuleId = -1;
var whileRuleId = -2;
function ruleIdFromNumber(id) {
	return id;
}
function ruleIdToNumber(id) {
	return id;
}
var Rule = class {
	$location;
	id;
	_nameIsCapturing;
	_name;
	_contentNameIsCapturing;
	_contentName;
	constructor($location, id, name, contentName) {
		this.$location = $location;
		this.id = id;
		this._name = name || null;
		this._nameIsCapturing = RegexSource.hasCaptures(this._name);
		this._contentName = contentName || null;
		this._contentNameIsCapturing = RegexSource.hasCaptures(this._contentName);
	}
	get debugName() {
		const location = this.$location ? `${basename(this.$location.filename)}:${this.$location.line}` : "unknown";
		return `${this.constructor.name}#${this.id} @ ${location}`;
	}
	getName(lineText, captureIndices) {
		if (!this._nameIsCapturing || this._name === null || lineText === null || captureIndices === null) return this._name;
		return RegexSource.replaceCaptures(this._name, lineText, captureIndices);
	}
	getContentName(lineText, captureIndices) {
		if (!this._contentNameIsCapturing || this._contentName === null) return this._contentName;
		return RegexSource.replaceCaptures(this._contentName, lineText, captureIndices);
	}
};
var CaptureRule = class extends Rule {
	retokenizeCapturedWithRuleId;
	constructor($location, id, name, contentName, retokenizeCapturedWithRuleId) {
		super($location, id, name, contentName);
		this.retokenizeCapturedWithRuleId = retokenizeCapturedWithRuleId;
	}
	dispose() {}
	collectPatterns(grammar, out) {
		throw new Error("Not supported!");
	}
	compile(grammar, endRegexSource) {
		throw new Error("Not supported!");
	}
	compileAG(grammar, endRegexSource, allowA, allowG) {
		throw new Error("Not supported!");
	}
};
var MatchRule = class extends Rule {
	_match;
	captures;
	_cachedCompiledPatterns;
	constructor($location, id, name, match, captures) {
		super($location, id, name, null);
		this._match = new RegExpSource(match, this.id);
		this.captures = captures;
		this._cachedCompiledPatterns = null;
	}
	dispose() {
		if (this._cachedCompiledPatterns) {
			this._cachedCompiledPatterns.dispose();
			this._cachedCompiledPatterns = null;
		}
	}
	get debugMatchRegExp() {
		return `${this._match.source}`;
	}
	collectPatterns(grammar, out) {
		out.push(this._match);
	}
	compile(grammar, endRegexSource) {
		return this._getCachedCompiledPatterns(grammar).compile(grammar);
	}
	compileAG(grammar, endRegexSource, allowA, allowG) {
		return this._getCachedCompiledPatterns(grammar).compileAG(grammar, allowA, allowG);
	}
	_getCachedCompiledPatterns(grammar) {
		if (!this._cachedCompiledPatterns) {
			this._cachedCompiledPatterns = new RegExpSourceList();
			this.collectPatterns(grammar, this._cachedCompiledPatterns);
		}
		return this._cachedCompiledPatterns;
	}
};
var IncludeOnlyRule = class extends Rule {
	hasMissingPatterns;
	patterns;
	_cachedCompiledPatterns;
	constructor($location, id, name, contentName, patterns) {
		super($location, id, name, contentName);
		this.patterns = patterns.patterns;
		this.hasMissingPatterns = patterns.hasMissingPatterns;
		this._cachedCompiledPatterns = null;
	}
	dispose() {
		if (this._cachedCompiledPatterns) {
			this._cachedCompiledPatterns.dispose();
			this._cachedCompiledPatterns = null;
		}
	}
	collectPatterns(grammar, out) {
		for (const pattern of this.patterns) grammar.getRule(pattern).collectPatterns(grammar, out);
	}
	compile(grammar, endRegexSource) {
		return this._getCachedCompiledPatterns(grammar).compile(grammar);
	}
	compileAG(grammar, endRegexSource, allowA, allowG) {
		return this._getCachedCompiledPatterns(grammar).compileAG(grammar, allowA, allowG);
	}
	_getCachedCompiledPatterns(grammar) {
		if (!this._cachedCompiledPatterns) {
			this._cachedCompiledPatterns = new RegExpSourceList();
			this.collectPatterns(grammar, this._cachedCompiledPatterns);
		}
		return this._cachedCompiledPatterns;
	}
};
var BeginEndRule = class extends Rule {
	_begin;
	beginCaptures;
	_end;
	endHasBackReferences;
	endCaptures;
	applyEndPatternLast;
	hasMissingPatterns;
	patterns;
	_cachedCompiledPatterns;
	constructor($location, id, name, contentName, begin, beginCaptures, end, endCaptures, applyEndPatternLast, patterns) {
		super($location, id, name, contentName);
		this._begin = new RegExpSource(begin, this.id);
		this.beginCaptures = beginCaptures;
		this._end = new RegExpSource(end ? end : "￿", -1);
		this.endHasBackReferences = this._end.hasBackReferences;
		this.endCaptures = endCaptures;
		this.applyEndPatternLast = applyEndPatternLast || false;
		this.patterns = patterns.patterns;
		this.hasMissingPatterns = patterns.hasMissingPatterns;
		this._cachedCompiledPatterns = null;
	}
	dispose() {
		if (this._cachedCompiledPatterns) {
			this._cachedCompiledPatterns.dispose();
			this._cachedCompiledPatterns = null;
		}
	}
	get debugBeginRegExp() {
		return `${this._begin.source}`;
	}
	get debugEndRegExp() {
		return `${this._end.source}`;
	}
	getEndWithResolvedBackReferences(lineText, captureIndices) {
		return this._end.resolveBackReferences(lineText, captureIndices);
	}
	collectPatterns(grammar, out) {
		out.push(this._begin);
	}
	compile(grammar, endRegexSource) {
		return this._getCachedCompiledPatterns(grammar, endRegexSource).compile(grammar);
	}
	compileAG(grammar, endRegexSource, allowA, allowG) {
		return this._getCachedCompiledPatterns(grammar, endRegexSource).compileAG(grammar, allowA, allowG);
	}
	_getCachedCompiledPatterns(grammar, endRegexSource) {
		if (!this._cachedCompiledPatterns) {
			this._cachedCompiledPatterns = new RegExpSourceList();
			for (const pattern of this.patterns) grammar.getRule(pattern).collectPatterns(grammar, this._cachedCompiledPatterns);
			if (this.applyEndPatternLast) this._cachedCompiledPatterns.push(this._end.hasBackReferences ? this._end.clone() : this._end);
			else this._cachedCompiledPatterns.unshift(this._end.hasBackReferences ? this._end.clone() : this._end);
		}
		if (this._end.hasBackReferences) if (this.applyEndPatternLast) this._cachedCompiledPatterns.setSource(this._cachedCompiledPatterns.length() - 1, endRegexSource);
		else this._cachedCompiledPatterns.setSource(0, endRegexSource);
		return this._cachedCompiledPatterns;
	}
};
var BeginWhileRule = class extends Rule {
	_begin;
	beginCaptures;
	whileCaptures;
	_while;
	whileHasBackReferences;
	hasMissingPatterns;
	patterns;
	_cachedCompiledPatterns;
	_cachedCompiledWhilePatterns;
	constructor($location, id, name, contentName, begin, beginCaptures, _while, whileCaptures, patterns) {
		super($location, id, name, contentName);
		this._begin = new RegExpSource(begin, this.id);
		this.beginCaptures = beginCaptures;
		this.whileCaptures = whileCaptures;
		this._while = new RegExpSource(_while, whileRuleId);
		this.whileHasBackReferences = this._while.hasBackReferences;
		this.patterns = patterns.patterns;
		this.hasMissingPatterns = patterns.hasMissingPatterns;
		this._cachedCompiledPatterns = null;
		this._cachedCompiledWhilePatterns = null;
	}
	dispose() {
		if (this._cachedCompiledPatterns) {
			this._cachedCompiledPatterns.dispose();
			this._cachedCompiledPatterns = null;
		}
		if (this._cachedCompiledWhilePatterns) {
			this._cachedCompiledWhilePatterns.dispose();
			this._cachedCompiledWhilePatterns = null;
		}
	}
	get debugBeginRegExp() {
		return `${this._begin.source}`;
	}
	get debugWhileRegExp() {
		return `${this._while.source}`;
	}
	getWhileWithResolvedBackReferences(lineText, captureIndices) {
		return this._while.resolveBackReferences(lineText, captureIndices);
	}
	collectPatterns(grammar, out) {
		out.push(this._begin);
	}
	compile(grammar, endRegexSource) {
		return this._getCachedCompiledPatterns(grammar).compile(grammar);
	}
	compileAG(grammar, endRegexSource, allowA, allowG) {
		return this._getCachedCompiledPatterns(grammar).compileAG(grammar, allowA, allowG);
	}
	_getCachedCompiledPatterns(grammar) {
		if (!this._cachedCompiledPatterns) {
			this._cachedCompiledPatterns = new RegExpSourceList();
			for (const pattern of this.patterns) grammar.getRule(pattern).collectPatterns(grammar, this._cachedCompiledPatterns);
		}
		return this._cachedCompiledPatterns;
	}
	compileWhile(grammar, endRegexSource) {
		return this._getCachedCompiledWhilePatterns(grammar, endRegexSource).compile(grammar);
	}
	compileWhileAG(grammar, endRegexSource, allowA, allowG) {
		return this._getCachedCompiledWhilePatterns(grammar, endRegexSource).compileAG(grammar, allowA, allowG);
	}
	_getCachedCompiledWhilePatterns(grammar, endRegexSource) {
		if (!this._cachedCompiledWhilePatterns) {
			this._cachedCompiledWhilePatterns = new RegExpSourceList();
			this._cachedCompiledWhilePatterns.push(this._while.hasBackReferences ? this._while.clone() : this._while);
		}
		if (this._while.hasBackReferences) this._cachedCompiledWhilePatterns.setSource(0, endRegexSource ? endRegexSource : "￿");
		return this._cachedCompiledWhilePatterns;
	}
};
var RuleFactory = class _RuleFactory {
	static createCaptureRule(helper, $location, name, contentName, retokenizeCapturedWithRuleId) {
		return helper.registerRule((id) => {
			return new CaptureRule($location, id, name, contentName, retokenizeCapturedWithRuleId);
		});
	}
	static getCompiledRuleId(desc, helper, repository) {
		if (!desc.id) helper.registerRule((id) => {
			desc.id = id;
			if (desc.match) return new MatchRule(desc.$vscodeTextmateLocation, desc.id, desc.name, desc.match, _RuleFactory._compileCaptures(desc.captures, helper, repository));
			if (typeof desc.begin === "undefined") {
				if (desc.repository) repository = mergeObjects({}, repository, desc.repository);
				let patterns = desc.patterns;
				if (typeof patterns === "undefined" && desc.include) patterns = [{ include: desc.include }];
				return new IncludeOnlyRule(desc.$vscodeTextmateLocation, desc.id, desc.name, desc.contentName, _RuleFactory._compilePatterns(patterns, helper, repository));
			}
			if (desc.while) return new BeginWhileRule(desc.$vscodeTextmateLocation, desc.id, desc.name, desc.contentName, desc.begin, _RuleFactory._compileCaptures(desc.beginCaptures || desc.captures, helper, repository), desc.while, _RuleFactory._compileCaptures(desc.whileCaptures || desc.captures, helper, repository), _RuleFactory._compilePatterns(desc.patterns, helper, repository));
			return new BeginEndRule(desc.$vscodeTextmateLocation, desc.id, desc.name, desc.contentName, desc.begin, _RuleFactory._compileCaptures(desc.beginCaptures || desc.captures, helper, repository), desc.end, _RuleFactory._compileCaptures(desc.endCaptures || desc.captures, helper, repository), desc.applyEndPatternLast, _RuleFactory._compilePatterns(desc.patterns, helper, repository));
		});
		return desc.id;
	}
	static _compileCaptures(captures, helper, repository) {
		let r = [];
		if (captures) {
			let maximumCaptureId = 0;
			for (const captureId in captures) {
				if (captureId === "$vscodeTextmateLocation") continue;
				const numericCaptureId = parseInt(captureId, 10);
				if (numericCaptureId > maximumCaptureId) maximumCaptureId = numericCaptureId;
			}
			for (let i = 0; i <= maximumCaptureId; i++) r[i] = null;
			for (const captureId in captures) {
				if (captureId === "$vscodeTextmateLocation") continue;
				const numericCaptureId = parseInt(captureId, 10);
				let retokenizeCapturedWithRuleId = 0;
				if (captures[captureId].patterns) retokenizeCapturedWithRuleId = _RuleFactory.getCompiledRuleId(captures[captureId], helper, repository);
				r[numericCaptureId] = _RuleFactory.createCaptureRule(helper, captures[captureId].$vscodeTextmateLocation, captures[captureId].name, captures[captureId].contentName, retokenizeCapturedWithRuleId);
			}
		}
		return r;
	}
	static _compilePatterns(patterns, helper, repository) {
		let r = [];
		if (patterns) for (let i = 0, len = patterns.length; i < len; i++) {
			const pattern = patterns[i];
			let ruleId = -1;
			if (pattern.include) {
				const reference = parseInclude(pattern.include);
				switch (reference.kind) {
					case 0:
					case 1:
						ruleId = _RuleFactory.getCompiledRuleId(repository[pattern.include], helper, repository);
						break;
					case 2:
						let localIncludedRule = repository[reference.ruleName];
						if (localIncludedRule) ruleId = _RuleFactory.getCompiledRuleId(localIncludedRule, helper, repository);
						break;
					case 3:
					case 4:
						const externalGrammarName = reference.scopeName;
						const externalGrammarInclude = reference.kind === 4 ? reference.ruleName : null;
						const externalGrammar = helper.getExternalGrammar(externalGrammarName, repository);
						if (externalGrammar) if (externalGrammarInclude) {
							let externalIncludedRule = externalGrammar.repository[externalGrammarInclude];
							if (externalIncludedRule) ruleId = _RuleFactory.getCompiledRuleId(externalIncludedRule, helper, externalGrammar.repository);
						} else ruleId = _RuleFactory.getCompiledRuleId(externalGrammar.repository.$self, helper, externalGrammar.repository);
						break;
				}
			} else ruleId = _RuleFactory.getCompiledRuleId(pattern, helper, repository);
			if (ruleId !== -1) {
				const rule = helper.getRule(ruleId);
				let skipRule = false;
				if (rule instanceof IncludeOnlyRule || rule instanceof BeginEndRule || rule instanceof BeginWhileRule) {
					if (rule.hasMissingPatterns && rule.patterns.length === 0) skipRule = true;
				}
				if (skipRule) continue;
				r.push(ruleId);
			}
		}
		return {
			patterns: r,
			hasMissingPatterns: (patterns ? patterns.length : 0) !== r.length
		};
	}
};
var RegExpSource = class _RegExpSource {
	source;
	ruleId;
	hasAnchor;
	hasBackReferences;
	_anchorCache;
	constructor(regExpSource, ruleId) {
		if (regExpSource && typeof regExpSource === "string") {
			const len = regExpSource.length;
			let lastPushedPos = 0;
			let output = [];
			let hasAnchor = false;
			for (let pos = 0; pos < len; pos++) if (regExpSource.charAt(pos) === "\\") {
				if (pos + 1 < len) {
					const nextCh = regExpSource.charAt(pos + 1);
					if (nextCh === "z") {
						output.push(regExpSource.substring(lastPushedPos, pos));
						output.push("$(?!\\n)(?<!\\n)");
						lastPushedPos = pos + 2;
					} else if (nextCh === "A" || nextCh === "G") hasAnchor = true;
					pos++;
				}
			}
			this.hasAnchor = hasAnchor;
			if (lastPushedPos === 0) this.source = regExpSource;
			else {
				output.push(regExpSource.substring(lastPushedPos, len));
				this.source = output.join("");
			}
		} else {
			this.hasAnchor = false;
			this.source = regExpSource;
		}
		if (this.hasAnchor) this._anchorCache = this._buildAnchorCache();
		else this._anchorCache = null;
		this.ruleId = ruleId;
		if (typeof this.source === "string") this.hasBackReferences = HAS_BACK_REFERENCES.test(this.source);
		else this.hasBackReferences = false;
	}
	clone() {
		return new _RegExpSource(this.source, this.ruleId);
	}
	setSource(newSource) {
		if (this.source === newSource) return;
		this.source = newSource;
		if (this.hasAnchor) this._anchorCache = this._buildAnchorCache();
	}
	resolveBackReferences(lineText, captureIndices) {
		if (typeof this.source !== "string") throw new Error("This method should only be called if the source is a string");
		let capturedValues = captureIndices.map((capture) => {
			return lineText.substring(capture.start, capture.end);
		});
		BACK_REFERENCING_END.lastIndex = 0;
		return this.source.replace(BACK_REFERENCING_END, (match, g1) => {
			return escapeRegExpCharacters(capturedValues[parseInt(g1, 10)] || "");
		});
	}
	_buildAnchorCache() {
		if (typeof this.source !== "string") throw new Error("This method should only be called if the source is a string");
		let A0_G0_result = [];
		let A0_G1_result = [];
		let A1_G0_result = [];
		let A1_G1_result = [];
		let pos, len, ch, nextCh;
		for (pos = 0, len = this.source.length; pos < len; pos++) {
			ch = this.source.charAt(pos);
			A0_G0_result[pos] = ch;
			A0_G1_result[pos] = ch;
			A1_G0_result[pos] = ch;
			A1_G1_result[pos] = ch;
			if (ch === "\\") {
				if (pos + 1 < len) {
					nextCh = this.source.charAt(pos + 1);
					if (nextCh === "A") {
						A0_G0_result[pos + 1] = "￿";
						A0_G1_result[pos + 1] = "￿";
						A1_G0_result[pos + 1] = "A";
						A1_G1_result[pos + 1] = "A";
					} else if (nextCh === "G") {
						A0_G0_result[pos + 1] = "￿";
						A0_G1_result[pos + 1] = "G";
						A1_G0_result[pos + 1] = "￿";
						A1_G1_result[pos + 1] = "G";
					} else {
						A0_G0_result[pos + 1] = nextCh;
						A0_G1_result[pos + 1] = nextCh;
						A1_G0_result[pos + 1] = nextCh;
						A1_G1_result[pos + 1] = nextCh;
					}
					pos++;
				}
			}
		}
		return {
			A0_G0: A0_G0_result.join(""),
			A0_G1: A0_G1_result.join(""),
			A1_G0: A1_G0_result.join(""),
			A1_G1: A1_G1_result.join("")
		};
	}
	resolveAnchors(allowA, allowG) {
		if (!this.hasAnchor || !this._anchorCache || typeof this.source !== "string") return this.source;
		if (allowA) if (allowG) return this._anchorCache.A1_G1;
		else return this._anchorCache.A1_G0;
		else if (allowG) return this._anchorCache.A0_G1;
		else return this._anchorCache.A0_G0;
	}
};
var RegExpSourceList = class {
	_items;
	_hasAnchors;
	_cached;
	_anchorCache;
	constructor() {
		this._items = [];
		this._hasAnchors = false;
		this._cached = null;
		this._anchorCache = {
			A0_G0: null,
			A0_G1: null,
			A1_G0: null,
			A1_G1: null
		};
	}
	dispose() {
		this._disposeCaches();
	}
	_disposeCaches() {
		if (this._cached) {
			this._cached.dispose();
			this._cached = null;
		}
		if (this._anchorCache.A0_G0) {
			this._anchorCache.A0_G0.dispose();
			this._anchorCache.A0_G0 = null;
		}
		if (this._anchorCache.A0_G1) {
			this._anchorCache.A0_G1.dispose();
			this._anchorCache.A0_G1 = null;
		}
		if (this._anchorCache.A1_G0) {
			this._anchorCache.A1_G0.dispose();
			this._anchorCache.A1_G0 = null;
		}
		if (this._anchorCache.A1_G1) {
			this._anchorCache.A1_G1.dispose();
			this._anchorCache.A1_G1 = null;
		}
	}
	push(item) {
		this._items.push(item);
		this._hasAnchors = this._hasAnchors || item.hasAnchor;
	}
	unshift(item) {
		this._items.unshift(item);
		this._hasAnchors = this._hasAnchors || item.hasAnchor;
	}
	length() {
		return this._items.length;
	}
	setSource(index, newSource) {
		if (this._items[index].source !== newSource) {
			this._disposeCaches();
			this._items[index].setSource(newSource);
		}
	}
	compile(onigLib) {
		if (!this._cached) {
			let regExps = this._items.map((e) => e.source);
			this._cached = new CompiledRule(onigLib, regExps, this._items.map((e) => e.ruleId));
		}
		return this._cached;
	}
	compileAG(onigLib, allowA, allowG) {
		if (!this._hasAnchors) return this.compile(onigLib);
		else if (allowA) if (allowG) {
			if (!this._anchorCache.A1_G1) this._anchorCache.A1_G1 = this._resolveAnchors(onigLib, allowA, allowG);
			return this._anchorCache.A1_G1;
		} else {
			if (!this._anchorCache.A1_G0) this._anchorCache.A1_G0 = this._resolveAnchors(onigLib, allowA, allowG);
			return this._anchorCache.A1_G0;
		}
		else if (allowG) {
			if (!this._anchorCache.A0_G1) this._anchorCache.A0_G1 = this._resolveAnchors(onigLib, allowA, allowG);
			return this._anchorCache.A0_G1;
		} else {
			if (!this._anchorCache.A0_G0) this._anchorCache.A0_G0 = this._resolveAnchors(onigLib, allowA, allowG);
			return this._anchorCache.A0_G0;
		}
	}
	_resolveAnchors(onigLib, allowA, allowG) {
		return new CompiledRule(onigLib, this._items.map((e) => e.resolveAnchors(allowA, allowG)), this._items.map((e) => e.ruleId));
	}
};
var CompiledRule = class {
	constructor(onigLib, regExps, rules) {
		this.regExps = regExps;
		this.rules = rules;
		this.scanner = onigLib.createOnigScanner(regExps);
	}
	scanner;
	dispose() {
		if (typeof this.scanner.dispose === "function") this.scanner.dispose();
	}
	toString() {
		const r = [];
		for (let i = 0, len = this.rules.length; i < len; i++) r.push("   - " + this.rules[i] + ": " + this.regExps[i]);
		return r.join("\n");
	}
	findNextMatchSync(string, startPosition, options) {
		const result = this.scanner.findNextMatchSync(string, startPosition, options);
		if (!result) return null;
		return {
			ruleId: this.rules[result.index],
			captureIndices: result.captureIndices
		};
	}
};
var BasicScopeAttributes = class {
	constructor(languageId, tokenType) {
		this.languageId = languageId;
		this.tokenType = tokenType;
	}
};
var BasicScopeAttributesProvider = class _BasicScopeAttributesProvider {
	_defaultAttributes;
	_embeddedLanguagesMatcher;
	constructor(initialLanguageId, embeddedLanguages) {
		this._defaultAttributes = new BasicScopeAttributes(initialLanguageId, 8);
		this._embeddedLanguagesMatcher = new ScopeMatcher(Object.entries(embeddedLanguages || {}));
	}
	getDefaultAttributes() {
		return this._defaultAttributes;
	}
	getBasicScopeAttributes(scopeName) {
		if (scopeName === null) return _BasicScopeAttributesProvider._NULL_SCOPE_METADATA;
		return this._getBasicScopeAttributes.get(scopeName);
	}
	static _NULL_SCOPE_METADATA = new BasicScopeAttributes(0, 0);
	_getBasicScopeAttributes = new CachedFn((scopeName) => {
		return new BasicScopeAttributes(this._scopeToLanguage(scopeName), this._toStandardTokenType(scopeName));
	});
	/**
	* Given a produced TM scope, return the language that token describes or null if unknown.
	* e.g. source.html => html, source.css.embedded.html => css, punctuation.definition.tag.html => null
	*/
	_scopeToLanguage(scope) {
		return this._embeddedLanguagesMatcher.match(scope) || 0;
	}
	_toStandardTokenType(scopeName) {
		const m = scopeName.match(_BasicScopeAttributesProvider.STANDARD_TOKEN_TYPE_REGEXP);
		if (!m) return 8;
		switch (m[1]) {
			case "comment": return 1;
			case "string": return 2;
			case "regex": return 3;
			case "meta.embedded": return 0;
		}
		throw new Error("Unexpected match for standard token type!");
	}
	static STANDARD_TOKEN_TYPE_REGEXP = /\b(comment|string|regex|meta\.embedded)\b/;
};
var ScopeMatcher = class {
	values;
	scopesRegExp;
	constructor(values) {
		if (values.length === 0) {
			this.values = null;
			this.scopesRegExp = null;
		} else {
			this.values = new Map(values);
			const escapedScopes = values.map(([scopeName, value]) => escapeRegExpCharacters(scopeName));
			escapedScopes.sort();
			escapedScopes.reverse();
			this.scopesRegExp = new RegExp(`^((${escapedScopes.join(")|(")}))($|\\.)`, "");
		}
	}
	match(scope) {
		if (!this.scopesRegExp) return;
		const m = scope.match(this.scopesRegExp);
		if (!m) return;
		return this.values.get(m[1]);
	}
};
typeof process !== "undefined" && process.env["VSCODE_TEXTMATE_DEBUG"];
var UseOnigurumaFindOptions = false;
var TokenizeStringResult = class {
	constructor(stack, stoppedEarly) {
		this.stack = stack;
		this.stoppedEarly = stoppedEarly;
	}
};
function _tokenizeString(grammar, lineText, isFirstLine, linePos, stack, lineTokens, checkWhileConditions, timeLimit) {
	const lineLength = lineText.content.length;
	let STOP = false;
	let anchorPosition = -1;
	if (checkWhileConditions) {
		const whileCheckResult = _checkWhileConditions(grammar, lineText, isFirstLine, linePos, stack, lineTokens);
		stack = whileCheckResult.stack;
		linePos = whileCheckResult.linePos;
		isFirstLine = whileCheckResult.isFirstLine;
		anchorPosition = whileCheckResult.anchorPosition;
	}
	const startTime = Date.now();
	while (!STOP) {
		if (timeLimit !== 0) {
			if (Date.now() - startTime > timeLimit) return new TokenizeStringResult(stack, true);
		}
		scanNext();
	}
	return new TokenizeStringResult(stack, false);
	function scanNext() {
		const r = matchRuleOrInjections(grammar, lineText, isFirstLine, linePos, stack, anchorPosition);
		if (!r) {
			lineTokens.produce(stack, lineLength);
			STOP = true;
			return;
		}
		const captureIndices = r.captureIndices;
		const matchedRuleId = r.matchedRuleId;
		const hasAdvanced = captureIndices && captureIndices.length > 0 ? captureIndices[0].end > linePos : false;
		if (matchedRuleId === endRuleId) {
			const poppedRule = stack.getRule(grammar);
			lineTokens.produce(stack, captureIndices[0].start);
			stack = stack.withContentNameScopesList(stack.nameScopesList);
			handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, poppedRule.endCaptures, captureIndices);
			lineTokens.produce(stack, captureIndices[0].end);
			const popped = stack;
			stack = stack.parent;
			anchorPosition = popped.getAnchorPos();
			if (!hasAdvanced && popped.getEnterPos() === linePos) {
				stack = popped;
				lineTokens.produce(stack, lineLength);
				STOP = true;
				return;
			}
		} else {
			const _rule = grammar.getRule(matchedRuleId);
			lineTokens.produce(stack, captureIndices[0].start);
			const beforePush = stack;
			const scopeName = _rule.getName(lineText.content, captureIndices);
			const nameScopesList = stack.contentNameScopesList.pushAttributed(scopeName, grammar);
			stack = stack.push(matchedRuleId, linePos, anchorPosition, captureIndices[0].end === lineLength, null, nameScopesList, nameScopesList);
			if (_rule instanceof BeginEndRule) {
				const pushedRule = _rule;
				handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, pushedRule.beginCaptures, captureIndices);
				lineTokens.produce(stack, captureIndices[0].end);
				anchorPosition = captureIndices[0].end;
				const contentName = pushedRule.getContentName(lineText.content, captureIndices);
				const contentNameScopesList = nameScopesList.pushAttributed(contentName, grammar);
				stack = stack.withContentNameScopesList(contentNameScopesList);
				if (pushedRule.endHasBackReferences) stack = stack.withEndRule(pushedRule.getEndWithResolvedBackReferences(lineText.content, captureIndices));
				if (!hasAdvanced && beforePush.hasSameRuleAs(stack)) {
					stack = stack.pop();
					lineTokens.produce(stack, lineLength);
					STOP = true;
					return;
				}
			} else if (_rule instanceof BeginWhileRule) {
				const pushedRule = _rule;
				handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, pushedRule.beginCaptures, captureIndices);
				lineTokens.produce(stack, captureIndices[0].end);
				anchorPosition = captureIndices[0].end;
				const contentName = pushedRule.getContentName(lineText.content, captureIndices);
				const contentNameScopesList = nameScopesList.pushAttributed(contentName, grammar);
				stack = stack.withContentNameScopesList(contentNameScopesList);
				if (pushedRule.whileHasBackReferences) stack = stack.withEndRule(pushedRule.getWhileWithResolvedBackReferences(lineText.content, captureIndices));
				if (!hasAdvanced && beforePush.hasSameRuleAs(stack)) {
					stack = stack.pop();
					lineTokens.produce(stack, lineLength);
					STOP = true;
					return;
				}
			} else {
				handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, _rule.captures, captureIndices);
				lineTokens.produce(stack, captureIndices[0].end);
				stack = stack.pop();
				if (!hasAdvanced) {
					stack = stack.safePop();
					lineTokens.produce(stack, lineLength);
					STOP = true;
					return;
				}
			}
		}
		if (captureIndices[0].end > linePos) {
			linePos = captureIndices[0].end;
			isFirstLine = false;
		}
	}
}
function _checkWhileConditions(grammar, lineText, isFirstLine, linePos, stack, lineTokens) {
	let anchorPosition = stack.beginRuleCapturedEOL ? 0 : -1;
	const whileRules = [];
	for (let node = stack; node; node = node.pop()) {
		const nodeRule = node.getRule(grammar);
		if (nodeRule instanceof BeginWhileRule) whileRules.push({
			rule: nodeRule,
			stack: node
		});
	}
	for (let whileRule = whileRules.pop(); whileRule; whileRule = whileRules.pop()) {
		const { ruleScanner, findOptions } = prepareRuleWhileSearch(whileRule.rule, grammar, whileRule.stack.endRule, isFirstLine, linePos === anchorPosition);
		const r = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
		if (r) {
			if (r.ruleId !== whileRuleId) {
				stack = whileRule.stack.pop();
				break;
			}
			if (r.captureIndices && r.captureIndices.length) {
				lineTokens.produce(whileRule.stack, r.captureIndices[0].start);
				handleCaptures(grammar, lineText, isFirstLine, whileRule.stack, lineTokens, whileRule.rule.whileCaptures, r.captureIndices);
				lineTokens.produce(whileRule.stack, r.captureIndices[0].end);
				anchorPosition = r.captureIndices[0].end;
				if (r.captureIndices[0].end > linePos) {
					linePos = r.captureIndices[0].end;
					isFirstLine = false;
				}
			}
		} else {
			stack = whileRule.stack.pop();
			break;
		}
	}
	return {
		stack,
		linePos,
		anchorPosition,
		isFirstLine
	};
}
function matchRuleOrInjections(grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
	const matchResult = matchRule(grammar, lineText, isFirstLine, linePos, stack, anchorPosition);
	const injections = grammar.getInjections();
	if (injections.length === 0) return matchResult;
	const injectionResult = matchInjections(injections, grammar, lineText, isFirstLine, linePos, stack, anchorPosition);
	if (!injectionResult) return matchResult;
	if (!matchResult) return injectionResult;
	const matchResultScore = matchResult.captureIndices[0].start;
	const injectionResultScore = injectionResult.captureIndices[0].start;
	if (injectionResultScore < matchResultScore || injectionResult.priorityMatch && injectionResultScore === matchResultScore) return injectionResult;
	return matchResult;
}
function matchRule(grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
	const { ruleScanner, findOptions } = prepareRuleSearch(stack.getRule(grammar), grammar, stack.endRule, isFirstLine, linePos === anchorPosition);
	const r = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
	if (r) return {
		captureIndices: r.captureIndices,
		matchedRuleId: r.ruleId
	};
	return null;
}
function matchInjections(injections, grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
	let bestMatchRating = Number.MAX_VALUE;
	let bestMatchCaptureIndices = null;
	let bestMatchRuleId;
	let bestMatchResultPriority = 0;
	const scopes = stack.contentNameScopesList.getScopeNames();
	for (let i = 0, len = injections.length; i < len; i++) {
		const injection = injections[i];
		if (!injection.matcher(scopes)) continue;
		const { ruleScanner, findOptions } = prepareRuleSearch(grammar.getRule(injection.ruleId), grammar, null, isFirstLine, linePos === anchorPosition);
		const matchResult = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
		if (!matchResult) continue;
		const matchRating = matchResult.captureIndices[0].start;
		if (matchRating >= bestMatchRating) continue;
		bestMatchRating = matchRating;
		bestMatchCaptureIndices = matchResult.captureIndices;
		bestMatchRuleId = matchResult.ruleId;
		bestMatchResultPriority = injection.priority;
		if (bestMatchRating === linePos) break;
	}
	if (bestMatchCaptureIndices) return {
		priorityMatch: bestMatchResultPriority === -1,
		captureIndices: bestMatchCaptureIndices,
		matchedRuleId: bestMatchRuleId
	};
	return null;
}
function prepareRuleSearch(rule, grammar, endRegexSource, allowA, allowG) {
	if (UseOnigurumaFindOptions) return {
		ruleScanner: rule.compile(grammar, endRegexSource),
		findOptions: getFindOptions(allowA, allowG)
	};
	return {
		ruleScanner: rule.compileAG(grammar, endRegexSource, allowA, allowG),
		findOptions: 0
	};
}
function prepareRuleWhileSearch(rule, grammar, endRegexSource, allowA, allowG) {
	if (UseOnigurumaFindOptions) return {
		ruleScanner: rule.compileWhile(grammar, endRegexSource),
		findOptions: getFindOptions(allowA, allowG)
	};
	return {
		ruleScanner: rule.compileWhileAG(grammar, endRegexSource, allowA, allowG),
		findOptions: 0
	};
}
function getFindOptions(allowA, allowG) {
	let options = 0;
	if (!allowA) options |= 1;
	if (!allowG) options |= 4;
	return options;
}
function handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, captures, captureIndices) {
	if (captures.length === 0) return;
	const lineTextContent = lineText.content;
	const len = Math.min(captures.length, captureIndices.length);
	const localStack = [];
	const maxEnd = captureIndices[0].end;
	for (let i = 0; i < len; i++) {
		const captureRule = captures[i];
		if (captureRule === null) continue;
		const captureIndex = captureIndices[i];
		if (captureIndex.length === 0) continue;
		if (captureIndex.start > maxEnd) break;
		while (localStack.length > 0 && localStack[localStack.length - 1].endPos <= captureIndex.start) {
			lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, localStack[localStack.length - 1].endPos);
			localStack.pop();
		}
		if (localStack.length > 0) lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, captureIndex.start);
		else lineTokens.produce(stack, captureIndex.start);
		if (captureRule.retokenizeCapturedWithRuleId) {
			const scopeName = captureRule.getName(lineTextContent, captureIndices);
			const nameScopesList = stack.contentNameScopesList.pushAttributed(scopeName, grammar);
			const contentName = captureRule.getContentName(lineTextContent, captureIndices);
			const contentNameScopesList = nameScopesList.pushAttributed(contentName, grammar);
			const stackClone = stack.push(captureRule.retokenizeCapturedWithRuleId, captureIndex.start, -1, false, null, nameScopesList, contentNameScopesList);
			const onigSubStr = grammar.createOnigString(lineTextContent.substring(0, captureIndex.end));
			_tokenizeString(grammar, onigSubStr, isFirstLine && captureIndex.start === 0, captureIndex.start, stackClone, lineTokens, false, 0);
			disposeOnigString(onigSubStr);
			continue;
		}
		const captureRuleScopeName = captureRule.getName(lineTextContent, captureIndices);
		if (captureRuleScopeName !== null) {
			const captureRuleScopesList = (localStack.length > 0 ? localStack[localStack.length - 1].scopes : stack.contentNameScopesList).pushAttributed(captureRuleScopeName, grammar);
			localStack.push(new LocalStackElement(captureRuleScopesList, captureIndex.end));
		}
	}
	while (localStack.length > 0) {
		lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, localStack[localStack.length - 1].endPos);
		localStack.pop();
	}
}
var LocalStackElement = class {
	scopes;
	endPos;
	constructor(scopes, endPos) {
		this.scopes = scopes;
		this.endPos = endPos;
	}
};
function createGrammar(scopeName, grammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, grammarRepository, onigLib) {
	return new Grammar(scopeName, grammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, grammarRepository, onigLib);
}
function collectInjections(result, selector, rule, ruleFactoryHelper, grammar) {
	const matchers = createMatchers(selector, nameMatcher);
	const ruleId = RuleFactory.getCompiledRuleId(rule, ruleFactoryHelper, grammar.repository);
	for (const matcher of matchers) result.push({
		debugSelector: selector,
		matcher: matcher.matcher,
		ruleId,
		grammar,
		priority: matcher.priority
	});
}
function nameMatcher(identifers, scopes) {
	if (scopes.length < identifers.length) return false;
	let lastIndex = 0;
	return identifers.every((identifier) => {
		for (let i = lastIndex; i < scopes.length; i++) if (scopesAreMatching(scopes[i], identifier)) {
			lastIndex = i + 1;
			return true;
		}
		return false;
	});
}
function scopesAreMatching(thisScopeName, scopeName) {
	if (!thisScopeName) return false;
	if (thisScopeName === scopeName) return true;
	const len = scopeName.length;
	return thisScopeName.length > len && thisScopeName.substr(0, len) === scopeName && thisScopeName[len] === ".";
}
var Grammar = class {
	constructor(_rootScopeName, grammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, grammarRepository, _onigLib) {
		this._rootScopeName = _rootScopeName;
		this.balancedBracketSelectors = balancedBracketSelectors;
		this._onigLib = _onigLib;
		this._basicScopeAttributesProvider = new BasicScopeAttributesProvider(initialLanguage, embeddedLanguages);
		this._rootId = -1;
		this._lastRuleId = 0;
		this._ruleId2desc = [null];
		this._includedGrammars = {};
		this._grammarRepository = grammarRepository;
		this._grammar = initGrammar(grammar, null);
		this._injections = null;
		this._tokenTypeMatchers = [];
		if (tokenTypes) for (const selector of Object.keys(tokenTypes)) {
			const matchers = createMatchers(selector, nameMatcher);
			for (const matcher of matchers) this._tokenTypeMatchers.push({
				matcher: matcher.matcher,
				type: tokenTypes[selector]
			});
		}
	}
	_rootId;
	_lastRuleId;
	_ruleId2desc;
	_includedGrammars;
	_grammarRepository;
	_grammar;
	_injections;
	_basicScopeAttributesProvider;
	_tokenTypeMatchers;
	get themeProvider() {
		return this._grammarRepository;
	}
	dispose() {
		for (const rule of this._ruleId2desc) if (rule) rule.dispose();
	}
	createOnigScanner(sources) {
		return this._onigLib.createOnigScanner(sources);
	}
	createOnigString(sources) {
		return this._onigLib.createOnigString(sources);
	}
	getMetadataForScope(scope) {
		return this._basicScopeAttributesProvider.getBasicScopeAttributes(scope);
	}
	_collectInjections() {
		const grammarRepository = {
			lookup: (scopeName2) => {
				if (scopeName2 === this._rootScopeName) return this._grammar;
				return this.getExternalGrammar(scopeName2);
			},
			injections: (scopeName2) => {
				return this._grammarRepository.injections(scopeName2);
			}
		};
		const result = [];
		const scopeName = this._rootScopeName;
		const grammar = grammarRepository.lookup(scopeName);
		if (grammar) {
			const rawInjections = grammar.injections;
			if (rawInjections) for (let expression in rawInjections) collectInjections(result, expression, rawInjections[expression], this, grammar);
			const injectionScopeNames = this._grammarRepository.injections(scopeName);
			if (injectionScopeNames) injectionScopeNames.forEach((injectionScopeName) => {
				const injectionGrammar = this.getExternalGrammar(injectionScopeName);
				if (injectionGrammar) {
					const selector = injectionGrammar.injectionSelector;
					if (selector) collectInjections(result, selector, injectionGrammar, this, injectionGrammar);
				}
			});
		}
		result.sort((i1, i2) => i1.priority - i2.priority);
		return result;
	}
	getInjections() {
		if (this._injections === null) this._injections = this._collectInjections();
		return this._injections;
	}
	registerRule(factory) {
		const id = ++this._lastRuleId;
		const result = factory(ruleIdFromNumber(id));
		this._ruleId2desc[id] = result;
		return result;
	}
	getRule(ruleId) {
		return this._ruleId2desc[ruleIdToNumber(ruleId)];
	}
	getExternalGrammar(scopeName, repository) {
		if (this._includedGrammars[scopeName]) return this._includedGrammars[scopeName];
		else if (this._grammarRepository) {
			const rawIncludedGrammar = this._grammarRepository.lookup(scopeName);
			if (rawIncludedGrammar) {
				this._includedGrammars[scopeName] = initGrammar(rawIncludedGrammar, repository && repository.$base);
				return this._includedGrammars[scopeName];
			}
		}
	}
	tokenizeLine(lineText, prevState, timeLimit = 0) {
		const r = this._tokenize(lineText, prevState, false, timeLimit);
		return {
			tokens: r.lineTokens.getResult(r.ruleStack, r.lineLength),
			ruleStack: r.ruleStack,
			stoppedEarly: r.stoppedEarly
		};
	}
	tokenizeLine2(lineText, prevState, timeLimit = 0) {
		const r = this._tokenize(lineText, prevState, true, timeLimit);
		return {
			tokens: r.lineTokens.getBinaryResult(r.ruleStack, r.lineLength),
			ruleStack: r.ruleStack,
			stoppedEarly: r.stoppedEarly
		};
	}
	_tokenize(lineText, prevState, emitBinaryTokens, timeLimit) {
		if (this._rootId === -1) {
			this._rootId = RuleFactory.getCompiledRuleId(this._grammar.repository.$self, this, this._grammar.repository);
			this.getInjections();
		}
		let isFirstLine;
		if (!prevState || prevState === StateStackImpl.NULL) {
			isFirstLine = true;
			const rawDefaultMetadata = this._basicScopeAttributesProvider.getDefaultAttributes();
			const defaultStyle = this.themeProvider.getDefaults();
			const defaultMetadata = EncodedTokenMetadata.set(0, rawDefaultMetadata.languageId, rawDefaultMetadata.tokenType, null, defaultStyle.fontStyle, defaultStyle.foregroundId, defaultStyle.backgroundId);
			const rootScopeName = this.getRule(this._rootId).getName(null, null);
			let scopeList;
			if (rootScopeName) scopeList = AttributedScopeStack.createRootAndLookUpScopeName(rootScopeName, defaultMetadata, this);
			else scopeList = AttributedScopeStack.createRoot("unknown", defaultMetadata);
			prevState = new StateStackImpl(null, this._rootId, -1, -1, false, null, scopeList, scopeList);
		} else {
			isFirstLine = false;
			prevState.reset();
		}
		lineText = lineText + "\n";
		const onigLineText = this.createOnigString(lineText);
		const lineLength = onigLineText.content.length;
		const lineTokens = new LineTokens(emitBinaryTokens, lineText, this._tokenTypeMatchers, this.balancedBracketSelectors);
		const r = _tokenizeString(this, onigLineText, isFirstLine, 0, prevState, lineTokens, true, timeLimit);
		disposeOnigString(onigLineText);
		return {
			lineLength,
			lineTokens,
			ruleStack: r.stack,
			stoppedEarly: r.stoppedEarly
		};
	}
};
function initGrammar(grammar, base) {
	grammar = clone(grammar);
	grammar.repository = grammar.repository || {};
	grammar.repository.$self = {
		$vscodeTextmateLocation: grammar.$vscodeTextmateLocation,
		patterns: grammar.patterns,
		name: grammar.scopeName
	};
	grammar.repository.$base = base || grammar.repository.$self;
	return grammar;
}
var AttributedScopeStack = class _AttributedScopeStack {
	/**
	* Invariant:
	* ```
	* if (parent && !scopePath.extends(parent.scopePath)) {
	* 	throw new Error();
	* }
	* ```
	*/
	constructor(parent, scopePath, tokenAttributes) {
		this.parent = parent;
		this.scopePath = scopePath;
		this.tokenAttributes = tokenAttributes;
	}
	static fromExtension(namesScopeList, contentNameScopesList) {
		let current = namesScopeList;
		let scopeNames = namesScopeList?.scopePath ?? null;
		for (const frame of contentNameScopesList) {
			scopeNames = ScopeStack.push(scopeNames, frame.scopeNames);
			current = new _AttributedScopeStack(current, scopeNames, frame.encodedTokenAttributes);
		}
		return current;
	}
	static createRoot(scopeName, tokenAttributes) {
		return new _AttributedScopeStack(null, new ScopeStack(null, scopeName), tokenAttributes);
	}
	static createRootAndLookUpScopeName(scopeName, tokenAttributes, grammar) {
		const rawRootMetadata = grammar.getMetadataForScope(scopeName);
		const scopePath = new ScopeStack(null, scopeName);
		const rootStyle = grammar.themeProvider.themeMatch(scopePath);
		const resolvedTokenAttributes = _AttributedScopeStack.mergeAttributes(tokenAttributes, rawRootMetadata, rootStyle);
		return new _AttributedScopeStack(null, scopePath, resolvedTokenAttributes);
	}
	get scopeName() {
		return this.scopePath.scopeName;
	}
	toString() {
		return this.getScopeNames().join(" ");
	}
	equals(other) {
		return _AttributedScopeStack.equals(this, other);
	}
	static equals(a, b) {
		do {
			if (a === b) return true;
			if (!a && !b) return true;
			if (!a || !b) return false;
			if (a.scopeName !== b.scopeName || a.tokenAttributes !== b.tokenAttributes) return false;
			a = a.parent;
			b = b.parent;
		} while (true);
	}
	static mergeAttributes(existingTokenAttributes, basicScopeAttributes, styleAttributes) {
		let fontStyle = -1;
		let foreground = 0;
		let background = 0;
		if (styleAttributes !== null) {
			fontStyle = styleAttributes.fontStyle;
			foreground = styleAttributes.foregroundId;
			background = styleAttributes.backgroundId;
		}
		return EncodedTokenMetadata.set(existingTokenAttributes, basicScopeAttributes.languageId, basicScopeAttributes.tokenType, null, fontStyle, foreground, background);
	}
	pushAttributed(scopePath, grammar) {
		if (scopePath === null) return this;
		if (scopePath.indexOf(" ") === -1) return _AttributedScopeStack._pushAttributed(this, scopePath, grammar);
		const scopes = scopePath.split(/ /g);
		let result = this;
		for (const scope of scopes) result = _AttributedScopeStack._pushAttributed(result, scope, grammar);
		return result;
	}
	static _pushAttributed(target, scopeName, grammar) {
		const rawMetadata = grammar.getMetadataForScope(scopeName);
		const newPath = target.scopePath.push(scopeName);
		const scopeThemeMatchResult = grammar.themeProvider.themeMatch(newPath);
		const metadata = _AttributedScopeStack.mergeAttributes(target.tokenAttributes, rawMetadata, scopeThemeMatchResult);
		return new _AttributedScopeStack(target, newPath, metadata);
	}
	getScopeNames() {
		return this.scopePath.getSegments();
	}
	getExtensionIfDefined(base) {
		const result = [];
		let self = this;
		while (self && self !== base) {
			result.push({
				encodedTokenAttributes: self.tokenAttributes,
				scopeNames: self.scopePath.getExtensionIfDefined(self.parent?.scopePath ?? null)
			});
			self = self.parent;
		}
		return self === base ? result.reverse() : void 0;
	}
};
var StateStackImpl = class _StateStackImpl {
	/**
	* Invariant:
	* ```
	* if (contentNameScopesList !== nameScopesList && contentNameScopesList?.parent !== nameScopesList) {
	* 	throw new Error();
	* }
	* if (this.parent && !nameScopesList.extends(this.parent.contentNameScopesList)) {
	* 	throw new Error();
	* }
	* ```
	*/
	constructor(parent, ruleId, enterPos, anchorPos, beginRuleCapturedEOL, endRule, nameScopesList, contentNameScopesList) {
		this.parent = parent;
		this.ruleId = ruleId;
		this.beginRuleCapturedEOL = beginRuleCapturedEOL;
		this.endRule = endRule;
		this.nameScopesList = nameScopesList;
		this.contentNameScopesList = contentNameScopesList;
		this.depth = this.parent ? this.parent.depth + 1 : 1;
		this._enterPos = enterPos;
		this._anchorPos = anchorPos;
	}
	_stackElementBrand = void 0;
	static NULL = new _StateStackImpl(null, 0, 0, 0, false, null, null, null);
	/**
	* The position on the current line where this state was pushed.
	* This is relevant only while tokenizing a line, to detect endless loops.
	* Its value is meaningless across lines.
	*/
	_enterPos;
	/**
	* The captured anchor position when this stack element was pushed.
	* This is relevant only while tokenizing a line, to restore the anchor position when popping.
	* Its value is meaningless across lines.
	*/
	_anchorPos;
	/**
	* The depth of the stack.
	*/
	depth;
	equals(other) {
		if (other === null) return false;
		return _StateStackImpl._equals(this, other);
	}
	static _equals(a, b) {
		if (a === b) return true;
		if (!this._structuralEquals(a, b)) return false;
		return AttributedScopeStack.equals(a.contentNameScopesList, b.contentNameScopesList);
	}
	/**
	* A structural equals check. Does not take into account `scopes`.
	*/
	static _structuralEquals(a, b) {
		do {
			if (a === b) return true;
			if (!a && !b) return true;
			if (!a || !b) return false;
			if (a.depth !== b.depth || a.ruleId !== b.ruleId || a.endRule !== b.endRule) return false;
			a = a.parent;
			b = b.parent;
		} while (true);
	}
	clone() {
		return this;
	}
	static _reset(el) {
		while (el) {
			el._enterPos = -1;
			el._anchorPos = -1;
			el = el.parent;
		}
	}
	reset() {
		_StateStackImpl._reset(this);
	}
	pop() {
		return this.parent;
	}
	safePop() {
		if (this.parent) return this.parent;
		return this;
	}
	push(ruleId, enterPos, anchorPos, beginRuleCapturedEOL, endRule, nameScopesList, contentNameScopesList) {
		return new _StateStackImpl(this, ruleId, enterPos, anchorPos, beginRuleCapturedEOL, endRule, nameScopesList, contentNameScopesList);
	}
	getEnterPos() {
		return this._enterPos;
	}
	getAnchorPos() {
		return this._anchorPos;
	}
	getRule(grammar) {
		return grammar.getRule(this.ruleId);
	}
	toString() {
		const r = [];
		this._writeString(r, 0);
		return "[" + r.join(",") + "]";
	}
	_writeString(res, outIndex) {
		if (this.parent) outIndex = this.parent._writeString(res, outIndex);
		res[outIndex++] = `(${this.ruleId}, ${this.nameScopesList?.toString()}, ${this.contentNameScopesList?.toString()})`;
		return outIndex;
	}
	withContentNameScopesList(contentNameScopeStack) {
		if (this.contentNameScopesList === contentNameScopeStack) return this;
		return this.parent.push(this.ruleId, this._enterPos, this._anchorPos, this.beginRuleCapturedEOL, this.endRule, this.nameScopesList, contentNameScopeStack);
	}
	withEndRule(endRule) {
		if (this.endRule === endRule) return this;
		return new _StateStackImpl(this.parent, this.ruleId, this._enterPos, this._anchorPos, this.beginRuleCapturedEOL, endRule, this.nameScopesList, this.contentNameScopesList);
	}
	hasSameRuleAs(other) {
		let el = this;
		while (el && el._enterPos === other._enterPos) {
			if (el.ruleId === other.ruleId) return true;
			el = el.parent;
		}
		return false;
	}
	toStateStackFrame() {
		return {
			ruleId: ruleIdToNumber(this.ruleId),
			beginRuleCapturedEOL: this.beginRuleCapturedEOL,
			endRule: this.endRule,
			nameScopesList: this.nameScopesList?.getExtensionIfDefined(this.parent?.nameScopesList ?? null) ?? [],
			contentNameScopesList: this.contentNameScopesList?.getExtensionIfDefined(this.nameScopesList) ?? []
		};
	}
	static pushFrame(self, frame) {
		const namesScopeList = AttributedScopeStack.fromExtension(self?.nameScopesList ?? null, frame.nameScopesList);
		return new _StateStackImpl(self, ruleIdFromNumber(frame.ruleId), frame.enterPos ?? -1, frame.anchorPos ?? -1, frame.beginRuleCapturedEOL, frame.endRule, namesScopeList, AttributedScopeStack.fromExtension(namesScopeList, frame.contentNameScopesList));
	}
};
var BalancedBracketSelectors = class {
	balancedBracketScopes;
	unbalancedBracketScopes;
	allowAny = false;
	constructor(balancedBracketScopes, unbalancedBracketScopes) {
		this.balancedBracketScopes = balancedBracketScopes.flatMap((selector) => {
			if (selector === "*") {
				this.allowAny = true;
				return [];
			}
			return createMatchers(selector, nameMatcher).map((m) => m.matcher);
		});
		this.unbalancedBracketScopes = unbalancedBracketScopes.flatMap((selector) => createMatchers(selector, nameMatcher).map((m) => m.matcher));
	}
	get matchesAlways() {
		return this.allowAny && this.unbalancedBracketScopes.length === 0;
	}
	get matchesNever() {
		return this.balancedBracketScopes.length === 0 && !this.allowAny;
	}
	match(scopes) {
		for (const excluder of this.unbalancedBracketScopes) if (excluder(scopes)) return false;
		for (const includer of this.balancedBracketScopes) if (includer(scopes)) return true;
		return this.allowAny;
	}
};
var LineTokens = class {
	constructor(emitBinaryTokens, lineText, tokenTypeOverrides, balancedBracketSelectors) {
		this.balancedBracketSelectors = balancedBracketSelectors;
		this._emitBinaryTokens = emitBinaryTokens;
		this._tokenTypeOverrides = tokenTypeOverrides;
		this._lineText = null;
		this._tokens = [];
		this._binaryTokens = [];
		this._lastTokenEndIndex = 0;
	}
	_emitBinaryTokens;
	/**
	* defined only if `false`.
	*/
	_lineText;
	/**
	* used only if `_emitBinaryTokens` is false.
	*/
	_tokens;
	/**
	* used only if `_emitBinaryTokens` is true.
	*/
	_binaryTokens;
	_lastTokenEndIndex;
	_tokenTypeOverrides;
	produce(stack, endIndex) {
		this.produceFromScopes(stack.contentNameScopesList, endIndex);
	}
	produceFromScopes(scopesList, endIndex) {
		if (this._lastTokenEndIndex >= endIndex) return;
		if (this._emitBinaryTokens) {
			let metadata = scopesList?.tokenAttributes ?? 0;
			let containsBalancedBrackets = false;
			if (this.balancedBracketSelectors?.matchesAlways) containsBalancedBrackets = true;
			if (this._tokenTypeOverrides.length > 0 || this.balancedBracketSelectors && !this.balancedBracketSelectors.matchesAlways && !this.balancedBracketSelectors.matchesNever) {
				const scopes2 = scopesList?.getScopeNames() ?? [];
				for (const tokenType of this._tokenTypeOverrides) if (tokenType.matcher(scopes2)) metadata = EncodedTokenMetadata.set(metadata, 0, toOptionalTokenType(tokenType.type), null, -1, 0, 0);
				if (this.balancedBracketSelectors) containsBalancedBrackets = this.balancedBracketSelectors.match(scopes2);
			}
			if (containsBalancedBrackets) metadata = EncodedTokenMetadata.set(metadata, 0, 8, containsBalancedBrackets, -1, 0, 0);
			if (this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 1] === metadata) {
				this._lastTokenEndIndex = endIndex;
				return;
			}
			this._binaryTokens.push(this._lastTokenEndIndex);
			this._binaryTokens.push(metadata);
			this._lastTokenEndIndex = endIndex;
			return;
		}
		const scopes = scopesList?.getScopeNames() ?? [];
		this._tokens.push({
			startIndex: this._lastTokenEndIndex,
			endIndex,
			scopes
		});
		this._lastTokenEndIndex = endIndex;
	}
	getResult(stack, lineLength) {
		if (this._tokens.length > 0 && this._tokens[this._tokens.length - 1].startIndex === lineLength - 1) this._tokens.pop();
		if (this._tokens.length === 0) {
			this._lastTokenEndIndex = -1;
			this.produce(stack, lineLength);
			this._tokens[this._tokens.length - 1].startIndex = 0;
		}
		return this._tokens;
	}
	getBinaryResult(stack, lineLength) {
		if (this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 2] === lineLength - 1) {
			this._binaryTokens.pop();
			this._binaryTokens.pop();
		}
		if (this._binaryTokens.length === 0) {
			this._lastTokenEndIndex = -1;
			this.produce(stack, lineLength);
			this._binaryTokens[this._binaryTokens.length - 2] = 0;
		}
		const result = new Uint32Array(this._binaryTokens.length);
		for (let i = 0, len = this._binaryTokens.length; i < len; i++) result[i] = this._binaryTokens[i];
		return result;
	}
};
var SyncRegistry = class {
	constructor(theme, _onigLib) {
		this._onigLib = _onigLib;
		this._theme = theme;
	}
	_grammars = /* @__PURE__ */ new Map();
	_rawGrammars = /* @__PURE__ */ new Map();
	_injectionGrammars = /* @__PURE__ */ new Map();
	_theme;
	dispose() {
		for (const grammar of this._grammars.values()) grammar.dispose();
	}
	setTheme(theme) {
		this._theme = theme;
	}
	getColorMap() {
		return this._theme.getColorMap();
	}
	/**
	* Add `grammar` to registry and return a list of referenced scope names
	*/
	addGrammar(grammar, injectionScopeNames) {
		this._rawGrammars.set(grammar.scopeName, grammar);
		if (injectionScopeNames) this._injectionGrammars.set(grammar.scopeName, injectionScopeNames);
	}
	/**
	* Lookup a raw grammar.
	*/
	lookup(scopeName) {
		return this._rawGrammars.get(scopeName);
	}
	/**
	* Returns the injections for the given grammar
	*/
	injections(targetScope) {
		return this._injectionGrammars.get(targetScope);
	}
	/**
	* Get the default theme settings
	*/
	getDefaults() {
		return this._theme.getDefaults();
	}
	/**
	* Match a scope in the theme.
	*/
	themeMatch(scopePath) {
		return this._theme.match(scopePath);
	}
	/**
	* Lookup a grammar.
	*/
	grammarForScopeName(scopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors) {
		if (!this._grammars.has(scopeName)) {
			let rawGrammar = this._rawGrammars.get(scopeName);
			if (!rawGrammar) return null;
			this._grammars.set(scopeName, createGrammar(scopeName, rawGrammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, this, this._onigLib));
		}
		return this._grammars.get(scopeName);
	}
};
var Registry$1 = class {
	_options;
	_syncRegistry;
	_ensureGrammarCache;
	constructor(options) {
		this._options = options;
		this._syncRegistry = new SyncRegistry(Theme.createFromRawTheme(options.theme, options.colorMap), options.onigLib);
		this._ensureGrammarCache = /* @__PURE__ */ new Map();
	}
	dispose() {
		this._syncRegistry.dispose();
	}
	/**
	* Change the theme. Once called, no previous `ruleStack` should be used anymore.
	*/
	setTheme(theme, colorMap) {
		this._syncRegistry.setTheme(Theme.createFromRawTheme(theme, colorMap));
	}
	/**
	* Returns a lookup array for color ids.
	*/
	getColorMap() {
		return this._syncRegistry.getColorMap();
	}
	/**
	* Load the grammar for `scopeName` and all referenced included grammars asynchronously.
	* Please do not use language id 0.
	*/
	loadGrammarWithEmbeddedLanguages(initialScopeName, initialLanguage, embeddedLanguages) {
		return this.loadGrammarWithConfiguration(initialScopeName, initialLanguage, { embeddedLanguages });
	}
	/**
	* Load the grammar for `scopeName` and all referenced included grammars asynchronously.
	* Please do not use language id 0.
	*/
	loadGrammarWithConfiguration(initialScopeName, initialLanguage, configuration) {
		return this._loadGrammar(initialScopeName, initialLanguage, configuration.embeddedLanguages, configuration.tokenTypes, new BalancedBracketSelectors(configuration.balancedBracketSelectors || [], configuration.unbalancedBracketSelectors || []));
	}
	/**
	* Load the grammar for `scopeName` and all referenced included grammars asynchronously.
	*/
	loadGrammar(initialScopeName) {
		return this._loadGrammar(initialScopeName, 0, null, null, null);
	}
	_loadGrammar(initialScopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors) {
		const dependencyProcessor = new ScopeDependencyProcessor(this._syncRegistry, initialScopeName);
		while (dependencyProcessor.Q.length > 0) {
			dependencyProcessor.Q.map((request) => this._loadSingleGrammar(request.scopeName));
			dependencyProcessor.processQueue();
		}
		return this._grammarForScopeName(initialScopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors);
	}
	_loadSingleGrammar(scopeName) {
		if (!this._ensureGrammarCache.has(scopeName)) {
			this._doLoadSingleGrammar(scopeName);
			this._ensureGrammarCache.set(scopeName, true);
		}
	}
	_doLoadSingleGrammar(scopeName) {
		const grammar = this._options.loadGrammar(scopeName);
		if (grammar) {
			const injections = typeof this._options.getInjections === "function" ? this._options.getInjections(scopeName) : void 0;
			this._syncRegistry.addGrammar(grammar, injections);
		}
	}
	/**
	* Adds a rawGrammar.
	*/
	addGrammar(rawGrammar, injections = [], initialLanguage = 0, embeddedLanguages = null) {
		this._syncRegistry.addGrammar(rawGrammar, injections);
		return this._grammarForScopeName(rawGrammar.scopeName, initialLanguage, embeddedLanguages);
	}
	/**
	* Get the grammar for `scopeName`. The grammar must first be created via `loadGrammar` or `addGrammar`.
	*/
	_grammarForScopeName(scopeName, initialLanguage = 0, embeddedLanguages = null, tokenTypes = null, balancedBracketSelectors = null) {
		return this._syncRegistry.grammarForScopeName(scopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors);
	}
};
var INITIAL = StateStackImpl.NULL;
//#endregion
//#region node_modules/.pnpm/@shikijs+primitive@4.3.0/node_modules/@shikijs/primitive/dist/index.mjs
function resolveColorReplacements(theme, options) {
	const replacements = typeof theme === "string" ? {} : { ...theme.colorReplacements };
	const themeName = typeof theme === "string" ? theme : theme.name;
	for (const [key, value] of Object.entries(options?.colorReplacements || {})) if (typeof value === "string") replacements[key] = value;
	else if (key === themeName) Object.assign(replacements, value);
	return replacements;
}
function applyColorReplacements(color, replacements) {
	if (!color) return color;
	return replacements?.[color?.toLowerCase()] || color;
}
function toArray(x) {
	return Array.isArray(x) ? x : [x];
}
/**
* Normalize a getter to a promise.
*/
async function normalizeGetter(p) {
	return Promise.resolve(typeof p === "function" ? p() : p).then((r) => r.default || r);
}
/**
* Check if the language is plaintext that is ignored by Shiki.
*
* Hard-coded plain text languages: `plaintext`, `txt`, `text`, `plain`.
*/
function isPlainLang(lang) {
	return !lang || [
		"plaintext",
		"txt",
		"text",
		"plain"
	].includes(lang);
}
/**
* Check if the language is specially handled or bypassed by Shiki.
*
* Hard-coded languages: `ansi` and plaintexts like `plaintext`, `txt`, `text`, `plain`.
*/
function isSpecialLang(lang) {
	return lang === "ansi" || isPlainLang(lang);
}
/**
* Check if the theme is specially handled or bypassed by Shiki.
*
* Hard-coded themes: `none`.
*/
function isNoneTheme(theme) {
	return theme === "none";
}
/**
* Check if the theme is specially handled or bypassed by Shiki.
*
* Hard-coded themes: `none`.
*/
function isSpecialTheme(theme) {
	return isNoneTheme(theme);
}
/**
* Split a string into lines, each line preserves the line ending.
*
* @param code - The code string to split into lines
* @param preserveEnding - Whether to preserve line endings in the result
* @returns Array of tuples containing [line content, offset index]
*
* @example
* ```ts
* splitLines('hello\nworld', false)
* // => [['hello', 0], ['world', 6]]
*
* splitLines('hello\nworld', true)
* // => [['hello\n', 0], ['world', 6]]
* ```
*/
var RE_NEWLINE = /(\r?\n)/g;
function splitLines(code, preserveEnding = false) {
	if (code.length === 0) return [["", 0]];
	const parts = code.split(RE_NEWLINE);
	let index = 0;
	const lines = [];
	for (let i = 0; i < parts.length; i += 2) {
		const line = preserveEnding ? parts[i] + (parts[i + 1] || "") : parts[i];
		lines.push([line, index]);
		index += parts[i].length;
		index += parts[i + 1]?.length || 0;
	}
	return lines;
}
/**
* https://github.com/microsoft/vscode/blob/f7f05dee53fb33fe023db2e06e30a89d3094488f/src/vs/platform/theme/common/colorRegistry.ts#L258-L268
*/
var VSCODE_FALLBACK_EDITOR_FG = {
	light: "#333333",
	dark: "#bbbbbb"
};
var VSCODE_FALLBACK_EDITOR_BG = {
	light: "#fffffe",
	dark: "#1e1e1e"
};
var RESOLVED_KEY = "__shiki_resolved";
/**
* Normalize a textmate theme to shiki theme
*/
function normalizeTheme(rawTheme) {
	if (rawTheme?.[RESOLVED_KEY]) return rawTheme;
	const theme = { ...rawTheme };
	if (theme.tokenColors && !theme.settings) {
		theme.settings = theme.tokenColors;
		delete theme.tokenColors;
	}
	theme.type ||= "dark";
	theme.colorReplacements = { ...theme.colorReplacements };
	theme.settings ||= [];
	let { bg, fg } = theme;
	if (!bg || !fg) {
		/**
		* First try:
		* Theme might contain a global `tokenColor` without `name` or `scope`
		* Used as default value for foreground/background
		*/
		const globalSetting = theme.settings ? theme.settings.find((s) => !s.name && !s.scope) : void 0;
		if (globalSetting?.settings?.foreground) fg = globalSetting.settings.foreground;
		if (globalSetting?.settings?.background) bg = globalSetting.settings.background;
		/**
		* Second try:
		* If there's no global `tokenColor` without `name` or `scope`
		* Use `editor.foreground` and `editor.background`
		*/
		if (!fg && theme?.colors?.["editor.foreground"]) fg = theme.colors["editor.foreground"];
		if (!bg && theme?.colors?.["editor.background"]) bg = theme.colors["editor.background"];
		/**
		* Last try:
		* If there's no fg/bg color specified in theme, use default
		*/
		if (!fg) fg = theme.type === "light" ? VSCODE_FALLBACK_EDITOR_FG.light : VSCODE_FALLBACK_EDITOR_FG.dark;
		if (!bg) bg = theme.type === "light" ? VSCODE_FALLBACK_EDITOR_BG.light : VSCODE_FALLBACK_EDITOR_BG.dark;
		theme.fg = fg;
		theme.bg = bg;
	}
	if (!(theme.settings[0] && theme.settings[0].settings && !theme.settings[0].scope)) theme.settings.unshift({ settings: {
		foreground: theme.fg,
		background: theme.bg
	} });
	let replacementCount = 0;
	const replacementMap = /* @__PURE__ */ new Map();
	function getReplacementColor(value) {
		if (replacementMap.has(value)) return replacementMap.get(value);
		replacementCount += 1;
		const hex = `#${replacementCount.toString(16).padStart(8, "0").toLowerCase()}`;
		if (theme.colorReplacements?.[`#${hex}`]) return getReplacementColor(value);
		replacementMap.set(value, hex);
		return hex;
	}
	theme.settings = theme.settings.map((setting) => {
		const replaceFg = setting.settings?.foreground && !setting.settings.foreground.startsWith("#");
		const replaceBg = setting.settings?.background && !setting.settings.background.startsWith("#");
		if (!replaceFg && !replaceBg) return setting;
		const clone = {
			...setting,
			settings: { ...setting.settings }
		};
		if (replaceFg) {
			const replacement = getReplacementColor(setting.settings.foreground);
			theme.colorReplacements[replacement] = setting.settings.foreground;
			clone.settings.foreground = replacement;
		}
		if (replaceBg) {
			const replacement = getReplacementColor(setting.settings.background);
			theme.colorReplacements[replacement] = setting.settings.background;
			clone.settings.background = replacement;
		}
		return clone;
	});
	for (const key of Object.keys(theme.colors || {})) if (key === "editor.foreground" || key === "editor.background" || key.startsWith("terminal.ansi")) {
		if (!theme.colors[key]?.startsWith("#")) {
			const replacement = getReplacementColor(theme.colors[key]);
			theme.colorReplacements[replacement] = theme.colors[key];
			theme.colors[key] = replacement;
		}
	}
	Object.defineProperty(theme, RESOLVED_KEY, {
		enumerable: false,
		writable: false,
		value: true
	});
	return theme;
}
/**
* Resolve
*/
async function resolveLangs(langs) {
	return [...new Set((await Promise.all(langs.filter((l) => !isSpecialLang(l)).map(async (lang) => await normalizeGetter(lang).then((r) => Array.isArray(r) ? r : [r])))).flat())];
}
async function resolveThemes(themes) {
	return (await Promise.all(themes.map(async (theme) => isSpecialTheme(theme) ? null : normalizeTheme(await normalizeGetter(theme))))).filter((i) => !!i);
}
function resolveLangAlias(name, alias) {
	if (!alias) return name;
	if (alias[name]) {
		const resolved = /* @__PURE__ */ new Set([name]);
		while (alias[name]) {
			name = alias[name];
			if (resolved.has(name)) throw new ShikiError(`Circular alias \`${[...resolved].join(" -> ")} -> ${name}\``);
			resolved.add(name);
		}
	}
	return name;
}
var Registry = class extends Registry$1 {
	_resolver;
	_themes;
	_langs;
	_alias;
	_resolvedThemes = /* @__PURE__ */ new Map();
	_resolvedGrammars = /* @__PURE__ */ new Map();
	_langMap = /* @__PURE__ */ new Map();
	_langGraph = /* @__PURE__ */ new Map();
	_textmateThemeCache = /* @__PURE__ */ new WeakMap();
	_loadedThemesCache = null;
	_loadedLanguagesCache = null;
	constructor(_resolver, _themes, _langs, _alias = {}) {
		super(_resolver);
		this._resolver = _resolver;
		this._themes = _themes;
		this._langs = _langs;
		this._alias = _alias;
		this._themes.map((t) => this.loadTheme(t));
		this.loadLanguages(this._langs);
	}
	getTheme(theme) {
		if (typeof theme === "string") return this._resolvedThemes.get(theme);
		else return this.loadTheme(theme);
	}
	loadTheme(theme) {
		const _theme = normalizeTheme(theme);
		if (_theme.name) {
			this._resolvedThemes.set(_theme.name, _theme);
			this._loadedThemesCache = null;
		}
		return _theme;
	}
	getLoadedThemes() {
		if (!this._loadedThemesCache) this._loadedThemesCache = [...this._resolvedThemes.keys()];
		return this._loadedThemesCache;
	}
	setTheme(theme) {
		let textmateTheme = this._textmateThemeCache.get(theme);
		if (!textmateTheme) {
			textmateTheme = Theme.createFromRawTheme(theme);
			this._textmateThemeCache.set(theme, textmateTheme);
		}
		this._syncRegistry.setTheme(textmateTheme);
	}
	getGrammar(name) {
		name = resolveLangAlias(name, this._alias);
		return this._resolvedGrammars.get(name);
	}
	loadLanguage(lang) {
		if (this.getGrammar(lang.name)) return;
		const embeddedLazilyBy = new Set([...this._langMap.values()].filter((i) => i.embeddedLangsLazy?.includes(lang.name)));
		this._resolver.addLanguage(lang);
		const grammarConfig = {
			balancedBracketSelectors: lang.balancedBracketSelectors || ["*"],
			unbalancedBracketSelectors: lang.unbalancedBracketSelectors || []
		};
		this._syncRegistry._rawGrammars.set(lang.scopeName, lang);
		const g = this.loadGrammarWithConfiguration(lang.scopeName, 1, grammarConfig);
		g.name = lang.name;
		this._resolvedGrammars.set(lang.name, g);
		if (lang.aliases) lang.aliases.forEach((alias) => {
			this._alias[alias] = lang.name;
		});
		this._loadedLanguagesCache = null;
		if (embeddedLazilyBy.size) for (const e of embeddedLazilyBy) {
			this._resolvedGrammars.delete(e.name);
			this._loadedLanguagesCache = null;
			this._syncRegistry?._injectionGrammars?.delete(e.scopeName);
			this._syncRegistry?._grammars?.delete(e.scopeName);
			this.loadLanguage(this._langMap.get(e.name));
		}
	}
	dispose() {
		super.dispose();
		this._resolvedThemes.clear();
		this._resolvedGrammars.clear();
		this._langMap.clear();
		this._langGraph.clear();
		this._loadedThemesCache = null;
	}
	loadLanguages(langs) {
		for (const lang of langs) this.resolveEmbeddedLanguages(lang);
		const langsGraphArray = [...this._langGraph.entries()];
		const missingLangs = langsGraphArray.filter(([_, lang]) => !lang);
		if (missingLangs.length) {
			const dependents = langsGraphArray.filter(([_, lang]) => {
				if (!lang) return false;
				return (lang.embeddedLanguages || lang.embeddedLangs)?.some((l) => missingLangs.map(([name]) => name).includes(l));
			}).filter((lang) => !missingLangs.includes(lang));
			throw new ShikiError(`Missing languages ${missingLangs.map(([name]) => `\`${name}\``).join(", ")}, required by ${dependents.map(([name]) => `\`${name}\``).join(", ")}`);
		}
		for (const [_, lang] of langsGraphArray) this._resolver.addLanguage(lang);
		for (const [_, lang] of langsGraphArray) this.loadLanguage(lang);
	}
	getLoadedLanguages() {
		if (!this._loadedLanguagesCache) this._loadedLanguagesCache = [.../* @__PURE__ */ new Set([...this._resolvedGrammars.keys(), ...Object.keys(this._alias)])];
		return this._loadedLanguagesCache;
	}
	resolveEmbeddedLanguages(lang) {
		this._langMap.set(lang.name, lang);
		this._langGraph.set(lang.name, lang);
		const embedded = lang.embeddedLanguages ?? lang.embeddedLangs;
		if (embedded) for (const embeddedLang of embedded) this._langGraph.set(embeddedLang, this._langMap.get(embeddedLang));
	}
};
var Resolver = class {
	_langs = /* @__PURE__ */ new Map();
	_scopeToLang = /* @__PURE__ */ new Map();
	_injections = /* @__PURE__ */ new Map();
	_onigLib;
	constructor(engine, langs) {
		this._onigLib = {
			createOnigScanner: (patterns) => engine.createScanner(patterns),
			createOnigString: (s) => engine.createString(s)
		};
		langs.forEach((i) => this.addLanguage(i));
	}
	get onigLib() {
		return this._onigLib;
	}
	getLangRegistration(langIdOrAlias) {
		return this._langs.get(langIdOrAlias);
	}
	loadGrammar(scopeName) {
		return this._scopeToLang.get(scopeName);
	}
	addLanguage(l) {
		this._langs.set(l.name, l);
		if (l.aliases) l.aliases.forEach((a) => {
			this._langs.set(a, l);
		});
		this._scopeToLang.set(l.scopeName, l);
		if (l.injectTo) l.injectTo.forEach((i) => {
			if (!this._injections.get(i)) this._injections.set(i, []);
			this._injections.get(i).push(l.scopeName);
		});
	}
	getInjections(scopeName) {
		const scopeParts = scopeName.split(".");
		let injections = [];
		for (let i = 1; i <= scopeParts.length; i++) {
			const subScopeName = scopeParts.slice(0, i).join(".");
			injections = [...injections, ...this._injections.get(subScopeName) || []];
		}
		return injections;
	}
};
var instancesCount = 0;
/**
* Get the minimal shiki primitive instance.
*
* Requires to provide the engine and all themes and languages upfront.
*/
function createShikiPrimitive(options) {
	instancesCount += 1;
	if (options.warnings !== false && instancesCount >= 10 && instancesCount % 10 === 0) console.warn(`[Shiki] ${instancesCount} instances have been created. Shiki is supposed to be used as a singleton, consider refactoring your code to cache your highlighter instance; Or call \`highlighter.dispose()\` to release unused instances.`);
	let isDisposed = false;
	if (!options.engine) throw new ShikiError("`engine` option is required for synchronous mode");
	const langs = (options.langs || []).flat(1);
	const themes = (options.themes || []).flat(1).map(normalizeTheme);
	const _registry = new Registry(new Resolver(options.engine, langs), themes, langs, options.langAlias);
	let _lastTheme;
	function resolveLangAlias$1(name) {
		return resolveLangAlias(name, options.langAlias);
	}
	function getLanguage(name) {
		ensureNotDisposed();
		const _lang = _registry.getGrammar(typeof name === "string" ? name : name.name);
		if (!_lang) throw new ShikiError(`Language \`${name}\` not found, you may need to load it first`);
		return _lang;
	}
	function getTheme(name) {
		if (name === "none") return {
			bg: "",
			fg: "",
			name: "none",
			settings: [],
			type: "dark"
		};
		ensureNotDisposed();
		const _theme = _registry.getTheme(name);
		if (!_theme) throw new ShikiError(`Theme \`${name}\` not found, you may need to load it first`);
		return _theme;
	}
	function setTheme(name) {
		ensureNotDisposed();
		const theme = getTheme(name);
		if (_lastTheme !== name) {
			_registry.setTheme(theme);
			_lastTheme = name;
		}
		return {
			theme,
			colorMap: _registry.getColorMap()
		};
	}
	function getLoadedThemes() {
		ensureNotDisposed();
		return _registry.getLoadedThemes();
	}
	function getLoadedLanguages() {
		ensureNotDisposed();
		return _registry.getLoadedLanguages();
	}
	function loadLanguageSync(...langs) {
		ensureNotDisposed();
		_registry.loadLanguages(langs.flat(1));
	}
	async function loadLanguage(...langs) {
		return loadLanguageSync(await resolveLangs(langs));
	}
	function loadThemeSync(...themes) {
		ensureNotDisposed();
		for (const theme of themes.flat(1)) _registry.loadTheme(theme);
	}
	async function loadTheme(...themes) {
		ensureNotDisposed();
		return loadThemeSync(await resolveThemes(themes));
	}
	function ensureNotDisposed() {
		if (isDisposed) throw new ShikiError("Shiki instance has been disposed");
	}
	function dispose() {
		if (isDisposed) return;
		isDisposed = true;
		_registry.dispose();
		instancesCount -= 1;
	}
	return {
		setTheme,
		getTheme,
		getLanguage,
		getLoadedThemes,
		getLoadedLanguages,
		resolveLangAlias: resolveLangAlias$1,
		loadLanguage,
		loadLanguageSync,
		loadTheme,
		loadThemeSync,
		dispose,
		[Symbol.dispose]: dispose
	};
}
/**
* @deprecated Use `createShikiPrimitive` instead.
*/
var createShikiInternalSync = createShikiPrimitive;
/**
* Get the minimal shiki primitive instance.
*/
async function createShikiPrimitiveAsync(options) {
	if (!options.engine) console.warn("`engine` option is required. Use `createOnigurumaEngine` or `createJavaScriptRegexEngine` to create an engine.");
	const [themes, langs, engine] = await Promise.all([
		resolveThemes(options.themes || []),
		resolveLangs(options.langs || []),
		options.engine
	]);
	return createShikiPrimitive({
		...options,
		themes,
		langs,
		engine
	});
}
/**
* @deprecated Use `createShikiPrimitiveAsync` instead.
*/
var createShikiInternal = createShikiPrimitiveAsync;
var _grammarStateMap = /* @__PURE__ */ new WeakMap();
function setLastGrammarStateToMap(keys, state) {
	_grammarStateMap.set(keys, state);
}
function getLastGrammarStateFromMap(keys) {
	return _grammarStateMap.get(keys);
}
/**
* GrammarState is a special reference object that holds the state of a grammar.
*
* It's used to highlight code snippets that are part of the target language.
*/
var GrammarState = class GrammarState {
	/**
	* Theme to Stack mapping
	*/
	_stacks = {};
	lang;
	get themes() {
		return Object.keys(this._stacks);
	}
	get theme() {
		return this.themes[0];
	}
	get _stack() {
		return this._stacks[this.theme];
	}
	/**
	* Static method to create a initial grammar state.
	*/
	static initial(lang, themes) {
		return new GrammarState(Object.fromEntries(toArray(themes).map((theme) => [theme, INITIAL])), lang);
	}
	constructor(...args) {
		if (args.length === 2) {
			const [stacksMap, lang] = args;
			this.lang = lang;
			this._stacks = stacksMap;
		} else {
			const [stack, lang, theme] = args;
			this.lang = lang;
			this._stacks = { [theme]: stack };
		}
	}
	/**
	* Get the internal stack object.
	* @internal
	*/
	getInternalStack(theme = this.theme) {
		return this._stacks[theme];
	}
	getScopes(theme = this.theme) {
		return getScopes(this._stacks[theme]);
	}
	toJSON() {
		return {
			lang: this.lang,
			theme: this.theme,
			themes: this.themes,
			scopes: this.getScopes()
		};
	}
};
function getScopes(stack) {
	const scopes = [];
	const visited = /* @__PURE__ */ new Set();
	function pushScope(stack) {
		if (visited.has(stack)) return;
		visited.add(stack);
		const name = stack?.nameScopesList?.scopeName;
		if (name) scopes.push(name);
		if (stack.parent) pushScope(stack.parent);
	}
	pushScope(stack);
	return scopes;
}
function getGrammarStack(state, theme) {
	if (!(state instanceof GrammarState)) throw new ShikiError("Invalid grammar state");
	return state.getInternalStack(theme);
}
var RE_COMMA = /,/;
var RE_SPACE = / /;
/**
* Code to tokens, with a simple theme.
*/
function codeToTokensBase$1(primitive, code, options = {}) {
	const { theme: themeName = primitive.getLoadedThemes()[0] } = options;
	if (isPlainLang(primitive.resolveLangAlias(options.lang || "text")) || isNoneTheme(themeName)) return splitLines(code).map((line) => [{
		content: line[0],
		offset: line[1]
	}]);
	const { theme, colorMap } = primitive.setTheme(themeName);
	const _grammar = primitive.getLanguage(options.lang || "text");
	if (options.grammarState) {
		if (options.grammarState.lang !== _grammar.name) throw new ShikiError(`Grammar state language "${options.grammarState.lang}" does not match highlight language "${_grammar.name}"`);
		if (!options.grammarState.themes.includes(theme.name)) throw new ShikiError(`Grammar state themes "${options.grammarState.themes}" do not contain highlight theme "${theme.name}"`);
	}
	return tokenizeWithTheme(code, _grammar, theme, colorMap, options);
}
function getLastGrammarState(...args) {
	if (args.length === 2) return getLastGrammarStateFromMap(args[1]);
	const [primitive, code, options = {}] = args;
	const { lang = "text", theme: themeName = primitive.getLoadedThemes()[0] } = options;
	if (isPlainLang(lang) || isNoneTheme(themeName)) throw new ShikiError("Plain language does not have grammar state");
	if (lang === "ansi") throw new ShikiError("ANSI language does not have grammar state");
	const { theme, colorMap } = primitive.setTheme(themeName);
	const _grammar = primitive.getLanguage(lang);
	return new GrammarState(_tokenizeWithTheme(code, _grammar, theme, colorMap, options).stateStack, _grammar.name, theme.name);
}
function tokenizeWithTheme(code, grammar, theme, colorMap, options) {
	const result = _tokenizeWithTheme(code, grammar, theme, colorMap, options);
	const grammarState = new GrammarState(result.stateStack, grammar.name, theme.name);
	setLastGrammarStateToMap(result.tokens, grammarState);
	return result.tokens;
}
function _tokenizeWithTheme(code, grammar, theme, colorMap, options) {
	const colorReplacements = resolveColorReplacements(theme, options);
	const { tokenizeMaxLineLength = 0, tokenizeTimeLimit = 500 } = options;
	const lines = splitLines(code);
	let stateStack = options.grammarState ? getGrammarStack(options.grammarState, theme.name) ?? INITIAL : options.grammarContextCode != null ? _tokenizeWithTheme(options.grammarContextCode, grammar, theme, colorMap, {
		...options,
		grammarState: void 0,
		grammarContextCode: void 0
	}).stateStack : INITIAL;
	let actual = [];
	const final = [];
	for (let i = 0, len = lines.length; i < len; i++) {
		const [line, lineOffset] = lines[i];
		if (line === "") {
			actual = [];
			final.push([]);
			continue;
		}
		if (tokenizeMaxLineLength > 0 && line.length >= tokenizeMaxLineLength) {
			actual = [];
			final.push([{
				content: line,
				offset: lineOffset,
				color: "",
				fontStyle: 0
			}]);
			continue;
		}
		let resultWithScopes;
		let tokensWithScopes;
		let tokensWithScopesIndex;
		if (options.includeExplanation) {
			resultWithScopes = grammar.tokenizeLine(line, stateStack, tokenizeTimeLimit);
			tokensWithScopes = resultWithScopes.tokens;
			tokensWithScopesIndex = 0;
		}
		const result = grammar.tokenizeLine2(line, stateStack, tokenizeTimeLimit);
		const tokensLength = result.tokens.length / 2;
		for (let j = 0; j < tokensLength; j++) {
			const startIndex = result.tokens[2 * j];
			const nextStartIndex = j + 1 < tokensLength ? result.tokens[2 * j + 2] : line.length;
			if (startIndex === nextStartIndex) continue;
			const metadata = result.tokens[2 * j + 1];
			const color = applyColorReplacements(colorMap[EncodedTokenMetadata.getForeground(metadata)], colorReplacements);
			const fontStyle = EncodedTokenMetadata.getFontStyle(metadata);
			const token = {
				content: line.substring(startIndex, nextStartIndex),
				offset: lineOffset + startIndex,
				color,
				fontStyle
			};
			if (options.includeExplanation) {
				const themeSettingsSelectors = [];
				if (options.includeExplanation !== "scopeName") for (const setting of theme.settings) {
					let selectors;
					switch (typeof setting.scope) {
						case "string":
							selectors = setting.scope.split(RE_COMMA).map((scope) => scope.trim());
							break;
						case "object":
							selectors = setting.scope;
							break;
						default: continue;
					}
					themeSettingsSelectors.push({
						settings: setting,
						selectors: selectors.map((selector) => selector.split(RE_SPACE))
					});
				}
				token.explanation = [];
				let offset = 0;
				while (startIndex + offset < nextStartIndex) {
					const tokenWithScopes = tokensWithScopes[tokensWithScopesIndex];
					const tokenWithScopesText = line.substring(tokenWithScopes.startIndex, tokenWithScopes.endIndex);
					offset += tokenWithScopesText.length;
					token.explanation.push({
						content: tokenWithScopesText,
						scopes: options.includeExplanation === "scopeName" ? explainThemeScopesNameOnly(tokenWithScopes.scopes) : explainThemeScopesFull(themeSettingsSelectors, tokenWithScopes.scopes)
					});
					tokensWithScopesIndex += 1;
				}
			}
			actual.push(token);
		}
		final.push(actual);
		actual = [];
		stateStack = result.ruleStack;
	}
	return {
		tokens: final,
		stateStack
	};
}
function explainThemeScopesNameOnly(scopes) {
	return scopes.map((scope) => ({ scopeName: scope }));
}
function explainThemeScopesFull(themeSelectors, scopes) {
	const result = [];
	for (let i = 0, len = scopes.length; i < len; i++) {
		const scope = scopes[i];
		result[i] = {
			scopeName: scope,
			themeMatches: explainThemeScope(themeSelectors, scope, scopes.slice(0, i))
		};
	}
	return result;
}
function matchesOne(selector, scope) {
	return selector === scope || scope.substring(0, selector.length) === selector && scope[selector.length] === ".";
}
function matches(selectors, scope, parentScopes) {
	if (!matchesOne(selectors.at(-1), scope)) return false;
	let selectorParentIndex = selectors.length - 2;
	let parentIndex = parentScopes.length - 1;
	while (selectorParentIndex >= 0 && parentIndex >= 0) {
		if (matchesOne(selectors[selectorParentIndex], parentScopes[parentIndex])) selectorParentIndex -= 1;
		parentIndex -= 1;
	}
	if (selectorParentIndex === -1) return true;
	return false;
}
function explainThemeScope(themeSettingsSelectors, scope, parentScopes) {
	const result = [];
	for (const { selectors, settings } of themeSettingsSelectors) for (const selectorPieces of selectors) if (matches(selectorPieces, scope, parentScopes)) {
		result.push(settings);
		break;
	}
	return result;
}
/**
* Get tokens with multiple themes
*/
function codeToTokensWithThemes(primitive, code, options, codeToTokensBaseFn = codeToTokensBase$1) {
	const themes = Object.entries(options.themes).filter((i) => i[1]).map((i) => ({
		color: i[0],
		theme: i[1]
	}));
	const themedTokens = themes.map((t) => {
		const tokens = codeToTokensBaseFn(primitive, code, {
			...options,
			theme: t.theme
		});
		return {
			tokens,
			state: getLastGrammarStateFromMap(tokens),
			theme: typeof t.theme === "string" ? t.theme : t.theme.name
		};
	});
	const tokens = alignThemesTokenization(...themedTokens.map((i) => i.tokens));
	const mergedTokens = tokens[0].map((line, lineIdx) => line.map((_token, tokenIdx) => {
		const mergedToken = {
			content: _token.content,
			variants: {},
			offset: _token.offset
		};
		if ("includeExplanation" in options && options.includeExplanation) mergedToken.explanation = _token.explanation;
		tokens.forEach((t, themeIdx) => {
			const { content: _, explanation: __, offset: ___, ...styles } = t[lineIdx][tokenIdx];
			mergedToken.variants[themes[themeIdx].color] = styles;
		});
		return mergedToken;
	}));
	const mergedGrammarState = themedTokens[0].state ? new GrammarState(Object.fromEntries(themedTokens.map((s) => [s.theme, s.state?.getInternalStack(s.theme)])), themedTokens[0].state.lang) : void 0;
	if (mergedGrammarState) setLastGrammarStateToMap(mergedTokens, mergedGrammarState);
	return mergedTokens;
}
/**
* Break tokens from multiple themes into same tokenization.
*
* For example, given two themes that tokenize `console.log("hello")` as:
*
* - `console . log (" hello ")` (6 tokens)
* - `console .log ( "hello" )` (5 tokens)
*
* This function will return:
*
* - `console . log ( " hello " )` (8 tokens)
* - `console . log ( " hello " )` (8 tokens)
*/
function alignThemesTokenization(...themes) {
	const outThemes = themes.map(() => []);
	const count = themes.length;
	for (let i = 0; i < themes[0].length; i++) {
		const lines = themes.map((t) => t[i]);
		const outLines = outThemes.map(() => []);
		outThemes.forEach((t, i) => t.push(outLines[i]));
		const indexes = lines.map(() => 0);
		const current = lines.map((l) => l[0]);
		while (current.every((t) => t)) {
			const minLength = Math.min(...current.map((t) => t.content.length));
			for (let n = 0; n < count; n++) {
				const token = current[n];
				if (token.content.length === minLength) {
					outLines[n].push(token);
					indexes[n] += 1;
					current[n] = lines[n][indexes[n]];
				} else {
					outLines[n].push({
						...token,
						content: token.content.slice(0, minLength)
					});
					current[n] = {
						...token,
						content: token.content.slice(minLength),
						offset: token.offset + minLength
					};
				}
			}
		}
	}
	return outThemes;
}
//#endregion
//#region node_modules/.pnpm/html-void-elements@3.0.0/node_modules/html-void-elements/index.js
/**
* List of HTML void tag names.
*
* @type {Array<string>}
*/
var htmlVoidElements = [
	"area",
	"base",
	"basefont",
	"bgsound",
	"br",
	"col",
	"command",
	"embed",
	"frame",
	"hr",
	"image",
	"img",
	"input",
	"keygen",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr"
];
//#endregion
//#region node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/schema.js
/**
* @import {Schema as SchemaType, Space} from 'property-information'
*/
/** @type {SchemaType} */
var Schema = class {
	/**
	* @param {SchemaType['property']} property
	*   Property.
	* @param {SchemaType['normal']} normal
	*   Normal.
	* @param {Space | undefined} [space]
	*   Space.
	* @returns
	*   Schema.
	*/
	constructor(property, normal, space) {
		this.normal = normal;
		this.property = property;
		if (space) this.space = space;
	}
};
Schema.prototype.normal = {};
Schema.prototype.property = {};
Schema.prototype.space = void 0;
//#endregion
//#region node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/merge.js
/**
* @import {Info, Space} from 'property-information'
*/
/**
* @param {ReadonlyArray<Schema>} definitions
*   Definitions.
* @param {Space | undefined} [space]
*   Space.
* @returns {Schema}
*   Schema.
*/
function merge(definitions, space) {
	/** @type {Record<string, Info>} */
	const property = {};
	/** @type {Record<string, string>} */
	const normal = {};
	for (const definition of definitions) {
		Object.assign(property, definition.property);
		Object.assign(normal, definition.normal);
	}
	return new Schema(property, normal, space);
}
//#endregion
//#region node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/normalize.js
/**
* Get the cleaned case insensitive form of an attribute or property.
*
* @param {string} value
*   An attribute-like or property-like name.
* @returns {string}
*   Value that can be used to look up the properly cased property on a
*   `Schema`.
*/
function normalize(value) {
	return value.toLowerCase();
}
//#endregion
//#region node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/info.js
/**
* @import {Info as InfoType} from 'property-information'
*/
/** @type {InfoType} */
var Info = class {
	/**
	* @param {string} property
	*   Property.
	* @param {string} attribute
	*   Attribute.
	* @returns
	*   Info.
	*/
	constructor(property, attribute) {
		this.attribute = attribute;
		this.property = property;
	}
};
Info.prototype.attribute = "";
Info.prototype.booleanish = false;
Info.prototype.boolean = false;
Info.prototype.commaOrSpaceSeparated = false;
Info.prototype.commaSeparated = false;
Info.prototype.defined = false;
Info.prototype.mustUseProperty = false;
Info.prototype.number = false;
Info.prototype.overloadedBoolean = false;
Info.prototype.property = "";
Info.prototype.spaceSeparated = false;
Info.prototype.space = void 0;
//#endregion
//#region node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/types.js
var types_exports = /* @__PURE__ */ __exportAll({
	boolean: () => boolean,
	booleanish: () => booleanish,
	commaOrSpaceSeparated: () => commaOrSpaceSeparated,
	commaSeparated: () => commaSeparated,
	number: () => number,
	overloadedBoolean: () => overloadedBoolean,
	spaceSeparated: () => spaceSeparated
});
var powers = 0;
var boolean = increment();
var booleanish = increment();
var overloadedBoolean = increment();
var number = increment();
var spaceSeparated = increment();
var commaSeparated = increment();
var commaOrSpaceSeparated = increment();
function increment() {
	return 2 ** ++powers;
}
//#endregion
//#region node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/defined-info.js
/**
* @import {Space} from 'property-information'
*/
var checks = Object.keys(types_exports);
var DefinedInfo = class extends Info {
	/**
	* @constructor
	* @param {string} property
	*   Property.
	* @param {string} attribute
	*   Attribute.
	* @param {number | null | undefined} [mask]
	*   Mask.
	* @param {Space | undefined} [space]
	*   Space.
	* @returns
	*   Info.
	*/
	constructor(property, attribute, mask, space) {
		let index = -1;
		super(property, attribute);
		mark(this, "space", space);
		if (typeof mask === "number") while (++index < checks.length) {
			const check = checks[index];
			mark(this, checks[index], (mask & types_exports[check]) === types_exports[check]);
		}
	}
};
DefinedInfo.prototype.defined = true;
/**
* @template {keyof DefinedInfo} Key
*   Key type.
* @param {DefinedInfo} values
*   Info.
* @param {Key} key
*   Key.
* @param {DefinedInfo[Key]} value
*   Value.
* @returns {undefined}
*   Nothing.
*/
function mark(values, key, value) {
	if (value) values[key] = value;
}
//#endregion
//#region node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/create.js
/**
* @import {Info, Space} from 'property-information'
*/
/**
* @typedef Definition
*   Definition of a schema.
* @property {Record<string, string> | undefined} [attributes]
*   Normalzed names to special attribute case.
* @property {ReadonlyArray<string> | undefined} [mustUseProperty]
*   Normalized names that must be set as properties.
* @property {Record<string, number | null>} properties
*   Property names to their types.
* @property {Space | undefined} [space]
*   Space.
* @property {Transform} transform
*   Transform a property name.
*/
/**
* @callback Transform
*   Transform.
* @param {Record<string, string>} attributes
*   Attributes.
* @param {string} property
*   Property.
* @returns {string}
*   Attribute.
*/
/**
* @param {Definition} definition
*   Definition.
* @returns {Schema}
*   Schema.
*/
function create(definition) {
	/** @type {Record<string, Info>} */
	const properties = {};
	/** @type {Record<string, string>} */
	const normals = {};
	for (const [property, value] of Object.entries(definition.properties)) {
		const info = new DefinedInfo(property, definition.transform(definition.attributes || {}, property), value, definition.space);
		if (definition.mustUseProperty && definition.mustUseProperty.includes(property)) info.mustUseProperty = true;
		properties[property] = info;
		normals[normalize(property)] = property;
		normals[normalize(info.attribute)] = property;
	}
	return new Schema(properties, normals, definition.space);
}
//#endregion
//#region node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/aria.js
var aria = create({
	properties: {
		ariaActiveDescendant: null,
		ariaAtomic: booleanish,
		ariaAutoComplete: null,
		ariaBusy: booleanish,
		ariaChecked: booleanish,
		ariaColCount: number,
		ariaColIndex: number,
		ariaColSpan: number,
		ariaControls: spaceSeparated,
		ariaCurrent: null,
		ariaDescribedBy: spaceSeparated,
		ariaDetails: null,
		ariaDisabled: booleanish,
		ariaDropEffect: spaceSeparated,
		ariaErrorMessage: null,
		ariaExpanded: booleanish,
		ariaFlowTo: spaceSeparated,
		ariaGrabbed: booleanish,
		ariaHasPopup: null,
		ariaHidden: booleanish,
		ariaInvalid: null,
		ariaKeyShortcuts: null,
		ariaLabel: null,
		ariaLabelledBy: spaceSeparated,
		ariaLevel: number,
		ariaLive: null,
		ariaModal: booleanish,
		ariaMultiLine: booleanish,
		ariaMultiSelectable: booleanish,
		ariaOrientation: null,
		ariaOwns: spaceSeparated,
		ariaPlaceholder: null,
		ariaPosInSet: number,
		ariaPressed: booleanish,
		ariaReadOnly: booleanish,
		ariaRelevant: null,
		ariaRequired: booleanish,
		ariaRoleDescription: spaceSeparated,
		ariaRowCount: number,
		ariaRowIndex: number,
		ariaRowSpan: number,
		ariaSelected: booleanish,
		ariaSetSize: number,
		ariaSort: null,
		ariaValueMax: number,
		ariaValueMin: number,
		ariaValueNow: number,
		ariaValueText: null,
		role: null
	},
	transform(_, property) {
		return property === "role" ? property : "aria-" + property.slice(4).toLowerCase();
	}
});
//#endregion
//#region node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/case-sensitive-transform.js
/**
* @param {Record<string, string>} attributes
*   Attributes.
* @param {string} attribute
*   Attribute.
* @returns {string}
*   Transformed attribute.
*/
function caseSensitiveTransform(attributes, attribute) {
	return attribute in attributes ? attributes[attribute] : attribute;
}
//#endregion
//#region node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/util/case-insensitive-transform.js
/**
* @param {Record<string, string>} attributes
*   Attributes.
* @param {string} property
*   Property.
* @returns {string}
*   Transformed property.
*/
function caseInsensitiveTransform(attributes, property) {
	return caseSensitiveTransform(attributes, property.toLowerCase());
}
//#endregion
//#region node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/html.js
var html$3 = create({
	attributes: {
		acceptcharset: "accept-charset",
		classname: "class",
		htmlfor: "for",
		httpequiv: "http-equiv"
	},
	mustUseProperty: [
		"checked",
		"multiple",
		"muted",
		"selected"
	],
	properties: {
		abbr: null,
		accept: commaSeparated,
		acceptCharset: spaceSeparated,
		accessKey: spaceSeparated,
		action: null,
		allow: null,
		allowFullScreen: boolean,
		allowPaymentRequest: boolean,
		allowUserMedia: boolean,
		alpha: boolean,
		alt: null,
		as: null,
		async: boolean,
		autoCapitalize: null,
		autoComplete: spaceSeparated,
		autoFocus: boolean,
		autoPlay: boolean,
		blocking: spaceSeparated,
		capture: null,
		charSet: null,
		checked: boolean,
		cite: null,
		className: spaceSeparated,
		closedBy: null,
		colorSpace: null,
		cols: number,
		colSpan: number,
		command: null,
		commandFor: null,
		content: null,
		contentEditable: booleanish,
		controls: boolean,
		controlsList: spaceSeparated,
		coords: number | commaSeparated,
		crossOrigin: null,
		data: null,
		dateTime: null,
		decoding: null,
		default: boolean,
		defer: boolean,
		dir: null,
		dirName: null,
		disabled: boolean,
		download: overloadedBoolean,
		draggable: booleanish,
		encType: null,
		enterKeyHint: null,
		fetchPriority: null,
		form: null,
		formAction: null,
		formEncType: null,
		formMethod: null,
		formNoValidate: boolean,
		formTarget: null,
		headers: spaceSeparated,
		height: number,
		hidden: overloadedBoolean,
		high: number,
		href: null,
		hrefLang: null,
		htmlFor: spaceSeparated,
		httpEquiv: spaceSeparated,
		id: null,
		imageSizes: null,
		imageSrcSet: null,
		inert: boolean,
		inputMode: null,
		integrity: null,
		is: null,
		isMap: boolean,
		itemId: null,
		itemProp: spaceSeparated,
		itemRef: spaceSeparated,
		itemScope: boolean,
		itemType: spaceSeparated,
		kind: null,
		label: null,
		lang: null,
		language: null,
		list: null,
		loading: null,
		loop: boolean,
		low: number,
		manifest: null,
		max: null,
		maxLength: number,
		media: null,
		method: null,
		min: null,
		minLength: number,
		multiple: boolean,
		muted: boolean,
		name: null,
		nonce: null,
		noModule: boolean,
		noValidate: boolean,
		onAbort: null,
		onAfterPrint: null,
		onAuxClick: null,
		onBeforeMatch: null,
		onBeforePrint: null,
		onBeforeToggle: null,
		onBeforeUnload: null,
		onBlur: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onContextLost: null,
		onContextMenu: null,
		onContextRestored: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFormData: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLanguageChange: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadEnd: null,
		onLoadStart: null,
		onMessage: null,
		onMessageError: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRejectionHandled: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onScrollEnd: null,
		onSecurityPolicyViolation: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onSlotChange: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnhandledRejection: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onWheel: null,
		open: boolean,
		optimum: number,
		pattern: null,
		ping: spaceSeparated,
		placeholder: null,
		playsInline: boolean,
		popover: null,
		popoverTarget: null,
		popoverTargetAction: null,
		poster: null,
		preload: null,
		readOnly: boolean,
		referrerPolicy: null,
		rel: spaceSeparated,
		required: boolean,
		reversed: boolean,
		rows: number,
		rowSpan: number,
		sandbox: spaceSeparated,
		scope: null,
		scoped: boolean,
		seamless: boolean,
		selected: boolean,
		shadowRootClonable: boolean,
		shadowRootCustomElementRegistry: boolean,
		shadowRootDelegatesFocus: boolean,
		shadowRootMode: null,
		shadowRootSerializable: boolean,
		shape: null,
		size: number,
		sizes: null,
		slot: null,
		span: number,
		spellCheck: booleanish,
		src: null,
		srcDoc: null,
		srcLang: null,
		srcSet: null,
		start: number,
		step: null,
		style: null,
		tabIndex: number,
		target: null,
		title: null,
		translate: null,
		type: null,
		typeMustMatch: boolean,
		useMap: null,
		value: booleanish,
		width: number,
		wrap: null,
		writingSuggestions: null,
		align: null,
		aLink: null,
		archive: spaceSeparated,
		axis: null,
		background: null,
		bgColor: null,
		border: number,
		borderColor: null,
		bottomMargin: number,
		cellPadding: null,
		cellSpacing: null,
		char: null,
		charOff: null,
		classId: null,
		clear: null,
		code: null,
		codeBase: null,
		codeType: null,
		color: null,
		compact: boolean,
		declare: boolean,
		event: null,
		face: null,
		frame: null,
		frameBorder: null,
		hSpace: number,
		leftMargin: number,
		link: null,
		longDesc: null,
		lowSrc: null,
		marginHeight: number,
		marginWidth: number,
		noResize: boolean,
		noHref: boolean,
		noShade: boolean,
		noWrap: boolean,
		object: null,
		profile: null,
		prompt: null,
		rev: null,
		rightMargin: number,
		rules: null,
		scheme: null,
		scrolling: booleanish,
		standby: null,
		summary: null,
		text: null,
		topMargin: number,
		valueType: null,
		version: null,
		vAlign: null,
		vLink: null,
		vSpace: number,
		allowTransparency: null,
		autoCorrect: null,
		autoSave: null,
		credentialless: boolean,
		disablePictureInPicture: boolean,
		disableRemotePlayback: boolean,
		exportParts: commaSeparated,
		part: spaceSeparated,
		prefix: null,
		property: null,
		results: number,
		security: null,
		unselectable: null
	},
	space: "html",
	transform: caseInsensitiveTransform
});
//#endregion
//#region node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/svg.js
var svg$1 = create({
	attributes: {
		accentHeight: "accent-height",
		alignmentBaseline: "alignment-baseline",
		arabicForm: "arabic-form",
		baselineShift: "baseline-shift",
		capHeight: "cap-height",
		className: "class",
		clipPath: "clip-path",
		clipRule: "clip-rule",
		colorInterpolation: "color-interpolation",
		colorInterpolationFilters: "color-interpolation-filters",
		colorProfile: "color-profile",
		colorRendering: "color-rendering",
		crossOrigin: "crossorigin",
		dataType: "datatype",
		dominantBaseline: "dominant-baseline",
		enableBackground: "enable-background",
		fillOpacity: "fill-opacity",
		fillRule: "fill-rule",
		floodColor: "flood-color",
		floodOpacity: "flood-opacity",
		fontFamily: "font-family",
		fontSize: "font-size",
		fontSizeAdjust: "font-size-adjust",
		fontStretch: "font-stretch",
		fontStyle: "font-style",
		fontVariant: "font-variant",
		fontWeight: "font-weight",
		glyphName: "glyph-name",
		glyphOrientationHorizontal: "glyph-orientation-horizontal",
		glyphOrientationVertical: "glyph-orientation-vertical",
		hrefLang: "hreflang",
		horizAdvX: "horiz-adv-x",
		horizOriginX: "horiz-origin-x",
		horizOriginY: "horiz-origin-y",
		imageRendering: "image-rendering",
		letterSpacing: "letter-spacing",
		lightingColor: "lighting-color",
		markerEnd: "marker-end",
		markerMid: "marker-mid",
		markerStart: "marker-start",
		maskType: "mask-type",
		navDown: "nav-down",
		navDownLeft: "nav-down-left",
		navDownRight: "nav-down-right",
		navLeft: "nav-left",
		navNext: "nav-next",
		navPrev: "nav-prev",
		navRight: "nav-right",
		navUp: "nav-up",
		navUpLeft: "nav-up-left",
		navUpRight: "nav-up-right",
		onAbort: "onabort",
		onActivate: "onactivate",
		onAfterPrint: "onafterprint",
		onBeforePrint: "onbeforeprint",
		onBegin: "onbegin",
		onCancel: "oncancel",
		onCanPlay: "oncanplay",
		onCanPlayThrough: "oncanplaythrough",
		onChange: "onchange",
		onClick: "onclick",
		onClose: "onclose",
		onCopy: "oncopy",
		onCueChange: "oncuechange",
		onCut: "oncut",
		onDblClick: "ondblclick",
		onDrag: "ondrag",
		onDragEnd: "ondragend",
		onDragEnter: "ondragenter",
		onDragExit: "ondragexit",
		onDragLeave: "ondragleave",
		onDragOver: "ondragover",
		onDragStart: "ondragstart",
		onDrop: "ondrop",
		onDurationChange: "ondurationchange",
		onEmptied: "onemptied",
		onEnd: "onend",
		onEnded: "onended",
		onError: "onerror",
		onFocus: "onfocus",
		onFocusIn: "onfocusin",
		onFocusOut: "onfocusout",
		onHashChange: "onhashchange",
		onInput: "oninput",
		onInvalid: "oninvalid",
		onKeyDown: "onkeydown",
		onKeyPress: "onkeypress",
		onKeyUp: "onkeyup",
		onLoad: "onload",
		onLoadedData: "onloadeddata",
		onLoadedMetadata: "onloadedmetadata",
		onLoadStart: "onloadstart",
		onMessage: "onmessage",
		onMouseDown: "onmousedown",
		onMouseEnter: "onmouseenter",
		onMouseLeave: "onmouseleave",
		onMouseMove: "onmousemove",
		onMouseOut: "onmouseout",
		onMouseOver: "onmouseover",
		onMouseUp: "onmouseup",
		onMouseWheel: "onmousewheel",
		onOffline: "onoffline",
		onOnline: "ononline",
		onPageHide: "onpagehide",
		onPageShow: "onpageshow",
		onPaste: "onpaste",
		onPause: "onpause",
		onPlay: "onplay",
		onPlaying: "onplaying",
		onPopState: "onpopstate",
		onProgress: "onprogress",
		onRateChange: "onratechange",
		onRepeat: "onrepeat",
		onReset: "onreset",
		onResize: "onresize",
		onScroll: "onscroll",
		onSeeked: "onseeked",
		onSeeking: "onseeking",
		onSelect: "onselect",
		onShow: "onshow",
		onStalled: "onstalled",
		onStorage: "onstorage",
		onSubmit: "onsubmit",
		onSuspend: "onsuspend",
		onTimeUpdate: "ontimeupdate",
		onToggle: "ontoggle",
		onUnload: "onunload",
		onVolumeChange: "onvolumechange",
		onWaiting: "onwaiting",
		onZoom: "onzoom",
		overlinePosition: "overline-position",
		overlineThickness: "overline-thickness",
		paintOrder: "paint-order",
		panose1: "panose-1",
		pointerEvents: "pointer-events",
		referrerPolicy: "referrerpolicy",
		renderingIntent: "rendering-intent",
		shapeRendering: "shape-rendering",
		stopColor: "stop-color",
		stopOpacity: "stop-opacity",
		strikethroughPosition: "strikethrough-position",
		strikethroughThickness: "strikethrough-thickness",
		strokeDashArray: "stroke-dasharray",
		strokeDashOffset: "stroke-dashoffset",
		strokeLineCap: "stroke-linecap",
		strokeLineJoin: "stroke-linejoin",
		strokeMiterLimit: "stroke-miterlimit",
		strokeOpacity: "stroke-opacity",
		strokeWidth: "stroke-width",
		tabIndex: "tabindex",
		textAnchor: "text-anchor",
		textDecoration: "text-decoration",
		textRendering: "text-rendering",
		transformOrigin: "transform-origin",
		typeOf: "typeof",
		underlinePosition: "underline-position",
		underlineThickness: "underline-thickness",
		unicodeBidi: "unicode-bidi",
		unicodeRange: "unicode-range",
		unitsPerEm: "units-per-em",
		vAlphabetic: "v-alphabetic",
		vHanging: "v-hanging",
		vIdeographic: "v-ideographic",
		vMathematical: "v-mathematical",
		vectorEffect: "vector-effect",
		vertAdvY: "vert-adv-y",
		vertOriginX: "vert-origin-x",
		vertOriginY: "vert-origin-y",
		wordSpacing: "word-spacing",
		writingMode: "writing-mode",
		xHeight: "x-height",
		playbackOrder: "playbackorder",
		timelineBegin: "timelinebegin"
	},
	properties: {
		about: commaOrSpaceSeparated,
		accentHeight: number,
		accumulate: null,
		additive: null,
		alignmentBaseline: null,
		alphabetic: number,
		amplitude: number,
		arabicForm: null,
		ascent: number,
		attributeName: null,
		attributeType: null,
		azimuth: number,
		bandwidth: null,
		baselineShift: null,
		baseFrequency: null,
		baseProfile: null,
		bbox: null,
		begin: null,
		bias: number,
		by: null,
		calcMode: null,
		capHeight: number,
		className: spaceSeparated,
		clip: null,
		clipPath: null,
		clipPathUnits: null,
		clipRule: null,
		color: null,
		colorInterpolation: null,
		colorInterpolationFilters: null,
		colorProfile: null,
		colorRendering: null,
		content: null,
		contentScriptType: null,
		contentStyleType: null,
		crossOrigin: null,
		cursor: null,
		cx: null,
		cy: null,
		d: null,
		dataType: null,
		defaultAction: null,
		descent: number,
		diffuseConstant: number,
		direction: null,
		display: null,
		dur: null,
		divisor: number,
		dominantBaseline: null,
		download: boolean,
		dx: null,
		dy: null,
		edgeMode: null,
		editable: null,
		elevation: number,
		enableBackground: null,
		end: null,
		event: null,
		exponent: number,
		externalResourcesRequired: null,
		fill: null,
		fillOpacity: number,
		fillRule: null,
		filter: null,
		filterRes: null,
		filterUnits: null,
		floodColor: null,
		floodOpacity: null,
		focusable: null,
		focusHighlight: null,
		fontFamily: null,
		fontSize: null,
		fontSizeAdjust: null,
		fontStretch: null,
		fontStyle: null,
		fontVariant: null,
		fontWeight: null,
		format: null,
		fr: null,
		from: null,
		fx: null,
		fy: null,
		g1: commaSeparated,
		g2: commaSeparated,
		glyphName: commaSeparated,
		glyphOrientationHorizontal: null,
		glyphOrientationVertical: null,
		glyphRef: null,
		gradientTransform: null,
		gradientUnits: null,
		handler: null,
		hanging: number,
		hatchContentUnits: null,
		hatchUnits: null,
		height: null,
		href: null,
		hrefLang: null,
		horizAdvX: number,
		horizOriginX: number,
		horizOriginY: number,
		id: null,
		ideographic: number,
		imageRendering: null,
		initialVisibility: null,
		in: null,
		in2: null,
		intercept: number,
		k: number,
		k1: number,
		k2: number,
		k3: number,
		k4: number,
		kernelMatrix: commaOrSpaceSeparated,
		kernelUnitLength: null,
		keyPoints: null,
		keySplines: null,
		keyTimes: null,
		kerning: null,
		lang: null,
		lengthAdjust: null,
		letterSpacing: null,
		lightingColor: null,
		limitingConeAngle: number,
		local: null,
		markerEnd: null,
		markerMid: null,
		markerStart: null,
		markerHeight: null,
		markerUnits: null,
		markerWidth: null,
		mask: null,
		maskContentUnits: null,
		maskType: null,
		maskUnits: null,
		mathematical: null,
		max: null,
		media: null,
		mediaCharacterEncoding: null,
		mediaContentEncodings: null,
		mediaSize: number,
		mediaTime: null,
		method: null,
		min: null,
		mode: null,
		name: null,
		navDown: null,
		navDownLeft: null,
		navDownRight: null,
		navLeft: null,
		navNext: null,
		navPrev: null,
		navRight: null,
		navUp: null,
		navUpLeft: null,
		navUpRight: null,
		numOctaves: null,
		observer: null,
		offset: null,
		onAbort: null,
		onActivate: null,
		onAfterPrint: null,
		onBeforePrint: null,
		onBegin: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnd: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFocusIn: null,
		onFocusOut: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadStart: null,
		onMessage: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onMouseWheel: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRepeat: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onShow: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onZoom: null,
		opacity: null,
		operator: null,
		order: null,
		orient: null,
		orientation: null,
		origin: null,
		overflow: null,
		overlay: null,
		overlinePosition: number,
		overlineThickness: number,
		paintOrder: null,
		panose1: null,
		path: null,
		pathLength: number,
		patternContentUnits: null,
		patternTransform: null,
		patternUnits: null,
		phase: null,
		ping: spaceSeparated,
		pitch: null,
		playbackOrder: null,
		pointerEvents: null,
		points: null,
		pointsAtX: number,
		pointsAtY: number,
		pointsAtZ: number,
		preserveAlpha: null,
		preserveAspectRatio: null,
		primitiveUnits: null,
		propagate: null,
		property: commaOrSpaceSeparated,
		r: null,
		radius: null,
		referrerPolicy: null,
		refX: null,
		refY: null,
		rel: commaOrSpaceSeparated,
		rev: commaOrSpaceSeparated,
		renderingIntent: null,
		repeatCount: null,
		repeatDur: null,
		requiredExtensions: commaOrSpaceSeparated,
		requiredFeatures: commaOrSpaceSeparated,
		requiredFonts: commaOrSpaceSeparated,
		requiredFormats: commaOrSpaceSeparated,
		resource: null,
		restart: null,
		result: null,
		rotate: null,
		rx: null,
		ry: null,
		scale: null,
		seed: null,
		shapeRendering: null,
		side: null,
		slope: null,
		snapshotTime: null,
		specularConstant: number,
		specularExponent: number,
		spreadMethod: null,
		spacing: null,
		startOffset: null,
		stdDeviation: null,
		stemh: null,
		stemv: null,
		stitchTiles: null,
		stopColor: null,
		stopOpacity: null,
		strikethroughPosition: number,
		strikethroughThickness: number,
		string: null,
		stroke: null,
		strokeDashArray: commaOrSpaceSeparated,
		strokeDashOffset: null,
		strokeLineCap: null,
		strokeLineJoin: null,
		strokeMiterLimit: number,
		strokeOpacity: number,
		strokeWidth: null,
		style: null,
		surfaceScale: number,
		syncBehavior: null,
		syncBehaviorDefault: null,
		syncMaster: null,
		syncTolerance: null,
		syncToleranceDefault: null,
		systemLanguage: commaOrSpaceSeparated,
		tabIndex: number,
		tableValues: null,
		target: null,
		targetX: number,
		targetY: number,
		textAnchor: null,
		textDecoration: null,
		textRendering: null,
		textLength: null,
		timelineBegin: null,
		title: null,
		transformBehavior: null,
		type: null,
		typeOf: commaOrSpaceSeparated,
		to: null,
		transform: null,
		transformOrigin: null,
		u1: null,
		u2: null,
		underlinePosition: number,
		underlineThickness: number,
		unicode: null,
		unicodeBidi: null,
		unicodeRange: null,
		unitsPerEm: number,
		values: null,
		vAlphabetic: number,
		vMathematical: number,
		vectorEffect: null,
		vHanging: number,
		vIdeographic: number,
		version: null,
		vertAdvY: number,
		vertOriginX: number,
		vertOriginY: number,
		viewBox: null,
		viewTarget: null,
		visibility: null,
		width: null,
		widths: null,
		wordSpacing: null,
		writingMode: null,
		x: null,
		x1: null,
		x2: null,
		xChannelSelector: null,
		xHeight: number,
		y: null,
		y1: null,
		y2: null,
		yChannelSelector: null,
		z: null,
		zoomAndPan: null
	},
	space: "svg",
	transform: caseSensitiveTransform
});
//#endregion
//#region node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/xlink.js
var xlink = create({
	properties: {
		xLinkActuate: null,
		xLinkArcRole: null,
		xLinkHref: null,
		xLinkRole: null,
		xLinkShow: null,
		xLinkTitle: null,
		xLinkType: null
	},
	space: "xlink",
	transform(_, property) {
		return "xlink:" + property.slice(5).toLowerCase();
	}
});
//#endregion
//#region node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/xmlns.js
var xmlns = create({
	attributes: { xmlnsxlink: "xmlns:xlink" },
	properties: {
		xmlnsXLink: null,
		xmlns: null
	},
	space: "xmlns",
	transform: caseInsensitiveTransform
});
//#endregion
//#region node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/xml.js
var xml = create({
	properties: {
		xmlBase: null,
		xmlLang: null,
		xmlSpace: null
	},
	space: "xml",
	transform(_, property) {
		return "xml:" + property.slice(3).toLowerCase();
	}
});
//#endregion
//#region node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/lib/find.js
/**
* @import {Schema} from 'property-information'
*/
var cap = /[A-Z]/g;
var dash = /-[a-z]/g;
var valid = /^data[-\w.:]+$/i;
/**
* Look up info on a property.
*
* In most cases the given `schema` contains info on the property.
* All standard,
* most legacy,
* and some non-standard properties are supported.
* For these cases,
* the returned `Info` has hints about the value of the property.
*
* `name` can also be a valid data attribute or property,
* in which case an `Info` object with the correctly cased `attribute` and
* `property` is returned.
*
* `name` can be an unknown attribute,
* in which case an `Info` object with `attribute` and `property` set to the
* given name is returned.
* It is not recommended to provide unsupported legacy or recently specced
* properties.
*
*
* @param {Schema} schema
*   Schema;
*   either the `html` or `svg` export.
* @param {string} value
*   An attribute-like or property-like name;
*   it will be passed through `normalize` to hopefully find the correct info.
* @returns {Info}
*   Info.
*/
function find(schema, value) {
	const normal = normalize(value);
	let property = value;
	let Type = Info;
	if (normal in schema.normal) return schema.property[schema.normal[normal]];
	if (normal.length > 4 && normal.slice(0, 4) === "data" && valid.test(value)) {
		if (value.charAt(4) === "-") {
			const rest = value.slice(5).replace(dash, camelcase);
			property = "data" + rest.charAt(0).toUpperCase() + rest.slice(1);
		} else {
			const rest = value.slice(4);
			if (!dash.test(rest)) {
				let dashes = rest.replace(cap, kebab);
				if (dashes.charAt(0) !== "-") dashes = "-" + dashes;
				value = "data" + dashes;
			}
		}
		Type = DefinedInfo;
	}
	return new Type(property, value);
}
/**
* @param {string} $0
*   Value.
* @returns {string}
*   Kebab.
*/
function kebab($0) {
	return "-" + $0.toLowerCase();
}
/**
* @param {string} $0
*   Value.
* @returns {string}
*   Camel.
*/
function camelcase($0) {
	return $0.charAt(1).toUpperCase();
}
//#endregion
//#region node_modules/.pnpm/property-information@7.2.0/node_modules/property-information/index.js
var html$2 = merge([
	aria,
	html$3,
	xlink,
	xmlns,
	xml
], "html");
var svg = merge([
	aria,
	svg$1,
	xlink,
	xmlns,
	xml
], "svg");
//#endregion
//#region node_modules/.pnpm/zwitch@2.0.4/node_modules/zwitch/index.js
/**
* @callback Handler
*   Handle a value, with a certain ID field set to a certain value.
*   The ID field is passed to `zwitch`, and it’s value is this function’s
*   place on the `handlers` record.
* @param {...any} parameters
*   Arbitrary parameters passed to the zwitch.
*   The first will be an object with a certain ID field set to a certain value.
* @returns {any}
*   Anything!
*/
/**
* @callback UnknownHandler
*   Handle values that do have a certain ID field, but it’s set to a value
*   that is not listed in the `handlers` record.
* @param {unknown} value
*   An object with a certain ID field set to an unknown value.
* @param {...any} rest
*   Arbitrary parameters passed to the zwitch.
* @returns {any}
*   Anything!
*/
/**
* @callback InvalidHandler
*   Handle values that do not have a certain ID field.
* @param {unknown} value
*   Any unknown value.
* @param {...any} rest
*   Arbitrary parameters passed to the zwitch.
* @returns {void|null|undefined|never}
*   This should crash or return nothing.
*/
/**
* @template {InvalidHandler} [Invalid=InvalidHandler]
* @template {UnknownHandler} [Unknown=UnknownHandler]
* @template {Record<string, Handler>} [Handlers=Record<string, Handler>]
* @typedef Options
*   Configuration (required).
* @property {Invalid} [invalid]
*   Handler to use for invalid values.
* @property {Unknown} [unknown]
*   Handler to use for unknown values.
* @property {Handlers} [handlers]
*   Handlers to use.
*/
var own$2 = {}.hasOwnProperty;
/**
* Handle values based on a field.
*
* @template {InvalidHandler} [Invalid=InvalidHandler]
* @template {UnknownHandler} [Unknown=UnknownHandler]
* @template {Record<string, Handler>} [Handlers=Record<string, Handler>]
* @param {string} key
*   Field to switch on.
* @param {Options<Invalid, Unknown, Handlers>} [options]
*   Configuration (required).
* @returns {{unknown: Unknown, invalid: Invalid, handlers: Handlers, (...parameters: Parameters<Handlers[keyof Handlers]>): ReturnType<Handlers[keyof Handlers]>, (...parameters: Parameters<Unknown>): ReturnType<Unknown>}}
*/
function zwitch(key, options) {
	const settings = options || {};
	/**
	* Handle one value.
	*
	* Based on the bound `key`, a respective handler will be called.
	* If `value` is not an object, or doesn’t have a `key` property, the special
	* “invalid” handler will be called.
	* If `value` has an unknown `key`, the special “unknown” handler will be
	* called.
	*
	* All arguments, and the context object, are passed through to the handler,
	* and it’s result is returned.
	*
	* @this {unknown}
	*   Any context object.
	* @param {unknown} [value]
	*   Any value.
	* @param {...unknown} parameters
	*   Arbitrary parameters passed to the zwitch.
	* @property {Handler} invalid
	*   Handle for values that do not have a certain ID field.
	* @property {Handler} unknown
	*   Handle values that do have a certain ID field, but it’s set to a value
	*   that is not listed in the `handlers` record.
	* @property {Handlers} handlers
	*   Record of handlers.
	* @returns {unknown}
	*   Anything.
	*/
	function one(value, ...parameters) {
		/** @type {Handler|undefined} */
		let fn = one.invalid;
		const handlers = one.handlers;
		if (value && own$2.call(value, key)) {
			const id = String(value[key]);
			fn = own$2.call(handlers, id) ? handlers[id] : one.unknown;
		}
		if (fn) return fn.call(this, value, ...parameters);
	}
	one.handlers = settings.handlers || {};
	one.invalid = settings.invalid;
	one.unknown = settings.unknown;
	return one;
}
//#endregion
//#region node_modules/.pnpm/stringify-entities@4.0.4/node_modules/stringify-entities/lib/core.js
/**
* @typedef CoreOptions
* @property {ReadonlyArray<string>} [subset=[]]
*   Whether to only escape the given subset of characters.
* @property {boolean} [escapeOnly=false]
*   Whether to only escape possibly dangerous characters.
*   Those characters are `"`, `&`, `'`, `<`, `>`, and `` ` ``.
*
* @typedef FormatOptions
* @property {(code: number, next: number, options: CoreWithFormatOptions) => string} format
*   Format strategy.
*
* @typedef {CoreOptions & FormatOptions & import('./util/format-smart.js').FormatSmartOptions} CoreWithFormatOptions
*/
var defaultSubsetRegex = /["&'<>`]/g;
var surrogatePairsRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
var controlCharactersRegex = /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;
var regexEscapeRegex = /[|\\{}()[\]^$+*?.]/g;
/** @type {WeakMap<ReadonlyArray<string>, RegExp>} */
var subsetToRegexCache = /* @__PURE__ */ new WeakMap();
/**
* Encode certain characters in `value`.
*
* @param {string} value
* @param {CoreWithFormatOptions} options
* @returns {string}
*/
function core(value, options) {
	value = value.replace(options.subset ? charactersToExpressionCached(options.subset) : defaultSubsetRegex, basic);
	if (options.subset || options.escapeOnly) return value;
	return value.replace(surrogatePairsRegex, surrogate).replace(controlCharactersRegex, basic);
	/**
	* @param {string} pair
	* @param {number} index
	* @param {string} all
	*/
	function surrogate(pair, index, all) {
		return options.format((pair.charCodeAt(0) - 55296) * 1024 + pair.charCodeAt(1) - 56320 + 65536, all.charCodeAt(index + 2), options);
	}
	/**
	* @param {string} character
	* @param {number} index
	* @param {string} all
	*/
	function basic(character, index, all) {
		return options.format(character.charCodeAt(0), all.charCodeAt(index + 1), options);
	}
}
/**
* A wrapper function that caches the result of `charactersToExpression` with a WeakMap.
* This can improve performance when tooling calls `charactersToExpression` repeatedly
* with the same subset.
*
* @param {ReadonlyArray<string>} subset
* @returns {RegExp}
*/
function charactersToExpressionCached(subset) {
	let cached = subsetToRegexCache.get(subset);
	if (!cached) {
		cached = charactersToExpression(subset);
		subsetToRegexCache.set(subset, cached);
	}
	return cached;
}
/**
* @param {ReadonlyArray<string>} subset
* @returns {RegExp}
*/
function charactersToExpression(subset) {
	/** @type {Array<string>} */
	const groups = [];
	let index = -1;
	while (++index < subset.length) groups.push(subset[index].replace(regexEscapeRegex, "\\$&"));
	return new RegExp("(?:" + groups.join("|") + ")", "g");
}
//#endregion
//#region node_modules/.pnpm/stringify-entities@4.0.4/node_modules/stringify-entities/lib/util/to-hexadecimal.js
var hexadecimalRegex = /[\dA-Fa-f]/;
/**
* Configurable ways to encode characters as hexadecimal references.
*
* @param {number} code
* @param {number} next
* @param {boolean|undefined} omit
* @returns {string}
*/
function toHexadecimal(code, next, omit) {
	const value = "&#x" + code.toString(16).toUpperCase();
	return omit && next && !hexadecimalRegex.test(String.fromCharCode(next)) ? value : value + ";";
}
//#endregion
//#region node_modules/.pnpm/stringify-entities@4.0.4/node_modules/stringify-entities/lib/util/to-decimal.js
var decimalRegex = /\d/;
/**
* Configurable ways to encode characters as decimal references.
*
* @param {number} code
* @param {number} next
* @param {boolean|undefined} omit
* @returns {string}
*/
function toDecimal(code, next, omit) {
	const value = "&#" + String(code);
	return omit && next && !decimalRegex.test(String.fromCharCode(next)) ? value : value + ";";
}
//#endregion
//#region node_modules/.pnpm/character-entities-legacy@3.0.0/node_modules/character-entities-legacy/index.js
/**
* List of legacy HTML named character references that don’t need a trailing semicolon.
*
* @type {Array<string>}
*/
var characterEntitiesLegacy = [
	"AElig",
	"AMP",
	"Aacute",
	"Acirc",
	"Agrave",
	"Aring",
	"Atilde",
	"Auml",
	"COPY",
	"Ccedil",
	"ETH",
	"Eacute",
	"Ecirc",
	"Egrave",
	"Euml",
	"GT",
	"Iacute",
	"Icirc",
	"Igrave",
	"Iuml",
	"LT",
	"Ntilde",
	"Oacute",
	"Ocirc",
	"Ograve",
	"Oslash",
	"Otilde",
	"Ouml",
	"QUOT",
	"REG",
	"THORN",
	"Uacute",
	"Ucirc",
	"Ugrave",
	"Uuml",
	"Yacute",
	"aacute",
	"acirc",
	"acute",
	"aelig",
	"agrave",
	"amp",
	"aring",
	"atilde",
	"auml",
	"brvbar",
	"ccedil",
	"cedil",
	"cent",
	"copy",
	"curren",
	"deg",
	"divide",
	"eacute",
	"ecirc",
	"egrave",
	"eth",
	"euml",
	"frac12",
	"frac14",
	"frac34",
	"gt",
	"iacute",
	"icirc",
	"iexcl",
	"igrave",
	"iquest",
	"iuml",
	"laquo",
	"lt",
	"macr",
	"micro",
	"middot",
	"nbsp",
	"not",
	"ntilde",
	"oacute",
	"ocirc",
	"ograve",
	"ordf",
	"ordm",
	"oslash",
	"otilde",
	"ouml",
	"para",
	"plusmn",
	"pound",
	"quot",
	"raquo",
	"reg",
	"sect",
	"shy",
	"sup1",
	"sup2",
	"sup3",
	"szlig",
	"thorn",
	"times",
	"uacute",
	"ucirc",
	"ugrave",
	"uml",
	"uuml",
	"yacute",
	"yen",
	"yuml"
];
//#endregion
//#region node_modules/.pnpm/character-entities-html4@2.1.0/node_modules/character-entities-html4/index.js
/**
* Map of named character references from HTML 4.
*
* @type {Record<string, string>}
*/
var characterEntitiesHtml4 = {
	nbsp: "\xA0",
	iexcl: "¡",
	cent: "¢",
	pound: "£",
	curren: "¤",
	yen: "¥",
	brvbar: "¦",
	sect: "§",
	uml: "¨",
	copy: "©",
	ordf: "ª",
	laquo: "«",
	not: "¬",
	shy: "­",
	reg: "®",
	macr: "¯",
	deg: "°",
	plusmn: "±",
	sup2: "²",
	sup3: "³",
	acute: "´",
	micro: "µ",
	para: "¶",
	middot: "·",
	cedil: "¸",
	sup1: "¹",
	ordm: "º",
	raquo: "»",
	frac14: "¼",
	frac12: "½",
	frac34: "¾",
	iquest: "¿",
	Agrave: "À",
	Aacute: "Á",
	Acirc: "Â",
	Atilde: "Ã",
	Auml: "Ä",
	Aring: "Å",
	AElig: "Æ",
	Ccedil: "Ç",
	Egrave: "È",
	Eacute: "É",
	Ecirc: "Ê",
	Euml: "Ë",
	Igrave: "Ì",
	Iacute: "Í",
	Icirc: "Î",
	Iuml: "Ï",
	ETH: "Ð",
	Ntilde: "Ñ",
	Ograve: "Ò",
	Oacute: "Ó",
	Ocirc: "Ô",
	Otilde: "Õ",
	Ouml: "Ö",
	times: "×",
	Oslash: "Ø",
	Ugrave: "Ù",
	Uacute: "Ú",
	Ucirc: "Û",
	Uuml: "Ü",
	Yacute: "Ý",
	THORN: "Þ",
	szlig: "ß",
	agrave: "à",
	aacute: "á",
	acirc: "â",
	atilde: "ã",
	auml: "ä",
	aring: "å",
	aelig: "æ",
	ccedil: "ç",
	egrave: "è",
	eacute: "é",
	ecirc: "ê",
	euml: "ë",
	igrave: "ì",
	iacute: "í",
	icirc: "î",
	iuml: "ï",
	eth: "ð",
	ntilde: "ñ",
	ograve: "ò",
	oacute: "ó",
	ocirc: "ô",
	otilde: "õ",
	ouml: "ö",
	divide: "÷",
	oslash: "ø",
	ugrave: "ù",
	uacute: "ú",
	ucirc: "û",
	uuml: "ü",
	yacute: "ý",
	thorn: "þ",
	yuml: "ÿ",
	fnof: "ƒ",
	Alpha: "Α",
	Beta: "Β",
	Gamma: "Γ",
	Delta: "Δ",
	Epsilon: "Ε",
	Zeta: "Ζ",
	Eta: "Η",
	Theta: "Θ",
	Iota: "Ι",
	Kappa: "Κ",
	Lambda: "Λ",
	Mu: "Μ",
	Nu: "Ν",
	Xi: "Ξ",
	Omicron: "Ο",
	Pi: "Π",
	Rho: "Ρ",
	Sigma: "Σ",
	Tau: "Τ",
	Upsilon: "Υ",
	Phi: "Φ",
	Chi: "Χ",
	Psi: "Ψ",
	Omega: "Ω",
	alpha: "α",
	beta: "β",
	gamma: "γ",
	delta: "δ",
	epsilon: "ε",
	zeta: "ζ",
	eta: "η",
	theta: "θ",
	iota: "ι",
	kappa: "κ",
	lambda: "λ",
	mu: "μ",
	nu: "ν",
	xi: "ξ",
	omicron: "ο",
	pi: "π",
	rho: "ρ",
	sigmaf: "ς",
	sigma: "σ",
	tau: "τ",
	upsilon: "υ",
	phi: "φ",
	chi: "χ",
	psi: "ψ",
	omega: "ω",
	thetasym: "ϑ",
	upsih: "ϒ",
	piv: "ϖ",
	bull: "•",
	hellip: "…",
	prime: "′",
	Prime: "″",
	oline: "‾",
	frasl: "⁄",
	weierp: "℘",
	image: "ℑ",
	real: "ℜ",
	trade: "™",
	alefsym: "ℵ",
	larr: "←",
	uarr: "↑",
	rarr: "→",
	darr: "↓",
	harr: "↔",
	crarr: "↵",
	lArr: "⇐",
	uArr: "⇑",
	rArr: "⇒",
	dArr: "⇓",
	hArr: "⇔",
	forall: "∀",
	part: "∂",
	exist: "∃",
	empty: "∅",
	nabla: "∇",
	isin: "∈",
	notin: "∉",
	ni: "∋",
	prod: "∏",
	sum: "∑",
	minus: "−",
	lowast: "∗",
	radic: "√",
	prop: "∝",
	infin: "∞",
	ang: "∠",
	and: "∧",
	or: "∨",
	cap: "∩",
	cup: "∪",
	int: "∫",
	there4: "∴",
	sim: "∼",
	cong: "≅",
	asymp: "≈",
	ne: "≠",
	equiv: "≡",
	le: "≤",
	ge: "≥",
	sub: "⊂",
	sup: "⊃",
	nsub: "⊄",
	sube: "⊆",
	supe: "⊇",
	oplus: "⊕",
	otimes: "⊗",
	perp: "⊥",
	sdot: "⋅",
	lceil: "⌈",
	rceil: "⌉",
	lfloor: "⌊",
	rfloor: "⌋",
	lang: "〈",
	rang: "〉",
	loz: "◊",
	spades: "♠",
	clubs: "♣",
	hearts: "♥",
	diams: "♦",
	quot: "\"",
	amp: "&",
	lt: "<",
	gt: ">",
	OElig: "Œ",
	oelig: "œ",
	Scaron: "Š",
	scaron: "š",
	Yuml: "Ÿ",
	circ: "ˆ",
	tilde: "˜",
	ensp: " ",
	emsp: " ",
	thinsp: " ",
	zwnj: "‌",
	zwj: "‍",
	lrm: "‎",
	rlm: "‏",
	ndash: "–",
	mdash: "—",
	lsquo: "‘",
	rsquo: "’",
	sbquo: "‚",
	ldquo: "“",
	rdquo: "”",
	bdquo: "„",
	dagger: "†",
	Dagger: "‡",
	permil: "‰",
	lsaquo: "‹",
	rsaquo: "›",
	euro: "€"
};
//#endregion
//#region node_modules/.pnpm/stringify-entities@4.0.4/node_modules/stringify-entities/lib/constant/dangerous.js
/**
* List of legacy (that don’t need a trailing `;`) named references which could,
* depending on what follows them, turn into a different meaning
*
* @type {Array<string>}
*/
var dangerous = [
	"cent",
	"copy",
	"divide",
	"gt",
	"lt",
	"not",
	"para",
	"times"
];
//#endregion
//#region node_modules/.pnpm/stringify-entities@4.0.4/node_modules/stringify-entities/lib/util/to-named.js
var own$1 = {}.hasOwnProperty;
/**
* `characterEntitiesHtml4` but inverted.
*
* @type {Record<string, string>}
*/
var characters = {};
/** @type {string} */
var key;
for (key in characterEntitiesHtml4) if (own$1.call(characterEntitiesHtml4, key)) characters[characterEntitiesHtml4[key]] = key;
var notAlphanumericRegex = /[^\dA-Za-z]/;
/**
* Configurable ways to encode characters as named references.
*
* @param {number} code
* @param {number} next
* @param {boolean|undefined} omit
* @param {boolean|undefined} attribute
* @returns {string}
*/
function toNamed(code, next, omit, attribute) {
	const character = String.fromCharCode(code);
	if (own$1.call(characters, character)) {
		const name = characters[character];
		const value = "&" + name;
		if (omit && characterEntitiesLegacy.includes(name) && !dangerous.includes(name) && (!attribute || next && next !== 61 && notAlphanumericRegex.test(String.fromCharCode(next)))) return value;
		return value + ";";
	}
	return "";
}
//#endregion
//#region node_modules/.pnpm/stringify-entities@4.0.4/node_modules/stringify-entities/lib/util/format-smart.js
/**
* @typedef FormatSmartOptions
* @property {boolean} [useNamedReferences=false]
*   Prefer named character references (`&amp;`) where possible.
* @property {boolean} [useShortestReferences=false]
*   Prefer the shortest possible reference, if that results in less bytes.
*   **Note**: `useNamedReferences` can be omitted when using `useShortestReferences`.
* @property {boolean} [omitOptionalSemicolons=false]
*   Whether to omit semicolons when possible.
*   **Note**: This creates what HTML calls “parse errors” but is otherwise still valid HTML — don’t use this except when building a minifier.
*   Omitting semicolons is possible for certain named and numeric references in some cases.
* @property {boolean} [attribute=false]
*   Create character references which don’t fail in attributes.
*   **Note**: `attribute` only applies when operating dangerously with
*   `omitOptionalSemicolons: true`.
*/
/**
* Configurable ways to encode a character yielding pretty or small results.
*
* @param {number} code
* @param {number} next
* @param {FormatSmartOptions} options
* @returns {string}
*/
function formatSmart(code, next, options) {
	let numeric = toHexadecimal(code, next, options.omitOptionalSemicolons);
	/** @type {string|undefined} */
	let named;
	if (options.useNamedReferences || options.useShortestReferences) named = toNamed(code, next, options.omitOptionalSemicolons, options.attribute);
	if ((options.useShortestReferences || !named) && options.useShortestReferences) {
		const decimal = toDecimal(code, next, options.omitOptionalSemicolons);
		if (decimal.length < numeric.length) numeric = decimal;
	}
	return named && (!options.useShortestReferences || named.length < numeric.length) ? named : numeric;
}
//#endregion
//#region node_modules/.pnpm/stringify-entities@4.0.4/node_modules/stringify-entities/lib/index.js
/**
* @typedef {import('./core.js').CoreOptions & import('./util/format-smart.js').FormatSmartOptions} Options
* @typedef {import('./core.js').CoreOptions} LightOptions
*/
/**
* Encode special characters in `value`.
*
* @param {string} value
*   Value to encode.
* @param {Options} [options]
*   Configuration.
* @returns {string}
*   Encoded value.
*/
function stringifyEntities(value, options) {
	return core(value, Object.assign({ format: formatSmart }, options));
}
//#endregion
//#region node_modules/.pnpm/hast-util-to-html@9.0.5/node_modules/hast-util-to-html/lib/handle/comment.js
/**
* @import {Comment, Parents} from 'hast'
* @import {State} from '../index.js'
*/
var htmlCommentRegex = /^>|^->|<!--|-->|--!>|<!-$/g;
var bogusCommentEntitySubset = [">"];
var commentEntitySubset = ["<", ">"];
/**
* Serialize a comment.
*
* @param {Comment} node
*   Node to handle.
* @param {number | undefined} _1
*   Index of `node` in `parent.
* @param {Parents | undefined} _2
*   Parent of `node`.
* @param {State} state
*   Info passed around about the current state.
* @returns {string}
*   Serialized node.
*/
function comment(node, _1, _2, state) {
	return state.settings.bogusComments ? "<?" + stringifyEntities(node.value, Object.assign({}, state.settings.characterReferences, { subset: bogusCommentEntitySubset })) + ">" : "<!--" + node.value.replace(htmlCommentRegex, encode) + "-->";
	/**
	* @param {string} $0
	*/
	function encode($0) {
		return stringifyEntities($0, Object.assign({}, state.settings.characterReferences, { subset: commentEntitySubset }));
	}
}
//#endregion
//#region node_modules/.pnpm/hast-util-to-html@9.0.5/node_modules/hast-util-to-html/lib/handle/doctype.js
/**
* @import {Doctype, Parents} from 'hast'
* @import {State} from '../index.js'
*/
/**
* Serialize a doctype.
*
* @param {Doctype} _1
*   Node to handle.
* @param {number | undefined} _2
*   Index of `node` in `parent.
* @param {Parents | undefined} _3
*   Parent of `node`.
* @param {State} state
*   Info passed around about the current state.
* @returns {string}
*   Serialized node.
*/
function doctype(_1, _2, _3, state) {
	return "<!" + (state.settings.upperDoctype ? "DOCTYPE" : "doctype") + (state.settings.tightDoctype ? "" : " ") + "html>";
}
//#endregion
//#region node_modules/.pnpm/ccount@2.0.1/node_modules/ccount/index.js
/**
* Count how often a character (or substring) is used in a string.
*
* @param {string} value
*   Value to search in.
* @param {string} character
*   Character (or substring) to look for.
* @return {number}
*   Number of times `character` occurred in `value`.
*/
function ccount(value, character) {
	const source = String(value);
	if (typeof character !== "string") throw new TypeError("Expected character");
	let count = 0;
	let index = source.indexOf(character);
	while (index !== -1) {
		count++;
		index = source.indexOf(character, index + character.length);
	}
	return count;
}
//#endregion
//#region node_modules/.pnpm/comma-separated-tokens@2.0.3/node_modules/comma-separated-tokens/index.js
/**
* Serialize an array of strings or numbers to comma-separated tokens.
*
* @param {Array<string|number>} values
*   List of tokens.
* @param {Options} [options]
*   Configuration for `stringify` (optional).
* @returns {string}
*   Comma-separated tokens.
*/
function stringify$2(values, options) {
	const settings = options || {};
	return (values[values.length - 1] === "" ? [...values, ""] : values).join((settings.padRight ? " " : "") + "," + (settings.padLeft === false ? "" : " ")).trim();
}
//#endregion
//#region node_modules/.pnpm/space-separated-tokens@2.0.2/node_modules/space-separated-tokens/index.js
/**
* Serialize an array of strings as space separated-tokens.
*
* @param {Array<string|number>} values
*   List of tokens.
* @returns {string}
*   Space-separated tokens.
*/
function stringify$1(values) {
	return values.join(" ").trim();
}
//#endregion
//#region node_modules/.pnpm/hast-util-whitespace@3.0.0/node_modules/hast-util-whitespace/lib/index.js
/**
* @typedef {import('hast').Nodes} Nodes
*/
var re = /[ \t\n\f\r]/g;
/**
* Check if the given value is *inter-element whitespace*.
*
* @param {Nodes | string} thing
*   Thing to check (`Node` or `string`).
* @returns {boolean}
*   Whether the `value` is inter-element whitespace (`boolean`): consisting of
*   zero or more of space, tab (`\t`), line feed (`\n`), carriage return
*   (`\r`), or form feed (`\f`); if a node is passed it must be a `Text` node,
*   whose `value` field is checked.
*/
function whitespace(thing) {
	return typeof thing === "object" ? thing.type === "text" ? empty(thing.value) : false : empty(thing);
}
/**
* @param {string} value
* @returns {boolean}
*/
function empty(value) {
	return value.replace(re, "") === "";
}
//#endregion
//#region node_modules/.pnpm/hast-util-to-html@9.0.5/node_modules/hast-util-to-html/lib/omission/util/siblings.js
/**
* @import {Parents, RootContent} from 'hast'
*/
var siblingAfter = siblings(1);
var siblingBefore = siblings(-1);
/** @type {Array<RootContent>} */
var emptyChildren$1 = [];
/**
* Factory to check siblings in a direction.
*
* @param {number} increment
*/
function siblings(increment) {
	return sibling;
	/**
	* Find applicable siblings in a direction.
	*
	* @template {Parents} Parent
	*   Parent type.
	* @param {Parent | undefined} parent
	*   Parent.
	* @param {number | undefined} index
	*   Index of child in `parent`.
	* @param {boolean | undefined} [includeWhitespace=false]
	*   Whether to include whitespace (default: `false`).
	* @returns {Parent extends {children: Array<infer Child>} ? Child | undefined : never}
	*   Child of parent.
	*/
	function sibling(parent, index, includeWhitespace) {
		const siblings = parent ? parent.children : emptyChildren$1;
		let offset = (index || 0) + increment;
		let next = siblings[offset];
		if (!includeWhitespace) while (next && whitespace(next)) {
			offset += increment;
			next = siblings[offset];
		}
		return next;
	}
}
//#endregion
//#region node_modules/.pnpm/hast-util-to-html@9.0.5/node_modules/hast-util-to-html/lib/omission/omission.js
/**
* @import {Element, Parents} from 'hast'
*/
/**
* @callback OmitHandle
*   Check if a tag can be omitted.
* @param {Element} element
*   Element to check.
* @param {number | undefined} index
*   Index of element in parent.
* @param {Parents | undefined} parent
*   Parent of element.
* @returns {boolean}
*   Whether to omit a tag.
*
*/
var own = {}.hasOwnProperty;
/**
* Factory to check if a given node can have a tag omitted.
*
* @param {Record<string, OmitHandle>} handlers
*   Omission handlers, where each key is a tag name, and each value is the
*   corresponding handler.
* @returns {OmitHandle}
*   Whether to omit a tag of an element.
*/
function omission(handlers) {
	return omit;
	/**
	* Check if a given node can have a tag omitted.
	*
	* @type {OmitHandle}
	*/
	function omit(node, index, parent) {
		return own.call(handlers, node.tagName) && handlers[node.tagName](node, index, parent);
	}
}
//#endregion
//#region node_modules/.pnpm/hast-util-to-html@9.0.5/node_modules/hast-util-to-html/lib/omission/closing.js
/**
* @import {Element, Parents} from 'hast'
*/
var closing = omission({
	body: body$1,
	caption: headOrColgroupOrCaption,
	colgroup: headOrColgroupOrCaption,
	dd,
	dt,
	head: headOrColgroupOrCaption,
	html: html$1,
	li,
	optgroup,
	option,
	p,
	rp: rubyElement,
	rt: rubyElement,
	tbody: tbody$1,
	td: cells,
	tfoot,
	th: cells,
	thead,
	tr
});
/**
* Macro for `</head>`, `</colgroup>`, and `</caption>`.
*
* @param {Element} _
*   Element.
* @param {number | undefined} index
*   Index of element in parent.
* @param {Parents | undefined} parent
*   Parent of element.
* @returns {boolean}
*   Whether the closing tag can be omitted.
*/
function headOrColgroupOrCaption(_, index, parent) {
	const next = siblingAfter(parent, index, true);
	return !next || next.type !== "comment" && !(next.type === "text" && whitespace(next.value.charAt(0)));
}
/**
* Whether to omit `</html>`.
*
* @param {Element} _
*   Element.
* @param {number | undefined} index
*   Index of element in parent.
* @param {Parents | undefined} parent
*   Parent of element.
* @returns {boolean}
*   Whether the closing tag can be omitted.
*/
function html$1(_, index, parent) {
	const next = siblingAfter(parent, index);
	return !next || next.type !== "comment";
}
/**
* Whether to omit `</body>`.
*
* @param {Element} _
*   Element.
* @param {number | undefined} index
*   Index of element in parent.
* @param {Parents | undefined} parent
*   Parent of element.
* @returns {boolean}
*   Whether the closing tag can be omitted.
*/
function body$1(_, index, parent) {
	const next = siblingAfter(parent, index);
	return !next || next.type !== "comment";
}
/**
* Whether to omit `</p>`.
*
* @param {Element} _
*   Element.
* @param {number | undefined} index
*   Index of element in parent.
* @param {Parents | undefined} parent
*   Parent of element.
* @returns {boolean}
*   Whether the closing tag can be omitted.
*/
function p(_, index, parent) {
	const next = siblingAfter(parent, index);
	return next ? next.type === "element" && (next.tagName === "address" || next.tagName === "article" || next.tagName === "aside" || next.tagName === "blockquote" || next.tagName === "details" || next.tagName === "div" || next.tagName === "dl" || next.tagName === "fieldset" || next.tagName === "figcaption" || next.tagName === "figure" || next.tagName === "footer" || next.tagName === "form" || next.tagName === "h1" || next.tagName === "h2" || next.tagName === "h3" || next.tagName === "h4" || next.tagName === "h5" || next.tagName === "h6" || next.tagName === "header" || next.tagName === "hgroup" || next.tagName === "hr" || next.tagName === "main" || next.tagName === "menu" || next.tagName === "nav" || next.tagName === "ol" || next.tagName === "p" || next.tagName === "pre" || next.tagName === "section" || next.tagName === "table" || next.tagName === "ul") : !parent || !(parent.type === "element" && (parent.tagName === "a" || parent.tagName === "audio" || parent.tagName === "del" || parent.tagName === "ins" || parent.tagName === "map" || parent.tagName === "noscript" || parent.tagName === "video"));
}
/**
* Whether to omit `</li>`.
*
* @param {Element} _
*   Element.
* @param {number | undefined} index
*   Index of element in parent.
* @param {Parents | undefined} parent
*   Parent of element.
* @returns {boolean}
*   Whether the closing tag can be omitted.
*/
function li(_, index, parent) {
	const next = siblingAfter(parent, index);
	return !next || next.type === "element" && next.tagName === "li";
}
/**
* Whether to omit `</dt>`.
*
* @param {Element} _
*   Element.
* @param {number | undefined} index
*   Index of element in parent.
* @param {Parents | undefined} parent
*   Parent of element.
* @returns {boolean}
*   Whether the closing tag can be omitted.
*/
function dt(_, index, parent) {
	const next = siblingAfter(parent, index);
	return Boolean(next && next.type === "element" && (next.tagName === "dt" || next.tagName === "dd"));
}
/**
* Whether to omit `</dd>`.
*
* @param {Element} _
*   Element.
* @param {number | undefined} index
*   Index of element in parent.
* @param {Parents | undefined} parent
*   Parent of element.
* @returns {boolean}
*   Whether the closing tag can be omitted.
*/
function dd(_, index, parent) {
	const next = siblingAfter(parent, index);
	return !next || next.type === "element" && (next.tagName === "dt" || next.tagName === "dd");
}
/**
* Whether to omit `</rt>` or `</rp>`.
*
* @param {Element} _
*   Element.
* @param {number | undefined} index
*   Index of element in parent.
* @param {Parents | undefined} parent
*   Parent of element.
* @returns {boolean}
*   Whether the closing tag can be omitted.
*/
function rubyElement(_, index, parent) {
	const next = siblingAfter(parent, index);
	return !next || next.type === "element" && (next.tagName === "rp" || next.tagName === "rt");
}
/**
* Whether to omit `</optgroup>`.
*
* @param {Element} _
*   Element.
* @param {number | undefined} index
*   Index of element in parent.
* @param {Parents | undefined} parent
*   Parent of element.
* @returns {boolean}
*   Whether the closing tag can be omitted.
*/
function optgroup(_, index, parent) {
	const next = siblingAfter(parent, index);
	return !next || next.type === "element" && next.tagName === "optgroup";
}
/**
* Whether to omit `</option>`.
*
* @param {Element} _
*   Element.
* @param {number | undefined} index
*   Index of element in parent.
* @param {Parents | undefined} parent
*   Parent of element.
* @returns {boolean}
*   Whether the closing tag can be omitted.
*/
function option(_, index, parent) {
	const next = siblingAfter(parent, index);
	return !next || next.type === "element" && (next.tagName === "option" || next.tagName === "optgroup");
}
/**
* Whether to omit `</thead>`.
*
* @param {Element} _
*   Element.
* @param {number | undefined} index
*   Index of element in parent.
* @param {Parents | undefined} parent
*   Parent of element.
* @returns {boolean}
*   Whether the closing tag can be omitted.
*/
function thead(_, index, parent) {
	const next = siblingAfter(parent, index);
	return Boolean(next && next.type === "element" && (next.tagName === "tbody" || next.tagName === "tfoot"));
}
/**
* Whether to omit `</tbody>`.
*
* @param {Element} _
*   Element.
* @param {number | undefined} index
*   Index of element in parent.
* @param {Parents | undefined} parent
*   Parent of element.
* @returns {boolean}
*   Whether the closing tag can be omitted.
*/
function tbody$1(_, index, parent) {
	const next = siblingAfter(parent, index);
	return !next || next.type === "element" && (next.tagName === "tbody" || next.tagName === "tfoot");
}
/**
* Whether to omit `</tfoot>`.
*
* @param {Element} _
*   Element.
* @param {number | undefined} index
*   Index of element in parent.
* @param {Parents | undefined} parent
*   Parent of element.
* @returns {boolean}
*   Whether the closing tag can be omitted.
*/
function tfoot(_, index, parent) {
	return !siblingAfter(parent, index);
}
/**
* Whether to omit `</tr>`.
*
* @param {Element} _
*   Element.
* @param {number | undefined} index
*   Index of element in parent.
* @param {Parents | undefined} parent
*   Parent of element.
* @returns {boolean}
*   Whether the closing tag can be omitted.
*/
function tr(_, index, parent) {
	const next = siblingAfter(parent, index);
	return !next || next.type === "element" && next.tagName === "tr";
}
/**
* Whether to omit `</td>` or `</th>`.
*
* @param {Element} _
*   Element.
* @param {number | undefined} index
*   Index of element in parent.
* @param {Parents | undefined} parent
*   Parent of element.
* @returns {boolean}
*   Whether the closing tag can be omitted.
*/
function cells(_, index, parent) {
	const next = siblingAfter(parent, index);
	return !next || next.type === "element" && (next.tagName === "td" || next.tagName === "th");
}
//#endregion
//#region node_modules/.pnpm/hast-util-to-html@9.0.5/node_modules/hast-util-to-html/lib/omission/opening.js
/**
* @import {Element, Parents} from 'hast'
*/
var opening = omission({
	body,
	colgroup,
	head,
	html,
	tbody
});
/**
* Whether to omit `<html>`.
*
* @param {Element} node
*   Element.
* @returns {boolean}
*   Whether the opening tag can be omitted.
*/
function html(node) {
	const head = siblingAfter(node, -1);
	return !head || head.type !== "comment";
}
/**
* Whether to omit `<head>`.
*
* @param {Element} node
*   Element.
* @returns {boolean}
*   Whether the opening tag can be omitted.
*/
function head(node) {
	/** @type {Set<string>} */
	const seen = /* @__PURE__ */ new Set();
	for (const child of node.children) if (child.type === "element" && (child.tagName === "base" || child.tagName === "title")) {
		if (seen.has(child.tagName)) return false;
		seen.add(child.tagName);
	}
	const child = node.children[0];
	return !child || child.type === "element";
}
/**
* Whether to omit `<body>`.
*
* @param {Element} node
*   Element.
* @returns {boolean}
*   Whether the opening tag can be omitted.
*/
function body(node) {
	const head = siblingAfter(node, -1, true);
	return !head || head.type !== "comment" && !(head.type === "text" && whitespace(head.value.charAt(0))) && !(head.type === "element" && (head.tagName === "meta" || head.tagName === "link" || head.tagName === "script" || head.tagName === "style" || head.tagName === "template"));
}
/**
* Whether to omit `<colgroup>`.
* The spec describes some logic for the opening tag, but it’s easier to
* implement in the closing tag, to the same effect, so we handle it there
* instead.
*
* @param {Element} node
*   Element.
* @param {number | undefined} index
*   Index of element in parent.
* @param {Parents | undefined} parent
*   Parent of element.
* @returns {boolean}
*   Whether the opening tag can be omitted.
*/
function colgroup(node, index, parent) {
	const previous = siblingBefore(parent, index);
	const head = siblingAfter(node, -1, true);
	if (parent && previous && previous.type === "element" && previous.tagName === "colgroup" && closing(previous, parent.children.indexOf(previous), parent)) return false;
	return Boolean(head && head.type === "element" && head.tagName === "col");
}
/**
* Whether to omit `<tbody>`.
*
* @param {Element} node
*   Element.
* @param {number | undefined} index
*   Index of element in parent.
* @param {Parents | undefined} parent
*   Parent of element.
* @returns {boolean}
*   Whether the opening tag can be omitted.
*/
function tbody(node, index, parent) {
	const previous = siblingBefore(parent, index);
	const head = siblingAfter(node, -1);
	if (parent && previous && previous.type === "element" && (previous.tagName === "thead" || previous.tagName === "tbody") && closing(previous, parent.children.indexOf(previous), parent)) return false;
	return Boolean(head && head.type === "element" && head.tagName === "tr");
}
//#endregion
//#region node_modules/.pnpm/hast-util-to-html@9.0.5/node_modules/hast-util-to-html/lib/handle/element.js
/**
* @import {Element, Parents, Properties} from 'hast'
* @import {State} from '../index.js'
*/
/**
* Maps of subsets.
*
* Each value is a matrix of tuples.
* The value at `0` causes parse errors, the value at `1` is valid.
* Of both, the value at `0` is unsafe, and the value at `1` is safe.
*
* @type {Record<'double' | 'name' | 'single' | 'unquoted', Array<[Array<string>, Array<string>]>>}
*/
var constants = {
	name: [["	\n\f\r &/=>".split(""), "	\n\f\r \"&'/=>`".split("")], ["\0	\n\f\r \"&'/<=>".split(""), "\0	\n\f\r \"&'/<=>`".split("")]],
	unquoted: [["	\n\f\r &>".split(""), "\0	\n\f\r \"&'<=>`".split("")], ["\0	\n\f\r \"&'<=>`".split(""), "\0	\n\f\r \"&'<=>`".split("")]],
	single: [["&'".split(""), "\"&'`".split("")], ["\0&'".split(""), "\0\"&'`".split("")]],
	double: [["\"&".split(""), "\"&'`".split("")], ["\0\"&".split(""), "\0\"&'`".split("")]]
};
/**
* Serialize an element node.
*
* @param {Element} node
*   Node to handle.
* @param {number | undefined} index
*   Index of `node` in `parent.
* @param {Parents | undefined} parent
*   Parent of `node`.
* @param {State} state
*   Info passed around about the current state.
* @returns {string}
*   Serialized node.
*/
function element(node, index, parent, state) {
	const schema = state.schema;
	const omit = schema.space === "svg" ? false : state.settings.omitOptionalTags;
	let selfClosing = schema.space === "svg" ? state.settings.closeEmptyElements : state.settings.voids.includes(node.tagName.toLowerCase());
	/** @type {Array<string>} */
	const parts = [];
	/** @type {string} */
	let last;
	if (schema.space === "html" && node.tagName === "svg") state.schema = svg;
	const attributes = serializeAttributes(state, node.properties);
	const content = state.all(schema.space === "html" && node.tagName === "template" ? node.content : node);
	state.schema = schema;
	if (content) selfClosing = false;
	if (attributes || !omit || !opening(node, index, parent)) {
		parts.push("<", node.tagName, attributes ? " " + attributes : "");
		if (selfClosing && (schema.space === "svg" || state.settings.closeSelfClosing)) {
			last = attributes.charAt(attributes.length - 1);
			if (!state.settings.tightSelfClosing || last === "/" || last && last !== "\"" && last !== "'") parts.push(" ");
			parts.push("/");
		}
		parts.push(">");
	}
	parts.push(content);
	if (!selfClosing && (!omit || !closing(node, index, parent))) parts.push("</" + node.tagName + ">");
	return parts.join("");
}
/**
* @param {State} state
* @param {Properties | null | undefined} properties
* @returns {string}
*/
function serializeAttributes(state, properties) {
	/** @type {Array<string>} */
	const values = [];
	let index = -1;
	/** @type {string} */
	let key;
	if (properties) {
		for (key in properties) if (properties[key] !== null && properties[key] !== void 0) {
			const value = serializeAttribute(state, key, properties[key]);
			if (value) values.push(value);
		}
	}
	while (++index < values.length) {
		const last = state.settings.tightAttributes ? values[index].charAt(values[index].length - 1) : void 0;
		if (index !== values.length - 1 && last !== "\"" && last !== "'") values[index] += " ";
	}
	return values.join("");
}
/**
* @param {State} state
* @param {string} key
* @param {Properties[keyof Properties]} value
* @returns {string}
*/
function serializeAttribute(state, key, value) {
	const info = find(state.schema, key);
	const x = state.settings.allowParseErrors && state.schema.space === "html" ? 0 : 1;
	const y = state.settings.allowDangerousCharacters ? 0 : 1;
	let quote = state.quote;
	/** @type {string | undefined} */
	let result;
	if (info.overloadedBoolean && (value === info.attribute || value === "")) value = true;
	else if ((info.boolean || info.overloadedBoolean) && (typeof value !== "string" || value === info.attribute || value === "")) value = Boolean(value);
	if (value === null || value === void 0 || value === false || typeof value === "number" && Number.isNaN(value)) return "";
	const name = stringifyEntities(info.attribute, Object.assign({}, state.settings.characterReferences, { subset: constants.name[x][y] }));
	if (value === true) return name;
	value = Array.isArray(value) ? (info.commaSeparated ? stringify$2 : stringify$1)(value, { padLeft: !state.settings.tightCommaSeparatedLists }) : String(value);
	if (state.settings.collapseEmptyAttributes && !value) return name;
	if (state.settings.preferUnquoted) result = stringifyEntities(value, Object.assign({}, state.settings.characterReferences, {
		attribute: true,
		subset: constants.unquoted[x][y]
	}));
	if (result !== value) {
		if (state.settings.quoteSmart && ccount(value, quote) > ccount(value, state.alternative)) quote = state.alternative;
		result = quote + stringifyEntities(value, Object.assign({}, state.settings.characterReferences, {
			subset: (quote === "'" ? constants.single : constants.double)[x][y],
			attribute: true
		})) + quote;
	}
	return name + (result ? "=" + result : result);
}
//#endregion
//#region node_modules/.pnpm/hast-util-to-html@9.0.5/node_modules/hast-util-to-html/lib/handle/text.js
/**
* @import {Parents, Text} from 'hast'
* @import {Raw} from 'mdast-util-to-hast'
* @import {State} from '../index.js'
*/
var textEntitySubset = ["<", "&"];
/**
* Serialize a text node.
*
* @param {Raw | Text} node
*   Node to handle.
* @param {number | undefined} _
*   Index of `node` in `parent.
* @param {Parents | undefined} parent
*   Parent of `node`.
* @param {State} state
*   Info passed around about the current state.
* @returns {string}
*   Serialized node.
*/
function text(node, _, parent, state) {
	return parent && parent.type === "element" && (parent.tagName === "script" || parent.tagName === "style") ? node.value : stringifyEntities(node.value, Object.assign({}, state.settings.characterReferences, { subset: textEntitySubset }));
}
//#endregion
//#region node_modules/.pnpm/hast-util-to-html@9.0.5/node_modules/hast-util-to-html/lib/handle/raw.js
/**
* @import {Parents} from 'hast'
* @import {Raw} from 'mdast-util-to-hast'
* @import {State} from '../index.js'
*/
/**
* Serialize a raw node.
*
* @param {Raw} node
*   Node to handle.
* @param {number | undefined} index
*   Index of `node` in `parent.
* @param {Parents | undefined} parent
*   Parent of `node`.
* @param {State} state
*   Info passed around about the current state.
* @returns {string}
*   Serialized node.
*/
function raw(node, index, parent, state) {
	return state.settings.allowDangerousHtml ? node.value : text(node, index, parent, state);
}
//#endregion
//#region node_modules/.pnpm/hast-util-to-html@9.0.5/node_modules/hast-util-to-html/lib/handle/root.js
/**
* @import {Parents, Root} from 'hast'
* @import {State} from '../index.js'
*/
/**
* Serialize a root.
*
* @param {Root} node
*   Node to handle.
* @param {number | undefined} _1
*   Index of `node` in `parent.
* @param {Parents | undefined} _2
*   Parent of `node`.
* @param {State} state
*   Info passed around about the current state.
* @returns {string}
*   Serialized node.
*/
function root(node, _1, _2, state) {
	return state.all(node);
}
//#endregion
//#region node_modules/.pnpm/hast-util-to-html@9.0.5/node_modules/hast-util-to-html/lib/handle/index.js
/**
* @import {Nodes, Parents} from 'hast'
* @import {State} from '../index.js'
*/
/**
* @type {(node: Nodes, index: number | undefined, parent: Parents | undefined, state: State) => string}
*/
var handle = zwitch("type", {
	invalid,
	unknown,
	handlers: {
		comment,
		doctype,
		element,
		raw,
		root,
		text
	}
});
/**
* Fail when a non-node is found in the tree.
*
* @param {unknown} node
*   Unknown value.
* @returns {never}
*   Never.
*/
function invalid(node) {
	throw new Error("Expected node, not `" + node + "`");
}
/**
* Fail when a node with an unknown type is found in the tree.
*
* @param {unknown} node_
*  Unknown node.
* @returns {never}
*   Never.
*/
function unknown(node_) {
	throw new Error("Cannot compile unknown node `" + node_.type + "`");
}
//#endregion
//#region node_modules/.pnpm/hast-util-to-html@9.0.5/node_modules/hast-util-to-html/lib/index.js
/**
* @import {Nodes, Parents, RootContent} from 'hast'
* @import {Schema} from 'property-information'
* @import {Options as StringifyEntitiesOptions} from 'stringify-entities'
*/
/**
* @typedef {Omit<StringifyEntitiesOptions, 'attribute' | 'escapeOnly' | 'subset'>} CharacterReferences
*
* @typedef Options
*   Configuration.
* @property {boolean | null | undefined} [allowDangerousCharacters=false]
*   Do not encode some characters which cause XSS vulnerabilities in older
*   browsers (default: `false`).
*
*   > ⚠️ **Danger**: only set this if you completely trust the content.
* @property {boolean | null | undefined} [allowDangerousHtml=false]
*   Allow `raw` nodes and insert them as raw HTML (default: `false`).
*
*   When `false`, `Raw` nodes are encoded.
*
*   > ⚠️ **Danger**: only set this if you completely trust the content.
* @property {boolean | null | undefined} [allowParseErrors=false]
*   Do not encode characters which cause parse errors (even though they work),
*   to save bytes (default: `false`).
*
*   Not used in the SVG space.
*
*   > 👉 **Note**: intentionally creates parse errors in markup (how parse
*   > errors are handled is well defined, so this works but isn’t pretty).
* @property {boolean | null | undefined} [bogusComments=false]
*   Use “bogus comments” instead of comments to save byes: `<?charlie>`
*   instead of `<!--charlie-->` (default: `false`).
*
*   > 👉 **Note**: intentionally creates parse errors in markup (how parse
*   > errors are handled is well defined, so this works but isn’t pretty).
* @property {CharacterReferences | null | undefined} [characterReferences]
*   Configure how to serialize character references (optional).
* @property {boolean | null | undefined} [closeEmptyElements=false]
*   Close SVG elements without any content with slash (`/`) on the opening tag
*   instead of an end tag: `<circle />` instead of `<circle></circle>`
*   (default: `false`).
*
*   See `tightSelfClosing` to control whether a space is used before the
*   slash.
*
*   Not used in the HTML space.
* @property {boolean | null | undefined} [closeSelfClosing=false]
*   Close self-closing nodes with an extra slash (`/`): `<img />` instead of
*   `<img>` (default: `false`).
*
*   See `tightSelfClosing` to control whether a space is used before the
*   slash.
*
*   Not used in the SVG space.
* @property {boolean | null | undefined} [collapseEmptyAttributes=false]
*   Collapse empty attributes: get `class` instead of `class=""` (default:
*   `false`).
*
*   Not used in the SVG space.
*
*   > 👉 **Note**: boolean attributes (such as `hidden`) are always collapsed.
* @property {boolean | null | undefined} [omitOptionalTags=false]
*   Omit optional opening and closing tags (default: `false`).
*
*   For example, in `<ol><li>one</li><li>two</li></ol>`, both `</li>` closing
*   tags can be omitted.
*   The first because it’s followed by another `li`, the last because it’s
*   followed by nothing.
*
*   Not used in the SVG space.
* @property {boolean | null | undefined} [preferUnquoted=false]
*   Leave attributes unquoted if that results in less bytes (default: `false`).
*
*   Not used in the SVG space.
* @property {boolean | null | undefined} [quoteSmart=false]
*   Use the other quote if that results in less bytes (default: `false`).
* @property {Quote | null | undefined} [quote='"']
*   Preferred quote to use (default: `'"'`).
* @property {Space | null | undefined} [space='html']
*   When an `<svg>` element is found in the HTML space, this package already
*   automatically switches to and from the SVG space when entering and exiting
*   it (default: `'html'`).
*
*   > 👉 **Note**: hast is not XML.
*   > It supports SVG as embedded in HTML.
*   > It does not support the features available in XML.
*   > Passing SVG might break but fragments of modern SVG should be fine.
*   > Use [`xast`][xast] if you need to support SVG as XML.
* @property {boolean | null | undefined} [tightAttributes=false]
*   Join attributes together, without whitespace, if possible: get
*   `class="a b"title="c d"` instead of `class="a b" title="c d"` to save
*   bytes (default: `false`).
*
*   Not used in the SVG space.
*
*   > 👉 **Note**: intentionally creates parse errors in markup (how parse
*   > errors are handled is well defined, so this works but isn’t pretty).
* @property {boolean | null | undefined} [tightCommaSeparatedLists=false]
*   Join known comma-separated attribute values with just a comma (`,`),
*   instead of padding them on the right as well (`,␠`, where `␠` represents a
*   space) (default: `false`).
* @property {boolean | null | undefined} [tightDoctype=false]
*   Drop unneeded spaces in doctypes: `<!doctypehtml>` instead of
*   `<!doctype html>` to save bytes (default: `false`).
*
*   > 👉 **Note**: intentionally creates parse errors in markup (how parse
*   > errors are handled is well defined, so this works but isn’t pretty).
* @property {boolean | null | undefined} [tightSelfClosing=false]
*   Do not use an extra space when closing self-closing elements: `<img/>`
*   instead of `<img />` (default: `false`).
*
*   > 👉 **Note**: only used if `closeSelfClosing: true` or
*   > `closeEmptyElements: true`.
* @property {boolean | null | undefined} [upperDoctype=false]
*   Use a `<!DOCTYPE…` instead of `<!doctype…` (default: `false`).
*
*   Useless except for XHTML.
* @property {ReadonlyArray<string> | null | undefined} [voids]
*   Tag names of elements to serialize without closing tag (default: `html-void-elements`).
*
*   Not used in the SVG space.
*
*   > 👉 **Note**: It’s highly unlikely that you want to pass this, because
*   > hast is not for XML, and HTML will not add more void elements.
*
* @typedef {'"' | "'"} Quote
*   HTML quotes for attribute values.
*
* @typedef {Omit<Required<{[key in keyof Options]: Exclude<Options[key], null | undefined>}>, 'space' | 'quote'>} Settings
*
* @typedef {'html' | 'svg'} Space
*   Namespace.
*
* @typedef State
*   Info passed around about the current state.
* @property {(node: Parents | undefined) => string} all
*   Serialize the children of a parent node.
* @property {Quote} alternative
*   Alternative quote.
* @property {(node: Nodes, index: number | undefined, parent: Parents | undefined) => string} one
*   Serialize one node.
* @property {Quote} quote
*   Preferred quote.
* @property {Schema} schema
*   Current schema.
* @property {Settings} settings
*   User configuration.
*/
/** @type {Options} */
var emptyOptions = {};
/** @type {CharacterReferences} */
var emptyCharacterReferences = {};
/** @type {Array<never>} */
var emptyChildren = [];
/**
* Serialize hast as HTML.
*
* @param {Array<RootContent> | Nodes} tree
*   Tree to serialize.
* @param {Options | null | undefined} [options]
*   Configuration (optional).
* @returns {string}
*   Serialized HTML.
*/
function toHtml(tree, options) {
	const options_ = options || emptyOptions;
	const quote = options_.quote || "\"";
	const alternative = quote === "\"" ? "'" : "\"";
	if (quote !== "\"" && quote !== "'") throw new Error("Invalid quote `" + quote + "`, expected `'` or `\"`");
	return {
		one,
		all,
		settings: {
			omitOptionalTags: options_.omitOptionalTags || false,
			allowParseErrors: options_.allowParseErrors || false,
			allowDangerousCharacters: options_.allowDangerousCharacters || false,
			quoteSmart: options_.quoteSmart || false,
			preferUnquoted: options_.preferUnquoted || false,
			tightAttributes: options_.tightAttributes || false,
			upperDoctype: options_.upperDoctype || false,
			tightDoctype: options_.tightDoctype || false,
			bogusComments: options_.bogusComments || false,
			tightCommaSeparatedLists: options_.tightCommaSeparatedLists || false,
			tightSelfClosing: options_.tightSelfClosing || false,
			collapseEmptyAttributes: options_.collapseEmptyAttributes || false,
			allowDangerousHtml: options_.allowDangerousHtml || false,
			voids: options_.voids || htmlVoidElements,
			characterReferences: options_.characterReferences || emptyCharacterReferences,
			closeSelfClosing: options_.closeSelfClosing || false,
			closeEmptyElements: options_.closeEmptyElements || false
		},
		schema: options_.space === "svg" ? svg : html$2,
		quote,
		alternative
	}.one(Array.isArray(tree) ? {
		type: "root",
		children: tree
	} : tree, void 0, void 0);
}
/**
* Serialize a node.
*
* @this {State}
*   Info passed around about the current state.
* @param {Nodes} node
*   Node to handle.
* @param {number | undefined} index
*   Index of `node` in `parent.
* @param {Parents | undefined} parent
*   Parent of `node`.
* @returns {string}
*   Serialized node.
*/
function one(node, index, parent) {
	return handle(node, index, parent, this);
}
/**
* Serialize all children of `parent`.
*
* @this {State}
*   Info passed around about the current state.
* @param {Parents | undefined} parent
*   Parent whose children to serialize.
* @returns {string}
*/
function all(parent) {
	/** @type {Array<string>} */
	const results = [];
	const children = parent && parent.children || emptyChildren;
	let index = -1;
	while (++index < children.length) results[index] = this.one(children[index], index, parent);
	return results.join("");
}
//#endregion
//#region node_modules/.pnpm/@shikijs+core@4.3.0/node_modules/@shikijs/core/dist/index.mjs
var RE_WHITESPACE = /\s+/g;
/**
* Utility to append class to a hast node
*
* If the `property.class` is a string, it will be splitted by space and converted to an array.
*/
function addClassToHast(node, className) {
	if (!className) return node;
	node.properties ||= {};
	node.properties.class ||= [];
	if (typeof node.properties.class === "string") node.properties.class = node.properties.class.split(RE_WHITESPACE);
	if (!Array.isArray(node.properties.class)) node.properties.class = [];
	const targets = Array.isArray(className) ? className : className.split(RE_WHITESPACE);
	for (const c of targets) if (c && !node.properties.class.includes(c)) node.properties.class.push(c);
	return node;
}
var RE_LANG_ATTR = /:?lang=["']([^"']+)["']/g;
var RE_CODE_FENCE = /(?:```|~~~)([\w-]+)/g;
var RE_LATEX_BEGIN = /\\begin\{([\w-]+)\}/g;
var RE_SCRIPT_LANG = /<script\s+(?:type|lang)=["']([^"']+)["']/gi;
/**
* Creates a converter between index and position in a code block.
*
* Overflow/underflow are unchecked.
*/
function createPositionConverter(code) {
	const lines = splitLines(code, true).map(([line]) => line);
	function indexToPos(index) {
		if (index === code.length) return {
			line: lines.length - 1,
			character: lines.at(-1).length
		};
		let character = index;
		let line = 0;
		for (const lineText of lines) {
			if (character < lineText.length) break;
			character -= lineText.length;
			line++;
		}
		return {
			line,
			character
		};
	}
	function posToIndex(line, character) {
		let index = 0;
		for (let i = 0; i < line; i++) index += lines[i].length;
		index += character;
		return index;
	}
	return {
		lines,
		indexToPos,
		posToIndex
	};
}
/**
* Guess embedded languages from given code and highlighter.
*
* When highlighter is provided, only bundled languages will be included.
*
* @param code - The code string to analyze
* @param _lang - The primary language of the code (currently unused)
* @param highlighter - Optional highlighter instance to validate languages
* @returns Array of detected language identifiers
*
* @example
* ```ts
* // Detects 'javascript' from Vue SFC
* guessEmbeddedLanguages('<script lang="javascript">')
*
* // Detects 'python' from markdown code block
* guessEmbeddedLanguages('```python\nprint("hi")\n```')
* ```
*/
function guessEmbeddedLanguages(code, _lang, highlighter) {
	const langs = /* @__PURE__ */ new Set();
	for (const match of code.matchAll(RE_LANG_ATTR)) {
		const lang = match[1].toLowerCase().trim();
		if (lang) langs.add(lang);
	}
	for (const match of code.matchAll(RE_CODE_FENCE)) {
		const lang = match[1].toLowerCase().trim();
		if (lang) langs.add(lang);
	}
	for (const match of code.matchAll(RE_LATEX_BEGIN)) {
		const lang = match[1].toLowerCase().trim();
		if (lang) langs.add(lang);
	}
	for (const match of code.matchAll(RE_SCRIPT_LANG)) {
		const fullType = match[1].toLowerCase().trim();
		const lang = fullType.includes("/") ? fullType.split("/").pop() : fullType;
		if (lang) langs.add(lang);
	}
	if (!highlighter) return [...langs];
	const bundle = highlighter.getBundledLanguages();
	return [...langs].filter((l) => l && bundle[l]);
}
var COLOR_KEYS = ["color", "background-color"];
/**
* Split a token into multiple tokens by given offsets.
*
* The offsets are relative to the token, and should be sorted.
*/
function splitToken(token, offsets) {
	let lastOffset = 0;
	const tokens = [];
	for (const offset of offsets) {
		if (offset > lastOffset) tokens.push({
			...token,
			content: token.content.slice(lastOffset, offset),
			offset: token.offset + lastOffset
		});
		lastOffset = offset;
	}
	if (lastOffset < token.content.length) tokens.push({
		...token,
		content: token.content.slice(lastOffset),
		offset: token.offset + lastOffset
	});
	return tokens;
}
/**
* Split 2D tokens array by given breakpoints.
*/
function splitTokens(tokens, breakpoints) {
	const sorted = [...breakpoints instanceof Set ? breakpoints : new Set(breakpoints)].sort((a, b) => a - b);
	if (!sorted.length) return tokens;
	return tokens.map((line) => {
		return line.flatMap((token) => {
			const breakpointsInToken = sorted.filter((i) => token.offset < i && i < token.offset + token.content.length).map((i) => i - token.offset).sort((a, b) => a - b);
			if (!breakpointsInToken.length) return token;
			return splitToken(token, breakpointsInToken);
		});
	});
}
function flatTokenVariants(merged, variantsOrder, cssVariablePrefix, defaultColor, colorsRendering = "css-vars") {
	const token = {
		content: merged.content,
		explanation: merged.explanation,
		offset: merged.offset
	};
	const styles = variantsOrder.map((t) => getTokenStyleObject(merged.variants[t]));
	const styleKeys = new Set(styles.flatMap((t) => Object.keys(t)));
	const mergedStyles = {};
	const varKey = (idx, key) => {
		const keyName = key === "color" ? "" : key === "background-color" ? "-bg" : `-${key}`;
		return cssVariablePrefix + variantsOrder[idx] + (key === "color" ? "" : keyName);
	};
	styles.forEach((cur, idx) => {
		for (const key of styleKeys) {
			const value = cur[key] || "inherit";
			if (idx === 0 && defaultColor && COLOR_KEYS.includes(key)) if (defaultColor === "light-dark()" && styles.length > 1) {
				const lightIndex = variantsOrder.findIndex((t) => t === "light");
				const darkIndex = variantsOrder.findIndex((t) => t === "dark");
				if (lightIndex === -1 || darkIndex === -1) throw new ShikiError("When using `defaultColor: \"light-dark()\"`, you must provide both `light` and `dark` themes");
				mergedStyles[key] = `light-dark(${styles[lightIndex][key] || "inherit"}, ${styles[darkIndex][key] || "inherit"})`;
				if (colorsRendering === "css-vars") mergedStyles[varKey(idx, key)] = value;
			} else mergedStyles[key] = value;
			else if (colorsRendering === "css-vars") mergedStyles[varKey(idx, key)] = value;
		}
	});
	token.htmlStyle = mergedStyles;
	return token;
}
function getTokenStyleObject(token) {
	const styles = {};
	if (token.color) styles.color = token.color;
	if (token.bgColor) styles["background-color"] = token.bgColor;
	if (token.fontStyle) {
		if (token.fontStyle & FontStyle.Italic) styles["font-style"] = "italic";
		if (token.fontStyle & FontStyle.Bold) styles["font-weight"] = "bold";
		const decorations = [];
		if (token.fontStyle & FontStyle.Underline) decorations.push("underline");
		if (token.fontStyle & FontStyle.Strikethrough) decorations.push("line-through");
		if (decorations.length) styles["text-decoration"] = decorations.join(" ");
	}
	return styles;
}
function stringifyTokenStyle(token) {
	if (typeof token === "string") return token;
	return Object.entries(token).map(([key, value]) => `${key}:${value}`).join(";");
}
/**
* A built-in transformer to add decorations to the highlighted code.
*/
function transformerDecorations() {
	const map = /* @__PURE__ */ new WeakMap();
	function getContext(shiki) {
		if (!map.has(shiki.meta)) {
			const converter = createPositionConverter(shiki.source);
			function normalizePosition(p) {
				if (typeof p === "number") {
					if (p < 0 || p > shiki.source.length) throw new ShikiError(`Invalid decoration offset: ${p}. Code length: ${shiki.source.length}`);
					return {
						...converter.indexToPos(p),
						offset: p
					};
				} else {
					const line = converter.lines[p.line];
					if (line === void 0) throw new ShikiError(`Invalid decoration position ${JSON.stringify(p)}. Lines length: ${converter.lines.length}`);
					let character = p.character;
					if (character < 0) character = line.length + character;
					if (character < 0 || character > line.length) throw new ShikiError(`Invalid decoration position ${JSON.stringify(p)}. Line ${p.line} length: ${line.length}`);
					return {
						...p,
						character,
						offset: converter.posToIndex(p.line, character)
					};
				}
			}
			const decorations = (shiki.options.decorations || []).map((d) => ({
				...d,
				start: normalizePosition(d.start),
				end: normalizePosition(d.end)
			}));
			verifyIntersections(decorations);
			map.set(shiki.meta, {
				decorations,
				converter,
				source: shiki.source
			});
		}
		return map.get(shiki.meta);
	}
	return {
		name: "shiki:decorations",
		tokens(tokens) {
			if (!this.options.decorations?.length) return;
			return splitTokens(tokens, getContext(this).decorations.flatMap((d) => [d.start.offset, d.end.offset]));
		},
		code(codeEl) {
			if (!this.options.decorations?.length) return;
			const ctx = getContext(this);
			const lines = [...codeEl.children].filter((i) => i.type === "element" && i.tagName === "span");
			if (lines.length !== ctx.converter.lines.length) throw new ShikiError(`Number of lines in code element (${lines.length}) does not match the number of lines in the source (${ctx.converter.lines.length}). Failed to apply decorations.`);
			function applyLineSection(line, start, end, decoration) {
				const lineEl = lines[line];
				let text = "";
				let startIndex = -1;
				let endIndex = -1;
				if (start === 0) startIndex = 0;
				if (end === 0) endIndex = 0;
				if (end === Number.POSITIVE_INFINITY) endIndex = lineEl.children.length;
				if (startIndex === -1 || endIndex === -1) for (let i = 0; i < lineEl.children.length; i++) {
					text += stringify(lineEl.children[i]);
					if (startIndex === -1 && text.length === start) startIndex = i + 1;
					if (endIndex === -1 && text.length === end) endIndex = i + 1;
				}
				if (startIndex === -1) throw new ShikiError(`Failed to find start index for decoration ${JSON.stringify(decoration.start)}`);
				if (endIndex === -1) throw new ShikiError(`Failed to find end index for decoration ${JSON.stringify(decoration.end)}`);
				const children = lineEl.children.slice(startIndex, endIndex);
				if (!decoration.alwaysWrap && children.length === lineEl.children.length) applyDecoration(lineEl, decoration, "line");
				else if (!decoration.alwaysWrap && children.length === 1 && children[0].type === "element") applyDecoration(children[0], decoration, "token");
				else {
					const wrapper = {
						type: "element",
						tagName: "span",
						properties: {},
						children
					};
					applyDecoration(wrapper, decoration, "wrapper");
					lineEl.children.splice(startIndex, children.length, wrapper);
				}
			}
			function applyLine(line, decoration) {
				lines[line] = applyDecoration(lines[line], decoration, "line");
			}
			function applyDecoration(el, decoration, type) {
				const properties = decoration.properties || {};
				const transform = decoration.transform || ((i) => i);
				el.tagName = decoration.tagName || "span";
				el.properties = {
					...el.properties,
					...properties,
					class: el.properties.class
				};
				if (decoration.properties?.class) addClassToHast(el, decoration.properties.class);
				el = transform(el, type) || el;
				return el;
			}
			const lineApplies = [];
			const sorted = ctx.decorations.sort((a, b) => b.start.offset - a.start.offset || a.end.offset - b.end.offset);
			for (const decoration of sorted) {
				const { start, end } = decoration;
				if (start.line === end.line) applyLineSection(start.line, start.character, end.character, decoration);
				else if (start.line < end.line) {
					applyLineSection(start.line, start.character, Number.POSITIVE_INFINITY, decoration);
					for (let i = start.line + 1; i < end.line; i++) lineApplies.unshift(() => applyLine(i, decoration));
					applyLineSection(end.line, 0, end.character, decoration);
				}
			}
			lineApplies.forEach((i) => i());
		}
	};
}
function verifyIntersections(items) {
	for (let i = 0; i < items.length; i++) {
		const foo = items[i];
		if (foo.start.offset > foo.end.offset) throw new ShikiError(`Invalid decoration range: ${JSON.stringify(foo.start)} - ${JSON.stringify(foo.end)}`);
		for (let j = i + 1; j < items.length; j++) {
			const bar = items[j];
			const isFooHasBarStart = foo.start.offset <= bar.start.offset && bar.start.offset < foo.end.offset;
			const isFooHasBarEnd = foo.start.offset < bar.end.offset && bar.end.offset <= foo.end.offset;
			const isBarHasFooStart = bar.start.offset <= foo.start.offset && foo.start.offset < bar.end.offset;
			const isBarHasFooEnd = bar.start.offset < foo.end.offset && foo.end.offset <= bar.end.offset;
			if (isFooHasBarStart || isFooHasBarEnd || isBarHasFooStart || isBarHasFooEnd) {
				if (isFooHasBarStart && isFooHasBarEnd) continue;
				if (isBarHasFooStart && isBarHasFooEnd) continue;
				if (isBarHasFooStart && foo.start.offset === foo.end.offset) continue;
				if (isFooHasBarEnd && bar.start.offset === bar.end.offset) continue;
				throw new ShikiError(`Decorations ${JSON.stringify(foo.start)} and ${JSON.stringify(bar.start)} intersect.`);
			}
		}
	}
}
function stringify(el) {
	if (el.type === "text") return el.value;
	if (el.type === "element") return el.children.map(stringify).join("");
	return "";
}
var builtInTransformers = [/* @__PURE__ */ transformerDecorations()];
function getTransformers(options) {
	const transformers = sortTransformersByEnforcement(options.transformers || []);
	return [
		...transformers.pre,
		...transformers.normal,
		...transformers.post,
		...builtInTransformers
	];
}
function sortTransformersByEnforcement(transformers) {
	const pre = [];
	const post = [];
	const normal = [];
	for (const transformer of transformers) switch (transformer.enforce) {
		case "pre":
			pre.push(transformer);
			break;
		case "post":
			post.push(transformer);
			break;
		default: normal.push(transformer);
	}
	return {
		pre,
		post,
		normal
	};
}
var namedColors = [
	"black",
	"red",
	"green",
	"yellow",
	"blue",
	"magenta",
	"cyan",
	"white",
	"brightBlack",
	"brightRed",
	"brightGreen",
	"brightYellow",
	"brightBlue",
	"brightMagenta",
	"brightCyan",
	"brightWhite"
];
var decorations = {
	1: "bold",
	2: "dim",
	3: "italic",
	4: "underline",
	7: "reverse",
	8: "hidden",
	9: "strikethrough"
};
function findSequence(value, position) {
	const nextEscape = value.indexOf("\x1B", position);
	if (nextEscape !== -1) {
		if (value[nextEscape + 1] === "[") {
			const nextClose = value.indexOf("m", nextEscape);
			if (nextClose !== -1) return {
				sequence: value.substring(nextEscape + 2, nextClose).split(";"),
				startPosition: nextEscape,
				position: nextClose + 1
			};
		}
	}
	return { position: value.length };
}
function parseColor(sequence) {
	const colorMode = sequence.shift();
	if (colorMode === "2") {
		const rgb = sequence.splice(0, 3).map((x) => Number.parseInt(x));
		if (rgb.length !== 3 || rgb.some((x) => Number.isNaN(x))) return;
		return {
			type: "rgb",
			rgb
		};
	} else if (colorMode === "5") {
		const index = sequence.shift();
		if (index) return {
			type: "table",
			index: Number(index)
		};
	}
}
function parseSequence(sequence) {
	const commands = [];
	while (sequence.length > 0) {
		const code = sequence.shift();
		if (!code) continue;
		const codeInt = Number.parseInt(code);
		if (Number.isNaN(codeInt)) continue;
		if (codeInt === 0) commands.push({ type: "resetAll" });
		else if (codeInt <= 9) {
			if (decorations[codeInt]) commands.push({
				type: "setDecoration",
				value: decorations[codeInt]
			});
		} else if (codeInt <= 29) {
			const decoration = decorations[codeInt - 20];
			if (decoration) {
				commands.push({
					type: "resetDecoration",
					value: decoration
				});
				if (decoration === "dim") commands.push({
					type: "resetDecoration",
					value: "bold"
				});
			}
		} else if (codeInt <= 37) commands.push({
			type: "setForegroundColor",
			value: {
				type: "named",
				name: namedColors[codeInt - 30]
			}
		});
		else if (codeInt === 38) {
			const color = parseColor(sequence);
			if (color) commands.push({
				type: "setForegroundColor",
				value: color
			});
		} else if (codeInt === 39) commands.push({ type: "resetForegroundColor" });
		else if (codeInt <= 47) commands.push({
			type: "setBackgroundColor",
			value: {
				type: "named",
				name: namedColors[codeInt - 40]
			}
		});
		else if (codeInt === 48) {
			const color = parseColor(sequence);
			if (color) commands.push({
				type: "setBackgroundColor",
				value: color
			});
		} else if (codeInt === 49) commands.push({ type: "resetBackgroundColor" });
		else if (codeInt === 53) commands.push({
			type: "setDecoration",
			value: "overline"
		});
		else if (codeInt === 55) commands.push({
			type: "resetDecoration",
			value: "overline"
		});
		else if (codeInt >= 90 && codeInt <= 97) commands.push({
			type: "setForegroundColor",
			value: {
				type: "named",
				name: namedColors[codeInt - 90 + 8]
			}
		});
		else if (codeInt >= 100 && codeInt <= 107) commands.push({
			type: "setBackgroundColor",
			value: {
				type: "named",
				name: namedColors[codeInt - 100 + 8]
			}
		});
	}
	return commands;
}
function createAnsiSequenceParser() {
	let foreground = null;
	let background = null;
	let decorations2 = /* @__PURE__ */ new Set();
	return { parse(value) {
		const tokens = [];
		let position = 0;
		do {
			const findResult = findSequence(value, position);
			const text = findResult.sequence ? value.substring(position, findResult.startPosition) : value.substring(position);
			if (text.length > 0) tokens.push({
				value: text,
				foreground,
				background,
				decorations: new Set(decorations2)
			});
			if (findResult.sequence) {
				const commands = parseSequence(findResult.sequence);
				for (const styleToken of commands) if (styleToken.type === "resetAll") {
					foreground = null;
					background = null;
					decorations2.clear();
				} else if (styleToken.type === "resetForegroundColor") foreground = null;
				else if (styleToken.type === "resetBackgroundColor") background = null;
				else if (styleToken.type === "resetDecoration") decorations2.delete(styleToken.value);
				for (const styleToken of commands) if (styleToken.type === "setForegroundColor") foreground = styleToken.value;
				else if (styleToken.type === "setBackgroundColor") background = styleToken.value;
				else if (styleToken.type === "setDecoration") decorations2.add(styleToken.value);
			}
			position = findResult.position;
		} while (position < value.length);
		return tokens;
	} };
}
var defaultNamedColorsMap = {
	black: "#000000",
	red: "#bb0000",
	green: "#00bb00",
	yellow: "#bbbb00",
	blue: "#0000bb",
	magenta: "#ff00ff",
	cyan: "#00bbbb",
	white: "#eeeeee",
	brightBlack: "#555555",
	brightRed: "#ff5555",
	brightGreen: "#00ff00",
	brightYellow: "#ffff55",
	brightBlue: "#5555ff",
	brightMagenta: "#ff55ff",
	brightCyan: "#55ffff",
	brightWhite: "#ffffff"
};
function createColorPalette(namedColorsMap = defaultNamedColorsMap) {
	function namedColor(name) {
		return namedColorsMap[name];
	}
	function rgbColor(rgb) {
		return `#${rgb.map((x) => Math.max(0, Math.min(x, 255)).toString(16).padStart(2, "0")).join("")}`;
	}
	let colorTable;
	function getColorTable() {
		if (colorTable) return colorTable;
		colorTable = [];
		for (let i = 0; i < namedColors.length; i++) colorTable.push(namedColor(namedColors[i]));
		let levels = [
			0,
			95,
			135,
			175,
			215,
			255
		];
		for (let r = 0; r < 6; r++) for (let g = 0; g < 6; g++) for (let b = 0; b < 6; b++) colorTable.push(rgbColor([
			levels[r],
			levels[g],
			levels[b]
		]));
		let level = 8;
		for (let i = 0; i < 24; i++, level += 10) colorTable.push(rgbColor([
			level,
			level,
			level
		]));
		return colorTable;
	}
	function tableColor(index) {
		return getColorTable()[index];
	}
	function value(color) {
		switch (color.type) {
			case "named": return namedColor(color.name);
			case "rgb": return rgbColor(color.rgb);
			case "table": return tableColor(color.index);
		}
	}
	return { value };
}
var RE_HEX_COLOR = /#([0-9a-f]{3,8})/i;
var RE_CSS_VAR_ANSI = /var\((--[\w-]+-ansi-[\w-]+)\)/;
/**
* Default ANSI palette (VSCode compatible fallbacks)
* Used when the theme does not define terminal.ansi* colors.
*/
var defaultAnsiColors = {
	black: "#000000",
	red: "#cd3131",
	green: "#0DBC79",
	yellow: "#E5E510",
	blue: "#2472C8",
	magenta: "#BC3FBC",
	cyan: "#11A8CD",
	white: "#E5E5E5",
	brightBlack: "#666666",
	brightRed: "#F14C4C",
	brightGreen: "#23D18B",
	brightYellow: "#F5F543",
	brightBlue: "#3B8EEA",
	brightMagenta: "#D670D6",
	brightCyan: "#29B8DB",
	brightWhite: "#FFFFFF"
};
function tokenizeAnsiWithTheme(theme, fileContents, options) {
	const colorReplacements = resolveColorReplacements(theme, options);
	const lines = splitLines(fileContents);
	const colorPalette = createColorPalette(Object.fromEntries(namedColors.map((name) => {
		const key = `terminal.ansi${name[0].toUpperCase()}${name.substring(1)}`;
		return [name, theme.colors?.[key] || defaultAnsiColors[name]];
	})));
	const parser = createAnsiSequenceParser();
	return lines.map((line) => parser.parse(line[0]).map((token) => {
		let color;
		let bgColor;
		if (token.decorations.has("reverse")) {
			color = token.background ? colorPalette.value(token.background) : theme.bg;
			bgColor = token.foreground ? colorPalette.value(token.foreground) : theme.fg;
		} else {
			color = token.foreground ? colorPalette.value(token.foreground) : theme.fg;
			bgColor = token.background ? colorPalette.value(token.background) : void 0;
		}
		color = applyColorReplacements(color, colorReplacements);
		bgColor = applyColorReplacements(bgColor, colorReplacements);
		if (token.decorations.has("dim")) color = dimColor(color);
		let fontStyle = FontStyle.None;
		if (token.decorations.has("bold")) fontStyle |= FontStyle.Bold;
		if (token.decorations.has("italic")) fontStyle |= FontStyle.Italic;
		if (token.decorations.has("underline")) fontStyle |= FontStyle.Underline;
		if (token.decorations.has("strikethrough")) fontStyle |= FontStyle.Strikethrough;
		return {
			content: token.value,
			offset: line[1],
			color,
			bgColor,
			fontStyle
		};
	}));
}
/**
* Adds 50% alpha to a hex color string or the "-dim" postfix to a CSS variable
*/
function dimColor(color) {
	const hexMatch = color.match(RE_HEX_COLOR);
	if (hexMatch) {
		const hex = hexMatch[1];
		if (hex.length === 8) {
			const alpha = Math.round(Number.parseInt(hex.slice(6, 8), 16) / 2).toString(16).padStart(2, "0");
			return `#${hex.slice(0, 6)}${alpha}`;
		} else if (hex.length === 6) return `#${hex}80`;
		else if (hex.length === 4) {
			const r = hex[0];
			const g = hex[1];
			const b = hex[2];
			const a = hex[3];
			return `#${r}${r}${g}${g}${b}${b}${Math.round(Number.parseInt(`${a}${a}`, 16) / 2).toString(16).padStart(2, "0")}`;
		} else if (hex.length === 3) {
			const r = hex[0];
			const g = hex[1];
			const b = hex[2];
			return `#${r}${r}${g}${g}${b}${b}80`;
		}
	}
	const cssVarMatch = color.match(RE_CSS_VAR_ANSI);
	if (cssVarMatch) return `var(${cssVarMatch[1]}-dim)`;
	return color;
}
/**
* Code to tokens, with a simple theme.
* This wraps the tokenizer's implementation to add ANSI support.
*/
function codeToTokensBase(primitive, code, options = {}) {
	const lang = primitive.resolveLangAlias(options.lang || "text");
	const { theme: themeName = primitive.getLoadedThemes()[0] } = options;
	if (!isPlainLang(lang) && !isNoneTheme(themeName) && lang === "ansi") {
		const { theme } = primitive.setTheme(themeName);
		return tokenizeAnsiWithTheme(theme, code, options);
	}
	return codeToTokensBase$1(primitive, code, options);
}
/**
* High-level code-to-tokens API.
*
* It will use `codeToTokensWithThemes` or `codeToTokensBase` based on the options.
*/
function codeToTokens(primitive, code, options) {
	let bg;
	let fg;
	let tokens;
	let themeName;
	let rootStyle;
	let grammarState;
	if ("themes" in options) {
		const { defaultColor = "light", cssVariablePrefix = "--shiki-", colorsRendering = "css-vars" } = options;
		const themes = Object.entries(options.themes).filter((i) => i[1]).map((i) => ({
			color: i[0],
			theme: i[1]
		})).sort((a, b) => a.color === defaultColor ? -1 : b.color === defaultColor ? 1 : 0);
		if (themes.length === 0) throw new ShikiError("`themes` option must not be empty");
		const themeTokens = codeToTokensWithThemes(primitive, code, options, codeToTokensBase);
		grammarState = getLastGrammarStateFromMap(themeTokens);
		if (defaultColor && "light-dark()" !== defaultColor && !themes.some((t) => t.color === defaultColor)) throw new ShikiError(`\`themes\` option must contain the defaultColor key \`${defaultColor}\``);
		const themeRegs = themes.map((t) => primitive.getTheme(t.theme));
		const themesOrder = themes.map((t) => t.color);
		tokens = themeTokens.map((line) => line.map((token) => flatTokenVariants(token, themesOrder, cssVariablePrefix, defaultColor, colorsRendering)));
		if (grammarState) setLastGrammarStateToMap(tokens, grammarState);
		const themeColorReplacements = themes.map((t) => resolveColorReplacements(t.theme, options));
		fg = mapThemeColors(themes, themeRegs, themeColorReplacements, cssVariablePrefix, defaultColor, "fg", colorsRendering);
		bg = mapThemeColors(themes, themeRegs, themeColorReplacements, cssVariablePrefix, defaultColor, "bg", colorsRendering);
		themeName = `shiki-themes ${themeRegs.map((t) => t.name).join(" ")}`;
		rootStyle = defaultColor ? void 0 : [fg, bg].join(";");
	} else if ("theme" in options) {
		const colorReplacements = resolveColorReplacements(options.theme, options);
		tokens = codeToTokensBase(primitive, code, options);
		const _theme = primitive.getTheme(options.theme);
		bg = applyColorReplacements(_theme.bg, colorReplacements);
		fg = applyColorReplacements(_theme.fg, colorReplacements);
		themeName = _theme.name;
		grammarState = getLastGrammarStateFromMap(tokens);
	} else throw new ShikiError("Invalid options, either `theme` or `themes` must be provided");
	return {
		tokens,
		fg,
		bg,
		themeName,
		rootStyle,
		grammarState
	};
}
function mapThemeColors(themes, themeRegs, themeColorReplacements, cssVariablePrefix, defaultColor, property, colorsRendering) {
	return themes.map((t, idx) => {
		const value = applyColorReplacements(themeRegs[idx][property], themeColorReplacements[idx]) || "inherit";
		const cssVar = `${cssVariablePrefix + t.color}${property === "bg" ? "-bg" : ""}:${value}`;
		if (idx === 0 && defaultColor) {
			if (defaultColor === "light-dark()" && themes.length > 1) {
				const lightIndex = themes.findIndex((t) => t.color === "light");
				const darkIndex = themes.findIndex((t) => t.color === "dark");
				if (lightIndex === -1 || darkIndex === -1) throw new ShikiError("When using `defaultColor: \"light-dark()\"`, you must provide both `light` and `dark` themes");
				return `light-dark(${applyColorReplacements(themeRegs[lightIndex][property], themeColorReplacements[lightIndex]) || "inherit"}, ${applyColorReplacements(themeRegs[darkIndex][property], themeColorReplacements[darkIndex]) || "inherit"});${cssVar}`;
			}
			return value;
		}
		if (colorsRendering === "css-vars") return cssVar;
		return null;
	}).filter((i) => !!i).join(";");
}
var RE_WHITESPACE_ONLY = /^\s+$/;
var RE_LEADING_TRAILING_WHITESPACE = /^(\s*)(.*?)(\s*)$/;
function codeToHast(primitive, code, options, transformerContext = {
	meta: {},
	options,
	codeToHast: (_code, _options) => codeToHast(primitive, _code, _options),
	codeToTokens: (_code, _options) => codeToTokens(primitive, _code, _options)
}) {
	let input = code;
	for (const transformer of getTransformers(options)) input = transformer.preprocess?.call(transformerContext, input, options) || input;
	let { tokens, fg, bg, themeName, rootStyle, grammarState } = codeToTokens(primitive, input, options);
	const { mergeWhitespaces = true, mergeSameStyleTokens = false } = options;
	if (mergeWhitespaces === true) tokens = mergeWhitespaceTokens(tokens);
	else if (mergeWhitespaces === "never") tokens = splitWhitespaceTokens(tokens);
	if (mergeSameStyleTokens) tokens = mergeAdjacentStyledTokens(tokens);
	const contextSource = {
		...transformerContext,
		get source() {
			return input;
		}
	};
	for (const transformer of getTransformers(options)) tokens = transformer.tokens?.call(contextSource, tokens) || tokens;
	return tokensToHast(tokens, {
		...options,
		fg,
		bg,
		themeName,
		rootStyle: options.rootStyle === false ? false : options.rootStyle ?? rootStyle
	}, contextSource, grammarState);
}
function tokensToHast(tokens, options, transformerContext, grammarState = getLastGrammarStateFromMap(tokens)) {
	const transformers = getTransformers(options);
	const lines = [];
	const root = {
		type: "root",
		children: []
	};
	const { structure = "classic", tabindex = "0" } = options;
	const properties = { class: `shiki ${options.themeName || ""}` };
	if (options.rootStyle !== false) if (options.rootStyle != null) properties.style = options.rootStyle;
	else properties.style = `background-color:${options.bg};color:${options.fg}`;
	if (tabindex !== false && tabindex != null) properties.tabindex = tabindex.toString();
	for (const [key, value] of Object.entries(options.meta || {})) if (!key.startsWith("_")) properties[key] = value;
	let preNode = {
		type: "element",
		tagName: "pre",
		properties,
		children: [],
		data: options.data
	};
	let codeNode = {
		type: "element",
		tagName: "code",
		properties: {},
		children: lines
	};
	const lineNodes = [];
	const context = {
		...transformerContext,
		structure,
		addClassToHast,
		get source() {
			return transformerContext.source;
		},
		get tokens() {
			return tokens;
		},
		get options() {
			return options;
		},
		get root() {
			return root;
		},
		get pre() {
			return preNode;
		},
		get code() {
			return codeNode;
		},
		get lines() {
			return lineNodes;
		}
	};
	tokens.forEach((line, idx) => {
		if (idx) {
			if (structure === "inline") root.children.push({
				type: "element",
				tagName: "br",
				properties: {},
				children: []
			});
			else if (structure === "classic") lines.push({
				type: "text",
				value: "\n"
			});
		}
		let lineNode = {
			type: "element",
			tagName: "span",
			properties: { class: "line" },
			children: []
		};
		let col = 0;
		for (const token of line) {
			let tokenNode = {
				type: "element",
				tagName: "span",
				properties: { ...token.htmlAttrs },
				children: [{
					type: "text",
					value: token.content
				}]
			};
			const style = stringifyTokenStyle(token.htmlStyle || getTokenStyleObject(token));
			if (style) tokenNode.properties.style = style;
			for (const transformer of transformers) tokenNode = transformer?.span?.call(context, tokenNode, idx + 1, col, lineNode, token) || tokenNode;
			if (structure === "inline") root.children.push(tokenNode);
			else if (structure === "classic") lineNode.children.push(tokenNode);
			col += token.content.length;
		}
		if (structure === "classic") {
			for (const transformer of transformers) lineNode = transformer?.line?.call(context, lineNode, idx + 1) || lineNode;
			lineNodes.push(lineNode);
			lines.push(lineNode);
		} else if (structure === "inline") lineNodes.push(lineNode);
	});
	if (structure === "classic") {
		for (const transformer of transformers) codeNode = transformer?.code?.call(context, codeNode) || codeNode;
		preNode.children.push(codeNode);
		for (const transformer of transformers) preNode = transformer?.pre?.call(context, preNode) || preNode;
		root.children.push(preNode);
	} else if (structure === "inline") {
		const syntheticLines = [];
		let currentLine = {
			type: "element",
			tagName: "span",
			properties: { class: "line" },
			children: []
		};
		for (const child of root.children) if (child.type === "element" && child.tagName === "br") {
			syntheticLines.push(currentLine);
			currentLine = {
				type: "element",
				tagName: "span",
				properties: { class: "line" },
				children: []
			};
		} else if (child.type === "element" || child.type === "text") currentLine.children.push(child);
		syntheticLines.push(currentLine);
		let transformedCode = {
			type: "element",
			tagName: "code",
			properties: {},
			children: syntheticLines
		};
		for (const transformer of transformers) transformedCode = transformer?.code?.call(context, transformedCode) || transformedCode;
		root.children = [];
		for (let i = 0; i < transformedCode.children.length; i++) {
			if (i > 0) root.children.push({
				type: "element",
				tagName: "br",
				properties: {},
				children: []
			});
			const line = transformedCode.children[i];
			if (line.type === "element") root.children.push(...line.children);
		}
	}
	let result = root;
	for (const transformer of transformers) result = transformer?.root?.call(context, result) || result;
	if (grammarState) setLastGrammarStateToMap(result, grammarState);
	return result;
}
function mergeWhitespaceTokens(tokens) {
	return tokens.map((line) => {
		const newLine = [];
		let carryOnContent = "";
		let firstOffset;
		line.forEach((token, idx) => {
			const couldMerge = !(token.fontStyle && (token.fontStyle & FontStyle.Underline || token.fontStyle & FontStyle.Strikethrough));
			if (couldMerge && RE_WHITESPACE_ONLY.test(token.content) && line[idx + 1]) {
				if (firstOffset === void 0) firstOffset = token.offset;
				carryOnContent += token.content;
			} else if (carryOnContent) {
				if (couldMerge) newLine.push({
					...token,
					offset: firstOffset,
					content: carryOnContent + token.content
				});
				else newLine.push({
					content: carryOnContent,
					offset: firstOffset
				}, token);
				firstOffset = void 0;
				carryOnContent = "";
			} else newLine.push(token);
		});
		return newLine;
	});
}
function splitWhitespaceTokens(tokens) {
	return tokens.map((line) => {
		return line.flatMap((token) => {
			if (RE_WHITESPACE_ONLY.test(token.content)) return token;
			const match = token.content.match(RE_LEADING_TRAILING_WHITESPACE);
			if (!match) return token;
			const [, leading, content, trailing] = match;
			if (!leading && !trailing) return token;
			const expanded = [{
				...token,
				offset: token.offset + leading.length,
				content
			}];
			if (leading) expanded.unshift({
				content: leading,
				offset: token.offset
			});
			if (trailing) expanded.push({
				content: trailing,
				offset: token.offset + leading.length + content.length
			});
			return expanded;
		});
	});
}
function mergeAdjacentStyledTokens(tokens) {
	return tokens.map((line) => {
		const newLine = [];
		for (const token of line) {
			if (newLine.length === 0) {
				newLine.push({ ...token });
				continue;
			}
			const prevToken = newLine.at(-1);
			const prevStyle = stringifyTokenStyle(prevToken.htmlStyle || getTokenStyleObject(prevToken));
			const currentStyle = stringifyTokenStyle(token.htmlStyle || getTokenStyleObject(token));
			const isPrevDecorated = prevToken.fontStyle && (prevToken.fontStyle & FontStyle.Underline || prevToken.fontStyle & FontStyle.Strikethrough);
			const isDecorated = token.fontStyle && (token.fontStyle & FontStyle.Underline || token.fontStyle & FontStyle.Strikethrough);
			if (!isPrevDecorated && !isDecorated && prevStyle === currentStyle) prevToken.content += token.content;
			else newLine.push({ ...token });
		}
		return newLine;
	});
}
var hastToHtml = toHtml;
/**
* Get highlighted code in HTML.
*/
function codeToHtml(primitive, code, options) {
	const context = {
		meta: {},
		options,
		codeToHast: (_code, _options) => codeToHast(primitive, _code, _options),
		codeToTokens: (_code, _options) => codeToTokens(primitive, _code, _options)
	};
	let result = hastToHtml(codeToHast(primitive, code, options, context));
	for (const transformer of getTransformers(options)) result = transformer.postprocess?.call(context, result, options) || result;
	return result;
}
/**
* Create a Shiki core highlighter instance, with no languages or themes bundled.
* Wasm and each language and theme must be loaded manually.
*
* @see http://shiki.style/guide/bundles#fine-grained-bundle
*/
async function createHighlighterCore(options) {
	const primitive = await createShikiPrimitiveAsync(options);
	return {
		getLastGrammarState: (...args) => getLastGrammarState(primitive, ...args),
		codeToTokensBase: (code, options) => codeToTokensBase(primitive, code, options),
		codeToTokensWithThemes: (code, options) => codeToTokensWithThemes(primitive, code, options),
		codeToTokens: (code, options) => codeToTokens(primitive, code, options),
		codeToHast: (code, options) => codeToHast(primitive, code, options),
		codeToHtml: (code, options) => codeToHtml(primitive, code, options),
		getBundledLanguages: () => ({}),
		getBundledThemes: () => ({}),
		...primitive,
		getInternalContext: () => primitive
	};
}
/**
* Create a Shiki core highlighter instance, with no languages or themes bundled.
* Wasm and each language and theme must be loaded manually.
*
* Synchronous version of `createHighlighterCore`, which requires to provide the engine and all themes and languages upfront.
*
* @see http://shiki.style/guide/bundles#fine-grained-bundle
*/
function createHighlighterCoreSync(options) {
	const internal = createShikiPrimitive(options);
	return {
		getLastGrammarState: (...args) => getLastGrammarState(internal, ...args),
		codeToTokensBase: (code, options) => codeToTokensBase(internal, code, options),
		codeToTokensWithThemes: (code, options) => codeToTokensWithThemes(internal, code, options),
		codeToTokens: (code, options) => codeToTokens(internal, code, options),
		codeToHast: (code, options) => codeToHast(internal, code, options),
		codeToHtml: (code, options) => codeToHtml(internal, code, options),
		getBundledLanguages: () => ({}),
		getBundledThemes: () => ({}),
		...internal,
		getInternalContext: () => internal
	};
}
function makeSingletonHighlighterCore(createHighlighter) {
	let _shiki;
	async function getSingletonHighlighterCore(options) {
		if (!_shiki) {
			_shiki = createHighlighter({
				...options,
				themes: options.themes || [],
				langs: options.langs || []
			});
			return _shiki;
		} else {
			const s = await _shiki;
			await Promise.all([s.loadTheme(...options.themes || []), s.loadLanguage(...options.langs || [])]);
			return s;
		}
	}
	return getSingletonHighlighterCore;
}
var getSingletonHighlighterCore = /* @__PURE__ */ makeSingletonHighlighterCore(createHighlighterCore);
function createBundledHighlighter(options) {
	const bundledLanguages = options.langs;
	const bundledThemes = options.themes;
	const engine = options.engine;
	async function createHighlighter(options) {
		function resolveLang(lang) {
			if (typeof lang === "string") {
				lang = options.langAlias?.[lang] || lang;
				if (isSpecialLang(lang)) return [];
				const bundle = bundledLanguages[lang];
				if (!bundle) throw new ShikiError(`Language \`${lang}\` is not included in this bundle. You may want to load it from external source.`);
				return bundle;
			}
			return lang;
		}
		function resolveTheme(theme) {
			if (isSpecialTheme(theme)) return "none";
			if (typeof theme === "string") {
				const bundle = bundledThemes[theme];
				if (!bundle) throw new ShikiError(`Theme \`${theme}\` is not included in this bundle. You may want to load it from external source.`);
				return bundle;
			}
			return theme;
		}
		const _themes = (options.themes ?? []).map((i) => resolveTheme(i));
		const langs = (options.langs ?? []).map((i) => resolveLang(i));
		const core = await createHighlighterCore({
			engine: options.engine ?? engine(),
			...options,
			themes: _themes,
			langs
		});
		return {
			...core,
			loadLanguage(...langs) {
				return core.loadLanguage(...langs.map(resolveLang));
			},
			loadTheme(...themes) {
				return core.loadTheme(...themes.map(resolveTheme));
			},
			getBundledLanguages() {
				return bundledLanguages;
			},
			getBundledThemes() {
				return bundledThemes;
			}
		};
	}
	return createHighlighter;
}
function makeSingletonHighlighter(createHighlighter) {
	let _shiki;
	async function getSingletonHighlighter(options = {}) {
		if (!_shiki) {
			_shiki = createHighlighter({
				...options,
				themes: [],
				langs: []
			});
			const s = await _shiki;
			await Promise.all([s.loadTheme(...options.themes || []), s.loadLanguage(...options.langs || [])]);
			return s;
		} else {
			const s = await _shiki;
			await Promise.all([s.loadTheme(...options.themes || []), s.loadLanguage(...options.langs || [])]);
			return s;
		}
	}
	return getSingletonHighlighter;
}
function createSingletonShorthands(createHighlighter, config) {
	const getSingletonHighlighter = makeSingletonHighlighter(createHighlighter);
	async function get(code, options) {
		const shiki = await getSingletonHighlighter({
			langs: [options.lang],
			themes: "theme" in options ? [options.theme] : Object.values(options.themes)
		});
		const langs = await config?.guessEmbeddedLanguages?.(code, options.lang, shiki);
		if (langs) await shiki.loadLanguage(...langs);
		return shiki;
	}
	return {
		getSingletonHighlighter(options) {
			return getSingletonHighlighter(options);
		},
		async codeToHtml(code, options) {
			return (await get(code, options)).codeToHtml(code, options);
		},
		async codeToHast(code, options) {
			return (await get(code, options)).codeToHast(code, options);
		},
		async codeToTokens(code, options) {
			return (await get(code, options)).codeToTokens(code, options);
		},
		async codeToTokensBase(code, options) {
			return (await get(code, options)).codeToTokensBase(code, options);
		},
		async codeToTokensWithThemes(code, options) {
			return (await get(code, options)).codeToTokensWithThemes(code, options);
		},
		async getLastGrammarState(code, options) {
			return (await getSingletonHighlighter({
				langs: [options.lang],
				themes: [options.theme]
			})).getLastGrammarState(code, options);
		}
	};
}
/**
* A factory function to create a css-variable-based theme
*
* @see https://shiki.style/guide/theme-colors#css-variables-theme
*/
function createCssVariablesTheme(options = {}) {
	const { name = "css-variables", variablePrefix = "--shiki-", fontStyle = true } = options;
	const variable = (name) => {
		if (options.variableDefaults?.[name]) return `var(${variablePrefix}${name}, ${options.variableDefaults[name]})`;
		return `var(${variablePrefix}${name})`;
	};
	const theme = {
		name,
		type: "dark",
		colors: {
			"editor.foreground": variable("foreground"),
			"editor.background": variable("background"),
			"terminal.ansiBlack": variable("ansi-black"),
			"terminal.ansiRed": variable("ansi-red"),
			"terminal.ansiGreen": variable("ansi-green"),
			"terminal.ansiYellow": variable("ansi-yellow"),
			"terminal.ansiBlue": variable("ansi-blue"),
			"terminal.ansiMagenta": variable("ansi-magenta"),
			"terminal.ansiCyan": variable("ansi-cyan"),
			"terminal.ansiWhite": variable("ansi-white"),
			"terminal.ansiBrightBlack": variable("ansi-bright-black"),
			"terminal.ansiBrightRed": variable("ansi-bright-red"),
			"terminal.ansiBrightGreen": variable("ansi-bright-green"),
			"terminal.ansiBrightYellow": variable("ansi-bright-yellow"),
			"terminal.ansiBrightBlue": variable("ansi-bright-blue"),
			"terminal.ansiBrightMagenta": variable("ansi-bright-magenta"),
			"terminal.ansiBrightCyan": variable("ansi-bright-cyan"),
			"terminal.ansiBrightWhite": variable("ansi-bright-white")
		},
		tokenColors: [
			{
				scope: [
					"keyword.operator.accessor",
					"meta.group.braces.round.function.arguments",
					"meta.template.expression",
					"markup.fenced_code meta.embedded.block"
				],
				settings: { foreground: variable("foreground") }
			},
			{
				scope: "emphasis",
				settings: { fontStyle: "italic" }
			},
			{
				scope: [
					"strong",
					"markup.heading.markdown",
					"markup.bold.markdown"
				],
				settings: { fontStyle: "bold" }
			},
			{
				scope: ["markup.italic.markdown"],
				settings: { fontStyle: "italic" }
			},
			{
				scope: "meta.link.inline.markdown",
				settings: {
					fontStyle: "underline",
					foreground: variable("token-link")
				}
			},
			{
				scope: [
					"string",
					"markup.fenced_code",
					"markup.inline"
				],
				settings: { foreground: variable("token-string") }
			},
			{
				scope: ["comment", "string.quoted.docstring.multi"],
				settings: { foreground: variable("token-comment") }
			},
			{
				scope: [
					"constant.numeric",
					"constant.language",
					"constant.other.placeholder",
					"constant.character.format.placeholder",
					"variable.language.this",
					"variable.other.object",
					"variable.other.class",
					"variable.other.constant",
					"meta.property-name",
					"meta.property-value",
					"support"
				],
				settings: { foreground: variable("token-constant") }
			},
			{
				scope: [
					"keyword",
					"storage.modifier",
					"storage.type",
					"storage.control.clojure",
					"entity.name.function.clojure",
					"entity.name.tag.yaml",
					"support.function.node",
					"support.type.property-name.json",
					"punctuation.separator.key-value",
					"punctuation.definition.template-expression"
				],
				settings: { foreground: variable("token-keyword") }
			},
			{
				scope: "variable.parameter.function",
				settings: { foreground: variable("token-parameter") }
			},
			{
				scope: [
					"support.function",
					"entity.name.type",
					"entity.other.inherited-class",
					"meta.function-call",
					"meta.instance.constructor",
					"entity.other.attribute-name",
					"entity.name.function",
					"constant.keyword.clojure"
				],
				settings: { foreground: variable("token-function") }
			},
			{
				scope: [
					"entity.name.tag",
					"string.quoted",
					"string.regexp",
					"string.interpolated",
					"string.template",
					"string.unquoted.plain.out.yaml",
					"keyword.other.template"
				],
				settings: { foreground: variable("token-string-expression") }
			},
			{
				scope: [
					"punctuation.definition.arguments",
					"punctuation.definition.dict",
					"punctuation.separator",
					"meta.function-call.arguments"
				],
				settings: { foreground: variable("token-punctuation") }
			},
			{
				scope: ["markup.underline.link", "punctuation.definition.metadata.markdown"],
				settings: { foreground: variable("token-link") }
			},
			{
				scope: ["beginning.punctuation.definition.list.markdown"],
				settings: { foreground: variable("token-string") }
			},
			{
				scope: [
					"punctuation.definition.string.begin.markdown",
					"punctuation.definition.string.end.markdown",
					"string.other.link.title.markdown",
					"string.other.link.description.markdown"
				],
				settings: { foreground: variable("token-keyword") }
			},
			{
				scope: [
					"markup.inserted",
					"meta.diff.header.to-file",
					"punctuation.definition.inserted"
				],
				settings: { foreground: variable("token-inserted") }
			},
			{
				scope: [
					"markup.deleted",
					"meta.diff.header.from-file",
					"punctuation.definition.deleted"
				],
				settings: { foreground: variable("token-deleted") }
			},
			{
				scope: ["markup.changed", "punctuation.definition.changed"],
				settings: { foreground: variable("token-changed") }
			}
		]
	};
	if (!fontStyle) theme.tokenColors = theme.tokenColors?.map((tokenColor) => {
		if (tokenColor.settings?.fontStyle) delete tokenColor.settings.fontStyle;
		return tokenColor;
	});
	return theme;
}
//#endregion
export { ShikiError, addClassToHast, applyColorReplacements, codeToHast, codeToHtml, codeToTokens, codeToTokensBase, codeToTokensWithThemes, createBundledHighlighter, createCssVariablesTheme, createHighlighterCore, createHighlighterCoreSync, createPositionConverter, createShikiInternal, createShikiInternalSync, createShikiPrimitive, createShikiPrimitiveAsync, createSingletonShorthands, flatTokenVariants, getLastGrammarState, getSingletonHighlighterCore, getTokenStyleObject, guessEmbeddedLanguages, hastToHtml, isNoneTheme, isPlainLang, isSpecialLang, isSpecialTheme, makeSingletonHighlighter, makeSingletonHighlighterCore, normalizeGetter, normalizeTheme, resolveColorReplacements, splitLines, splitToken, splitTokens, stringifyTokenStyle, toArray, tokenizeAnsiWithTheme, tokenizeWithTheme, tokensToHast, transformerDecorations };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpa2lfY29yZS5qcyIsIm5hbWVzIjpbIm1hdGNoaW5nUnVsZSIsIlJlZ2lzdHJ5IiwiY29kZVRvVG9rZW5zQmFzZSIsInR5cGVzIiwiaHRtbCIsInN2ZyIsImh0bWwiLCJodG1sQmFzZSIsInN2Z0Jhc2UiLCJvd24iLCJvd24iLCJzdHJpbmdpZnkiLCJzdHJpbmdpZnkiLCJlbXB0eUNoaWxkcmVuIiwiaHRtbCIsImJvZHkiLCJ0Ym9keSIsImNvbW1hcyIsInNwYWNlcyIsIm5vZGUiLCJodG1sIiwic3BsaXRMaW5lcyQxIiwiU2hpa2lFcnJvciQxIiwiY29kZVRvVG9rZW5zV2l0aFRoZW1lcyQxIiwiY3JlYXRlU2hpa2lQcmltaXRpdmVBc3luYyQxIiwiY3JlYXRlU2hpa2lQcmltaXRpdmUkMSJdLCJzb3VyY2VzIjpbIi4uLy4uLy5wbnBtL0BzaGlraWpzK3R5cGVzQDQuMy4wL25vZGVfbW9kdWxlcy9Ac2hpa2lqcy90eXBlcy9kaXN0L2luZGV4Lm1qcyIsIi4uLy4uLy5wbnBtL0BzaGlraWpzK3ZzY29kZS10ZXh0bWF0ZUAxMC4wLjIvbm9kZV9tb2R1bGVzL0BzaGlraWpzL3ZzY29kZS10ZXh0bWF0ZS9kaXN0L2luZGV4LmpzIiwiLi4vLi4vLnBucG0vQHNoaWtpanMrcHJpbWl0aXZlQDQuMy4wL25vZGVfbW9kdWxlcy9Ac2hpa2lqcy9wcmltaXRpdmUvZGlzdC9pbmRleC5tanMiLCIuLi8uLi8ucG5wbS9odG1sLXZvaWQtZWxlbWVudHNAMy4wLjAvbm9kZV9tb2R1bGVzL2h0bWwtdm9pZC1lbGVtZW50cy9pbmRleC5qcyIsIi4uLy4uLy5wbnBtL3Byb3BlcnR5LWluZm9ybWF0aW9uQDcuMi4wL25vZGVfbW9kdWxlcy9wcm9wZXJ0eS1pbmZvcm1hdGlvbi9saWIvdXRpbC9zY2hlbWEuanMiLCIuLi8uLi8ucG5wbS9wcm9wZXJ0eS1pbmZvcm1hdGlvbkA3LjIuMC9ub2RlX21vZHVsZXMvcHJvcGVydHktaW5mb3JtYXRpb24vbGliL3V0aWwvbWVyZ2UuanMiLCIuLi8uLi8ucG5wbS9wcm9wZXJ0eS1pbmZvcm1hdGlvbkA3LjIuMC9ub2RlX21vZHVsZXMvcHJvcGVydHktaW5mb3JtYXRpb24vbGliL25vcm1hbGl6ZS5qcyIsIi4uLy4uLy5wbnBtL3Byb3BlcnR5LWluZm9ybWF0aW9uQDcuMi4wL25vZGVfbW9kdWxlcy9wcm9wZXJ0eS1pbmZvcm1hdGlvbi9saWIvdXRpbC9pbmZvLmpzIiwiLi4vLi4vLnBucG0vcHJvcGVydHktaW5mb3JtYXRpb25ANy4yLjAvbm9kZV9tb2R1bGVzL3Byb3BlcnR5LWluZm9ybWF0aW9uL2xpYi91dGlsL3R5cGVzLmpzIiwiLi4vLi4vLnBucG0vcHJvcGVydHktaW5mb3JtYXRpb25ANy4yLjAvbm9kZV9tb2R1bGVzL3Byb3BlcnR5LWluZm9ybWF0aW9uL2xpYi91dGlsL2RlZmluZWQtaW5mby5qcyIsIi4uLy4uLy5wbnBtL3Byb3BlcnR5LWluZm9ybWF0aW9uQDcuMi4wL25vZGVfbW9kdWxlcy9wcm9wZXJ0eS1pbmZvcm1hdGlvbi9saWIvdXRpbC9jcmVhdGUuanMiLCIuLi8uLi8ucG5wbS9wcm9wZXJ0eS1pbmZvcm1hdGlvbkA3LjIuMC9ub2RlX21vZHVsZXMvcHJvcGVydHktaW5mb3JtYXRpb24vbGliL2FyaWEuanMiLCIuLi8uLi8ucG5wbS9wcm9wZXJ0eS1pbmZvcm1hdGlvbkA3LjIuMC9ub2RlX21vZHVsZXMvcHJvcGVydHktaW5mb3JtYXRpb24vbGliL3V0aWwvY2FzZS1zZW5zaXRpdmUtdHJhbnNmb3JtLmpzIiwiLi4vLi4vLnBucG0vcHJvcGVydHktaW5mb3JtYXRpb25ANy4yLjAvbm9kZV9tb2R1bGVzL3Byb3BlcnR5LWluZm9ybWF0aW9uL2xpYi91dGlsL2Nhc2UtaW5zZW5zaXRpdmUtdHJhbnNmb3JtLmpzIiwiLi4vLi4vLnBucG0vcHJvcGVydHktaW5mb3JtYXRpb25ANy4yLjAvbm9kZV9tb2R1bGVzL3Byb3BlcnR5LWluZm9ybWF0aW9uL2xpYi9odG1sLmpzIiwiLi4vLi4vLnBucG0vcHJvcGVydHktaW5mb3JtYXRpb25ANy4yLjAvbm9kZV9tb2R1bGVzL3Byb3BlcnR5LWluZm9ybWF0aW9uL2xpYi9zdmcuanMiLCIuLi8uLi8ucG5wbS9wcm9wZXJ0eS1pbmZvcm1hdGlvbkA3LjIuMC9ub2RlX21vZHVsZXMvcHJvcGVydHktaW5mb3JtYXRpb24vbGliL3hsaW5rLmpzIiwiLi4vLi4vLnBucG0vcHJvcGVydHktaW5mb3JtYXRpb25ANy4yLjAvbm9kZV9tb2R1bGVzL3Byb3BlcnR5LWluZm9ybWF0aW9uL2xpYi94bWxucy5qcyIsIi4uLy4uLy5wbnBtL3Byb3BlcnR5LWluZm9ybWF0aW9uQDcuMi4wL25vZGVfbW9kdWxlcy9wcm9wZXJ0eS1pbmZvcm1hdGlvbi9saWIveG1sLmpzIiwiLi4vLi4vLnBucG0vcHJvcGVydHktaW5mb3JtYXRpb25ANy4yLjAvbm9kZV9tb2R1bGVzL3Byb3BlcnR5LWluZm9ybWF0aW9uL2xpYi9maW5kLmpzIiwiLi4vLi4vLnBucG0vcHJvcGVydHktaW5mb3JtYXRpb25ANy4yLjAvbm9kZV9tb2R1bGVzL3Byb3BlcnR5LWluZm9ybWF0aW9uL2luZGV4LmpzIiwiLi4vLi4vLnBucG0vendpdGNoQDIuMC40L25vZGVfbW9kdWxlcy96d2l0Y2gvaW5kZXguanMiLCIuLi8uLi8ucG5wbS9zdHJpbmdpZnktZW50aXRpZXNANC4wLjQvbm9kZV9tb2R1bGVzL3N0cmluZ2lmeS1lbnRpdGllcy9saWIvY29yZS5qcyIsIi4uLy4uLy5wbnBtL3N0cmluZ2lmeS1lbnRpdGllc0A0LjAuNC9ub2RlX21vZHVsZXMvc3RyaW5naWZ5LWVudGl0aWVzL2xpYi91dGlsL3RvLWhleGFkZWNpbWFsLmpzIiwiLi4vLi4vLnBucG0vc3RyaW5naWZ5LWVudGl0aWVzQDQuMC40L25vZGVfbW9kdWxlcy9zdHJpbmdpZnktZW50aXRpZXMvbGliL3V0aWwvdG8tZGVjaW1hbC5qcyIsIi4uLy4uLy5wbnBtL2NoYXJhY3Rlci1lbnRpdGllcy1sZWdhY3lAMy4wLjAvbm9kZV9tb2R1bGVzL2NoYXJhY3Rlci1lbnRpdGllcy1sZWdhY3kvaW5kZXguanMiLCIuLi8uLi8ucG5wbS9jaGFyYWN0ZXItZW50aXRpZXMtaHRtbDRAMi4xLjAvbm9kZV9tb2R1bGVzL2NoYXJhY3Rlci1lbnRpdGllcy1odG1sNC9pbmRleC5qcyIsIi4uLy4uLy5wbnBtL3N0cmluZ2lmeS1lbnRpdGllc0A0LjAuNC9ub2RlX21vZHVsZXMvc3RyaW5naWZ5LWVudGl0aWVzL2xpYi9jb25zdGFudC9kYW5nZXJvdXMuanMiLCIuLi8uLi8ucG5wbS9zdHJpbmdpZnktZW50aXRpZXNANC4wLjQvbm9kZV9tb2R1bGVzL3N0cmluZ2lmeS1lbnRpdGllcy9saWIvdXRpbC90by1uYW1lZC5qcyIsIi4uLy4uLy5wbnBtL3N0cmluZ2lmeS1lbnRpdGllc0A0LjAuNC9ub2RlX21vZHVsZXMvc3RyaW5naWZ5LWVudGl0aWVzL2xpYi91dGlsL2Zvcm1hdC1zbWFydC5qcyIsIi4uLy4uLy5wbnBtL3N0cmluZ2lmeS1lbnRpdGllc0A0LjAuNC9ub2RlX21vZHVsZXMvc3RyaW5naWZ5LWVudGl0aWVzL2xpYi9pbmRleC5qcyIsIi4uLy4uLy5wbnBtL2hhc3QtdXRpbC10by1odG1sQDkuMC41L25vZGVfbW9kdWxlcy9oYXN0LXV0aWwtdG8taHRtbC9saWIvaGFuZGxlL2NvbW1lbnQuanMiLCIuLi8uLi8ucG5wbS9oYXN0LXV0aWwtdG8taHRtbEA5LjAuNS9ub2RlX21vZHVsZXMvaGFzdC11dGlsLXRvLWh0bWwvbGliL2hhbmRsZS9kb2N0eXBlLmpzIiwiLi4vLi4vLnBucG0vY2NvdW50QDIuMC4xL25vZGVfbW9kdWxlcy9jY291bnQvaW5kZXguanMiLCIuLi8uLi8ucG5wbS9jb21tYS1zZXBhcmF0ZWQtdG9rZW5zQDIuMC4zL25vZGVfbW9kdWxlcy9jb21tYS1zZXBhcmF0ZWQtdG9rZW5zL2luZGV4LmpzIiwiLi4vLi4vLnBucG0vc3BhY2Utc2VwYXJhdGVkLXRva2Vuc0AyLjAuMi9ub2RlX21vZHVsZXMvc3BhY2Utc2VwYXJhdGVkLXRva2Vucy9pbmRleC5qcyIsIi4uLy4uLy5wbnBtL2hhc3QtdXRpbC13aGl0ZXNwYWNlQDMuMC4wL25vZGVfbW9kdWxlcy9oYXN0LXV0aWwtd2hpdGVzcGFjZS9saWIvaW5kZXguanMiLCIuLi8uLi8ucG5wbS9oYXN0LXV0aWwtdG8taHRtbEA5LjAuNS9ub2RlX21vZHVsZXMvaGFzdC11dGlsLXRvLWh0bWwvbGliL29taXNzaW9uL3V0aWwvc2libGluZ3MuanMiLCIuLi8uLi8ucG5wbS9oYXN0LXV0aWwtdG8taHRtbEA5LjAuNS9ub2RlX21vZHVsZXMvaGFzdC11dGlsLXRvLWh0bWwvbGliL29taXNzaW9uL29taXNzaW9uLmpzIiwiLi4vLi4vLnBucG0vaGFzdC11dGlsLXRvLWh0bWxAOS4wLjUvbm9kZV9tb2R1bGVzL2hhc3QtdXRpbC10by1odG1sL2xpYi9vbWlzc2lvbi9jbG9zaW5nLmpzIiwiLi4vLi4vLnBucG0vaGFzdC11dGlsLXRvLWh0bWxAOS4wLjUvbm9kZV9tb2R1bGVzL2hhc3QtdXRpbC10by1odG1sL2xpYi9vbWlzc2lvbi9vcGVuaW5nLmpzIiwiLi4vLi4vLnBucG0vaGFzdC11dGlsLXRvLWh0bWxAOS4wLjUvbm9kZV9tb2R1bGVzL2hhc3QtdXRpbC10by1odG1sL2xpYi9oYW5kbGUvZWxlbWVudC5qcyIsIi4uLy4uLy5wbnBtL2hhc3QtdXRpbC10by1odG1sQDkuMC41L25vZGVfbW9kdWxlcy9oYXN0LXV0aWwtdG8taHRtbC9saWIvaGFuZGxlL3RleHQuanMiLCIuLi8uLi8ucG5wbS9oYXN0LXV0aWwtdG8taHRtbEA5LjAuNS9ub2RlX21vZHVsZXMvaGFzdC11dGlsLXRvLWh0bWwvbGliL2hhbmRsZS9yYXcuanMiLCIuLi8uLi8ucG5wbS9oYXN0LXV0aWwtdG8taHRtbEA5LjAuNS9ub2RlX21vZHVsZXMvaGFzdC11dGlsLXRvLWh0bWwvbGliL2hhbmRsZS9yb290LmpzIiwiLi4vLi4vLnBucG0vaGFzdC11dGlsLXRvLWh0bWxAOS4wLjUvbm9kZV9tb2R1bGVzL2hhc3QtdXRpbC10by1odG1sL2xpYi9oYW5kbGUvaW5kZXguanMiLCIuLi8uLi8ucG5wbS9oYXN0LXV0aWwtdG8taHRtbEA5LjAuNS9ub2RlX21vZHVsZXMvaGFzdC11dGlsLXRvLWh0bWwvbGliL2luZGV4LmpzIiwiLi4vLi4vLnBucG0vQHNoaWtpanMrY29yZUA0LjMuMC9ub2RlX21vZHVsZXMvQHNoaWtpanMvY29yZS9kaXN0L2luZGV4Lm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyNyZWdpb24gc3JjL2Vycm9yLnRzXG52YXIgU2hpa2lFcnJvciA9IGNsYXNzIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG5cdFx0c3VwZXIobWVzc2FnZSk7XG5cdFx0dGhpcy5uYW1lID0gXCJTaGlraUVycm9yXCI7XG5cdH1cbn07XG4vLyNlbmRyZWdpb25cbmV4cG9ydCB7IFNoaWtpRXJyb3IgfTtcbiIsIi8vIHNyYy91dGlscy50c1xuZnVuY3Rpb24gY2xvbmUoc29tZXRoaW5nKSB7XG4gIHJldHVybiBkb0Nsb25lKHNvbWV0aGluZyk7XG59XG5mdW5jdGlvbiBkb0Nsb25lKHNvbWV0aGluZykge1xuICBpZiAoQXJyYXkuaXNBcnJheShzb21ldGhpbmcpKSB7XG4gICAgcmV0dXJuIGNsb25lQXJyYXkoc29tZXRoaW5nKTtcbiAgfVxuICBpZiAoc29tZXRoaW5nIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgcmV0dXJuIHNvbWV0aGluZztcbiAgfVxuICBpZiAodHlwZW9mIHNvbWV0aGluZyA9PT0gXCJvYmplY3RcIikge1xuICAgIHJldHVybiBjbG9uZU9iaihzb21ldGhpbmcpO1xuICB9XG4gIHJldHVybiBzb21ldGhpbmc7XG59XG5mdW5jdGlvbiBjbG9uZUFycmF5KGFycikge1xuICBsZXQgciA9IFtdO1xuICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgcltpXSA9IGRvQ2xvbmUoYXJyW2ldKTtcbiAgfVxuICByZXR1cm4gcjtcbn1cbmZ1bmN0aW9uIGNsb25lT2JqKG9iaikge1xuICBsZXQgciA9IHt9O1xuICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgcltrZXldID0gZG9DbG9uZShvYmpba2V5XSk7XG4gIH1cbiAgcmV0dXJuIHI7XG59XG5mdW5jdGlvbiBtZXJnZU9iamVjdHModGFyZ2V0LCAuLi5zb3VyY2VzKSB7XG4gIHNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XG4gICAgZm9yIChsZXQga2V5IGluIHNvdXJjZSkge1xuICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuZnVuY3Rpb24gYmFzZW5hbWUocGF0aCkge1xuICBjb25zdCBpZHggPSB+cGF0aC5sYXN0SW5kZXhPZihcIi9cIikgfHwgfnBhdGgubGFzdEluZGV4T2YoXCJcXFxcXCIpO1xuICBpZiAoaWR4ID09PSAwKSB7XG4gICAgcmV0dXJuIHBhdGg7XG4gIH0gZWxzZSBpZiAofmlkeCA9PT0gcGF0aC5sZW5ndGggLSAxKSB7XG4gICAgcmV0dXJuIGJhc2VuYW1lKHBhdGguc3Vic3RyaW5nKDAsIHBhdGgubGVuZ3RoIC0gMSkpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBwYXRoLnN1YnN0cih+aWR4ICsgMSk7XG4gIH1cbn1cbnZhciBDQVBUVVJJTkdfUkVHRVhfU09VUkNFID0gL1xcJChcXGQrKXxcXCR7KFxcZCspOlxcLyhkb3duY2FzZXx1cGNhc2UpfS9nO1xudmFyIFJlZ2V4U291cmNlID0gY2xhc3Mge1xuICBzdGF0aWMgaGFzQ2FwdHVyZXMocmVnZXhTb3VyY2UpIHtcbiAgICBpZiAocmVnZXhTb3VyY2UgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgQ0FQVFVSSU5HX1JFR0VYX1NPVVJDRS5sYXN0SW5kZXggPSAwO1xuICAgIHJldHVybiBDQVBUVVJJTkdfUkVHRVhfU09VUkNFLnRlc3QocmVnZXhTb3VyY2UpO1xuICB9XG4gIHN0YXRpYyByZXBsYWNlQ2FwdHVyZXMocmVnZXhTb3VyY2UsIGNhcHR1cmVTb3VyY2UsIGNhcHR1cmVJbmRpY2VzKSB7XG4gICAgcmV0dXJuIHJlZ2V4U291cmNlLnJlcGxhY2UoQ0FQVFVSSU5HX1JFR0VYX1NPVVJDRSwgKG1hdGNoLCBpbmRleCwgY29tbWFuZEluZGV4LCBjb21tYW5kKSA9PiB7XG4gICAgICBsZXQgY2FwdHVyZSA9IGNhcHR1cmVJbmRpY2VzW3BhcnNlSW50KGluZGV4IHx8IGNvbW1hbmRJbmRleCwgMTApXTtcbiAgICAgIGlmIChjYXB0dXJlKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBjYXB0dXJlU291cmNlLnN1YnN0cmluZyhjYXB0dXJlLnN0YXJ0LCBjYXB0dXJlLmVuZCk7XG4gICAgICAgIHdoaWxlIChyZXN1bHRbMF0gPT09IFwiLlwiKSB7XG4gICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnN1YnN0cmluZygxKTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGNvbW1hbmQpIHtcbiAgICAgICAgICBjYXNlIFwiZG93bmNhc2VcIjpcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICBjYXNlIFwidXBjYXNlXCI6XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcbmZ1bmN0aW9uIHN0cmNtcChhLCBiKSB7XG4gIGlmIChhIDwgYikge1xuICAgIHJldHVybiAtMTtcbiAgfVxuICBpZiAoYSA+IGIpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICByZXR1cm4gMDtcbn1cbmZ1bmN0aW9uIHN0ckFyckNtcChhLCBiKSB7XG4gIGlmIChhID09PSBudWxsICYmIGIgPT09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBpZiAoIWEpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cbiAgaWYgKCFiKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgbGV0IGxlbjEgPSBhLmxlbmd0aDtcbiAgbGV0IGxlbjIgPSBiLmxlbmd0aDtcbiAgaWYgKGxlbjEgPT09IGxlbjIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjE7IGkrKykge1xuICAgICAgbGV0IHJlcyA9IHN0cmNtcChhW2ldLCBiW2ldKTtcbiAgICAgIGlmIChyZXMgIT09IDApIHtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgcmV0dXJuIGxlbjEgLSBsZW4yO1xufVxuZnVuY3Rpb24gaXNWYWxpZEhleENvbG9yKGhleCkge1xuICBpZiAoL14jWzAtOWEtZl17Nn0kL2kudGVzdChoZXgpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKC9eI1swLTlhLWZdezh9JC9pLnRlc3QoaGV4KSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICgvXiNbMC05YS1mXXszfSQvaS50ZXN0KGhleCkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoL14jWzAtOWEtZl17NH0kL2kudGVzdChoZXgpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gZXNjYXBlUmVnRXhwQ2hhcmFjdGVycyh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUucmVwbGFjZSgvW1xcLVxcXFxcXHtcXH1cXCpcXCtcXD9cXHxcXF5cXCRcXC5cXCxcXFtcXF1cXChcXClcXCNcXHNdL2csIFwiXFxcXCQmXCIpO1xufVxudmFyIENhY2hlZEZuID0gY2xhc3Mge1xuICBjb25zdHJ1Y3Rvcihmbikge1xuICAgIHRoaXMuZm4gPSBmbjtcbiAgfVxuICBjYWNoZSA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gIGdldChrZXkpIHtcbiAgICBpZiAodGhpcy5jYWNoZS5oYXMoa2V5KSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGUuZ2V0KGtleSk7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5mbihrZXkpO1xuICAgIHRoaXMuY2FjaGUuc2V0KGtleSwgdmFsdWUpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufTtcblxuLy8gc3JjL3RoZW1lLnRzXG52YXIgVGhlbWUgPSBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKF9jb2xvck1hcCwgX2RlZmF1bHRzLCBfcm9vdCkge1xuICAgIHRoaXMuX2NvbG9yTWFwID0gX2NvbG9yTWFwO1xuICAgIHRoaXMuX2RlZmF1bHRzID0gX2RlZmF1bHRzO1xuICAgIHRoaXMuX3Jvb3QgPSBfcm9vdDtcbiAgfVxuICBzdGF0aWMgY3JlYXRlRnJvbVJhd1RoZW1lKHNvdXJjZSwgY29sb3JNYXApIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVGcm9tUGFyc2VkVGhlbWUocGFyc2VUaGVtZShzb3VyY2UpLCBjb2xvck1hcCk7XG4gIH1cbiAgc3RhdGljIGNyZWF0ZUZyb21QYXJzZWRUaGVtZShzb3VyY2UsIGNvbG9yTWFwKSB7XG4gICAgcmV0dXJuIHJlc29sdmVQYXJzZWRUaGVtZVJ1bGVzKHNvdXJjZSwgY29sb3JNYXApO1xuICB9XG4gIF9jYWNoZWRNYXRjaFJvb3QgPSBuZXcgQ2FjaGVkRm4oXG4gICAgKHNjb3BlTmFtZSkgPT4gdGhpcy5fcm9vdC5tYXRjaChzY29wZU5hbWUpXG4gICk7XG4gIGdldENvbG9yTWFwKCkge1xuICAgIHJldHVybiB0aGlzLl9jb2xvck1hcC5nZXRDb2xvck1hcCgpO1xuICB9XG4gIGdldERlZmF1bHRzKCkge1xuICAgIHJldHVybiB0aGlzLl9kZWZhdWx0cztcbiAgfVxuICBtYXRjaChzY29wZVBhdGgpIHtcbiAgICBpZiAoc2NvcGVQYXRoID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdHM7XG4gICAgfVxuICAgIGNvbnN0IHNjb3BlTmFtZSA9IHNjb3BlUGF0aC5zY29wZU5hbWU7XG4gICAgY29uc3QgbWF0Y2hpbmdUcmllRWxlbWVudHMgPSB0aGlzLl9jYWNoZWRNYXRjaFJvb3QuZ2V0KHNjb3BlTmFtZSk7XG4gICAgY29uc3QgZWZmZWN0aXZlUnVsZSA9IG1hdGNoaW5nVHJpZUVsZW1lbnRzLmZpbmQoXG4gICAgICAodikgPT4gX3Njb3BlUGF0aE1hdGNoZXNQYXJlbnRTY29wZXMoc2NvcGVQYXRoLnBhcmVudCwgdi5wYXJlbnRTY29wZXMpXG4gICAgKTtcbiAgICBpZiAoIWVmZmVjdGl2ZVJ1bGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFN0eWxlQXR0cmlidXRlcyhcbiAgICAgIGVmZmVjdGl2ZVJ1bGUuZm9udFN0eWxlLFxuICAgICAgZWZmZWN0aXZlUnVsZS5mb3JlZ3JvdW5kLFxuICAgICAgZWZmZWN0aXZlUnVsZS5iYWNrZ3JvdW5kXG4gICAgKTtcbiAgfVxufTtcbnZhciBTY29wZVN0YWNrID0gY2xhc3MgX1Njb3BlU3RhY2sge1xuICBjb25zdHJ1Y3RvcihwYXJlbnQsIHNjb3BlTmFtZSkge1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuc2NvcGVOYW1lID0gc2NvcGVOYW1lO1xuICB9XG4gIHN0YXRpYyBwdXNoKHBhdGgsIHNjb3BlTmFtZXMpIHtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2Ygc2NvcGVOYW1lcykge1xuICAgICAgcGF0aCA9IG5ldyBfU2NvcGVTdGFjayhwYXRoLCBuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cbiAgc3RhdGljIGZyb20oLi4uc2VnbWVudHMpIHtcbiAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlZ21lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHQgPSBuZXcgX1Njb3BlU3RhY2socmVzdWx0LCBzZWdtZW50c1tpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgcHVzaChzY29wZU5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9TY29wZVN0YWNrKHRoaXMsIHNjb3BlTmFtZSk7XG4gIH1cbiAgZ2V0U2VnbWVudHMoKSB7XG4gICAgbGV0IGl0ZW0gPSB0aGlzO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIHdoaWxlIChpdGVtKSB7XG4gICAgICByZXN1bHQucHVzaChpdGVtLnNjb3BlTmFtZSk7XG4gICAgICBpdGVtID0gaXRlbS5wYXJlbnQ7XG4gICAgfVxuICAgIHJlc3VsdC5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRTZWdtZW50cygpLmpvaW4oXCIgXCIpO1xuICB9XG4gIGV4dGVuZHMob3RoZXIpIHtcbiAgICBpZiAodGhpcyA9PT0gb3RoZXIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYXJlbnQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucGFyZW50LmV4dGVuZHMob3RoZXIpO1xuICB9XG4gIGdldEV4dGVuc2lvbklmRGVmaW5lZChiYXNlKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgbGV0IGl0ZW0gPSB0aGlzO1xuICAgIHdoaWxlIChpdGVtICYmIGl0ZW0gIT09IGJhc2UpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGl0ZW0uc2NvcGVOYW1lKTtcbiAgICAgIGl0ZW0gPSBpdGVtLnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIGl0ZW0gPT09IGJhc2UgPyByZXN1bHQucmV2ZXJzZSgpIDogdm9pZCAwO1xuICB9XG59O1xuZnVuY3Rpb24gX3Njb3BlUGF0aE1hdGNoZXNQYXJlbnRTY29wZXMoc2NvcGVQYXRoLCBwYXJlbnRTY29wZXMpIHtcbiAgaWYgKHBhcmVudFNjb3Blcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcGFyZW50U2NvcGVzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgIGxldCBzY29wZVBhdHRlcm4gPSBwYXJlbnRTY29wZXNbaW5kZXhdO1xuICAgIGxldCBzY29wZU11c3RNYXRjaCA9IGZhbHNlO1xuICAgIGlmIChzY29wZVBhdHRlcm4gPT09IFwiPlwiKSB7XG4gICAgICBpZiAoaW5kZXggPT09IHBhcmVudFNjb3Blcy5sZW5ndGggLSAxKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHNjb3BlUGF0dGVybiA9IHBhcmVudFNjb3Blc1srK2luZGV4XTtcbiAgICAgIHNjb3BlTXVzdE1hdGNoID0gdHJ1ZTtcbiAgICB9XG4gICAgd2hpbGUgKHNjb3BlUGF0aCkge1xuICAgICAgaWYgKF9tYXRjaGVzU2NvcGUoc2NvcGVQYXRoLnNjb3BlTmFtZSwgc2NvcGVQYXR0ZXJuKSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChzY29wZU11c3RNYXRjaCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBzY29wZVBhdGggPSBzY29wZVBhdGgucGFyZW50O1xuICAgIH1cbiAgICBpZiAoIXNjb3BlUGF0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBzY29wZVBhdGggPSBzY29wZVBhdGgucGFyZW50O1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gX21hdGNoZXNTY29wZShzY29wZU5hbWUsIHNjb3BlUGF0dGVybikge1xuICByZXR1cm4gc2NvcGVQYXR0ZXJuID09PSBzY29wZU5hbWUgfHwgc2NvcGVOYW1lLnN0YXJ0c1dpdGgoc2NvcGVQYXR0ZXJuKSAmJiBzY29wZU5hbWVbc2NvcGVQYXR0ZXJuLmxlbmd0aF0gPT09IFwiLlwiO1xufVxudmFyIFN0eWxlQXR0cmlidXRlcyA9IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoZm9udFN0eWxlLCBmb3JlZ3JvdW5kSWQsIGJhY2tncm91bmRJZCkge1xuICAgIHRoaXMuZm9udFN0eWxlID0gZm9udFN0eWxlO1xuICAgIHRoaXMuZm9yZWdyb3VuZElkID0gZm9yZWdyb3VuZElkO1xuICAgIHRoaXMuYmFja2dyb3VuZElkID0gYmFja2dyb3VuZElkO1xuICB9XG59O1xuZnVuY3Rpb24gcGFyc2VUaGVtZShzb3VyY2UpIHtcbiAgaWYgKCFzb3VyY2UpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKCFzb3VyY2Uuc2V0dGluZ3MgfHwgIUFycmF5LmlzQXJyYXkoc291cmNlLnNldHRpbmdzKSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBsZXQgc2V0dGluZ3MgPSBzb3VyY2Uuc2V0dGluZ3M7XG4gIGxldCByZXN1bHQgPSBbXSwgcmVzdWx0TGVuID0gMDtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNldHRpbmdzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgbGV0IGVudHJ5ID0gc2V0dGluZ3NbaV07XG4gICAgaWYgKCFlbnRyeS5zZXR0aW5ncykge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGxldCBzY29wZXM7XG4gICAgaWYgKHR5cGVvZiBlbnRyeS5zY29wZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbGV0IF9zY29wZSA9IGVudHJ5LnNjb3BlO1xuICAgICAgX3Njb3BlID0gX3Njb3BlLnJlcGxhY2UoL15bLF0rLywgXCJcIik7XG4gICAgICBfc2NvcGUgPSBfc2NvcGUucmVwbGFjZSgvWyxdKyQvLCBcIlwiKTtcbiAgICAgIHNjb3BlcyA9IF9zY29wZS5zcGxpdChcIixcIik7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGVudHJ5LnNjb3BlKSkge1xuICAgICAgc2NvcGVzID0gZW50cnkuc2NvcGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNjb3BlcyA9IFtcIlwiXTtcbiAgICB9XG4gICAgbGV0IGZvbnRTdHlsZSA9IC0xIC8qIE5vdFNldCAqLztcbiAgICBpZiAodHlwZW9mIGVudHJ5LnNldHRpbmdzLmZvbnRTdHlsZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgZm9udFN0eWxlID0gMCAvKiBOb25lICovO1xuICAgICAgbGV0IHNlZ21lbnRzID0gZW50cnkuc2V0dGluZ3MuZm9udFN0eWxlLnNwbGl0KFwiIFwiKTtcbiAgICAgIGZvciAobGV0IGogPSAwLCBsZW5KID0gc2VnbWVudHMubGVuZ3RoOyBqIDwgbGVuSjsgaisrKSB7XG4gICAgICAgIGxldCBzZWdtZW50ID0gc2VnbWVudHNbal07XG4gICAgICAgIHN3aXRjaCAoc2VnbWVudCkge1xuICAgICAgICAgIGNhc2UgXCJpdGFsaWNcIjpcbiAgICAgICAgICAgIGZvbnRTdHlsZSA9IGZvbnRTdHlsZSB8IDEgLyogSXRhbGljICovO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcImJvbGRcIjpcbiAgICAgICAgICAgIGZvbnRTdHlsZSA9IGZvbnRTdHlsZSB8IDIgLyogQm9sZCAqLztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJ1bmRlcmxpbmVcIjpcbiAgICAgICAgICAgIGZvbnRTdHlsZSA9IGZvbnRTdHlsZSB8IDQgLyogVW5kZXJsaW5lICovO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcInN0cmlrZXRocm91Z2hcIjpcbiAgICAgICAgICAgIGZvbnRTdHlsZSA9IGZvbnRTdHlsZSB8IDggLyogU3RyaWtldGhyb3VnaCAqLztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBmb3JlZ3JvdW5kID0gbnVsbDtcbiAgICBpZiAodHlwZW9mIGVudHJ5LnNldHRpbmdzLmZvcmVncm91bmQgPT09IFwic3RyaW5nXCIgJiYgaXNWYWxpZEhleENvbG9yKGVudHJ5LnNldHRpbmdzLmZvcmVncm91bmQpKSB7XG4gICAgICBmb3JlZ3JvdW5kID0gZW50cnkuc2V0dGluZ3MuZm9yZWdyb3VuZDtcbiAgICB9XG4gICAgbGV0IGJhY2tncm91bmQgPSBudWxsO1xuICAgIGlmICh0eXBlb2YgZW50cnkuc2V0dGluZ3MuYmFja2dyb3VuZCA9PT0gXCJzdHJpbmdcIiAmJiBpc1ZhbGlkSGV4Q29sb3IoZW50cnkuc2V0dGluZ3MuYmFja2dyb3VuZCkpIHtcbiAgICAgIGJhY2tncm91bmQgPSBlbnRyeS5zZXR0aW5ncy5iYWNrZ3JvdW5kO1xuICAgIH1cbiAgICBmb3IgKGxldCBqID0gMCwgbGVuSiA9IHNjb3Blcy5sZW5ndGg7IGogPCBsZW5KOyBqKyspIHtcbiAgICAgIGxldCBfc2NvcGUgPSBzY29wZXNbal0udHJpbSgpO1xuICAgICAgbGV0IHNlZ21lbnRzID0gX3Njb3BlLnNwbGl0KFwiIFwiKTtcbiAgICAgIGxldCBzY29wZSA9IHNlZ21lbnRzW3NlZ21lbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgbGV0IHBhcmVudFNjb3BlcyA9IG51bGw7XG4gICAgICBpZiAoc2VnbWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBwYXJlbnRTY29wZXMgPSBzZWdtZW50cy5zbGljZSgwLCBzZWdtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgICAgcGFyZW50U2NvcGVzLnJldmVyc2UoKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdFtyZXN1bHRMZW4rK10gPSBuZXcgUGFyc2VkVGhlbWVSdWxlKFxuICAgICAgICBzY29wZSxcbiAgICAgICAgcGFyZW50U2NvcGVzLFxuICAgICAgICBpLFxuICAgICAgICBmb250U3R5bGUsXG4gICAgICAgIGZvcmVncm91bmQsXG4gICAgICAgIGJhY2tncm91bmRcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG52YXIgUGFyc2VkVGhlbWVSdWxlID0gY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihzY29wZSwgcGFyZW50U2NvcGVzLCBpbmRleCwgZm9udFN0eWxlLCBmb3JlZ3JvdW5kLCBiYWNrZ3JvdW5kKSB7XG4gICAgdGhpcy5zY29wZSA9IHNjb3BlO1xuICAgIHRoaXMucGFyZW50U2NvcGVzID0gcGFyZW50U2NvcGVzO1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLmZvbnRTdHlsZSA9IGZvbnRTdHlsZTtcbiAgICB0aGlzLmZvcmVncm91bmQgPSBmb3JlZ3JvdW5kO1xuICAgIHRoaXMuYmFja2dyb3VuZCA9IGJhY2tncm91bmQ7XG4gIH1cbn07XG52YXIgRm9udFN0eWxlID0gLyogQF9fUFVSRV9fICovICgoRm9udFN0eWxlMikgPT4ge1xuICBGb250U3R5bGUyW0ZvbnRTdHlsZTJbXCJOb3RTZXRcIl0gPSAtMV0gPSBcIk5vdFNldFwiO1xuICBGb250U3R5bGUyW0ZvbnRTdHlsZTJbXCJOb25lXCJdID0gMF0gPSBcIk5vbmVcIjtcbiAgRm9udFN0eWxlMltGb250U3R5bGUyW1wiSXRhbGljXCJdID0gMV0gPSBcIkl0YWxpY1wiO1xuICBGb250U3R5bGUyW0ZvbnRTdHlsZTJbXCJCb2xkXCJdID0gMl0gPSBcIkJvbGRcIjtcbiAgRm9udFN0eWxlMltGb250U3R5bGUyW1wiVW5kZXJsaW5lXCJdID0gNF0gPSBcIlVuZGVybGluZVwiO1xuICBGb250U3R5bGUyW0ZvbnRTdHlsZTJbXCJTdHJpa2V0aHJvdWdoXCJdID0gOF0gPSBcIlN0cmlrZXRocm91Z2hcIjtcbiAgcmV0dXJuIEZvbnRTdHlsZTI7XG59KShGb250U3R5bGUgfHwge30pO1xuZnVuY3Rpb24gcmVzb2x2ZVBhcnNlZFRoZW1lUnVsZXMocGFyc2VkVGhlbWVSdWxlcywgX2NvbG9yTWFwKSB7XG4gIHBhcnNlZFRoZW1lUnVsZXMuc29ydCgoYSwgYikgPT4ge1xuICAgIGxldCByID0gc3RyY21wKGEuc2NvcGUsIGIuc2NvcGUpO1xuICAgIGlmIChyICE9PSAwKSB7XG4gICAgICByZXR1cm4gcjtcbiAgICB9XG4gICAgciA9IHN0ckFyckNtcChhLnBhcmVudFNjb3BlcywgYi5wYXJlbnRTY29wZXMpO1xuICAgIGlmIChyICE9PSAwKSB7XG4gICAgICByZXR1cm4gcjtcbiAgICB9XG4gICAgcmV0dXJuIGEuaW5kZXggLSBiLmluZGV4O1xuICB9KTtcbiAgbGV0IGRlZmF1bHRGb250U3R5bGUgPSAwIC8qIE5vbmUgKi87XG4gIGxldCBkZWZhdWx0Rm9yZWdyb3VuZCA9IFwiIzAwMDAwMFwiO1xuICBsZXQgZGVmYXVsdEJhY2tncm91bmQgPSBcIiNmZmZmZmZcIjtcbiAgd2hpbGUgKHBhcnNlZFRoZW1lUnVsZXMubGVuZ3RoID49IDEgJiYgcGFyc2VkVGhlbWVSdWxlc1swXS5zY29wZSA9PT0gXCJcIikge1xuICAgIGxldCBpbmNvbWluZ0RlZmF1bHRzID0gcGFyc2VkVGhlbWVSdWxlcy5zaGlmdCgpO1xuICAgIGlmIChpbmNvbWluZ0RlZmF1bHRzLmZvbnRTdHlsZSAhPT0gLTEgLyogTm90U2V0ICovKSB7XG4gICAgICBkZWZhdWx0Rm9udFN0eWxlID0gaW5jb21pbmdEZWZhdWx0cy5mb250U3R5bGU7XG4gICAgfVxuICAgIGlmIChpbmNvbWluZ0RlZmF1bHRzLmZvcmVncm91bmQgIT09IG51bGwpIHtcbiAgICAgIGRlZmF1bHRGb3JlZ3JvdW5kID0gaW5jb21pbmdEZWZhdWx0cy5mb3JlZ3JvdW5kO1xuICAgIH1cbiAgICBpZiAoaW5jb21pbmdEZWZhdWx0cy5iYWNrZ3JvdW5kICE9PSBudWxsKSB7XG4gICAgICBkZWZhdWx0QmFja2dyb3VuZCA9IGluY29taW5nRGVmYXVsdHMuYmFja2dyb3VuZDtcbiAgICB9XG4gIH1cbiAgbGV0IGNvbG9yTWFwID0gbmV3IENvbG9yTWFwKF9jb2xvck1hcCk7XG4gIGxldCBkZWZhdWx0cyA9IG5ldyBTdHlsZUF0dHJpYnV0ZXMoZGVmYXVsdEZvbnRTdHlsZSwgY29sb3JNYXAuZ2V0SWQoZGVmYXVsdEZvcmVncm91bmQpLCBjb2xvck1hcC5nZXRJZChkZWZhdWx0QmFja2dyb3VuZCkpO1xuICBsZXQgcm9vdCA9IG5ldyBUaGVtZVRyaWVFbGVtZW50KG5ldyBUaGVtZVRyaWVFbGVtZW50UnVsZSgwLCBudWxsLCAtMSAvKiBOb3RTZXQgKi8sIDAsIDApLCBbXSk7XG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBwYXJzZWRUaGVtZVJ1bGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgbGV0IHJ1bGUgPSBwYXJzZWRUaGVtZVJ1bGVzW2ldO1xuICAgIHJvb3QuaW5zZXJ0KDAsIHJ1bGUuc2NvcGUsIHJ1bGUucGFyZW50U2NvcGVzLCBydWxlLmZvbnRTdHlsZSwgY29sb3JNYXAuZ2V0SWQocnVsZS5mb3JlZ3JvdW5kKSwgY29sb3JNYXAuZ2V0SWQocnVsZS5iYWNrZ3JvdW5kKSk7XG4gIH1cbiAgcmV0dXJuIG5ldyBUaGVtZShjb2xvck1hcCwgZGVmYXVsdHMsIHJvb3QpO1xufVxudmFyIENvbG9yTWFwID0gY2xhc3Mge1xuICBfaXNGcm96ZW47XG4gIF9sYXN0Q29sb3JJZDtcbiAgX2lkMmNvbG9yO1xuICBfY29sb3IyaWQ7XG4gIGNvbnN0cnVjdG9yKF9jb2xvck1hcCkge1xuICAgIHRoaXMuX2xhc3RDb2xvcklkID0gMDtcbiAgICB0aGlzLl9pZDJjb2xvciA9IFtdO1xuICAgIHRoaXMuX2NvbG9yMmlkID0gLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoX2NvbG9yTWFwKSkge1xuICAgICAgdGhpcy5faXNGcm96ZW4gPSB0cnVlO1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IF9jb2xvck1hcC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB0aGlzLl9jb2xvcjJpZFtfY29sb3JNYXBbaV1dID0gaTtcbiAgICAgICAgdGhpcy5faWQyY29sb3JbaV0gPSBfY29sb3JNYXBbaV07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2lzRnJvemVuID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGdldElkKGNvbG9yKSB7XG4gICAgaWYgKGNvbG9yID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgY29sb3IgPSBjb2xvci50b1VwcGVyQ2FzZSgpO1xuICAgIGxldCB2YWx1ZSA9IHRoaXMuX2NvbG9yMmlkW2NvbG9yXTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2lzRnJvemVuKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE1pc3NpbmcgY29sb3IgaW4gY29sb3IgbWFwIC0gJHtjb2xvcn1gKTtcbiAgICB9XG4gICAgdmFsdWUgPSArK3RoaXMuX2xhc3RDb2xvcklkO1xuICAgIHRoaXMuX2NvbG9yMmlkW2NvbG9yXSA9IHZhbHVlO1xuICAgIHRoaXMuX2lkMmNvbG9yW3ZhbHVlXSA9IGNvbG9yO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBnZXRDb2xvck1hcCgpIHtcbiAgICByZXR1cm4gdGhpcy5faWQyY29sb3Iuc2xpY2UoMCk7XG4gIH1cbn07XG52YXIgZW1wdHlQYXJlbnRTY29wZXMgPSBPYmplY3QuZnJlZXplKFtdKTtcbnZhciBUaGVtZVRyaWVFbGVtZW50UnVsZSA9IGNsYXNzIF9UaGVtZVRyaWVFbGVtZW50UnVsZSB7XG4gIHNjb3BlRGVwdGg7XG4gIHBhcmVudFNjb3BlcztcbiAgZm9udFN0eWxlO1xuICBmb3JlZ3JvdW5kO1xuICBiYWNrZ3JvdW5kO1xuICBjb25zdHJ1Y3RvcihzY29wZURlcHRoLCBwYXJlbnRTY29wZXMsIGZvbnRTdHlsZSwgZm9yZWdyb3VuZCwgYmFja2dyb3VuZCkge1xuICAgIHRoaXMuc2NvcGVEZXB0aCA9IHNjb3BlRGVwdGg7XG4gICAgdGhpcy5wYXJlbnRTY29wZXMgPSBwYXJlbnRTY29wZXMgfHwgZW1wdHlQYXJlbnRTY29wZXM7XG4gICAgdGhpcy5mb250U3R5bGUgPSBmb250U3R5bGU7XG4gICAgdGhpcy5mb3JlZ3JvdW5kID0gZm9yZWdyb3VuZDtcbiAgICB0aGlzLmJhY2tncm91bmQgPSBiYWNrZ3JvdW5kO1xuICB9XG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgX1RoZW1lVHJpZUVsZW1lbnRSdWxlKHRoaXMuc2NvcGVEZXB0aCwgdGhpcy5wYXJlbnRTY29wZXMsIHRoaXMuZm9udFN0eWxlLCB0aGlzLmZvcmVncm91bmQsIHRoaXMuYmFja2dyb3VuZCk7XG4gIH1cbiAgc3RhdGljIGNsb25lQXJyKGFycikge1xuICAgIGxldCByID0gW107XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgcltpXSA9IGFycltpXS5jbG9uZSgpO1xuICAgIH1cbiAgICByZXR1cm4gcjtcbiAgfVxuICBhY2NlcHRPdmVyd3JpdGUoc2NvcGVEZXB0aCwgZm9udFN0eWxlLCBmb3JlZ3JvdW5kLCBiYWNrZ3JvdW5kKSB7XG4gICAgaWYgKHRoaXMuc2NvcGVEZXB0aCA+IHNjb3BlRGVwdGgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiaG93IGRpZCB0aGlzIGhhcHBlbj9cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2NvcGVEZXB0aCA9IHNjb3BlRGVwdGg7XG4gICAgfVxuICAgIGlmIChmb250U3R5bGUgIT09IC0xIC8qIE5vdFNldCAqLykge1xuICAgICAgdGhpcy5mb250U3R5bGUgPSBmb250U3R5bGU7XG4gICAgfVxuICAgIGlmIChmb3JlZ3JvdW5kICE9PSAwKSB7XG4gICAgICB0aGlzLmZvcmVncm91bmQgPSBmb3JlZ3JvdW5kO1xuICAgIH1cbiAgICBpZiAoYmFja2dyb3VuZCAhPT0gMCkge1xuICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gYmFja2dyb3VuZDtcbiAgICB9XG4gIH1cbn07XG52YXIgVGhlbWVUcmllRWxlbWVudCA9IGNsYXNzIF9UaGVtZVRyaWVFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoX21haW5SdWxlLCBydWxlc1dpdGhQYXJlbnRTY29wZXMgPSBbXSwgX2NoaWxkcmVuID0ge30pIHtcbiAgICB0aGlzLl9tYWluUnVsZSA9IF9tYWluUnVsZTtcbiAgICB0aGlzLl9jaGlsZHJlbiA9IF9jaGlsZHJlbjtcbiAgICB0aGlzLl9ydWxlc1dpdGhQYXJlbnRTY29wZXMgPSBydWxlc1dpdGhQYXJlbnRTY29wZXM7XG4gIH1cbiAgX3J1bGVzV2l0aFBhcmVudFNjb3BlcztcbiAgc3RhdGljIF9jbXBCeVNwZWNpZmljaXR5KGEsIGIpIHtcbiAgICBpZiAoYS5zY29wZURlcHRoICE9PSBiLnNjb3BlRGVwdGgpIHtcbiAgICAgIHJldHVybiBiLnNjb3BlRGVwdGggLSBhLnNjb3BlRGVwdGg7XG4gICAgfVxuICAgIGxldCBhUGFyZW50SW5kZXggPSAwO1xuICAgIGxldCBiUGFyZW50SW5kZXggPSAwO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBpZiAoYS5wYXJlbnRTY29wZXNbYVBhcmVudEluZGV4XSA9PT0gXCI+XCIpIHtcbiAgICAgICAgYVBhcmVudEluZGV4Kys7XG4gICAgICB9XG4gICAgICBpZiAoYi5wYXJlbnRTY29wZXNbYlBhcmVudEluZGV4XSA9PT0gXCI+XCIpIHtcbiAgICAgICAgYlBhcmVudEluZGV4Kys7XG4gICAgICB9XG4gICAgICBpZiAoYVBhcmVudEluZGV4ID49IGEucGFyZW50U2NvcGVzLmxlbmd0aCB8fCBiUGFyZW50SW5kZXggPj0gYi5wYXJlbnRTY29wZXMubGVuZ3RoKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY29uc3QgcGFyZW50U2NvcGVMZW5ndGhEaWZmID0gYi5wYXJlbnRTY29wZXNbYlBhcmVudEluZGV4XS5sZW5ndGggLSBhLnBhcmVudFNjb3Blc1thUGFyZW50SW5kZXhdLmxlbmd0aDtcbiAgICAgIGlmIChwYXJlbnRTY29wZUxlbmd0aERpZmYgIT09IDApIHtcbiAgICAgICAgcmV0dXJuIHBhcmVudFNjb3BlTGVuZ3RoRGlmZjtcbiAgICAgIH1cbiAgICAgIGFQYXJlbnRJbmRleCsrO1xuICAgICAgYlBhcmVudEluZGV4Kys7XG4gICAgfVxuICAgIHJldHVybiBiLnBhcmVudFNjb3Blcy5sZW5ndGggLSBhLnBhcmVudFNjb3Blcy5sZW5ndGg7XG4gIH1cbiAgbWF0Y2goc2NvcGUpIHtcbiAgICBpZiAoc2NvcGUgIT09IFwiXCIpIHtcbiAgICAgIGxldCBkb3RJbmRleCA9IHNjb3BlLmluZGV4T2YoXCIuXCIpO1xuICAgICAgbGV0IGhlYWQ7XG4gICAgICBsZXQgdGFpbDtcbiAgICAgIGlmIChkb3RJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgaGVhZCA9IHNjb3BlO1xuICAgICAgICB0YWlsID0gXCJcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhlYWQgPSBzY29wZS5zdWJzdHJpbmcoMCwgZG90SW5kZXgpO1xuICAgICAgICB0YWlsID0gc2NvcGUuc3Vic3RyaW5nKGRvdEluZGV4ICsgMSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoaGVhZCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuW2hlYWRdLm1hdGNoKHRhaWwpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBydWxlcyA9IHRoaXMuX3J1bGVzV2l0aFBhcmVudFNjb3Blcy5jb25jYXQodGhpcy5fbWFpblJ1bGUpO1xuICAgIHJ1bGVzLnNvcnQoX1RoZW1lVHJpZUVsZW1lbnQuX2NtcEJ5U3BlY2lmaWNpdHkpO1xuICAgIHJldHVybiBydWxlcztcbiAgfVxuICBpbnNlcnQoc2NvcGVEZXB0aCwgc2NvcGUsIHBhcmVudFNjb3BlcywgZm9udFN0eWxlLCBmb3JlZ3JvdW5kLCBiYWNrZ3JvdW5kKSB7XG4gICAgaWYgKHNjb3BlID09PSBcIlwiKSB7XG4gICAgICB0aGlzLl9kb0luc2VydEhlcmUoc2NvcGVEZXB0aCwgcGFyZW50U2NvcGVzLCBmb250U3R5bGUsIGZvcmVncm91bmQsIGJhY2tncm91bmQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgZG90SW5kZXggPSBzY29wZS5pbmRleE9mKFwiLlwiKTtcbiAgICBsZXQgaGVhZDtcbiAgICBsZXQgdGFpbDtcbiAgICBpZiAoZG90SW5kZXggPT09IC0xKSB7XG4gICAgICBoZWFkID0gc2NvcGU7XG4gICAgICB0YWlsID0gXCJcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZCA9IHNjb3BlLnN1YnN0cmluZygwLCBkb3RJbmRleCk7XG4gICAgICB0YWlsID0gc2NvcGUuc3Vic3RyaW5nKGRvdEluZGV4ICsgMSk7XG4gICAgfVxuICAgIGxldCBjaGlsZDtcbiAgICBpZiAodGhpcy5fY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoaGVhZCkpIHtcbiAgICAgIGNoaWxkID0gdGhpcy5fY2hpbGRyZW5baGVhZF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoaWxkID0gbmV3IF9UaGVtZVRyaWVFbGVtZW50KHRoaXMuX21haW5SdWxlLmNsb25lKCksIFRoZW1lVHJpZUVsZW1lbnRSdWxlLmNsb25lQXJyKHRoaXMuX3J1bGVzV2l0aFBhcmVudFNjb3BlcykpO1xuICAgICAgdGhpcy5fY2hpbGRyZW5baGVhZF0gPSBjaGlsZDtcbiAgICB9XG4gICAgY2hpbGQuaW5zZXJ0KHNjb3BlRGVwdGggKyAxLCB0YWlsLCBwYXJlbnRTY29wZXMsIGZvbnRTdHlsZSwgZm9yZWdyb3VuZCwgYmFja2dyb3VuZCk7XG4gIH1cbiAgX2RvSW5zZXJ0SGVyZShzY29wZURlcHRoLCBwYXJlbnRTY29wZXMsIGZvbnRTdHlsZSwgZm9yZWdyb3VuZCwgYmFja2dyb3VuZCkge1xuICAgIGlmIChwYXJlbnRTY29wZXMgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuX21haW5SdWxlLmFjY2VwdE92ZXJ3cml0ZShzY29wZURlcHRoLCBmb250U3R5bGUsIGZvcmVncm91bmQsIGJhY2tncm91bmQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5fcnVsZXNXaXRoUGFyZW50U2NvcGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgcnVsZSA9IHRoaXMuX3J1bGVzV2l0aFBhcmVudFNjb3Blc1tpXTtcbiAgICAgIGlmIChzdHJBcnJDbXAocnVsZS5wYXJlbnRTY29wZXMsIHBhcmVudFNjb3BlcykgPT09IDApIHtcbiAgICAgICAgcnVsZS5hY2NlcHRPdmVyd3JpdGUoc2NvcGVEZXB0aCwgZm9udFN0eWxlLCBmb3JlZ3JvdW5kLCBiYWNrZ3JvdW5kKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZm9udFN0eWxlID09PSAtMSAvKiBOb3RTZXQgKi8pIHtcbiAgICAgIGZvbnRTdHlsZSA9IHRoaXMuX21haW5SdWxlLmZvbnRTdHlsZTtcbiAgICB9XG4gICAgaWYgKGZvcmVncm91bmQgPT09IDApIHtcbiAgICAgIGZvcmVncm91bmQgPSB0aGlzLl9tYWluUnVsZS5mb3JlZ3JvdW5kO1xuICAgIH1cbiAgICBpZiAoYmFja2dyb3VuZCA9PT0gMCkge1xuICAgICAgYmFja2dyb3VuZCA9IHRoaXMuX21haW5SdWxlLmJhY2tncm91bmQ7XG4gICAgfVxuICAgIHRoaXMuX3J1bGVzV2l0aFBhcmVudFNjb3Blcy5wdXNoKG5ldyBUaGVtZVRyaWVFbGVtZW50UnVsZShzY29wZURlcHRoLCBwYXJlbnRTY29wZXMsIGZvbnRTdHlsZSwgZm9yZWdyb3VuZCwgYmFja2dyb3VuZCkpO1xuICB9XG59O1xuXG4vLyBzcmMvZW5jb2RlZFRva2VuQXR0cmlidXRlcy50c1xudmFyIEVuY29kZWRUb2tlbk1ldGFkYXRhID0gY2xhc3MgX0VuY29kZWRUb2tlbk1ldGFkYXRhIHtcbiAgc3RhdGljIHRvQmluYXJ5U3RyKGVuY29kZWRUb2tlbkF0dHJpYnV0ZXMpIHtcbiAgICByZXR1cm4gZW5jb2RlZFRva2VuQXR0cmlidXRlcy50b1N0cmluZygyKS5wYWRTdGFydCgzMiwgXCIwXCIpO1xuICB9XG4gIHN0YXRpYyBwcmludChlbmNvZGVkVG9rZW5BdHRyaWJ1dGVzKSB7XG4gICAgY29uc3QgbGFuZ3VhZ2VJZCA9IF9FbmNvZGVkVG9rZW5NZXRhZGF0YS5nZXRMYW5ndWFnZUlkKGVuY29kZWRUb2tlbkF0dHJpYnV0ZXMpO1xuICAgIGNvbnN0IHRva2VuVHlwZSA9IF9FbmNvZGVkVG9rZW5NZXRhZGF0YS5nZXRUb2tlblR5cGUoZW5jb2RlZFRva2VuQXR0cmlidXRlcyk7XG4gICAgY29uc3QgZm9udFN0eWxlID0gX0VuY29kZWRUb2tlbk1ldGFkYXRhLmdldEZvbnRTdHlsZShlbmNvZGVkVG9rZW5BdHRyaWJ1dGVzKTtcbiAgICBjb25zdCBmb3JlZ3JvdW5kID0gX0VuY29kZWRUb2tlbk1ldGFkYXRhLmdldEZvcmVncm91bmQoZW5jb2RlZFRva2VuQXR0cmlidXRlcyk7XG4gICAgY29uc3QgYmFja2dyb3VuZCA9IF9FbmNvZGVkVG9rZW5NZXRhZGF0YS5nZXRCYWNrZ3JvdW5kKGVuY29kZWRUb2tlbkF0dHJpYnV0ZXMpO1xuICAgIGNvbnNvbGUubG9nKHtcbiAgICAgIGxhbmd1YWdlSWQsXG4gICAgICB0b2tlblR5cGUsXG4gICAgICBmb250U3R5bGUsXG4gICAgICBmb3JlZ3JvdW5kLFxuICAgICAgYmFja2dyb3VuZFxuICAgIH0pO1xuICB9XG4gIHN0YXRpYyBnZXRMYW5ndWFnZUlkKGVuY29kZWRUb2tlbkF0dHJpYnV0ZXMpIHtcbiAgICByZXR1cm4gKGVuY29kZWRUb2tlbkF0dHJpYnV0ZXMgJiAyNTUgLyogTEFOR1VBR0VJRF9NQVNLICovKSA+Pj4gMCAvKiBMQU5HVUFHRUlEX09GRlNFVCAqLztcbiAgfVxuICBzdGF0aWMgZ2V0VG9rZW5UeXBlKGVuY29kZWRUb2tlbkF0dHJpYnV0ZXMpIHtcbiAgICByZXR1cm4gKGVuY29kZWRUb2tlbkF0dHJpYnV0ZXMgJiA3NjggLyogVE9LRU5fVFlQRV9NQVNLICovKSA+Pj4gOCAvKiBUT0tFTl9UWVBFX09GRlNFVCAqLztcbiAgfVxuICBzdGF0aWMgY29udGFpbnNCYWxhbmNlZEJyYWNrZXRzKGVuY29kZWRUb2tlbkF0dHJpYnV0ZXMpIHtcbiAgICByZXR1cm4gKGVuY29kZWRUb2tlbkF0dHJpYnV0ZXMgJiAxMDI0IC8qIEJBTEFOQ0VEX0JSQUNLRVRTX01BU0sgKi8pICE9PSAwO1xuICB9XG4gIHN0YXRpYyBnZXRGb250U3R5bGUoZW5jb2RlZFRva2VuQXR0cmlidXRlcykge1xuICAgIHJldHVybiAoZW5jb2RlZFRva2VuQXR0cmlidXRlcyAmIDMwNzIwIC8qIEZPTlRfU1RZTEVfTUFTSyAqLykgPj4+IDExIC8qIEZPTlRfU1RZTEVfT0ZGU0VUICovO1xuICB9XG4gIHN0YXRpYyBnZXRGb3JlZ3JvdW5kKGVuY29kZWRUb2tlbkF0dHJpYnV0ZXMpIHtcbiAgICByZXR1cm4gKGVuY29kZWRUb2tlbkF0dHJpYnV0ZXMgJiAxNjc0NDQ0OCAvKiBGT1JFR1JPVU5EX01BU0sgKi8pID4+PiAxNSAvKiBGT1JFR1JPVU5EX09GRlNFVCAqLztcbiAgfVxuICBzdGF0aWMgZ2V0QmFja2dyb3VuZChlbmNvZGVkVG9rZW5BdHRyaWJ1dGVzKSB7XG4gICAgcmV0dXJuIChlbmNvZGVkVG9rZW5BdHRyaWJ1dGVzICYgNDI3ODE5MDA4MCAvKiBCQUNLR1JPVU5EX01BU0sgKi8pID4+PiAyNCAvKiBCQUNLR1JPVU5EX09GRlNFVCAqLztcbiAgfVxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgZmllbGRzIGluIGBtZXRhZGF0YWAuXG4gICAqIEEgdmFsdWUgb2YgYDBgLCBgTm90U2V0YCBvciBgbnVsbGAgaW5kaWNhdGVzIHRoYXQgdGhlIGNvcnJlc3BvbmRpbmcgZmllbGQgc2hvdWxkIGJlIGxlZnQgYXMgaXMuXG4gICAqL1xuICBzdGF0aWMgc2V0KGVuY29kZWRUb2tlbkF0dHJpYnV0ZXMsIGxhbmd1YWdlSWQsIHRva2VuVHlwZSwgY29udGFpbnNCYWxhbmNlZEJyYWNrZXRzLCBmb250U3R5bGUsIGZvcmVncm91bmQsIGJhY2tncm91bmQpIHtcbiAgICBsZXQgX2xhbmd1YWdlSWQgPSBfRW5jb2RlZFRva2VuTWV0YWRhdGEuZ2V0TGFuZ3VhZ2VJZChlbmNvZGVkVG9rZW5BdHRyaWJ1dGVzKTtcbiAgICBsZXQgX3Rva2VuVHlwZSA9IF9FbmNvZGVkVG9rZW5NZXRhZGF0YS5nZXRUb2tlblR5cGUoZW5jb2RlZFRva2VuQXR0cmlidXRlcyk7XG4gICAgbGV0IF9jb250YWluc0JhbGFuY2VkQnJhY2tldHNCaXQgPSBfRW5jb2RlZFRva2VuTWV0YWRhdGEuY29udGFpbnNCYWxhbmNlZEJyYWNrZXRzKGVuY29kZWRUb2tlbkF0dHJpYnV0ZXMpID8gMSA6IDA7XG4gICAgbGV0IF9mb250U3R5bGUgPSBfRW5jb2RlZFRva2VuTWV0YWRhdGEuZ2V0Rm9udFN0eWxlKGVuY29kZWRUb2tlbkF0dHJpYnV0ZXMpO1xuICAgIGxldCBfZm9yZWdyb3VuZCA9IF9FbmNvZGVkVG9rZW5NZXRhZGF0YS5nZXRGb3JlZ3JvdW5kKGVuY29kZWRUb2tlbkF0dHJpYnV0ZXMpO1xuICAgIGxldCBfYmFja2dyb3VuZCA9IF9FbmNvZGVkVG9rZW5NZXRhZGF0YS5nZXRCYWNrZ3JvdW5kKGVuY29kZWRUb2tlbkF0dHJpYnV0ZXMpO1xuICAgIGlmIChsYW5ndWFnZUlkICE9PSAwKSB7XG4gICAgICBfbGFuZ3VhZ2VJZCA9IGxhbmd1YWdlSWQ7XG4gICAgfVxuICAgIGlmICh0b2tlblR5cGUgIT09IDggLyogTm90U2V0ICovKSB7XG4gICAgICBfdG9rZW5UeXBlID0gZnJvbU9wdGlvbmFsVG9rZW5UeXBlKHRva2VuVHlwZSk7XG4gICAgfVxuICAgIGlmIChjb250YWluc0JhbGFuY2VkQnJhY2tldHMgIT09IG51bGwpIHtcbiAgICAgIF9jb250YWluc0JhbGFuY2VkQnJhY2tldHNCaXQgPSBjb250YWluc0JhbGFuY2VkQnJhY2tldHMgPyAxIDogMDtcbiAgICB9XG4gICAgaWYgKGZvbnRTdHlsZSAhPT0gLTEgLyogTm90U2V0ICovKSB7XG4gICAgICBfZm9udFN0eWxlID0gZm9udFN0eWxlO1xuICAgIH1cbiAgICBpZiAoZm9yZWdyb3VuZCAhPT0gMCkge1xuICAgICAgX2ZvcmVncm91bmQgPSBmb3JlZ3JvdW5kO1xuICAgIH1cbiAgICBpZiAoYmFja2dyb3VuZCAhPT0gMCkge1xuICAgICAgX2JhY2tncm91bmQgPSBiYWNrZ3JvdW5kO1xuICAgIH1cbiAgICByZXR1cm4gKF9sYW5ndWFnZUlkIDw8IDAgLyogTEFOR1VBR0VJRF9PRkZTRVQgKi8gfCBfdG9rZW5UeXBlIDw8IDggLyogVE9LRU5fVFlQRV9PRkZTRVQgKi8gfCBfY29udGFpbnNCYWxhbmNlZEJyYWNrZXRzQml0IDw8IDEwIC8qIEJBTEFOQ0VEX0JSQUNLRVRTX09GRlNFVCAqLyB8IF9mb250U3R5bGUgPDwgMTEgLyogRk9OVF9TVFlMRV9PRkZTRVQgKi8gfCBfZm9yZWdyb3VuZCA8PCAxNSAvKiBGT1JFR1JPVU5EX09GRlNFVCAqLyB8IF9iYWNrZ3JvdW5kIDw8IDI0IC8qIEJBQ0tHUk9VTkRfT0ZGU0VUICovKSA+Pj4gMDtcbiAgfVxufTtcbmZ1bmN0aW9uIHRvT3B0aW9uYWxUb2tlblR5cGUoc3RhbmRhcmRUeXBlKSB7XG4gIHJldHVybiBzdGFuZGFyZFR5cGU7XG59XG5mdW5jdGlvbiBmcm9tT3B0aW9uYWxUb2tlblR5cGUoc3RhbmRhcmRUeXBlKSB7XG4gIHJldHVybiBzdGFuZGFyZFR5cGU7XG59XG5cbi8vIHNyYy9tYXRjaGVyLnRzXG5mdW5jdGlvbiBjcmVhdGVNYXRjaGVycyhzZWxlY3RvciwgbWF0Y2hlc05hbWUpIHtcbiAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICBjb25zdCB0b2tlbml6ZXIgPSBuZXdUb2tlbml6ZXIoc2VsZWN0b3IpO1xuICBsZXQgdG9rZW4gPSB0b2tlbml6ZXIubmV4dCgpO1xuICB3aGlsZSAodG9rZW4gIT09IG51bGwpIHtcbiAgICBsZXQgcHJpb3JpdHkgPSAwO1xuICAgIGlmICh0b2tlbi5sZW5ndGggPT09IDIgJiYgdG9rZW4uY2hhckF0KDEpID09PSBcIjpcIikge1xuICAgICAgc3dpdGNoICh0b2tlbi5jaGFyQXQoMCkpIHtcbiAgICAgICAgY2FzZSBcIlJcIjpcbiAgICAgICAgICBwcmlvcml0eSA9IDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJMXCI6XG4gICAgICAgICAgcHJpb3JpdHkgPSAtMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLmxvZyhgVW5rbm93biBwcmlvcml0eSAke3Rva2VufSBpbiBzY29wZSBzZWxlY3RvcmApO1xuICAgICAgfVxuICAgICAgdG9rZW4gPSB0b2tlbml6ZXIubmV4dCgpO1xuICAgIH1cbiAgICBsZXQgbWF0Y2hlciA9IHBhcnNlQ29uanVuY3Rpb24oKTtcbiAgICByZXN1bHRzLnB1c2goeyBtYXRjaGVyLCBwcmlvcml0eSB9KTtcbiAgICBpZiAodG9rZW4gIT09IFwiLFwiKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgdG9rZW4gPSB0b2tlbml6ZXIubmV4dCgpO1xuICB9XG4gIHJldHVybiByZXN1bHRzO1xuICBmdW5jdGlvbiBwYXJzZU9wZXJhbmQoKSB7XG4gICAgaWYgKHRva2VuID09PSBcIi1cIikge1xuICAgICAgdG9rZW4gPSB0b2tlbml6ZXIubmV4dCgpO1xuICAgICAgY29uc3QgZXhwcmVzc2lvblRvTmVnYXRlID0gcGFyc2VPcGVyYW5kKCk7XG4gICAgICByZXR1cm4gKG1hdGNoZXJJbnB1dCkgPT4gISFleHByZXNzaW9uVG9OZWdhdGUgJiYgIWV4cHJlc3Npb25Ub05lZ2F0ZShtYXRjaGVySW5wdXQpO1xuICAgIH1cbiAgICBpZiAodG9rZW4gPT09IFwiKFwiKSB7XG4gICAgICB0b2tlbiA9IHRva2VuaXplci5uZXh0KCk7XG4gICAgICBjb25zdCBleHByZXNzaW9uSW5QYXJlbnRzID0gcGFyc2VJbm5lckV4cHJlc3Npb24oKTtcbiAgICAgIGlmICh0b2tlbiA9PT0gXCIpXCIpIHtcbiAgICAgICAgdG9rZW4gPSB0b2tlbml6ZXIubmV4dCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGV4cHJlc3Npb25JblBhcmVudHM7XG4gICAgfVxuICAgIGlmIChpc0lkZW50aWZpZXIodG9rZW4pKSB7XG4gICAgICBjb25zdCBpZGVudGlmaWVycyA9IFtdO1xuICAgICAgZG8ge1xuICAgICAgICBpZGVudGlmaWVycy5wdXNoKHRva2VuKTtcbiAgICAgICAgdG9rZW4gPSB0b2tlbml6ZXIubmV4dCgpO1xuICAgICAgfSB3aGlsZSAoaXNJZGVudGlmaWVyKHRva2VuKSk7XG4gICAgICByZXR1cm4gKG1hdGNoZXJJbnB1dCkgPT4gbWF0Y2hlc05hbWUoaWRlbnRpZmllcnMsIG1hdGNoZXJJbnB1dCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGZ1bmN0aW9uIHBhcnNlQ29uanVuY3Rpb24oKSB7XG4gICAgY29uc3QgbWF0Y2hlcnMgPSBbXTtcbiAgICBsZXQgbWF0Y2hlciA9IHBhcnNlT3BlcmFuZCgpO1xuICAgIHdoaWxlIChtYXRjaGVyKSB7XG4gICAgICBtYXRjaGVycy5wdXNoKG1hdGNoZXIpO1xuICAgICAgbWF0Y2hlciA9IHBhcnNlT3BlcmFuZCgpO1xuICAgIH1cbiAgICByZXR1cm4gKG1hdGNoZXJJbnB1dCkgPT4gbWF0Y2hlcnMuZXZlcnkoKG1hdGNoZXIyKSA9PiBtYXRjaGVyMihtYXRjaGVySW5wdXQpKTtcbiAgfVxuICBmdW5jdGlvbiBwYXJzZUlubmVyRXhwcmVzc2lvbigpIHtcbiAgICBjb25zdCBtYXRjaGVycyA9IFtdO1xuICAgIGxldCBtYXRjaGVyID0gcGFyc2VDb25qdW5jdGlvbigpO1xuICAgIHdoaWxlIChtYXRjaGVyKSB7XG4gICAgICBtYXRjaGVycy5wdXNoKG1hdGNoZXIpO1xuICAgICAgaWYgKHRva2VuID09PSBcInxcIiB8fCB0b2tlbiA9PT0gXCIsXCIpIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIHRva2VuID0gdG9rZW5pemVyLm5leHQoKTtcbiAgICAgICAgfSB3aGlsZSAodG9rZW4gPT09IFwifFwiIHx8IHRva2VuID09PSBcIixcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIG1hdGNoZXIgPSBwYXJzZUNvbmp1bmN0aW9uKCk7XG4gICAgfVxuICAgIHJldHVybiAobWF0Y2hlcklucHV0KSA9PiBtYXRjaGVycy5zb21lKChtYXRjaGVyMikgPT4gbWF0Y2hlcjIobWF0Y2hlcklucHV0KSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGlzSWRlbnRpZmllcih0b2tlbikge1xuICByZXR1cm4gISF0b2tlbiAmJiAhIXRva2VuLm1hdGNoKC9bXFx3XFwuOl0rLyk7XG59XG5mdW5jdGlvbiBuZXdUb2tlbml6ZXIoaW5wdXQpIHtcbiAgbGV0IHJlZ2V4ID0gLyhbTFJdOnxbXFx3XFwuOl1bXFx3XFwuOlxcLV0qfFtcXCxcXHxcXC1cXChcXCldKS9nO1xuICBsZXQgbWF0Y2ggPSByZWdleC5leGVjKGlucHV0KTtcbiAgcmV0dXJuIHtcbiAgICBuZXh0OiAoKSA9PiB7XG4gICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzID0gbWF0Y2hbMF07XG4gICAgICBtYXRjaCA9IHJlZ2V4LmV4ZWMoaW5wdXQpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gIH07XG59XG5cbi8vIHNyYy9vbmlnTGliLnRzXG52YXIgRmluZE9wdGlvbiA9IC8qIEBfX1BVUkVfXyAqLyAoKEZpbmRPcHRpb24yKSA9PiB7XG4gIEZpbmRPcHRpb24yW0ZpbmRPcHRpb24yW1wiTm9uZVwiXSA9IDBdID0gXCJOb25lXCI7XG4gIEZpbmRPcHRpb24yW0ZpbmRPcHRpb24yW1wiTm90QmVnaW5TdHJpbmdcIl0gPSAxXSA9IFwiTm90QmVnaW5TdHJpbmdcIjtcbiAgRmluZE9wdGlvbjJbRmluZE9wdGlvbjJbXCJOb3RFbmRTdHJpbmdcIl0gPSAyXSA9IFwiTm90RW5kU3RyaW5nXCI7XG4gIEZpbmRPcHRpb24yW0ZpbmRPcHRpb24yW1wiTm90QmVnaW5Qb3NpdGlvblwiXSA9IDRdID0gXCJOb3RCZWdpblBvc2l0aW9uXCI7XG4gIEZpbmRPcHRpb24yW0ZpbmRPcHRpb24yW1wiRGVidWdDYWxsXCJdID0gOF0gPSBcIkRlYnVnQ2FsbFwiO1xuICByZXR1cm4gRmluZE9wdGlvbjI7XG59KShGaW5kT3B0aW9uIHx8IHt9KTtcbmZ1bmN0aW9uIGRpc3Bvc2VPbmlnU3RyaW5nKHN0cikge1xuICBpZiAodHlwZW9mIHN0ci5kaXNwb3NlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBzdHIuZGlzcG9zZSgpO1xuICB9XG59XG5cbi8vIHNyYy9ncmFtbWFyL2dyYW1tYXJEZXBlbmRlbmNpZXMudHNcbnZhciBUb3BMZXZlbFJ1bGVSZWZlcmVuY2UgPSBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlTmFtZSkge1xuICAgIHRoaXMuc2NvcGVOYW1lID0gc2NvcGVOYW1lO1xuICB9XG4gIHRvS2V5KCkge1xuICAgIHJldHVybiB0aGlzLnNjb3BlTmFtZTtcbiAgfVxufTtcbnZhciBUb3BMZXZlbFJlcG9zaXRvcnlSdWxlUmVmZXJlbmNlID0gY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihzY29wZU5hbWUsIHJ1bGVOYW1lKSB7XG4gICAgdGhpcy5zY29wZU5hbWUgPSBzY29wZU5hbWU7XG4gICAgdGhpcy5ydWxlTmFtZSA9IHJ1bGVOYW1lO1xuICB9XG4gIHRvS2V5KCkge1xuICAgIHJldHVybiBgJHt0aGlzLnNjb3BlTmFtZX0jJHt0aGlzLnJ1bGVOYW1lfWA7XG4gIH1cbn07XG52YXIgRXh0ZXJuYWxSZWZlcmVuY2VDb2xsZWN0b3IgPSBjbGFzcyB7XG4gIF9yZWZlcmVuY2VzID0gW107XG4gIF9zZWVuUmVmZXJlbmNlS2V5cyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KCk7XG4gIGdldCByZWZlcmVuY2VzKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWZlcmVuY2VzO1xuICB9XG4gIHZpc2l0ZWRSdWxlID0gLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKTtcbiAgYWRkKHJlZmVyZW5jZSkge1xuICAgIGNvbnN0IGtleSA9IHJlZmVyZW5jZS50b0tleSgpO1xuICAgIGlmICh0aGlzLl9zZWVuUmVmZXJlbmNlS2V5cy5oYXMoa2V5KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zZWVuUmVmZXJlbmNlS2V5cy5hZGQoa2V5KTtcbiAgICB0aGlzLl9yZWZlcmVuY2VzLnB1c2gocmVmZXJlbmNlKTtcbiAgfVxufTtcbnZhciBTY29wZURlcGVuZGVuY3lQcm9jZXNzb3IgPSBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKHJlcG8sIGluaXRpYWxTY29wZU5hbWUpIHtcbiAgICB0aGlzLnJlcG8gPSByZXBvO1xuICAgIHRoaXMuaW5pdGlhbFNjb3BlTmFtZSA9IGluaXRpYWxTY29wZU5hbWU7XG4gICAgdGhpcy5zZWVuRnVsbFNjb3BlUmVxdWVzdHMuYWRkKHRoaXMuaW5pdGlhbFNjb3BlTmFtZSk7XG4gICAgdGhpcy5RID0gW25ldyBUb3BMZXZlbFJ1bGVSZWZlcmVuY2UodGhpcy5pbml0aWFsU2NvcGVOYW1lKV07XG4gIH1cbiAgc2VlbkZ1bGxTY29wZVJlcXVlc3RzID0gLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKTtcbiAgc2VlblBhcnRpYWxTY29wZVJlcXVlc3RzID0gLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKTtcbiAgUTtcbiAgcHJvY2Vzc1F1ZXVlKCkge1xuICAgIGNvbnN0IHEgPSB0aGlzLlE7XG4gICAgdGhpcy5RID0gW107XG4gICAgY29uc3QgZGVwcyA9IG5ldyBFeHRlcm5hbFJlZmVyZW5jZUNvbGxlY3RvcigpO1xuICAgIGZvciAoY29uc3QgZGVwIG9mIHEpIHtcbiAgICAgIGNvbGxlY3RSZWZlcmVuY2VzT2ZSZWZlcmVuY2UoZGVwLCB0aGlzLmluaXRpYWxTY29wZU5hbWUsIHRoaXMucmVwbywgZGVwcyk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZGVwIG9mIGRlcHMucmVmZXJlbmNlcykge1xuICAgICAgaWYgKGRlcCBpbnN0YW5jZW9mIFRvcExldmVsUnVsZVJlZmVyZW5jZSkge1xuICAgICAgICBpZiAodGhpcy5zZWVuRnVsbFNjb3BlUmVxdWVzdHMuaGFzKGRlcC5zY29wZU5hbWUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWVuRnVsbFNjb3BlUmVxdWVzdHMuYWRkKGRlcC5zY29wZU5hbWUpO1xuICAgICAgICB0aGlzLlEucHVzaChkZXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuc2VlbkZ1bGxTY29wZVJlcXVlc3RzLmhhcyhkZXAuc2NvcGVOYW1lKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNlZW5QYXJ0aWFsU2NvcGVSZXF1ZXN0cy5oYXMoZGVwLnRvS2V5KCkpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWVuUGFydGlhbFNjb3BlUmVxdWVzdHMuYWRkKGRlcC50b0tleSgpKTtcbiAgICAgICAgdGhpcy5RLnB1c2goZGVwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5mdW5jdGlvbiBjb2xsZWN0UmVmZXJlbmNlc09mUmVmZXJlbmNlKHJlZmVyZW5jZSwgYmFzZUdyYW1tYXJTY29wZU5hbWUsIHJlcG8sIHJlc3VsdCkge1xuICBjb25zdCBzZWxmR3JhbW1hciA9IHJlcG8ubG9va3VwKHJlZmVyZW5jZS5zY29wZU5hbWUpO1xuICBpZiAoIXNlbGZHcmFtbWFyKSB7XG4gICAgaWYgKHJlZmVyZW5jZS5zY29wZU5hbWUgPT09IGJhc2VHcmFtbWFyU2NvcGVOYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGdyYW1tYXIgcHJvdmlkZWQgZm9yIDwke2Jhc2VHcmFtbWFyU2NvcGVOYW1lfT5gKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGJhc2VHcmFtbWFyID0gcmVwby5sb29rdXAoYmFzZUdyYW1tYXJTY29wZU5hbWUpO1xuICBpZiAocmVmZXJlbmNlIGluc3RhbmNlb2YgVG9wTGV2ZWxSdWxlUmVmZXJlbmNlKSB7XG4gICAgY29sbGVjdEV4dGVybmFsUmVmZXJlbmNlc0luVG9wTGV2ZWxSdWxlKHsgYmFzZUdyYW1tYXIsIHNlbGZHcmFtbWFyIH0sIHJlc3VsdCk7XG4gIH0gZWxzZSB7XG4gICAgY29sbGVjdEV4dGVybmFsUmVmZXJlbmNlc0luVG9wTGV2ZWxSZXBvc2l0b3J5UnVsZShcbiAgICAgIHJlZmVyZW5jZS5ydWxlTmFtZSxcbiAgICAgIHsgYmFzZUdyYW1tYXIsIHNlbGZHcmFtbWFyLCByZXBvc2l0b3J5OiBzZWxmR3JhbW1hci5yZXBvc2l0b3J5IH0sXG4gICAgICByZXN1bHRcbiAgICApO1xuICB9XG4gIGNvbnN0IGluamVjdGlvbnMgPSByZXBvLmluamVjdGlvbnMocmVmZXJlbmNlLnNjb3BlTmFtZSk7XG4gIGlmIChpbmplY3Rpb25zKSB7XG4gICAgZm9yIChjb25zdCBpbmplY3Rpb24gb2YgaW5qZWN0aW9ucykge1xuICAgICAgcmVzdWx0LmFkZChuZXcgVG9wTGV2ZWxSdWxlUmVmZXJlbmNlKGluamVjdGlvbikpO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gY29sbGVjdEV4dGVybmFsUmVmZXJlbmNlc0luVG9wTGV2ZWxSZXBvc2l0b3J5UnVsZShydWxlTmFtZSwgY29udGV4dCwgcmVzdWx0KSB7XG4gIGlmIChjb250ZXh0LnJlcG9zaXRvcnkgJiYgY29udGV4dC5yZXBvc2l0b3J5W3J1bGVOYW1lXSkge1xuICAgIGNvbnN0IHJ1bGUgPSBjb250ZXh0LnJlcG9zaXRvcnlbcnVsZU5hbWVdO1xuICAgIGNvbGxlY3RFeHRlcm5hbFJlZmVyZW5jZXNJblJ1bGVzKFtydWxlXSwgY29udGV4dCwgcmVzdWx0KTtcbiAgfVxufVxuZnVuY3Rpb24gY29sbGVjdEV4dGVybmFsUmVmZXJlbmNlc0luVG9wTGV2ZWxSdWxlKGNvbnRleHQsIHJlc3VsdCkge1xuICBpZiAoY29udGV4dC5zZWxmR3JhbW1hci5wYXR0ZXJucyAmJiBBcnJheS5pc0FycmF5KGNvbnRleHQuc2VsZkdyYW1tYXIucGF0dGVybnMpKSB7XG4gICAgY29sbGVjdEV4dGVybmFsUmVmZXJlbmNlc0luUnVsZXMoXG4gICAgICBjb250ZXh0LnNlbGZHcmFtbWFyLnBhdHRlcm5zLFxuICAgICAgeyAuLi5jb250ZXh0LCByZXBvc2l0b3J5OiBjb250ZXh0LnNlbGZHcmFtbWFyLnJlcG9zaXRvcnkgfSxcbiAgICAgIHJlc3VsdFxuICAgICk7XG4gIH1cbiAgaWYgKGNvbnRleHQuc2VsZkdyYW1tYXIuaW5qZWN0aW9ucykge1xuICAgIGNvbGxlY3RFeHRlcm5hbFJlZmVyZW5jZXNJblJ1bGVzKFxuICAgICAgT2JqZWN0LnZhbHVlcyhjb250ZXh0LnNlbGZHcmFtbWFyLmluamVjdGlvbnMpLFxuICAgICAgeyAuLi5jb250ZXh0LCByZXBvc2l0b3J5OiBjb250ZXh0LnNlbGZHcmFtbWFyLnJlcG9zaXRvcnkgfSxcbiAgICAgIHJlc3VsdFxuICAgICk7XG4gIH1cbn1cbmZ1bmN0aW9uIGNvbGxlY3RFeHRlcm5hbFJlZmVyZW5jZXNJblJ1bGVzKHJ1bGVzLCBjb250ZXh0LCByZXN1bHQpIHtcbiAgZm9yIChjb25zdCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgaWYgKHJlc3VsdC52aXNpdGVkUnVsZS5oYXMocnVsZSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICByZXN1bHQudmlzaXRlZFJ1bGUuYWRkKHJ1bGUpO1xuICAgIGNvbnN0IHBhdHRlcm5SZXBvc2l0b3J5ID0gcnVsZS5yZXBvc2l0b3J5ID8gbWVyZ2VPYmplY3RzKHt9LCBjb250ZXh0LnJlcG9zaXRvcnksIHJ1bGUucmVwb3NpdG9yeSkgOiBjb250ZXh0LnJlcG9zaXRvcnk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocnVsZS5wYXR0ZXJucykpIHtcbiAgICAgIGNvbGxlY3RFeHRlcm5hbFJlZmVyZW5jZXNJblJ1bGVzKHJ1bGUucGF0dGVybnMsIHsgLi4uY29udGV4dCwgcmVwb3NpdG9yeTogcGF0dGVyblJlcG9zaXRvcnkgfSwgcmVzdWx0KTtcbiAgICB9XG4gICAgY29uc3QgaW5jbHVkZSA9IHJ1bGUuaW5jbHVkZTtcbiAgICBpZiAoIWluY2x1ZGUpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBjb25zdCByZWZlcmVuY2UgPSBwYXJzZUluY2x1ZGUoaW5jbHVkZSk7XG4gICAgc3dpdGNoIChyZWZlcmVuY2Uua2luZCkge1xuICAgICAgY2FzZSAwIC8qIEJhc2UgKi86XG4gICAgICAgIGNvbGxlY3RFeHRlcm5hbFJlZmVyZW5jZXNJblRvcExldmVsUnVsZSh7IC4uLmNvbnRleHQsIHNlbGZHcmFtbWFyOiBjb250ZXh0LmJhc2VHcmFtbWFyIH0sIHJlc3VsdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxIC8qIFNlbGYgKi86XG4gICAgICAgIGNvbGxlY3RFeHRlcm5hbFJlZmVyZW5jZXNJblRvcExldmVsUnVsZShjb250ZXh0LCByZXN1bHQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMiAvKiBSZWxhdGl2ZVJlZmVyZW5jZSAqLzpcbiAgICAgICAgY29sbGVjdEV4dGVybmFsUmVmZXJlbmNlc0luVG9wTGV2ZWxSZXBvc2l0b3J5UnVsZShyZWZlcmVuY2UucnVsZU5hbWUsIHsgLi4uY29udGV4dCwgcmVwb3NpdG9yeTogcGF0dGVyblJlcG9zaXRvcnkgfSwgcmVzdWx0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDMgLyogVG9wTGV2ZWxSZWZlcmVuY2UgKi86XG4gICAgICBjYXNlIDQgLyogVG9wTGV2ZWxSZXBvc2l0b3J5UmVmZXJlbmNlICovOlxuICAgICAgICBjb25zdCBzZWxmR3JhbW1hciA9IHJlZmVyZW5jZS5zY29wZU5hbWUgPT09IGNvbnRleHQuc2VsZkdyYW1tYXIuc2NvcGVOYW1lID8gY29udGV4dC5zZWxmR3JhbW1hciA6IHJlZmVyZW5jZS5zY29wZU5hbWUgPT09IGNvbnRleHQuYmFzZUdyYW1tYXIuc2NvcGVOYW1lID8gY29udGV4dC5iYXNlR3JhbW1hciA6IHZvaWQgMDtcbiAgICAgICAgaWYgKHNlbGZHcmFtbWFyKSB7XG4gICAgICAgICAgY29uc3QgbmV3Q29udGV4dCA9IHsgYmFzZUdyYW1tYXI6IGNvbnRleHQuYmFzZUdyYW1tYXIsIHNlbGZHcmFtbWFyLCByZXBvc2l0b3J5OiBwYXR0ZXJuUmVwb3NpdG9yeSB9O1xuICAgICAgICAgIGlmIChyZWZlcmVuY2Uua2luZCA9PT0gNCAvKiBUb3BMZXZlbFJlcG9zaXRvcnlSZWZlcmVuY2UgKi8pIHtcbiAgICAgICAgICAgIGNvbGxlY3RFeHRlcm5hbFJlZmVyZW5jZXNJblRvcExldmVsUmVwb3NpdG9yeVJ1bGUocmVmZXJlbmNlLnJ1bGVOYW1lLCBuZXdDb250ZXh0LCByZXN1bHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2xsZWN0RXh0ZXJuYWxSZWZlcmVuY2VzSW5Ub3BMZXZlbFJ1bGUobmV3Q29udGV4dCwgcmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHJlZmVyZW5jZS5raW5kID09PSA0IC8qIFRvcExldmVsUmVwb3NpdG9yeVJlZmVyZW5jZSAqLykge1xuICAgICAgICAgICAgcmVzdWx0LmFkZChuZXcgVG9wTGV2ZWxSZXBvc2l0b3J5UnVsZVJlZmVyZW5jZShyZWZlcmVuY2Uuc2NvcGVOYW1lLCByZWZlcmVuY2UucnVsZU5hbWUpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LmFkZChuZXcgVG9wTGV2ZWxSdWxlUmVmZXJlbmNlKHJlZmVyZW5jZS5zY29wZU5hbWUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG52YXIgQmFzZVJlZmVyZW5jZSA9IGNsYXNzIHtcbiAga2luZCA9IDAgLyogQmFzZSAqLztcbn07XG52YXIgU2VsZlJlZmVyZW5jZSA9IGNsYXNzIHtcbiAga2luZCA9IDEgLyogU2VsZiAqLztcbn07XG52YXIgUmVsYXRpdmVSZWZlcmVuY2UgPSBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKHJ1bGVOYW1lKSB7XG4gICAgdGhpcy5ydWxlTmFtZSA9IHJ1bGVOYW1lO1xuICB9XG4gIGtpbmQgPSAyIC8qIFJlbGF0aXZlUmVmZXJlbmNlICovO1xufTtcbnZhciBUb3BMZXZlbFJlZmVyZW5jZSA9IGNsYXNzIHtcbiAgY29uc3RydWN0b3Ioc2NvcGVOYW1lKSB7XG4gICAgdGhpcy5zY29wZU5hbWUgPSBzY29wZU5hbWU7XG4gIH1cbiAga2luZCA9IDMgLyogVG9wTGV2ZWxSZWZlcmVuY2UgKi87XG59O1xudmFyIFRvcExldmVsUmVwb3NpdG9yeVJlZmVyZW5jZSA9IGNsYXNzIHtcbiAgY29uc3RydWN0b3Ioc2NvcGVOYW1lLCBydWxlTmFtZSkge1xuICAgIHRoaXMuc2NvcGVOYW1lID0gc2NvcGVOYW1lO1xuICAgIHRoaXMucnVsZU5hbWUgPSBydWxlTmFtZTtcbiAgfVxuICBraW5kID0gNCAvKiBUb3BMZXZlbFJlcG9zaXRvcnlSZWZlcmVuY2UgKi87XG59O1xuZnVuY3Rpb24gcGFyc2VJbmNsdWRlKGluY2x1ZGUpIHtcbiAgaWYgKGluY2x1ZGUgPT09IFwiJGJhc2VcIikge1xuICAgIHJldHVybiBuZXcgQmFzZVJlZmVyZW5jZSgpO1xuICB9IGVsc2UgaWYgKGluY2x1ZGUgPT09IFwiJHNlbGZcIikge1xuICAgIHJldHVybiBuZXcgU2VsZlJlZmVyZW5jZSgpO1xuICB9XG4gIGNvbnN0IGluZGV4T2ZTaGFycCA9IGluY2x1ZGUuaW5kZXhPZihcIiNcIik7XG4gIGlmIChpbmRleE9mU2hhcnAgPT09IC0xKSB7XG4gICAgcmV0dXJuIG5ldyBUb3BMZXZlbFJlZmVyZW5jZShpbmNsdWRlKTtcbiAgfSBlbHNlIGlmIChpbmRleE9mU2hhcnAgPT09IDApIHtcbiAgICByZXR1cm4gbmV3IFJlbGF0aXZlUmVmZXJlbmNlKGluY2x1ZGUuc3Vic3RyaW5nKDEpKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBzY29wZU5hbWUgPSBpbmNsdWRlLnN1YnN0cmluZygwLCBpbmRleE9mU2hhcnApO1xuICAgIGNvbnN0IHJ1bGVOYW1lID0gaW5jbHVkZS5zdWJzdHJpbmcoaW5kZXhPZlNoYXJwICsgMSk7XG4gICAgcmV0dXJuIG5ldyBUb3BMZXZlbFJlcG9zaXRvcnlSZWZlcmVuY2Uoc2NvcGVOYW1lLCBydWxlTmFtZSk7XG4gIH1cbn1cblxuLy8gc3JjL3J1bGUudHNcbnZhciBIQVNfQkFDS19SRUZFUkVOQ0VTID0gL1xcXFwoXFxkKykvO1xudmFyIEJBQ0tfUkVGRVJFTkNJTkdfRU5EID0gL1xcXFwoXFxkKykvZztcbnZhciBydWxlSWRTeW1ib2wgPSBTeW1ib2woXCJSdWxlSWRcIik7XG52YXIgZW5kUnVsZUlkID0gLTE7XG52YXIgd2hpbGVSdWxlSWQgPSAtMjtcbmZ1bmN0aW9uIHJ1bGVJZEZyb21OdW1iZXIoaWQpIHtcbiAgcmV0dXJuIGlkO1xufVxuZnVuY3Rpb24gcnVsZUlkVG9OdW1iZXIoaWQpIHtcbiAgcmV0dXJuIGlkO1xufVxudmFyIFJ1bGUgPSBjbGFzcyB7XG4gICRsb2NhdGlvbjtcbiAgaWQ7XG4gIF9uYW1lSXNDYXB0dXJpbmc7XG4gIF9uYW1lO1xuICBfY29udGVudE5hbWVJc0NhcHR1cmluZztcbiAgX2NvbnRlbnROYW1lO1xuICBjb25zdHJ1Y3RvcigkbG9jYXRpb24sIGlkLCBuYW1lLCBjb250ZW50TmFtZSkge1xuICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLl9uYW1lID0gbmFtZSB8fCBudWxsO1xuICAgIHRoaXMuX25hbWVJc0NhcHR1cmluZyA9IFJlZ2V4U291cmNlLmhhc0NhcHR1cmVzKHRoaXMuX25hbWUpO1xuICAgIHRoaXMuX2NvbnRlbnROYW1lID0gY29udGVudE5hbWUgfHwgbnVsbDtcbiAgICB0aGlzLl9jb250ZW50TmFtZUlzQ2FwdHVyaW5nID0gUmVnZXhTb3VyY2UuaGFzQ2FwdHVyZXModGhpcy5fY29udGVudE5hbWUpO1xuICB9XG4gIGdldCBkZWJ1Z05hbWUoKSB7XG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLiRsb2NhdGlvbiA/IGAke2Jhc2VuYW1lKHRoaXMuJGxvY2F0aW9uLmZpbGVuYW1lKX06JHt0aGlzLiRsb2NhdGlvbi5saW5lfWAgOiBcInVua25vd25cIjtcbiAgICByZXR1cm4gYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSMke3RoaXMuaWR9IEAgJHtsb2NhdGlvbn1gO1xuICB9XG4gIGdldE5hbWUobGluZVRleHQsIGNhcHR1cmVJbmRpY2VzKSB7XG4gICAgaWYgKCF0aGlzLl9uYW1lSXNDYXB0dXJpbmcgfHwgdGhpcy5fbmFtZSA9PT0gbnVsbCB8fCBsaW5lVGV4dCA9PT0gbnVsbCB8fCBjYXB0dXJlSW5kaWNlcyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIHJldHVybiBSZWdleFNvdXJjZS5yZXBsYWNlQ2FwdHVyZXModGhpcy5fbmFtZSwgbGluZVRleHQsIGNhcHR1cmVJbmRpY2VzKTtcbiAgfVxuICBnZXRDb250ZW50TmFtZShsaW5lVGV4dCwgY2FwdHVyZUluZGljZXMpIHtcbiAgICBpZiAoIXRoaXMuX2NvbnRlbnROYW1lSXNDYXB0dXJpbmcgfHwgdGhpcy5fY29udGVudE5hbWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb250ZW50TmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIFJlZ2V4U291cmNlLnJlcGxhY2VDYXB0dXJlcyh0aGlzLl9jb250ZW50TmFtZSwgbGluZVRleHQsIGNhcHR1cmVJbmRpY2VzKTtcbiAgfVxufTtcbnZhciBDYXB0dXJlUnVsZSA9IGNsYXNzIGV4dGVuZHMgUnVsZSB7XG4gIHJldG9rZW5pemVDYXB0dXJlZFdpdGhSdWxlSWQ7XG4gIGNvbnN0cnVjdG9yKCRsb2NhdGlvbiwgaWQsIG5hbWUsIGNvbnRlbnROYW1lLCByZXRva2VuaXplQ2FwdHVyZWRXaXRoUnVsZUlkKSB7XG4gICAgc3VwZXIoJGxvY2F0aW9uLCBpZCwgbmFtZSwgY29udGVudE5hbWUpO1xuICAgIHRoaXMucmV0b2tlbml6ZUNhcHR1cmVkV2l0aFJ1bGVJZCA9IHJldG9rZW5pemVDYXB0dXJlZFdpdGhSdWxlSWQ7XG4gIH1cbiAgZGlzcG9zZSgpIHtcbiAgfVxuICBjb2xsZWN0UGF0dGVybnMoZ3JhbW1hciwgb3V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IHN1cHBvcnRlZCFcIik7XG4gIH1cbiAgY29tcGlsZShncmFtbWFyLCBlbmRSZWdleFNvdXJjZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBzdXBwb3J0ZWQhXCIpO1xuICB9XG4gIGNvbXBpbGVBRyhncmFtbWFyLCBlbmRSZWdleFNvdXJjZSwgYWxsb3dBLCBhbGxvd0cpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3Qgc3VwcG9ydGVkIVwiKTtcbiAgfVxufTtcbnZhciBNYXRjaFJ1bGUgPSBjbGFzcyBleHRlbmRzIFJ1bGUge1xuICBfbWF0Y2g7XG4gIGNhcHR1cmVzO1xuICBfY2FjaGVkQ29tcGlsZWRQYXR0ZXJucztcbiAgY29uc3RydWN0b3IoJGxvY2F0aW9uLCBpZCwgbmFtZSwgbWF0Y2gsIGNhcHR1cmVzKSB7XG4gICAgc3VwZXIoJGxvY2F0aW9uLCBpZCwgbmFtZSwgbnVsbCk7XG4gICAgdGhpcy5fbWF0Y2ggPSBuZXcgUmVnRXhwU291cmNlKG1hdGNoLCB0aGlzLmlkKTtcbiAgICB0aGlzLmNhcHR1cmVzID0gY2FwdHVyZXM7XG4gICAgdGhpcy5fY2FjaGVkQ29tcGlsZWRQYXR0ZXJucyA9IG51bGw7XG4gIH1cbiAgZGlzcG9zZSgpIHtcbiAgICBpZiAodGhpcy5fY2FjaGVkQ29tcGlsZWRQYXR0ZXJucykge1xuICAgICAgdGhpcy5fY2FjaGVkQ29tcGlsZWRQYXR0ZXJucy5kaXNwb3NlKCk7XG4gICAgICB0aGlzLl9jYWNoZWRDb21waWxlZFBhdHRlcm5zID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgZ2V0IGRlYnVnTWF0Y2hSZWdFeHAoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuX21hdGNoLnNvdXJjZX1gO1xuICB9XG4gIGNvbGxlY3RQYXR0ZXJucyhncmFtbWFyLCBvdXQpIHtcbiAgICBvdXQucHVzaCh0aGlzLl9tYXRjaCk7XG4gIH1cbiAgY29tcGlsZShncmFtbWFyLCBlbmRSZWdleFNvdXJjZSkge1xuICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZWRDb21waWxlZFBhdHRlcm5zKGdyYW1tYXIpLmNvbXBpbGUoZ3JhbW1hcik7XG4gIH1cbiAgY29tcGlsZUFHKGdyYW1tYXIsIGVuZFJlZ2V4U291cmNlLCBhbGxvd0EsIGFsbG93Rykge1xuICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZWRDb21waWxlZFBhdHRlcm5zKGdyYW1tYXIpLmNvbXBpbGVBRyhncmFtbWFyLCBhbGxvd0EsIGFsbG93Ryk7XG4gIH1cbiAgX2dldENhY2hlZENvbXBpbGVkUGF0dGVybnMoZ3JhbW1hcikge1xuICAgIGlmICghdGhpcy5fY2FjaGVkQ29tcGlsZWRQYXR0ZXJucykge1xuICAgICAgdGhpcy5fY2FjaGVkQ29tcGlsZWRQYXR0ZXJucyA9IG5ldyBSZWdFeHBTb3VyY2VMaXN0KCk7XG4gICAgICB0aGlzLmNvbGxlY3RQYXR0ZXJucyhncmFtbWFyLCB0aGlzLl9jYWNoZWRDb21waWxlZFBhdHRlcm5zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlZENvbXBpbGVkUGF0dGVybnM7XG4gIH1cbn07XG52YXIgSW5jbHVkZU9ubHlSdWxlID0gY2xhc3MgZXh0ZW5kcyBSdWxlIHtcbiAgaGFzTWlzc2luZ1BhdHRlcm5zO1xuICBwYXR0ZXJucztcbiAgX2NhY2hlZENvbXBpbGVkUGF0dGVybnM7XG4gIGNvbnN0cnVjdG9yKCRsb2NhdGlvbiwgaWQsIG5hbWUsIGNvbnRlbnROYW1lLCBwYXR0ZXJucykge1xuICAgIHN1cGVyKCRsb2NhdGlvbiwgaWQsIG5hbWUsIGNvbnRlbnROYW1lKTtcbiAgICB0aGlzLnBhdHRlcm5zID0gcGF0dGVybnMucGF0dGVybnM7XG4gICAgdGhpcy5oYXNNaXNzaW5nUGF0dGVybnMgPSBwYXR0ZXJucy5oYXNNaXNzaW5nUGF0dGVybnM7XG4gICAgdGhpcy5fY2FjaGVkQ29tcGlsZWRQYXR0ZXJucyA9IG51bGw7XG4gIH1cbiAgZGlzcG9zZSgpIHtcbiAgICBpZiAodGhpcy5fY2FjaGVkQ29tcGlsZWRQYXR0ZXJucykge1xuICAgICAgdGhpcy5fY2FjaGVkQ29tcGlsZWRQYXR0ZXJucy5kaXNwb3NlKCk7XG4gICAgICB0aGlzLl9jYWNoZWRDb21waWxlZFBhdHRlcm5zID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgY29sbGVjdFBhdHRlcm5zKGdyYW1tYXIsIG91dCkge1xuICAgIGZvciAoY29uc3QgcGF0dGVybiBvZiB0aGlzLnBhdHRlcm5zKSB7XG4gICAgICBjb25zdCBydWxlID0gZ3JhbW1hci5nZXRSdWxlKHBhdHRlcm4pO1xuICAgICAgcnVsZS5jb2xsZWN0UGF0dGVybnMoZ3JhbW1hciwgb3V0KTtcbiAgICB9XG4gIH1cbiAgY29tcGlsZShncmFtbWFyLCBlbmRSZWdleFNvdXJjZSkge1xuICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZWRDb21waWxlZFBhdHRlcm5zKGdyYW1tYXIpLmNvbXBpbGUoZ3JhbW1hcik7XG4gIH1cbiAgY29tcGlsZUFHKGdyYW1tYXIsIGVuZFJlZ2V4U291cmNlLCBhbGxvd0EsIGFsbG93Rykge1xuICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZWRDb21waWxlZFBhdHRlcm5zKGdyYW1tYXIpLmNvbXBpbGVBRyhncmFtbWFyLCBhbGxvd0EsIGFsbG93Ryk7XG4gIH1cbiAgX2dldENhY2hlZENvbXBpbGVkUGF0dGVybnMoZ3JhbW1hcikge1xuICAgIGlmICghdGhpcy5fY2FjaGVkQ29tcGlsZWRQYXR0ZXJucykge1xuICAgICAgdGhpcy5fY2FjaGVkQ29tcGlsZWRQYXR0ZXJucyA9IG5ldyBSZWdFeHBTb3VyY2VMaXN0KCk7XG4gICAgICB0aGlzLmNvbGxlY3RQYXR0ZXJucyhncmFtbWFyLCB0aGlzLl9jYWNoZWRDb21waWxlZFBhdHRlcm5zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlZENvbXBpbGVkUGF0dGVybnM7XG4gIH1cbn07XG52YXIgQmVnaW5FbmRSdWxlID0gY2xhc3MgZXh0ZW5kcyBSdWxlIHtcbiAgX2JlZ2luO1xuICBiZWdpbkNhcHR1cmVzO1xuICBfZW5kO1xuICBlbmRIYXNCYWNrUmVmZXJlbmNlcztcbiAgZW5kQ2FwdHVyZXM7XG4gIGFwcGx5RW5kUGF0dGVybkxhc3Q7XG4gIGhhc01pc3NpbmdQYXR0ZXJucztcbiAgcGF0dGVybnM7XG4gIF9jYWNoZWRDb21waWxlZFBhdHRlcm5zO1xuICBjb25zdHJ1Y3RvcigkbG9jYXRpb24sIGlkLCBuYW1lLCBjb250ZW50TmFtZSwgYmVnaW4sIGJlZ2luQ2FwdHVyZXMsIGVuZCwgZW5kQ2FwdHVyZXMsIGFwcGx5RW5kUGF0dGVybkxhc3QsIHBhdHRlcm5zKSB7XG4gICAgc3VwZXIoJGxvY2F0aW9uLCBpZCwgbmFtZSwgY29udGVudE5hbWUpO1xuICAgIHRoaXMuX2JlZ2luID0gbmV3IFJlZ0V4cFNvdXJjZShiZWdpbiwgdGhpcy5pZCk7XG4gICAgdGhpcy5iZWdpbkNhcHR1cmVzID0gYmVnaW5DYXB0dXJlcztcbiAgICB0aGlzLl9lbmQgPSBuZXcgUmVnRXhwU291cmNlKGVuZCA/IGVuZCA6IFwiXFx1RkZGRlwiLCAtMSk7XG4gICAgdGhpcy5lbmRIYXNCYWNrUmVmZXJlbmNlcyA9IHRoaXMuX2VuZC5oYXNCYWNrUmVmZXJlbmNlcztcbiAgICB0aGlzLmVuZENhcHR1cmVzID0gZW5kQ2FwdHVyZXM7XG4gICAgdGhpcy5hcHBseUVuZFBhdHRlcm5MYXN0ID0gYXBwbHlFbmRQYXR0ZXJuTGFzdCB8fCBmYWxzZTtcbiAgICB0aGlzLnBhdHRlcm5zID0gcGF0dGVybnMucGF0dGVybnM7XG4gICAgdGhpcy5oYXNNaXNzaW5nUGF0dGVybnMgPSBwYXR0ZXJucy5oYXNNaXNzaW5nUGF0dGVybnM7XG4gICAgdGhpcy5fY2FjaGVkQ29tcGlsZWRQYXR0ZXJucyA9IG51bGw7XG4gIH1cbiAgZGlzcG9zZSgpIHtcbiAgICBpZiAodGhpcy5fY2FjaGVkQ29tcGlsZWRQYXR0ZXJucykge1xuICAgICAgdGhpcy5fY2FjaGVkQ29tcGlsZWRQYXR0ZXJucy5kaXNwb3NlKCk7XG4gICAgICB0aGlzLl9jYWNoZWRDb21waWxlZFBhdHRlcm5zID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgZ2V0IGRlYnVnQmVnaW5SZWdFeHAoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuX2JlZ2luLnNvdXJjZX1gO1xuICB9XG4gIGdldCBkZWJ1Z0VuZFJlZ0V4cCgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5fZW5kLnNvdXJjZX1gO1xuICB9XG4gIGdldEVuZFdpdGhSZXNvbHZlZEJhY2tSZWZlcmVuY2VzKGxpbmVUZXh0LCBjYXB0dXJlSW5kaWNlcykge1xuICAgIHJldHVybiB0aGlzLl9lbmQucmVzb2x2ZUJhY2tSZWZlcmVuY2VzKGxpbmVUZXh0LCBjYXB0dXJlSW5kaWNlcyk7XG4gIH1cbiAgY29sbGVjdFBhdHRlcm5zKGdyYW1tYXIsIG91dCkge1xuICAgIG91dC5wdXNoKHRoaXMuX2JlZ2luKTtcbiAgfVxuICBjb21waWxlKGdyYW1tYXIsIGVuZFJlZ2V4U291cmNlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldENhY2hlZENvbXBpbGVkUGF0dGVybnMoZ3JhbW1hciwgZW5kUmVnZXhTb3VyY2UpLmNvbXBpbGUoZ3JhbW1hcik7XG4gIH1cbiAgY29tcGlsZUFHKGdyYW1tYXIsIGVuZFJlZ2V4U291cmNlLCBhbGxvd0EsIGFsbG93Rykge1xuICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZWRDb21waWxlZFBhdHRlcm5zKGdyYW1tYXIsIGVuZFJlZ2V4U291cmNlKS5jb21waWxlQUcoZ3JhbW1hciwgYWxsb3dBLCBhbGxvd0cpO1xuICB9XG4gIF9nZXRDYWNoZWRDb21waWxlZFBhdHRlcm5zKGdyYW1tYXIsIGVuZFJlZ2V4U291cmNlKSB7XG4gICAgaWYgKCF0aGlzLl9jYWNoZWRDb21waWxlZFBhdHRlcm5zKSB7XG4gICAgICB0aGlzLl9jYWNoZWRDb21waWxlZFBhdHRlcm5zID0gbmV3IFJlZ0V4cFNvdXJjZUxpc3QoKTtcbiAgICAgIGZvciAoY29uc3QgcGF0dGVybiBvZiB0aGlzLnBhdHRlcm5zKSB7XG4gICAgICAgIGNvbnN0IHJ1bGUgPSBncmFtbWFyLmdldFJ1bGUocGF0dGVybik7XG4gICAgICAgIHJ1bGUuY29sbGVjdFBhdHRlcm5zKGdyYW1tYXIsIHRoaXMuX2NhY2hlZENvbXBpbGVkUGF0dGVybnMpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYXBwbHlFbmRQYXR0ZXJuTGFzdCkge1xuICAgICAgICB0aGlzLl9jYWNoZWRDb21waWxlZFBhdHRlcm5zLnB1c2godGhpcy5fZW5kLmhhc0JhY2tSZWZlcmVuY2VzID8gdGhpcy5fZW5kLmNsb25lKCkgOiB0aGlzLl9lbmQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fY2FjaGVkQ29tcGlsZWRQYXR0ZXJucy51bnNoaWZ0KHRoaXMuX2VuZC5oYXNCYWNrUmVmZXJlbmNlcyA/IHRoaXMuX2VuZC5jbG9uZSgpIDogdGhpcy5fZW5kKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuX2VuZC5oYXNCYWNrUmVmZXJlbmNlcykge1xuICAgICAgaWYgKHRoaXMuYXBwbHlFbmRQYXR0ZXJuTGFzdCkge1xuICAgICAgICB0aGlzLl9jYWNoZWRDb21waWxlZFBhdHRlcm5zLnNldFNvdXJjZSh0aGlzLl9jYWNoZWRDb21waWxlZFBhdHRlcm5zLmxlbmd0aCgpIC0gMSwgZW5kUmVnZXhTb3VyY2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fY2FjaGVkQ29tcGlsZWRQYXR0ZXJucy5zZXRTb3VyY2UoMCwgZW5kUmVnZXhTb3VyY2UpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY2FjaGVkQ29tcGlsZWRQYXR0ZXJucztcbiAgfVxufTtcbnZhciBCZWdpbldoaWxlUnVsZSA9IGNsYXNzIGV4dGVuZHMgUnVsZSB7XG4gIF9iZWdpbjtcbiAgYmVnaW5DYXB0dXJlcztcbiAgd2hpbGVDYXB0dXJlcztcbiAgX3doaWxlO1xuICB3aGlsZUhhc0JhY2tSZWZlcmVuY2VzO1xuICBoYXNNaXNzaW5nUGF0dGVybnM7XG4gIHBhdHRlcm5zO1xuICBfY2FjaGVkQ29tcGlsZWRQYXR0ZXJucztcbiAgX2NhY2hlZENvbXBpbGVkV2hpbGVQYXR0ZXJucztcbiAgY29uc3RydWN0b3IoJGxvY2F0aW9uLCBpZCwgbmFtZSwgY29udGVudE5hbWUsIGJlZ2luLCBiZWdpbkNhcHR1cmVzLCBfd2hpbGUsIHdoaWxlQ2FwdHVyZXMsIHBhdHRlcm5zKSB7XG4gICAgc3VwZXIoJGxvY2F0aW9uLCBpZCwgbmFtZSwgY29udGVudE5hbWUpO1xuICAgIHRoaXMuX2JlZ2luID0gbmV3IFJlZ0V4cFNvdXJjZShiZWdpbiwgdGhpcy5pZCk7XG4gICAgdGhpcy5iZWdpbkNhcHR1cmVzID0gYmVnaW5DYXB0dXJlcztcbiAgICB0aGlzLndoaWxlQ2FwdHVyZXMgPSB3aGlsZUNhcHR1cmVzO1xuICAgIHRoaXMuX3doaWxlID0gbmV3IFJlZ0V4cFNvdXJjZShfd2hpbGUsIHdoaWxlUnVsZUlkKTtcbiAgICB0aGlzLndoaWxlSGFzQmFja1JlZmVyZW5jZXMgPSB0aGlzLl93aGlsZS5oYXNCYWNrUmVmZXJlbmNlcztcbiAgICB0aGlzLnBhdHRlcm5zID0gcGF0dGVybnMucGF0dGVybnM7XG4gICAgdGhpcy5oYXNNaXNzaW5nUGF0dGVybnMgPSBwYXR0ZXJucy5oYXNNaXNzaW5nUGF0dGVybnM7XG4gICAgdGhpcy5fY2FjaGVkQ29tcGlsZWRQYXR0ZXJucyA9IG51bGw7XG4gICAgdGhpcy5fY2FjaGVkQ29tcGlsZWRXaGlsZVBhdHRlcm5zID0gbnVsbDtcbiAgfVxuICBkaXNwb3NlKCkge1xuICAgIGlmICh0aGlzLl9jYWNoZWRDb21waWxlZFBhdHRlcm5zKSB7XG4gICAgICB0aGlzLl9jYWNoZWRDb21waWxlZFBhdHRlcm5zLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMuX2NhY2hlZENvbXBpbGVkUGF0dGVybnMgPSBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5fY2FjaGVkQ29tcGlsZWRXaGlsZVBhdHRlcm5zKSB7XG4gICAgICB0aGlzLl9jYWNoZWRDb21waWxlZFdoaWxlUGF0dGVybnMuZGlzcG9zZSgpO1xuICAgICAgdGhpcy5fY2FjaGVkQ29tcGlsZWRXaGlsZVBhdHRlcm5zID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgZ2V0IGRlYnVnQmVnaW5SZWdFeHAoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuX2JlZ2luLnNvdXJjZX1gO1xuICB9XG4gIGdldCBkZWJ1Z1doaWxlUmVnRXhwKCkge1xuICAgIHJldHVybiBgJHt0aGlzLl93aGlsZS5zb3VyY2V9YDtcbiAgfVxuICBnZXRXaGlsZVdpdGhSZXNvbHZlZEJhY2tSZWZlcmVuY2VzKGxpbmVUZXh0LCBjYXB0dXJlSW5kaWNlcykge1xuICAgIHJldHVybiB0aGlzLl93aGlsZS5yZXNvbHZlQmFja1JlZmVyZW5jZXMobGluZVRleHQsIGNhcHR1cmVJbmRpY2VzKTtcbiAgfVxuICBjb2xsZWN0UGF0dGVybnMoZ3JhbW1hciwgb3V0KSB7XG4gICAgb3V0LnB1c2godGhpcy5fYmVnaW4pO1xuICB9XG4gIGNvbXBpbGUoZ3JhbW1hciwgZW5kUmVnZXhTb3VyY2UpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGVkQ29tcGlsZWRQYXR0ZXJucyhncmFtbWFyKS5jb21waWxlKGdyYW1tYXIpO1xuICB9XG4gIGNvbXBpbGVBRyhncmFtbWFyLCBlbmRSZWdleFNvdXJjZSwgYWxsb3dBLCBhbGxvd0cpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGVkQ29tcGlsZWRQYXR0ZXJucyhncmFtbWFyKS5jb21waWxlQUcoZ3JhbW1hciwgYWxsb3dBLCBhbGxvd0cpO1xuICB9XG4gIF9nZXRDYWNoZWRDb21waWxlZFBhdHRlcm5zKGdyYW1tYXIpIHtcbiAgICBpZiAoIXRoaXMuX2NhY2hlZENvbXBpbGVkUGF0dGVybnMpIHtcbiAgICAgIHRoaXMuX2NhY2hlZENvbXBpbGVkUGF0dGVybnMgPSBuZXcgUmVnRXhwU291cmNlTGlzdCgpO1xuICAgICAgZm9yIChjb25zdCBwYXR0ZXJuIG9mIHRoaXMucGF0dGVybnMpIHtcbiAgICAgICAgY29uc3QgcnVsZSA9IGdyYW1tYXIuZ2V0UnVsZShwYXR0ZXJuKTtcbiAgICAgICAgcnVsZS5jb2xsZWN0UGF0dGVybnMoZ3JhbW1hciwgdGhpcy5fY2FjaGVkQ29tcGlsZWRQYXR0ZXJucyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jYWNoZWRDb21waWxlZFBhdHRlcm5zO1xuICB9XG4gIGNvbXBpbGVXaGlsZShncmFtbWFyLCBlbmRSZWdleFNvdXJjZSkge1xuICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZWRDb21waWxlZFdoaWxlUGF0dGVybnMoZ3JhbW1hciwgZW5kUmVnZXhTb3VyY2UpLmNvbXBpbGUoZ3JhbW1hcik7XG4gIH1cbiAgY29tcGlsZVdoaWxlQUcoZ3JhbW1hciwgZW5kUmVnZXhTb3VyY2UsIGFsbG93QSwgYWxsb3dHKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldENhY2hlZENvbXBpbGVkV2hpbGVQYXR0ZXJucyhncmFtbWFyLCBlbmRSZWdleFNvdXJjZSkuY29tcGlsZUFHKGdyYW1tYXIsIGFsbG93QSwgYWxsb3dHKTtcbiAgfVxuICBfZ2V0Q2FjaGVkQ29tcGlsZWRXaGlsZVBhdHRlcm5zKGdyYW1tYXIsIGVuZFJlZ2V4U291cmNlKSB7XG4gICAgaWYgKCF0aGlzLl9jYWNoZWRDb21waWxlZFdoaWxlUGF0dGVybnMpIHtcbiAgICAgIHRoaXMuX2NhY2hlZENvbXBpbGVkV2hpbGVQYXR0ZXJucyA9IG5ldyBSZWdFeHBTb3VyY2VMaXN0KCk7XG4gICAgICB0aGlzLl9jYWNoZWRDb21waWxlZFdoaWxlUGF0dGVybnMucHVzaCh0aGlzLl93aGlsZS5oYXNCYWNrUmVmZXJlbmNlcyA/IHRoaXMuX3doaWxlLmNsb25lKCkgOiB0aGlzLl93aGlsZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLl93aGlsZS5oYXNCYWNrUmVmZXJlbmNlcykge1xuICAgICAgdGhpcy5fY2FjaGVkQ29tcGlsZWRXaGlsZVBhdHRlcm5zLnNldFNvdXJjZSgwLCBlbmRSZWdleFNvdXJjZSA/IGVuZFJlZ2V4U291cmNlIDogXCJcXHVGRkZGXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY2FjaGVkQ29tcGlsZWRXaGlsZVBhdHRlcm5zO1xuICB9XG59O1xudmFyIFJ1bGVGYWN0b3J5ID0gY2xhc3MgX1J1bGVGYWN0b3J5IHtcbiAgc3RhdGljIGNyZWF0ZUNhcHR1cmVSdWxlKGhlbHBlciwgJGxvY2F0aW9uLCBuYW1lLCBjb250ZW50TmFtZSwgcmV0b2tlbml6ZUNhcHR1cmVkV2l0aFJ1bGVJZCkge1xuICAgIHJldHVybiBoZWxwZXIucmVnaXN0ZXJSdWxlKChpZCkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBDYXB0dXJlUnVsZSgkbG9jYXRpb24sIGlkLCBuYW1lLCBjb250ZW50TmFtZSwgcmV0b2tlbml6ZUNhcHR1cmVkV2l0aFJ1bGVJZCk7XG4gICAgfSk7XG4gIH1cbiAgc3RhdGljIGdldENvbXBpbGVkUnVsZUlkKGRlc2MsIGhlbHBlciwgcmVwb3NpdG9yeSkge1xuICAgIGlmICghZGVzYy5pZCkge1xuICAgICAgaGVscGVyLnJlZ2lzdGVyUnVsZSgoaWQpID0+IHtcbiAgICAgICAgZGVzYy5pZCA9IGlkO1xuICAgICAgICBpZiAoZGVzYy5tYXRjaCkge1xuICAgICAgICAgIHJldHVybiBuZXcgTWF0Y2hSdWxlKFxuICAgICAgICAgICAgZGVzYy4kdnNjb2RlVGV4dG1hdGVMb2NhdGlvbixcbiAgICAgICAgICAgIGRlc2MuaWQsXG4gICAgICAgICAgICBkZXNjLm5hbWUsXG4gICAgICAgICAgICBkZXNjLm1hdGNoLFxuICAgICAgICAgICAgX1J1bGVGYWN0b3J5Ll9jb21waWxlQ2FwdHVyZXMoZGVzYy5jYXB0dXJlcywgaGVscGVyLCByZXBvc2l0b3J5KVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkZXNjLmJlZ2luID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaWYgKGRlc2MucmVwb3NpdG9yeSkge1xuICAgICAgICAgICAgcmVwb3NpdG9yeSA9IG1lcmdlT2JqZWN0cyh7fSwgcmVwb3NpdG9yeSwgZGVzYy5yZXBvc2l0b3J5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IHBhdHRlcm5zID0gZGVzYy5wYXR0ZXJucztcbiAgICAgICAgICBpZiAodHlwZW9mIHBhdHRlcm5zID09PSBcInVuZGVmaW5lZFwiICYmIGRlc2MuaW5jbHVkZSkge1xuICAgICAgICAgICAgcGF0dGVybnMgPSBbeyBpbmNsdWRlOiBkZXNjLmluY2x1ZGUgfV07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgSW5jbHVkZU9ubHlSdWxlKFxuICAgICAgICAgICAgZGVzYy4kdnNjb2RlVGV4dG1hdGVMb2NhdGlvbixcbiAgICAgICAgICAgIGRlc2MuaWQsXG4gICAgICAgICAgICBkZXNjLm5hbWUsXG4gICAgICAgICAgICBkZXNjLmNvbnRlbnROYW1lLFxuICAgICAgICAgICAgX1J1bGVGYWN0b3J5Ll9jb21waWxlUGF0dGVybnMocGF0dGVybnMsIGhlbHBlciwgcmVwb3NpdG9yeSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZXNjLndoaWxlKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBCZWdpbldoaWxlUnVsZShcbiAgICAgICAgICAgIGRlc2MuJHZzY29kZVRleHRtYXRlTG9jYXRpb24sXG4gICAgICAgICAgICBkZXNjLmlkLFxuICAgICAgICAgICAgZGVzYy5uYW1lLFxuICAgICAgICAgICAgZGVzYy5jb250ZW50TmFtZSxcbiAgICAgICAgICAgIGRlc2MuYmVnaW4sXG4gICAgICAgICAgICBfUnVsZUZhY3RvcnkuX2NvbXBpbGVDYXB0dXJlcyhkZXNjLmJlZ2luQ2FwdHVyZXMgfHwgZGVzYy5jYXB0dXJlcywgaGVscGVyLCByZXBvc2l0b3J5KSxcbiAgICAgICAgICAgIGRlc2Mud2hpbGUsXG4gICAgICAgICAgICBfUnVsZUZhY3RvcnkuX2NvbXBpbGVDYXB0dXJlcyhkZXNjLndoaWxlQ2FwdHVyZXMgfHwgZGVzYy5jYXB0dXJlcywgaGVscGVyLCByZXBvc2l0b3J5KSxcbiAgICAgICAgICAgIF9SdWxlRmFjdG9yeS5fY29tcGlsZVBhdHRlcm5zKGRlc2MucGF0dGVybnMsIGhlbHBlciwgcmVwb3NpdG9yeSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgQmVnaW5FbmRSdWxlKFxuICAgICAgICAgIGRlc2MuJHZzY29kZVRleHRtYXRlTG9jYXRpb24sXG4gICAgICAgICAgZGVzYy5pZCxcbiAgICAgICAgICBkZXNjLm5hbWUsXG4gICAgICAgICAgZGVzYy5jb250ZW50TmFtZSxcbiAgICAgICAgICBkZXNjLmJlZ2luLFxuICAgICAgICAgIF9SdWxlRmFjdG9yeS5fY29tcGlsZUNhcHR1cmVzKGRlc2MuYmVnaW5DYXB0dXJlcyB8fCBkZXNjLmNhcHR1cmVzLCBoZWxwZXIsIHJlcG9zaXRvcnkpLFxuICAgICAgICAgIGRlc2MuZW5kLFxuICAgICAgICAgIF9SdWxlRmFjdG9yeS5fY29tcGlsZUNhcHR1cmVzKGRlc2MuZW5kQ2FwdHVyZXMgfHwgZGVzYy5jYXB0dXJlcywgaGVscGVyLCByZXBvc2l0b3J5KSxcbiAgICAgICAgICBkZXNjLmFwcGx5RW5kUGF0dGVybkxhc3QsXG4gICAgICAgICAgX1J1bGVGYWN0b3J5Ll9jb21waWxlUGF0dGVybnMoZGVzYy5wYXR0ZXJucywgaGVscGVyLCByZXBvc2l0b3J5KVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBkZXNjLmlkO1xuICB9XG4gIHN0YXRpYyBfY29tcGlsZUNhcHR1cmVzKGNhcHR1cmVzLCBoZWxwZXIsIHJlcG9zaXRvcnkpIHtcbiAgICBsZXQgciA9IFtdO1xuICAgIGlmIChjYXB0dXJlcykge1xuICAgICAgbGV0IG1heGltdW1DYXB0dXJlSWQgPSAwO1xuICAgICAgZm9yIChjb25zdCBjYXB0dXJlSWQgaW4gY2FwdHVyZXMpIHtcbiAgICAgICAgaWYgKGNhcHR1cmVJZCA9PT0gXCIkdnNjb2RlVGV4dG1hdGVMb2NhdGlvblwiKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbnVtZXJpY0NhcHR1cmVJZCA9IHBhcnNlSW50KGNhcHR1cmVJZCwgMTApO1xuICAgICAgICBpZiAobnVtZXJpY0NhcHR1cmVJZCA+IG1heGltdW1DYXB0dXJlSWQpIHtcbiAgICAgICAgICBtYXhpbXVtQ2FwdHVyZUlkID0gbnVtZXJpY0NhcHR1cmVJZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gbWF4aW11bUNhcHR1cmVJZDsgaSsrKSB7XG4gICAgICAgIHJbaV0gPSBudWxsO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBjYXB0dXJlSWQgaW4gY2FwdHVyZXMpIHtcbiAgICAgICAgaWYgKGNhcHR1cmVJZCA9PT0gXCIkdnNjb2RlVGV4dG1hdGVMb2NhdGlvblwiKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbnVtZXJpY0NhcHR1cmVJZCA9IHBhcnNlSW50KGNhcHR1cmVJZCwgMTApO1xuICAgICAgICBsZXQgcmV0b2tlbml6ZUNhcHR1cmVkV2l0aFJ1bGVJZCA9IDA7XG4gICAgICAgIGlmIChjYXB0dXJlc1tjYXB0dXJlSWRdLnBhdHRlcm5zKSB7XG4gICAgICAgICAgcmV0b2tlbml6ZUNhcHR1cmVkV2l0aFJ1bGVJZCA9IF9SdWxlRmFjdG9yeS5nZXRDb21waWxlZFJ1bGVJZChjYXB0dXJlc1tjYXB0dXJlSWRdLCBoZWxwZXIsIHJlcG9zaXRvcnkpO1xuICAgICAgICB9XG4gICAgICAgIHJbbnVtZXJpY0NhcHR1cmVJZF0gPSBfUnVsZUZhY3RvcnkuY3JlYXRlQ2FwdHVyZVJ1bGUoaGVscGVyLCBjYXB0dXJlc1tjYXB0dXJlSWRdLiR2c2NvZGVUZXh0bWF0ZUxvY2F0aW9uLCBjYXB0dXJlc1tjYXB0dXJlSWRdLm5hbWUsIGNhcHR1cmVzW2NhcHR1cmVJZF0uY29udGVudE5hbWUsIHJldG9rZW5pemVDYXB0dXJlZFdpdGhSdWxlSWQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcjtcbiAgfVxuICBzdGF0aWMgX2NvbXBpbGVQYXR0ZXJucyhwYXR0ZXJucywgaGVscGVyLCByZXBvc2l0b3J5KSB7XG4gICAgbGV0IHIgPSBbXTtcbiAgICBpZiAocGF0dGVybnMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBwYXR0ZXJucy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjb25zdCBwYXR0ZXJuID0gcGF0dGVybnNbaV07XG4gICAgICAgIGxldCBydWxlSWQgPSAtMTtcbiAgICAgICAgaWYgKHBhdHRlcm4uaW5jbHVkZSkge1xuICAgICAgICAgIGNvbnN0IHJlZmVyZW5jZSA9IHBhcnNlSW5jbHVkZShwYXR0ZXJuLmluY2x1ZGUpO1xuICAgICAgICAgIHN3aXRjaCAocmVmZXJlbmNlLmtpbmQpIHtcbiAgICAgICAgICAgIGNhc2UgMCAvKiBCYXNlICovOlxuICAgICAgICAgICAgY2FzZSAxIC8qIFNlbGYgKi86XG4gICAgICAgICAgICAgIHJ1bGVJZCA9IF9SdWxlRmFjdG9yeS5nZXRDb21waWxlZFJ1bGVJZChyZXBvc2l0b3J5W3BhdHRlcm4uaW5jbHVkZV0sIGhlbHBlciwgcmVwb3NpdG9yeSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyIC8qIFJlbGF0aXZlUmVmZXJlbmNlICovOlxuICAgICAgICAgICAgICBsZXQgbG9jYWxJbmNsdWRlZFJ1bGUgPSByZXBvc2l0b3J5W3JlZmVyZW5jZS5ydWxlTmFtZV07XG4gICAgICAgICAgICAgIGlmIChsb2NhbEluY2x1ZGVkUnVsZSkge1xuICAgICAgICAgICAgICAgIHJ1bGVJZCA9IF9SdWxlRmFjdG9yeS5nZXRDb21waWxlZFJ1bGVJZChsb2NhbEluY2x1ZGVkUnVsZSwgaGVscGVyLCByZXBvc2l0b3J5KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMyAvKiBUb3BMZXZlbFJlZmVyZW5jZSAqLzpcbiAgICAgICAgICAgIGNhc2UgNCAvKiBUb3BMZXZlbFJlcG9zaXRvcnlSZWZlcmVuY2UgKi86XG4gICAgICAgICAgICAgIGNvbnN0IGV4dGVybmFsR3JhbW1hck5hbWUgPSByZWZlcmVuY2Uuc2NvcGVOYW1lO1xuICAgICAgICAgICAgICBjb25zdCBleHRlcm5hbEdyYW1tYXJJbmNsdWRlID0gcmVmZXJlbmNlLmtpbmQgPT09IDQgLyogVG9wTGV2ZWxSZXBvc2l0b3J5UmVmZXJlbmNlICovID8gcmVmZXJlbmNlLnJ1bGVOYW1lIDogbnVsbDtcbiAgICAgICAgICAgICAgY29uc3QgZXh0ZXJuYWxHcmFtbWFyID0gaGVscGVyLmdldEV4dGVybmFsR3JhbW1hcihleHRlcm5hbEdyYW1tYXJOYW1lLCByZXBvc2l0b3J5KTtcbiAgICAgICAgICAgICAgaWYgKGV4dGVybmFsR3JhbW1hcikge1xuICAgICAgICAgICAgICAgIGlmIChleHRlcm5hbEdyYW1tYXJJbmNsdWRlKSB7XG4gICAgICAgICAgICAgICAgICBsZXQgZXh0ZXJuYWxJbmNsdWRlZFJ1bGUgPSBleHRlcm5hbEdyYW1tYXIucmVwb3NpdG9yeVtleHRlcm5hbEdyYW1tYXJJbmNsdWRlXTtcbiAgICAgICAgICAgICAgICAgIGlmIChleHRlcm5hbEluY2x1ZGVkUnVsZSkge1xuICAgICAgICAgICAgICAgICAgICBydWxlSWQgPSBfUnVsZUZhY3RvcnkuZ2V0Q29tcGlsZWRSdWxlSWQoZXh0ZXJuYWxJbmNsdWRlZFJ1bGUsIGhlbHBlciwgZXh0ZXJuYWxHcmFtbWFyLnJlcG9zaXRvcnkpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcnVsZUlkID0gX1J1bGVGYWN0b3J5LmdldENvbXBpbGVkUnVsZUlkKGV4dGVybmFsR3JhbW1hci5yZXBvc2l0b3J5LiRzZWxmLCBoZWxwZXIsIGV4dGVybmFsR3JhbW1hci5yZXBvc2l0b3J5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJ1bGVJZCA9IF9SdWxlRmFjdG9yeS5nZXRDb21waWxlZFJ1bGVJZChwYXR0ZXJuLCBoZWxwZXIsIHJlcG9zaXRvcnkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChydWxlSWQgIT09IC0xKSB7XG4gICAgICAgICAgY29uc3QgcnVsZSA9IGhlbHBlci5nZXRSdWxlKHJ1bGVJZCk7XG4gICAgICAgICAgbGV0IHNraXBSdWxlID0gZmFsc2U7XG4gICAgICAgICAgaWYgKHJ1bGUgaW5zdGFuY2VvZiBJbmNsdWRlT25seVJ1bGUgfHwgcnVsZSBpbnN0YW5jZW9mIEJlZ2luRW5kUnVsZSB8fCBydWxlIGluc3RhbmNlb2YgQmVnaW5XaGlsZVJ1bGUpIHtcbiAgICAgICAgICAgIGlmIChydWxlLmhhc01pc3NpbmdQYXR0ZXJucyAmJiBydWxlLnBhdHRlcm5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICBza2lwUnVsZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChza2lwUnVsZSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHIucHVzaChydWxlSWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBwYXR0ZXJuczogcixcbiAgICAgIGhhc01pc3NpbmdQYXR0ZXJuczogKHBhdHRlcm5zID8gcGF0dGVybnMubGVuZ3RoIDogMCkgIT09IHIubGVuZ3RoXG4gICAgfTtcbiAgfVxufTtcbnZhciBSZWdFeHBTb3VyY2UgPSBjbGFzcyBfUmVnRXhwU291cmNlIHtcbiAgc291cmNlO1xuICBydWxlSWQ7XG4gIGhhc0FuY2hvcjtcbiAgaGFzQmFja1JlZmVyZW5jZXM7XG4gIF9hbmNob3JDYWNoZTtcbiAgY29uc3RydWN0b3IocmVnRXhwU291cmNlLCBydWxlSWQpIHtcbiAgICBpZiAocmVnRXhwU291cmNlICYmIHR5cGVvZiByZWdFeHBTb3VyY2UgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IGxlbiA9IHJlZ0V4cFNvdXJjZS5sZW5ndGg7XG4gICAgICBsZXQgbGFzdFB1c2hlZFBvcyA9IDA7XG4gICAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgICBsZXQgaGFzQW5jaG9yID0gZmFsc2U7XG4gICAgICBmb3IgKGxldCBwb3MgPSAwOyBwb3MgPCBsZW47IHBvcysrKSB7XG4gICAgICAgIGNvbnN0IGNoID0gcmVnRXhwU291cmNlLmNoYXJBdChwb3MpO1xuICAgICAgICBpZiAoY2ggPT09IFwiXFxcXFwiKSB7XG4gICAgICAgICAgaWYgKHBvcyArIDEgPCBsZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRDaCA9IHJlZ0V4cFNvdXJjZS5jaGFyQXQocG9zICsgMSk7XG4gICAgICAgICAgICBpZiAobmV4dENoID09PSBcInpcIikge1xuICAgICAgICAgICAgICBvdXRwdXQucHVzaChyZWdFeHBTb3VyY2Uuc3Vic3RyaW5nKGxhc3RQdXNoZWRQb3MsIHBvcykpO1xuICAgICAgICAgICAgICBvdXRwdXQucHVzaChcIiQoPyFcXFxcbikoPzwhXFxcXG4pXCIpO1xuICAgICAgICAgICAgICBsYXN0UHVzaGVkUG9zID0gcG9zICsgMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dENoID09PSBcIkFcIiB8fCBuZXh0Q2ggPT09IFwiR1wiKSB7XG4gICAgICAgICAgICAgIGhhc0FuY2hvciA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuaGFzQW5jaG9yID0gaGFzQW5jaG9yO1xuICAgICAgaWYgKGxhc3RQdXNoZWRQb3MgPT09IDApIHtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSByZWdFeHBTb3VyY2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXRwdXQucHVzaChyZWdFeHBTb3VyY2Uuc3Vic3RyaW5nKGxhc3RQdXNoZWRQb3MsIGxlbikpO1xuICAgICAgICB0aGlzLnNvdXJjZSA9IG91dHB1dC5qb2luKFwiXCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhhc0FuY2hvciA9IGZhbHNlO1xuICAgICAgdGhpcy5zb3VyY2UgPSByZWdFeHBTb3VyY2U7XG4gICAgfVxuICAgIGlmICh0aGlzLmhhc0FuY2hvcikge1xuICAgICAgdGhpcy5fYW5jaG9yQ2FjaGUgPSB0aGlzLl9idWlsZEFuY2hvckNhY2hlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2FuY2hvckNhY2hlID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5ydWxlSWQgPSBydWxlSWQ7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNvdXJjZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhpcy5oYXNCYWNrUmVmZXJlbmNlcyA9IEhBU19CQUNLX1JFRkVSRU5DRVMudGVzdCh0aGlzLnNvdXJjZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGFzQmFja1JlZmVyZW5jZXMgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBfUmVnRXhwU291cmNlKHRoaXMuc291cmNlLCB0aGlzLnJ1bGVJZCk7XG4gIH1cbiAgc2V0U291cmNlKG5ld1NvdXJjZSkge1xuICAgIGlmICh0aGlzLnNvdXJjZSA9PT0gbmV3U291cmNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc291cmNlID0gbmV3U291cmNlO1xuICAgIGlmICh0aGlzLmhhc0FuY2hvcikge1xuICAgICAgdGhpcy5fYW5jaG9yQ2FjaGUgPSB0aGlzLl9idWlsZEFuY2hvckNhY2hlKCk7XG4gICAgfVxuICB9XG4gIHJlc29sdmVCYWNrUmVmZXJlbmNlcyhsaW5lVGV4dCwgY2FwdHVyZUluZGljZXMpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuc291cmNlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIG1ldGhvZCBzaG91bGQgb25seSBiZSBjYWxsZWQgaWYgdGhlIHNvdXJjZSBpcyBhIHN0cmluZ1wiKTtcbiAgICB9XG4gICAgbGV0IGNhcHR1cmVkVmFsdWVzID0gY2FwdHVyZUluZGljZXMubWFwKChjYXB0dXJlKSA9PiB7XG4gICAgICByZXR1cm4gbGluZVRleHQuc3Vic3RyaW5nKGNhcHR1cmUuc3RhcnQsIGNhcHR1cmUuZW5kKTtcbiAgICB9KTtcbiAgICBCQUNLX1JFRkVSRU5DSU5HX0VORC5sYXN0SW5kZXggPSAwO1xuICAgIHJldHVybiB0aGlzLnNvdXJjZS5yZXBsYWNlKEJBQ0tfUkVGRVJFTkNJTkdfRU5ELCAobWF0Y2gsIGcxKSA9PiB7XG4gICAgICByZXR1cm4gZXNjYXBlUmVnRXhwQ2hhcmFjdGVycyhjYXB0dXJlZFZhbHVlc1twYXJzZUludChnMSwgMTApXSB8fCBcIlwiKTtcbiAgICB9KTtcbiAgfVxuICBfYnVpbGRBbmNob3JDYWNoZSgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuc291cmNlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIG1ldGhvZCBzaG91bGQgb25seSBiZSBjYWxsZWQgaWYgdGhlIHNvdXJjZSBpcyBhIHN0cmluZ1wiKTtcbiAgICB9XG4gICAgbGV0IEEwX0cwX3Jlc3VsdCA9IFtdO1xuICAgIGxldCBBMF9HMV9yZXN1bHQgPSBbXTtcbiAgICBsZXQgQTFfRzBfcmVzdWx0ID0gW107XG4gICAgbGV0IEExX0cxX3Jlc3VsdCA9IFtdO1xuICAgIGxldCBwb3MsIGxlbiwgY2gsIG5leHRDaDtcbiAgICBmb3IgKHBvcyA9IDAsIGxlbiA9IHRoaXMuc291cmNlLmxlbmd0aDsgcG9zIDwgbGVuOyBwb3MrKykge1xuICAgICAgY2ggPSB0aGlzLnNvdXJjZS5jaGFyQXQocG9zKTtcbiAgICAgIEEwX0cwX3Jlc3VsdFtwb3NdID0gY2g7XG4gICAgICBBMF9HMV9yZXN1bHRbcG9zXSA9IGNoO1xuICAgICAgQTFfRzBfcmVzdWx0W3Bvc10gPSBjaDtcbiAgICAgIEExX0cxX3Jlc3VsdFtwb3NdID0gY2g7XG4gICAgICBpZiAoY2ggPT09IFwiXFxcXFwiKSB7XG4gICAgICAgIGlmIChwb3MgKyAxIDwgbGVuKSB7XG4gICAgICAgICAgbmV4dENoID0gdGhpcy5zb3VyY2UuY2hhckF0KHBvcyArIDEpO1xuICAgICAgICAgIGlmIChuZXh0Q2ggPT09IFwiQVwiKSB7XG4gICAgICAgICAgICBBMF9HMF9yZXN1bHRbcG9zICsgMV0gPSBcIlxcdUZGRkZcIjtcbiAgICAgICAgICAgIEEwX0cxX3Jlc3VsdFtwb3MgKyAxXSA9IFwiXFx1RkZGRlwiO1xuICAgICAgICAgICAgQTFfRzBfcmVzdWx0W3BvcyArIDFdID0gXCJBXCI7XG4gICAgICAgICAgICBBMV9HMV9yZXN1bHRbcG9zICsgMV0gPSBcIkFcIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKG5leHRDaCA9PT0gXCJHXCIpIHtcbiAgICAgICAgICAgIEEwX0cwX3Jlc3VsdFtwb3MgKyAxXSA9IFwiXFx1RkZGRlwiO1xuICAgICAgICAgICAgQTBfRzFfcmVzdWx0W3BvcyArIDFdID0gXCJHXCI7XG4gICAgICAgICAgICBBMV9HMF9yZXN1bHRbcG9zICsgMV0gPSBcIlxcdUZGRkZcIjtcbiAgICAgICAgICAgIEExX0cxX3Jlc3VsdFtwb3MgKyAxXSA9IFwiR1wiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBBMF9HMF9yZXN1bHRbcG9zICsgMV0gPSBuZXh0Q2g7XG4gICAgICAgICAgICBBMF9HMV9yZXN1bHRbcG9zICsgMV0gPSBuZXh0Q2g7XG4gICAgICAgICAgICBBMV9HMF9yZXN1bHRbcG9zICsgMV0gPSBuZXh0Q2g7XG4gICAgICAgICAgICBBMV9HMV9yZXN1bHRbcG9zICsgMV0gPSBuZXh0Q2g7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBvcysrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBBMF9HMDogQTBfRzBfcmVzdWx0LmpvaW4oXCJcIiksXG4gICAgICBBMF9HMTogQTBfRzFfcmVzdWx0LmpvaW4oXCJcIiksXG4gICAgICBBMV9HMDogQTFfRzBfcmVzdWx0LmpvaW4oXCJcIiksXG4gICAgICBBMV9HMTogQTFfRzFfcmVzdWx0LmpvaW4oXCJcIilcbiAgICB9O1xuICB9XG4gIHJlc29sdmVBbmNob3JzKGFsbG93QSwgYWxsb3dHKSB7XG4gICAgaWYgKCF0aGlzLmhhc0FuY2hvciB8fCAhdGhpcy5fYW5jaG9yQ2FjaGUgfHwgdHlwZW9mIHRoaXMuc291cmNlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gdGhpcy5zb3VyY2U7XG4gICAgfVxuICAgIGlmIChhbGxvd0EpIHtcbiAgICAgIGlmIChhbGxvd0cpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuY2hvckNhY2hlLkExX0cxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuY2hvckNhY2hlLkExX0cwO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYWxsb3dHKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbmNob3JDYWNoZS5BMF9HMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbmNob3JDYWNoZS5BMF9HMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG52YXIgUmVnRXhwU291cmNlTGlzdCA9IGNsYXNzIHtcbiAgX2l0ZW1zO1xuICBfaGFzQW5jaG9ycztcbiAgX2NhY2hlZDtcbiAgX2FuY2hvckNhY2hlO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9pdGVtcyA9IFtdO1xuICAgIHRoaXMuX2hhc0FuY2hvcnMgPSBmYWxzZTtcbiAgICB0aGlzLl9jYWNoZWQgPSBudWxsO1xuICAgIHRoaXMuX2FuY2hvckNhY2hlID0ge1xuICAgICAgQTBfRzA6IG51bGwsXG4gICAgICBBMF9HMTogbnVsbCxcbiAgICAgIEExX0cwOiBudWxsLFxuICAgICAgQTFfRzE6IG51bGxcbiAgICB9O1xuICB9XG4gIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy5fZGlzcG9zZUNhY2hlcygpO1xuICB9XG4gIF9kaXNwb3NlQ2FjaGVzKCkge1xuICAgIGlmICh0aGlzLl9jYWNoZWQpIHtcbiAgICAgIHRoaXMuX2NhY2hlZC5kaXNwb3NlKCk7XG4gICAgICB0aGlzLl9jYWNoZWQgPSBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5fYW5jaG9yQ2FjaGUuQTBfRzApIHtcbiAgICAgIHRoaXMuX2FuY2hvckNhY2hlLkEwX0cwLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMuX2FuY2hvckNhY2hlLkEwX0cwID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2FuY2hvckNhY2hlLkEwX0cxKSB7XG4gICAgICB0aGlzLl9hbmNob3JDYWNoZS5BMF9HMS5kaXNwb3NlKCk7XG4gICAgICB0aGlzLl9hbmNob3JDYWNoZS5BMF9HMSA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLl9hbmNob3JDYWNoZS5BMV9HMCkge1xuICAgICAgdGhpcy5fYW5jaG9yQ2FjaGUuQTFfRzAuZGlzcG9zZSgpO1xuICAgICAgdGhpcy5fYW5jaG9yQ2FjaGUuQTFfRzAgPSBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5fYW5jaG9yQ2FjaGUuQTFfRzEpIHtcbiAgICAgIHRoaXMuX2FuY2hvckNhY2hlLkExX0cxLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMuX2FuY2hvckNhY2hlLkExX0cxID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgcHVzaChpdGVtKSB7XG4gICAgdGhpcy5faXRlbXMucHVzaChpdGVtKTtcbiAgICB0aGlzLl9oYXNBbmNob3JzID0gdGhpcy5faGFzQW5jaG9ycyB8fCBpdGVtLmhhc0FuY2hvcjtcbiAgfVxuICB1bnNoaWZ0KGl0ZW0pIHtcbiAgICB0aGlzLl9pdGVtcy51bnNoaWZ0KGl0ZW0pO1xuICAgIHRoaXMuX2hhc0FuY2hvcnMgPSB0aGlzLl9oYXNBbmNob3JzIHx8IGl0ZW0uaGFzQW5jaG9yO1xuICB9XG4gIGxlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5faXRlbXMubGVuZ3RoO1xuICB9XG4gIHNldFNvdXJjZShpbmRleCwgbmV3U291cmNlKSB7XG4gICAgaWYgKHRoaXMuX2l0ZW1zW2luZGV4XS5zb3VyY2UgIT09IG5ld1NvdXJjZSkge1xuICAgICAgdGhpcy5fZGlzcG9zZUNhY2hlcygpO1xuICAgICAgdGhpcy5faXRlbXNbaW5kZXhdLnNldFNvdXJjZShuZXdTb3VyY2UpO1xuICAgIH1cbiAgfVxuICBjb21waWxlKG9uaWdMaWIpIHtcbiAgICBpZiAoIXRoaXMuX2NhY2hlZCkge1xuICAgICAgbGV0IHJlZ0V4cHMgPSB0aGlzLl9pdGVtcy5tYXAoKGUpID0+IGUuc291cmNlKTtcbiAgICAgIHRoaXMuX2NhY2hlZCA9IG5ldyBDb21waWxlZFJ1bGUob25pZ0xpYiwgcmVnRXhwcywgdGhpcy5faXRlbXMubWFwKChlKSA9PiBlLnJ1bGVJZCkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY2FjaGVkO1xuICB9XG4gIGNvbXBpbGVBRyhvbmlnTGliLCBhbGxvd0EsIGFsbG93Rykge1xuICAgIGlmICghdGhpcy5faGFzQW5jaG9ycykge1xuICAgICAgcmV0dXJuIHRoaXMuY29tcGlsZShvbmlnTGliKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGFsbG93QSkge1xuICAgICAgICBpZiAoYWxsb3dHKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLl9hbmNob3JDYWNoZS5BMV9HMSkge1xuICAgICAgICAgICAgdGhpcy5fYW5jaG9yQ2FjaGUuQTFfRzEgPSB0aGlzLl9yZXNvbHZlQW5jaG9ycyhvbmlnTGliLCBhbGxvd0EsIGFsbG93Ryk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLl9hbmNob3JDYWNoZS5BMV9HMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIXRoaXMuX2FuY2hvckNhY2hlLkExX0cwKSB7XG4gICAgICAgICAgICB0aGlzLl9hbmNob3JDYWNoZS5BMV9HMCA9IHRoaXMuX3Jlc29sdmVBbmNob3JzKG9uaWdMaWIsIGFsbG93QSwgYWxsb3dHKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2FuY2hvckNhY2hlLkExX0cwO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoYWxsb3dHKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLl9hbmNob3JDYWNoZS5BMF9HMSkge1xuICAgICAgICAgICAgdGhpcy5fYW5jaG9yQ2FjaGUuQTBfRzEgPSB0aGlzLl9yZXNvbHZlQW5jaG9ycyhvbmlnTGliLCBhbGxvd0EsIGFsbG93Ryk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLl9hbmNob3JDYWNoZS5BMF9HMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIXRoaXMuX2FuY2hvckNhY2hlLkEwX0cwKSB7XG4gICAgICAgICAgICB0aGlzLl9hbmNob3JDYWNoZS5BMF9HMCA9IHRoaXMuX3Jlc29sdmVBbmNob3JzKG9uaWdMaWIsIGFsbG93QSwgYWxsb3dHKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2FuY2hvckNhY2hlLkEwX0cwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIF9yZXNvbHZlQW5jaG9ycyhvbmlnTGliLCBhbGxvd0EsIGFsbG93Rykge1xuICAgIGxldCByZWdFeHBzID0gdGhpcy5faXRlbXMubWFwKChlKSA9PiBlLnJlc29sdmVBbmNob3JzKGFsbG93QSwgYWxsb3dHKSk7XG4gICAgcmV0dXJuIG5ldyBDb21waWxlZFJ1bGUob25pZ0xpYiwgcmVnRXhwcywgdGhpcy5faXRlbXMubWFwKChlKSA9PiBlLnJ1bGVJZCkpO1xuICB9XG59O1xudmFyIENvbXBpbGVkUnVsZSA9IGNsYXNzIHtcbiAgY29uc3RydWN0b3Iob25pZ0xpYiwgcmVnRXhwcywgcnVsZXMpIHtcbiAgICB0aGlzLnJlZ0V4cHMgPSByZWdFeHBzO1xuICAgIHRoaXMucnVsZXMgPSBydWxlcztcbiAgICB0aGlzLnNjYW5uZXIgPSBvbmlnTGliLmNyZWF0ZU9uaWdTY2FubmVyKHJlZ0V4cHMpO1xuICB9XG4gIHNjYW5uZXI7XG4gIGRpc3Bvc2UoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNjYW5uZXIuZGlzcG9zZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aGlzLnNjYW5uZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgfVxuICB0b1N0cmluZygpIHtcbiAgICBjb25zdCByID0gW107XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMucnVsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHIucHVzaChcIiAgIC0gXCIgKyB0aGlzLnJ1bGVzW2ldICsgXCI6IFwiICsgdGhpcy5yZWdFeHBzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHIuam9pbihcIlxcblwiKTtcbiAgfVxuICBmaW5kTmV4dE1hdGNoU3luYyhzdHJpbmcsIHN0YXJ0UG9zaXRpb24sIG9wdGlvbnMpIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnNjYW5uZXIuZmluZE5leHRNYXRjaFN5bmMoc3RyaW5nLCBzdGFydFBvc2l0aW9uLCBvcHRpb25zKTtcbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBydWxlSWQ6IHRoaXMucnVsZXNbcmVzdWx0LmluZGV4XSxcbiAgICAgIGNhcHR1cmVJbmRpY2VzOiByZXN1bHQuY2FwdHVyZUluZGljZXNcbiAgICB9O1xuICB9XG59O1xuXG4vLyBzcmMvZ3JhbW1hci9iYXNpY1Njb3Blc0F0dHJpYnV0ZVByb3ZpZGVyLnRzXG52YXIgQmFzaWNTY29wZUF0dHJpYnV0ZXMgPSBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKGxhbmd1YWdlSWQsIHRva2VuVHlwZSkge1xuICAgIHRoaXMubGFuZ3VhZ2VJZCA9IGxhbmd1YWdlSWQ7XG4gICAgdGhpcy50b2tlblR5cGUgPSB0b2tlblR5cGU7XG4gIH1cbn07XG52YXIgQmFzaWNTY29wZUF0dHJpYnV0ZXNQcm92aWRlciA9IGNsYXNzIF9CYXNpY1Njb3BlQXR0cmlidXRlc1Byb3ZpZGVyIHtcbiAgX2RlZmF1bHRBdHRyaWJ1dGVzO1xuICBfZW1iZWRkZWRMYW5ndWFnZXNNYXRjaGVyO1xuICBjb25zdHJ1Y3Rvcihpbml0aWFsTGFuZ3VhZ2VJZCwgZW1iZWRkZWRMYW5ndWFnZXMpIHtcbiAgICB0aGlzLl9kZWZhdWx0QXR0cmlidXRlcyA9IG5ldyBCYXNpY1Njb3BlQXR0cmlidXRlcyhpbml0aWFsTGFuZ3VhZ2VJZCwgOCAvKiBOb3RTZXQgKi8pO1xuICAgIHRoaXMuX2VtYmVkZGVkTGFuZ3VhZ2VzTWF0Y2hlciA9IG5ldyBTY29wZU1hdGNoZXIoT2JqZWN0LmVudHJpZXMoZW1iZWRkZWRMYW5ndWFnZXMgfHwge30pKTtcbiAgfVxuICBnZXREZWZhdWx0QXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZGVmYXVsdEF0dHJpYnV0ZXM7XG4gIH1cbiAgZ2V0QmFzaWNTY29wZUF0dHJpYnV0ZXMoc2NvcGVOYW1lKSB7XG4gICAgaWYgKHNjb3BlTmFtZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIF9CYXNpY1Njb3BlQXR0cmlidXRlc1Byb3ZpZGVyLl9OVUxMX1NDT1BFX01FVEFEQVRBO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZ2V0QmFzaWNTY29wZUF0dHJpYnV0ZXMuZ2V0KHNjb3BlTmFtZSk7XG4gIH1cbiAgc3RhdGljIF9OVUxMX1NDT1BFX01FVEFEQVRBID0gbmV3IEJhc2ljU2NvcGVBdHRyaWJ1dGVzKDAsIDApO1xuICBfZ2V0QmFzaWNTY29wZUF0dHJpYnV0ZXMgPSBuZXcgQ2FjaGVkRm4oKHNjb3BlTmFtZSkgPT4ge1xuICAgIGNvbnN0IGxhbmd1YWdlSWQgPSB0aGlzLl9zY29wZVRvTGFuZ3VhZ2Uoc2NvcGVOYW1lKTtcbiAgICBjb25zdCBzdGFuZGFyZFRva2VuVHlwZSA9IHRoaXMuX3RvU3RhbmRhcmRUb2tlblR5cGUoc2NvcGVOYW1lKTtcbiAgICByZXR1cm4gbmV3IEJhc2ljU2NvcGVBdHRyaWJ1dGVzKGxhbmd1YWdlSWQsIHN0YW5kYXJkVG9rZW5UeXBlKTtcbiAgfSk7XG4gIC8qKlxuICAgKiBHaXZlbiBhIHByb2R1Y2VkIFRNIHNjb3BlLCByZXR1cm4gdGhlIGxhbmd1YWdlIHRoYXQgdG9rZW4gZGVzY3JpYmVzIG9yIG51bGwgaWYgdW5rbm93bi5cbiAgICogZS5nLiBzb3VyY2UuaHRtbCA9PiBodG1sLCBzb3VyY2UuY3NzLmVtYmVkZGVkLmh0bWwgPT4gY3NzLCBwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5odG1sID0+IG51bGxcbiAgICovXG4gIF9zY29wZVRvTGFuZ3VhZ2Uoc2NvcGUpIHtcbiAgICByZXR1cm4gdGhpcy5fZW1iZWRkZWRMYW5ndWFnZXNNYXRjaGVyLm1hdGNoKHNjb3BlKSB8fCAwO1xuICB9XG4gIF90b1N0YW5kYXJkVG9rZW5UeXBlKHNjb3BlTmFtZSkge1xuICAgIGNvbnN0IG0gPSBzY29wZU5hbWUubWF0Y2goX0Jhc2ljU2NvcGVBdHRyaWJ1dGVzUHJvdmlkZXIuU1RBTkRBUkRfVE9LRU5fVFlQRV9SRUdFWFApO1xuICAgIGlmICghbSkge1xuICAgICAgcmV0dXJuIDggLyogTm90U2V0ICovO1xuICAgIH1cbiAgICBzd2l0Y2ggKG1bMV0pIHtcbiAgICAgIGNhc2UgXCJjb21tZW50XCI6XG4gICAgICAgIHJldHVybiAxIC8qIENvbW1lbnQgKi87XG4gICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgIHJldHVybiAyIC8qIFN0cmluZyAqLztcbiAgICAgIGNhc2UgXCJyZWdleFwiOlxuICAgICAgICByZXR1cm4gMyAvKiBSZWdFeCAqLztcbiAgICAgIGNhc2UgXCJtZXRhLmVtYmVkZGVkXCI6XG4gICAgICAgIHJldHVybiAwIC8qIE90aGVyICovO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIG1hdGNoIGZvciBzdGFuZGFyZCB0b2tlbiB0eXBlIVwiKTtcbiAgfVxuICBzdGF0aWMgU1RBTkRBUkRfVE9LRU5fVFlQRV9SRUdFWFAgPSAvXFxiKGNvbW1lbnR8c3RyaW5nfHJlZ2V4fG1ldGFcXC5lbWJlZGRlZClcXGIvO1xufTtcbnZhciBTY29wZU1hdGNoZXIgPSBjbGFzcyB7XG4gIHZhbHVlcztcbiAgc2NvcGVzUmVnRXhwO1xuICBjb25zdHJ1Y3Rvcih2YWx1ZXMpIHtcbiAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy52YWx1ZXMgPSBudWxsO1xuICAgICAgdGhpcy5zY29wZXNSZWdFeHAgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbHVlcyA9IG5ldyBNYXAodmFsdWVzKTtcbiAgICAgIGNvbnN0IGVzY2FwZWRTY29wZXMgPSB2YWx1ZXMubWFwKFxuICAgICAgICAoW3Njb3BlTmFtZSwgdmFsdWVdKSA9PiBlc2NhcGVSZWdFeHBDaGFyYWN0ZXJzKHNjb3BlTmFtZSlcbiAgICAgICk7XG4gICAgICBlc2NhcGVkU2NvcGVzLnNvcnQoKTtcbiAgICAgIGVzY2FwZWRTY29wZXMucmV2ZXJzZSgpO1xuICAgICAgdGhpcy5zY29wZXNSZWdFeHAgPSBuZXcgUmVnRXhwKFxuICAgICAgICBgXigoJHtlc2NhcGVkU2NvcGVzLmpvaW4oXCIpfChcIil9KSkoJHxcXFxcLilgLFxuICAgICAgICBcIlwiXG4gICAgICApO1xuICAgIH1cbiAgfVxuICBtYXRjaChzY29wZSkge1xuICAgIGlmICghdGhpcy5zY29wZXNSZWdFeHApIHtcbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuICAgIGNvbnN0IG0gPSBzY29wZS5tYXRjaCh0aGlzLnNjb3Blc1JlZ0V4cCk7XG4gICAgaWYgKCFtKSB7XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy52YWx1ZXMuZ2V0KG1bMV0pO1xuICB9XG59O1xuXG4vLyBzcmMvZGVidWcudHNcbnZhciBEZWJ1Z0ZsYWdzID0ge1xuICBJbkRlYnVnTW9kZTogdHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgISFwcm9jZXNzLmVudltcIlZTQ09ERV9URVhUTUFURV9ERUJVR1wiXVxufTtcbnZhciBVc2VPbmlndXJ1bWFGaW5kT3B0aW9ucyA9IGZhbHNlO1xuXG4vLyBzcmMvZ3JhbW1hci90b2tlbml6ZVN0cmluZy50c1xudmFyIFRva2VuaXplU3RyaW5nUmVzdWx0ID0gY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihzdGFjaywgc3RvcHBlZEVhcmx5KSB7XG4gICAgdGhpcy5zdGFjayA9IHN0YWNrO1xuICAgIHRoaXMuc3RvcHBlZEVhcmx5ID0gc3RvcHBlZEVhcmx5O1xuICB9XG59O1xuZnVuY3Rpb24gX3Rva2VuaXplU3RyaW5nKGdyYW1tYXIsIGxpbmVUZXh0LCBpc0ZpcnN0TGluZSwgbGluZVBvcywgc3RhY2ssIGxpbmVUb2tlbnMsIGNoZWNrV2hpbGVDb25kaXRpb25zLCB0aW1lTGltaXQpIHtcbiAgY29uc3QgbGluZUxlbmd0aCA9IGxpbmVUZXh0LmNvbnRlbnQubGVuZ3RoO1xuICBsZXQgU1RPUCA9IGZhbHNlO1xuICBsZXQgYW5jaG9yUG9zaXRpb24gPSAtMTtcbiAgaWYgKGNoZWNrV2hpbGVDb25kaXRpb25zKSB7XG4gICAgY29uc3Qgd2hpbGVDaGVja1Jlc3VsdCA9IF9jaGVja1doaWxlQ29uZGl0aW9ucyhcbiAgICAgIGdyYW1tYXIsXG4gICAgICBsaW5lVGV4dCxcbiAgICAgIGlzRmlyc3RMaW5lLFxuICAgICAgbGluZVBvcyxcbiAgICAgIHN0YWNrLFxuICAgICAgbGluZVRva2Vuc1xuICAgICk7XG4gICAgc3RhY2sgPSB3aGlsZUNoZWNrUmVzdWx0LnN0YWNrO1xuICAgIGxpbmVQb3MgPSB3aGlsZUNoZWNrUmVzdWx0LmxpbmVQb3M7XG4gICAgaXNGaXJzdExpbmUgPSB3aGlsZUNoZWNrUmVzdWx0LmlzRmlyc3RMaW5lO1xuICAgIGFuY2hvclBvc2l0aW9uID0gd2hpbGVDaGVja1Jlc3VsdC5hbmNob3JQb3NpdGlvbjtcbiAgfVxuICBjb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICB3aGlsZSAoIVNUT1ApIHtcbiAgICBpZiAodGltZUxpbWl0ICE9PSAwKSB7XG4gICAgICBjb25zdCBlbGFwc2VkVGltZSA9IERhdGUubm93KCkgLSBzdGFydFRpbWU7XG4gICAgICBpZiAoZWxhcHNlZFRpbWUgPiB0aW1lTGltaXQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUb2tlbml6ZVN0cmluZ1Jlc3VsdChzdGFjaywgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHNjYW5OZXh0KCk7XG4gIH1cbiAgcmV0dXJuIG5ldyBUb2tlbml6ZVN0cmluZ1Jlc3VsdChzdGFjaywgZmFsc2UpO1xuICBmdW5jdGlvbiBzY2FuTmV4dCgpIHtcbiAgICBpZiAoZmFsc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiXCIpO1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGBAQHNjYW5OZXh0ICR7bGluZVBvc306IHwke2xpbmVUZXh0LmNvbnRlbnQuc3Vic3RyKGxpbmVQb3MpLnJlcGxhY2UoL1xcbiQvLCBcIlxcXFxuXCIpfXxgXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCByID0gbWF0Y2hSdWxlT3JJbmplY3Rpb25zKFxuICAgICAgZ3JhbW1hcixcbiAgICAgIGxpbmVUZXh0LFxuICAgICAgaXNGaXJzdExpbmUsXG4gICAgICBsaW5lUG9zLFxuICAgICAgc3RhY2ssXG4gICAgICBhbmNob3JQb3NpdGlvblxuICAgICk7XG4gICAgaWYgKCFyKSB7XG4gICAgICBsaW5lVG9rZW5zLnByb2R1Y2Uoc3RhY2ssIGxpbmVMZW5ndGgpO1xuICAgICAgU1RPUCA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNhcHR1cmVJbmRpY2VzID0gci5jYXB0dXJlSW5kaWNlcztcbiAgICBjb25zdCBtYXRjaGVkUnVsZUlkID0gci5tYXRjaGVkUnVsZUlkO1xuICAgIGNvbnN0IGhhc0FkdmFuY2VkID0gY2FwdHVyZUluZGljZXMgJiYgY2FwdHVyZUluZGljZXMubGVuZ3RoID4gMCA/IGNhcHR1cmVJbmRpY2VzWzBdLmVuZCA+IGxpbmVQb3MgOiBmYWxzZTtcbiAgICBpZiAobWF0Y2hlZFJ1bGVJZCA9PT0gZW5kUnVsZUlkKSB7XG4gICAgICBjb25zdCBwb3BwZWRSdWxlID0gc3RhY2suZ2V0UnVsZShncmFtbWFyKTtcbiAgICAgIGlmIChmYWxzZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIiAgcG9wcGluZyBcIiArIHBvcHBlZFJ1bGUuZGVidWdOYW1lICsgXCIgLSBcIiArIHBvcHBlZFJ1bGUuZGVidWdFbmRSZWdFeHBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGxpbmVUb2tlbnMucHJvZHVjZShzdGFjaywgY2FwdHVyZUluZGljZXNbMF0uc3RhcnQpO1xuICAgICAgc3RhY2sgPSBzdGFjay53aXRoQ29udGVudE5hbWVTY29wZXNMaXN0KHN0YWNrLm5hbWVTY29wZXNMaXN0KTtcbiAgICAgIGhhbmRsZUNhcHR1cmVzKFxuICAgICAgICBncmFtbWFyLFxuICAgICAgICBsaW5lVGV4dCxcbiAgICAgICAgaXNGaXJzdExpbmUsXG4gICAgICAgIHN0YWNrLFxuICAgICAgICBsaW5lVG9rZW5zLFxuICAgICAgICBwb3BwZWRSdWxlLmVuZENhcHR1cmVzLFxuICAgICAgICBjYXB0dXJlSW5kaWNlc1xuICAgICAgKTtcbiAgICAgIGxpbmVUb2tlbnMucHJvZHVjZShzdGFjaywgY2FwdHVyZUluZGljZXNbMF0uZW5kKTtcbiAgICAgIGNvbnN0IHBvcHBlZCA9IHN0YWNrO1xuICAgICAgc3RhY2sgPSBzdGFjay5wYXJlbnQ7XG4gICAgICBhbmNob3JQb3NpdGlvbiA9IHBvcHBlZC5nZXRBbmNob3JQb3MoKTtcbiAgICAgIGlmICghaGFzQWR2YW5jZWQgJiYgcG9wcGVkLmdldEVudGVyUG9zKCkgPT09IGxpbmVQb3MpIHtcbiAgICAgICAgaWYgKGZhbHNlKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgIFwiWzFdIC0gR3JhbW1hciBpcyBpbiBhbiBlbmRsZXNzIGxvb3AgLSBHcmFtbWFyIHB1c2hlZCAmIHBvcHBlZCBhIHJ1bGUgd2l0aG91dCBhZHZhbmNpbmdcIlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhY2sgPSBwb3BwZWQ7XG4gICAgICAgIGxpbmVUb2tlbnMucHJvZHVjZShzdGFjaywgbGluZUxlbmd0aCk7XG4gICAgICAgIFNUT1AgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IF9ydWxlID0gZ3JhbW1hci5nZXRSdWxlKG1hdGNoZWRSdWxlSWQpO1xuICAgICAgbGluZVRva2Vucy5wcm9kdWNlKHN0YWNrLCBjYXB0dXJlSW5kaWNlc1swXS5zdGFydCk7XG4gICAgICBjb25zdCBiZWZvcmVQdXNoID0gc3RhY2s7XG4gICAgICBjb25zdCBzY29wZU5hbWUgPSBfcnVsZS5nZXROYW1lKGxpbmVUZXh0LmNvbnRlbnQsIGNhcHR1cmVJbmRpY2VzKTtcbiAgICAgIGNvbnN0IG5hbWVTY29wZXNMaXN0ID0gc3RhY2suY29udGVudE5hbWVTY29wZXNMaXN0LnB1c2hBdHRyaWJ1dGVkKFxuICAgICAgICBzY29wZU5hbWUsXG4gICAgICAgIGdyYW1tYXJcbiAgICAgICk7XG4gICAgICBzdGFjayA9IHN0YWNrLnB1c2goXG4gICAgICAgIG1hdGNoZWRSdWxlSWQsXG4gICAgICAgIGxpbmVQb3MsXG4gICAgICAgIGFuY2hvclBvc2l0aW9uLFxuICAgICAgICBjYXB0dXJlSW5kaWNlc1swXS5lbmQgPT09IGxpbmVMZW5ndGgsXG4gICAgICAgIG51bGwsXG4gICAgICAgIG5hbWVTY29wZXNMaXN0LFxuICAgICAgICBuYW1lU2NvcGVzTGlzdFxuICAgICAgKTtcbiAgICAgIGlmIChfcnVsZSBpbnN0YW5jZW9mIEJlZ2luRW5kUnVsZSkge1xuICAgICAgICBjb25zdCBwdXNoZWRSdWxlID0gX3J1bGU7XG4gICAgICAgIGlmIChmYWxzZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgXCIgIHB1c2hpbmcgXCIgKyBwdXNoZWRSdWxlLmRlYnVnTmFtZSArIFwiIC0gXCIgKyBwdXNoZWRSdWxlLmRlYnVnQmVnaW5SZWdFeHBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGhhbmRsZUNhcHR1cmVzKFxuICAgICAgICAgIGdyYW1tYXIsXG4gICAgICAgICAgbGluZVRleHQsXG4gICAgICAgICAgaXNGaXJzdExpbmUsXG4gICAgICAgICAgc3RhY2ssXG4gICAgICAgICAgbGluZVRva2VucyxcbiAgICAgICAgICBwdXNoZWRSdWxlLmJlZ2luQ2FwdHVyZXMsXG4gICAgICAgICAgY2FwdHVyZUluZGljZXNcbiAgICAgICAgKTtcbiAgICAgICAgbGluZVRva2Vucy5wcm9kdWNlKHN0YWNrLCBjYXB0dXJlSW5kaWNlc1swXS5lbmQpO1xuICAgICAgICBhbmNob3JQb3NpdGlvbiA9IGNhcHR1cmVJbmRpY2VzWzBdLmVuZDtcbiAgICAgICAgY29uc3QgY29udGVudE5hbWUgPSBwdXNoZWRSdWxlLmdldENvbnRlbnROYW1lKFxuICAgICAgICAgIGxpbmVUZXh0LmNvbnRlbnQsXG4gICAgICAgICAgY2FwdHVyZUluZGljZXNcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgY29udGVudE5hbWVTY29wZXNMaXN0ID0gbmFtZVNjb3Blc0xpc3QucHVzaEF0dHJpYnV0ZWQoXG4gICAgICAgICAgY29udGVudE5hbWUsXG4gICAgICAgICAgZ3JhbW1hclxuICAgICAgICApO1xuICAgICAgICBzdGFjayA9IHN0YWNrLndpdGhDb250ZW50TmFtZVNjb3Blc0xpc3QoY29udGVudE5hbWVTY29wZXNMaXN0KTtcbiAgICAgICAgaWYgKHB1c2hlZFJ1bGUuZW5kSGFzQmFja1JlZmVyZW5jZXMpIHtcbiAgICAgICAgICBzdGFjayA9IHN0YWNrLndpdGhFbmRSdWxlKFxuICAgICAgICAgICAgcHVzaGVkUnVsZS5nZXRFbmRXaXRoUmVzb2x2ZWRCYWNrUmVmZXJlbmNlcyhcbiAgICAgICAgICAgICAgbGluZVRleHQuY29udGVudCxcbiAgICAgICAgICAgICAgY2FwdHVyZUluZGljZXNcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaGFzQWR2YW5jZWQgJiYgYmVmb3JlUHVzaC5oYXNTYW1lUnVsZUFzKHN0YWNrKSkge1xuICAgICAgICAgIGlmIChmYWxzZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgXCJbMl0gLSBHcmFtbWFyIGlzIGluIGFuIGVuZGxlc3MgbG9vcCAtIEdyYW1tYXIgcHVzaGVkIHRoZSBzYW1lIHJ1bGUgd2l0aG91dCBhZHZhbmNpbmdcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RhY2sgPSBzdGFjay5wb3AoKTtcbiAgICAgICAgICBsaW5lVG9rZW5zLnByb2R1Y2Uoc3RhY2ssIGxpbmVMZW5ndGgpO1xuICAgICAgICAgIFNUT1AgPSB0cnVlO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChfcnVsZSBpbnN0YW5jZW9mIEJlZ2luV2hpbGVSdWxlKSB7XG4gICAgICAgIGNvbnN0IHB1c2hlZFJ1bGUgPSBfcnVsZTtcbiAgICAgICAgaWYgKGZhbHNlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCIgIHB1c2hpbmcgXCIgKyBwdXNoZWRSdWxlLmRlYnVnTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaGFuZGxlQ2FwdHVyZXMoXG4gICAgICAgICAgZ3JhbW1hcixcbiAgICAgICAgICBsaW5lVGV4dCxcbiAgICAgICAgICBpc0ZpcnN0TGluZSxcbiAgICAgICAgICBzdGFjayxcbiAgICAgICAgICBsaW5lVG9rZW5zLFxuICAgICAgICAgIHB1c2hlZFJ1bGUuYmVnaW5DYXB0dXJlcyxcbiAgICAgICAgICBjYXB0dXJlSW5kaWNlc1xuICAgICAgICApO1xuICAgICAgICBsaW5lVG9rZW5zLnByb2R1Y2Uoc3RhY2ssIGNhcHR1cmVJbmRpY2VzWzBdLmVuZCk7XG4gICAgICAgIGFuY2hvclBvc2l0aW9uID0gY2FwdHVyZUluZGljZXNbMF0uZW5kO1xuICAgICAgICBjb25zdCBjb250ZW50TmFtZSA9IHB1c2hlZFJ1bGUuZ2V0Q29udGVudE5hbWUoXG4gICAgICAgICAgbGluZVRleHQuY29udGVudCxcbiAgICAgICAgICBjYXB0dXJlSW5kaWNlc1xuICAgICAgICApO1xuICAgICAgICBjb25zdCBjb250ZW50TmFtZVNjb3Blc0xpc3QgPSBuYW1lU2NvcGVzTGlzdC5wdXNoQXR0cmlidXRlZChcbiAgICAgICAgICBjb250ZW50TmFtZSxcbiAgICAgICAgICBncmFtbWFyXG4gICAgICAgICk7XG4gICAgICAgIHN0YWNrID0gc3RhY2sud2l0aENvbnRlbnROYW1lU2NvcGVzTGlzdChjb250ZW50TmFtZVNjb3Blc0xpc3QpO1xuICAgICAgICBpZiAocHVzaGVkUnVsZS53aGlsZUhhc0JhY2tSZWZlcmVuY2VzKSB7XG4gICAgICAgICAgc3RhY2sgPSBzdGFjay53aXRoRW5kUnVsZShcbiAgICAgICAgICAgIHB1c2hlZFJ1bGUuZ2V0V2hpbGVXaXRoUmVzb2x2ZWRCYWNrUmVmZXJlbmNlcyhcbiAgICAgICAgICAgICAgbGluZVRleHQuY29udGVudCxcbiAgICAgICAgICAgICAgY2FwdHVyZUluZGljZXNcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaGFzQWR2YW5jZWQgJiYgYmVmb3JlUHVzaC5oYXNTYW1lUnVsZUFzKHN0YWNrKSkge1xuICAgICAgICAgIGlmIChmYWxzZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgXCJbM10gLSBHcmFtbWFyIGlzIGluIGFuIGVuZGxlc3MgbG9vcCAtIEdyYW1tYXIgcHVzaGVkIHRoZSBzYW1lIHJ1bGUgd2l0aG91dCBhZHZhbmNpbmdcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RhY2sgPSBzdGFjay5wb3AoKTtcbiAgICAgICAgICBsaW5lVG9rZW5zLnByb2R1Y2Uoc3RhY2ssIGxpbmVMZW5ndGgpO1xuICAgICAgICAgIFNUT1AgPSB0cnVlO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWF0Y2hpbmdSdWxlID0gX3J1bGU7XG4gICAgICAgIGlmIChmYWxzZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgXCIgIG1hdGNoZWQgXCIgKyBtYXRjaGluZ1J1bGUuZGVidWdOYW1lICsgXCIgLSBcIiArIG1hdGNoaW5nUnVsZS5kZWJ1Z01hdGNoUmVnRXhwXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBoYW5kbGVDYXB0dXJlcyhcbiAgICAgICAgICBncmFtbWFyLFxuICAgICAgICAgIGxpbmVUZXh0LFxuICAgICAgICAgIGlzRmlyc3RMaW5lLFxuICAgICAgICAgIHN0YWNrLFxuICAgICAgICAgIGxpbmVUb2tlbnMsXG4gICAgICAgICAgbWF0Y2hpbmdSdWxlLmNhcHR1cmVzLFxuICAgICAgICAgIGNhcHR1cmVJbmRpY2VzXG4gICAgICAgICk7XG4gICAgICAgIGxpbmVUb2tlbnMucHJvZHVjZShzdGFjaywgY2FwdHVyZUluZGljZXNbMF0uZW5kKTtcbiAgICAgICAgc3RhY2sgPSBzdGFjay5wb3AoKTtcbiAgICAgICAgaWYgKCFoYXNBZHZhbmNlZCkge1xuICAgICAgICAgIGlmIChmYWxzZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgXCJbNF0gLSBHcmFtbWFyIGlzIGluIGFuIGVuZGxlc3MgbG9vcCAtIEdyYW1tYXIgaXMgbm90IGFkdmFuY2luZywgbm9yIGlzIGl0IHB1c2hpbmcvcG9wcGluZ1wiXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdGFjayA9IHN0YWNrLnNhZmVQb3AoKTtcbiAgICAgICAgICBsaW5lVG9rZW5zLnByb2R1Y2Uoc3RhY2ssIGxpbmVMZW5ndGgpO1xuICAgICAgICAgIFNUT1AgPSB0cnVlO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2FwdHVyZUluZGljZXNbMF0uZW5kID4gbGluZVBvcykge1xuICAgICAgbGluZVBvcyA9IGNhcHR1cmVJbmRpY2VzWzBdLmVuZDtcbiAgICAgIGlzRmlyc3RMaW5lID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBfY2hlY2tXaGlsZUNvbmRpdGlvbnMoZ3JhbW1hciwgbGluZVRleHQsIGlzRmlyc3RMaW5lLCBsaW5lUG9zLCBzdGFjaywgbGluZVRva2Vucykge1xuICBsZXQgYW5jaG9yUG9zaXRpb24gPSBzdGFjay5iZWdpblJ1bGVDYXB0dXJlZEVPTCA/IDAgOiAtMTtcbiAgY29uc3Qgd2hpbGVSdWxlcyA9IFtdO1xuICBmb3IgKGxldCBub2RlID0gc3RhY2s7IG5vZGU7IG5vZGUgPSBub2RlLnBvcCgpKSB7XG4gICAgY29uc3Qgbm9kZVJ1bGUgPSBub2RlLmdldFJ1bGUoZ3JhbW1hcik7XG4gICAgaWYgKG5vZGVSdWxlIGluc3RhbmNlb2YgQmVnaW5XaGlsZVJ1bGUpIHtcbiAgICAgIHdoaWxlUnVsZXMucHVzaCh7XG4gICAgICAgIHJ1bGU6IG5vZGVSdWxlLFxuICAgICAgICBzdGFjazogbm9kZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIGZvciAobGV0IHdoaWxlUnVsZSA9IHdoaWxlUnVsZXMucG9wKCk7IHdoaWxlUnVsZTsgd2hpbGVSdWxlID0gd2hpbGVSdWxlcy5wb3AoKSkge1xuICAgIGNvbnN0IHsgcnVsZVNjYW5uZXIsIGZpbmRPcHRpb25zIH0gPSBwcmVwYXJlUnVsZVdoaWxlU2VhcmNoKHdoaWxlUnVsZS5ydWxlLCBncmFtbWFyLCB3aGlsZVJ1bGUuc3RhY2suZW5kUnVsZSwgaXNGaXJzdExpbmUsIGxpbmVQb3MgPT09IGFuY2hvclBvc2l0aW9uKTtcbiAgICBjb25zdCByID0gcnVsZVNjYW5uZXIuZmluZE5leHRNYXRjaFN5bmMobGluZVRleHQsIGxpbmVQb3MsIGZpbmRPcHRpb25zKTtcbiAgICBpZiAoZmFsc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiICBzY2FubmluZyBmb3Igd2hpbGUgcnVsZVwiKTtcbiAgICAgIGNvbnNvbGUubG9nKHJ1bGVTY2FubmVyLnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgICBpZiAocikge1xuICAgICAgY29uc3QgbWF0Y2hlZFJ1bGVJZCA9IHIucnVsZUlkO1xuICAgICAgaWYgKG1hdGNoZWRSdWxlSWQgIT09IHdoaWxlUnVsZUlkKSB7XG4gICAgICAgIHN0YWNrID0gd2hpbGVSdWxlLnN0YWNrLnBvcCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChyLmNhcHR1cmVJbmRpY2VzICYmIHIuY2FwdHVyZUluZGljZXMubGVuZ3RoKSB7XG4gICAgICAgIGxpbmVUb2tlbnMucHJvZHVjZSh3aGlsZVJ1bGUuc3RhY2ssIHIuY2FwdHVyZUluZGljZXNbMF0uc3RhcnQpO1xuICAgICAgICBoYW5kbGVDYXB0dXJlcyhncmFtbWFyLCBsaW5lVGV4dCwgaXNGaXJzdExpbmUsIHdoaWxlUnVsZS5zdGFjaywgbGluZVRva2Vucywgd2hpbGVSdWxlLnJ1bGUud2hpbGVDYXB0dXJlcywgci5jYXB0dXJlSW5kaWNlcyk7XG4gICAgICAgIGxpbmVUb2tlbnMucHJvZHVjZSh3aGlsZVJ1bGUuc3RhY2ssIHIuY2FwdHVyZUluZGljZXNbMF0uZW5kKTtcbiAgICAgICAgYW5jaG9yUG9zaXRpb24gPSByLmNhcHR1cmVJbmRpY2VzWzBdLmVuZDtcbiAgICAgICAgaWYgKHIuY2FwdHVyZUluZGljZXNbMF0uZW5kID4gbGluZVBvcykge1xuICAgICAgICAgIGxpbmVQb3MgPSByLmNhcHR1cmVJbmRpY2VzWzBdLmVuZDtcbiAgICAgICAgICBpc0ZpcnN0TGluZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChmYWxzZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIiAgcG9wcGluZyBcIiArIHdoaWxlUnVsZS5ydWxlLmRlYnVnTmFtZSArIFwiIC0gXCIgKyB3aGlsZVJ1bGUucnVsZS5kZWJ1Z1doaWxlUmVnRXhwKTtcbiAgICAgIH1cbiAgICAgIHN0YWNrID0gd2hpbGVSdWxlLnN0YWNrLnBvcCgpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiB7IHN0YWNrLCBsaW5lUG9zLCBhbmNob3JQb3NpdGlvbiwgaXNGaXJzdExpbmUgfTtcbn1cbmZ1bmN0aW9uIG1hdGNoUnVsZU9ySW5qZWN0aW9ucyhncmFtbWFyLCBsaW5lVGV4dCwgaXNGaXJzdExpbmUsIGxpbmVQb3MsIHN0YWNrLCBhbmNob3JQb3NpdGlvbikge1xuICBjb25zdCBtYXRjaFJlc3VsdCA9IG1hdGNoUnVsZShncmFtbWFyLCBsaW5lVGV4dCwgaXNGaXJzdExpbmUsIGxpbmVQb3MsIHN0YWNrLCBhbmNob3JQb3NpdGlvbik7XG4gIGNvbnN0IGluamVjdGlvbnMgPSBncmFtbWFyLmdldEluamVjdGlvbnMoKTtcbiAgaWYgKGluamVjdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG1hdGNoUmVzdWx0O1xuICB9XG4gIGNvbnN0IGluamVjdGlvblJlc3VsdCA9IG1hdGNoSW5qZWN0aW9ucyhpbmplY3Rpb25zLCBncmFtbWFyLCBsaW5lVGV4dCwgaXNGaXJzdExpbmUsIGxpbmVQb3MsIHN0YWNrLCBhbmNob3JQb3NpdGlvbik7XG4gIGlmICghaW5qZWN0aW9uUmVzdWx0KSB7XG4gICAgcmV0dXJuIG1hdGNoUmVzdWx0O1xuICB9XG4gIGlmICghbWF0Y2hSZXN1bHQpIHtcbiAgICByZXR1cm4gaW5qZWN0aW9uUmVzdWx0O1xuICB9XG4gIGNvbnN0IG1hdGNoUmVzdWx0U2NvcmUgPSBtYXRjaFJlc3VsdC5jYXB0dXJlSW5kaWNlc1swXS5zdGFydDtcbiAgY29uc3QgaW5qZWN0aW9uUmVzdWx0U2NvcmUgPSBpbmplY3Rpb25SZXN1bHQuY2FwdHVyZUluZGljZXNbMF0uc3RhcnQ7XG4gIGlmIChpbmplY3Rpb25SZXN1bHRTY29yZSA8IG1hdGNoUmVzdWx0U2NvcmUgfHwgaW5qZWN0aW9uUmVzdWx0LnByaW9yaXR5TWF0Y2ggJiYgaW5qZWN0aW9uUmVzdWx0U2NvcmUgPT09IG1hdGNoUmVzdWx0U2NvcmUpIHtcbiAgICByZXR1cm4gaW5qZWN0aW9uUmVzdWx0O1xuICB9XG4gIHJldHVybiBtYXRjaFJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1hdGNoUnVsZShncmFtbWFyLCBsaW5lVGV4dCwgaXNGaXJzdExpbmUsIGxpbmVQb3MsIHN0YWNrLCBhbmNob3JQb3NpdGlvbikge1xuICBjb25zdCBydWxlID0gc3RhY2suZ2V0UnVsZShncmFtbWFyKTtcbiAgY29uc3QgeyBydWxlU2Nhbm5lciwgZmluZE9wdGlvbnMgfSA9IHByZXBhcmVSdWxlU2VhcmNoKHJ1bGUsIGdyYW1tYXIsIHN0YWNrLmVuZFJ1bGUsIGlzRmlyc3RMaW5lLCBsaW5lUG9zID09PSBhbmNob3JQb3NpdGlvbik7XG4gIGNvbnN0IHIgPSBydWxlU2Nhbm5lci5maW5kTmV4dE1hdGNoU3luYyhsaW5lVGV4dCwgbGluZVBvcywgZmluZE9wdGlvbnMpO1xuICBpZiAocikge1xuICAgIHJldHVybiB7XG4gICAgICBjYXB0dXJlSW5kaWNlczogci5jYXB0dXJlSW5kaWNlcyxcbiAgICAgIG1hdGNoZWRSdWxlSWQ6IHIucnVsZUlkXG4gICAgfTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIG1hdGNoSW5qZWN0aW9ucyhpbmplY3Rpb25zLCBncmFtbWFyLCBsaW5lVGV4dCwgaXNGaXJzdExpbmUsIGxpbmVQb3MsIHN0YWNrLCBhbmNob3JQb3NpdGlvbikge1xuICBsZXQgYmVzdE1hdGNoUmF0aW5nID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgbGV0IGJlc3RNYXRjaENhcHR1cmVJbmRpY2VzID0gbnVsbDtcbiAgbGV0IGJlc3RNYXRjaFJ1bGVJZDtcbiAgbGV0IGJlc3RNYXRjaFJlc3VsdFByaW9yaXR5ID0gMDtcbiAgY29uc3Qgc2NvcGVzID0gc3RhY2suY29udGVudE5hbWVTY29wZXNMaXN0LmdldFNjb3BlTmFtZXMoKTtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGluamVjdGlvbnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBpbmplY3Rpb24gPSBpbmplY3Rpb25zW2ldO1xuICAgIGlmICghaW5qZWN0aW9uLm1hdGNoZXIoc2NvcGVzKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGNvbnN0IHJ1bGUgPSBncmFtbWFyLmdldFJ1bGUoaW5qZWN0aW9uLnJ1bGVJZCk7XG4gICAgY29uc3QgeyBydWxlU2Nhbm5lciwgZmluZE9wdGlvbnMgfSA9IHByZXBhcmVSdWxlU2VhcmNoKHJ1bGUsIGdyYW1tYXIsIG51bGwsIGlzRmlyc3RMaW5lLCBsaW5lUG9zID09PSBhbmNob3JQb3NpdGlvbik7XG4gICAgY29uc3QgbWF0Y2hSZXN1bHQgPSBydWxlU2Nhbm5lci5maW5kTmV4dE1hdGNoU3luYyhsaW5lVGV4dCwgbGluZVBvcywgZmluZE9wdGlvbnMpO1xuICAgIGlmICghbWF0Y2hSZXN1bHQpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoZmFsc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKGAgIG1hdGNoZWQgaW5qZWN0aW9uOiAke2luamVjdGlvbi5kZWJ1Z1NlbGVjdG9yfWApO1xuICAgICAgY29uc29sZS5sb2cocnVsZVNjYW5uZXIudG9TdHJpbmcoKSk7XG4gICAgfVxuICAgIGNvbnN0IG1hdGNoUmF0aW5nID0gbWF0Y2hSZXN1bHQuY2FwdHVyZUluZGljZXNbMF0uc3RhcnQ7XG4gICAgaWYgKG1hdGNoUmF0aW5nID49IGJlc3RNYXRjaFJhdGluZykge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGJlc3RNYXRjaFJhdGluZyA9IG1hdGNoUmF0aW5nO1xuICAgIGJlc3RNYXRjaENhcHR1cmVJbmRpY2VzID0gbWF0Y2hSZXN1bHQuY2FwdHVyZUluZGljZXM7XG4gICAgYmVzdE1hdGNoUnVsZUlkID0gbWF0Y2hSZXN1bHQucnVsZUlkO1xuICAgIGJlc3RNYXRjaFJlc3VsdFByaW9yaXR5ID0gaW5qZWN0aW9uLnByaW9yaXR5O1xuICAgIGlmIChiZXN0TWF0Y2hSYXRpbmcgPT09IGxpbmVQb3MpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAoYmVzdE1hdGNoQ2FwdHVyZUluZGljZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcHJpb3JpdHlNYXRjaDogYmVzdE1hdGNoUmVzdWx0UHJpb3JpdHkgPT09IC0xLFxuICAgICAgY2FwdHVyZUluZGljZXM6IGJlc3RNYXRjaENhcHR1cmVJbmRpY2VzLFxuICAgICAgbWF0Y2hlZFJ1bGVJZDogYmVzdE1hdGNoUnVsZUlkXG4gICAgfTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIHByZXBhcmVSdWxlU2VhcmNoKHJ1bGUsIGdyYW1tYXIsIGVuZFJlZ2V4U291cmNlLCBhbGxvd0EsIGFsbG93Rykge1xuICBpZiAoVXNlT25pZ3VydW1hRmluZE9wdGlvbnMpIHtcbiAgICBjb25zdCBydWxlU2Nhbm5lcjIgPSBydWxlLmNvbXBpbGUoZ3JhbW1hciwgZW5kUmVnZXhTb3VyY2UpO1xuICAgIGNvbnN0IGZpbmRPcHRpb25zID0gZ2V0RmluZE9wdGlvbnMoYWxsb3dBLCBhbGxvd0cpO1xuICAgIHJldHVybiB7IHJ1bGVTY2FubmVyOiBydWxlU2Nhbm5lcjIsIGZpbmRPcHRpb25zIH07XG4gIH1cbiAgY29uc3QgcnVsZVNjYW5uZXIgPSBydWxlLmNvbXBpbGVBRyhncmFtbWFyLCBlbmRSZWdleFNvdXJjZSwgYWxsb3dBLCBhbGxvd0cpO1xuICByZXR1cm4geyBydWxlU2Nhbm5lciwgZmluZE9wdGlvbnM6IDAgLyogTm9uZSAqLyB9O1xufVxuZnVuY3Rpb24gcHJlcGFyZVJ1bGVXaGlsZVNlYXJjaChydWxlLCBncmFtbWFyLCBlbmRSZWdleFNvdXJjZSwgYWxsb3dBLCBhbGxvd0cpIHtcbiAgaWYgKFVzZU9uaWd1cnVtYUZpbmRPcHRpb25zKSB7XG4gICAgY29uc3QgcnVsZVNjYW5uZXIyID0gcnVsZS5jb21waWxlV2hpbGUoZ3JhbW1hciwgZW5kUmVnZXhTb3VyY2UpO1xuICAgIGNvbnN0IGZpbmRPcHRpb25zID0gZ2V0RmluZE9wdGlvbnMoYWxsb3dBLCBhbGxvd0cpO1xuICAgIHJldHVybiB7IHJ1bGVTY2FubmVyOiBydWxlU2Nhbm5lcjIsIGZpbmRPcHRpb25zIH07XG4gIH1cbiAgY29uc3QgcnVsZVNjYW5uZXIgPSBydWxlLmNvbXBpbGVXaGlsZUFHKGdyYW1tYXIsIGVuZFJlZ2V4U291cmNlLCBhbGxvd0EsIGFsbG93Ryk7XG4gIHJldHVybiB7IHJ1bGVTY2FubmVyLCBmaW5kT3B0aW9uczogMCAvKiBOb25lICovIH07XG59XG5mdW5jdGlvbiBnZXRGaW5kT3B0aW9ucyhhbGxvd0EsIGFsbG93Rykge1xuICBsZXQgb3B0aW9ucyA9IDAgLyogTm9uZSAqLztcbiAgaWYgKCFhbGxvd0EpIHtcbiAgICBvcHRpb25zIHw9IDEgLyogTm90QmVnaW5TdHJpbmcgKi87XG4gIH1cbiAgaWYgKCFhbGxvd0cpIHtcbiAgICBvcHRpb25zIHw9IDQgLyogTm90QmVnaW5Qb3NpdGlvbiAqLztcbiAgfVxuICByZXR1cm4gb3B0aW9ucztcbn1cbmZ1bmN0aW9uIGhhbmRsZUNhcHR1cmVzKGdyYW1tYXIsIGxpbmVUZXh0LCBpc0ZpcnN0TGluZSwgc3RhY2ssIGxpbmVUb2tlbnMsIGNhcHR1cmVzLCBjYXB0dXJlSW5kaWNlcykge1xuICBpZiAoY2FwdHVyZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGxpbmVUZXh0Q29udGVudCA9IGxpbmVUZXh0LmNvbnRlbnQ7XG4gIGNvbnN0IGxlbiA9IE1hdGgubWluKGNhcHR1cmVzLmxlbmd0aCwgY2FwdHVyZUluZGljZXMubGVuZ3RoKTtcbiAgY29uc3QgbG9jYWxTdGFjayA9IFtdO1xuICBjb25zdCBtYXhFbmQgPSBjYXB0dXJlSW5kaWNlc1swXS5lbmQ7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBjYXB0dXJlUnVsZSA9IGNhcHR1cmVzW2ldO1xuICAgIGlmIChjYXB0dXJlUnVsZSA9PT0gbnVsbCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGNvbnN0IGNhcHR1cmVJbmRleCA9IGNhcHR1cmVJbmRpY2VzW2ldO1xuICAgIGlmIChjYXB0dXJlSW5kZXgubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGNhcHR1cmVJbmRleC5zdGFydCA+IG1heEVuZCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHdoaWxlIChsb2NhbFN0YWNrLmxlbmd0aCA+IDAgJiYgbG9jYWxTdGFja1tsb2NhbFN0YWNrLmxlbmd0aCAtIDFdLmVuZFBvcyA8PSBjYXB0dXJlSW5kZXguc3RhcnQpIHtcbiAgICAgIGxpbmVUb2tlbnMucHJvZHVjZUZyb21TY29wZXMobG9jYWxTdGFja1tsb2NhbFN0YWNrLmxlbmd0aCAtIDFdLnNjb3BlcywgbG9jYWxTdGFja1tsb2NhbFN0YWNrLmxlbmd0aCAtIDFdLmVuZFBvcyk7XG4gICAgICBsb2NhbFN0YWNrLnBvcCgpO1xuICAgIH1cbiAgICBpZiAobG9jYWxTdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICBsaW5lVG9rZW5zLnByb2R1Y2VGcm9tU2NvcGVzKGxvY2FsU3RhY2tbbG9jYWxTdGFjay5sZW5ndGggLSAxXS5zY29wZXMsIGNhcHR1cmVJbmRleC5zdGFydCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpbmVUb2tlbnMucHJvZHVjZShzdGFjaywgY2FwdHVyZUluZGV4LnN0YXJ0KTtcbiAgICB9XG4gICAgaWYgKGNhcHR1cmVSdWxlLnJldG9rZW5pemVDYXB0dXJlZFdpdGhSdWxlSWQpIHtcbiAgICAgIGNvbnN0IHNjb3BlTmFtZSA9IGNhcHR1cmVSdWxlLmdldE5hbWUobGluZVRleHRDb250ZW50LCBjYXB0dXJlSW5kaWNlcyk7XG4gICAgICBjb25zdCBuYW1lU2NvcGVzTGlzdCA9IHN0YWNrLmNvbnRlbnROYW1lU2NvcGVzTGlzdC5wdXNoQXR0cmlidXRlZChzY29wZU5hbWUsIGdyYW1tYXIpO1xuICAgICAgY29uc3QgY29udGVudE5hbWUgPSBjYXB0dXJlUnVsZS5nZXRDb250ZW50TmFtZShsaW5lVGV4dENvbnRlbnQsIGNhcHR1cmVJbmRpY2VzKTtcbiAgICAgIGNvbnN0IGNvbnRlbnROYW1lU2NvcGVzTGlzdCA9IG5hbWVTY29wZXNMaXN0LnB1c2hBdHRyaWJ1dGVkKGNvbnRlbnROYW1lLCBncmFtbWFyKTtcbiAgICAgIGNvbnN0IHN0YWNrQ2xvbmUgPSBzdGFjay5wdXNoKGNhcHR1cmVSdWxlLnJldG9rZW5pemVDYXB0dXJlZFdpdGhSdWxlSWQsIGNhcHR1cmVJbmRleC5zdGFydCwgLTEsIGZhbHNlLCBudWxsLCBuYW1lU2NvcGVzTGlzdCwgY29udGVudE5hbWVTY29wZXNMaXN0KTtcbiAgICAgIGNvbnN0IG9uaWdTdWJTdHIgPSBncmFtbWFyLmNyZWF0ZU9uaWdTdHJpbmcobGluZVRleHRDb250ZW50LnN1YnN0cmluZygwLCBjYXB0dXJlSW5kZXguZW5kKSk7XG4gICAgICBfdG9rZW5pemVTdHJpbmcoXG4gICAgICAgIGdyYW1tYXIsXG4gICAgICAgIG9uaWdTdWJTdHIsXG4gICAgICAgIGlzRmlyc3RMaW5lICYmIGNhcHR1cmVJbmRleC5zdGFydCA9PT0gMCxcbiAgICAgICAgY2FwdHVyZUluZGV4LnN0YXJ0LFxuICAgICAgICBzdGFja0Nsb25lLFxuICAgICAgICBsaW5lVG9rZW5zLFxuICAgICAgICBmYWxzZSxcbiAgICAgICAgLyogbm8gdGltZSBsaW1pdCAqL1xuICAgICAgICAwXG4gICAgICApO1xuICAgICAgZGlzcG9zZU9uaWdTdHJpbmcob25pZ1N1YlN0cik7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgY29uc3QgY2FwdHVyZVJ1bGVTY29wZU5hbWUgPSBjYXB0dXJlUnVsZS5nZXROYW1lKGxpbmVUZXh0Q29udGVudCwgY2FwdHVyZUluZGljZXMpO1xuICAgIGlmIChjYXB0dXJlUnVsZVNjb3BlTmFtZSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgYmFzZSA9IGxvY2FsU3RhY2subGVuZ3RoID4gMCA/IGxvY2FsU3RhY2tbbG9jYWxTdGFjay5sZW5ndGggLSAxXS5zY29wZXMgOiBzdGFjay5jb250ZW50TmFtZVNjb3Blc0xpc3Q7XG4gICAgICBjb25zdCBjYXB0dXJlUnVsZVNjb3Blc0xpc3QgPSBiYXNlLnB1c2hBdHRyaWJ1dGVkKGNhcHR1cmVSdWxlU2NvcGVOYW1lLCBncmFtbWFyKTtcbiAgICAgIGxvY2FsU3RhY2sucHVzaChuZXcgTG9jYWxTdGFja0VsZW1lbnQoY2FwdHVyZVJ1bGVTY29wZXNMaXN0LCBjYXB0dXJlSW5kZXguZW5kKSk7XG4gICAgfVxuICB9XG4gIHdoaWxlIChsb2NhbFN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICBsaW5lVG9rZW5zLnByb2R1Y2VGcm9tU2NvcGVzKGxvY2FsU3RhY2tbbG9jYWxTdGFjay5sZW5ndGggLSAxXS5zY29wZXMsIGxvY2FsU3RhY2tbbG9jYWxTdGFjay5sZW5ndGggLSAxXS5lbmRQb3MpO1xuICAgIGxvY2FsU3RhY2sucG9wKCk7XG4gIH1cbn1cbnZhciBMb2NhbFN0YWNrRWxlbWVudCA9IGNsYXNzIHtcbiAgc2NvcGVzO1xuICBlbmRQb3M7XG4gIGNvbnN0cnVjdG9yKHNjb3BlcywgZW5kUG9zKSB7XG4gICAgdGhpcy5zY29wZXMgPSBzY29wZXM7XG4gICAgdGhpcy5lbmRQb3MgPSBlbmRQb3M7XG4gIH1cbn07XG5cbi8vIHNyYy9ncmFtbWFyL2dyYW1tYXIudHNcbmZ1bmN0aW9uIGNyZWF0ZUdyYW1tYXIoc2NvcGVOYW1lLCBncmFtbWFyLCBpbml0aWFsTGFuZ3VhZ2UsIGVtYmVkZGVkTGFuZ3VhZ2VzLCB0b2tlblR5cGVzLCBiYWxhbmNlZEJyYWNrZXRTZWxlY3RvcnMsIGdyYW1tYXJSZXBvc2l0b3J5LCBvbmlnTGliKSB7XG4gIHJldHVybiBuZXcgR3JhbW1hcihcbiAgICBzY29wZU5hbWUsXG4gICAgZ3JhbW1hcixcbiAgICBpbml0aWFsTGFuZ3VhZ2UsXG4gICAgZW1iZWRkZWRMYW5ndWFnZXMsXG4gICAgdG9rZW5UeXBlcyxcbiAgICBiYWxhbmNlZEJyYWNrZXRTZWxlY3RvcnMsXG4gICAgZ3JhbW1hclJlcG9zaXRvcnksXG4gICAgb25pZ0xpYlxuICApO1xufVxuZnVuY3Rpb24gY29sbGVjdEluamVjdGlvbnMocmVzdWx0LCBzZWxlY3RvciwgcnVsZSwgcnVsZUZhY3RvcnlIZWxwZXIsIGdyYW1tYXIpIHtcbiAgY29uc3QgbWF0Y2hlcnMgPSBjcmVhdGVNYXRjaGVycyhzZWxlY3RvciwgbmFtZU1hdGNoZXIpO1xuICBjb25zdCBydWxlSWQgPSBSdWxlRmFjdG9yeS5nZXRDb21waWxlZFJ1bGVJZChydWxlLCBydWxlRmFjdG9yeUhlbHBlciwgZ3JhbW1hci5yZXBvc2l0b3J5KTtcbiAgZm9yIChjb25zdCBtYXRjaGVyIG9mIG1hdGNoZXJzKSB7XG4gICAgcmVzdWx0LnB1c2goe1xuICAgICAgZGVidWdTZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgICBtYXRjaGVyOiBtYXRjaGVyLm1hdGNoZXIsXG4gICAgICBydWxlSWQsXG4gICAgICBncmFtbWFyLFxuICAgICAgcHJpb3JpdHk6IG1hdGNoZXIucHJpb3JpdHlcbiAgICB9KTtcbiAgfVxufVxuZnVuY3Rpb24gbmFtZU1hdGNoZXIoaWRlbnRpZmVycywgc2NvcGVzKSB7XG4gIGlmIChzY29wZXMubGVuZ3RoIDwgaWRlbnRpZmVycy5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgbGV0IGxhc3RJbmRleCA9IDA7XG4gIHJldHVybiBpZGVudGlmZXJzLmV2ZXJ5KChpZGVudGlmaWVyKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IGxhc3RJbmRleDsgaSA8IHNjb3Blcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHNjb3Blc0FyZU1hdGNoaW5nKHNjb3Blc1tpXSwgaWRlbnRpZmllcikpIHtcbiAgICAgICAgbGFzdEluZGV4ID0gaSArIDE7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xufVxuZnVuY3Rpb24gc2NvcGVzQXJlTWF0Y2hpbmcodGhpc1Njb3BlTmFtZSwgc2NvcGVOYW1lKSB7XG4gIGlmICghdGhpc1Njb3BlTmFtZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAodGhpc1Njb3BlTmFtZSA9PT0gc2NvcGVOYW1lKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgY29uc3QgbGVuID0gc2NvcGVOYW1lLmxlbmd0aDtcbiAgcmV0dXJuIHRoaXNTY29wZU5hbWUubGVuZ3RoID4gbGVuICYmIHRoaXNTY29wZU5hbWUuc3Vic3RyKDAsIGxlbikgPT09IHNjb3BlTmFtZSAmJiB0aGlzU2NvcGVOYW1lW2xlbl0gPT09IFwiLlwiO1xufVxudmFyIEdyYW1tYXIgPSBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKF9yb290U2NvcGVOYW1lLCBncmFtbWFyLCBpbml0aWFsTGFuZ3VhZ2UsIGVtYmVkZGVkTGFuZ3VhZ2VzLCB0b2tlblR5cGVzLCBiYWxhbmNlZEJyYWNrZXRTZWxlY3RvcnMsIGdyYW1tYXJSZXBvc2l0b3J5LCBfb25pZ0xpYikge1xuICAgIHRoaXMuX3Jvb3RTY29wZU5hbWUgPSBfcm9vdFNjb3BlTmFtZTtcbiAgICB0aGlzLmJhbGFuY2VkQnJhY2tldFNlbGVjdG9ycyA9IGJhbGFuY2VkQnJhY2tldFNlbGVjdG9ycztcbiAgICB0aGlzLl9vbmlnTGliID0gX29uaWdMaWI7XG4gICAgdGhpcy5fYmFzaWNTY29wZUF0dHJpYnV0ZXNQcm92aWRlciA9IG5ldyBCYXNpY1Njb3BlQXR0cmlidXRlc1Byb3ZpZGVyKFxuICAgICAgaW5pdGlhbExhbmd1YWdlLFxuICAgICAgZW1iZWRkZWRMYW5ndWFnZXNcbiAgICApO1xuICAgIHRoaXMuX3Jvb3RJZCA9IC0xO1xuICAgIHRoaXMuX2xhc3RSdWxlSWQgPSAwO1xuICAgIHRoaXMuX3J1bGVJZDJkZXNjID0gW251bGxdO1xuICAgIHRoaXMuX2luY2x1ZGVkR3JhbW1hcnMgPSB7fTtcbiAgICB0aGlzLl9ncmFtbWFyUmVwb3NpdG9yeSA9IGdyYW1tYXJSZXBvc2l0b3J5O1xuICAgIHRoaXMuX2dyYW1tYXIgPSBpbml0R3JhbW1hcihncmFtbWFyLCBudWxsKTtcbiAgICB0aGlzLl9pbmplY3Rpb25zID0gbnVsbDtcbiAgICB0aGlzLl90b2tlblR5cGVNYXRjaGVycyA9IFtdO1xuICAgIGlmICh0b2tlblR5cGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIE9iamVjdC5rZXlzKHRva2VuVHlwZXMpKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZXJzID0gY3JlYXRlTWF0Y2hlcnMoc2VsZWN0b3IsIG5hbWVNYXRjaGVyKTtcbiAgICAgICAgZm9yIChjb25zdCBtYXRjaGVyIG9mIG1hdGNoZXJzKSB7XG4gICAgICAgICAgdGhpcy5fdG9rZW5UeXBlTWF0Y2hlcnMucHVzaCh7XG4gICAgICAgICAgICBtYXRjaGVyOiBtYXRjaGVyLm1hdGNoZXIsXG4gICAgICAgICAgICB0eXBlOiB0b2tlblR5cGVzW3NlbGVjdG9yXVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIF9yb290SWQ7XG4gIF9sYXN0UnVsZUlkO1xuICBfcnVsZUlkMmRlc2M7XG4gIF9pbmNsdWRlZEdyYW1tYXJzO1xuICBfZ3JhbW1hclJlcG9zaXRvcnk7XG4gIF9ncmFtbWFyO1xuICBfaW5qZWN0aW9ucztcbiAgX2Jhc2ljU2NvcGVBdHRyaWJ1dGVzUHJvdmlkZXI7XG4gIF90b2tlblR5cGVNYXRjaGVycztcbiAgZ2V0IHRoZW1lUHJvdmlkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dyYW1tYXJSZXBvc2l0b3J5O1xuICB9XG4gIGRpc3Bvc2UoKSB7XG4gICAgZm9yIChjb25zdCBydWxlIG9mIHRoaXMuX3J1bGVJZDJkZXNjKSB7XG4gICAgICBpZiAocnVsZSkge1xuICAgICAgICBydWxlLmRpc3Bvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY3JlYXRlT25pZ1NjYW5uZXIoc291cmNlcykge1xuICAgIHJldHVybiB0aGlzLl9vbmlnTGliLmNyZWF0ZU9uaWdTY2FubmVyKHNvdXJjZXMpO1xuICB9XG4gIGNyZWF0ZU9uaWdTdHJpbmcoc291cmNlcykge1xuICAgIHJldHVybiB0aGlzLl9vbmlnTGliLmNyZWF0ZU9uaWdTdHJpbmcoc291cmNlcyk7XG4gIH1cbiAgZ2V0TWV0YWRhdGFGb3JTY29wZShzY29wZSkge1xuICAgIHJldHVybiB0aGlzLl9iYXNpY1Njb3BlQXR0cmlidXRlc1Byb3ZpZGVyLmdldEJhc2ljU2NvcGVBdHRyaWJ1dGVzKHNjb3BlKTtcbiAgfVxuICBfY29sbGVjdEluamVjdGlvbnMoKSB7XG4gICAgY29uc3QgZ3JhbW1hclJlcG9zaXRvcnkgPSB7XG4gICAgICBsb29rdXA6IChzY29wZU5hbWUyKSA9PiB7XG4gICAgICAgIGlmIChzY29wZU5hbWUyID09PSB0aGlzLl9yb290U2NvcGVOYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2dyYW1tYXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RXh0ZXJuYWxHcmFtbWFyKHNjb3BlTmFtZTIpO1xuICAgICAgfSxcbiAgICAgIGluamVjdGlvbnM6IChzY29wZU5hbWUyKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ncmFtbWFyUmVwb3NpdG9yeS5pbmplY3Rpb25zKHNjb3BlTmFtZTIpO1xuICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgY29uc3Qgc2NvcGVOYW1lID0gdGhpcy5fcm9vdFNjb3BlTmFtZTtcbiAgICBjb25zdCBncmFtbWFyID0gZ3JhbW1hclJlcG9zaXRvcnkubG9va3VwKHNjb3BlTmFtZSk7XG4gICAgaWYgKGdyYW1tYXIpIHtcbiAgICAgIGNvbnN0IHJhd0luamVjdGlvbnMgPSBncmFtbWFyLmluamVjdGlvbnM7XG4gICAgICBpZiAocmF3SW5qZWN0aW9ucykge1xuICAgICAgICBmb3IgKGxldCBleHByZXNzaW9uIGluIHJhd0luamVjdGlvbnMpIHtcbiAgICAgICAgICBjb2xsZWN0SW5qZWN0aW9ucyhcbiAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgIGV4cHJlc3Npb24sXG4gICAgICAgICAgICByYXdJbmplY3Rpb25zW2V4cHJlc3Npb25dLFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgIGdyYW1tYXJcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBpbmplY3Rpb25TY29wZU5hbWVzID0gdGhpcy5fZ3JhbW1hclJlcG9zaXRvcnkuaW5qZWN0aW9ucyhzY29wZU5hbWUpO1xuICAgICAgaWYgKGluamVjdGlvblNjb3BlTmFtZXMpIHtcbiAgICAgICAgaW5qZWN0aW9uU2NvcGVOYW1lcy5mb3JFYWNoKChpbmplY3Rpb25TY29wZU5hbWUpID0+IHtcbiAgICAgICAgICBjb25zdCBpbmplY3Rpb25HcmFtbWFyID0gdGhpcy5nZXRFeHRlcm5hbEdyYW1tYXIoaW5qZWN0aW9uU2NvcGVOYW1lKTtcbiAgICAgICAgICBpZiAoaW5qZWN0aW9uR3JhbW1hcikge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBpbmplY3Rpb25HcmFtbWFyLmluamVjdGlvblNlbGVjdG9yO1xuICAgICAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgIGNvbGxlY3RJbmplY3Rpb25zKFxuICAgICAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgICAgICBzZWxlY3RvcixcbiAgICAgICAgICAgICAgICBpbmplY3Rpb25HcmFtbWFyLFxuICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgaW5qZWN0aW9uR3JhbW1hclxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5zb3J0KChpMSwgaTIpID0+IGkxLnByaW9yaXR5IC0gaTIucHJpb3JpdHkpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZ2V0SW5qZWN0aW9ucygpIHtcbiAgICBpZiAodGhpcy5faW5qZWN0aW9ucyA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5faW5qZWN0aW9ucyA9IHRoaXMuX2NvbGxlY3RJbmplY3Rpb25zKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9pbmplY3Rpb25zO1xuICB9XG4gIHJlZ2lzdGVyUnVsZShmYWN0b3J5KSB7XG4gICAgY29uc3QgaWQgPSArK3RoaXMuX2xhc3RSdWxlSWQ7XG4gICAgY29uc3QgcmVzdWx0ID0gZmFjdG9yeShydWxlSWRGcm9tTnVtYmVyKGlkKSk7XG4gICAgdGhpcy5fcnVsZUlkMmRlc2NbaWRdID0gcmVzdWx0O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZ2V0UnVsZShydWxlSWQpIHtcbiAgICByZXR1cm4gdGhpcy5fcnVsZUlkMmRlc2NbcnVsZUlkVG9OdW1iZXIocnVsZUlkKV07XG4gIH1cbiAgZ2V0RXh0ZXJuYWxHcmFtbWFyKHNjb3BlTmFtZSwgcmVwb3NpdG9yeSkge1xuICAgIGlmICh0aGlzLl9pbmNsdWRlZEdyYW1tYXJzW3Njb3BlTmFtZV0pIHtcbiAgICAgIHJldHVybiB0aGlzLl9pbmNsdWRlZEdyYW1tYXJzW3Njb3BlTmFtZV07XG4gICAgfSBlbHNlIGlmICh0aGlzLl9ncmFtbWFyUmVwb3NpdG9yeSkge1xuICAgICAgY29uc3QgcmF3SW5jbHVkZWRHcmFtbWFyID0gdGhpcy5fZ3JhbW1hclJlcG9zaXRvcnkubG9va3VwKHNjb3BlTmFtZSk7XG4gICAgICBpZiAocmF3SW5jbHVkZWRHcmFtbWFyKSB7XG4gICAgICAgIHRoaXMuX2luY2x1ZGVkR3JhbW1hcnNbc2NvcGVOYW1lXSA9IGluaXRHcmFtbWFyKFxuICAgICAgICAgIHJhd0luY2x1ZGVkR3JhbW1hcixcbiAgICAgICAgICByZXBvc2l0b3J5ICYmIHJlcG9zaXRvcnkuJGJhc2VcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luY2x1ZGVkR3JhbW1hcnNbc2NvcGVOYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfVxuICB0b2tlbml6ZUxpbmUobGluZVRleHQsIHByZXZTdGF0ZSwgdGltZUxpbWl0ID0gMCkge1xuICAgIGNvbnN0IHIgPSB0aGlzLl90b2tlbml6ZShsaW5lVGV4dCwgcHJldlN0YXRlLCBmYWxzZSwgdGltZUxpbWl0KTtcbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW5zOiByLmxpbmVUb2tlbnMuZ2V0UmVzdWx0KHIucnVsZVN0YWNrLCByLmxpbmVMZW5ndGgpLFxuICAgICAgcnVsZVN0YWNrOiByLnJ1bGVTdGFjayxcbiAgICAgIHN0b3BwZWRFYXJseTogci5zdG9wcGVkRWFybHlcbiAgICB9O1xuICB9XG4gIHRva2VuaXplTGluZTIobGluZVRleHQsIHByZXZTdGF0ZSwgdGltZUxpbWl0ID0gMCkge1xuICAgIGNvbnN0IHIgPSB0aGlzLl90b2tlbml6ZShsaW5lVGV4dCwgcHJldlN0YXRlLCB0cnVlLCB0aW1lTGltaXQpO1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbnM6IHIubGluZVRva2Vucy5nZXRCaW5hcnlSZXN1bHQoci5ydWxlU3RhY2ssIHIubGluZUxlbmd0aCksXG4gICAgICBydWxlU3RhY2s6IHIucnVsZVN0YWNrLFxuICAgICAgc3RvcHBlZEVhcmx5OiByLnN0b3BwZWRFYXJseVxuICAgIH07XG4gIH1cbiAgX3Rva2VuaXplKGxpbmVUZXh0LCBwcmV2U3RhdGUsIGVtaXRCaW5hcnlUb2tlbnMsIHRpbWVMaW1pdCkge1xuICAgIGlmICh0aGlzLl9yb290SWQgPT09IC0xKSB7XG4gICAgICB0aGlzLl9yb290SWQgPSBSdWxlRmFjdG9yeS5nZXRDb21waWxlZFJ1bGVJZChcbiAgICAgICAgdGhpcy5fZ3JhbW1hci5yZXBvc2l0b3J5LiRzZWxmLFxuICAgICAgICB0aGlzLFxuICAgICAgICB0aGlzLl9ncmFtbWFyLnJlcG9zaXRvcnlcbiAgICAgICk7XG4gICAgICB0aGlzLmdldEluamVjdGlvbnMoKTtcbiAgICB9XG4gICAgbGV0IGlzRmlyc3RMaW5lO1xuICAgIGlmICghcHJldlN0YXRlIHx8IHByZXZTdGF0ZSA9PT0gU3RhdGVTdGFja0ltcGwuTlVMTCkge1xuICAgICAgaXNGaXJzdExpbmUgPSB0cnVlO1xuICAgICAgY29uc3QgcmF3RGVmYXVsdE1ldGFkYXRhID0gdGhpcy5fYmFzaWNTY29wZUF0dHJpYnV0ZXNQcm92aWRlci5nZXREZWZhdWx0QXR0cmlidXRlcygpO1xuICAgICAgY29uc3QgZGVmYXVsdFN0eWxlID0gdGhpcy50aGVtZVByb3ZpZGVyLmdldERlZmF1bHRzKCk7XG4gICAgICBjb25zdCBkZWZhdWx0TWV0YWRhdGEgPSBFbmNvZGVkVG9rZW5NZXRhZGF0YS5zZXQoXG4gICAgICAgIDAsXG4gICAgICAgIHJhd0RlZmF1bHRNZXRhZGF0YS5sYW5ndWFnZUlkLFxuICAgICAgICByYXdEZWZhdWx0TWV0YWRhdGEudG9rZW5UeXBlLFxuICAgICAgICBudWxsLFxuICAgICAgICBkZWZhdWx0U3R5bGUuZm9udFN0eWxlLFxuICAgICAgICBkZWZhdWx0U3R5bGUuZm9yZWdyb3VuZElkLFxuICAgICAgICBkZWZhdWx0U3R5bGUuYmFja2dyb3VuZElkXG4gICAgICApO1xuICAgICAgY29uc3Qgcm9vdFNjb3BlTmFtZSA9IHRoaXMuZ2V0UnVsZSh0aGlzLl9yb290SWQpLmdldE5hbWUoXG4gICAgICAgIG51bGwsXG4gICAgICAgIG51bGxcbiAgICAgICk7XG4gICAgICBsZXQgc2NvcGVMaXN0O1xuICAgICAgaWYgKHJvb3RTY29wZU5hbWUpIHtcbiAgICAgICAgc2NvcGVMaXN0ID0gQXR0cmlidXRlZFNjb3BlU3RhY2suY3JlYXRlUm9vdEFuZExvb2tVcFNjb3BlTmFtZShcbiAgICAgICAgICByb290U2NvcGVOYW1lLFxuICAgICAgICAgIGRlZmF1bHRNZXRhZGF0YSxcbiAgICAgICAgICB0aGlzXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY29wZUxpc3QgPSBBdHRyaWJ1dGVkU2NvcGVTdGFjay5jcmVhdGVSb290KFxuICAgICAgICAgIFwidW5rbm93blwiLFxuICAgICAgICAgIGRlZmF1bHRNZXRhZGF0YVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcHJldlN0YXRlID0gbmV3IFN0YXRlU3RhY2tJbXBsKFxuICAgICAgICBudWxsLFxuICAgICAgICB0aGlzLl9yb290SWQsXG4gICAgICAgIC0xLFxuICAgICAgICAtMSxcbiAgICAgICAgZmFsc2UsXG4gICAgICAgIG51bGwsXG4gICAgICAgIHNjb3BlTGlzdCxcbiAgICAgICAgc2NvcGVMaXN0XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpc0ZpcnN0TGluZSA9IGZhbHNlO1xuICAgICAgcHJldlN0YXRlLnJlc2V0KCk7XG4gICAgfVxuICAgIGxpbmVUZXh0ID0gbGluZVRleHQgKyBcIlxcblwiO1xuICAgIGNvbnN0IG9uaWdMaW5lVGV4dCA9IHRoaXMuY3JlYXRlT25pZ1N0cmluZyhsaW5lVGV4dCk7XG4gICAgY29uc3QgbGluZUxlbmd0aCA9IG9uaWdMaW5lVGV4dC5jb250ZW50Lmxlbmd0aDtcbiAgICBjb25zdCBsaW5lVG9rZW5zID0gbmV3IExpbmVUb2tlbnMoXG4gICAgICBlbWl0QmluYXJ5VG9rZW5zLFxuICAgICAgbGluZVRleHQsXG4gICAgICB0aGlzLl90b2tlblR5cGVNYXRjaGVycyxcbiAgICAgIHRoaXMuYmFsYW5jZWRCcmFja2V0U2VsZWN0b3JzXG4gICAgKTtcbiAgICBjb25zdCByID0gX3Rva2VuaXplU3RyaW5nKFxuICAgICAgdGhpcyxcbiAgICAgIG9uaWdMaW5lVGV4dCxcbiAgICAgIGlzRmlyc3RMaW5lLFxuICAgICAgMCxcbiAgICAgIHByZXZTdGF0ZSxcbiAgICAgIGxpbmVUb2tlbnMsXG4gICAgICB0cnVlLFxuICAgICAgdGltZUxpbWl0XG4gICAgKTtcbiAgICBkaXNwb3NlT25pZ1N0cmluZyhvbmlnTGluZVRleHQpO1xuICAgIHJldHVybiB7XG4gICAgICBsaW5lTGVuZ3RoLFxuICAgICAgbGluZVRva2VucyxcbiAgICAgIHJ1bGVTdGFjazogci5zdGFjayxcbiAgICAgIHN0b3BwZWRFYXJseTogci5zdG9wcGVkRWFybHlcbiAgICB9O1xuICB9XG59O1xuZnVuY3Rpb24gaW5pdEdyYW1tYXIoZ3JhbW1hciwgYmFzZSkge1xuICBncmFtbWFyID0gY2xvbmUoZ3JhbW1hcik7XG4gIGdyYW1tYXIucmVwb3NpdG9yeSA9IGdyYW1tYXIucmVwb3NpdG9yeSB8fCB7fTtcbiAgZ3JhbW1hci5yZXBvc2l0b3J5LiRzZWxmID0ge1xuICAgICR2c2NvZGVUZXh0bWF0ZUxvY2F0aW9uOiBncmFtbWFyLiR2c2NvZGVUZXh0bWF0ZUxvY2F0aW9uLFxuICAgIHBhdHRlcm5zOiBncmFtbWFyLnBhdHRlcm5zLFxuICAgIG5hbWU6IGdyYW1tYXIuc2NvcGVOYW1lXG4gIH07XG4gIGdyYW1tYXIucmVwb3NpdG9yeS4kYmFzZSA9IGJhc2UgfHwgZ3JhbW1hci5yZXBvc2l0b3J5LiRzZWxmO1xuICByZXR1cm4gZ3JhbW1hcjtcbn1cbnZhciBBdHRyaWJ1dGVkU2NvcGVTdGFjayA9IGNsYXNzIF9BdHRyaWJ1dGVkU2NvcGVTdGFjayB7XG4gIC8qKlxuICAgKiBJbnZhcmlhbnQ6XG4gICAqIGBgYFxuICAgKiBpZiAocGFyZW50ICYmICFzY29wZVBhdGguZXh0ZW5kcyhwYXJlbnQuc2NvcGVQYXRoKSkge1xuICAgKiBcdHRocm93IG5ldyBFcnJvcigpO1xuICAgKiB9XG4gICAqIGBgYFxuICAgKi9cbiAgY29uc3RydWN0b3IocGFyZW50LCBzY29wZVBhdGgsIHRva2VuQXR0cmlidXRlcykge1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuc2NvcGVQYXRoID0gc2NvcGVQYXRoO1xuICAgIHRoaXMudG9rZW5BdHRyaWJ1dGVzID0gdG9rZW5BdHRyaWJ1dGVzO1xuICB9XG4gIHN0YXRpYyBmcm9tRXh0ZW5zaW9uKG5hbWVzU2NvcGVMaXN0LCBjb250ZW50TmFtZVNjb3Blc0xpc3QpIHtcbiAgICBsZXQgY3VycmVudCA9IG5hbWVzU2NvcGVMaXN0O1xuICAgIGxldCBzY29wZU5hbWVzID0gbmFtZXNTY29wZUxpc3Q/LnNjb3BlUGF0aCA/PyBudWxsO1xuICAgIGZvciAoY29uc3QgZnJhbWUgb2YgY29udGVudE5hbWVTY29wZXNMaXN0KSB7XG4gICAgICBzY29wZU5hbWVzID0gU2NvcGVTdGFjay5wdXNoKHNjb3BlTmFtZXMsIGZyYW1lLnNjb3BlTmFtZXMpO1xuICAgICAgY3VycmVudCA9IG5ldyBfQXR0cmlidXRlZFNjb3BlU3RhY2soY3VycmVudCwgc2NvcGVOYW1lcywgZnJhbWUuZW5jb2RlZFRva2VuQXR0cmlidXRlcyk7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50O1xuICB9XG4gIHN0YXRpYyBjcmVhdGVSb290KHNjb3BlTmFtZSwgdG9rZW5BdHRyaWJ1dGVzKSB7XG4gICAgcmV0dXJuIG5ldyBfQXR0cmlidXRlZFNjb3BlU3RhY2sobnVsbCwgbmV3IFNjb3BlU3RhY2sobnVsbCwgc2NvcGVOYW1lKSwgdG9rZW5BdHRyaWJ1dGVzKTtcbiAgfVxuICBzdGF0aWMgY3JlYXRlUm9vdEFuZExvb2tVcFNjb3BlTmFtZShzY29wZU5hbWUsIHRva2VuQXR0cmlidXRlcywgZ3JhbW1hcikge1xuICAgIGNvbnN0IHJhd1Jvb3RNZXRhZGF0YSA9IGdyYW1tYXIuZ2V0TWV0YWRhdGFGb3JTY29wZShzY29wZU5hbWUpO1xuICAgIGNvbnN0IHNjb3BlUGF0aCA9IG5ldyBTY29wZVN0YWNrKG51bGwsIHNjb3BlTmFtZSk7XG4gICAgY29uc3Qgcm9vdFN0eWxlID0gZ3JhbW1hci50aGVtZVByb3ZpZGVyLnRoZW1lTWF0Y2goc2NvcGVQYXRoKTtcbiAgICBjb25zdCByZXNvbHZlZFRva2VuQXR0cmlidXRlcyA9IF9BdHRyaWJ1dGVkU2NvcGVTdGFjay5tZXJnZUF0dHJpYnV0ZXMoXG4gICAgICB0b2tlbkF0dHJpYnV0ZXMsXG4gICAgICByYXdSb290TWV0YWRhdGEsXG4gICAgICByb290U3R5bGVcbiAgICApO1xuICAgIHJldHVybiBuZXcgX0F0dHJpYnV0ZWRTY29wZVN0YWNrKG51bGwsIHNjb3BlUGF0aCwgcmVzb2x2ZWRUb2tlbkF0dHJpYnV0ZXMpO1xuICB9XG4gIGdldCBzY29wZU5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2NvcGVQYXRoLnNjb3BlTmFtZTtcbiAgfVxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRTY29wZU5hbWVzKCkuam9pbihcIiBcIik7XG4gIH1cbiAgZXF1YWxzKG90aGVyKSB7XG4gICAgcmV0dXJuIF9BdHRyaWJ1dGVkU2NvcGVTdGFjay5lcXVhbHModGhpcywgb3RoZXIpO1xuICB9XG4gIHN0YXRpYyBlcXVhbHMoYSwgYikge1xuICAgIGRvIHtcbiAgICAgIGlmIChhID09PSBiKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKCFhICYmICFiKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKCFhIHx8ICFiKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChhLnNjb3BlTmFtZSAhPT0gYi5zY29wZU5hbWUgfHwgYS50b2tlbkF0dHJpYnV0ZXMgIT09IGIudG9rZW5BdHRyaWJ1dGVzKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGEgPSBhLnBhcmVudDtcbiAgICAgIGIgPSBiLnBhcmVudDtcbiAgICB9IHdoaWxlICh0cnVlKTtcbiAgfVxuICBzdGF0aWMgbWVyZ2VBdHRyaWJ1dGVzKGV4aXN0aW5nVG9rZW5BdHRyaWJ1dGVzLCBiYXNpY1Njb3BlQXR0cmlidXRlcywgc3R5bGVBdHRyaWJ1dGVzKSB7XG4gICAgbGV0IGZvbnRTdHlsZSA9IC0xIC8qIE5vdFNldCAqLztcbiAgICBsZXQgZm9yZWdyb3VuZCA9IDA7XG4gICAgbGV0IGJhY2tncm91bmQgPSAwO1xuICAgIGlmIChzdHlsZUF0dHJpYnV0ZXMgIT09IG51bGwpIHtcbiAgICAgIGZvbnRTdHlsZSA9IHN0eWxlQXR0cmlidXRlcy5mb250U3R5bGU7XG4gICAgICBmb3JlZ3JvdW5kID0gc3R5bGVBdHRyaWJ1dGVzLmZvcmVncm91bmRJZDtcbiAgICAgIGJhY2tncm91bmQgPSBzdHlsZUF0dHJpYnV0ZXMuYmFja2dyb3VuZElkO1xuICAgIH1cbiAgICByZXR1cm4gRW5jb2RlZFRva2VuTWV0YWRhdGEuc2V0KFxuICAgICAgZXhpc3RpbmdUb2tlbkF0dHJpYnV0ZXMsXG4gICAgICBiYXNpY1Njb3BlQXR0cmlidXRlcy5sYW5ndWFnZUlkLFxuICAgICAgYmFzaWNTY29wZUF0dHJpYnV0ZXMudG9rZW5UeXBlLFxuICAgICAgbnVsbCxcbiAgICAgIGZvbnRTdHlsZSxcbiAgICAgIGZvcmVncm91bmQsXG4gICAgICBiYWNrZ3JvdW5kXG4gICAgKTtcbiAgfVxuICBwdXNoQXR0cmlidXRlZChzY29wZVBhdGgsIGdyYW1tYXIpIHtcbiAgICBpZiAoc2NvcGVQYXRoID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaWYgKHNjb3BlUGF0aC5pbmRleE9mKFwiIFwiKSA9PT0gLTEpIHtcbiAgICAgIHJldHVybiBfQXR0cmlidXRlZFNjb3BlU3RhY2suX3B1c2hBdHRyaWJ1dGVkKHRoaXMsIHNjb3BlUGF0aCwgZ3JhbW1hcik7XG4gICAgfVxuICAgIGNvbnN0IHNjb3BlcyA9IHNjb3BlUGF0aC5zcGxpdCgvIC9nKTtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcztcbiAgICBmb3IgKGNvbnN0IHNjb3BlIG9mIHNjb3Blcykge1xuICAgICAgcmVzdWx0ID0gX0F0dHJpYnV0ZWRTY29wZVN0YWNrLl9wdXNoQXR0cmlidXRlZChyZXN1bHQsIHNjb3BlLCBncmFtbWFyKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBzdGF0aWMgX3B1c2hBdHRyaWJ1dGVkKHRhcmdldCwgc2NvcGVOYW1lLCBncmFtbWFyKSB7XG4gICAgY29uc3QgcmF3TWV0YWRhdGEgPSBncmFtbWFyLmdldE1ldGFkYXRhRm9yU2NvcGUoc2NvcGVOYW1lKTtcbiAgICBjb25zdCBuZXdQYXRoID0gdGFyZ2V0LnNjb3BlUGF0aC5wdXNoKHNjb3BlTmFtZSk7XG4gICAgY29uc3Qgc2NvcGVUaGVtZU1hdGNoUmVzdWx0ID0gZ3JhbW1hci50aGVtZVByb3ZpZGVyLnRoZW1lTWF0Y2gobmV3UGF0aCk7XG4gICAgY29uc3QgbWV0YWRhdGEgPSBfQXR0cmlidXRlZFNjb3BlU3RhY2subWVyZ2VBdHRyaWJ1dGVzKFxuICAgICAgdGFyZ2V0LnRva2VuQXR0cmlidXRlcyxcbiAgICAgIHJhd01ldGFkYXRhLFxuICAgICAgc2NvcGVUaGVtZU1hdGNoUmVzdWx0XG4gICAgKTtcbiAgICByZXR1cm4gbmV3IF9BdHRyaWJ1dGVkU2NvcGVTdGFjayh0YXJnZXQsIG5ld1BhdGgsIG1ldGFkYXRhKTtcbiAgfVxuICBnZXRTY29wZU5hbWVzKCkge1xuICAgIHJldHVybiB0aGlzLnNjb3BlUGF0aC5nZXRTZWdtZW50cygpO1xuICB9XG4gIGdldEV4dGVuc2lvbklmRGVmaW5lZChiYXNlKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIHdoaWxlIChzZWxmICYmIHNlbGYgIT09IGJhc2UpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgZW5jb2RlZFRva2VuQXR0cmlidXRlczogc2VsZi50b2tlbkF0dHJpYnV0ZXMsXG4gICAgICAgIHNjb3BlTmFtZXM6IHNlbGYuc2NvcGVQYXRoLmdldEV4dGVuc2lvbklmRGVmaW5lZChzZWxmLnBhcmVudD8uc2NvcGVQYXRoID8/IG51bGwpXG4gICAgICB9KTtcbiAgICAgIHNlbGYgPSBzZWxmLnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGYgPT09IGJhc2UgPyByZXN1bHQucmV2ZXJzZSgpIDogdm9pZCAwO1xuICB9XG59O1xudmFyIFN0YXRlU3RhY2tJbXBsID0gY2xhc3MgX1N0YXRlU3RhY2tJbXBsIHtcbiAgLyoqXG4gICAqIEludmFyaWFudDpcbiAgICogYGBgXG4gICAqIGlmIChjb250ZW50TmFtZVNjb3Blc0xpc3QgIT09IG5hbWVTY29wZXNMaXN0ICYmIGNvbnRlbnROYW1lU2NvcGVzTGlzdD8ucGFyZW50ICE9PSBuYW1lU2NvcGVzTGlzdCkge1xuICAgKiBcdHRocm93IG5ldyBFcnJvcigpO1xuICAgKiB9XG4gICAqIGlmICh0aGlzLnBhcmVudCAmJiAhbmFtZVNjb3Blc0xpc3QuZXh0ZW5kcyh0aGlzLnBhcmVudC5jb250ZW50TmFtZVNjb3Blc0xpc3QpKSB7XG4gICAqIFx0dGhyb3cgbmV3IEVycm9yKCk7XG4gICAqIH1cbiAgICogYGBgXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJlbnQsIHJ1bGVJZCwgZW50ZXJQb3MsIGFuY2hvclBvcywgYmVnaW5SdWxlQ2FwdHVyZWRFT0wsIGVuZFJ1bGUsIG5hbWVTY29wZXNMaXN0LCBjb250ZW50TmFtZVNjb3Blc0xpc3QpIHtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLnJ1bGVJZCA9IHJ1bGVJZDtcbiAgICB0aGlzLmJlZ2luUnVsZUNhcHR1cmVkRU9MID0gYmVnaW5SdWxlQ2FwdHVyZWRFT0w7XG4gICAgdGhpcy5lbmRSdWxlID0gZW5kUnVsZTtcbiAgICB0aGlzLm5hbWVTY29wZXNMaXN0ID0gbmFtZVNjb3Blc0xpc3Q7XG4gICAgdGhpcy5jb250ZW50TmFtZVNjb3Blc0xpc3QgPSBjb250ZW50TmFtZVNjb3Blc0xpc3Q7XG4gICAgdGhpcy5kZXB0aCA9IHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZGVwdGggKyAxIDogMTtcbiAgICB0aGlzLl9lbnRlclBvcyA9IGVudGVyUG9zO1xuICAgIHRoaXMuX2FuY2hvclBvcyA9IGFuY2hvclBvcztcbiAgfVxuICBfc3RhY2tFbGVtZW50QnJhbmQgPSB2b2lkIDA7XG4gIC8vIFRPRE8gcmVtb3ZlIG1lXG4gIHN0YXRpYyBOVUxMID0gbmV3IF9TdGF0ZVN0YWNrSW1wbChcbiAgICBudWxsLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIGZhbHNlLFxuICAgIG51bGwsXG4gICAgbnVsbCxcbiAgICBudWxsXG4gICk7XG4gIC8qKlxuICAgKiBUaGUgcG9zaXRpb24gb24gdGhlIGN1cnJlbnQgbGluZSB3aGVyZSB0aGlzIHN0YXRlIHdhcyBwdXNoZWQuXG4gICAqIFRoaXMgaXMgcmVsZXZhbnQgb25seSB3aGlsZSB0b2tlbml6aW5nIGEgbGluZSwgdG8gZGV0ZWN0IGVuZGxlc3MgbG9vcHMuXG4gICAqIEl0cyB2YWx1ZSBpcyBtZWFuaW5nbGVzcyBhY3Jvc3MgbGluZXMuXG4gICAqL1xuICBfZW50ZXJQb3M7XG4gIC8qKlxuICAgKiBUaGUgY2FwdHVyZWQgYW5jaG9yIHBvc2l0aW9uIHdoZW4gdGhpcyBzdGFjayBlbGVtZW50IHdhcyBwdXNoZWQuXG4gICAqIFRoaXMgaXMgcmVsZXZhbnQgb25seSB3aGlsZSB0b2tlbml6aW5nIGEgbGluZSwgdG8gcmVzdG9yZSB0aGUgYW5jaG9yIHBvc2l0aW9uIHdoZW4gcG9wcGluZy5cbiAgICogSXRzIHZhbHVlIGlzIG1lYW5pbmdsZXNzIGFjcm9zcyBsaW5lcy5cbiAgICovXG4gIF9hbmNob3JQb3M7XG4gIC8qKlxuICAgKiBUaGUgZGVwdGggb2YgdGhlIHN0YWNrLlxuICAgKi9cbiAgZGVwdGg7XG4gIGVxdWFscyhvdGhlcikge1xuICAgIGlmIChvdGhlciA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gX1N0YXRlU3RhY2tJbXBsLl9lcXVhbHModGhpcywgb3RoZXIpO1xuICB9XG4gIHN0YXRpYyBfZXF1YWxzKGEsIGIpIHtcbiAgICBpZiAoYSA9PT0gYikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICghdGhpcy5fc3RydWN0dXJhbEVxdWFscyhhLCBiKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gQXR0cmlidXRlZFNjb3BlU3RhY2suZXF1YWxzKGEuY29udGVudE5hbWVTY29wZXNMaXN0LCBiLmNvbnRlbnROYW1lU2NvcGVzTGlzdCk7XG4gIH1cbiAgLyoqXG4gICAqIEEgc3RydWN0dXJhbCBlcXVhbHMgY2hlY2suIERvZXMgbm90IHRha2UgaW50byBhY2NvdW50IGBzY29wZXNgLlxuICAgKi9cbiAgc3RhdGljIF9zdHJ1Y3R1cmFsRXF1YWxzKGEsIGIpIHtcbiAgICBkbyB7XG4gICAgICBpZiAoYSA9PT0gYikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICghYSAmJiAhYikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICghYSB8fCAhYikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoYS5kZXB0aCAhPT0gYi5kZXB0aCB8fCBhLnJ1bGVJZCAhPT0gYi5ydWxlSWQgfHwgYS5lbmRSdWxlICE9PSBiLmVuZFJ1bGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgYSA9IGEucGFyZW50O1xuICAgICAgYiA9IGIucGFyZW50O1xuICAgIH0gd2hpbGUgKHRydWUpO1xuICB9XG4gIGNsb25lKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHN0YXRpYyBfcmVzZXQoZWwpIHtcbiAgICB3aGlsZSAoZWwpIHtcbiAgICAgIGVsLl9lbnRlclBvcyA9IC0xO1xuICAgICAgZWwuX2FuY2hvclBvcyA9IC0xO1xuICAgICAgZWwgPSBlbC5wYXJlbnQ7XG4gICAgfVxuICB9XG4gIHJlc2V0KCkge1xuICAgIF9TdGF0ZVN0YWNrSW1wbC5fcmVzZXQodGhpcyk7XG4gIH1cbiAgcG9wKCkge1xuICAgIHJldHVybiB0aGlzLnBhcmVudDtcbiAgfVxuICBzYWZlUG9wKCkge1xuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBwdXNoKHJ1bGVJZCwgZW50ZXJQb3MsIGFuY2hvclBvcywgYmVnaW5SdWxlQ2FwdHVyZWRFT0wsIGVuZFJ1bGUsIG5hbWVTY29wZXNMaXN0LCBjb250ZW50TmFtZVNjb3Blc0xpc3QpIHtcbiAgICByZXR1cm4gbmV3IF9TdGF0ZVN0YWNrSW1wbChcbiAgICAgIHRoaXMsXG4gICAgICBydWxlSWQsXG4gICAgICBlbnRlclBvcyxcbiAgICAgIGFuY2hvclBvcyxcbiAgICAgIGJlZ2luUnVsZUNhcHR1cmVkRU9MLFxuICAgICAgZW5kUnVsZSxcbiAgICAgIG5hbWVTY29wZXNMaXN0LFxuICAgICAgY29udGVudE5hbWVTY29wZXNMaXN0XG4gICAgKTtcbiAgfVxuICBnZXRFbnRlclBvcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZW50ZXJQb3M7XG4gIH1cbiAgZ2V0QW5jaG9yUG9zKCkge1xuICAgIHJldHVybiB0aGlzLl9hbmNob3JQb3M7XG4gIH1cbiAgZ2V0UnVsZShncmFtbWFyKSB7XG4gICAgcmV0dXJuIGdyYW1tYXIuZ2V0UnVsZSh0aGlzLnJ1bGVJZCk7XG4gIH1cbiAgdG9TdHJpbmcoKSB7XG4gICAgY29uc3QgciA9IFtdO1xuICAgIHRoaXMuX3dyaXRlU3RyaW5nKHIsIDApO1xuICAgIHJldHVybiBcIltcIiArIHIuam9pbihcIixcIikgKyBcIl1cIjtcbiAgfVxuICBfd3JpdGVTdHJpbmcocmVzLCBvdXRJbmRleCkge1xuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgb3V0SW5kZXggPSB0aGlzLnBhcmVudC5fd3JpdGVTdHJpbmcocmVzLCBvdXRJbmRleCk7XG4gICAgfVxuICAgIHJlc1tvdXRJbmRleCsrXSA9IGAoJHt0aGlzLnJ1bGVJZH0sICR7dGhpcy5uYW1lU2NvcGVzTGlzdD8udG9TdHJpbmcoKX0sICR7dGhpcy5jb250ZW50TmFtZVNjb3Blc0xpc3Q/LnRvU3RyaW5nKCl9KWA7XG4gICAgcmV0dXJuIG91dEluZGV4O1xuICB9XG4gIHdpdGhDb250ZW50TmFtZVNjb3Blc0xpc3QoY29udGVudE5hbWVTY29wZVN0YWNrKSB7XG4gICAgaWYgKHRoaXMuY29udGVudE5hbWVTY29wZXNMaXN0ID09PSBjb250ZW50TmFtZVNjb3BlU3RhY2spIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wYXJlbnQucHVzaChcbiAgICAgIHRoaXMucnVsZUlkLFxuICAgICAgdGhpcy5fZW50ZXJQb3MsXG4gICAgICB0aGlzLl9hbmNob3JQb3MsXG4gICAgICB0aGlzLmJlZ2luUnVsZUNhcHR1cmVkRU9MLFxuICAgICAgdGhpcy5lbmRSdWxlLFxuICAgICAgdGhpcy5uYW1lU2NvcGVzTGlzdCxcbiAgICAgIGNvbnRlbnROYW1lU2NvcGVTdGFja1xuICAgICk7XG4gIH1cbiAgd2l0aEVuZFJ1bGUoZW5kUnVsZSkge1xuICAgIGlmICh0aGlzLmVuZFJ1bGUgPT09IGVuZFJ1bGUpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IF9TdGF0ZVN0YWNrSW1wbChcbiAgICAgIHRoaXMucGFyZW50LFxuICAgICAgdGhpcy5ydWxlSWQsXG4gICAgICB0aGlzLl9lbnRlclBvcyxcbiAgICAgIHRoaXMuX2FuY2hvclBvcyxcbiAgICAgIHRoaXMuYmVnaW5SdWxlQ2FwdHVyZWRFT0wsXG4gICAgICBlbmRSdWxlLFxuICAgICAgdGhpcy5uYW1lU2NvcGVzTGlzdCxcbiAgICAgIHRoaXMuY29udGVudE5hbWVTY29wZXNMaXN0XG4gICAgKTtcbiAgfVxuICAvLyBVc2VkIHRvIHdhcm4gb2YgZW5kbGVzcyBsb29wc1xuICBoYXNTYW1lUnVsZUFzKG90aGVyKSB7XG4gICAgbGV0IGVsID0gdGhpcztcbiAgICB3aGlsZSAoZWwgJiYgZWwuX2VudGVyUG9zID09PSBvdGhlci5fZW50ZXJQb3MpIHtcbiAgICAgIGlmIChlbC5ydWxlSWQgPT09IG90aGVyLnJ1bGVJZCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsID0gZWwucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdG9TdGF0ZVN0YWNrRnJhbWUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJ1bGVJZDogcnVsZUlkVG9OdW1iZXIodGhpcy5ydWxlSWQpLFxuICAgICAgYmVnaW5SdWxlQ2FwdHVyZWRFT0w6IHRoaXMuYmVnaW5SdWxlQ2FwdHVyZWRFT0wsXG4gICAgICBlbmRSdWxlOiB0aGlzLmVuZFJ1bGUsXG4gICAgICBuYW1lU2NvcGVzTGlzdDogdGhpcy5uYW1lU2NvcGVzTGlzdD8uZ2V0RXh0ZW5zaW9uSWZEZWZpbmVkKHRoaXMucGFyZW50Py5uYW1lU2NvcGVzTGlzdCA/PyBudWxsKSA/PyBbXSxcbiAgICAgIGNvbnRlbnROYW1lU2NvcGVzTGlzdDogdGhpcy5jb250ZW50TmFtZVNjb3Blc0xpc3Q/LmdldEV4dGVuc2lvbklmRGVmaW5lZCh0aGlzLm5hbWVTY29wZXNMaXN0KSA/PyBbXVxuICAgIH07XG4gIH1cbiAgc3RhdGljIHB1c2hGcmFtZShzZWxmLCBmcmFtZSkge1xuICAgIGNvbnN0IG5hbWVzU2NvcGVMaXN0ID0gQXR0cmlidXRlZFNjb3BlU3RhY2suZnJvbUV4dGVuc2lvbihzZWxmPy5uYW1lU2NvcGVzTGlzdCA/PyBudWxsLCBmcmFtZS5uYW1lU2NvcGVzTGlzdCk7XG4gICAgcmV0dXJuIG5ldyBfU3RhdGVTdGFja0ltcGwoXG4gICAgICBzZWxmLFxuICAgICAgcnVsZUlkRnJvbU51bWJlcihmcmFtZS5ydWxlSWQpLFxuICAgICAgZnJhbWUuZW50ZXJQb3MgPz8gLTEsXG4gICAgICBmcmFtZS5hbmNob3JQb3MgPz8gLTEsXG4gICAgICBmcmFtZS5iZWdpblJ1bGVDYXB0dXJlZEVPTCxcbiAgICAgIGZyYW1lLmVuZFJ1bGUsXG4gICAgICBuYW1lc1Njb3BlTGlzdCxcbiAgICAgIEF0dHJpYnV0ZWRTY29wZVN0YWNrLmZyb21FeHRlbnNpb24obmFtZXNTY29wZUxpc3QsIGZyYW1lLmNvbnRlbnROYW1lU2NvcGVzTGlzdClcbiAgICApO1xuICB9XG59O1xudmFyIEJhbGFuY2VkQnJhY2tldFNlbGVjdG9ycyA9IGNsYXNzIHtcbiAgYmFsYW5jZWRCcmFja2V0U2NvcGVzO1xuICB1bmJhbGFuY2VkQnJhY2tldFNjb3BlcztcbiAgYWxsb3dBbnkgPSBmYWxzZTtcbiAgY29uc3RydWN0b3IoYmFsYW5jZWRCcmFja2V0U2NvcGVzLCB1bmJhbGFuY2VkQnJhY2tldFNjb3Blcykge1xuICAgIHRoaXMuYmFsYW5jZWRCcmFja2V0U2NvcGVzID0gYmFsYW5jZWRCcmFja2V0U2NvcGVzLmZsYXRNYXAoXG4gICAgICAoc2VsZWN0b3IpID0+IHtcbiAgICAgICAgaWYgKHNlbGVjdG9yID09PSBcIipcIikge1xuICAgICAgICAgIHRoaXMuYWxsb3dBbnkgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3JlYXRlTWF0Y2hlcnMoc2VsZWN0b3IsIG5hbWVNYXRjaGVyKS5tYXAoKG0pID0+IG0ubWF0Y2hlcik7XG4gICAgICB9XG4gICAgKTtcbiAgICB0aGlzLnVuYmFsYW5jZWRCcmFja2V0U2NvcGVzID0gdW5iYWxhbmNlZEJyYWNrZXRTY29wZXMuZmxhdE1hcChcbiAgICAgIChzZWxlY3RvcikgPT4gY3JlYXRlTWF0Y2hlcnMoc2VsZWN0b3IsIG5hbWVNYXRjaGVyKS5tYXAoKG0pID0+IG0ubWF0Y2hlcilcbiAgICApO1xuICB9XG4gIGdldCBtYXRjaGVzQWx3YXlzKCkge1xuICAgIHJldHVybiB0aGlzLmFsbG93QW55ICYmIHRoaXMudW5iYWxhbmNlZEJyYWNrZXRTY29wZXMubGVuZ3RoID09PSAwO1xuICB9XG4gIGdldCBtYXRjaGVzTmV2ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmFsYW5jZWRCcmFja2V0U2NvcGVzLmxlbmd0aCA9PT0gMCAmJiAhdGhpcy5hbGxvd0FueTtcbiAgfVxuICBtYXRjaChzY29wZXMpIHtcbiAgICBmb3IgKGNvbnN0IGV4Y2x1ZGVyIG9mIHRoaXMudW5iYWxhbmNlZEJyYWNrZXRTY29wZXMpIHtcbiAgICAgIGlmIChleGNsdWRlcihzY29wZXMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBpbmNsdWRlciBvZiB0aGlzLmJhbGFuY2VkQnJhY2tldFNjb3Blcykge1xuICAgICAgaWYgKGluY2x1ZGVyKHNjb3BlcykpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFsbG93QW55O1xuICB9XG59O1xudmFyIExpbmVUb2tlbnMgPSBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKGVtaXRCaW5hcnlUb2tlbnMsIGxpbmVUZXh0LCB0b2tlblR5cGVPdmVycmlkZXMsIGJhbGFuY2VkQnJhY2tldFNlbGVjdG9ycykge1xuICAgIHRoaXMuYmFsYW5jZWRCcmFja2V0U2VsZWN0b3JzID0gYmFsYW5jZWRCcmFja2V0U2VsZWN0b3JzO1xuICAgIHRoaXMuX2VtaXRCaW5hcnlUb2tlbnMgPSBlbWl0QmluYXJ5VG9rZW5zO1xuICAgIHRoaXMuX3Rva2VuVHlwZU92ZXJyaWRlcyA9IHRva2VuVHlwZU92ZXJyaWRlcztcbiAgICBpZiAoZmFsc2UpIHtcbiAgICAgIHRoaXMuX2xpbmVUZXh0ID0gbGluZVRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xpbmVUZXh0ID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5fdG9rZW5zID0gW107XG4gICAgdGhpcy5fYmluYXJ5VG9rZW5zID0gW107XG4gICAgdGhpcy5fbGFzdFRva2VuRW5kSW5kZXggPSAwO1xuICB9XG4gIF9lbWl0QmluYXJ5VG9rZW5zO1xuICAvKipcbiAgICogZGVmaW5lZCBvbmx5IGlmIGBmYWxzZWAuXG4gICAqL1xuICBfbGluZVRleHQ7XG4gIC8qKlxuICAgKiB1c2VkIG9ubHkgaWYgYF9lbWl0QmluYXJ5VG9rZW5zYCBpcyBmYWxzZS5cbiAgICovXG4gIF90b2tlbnM7XG4gIC8qKlxuICAgKiB1c2VkIG9ubHkgaWYgYF9lbWl0QmluYXJ5VG9rZW5zYCBpcyB0cnVlLlxuICAgKi9cbiAgX2JpbmFyeVRva2VucztcbiAgX2xhc3RUb2tlbkVuZEluZGV4O1xuICBfdG9rZW5UeXBlT3ZlcnJpZGVzO1xuICBwcm9kdWNlKHN0YWNrLCBlbmRJbmRleCkge1xuICAgIHRoaXMucHJvZHVjZUZyb21TY29wZXMoc3RhY2suY29udGVudE5hbWVTY29wZXNMaXN0LCBlbmRJbmRleCk7XG4gIH1cbiAgcHJvZHVjZUZyb21TY29wZXMoc2NvcGVzTGlzdCwgZW5kSW5kZXgpIHtcbiAgICBpZiAodGhpcy5fbGFzdFRva2VuRW5kSW5kZXggPj0gZW5kSW5kZXgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2VtaXRCaW5hcnlUb2tlbnMpIHtcbiAgICAgIGxldCBtZXRhZGF0YSA9IHNjb3Blc0xpc3Q/LnRva2VuQXR0cmlidXRlcyA/PyAwO1xuICAgICAgbGV0IGNvbnRhaW5zQmFsYW5jZWRCcmFja2V0cyA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMuYmFsYW5jZWRCcmFja2V0U2VsZWN0b3JzPy5tYXRjaGVzQWx3YXlzKSB7XG4gICAgICAgIGNvbnRhaW5zQmFsYW5jZWRCcmFja2V0cyA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fdG9rZW5UeXBlT3ZlcnJpZGVzLmxlbmd0aCA+IDAgfHwgdGhpcy5iYWxhbmNlZEJyYWNrZXRTZWxlY3RvcnMgJiYgIXRoaXMuYmFsYW5jZWRCcmFja2V0U2VsZWN0b3JzLm1hdGNoZXNBbHdheXMgJiYgIXRoaXMuYmFsYW5jZWRCcmFja2V0U2VsZWN0b3JzLm1hdGNoZXNOZXZlcikge1xuICAgICAgICBjb25zdCBzY29wZXMyID0gc2NvcGVzTGlzdD8uZ2V0U2NvcGVOYW1lcygpID8/IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHRva2VuVHlwZSBvZiB0aGlzLl90b2tlblR5cGVPdmVycmlkZXMpIHtcbiAgICAgICAgICBpZiAodG9rZW5UeXBlLm1hdGNoZXIoc2NvcGVzMikpIHtcbiAgICAgICAgICAgIG1ldGFkYXRhID0gRW5jb2RlZFRva2VuTWV0YWRhdGEuc2V0KFxuICAgICAgICAgICAgICBtZXRhZGF0YSxcbiAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgdG9PcHRpb25hbFRva2VuVHlwZSh0b2tlblR5cGUudHlwZSksXG4gICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgIC0xIC8qIE5vdFNldCAqLyxcbiAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYmFsYW5jZWRCcmFja2V0U2VsZWN0b3JzKSB7XG4gICAgICAgICAgY29udGFpbnNCYWxhbmNlZEJyYWNrZXRzID0gdGhpcy5iYWxhbmNlZEJyYWNrZXRTZWxlY3RvcnMubWF0Y2goc2NvcGVzMik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjb250YWluc0JhbGFuY2VkQnJhY2tldHMpIHtcbiAgICAgICAgbWV0YWRhdGEgPSBFbmNvZGVkVG9rZW5NZXRhZGF0YS5zZXQoXG4gICAgICAgICAgbWV0YWRhdGEsXG4gICAgICAgICAgMCxcbiAgICAgICAgICA4IC8qIE5vdFNldCAqLyxcbiAgICAgICAgICBjb250YWluc0JhbGFuY2VkQnJhY2tldHMsXG4gICAgICAgICAgLTEgLyogTm90U2V0ICovLFxuICAgICAgICAgIDAsXG4gICAgICAgICAgMFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX2JpbmFyeVRva2Vucy5sZW5ndGggPiAwICYmIHRoaXMuX2JpbmFyeVRva2Vuc1t0aGlzLl9iaW5hcnlUb2tlbnMubGVuZ3RoIC0gMV0gPT09IG1ldGFkYXRhKSB7XG4gICAgICAgIHRoaXMuX2xhc3RUb2tlbkVuZEluZGV4ID0gZW5kSW5kZXg7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2JpbmFyeVRva2Vucy5wdXNoKHRoaXMuX2xhc3RUb2tlbkVuZEluZGV4KTtcbiAgICAgIHRoaXMuX2JpbmFyeVRva2Vucy5wdXNoKG1ldGFkYXRhKTtcbiAgICAgIHRoaXMuX2xhc3RUb2tlbkVuZEluZGV4ID0gZW5kSW5kZXg7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHNjb3BlcyA9IHNjb3Blc0xpc3Q/LmdldFNjb3BlTmFtZXMoKSA/PyBbXTtcbiAgICB0aGlzLl90b2tlbnMucHVzaCh7XG4gICAgICBzdGFydEluZGV4OiB0aGlzLl9sYXN0VG9rZW5FbmRJbmRleCxcbiAgICAgIGVuZEluZGV4LFxuICAgICAgLy8gdmFsdWU6IGxpbmVUZXh0LnN1YnN0cmluZyhsYXN0VG9rZW5FbmRJbmRleCwgZW5kSW5kZXgpLFxuICAgICAgc2NvcGVzXG4gICAgfSk7XG4gICAgdGhpcy5fbGFzdFRva2VuRW5kSW5kZXggPSBlbmRJbmRleDtcbiAgfVxuICBnZXRSZXN1bHQoc3RhY2ssIGxpbmVMZW5ndGgpIHtcbiAgICBpZiAodGhpcy5fdG9rZW5zLmxlbmd0aCA+IDAgJiYgdGhpcy5fdG9rZW5zW3RoaXMuX3Rva2Vucy5sZW5ndGggLSAxXS5zdGFydEluZGV4ID09PSBsaW5lTGVuZ3RoIC0gMSkge1xuICAgICAgdGhpcy5fdG9rZW5zLnBvcCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fdG9rZW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5fbGFzdFRva2VuRW5kSW5kZXggPSAtMTtcbiAgICAgIHRoaXMucHJvZHVjZShzdGFjaywgbGluZUxlbmd0aCk7XG4gICAgICB0aGlzLl90b2tlbnNbdGhpcy5fdG9rZW5zLmxlbmd0aCAtIDFdLnN0YXJ0SW5kZXggPSAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdG9rZW5zO1xuICB9XG4gIGdldEJpbmFyeVJlc3VsdChzdGFjaywgbGluZUxlbmd0aCkge1xuICAgIGlmICh0aGlzLl9iaW5hcnlUb2tlbnMubGVuZ3RoID4gMCAmJiB0aGlzLl9iaW5hcnlUb2tlbnNbdGhpcy5fYmluYXJ5VG9rZW5zLmxlbmd0aCAtIDJdID09PSBsaW5lTGVuZ3RoIC0gMSkge1xuICAgICAgdGhpcy5fYmluYXJ5VG9rZW5zLnBvcCgpO1xuICAgICAgdGhpcy5fYmluYXJ5VG9rZW5zLnBvcCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fYmluYXJ5VG9rZW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5fbGFzdFRva2VuRW5kSW5kZXggPSAtMTtcbiAgICAgIHRoaXMucHJvZHVjZShzdGFjaywgbGluZUxlbmd0aCk7XG4gICAgICB0aGlzLl9iaW5hcnlUb2tlbnNbdGhpcy5fYmluYXJ5VG9rZW5zLmxlbmd0aCAtIDJdID0gMDtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFVpbnQzMkFycmF5KHRoaXMuX2JpbmFyeVRva2Vucy5sZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLl9iaW5hcnlUb2tlbnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHJlc3VsdFtpXSA9IHRoaXMuX2JpbmFyeVRva2Vuc1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcblxuLy8gc3JjL3JlZ2lzdHJ5LnRzXG52YXIgU3luY1JlZ2lzdHJ5ID0gY2xhc3Mge1xuICBjb25zdHJ1Y3Rvcih0aGVtZSwgX29uaWdMaWIpIHtcbiAgICB0aGlzLl9vbmlnTGliID0gX29uaWdMaWI7XG4gICAgdGhpcy5fdGhlbWUgPSB0aGVtZTtcbiAgfVxuICBfZ3JhbW1hcnMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuICBfcmF3R3JhbW1hcnMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuICBfaW5qZWN0aW9uR3JhbW1hcnMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuICBfdGhlbWU7XG4gIGRpc3Bvc2UoKSB7XG4gICAgZm9yIChjb25zdCBncmFtbWFyIG9mIHRoaXMuX2dyYW1tYXJzLnZhbHVlcygpKSB7XG4gICAgICBncmFtbWFyLmRpc3Bvc2UoKTtcbiAgICB9XG4gIH1cbiAgc2V0VGhlbWUodGhlbWUpIHtcbiAgICB0aGlzLl90aGVtZSA9IHRoZW1lO1xuICB9XG4gIGdldENvbG9yTWFwKCkge1xuICAgIHJldHVybiB0aGlzLl90aGVtZS5nZXRDb2xvck1hcCgpO1xuICB9XG4gIC8qKlxuICAgKiBBZGQgYGdyYW1tYXJgIHRvIHJlZ2lzdHJ5IGFuZCByZXR1cm4gYSBsaXN0IG9mIHJlZmVyZW5jZWQgc2NvcGUgbmFtZXNcbiAgICovXG4gIGFkZEdyYW1tYXIoZ3JhbW1hciwgaW5qZWN0aW9uU2NvcGVOYW1lcykge1xuICAgIHRoaXMuX3Jhd0dyYW1tYXJzLnNldChncmFtbWFyLnNjb3BlTmFtZSwgZ3JhbW1hcik7XG4gICAgaWYgKGluamVjdGlvblNjb3BlTmFtZXMpIHtcbiAgICAgIHRoaXMuX2luamVjdGlvbkdyYW1tYXJzLnNldChncmFtbWFyLnNjb3BlTmFtZSwgaW5qZWN0aW9uU2NvcGVOYW1lcyk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBMb29rdXAgYSByYXcgZ3JhbW1hci5cbiAgICovXG4gIGxvb2t1cChzY29wZU5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3R3JhbW1hcnMuZ2V0KHNjb3BlTmFtZSk7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGluamVjdGlvbnMgZm9yIHRoZSBnaXZlbiBncmFtbWFyXG4gICAqL1xuICBpbmplY3Rpb25zKHRhcmdldFNjb3BlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luamVjdGlvbkdyYW1tYXJzLmdldCh0YXJnZXRTY29wZSk7XG4gIH1cbiAgLyoqXG4gICAqIEdldCB0aGUgZGVmYXVsdCB0aGVtZSBzZXR0aW5nc1xuICAgKi9cbiAgZ2V0RGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RoZW1lLmdldERlZmF1bHRzKCk7XG4gIH1cbiAgLyoqXG4gICAqIE1hdGNoIGEgc2NvcGUgaW4gdGhlIHRoZW1lLlxuICAgKi9cbiAgdGhlbWVNYXRjaChzY29wZVBhdGgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGhlbWUubWF0Y2goc2NvcGVQYXRoKTtcbiAgfVxuICAvKipcbiAgICogTG9va3VwIGEgZ3JhbW1hci5cbiAgICovXG4gIGdyYW1tYXJGb3JTY29wZU5hbWUoc2NvcGVOYW1lLCBpbml0aWFsTGFuZ3VhZ2UsIGVtYmVkZGVkTGFuZ3VhZ2VzLCB0b2tlblR5cGVzLCBiYWxhbmNlZEJyYWNrZXRTZWxlY3RvcnMpIHtcbiAgICBpZiAoIXRoaXMuX2dyYW1tYXJzLmhhcyhzY29wZU5hbWUpKSB7XG4gICAgICBsZXQgcmF3R3JhbW1hciA9IHRoaXMuX3Jhd0dyYW1tYXJzLmdldChzY29wZU5hbWUpO1xuICAgICAgaWYgKCFyYXdHcmFtbWFyKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgdGhpcy5fZ3JhbW1hcnMuc2V0KHNjb3BlTmFtZSwgY3JlYXRlR3JhbW1hcihcbiAgICAgICAgc2NvcGVOYW1lLFxuICAgICAgICByYXdHcmFtbWFyLFxuICAgICAgICBpbml0aWFsTGFuZ3VhZ2UsXG4gICAgICAgIGVtYmVkZGVkTGFuZ3VhZ2VzLFxuICAgICAgICB0b2tlblR5cGVzLFxuICAgICAgICBiYWxhbmNlZEJyYWNrZXRTZWxlY3RvcnMsXG4gICAgICAgIHRoaXMsXG4gICAgICAgIHRoaXMuX29uaWdMaWJcbiAgICAgICkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZ3JhbW1hcnMuZ2V0KHNjb3BlTmFtZSk7XG4gIH1cbn07XG5cbi8vIHNyYy9pbmRleC50c1xudmFyIFJlZ2lzdHJ5ID0gY2xhc3Mge1xuICBfb3B0aW9ucztcbiAgX3N5bmNSZWdpc3RyeTtcbiAgX2Vuc3VyZUdyYW1tYXJDYWNoZTtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuX3N5bmNSZWdpc3RyeSA9IG5ldyBTeW5jUmVnaXN0cnkoXG4gICAgICBUaGVtZS5jcmVhdGVGcm9tUmF3VGhlbWUob3B0aW9ucy50aGVtZSwgb3B0aW9ucy5jb2xvck1hcCksXG4gICAgICBvcHRpb25zLm9uaWdMaWJcbiAgICApO1xuICAgIHRoaXMuX2Vuc3VyZUdyYW1tYXJDYWNoZSA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gIH1cbiAgZGlzcG9zZSgpIHtcbiAgICB0aGlzLl9zeW5jUmVnaXN0cnkuZGlzcG9zZSgpO1xuICB9XG4gIC8qKlxuICAgKiBDaGFuZ2UgdGhlIHRoZW1lLiBPbmNlIGNhbGxlZCwgbm8gcHJldmlvdXMgYHJ1bGVTdGFja2Agc2hvdWxkIGJlIHVzZWQgYW55bW9yZS5cbiAgICovXG4gIHNldFRoZW1lKHRoZW1lLCBjb2xvck1hcCkge1xuICAgIHRoaXMuX3N5bmNSZWdpc3RyeS5zZXRUaGVtZShUaGVtZS5jcmVhdGVGcm9tUmF3VGhlbWUodGhlbWUsIGNvbG9yTWFwKSk7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsb29rdXAgYXJyYXkgZm9yIGNvbG9yIGlkcy5cbiAgICovXG4gIGdldENvbG9yTWFwKCkge1xuICAgIHJldHVybiB0aGlzLl9zeW5jUmVnaXN0cnkuZ2V0Q29sb3JNYXAoKTtcbiAgfVxuICAvKipcbiAgICogTG9hZCB0aGUgZ3JhbW1hciBmb3IgYHNjb3BlTmFtZWAgYW5kIGFsbCByZWZlcmVuY2VkIGluY2x1ZGVkIGdyYW1tYXJzIGFzeW5jaHJvbm91c2x5LlxuICAgKiBQbGVhc2UgZG8gbm90IHVzZSBsYW5ndWFnZSBpZCAwLlxuICAgKi9cbiAgbG9hZEdyYW1tYXJXaXRoRW1iZWRkZWRMYW5ndWFnZXMoaW5pdGlhbFNjb3BlTmFtZSwgaW5pdGlhbExhbmd1YWdlLCBlbWJlZGRlZExhbmd1YWdlcykge1xuICAgIHJldHVybiB0aGlzLmxvYWRHcmFtbWFyV2l0aENvbmZpZ3VyYXRpb24oaW5pdGlhbFNjb3BlTmFtZSwgaW5pdGlhbExhbmd1YWdlLCB7IGVtYmVkZGVkTGFuZ3VhZ2VzIH0pO1xuICB9XG4gIC8qKlxuICAgKiBMb2FkIHRoZSBncmFtbWFyIGZvciBgc2NvcGVOYW1lYCBhbmQgYWxsIHJlZmVyZW5jZWQgaW5jbHVkZWQgZ3JhbW1hcnMgYXN5bmNocm9ub3VzbHkuXG4gICAqIFBsZWFzZSBkbyBub3QgdXNlIGxhbmd1YWdlIGlkIDAuXG4gICAqL1xuICBsb2FkR3JhbW1hcldpdGhDb25maWd1cmF0aW9uKGluaXRpYWxTY29wZU5hbWUsIGluaXRpYWxMYW5ndWFnZSwgY29uZmlndXJhdGlvbikge1xuICAgIHJldHVybiB0aGlzLl9sb2FkR3JhbW1hcihcbiAgICAgIGluaXRpYWxTY29wZU5hbWUsXG4gICAgICBpbml0aWFsTGFuZ3VhZ2UsXG4gICAgICBjb25maWd1cmF0aW9uLmVtYmVkZGVkTGFuZ3VhZ2VzLFxuICAgICAgY29uZmlndXJhdGlvbi50b2tlblR5cGVzLFxuICAgICAgbmV3IEJhbGFuY2VkQnJhY2tldFNlbGVjdG9ycyhcbiAgICAgICAgY29uZmlndXJhdGlvbi5iYWxhbmNlZEJyYWNrZXRTZWxlY3RvcnMgfHwgW10sXG4gICAgICAgIGNvbmZpZ3VyYXRpb24udW5iYWxhbmNlZEJyYWNrZXRTZWxlY3RvcnMgfHwgW11cbiAgICAgIClcbiAgICApO1xuICB9XG4gIC8qKlxuICAgKiBMb2FkIHRoZSBncmFtbWFyIGZvciBgc2NvcGVOYW1lYCBhbmQgYWxsIHJlZmVyZW5jZWQgaW5jbHVkZWQgZ3JhbW1hcnMgYXN5bmNocm9ub3VzbHkuXG4gICAqL1xuICBsb2FkR3JhbW1hcihpbml0aWFsU2NvcGVOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvYWRHcmFtbWFyKGluaXRpYWxTY29wZU5hbWUsIDAsIG51bGwsIG51bGwsIG51bGwpO1xuICB9XG4gIF9sb2FkR3JhbW1hcihpbml0aWFsU2NvcGVOYW1lLCBpbml0aWFsTGFuZ3VhZ2UsIGVtYmVkZGVkTGFuZ3VhZ2VzLCB0b2tlblR5cGVzLCBiYWxhbmNlZEJyYWNrZXRTZWxlY3RvcnMpIHtcbiAgICBjb25zdCBkZXBlbmRlbmN5UHJvY2Vzc29yID0gbmV3IFNjb3BlRGVwZW5kZW5jeVByb2Nlc3Nvcih0aGlzLl9zeW5jUmVnaXN0cnksIGluaXRpYWxTY29wZU5hbWUpO1xuICAgIHdoaWxlIChkZXBlbmRlbmN5UHJvY2Vzc29yLlEubGVuZ3RoID4gMCkge1xuICAgICAgZGVwZW5kZW5jeVByb2Nlc3Nvci5RLm1hcCgocmVxdWVzdCkgPT4gdGhpcy5fbG9hZFNpbmdsZUdyYW1tYXIocmVxdWVzdC5zY29wZU5hbWUpKTtcbiAgICAgIGRlcGVuZGVuY3lQcm9jZXNzb3IucHJvY2Vzc1F1ZXVlKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9ncmFtbWFyRm9yU2NvcGVOYW1lKFxuICAgICAgaW5pdGlhbFNjb3BlTmFtZSxcbiAgICAgIGluaXRpYWxMYW5ndWFnZSxcbiAgICAgIGVtYmVkZGVkTGFuZ3VhZ2VzLFxuICAgICAgdG9rZW5UeXBlcyxcbiAgICAgIGJhbGFuY2VkQnJhY2tldFNlbGVjdG9yc1xuICAgICk7XG4gIH1cbiAgX2xvYWRTaW5nbGVHcmFtbWFyKHNjb3BlTmFtZSkge1xuICAgIGlmICghdGhpcy5fZW5zdXJlR3JhbW1hckNhY2hlLmhhcyhzY29wZU5hbWUpKSB7XG4gICAgICB0aGlzLl9kb0xvYWRTaW5nbGVHcmFtbWFyKHNjb3BlTmFtZSk7XG4gICAgICB0aGlzLl9lbnN1cmVHcmFtbWFyQ2FjaGUuc2V0KHNjb3BlTmFtZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG4gIF9kb0xvYWRTaW5nbGVHcmFtbWFyKHNjb3BlTmFtZSkge1xuICAgIGNvbnN0IGdyYW1tYXIgPSB0aGlzLl9vcHRpb25zLmxvYWRHcmFtbWFyKHNjb3BlTmFtZSk7XG4gICAgaWYgKGdyYW1tYXIpIHtcbiAgICAgIGNvbnN0IGluamVjdGlvbnMgPSB0eXBlb2YgdGhpcy5fb3B0aW9ucy5nZXRJbmplY3Rpb25zID09PSBcImZ1bmN0aW9uXCIgPyB0aGlzLl9vcHRpb25zLmdldEluamVjdGlvbnMoc2NvcGVOYW1lKSA6IHZvaWQgMDtcbiAgICAgIHRoaXMuX3N5bmNSZWdpc3RyeS5hZGRHcmFtbWFyKGdyYW1tYXIsIGluamVjdGlvbnMpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogQWRkcyBhIHJhd0dyYW1tYXIuXG4gICAqL1xuICBhZGRHcmFtbWFyKHJhd0dyYW1tYXIsIGluamVjdGlvbnMgPSBbXSwgaW5pdGlhbExhbmd1YWdlID0gMCwgZW1iZWRkZWRMYW5ndWFnZXMgPSBudWxsKSB7XG4gICAgdGhpcy5fc3luY1JlZ2lzdHJ5LmFkZEdyYW1tYXIocmF3R3JhbW1hciwgaW5qZWN0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuX2dyYW1tYXJGb3JTY29wZU5hbWUocmF3R3JhbW1hci5zY29wZU5hbWUsIGluaXRpYWxMYW5ndWFnZSwgZW1iZWRkZWRMYW5ndWFnZXMpO1xuICB9XG4gIC8qKlxuICAgKiBHZXQgdGhlIGdyYW1tYXIgZm9yIGBzY29wZU5hbWVgLiBUaGUgZ3JhbW1hciBtdXN0IGZpcnN0IGJlIGNyZWF0ZWQgdmlhIGBsb2FkR3JhbW1hcmAgb3IgYGFkZEdyYW1tYXJgLlxuICAgKi9cbiAgX2dyYW1tYXJGb3JTY29wZU5hbWUoc2NvcGVOYW1lLCBpbml0aWFsTGFuZ3VhZ2UgPSAwLCBlbWJlZGRlZExhbmd1YWdlcyA9IG51bGwsIHRva2VuVHlwZXMgPSBudWxsLCBiYWxhbmNlZEJyYWNrZXRTZWxlY3RvcnMgPSBudWxsKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N5bmNSZWdpc3RyeS5ncmFtbWFyRm9yU2NvcGVOYW1lKFxuICAgICAgc2NvcGVOYW1lLFxuICAgICAgaW5pdGlhbExhbmd1YWdlLFxuICAgICAgZW1iZWRkZWRMYW5ndWFnZXMsXG4gICAgICB0b2tlblR5cGVzLFxuICAgICAgYmFsYW5jZWRCcmFja2V0U2VsZWN0b3JzXG4gICAgKTtcbiAgfVxufTtcbnZhciBJTklUSUFMID0gU3RhdGVTdGFja0ltcGwuTlVMTDtcbmV4cG9ydCB7XG4gIEVuY29kZWRUb2tlbk1ldGFkYXRhLFxuICBGaW5kT3B0aW9uLFxuICBGb250U3R5bGUsXG4gIElOSVRJQUwsXG4gIFJlZ2lzdHJ5LFxuICBUaGVtZSxcbiAgZGlzcG9zZU9uaWdTdHJpbmdcbn07XG4iLCJpbXBvcnQgeyBTaGlraUVycm9yIH0gZnJvbSBcIkBzaGlraWpzL3R5cGVzXCI7XG5pbXBvcnQgeyBFbmNvZGVkVG9rZW5NZXRhZGF0YSwgSU5JVElBTCwgUmVnaXN0cnkgYXMgUmVnaXN0cnkkMSwgVGhlbWUgfSBmcm9tIFwiQHNoaWtpanMvdnNjb2RlLXRleHRtYXRlXCI7XG5leHBvcnQgKiBmcm9tIFwiQHNoaWtpanMvdHlwZXNcIjtcbi8vI3JlZ2lvbiBzcmMvdXRpbHMvY29sb3JzLnRzXG5mdW5jdGlvbiByZXNvbHZlQ29sb3JSZXBsYWNlbWVudHModGhlbWUsIG9wdGlvbnMpIHtcblx0Y29uc3QgcmVwbGFjZW1lbnRzID0gdHlwZW9mIHRoZW1lID09PSBcInN0cmluZ1wiID8ge30gOiB7IC4uLnRoZW1lLmNvbG9yUmVwbGFjZW1lbnRzIH07XG5cdGNvbnN0IHRoZW1lTmFtZSA9IHR5cGVvZiB0aGVtZSA9PT0gXCJzdHJpbmdcIiA/IHRoZW1lIDogdGhlbWUubmFtZTtcblx0Zm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob3B0aW9ucz8uY29sb3JSZXBsYWNlbWVudHMgfHwge30pKSBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSByZXBsYWNlbWVudHNba2V5XSA9IHZhbHVlO1xuXHRlbHNlIGlmIChrZXkgPT09IHRoZW1lTmFtZSkgT2JqZWN0LmFzc2lnbihyZXBsYWNlbWVudHMsIHZhbHVlKTtcblx0cmV0dXJuIHJlcGxhY2VtZW50cztcbn1cbmZ1bmN0aW9uIGFwcGx5Q29sb3JSZXBsYWNlbWVudHMoY29sb3IsIHJlcGxhY2VtZW50cykge1xuXHRpZiAoIWNvbG9yKSByZXR1cm4gY29sb3I7XG5cdHJldHVybiByZXBsYWNlbWVudHM/Lltjb2xvcj8udG9Mb3dlckNhc2UoKV0gfHwgY29sb3I7XG59XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvdXRpbHMvZ2VuZXJhbC50c1xuZnVuY3Rpb24gdG9BcnJheSh4KSB7XG5cdHJldHVybiBBcnJheS5pc0FycmF5KHgpID8geCA6IFt4XTtcbn1cbi8qKlxuKiBOb3JtYWxpemUgYSBnZXR0ZXIgdG8gYSBwcm9taXNlLlxuKi9cbmFzeW5jIGZ1bmN0aW9uIG5vcm1hbGl6ZUdldHRlcihwKSB7XG5cdHJldHVybiBQcm9taXNlLnJlc29sdmUodHlwZW9mIHAgPT09IFwiZnVuY3Rpb25cIiA/IHAoKSA6IHApLnRoZW4oKHIpID0+IHIuZGVmYXVsdCB8fCByKTtcbn1cbi8qKlxuKiBDaGVjayBpZiB0aGUgbGFuZ3VhZ2UgaXMgcGxhaW50ZXh0IHRoYXQgaXMgaWdub3JlZCBieSBTaGlraS5cbipcbiogSGFyZC1jb2RlZCBwbGFpbiB0ZXh0IGxhbmd1YWdlczogYHBsYWludGV4dGAsIGB0eHRgLCBgdGV4dGAsIGBwbGFpbmAuXG4qL1xuZnVuY3Rpb24gaXNQbGFpbkxhbmcobGFuZykge1xuXHRyZXR1cm4gIWxhbmcgfHwgW1xuXHRcdFwicGxhaW50ZXh0XCIsXG5cdFx0XCJ0eHRcIixcblx0XHRcInRleHRcIixcblx0XHRcInBsYWluXCJcblx0XS5pbmNsdWRlcyhsYW5nKTtcbn1cbi8qKlxuKiBDaGVjayBpZiB0aGUgbGFuZ3VhZ2UgaXMgc3BlY2lhbGx5IGhhbmRsZWQgb3IgYnlwYXNzZWQgYnkgU2hpa2kuXG4qXG4qIEhhcmQtY29kZWQgbGFuZ3VhZ2VzOiBgYW5zaWAgYW5kIHBsYWludGV4dHMgbGlrZSBgcGxhaW50ZXh0YCwgYHR4dGAsIGB0ZXh0YCwgYHBsYWluYC5cbiovXG5mdW5jdGlvbiBpc1NwZWNpYWxMYW5nKGxhbmcpIHtcblx0cmV0dXJuIGxhbmcgPT09IFwiYW5zaVwiIHx8IGlzUGxhaW5MYW5nKGxhbmcpO1xufVxuLyoqXG4qIENoZWNrIGlmIHRoZSB0aGVtZSBpcyBzcGVjaWFsbHkgaGFuZGxlZCBvciBieXBhc3NlZCBieSBTaGlraS5cbipcbiogSGFyZC1jb2RlZCB0aGVtZXM6IGBub25lYC5cbiovXG5mdW5jdGlvbiBpc05vbmVUaGVtZSh0aGVtZSkge1xuXHRyZXR1cm4gdGhlbWUgPT09IFwibm9uZVwiO1xufVxuLyoqXG4qIENoZWNrIGlmIHRoZSB0aGVtZSBpcyBzcGVjaWFsbHkgaGFuZGxlZCBvciBieXBhc3NlZCBieSBTaGlraS5cbipcbiogSGFyZC1jb2RlZCB0aGVtZXM6IGBub25lYC5cbiovXG5mdW5jdGlvbiBpc1NwZWNpYWxUaGVtZSh0aGVtZSkge1xuXHRyZXR1cm4gaXNOb25lVGhlbWUodGhlbWUpO1xufVxuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gc3JjL3V0aWxzL3N0cmluZ3MudHNcbi8qKlxuKiBTcGxpdCBhIHN0cmluZyBpbnRvIGxpbmVzLCBlYWNoIGxpbmUgcHJlc2VydmVzIHRoZSBsaW5lIGVuZGluZy5cbipcbiogQHBhcmFtIGNvZGUgLSBUaGUgY29kZSBzdHJpbmcgdG8gc3BsaXQgaW50byBsaW5lc1xuKiBAcGFyYW0gcHJlc2VydmVFbmRpbmcgLSBXaGV0aGVyIHRvIHByZXNlcnZlIGxpbmUgZW5kaW5ncyBpbiB0aGUgcmVzdWx0XG4qIEByZXR1cm5zIEFycmF5IG9mIHR1cGxlcyBjb250YWluaW5nIFtsaW5lIGNvbnRlbnQsIG9mZnNldCBpbmRleF1cbipcbiogQGV4YW1wbGVcbiogYGBgdHNcbiogc3BsaXRMaW5lcygnaGVsbG9cXG53b3JsZCcsIGZhbHNlKVxuKiAvLyA9PiBbWydoZWxsbycsIDBdLCBbJ3dvcmxkJywgNl1dXG4qXG4qIHNwbGl0TGluZXMoJ2hlbGxvXFxud29ybGQnLCB0cnVlKVxuKiAvLyA9PiBbWydoZWxsb1xcbicsIDBdLCBbJ3dvcmxkJywgNl1dXG4qIGBgYFxuKi9cbmNvbnN0IFJFX05FV0xJTkUgPSAvKFxccj9cXG4pL2c7XG5mdW5jdGlvbiBzcGxpdExpbmVzKGNvZGUsIHByZXNlcnZlRW5kaW5nID0gZmFsc2UpIHtcblx0aWYgKGNvZGUubGVuZ3RoID09PSAwKSByZXR1cm4gW1tcIlwiLCAwXV07XG5cdGNvbnN0IHBhcnRzID0gY29kZS5zcGxpdChSRV9ORVdMSU5FKTtcblx0bGV0IGluZGV4ID0gMDtcblx0Y29uc3QgbGluZXMgPSBbXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkgKz0gMikge1xuXHRcdGNvbnN0IGxpbmUgPSBwcmVzZXJ2ZUVuZGluZyA/IHBhcnRzW2ldICsgKHBhcnRzW2kgKyAxXSB8fCBcIlwiKSA6IHBhcnRzW2ldO1xuXHRcdGxpbmVzLnB1c2goW2xpbmUsIGluZGV4XSk7XG5cdFx0aW5kZXggKz0gcGFydHNbaV0ubGVuZ3RoO1xuXHRcdGluZGV4ICs9IHBhcnRzW2kgKyAxXT8ubGVuZ3RoIHx8IDA7XG5cdH1cblx0cmV0dXJuIGxpbmVzO1xufVxuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gc3JjL3RleHRtYXRlL25vcm1hbGl6ZS10aGVtZS50c1xuLyoqXG4qIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvdnNjb2RlL2Jsb2IvZjdmMDVkZWU1M2ZiMzNmZTAyM2RiMmUwNmUzMGE4OWQzMDk0NDg4Zi9zcmMvdnMvcGxhdGZvcm0vdGhlbWUvY29tbW9uL2NvbG9yUmVnaXN0cnkudHMjTDI1OC1MMjY4XG4qL1xuY29uc3QgVlNDT0RFX0ZBTExCQUNLX0VESVRPUl9GRyA9IHtcblx0bGlnaHQ6IFwiIzMzMzMzM1wiLFxuXHRkYXJrOiBcIiNiYmJiYmJcIlxufTtcbmNvbnN0IFZTQ09ERV9GQUxMQkFDS19FRElUT1JfQkcgPSB7XG5cdGxpZ2h0OiBcIiNmZmZmZmVcIixcblx0ZGFyazogXCIjMWUxZTFlXCJcbn07XG5jb25zdCBSRVNPTFZFRF9LRVkgPSBcIl9fc2hpa2lfcmVzb2x2ZWRcIjtcbi8qKlxuKiBOb3JtYWxpemUgYSB0ZXh0bWF0ZSB0aGVtZSB0byBzaGlraSB0aGVtZVxuKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZVRoZW1lKHJhd1RoZW1lKSB7XG5cdGlmIChyYXdUaGVtZT8uW1JFU09MVkVEX0tFWV0pIHJldHVybiByYXdUaGVtZTtcblx0Y29uc3QgdGhlbWUgPSB7IC4uLnJhd1RoZW1lIH07XG5cdGlmICh0aGVtZS50b2tlbkNvbG9ycyAmJiAhdGhlbWUuc2V0dGluZ3MpIHtcblx0XHR0aGVtZS5zZXR0aW5ncyA9IHRoZW1lLnRva2VuQ29sb3JzO1xuXHRcdGRlbGV0ZSB0aGVtZS50b2tlbkNvbG9ycztcblx0fVxuXHR0aGVtZS50eXBlIHx8PSBcImRhcmtcIjtcblx0dGhlbWUuY29sb3JSZXBsYWNlbWVudHMgPSB7IC4uLnRoZW1lLmNvbG9yUmVwbGFjZW1lbnRzIH07XG5cdHRoZW1lLnNldHRpbmdzIHx8PSBbXTtcblx0bGV0IHsgYmcsIGZnIH0gPSB0aGVtZTtcblx0aWYgKCFiZyB8fCAhZmcpIHtcblx0XHQvKipcblx0XHQqIEZpcnN0IHRyeTpcblx0XHQqIFRoZW1lIG1pZ2h0IGNvbnRhaW4gYSBnbG9iYWwgYHRva2VuQ29sb3JgIHdpdGhvdXQgYG5hbWVgIG9yIGBzY29wZWBcblx0XHQqIFVzZWQgYXMgZGVmYXVsdCB2YWx1ZSBmb3IgZm9yZWdyb3VuZC9iYWNrZ3JvdW5kXG5cdFx0Ki9cblx0XHRjb25zdCBnbG9iYWxTZXR0aW5nID0gdGhlbWUuc2V0dGluZ3MgPyB0aGVtZS5zZXR0aW5ncy5maW5kKChzKSA9PiAhcy5uYW1lICYmICFzLnNjb3BlKSA6IHZvaWQgMDtcblx0XHRpZiAoZ2xvYmFsU2V0dGluZz8uc2V0dGluZ3M/LmZvcmVncm91bmQpIGZnID0gZ2xvYmFsU2V0dGluZy5zZXR0aW5ncy5mb3JlZ3JvdW5kO1xuXHRcdGlmIChnbG9iYWxTZXR0aW5nPy5zZXR0aW5ncz8uYmFja2dyb3VuZCkgYmcgPSBnbG9iYWxTZXR0aW5nLnNldHRpbmdzLmJhY2tncm91bmQ7XG5cdFx0LyoqXG5cdFx0KiBTZWNvbmQgdHJ5OlxuXHRcdCogSWYgdGhlcmUncyBubyBnbG9iYWwgYHRva2VuQ29sb3JgIHdpdGhvdXQgYG5hbWVgIG9yIGBzY29wZWBcblx0XHQqIFVzZSBgZWRpdG9yLmZvcmVncm91bmRgIGFuZCBgZWRpdG9yLmJhY2tncm91bmRgXG5cdFx0Ki9cblx0XHRpZiAoIWZnICYmIHRoZW1lPy5jb2xvcnM/LltcImVkaXRvci5mb3JlZ3JvdW5kXCJdKSBmZyA9IHRoZW1lLmNvbG9yc1tcImVkaXRvci5mb3JlZ3JvdW5kXCJdO1xuXHRcdGlmICghYmcgJiYgdGhlbWU/LmNvbG9ycz8uW1wiZWRpdG9yLmJhY2tncm91bmRcIl0pIGJnID0gdGhlbWUuY29sb3JzW1wiZWRpdG9yLmJhY2tncm91bmRcIl07XG5cdFx0LyoqXG5cdFx0KiBMYXN0IHRyeTpcblx0XHQqIElmIHRoZXJlJ3Mgbm8gZmcvYmcgY29sb3Igc3BlY2lmaWVkIGluIHRoZW1lLCB1c2UgZGVmYXVsdFxuXHRcdCovXG5cdFx0aWYgKCFmZykgZmcgPSB0aGVtZS50eXBlID09PSBcImxpZ2h0XCIgPyBWU0NPREVfRkFMTEJBQ0tfRURJVE9SX0ZHLmxpZ2h0IDogVlNDT0RFX0ZBTExCQUNLX0VESVRPUl9GRy5kYXJrO1xuXHRcdGlmICghYmcpIGJnID0gdGhlbWUudHlwZSA9PT0gXCJsaWdodFwiID8gVlNDT0RFX0ZBTExCQUNLX0VESVRPUl9CRy5saWdodCA6IFZTQ09ERV9GQUxMQkFDS19FRElUT1JfQkcuZGFyaztcblx0XHR0aGVtZS5mZyA9IGZnO1xuXHRcdHRoZW1lLmJnID0gYmc7XG5cdH1cblx0aWYgKCEodGhlbWUuc2V0dGluZ3NbMF0gJiYgdGhlbWUuc2V0dGluZ3NbMF0uc2V0dGluZ3MgJiYgIXRoZW1lLnNldHRpbmdzWzBdLnNjb3BlKSkgdGhlbWUuc2V0dGluZ3MudW5zaGlmdCh7IHNldHRpbmdzOiB7XG5cdFx0Zm9yZWdyb3VuZDogdGhlbWUuZmcsXG5cdFx0YmFja2dyb3VuZDogdGhlbWUuYmdcblx0fSB9KTtcblx0bGV0IHJlcGxhY2VtZW50Q291bnQgPSAwO1xuXHRjb25zdCByZXBsYWNlbWVudE1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG5cdGZ1bmN0aW9uIGdldFJlcGxhY2VtZW50Q29sb3IodmFsdWUpIHtcblx0XHRpZiAocmVwbGFjZW1lbnRNYXAuaGFzKHZhbHVlKSkgcmV0dXJuIHJlcGxhY2VtZW50TWFwLmdldCh2YWx1ZSk7XG5cdFx0cmVwbGFjZW1lbnRDb3VudCArPSAxO1xuXHRcdGNvbnN0IGhleCA9IGAjJHtyZXBsYWNlbWVudENvdW50LnRvU3RyaW5nKDE2KS5wYWRTdGFydCg4LCBcIjBcIikudG9Mb3dlckNhc2UoKX1gO1xuXHRcdGlmICh0aGVtZS5jb2xvclJlcGxhY2VtZW50cz8uW2AjJHtoZXh9YF0pIHJldHVybiBnZXRSZXBsYWNlbWVudENvbG9yKHZhbHVlKTtcblx0XHRyZXBsYWNlbWVudE1hcC5zZXQodmFsdWUsIGhleCk7XG5cdFx0cmV0dXJuIGhleDtcblx0fVxuXHR0aGVtZS5zZXR0aW5ncyA9IHRoZW1lLnNldHRpbmdzLm1hcCgoc2V0dGluZykgPT4ge1xuXHRcdGNvbnN0IHJlcGxhY2VGZyA9IHNldHRpbmcuc2V0dGluZ3M/LmZvcmVncm91bmQgJiYgIXNldHRpbmcuc2V0dGluZ3MuZm9yZWdyb3VuZC5zdGFydHNXaXRoKFwiI1wiKTtcblx0XHRjb25zdCByZXBsYWNlQmcgPSBzZXR0aW5nLnNldHRpbmdzPy5iYWNrZ3JvdW5kICYmICFzZXR0aW5nLnNldHRpbmdzLmJhY2tncm91bmQuc3RhcnRzV2l0aChcIiNcIik7XG5cdFx0aWYgKCFyZXBsYWNlRmcgJiYgIXJlcGxhY2VCZykgcmV0dXJuIHNldHRpbmc7XG5cdFx0Y29uc3QgY2xvbmUgPSB7XG5cdFx0XHQuLi5zZXR0aW5nLFxuXHRcdFx0c2V0dGluZ3M6IHsgLi4uc2V0dGluZy5zZXR0aW5ncyB9XG5cdFx0fTtcblx0XHRpZiAocmVwbGFjZUZnKSB7XG5cdFx0XHRjb25zdCByZXBsYWNlbWVudCA9IGdldFJlcGxhY2VtZW50Q29sb3Ioc2V0dGluZy5zZXR0aW5ncy5mb3JlZ3JvdW5kKTtcblx0XHRcdHRoZW1lLmNvbG9yUmVwbGFjZW1lbnRzW3JlcGxhY2VtZW50XSA9IHNldHRpbmcuc2V0dGluZ3MuZm9yZWdyb3VuZDtcblx0XHRcdGNsb25lLnNldHRpbmdzLmZvcmVncm91bmQgPSByZXBsYWNlbWVudDtcblx0XHR9XG5cdFx0aWYgKHJlcGxhY2VCZykge1xuXHRcdFx0Y29uc3QgcmVwbGFjZW1lbnQgPSBnZXRSZXBsYWNlbWVudENvbG9yKHNldHRpbmcuc2V0dGluZ3MuYmFja2dyb3VuZCk7XG5cdFx0XHR0aGVtZS5jb2xvclJlcGxhY2VtZW50c1tyZXBsYWNlbWVudF0gPSBzZXR0aW5nLnNldHRpbmdzLmJhY2tncm91bmQ7XG5cdFx0XHRjbG9uZS5zZXR0aW5ncy5iYWNrZ3JvdW5kID0gcmVwbGFjZW1lbnQ7XG5cdFx0fVxuXHRcdHJldHVybiBjbG9uZTtcblx0fSk7XG5cdGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoZW1lLmNvbG9ycyB8fCB7fSkpIGlmIChrZXkgPT09IFwiZWRpdG9yLmZvcmVncm91bmRcIiB8fCBrZXkgPT09IFwiZWRpdG9yLmJhY2tncm91bmRcIiB8fCBrZXkuc3RhcnRzV2l0aChcInRlcm1pbmFsLmFuc2lcIikpIHtcblx0XHRpZiAoIXRoZW1lLmNvbG9yc1trZXldPy5zdGFydHNXaXRoKFwiI1wiKSkge1xuXHRcdFx0Y29uc3QgcmVwbGFjZW1lbnQgPSBnZXRSZXBsYWNlbWVudENvbG9yKHRoZW1lLmNvbG9yc1trZXldKTtcblx0XHRcdHRoZW1lLmNvbG9yUmVwbGFjZW1lbnRzW3JlcGxhY2VtZW50XSA9IHRoZW1lLmNvbG9yc1trZXldO1xuXHRcdFx0dGhlbWUuY29sb3JzW2tleV0gPSByZXBsYWNlbWVudDtcblx0XHR9XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoZW1lLCBSRVNPTFZFRF9LRVksIHtcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR3cml0YWJsZTogZmFsc2UsXG5cdFx0dmFsdWU6IHRydWVcblx0fSk7XG5cdHJldHVybiB0aGVtZTtcbn1cbi8vI2VuZHJlZ2lvblxuLy8jcmVnaW9uIHNyYy90ZXh0bWF0ZS9nZXR0ZXJzLXJlc29sdmUudHNcbi8qKlxuKiBSZXNvbHZlXG4qL1xuYXN5bmMgZnVuY3Rpb24gcmVzb2x2ZUxhbmdzKGxhbmdzKSB7XG5cdHJldHVybiBbLi4ubmV3IFNldCgoYXdhaXQgUHJvbWlzZS5hbGwobGFuZ3MuZmlsdGVyKChsKSA9PiAhaXNTcGVjaWFsTGFuZyhsKSkubWFwKGFzeW5jIChsYW5nKSA9PiBhd2FpdCBub3JtYWxpemVHZXR0ZXIobGFuZykudGhlbigocikgPT4gQXJyYXkuaXNBcnJheShyKSA/IHIgOiBbcl0pKSkpLmZsYXQoKSldO1xufVxuYXN5bmMgZnVuY3Rpb24gcmVzb2x2ZVRoZW1lcyh0aGVtZXMpIHtcblx0cmV0dXJuIChhd2FpdCBQcm9taXNlLmFsbCh0aGVtZXMubWFwKGFzeW5jICh0aGVtZSkgPT4gaXNTcGVjaWFsVGhlbWUodGhlbWUpID8gbnVsbCA6IG5vcm1hbGl6ZVRoZW1lKGF3YWl0IG5vcm1hbGl6ZUdldHRlcih0aGVtZSkpKSkpLmZpbHRlcigoaSkgPT4gISFpKTtcbn1cbi8vI2VuZHJlZ2lvblxuLy8jcmVnaW9uIHNyYy91dGlscy9hbGlhcy50c1xuZnVuY3Rpb24gcmVzb2x2ZUxhbmdBbGlhcyhuYW1lLCBhbGlhcykge1xuXHRpZiAoIWFsaWFzKSByZXR1cm4gbmFtZTtcblx0aWYgKGFsaWFzW25hbWVdKSB7XG5cdFx0Y29uc3QgcmVzb2x2ZWQgPSAvKiBAX19QVVJFX18gKi8gbmV3IFNldChbbmFtZV0pO1xuXHRcdHdoaWxlIChhbGlhc1tuYW1lXSkge1xuXHRcdFx0bmFtZSA9IGFsaWFzW25hbWVdO1xuXHRcdFx0aWYgKHJlc29sdmVkLmhhcyhuYW1lKSkgdGhyb3cgbmV3IFNoaWtpRXJyb3IoYENpcmN1bGFyIGFsaWFzIFxcYCR7Wy4uLnJlc29sdmVkXS5qb2luKFwiIC0+IFwiKX0gLT4gJHtuYW1lfVxcYGApO1xuXHRcdFx0cmVzb2x2ZWQuYWRkKG5hbWUpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gbmFtZTtcbn1cbi8vI2VuZHJlZ2lvblxuLy8jcmVnaW9uIHNyYy90ZXh0bWF0ZS9yZWdpc3RyeS50c1xudmFyIFJlZ2lzdHJ5ID0gY2xhc3MgZXh0ZW5kcyBSZWdpc3RyeSQxIHtcblx0X3Jlc29sdmVyO1xuXHRfdGhlbWVzO1xuXHRfbGFuZ3M7XG5cdF9hbGlhcztcblx0X3Jlc29sdmVkVGhlbWVzID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcblx0X3Jlc29sdmVkR3JhbW1hcnMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuXHRfbGFuZ01hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG5cdF9sYW5nR3JhcGggPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuXHRfdGV4dG1hdGVUaGVtZUNhY2hlID0gLyogQF9fUFVSRV9fICovIG5ldyBXZWFrTWFwKCk7XG5cdF9sb2FkZWRUaGVtZXNDYWNoZSA9IG51bGw7XG5cdF9sb2FkZWRMYW5ndWFnZXNDYWNoZSA9IG51bGw7XG5cdGNvbnN0cnVjdG9yKF9yZXNvbHZlciwgX3RoZW1lcywgX2xhbmdzLCBfYWxpYXMgPSB7fSkge1xuXHRcdHN1cGVyKF9yZXNvbHZlcik7XG5cdFx0dGhpcy5fcmVzb2x2ZXIgPSBfcmVzb2x2ZXI7XG5cdFx0dGhpcy5fdGhlbWVzID0gX3RoZW1lcztcblx0XHR0aGlzLl9sYW5ncyA9IF9sYW5ncztcblx0XHR0aGlzLl9hbGlhcyA9IF9hbGlhcztcblx0XHR0aGlzLl90aGVtZXMubWFwKCh0KSA9PiB0aGlzLmxvYWRUaGVtZSh0KSk7XG5cdFx0dGhpcy5sb2FkTGFuZ3VhZ2VzKHRoaXMuX2xhbmdzKTtcblx0fVxuXHRnZXRUaGVtZSh0aGVtZSkge1xuXHRcdGlmICh0eXBlb2YgdGhlbWUgPT09IFwic3RyaW5nXCIpIHJldHVybiB0aGlzLl9yZXNvbHZlZFRoZW1lcy5nZXQodGhlbWUpO1xuXHRcdGVsc2UgcmV0dXJuIHRoaXMubG9hZFRoZW1lKHRoZW1lKTtcblx0fVxuXHRsb2FkVGhlbWUodGhlbWUpIHtcblx0XHRjb25zdCBfdGhlbWUgPSBub3JtYWxpemVUaGVtZSh0aGVtZSk7XG5cdFx0aWYgKF90aGVtZS5uYW1lKSB7XG5cdFx0XHR0aGlzLl9yZXNvbHZlZFRoZW1lcy5zZXQoX3RoZW1lLm5hbWUsIF90aGVtZSk7XG5cdFx0XHR0aGlzLl9sb2FkZWRUaGVtZXNDYWNoZSA9IG51bGw7XG5cdFx0fVxuXHRcdHJldHVybiBfdGhlbWU7XG5cdH1cblx0Z2V0TG9hZGVkVGhlbWVzKCkge1xuXHRcdGlmICghdGhpcy5fbG9hZGVkVGhlbWVzQ2FjaGUpIHRoaXMuX2xvYWRlZFRoZW1lc0NhY2hlID0gWy4uLnRoaXMuX3Jlc29sdmVkVGhlbWVzLmtleXMoKV07XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRlZFRoZW1lc0NhY2hlO1xuXHR9XG5cdHNldFRoZW1lKHRoZW1lKSB7XG5cdFx0bGV0IHRleHRtYXRlVGhlbWUgPSB0aGlzLl90ZXh0bWF0ZVRoZW1lQ2FjaGUuZ2V0KHRoZW1lKTtcblx0XHRpZiAoIXRleHRtYXRlVGhlbWUpIHtcblx0XHRcdHRleHRtYXRlVGhlbWUgPSBUaGVtZS5jcmVhdGVGcm9tUmF3VGhlbWUodGhlbWUpO1xuXHRcdFx0dGhpcy5fdGV4dG1hdGVUaGVtZUNhY2hlLnNldCh0aGVtZSwgdGV4dG1hdGVUaGVtZSk7XG5cdFx0fVxuXHRcdHRoaXMuX3N5bmNSZWdpc3RyeS5zZXRUaGVtZSh0ZXh0bWF0ZVRoZW1lKTtcblx0fVxuXHRnZXRHcmFtbWFyKG5hbWUpIHtcblx0XHRuYW1lID0gcmVzb2x2ZUxhbmdBbGlhcyhuYW1lLCB0aGlzLl9hbGlhcyk7XG5cdFx0cmV0dXJuIHRoaXMuX3Jlc29sdmVkR3JhbW1hcnMuZ2V0KG5hbWUpO1xuXHR9XG5cdGxvYWRMYW5ndWFnZShsYW5nKSB7XG5cdFx0aWYgKHRoaXMuZ2V0R3JhbW1hcihsYW5nLm5hbWUpKSByZXR1cm47XG5cdFx0Y29uc3QgZW1iZWRkZWRMYXppbHlCeSA9IG5ldyBTZXQoWy4uLnRoaXMuX2xhbmdNYXAudmFsdWVzKCldLmZpbHRlcigoaSkgPT4gaS5lbWJlZGRlZExhbmdzTGF6eT8uaW5jbHVkZXMobGFuZy5uYW1lKSkpO1xuXHRcdHRoaXMuX3Jlc29sdmVyLmFkZExhbmd1YWdlKGxhbmcpO1xuXHRcdGNvbnN0IGdyYW1tYXJDb25maWcgPSB7XG5cdFx0XHRiYWxhbmNlZEJyYWNrZXRTZWxlY3RvcnM6IGxhbmcuYmFsYW5jZWRCcmFja2V0U2VsZWN0b3JzIHx8IFtcIipcIl0sXG5cdFx0XHR1bmJhbGFuY2VkQnJhY2tldFNlbGVjdG9yczogbGFuZy51bmJhbGFuY2VkQnJhY2tldFNlbGVjdG9ycyB8fCBbXVxuXHRcdH07XG5cdFx0dGhpcy5fc3luY1JlZ2lzdHJ5Ll9yYXdHcmFtbWFycy5zZXQobGFuZy5zY29wZU5hbWUsIGxhbmcpO1xuXHRcdGNvbnN0IGcgPSB0aGlzLmxvYWRHcmFtbWFyV2l0aENvbmZpZ3VyYXRpb24obGFuZy5zY29wZU5hbWUsIDEsIGdyYW1tYXJDb25maWcpO1xuXHRcdGcubmFtZSA9IGxhbmcubmFtZTtcblx0XHR0aGlzLl9yZXNvbHZlZEdyYW1tYXJzLnNldChsYW5nLm5hbWUsIGcpO1xuXHRcdGlmIChsYW5nLmFsaWFzZXMpIGxhbmcuYWxpYXNlcy5mb3JFYWNoKChhbGlhcykgPT4ge1xuXHRcdFx0dGhpcy5fYWxpYXNbYWxpYXNdID0gbGFuZy5uYW1lO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2xvYWRlZExhbmd1YWdlc0NhY2hlID0gbnVsbDtcblx0XHRpZiAoZW1iZWRkZWRMYXppbHlCeS5zaXplKSBmb3IgKGNvbnN0IGUgb2YgZW1iZWRkZWRMYXppbHlCeSkge1xuXHRcdFx0dGhpcy5fcmVzb2x2ZWRHcmFtbWFycy5kZWxldGUoZS5uYW1lKTtcblx0XHRcdHRoaXMuX2xvYWRlZExhbmd1YWdlc0NhY2hlID0gbnVsbDtcblx0XHRcdHRoaXMuX3N5bmNSZWdpc3RyeT8uX2luamVjdGlvbkdyYW1tYXJzPy5kZWxldGUoZS5zY29wZU5hbWUpO1xuXHRcdFx0dGhpcy5fc3luY1JlZ2lzdHJ5Py5fZ3JhbW1hcnM/LmRlbGV0ZShlLnNjb3BlTmFtZSk7XG5cdFx0XHR0aGlzLmxvYWRMYW5ndWFnZSh0aGlzLl9sYW5nTWFwLmdldChlLm5hbWUpKTtcblx0XHR9XG5cdH1cblx0ZGlzcG9zZSgpIHtcblx0XHRzdXBlci5kaXNwb3NlKCk7XG5cdFx0dGhpcy5fcmVzb2x2ZWRUaGVtZXMuY2xlYXIoKTtcblx0XHR0aGlzLl9yZXNvbHZlZEdyYW1tYXJzLmNsZWFyKCk7XG5cdFx0dGhpcy5fbGFuZ01hcC5jbGVhcigpO1xuXHRcdHRoaXMuX2xhbmdHcmFwaC5jbGVhcigpO1xuXHRcdHRoaXMuX2xvYWRlZFRoZW1lc0NhY2hlID0gbnVsbDtcblx0fVxuXHRsb2FkTGFuZ3VhZ2VzKGxhbmdzKSB7XG5cdFx0Zm9yIChjb25zdCBsYW5nIG9mIGxhbmdzKSB0aGlzLnJlc29sdmVFbWJlZGRlZExhbmd1YWdlcyhsYW5nKTtcblx0XHRjb25zdCBsYW5nc0dyYXBoQXJyYXkgPSBbLi4udGhpcy5fbGFuZ0dyYXBoLmVudHJpZXMoKV07XG5cdFx0Y29uc3QgbWlzc2luZ0xhbmdzID0gbGFuZ3NHcmFwaEFycmF5LmZpbHRlcigoW18sIGxhbmddKSA9PiAhbGFuZyk7XG5cdFx0aWYgKG1pc3NpbmdMYW5ncy5sZW5ndGgpIHtcblx0XHRcdGNvbnN0IGRlcGVuZGVudHMgPSBsYW5nc0dyYXBoQXJyYXkuZmlsdGVyKChbXywgbGFuZ10pID0+IHtcblx0XHRcdFx0aWYgKCFsYW5nKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdHJldHVybiAobGFuZy5lbWJlZGRlZExhbmd1YWdlcyB8fCBsYW5nLmVtYmVkZGVkTGFuZ3MpPy5zb21lKChsKSA9PiBtaXNzaW5nTGFuZ3MubWFwKChbbmFtZV0pID0+IG5hbWUpLmluY2x1ZGVzKGwpKTtcblx0XHRcdH0pLmZpbHRlcigobGFuZykgPT4gIW1pc3NpbmdMYW5ncy5pbmNsdWRlcyhsYW5nKSk7XG5cdFx0XHR0aHJvdyBuZXcgU2hpa2lFcnJvcihgTWlzc2luZyBsYW5ndWFnZXMgJHttaXNzaW5nTGFuZ3MubWFwKChbbmFtZV0pID0+IGBcXGAke25hbWV9XFxgYCkuam9pbihcIiwgXCIpfSwgcmVxdWlyZWQgYnkgJHtkZXBlbmRlbnRzLm1hcCgoW25hbWVdKSA9PiBgXFxgJHtuYW1lfVxcYGApLmpvaW4oXCIsIFwiKX1gKTtcblx0XHR9XG5cdFx0Zm9yIChjb25zdCBbXywgbGFuZ10gb2YgbGFuZ3NHcmFwaEFycmF5KSB0aGlzLl9yZXNvbHZlci5hZGRMYW5ndWFnZShsYW5nKTtcblx0XHRmb3IgKGNvbnN0IFtfLCBsYW5nXSBvZiBsYW5nc0dyYXBoQXJyYXkpIHRoaXMubG9hZExhbmd1YWdlKGxhbmcpO1xuXHR9XG5cdGdldExvYWRlZExhbmd1YWdlcygpIHtcblx0XHRpZiAoIXRoaXMuX2xvYWRlZExhbmd1YWdlc0NhY2hlKSB0aGlzLl9sb2FkZWRMYW5ndWFnZXNDYWNoZSA9IFsuLi4vKiBAX19QVVJFX18gKi8gbmV3IFNldChbLi4udGhpcy5fcmVzb2x2ZWRHcmFtbWFycy5rZXlzKCksIC4uLk9iamVjdC5rZXlzKHRoaXMuX2FsaWFzKV0pXTtcblx0XHRyZXR1cm4gdGhpcy5fbG9hZGVkTGFuZ3VhZ2VzQ2FjaGU7XG5cdH1cblx0cmVzb2x2ZUVtYmVkZGVkTGFuZ3VhZ2VzKGxhbmcpIHtcblx0XHR0aGlzLl9sYW5nTWFwLnNldChsYW5nLm5hbWUsIGxhbmcpO1xuXHRcdHRoaXMuX2xhbmdHcmFwaC5zZXQobGFuZy5uYW1lLCBsYW5nKTtcblx0XHRjb25zdCBlbWJlZGRlZCA9IGxhbmcuZW1iZWRkZWRMYW5ndWFnZXMgPz8gbGFuZy5lbWJlZGRlZExhbmdzO1xuXHRcdGlmIChlbWJlZGRlZCkgZm9yIChjb25zdCBlbWJlZGRlZExhbmcgb2YgZW1iZWRkZWQpIHRoaXMuX2xhbmdHcmFwaC5zZXQoZW1iZWRkZWRMYW5nLCB0aGlzLl9sYW5nTWFwLmdldChlbWJlZGRlZExhbmcpKTtcblx0fVxufTtcbi8vI2VuZHJlZ2lvblxuLy8jcmVnaW9uIHNyYy90ZXh0bWF0ZS9yZXNvbHZlci50c1xudmFyIFJlc29sdmVyID0gY2xhc3Mge1xuXHRfbGFuZ3MgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuXHRfc2NvcGVUb0xhbmcgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuXHRfaW5qZWN0aW9ucyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG5cdF9vbmlnTGliO1xuXHRjb25zdHJ1Y3RvcihlbmdpbmUsIGxhbmdzKSB7XG5cdFx0dGhpcy5fb25pZ0xpYiA9IHtcblx0XHRcdGNyZWF0ZU9uaWdTY2FubmVyOiAocGF0dGVybnMpID0+IGVuZ2luZS5jcmVhdGVTY2FubmVyKHBhdHRlcm5zKSxcblx0XHRcdGNyZWF0ZU9uaWdTdHJpbmc6IChzKSA9PiBlbmdpbmUuY3JlYXRlU3RyaW5nKHMpXG5cdFx0fTtcblx0XHRsYW5ncy5mb3JFYWNoKChpKSA9PiB0aGlzLmFkZExhbmd1YWdlKGkpKTtcblx0fVxuXHRnZXQgb25pZ0xpYigpIHtcblx0XHRyZXR1cm4gdGhpcy5fb25pZ0xpYjtcblx0fVxuXHRnZXRMYW5nUmVnaXN0cmF0aW9uKGxhbmdJZE9yQWxpYXMpIHtcblx0XHRyZXR1cm4gdGhpcy5fbGFuZ3MuZ2V0KGxhbmdJZE9yQWxpYXMpO1xuXHR9XG5cdGxvYWRHcmFtbWFyKHNjb3BlTmFtZSkge1xuXHRcdHJldHVybiB0aGlzLl9zY29wZVRvTGFuZy5nZXQoc2NvcGVOYW1lKTtcblx0fVxuXHRhZGRMYW5ndWFnZShsKSB7XG5cdFx0dGhpcy5fbGFuZ3Muc2V0KGwubmFtZSwgbCk7XG5cdFx0aWYgKGwuYWxpYXNlcykgbC5hbGlhc2VzLmZvckVhY2goKGEpID0+IHtcblx0XHRcdHRoaXMuX2xhbmdzLnNldChhLCBsKTtcblx0XHR9KTtcblx0XHR0aGlzLl9zY29wZVRvTGFuZy5zZXQobC5zY29wZU5hbWUsIGwpO1xuXHRcdGlmIChsLmluamVjdFRvKSBsLmluamVjdFRvLmZvckVhY2goKGkpID0+IHtcblx0XHRcdGlmICghdGhpcy5faW5qZWN0aW9ucy5nZXQoaSkpIHRoaXMuX2luamVjdGlvbnMuc2V0KGksIFtdKTtcblx0XHRcdHRoaXMuX2luamVjdGlvbnMuZ2V0KGkpLnB1c2gobC5zY29wZU5hbWUpO1xuXHRcdH0pO1xuXHR9XG5cdGdldEluamVjdGlvbnMoc2NvcGVOYW1lKSB7XG5cdFx0Y29uc3Qgc2NvcGVQYXJ0cyA9IHNjb3BlTmFtZS5zcGxpdChcIi5cIik7XG5cdFx0bGV0IGluamVjdGlvbnMgPSBbXTtcblx0XHRmb3IgKGxldCBpID0gMTsgaSA8PSBzY29wZVBhcnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBzdWJTY29wZU5hbWUgPSBzY29wZVBhcnRzLnNsaWNlKDAsIGkpLmpvaW4oXCIuXCIpO1xuXHRcdFx0aW5qZWN0aW9ucyA9IFsuLi5pbmplY3Rpb25zLCAuLi50aGlzLl9pbmplY3Rpb25zLmdldChzdWJTY29wZU5hbWUpIHx8IFtdXTtcblx0XHR9XG5cdFx0cmV0dXJuIGluamVjdGlvbnM7XG5cdH1cbn07XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvY29uc3RydWN0b3JzL3ByaW1pdGl2ZS50c1xubGV0IGluc3RhbmNlc0NvdW50ID0gMDtcbi8qKlxuKiBHZXQgdGhlIG1pbmltYWwgc2hpa2kgcHJpbWl0aXZlIGluc3RhbmNlLlxuKlxuKiBSZXF1aXJlcyB0byBwcm92aWRlIHRoZSBlbmdpbmUgYW5kIGFsbCB0aGVtZXMgYW5kIGxhbmd1YWdlcyB1cGZyb250LlxuKi9cbmZ1bmN0aW9uIGNyZWF0ZVNoaWtpUHJpbWl0aXZlKG9wdGlvbnMpIHtcblx0aW5zdGFuY2VzQ291bnQgKz0gMTtcblx0aWYgKG9wdGlvbnMud2FybmluZ3MgIT09IGZhbHNlICYmIGluc3RhbmNlc0NvdW50ID49IDEwICYmIGluc3RhbmNlc0NvdW50ICUgMTAgPT09IDApIGNvbnNvbGUud2FybihgW1NoaWtpXSAke2luc3RhbmNlc0NvdW50fSBpbnN0YW5jZXMgaGF2ZSBiZWVuIGNyZWF0ZWQuIFNoaWtpIGlzIHN1cHBvc2VkIHRvIGJlIHVzZWQgYXMgYSBzaW5nbGV0b24sIGNvbnNpZGVyIHJlZmFjdG9yaW5nIHlvdXIgY29kZSB0byBjYWNoZSB5b3VyIGhpZ2hsaWdodGVyIGluc3RhbmNlOyBPciBjYWxsIFxcYGhpZ2hsaWdodGVyLmRpc3Bvc2UoKVxcYCB0byByZWxlYXNlIHVudXNlZCBpbnN0YW5jZXMuYCk7XG5cdGxldCBpc0Rpc3Bvc2VkID0gZmFsc2U7XG5cdGlmICghb3B0aW9ucy5lbmdpbmUpIHRocm93IG5ldyBTaGlraUVycm9yKFwiYGVuZ2luZWAgb3B0aW9uIGlzIHJlcXVpcmVkIGZvciBzeW5jaHJvbm91cyBtb2RlXCIpO1xuXHRjb25zdCBsYW5ncyA9IChvcHRpb25zLmxhbmdzIHx8IFtdKS5mbGF0KDEpO1xuXHRjb25zdCB0aGVtZXMgPSAob3B0aW9ucy50aGVtZXMgfHwgW10pLmZsYXQoMSkubWFwKG5vcm1hbGl6ZVRoZW1lKTtcblx0Y29uc3QgX3JlZ2lzdHJ5ID0gbmV3IFJlZ2lzdHJ5KG5ldyBSZXNvbHZlcihvcHRpb25zLmVuZ2luZSwgbGFuZ3MpLCB0aGVtZXMsIGxhbmdzLCBvcHRpb25zLmxhbmdBbGlhcyk7XG5cdGxldCBfbGFzdFRoZW1lO1xuXHRmdW5jdGlvbiByZXNvbHZlTGFuZ0FsaWFzJDEobmFtZSkge1xuXHRcdHJldHVybiByZXNvbHZlTGFuZ0FsaWFzKG5hbWUsIG9wdGlvbnMubGFuZ0FsaWFzKTtcblx0fVxuXHRmdW5jdGlvbiBnZXRMYW5ndWFnZShuYW1lKSB7XG5cdFx0ZW5zdXJlTm90RGlzcG9zZWQoKTtcblx0XHRjb25zdCBfbGFuZyA9IF9yZWdpc3RyeS5nZXRHcmFtbWFyKHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiID8gbmFtZSA6IG5hbWUubmFtZSk7XG5cdFx0aWYgKCFfbGFuZykgdGhyb3cgbmV3IFNoaWtpRXJyb3IoYExhbmd1YWdlIFxcYCR7bmFtZX1cXGAgbm90IGZvdW5kLCB5b3UgbWF5IG5lZWQgdG8gbG9hZCBpdCBmaXJzdGApO1xuXHRcdHJldHVybiBfbGFuZztcblx0fVxuXHRmdW5jdGlvbiBnZXRUaGVtZShuYW1lKSB7XG5cdFx0aWYgKG5hbWUgPT09IFwibm9uZVwiKSByZXR1cm4ge1xuXHRcdFx0Ymc6IFwiXCIsXG5cdFx0XHRmZzogXCJcIixcblx0XHRcdG5hbWU6IFwibm9uZVwiLFxuXHRcdFx0c2V0dGluZ3M6IFtdLFxuXHRcdFx0dHlwZTogXCJkYXJrXCJcblx0XHR9O1xuXHRcdGVuc3VyZU5vdERpc3Bvc2VkKCk7XG5cdFx0Y29uc3QgX3RoZW1lID0gX3JlZ2lzdHJ5LmdldFRoZW1lKG5hbWUpO1xuXHRcdGlmICghX3RoZW1lKSB0aHJvdyBuZXcgU2hpa2lFcnJvcihgVGhlbWUgXFxgJHtuYW1lfVxcYCBub3QgZm91bmQsIHlvdSBtYXkgbmVlZCB0byBsb2FkIGl0IGZpcnN0YCk7XG5cdFx0cmV0dXJuIF90aGVtZTtcblx0fVxuXHRmdW5jdGlvbiBzZXRUaGVtZShuYW1lKSB7XG5cdFx0ZW5zdXJlTm90RGlzcG9zZWQoKTtcblx0XHRjb25zdCB0aGVtZSA9IGdldFRoZW1lKG5hbWUpO1xuXHRcdGlmIChfbGFzdFRoZW1lICE9PSBuYW1lKSB7XG5cdFx0XHRfcmVnaXN0cnkuc2V0VGhlbWUodGhlbWUpO1xuXHRcdFx0X2xhc3RUaGVtZSA9IG5hbWU7XG5cdFx0fVxuXHRcdHJldHVybiB7XG5cdFx0XHR0aGVtZSxcblx0XHRcdGNvbG9yTWFwOiBfcmVnaXN0cnkuZ2V0Q29sb3JNYXAoKVxuXHRcdH07XG5cdH1cblx0ZnVuY3Rpb24gZ2V0TG9hZGVkVGhlbWVzKCkge1xuXHRcdGVuc3VyZU5vdERpc3Bvc2VkKCk7XG5cdFx0cmV0dXJuIF9yZWdpc3RyeS5nZXRMb2FkZWRUaGVtZXMoKTtcblx0fVxuXHRmdW5jdGlvbiBnZXRMb2FkZWRMYW5ndWFnZXMoKSB7XG5cdFx0ZW5zdXJlTm90RGlzcG9zZWQoKTtcblx0XHRyZXR1cm4gX3JlZ2lzdHJ5LmdldExvYWRlZExhbmd1YWdlcygpO1xuXHR9XG5cdGZ1bmN0aW9uIGxvYWRMYW5ndWFnZVN5bmMoLi4ubGFuZ3MpIHtcblx0XHRlbnN1cmVOb3REaXNwb3NlZCgpO1xuXHRcdF9yZWdpc3RyeS5sb2FkTGFuZ3VhZ2VzKGxhbmdzLmZsYXQoMSkpO1xuXHR9XG5cdGFzeW5jIGZ1bmN0aW9uIGxvYWRMYW5ndWFnZSguLi5sYW5ncykge1xuXHRcdHJldHVybiBsb2FkTGFuZ3VhZ2VTeW5jKGF3YWl0IHJlc29sdmVMYW5ncyhsYW5ncykpO1xuXHR9XG5cdGZ1bmN0aW9uIGxvYWRUaGVtZVN5bmMoLi4udGhlbWVzKSB7XG5cdFx0ZW5zdXJlTm90RGlzcG9zZWQoKTtcblx0XHRmb3IgKGNvbnN0IHRoZW1lIG9mIHRoZW1lcy5mbGF0KDEpKSBfcmVnaXN0cnkubG9hZFRoZW1lKHRoZW1lKTtcblx0fVxuXHRhc3luYyBmdW5jdGlvbiBsb2FkVGhlbWUoLi4udGhlbWVzKSB7XG5cdFx0ZW5zdXJlTm90RGlzcG9zZWQoKTtcblx0XHRyZXR1cm4gbG9hZFRoZW1lU3luYyhhd2FpdCByZXNvbHZlVGhlbWVzKHRoZW1lcykpO1xuXHR9XG5cdGZ1bmN0aW9uIGVuc3VyZU5vdERpc3Bvc2VkKCkge1xuXHRcdGlmIChpc0Rpc3Bvc2VkKSB0aHJvdyBuZXcgU2hpa2lFcnJvcihcIlNoaWtpIGluc3RhbmNlIGhhcyBiZWVuIGRpc3Bvc2VkXCIpO1xuXHR9XG5cdGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG5cdFx0aWYgKGlzRGlzcG9zZWQpIHJldHVybjtcblx0XHRpc0Rpc3Bvc2VkID0gdHJ1ZTtcblx0XHRfcmVnaXN0cnkuZGlzcG9zZSgpO1xuXHRcdGluc3RhbmNlc0NvdW50IC09IDE7XG5cdH1cblx0cmV0dXJuIHtcblx0XHRzZXRUaGVtZSxcblx0XHRnZXRUaGVtZSxcblx0XHRnZXRMYW5ndWFnZSxcblx0XHRnZXRMb2FkZWRUaGVtZXMsXG5cdFx0Z2V0TG9hZGVkTGFuZ3VhZ2VzLFxuXHRcdHJlc29sdmVMYW5nQWxpYXM6IHJlc29sdmVMYW5nQWxpYXMkMSxcblx0XHRsb2FkTGFuZ3VhZ2UsXG5cdFx0bG9hZExhbmd1YWdlU3luYyxcblx0XHRsb2FkVGhlbWUsXG5cdFx0bG9hZFRoZW1lU3luYyxcblx0XHRkaXNwb3NlLFxuXHRcdFtTeW1ib2wuZGlzcG9zZV06IGRpc3Bvc2Vcblx0fTtcbn1cbi8qKlxuKiBAZGVwcmVjYXRlZCBVc2UgYGNyZWF0ZVNoaWtpUHJpbWl0aXZlYCBpbnN0ZWFkLlxuKi9cbmNvbnN0IGNyZWF0ZVNoaWtpSW50ZXJuYWxTeW5jID0gY3JlYXRlU2hpa2lQcmltaXRpdmU7XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvY29uc3RydWN0b3JzL2FzeW5jLnRzXG4vKipcbiogR2V0IHRoZSBtaW5pbWFsIHNoaWtpIHByaW1pdGl2ZSBpbnN0YW5jZS5cbiovXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVTaGlraVByaW1pdGl2ZUFzeW5jKG9wdGlvbnMpIHtcblx0aWYgKCFvcHRpb25zLmVuZ2luZSkgY29uc29sZS53YXJuKFwiYGVuZ2luZWAgb3B0aW9uIGlzIHJlcXVpcmVkLiBVc2UgYGNyZWF0ZU9uaWd1cnVtYUVuZ2luZWAgb3IgYGNyZWF0ZUphdmFTY3JpcHRSZWdleEVuZ2luZWAgdG8gY3JlYXRlIGFuIGVuZ2luZS5cIik7XG5cdGNvbnN0IFt0aGVtZXMsIGxhbmdzLCBlbmdpbmVdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuXHRcdHJlc29sdmVUaGVtZXMob3B0aW9ucy50aGVtZXMgfHwgW10pLFxuXHRcdHJlc29sdmVMYW5ncyhvcHRpb25zLmxhbmdzIHx8IFtdKSxcblx0XHRvcHRpb25zLmVuZ2luZVxuXHRdKTtcblx0cmV0dXJuIGNyZWF0ZVNoaWtpUHJpbWl0aXZlKHtcblx0XHQuLi5vcHRpb25zLFxuXHRcdHRoZW1lcyxcblx0XHRsYW5ncyxcblx0XHRlbmdpbmVcblx0fSk7XG59XG4vKipcbiogQGRlcHJlY2F0ZWQgVXNlIGBjcmVhdGVTaGlraVByaW1pdGl2ZUFzeW5jYCBpbnN0ZWFkLlxuKi9cbmNvbnN0IGNyZWF0ZVNoaWtpSW50ZXJuYWwgPSBjcmVhdGVTaGlraVByaW1pdGl2ZUFzeW5jO1xuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gc3JjL3RleHRtYXRlL2dyYW1tYXItc3RhdGUudHNcbmNvbnN0IF9ncmFtbWFyU3RhdGVNYXAgPSAvKiBAX19QVVJFX18gKi8gbmV3IFdlYWtNYXAoKTtcbmZ1bmN0aW9uIHNldExhc3RHcmFtbWFyU3RhdGVUb01hcChrZXlzLCBzdGF0ZSkge1xuXHRfZ3JhbW1hclN0YXRlTWFwLnNldChrZXlzLCBzdGF0ZSk7XG59XG5mdW5jdGlvbiBnZXRMYXN0R3JhbW1hclN0YXRlRnJvbU1hcChrZXlzKSB7XG5cdHJldHVybiBfZ3JhbW1hclN0YXRlTWFwLmdldChrZXlzKTtcbn1cbi8qKlxuKiBHcmFtbWFyU3RhdGUgaXMgYSBzcGVjaWFsIHJlZmVyZW5jZSBvYmplY3QgdGhhdCBob2xkcyB0aGUgc3RhdGUgb2YgYSBncmFtbWFyLlxuKlxuKiBJdCdzIHVzZWQgdG8gaGlnaGxpZ2h0IGNvZGUgc25pcHBldHMgdGhhdCBhcmUgcGFydCBvZiB0aGUgdGFyZ2V0IGxhbmd1YWdlLlxuKi9cbnZhciBHcmFtbWFyU3RhdGUgPSBjbGFzcyBHcmFtbWFyU3RhdGUge1xuXHQvKipcblx0KiBUaGVtZSB0byBTdGFjayBtYXBwaW5nXG5cdCovXG5cdF9zdGFja3MgPSB7fTtcblx0bGFuZztcblx0Z2V0IHRoZW1lcygpIHtcblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpcy5fc3RhY2tzKTtcblx0fVxuXHRnZXQgdGhlbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMudGhlbWVzWzBdO1xuXHR9XG5cdGdldCBfc3RhY2soKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3N0YWNrc1t0aGlzLnRoZW1lXTtcblx0fVxuXHQvKipcblx0KiBTdGF0aWMgbWV0aG9kIHRvIGNyZWF0ZSBhIGluaXRpYWwgZ3JhbW1hciBzdGF0ZS5cblx0Ki9cblx0c3RhdGljIGluaXRpYWwobGFuZywgdGhlbWVzKSB7XG5cdFx0cmV0dXJuIG5ldyBHcmFtbWFyU3RhdGUoT2JqZWN0LmZyb21FbnRyaWVzKHRvQXJyYXkodGhlbWVzKS5tYXAoKHRoZW1lKSA9PiBbdGhlbWUsIElOSVRJQUxdKSksIGxhbmcpO1xuXHR9XG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRpZiAoYXJncy5sZW5ndGggPT09IDIpIHtcblx0XHRcdGNvbnN0IFtzdGFja3NNYXAsIGxhbmddID0gYXJncztcblx0XHRcdHRoaXMubGFuZyA9IGxhbmc7XG5cdFx0XHR0aGlzLl9zdGFja3MgPSBzdGFja3NNYXA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IFtzdGFjaywgbGFuZywgdGhlbWVdID0gYXJncztcblx0XHRcdHRoaXMubGFuZyA9IGxhbmc7XG5cdFx0XHR0aGlzLl9zdGFja3MgPSB7IFt0aGVtZV06IHN0YWNrIH07XG5cdFx0fVxuXHR9XG5cdC8qKlxuXHQqIEdldCB0aGUgaW50ZXJuYWwgc3RhY2sgb2JqZWN0LlxuXHQqIEBpbnRlcm5hbFxuXHQqL1xuXHRnZXRJbnRlcm5hbFN0YWNrKHRoZW1lID0gdGhpcy50aGVtZSkge1xuXHRcdHJldHVybiB0aGlzLl9zdGFja3NbdGhlbWVdO1xuXHR9XG5cdGdldFNjb3Blcyh0aGVtZSA9IHRoaXMudGhlbWUpIHtcblx0XHRyZXR1cm4gZ2V0U2NvcGVzKHRoaXMuX3N0YWNrc1t0aGVtZV0pO1xuXHR9XG5cdHRvSlNPTigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bGFuZzogdGhpcy5sYW5nLFxuXHRcdFx0dGhlbWU6IHRoaXMudGhlbWUsXG5cdFx0XHR0aGVtZXM6IHRoaXMudGhlbWVzLFxuXHRcdFx0c2NvcGVzOiB0aGlzLmdldFNjb3BlcygpXG5cdFx0fTtcblx0fVxufTtcbmZ1bmN0aW9uIGdldFNjb3BlcyhzdGFjaykge1xuXHRjb25zdCBzY29wZXMgPSBbXTtcblx0Y29uc3QgdmlzaXRlZCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KCk7XG5cdGZ1bmN0aW9uIHB1c2hTY29wZShzdGFjaykge1xuXHRcdGlmICh2aXNpdGVkLmhhcyhzdGFjaykpIHJldHVybjtcblx0XHR2aXNpdGVkLmFkZChzdGFjayk7XG5cdFx0Y29uc3QgbmFtZSA9IHN0YWNrPy5uYW1lU2NvcGVzTGlzdD8uc2NvcGVOYW1lO1xuXHRcdGlmIChuYW1lKSBzY29wZXMucHVzaChuYW1lKTtcblx0XHRpZiAoc3RhY2sucGFyZW50KSBwdXNoU2NvcGUoc3RhY2sucGFyZW50KTtcblx0fVxuXHRwdXNoU2NvcGUoc3RhY2spO1xuXHRyZXR1cm4gc2NvcGVzO1xufVxuZnVuY3Rpb24gZ2V0R3JhbW1hclN0YWNrKHN0YXRlLCB0aGVtZSkge1xuXHRpZiAoIShzdGF0ZSBpbnN0YW5jZW9mIEdyYW1tYXJTdGF0ZSkpIHRocm93IG5ldyBTaGlraUVycm9yKFwiSW52YWxpZCBncmFtbWFyIHN0YXRlXCIpO1xuXHRyZXR1cm4gc3RhdGUuZ2V0SW50ZXJuYWxTdGFjayh0aGVtZSk7XG59XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvaGlnaGxpZ2h0L2NvZGUtdG8tdG9rZW5zLWJhc2UudHNcbmNvbnN0IFJFX0NPTU1BID0gLywvO1xuY29uc3QgUkVfU1BBQ0UgPSAvIC87XG4vKipcbiogQ29kZSB0byB0b2tlbnMsIHdpdGggYSBzaW1wbGUgdGhlbWUuXG4qL1xuZnVuY3Rpb24gY29kZVRvVG9rZW5zQmFzZShwcmltaXRpdmUsIGNvZGUsIG9wdGlvbnMgPSB7fSkge1xuXHRjb25zdCB7IHRoZW1lOiB0aGVtZU5hbWUgPSBwcmltaXRpdmUuZ2V0TG9hZGVkVGhlbWVzKClbMF0gfSA9IG9wdGlvbnM7XG5cdGlmIChpc1BsYWluTGFuZyhwcmltaXRpdmUucmVzb2x2ZUxhbmdBbGlhcyhvcHRpb25zLmxhbmcgfHwgXCJ0ZXh0XCIpKSB8fCBpc05vbmVUaGVtZSh0aGVtZU5hbWUpKSByZXR1cm4gc3BsaXRMaW5lcyhjb2RlKS5tYXAoKGxpbmUpID0+IFt7XG5cdFx0Y29udGVudDogbGluZVswXSxcblx0XHRvZmZzZXQ6IGxpbmVbMV1cblx0fV0pO1xuXHRjb25zdCB7IHRoZW1lLCBjb2xvck1hcCB9ID0gcHJpbWl0aXZlLnNldFRoZW1lKHRoZW1lTmFtZSk7XG5cdGNvbnN0IF9ncmFtbWFyID0gcHJpbWl0aXZlLmdldExhbmd1YWdlKG9wdGlvbnMubGFuZyB8fCBcInRleHRcIik7XG5cdGlmIChvcHRpb25zLmdyYW1tYXJTdGF0ZSkge1xuXHRcdGlmIChvcHRpb25zLmdyYW1tYXJTdGF0ZS5sYW5nICE9PSBfZ3JhbW1hci5uYW1lKSB0aHJvdyBuZXcgU2hpa2lFcnJvcihgR3JhbW1hciBzdGF0ZSBsYW5ndWFnZSBcIiR7b3B0aW9ucy5ncmFtbWFyU3RhdGUubGFuZ31cIiBkb2VzIG5vdCBtYXRjaCBoaWdobGlnaHQgbGFuZ3VhZ2UgXCIke19ncmFtbWFyLm5hbWV9XCJgKTtcblx0XHRpZiAoIW9wdGlvbnMuZ3JhbW1hclN0YXRlLnRoZW1lcy5pbmNsdWRlcyh0aGVtZS5uYW1lKSkgdGhyb3cgbmV3IFNoaWtpRXJyb3IoYEdyYW1tYXIgc3RhdGUgdGhlbWVzIFwiJHtvcHRpb25zLmdyYW1tYXJTdGF0ZS50aGVtZXN9XCIgZG8gbm90IGNvbnRhaW4gaGlnaGxpZ2h0IHRoZW1lIFwiJHt0aGVtZS5uYW1lfVwiYCk7XG5cdH1cblx0cmV0dXJuIHRva2VuaXplV2l0aFRoZW1lKGNvZGUsIF9ncmFtbWFyLCB0aGVtZSwgY29sb3JNYXAsIG9wdGlvbnMpO1xufVxuZnVuY3Rpb24gZ2V0TGFzdEdyYW1tYXJTdGF0ZSguLi5hcmdzKSB7XG5cdGlmIChhcmdzLmxlbmd0aCA9PT0gMikgcmV0dXJuIGdldExhc3RHcmFtbWFyU3RhdGVGcm9tTWFwKGFyZ3NbMV0pO1xuXHRjb25zdCBbcHJpbWl0aXZlLCBjb2RlLCBvcHRpb25zID0ge31dID0gYXJncztcblx0Y29uc3QgeyBsYW5nID0gXCJ0ZXh0XCIsIHRoZW1lOiB0aGVtZU5hbWUgPSBwcmltaXRpdmUuZ2V0TG9hZGVkVGhlbWVzKClbMF0gfSA9IG9wdGlvbnM7XG5cdGlmIChpc1BsYWluTGFuZyhsYW5nKSB8fCBpc05vbmVUaGVtZSh0aGVtZU5hbWUpKSB0aHJvdyBuZXcgU2hpa2lFcnJvcihcIlBsYWluIGxhbmd1YWdlIGRvZXMgbm90IGhhdmUgZ3JhbW1hciBzdGF0ZVwiKTtcblx0aWYgKGxhbmcgPT09IFwiYW5zaVwiKSB0aHJvdyBuZXcgU2hpa2lFcnJvcihcIkFOU0kgbGFuZ3VhZ2UgZG9lcyBub3QgaGF2ZSBncmFtbWFyIHN0YXRlXCIpO1xuXHRjb25zdCB7IHRoZW1lLCBjb2xvck1hcCB9ID0gcHJpbWl0aXZlLnNldFRoZW1lKHRoZW1lTmFtZSk7XG5cdGNvbnN0IF9ncmFtbWFyID0gcHJpbWl0aXZlLmdldExhbmd1YWdlKGxhbmcpO1xuXHRyZXR1cm4gbmV3IEdyYW1tYXJTdGF0ZShfdG9rZW5pemVXaXRoVGhlbWUoY29kZSwgX2dyYW1tYXIsIHRoZW1lLCBjb2xvck1hcCwgb3B0aW9ucykuc3RhdGVTdGFjaywgX2dyYW1tYXIubmFtZSwgdGhlbWUubmFtZSk7XG59XG5mdW5jdGlvbiB0b2tlbml6ZVdpdGhUaGVtZShjb2RlLCBncmFtbWFyLCB0aGVtZSwgY29sb3JNYXAsIG9wdGlvbnMpIHtcblx0Y29uc3QgcmVzdWx0ID0gX3Rva2VuaXplV2l0aFRoZW1lKGNvZGUsIGdyYW1tYXIsIHRoZW1lLCBjb2xvck1hcCwgb3B0aW9ucyk7XG5cdGNvbnN0IGdyYW1tYXJTdGF0ZSA9IG5ldyBHcmFtbWFyU3RhdGUocmVzdWx0LnN0YXRlU3RhY2ssIGdyYW1tYXIubmFtZSwgdGhlbWUubmFtZSk7XG5cdHNldExhc3RHcmFtbWFyU3RhdGVUb01hcChyZXN1bHQudG9rZW5zLCBncmFtbWFyU3RhdGUpO1xuXHRyZXR1cm4gcmVzdWx0LnRva2Vucztcbn1cbmZ1bmN0aW9uIF90b2tlbml6ZVdpdGhUaGVtZShjb2RlLCBncmFtbWFyLCB0aGVtZSwgY29sb3JNYXAsIG9wdGlvbnMpIHtcblx0Y29uc3QgY29sb3JSZXBsYWNlbWVudHMgPSByZXNvbHZlQ29sb3JSZXBsYWNlbWVudHModGhlbWUsIG9wdGlvbnMpO1xuXHRjb25zdCB7IHRva2VuaXplTWF4TGluZUxlbmd0aCA9IDAsIHRva2VuaXplVGltZUxpbWl0ID0gNTAwIH0gPSBvcHRpb25zO1xuXHRjb25zdCBsaW5lcyA9IHNwbGl0TGluZXMoY29kZSk7XG5cdGxldCBzdGF0ZVN0YWNrID0gb3B0aW9ucy5ncmFtbWFyU3RhdGUgPyBnZXRHcmFtbWFyU3RhY2sob3B0aW9ucy5ncmFtbWFyU3RhdGUsIHRoZW1lLm5hbWUpID8/IElOSVRJQUwgOiBvcHRpb25zLmdyYW1tYXJDb250ZXh0Q29kZSAhPSBudWxsID8gX3Rva2VuaXplV2l0aFRoZW1lKG9wdGlvbnMuZ3JhbW1hckNvbnRleHRDb2RlLCBncmFtbWFyLCB0aGVtZSwgY29sb3JNYXAsIHtcblx0XHQuLi5vcHRpb25zLFxuXHRcdGdyYW1tYXJTdGF0ZTogdm9pZCAwLFxuXHRcdGdyYW1tYXJDb250ZXh0Q29kZTogdm9pZCAwXG5cdH0pLnN0YXRlU3RhY2sgOiBJTklUSUFMO1xuXHRsZXQgYWN0dWFsID0gW107XG5cdGNvbnN0IGZpbmFsID0gW107XG5cdGZvciAobGV0IGkgPSAwLCBsZW4gPSBsaW5lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdGNvbnN0IFtsaW5lLCBsaW5lT2Zmc2V0XSA9IGxpbmVzW2ldO1xuXHRcdGlmIChsaW5lID09PSBcIlwiKSB7XG5cdFx0XHRhY3R1YWwgPSBbXTtcblx0XHRcdGZpbmFsLnB1c2goW10pO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXHRcdGlmICh0b2tlbml6ZU1heExpbmVMZW5ndGggPiAwICYmIGxpbmUubGVuZ3RoID49IHRva2VuaXplTWF4TGluZUxlbmd0aCkge1xuXHRcdFx0YWN0dWFsID0gW107XG5cdFx0XHRmaW5hbC5wdXNoKFt7XG5cdFx0XHRcdGNvbnRlbnQ6IGxpbmUsXG5cdFx0XHRcdG9mZnNldDogbGluZU9mZnNldCxcblx0XHRcdFx0Y29sb3I6IFwiXCIsXG5cdFx0XHRcdGZvbnRTdHlsZTogMFxuXHRcdFx0fV0pO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXHRcdGxldCByZXN1bHRXaXRoU2NvcGVzO1xuXHRcdGxldCB0b2tlbnNXaXRoU2NvcGVzO1xuXHRcdGxldCB0b2tlbnNXaXRoU2NvcGVzSW5kZXg7XG5cdFx0aWYgKG9wdGlvbnMuaW5jbHVkZUV4cGxhbmF0aW9uKSB7XG5cdFx0XHRyZXN1bHRXaXRoU2NvcGVzID0gZ3JhbW1hci50b2tlbml6ZUxpbmUobGluZSwgc3RhdGVTdGFjaywgdG9rZW5pemVUaW1lTGltaXQpO1xuXHRcdFx0dG9rZW5zV2l0aFNjb3BlcyA9IHJlc3VsdFdpdGhTY29wZXMudG9rZW5zO1xuXHRcdFx0dG9rZW5zV2l0aFNjb3Blc0luZGV4ID0gMDtcblx0XHR9XG5cdFx0Y29uc3QgcmVzdWx0ID0gZ3JhbW1hci50b2tlbml6ZUxpbmUyKGxpbmUsIHN0YXRlU3RhY2ssIHRva2VuaXplVGltZUxpbWl0KTtcblx0XHRjb25zdCB0b2tlbnNMZW5ndGggPSByZXN1bHQudG9rZW5zLmxlbmd0aCAvIDI7XG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCB0b2tlbnNMZW5ndGg7IGorKykge1xuXHRcdFx0Y29uc3Qgc3RhcnRJbmRleCA9IHJlc3VsdC50b2tlbnNbMiAqIGpdO1xuXHRcdFx0Y29uc3QgbmV4dFN0YXJ0SW5kZXggPSBqICsgMSA8IHRva2Vuc0xlbmd0aCA/IHJlc3VsdC50b2tlbnNbMiAqIGogKyAyXSA6IGxpbmUubGVuZ3RoO1xuXHRcdFx0aWYgKHN0YXJ0SW5kZXggPT09IG5leHRTdGFydEluZGV4KSBjb250aW51ZTtcblx0XHRcdGNvbnN0IG1ldGFkYXRhID0gcmVzdWx0LnRva2Vuc1syICogaiArIDFdO1xuXHRcdFx0Y29uc3QgY29sb3IgPSBhcHBseUNvbG9yUmVwbGFjZW1lbnRzKGNvbG9yTWFwW0VuY29kZWRUb2tlbk1ldGFkYXRhLmdldEZvcmVncm91bmQobWV0YWRhdGEpXSwgY29sb3JSZXBsYWNlbWVudHMpO1xuXHRcdFx0Y29uc3QgZm9udFN0eWxlID0gRW5jb2RlZFRva2VuTWV0YWRhdGEuZ2V0Rm9udFN0eWxlKG1ldGFkYXRhKTtcblx0XHRcdGNvbnN0IHRva2VuID0ge1xuXHRcdFx0XHRjb250ZW50OiBsaW5lLnN1YnN0cmluZyhzdGFydEluZGV4LCBuZXh0U3RhcnRJbmRleCksXG5cdFx0XHRcdG9mZnNldDogbGluZU9mZnNldCArIHN0YXJ0SW5kZXgsXG5cdFx0XHRcdGNvbG9yLFxuXHRcdFx0XHRmb250U3R5bGVcblx0XHRcdH07XG5cdFx0XHRpZiAob3B0aW9ucy5pbmNsdWRlRXhwbGFuYXRpb24pIHtcblx0XHRcdFx0Y29uc3QgdGhlbWVTZXR0aW5nc1NlbGVjdG9ycyA9IFtdO1xuXHRcdFx0XHRpZiAob3B0aW9ucy5pbmNsdWRlRXhwbGFuYXRpb24gIT09IFwic2NvcGVOYW1lXCIpIGZvciAoY29uc3Qgc2V0dGluZyBvZiB0aGVtZS5zZXR0aW5ncykge1xuXHRcdFx0XHRcdGxldCBzZWxlY3RvcnM7XG5cdFx0XHRcdFx0c3dpdGNoICh0eXBlb2Ygc2V0dGluZy5zY29wZSkge1xuXHRcdFx0XHRcdFx0Y2FzZSBcInN0cmluZ1wiOlxuXHRcdFx0XHRcdFx0XHRzZWxlY3RvcnMgPSBzZXR0aW5nLnNjb3BlLnNwbGl0KFJFX0NPTU1BKS5tYXAoKHNjb3BlKSA9PiBzY29wZS50cmltKCkpO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCJvYmplY3RcIjpcblx0XHRcdFx0XHRcdFx0c2VsZWN0b3JzID0gc2V0dGluZy5zY29wZTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRkZWZhdWx0OiBjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhlbWVTZXR0aW5nc1NlbGVjdG9ycy5wdXNoKHtcblx0XHRcdFx0XHRcdHNldHRpbmdzOiBzZXR0aW5nLFxuXHRcdFx0XHRcdFx0c2VsZWN0b3JzOiBzZWxlY3RvcnMubWFwKChzZWxlY3RvcikgPT4gc2VsZWN0b3Iuc3BsaXQoUkVfU1BBQ0UpKVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRva2VuLmV4cGxhbmF0aW9uID0gW107XG5cdFx0XHRcdGxldCBvZmZzZXQgPSAwO1xuXHRcdFx0XHR3aGlsZSAoc3RhcnRJbmRleCArIG9mZnNldCA8IG5leHRTdGFydEluZGV4KSB7XG5cdFx0XHRcdFx0Y29uc3QgdG9rZW5XaXRoU2NvcGVzID0gdG9rZW5zV2l0aFNjb3Blc1t0b2tlbnNXaXRoU2NvcGVzSW5kZXhdO1xuXHRcdFx0XHRcdGNvbnN0IHRva2VuV2l0aFNjb3Blc1RleHQgPSBsaW5lLnN1YnN0cmluZyh0b2tlbldpdGhTY29wZXMuc3RhcnRJbmRleCwgdG9rZW5XaXRoU2NvcGVzLmVuZEluZGV4KTtcblx0XHRcdFx0XHRvZmZzZXQgKz0gdG9rZW5XaXRoU2NvcGVzVGV4dC5sZW5ndGg7XG5cdFx0XHRcdFx0dG9rZW4uZXhwbGFuYXRpb24ucHVzaCh7XG5cdFx0XHRcdFx0XHRjb250ZW50OiB0b2tlbldpdGhTY29wZXNUZXh0LFxuXHRcdFx0XHRcdFx0c2NvcGVzOiBvcHRpb25zLmluY2x1ZGVFeHBsYW5hdGlvbiA9PT0gXCJzY29wZU5hbWVcIiA/IGV4cGxhaW5UaGVtZVNjb3Blc05hbWVPbmx5KHRva2VuV2l0aFNjb3Blcy5zY29wZXMpIDogZXhwbGFpblRoZW1lU2NvcGVzRnVsbCh0aGVtZVNldHRpbmdzU2VsZWN0b3JzLCB0b2tlbldpdGhTY29wZXMuc2NvcGVzKVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHRva2Vuc1dpdGhTY29wZXNJbmRleCArPSAxO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRhY3R1YWwucHVzaCh0b2tlbik7XG5cdFx0fVxuXHRcdGZpbmFsLnB1c2goYWN0dWFsKTtcblx0XHRhY3R1YWwgPSBbXTtcblx0XHRzdGF0ZVN0YWNrID0gcmVzdWx0LnJ1bGVTdGFjaztcblx0fVxuXHRyZXR1cm4ge1xuXHRcdHRva2VuczogZmluYWwsXG5cdFx0c3RhdGVTdGFja1xuXHR9O1xufVxuZnVuY3Rpb24gZXhwbGFpblRoZW1lU2NvcGVzTmFtZU9ubHkoc2NvcGVzKSB7XG5cdHJldHVybiBzY29wZXMubWFwKChzY29wZSkgPT4gKHsgc2NvcGVOYW1lOiBzY29wZSB9KSk7XG59XG5mdW5jdGlvbiBleHBsYWluVGhlbWVTY29wZXNGdWxsKHRoZW1lU2VsZWN0b3JzLCBzY29wZXMpIHtcblx0Y29uc3QgcmVzdWx0ID0gW107XG5cdGZvciAobGV0IGkgPSAwLCBsZW4gPSBzY29wZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRjb25zdCBzY29wZSA9IHNjb3Blc1tpXTtcblx0XHRyZXN1bHRbaV0gPSB7XG5cdFx0XHRzY29wZU5hbWU6IHNjb3BlLFxuXHRcdFx0dGhlbWVNYXRjaGVzOiBleHBsYWluVGhlbWVTY29wZSh0aGVtZVNlbGVjdG9ycywgc2NvcGUsIHNjb3Blcy5zbGljZSgwLCBpKSlcblx0XHR9O1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtYXRjaGVzT25lKHNlbGVjdG9yLCBzY29wZSkge1xuXHRyZXR1cm4gc2VsZWN0b3IgPT09IHNjb3BlIHx8IHNjb3BlLnN1YnN0cmluZygwLCBzZWxlY3Rvci5sZW5ndGgpID09PSBzZWxlY3RvciAmJiBzY29wZVtzZWxlY3Rvci5sZW5ndGhdID09PSBcIi5cIjtcbn1cbmZ1bmN0aW9uIG1hdGNoZXMoc2VsZWN0b3JzLCBzY29wZSwgcGFyZW50U2NvcGVzKSB7XG5cdGlmICghbWF0Y2hlc09uZShzZWxlY3RvcnMuYXQoLTEpLCBzY29wZSkpIHJldHVybiBmYWxzZTtcblx0bGV0IHNlbGVjdG9yUGFyZW50SW5kZXggPSBzZWxlY3RvcnMubGVuZ3RoIC0gMjtcblx0bGV0IHBhcmVudEluZGV4ID0gcGFyZW50U2NvcGVzLmxlbmd0aCAtIDE7XG5cdHdoaWxlIChzZWxlY3RvclBhcmVudEluZGV4ID49IDAgJiYgcGFyZW50SW5kZXggPj0gMCkge1xuXHRcdGlmIChtYXRjaGVzT25lKHNlbGVjdG9yc1tzZWxlY3RvclBhcmVudEluZGV4XSwgcGFyZW50U2NvcGVzW3BhcmVudEluZGV4XSkpIHNlbGVjdG9yUGFyZW50SW5kZXggLT0gMTtcblx0XHRwYXJlbnRJbmRleCAtPSAxO1xuXHR9XG5cdGlmIChzZWxlY3RvclBhcmVudEluZGV4ID09PSAtMSkgcmV0dXJuIHRydWU7XG5cdHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGV4cGxhaW5UaGVtZVNjb3BlKHRoZW1lU2V0dGluZ3NTZWxlY3RvcnMsIHNjb3BlLCBwYXJlbnRTY29wZXMpIHtcblx0Y29uc3QgcmVzdWx0ID0gW107XG5cdGZvciAoY29uc3QgeyBzZWxlY3RvcnMsIHNldHRpbmdzIH0gb2YgdGhlbWVTZXR0aW5nc1NlbGVjdG9ycykgZm9yIChjb25zdCBzZWxlY3RvclBpZWNlcyBvZiBzZWxlY3RvcnMpIGlmIChtYXRjaGVzKHNlbGVjdG9yUGllY2VzLCBzY29wZSwgcGFyZW50U2NvcGVzKSkge1xuXHRcdHJlc3VsdC5wdXNoKHNldHRpbmdzKTtcblx0XHRicmVhaztcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gc3JjL2hpZ2hsaWdodC9jb2RlLXRvLXRva2Vucy10aGVtZXMudHNcbi8qKlxuKiBHZXQgdG9rZW5zIHdpdGggbXVsdGlwbGUgdGhlbWVzXG4qL1xuZnVuY3Rpb24gY29kZVRvVG9rZW5zV2l0aFRoZW1lcyhwcmltaXRpdmUsIGNvZGUsIG9wdGlvbnMsIGNvZGVUb1Rva2Vuc0Jhc2VGbiA9IGNvZGVUb1Rva2Vuc0Jhc2UpIHtcblx0Y29uc3QgdGhlbWVzID0gT2JqZWN0LmVudHJpZXMob3B0aW9ucy50aGVtZXMpLmZpbHRlcigoaSkgPT4gaVsxXSkubWFwKChpKSA9PiAoe1xuXHRcdGNvbG9yOiBpWzBdLFxuXHRcdHRoZW1lOiBpWzFdXG5cdH0pKTtcblx0Y29uc3QgdGhlbWVkVG9rZW5zID0gdGhlbWVzLm1hcCgodCkgPT4ge1xuXHRcdGNvbnN0IHRva2VucyA9IGNvZGVUb1Rva2Vuc0Jhc2VGbihwcmltaXRpdmUsIGNvZGUsIHtcblx0XHRcdC4uLm9wdGlvbnMsXG5cdFx0XHR0aGVtZTogdC50aGVtZVxuXHRcdH0pO1xuXHRcdHJldHVybiB7XG5cdFx0XHR0b2tlbnMsXG5cdFx0XHRzdGF0ZTogZ2V0TGFzdEdyYW1tYXJTdGF0ZUZyb21NYXAodG9rZW5zKSxcblx0XHRcdHRoZW1lOiB0eXBlb2YgdC50aGVtZSA9PT0gXCJzdHJpbmdcIiA/IHQudGhlbWUgOiB0LnRoZW1lLm5hbWVcblx0XHR9O1xuXHR9KTtcblx0Y29uc3QgdG9rZW5zID0gYWxpZ25UaGVtZXNUb2tlbml6YXRpb24oLi4udGhlbWVkVG9rZW5zLm1hcCgoaSkgPT4gaS50b2tlbnMpKTtcblx0Y29uc3QgbWVyZ2VkVG9rZW5zID0gdG9rZW5zWzBdLm1hcCgobGluZSwgbGluZUlkeCkgPT4gbGluZS5tYXAoKF90b2tlbiwgdG9rZW5JZHgpID0+IHtcblx0XHRjb25zdCBtZXJnZWRUb2tlbiA9IHtcblx0XHRcdGNvbnRlbnQ6IF90b2tlbi5jb250ZW50LFxuXHRcdFx0dmFyaWFudHM6IHt9LFxuXHRcdFx0b2Zmc2V0OiBfdG9rZW4ub2Zmc2V0XG5cdFx0fTtcblx0XHRpZiAoXCJpbmNsdWRlRXhwbGFuYXRpb25cIiBpbiBvcHRpb25zICYmIG9wdGlvbnMuaW5jbHVkZUV4cGxhbmF0aW9uKSBtZXJnZWRUb2tlbi5leHBsYW5hdGlvbiA9IF90b2tlbi5leHBsYW5hdGlvbjtcblx0XHR0b2tlbnMuZm9yRWFjaCgodCwgdGhlbWVJZHgpID0+IHtcblx0XHRcdGNvbnN0IHsgY29udGVudDogXywgZXhwbGFuYXRpb246IF9fLCBvZmZzZXQ6IF9fXywgLi4uc3R5bGVzIH0gPSB0W2xpbmVJZHhdW3Rva2VuSWR4XTtcblx0XHRcdG1lcmdlZFRva2VuLnZhcmlhbnRzW3RoZW1lc1t0aGVtZUlkeF0uY29sb3JdID0gc3R5bGVzO1xuXHRcdH0pO1xuXHRcdHJldHVybiBtZXJnZWRUb2tlbjtcblx0fSkpO1xuXHRjb25zdCBtZXJnZWRHcmFtbWFyU3RhdGUgPSB0aGVtZWRUb2tlbnNbMF0uc3RhdGUgPyBuZXcgR3JhbW1hclN0YXRlKE9iamVjdC5mcm9tRW50cmllcyh0aGVtZWRUb2tlbnMubWFwKChzKSA9PiBbcy50aGVtZSwgcy5zdGF0ZT8uZ2V0SW50ZXJuYWxTdGFjayhzLnRoZW1lKV0pKSwgdGhlbWVkVG9rZW5zWzBdLnN0YXRlLmxhbmcpIDogdm9pZCAwO1xuXHRpZiAobWVyZ2VkR3JhbW1hclN0YXRlKSBzZXRMYXN0R3JhbW1hclN0YXRlVG9NYXAobWVyZ2VkVG9rZW5zLCBtZXJnZWRHcmFtbWFyU3RhdGUpO1xuXHRyZXR1cm4gbWVyZ2VkVG9rZW5zO1xufVxuLyoqXG4qIEJyZWFrIHRva2VucyBmcm9tIG11bHRpcGxlIHRoZW1lcyBpbnRvIHNhbWUgdG9rZW5pemF0aW9uLlxuKlxuKiBGb3IgZXhhbXBsZSwgZ2l2ZW4gdHdvIHRoZW1lcyB0aGF0IHRva2VuaXplIGBjb25zb2xlLmxvZyhcImhlbGxvXCIpYCBhczpcbipcbiogLSBgY29uc29sZSAuIGxvZyAoXCIgaGVsbG8gXCIpYCAoNiB0b2tlbnMpXG4qIC0gYGNvbnNvbGUgLmxvZyAoIFwiaGVsbG9cIiApYCAoNSB0b2tlbnMpXG4qXG4qIFRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm46XG4qXG4qIC0gYGNvbnNvbGUgLiBsb2cgKCBcIiBoZWxsbyBcIiApYCAoOCB0b2tlbnMpXG4qIC0gYGNvbnNvbGUgLiBsb2cgKCBcIiBoZWxsbyBcIiApYCAoOCB0b2tlbnMpXG4qL1xuZnVuY3Rpb24gYWxpZ25UaGVtZXNUb2tlbml6YXRpb24oLi4udGhlbWVzKSB7XG5cdGNvbnN0IG91dFRoZW1lcyA9IHRoZW1lcy5tYXAoKCkgPT4gW10pO1xuXHRjb25zdCBjb3VudCA9IHRoZW1lcy5sZW5ndGg7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgdGhlbWVzWzBdLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3QgbGluZXMgPSB0aGVtZXMubWFwKCh0KSA9PiB0W2ldKTtcblx0XHRjb25zdCBvdXRMaW5lcyA9IG91dFRoZW1lcy5tYXAoKCkgPT4gW10pO1xuXHRcdG91dFRoZW1lcy5mb3JFYWNoKCh0LCBpKSA9PiB0LnB1c2gob3V0TGluZXNbaV0pKTtcblx0XHRjb25zdCBpbmRleGVzID0gbGluZXMubWFwKCgpID0+IDApO1xuXHRcdGNvbnN0IGN1cnJlbnQgPSBsaW5lcy5tYXAoKGwpID0+IGxbMF0pO1xuXHRcdHdoaWxlIChjdXJyZW50LmV2ZXJ5KCh0KSA9PiB0KSkge1xuXHRcdFx0Y29uc3QgbWluTGVuZ3RoID0gTWF0aC5taW4oLi4uY3VycmVudC5tYXAoKHQpID0+IHQuY29udGVudC5sZW5ndGgpKTtcblx0XHRcdGZvciAobGV0IG4gPSAwOyBuIDwgY291bnQ7IG4rKykge1xuXHRcdFx0XHRjb25zdCB0b2tlbiA9IGN1cnJlbnRbbl07XG5cdFx0XHRcdGlmICh0b2tlbi5jb250ZW50Lmxlbmd0aCA9PT0gbWluTGVuZ3RoKSB7XG5cdFx0XHRcdFx0b3V0TGluZXNbbl0ucHVzaCh0b2tlbik7XG5cdFx0XHRcdFx0aW5kZXhlc1tuXSArPSAxO1xuXHRcdFx0XHRcdGN1cnJlbnRbbl0gPSBsaW5lc1tuXVtpbmRleGVzW25dXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRvdXRMaW5lc1tuXS5wdXNoKHtcblx0XHRcdFx0XHRcdC4uLnRva2VuLFxuXHRcdFx0XHRcdFx0Y29udGVudDogdG9rZW4uY29udGVudC5zbGljZSgwLCBtaW5MZW5ndGgpXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Y3VycmVudFtuXSA9IHtcblx0XHRcdFx0XHRcdC4uLnRva2VuLFxuXHRcdFx0XHRcdFx0Y29udGVudDogdG9rZW4uY29udGVudC5zbGljZShtaW5MZW5ndGgpLFxuXHRcdFx0XHRcdFx0b2Zmc2V0OiB0b2tlbi5vZmZzZXQgKyBtaW5MZW5ndGhcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiBvdXRUaGVtZXM7XG59XG4vLyNlbmRyZWdpb25cbmV4cG9ydCB7IEdyYW1tYXJTdGF0ZSwgUmVnaXN0cnksIFJlc29sdmVyLCBhbGlnblRoZW1lc1Rva2VuaXphdGlvbiwgYXBwbHlDb2xvclJlcGxhY2VtZW50cywgY29kZVRvVG9rZW5zQmFzZSwgY29kZVRvVG9rZW5zV2l0aFRoZW1lcywgY3JlYXRlU2hpa2lJbnRlcm5hbCwgY3JlYXRlU2hpa2lJbnRlcm5hbFN5bmMsIGNyZWF0ZVNoaWtpUHJpbWl0aXZlLCBjcmVhdGVTaGlraVByaW1pdGl2ZUFzeW5jLCBnZXRHcmFtbWFyU3RhY2ssIGdldExhc3RHcmFtbWFyU3RhdGUsIGdldExhc3RHcmFtbWFyU3RhdGVGcm9tTWFwLCBpc05vbmVUaGVtZSwgaXNQbGFpbkxhbmcsIGlzU3BlY2lhbExhbmcsIGlzU3BlY2lhbFRoZW1lLCBub3JtYWxpemVHZXR0ZXIsIG5vcm1hbGl6ZVRoZW1lLCByZXNvbHZlQ29sb3JSZXBsYWNlbWVudHMsIHJlc29sdmVMYW5nQWxpYXMsIHJlc29sdmVMYW5ncywgcmVzb2x2ZVRoZW1lcywgc2V0TGFzdEdyYW1tYXJTdGF0ZVRvTWFwLCBzcGxpdExpbmVzLCB0b0FycmF5LCB0b2tlbml6ZVdpdGhUaGVtZSB9O1xuIiwiLyoqXG4gKiBMaXN0IG9mIEhUTUwgdm9pZCB0YWcgbmFtZXMuXG4gKlxuICogQHR5cGUge0FycmF5PHN0cmluZz59XG4gKi9cbmV4cG9ydCBjb25zdCBodG1sVm9pZEVsZW1lbnRzID0gW1xuICAnYXJlYScsXG4gICdiYXNlJyxcbiAgJ2Jhc2Vmb250JyxcbiAgJ2Jnc291bmQnLFxuICAnYnInLFxuICAnY29sJyxcbiAgJ2NvbW1hbmQnLFxuICAnZW1iZWQnLFxuICAnZnJhbWUnLFxuICAnaHInLFxuICAnaW1hZ2UnLFxuICAnaW1nJyxcbiAgJ2lucHV0JyxcbiAgJ2tleWdlbicsXG4gICdsaW5rJyxcbiAgJ21ldGEnLFxuICAncGFyYW0nLFxuICAnc291cmNlJyxcbiAgJ3RyYWNrJyxcbiAgJ3dicidcbl1cbiIsIi8qKlxuICogQGltcG9ydCB7U2NoZW1hIGFzIFNjaGVtYVR5cGUsIFNwYWNlfSBmcm9tICdwcm9wZXJ0eS1pbmZvcm1hdGlvbidcbiAqL1xuXG4vKiogQHR5cGUge1NjaGVtYVR5cGV9ICovXG5leHBvcnQgY2xhc3MgU2NoZW1hIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7U2NoZW1hVHlwZVsncHJvcGVydHknXX0gcHJvcGVydHlcbiAgICogICBQcm9wZXJ0eS5cbiAgICogQHBhcmFtIHtTY2hlbWFUeXBlWydub3JtYWwnXX0gbm9ybWFsXG4gICAqICAgTm9ybWFsLlxuICAgKiBAcGFyYW0ge1NwYWNlIHwgdW5kZWZpbmVkfSBbc3BhY2VdXG4gICAqICAgU3BhY2UuXG4gICAqIEByZXR1cm5zXG4gICAqICAgU2NoZW1hLlxuICAgKi9cbiAgY29uc3RydWN0b3IocHJvcGVydHksIG5vcm1hbCwgc3BhY2UpIHtcbiAgICB0aGlzLm5vcm1hbCA9IG5vcm1hbFxuICAgIHRoaXMucHJvcGVydHkgPSBwcm9wZXJ0eVxuXG4gICAgaWYgKHNwYWNlKSB7XG4gICAgICB0aGlzLnNwYWNlID0gc3BhY2VcbiAgICB9XG4gIH1cbn1cblxuU2NoZW1hLnByb3RvdHlwZS5ub3JtYWwgPSB7fVxuU2NoZW1hLnByb3RvdHlwZS5wcm9wZXJ0eSA9IHt9XG5TY2hlbWEucHJvdG90eXBlLnNwYWNlID0gdW5kZWZpbmVkXG4iLCIvKipcbiAqIEBpbXBvcnQge0luZm8sIFNwYWNlfSBmcm9tICdwcm9wZXJ0eS1pbmZvcm1hdGlvbidcbiAqL1xuXG5pbXBvcnQge1NjaGVtYX0gZnJvbSAnLi9zY2hlbWEuanMnXG5cbi8qKlxuICogQHBhcmFtIHtSZWFkb25seUFycmF5PFNjaGVtYT59IGRlZmluaXRpb25zXG4gKiAgIERlZmluaXRpb25zLlxuICogQHBhcmFtIHtTcGFjZSB8IHVuZGVmaW5lZH0gW3NwYWNlXVxuICogICBTcGFjZS5cbiAqIEByZXR1cm5zIHtTY2hlbWF9XG4gKiAgIFNjaGVtYS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlKGRlZmluaXRpb25zLCBzcGFjZSkge1xuICAvKiogQHR5cGUge1JlY29yZDxzdHJpbmcsIEluZm8+fSAqL1xuICBjb25zdCBwcm9wZXJ0eSA9IHt9XG4gIC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZywgc3RyaW5nPn0gKi9cbiAgY29uc3Qgbm9ybWFsID0ge31cblxuICBmb3IgKGNvbnN0IGRlZmluaXRpb24gb2YgZGVmaW5pdGlvbnMpIHtcbiAgICBPYmplY3QuYXNzaWduKHByb3BlcnR5LCBkZWZpbml0aW9uLnByb3BlcnR5KVxuICAgIE9iamVjdC5hc3NpZ24obm9ybWFsLCBkZWZpbml0aW9uLm5vcm1hbClcbiAgfVxuXG4gIHJldHVybiBuZXcgU2NoZW1hKHByb3BlcnR5LCBub3JtYWwsIHNwYWNlKVxufVxuIiwiLyoqXG4gKiBHZXQgdGhlIGNsZWFuZWQgY2FzZSBpbnNlbnNpdGl2ZSBmb3JtIG9mIGFuIGF0dHJpYnV0ZSBvciBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqICAgQW4gYXR0cmlidXRlLWxpa2Ugb3IgcHJvcGVydHktbGlrZSBuYW1lLlxuICogQHJldHVybnMge3N0cmluZ31cbiAqICAgVmFsdWUgdGhhdCBjYW4gYmUgdXNlZCB0byBsb29rIHVwIHRoZSBwcm9wZXJseSBjYXNlZCBwcm9wZXJ0eSBvbiBhXG4gKiAgIGBTY2hlbWFgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZS50b0xvd2VyQ2FzZSgpXG59XG4iLCIvKipcbiAqIEBpbXBvcnQge0luZm8gYXMgSW5mb1R5cGV9IGZyb20gJ3Byb3BlcnR5LWluZm9ybWF0aW9uJ1xuICovXG5cbi8qKiBAdHlwZSB7SW5mb1R5cGV9ICovXG5leHBvcnQgY2xhc3MgSW5mbyB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlcbiAgICogICBQcm9wZXJ0eS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJpYnV0ZVxuICAgKiAgIEF0dHJpYnV0ZS5cbiAgICogQHJldHVybnNcbiAgICogICBJbmZvLlxuICAgKi9cbiAgY29uc3RydWN0b3IocHJvcGVydHksIGF0dHJpYnV0ZSkge1xuICAgIHRoaXMuYXR0cmlidXRlID0gYXR0cmlidXRlXG4gICAgdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5XG4gIH1cbn1cblxuSW5mby5wcm90b3R5cGUuYXR0cmlidXRlID0gJydcbkluZm8ucHJvdG90eXBlLmJvb2xlYW5pc2ggPSBmYWxzZVxuSW5mby5wcm90b3R5cGUuYm9vbGVhbiA9IGZhbHNlXG5JbmZvLnByb3RvdHlwZS5jb21tYU9yU3BhY2VTZXBhcmF0ZWQgPSBmYWxzZVxuSW5mby5wcm90b3R5cGUuY29tbWFTZXBhcmF0ZWQgPSBmYWxzZVxuSW5mby5wcm90b3R5cGUuZGVmaW5lZCA9IGZhbHNlXG5JbmZvLnByb3RvdHlwZS5tdXN0VXNlUHJvcGVydHkgPSBmYWxzZVxuSW5mby5wcm90b3R5cGUubnVtYmVyID0gZmFsc2VcbkluZm8ucHJvdG90eXBlLm92ZXJsb2FkZWRCb29sZWFuID0gZmFsc2VcbkluZm8ucHJvdG90eXBlLnByb3BlcnR5ID0gJydcbkluZm8ucHJvdG90eXBlLnNwYWNlU2VwYXJhdGVkID0gZmFsc2VcbkluZm8ucHJvdG90eXBlLnNwYWNlID0gdW5kZWZpbmVkXG4iLCJsZXQgcG93ZXJzID0gMFxuXG5leHBvcnQgY29uc3QgYm9vbGVhbiA9IGluY3JlbWVudCgpXG5leHBvcnQgY29uc3QgYm9vbGVhbmlzaCA9IGluY3JlbWVudCgpXG5leHBvcnQgY29uc3Qgb3ZlcmxvYWRlZEJvb2xlYW4gPSBpbmNyZW1lbnQoKVxuZXhwb3J0IGNvbnN0IG51bWJlciA9IGluY3JlbWVudCgpXG5leHBvcnQgY29uc3Qgc3BhY2VTZXBhcmF0ZWQgPSBpbmNyZW1lbnQoKVxuZXhwb3J0IGNvbnN0IGNvbW1hU2VwYXJhdGVkID0gaW5jcmVtZW50KClcbmV4cG9ydCBjb25zdCBjb21tYU9yU3BhY2VTZXBhcmF0ZWQgPSBpbmNyZW1lbnQoKVxuXG5mdW5jdGlvbiBpbmNyZW1lbnQoKSB7XG4gIHJldHVybiAyICoqICsrcG93ZXJzXG59XG4iLCIvKipcbiAqIEBpbXBvcnQge1NwYWNlfSBmcm9tICdwcm9wZXJ0eS1pbmZvcm1hdGlvbidcbiAqL1xuXG5pbXBvcnQge0luZm99IGZyb20gJy4vaW5mby5qcydcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4vdHlwZXMuanMnXG5cbmNvbnN0IGNoZWNrcyA9IC8qKiBAdHlwZSB7UmVhZG9ubHlBcnJheTxrZXlvZiB0eXBlb2YgdHlwZXM+fSAqLyAoXG4gIE9iamVjdC5rZXlzKHR5cGVzKVxuKVxuXG5leHBvcnQgY2xhc3MgRGVmaW5lZEluZm8gZXh0ZW5kcyBJbmZvIHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlcbiAgICogICBQcm9wZXJ0eS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJpYnV0ZVxuICAgKiAgIEF0dHJpYnV0ZS5cbiAgICogQHBhcmFtIHtudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkfSBbbWFza11cbiAgICogICBNYXNrLlxuICAgKiBAcGFyYW0ge1NwYWNlIHwgdW5kZWZpbmVkfSBbc3BhY2VdXG4gICAqICAgU3BhY2UuXG4gICAqIEByZXR1cm5zXG4gICAqICAgSW5mby5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHByb3BlcnR5LCBhdHRyaWJ1dGUsIG1hc2ssIHNwYWNlKSB7XG4gICAgbGV0IGluZGV4ID0gLTFcblxuICAgIHN1cGVyKHByb3BlcnR5LCBhdHRyaWJ1dGUpXG5cbiAgICBtYXJrKHRoaXMsICdzcGFjZScsIHNwYWNlKVxuXG4gICAgaWYgKHR5cGVvZiBtYXNrID09PSAnbnVtYmVyJykge1xuICAgICAgd2hpbGUgKCsraW5kZXggPCBjaGVja3MubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGNoZWNrID0gY2hlY2tzW2luZGV4XVxuICAgICAgICBtYXJrKHRoaXMsIGNoZWNrc1tpbmRleF0sIChtYXNrICYgdHlwZXNbY2hlY2tdKSA9PT0gdHlwZXNbY2hlY2tdKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5EZWZpbmVkSW5mby5wcm90b3R5cGUuZGVmaW5lZCA9IHRydWVcblxuLyoqXG4gKiBAdGVtcGxhdGUge2tleW9mIERlZmluZWRJbmZvfSBLZXlcbiAqICAgS2V5IHR5cGUuXG4gKiBAcGFyYW0ge0RlZmluZWRJbmZvfSB2YWx1ZXNcbiAqICAgSW5mby5cbiAqIEBwYXJhbSB7S2V5fSBrZXlcbiAqICAgS2V5LlxuICogQHBhcmFtIHtEZWZpbmVkSW5mb1tLZXldfSB2YWx1ZVxuICogICBWYWx1ZS5cbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKiAgIE5vdGhpbmcuXG4gKi9cbmZ1bmN0aW9uIG1hcmsodmFsdWVzLCBrZXksIHZhbHVlKSB7XG4gIGlmICh2YWx1ZSkge1xuICAgIHZhbHVlc1trZXldID0gdmFsdWVcbiAgfVxufVxuIiwiLyoqXG4gKiBAaW1wb3J0IHtJbmZvLCBTcGFjZX0gZnJvbSAncHJvcGVydHktaW5mb3JtYXRpb24nXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiBEZWZpbml0aW9uXG4gKiAgIERlZmluaXRpb24gb2YgYSBzY2hlbWEuXG4gKiBAcHJvcGVydHkge1JlY29yZDxzdHJpbmcsIHN0cmluZz4gfCB1bmRlZmluZWR9IFthdHRyaWJ1dGVzXVxuICogICBOb3JtYWx6ZWQgbmFtZXMgdG8gc3BlY2lhbCBhdHRyaWJ1dGUgY2FzZS5cbiAqIEBwcm9wZXJ0eSB7UmVhZG9ubHlBcnJheTxzdHJpbmc+IHwgdW5kZWZpbmVkfSBbbXVzdFVzZVByb3BlcnR5XVxuICogICBOb3JtYWxpemVkIG5hbWVzIHRoYXQgbXVzdCBiZSBzZXQgYXMgcHJvcGVydGllcy5cbiAqIEBwcm9wZXJ0eSB7UmVjb3JkPHN0cmluZywgbnVtYmVyIHwgbnVsbD59IHByb3BlcnRpZXNcbiAqICAgUHJvcGVydHkgbmFtZXMgdG8gdGhlaXIgdHlwZXMuXG4gKiBAcHJvcGVydHkge1NwYWNlIHwgdW5kZWZpbmVkfSBbc3BhY2VdXG4gKiAgIFNwYWNlLlxuICogQHByb3BlcnR5IHtUcmFuc2Zvcm19IHRyYW5zZm9ybVxuICogICBUcmFuc2Zvcm0gYSBwcm9wZXJ0eSBuYW1lLlxuICovXG5cbi8qKlxuICogQGNhbGxiYWNrIFRyYW5zZm9ybVxuICogICBUcmFuc2Zvcm0uXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIHN0cmluZz59IGF0dHJpYnV0ZXNcbiAqICAgQXR0cmlidXRlcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eVxuICogICBQcm9wZXJ0eS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiAgIEF0dHJpYnV0ZS5cbiAqL1xuXG5pbXBvcnQge25vcm1hbGl6ZX0gZnJvbSAnLi4vbm9ybWFsaXplLmpzJ1xuaW1wb3J0IHtEZWZpbmVkSW5mb30gZnJvbSAnLi9kZWZpbmVkLWluZm8uanMnXG5pbXBvcnQge1NjaGVtYX0gZnJvbSAnLi9zY2hlbWEuanMnXG5cbi8qKlxuICogQHBhcmFtIHtEZWZpbml0aW9ufSBkZWZpbml0aW9uXG4gKiAgIERlZmluaXRpb24uXG4gKiBAcmV0dXJucyB7U2NoZW1hfVxuICogICBTY2hlbWEuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoZGVmaW5pdGlvbikge1xuICAvKiogQHR5cGUge1JlY29yZDxzdHJpbmcsIEluZm8+fSAqL1xuICBjb25zdCBwcm9wZXJ0aWVzID0ge31cbiAgLyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+fSAqL1xuICBjb25zdCBub3JtYWxzID0ge31cblxuICBmb3IgKGNvbnN0IFtwcm9wZXJ0eSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGRlZmluaXRpb24ucHJvcGVydGllcykpIHtcbiAgICBjb25zdCBpbmZvID0gbmV3IERlZmluZWRJbmZvKFxuICAgICAgcHJvcGVydHksXG4gICAgICBkZWZpbml0aW9uLnRyYW5zZm9ybShkZWZpbml0aW9uLmF0dHJpYnV0ZXMgfHwge30sIHByb3BlcnR5KSxcbiAgICAgIHZhbHVlLFxuICAgICAgZGVmaW5pdGlvbi5zcGFjZVxuICAgIClcblxuICAgIGlmIChcbiAgICAgIGRlZmluaXRpb24ubXVzdFVzZVByb3BlcnR5ICYmXG4gICAgICBkZWZpbml0aW9uLm11c3RVc2VQcm9wZXJ0eS5pbmNsdWRlcyhwcm9wZXJ0eSlcbiAgICApIHtcbiAgICAgIGluZm8ubXVzdFVzZVByb3BlcnR5ID0gdHJ1ZVxuICAgIH1cblxuICAgIHByb3BlcnRpZXNbcHJvcGVydHldID0gaW5mb1xuXG4gICAgbm9ybWFsc1tub3JtYWxpemUocHJvcGVydHkpXSA9IHByb3BlcnR5XG4gICAgbm9ybWFsc1tub3JtYWxpemUoaW5mby5hdHRyaWJ1dGUpXSA9IHByb3BlcnR5XG4gIH1cblxuICByZXR1cm4gbmV3IFNjaGVtYShwcm9wZXJ0aWVzLCBub3JtYWxzLCBkZWZpbml0aW9uLnNwYWNlKVxufVxuIiwiaW1wb3J0IHtjcmVhdGV9IGZyb20gJy4vdXRpbC9jcmVhdGUuanMnXG5pbXBvcnQge2Jvb2xlYW5pc2gsIG51bWJlciwgc3BhY2VTZXBhcmF0ZWR9IGZyb20gJy4vdXRpbC90eXBlcy5qcydcblxuZXhwb3J0IGNvbnN0IGFyaWEgPSBjcmVhdGUoe1xuICBwcm9wZXJ0aWVzOiB7XG4gICAgYXJpYUFjdGl2ZURlc2NlbmRhbnQ6IG51bGwsXG4gICAgYXJpYUF0b21pYzogYm9vbGVhbmlzaCxcbiAgICBhcmlhQXV0b0NvbXBsZXRlOiBudWxsLFxuICAgIGFyaWFCdXN5OiBib29sZWFuaXNoLFxuICAgIGFyaWFDaGVja2VkOiBib29sZWFuaXNoLFxuICAgIGFyaWFDb2xDb3VudDogbnVtYmVyLFxuICAgIGFyaWFDb2xJbmRleDogbnVtYmVyLFxuICAgIGFyaWFDb2xTcGFuOiBudW1iZXIsXG4gICAgYXJpYUNvbnRyb2xzOiBzcGFjZVNlcGFyYXRlZCxcbiAgICBhcmlhQ3VycmVudDogbnVsbCxcbiAgICBhcmlhRGVzY3JpYmVkQnk6IHNwYWNlU2VwYXJhdGVkLFxuICAgIGFyaWFEZXRhaWxzOiBudWxsLFxuICAgIGFyaWFEaXNhYmxlZDogYm9vbGVhbmlzaCxcbiAgICBhcmlhRHJvcEVmZmVjdDogc3BhY2VTZXBhcmF0ZWQsXG4gICAgYXJpYUVycm9yTWVzc2FnZTogbnVsbCxcbiAgICBhcmlhRXhwYW5kZWQ6IGJvb2xlYW5pc2gsXG4gICAgYXJpYUZsb3dUbzogc3BhY2VTZXBhcmF0ZWQsXG4gICAgYXJpYUdyYWJiZWQ6IGJvb2xlYW5pc2gsXG4gICAgYXJpYUhhc1BvcHVwOiBudWxsLFxuICAgIGFyaWFIaWRkZW46IGJvb2xlYW5pc2gsXG4gICAgYXJpYUludmFsaWQ6IG51bGwsXG4gICAgYXJpYUtleVNob3J0Y3V0czogbnVsbCxcbiAgICBhcmlhTGFiZWw6IG51bGwsXG4gICAgYXJpYUxhYmVsbGVkQnk6IHNwYWNlU2VwYXJhdGVkLFxuICAgIGFyaWFMZXZlbDogbnVtYmVyLFxuICAgIGFyaWFMaXZlOiBudWxsLFxuICAgIGFyaWFNb2RhbDogYm9vbGVhbmlzaCxcbiAgICBhcmlhTXVsdGlMaW5lOiBib29sZWFuaXNoLFxuICAgIGFyaWFNdWx0aVNlbGVjdGFibGU6IGJvb2xlYW5pc2gsXG4gICAgYXJpYU9yaWVudGF0aW9uOiBudWxsLFxuICAgIGFyaWFPd25zOiBzcGFjZVNlcGFyYXRlZCxcbiAgICBhcmlhUGxhY2Vob2xkZXI6IG51bGwsXG4gICAgYXJpYVBvc0luU2V0OiBudW1iZXIsXG4gICAgYXJpYVByZXNzZWQ6IGJvb2xlYW5pc2gsXG4gICAgYXJpYVJlYWRPbmx5OiBib29sZWFuaXNoLFxuICAgIGFyaWFSZWxldmFudDogbnVsbCxcbiAgICBhcmlhUmVxdWlyZWQ6IGJvb2xlYW5pc2gsXG4gICAgYXJpYVJvbGVEZXNjcmlwdGlvbjogc3BhY2VTZXBhcmF0ZWQsXG4gICAgYXJpYVJvd0NvdW50OiBudW1iZXIsXG4gICAgYXJpYVJvd0luZGV4OiBudW1iZXIsXG4gICAgYXJpYVJvd1NwYW46IG51bWJlcixcbiAgICBhcmlhU2VsZWN0ZWQ6IGJvb2xlYW5pc2gsXG4gICAgYXJpYVNldFNpemU6IG51bWJlcixcbiAgICBhcmlhU29ydDogbnVsbCxcbiAgICBhcmlhVmFsdWVNYXg6IG51bWJlcixcbiAgICBhcmlhVmFsdWVNaW46IG51bWJlcixcbiAgICBhcmlhVmFsdWVOb3c6IG51bWJlcixcbiAgICBhcmlhVmFsdWVUZXh0OiBudWxsLFxuICAgIHJvbGU6IG51bGxcbiAgfSxcbiAgdHJhbnNmb3JtKF8sIHByb3BlcnR5KSB7XG4gICAgcmV0dXJuIHByb3BlcnR5ID09PSAncm9sZSdcbiAgICAgID8gcHJvcGVydHlcbiAgICAgIDogJ2FyaWEtJyArIHByb3BlcnR5LnNsaWNlKDQpLnRvTG93ZXJDYXNlKClcbiAgfVxufSlcbiIsIi8qKlxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+fSBhdHRyaWJ1dGVzXG4gKiAgIEF0dHJpYnV0ZXMuXG4gKiBAcGFyYW0ge3N0cmluZ30gYXR0cmlidXRlXG4gKiAgIEF0dHJpYnV0ZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiAgIFRyYW5zZm9ybWVkIGF0dHJpYnV0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhc2VTZW5zaXRpdmVUcmFuc2Zvcm0oYXR0cmlidXRlcywgYXR0cmlidXRlKSB7XG4gIHJldHVybiBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcyA/IGF0dHJpYnV0ZXNbYXR0cmlidXRlXSA6IGF0dHJpYnV0ZVxufVxuIiwiaW1wb3J0IHtjYXNlU2Vuc2l0aXZlVHJhbnNmb3JtfSBmcm9tICcuL2Nhc2Utc2Vuc2l0aXZlLXRyYW5zZm9ybS5qcydcblxuLyoqXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIHN0cmluZz59IGF0dHJpYnV0ZXNcbiAqICAgQXR0cmlidXRlcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eVxuICogICBQcm9wZXJ0eS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiAgIFRyYW5zZm9ybWVkIHByb3BlcnR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FzZUluc2Vuc2l0aXZlVHJhbnNmb3JtKGF0dHJpYnV0ZXMsIHByb3BlcnR5KSB7XG4gIHJldHVybiBjYXNlU2Vuc2l0aXZlVHJhbnNmb3JtKGF0dHJpYnV0ZXMsIHByb3BlcnR5LnRvTG93ZXJDYXNlKCkpXG59XG4iLCJpbXBvcnQge2Nhc2VJbnNlbnNpdGl2ZVRyYW5zZm9ybX0gZnJvbSAnLi91dGlsL2Nhc2UtaW5zZW5zaXRpdmUtdHJhbnNmb3JtLmpzJ1xuaW1wb3J0IHtjcmVhdGV9IGZyb20gJy4vdXRpbC9jcmVhdGUuanMnXG5pbXBvcnQge1xuICBib29sZWFuaXNoLFxuICBib29sZWFuLFxuICBjb21tYVNlcGFyYXRlZCxcbiAgbnVtYmVyLFxuICBvdmVybG9hZGVkQm9vbGVhbixcbiAgc3BhY2VTZXBhcmF0ZWRcbn0gZnJvbSAnLi91dGlsL3R5cGVzLmpzJ1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGNyZWF0ZSh7XG4gIGF0dHJpYnV0ZXM6IHtcbiAgICBhY2NlcHRjaGFyc2V0OiAnYWNjZXB0LWNoYXJzZXQnLFxuICAgIGNsYXNzbmFtZTogJ2NsYXNzJyxcbiAgICBodG1sZm9yOiAnZm9yJyxcbiAgICBodHRwZXF1aXY6ICdodHRwLWVxdWl2J1xuICB9LFxuICBtdXN0VXNlUHJvcGVydHk6IFsnY2hlY2tlZCcsICdtdWx0aXBsZScsICdtdXRlZCcsICdzZWxlY3RlZCddLFxuICBwcm9wZXJ0aWVzOiB7XG4gICAgLy8gU3RhbmRhcmQgUHJvcGVydGllcy5cbiAgICBhYmJyOiBudWxsLFxuICAgIGFjY2VwdDogY29tbWFTZXBhcmF0ZWQsXG4gICAgYWNjZXB0Q2hhcnNldDogc3BhY2VTZXBhcmF0ZWQsXG4gICAgYWNjZXNzS2V5OiBzcGFjZVNlcGFyYXRlZCxcbiAgICBhY3Rpb246IG51bGwsXG4gICAgYWxsb3c6IG51bGwsXG4gICAgYWxsb3dGdWxsU2NyZWVuOiBib29sZWFuLFxuICAgIGFsbG93UGF5bWVudFJlcXVlc3Q6IGJvb2xlYW4sXG4gICAgYWxsb3dVc2VyTWVkaWE6IGJvb2xlYW4sXG4gICAgYWxwaGE6IGJvb2xlYW4sXG4gICAgYWx0OiBudWxsLFxuICAgIGFzOiBudWxsLFxuICAgIGFzeW5jOiBib29sZWFuLFxuICAgIGF1dG9DYXBpdGFsaXplOiBudWxsLFxuICAgIGF1dG9Db21wbGV0ZTogc3BhY2VTZXBhcmF0ZWQsXG4gICAgYXV0b0ZvY3VzOiBib29sZWFuLFxuICAgIGF1dG9QbGF5OiBib29sZWFuLFxuICAgIGJsb2NraW5nOiBzcGFjZVNlcGFyYXRlZCxcbiAgICBjYXB0dXJlOiBudWxsLFxuICAgIGNoYXJTZXQ6IG51bGwsXG4gICAgY2hlY2tlZDogYm9vbGVhbixcbiAgICBjaXRlOiBudWxsLFxuICAgIGNsYXNzTmFtZTogc3BhY2VTZXBhcmF0ZWQsXG4gICAgY2xvc2VkQnk6IG51bGwsXG4gICAgY29sb3JTcGFjZTogbnVsbCxcbiAgICBjb2xzOiBudW1iZXIsXG4gICAgY29sU3BhbjogbnVtYmVyLFxuICAgIGNvbW1hbmQ6IG51bGwsXG4gICAgY29tbWFuZEZvcjogbnVsbCxcbiAgICBjb250ZW50OiBudWxsLFxuICAgIGNvbnRlbnRFZGl0YWJsZTogYm9vbGVhbmlzaCxcbiAgICBjb250cm9sczogYm9vbGVhbixcbiAgICBjb250cm9sc0xpc3Q6IHNwYWNlU2VwYXJhdGVkLFxuICAgIGNvb3JkczogbnVtYmVyIHwgY29tbWFTZXBhcmF0ZWQsXG4gICAgY3Jvc3NPcmlnaW46IG51bGwsXG4gICAgZGF0YTogbnVsbCxcbiAgICBkYXRlVGltZTogbnVsbCxcbiAgICBkZWNvZGluZzogbnVsbCxcbiAgICBkZWZhdWx0OiBib29sZWFuLFxuICAgIGRlZmVyOiBib29sZWFuLFxuICAgIGRpcjogbnVsbCxcbiAgICBkaXJOYW1lOiBudWxsLFxuICAgIGRpc2FibGVkOiBib29sZWFuLFxuICAgIGRvd25sb2FkOiBvdmVybG9hZGVkQm9vbGVhbixcbiAgICBkcmFnZ2FibGU6IGJvb2xlYW5pc2gsXG4gICAgZW5jVHlwZTogbnVsbCxcbiAgICBlbnRlcktleUhpbnQ6IG51bGwsXG4gICAgZmV0Y2hQcmlvcml0eTogbnVsbCxcbiAgICBmb3JtOiBudWxsLFxuICAgIGZvcm1BY3Rpb246IG51bGwsXG4gICAgZm9ybUVuY1R5cGU6IG51bGwsXG4gICAgZm9ybU1ldGhvZDogbnVsbCxcbiAgICBmb3JtTm9WYWxpZGF0ZTogYm9vbGVhbixcbiAgICBmb3JtVGFyZ2V0OiBudWxsLFxuICAgIGhlYWRlcnM6IHNwYWNlU2VwYXJhdGVkLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIGhpZGRlbjogb3ZlcmxvYWRlZEJvb2xlYW4sXG4gICAgaGlnaDogbnVtYmVyLFxuICAgIGhyZWY6IG51bGwsXG4gICAgaHJlZkxhbmc6IG51bGwsXG4gICAgaHRtbEZvcjogc3BhY2VTZXBhcmF0ZWQsXG4gICAgaHR0cEVxdWl2OiBzcGFjZVNlcGFyYXRlZCxcbiAgICBpZDogbnVsbCxcbiAgICBpbWFnZVNpemVzOiBudWxsLFxuICAgIGltYWdlU3JjU2V0OiBudWxsLFxuICAgIGluZXJ0OiBib29sZWFuLFxuICAgIGlucHV0TW9kZTogbnVsbCxcbiAgICBpbnRlZ3JpdHk6IG51bGwsXG4gICAgaXM6IG51bGwsXG4gICAgaXNNYXA6IGJvb2xlYW4sXG4gICAgaXRlbUlkOiBudWxsLFxuICAgIGl0ZW1Qcm9wOiBzcGFjZVNlcGFyYXRlZCxcbiAgICBpdGVtUmVmOiBzcGFjZVNlcGFyYXRlZCxcbiAgICBpdGVtU2NvcGU6IGJvb2xlYW4sXG4gICAgaXRlbVR5cGU6IHNwYWNlU2VwYXJhdGVkLFxuICAgIGtpbmQ6IG51bGwsXG4gICAgbGFiZWw6IG51bGwsXG4gICAgbGFuZzogbnVsbCxcbiAgICBsYW5ndWFnZTogbnVsbCxcbiAgICBsaXN0OiBudWxsLFxuICAgIGxvYWRpbmc6IG51bGwsXG4gICAgbG9vcDogYm9vbGVhbixcbiAgICBsb3c6IG51bWJlcixcbiAgICBtYW5pZmVzdDogbnVsbCxcbiAgICBtYXg6IG51bGwsXG4gICAgbWF4TGVuZ3RoOiBudW1iZXIsXG4gICAgbWVkaWE6IG51bGwsXG4gICAgbWV0aG9kOiBudWxsLFxuICAgIG1pbjogbnVsbCxcbiAgICBtaW5MZW5ndGg6IG51bWJlcixcbiAgICBtdWx0aXBsZTogYm9vbGVhbixcbiAgICBtdXRlZDogYm9vbGVhbixcbiAgICBuYW1lOiBudWxsLFxuICAgIG5vbmNlOiBudWxsLFxuICAgIG5vTW9kdWxlOiBib29sZWFuLFxuICAgIG5vVmFsaWRhdGU6IGJvb2xlYW4sXG4gICAgb25BYm9ydDogbnVsbCxcbiAgICBvbkFmdGVyUHJpbnQ6IG51bGwsXG4gICAgb25BdXhDbGljazogbnVsbCxcbiAgICBvbkJlZm9yZU1hdGNoOiBudWxsLFxuICAgIG9uQmVmb3JlUHJpbnQ6IG51bGwsXG4gICAgb25CZWZvcmVUb2dnbGU6IG51bGwsXG4gICAgb25CZWZvcmVVbmxvYWQ6IG51bGwsXG4gICAgb25CbHVyOiBudWxsLFxuICAgIG9uQ2FuY2VsOiBudWxsLFxuICAgIG9uQ2FuUGxheTogbnVsbCxcbiAgICBvbkNhblBsYXlUaHJvdWdoOiBudWxsLFxuICAgIG9uQ2hhbmdlOiBudWxsLFxuICAgIG9uQ2xpY2s6IG51bGwsXG4gICAgb25DbG9zZTogbnVsbCxcbiAgICBvbkNvbnRleHRMb3N0OiBudWxsLFxuICAgIG9uQ29udGV4dE1lbnU6IG51bGwsXG4gICAgb25Db250ZXh0UmVzdG9yZWQ6IG51bGwsXG4gICAgb25Db3B5OiBudWxsLFxuICAgIG9uQ3VlQ2hhbmdlOiBudWxsLFxuICAgIG9uQ3V0OiBudWxsLFxuICAgIG9uRGJsQ2xpY2s6IG51bGwsXG4gICAgb25EcmFnOiBudWxsLFxuICAgIG9uRHJhZ0VuZDogbnVsbCxcbiAgICBvbkRyYWdFbnRlcjogbnVsbCxcbiAgICBvbkRyYWdFeGl0OiBudWxsLFxuICAgIG9uRHJhZ0xlYXZlOiBudWxsLFxuICAgIG9uRHJhZ092ZXI6IG51bGwsXG4gICAgb25EcmFnU3RhcnQ6IG51bGwsXG4gICAgb25Ecm9wOiBudWxsLFxuICAgIG9uRHVyYXRpb25DaGFuZ2U6IG51bGwsXG4gICAgb25FbXB0aWVkOiBudWxsLFxuICAgIG9uRW5kZWQ6IG51bGwsXG4gICAgb25FcnJvcjogbnVsbCxcbiAgICBvbkZvY3VzOiBudWxsLFxuICAgIG9uRm9ybURhdGE6IG51bGwsXG4gICAgb25IYXNoQ2hhbmdlOiBudWxsLFxuICAgIG9uSW5wdXQ6IG51bGwsXG4gICAgb25JbnZhbGlkOiBudWxsLFxuICAgIG9uS2V5RG93bjogbnVsbCxcbiAgICBvbktleVByZXNzOiBudWxsLFxuICAgIG9uS2V5VXA6IG51bGwsXG4gICAgb25MYW5ndWFnZUNoYW5nZTogbnVsbCxcbiAgICBvbkxvYWQ6IG51bGwsXG4gICAgb25Mb2FkZWREYXRhOiBudWxsLFxuICAgIG9uTG9hZGVkTWV0YWRhdGE6IG51bGwsXG4gICAgb25Mb2FkRW5kOiBudWxsLFxuICAgIG9uTG9hZFN0YXJ0OiBudWxsLFxuICAgIG9uTWVzc2FnZTogbnVsbCxcbiAgICBvbk1lc3NhZ2VFcnJvcjogbnVsbCxcbiAgICBvbk1vdXNlRG93bjogbnVsbCxcbiAgICBvbk1vdXNlRW50ZXI6IG51bGwsXG4gICAgb25Nb3VzZUxlYXZlOiBudWxsLFxuICAgIG9uTW91c2VNb3ZlOiBudWxsLFxuICAgIG9uTW91c2VPdXQ6IG51bGwsXG4gICAgb25Nb3VzZU92ZXI6IG51bGwsXG4gICAgb25Nb3VzZVVwOiBudWxsLFxuICAgIG9uT2ZmbGluZTogbnVsbCxcbiAgICBvbk9ubGluZTogbnVsbCxcbiAgICBvblBhZ2VIaWRlOiBudWxsLFxuICAgIG9uUGFnZVNob3c6IG51bGwsXG4gICAgb25QYXN0ZTogbnVsbCxcbiAgICBvblBhdXNlOiBudWxsLFxuICAgIG9uUGxheTogbnVsbCxcbiAgICBvblBsYXlpbmc6IG51bGwsXG4gICAgb25Qb3BTdGF0ZTogbnVsbCxcbiAgICBvblByb2dyZXNzOiBudWxsLFxuICAgIG9uUmF0ZUNoYW5nZTogbnVsbCxcbiAgICBvblJlamVjdGlvbkhhbmRsZWQ6IG51bGwsXG4gICAgb25SZXNldDogbnVsbCxcbiAgICBvblJlc2l6ZTogbnVsbCxcbiAgICBvblNjcm9sbDogbnVsbCxcbiAgICBvblNjcm9sbEVuZDogbnVsbCxcbiAgICBvblNlY3VyaXR5UG9saWN5VmlvbGF0aW9uOiBudWxsLFxuICAgIG9uU2Vla2VkOiBudWxsLFxuICAgIG9uU2Vla2luZzogbnVsbCxcbiAgICBvblNlbGVjdDogbnVsbCxcbiAgICBvblNsb3RDaGFuZ2U6IG51bGwsXG4gICAgb25TdGFsbGVkOiBudWxsLFxuICAgIG9uU3RvcmFnZTogbnVsbCxcbiAgICBvblN1Ym1pdDogbnVsbCxcbiAgICBvblN1c3BlbmQ6IG51bGwsXG4gICAgb25UaW1lVXBkYXRlOiBudWxsLFxuICAgIG9uVG9nZ2xlOiBudWxsLFxuICAgIG9uVW5oYW5kbGVkUmVqZWN0aW9uOiBudWxsLFxuICAgIG9uVW5sb2FkOiBudWxsLFxuICAgIG9uVm9sdW1lQ2hhbmdlOiBudWxsLFxuICAgIG9uV2FpdGluZzogbnVsbCxcbiAgICBvbldoZWVsOiBudWxsLFxuICAgIG9wZW46IGJvb2xlYW4sXG4gICAgb3B0aW11bTogbnVtYmVyLFxuICAgIHBhdHRlcm46IG51bGwsXG4gICAgcGluZzogc3BhY2VTZXBhcmF0ZWQsXG4gICAgcGxhY2Vob2xkZXI6IG51bGwsXG4gICAgcGxheXNJbmxpbmU6IGJvb2xlYW4sXG4gICAgcG9wb3ZlcjogbnVsbCxcbiAgICBwb3BvdmVyVGFyZ2V0OiBudWxsLFxuICAgIHBvcG92ZXJUYXJnZXRBY3Rpb246IG51bGwsXG4gICAgcG9zdGVyOiBudWxsLFxuICAgIHByZWxvYWQ6IG51bGwsXG4gICAgcmVhZE9ubHk6IGJvb2xlYW4sXG4gICAgcmVmZXJyZXJQb2xpY3k6IG51bGwsXG4gICAgcmVsOiBzcGFjZVNlcGFyYXRlZCxcbiAgICByZXF1aXJlZDogYm9vbGVhbixcbiAgICByZXZlcnNlZDogYm9vbGVhbixcbiAgICByb3dzOiBudW1iZXIsXG4gICAgcm93U3BhbjogbnVtYmVyLFxuICAgIHNhbmRib3g6IHNwYWNlU2VwYXJhdGVkLFxuICAgIHNjb3BlOiBudWxsLFxuICAgIHNjb3BlZDogYm9vbGVhbixcbiAgICBzZWFtbGVzczogYm9vbGVhbixcbiAgICBzZWxlY3RlZDogYm9vbGVhbixcbiAgICBzaGFkb3dSb290Q2xvbmFibGU6IGJvb2xlYW4sXG4gICAgc2hhZG93Um9vdEN1c3RvbUVsZW1lbnRSZWdpc3RyeTogYm9vbGVhbixcbiAgICBzaGFkb3dSb290RGVsZWdhdGVzRm9jdXM6IGJvb2xlYW4sXG4gICAgc2hhZG93Um9vdE1vZGU6IG51bGwsXG4gICAgc2hhZG93Um9vdFNlcmlhbGl6YWJsZTogYm9vbGVhbixcbiAgICBzaGFwZTogbnVsbCxcbiAgICBzaXplOiBudW1iZXIsXG4gICAgc2l6ZXM6IG51bGwsXG4gICAgc2xvdDogbnVsbCxcbiAgICBzcGFuOiBudW1iZXIsXG4gICAgc3BlbGxDaGVjazogYm9vbGVhbmlzaCxcbiAgICBzcmM6IG51bGwsXG4gICAgc3JjRG9jOiBudWxsLFxuICAgIHNyY0xhbmc6IG51bGwsXG4gICAgc3JjU2V0OiBudWxsLFxuICAgIHN0YXJ0OiBudW1iZXIsXG4gICAgc3RlcDogbnVsbCxcbiAgICBzdHlsZTogbnVsbCxcbiAgICB0YWJJbmRleDogbnVtYmVyLFxuICAgIHRhcmdldDogbnVsbCxcbiAgICB0aXRsZTogbnVsbCxcbiAgICB0cmFuc2xhdGU6IG51bGwsXG4gICAgdHlwZTogbnVsbCxcbiAgICB0eXBlTXVzdE1hdGNoOiBib29sZWFuLFxuICAgIHVzZU1hcDogbnVsbCxcbiAgICB2YWx1ZTogYm9vbGVhbmlzaCxcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIHdyYXA6IG51bGwsXG4gICAgd3JpdGluZ1N1Z2dlc3Rpb25zOiBudWxsLFxuXG4gICAgLy8gTGVnYWN5LlxuICAgIC8vIFNlZTogaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy8jb3RoZXItZWxlbWVudHMsLWF0dHJpYnV0ZXMtYW5kLWFwaXNcbiAgICBhbGlnbjogbnVsbCwgLy8gU2V2ZXJhbC4gVXNlIENTUyBgdGV4dC1hbGlnbmAgaW5zdGVhZCxcbiAgICBhTGluazogbnVsbCwgLy8gYDxib2R5PmAuIFVzZSBDU1MgYGE6YWN0aXZlIHtjb2xvcn1gIGluc3RlYWRcbiAgICBhcmNoaXZlOiBzcGFjZVNlcGFyYXRlZCwgLy8gYDxvYmplY3Q+YC4gTGlzdCBvZiBVUklzIHRvIGFyY2hpdmVzXG4gICAgYXhpczogbnVsbCwgLy8gYDx0ZD5gIGFuZCBgPHRoPmAuIFVzZSBgc2NvcGVgIG9uIGA8dGg+YFxuICAgIGJhY2tncm91bmQ6IG51bGwsIC8vIGA8Ym9keT5gLiBVc2UgQ1NTIGBiYWNrZ3JvdW5kLWltYWdlYCBpbnN0ZWFkXG4gICAgYmdDb2xvcjogbnVsbCwgLy8gYDxib2R5PmAgYW5kIHRhYmxlIGVsZW1lbnRzLiBVc2UgQ1NTIGBiYWNrZ3JvdW5kLWNvbG9yYCBpbnN0ZWFkXG4gICAgYm9yZGVyOiBudW1iZXIsIC8vIGA8dGFibGU+YC4gVXNlIENTUyBgYm9yZGVyLXdpZHRoYCBpbnN0ZWFkLFxuICAgIGJvcmRlckNvbG9yOiBudWxsLCAvLyBgPHRhYmxlPmAuIFVzZSBDU1MgYGJvcmRlci1jb2xvcmAgaW5zdGVhZCxcbiAgICBib3R0b21NYXJnaW46IG51bWJlciwgLy8gYDxib2R5PmBcbiAgICBjZWxsUGFkZGluZzogbnVsbCwgLy8gYDx0YWJsZT5gXG4gICAgY2VsbFNwYWNpbmc6IG51bGwsIC8vIGA8dGFibGU+YFxuICAgIGNoYXI6IG51bGwsIC8vIFNldmVyYWwgdGFibGUgZWxlbWVudHMuIFdoZW4gYGFsaWduPWNoYXJgLCBzZXRzIHRoZSBjaGFyYWN0ZXIgdG8gYWxpZ24gb25cbiAgICBjaGFyT2ZmOiBudWxsLCAvLyBTZXZlcmFsIHRhYmxlIGVsZW1lbnRzLiBXaGVuIGBjaGFyYCwgb2Zmc2V0cyB0aGUgYWxpZ25tZW50XG4gICAgY2xhc3NJZDogbnVsbCwgLy8gYDxvYmplY3Q+YFxuICAgIGNsZWFyOiBudWxsLCAvLyBgPGJyPmAuIFVzZSBDU1MgYGNsZWFyYCBpbnN0ZWFkXG4gICAgY29kZTogbnVsbCwgLy8gYDxvYmplY3Q+YFxuICAgIGNvZGVCYXNlOiBudWxsLCAvLyBgPG9iamVjdD5gXG4gICAgY29kZVR5cGU6IG51bGwsIC8vIGA8b2JqZWN0PmBcbiAgICBjb2xvcjogbnVsbCwgLy8gYDxmb250PmAgYW5kIGA8aHI+YC4gVXNlIENTUyBpbnN0ZWFkXG4gICAgY29tcGFjdDogYm9vbGVhbiwgLy8gTGlzdHMuIFVzZSBDU1MgdG8gcmVkdWNlIHNwYWNlIGJldHdlZW4gaXRlbXMgaW5zdGVhZFxuICAgIGRlY2xhcmU6IGJvb2xlYW4sIC8vIGA8b2JqZWN0PmBcbiAgICBldmVudDogbnVsbCwgLy8gYDxzY3JpcHQ+YFxuICAgIGZhY2U6IG51bGwsIC8vIGA8Zm9udD5gLiBVc2UgQ1NTIGluc3RlYWRcbiAgICBmcmFtZTogbnVsbCwgLy8gYDx0YWJsZT5gXG4gICAgZnJhbWVCb3JkZXI6IG51bGwsIC8vIGA8aWZyYW1lPmAuIFVzZSBDU1MgYGJvcmRlcmAgaW5zdGVhZFxuICAgIGhTcGFjZTogbnVtYmVyLCAvLyBgPGltZz5gIGFuZCBgPG9iamVjdD5gXG4gICAgbGVmdE1hcmdpbjogbnVtYmVyLCAvLyBgPGJvZHk+YFxuICAgIGxpbms6IG51bGwsIC8vIGA8Ym9keT5gLiBVc2UgQ1NTIGBhOmxpbmsge2NvbG9yOiAqfWAgaW5zdGVhZFxuICAgIGxvbmdEZXNjOiBudWxsLCAvLyBgPGZyYW1lPmAsIGA8aWZyYW1lPmAsIGFuZCBgPGltZz5gLiBVc2UgYW4gYDxhPmBcbiAgICBsb3dTcmM6IG51bGwsIC8vIGA8aW1nPmAuIFVzZSBhIGA8cGljdHVyZT5gXG4gICAgbWFyZ2luSGVpZ2h0OiBudW1iZXIsIC8vIGA8Ym9keT5gXG4gICAgbWFyZ2luV2lkdGg6IG51bWJlciwgLy8gYDxib2R5PmBcbiAgICBub1Jlc2l6ZTogYm9vbGVhbiwgLy8gYDxmcmFtZT5gXG4gICAgbm9IcmVmOiBib29sZWFuLCAvLyBgPGFyZWE+YC4gVXNlIG5vIGhyZWYgaW5zdGVhZCBvZiBhbiBleHBsaWNpdCBgbm9ocmVmYFxuICAgIG5vU2hhZGU6IGJvb2xlYW4sIC8vIGA8aHI+YC4gVXNlIGJhY2tncm91bmQtY29sb3IgYW5kIGhlaWdodCBpbnN0ZWFkIG9mIGJvcmRlcnNcbiAgICBub1dyYXA6IGJvb2xlYW4sIC8vIGA8dGQ+YCBhbmQgYDx0aD5gXG4gICAgb2JqZWN0OiBudWxsLCAvLyBgPGFwcGxldD5gXG4gICAgcHJvZmlsZTogbnVsbCwgLy8gYDxoZWFkPmBcbiAgICBwcm9tcHQ6IG51bGwsIC8vIGA8aXNpbmRleD5gXG4gICAgcmV2OiBudWxsLCAvLyBgPGxpbms+YFxuICAgIHJpZ2h0TWFyZ2luOiBudW1iZXIsIC8vIGA8Ym9keT5gXG4gICAgcnVsZXM6IG51bGwsIC8vIGA8dGFibGU+YFxuICAgIHNjaGVtZTogbnVsbCwgLy8gYDxtZXRhPmBcbiAgICBzY3JvbGxpbmc6IGJvb2xlYW5pc2gsIC8vIGA8ZnJhbWU+YC4gVXNlIG92ZXJmbG93IGluIHRoZSBjaGlsZCBjb250ZXh0XG4gICAgc3RhbmRieTogbnVsbCwgLy8gYDxvYmplY3Q+YFxuICAgIHN1bW1hcnk6IG51bGwsIC8vIGA8dGFibGU+YFxuICAgIHRleHQ6IG51bGwsIC8vIGA8Ym9keT5gLiBVc2UgQ1NTIGBjb2xvcmAgaW5zdGVhZFxuICAgIHRvcE1hcmdpbjogbnVtYmVyLCAvLyBgPGJvZHk+YFxuICAgIHZhbHVlVHlwZTogbnVsbCwgLy8gYDxwYXJhbT5gXG4gICAgdmVyc2lvbjogbnVsbCwgLy8gYDxodG1sPmAuIFVzZSBhIGRvY3R5cGUuXG4gICAgdkFsaWduOiBudWxsLCAvLyBTZXZlcmFsLiBVc2UgQ1NTIGB2ZXJ0aWNhbC1hbGlnbmAgaW5zdGVhZFxuICAgIHZMaW5rOiBudWxsLCAvLyBgPGJvZHk+YC4gVXNlIENTUyBgYTp2aXNpdGVkIHtjb2xvcn1gIGluc3RlYWRcbiAgICB2U3BhY2U6IG51bWJlciwgLy8gYDxpbWc+YCBhbmQgYDxvYmplY3Q+YFxuXG4gICAgLy8gTm9uLXN0YW5kYXJkIFByb3BlcnRpZXMuXG4gICAgYWxsb3dUcmFuc3BhcmVuY3k6IG51bGwsXG4gICAgYXV0b0NvcnJlY3Q6IG51bGwsXG4gICAgYXV0b1NhdmU6IG51bGwsXG4gICAgY3JlZGVudGlhbGxlc3M6IGJvb2xlYW4sXG4gICAgZGlzYWJsZVBpY3R1cmVJblBpY3R1cmU6IGJvb2xlYW4sXG4gICAgZGlzYWJsZVJlbW90ZVBsYXliYWNrOiBib29sZWFuLFxuICAgIGV4cG9ydFBhcnRzOiBjb21tYVNlcGFyYXRlZCxcbiAgICBwYXJ0OiBzcGFjZVNlcGFyYXRlZCxcbiAgICBwcmVmaXg6IG51bGwsXG4gICAgcHJvcGVydHk6IG51bGwsXG4gICAgcmVzdWx0czogbnVtYmVyLFxuICAgIHNlY3VyaXR5OiBudWxsLFxuICAgIHVuc2VsZWN0YWJsZTogbnVsbFxuICB9LFxuICBzcGFjZTogJ2h0bWwnLFxuICB0cmFuc2Zvcm06IGNhc2VJbnNlbnNpdGl2ZVRyYW5zZm9ybVxufSlcbiIsImltcG9ydCB7Y2FzZVNlbnNpdGl2ZVRyYW5zZm9ybX0gZnJvbSAnLi91dGlsL2Nhc2Utc2Vuc2l0aXZlLXRyYW5zZm9ybS5qcydcbmltcG9ydCB7Y3JlYXRlfSBmcm9tICcuL3V0aWwvY3JlYXRlLmpzJ1xuaW1wb3J0IHtcbiAgYm9vbGVhbixcbiAgY29tbWFPclNwYWNlU2VwYXJhdGVkLFxuICBjb21tYVNlcGFyYXRlZCxcbiAgbnVtYmVyLFxuICBzcGFjZVNlcGFyYXRlZFxufSBmcm9tICcuL3V0aWwvdHlwZXMuanMnXG5cbmV4cG9ydCBjb25zdCBzdmcgPSBjcmVhdGUoe1xuICBhdHRyaWJ1dGVzOiB7XG4gICAgYWNjZW50SGVpZ2h0OiAnYWNjZW50LWhlaWdodCcsXG4gICAgYWxpZ25tZW50QmFzZWxpbmU6ICdhbGlnbm1lbnQtYmFzZWxpbmUnLFxuICAgIGFyYWJpY0Zvcm06ICdhcmFiaWMtZm9ybScsXG4gICAgYmFzZWxpbmVTaGlmdDogJ2Jhc2VsaW5lLXNoaWZ0JyxcbiAgICBjYXBIZWlnaHQ6ICdjYXAtaGVpZ2h0JyxcbiAgICBjbGFzc05hbWU6ICdjbGFzcycsXG4gICAgY2xpcFBhdGg6ICdjbGlwLXBhdGgnLFxuICAgIGNsaXBSdWxlOiAnY2xpcC1ydWxlJyxcbiAgICBjb2xvckludGVycG9sYXRpb246ICdjb2xvci1pbnRlcnBvbGF0aW9uJyxcbiAgICBjb2xvckludGVycG9sYXRpb25GaWx0ZXJzOiAnY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzJyxcbiAgICBjb2xvclByb2ZpbGU6ICdjb2xvci1wcm9maWxlJyxcbiAgICBjb2xvclJlbmRlcmluZzogJ2NvbG9yLXJlbmRlcmluZycsXG4gICAgY3Jvc3NPcmlnaW46ICdjcm9zc29yaWdpbicsXG4gICAgZGF0YVR5cGU6ICdkYXRhdHlwZScsXG4gICAgZG9taW5hbnRCYXNlbGluZTogJ2RvbWluYW50LWJhc2VsaW5lJyxcbiAgICBlbmFibGVCYWNrZ3JvdW5kOiAnZW5hYmxlLWJhY2tncm91bmQnLFxuICAgIGZpbGxPcGFjaXR5OiAnZmlsbC1vcGFjaXR5JyxcbiAgICBmaWxsUnVsZTogJ2ZpbGwtcnVsZScsXG4gICAgZmxvb2RDb2xvcjogJ2Zsb29kLWNvbG9yJyxcbiAgICBmbG9vZE9wYWNpdHk6ICdmbG9vZC1vcGFjaXR5JyxcbiAgICBmb250RmFtaWx5OiAnZm9udC1mYW1pbHknLFxuICAgIGZvbnRTaXplOiAnZm9udC1zaXplJyxcbiAgICBmb250U2l6ZUFkanVzdDogJ2ZvbnQtc2l6ZS1hZGp1c3QnLFxuICAgIGZvbnRTdHJldGNoOiAnZm9udC1zdHJldGNoJyxcbiAgICBmb250U3R5bGU6ICdmb250LXN0eWxlJyxcbiAgICBmb250VmFyaWFudDogJ2ZvbnQtdmFyaWFudCcsXG4gICAgZm9udFdlaWdodDogJ2ZvbnQtd2VpZ2h0JyxcbiAgICBnbHlwaE5hbWU6ICdnbHlwaC1uYW1lJyxcbiAgICBnbHlwaE9yaWVudGF0aW9uSG9yaXpvbnRhbDogJ2dseXBoLW9yaWVudGF0aW9uLWhvcml6b250YWwnLFxuICAgIGdseXBoT3JpZW50YXRpb25WZXJ0aWNhbDogJ2dseXBoLW9yaWVudGF0aW9uLXZlcnRpY2FsJyxcbiAgICBocmVmTGFuZzogJ2hyZWZsYW5nJyxcbiAgICBob3JpekFkdlg6ICdob3Jpei1hZHYteCcsXG4gICAgaG9yaXpPcmlnaW5YOiAnaG9yaXotb3JpZ2luLXgnLFxuICAgIGhvcml6T3JpZ2luWTogJ2hvcml6LW9yaWdpbi15JyxcbiAgICBpbWFnZVJlbmRlcmluZzogJ2ltYWdlLXJlbmRlcmluZycsXG4gICAgbGV0dGVyU3BhY2luZzogJ2xldHRlci1zcGFjaW5nJyxcbiAgICBsaWdodGluZ0NvbG9yOiAnbGlnaHRpbmctY29sb3InLFxuICAgIG1hcmtlckVuZDogJ21hcmtlci1lbmQnLFxuICAgIG1hcmtlck1pZDogJ21hcmtlci1taWQnLFxuICAgIG1hcmtlclN0YXJ0OiAnbWFya2VyLXN0YXJ0JyxcbiAgICBtYXNrVHlwZTogJ21hc2stdHlwZScsXG4gICAgbmF2RG93bjogJ25hdi1kb3duJyxcbiAgICBuYXZEb3duTGVmdDogJ25hdi1kb3duLWxlZnQnLFxuICAgIG5hdkRvd25SaWdodDogJ25hdi1kb3duLXJpZ2h0JyxcbiAgICBuYXZMZWZ0OiAnbmF2LWxlZnQnLFxuICAgIG5hdk5leHQ6ICduYXYtbmV4dCcsXG4gICAgbmF2UHJldjogJ25hdi1wcmV2JyxcbiAgICBuYXZSaWdodDogJ25hdi1yaWdodCcsXG4gICAgbmF2VXA6ICduYXYtdXAnLFxuICAgIG5hdlVwTGVmdDogJ25hdi11cC1sZWZ0JyxcbiAgICBuYXZVcFJpZ2h0OiAnbmF2LXVwLXJpZ2h0JyxcbiAgICBvbkFib3J0OiAnb25hYm9ydCcsXG4gICAgb25BY3RpdmF0ZTogJ29uYWN0aXZhdGUnLFxuICAgIG9uQWZ0ZXJQcmludDogJ29uYWZ0ZXJwcmludCcsXG4gICAgb25CZWZvcmVQcmludDogJ29uYmVmb3JlcHJpbnQnLFxuICAgIG9uQmVnaW46ICdvbmJlZ2luJyxcbiAgICBvbkNhbmNlbDogJ29uY2FuY2VsJyxcbiAgICBvbkNhblBsYXk6ICdvbmNhbnBsYXknLFxuICAgIG9uQ2FuUGxheVRocm91Z2g6ICdvbmNhbnBsYXl0aHJvdWdoJyxcbiAgICBvbkNoYW5nZTogJ29uY2hhbmdlJyxcbiAgICBvbkNsaWNrOiAnb25jbGljaycsXG4gICAgb25DbG9zZTogJ29uY2xvc2UnLFxuICAgIG9uQ29weTogJ29uY29weScsXG4gICAgb25DdWVDaGFuZ2U6ICdvbmN1ZWNoYW5nZScsXG4gICAgb25DdXQ6ICdvbmN1dCcsXG4gICAgb25EYmxDbGljazogJ29uZGJsY2xpY2snLFxuICAgIG9uRHJhZzogJ29uZHJhZycsXG4gICAgb25EcmFnRW5kOiAnb25kcmFnZW5kJyxcbiAgICBvbkRyYWdFbnRlcjogJ29uZHJhZ2VudGVyJyxcbiAgICBvbkRyYWdFeGl0OiAnb25kcmFnZXhpdCcsXG4gICAgb25EcmFnTGVhdmU6ICdvbmRyYWdsZWF2ZScsXG4gICAgb25EcmFnT3ZlcjogJ29uZHJhZ292ZXInLFxuICAgIG9uRHJhZ1N0YXJ0OiAnb25kcmFnc3RhcnQnLFxuICAgIG9uRHJvcDogJ29uZHJvcCcsXG4gICAgb25EdXJhdGlvbkNoYW5nZTogJ29uZHVyYXRpb25jaGFuZ2UnLFxuICAgIG9uRW1wdGllZDogJ29uZW1wdGllZCcsXG4gICAgb25FbmQ6ICdvbmVuZCcsXG4gICAgb25FbmRlZDogJ29uZW5kZWQnLFxuICAgIG9uRXJyb3I6ICdvbmVycm9yJyxcbiAgICBvbkZvY3VzOiAnb25mb2N1cycsXG4gICAgb25Gb2N1c0luOiAnb25mb2N1c2luJyxcbiAgICBvbkZvY3VzT3V0OiAnb25mb2N1c291dCcsXG4gICAgb25IYXNoQ2hhbmdlOiAnb25oYXNoY2hhbmdlJyxcbiAgICBvbklucHV0OiAnb25pbnB1dCcsXG4gICAgb25JbnZhbGlkOiAnb25pbnZhbGlkJyxcbiAgICBvbktleURvd246ICdvbmtleWRvd24nLFxuICAgIG9uS2V5UHJlc3M6ICdvbmtleXByZXNzJyxcbiAgICBvbktleVVwOiAnb25rZXl1cCcsXG4gICAgb25Mb2FkOiAnb25sb2FkJyxcbiAgICBvbkxvYWRlZERhdGE6ICdvbmxvYWRlZGRhdGEnLFxuICAgIG9uTG9hZGVkTWV0YWRhdGE6ICdvbmxvYWRlZG1ldGFkYXRhJyxcbiAgICBvbkxvYWRTdGFydDogJ29ubG9hZHN0YXJ0JyxcbiAgICBvbk1lc3NhZ2U6ICdvbm1lc3NhZ2UnLFxuICAgIG9uTW91c2VEb3duOiAnb25tb3VzZWRvd24nLFxuICAgIG9uTW91c2VFbnRlcjogJ29ubW91c2VlbnRlcicsXG4gICAgb25Nb3VzZUxlYXZlOiAnb25tb3VzZWxlYXZlJyxcbiAgICBvbk1vdXNlTW92ZTogJ29ubW91c2Vtb3ZlJyxcbiAgICBvbk1vdXNlT3V0OiAnb25tb3VzZW91dCcsXG4gICAgb25Nb3VzZU92ZXI6ICdvbm1vdXNlb3ZlcicsXG4gICAgb25Nb3VzZVVwOiAnb25tb3VzZXVwJyxcbiAgICBvbk1vdXNlV2hlZWw6ICdvbm1vdXNld2hlZWwnLFxuICAgIG9uT2ZmbGluZTogJ29ub2ZmbGluZScsXG4gICAgb25PbmxpbmU6ICdvbm9ubGluZScsXG4gICAgb25QYWdlSGlkZTogJ29ucGFnZWhpZGUnLFxuICAgIG9uUGFnZVNob3c6ICdvbnBhZ2VzaG93JyxcbiAgICBvblBhc3RlOiAnb25wYXN0ZScsXG4gICAgb25QYXVzZTogJ29ucGF1c2UnLFxuICAgIG9uUGxheTogJ29ucGxheScsXG4gICAgb25QbGF5aW5nOiAnb25wbGF5aW5nJyxcbiAgICBvblBvcFN0YXRlOiAnb25wb3BzdGF0ZScsXG4gICAgb25Qcm9ncmVzczogJ29ucHJvZ3Jlc3MnLFxuICAgIG9uUmF0ZUNoYW5nZTogJ29ucmF0ZWNoYW5nZScsXG4gICAgb25SZXBlYXQ6ICdvbnJlcGVhdCcsXG4gICAgb25SZXNldDogJ29ucmVzZXQnLFxuICAgIG9uUmVzaXplOiAnb25yZXNpemUnLFxuICAgIG9uU2Nyb2xsOiAnb25zY3JvbGwnLFxuICAgIG9uU2Vla2VkOiAnb25zZWVrZWQnLFxuICAgIG9uU2Vla2luZzogJ29uc2Vla2luZycsXG4gICAgb25TZWxlY3Q6ICdvbnNlbGVjdCcsXG4gICAgb25TaG93OiAnb25zaG93JyxcbiAgICBvblN0YWxsZWQ6ICdvbnN0YWxsZWQnLFxuICAgIG9uU3RvcmFnZTogJ29uc3RvcmFnZScsXG4gICAgb25TdWJtaXQ6ICdvbnN1Ym1pdCcsXG4gICAgb25TdXNwZW5kOiAnb25zdXNwZW5kJyxcbiAgICBvblRpbWVVcGRhdGU6ICdvbnRpbWV1cGRhdGUnLFxuICAgIG9uVG9nZ2xlOiAnb250b2dnbGUnLFxuICAgIG9uVW5sb2FkOiAnb251bmxvYWQnLFxuICAgIG9uVm9sdW1lQ2hhbmdlOiAnb252b2x1bWVjaGFuZ2UnLFxuICAgIG9uV2FpdGluZzogJ29ud2FpdGluZycsXG4gICAgb25ab29tOiAnb256b29tJyxcbiAgICBvdmVybGluZVBvc2l0aW9uOiAnb3ZlcmxpbmUtcG9zaXRpb24nLFxuICAgIG92ZXJsaW5lVGhpY2tuZXNzOiAnb3ZlcmxpbmUtdGhpY2tuZXNzJyxcbiAgICBwYWludE9yZGVyOiAncGFpbnQtb3JkZXInLFxuICAgIHBhbm9zZTE6ICdwYW5vc2UtMScsXG4gICAgcG9pbnRlckV2ZW50czogJ3BvaW50ZXItZXZlbnRzJyxcbiAgICByZWZlcnJlclBvbGljeTogJ3JlZmVycmVycG9saWN5JyxcbiAgICByZW5kZXJpbmdJbnRlbnQ6ICdyZW5kZXJpbmctaW50ZW50JyxcbiAgICBzaGFwZVJlbmRlcmluZzogJ3NoYXBlLXJlbmRlcmluZycsXG4gICAgc3RvcENvbG9yOiAnc3RvcC1jb2xvcicsXG4gICAgc3RvcE9wYWNpdHk6ICdzdG9wLW9wYWNpdHknLFxuICAgIHN0cmlrZXRocm91Z2hQb3NpdGlvbjogJ3N0cmlrZXRocm91Z2gtcG9zaXRpb24nLFxuICAgIHN0cmlrZXRocm91Z2hUaGlja25lc3M6ICdzdHJpa2V0aHJvdWdoLXRoaWNrbmVzcycsXG4gICAgc3Ryb2tlRGFzaEFycmF5OiAnc3Ryb2tlLWRhc2hhcnJheScsXG4gICAgc3Ryb2tlRGFzaE9mZnNldDogJ3N0cm9rZS1kYXNob2Zmc2V0JyxcbiAgICBzdHJva2VMaW5lQ2FwOiAnc3Ryb2tlLWxpbmVjYXAnLFxuICAgIHN0cm9rZUxpbmVKb2luOiAnc3Ryb2tlLWxpbmVqb2luJyxcbiAgICBzdHJva2VNaXRlckxpbWl0OiAnc3Ryb2tlLW1pdGVybGltaXQnLFxuICAgIHN0cm9rZU9wYWNpdHk6ICdzdHJva2Utb3BhY2l0eScsXG4gICAgc3Ryb2tlV2lkdGg6ICdzdHJva2Utd2lkdGgnLFxuICAgIHRhYkluZGV4OiAndGFiaW5kZXgnLFxuICAgIHRleHRBbmNob3I6ICd0ZXh0LWFuY2hvcicsXG4gICAgdGV4dERlY29yYXRpb246ICd0ZXh0LWRlY29yYXRpb24nLFxuICAgIHRleHRSZW5kZXJpbmc6ICd0ZXh0LXJlbmRlcmluZycsXG4gICAgdHJhbnNmb3JtT3JpZ2luOiAndHJhbnNmb3JtLW9yaWdpbicsXG4gICAgdHlwZU9mOiAndHlwZW9mJyxcbiAgICB1bmRlcmxpbmVQb3NpdGlvbjogJ3VuZGVybGluZS1wb3NpdGlvbicsXG4gICAgdW5kZXJsaW5lVGhpY2tuZXNzOiAndW5kZXJsaW5lLXRoaWNrbmVzcycsXG4gICAgdW5pY29kZUJpZGk6ICd1bmljb2RlLWJpZGknLFxuICAgIHVuaWNvZGVSYW5nZTogJ3VuaWNvZGUtcmFuZ2UnLFxuICAgIHVuaXRzUGVyRW06ICd1bml0cy1wZXItZW0nLFxuICAgIHZBbHBoYWJldGljOiAndi1hbHBoYWJldGljJyxcbiAgICB2SGFuZ2luZzogJ3YtaGFuZ2luZycsXG4gICAgdklkZW9ncmFwaGljOiAndi1pZGVvZ3JhcGhpYycsXG4gICAgdk1hdGhlbWF0aWNhbDogJ3YtbWF0aGVtYXRpY2FsJyxcbiAgICB2ZWN0b3JFZmZlY3Q6ICd2ZWN0b3ItZWZmZWN0JyxcbiAgICB2ZXJ0QWR2WTogJ3ZlcnQtYWR2LXknLFxuICAgIHZlcnRPcmlnaW5YOiAndmVydC1vcmlnaW4teCcsXG4gICAgdmVydE9yaWdpblk6ICd2ZXJ0LW9yaWdpbi15JyxcbiAgICB3b3JkU3BhY2luZzogJ3dvcmQtc3BhY2luZycsXG4gICAgd3JpdGluZ01vZGU6ICd3cml0aW5nLW1vZGUnLFxuICAgIHhIZWlnaHQ6ICd4LWhlaWdodCcsXG4gICAgLy8gVGhlc2Ugd2VyZSBjYW1lbGNhc2VkIGluIFRpbnkuIE5vdyBsb3dlcmNhc2VkIGluIFNWRyAyXG4gICAgcGxheWJhY2tPcmRlcjogJ3BsYXliYWNrb3JkZXInLFxuICAgIHRpbWVsaW5lQmVnaW46ICd0aW1lbGluZWJlZ2luJ1xuICB9LFxuICBwcm9wZXJ0aWVzOiB7XG4gICAgYWJvdXQ6IGNvbW1hT3JTcGFjZVNlcGFyYXRlZCxcbiAgICBhY2NlbnRIZWlnaHQ6IG51bWJlcixcbiAgICBhY2N1bXVsYXRlOiBudWxsLFxuICAgIGFkZGl0aXZlOiBudWxsLFxuICAgIGFsaWdubWVudEJhc2VsaW5lOiBudWxsLFxuICAgIGFscGhhYmV0aWM6IG51bWJlcixcbiAgICBhbXBsaXR1ZGU6IG51bWJlcixcbiAgICBhcmFiaWNGb3JtOiBudWxsLFxuICAgIGFzY2VudDogbnVtYmVyLFxuICAgIGF0dHJpYnV0ZU5hbWU6IG51bGwsXG4gICAgYXR0cmlidXRlVHlwZTogbnVsbCxcbiAgICBhemltdXRoOiBudW1iZXIsXG4gICAgYmFuZHdpZHRoOiBudWxsLFxuICAgIGJhc2VsaW5lU2hpZnQ6IG51bGwsXG4gICAgYmFzZUZyZXF1ZW5jeTogbnVsbCxcbiAgICBiYXNlUHJvZmlsZTogbnVsbCxcbiAgICBiYm94OiBudWxsLFxuICAgIGJlZ2luOiBudWxsLFxuICAgIGJpYXM6IG51bWJlcixcbiAgICBieTogbnVsbCxcbiAgICBjYWxjTW9kZTogbnVsbCxcbiAgICBjYXBIZWlnaHQ6IG51bWJlcixcbiAgICBjbGFzc05hbWU6IHNwYWNlU2VwYXJhdGVkLFxuICAgIGNsaXA6IG51bGwsXG4gICAgY2xpcFBhdGg6IG51bGwsXG4gICAgY2xpcFBhdGhVbml0czogbnVsbCxcbiAgICBjbGlwUnVsZTogbnVsbCxcbiAgICBjb2xvcjogbnVsbCxcbiAgICBjb2xvckludGVycG9sYXRpb246IG51bGwsXG4gICAgY29sb3JJbnRlcnBvbGF0aW9uRmlsdGVyczogbnVsbCxcbiAgICBjb2xvclByb2ZpbGU6IG51bGwsXG4gICAgY29sb3JSZW5kZXJpbmc6IG51bGwsXG4gICAgY29udGVudDogbnVsbCxcbiAgICBjb250ZW50U2NyaXB0VHlwZTogbnVsbCxcbiAgICBjb250ZW50U3R5bGVUeXBlOiBudWxsLFxuICAgIGNyb3NzT3JpZ2luOiBudWxsLFxuICAgIGN1cnNvcjogbnVsbCxcbiAgICBjeDogbnVsbCxcbiAgICBjeTogbnVsbCxcbiAgICBkOiBudWxsLFxuICAgIGRhdGFUeXBlOiBudWxsLFxuICAgIGRlZmF1bHRBY3Rpb246IG51bGwsXG4gICAgZGVzY2VudDogbnVtYmVyLFxuICAgIGRpZmZ1c2VDb25zdGFudDogbnVtYmVyLFxuICAgIGRpcmVjdGlvbjogbnVsbCxcbiAgICBkaXNwbGF5OiBudWxsLFxuICAgIGR1cjogbnVsbCxcbiAgICBkaXZpc29yOiBudW1iZXIsXG4gICAgZG9taW5hbnRCYXNlbGluZTogbnVsbCxcbiAgICBkb3dubG9hZDogYm9vbGVhbixcbiAgICBkeDogbnVsbCxcbiAgICBkeTogbnVsbCxcbiAgICBlZGdlTW9kZTogbnVsbCxcbiAgICBlZGl0YWJsZTogbnVsbCxcbiAgICBlbGV2YXRpb246IG51bWJlcixcbiAgICBlbmFibGVCYWNrZ3JvdW5kOiBudWxsLFxuICAgIGVuZDogbnVsbCxcbiAgICBldmVudDogbnVsbCxcbiAgICBleHBvbmVudDogbnVtYmVyLFxuICAgIGV4dGVybmFsUmVzb3VyY2VzUmVxdWlyZWQ6IG51bGwsXG4gICAgZmlsbDogbnVsbCxcbiAgICBmaWxsT3BhY2l0eTogbnVtYmVyLFxuICAgIGZpbGxSdWxlOiBudWxsLFxuICAgIGZpbHRlcjogbnVsbCxcbiAgICBmaWx0ZXJSZXM6IG51bGwsXG4gICAgZmlsdGVyVW5pdHM6IG51bGwsXG4gICAgZmxvb2RDb2xvcjogbnVsbCxcbiAgICBmbG9vZE9wYWNpdHk6IG51bGwsXG4gICAgZm9jdXNhYmxlOiBudWxsLFxuICAgIGZvY3VzSGlnaGxpZ2h0OiBudWxsLFxuICAgIGZvbnRGYW1pbHk6IG51bGwsXG4gICAgZm9udFNpemU6IG51bGwsXG4gICAgZm9udFNpemVBZGp1c3Q6IG51bGwsXG4gICAgZm9udFN0cmV0Y2g6IG51bGwsXG4gICAgZm9udFN0eWxlOiBudWxsLFxuICAgIGZvbnRWYXJpYW50OiBudWxsLFxuICAgIGZvbnRXZWlnaHQ6IG51bGwsXG4gICAgZm9ybWF0OiBudWxsLFxuICAgIGZyOiBudWxsLFxuICAgIGZyb206IG51bGwsXG4gICAgZng6IG51bGwsXG4gICAgZnk6IG51bGwsXG4gICAgZzE6IGNvbW1hU2VwYXJhdGVkLFxuICAgIGcyOiBjb21tYVNlcGFyYXRlZCxcbiAgICBnbHlwaE5hbWU6IGNvbW1hU2VwYXJhdGVkLFxuICAgIGdseXBoT3JpZW50YXRpb25Ib3Jpem9udGFsOiBudWxsLFxuICAgIGdseXBoT3JpZW50YXRpb25WZXJ0aWNhbDogbnVsbCxcbiAgICBnbHlwaFJlZjogbnVsbCxcbiAgICBncmFkaWVudFRyYW5zZm9ybTogbnVsbCxcbiAgICBncmFkaWVudFVuaXRzOiBudWxsLFxuICAgIGhhbmRsZXI6IG51bGwsXG4gICAgaGFuZ2luZzogbnVtYmVyLFxuICAgIGhhdGNoQ29udGVudFVuaXRzOiBudWxsLFxuICAgIGhhdGNoVW5pdHM6IG51bGwsXG4gICAgaGVpZ2h0OiBudWxsLFxuICAgIGhyZWY6IG51bGwsXG4gICAgaHJlZkxhbmc6IG51bGwsXG4gICAgaG9yaXpBZHZYOiBudW1iZXIsXG4gICAgaG9yaXpPcmlnaW5YOiBudW1iZXIsXG4gICAgaG9yaXpPcmlnaW5ZOiBudW1iZXIsXG4gICAgaWQ6IG51bGwsXG4gICAgaWRlb2dyYXBoaWM6IG51bWJlcixcbiAgICBpbWFnZVJlbmRlcmluZzogbnVsbCxcbiAgICBpbml0aWFsVmlzaWJpbGl0eTogbnVsbCxcbiAgICBpbjogbnVsbCxcbiAgICBpbjI6IG51bGwsXG4gICAgaW50ZXJjZXB0OiBudW1iZXIsXG4gICAgazogbnVtYmVyLFxuICAgIGsxOiBudW1iZXIsXG4gICAgazI6IG51bWJlcixcbiAgICBrMzogbnVtYmVyLFxuICAgIGs0OiBudW1iZXIsXG4gICAga2VybmVsTWF0cml4OiBjb21tYU9yU3BhY2VTZXBhcmF0ZWQsXG4gICAga2VybmVsVW5pdExlbmd0aDogbnVsbCxcbiAgICBrZXlQb2ludHM6IG51bGwsIC8vIFNFTUlfQ09MT05fU0VQQVJBVEVEXG4gICAga2V5U3BsaW5lczogbnVsbCwgLy8gU0VNSV9DT0xPTl9TRVBBUkFURURcbiAgICBrZXlUaW1lczogbnVsbCwgLy8gU0VNSV9DT0xPTl9TRVBBUkFURURcbiAgICBrZXJuaW5nOiBudWxsLFxuICAgIGxhbmc6IG51bGwsXG4gICAgbGVuZ3RoQWRqdXN0OiBudWxsLFxuICAgIGxldHRlclNwYWNpbmc6IG51bGwsXG4gICAgbGlnaHRpbmdDb2xvcjogbnVsbCxcbiAgICBsaW1pdGluZ0NvbmVBbmdsZTogbnVtYmVyLFxuICAgIGxvY2FsOiBudWxsLFxuICAgIG1hcmtlckVuZDogbnVsbCxcbiAgICBtYXJrZXJNaWQ6IG51bGwsXG4gICAgbWFya2VyU3RhcnQ6IG51bGwsXG4gICAgbWFya2VySGVpZ2h0OiBudWxsLFxuICAgIG1hcmtlclVuaXRzOiBudWxsLFxuICAgIG1hcmtlcldpZHRoOiBudWxsLFxuICAgIG1hc2s6IG51bGwsXG4gICAgbWFza0NvbnRlbnRVbml0czogbnVsbCxcbiAgICBtYXNrVHlwZTogbnVsbCxcbiAgICBtYXNrVW5pdHM6IG51bGwsXG4gICAgbWF0aGVtYXRpY2FsOiBudWxsLFxuICAgIG1heDogbnVsbCxcbiAgICBtZWRpYTogbnVsbCxcbiAgICBtZWRpYUNoYXJhY3RlckVuY29kaW5nOiBudWxsLFxuICAgIG1lZGlhQ29udGVudEVuY29kaW5nczogbnVsbCxcbiAgICBtZWRpYVNpemU6IG51bWJlcixcbiAgICBtZWRpYVRpbWU6IG51bGwsXG4gICAgbWV0aG9kOiBudWxsLFxuICAgIG1pbjogbnVsbCxcbiAgICBtb2RlOiBudWxsLFxuICAgIG5hbWU6IG51bGwsXG4gICAgbmF2RG93bjogbnVsbCxcbiAgICBuYXZEb3duTGVmdDogbnVsbCxcbiAgICBuYXZEb3duUmlnaHQ6IG51bGwsXG4gICAgbmF2TGVmdDogbnVsbCxcbiAgICBuYXZOZXh0OiBudWxsLFxuICAgIG5hdlByZXY6IG51bGwsXG4gICAgbmF2UmlnaHQ6IG51bGwsXG4gICAgbmF2VXA6IG51bGwsXG4gICAgbmF2VXBMZWZ0OiBudWxsLFxuICAgIG5hdlVwUmlnaHQ6IG51bGwsXG4gICAgbnVtT2N0YXZlczogbnVsbCxcbiAgICBvYnNlcnZlcjogbnVsbCxcbiAgICBvZmZzZXQ6IG51bGwsXG4gICAgb25BYm9ydDogbnVsbCxcbiAgICBvbkFjdGl2YXRlOiBudWxsLFxuICAgIG9uQWZ0ZXJQcmludDogbnVsbCxcbiAgICBvbkJlZm9yZVByaW50OiBudWxsLFxuICAgIG9uQmVnaW46IG51bGwsXG4gICAgb25DYW5jZWw6IG51bGwsXG4gICAgb25DYW5QbGF5OiBudWxsLFxuICAgIG9uQ2FuUGxheVRocm91Z2g6IG51bGwsXG4gICAgb25DaGFuZ2U6IG51bGwsXG4gICAgb25DbGljazogbnVsbCxcbiAgICBvbkNsb3NlOiBudWxsLFxuICAgIG9uQ29weTogbnVsbCxcbiAgICBvbkN1ZUNoYW5nZTogbnVsbCxcbiAgICBvbkN1dDogbnVsbCxcbiAgICBvbkRibENsaWNrOiBudWxsLFxuICAgIG9uRHJhZzogbnVsbCxcbiAgICBvbkRyYWdFbmQ6IG51bGwsXG4gICAgb25EcmFnRW50ZXI6IG51bGwsXG4gICAgb25EcmFnRXhpdDogbnVsbCxcbiAgICBvbkRyYWdMZWF2ZTogbnVsbCxcbiAgICBvbkRyYWdPdmVyOiBudWxsLFxuICAgIG9uRHJhZ1N0YXJ0OiBudWxsLFxuICAgIG9uRHJvcDogbnVsbCxcbiAgICBvbkR1cmF0aW9uQ2hhbmdlOiBudWxsLFxuICAgIG9uRW1wdGllZDogbnVsbCxcbiAgICBvbkVuZDogbnVsbCxcbiAgICBvbkVuZGVkOiBudWxsLFxuICAgIG9uRXJyb3I6IG51bGwsXG4gICAgb25Gb2N1czogbnVsbCxcbiAgICBvbkZvY3VzSW46IG51bGwsXG4gICAgb25Gb2N1c091dDogbnVsbCxcbiAgICBvbkhhc2hDaGFuZ2U6IG51bGwsXG4gICAgb25JbnB1dDogbnVsbCxcbiAgICBvbkludmFsaWQ6IG51bGwsXG4gICAgb25LZXlEb3duOiBudWxsLFxuICAgIG9uS2V5UHJlc3M6IG51bGwsXG4gICAgb25LZXlVcDogbnVsbCxcbiAgICBvbkxvYWQ6IG51bGwsXG4gICAgb25Mb2FkZWREYXRhOiBudWxsLFxuICAgIG9uTG9hZGVkTWV0YWRhdGE6IG51bGwsXG4gICAgb25Mb2FkU3RhcnQ6IG51bGwsXG4gICAgb25NZXNzYWdlOiBudWxsLFxuICAgIG9uTW91c2VEb3duOiBudWxsLFxuICAgIG9uTW91c2VFbnRlcjogbnVsbCxcbiAgICBvbk1vdXNlTGVhdmU6IG51bGwsXG4gICAgb25Nb3VzZU1vdmU6IG51bGwsXG4gICAgb25Nb3VzZU91dDogbnVsbCxcbiAgICBvbk1vdXNlT3ZlcjogbnVsbCxcbiAgICBvbk1vdXNlVXA6IG51bGwsXG4gICAgb25Nb3VzZVdoZWVsOiBudWxsLFxuICAgIG9uT2ZmbGluZTogbnVsbCxcbiAgICBvbk9ubGluZTogbnVsbCxcbiAgICBvblBhZ2VIaWRlOiBudWxsLFxuICAgIG9uUGFnZVNob3c6IG51bGwsXG4gICAgb25QYXN0ZTogbnVsbCxcbiAgICBvblBhdXNlOiBudWxsLFxuICAgIG9uUGxheTogbnVsbCxcbiAgICBvblBsYXlpbmc6IG51bGwsXG4gICAgb25Qb3BTdGF0ZTogbnVsbCxcbiAgICBvblByb2dyZXNzOiBudWxsLFxuICAgIG9uUmF0ZUNoYW5nZTogbnVsbCxcbiAgICBvblJlcGVhdDogbnVsbCxcbiAgICBvblJlc2V0OiBudWxsLFxuICAgIG9uUmVzaXplOiBudWxsLFxuICAgIG9uU2Nyb2xsOiBudWxsLFxuICAgIG9uU2Vla2VkOiBudWxsLFxuICAgIG9uU2Vla2luZzogbnVsbCxcbiAgICBvblNlbGVjdDogbnVsbCxcbiAgICBvblNob3c6IG51bGwsXG4gICAgb25TdGFsbGVkOiBudWxsLFxuICAgIG9uU3RvcmFnZTogbnVsbCxcbiAgICBvblN1Ym1pdDogbnVsbCxcbiAgICBvblN1c3BlbmQ6IG51bGwsXG4gICAgb25UaW1lVXBkYXRlOiBudWxsLFxuICAgIG9uVG9nZ2xlOiBudWxsLFxuICAgIG9uVW5sb2FkOiBudWxsLFxuICAgIG9uVm9sdW1lQ2hhbmdlOiBudWxsLFxuICAgIG9uV2FpdGluZzogbnVsbCxcbiAgICBvblpvb206IG51bGwsXG4gICAgb3BhY2l0eTogbnVsbCxcbiAgICBvcGVyYXRvcjogbnVsbCxcbiAgICBvcmRlcjogbnVsbCxcbiAgICBvcmllbnQ6IG51bGwsXG4gICAgb3JpZW50YXRpb246IG51bGwsXG4gICAgb3JpZ2luOiBudWxsLFxuICAgIG92ZXJmbG93OiBudWxsLFxuICAgIG92ZXJsYXk6IG51bGwsXG4gICAgb3ZlcmxpbmVQb3NpdGlvbjogbnVtYmVyLFxuICAgIG92ZXJsaW5lVGhpY2tuZXNzOiBudW1iZXIsXG4gICAgcGFpbnRPcmRlcjogbnVsbCxcbiAgICBwYW5vc2UxOiBudWxsLFxuICAgIHBhdGg6IG51bGwsXG4gICAgcGF0aExlbmd0aDogbnVtYmVyLFxuICAgIHBhdHRlcm5Db250ZW50VW5pdHM6IG51bGwsXG4gICAgcGF0dGVyblRyYW5zZm9ybTogbnVsbCxcbiAgICBwYXR0ZXJuVW5pdHM6IG51bGwsXG4gICAgcGhhc2U6IG51bGwsXG4gICAgcGluZzogc3BhY2VTZXBhcmF0ZWQsXG4gICAgcGl0Y2g6IG51bGwsXG4gICAgcGxheWJhY2tPcmRlcjogbnVsbCxcbiAgICBwb2ludGVyRXZlbnRzOiBudWxsLFxuICAgIHBvaW50czogbnVsbCxcbiAgICBwb2ludHNBdFg6IG51bWJlcixcbiAgICBwb2ludHNBdFk6IG51bWJlcixcbiAgICBwb2ludHNBdFo6IG51bWJlcixcbiAgICBwcmVzZXJ2ZUFscGhhOiBudWxsLFxuICAgIHByZXNlcnZlQXNwZWN0UmF0aW86IG51bGwsXG4gICAgcHJpbWl0aXZlVW5pdHM6IG51bGwsXG4gICAgcHJvcGFnYXRlOiBudWxsLFxuICAgIHByb3BlcnR5OiBjb21tYU9yU3BhY2VTZXBhcmF0ZWQsXG4gICAgcjogbnVsbCxcbiAgICByYWRpdXM6IG51bGwsXG4gICAgcmVmZXJyZXJQb2xpY3k6IG51bGwsXG4gICAgcmVmWDogbnVsbCxcbiAgICByZWZZOiBudWxsLFxuICAgIHJlbDogY29tbWFPclNwYWNlU2VwYXJhdGVkLFxuICAgIHJldjogY29tbWFPclNwYWNlU2VwYXJhdGVkLFxuICAgIHJlbmRlcmluZ0ludGVudDogbnVsbCxcbiAgICByZXBlYXRDb3VudDogbnVsbCxcbiAgICByZXBlYXREdXI6IG51bGwsXG4gICAgcmVxdWlyZWRFeHRlbnNpb25zOiBjb21tYU9yU3BhY2VTZXBhcmF0ZWQsXG4gICAgcmVxdWlyZWRGZWF0dXJlczogY29tbWFPclNwYWNlU2VwYXJhdGVkLFxuICAgIHJlcXVpcmVkRm9udHM6IGNvbW1hT3JTcGFjZVNlcGFyYXRlZCxcbiAgICByZXF1aXJlZEZvcm1hdHM6IGNvbW1hT3JTcGFjZVNlcGFyYXRlZCxcbiAgICByZXNvdXJjZTogbnVsbCxcbiAgICByZXN0YXJ0OiBudWxsLFxuICAgIHJlc3VsdDogbnVsbCxcbiAgICByb3RhdGU6IG51bGwsXG4gICAgcng6IG51bGwsXG4gICAgcnk6IG51bGwsXG4gICAgc2NhbGU6IG51bGwsXG4gICAgc2VlZDogbnVsbCxcbiAgICBzaGFwZVJlbmRlcmluZzogbnVsbCxcbiAgICBzaWRlOiBudWxsLFxuICAgIHNsb3BlOiBudWxsLFxuICAgIHNuYXBzaG90VGltZTogbnVsbCxcbiAgICBzcGVjdWxhckNvbnN0YW50OiBudW1iZXIsXG4gICAgc3BlY3VsYXJFeHBvbmVudDogbnVtYmVyLFxuICAgIHNwcmVhZE1ldGhvZDogbnVsbCxcbiAgICBzcGFjaW5nOiBudWxsLFxuICAgIHN0YXJ0T2Zmc2V0OiBudWxsLFxuICAgIHN0ZERldmlhdGlvbjogbnVsbCxcbiAgICBzdGVtaDogbnVsbCxcbiAgICBzdGVtdjogbnVsbCxcbiAgICBzdGl0Y2hUaWxlczogbnVsbCxcbiAgICBzdG9wQ29sb3I6IG51bGwsXG4gICAgc3RvcE9wYWNpdHk6IG51bGwsXG4gICAgc3RyaWtldGhyb3VnaFBvc2l0aW9uOiBudW1iZXIsXG4gICAgc3RyaWtldGhyb3VnaFRoaWNrbmVzczogbnVtYmVyLFxuICAgIHN0cmluZzogbnVsbCxcbiAgICBzdHJva2U6IG51bGwsXG4gICAgc3Ryb2tlRGFzaEFycmF5OiBjb21tYU9yU3BhY2VTZXBhcmF0ZWQsXG4gICAgc3Ryb2tlRGFzaE9mZnNldDogbnVsbCxcbiAgICBzdHJva2VMaW5lQ2FwOiBudWxsLFxuICAgIHN0cm9rZUxpbmVKb2luOiBudWxsLFxuICAgIHN0cm9rZU1pdGVyTGltaXQ6IG51bWJlcixcbiAgICBzdHJva2VPcGFjaXR5OiBudW1iZXIsXG4gICAgc3Ryb2tlV2lkdGg6IG51bGwsXG4gICAgc3R5bGU6IG51bGwsXG4gICAgc3VyZmFjZVNjYWxlOiBudW1iZXIsXG4gICAgc3luY0JlaGF2aW9yOiBudWxsLFxuICAgIHN5bmNCZWhhdmlvckRlZmF1bHQ6IG51bGwsXG4gICAgc3luY01hc3RlcjogbnVsbCxcbiAgICBzeW5jVG9sZXJhbmNlOiBudWxsLFxuICAgIHN5bmNUb2xlcmFuY2VEZWZhdWx0OiBudWxsLFxuICAgIHN5c3RlbUxhbmd1YWdlOiBjb21tYU9yU3BhY2VTZXBhcmF0ZWQsXG4gICAgdGFiSW5kZXg6IG51bWJlcixcbiAgICB0YWJsZVZhbHVlczogbnVsbCxcbiAgICB0YXJnZXQ6IG51bGwsXG4gICAgdGFyZ2V0WDogbnVtYmVyLFxuICAgIHRhcmdldFk6IG51bWJlcixcbiAgICB0ZXh0QW5jaG9yOiBudWxsLFxuICAgIHRleHREZWNvcmF0aW9uOiBudWxsLFxuICAgIHRleHRSZW5kZXJpbmc6IG51bGwsXG4gICAgdGV4dExlbmd0aDogbnVsbCxcbiAgICB0aW1lbGluZUJlZ2luOiBudWxsLFxuICAgIHRpdGxlOiBudWxsLFxuICAgIHRyYW5zZm9ybUJlaGF2aW9yOiBudWxsLFxuICAgIHR5cGU6IG51bGwsXG4gICAgdHlwZU9mOiBjb21tYU9yU3BhY2VTZXBhcmF0ZWQsXG4gICAgdG86IG51bGwsXG4gICAgdHJhbnNmb3JtOiBudWxsLFxuICAgIHRyYW5zZm9ybU9yaWdpbjogbnVsbCxcbiAgICB1MTogbnVsbCxcbiAgICB1MjogbnVsbCxcbiAgICB1bmRlcmxpbmVQb3NpdGlvbjogbnVtYmVyLFxuICAgIHVuZGVybGluZVRoaWNrbmVzczogbnVtYmVyLFxuICAgIHVuaWNvZGU6IG51bGwsXG4gICAgdW5pY29kZUJpZGk6IG51bGwsXG4gICAgdW5pY29kZVJhbmdlOiBudWxsLFxuICAgIHVuaXRzUGVyRW06IG51bWJlcixcbiAgICB2YWx1ZXM6IG51bGwsXG4gICAgdkFscGhhYmV0aWM6IG51bWJlcixcbiAgICB2TWF0aGVtYXRpY2FsOiBudW1iZXIsXG4gICAgdmVjdG9yRWZmZWN0OiBudWxsLFxuICAgIHZIYW5naW5nOiBudW1iZXIsXG4gICAgdklkZW9ncmFwaGljOiBudW1iZXIsXG4gICAgdmVyc2lvbjogbnVsbCxcbiAgICB2ZXJ0QWR2WTogbnVtYmVyLFxuICAgIHZlcnRPcmlnaW5YOiBudW1iZXIsXG4gICAgdmVydE9yaWdpblk6IG51bWJlcixcbiAgICB2aWV3Qm94OiBudWxsLFxuICAgIHZpZXdUYXJnZXQ6IG51bGwsXG4gICAgdmlzaWJpbGl0eTogbnVsbCxcbiAgICB3aWR0aDogbnVsbCxcbiAgICB3aWR0aHM6IG51bGwsXG4gICAgd29yZFNwYWNpbmc6IG51bGwsXG4gICAgd3JpdGluZ01vZGU6IG51bGwsXG4gICAgeDogbnVsbCxcbiAgICB4MTogbnVsbCxcbiAgICB4MjogbnVsbCxcbiAgICB4Q2hhbm5lbFNlbGVjdG9yOiBudWxsLFxuICAgIHhIZWlnaHQ6IG51bWJlcixcbiAgICB5OiBudWxsLFxuICAgIHkxOiBudWxsLFxuICAgIHkyOiBudWxsLFxuICAgIHlDaGFubmVsU2VsZWN0b3I6IG51bGwsXG4gICAgejogbnVsbCxcbiAgICB6b29tQW5kUGFuOiBudWxsXG4gIH0sXG4gIHNwYWNlOiAnc3ZnJyxcbiAgdHJhbnNmb3JtOiBjYXNlU2Vuc2l0aXZlVHJhbnNmb3JtXG59KVxuIiwiaW1wb3J0IHtjcmVhdGV9IGZyb20gJy4vdXRpbC9jcmVhdGUuanMnXG5cbmV4cG9ydCBjb25zdCB4bGluayA9IGNyZWF0ZSh7XG4gIHByb3BlcnRpZXM6IHtcbiAgICB4TGlua0FjdHVhdGU6IG51bGwsXG4gICAgeExpbmtBcmNSb2xlOiBudWxsLFxuICAgIHhMaW5rSHJlZjogbnVsbCxcbiAgICB4TGlua1JvbGU6IG51bGwsXG4gICAgeExpbmtTaG93OiBudWxsLFxuICAgIHhMaW5rVGl0bGU6IG51bGwsXG4gICAgeExpbmtUeXBlOiBudWxsXG4gIH0sXG4gIHNwYWNlOiAneGxpbmsnLFxuICB0cmFuc2Zvcm0oXywgcHJvcGVydHkpIHtcbiAgICByZXR1cm4gJ3hsaW5rOicgKyBwcm9wZXJ0eS5zbGljZSg1KS50b0xvd2VyQ2FzZSgpXG4gIH1cbn0pXG4iLCJpbXBvcnQge2NyZWF0ZX0gZnJvbSAnLi91dGlsL2NyZWF0ZS5qcydcbmltcG9ydCB7Y2FzZUluc2Vuc2l0aXZlVHJhbnNmb3JtfSBmcm9tICcuL3V0aWwvY2FzZS1pbnNlbnNpdGl2ZS10cmFuc2Zvcm0uanMnXG5cbmV4cG9ydCBjb25zdCB4bWxucyA9IGNyZWF0ZSh7XG4gIGF0dHJpYnV0ZXM6IHt4bWxuc3hsaW5rOiAneG1sbnM6eGxpbmsnfSxcbiAgcHJvcGVydGllczoge3htbG5zWExpbms6IG51bGwsIHhtbG5zOiBudWxsfSxcbiAgc3BhY2U6ICd4bWxucycsXG4gIHRyYW5zZm9ybTogY2FzZUluc2Vuc2l0aXZlVHJhbnNmb3JtXG59KVxuIiwiaW1wb3J0IHtjcmVhdGV9IGZyb20gJy4vdXRpbC9jcmVhdGUuanMnXG5cbmV4cG9ydCBjb25zdCB4bWwgPSBjcmVhdGUoe1xuICBwcm9wZXJ0aWVzOiB7eG1sQmFzZTogbnVsbCwgeG1sTGFuZzogbnVsbCwgeG1sU3BhY2U6IG51bGx9LFxuICBzcGFjZTogJ3htbCcsXG4gIHRyYW5zZm9ybShfLCBwcm9wZXJ0eSkge1xuICAgIHJldHVybiAneG1sOicgKyBwcm9wZXJ0eS5zbGljZSgzKS50b0xvd2VyQ2FzZSgpXG4gIH1cbn0pXG4iLCIvKipcbiAqIEBpbXBvcnQge1NjaGVtYX0gZnJvbSAncHJvcGVydHktaW5mb3JtYXRpb24nXG4gKi9cblxuaW1wb3J0IHtEZWZpbmVkSW5mb30gZnJvbSAnLi91dGlsL2RlZmluZWQtaW5mby5qcydcbmltcG9ydCB7SW5mb30gZnJvbSAnLi91dGlsL2luZm8uanMnXG5pbXBvcnQge25vcm1hbGl6ZX0gZnJvbSAnLi9ub3JtYWxpemUuanMnXG5cbmNvbnN0IGNhcCA9IC9bQS1aXS9nXG5jb25zdCBkYXNoID0gLy1bYS16XS9nXG5jb25zdCB2YWxpZCA9IC9eZGF0YVstXFx3LjpdKyQvaVxuXG4vKipcbiAqIExvb2sgdXAgaW5mbyBvbiBhIHByb3BlcnR5LlxuICpcbiAqIEluIG1vc3QgY2FzZXMgdGhlIGdpdmVuIGBzY2hlbWFgIGNvbnRhaW5zIGluZm8gb24gdGhlIHByb3BlcnR5LlxuICogQWxsIHN0YW5kYXJkLFxuICogbW9zdCBsZWdhY3ksXG4gKiBhbmQgc29tZSBub24tc3RhbmRhcmQgcHJvcGVydGllcyBhcmUgc3VwcG9ydGVkLlxuICogRm9yIHRoZXNlIGNhc2VzLFxuICogdGhlIHJldHVybmVkIGBJbmZvYCBoYXMgaGludHMgYWJvdXQgdGhlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eS5cbiAqXG4gKiBgbmFtZWAgY2FuIGFsc28gYmUgYSB2YWxpZCBkYXRhIGF0dHJpYnV0ZSBvciBwcm9wZXJ0eSxcbiAqIGluIHdoaWNoIGNhc2UgYW4gYEluZm9gIG9iamVjdCB3aXRoIHRoZSBjb3JyZWN0bHkgY2FzZWQgYGF0dHJpYnV0ZWAgYW5kXG4gKiBgcHJvcGVydHlgIGlzIHJldHVybmVkLlxuICpcbiAqIGBuYW1lYCBjYW4gYmUgYW4gdW5rbm93biBhdHRyaWJ1dGUsXG4gKiBpbiB3aGljaCBjYXNlIGFuIGBJbmZvYCBvYmplY3Qgd2l0aCBgYXR0cmlidXRlYCBhbmQgYHByb3BlcnR5YCBzZXQgdG8gdGhlXG4gKiBnaXZlbiBuYW1lIGlzIHJldHVybmVkLlxuICogSXQgaXMgbm90IHJlY29tbWVuZGVkIHRvIHByb3ZpZGUgdW5zdXBwb3J0ZWQgbGVnYWN5IG9yIHJlY2VudGx5IHNwZWNjZWRcbiAqIHByb3BlcnRpZXMuXG4gKlxuICpcbiAqIEBwYXJhbSB7U2NoZW1hfSBzY2hlbWFcbiAqICAgU2NoZW1hO1xuICogICBlaXRoZXIgdGhlIGBodG1sYCBvciBgc3ZnYCBleHBvcnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqICAgQW4gYXR0cmlidXRlLWxpa2Ugb3IgcHJvcGVydHktbGlrZSBuYW1lO1xuICogICBpdCB3aWxsIGJlIHBhc3NlZCB0aHJvdWdoIGBub3JtYWxpemVgIHRvIGhvcGVmdWxseSBmaW5kIHRoZSBjb3JyZWN0IGluZm8uXG4gKiBAcmV0dXJucyB7SW5mb31cbiAqICAgSW5mby5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmQoc2NoZW1hLCB2YWx1ZSkge1xuICBjb25zdCBub3JtYWwgPSBub3JtYWxpemUodmFsdWUpXG4gIGxldCBwcm9wZXJ0eSA9IHZhbHVlXG4gIGxldCBUeXBlID0gSW5mb1xuXG4gIGlmIChub3JtYWwgaW4gc2NoZW1hLm5vcm1hbCkge1xuICAgIHJldHVybiBzY2hlbWEucHJvcGVydHlbc2NoZW1hLm5vcm1hbFtub3JtYWxdXVxuICB9XG5cbiAgaWYgKG5vcm1hbC5sZW5ndGggPiA0ICYmIG5vcm1hbC5zbGljZSgwLCA0KSA9PT0gJ2RhdGEnICYmIHZhbGlkLnRlc3QodmFsdWUpKSB7XG4gICAgLy8gQXR0cmlidXRlIG9yIHByb3BlcnR5LlxuICAgIGlmICh2YWx1ZS5jaGFyQXQoNCkgPT09ICctJykge1xuICAgICAgLy8gVHVybiBpdCBpbnRvIGEgcHJvcGVydHkuXG4gICAgICBjb25zdCByZXN0ID0gdmFsdWUuc2xpY2UoNSkucmVwbGFjZShkYXNoLCBjYW1lbGNhc2UpXG4gICAgICBwcm9wZXJ0eSA9ICdkYXRhJyArIHJlc3QuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyByZXN0LnNsaWNlKDEpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFR1cm4gaXQgaW50byBhbiBhdHRyaWJ1dGUuXG4gICAgICBjb25zdCByZXN0ID0gdmFsdWUuc2xpY2UoNClcblxuICAgICAgaWYgKCFkYXNoLnRlc3QocmVzdCkpIHtcbiAgICAgICAgbGV0IGRhc2hlcyA9IHJlc3QucmVwbGFjZShjYXAsIGtlYmFiKVxuXG4gICAgICAgIGlmIChkYXNoZXMuY2hhckF0KDApICE9PSAnLScpIHtcbiAgICAgICAgICBkYXNoZXMgPSAnLScgKyBkYXNoZXNcbiAgICAgICAgfVxuXG4gICAgICAgIHZhbHVlID0gJ2RhdGEnICsgZGFzaGVzXG4gICAgICB9XG4gICAgfVxuXG4gICAgVHlwZSA9IERlZmluZWRJbmZvXG4gIH1cblxuICByZXR1cm4gbmV3IFR5cGUocHJvcGVydHksIHZhbHVlKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSAkMFxuICogICBWYWx1ZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiAgIEtlYmFiLlxuICovXG5mdW5jdGlvbiBrZWJhYigkMCkge1xuICByZXR1cm4gJy0nICsgJDAudG9Mb3dlckNhc2UoKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSAkMFxuICogICBWYWx1ZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiAgIENhbWVsLlxuICovXG5mdW5jdGlvbiBjYW1lbGNhc2UoJDApIHtcbiAgcmV0dXJuICQwLmNoYXJBdCgxKS50b1VwcGVyQ2FzZSgpXG59XG4iLCIvLyBOb3RlOiB0eXBlcyBleHBvc2VkIGZyb20gYGluZGV4LmQudHNgLlxuaW1wb3J0IHttZXJnZX0gZnJvbSAnLi9saWIvdXRpbC9tZXJnZS5qcydcbmltcG9ydCB7YXJpYX0gZnJvbSAnLi9saWIvYXJpYS5qcydcbmltcG9ydCB7aHRtbCBhcyBodG1sQmFzZX0gZnJvbSAnLi9saWIvaHRtbC5qcydcbmltcG9ydCB7c3ZnIGFzIHN2Z0Jhc2V9IGZyb20gJy4vbGliL3N2Zy5qcydcbmltcG9ydCB7eGxpbmt9IGZyb20gJy4vbGliL3hsaW5rLmpzJ1xuaW1wb3J0IHt4bWxuc30gZnJvbSAnLi9saWIveG1sbnMuanMnXG5pbXBvcnQge3htbH0gZnJvbSAnLi9saWIveG1sLmpzJ1xuXG5leHBvcnQge2hhc3RUb1JlYWN0fSBmcm9tICcuL2xpYi9oYXN0LXRvLXJlYWN0LmpzJ1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IG1lcmdlKFthcmlhLCBodG1sQmFzZSwgeGxpbmssIHhtbG5zLCB4bWxdLCAnaHRtbCcpXG5cbmV4cG9ydCB7ZmluZH0gZnJvbSAnLi9saWIvZmluZC5qcydcbmV4cG9ydCB7bm9ybWFsaXplfSBmcm9tICcuL2xpYi9ub3JtYWxpemUuanMnXG5cbmV4cG9ydCBjb25zdCBzdmcgPSBtZXJnZShbYXJpYSwgc3ZnQmFzZSwgeGxpbmssIHhtbG5zLCB4bWxdLCAnc3ZnJylcbiIsIi8qKlxuICogQGNhbGxiYWNrIEhhbmRsZXJcbiAqICAgSGFuZGxlIGEgdmFsdWUsIHdpdGggYSBjZXJ0YWluIElEIGZpZWxkIHNldCB0byBhIGNlcnRhaW4gdmFsdWUuXG4gKiAgIFRoZSBJRCBmaWVsZCBpcyBwYXNzZWQgdG8gYHp3aXRjaGAsIGFuZCBpdOKAmXMgdmFsdWUgaXMgdGhpcyBmdW5jdGlvbuKAmXNcbiAqICAgcGxhY2Ugb24gdGhlIGBoYW5kbGVyc2AgcmVjb3JkLlxuICogQHBhcmFtIHsuLi5hbnl9IHBhcmFtZXRlcnNcbiAqICAgQXJiaXRyYXJ5IHBhcmFtZXRlcnMgcGFzc2VkIHRvIHRoZSB6d2l0Y2guXG4gKiAgIFRoZSBmaXJzdCB3aWxsIGJlIGFuIG9iamVjdCB3aXRoIGEgY2VydGFpbiBJRCBmaWVsZCBzZXQgdG8gYSBjZXJ0YWluIHZhbHVlLlxuICogQHJldHVybnMge2FueX1cbiAqICAgQW55dGhpbmchXG4gKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgVW5rbm93bkhhbmRsZXJcbiAqICAgSGFuZGxlIHZhbHVlcyB0aGF0IGRvIGhhdmUgYSBjZXJ0YWluIElEIGZpZWxkLCBidXQgaXTigJlzIHNldCB0byBhIHZhbHVlXG4gKiAgIHRoYXQgaXMgbm90IGxpc3RlZCBpbiB0aGUgYGhhbmRsZXJzYCByZWNvcmQuXG4gKiBAcGFyYW0ge3Vua25vd259IHZhbHVlXG4gKiAgIEFuIG9iamVjdCB3aXRoIGEgY2VydGFpbiBJRCBmaWVsZCBzZXQgdG8gYW4gdW5rbm93biB2YWx1ZS5cbiAqIEBwYXJhbSB7Li4uYW55fSByZXN0XG4gKiAgIEFyYml0cmFyeSBwYXJhbWV0ZXJzIHBhc3NlZCB0byB0aGUgendpdGNoLlxuICogQHJldHVybnMge2FueX1cbiAqICAgQW55dGhpbmchXG4gKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgSW52YWxpZEhhbmRsZXJcbiAqICAgSGFuZGxlIHZhbHVlcyB0aGF0IGRvIG5vdCBoYXZlIGEgY2VydGFpbiBJRCBmaWVsZC5cbiAqIEBwYXJhbSB7dW5rbm93bn0gdmFsdWVcbiAqICAgQW55IHVua25vd24gdmFsdWUuXG4gKiBAcGFyYW0gey4uLmFueX0gcmVzdFxuICogICBBcmJpdHJhcnkgcGFyYW1ldGVycyBwYXNzZWQgdG8gdGhlIHp3aXRjaC5cbiAqIEByZXR1cm5zIHt2b2lkfG51bGx8dW5kZWZpbmVkfG5ldmVyfVxuICogICBUaGlzIHNob3VsZCBjcmFzaCBvciByZXR1cm4gbm90aGluZy5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSB7SW52YWxpZEhhbmRsZXJ9IFtJbnZhbGlkPUludmFsaWRIYW5kbGVyXVxuICogQHRlbXBsYXRlIHtVbmtub3duSGFuZGxlcn0gW1Vua25vd249VW5rbm93bkhhbmRsZXJdXG4gKiBAdGVtcGxhdGUge1JlY29yZDxzdHJpbmcsIEhhbmRsZXI+fSBbSGFuZGxlcnM9UmVjb3JkPHN0cmluZywgSGFuZGxlcj5dXG4gKiBAdHlwZWRlZiBPcHRpb25zXG4gKiAgIENvbmZpZ3VyYXRpb24gKHJlcXVpcmVkKS5cbiAqIEBwcm9wZXJ0eSB7SW52YWxpZH0gW2ludmFsaWRdXG4gKiAgIEhhbmRsZXIgdG8gdXNlIGZvciBpbnZhbGlkIHZhbHVlcy5cbiAqIEBwcm9wZXJ0eSB7VW5rbm93bn0gW3Vua25vd25dXG4gKiAgIEhhbmRsZXIgdG8gdXNlIGZvciB1bmtub3duIHZhbHVlcy5cbiAqIEBwcm9wZXJ0eSB7SGFuZGxlcnN9IFtoYW5kbGVyc11cbiAqICAgSGFuZGxlcnMgdG8gdXNlLlxuICovXG5cbmNvbnN0IG93biA9IHt9Lmhhc093blByb3BlcnR5XG5cbi8qKlxuICogSGFuZGxlIHZhbHVlcyBiYXNlZCBvbiBhIGZpZWxkLlxuICpcbiAqIEB0ZW1wbGF0ZSB7SW52YWxpZEhhbmRsZXJ9IFtJbnZhbGlkPUludmFsaWRIYW5kbGVyXVxuICogQHRlbXBsYXRlIHtVbmtub3duSGFuZGxlcn0gW1Vua25vd249VW5rbm93bkhhbmRsZXJdXG4gKiBAdGVtcGxhdGUge1JlY29yZDxzdHJpbmcsIEhhbmRsZXI+fSBbSGFuZGxlcnM9UmVjb3JkPHN0cmluZywgSGFuZGxlcj5dXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gKiAgIEZpZWxkIHRvIHN3aXRjaCBvbi5cbiAqIEBwYXJhbSB7T3B0aW9uczxJbnZhbGlkLCBVbmtub3duLCBIYW5kbGVycz59IFtvcHRpb25zXVxuICogICBDb25maWd1cmF0aW9uIChyZXF1aXJlZCkuXG4gKiBAcmV0dXJucyB7e3Vua25vd246IFVua25vd24sIGludmFsaWQ6IEludmFsaWQsIGhhbmRsZXJzOiBIYW5kbGVycywgKC4uLnBhcmFtZXRlcnM6IFBhcmFtZXRlcnM8SGFuZGxlcnNba2V5b2YgSGFuZGxlcnNdPik6IFJldHVyblR5cGU8SGFuZGxlcnNba2V5b2YgSGFuZGxlcnNdPiwgKC4uLnBhcmFtZXRlcnM6IFBhcmFtZXRlcnM8VW5rbm93bj4pOiBSZXR1cm5UeXBlPFVua25vd24+fX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHp3aXRjaChrZXksIG9wdGlvbnMpIHtcbiAgY29uc3Qgc2V0dGluZ3MgPSBvcHRpb25zIHx8IHt9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBvbmUgdmFsdWUuXG4gICAqXG4gICAqIEJhc2VkIG9uIHRoZSBib3VuZCBga2V5YCwgYSByZXNwZWN0aXZlIGhhbmRsZXIgd2lsbCBiZSBjYWxsZWQuXG4gICAqIElmIGB2YWx1ZWAgaXMgbm90IGFuIG9iamVjdCwgb3IgZG9lc27igJl0IGhhdmUgYSBga2V5YCBwcm9wZXJ0eSwgdGhlIHNwZWNpYWxcbiAgICog4oCcaW52YWxpZOKAnSBoYW5kbGVyIHdpbGwgYmUgY2FsbGVkLlxuICAgKiBJZiBgdmFsdWVgIGhhcyBhbiB1bmtub3duIGBrZXlgLCB0aGUgc3BlY2lhbCDigJx1bmtub3du4oCdIGhhbmRsZXIgd2lsbCBiZVxuICAgKiBjYWxsZWQuXG4gICAqXG4gICAqIEFsbCBhcmd1bWVudHMsIGFuZCB0aGUgY29udGV4dCBvYmplY3QsIGFyZSBwYXNzZWQgdGhyb3VnaCB0byB0aGUgaGFuZGxlcixcbiAgICogYW5kIGl04oCZcyByZXN1bHQgaXMgcmV0dXJuZWQuXG4gICAqXG4gICAqIEB0aGlzIHt1bmtub3dufVxuICAgKiAgIEFueSBjb250ZXh0IG9iamVjdC5cbiAgICogQHBhcmFtIHt1bmtub3dufSBbdmFsdWVdXG4gICAqICAgQW55IHZhbHVlLlxuICAgKiBAcGFyYW0gey4uLnVua25vd259IHBhcmFtZXRlcnNcbiAgICogICBBcmJpdHJhcnkgcGFyYW1ldGVycyBwYXNzZWQgdG8gdGhlIHp3aXRjaC5cbiAgICogQHByb3BlcnR5IHtIYW5kbGVyfSBpbnZhbGlkXG4gICAqICAgSGFuZGxlIGZvciB2YWx1ZXMgdGhhdCBkbyBub3QgaGF2ZSBhIGNlcnRhaW4gSUQgZmllbGQuXG4gICAqIEBwcm9wZXJ0eSB7SGFuZGxlcn0gdW5rbm93blxuICAgKiAgIEhhbmRsZSB2YWx1ZXMgdGhhdCBkbyBoYXZlIGEgY2VydGFpbiBJRCBmaWVsZCwgYnV0IGl04oCZcyBzZXQgdG8gYSB2YWx1ZVxuICAgKiAgIHRoYXQgaXMgbm90IGxpc3RlZCBpbiB0aGUgYGhhbmRsZXJzYCByZWNvcmQuXG4gICAqIEBwcm9wZXJ0eSB7SGFuZGxlcnN9IGhhbmRsZXJzXG4gICAqICAgUmVjb3JkIG9mIGhhbmRsZXJzLlxuICAgKiBAcmV0dXJucyB7dW5rbm93bn1cbiAgICogICBBbnl0aGluZy5cbiAgICovXG4gIGZ1bmN0aW9uIG9uZSh2YWx1ZSwgLi4ucGFyYW1ldGVycykge1xuICAgIC8qKiBAdHlwZSB7SGFuZGxlcnx1bmRlZmluZWR9ICovXG4gICAgbGV0IGZuID0gb25lLmludmFsaWRcbiAgICBjb25zdCBoYW5kbGVycyA9IG9uZS5oYW5kbGVyc1xuXG4gICAgaWYgKHZhbHVlICYmIG93bi5jYWxsKHZhbHVlLCBrZXkpKSB7XG4gICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIEluZGV4YWJsZS5cbiAgICAgIGNvbnN0IGlkID0gU3RyaW5nKHZhbHVlW2tleV0pXG4gICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIEluZGV4YWJsZS5cbiAgICAgIGZuID0gb3duLmNhbGwoaGFuZGxlcnMsIGlkKSA/IGhhbmRsZXJzW2lkXSA6IG9uZS51bmtub3duXG4gICAgfVxuXG4gICAgaWYgKGZuKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCB2YWx1ZSwgLi4ucGFyYW1ldGVycylcbiAgICB9XG4gIH1cblxuICBvbmUuaGFuZGxlcnMgPSBzZXR0aW5ncy5oYW5kbGVycyB8fCB7fVxuICBvbmUuaW52YWxpZCA9IHNldHRpbmdzLmludmFsaWRcbiAgb25lLnVua25vd24gPSBzZXR0aW5ncy51bmtub3duXG5cbiAgLy8gQHRzLWV4cGVjdC1lcnJvcjogbWF0Y2hlcyFcbiAgcmV0dXJuIG9uZVxufVxuIiwiLyoqXG4gKiBAdHlwZWRlZiBDb3JlT3B0aW9uc1xuICogQHByb3BlcnR5IHtSZWFkb25seUFycmF5PHN0cmluZz59IFtzdWJzZXQ9W11dXG4gKiAgIFdoZXRoZXIgdG8gb25seSBlc2NhcGUgdGhlIGdpdmVuIHN1YnNldCBvZiBjaGFyYWN0ZXJzLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbZXNjYXBlT25seT1mYWxzZV1cbiAqICAgV2hldGhlciB0byBvbmx5IGVzY2FwZSBwb3NzaWJseSBkYW5nZXJvdXMgY2hhcmFjdGVycy5cbiAqICAgVGhvc2UgY2hhcmFjdGVycyBhcmUgYFwiYCwgYCZgLCBgJ2AsIGA8YCwgYD5gLCBhbmQgYGAgYCBgYC5cbiAqXG4gKiBAdHlwZWRlZiBGb3JtYXRPcHRpb25zXG4gKiBAcHJvcGVydHkgeyhjb2RlOiBudW1iZXIsIG5leHQ6IG51bWJlciwgb3B0aW9uczogQ29yZVdpdGhGb3JtYXRPcHRpb25zKSA9PiBzdHJpbmd9IGZvcm1hdFxuICogICBGb3JtYXQgc3RyYXRlZ3kuXG4gKlxuICogQHR5cGVkZWYge0NvcmVPcHRpb25zICYgRm9ybWF0T3B0aW9ucyAmIGltcG9ydCgnLi91dGlsL2Zvcm1hdC1zbWFydC5qcycpLkZvcm1hdFNtYXJ0T3B0aW9uc30gQ29yZVdpdGhGb3JtYXRPcHRpb25zXG4gKi9cblxuY29uc3QgZGVmYXVsdFN1YnNldFJlZ2V4ID0gL1tcIiYnPD5gXS9nXG5jb25zdCBzdXJyb2dhdGVQYWlyc1JlZ2V4ID0gL1tcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl0vZ1xuY29uc3QgY29udHJvbENoYXJhY3RlcnNSZWdleCA9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250cm9sLXJlZ2V4LCB1bmljb3JuL25vLWhleC1lc2NhcGVcbiAgL1tcXHgwMS1cXHRcXHZcXGZcXHgwRS1cXHgxRlxceDdGXFx4ODFcXHg4RFxceDhGXFx4OTBcXHg5RFxceEEwLVxcdUZGRkZdL2dcbmNvbnN0IHJlZ2V4RXNjYXBlUmVnZXggPSAvW3xcXFxce30oKVtcXF1eJCsqPy5dL2dcblxuLyoqIEB0eXBlIHtXZWFrTWFwPFJlYWRvbmx5QXJyYXk8c3RyaW5nPiwgUmVnRXhwPn0gKi9cbmNvbnN0IHN1YnNldFRvUmVnZXhDYWNoZSA9IG5ldyBXZWFrTWFwKClcblxuLyoqXG4gKiBFbmNvZGUgY2VydGFpbiBjaGFyYWN0ZXJzIGluIGB2YWx1ZWAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge0NvcmVXaXRoRm9ybWF0T3B0aW9uc30gb3B0aW9uc1xuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcmUodmFsdWUsIG9wdGlvbnMpIHtcbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFxuICAgIG9wdGlvbnMuc3Vic2V0XG4gICAgICA/IGNoYXJhY3RlcnNUb0V4cHJlc3Npb25DYWNoZWQob3B0aW9ucy5zdWJzZXQpXG4gICAgICA6IGRlZmF1bHRTdWJzZXRSZWdleCxcbiAgICBiYXNpY1xuICApXG5cbiAgaWYgKG9wdGlvbnMuc3Vic2V0IHx8IG9wdGlvbnMuZXNjYXBlT25seSkge1xuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICB2YWx1ZVxuICAgICAgLy8gU3Vycm9nYXRlIHBhaXJzLlxuICAgICAgLnJlcGxhY2Uoc3Vycm9nYXRlUGFpcnNSZWdleCwgc3Vycm9nYXRlKVxuICAgICAgLy8gQk1QIGNvbnRyb2wgY2hhcmFjdGVycyAoQzAgZXhjZXB0IGZvciBMRiwgQ1IsIFNQOyBERUw7IGFuZCBzb21lIG1vcmVcbiAgICAgIC8vIG5vbi1BU0NJSSBvbmVzKS5cbiAgICAgIC5yZXBsYWNlKGNvbnRyb2xDaGFyYWN0ZXJzUmVnZXgsIGJhc2ljKVxuICApXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYWlyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKiBAcGFyYW0ge3N0cmluZ30gYWxsXG4gICAqL1xuICBmdW5jdGlvbiBzdXJyb2dhdGUocGFpciwgaW5kZXgsIGFsbCkge1xuICAgIHJldHVybiBvcHRpb25zLmZvcm1hdChcbiAgICAgIChwYWlyLmNoYXJDb2RlQXQoMCkgLSAweGQ4MDApICogMHg0MDAgK1xuICAgICAgICBwYWlyLmNoYXJDb2RlQXQoMSkgLVxuICAgICAgICAweGRjMDAgK1xuICAgICAgICAweDEwMDAwLFxuICAgICAgYWxsLmNoYXJDb2RlQXQoaW5kZXggKyAyKSxcbiAgICAgIG9wdGlvbnNcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNoYXJhY3RlclxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICogQHBhcmFtIHtzdHJpbmd9IGFsbFxuICAgKi9cbiAgZnVuY3Rpb24gYmFzaWMoY2hhcmFjdGVyLCBpbmRleCwgYWxsKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuZm9ybWF0KFxuICAgICAgY2hhcmFjdGVyLmNoYXJDb2RlQXQoMCksXG4gICAgICBhbGwuY2hhckNvZGVBdChpbmRleCArIDEpLFxuICAgICAgb3B0aW9uc1xuICAgIClcbiAgfVxufVxuXG4vKipcbiAqIEEgd3JhcHBlciBmdW5jdGlvbiB0aGF0IGNhY2hlcyB0aGUgcmVzdWx0IG9mIGBjaGFyYWN0ZXJzVG9FeHByZXNzaW9uYCB3aXRoIGEgV2Vha01hcC5cbiAqIFRoaXMgY2FuIGltcHJvdmUgcGVyZm9ybWFuY2Ugd2hlbiB0b29saW5nIGNhbGxzIGBjaGFyYWN0ZXJzVG9FeHByZXNzaW9uYCByZXBlYXRlZGx5XG4gKiB3aXRoIHRoZSBzYW1lIHN1YnNldC5cbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5QXJyYXk8c3RyaW5nPn0gc3Vic2V0XG4gKiBAcmV0dXJucyB7UmVnRXhwfVxuICovXG5mdW5jdGlvbiBjaGFyYWN0ZXJzVG9FeHByZXNzaW9uQ2FjaGVkKHN1YnNldCkge1xuICBsZXQgY2FjaGVkID0gc3Vic2V0VG9SZWdleENhY2hlLmdldChzdWJzZXQpXG5cbiAgaWYgKCFjYWNoZWQpIHtcbiAgICBjYWNoZWQgPSBjaGFyYWN0ZXJzVG9FeHByZXNzaW9uKHN1YnNldClcbiAgICBzdWJzZXRUb1JlZ2V4Q2FjaGUuc2V0KHN1YnNldCwgY2FjaGVkKVxuICB9XG5cbiAgcmV0dXJuIGNhY2hlZFxufVxuXG4vKipcbiAqIEBwYXJhbSB7UmVhZG9ubHlBcnJheTxzdHJpbmc+fSBzdWJzZXRcbiAqIEByZXR1cm5zIHtSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIGNoYXJhY3RlcnNUb0V4cHJlc3Npb24oc3Vic2V0KSB7XG4gIC8qKiBAdHlwZSB7QXJyYXk8c3RyaW5nPn0gKi9cbiAgY29uc3QgZ3JvdXBzID0gW11cbiAgbGV0IGluZGV4ID0gLTFcblxuICB3aGlsZSAoKytpbmRleCA8IHN1YnNldC5sZW5ndGgpIHtcbiAgICBncm91cHMucHVzaChzdWJzZXRbaW5kZXhdLnJlcGxhY2UocmVnZXhFc2NhcGVSZWdleCwgJ1xcXFwkJicpKVxuICB9XG5cbiAgcmV0dXJuIG5ldyBSZWdFeHAoJyg/OicgKyBncm91cHMuam9pbignfCcpICsgJyknLCAnZycpXG59XG4iLCJjb25zdCBoZXhhZGVjaW1hbFJlZ2V4ID0gL1tcXGRBLUZhLWZdL1xuXG4vKipcbiAqIENvbmZpZ3VyYWJsZSB3YXlzIHRvIGVuY29kZSBjaGFyYWN0ZXJzIGFzIGhleGFkZWNpbWFsIHJlZmVyZW5jZXMuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGNvZGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuZXh0XG4gKiBAcGFyYW0ge2Jvb2xlYW58dW5kZWZpbmVkfSBvbWl0XG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9IZXhhZGVjaW1hbChjb2RlLCBuZXh0LCBvbWl0KSB7XG4gIGNvbnN0IHZhbHVlID0gJyYjeCcgKyBjb2RlLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpXG4gIHJldHVybiBvbWl0ICYmIG5leHQgJiYgIWhleGFkZWNpbWFsUmVnZXgudGVzdChTdHJpbmcuZnJvbUNoYXJDb2RlKG5leHQpKVxuICAgID8gdmFsdWVcbiAgICA6IHZhbHVlICsgJzsnXG59XG4iLCJjb25zdCBkZWNpbWFsUmVnZXggPSAvXFxkL1xuXG4vKipcbiAqIENvbmZpZ3VyYWJsZSB3YXlzIHRvIGVuY29kZSBjaGFyYWN0ZXJzIGFzIGRlY2ltYWwgcmVmZXJlbmNlcy5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gY29kZVxuICogQHBhcmFtIHtudW1iZXJ9IG5leHRcbiAqIEBwYXJhbSB7Ym9vbGVhbnx1bmRlZmluZWR9IG9taXRcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0RlY2ltYWwoY29kZSwgbmV4dCwgb21pdCkge1xuICBjb25zdCB2YWx1ZSA9ICcmIycgKyBTdHJpbmcoY29kZSlcbiAgcmV0dXJuIG9taXQgJiYgbmV4dCAmJiAhZGVjaW1hbFJlZ2V4LnRlc3QoU3RyaW5nLmZyb21DaGFyQ29kZShuZXh0KSlcbiAgICA/IHZhbHVlXG4gICAgOiB2YWx1ZSArICc7J1xufVxuIiwiLyoqXG4gKiBMaXN0IG9mIGxlZ2FjeSBIVE1MIG5hbWVkIGNoYXJhY3RlciByZWZlcmVuY2VzIHRoYXQgZG9u4oCZdCBuZWVkIGEgdHJhaWxpbmcgc2VtaWNvbG9uLlxuICpcbiAqIEB0eXBlIHtBcnJheTxzdHJpbmc+fVxuICovXG5leHBvcnQgY29uc3QgY2hhcmFjdGVyRW50aXRpZXNMZWdhY3kgPSBbXG4gICdBRWxpZycsXG4gICdBTVAnLFxuICAnQWFjdXRlJyxcbiAgJ0FjaXJjJyxcbiAgJ0FncmF2ZScsXG4gICdBcmluZycsXG4gICdBdGlsZGUnLFxuICAnQXVtbCcsXG4gICdDT1BZJyxcbiAgJ0NjZWRpbCcsXG4gICdFVEgnLFxuICAnRWFjdXRlJyxcbiAgJ0VjaXJjJyxcbiAgJ0VncmF2ZScsXG4gICdFdW1sJyxcbiAgJ0dUJyxcbiAgJ0lhY3V0ZScsXG4gICdJY2lyYycsXG4gICdJZ3JhdmUnLFxuICAnSXVtbCcsXG4gICdMVCcsXG4gICdOdGlsZGUnLFxuICAnT2FjdXRlJyxcbiAgJ09jaXJjJyxcbiAgJ09ncmF2ZScsXG4gICdPc2xhc2gnLFxuICAnT3RpbGRlJyxcbiAgJ091bWwnLFxuICAnUVVPVCcsXG4gICdSRUcnLFxuICAnVEhPUk4nLFxuICAnVWFjdXRlJyxcbiAgJ1VjaXJjJyxcbiAgJ1VncmF2ZScsXG4gICdVdW1sJyxcbiAgJ1lhY3V0ZScsXG4gICdhYWN1dGUnLFxuICAnYWNpcmMnLFxuICAnYWN1dGUnLFxuICAnYWVsaWcnLFxuICAnYWdyYXZlJyxcbiAgJ2FtcCcsXG4gICdhcmluZycsXG4gICdhdGlsZGUnLFxuICAnYXVtbCcsXG4gICdicnZiYXInLFxuICAnY2NlZGlsJyxcbiAgJ2NlZGlsJyxcbiAgJ2NlbnQnLFxuICAnY29weScsXG4gICdjdXJyZW4nLFxuICAnZGVnJyxcbiAgJ2RpdmlkZScsXG4gICdlYWN1dGUnLFxuICAnZWNpcmMnLFxuICAnZWdyYXZlJyxcbiAgJ2V0aCcsXG4gICdldW1sJyxcbiAgJ2ZyYWMxMicsXG4gICdmcmFjMTQnLFxuICAnZnJhYzM0JyxcbiAgJ2d0JyxcbiAgJ2lhY3V0ZScsXG4gICdpY2lyYycsXG4gICdpZXhjbCcsXG4gICdpZ3JhdmUnLFxuICAnaXF1ZXN0JyxcbiAgJ2l1bWwnLFxuICAnbGFxdW8nLFxuICAnbHQnLFxuICAnbWFjcicsXG4gICdtaWNybycsXG4gICdtaWRkb3QnLFxuICAnbmJzcCcsXG4gICdub3QnLFxuICAnbnRpbGRlJyxcbiAgJ29hY3V0ZScsXG4gICdvY2lyYycsXG4gICdvZ3JhdmUnLFxuICAnb3JkZicsXG4gICdvcmRtJyxcbiAgJ29zbGFzaCcsXG4gICdvdGlsZGUnLFxuICAnb3VtbCcsXG4gICdwYXJhJyxcbiAgJ3BsdXNtbicsXG4gICdwb3VuZCcsXG4gICdxdW90JyxcbiAgJ3JhcXVvJyxcbiAgJ3JlZycsXG4gICdzZWN0JyxcbiAgJ3NoeScsXG4gICdzdXAxJyxcbiAgJ3N1cDInLFxuICAnc3VwMycsXG4gICdzemxpZycsXG4gICd0aG9ybicsXG4gICd0aW1lcycsXG4gICd1YWN1dGUnLFxuICAndWNpcmMnLFxuICAndWdyYXZlJyxcbiAgJ3VtbCcsXG4gICd1dW1sJyxcbiAgJ3lhY3V0ZScsXG4gICd5ZW4nLFxuICAneXVtbCdcbl1cbiIsIi8qKlxuICogTWFwIG9mIG5hbWVkIGNoYXJhY3RlciByZWZlcmVuY2VzIGZyb20gSFRNTCA0LlxuICpcbiAqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+fVxuICovXG5leHBvcnQgY29uc3QgY2hhcmFjdGVyRW50aXRpZXNIdG1sNCA9IHtcbiAgbmJzcDogJ8KgJyxcbiAgaWV4Y2w6ICfCoScsXG4gIGNlbnQ6ICfCoicsXG4gIHBvdW5kOiAnwqMnLFxuICBjdXJyZW46ICfCpCcsXG4gIHllbjogJ8KlJyxcbiAgYnJ2YmFyOiAnwqYnLFxuICBzZWN0OiAnwqcnLFxuICB1bWw6ICfCqCcsXG4gIGNvcHk6ICfCqScsXG4gIG9yZGY6ICfCqicsXG4gIGxhcXVvOiAnwqsnLFxuICBub3Q6ICfCrCcsXG4gIHNoeTogJ8KtJyxcbiAgcmVnOiAnwq4nLFxuICBtYWNyOiAnwq8nLFxuICBkZWc6ICfCsCcsXG4gIHBsdXNtbjogJ8KxJyxcbiAgc3VwMjogJ8KyJyxcbiAgc3VwMzogJ8KzJyxcbiAgYWN1dGU6ICfCtCcsXG4gIG1pY3JvOiAnwrUnLFxuICBwYXJhOiAnwrYnLFxuICBtaWRkb3Q6ICfCtycsXG4gIGNlZGlsOiAnwrgnLFxuICBzdXAxOiAnwrknLFxuICBvcmRtOiAnwronLFxuICByYXF1bzogJ8K7JyxcbiAgZnJhYzE0OiAnwrwnLFxuICBmcmFjMTI6ICfCvScsXG4gIGZyYWMzNDogJ8K+JyxcbiAgaXF1ZXN0OiAnwr8nLFxuICBBZ3JhdmU6ICfDgCcsXG4gIEFhY3V0ZTogJ8OBJyxcbiAgQWNpcmM6ICfDgicsXG4gIEF0aWxkZTogJ8ODJyxcbiAgQXVtbDogJ8OEJyxcbiAgQXJpbmc6ICfDhScsXG4gIEFFbGlnOiAnw4YnLFxuICBDY2VkaWw6ICfDhycsXG4gIEVncmF2ZTogJ8OIJyxcbiAgRWFjdXRlOiAnw4knLFxuICBFY2lyYzogJ8OKJyxcbiAgRXVtbDogJ8OLJyxcbiAgSWdyYXZlOiAnw4wnLFxuICBJYWN1dGU6ICfDjScsXG4gIEljaXJjOiAnw44nLFxuICBJdW1sOiAnw48nLFxuICBFVEg6ICfDkCcsXG4gIE50aWxkZTogJ8ORJyxcbiAgT2dyYXZlOiAnw5InLFxuICBPYWN1dGU6ICfDkycsXG4gIE9jaXJjOiAnw5QnLFxuICBPdGlsZGU6ICfDlScsXG4gIE91bWw6ICfDlicsXG4gIHRpbWVzOiAnw5cnLFxuICBPc2xhc2g6ICfDmCcsXG4gIFVncmF2ZTogJ8OZJyxcbiAgVWFjdXRlOiAnw5onLFxuICBVY2lyYzogJ8ObJyxcbiAgVXVtbDogJ8OcJyxcbiAgWWFjdXRlOiAnw50nLFxuICBUSE9STjogJ8OeJyxcbiAgc3psaWc6ICfDnycsXG4gIGFncmF2ZTogJ8OgJyxcbiAgYWFjdXRlOiAnw6EnLFxuICBhY2lyYzogJ8OiJyxcbiAgYXRpbGRlOiAnw6MnLFxuICBhdW1sOiAnw6QnLFxuICBhcmluZzogJ8OlJyxcbiAgYWVsaWc6ICfDpicsXG4gIGNjZWRpbDogJ8OnJyxcbiAgZWdyYXZlOiAnw6gnLFxuICBlYWN1dGU6ICfDqScsXG4gIGVjaXJjOiAnw6onLFxuICBldW1sOiAnw6snLFxuICBpZ3JhdmU6ICfDrCcsXG4gIGlhY3V0ZTogJ8OtJyxcbiAgaWNpcmM6ICfDricsXG4gIGl1bWw6ICfDrycsXG4gIGV0aDogJ8OwJyxcbiAgbnRpbGRlOiAnw7EnLFxuICBvZ3JhdmU6ICfDsicsXG4gIG9hY3V0ZTogJ8OzJyxcbiAgb2NpcmM6ICfDtCcsXG4gIG90aWxkZTogJ8O1JyxcbiAgb3VtbDogJ8O2JyxcbiAgZGl2aWRlOiAnw7cnLFxuICBvc2xhc2g6ICfDuCcsXG4gIHVncmF2ZTogJ8O5JyxcbiAgdWFjdXRlOiAnw7onLFxuICB1Y2lyYzogJ8O7JyxcbiAgdXVtbDogJ8O8JyxcbiAgeWFjdXRlOiAnw70nLFxuICB0aG9ybjogJ8O+JyxcbiAgeXVtbDogJ8O/JyxcbiAgZm5vZjogJ8aSJyxcbiAgQWxwaGE6ICfOkScsXG4gIEJldGE6ICfOkicsXG4gIEdhbW1hOiAnzpMnLFxuICBEZWx0YTogJ86UJyxcbiAgRXBzaWxvbjogJ86VJyxcbiAgWmV0YTogJ86WJyxcbiAgRXRhOiAnzpcnLFxuICBUaGV0YTogJ86YJyxcbiAgSW90YTogJ86ZJyxcbiAgS2FwcGE6ICfOmicsXG4gIExhbWJkYTogJ86bJyxcbiAgTXU6ICfOnCcsXG4gIE51OiAnzp0nLFxuICBYaTogJ86eJyxcbiAgT21pY3JvbjogJ86fJyxcbiAgUGk6ICfOoCcsXG4gIFJobzogJ86hJyxcbiAgU2lnbWE6ICfOoycsXG4gIFRhdTogJ86kJyxcbiAgVXBzaWxvbjogJ86lJyxcbiAgUGhpOiAnzqYnLFxuICBDaGk6ICfOpycsXG4gIFBzaTogJ86oJyxcbiAgT21lZ2E6ICfOqScsXG4gIGFscGhhOiAnzrEnLFxuICBiZXRhOiAnzrInLFxuICBnYW1tYTogJ86zJyxcbiAgZGVsdGE6ICfOtCcsXG4gIGVwc2lsb246ICfOtScsXG4gIHpldGE6ICfOticsXG4gIGV0YTogJ863JyxcbiAgdGhldGE6ICfOuCcsXG4gIGlvdGE6ICfOuScsXG4gIGthcHBhOiAnzronLFxuICBsYW1iZGE6ICfOuycsXG4gIG11OiAnzrwnLFxuICBudTogJ869JyxcbiAgeGk6ICfOvicsXG4gIG9taWNyb246ICfOvycsXG4gIHBpOiAnz4AnLFxuICByaG86ICfPgScsXG4gIHNpZ21hZjogJ8+CJyxcbiAgc2lnbWE6ICfPgycsXG4gIHRhdTogJ8+EJyxcbiAgdXBzaWxvbjogJ8+FJyxcbiAgcGhpOiAnz4YnLFxuICBjaGk6ICfPhycsXG4gIHBzaTogJ8+IJyxcbiAgb21lZ2E6ICfPiScsXG4gIHRoZXRhc3ltOiAnz5EnLFxuICB1cHNpaDogJ8+SJyxcbiAgcGl2OiAnz5YnLFxuICBidWxsOiAn4oCiJyxcbiAgaGVsbGlwOiAn4oCmJyxcbiAgcHJpbWU6ICfigLInLFxuICBQcmltZTogJ+KAsycsXG4gIG9saW5lOiAn4oC+JyxcbiAgZnJhc2w6ICfigYQnLFxuICB3ZWllcnA6ICfihJgnLFxuICBpbWFnZTogJ+KEkScsXG4gIHJlYWw6ICfihJwnLFxuICB0cmFkZTogJ+KEoicsXG4gIGFsZWZzeW06ICfihLUnLFxuICBsYXJyOiAn4oaQJyxcbiAgdWFycjogJ+KGkScsXG4gIHJhcnI6ICfihpInLFxuICBkYXJyOiAn4oaTJyxcbiAgaGFycjogJ+KGlCcsXG4gIGNyYXJyOiAn4oa1JyxcbiAgbEFycjogJ+KHkCcsXG4gIHVBcnI6ICfih5EnLFxuICByQXJyOiAn4oeSJyxcbiAgZEFycjogJ+KHkycsXG4gIGhBcnI6ICfih5QnLFxuICBmb3JhbGw6ICfiiIAnLFxuICBwYXJ0OiAn4oiCJyxcbiAgZXhpc3Q6ICfiiIMnLFxuICBlbXB0eTogJ+KIhScsXG4gIG5hYmxhOiAn4oiHJyxcbiAgaXNpbjogJ+KIiCcsXG4gIG5vdGluOiAn4oiJJyxcbiAgbmk6ICfiiIsnLFxuICBwcm9kOiAn4oiPJyxcbiAgc3VtOiAn4oiRJyxcbiAgbWludXM6ICfiiJInLFxuICBsb3dhc3Q6ICfiiJcnLFxuICByYWRpYzogJ+KImicsXG4gIHByb3A6ICfiiJ0nLFxuICBpbmZpbjogJ+KInicsXG4gIGFuZzogJ+KIoCcsXG4gIGFuZDogJ+KIpycsXG4gIG9yOiAn4oioJyxcbiAgY2FwOiAn4oipJyxcbiAgY3VwOiAn4oiqJyxcbiAgaW50OiAn4oirJyxcbiAgdGhlcmU0OiAn4oi0JyxcbiAgc2ltOiAn4oi8JyxcbiAgY29uZzogJ+KJhScsXG4gIGFzeW1wOiAn4omIJyxcbiAgbmU6ICfiiaAnLFxuICBlcXVpdjogJ+KJoScsXG4gIGxlOiAn4omkJyxcbiAgZ2U6ICfiiaUnLFxuICBzdWI6ICfiioInLFxuICBzdXA6ICfiioMnLFxuICBuc3ViOiAn4oqEJyxcbiAgc3ViZTogJ+KKhicsXG4gIHN1cGU6ICfiiocnLFxuICBvcGx1czogJ+KKlScsXG4gIG90aW1lczogJ+KKlycsXG4gIHBlcnA6ICfiiqUnLFxuICBzZG90OiAn4ouFJyxcbiAgbGNlaWw6ICfijIgnLFxuICByY2VpbDogJ+KMiScsXG4gIGxmbG9vcjogJ+KMiicsXG4gIHJmbG9vcjogJ+KMiycsXG4gIGxhbmc6ICfijKknLFxuICByYW5nOiAn4oyqJyxcbiAgbG96OiAn4peKJyxcbiAgc3BhZGVzOiAn4pmgJyxcbiAgY2x1YnM6ICfimaMnLFxuICBoZWFydHM6ICfimaUnLFxuICBkaWFtczogJ+KZpicsXG4gIHF1b3Q6ICdcIicsXG4gIGFtcDogJyYnLFxuICBsdDogJzwnLFxuICBndDogJz4nLFxuICBPRWxpZzogJ8WSJyxcbiAgb2VsaWc6ICfFkycsXG4gIFNjYXJvbjogJ8WgJyxcbiAgc2Nhcm9uOiAnxaEnLFxuICBZdW1sOiAnxbgnLFxuICBjaXJjOiAny4YnLFxuICB0aWxkZTogJ8ucJyxcbiAgZW5zcDogJ+KAgicsXG4gIGVtc3A6ICfigIMnLFxuICB0aGluc3A6ICfigIknLFxuICB6d25qOiAn4oCMJyxcbiAgendqOiAn4oCNJyxcbiAgbHJtOiAn4oCOJyxcbiAgcmxtOiAn4oCPJyxcbiAgbmRhc2g6ICfigJMnLFxuICBtZGFzaDogJ+KAlCcsXG4gIGxzcXVvOiAn4oCYJyxcbiAgcnNxdW86ICfigJknLFxuICBzYnF1bzogJ+KAmicsXG4gIGxkcXVvOiAn4oCcJyxcbiAgcmRxdW86ICfigJ0nLFxuICBiZHF1bzogJ+KAnicsXG4gIGRhZ2dlcjogJ+KAoCcsXG4gIERhZ2dlcjogJ+KAoScsXG4gIHBlcm1pbDogJ+KAsCcsXG4gIGxzYXF1bzogJ+KAuScsXG4gIHJzYXF1bzogJ+KAuicsXG4gIGV1cm86ICfigqwnXG59XG4iLCIvKipcbiAqIExpc3Qgb2YgbGVnYWN5ICh0aGF0IGRvbuKAmXQgbmVlZCBhIHRyYWlsaW5nIGA7YCkgbmFtZWQgcmVmZXJlbmNlcyB3aGljaCBjb3VsZCxcbiAqIGRlcGVuZGluZyBvbiB3aGF0IGZvbGxvd3MgdGhlbSwgdHVybiBpbnRvIGEgZGlmZmVyZW50IG1lYW5pbmdcbiAqXG4gKiBAdHlwZSB7QXJyYXk8c3RyaW5nPn1cbiAqL1xuZXhwb3J0IGNvbnN0IGRhbmdlcm91cyA9IFtcbiAgJ2NlbnQnLFxuICAnY29weScsXG4gICdkaXZpZGUnLFxuICAnZ3QnLFxuICAnbHQnLFxuICAnbm90JyxcbiAgJ3BhcmEnLFxuICAndGltZXMnXG5dXG4iLCJpbXBvcnQge2NoYXJhY3RlckVudGl0aWVzTGVnYWN5fSBmcm9tICdjaGFyYWN0ZXItZW50aXRpZXMtbGVnYWN5J1xuaW1wb3J0IHtjaGFyYWN0ZXJFbnRpdGllc0h0bWw0fSBmcm9tICdjaGFyYWN0ZXItZW50aXRpZXMtaHRtbDQnXG5pbXBvcnQge2Rhbmdlcm91c30gZnJvbSAnLi4vY29uc3RhbnQvZGFuZ2Vyb3VzLmpzJ1xuXG5jb25zdCBvd24gPSB7fS5oYXNPd25Qcm9wZXJ0eVxuXG4vKipcbiAqIGBjaGFyYWN0ZXJFbnRpdGllc0h0bWw0YCBidXQgaW52ZXJ0ZWQuXG4gKlxuICogQHR5cGUge1JlY29yZDxzdHJpbmcsIHN0cmluZz59XG4gKi9cbmNvbnN0IGNoYXJhY3RlcnMgPSB7fVxuXG4vKiogQHR5cGUge3N0cmluZ30gKi9cbmxldCBrZXlcblxuZm9yIChrZXkgaW4gY2hhcmFjdGVyRW50aXRpZXNIdG1sNCkge1xuICBpZiAob3duLmNhbGwoY2hhcmFjdGVyRW50aXRpZXNIdG1sNCwga2V5KSkge1xuICAgIGNoYXJhY3RlcnNbY2hhcmFjdGVyRW50aXRpZXNIdG1sNFtrZXldXSA9IGtleVxuICB9XG59XG5cbmNvbnN0IG5vdEFscGhhbnVtZXJpY1JlZ2V4ID0gL1teXFxkQS1aYS16XS9cblxuLyoqXG4gKiBDb25maWd1cmFibGUgd2F5cyB0byBlbmNvZGUgY2hhcmFjdGVycyBhcyBuYW1lZCByZWZlcmVuY2VzLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2RlXG4gKiBAcGFyYW0ge251bWJlcn0gbmV4dFxuICogQHBhcmFtIHtib29sZWFufHVuZGVmaW5lZH0gb21pdFxuICogQHBhcmFtIHtib29sZWFufHVuZGVmaW5lZH0gYXR0cmlidXRlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9OYW1lZChjb2RlLCBuZXh0LCBvbWl0LCBhdHRyaWJ1dGUpIHtcbiAgY29uc3QgY2hhcmFjdGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKVxuXG4gIGlmIChvd24uY2FsbChjaGFyYWN0ZXJzLCBjaGFyYWN0ZXIpKSB7XG4gICAgY29uc3QgbmFtZSA9IGNoYXJhY3RlcnNbY2hhcmFjdGVyXVxuICAgIGNvbnN0IHZhbHVlID0gJyYnICsgbmFtZVxuXG4gICAgaWYgKFxuICAgICAgb21pdCAmJlxuICAgICAgY2hhcmFjdGVyRW50aXRpZXNMZWdhY3kuaW5jbHVkZXMobmFtZSkgJiZcbiAgICAgICFkYW5nZXJvdXMuaW5jbHVkZXMobmFtZSkgJiZcbiAgICAgICghYXR0cmlidXRlIHx8XG4gICAgICAgIChuZXh0ICYmXG4gICAgICAgICAgbmV4dCAhPT0gNjEgLyogYD1gICovICYmXG4gICAgICAgICAgbm90QWxwaGFudW1lcmljUmVnZXgudGVzdChTdHJpbmcuZnJvbUNoYXJDb2RlKG5leHQpKSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWUgKyAnOydcbiAgfVxuXG4gIHJldHVybiAnJ1xufVxuIiwiLyoqXG4gKiBAdHlwZWRlZiBGb3JtYXRTbWFydE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3VzZU5hbWVkUmVmZXJlbmNlcz1mYWxzZV1cbiAqICAgUHJlZmVyIG5hbWVkIGNoYXJhY3RlciByZWZlcmVuY2VzIChgJmFtcDtgKSB3aGVyZSBwb3NzaWJsZS5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3VzZVNob3J0ZXN0UmVmZXJlbmNlcz1mYWxzZV1cbiAqICAgUHJlZmVyIHRoZSBzaG9ydGVzdCBwb3NzaWJsZSByZWZlcmVuY2UsIGlmIHRoYXQgcmVzdWx0cyBpbiBsZXNzIGJ5dGVzLlxuICogICAqKk5vdGUqKjogYHVzZU5hbWVkUmVmZXJlbmNlc2AgY2FuIGJlIG9taXR0ZWQgd2hlbiB1c2luZyBgdXNlU2hvcnRlc3RSZWZlcmVuY2VzYC5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW29taXRPcHRpb25hbFNlbWljb2xvbnM9ZmFsc2VdXG4gKiAgIFdoZXRoZXIgdG8gb21pdCBzZW1pY29sb25zIHdoZW4gcG9zc2libGUuXG4gKiAgICoqTm90ZSoqOiBUaGlzIGNyZWF0ZXMgd2hhdCBIVE1MIGNhbGxzIOKAnHBhcnNlIGVycm9yc+KAnSBidXQgaXMgb3RoZXJ3aXNlIHN0aWxsIHZhbGlkIEhUTUwg4oCUIGRvbuKAmXQgdXNlIHRoaXMgZXhjZXB0IHdoZW4gYnVpbGRpbmcgYSBtaW5pZmllci5cbiAqICAgT21pdHRpbmcgc2VtaWNvbG9ucyBpcyBwb3NzaWJsZSBmb3IgY2VydGFpbiBuYW1lZCBhbmQgbnVtZXJpYyByZWZlcmVuY2VzIGluIHNvbWUgY2FzZXMuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFthdHRyaWJ1dGU9ZmFsc2VdXG4gKiAgIENyZWF0ZSBjaGFyYWN0ZXIgcmVmZXJlbmNlcyB3aGljaCBkb27igJl0IGZhaWwgaW4gYXR0cmlidXRlcy5cbiAqICAgKipOb3RlKio6IGBhdHRyaWJ1dGVgIG9ubHkgYXBwbGllcyB3aGVuIG9wZXJhdGluZyBkYW5nZXJvdXNseSB3aXRoXG4gKiAgIGBvbWl0T3B0aW9uYWxTZW1pY29sb25zOiB0cnVlYC5cbiAqL1xuXG5pbXBvcnQge3RvSGV4YWRlY2ltYWx9IGZyb20gJy4vdG8taGV4YWRlY2ltYWwuanMnXG5pbXBvcnQge3RvRGVjaW1hbH0gZnJvbSAnLi90by1kZWNpbWFsLmpzJ1xuaW1wb3J0IHt0b05hbWVkfSBmcm9tICcuL3RvLW5hbWVkLmpzJ1xuXG4vKipcbiAqIENvbmZpZ3VyYWJsZSB3YXlzIHRvIGVuY29kZSBhIGNoYXJhY3RlciB5aWVsZGluZyBwcmV0dHkgb3Igc21hbGwgcmVzdWx0cy5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gY29kZVxuICogQHBhcmFtIHtudW1iZXJ9IG5leHRcbiAqIEBwYXJhbSB7Rm9ybWF0U21hcnRPcHRpb25zfSBvcHRpb25zXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0U21hcnQoY29kZSwgbmV4dCwgb3B0aW9ucykge1xuICBsZXQgbnVtZXJpYyA9IHRvSGV4YWRlY2ltYWwoY29kZSwgbmV4dCwgb3B0aW9ucy5vbWl0T3B0aW9uYWxTZW1pY29sb25zKVxuICAvKiogQHR5cGUge3N0cmluZ3x1bmRlZmluZWR9ICovXG4gIGxldCBuYW1lZFxuXG4gIGlmIChvcHRpb25zLnVzZU5hbWVkUmVmZXJlbmNlcyB8fCBvcHRpb25zLnVzZVNob3J0ZXN0UmVmZXJlbmNlcykge1xuICAgIG5hbWVkID0gdG9OYW1lZChcbiAgICAgIGNvZGUsXG4gICAgICBuZXh0LFxuICAgICAgb3B0aW9ucy5vbWl0T3B0aW9uYWxTZW1pY29sb25zLFxuICAgICAgb3B0aW9ucy5hdHRyaWJ1dGVcbiAgICApXG4gIH1cblxuICAvLyBVc2UgdGhlIHNob3J0ZXN0IG51bWVyaWMgcmVmZXJlbmNlIHdoZW4gcmVxdWVzdGVkLlxuICAvLyBBIHNpbXBsZSBhbGdvcml0aG0gd291bGQgdXNlIGRlY2ltYWwgZm9yIGFsbCBjb2RlIHBvaW50cyB1bmRlciAxMDAsIGFzXG4gIC8vIHRob3NlIGFyZSBzaG9ydGVyIHRoYW4gaGV4YWRlY2ltYWw6XG4gIC8vXG4gIC8vICogYCYjOTk7YCB2cyBgJiN4NjM7YCAoZGVjaW1hbCBzaG9ydGVyKVxuICAvLyAqIGAmIzEwMDtgIHZzIGAmI3g2NDtgIChlcXVhbClcbiAgLy9cbiAgLy8gSG93ZXZlciwgYmVjYXVzZSB3ZSB0YWtlIGBuZXh0YCBpbnRvIGNvbnNpZGVyYXRpb24gd2hlbiBgb21pdGAgaXMgdXNlZCxcbiAgLy8gQW5kIGl0IHdvdWxkIGJlIHBvc3NpYmxlIHRoYXQgZGVjaW1hbHMgYXJlIHNob3J0ZXIgb24gYmlnZ2VyIHZhbHVlcyBhc1xuICAvLyB3ZWxsIGlmIGBuZXh0YCBpcyBoZXhhZGVjaW1hbCBidXQgbm90IGRlY2ltYWwsIHdlIGluc3RlYWQgY29tcGFyZSBib3RoLlxuICBpZiAoXG4gICAgKG9wdGlvbnMudXNlU2hvcnRlc3RSZWZlcmVuY2VzIHx8ICFuYW1lZCkgJiZcbiAgICBvcHRpb25zLnVzZVNob3J0ZXN0UmVmZXJlbmNlc1xuICApIHtcbiAgICBjb25zdCBkZWNpbWFsID0gdG9EZWNpbWFsKGNvZGUsIG5leHQsIG9wdGlvbnMub21pdE9wdGlvbmFsU2VtaWNvbG9ucylcblxuICAgIGlmIChkZWNpbWFsLmxlbmd0aCA8IG51bWVyaWMubGVuZ3RoKSB7XG4gICAgICBudW1lcmljID0gZGVjaW1hbFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuYW1lZCAmJlxuICAgICghb3B0aW9ucy51c2VTaG9ydGVzdFJlZmVyZW5jZXMgfHwgbmFtZWQubGVuZ3RoIDwgbnVtZXJpYy5sZW5ndGgpXG4gICAgPyBuYW1lZFxuICAgIDogbnVtZXJpY1xufVxuIiwiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2NvcmUuanMnKS5Db3JlT3B0aW9ucyAmIGltcG9ydCgnLi91dGlsL2Zvcm1hdC1zbWFydC5qcycpLkZvcm1hdFNtYXJ0T3B0aW9uc30gT3B0aW9uc1xuICogQHR5cGVkZWYge2ltcG9ydCgnLi9jb3JlLmpzJykuQ29yZU9wdGlvbnN9IExpZ2h0T3B0aW9uc1xuICovXG5cbmltcG9ydCB7Y29yZX0gZnJvbSAnLi9jb3JlLmpzJ1xuaW1wb3J0IHtmb3JtYXRTbWFydH0gZnJvbSAnLi91dGlsL2Zvcm1hdC1zbWFydC5qcydcbmltcG9ydCB7Zm9ybWF0QmFzaWN9IGZyb20gJy4vdXRpbC9mb3JtYXQtYmFzaWMuanMnXG5cbi8qKlxuICogRW5jb2RlIHNwZWNpYWwgY2hhcmFjdGVycyBpbiBgdmFsdWVgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogICBWYWx1ZSB0byBlbmNvZGUuXG4gKiBAcGFyYW0ge09wdGlvbnN9IFtvcHRpb25zXVxuICogICBDb25maWd1cmF0aW9uLlxuICogQHJldHVybnMge3N0cmluZ31cbiAqICAgRW5jb2RlZCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeUVudGl0aWVzKHZhbHVlLCBvcHRpb25zKSB7XG4gIHJldHVybiBjb3JlKHZhbHVlLCBPYmplY3QuYXNzaWduKHtmb3JtYXQ6IGZvcm1hdFNtYXJ0fSwgb3B0aW9ucykpXG59XG5cbi8qKlxuICogRW5jb2RlIHNwZWNpYWwgY2hhcmFjdGVycyBpbiBgdmFsdWVgIGFzIGhleGFkZWNpbWFscy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqICAgVmFsdWUgdG8gZW5jb2RlLlxuICogQHBhcmFtIHtMaWdodE9wdGlvbnN9IFtvcHRpb25zXVxuICogICBDb25maWd1cmF0aW9uLlxuICogQHJldHVybnMge3N0cmluZ31cbiAqICAgRW5jb2RlZCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeUVudGl0aWVzTGlnaHQodmFsdWUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGNvcmUodmFsdWUsIE9iamVjdC5hc3NpZ24oe2Zvcm1hdDogZm9ybWF0QmFzaWN9LCBvcHRpb25zKSlcbn1cbiIsIi8qKlxuICogQGltcG9ydCB7Q29tbWVudCwgUGFyZW50c30gZnJvbSAnaGFzdCdcbiAqIEBpbXBvcnQge1N0YXRlfSBmcm9tICcuLi9pbmRleC5qcydcbiAqL1xuXG5pbXBvcnQge3N0cmluZ2lmeUVudGl0aWVzfSBmcm9tICdzdHJpbmdpZnktZW50aXRpZXMnXG5cbmNvbnN0IGh0bWxDb21tZW50UmVnZXggPSAvXj58Xi0+fDwhLS18LS0+fC0tIT58PCEtJC9nXG5cbi8vIERlY2xhcmUgYXJyYXlzIGFzIHZhcmlhYmxlcyBzbyBpdCBjYW4gYmUgY2FjaGVkIGJ5IGBzdHJpbmdpZnlFbnRpdGllc2BcbmNvbnN0IGJvZ3VzQ29tbWVudEVudGl0eVN1YnNldCA9IFsnPiddXG5jb25zdCBjb21tZW50RW50aXR5U3Vic2V0ID0gWyc8JywgJz4nXVxuXG4vKipcbiAqIFNlcmlhbGl6ZSBhIGNvbW1lbnQuXG4gKlxuICogQHBhcmFtIHtDb21tZW50fSBub2RlXG4gKiAgIE5vZGUgdG8gaGFuZGxlLlxuICogQHBhcmFtIHtudW1iZXIgfCB1bmRlZmluZWR9IF8xXG4gKiAgIEluZGV4IG9mIGBub2RlYCBpbiBgcGFyZW50LlxuICogQHBhcmFtIHtQYXJlbnRzIHwgdW5kZWZpbmVkfSBfMlxuICogICBQYXJlbnQgb2YgYG5vZGVgLlxuICogQHBhcmFtIHtTdGF0ZX0gc3RhdGVcbiAqICAgSW5mbyBwYXNzZWQgYXJvdW5kIGFib3V0IHRoZSBjdXJyZW50IHN0YXRlLlxuICogQHJldHVybnMge3N0cmluZ31cbiAqICAgU2VyaWFsaXplZCBub2RlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tbWVudChub2RlLCBfMSwgXzIsIHN0YXRlKSB7XG4gIC8vIFNlZTogPGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3N5bnRheC5odG1sI2NvbW1lbnRzPlxuICByZXR1cm4gc3RhdGUuc2V0dGluZ3MuYm9ndXNDb21tZW50c1xuICAgID8gJzw/JyArXG4gICAgICAgIHN0cmluZ2lmeUVudGl0aWVzKFxuICAgICAgICAgIG5vZGUudmFsdWUsXG4gICAgICAgICAgT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuc2V0dGluZ3MuY2hhcmFjdGVyUmVmZXJlbmNlcywge1xuICAgICAgICAgICAgc3Vic2V0OiBib2d1c0NvbW1lbnRFbnRpdHlTdWJzZXRcbiAgICAgICAgICB9KVxuICAgICAgICApICtcbiAgICAgICAgJz4nXG4gICAgOiAnPCEtLScgKyBub2RlLnZhbHVlLnJlcGxhY2UoaHRtbENvbW1lbnRSZWdleCwgZW5jb2RlKSArICctLT4nXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAkMFxuICAgKi9cbiAgZnVuY3Rpb24gZW5jb2RlKCQwKSB7XG4gICAgcmV0dXJuIHN0cmluZ2lmeUVudGl0aWVzKFxuICAgICAgJDAsXG4gICAgICBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zZXR0aW5ncy5jaGFyYWN0ZXJSZWZlcmVuY2VzLCB7XG4gICAgICAgIHN1YnNldDogY29tbWVudEVudGl0eVN1YnNldFxuICAgICAgfSlcbiAgICApXG4gIH1cbn1cbiIsIi8qKlxuICogQGltcG9ydCB7RG9jdHlwZSwgUGFyZW50c30gZnJvbSAnaGFzdCdcbiAqIEBpbXBvcnQge1N0YXRlfSBmcm9tICcuLi9pbmRleC5qcydcbiAqL1xuXG4vKipcbiAqIFNlcmlhbGl6ZSBhIGRvY3R5cGUuXG4gKlxuICogQHBhcmFtIHtEb2N0eXBlfSBfMVxuICogICBOb2RlIHRvIGhhbmRsZS5cbiAqIEBwYXJhbSB7bnVtYmVyIHwgdW5kZWZpbmVkfSBfMlxuICogICBJbmRleCBvZiBgbm9kZWAgaW4gYHBhcmVudC5cbiAqIEBwYXJhbSB7UGFyZW50cyB8IHVuZGVmaW5lZH0gXzNcbiAqICAgUGFyZW50IG9mIGBub2RlYC5cbiAqIEBwYXJhbSB7U3RhdGV9IHN0YXRlXG4gKiAgIEluZm8gcGFzc2VkIGFyb3VuZCBhYm91dCB0aGUgY3VycmVudCBzdGF0ZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiAgIFNlcmlhbGl6ZWQgbm9kZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRvY3R5cGUoXzEsIF8yLCBfMywgc3RhdGUpIHtcbiAgcmV0dXJuIChcbiAgICAnPCEnICtcbiAgICAoc3RhdGUuc2V0dGluZ3MudXBwZXJEb2N0eXBlID8gJ0RPQ1RZUEUnIDogJ2RvY3R5cGUnKSArXG4gICAgKHN0YXRlLnNldHRpbmdzLnRpZ2h0RG9jdHlwZSA/ICcnIDogJyAnKSArXG4gICAgJ2h0bWw+J1xuICApXG59XG4iLCIvKipcbiAqIENvdW50IGhvdyBvZnRlbiBhIGNoYXJhY3RlciAob3Igc3Vic3RyaW5nKSBpcyB1c2VkIGluIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogICBWYWx1ZSB0byBzZWFyY2ggaW4uXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hhcmFjdGVyXG4gKiAgIENoYXJhY3RlciAob3Igc3Vic3RyaW5nKSB0byBsb29rIGZvci5cbiAqIEByZXR1cm4ge251bWJlcn1cbiAqICAgTnVtYmVyIG9mIHRpbWVzIGBjaGFyYWN0ZXJgIG9jY3VycmVkIGluIGB2YWx1ZWAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjY291bnQodmFsdWUsIGNoYXJhY3Rlcikge1xuICBjb25zdCBzb3VyY2UgPSBTdHJpbmcodmFsdWUpXG5cbiAgaWYgKHR5cGVvZiBjaGFyYWN0ZXIgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgY2hhcmFjdGVyJylcbiAgfVxuXG4gIGxldCBjb3VudCA9IDBcbiAgbGV0IGluZGV4ID0gc291cmNlLmluZGV4T2YoY2hhcmFjdGVyKVxuXG4gIHdoaWxlIChpbmRleCAhPT0gLTEpIHtcbiAgICBjb3VudCsrXG4gICAgaW5kZXggPSBzb3VyY2UuaW5kZXhPZihjaGFyYWN0ZXIsIGluZGV4ICsgY2hhcmFjdGVyLmxlbmd0aClcbiAgfVxuXG4gIHJldHVybiBjb3VudFxufVxuIiwiLyoqXG4gKiBAdHlwZWRlZiBPcHRpb25zXG4gKiAgIENvbmZpZ3VyYXRpb24gZm9yIGBzdHJpbmdpZnlgLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbcGFkTGVmdD10cnVlXVxuICogICBXaGV0aGVyIHRvIHBhZCBhIHNwYWNlIGJlZm9yZSBhIHRva2VuLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbcGFkUmlnaHQ9ZmFsc2VdXG4gKiAgIFdoZXRoZXIgdG8gcGFkIGEgc3BhY2UgYWZ0ZXIgYSB0b2tlbi5cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPcHRpb25zfSBTdHJpbmdpZnlPcHRpb25zXG4gKiAgIFBsZWFzZSB1c2UgYFN0cmluZ2lmeU9wdGlvbnNgIGluc3RlYWQuXG4gKi9cblxuLyoqXG4gKiBQYXJzZSBjb21tYS1zZXBhcmF0ZWQgdG9rZW5zIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogICBDb21tYS1zZXBhcmF0ZWQgdG9rZW5zLlxuICogQHJldHVybnMge0FycmF5PHN0cmluZz59XG4gKiAgIExpc3Qgb2YgdG9rZW5zLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2UodmFsdWUpIHtcbiAgLyoqIEB0eXBlIHtBcnJheTxzdHJpbmc+fSAqL1xuICBjb25zdCB0b2tlbnMgPSBbXVxuICBjb25zdCBpbnB1dCA9IFN0cmluZyh2YWx1ZSB8fCAnJylcbiAgbGV0IGluZGV4ID0gaW5wdXQuaW5kZXhPZignLCcpXG4gIGxldCBzdGFydCA9IDBcbiAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICBsZXQgZW5kID0gZmFsc2VcblxuICB3aGlsZSAoIWVuZCkge1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIGluZGV4ID0gaW5wdXQubGVuZ3RoXG4gICAgICBlbmQgPSB0cnVlXG4gICAgfVxuXG4gICAgY29uc3QgdG9rZW4gPSBpbnB1dC5zbGljZShzdGFydCwgaW5kZXgpLnRyaW0oKVxuXG4gICAgaWYgKHRva2VuIHx8ICFlbmQpIHtcbiAgICAgIHRva2Vucy5wdXNoKHRva2VuKVxuICAgIH1cblxuICAgIHN0YXJ0ID0gaW5kZXggKyAxXG4gICAgaW5kZXggPSBpbnB1dC5pbmRleE9mKCcsJywgc3RhcnQpXG4gIH1cblxuICByZXR1cm4gdG9rZW5zXG59XG5cbi8qKlxuICogU2VyaWFsaXplIGFuIGFycmF5IG9mIHN0cmluZ3Mgb3IgbnVtYmVycyB0byBjb21tYS1zZXBhcmF0ZWQgdG9rZW5zLlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nfG51bWJlcj59IHZhbHVlc1xuICogICBMaXN0IG9mIHRva2Vucy5cbiAqIEBwYXJhbSB7T3B0aW9uc30gW29wdGlvbnNdXG4gKiAgIENvbmZpZ3VyYXRpb24gZm9yIGBzdHJpbmdpZnlgIChvcHRpb25hbCkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogICBDb21tYS1zZXBhcmF0ZWQgdG9rZW5zLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5KHZhbHVlcywgb3B0aW9ucykge1xuICBjb25zdCBzZXR0aW5ncyA9IG9wdGlvbnMgfHwge31cblxuICAvLyBFbnN1cmUgdGhlIGxhc3QgZW1wdHkgZW50cnkgaXMgc2Vlbi5cbiAgY29uc3QgaW5wdXQgPSB2YWx1ZXNbdmFsdWVzLmxlbmd0aCAtIDFdID09PSAnJyA/IFsuLi52YWx1ZXMsICcnXSA6IHZhbHVlc1xuXG4gIHJldHVybiBpbnB1dFxuICAgIC5qb2luKFxuICAgICAgKHNldHRpbmdzLnBhZFJpZ2h0ID8gJyAnIDogJycpICtcbiAgICAgICAgJywnICtcbiAgICAgICAgKHNldHRpbmdzLnBhZExlZnQgPT09IGZhbHNlID8gJycgOiAnICcpXG4gICAgKVxuICAgIC50cmltKClcbn1cbiIsIi8qKlxuICogUGFyc2Ugc3BhY2Utc2VwYXJhdGVkIHRva2VucyB0byBhbiBhcnJheSBvZiBzdHJpbmdzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogICBTcGFjZS1zZXBhcmF0ZWQgdG9rZW5zLlxuICogQHJldHVybnMge0FycmF5PHN0cmluZz59XG4gKiAgIExpc3Qgb2YgdG9rZW5zLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2UodmFsdWUpIHtcbiAgY29uc3QgaW5wdXQgPSBTdHJpbmcodmFsdWUgfHwgJycpLnRyaW0oKVxuICByZXR1cm4gaW5wdXQgPyBpbnB1dC5zcGxpdCgvWyBcXHRcXG5cXHJcXGZdKy9nKSA6IFtdXG59XG5cbi8qKlxuICogU2VyaWFsaXplIGFuIGFycmF5IG9mIHN0cmluZ3MgYXMgc3BhY2Ugc2VwYXJhdGVkLXRva2Vucy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PHN0cmluZ3xudW1iZXI+fSB2YWx1ZXNcbiAqICAgTGlzdCBvZiB0b2tlbnMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogICBTcGFjZS1zZXBhcmF0ZWQgdG9rZW5zLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5KHZhbHVlcykge1xuICByZXR1cm4gdmFsdWVzLmpvaW4oJyAnKS50cmltKClcbn1cbiIsIi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnaGFzdCcpLk5vZGVzfSBOb2Rlc1xuICovXG5cbi8vIEhUTUwgd2hpdGVzcGFjZSBleHByZXNzaW9uLlxuLy8gU2VlIDxodHRwczovL2luZnJhLnNwZWMud2hhdHdnLm9yZy8jYXNjaWktd2hpdGVzcGFjZT4uXG5jb25zdCByZSA9IC9bIFxcdFxcblxcZlxccl0vZ1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyAqaW50ZXItZWxlbWVudCB3aGl0ZXNwYWNlKi5cbiAqXG4gKiBAcGFyYW0ge05vZGVzIHwgc3RyaW5nfSB0aGluZ1xuICogICBUaGluZyB0byBjaGVjayAoYE5vZGVgIG9yIGBzdHJpbmdgKS5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogICBXaGV0aGVyIHRoZSBgdmFsdWVgIGlzIGludGVyLWVsZW1lbnQgd2hpdGVzcGFjZSAoYGJvb2xlYW5gKTogY29uc2lzdGluZyBvZlxuICogICB6ZXJvIG9yIG1vcmUgb2Ygc3BhY2UsIHRhYiAoYFxcdGApLCBsaW5lIGZlZWQgKGBcXG5gKSwgY2FycmlhZ2UgcmV0dXJuXG4gKiAgIChgXFxyYCksIG9yIGZvcm0gZmVlZCAoYFxcZmApOyBpZiBhIG5vZGUgaXMgcGFzc2VkIGl0IG11c3QgYmUgYSBgVGV4dGAgbm9kZSxcbiAqICAgd2hvc2UgYHZhbHVlYCBmaWVsZCBpcyBjaGVja2VkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gd2hpdGVzcGFjZSh0aGluZykge1xuICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSAnb2JqZWN0J1xuICAgID8gdGhpbmcudHlwZSA9PT0gJ3RleHQnXG4gICAgICA/IGVtcHR5KHRoaW5nLnZhbHVlKVxuICAgICAgOiBmYWxzZVxuICAgIDogZW1wdHkodGhpbmcpXG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gZW1wdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlLnJlcGxhY2UocmUsICcnKSA9PT0gJydcbn1cbiIsIi8qKlxuICogQGltcG9ydCB7UGFyZW50cywgUm9vdENvbnRlbnR9IGZyb20gJ2hhc3QnXG4gKi9cblxuaW1wb3J0IHt3aGl0ZXNwYWNlfSBmcm9tICdoYXN0LXV0aWwtd2hpdGVzcGFjZSdcblxuZXhwb3J0IGNvbnN0IHNpYmxpbmdBZnRlciA9IHNpYmxpbmdzKDEpXG5leHBvcnQgY29uc3Qgc2libGluZ0JlZm9yZSA9IHNpYmxpbmdzKC0xKVxuXG4vKiogQHR5cGUge0FycmF5PFJvb3RDb250ZW50Pn0gKi9cbmNvbnN0IGVtcHR5Q2hpbGRyZW4gPSBbXVxuXG4vKipcbiAqIEZhY3RvcnkgdG8gY2hlY2sgc2libGluZ3MgaW4gYSBkaXJlY3Rpb24uXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGluY3JlbWVudFxuICovXG5mdW5jdGlvbiBzaWJsaW5ncyhpbmNyZW1lbnQpIHtcbiAgcmV0dXJuIHNpYmxpbmdcblxuICAvKipcbiAgICogRmluZCBhcHBsaWNhYmxlIHNpYmxpbmdzIGluIGEgZGlyZWN0aW9uLlxuICAgKlxuICAgKiBAdGVtcGxhdGUge1BhcmVudHN9IFBhcmVudFxuICAgKiAgIFBhcmVudCB0eXBlLlxuICAgKiBAcGFyYW0ge1BhcmVudCB8IHVuZGVmaW5lZH0gcGFyZW50XG4gICAqICAgUGFyZW50LlxuICAgKiBAcGFyYW0ge251bWJlciB8IHVuZGVmaW5lZH0gaW5kZXhcbiAgICogICBJbmRleCBvZiBjaGlsZCBpbiBgcGFyZW50YC5cbiAgICogQHBhcmFtIHtib29sZWFuIHwgdW5kZWZpbmVkfSBbaW5jbHVkZVdoaXRlc3BhY2U9ZmFsc2VdXG4gICAqICAgV2hldGhlciB0byBpbmNsdWRlIHdoaXRlc3BhY2UgKGRlZmF1bHQ6IGBmYWxzZWApLlxuICAgKiBAcmV0dXJucyB7UGFyZW50IGV4dGVuZHMge2NoaWxkcmVuOiBBcnJheTxpbmZlciBDaGlsZD59ID8gQ2hpbGQgfCB1bmRlZmluZWQgOiBuZXZlcn1cbiAgICogICBDaGlsZCBvZiBwYXJlbnQuXG4gICAqL1xuICBmdW5jdGlvbiBzaWJsaW5nKHBhcmVudCwgaW5kZXgsIGluY2x1ZGVXaGl0ZXNwYWNlKSB7XG4gICAgY29uc3Qgc2libGluZ3MgPSBwYXJlbnQgPyBwYXJlbnQuY2hpbGRyZW4gOiBlbXB0eUNoaWxkcmVuXG4gICAgbGV0IG9mZnNldCA9IChpbmRleCB8fCAwKSArIGluY3JlbWVudFxuICAgIGxldCBuZXh0ID0gc2libGluZ3Nbb2Zmc2V0XVxuXG4gICAgaWYgKCFpbmNsdWRlV2hpdGVzcGFjZSkge1xuICAgICAgd2hpbGUgKG5leHQgJiYgd2hpdGVzcGFjZShuZXh0KSkge1xuICAgICAgICBvZmZzZXQgKz0gaW5jcmVtZW50XG4gICAgICAgIG5leHQgPSBzaWJsaW5nc1tvZmZzZXRdXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvcjogaXTigJlzIGEgY29ycmVjdCBjaGlsZC5cbiAgICByZXR1cm4gbmV4dFxuICB9XG59XG4iLCIvKipcbiAqIEBpbXBvcnQge0VsZW1lbnQsIFBhcmVudHN9IGZyb20gJ2hhc3QnXG4gKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgT21pdEhhbmRsZVxuICogICBDaGVjayBpZiBhIHRhZyBjYW4gYmUgb21pdHRlZC5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICogICBFbGVtZW50IHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXIgfCB1bmRlZmluZWR9IGluZGV4XG4gKiAgIEluZGV4IG9mIGVsZW1lbnQgaW4gcGFyZW50LlxuICogQHBhcmFtIHtQYXJlbnRzIHwgdW5kZWZpbmVkfSBwYXJlbnRcbiAqICAgUGFyZW50IG9mIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqICAgV2hldGhlciB0byBvbWl0IGEgdGFnLlxuICpcbiAqL1xuXG5jb25zdCBvd24gPSB7fS5oYXNPd25Qcm9wZXJ0eVxuXG4vKipcbiAqIEZhY3RvcnkgdG8gY2hlY2sgaWYgYSBnaXZlbiBub2RlIGNhbiBoYXZlIGEgdGFnIG9taXR0ZWQuXG4gKlxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBPbWl0SGFuZGxlPn0gaGFuZGxlcnNcbiAqICAgT21pc3Npb24gaGFuZGxlcnMsIHdoZXJlIGVhY2gga2V5IGlzIGEgdGFnIG5hbWUsIGFuZCBlYWNoIHZhbHVlIGlzIHRoZVxuICogICBjb3JyZXNwb25kaW5nIGhhbmRsZXIuXG4gKiBAcmV0dXJucyB7T21pdEhhbmRsZX1cbiAqICAgV2hldGhlciB0byBvbWl0IGEgdGFnIG9mIGFuIGVsZW1lbnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvbWlzc2lvbihoYW5kbGVycykge1xuICByZXR1cm4gb21pdFxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIGdpdmVuIG5vZGUgY2FuIGhhdmUgYSB0YWcgb21pdHRlZC5cbiAgICpcbiAgICogQHR5cGUge09taXRIYW5kbGV9XG4gICAqL1xuICBmdW5jdGlvbiBvbWl0KG5vZGUsIGluZGV4LCBwYXJlbnQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgb3duLmNhbGwoaGFuZGxlcnMsIG5vZGUudGFnTmFtZSkgJiZcbiAgICAgIGhhbmRsZXJzW25vZGUudGFnTmFtZV0obm9kZSwgaW5kZXgsIHBhcmVudClcbiAgICApXG4gIH1cbn1cbiIsIi8qKlxuICogQGltcG9ydCB7RWxlbWVudCwgUGFyZW50c30gZnJvbSAnaGFzdCdcbiAqL1xuXG5pbXBvcnQge3doaXRlc3BhY2V9IGZyb20gJ2hhc3QtdXRpbC13aGl0ZXNwYWNlJ1xuaW1wb3J0IHtzaWJsaW5nQWZ0ZXJ9IGZyb20gJy4vdXRpbC9zaWJsaW5ncy5qcydcbmltcG9ydCB7b21pc3Npb259IGZyb20gJy4vb21pc3Npb24uanMnXG5cbmV4cG9ydCBjb25zdCBjbG9zaW5nID0gb21pc3Npb24oe1xuICBib2R5LFxuICBjYXB0aW9uOiBoZWFkT3JDb2xncm91cE9yQ2FwdGlvbixcbiAgY29sZ3JvdXA6IGhlYWRPckNvbGdyb3VwT3JDYXB0aW9uLFxuICBkZCxcbiAgZHQsXG4gIGhlYWQ6IGhlYWRPckNvbGdyb3VwT3JDYXB0aW9uLFxuICBodG1sLFxuICBsaSxcbiAgb3B0Z3JvdXAsXG4gIG9wdGlvbixcbiAgcCxcbiAgcnA6IHJ1YnlFbGVtZW50LFxuICBydDogcnVieUVsZW1lbnQsXG4gIHRib2R5LFxuICB0ZDogY2VsbHMsXG4gIHRmb290LFxuICB0aDogY2VsbHMsXG4gIHRoZWFkLFxuICB0clxufSlcblxuLyoqXG4gKiBNYWNybyBmb3IgYDwvaGVhZD5gLCBgPC9jb2xncm91cD5gLCBhbmQgYDwvY2FwdGlvbj5gLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gX1xuICogICBFbGVtZW50LlxuICogQHBhcmFtIHtudW1iZXIgfCB1bmRlZmluZWR9IGluZGV4XG4gKiAgIEluZGV4IG9mIGVsZW1lbnQgaW4gcGFyZW50LlxuICogQHBhcmFtIHtQYXJlbnRzIHwgdW5kZWZpbmVkfSBwYXJlbnRcbiAqICAgUGFyZW50IG9mIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqICAgV2hldGhlciB0aGUgY2xvc2luZyB0YWcgY2FuIGJlIG9taXR0ZWQuXG4gKi9cbmZ1bmN0aW9uIGhlYWRPckNvbGdyb3VwT3JDYXB0aW9uKF8sIGluZGV4LCBwYXJlbnQpIHtcbiAgY29uc3QgbmV4dCA9IHNpYmxpbmdBZnRlcihwYXJlbnQsIGluZGV4LCB0cnVlKVxuICByZXR1cm4gKFxuICAgICFuZXh0IHx8XG4gICAgKG5leHQudHlwZSAhPT0gJ2NvbW1lbnQnICYmXG4gICAgICAhKG5leHQudHlwZSA9PT0gJ3RleHQnICYmIHdoaXRlc3BhY2UobmV4dC52YWx1ZS5jaGFyQXQoMCkpKSlcbiAgKVxufVxuXG4vKipcbiAqIFdoZXRoZXIgdG8gb21pdCBgPC9odG1sPmAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBfXG4gKiAgIEVsZW1lbnQuXG4gKiBAcGFyYW0ge251bWJlciB8IHVuZGVmaW5lZH0gaW5kZXhcbiAqICAgSW5kZXggb2YgZWxlbWVudCBpbiBwYXJlbnQuXG4gKiBAcGFyYW0ge1BhcmVudHMgfCB1bmRlZmluZWR9IHBhcmVudFxuICogICBQYXJlbnQgb2YgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogICBXaGV0aGVyIHRoZSBjbG9zaW5nIHRhZyBjYW4gYmUgb21pdHRlZC5cbiAqL1xuZnVuY3Rpb24gaHRtbChfLCBpbmRleCwgcGFyZW50KSB7XG4gIGNvbnN0IG5leHQgPSBzaWJsaW5nQWZ0ZXIocGFyZW50LCBpbmRleClcbiAgcmV0dXJuICFuZXh0IHx8IG5leHQudHlwZSAhPT0gJ2NvbW1lbnQnXG59XG5cbi8qKlxuICogV2hldGhlciB0byBvbWl0IGA8L2JvZHk+YC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IF9cbiAqICAgRWxlbWVudC5cbiAqIEBwYXJhbSB7bnVtYmVyIHwgdW5kZWZpbmVkfSBpbmRleFxuICogICBJbmRleCBvZiBlbGVtZW50IGluIHBhcmVudC5cbiAqIEBwYXJhbSB7UGFyZW50cyB8IHVuZGVmaW5lZH0gcGFyZW50XG4gKiAgIFBhcmVudCBvZiBlbGVtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiAgIFdoZXRoZXIgdGhlIGNsb3NpbmcgdGFnIGNhbiBiZSBvbWl0dGVkLlxuICovXG5mdW5jdGlvbiBib2R5KF8sIGluZGV4LCBwYXJlbnQpIHtcbiAgY29uc3QgbmV4dCA9IHNpYmxpbmdBZnRlcihwYXJlbnQsIGluZGV4KVxuICByZXR1cm4gIW5leHQgfHwgbmV4dC50eXBlICE9PSAnY29tbWVudCdcbn1cblxuLyoqXG4gKiBXaGV0aGVyIHRvIG9taXQgYDwvcD5gLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gX1xuICogICBFbGVtZW50LlxuICogQHBhcmFtIHtudW1iZXIgfCB1bmRlZmluZWR9IGluZGV4XG4gKiAgIEluZGV4IG9mIGVsZW1lbnQgaW4gcGFyZW50LlxuICogQHBhcmFtIHtQYXJlbnRzIHwgdW5kZWZpbmVkfSBwYXJlbnRcbiAqICAgUGFyZW50IG9mIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqICAgV2hldGhlciB0aGUgY2xvc2luZyB0YWcgY2FuIGJlIG9taXR0ZWQuXG4gKi9cbmZ1bmN0aW9uIHAoXywgaW5kZXgsIHBhcmVudCkge1xuICBjb25zdCBuZXh0ID0gc2libGluZ0FmdGVyKHBhcmVudCwgaW5kZXgpXG4gIHJldHVybiBuZXh0XG4gICAgPyBuZXh0LnR5cGUgPT09ICdlbGVtZW50JyAmJlxuICAgICAgICAobmV4dC50YWdOYW1lID09PSAnYWRkcmVzcycgfHxcbiAgICAgICAgICBuZXh0LnRhZ05hbWUgPT09ICdhcnRpY2xlJyB8fFxuICAgICAgICAgIG5leHQudGFnTmFtZSA9PT0gJ2FzaWRlJyB8fFxuICAgICAgICAgIG5leHQudGFnTmFtZSA9PT0gJ2Jsb2NrcXVvdGUnIHx8XG4gICAgICAgICAgbmV4dC50YWdOYW1lID09PSAnZGV0YWlscycgfHxcbiAgICAgICAgICBuZXh0LnRhZ05hbWUgPT09ICdkaXYnIHx8XG4gICAgICAgICAgbmV4dC50YWdOYW1lID09PSAnZGwnIHx8XG4gICAgICAgICAgbmV4dC50YWdOYW1lID09PSAnZmllbGRzZXQnIHx8XG4gICAgICAgICAgbmV4dC50YWdOYW1lID09PSAnZmlnY2FwdGlvbicgfHxcbiAgICAgICAgICBuZXh0LnRhZ05hbWUgPT09ICdmaWd1cmUnIHx8XG4gICAgICAgICAgbmV4dC50YWdOYW1lID09PSAnZm9vdGVyJyB8fFxuICAgICAgICAgIG5leHQudGFnTmFtZSA9PT0gJ2Zvcm0nIHx8XG4gICAgICAgICAgbmV4dC50YWdOYW1lID09PSAnaDEnIHx8XG4gICAgICAgICAgbmV4dC50YWdOYW1lID09PSAnaDInIHx8XG4gICAgICAgICAgbmV4dC50YWdOYW1lID09PSAnaDMnIHx8XG4gICAgICAgICAgbmV4dC50YWdOYW1lID09PSAnaDQnIHx8XG4gICAgICAgICAgbmV4dC50YWdOYW1lID09PSAnaDUnIHx8XG4gICAgICAgICAgbmV4dC50YWdOYW1lID09PSAnaDYnIHx8XG4gICAgICAgICAgbmV4dC50YWdOYW1lID09PSAnaGVhZGVyJyB8fFxuICAgICAgICAgIG5leHQudGFnTmFtZSA9PT0gJ2hncm91cCcgfHxcbiAgICAgICAgICBuZXh0LnRhZ05hbWUgPT09ICdocicgfHxcbiAgICAgICAgICBuZXh0LnRhZ05hbWUgPT09ICdtYWluJyB8fFxuICAgICAgICAgIG5leHQudGFnTmFtZSA9PT0gJ21lbnUnIHx8XG4gICAgICAgICAgbmV4dC50YWdOYW1lID09PSAnbmF2JyB8fFxuICAgICAgICAgIG5leHQudGFnTmFtZSA9PT0gJ29sJyB8fFxuICAgICAgICAgIG5leHQudGFnTmFtZSA9PT0gJ3AnIHx8XG4gICAgICAgICAgbmV4dC50YWdOYW1lID09PSAncHJlJyB8fFxuICAgICAgICAgIG5leHQudGFnTmFtZSA9PT0gJ3NlY3Rpb24nIHx8XG4gICAgICAgICAgbmV4dC50YWdOYW1lID09PSAndGFibGUnIHx8XG4gICAgICAgICAgbmV4dC50YWdOYW1lID09PSAndWwnKVxuICAgIDogIXBhcmVudCB8fFxuICAgICAgICAvLyBDb25mdXNpbmcgcGFyZW50LlxuICAgICAgICAhKFxuICAgICAgICAgIHBhcmVudC50eXBlID09PSAnZWxlbWVudCcgJiZcbiAgICAgICAgICAocGFyZW50LnRhZ05hbWUgPT09ICdhJyB8fFxuICAgICAgICAgICAgcGFyZW50LnRhZ05hbWUgPT09ICdhdWRpbycgfHxcbiAgICAgICAgICAgIHBhcmVudC50YWdOYW1lID09PSAnZGVsJyB8fFxuICAgICAgICAgICAgcGFyZW50LnRhZ05hbWUgPT09ICdpbnMnIHx8XG4gICAgICAgICAgICBwYXJlbnQudGFnTmFtZSA9PT0gJ21hcCcgfHxcbiAgICAgICAgICAgIHBhcmVudC50YWdOYW1lID09PSAnbm9zY3JpcHQnIHx8XG4gICAgICAgICAgICBwYXJlbnQudGFnTmFtZSA9PT0gJ3ZpZGVvJylcbiAgICAgICAgKVxufVxuXG4vKipcbiAqIFdoZXRoZXIgdG8gb21pdCBgPC9saT5gLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gX1xuICogICBFbGVtZW50LlxuICogQHBhcmFtIHtudW1iZXIgfCB1bmRlZmluZWR9IGluZGV4XG4gKiAgIEluZGV4IG9mIGVsZW1lbnQgaW4gcGFyZW50LlxuICogQHBhcmFtIHtQYXJlbnRzIHwgdW5kZWZpbmVkfSBwYXJlbnRcbiAqICAgUGFyZW50IG9mIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqICAgV2hldGhlciB0aGUgY2xvc2luZyB0YWcgY2FuIGJlIG9taXR0ZWQuXG4gKi9cbmZ1bmN0aW9uIGxpKF8sIGluZGV4LCBwYXJlbnQpIHtcbiAgY29uc3QgbmV4dCA9IHNpYmxpbmdBZnRlcihwYXJlbnQsIGluZGV4KVxuICByZXR1cm4gIW5leHQgfHwgKG5leHQudHlwZSA9PT0gJ2VsZW1lbnQnICYmIG5leHQudGFnTmFtZSA9PT0gJ2xpJylcbn1cblxuLyoqXG4gKiBXaGV0aGVyIHRvIG9taXQgYDwvZHQ+YC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IF9cbiAqICAgRWxlbWVudC5cbiAqIEBwYXJhbSB7bnVtYmVyIHwgdW5kZWZpbmVkfSBpbmRleFxuICogICBJbmRleCBvZiBlbGVtZW50IGluIHBhcmVudC5cbiAqIEBwYXJhbSB7UGFyZW50cyB8IHVuZGVmaW5lZH0gcGFyZW50XG4gKiAgIFBhcmVudCBvZiBlbGVtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiAgIFdoZXRoZXIgdGhlIGNsb3NpbmcgdGFnIGNhbiBiZSBvbWl0dGVkLlxuICovXG5mdW5jdGlvbiBkdChfLCBpbmRleCwgcGFyZW50KSB7XG4gIGNvbnN0IG5leHQgPSBzaWJsaW5nQWZ0ZXIocGFyZW50LCBpbmRleClcbiAgcmV0dXJuIEJvb2xlYW4oXG4gICAgbmV4dCAmJlxuICAgICAgbmV4dC50eXBlID09PSAnZWxlbWVudCcgJiZcbiAgICAgIChuZXh0LnRhZ05hbWUgPT09ICdkdCcgfHwgbmV4dC50YWdOYW1lID09PSAnZGQnKVxuICApXG59XG5cbi8qKlxuICogV2hldGhlciB0byBvbWl0IGA8L2RkPmAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBfXG4gKiAgIEVsZW1lbnQuXG4gKiBAcGFyYW0ge251bWJlciB8IHVuZGVmaW5lZH0gaW5kZXhcbiAqICAgSW5kZXggb2YgZWxlbWVudCBpbiBwYXJlbnQuXG4gKiBAcGFyYW0ge1BhcmVudHMgfCB1bmRlZmluZWR9IHBhcmVudFxuICogICBQYXJlbnQgb2YgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogICBXaGV0aGVyIHRoZSBjbG9zaW5nIHRhZyBjYW4gYmUgb21pdHRlZC5cbiAqL1xuZnVuY3Rpb24gZGQoXywgaW5kZXgsIHBhcmVudCkge1xuICBjb25zdCBuZXh0ID0gc2libGluZ0FmdGVyKHBhcmVudCwgaW5kZXgpXG4gIHJldHVybiAoXG4gICAgIW5leHQgfHxcbiAgICAobmV4dC50eXBlID09PSAnZWxlbWVudCcgJiZcbiAgICAgIChuZXh0LnRhZ05hbWUgPT09ICdkdCcgfHwgbmV4dC50YWdOYW1lID09PSAnZGQnKSlcbiAgKVxufVxuXG4vKipcbiAqIFdoZXRoZXIgdG8gb21pdCBgPC9ydD5gIG9yIGA8L3JwPmAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBfXG4gKiAgIEVsZW1lbnQuXG4gKiBAcGFyYW0ge251bWJlciB8IHVuZGVmaW5lZH0gaW5kZXhcbiAqICAgSW5kZXggb2YgZWxlbWVudCBpbiBwYXJlbnQuXG4gKiBAcGFyYW0ge1BhcmVudHMgfCB1bmRlZmluZWR9IHBhcmVudFxuICogICBQYXJlbnQgb2YgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogICBXaGV0aGVyIHRoZSBjbG9zaW5nIHRhZyBjYW4gYmUgb21pdHRlZC5cbiAqL1xuZnVuY3Rpb24gcnVieUVsZW1lbnQoXywgaW5kZXgsIHBhcmVudCkge1xuICBjb25zdCBuZXh0ID0gc2libGluZ0FmdGVyKHBhcmVudCwgaW5kZXgpXG4gIHJldHVybiAoXG4gICAgIW5leHQgfHxcbiAgICAobmV4dC50eXBlID09PSAnZWxlbWVudCcgJiZcbiAgICAgIChuZXh0LnRhZ05hbWUgPT09ICdycCcgfHwgbmV4dC50YWdOYW1lID09PSAncnQnKSlcbiAgKVxufVxuXG4vKipcbiAqIFdoZXRoZXIgdG8gb21pdCBgPC9vcHRncm91cD5gLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gX1xuICogICBFbGVtZW50LlxuICogQHBhcmFtIHtudW1iZXIgfCB1bmRlZmluZWR9IGluZGV4XG4gKiAgIEluZGV4IG9mIGVsZW1lbnQgaW4gcGFyZW50LlxuICogQHBhcmFtIHtQYXJlbnRzIHwgdW5kZWZpbmVkfSBwYXJlbnRcbiAqICAgUGFyZW50IG9mIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqICAgV2hldGhlciB0aGUgY2xvc2luZyB0YWcgY2FuIGJlIG9taXR0ZWQuXG4gKi9cbmZ1bmN0aW9uIG9wdGdyb3VwKF8sIGluZGV4LCBwYXJlbnQpIHtcbiAgY29uc3QgbmV4dCA9IHNpYmxpbmdBZnRlcihwYXJlbnQsIGluZGV4KVxuICByZXR1cm4gIW5leHQgfHwgKG5leHQudHlwZSA9PT0gJ2VsZW1lbnQnICYmIG5leHQudGFnTmFtZSA9PT0gJ29wdGdyb3VwJylcbn1cblxuLyoqXG4gKiBXaGV0aGVyIHRvIG9taXQgYDwvb3B0aW9uPmAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBfXG4gKiAgIEVsZW1lbnQuXG4gKiBAcGFyYW0ge251bWJlciB8IHVuZGVmaW5lZH0gaW5kZXhcbiAqICAgSW5kZXggb2YgZWxlbWVudCBpbiBwYXJlbnQuXG4gKiBAcGFyYW0ge1BhcmVudHMgfCB1bmRlZmluZWR9IHBhcmVudFxuICogICBQYXJlbnQgb2YgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogICBXaGV0aGVyIHRoZSBjbG9zaW5nIHRhZyBjYW4gYmUgb21pdHRlZC5cbiAqL1xuZnVuY3Rpb24gb3B0aW9uKF8sIGluZGV4LCBwYXJlbnQpIHtcbiAgY29uc3QgbmV4dCA9IHNpYmxpbmdBZnRlcihwYXJlbnQsIGluZGV4KVxuICByZXR1cm4gKFxuICAgICFuZXh0IHx8XG4gICAgKG5leHQudHlwZSA9PT0gJ2VsZW1lbnQnICYmXG4gICAgICAobmV4dC50YWdOYW1lID09PSAnb3B0aW9uJyB8fCBuZXh0LnRhZ05hbWUgPT09ICdvcHRncm91cCcpKVxuICApXG59XG5cbi8qKlxuICogV2hldGhlciB0byBvbWl0IGA8L3RoZWFkPmAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBfXG4gKiAgIEVsZW1lbnQuXG4gKiBAcGFyYW0ge251bWJlciB8IHVuZGVmaW5lZH0gaW5kZXhcbiAqICAgSW5kZXggb2YgZWxlbWVudCBpbiBwYXJlbnQuXG4gKiBAcGFyYW0ge1BhcmVudHMgfCB1bmRlZmluZWR9IHBhcmVudFxuICogICBQYXJlbnQgb2YgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogICBXaGV0aGVyIHRoZSBjbG9zaW5nIHRhZyBjYW4gYmUgb21pdHRlZC5cbiAqL1xuZnVuY3Rpb24gdGhlYWQoXywgaW5kZXgsIHBhcmVudCkge1xuICBjb25zdCBuZXh0ID0gc2libGluZ0FmdGVyKHBhcmVudCwgaW5kZXgpXG4gIHJldHVybiBCb29sZWFuKFxuICAgIG5leHQgJiZcbiAgICAgIG5leHQudHlwZSA9PT0gJ2VsZW1lbnQnICYmXG4gICAgICAobmV4dC50YWdOYW1lID09PSAndGJvZHknIHx8IG5leHQudGFnTmFtZSA9PT0gJ3Rmb290JylcbiAgKVxufVxuXG4vKipcbiAqIFdoZXRoZXIgdG8gb21pdCBgPC90Ym9keT5gLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gX1xuICogICBFbGVtZW50LlxuICogQHBhcmFtIHtudW1iZXIgfCB1bmRlZmluZWR9IGluZGV4XG4gKiAgIEluZGV4IG9mIGVsZW1lbnQgaW4gcGFyZW50LlxuICogQHBhcmFtIHtQYXJlbnRzIHwgdW5kZWZpbmVkfSBwYXJlbnRcbiAqICAgUGFyZW50IG9mIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqICAgV2hldGhlciB0aGUgY2xvc2luZyB0YWcgY2FuIGJlIG9taXR0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRib2R5KF8sIGluZGV4LCBwYXJlbnQpIHtcbiAgY29uc3QgbmV4dCA9IHNpYmxpbmdBZnRlcihwYXJlbnQsIGluZGV4KVxuICByZXR1cm4gKFxuICAgICFuZXh0IHx8XG4gICAgKG5leHQudHlwZSA9PT0gJ2VsZW1lbnQnICYmXG4gICAgICAobmV4dC50YWdOYW1lID09PSAndGJvZHknIHx8IG5leHQudGFnTmFtZSA9PT0gJ3Rmb290JykpXG4gIClcbn1cblxuLyoqXG4gKiBXaGV0aGVyIHRvIG9taXQgYDwvdGZvb3Q+YC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IF9cbiAqICAgRWxlbWVudC5cbiAqIEBwYXJhbSB7bnVtYmVyIHwgdW5kZWZpbmVkfSBpbmRleFxuICogICBJbmRleCBvZiBlbGVtZW50IGluIHBhcmVudC5cbiAqIEBwYXJhbSB7UGFyZW50cyB8IHVuZGVmaW5lZH0gcGFyZW50XG4gKiAgIFBhcmVudCBvZiBlbGVtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiAgIFdoZXRoZXIgdGhlIGNsb3NpbmcgdGFnIGNhbiBiZSBvbWl0dGVkLlxuICovXG5mdW5jdGlvbiB0Zm9vdChfLCBpbmRleCwgcGFyZW50KSB7XG4gIHJldHVybiAhc2libGluZ0FmdGVyKHBhcmVudCwgaW5kZXgpXG59XG5cbi8qKlxuICogV2hldGhlciB0byBvbWl0IGA8L3RyPmAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBfXG4gKiAgIEVsZW1lbnQuXG4gKiBAcGFyYW0ge251bWJlciB8IHVuZGVmaW5lZH0gaW5kZXhcbiAqICAgSW5kZXggb2YgZWxlbWVudCBpbiBwYXJlbnQuXG4gKiBAcGFyYW0ge1BhcmVudHMgfCB1bmRlZmluZWR9IHBhcmVudFxuICogICBQYXJlbnQgb2YgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogICBXaGV0aGVyIHRoZSBjbG9zaW5nIHRhZyBjYW4gYmUgb21pdHRlZC5cbiAqL1xuZnVuY3Rpb24gdHIoXywgaW5kZXgsIHBhcmVudCkge1xuICBjb25zdCBuZXh0ID0gc2libGluZ0FmdGVyKHBhcmVudCwgaW5kZXgpXG4gIHJldHVybiAhbmV4dCB8fCAobmV4dC50eXBlID09PSAnZWxlbWVudCcgJiYgbmV4dC50YWdOYW1lID09PSAndHInKVxufVxuXG4vKipcbiAqIFdoZXRoZXIgdG8gb21pdCBgPC90ZD5gIG9yIGA8L3RoPmAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBfXG4gKiAgIEVsZW1lbnQuXG4gKiBAcGFyYW0ge251bWJlciB8IHVuZGVmaW5lZH0gaW5kZXhcbiAqICAgSW5kZXggb2YgZWxlbWVudCBpbiBwYXJlbnQuXG4gKiBAcGFyYW0ge1BhcmVudHMgfCB1bmRlZmluZWR9IHBhcmVudFxuICogICBQYXJlbnQgb2YgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogICBXaGV0aGVyIHRoZSBjbG9zaW5nIHRhZyBjYW4gYmUgb21pdHRlZC5cbiAqL1xuZnVuY3Rpb24gY2VsbHMoXywgaW5kZXgsIHBhcmVudCkge1xuICBjb25zdCBuZXh0ID0gc2libGluZ0FmdGVyKHBhcmVudCwgaW5kZXgpXG4gIHJldHVybiAoXG4gICAgIW5leHQgfHxcbiAgICAobmV4dC50eXBlID09PSAnZWxlbWVudCcgJiZcbiAgICAgIChuZXh0LnRhZ05hbWUgPT09ICd0ZCcgfHwgbmV4dC50YWdOYW1lID09PSAndGgnKSlcbiAgKVxufVxuIiwiLyoqXG4gKiBAaW1wb3J0IHtFbGVtZW50LCBQYXJlbnRzfSBmcm9tICdoYXN0J1xuICovXG5cbmltcG9ydCB7d2hpdGVzcGFjZX0gZnJvbSAnaGFzdC11dGlsLXdoaXRlc3BhY2UnXG5pbXBvcnQge3NpYmxpbmdBZnRlciwgc2libGluZ0JlZm9yZX0gZnJvbSAnLi91dGlsL3NpYmxpbmdzLmpzJ1xuaW1wb3J0IHtjbG9zaW5nfSBmcm9tICcuL2Nsb3NpbmcuanMnXG5pbXBvcnQge29taXNzaW9ufSBmcm9tICcuL29taXNzaW9uLmpzJ1xuXG5leHBvcnQgY29uc3Qgb3BlbmluZyA9IG9taXNzaW9uKHtcbiAgYm9keSxcbiAgY29sZ3JvdXAsXG4gIGhlYWQsXG4gIGh0bWwsXG4gIHRib2R5XG59KVxuXG4vKipcbiAqIFdoZXRoZXIgdG8gb21pdCBgPGh0bWw+YC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IG5vZGVcbiAqICAgRWxlbWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogICBXaGV0aGVyIHRoZSBvcGVuaW5nIHRhZyBjYW4gYmUgb21pdHRlZC5cbiAqL1xuZnVuY3Rpb24gaHRtbChub2RlKSB7XG4gIGNvbnN0IGhlYWQgPSBzaWJsaW5nQWZ0ZXIobm9kZSwgLTEpXG4gIHJldHVybiAhaGVhZCB8fCBoZWFkLnR5cGUgIT09ICdjb21tZW50J1xufVxuXG4vKipcbiAqIFdoZXRoZXIgdG8gb21pdCBgPGhlYWQ+YC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IG5vZGVcbiAqICAgRWxlbWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogICBXaGV0aGVyIHRoZSBvcGVuaW5nIHRhZyBjYW4gYmUgb21pdHRlZC5cbiAqL1xuZnVuY3Rpb24gaGVhZChub2RlKSB7XG4gIC8qKiBAdHlwZSB7U2V0PHN0cmluZz59ICovXG4gIGNvbnN0IHNlZW4gPSBuZXcgU2V0KClcblxuICAvLyBXaGV0aGVyIGBzcmNkb2NgIG9yIG5vdCxcbiAgLy8gbWFrZSBzdXJlIHRoZSBjb250ZW50IG1vZGVsIGF0IGxlYXN0IGRvZXNu4oCZdCBoYXZlIHRvbyBtYW55IGBiYXNlYHMvYHRpdGxlYHMuXG4gIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbikge1xuICAgIGlmIChcbiAgICAgIGNoaWxkLnR5cGUgPT09ICdlbGVtZW50JyAmJlxuICAgICAgKGNoaWxkLnRhZ05hbWUgPT09ICdiYXNlJyB8fCBjaGlsZC50YWdOYW1lID09PSAndGl0bGUnKVxuICAgICkge1xuICAgICAgaWYgKHNlZW4uaGFzKGNoaWxkLnRhZ05hbWUpKSByZXR1cm4gZmFsc2VcbiAgICAgIHNlZW4uYWRkKGNoaWxkLnRhZ05hbWUpXG4gICAgfVxuICB9XG5cbiAgLy8g4oCcTWF5IGJlIG9taXR0ZWQgaWYgdGhlIGVsZW1lbnQgaXMgZW1wdHksXG4gIC8vIG9yIGlmIHRoZSBmaXJzdCB0aGluZyBpbnNpZGUgdGhlIGhlYWQgZWxlbWVudCBpcyBhbiBlbGVtZW50LuKAnVxuICBjb25zdCBjaGlsZCA9IG5vZGUuY2hpbGRyZW5bMF1cbiAgcmV0dXJuICFjaGlsZCB8fCBjaGlsZC50eXBlID09PSAnZWxlbWVudCdcbn1cblxuLyoqXG4gKiBXaGV0aGVyIHRvIG9taXQgYDxib2R5PmAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBub2RlXG4gKiAgIEVsZW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqICAgV2hldGhlciB0aGUgb3BlbmluZyB0YWcgY2FuIGJlIG9taXR0ZWQuXG4gKi9cbmZ1bmN0aW9uIGJvZHkobm9kZSkge1xuICBjb25zdCBoZWFkID0gc2libGluZ0FmdGVyKG5vZGUsIC0xLCB0cnVlKVxuXG4gIHJldHVybiAoXG4gICAgIWhlYWQgfHxcbiAgICAoaGVhZC50eXBlICE9PSAnY29tbWVudCcgJiZcbiAgICAgICEoaGVhZC50eXBlID09PSAndGV4dCcgJiYgd2hpdGVzcGFjZShoZWFkLnZhbHVlLmNoYXJBdCgwKSkpICYmXG4gICAgICAhKFxuICAgICAgICBoZWFkLnR5cGUgPT09ICdlbGVtZW50JyAmJlxuICAgICAgICAoaGVhZC50YWdOYW1lID09PSAnbWV0YScgfHxcbiAgICAgICAgICBoZWFkLnRhZ05hbWUgPT09ICdsaW5rJyB8fFxuICAgICAgICAgIGhlYWQudGFnTmFtZSA9PT0gJ3NjcmlwdCcgfHxcbiAgICAgICAgICBoZWFkLnRhZ05hbWUgPT09ICdzdHlsZScgfHxcbiAgICAgICAgICBoZWFkLnRhZ05hbWUgPT09ICd0ZW1wbGF0ZScpXG4gICAgICApKVxuICApXG59XG5cbi8qKlxuICogV2hldGhlciB0byBvbWl0IGA8Y29sZ3JvdXA+YC5cbiAqIFRoZSBzcGVjIGRlc2NyaWJlcyBzb21lIGxvZ2ljIGZvciB0aGUgb3BlbmluZyB0YWcsIGJ1dCBpdOKAmXMgZWFzaWVyIHRvXG4gKiBpbXBsZW1lbnQgaW4gdGhlIGNsb3NpbmcgdGFnLCB0byB0aGUgc2FtZSBlZmZlY3QsIHNvIHdlIGhhbmRsZSBpdCB0aGVyZVxuICogaW5zdGVhZC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IG5vZGVcbiAqICAgRWxlbWVudC5cbiAqIEBwYXJhbSB7bnVtYmVyIHwgdW5kZWZpbmVkfSBpbmRleFxuICogICBJbmRleCBvZiBlbGVtZW50IGluIHBhcmVudC5cbiAqIEBwYXJhbSB7UGFyZW50cyB8IHVuZGVmaW5lZH0gcGFyZW50XG4gKiAgIFBhcmVudCBvZiBlbGVtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiAgIFdoZXRoZXIgdGhlIG9wZW5pbmcgdGFnIGNhbiBiZSBvbWl0dGVkLlxuICovXG5mdW5jdGlvbiBjb2xncm91cChub2RlLCBpbmRleCwgcGFyZW50KSB7XG4gIGNvbnN0IHByZXZpb3VzID0gc2libGluZ0JlZm9yZShwYXJlbnQsIGluZGV4KVxuICBjb25zdCBoZWFkID0gc2libGluZ0FmdGVyKG5vZGUsIC0xLCB0cnVlKVxuXG4gIC8vIFByZXZpb3VzIGNvbGdyb3VwIHdhcyBhbHJlYWR5IG9taXR0ZWQuXG4gIGlmIChcbiAgICBwYXJlbnQgJiZcbiAgICBwcmV2aW91cyAmJlxuICAgIHByZXZpb3VzLnR5cGUgPT09ICdlbGVtZW50JyAmJlxuICAgIHByZXZpb3VzLnRhZ05hbWUgPT09ICdjb2xncm91cCcgJiZcbiAgICBjbG9zaW5nKHByZXZpb3VzLCBwYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihwcmV2aW91cyksIHBhcmVudClcbiAgKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICByZXR1cm4gQm9vbGVhbihoZWFkICYmIGhlYWQudHlwZSA9PT0gJ2VsZW1lbnQnICYmIGhlYWQudGFnTmFtZSA9PT0gJ2NvbCcpXG59XG5cbi8qKlxuICogV2hldGhlciB0byBvbWl0IGA8dGJvZHk+YC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IG5vZGVcbiAqICAgRWxlbWVudC5cbiAqIEBwYXJhbSB7bnVtYmVyIHwgdW5kZWZpbmVkfSBpbmRleFxuICogICBJbmRleCBvZiBlbGVtZW50IGluIHBhcmVudC5cbiAqIEBwYXJhbSB7UGFyZW50cyB8IHVuZGVmaW5lZH0gcGFyZW50XG4gKiAgIFBhcmVudCBvZiBlbGVtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiAgIFdoZXRoZXIgdGhlIG9wZW5pbmcgdGFnIGNhbiBiZSBvbWl0dGVkLlxuICovXG5mdW5jdGlvbiB0Ym9keShub2RlLCBpbmRleCwgcGFyZW50KSB7XG4gIGNvbnN0IHByZXZpb3VzID0gc2libGluZ0JlZm9yZShwYXJlbnQsIGluZGV4KVxuICBjb25zdCBoZWFkID0gc2libGluZ0FmdGVyKG5vZGUsIC0xKVxuXG4gIC8vIFByZXZpb3VzIHRhYmxlIHNlY3Rpb24gd2FzIGFscmVhZHkgb21pdHRlZC5cbiAgaWYgKFxuICAgIHBhcmVudCAmJlxuICAgIHByZXZpb3VzICYmXG4gICAgcHJldmlvdXMudHlwZSA9PT0gJ2VsZW1lbnQnICYmXG4gICAgKHByZXZpb3VzLnRhZ05hbWUgPT09ICd0aGVhZCcgfHwgcHJldmlvdXMudGFnTmFtZSA9PT0gJ3Rib2R5JykgJiZcbiAgICBjbG9zaW5nKHByZXZpb3VzLCBwYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihwcmV2aW91cyksIHBhcmVudClcbiAgKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICByZXR1cm4gQm9vbGVhbihoZWFkICYmIGhlYWQudHlwZSA9PT0gJ2VsZW1lbnQnICYmIGhlYWQudGFnTmFtZSA9PT0gJ3RyJylcbn1cbiIsIi8qKlxuICogQGltcG9ydCB7RWxlbWVudCwgUGFyZW50cywgUHJvcGVydGllc30gZnJvbSAnaGFzdCdcbiAqIEBpbXBvcnQge1N0YXRlfSBmcm9tICcuLi9pbmRleC5qcydcbiAqL1xuXG5pbXBvcnQge2Njb3VudH0gZnJvbSAnY2NvdW50J1xuaW1wb3J0IHtzdHJpbmdpZnkgYXMgY29tbWFzfSBmcm9tICdjb21tYS1zZXBhcmF0ZWQtdG9rZW5zJ1xuaW1wb3J0IHtmaW5kLCBzdmd9IGZyb20gJ3Byb3BlcnR5LWluZm9ybWF0aW9uJ1xuaW1wb3J0IHtzdHJpbmdpZnkgYXMgc3BhY2VzfSBmcm9tICdzcGFjZS1zZXBhcmF0ZWQtdG9rZW5zJ1xuaW1wb3J0IHtzdHJpbmdpZnlFbnRpdGllc30gZnJvbSAnc3RyaW5naWZ5LWVudGl0aWVzJ1xuaW1wb3J0IHtjbG9zaW5nfSBmcm9tICcuLi9vbWlzc2lvbi9jbG9zaW5nLmpzJ1xuaW1wb3J0IHtvcGVuaW5nfSBmcm9tICcuLi9vbWlzc2lvbi9vcGVuaW5nLmpzJ1xuXG4vKipcbiAqIE1hcHMgb2Ygc3Vic2V0cy5cbiAqXG4gKiBFYWNoIHZhbHVlIGlzIGEgbWF0cml4IG9mIHR1cGxlcy5cbiAqIFRoZSB2YWx1ZSBhdCBgMGAgY2F1c2VzIHBhcnNlIGVycm9ycywgdGhlIHZhbHVlIGF0IGAxYCBpcyB2YWxpZC5cbiAqIE9mIGJvdGgsIHRoZSB2YWx1ZSBhdCBgMGAgaXMgdW5zYWZlLCBhbmQgdGhlIHZhbHVlIGF0IGAxYCBpcyBzYWZlLlxuICpcbiAqIEB0eXBlIHtSZWNvcmQ8J2RvdWJsZScgfCAnbmFtZScgfCAnc2luZ2xlJyB8ICd1bnF1b3RlZCcsIEFycmF5PFtBcnJheTxzdHJpbmc+LCBBcnJheTxzdHJpbmc+XT4+fVxuICovXG5jb25zdCBjb25zdGFudHMgPSB7XG4gIC8vIFNlZTogPGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvI2F0dHJpYnV0ZS1uYW1lLXN0YXRlPi5cbiAgbmFtZTogW1xuICAgIFsnXFx0XFxuXFxmXFxyICYvPT4nLnNwbGl0KCcnKSwgJ1xcdFxcblxcZlxcciBcIiZcXCcvPT5gJy5zcGxpdCgnJyldLFxuICAgIFsnXFwwXFx0XFxuXFxmXFxyIFwiJlxcJy88PT4nLnNwbGl0KCcnKSwgJ1xcMFxcdFxcblxcZlxcciBcIiZcXCcvPD0+YCcuc3BsaXQoJycpXVxuICBdLFxuICAvLyBTZWU6IDxodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnLyNhdHRyaWJ1dGUtdmFsdWUtKHVucXVvdGVkKS1zdGF0ZT4uXG4gIHVucXVvdGVkOiBbXG4gICAgWydcXHRcXG5cXGZcXHIgJj4nLnNwbGl0KCcnKSwgJ1xcMFxcdFxcblxcZlxcciBcIiZcXCc8PT5gJy5zcGxpdCgnJyldLFxuICAgIFsnXFwwXFx0XFxuXFxmXFxyIFwiJlxcJzw9PmAnLnNwbGl0KCcnKSwgJ1xcMFxcdFxcblxcZlxcciBcIiZcXCc8PT5gJy5zcGxpdCgnJyldXG4gIF0sXG4gIC8vIFNlZTogPGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvI2F0dHJpYnV0ZS12YWx1ZS0oc2luZ2xlLXF1b3RlZCktc3RhdGU+LlxuICBzaW5nbGU6IFtcbiAgICBbXCImJ1wiLnNwbGl0KCcnKSwgJ1wiJlxcJ2AnLnNwbGl0KCcnKV0sXG4gICAgW1wiXFwwJidcIi5zcGxpdCgnJyksICdcXDBcIiZcXCdgJy5zcGxpdCgnJyldXG4gIF0sXG4gIC8vIFNlZTogPGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvI2F0dHJpYnV0ZS12YWx1ZS0oZG91YmxlLXF1b3RlZCktc3RhdGU+LlxuICBkb3VibGU6IFtcbiAgICBbJ1wiJicuc3BsaXQoJycpLCAnXCImXFwnYCcuc3BsaXQoJycpXSxcbiAgICBbJ1xcMFwiJicuc3BsaXQoJycpLCAnXFwwXCImXFwnYCcuc3BsaXQoJycpXVxuICBdXG59XG5cbi8qKlxuICogU2VyaWFsaXplIGFuIGVsZW1lbnQgbm9kZS5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IG5vZGVcbiAqICAgTm9kZSB0byBoYW5kbGUuXG4gKiBAcGFyYW0ge251bWJlciB8IHVuZGVmaW5lZH0gaW5kZXhcbiAqICAgSW5kZXggb2YgYG5vZGVgIGluIGBwYXJlbnQuXG4gKiBAcGFyYW0ge1BhcmVudHMgfCB1bmRlZmluZWR9IHBhcmVudFxuICogICBQYXJlbnQgb2YgYG5vZGVgLlxuICogQHBhcmFtIHtTdGF0ZX0gc3RhdGVcbiAqICAgSW5mbyBwYXNzZWQgYXJvdW5kIGFib3V0IHRoZSBjdXJyZW50IHN0YXRlLlxuICogQHJldHVybnMge3N0cmluZ31cbiAqICAgU2VyaWFsaXplZCBub2RlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudChub2RlLCBpbmRleCwgcGFyZW50LCBzdGF0ZSkge1xuICBjb25zdCBzY2hlbWEgPSBzdGF0ZS5zY2hlbWFcbiAgY29uc3Qgb21pdCA9IHNjaGVtYS5zcGFjZSA9PT0gJ3N2ZycgPyBmYWxzZSA6IHN0YXRlLnNldHRpbmdzLm9taXRPcHRpb25hbFRhZ3NcbiAgbGV0IHNlbGZDbG9zaW5nID1cbiAgICBzY2hlbWEuc3BhY2UgPT09ICdzdmcnXG4gICAgICA/IHN0YXRlLnNldHRpbmdzLmNsb3NlRW1wdHlFbGVtZW50c1xuICAgICAgOiBzdGF0ZS5zZXR0aW5ncy52b2lkcy5pbmNsdWRlcyhub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSlcbiAgLyoqIEB0eXBlIHtBcnJheTxzdHJpbmc+fSAqL1xuICBjb25zdCBwYXJ0cyA9IFtdXG4gIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICBsZXQgbGFzdFxuXG4gIGlmIChzY2hlbWEuc3BhY2UgPT09ICdodG1sJyAmJiBub2RlLnRhZ05hbWUgPT09ICdzdmcnKSB7XG4gICAgc3RhdGUuc2NoZW1hID0gc3ZnXG4gIH1cblxuICBjb25zdCBhdHRyaWJ1dGVzID0gc2VyaWFsaXplQXR0cmlidXRlcyhzdGF0ZSwgbm9kZS5wcm9wZXJ0aWVzKVxuXG4gIGNvbnN0IGNvbnRlbnQgPSBzdGF0ZS5hbGwoXG4gICAgc2NoZW1hLnNwYWNlID09PSAnaHRtbCcgJiYgbm9kZS50YWdOYW1lID09PSAndGVtcGxhdGUnID8gbm9kZS5jb250ZW50IDogbm9kZVxuICApXG5cbiAgc3RhdGUuc2NoZW1hID0gc2NoZW1hXG5cbiAgLy8gSWYgdGhlIG5vZGUgaXMgY2F0ZWdvcmlzZWQgYXMgdm9pZCwgYnV0IGl0IGhhcyBjaGlsZHJlbiwgcmVtb3ZlIHRoZVxuICAvLyBjYXRlZ29yaXNhdGlvbi5cbiAgLy8gVGhpcyBlbmFibGVzIGZvciBleGFtcGxlIGBtZW51aXRlbWBzLCB3aGljaCBhcmUgdm9pZCBpbiBXM0MgSFRNTCBidXQgbm90XG4gIC8vIHZvaWQgaW4gV0hBVFdHIEhUTUwsIHRvIGJlIHN0cmluZ2lmaWVkIHByb3Blcmx5LlxuICAvLyBOb3RlOiBgbWVudWl0ZW1gIGhhcyBzaW5jZSBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgSFRNTCBzcGVjLCBhbmQgc28gaXMgbm9cbiAgLy8gbG9uZ2VyIHZvaWQuXG4gIGlmIChjb250ZW50KSBzZWxmQ2xvc2luZyA9IGZhbHNlXG5cbiAgaWYgKGF0dHJpYnV0ZXMgfHwgIW9taXQgfHwgIW9wZW5pbmcobm9kZSwgaW5kZXgsIHBhcmVudCkpIHtcbiAgICBwYXJ0cy5wdXNoKCc8Jywgbm9kZS50YWdOYW1lLCBhdHRyaWJ1dGVzID8gJyAnICsgYXR0cmlidXRlcyA6ICcnKVxuXG4gICAgaWYgKFxuICAgICAgc2VsZkNsb3NpbmcgJiZcbiAgICAgIChzY2hlbWEuc3BhY2UgPT09ICdzdmcnIHx8IHN0YXRlLnNldHRpbmdzLmNsb3NlU2VsZkNsb3NpbmcpXG4gICAgKSB7XG4gICAgICBsYXN0ID0gYXR0cmlidXRlcy5jaGFyQXQoYXR0cmlidXRlcy5sZW5ndGggLSAxKVxuICAgICAgaWYgKFxuICAgICAgICAhc3RhdGUuc2V0dGluZ3MudGlnaHRTZWxmQ2xvc2luZyB8fFxuICAgICAgICBsYXN0ID09PSAnLycgfHxcbiAgICAgICAgKGxhc3QgJiYgbGFzdCAhPT0gJ1wiJyAmJiBsYXN0ICE9PSBcIidcIilcbiAgICAgICkge1xuICAgICAgICBwYXJ0cy5wdXNoKCcgJylcbiAgICAgIH1cblxuICAgICAgcGFydHMucHVzaCgnLycpXG4gICAgfVxuXG4gICAgcGFydHMucHVzaCgnPicpXG4gIH1cblxuICBwYXJ0cy5wdXNoKGNvbnRlbnQpXG5cbiAgaWYgKCFzZWxmQ2xvc2luZyAmJiAoIW9taXQgfHwgIWNsb3Npbmcobm9kZSwgaW5kZXgsIHBhcmVudCkpKSB7XG4gICAgcGFydHMucHVzaCgnPC8nICsgbm9kZS50YWdOYW1lICsgJz4nKVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzLmpvaW4oJycpXG59XG5cbi8qKlxuICogQHBhcmFtIHtTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7UHJvcGVydGllcyB8IG51bGwgfCB1bmRlZmluZWR9IHByb3BlcnRpZXNcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHNlcmlhbGl6ZUF0dHJpYnV0ZXMoc3RhdGUsIHByb3BlcnRpZXMpIHtcbiAgLyoqIEB0eXBlIHtBcnJheTxzdHJpbmc+fSAqL1xuICBjb25zdCB2YWx1ZXMgPSBbXVxuICBsZXQgaW5kZXggPSAtMVxuICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgbGV0IGtleVxuXG4gIGlmIChwcm9wZXJ0aWVzKSB7XG4gICAgZm9yIChrZXkgaW4gcHJvcGVydGllcykge1xuICAgICAgaWYgKHByb3BlcnRpZXNba2V5XSAhPT0gbnVsbCAmJiBwcm9wZXJ0aWVzW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHNlcmlhbGl6ZUF0dHJpYnV0ZShzdGF0ZSwga2V5LCBwcm9wZXJ0aWVzW2tleV0pXG4gICAgICAgIGlmICh2YWx1ZSkgdmFsdWVzLnB1c2godmFsdWUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgd2hpbGUgKCsraW5kZXggPCB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgY29uc3QgbGFzdCA9IHN0YXRlLnNldHRpbmdzLnRpZ2h0QXR0cmlidXRlc1xuICAgICAgPyB2YWx1ZXNbaW5kZXhdLmNoYXJBdCh2YWx1ZXNbaW5kZXhdLmxlbmd0aCAtIDEpXG4gICAgICA6IHVuZGVmaW5lZFxuXG4gICAgLy8gSW4gdGlnaHQgbW9kZSwgZG9u4oCZdCBhZGQgYSBzcGFjZSBhZnRlciBxdW90ZWQgYXR0cmlidXRlcy5cbiAgICBpZiAoaW5kZXggIT09IHZhbHVlcy5sZW5ndGggLSAxICYmIGxhc3QgIT09ICdcIicgJiYgbGFzdCAhPT0gXCInXCIpIHtcbiAgICAgIHZhbHVlc1tpbmRleF0gKz0gJyAnXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHZhbHVlcy5qb2luKCcnKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7U3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1Byb3BlcnRpZXNba2V5b2YgUHJvcGVydGllc119IHZhbHVlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBzZXJpYWxpemVBdHRyaWJ1dGUoc3RhdGUsIGtleSwgdmFsdWUpIHtcbiAgY29uc3QgaW5mbyA9IGZpbmQoc3RhdGUuc2NoZW1hLCBrZXkpXG4gIGNvbnN0IHggPVxuICAgIHN0YXRlLnNldHRpbmdzLmFsbG93UGFyc2VFcnJvcnMgJiYgc3RhdGUuc2NoZW1hLnNwYWNlID09PSAnaHRtbCcgPyAwIDogMVxuICBjb25zdCB5ID0gc3RhdGUuc2V0dGluZ3MuYWxsb3dEYW5nZXJvdXNDaGFyYWN0ZXJzID8gMCA6IDFcbiAgbGV0IHF1b3RlID0gc3RhdGUucXVvdGVcbiAgLyoqIEB0eXBlIHtzdHJpbmcgfCB1bmRlZmluZWR9ICovXG4gIGxldCByZXN1bHRcblxuICBpZiAoaW5mby5vdmVybG9hZGVkQm9vbGVhbiAmJiAodmFsdWUgPT09IGluZm8uYXR0cmlidXRlIHx8IHZhbHVlID09PSAnJykpIHtcbiAgICB2YWx1ZSA9IHRydWVcbiAgfSBlbHNlIGlmIChcbiAgICAoaW5mby5ib29sZWFuIHx8IGluZm8ub3ZlcmxvYWRlZEJvb2xlYW4pICYmXG4gICAgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycgfHwgdmFsdWUgPT09IGluZm8uYXR0cmlidXRlIHx8IHZhbHVlID09PSAnJylcbiAgKSB7XG4gICAgdmFsdWUgPSBCb29sZWFuKHZhbHVlKVxuICB9XG5cbiAgaWYgKFxuICAgIHZhbHVlID09PSBudWxsIHx8XG4gICAgdmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuICAgIHZhbHVlID09PSBmYWxzZSB8fFxuICAgICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIE51bWJlci5pc05hTih2YWx1ZSkpXG4gICkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgY29uc3QgbmFtZSA9IHN0cmluZ2lmeUVudGl0aWVzKFxuICAgIGluZm8uYXR0cmlidXRlLFxuICAgIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnNldHRpbmdzLmNoYXJhY3RlclJlZmVyZW5jZXMsIHtcbiAgICAgIC8vIEFsd2F5cyBlbmNvZGUgd2l0aG91dCBwYXJzZSBlcnJvcnMgaW4gbm9uLUhUTUwuXG4gICAgICBzdWJzZXQ6IGNvbnN0YW50cy5uYW1lW3hdW3ldXG4gICAgfSlcbiAgKVxuXG4gIC8vIE5vIHZhbHVlLlxuICAvLyBUaGVyZSBpcyBjdXJyZW50bHkgb25seSBvbmUgYm9vbGVhbiBwcm9wZXJ0eSBpbiBTVkc6IGBbZG93bmxvYWRdYCBvblxuICAvLyBgPGE+YC5cbiAgLy8gVGhpcyBwcm9wZXJ0eSBkb2VzIG5vdCBzZWVtIHRvIHdvcmsgaW4gYnJvd3NlcnMgKEZpcmVmb3gsIFNhZmFyaSwgQ2hyb21lKSxcbiAgLy8gc28gSSBjYW7igJl0IHRlc3QgaWYgZHJvcHBpbmcgdGhlIHZhbHVlIHdvcmtzLlxuICAvLyBCdXQgSSBhc3N1bWUgdGhhdCBpdCBzaG91bGQ6XG4gIC8vXG4gIC8vIGBgYGh0bWxcbiAgLy8gPCFkb2N0eXBlIGh0bWw+XG4gIC8vIDxzdmcgdmlld0JveD1cIjAgMCAxMDAgMTAwXCI+XG4gIC8vICAgPGEgaHJlZj1odHRwczovL2V4YW1wbGUuY29tIGRvd25sb2FkPlxuICAvLyAgICAgPGNpcmNsZSBjeD01MCBjeT00MCByPTM1IC8+XG4gIC8vICAgPC9hPlxuICAvLyA8L3N2Zz5cbiAgLy8gYGBgXG4gIC8vXG4gIC8vIFNlZTogPGh0dHBzOi8vZ2l0aHViLmNvbS93b29vcm0vcHJvcGVydHktaW5mb3JtYXRpb24vYmxvYi9tYWluL2xpYi9zdmcuanM+XG4gIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgcmV0dXJuIG5hbWVcblxuICAvLyBgc3BhY2VzYCBkb2VzbuKAmXQgYWNjZXB0IGEgc2Vjb25kIGFyZ3VtZW50LCBidXQgaXTigJlzIGdpdmVuIGhlcmUganVzdCB0b1xuICAvLyBrZWVwIHRoZSBjb2RlIGNsZWFuZXIuXG4gIHZhbHVlID0gQXJyYXkuaXNBcnJheSh2YWx1ZSlcbiAgICA/IChpbmZvLmNvbW1hU2VwYXJhdGVkID8gY29tbWFzIDogc3BhY2VzKSh2YWx1ZSwge1xuICAgICAgICBwYWRMZWZ0OiAhc3RhdGUuc2V0dGluZ3MudGlnaHRDb21tYVNlcGFyYXRlZExpc3RzXG4gICAgICB9KVxuICAgIDogU3RyaW5nKHZhbHVlKVxuXG4gIGlmIChzdGF0ZS5zZXR0aW5ncy5jb2xsYXBzZUVtcHR5QXR0cmlidXRlcyAmJiAhdmFsdWUpIHJldHVybiBuYW1lXG5cbiAgLy8gQ2hlY2sgdW5xdW90ZWQgdmFsdWUuXG4gIGlmIChzdGF0ZS5zZXR0aW5ncy5wcmVmZXJVbnF1b3RlZCkge1xuICAgIHJlc3VsdCA9IHN0cmluZ2lmeUVudGl0aWVzKFxuICAgICAgdmFsdWUsXG4gICAgICBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zZXR0aW5ncy5jaGFyYWN0ZXJSZWZlcmVuY2VzLCB7XG4gICAgICAgIGF0dHJpYnV0ZTogdHJ1ZSxcbiAgICAgICAgc3Vic2V0OiBjb25zdGFudHMudW5xdW90ZWRbeF1beV1cbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgLy8gSWYgd2UgZG9u4oCZdCB3YW50IHVucXVvdGVkLCBvciBpZiBgdmFsdWVgIGNvbnRhaW5zIGNoYXJhY3RlciByZWZlcmVuY2VzIHdoZW5cbiAgLy8gdW5xdW90ZWTigKZcbiAgaWYgKHJlc3VsdCAhPT0gdmFsdWUpIHtcbiAgICAvLyBJZiB0aGUgYWx0ZXJuYXRpdmUgaXMgbGVzcyBjb21tb24gdGhhbiBgcXVvdGVgLCBzd2l0Y2guXG4gICAgaWYgKFxuICAgICAgc3RhdGUuc2V0dGluZ3MucXVvdGVTbWFydCAmJlxuICAgICAgY2NvdW50KHZhbHVlLCBxdW90ZSkgPiBjY291bnQodmFsdWUsIHN0YXRlLmFsdGVybmF0aXZlKVxuICAgICkge1xuICAgICAgcXVvdGUgPSBzdGF0ZS5hbHRlcm5hdGl2ZVxuICAgIH1cblxuICAgIHJlc3VsdCA9XG4gICAgICBxdW90ZSArXG4gICAgICBzdHJpbmdpZnlFbnRpdGllcyhcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnNldHRpbmdzLmNoYXJhY3RlclJlZmVyZW5jZXMsIHtcbiAgICAgICAgICAvLyBBbHdheXMgZW5jb2RlIHdpdGhvdXQgcGFyc2UgZXJyb3JzIGluIG5vbi1IVE1MLlxuICAgICAgICAgIHN1YnNldDogKHF1b3RlID09PSBcIidcIiA/IGNvbnN0YW50cy5zaW5nbGUgOiBjb25zdGFudHMuZG91YmxlKVt4XVt5XSxcbiAgICAgICAgICBhdHRyaWJ1dGU6IHRydWVcbiAgICAgICAgfSlcbiAgICAgICkgK1xuICAgICAgcXVvdGVcbiAgfVxuXG4gIC8vIERvbuKAmXQgYWRkIGEgYD1gIGZvciB1bnF1b3RlZCBlbXB0aWVzLlxuICByZXR1cm4gbmFtZSArIChyZXN1bHQgPyAnPScgKyByZXN1bHQgOiByZXN1bHQpXG59XG4iLCIvKipcbiAqIEBpbXBvcnQge1BhcmVudHMsIFRleHR9IGZyb20gJ2hhc3QnXG4gKiBAaW1wb3J0IHtSYXd9IGZyb20gJ21kYXN0LXV0aWwtdG8taGFzdCdcbiAqIEBpbXBvcnQge1N0YXRlfSBmcm9tICcuLi9pbmRleC5qcydcbiAqL1xuXG5pbXBvcnQge3N0cmluZ2lmeUVudGl0aWVzfSBmcm9tICdzdHJpbmdpZnktZW50aXRpZXMnXG5cbi8vIERlY2xhcmUgYXJyYXkgYXMgdmFyaWFibGUgc28gaXQgY2FuIGJlIGNhY2hlZCBieSBgc3RyaW5naWZ5RW50aXRpZXNgXG5jb25zdCB0ZXh0RW50aXR5U3Vic2V0ID0gWyc8JywgJyYnXVxuXG4vKipcbiAqIFNlcmlhbGl6ZSBhIHRleHQgbm9kZS5cbiAqXG4gKiBAcGFyYW0ge1JhdyB8IFRleHR9IG5vZGVcbiAqICAgTm9kZSB0byBoYW5kbGUuXG4gKiBAcGFyYW0ge251bWJlciB8IHVuZGVmaW5lZH0gX1xuICogICBJbmRleCBvZiBgbm9kZWAgaW4gYHBhcmVudC5cbiAqIEBwYXJhbSB7UGFyZW50cyB8IHVuZGVmaW5lZH0gcGFyZW50XG4gKiAgIFBhcmVudCBvZiBgbm9kZWAuXG4gKiBAcGFyYW0ge1N0YXRlfSBzdGF0ZVxuICogICBJbmZvIHBhc3NlZCBhcm91bmQgYWJvdXQgdGhlIGN1cnJlbnQgc3RhdGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogICBTZXJpYWxpemVkIG5vZGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0ZXh0KG5vZGUsIF8sIHBhcmVudCwgc3RhdGUpIHtcbiAgLy8gQ2hlY2sgaWYgY29udGVudCBvZiBgbm9kZWAgc2hvdWxkIGJlIGVzY2FwZWQuXG4gIHJldHVybiBwYXJlbnQgJiZcbiAgICBwYXJlbnQudHlwZSA9PT0gJ2VsZW1lbnQnICYmXG4gICAgKHBhcmVudC50YWdOYW1lID09PSAnc2NyaXB0JyB8fCBwYXJlbnQudGFnTmFtZSA9PT0gJ3N0eWxlJylcbiAgICA/IG5vZGUudmFsdWVcbiAgICA6IHN0cmluZ2lmeUVudGl0aWVzKFxuICAgICAgICBub2RlLnZhbHVlLFxuICAgICAgICBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zZXR0aW5ncy5jaGFyYWN0ZXJSZWZlcmVuY2VzLCB7XG4gICAgICAgICAgc3Vic2V0OiB0ZXh0RW50aXR5U3Vic2V0XG4gICAgICAgIH0pXG4gICAgICApXG59XG4iLCIvKipcbiAqIEBpbXBvcnQge1BhcmVudHN9IGZyb20gJ2hhc3QnXG4gKiBAaW1wb3J0IHtSYXd9IGZyb20gJ21kYXN0LXV0aWwtdG8taGFzdCdcbiAqIEBpbXBvcnQge1N0YXRlfSBmcm9tICcuLi9pbmRleC5qcydcbiAqL1xuXG5pbXBvcnQge3RleHR9IGZyb20gJy4vdGV4dC5qcydcblxuLyoqXG4gKiBTZXJpYWxpemUgYSByYXcgbm9kZS5cbiAqXG4gKiBAcGFyYW0ge1Jhd30gbm9kZVxuICogICBOb2RlIHRvIGhhbmRsZS5cbiAqIEBwYXJhbSB7bnVtYmVyIHwgdW5kZWZpbmVkfSBpbmRleFxuICogICBJbmRleCBvZiBgbm9kZWAgaW4gYHBhcmVudC5cbiAqIEBwYXJhbSB7UGFyZW50cyB8IHVuZGVmaW5lZH0gcGFyZW50XG4gKiAgIFBhcmVudCBvZiBgbm9kZWAuXG4gKiBAcGFyYW0ge1N0YXRlfSBzdGF0ZVxuICogICBJbmZvIHBhc3NlZCBhcm91bmQgYWJvdXQgdGhlIGN1cnJlbnQgc3RhdGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogICBTZXJpYWxpemVkIG5vZGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYXcobm9kZSwgaW5kZXgsIHBhcmVudCwgc3RhdGUpIHtcbiAgcmV0dXJuIHN0YXRlLnNldHRpbmdzLmFsbG93RGFuZ2Vyb3VzSHRtbFxuICAgID8gbm9kZS52YWx1ZVxuICAgIDogdGV4dChub2RlLCBpbmRleCwgcGFyZW50LCBzdGF0ZSlcbn1cbiIsIi8qKlxuICogQGltcG9ydCB7UGFyZW50cywgUm9vdH0gZnJvbSAnaGFzdCdcbiAqIEBpbXBvcnQge1N0YXRlfSBmcm9tICcuLi9pbmRleC5qcydcbiAqL1xuXG4vKipcbiAqIFNlcmlhbGl6ZSBhIHJvb3QuXG4gKlxuICogQHBhcmFtIHtSb290fSBub2RlXG4gKiAgIE5vZGUgdG8gaGFuZGxlLlxuICogQHBhcmFtIHtudW1iZXIgfCB1bmRlZmluZWR9IF8xXG4gKiAgIEluZGV4IG9mIGBub2RlYCBpbiBgcGFyZW50LlxuICogQHBhcmFtIHtQYXJlbnRzIHwgdW5kZWZpbmVkfSBfMlxuICogICBQYXJlbnQgb2YgYG5vZGVgLlxuICogQHBhcmFtIHtTdGF0ZX0gc3RhdGVcbiAqICAgSW5mbyBwYXNzZWQgYXJvdW5kIGFib3V0IHRoZSBjdXJyZW50IHN0YXRlLlxuICogQHJldHVybnMge3N0cmluZ31cbiAqICAgU2VyaWFsaXplZCBub2RlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcm9vdChub2RlLCBfMSwgXzIsIHN0YXRlKSB7XG4gIHJldHVybiBzdGF0ZS5hbGwobm9kZSlcbn1cbiIsIi8qKlxuICogQGltcG9ydCB7Tm9kZXMsIFBhcmVudHN9IGZyb20gJ2hhc3QnXG4gKiBAaW1wb3J0IHtTdGF0ZX0gZnJvbSAnLi4vaW5kZXguanMnXG4gKi9cblxuaW1wb3J0IHt6d2l0Y2h9IGZyb20gJ3p3aXRjaCdcbmltcG9ydCB7Y29tbWVudH0gZnJvbSAnLi9jb21tZW50LmpzJ1xuaW1wb3J0IHtkb2N0eXBlfSBmcm9tICcuL2RvY3R5cGUuanMnXG5pbXBvcnQge2VsZW1lbnR9IGZyb20gJy4vZWxlbWVudC5qcydcbmltcG9ydCB7cmF3fSBmcm9tICcuL3Jhdy5qcydcbmltcG9ydCB7cm9vdH0gZnJvbSAnLi9yb290LmpzJ1xuaW1wb3J0IHt0ZXh0fSBmcm9tICcuL3RleHQuanMnXG5cbi8qKlxuICogQHR5cGUgeyhub2RlOiBOb2RlcywgaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZCwgcGFyZW50OiBQYXJlbnRzIHwgdW5kZWZpbmVkLCBzdGF0ZTogU3RhdGUpID0+IHN0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGhhbmRsZSA9IHp3aXRjaCgndHlwZScsIHtcbiAgaW52YWxpZCxcbiAgdW5rbm93bixcbiAgaGFuZGxlcnM6IHtjb21tZW50LCBkb2N0eXBlLCBlbGVtZW50LCByYXcsIHJvb3QsIHRleHR9XG59KVxuXG4vKipcbiAqIEZhaWwgd2hlbiBhIG5vbi1ub2RlIGlzIGZvdW5kIGluIHRoZSB0cmVlLlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gbm9kZVxuICogICBVbmtub3duIHZhbHVlLlxuICogQHJldHVybnMge25ldmVyfVxuICogICBOZXZlci5cbiAqL1xuZnVuY3Rpb24gaW52YWxpZChub2RlKSB7XG4gIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgbm9kZSwgbm90IGAnICsgbm9kZSArICdgJylcbn1cblxuLyoqXG4gKiBGYWlsIHdoZW4gYSBub2RlIHdpdGggYW4gdW5rbm93biB0eXBlIGlzIGZvdW5kIGluIHRoZSB0cmVlLlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gbm9kZV9cbiAqICBVbmtub3duIG5vZGUuXG4gKiBAcmV0dXJucyB7bmV2ZXJ9XG4gKiAgIE5ldmVyLlxuICovXG5mdW5jdGlvbiB1bmtub3duKG5vZGVfKSB7XG4gIC8vIGB0eXBlYCBpcyBndWFyYW50ZWVkIGJ5IHJ1bnRpbWUgSlMuXG4gIGNvbnN0IG5vZGUgPSAvKiogQHR5cGUge05vZGVzfSAqLyAobm9kZV8pXG4gIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNvbXBpbGUgdW5rbm93biBub2RlIGAnICsgbm9kZS50eXBlICsgJ2AnKVxufVxuIiwiLyoqXG4gKiBAaW1wb3J0IHtOb2RlcywgUGFyZW50cywgUm9vdENvbnRlbnR9IGZyb20gJ2hhc3QnXG4gKiBAaW1wb3J0IHtTY2hlbWF9IGZyb20gJ3Byb3BlcnR5LWluZm9ybWF0aW9uJ1xuICogQGltcG9ydCB7T3B0aW9ucyBhcyBTdHJpbmdpZnlFbnRpdGllc09wdGlvbnN9IGZyb20gJ3N0cmluZ2lmeS1lbnRpdGllcydcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPbWl0PFN0cmluZ2lmeUVudGl0aWVzT3B0aW9ucywgJ2F0dHJpYnV0ZScgfCAnZXNjYXBlT25seScgfCAnc3Vic2V0Jz59IENoYXJhY3RlclJlZmVyZW5jZXNcbiAqXG4gKiBAdHlwZWRlZiBPcHRpb25zXG4gKiAgIENvbmZpZ3VyYXRpb24uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkfSBbYWxsb3dEYW5nZXJvdXNDaGFyYWN0ZXJzPWZhbHNlXVxuICogICBEbyBub3QgZW5jb2RlIHNvbWUgY2hhcmFjdGVycyB3aGljaCBjYXVzZSBYU1MgdnVsbmVyYWJpbGl0aWVzIGluIG9sZGVyXG4gKiAgIGJyb3dzZXJzIChkZWZhdWx0OiBgZmFsc2VgKS5cbiAqXG4gKiAgID4g4pqg77iPICoqRGFuZ2VyKio6IG9ubHkgc2V0IHRoaXMgaWYgeW91IGNvbXBsZXRlbHkgdHJ1c3QgdGhlIGNvbnRlbnQuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkfSBbYWxsb3dEYW5nZXJvdXNIdG1sPWZhbHNlXVxuICogICBBbGxvdyBgcmF3YCBub2RlcyBhbmQgaW5zZXJ0IHRoZW0gYXMgcmF3IEhUTUwgKGRlZmF1bHQ6IGBmYWxzZWApLlxuICpcbiAqICAgV2hlbiBgZmFsc2VgLCBgUmF3YCBub2RlcyBhcmUgZW5jb2RlZC5cbiAqXG4gKiAgID4g4pqg77iPICoqRGFuZ2VyKio6IG9ubHkgc2V0IHRoaXMgaWYgeW91IGNvbXBsZXRlbHkgdHJ1c3QgdGhlIGNvbnRlbnQuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkfSBbYWxsb3dQYXJzZUVycm9ycz1mYWxzZV1cbiAqICAgRG8gbm90IGVuY29kZSBjaGFyYWN0ZXJzIHdoaWNoIGNhdXNlIHBhcnNlIGVycm9ycyAoZXZlbiB0aG91Z2ggdGhleSB3b3JrKSxcbiAqICAgdG8gc2F2ZSBieXRlcyAoZGVmYXVsdDogYGZhbHNlYCkuXG4gKlxuICogICBOb3QgdXNlZCBpbiB0aGUgU1ZHIHNwYWNlLlxuICpcbiAqICAgPiDwn5GJICoqTm90ZSoqOiBpbnRlbnRpb25hbGx5IGNyZWF0ZXMgcGFyc2UgZXJyb3JzIGluIG1hcmt1cCAoaG93IHBhcnNlXG4gKiAgID4gZXJyb3JzIGFyZSBoYW5kbGVkIGlzIHdlbGwgZGVmaW5lZCwgc28gdGhpcyB3b3JrcyBidXQgaXNu4oCZdCBwcmV0dHkpLlxuICogQHByb3BlcnR5IHtib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZH0gW2JvZ3VzQ29tbWVudHM9ZmFsc2VdXG4gKiAgIFVzZSDigJxib2d1cyBjb21tZW50c+KAnSBpbnN0ZWFkIG9mIGNvbW1lbnRzIHRvIHNhdmUgYnllczogYDw/Y2hhcmxpZT5gXG4gKiAgIGluc3RlYWQgb2YgYDwhLS1jaGFybGllLS0+YCAoZGVmYXVsdDogYGZhbHNlYCkuXG4gKlxuICogICA+IPCfkYkgKipOb3RlKio6IGludGVudGlvbmFsbHkgY3JlYXRlcyBwYXJzZSBlcnJvcnMgaW4gbWFya3VwIChob3cgcGFyc2VcbiAqICAgPiBlcnJvcnMgYXJlIGhhbmRsZWQgaXMgd2VsbCBkZWZpbmVkLCBzbyB0aGlzIHdvcmtzIGJ1dCBpc27igJl0IHByZXR0eSkuXG4gKiBAcHJvcGVydHkge0NoYXJhY3RlclJlZmVyZW5jZXMgfCBudWxsIHwgdW5kZWZpbmVkfSBbY2hhcmFjdGVyUmVmZXJlbmNlc11cbiAqICAgQ29uZmlndXJlIGhvdyB0byBzZXJpYWxpemUgY2hhcmFjdGVyIHJlZmVyZW5jZXMgKG9wdGlvbmFsKS5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWR9IFtjbG9zZUVtcHR5RWxlbWVudHM9ZmFsc2VdXG4gKiAgIENsb3NlIFNWRyBlbGVtZW50cyB3aXRob3V0IGFueSBjb250ZW50IHdpdGggc2xhc2ggKGAvYCkgb24gdGhlIG9wZW5pbmcgdGFnXG4gKiAgIGluc3RlYWQgb2YgYW4gZW5kIHRhZzogYDxjaXJjbGUgLz5gIGluc3RlYWQgb2YgYDxjaXJjbGU+PC9jaXJjbGU+YFxuICogICAoZGVmYXVsdDogYGZhbHNlYCkuXG4gKlxuICogICBTZWUgYHRpZ2h0U2VsZkNsb3NpbmdgIHRvIGNvbnRyb2wgd2hldGhlciBhIHNwYWNlIGlzIHVzZWQgYmVmb3JlIHRoZVxuICogICBzbGFzaC5cbiAqXG4gKiAgIE5vdCB1c2VkIGluIHRoZSBIVE1MIHNwYWNlLlxuICogQHByb3BlcnR5IHtib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZH0gW2Nsb3NlU2VsZkNsb3Npbmc9ZmFsc2VdXG4gKiAgIENsb3NlIHNlbGYtY2xvc2luZyBub2RlcyB3aXRoIGFuIGV4dHJhIHNsYXNoIChgL2ApOiBgPGltZyAvPmAgaW5zdGVhZCBvZlxuICogICBgPGltZz5gIChkZWZhdWx0OiBgZmFsc2VgKS5cbiAqXG4gKiAgIFNlZSBgdGlnaHRTZWxmQ2xvc2luZ2AgdG8gY29udHJvbCB3aGV0aGVyIGEgc3BhY2UgaXMgdXNlZCBiZWZvcmUgdGhlXG4gKiAgIHNsYXNoLlxuICpcbiAqICAgTm90IHVzZWQgaW4gdGhlIFNWRyBzcGFjZS5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWR9IFtjb2xsYXBzZUVtcHR5QXR0cmlidXRlcz1mYWxzZV1cbiAqICAgQ29sbGFwc2UgZW1wdHkgYXR0cmlidXRlczogZ2V0IGBjbGFzc2AgaW5zdGVhZCBvZiBgY2xhc3M9XCJcImAgKGRlZmF1bHQ6XG4gKiAgIGBmYWxzZWApLlxuICpcbiAqICAgTm90IHVzZWQgaW4gdGhlIFNWRyBzcGFjZS5cbiAqXG4gKiAgID4g8J+RiSAqKk5vdGUqKjogYm9vbGVhbiBhdHRyaWJ1dGVzIChzdWNoIGFzIGBoaWRkZW5gKSBhcmUgYWx3YXlzIGNvbGxhcHNlZC5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWR9IFtvbWl0T3B0aW9uYWxUYWdzPWZhbHNlXVxuICogICBPbWl0IG9wdGlvbmFsIG9wZW5pbmcgYW5kIGNsb3NpbmcgdGFncyAoZGVmYXVsdDogYGZhbHNlYCkuXG4gKlxuICogICBGb3IgZXhhbXBsZSwgaW4gYDxvbD48bGk+b25lPC9saT48bGk+dHdvPC9saT48L29sPmAsIGJvdGggYDwvbGk+YCBjbG9zaW5nXG4gKiAgIHRhZ3MgY2FuIGJlIG9taXR0ZWQuXG4gKiAgIFRoZSBmaXJzdCBiZWNhdXNlIGl04oCZcyBmb2xsb3dlZCBieSBhbm90aGVyIGBsaWAsIHRoZSBsYXN0IGJlY2F1c2UgaXTigJlzXG4gKiAgIGZvbGxvd2VkIGJ5IG5vdGhpbmcuXG4gKlxuICogICBOb3QgdXNlZCBpbiB0aGUgU1ZHIHNwYWNlLlxuICogQHByb3BlcnR5IHtib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZH0gW3ByZWZlclVucXVvdGVkPWZhbHNlXVxuICogICBMZWF2ZSBhdHRyaWJ1dGVzIHVucXVvdGVkIGlmIHRoYXQgcmVzdWx0cyBpbiBsZXNzIGJ5dGVzIChkZWZhdWx0OiBgZmFsc2VgKS5cbiAqXG4gKiAgIE5vdCB1c2VkIGluIHRoZSBTVkcgc3BhY2UuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkfSBbcXVvdGVTbWFydD1mYWxzZV1cbiAqICAgVXNlIHRoZSBvdGhlciBxdW90ZSBpZiB0aGF0IHJlc3VsdHMgaW4gbGVzcyBieXRlcyAoZGVmYXVsdDogYGZhbHNlYCkuXG4gKiBAcHJvcGVydHkge1F1b3RlIHwgbnVsbCB8IHVuZGVmaW5lZH0gW3F1b3RlPSdcIiddXG4gKiAgIFByZWZlcnJlZCBxdW90ZSB0byB1c2UgKGRlZmF1bHQ6IGAnXCInYCkuXG4gKiBAcHJvcGVydHkge1NwYWNlIHwgbnVsbCB8IHVuZGVmaW5lZH0gW3NwYWNlPSdodG1sJ11cbiAqICAgV2hlbiBhbiBgPHN2Zz5gIGVsZW1lbnQgaXMgZm91bmQgaW4gdGhlIEhUTUwgc3BhY2UsIHRoaXMgcGFja2FnZSBhbHJlYWR5XG4gKiAgIGF1dG9tYXRpY2FsbHkgc3dpdGNoZXMgdG8gYW5kIGZyb20gdGhlIFNWRyBzcGFjZSB3aGVuIGVudGVyaW5nIGFuZCBleGl0aW5nXG4gKiAgIGl0IChkZWZhdWx0OiBgJ2h0bWwnYCkuXG4gKlxuICogICA+IPCfkYkgKipOb3RlKio6IGhhc3QgaXMgbm90IFhNTC5cbiAqICAgPiBJdCBzdXBwb3J0cyBTVkcgYXMgZW1iZWRkZWQgaW4gSFRNTC5cbiAqICAgPiBJdCBkb2VzIG5vdCBzdXBwb3J0IHRoZSBmZWF0dXJlcyBhdmFpbGFibGUgaW4gWE1MLlxuICogICA+IFBhc3NpbmcgU1ZHIG1pZ2h0IGJyZWFrIGJ1dCBmcmFnbWVudHMgb2YgbW9kZXJuIFNWRyBzaG91bGQgYmUgZmluZS5cbiAqICAgPiBVc2UgW2B4YXN0YF1beGFzdF0gaWYgeW91IG5lZWQgdG8gc3VwcG9ydCBTVkcgYXMgWE1MLlxuICogQHByb3BlcnR5IHtib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZH0gW3RpZ2h0QXR0cmlidXRlcz1mYWxzZV1cbiAqICAgSm9pbiBhdHRyaWJ1dGVzIHRvZ2V0aGVyLCB3aXRob3V0IHdoaXRlc3BhY2UsIGlmIHBvc3NpYmxlOiBnZXRcbiAqICAgYGNsYXNzPVwiYSBiXCJ0aXRsZT1cImMgZFwiYCBpbnN0ZWFkIG9mIGBjbGFzcz1cImEgYlwiIHRpdGxlPVwiYyBkXCJgIHRvIHNhdmVcbiAqICAgYnl0ZXMgKGRlZmF1bHQ6IGBmYWxzZWApLlxuICpcbiAqICAgTm90IHVzZWQgaW4gdGhlIFNWRyBzcGFjZS5cbiAqXG4gKiAgID4g8J+RiSAqKk5vdGUqKjogaW50ZW50aW9uYWxseSBjcmVhdGVzIHBhcnNlIGVycm9ycyBpbiBtYXJrdXAgKGhvdyBwYXJzZVxuICogICA+IGVycm9ycyBhcmUgaGFuZGxlZCBpcyB3ZWxsIGRlZmluZWQsIHNvIHRoaXMgd29ya3MgYnV0IGlzbuKAmXQgcHJldHR5KS5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWR9IFt0aWdodENvbW1hU2VwYXJhdGVkTGlzdHM9ZmFsc2VdXG4gKiAgIEpvaW4ga25vd24gY29tbWEtc2VwYXJhdGVkIGF0dHJpYnV0ZSB2YWx1ZXMgd2l0aCBqdXN0IGEgY29tbWEgKGAsYCksXG4gKiAgIGluc3RlYWQgb2YgcGFkZGluZyB0aGVtIG9uIHRoZSByaWdodCBhcyB3ZWxsIChgLOKQoGAsIHdoZXJlIGDikKBgIHJlcHJlc2VudHMgYVxuICogICBzcGFjZSkgKGRlZmF1bHQ6IGBmYWxzZWApLlxuICogQHByb3BlcnR5IHtib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZH0gW3RpZ2h0RG9jdHlwZT1mYWxzZV1cbiAqICAgRHJvcCB1bm5lZWRlZCBzcGFjZXMgaW4gZG9jdHlwZXM6IGA8IWRvY3R5cGVodG1sPmAgaW5zdGVhZCBvZlxuICogICBgPCFkb2N0eXBlIGh0bWw+YCB0byBzYXZlIGJ5dGVzIChkZWZhdWx0OiBgZmFsc2VgKS5cbiAqXG4gKiAgID4g8J+RiSAqKk5vdGUqKjogaW50ZW50aW9uYWxseSBjcmVhdGVzIHBhcnNlIGVycm9ycyBpbiBtYXJrdXAgKGhvdyBwYXJzZVxuICogICA+IGVycm9ycyBhcmUgaGFuZGxlZCBpcyB3ZWxsIGRlZmluZWQsIHNvIHRoaXMgd29ya3MgYnV0IGlzbuKAmXQgcHJldHR5KS5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWR9IFt0aWdodFNlbGZDbG9zaW5nPWZhbHNlXVxuICogICBEbyBub3QgdXNlIGFuIGV4dHJhIHNwYWNlIHdoZW4gY2xvc2luZyBzZWxmLWNsb3NpbmcgZWxlbWVudHM6IGA8aW1nLz5gXG4gKiAgIGluc3RlYWQgb2YgYDxpbWcgLz5gIChkZWZhdWx0OiBgZmFsc2VgKS5cbiAqXG4gKiAgID4g8J+RiSAqKk5vdGUqKjogb25seSB1c2VkIGlmIGBjbG9zZVNlbGZDbG9zaW5nOiB0cnVlYCBvclxuICogICA+IGBjbG9zZUVtcHR5RWxlbWVudHM6IHRydWVgLlxuICogQHByb3BlcnR5IHtib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZH0gW3VwcGVyRG9jdHlwZT1mYWxzZV1cbiAqICAgVXNlIGEgYDwhRE9DVFlQReKApmAgaW5zdGVhZCBvZiBgPCFkb2N0eXBl4oCmYCAoZGVmYXVsdDogYGZhbHNlYCkuXG4gKlxuICogICBVc2VsZXNzIGV4Y2VwdCBmb3IgWEhUTUwuXG4gKiBAcHJvcGVydHkge1JlYWRvbmx5QXJyYXk8c3RyaW5nPiB8IG51bGwgfCB1bmRlZmluZWR9IFt2b2lkc11cbiAqICAgVGFnIG5hbWVzIG9mIGVsZW1lbnRzIHRvIHNlcmlhbGl6ZSB3aXRob3V0IGNsb3NpbmcgdGFnIChkZWZhdWx0OiBgaHRtbC12b2lkLWVsZW1lbnRzYCkuXG4gKlxuICogICBOb3QgdXNlZCBpbiB0aGUgU1ZHIHNwYWNlLlxuICpcbiAqICAgPiDwn5GJICoqTm90ZSoqOiBJdOKAmXMgaGlnaGx5IHVubGlrZWx5IHRoYXQgeW91IHdhbnQgdG8gcGFzcyB0aGlzLCBiZWNhdXNlXG4gKiAgID4gaGFzdCBpcyBub3QgZm9yIFhNTCwgYW5kIEhUTUwgd2lsbCBub3QgYWRkIG1vcmUgdm9pZCBlbGVtZW50cy5cbiAqXG4gKiBAdHlwZWRlZiB7J1wiJyB8IFwiJ1wifSBRdW90ZVxuICogICBIVE1MIHF1b3RlcyBmb3IgYXR0cmlidXRlIHZhbHVlcy5cbiAqXG4gKiBAdHlwZWRlZiB7T21pdDxSZXF1aXJlZDx7W2tleSBpbiBrZXlvZiBPcHRpb25zXTogRXhjbHVkZTxPcHRpb25zW2tleV0sIG51bGwgfCB1bmRlZmluZWQ+fT4sICdzcGFjZScgfCAncXVvdGUnPn0gU2V0dGluZ3NcbiAqXG4gKiBAdHlwZWRlZiB7J2h0bWwnIHwgJ3N2Zyd9IFNwYWNlXG4gKiAgIE5hbWVzcGFjZS5cbiAqXG4gKiBAdHlwZWRlZiBTdGF0ZVxuICogICBJbmZvIHBhc3NlZCBhcm91bmQgYWJvdXQgdGhlIGN1cnJlbnQgc3RhdGUuXG4gKiBAcHJvcGVydHkgeyhub2RlOiBQYXJlbnRzIHwgdW5kZWZpbmVkKSA9PiBzdHJpbmd9IGFsbFxuICogICBTZXJpYWxpemUgdGhlIGNoaWxkcmVuIG9mIGEgcGFyZW50IG5vZGUuXG4gKiBAcHJvcGVydHkge1F1b3RlfSBhbHRlcm5hdGl2ZVxuICogICBBbHRlcm5hdGl2ZSBxdW90ZS5cbiAqIEBwcm9wZXJ0eSB7KG5vZGU6IE5vZGVzLCBpbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkLCBwYXJlbnQ6IFBhcmVudHMgfCB1bmRlZmluZWQpID0+IHN0cmluZ30gb25lXG4gKiAgIFNlcmlhbGl6ZSBvbmUgbm9kZS5cbiAqIEBwcm9wZXJ0eSB7UXVvdGV9IHF1b3RlXG4gKiAgIFByZWZlcnJlZCBxdW90ZS5cbiAqIEBwcm9wZXJ0eSB7U2NoZW1hfSBzY2hlbWFcbiAqICAgQ3VycmVudCBzY2hlbWEuXG4gKiBAcHJvcGVydHkge1NldHRpbmdzfSBzZXR0aW5nc1xuICogICBVc2VyIGNvbmZpZ3VyYXRpb24uXG4gKi9cblxuaW1wb3J0IHtodG1sVm9pZEVsZW1lbnRzfSBmcm9tICdodG1sLXZvaWQtZWxlbWVudHMnXG5pbXBvcnQge2h0bWwsIHN2Z30gZnJvbSAncHJvcGVydHktaW5mb3JtYXRpb24nXG5pbXBvcnQge2hhbmRsZX0gZnJvbSAnLi9oYW5kbGUvaW5kZXguanMnXG5cbi8qKiBAdHlwZSB7T3B0aW9uc30gKi9cbmNvbnN0IGVtcHR5T3B0aW9ucyA9IHt9XG5cbi8qKiBAdHlwZSB7Q2hhcmFjdGVyUmVmZXJlbmNlc30gKi9cbmNvbnN0IGVtcHR5Q2hhcmFjdGVyUmVmZXJlbmNlcyA9IHt9XG5cbi8qKiBAdHlwZSB7QXJyYXk8bmV2ZXI+fSAqL1xuY29uc3QgZW1wdHlDaGlsZHJlbiA9IFtdXG5cbi8qKlxuICogU2VyaWFsaXplIGhhc3QgYXMgSFRNTC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PFJvb3RDb250ZW50PiB8IE5vZGVzfSB0cmVlXG4gKiAgIFRyZWUgdG8gc2VyaWFsaXplLlxuICogQHBhcmFtIHtPcHRpb25zIHwgbnVsbCB8IHVuZGVmaW5lZH0gW29wdGlvbnNdXG4gKiAgIENvbmZpZ3VyYXRpb24gKG9wdGlvbmFsKS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiAgIFNlcmlhbGl6ZWQgSFRNTC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvSHRtbCh0cmVlLCBvcHRpb25zKSB7XG4gIGNvbnN0IG9wdGlvbnNfID0gb3B0aW9ucyB8fCBlbXB0eU9wdGlvbnNcbiAgY29uc3QgcXVvdGUgPSBvcHRpb25zXy5xdW90ZSB8fCAnXCInXG4gIGNvbnN0IGFsdGVybmF0aXZlID0gcXVvdGUgPT09ICdcIicgPyBcIidcIiA6ICdcIidcblxuICBpZiAocXVvdGUgIT09ICdcIicgJiYgcXVvdGUgIT09IFwiJ1wiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHF1b3RlIGAnICsgcXVvdGUgKyAnYCwgZXhwZWN0ZWQgYFxcJ2Agb3IgYFwiYCcpXG4gIH1cblxuICAvKiogQHR5cGUge1N0YXRlfSAqL1xuICBjb25zdCBzdGF0ZSA9IHtcbiAgICBvbmUsXG4gICAgYWxsLFxuICAgIHNldHRpbmdzOiB7XG4gICAgICBvbWl0T3B0aW9uYWxUYWdzOiBvcHRpb25zXy5vbWl0T3B0aW9uYWxUYWdzIHx8IGZhbHNlLFxuICAgICAgYWxsb3dQYXJzZUVycm9yczogb3B0aW9uc18uYWxsb3dQYXJzZUVycm9ycyB8fCBmYWxzZSxcbiAgICAgIGFsbG93RGFuZ2Vyb3VzQ2hhcmFjdGVyczogb3B0aW9uc18uYWxsb3dEYW5nZXJvdXNDaGFyYWN0ZXJzIHx8IGZhbHNlLFxuICAgICAgcXVvdGVTbWFydDogb3B0aW9uc18ucXVvdGVTbWFydCB8fCBmYWxzZSxcbiAgICAgIHByZWZlclVucXVvdGVkOiBvcHRpb25zXy5wcmVmZXJVbnF1b3RlZCB8fCBmYWxzZSxcbiAgICAgIHRpZ2h0QXR0cmlidXRlczogb3B0aW9uc18udGlnaHRBdHRyaWJ1dGVzIHx8IGZhbHNlLFxuICAgICAgdXBwZXJEb2N0eXBlOiBvcHRpb25zXy51cHBlckRvY3R5cGUgfHwgZmFsc2UsXG4gICAgICB0aWdodERvY3R5cGU6IG9wdGlvbnNfLnRpZ2h0RG9jdHlwZSB8fCBmYWxzZSxcbiAgICAgIGJvZ3VzQ29tbWVudHM6IG9wdGlvbnNfLmJvZ3VzQ29tbWVudHMgfHwgZmFsc2UsXG4gICAgICB0aWdodENvbW1hU2VwYXJhdGVkTGlzdHM6IG9wdGlvbnNfLnRpZ2h0Q29tbWFTZXBhcmF0ZWRMaXN0cyB8fCBmYWxzZSxcbiAgICAgIHRpZ2h0U2VsZkNsb3Npbmc6IG9wdGlvbnNfLnRpZ2h0U2VsZkNsb3NpbmcgfHwgZmFsc2UsXG4gICAgICBjb2xsYXBzZUVtcHR5QXR0cmlidXRlczogb3B0aW9uc18uY29sbGFwc2VFbXB0eUF0dHJpYnV0ZXMgfHwgZmFsc2UsXG4gICAgICBhbGxvd0Rhbmdlcm91c0h0bWw6IG9wdGlvbnNfLmFsbG93RGFuZ2Vyb3VzSHRtbCB8fCBmYWxzZSxcbiAgICAgIHZvaWRzOiBvcHRpb25zXy52b2lkcyB8fCBodG1sVm9pZEVsZW1lbnRzLFxuICAgICAgY2hhcmFjdGVyUmVmZXJlbmNlczpcbiAgICAgICAgb3B0aW9uc18uY2hhcmFjdGVyUmVmZXJlbmNlcyB8fCBlbXB0eUNoYXJhY3RlclJlZmVyZW5jZXMsXG4gICAgICBjbG9zZVNlbGZDbG9zaW5nOiBvcHRpb25zXy5jbG9zZVNlbGZDbG9zaW5nIHx8IGZhbHNlLFxuICAgICAgY2xvc2VFbXB0eUVsZW1lbnRzOiBvcHRpb25zXy5jbG9zZUVtcHR5RWxlbWVudHMgfHwgZmFsc2VcbiAgICB9LFxuICAgIHNjaGVtYTogb3B0aW9uc18uc3BhY2UgPT09ICdzdmcnID8gc3ZnIDogaHRtbCxcbiAgICBxdW90ZSxcbiAgICBhbHRlcm5hdGl2ZVxuICB9XG5cbiAgcmV0dXJuIHN0YXRlLm9uZShcbiAgICBBcnJheS5pc0FycmF5KHRyZWUpID8ge3R5cGU6ICdyb290JywgY2hpbGRyZW46IHRyZWV9IDogdHJlZSxcbiAgICB1bmRlZmluZWQsXG4gICAgdW5kZWZpbmVkXG4gIClcbn1cblxuLyoqXG4gKiBTZXJpYWxpemUgYSBub2RlLlxuICpcbiAqIEB0aGlzIHtTdGF0ZX1cbiAqICAgSW5mbyBwYXNzZWQgYXJvdW5kIGFib3V0IHRoZSBjdXJyZW50IHN0YXRlLlxuICogQHBhcmFtIHtOb2Rlc30gbm9kZVxuICogICBOb2RlIHRvIGhhbmRsZS5cbiAqIEBwYXJhbSB7bnVtYmVyIHwgdW5kZWZpbmVkfSBpbmRleFxuICogICBJbmRleCBvZiBgbm9kZWAgaW4gYHBhcmVudC5cbiAqIEBwYXJhbSB7UGFyZW50cyB8IHVuZGVmaW5lZH0gcGFyZW50XG4gKiAgIFBhcmVudCBvZiBgbm9kZWAuXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogICBTZXJpYWxpemVkIG5vZGUuXG4gKi9cbmZ1bmN0aW9uIG9uZShub2RlLCBpbmRleCwgcGFyZW50KSB7XG4gIHJldHVybiBoYW5kbGUobm9kZSwgaW5kZXgsIHBhcmVudCwgdGhpcylcbn1cblxuLyoqXG4gKiBTZXJpYWxpemUgYWxsIGNoaWxkcmVuIG9mIGBwYXJlbnRgLlxuICpcbiAqIEB0aGlzIHtTdGF0ZX1cbiAqICAgSW5mbyBwYXNzZWQgYXJvdW5kIGFib3V0IHRoZSBjdXJyZW50IHN0YXRlLlxuICogQHBhcmFtIHtQYXJlbnRzIHwgdW5kZWZpbmVkfSBwYXJlbnRcbiAqICAgUGFyZW50IHdob3NlIGNoaWxkcmVuIHRvIHNlcmlhbGl6ZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhbGwocGFyZW50KSB7XG4gIC8qKiBAdHlwZSB7QXJyYXk8c3RyaW5nPn0gKi9cbiAgY29uc3QgcmVzdWx0cyA9IFtdXG4gIGNvbnN0IGNoaWxkcmVuID0gKHBhcmVudCAmJiBwYXJlbnQuY2hpbGRyZW4pIHx8IGVtcHR5Q2hpbGRyZW5cbiAgbGV0IGluZGV4ID0gLTFcblxuICB3aGlsZSAoKytpbmRleCA8IGNoaWxkcmVuLmxlbmd0aCkge1xuICAgIHJlc3VsdHNbaW5kZXhdID0gdGhpcy5vbmUoY2hpbGRyZW5baW5kZXhdLCBpbmRleCwgcGFyZW50KVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdHMuam9pbignJylcbn1cbiIsImltcG9ydCB7IFNoaWtpRXJyb3IgYXMgU2hpa2lFcnJvciQxIH0gZnJvbSBcIkBzaGlraWpzL3R5cGVzXCI7XG5pbXBvcnQgeyBTaGlraUVycm9yLCBhcHBseUNvbG9yUmVwbGFjZW1lbnRzLCBjb2RlVG9Ub2tlbnNCYXNlIGFzIGNvZGVUb1Rva2Vuc0Jhc2UkMSwgY29kZVRvVG9rZW5zV2l0aFRoZW1lcywgY29kZVRvVG9rZW5zV2l0aFRoZW1lcyBhcyBjb2RlVG9Ub2tlbnNXaXRoVGhlbWVzJDEsIGNyZWF0ZVNoaWtpSW50ZXJuYWwsIGNyZWF0ZVNoaWtpSW50ZXJuYWxTeW5jLCBjcmVhdGVTaGlraVByaW1pdGl2ZSwgY3JlYXRlU2hpa2lQcmltaXRpdmUgYXMgY3JlYXRlU2hpa2lQcmltaXRpdmUkMSwgY3JlYXRlU2hpa2lQcmltaXRpdmVBc3luYywgY3JlYXRlU2hpa2lQcmltaXRpdmVBc3luYyBhcyBjcmVhdGVTaGlraVByaW1pdGl2ZUFzeW5jJDEsIGdldExhc3RHcmFtbWFyU3RhdGUsIGdldExhc3RHcmFtbWFyU3RhdGVGcm9tTWFwLCBpc05vbmVUaGVtZSwgaXNQbGFpbkxhbmcsIGlzU3BlY2lhbExhbmcsIGlzU3BlY2lhbFRoZW1lLCBub3JtYWxpemVHZXR0ZXIsIG5vcm1hbGl6ZVRoZW1lLCByZXNvbHZlQ29sb3JSZXBsYWNlbWVudHMsIHNldExhc3RHcmFtbWFyU3RhdGVUb01hcCwgc3BsaXRMaW5lcywgc3BsaXRMaW5lcyBhcyBzcGxpdExpbmVzJDEsIHRvQXJyYXksIHRva2VuaXplV2l0aFRoZW1lIH0gZnJvbSBcIkBzaGlraWpzL3ByaW1pdGl2ZVwiO1xuaW1wb3J0IHsgRm9udFN0eWxlIH0gZnJvbSBcIkBzaGlraWpzL3ZzY29kZS10ZXh0bWF0ZVwiO1xuaW1wb3J0IHsgdG9IdG1sIH0gZnJvbSBcImhhc3QtdXRpbC10by1odG1sXCI7XG5leHBvcnQgKiBmcm9tIFwiQHNoaWtpanMvdHlwZXNcIjtcbi8vI3JlZ2lvbiBzcmMvdXRpbHMvaGFzdC50c1xuY29uc3QgUkVfV0hJVEVTUEFDRSA9IC9cXHMrL2c7XG4vKipcbiogVXRpbGl0eSB0byBhcHBlbmQgY2xhc3MgdG8gYSBoYXN0IG5vZGVcbipcbiogSWYgdGhlIGBwcm9wZXJ0eS5jbGFzc2AgaXMgYSBzdHJpbmcsIGl0IHdpbGwgYmUgc3BsaXR0ZWQgYnkgc3BhY2UgYW5kIGNvbnZlcnRlZCB0byBhbiBhcnJheS5cbiovXG5mdW5jdGlvbiBhZGRDbGFzc1RvSGFzdChub2RlLCBjbGFzc05hbWUpIHtcblx0aWYgKCFjbGFzc05hbWUpIHJldHVybiBub2RlO1xuXHRub2RlLnByb3BlcnRpZXMgfHw9IHt9O1xuXHRub2RlLnByb3BlcnRpZXMuY2xhc3MgfHw9IFtdO1xuXHRpZiAodHlwZW9mIG5vZGUucHJvcGVydGllcy5jbGFzcyA9PT0gXCJzdHJpbmdcIikgbm9kZS5wcm9wZXJ0aWVzLmNsYXNzID0gbm9kZS5wcm9wZXJ0aWVzLmNsYXNzLnNwbGl0KFJFX1dISVRFU1BBQ0UpO1xuXHRpZiAoIUFycmF5LmlzQXJyYXkobm9kZS5wcm9wZXJ0aWVzLmNsYXNzKSkgbm9kZS5wcm9wZXJ0aWVzLmNsYXNzID0gW107XG5cdGNvbnN0IHRhcmdldHMgPSBBcnJheS5pc0FycmF5KGNsYXNzTmFtZSkgPyBjbGFzc05hbWUgOiBjbGFzc05hbWUuc3BsaXQoUkVfV0hJVEVTUEFDRSk7XG5cdGZvciAoY29uc3QgYyBvZiB0YXJnZXRzKSBpZiAoYyAmJiAhbm9kZS5wcm9wZXJ0aWVzLmNsYXNzLmluY2x1ZGVzKGMpKSBub2RlLnByb3BlcnRpZXMuY2xhc3MucHVzaChjKTtcblx0cmV0dXJuIG5vZGU7XG59XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvdXRpbHMvc3RyaW5ncy50c1xuY29uc3QgUkVfTEFOR19BVFRSID0gLzo/bGFuZz1bXCInXShbXlwiJ10rKVtcIiddL2c7XG5jb25zdCBSRV9DT0RFX0ZFTkNFID0gLyg/OmBgYHx+fn4pKFtcXHctXSspL2c7XG5jb25zdCBSRV9MQVRFWF9CRUdJTiA9IC9cXFxcYmVnaW5cXHsoW1xcdy1dKylcXH0vZztcbmNvbnN0IFJFX1NDUklQVF9MQU5HID0gLzxzY3JpcHRcXHMrKD86dHlwZXxsYW5nKT1bXCInXShbXlwiJ10rKVtcIiddL2dpO1xuLyoqXG4qIENyZWF0ZXMgYSBjb252ZXJ0ZXIgYmV0d2VlbiBpbmRleCBhbmQgcG9zaXRpb24gaW4gYSBjb2RlIGJsb2NrLlxuKlxuKiBPdmVyZmxvdy91bmRlcmZsb3cgYXJlIHVuY2hlY2tlZC5cbiovXG5mdW5jdGlvbiBjcmVhdGVQb3NpdGlvbkNvbnZlcnRlcihjb2RlKSB7XG5cdGNvbnN0IGxpbmVzID0gc3BsaXRMaW5lcyQxKGNvZGUsIHRydWUpLm1hcCgoW2xpbmVdKSA9PiBsaW5lKTtcblx0ZnVuY3Rpb24gaW5kZXhUb1BvcyhpbmRleCkge1xuXHRcdGlmIChpbmRleCA9PT0gY29kZS5sZW5ndGgpIHJldHVybiB7XG5cdFx0XHRsaW5lOiBsaW5lcy5sZW5ndGggLSAxLFxuXHRcdFx0Y2hhcmFjdGVyOiBsaW5lcy5hdCgtMSkubGVuZ3RoXG5cdFx0fTtcblx0XHRsZXQgY2hhcmFjdGVyID0gaW5kZXg7XG5cdFx0bGV0IGxpbmUgPSAwO1xuXHRcdGZvciAoY29uc3QgbGluZVRleHQgb2YgbGluZXMpIHtcblx0XHRcdGlmIChjaGFyYWN0ZXIgPCBsaW5lVGV4dC5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0Y2hhcmFjdGVyIC09IGxpbmVUZXh0Lmxlbmd0aDtcblx0XHRcdGxpbmUrKztcblx0XHR9XG5cdFx0cmV0dXJuIHtcblx0XHRcdGxpbmUsXG5cdFx0XHRjaGFyYWN0ZXJcblx0XHR9O1xuXHR9XG5cdGZ1bmN0aW9uIHBvc1RvSW5kZXgobGluZSwgY2hhcmFjdGVyKSB7XG5cdFx0bGV0IGluZGV4ID0gMDtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxpbmU7IGkrKykgaW5kZXggKz0gbGluZXNbaV0ubGVuZ3RoO1xuXHRcdGluZGV4ICs9IGNoYXJhY3Rlcjtcblx0XHRyZXR1cm4gaW5kZXg7XG5cdH1cblx0cmV0dXJuIHtcblx0XHRsaW5lcyxcblx0XHRpbmRleFRvUG9zLFxuXHRcdHBvc1RvSW5kZXhcblx0fTtcbn1cbi8qKlxuKiBHdWVzcyBlbWJlZGRlZCBsYW5ndWFnZXMgZnJvbSBnaXZlbiBjb2RlIGFuZCBoaWdobGlnaHRlci5cbipcbiogV2hlbiBoaWdobGlnaHRlciBpcyBwcm92aWRlZCwgb25seSBidW5kbGVkIGxhbmd1YWdlcyB3aWxsIGJlIGluY2x1ZGVkLlxuKlxuKiBAcGFyYW0gY29kZSAtIFRoZSBjb2RlIHN0cmluZyB0byBhbmFseXplXG4qIEBwYXJhbSBfbGFuZyAtIFRoZSBwcmltYXJ5IGxhbmd1YWdlIG9mIHRoZSBjb2RlIChjdXJyZW50bHkgdW51c2VkKVxuKiBAcGFyYW0gaGlnaGxpZ2h0ZXIgLSBPcHRpb25hbCBoaWdobGlnaHRlciBpbnN0YW5jZSB0byB2YWxpZGF0ZSBsYW5ndWFnZXNcbiogQHJldHVybnMgQXJyYXkgb2YgZGV0ZWN0ZWQgbGFuZ3VhZ2UgaWRlbnRpZmllcnNcbipcbiogQGV4YW1wbGVcbiogYGBgdHNcbiogLy8gRGV0ZWN0cyAnamF2YXNjcmlwdCcgZnJvbSBWdWUgU0ZDXG4qIGd1ZXNzRW1iZWRkZWRMYW5ndWFnZXMoJzxzY3JpcHQgbGFuZz1cImphdmFzY3JpcHRcIj4nKVxuKlxuKiAvLyBEZXRlY3RzICdweXRob24nIGZyb20gbWFya2Rvd24gY29kZSBibG9ja1xuKiBndWVzc0VtYmVkZGVkTGFuZ3VhZ2VzKCdgYGBweXRob25cXG5wcmludChcImhpXCIpXFxuYGBgJylcbiogYGBgXG4qL1xuZnVuY3Rpb24gZ3Vlc3NFbWJlZGRlZExhbmd1YWdlcyhjb2RlLCBfbGFuZywgaGlnaGxpZ2h0ZXIpIHtcblx0Y29uc3QgbGFuZ3MgPSAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpO1xuXHRmb3IgKGNvbnN0IG1hdGNoIG9mIGNvZGUubWF0Y2hBbGwoUkVfTEFOR19BVFRSKSkge1xuXHRcdGNvbnN0IGxhbmcgPSBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcblx0XHRpZiAobGFuZykgbGFuZ3MuYWRkKGxhbmcpO1xuXHR9XG5cdGZvciAoY29uc3QgbWF0Y2ggb2YgY29kZS5tYXRjaEFsbChSRV9DT0RFX0ZFTkNFKSkge1xuXHRcdGNvbnN0IGxhbmcgPSBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcblx0XHRpZiAobGFuZykgbGFuZ3MuYWRkKGxhbmcpO1xuXHR9XG5cdGZvciAoY29uc3QgbWF0Y2ggb2YgY29kZS5tYXRjaEFsbChSRV9MQVRFWF9CRUdJTikpIHtcblx0XHRjb25zdCBsYW5nID0gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKS50cmltKCk7XG5cdFx0aWYgKGxhbmcpIGxhbmdzLmFkZChsYW5nKTtcblx0fVxuXHRmb3IgKGNvbnN0IG1hdGNoIG9mIGNvZGUubWF0Y2hBbGwoUkVfU0NSSVBUX0xBTkcpKSB7XG5cdFx0Y29uc3QgZnVsbFR5cGUgPSBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcblx0XHRjb25zdCBsYW5nID0gZnVsbFR5cGUuaW5jbHVkZXMoXCIvXCIpID8gZnVsbFR5cGUuc3BsaXQoXCIvXCIpLnBvcCgpIDogZnVsbFR5cGU7XG5cdFx0aWYgKGxhbmcpIGxhbmdzLmFkZChsYW5nKTtcblx0fVxuXHRpZiAoIWhpZ2hsaWdodGVyKSByZXR1cm4gWy4uLmxhbmdzXTtcblx0Y29uc3QgYnVuZGxlID0gaGlnaGxpZ2h0ZXIuZ2V0QnVuZGxlZExhbmd1YWdlcygpO1xuXHRyZXR1cm4gWy4uLmxhbmdzXS5maWx0ZXIoKGwpID0+IGwgJiYgYnVuZGxlW2xdKTtcbn1cbmNvbnN0IENPTE9SX0tFWVMgPSBbXCJjb2xvclwiLCBcImJhY2tncm91bmQtY29sb3JcIl07XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvdXRpbHMvdG9rZW5zLnRzXG4vKipcbiogU3BsaXQgYSB0b2tlbiBpbnRvIG11bHRpcGxlIHRva2VucyBieSBnaXZlbiBvZmZzZXRzLlxuKlxuKiBUaGUgb2Zmc2V0cyBhcmUgcmVsYXRpdmUgdG8gdGhlIHRva2VuLCBhbmQgc2hvdWxkIGJlIHNvcnRlZC5cbiovXG5mdW5jdGlvbiBzcGxpdFRva2VuKHRva2VuLCBvZmZzZXRzKSB7XG5cdGxldCBsYXN0T2Zmc2V0ID0gMDtcblx0Y29uc3QgdG9rZW5zID0gW107XG5cdGZvciAoY29uc3Qgb2Zmc2V0IG9mIG9mZnNldHMpIHtcblx0XHRpZiAob2Zmc2V0ID4gbGFzdE9mZnNldCkgdG9rZW5zLnB1c2goe1xuXHRcdFx0Li4udG9rZW4sXG5cdFx0XHRjb250ZW50OiB0b2tlbi5jb250ZW50LnNsaWNlKGxhc3RPZmZzZXQsIG9mZnNldCksXG5cdFx0XHRvZmZzZXQ6IHRva2VuLm9mZnNldCArIGxhc3RPZmZzZXRcblx0XHR9KTtcblx0XHRsYXN0T2Zmc2V0ID0gb2Zmc2V0O1xuXHR9XG5cdGlmIChsYXN0T2Zmc2V0IDwgdG9rZW4uY29udGVudC5sZW5ndGgpIHRva2Vucy5wdXNoKHtcblx0XHQuLi50b2tlbixcblx0XHRjb250ZW50OiB0b2tlbi5jb250ZW50LnNsaWNlKGxhc3RPZmZzZXQpLFxuXHRcdG9mZnNldDogdG9rZW4ub2Zmc2V0ICsgbGFzdE9mZnNldFxuXHR9KTtcblx0cmV0dXJuIHRva2Vucztcbn1cbi8qKlxuKiBTcGxpdCAyRCB0b2tlbnMgYXJyYXkgYnkgZ2l2ZW4gYnJlYWtwb2ludHMuXG4qL1xuZnVuY3Rpb24gc3BsaXRUb2tlbnModG9rZW5zLCBicmVha3BvaW50cykge1xuXHRjb25zdCBzb3J0ZWQgPSBbLi4uYnJlYWtwb2ludHMgaW5zdGFuY2VvZiBTZXQgPyBicmVha3BvaW50cyA6IG5ldyBTZXQoYnJlYWtwb2ludHMpXS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG5cdGlmICghc29ydGVkLmxlbmd0aCkgcmV0dXJuIHRva2Vucztcblx0cmV0dXJuIHRva2Vucy5tYXAoKGxpbmUpID0+IHtcblx0XHRyZXR1cm4gbGluZS5mbGF0TWFwKCh0b2tlbikgPT4ge1xuXHRcdFx0Y29uc3QgYnJlYWtwb2ludHNJblRva2VuID0gc29ydGVkLmZpbHRlcigoaSkgPT4gdG9rZW4ub2Zmc2V0IDwgaSAmJiBpIDwgdG9rZW4ub2Zmc2V0ICsgdG9rZW4uY29udGVudC5sZW5ndGgpLm1hcCgoaSkgPT4gaSAtIHRva2VuLm9mZnNldCkuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuXHRcdFx0aWYgKCFicmVha3BvaW50c0luVG9rZW4ubGVuZ3RoKSByZXR1cm4gdG9rZW47XG5cdFx0XHRyZXR1cm4gc3BsaXRUb2tlbih0b2tlbiwgYnJlYWtwb2ludHNJblRva2VuKTtcblx0XHR9KTtcblx0fSk7XG59XG5mdW5jdGlvbiBmbGF0VG9rZW5WYXJpYW50cyhtZXJnZWQsIHZhcmlhbnRzT3JkZXIsIGNzc1ZhcmlhYmxlUHJlZml4LCBkZWZhdWx0Q29sb3IsIGNvbG9yc1JlbmRlcmluZyA9IFwiY3NzLXZhcnNcIikge1xuXHRjb25zdCB0b2tlbiA9IHtcblx0XHRjb250ZW50OiBtZXJnZWQuY29udGVudCxcblx0XHRleHBsYW5hdGlvbjogbWVyZ2VkLmV4cGxhbmF0aW9uLFxuXHRcdG9mZnNldDogbWVyZ2VkLm9mZnNldFxuXHR9O1xuXHRjb25zdCBzdHlsZXMgPSB2YXJpYW50c09yZGVyLm1hcCgodCkgPT4gZ2V0VG9rZW5TdHlsZU9iamVjdChtZXJnZWQudmFyaWFudHNbdF0pKTtcblx0Y29uc3Qgc3R5bGVLZXlzID0gbmV3IFNldChzdHlsZXMuZmxhdE1hcCgodCkgPT4gT2JqZWN0LmtleXModCkpKTtcblx0Y29uc3QgbWVyZ2VkU3R5bGVzID0ge307XG5cdGNvbnN0IHZhcktleSA9IChpZHgsIGtleSkgPT4ge1xuXHRcdGNvbnN0IGtleU5hbWUgPSBrZXkgPT09IFwiY29sb3JcIiA/IFwiXCIgOiBrZXkgPT09IFwiYmFja2dyb3VuZC1jb2xvclwiID8gXCItYmdcIiA6IGAtJHtrZXl9YDtcblx0XHRyZXR1cm4gY3NzVmFyaWFibGVQcmVmaXggKyB2YXJpYW50c09yZGVyW2lkeF0gKyAoa2V5ID09PSBcImNvbG9yXCIgPyBcIlwiIDoga2V5TmFtZSk7XG5cdH07XG5cdHN0eWxlcy5mb3JFYWNoKChjdXIsIGlkeCkgPT4ge1xuXHRcdGZvciAoY29uc3Qga2V5IG9mIHN0eWxlS2V5cykge1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBjdXJba2V5XSB8fCBcImluaGVyaXRcIjtcblx0XHRcdGlmIChpZHggPT09IDAgJiYgZGVmYXVsdENvbG9yICYmIENPTE9SX0tFWVMuaW5jbHVkZXMoa2V5KSkgaWYgKGRlZmF1bHRDb2xvciA9PT0gXCJsaWdodC1kYXJrKClcIiAmJiBzdHlsZXMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRjb25zdCBsaWdodEluZGV4ID0gdmFyaWFudHNPcmRlci5maW5kSW5kZXgoKHQpID0+IHQgPT09IFwibGlnaHRcIik7XG5cdFx0XHRcdGNvbnN0IGRhcmtJbmRleCA9IHZhcmlhbnRzT3JkZXIuZmluZEluZGV4KCh0KSA9PiB0ID09PSBcImRhcmtcIik7XG5cdFx0XHRcdGlmIChsaWdodEluZGV4ID09PSAtMSB8fCBkYXJrSW5kZXggPT09IC0xKSB0aHJvdyBuZXcgU2hpa2lFcnJvciQxKFwiV2hlbiB1c2luZyBgZGVmYXVsdENvbG9yOiBcXFwibGlnaHQtZGFyaygpXFxcImAsIHlvdSBtdXN0IHByb3ZpZGUgYm90aCBgbGlnaHRgIGFuZCBgZGFya2AgdGhlbWVzXCIpO1xuXHRcdFx0XHRtZXJnZWRTdHlsZXNba2V5XSA9IGBsaWdodC1kYXJrKCR7c3R5bGVzW2xpZ2h0SW5kZXhdW2tleV0gfHwgXCJpbmhlcml0XCJ9LCAke3N0eWxlc1tkYXJrSW5kZXhdW2tleV0gfHwgXCJpbmhlcml0XCJ9KWA7XG5cdFx0XHRcdGlmIChjb2xvcnNSZW5kZXJpbmcgPT09IFwiY3NzLXZhcnNcIikgbWVyZ2VkU3R5bGVzW3ZhcktleShpZHgsIGtleSldID0gdmFsdWU7XG5cdFx0XHR9IGVsc2UgbWVyZ2VkU3R5bGVzW2tleV0gPSB2YWx1ZTtcblx0XHRcdGVsc2UgaWYgKGNvbG9yc1JlbmRlcmluZyA9PT0gXCJjc3MtdmFyc1wiKSBtZXJnZWRTdHlsZXNbdmFyS2V5KGlkeCwga2V5KV0gPSB2YWx1ZTtcblx0XHR9XG5cdH0pO1xuXHR0b2tlbi5odG1sU3R5bGUgPSBtZXJnZWRTdHlsZXM7XG5cdHJldHVybiB0b2tlbjtcbn1cbmZ1bmN0aW9uIGdldFRva2VuU3R5bGVPYmplY3QodG9rZW4pIHtcblx0Y29uc3Qgc3R5bGVzID0ge307XG5cdGlmICh0b2tlbi5jb2xvcikgc3R5bGVzLmNvbG9yID0gdG9rZW4uY29sb3I7XG5cdGlmICh0b2tlbi5iZ0NvbG9yKSBzdHlsZXNbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gdG9rZW4uYmdDb2xvcjtcblx0aWYgKHRva2VuLmZvbnRTdHlsZSkge1xuXHRcdGlmICh0b2tlbi5mb250U3R5bGUgJiBGb250U3R5bGUuSXRhbGljKSBzdHlsZXNbXCJmb250LXN0eWxlXCJdID0gXCJpdGFsaWNcIjtcblx0XHRpZiAodG9rZW4uZm9udFN0eWxlICYgRm9udFN0eWxlLkJvbGQpIHN0eWxlc1tcImZvbnQtd2VpZ2h0XCJdID0gXCJib2xkXCI7XG5cdFx0Y29uc3QgZGVjb3JhdGlvbnMgPSBbXTtcblx0XHRpZiAodG9rZW4uZm9udFN0eWxlICYgRm9udFN0eWxlLlVuZGVybGluZSkgZGVjb3JhdGlvbnMucHVzaChcInVuZGVybGluZVwiKTtcblx0XHRpZiAodG9rZW4uZm9udFN0eWxlICYgRm9udFN0eWxlLlN0cmlrZXRocm91Z2gpIGRlY29yYXRpb25zLnB1c2goXCJsaW5lLXRocm91Z2hcIik7XG5cdFx0aWYgKGRlY29yYXRpb25zLmxlbmd0aCkgc3R5bGVzW1widGV4dC1kZWNvcmF0aW9uXCJdID0gZGVjb3JhdGlvbnMuam9pbihcIiBcIik7XG5cdH1cblx0cmV0dXJuIHN0eWxlcztcbn1cbmZ1bmN0aW9uIHN0cmluZ2lmeVRva2VuU3R5bGUodG9rZW4pIHtcblx0aWYgKHR5cGVvZiB0b2tlbiA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHRva2VuO1xuXHRyZXR1cm4gT2JqZWN0LmVudHJpZXModG9rZW4pLm1hcCgoW2tleSwgdmFsdWVdKSA9PiBgJHtrZXl9OiR7dmFsdWV9YCkuam9pbihcIjtcIik7XG59XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvdHJhbnNmb3JtZXItZGVjb3JhdGlvbnMudHNcbi8qKlxuKiBBIGJ1aWx0LWluIHRyYW5zZm9ybWVyIHRvIGFkZCBkZWNvcmF0aW9ucyB0byB0aGUgaGlnaGxpZ2h0ZWQgY29kZS5cbiovXG5mdW5jdGlvbiB0cmFuc2Zvcm1lckRlY29yYXRpb25zKCkge1xuXHRjb25zdCBtYXAgPSAvKiBAX19QVVJFX18gKi8gbmV3IFdlYWtNYXAoKTtcblx0ZnVuY3Rpb24gZ2V0Q29udGV4dChzaGlraSkge1xuXHRcdGlmICghbWFwLmhhcyhzaGlraS5tZXRhKSkge1xuXHRcdFx0Y29uc3QgY29udmVydGVyID0gY3JlYXRlUG9zaXRpb25Db252ZXJ0ZXIoc2hpa2kuc291cmNlKTtcblx0XHRcdGZ1bmN0aW9uIG5vcm1hbGl6ZVBvc2l0aW9uKHApIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBwID09PSBcIm51bWJlclwiKSB7XG5cdFx0XHRcdFx0aWYgKHAgPCAwIHx8IHAgPiBzaGlraS5zb3VyY2UubGVuZ3RoKSB0aHJvdyBuZXcgU2hpa2lFcnJvciQxKGBJbnZhbGlkIGRlY29yYXRpb24gb2Zmc2V0OiAke3B9LiBDb2RlIGxlbmd0aDogJHtzaGlraS5zb3VyY2UubGVuZ3RofWApO1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHQuLi5jb252ZXJ0ZXIuaW5kZXhUb1BvcyhwKSxcblx0XHRcdFx0XHRcdG9mZnNldDogcFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29uc3QgbGluZSA9IGNvbnZlcnRlci5saW5lc1twLmxpbmVdO1xuXHRcdFx0XHRcdGlmIChsaW5lID09PSB2b2lkIDApIHRocm93IG5ldyBTaGlraUVycm9yJDEoYEludmFsaWQgZGVjb3JhdGlvbiBwb3NpdGlvbiAke0pTT04uc3RyaW5naWZ5KHApfS4gTGluZXMgbGVuZ3RoOiAke2NvbnZlcnRlci5saW5lcy5sZW5ndGh9YCk7XG5cdFx0XHRcdFx0bGV0IGNoYXJhY3RlciA9IHAuY2hhcmFjdGVyO1xuXHRcdFx0XHRcdGlmIChjaGFyYWN0ZXIgPCAwKSBjaGFyYWN0ZXIgPSBsaW5lLmxlbmd0aCArIGNoYXJhY3Rlcjtcblx0XHRcdFx0XHRpZiAoY2hhcmFjdGVyIDwgMCB8fCBjaGFyYWN0ZXIgPiBsaW5lLmxlbmd0aCkgdGhyb3cgbmV3IFNoaWtpRXJyb3IkMShgSW52YWxpZCBkZWNvcmF0aW9uIHBvc2l0aW9uICR7SlNPTi5zdHJpbmdpZnkocCl9LiBMaW5lICR7cC5saW5lfSBsZW5ndGg6ICR7bGluZS5sZW5ndGh9YCk7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdC4uLnAsXG5cdFx0XHRcdFx0XHRjaGFyYWN0ZXIsXG5cdFx0XHRcdFx0XHRvZmZzZXQ6IGNvbnZlcnRlci5wb3NUb0luZGV4KHAubGluZSwgY2hhcmFjdGVyKVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNvbnN0IGRlY29yYXRpb25zID0gKHNoaWtpLm9wdGlvbnMuZGVjb3JhdGlvbnMgfHwgW10pLm1hcCgoZCkgPT4gKHtcblx0XHRcdFx0Li4uZCxcblx0XHRcdFx0c3RhcnQ6IG5vcm1hbGl6ZVBvc2l0aW9uKGQuc3RhcnQpLFxuXHRcdFx0XHRlbmQ6IG5vcm1hbGl6ZVBvc2l0aW9uKGQuZW5kKVxuXHRcdFx0fSkpO1xuXHRcdFx0dmVyaWZ5SW50ZXJzZWN0aW9ucyhkZWNvcmF0aW9ucyk7XG5cdFx0XHRtYXAuc2V0KHNoaWtpLm1ldGEsIHtcblx0XHRcdFx0ZGVjb3JhdGlvbnMsXG5cdFx0XHRcdGNvbnZlcnRlcixcblx0XHRcdFx0c291cmNlOiBzaGlraS5zb3VyY2Vcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRyZXR1cm4gbWFwLmdldChzaGlraS5tZXRhKTtcblx0fVxuXHRyZXR1cm4ge1xuXHRcdG5hbWU6IFwic2hpa2k6ZGVjb3JhdGlvbnNcIixcblx0XHR0b2tlbnModG9rZW5zKSB7XG5cdFx0XHRpZiAoIXRoaXMub3B0aW9ucy5kZWNvcmF0aW9ucz8ubGVuZ3RoKSByZXR1cm47XG5cdFx0XHRyZXR1cm4gc3BsaXRUb2tlbnModG9rZW5zLCBnZXRDb250ZXh0KHRoaXMpLmRlY29yYXRpb25zLmZsYXRNYXAoKGQpID0+IFtkLnN0YXJ0Lm9mZnNldCwgZC5lbmQub2Zmc2V0XSkpO1xuXHRcdH0sXG5cdFx0Y29kZShjb2RlRWwpIHtcblx0XHRcdGlmICghdGhpcy5vcHRpb25zLmRlY29yYXRpb25zPy5sZW5ndGgpIHJldHVybjtcblx0XHRcdGNvbnN0IGN0eCA9IGdldENvbnRleHQodGhpcyk7XG5cdFx0XHRjb25zdCBsaW5lcyA9IFsuLi5jb2RlRWwuY2hpbGRyZW5dLmZpbHRlcigoaSkgPT4gaS50eXBlID09PSBcImVsZW1lbnRcIiAmJiBpLnRhZ05hbWUgPT09IFwic3BhblwiKTtcblx0XHRcdGlmIChsaW5lcy5sZW5ndGggIT09IGN0eC5jb252ZXJ0ZXIubGluZXMubGVuZ3RoKSB0aHJvdyBuZXcgU2hpa2lFcnJvciQxKGBOdW1iZXIgb2YgbGluZXMgaW4gY29kZSBlbGVtZW50ICgke2xpbmVzLmxlbmd0aH0pIGRvZXMgbm90IG1hdGNoIHRoZSBudW1iZXIgb2YgbGluZXMgaW4gdGhlIHNvdXJjZSAoJHtjdHguY29udmVydGVyLmxpbmVzLmxlbmd0aH0pLiBGYWlsZWQgdG8gYXBwbHkgZGVjb3JhdGlvbnMuYCk7XG5cdFx0XHRmdW5jdGlvbiBhcHBseUxpbmVTZWN0aW9uKGxpbmUsIHN0YXJ0LCBlbmQsIGRlY29yYXRpb24pIHtcblx0XHRcdFx0Y29uc3QgbGluZUVsID0gbGluZXNbbGluZV07XG5cdFx0XHRcdGxldCB0ZXh0ID0gXCJcIjtcblx0XHRcdFx0bGV0IHN0YXJ0SW5kZXggPSAtMTtcblx0XHRcdFx0bGV0IGVuZEluZGV4ID0gLTE7XG5cdFx0XHRcdGlmIChzdGFydCA9PT0gMCkgc3RhcnRJbmRleCA9IDA7XG5cdFx0XHRcdGlmIChlbmQgPT09IDApIGVuZEluZGV4ID0gMDtcblx0XHRcdFx0aWYgKGVuZCA9PT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKSBlbmRJbmRleCA9IGxpbmVFbC5jaGlsZHJlbi5sZW5ndGg7XG5cdFx0XHRcdGlmIChzdGFydEluZGV4ID09PSAtMSB8fCBlbmRJbmRleCA9PT0gLTEpIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZUVsLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0dGV4dCArPSBzdHJpbmdpZnkobGluZUVsLmNoaWxkcmVuW2ldKTtcblx0XHRcdFx0XHRpZiAoc3RhcnRJbmRleCA9PT0gLTEgJiYgdGV4dC5sZW5ndGggPT09IHN0YXJ0KSBzdGFydEluZGV4ID0gaSArIDE7XG5cdFx0XHRcdFx0aWYgKGVuZEluZGV4ID09PSAtMSAmJiB0ZXh0Lmxlbmd0aCA9PT0gZW5kKSBlbmRJbmRleCA9IGkgKyAxO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChzdGFydEluZGV4ID09PSAtMSkgdGhyb3cgbmV3IFNoaWtpRXJyb3IkMShgRmFpbGVkIHRvIGZpbmQgc3RhcnQgaW5kZXggZm9yIGRlY29yYXRpb24gJHtKU09OLnN0cmluZ2lmeShkZWNvcmF0aW9uLnN0YXJ0KX1gKTtcblx0XHRcdFx0aWYgKGVuZEluZGV4ID09PSAtMSkgdGhyb3cgbmV3IFNoaWtpRXJyb3IkMShgRmFpbGVkIHRvIGZpbmQgZW5kIGluZGV4IGZvciBkZWNvcmF0aW9uICR7SlNPTi5zdHJpbmdpZnkoZGVjb3JhdGlvbi5lbmQpfWApO1xuXHRcdFx0XHRjb25zdCBjaGlsZHJlbiA9IGxpbmVFbC5jaGlsZHJlbi5zbGljZShzdGFydEluZGV4LCBlbmRJbmRleCk7XG5cdFx0XHRcdGlmICghZGVjb3JhdGlvbi5hbHdheXNXcmFwICYmIGNoaWxkcmVuLmxlbmd0aCA9PT0gbGluZUVsLmNoaWxkcmVuLmxlbmd0aCkgYXBwbHlEZWNvcmF0aW9uKGxpbmVFbCwgZGVjb3JhdGlvbiwgXCJsaW5lXCIpO1xuXHRcdFx0XHRlbHNlIGlmICghZGVjb3JhdGlvbi5hbHdheXNXcmFwICYmIGNoaWxkcmVuLmxlbmd0aCA9PT0gMSAmJiBjaGlsZHJlblswXS50eXBlID09PSBcImVsZW1lbnRcIikgYXBwbHlEZWNvcmF0aW9uKGNoaWxkcmVuWzBdLCBkZWNvcmF0aW9uLCBcInRva2VuXCIpO1xuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRjb25zdCB3cmFwcGVyID0ge1xuXHRcdFx0XHRcdFx0dHlwZTogXCJlbGVtZW50XCIsXG5cdFx0XHRcdFx0XHR0YWdOYW1lOiBcInNwYW5cIixcblx0XHRcdFx0XHRcdHByb3BlcnRpZXM6IHt9LFxuXHRcdFx0XHRcdFx0Y2hpbGRyZW5cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGFwcGx5RGVjb3JhdGlvbih3cmFwcGVyLCBkZWNvcmF0aW9uLCBcIndyYXBwZXJcIik7XG5cdFx0XHRcdFx0bGluZUVsLmNoaWxkcmVuLnNwbGljZShzdGFydEluZGV4LCBjaGlsZHJlbi5sZW5ndGgsIHdyYXBwZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRmdW5jdGlvbiBhcHBseUxpbmUobGluZSwgZGVjb3JhdGlvbikge1xuXHRcdFx0XHRsaW5lc1tsaW5lXSA9IGFwcGx5RGVjb3JhdGlvbihsaW5lc1tsaW5lXSwgZGVjb3JhdGlvbiwgXCJsaW5lXCIpO1xuXHRcdFx0fVxuXHRcdFx0ZnVuY3Rpb24gYXBwbHlEZWNvcmF0aW9uKGVsLCBkZWNvcmF0aW9uLCB0eXBlKSB7XG5cdFx0XHRcdGNvbnN0IHByb3BlcnRpZXMgPSBkZWNvcmF0aW9uLnByb3BlcnRpZXMgfHwge307XG5cdFx0XHRcdGNvbnN0IHRyYW5zZm9ybSA9IGRlY29yYXRpb24udHJhbnNmb3JtIHx8ICgoaSkgPT4gaSk7XG5cdFx0XHRcdGVsLnRhZ05hbWUgPSBkZWNvcmF0aW9uLnRhZ05hbWUgfHwgXCJzcGFuXCI7XG5cdFx0XHRcdGVsLnByb3BlcnRpZXMgPSB7XG5cdFx0XHRcdFx0Li4uZWwucHJvcGVydGllcyxcblx0XHRcdFx0XHQuLi5wcm9wZXJ0aWVzLFxuXHRcdFx0XHRcdGNsYXNzOiBlbC5wcm9wZXJ0aWVzLmNsYXNzXG5cdFx0XHRcdH07XG5cdFx0XHRcdGlmIChkZWNvcmF0aW9uLnByb3BlcnRpZXM/LmNsYXNzKSBhZGRDbGFzc1RvSGFzdChlbCwgZGVjb3JhdGlvbi5wcm9wZXJ0aWVzLmNsYXNzKTtcblx0XHRcdFx0ZWwgPSB0cmFuc2Zvcm0oZWwsIHR5cGUpIHx8IGVsO1xuXHRcdFx0XHRyZXR1cm4gZWw7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBsaW5lQXBwbGllcyA9IFtdO1xuXHRcdFx0Y29uc3Qgc29ydGVkID0gY3R4LmRlY29yYXRpb25zLnNvcnQoKGEsIGIpID0+IGIuc3RhcnQub2Zmc2V0IC0gYS5zdGFydC5vZmZzZXQgfHwgYS5lbmQub2Zmc2V0IC0gYi5lbmQub2Zmc2V0KTtcblx0XHRcdGZvciAoY29uc3QgZGVjb3JhdGlvbiBvZiBzb3J0ZWQpIHtcblx0XHRcdFx0Y29uc3QgeyBzdGFydCwgZW5kIH0gPSBkZWNvcmF0aW9uO1xuXHRcdFx0XHRpZiAoc3RhcnQubGluZSA9PT0gZW5kLmxpbmUpIGFwcGx5TGluZVNlY3Rpb24oc3RhcnQubGluZSwgc3RhcnQuY2hhcmFjdGVyLCBlbmQuY2hhcmFjdGVyLCBkZWNvcmF0aW9uKTtcblx0XHRcdFx0ZWxzZSBpZiAoc3RhcnQubGluZSA8IGVuZC5saW5lKSB7XG5cdFx0XHRcdFx0YXBwbHlMaW5lU2VjdGlvbihzdGFydC5saW5lLCBzdGFydC5jaGFyYWN0ZXIsIE51bWJlci5QT1NJVElWRV9JTkZJTklUWSwgZGVjb3JhdGlvbik7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IHN0YXJ0LmxpbmUgKyAxOyBpIDwgZW5kLmxpbmU7IGkrKykgbGluZUFwcGxpZXMudW5zaGlmdCgoKSA9PiBhcHBseUxpbmUoaSwgZGVjb3JhdGlvbikpO1xuXHRcdFx0XHRcdGFwcGx5TGluZVNlY3Rpb24oZW5kLmxpbmUsIDAsIGVuZC5jaGFyYWN0ZXIsIGRlY29yYXRpb24pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRsaW5lQXBwbGllcy5mb3JFYWNoKChpKSA9PiBpKCkpO1xuXHRcdH1cblx0fTtcbn1cbmZ1bmN0aW9uIHZlcmlmeUludGVyc2VjdGlvbnMoaXRlbXMpIHtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdGNvbnN0IGZvbyA9IGl0ZW1zW2ldO1xuXHRcdGlmIChmb28uc3RhcnQub2Zmc2V0ID4gZm9vLmVuZC5vZmZzZXQpIHRocm93IG5ldyBTaGlraUVycm9yJDEoYEludmFsaWQgZGVjb3JhdGlvbiByYW5nZTogJHtKU09OLnN0cmluZ2lmeShmb28uc3RhcnQpfSAtICR7SlNPTi5zdHJpbmdpZnkoZm9vLmVuZCl9YCk7XG5cdFx0Zm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgaXRlbXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGNvbnN0IGJhciA9IGl0ZW1zW2pdO1xuXHRcdFx0Y29uc3QgaXNGb29IYXNCYXJTdGFydCA9IGZvby5zdGFydC5vZmZzZXQgPD0gYmFyLnN0YXJ0Lm9mZnNldCAmJiBiYXIuc3RhcnQub2Zmc2V0IDwgZm9vLmVuZC5vZmZzZXQ7XG5cdFx0XHRjb25zdCBpc0Zvb0hhc0JhckVuZCA9IGZvby5zdGFydC5vZmZzZXQgPCBiYXIuZW5kLm9mZnNldCAmJiBiYXIuZW5kLm9mZnNldCA8PSBmb28uZW5kLm9mZnNldDtcblx0XHRcdGNvbnN0IGlzQmFySGFzRm9vU3RhcnQgPSBiYXIuc3RhcnQub2Zmc2V0IDw9IGZvby5zdGFydC5vZmZzZXQgJiYgZm9vLnN0YXJ0Lm9mZnNldCA8IGJhci5lbmQub2Zmc2V0O1xuXHRcdFx0Y29uc3QgaXNCYXJIYXNGb29FbmQgPSBiYXIuc3RhcnQub2Zmc2V0IDwgZm9vLmVuZC5vZmZzZXQgJiYgZm9vLmVuZC5vZmZzZXQgPD0gYmFyLmVuZC5vZmZzZXQ7XG5cdFx0XHRpZiAoaXNGb29IYXNCYXJTdGFydCB8fCBpc0Zvb0hhc0JhckVuZCB8fCBpc0Jhckhhc0Zvb1N0YXJ0IHx8IGlzQmFySGFzRm9vRW5kKSB7XG5cdFx0XHRcdGlmIChpc0Zvb0hhc0JhclN0YXJ0ICYmIGlzRm9vSGFzQmFyRW5kKSBjb250aW51ZTtcblx0XHRcdFx0aWYgKGlzQmFySGFzRm9vU3RhcnQgJiYgaXNCYXJIYXNGb29FbmQpIGNvbnRpbnVlO1xuXHRcdFx0XHRpZiAoaXNCYXJIYXNGb29TdGFydCAmJiBmb28uc3RhcnQub2Zmc2V0ID09PSBmb28uZW5kLm9mZnNldCkgY29udGludWU7XG5cdFx0XHRcdGlmIChpc0Zvb0hhc0JhckVuZCAmJiBiYXIuc3RhcnQub2Zmc2V0ID09PSBiYXIuZW5kLm9mZnNldCkgY29udGludWU7XG5cdFx0XHRcdHRocm93IG5ldyBTaGlraUVycm9yJDEoYERlY29yYXRpb25zICR7SlNPTi5zdHJpbmdpZnkoZm9vLnN0YXJ0KX0gYW5kICR7SlNPTi5zdHJpbmdpZnkoYmFyLnN0YXJ0KX0gaW50ZXJzZWN0LmApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuZnVuY3Rpb24gc3RyaW5naWZ5KGVsKSB7XG5cdGlmIChlbC50eXBlID09PSBcInRleHRcIikgcmV0dXJuIGVsLnZhbHVlO1xuXHRpZiAoZWwudHlwZSA9PT0gXCJlbGVtZW50XCIpIHJldHVybiBlbC5jaGlsZHJlbi5tYXAoc3RyaW5naWZ5KS5qb2luKFwiXCIpO1xuXHRyZXR1cm4gXCJcIjtcbn1cbi8vI2VuZHJlZ2lvblxuLy8jcmVnaW9uIHNyYy9oaWdobGlnaHQvX2dldC10cmFuc2Zvcm1lcnMudHNcbmNvbnN0IGJ1aWx0SW5UcmFuc2Zvcm1lcnMgPSBbLyogQF9fUFVSRV9fICovIHRyYW5zZm9ybWVyRGVjb3JhdGlvbnMoKV07XG5mdW5jdGlvbiBnZXRUcmFuc2Zvcm1lcnMob3B0aW9ucykge1xuXHRjb25zdCB0cmFuc2Zvcm1lcnMgPSBzb3J0VHJhbnNmb3JtZXJzQnlFbmZvcmNlbWVudChvcHRpb25zLnRyYW5zZm9ybWVycyB8fCBbXSk7XG5cdHJldHVybiBbXG5cdFx0Li4udHJhbnNmb3JtZXJzLnByZSxcblx0XHQuLi50cmFuc2Zvcm1lcnMubm9ybWFsLFxuXHRcdC4uLnRyYW5zZm9ybWVycy5wb3N0LFxuXHRcdC4uLmJ1aWx0SW5UcmFuc2Zvcm1lcnNcblx0XTtcbn1cbmZ1bmN0aW9uIHNvcnRUcmFuc2Zvcm1lcnNCeUVuZm9yY2VtZW50KHRyYW5zZm9ybWVycykge1xuXHRjb25zdCBwcmUgPSBbXTtcblx0Y29uc3QgcG9zdCA9IFtdO1xuXHRjb25zdCBub3JtYWwgPSBbXTtcblx0Zm9yIChjb25zdCB0cmFuc2Zvcm1lciBvZiB0cmFuc2Zvcm1lcnMpIHN3aXRjaCAodHJhbnNmb3JtZXIuZW5mb3JjZSkge1xuXHRcdGNhc2UgXCJwcmVcIjpcblx0XHRcdHByZS5wdXNoKHRyYW5zZm9ybWVyKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJwb3N0XCI6XG5cdFx0XHRwb3N0LnB1c2godHJhbnNmb3JtZXIpO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDogbm9ybWFsLnB1c2godHJhbnNmb3JtZXIpO1xuXHR9XG5cdHJldHVybiB7XG5cdFx0cHJlLFxuXHRcdHBvc3QsXG5cdFx0bm9ybWFsXG5cdH07XG59XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiAuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vYW5zaS1zZXF1ZW5jZS1wYXJzZXJAMS4xLjMvbm9kZV9tb2R1bGVzL2Fuc2ktc2VxdWVuY2UtcGFyc2VyL2Rpc3QvaW5kZXguanNcbnZhciBuYW1lZENvbG9ycyA9IFtcblx0XCJibGFja1wiLFxuXHRcInJlZFwiLFxuXHRcImdyZWVuXCIsXG5cdFwieWVsbG93XCIsXG5cdFwiYmx1ZVwiLFxuXHRcIm1hZ2VudGFcIixcblx0XCJjeWFuXCIsXG5cdFwid2hpdGVcIixcblx0XCJicmlnaHRCbGFja1wiLFxuXHRcImJyaWdodFJlZFwiLFxuXHRcImJyaWdodEdyZWVuXCIsXG5cdFwiYnJpZ2h0WWVsbG93XCIsXG5cdFwiYnJpZ2h0Qmx1ZVwiLFxuXHRcImJyaWdodE1hZ2VudGFcIixcblx0XCJicmlnaHRDeWFuXCIsXG5cdFwiYnJpZ2h0V2hpdGVcIlxuXTtcbnZhciBkZWNvcmF0aW9ucyA9IHtcblx0MTogXCJib2xkXCIsXG5cdDI6IFwiZGltXCIsXG5cdDM6IFwiaXRhbGljXCIsXG5cdDQ6IFwidW5kZXJsaW5lXCIsXG5cdDc6IFwicmV2ZXJzZVwiLFxuXHQ4OiBcImhpZGRlblwiLFxuXHQ5OiBcInN0cmlrZXRocm91Z2hcIlxufTtcbmZ1bmN0aW9uIGZpbmRTZXF1ZW5jZSh2YWx1ZSwgcG9zaXRpb24pIHtcblx0Y29uc3QgbmV4dEVzY2FwZSA9IHZhbHVlLmluZGV4T2YoXCJcXHgxQlwiLCBwb3NpdGlvbik7XG5cdGlmIChuZXh0RXNjYXBlICE9PSAtMSkge1xuXHRcdGlmICh2YWx1ZVtuZXh0RXNjYXBlICsgMV0gPT09IFwiW1wiKSB7XG5cdFx0XHRjb25zdCBuZXh0Q2xvc2UgPSB2YWx1ZS5pbmRleE9mKFwibVwiLCBuZXh0RXNjYXBlKTtcblx0XHRcdGlmIChuZXh0Q2xvc2UgIT09IC0xKSByZXR1cm4ge1xuXHRcdFx0XHRzZXF1ZW5jZTogdmFsdWUuc3Vic3RyaW5nKG5leHRFc2NhcGUgKyAyLCBuZXh0Q2xvc2UpLnNwbGl0KFwiO1wiKSxcblx0XHRcdFx0c3RhcnRQb3NpdGlvbjogbmV4dEVzY2FwZSxcblx0XHRcdFx0cG9zaXRpb246IG5leHRDbG9zZSArIDFcblx0XHRcdH07XG5cdFx0fVxuXHR9XG5cdHJldHVybiB7IHBvc2l0aW9uOiB2YWx1ZS5sZW5ndGggfTtcbn1cbmZ1bmN0aW9uIHBhcnNlQ29sb3Ioc2VxdWVuY2UpIHtcblx0Y29uc3QgY29sb3JNb2RlID0gc2VxdWVuY2Uuc2hpZnQoKTtcblx0aWYgKGNvbG9yTW9kZSA9PT0gXCIyXCIpIHtcblx0XHRjb25zdCByZ2IgPSBzZXF1ZW5jZS5zcGxpY2UoMCwgMykubWFwKCh4KSA9PiBOdW1iZXIucGFyc2VJbnQoeCkpO1xuXHRcdGlmIChyZ2IubGVuZ3RoICE9PSAzIHx8IHJnYi5zb21lKCh4KSA9PiBOdW1iZXIuaXNOYU4oeCkpKSByZXR1cm47XG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IFwicmdiXCIsXG5cdFx0XHRyZ2Jcblx0XHR9O1xuXHR9IGVsc2UgaWYgKGNvbG9yTW9kZSA9PT0gXCI1XCIpIHtcblx0XHRjb25zdCBpbmRleCA9IHNlcXVlbmNlLnNoaWZ0KCk7XG5cdFx0aWYgKGluZGV4KSByZXR1cm4ge1xuXHRcdFx0dHlwZTogXCJ0YWJsZVwiLFxuXHRcdFx0aW5kZXg6IE51bWJlcihpbmRleClcblx0XHR9O1xuXHR9XG59XG5mdW5jdGlvbiBwYXJzZVNlcXVlbmNlKHNlcXVlbmNlKSB7XG5cdGNvbnN0IGNvbW1hbmRzID0gW107XG5cdHdoaWxlIChzZXF1ZW5jZS5sZW5ndGggPiAwKSB7XG5cdFx0Y29uc3QgY29kZSA9IHNlcXVlbmNlLnNoaWZ0KCk7XG5cdFx0aWYgKCFjb2RlKSBjb250aW51ZTtcblx0XHRjb25zdCBjb2RlSW50ID0gTnVtYmVyLnBhcnNlSW50KGNvZGUpO1xuXHRcdGlmIChOdW1iZXIuaXNOYU4oY29kZUludCkpIGNvbnRpbnVlO1xuXHRcdGlmIChjb2RlSW50ID09PSAwKSBjb21tYW5kcy5wdXNoKHsgdHlwZTogXCJyZXNldEFsbFwiIH0pO1xuXHRcdGVsc2UgaWYgKGNvZGVJbnQgPD0gOSkge1xuXHRcdFx0aWYgKGRlY29yYXRpb25zW2NvZGVJbnRdKSBjb21tYW5kcy5wdXNoKHtcblx0XHRcdFx0dHlwZTogXCJzZXREZWNvcmF0aW9uXCIsXG5cdFx0XHRcdHZhbHVlOiBkZWNvcmF0aW9uc1tjb2RlSW50XVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIGlmIChjb2RlSW50IDw9IDI5KSB7XG5cdFx0XHRjb25zdCBkZWNvcmF0aW9uID0gZGVjb3JhdGlvbnNbY29kZUludCAtIDIwXTtcblx0XHRcdGlmIChkZWNvcmF0aW9uKSB7XG5cdFx0XHRcdGNvbW1hbmRzLnB1c2goe1xuXHRcdFx0XHRcdHR5cGU6IFwicmVzZXREZWNvcmF0aW9uXCIsXG5cdFx0XHRcdFx0dmFsdWU6IGRlY29yYXRpb25cblx0XHRcdFx0fSk7XG5cdFx0XHRcdGlmIChkZWNvcmF0aW9uID09PSBcImRpbVwiKSBjb21tYW5kcy5wdXNoKHtcblx0XHRcdFx0XHR0eXBlOiBcInJlc2V0RGVjb3JhdGlvblwiLFxuXHRcdFx0XHRcdHZhbHVlOiBcImJvbGRcIlxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGNvZGVJbnQgPD0gMzcpIGNvbW1hbmRzLnB1c2goe1xuXHRcdFx0dHlwZTogXCJzZXRGb3JlZ3JvdW5kQ29sb3JcIixcblx0XHRcdHZhbHVlOiB7XG5cdFx0XHRcdHR5cGU6IFwibmFtZWRcIixcblx0XHRcdFx0bmFtZTogbmFtZWRDb2xvcnNbY29kZUludCAtIDMwXVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGVsc2UgaWYgKGNvZGVJbnQgPT09IDM4KSB7XG5cdFx0XHRjb25zdCBjb2xvciA9IHBhcnNlQ29sb3Ioc2VxdWVuY2UpO1xuXHRcdFx0aWYgKGNvbG9yKSBjb21tYW5kcy5wdXNoKHtcblx0XHRcdFx0dHlwZTogXCJzZXRGb3JlZ3JvdW5kQ29sb3JcIixcblx0XHRcdFx0dmFsdWU6IGNvbG9yXG5cdFx0XHR9KTtcblx0XHR9IGVsc2UgaWYgKGNvZGVJbnQgPT09IDM5KSBjb21tYW5kcy5wdXNoKHsgdHlwZTogXCJyZXNldEZvcmVncm91bmRDb2xvclwiIH0pO1xuXHRcdGVsc2UgaWYgKGNvZGVJbnQgPD0gNDcpIGNvbW1hbmRzLnB1c2goe1xuXHRcdFx0dHlwZTogXCJzZXRCYWNrZ3JvdW5kQ29sb3JcIixcblx0XHRcdHZhbHVlOiB7XG5cdFx0XHRcdHR5cGU6IFwibmFtZWRcIixcblx0XHRcdFx0bmFtZTogbmFtZWRDb2xvcnNbY29kZUludCAtIDQwXVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGVsc2UgaWYgKGNvZGVJbnQgPT09IDQ4KSB7XG5cdFx0XHRjb25zdCBjb2xvciA9IHBhcnNlQ29sb3Ioc2VxdWVuY2UpO1xuXHRcdFx0aWYgKGNvbG9yKSBjb21tYW5kcy5wdXNoKHtcblx0XHRcdFx0dHlwZTogXCJzZXRCYWNrZ3JvdW5kQ29sb3JcIixcblx0XHRcdFx0dmFsdWU6IGNvbG9yXG5cdFx0XHR9KTtcblx0XHR9IGVsc2UgaWYgKGNvZGVJbnQgPT09IDQ5KSBjb21tYW5kcy5wdXNoKHsgdHlwZTogXCJyZXNldEJhY2tncm91bmRDb2xvclwiIH0pO1xuXHRcdGVsc2UgaWYgKGNvZGVJbnQgPT09IDUzKSBjb21tYW5kcy5wdXNoKHtcblx0XHRcdHR5cGU6IFwic2V0RGVjb3JhdGlvblwiLFxuXHRcdFx0dmFsdWU6IFwib3ZlcmxpbmVcIlxuXHRcdH0pO1xuXHRcdGVsc2UgaWYgKGNvZGVJbnQgPT09IDU1KSBjb21tYW5kcy5wdXNoKHtcblx0XHRcdHR5cGU6IFwicmVzZXREZWNvcmF0aW9uXCIsXG5cdFx0XHR2YWx1ZTogXCJvdmVybGluZVwiXG5cdFx0fSk7XG5cdFx0ZWxzZSBpZiAoY29kZUludCA+PSA5MCAmJiBjb2RlSW50IDw9IDk3KSBjb21tYW5kcy5wdXNoKHtcblx0XHRcdHR5cGU6IFwic2V0Rm9yZWdyb3VuZENvbG9yXCIsXG5cdFx0XHR2YWx1ZToge1xuXHRcdFx0XHR0eXBlOiBcIm5hbWVkXCIsXG5cdFx0XHRcdG5hbWU6IG5hbWVkQ29sb3JzW2NvZGVJbnQgLSA5MCArIDhdXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0ZWxzZSBpZiAoY29kZUludCA+PSAxMDAgJiYgY29kZUludCA8PSAxMDcpIGNvbW1hbmRzLnB1c2goe1xuXHRcdFx0dHlwZTogXCJzZXRCYWNrZ3JvdW5kQ29sb3JcIixcblx0XHRcdHZhbHVlOiB7XG5cdFx0XHRcdHR5cGU6IFwibmFtZWRcIixcblx0XHRcdFx0bmFtZTogbmFtZWRDb2xvcnNbY29kZUludCAtIDEwMCArIDhdXG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0cmV0dXJuIGNvbW1hbmRzO1xufVxuZnVuY3Rpb24gY3JlYXRlQW5zaVNlcXVlbmNlUGFyc2VyKCkge1xuXHRsZXQgZm9yZWdyb3VuZCA9IG51bGw7XG5cdGxldCBiYWNrZ3JvdW5kID0gbnVsbDtcblx0bGV0IGRlY29yYXRpb25zMiA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KCk7XG5cdHJldHVybiB7IHBhcnNlKHZhbHVlKSB7XG5cdFx0Y29uc3QgdG9rZW5zID0gW107XG5cdFx0bGV0IHBvc2l0aW9uID0gMDtcblx0XHRkbyB7XG5cdFx0XHRjb25zdCBmaW5kUmVzdWx0ID0gZmluZFNlcXVlbmNlKHZhbHVlLCBwb3NpdGlvbik7XG5cdFx0XHRjb25zdCB0ZXh0ID0gZmluZFJlc3VsdC5zZXF1ZW5jZSA/IHZhbHVlLnN1YnN0cmluZyhwb3NpdGlvbiwgZmluZFJlc3VsdC5zdGFydFBvc2l0aW9uKSA6IHZhbHVlLnN1YnN0cmluZyhwb3NpdGlvbik7XG5cdFx0XHRpZiAodGV4dC5sZW5ndGggPiAwKSB0b2tlbnMucHVzaCh7XG5cdFx0XHRcdHZhbHVlOiB0ZXh0LFxuXHRcdFx0XHRmb3JlZ3JvdW5kLFxuXHRcdFx0XHRiYWNrZ3JvdW5kLFxuXHRcdFx0XHRkZWNvcmF0aW9uczogbmV3IFNldChkZWNvcmF0aW9uczIpXG5cdFx0XHR9KTtcblx0XHRcdGlmIChmaW5kUmVzdWx0LnNlcXVlbmNlKSB7XG5cdFx0XHRcdGNvbnN0IGNvbW1hbmRzID0gcGFyc2VTZXF1ZW5jZShmaW5kUmVzdWx0LnNlcXVlbmNlKTtcblx0XHRcdFx0Zm9yIChjb25zdCBzdHlsZVRva2VuIG9mIGNvbW1hbmRzKSBpZiAoc3R5bGVUb2tlbi50eXBlID09PSBcInJlc2V0QWxsXCIpIHtcblx0XHRcdFx0XHRmb3JlZ3JvdW5kID0gbnVsbDtcblx0XHRcdFx0XHRiYWNrZ3JvdW5kID0gbnVsbDtcblx0XHRcdFx0XHRkZWNvcmF0aW9uczIuY2xlYXIoKTtcblx0XHRcdFx0fSBlbHNlIGlmIChzdHlsZVRva2VuLnR5cGUgPT09IFwicmVzZXRGb3JlZ3JvdW5kQ29sb3JcIikgZm9yZWdyb3VuZCA9IG51bGw7XG5cdFx0XHRcdGVsc2UgaWYgKHN0eWxlVG9rZW4udHlwZSA9PT0gXCJyZXNldEJhY2tncm91bmRDb2xvclwiKSBiYWNrZ3JvdW5kID0gbnVsbDtcblx0XHRcdFx0ZWxzZSBpZiAoc3R5bGVUb2tlbi50eXBlID09PSBcInJlc2V0RGVjb3JhdGlvblwiKSBkZWNvcmF0aW9uczIuZGVsZXRlKHN0eWxlVG9rZW4udmFsdWUpO1xuXHRcdFx0XHRmb3IgKGNvbnN0IHN0eWxlVG9rZW4gb2YgY29tbWFuZHMpIGlmIChzdHlsZVRva2VuLnR5cGUgPT09IFwic2V0Rm9yZWdyb3VuZENvbG9yXCIpIGZvcmVncm91bmQgPSBzdHlsZVRva2VuLnZhbHVlO1xuXHRcdFx0XHRlbHNlIGlmIChzdHlsZVRva2VuLnR5cGUgPT09IFwic2V0QmFja2dyb3VuZENvbG9yXCIpIGJhY2tncm91bmQgPSBzdHlsZVRva2VuLnZhbHVlO1xuXHRcdFx0XHRlbHNlIGlmIChzdHlsZVRva2VuLnR5cGUgPT09IFwic2V0RGVjb3JhdGlvblwiKSBkZWNvcmF0aW9uczIuYWRkKHN0eWxlVG9rZW4udmFsdWUpO1xuXHRcdFx0fVxuXHRcdFx0cG9zaXRpb24gPSBmaW5kUmVzdWx0LnBvc2l0aW9uO1xuXHRcdH0gd2hpbGUgKHBvc2l0aW9uIDwgdmFsdWUubGVuZ3RoKTtcblx0XHRyZXR1cm4gdG9rZW5zO1xuXHR9IH07XG59XG52YXIgZGVmYXVsdE5hbWVkQ29sb3JzTWFwID0ge1xuXHRibGFjazogXCIjMDAwMDAwXCIsXG5cdHJlZDogXCIjYmIwMDAwXCIsXG5cdGdyZWVuOiBcIiMwMGJiMDBcIixcblx0eWVsbG93OiBcIiNiYmJiMDBcIixcblx0Ymx1ZTogXCIjMDAwMGJiXCIsXG5cdG1hZ2VudGE6IFwiI2ZmMDBmZlwiLFxuXHRjeWFuOiBcIiMwMGJiYmJcIixcblx0d2hpdGU6IFwiI2VlZWVlZVwiLFxuXHRicmlnaHRCbGFjazogXCIjNTU1NTU1XCIsXG5cdGJyaWdodFJlZDogXCIjZmY1NTU1XCIsXG5cdGJyaWdodEdyZWVuOiBcIiMwMGZmMDBcIixcblx0YnJpZ2h0WWVsbG93OiBcIiNmZmZmNTVcIixcblx0YnJpZ2h0Qmx1ZTogXCIjNTU1NWZmXCIsXG5cdGJyaWdodE1hZ2VudGE6IFwiI2ZmNTVmZlwiLFxuXHRicmlnaHRDeWFuOiBcIiM1NWZmZmZcIixcblx0YnJpZ2h0V2hpdGU6IFwiI2ZmZmZmZlwiXG59O1xuZnVuY3Rpb24gY3JlYXRlQ29sb3JQYWxldHRlKG5hbWVkQ29sb3JzTWFwID0gZGVmYXVsdE5hbWVkQ29sb3JzTWFwKSB7XG5cdGZ1bmN0aW9uIG5hbWVkQ29sb3IobmFtZSkge1xuXHRcdHJldHVybiBuYW1lZENvbG9yc01hcFtuYW1lXTtcblx0fVxuXHRmdW5jdGlvbiByZ2JDb2xvcihyZ2IpIHtcblx0XHRyZXR1cm4gYCMke3JnYi5tYXAoKHgpID0+IE1hdGgubWF4KDAsIE1hdGgubWluKHgsIDI1NSkpLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCBcIjBcIikpLmpvaW4oXCJcIil9YDtcblx0fVxuXHRsZXQgY29sb3JUYWJsZTtcblx0ZnVuY3Rpb24gZ2V0Q29sb3JUYWJsZSgpIHtcblx0XHRpZiAoY29sb3JUYWJsZSkgcmV0dXJuIGNvbG9yVGFibGU7XG5cdFx0Y29sb3JUYWJsZSA9IFtdO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZWRDb2xvcnMubGVuZ3RoOyBpKyspIGNvbG9yVGFibGUucHVzaChuYW1lZENvbG9yKG5hbWVkQ29sb3JzW2ldKSk7XG5cdFx0bGV0IGxldmVscyA9IFtcblx0XHRcdDAsXG5cdFx0XHQ5NSxcblx0XHRcdDEzNSxcblx0XHRcdDE3NSxcblx0XHRcdDIxNSxcblx0XHRcdDI1NVxuXHRcdF07XG5cdFx0Zm9yIChsZXQgciA9IDA7IHIgPCA2OyByKyspIGZvciAobGV0IGcgPSAwOyBnIDwgNjsgZysrKSBmb3IgKGxldCBiID0gMDsgYiA8IDY7IGIrKykgY29sb3JUYWJsZS5wdXNoKHJnYkNvbG9yKFtcblx0XHRcdGxldmVsc1tyXSxcblx0XHRcdGxldmVsc1tnXSxcblx0XHRcdGxldmVsc1tiXVxuXHRcdF0pKTtcblx0XHRsZXQgbGV2ZWwgPSA4O1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgMjQ7IGkrKywgbGV2ZWwgKz0gMTApIGNvbG9yVGFibGUucHVzaChyZ2JDb2xvcihbXG5cdFx0XHRsZXZlbCxcblx0XHRcdGxldmVsLFxuXHRcdFx0bGV2ZWxcblx0XHRdKSk7XG5cdFx0cmV0dXJuIGNvbG9yVGFibGU7XG5cdH1cblx0ZnVuY3Rpb24gdGFibGVDb2xvcihpbmRleCkge1xuXHRcdHJldHVybiBnZXRDb2xvclRhYmxlKClbaW5kZXhdO1xuXHR9XG5cdGZ1bmN0aW9uIHZhbHVlKGNvbG9yKSB7XG5cdFx0c3dpdGNoIChjb2xvci50eXBlKSB7XG5cdFx0XHRjYXNlIFwibmFtZWRcIjogcmV0dXJuIG5hbWVkQ29sb3IoY29sb3IubmFtZSk7XG5cdFx0XHRjYXNlIFwicmdiXCI6IHJldHVybiByZ2JDb2xvcihjb2xvci5yZ2IpO1xuXHRcdFx0Y2FzZSBcInRhYmxlXCI6IHJldHVybiB0YWJsZUNvbG9yKGNvbG9yLmluZGV4KTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHsgdmFsdWUgfTtcbn1cbi8vI2VuZHJlZ2lvblxuLy8jcmVnaW9uIHNyYy9oaWdobGlnaHQvY29kZS10by10b2tlbnMtYW5zaS50c1xuY29uc3QgUkVfSEVYX0NPTE9SID0gLyMoWzAtOWEtZl17Myw4fSkvaTtcbmNvbnN0IFJFX0NTU19WQVJfQU5TSSA9IC92YXJcXCgoLS1bXFx3LV0rLWFuc2ktW1xcdy1dKylcXCkvO1xuLyoqXG4qIERlZmF1bHQgQU5TSSBwYWxldHRlIChWU0NvZGUgY29tcGF0aWJsZSBmYWxsYmFja3MpXG4qIFVzZWQgd2hlbiB0aGUgdGhlbWUgZG9lcyBub3QgZGVmaW5lIHRlcm1pbmFsLmFuc2kqIGNvbG9ycy5cbiovXG5jb25zdCBkZWZhdWx0QW5zaUNvbG9ycyA9IHtcblx0YmxhY2s6IFwiIzAwMDAwMFwiLFxuXHRyZWQ6IFwiI2NkMzEzMVwiLFxuXHRncmVlbjogXCIjMERCQzc5XCIsXG5cdHllbGxvdzogXCIjRTVFNTEwXCIsXG5cdGJsdWU6IFwiIzI0NzJDOFwiLFxuXHRtYWdlbnRhOiBcIiNCQzNGQkNcIixcblx0Y3lhbjogXCIjMTFBOENEXCIsXG5cdHdoaXRlOiBcIiNFNUU1RTVcIixcblx0YnJpZ2h0QmxhY2s6IFwiIzY2NjY2NlwiLFxuXHRicmlnaHRSZWQ6IFwiI0YxNEM0Q1wiLFxuXHRicmlnaHRHcmVlbjogXCIjMjNEMThCXCIsXG5cdGJyaWdodFllbGxvdzogXCIjRjVGNTQzXCIsXG5cdGJyaWdodEJsdWU6IFwiIzNCOEVFQVwiLFxuXHRicmlnaHRNYWdlbnRhOiBcIiNENjcwRDZcIixcblx0YnJpZ2h0Q3lhbjogXCIjMjlCOERCXCIsXG5cdGJyaWdodFdoaXRlOiBcIiNGRkZGRkZcIlxufTtcbmZ1bmN0aW9uIHRva2VuaXplQW5zaVdpdGhUaGVtZSh0aGVtZSwgZmlsZUNvbnRlbnRzLCBvcHRpb25zKSB7XG5cdGNvbnN0IGNvbG9yUmVwbGFjZW1lbnRzID0gcmVzb2x2ZUNvbG9yUmVwbGFjZW1lbnRzKHRoZW1lLCBvcHRpb25zKTtcblx0Y29uc3QgbGluZXMgPSBzcGxpdExpbmVzKGZpbGVDb250ZW50cyk7XG5cdGNvbnN0IGNvbG9yUGFsZXR0ZSA9IGNyZWF0ZUNvbG9yUGFsZXR0ZShPYmplY3QuZnJvbUVudHJpZXMobmFtZWRDb2xvcnMubWFwKChuYW1lKSA9PiB7XG5cdFx0Y29uc3Qga2V5ID0gYHRlcm1pbmFsLmFuc2kke25hbWVbMF0udG9VcHBlckNhc2UoKX0ke25hbWUuc3Vic3RyaW5nKDEpfWA7XG5cdFx0cmV0dXJuIFtuYW1lLCB0aGVtZS5jb2xvcnM/LltrZXldIHx8IGRlZmF1bHRBbnNpQ29sb3JzW25hbWVdXTtcblx0fSkpKTtcblx0Y29uc3QgcGFyc2VyID0gY3JlYXRlQW5zaVNlcXVlbmNlUGFyc2VyKCk7XG5cdHJldHVybiBsaW5lcy5tYXAoKGxpbmUpID0+IHBhcnNlci5wYXJzZShsaW5lWzBdKS5tYXAoKHRva2VuKSA9PiB7XG5cdFx0bGV0IGNvbG9yO1xuXHRcdGxldCBiZ0NvbG9yO1xuXHRcdGlmICh0b2tlbi5kZWNvcmF0aW9ucy5oYXMoXCJyZXZlcnNlXCIpKSB7XG5cdFx0XHRjb2xvciA9IHRva2VuLmJhY2tncm91bmQgPyBjb2xvclBhbGV0dGUudmFsdWUodG9rZW4uYmFja2dyb3VuZCkgOiB0aGVtZS5iZztcblx0XHRcdGJnQ29sb3IgPSB0b2tlbi5mb3JlZ3JvdW5kID8gY29sb3JQYWxldHRlLnZhbHVlKHRva2VuLmZvcmVncm91bmQpIDogdGhlbWUuZmc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbG9yID0gdG9rZW4uZm9yZWdyb3VuZCA/IGNvbG9yUGFsZXR0ZS52YWx1ZSh0b2tlbi5mb3JlZ3JvdW5kKSA6IHRoZW1lLmZnO1xuXHRcdFx0YmdDb2xvciA9IHRva2VuLmJhY2tncm91bmQgPyBjb2xvclBhbGV0dGUudmFsdWUodG9rZW4uYmFja2dyb3VuZCkgOiB2b2lkIDA7XG5cdFx0fVxuXHRcdGNvbG9yID0gYXBwbHlDb2xvclJlcGxhY2VtZW50cyhjb2xvciwgY29sb3JSZXBsYWNlbWVudHMpO1xuXHRcdGJnQ29sb3IgPSBhcHBseUNvbG9yUmVwbGFjZW1lbnRzKGJnQ29sb3IsIGNvbG9yUmVwbGFjZW1lbnRzKTtcblx0XHRpZiAodG9rZW4uZGVjb3JhdGlvbnMuaGFzKFwiZGltXCIpKSBjb2xvciA9IGRpbUNvbG9yKGNvbG9yKTtcblx0XHRsZXQgZm9udFN0eWxlID0gRm9udFN0eWxlLk5vbmU7XG5cdFx0aWYgKHRva2VuLmRlY29yYXRpb25zLmhhcyhcImJvbGRcIikpIGZvbnRTdHlsZSB8PSBGb250U3R5bGUuQm9sZDtcblx0XHRpZiAodG9rZW4uZGVjb3JhdGlvbnMuaGFzKFwiaXRhbGljXCIpKSBmb250U3R5bGUgfD0gRm9udFN0eWxlLkl0YWxpYztcblx0XHRpZiAodG9rZW4uZGVjb3JhdGlvbnMuaGFzKFwidW5kZXJsaW5lXCIpKSBmb250U3R5bGUgfD0gRm9udFN0eWxlLlVuZGVybGluZTtcblx0XHRpZiAodG9rZW4uZGVjb3JhdGlvbnMuaGFzKFwic3RyaWtldGhyb3VnaFwiKSkgZm9udFN0eWxlIHw9IEZvbnRTdHlsZS5TdHJpa2V0aHJvdWdoO1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb250ZW50OiB0b2tlbi52YWx1ZSxcblx0XHRcdG9mZnNldDogbGluZVsxXSxcblx0XHRcdGNvbG9yLFxuXHRcdFx0YmdDb2xvcixcblx0XHRcdGZvbnRTdHlsZVxuXHRcdH07XG5cdH0pKTtcbn1cbi8qKlxuKiBBZGRzIDUwJSBhbHBoYSB0byBhIGhleCBjb2xvciBzdHJpbmcgb3IgdGhlIFwiLWRpbVwiIHBvc3RmaXggdG8gYSBDU1MgdmFyaWFibGVcbiovXG5mdW5jdGlvbiBkaW1Db2xvcihjb2xvcikge1xuXHRjb25zdCBoZXhNYXRjaCA9IGNvbG9yLm1hdGNoKFJFX0hFWF9DT0xPUik7XG5cdGlmIChoZXhNYXRjaCkge1xuXHRcdGNvbnN0IGhleCA9IGhleE1hdGNoWzFdO1xuXHRcdGlmIChoZXgubGVuZ3RoID09PSA4KSB7XG5cdFx0XHRjb25zdCBhbHBoYSA9IE1hdGgucm91bmQoTnVtYmVyLnBhcnNlSW50KGhleC5zbGljZSg2LCA4KSwgMTYpIC8gMikudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcblx0XHRcdHJldHVybiBgIyR7aGV4LnNsaWNlKDAsIDYpfSR7YWxwaGF9YDtcblx0XHR9IGVsc2UgaWYgKGhleC5sZW5ndGggPT09IDYpIHJldHVybiBgIyR7aGV4fTgwYDtcblx0XHRlbHNlIGlmIChoZXgubGVuZ3RoID09PSA0KSB7XG5cdFx0XHRjb25zdCByID0gaGV4WzBdO1xuXHRcdFx0Y29uc3QgZyA9IGhleFsxXTtcblx0XHRcdGNvbnN0IGIgPSBoZXhbMl07XG5cdFx0XHRjb25zdCBhID0gaGV4WzNdO1xuXHRcdFx0cmV0dXJuIGAjJHtyfSR7cn0ke2d9JHtnfSR7Yn0ke2J9JHtNYXRoLnJvdW5kKE51bWJlci5wYXJzZUludChgJHthfSR7YX1gLCAxNikgLyAyKS50b1N0cmluZygxNikucGFkU3RhcnQoMiwgXCIwXCIpfWA7XG5cdFx0fSBlbHNlIGlmIChoZXgubGVuZ3RoID09PSAzKSB7XG5cdFx0XHRjb25zdCByID0gaGV4WzBdO1xuXHRcdFx0Y29uc3QgZyA9IGhleFsxXTtcblx0XHRcdGNvbnN0IGIgPSBoZXhbMl07XG5cdFx0XHRyZXR1cm4gYCMke3J9JHtyfSR7Z30ke2d9JHtifSR7Yn04MGA7XG5cdFx0fVxuXHR9XG5cdGNvbnN0IGNzc1Zhck1hdGNoID0gY29sb3IubWF0Y2goUkVfQ1NTX1ZBUl9BTlNJKTtcblx0aWYgKGNzc1Zhck1hdGNoKSByZXR1cm4gYHZhcigke2Nzc1Zhck1hdGNoWzFdfS1kaW0pYDtcblx0cmV0dXJuIGNvbG9yO1xufVxuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gc3JjL2hpZ2hsaWdodC9jb2RlLXRvLXRva2Vucy1iYXNlLnRzXG4vKipcbiogQ29kZSB0byB0b2tlbnMsIHdpdGggYSBzaW1wbGUgdGhlbWUuXG4qIFRoaXMgd3JhcHMgdGhlIHRva2VuaXplcidzIGltcGxlbWVudGF0aW9uIHRvIGFkZCBBTlNJIHN1cHBvcnQuXG4qL1xuZnVuY3Rpb24gY29kZVRvVG9rZW5zQmFzZShwcmltaXRpdmUsIGNvZGUsIG9wdGlvbnMgPSB7fSkge1xuXHRjb25zdCBsYW5nID0gcHJpbWl0aXZlLnJlc29sdmVMYW5nQWxpYXMob3B0aW9ucy5sYW5nIHx8IFwidGV4dFwiKTtcblx0Y29uc3QgeyB0aGVtZTogdGhlbWVOYW1lID0gcHJpbWl0aXZlLmdldExvYWRlZFRoZW1lcygpWzBdIH0gPSBvcHRpb25zO1xuXHRpZiAoIWlzUGxhaW5MYW5nKGxhbmcpICYmICFpc05vbmVUaGVtZSh0aGVtZU5hbWUpICYmIGxhbmcgPT09IFwiYW5zaVwiKSB7XG5cdFx0Y29uc3QgeyB0aGVtZSB9ID0gcHJpbWl0aXZlLnNldFRoZW1lKHRoZW1lTmFtZSk7XG5cdFx0cmV0dXJuIHRva2VuaXplQW5zaVdpdGhUaGVtZSh0aGVtZSwgY29kZSwgb3B0aW9ucyk7XG5cdH1cblx0cmV0dXJuIGNvZGVUb1Rva2Vuc0Jhc2UkMShwcmltaXRpdmUsIGNvZGUsIG9wdGlvbnMpO1xufVxuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gc3JjL2hpZ2hsaWdodC9jb2RlLXRvLXRva2Vucy50c1xuLyoqXG4qIEhpZ2gtbGV2ZWwgY29kZS10by10b2tlbnMgQVBJLlxuKlxuKiBJdCB3aWxsIHVzZSBgY29kZVRvVG9rZW5zV2l0aFRoZW1lc2Agb3IgYGNvZGVUb1Rva2Vuc0Jhc2VgIGJhc2VkIG9uIHRoZSBvcHRpb25zLlxuKi9cbmZ1bmN0aW9uIGNvZGVUb1Rva2VucyhwcmltaXRpdmUsIGNvZGUsIG9wdGlvbnMpIHtcblx0bGV0IGJnO1xuXHRsZXQgZmc7XG5cdGxldCB0b2tlbnM7XG5cdGxldCB0aGVtZU5hbWU7XG5cdGxldCByb290U3R5bGU7XG5cdGxldCBncmFtbWFyU3RhdGU7XG5cdGlmIChcInRoZW1lc1wiIGluIG9wdGlvbnMpIHtcblx0XHRjb25zdCB7IGRlZmF1bHRDb2xvciA9IFwibGlnaHRcIiwgY3NzVmFyaWFibGVQcmVmaXggPSBcIi0tc2hpa2ktXCIsIGNvbG9yc1JlbmRlcmluZyA9IFwiY3NzLXZhcnNcIiB9ID0gb3B0aW9ucztcblx0XHRjb25zdCB0aGVtZXMgPSBPYmplY3QuZW50cmllcyhvcHRpb25zLnRoZW1lcykuZmlsdGVyKChpKSA9PiBpWzFdKS5tYXAoKGkpID0+ICh7XG5cdFx0XHRjb2xvcjogaVswXSxcblx0XHRcdHRoZW1lOiBpWzFdXG5cdFx0fSkpLnNvcnQoKGEsIGIpID0+IGEuY29sb3IgPT09IGRlZmF1bHRDb2xvciA/IC0xIDogYi5jb2xvciA9PT0gZGVmYXVsdENvbG9yID8gMSA6IDApO1xuXHRcdGlmICh0aGVtZXMubGVuZ3RoID09PSAwKSB0aHJvdyBuZXcgU2hpa2lFcnJvciQxKFwiYHRoZW1lc2Agb3B0aW9uIG11c3Qgbm90IGJlIGVtcHR5XCIpO1xuXHRcdGNvbnN0IHRoZW1lVG9rZW5zID0gY29kZVRvVG9rZW5zV2l0aFRoZW1lcyQxKHByaW1pdGl2ZSwgY29kZSwgb3B0aW9ucywgY29kZVRvVG9rZW5zQmFzZSk7XG5cdFx0Z3JhbW1hclN0YXRlID0gZ2V0TGFzdEdyYW1tYXJTdGF0ZUZyb21NYXAodGhlbWVUb2tlbnMpO1xuXHRcdGlmIChkZWZhdWx0Q29sb3IgJiYgXCJsaWdodC1kYXJrKClcIiAhPT0gZGVmYXVsdENvbG9yICYmICF0aGVtZXMuc29tZSgodCkgPT4gdC5jb2xvciA9PT0gZGVmYXVsdENvbG9yKSkgdGhyb3cgbmV3IFNoaWtpRXJyb3IkMShgXFxgdGhlbWVzXFxgIG9wdGlvbiBtdXN0IGNvbnRhaW4gdGhlIGRlZmF1bHRDb2xvciBrZXkgXFxgJHtkZWZhdWx0Q29sb3J9XFxgYCk7XG5cdFx0Y29uc3QgdGhlbWVSZWdzID0gdGhlbWVzLm1hcCgodCkgPT4gcHJpbWl0aXZlLmdldFRoZW1lKHQudGhlbWUpKTtcblx0XHRjb25zdCB0aGVtZXNPcmRlciA9IHRoZW1lcy5tYXAoKHQpID0+IHQuY29sb3IpO1xuXHRcdHRva2VucyA9IHRoZW1lVG9rZW5zLm1hcCgobGluZSkgPT4gbGluZS5tYXAoKHRva2VuKSA9PiBmbGF0VG9rZW5WYXJpYW50cyh0b2tlbiwgdGhlbWVzT3JkZXIsIGNzc1ZhcmlhYmxlUHJlZml4LCBkZWZhdWx0Q29sb3IsIGNvbG9yc1JlbmRlcmluZykpKTtcblx0XHRpZiAoZ3JhbW1hclN0YXRlKSBzZXRMYXN0R3JhbW1hclN0YXRlVG9NYXAodG9rZW5zLCBncmFtbWFyU3RhdGUpO1xuXHRcdGNvbnN0IHRoZW1lQ29sb3JSZXBsYWNlbWVudHMgPSB0aGVtZXMubWFwKCh0KSA9PiByZXNvbHZlQ29sb3JSZXBsYWNlbWVudHModC50aGVtZSwgb3B0aW9ucykpO1xuXHRcdGZnID0gbWFwVGhlbWVDb2xvcnModGhlbWVzLCB0aGVtZVJlZ3MsIHRoZW1lQ29sb3JSZXBsYWNlbWVudHMsIGNzc1ZhcmlhYmxlUHJlZml4LCBkZWZhdWx0Q29sb3IsIFwiZmdcIiwgY29sb3JzUmVuZGVyaW5nKTtcblx0XHRiZyA9IG1hcFRoZW1lQ29sb3JzKHRoZW1lcywgdGhlbWVSZWdzLCB0aGVtZUNvbG9yUmVwbGFjZW1lbnRzLCBjc3NWYXJpYWJsZVByZWZpeCwgZGVmYXVsdENvbG9yLCBcImJnXCIsIGNvbG9yc1JlbmRlcmluZyk7XG5cdFx0dGhlbWVOYW1lID0gYHNoaWtpLXRoZW1lcyAke3RoZW1lUmVncy5tYXAoKHQpID0+IHQubmFtZSkuam9pbihcIiBcIil9YDtcblx0XHRyb290U3R5bGUgPSBkZWZhdWx0Q29sb3IgPyB2b2lkIDAgOiBbZmcsIGJnXS5qb2luKFwiO1wiKTtcblx0fSBlbHNlIGlmIChcInRoZW1lXCIgaW4gb3B0aW9ucykge1xuXHRcdGNvbnN0IGNvbG9yUmVwbGFjZW1lbnRzID0gcmVzb2x2ZUNvbG9yUmVwbGFjZW1lbnRzKG9wdGlvbnMudGhlbWUsIG9wdGlvbnMpO1xuXHRcdHRva2VucyA9IGNvZGVUb1Rva2Vuc0Jhc2UocHJpbWl0aXZlLCBjb2RlLCBvcHRpb25zKTtcblx0XHRjb25zdCBfdGhlbWUgPSBwcmltaXRpdmUuZ2V0VGhlbWUob3B0aW9ucy50aGVtZSk7XG5cdFx0YmcgPSBhcHBseUNvbG9yUmVwbGFjZW1lbnRzKF90aGVtZS5iZywgY29sb3JSZXBsYWNlbWVudHMpO1xuXHRcdGZnID0gYXBwbHlDb2xvclJlcGxhY2VtZW50cyhfdGhlbWUuZmcsIGNvbG9yUmVwbGFjZW1lbnRzKTtcblx0XHR0aGVtZU5hbWUgPSBfdGhlbWUubmFtZTtcblx0XHRncmFtbWFyU3RhdGUgPSBnZXRMYXN0R3JhbW1hclN0YXRlRnJvbU1hcCh0b2tlbnMpO1xuXHR9IGVsc2UgdGhyb3cgbmV3IFNoaWtpRXJyb3IkMShcIkludmFsaWQgb3B0aW9ucywgZWl0aGVyIGB0aGVtZWAgb3IgYHRoZW1lc2AgbXVzdCBiZSBwcm92aWRlZFwiKTtcblx0cmV0dXJuIHtcblx0XHR0b2tlbnMsXG5cdFx0ZmcsXG5cdFx0YmcsXG5cdFx0dGhlbWVOYW1lLFxuXHRcdHJvb3RTdHlsZSxcblx0XHRncmFtbWFyU3RhdGVcblx0fTtcbn1cbmZ1bmN0aW9uIG1hcFRoZW1lQ29sb3JzKHRoZW1lcywgdGhlbWVSZWdzLCB0aGVtZUNvbG9yUmVwbGFjZW1lbnRzLCBjc3NWYXJpYWJsZVByZWZpeCwgZGVmYXVsdENvbG9yLCBwcm9wZXJ0eSwgY29sb3JzUmVuZGVyaW5nKSB7XG5cdHJldHVybiB0aGVtZXMubWFwKCh0LCBpZHgpID0+IHtcblx0XHRjb25zdCB2YWx1ZSA9IGFwcGx5Q29sb3JSZXBsYWNlbWVudHModGhlbWVSZWdzW2lkeF1bcHJvcGVydHldLCB0aGVtZUNvbG9yUmVwbGFjZW1lbnRzW2lkeF0pIHx8IFwiaW5oZXJpdFwiO1xuXHRcdGNvbnN0IGNzc1ZhciA9IGAke2Nzc1ZhcmlhYmxlUHJlZml4ICsgdC5jb2xvcn0ke3Byb3BlcnR5ID09PSBcImJnXCIgPyBcIi1iZ1wiIDogXCJcIn06JHt2YWx1ZX1gO1xuXHRcdGlmIChpZHggPT09IDAgJiYgZGVmYXVsdENvbG9yKSB7XG5cdFx0XHRpZiAoZGVmYXVsdENvbG9yID09PSBcImxpZ2h0LWRhcmsoKVwiICYmIHRoZW1lcy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdGNvbnN0IGxpZ2h0SW5kZXggPSB0aGVtZXMuZmluZEluZGV4KCh0KSA9PiB0LmNvbG9yID09PSBcImxpZ2h0XCIpO1xuXHRcdFx0XHRjb25zdCBkYXJrSW5kZXggPSB0aGVtZXMuZmluZEluZGV4KCh0KSA9PiB0LmNvbG9yID09PSBcImRhcmtcIik7XG5cdFx0XHRcdGlmIChsaWdodEluZGV4ID09PSAtMSB8fCBkYXJrSW5kZXggPT09IC0xKSB0aHJvdyBuZXcgU2hpa2lFcnJvciQxKFwiV2hlbiB1c2luZyBgZGVmYXVsdENvbG9yOiBcXFwibGlnaHQtZGFyaygpXFxcImAsIHlvdSBtdXN0IHByb3ZpZGUgYm90aCBgbGlnaHRgIGFuZCBgZGFya2AgdGhlbWVzXCIpO1xuXHRcdFx0XHRyZXR1cm4gYGxpZ2h0LWRhcmsoJHthcHBseUNvbG9yUmVwbGFjZW1lbnRzKHRoZW1lUmVnc1tsaWdodEluZGV4XVtwcm9wZXJ0eV0sIHRoZW1lQ29sb3JSZXBsYWNlbWVudHNbbGlnaHRJbmRleF0pIHx8IFwiaW5oZXJpdFwifSwgJHthcHBseUNvbG9yUmVwbGFjZW1lbnRzKHRoZW1lUmVnc1tkYXJrSW5kZXhdW3Byb3BlcnR5XSwgdGhlbWVDb2xvclJlcGxhY2VtZW50c1tkYXJrSW5kZXhdKSB8fCBcImluaGVyaXRcIn0pOyR7Y3NzVmFyfWA7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fVxuXHRcdGlmIChjb2xvcnNSZW5kZXJpbmcgPT09IFwiY3NzLXZhcnNcIikgcmV0dXJuIGNzc1Zhcjtcblx0XHRyZXR1cm4gbnVsbDtcblx0fSkuZmlsdGVyKChpKSA9PiAhIWkpLmpvaW4oXCI7XCIpO1xufVxuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gc3JjL2hpZ2hsaWdodC9jb2RlLXRvLWhhc3QudHNcbmNvbnN0IFJFX1dISVRFU1BBQ0VfT05MWSA9IC9eXFxzKyQvO1xuY29uc3QgUkVfTEVBRElOR19UUkFJTElOR19XSElURVNQQUNFID0gL14oXFxzKikoLio/KShcXHMqKSQvO1xuZnVuY3Rpb24gY29kZVRvSGFzdChwcmltaXRpdmUsIGNvZGUsIG9wdGlvbnMsIHRyYW5zZm9ybWVyQ29udGV4dCA9IHtcblx0bWV0YToge30sXG5cdG9wdGlvbnMsXG5cdGNvZGVUb0hhc3Q6IChfY29kZSwgX29wdGlvbnMpID0+IGNvZGVUb0hhc3QocHJpbWl0aXZlLCBfY29kZSwgX29wdGlvbnMpLFxuXHRjb2RlVG9Ub2tlbnM6IChfY29kZSwgX29wdGlvbnMpID0+IGNvZGVUb1Rva2VucyhwcmltaXRpdmUsIF9jb2RlLCBfb3B0aW9ucylcbn0pIHtcblx0bGV0IGlucHV0ID0gY29kZTtcblx0Zm9yIChjb25zdCB0cmFuc2Zvcm1lciBvZiBnZXRUcmFuc2Zvcm1lcnMob3B0aW9ucykpIGlucHV0ID0gdHJhbnNmb3JtZXIucHJlcHJvY2Vzcz8uY2FsbCh0cmFuc2Zvcm1lckNvbnRleHQsIGlucHV0LCBvcHRpb25zKSB8fCBpbnB1dDtcblx0bGV0IHsgdG9rZW5zLCBmZywgYmcsIHRoZW1lTmFtZSwgcm9vdFN0eWxlLCBncmFtbWFyU3RhdGUgfSA9IGNvZGVUb1Rva2VucyhwcmltaXRpdmUsIGlucHV0LCBvcHRpb25zKTtcblx0Y29uc3QgeyBtZXJnZVdoaXRlc3BhY2VzID0gdHJ1ZSwgbWVyZ2VTYW1lU3R5bGVUb2tlbnMgPSBmYWxzZSB9ID0gb3B0aW9ucztcblx0aWYgKG1lcmdlV2hpdGVzcGFjZXMgPT09IHRydWUpIHRva2VucyA9IG1lcmdlV2hpdGVzcGFjZVRva2Vucyh0b2tlbnMpO1xuXHRlbHNlIGlmIChtZXJnZVdoaXRlc3BhY2VzID09PSBcIm5ldmVyXCIpIHRva2VucyA9IHNwbGl0V2hpdGVzcGFjZVRva2Vucyh0b2tlbnMpO1xuXHRpZiAobWVyZ2VTYW1lU3R5bGVUb2tlbnMpIHRva2VucyA9IG1lcmdlQWRqYWNlbnRTdHlsZWRUb2tlbnModG9rZW5zKTtcblx0Y29uc3QgY29udGV4dFNvdXJjZSA9IHtcblx0XHQuLi50cmFuc2Zvcm1lckNvbnRleHQsXG5cdFx0Z2V0IHNvdXJjZSgpIHtcblx0XHRcdHJldHVybiBpbnB1dDtcblx0XHR9XG5cdH07XG5cdGZvciAoY29uc3QgdHJhbnNmb3JtZXIgb2YgZ2V0VHJhbnNmb3JtZXJzKG9wdGlvbnMpKSB0b2tlbnMgPSB0cmFuc2Zvcm1lci50b2tlbnM/LmNhbGwoY29udGV4dFNvdXJjZSwgdG9rZW5zKSB8fCB0b2tlbnM7XG5cdHJldHVybiB0b2tlbnNUb0hhc3QodG9rZW5zLCB7XG5cdFx0Li4ub3B0aW9ucyxcblx0XHRmZyxcblx0XHRiZyxcblx0XHR0aGVtZU5hbWUsXG5cdFx0cm9vdFN0eWxlOiBvcHRpb25zLnJvb3RTdHlsZSA9PT0gZmFsc2UgPyBmYWxzZSA6IG9wdGlvbnMucm9vdFN0eWxlID8/IHJvb3RTdHlsZVxuXHR9LCBjb250ZXh0U291cmNlLCBncmFtbWFyU3RhdGUpO1xufVxuZnVuY3Rpb24gdG9rZW5zVG9IYXN0KHRva2Vucywgb3B0aW9ucywgdHJhbnNmb3JtZXJDb250ZXh0LCBncmFtbWFyU3RhdGUgPSBnZXRMYXN0R3JhbW1hclN0YXRlRnJvbU1hcCh0b2tlbnMpKSB7XG5cdGNvbnN0IHRyYW5zZm9ybWVycyA9IGdldFRyYW5zZm9ybWVycyhvcHRpb25zKTtcblx0Y29uc3QgbGluZXMgPSBbXTtcblx0Y29uc3Qgcm9vdCA9IHtcblx0XHR0eXBlOiBcInJvb3RcIixcblx0XHRjaGlsZHJlbjogW11cblx0fTtcblx0Y29uc3QgeyBzdHJ1Y3R1cmUgPSBcImNsYXNzaWNcIiwgdGFiaW5kZXggPSBcIjBcIiB9ID0gb3B0aW9ucztcblx0Y29uc3QgcHJvcGVydGllcyA9IHsgY2xhc3M6IGBzaGlraSAke29wdGlvbnMudGhlbWVOYW1lIHx8IFwiXCJ9YCB9O1xuXHRpZiAob3B0aW9ucy5yb290U3R5bGUgIT09IGZhbHNlKSBpZiAob3B0aW9ucy5yb290U3R5bGUgIT0gbnVsbCkgcHJvcGVydGllcy5zdHlsZSA9IG9wdGlvbnMucm9vdFN0eWxlO1xuXHRlbHNlIHByb3BlcnRpZXMuc3R5bGUgPSBgYmFja2dyb3VuZC1jb2xvcjoke29wdGlvbnMuYmd9O2NvbG9yOiR7b3B0aW9ucy5mZ31gO1xuXHRpZiAodGFiaW5kZXggIT09IGZhbHNlICYmIHRhYmluZGV4ICE9IG51bGwpIHByb3BlcnRpZXMudGFiaW5kZXggPSB0YWJpbmRleC50b1N0cmluZygpO1xuXHRmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhvcHRpb25zLm1ldGEgfHwge30pKSBpZiAoIWtleS5zdGFydHNXaXRoKFwiX1wiKSkgcHJvcGVydGllc1trZXldID0gdmFsdWU7XG5cdGxldCBwcmVOb2RlID0ge1xuXHRcdHR5cGU6IFwiZWxlbWVudFwiLFxuXHRcdHRhZ05hbWU6IFwicHJlXCIsXG5cdFx0cHJvcGVydGllcyxcblx0XHRjaGlsZHJlbjogW10sXG5cdFx0ZGF0YTogb3B0aW9ucy5kYXRhXG5cdH07XG5cdGxldCBjb2RlTm9kZSA9IHtcblx0XHR0eXBlOiBcImVsZW1lbnRcIixcblx0XHR0YWdOYW1lOiBcImNvZGVcIixcblx0XHRwcm9wZXJ0aWVzOiB7fSxcblx0XHRjaGlsZHJlbjogbGluZXNcblx0fTtcblx0Y29uc3QgbGluZU5vZGVzID0gW107XG5cdGNvbnN0IGNvbnRleHQgPSB7XG5cdFx0Li4udHJhbnNmb3JtZXJDb250ZXh0LFxuXHRcdHN0cnVjdHVyZSxcblx0XHRhZGRDbGFzc1RvSGFzdCxcblx0XHRnZXQgc291cmNlKCkge1xuXHRcdFx0cmV0dXJuIHRyYW5zZm9ybWVyQ29udGV4dC5zb3VyY2U7XG5cdFx0fSxcblx0XHRnZXQgdG9rZW5zKCkge1xuXHRcdFx0cmV0dXJuIHRva2Vucztcblx0XHR9LFxuXHRcdGdldCBvcHRpb25zKCkge1xuXHRcdFx0cmV0dXJuIG9wdGlvbnM7XG5cdFx0fSxcblx0XHRnZXQgcm9vdCgpIHtcblx0XHRcdHJldHVybiByb290O1xuXHRcdH0sXG5cdFx0Z2V0IHByZSgpIHtcblx0XHRcdHJldHVybiBwcmVOb2RlO1xuXHRcdH0sXG5cdFx0Z2V0IGNvZGUoKSB7XG5cdFx0XHRyZXR1cm4gY29kZU5vZGU7XG5cdFx0fSxcblx0XHRnZXQgbGluZXMoKSB7XG5cdFx0XHRyZXR1cm4gbGluZU5vZGVzO1xuXHRcdH1cblx0fTtcblx0dG9rZW5zLmZvckVhY2goKGxpbmUsIGlkeCkgPT4ge1xuXHRcdGlmIChpZHgpIHtcblx0XHRcdGlmIChzdHJ1Y3R1cmUgPT09IFwiaW5saW5lXCIpIHJvb3QuY2hpbGRyZW4ucHVzaCh7XG5cdFx0XHRcdHR5cGU6IFwiZWxlbWVudFwiLFxuXHRcdFx0XHR0YWdOYW1lOiBcImJyXCIsXG5cdFx0XHRcdHByb3BlcnRpZXM6IHt9LFxuXHRcdFx0XHRjaGlsZHJlbjogW11cblx0XHRcdH0pO1xuXHRcdFx0ZWxzZSBpZiAoc3RydWN0dXJlID09PSBcImNsYXNzaWNcIikgbGluZXMucHVzaCh7XG5cdFx0XHRcdHR5cGU6IFwidGV4dFwiLFxuXHRcdFx0XHR2YWx1ZTogXCJcXG5cIlxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGxldCBsaW5lTm9kZSA9IHtcblx0XHRcdHR5cGU6IFwiZWxlbWVudFwiLFxuXHRcdFx0dGFnTmFtZTogXCJzcGFuXCIsXG5cdFx0XHRwcm9wZXJ0aWVzOiB7IGNsYXNzOiBcImxpbmVcIiB9LFxuXHRcdFx0Y2hpbGRyZW46IFtdXG5cdFx0fTtcblx0XHRsZXQgY29sID0gMDtcblx0XHRmb3IgKGNvbnN0IHRva2VuIG9mIGxpbmUpIHtcblx0XHRcdGxldCB0b2tlbk5vZGUgPSB7XG5cdFx0XHRcdHR5cGU6IFwiZWxlbWVudFwiLFxuXHRcdFx0XHR0YWdOYW1lOiBcInNwYW5cIixcblx0XHRcdFx0cHJvcGVydGllczogeyAuLi50b2tlbi5odG1sQXR0cnMgfSxcblx0XHRcdFx0Y2hpbGRyZW46IFt7XG5cdFx0XHRcdFx0dHlwZTogXCJ0ZXh0XCIsXG5cdFx0XHRcdFx0dmFsdWU6IHRva2VuLmNvbnRlbnRcblx0XHRcdFx0fV1cblx0XHRcdH07XG5cdFx0XHRjb25zdCBzdHlsZSA9IHN0cmluZ2lmeVRva2VuU3R5bGUodG9rZW4uaHRtbFN0eWxlIHx8IGdldFRva2VuU3R5bGVPYmplY3QodG9rZW4pKTtcblx0XHRcdGlmIChzdHlsZSkgdG9rZW5Ob2RlLnByb3BlcnRpZXMuc3R5bGUgPSBzdHlsZTtcblx0XHRcdGZvciAoY29uc3QgdHJhbnNmb3JtZXIgb2YgdHJhbnNmb3JtZXJzKSB0b2tlbk5vZGUgPSB0cmFuc2Zvcm1lcj8uc3Bhbj8uY2FsbChjb250ZXh0LCB0b2tlbk5vZGUsIGlkeCArIDEsIGNvbCwgbGluZU5vZGUsIHRva2VuKSB8fCB0b2tlbk5vZGU7XG5cdFx0XHRpZiAoc3RydWN0dXJlID09PSBcImlubGluZVwiKSByb290LmNoaWxkcmVuLnB1c2godG9rZW5Ob2RlKTtcblx0XHRcdGVsc2UgaWYgKHN0cnVjdHVyZSA9PT0gXCJjbGFzc2ljXCIpIGxpbmVOb2RlLmNoaWxkcmVuLnB1c2godG9rZW5Ob2RlKTtcblx0XHRcdGNvbCArPSB0b2tlbi5jb250ZW50Lmxlbmd0aDtcblx0XHR9XG5cdFx0aWYgKHN0cnVjdHVyZSA9PT0gXCJjbGFzc2ljXCIpIHtcblx0XHRcdGZvciAoY29uc3QgdHJhbnNmb3JtZXIgb2YgdHJhbnNmb3JtZXJzKSBsaW5lTm9kZSA9IHRyYW5zZm9ybWVyPy5saW5lPy5jYWxsKGNvbnRleHQsIGxpbmVOb2RlLCBpZHggKyAxKSB8fCBsaW5lTm9kZTtcblx0XHRcdGxpbmVOb2Rlcy5wdXNoKGxpbmVOb2RlKTtcblx0XHRcdGxpbmVzLnB1c2gobGluZU5vZGUpO1xuXHRcdH0gZWxzZSBpZiAoc3RydWN0dXJlID09PSBcImlubGluZVwiKSBsaW5lTm9kZXMucHVzaChsaW5lTm9kZSk7XG5cdH0pO1xuXHRpZiAoc3RydWN0dXJlID09PSBcImNsYXNzaWNcIikge1xuXHRcdGZvciAoY29uc3QgdHJhbnNmb3JtZXIgb2YgdHJhbnNmb3JtZXJzKSBjb2RlTm9kZSA9IHRyYW5zZm9ybWVyPy5jb2RlPy5jYWxsKGNvbnRleHQsIGNvZGVOb2RlKSB8fCBjb2RlTm9kZTtcblx0XHRwcmVOb2RlLmNoaWxkcmVuLnB1c2goY29kZU5vZGUpO1xuXHRcdGZvciAoY29uc3QgdHJhbnNmb3JtZXIgb2YgdHJhbnNmb3JtZXJzKSBwcmVOb2RlID0gdHJhbnNmb3JtZXI/LnByZT8uY2FsbChjb250ZXh0LCBwcmVOb2RlKSB8fCBwcmVOb2RlO1xuXHRcdHJvb3QuY2hpbGRyZW4ucHVzaChwcmVOb2RlKTtcblx0fSBlbHNlIGlmIChzdHJ1Y3R1cmUgPT09IFwiaW5saW5lXCIpIHtcblx0XHRjb25zdCBzeW50aGV0aWNMaW5lcyA9IFtdO1xuXHRcdGxldCBjdXJyZW50TGluZSA9IHtcblx0XHRcdHR5cGU6IFwiZWxlbWVudFwiLFxuXHRcdFx0dGFnTmFtZTogXCJzcGFuXCIsXG5cdFx0XHRwcm9wZXJ0aWVzOiB7IGNsYXNzOiBcImxpbmVcIiB9LFxuXHRcdFx0Y2hpbGRyZW46IFtdXG5cdFx0fTtcblx0XHRmb3IgKGNvbnN0IGNoaWxkIG9mIHJvb3QuY2hpbGRyZW4pIGlmIChjaGlsZC50eXBlID09PSBcImVsZW1lbnRcIiAmJiBjaGlsZC50YWdOYW1lID09PSBcImJyXCIpIHtcblx0XHRcdHN5bnRoZXRpY0xpbmVzLnB1c2goY3VycmVudExpbmUpO1xuXHRcdFx0Y3VycmVudExpbmUgPSB7XG5cdFx0XHRcdHR5cGU6IFwiZWxlbWVudFwiLFxuXHRcdFx0XHR0YWdOYW1lOiBcInNwYW5cIixcblx0XHRcdFx0cHJvcGVydGllczogeyBjbGFzczogXCJsaW5lXCIgfSxcblx0XHRcdFx0Y2hpbGRyZW46IFtdXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSBpZiAoY2hpbGQudHlwZSA9PT0gXCJlbGVtZW50XCIgfHwgY2hpbGQudHlwZSA9PT0gXCJ0ZXh0XCIpIGN1cnJlbnRMaW5lLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuXHRcdHN5bnRoZXRpY0xpbmVzLnB1c2goY3VycmVudExpbmUpO1xuXHRcdGxldCB0cmFuc2Zvcm1lZENvZGUgPSB7XG5cdFx0XHR0eXBlOiBcImVsZW1lbnRcIixcblx0XHRcdHRhZ05hbWU6IFwiY29kZVwiLFxuXHRcdFx0cHJvcGVydGllczoge30sXG5cdFx0XHRjaGlsZHJlbjogc3ludGhldGljTGluZXNcblx0XHR9O1xuXHRcdGZvciAoY29uc3QgdHJhbnNmb3JtZXIgb2YgdHJhbnNmb3JtZXJzKSB0cmFuc2Zvcm1lZENvZGUgPSB0cmFuc2Zvcm1lcj8uY29kZT8uY2FsbChjb250ZXh0LCB0cmFuc2Zvcm1lZENvZGUpIHx8IHRyYW5zZm9ybWVkQ29kZTtcblx0XHRyb290LmNoaWxkcmVuID0gW107XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0cmFuc2Zvcm1lZENvZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChpID4gMCkgcm9vdC5jaGlsZHJlbi5wdXNoKHtcblx0XHRcdFx0dHlwZTogXCJlbGVtZW50XCIsXG5cdFx0XHRcdHRhZ05hbWU6IFwiYnJcIixcblx0XHRcdFx0cHJvcGVydGllczoge30sXG5cdFx0XHRcdGNoaWxkcmVuOiBbXVxuXHRcdFx0fSk7XG5cdFx0XHRjb25zdCBsaW5lID0gdHJhbnNmb3JtZWRDb2RlLmNoaWxkcmVuW2ldO1xuXHRcdFx0aWYgKGxpbmUudHlwZSA9PT0gXCJlbGVtZW50XCIpIHJvb3QuY2hpbGRyZW4ucHVzaCguLi5saW5lLmNoaWxkcmVuKTtcblx0XHR9XG5cdH1cblx0bGV0IHJlc3VsdCA9IHJvb3Q7XG5cdGZvciAoY29uc3QgdHJhbnNmb3JtZXIgb2YgdHJhbnNmb3JtZXJzKSByZXN1bHQgPSB0cmFuc2Zvcm1lcj8ucm9vdD8uY2FsbChjb250ZXh0LCByZXN1bHQpIHx8IHJlc3VsdDtcblx0aWYgKGdyYW1tYXJTdGF0ZSkgc2V0TGFzdEdyYW1tYXJTdGF0ZVRvTWFwKHJlc3VsdCwgZ3JhbW1hclN0YXRlKTtcblx0cmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1lcmdlV2hpdGVzcGFjZVRva2Vucyh0b2tlbnMpIHtcblx0cmV0dXJuIHRva2Vucy5tYXAoKGxpbmUpID0+IHtcblx0XHRjb25zdCBuZXdMaW5lID0gW107XG5cdFx0bGV0IGNhcnJ5T25Db250ZW50ID0gXCJcIjtcblx0XHRsZXQgZmlyc3RPZmZzZXQ7XG5cdFx0bGluZS5mb3JFYWNoKCh0b2tlbiwgaWR4KSA9PiB7XG5cdFx0XHRjb25zdCBjb3VsZE1lcmdlID0gISh0b2tlbi5mb250U3R5bGUgJiYgKHRva2VuLmZvbnRTdHlsZSAmIEZvbnRTdHlsZS5VbmRlcmxpbmUgfHwgdG9rZW4uZm9udFN0eWxlICYgRm9udFN0eWxlLlN0cmlrZXRocm91Z2gpKTtcblx0XHRcdGlmIChjb3VsZE1lcmdlICYmIFJFX1dISVRFU1BBQ0VfT05MWS50ZXN0KHRva2VuLmNvbnRlbnQpICYmIGxpbmVbaWR4ICsgMV0pIHtcblx0XHRcdFx0aWYgKGZpcnN0T2Zmc2V0ID09PSB2b2lkIDApIGZpcnN0T2Zmc2V0ID0gdG9rZW4ub2Zmc2V0O1xuXHRcdFx0XHRjYXJyeU9uQ29udGVudCArPSB0b2tlbi5jb250ZW50O1xuXHRcdFx0fSBlbHNlIGlmIChjYXJyeU9uQ29udGVudCkge1xuXHRcdFx0XHRpZiAoY291bGRNZXJnZSkgbmV3TGluZS5wdXNoKHtcblx0XHRcdFx0XHQuLi50b2tlbixcblx0XHRcdFx0XHRvZmZzZXQ6IGZpcnN0T2Zmc2V0LFxuXHRcdFx0XHRcdGNvbnRlbnQ6IGNhcnJ5T25Db250ZW50ICsgdG9rZW4uY29udGVudFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0ZWxzZSBuZXdMaW5lLnB1c2goe1xuXHRcdFx0XHRcdGNvbnRlbnQ6IGNhcnJ5T25Db250ZW50LFxuXHRcdFx0XHRcdG9mZnNldDogZmlyc3RPZmZzZXRcblx0XHRcdFx0fSwgdG9rZW4pO1xuXHRcdFx0XHRmaXJzdE9mZnNldCA9IHZvaWQgMDtcblx0XHRcdFx0Y2FycnlPbkNvbnRlbnQgPSBcIlwiO1xuXHRcdFx0fSBlbHNlIG5ld0xpbmUucHVzaCh0b2tlbik7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIG5ld0xpbmU7XG5cdH0pO1xufVxuZnVuY3Rpb24gc3BsaXRXaGl0ZXNwYWNlVG9rZW5zKHRva2Vucykge1xuXHRyZXR1cm4gdG9rZW5zLm1hcCgobGluZSkgPT4ge1xuXHRcdHJldHVybiBsaW5lLmZsYXRNYXAoKHRva2VuKSA9PiB7XG5cdFx0XHRpZiAoUkVfV0hJVEVTUEFDRV9PTkxZLnRlc3QodG9rZW4uY29udGVudCkpIHJldHVybiB0b2tlbjtcblx0XHRcdGNvbnN0IG1hdGNoID0gdG9rZW4uY29udGVudC5tYXRjaChSRV9MRUFESU5HX1RSQUlMSU5HX1dISVRFU1BBQ0UpO1xuXHRcdFx0aWYgKCFtYXRjaCkgcmV0dXJuIHRva2VuO1xuXHRcdFx0Y29uc3QgWywgbGVhZGluZywgY29udGVudCwgdHJhaWxpbmddID0gbWF0Y2g7XG5cdFx0XHRpZiAoIWxlYWRpbmcgJiYgIXRyYWlsaW5nKSByZXR1cm4gdG9rZW47XG5cdFx0XHRjb25zdCBleHBhbmRlZCA9IFt7XG5cdFx0XHRcdC4uLnRva2VuLFxuXHRcdFx0XHRvZmZzZXQ6IHRva2VuLm9mZnNldCArIGxlYWRpbmcubGVuZ3RoLFxuXHRcdFx0XHRjb250ZW50XG5cdFx0XHR9XTtcblx0XHRcdGlmIChsZWFkaW5nKSBleHBhbmRlZC51bnNoaWZ0KHtcblx0XHRcdFx0Y29udGVudDogbGVhZGluZyxcblx0XHRcdFx0b2Zmc2V0OiB0b2tlbi5vZmZzZXRcblx0XHRcdH0pO1xuXHRcdFx0aWYgKHRyYWlsaW5nKSBleHBhbmRlZC5wdXNoKHtcblx0XHRcdFx0Y29udGVudDogdHJhaWxpbmcsXG5cdFx0XHRcdG9mZnNldDogdG9rZW4ub2Zmc2V0ICsgbGVhZGluZy5sZW5ndGggKyBjb250ZW50Lmxlbmd0aFxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gZXhwYW5kZWQ7XG5cdFx0fSk7XG5cdH0pO1xufVxuZnVuY3Rpb24gbWVyZ2VBZGphY2VudFN0eWxlZFRva2Vucyh0b2tlbnMpIHtcblx0cmV0dXJuIHRva2Vucy5tYXAoKGxpbmUpID0+IHtcblx0XHRjb25zdCBuZXdMaW5lID0gW107XG5cdFx0Zm9yIChjb25zdCB0b2tlbiBvZiBsaW5lKSB7XG5cdFx0XHRpZiAobmV3TGluZS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0bmV3TGluZS5wdXNoKHsgLi4udG9rZW4gfSk7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgcHJldlRva2VuID0gbmV3TGluZS5hdCgtMSk7XG5cdFx0XHRjb25zdCBwcmV2U3R5bGUgPSBzdHJpbmdpZnlUb2tlblN0eWxlKHByZXZUb2tlbi5odG1sU3R5bGUgfHwgZ2V0VG9rZW5TdHlsZU9iamVjdChwcmV2VG9rZW4pKTtcblx0XHRcdGNvbnN0IGN1cnJlbnRTdHlsZSA9IHN0cmluZ2lmeVRva2VuU3R5bGUodG9rZW4uaHRtbFN0eWxlIHx8IGdldFRva2VuU3R5bGVPYmplY3QodG9rZW4pKTtcblx0XHRcdGNvbnN0IGlzUHJldkRlY29yYXRlZCA9IHByZXZUb2tlbi5mb250U3R5bGUgJiYgKHByZXZUb2tlbi5mb250U3R5bGUgJiBGb250U3R5bGUuVW5kZXJsaW5lIHx8IHByZXZUb2tlbi5mb250U3R5bGUgJiBGb250U3R5bGUuU3RyaWtldGhyb3VnaCk7XG5cdFx0XHRjb25zdCBpc0RlY29yYXRlZCA9IHRva2VuLmZvbnRTdHlsZSAmJiAodG9rZW4uZm9udFN0eWxlICYgRm9udFN0eWxlLlVuZGVybGluZSB8fCB0b2tlbi5mb250U3R5bGUgJiBGb250U3R5bGUuU3RyaWtldGhyb3VnaCk7XG5cdFx0XHRpZiAoIWlzUHJldkRlY29yYXRlZCAmJiAhaXNEZWNvcmF0ZWQgJiYgcHJldlN0eWxlID09PSBjdXJyZW50U3R5bGUpIHByZXZUb2tlbi5jb250ZW50ICs9IHRva2VuLmNvbnRlbnQ7XG5cdFx0XHRlbHNlIG5ld0xpbmUucHVzaCh7IC4uLnRva2VuIH0pO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3TGluZTtcblx0fSk7XG59XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvaGlnaGxpZ2h0L2NvZGUtdG8taHRtbC50c1xuY29uc3QgaGFzdFRvSHRtbCA9IHRvSHRtbDtcbi8qKlxuKiBHZXQgaGlnaGxpZ2h0ZWQgY29kZSBpbiBIVE1MLlxuKi9cbmZ1bmN0aW9uIGNvZGVUb0h0bWwocHJpbWl0aXZlLCBjb2RlLCBvcHRpb25zKSB7XG5cdGNvbnN0IGNvbnRleHQgPSB7XG5cdFx0bWV0YToge30sXG5cdFx0b3B0aW9ucyxcblx0XHRjb2RlVG9IYXN0OiAoX2NvZGUsIF9vcHRpb25zKSA9PiBjb2RlVG9IYXN0KHByaW1pdGl2ZSwgX2NvZGUsIF9vcHRpb25zKSxcblx0XHRjb2RlVG9Ub2tlbnM6IChfY29kZSwgX29wdGlvbnMpID0+IGNvZGVUb1Rva2VucyhwcmltaXRpdmUsIF9jb2RlLCBfb3B0aW9ucylcblx0fTtcblx0bGV0IHJlc3VsdCA9IGhhc3RUb0h0bWwoY29kZVRvSGFzdChwcmltaXRpdmUsIGNvZGUsIG9wdGlvbnMsIGNvbnRleHQpKTtcblx0Zm9yIChjb25zdCB0cmFuc2Zvcm1lciBvZiBnZXRUcmFuc2Zvcm1lcnMob3B0aW9ucykpIHJlc3VsdCA9IHRyYW5zZm9ybWVyLnBvc3Rwcm9jZXNzPy5jYWxsKGNvbnRleHQsIHJlc3VsdCwgb3B0aW9ucykgfHwgcmVzdWx0O1xuXHRyZXR1cm4gcmVzdWx0O1xufVxuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gc3JjL2NvbnN0cnVjdG9ycy9oaWdobGlnaHRlci50c1xuLyoqXG4qIENyZWF0ZSBhIFNoaWtpIGNvcmUgaGlnaGxpZ2h0ZXIgaW5zdGFuY2UsIHdpdGggbm8gbGFuZ3VhZ2VzIG9yIHRoZW1lcyBidW5kbGVkLlxuKiBXYXNtIGFuZCBlYWNoIGxhbmd1YWdlIGFuZCB0aGVtZSBtdXN0IGJlIGxvYWRlZCBtYW51YWxseS5cbipcbiogQHNlZSBodHRwOi8vc2hpa2kuc3R5bGUvZ3VpZGUvYnVuZGxlcyNmaW5lLWdyYWluZWQtYnVuZGxlXG4qL1xuYXN5bmMgZnVuY3Rpb24gY3JlYXRlSGlnaGxpZ2h0ZXJDb3JlKG9wdGlvbnMpIHtcblx0Y29uc3QgcHJpbWl0aXZlID0gYXdhaXQgY3JlYXRlU2hpa2lQcmltaXRpdmVBc3luYyQxKG9wdGlvbnMpO1xuXHRyZXR1cm4ge1xuXHRcdGdldExhc3RHcmFtbWFyU3RhdGU6ICguLi5hcmdzKSA9PiBnZXRMYXN0R3JhbW1hclN0YXRlKHByaW1pdGl2ZSwgLi4uYXJncyksXG5cdFx0Y29kZVRvVG9rZW5zQmFzZTogKGNvZGUsIG9wdGlvbnMpID0+IGNvZGVUb1Rva2Vuc0Jhc2UocHJpbWl0aXZlLCBjb2RlLCBvcHRpb25zKSxcblx0XHRjb2RlVG9Ub2tlbnNXaXRoVGhlbWVzOiAoY29kZSwgb3B0aW9ucykgPT4gY29kZVRvVG9rZW5zV2l0aFRoZW1lcyQxKHByaW1pdGl2ZSwgY29kZSwgb3B0aW9ucyksXG5cdFx0Y29kZVRvVG9rZW5zOiAoY29kZSwgb3B0aW9ucykgPT4gY29kZVRvVG9rZW5zKHByaW1pdGl2ZSwgY29kZSwgb3B0aW9ucyksXG5cdFx0Y29kZVRvSGFzdDogKGNvZGUsIG9wdGlvbnMpID0+IGNvZGVUb0hhc3QocHJpbWl0aXZlLCBjb2RlLCBvcHRpb25zKSxcblx0XHRjb2RlVG9IdG1sOiAoY29kZSwgb3B0aW9ucykgPT4gY29kZVRvSHRtbChwcmltaXRpdmUsIGNvZGUsIG9wdGlvbnMpLFxuXHRcdGdldEJ1bmRsZWRMYW5ndWFnZXM6ICgpID0+ICh7fSksXG5cdFx0Z2V0QnVuZGxlZFRoZW1lczogKCkgPT4gKHt9KSxcblx0XHQuLi5wcmltaXRpdmUsXG5cdFx0Z2V0SW50ZXJuYWxDb250ZXh0OiAoKSA9PiBwcmltaXRpdmVcblx0fTtcbn1cbi8qKlxuKiBDcmVhdGUgYSBTaGlraSBjb3JlIGhpZ2hsaWdodGVyIGluc3RhbmNlLCB3aXRoIG5vIGxhbmd1YWdlcyBvciB0aGVtZXMgYnVuZGxlZC5cbiogV2FzbSBhbmQgZWFjaCBsYW5ndWFnZSBhbmQgdGhlbWUgbXVzdCBiZSBsb2FkZWQgbWFudWFsbHkuXG4qXG4qIFN5bmNocm9ub3VzIHZlcnNpb24gb2YgYGNyZWF0ZUhpZ2hsaWdodGVyQ29yZWAsIHdoaWNoIHJlcXVpcmVzIHRvIHByb3ZpZGUgdGhlIGVuZ2luZSBhbmQgYWxsIHRoZW1lcyBhbmQgbGFuZ3VhZ2VzIHVwZnJvbnQuXG4qXG4qIEBzZWUgaHR0cDovL3NoaWtpLnN0eWxlL2d1aWRlL2J1bmRsZXMjZmluZS1ncmFpbmVkLWJ1bmRsZVxuKi9cbmZ1bmN0aW9uIGNyZWF0ZUhpZ2hsaWdodGVyQ29yZVN5bmMob3B0aW9ucykge1xuXHRjb25zdCBpbnRlcm5hbCA9IGNyZWF0ZVNoaWtpUHJpbWl0aXZlJDEob3B0aW9ucyk7XG5cdHJldHVybiB7XG5cdFx0Z2V0TGFzdEdyYW1tYXJTdGF0ZTogKC4uLmFyZ3MpID0+IGdldExhc3RHcmFtbWFyU3RhdGUoaW50ZXJuYWwsIC4uLmFyZ3MpLFxuXHRcdGNvZGVUb1Rva2Vuc0Jhc2U6IChjb2RlLCBvcHRpb25zKSA9PiBjb2RlVG9Ub2tlbnNCYXNlKGludGVybmFsLCBjb2RlLCBvcHRpb25zKSxcblx0XHRjb2RlVG9Ub2tlbnNXaXRoVGhlbWVzOiAoY29kZSwgb3B0aW9ucykgPT4gY29kZVRvVG9rZW5zV2l0aFRoZW1lcyQxKGludGVybmFsLCBjb2RlLCBvcHRpb25zKSxcblx0XHRjb2RlVG9Ub2tlbnM6IChjb2RlLCBvcHRpb25zKSA9PiBjb2RlVG9Ub2tlbnMoaW50ZXJuYWwsIGNvZGUsIG9wdGlvbnMpLFxuXHRcdGNvZGVUb0hhc3Q6IChjb2RlLCBvcHRpb25zKSA9PiBjb2RlVG9IYXN0KGludGVybmFsLCBjb2RlLCBvcHRpb25zKSxcblx0XHRjb2RlVG9IdG1sOiAoY29kZSwgb3B0aW9ucykgPT4gY29kZVRvSHRtbChpbnRlcm5hbCwgY29kZSwgb3B0aW9ucyksXG5cdFx0Z2V0QnVuZGxlZExhbmd1YWdlczogKCkgPT4gKHt9KSxcblx0XHRnZXRCdW5kbGVkVGhlbWVzOiAoKSA9PiAoe30pLFxuXHRcdC4uLmludGVybmFsLFxuXHRcdGdldEludGVybmFsQ29udGV4dDogKCkgPT4gaW50ZXJuYWxcblx0fTtcbn1cbmZ1bmN0aW9uIG1ha2VTaW5nbGV0b25IaWdobGlnaHRlckNvcmUoY3JlYXRlSGlnaGxpZ2h0ZXIpIHtcblx0bGV0IF9zaGlraTtcblx0YXN5bmMgZnVuY3Rpb24gZ2V0U2luZ2xldG9uSGlnaGxpZ2h0ZXJDb3JlKG9wdGlvbnMpIHtcblx0XHRpZiAoIV9zaGlraSkge1xuXHRcdFx0X3NoaWtpID0gY3JlYXRlSGlnaGxpZ2h0ZXIoe1xuXHRcdFx0XHQuLi5vcHRpb25zLFxuXHRcdFx0XHR0aGVtZXM6IG9wdGlvbnMudGhlbWVzIHx8IFtdLFxuXHRcdFx0XHRsYW5nczogb3B0aW9ucy5sYW5ncyB8fCBbXVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gX3NoaWtpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBzID0gYXdhaXQgX3NoaWtpO1xuXHRcdFx0YXdhaXQgUHJvbWlzZS5hbGwoW3MubG9hZFRoZW1lKC4uLm9wdGlvbnMudGhlbWVzIHx8IFtdKSwgcy5sb2FkTGFuZ3VhZ2UoLi4ub3B0aW9ucy5sYW5ncyB8fCBbXSldKTtcblx0XHRcdHJldHVybiBzO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZ2V0U2luZ2xldG9uSGlnaGxpZ2h0ZXJDb3JlO1xufVxuY29uc3QgZ2V0U2luZ2xldG9uSGlnaGxpZ2h0ZXJDb3JlID0gLyogQF9fUFVSRV9fICovIG1ha2VTaW5nbGV0b25IaWdobGlnaHRlckNvcmUoY3JlYXRlSGlnaGxpZ2h0ZXJDb3JlKTtcbi8vI2VuZHJlZ2lvblxuLy8jcmVnaW9uIHNyYy9jb25zdHJ1Y3RvcnMvYnVuZGxlLWZhY3RvcnkudHNcbmZ1bmN0aW9uIGNyZWF0ZUJ1bmRsZWRIaWdobGlnaHRlcihvcHRpb25zKSB7XG5cdGNvbnN0IGJ1bmRsZWRMYW5ndWFnZXMgPSBvcHRpb25zLmxhbmdzO1xuXHRjb25zdCBidW5kbGVkVGhlbWVzID0gb3B0aW9ucy50aGVtZXM7XG5cdGNvbnN0IGVuZ2luZSA9IG9wdGlvbnMuZW5naW5lO1xuXHRhc3luYyBmdW5jdGlvbiBjcmVhdGVIaWdobGlnaHRlcihvcHRpb25zKSB7XG5cdFx0ZnVuY3Rpb24gcmVzb2x2ZUxhbmcobGFuZykge1xuXHRcdFx0aWYgKHR5cGVvZiBsYW5nID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdGxhbmcgPSBvcHRpb25zLmxhbmdBbGlhcz8uW2xhbmddIHx8IGxhbmc7XG5cdFx0XHRcdGlmIChpc1NwZWNpYWxMYW5nKGxhbmcpKSByZXR1cm4gW107XG5cdFx0XHRcdGNvbnN0IGJ1bmRsZSA9IGJ1bmRsZWRMYW5ndWFnZXNbbGFuZ107XG5cdFx0XHRcdGlmICghYnVuZGxlKSB0aHJvdyBuZXcgU2hpa2lFcnJvciQxKGBMYW5ndWFnZSBcXGAke2xhbmd9XFxgIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGlzIGJ1bmRsZS4gWW91IG1heSB3YW50IHRvIGxvYWQgaXQgZnJvbSBleHRlcm5hbCBzb3VyY2UuYCk7XG5cdFx0XHRcdHJldHVybiBidW5kbGU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbGFuZztcblx0XHR9XG5cdFx0ZnVuY3Rpb24gcmVzb2x2ZVRoZW1lKHRoZW1lKSB7XG5cdFx0XHRpZiAoaXNTcGVjaWFsVGhlbWUodGhlbWUpKSByZXR1cm4gXCJub25lXCI7XG5cdFx0XHRpZiAodHlwZW9mIHRoZW1lID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdGNvbnN0IGJ1bmRsZSA9IGJ1bmRsZWRUaGVtZXNbdGhlbWVdO1xuXHRcdFx0XHRpZiAoIWJ1bmRsZSkgdGhyb3cgbmV3IFNoaWtpRXJyb3IkMShgVGhlbWUgXFxgJHt0aGVtZX1cXGAgaXMgbm90IGluY2x1ZGVkIGluIHRoaXMgYnVuZGxlLiBZb3UgbWF5IHdhbnQgdG8gbG9hZCBpdCBmcm9tIGV4dGVybmFsIHNvdXJjZS5gKTtcblx0XHRcdFx0cmV0dXJuIGJ1bmRsZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGVtZTtcblx0XHR9XG5cdFx0Y29uc3QgX3RoZW1lcyA9IChvcHRpb25zLnRoZW1lcyA/PyBbXSkubWFwKChpKSA9PiByZXNvbHZlVGhlbWUoaSkpO1xuXHRcdGNvbnN0IGxhbmdzID0gKG9wdGlvbnMubGFuZ3MgPz8gW10pLm1hcCgoaSkgPT4gcmVzb2x2ZUxhbmcoaSkpO1xuXHRcdGNvbnN0IGNvcmUgPSBhd2FpdCBjcmVhdGVIaWdobGlnaHRlckNvcmUoe1xuXHRcdFx0ZW5naW5lOiBvcHRpb25zLmVuZ2luZSA/PyBlbmdpbmUoKSxcblx0XHRcdC4uLm9wdGlvbnMsXG5cdFx0XHR0aGVtZXM6IF90aGVtZXMsXG5cdFx0XHRsYW5nc1xuXHRcdH0pO1xuXHRcdHJldHVybiB7XG5cdFx0XHQuLi5jb3JlLFxuXHRcdFx0bG9hZExhbmd1YWdlKC4uLmxhbmdzKSB7XG5cdFx0XHRcdHJldHVybiBjb3JlLmxvYWRMYW5ndWFnZSguLi5sYW5ncy5tYXAocmVzb2x2ZUxhbmcpKTtcblx0XHRcdH0sXG5cdFx0XHRsb2FkVGhlbWUoLi4udGhlbWVzKSB7XG5cdFx0XHRcdHJldHVybiBjb3JlLmxvYWRUaGVtZSguLi50aGVtZXMubWFwKHJlc29sdmVUaGVtZSkpO1xuXHRcdFx0fSxcblx0XHRcdGdldEJ1bmRsZWRMYW5ndWFnZXMoKSB7XG5cdFx0XHRcdHJldHVybiBidW5kbGVkTGFuZ3VhZ2VzO1xuXHRcdFx0fSxcblx0XHRcdGdldEJ1bmRsZWRUaGVtZXMoKSB7XG5cdFx0XHRcdHJldHVybiBidW5kbGVkVGhlbWVzO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cblx0cmV0dXJuIGNyZWF0ZUhpZ2hsaWdodGVyO1xufVxuZnVuY3Rpb24gbWFrZVNpbmdsZXRvbkhpZ2hsaWdodGVyKGNyZWF0ZUhpZ2hsaWdodGVyKSB7XG5cdGxldCBfc2hpa2k7XG5cdGFzeW5jIGZ1bmN0aW9uIGdldFNpbmdsZXRvbkhpZ2hsaWdodGVyKG9wdGlvbnMgPSB7fSkge1xuXHRcdGlmICghX3NoaWtpKSB7XG5cdFx0XHRfc2hpa2kgPSBjcmVhdGVIaWdobGlnaHRlcih7XG5cdFx0XHRcdC4uLm9wdGlvbnMsXG5cdFx0XHRcdHRoZW1lczogW10sXG5cdFx0XHRcdGxhbmdzOiBbXVxuXHRcdFx0fSk7XG5cdFx0XHRjb25zdCBzID0gYXdhaXQgX3NoaWtpO1xuXHRcdFx0YXdhaXQgUHJvbWlzZS5hbGwoW3MubG9hZFRoZW1lKC4uLm9wdGlvbnMudGhlbWVzIHx8IFtdKSwgcy5sb2FkTGFuZ3VhZ2UoLi4ub3B0aW9ucy5sYW5ncyB8fCBbXSldKTtcblx0XHRcdHJldHVybiBzO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBzID0gYXdhaXQgX3NoaWtpO1xuXHRcdFx0YXdhaXQgUHJvbWlzZS5hbGwoW3MubG9hZFRoZW1lKC4uLm9wdGlvbnMudGhlbWVzIHx8IFtdKSwgcy5sb2FkTGFuZ3VhZ2UoLi4ub3B0aW9ucy5sYW5ncyB8fCBbXSldKTtcblx0XHRcdHJldHVybiBzO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZ2V0U2luZ2xldG9uSGlnaGxpZ2h0ZXI7XG59XG5mdW5jdGlvbiBjcmVhdGVTaW5nbGV0b25TaG9ydGhhbmRzKGNyZWF0ZUhpZ2hsaWdodGVyLCBjb25maWcpIHtcblx0Y29uc3QgZ2V0U2luZ2xldG9uSGlnaGxpZ2h0ZXIgPSBtYWtlU2luZ2xldG9uSGlnaGxpZ2h0ZXIoY3JlYXRlSGlnaGxpZ2h0ZXIpO1xuXHRhc3luYyBmdW5jdGlvbiBnZXQoY29kZSwgb3B0aW9ucykge1xuXHRcdGNvbnN0IHNoaWtpID0gYXdhaXQgZ2V0U2luZ2xldG9uSGlnaGxpZ2h0ZXIoe1xuXHRcdFx0bGFuZ3M6IFtvcHRpb25zLmxhbmddLFxuXHRcdFx0dGhlbWVzOiBcInRoZW1lXCIgaW4gb3B0aW9ucyA/IFtvcHRpb25zLnRoZW1lXSA6IE9iamVjdC52YWx1ZXMob3B0aW9ucy50aGVtZXMpXG5cdFx0fSk7XG5cdFx0Y29uc3QgbGFuZ3MgPSBhd2FpdCBjb25maWc/Lmd1ZXNzRW1iZWRkZWRMYW5ndWFnZXM/Lihjb2RlLCBvcHRpb25zLmxhbmcsIHNoaWtpKTtcblx0XHRpZiAobGFuZ3MpIGF3YWl0IHNoaWtpLmxvYWRMYW5ndWFnZSguLi5sYW5ncyk7XG5cdFx0cmV0dXJuIHNoaWtpO1xuXHR9XG5cdHJldHVybiB7XG5cdFx0Z2V0U2luZ2xldG9uSGlnaGxpZ2h0ZXIob3B0aW9ucykge1xuXHRcdFx0cmV0dXJuIGdldFNpbmdsZXRvbkhpZ2hsaWdodGVyKG9wdGlvbnMpO1xuXHRcdH0sXG5cdFx0YXN5bmMgY29kZVRvSHRtbChjb2RlLCBvcHRpb25zKSB7XG5cdFx0XHRyZXR1cm4gKGF3YWl0IGdldChjb2RlLCBvcHRpb25zKSkuY29kZVRvSHRtbChjb2RlLCBvcHRpb25zKTtcblx0XHR9LFxuXHRcdGFzeW5jIGNvZGVUb0hhc3QoY29kZSwgb3B0aW9ucykge1xuXHRcdFx0cmV0dXJuIChhd2FpdCBnZXQoY29kZSwgb3B0aW9ucykpLmNvZGVUb0hhc3QoY29kZSwgb3B0aW9ucyk7XG5cdFx0fSxcblx0XHRhc3luYyBjb2RlVG9Ub2tlbnMoY29kZSwgb3B0aW9ucykge1xuXHRcdFx0cmV0dXJuIChhd2FpdCBnZXQoY29kZSwgb3B0aW9ucykpLmNvZGVUb1Rva2Vucyhjb2RlLCBvcHRpb25zKTtcblx0XHR9LFxuXHRcdGFzeW5jIGNvZGVUb1Rva2Vuc0Jhc2UoY29kZSwgb3B0aW9ucykge1xuXHRcdFx0cmV0dXJuIChhd2FpdCBnZXQoY29kZSwgb3B0aW9ucykpLmNvZGVUb1Rva2Vuc0Jhc2UoY29kZSwgb3B0aW9ucyk7XG5cdFx0fSxcblx0XHRhc3luYyBjb2RlVG9Ub2tlbnNXaXRoVGhlbWVzKGNvZGUsIG9wdGlvbnMpIHtcblx0XHRcdHJldHVybiAoYXdhaXQgZ2V0KGNvZGUsIG9wdGlvbnMpKS5jb2RlVG9Ub2tlbnNXaXRoVGhlbWVzKGNvZGUsIG9wdGlvbnMpO1xuXHRcdH0sXG5cdFx0YXN5bmMgZ2V0TGFzdEdyYW1tYXJTdGF0ZShjb2RlLCBvcHRpb25zKSB7XG5cdFx0XHRyZXR1cm4gKGF3YWl0IGdldFNpbmdsZXRvbkhpZ2hsaWdodGVyKHtcblx0XHRcdFx0bGFuZ3M6IFtvcHRpb25zLmxhbmddLFxuXHRcdFx0XHR0aGVtZXM6IFtvcHRpb25zLnRoZW1lXVxuXHRcdFx0fSkpLmdldExhc3RHcmFtbWFyU3RhdGUoY29kZSwgb3B0aW9ucyk7XG5cdFx0fVxuXHR9O1xufVxuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gc3JjL3RoZW1lLWNzcy12YXJpYWJsZXMudHNcbi8qKlxuKiBBIGZhY3RvcnkgZnVuY3Rpb24gdG8gY3JlYXRlIGEgY3NzLXZhcmlhYmxlLWJhc2VkIHRoZW1lXG4qXG4qIEBzZWUgaHR0cHM6Ly9zaGlraS5zdHlsZS9ndWlkZS90aGVtZS1jb2xvcnMjY3NzLXZhcmlhYmxlcy10aGVtZVxuKi9cbmZ1bmN0aW9uIGNyZWF0ZUNzc1ZhcmlhYmxlc1RoZW1lKG9wdGlvbnMgPSB7fSkge1xuXHRjb25zdCB7IG5hbWUgPSBcImNzcy12YXJpYWJsZXNcIiwgdmFyaWFibGVQcmVmaXggPSBcIi0tc2hpa2ktXCIsIGZvbnRTdHlsZSA9IHRydWUgfSA9IG9wdGlvbnM7XG5cdGNvbnN0IHZhcmlhYmxlID0gKG5hbWUpID0+IHtcblx0XHRpZiAob3B0aW9ucy52YXJpYWJsZURlZmF1bHRzPy5bbmFtZV0pIHJldHVybiBgdmFyKCR7dmFyaWFibGVQcmVmaXh9JHtuYW1lfSwgJHtvcHRpb25zLnZhcmlhYmxlRGVmYXVsdHNbbmFtZV19KWA7XG5cdFx0cmV0dXJuIGB2YXIoJHt2YXJpYWJsZVByZWZpeH0ke25hbWV9KWA7XG5cdH07XG5cdGNvbnN0IHRoZW1lID0ge1xuXHRcdG5hbWUsXG5cdFx0dHlwZTogXCJkYXJrXCIsXG5cdFx0Y29sb3JzOiB7XG5cdFx0XHRcImVkaXRvci5mb3JlZ3JvdW5kXCI6IHZhcmlhYmxlKFwiZm9yZWdyb3VuZFwiKSxcblx0XHRcdFwiZWRpdG9yLmJhY2tncm91bmRcIjogdmFyaWFibGUoXCJiYWNrZ3JvdW5kXCIpLFxuXHRcdFx0XCJ0ZXJtaW5hbC5hbnNpQmxhY2tcIjogdmFyaWFibGUoXCJhbnNpLWJsYWNrXCIpLFxuXHRcdFx0XCJ0ZXJtaW5hbC5hbnNpUmVkXCI6IHZhcmlhYmxlKFwiYW5zaS1yZWRcIiksXG5cdFx0XHRcInRlcm1pbmFsLmFuc2lHcmVlblwiOiB2YXJpYWJsZShcImFuc2ktZ3JlZW5cIiksXG5cdFx0XHRcInRlcm1pbmFsLmFuc2lZZWxsb3dcIjogdmFyaWFibGUoXCJhbnNpLXllbGxvd1wiKSxcblx0XHRcdFwidGVybWluYWwuYW5zaUJsdWVcIjogdmFyaWFibGUoXCJhbnNpLWJsdWVcIiksXG5cdFx0XHRcInRlcm1pbmFsLmFuc2lNYWdlbnRhXCI6IHZhcmlhYmxlKFwiYW5zaS1tYWdlbnRhXCIpLFxuXHRcdFx0XCJ0ZXJtaW5hbC5hbnNpQ3lhblwiOiB2YXJpYWJsZShcImFuc2ktY3lhblwiKSxcblx0XHRcdFwidGVybWluYWwuYW5zaVdoaXRlXCI6IHZhcmlhYmxlKFwiYW5zaS13aGl0ZVwiKSxcblx0XHRcdFwidGVybWluYWwuYW5zaUJyaWdodEJsYWNrXCI6IHZhcmlhYmxlKFwiYW5zaS1icmlnaHQtYmxhY2tcIiksXG5cdFx0XHRcInRlcm1pbmFsLmFuc2lCcmlnaHRSZWRcIjogdmFyaWFibGUoXCJhbnNpLWJyaWdodC1yZWRcIiksXG5cdFx0XHRcInRlcm1pbmFsLmFuc2lCcmlnaHRHcmVlblwiOiB2YXJpYWJsZShcImFuc2ktYnJpZ2h0LWdyZWVuXCIpLFxuXHRcdFx0XCJ0ZXJtaW5hbC5hbnNpQnJpZ2h0WWVsbG93XCI6IHZhcmlhYmxlKFwiYW5zaS1icmlnaHQteWVsbG93XCIpLFxuXHRcdFx0XCJ0ZXJtaW5hbC5hbnNpQnJpZ2h0Qmx1ZVwiOiB2YXJpYWJsZShcImFuc2ktYnJpZ2h0LWJsdWVcIiksXG5cdFx0XHRcInRlcm1pbmFsLmFuc2lCcmlnaHRNYWdlbnRhXCI6IHZhcmlhYmxlKFwiYW5zaS1icmlnaHQtbWFnZW50YVwiKSxcblx0XHRcdFwidGVybWluYWwuYW5zaUJyaWdodEN5YW5cIjogdmFyaWFibGUoXCJhbnNpLWJyaWdodC1jeWFuXCIpLFxuXHRcdFx0XCJ0ZXJtaW5hbC5hbnNpQnJpZ2h0V2hpdGVcIjogdmFyaWFibGUoXCJhbnNpLWJyaWdodC13aGl0ZVwiKVxuXHRcdH0sXG5cdFx0dG9rZW5Db2xvcnM6IFtcblx0XHRcdHtcblx0XHRcdFx0c2NvcGU6IFtcblx0XHRcdFx0XHRcImtleXdvcmQub3BlcmF0b3IuYWNjZXNzb3JcIixcblx0XHRcdFx0XHRcIm1ldGEuZ3JvdXAuYnJhY2VzLnJvdW5kLmZ1bmN0aW9uLmFyZ3VtZW50c1wiLFxuXHRcdFx0XHRcdFwibWV0YS50ZW1wbGF0ZS5leHByZXNzaW9uXCIsXG5cdFx0XHRcdFx0XCJtYXJrdXAuZmVuY2VkX2NvZGUgbWV0YS5lbWJlZGRlZC5ibG9ja1wiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdHNldHRpbmdzOiB7IGZvcmVncm91bmQ6IHZhcmlhYmxlKFwiZm9yZWdyb3VuZFwiKSB9XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRzY29wZTogXCJlbXBoYXNpc1wiLFxuXHRcdFx0XHRzZXR0aW5nczogeyBmb250U3R5bGU6IFwiaXRhbGljXCIgfVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0c2NvcGU6IFtcblx0XHRcdFx0XHRcInN0cm9uZ1wiLFxuXHRcdFx0XHRcdFwibWFya3VwLmhlYWRpbmcubWFya2Rvd25cIixcblx0XHRcdFx0XHRcIm1hcmt1cC5ib2xkLm1hcmtkb3duXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0c2V0dGluZ3M6IHsgZm9udFN0eWxlOiBcImJvbGRcIiB9XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRzY29wZTogW1wibWFya3VwLml0YWxpYy5tYXJrZG93blwiXSxcblx0XHRcdFx0c2V0dGluZ3M6IHsgZm9udFN0eWxlOiBcIml0YWxpY1wiIH1cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHNjb3BlOiBcIm1ldGEubGluay5pbmxpbmUubWFya2Rvd25cIixcblx0XHRcdFx0c2V0dGluZ3M6IHtcblx0XHRcdFx0XHRmb250U3R5bGU6IFwidW5kZXJsaW5lXCIsXG5cdFx0XHRcdFx0Zm9yZWdyb3VuZDogdmFyaWFibGUoXCJ0b2tlbi1saW5rXCIpXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHNjb3BlOiBbXG5cdFx0XHRcdFx0XCJzdHJpbmdcIixcblx0XHRcdFx0XHRcIm1hcmt1cC5mZW5jZWRfY29kZVwiLFxuXHRcdFx0XHRcdFwibWFya3VwLmlubGluZVwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdHNldHRpbmdzOiB7IGZvcmVncm91bmQ6IHZhcmlhYmxlKFwidG9rZW4tc3RyaW5nXCIpIH1cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHNjb3BlOiBbXCJjb21tZW50XCIsIFwic3RyaW5nLnF1b3RlZC5kb2NzdHJpbmcubXVsdGlcIl0sXG5cdFx0XHRcdHNldHRpbmdzOiB7IGZvcmVncm91bmQ6IHZhcmlhYmxlKFwidG9rZW4tY29tbWVudFwiKSB9XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRzY29wZTogW1xuXHRcdFx0XHRcdFwiY29uc3RhbnQubnVtZXJpY1wiLFxuXHRcdFx0XHRcdFwiY29uc3RhbnQubGFuZ3VhZ2VcIixcblx0XHRcdFx0XHRcImNvbnN0YW50Lm90aGVyLnBsYWNlaG9sZGVyXCIsXG5cdFx0XHRcdFx0XCJjb25zdGFudC5jaGFyYWN0ZXIuZm9ybWF0LnBsYWNlaG9sZGVyXCIsXG5cdFx0XHRcdFx0XCJ2YXJpYWJsZS5sYW5ndWFnZS50aGlzXCIsXG5cdFx0XHRcdFx0XCJ2YXJpYWJsZS5vdGhlci5vYmplY3RcIixcblx0XHRcdFx0XHRcInZhcmlhYmxlLm90aGVyLmNsYXNzXCIsXG5cdFx0XHRcdFx0XCJ2YXJpYWJsZS5vdGhlci5jb25zdGFudFwiLFxuXHRcdFx0XHRcdFwibWV0YS5wcm9wZXJ0eS1uYW1lXCIsXG5cdFx0XHRcdFx0XCJtZXRhLnByb3BlcnR5LXZhbHVlXCIsXG5cdFx0XHRcdFx0XCJzdXBwb3J0XCJcblx0XHRcdFx0XSxcblx0XHRcdFx0c2V0dGluZ3M6IHsgZm9yZWdyb3VuZDogdmFyaWFibGUoXCJ0b2tlbi1jb25zdGFudFwiKSB9XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRzY29wZTogW1xuXHRcdFx0XHRcdFwia2V5d29yZFwiLFxuXHRcdFx0XHRcdFwic3RvcmFnZS5tb2RpZmllclwiLFxuXHRcdFx0XHRcdFwic3RvcmFnZS50eXBlXCIsXG5cdFx0XHRcdFx0XCJzdG9yYWdlLmNvbnRyb2wuY2xvanVyZVwiLFxuXHRcdFx0XHRcdFwiZW50aXR5Lm5hbWUuZnVuY3Rpb24uY2xvanVyZVwiLFxuXHRcdFx0XHRcdFwiZW50aXR5Lm5hbWUudGFnLnlhbWxcIixcblx0XHRcdFx0XHRcInN1cHBvcnQuZnVuY3Rpb24ubm9kZVwiLFxuXHRcdFx0XHRcdFwic3VwcG9ydC50eXBlLnByb3BlcnR5LW5hbWUuanNvblwiLFxuXHRcdFx0XHRcdFwicHVuY3R1YXRpb24uc2VwYXJhdG9yLmtleS12YWx1ZVwiLFxuXHRcdFx0XHRcdFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi50ZW1wbGF0ZS1leHByZXNzaW9uXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0c2V0dGluZ3M6IHsgZm9yZWdyb3VuZDogdmFyaWFibGUoXCJ0b2tlbi1rZXl3b3JkXCIpIH1cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHNjb3BlOiBcInZhcmlhYmxlLnBhcmFtZXRlci5mdW5jdGlvblwiLFxuXHRcdFx0XHRzZXR0aW5nczogeyBmb3JlZ3JvdW5kOiB2YXJpYWJsZShcInRva2VuLXBhcmFtZXRlclwiKSB9XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRzY29wZTogW1xuXHRcdFx0XHRcdFwic3VwcG9ydC5mdW5jdGlvblwiLFxuXHRcdFx0XHRcdFwiZW50aXR5Lm5hbWUudHlwZVwiLFxuXHRcdFx0XHRcdFwiZW50aXR5Lm90aGVyLmluaGVyaXRlZC1jbGFzc1wiLFxuXHRcdFx0XHRcdFwibWV0YS5mdW5jdGlvbi1jYWxsXCIsXG5cdFx0XHRcdFx0XCJtZXRhLmluc3RhbmNlLmNvbnN0cnVjdG9yXCIsXG5cdFx0XHRcdFx0XCJlbnRpdHkub3RoZXIuYXR0cmlidXRlLW5hbWVcIixcblx0XHRcdFx0XHRcImVudGl0eS5uYW1lLmZ1bmN0aW9uXCIsXG5cdFx0XHRcdFx0XCJjb25zdGFudC5rZXl3b3JkLmNsb2p1cmVcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRzZXR0aW5nczogeyBmb3JlZ3JvdW5kOiB2YXJpYWJsZShcInRva2VuLWZ1bmN0aW9uXCIpIH1cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHNjb3BlOiBbXG5cdFx0XHRcdFx0XCJlbnRpdHkubmFtZS50YWdcIixcblx0XHRcdFx0XHRcInN0cmluZy5xdW90ZWRcIixcblx0XHRcdFx0XHRcInN0cmluZy5yZWdleHBcIixcblx0XHRcdFx0XHRcInN0cmluZy5pbnRlcnBvbGF0ZWRcIixcblx0XHRcdFx0XHRcInN0cmluZy50ZW1wbGF0ZVwiLFxuXHRcdFx0XHRcdFwic3RyaW5nLnVucXVvdGVkLnBsYWluLm91dC55YW1sXCIsXG5cdFx0XHRcdFx0XCJrZXl3b3JkLm90aGVyLnRlbXBsYXRlXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0c2V0dGluZ3M6IHsgZm9yZWdyb3VuZDogdmFyaWFibGUoXCJ0b2tlbi1zdHJpbmctZXhwcmVzc2lvblwiKSB9XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRzY29wZTogW1xuXHRcdFx0XHRcdFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5hcmd1bWVudHNcIixcblx0XHRcdFx0XHRcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uZGljdFwiLFxuXHRcdFx0XHRcdFwicHVuY3R1YXRpb24uc2VwYXJhdG9yXCIsXG5cdFx0XHRcdFx0XCJtZXRhLmZ1bmN0aW9uLWNhbGwuYXJndW1lbnRzXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0c2V0dGluZ3M6IHsgZm9yZWdyb3VuZDogdmFyaWFibGUoXCJ0b2tlbi1wdW5jdHVhdGlvblwiKSB9XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRzY29wZTogW1wibWFya3VwLnVuZGVybGluZS5saW5rXCIsIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5tZXRhZGF0YS5tYXJrZG93blwiXSxcblx0XHRcdFx0c2V0dGluZ3M6IHsgZm9yZWdyb3VuZDogdmFyaWFibGUoXCJ0b2tlbi1saW5rXCIpIH1cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHNjb3BlOiBbXCJiZWdpbm5pbmcucHVuY3R1YXRpb24uZGVmaW5pdGlvbi5saXN0Lm1hcmtkb3duXCJdLFxuXHRcdFx0XHRzZXR0aW5nczogeyBmb3JlZ3JvdW5kOiB2YXJpYWJsZShcInRva2VuLXN0cmluZ1wiKSB9XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRzY29wZTogW1xuXHRcdFx0XHRcdFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5zdHJpbmcuYmVnaW4ubWFya2Rvd25cIixcblx0XHRcdFx0XHRcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmVuZC5tYXJrZG93blwiLFxuXHRcdFx0XHRcdFwic3RyaW5nLm90aGVyLmxpbmsudGl0bGUubWFya2Rvd25cIixcblx0XHRcdFx0XHRcInN0cmluZy5vdGhlci5saW5rLmRlc2NyaXB0aW9uLm1hcmtkb3duXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0c2V0dGluZ3M6IHsgZm9yZWdyb3VuZDogdmFyaWFibGUoXCJ0b2tlbi1rZXl3b3JkXCIpIH1cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHNjb3BlOiBbXG5cdFx0XHRcdFx0XCJtYXJrdXAuaW5zZXJ0ZWRcIixcblx0XHRcdFx0XHRcIm1ldGEuZGlmZi5oZWFkZXIudG8tZmlsZVwiLFxuXHRcdFx0XHRcdFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5pbnNlcnRlZFwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdHNldHRpbmdzOiB7IGZvcmVncm91bmQ6IHZhcmlhYmxlKFwidG9rZW4taW5zZXJ0ZWRcIikgfVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0c2NvcGU6IFtcblx0XHRcdFx0XHRcIm1hcmt1cC5kZWxldGVkXCIsXG5cdFx0XHRcdFx0XCJtZXRhLmRpZmYuaGVhZGVyLmZyb20tZmlsZVwiLFxuXHRcdFx0XHRcdFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5kZWxldGVkXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0c2V0dGluZ3M6IHsgZm9yZWdyb3VuZDogdmFyaWFibGUoXCJ0b2tlbi1kZWxldGVkXCIpIH1cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHNjb3BlOiBbXCJtYXJrdXAuY2hhbmdlZFwiLCBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uY2hhbmdlZFwiXSxcblx0XHRcdFx0c2V0dGluZ3M6IHsgZm9yZWdyb3VuZDogdmFyaWFibGUoXCJ0b2tlbi1jaGFuZ2VkXCIpIH1cblx0XHRcdH1cblx0XHRdXG5cdH07XG5cdGlmICghZm9udFN0eWxlKSB0aGVtZS50b2tlbkNvbG9ycyA9IHRoZW1lLnRva2VuQ29sb3JzPy5tYXAoKHRva2VuQ29sb3IpID0+IHtcblx0XHRpZiAodG9rZW5Db2xvci5zZXR0aW5ncz8uZm9udFN0eWxlKSBkZWxldGUgdG9rZW5Db2xvci5zZXR0aW5ncy5mb250U3R5bGU7XG5cdFx0cmV0dXJuIHRva2VuQ29sb3I7XG5cdH0pO1xuXHRyZXR1cm4gdGhlbWU7XG59XG4vLyNlbmRyZWdpb25cbmV4cG9ydCB7IFNoaWtpRXJyb3IsIGFkZENsYXNzVG9IYXN0LCBhcHBseUNvbG9yUmVwbGFjZW1lbnRzLCBjb2RlVG9IYXN0LCBjb2RlVG9IdG1sLCBjb2RlVG9Ub2tlbnMsIGNvZGVUb1Rva2Vuc0Jhc2UsIGNvZGVUb1Rva2Vuc1dpdGhUaGVtZXMsIGNyZWF0ZUJ1bmRsZWRIaWdobGlnaHRlciwgY3JlYXRlQ3NzVmFyaWFibGVzVGhlbWUsIGNyZWF0ZUhpZ2hsaWdodGVyQ29yZSwgY3JlYXRlSGlnaGxpZ2h0ZXJDb3JlU3luYywgY3JlYXRlUG9zaXRpb25Db252ZXJ0ZXIsIGNyZWF0ZVNoaWtpSW50ZXJuYWwsIGNyZWF0ZVNoaWtpSW50ZXJuYWxTeW5jLCBjcmVhdGVTaGlraVByaW1pdGl2ZSwgY3JlYXRlU2hpa2lQcmltaXRpdmVBc3luYywgY3JlYXRlU2luZ2xldG9uU2hvcnRoYW5kcywgZmxhdFRva2VuVmFyaWFudHMsIGdldExhc3RHcmFtbWFyU3RhdGUsIGdldFNpbmdsZXRvbkhpZ2hsaWdodGVyQ29yZSwgZ2V0VG9rZW5TdHlsZU9iamVjdCwgZ3Vlc3NFbWJlZGRlZExhbmd1YWdlcywgaGFzdFRvSHRtbCwgaXNOb25lVGhlbWUsIGlzUGxhaW5MYW5nLCBpc1NwZWNpYWxMYW5nLCBpc1NwZWNpYWxUaGVtZSwgbWFrZVNpbmdsZXRvbkhpZ2hsaWdodGVyLCBtYWtlU2luZ2xldG9uSGlnaGxpZ2h0ZXJDb3JlLCBub3JtYWxpemVHZXR0ZXIsIG5vcm1hbGl6ZVRoZW1lLCByZXNvbHZlQ29sb3JSZXBsYWNlbWVudHMsIHNwbGl0TGluZXMsIHNwbGl0VG9rZW4sIHNwbGl0VG9rZW5zLCBzdHJpbmdpZnlUb2tlblN0eWxlLCB0b0FycmF5LCB0b2tlbml6ZUFuc2lXaXRoVGhlbWUsIHRva2VuaXplV2l0aFRoZW1lLCB0b2tlbnNUb0hhc3QsIHRyYW5zZm9ybWVyRGVjb3JhdGlvbnMgfTtcbiJdLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwxOSwyMCwyMSwyMiwyMywyNCwyNSwyNiwyNywyOCwyOSwzMCwzMSwzMiwzMywzNCwzNSwzNiwzNywzOCwzOSw0MCw0MSw0Miw0Myw0NCw0NSw0Niw0N10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSSxhQUFhLGNBQWMsTUFBTTtDQUNwQyxZQUFZLFNBQVM7RUFDcEIsTUFBTSxPQUFPO0VBQ2IsS0FBSyxPQUFPO0NBQ2I7QUFDRDs7O0FDTEEsU0FBUyxNQUFNLFdBQVc7Q0FDeEIsT0FBTyxRQUFRLFNBQVM7QUFDMUI7QUFDQSxTQUFTLFFBQVEsV0FBVztDQUMxQixJQUFJLE1BQU0sUUFBUSxTQUFTLEdBQ3pCLE9BQU8sV0FBVyxTQUFTO0NBRTdCLElBQUkscUJBQXFCLFFBQ3ZCLE9BQU87Q0FFVCxJQUFJLE9BQU8sY0FBYyxVQUN2QixPQUFPLFNBQVMsU0FBUztDQUUzQixPQUFPO0FBQ1Q7QUFDQSxTQUFTLFdBQVcsS0FBSztDQUN2QixJQUFJ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Q0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7QUFDRjs7Ozs7Ozs7QUMzR0EsSUFBYSx5QkFBeUI7Q0FDcEMsTUFBTTtDQUNOLE9BQU87Q0FDUCxNQUFNO0NBQ04sT0FBTztDQUNQLFFBQVE7Q0FDUixLQUFLO0NBQ0wsUUFBUTtDQUNSLE1BQU07Q0FDTixLQUFLO0NBQ0wsTUFBTTtDQUNOLE1BQU07Q0FDTixPQUFPO0NBQ1AsS0FBSztDQUNMLEtBQUs7Q0FDTCxLQUFLO0NBQ0wsTUFBTTtDQUNOLEtBQUs7Q0FDTCxRQUFRO0NBQ1IsTUFBTTtDQUNOLE1BQU07Q0FDTixPQUFPO0NBQ1AsT0FBTztDQUNQLE1BQU07Q0FDTixRQUFRO0NBQ1IsT0FBTztDQUNQLE1BQU07Q0FDTixNQUFNO0NBQ04sT0FBTztDQUNQLFFBQVE7Q0FDUixRQUFRO0NBQ1IsUUFBUTtDQUNSLFFBQVE7Q0FDUixRQUFRO0NBQ1IsUUFBUTtDQUNSLE9BQU87Q0FDUCxRQUFRO0NBQ1IsTUFBTTtDQUNOLE9BQU87Q0FDUCxPQUFPO0NBQ1AsUUFBUTtDQUNSLFFBQVE7Q0FDUixRQUFRO0NBQ1IsT0FBTztDQUNQLE1BQU07Q0FDTixRQUFRO0NBQ1IsUUFBUTtDQUNSLE9BQU87Q0FDUCxNQUFNO0NBQ04sS0FBSztDQUNMLFFBQVE7Q0FDUixRQUFRO0NBQ1IsUUFBUTtDQUNSLE9BQU87Q0FDUCxRQUFRO0NBQ1IsTUFBTTtDQUNOLE9BQU87Q0FDUCxRQUFRO0NBQ1IsUUFBUTtDQUNSLFFBQVE7Q0FDUixPQUFPO0NBQ1AsTUFBTTtDQUNOLFFBQVE7Q0FDUixPQUFPO0NBQ1AsT0FBTztDQUNQLFFBQVE7Q0FDUixRQUFRO0NBQ1IsT0FBTztDQUNQLFFBQVE7Q0FDUixNQUFNO0NBQ04sT0FBTztDQUNQLE9BQU87Q0FDUCxRQUFRO0NBQ1IsUUFBUTtDQUNSLFFBQVE7Q0FDUixPQUFPO0NBQ1AsTUFBTTtDQUNOLFFBQVE7Q0FDUixRQUFRO0NBQ1IsT0FBTztDQUNQLE1BQU07Q0FDTixLQUFLO0NBQ0wsUUFBUTtDQUNSLFFBQVE7Q0FDUixRQUFRO0NBQ1IsT0FBTztDQUNQLFFBQVE7Q0FDUixNQUFNO0NBQ04sUUFBUTtDQUNSLFFBQVE7Q0FDUixRQUFRO0NBQ1IsUUFBUTtDQUNSLE9BQU87Q0FDUCxNQUFNO0NBQ04sUUFBUTtDQUNSLE9BQU87Q0FDUCxNQUFNO0NBQ04sTUFBTTtDQUNOLE9BQU87Q0FDUCxNQUFNO0NBQ04sT0FBTztDQUNQLE9BQU87Q0FDUCxTQUFTO0NBQ1QsTUFBTTtDQUNOLEtBQUs7Q0FDTCxPQUFPO0NBQ1AsTUFBTTtDQUNOLE9BQU87Q0FDUCxRQUFRO0NBQ1IsSUFBSTtDQUNKLElBQUk7Q0FDSixJQUFJO0NBQ0osU0FBUztDQUNULElBQUk7Q0FDSixLQUFLO0NBQ0wsT0FBTztDQUNQLEtBQUs7Q0FDTCxTQUFTO0NBQ1QsS0FBSztDQUNMLEtBQUs7Q0FDTCxLQUFLO0NBQ0wsT0FBTztDQUNQLE9BQU87Q0FDUCxNQUFNO0NBQ04sT0FBTztDQUNQLE9BQU87Q0FDUCxTQUFTO0NBQ1QsTUFBTTtDQUNOLEtBQUs7Q0FDTCxPQUFPO0NBQ1AsTUFBTTtDQUNOLE9BQU87Q0FDUCxRQUFRO0NBQ1IsSUFBSTtDQUNKLElBQUk7Q0FDSixJQUFJO0NBQ0osU0FBUztDQUNULElBQUk7Q0FDSixLQUFLO0NBQ0wsUUFBUTtDQUNSLE9BQU87Q0FDUCxLQUFLO0NBQ0wsU0FBUztDQUNULEtBQUs7Q0FDTCxLQUFLO0NBQ0wsS0FBSztDQUNMLE9BQU87Q0FDUCxVQUFVO0NBQ1YsT0FBTztDQUNQLEtBQUs7Q0FDTCxNQUFNO0NBQ04sUUFBUTtDQUNSLE9BQU87Q0FDUCxPQUFPO0NBQ1AsT0FBTztDQUNQLE9BQU87Q0FDUCxRQUFRO0NBQ1IsT0FBTztDQUNQLE1BQU07Q0FDTixPQUFPO0NBQ1AsU0FBUztDQUNULE1BQU07Q0FDTixNQUFNO0NBQ04sTUFBTTtDQUNOLE1BQU07Q0FDTixNQUFNO0NBQ04sT0FBTztDQUNQLE1BQU07Q0FDTixNQUFNO0NBQ04sTUFBTTtDQUNOLE1BQU07Q0FDTixNQUFNO0NBQ04sUUFBUTtDQUNSLE1BQU07Q0FDTixPQUFPO0NBQ1AsT0FBTztDQUNQLE9BQU87Q0FDUCxNQUFNO0NBQ04sT0FBTztDQUNQLElBQUk7Q0FDSixNQUFNO0NBQ04sS0FBSztDQUNMLE9BQU87Q0FDUCxRQUFRO0NBQ1IsT0FBTztDQUNQLE1BQU07Q0FDTixPQUFPO0NBQ1AsS0FBSztDQUNMLEtBQUs7Q0FDTCxJQUFJO0NBQ0osS0FBSztDQUNMLEtBQUs7Q0FDTCxLQUFLO0NBQ0wsUUFBUTtDQUNSLEtBQUs7Q0FDTCxNQUFNO0NBQ04sT0FBTztDQUNQLElBQUk7Q0FDSixPQUFPO0NBQ1AsSUFBSTtDQUNKLElBQUk7Q0FDSixLQUFLO0NBQ0wsS0FBSztDQUNMLE1BQU07Q0FDTixNQUFNO0NBQ04sTUFBTTtDQUNOLE9BQU87Q0FDUCxRQUFRO0NBQ1IsTUFBTTtDQUNOLE1BQU07Q0FDTixPQUFPO0NBQ1AsT0FBTztDQUNQLFFBQVE7Q0FDUixRQUFRO0NBQ1IsTUFBTTtDQUNOLE1BQU07Q0FDTixLQUFLO0NBQ0wsUUFBUTtDQUNSLE9BQU87Q0FDUCxRQUFRO0NBQ1IsT0FBTztDQUNQLE1BQU07Q0FDTixLQUFLO0NBQ0wsSUFBSTtDQUNKLElBQUk7Q0FDSixPQUFPO0NBQ1AsT0FBTztDQUNQLFFBQVE7Q0FDUixRQUFRO0NBQ1IsTUFBTTtDQUNOLE1BQU07Q0FDTixPQUFPO0NBQ1AsTUFBTTtDQUNOLE1BQU07Q0FDTixRQUFRO0NBQ1IsTUFBTTtDQUNOLEtBQUs7Q0FDTCxLQUFLO0NBQ0wsS0FBSztDQUNMLE9BQU87Q0FDUCxP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
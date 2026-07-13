//#region node_modules/.pnpm/cnfast@0.0.8/node_modules/cnfast/dist/index.mjs
var isArray = Array.isArray;
var resolveClassValue = (value) => {
	if (!value) return "";
	if (typeof value === "string") return value;
	if (typeof value === "number") return "" + value;
	let result = "";
	if (isArray(value)) {
		const length = value.length;
		for (let index = 0; index < length; index++) {
			const item = value[index];
			if (!item) continue;
			const resolved = typeof item === "string" ? item : resolveClassValue(item);
			if (resolved) {
				if (result) result += " ";
				result += resolved;
			}
		}
		return result;
	}
	if (typeof value === "object") {
		for (const key in value) if (value[key]) {
			if (result) result += " ";
			result += key;
		}
	}
	return result;
};
var clsx = (...inputs) => resolveClassValue(inputs);
/**
* Concatenates two arrays faster than the array spread operator.
*/
var concatArrays = (array1, array2) => {
	const length1 = array1.length;
	const length2 = array2.length;
	const combinedArray = new Array(length1 + length2);
	for (let i = 0; i < length1; i++) combinedArray[i] = array1[i];
	for (let i = 0; i < length2; i++) combinedArray[length1 + i] = array2[i];
	return combinedArray;
};
var createClassValidatorObject = (classGroupId, validator) => ({
	classGroupId,
	validator
});
var createClassPartObject = (nextPart = /* @__PURE__ */ new Map(), validators = null, classGroupId) => ({
	nextPart,
	validators,
	classGroupId
});
var CLASS_PART_SEPARATOR = "-";
var EMPTY_CONFLICTS = [];
var ARBITRARY_PROPERTY_PREFIX = "arbitrary..";
var createClassGroupUtils = (config) => {
	const classMap = createClassMap(config);
	const { conflictingClassGroups, conflictingClassGroupModifiers } = config;
	const getClassGroupId = (className) => {
		if (className[0] === "[" && className[className.length - 1] === "]") return getGroupIdForArbitraryProperty(className);
		const classParts = className.split(CLASS_PART_SEPARATOR);
		return getGroupRecursive(classParts, classParts[0] === "" && classParts.length > 1 ? 1 : 0, classMap);
	};
	const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
		if (hasPostfixModifier) {
			const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
			const baseConflicts = conflictingClassGroups[classGroupId];
			if (modifierConflicts) {
				if (baseConflicts) return concatArrays(baseConflicts, modifierConflicts);
				return modifierConflicts;
			}
			return baseConflicts || EMPTY_CONFLICTS;
		}
		return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
	};
	return {
		getClassGroupId,
		getConflictingClassGroupIds
	};
};
var getGroupRecursive = (classParts, startIndex, classPartObject) => {
	if (classParts.length - startIndex === 0) return classPartObject.classGroupId;
	const currentClassPart = classParts[startIndex];
	const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
	if (nextClassPartObject) {
		const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
		if (result) return result;
	}
	const validators = classPartObject.validators;
	if (validators === null) return;
	const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
	const validatorsLength = validators.length;
	for (let index = 0; index < validatorsLength; index++) {
		const validatorObject = validators[index];
		if (validatorObject.validator(classRest)) return validatorObject.classGroupId;
	}
};
/**
* Get the class group ID for an arbitrary property.
*
* @param className - The class name to get the group ID for. Is expected to be string starting with `[` and ending with `]`.
*/
var getGroupIdForArbitraryProperty = (className) => {
	const content = className.slice(1, -1);
	const colonIndex = content.indexOf(":");
	if (colonIndex === -1) return;
	const property = content.slice(0, colonIndex);
	return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0;
};
/**
* Exported for testing only
*/
var createClassMap = (config) => {
	const { theme, classGroups } = config;
	return processClassGroups(classGroups, theme);
};
var processClassGroups = (classGroups, theme) => {
	const classMap = createClassPartObject();
	for (const classGroupId in classGroups) {
		const group = classGroups[classGroupId];
		processClassesRecursively(group, classMap, classGroupId, theme);
	}
	return classMap;
};
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
	const length = classGroup.length;
	for (let index = 0; index < length; index++) {
		const classDefinition = classGroup[index];
		processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
	}
};
var processClassDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	if (typeof classDefinition === "string") {
		processStringDefinition(classDefinition, classPartObject, classGroupId);
		return;
	}
	if (typeof classDefinition === "function") {
		processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
		return;
	}
	processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
};
var processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
	const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
	classPartObjectToEdit.classGroupId = classGroupId;
};
var processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	if (isThemeGetter(classDefinition)) {
		processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
		return;
	}
	if (classPartObject.validators === null) classPartObject.validators = [];
	classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
};
var processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	const entries = Object.entries(classDefinition);
	const length = entries.length;
	for (let index = 0; index < length; index++) {
		const [key, value] = entries[index];
		processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
	}
};
var getPart = (classPartObject, path) => {
	let current = classPartObject;
	const parts = path.split(CLASS_PART_SEPARATOR);
	const length = parts.length;
	for (let index = 0; index < length; index++) {
		const part = parts[index];
		let next = current.nextPart.get(part);
		if (!next) {
			next = createClassPartObject();
			current.nextPart.set(part, next);
		}
		current = next;
	}
	return current;
};
var isThemeGetter = (classDefinition) => "isThemeGetter" in classDefinition && classDefinition.isThemeGetter === true;
var CHAR_MODIFIER_SEPARATOR = 58;
var CHAR_POSTFIX_SEPARATOR = 47;
var CHAR_OPEN_BRACKET = 91;
var CHAR_CLOSE_BRACKET = 93;
var CHAR_OPEN_PAREN = 40;
var CHAR_CLOSE_PAREN = 41;
var CHAR_IMPORTANT = 33;
var createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition) => ({
	modifiers,
	hasImportantModifier,
	baseClassName,
	maybePostfixModifierPosition,
	isExternal: void 0
});
/**
* Parse class name into parts.
*
* Inspired by `splitAtTopLevelOnly` used in Tailwind CSS
* @see https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
*/
var parseClassName = (className) => {
	const modifiers = [];
	let bracketDepth = 0;
	let parenDepth = 0;
	let modifierStart = 0;
	let postfixModifierPosition;
	const len = className.length;
	for (let index = 0; index < len; index++) {
		const charCode = className.charCodeAt(index);
		if (bracketDepth === 0 && parenDepth === 0) {
			if (charCode === CHAR_MODIFIER_SEPARATOR) {
				modifiers.push(className.slice(modifierStart, index));
				modifierStart = index + 1;
				continue;
			}
			if (charCode === CHAR_POSTFIX_SEPARATOR) {
				postfixModifierPosition = index;
				continue;
			}
		}
		if (charCode === CHAR_OPEN_BRACKET) bracketDepth++;
		else if (charCode === CHAR_CLOSE_BRACKET) bracketDepth--;
		else if (charCode === CHAR_OPEN_PAREN) parenDepth++;
		else if (charCode === CHAR_CLOSE_PAREN) parenDepth--;
	}
	const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
	let baseClassName = baseClassNameWithImportantModifier;
	let hasImportantModifier = false;
	const lastIndex = baseClassNameWithImportantModifier.length - 1;
	if (baseClassNameWithImportantModifier.charCodeAt(lastIndex) === CHAR_IMPORTANT) {
		baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
		hasImportantModifier = true;
	} else if (baseClassNameWithImportantModifier.charCodeAt(0) === CHAR_IMPORTANT) {
		baseClassName = baseClassNameWithImportantModifier.slice(1);
		hasImportantModifier = true;
	}
	const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
	return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
};
/**
* Sorts modifiers according to following schema:
* - Predefined modifiers are sorted alphabetically
* - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
*/
var createSortModifiers = (config) => {
	const orderSensitiveModifiers = new Set(config.orderSensitiveModifiers);
	return (modifiers) => {
		const result = [];
		let currentSegment = [];
		for (let index = 0; index < modifiers.length; index++) {
			const modifier = modifiers[index];
			const isArbitrary = modifier[0] === "[";
			const isOrderSensitive = orderSensitiveModifiers.has(modifier);
			if (isArbitrary || isOrderSensitive) {
				if (currentSegment.length > 0) {
					currentSegment.sort();
					for (let segmentIndex = 0; segmentIndex < currentSegment.length; segmentIndex++) result.push(currentSegment[segmentIndex]);
					currentSegment = [];
				}
				result.push(modifier);
			} else currentSegment.push(modifier);
		}
		if (currentSegment.length > 0) {
			currentSegment.sort();
			for (let segmentIndex = 0; segmentIndex < currentSegment.length; segmentIndex++) result.push(currentSegment[segmentIndex]);
		}
		return result;
	};
};
var EXTERNAL_DESCRIPTOR = {
	isExternal: true,
	classId: -1,
	conflictIds: []
};
/**
* Per-token descriptor cache capacity (entries). Larger than the whole-string LRU because
* individual tokens are far more numerous but cheap to store; the LRU bound prevents
* unbounded growth when callers pass dynamically generated arbitrary values (e.g. `w-[123px]`).
*/
var DESCRIPTOR_CACHE_SIZE = 4096;
var createConfigUtils = (config) => {
	const sortModifiers = createSortModifiers(config);
	const postfixLookupClassGroupIds = createPostfixLookupClassGroupIds(config);
	const { getClassGroupId, getConflictingClassGroupIds } = createClassGroupUtils(config);
	let descriptorCache = Object.create(null);
	let previousDescriptorCache = Object.create(null);
	let descriptorCacheSize = 0;
	let claimedGeneration = /* @__PURE__ */ new Int32Array(256);
	let currentGeneration = 0;
	let keepFlags = /* @__PURE__ */ new Uint8Array(64);
	let splitSawNonSpaceWhitespace = false;
	const splitClassList = (classList) => {
		const tokens = [];
		const length = classList.length;
		let tokenStart = -1;
		splitSawNonSpaceWhitespace = false;
		for (let index = 0; index < length; index++) {
			const charCode = classList.charCodeAt(index);
			if (charCode === 32) {
				if (tokenStart !== -1) {
					tokens.push(classList.slice(tokenStart, index));
					tokenStart = -1;
				}
			} else if (charCode >= 9 && charCode <= 13) {
				splitSawNonSpaceWhitespace = true;
				if (tokenStart !== -1) {
					tokens.push(classList.slice(tokenStart, index));
					tokenStart = -1;
				}
			} else if (tokenStart === -1) tokenStart = index;
		}
		if (tokenStart !== -1) tokens.push(classList.slice(tokenStart));
		return tokens;
	};
	const conflictKeyIds = /* @__PURE__ */ new Map();
	let nextConflictKeyId = 0;
	const internConflictKey = (conflictKey) => {
		let id = conflictKeyIds.get(conflictKey);
		if (id === void 0) {
			id = nextConflictKeyId++;
			conflictKeyIds.set(conflictKey, id);
			if (id >= claimedGeneration.length) {
				const grown = new Int32Array(claimedGeneration.length * 2);
				grown.set(claimedGeneration);
				claimedGeneration = grown;
			}
		}
		return id;
	};
	const computeClassDescriptor = (originalClassName) => {
		const { isExternal, modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition } = parseClassName(originalClassName);
		if (isExternal) return EXTERNAL_DESCRIPTOR;
		let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
		let classGroupId;
		if (hasPostfixModifier) {
			classGroupId = getClassGroupId(baseClassName.substring(0, maybePostfixModifierPosition));
			const classGroupIdWithPostfix = classGroupId && postfixLookupClassGroupIds[classGroupId] ? getClassGroupId(baseClassName) : void 0;
			if (classGroupIdWithPostfix && classGroupIdWithPostfix !== classGroupId) {
				classGroupId = classGroupIdWithPostfix;
				hasPostfixModifier = false;
			}
		} else classGroupId = getClassGroupId(baseClassName);
		if (!classGroupId) {
			if (!hasPostfixModifier) return EXTERNAL_DESCRIPTOR;
			classGroupId = getClassGroupId(baseClassName);
			if (!classGroupId) return EXTERNAL_DESCRIPTOR;
			hasPostfixModifier = false;
		}
		const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
		const modifierId = hasImportantModifier ? variantModifier + "!" : variantModifier;
		const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
		const conflictIds = [];
		for (let index = 0; index < conflictGroups.length; index++) conflictIds.push(internConflictKey(modifierId + conflictGroups[index]));
		return {
			isExternal: false,
			classId: internConflictKey(modifierId + classGroupId),
			conflictIds
		};
	};
	const getClassDescriptor = (originalClassName) => {
		let descriptor = descriptorCache[originalClassName];
		if (descriptor !== void 0) return descriptor;
		descriptor = previousDescriptorCache[originalClassName];
		if (descriptor === void 0) descriptor = computeClassDescriptor(originalClassName);
		descriptorCache[originalClassName] = descriptor;
		if (++descriptorCacheSize > DESCRIPTOR_CACHE_SIZE) {
			descriptorCacheSize = 0;
			previousDescriptorCache = descriptorCache;
			descriptorCache = Object.create(null);
		}
		return descriptor;
	};
	const mergeClassList = (classList) => {
		const classNames = splitClassList(classList);
		const classCount = classNames.length;
		if (classCount === 1) return classNames[0];
		currentGeneration = currentGeneration + 1 | 0;
		if (currentGeneration === 0) currentGeneration = 1;
		const generation = currentGeneration;
		if (classCount > keepFlags.length) {
			let capacity = keepFlags.length;
			while (capacity < classCount) capacity *= 2;
			keepFlags = new Uint8Array(capacity);
		}
		let didDrop = false;
		let tokenCharCount = 0;
		for (let index = classCount - 1; index >= 0; index -= 1) {
			const className = classNames[index];
			tokenCharCount += className.length;
			const descriptor = getClassDescriptor(className);
			if (descriptor.isExternal) {
				keepFlags[index] = 1;
				continue;
			}
			const classId = descriptor.classId;
			if (claimedGeneration[classId] === generation) {
				keepFlags[index] = 0;
				didDrop = true;
				continue;
			}
			claimedGeneration[classId] = generation;
			const conflictIds = descriptor.conflictIds;
			for (let conflictIndex = 0; conflictIndex < conflictIds.length; conflictIndex++) claimedGeneration[conflictIds[conflictIndex]] = generation;
			keepFlags[index] = 1;
		}
		if (!didDrop && !splitSawNonSpaceWhitespace && classList.length === tokenCharCount + classCount - 1) return classList;
		let result = "";
		for (let index = 0; index < classCount; index++) if (keepFlags[index] === 1) {
			if (result) result += " ";
			result += classNames[index];
		}
		return result;
	};
	return {
		parseClassName,
		sortModifiers,
		postfixLookupClassGroupIds,
		getClassGroupId,
		getConflictingClassGroupIds,
		getClassDescriptor,
		mergeClassList
	};
};
var createPostfixLookupClassGroupIds = (config) => {
	const lookup = Object.create(null);
	const classGroupIds = config.postfixLookupClassGroups;
	if (classGroupIds) for (let index = 0; index < classGroupIds.length; index++) lookup[classGroupIds[index]] = true;
	return lookup;
};
var twJoin = (...classLists) => {
	let index = 0;
	let argument;
	let resolvedValue;
	let string = "";
	while (index < classLists.length) if (argument = classLists[index++]) {
		if (resolvedValue = toValue(argument)) {
			if (string) string += " ";
			string += resolvedValue;
		}
	}
	return string;
};
var toValue = (value) => {
	if (typeof value === "string") return value;
	let resolvedValue;
	let string = "";
	for (let index = 0; index < value.length; index++) if (value[index]) {
		if (resolvedValue = toValue(value[index])) {
			if (string) string += " ";
			string += resolvedValue;
		}
	}
	return string;
};
/**
* Whole-string result cache capacity. Matches tailwind-merge's default; cnfast ships a single,
* non-configurable config so it is baked in rather than exposed as an option.
*/
var MERGE_CACHE_SIZE = 500;
var createTailwindMerge = (createConfig) => {
	let configUtils;
	let mergeClassList;
	let cache = Object.create(null);
	let previousCache = Object.create(null);
	let cacheSize = 0;
	const initTailwindMerge = (classList) => {
		configUtils = createConfigUtils(createConfig());
		mergeClassList = configUtils.mergeClassList;
		merge.mergeString = tailwindMerge;
		return tailwindMerge(classList);
	};
	const tailwindMerge = (classList) => {
		let result = cache[classList];
		if (result !== void 0) return result;
		result = previousCache[classList];
		if (result === void 0) result = mergeClassList(classList);
		cache[classList] = result;
		if (++cacheSize > MERGE_CACHE_SIZE) {
			cacheSize = 0;
			previousCache = cache;
			cache = Object.create(null);
		}
		return result;
	};
	const merge = (...args) => merge.mergeString(twJoin(...args));
	merge.mergeString = initTailwindMerge;
	return merge;
};
var fallbackThemeArr = [];
var fromTheme = (key) => {
	const themeGetter = (theme) => theme[key] || fallbackThemeArr;
	themeGetter.isThemeGetter = true;
	return themeGetter;
};
var arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
var arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
var fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var toNumber = Number;
var numberIsNaN = Number.isNaN;
var numberIsInteger = Number.isInteger;
var isFraction = (value) => fractionRegex.test(value);
var isNumber = (value) => Boolean(value) && !numberIsNaN(toNumber(value));
var isInteger = (value) => Boolean(value) && numberIsInteger(toNumber(value));
var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var isAny = () => true;
var isLengthOnly = (value) => lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
var isNamedContainerQuery = (value) => value.startsWith("@container") && (value[10] === "/" && value[11] !== void 0 || value[11] === "s" && value[16] !== void 0 && value.startsWith("-size/", 10) || value[11] === "n" && value[18] !== void 0 && value.startsWith("-normal/", 10));
var isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
var isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
var isArbitraryWeight = (value) => getIsArbitraryValue(value, isLabelWeight, isAny);
var isArbitraryFamilyName = (value) => getIsArbitraryValue(value, isLabelFamilyName, isNever);
var isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
var isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
var isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
var isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
var isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
var isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
var isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
var isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
var isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
var isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
var isArbitraryVariableWeight = (value) => getIsArbitraryVariable(value, isLabelWeight, true);
var getIsArbitraryValue = (value, testLabel, testValue) => {
	const result = arbitraryValueRegex.exec(value);
	if (result) {
		if (result[1]) return testLabel(result[1]);
		return testValue(result[2]);
	}
	return false;
};
var getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
	const result = arbitraryVariableRegex.exec(value);
	if (result) {
		if (result[1]) return testLabel(result[1]);
		return shouldMatchNoLabel;
	}
	return false;
};
var isLabelPosition = (label) => label === "position" || label === "percentage";
var isLabelImage = (label) => label === "image" || label === "url";
var isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
var isLabelLength = (label) => label === "length";
var isLabelNumber = (label) => label === "number";
var isLabelFamilyName = (label) => label === "family-name";
var isLabelWeight = (label) => label === "number" || label === "weight";
var isLabelShadow = (label) => label === "shadow";
var getDefaultConfig = () => {
	/**
	* Theme getters for theme variable namespaces
	* @see https://tailwindcss.com/docs/theme#theme-variable-namespaces
	*/
	const themeColor = fromTheme("color");
	const themeFont = fromTheme("font");
	const themeText = fromTheme("text");
	const themeFontWeight = fromTheme("font-weight");
	const themeTracking = fromTheme("tracking");
	const themeLeading = fromTheme("leading");
	const themeBreakpoint = fromTheme("breakpoint");
	const themeContainer = fromTheme("container");
	const themeSpacing = fromTheme("spacing");
	const themeRadius = fromTheme("radius");
	const themeShadow = fromTheme("shadow");
	const themeInsetShadow = fromTheme("inset-shadow");
	const themeTextShadow = fromTheme("text-shadow");
	const themeDropShadow = fromTheme("drop-shadow");
	const themeBlur = fromTheme("blur");
	const themePerspective = fromTheme("perspective");
	const themeAspect = fromTheme("aspect");
	const themeEase = fromTheme("ease");
	const themeAnimate = fromTheme("animate");
	/**
	* Helpers to avoid repeating the same scales
	*
	* We use functions that create a new array every time they're called instead of static arrays.
	* This ensures that users who modify any scale by mutating the array (e.g. with `array.push(element)`) don't accidentally mutate arrays in other parts of the config.
	*/
	const scaleBreak = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	];
	const scalePosition = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	];
	const scalePositionWithArbitrary = () => [
		...scalePosition(),
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleOverflow = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	];
	const scaleOverscroll = () => [
		"auto",
		"contain",
		"none"
	];
	const scaleUnambiguousSpacing = () => [
		isArbitraryVariable,
		isArbitraryValue,
		themeSpacing
	];
	const scaleInset = () => [
		isFraction,
		"full",
		"auto",
		...scaleUnambiguousSpacing()
	];
	const scaleGridTemplateColsRows = () => [
		isInteger,
		"none",
		"subgrid",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridColRowStartAndEnd = () => [
		"auto",
		{ span: [
			"full",
			isInteger,
			isArbitraryVariable,
			isArbitraryValue
		] },
		isInteger,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridColRowStartOrEnd = () => [
		isInteger,
		"auto",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridAutoColsRows = () => [
		"auto",
		"min",
		"max",
		"fr",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleAlignPrimaryAxis = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	];
	const scaleAlignSecondaryAxis = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	];
	const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
	const scaleSizing = () => [
		isFraction,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleSizingInline = () => [
		isFraction,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleSizingBlock = () => [
		isFraction,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleColor = () => [
		themeColor,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleBgPosition = () => [
		...scalePosition(),
		isArbitraryVariablePosition,
		isArbitraryPosition,
		{ position: [isArbitraryVariable, isArbitraryValue] }
	];
	const scaleBgRepeat = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }];
	const scaleBgSize = () => [
		"auto",
		"cover",
		"contain",
		isArbitraryVariableSize,
		isArbitrarySize,
		{ size: [isArbitraryVariable, isArbitraryValue] }
	];
	const scaleGradientStopPosition = () => [
		isPercent,
		isArbitraryVariableLength,
		isArbitraryLength
	];
	const scaleRadius = () => [
		"",
		"none",
		"full",
		themeRadius,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleBorderWidth = () => [
		"",
		isNumber,
		isArbitraryVariableLength,
		isArbitraryLength
	];
	const scaleLineStyle = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	];
	const scaleBlendMode = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	];
	const scaleMaskImagePosition = () => [
		isNumber,
		isPercent,
		isArbitraryVariablePosition,
		isArbitraryPosition
	];
	const scaleBlur = () => [
		"",
		"none",
		themeBlur,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleRotate = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleScale = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleSkew = () => [
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleTranslate = () => [
		isFraction,
		"full",
		...scaleUnambiguousSpacing()
	];
	return {
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [isTshirtSize],
			breakpoint: [isTshirtSize],
			color: [isAny],
			container: [isTshirtSize],
			"drop-shadow": [isTshirtSize],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [isAnyNonArbitrary],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [isTshirtSize],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [isTshirtSize],
			shadow: [isTshirtSize],
			spacing: ["px", isNumber],
			text: [isTshirtSize],
			"text-shadow": [isTshirtSize],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			/**
			* Aspect Ratio
			* @see https://tailwindcss.com/docs/aspect-ratio
			*/
			aspect: [{ aspect: [
				"auto",
				"square",
				isFraction,
				isArbitraryValue,
				isArbitraryVariable,
				themeAspect
			] }],
			/**
			* Container
			* @see https://tailwindcss.com/docs/container
			* @deprecated since Tailwind CSS v4.0.0
			*/
			container: ["container"],
			/**
			* Container Type
			* @see https://tailwindcss.com/docs/responsive-design#container-queries
			*/
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Container Name
			* @see https://tailwindcss.com/docs/responsive-design#named-containers
			*/
			"container-named": [isNamedContainerQuery],
			/**
			* Columns
			* @see https://tailwindcss.com/docs/columns
			*/
			columns: [{ columns: [
				isNumber,
				isArbitraryValue,
				isArbitraryVariable,
				themeContainer
			] }],
			/**
			* Break After
			* @see https://tailwindcss.com/docs/break-after
			*/
			"break-after": [{ "break-after": scaleBreak() }],
			/**
			* Break Before
			* @see https://tailwindcss.com/docs/break-before
			*/
			"break-before": [{ "break-before": scaleBreak() }],
			/**
			* Break Inside
			* @see https://tailwindcss.com/docs/break-inside
			*/
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			/**
			* Box Decoration Break
			* @see https://tailwindcss.com/docs/box-decoration-break
			*/
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			/**
			* Box Sizing
			* @see https://tailwindcss.com/docs/box-sizing
			*/
			box: [{ box: ["border", "content"] }],
			/**
			* Display
			* @see https://tailwindcss.com/docs/display
			*/
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			/**
			* Screen Reader Only
			* @see https://tailwindcss.com/docs/display#screen-reader-only
			*/
			sr: ["sr-only", "not-sr-only"],
			/**
			* Floats
			* @see https://tailwindcss.com/docs/float
			*/
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			/**
			* Clear
			* @see https://tailwindcss.com/docs/clear
			*/
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			/**
			* Isolation
			* @see https://tailwindcss.com/docs/isolation
			*/
			isolation: ["isolate", "isolation-auto"],
			/**
			* Object Fit
			* @see https://tailwindcss.com/docs/object-fit
			*/
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			/**
			* Object Position
			* @see https://tailwindcss.com/docs/object-position
			*/
			"object-position": [{ object: scalePositionWithArbitrary() }],
			/**
			* Overflow
			* @see https://tailwindcss.com/docs/overflow
			*/
			overflow: [{ overflow: scaleOverflow() }],
			/**
			* Overflow X
			* @see https://tailwindcss.com/docs/overflow
			*/
			"overflow-x": [{ "overflow-x": scaleOverflow() }],
			/**
			* Overflow Y
			* @see https://tailwindcss.com/docs/overflow
			*/
			"overflow-y": [{ "overflow-y": scaleOverflow() }],
			/**
			* Overscroll Behavior
			* @see https://tailwindcss.com/docs/overscroll-behavior
			*/
			overscroll: [{ overscroll: scaleOverscroll() }],
			/**
			* Overscroll Behavior X
			* @see https://tailwindcss.com/docs/overscroll-behavior
			*/
			"overscroll-x": [{ "overscroll-x": scaleOverscroll() }],
			/**
			* Overscroll Behavior Y
			* @see https://tailwindcss.com/docs/overscroll-behavior
			*/
			"overscroll-y": [{ "overscroll-y": scaleOverscroll() }],
			/**
			* Position
			* @see https://tailwindcss.com/docs/position
			*/
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			/**
			* Inset
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			inset: [{ inset: scaleInset() }],
			/**
			* Inset Inline
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-x": [{ "inset-x": scaleInset() }],
			/**
			* Inset Block
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-y": [{ "inset-y": scaleInset() }],
			/**
			* Inset Inline Start
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			* @todo class group will be renamed to `inset-s` in next major release
			*/
			start: [{
				"inset-s": scaleInset(),
				/**
				* @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
				* @see https://github.com/tailwindlabs/tailwindcss/pull/19613
				*/
				start: scaleInset()
			}],
			/**
			* Inset Inline End
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			* @todo class group will be renamed to `inset-e` in next major release
			*/
			end: [{
				"inset-e": scaleInset(),
				/**
				* @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
				* @see https://github.com/tailwindlabs/tailwindcss/pull/19613
				*/
				end: scaleInset()
			}],
			/**
			* Inset Block Start
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-bs": [{ "inset-bs": scaleInset() }],
			/**
			* Inset Block End
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-be": [{ "inset-be": scaleInset() }],
			/**
			* Top
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			top: [{ top: scaleInset() }],
			/**
			* Right
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			right: [{ right: scaleInset() }],
			/**
			* Bottom
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			bottom: [{ bottom: scaleInset() }],
			/**
			* Left
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			left: [{ left: scaleInset() }],
			/**
			* Visibility
			* @see https://tailwindcss.com/docs/visibility
			*/
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			/**
			* Z-Index
			* @see https://tailwindcss.com/docs/z-index
			*/
			z: [{ z: [
				isInteger,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Flex Basis
			* @see https://tailwindcss.com/docs/flex-basis
			*/
			basis: [{ basis: [
				isFraction,
				"full",
				"auto",
				themeContainer,
				...scaleUnambiguousSpacing()
			] }],
			/**
			* Flex Direction
			* @see https://tailwindcss.com/docs/flex-direction
			*/
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			/**
			* Flex Wrap
			* @see https://tailwindcss.com/docs/flex-wrap
			*/
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			/**
			* Flex
			* @see https://tailwindcss.com/docs/flex
			*/
			flex: [{ flex: [
				isNumber,
				isFraction,
				"auto",
				"initial",
				"none",
				isArbitraryValue
			] }],
			/**
			* Flex Grow
			* @see https://tailwindcss.com/docs/flex-grow
			*/
			grow: [{ grow: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Flex Shrink
			* @see https://tailwindcss.com/docs/flex-shrink
			*/
			shrink: [{ shrink: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Order
			* @see https://tailwindcss.com/docs/order
			*/
			order: [{ order: [
				isInteger,
				"first",
				"last",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Grid Template Columns
			* @see https://tailwindcss.com/docs/grid-template-columns
			*/
			"grid-cols": [{ "grid-cols": scaleGridTemplateColsRows() }],
			/**
			* Grid Column Start / End
			* @see https://tailwindcss.com/docs/grid-column
			*/
			"col-start-end": [{ col: scaleGridColRowStartAndEnd() }],
			/**
			* Grid Column Start
			* @see https://tailwindcss.com/docs/grid-column
			*/
			"col-start": [{ "col-start": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Column End
			* @see https://tailwindcss.com/docs/grid-column
			*/
			"col-end": [{ "col-end": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Template Rows
			* @see https://tailwindcss.com/docs/grid-template-rows
			*/
			"grid-rows": [{ "grid-rows": scaleGridTemplateColsRows() }],
			/**
			* Grid Row Start / End
			* @see https://tailwindcss.com/docs/grid-row
			*/
			"row-start-end": [{ row: scaleGridColRowStartAndEnd() }],
			/**
			* Grid Row Start
			* @see https://tailwindcss.com/docs/grid-row
			*/
			"row-start": [{ "row-start": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Row End
			* @see https://tailwindcss.com/docs/grid-row
			*/
			"row-end": [{ "row-end": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Auto Flow
			* @see https://tailwindcss.com/docs/grid-auto-flow
			*/
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			/**
			* Grid Auto Columns
			* @see https://tailwindcss.com/docs/grid-auto-columns
			*/
			"auto-cols": [{ "auto-cols": scaleGridAutoColsRows() }],
			/**
			* Grid Auto Rows
			* @see https://tailwindcss.com/docs/grid-auto-rows
			*/
			"auto-rows": [{ "auto-rows": scaleGridAutoColsRows() }],
			/**
			* Gap
			* @see https://tailwindcss.com/docs/gap
			*/
			gap: [{ gap: scaleUnambiguousSpacing() }],
			/**
			* Gap X
			* @see https://tailwindcss.com/docs/gap
			*/
			"gap-x": [{ "gap-x": scaleUnambiguousSpacing() }],
			/**
			* Gap Y
			* @see https://tailwindcss.com/docs/gap
			*/
			"gap-y": [{ "gap-y": scaleUnambiguousSpacing() }],
			/**
			* Justify Content
			* @see https://tailwindcss.com/docs/justify-content
			*/
			"justify-content": [{ justify: [...scaleAlignPrimaryAxis(), "normal"] }],
			/**
			* Justify Items
			* @see https://tailwindcss.com/docs/justify-items
			*/
			"justify-items": [{ "justify-items": [...scaleAlignSecondaryAxis(), "normal"] }],
			/**
			* Justify Self
			* @see https://tailwindcss.com/docs/justify-self
			*/
			"justify-self": [{ "justify-self": ["auto", ...scaleAlignSecondaryAxis()] }],
			/**
			* Align Content
			* @see https://tailwindcss.com/docs/align-content
			*/
			"align-content": [{ content: ["normal", ...scaleAlignPrimaryAxis()] }],
			/**
			* Align Items
			* @see https://tailwindcss.com/docs/align-items
			*/
			"align-items": [{ items: [...scaleAlignSecondaryAxis(), { baseline: ["", "last"] }] }],
			/**
			* Align Self
			* @see https://tailwindcss.com/docs/align-self
			*/
			"align-self": [{ self: [
				"auto",
				...scaleAlignSecondaryAxis(),
				{ baseline: ["", "last"] }
			] }],
			/**
			* Place Content
			* @see https://tailwindcss.com/docs/place-content
			*/
			"place-content": [{ "place-content": scaleAlignPrimaryAxis() }],
			/**
			* Place Items
			* @see https://tailwindcss.com/docs/place-items
			*/
			"place-items": [{ "place-items": [...scaleAlignSecondaryAxis(), "baseline"] }],
			/**
			* Place Self
			* @see https://tailwindcss.com/docs/place-self
			*/
			"place-self": [{ "place-self": ["auto", ...scaleAlignSecondaryAxis()] }],
			/**
			* Padding
			* @see https://tailwindcss.com/docs/padding
			*/
			p: [{ p: scaleUnambiguousSpacing() }],
			/**
			* Padding Inline
			* @see https://tailwindcss.com/docs/padding
			*/
			px: [{ px: scaleUnambiguousSpacing() }],
			/**
			* Padding Block
			* @see https://tailwindcss.com/docs/padding
			*/
			py: [{ py: scaleUnambiguousSpacing() }],
			/**
			* Padding Inline Start
			* @see https://tailwindcss.com/docs/padding
			*/
			ps: [{ ps: scaleUnambiguousSpacing() }],
			/**
			* Padding Inline End
			* @see https://tailwindcss.com/docs/padding
			*/
			pe: [{ pe: scaleUnambiguousSpacing() }],
			/**
			* Padding Block Start
			* @see https://tailwindcss.com/docs/padding
			*/
			pbs: [{ pbs: scaleUnambiguousSpacing() }],
			/**
			* Padding Block End
			* @see https://tailwindcss.com/docs/padding
			*/
			pbe: [{ pbe: scaleUnambiguousSpacing() }],
			/**
			* Padding Top
			* @see https://tailwindcss.com/docs/padding
			*/
			pt: [{ pt: scaleUnambiguousSpacing() }],
			/**
			* Padding Right
			* @see https://tailwindcss.com/docs/padding
			*/
			pr: [{ pr: scaleUnambiguousSpacing() }],
			/**
			* Padding Bottom
			* @see https://tailwindcss.com/docs/padding
			*/
			pb: [{ pb: scaleUnambiguousSpacing() }],
			/**
			* Padding Left
			* @see https://tailwindcss.com/docs/padding
			*/
			pl: [{ pl: scaleUnambiguousSpacing() }],
			/**
			* Margin
			* @see https://tailwindcss.com/docs/margin
			*/
			m: [{ m: scaleMargin() }],
			/**
			* Margin Inline
			* @see https://tailwindcss.com/docs/margin
			*/
			mx: [{ mx: scaleMargin() }],
			/**
			* Margin Block
			* @see https://tailwindcss.com/docs/margin
			*/
			my: [{ my: scaleMargin() }],
			/**
			* Margin Inline Start
			* @see https://tailwindcss.com/docs/margin
			*/
			ms: [{ ms: scaleMargin() }],
			/**
			* Margin Inline End
			* @see https://tailwindcss.com/docs/margin
			*/
			me: [{ me: scaleMargin() }],
			/**
			* Margin Block Start
			* @see https://tailwindcss.com/docs/margin
			*/
			mbs: [{ mbs: scaleMargin() }],
			/**
			* Margin Block End
			* @see https://tailwindcss.com/docs/margin
			*/
			mbe: [{ mbe: scaleMargin() }],
			/**
			* Margin Top
			* @see https://tailwindcss.com/docs/margin
			*/
			mt: [{ mt: scaleMargin() }],
			/**
			* Margin Right
			* @see https://tailwindcss.com/docs/margin
			*/
			mr: [{ mr: scaleMargin() }],
			/**
			* Margin Bottom
			* @see https://tailwindcss.com/docs/margin
			*/
			mb: [{ mb: scaleMargin() }],
			/**
			* Margin Left
			* @see https://tailwindcss.com/docs/margin
			*/
			ml: [{ ml: scaleMargin() }],
			/**
			* Space Between X
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-x": [{ "space-x": scaleUnambiguousSpacing() }],
			/**
			* Space Between X Reverse
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-x-reverse": ["space-x-reverse"],
			/**
			* Space Between Y
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-y": [{ "space-y": scaleUnambiguousSpacing() }],
			/**
			* Space Between Y Reverse
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-y-reverse": ["space-y-reverse"],
			/**
			* Size
			* @see https://tailwindcss.com/docs/width#setting-both-width-and-height
			*/
			size: [{ size: scaleSizing() }],
			/**
			* Inline Size
			* @see https://tailwindcss.com/docs/width
			*/
			"inline-size": [{ inline: ["auto", ...scaleSizingInline()] }],
			/**
			* Min-Inline Size
			* @see https://tailwindcss.com/docs/min-width
			*/
			"min-inline-size": [{ "min-inline": ["auto", ...scaleSizingInline()] }],
			/**
			* Max-Inline Size
			* @see https://tailwindcss.com/docs/max-width
			*/
			"max-inline-size": [{ "max-inline": ["none", ...scaleSizingInline()] }],
			/**
			* Block Size
			* @see https://tailwindcss.com/docs/height
			*/
			"block-size": [{ block: ["auto", ...scaleSizingBlock()] }],
			/**
			* Min-Block Size
			* @see https://tailwindcss.com/docs/min-height
			*/
			"min-block-size": [{ "min-block": ["auto", ...scaleSizingBlock()] }],
			/**
			* Max-Block Size
			* @see https://tailwindcss.com/docs/max-height
			*/
			"max-block-size": [{ "max-block": ["none", ...scaleSizingBlock()] }],
			/**
			* Width
			* @see https://tailwindcss.com/docs/width
			*/
			w: [{ w: [
				themeContainer,
				"screen",
				...scaleSizing()
			] }],
			/**
			* Min-Width
			* @see https://tailwindcss.com/docs/min-width
			*/
			"min-w": [{ "min-w": [
				themeContainer,
				"screen",
				"none",
				...scaleSizing()
			] }],
			/**
			* Max-Width
			* @see https://tailwindcss.com/docs/max-width
			*/
			"max-w": [{ "max-w": [
				themeContainer,
				"screen",
				"none",
				"prose",
				(
				/** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
				{ screen: [themeBreakpoint] }),
				...scaleSizing()
			] }],
			/**
			* Height
			* @see https://tailwindcss.com/docs/height
			*/
			h: [{ h: [
				"screen",
				"lh",
				...scaleSizing()
			] }],
			/**
			* Min-Height
			* @see https://tailwindcss.com/docs/min-height
			*/
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...scaleSizing()
			] }],
			/**
			* Max-Height
			* @see https://tailwindcss.com/docs/max-height
			*/
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...scaleSizing()
			] }],
			/**
			* Font Size
			* @see https://tailwindcss.com/docs/font-size
			*/
			"font-size": [{ text: [
				"base",
				themeText,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			/**
			* Font Smoothing
			* @see https://tailwindcss.com/docs/font-smoothing
			*/
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			/**
			* Font Style
			* @see https://tailwindcss.com/docs/font-style
			*/
			"font-style": ["italic", "not-italic"],
			/**
			* Font Weight
			* @see https://tailwindcss.com/docs/font-weight
			*/
			"font-weight": [{ font: [
				themeFontWeight,
				isArbitraryVariableWeight,
				isArbitraryWeight
			] }],
			/**
			* Font Stretch
			* @see https://tailwindcss.com/docs/font-stretch
			*/
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				isPercent,
				isArbitraryValue
			] }],
			/**
			* Font Family
			* @see https://tailwindcss.com/docs/font-family
			*/
			"font-family": [{ font: [
				isArbitraryVariableFamilyName,
				isArbitraryFamilyName,
				themeFont
			] }],
			/**
			* Font Feature Settings
			* @see https://tailwindcss.com/docs/font-feature-settings
			*/
			"font-features": [{ "font-features": [isArbitraryValue] }],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-normal": ["normal-nums"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-ordinal": ["ordinal"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-slashed-zero": ["slashed-zero"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			/**
			* Letter Spacing
			* @see https://tailwindcss.com/docs/letter-spacing
			*/
			tracking: [{ tracking: [
				themeTracking,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Line Clamp
			* @see https://tailwindcss.com/docs/line-clamp
			*/
			"line-clamp": [{ "line-clamp": [
				isNumber,
				"none",
				isArbitraryVariable,
				isArbitraryNumber
			] }],
			/**
			* Line Height
			* @see https://tailwindcss.com/docs/line-height
			*/
			leading: [{ leading: [themeLeading, ...scaleUnambiguousSpacing()] }],
			/**
			* List Style Image
			* @see https://tailwindcss.com/docs/list-style-image
			*/
			"list-image": [{ "list-image": [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* List Style Position
			* @see https://tailwindcss.com/docs/list-style-position
			*/
			"list-style-position": [{ list: ["inside", "outside"] }],
			/**
			* List Style Type
			* @see https://tailwindcss.com/docs/list-style-type
			*/
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Text Alignment
			* @see https://tailwindcss.com/docs/text-align
			*/
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			/**
			* Placeholder Color
			* @deprecated since Tailwind CSS v3.0.0
			* @see https://v3.tailwindcss.com/docs/placeholder-color
			*/
			"placeholder-color": [{ placeholder: scaleColor() }],
			/**
			* Text Color
			* @see https://tailwindcss.com/docs/text-color
			*/
			"text-color": [{ text: scaleColor() }],
			/**
			* Text Decoration
			* @see https://tailwindcss.com/docs/text-decoration
			*/
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			/**
			* Text Decoration Style
			* @see https://tailwindcss.com/docs/text-decoration-style
			*/
			"text-decoration-style": [{ decoration: [...scaleLineStyle(), "wavy"] }],
			/**
			* Text Decoration Thickness
			* @see https://tailwindcss.com/docs/text-decoration-thickness
			*/
			"text-decoration-thickness": [{ decoration: [
				isNumber,
				"from-font",
				"auto",
				isArbitraryVariable,
				isArbitraryLength
			] }],
			/**
			* Text Decoration Color
			* @see https://tailwindcss.com/docs/text-decoration-color
			*/
			"text-decoration-color": [{ decoration: scaleColor() }],
			/**
			* Text Underline Offset
			* @see https://tailwindcss.com/docs/text-underline-offset
			*/
			"underline-offset": [{ "underline-offset": [
				isNumber,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Text Transform
			* @see https://tailwindcss.com/docs/text-transform
			*/
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			/**
			* Text Overflow
			* @see https://tailwindcss.com/docs/text-overflow
			*/
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			/**
			* Text Wrap
			* @see https://tailwindcss.com/docs/text-wrap
			*/
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			/**
			* Text Indent
			* @see https://tailwindcss.com/docs/text-indent
			*/
			indent: [{ indent: scaleUnambiguousSpacing() }],
			/**
			* Tab Size
			* @see https://tailwindcss.com/docs/tab-size
			*/
			"tab-size": [{ tab: [
				isInteger,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Vertical Alignment
			* @see https://tailwindcss.com/docs/vertical-align
			*/
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Whitespace
			* @see https://tailwindcss.com/docs/whitespace
			*/
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			/**
			* Word Break
			* @see https://tailwindcss.com/docs/word-break
			*/
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			/**
			* Overflow Wrap
			* @see https://tailwindcss.com/docs/overflow-wrap
			*/
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			/**
			* Hyphens
			* @see https://tailwindcss.com/docs/hyphens
			*/
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			/**
			* Content
			* @see https://tailwindcss.com/docs/content
			*/
			content: [{ content: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Background Attachment
			* @see https://tailwindcss.com/docs/background-attachment
			*/
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			/**
			* Background Clip
			* @see https://tailwindcss.com/docs/background-clip
			*/
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			/**
			* Background Origin
			* @see https://tailwindcss.com/docs/background-origin
			*/
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			/**
			* Background Position
			* @see https://tailwindcss.com/docs/background-position
			*/
			"bg-position": [{ bg: scaleBgPosition() }],
			/**
			* Background Repeat
			* @see https://tailwindcss.com/docs/background-repeat
			*/
			"bg-repeat": [{ bg: scaleBgRepeat() }],
			/**
			* Background Size
			* @see https://tailwindcss.com/docs/background-size
			*/
			"bg-size": [{ bg: scaleBgSize() }],
			/**
			* Background Image
			* @see https://tailwindcss.com/docs/background-image
			*/
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					],
					radial: [
						"",
						isArbitraryVariable,
						isArbitraryValue
					],
					conic: [
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					]
				},
				isArbitraryVariableImage,
				isArbitraryImage
			] }],
			/**
			* Background Color
			* @see https://tailwindcss.com/docs/background-color
			*/
			"bg-color": [{ bg: scaleColor() }],
			/**
			* Gradient Color Stops From Position
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-from-pos": [{ from: scaleGradientStopPosition() }],
			/**
			* Gradient Color Stops Via Position
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-via-pos": [{ via: scaleGradientStopPosition() }],
			/**
			* Gradient Color Stops To Position
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-to-pos": [{ to: scaleGradientStopPosition() }],
			/**
			* Gradient Color Stops From
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-from": [{ from: scaleColor() }],
			/**
			* Gradient Color Stops Via
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-via": [{ via: scaleColor() }],
			/**
			* Gradient Color Stops To
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-to": [{ to: scaleColor() }],
			/**
			* Border Radius
			* @see https://tailwindcss.com/docs/border-radius
			*/
			rounded: [{ rounded: scaleRadius() }],
			/**
			* Border Radius Start
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-s": [{ "rounded-s": scaleRadius() }],
			/**
			* Border Radius End
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-e": [{ "rounded-e": scaleRadius() }],
			/**
			* Border Radius Top
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-t": [{ "rounded-t": scaleRadius() }],
			/**
			* Border Radius Right
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-r": [{ "rounded-r": scaleRadius() }],
			/**
			* Border Radius Bottom
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-b": [{ "rounded-b": scaleRadius() }],
			/**
			* Border Radius Left
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-l": [{ "rounded-l": scaleRadius() }],
			/**
			* Border Radius Start Start
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-ss": [{ "rounded-ss": scaleRadius() }],
			/**
			* Border Radius Start End
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-se": [{ "rounded-se": scaleRadius() }],
			/**
			* Border Radius End End
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-ee": [{ "rounded-ee": scaleRadius() }],
			/**
			* Border Radius End Start
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-es": [{ "rounded-es": scaleRadius() }],
			/**
			* Border Radius Top Left
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-tl": [{ "rounded-tl": scaleRadius() }],
			/**
			* Border Radius Top Right
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-tr": [{ "rounded-tr": scaleRadius() }],
			/**
			* Border Radius Bottom Right
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-br": [{ "rounded-br": scaleRadius() }],
			/**
			* Border Radius Bottom Left
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-bl": [{ "rounded-bl": scaleRadius() }],
			/**
			* Border Width
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w": [{ border: scaleBorderWidth() }],
			/**
			* Border Width Inline
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-x": [{ "border-x": scaleBorderWidth() }],
			/**
			* Border Width Block
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-y": [{ "border-y": scaleBorderWidth() }],
			/**
			* Border Width Inline Start
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-s": [{ "border-s": scaleBorderWidth() }],
			/**
			* Border Width Inline End
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-e": [{ "border-e": scaleBorderWidth() }],
			/**
			* Border Width Block Start
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-bs": [{ "border-bs": scaleBorderWidth() }],
			/**
			* Border Width Block End
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-be": [{ "border-be": scaleBorderWidth() }],
			/**
			* Border Width Top
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-t": [{ "border-t": scaleBorderWidth() }],
			/**
			* Border Width Right
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-r": [{ "border-r": scaleBorderWidth() }],
			/**
			* Border Width Bottom
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-b": [{ "border-b": scaleBorderWidth() }],
			/**
			* Border Width Left
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-l": [{ "border-l": scaleBorderWidth() }],
			/**
			* Divide Width X
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-x": [{ "divide-x": scaleBorderWidth() }],
			/**
			* Divide Width X Reverse
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-x-reverse": ["divide-x-reverse"],
			/**
			* Divide Width Y
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-y": [{ "divide-y": scaleBorderWidth() }],
			/**
			* Divide Width Y Reverse
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-y-reverse": ["divide-y-reverse"],
			/**
			* Border Style
			* @see https://tailwindcss.com/docs/border-style
			*/
			"border-style": [{ border: [
				...scaleLineStyle(),
				"hidden",
				"none"
			] }],
			/**
			* Divide Style
			* @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
			*/
			"divide-style": [{ divide: [
				...scaleLineStyle(),
				"hidden",
				"none"
			] }],
			/**
			* Border Color
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color": [{ border: scaleColor() }],
			/**
			* Border Color Inline
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-x": [{ "border-x": scaleColor() }],
			/**
			* Border Color Block
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-y": [{ "border-y": scaleColor() }],
			/**
			* Border Color Inline Start
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-s": [{ "border-s": scaleColor() }],
			/**
			* Border Color Inline End
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-e": [{ "border-e": scaleColor() }],
			/**
			* Border Color Block Start
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-bs": [{ "border-bs": scaleColor() }],
			/**
			* Border Color Block End
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-be": [{ "border-be": scaleColor() }],
			/**
			* Border Color Top
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-t": [{ "border-t": scaleColor() }],
			/**
			* Border Color Right
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-r": [{ "border-r": scaleColor() }],
			/**
			* Border Color Bottom
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-b": [{ "border-b": scaleColor() }],
			/**
			* Border Color Left
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-l": [{ "border-l": scaleColor() }],
			/**
			* Divide Color
			* @see https://tailwindcss.com/docs/divide-color
			*/
			"divide-color": [{ divide: scaleColor() }],
			/**
			* Outline Style
			* @see https://tailwindcss.com/docs/outline-style
			*/
			"outline-style": [{ outline: [
				...scaleLineStyle(),
				"none",
				"hidden"
			] }],
			/**
			* Outline Offset
			* @see https://tailwindcss.com/docs/outline-offset
			*/
			"outline-offset": [{ "outline-offset": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Outline Width
			* @see https://tailwindcss.com/docs/outline-width
			*/
			"outline-w": [{ outline: [
				"",
				isNumber,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			/**
			* Outline Color
			* @see https://tailwindcss.com/docs/outline-color
			*/
			"outline-color": [{ outline: scaleColor() }],
			/**
			* Box Shadow
			* @see https://tailwindcss.com/docs/box-shadow
			*/
			shadow: [{ shadow: [
				"",
				"none",
				themeShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Box Shadow Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
			*/
			"shadow-color": [{ shadow: scaleColor() }],
			/**
			* Inset Box Shadow
			* @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
			*/
			"inset-shadow": [{ "inset-shadow": [
				"none",
				themeInsetShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Inset Box Shadow Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
			*/
			"inset-shadow-color": [{ "inset-shadow": scaleColor() }],
			/**
			* Ring Width
			* @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
			*/
			"ring-w": [{ ring: scaleBorderWidth() }],
			/**
			* Ring Width Inset
			* @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
			* @deprecated since Tailwind CSS v4.0.0
			* @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
			*/
			"ring-w-inset": ["ring-inset"],
			/**
			* Ring Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
			*/
			"ring-color": [{ ring: scaleColor() }],
			/**
			* Ring Offset Width
			* @see https://v3.tailwindcss.com/docs/ring-offset-width
			* @deprecated since Tailwind CSS v4.0.0
			* @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
			*/
			"ring-offset-w": [{ "ring-offset": [isNumber, isArbitraryLength] }],
			/**
			* Ring Offset Color
			* @see https://v3.tailwindcss.com/docs/ring-offset-color
			* @deprecated since Tailwind CSS v4.0.0
			* @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
			*/
			"ring-offset-color": [{ "ring-offset": scaleColor() }],
			/**
			* Inset Ring Width
			* @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
			*/
			"inset-ring-w": [{ "inset-ring": scaleBorderWidth() }],
			/**
			* Inset Ring Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
			*/
			"inset-ring-color": [{ "inset-ring": scaleColor() }],
			/**
			* Text Shadow
			* @see https://tailwindcss.com/docs/text-shadow
			*/
			"text-shadow": [{ "text-shadow": [
				"none",
				themeTextShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Text Shadow Color
			* @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
			*/
			"text-shadow-color": [{ "text-shadow": scaleColor() }],
			/**
			* Opacity
			* @see https://tailwindcss.com/docs/opacity
			*/
			opacity: [{ opacity: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Mix Blend Mode
			* @see https://tailwindcss.com/docs/mix-blend-mode
			*/
			"mix-blend": [{ "mix-blend": [
				...scaleBlendMode(),
				"plus-darker",
				"plus-lighter"
			] }],
			/**
			* Background Blend Mode
			* @see https://tailwindcss.com/docs/background-blend-mode
			*/
			"bg-blend": [{ "bg-blend": scaleBlendMode() }],
			/**
			* Mask Clip
			* @see https://tailwindcss.com/docs/mask-clip
			*/
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			/**
			* Mask Composite
			* @see https://tailwindcss.com/docs/mask-composite
			*/
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			/**
			* Mask Image
			* @see https://tailwindcss.com/docs/mask-image
			*/
			"mask-image-linear-pos": [{ "mask-linear": [isNumber] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": scaleMaskImagePosition() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": scaleMaskImagePosition() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": scaleColor() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": scaleColor() }],
			"mask-image-t-from-pos": [{ "mask-t-from": scaleMaskImagePosition() }],
			"mask-image-t-to-pos": [{ "mask-t-to": scaleMaskImagePosition() }],
			"mask-image-t-from-color": [{ "mask-t-from": scaleColor() }],
			"mask-image-t-to-color": [{ "mask-t-to": scaleColor() }],
			"mask-image-r-from-pos": [{ "mask-r-from": scaleMaskImagePosition() }],
			"mask-image-r-to-pos": [{ "mask-r-to": scaleMaskImagePosition() }],
			"mask-image-r-from-color": [{ "mask-r-from": scaleColor() }],
			"mask-image-r-to-color": [{ "mask-r-to": scaleColor() }],
			"mask-image-b-from-pos": [{ "mask-b-from": scaleMaskImagePosition() }],
			"mask-image-b-to-pos": [{ "mask-b-to": scaleMaskImagePosition() }],
			"mask-image-b-from-color": [{ "mask-b-from": scaleColor() }],
			"mask-image-b-to-color": [{ "mask-b-to": scaleColor() }],
			"mask-image-l-from-pos": [{ "mask-l-from": scaleMaskImagePosition() }],
			"mask-image-l-to-pos": [{ "mask-l-to": scaleMaskImagePosition() }],
			"mask-image-l-from-color": [{ "mask-l-from": scaleColor() }],
			"mask-image-l-to-color": [{ "mask-l-to": scaleColor() }],
			"mask-image-x-from-pos": [{ "mask-x-from": scaleMaskImagePosition() }],
			"mask-image-x-to-pos": [{ "mask-x-to": scaleMaskImagePosition() }],
			"mask-image-x-from-color": [{ "mask-x-from": scaleColor() }],
			"mask-image-x-to-color": [{ "mask-x-to": scaleColor() }],
			"mask-image-y-from-pos": [{ "mask-y-from": scaleMaskImagePosition() }],
			"mask-image-y-to-pos": [{ "mask-y-to": scaleMaskImagePosition() }],
			"mask-image-y-from-color": [{ "mask-y-from": scaleColor() }],
			"mask-image-y-to-color": [{ "mask-y-to": scaleColor() }],
			"mask-image-radial": [{ "mask-radial": [isArbitraryVariable, isArbitraryValue] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": scaleMaskImagePosition() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": scaleMaskImagePosition() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": scaleColor() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": scaleColor() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": scalePosition() }],
			"mask-image-conic-pos": [{ "mask-conic": [isNumber] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": scaleMaskImagePosition() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": scaleMaskImagePosition() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": scaleColor() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": scaleColor() }],
			/**
			* Mask Mode
			* @see https://tailwindcss.com/docs/mask-mode
			*/
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			/**
			* Mask Origin
			* @see https://tailwindcss.com/docs/mask-origin
			*/
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			/**
			* Mask Position
			* @see https://tailwindcss.com/docs/mask-position
			*/
			"mask-position": [{ mask: scaleBgPosition() }],
			/**
			* Mask Repeat
			* @see https://tailwindcss.com/docs/mask-repeat
			*/
			"mask-repeat": [{ mask: scaleBgRepeat() }],
			/**
			* Mask Size
			* @see https://tailwindcss.com/docs/mask-size
			*/
			"mask-size": [{ mask: scaleBgSize() }],
			/**
			* Mask Type
			* @see https://tailwindcss.com/docs/mask-type
			*/
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			/**
			* Mask Image
			* @see https://tailwindcss.com/docs/mask-image
			*/
			"mask-image": [{ mask: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Filter
			* @see https://tailwindcss.com/docs/filter
			*/
			filter: [{ filter: [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Blur
			* @see https://tailwindcss.com/docs/blur
			*/
			blur: [{ blur: scaleBlur() }],
			/**
			* Brightness
			* @see https://tailwindcss.com/docs/brightness
			*/
			brightness: [{ brightness: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Contrast
			* @see https://tailwindcss.com/docs/contrast
			*/
			contrast: [{ contrast: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Drop Shadow
			* @see https://tailwindcss.com/docs/drop-shadow
			*/
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				themeDropShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Drop Shadow Color
			* @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
			*/
			"drop-shadow-color": [{ "drop-shadow": scaleColor() }],
			/**
			* Grayscale
			* @see https://tailwindcss.com/docs/grayscale
			*/
			grayscale: [{ grayscale: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Hue Rotate
			* @see https://tailwindcss.com/docs/hue-rotate
			*/
			"hue-rotate": [{ "hue-rotate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Invert
			* @see https://tailwindcss.com/docs/invert
			*/
			invert: [{ invert: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Saturate
			* @see https://tailwindcss.com/docs/saturate
			*/
			saturate: [{ saturate: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Sepia
			* @see https://tailwindcss.com/docs/sepia
			*/
			sepia: [{ sepia: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Filter
			* @see https://tailwindcss.com/docs/backdrop-filter
			*/
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Blur
			* @see https://tailwindcss.com/docs/backdrop-blur
			*/
			"backdrop-blur": [{ "backdrop-blur": scaleBlur() }],
			/**
			* Backdrop Brightness
			* @see https://tailwindcss.com/docs/backdrop-brightness
			*/
			"backdrop-brightness": [{ "backdrop-brightness": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Contrast
			* @see https://tailwindcss.com/docs/backdrop-contrast
			*/
			"backdrop-contrast": [{ "backdrop-contrast": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Grayscale
			* @see https://tailwindcss.com/docs/backdrop-grayscale
			*/
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Hue Rotate
			* @see https://tailwindcss.com/docs/backdrop-hue-rotate
			*/
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Invert
			* @see https://tailwindcss.com/docs/backdrop-invert
			*/
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Opacity
			* @see https://tailwindcss.com/docs/backdrop-opacity
			*/
			"backdrop-opacity": [{ "backdrop-opacity": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Saturate
			* @see https://tailwindcss.com/docs/backdrop-saturate
			*/
			"backdrop-saturate": [{ "backdrop-saturate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Sepia
			* @see https://tailwindcss.com/docs/backdrop-sepia
			*/
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Border Collapse
			* @see https://tailwindcss.com/docs/border-collapse
			*/
			"border-collapse": [{ border: ["collapse", "separate"] }],
			/**
			* Border Spacing
			* @see https://tailwindcss.com/docs/border-spacing
			*/
			"border-spacing": [{ "border-spacing": scaleUnambiguousSpacing() }],
			/**
			* Border Spacing X
			* @see https://tailwindcss.com/docs/border-spacing
			*/
			"border-spacing-x": [{ "border-spacing-x": scaleUnambiguousSpacing() }],
			/**
			* Border Spacing Y
			* @see https://tailwindcss.com/docs/border-spacing
			*/
			"border-spacing-y": [{ "border-spacing-y": scaleUnambiguousSpacing() }],
			/**
			* Table Layout
			* @see https://tailwindcss.com/docs/table-layout
			*/
			"table-layout": [{ table: ["auto", "fixed"] }],
			/**
			* Caption Side
			* @see https://tailwindcss.com/docs/caption-side
			*/
			caption: [{ caption: ["top", "bottom"] }],
			/**
			* Transition Property
			* @see https://tailwindcss.com/docs/transition-property
			*/
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Transition Behavior
			* @see https://tailwindcss.com/docs/transition-behavior
			*/
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			/**
			* Transition Duration
			* @see https://tailwindcss.com/docs/transition-duration
			*/
			duration: [{ duration: [
				isNumber,
				"initial",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Transition Timing Function
			* @see https://tailwindcss.com/docs/transition-timing-function
			*/
			ease: [{ ease: [
				"linear",
				"initial",
				themeEase,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Transition Delay
			* @see https://tailwindcss.com/docs/transition-delay
			*/
			delay: [{ delay: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Animation
			* @see https://tailwindcss.com/docs/animation
			*/
			animate: [{ animate: [
				"none",
				themeAnimate,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backface Visibility
			* @see https://tailwindcss.com/docs/backface-visibility
			*/
			backface: [{ backface: ["hidden", "visible"] }],
			/**
			* Perspective
			* @see https://tailwindcss.com/docs/perspective
			*/
			perspective: [{ perspective: [
				themePerspective,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Perspective Origin
			* @see https://tailwindcss.com/docs/perspective-origin
			*/
			"perspective-origin": [{ "perspective-origin": scalePositionWithArbitrary() }],
			/**
			* Rotate
			* @see https://tailwindcss.com/docs/rotate
			*/
			rotate: [{ rotate: scaleRotate() }],
			/**
			* Rotate X
			* @see https://tailwindcss.com/docs/rotate
			*/
			"rotate-x": [{ "rotate-x": scaleRotate() }],
			/**
			* Rotate Y
			* @see https://tailwindcss.com/docs/rotate
			*/
			"rotate-y": [{ "rotate-y": scaleRotate() }],
			/**
			* Rotate Z
			* @see https://tailwindcss.com/docs/rotate
			*/
			"rotate-z": [{ "rotate-z": scaleRotate() }],
			/**
			* Scale
			* @see https://tailwindcss.com/docs/scale
			*/
			scale: [{ scale: scaleScale() }],
			/**
			* Scale X
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-x": [{ "scale-x": scaleScale() }],
			/**
			* Scale Y
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-y": [{ "scale-y": scaleScale() }],
			/**
			* Scale Z
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-z": [{ "scale-z": scaleScale() }],
			/**
			* Scale 3D
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-3d": ["scale-3d"],
			/**
			* Skew
			* @see https://tailwindcss.com/docs/skew
			*/
			skew: [{ skew: scaleSkew() }],
			/**
			* Skew X
			* @see https://tailwindcss.com/docs/skew
			*/
			"skew-x": [{ "skew-x": scaleSkew() }],
			/**
			* Skew Y
			* @see https://tailwindcss.com/docs/skew
			*/
			"skew-y": [{ "skew-y": scaleSkew() }],
			/**
			* Transform
			* @see https://tailwindcss.com/docs/transform
			*/
			transform: [{ transform: [
				isArbitraryVariable,
				isArbitraryValue,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			/**
			* Transform Origin
			* @see https://tailwindcss.com/docs/transform-origin
			*/
			"transform-origin": [{ origin: scalePositionWithArbitrary() }],
			/**
			* Transform Style
			* @see https://tailwindcss.com/docs/transform-style
			*/
			"transform-style": [{ transform: ["3d", "flat"] }],
			/**
			* Translate
			* @see https://tailwindcss.com/docs/translate
			*/
			translate: [{ translate: scaleTranslate() }],
			/**
			* Translate X
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-x": [{ "translate-x": scaleTranslate() }],
			/**
			* Translate Y
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-y": [{ "translate-y": scaleTranslate() }],
			/**
			* Translate Z
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-z": [{ "translate-z": scaleTranslate() }],
			/**
			* Translate None
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-none": ["translate-none"],
			/**
			* Zoom
			* @see https://tailwindcss.com/docs/zoom
			*/
			zoom: [{ zoom: [
				isInteger,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Accent Color
			* @see https://tailwindcss.com/docs/accent-color
			*/
			accent: [{ accent: scaleColor() }],
			/**
			* Appearance
			* @see https://tailwindcss.com/docs/appearance
			*/
			appearance: [{ appearance: ["none", "auto"] }],
			/**
			* Caret Color
			* @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
			*/
			"caret-color": [{ caret: scaleColor() }],
			/**
			* Color Scheme
			* @see https://tailwindcss.com/docs/color-scheme
			*/
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			/**
			* Cursor
			* @see https://tailwindcss.com/docs/cursor
			*/
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Field Sizing
			* @see https://tailwindcss.com/docs/field-sizing
			*/
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			/**
			* Pointer Events
			* @see https://tailwindcss.com/docs/pointer-events
			*/
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			/**
			* Resize
			* @see https://tailwindcss.com/docs/resize
			*/
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			/**
			* Scroll Behavior
			* @see https://tailwindcss.com/docs/scroll-behavior
			*/
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			/**
			* Scrollbar Thumb Color
			* @see https://tailwindcss.com/docs/scrollbar-color
			*/
			"scrollbar-thumb-color": [{ "scrollbar-thumb": scaleColor() }],
			/**
			* Scrollbar Track Color
			* @see https://tailwindcss.com/docs/scrollbar-color
			*/
			"scrollbar-track-color": [{ "scrollbar-track": scaleColor() }],
			/**
			* Scrollbar Gutter
			* @see https://tailwindcss.com/docs/scrollbar-gutter
			*/
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			/**
			* Scrollbar Width
			* @see https://tailwindcss.com/docs/scrollbar-width
			*/
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			/**
			* Scroll Margin
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-m": [{ "scroll-m": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Inline
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mx": [{ "scroll-mx": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Block
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-my": [{ "scroll-my": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Inline Start
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-ms": [{ "scroll-ms": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Inline End
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-me": [{ "scroll-me": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Block Start
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mbs": [{ "scroll-mbs": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Block End
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mbe": [{ "scroll-mbe": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Top
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mt": [{ "scroll-mt": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Right
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mr": [{ "scroll-mr": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Bottom
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mb": [{ "scroll-mb": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Left
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-ml": [{ "scroll-ml": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-p": [{ "scroll-p": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Inline
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-px": [{ "scroll-px": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Block
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-py": [{ "scroll-py": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Inline Start
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-ps": [{ "scroll-ps": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Inline End
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pe": [{ "scroll-pe": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Block Start
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pbs": [{ "scroll-pbs": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Block End
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pbe": [{ "scroll-pbe": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Top
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pt": [{ "scroll-pt": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Right
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pr": [{ "scroll-pr": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Bottom
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pb": [{ "scroll-pb": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Left
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pl": [{ "scroll-pl": scaleUnambiguousSpacing() }],
			/**
			* Scroll Snap Align
			* @see https://tailwindcss.com/docs/scroll-snap-align
			*/
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			/**
			* Scroll Snap Stop
			* @see https://tailwindcss.com/docs/scroll-snap-stop
			*/
			"snap-stop": [{ snap: ["normal", "always"] }],
			/**
			* Scroll Snap Type
			* @see https://tailwindcss.com/docs/scroll-snap-type
			*/
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			/**
			* Scroll Snap Type Strictness
			* @see https://tailwindcss.com/docs/scroll-snap-type
			*/
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			/**
			* Touch Action
			* @see https://tailwindcss.com/docs/touch-action
			*/
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			/**
			* Touch Action X
			* @see https://tailwindcss.com/docs/touch-action
			*/
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			/**
			* Touch Action Y
			* @see https://tailwindcss.com/docs/touch-action
			*/
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			/**
			* Touch Action Pinch Zoom
			* @see https://tailwindcss.com/docs/touch-action
			*/
			"touch-pz": ["touch-pinch-zoom"],
			/**
			* User Select
			* @see https://tailwindcss.com/docs/user-select
			*/
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			/**
			* Will Change
			* @see https://tailwindcss.com/docs/will-change
			*/
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Fill
			* @see https://tailwindcss.com/docs/fill
			*/
			fill: [{ fill: ["none", ...scaleColor()] }],
			/**
			* Stroke Width
			* @see https://tailwindcss.com/docs/stroke-width
			*/
			"stroke-w": [{ stroke: [
				isNumber,
				isArbitraryVariableLength,
				isArbitraryLength,
				isArbitraryNumber
			] }],
			/**
			* Stroke
			* @see https://tailwindcss.com/docs/stroke
			*/
			stroke: [{ stroke: ["none", ...scaleColor()] }],
			/**
			* Forced Color Adjust
			* @see https://tailwindcss.com/docs/forced-color-adjust
			*/
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
};
var twMerge = createTailwindMerge(getDefaultConfig);
/**
* Max distinct interpolation tuples remembered per call site. Real tagged-template sites cycle
* through a tiny set of dynamic values (a boolean toggling one class, a small variant union), so
* this stays small; the bound only guards a site that interpolates high-cardinality values (e.g. a
* live color) from growing its per-site list without limit.
*/
var TEMPLATE_SITE_CACHE = 8;
var templateCache = /* @__PURE__ */ new WeakMap();
var mergeTemplate = (strings, values) => {
	const valueCount = values.length;
	let isCacheable = true;
	for (let index = 0; index < valueCount; index++) {
		const value = values[index];
		if (value && typeof value !== "string") {
			isCacheable = false;
			break;
		}
	}
	if (isCacheable) {
		const entries = templateCache.get(strings);
		if (entries !== void 0) for (let entryIndex = 0; entryIndex < entries.length; entryIndex++) {
			const entry = entries[entryIndex];
			const entryValues = entry.values;
			let isMatch = true;
			for (let index = 0; index < valueCount; index++) if (entryValues[index] !== values[index]) {
				isMatch = false;
				break;
			}
			if (isMatch) return entry.result;
		}
	}
	let joined = strings[0];
	for (let index = 0; index < valueCount; index++) {
		const value = values[index];
		if (value) joined += typeof value === "string" ? value : resolveClassValue(value);
		joined += strings[index + 1];
	}
	const result = twMerge.mergeString(joined);
	if (isCacheable) {
		let entries = templateCache.get(strings);
		if (entries === void 0) {
			entries = [];
			templateCache.set(strings, entries);
		}
		if (entries.length >= TEMPLATE_SITE_CACHE) entries.shift();
		entries.push({
			values,
			result
		});
	}
	return result;
};
var IS_V8 = (() => {
	const error = /* @__PURE__ */ new Error();
	return !("line" in error) && !("lineNumber" in error);
})();
var ARG_CACHE_BUCKET_SIZE = 64;
/** First-arg buckets kept before a generation rotates into `previousArgCache`. */
var ARG_CACHE_SIZE = 500;
var argCache = /* @__PURE__ */ new Map();
var previousArgCache = /* @__PURE__ */ new Map();
var argCacheCount = 0;
var mergeVariadicCached = (inputs) => {
	const length = inputs.length;
	let firstKey = "";
	let firstKeyIndex = -1;
	let truthyStringCount = 0;
	let everyTruthyIsString = true;
	for (let index = 0; index < length; index++) {
		const item = inputs[index];
		if (!item) continue;
		if (typeof item !== "string") {
			everyTruthyIsString = false;
			break;
		}
		if (firstKeyIndex === -1) {
			firstKey = item;
			firstKeyIndex = index;
		}
		truthyStringCount++;
	}
	if (everyTruthyIsString) {
		if (truthyStringCount === 0) return "";
		if (truthyStringCount === 1) return twMerge.mergeString(firstKey);
		let bucket = argCache.get(firstKey);
		if (bucket === void 0) bucket = previousArgCache.get(firstKey);
		if (bucket !== void 0) for (let entryIndex = 0; entryIndex < bucket.length; entryIndex++) {
			const entry = bucket[entryIndex];
			const rest = entry.rest;
			if (rest.length !== truthyStringCount - 1) continue;
			let restIndex = 0;
			let isMatch = true;
			for (let index = firstKeyIndex + 1; index < length; index++) {
				const item = inputs[index];
				if (!item) continue;
				if (item !== rest[restIndex++]) {
					isMatch = false;
					break;
				}
			}
			if (isMatch) return entry.result;
		}
		let joined = firstKey;
		const rest = [];
		for (let index = firstKeyIndex + 1; index < length; index++) {
			const item = inputs[index];
			if (!item) continue;
			joined += " " + item;
			rest.push(item);
		}
		const result = twMerge.mergeString(joined);
		let target = argCache.get(firstKey);
		if (target === void 0) {
			target = [];
			argCache.set(firstKey, target);
		}
		if (target.length >= ARG_CACHE_BUCKET_SIZE) target.shift();
		target.push({
			rest,
			result
		});
		if (++argCacheCount > ARG_CACHE_SIZE) {
			argCacheCount = 0;
			previousArgCache = argCache;
			argCache = /* @__PURE__ */ new Map();
		}
		return result;
	}
	let result = "";
	for (let index = 0; index < length; index++) {
		const item = inputs[index];
		if (!item) continue;
		const resolved = typeof item === "string" ? item : resolveClassValue(item);
		if (resolved) {
			if (result) result += " ";
			result += resolved;
		}
	}
	return twMerge.mergeString(result);
};
var cn = function() {
	const first = arguments[0];
	if (Array.isArray(first) && "raw" in first) {
		const strings = first;
		const length = arguments.length;
		const values = [];
		for (let index = 1; index < length; index++) values.push(arguments[index]);
		return mergeTemplate(strings, values);
	}
	const length = arguments.length;
	if (length === 1) return typeof first === "string" ? twMerge.mergeString(first) : twMerge.mergeString(resolveClassValue(first));
	if (IS_V8) {
		const inputs = [];
		for (let index = 0; index < length; index++) inputs.push(arguments[index]);
		return mergeVariadicCached(inputs);
	}
	let result = "";
	for (let index = 0; index < length; index++) {
		const item = arguments[index];
		if (!item) continue;
		const resolved = typeof item === "string" ? item : resolveClassValue(item);
		if (resolved) {
			if (result) result += " ";
			result += resolved;
		}
	}
	return twMerge.mergeString(result);
};
//#endregion
export { clsx, cn, cn as default, twJoin, twMerge };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY25mYXN0LmpzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy5wbnBtL2NuZmFzdEAwLjAuOC9ub2RlX21vZHVsZXMvY25mYXN0L2Rpc3QvaW5kZXgubWpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vI3JlZ2lvbiBzcmMvY2xzeC50c1xuY29uc3QgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5jb25zdCByZXNvbHZlQ2xhc3NWYWx1ZSA9ICh2YWx1ZSkgPT4ge1xuXHRpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcblx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHZhbHVlO1xuXHRpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSByZXR1cm4gXCJcIiArIHZhbHVlO1xuXHRsZXQgcmVzdWx0ID0gXCJcIjtcblx0aWYgKGlzQXJyYXkodmFsdWUpKSB7XG5cdFx0Y29uc3QgbGVuZ3RoID0gdmFsdWUubGVuZ3RoO1xuXHRcdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcblx0XHRcdGNvbnN0IGl0ZW0gPSB2YWx1ZVtpbmRleF07XG5cdFx0XHRpZiAoIWl0ZW0pIGNvbnRpbnVlO1xuXHRcdFx0Y29uc3QgcmVzb2x2ZWQgPSB0eXBlb2YgaXRlbSA9PT0gXCJzdHJpbmdcIiA/IGl0ZW0gOiByZXNvbHZlQ2xhc3NWYWx1ZShpdGVtKTtcblx0XHRcdGlmIChyZXNvbHZlZCkge1xuXHRcdFx0XHRpZiAocmVzdWx0KSByZXN1bHQgKz0gXCIgXCI7XG5cdFx0XHRcdHJlc3VsdCArPSByZXNvbHZlZDtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXHRpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gdmFsdWUpIGlmICh2YWx1ZVtrZXldKSB7XG5cdFx0XHRpZiAocmVzdWx0KSByZXN1bHQgKz0gXCIgXCI7XG5cdFx0XHRyZXN1bHQgKz0ga2V5O1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTtcbmNvbnN0IGNsc3ggPSAoLi4uaW5wdXRzKSA9PiByZXNvbHZlQ2xhc3NWYWx1ZShpbnB1dHMpO1xuXG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvbGliL3V0aWxzLnRzXG4vKipcbiogQ29uY2F0ZW5hdGVzIHR3byBhcnJheXMgZmFzdGVyIHRoYW4gdGhlIGFycmF5IHNwcmVhZCBvcGVyYXRvci5cbiovXG5jb25zdCBjb25jYXRBcnJheXMgPSAoYXJyYXkxLCBhcnJheTIpID0+IHtcblx0Y29uc3QgbGVuZ3RoMSA9IGFycmF5MS5sZW5ndGg7XG5cdGNvbnN0IGxlbmd0aDIgPSBhcnJheTIubGVuZ3RoO1xuXHRjb25zdCBjb21iaW5lZEFycmF5ID0gbmV3IEFycmF5KGxlbmd0aDEgKyBsZW5ndGgyKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGgxOyBpKyspIGNvbWJpbmVkQXJyYXlbaV0gPSBhcnJheTFbaV07XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoMjsgaSsrKSBjb21iaW5lZEFycmF5W2xlbmd0aDEgKyBpXSA9IGFycmF5MltpXTtcblx0cmV0dXJuIGNvbWJpbmVkQXJyYXk7XG59O1xuXG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvbGliL2NsYXNzLWdyb3VwLXV0aWxzLnRzXG5jb25zdCBjcmVhdGVDbGFzc1ZhbGlkYXRvck9iamVjdCA9IChjbGFzc0dyb3VwSWQsIHZhbGlkYXRvcikgPT4gKHtcblx0Y2xhc3NHcm91cElkLFxuXHR2YWxpZGF0b3Jcbn0pO1xuY29uc3QgY3JlYXRlQ2xhc3NQYXJ0T2JqZWN0ID0gKG5leHRQYXJ0ID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKSwgdmFsaWRhdG9ycyA9IG51bGwsIGNsYXNzR3JvdXBJZCkgPT4gKHtcblx0bmV4dFBhcnQsXG5cdHZhbGlkYXRvcnMsXG5cdGNsYXNzR3JvdXBJZFxufSk7XG5jb25zdCBDTEFTU19QQVJUX1NFUEFSQVRPUiA9IFwiLVwiO1xuY29uc3QgRU1QVFlfQ09ORkxJQ1RTID0gW107XG5jb25zdCBBUkJJVFJBUllfUFJPUEVSVFlfUFJFRklYID0gXCJhcmJpdHJhcnkuLlwiO1xuY29uc3QgY3JlYXRlQ2xhc3NHcm91cFV0aWxzID0gKGNvbmZpZykgPT4ge1xuXHRjb25zdCBjbGFzc01hcCA9IGNyZWF0ZUNsYXNzTWFwKGNvbmZpZyk7XG5cdGNvbnN0IHsgY29uZmxpY3RpbmdDbGFzc0dyb3VwcywgY29uZmxpY3RpbmdDbGFzc0dyb3VwTW9kaWZpZXJzIH0gPSBjb25maWc7XG5cdGNvbnN0IGdldENsYXNzR3JvdXBJZCA9IChjbGFzc05hbWUpID0+IHtcblx0XHRpZiAoY2xhc3NOYW1lWzBdID09PSBcIltcIiAmJiBjbGFzc05hbWVbY2xhc3NOYW1lLmxlbmd0aCAtIDFdID09PSBcIl1cIikgcmV0dXJuIGdldEdyb3VwSWRGb3JBcmJpdHJhcnlQcm9wZXJ0eShjbGFzc05hbWUpO1xuXHRcdGNvbnN0IGNsYXNzUGFydHMgPSBjbGFzc05hbWUuc3BsaXQoQ0xBU1NfUEFSVF9TRVBBUkFUT1IpO1xuXHRcdHJldHVybiBnZXRHcm91cFJlY3Vyc2l2ZShjbGFzc1BhcnRzLCBjbGFzc1BhcnRzWzBdID09PSBcIlwiICYmIGNsYXNzUGFydHMubGVuZ3RoID4gMSA/IDEgOiAwLCBjbGFzc01hcCk7XG5cdH07XG5cdGNvbnN0IGdldENvbmZsaWN0aW5nQ2xhc3NHcm91cElkcyA9IChjbGFzc0dyb3VwSWQsIGhhc1Bvc3RmaXhNb2RpZmllcikgPT4ge1xuXHRcdGlmIChoYXNQb3N0Zml4TW9kaWZpZXIpIHtcblx0XHRcdGNvbnN0IG1vZGlmaWVyQ29uZmxpY3RzID0gY29uZmxpY3RpbmdDbGFzc0dyb3VwTW9kaWZpZXJzW2NsYXNzR3JvdXBJZF07XG5cdFx0XHRjb25zdCBiYXNlQ29uZmxpY3RzID0gY29uZmxpY3RpbmdDbGFzc0dyb3Vwc1tjbGFzc0dyb3VwSWRdO1xuXHRcdFx0aWYgKG1vZGlmaWVyQ29uZmxpY3RzKSB7XG5cdFx0XHRcdGlmIChiYXNlQ29uZmxpY3RzKSByZXR1cm4gY29uY2F0QXJyYXlzKGJhc2VDb25mbGljdHMsIG1vZGlmaWVyQ29uZmxpY3RzKTtcblx0XHRcdFx0cmV0dXJuIG1vZGlmaWVyQ29uZmxpY3RzO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGJhc2VDb25mbGljdHMgfHwgRU1QVFlfQ09ORkxJQ1RTO1xuXHRcdH1cblx0XHRyZXR1cm4gY29uZmxpY3RpbmdDbGFzc0dyb3Vwc1tjbGFzc0dyb3VwSWRdIHx8IEVNUFRZX0NPTkZMSUNUUztcblx0fTtcblx0cmV0dXJuIHtcblx0XHRnZXRDbGFzc0dyb3VwSWQsXG5cdFx0Z2V0Q29uZmxpY3RpbmdDbGFzc0dyb3VwSWRzXG5cdH07XG59O1xuY29uc3QgZ2V0R3JvdXBSZWN1cnNpdmUgPSAoY2xhc3NQYXJ0cywgc3RhcnRJbmRleCwgY2xhc3NQYXJ0T2JqZWN0KSA9PiB7XG5cdGlmIChjbGFzc1BhcnRzLmxlbmd0aCAtIHN0YXJ0SW5kZXggPT09IDApIHJldHVybiBjbGFzc1BhcnRPYmplY3QuY2xhc3NHcm91cElkO1xuXHRjb25zdCBjdXJyZW50Q2xhc3NQYXJ0ID0gY2xhc3NQYXJ0c1tzdGFydEluZGV4XTtcblx0Y29uc3QgbmV4dENsYXNzUGFydE9iamVjdCA9IGNsYXNzUGFydE9iamVjdC5uZXh0UGFydC5nZXQoY3VycmVudENsYXNzUGFydCk7XG5cdGlmIChuZXh0Q2xhc3NQYXJ0T2JqZWN0KSB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gZ2V0R3JvdXBSZWN1cnNpdmUoY2xhc3NQYXJ0cywgc3RhcnRJbmRleCArIDEsIG5leHRDbGFzc1BhcnRPYmplY3QpO1xuXHRcdGlmIChyZXN1bHQpIHJldHVybiByZXN1bHQ7XG5cdH1cblx0Y29uc3QgdmFsaWRhdG9ycyA9IGNsYXNzUGFydE9iamVjdC52YWxpZGF0b3JzO1xuXHRpZiAodmFsaWRhdG9ycyA9PT0gbnVsbCkgcmV0dXJuO1xuXHRjb25zdCBjbGFzc1Jlc3QgPSBzdGFydEluZGV4ID09PSAwID8gY2xhc3NQYXJ0cy5qb2luKENMQVNTX1BBUlRfU0VQQVJBVE9SKSA6IGNsYXNzUGFydHMuc2xpY2Uoc3RhcnRJbmRleCkuam9pbihDTEFTU19QQVJUX1NFUEFSQVRPUik7XG5cdGNvbnN0IHZhbGlkYXRvcnNMZW5ndGggPSB2YWxpZGF0b3JzLmxlbmd0aDtcblx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHZhbGlkYXRvcnNMZW5ndGg7IGluZGV4KyspIHtcblx0XHRjb25zdCB2YWxpZGF0b3JPYmplY3QgPSB2YWxpZGF0b3JzW2luZGV4XTtcblx0XHRpZiAodmFsaWRhdG9yT2JqZWN0LnZhbGlkYXRvcihjbGFzc1Jlc3QpKSByZXR1cm4gdmFsaWRhdG9yT2JqZWN0LmNsYXNzR3JvdXBJZDtcblx0fVxufTtcbi8qKlxuKiBHZXQgdGhlIGNsYXNzIGdyb3VwIElEIGZvciBhbiBhcmJpdHJhcnkgcHJvcGVydHkuXG4qXG4qIEBwYXJhbSBjbGFzc05hbWUgLSBUaGUgY2xhc3MgbmFtZSB0byBnZXQgdGhlIGdyb3VwIElEIGZvci4gSXMgZXhwZWN0ZWQgdG8gYmUgc3RyaW5nIHN0YXJ0aW5nIHdpdGggYFtgIGFuZCBlbmRpbmcgd2l0aCBgXWAuXG4qL1xuY29uc3QgZ2V0R3JvdXBJZEZvckFyYml0cmFyeVByb3BlcnR5ID0gKGNsYXNzTmFtZSkgPT4ge1xuXHRjb25zdCBjb250ZW50ID0gY2xhc3NOYW1lLnNsaWNlKDEsIC0xKTtcblx0Y29uc3QgY29sb25JbmRleCA9IGNvbnRlbnQuaW5kZXhPZihcIjpcIik7XG5cdGlmIChjb2xvbkluZGV4ID09PSAtMSkgcmV0dXJuO1xuXHRjb25zdCBwcm9wZXJ0eSA9IGNvbnRlbnQuc2xpY2UoMCwgY29sb25JbmRleCk7XG5cdHJldHVybiBwcm9wZXJ0eSA/IEFSQklUUkFSWV9QUk9QRVJUWV9QUkVGSVggKyBwcm9wZXJ0eSA6IHZvaWQgMDtcbn07XG4vKipcbiogRXhwb3J0ZWQgZm9yIHRlc3Rpbmcgb25seVxuKi9cbmNvbnN0IGNyZWF0ZUNsYXNzTWFwID0gKGNvbmZpZykgPT4ge1xuXHRjb25zdCB7IHRoZW1lLCBjbGFzc0dyb3VwcyB9ID0gY29uZmlnO1xuXHRyZXR1cm4gcHJvY2Vzc0NsYXNzR3JvdXBzKGNsYXNzR3JvdXBzLCB0aGVtZSk7XG59O1xuY29uc3QgcHJvY2Vzc0NsYXNzR3JvdXBzID0gKGNsYXNzR3JvdXBzLCB0aGVtZSkgPT4ge1xuXHRjb25zdCBjbGFzc01hcCA9IGNyZWF0ZUNsYXNzUGFydE9iamVjdCgpO1xuXHRmb3IgKGNvbnN0IGNsYXNzR3JvdXBJZCBpbiBjbGFzc0dyb3Vwcykge1xuXHRcdGNvbnN0IGdyb3VwID0gY2xhc3NHcm91cHNbY2xhc3NHcm91cElkXTtcblx0XHRwcm9jZXNzQ2xhc3Nlc1JlY3Vyc2l2ZWx5KGdyb3VwLCBjbGFzc01hcCwgY2xhc3NHcm91cElkLCB0aGVtZSk7XG5cdH1cblx0cmV0dXJuIGNsYXNzTWFwO1xufTtcbmNvbnN0IHByb2Nlc3NDbGFzc2VzUmVjdXJzaXZlbHkgPSAoY2xhc3NHcm91cCwgY2xhc3NQYXJ0T2JqZWN0LCBjbGFzc0dyb3VwSWQsIHRoZW1lKSA9PiB7XG5cdGNvbnN0IGxlbmd0aCA9IGNsYXNzR3JvdXAubGVuZ3RoO1xuXHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG5cdFx0Y29uc3QgY2xhc3NEZWZpbml0aW9uID0gY2xhc3NHcm91cFtpbmRleF07XG5cdFx0cHJvY2Vzc0NsYXNzRGVmaW5pdGlvbihjbGFzc0RlZmluaXRpb24sIGNsYXNzUGFydE9iamVjdCwgY2xhc3NHcm91cElkLCB0aGVtZSk7XG5cdH1cbn07XG5jb25zdCBwcm9jZXNzQ2xhc3NEZWZpbml0aW9uID0gKGNsYXNzRGVmaW5pdGlvbiwgY2xhc3NQYXJ0T2JqZWN0LCBjbGFzc0dyb3VwSWQsIHRoZW1lKSA9PiB7XG5cdGlmICh0eXBlb2YgY2xhc3NEZWZpbml0aW9uID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cHJvY2Vzc1N0cmluZ0RlZmluaXRpb24oY2xhc3NEZWZpbml0aW9uLCBjbGFzc1BhcnRPYmplY3QsIGNsYXNzR3JvdXBJZCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGlmICh0eXBlb2YgY2xhc3NEZWZpbml0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRwcm9jZXNzRnVuY3Rpb25EZWZpbml0aW9uKGNsYXNzRGVmaW5pdGlvbiwgY2xhc3NQYXJ0T2JqZWN0LCBjbGFzc0dyb3VwSWQsIHRoZW1lKTtcblx0XHRyZXR1cm47XG5cdH1cblx0cHJvY2Vzc09iamVjdERlZmluaXRpb24oY2xhc3NEZWZpbml0aW9uLCBjbGFzc1BhcnRPYmplY3QsIGNsYXNzR3JvdXBJZCwgdGhlbWUpO1xufTtcbmNvbnN0IHByb2Nlc3NTdHJpbmdEZWZpbml0aW9uID0gKGNsYXNzRGVmaW5pdGlvbiwgY2xhc3NQYXJ0T2JqZWN0LCBjbGFzc0dyb3VwSWQpID0+IHtcblx0Y29uc3QgY2xhc3NQYXJ0T2JqZWN0VG9FZGl0ID0gY2xhc3NEZWZpbml0aW9uID09PSBcIlwiID8gY2xhc3NQYXJ0T2JqZWN0IDogZ2V0UGFydChjbGFzc1BhcnRPYmplY3QsIGNsYXNzRGVmaW5pdGlvbik7XG5cdGNsYXNzUGFydE9iamVjdFRvRWRpdC5jbGFzc0dyb3VwSWQgPSBjbGFzc0dyb3VwSWQ7XG59O1xuY29uc3QgcHJvY2Vzc0Z1bmN0aW9uRGVmaW5pdGlvbiA9IChjbGFzc0RlZmluaXRpb24sIGNsYXNzUGFydE9iamVjdCwgY2xhc3NHcm91cElkLCB0aGVtZSkgPT4ge1xuXHRpZiAoaXNUaGVtZUdldHRlcihjbGFzc0RlZmluaXRpb24pKSB7XG5cdFx0cHJvY2Vzc0NsYXNzZXNSZWN1cnNpdmVseShjbGFzc0RlZmluaXRpb24odGhlbWUpLCBjbGFzc1BhcnRPYmplY3QsIGNsYXNzR3JvdXBJZCwgdGhlbWUpO1xuXHRcdHJldHVybjtcblx0fVxuXHRpZiAoY2xhc3NQYXJ0T2JqZWN0LnZhbGlkYXRvcnMgPT09IG51bGwpIGNsYXNzUGFydE9iamVjdC52YWxpZGF0b3JzID0gW107XG5cdGNsYXNzUGFydE9iamVjdC52YWxpZGF0b3JzLnB1c2goY3JlYXRlQ2xhc3NWYWxpZGF0b3JPYmplY3QoY2xhc3NHcm91cElkLCBjbGFzc0RlZmluaXRpb24pKTtcbn07XG5jb25zdCBwcm9jZXNzT2JqZWN0RGVmaW5pdGlvbiA9IChjbGFzc0RlZmluaXRpb24sIGNsYXNzUGFydE9iamVjdCwgY2xhc3NHcm91cElkLCB0aGVtZSkgPT4ge1xuXHRjb25zdCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoY2xhc3NEZWZpbml0aW9uKTtcblx0Y29uc3QgbGVuZ3RoID0gZW50cmllcy5sZW5ndGg7XG5cdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcblx0XHRjb25zdCBba2V5LCB2YWx1ZV0gPSBlbnRyaWVzW2luZGV4XTtcblx0XHRwcm9jZXNzQ2xhc3Nlc1JlY3Vyc2l2ZWx5KHZhbHVlLCBnZXRQYXJ0KGNsYXNzUGFydE9iamVjdCwga2V5KSwgY2xhc3NHcm91cElkLCB0aGVtZSk7XG5cdH1cbn07XG5jb25zdCBnZXRQYXJ0ID0gKGNsYXNzUGFydE9iamVjdCwgcGF0aCkgPT4ge1xuXHRsZXQgY3VycmVudCA9IGNsYXNzUGFydE9iamVjdDtcblx0Y29uc3QgcGFydHMgPSBwYXRoLnNwbGl0KENMQVNTX1BBUlRfU0VQQVJBVE9SKTtcblx0Y29uc3QgbGVuZ3RoID0gcGFydHMubGVuZ3RoO1xuXHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG5cdFx0Y29uc3QgcGFydCA9IHBhcnRzW2luZGV4XTtcblx0XHRsZXQgbmV4dCA9IGN1cnJlbnQubmV4dFBhcnQuZ2V0KHBhcnQpO1xuXHRcdGlmICghbmV4dCkge1xuXHRcdFx0bmV4dCA9IGNyZWF0ZUNsYXNzUGFydE9iamVjdCgpO1xuXHRcdFx0Y3VycmVudC5uZXh0UGFydC5zZXQocGFydCwgbmV4dCk7XG5cdFx0fVxuXHRcdGN1cnJlbnQgPSBuZXh0O1xuXHR9XG5cdHJldHVybiBjdXJyZW50O1xufTtcbmNvbnN0IGlzVGhlbWVHZXR0ZXIgPSAoY2xhc3NEZWZpbml0aW9uKSA9PiBcImlzVGhlbWVHZXR0ZXJcIiBpbiBjbGFzc0RlZmluaXRpb24gJiYgY2xhc3NEZWZpbml0aW9uLmlzVGhlbWVHZXR0ZXIgPT09IHRydWU7XG5cbi8vI2VuZHJlZ2lvblxuLy8jcmVnaW9uIHNyYy9saWIvcGFyc2UtY2xhc3MtbmFtZS50c1xuY29uc3QgQ0hBUl9NT0RJRklFUl9TRVBBUkFUT1IgPSA1ODtcbmNvbnN0IENIQVJfUE9TVEZJWF9TRVBBUkFUT1IgPSA0NztcbmNvbnN0IENIQVJfT1BFTl9CUkFDS0VUID0gOTE7XG5jb25zdCBDSEFSX0NMT1NFX0JSQUNLRVQgPSA5MztcbmNvbnN0IENIQVJfT1BFTl9QQVJFTiA9IDQwO1xuY29uc3QgQ0hBUl9DTE9TRV9QQVJFTiA9IDQxO1xuY29uc3QgQ0hBUl9JTVBPUlRBTlQgPSAzMztcbmNvbnN0IGNyZWF0ZVJlc3VsdE9iamVjdCA9IChtb2RpZmllcnMsIGhhc0ltcG9ydGFudE1vZGlmaWVyLCBiYXNlQ2xhc3NOYW1lLCBtYXliZVBvc3RmaXhNb2RpZmllclBvc2l0aW9uKSA9PiAoe1xuXHRtb2RpZmllcnMsXG5cdGhhc0ltcG9ydGFudE1vZGlmaWVyLFxuXHRiYXNlQ2xhc3NOYW1lLFxuXHRtYXliZVBvc3RmaXhNb2RpZmllclBvc2l0aW9uLFxuXHRpc0V4dGVybmFsOiB2b2lkIDBcbn0pO1xuLyoqXG4qIFBhcnNlIGNsYXNzIG5hbWUgaW50byBwYXJ0cy5cbipcbiogSW5zcGlyZWQgYnkgYHNwbGl0QXRUb3BMZXZlbE9ubHlgIHVzZWQgaW4gVGFpbHdpbmQgQ1NTXG4qIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3RhaWx3aW5kbGFicy90YWlsd2luZGNzcy9ibG9iL3YzLjIuMi9zcmMvdXRpbC9zcGxpdEF0VG9wTGV2ZWxPbmx5LmpzXG4qL1xuY29uc3QgcGFyc2VDbGFzc05hbWUgPSAoY2xhc3NOYW1lKSA9PiB7XG5cdGNvbnN0IG1vZGlmaWVycyA9IFtdO1xuXHRsZXQgYnJhY2tldERlcHRoID0gMDtcblx0bGV0IHBhcmVuRGVwdGggPSAwO1xuXHRsZXQgbW9kaWZpZXJTdGFydCA9IDA7XG5cdGxldCBwb3N0Zml4TW9kaWZpZXJQb3NpdGlvbjtcblx0Y29uc3QgbGVuID0gY2xhc3NOYW1lLmxlbmd0aDtcblx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxlbjsgaW5kZXgrKykge1xuXHRcdGNvbnN0IGNoYXJDb2RlID0gY2xhc3NOYW1lLmNoYXJDb2RlQXQoaW5kZXgpO1xuXHRcdGlmIChicmFja2V0RGVwdGggPT09IDAgJiYgcGFyZW5EZXB0aCA9PT0gMCkge1xuXHRcdFx0aWYgKGNoYXJDb2RlID09PSBDSEFSX01PRElGSUVSX1NFUEFSQVRPUikge1xuXHRcdFx0XHRtb2RpZmllcnMucHVzaChjbGFzc05hbWUuc2xpY2UobW9kaWZpZXJTdGFydCwgaW5kZXgpKTtcblx0XHRcdFx0bW9kaWZpZXJTdGFydCA9IGluZGV4ICsgMTtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cdFx0XHRpZiAoY2hhckNvZGUgPT09IENIQVJfUE9TVEZJWF9TRVBBUkFUT1IpIHtcblx0XHRcdFx0cG9zdGZpeE1vZGlmaWVyUG9zaXRpb24gPSBpbmRleDtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChjaGFyQ29kZSA9PT0gQ0hBUl9PUEVOX0JSQUNLRVQpIGJyYWNrZXREZXB0aCsrO1xuXHRcdGVsc2UgaWYgKGNoYXJDb2RlID09PSBDSEFSX0NMT1NFX0JSQUNLRVQpIGJyYWNrZXREZXB0aC0tO1xuXHRcdGVsc2UgaWYgKGNoYXJDb2RlID09PSBDSEFSX09QRU5fUEFSRU4pIHBhcmVuRGVwdGgrKztcblx0XHRlbHNlIGlmIChjaGFyQ29kZSA9PT0gQ0hBUl9DTE9TRV9QQVJFTikgcGFyZW5EZXB0aC0tO1xuXHR9XG5cdGNvbnN0IGJhc2VDbGFzc05hbWVXaXRoSW1wb3J0YW50TW9kaWZpZXIgPSBtb2RpZmllcnMubGVuZ3RoID09PSAwID8gY2xhc3NOYW1lIDogY2xhc3NOYW1lLnNsaWNlKG1vZGlmaWVyU3RhcnQpO1xuXHRsZXQgYmFzZUNsYXNzTmFtZSA9IGJhc2VDbGFzc05hbWVXaXRoSW1wb3J0YW50TW9kaWZpZXI7XG5cdGxldCBoYXNJbXBvcnRhbnRNb2RpZmllciA9IGZhbHNlO1xuXHRjb25zdCBsYXN0SW5kZXggPSBiYXNlQ2xhc3NOYW1lV2l0aEltcG9ydGFudE1vZGlmaWVyLmxlbmd0aCAtIDE7XG5cdGlmIChiYXNlQ2xhc3NOYW1lV2l0aEltcG9ydGFudE1vZGlmaWVyLmNoYXJDb2RlQXQobGFzdEluZGV4KSA9PT0gQ0hBUl9JTVBPUlRBTlQpIHtcblx0XHRiYXNlQ2xhc3NOYW1lID0gYmFzZUNsYXNzTmFtZVdpdGhJbXBvcnRhbnRNb2RpZmllci5zbGljZSgwLCAtMSk7XG5cdFx0aGFzSW1wb3J0YW50TW9kaWZpZXIgPSB0cnVlO1xuXHR9IGVsc2UgaWYgKGJhc2VDbGFzc05hbWVXaXRoSW1wb3J0YW50TW9kaWZpZXIuY2hhckNvZGVBdCgwKSA9PT0gQ0hBUl9JTVBPUlRBTlQpIHtcblx0XHRiYXNlQ2xhc3NOYW1lID0gYmFzZUNsYXNzTmFtZVdpdGhJbXBvcnRhbnRNb2RpZmllci5zbGljZSgxKTtcblx0XHRoYXNJbXBvcnRhbnRNb2RpZmllciA9IHRydWU7XG5cdH1cblx0Y29uc3QgbWF5YmVQb3N0Zml4TW9kaWZpZXJQb3NpdGlvbiA9IHBvc3RmaXhNb2RpZmllclBvc2l0aW9uICYmIHBvc3RmaXhNb2RpZmllclBvc2l0aW9uID4gbW9kaWZpZXJTdGFydCA/IHBvc3RmaXhNb2RpZmllclBvc2l0aW9uIC0gbW9kaWZpZXJTdGFydCA6IHZvaWQgMDtcblx0cmV0dXJuIGNyZWF0ZVJlc3VsdE9iamVjdChtb2RpZmllcnMsIGhhc0ltcG9ydGFudE1vZGlmaWVyLCBiYXNlQ2xhc3NOYW1lLCBtYXliZVBvc3RmaXhNb2RpZmllclBvc2l0aW9uKTtcbn07XG5cbi8vI2VuZHJlZ2lvblxuLy8jcmVnaW9uIHNyYy9saWIvc29ydC1tb2RpZmllcnMudHNcbi8qKlxuKiBTb3J0cyBtb2RpZmllcnMgYWNjb3JkaW5nIHRvIGZvbGxvd2luZyBzY2hlbWE6XG4qIC0gUHJlZGVmaW5lZCBtb2RpZmllcnMgYXJlIHNvcnRlZCBhbHBoYWJldGljYWxseVxuKiAtIFdoZW4gYW4gYXJiaXRyYXJ5IHZhcmlhbnQgYXBwZWFycywgaXQgbXVzdCBiZSBwcmVzZXJ2ZWQgd2hpY2ggbW9kaWZpZXJzIGFyZSBiZWZvcmUgYW5kIGFmdGVyIGl0XG4qL1xuY29uc3QgY3JlYXRlU29ydE1vZGlmaWVycyA9IChjb25maWcpID0+IHtcblx0Y29uc3Qgb3JkZXJTZW5zaXRpdmVNb2RpZmllcnMgPSBuZXcgU2V0KGNvbmZpZy5vcmRlclNlbnNpdGl2ZU1vZGlmaWVycyk7XG5cdHJldHVybiAobW9kaWZpZXJzKSA9PiB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cdFx0bGV0IGN1cnJlbnRTZWdtZW50ID0gW107XG5cdFx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG1vZGlmaWVycy5sZW5ndGg7IGluZGV4KyspIHtcblx0XHRcdGNvbnN0IG1vZGlmaWVyID0gbW9kaWZpZXJzW2luZGV4XTtcblx0XHRcdGNvbnN0IGlzQXJiaXRyYXJ5ID0gbW9kaWZpZXJbMF0gPT09IFwiW1wiO1xuXHRcdFx0Y29uc3QgaXNPcmRlclNlbnNpdGl2ZSA9IG9yZGVyU2Vuc2l0aXZlTW9kaWZpZXJzLmhhcyhtb2RpZmllcik7XG5cdFx0XHRpZiAoaXNBcmJpdHJhcnkgfHwgaXNPcmRlclNlbnNpdGl2ZSkge1xuXHRcdFx0XHRpZiAoY3VycmVudFNlZ21lbnQubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdGN1cnJlbnRTZWdtZW50LnNvcnQoKTtcblx0XHRcdFx0XHRmb3IgKGxldCBzZWdtZW50SW5kZXggPSAwOyBzZWdtZW50SW5kZXggPCBjdXJyZW50U2VnbWVudC5sZW5ndGg7IHNlZ21lbnRJbmRleCsrKSByZXN1bHQucHVzaChjdXJyZW50U2VnbWVudFtzZWdtZW50SW5kZXhdKTtcblx0XHRcdFx0XHRjdXJyZW50U2VnbWVudCA9IFtdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJlc3VsdC5wdXNoKG1vZGlmaWVyKTtcblx0XHRcdH0gZWxzZSBjdXJyZW50U2VnbWVudC5wdXNoKG1vZGlmaWVyKTtcblx0XHR9XG5cdFx0aWYgKGN1cnJlbnRTZWdtZW50Lmxlbmd0aCA+IDApIHtcblx0XHRcdGN1cnJlbnRTZWdtZW50LnNvcnQoKTtcblx0XHRcdGZvciAobGV0IHNlZ21lbnRJbmRleCA9IDA7IHNlZ21lbnRJbmRleCA8IGN1cnJlbnRTZWdtZW50Lmxlbmd0aDsgc2VnbWVudEluZGV4KyspIHJlc3VsdC5wdXNoKGN1cnJlbnRTZWdtZW50W3NlZ21lbnRJbmRleF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9O1xufTtcblxuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gc3JjL2xpYi9jb25maWctdXRpbHMudHNcbmNvbnN0IEVYVEVSTkFMX0RFU0NSSVBUT1IgPSB7XG5cdGlzRXh0ZXJuYWw6IHRydWUsXG5cdGNsYXNzSWQ6IC0xLFxuXHRjb25mbGljdElkczogW11cbn07XG4vKipcbiogUGVyLXRva2VuIGRlc2NyaXB0b3IgY2FjaGUgY2FwYWNpdHkgKGVudHJpZXMpLiBMYXJnZXIgdGhhbiB0aGUgd2hvbGUtc3RyaW5nIExSVSBiZWNhdXNlXG4qIGluZGl2aWR1YWwgdG9rZW5zIGFyZSBmYXIgbW9yZSBudW1lcm91cyBidXQgY2hlYXAgdG8gc3RvcmU7IHRoZSBMUlUgYm91bmQgcHJldmVudHNcbiogdW5ib3VuZGVkIGdyb3d0aCB3aGVuIGNhbGxlcnMgcGFzcyBkeW5hbWljYWxseSBnZW5lcmF0ZWQgYXJiaXRyYXJ5IHZhbHVlcyAoZS5nLiBgdy1bMTIzcHhdYCkuXG4qL1xuY29uc3QgREVTQ1JJUFRPUl9DQUNIRV9TSVpFID0gNDA5NjtcbmNvbnN0IGNyZWF0ZUNvbmZpZ1V0aWxzID0gKGNvbmZpZykgPT4ge1xuXHRjb25zdCBzb3J0TW9kaWZpZXJzID0gY3JlYXRlU29ydE1vZGlmaWVycyhjb25maWcpO1xuXHRjb25zdCBwb3N0Zml4TG9va3VwQ2xhc3NHcm91cElkcyA9IGNyZWF0ZVBvc3RmaXhMb29rdXBDbGFzc0dyb3VwSWRzKGNvbmZpZyk7XG5cdGNvbnN0IHsgZ2V0Q2xhc3NHcm91cElkLCBnZXRDb25mbGljdGluZ0NsYXNzR3JvdXBJZHMgfSA9IGNyZWF0ZUNsYXNzR3JvdXBVdGlscyhjb25maWcpO1xuXHRsZXQgZGVzY3JpcHRvckNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0bGV0IHByZXZpb3VzRGVzY3JpcHRvckNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0bGV0IGRlc2NyaXB0b3JDYWNoZVNpemUgPSAwO1xuXHRsZXQgY2xhaW1lZEdlbmVyYXRpb24gPSBuZXcgSW50MzJBcnJheSgyNTYpO1xuXHRsZXQgY3VycmVudEdlbmVyYXRpb24gPSAwO1xuXHRsZXQga2VlcEZsYWdzID0gbmV3IFVpbnQ4QXJyYXkoNjQpO1xuXHRsZXQgc3BsaXRTYXdOb25TcGFjZVdoaXRlc3BhY2UgPSBmYWxzZTtcblx0Y29uc3Qgc3BsaXRDbGFzc0xpc3QgPSAoY2xhc3NMaXN0KSA9PiB7XG5cdFx0Y29uc3QgdG9rZW5zID0gW107XG5cdFx0Y29uc3QgbGVuZ3RoID0gY2xhc3NMaXN0Lmxlbmd0aDtcblx0XHRsZXQgdG9rZW5TdGFydCA9IC0xO1xuXHRcdHNwbGl0U2F3Tm9uU3BhY2VXaGl0ZXNwYWNlID0gZmFsc2U7XG5cdFx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuXHRcdFx0Y29uc3QgY2hhckNvZGUgPSBjbGFzc0xpc3QuY2hhckNvZGVBdChpbmRleCk7XG5cdFx0XHRpZiAoY2hhckNvZGUgPT09IDMyKSB7XG5cdFx0XHRcdGlmICh0b2tlblN0YXJ0ICE9PSAtMSkge1xuXHRcdFx0XHRcdHRva2Vucy5wdXNoKGNsYXNzTGlzdC5zbGljZSh0b2tlblN0YXJ0LCBpbmRleCkpO1xuXHRcdFx0XHRcdHRva2VuU3RhcnQgPSAtMTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChjaGFyQ29kZSA+PSA5ICYmIGNoYXJDb2RlIDw9IDEzKSB7XG5cdFx0XHRcdHNwbGl0U2F3Tm9uU3BhY2VXaGl0ZXNwYWNlID0gdHJ1ZTtcblx0XHRcdFx0aWYgKHRva2VuU3RhcnQgIT09IC0xKSB7XG5cdFx0XHRcdFx0dG9rZW5zLnB1c2goY2xhc3NMaXN0LnNsaWNlKHRva2VuU3RhcnQsIGluZGV4KSk7XG5cdFx0XHRcdFx0dG9rZW5TdGFydCA9IC0xO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRva2VuU3RhcnQgPT09IC0xKSB0b2tlblN0YXJ0ID0gaW5kZXg7XG5cdFx0fVxuXHRcdGlmICh0b2tlblN0YXJ0ICE9PSAtMSkgdG9rZW5zLnB1c2goY2xhc3NMaXN0LnNsaWNlKHRva2VuU3RhcnQpKTtcblx0XHRyZXR1cm4gdG9rZW5zO1xuXHR9O1xuXHRjb25zdCBjb25mbGljdEtleUlkcyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG5cdGxldCBuZXh0Q29uZmxpY3RLZXlJZCA9IDA7XG5cdGNvbnN0IGludGVybkNvbmZsaWN0S2V5ID0gKGNvbmZsaWN0S2V5KSA9PiB7XG5cdFx0bGV0IGlkID0gY29uZmxpY3RLZXlJZHMuZ2V0KGNvbmZsaWN0S2V5KTtcblx0XHRpZiAoaWQgPT09IHZvaWQgMCkge1xuXHRcdFx0aWQgPSBuZXh0Q29uZmxpY3RLZXlJZCsrO1xuXHRcdFx0Y29uZmxpY3RLZXlJZHMuc2V0KGNvbmZsaWN0S2V5LCBpZCk7XG5cdFx0XHRpZiAoaWQgPj0gY2xhaW1lZEdlbmVyYXRpb24ubGVuZ3RoKSB7XG5cdFx0XHRcdGNvbnN0IGdyb3duID0gbmV3IEludDMyQXJyYXkoY2xhaW1lZEdlbmVyYXRpb24ubGVuZ3RoICogMik7XG5cdFx0XHRcdGdyb3duLnNldChjbGFpbWVkR2VuZXJhdGlvbik7XG5cdFx0XHRcdGNsYWltZWRHZW5lcmF0aW9uID0gZ3Jvd247XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBpZDtcblx0fTtcblx0Y29uc3QgY29tcHV0ZUNsYXNzRGVzY3JpcHRvciA9IChvcmlnaW5hbENsYXNzTmFtZSkgPT4ge1xuXHRcdGNvbnN0IHsgaXNFeHRlcm5hbCwgbW9kaWZpZXJzLCBoYXNJbXBvcnRhbnRNb2RpZmllciwgYmFzZUNsYXNzTmFtZSwgbWF5YmVQb3N0Zml4TW9kaWZpZXJQb3NpdGlvbiB9ID0gcGFyc2VDbGFzc05hbWUob3JpZ2luYWxDbGFzc05hbWUpO1xuXHRcdGlmIChpc0V4dGVybmFsKSByZXR1cm4gRVhURVJOQUxfREVTQ1JJUFRPUjtcblx0XHRsZXQgaGFzUG9zdGZpeE1vZGlmaWVyID0gQm9vbGVhbihtYXliZVBvc3RmaXhNb2RpZmllclBvc2l0aW9uKTtcblx0XHRsZXQgY2xhc3NHcm91cElkO1xuXHRcdGlmIChoYXNQb3N0Zml4TW9kaWZpZXIpIHtcblx0XHRcdGNsYXNzR3JvdXBJZCA9IGdldENsYXNzR3JvdXBJZChiYXNlQ2xhc3NOYW1lLnN1YnN0cmluZygwLCBtYXliZVBvc3RmaXhNb2RpZmllclBvc2l0aW9uKSk7XG5cdFx0XHRjb25zdCBjbGFzc0dyb3VwSWRXaXRoUG9zdGZpeCA9IGNsYXNzR3JvdXBJZCAmJiBwb3N0Zml4TG9va3VwQ2xhc3NHcm91cElkc1tjbGFzc0dyb3VwSWRdID8gZ2V0Q2xhc3NHcm91cElkKGJhc2VDbGFzc05hbWUpIDogdm9pZCAwO1xuXHRcdFx0aWYgKGNsYXNzR3JvdXBJZFdpdGhQb3N0Zml4ICYmIGNsYXNzR3JvdXBJZFdpdGhQb3N0Zml4ICE9PSBjbGFzc0dyb3VwSWQpIHtcblx0XHRcdFx0Y2xhc3NHcm91cElkID0gY2xhc3NHcm91cElkV2l0aFBvc3RmaXg7XG5cdFx0XHRcdGhhc1Bvc3RmaXhNb2RpZmllciA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBjbGFzc0dyb3VwSWQgPSBnZXRDbGFzc0dyb3VwSWQoYmFzZUNsYXNzTmFtZSk7XG5cdFx0aWYgKCFjbGFzc0dyb3VwSWQpIHtcblx0XHRcdGlmICghaGFzUG9zdGZpeE1vZGlmaWVyKSByZXR1cm4gRVhURVJOQUxfREVTQ1JJUFRPUjtcblx0XHRcdGNsYXNzR3JvdXBJZCA9IGdldENsYXNzR3JvdXBJZChiYXNlQ2xhc3NOYW1lKTtcblx0XHRcdGlmICghY2xhc3NHcm91cElkKSByZXR1cm4gRVhURVJOQUxfREVTQ1JJUFRPUjtcblx0XHRcdGhhc1Bvc3RmaXhNb2RpZmllciA9IGZhbHNlO1xuXHRcdH1cblx0XHRjb25zdCB2YXJpYW50TW9kaWZpZXIgPSBtb2RpZmllcnMubGVuZ3RoID09PSAwID8gXCJcIiA6IG1vZGlmaWVycy5sZW5ndGggPT09IDEgPyBtb2RpZmllcnNbMF0gOiBzb3J0TW9kaWZpZXJzKG1vZGlmaWVycykuam9pbihcIjpcIik7XG5cdFx0Y29uc3QgbW9kaWZpZXJJZCA9IGhhc0ltcG9ydGFudE1vZGlmaWVyID8gdmFyaWFudE1vZGlmaWVyICsgXCIhXCIgOiB2YXJpYW50TW9kaWZpZXI7XG5cdFx0Y29uc3QgY29uZmxpY3RHcm91cHMgPSBnZXRDb25mbGljdGluZ0NsYXNzR3JvdXBJZHMoY2xhc3NHcm91cElkLCBoYXNQb3N0Zml4TW9kaWZpZXIpO1xuXHRcdGNvbnN0IGNvbmZsaWN0SWRzID0gW107XG5cdFx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNvbmZsaWN0R3JvdXBzLmxlbmd0aDsgaW5kZXgrKykgY29uZmxpY3RJZHMucHVzaChpbnRlcm5Db25mbGljdEtleShtb2RpZmllcklkICsgY29uZmxpY3RHcm91cHNbaW5kZXhdKSk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGlzRXh0ZXJuYWw6IGZhbHNlLFxuXHRcdFx0Y2xhc3NJZDogaW50ZXJuQ29uZmxpY3RLZXkobW9kaWZpZXJJZCArIGNsYXNzR3JvdXBJZCksXG5cdFx0XHRjb25mbGljdElkc1xuXHRcdH07XG5cdH07XG5cdGNvbnN0IGdldENsYXNzRGVzY3JpcHRvciA9IChvcmlnaW5hbENsYXNzTmFtZSkgPT4ge1xuXHRcdGxldCBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckNhY2hlW29yaWdpbmFsQ2xhc3NOYW1lXTtcblx0XHRpZiAoZGVzY3JpcHRvciAhPT0gdm9pZCAwKSByZXR1cm4gZGVzY3JpcHRvcjtcblx0XHRkZXNjcmlwdG9yID0gcHJldmlvdXNEZXNjcmlwdG9yQ2FjaGVbb3JpZ2luYWxDbGFzc05hbWVdO1xuXHRcdGlmIChkZXNjcmlwdG9yID09PSB2b2lkIDApIGRlc2NyaXB0b3IgPSBjb21wdXRlQ2xhc3NEZXNjcmlwdG9yKG9yaWdpbmFsQ2xhc3NOYW1lKTtcblx0XHRkZXNjcmlwdG9yQ2FjaGVbb3JpZ2luYWxDbGFzc05hbWVdID0gZGVzY3JpcHRvcjtcblx0XHRpZiAoKytkZXNjcmlwdG9yQ2FjaGVTaXplID4gREVTQ1JJUFRPUl9DQUNIRV9TSVpFKSB7XG5cdFx0XHRkZXNjcmlwdG9yQ2FjaGVTaXplID0gMDtcblx0XHRcdHByZXZpb3VzRGVzY3JpcHRvckNhY2hlID0gZGVzY3JpcHRvckNhY2hlO1xuXHRcdFx0ZGVzY3JpcHRvckNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0XHR9XG5cdFx0cmV0dXJuIGRlc2NyaXB0b3I7XG5cdH07XG5cdGNvbnN0IG1lcmdlQ2xhc3NMaXN0ID0gKGNsYXNzTGlzdCkgPT4ge1xuXHRcdGNvbnN0IGNsYXNzTmFtZXMgPSBzcGxpdENsYXNzTGlzdChjbGFzc0xpc3QpO1xuXHRcdGNvbnN0IGNsYXNzQ291bnQgPSBjbGFzc05hbWVzLmxlbmd0aDtcblx0XHRpZiAoY2xhc3NDb3VudCA9PT0gMSkgcmV0dXJuIGNsYXNzTmFtZXNbMF07XG5cdFx0Y3VycmVudEdlbmVyYXRpb24gPSBjdXJyZW50R2VuZXJhdGlvbiArIDEgfCAwO1xuXHRcdGlmIChjdXJyZW50R2VuZXJhdGlvbiA9PT0gMCkgY3VycmVudEdlbmVyYXRpb24gPSAxO1xuXHRcdGNvbnN0IGdlbmVyYXRpb24gPSBjdXJyZW50R2VuZXJhdGlvbjtcblx0XHRpZiAoY2xhc3NDb3VudCA+IGtlZXBGbGFncy5sZW5ndGgpIHtcblx0XHRcdGxldCBjYXBhY2l0eSA9IGtlZXBGbGFncy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoY2FwYWNpdHkgPCBjbGFzc0NvdW50KSBjYXBhY2l0eSAqPSAyO1xuXHRcdFx0a2VlcEZsYWdzID0gbmV3IFVpbnQ4QXJyYXkoY2FwYWNpdHkpO1xuXHRcdH1cblx0XHRsZXQgZGlkRHJvcCA9IGZhbHNlO1xuXHRcdGxldCB0b2tlbkNoYXJDb3VudCA9IDA7XG5cdFx0Zm9yIChsZXQgaW5kZXggPSBjbGFzc0NvdW50IC0gMTsgaW5kZXggPj0gMDsgaW5kZXggLT0gMSkge1xuXHRcdFx0Y29uc3QgY2xhc3NOYW1lID0gY2xhc3NOYW1lc1tpbmRleF07XG5cdFx0XHR0b2tlbkNoYXJDb3VudCArPSBjbGFzc05hbWUubGVuZ3RoO1xuXHRcdFx0Y29uc3QgZGVzY3JpcHRvciA9IGdldENsYXNzRGVzY3JpcHRvcihjbGFzc05hbWUpO1xuXHRcdFx0aWYgKGRlc2NyaXB0b3IuaXNFeHRlcm5hbCkge1xuXHRcdFx0XHRrZWVwRmxhZ3NbaW5kZXhdID0gMTtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBjbGFzc0lkID0gZGVzY3JpcHRvci5jbGFzc0lkO1xuXHRcdFx0aWYgKGNsYWltZWRHZW5lcmF0aW9uW2NsYXNzSWRdID09PSBnZW5lcmF0aW9uKSB7XG5cdFx0XHRcdGtlZXBGbGFnc1tpbmRleF0gPSAwO1xuXHRcdFx0XHRkaWREcm9wID0gdHJ1ZTtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cdFx0XHRjbGFpbWVkR2VuZXJhdGlvbltjbGFzc0lkXSA9IGdlbmVyYXRpb247XG5cdFx0XHRjb25zdCBjb25mbGljdElkcyA9IGRlc2NyaXB0b3IuY29uZmxpY3RJZHM7XG5cdFx0XHRmb3IgKGxldCBjb25mbGljdEluZGV4ID0gMDsgY29uZmxpY3RJbmRleCA8IGNvbmZsaWN0SWRzLmxlbmd0aDsgY29uZmxpY3RJbmRleCsrKSBjbGFpbWVkR2VuZXJhdGlvbltjb25mbGljdElkc1tjb25mbGljdEluZGV4XV0gPSBnZW5lcmF0aW9uO1xuXHRcdFx0a2VlcEZsYWdzW2luZGV4XSA9IDE7XG5cdFx0fVxuXHRcdGlmICghZGlkRHJvcCAmJiAhc3BsaXRTYXdOb25TcGFjZVdoaXRlc3BhY2UgJiYgY2xhc3NMaXN0Lmxlbmd0aCA9PT0gdG9rZW5DaGFyQ291bnQgKyBjbGFzc0NvdW50IC0gMSkgcmV0dXJuIGNsYXNzTGlzdDtcblx0XHRsZXQgcmVzdWx0ID0gXCJcIjtcblx0XHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY2xhc3NDb3VudDsgaW5kZXgrKykgaWYgKGtlZXBGbGFnc1tpbmRleF0gPT09IDEpIHtcblx0XHRcdGlmIChyZXN1bHQpIHJlc3VsdCArPSBcIiBcIjtcblx0XHRcdHJlc3VsdCArPSBjbGFzc05hbWVzW2luZGV4XTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fTtcblx0cmV0dXJuIHtcblx0XHRwYXJzZUNsYXNzTmFtZSxcblx0XHRzb3J0TW9kaWZpZXJzLFxuXHRcdHBvc3RmaXhMb29rdXBDbGFzc0dyb3VwSWRzLFxuXHRcdGdldENsYXNzR3JvdXBJZCxcblx0XHRnZXRDb25mbGljdGluZ0NsYXNzR3JvdXBJZHMsXG5cdFx0Z2V0Q2xhc3NEZXNjcmlwdG9yLFxuXHRcdG1lcmdlQ2xhc3NMaXN0XG5cdH07XG59O1xuY29uc3QgY3JlYXRlUG9zdGZpeExvb2t1cENsYXNzR3JvdXBJZHMgPSAoY29uZmlnKSA9PiB7XG5cdGNvbnN0IGxvb2t1cCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdGNvbnN0IGNsYXNzR3JvdXBJZHMgPSBjb25maWcucG9zdGZpeExvb2t1cENsYXNzR3JvdXBzO1xuXHRpZiAoY2xhc3NHcm91cElkcykgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNsYXNzR3JvdXBJZHMubGVuZ3RoOyBpbmRleCsrKSBsb29rdXBbY2xhc3NHcm91cElkc1tpbmRleF1dID0gdHJ1ZTtcblx0cmV0dXJuIGxvb2t1cDtcbn07XG5cbi8vI2VuZHJlZ2lvblxuLy8jcmVnaW9uIHNyYy9saWIvdHctam9pbi50c1xuY29uc3QgdHdKb2luID0gKC4uLmNsYXNzTGlzdHMpID0+IHtcblx0bGV0IGluZGV4ID0gMDtcblx0bGV0IGFyZ3VtZW50O1xuXHRsZXQgcmVzb2x2ZWRWYWx1ZTtcblx0bGV0IHN0cmluZyA9IFwiXCI7XG5cdHdoaWxlIChpbmRleCA8IGNsYXNzTGlzdHMubGVuZ3RoKSBpZiAoYXJndW1lbnQgPSBjbGFzc0xpc3RzW2luZGV4KytdKSB7XG5cdFx0aWYgKHJlc29sdmVkVmFsdWUgPSB0b1ZhbHVlKGFyZ3VtZW50KSkge1xuXHRcdFx0aWYgKHN0cmluZykgc3RyaW5nICs9IFwiIFwiO1xuXHRcdFx0c3RyaW5nICs9IHJlc29sdmVkVmFsdWU7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBzdHJpbmc7XG59O1xuY29uc3QgdG9WYWx1ZSA9ICh2YWx1ZSkgPT4ge1xuXHRpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSByZXR1cm4gdmFsdWU7XG5cdGxldCByZXNvbHZlZFZhbHVlO1xuXHRsZXQgc3RyaW5nID0gXCJcIjtcblx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHZhbHVlLmxlbmd0aDsgaW5kZXgrKykgaWYgKHZhbHVlW2luZGV4XSkge1xuXHRcdGlmIChyZXNvbHZlZFZhbHVlID0gdG9WYWx1ZSh2YWx1ZVtpbmRleF0pKSB7XG5cdFx0XHRpZiAoc3RyaW5nKSBzdHJpbmcgKz0gXCIgXCI7XG5cdFx0XHRzdHJpbmcgKz0gcmVzb2x2ZWRWYWx1ZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHN0cmluZztcbn07XG5cbi8vI2VuZHJlZ2lvblxuLy8jcmVnaW9uIHNyYy9saWIvY3JlYXRlLXRhaWx3aW5kLW1lcmdlLnRzXG4vKipcbiogV2hvbGUtc3RyaW5nIHJlc3VsdCBjYWNoZSBjYXBhY2l0eS4gTWF0Y2hlcyB0YWlsd2luZC1tZXJnZSdzIGRlZmF1bHQ7IGNuZmFzdCBzaGlwcyBhIHNpbmdsZSxcbiogbm9uLWNvbmZpZ3VyYWJsZSBjb25maWcgc28gaXQgaXMgYmFrZWQgaW4gcmF0aGVyIHRoYW4gZXhwb3NlZCBhcyBhbiBvcHRpb24uXG4qL1xuY29uc3QgTUVSR0VfQ0FDSEVfU0laRSA9IDUwMDtcbmNvbnN0IGNyZWF0ZVRhaWx3aW5kTWVyZ2UgPSAoY3JlYXRlQ29uZmlnKSA9PiB7XG5cdGxldCBjb25maWdVdGlscztcblx0bGV0IG1lcmdlQ2xhc3NMaXN0O1xuXHRsZXQgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXHRsZXQgcHJldmlvdXNDYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdGxldCBjYWNoZVNpemUgPSAwO1xuXHRjb25zdCBpbml0VGFpbHdpbmRNZXJnZSA9IChjbGFzc0xpc3QpID0+IHtcblx0XHRjb25maWdVdGlscyA9IGNyZWF0ZUNvbmZpZ1V0aWxzKGNyZWF0ZUNvbmZpZygpKTtcblx0XHRtZXJnZUNsYXNzTGlzdCA9IGNvbmZpZ1V0aWxzLm1lcmdlQ2xhc3NMaXN0O1xuXHRcdG1lcmdlLm1lcmdlU3RyaW5nID0gdGFpbHdpbmRNZXJnZTtcblx0XHRyZXR1cm4gdGFpbHdpbmRNZXJnZShjbGFzc0xpc3QpO1xuXHR9O1xuXHRjb25zdCB0YWlsd2luZE1lcmdlID0gKGNsYXNzTGlzdCkgPT4ge1xuXHRcdGxldCByZXN1bHQgPSBjYWNoZVtjbGFzc0xpc3RdO1xuXHRcdGlmIChyZXN1bHQgIT09IHZvaWQgMCkgcmV0dXJuIHJlc3VsdDtcblx0XHRyZXN1bHQgPSBwcmV2aW91c0NhY2hlW2NsYXNzTGlzdF07XG5cdFx0aWYgKHJlc3VsdCA9PT0gdm9pZCAwKSByZXN1bHQgPSBtZXJnZUNsYXNzTGlzdChjbGFzc0xpc3QpO1xuXHRcdGNhY2hlW2NsYXNzTGlzdF0gPSByZXN1bHQ7XG5cdFx0aWYgKCsrY2FjaGVTaXplID4gTUVSR0VfQ0FDSEVfU0laRSkge1xuXHRcdFx0Y2FjaGVTaXplID0gMDtcblx0XHRcdHByZXZpb3VzQ2FjaGUgPSBjYWNoZTtcblx0XHRcdGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fTtcblx0Y29uc3QgbWVyZ2UgPSAoLi4uYXJncykgPT4gbWVyZ2UubWVyZ2VTdHJpbmcodHdKb2luKC4uLmFyZ3MpKTtcblx0bWVyZ2UubWVyZ2VTdHJpbmcgPSBpbml0VGFpbHdpbmRNZXJnZTtcblx0cmV0dXJuIG1lcmdlO1xufTtcblxuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gc3JjL2xpYi9mcm9tLXRoZW1lLnRzXG5jb25zdCBmYWxsYmFja1RoZW1lQXJyID0gW107XG5jb25zdCBmcm9tVGhlbWUgPSAoa2V5KSA9PiB7XG5cdGNvbnN0IHRoZW1lR2V0dGVyID0gKHRoZW1lKSA9PiB0aGVtZVtrZXldIHx8IGZhbGxiYWNrVGhlbWVBcnI7XG5cdHRoZW1lR2V0dGVyLmlzVGhlbWVHZXR0ZXIgPSB0cnVlO1xuXHRyZXR1cm4gdGhlbWVHZXR0ZXI7XG59O1xuXG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvbGliL3ZhbGlkYXRvcnMudHNcbmNvbnN0IGFyYml0cmFyeVZhbHVlUmVnZXggPSAvXlxcWyg/OihcXHdbXFx3LV0qKTopPyguKylcXF0kL2k7XG5jb25zdCBhcmJpdHJhcnlWYXJpYWJsZVJlZ2V4ID0gL15cXCgoPzooXFx3W1xcdy1dKik6KT8oLispXFwpJC9pO1xuY29uc3QgZnJhY3Rpb25SZWdleCA9IC9eXFxkKyg/OlxcLlxcZCspP1xcL1xcZCsoPzpcXC5cXGQrKT8kLztcbmNvbnN0IHRzaGlydFVuaXRSZWdleCA9IC9eKFxcZCsoXFwuXFxkKyk/KT8oeHN8c218bWR8bGd8eGwpJC87XG5jb25zdCBsZW5ndGhVbml0UmVnZXggPSAvXFxkKyglfHB4fHI/ZW18W3NkbF0/dihbaHdpYl18bWlufG1heCl8cHR8cGN8aW58Y218bW18Y2FwfGNofGV4fHI/bGh8Y3Eod3xofGl8YnxtaW58bWF4KSl8XFxiKGNhbGN8bWlufG1heHxjbGFtcClcXCguK1xcKXxeMCQvO1xuY29uc3QgY29sb3JGdW5jdGlvblJlZ2V4ID0gL14ocmdiYT98aHNsYT98aHdifChvayk/KGxhYnxsY2gpfGNvbG9yLW1peClcXCguK1xcKSQvO1xuY29uc3Qgc2hhZG93UmVnZXggPSAvXihpbnNldF8pPy0/KChcXGQrKT9cXC4/KFxcZCspW2Etel0rfDApXy0/KChcXGQrKT9cXC4/KFxcZCspW2Etel0rfDApLztcbmNvbnN0IGltYWdlUmVnZXggPSAvXih1cmx8aW1hZ2V8aW1hZ2Utc2V0fGNyb3NzLWZhZGV8ZWxlbWVudHwocmVwZWF0aW5nLSk/KGxpbmVhcnxyYWRpYWx8Y29uaWMpLWdyYWRpZW50KVxcKC4rXFwpJC87XG5jb25zdCB0b051bWJlciA9IE51bWJlcjtcbmNvbnN0IG51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOO1xuY29uc3QgbnVtYmVySXNJbnRlZ2VyID0gTnVtYmVyLmlzSW50ZWdlcjtcbmNvbnN0IGlzRnJhY3Rpb24gPSAodmFsdWUpID0+IGZyYWN0aW9uUmVnZXgudGVzdCh2YWx1ZSk7XG5jb25zdCBpc051bWJlciA9ICh2YWx1ZSkgPT4gQm9vbGVhbih2YWx1ZSkgJiYgIW51bWJlcklzTmFOKHRvTnVtYmVyKHZhbHVlKSk7XG5jb25zdCBpc0ludGVnZXIgPSAodmFsdWUpID0+IEJvb2xlYW4odmFsdWUpICYmIG51bWJlcklzSW50ZWdlcih0b051bWJlcih2YWx1ZSkpO1xuY29uc3QgaXNQZXJjZW50ID0gKHZhbHVlKSA9PiB2YWx1ZS5lbmRzV2l0aChcIiVcIikgJiYgaXNOdW1iZXIodmFsdWUuc2xpY2UoMCwgLTEpKTtcbmNvbnN0IGlzVHNoaXJ0U2l6ZSA9ICh2YWx1ZSkgPT4gdHNoaXJ0VW5pdFJlZ2V4LnRlc3QodmFsdWUpO1xuY29uc3QgaXNBbnkgPSAoKSA9PiB0cnVlO1xuY29uc3QgaXNMZW5ndGhPbmx5ID0gKHZhbHVlKSA9PiBsZW5ndGhVbml0UmVnZXgudGVzdCh2YWx1ZSkgJiYgIWNvbG9yRnVuY3Rpb25SZWdleC50ZXN0KHZhbHVlKTtcbmNvbnN0IGlzTmV2ZXIgPSAoKSA9PiBmYWxzZTtcbmNvbnN0IGlzU2hhZG93ID0gKHZhbHVlKSA9PiBzaGFkb3dSZWdleC50ZXN0KHZhbHVlKTtcbmNvbnN0IGlzSW1hZ2UgPSAodmFsdWUpID0+IGltYWdlUmVnZXgudGVzdCh2YWx1ZSk7XG5jb25zdCBpc0FueU5vbkFyYml0cmFyeSA9ICh2YWx1ZSkgPT4gIWlzQXJiaXRyYXJ5VmFsdWUodmFsdWUpICYmICFpc0FyYml0cmFyeVZhcmlhYmxlKHZhbHVlKTtcbmNvbnN0IGlzTmFtZWRDb250YWluZXJRdWVyeSA9ICh2YWx1ZSkgPT4gdmFsdWUuc3RhcnRzV2l0aChcIkBjb250YWluZXJcIikgJiYgKHZhbHVlWzEwXSA9PT0gXCIvXCIgJiYgdmFsdWVbMTFdICE9PSB2b2lkIDAgfHwgdmFsdWVbMTFdID09PSBcInNcIiAmJiB2YWx1ZVsxNl0gIT09IHZvaWQgMCAmJiB2YWx1ZS5zdGFydHNXaXRoKFwiLXNpemUvXCIsIDEwKSB8fCB2YWx1ZVsxMV0gPT09IFwiblwiICYmIHZhbHVlWzE4XSAhPT0gdm9pZCAwICYmIHZhbHVlLnN0YXJ0c1dpdGgoXCItbm9ybWFsL1wiLCAxMCkpO1xuY29uc3QgaXNBcmJpdHJhcnlTaXplID0gKHZhbHVlKSA9PiBnZXRJc0FyYml0cmFyeVZhbHVlKHZhbHVlLCBpc0xhYmVsU2l6ZSwgaXNOZXZlcik7XG5jb25zdCBpc0FyYml0cmFyeVZhbHVlID0gKHZhbHVlKSA9PiBhcmJpdHJhcnlWYWx1ZVJlZ2V4LnRlc3QodmFsdWUpO1xuY29uc3QgaXNBcmJpdHJhcnlMZW5ndGggPSAodmFsdWUpID0+IGdldElzQXJiaXRyYXJ5VmFsdWUodmFsdWUsIGlzTGFiZWxMZW5ndGgsIGlzTGVuZ3RoT25seSk7XG5jb25zdCBpc0FyYml0cmFyeU51bWJlciA9ICh2YWx1ZSkgPT4gZ2V0SXNBcmJpdHJhcnlWYWx1ZSh2YWx1ZSwgaXNMYWJlbE51bWJlciwgaXNOdW1iZXIpO1xuY29uc3QgaXNBcmJpdHJhcnlXZWlnaHQgPSAodmFsdWUpID0+IGdldElzQXJiaXRyYXJ5VmFsdWUodmFsdWUsIGlzTGFiZWxXZWlnaHQsIGlzQW55KTtcbmNvbnN0IGlzQXJiaXRyYXJ5RmFtaWx5TmFtZSA9ICh2YWx1ZSkgPT4gZ2V0SXNBcmJpdHJhcnlWYWx1ZSh2YWx1ZSwgaXNMYWJlbEZhbWlseU5hbWUsIGlzTmV2ZXIpO1xuY29uc3QgaXNBcmJpdHJhcnlQb3NpdGlvbiA9ICh2YWx1ZSkgPT4gZ2V0SXNBcmJpdHJhcnlWYWx1ZSh2YWx1ZSwgaXNMYWJlbFBvc2l0aW9uLCBpc05ldmVyKTtcbmNvbnN0IGlzQXJiaXRyYXJ5SW1hZ2UgPSAodmFsdWUpID0+IGdldElzQXJiaXRyYXJ5VmFsdWUodmFsdWUsIGlzTGFiZWxJbWFnZSwgaXNJbWFnZSk7XG5jb25zdCBpc0FyYml0cmFyeVNoYWRvdyA9ICh2YWx1ZSkgPT4gZ2V0SXNBcmJpdHJhcnlWYWx1ZSh2YWx1ZSwgaXNMYWJlbFNoYWRvdywgaXNTaGFkb3cpO1xuY29uc3QgaXNBcmJpdHJhcnlWYXJpYWJsZSA9ICh2YWx1ZSkgPT4gYXJiaXRyYXJ5VmFyaWFibGVSZWdleC50ZXN0KHZhbHVlKTtcbmNvbnN0IGlzQXJiaXRyYXJ5VmFyaWFibGVMZW5ndGggPSAodmFsdWUpID0+IGdldElzQXJiaXRyYXJ5VmFyaWFibGUodmFsdWUsIGlzTGFiZWxMZW5ndGgpO1xuY29uc3QgaXNBcmJpdHJhcnlWYXJpYWJsZUZhbWlseU5hbWUgPSAodmFsdWUpID0+IGdldElzQXJiaXRyYXJ5VmFyaWFibGUodmFsdWUsIGlzTGFiZWxGYW1pbHlOYW1lKTtcbmNvbnN0IGlzQXJiaXRyYXJ5VmFyaWFibGVQb3NpdGlvbiA9ICh2YWx1ZSkgPT4gZ2V0SXNBcmJpdHJhcnlWYXJpYWJsZSh2YWx1ZSwgaXNMYWJlbFBvc2l0aW9uKTtcbmNvbnN0IGlzQXJiaXRyYXJ5VmFyaWFibGVTaXplID0gKHZhbHVlKSA9PiBnZXRJc0FyYml0cmFyeVZhcmlhYmxlKHZhbHVlLCBpc0xhYmVsU2l6ZSk7XG5jb25zdCBpc0FyYml0cmFyeVZhcmlhYmxlSW1hZ2UgPSAodmFsdWUpID0+IGdldElzQXJiaXRyYXJ5VmFyaWFibGUodmFsdWUsIGlzTGFiZWxJbWFnZSk7XG5jb25zdCBpc0FyYml0cmFyeVZhcmlhYmxlU2hhZG93ID0gKHZhbHVlKSA9PiBnZXRJc0FyYml0cmFyeVZhcmlhYmxlKHZhbHVlLCBpc0xhYmVsU2hhZG93LCB0cnVlKTtcbmNvbnN0IGlzQXJiaXRyYXJ5VmFyaWFibGVXZWlnaHQgPSAodmFsdWUpID0+IGdldElzQXJiaXRyYXJ5VmFyaWFibGUodmFsdWUsIGlzTGFiZWxXZWlnaHQsIHRydWUpO1xuY29uc3QgZ2V0SXNBcmJpdHJhcnlWYWx1ZSA9ICh2YWx1ZSwgdGVzdExhYmVsLCB0ZXN0VmFsdWUpID0+IHtcblx0Y29uc3QgcmVzdWx0ID0gYXJiaXRyYXJ5VmFsdWVSZWdleC5leGVjKHZhbHVlKTtcblx0aWYgKHJlc3VsdCkge1xuXHRcdGlmIChyZXN1bHRbMV0pIHJldHVybiB0ZXN0TGFiZWwocmVzdWx0WzFdKTtcblx0XHRyZXR1cm4gdGVzdFZhbHVlKHJlc3VsdFsyXSk7XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufTtcbmNvbnN0IGdldElzQXJiaXRyYXJ5VmFyaWFibGUgPSAodmFsdWUsIHRlc3RMYWJlbCwgc2hvdWxkTWF0Y2hOb0xhYmVsID0gZmFsc2UpID0+IHtcblx0Y29uc3QgcmVzdWx0ID0gYXJiaXRyYXJ5VmFyaWFibGVSZWdleC5leGVjKHZhbHVlKTtcblx0aWYgKHJlc3VsdCkge1xuXHRcdGlmIChyZXN1bHRbMV0pIHJldHVybiB0ZXN0TGFiZWwocmVzdWx0WzFdKTtcblx0XHRyZXR1cm4gc2hvdWxkTWF0Y2hOb0xhYmVsO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn07XG5jb25zdCBpc0xhYmVsUG9zaXRpb24gPSAobGFiZWwpID0+IGxhYmVsID09PSBcInBvc2l0aW9uXCIgfHwgbGFiZWwgPT09IFwicGVyY2VudGFnZVwiO1xuY29uc3QgaXNMYWJlbEltYWdlID0gKGxhYmVsKSA9PiBsYWJlbCA9PT0gXCJpbWFnZVwiIHx8IGxhYmVsID09PSBcInVybFwiO1xuY29uc3QgaXNMYWJlbFNpemUgPSAobGFiZWwpID0+IGxhYmVsID09PSBcImxlbmd0aFwiIHx8IGxhYmVsID09PSBcInNpemVcIiB8fCBsYWJlbCA9PT0gXCJiZy1zaXplXCI7XG5jb25zdCBpc0xhYmVsTGVuZ3RoID0gKGxhYmVsKSA9PiBsYWJlbCA9PT0gXCJsZW5ndGhcIjtcbmNvbnN0IGlzTGFiZWxOdW1iZXIgPSAobGFiZWwpID0+IGxhYmVsID09PSBcIm51bWJlclwiO1xuY29uc3QgaXNMYWJlbEZhbWlseU5hbWUgPSAobGFiZWwpID0+IGxhYmVsID09PSBcImZhbWlseS1uYW1lXCI7XG5jb25zdCBpc0xhYmVsV2VpZ2h0ID0gKGxhYmVsKSA9PiBsYWJlbCA9PT0gXCJudW1iZXJcIiB8fCBsYWJlbCA9PT0gXCJ3ZWlnaHRcIjtcbmNvbnN0IGlzTGFiZWxTaGFkb3cgPSAobGFiZWwpID0+IGxhYmVsID09PSBcInNoYWRvd1wiO1xuXG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvbGliL2RlZmF1bHQtY29uZmlnLnRzXG5jb25zdCBnZXREZWZhdWx0Q29uZmlnID0gKCkgPT4ge1xuXHQvKipcblx0KiBUaGVtZSBnZXR0ZXJzIGZvciB0aGVtZSB2YXJpYWJsZSBuYW1lc3BhY2VzXG5cdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3RoZW1lI3RoZW1lLXZhcmlhYmxlLW5hbWVzcGFjZXNcblx0Ki9cblx0Y29uc3QgdGhlbWVDb2xvciA9IGZyb21UaGVtZShcImNvbG9yXCIpO1xuXHRjb25zdCB0aGVtZUZvbnQgPSBmcm9tVGhlbWUoXCJmb250XCIpO1xuXHRjb25zdCB0aGVtZVRleHQgPSBmcm9tVGhlbWUoXCJ0ZXh0XCIpO1xuXHRjb25zdCB0aGVtZUZvbnRXZWlnaHQgPSBmcm9tVGhlbWUoXCJmb250LXdlaWdodFwiKTtcblx0Y29uc3QgdGhlbWVUcmFja2luZyA9IGZyb21UaGVtZShcInRyYWNraW5nXCIpO1xuXHRjb25zdCB0aGVtZUxlYWRpbmcgPSBmcm9tVGhlbWUoXCJsZWFkaW5nXCIpO1xuXHRjb25zdCB0aGVtZUJyZWFrcG9pbnQgPSBmcm9tVGhlbWUoXCJicmVha3BvaW50XCIpO1xuXHRjb25zdCB0aGVtZUNvbnRhaW5lciA9IGZyb21UaGVtZShcImNvbnRhaW5lclwiKTtcblx0Y29uc3QgdGhlbWVTcGFjaW5nID0gZnJvbVRoZW1lKFwic3BhY2luZ1wiKTtcblx0Y29uc3QgdGhlbWVSYWRpdXMgPSBmcm9tVGhlbWUoXCJyYWRpdXNcIik7XG5cdGNvbnN0IHRoZW1lU2hhZG93ID0gZnJvbVRoZW1lKFwic2hhZG93XCIpO1xuXHRjb25zdCB0aGVtZUluc2V0U2hhZG93ID0gZnJvbVRoZW1lKFwiaW5zZXQtc2hhZG93XCIpO1xuXHRjb25zdCB0aGVtZVRleHRTaGFkb3cgPSBmcm9tVGhlbWUoXCJ0ZXh0LXNoYWRvd1wiKTtcblx0Y29uc3QgdGhlbWVEcm9wU2hhZG93ID0gZnJvbVRoZW1lKFwiZHJvcC1zaGFkb3dcIik7XG5cdGNvbnN0IHRoZW1lQmx1ciA9IGZyb21UaGVtZShcImJsdXJcIik7XG5cdGNvbnN0IHRoZW1lUGVyc3BlY3RpdmUgPSBmcm9tVGhlbWUoXCJwZXJzcGVjdGl2ZVwiKTtcblx0Y29uc3QgdGhlbWVBc3BlY3QgPSBmcm9tVGhlbWUoXCJhc3BlY3RcIik7XG5cdGNvbnN0IHRoZW1lRWFzZSA9IGZyb21UaGVtZShcImVhc2VcIik7XG5cdGNvbnN0IHRoZW1lQW5pbWF0ZSA9IGZyb21UaGVtZShcImFuaW1hdGVcIik7XG5cdC8qKlxuXHQqIEhlbHBlcnMgdG8gYXZvaWQgcmVwZWF0aW5nIHRoZSBzYW1lIHNjYWxlc1xuXHQqXG5cdCogV2UgdXNlIGZ1bmN0aW9ucyB0aGF0IGNyZWF0ZSBhIG5ldyBhcnJheSBldmVyeSB0aW1lIHRoZXkncmUgY2FsbGVkIGluc3RlYWQgb2Ygc3RhdGljIGFycmF5cy5cblx0KiBUaGlzIGVuc3VyZXMgdGhhdCB1c2VycyB3aG8gbW9kaWZ5IGFueSBzY2FsZSBieSBtdXRhdGluZyB0aGUgYXJyYXkgKGUuZy4gd2l0aCBgYXJyYXkucHVzaChlbGVtZW50KWApIGRvbid0IGFjY2lkZW50YWxseSBtdXRhdGUgYXJyYXlzIGluIG90aGVyIHBhcnRzIG9mIHRoZSBjb25maWcuXG5cdCovXG5cdGNvbnN0IHNjYWxlQnJlYWsgPSAoKSA9PiBbXG5cdFx0XCJhdXRvXCIsXG5cdFx0XCJhdm9pZFwiLFxuXHRcdFwiYWxsXCIsXG5cdFx0XCJhdm9pZC1wYWdlXCIsXG5cdFx0XCJwYWdlXCIsXG5cdFx0XCJsZWZ0XCIsXG5cdFx0XCJyaWdodFwiLFxuXHRcdFwiY29sdW1uXCJcblx0XTtcblx0Y29uc3Qgc2NhbGVQb3NpdGlvbiA9ICgpID0+IFtcblx0XHRcImNlbnRlclwiLFxuXHRcdFwidG9wXCIsXG5cdFx0XCJib3R0b21cIixcblx0XHRcImxlZnRcIixcblx0XHRcInJpZ2h0XCIsXG5cdFx0XCJ0b3AtbGVmdFwiLFxuXHRcdFwibGVmdC10b3BcIixcblx0XHRcInRvcC1yaWdodFwiLFxuXHRcdFwicmlnaHQtdG9wXCIsXG5cdFx0XCJib3R0b20tcmlnaHRcIixcblx0XHRcInJpZ2h0LWJvdHRvbVwiLFxuXHRcdFwiYm90dG9tLWxlZnRcIixcblx0XHRcImxlZnQtYm90dG9tXCJcblx0XTtcblx0Y29uc3Qgc2NhbGVQb3NpdGlvbldpdGhBcmJpdHJhcnkgPSAoKSA9PiBbXG5cdFx0Li4uc2NhbGVQb3NpdGlvbigpLFxuXHRcdGlzQXJiaXRyYXJ5VmFyaWFibGUsXG5cdFx0aXNBcmJpdHJhcnlWYWx1ZVxuXHRdO1xuXHRjb25zdCBzY2FsZU92ZXJmbG93ID0gKCkgPT4gW1xuXHRcdFwiYXV0b1wiLFxuXHRcdFwiaGlkZGVuXCIsXG5cdFx0XCJjbGlwXCIsXG5cdFx0XCJ2aXNpYmxlXCIsXG5cdFx0XCJzY3JvbGxcIlxuXHRdO1xuXHRjb25zdCBzY2FsZU92ZXJzY3JvbGwgPSAoKSA9PiBbXG5cdFx0XCJhdXRvXCIsXG5cdFx0XCJjb250YWluXCIsXG5cdFx0XCJub25lXCJcblx0XTtcblx0Y29uc3Qgc2NhbGVVbmFtYmlndW91c1NwYWNpbmcgPSAoKSA9PiBbXG5cdFx0aXNBcmJpdHJhcnlWYXJpYWJsZSxcblx0XHRpc0FyYml0cmFyeVZhbHVlLFxuXHRcdHRoZW1lU3BhY2luZ1xuXHRdO1xuXHRjb25zdCBzY2FsZUluc2V0ID0gKCkgPT4gW1xuXHRcdGlzRnJhY3Rpb24sXG5cdFx0XCJmdWxsXCIsXG5cdFx0XCJhdXRvXCIsXG5cdFx0Li4uc2NhbGVVbmFtYmlndW91c1NwYWNpbmcoKVxuXHRdO1xuXHRjb25zdCBzY2FsZUdyaWRUZW1wbGF0ZUNvbHNSb3dzID0gKCkgPT4gW1xuXHRcdGlzSW50ZWdlcixcblx0XHRcIm5vbmVcIixcblx0XHRcInN1YmdyaWRcIixcblx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdGlzQXJiaXRyYXJ5VmFsdWVcblx0XTtcblx0Y29uc3Qgc2NhbGVHcmlkQ29sUm93U3RhcnRBbmRFbmQgPSAoKSA9PiBbXG5cdFx0XCJhdXRvXCIsXG5cdFx0eyBzcGFuOiBbXG5cdFx0XHRcImZ1bGxcIixcblx0XHRcdGlzSW50ZWdlcixcblx0XHRcdGlzQXJiaXRyYXJ5VmFyaWFibGUsXG5cdFx0XHRpc0FyYml0cmFyeVZhbHVlXG5cdFx0XSB9LFxuXHRcdGlzSW50ZWdlcixcblx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdGlzQXJiaXRyYXJ5VmFsdWVcblx0XTtcblx0Y29uc3Qgc2NhbGVHcmlkQ29sUm93U3RhcnRPckVuZCA9ICgpID0+IFtcblx0XHRpc0ludGVnZXIsXG5cdFx0XCJhdXRvXCIsXG5cdFx0aXNBcmJpdHJhcnlWYXJpYWJsZSxcblx0XHRpc0FyYml0cmFyeVZhbHVlXG5cdF07XG5cdGNvbnN0IHNjYWxlR3JpZEF1dG9Db2xzUm93cyA9ICgpID0+IFtcblx0XHRcImF1dG9cIixcblx0XHRcIm1pblwiLFxuXHRcdFwibWF4XCIsXG5cdFx0XCJmclwiLFxuXHRcdGlzQXJiaXRyYXJ5VmFyaWFibGUsXG5cdFx0aXNBcmJpdHJhcnlWYWx1ZVxuXHRdO1xuXHRjb25zdCBzY2FsZUFsaWduUHJpbWFyeUF4aXMgPSAoKSA9PiBbXG5cdFx0XCJzdGFydFwiLFxuXHRcdFwiZW5kXCIsXG5cdFx0XCJjZW50ZXJcIixcblx0XHRcImJldHdlZW5cIixcblx0XHRcImFyb3VuZFwiLFxuXHRcdFwiZXZlbmx5XCIsXG5cdFx0XCJzdHJldGNoXCIsXG5cdFx0XCJiYXNlbGluZVwiLFxuXHRcdFwiY2VudGVyLXNhZmVcIixcblx0XHRcImVuZC1zYWZlXCJcblx0XTtcblx0Y29uc3Qgc2NhbGVBbGlnblNlY29uZGFyeUF4aXMgPSAoKSA9PiBbXG5cdFx0XCJzdGFydFwiLFxuXHRcdFwiZW5kXCIsXG5cdFx0XCJjZW50ZXJcIixcblx0XHRcInN0cmV0Y2hcIixcblx0XHRcImNlbnRlci1zYWZlXCIsXG5cdFx0XCJlbmQtc2FmZVwiXG5cdF07XG5cdGNvbnN0IHNjYWxlTWFyZ2luID0gKCkgPT4gW1wiYXV0b1wiLCAuLi5zY2FsZVVuYW1iaWd1b3VzU3BhY2luZygpXTtcblx0Y29uc3Qgc2NhbGVTaXppbmcgPSAoKSA9PiBbXG5cdFx0aXNGcmFjdGlvbixcblx0XHRcImF1dG9cIixcblx0XHRcImZ1bGxcIixcblx0XHRcImR2d1wiLFxuXHRcdFwiZHZoXCIsXG5cdFx0XCJsdndcIixcblx0XHRcImx2aFwiLFxuXHRcdFwic3Z3XCIsXG5cdFx0XCJzdmhcIixcblx0XHRcIm1pblwiLFxuXHRcdFwibWF4XCIsXG5cdFx0XCJmaXRcIixcblx0XHQuLi5zY2FsZVVuYW1iaWd1b3VzU3BhY2luZygpXG5cdF07XG5cdGNvbnN0IHNjYWxlU2l6aW5nSW5saW5lID0gKCkgPT4gW1xuXHRcdGlzRnJhY3Rpb24sXG5cdFx0XCJzY3JlZW5cIixcblx0XHRcImZ1bGxcIixcblx0XHRcImR2d1wiLFxuXHRcdFwibHZ3XCIsXG5cdFx0XCJzdndcIixcblx0XHRcIm1pblwiLFxuXHRcdFwibWF4XCIsXG5cdFx0XCJmaXRcIixcblx0XHQuLi5zY2FsZVVuYW1iaWd1b3VzU3BhY2luZygpXG5cdF07XG5cdGNvbnN0IHNjYWxlU2l6aW5nQmxvY2sgPSAoKSA9PiBbXG5cdFx0aXNGcmFjdGlvbixcblx0XHRcInNjcmVlblwiLFxuXHRcdFwiZnVsbFwiLFxuXHRcdFwibGhcIixcblx0XHRcImR2aFwiLFxuXHRcdFwibHZoXCIsXG5cdFx0XCJzdmhcIixcblx0XHRcIm1pblwiLFxuXHRcdFwibWF4XCIsXG5cdFx0XCJmaXRcIixcblx0XHQuLi5zY2FsZVVuYW1iaWd1b3VzU3BhY2luZygpXG5cdF07XG5cdGNvbnN0IHNjYWxlQ29sb3IgPSAoKSA9PiBbXG5cdFx0dGhlbWVDb2xvcixcblx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdGlzQXJiaXRyYXJ5VmFsdWVcblx0XTtcblx0Y29uc3Qgc2NhbGVCZ1Bvc2l0aW9uID0gKCkgPT4gW1xuXHRcdC4uLnNjYWxlUG9zaXRpb24oKSxcblx0XHRpc0FyYml0cmFyeVZhcmlhYmxlUG9zaXRpb24sXG5cdFx0aXNBcmJpdHJhcnlQb3NpdGlvbixcblx0XHR7IHBvc2l0aW9uOiBbaXNBcmJpdHJhcnlWYXJpYWJsZSwgaXNBcmJpdHJhcnlWYWx1ZV0gfVxuXHRdO1xuXHRjb25zdCBzY2FsZUJnUmVwZWF0ID0gKCkgPT4gW1wibm8tcmVwZWF0XCIsIHsgcmVwZWF0OiBbXG5cdFx0XCJcIixcblx0XHRcInhcIixcblx0XHRcInlcIixcblx0XHRcInNwYWNlXCIsXG5cdFx0XCJyb3VuZFwiXG5cdF0gfV07XG5cdGNvbnN0IHNjYWxlQmdTaXplID0gKCkgPT4gW1xuXHRcdFwiYXV0b1wiLFxuXHRcdFwiY292ZXJcIixcblx0XHRcImNvbnRhaW5cIixcblx0XHRpc0FyYml0cmFyeVZhcmlhYmxlU2l6ZSxcblx0XHRpc0FyYml0cmFyeVNpemUsXG5cdFx0eyBzaXplOiBbaXNBcmJpdHJhcnlWYXJpYWJsZSwgaXNBcmJpdHJhcnlWYWx1ZV0gfVxuXHRdO1xuXHRjb25zdCBzY2FsZUdyYWRpZW50U3RvcFBvc2l0aW9uID0gKCkgPT4gW1xuXHRcdGlzUGVyY2VudCxcblx0XHRpc0FyYml0cmFyeVZhcmlhYmxlTGVuZ3RoLFxuXHRcdGlzQXJiaXRyYXJ5TGVuZ3RoXG5cdF07XG5cdGNvbnN0IHNjYWxlUmFkaXVzID0gKCkgPT4gW1xuXHRcdFwiXCIsXG5cdFx0XCJub25lXCIsXG5cdFx0XCJmdWxsXCIsXG5cdFx0dGhlbWVSYWRpdXMsXG5cdFx0aXNBcmJpdHJhcnlWYXJpYWJsZSxcblx0XHRpc0FyYml0cmFyeVZhbHVlXG5cdF07XG5cdGNvbnN0IHNjYWxlQm9yZGVyV2lkdGggPSAoKSA9PiBbXG5cdFx0XCJcIixcblx0XHRpc051bWJlcixcblx0XHRpc0FyYml0cmFyeVZhcmlhYmxlTGVuZ3RoLFxuXHRcdGlzQXJiaXRyYXJ5TGVuZ3RoXG5cdF07XG5cdGNvbnN0IHNjYWxlTGluZVN0eWxlID0gKCkgPT4gW1xuXHRcdFwic29saWRcIixcblx0XHRcImRhc2hlZFwiLFxuXHRcdFwiZG90dGVkXCIsXG5cdFx0XCJkb3VibGVcIlxuXHRdO1xuXHRjb25zdCBzY2FsZUJsZW5kTW9kZSA9ICgpID0+IFtcblx0XHRcIm5vcm1hbFwiLFxuXHRcdFwibXVsdGlwbHlcIixcblx0XHRcInNjcmVlblwiLFxuXHRcdFwib3ZlcmxheVwiLFxuXHRcdFwiZGFya2VuXCIsXG5cdFx0XCJsaWdodGVuXCIsXG5cdFx0XCJjb2xvci1kb2RnZVwiLFxuXHRcdFwiY29sb3ItYnVyblwiLFxuXHRcdFwiaGFyZC1saWdodFwiLFxuXHRcdFwic29mdC1saWdodFwiLFxuXHRcdFwiZGlmZmVyZW5jZVwiLFxuXHRcdFwiZXhjbHVzaW9uXCIsXG5cdFx0XCJodWVcIixcblx0XHRcInNhdHVyYXRpb25cIixcblx0XHRcImNvbG9yXCIsXG5cdFx0XCJsdW1pbm9zaXR5XCJcblx0XTtcblx0Y29uc3Qgc2NhbGVNYXNrSW1hZ2VQb3NpdGlvbiA9ICgpID0+IFtcblx0XHRpc051bWJlcixcblx0XHRpc1BlcmNlbnQsXG5cdFx0aXNBcmJpdHJhcnlWYXJpYWJsZVBvc2l0aW9uLFxuXHRcdGlzQXJiaXRyYXJ5UG9zaXRpb25cblx0XTtcblx0Y29uc3Qgc2NhbGVCbHVyID0gKCkgPT4gW1xuXHRcdFwiXCIsXG5cdFx0XCJub25lXCIsXG5cdFx0dGhlbWVCbHVyLFxuXHRcdGlzQXJiaXRyYXJ5VmFyaWFibGUsXG5cdFx0aXNBcmJpdHJhcnlWYWx1ZVxuXHRdO1xuXHRjb25zdCBzY2FsZVJvdGF0ZSA9ICgpID0+IFtcblx0XHRcIm5vbmVcIixcblx0XHRpc051bWJlcixcblx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdGlzQXJiaXRyYXJ5VmFsdWVcblx0XTtcblx0Y29uc3Qgc2NhbGVTY2FsZSA9ICgpID0+IFtcblx0XHRcIm5vbmVcIixcblx0XHRpc051bWJlcixcblx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdGlzQXJiaXRyYXJ5VmFsdWVcblx0XTtcblx0Y29uc3Qgc2NhbGVTa2V3ID0gKCkgPT4gW1xuXHRcdGlzTnVtYmVyLFxuXHRcdGlzQXJiaXRyYXJ5VmFyaWFibGUsXG5cdFx0aXNBcmJpdHJhcnlWYWx1ZVxuXHRdO1xuXHRjb25zdCBzY2FsZVRyYW5zbGF0ZSA9ICgpID0+IFtcblx0XHRpc0ZyYWN0aW9uLFxuXHRcdFwiZnVsbFwiLFxuXHRcdC4uLnNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKClcblx0XTtcblx0cmV0dXJuIHtcblx0XHR0aGVtZToge1xuXHRcdFx0YW5pbWF0ZTogW1xuXHRcdFx0XHRcInNwaW5cIixcblx0XHRcdFx0XCJwaW5nXCIsXG5cdFx0XHRcdFwicHVsc2VcIixcblx0XHRcdFx0XCJib3VuY2VcIlxuXHRcdFx0XSxcblx0XHRcdGFzcGVjdDogW1widmlkZW9cIl0sXG5cdFx0XHRibHVyOiBbaXNUc2hpcnRTaXplXSxcblx0XHRcdGJyZWFrcG9pbnQ6IFtpc1RzaGlydFNpemVdLFxuXHRcdFx0Y29sb3I6IFtpc0FueV0sXG5cdFx0XHRjb250YWluZXI6IFtpc1RzaGlydFNpemVdLFxuXHRcdFx0XCJkcm9wLXNoYWRvd1wiOiBbaXNUc2hpcnRTaXplXSxcblx0XHRcdGVhc2U6IFtcblx0XHRcdFx0XCJpblwiLFxuXHRcdFx0XHRcIm91dFwiLFxuXHRcdFx0XHRcImluLW91dFwiXG5cdFx0XHRdLFxuXHRcdFx0Zm9udDogW2lzQW55Tm9uQXJiaXRyYXJ5XSxcblx0XHRcdFwiZm9udC13ZWlnaHRcIjogW1xuXHRcdFx0XHRcInRoaW5cIixcblx0XHRcdFx0XCJleHRyYWxpZ2h0XCIsXG5cdFx0XHRcdFwibGlnaHRcIixcblx0XHRcdFx0XCJub3JtYWxcIixcblx0XHRcdFx0XCJtZWRpdW1cIixcblx0XHRcdFx0XCJzZW1pYm9sZFwiLFxuXHRcdFx0XHRcImJvbGRcIixcblx0XHRcdFx0XCJleHRyYWJvbGRcIixcblx0XHRcdFx0XCJibGFja1wiXG5cdFx0XHRdLFxuXHRcdFx0XCJpbnNldC1zaGFkb3dcIjogW2lzVHNoaXJ0U2l6ZV0sXG5cdFx0XHRsZWFkaW5nOiBbXG5cdFx0XHRcdFwibm9uZVwiLFxuXHRcdFx0XHRcInRpZ2h0XCIsXG5cdFx0XHRcdFwic251Z1wiLFxuXHRcdFx0XHRcIm5vcm1hbFwiLFxuXHRcdFx0XHRcInJlbGF4ZWRcIixcblx0XHRcdFx0XCJsb29zZVwiXG5cdFx0XHRdLFxuXHRcdFx0cGVyc3BlY3RpdmU6IFtcblx0XHRcdFx0XCJkcmFtYXRpY1wiLFxuXHRcdFx0XHRcIm5lYXJcIixcblx0XHRcdFx0XCJub3JtYWxcIixcblx0XHRcdFx0XCJtaWRyYW5nZVwiLFxuXHRcdFx0XHRcImRpc3RhbnRcIixcblx0XHRcdFx0XCJub25lXCJcblx0XHRcdF0sXG5cdFx0XHRyYWRpdXM6IFtpc1RzaGlydFNpemVdLFxuXHRcdFx0c2hhZG93OiBbaXNUc2hpcnRTaXplXSxcblx0XHRcdHNwYWNpbmc6IFtcInB4XCIsIGlzTnVtYmVyXSxcblx0XHRcdHRleHQ6IFtpc1RzaGlydFNpemVdLFxuXHRcdFx0XCJ0ZXh0LXNoYWRvd1wiOiBbaXNUc2hpcnRTaXplXSxcblx0XHRcdHRyYWNraW5nOiBbXG5cdFx0XHRcdFwidGlnaHRlclwiLFxuXHRcdFx0XHRcInRpZ2h0XCIsXG5cdFx0XHRcdFwibm9ybWFsXCIsXG5cdFx0XHRcdFwid2lkZVwiLFxuXHRcdFx0XHRcIndpZGVyXCIsXG5cdFx0XHRcdFwid2lkZXN0XCJcblx0XHRcdF1cblx0XHR9LFxuXHRcdGNsYXNzR3JvdXBzOiB7XG5cdFx0XHQvKipcblx0XHRcdCogQXNwZWN0IFJhdGlvXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9hc3BlY3QtcmF0aW9cblx0XHRcdCovXG5cdFx0XHRhc3BlY3Q6IFt7IGFzcGVjdDogW1xuXHRcdFx0XHRcImF1dG9cIixcblx0XHRcdFx0XCJzcXVhcmVcIixcblx0XHRcdFx0aXNGcmFjdGlvbixcblx0XHRcdFx0aXNBcmJpdHJhcnlWYWx1ZSxcblx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZSxcblx0XHRcdFx0dGhlbWVBc3BlY3Rcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQ29udGFpbmVyXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9jb250YWluZXJcblx0XHRcdCogQGRlcHJlY2F0ZWQgc2luY2UgVGFpbHdpbmQgQ1NTIHY0LjAuMFxuXHRcdFx0Ki9cblx0XHRcdGNvbnRhaW5lcjogW1wiY29udGFpbmVyXCJdLFxuXHRcdFx0LyoqXG5cdFx0XHQqIENvbnRhaW5lciBUeXBlXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9yZXNwb25zaXZlLWRlc2lnbiNjb250YWluZXItcXVlcmllc1xuXHRcdFx0Ki9cblx0XHRcdFwiY29udGFpbmVyLXR5cGVcIjogW3sgXCJAY29udGFpbmVyXCI6IFtcblx0XHRcdFx0XCJcIixcblx0XHRcdFx0XCJub3JtYWxcIixcblx0XHRcdFx0XCJzaXplXCIsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFyaWFibGUsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFsdWVcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQ29udGFpbmVyIE5hbWVcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3Jlc3BvbnNpdmUtZGVzaWduI25hbWVkLWNvbnRhaW5lcnNcblx0XHRcdCovXG5cdFx0XHRcImNvbnRhaW5lci1uYW1lZFwiOiBbaXNOYW1lZENvbnRhaW5lclF1ZXJ5XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBDb2x1bW5zXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9jb2x1bW5zXG5cdFx0XHQqL1xuXHRcdFx0Y29sdW1uczogW3sgY29sdW1uczogW1xuXHRcdFx0XHRpc051bWJlcixcblx0XHRcdFx0aXNBcmJpdHJhcnlWYWx1ZSxcblx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZSxcblx0XHRcdFx0dGhlbWVDb250YWluZXJcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQnJlYWsgQWZ0ZXJcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JyZWFrLWFmdGVyXG5cdFx0XHQqL1xuXHRcdFx0XCJicmVhay1hZnRlclwiOiBbeyBcImJyZWFrLWFmdGVyXCI6IHNjYWxlQnJlYWsoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBCcmVhayBCZWZvcmVcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JyZWFrLWJlZm9yZVxuXHRcdFx0Ki9cblx0XHRcdFwiYnJlYWstYmVmb3JlXCI6IFt7IFwiYnJlYWstYmVmb3JlXCI6IHNjYWxlQnJlYWsoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBCcmVhayBJbnNpZGVcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JyZWFrLWluc2lkZVxuXHRcdFx0Ki9cblx0XHRcdFwiYnJlYWstaW5zaWRlXCI6IFt7IFwiYnJlYWstaW5zaWRlXCI6IFtcblx0XHRcdFx0XCJhdXRvXCIsXG5cdFx0XHRcdFwiYXZvaWRcIixcblx0XHRcdFx0XCJhdm9pZC1wYWdlXCIsXG5cdFx0XHRcdFwiYXZvaWQtY29sdW1uXCJcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm94IERlY29yYXRpb24gQnJlYWtcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JveC1kZWNvcmF0aW9uLWJyZWFrXG5cdFx0XHQqL1xuXHRcdFx0XCJib3gtZGVjb3JhdGlvblwiOiBbeyBcImJveC1kZWNvcmF0aW9uXCI6IFtcInNsaWNlXCIsIFwiY2xvbmVcIl0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm94IFNpemluZ1xuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm94LXNpemluZ1xuXHRcdFx0Ki9cblx0XHRcdGJveDogW3sgYm94OiBbXCJib3JkZXJcIiwgXCJjb250ZW50XCJdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIERpc3BsYXlcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2Rpc3BsYXlcblx0XHRcdCovXG5cdFx0XHRkaXNwbGF5OiBbXG5cdFx0XHRcdFwiYmxvY2tcIixcblx0XHRcdFx0XCJpbmxpbmUtYmxvY2tcIixcblx0XHRcdFx0XCJpbmxpbmVcIixcblx0XHRcdFx0XCJmbGV4XCIsXG5cdFx0XHRcdFwiaW5saW5lLWZsZXhcIixcblx0XHRcdFx0XCJ0YWJsZVwiLFxuXHRcdFx0XHRcImlubGluZS10YWJsZVwiLFxuXHRcdFx0XHRcInRhYmxlLWNhcHRpb25cIixcblx0XHRcdFx0XCJ0YWJsZS1jZWxsXCIsXG5cdFx0XHRcdFwidGFibGUtY29sdW1uXCIsXG5cdFx0XHRcdFwidGFibGUtY29sdW1uLWdyb3VwXCIsXG5cdFx0XHRcdFwidGFibGUtZm9vdGVyLWdyb3VwXCIsXG5cdFx0XHRcdFwidGFibGUtaGVhZGVyLWdyb3VwXCIsXG5cdFx0XHRcdFwidGFibGUtcm93LWdyb3VwXCIsXG5cdFx0XHRcdFwidGFibGUtcm93XCIsXG5cdFx0XHRcdFwiZmxvdy1yb290XCIsXG5cdFx0XHRcdFwiZ3JpZFwiLFxuXHRcdFx0XHRcImlubGluZS1ncmlkXCIsXG5cdFx0XHRcdFwiY29udGVudHNcIixcblx0XHRcdFx0XCJsaXN0LWl0ZW1cIixcblx0XHRcdFx0XCJoaWRkZW5cIlxuXHRcdFx0XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBTY3JlZW4gUmVhZGVyIE9ubHlcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2Rpc3BsYXkjc2NyZWVuLXJlYWRlci1vbmx5XG5cdFx0XHQqL1xuXHRcdFx0c3I6IFtcInNyLW9ubHlcIiwgXCJub3Qtc3Itb25seVwiXSxcblx0XHRcdC8qKlxuXHRcdFx0KiBGbG9hdHNcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2Zsb2F0XG5cdFx0XHQqL1xuXHRcdFx0ZmxvYXQ6IFt7IGZsb2F0OiBbXG5cdFx0XHRcdFwicmlnaHRcIixcblx0XHRcdFx0XCJsZWZ0XCIsXG5cdFx0XHRcdFwibm9uZVwiLFxuXHRcdFx0XHRcInN0YXJ0XCIsXG5cdFx0XHRcdFwiZW5kXCJcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQ2xlYXJcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2NsZWFyXG5cdFx0XHQqL1xuXHRcdFx0Y2xlYXI6IFt7IGNsZWFyOiBbXG5cdFx0XHRcdFwibGVmdFwiLFxuXHRcdFx0XHRcInJpZ2h0XCIsXG5cdFx0XHRcdFwiYm90aFwiLFxuXHRcdFx0XHRcIm5vbmVcIixcblx0XHRcdFx0XCJzdGFydFwiLFxuXHRcdFx0XHRcImVuZFwiXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIElzb2xhdGlvblxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvaXNvbGF0aW9uXG5cdFx0XHQqL1xuXHRcdFx0aXNvbGF0aW9uOiBbXCJpc29sYXRlXCIsIFwiaXNvbGF0aW9uLWF1dG9cIl0sXG5cdFx0XHQvKipcblx0XHRcdCogT2JqZWN0IEZpdFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvb2JqZWN0LWZpdFxuXHRcdFx0Ki9cblx0XHRcdFwib2JqZWN0LWZpdFwiOiBbeyBvYmplY3Q6IFtcblx0XHRcdFx0XCJjb250YWluXCIsXG5cdFx0XHRcdFwiY292ZXJcIixcblx0XHRcdFx0XCJmaWxsXCIsXG5cdFx0XHRcdFwibm9uZVwiLFxuXHRcdFx0XHRcInNjYWxlLWRvd25cIlxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBPYmplY3QgUG9zaXRpb25cblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL29iamVjdC1wb3NpdGlvblxuXHRcdFx0Ki9cblx0XHRcdFwib2JqZWN0LXBvc2l0aW9uXCI6IFt7IG9iamVjdDogc2NhbGVQb3NpdGlvbldpdGhBcmJpdHJhcnkoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBPdmVyZmxvd1xuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvb3ZlcmZsb3dcblx0XHRcdCovXG5cdFx0XHRvdmVyZmxvdzogW3sgb3ZlcmZsb3c6IHNjYWxlT3ZlcmZsb3coKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBPdmVyZmxvdyBYXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9vdmVyZmxvd1xuXHRcdFx0Ki9cblx0XHRcdFwib3ZlcmZsb3cteFwiOiBbeyBcIm92ZXJmbG93LXhcIjogc2NhbGVPdmVyZmxvdygpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIE92ZXJmbG93IFlcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL292ZXJmbG93XG5cdFx0XHQqL1xuXHRcdFx0XCJvdmVyZmxvdy15XCI6IFt7IFwib3ZlcmZsb3cteVwiOiBzY2FsZU92ZXJmbG93KCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogT3ZlcnNjcm9sbCBCZWhhdmlvclxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvb3ZlcnNjcm9sbC1iZWhhdmlvclxuXHRcdFx0Ki9cblx0XHRcdG92ZXJzY3JvbGw6IFt7IG92ZXJzY3JvbGw6IHNjYWxlT3ZlcnNjcm9sbCgpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIE92ZXJzY3JvbGwgQmVoYXZpb3IgWFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvb3ZlcnNjcm9sbC1iZWhhdmlvclxuXHRcdFx0Ki9cblx0XHRcdFwib3ZlcnNjcm9sbC14XCI6IFt7IFwib3ZlcnNjcm9sbC14XCI6IHNjYWxlT3ZlcnNjcm9sbCgpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIE92ZXJzY3JvbGwgQmVoYXZpb3IgWVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvb3ZlcnNjcm9sbC1iZWhhdmlvclxuXHRcdFx0Ki9cblx0XHRcdFwib3ZlcnNjcm9sbC15XCI6IFt7IFwib3ZlcnNjcm9sbC15XCI6IHNjYWxlT3ZlcnNjcm9sbCgpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFBvc2l0aW9uXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9wb3NpdGlvblxuXHRcdFx0Ki9cblx0XHRcdHBvc2l0aW9uOiBbXG5cdFx0XHRcdFwic3RhdGljXCIsXG5cdFx0XHRcdFwiZml4ZWRcIixcblx0XHRcdFx0XCJhYnNvbHV0ZVwiLFxuXHRcdFx0XHRcInJlbGF0aXZlXCIsXG5cdFx0XHRcdFwic3RpY2t5XCJcblx0XHRcdF0sXG5cdFx0XHQvKipcblx0XHRcdCogSW5zZXRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3RvcC1yaWdodC1ib3R0b20tbGVmdFxuXHRcdFx0Ki9cblx0XHRcdGluc2V0OiBbeyBpbnNldDogc2NhbGVJbnNldCgpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEluc2V0IElubGluZVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvdG9wLXJpZ2h0LWJvdHRvbS1sZWZ0XG5cdFx0XHQqL1xuXHRcdFx0XCJpbnNldC14XCI6IFt7IFwiaW5zZXQteFwiOiBzY2FsZUluc2V0KCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogSW5zZXQgQmxvY2tcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3RvcC1yaWdodC1ib3R0b20tbGVmdFxuXHRcdFx0Ki9cblx0XHRcdFwiaW5zZXQteVwiOiBbeyBcImluc2V0LXlcIjogc2NhbGVJbnNldCgpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEluc2V0IElubGluZSBTdGFydFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvdG9wLXJpZ2h0LWJvdHRvbS1sZWZ0XG5cdFx0XHQqIEB0b2RvIGNsYXNzIGdyb3VwIHdpbGwgYmUgcmVuYW1lZCB0byBgaW5zZXQtc2AgaW4gbmV4dCBtYWpvciByZWxlYXNlXG5cdFx0XHQqL1xuXHRcdFx0c3RhcnQ6IFt7XG5cdFx0XHRcdFwiaW5zZXQtc1wiOiBzY2FsZUluc2V0KCksXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQqIEBkZXByZWNhdGVkIHNpbmNlIFRhaWx3aW5kIENTUyB2NC4yLjAgaW4gZmF2b3Igb2YgYGluc2V0LXMtKmAgdXRpbGl0aWVzLlxuXHRcdFx0XHQqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3RhaWx3aW5kbGFicy90YWlsd2luZGNzcy9wdWxsLzE5NjEzXG5cdFx0XHRcdCovXG5cdFx0XHRcdHN0YXJ0OiBzY2FsZUluc2V0KClcblx0XHRcdH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEluc2V0IElubGluZSBFbmRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3RvcC1yaWdodC1ib3R0b20tbGVmdFxuXHRcdFx0KiBAdG9kbyBjbGFzcyBncm91cCB3aWxsIGJlIHJlbmFtZWQgdG8gYGluc2V0LWVgIGluIG5leHQgbWFqb3IgcmVsZWFzZVxuXHRcdFx0Ki9cblx0XHRcdGVuZDogW3tcblx0XHRcdFx0XCJpbnNldC1lXCI6IHNjYWxlSW5zZXQoKSxcblx0XHRcdFx0LyoqXG5cdFx0XHRcdCogQGRlcHJlY2F0ZWQgc2luY2UgVGFpbHdpbmQgQ1NTIHY0LjIuMCBpbiBmYXZvciBvZiBgaW5zZXQtZS0qYCB1dGlsaXRpZXMuXG5cdFx0XHRcdCogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdGFpbHdpbmRsYWJzL3RhaWx3aW5kY3NzL3B1bGwvMTk2MTNcblx0XHRcdFx0Ki9cblx0XHRcdFx0ZW5kOiBzY2FsZUluc2V0KClcblx0XHRcdH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEluc2V0IEJsb2NrIFN0YXJ0XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy90b3AtcmlnaHQtYm90dG9tLWxlZnRcblx0XHRcdCovXG5cdFx0XHRcImluc2V0LWJzXCI6IFt7IFwiaW5zZXQtYnNcIjogc2NhbGVJbnNldCgpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEluc2V0IEJsb2NrIEVuZFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvdG9wLXJpZ2h0LWJvdHRvbS1sZWZ0XG5cdFx0XHQqL1xuXHRcdFx0XCJpbnNldC1iZVwiOiBbeyBcImluc2V0LWJlXCI6IHNjYWxlSW5zZXQoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBUb3Bcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3RvcC1yaWdodC1ib3R0b20tbGVmdFxuXHRcdFx0Ki9cblx0XHRcdHRvcDogW3sgdG9wOiBzY2FsZUluc2V0KCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogUmlnaHRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3RvcC1yaWdodC1ib3R0b20tbGVmdFxuXHRcdFx0Ki9cblx0XHRcdHJpZ2h0OiBbeyByaWdodDogc2NhbGVJbnNldCgpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEJvdHRvbVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvdG9wLXJpZ2h0LWJvdHRvbS1sZWZ0XG5cdFx0XHQqL1xuXHRcdFx0Ym90dG9tOiBbeyBib3R0b206IHNjYWxlSW5zZXQoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBMZWZ0XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy90b3AtcmlnaHQtYm90dG9tLWxlZnRcblx0XHRcdCovXG5cdFx0XHRsZWZ0OiBbeyBsZWZ0OiBzY2FsZUluc2V0KCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogVmlzaWJpbGl0eVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvdmlzaWJpbGl0eVxuXHRcdFx0Ki9cblx0XHRcdHZpc2liaWxpdHk6IFtcblx0XHRcdFx0XCJ2aXNpYmxlXCIsXG5cdFx0XHRcdFwiaW52aXNpYmxlXCIsXG5cdFx0XHRcdFwiY29sbGFwc2VcIlxuXHRcdFx0XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBaLUluZGV4XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy96LWluZGV4XG5cdFx0XHQqL1xuXHRcdFx0ejogW3sgejogW1xuXHRcdFx0XHRpc0ludGVnZXIsXG5cdFx0XHRcdFwiYXV0b1wiLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhbHVlXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEZsZXggQmFzaXNcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2ZsZXgtYmFzaXNcblx0XHRcdCovXG5cdFx0XHRiYXNpczogW3sgYmFzaXM6IFtcblx0XHRcdFx0aXNGcmFjdGlvbixcblx0XHRcdFx0XCJmdWxsXCIsXG5cdFx0XHRcdFwiYXV0b1wiLFxuXHRcdFx0XHR0aGVtZUNvbnRhaW5lcixcblx0XHRcdFx0Li4uc2NhbGVVbmFtYmlndW91c1NwYWNpbmcoKVxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBGbGV4IERpcmVjdGlvblxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvZmxleC1kaXJlY3Rpb25cblx0XHRcdCovXG5cdFx0XHRcImZsZXgtZGlyZWN0aW9uXCI6IFt7IGZsZXg6IFtcblx0XHRcdFx0XCJyb3dcIixcblx0XHRcdFx0XCJyb3ctcmV2ZXJzZVwiLFxuXHRcdFx0XHRcImNvbFwiLFxuXHRcdFx0XHRcImNvbC1yZXZlcnNlXCJcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogRmxleCBXcmFwXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9mbGV4LXdyYXBcblx0XHRcdCovXG5cdFx0XHRcImZsZXgtd3JhcFwiOiBbeyBmbGV4OiBbXG5cdFx0XHRcdFwibm93cmFwXCIsXG5cdFx0XHRcdFwid3JhcFwiLFxuXHRcdFx0XHRcIndyYXAtcmV2ZXJzZVwiXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEZsZXhcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2ZsZXhcblx0XHRcdCovXG5cdFx0XHRmbGV4OiBbeyBmbGV4OiBbXG5cdFx0XHRcdGlzTnVtYmVyLFxuXHRcdFx0XHRpc0ZyYWN0aW9uLFxuXHRcdFx0XHRcImF1dG9cIixcblx0XHRcdFx0XCJpbml0aWFsXCIsXG5cdFx0XHRcdFwibm9uZVwiLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhbHVlXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEZsZXggR3Jvd1xuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvZmxleC1ncm93XG5cdFx0XHQqL1xuXHRcdFx0Z3JvdzogW3sgZ3JvdzogW1xuXHRcdFx0XHRcIlwiLFxuXHRcdFx0XHRpc051bWJlcixcblx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZSxcblx0XHRcdFx0aXNBcmJpdHJhcnlWYWx1ZVxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBGbGV4IFNocmlua1xuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvZmxleC1zaHJpbmtcblx0XHRcdCovXG5cdFx0XHRzaHJpbms6IFt7IHNocmluazogW1xuXHRcdFx0XHRcIlwiLFxuXHRcdFx0XHRpc051bWJlcixcblx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZSxcblx0XHRcdFx0aXNBcmJpdHJhcnlWYWx1ZVxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBPcmRlclxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvb3JkZXJcblx0XHRcdCovXG5cdFx0XHRvcmRlcjogW3sgb3JkZXI6IFtcblx0XHRcdFx0aXNJbnRlZ2VyLFxuXHRcdFx0XHRcImZpcnN0XCIsXG5cdFx0XHRcdFwibGFzdFwiLFxuXHRcdFx0XHRcIm5vbmVcIixcblx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZSxcblx0XHRcdFx0aXNBcmJpdHJhcnlWYWx1ZVxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBHcmlkIFRlbXBsYXRlIENvbHVtbnNcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2dyaWQtdGVtcGxhdGUtY29sdW1uc1xuXHRcdFx0Ki9cblx0XHRcdFwiZ3JpZC1jb2xzXCI6IFt7IFwiZ3JpZC1jb2xzXCI6IHNjYWxlR3JpZFRlbXBsYXRlQ29sc1Jvd3MoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBHcmlkIENvbHVtbiBTdGFydCAvIEVuZFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvZ3JpZC1jb2x1bW5cblx0XHRcdCovXG5cdFx0XHRcImNvbC1zdGFydC1lbmRcIjogW3sgY29sOiBzY2FsZUdyaWRDb2xSb3dTdGFydEFuZEVuZCgpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEdyaWQgQ29sdW1uIFN0YXJ0XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ncmlkLWNvbHVtblxuXHRcdFx0Ki9cblx0XHRcdFwiY29sLXN0YXJ0XCI6IFt7IFwiY29sLXN0YXJ0XCI6IHNjYWxlR3JpZENvbFJvd1N0YXJ0T3JFbmQoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBHcmlkIENvbHVtbiBFbmRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2dyaWQtY29sdW1uXG5cdFx0XHQqL1xuXHRcdFx0XCJjb2wtZW5kXCI6IFt7IFwiY29sLWVuZFwiOiBzY2FsZUdyaWRDb2xSb3dTdGFydE9yRW5kKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogR3JpZCBUZW1wbGF0ZSBSb3dzXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ncmlkLXRlbXBsYXRlLXJvd3Ncblx0XHRcdCovXG5cdFx0XHRcImdyaWQtcm93c1wiOiBbeyBcImdyaWQtcm93c1wiOiBzY2FsZUdyaWRUZW1wbGF0ZUNvbHNSb3dzKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogR3JpZCBSb3cgU3RhcnQgLyBFbmRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2dyaWQtcm93XG5cdFx0XHQqL1xuXHRcdFx0XCJyb3ctc3RhcnQtZW5kXCI6IFt7IHJvdzogc2NhbGVHcmlkQ29sUm93U3RhcnRBbmRFbmQoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBHcmlkIFJvdyBTdGFydFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvZ3JpZC1yb3dcblx0XHRcdCovXG5cdFx0XHRcInJvdy1zdGFydFwiOiBbeyBcInJvdy1zdGFydFwiOiBzY2FsZUdyaWRDb2xSb3dTdGFydE9yRW5kKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogR3JpZCBSb3cgRW5kXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ncmlkLXJvd1xuXHRcdFx0Ki9cblx0XHRcdFwicm93LWVuZFwiOiBbeyBcInJvdy1lbmRcIjogc2NhbGVHcmlkQ29sUm93U3RhcnRPckVuZCgpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEdyaWQgQXV0byBGbG93XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ncmlkLWF1dG8tZmxvd1xuXHRcdFx0Ki9cblx0XHRcdFwiZ3JpZC1mbG93XCI6IFt7IFwiZ3JpZC1mbG93XCI6IFtcblx0XHRcdFx0XCJyb3dcIixcblx0XHRcdFx0XCJjb2xcIixcblx0XHRcdFx0XCJkZW5zZVwiLFxuXHRcdFx0XHRcInJvdy1kZW5zZVwiLFxuXHRcdFx0XHRcImNvbC1kZW5zZVwiXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEdyaWQgQXV0byBDb2x1bW5zXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ncmlkLWF1dG8tY29sdW1uc1xuXHRcdFx0Ki9cblx0XHRcdFwiYXV0by1jb2xzXCI6IFt7IFwiYXV0by1jb2xzXCI6IHNjYWxlR3JpZEF1dG9Db2xzUm93cygpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEdyaWQgQXV0byBSb3dzXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ncmlkLWF1dG8tcm93c1xuXHRcdFx0Ki9cblx0XHRcdFwiYXV0by1yb3dzXCI6IFt7IFwiYXV0by1yb3dzXCI6IHNjYWxlR3JpZEF1dG9Db2xzUm93cygpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEdhcFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvZ2FwXG5cdFx0XHQqL1xuXHRcdFx0Z2FwOiBbeyBnYXA6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogR2FwIFhcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2dhcFxuXHRcdFx0Ki9cblx0XHRcdFwiZ2FwLXhcIjogW3sgXCJnYXAteFwiOiBzY2FsZVVuYW1iaWd1b3VzU3BhY2luZygpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEdhcCBZXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9nYXBcblx0XHRcdCovXG5cdFx0XHRcImdhcC15XCI6IFt7IFwiZ2FwLXlcIjogc2NhbGVVbmFtYmlndW91c1NwYWNpbmcoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBKdXN0aWZ5IENvbnRlbnRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2p1c3RpZnktY29udGVudFxuXHRcdFx0Ki9cblx0XHRcdFwianVzdGlmeS1jb250ZW50XCI6IFt7IGp1c3RpZnk6IFsuLi5zY2FsZUFsaWduUHJpbWFyeUF4aXMoKSwgXCJub3JtYWxcIl0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogSnVzdGlmeSBJdGVtc1xuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvanVzdGlmeS1pdGVtc1xuXHRcdFx0Ki9cblx0XHRcdFwianVzdGlmeS1pdGVtc1wiOiBbeyBcImp1c3RpZnktaXRlbXNcIjogWy4uLnNjYWxlQWxpZ25TZWNvbmRhcnlBeGlzKCksIFwibm9ybWFsXCJdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEp1c3RpZnkgU2VsZlxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvanVzdGlmeS1zZWxmXG5cdFx0XHQqL1xuXHRcdFx0XCJqdXN0aWZ5LXNlbGZcIjogW3sgXCJqdXN0aWZ5LXNlbGZcIjogW1wiYXV0b1wiLCAuLi5zY2FsZUFsaWduU2Vjb25kYXJ5QXhpcygpXSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBBbGlnbiBDb250ZW50XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9hbGlnbi1jb250ZW50XG5cdFx0XHQqL1xuXHRcdFx0XCJhbGlnbi1jb250ZW50XCI6IFt7IGNvbnRlbnQ6IFtcIm5vcm1hbFwiLCAuLi5zY2FsZUFsaWduUHJpbWFyeUF4aXMoKV0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQWxpZ24gSXRlbXNcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2FsaWduLWl0ZW1zXG5cdFx0XHQqL1xuXHRcdFx0XCJhbGlnbi1pdGVtc1wiOiBbeyBpdGVtczogWy4uLnNjYWxlQWxpZ25TZWNvbmRhcnlBeGlzKCksIHsgYmFzZWxpbmU6IFtcIlwiLCBcImxhc3RcIl0gfV0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQWxpZ24gU2VsZlxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYWxpZ24tc2VsZlxuXHRcdFx0Ki9cblx0XHRcdFwiYWxpZ24tc2VsZlwiOiBbeyBzZWxmOiBbXG5cdFx0XHRcdFwiYXV0b1wiLFxuXHRcdFx0XHQuLi5zY2FsZUFsaWduU2Vjb25kYXJ5QXhpcygpLFxuXHRcdFx0XHR7IGJhc2VsaW5lOiBbXCJcIiwgXCJsYXN0XCJdIH1cblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogUGxhY2UgQ29udGVudFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvcGxhY2UtY29udGVudFxuXHRcdFx0Ki9cblx0XHRcdFwicGxhY2UtY29udGVudFwiOiBbeyBcInBsYWNlLWNvbnRlbnRcIjogc2NhbGVBbGlnblByaW1hcnlBeGlzKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogUGxhY2UgSXRlbXNcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3BsYWNlLWl0ZW1zXG5cdFx0XHQqL1xuXHRcdFx0XCJwbGFjZS1pdGVtc1wiOiBbeyBcInBsYWNlLWl0ZW1zXCI6IFsuLi5zY2FsZUFsaWduU2Vjb25kYXJ5QXhpcygpLCBcImJhc2VsaW5lXCJdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFBsYWNlIFNlbGZcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3BsYWNlLXNlbGZcblx0XHRcdCovXG5cdFx0XHRcInBsYWNlLXNlbGZcIjogW3sgXCJwbGFjZS1zZWxmXCI6IFtcImF1dG9cIiwgLi4uc2NhbGVBbGlnblNlY29uZGFyeUF4aXMoKV0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogUGFkZGluZ1xuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvcGFkZGluZ1xuXHRcdFx0Ki9cblx0XHRcdHA6IFt7IHA6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogUGFkZGluZyBJbmxpbmVcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3BhZGRpbmdcblx0XHRcdCovXG5cdFx0XHRweDogW3sgcHg6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogUGFkZGluZyBCbG9ja1xuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvcGFkZGluZ1xuXHRcdFx0Ki9cblx0XHRcdHB5OiBbeyBweTogc2NhbGVVbmFtYmlndW91c1NwYWNpbmcoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBQYWRkaW5nIElubGluZSBTdGFydFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvcGFkZGluZ1xuXHRcdFx0Ki9cblx0XHRcdHBzOiBbeyBwczogc2NhbGVVbmFtYmlndW91c1NwYWNpbmcoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBQYWRkaW5nIElubGluZSBFbmRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3BhZGRpbmdcblx0XHRcdCovXG5cdFx0XHRwZTogW3sgcGU6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogUGFkZGluZyBCbG9jayBTdGFydFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvcGFkZGluZ1xuXHRcdFx0Ki9cblx0XHRcdHBiczogW3sgcGJzOiBzY2FsZVVuYW1iaWd1b3VzU3BhY2luZygpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFBhZGRpbmcgQmxvY2sgRW5kXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9wYWRkaW5nXG5cdFx0XHQqL1xuXHRcdFx0cGJlOiBbeyBwYmU6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogUGFkZGluZyBUb3Bcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3BhZGRpbmdcblx0XHRcdCovXG5cdFx0XHRwdDogW3sgcHQ6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogUGFkZGluZyBSaWdodFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvcGFkZGluZ1xuXHRcdFx0Ki9cblx0XHRcdHByOiBbeyBwcjogc2NhbGVVbmFtYmlndW91c1NwYWNpbmcoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBQYWRkaW5nIEJvdHRvbVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvcGFkZGluZ1xuXHRcdFx0Ki9cblx0XHRcdHBiOiBbeyBwYjogc2NhbGVVbmFtYmlndW91c1NwYWNpbmcoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBQYWRkaW5nIExlZnRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3BhZGRpbmdcblx0XHRcdCovXG5cdFx0XHRwbDogW3sgcGw6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogTWFyZ2luXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9tYXJnaW5cblx0XHRcdCovXG5cdFx0XHRtOiBbeyBtOiBzY2FsZU1hcmdpbigpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIE1hcmdpbiBJbmxpbmVcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL21hcmdpblxuXHRcdFx0Ki9cblx0XHRcdG14OiBbeyBteDogc2NhbGVNYXJnaW4oKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBNYXJnaW4gQmxvY2tcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL21hcmdpblxuXHRcdFx0Ki9cblx0XHRcdG15OiBbeyBteTogc2NhbGVNYXJnaW4oKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBNYXJnaW4gSW5saW5lIFN0YXJ0XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9tYXJnaW5cblx0XHRcdCovXG5cdFx0XHRtczogW3sgbXM6IHNjYWxlTWFyZ2luKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogTWFyZ2luIElubGluZSBFbmRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL21hcmdpblxuXHRcdFx0Ki9cblx0XHRcdG1lOiBbeyBtZTogc2NhbGVNYXJnaW4oKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBNYXJnaW4gQmxvY2sgU3RhcnRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL21hcmdpblxuXHRcdFx0Ki9cblx0XHRcdG1iczogW3sgbWJzOiBzY2FsZU1hcmdpbigpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIE1hcmdpbiBCbG9jayBFbmRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL21hcmdpblxuXHRcdFx0Ki9cblx0XHRcdG1iZTogW3sgbWJlOiBzY2FsZU1hcmdpbigpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIE1hcmdpbiBUb3Bcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL21hcmdpblxuXHRcdFx0Ki9cblx0XHRcdG10OiBbeyBtdDogc2NhbGVNYXJnaW4oKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBNYXJnaW4gUmlnaHRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL21hcmdpblxuXHRcdFx0Ki9cblx0XHRcdG1yOiBbeyBtcjogc2NhbGVNYXJnaW4oKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBNYXJnaW4gQm90dG9tXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9tYXJnaW5cblx0XHRcdCovXG5cdFx0XHRtYjogW3sgbWI6IHNjYWxlTWFyZ2luKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogTWFyZ2luIExlZnRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL21hcmdpblxuXHRcdFx0Ki9cblx0XHRcdG1sOiBbeyBtbDogc2NhbGVNYXJnaW4oKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBTcGFjZSBCZXR3ZWVuIFhcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL21hcmdpbiNhZGRpbmctc3BhY2UtYmV0d2Vlbi1jaGlsZHJlblxuXHRcdFx0Ki9cblx0XHRcdFwic3BhY2UteFwiOiBbeyBcInNwYWNlLXhcIjogc2NhbGVVbmFtYmlndW91c1NwYWNpbmcoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBTcGFjZSBCZXR3ZWVuIFggUmV2ZXJzZVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvbWFyZ2luI2FkZGluZy1zcGFjZS1iZXR3ZWVuLWNoaWxkcmVuXG5cdFx0XHQqL1xuXHRcdFx0XCJzcGFjZS14LXJldmVyc2VcIjogW1wic3BhY2UteC1yZXZlcnNlXCJdLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFNwYWNlIEJldHdlZW4gWVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvbWFyZ2luI2FkZGluZy1zcGFjZS1iZXR3ZWVuLWNoaWxkcmVuXG5cdFx0XHQqL1xuXHRcdFx0XCJzcGFjZS15XCI6IFt7IFwic3BhY2UteVwiOiBzY2FsZVVuYW1iaWd1b3VzU3BhY2luZygpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFNwYWNlIEJldHdlZW4gWSBSZXZlcnNlXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9tYXJnaW4jYWRkaW5nLXNwYWNlLWJldHdlZW4tY2hpbGRyZW5cblx0XHRcdCovXG5cdFx0XHRcInNwYWNlLXktcmV2ZXJzZVwiOiBbXCJzcGFjZS15LXJldmVyc2VcIl0sXG5cdFx0XHQvKipcblx0XHRcdCogU2l6ZVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvd2lkdGgjc2V0dGluZy1ib3RoLXdpZHRoLWFuZC1oZWlnaHRcblx0XHRcdCovXG5cdFx0XHRzaXplOiBbeyBzaXplOiBzY2FsZVNpemluZygpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIElubGluZSBTaXplXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy93aWR0aFxuXHRcdFx0Ki9cblx0XHRcdFwiaW5saW5lLXNpemVcIjogW3sgaW5saW5lOiBbXCJhdXRvXCIsIC4uLnNjYWxlU2l6aW5nSW5saW5lKCldIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIE1pbi1JbmxpbmUgU2l6ZVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvbWluLXdpZHRoXG5cdFx0XHQqL1xuXHRcdFx0XCJtaW4taW5saW5lLXNpemVcIjogW3sgXCJtaW4taW5saW5lXCI6IFtcImF1dG9cIiwgLi4uc2NhbGVTaXppbmdJbmxpbmUoKV0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogTWF4LUlubGluZSBTaXplXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9tYXgtd2lkdGhcblx0XHRcdCovXG5cdFx0XHRcIm1heC1pbmxpbmUtc2l6ZVwiOiBbeyBcIm1heC1pbmxpbmVcIjogW1wibm9uZVwiLCAuLi5zY2FsZVNpemluZ0lubGluZSgpXSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBCbG9jayBTaXplXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9oZWlnaHRcblx0XHRcdCovXG5cdFx0XHRcImJsb2NrLXNpemVcIjogW3sgYmxvY2s6IFtcImF1dG9cIiwgLi4uc2NhbGVTaXppbmdCbG9jaygpXSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBNaW4tQmxvY2sgU2l6ZVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvbWluLWhlaWdodFxuXHRcdFx0Ki9cblx0XHRcdFwibWluLWJsb2NrLXNpemVcIjogW3sgXCJtaW4tYmxvY2tcIjogW1wiYXV0b1wiLCAuLi5zY2FsZVNpemluZ0Jsb2NrKCldIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIE1heC1CbG9jayBTaXplXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9tYXgtaGVpZ2h0XG5cdFx0XHQqL1xuXHRcdFx0XCJtYXgtYmxvY2stc2l6ZVwiOiBbeyBcIm1heC1ibG9ja1wiOiBbXCJub25lXCIsIC4uLnNjYWxlU2l6aW5nQmxvY2soKV0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogV2lkdGhcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3dpZHRoXG5cdFx0XHQqL1xuXHRcdFx0dzogW3sgdzogW1xuXHRcdFx0XHR0aGVtZUNvbnRhaW5lcixcblx0XHRcdFx0XCJzY3JlZW5cIixcblx0XHRcdFx0Li4uc2NhbGVTaXppbmcoKVxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBNaW4tV2lkdGhcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL21pbi13aWR0aFxuXHRcdFx0Ki9cblx0XHRcdFwibWluLXdcIjogW3sgXCJtaW4td1wiOiBbXG5cdFx0XHRcdHRoZW1lQ29udGFpbmVyLFxuXHRcdFx0XHRcInNjcmVlblwiLFxuXHRcdFx0XHRcIm5vbmVcIixcblx0XHRcdFx0Li4uc2NhbGVTaXppbmcoKVxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBNYXgtV2lkdGhcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL21heC13aWR0aFxuXHRcdFx0Ki9cblx0XHRcdFwibWF4LXdcIjogW3sgXCJtYXgtd1wiOiBbXG5cdFx0XHRcdHRoZW1lQ29udGFpbmVyLFxuXHRcdFx0XHRcInNjcmVlblwiLFxuXHRcdFx0XHRcIm5vbmVcIixcblx0XHRcdFx0XCJwcm9zZVwiLFxuXHRcdFx0XHQoXG5cdFx0XHRcdC8qKiBEZXByZWNhdGVkIHNpbmNlIFRhaWx3aW5kIENTUyB2NC4wLjAuIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3RhaWx3aW5kbGFicy90YWlsd2luZGNzcy5jb20vaXNzdWVzLzIwMjcjaXNzdWVjb21tZW50LTI2MjAxNTI3NTcgKi9cblx0XHRcdFx0eyBzY3JlZW46IFt0aGVtZUJyZWFrcG9pbnRdIH0pLFxuXHRcdFx0XHQuLi5zY2FsZVNpemluZygpXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEhlaWdodFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvaGVpZ2h0XG5cdFx0XHQqL1xuXHRcdFx0aDogW3sgaDogW1xuXHRcdFx0XHRcInNjcmVlblwiLFxuXHRcdFx0XHRcImxoXCIsXG5cdFx0XHRcdC4uLnNjYWxlU2l6aW5nKClcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogTWluLUhlaWdodFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvbWluLWhlaWdodFxuXHRcdFx0Ki9cblx0XHRcdFwibWluLWhcIjogW3sgXCJtaW4taFwiOiBbXG5cdFx0XHRcdFwic2NyZWVuXCIsXG5cdFx0XHRcdFwibGhcIixcblx0XHRcdFx0XCJub25lXCIsXG5cdFx0XHRcdC4uLnNjYWxlU2l6aW5nKClcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogTWF4LUhlaWdodFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvbWF4LWhlaWdodFxuXHRcdFx0Ki9cblx0XHRcdFwibWF4LWhcIjogW3sgXCJtYXgtaFwiOiBbXG5cdFx0XHRcdFwic2NyZWVuXCIsXG5cdFx0XHRcdFwibGhcIixcblx0XHRcdFx0Li4uc2NhbGVTaXppbmcoKVxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBGb250IFNpemVcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2ZvbnQtc2l6ZVxuXHRcdFx0Ki9cblx0XHRcdFwiZm9udC1zaXplXCI6IFt7IHRleHQ6IFtcblx0XHRcdFx0XCJiYXNlXCIsXG5cdFx0XHRcdHRoZW1lVGV4dCxcblx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZUxlbmd0aCxcblx0XHRcdFx0aXNBcmJpdHJhcnlMZW5ndGhcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogRm9udCBTbW9vdGhpbmdcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2ZvbnQtc21vb3RoaW5nXG5cdFx0XHQqL1xuXHRcdFx0XCJmb250LXNtb290aGluZ1wiOiBbXCJhbnRpYWxpYXNlZFwiLCBcInN1YnBpeGVsLWFudGlhbGlhc2VkXCJdLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEZvbnQgU3R5bGVcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2ZvbnQtc3R5bGVcblx0XHRcdCovXG5cdFx0XHRcImZvbnQtc3R5bGVcIjogW1wiaXRhbGljXCIsIFwibm90LWl0YWxpY1wiXSxcblx0XHRcdC8qKlxuXHRcdFx0KiBGb250IFdlaWdodFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvZm9udC13ZWlnaHRcblx0XHRcdCovXG5cdFx0XHRcImZvbnQtd2VpZ2h0XCI6IFt7IGZvbnQ6IFtcblx0XHRcdFx0dGhlbWVGb250V2VpZ2h0LFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhcmlhYmxlV2VpZ2h0LFxuXHRcdFx0XHRpc0FyYml0cmFyeVdlaWdodFxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBGb250IFN0cmV0Y2hcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2ZvbnQtc3RyZXRjaFxuXHRcdFx0Ki9cblx0XHRcdFwiZm9udC1zdHJldGNoXCI6IFt7IFwiZm9udC1zdHJldGNoXCI6IFtcblx0XHRcdFx0XCJ1bHRyYS1jb25kZW5zZWRcIixcblx0XHRcdFx0XCJleHRyYS1jb25kZW5zZWRcIixcblx0XHRcdFx0XCJjb25kZW5zZWRcIixcblx0XHRcdFx0XCJzZW1pLWNvbmRlbnNlZFwiLFxuXHRcdFx0XHRcIm5vcm1hbFwiLFxuXHRcdFx0XHRcInNlbWktZXhwYW5kZWRcIixcblx0XHRcdFx0XCJleHBhbmRlZFwiLFxuXHRcdFx0XHRcImV4dHJhLWV4cGFuZGVkXCIsXG5cdFx0XHRcdFwidWx0cmEtZXhwYW5kZWRcIixcblx0XHRcdFx0aXNQZXJjZW50LFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhbHVlXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEZvbnQgRmFtaWx5XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9mb250LWZhbWlseVxuXHRcdFx0Ki9cblx0XHRcdFwiZm9udC1mYW1pbHlcIjogW3sgZm9udDogW1xuXHRcdFx0XHRpc0FyYml0cmFyeVZhcmlhYmxlRmFtaWx5TmFtZSxcblx0XHRcdFx0aXNBcmJpdHJhcnlGYW1pbHlOYW1lLFxuXHRcdFx0XHR0aGVtZUZvbnRcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogRm9udCBGZWF0dXJlIFNldHRpbmdzXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9mb250LWZlYXR1cmUtc2V0dGluZ3Ncblx0XHRcdCovXG5cdFx0XHRcImZvbnQtZmVhdHVyZXNcIjogW3sgXCJmb250LWZlYXR1cmVzXCI6IFtpc0FyYml0cmFyeVZhbHVlXSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBGb250IFZhcmlhbnQgTnVtZXJpY1xuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvZm9udC12YXJpYW50LW51bWVyaWNcblx0XHRcdCovXG5cdFx0XHRcImZ2bi1ub3JtYWxcIjogW1wibm9ybWFsLW51bXNcIl0sXG5cdFx0XHQvKipcblx0XHRcdCogRm9udCBWYXJpYW50IE51bWVyaWNcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2ZvbnQtdmFyaWFudC1udW1lcmljXG5cdFx0XHQqL1xuXHRcdFx0XCJmdm4tb3JkaW5hbFwiOiBbXCJvcmRpbmFsXCJdLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEZvbnQgVmFyaWFudCBOdW1lcmljXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9mb250LXZhcmlhbnQtbnVtZXJpY1xuXHRcdFx0Ki9cblx0XHRcdFwiZnZuLXNsYXNoZWQtemVyb1wiOiBbXCJzbGFzaGVkLXplcm9cIl0sXG5cdFx0XHQvKipcblx0XHRcdCogRm9udCBWYXJpYW50IE51bWVyaWNcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2ZvbnQtdmFyaWFudC1udW1lcmljXG5cdFx0XHQqL1xuXHRcdFx0XCJmdm4tZmlndXJlXCI6IFtcImxpbmluZy1udW1zXCIsIFwib2xkc3R5bGUtbnVtc1wiXSxcblx0XHRcdC8qKlxuXHRcdFx0KiBGb250IFZhcmlhbnQgTnVtZXJpY1xuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvZm9udC12YXJpYW50LW51bWVyaWNcblx0XHRcdCovXG5cdFx0XHRcImZ2bi1zcGFjaW5nXCI6IFtcInByb3BvcnRpb25hbC1udW1zXCIsIFwidGFidWxhci1udW1zXCJdLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEZvbnQgVmFyaWFudCBOdW1lcmljXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9mb250LXZhcmlhbnQtbnVtZXJpY1xuXHRcdFx0Ki9cblx0XHRcdFwiZnZuLWZyYWN0aW9uXCI6IFtcImRpYWdvbmFsLWZyYWN0aW9uc1wiLCBcInN0YWNrZWQtZnJhY3Rpb25zXCJdLFxuXHRcdFx0LyoqXG5cdFx0XHQqIExldHRlciBTcGFjaW5nXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9sZXR0ZXItc3BhY2luZ1xuXHRcdFx0Ki9cblx0XHRcdHRyYWNraW5nOiBbeyB0cmFja2luZzogW1xuXHRcdFx0XHR0aGVtZVRyYWNraW5nLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhbHVlXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIExpbmUgQ2xhbXBcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2xpbmUtY2xhbXBcblx0XHRcdCovXG5cdFx0XHRcImxpbmUtY2xhbXBcIjogW3sgXCJsaW5lLWNsYW1wXCI6IFtcblx0XHRcdFx0aXNOdW1iZXIsXG5cdFx0XHRcdFwibm9uZVwiLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdFx0XHRpc0FyYml0cmFyeU51bWJlclxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBMaW5lIEhlaWdodFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvbGluZS1oZWlnaHRcblx0XHRcdCovXG5cdFx0XHRsZWFkaW5nOiBbeyBsZWFkaW5nOiBbdGhlbWVMZWFkaW5nLCAuLi5zY2FsZVVuYW1iaWd1b3VzU3BhY2luZygpXSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBMaXN0IFN0eWxlIEltYWdlXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9saXN0LXN0eWxlLWltYWdlXG5cdFx0XHQqL1xuXHRcdFx0XCJsaXN0LWltYWdlXCI6IFt7IFwibGlzdC1pbWFnZVwiOiBbXG5cdFx0XHRcdFwibm9uZVwiLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhbHVlXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIExpc3QgU3R5bGUgUG9zaXRpb25cblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2xpc3Qtc3R5bGUtcG9zaXRpb25cblx0XHRcdCovXG5cdFx0XHRcImxpc3Qtc3R5bGUtcG9zaXRpb25cIjogW3sgbGlzdDogW1wiaW5zaWRlXCIsIFwib3V0c2lkZVwiXSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBMaXN0IFN0eWxlIFR5cGVcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2xpc3Qtc3R5bGUtdHlwZVxuXHRcdFx0Ki9cblx0XHRcdFwibGlzdC1zdHlsZS10eXBlXCI6IFt7IGxpc3Q6IFtcblx0XHRcdFx0XCJkaXNjXCIsXG5cdFx0XHRcdFwiZGVjaW1hbFwiLFxuXHRcdFx0XHRcIm5vbmVcIixcblx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZSxcblx0XHRcdFx0aXNBcmJpdHJhcnlWYWx1ZVxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBUZXh0IEFsaWdubWVudFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvdGV4dC1hbGlnblxuXHRcdFx0Ki9cblx0XHRcdFwidGV4dC1hbGlnbm1lbnRcIjogW3sgdGV4dDogW1xuXHRcdFx0XHRcImxlZnRcIixcblx0XHRcdFx0XCJjZW50ZXJcIixcblx0XHRcdFx0XCJyaWdodFwiLFxuXHRcdFx0XHRcImp1c3RpZnlcIixcblx0XHRcdFx0XCJzdGFydFwiLFxuXHRcdFx0XHRcImVuZFwiXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFBsYWNlaG9sZGVyIENvbG9yXG5cdFx0XHQqIEBkZXByZWNhdGVkIHNpbmNlIFRhaWx3aW5kIENTUyB2My4wLjBcblx0XHRcdCogQHNlZSBodHRwczovL3YzLnRhaWx3aW5kY3NzLmNvbS9kb2NzL3BsYWNlaG9sZGVyLWNvbG9yXG5cdFx0XHQqL1xuXHRcdFx0XCJwbGFjZWhvbGRlci1jb2xvclwiOiBbeyBwbGFjZWhvbGRlcjogc2NhbGVDb2xvcigpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFRleHQgQ29sb3Jcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3RleHQtY29sb3Jcblx0XHRcdCovXG5cdFx0XHRcInRleHQtY29sb3JcIjogW3sgdGV4dDogc2NhbGVDb2xvcigpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFRleHQgRGVjb3JhdGlvblxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvdGV4dC1kZWNvcmF0aW9uXG5cdFx0XHQqL1xuXHRcdFx0XCJ0ZXh0LWRlY29yYXRpb25cIjogW1xuXHRcdFx0XHRcInVuZGVybGluZVwiLFxuXHRcdFx0XHRcIm92ZXJsaW5lXCIsXG5cdFx0XHRcdFwibGluZS10aHJvdWdoXCIsXG5cdFx0XHRcdFwibm8tdW5kZXJsaW5lXCJcblx0XHRcdF0sXG5cdFx0XHQvKipcblx0XHRcdCogVGV4dCBEZWNvcmF0aW9uIFN0eWxlXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy90ZXh0LWRlY29yYXRpb24tc3R5bGVcblx0XHRcdCovXG5cdFx0XHRcInRleHQtZGVjb3JhdGlvbi1zdHlsZVwiOiBbeyBkZWNvcmF0aW9uOiBbLi4uc2NhbGVMaW5lU3R5bGUoKSwgXCJ3YXZ5XCJdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFRleHQgRGVjb3JhdGlvbiBUaGlja25lc3Ncblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3RleHQtZGVjb3JhdGlvbi10aGlja25lc3Ncblx0XHRcdCovXG5cdFx0XHRcInRleHQtZGVjb3JhdGlvbi10aGlja25lc3NcIjogW3sgZGVjb3JhdGlvbjogW1xuXHRcdFx0XHRpc051bWJlcixcblx0XHRcdFx0XCJmcm9tLWZvbnRcIixcblx0XHRcdFx0XCJhdXRvXCIsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFyaWFibGUsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5TGVuZ3RoXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFRleHQgRGVjb3JhdGlvbiBDb2xvclxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvdGV4dC1kZWNvcmF0aW9uLWNvbG9yXG5cdFx0XHQqL1xuXHRcdFx0XCJ0ZXh0LWRlY29yYXRpb24tY29sb3JcIjogW3sgZGVjb3JhdGlvbjogc2NhbGVDb2xvcigpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFRleHQgVW5kZXJsaW5lIE9mZnNldFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvdGV4dC11bmRlcmxpbmUtb2Zmc2V0XG5cdFx0XHQqL1xuXHRcdFx0XCJ1bmRlcmxpbmUtb2Zmc2V0XCI6IFt7IFwidW5kZXJsaW5lLW9mZnNldFwiOiBbXG5cdFx0XHRcdGlzTnVtYmVyLFxuXHRcdFx0XHRcImF1dG9cIixcblx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZSxcblx0XHRcdFx0aXNBcmJpdHJhcnlWYWx1ZVxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBUZXh0IFRyYW5zZm9ybVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvdGV4dC10cmFuc2Zvcm1cblx0XHRcdCovXG5cdFx0XHRcInRleHQtdHJhbnNmb3JtXCI6IFtcblx0XHRcdFx0XCJ1cHBlcmNhc2VcIixcblx0XHRcdFx0XCJsb3dlcmNhc2VcIixcblx0XHRcdFx0XCJjYXBpdGFsaXplXCIsXG5cdFx0XHRcdFwibm9ybWFsLWNhc2VcIlxuXHRcdFx0XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBUZXh0IE92ZXJmbG93XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy90ZXh0LW92ZXJmbG93XG5cdFx0XHQqL1xuXHRcdFx0XCJ0ZXh0LW92ZXJmbG93XCI6IFtcblx0XHRcdFx0XCJ0cnVuY2F0ZVwiLFxuXHRcdFx0XHRcInRleHQtZWxsaXBzaXNcIixcblx0XHRcdFx0XCJ0ZXh0LWNsaXBcIlxuXHRcdFx0XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBUZXh0IFdyYXBcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3RleHQtd3JhcFxuXHRcdFx0Ki9cblx0XHRcdFwidGV4dC13cmFwXCI6IFt7IHRleHQ6IFtcblx0XHRcdFx0XCJ3cmFwXCIsXG5cdFx0XHRcdFwibm93cmFwXCIsXG5cdFx0XHRcdFwiYmFsYW5jZVwiLFxuXHRcdFx0XHRcInByZXR0eVwiXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFRleHQgSW5kZW50XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy90ZXh0LWluZGVudFxuXHRcdFx0Ki9cblx0XHRcdGluZGVudDogW3sgaW5kZW50OiBzY2FsZVVuYW1iaWd1b3VzU3BhY2luZygpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFRhYiBTaXplXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy90YWItc2l6ZVxuXHRcdFx0Ki9cblx0XHRcdFwidGFiLXNpemVcIjogW3sgdGFiOiBbXG5cdFx0XHRcdGlzSW50ZWdlcixcblx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZSxcblx0XHRcdFx0aXNBcmJpdHJhcnlWYWx1ZVxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBWZXJ0aWNhbCBBbGlnbm1lbnRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3ZlcnRpY2FsLWFsaWduXG5cdFx0XHQqL1xuXHRcdFx0XCJ2ZXJ0aWNhbC1hbGlnblwiOiBbeyBhbGlnbjogW1xuXHRcdFx0XHRcImJhc2VsaW5lXCIsXG5cdFx0XHRcdFwidG9wXCIsXG5cdFx0XHRcdFwibWlkZGxlXCIsXG5cdFx0XHRcdFwiYm90dG9tXCIsXG5cdFx0XHRcdFwidGV4dC10b3BcIixcblx0XHRcdFx0XCJ0ZXh0LWJvdHRvbVwiLFxuXHRcdFx0XHRcInN1YlwiLFxuXHRcdFx0XHRcInN1cGVyXCIsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFyaWFibGUsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFsdWVcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogV2hpdGVzcGFjZVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvd2hpdGVzcGFjZVxuXHRcdFx0Ki9cblx0XHRcdHdoaXRlc3BhY2U6IFt7IHdoaXRlc3BhY2U6IFtcblx0XHRcdFx0XCJub3JtYWxcIixcblx0XHRcdFx0XCJub3dyYXBcIixcblx0XHRcdFx0XCJwcmVcIixcblx0XHRcdFx0XCJwcmUtbGluZVwiLFxuXHRcdFx0XHRcInByZS13cmFwXCIsXG5cdFx0XHRcdFwiYnJlYWstc3BhY2VzXCJcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogV29yZCBCcmVha1xuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvd29yZC1icmVha1xuXHRcdFx0Ki9cblx0XHRcdGJyZWFrOiBbeyBicmVhazogW1xuXHRcdFx0XHRcIm5vcm1hbFwiLFxuXHRcdFx0XHRcIndvcmRzXCIsXG5cdFx0XHRcdFwiYWxsXCIsXG5cdFx0XHRcdFwia2VlcFwiXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIE92ZXJmbG93IFdyYXBcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL292ZXJmbG93LXdyYXBcblx0XHRcdCovXG5cdFx0XHR3cmFwOiBbeyB3cmFwOiBbXG5cdFx0XHRcdFwiYnJlYWstd29yZFwiLFxuXHRcdFx0XHRcImFueXdoZXJlXCIsXG5cdFx0XHRcdFwibm9ybWFsXCJcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogSHlwaGVuc1xuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvaHlwaGVuc1xuXHRcdFx0Ki9cblx0XHRcdGh5cGhlbnM6IFt7IGh5cGhlbnM6IFtcblx0XHRcdFx0XCJub25lXCIsXG5cdFx0XHRcdFwibWFudWFsXCIsXG5cdFx0XHRcdFwiYXV0b1wiXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIENvbnRlbnRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2NvbnRlbnRcblx0XHRcdCovXG5cdFx0XHRjb250ZW50OiBbeyBjb250ZW50OiBbXG5cdFx0XHRcdFwibm9uZVwiLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhbHVlXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEJhY2tncm91bmQgQXR0YWNobWVudFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYmFja2dyb3VuZC1hdHRhY2htZW50XG5cdFx0XHQqL1xuXHRcdFx0XCJiZy1hdHRhY2htZW50XCI6IFt7IGJnOiBbXG5cdFx0XHRcdFwiZml4ZWRcIixcblx0XHRcdFx0XCJsb2NhbFwiLFxuXHRcdFx0XHRcInNjcm9sbFwiXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEJhY2tncm91bmQgQ2xpcFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYmFja2dyb3VuZC1jbGlwXG5cdFx0XHQqL1xuXHRcdFx0XCJiZy1jbGlwXCI6IFt7IFwiYmctY2xpcFwiOiBbXG5cdFx0XHRcdFwiYm9yZGVyXCIsXG5cdFx0XHRcdFwicGFkZGluZ1wiLFxuXHRcdFx0XHRcImNvbnRlbnRcIixcblx0XHRcdFx0XCJ0ZXh0XCJcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQmFja2dyb3VuZCBPcmlnaW5cblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JhY2tncm91bmQtb3JpZ2luXG5cdFx0XHQqL1xuXHRcdFx0XCJiZy1vcmlnaW5cIjogW3sgXCJiZy1vcmlnaW5cIjogW1xuXHRcdFx0XHRcImJvcmRlclwiLFxuXHRcdFx0XHRcInBhZGRpbmdcIixcblx0XHRcdFx0XCJjb250ZW50XCJcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQmFja2dyb3VuZCBQb3NpdGlvblxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYmFja2dyb3VuZC1wb3NpdGlvblxuXHRcdFx0Ki9cblx0XHRcdFwiYmctcG9zaXRpb25cIjogW3sgYmc6IHNjYWxlQmdQb3NpdGlvbigpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEJhY2tncm91bmQgUmVwZWF0XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9iYWNrZ3JvdW5kLXJlcGVhdFxuXHRcdFx0Ki9cblx0XHRcdFwiYmctcmVwZWF0XCI6IFt7IGJnOiBzY2FsZUJnUmVwZWF0KCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQmFja2dyb3VuZCBTaXplXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9iYWNrZ3JvdW5kLXNpemVcblx0XHRcdCovXG5cdFx0XHRcImJnLXNpemVcIjogW3sgYmc6IHNjYWxlQmdTaXplKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQmFja2dyb3VuZCBJbWFnZVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYmFja2dyb3VuZC1pbWFnZVxuXHRcdFx0Ki9cblx0XHRcdFwiYmctaW1hZ2VcIjogW3sgYmc6IFtcblx0XHRcdFx0XCJub25lXCIsXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lYXI6IFtcblx0XHRcdFx0XHRcdHsgdG86IFtcblx0XHRcdFx0XHRcdFx0XCJ0XCIsXG5cdFx0XHRcdFx0XHRcdFwidHJcIixcblx0XHRcdFx0XHRcdFx0XCJyXCIsXG5cdFx0XHRcdFx0XHRcdFwiYnJcIixcblx0XHRcdFx0XHRcdFx0XCJiXCIsXG5cdFx0XHRcdFx0XHRcdFwiYmxcIixcblx0XHRcdFx0XHRcdFx0XCJsXCIsXG5cdFx0XHRcdFx0XHRcdFwidGxcIlxuXHRcdFx0XHRcdFx0XSB9LFxuXHRcdFx0XHRcdFx0aXNJbnRlZ2VyLFxuXHRcdFx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZSxcblx0XHRcdFx0XHRcdGlzQXJiaXRyYXJ5VmFsdWVcblx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdHJhZGlhbDogW1xuXHRcdFx0XHRcdFx0XCJcIixcblx0XHRcdFx0XHRcdGlzQXJiaXRyYXJ5VmFyaWFibGUsXG5cdFx0XHRcdFx0XHRpc0FyYml0cmFyeVZhbHVlXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRjb25pYzogW1xuXHRcdFx0XHRcdFx0aXNJbnRlZ2VyLFxuXHRcdFx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZSxcblx0XHRcdFx0XHRcdGlzQXJiaXRyYXJ5VmFsdWVcblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFyaWFibGVJbWFnZSxcblx0XHRcdFx0aXNBcmJpdHJhcnlJbWFnZVxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBCYWNrZ3JvdW5kIENvbG9yXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9iYWNrZ3JvdW5kLWNvbG9yXG5cdFx0XHQqL1xuXHRcdFx0XCJiZy1jb2xvclwiOiBbeyBiZzogc2NhbGVDb2xvcigpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEdyYWRpZW50IENvbG9yIFN0b3BzIEZyb20gUG9zaXRpb25cblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2dyYWRpZW50LWNvbG9yLXN0b3BzXG5cdFx0XHQqL1xuXHRcdFx0XCJncmFkaWVudC1mcm9tLXBvc1wiOiBbeyBmcm9tOiBzY2FsZUdyYWRpZW50U3RvcFBvc2l0aW9uKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogR3JhZGllbnQgQ29sb3IgU3RvcHMgVmlhIFBvc2l0aW9uXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ncmFkaWVudC1jb2xvci1zdG9wc1xuXHRcdFx0Ki9cblx0XHRcdFwiZ3JhZGllbnQtdmlhLXBvc1wiOiBbeyB2aWE6IHNjYWxlR3JhZGllbnRTdG9wUG9zaXRpb24oKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBHcmFkaWVudCBDb2xvciBTdG9wcyBUbyBQb3NpdGlvblxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvZ3JhZGllbnQtY29sb3Itc3RvcHNcblx0XHRcdCovXG5cdFx0XHRcImdyYWRpZW50LXRvLXBvc1wiOiBbeyB0bzogc2NhbGVHcmFkaWVudFN0b3BQb3NpdGlvbigpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEdyYWRpZW50IENvbG9yIFN0b3BzIEZyb21cblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2dyYWRpZW50LWNvbG9yLXN0b3BzXG5cdFx0XHQqL1xuXHRcdFx0XCJncmFkaWVudC1mcm9tXCI6IFt7IGZyb206IHNjYWxlQ29sb3IoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBHcmFkaWVudCBDb2xvciBTdG9wcyBWaWFcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2dyYWRpZW50LWNvbG9yLXN0b3BzXG5cdFx0XHQqL1xuXHRcdFx0XCJncmFkaWVudC12aWFcIjogW3sgdmlhOiBzY2FsZUNvbG9yKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogR3JhZGllbnQgQ29sb3IgU3RvcHMgVG9cblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2dyYWRpZW50LWNvbG9yLXN0b3BzXG5cdFx0XHQqL1xuXHRcdFx0XCJncmFkaWVudC10b1wiOiBbeyB0bzogc2NhbGVDb2xvcigpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEJvcmRlciBSYWRpdXNcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JvcmRlci1yYWRpdXNcblx0XHRcdCovXG5cdFx0XHRyb3VuZGVkOiBbeyByb3VuZGVkOiBzY2FsZVJhZGl1cygpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEJvcmRlciBSYWRpdXMgU3RhcnRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JvcmRlci1yYWRpdXNcblx0XHRcdCovXG5cdFx0XHRcInJvdW5kZWQtc1wiOiBbeyBcInJvdW5kZWQtc1wiOiBzY2FsZVJhZGl1cygpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEJvcmRlciBSYWRpdXMgRW5kXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ib3JkZXItcmFkaXVzXG5cdFx0XHQqL1xuXHRcdFx0XCJyb3VuZGVkLWVcIjogW3sgXCJyb3VuZGVkLWVcIjogc2NhbGVSYWRpdXMoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBCb3JkZXIgUmFkaXVzIFRvcFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm9yZGVyLXJhZGl1c1xuXHRcdFx0Ki9cblx0XHRcdFwicm91bmRlZC10XCI6IFt7IFwicm91bmRlZC10XCI6IHNjYWxlUmFkaXVzKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm9yZGVyIFJhZGl1cyBSaWdodFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm9yZGVyLXJhZGl1c1xuXHRcdFx0Ki9cblx0XHRcdFwicm91bmRlZC1yXCI6IFt7IFwicm91bmRlZC1yXCI6IHNjYWxlUmFkaXVzKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm9yZGVyIFJhZGl1cyBCb3R0b21cblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JvcmRlci1yYWRpdXNcblx0XHRcdCovXG5cdFx0XHRcInJvdW5kZWQtYlwiOiBbeyBcInJvdW5kZWQtYlwiOiBzY2FsZVJhZGl1cygpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEJvcmRlciBSYWRpdXMgTGVmdFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm9yZGVyLXJhZGl1c1xuXHRcdFx0Ki9cblx0XHRcdFwicm91bmRlZC1sXCI6IFt7IFwicm91bmRlZC1sXCI6IHNjYWxlUmFkaXVzKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm9yZGVyIFJhZGl1cyBTdGFydCBTdGFydFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm9yZGVyLXJhZGl1c1xuXHRcdFx0Ki9cblx0XHRcdFwicm91bmRlZC1zc1wiOiBbeyBcInJvdW5kZWQtc3NcIjogc2NhbGVSYWRpdXMoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBCb3JkZXIgUmFkaXVzIFN0YXJ0IEVuZFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm9yZGVyLXJhZGl1c1xuXHRcdFx0Ki9cblx0XHRcdFwicm91bmRlZC1zZVwiOiBbeyBcInJvdW5kZWQtc2VcIjogc2NhbGVSYWRpdXMoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBCb3JkZXIgUmFkaXVzIEVuZCBFbmRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JvcmRlci1yYWRpdXNcblx0XHRcdCovXG5cdFx0XHRcInJvdW5kZWQtZWVcIjogW3sgXCJyb3VuZGVkLWVlXCI6IHNjYWxlUmFkaXVzKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm9yZGVyIFJhZGl1cyBFbmQgU3RhcnRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JvcmRlci1yYWRpdXNcblx0XHRcdCovXG5cdFx0XHRcInJvdW5kZWQtZXNcIjogW3sgXCJyb3VuZGVkLWVzXCI6IHNjYWxlUmFkaXVzKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm9yZGVyIFJhZGl1cyBUb3AgTGVmdFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm9yZGVyLXJhZGl1c1xuXHRcdFx0Ki9cblx0XHRcdFwicm91bmRlZC10bFwiOiBbeyBcInJvdW5kZWQtdGxcIjogc2NhbGVSYWRpdXMoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBCb3JkZXIgUmFkaXVzIFRvcCBSaWdodFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm9yZGVyLXJhZGl1c1xuXHRcdFx0Ki9cblx0XHRcdFwicm91bmRlZC10clwiOiBbeyBcInJvdW5kZWQtdHJcIjogc2NhbGVSYWRpdXMoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBCb3JkZXIgUmFkaXVzIEJvdHRvbSBSaWdodFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm9yZGVyLXJhZGl1c1xuXHRcdFx0Ki9cblx0XHRcdFwicm91bmRlZC1iclwiOiBbeyBcInJvdW5kZWQtYnJcIjogc2NhbGVSYWRpdXMoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBCb3JkZXIgUmFkaXVzIEJvdHRvbSBMZWZ0XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ib3JkZXItcmFkaXVzXG5cdFx0XHQqL1xuXHRcdFx0XCJyb3VuZGVkLWJsXCI6IFt7IFwicm91bmRlZC1ibFwiOiBzY2FsZVJhZGl1cygpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEJvcmRlciBXaWR0aFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm9yZGVyLXdpZHRoXG5cdFx0XHQqL1xuXHRcdFx0XCJib3JkZXItd1wiOiBbeyBib3JkZXI6IHNjYWxlQm9yZGVyV2lkdGgoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBCb3JkZXIgV2lkdGggSW5saW5lXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ib3JkZXItd2lkdGhcblx0XHRcdCovXG5cdFx0XHRcImJvcmRlci13LXhcIjogW3sgXCJib3JkZXIteFwiOiBzY2FsZUJvcmRlcldpZHRoKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm9yZGVyIFdpZHRoIEJsb2NrXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ib3JkZXItd2lkdGhcblx0XHRcdCovXG5cdFx0XHRcImJvcmRlci13LXlcIjogW3sgXCJib3JkZXIteVwiOiBzY2FsZUJvcmRlcldpZHRoKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm9yZGVyIFdpZHRoIElubGluZSBTdGFydFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm9yZGVyLXdpZHRoXG5cdFx0XHQqL1xuXHRcdFx0XCJib3JkZXItdy1zXCI6IFt7IFwiYm9yZGVyLXNcIjogc2NhbGVCb3JkZXJXaWR0aCgpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEJvcmRlciBXaWR0aCBJbmxpbmUgRW5kXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ib3JkZXItd2lkdGhcblx0XHRcdCovXG5cdFx0XHRcImJvcmRlci13LWVcIjogW3sgXCJib3JkZXItZVwiOiBzY2FsZUJvcmRlcldpZHRoKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm9yZGVyIFdpZHRoIEJsb2NrIFN0YXJ0XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ib3JkZXItd2lkdGhcblx0XHRcdCovXG5cdFx0XHRcImJvcmRlci13LWJzXCI6IFt7IFwiYm9yZGVyLWJzXCI6IHNjYWxlQm9yZGVyV2lkdGgoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBCb3JkZXIgV2lkdGggQmxvY2sgRW5kXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ib3JkZXItd2lkdGhcblx0XHRcdCovXG5cdFx0XHRcImJvcmRlci13LWJlXCI6IFt7IFwiYm9yZGVyLWJlXCI6IHNjYWxlQm9yZGVyV2lkdGgoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBCb3JkZXIgV2lkdGggVG9wXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ib3JkZXItd2lkdGhcblx0XHRcdCovXG5cdFx0XHRcImJvcmRlci13LXRcIjogW3sgXCJib3JkZXItdFwiOiBzY2FsZUJvcmRlcldpZHRoKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm9yZGVyIFdpZHRoIFJpZ2h0XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ib3JkZXItd2lkdGhcblx0XHRcdCovXG5cdFx0XHRcImJvcmRlci13LXJcIjogW3sgXCJib3JkZXItclwiOiBzY2FsZUJvcmRlcldpZHRoKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm9yZGVyIFdpZHRoIEJvdHRvbVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm9yZGVyLXdpZHRoXG5cdFx0XHQqL1xuXHRcdFx0XCJib3JkZXItdy1iXCI6IFt7IFwiYm9yZGVyLWJcIjogc2NhbGVCb3JkZXJXaWR0aCgpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEJvcmRlciBXaWR0aCBMZWZ0XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ib3JkZXItd2lkdGhcblx0XHRcdCovXG5cdFx0XHRcImJvcmRlci13LWxcIjogW3sgXCJib3JkZXItbFwiOiBzY2FsZUJvcmRlcldpZHRoKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogRGl2aWRlIFdpZHRoIFhcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JvcmRlci13aWR0aCNiZXR3ZWVuLWNoaWxkcmVuXG5cdFx0XHQqL1xuXHRcdFx0XCJkaXZpZGUteFwiOiBbeyBcImRpdmlkZS14XCI6IHNjYWxlQm9yZGVyV2lkdGgoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBEaXZpZGUgV2lkdGggWCBSZXZlcnNlXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ib3JkZXItd2lkdGgjYmV0d2Vlbi1jaGlsZHJlblxuXHRcdFx0Ki9cblx0XHRcdFwiZGl2aWRlLXgtcmV2ZXJzZVwiOiBbXCJkaXZpZGUteC1yZXZlcnNlXCJdLFxuXHRcdFx0LyoqXG5cdFx0XHQqIERpdmlkZSBXaWR0aCBZXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ib3JkZXItd2lkdGgjYmV0d2Vlbi1jaGlsZHJlblxuXHRcdFx0Ki9cblx0XHRcdFwiZGl2aWRlLXlcIjogW3sgXCJkaXZpZGUteVwiOiBzY2FsZUJvcmRlcldpZHRoKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogRGl2aWRlIFdpZHRoIFkgUmV2ZXJzZVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm9yZGVyLXdpZHRoI2JldHdlZW4tY2hpbGRyZW5cblx0XHRcdCovXG5cdFx0XHRcImRpdmlkZS15LXJldmVyc2VcIjogW1wiZGl2aWRlLXktcmV2ZXJzZVwiXSxcblx0XHRcdC8qKlxuXHRcdFx0KiBCb3JkZXIgU3R5bGVcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JvcmRlci1zdHlsZVxuXHRcdFx0Ki9cblx0XHRcdFwiYm9yZGVyLXN0eWxlXCI6IFt7IGJvcmRlcjogW1xuXHRcdFx0XHQuLi5zY2FsZUxpbmVTdHlsZSgpLFxuXHRcdFx0XHRcImhpZGRlblwiLFxuXHRcdFx0XHRcIm5vbmVcIlxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBEaXZpZGUgU3R5bGVcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JvcmRlci1zdHlsZSNzZXR0aW5nLXRoZS1kaXZpZGVyLXN0eWxlXG5cdFx0XHQqL1xuXHRcdFx0XCJkaXZpZGUtc3R5bGVcIjogW3sgZGl2aWRlOiBbXG5cdFx0XHRcdC4uLnNjYWxlTGluZVN0eWxlKCksXG5cdFx0XHRcdFwiaGlkZGVuXCIsXG5cdFx0XHRcdFwibm9uZVwiXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEJvcmRlciBDb2xvclxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm9yZGVyLWNvbG9yXG5cdFx0XHQqL1xuXHRcdFx0XCJib3JkZXItY29sb3JcIjogW3sgYm9yZGVyOiBzY2FsZUNvbG9yKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm9yZGVyIENvbG9yIElubGluZVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm9yZGVyLWNvbG9yXG5cdFx0XHQqL1xuXHRcdFx0XCJib3JkZXItY29sb3IteFwiOiBbeyBcImJvcmRlci14XCI6IHNjYWxlQ29sb3IoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBCb3JkZXIgQ29sb3IgQmxvY2tcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JvcmRlci1jb2xvclxuXHRcdFx0Ki9cblx0XHRcdFwiYm9yZGVyLWNvbG9yLXlcIjogW3sgXCJib3JkZXIteVwiOiBzY2FsZUNvbG9yKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm9yZGVyIENvbG9yIElubGluZSBTdGFydFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm9yZGVyLWNvbG9yXG5cdFx0XHQqL1xuXHRcdFx0XCJib3JkZXItY29sb3Itc1wiOiBbeyBcImJvcmRlci1zXCI6IHNjYWxlQ29sb3IoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBCb3JkZXIgQ29sb3IgSW5saW5lIEVuZFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm9yZGVyLWNvbG9yXG5cdFx0XHQqL1xuXHRcdFx0XCJib3JkZXItY29sb3ItZVwiOiBbeyBcImJvcmRlci1lXCI6IHNjYWxlQ29sb3IoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBCb3JkZXIgQ29sb3IgQmxvY2sgU3RhcnRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JvcmRlci1jb2xvclxuXHRcdFx0Ki9cblx0XHRcdFwiYm9yZGVyLWNvbG9yLWJzXCI6IFt7IFwiYm9yZGVyLWJzXCI6IHNjYWxlQ29sb3IoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBCb3JkZXIgQ29sb3IgQmxvY2sgRW5kXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ib3JkZXItY29sb3Jcblx0XHRcdCovXG5cdFx0XHRcImJvcmRlci1jb2xvci1iZVwiOiBbeyBcImJvcmRlci1iZVwiOiBzY2FsZUNvbG9yKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm9yZGVyIENvbG9yIFRvcFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm9yZGVyLWNvbG9yXG5cdFx0XHQqL1xuXHRcdFx0XCJib3JkZXItY29sb3ItdFwiOiBbeyBcImJvcmRlci10XCI6IHNjYWxlQ29sb3IoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBCb3JkZXIgQ29sb3IgUmlnaHRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JvcmRlci1jb2xvclxuXHRcdFx0Ki9cblx0XHRcdFwiYm9yZGVyLWNvbG9yLXJcIjogW3sgXCJib3JkZXItclwiOiBzY2FsZUNvbG9yKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm9yZGVyIENvbG9yIEJvdHRvbVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm9yZGVyLWNvbG9yXG5cdFx0XHQqL1xuXHRcdFx0XCJib3JkZXItY29sb3ItYlwiOiBbeyBcImJvcmRlci1iXCI6IHNjYWxlQ29sb3IoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBCb3JkZXIgQ29sb3IgTGVmdFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm9yZGVyLWNvbG9yXG5cdFx0XHQqL1xuXHRcdFx0XCJib3JkZXItY29sb3ItbFwiOiBbeyBcImJvcmRlci1sXCI6IHNjYWxlQ29sb3IoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBEaXZpZGUgQ29sb3Jcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2RpdmlkZS1jb2xvclxuXHRcdFx0Ki9cblx0XHRcdFwiZGl2aWRlLWNvbG9yXCI6IFt7IGRpdmlkZTogc2NhbGVDb2xvcigpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIE91dGxpbmUgU3R5bGVcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL291dGxpbmUtc3R5bGVcblx0XHRcdCovXG5cdFx0XHRcIm91dGxpbmUtc3R5bGVcIjogW3sgb3V0bGluZTogW1xuXHRcdFx0XHQuLi5zY2FsZUxpbmVTdHlsZSgpLFxuXHRcdFx0XHRcIm5vbmVcIixcblx0XHRcdFx0XCJoaWRkZW5cIlxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBPdXRsaW5lIE9mZnNldFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvb3V0bGluZS1vZmZzZXRcblx0XHRcdCovXG5cdFx0XHRcIm91dGxpbmUtb2Zmc2V0XCI6IFt7IFwib3V0bGluZS1vZmZzZXRcIjogW1xuXHRcdFx0XHRpc051bWJlcixcblx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZSxcblx0XHRcdFx0aXNBcmJpdHJhcnlWYWx1ZVxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBPdXRsaW5lIFdpZHRoXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9vdXRsaW5lLXdpZHRoXG5cdFx0XHQqL1xuXHRcdFx0XCJvdXRsaW5lLXdcIjogW3sgb3V0bGluZTogW1xuXHRcdFx0XHRcIlwiLFxuXHRcdFx0XHRpc051bWJlcixcblx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZUxlbmd0aCxcblx0XHRcdFx0aXNBcmJpdHJhcnlMZW5ndGhcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogT3V0bGluZSBDb2xvclxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvb3V0bGluZS1jb2xvclxuXHRcdFx0Ki9cblx0XHRcdFwib3V0bGluZS1jb2xvclwiOiBbeyBvdXRsaW5lOiBzY2FsZUNvbG9yKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm94IFNoYWRvd1xuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm94LXNoYWRvd1xuXHRcdFx0Ki9cblx0XHRcdHNoYWRvdzogW3sgc2hhZG93OiBbXG5cdFx0XHRcdFwiXCIsXG5cdFx0XHRcdFwibm9uZVwiLFxuXHRcdFx0XHR0aGVtZVNoYWRvdyxcblx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZVNoYWRvdyxcblx0XHRcdFx0aXNBcmJpdHJhcnlTaGFkb3dcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm94IFNoYWRvdyBDb2xvclxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm94LXNoYWRvdyNzZXR0aW5nLXRoZS1zaGFkb3ctY29sb3Jcblx0XHRcdCovXG5cdFx0XHRcInNoYWRvdy1jb2xvclwiOiBbeyBzaGFkb3c6IHNjYWxlQ29sb3IoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBJbnNldCBCb3ggU2hhZG93XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ib3gtc2hhZG93I2FkZGluZy1hbi1pbnNldC1zaGFkb3dcblx0XHRcdCovXG5cdFx0XHRcImluc2V0LXNoYWRvd1wiOiBbeyBcImluc2V0LXNoYWRvd1wiOiBbXG5cdFx0XHRcdFwibm9uZVwiLFxuXHRcdFx0XHR0aGVtZUluc2V0U2hhZG93LFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhcmlhYmxlU2hhZG93LFxuXHRcdFx0XHRpc0FyYml0cmFyeVNoYWRvd1xuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBJbnNldCBCb3ggU2hhZG93IENvbG9yXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ib3gtc2hhZG93I3NldHRpbmctdGhlLWluc2V0LXNoYWRvdy1jb2xvclxuXHRcdFx0Ki9cblx0XHRcdFwiaW5zZXQtc2hhZG93LWNvbG9yXCI6IFt7IFwiaW5zZXQtc2hhZG93XCI6IHNjYWxlQ29sb3IoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBSaW5nIFdpZHRoXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ib3gtc2hhZG93I2FkZGluZy1hLXJpbmdcblx0XHRcdCovXG5cdFx0XHRcInJpbmctd1wiOiBbeyByaW5nOiBzY2FsZUJvcmRlcldpZHRoKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogUmluZyBXaWR0aCBJbnNldFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdjMudGFpbHdpbmRjc3MuY29tL2RvY3MvcmluZy13aWR0aCNpbnNldC1yaW5nc1xuXHRcdFx0KiBAZGVwcmVjYXRlZCBzaW5jZSBUYWlsd2luZCBDU1MgdjQuMC4wXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3RhaWx3aW5kbGFicy90YWlsd2luZGNzcy9ibG9iL3Y0LjAuMC9wYWNrYWdlcy90YWlsd2luZGNzcy9zcmMvdXRpbGl0aWVzLnRzI0w0MTU4XG5cdFx0XHQqL1xuXHRcdFx0XCJyaW5nLXctaW5zZXRcIjogW1wicmluZy1pbnNldFwiXSxcblx0XHRcdC8qKlxuXHRcdFx0KiBSaW5nIENvbG9yXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ib3gtc2hhZG93I3NldHRpbmctdGhlLXJpbmctY29sb3Jcblx0XHRcdCovXG5cdFx0XHRcInJpbmctY29sb3JcIjogW3sgcmluZzogc2NhbGVDb2xvcigpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFJpbmcgT2Zmc2V0IFdpZHRoXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly92My50YWlsd2luZGNzcy5jb20vZG9jcy9yaW5nLW9mZnNldC13aWR0aFxuXHRcdFx0KiBAZGVwcmVjYXRlZCBzaW5jZSBUYWlsd2luZCBDU1MgdjQuMC4wXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3RhaWx3aW5kbGFicy90YWlsd2luZGNzcy9ibG9iL3Y0LjAuMC9wYWNrYWdlcy90YWlsd2luZGNzcy9zcmMvdXRpbGl0aWVzLnRzI0w0MTU4XG5cdFx0XHQqL1xuXHRcdFx0XCJyaW5nLW9mZnNldC13XCI6IFt7IFwicmluZy1vZmZzZXRcIjogW2lzTnVtYmVyLCBpc0FyYml0cmFyeUxlbmd0aF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogUmluZyBPZmZzZXQgQ29sb3Jcblx0XHRcdCogQHNlZSBodHRwczovL3YzLnRhaWx3aW5kY3NzLmNvbS9kb2NzL3Jpbmctb2Zmc2V0LWNvbG9yXG5cdFx0XHQqIEBkZXByZWNhdGVkIHNpbmNlIFRhaWx3aW5kIENTUyB2NC4wLjBcblx0XHRcdCogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdGFpbHdpbmRsYWJzL3RhaWx3aW5kY3NzL2Jsb2IvdjQuMC4wL3BhY2thZ2VzL3RhaWx3aW5kY3NzL3NyYy91dGlsaXRpZXMudHMjTDQxNThcblx0XHRcdCovXG5cdFx0XHRcInJpbmctb2Zmc2V0LWNvbG9yXCI6IFt7IFwicmluZy1vZmZzZXRcIjogc2NhbGVDb2xvcigpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEluc2V0IFJpbmcgV2lkdGhcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JveC1zaGFkb3cjYWRkaW5nLWFuLWluc2V0LXJpbmdcblx0XHRcdCovXG5cdFx0XHRcImluc2V0LXJpbmctd1wiOiBbeyBcImluc2V0LXJpbmdcIjogc2NhbGVCb3JkZXJXaWR0aCgpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEluc2V0IFJpbmcgQ29sb3Jcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JveC1zaGFkb3cjc2V0dGluZy10aGUtaW5zZXQtcmluZy1jb2xvclxuXHRcdFx0Ki9cblx0XHRcdFwiaW5zZXQtcmluZy1jb2xvclwiOiBbeyBcImluc2V0LXJpbmdcIjogc2NhbGVDb2xvcigpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFRleHQgU2hhZG93XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy90ZXh0LXNoYWRvd1xuXHRcdFx0Ki9cblx0XHRcdFwidGV4dC1zaGFkb3dcIjogW3sgXCJ0ZXh0LXNoYWRvd1wiOiBbXG5cdFx0XHRcdFwibm9uZVwiLFxuXHRcdFx0XHR0aGVtZVRleHRTaGFkb3csXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFyaWFibGVTaGFkb3csXG5cdFx0XHRcdGlzQXJiaXRyYXJ5U2hhZG93XG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFRleHQgU2hhZG93IENvbG9yXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy90ZXh0LXNoYWRvdyNzZXR0aW5nLXRoZS1zaGFkb3ctY29sb3Jcblx0XHRcdCovXG5cdFx0XHRcInRleHQtc2hhZG93LWNvbG9yXCI6IFt7IFwidGV4dC1zaGFkb3dcIjogc2NhbGVDb2xvcigpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIE9wYWNpdHlcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL29wYWNpdHlcblx0XHRcdCovXG5cdFx0XHRvcGFjaXR5OiBbeyBvcGFjaXR5OiBbXG5cdFx0XHRcdGlzTnVtYmVyLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhbHVlXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIE1peCBCbGVuZCBNb2RlXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9taXgtYmxlbmQtbW9kZVxuXHRcdFx0Ki9cblx0XHRcdFwibWl4LWJsZW5kXCI6IFt7IFwibWl4LWJsZW5kXCI6IFtcblx0XHRcdFx0Li4uc2NhbGVCbGVuZE1vZGUoKSxcblx0XHRcdFx0XCJwbHVzLWRhcmtlclwiLFxuXHRcdFx0XHRcInBsdXMtbGlnaHRlclwiXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEJhY2tncm91bmQgQmxlbmQgTW9kZVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYmFja2dyb3VuZC1ibGVuZC1tb2RlXG5cdFx0XHQqL1xuXHRcdFx0XCJiZy1ibGVuZFwiOiBbeyBcImJnLWJsZW5kXCI6IHNjYWxlQmxlbmRNb2RlKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogTWFzayBDbGlwXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9tYXNrLWNsaXBcblx0XHRcdCovXG5cdFx0XHRcIm1hc2stY2xpcFwiOiBbeyBcIm1hc2stY2xpcFwiOiBbXG5cdFx0XHRcdFwiYm9yZGVyXCIsXG5cdFx0XHRcdFwicGFkZGluZ1wiLFxuXHRcdFx0XHRcImNvbnRlbnRcIixcblx0XHRcdFx0XCJmaWxsXCIsXG5cdFx0XHRcdFwic3Ryb2tlXCIsXG5cdFx0XHRcdFwidmlld1wiXG5cdFx0XHRdIH0sIFwibWFzay1uby1jbGlwXCJdLFxuXHRcdFx0LyoqXG5cdFx0XHQqIE1hc2sgQ29tcG9zaXRlXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9tYXNrLWNvbXBvc2l0ZVxuXHRcdFx0Ki9cblx0XHRcdFwibWFzay1jb21wb3NpdGVcIjogW3sgbWFzazogW1xuXHRcdFx0XHRcImFkZFwiLFxuXHRcdFx0XHRcInN1YnRyYWN0XCIsXG5cdFx0XHRcdFwiaW50ZXJzZWN0XCIsXG5cdFx0XHRcdFwiZXhjbHVkZVwiXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIE1hc2sgSW1hZ2Vcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL21hc2staW1hZ2Vcblx0XHRcdCovXG5cdFx0XHRcIm1hc2staW1hZ2UtbGluZWFyLXBvc1wiOiBbeyBcIm1hc2stbGluZWFyXCI6IFtpc051bWJlcl0gfV0sXG5cdFx0XHRcIm1hc2staW1hZ2UtbGluZWFyLWZyb20tcG9zXCI6IFt7IFwibWFzay1saW5lYXItZnJvbVwiOiBzY2FsZU1hc2tJbWFnZVBvc2l0aW9uKCkgfV0sXG5cdFx0XHRcIm1hc2staW1hZ2UtbGluZWFyLXRvLXBvc1wiOiBbeyBcIm1hc2stbGluZWFyLXRvXCI6IHNjYWxlTWFza0ltYWdlUG9zaXRpb24oKSB9XSxcblx0XHRcdFwibWFzay1pbWFnZS1saW5lYXItZnJvbS1jb2xvclwiOiBbeyBcIm1hc2stbGluZWFyLWZyb21cIjogc2NhbGVDb2xvcigpIH1dLFxuXHRcdFx0XCJtYXNrLWltYWdlLWxpbmVhci10by1jb2xvclwiOiBbeyBcIm1hc2stbGluZWFyLXRvXCI6IHNjYWxlQ29sb3IoKSB9XSxcblx0XHRcdFwibWFzay1pbWFnZS10LWZyb20tcG9zXCI6IFt7IFwibWFzay10LWZyb21cIjogc2NhbGVNYXNrSW1hZ2VQb3NpdGlvbigpIH1dLFxuXHRcdFx0XCJtYXNrLWltYWdlLXQtdG8tcG9zXCI6IFt7IFwibWFzay10LXRvXCI6IHNjYWxlTWFza0ltYWdlUG9zaXRpb24oKSB9XSxcblx0XHRcdFwibWFzay1pbWFnZS10LWZyb20tY29sb3JcIjogW3sgXCJtYXNrLXQtZnJvbVwiOiBzY2FsZUNvbG9yKCkgfV0sXG5cdFx0XHRcIm1hc2staW1hZ2UtdC10by1jb2xvclwiOiBbeyBcIm1hc2stdC10b1wiOiBzY2FsZUNvbG9yKCkgfV0sXG5cdFx0XHRcIm1hc2staW1hZ2Utci1mcm9tLXBvc1wiOiBbeyBcIm1hc2stci1mcm9tXCI6IHNjYWxlTWFza0ltYWdlUG9zaXRpb24oKSB9XSxcblx0XHRcdFwibWFzay1pbWFnZS1yLXRvLXBvc1wiOiBbeyBcIm1hc2stci10b1wiOiBzY2FsZU1hc2tJbWFnZVBvc2l0aW9uKCkgfV0sXG5cdFx0XHRcIm1hc2staW1hZ2Utci1mcm9tLWNvbG9yXCI6IFt7IFwibWFzay1yLWZyb21cIjogc2NhbGVDb2xvcigpIH1dLFxuXHRcdFx0XCJtYXNrLWltYWdlLXItdG8tY29sb3JcIjogW3sgXCJtYXNrLXItdG9cIjogc2NhbGVDb2xvcigpIH1dLFxuXHRcdFx0XCJtYXNrLWltYWdlLWItZnJvbS1wb3NcIjogW3sgXCJtYXNrLWItZnJvbVwiOiBzY2FsZU1hc2tJbWFnZVBvc2l0aW9uKCkgfV0sXG5cdFx0XHRcIm1hc2staW1hZ2UtYi10by1wb3NcIjogW3sgXCJtYXNrLWItdG9cIjogc2NhbGVNYXNrSW1hZ2VQb3NpdGlvbigpIH1dLFxuXHRcdFx0XCJtYXNrLWltYWdlLWItZnJvbS1jb2xvclwiOiBbeyBcIm1hc2stYi1mcm9tXCI6IHNjYWxlQ29sb3IoKSB9XSxcblx0XHRcdFwibWFzay1pbWFnZS1iLXRvLWNvbG9yXCI6IFt7IFwibWFzay1iLXRvXCI6IHNjYWxlQ29sb3IoKSB9XSxcblx0XHRcdFwibWFzay1pbWFnZS1sLWZyb20tcG9zXCI6IFt7IFwibWFzay1sLWZyb21cIjogc2NhbGVNYXNrSW1hZ2VQb3NpdGlvbigpIH1dLFxuXHRcdFx0XCJtYXNrLWltYWdlLWwtdG8tcG9zXCI6IFt7IFwibWFzay1sLXRvXCI6IHNjYWxlTWFza0ltYWdlUG9zaXRpb24oKSB9XSxcblx0XHRcdFwibWFzay1pbWFnZS1sLWZyb20tY29sb3JcIjogW3sgXCJtYXNrLWwtZnJvbVwiOiBzY2FsZUNvbG9yKCkgfV0sXG5cdFx0XHRcIm1hc2staW1hZ2UtbC10by1jb2xvclwiOiBbeyBcIm1hc2stbC10b1wiOiBzY2FsZUNvbG9yKCkgfV0sXG5cdFx0XHRcIm1hc2staW1hZ2UteC1mcm9tLXBvc1wiOiBbeyBcIm1hc2steC1mcm9tXCI6IHNjYWxlTWFza0ltYWdlUG9zaXRpb24oKSB9XSxcblx0XHRcdFwibWFzay1pbWFnZS14LXRvLXBvc1wiOiBbeyBcIm1hc2steC10b1wiOiBzY2FsZU1hc2tJbWFnZVBvc2l0aW9uKCkgfV0sXG5cdFx0XHRcIm1hc2staW1hZ2UteC1mcm9tLWNvbG9yXCI6IFt7IFwibWFzay14LWZyb21cIjogc2NhbGVDb2xvcigpIH1dLFxuXHRcdFx0XCJtYXNrLWltYWdlLXgtdG8tY29sb3JcIjogW3sgXCJtYXNrLXgtdG9cIjogc2NhbGVDb2xvcigpIH1dLFxuXHRcdFx0XCJtYXNrLWltYWdlLXktZnJvbS1wb3NcIjogW3sgXCJtYXNrLXktZnJvbVwiOiBzY2FsZU1hc2tJbWFnZVBvc2l0aW9uKCkgfV0sXG5cdFx0XHRcIm1hc2staW1hZ2UteS10by1wb3NcIjogW3sgXCJtYXNrLXktdG9cIjogc2NhbGVNYXNrSW1hZ2VQb3NpdGlvbigpIH1dLFxuXHRcdFx0XCJtYXNrLWltYWdlLXktZnJvbS1jb2xvclwiOiBbeyBcIm1hc2steS1mcm9tXCI6IHNjYWxlQ29sb3IoKSB9XSxcblx0XHRcdFwibWFzay1pbWFnZS15LXRvLWNvbG9yXCI6IFt7IFwibWFzay15LXRvXCI6IHNjYWxlQ29sb3IoKSB9XSxcblx0XHRcdFwibWFzay1pbWFnZS1yYWRpYWxcIjogW3sgXCJtYXNrLXJhZGlhbFwiOiBbaXNBcmJpdHJhcnlWYXJpYWJsZSwgaXNBcmJpdHJhcnlWYWx1ZV0gfV0sXG5cdFx0XHRcIm1hc2staW1hZ2UtcmFkaWFsLWZyb20tcG9zXCI6IFt7IFwibWFzay1yYWRpYWwtZnJvbVwiOiBzY2FsZU1hc2tJbWFnZVBvc2l0aW9uKCkgfV0sXG5cdFx0XHRcIm1hc2staW1hZ2UtcmFkaWFsLXRvLXBvc1wiOiBbeyBcIm1hc2stcmFkaWFsLXRvXCI6IHNjYWxlTWFza0ltYWdlUG9zaXRpb24oKSB9XSxcblx0XHRcdFwibWFzay1pbWFnZS1yYWRpYWwtZnJvbS1jb2xvclwiOiBbeyBcIm1hc2stcmFkaWFsLWZyb21cIjogc2NhbGVDb2xvcigpIH1dLFxuXHRcdFx0XCJtYXNrLWltYWdlLXJhZGlhbC10by1jb2xvclwiOiBbeyBcIm1hc2stcmFkaWFsLXRvXCI6IHNjYWxlQ29sb3IoKSB9XSxcblx0XHRcdFwibWFzay1pbWFnZS1yYWRpYWwtc2hhcGVcIjogW3sgXCJtYXNrLXJhZGlhbFwiOiBbXCJjaXJjbGVcIiwgXCJlbGxpcHNlXCJdIH1dLFxuXHRcdFx0XCJtYXNrLWltYWdlLXJhZGlhbC1zaXplXCI6IFt7IFwibWFzay1yYWRpYWxcIjogW3tcblx0XHRcdFx0Y2xvc2VzdDogW1wic2lkZVwiLCBcImNvcm5lclwiXSxcblx0XHRcdFx0ZmFydGhlc3Q6IFtcInNpZGVcIiwgXCJjb3JuZXJcIl1cblx0XHRcdH1dIH1dLFxuXHRcdFx0XCJtYXNrLWltYWdlLXJhZGlhbC1wb3NcIjogW3sgXCJtYXNrLXJhZGlhbC1hdFwiOiBzY2FsZVBvc2l0aW9uKCkgfV0sXG5cdFx0XHRcIm1hc2staW1hZ2UtY29uaWMtcG9zXCI6IFt7IFwibWFzay1jb25pY1wiOiBbaXNOdW1iZXJdIH1dLFxuXHRcdFx0XCJtYXNrLWltYWdlLWNvbmljLWZyb20tcG9zXCI6IFt7IFwibWFzay1jb25pYy1mcm9tXCI6IHNjYWxlTWFza0ltYWdlUG9zaXRpb24oKSB9XSxcblx0XHRcdFwibWFzay1pbWFnZS1jb25pYy10by1wb3NcIjogW3sgXCJtYXNrLWNvbmljLXRvXCI6IHNjYWxlTWFza0ltYWdlUG9zaXRpb24oKSB9XSxcblx0XHRcdFwibWFzay1pbWFnZS1jb25pYy1mcm9tLWNvbG9yXCI6IFt7IFwibWFzay1jb25pYy1mcm9tXCI6IHNjYWxlQ29sb3IoKSB9XSxcblx0XHRcdFwibWFzay1pbWFnZS1jb25pYy10by1jb2xvclwiOiBbeyBcIm1hc2stY29uaWMtdG9cIjogc2NhbGVDb2xvcigpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIE1hc2sgTW9kZVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvbWFzay1tb2RlXG5cdFx0XHQqL1xuXHRcdFx0XCJtYXNrLW1vZGVcIjogW3sgbWFzazogW1xuXHRcdFx0XHRcImFscGhhXCIsXG5cdFx0XHRcdFwibHVtaW5hbmNlXCIsXG5cdFx0XHRcdFwibWF0Y2hcIlxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBNYXNrIE9yaWdpblxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvbWFzay1vcmlnaW5cblx0XHRcdCovXG5cdFx0XHRcIm1hc2stb3JpZ2luXCI6IFt7IFwibWFzay1vcmlnaW5cIjogW1xuXHRcdFx0XHRcImJvcmRlclwiLFxuXHRcdFx0XHRcInBhZGRpbmdcIixcblx0XHRcdFx0XCJjb250ZW50XCIsXG5cdFx0XHRcdFwiZmlsbFwiLFxuXHRcdFx0XHRcInN0cm9rZVwiLFxuXHRcdFx0XHRcInZpZXdcIlxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBNYXNrIFBvc2l0aW9uXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9tYXNrLXBvc2l0aW9uXG5cdFx0XHQqL1xuXHRcdFx0XCJtYXNrLXBvc2l0aW9uXCI6IFt7IG1hc2s6IHNjYWxlQmdQb3NpdGlvbigpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIE1hc2sgUmVwZWF0XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9tYXNrLXJlcGVhdFxuXHRcdFx0Ki9cblx0XHRcdFwibWFzay1yZXBlYXRcIjogW3sgbWFzazogc2NhbGVCZ1JlcGVhdCgpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIE1hc2sgU2l6ZVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvbWFzay1zaXplXG5cdFx0XHQqL1xuXHRcdFx0XCJtYXNrLXNpemVcIjogW3sgbWFzazogc2NhbGVCZ1NpemUoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBNYXNrIFR5cGVcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL21hc2stdHlwZVxuXHRcdFx0Ki9cblx0XHRcdFwibWFzay10eXBlXCI6IFt7IFwibWFzay10eXBlXCI6IFtcImFscGhhXCIsIFwibHVtaW5hbmNlXCJdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIE1hc2sgSW1hZ2Vcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL21hc2staW1hZ2Vcblx0XHRcdCovXG5cdFx0XHRcIm1hc2staW1hZ2VcIjogW3sgbWFzazogW1xuXHRcdFx0XHRcIm5vbmVcIixcblx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZSxcblx0XHRcdFx0aXNBcmJpdHJhcnlWYWx1ZVxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBGaWx0ZXJcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2ZpbHRlclxuXHRcdFx0Ki9cblx0XHRcdGZpbHRlcjogW3sgZmlsdGVyOiBbXG5cdFx0XHRcdFwiXCIsXG5cdFx0XHRcdFwibm9uZVwiLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhbHVlXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEJsdXJcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JsdXJcblx0XHRcdCovXG5cdFx0XHRibHVyOiBbeyBibHVyOiBzY2FsZUJsdXIoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBCcmlnaHRuZXNzXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9icmlnaHRuZXNzXG5cdFx0XHQqL1xuXHRcdFx0YnJpZ2h0bmVzczogW3sgYnJpZ2h0bmVzczogW1xuXHRcdFx0XHRpc051bWJlcixcblx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZSxcblx0XHRcdFx0aXNBcmJpdHJhcnlWYWx1ZVxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBDb250cmFzdFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvY29udHJhc3Rcblx0XHRcdCovXG5cdFx0XHRjb250cmFzdDogW3sgY29udHJhc3Q6IFtcblx0XHRcdFx0aXNOdW1iZXIsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFyaWFibGUsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFsdWVcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogRHJvcCBTaGFkb3dcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2Ryb3Atc2hhZG93XG5cdFx0XHQqL1xuXHRcdFx0XCJkcm9wLXNoYWRvd1wiOiBbeyBcImRyb3Atc2hhZG93XCI6IFtcblx0XHRcdFx0XCJcIixcblx0XHRcdFx0XCJub25lXCIsXG5cdFx0XHRcdHRoZW1lRHJvcFNoYWRvdyxcblx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZVNoYWRvdyxcblx0XHRcdFx0aXNBcmJpdHJhcnlTaGFkb3dcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogRHJvcCBTaGFkb3cgQ29sb3Jcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2ZpbHRlci1kcm9wLXNoYWRvdyNzZXR0aW5nLXRoZS1zaGFkb3ctY29sb3Jcblx0XHRcdCovXG5cdFx0XHRcImRyb3Atc2hhZG93LWNvbG9yXCI6IFt7IFwiZHJvcC1zaGFkb3dcIjogc2NhbGVDb2xvcigpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEdyYXlzY2FsZVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvZ3JheXNjYWxlXG5cdFx0XHQqL1xuXHRcdFx0Z3JheXNjYWxlOiBbeyBncmF5c2NhbGU6IFtcblx0XHRcdFx0XCJcIixcblx0XHRcdFx0aXNOdW1iZXIsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFyaWFibGUsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFsdWVcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogSHVlIFJvdGF0ZVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvaHVlLXJvdGF0ZVxuXHRcdFx0Ki9cblx0XHRcdFwiaHVlLXJvdGF0ZVwiOiBbeyBcImh1ZS1yb3RhdGVcIjogW1xuXHRcdFx0XHRpc051bWJlcixcblx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZSxcblx0XHRcdFx0aXNBcmJpdHJhcnlWYWx1ZVxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBJbnZlcnRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2ludmVydFxuXHRcdFx0Ki9cblx0XHRcdGludmVydDogW3sgaW52ZXJ0OiBbXG5cdFx0XHRcdFwiXCIsXG5cdFx0XHRcdGlzTnVtYmVyLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhbHVlXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFNhdHVyYXRlXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9zYXR1cmF0ZVxuXHRcdFx0Ki9cblx0XHRcdHNhdHVyYXRlOiBbeyBzYXR1cmF0ZTogW1xuXHRcdFx0XHRpc051bWJlcixcblx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZSxcblx0XHRcdFx0aXNBcmJpdHJhcnlWYWx1ZVxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBTZXBpYVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvc2VwaWFcblx0XHRcdCovXG5cdFx0XHRzZXBpYTogW3sgc2VwaWE6IFtcblx0XHRcdFx0XCJcIixcblx0XHRcdFx0aXNOdW1iZXIsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFyaWFibGUsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFsdWVcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQmFja2Ryb3AgRmlsdGVyXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9iYWNrZHJvcC1maWx0ZXJcblx0XHRcdCovXG5cdFx0XHRcImJhY2tkcm9wLWZpbHRlclwiOiBbeyBcImJhY2tkcm9wLWZpbHRlclwiOiBbXG5cdFx0XHRcdFwiXCIsXG5cdFx0XHRcdFwibm9uZVwiLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhbHVlXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEJhY2tkcm9wIEJsdXJcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JhY2tkcm9wLWJsdXJcblx0XHRcdCovXG5cdFx0XHRcImJhY2tkcm9wLWJsdXJcIjogW3sgXCJiYWNrZHJvcC1ibHVyXCI6IHNjYWxlQmx1cigpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEJhY2tkcm9wIEJyaWdodG5lc3Ncblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JhY2tkcm9wLWJyaWdodG5lc3Ncblx0XHRcdCovXG5cdFx0XHRcImJhY2tkcm9wLWJyaWdodG5lc3NcIjogW3sgXCJiYWNrZHJvcC1icmlnaHRuZXNzXCI6IFtcblx0XHRcdFx0aXNOdW1iZXIsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFyaWFibGUsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFsdWVcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQmFja2Ryb3AgQ29udHJhc3Rcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JhY2tkcm9wLWNvbnRyYXN0XG5cdFx0XHQqL1xuXHRcdFx0XCJiYWNrZHJvcC1jb250cmFzdFwiOiBbeyBcImJhY2tkcm9wLWNvbnRyYXN0XCI6IFtcblx0XHRcdFx0aXNOdW1iZXIsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFyaWFibGUsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFsdWVcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQmFja2Ryb3AgR3JheXNjYWxlXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9iYWNrZHJvcC1ncmF5c2NhbGVcblx0XHRcdCovXG5cdFx0XHRcImJhY2tkcm9wLWdyYXlzY2FsZVwiOiBbeyBcImJhY2tkcm9wLWdyYXlzY2FsZVwiOiBbXG5cdFx0XHRcdFwiXCIsXG5cdFx0XHRcdGlzTnVtYmVyLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhbHVlXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEJhY2tkcm9wIEh1ZSBSb3RhdGVcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JhY2tkcm9wLWh1ZS1yb3RhdGVcblx0XHRcdCovXG5cdFx0XHRcImJhY2tkcm9wLWh1ZS1yb3RhdGVcIjogW3sgXCJiYWNrZHJvcC1odWUtcm90YXRlXCI6IFtcblx0XHRcdFx0aXNOdW1iZXIsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFyaWFibGUsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFsdWVcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQmFja2Ryb3AgSW52ZXJ0XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9iYWNrZHJvcC1pbnZlcnRcblx0XHRcdCovXG5cdFx0XHRcImJhY2tkcm9wLWludmVydFwiOiBbeyBcImJhY2tkcm9wLWludmVydFwiOiBbXG5cdFx0XHRcdFwiXCIsXG5cdFx0XHRcdGlzTnVtYmVyLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhbHVlXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEJhY2tkcm9wIE9wYWNpdHlcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JhY2tkcm9wLW9wYWNpdHlcblx0XHRcdCovXG5cdFx0XHRcImJhY2tkcm9wLW9wYWNpdHlcIjogW3sgXCJiYWNrZHJvcC1vcGFjaXR5XCI6IFtcblx0XHRcdFx0aXNOdW1iZXIsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFyaWFibGUsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFsdWVcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQmFja2Ryb3AgU2F0dXJhdGVcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JhY2tkcm9wLXNhdHVyYXRlXG5cdFx0XHQqL1xuXHRcdFx0XCJiYWNrZHJvcC1zYXR1cmF0ZVwiOiBbeyBcImJhY2tkcm9wLXNhdHVyYXRlXCI6IFtcblx0XHRcdFx0aXNOdW1iZXIsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFyaWFibGUsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFsdWVcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQmFja2Ryb3AgU2VwaWFcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JhY2tkcm9wLXNlcGlhXG5cdFx0XHQqL1xuXHRcdFx0XCJiYWNrZHJvcC1zZXBpYVwiOiBbeyBcImJhY2tkcm9wLXNlcGlhXCI6IFtcblx0XHRcdFx0XCJcIixcblx0XHRcdFx0aXNOdW1iZXIsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFyaWFibGUsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFsdWVcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm9yZGVyIENvbGxhcHNlXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9ib3JkZXItY29sbGFwc2Vcblx0XHRcdCovXG5cdFx0XHRcImJvcmRlci1jb2xsYXBzZVwiOiBbeyBib3JkZXI6IFtcImNvbGxhcHNlXCIsIFwic2VwYXJhdGVcIl0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm9yZGVyIFNwYWNpbmdcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JvcmRlci1zcGFjaW5nXG5cdFx0XHQqL1xuXHRcdFx0XCJib3JkZXItc3BhY2luZ1wiOiBbeyBcImJvcmRlci1zcGFjaW5nXCI6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm9yZGVyIFNwYWNpbmcgWFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm9yZGVyLXNwYWNpbmdcblx0XHRcdCovXG5cdFx0XHRcImJvcmRlci1zcGFjaW5nLXhcIjogW3sgXCJib3JkZXItc3BhY2luZy14XCI6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQm9yZGVyIFNwYWNpbmcgWVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYm9yZGVyLXNwYWNpbmdcblx0XHRcdCovXG5cdFx0XHRcImJvcmRlci1zcGFjaW5nLXlcIjogW3sgXCJib3JkZXItc3BhY2luZy15XCI6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogVGFibGUgTGF5b3V0XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy90YWJsZS1sYXlvdXRcblx0XHRcdCovXG5cdFx0XHRcInRhYmxlLWxheW91dFwiOiBbeyB0YWJsZTogW1wiYXV0b1wiLCBcImZpeGVkXCJdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIENhcHRpb24gU2lkZVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvY2FwdGlvbi1zaWRlXG5cdFx0XHQqL1xuXHRcdFx0Y2FwdGlvbjogW3sgY2FwdGlvbjogW1widG9wXCIsIFwiYm90dG9tXCJdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFRyYW5zaXRpb24gUHJvcGVydHlcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3RyYW5zaXRpb24tcHJvcGVydHlcblx0XHRcdCovXG5cdFx0XHR0cmFuc2l0aW9uOiBbeyB0cmFuc2l0aW9uOiBbXG5cdFx0XHRcdFwiXCIsXG5cdFx0XHRcdFwiYWxsXCIsXG5cdFx0XHRcdFwiY29sb3JzXCIsXG5cdFx0XHRcdFwib3BhY2l0eVwiLFxuXHRcdFx0XHRcInNoYWRvd1wiLFxuXHRcdFx0XHRcInRyYW5zZm9ybVwiLFxuXHRcdFx0XHRcIm5vbmVcIixcblx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZSxcblx0XHRcdFx0aXNBcmJpdHJhcnlWYWx1ZVxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBUcmFuc2l0aW9uIEJlaGF2aW9yXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy90cmFuc2l0aW9uLWJlaGF2aW9yXG5cdFx0XHQqL1xuXHRcdFx0XCJ0cmFuc2l0aW9uLWJlaGF2aW9yXCI6IFt7IHRyYW5zaXRpb246IFtcIm5vcm1hbFwiLCBcImRpc2NyZXRlXCJdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFRyYW5zaXRpb24gRHVyYXRpb25cblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3RyYW5zaXRpb24tZHVyYXRpb25cblx0XHRcdCovXG5cdFx0XHRkdXJhdGlvbjogW3sgZHVyYXRpb246IFtcblx0XHRcdFx0aXNOdW1iZXIsXG5cdFx0XHRcdFwiaW5pdGlhbFwiLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhbHVlXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFRyYW5zaXRpb24gVGltaW5nIEZ1bmN0aW9uXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy90cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvblxuXHRcdFx0Ki9cblx0XHRcdGVhc2U6IFt7IGVhc2U6IFtcblx0XHRcdFx0XCJsaW5lYXJcIixcblx0XHRcdFx0XCJpbml0aWFsXCIsXG5cdFx0XHRcdHRoZW1lRWFzZSxcblx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZSxcblx0XHRcdFx0aXNBcmJpdHJhcnlWYWx1ZVxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBUcmFuc2l0aW9uIERlbGF5XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy90cmFuc2l0aW9uLWRlbGF5XG5cdFx0XHQqL1xuXHRcdFx0ZGVsYXk6IFt7IGRlbGF5OiBbXG5cdFx0XHRcdGlzTnVtYmVyLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhbHVlXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEFuaW1hdGlvblxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYW5pbWF0aW9uXG5cdFx0XHQqL1xuXHRcdFx0YW5pbWF0ZTogW3sgYW5pbWF0ZTogW1xuXHRcdFx0XHRcIm5vbmVcIixcblx0XHRcdFx0dGhlbWVBbmltYXRlLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhbHVlXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEJhY2tmYWNlIFZpc2liaWxpdHlcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2JhY2tmYWNlLXZpc2liaWxpdHlcblx0XHRcdCovXG5cdFx0XHRiYWNrZmFjZTogW3sgYmFja2ZhY2U6IFtcImhpZGRlblwiLCBcInZpc2libGVcIl0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogUGVyc3BlY3RpdmVcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3BlcnNwZWN0aXZlXG5cdFx0XHQqL1xuXHRcdFx0cGVyc3BlY3RpdmU6IFt7IHBlcnNwZWN0aXZlOiBbXG5cdFx0XHRcdHRoZW1lUGVyc3BlY3RpdmUsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFyaWFibGUsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFsdWVcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogUGVyc3BlY3RpdmUgT3JpZ2luXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9wZXJzcGVjdGl2ZS1vcmlnaW5cblx0XHRcdCovXG5cdFx0XHRcInBlcnNwZWN0aXZlLW9yaWdpblwiOiBbeyBcInBlcnNwZWN0aXZlLW9yaWdpblwiOiBzY2FsZVBvc2l0aW9uV2l0aEFyYml0cmFyeSgpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFJvdGF0ZVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvcm90YXRlXG5cdFx0XHQqL1xuXHRcdFx0cm90YXRlOiBbeyByb3RhdGU6IHNjYWxlUm90YXRlKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogUm90YXRlIFhcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3JvdGF0ZVxuXHRcdFx0Ki9cblx0XHRcdFwicm90YXRlLXhcIjogW3sgXCJyb3RhdGUteFwiOiBzY2FsZVJvdGF0ZSgpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFJvdGF0ZSBZXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9yb3RhdGVcblx0XHRcdCovXG5cdFx0XHRcInJvdGF0ZS15XCI6IFt7IFwicm90YXRlLXlcIjogc2NhbGVSb3RhdGUoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBSb3RhdGUgWlxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvcm90YXRlXG5cdFx0XHQqL1xuXHRcdFx0XCJyb3RhdGUtelwiOiBbeyBcInJvdGF0ZS16XCI6IHNjYWxlUm90YXRlKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2NhbGVcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3NjYWxlXG5cdFx0XHQqL1xuXHRcdFx0c2NhbGU6IFt7IHNjYWxlOiBzY2FsZVNjYWxlKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2NhbGUgWFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvc2NhbGVcblx0XHRcdCovXG5cdFx0XHRcInNjYWxlLXhcIjogW3sgXCJzY2FsZS14XCI6IHNjYWxlU2NhbGUoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBTY2FsZSBZXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9zY2FsZVxuXHRcdFx0Ki9cblx0XHRcdFwic2NhbGUteVwiOiBbeyBcInNjYWxlLXlcIjogc2NhbGVTY2FsZSgpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFNjYWxlIFpcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3NjYWxlXG5cdFx0XHQqL1xuXHRcdFx0XCJzY2FsZS16XCI6IFt7IFwic2NhbGUtelwiOiBzY2FsZVNjYWxlKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2NhbGUgM0Rcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3NjYWxlXG5cdFx0XHQqL1xuXHRcdFx0XCJzY2FsZS0zZFwiOiBbXCJzY2FsZS0zZFwiXSxcblx0XHRcdC8qKlxuXHRcdFx0KiBTa2V3XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9za2V3XG5cdFx0XHQqL1xuXHRcdFx0c2tldzogW3sgc2tldzogc2NhbGVTa2V3KCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2tldyBYXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9za2V3XG5cdFx0XHQqL1xuXHRcdFx0XCJza2V3LXhcIjogW3sgXCJza2V3LXhcIjogc2NhbGVTa2V3KCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2tldyBZXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9za2V3XG5cdFx0XHQqL1xuXHRcdFx0XCJza2V3LXlcIjogW3sgXCJza2V3LXlcIjogc2NhbGVTa2V3KCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogVHJhbnNmb3JtXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy90cmFuc2Zvcm1cblx0XHRcdCovXG5cdFx0XHR0cmFuc2Zvcm06IFt7IHRyYW5zZm9ybTogW1xuXHRcdFx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhbHVlLFxuXHRcdFx0XHRcIlwiLFxuXHRcdFx0XHRcIm5vbmVcIixcblx0XHRcdFx0XCJncHVcIixcblx0XHRcdFx0XCJjcHVcIlxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBUcmFuc2Zvcm0gT3JpZ2luXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy90cmFuc2Zvcm0tb3JpZ2luXG5cdFx0XHQqL1xuXHRcdFx0XCJ0cmFuc2Zvcm0tb3JpZ2luXCI6IFt7IG9yaWdpbjogc2NhbGVQb3NpdGlvbldpdGhBcmJpdHJhcnkoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBUcmFuc2Zvcm0gU3R5bGVcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3RyYW5zZm9ybS1zdHlsZVxuXHRcdFx0Ki9cblx0XHRcdFwidHJhbnNmb3JtLXN0eWxlXCI6IFt7IHRyYW5zZm9ybTogW1wiM2RcIiwgXCJmbGF0XCJdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFRyYW5zbGF0ZVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvdHJhbnNsYXRlXG5cdFx0XHQqL1xuXHRcdFx0dHJhbnNsYXRlOiBbeyB0cmFuc2xhdGU6IHNjYWxlVHJhbnNsYXRlKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogVHJhbnNsYXRlIFhcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3RyYW5zbGF0ZVxuXHRcdFx0Ki9cblx0XHRcdFwidHJhbnNsYXRlLXhcIjogW3sgXCJ0cmFuc2xhdGUteFwiOiBzY2FsZVRyYW5zbGF0ZSgpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFRyYW5zbGF0ZSBZXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy90cmFuc2xhdGVcblx0XHRcdCovXG5cdFx0XHRcInRyYW5zbGF0ZS15XCI6IFt7IFwidHJhbnNsYXRlLXlcIjogc2NhbGVUcmFuc2xhdGUoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBUcmFuc2xhdGUgWlxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvdHJhbnNsYXRlXG5cdFx0XHQqL1xuXHRcdFx0XCJ0cmFuc2xhdGUtelwiOiBbeyBcInRyYW5zbGF0ZS16XCI6IHNjYWxlVHJhbnNsYXRlKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogVHJhbnNsYXRlIE5vbmVcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3RyYW5zbGF0ZVxuXHRcdFx0Ki9cblx0XHRcdFwidHJhbnNsYXRlLW5vbmVcIjogW1widHJhbnNsYXRlLW5vbmVcIl0sXG5cdFx0XHQvKipcblx0XHRcdCogWm9vbVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvem9vbVxuXHRcdFx0Ki9cblx0XHRcdHpvb206IFt7IHpvb206IFtcblx0XHRcdFx0aXNJbnRlZ2VyLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhbHVlXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEFjY2VudCBDb2xvclxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvYWNjZW50LWNvbG9yXG5cdFx0XHQqL1xuXHRcdFx0YWNjZW50OiBbeyBhY2NlbnQ6IHNjYWxlQ29sb3IoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBBcHBlYXJhbmNlXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9hcHBlYXJhbmNlXG5cdFx0XHQqL1xuXHRcdFx0YXBwZWFyYW5jZTogW3sgYXBwZWFyYW5jZTogW1wibm9uZVwiLCBcImF1dG9cIl0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQ2FyZXQgQ29sb3Jcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2p1c3QtaW4tdGltZS1tb2RlI2NhcmV0LWNvbG9yLXV0aWxpdGllc1xuXHRcdFx0Ki9cblx0XHRcdFwiY2FyZXQtY29sb3JcIjogW3sgY2FyZXQ6IHNjYWxlQ29sb3IoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBDb2xvciBTY2hlbWVcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL2NvbG9yLXNjaGVtZVxuXHRcdFx0Ki9cblx0XHRcdFwiY29sb3Itc2NoZW1lXCI6IFt7IHNjaGVtZTogW1xuXHRcdFx0XHRcIm5vcm1hbFwiLFxuXHRcdFx0XHRcImRhcmtcIixcblx0XHRcdFx0XCJsaWdodFwiLFxuXHRcdFx0XHRcImxpZ2h0LWRhcmtcIixcblx0XHRcdFx0XCJvbmx5LWRhcmtcIixcblx0XHRcdFx0XCJvbmx5LWxpZ2h0XCJcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogQ3Vyc29yXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9jdXJzb3Jcblx0XHRcdCovXG5cdFx0XHRjdXJzb3I6IFt7IGN1cnNvcjogW1xuXHRcdFx0XHRcImF1dG9cIixcblx0XHRcdFx0XCJkZWZhdWx0XCIsXG5cdFx0XHRcdFwicG9pbnRlclwiLFxuXHRcdFx0XHRcIndhaXRcIixcblx0XHRcdFx0XCJ0ZXh0XCIsXG5cdFx0XHRcdFwibW92ZVwiLFxuXHRcdFx0XHRcImhlbHBcIixcblx0XHRcdFx0XCJub3QtYWxsb3dlZFwiLFxuXHRcdFx0XHRcIm5vbmVcIixcblx0XHRcdFx0XCJjb250ZXh0LW1lbnVcIixcblx0XHRcdFx0XCJwcm9ncmVzc1wiLFxuXHRcdFx0XHRcImNlbGxcIixcblx0XHRcdFx0XCJjcm9zc2hhaXJcIixcblx0XHRcdFx0XCJ2ZXJ0aWNhbC10ZXh0XCIsXG5cdFx0XHRcdFwiYWxpYXNcIixcblx0XHRcdFx0XCJjb3B5XCIsXG5cdFx0XHRcdFwibm8tZHJvcFwiLFxuXHRcdFx0XHRcImdyYWJcIixcblx0XHRcdFx0XCJncmFiYmluZ1wiLFxuXHRcdFx0XHRcImFsbC1zY3JvbGxcIixcblx0XHRcdFx0XCJjb2wtcmVzaXplXCIsXG5cdFx0XHRcdFwicm93LXJlc2l6ZVwiLFxuXHRcdFx0XHRcIm4tcmVzaXplXCIsXG5cdFx0XHRcdFwiZS1yZXNpemVcIixcblx0XHRcdFx0XCJzLXJlc2l6ZVwiLFxuXHRcdFx0XHRcInctcmVzaXplXCIsXG5cdFx0XHRcdFwibmUtcmVzaXplXCIsXG5cdFx0XHRcdFwibnctcmVzaXplXCIsXG5cdFx0XHRcdFwic2UtcmVzaXplXCIsXG5cdFx0XHRcdFwic3ctcmVzaXplXCIsXG5cdFx0XHRcdFwiZXctcmVzaXplXCIsXG5cdFx0XHRcdFwibnMtcmVzaXplXCIsXG5cdFx0XHRcdFwibmVzdy1yZXNpemVcIixcblx0XHRcdFx0XCJud3NlLXJlc2l6ZVwiLFxuXHRcdFx0XHRcInpvb20taW5cIixcblx0XHRcdFx0XCJ6b29tLW91dFwiLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhcmlhYmxlLFxuXHRcdFx0XHRpc0FyYml0cmFyeVZhbHVlXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIEZpZWxkIFNpemluZ1xuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvZmllbGQtc2l6aW5nXG5cdFx0XHQqL1xuXHRcdFx0XCJmaWVsZC1zaXppbmdcIjogW3sgXCJmaWVsZC1zaXppbmdcIjogW1wiZml4ZWRcIiwgXCJjb250ZW50XCJdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFBvaW50ZXIgRXZlbnRzXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9wb2ludGVyLWV2ZW50c1xuXHRcdFx0Ki9cblx0XHRcdFwicG9pbnRlci1ldmVudHNcIjogW3sgXCJwb2ludGVyLWV2ZW50c1wiOiBbXCJhdXRvXCIsIFwibm9uZVwiXSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBSZXNpemVcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3Jlc2l6ZVxuXHRcdFx0Ki9cblx0XHRcdHJlc2l6ZTogW3sgcmVzaXplOiBbXG5cdFx0XHRcdFwibm9uZVwiLFxuXHRcdFx0XHRcIlwiLFxuXHRcdFx0XHRcInlcIixcblx0XHRcdFx0XCJ4XCJcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2Nyb2xsIEJlaGF2aW9yXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9zY3JvbGwtYmVoYXZpb3Jcblx0XHRcdCovXG5cdFx0XHRcInNjcm9sbC1iZWhhdmlvclwiOiBbeyBzY3JvbGw6IFtcImF1dG9cIiwgXCJzbW9vdGhcIl0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2Nyb2xsYmFyIFRodW1iIENvbG9yXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9zY3JvbGxiYXItY29sb3Jcblx0XHRcdCovXG5cdFx0XHRcInNjcm9sbGJhci10aHVtYi1jb2xvclwiOiBbeyBcInNjcm9sbGJhci10aHVtYlwiOiBzY2FsZUNvbG9yKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2Nyb2xsYmFyIFRyYWNrIENvbG9yXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9zY3JvbGxiYXItY29sb3Jcblx0XHRcdCovXG5cdFx0XHRcInNjcm9sbGJhci10cmFjay1jb2xvclwiOiBbeyBcInNjcm9sbGJhci10cmFja1wiOiBzY2FsZUNvbG9yKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2Nyb2xsYmFyIEd1dHRlclxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvc2Nyb2xsYmFyLWd1dHRlclxuXHRcdFx0Ki9cblx0XHRcdFwic2Nyb2xsYmFyLWd1dHRlclwiOiBbeyBcInNjcm9sbGJhci1ndXR0ZXJcIjogW1xuXHRcdFx0XHRcImF1dG9cIixcblx0XHRcdFx0XCJzdGFibGVcIixcblx0XHRcdFx0XCJib3RoXCJcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2Nyb2xsYmFyIFdpZHRoXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9zY3JvbGxiYXItd2lkdGhcblx0XHRcdCovXG5cdFx0XHRcInNjcm9sbGJhci13XCI6IFt7IHNjcm9sbGJhcjogW1xuXHRcdFx0XHRcImF1dG9cIixcblx0XHRcdFx0XCJ0aGluXCIsXG5cdFx0XHRcdFwibm9uZVwiXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFNjcm9sbCBNYXJnaW5cblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3Njcm9sbC1tYXJnaW5cblx0XHRcdCovXG5cdFx0XHRcInNjcm9sbC1tXCI6IFt7IFwic2Nyb2xsLW1cIjogc2NhbGVVbmFtYmlndW91c1NwYWNpbmcoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBTY3JvbGwgTWFyZ2luIElubGluZVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvc2Nyb2xsLW1hcmdpblxuXHRcdFx0Ki9cblx0XHRcdFwic2Nyb2xsLW14XCI6IFt7IFwic2Nyb2xsLW14XCI6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2Nyb2xsIE1hcmdpbiBCbG9ja1xuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvc2Nyb2xsLW1hcmdpblxuXHRcdFx0Ki9cblx0XHRcdFwic2Nyb2xsLW15XCI6IFt7IFwic2Nyb2xsLW15XCI6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2Nyb2xsIE1hcmdpbiBJbmxpbmUgU3RhcnRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3Njcm9sbC1tYXJnaW5cblx0XHRcdCovXG5cdFx0XHRcInNjcm9sbC1tc1wiOiBbeyBcInNjcm9sbC1tc1wiOiBzY2FsZVVuYW1iaWd1b3VzU3BhY2luZygpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFNjcm9sbCBNYXJnaW4gSW5saW5lIEVuZFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvc2Nyb2xsLW1hcmdpblxuXHRcdFx0Ki9cblx0XHRcdFwic2Nyb2xsLW1lXCI6IFt7IFwic2Nyb2xsLW1lXCI6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2Nyb2xsIE1hcmdpbiBCbG9jayBTdGFydFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvc2Nyb2xsLW1hcmdpblxuXHRcdFx0Ki9cblx0XHRcdFwic2Nyb2xsLW1ic1wiOiBbeyBcInNjcm9sbC1tYnNcIjogc2NhbGVVbmFtYmlndW91c1NwYWNpbmcoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBTY3JvbGwgTWFyZ2luIEJsb2NrIEVuZFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvc2Nyb2xsLW1hcmdpblxuXHRcdFx0Ki9cblx0XHRcdFwic2Nyb2xsLW1iZVwiOiBbeyBcInNjcm9sbC1tYmVcIjogc2NhbGVVbmFtYmlndW91c1NwYWNpbmcoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBTY3JvbGwgTWFyZ2luIFRvcFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvc2Nyb2xsLW1hcmdpblxuXHRcdFx0Ki9cblx0XHRcdFwic2Nyb2xsLW10XCI6IFt7IFwic2Nyb2xsLW10XCI6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2Nyb2xsIE1hcmdpbiBSaWdodFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvc2Nyb2xsLW1hcmdpblxuXHRcdFx0Ki9cblx0XHRcdFwic2Nyb2xsLW1yXCI6IFt7IFwic2Nyb2xsLW1yXCI6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2Nyb2xsIE1hcmdpbiBCb3R0b21cblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3Njcm9sbC1tYXJnaW5cblx0XHRcdCovXG5cdFx0XHRcInNjcm9sbC1tYlwiOiBbeyBcInNjcm9sbC1tYlwiOiBzY2FsZVVuYW1iaWd1b3VzU3BhY2luZygpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFNjcm9sbCBNYXJnaW4gTGVmdFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvc2Nyb2xsLW1hcmdpblxuXHRcdFx0Ki9cblx0XHRcdFwic2Nyb2xsLW1sXCI6IFt7IFwic2Nyb2xsLW1sXCI6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2Nyb2xsIFBhZGRpbmdcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3Njcm9sbC1wYWRkaW5nXG5cdFx0XHQqL1xuXHRcdFx0XCJzY3JvbGwtcFwiOiBbeyBcInNjcm9sbC1wXCI6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2Nyb2xsIFBhZGRpbmcgSW5saW5lXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9zY3JvbGwtcGFkZGluZ1xuXHRcdFx0Ki9cblx0XHRcdFwic2Nyb2xsLXB4XCI6IFt7IFwic2Nyb2xsLXB4XCI6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2Nyb2xsIFBhZGRpbmcgQmxvY2tcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3Njcm9sbC1wYWRkaW5nXG5cdFx0XHQqL1xuXHRcdFx0XCJzY3JvbGwtcHlcIjogW3sgXCJzY3JvbGwtcHlcIjogc2NhbGVVbmFtYmlndW91c1NwYWNpbmcoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBTY3JvbGwgUGFkZGluZyBJbmxpbmUgU3RhcnRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3Njcm9sbC1wYWRkaW5nXG5cdFx0XHQqL1xuXHRcdFx0XCJzY3JvbGwtcHNcIjogW3sgXCJzY3JvbGwtcHNcIjogc2NhbGVVbmFtYmlndW91c1NwYWNpbmcoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBTY3JvbGwgUGFkZGluZyBJbmxpbmUgRW5kXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9zY3JvbGwtcGFkZGluZ1xuXHRcdFx0Ki9cblx0XHRcdFwic2Nyb2xsLXBlXCI6IFt7IFwic2Nyb2xsLXBlXCI6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2Nyb2xsIFBhZGRpbmcgQmxvY2sgU3RhcnRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3Njcm9sbC1wYWRkaW5nXG5cdFx0XHQqL1xuXHRcdFx0XCJzY3JvbGwtcGJzXCI6IFt7IFwic2Nyb2xsLXBic1wiOiBzY2FsZVVuYW1iaWd1b3VzU3BhY2luZygpIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFNjcm9sbCBQYWRkaW5nIEJsb2NrIEVuZFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvc2Nyb2xsLXBhZGRpbmdcblx0XHRcdCovXG5cdFx0XHRcInNjcm9sbC1wYmVcIjogW3sgXCJzY3JvbGwtcGJlXCI6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2Nyb2xsIFBhZGRpbmcgVG9wXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9zY3JvbGwtcGFkZGluZ1xuXHRcdFx0Ki9cblx0XHRcdFwic2Nyb2xsLXB0XCI6IFt7IFwic2Nyb2xsLXB0XCI6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2Nyb2xsIFBhZGRpbmcgUmlnaHRcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3Njcm9sbC1wYWRkaW5nXG5cdFx0XHQqL1xuXHRcdFx0XCJzY3JvbGwtcHJcIjogW3sgXCJzY3JvbGwtcHJcIjogc2NhbGVVbmFtYmlndW91c1NwYWNpbmcoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBTY3JvbGwgUGFkZGluZyBCb3R0b21cblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3Njcm9sbC1wYWRkaW5nXG5cdFx0XHQqL1xuXHRcdFx0XCJzY3JvbGwtcGJcIjogW3sgXCJzY3JvbGwtcGJcIjogc2NhbGVVbmFtYmlndW91c1NwYWNpbmcoKSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBTY3JvbGwgUGFkZGluZyBMZWZ0XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9zY3JvbGwtcGFkZGluZ1xuXHRcdFx0Ki9cblx0XHRcdFwic2Nyb2xsLXBsXCI6IFt7IFwic2Nyb2xsLXBsXCI6IHNjYWxlVW5hbWJpZ3VvdXNTcGFjaW5nKCkgfV0sXG5cdFx0XHQvKipcblx0XHRcdCogU2Nyb2xsIFNuYXAgQWxpZ25cblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3Njcm9sbC1zbmFwLWFsaWduXG5cdFx0XHQqL1xuXHRcdFx0XCJzbmFwLWFsaWduXCI6IFt7IHNuYXA6IFtcblx0XHRcdFx0XCJzdGFydFwiLFxuXHRcdFx0XHRcImVuZFwiLFxuXHRcdFx0XHRcImNlbnRlclwiLFxuXHRcdFx0XHRcImFsaWduLW5vbmVcIlxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBTY3JvbGwgU25hcCBTdG9wXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9zY3JvbGwtc25hcC1zdG9wXG5cdFx0XHQqL1xuXHRcdFx0XCJzbmFwLXN0b3BcIjogW3sgc25hcDogW1wibm9ybWFsXCIsIFwiYWx3YXlzXCJdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFNjcm9sbCBTbmFwIFR5cGVcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3Njcm9sbC1zbmFwLXR5cGVcblx0XHRcdCovXG5cdFx0XHRcInNuYXAtdHlwZVwiOiBbeyBzbmFwOiBbXG5cdFx0XHRcdFwibm9uZVwiLFxuXHRcdFx0XHRcInhcIixcblx0XHRcdFx0XCJ5XCIsXG5cdFx0XHRcdFwiYm90aFwiXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFNjcm9sbCBTbmFwIFR5cGUgU3RyaWN0bmVzc1xuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvc2Nyb2xsLXNuYXAtdHlwZVxuXHRcdFx0Ki9cblx0XHRcdFwic25hcC1zdHJpY3RuZXNzXCI6IFt7IHNuYXA6IFtcIm1hbmRhdG9yeVwiLCBcInByb3hpbWl0eVwiXSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBUb3VjaCBBY3Rpb25cblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3RvdWNoLWFjdGlvblxuXHRcdFx0Ki9cblx0XHRcdHRvdWNoOiBbeyB0b3VjaDogW1xuXHRcdFx0XHRcImF1dG9cIixcblx0XHRcdFx0XCJub25lXCIsXG5cdFx0XHRcdFwibWFuaXB1bGF0aW9uXCJcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogVG91Y2ggQWN0aW9uIFhcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3RvdWNoLWFjdGlvblxuXHRcdFx0Ki9cblx0XHRcdFwidG91Y2gteFwiOiBbeyBcInRvdWNoLXBhblwiOiBbXG5cdFx0XHRcdFwieFwiLFxuXHRcdFx0XHRcImxlZnRcIixcblx0XHRcdFx0XCJyaWdodFwiXG5cdFx0XHRdIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFRvdWNoIEFjdGlvbiBZXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy90b3VjaC1hY3Rpb25cblx0XHRcdCovXG5cdFx0XHRcInRvdWNoLXlcIjogW3sgXCJ0b3VjaC1wYW5cIjogW1xuXHRcdFx0XHRcInlcIixcblx0XHRcdFx0XCJ1cFwiLFxuXHRcdFx0XHRcImRvd25cIlxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBUb3VjaCBBY3Rpb24gUGluY2ggWm9vbVxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvdG91Y2gtYWN0aW9uXG5cdFx0XHQqL1xuXHRcdFx0XCJ0b3VjaC1welwiOiBbXCJ0b3VjaC1waW5jaC16b29tXCJdLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFVzZXIgU2VsZWN0XG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy91c2VyLXNlbGVjdFxuXHRcdFx0Ki9cblx0XHRcdHNlbGVjdDogW3sgc2VsZWN0OiBbXG5cdFx0XHRcdFwibm9uZVwiLFxuXHRcdFx0XHRcInRleHRcIixcblx0XHRcdFx0XCJhbGxcIixcblx0XHRcdFx0XCJhdXRvXCJcblx0XHRcdF0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogV2lsbCBDaGFuZ2Vcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3dpbGwtY2hhbmdlXG5cdFx0XHQqL1xuXHRcdFx0XCJ3aWxsLWNoYW5nZVwiOiBbeyBcIndpbGwtY2hhbmdlXCI6IFtcblx0XHRcdFx0XCJhdXRvXCIsXG5cdFx0XHRcdFwic2Nyb2xsXCIsXG5cdFx0XHRcdFwiY29udGVudHNcIixcblx0XHRcdFx0XCJ0cmFuc2Zvcm1cIixcblx0XHRcdFx0aXNBcmJpdHJhcnlWYXJpYWJsZSxcblx0XHRcdFx0aXNBcmJpdHJhcnlWYWx1ZVxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBGaWxsXG5cdFx0XHQqIEBzZWUgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy9maWxsXG5cdFx0XHQqL1xuXHRcdFx0ZmlsbDogW3sgZmlsbDogW1wibm9uZVwiLCAuLi5zY2FsZUNvbG9yKCldIH1dLFxuXHRcdFx0LyoqXG5cdFx0XHQqIFN0cm9rZSBXaWR0aFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3Mvc3Ryb2tlLXdpZHRoXG5cdFx0XHQqL1xuXHRcdFx0XCJzdHJva2Utd1wiOiBbeyBzdHJva2U6IFtcblx0XHRcdFx0aXNOdW1iZXIsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5VmFyaWFibGVMZW5ndGgsXG5cdFx0XHRcdGlzQXJiaXRyYXJ5TGVuZ3RoLFxuXHRcdFx0XHRpc0FyYml0cmFyeU51bWJlclxuXHRcdFx0XSB9XSxcblx0XHRcdC8qKlxuXHRcdFx0KiBTdHJva2Vcblx0XHRcdCogQHNlZSBodHRwczovL3RhaWx3aW5kY3NzLmNvbS9kb2NzL3N0cm9rZVxuXHRcdFx0Ki9cblx0XHRcdHN0cm9rZTogW3sgc3Ryb2tlOiBbXCJub25lXCIsIC4uLnNjYWxlQ29sb3IoKV0gfV0sXG5cdFx0XHQvKipcblx0XHRcdCogRm9yY2VkIENvbG9yIEFkanVzdFxuXHRcdFx0KiBAc2VlIGh0dHBzOi8vdGFpbHdpbmRjc3MuY29tL2RvY3MvZm9yY2VkLWNvbG9yLWFkanVzdFxuXHRcdFx0Ki9cblx0XHRcdFwiZm9yY2VkLWNvbG9yLWFkanVzdFwiOiBbeyBcImZvcmNlZC1jb2xvci1hZGp1c3RcIjogW1wiYXV0b1wiLCBcIm5vbmVcIl0gfV1cblx0XHR9LFxuXHRcdGNvbmZsaWN0aW5nQ2xhc3NHcm91cHM6IHtcblx0XHRcdFwiY29udGFpbmVyLW5hbWVkXCI6IFtcImNvbnRhaW5lci10eXBlXCJdLFxuXHRcdFx0b3ZlcmZsb3c6IFtcIm92ZXJmbG93LXhcIiwgXCJvdmVyZmxvdy15XCJdLFxuXHRcdFx0b3ZlcnNjcm9sbDogW1wib3ZlcnNjcm9sbC14XCIsIFwib3ZlcnNjcm9sbC15XCJdLFxuXHRcdFx0aW5zZXQ6IFtcblx0XHRcdFx0XCJpbnNldC14XCIsXG5cdFx0XHRcdFwiaW5zZXQteVwiLFxuXHRcdFx0XHRcImluc2V0LWJzXCIsXG5cdFx0XHRcdFwiaW5zZXQtYmVcIixcblx0XHRcdFx0XCJzdGFydFwiLFxuXHRcdFx0XHRcImVuZFwiLFxuXHRcdFx0XHRcInRvcFwiLFxuXHRcdFx0XHRcInJpZ2h0XCIsXG5cdFx0XHRcdFwiYm90dG9tXCIsXG5cdFx0XHRcdFwibGVmdFwiXG5cdFx0XHRdLFxuXHRcdFx0XCJpbnNldC14XCI6IFtcInJpZ2h0XCIsIFwibGVmdFwiXSxcblx0XHRcdFwiaW5zZXQteVwiOiBbXCJ0b3BcIiwgXCJib3R0b21cIl0sXG5cdFx0XHRmbGV4OiBbXG5cdFx0XHRcdFwiYmFzaXNcIixcblx0XHRcdFx0XCJncm93XCIsXG5cdFx0XHRcdFwic2hyaW5rXCJcblx0XHRcdF0sXG5cdFx0XHRnYXA6IFtcImdhcC14XCIsIFwiZ2FwLXlcIl0sXG5cdFx0XHRwOiBbXG5cdFx0XHRcdFwicHhcIixcblx0XHRcdFx0XCJweVwiLFxuXHRcdFx0XHRcInBzXCIsXG5cdFx0XHRcdFwicGVcIixcblx0XHRcdFx0XCJwYnNcIixcblx0XHRcdFx0XCJwYmVcIixcblx0XHRcdFx0XCJwdFwiLFxuXHRcdFx0XHRcInByXCIsXG5cdFx0XHRcdFwicGJcIixcblx0XHRcdFx0XCJwbFwiXG5cdFx0XHRdLFxuXHRcdFx0cHg6IFtcInByXCIsIFwicGxcIl0sXG5cdFx0XHRweTogW1wicHRcIiwgXCJwYlwiXSxcblx0XHRcdG06IFtcblx0XHRcdFx0XCJteFwiLFxuXHRcdFx0XHRcIm15XCIsXG5cdFx0XHRcdFwibXNcIixcblx0XHRcdFx0XCJtZVwiLFxuXHRcdFx0XHRcIm1ic1wiLFxuXHRcdFx0XHRcIm1iZVwiLFxuXHRcdFx0XHRcIm10XCIsXG5cdFx0XHRcdFwibXJcIixcblx0XHRcdFx0XCJtYlwiLFxuXHRcdFx0XHRcIm1sXCJcblx0XHRcdF0sXG5cdFx0XHRteDogW1wibXJcIiwgXCJtbFwiXSxcblx0XHRcdG15OiBbXCJtdFwiLCBcIm1iXCJdLFxuXHRcdFx0c2l6ZTogW1wid1wiLCBcImhcIl0sXG5cdFx0XHRcImZvbnQtc2l6ZVwiOiBbXCJsZWFkaW5nXCJdLFxuXHRcdFx0XCJmdm4tbm9ybWFsXCI6IFtcblx0XHRcdFx0XCJmdm4tb3JkaW5hbFwiLFxuXHRcdFx0XHRcImZ2bi1zbGFzaGVkLXplcm9cIixcblx0XHRcdFx0XCJmdm4tZmlndXJlXCIsXG5cdFx0XHRcdFwiZnZuLXNwYWNpbmdcIixcblx0XHRcdFx0XCJmdm4tZnJhY3Rpb25cIlxuXHRcdFx0XSxcblx0XHRcdFwiZnZuLW9yZGluYWxcIjogW1wiZnZuLW5vcm1hbFwiXSxcblx0XHRcdFwiZnZuLXNsYXNoZWQtemVyb1wiOiBbXCJmdm4tbm9ybWFsXCJdLFxuXHRcdFx0XCJmdm4tZmlndXJlXCI6IFtcImZ2bi1ub3JtYWxcIl0sXG5cdFx0XHRcImZ2bi1zcGFjaW5nXCI6IFtcImZ2bi1ub3JtYWxcIl0sXG5cdFx0XHRcImZ2bi1mcmFjdGlvblwiOiBbXCJmdm4tbm9ybWFsXCJdLFxuXHRcdFx0XCJsaW5lLWNsYW1wXCI6IFtcImRpc3BsYXlcIiwgXCJvdmVyZmxvd1wiXSxcblx0XHRcdHJvdW5kZWQ6IFtcblx0XHRcdFx0XCJyb3VuZGVkLXNcIixcblx0XHRcdFx0XCJyb3VuZGVkLWVcIixcblx0XHRcdFx0XCJyb3VuZGVkLXRcIixcblx0XHRcdFx0XCJyb3VuZGVkLXJcIixcblx0XHRcdFx0XCJyb3VuZGVkLWJcIixcblx0XHRcdFx0XCJyb3VuZGVkLWxcIixcblx0XHRcdFx0XCJyb3VuZGVkLXNzXCIsXG5cdFx0XHRcdFwicm91bmRlZC1zZVwiLFxuXHRcdFx0XHRcInJvdW5kZWQtZWVcIixcblx0XHRcdFx0XCJyb3VuZGVkLWVzXCIsXG5cdFx0XHRcdFwicm91bmRlZC10bFwiLFxuXHRcdFx0XHRcInJvdW5kZWQtdHJcIixcblx0XHRcdFx0XCJyb3VuZGVkLWJyXCIsXG5cdFx0XHRcdFwicm91bmRlZC1ibFwiXG5cdFx0XHRdLFxuXHRcdFx0XCJyb3VuZGVkLXNcIjogW1wicm91bmRlZC1zc1wiLCBcInJvdW5kZWQtZXNcIl0sXG5cdFx0XHRcInJvdW5kZWQtZVwiOiBbXCJyb3VuZGVkLXNlXCIsIFwicm91bmRlZC1lZVwiXSxcblx0XHRcdFwicm91bmRlZC10XCI6IFtcInJvdW5kZWQtdGxcIiwgXCJyb3VuZGVkLXRyXCJdLFxuXHRcdFx0XCJyb3VuZGVkLXJcIjogW1wicm91bmRlZC10clwiLCBcInJvdW5kZWQtYnJcIl0sXG5cdFx0XHRcInJvdW5kZWQtYlwiOiBbXCJyb3VuZGVkLWJyXCIsIFwicm91bmRlZC1ibFwiXSxcblx0XHRcdFwicm91bmRlZC1sXCI6IFtcInJvdW5kZWQtdGxcIiwgXCJyb3VuZGVkLWJsXCJdLFxuXHRcdFx0XCJib3JkZXItc3BhY2luZ1wiOiBbXCJib3JkZXItc3BhY2luZy14XCIsIFwiYm9yZGVyLXNwYWNpbmcteVwiXSxcblx0XHRcdFwiYm9yZGVyLXdcIjogW1xuXHRcdFx0XHRcImJvcmRlci13LXhcIixcblx0XHRcdFx0XCJib3JkZXItdy15XCIsXG5cdFx0XHRcdFwiYm9yZGVyLXctc1wiLFxuXHRcdFx0XHRcImJvcmRlci13LWVcIixcblx0XHRcdFx0XCJib3JkZXItdy1ic1wiLFxuXHRcdFx0XHRcImJvcmRlci13LWJlXCIsXG5cdFx0XHRcdFwiYm9yZGVyLXctdFwiLFxuXHRcdFx0XHRcImJvcmRlci13LXJcIixcblx0XHRcdFx0XCJib3JkZXItdy1iXCIsXG5cdFx0XHRcdFwiYm9yZGVyLXctbFwiXG5cdFx0XHRdLFxuXHRcdFx0XCJib3JkZXItdy14XCI6IFtcImJvcmRlci13LXJcIiwgXCJib3JkZXItdy1sXCJdLFxuXHRcdFx0XCJib3JkZXItdy15XCI6IFtcImJvcmRlci13LXRcIiwgXCJib3JkZXItdy1iXCJdLFxuXHRcdFx0XCJib3JkZXItY29sb3JcIjogW1xuXHRcdFx0XHRcImJvcmRlci1jb2xvci14XCIsXG5cdFx0XHRcdFwiYm9yZGVyLWNvbG9yLXlcIixcblx0XHRcdFx0XCJib3JkZXItY29sb3Itc1wiLFxuXHRcdFx0XHRcImJvcmRlci1jb2xvci1lXCIsXG5cdFx0XHRcdFwiYm9yZGVyLWNvbG9yLWJzXCIsXG5cdFx0XHRcdFwiYm9yZGVyLWNvbG9yLWJlXCIsXG5cdFx0XHRcdFwiYm9yZGVyLWNvbG9yLXRcIixcblx0XHRcdFx0XCJib3JkZXItY29sb3ItclwiLFxuXHRcdFx0XHRcImJvcmRlci1jb2xvci1iXCIsXG5cdFx0XHRcdFwiYm9yZGVyLWNvbG9yLWxcIlxuXHRcdFx0XSxcblx0XHRcdFwiYm9yZGVyLWNvbG9yLXhcIjogW1wiYm9yZGVyLWNvbG9yLXJcIiwgXCJib3JkZXItY29sb3ItbFwiXSxcblx0XHRcdFwiYm9yZGVyLWNvbG9yLXlcIjogW1wiYm9yZGVyLWNvbG9yLXRcIiwgXCJib3JkZXItY29sb3ItYlwiXSxcblx0XHRcdHRyYW5zbGF0ZTogW1xuXHRcdFx0XHRcInRyYW5zbGF0ZS14XCIsXG5cdFx0XHRcdFwidHJhbnNsYXRlLXlcIixcblx0XHRcdFx0XCJ0cmFuc2xhdGUtbm9uZVwiXG5cdFx0XHRdLFxuXHRcdFx0XCJ0cmFuc2xhdGUtbm9uZVwiOiBbXG5cdFx0XHRcdFwidHJhbnNsYXRlXCIsXG5cdFx0XHRcdFwidHJhbnNsYXRlLXhcIixcblx0XHRcdFx0XCJ0cmFuc2xhdGUteVwiLFxuXHRcdFx0XHRcInRyYW5zbGF0ZS16XCJcblx0XHRcdF0sXG5cdFx0XHRcInNjcm9sbC1tXCI6IFtcblx0XHRcdFx0XCJzY3JvbGwtbXhcIixcblx0XHRcdFx0XCJzY3JvbGwtbXlcIixcblx0XHRcdFx0XCJzY3JvbGwtbXNcIixcblx0XHRcdFx0XCJzY3JvbGwtbWVcIixcblx0XHRcdFx0XCJzY3JvbGwtbWJzXCIsXG5cdFx0XHRcdFwic2Nyb2xsLW1iZVwiLFxuXHRcdFx0XHRcInNjcm9sbC1tdFwiLFxuXHRcdFx0XHRcInNjcm9sbC1tclwiLFxuXHRcdFx0XHRcInNjcm9sbC1tYlwiLFxuXHRcdFx0XHRcInNjcm9sbC1tbFwiXG5cdFx0XHRdLFxuXHRcdFx0XCJzY3JvbGwtbXhcIjogW1wic2Nyb2xsLW1yXCIsIFwic2Nyb2xsLW1sXCJdLFxuXHRcdFx0XCJzY3JvbGwtbXlcIjogW1wic2Nyb2xsLW10XCIsIFwic2Nyb2xsLW1iXCJdLFxuXHRcdFx0XCJzY3JvbGwtcFwiOiBbXG5cdFx0XHRcdFwic2Nyb2xsLXB4XCIsXG5cdFx0XHRcdFwic2Nyb2xsLXB5XCIsXG5cdFx0XHRcdFwic2Nyb2xsLXBzXCIsXG5cdFx0XHRcdFwic2Nyb2xsLXBlXCIsXG5cdFx0XHRcdFwic2Nyb2xsLXBic1wiLFxuXHRcdFx0XHRcInNjcm9sbC1wYmVcIixcblx0XHRcdFx0XCJzY3JvbGwtcHRcIixcblx0XHRcdFx0XCJzY3JvbGwtcHJcIixcblx0XHRcdFx0XCJzY3JvbGwtcGJcIixcblx0XHRcdFx0XCJzY3JvbGwtcGxcIlxuXHRcdFx0XSxcblx0XHRcdFwic2Nyb2xsLXB4XCI6IFtcInNjcm9sbC1wclwiLCBcInNjcm9sbC1wbFwiXSxcblx0XHRcdFwic2Nyb2xsLXB5XCI6IFtcInNjcm9sbC1wdFwiLCBcInNjcm9sbC1wYlwiXSxcblx0XHRcdHRvdWNoOiBbXG5cdFx0XHRcdFwidG91Y2gteFwiLFxuXHRcdFx0XHRcInRvdWNoLXlcIixcblx0XHRcdFx0XCJ0b3VjaC1welwiXG5cdFx0XHRdLFxuXHRcdFx0XCJ0b3VjaC14XCI6IFtcInRvdWNoXCJdLFxuXHRcdFx0XCJ0b3VjaC15XCI6IFtcInRvdWNoXCJdLFxuXHRcdFx0XCJ0b3VjaC1welwiOiBbXCJ0b3VjaFwiXVxuXHRcdH0sXG5cdFx0Y29uZmxpY3RpbmdDbGFzc0dyb3VwTW9kaWZpZXJzOiB7IFwiZm9udC1zaXplXCI6IFtcImxlYWRpbmdcIl0gfSxcblx0XHRwb3N0Zml4TG9va3VwQ2xhc3NHcm91cHM6IFtcImNvbnRhaW5lci10eXBlXCJdLFxuXHRcdG9yZGVyU2Vuc2l0aXZlTW9kaWZpZXJzOiBbXG5cdFx0XHRcIipcIixcblx0XHRcdFwiKipcIixcblx0XHRcdFwiYWZ0ZXJcIixcblx0XHRcdFwiYmFja2Ryb3BcIixcblx0XHRcdFwiYmVmb3JlXCIsXG5cdFx0XHRcImRldGFpbHMtY29udGVudFwiLFxuXHRcdFx0XCJmaWxlXCIsXG5cdFx0XHRcImZpcnN0LWxldHRlclwiLFxuXHRcdFx0XCJmaXJzdC1saW5lXCIsXG5cdFx0XHRcIm1hcmtlclwiLFxuXHRcdFx0XCJwbGFjZWhvbGRlclwiLFxuXHRcdFx0XCJzZWxlY3Rpb25cIlxuXHRcdF1cblx0fTtcbn07XG5cbi8vI2VuZHJlZ2lvblxuLy8jcmVnaW9uIHNyYy9saWIvdHctbWVyZ2UudHNcbmNvbnN0IHR3TWVyZ2UgPSBjcmVhdGVUYWlsd2luZE1lcmdlKGdldERlZmF1bHRDb25maWcpO1xuXG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBzcmMvbGliL21lcmdlLXRlbXBsYXRlLnRzXG4vKipcbiogTWF4IGRpc3RpbmN0IGludGVycG9sYXRpb24gdHVwbGVzIHJlbWVtYmVyZWQgcGVyIGNhbGwgc2l0ZS4gUmVhbCB0YWdnZWQtdGVtcGxhdGUgc2l0ZXMgY3ljbGVcbiogdGhyb3VnaCBhIHRpbnkgc2V0IG9mIGR5bmFtaWMgdmFsdWVzIChhIGJvb2xlYW4gdG9nZ2xpbmcgb25lIGNsYXNzLCBhIHNtYWxsIHZhcmlhbnQgdW5pb24pLCBzb1xuKiB0aGlzIHN0YXlzIHNtYWxsOyB0aGUgYm91bmQgb25seSBndWFyZHMgYSBzaXRlIHRoYXQgaW50ZXJwb2xhdGVzIGhpZ2gtY2FyZGluYWxpdHkgdmFsdWVzIChlLmcuIGFcbiogbGl2ZSBjb2xvcikgZnJvbSBncm93aW5nIGl0cyBwZXItc2l0ZSBsaXN0IHdpdGhvdXQgbGltaXQuXG4qL1xuY29uc3QgVEVNUExBVEVfU0lURV9DQUNIRSA9IDg7XG5jb25zdCB0ZW1wbGF0ZUNhY2hlID0gLyogQF9fUFVSRV9fICovIG5ldyBXZWFrTWFwKCk7XG5jb25zdCBtZXJnZVRlbXBsYXRlID0gKHN0cmluZ3MsIHZhbHVlcykgPT4ge1xuXHRjb25zdCB2YWx1ZUNvdW50ID0gdmFsdWVzLmxlbmd0aDtcblx0bGV0IGlzQ2FjaGVhYmxlID0gdHJ1ZTtcblx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHZhbHVlQ291bnQ7IGluZGV4KyspIHtcblx0XHRjb25zdCB2YWx1ZSA9IHZhbHVlc1tpbmRleF07XG5cdFx0aWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xuXHRcdFx0aXNDYWNoZWFibGUgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHRpZiAoaXNDYWNoZWFibGUpIHtcblx0XHRjb25zdCBlbnRyaWVzID0gdGVtcGxhdGVDYWNoZS5nZXQoc3RyaW5ncyk7XG5cdFx0aWYgKGVudHJpZXMgIT09IHZvaWQgMCkgZm9yIChsZXQgZW50cnlJbmRleCA9IDA7IGVudHJ5SW5kZXggPCBlbnRyaWVzLmxlbmd0aDsgZW50cnlJbmRleCsrKSB7XG5cdFx0XHRjb25zdCBlbnRyeSA9IGVudHJpZXNbZW50cnlJbmRleF07XG5cdFx0XHRjb25zdCBlbnRyeVZhbHVlcyA9IGVudHJ5LnZhbHVlcztcblx0XHRcdGxldCBpc01hdGNoID0gdHJ1ZTtcblx0XHRcdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB2YWx1ZUNvdW50OyBpbmRleCsrKSBpZiAoZW50cnlWYWx1ZXNbaW5kZXhdICE9PSB2YWx1ZXNbaW5kZXhdKSB7XG5cdFx0XHRcdGlzTWF0Y2ggPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpZiAoaXNNYXRjaCkgcmV0dXJuIGVudHJ5LnJlc3VsdDtcblx0XHR9XG5cdH1cblx0bGV0IGpvaW5lZCA9IHN0cmluZ3NbMF07XG5cdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB2YWx1ZUNvdW50OyBpbmRleCsrKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSB2YWx1ZXNbaW5kZXhdO1xuXHRcdGlmICh2YWx1ZSkgam9pbmVkICs9IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiA/IHZhbHVlIDogcmVzb2x2ZUNsYXNzVmFsdWUodmFsdWUpO1xuXHRcdGpvaW5lZCArPSBzdHJpbmdzW2luZGV4ICsgMV07XG5cdH1cblx0Y29uc3QgcmVzdWx0ID0gdHdNZXJnZS5tZXJnZVN0cmluZyhqb2luZWQpO1xuXHRpZiAoaXNDYWNoZWFibGUpIHtcblx0XHRsZXQgZW50cmllcyA9IHRlbXBsYXRlQ2FjaGUuZ2V0KHN0cmluZ3MpO1xuXHRcdGlmIChlbnRyaWVzID09PSB2b2lkIDApIHtcblx0XHRcdGVudHJpZXMgPSBbXTtcblx0XHRcdHRlbXBsYXRlQ2FjaGUuc2V0KHN0cmluZ3MsIGVudHJpZXMpO1xuXHRcdH1cblx0XHRpZiAoZW50cmllcy5sZW5ndGggPj0gVEVNUExBVEVfU0lURV9DQUNIRSkgZW50cmllcy5zaGlmdCgpO1xuXHRcdGVudHJpZXMucHVzaCh7XG5cdFx0XHR2YWx1ZXMsXG5cdFx0XHRyZXN1bHRcblx0XHR9KTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTtcblxuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gc3JjL2luZGV4LnRzXG5jb25zdCBJU19WOCA9ICgoKSA9PiB7XG5cdGNvbnN0IGVycm9yID0gLyogQF9fUFVSRV9fICovIG5ldyBFcnJvcigpO1xuXHRyZXR1cm4gIShcImxpbmVcIiBpbiBlcnJvcikgJiYgIShcImxpbmVOdW1iZXJcIiBpbiBlcnJvcik7XG59KSgpO1xuY29uc3QgQVJHX0NBQ0hFX0JVQ0tFVF9TSVpFID0gNjQ7XG4vKiogRmlyc3QtYXJnIGJ1Y2tldHMga2VwdCBiZWZvcmUgYSBnZW5lcmF0aW9uIHJvdGF0ZXMgaW50byBgcHJldmlvdXNBcmdDYWNoZWAuICovXG5jb25zdCBBUkdfQ0FDSEVfU0laRSA9IDUwMDtcbmxldCBhcmdDYWNoZSA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG5sZXQgcHJldmlvdXNBcmdDYWNoZSA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG5sZXQgYXJnQ2FjaGVDb3VudCA9IDA7XG5jb25zdCBtZXJnZVZhcmlhZGljQ2FjaGVkID0gKGlucHV0cykgPT4ge1xuXHRjb25zdCBsZW5ndGggPSBpbnB1dHMubGVuZ3RoO1xuXHRsZXQgZmlyc3RLZXkgPSBcIlwiO1xuXHRsZXQgZmlyc3RLZXlJbmRleCA9IC0xO1xuXHRsZXQgdHJ1dGh5U3RyaW5nQ291bnQgPSAwO1xuXHRsZXQgZXZlcnlUcnV0aHlJc1N0cmluZyA9IHRydWU7XG5cdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcblx0XHRjb25zdCBpdGVtID0gaW5wdXRzW2luZGV4XTtcblx0XHRpZiAoIWl0ZW0pIGNvbnRpbnVlO1xuXHRcdGlmICh0eXBlb2YgaXRlbSAhPT0gXCJzdHJpbmdcIikge1xuXHRcdFx0ZXZlcnlUcnV0aHlJc1N0cmluZyA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGlmIChmaXJzdEtleUluZGV4ID09PSAtMSkge1xuXHRcdFx0Zmlyc3RLZXkgPSBpdGVtO1xuXHRcdFx0Zmlyc3RLZXlJbmRleCA9IGluZGV4O1xuXHRcdH1cblx0XHR0cnV0aHlTdHJpbmdDb3VudCsrO1xuXHR9XG5cdGlmIChldmVyeVRydXRoeUlzU3RyaW5nKSB7XG5cdFx0aWYgKHRydXRoeVN0cmluZ0NvdW50ID09PSAwKSByZXR1cm4gXCJcIjtcblx0XHRpZiAodHJ1dGh5U3RyaW5nQ291bnQgPT09IDEpIHJldHVybiB0d01lcmdlLm1lcmdlU3RyaW5nKGZpcnN0S2V5KTtcblx0XHRsZXQgYnVja2V0ID0gYXJnQ2FjaGUuZ2V0KGZpcnN0S2V5KTtcblx0XHRpZiAoYnVja2V0ID09PSB2b2lkIDApIGJ1Y2tldCA9IHByZXZpb3VzQXJnQ2FjaGUuZ2V0KGZpcnN0S2V5KTtcblx0XHRpZiAoYnVja2V0ICE9PSB2b2lkIDApIGZvciAobGV0IGVudHJ5SW5kZXggPSAwOyBlbnRyeUluZGV4IDwgYnVja2V0Lmxlbmd0aDsgZW50cnlJbmRleCsrKSB7XG5cdFx0XHRjb25zdCBlbnRyeSA9IGJ1Y2tldFtlbnRyeUluZGV4XTtcblx0XHRcdGNvbnN0IHJlc3QgPSBlbnRyeS5yZXN0O1xuXHRcdFx0aWYgKHJlc3QubGVuZ3RoICE9PSB0cnV0aHlTdHJpbmdDb3VudCAtIDEpIGNvbnRpbnVlO1xuXHRcdFx0bGV0IHJlc3RJbmRleCA9IDA7XG5cdFx0XHRsZXQgaXNNYXRjaCA9IHRydWU7XG5cdFx0XHRmb3IgKGxldCBpbmRleCA9IGZpcnN0S2V5SW5kZXggKyAxOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuXHRcdFx0XHRjb25zdCBpdGVtID0gaW5wdXRzW2luZGV4XTtcblx0XHRcdFx0aWYgKCFpdGVtKSBjb250aW51ZTtcblx0XHRcdFx0aWYgKGl0ZW0gIT09IHJlc3RbcmVzdEluZGV4KytdKSB7XG5cdFx0XHRcdFx0aXNNYXRjaCA9IGZhbHNlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoaXNNYXRjaCkgcmV0dXJuIGVudHJ5LnJlc3VsdDtcblx0XHR9XG5cdFx0bGV0IGpvaW5lZCA9IGZpcnN0S2V5O1xuXHRcdGNvbnN0IHJlc3QgPSBbXTtcblx0XHRmb3IgKGxldCBpbmRleCA9IGZpcnN0S2V5SW5kZXggKyAxOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuXHRcdFx0Y29uc3QgaXRlbSA9IGlucHV0c1tpbmRleF07XG5cdFx0XHRpZiAoIWl0ZW0pIGNvbnRpbnVlO1xuXHRcdFx0am9pbmVkICs9IFwiIFwiICsgaXRlbTtcblx0XHRcdHJlc3QucHVzaChpdGVtKTtcblx0XHR9XG5cdFx0Y29uc3QgcmVzdWx0ID0gdHdNZXJnZS5tZXJnZVN0cmluZyhqb2luZWQpO1xuXHRcdGxldCB0YXJnZXQgPSBhcmdDYWNoZS5nZXQoZmlyc3RLZXkpO1xuXHRcdGlmICh0YXJnZXQgPT09IHZvaWQgMCkge1xuXHRcdFx0dGFyZ2V0ID0gW107XG5cdFx0XHRhcmdDYWNoZS5zZXQoZmlyc3RLZXksIHRhcmdldCk7XG5cdFx0fVxuXHRcdGlmICh0YXJnZXQubGVuZ3RoID49IEFSR19DQUNIRV9CVUNLRVRfU0laRSkgdGFyZ2V0LnNoaWZ0KCk7XG5cdFx0dGFyZ2V0LnB1c2goe1xuXHRcdFx0cmVzdCxcblx0XHRcdHJlc3VsdFxuXHRcdH0pO1xuXHRcdGlmICgrK2FyZ0NhY2hlQ291bnQgPiBBUkdfQ0FDSEVfU0laRSkge1xuXHRcdFx0YXJnQ2FjaGVDb3VudCA9IDA7XG5cdFx0XHRwcmV2aW91c0FyZ0NhY2hlID0gYXJnQ2FjaGU7XG5cdFx0XHRhcmdDYWNoZSA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblx0bGV0IHJlc3VsdCA9IFwiXCI7XG5cdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcblx0XHRjb25zdCBpdGVtID0gaW5wdXRzW2luZGV4XTtcblx0XHRpZiAoIWl0ZW0pIGNvbnRpbnVlO1xuXHRcdGNvbnN0IHJlc29sdmVkID0gdHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIgPyBpdGVtIDogcmVzb2x2ZUNsYXNzVmFsdWUoaXRlbSk7XG5cdFx0aWYgKHJlc29sdmVkKSB7XG5cdFx0XHRpZiAocmVzdWx0KSByZXN1bHQgKz0gXCIgXCI7XG5cdFx0XHRyZXN1bHQgKz0gcmVzb2x2ZWQ7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0d01lcmdlLm1lcmdlU3RyaW5nKHJlc3VsdCk7XG59O1xuY29uc3QgY24gPSBmdW5jdGlvbigpIHtcblx0Y29uc3QgZmlyc3QgPSBhcmd1bWVudHNbMF07XG5cdGlmIChBcnJheS5pc0FycmF5KGZpcnN0KSAmJiBcInJhd1wiIGluIGZpcnN0KSB7XG5cdFx0Y29uc3Qgc3RyaW5ncyA9IGZpcnN0O1xuXHRcdGNvbnN0IGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdFx0Y29uc3QgdmFsdWVzID0gW107XG5cdFx0Zm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykgdmFsdWVzLnB1c2goYXJndW1lbnRzW2luZGV4XSk7XG5cdFx0cmV0dXJuIG1lcmdlVGVtcGxhdGUoc3RyaW5ncywgdmFsdWVzKTtcblx0fVxuXHRjb25zdCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuXHRpZiAobGVuZ3RoID09PSAxKSByZXR1cm4gdHlwZW9mIGZpcnN0ID09PSBcInN0cmluZ1wiID8gdHdNZXJnZS5tZXJnZVN0cmluZyhmaXJzdCkgOiB0d01lcmdlLm1lcmdlU3RyaW5nKHJlc29sdmVDbGFzc1ZhbHVlKGZpcnN0KSk7XG5cdGlmIChJU19WOCkge1xuXHRcdGNvbnN0IGlucHV0cyA9IFtdO1xuXHRcdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIGlucHV0cy5wdXNoKGFyZ3VtZW50c1tpbmRleF0pO1xuXHRcdHJldHVybiBtZXJnZVZhcmlhZGljQ2FjaGVkKGlucHV0cyk7XG5cdH1cblx0bGV0IHJlc3VsdCA9IFwiXCI7XG5cdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcblx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2luZGV4XTtcblx0XHRpZiAoIWl0ZW0pIGNvbnRpbnVlO1xuXHRcdGNvbnN0IHJlc29sdmVkID0gdHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIgPyBpdGVtIDogcmVzb2x2ZUNsYXNzVmFsdWUoaXRlbSk7XG5cdFx0aWYgKHJlc29sdmVkKSB7XG5cdFx0XHRpZiAocmVzdWx0KSByZXN1bHQgKz0gXCIgXCI7XG5cdFx0XHRyZXN1bHQgKz0gcmVzb2x2ZWQ7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0d01lcmdlLm1lcmdlU3RyaW5nKHJlc3VsdCk7XG59O1xuXG4vLyNlbmRyZWdpb25cbmV4cG9ydCB7IGNsc3gsIGNuLCBjbiBhcyBkZWZhdWx0LCB0d0pvaW4sIHR3TWVyZ2UgfTsiXSwieF9nb29nbGVfaWdub3JlTGlzdCI6WzBdLCJtYXBwaW5ncyI6IjtBQUNBLElBQU0sVUFBVSxNQUFNO0FBQ3RCLElBQU0scUJBQXFCLFVBQVU7Q0FDcEMsSUFBSSxDQUFDLE9BQU8sT0FBTztDQUNuQixJQUFJLE9BQU8sVUFBVSxVQUFVLE9BQU87Q0FDdEMsSUFBSSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7Q0FDM0MsSUFBSSxTQUFTO0NBQ2IsSUFBSSxRQUFRLEtBQUssR0FBRztFQUNuQixNQUFNLFNBQVMsTUFBTTtFQUNyQixLQUFLLElBQUksUUFBUSxHQUFHLFFBQVEsUUFBUSxTQUFTO0dBQzVDLE1BQU0s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Q0FBQzs7Ozs7R0FLdEMsS0FBSyxDQUFDLEVBQUUsS0FBSyx3QkFBd0IsRUFBRSxDQUFDOzs7OztHQUt4QyxLQUFLLENBQUMsRUFBRSxLQUFLLHdCQUF3QixFQUFFLENBQUM7Ozs7O0dBS3hDLElBQUksQ0FBQyxFQUFFLElBQUksd0JBQXdCLEVBQUUsQ0FBQzs7Ozs7R0FLdEMsSUFBSSxDQUFDLEVBQUUsSUFBSSx3QkFBd0IsRUFBRSxDQUFDOzs7OztHQUt0QyxJQUFJLENBQUMsRUFBRSxJQUFJLHdCQUF3QixFQUFFLENBQUM7Ozs7O0dBS3RDLElBQUksQ0FBQyxFQUFFLElBQUksd0JBQXdCLEVBQUUsQ0FBQzs7Ozs7R0FLdEMsR0FBRyxDQUFDLEVBQUUsR0FBRyxZQUFZLEVBQUUsQ0FBQzs7Ozs7R0FLeEIsSUFBSSxDQUFDLEVBQUUsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7Ozs7R0FLMUIsSUFBSSxDQUFDLEVBQUUsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7Ozs7R0FLMUIsSUFBSSxDQUFDLEVBQUUsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7Ozs7R0FLMUIsSUFBSSxDQUFDLEVBQUUsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7Ozs7R0FLMUIsS0FBSyxDQUFDLEVBQUUsS0FBSyxZQUFZLEVBQUUsQ0FBQzs7Ozs7R0FLNUIsS0FBSyxDQUFDLEVBQUUsS0FBSyxZQUFZLEVBQUUsQ0FBQzs7Ozs7R0FLNUIsSUFBSSxDQUFDLEVBQUUsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7Ozs7R0FLMUIsSUFBSSxDQUFDLEVBQUUsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7Ozs7R0FLMUIsSUFBSSxDQUFDLEVBQUUsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7Ozs7R0FLMUIsSUFBSSxDQUFDLEVBQUUsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7Ozs7R0FLMUIsV0FBVyxDQUFDLEVBQUUsV0FBVyx3QkFBd0IsRUFBRSxDQUFDOzs7OztHQUtwRCxtQkFBbUIsQ0FBQyxpQkFBaUI7Ozs7O0dBS3JDLFdBQVcsQ0FBQyxFQUFFLFdBQVcsd0JBQXdCLEVBQUUs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
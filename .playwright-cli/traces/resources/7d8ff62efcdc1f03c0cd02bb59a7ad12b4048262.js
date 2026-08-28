//#region node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
/**
* Custom positioning reference element.
* @see https://floating-ui.com/docs/virtual-elements
*/
var sides = [
	"top",
	"right",
	"bottom",
	"left"
];
var alignments = ["start", "end"];
var placements = /*#__PURE__*/ sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
	x: v,
	y: v
});
var oppositeSideMap = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function clamp(start, value, end) {
	return max(start, min(value, end));
}
function evaluate(value, param) {
	return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
	return placement.split("-")[0];
}
function getAlignment(placement) {
	return placement.split("-")[1];
}
function getOppositeAxis(axis) {
	return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
	return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
	const firstChar = placement[0];
	return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
	return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
	if (rtl === void 0) rtl = false;
	const alignment = getAlignment(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const length = getAxisLength(alignmentAxis);
	let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
	if (rects.reference[length] > rects.floating[length]) mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
	return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
	const oppositePlacement = getOppositePlacement(placement);
	return [
		getOppositeAlignmentPlacement(placement),
		oppositePlacement,
		getOppositeAlignmentPlacement(oppositePlacement)
	];
}
function getOppositeAlignmentPlacement(placement) {
	return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
	switch (side) {
		case "top":
		case "bottom":
			if (rtl) return isStart ? rlPlacement : lrPlacement;
			return isStart ? lrPlacement : rlPlacement;
		case "left":
		case "right": return isStart ? tbPlacement : btPlacement;
		default: return [];
	}
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
	const alignment = getAlignment(placement);
	let list = getSideList(getSide(placement), direction === "start", rtl);
	if (alignment) {
		list = list.map((side) => side + "-" + alignment);
		if (flipAlignment) list = list.concat(list.map(getOppositeAlignmentPlacement));
	}
	return list;
}
function getOppositePlacement(placement) {
	const side = getSide(placement);
	return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...padding
	};
}
function getPaddingObject(padding) {
	return typeof padding !== "number" ? expandPaddingObject(padding) : {
		top: padding,
		right: padding,
		bottom: padding,
		left: padding
	};
}
function rectToClientRect(rect) {
	const { x, y, width, height } = rect;
	return {
		width,
		height,
		top: y,
		left: x,
		right: x + width,
		bottom: y + height,
		x,
		y
	};
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+core@1.7.5/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
	let { reference, floating } = _ref;
	const sideAxis = getSideAxis(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const alignLength = getAxisLength(alignmentAxis);
	const side = getSide(placement);
	const isVertical = sideAxis === "y";
	const commonX = reference.x + reference.width / 2 - floating.width / 2;
	const commonY = reference.y + reference.height / 2 - floating.height / 2;
	const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
	let coords;
	switch (side) {
		case "top":
			coords = {
				x: commonX,
				y: reference.y - floating.height
			};
			break;
		case "bottom":
			coords = {
				x: commonX,
				y: reference.y + reference.height
			};
			break;
		case "right":
			coords = {
				x: reference.x + reference.width,
				y: commonY
			};
			break;
		case "left":
			coords = {
				x: reference.x - floating.width,
				y: commonY
			};
			break;
		default: coords = {
			x: reference.x,
			y: reference.y
		};
	}
	switch (getAlignment(placement)) {
		case "start":
			coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
			break;
		case "end":
			coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
			break;
	}
	return coords;
}
/**
* Resolves with an object of overflow side offsets that determine how much the
* element is overflowing a given clipping boundary on each side.
* - positive = overflowing the boundary by that number of pixels
* - negative = how many pixels left before it will overflow
* - 0 = lies flush with the boundary
* @see https://floating-ui.com/docs/detectOverflow
*/
async function detectOverflow$1(state, options) {
	var _await$platform$isEle;
	if (options === void 0) options = {};
	const { x, y, platform, rects, elements, strategy } = state;
	const { boundary = "clippingAncestors", rootBoundary = "viewport", elementContext = "floating", altBoundary = false, padding = 0 } = evaluate(options, state);
	const paddingObject = getPaddingObject(padding);
	const element = elements[altBoundary ? elementContext === "floating" ? "reference" : "floating" : elementContext];
	const clippingClientRect = rectToClientRect(await platform.getClippingRect({
		element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating)),
		boundary,
		rootBoundary,
		strategy
	}));
	const rect = elementContext === "floating" ? {
		x,
		y,
		width: rects.floating.width,
		height: rects.floating.height
	} : rects.reference;
	const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
	const offsetScale = await (platform.isElement == null ? void 0 : platform.isElement(offsetParent)) ? await (platform.getScale == null ? void 0 : platform.getScale(offsetParent)) || {
		x: 1,
		y: 1
	} : {
		x: 1,
		y: 1
	};
	const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements,
		rect,
		offsetParent,
		strategy
	}) : rect);
	return {
		top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
		bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
		left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
		right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
	};
}
var MAX_RESET_COUNT = 50;
/**
* Computes the `x` and `y` coordinates that will place the floating element
* next to a given reference element.
*
* This export does not have any `platform` interface logic. You will need to
* write one for the platform you are using Floating UI with.
*/
var computePosition$1 = async (reference, floating, config) => {
	const { placement = "bottom", strategy = "absolute", middleware = [], platform } = config;
	const platformWithDetectOverflow = platform.detectOverflow ? platform : {
		...platform,
		detectOverflow: detectOverflow$1
	};
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
	let rects = await platform.getElementRects({
		reference,
		floating,
		strategy
	});
	let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
	let statefulPlacement = placement;
	let resetCount = 0;
	const middlewareData = {};
	for (let i = 0; i < middleware.length; i++) {
		const currentMiddleware = middleware[i];
		if (!currentMiddleware) continue;
		const { name, fn } = currentMiddleware;
		const { x: nextX, y: nextY, data, reset } = await fn({
			x,
			y,
			initialPlacement: placement,
			placement: statefulPlacement,
			strategy,
			middlewareData,
			rects,
			platform: platformWithDetectOverflow,
			elements: {
				reference,
				floating
			}
		});
		x = nextX != null ? nextX : x;
		y = nextY != null ? nextY : y;
		middlewareData[name] = {
			...middlewareData[name],
			...data
		};
		if (reset && resetCount < MAX_RESET_COUNT) {
			resetCount++;
			if (typeof reset === "object") {
				if (reset.placement) statefulPlacement = reset.placement;
				if (reset.rects) rects = reset.rects === true ? await platform.getElementRects({
					reference,
					floating,
					strategy
				}) : reset.rects;
				({x, y} = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
			}
			i = -1;
		}
	}
	return {
		x,
		y,
		placement: statefulPlacement,
		strategy,
		middlewareData
	};
};
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* @see https://floating-ui.com/docs/arrow
*/
var arrow$1 = (options) => ({
	name: "arrow",
	options,
	async fn(state) {
		const { x, y, placement, rects, platform, elements, middlewareData } = state;
		const { element, padding = 0 } = evaluate(options, state) || {};
		if (element == null) return {};
		const paddingObject = getPaddingObject(padding);
		const coords = {
			x,
			y
		};
		const axis = getAlignmentAxis(placement);
		const length = getAxisLength(axis);
		const arrowDimensions = await platform.getDimensions(element);
		const isYAxis = axis === "y";
		const minProp = isYAxis ? "top" : "left";
		const maxProp = isYAxis ? "bottom" : "right";
		const clientProp = isYAxis ? "clientHeight" : "clientWidth";
		const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
		const startDiff = coords[axis] - rects.reference[axis];
		const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
		let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
		if (!clientSize || !await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent))) clientSize = elements.floating[clientProp] || rects.floating[length];
		const centerToReference = endDiff / 2 - startDiff / 2;
		const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
		const minPadding = min(paddingObject[minProp], largestPossiblePadding);
		const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
		const min$1 = minPadding;
		const max = clientSize - arrowDimensions[length] - maxPadding;
		const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
		const offset = clamp(min$1, center, max);
		const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
		const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
		return {
			[axis]: coords[axis] + alignmentOffset,
			data: {
				[axis]: offset,
				centerOffset: center - offset - alignmentOffset,
				...shouldAddOffset && { alignmentOffset }
			},
			reset: shouldAddOffset
		};
	}
});
function getPlacementList(alignment, autoAlignment, allowedPlacements) {
	return (alignment ? [...allowedPlacements.filter((placement) => getAlignment(placement) === alignment), ...allowedPlacements.filter((placement) => getAlignment(placement) !== alignment)] : allowedPlacements.filter((placement) => getSide(placement) === placement)).filter((placement) => {
		if (alignment) return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
		return true;
	});
}
/**
* Optimizes the visibility of the floating element by choosing the placement
* that has the most space available automatically, without needing to specify a
* preferred placement. Alternative to `flip`.
* @see https://floating-ui.com/docs/autoPlacement
*/
var autoPlacement$1 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "autoPlacement",
		options,
		async fn(state) {
			var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
			const { rects, middlewareData, placement, platform, elements } = state;
			const { crossAxis = false, alignment, allowedPlacements = placements, autoAlignment = true, ...detectOverflowOptions } = evaluate(options, state);
			const placements$1 = alignment !== void 0 || allowedPlacements === placements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
			const currentPlacement = placements$1[currentIndex];
			if (currentPlacement == null) return {};
			const alignmentSides = getAlignmentSides(currentPlacement, rects, await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)));
			if (placement !== currentPlacement) return { reset: { placement: placements$1[0] } };
			const currentOverflows = [
				overflow[getSide(currentPlacement)],
				overflow[alignmentSides[0]],
				overflow[alignmentSides[1]]
			];
			const allOverflows = [...((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || [], {
				placement: currentPlacement,
				overflows: currentOverflows
			}];
			const nextPlacement = placements$1[currentIndex + 1];
			if (nextPlacement) return {
				data: {
					index: currentIndex + 1,
					overflows: allOverflows
				},
				reset: { placement: nextPlacement }
			};
			const placementsSortedByMostSpace = allOverflows.map((d) => {
				const alignment = getAlignment(d.placement);
				return [
					d.placement,
					alignment && crossAxis ? d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0) : d.overflows[0],
					d.overflows
				];
			}).sort((a, b) => a[1] - b[1]);
			const resetPlacement = ((_placementsThatFitOnE = placementsSortedByMostSpace.filter((d) => d[2].slice(0, getAlignment(d[0]) ? 2 : 3).every((v) => v <= 0))[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
			if (resetPlacement !== placement) return {
				data: {
					index: currentIndex + 1,
					overflows: allOverflows
				},
				reset: { placement: resetPlacement }
			};
			return {};
		}
	};
};
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip$1 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "flip",
		options,
		async fn(state) {
			var _middlewareData$arrow, _middlewareData$flip;
			const { placement, middlewareData, rects, initialPlacement, platform, elements } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true, fallbackPlacements: specifiedFallbackPlacements, fallbackStrategy = "bestFit", fallbackAxisSideDirection = "none", flipAlignment = true, ...detectOverflowOptions } = evaluate(options, state);
			if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			const side = getSide(placement);
			const initialSideAxis = getSideAxis(initialPlacement);
			const isBasePlacement = getSide(initialPlacement) === initialPlacement;
			const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
			const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
			const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
			if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
			const placements = [initialPlacement, ...fallbackPlacements];
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const overflows = [];
			let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
			if (checkMainAxis) overflows.push(overflow[side]);
			if (checkCrossAxis) {
				const sides = getAlignmentSides(placement, rects, rtl);
				overflows.push(overflow[sides[0]], overflow[sides[1]]);
			}
			overflowsData = [...overflowsData, {
				placement,
				overflows
			}];
			if (!overflows.every((side) => side <= 0)) {
				var _middlewareData$flip2, _overflowsData$filter;
				const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
				const nextPlacement = placements[nextIndex];
				if (nextPlacement) {
					if (!(checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false) || overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) return {
						data: {
							index: nextIndex,
							overflows: overflowsData
						},
						reset: { placement: nextPlacement }
					};
				}
				let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
				if (!resetPlacement) switch (fallbackStrategy) {
					case "bestFit": {
						var _overflowsData$filter2;
						const placement = (_overflowsData$filter2 = overflowsData.filter((d) => {
							if (hasFallbackAxisSideDirection) {
								const currentSideAxis = getSideAxis(d.placement);
								return currentSideAxis === initialSideAxis || currentSideAxis === "y";
							}
							return true;
						}).map((d) => [d.placement, d.overflows.filter((overflow) => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
						if (placement) resetPlacement = placement;
						break;
					}
					case "initialPlacement":
						resetPlacement = initialPlacement;
						break;
				}
				if (placement !== resetPlacement) return { reset: { placement: resetPlacement } };
			}
			return {};
		}
	};
};
function getSideOffsets(overflow, rect) {
	return {
		top: overflow.top - rect.height,
		right: overflow.right - rect.width,
		bottom: overflow.bottom - rect.height,
		left: overflow.left - rect.width
	};
}
function isAnySideFullyClipped(overflow) {
	return sides.some((side) => overflow[side] >= 0);
}
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
var hide$1 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "hide",
		options,
		async fn(state) {
			const { rects, platform } = state;
			const { strategy = "referenceHidden", ...detectOverflowOptions } = evaluate(options, state);
			switch (strategy) {
				case "referenceHidden": {
					const offsets = getSideOffsets(await platform.detectOverflow(state, {
						...detectOverflowOptions,
						elementContext: "reference"
					}), rects.reference);
					return { data: {
						referenceHiddenOffsets: offsets,
						referenceHidden: isAnySideFullyClipped(offsets)
					} };
				}
				case "escaped": {
					const offsets = getSideOffsets(await platform.detectOverflow(state, {
						...detectOverflowOptions,
						altBoundary: true
					}), rects.floating);
					return { data: {
						escapedOffsets: offsets,
						escaped: isAnySideFullyClipped(offsets)
					} };
				}
				default: return {};
			}
		}
	};
};
function getBoundingRect(rects) {
	const minX = min(...rects.map((rect) => rect.left));
	const minY = min(...rects.map((rect) => rect.top));
	const maxX = max(...rects.map((rect) => rect.right));
	const maxY = max(...rects.map((rect) => rect.bottom));
	return {
		x: minX,
		y: minY,
		width: maxX - minX,
		height: maxY - minY
	};
}
function getRectsByLine(rects) {
	const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
	const groups = [];
	let prevRect = null;
	for (let i = 0; i < sortedRects.length; i++) {
		const rect = sortedRects[i];
		if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) groups.push([rect]);
		else groups[groups.length - 1].push(rect);
		prevRect = rect;
	}
	return groups.map((rect) => rectToClientRect(getBoundingRect(rect)));
}
/**
* Provides improved positioning for inline reference elements that can span
* over multiple lines, such as hyperlinks or range selections.
* @see https://floating-ui.com/docs/inline
*/
var inline$1 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "inline",
		options,
		async fn(state) {
			const { placement, elements, rects, platform, strategy } = state;
			const { padding = 2, x, y } = evaluate(options, state);
			const nativeClientRects = Array.from(await (platform.getClientRects == null ? void 0 : platform.getClientRects(elements.reference)) || []);
			const clientRects = getRectsByLine(nativeClientRects);
			const fallback = rectToClientRect(getBoundingRect(nativeClientRects));
			const paddingObject = getPaddingObject(padding);
			function getBoundingClientRect() {
				if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) return clientRects.find((rect) => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
				if (clientRects.length >= 2) {
					if (getSideAxis(placement) === "y") {
						const firstRect = clientRects[0];
						const lastRect = clientRects[clientRects.length - 1];
						const isTop = getSide(placement) === "top";
						const top = firstRect.top;
						const bottom = lastRect.bottom;
						const left = isTop ? firstRect.left : lastRect.left;
						const right = isTop ? firstRect.right : lastRect.right;
						return {
							top,
							bottom,
							left,
							right,
							width: right - left,
							height: bottom - top,
							x: left,
							y: top
						};
					}
					const isLeftSide = getSide(placement) === "left";
					const maxRight = max(...clientRects.map((rect) => rect.right));
					const minLeft = min(...clientRects.map((rect) => rect.left));
					const measureRects = clientRects.filter((rect) => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
					const top = measureRects[0].top;
					const bottom = measureRects[measureRects.length - 1].bottom;
					const left = minLeft;
					const right = maxRight;
					return {
						top,
						bottom,
						left,
						right,
						width: right - left,
						height: bottom - top,
						x: left,
						y: top
					};
				}
				return fallback;
			}
			const resetRects = await platform.getElementRects({
				reference: { getBoundingClientRect },
				floating: elements.floating,
				strategy
			});
			if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) return { reset: { rects: resetRects } };
			return {};
		}
	};
};
var originSides = /*#__PURE__*/ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
	const { placement, platform, elements } = state;
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
	const side = getSide(placement);
	const alignment = getAlignment(placement);
	const isVertical = getSideAxis(placement) === "y";
	const mainAxisMulti = originSides.has(side) ? -1 : 1;
	const crossAxisMulti = rtl && isVertical ? -1 : 1;
	const rawValue = evaluate(options, state);
	let { mainAxis, crossAxis, alignmentAxis } = typeof rawValue === "number" ? {
		mainAxis: rawValue,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: rawValue.mainAxis || 0,
		crossAxis: rawValue.crossAxis || 0,
		alignmentAxis: rawValue.alignmentAxis
	};
	if (alignment && typeof alignmentAxis === "number") crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
	return isVertical ? {
		x: crossAxis * crossAxisMulti,
		y: mainAxis * mainAxisMulti
	} : {
		x: mainAxis * mainAxisMulti,
		y: crossAxis * crossAxisMulti
	};
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset$1 = function(options) {
	if (options === void 0) options = 0;
	return {
		name: "offset",
		options,
		async fn(state) {
			var _middlewareData$offse, _middlewareData$arrow;
			const { x, y, placement, middlewareData } = state;
			const diffCoords = await convertValueToCoords(state, options);
			if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			return {
				x: x + diffCoords.x,
				y: y + diffCoords.y,
				data: {
					...diffCoords,
					placement
				}
			};
		}
	};
};
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift$1 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "shift",
		options,
		async fn(state) {
			const { x, y, placement, platform } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = false, limiter = { fn: (_ref) => {
				let { x, y } = _ref;
				return {
					x,
					y
				};
			} }, ...detectOverflowOptions } = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const crossAxis = getSideAxis(getSide(placement));
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			if (checkMainAxis) {
				const minSide = mainAxis === "y" ? "top" : "left";
				const maxSide = mainAxis === "y" ? "bottom" : "right";
				const min = mainAxisCoord + overflow[minSide];
				const max = mainAxisCoord - overflow[maxSide];
				mainAxisCoord = clamp(min, mainAxisCoord, max);
			}
			if (checkCrossAxis) {
				const minSide = crossAxis === "y" ? "top" : "left";
				const maxSide = crossAxis === "y" ? "bottom" : "right";
				const min = crossAxisCoord + overflow[minSide];
				const max = crossAxisCoord - overflow[maxSide];
				crossAxisCoord = clamp(min, crossAxisCoord, max);
			}
			const limitedCoords = limiter.fn({
				...state,
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			});
			return {
				...limitedCoords,
				data: {
					x: limitedCoords.x - x,
					y: limitedCoords.y - y,
					enabled: {
						[mainAxis]: checkMainAxis,
						[crossAxis]: checkCrossAxis
					}
				}
			};
		}
	};
};
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
var limitShift$1 = function(options) {
	if (options === void 0) options = {};
	return {
		options,
		fn(state) {
			const { x, y, placement, rects, middlewareData } = state;
			const { offset = 0, mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true } = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const crossAxis = getSideAxis(placement);
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			const rawOffset = evaluate(offset, state);
			const computedOffset = typeof rawOffset === "number" ? {
				mainAxis: rawOffset,
				crossAxis: 0
			} : {
				mainAxis: 0,
				crossAxis: 0,
				...rawOffset
			};
			if (checkMainAxis) {
				const len = mainAxis === "y" ? "height" : "width";
				const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
				const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
				if (mainAxisCoord < limitMin) mainAxisCoord = limitMin;
				else if (mainAxisCoord > limitMax) mainAxisCoord = limitMax;
			}
			if (checkCrossAxis) {
				var _middlewareData$offse, _middlewareData$offse2;
				const len = mainAxis === "y" ? "width" : "height";
				const isOriginSide = originSides.has(getSide(placement));
				const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
				const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
				if (crossAxisCoord < limitMin) crossAxisCoord = limitMin;
				else if (crossAxisCoord > limitMax) crossAxisCoord = limitMax;
			}
			return {
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			};
		}
	};
};
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
var size$1 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "size",
		options,
		async fn(state) {
			var _state$middlewareData, _state$middlewareData2;
			const { placement, rects, platform, elements } = state;
			const { apply = () => {}, ...detectOverflowOptions } = evaluate(options, state);
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const side = getSide(placement);
			const alignment = getAlignment(placement);
			const isYAxis = getSideAxis(placement) === "y";
			const { width, height } = rects.floating;
			let heightSide;
			let widthSide;
			if (side === "top" || side === "bottom") {
				heightSide = side;
				widthSide = alignment === (await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
			} else {
				widthSide = side;
				heightSide = alignment === "end" ? "top" : "bottom";
			}
			const maximumClippingHeight = height - overflow.top - overflow.bottom;
			const maximumClippingWidth = width - overflow.left - overflow.right;
			const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
			const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
			const noShift = !state.middlewareData.shift;
			let availableHeight = overflowAvailableHeight;
			let availableWidth = overflowAvailableWidth;
			if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) availableWidth = maximumClippingWidth;
			if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) availableHeight = maximumClippingHeight;
			if (noShift && !alignment) {
				const xMin = max(overflow.left, 0);
				const xMax = max(overflow.right, 0);
				const yMin = max(overflow.top, 0);
				const yMax = max(overflow.bottom, 0);
				if (isYAxis) availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
				else availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
			}
			await apply({
				...state,
				availableWidth,
				availableHeight
			});
			const nextDimensions = await platform.getDimensions(elements.floating);
			if (width !== nextDimensions.width || height !== nextDimensions.height) return { reset: { rects: true } };
			return {};
		}
	};
};
//#endregion
//#region node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
	return typeof window !== "undefined";
}
function getNodeName(node) {
	if (isNode(node)) return (node.nodeName || "").toLowerCase();
	return "#document";
}
function getWindow(node) {
	var _node$ownerDocument;
	return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
	var _ref;
	return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
	if (!hasWindow()) return false;
	return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
	if (!hasWindow()) return false;
	return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
	if (!hasWindow()) return false;
	return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
	if (!hasWindow() || typeof ShadowRoot === "undefined") return false;
	return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
	const { overflow, overflowX, overflowY, display } = getComputedStyle$1(element);
	return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
	return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
	try {
		if (element.matches(":popover-open")) return true;
	} catch (_e) {}
	try {
		return element.matches(":modal");
	} catch (_e) {
		return false;
	}
}
var willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
var containRe = /paint|layout|strict|content/;
var isNotNone = (value) => !!value && value !== "none";
var isWebKitValue;
function isContainingBlock(elementOrCss) {
	const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
	return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
	let currentNode = getParentNode(element);
	while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
		if (isContainingBlock(currentNode)) return currentNode;
		else if (isTopLayer(currentNode)) return null;
		currentNode = getParentNode(currentNode);
	}
	return null;
}
function isWebKit() {
	if (isWebKitValue == null) isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
	return isWebKitValue;
}
function isLastTraversableNode(node) {
	return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
	return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
	if (isElement(element)) return {
		scrollLeft: element.scrollLeft,
		scrollTop: element.scrollTop
	};
	return {
		scrollLeft: element.scrollX,
		scrollTop: element.scrollY
	};
}
function getParentNode(node) {
	if (getNodeName(node) === "html") return node;
	const result = node.assignedSlot || node.parentNode || isShadowRoot(node) && node.host || getDocumentElement(node);
	return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
	const parentNode = getParentNode(node);
	if (isLastTraversableNode(parentNode)) return node.ownerDocument ? node.ownerDocument.body : node.body;
	if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) return parentNode;
	return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
	var _node$ownerDocument2;
	if (list === void 0) list = [];
	if (traverseIframes === void 0) traverseIframes = true;
	const scrollableAncestor = getNearestOverflowAncestor(node);
	const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
	const win = getWindow(scrollableAncestor);
	if (isBody) {
		const frameElement = getFrameElement(win);
		return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
	} else return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
	return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+dom@1.7.6/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
	const css = getComputedStyle$1(element);
	let width = parseFloat(css.width) || 0;
	let height = parseFloat(css.height) || 0;
	const hasOffset = isHTMLElement(element);
	const offsetWidth = hasOffset ? element.offsetWidth : width;
	const offsetHeight = hasOffset ? element.offsetHeight : height;
	const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
	if (shouldFallback) {
		width = offsetWidth;
		height = offsetHeight;
	}
	return {
		width,
		height,
		$: shouldFallback
	};
}
function unwrapElement(element) {
	return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
	const domElement = unwrapElement(element);
	if (!isHTMLElement(domElement)) return createCoords(1);
	const rect = domElement.getBoundingClientRect();
	const { width, height, $ } = getCssDimensions(domElement);
	let x = ($ ? round(rect.width) : rect.width) / width;
	let y = ($ ? round(rect.height) : rect.height) / height;
	if (!x || !Number.isFinite(x)) x = 1;
	if (!y || !Number.isFinite(y)) y = 1;
	return {
		x,
		y
	};
}
var noOffsets = /*#__PURE__*/ createCoords(0);
function getVisualOffsets(element) {
	const win = getWindow(element);
	if (!isWebKit() || !win.visualViewport) return noOffsets;
	return {
		x: win.visualViewport.offsetLeft,
		y: win.visualViewport.offsetTop
	};
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
	if (isFixed === void 0) isFixed = false;
	if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) return false;
	return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
	if (includeScale === void 0) includeScale = false;
	if (isFixedStrategy === void 0) isFixedStrategy = false;
	const clientRect = element.getBoundingClientRect();
	const domElement = unwrapElement(element);
	let scale = createCoords(1);
	if (includeScale) if (offsetParent) {
		if (isElement(offsetParent)) scale = getScale(offsetParent);
	} else scale = getScale(element);
	const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
	let x = (clientRect.left + visualOffsets.x) / scale.x;
	let y = (clientRect.top + visualOffsets.y) / scale.y;
	let width = clientRect.width / scale.x;
	let height = clientRect.height / scale.y;
	if (domElement) {
		const win = getWindow(domElement);
		const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
		let currentWin = win;
		let currentIFrame = getFrameElement(currentWin);
		while (currentIFrame && offsetParent && offsetWin !== currentWin) {
			const iframeScale = getScale(currentIFrame);
			const iframeRect = currentIFrame.getBoundingClientRect();
			const css = getComputedStyle$1(currentIFrame);
			const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
			const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
			x *= iframeScale.x;
			y *= iframeScale.y;
			width *= iframeScale.x;
			height *= iframeScale.y;
			x += left;
			y += top;
			currentWin = getWindow(currentIFrame);
			currentIFrame = getFrameElement(currentWin);
		}
	}
	return rectToClientRect({
		width,
		height,
		x,
		y
	});
}
function getWindowScrollBarX(element, rect) {
	const leftScroll = getNodeScroll(element).scrollLeft;
	if (!rect) return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
	return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
	const htmlRect = documentElement.getBoundingClientRect();
	return {
		x: htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect),
		y: htmlRect.top + scroll.scrollTop
	};
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
	let { elements, rect, offsetParent, strategy } = _ref;
	const isFixed = strategy === "fixed";
	const documentElement = getDocumentElement(offsetParent);
	const topLayer = elements ? isTopLayer(elements.floating) : false;
	if (offsetParent === documentElement || topLayer && isFixed) return rect;
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	let scale = createCoords(1);
	const offsets = createCoords(0);
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent);
			scale = getScale(offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		}
	}
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		width: rect.width * scale.x,
		height: rect.height * scale.y,
		x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
		y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
	};
}
function getClientRects(element) {
	return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
	const html = getDocumentElement(element);
	const scroll = getNodeScroll(element);
	const body = element.ownerDocument.body;
	const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
	const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
	let x = -scroll.scrollLeft + getWindowScrollBarX(element);
	const y = -scroll.scrollTop;
	if (getComputedStyle$1(body).direction === "rtl") x += max(html.clientWidth, body.clientWidth) - width;
	return {
		width,
		height,
		x,
		y
	};
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
	const win = getWindow(element);
	const html = getDocumentElement(element);
	const visualViewport = win.visualViewport;
	let width = html.clientWidth;
	let height = html.clientHeight;
	let x = 0;
	let y = 0;
	if (visualViewport) {
		width = visualViewport.width;
		height = visualViewport.height;
		const visualViewportBased = isWebKit();
		if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
			x = visualViewport.offsetLeft;
			y = visualViewport.offsetTop;
		}
	}
	const windowScrollbarX = getWindowScrollBarX(html);
	if (windowScrollbarX <= 0) {
		const doc = html.ownerDocument;
		const body = doc.body;
		const bodyStyles = getComputedStyle(body);
		const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
		const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
		if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) width -= clippingStableScrollbarWidth;
	} else if (windowScrollbarX <= SCROLLBAR_MAX) width += windowScrollbarX;
	return {
		width,
		height,
		x,
		y
	};
}
function getInnerBoundingClientRect(element, strategy) {
	const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
	const top = clientRect.top + element.clientTop;
	const left = clientRect.left + element.clientLeft;
	const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
	return {
		width: element.clientWidth * scale.x,
		height: element.clientHeight * scale.y,
		x: left * scale.x,
		y: top * scale.y
	};
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
	let rect;
	if (clippingAncestor === "viewport") rect = getViewportRect(element, strategy);
	else if (clippingAncestor === "document") rect = getDocumentRect(getDocumentElement(element));
	else if (isElement(clippingAncestor)) rect = getInnerBoundingClientRect(clippingAncestor, strategy);
	else {
		const visualOffsets = getVisualOffsets(element);
		rect = {
			x: clippingAncestor.x - visualOffsets.x,
			y: clippingAncestor.y - visualOffsets.y,
			width: clippingAncestor.width,
			height: clippingAncestor.height
		};
	}
	return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
	const parentNode = getParentNode(element);
	if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) return false;
	return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
	const cachedResult = cache.get(element);
	if (cachedResult) return cachedResult;
	let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
	let currentContainingBlockComputedStyle = null;
	const elementIsFixed = getComputedStyle$1(element).position === "fixed";
	let currentNode = elementIsFixed ? getParentNode(element) : element;
	while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
		const computedStyle = getComputedStyle$1(currentNode);
		const currentNodeIsContaining = isContainingBlock(currentNode);
		if (!currentNodeIsContaining && computedStyle.position === "fixed") currentContainingBlockComputedStyle = null;
		if (elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === "absolute" || currentContainingBlockComputedStyle.position === "fixed") || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode)) result = result.filter((ancestor) => ancestor !== currentNode);
		else currentContainingBlockComputedStyle = computedStyle;
		currentNode = getParentNode(currentNode);
	}
	cache.set(element, result);
	return result;
}
function getClippingRect(_ref) {
	let { element, boundary, rootBoundary, strategy } = _ref;
	const clippingAncestors = [...boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary), rootBoundary];
	const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
	let top = firstRect.top;
	let right = firstRect.right;
	let bottom = firstRect.bottom;
	let left = firstRect.left;
	for (let i = 1; i < clippingAncestors.length; i++) {
		const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
		top = max(rect.top, top);
		right = min(rect.right, right);
		bottom = min(rect.bottom, bottom);
		left = max(rect.left, left);
	}
	return {
		width: right - left,
		height: bottom - top,
		x: left,
		y: top
	};
}
function getDimensions(element) {
	const { width, height } = getCssDimensions(element);
	return {
		width,
		height
	};
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	const documentElement = getDocumentElement(offsetParent);
	const isFixed = strategy === "fixed";
	const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	const offsets = createCoords(0);
	function setLeftRTLScrollbarOffset() {
		offsets.x = getWindowScrollBarX(documentElement);
	}
	if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		} else if (documentElement) setLeftRTLScrollbarOffset();
	}
	if (isFixed && !isOffsetParentAnElement && documentElement) setLeftRTLScrollbarOffset();
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		x: rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x,
		y: rect.top + scroll.scrollTop - offsets.y - htmlOffset.y,
		width: rect.width,
		height: rect.height
	};
}
function isStaticPositioned(element) {
	return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
	if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") return null;
	if (polyfill) return polyfill(element);
	let rawOffsetParent = element.offsetParent;
	if (getDocumentElement(element) === rawOffsetParent) rawOffsetParent = rawOffsetParent.ownerDocument.body;
	return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
	const win = getWindow(element);
	if (isTopLayer(element)) return win;
	if (!isHTMLElement(element)) {
		let svgOffsetParent = getParentNode(element);
		while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
			if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) return svgOffsetParent;
			svgOffsetParent = getParentNode(svgOffsetParent);
		}
		return win;
	}
	let offsetParent = getTrueOffsetParent(element, polyfill);
	while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) offsetParent = getTrueOffsetParent(offsetParent, polyfill);
	if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) return win;
	return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
	const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
	const getDimensionsFn = this.getDimensions;
	const floatingDimensions = await getDimensionsFn(data.floating);
	return {
		reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
		floating: {
			x: 0,
			y: 0,
			width: floatingDimensions.width,
			height: floatingDimensions.height
		}
	};
};
function isRTL(element) {
	return getComputedStyle$1(element).direction === "rtl";
}
var platform = {
	convertOffsetParentRelativeRectToViewportRelativeRect,
	getDocumentElement,
	getClippingRect,
	getOffsetParent,
	getElementRects,
	getClientRects,
	getDimensions,
	getScale,
	isElement,
	isRTL
};
function rectsAreEqual(a, b) {
	return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
	let io = null;
	let timeoutId;
	const root = getDocumentElement(element);
	function cleanup() {
		var _io;
		clearTimeout(timeoutId);
		(_io = io) == null || _io.disconnect();
		io = null;
	}
	function refresh(skip, threshold) {
		if (skip === void 0) skip = false;
		if (threshold === void 0) threshold = 1;
		cleanup();
		const elementRectForRootMargin = element.getBoundingClientRect();
		const { left, top, width, height } = elementRectForRootMargin;
		if (!skip) onMove();
		if (!width || !height) return;
		const insetTop = floor(top);
		const insetRight = floor(root.clientWidth - (left + width));
		const insetBottom = floor(root.clientHeight - (top + height));
		const insetLeft = floor(left);
		const options = {
			rootMargin: -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px",
			threshold: max(0, min(1, threshold)) || 1
		};
		let isFirstUpdate = true;
		function handleObserve(entries) {
			const ratio = entries[0].intersectionRatio;
			if (ratio !== threshold) {
				if (!isFirstUpdate) return refresh();
				if (!ratio) timeoutId = setTimeout(() => {
					refresh(false, 1e-7);
				}, 1e3);
				else refresh(false, ratio);
			}
			if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) refresh();
			isFirstUpdate = false;
		}
		try {
			io = new IntersectionObserver(handleObserve, {
				...options,
				root: root.ownerDocument
			});
		} catch (_e) {
			io = new IntersectionObserver(handleObserve, options);
		}
		io.observe(element);
	}
	refresh(true);
	return cleanup;
}
/**
* Automatically updates the position of the floating element when necessary.
* Should only be called when the floating element is mounted on the DOM or
* visible on the screen.
* @returns cleanup function that should be invoked when the floating element is
* removed from the DOM or hidden from the screen.
* @see https://floating-ui.com/docs/autoUpdate
*/
function autoUpdate(reference, floating, update, options) {
	if (options === void 0) options = {};
	const { ancestorScroll = true, ancestorResize = true, elementResize = typeof ResizeObserver === "function", layoutShift = typeof IntersectionObserver === "function", animationFrame = false } = options;
	const referenceEl = unwrapElement(reference);
	const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
	ancestors.forEach((ancestor) => {
		ancestorScroll && ancestor.addEventListener("scroll", update, { passive: true });
		ancestorResize && ancestor.addEventListener("resize", update);
	});
	const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
	let reobserveFrame = -1;
	let resizeObserver = null;
	if (elementResize) {
		resizeObserver = new ResizeObserver((_ref) => {
			let [firstEntry] = _ref;
			if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
				resizeObserver.unobserve(floating);
				cancelAnimationFrame(reobserveFrame);
				reobserveFrame = requestAnimationFrame(() => {
					var _resizeObserver;
					(_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
				});
			}
			update();
		});
		if (referenceEl && !animationFrame) resizeObserver.observe(referenceEl);
		if (floating) resizeObserver.observe(floating);
	}
	let frameId;
	let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
	if (animationFrame) frameLoop();
	function frameLoop() {
		const nextRefRect = getBoundingClientRect(reference);
		if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) update();
		prevRefRect = nextRefRect;
		frameId = requestAnimationFrame(frameLoop);
	}
	update();
	return () => {
		var _resizeObserver2;
		ancestors.forEach((ancestor) => {
			ancestorScroll && ancestor.removeEventListener("scroll", update);
			ancestorResize && ancestor.removeEventListener("resize", update);
		});
		cleanupIo?.();
		(_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
		resizeObserver = null;
		if (animationFrame) cancelAnimationFrame(frameId);
	};
}
/**
* Resolves with an object of overflow side offsets that determine how much the
* element is overflowing a given clipping boundary on each side.
* - positive = overflowing the boundary by that number of pixels
* - negative = how many pixels left before it will overflow
* - 0 = lies flush with the boundary
* @see https://floating-ui.com/docs/detectOverflow
*/
var detectOverflow = detectOverflow$1;
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset = offset$1;
/**
* Optimizes the visibility of the floating element by choosing the placement
* that has the most space available automatically, without needing to specify a
* preferred placement. Alternative to `flip`.
* @see https://floating-ui.com/docs/autoPlacement
*/
var autoPlacement = autoPlacement$1;
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift = shift$1;
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip = flip$1;
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
var size = size$1;
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
var hide = hide$1;
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* @see https://floating-ui.com/docs/arrow
*/
var arrow = arrow$1;
/**
* Provides improved positioning for inline reference elements that can span
* over multiple lines, such as hyperlinks or range selections.
* @see https://floating-ui.com/docs/inline
*/
var inline = inline$1;
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
var limitShift = limitShift$1;
/**
* Computes the `x` and `y` coordinates that will place the floating element
* next to a given reference element.
*/
var computePosition = (reference, floating, options) => {
	const cache = /* @__PURE__ */ new Map();
	const mergedOptions = {
		platform,
		...options
	};
	const platformWithCache = {
		...mergedOptions.platform,
		_c: cache
	};
	return computePosition$1(reference, floating, {
		...mergedOptions,
		platform: platformWithCache
	});
};
//#endregion
export { arrow, autoPlacement, autoUpdate, computePosition, detectOverflow, flip, getOverflowAncestors, hide, inline, limitShift, offset, platform, shift, size };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQGZsb2F0aW5nLXVpX2RvbS5qcyIsIm5hbWVzIjpbImRldGVjdE92ZXJmbG93IiwiY29tcHV0ZVBvc2l0aW9uIiwiYXJyb3ciLCJhdXRvUGxhY2VtZW50IiwiZmxpcCIsImhpZGUiLCJpbmxpbmUiLCJvZmZzZXQiLCJzaGlmdCIsImxpbWl0U2hpZnQiLCJzaXplIiwiZ2V0Q29tcHV0ZWRTdHlsZSJdLCJzb3VyY2VzIjpbIi4uLy4uLy5wbnBtL0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTEvbm9kZV9tb2R1bGVzL0BmbG9hdGluZy11aS91dGlscy9kaXN0L2Zsb2F0aW5nLXVpLnV0aWxzLm1qcyIsIi4uLy4uLy5wbnBtL0BmbG9hdGluZy11aStjb3JlQDEuNy41L25vZGVfbW9kdWxlcy9AZmxvYXRpbmctdWkvY29yZS9kaXN0L2Zsb2F0aW5nLXVpLmNvcmUubWpzIiwiLi4vLi4vLnBucG0vQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMS9ub2RlX21vZHVsZXMvQGZsb2F0aW5nLXVpL3V0aWxzL2Rpc3QvZmxvYXRpbmctdWkudXRpbHMuZG9tLm1qcyIsIi4uLy4uLy5wbnBtL0BmbG9hdGluZy11aStkb21AMS43LjYvbm9kZV9tb2R1bGVzL0BmbG9hdGluZy11aS9kb20vZGlzdC9mbG9hdGluZy11aS5kb20ubWpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3VzdG9tIHBvc2l0aW9uaW5nIHJlZmVyZW5jZSBlbGVtZW50LlxuICogQHNlZSBodHRwczovL2Zsb2F0aW5nLXVpLmNvbS9kb2NzL3ZpcnR1YWwtZWxlbWVudHNcbiAqL1xuXG5jb25zdCBzaWRlcyA9IFsndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0J107XG5jb25zdCBhbGlnbm1lbnRzID0gWydzdGFydCcsICdlbmQnXTtcbmNvbnN0IHBsYWNlbWVudHMgPSAvKiNfX1BVUkVfXyovc2lkZXMucmVkdWNlKChhY2MsIHNpZGUpID0+IGFjYy5jb25jYXQoc2lkZSwgc2lkZSArIFwiLVwiICsgYWxpZ25tZW50c1swXSwgc2lkZSArIFwiLVwiICsgYWxpZ25tZW50c1sxXSksIFtdKTtcbmNvbnN0IG1pbiA9IE1hdGgubWluO1xuY29uc3QgbWF4ID0gTWF0aC5tYXg7XG5jb25zdCByb3VuZCA9IE1hdGgucm91bmQ7XG5jb25zdCBmbG9vciA9IE1hdGguZmxvb3I7XG5jb25zdCBjcmVhdGVDb29yZHMgPSB2ID0+ICh7XG4gIHg6IHYsXG4gIHk6IHZcbn0pO1xuY29uc3Qgb3Bwb3NpdGVTaWRlTWFwID0ge1xuICBsZWZ0OiAncmlnaHQnLFxuICByaWdodDogJ2xlZnQnLFxuICBib3R0b206ICd0b3AnLFxuICB0b3A6ICdib3R0b20nXG59O1xuZnVuY3Rpb24gY2xhbXAoc3RhcnQsIHZhbHVlLCBlbmQpIHtcbiAgcmV0dXJuIG1heChzdGFydCwgbWluKHZhbHVlLCBlbmQpKTtcbn1cbmZ1bmN0aW9uIGV2YWx1YXRlKHZhbHVlLCBwYXJhbSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nID8gdmFsdWUocGFyYW0pIDogdmFsdWU7XG59XG5mdW5jdGlvbiBnZXRTaWRlKHBsYWNlbWVudCkge1xuICByZXR1cm4gcGxhY2VtZW50LnNwbGl0KCctJylbMF07XG59XG5mdW5jdGlvbiBnZXRBbGlnbm1lbnQocGxhY2VtZW50KSB7XG4gIHJldHVybiBwbGFjZW1lbnQuc3BsaXQoJy0nKVsxXTtcbn1cbmZ1bmN0aW9uIGdldE9wcG9zaXRlQXhpcyhheGlzKSB7XG4gIHJldHVybiBheGlzID09PSAneCcgPyAneScgOiAneCc7XG59XG5mdW5jdGlvbiBnZXRBeGlzTGVuZ3RoKGF4aXMpIHtcbiAgcmV0dXJuIGF4aXMgPT09ICd5JyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbn1cbmZ1bmN0aW9uIGdldFNpZGVBeGlzKHBsYWNlbWVudCkge1xuICBjb25zdCBmaXJzdENoYXIgPSBwbGFjZW1lbnRbMF07XG4gIHJldHVybiBmaXJzdENoYXIgPT09ICd0JyB8fCBmaXJzdENoYXIgPT09ICdiJyA/ICd5JyA6ICd4Jztcbn1cbmZ1bmN0aW9uIGdldEFsaWdubWVudEF4aXMocGxhY2VtZW50KSB7XG4gIHJldHVybiBnZXRPcHBvc2l0ZUF4aXMoZ2V0U2lkZUF4aXMocGxhY2VtZW50KSk7XG59XG5mdW5jdGlvbiBnZXRBbGlnbm1lbnRTaWRlcyhwbGFjZW1lbnQsIHJlY3RzLCBydGwpIHtcbiAgaWYgKHJ0bCA9PT0gdm9pZCAwKSB7XG4gICAgcnRsID0gZmFsc2U7XG4gIH1cbiAgY29uc3QgYWxpZ25tZW50ID0gZ2V0QWxpZ25tZW50KHBsYWNlbWVudCk7XG4gIGNvbnN0IGFsaWdubWVudEF4aXMgPSBnZXRBbGlnbm1lbnRBeGlzKHBsYWNlbWVudCk7XG4gIGNvbnN0IGxlbmd0aCA9IGdldEF4aXNMZW5ndGgoYWxpZ25tZW50QXhpcyk7XG4gIGxldCBtYWluQWxpZ25tZW50U2lkZSA9IGFsaWdubWVudEF4aXMgPT09ICd4JyA/IGFsaWdubWVudCA9PT0gKHJ0bCA/ICdlbmQnIDogJ3N0YXJ0JykgPyAncmlnaHQnIDogJ2xlZnQnIDogYWxpZ25tZW50ID09PSAnc3RhcnQnID8gJ2JvdHRvbScgOiAndG9wJztcbiAgaWYgKHJlY3RzLnJlZmVyZW5jZVtsZW5ndGhdID4gcmVjdHMuZmxvYXRpbmdbbGVuZ3RoXSkge1xuICAgIG1haW5BbGlnbm1lbnRTaWRlID0gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQobWFpbkFsaWdubWVudFNpZGUpO1xuICB9XG4gIHJldHVybiBbbWFpbkFsaWdubWVudFNpZGUsIGdldE9wcG9zaXRlUGxhY2VtZW50KG1haW5BbGlnbm1lbnRTaWRlKV07XG59XG5mdW5jdGlvbiBnZXRFeHBhbmRlZFBsYWNlbWVudHMocGxhY2VtZW50KSB7XG4gIGNvbnN0IG9wcG9zaXRlUGxhY2VtZW50ID0gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQocGxhY2VtZW50KTtcbiAgcmV0dXJuIFtnZXRPcHBvc2l0ZUFsaWdubWVudFBsYWNlbWVudChwbGFjZW1lbnQpLCBvcHBvc2l0ZVBsYWNlbWVudCwgZ2V0T3Bwb3NpdGVBbGlnbm1lbnRQbGFjZW1lbnQob3Bwb3NpdGVQbGFjZW1lbnQpXTtcbn1cbmZ1bmN0aW9uIGdldE9wcG9zaXRlQWxpZ25tZW50UGxhY2VtZW50KHBsYWNlbWVudCkge1xuICByZXR1cm4gcGxhY2VtZW50LmluY2x1ZGVzKCdzdGFydCcpID8gcGxhY2VtZW50LnJlcGxhY2UoJ3N0YXJ0JywgJ2VuZCcpIDogcGxhY2VtZW50LnJlcGxhY2UoJ2VuZCcsICdzdGFydCcpO1xufVxuY29uc3QgbHJQbGFjZW1lbnQgPSBbJ2xlZnQnLCAncmlnaHQnXTtcbmNvbnN0IHJsUGxhY2VtZW50ID0gWydyaWdodCcsICdsZWZ0J107XG5jb25zdCB0YlBsYWNlbWVudCA9IFsndG9wJywgJ2JvdHRvbSddO1xuY29uc3QgYnRQbGFjZW1lbnQgPSBbJ2JvdHRvbScsICd0b3AnXTtcbmZ1bmN0aW9uIGdldFNpZGVMaXN0KHNpZGUsIGlzU3RhcnQsIHJ0bCkge1xuICBzd2l0Y2ggKHNpZGUpIHtcbiAgICBjYXNlICd0b3AnOlxuICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICBpZiAocnRsKSByZXR1cm4gaXNTdGFydCA/IHJsUGxhY2VtZW50IDogbHJQbGFjZW1lbnQ7XG4gICAgICByZXR1cm4gaXNTdGFydCA/IGxyUGxhY2VtZW50IDogcmxQbGFjZW1lbnQ7XG4gICAgY2FzZSAnbGVmdCc6XG4gICAgY2FzZSAncmlnaHQnOlxuICAgICAgcmV0dXJuIGlzU3RhcnQgPyB0YlBsYWNlbWVudCA6IGJ0UGxhY2VtZW50O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gW107XG4gIH1cbn1cbmZ1bmN0aW9uIGdldE9wcG9zaXRlQXhpc1BsYWNlbWVudHMocGxhY2VtZW50LCBmbGlwQWxpZ25tZW50LCBkaXJlY3Rpb24sIHJ0bCkge1xuICBjb25zdCBhbGlnbm1lbnQgPSBnZXRBbGlnbm1lbnQocGxhY2VtZW50KTtcbiAgbGV0IGxpc3QgPSBnZXRTaWRlTGlzdChnZXRTaWRlKHBsYWNlbWVudCksIGRpcmVjdGlvbiA9PT0gJ3N0YXJ0JywgcnRsKTtcbiAgaWYgKGFsaWdubWVudCkge1xuICAgIGxpc3QgPSBsaXN0Lm1hcChzaWRlID0+IHNpZGUgKyBcIi1cIiArIGFsaWdubWVudCk7XG4gICAgaWYgKGZsaXBBbGlnbm1lbnQpIHtcbiAgICAgIGxpc3QgPSBsaXN0LmNvbmNhdChsaXN0Lm1hcChnZXRPcHBvc2l0ZUFsaWdubWVudFBsYWNlbWVudCkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbGlzdDtcbn1cbmZ1bmN0aW9uIGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICBjb25zdCBzaWRlID0gZ2V0U2lkZShwbGFjZW1lbnQpO1xuICByZXR1cm4gb3Bwb3NpdGVTaWRlTWFwW3NpZGVdICsgcGxhY2VtZW50LnNsaWNlKHNpZGUubGVuZ3RoKTtcbn1cbmZ1bmN0aW9uIGV4cGFuZFBhZGRpbmdPYmplY3QocGFkZGluZykge1xuICByZXR1cm4ge1xuICAgIHRvcDogMCxcbiAgICByaWdodDogMCxcbiAgICBib3R0b206IDAsXG4gICAgbGVmdDogMCxcbiAgICAuLi5wYWRkaW5nXG4gIH07XG59XG5mdW5jdGlvbiBnZXRQYWRkaW5nT2JqZWN0KHBhZGRpbmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBwYWRkaW5nICE9PSAnbnVtYmVyJyA/IGV4cGFuZFBhZGRpbmdPYmplY3QocGFkZGluZykgOiB7XG4gICAgdG9wOiBwYWRkaW5nLFxuICAgIHJpZ2h0OiBwYWRkaW5nLFxuICAgIGJvdHRvbTogcGFkZGluZyxcbiAgICBsZWZ0OiBwYWRkaW5nXG4gIH07XG59XG5mdW5jdGlvbiByZWN0VG9DbGllbnRSZWN0KHJlY3QpIHtcbiAgY29uc3Qge1xuICAgIHgsXG4gICAgeSxcbiAgICB3aWR0aCxcbiAgICBoZWlnaHRcbiAgfSA9IHJlY3Q7XG4gIHJldHVybiB7XG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIHRvcDogeSxcbiAgICBsZWZ0OiB4LFxuICAgIHJpZ2h0OiB4ICsgd2lkdGgsXG4gICAgYm90dG9tOiB5ICsgaGVpZ2h0LFxuICAgIHgsXG4gICAgeVxuICB9O1xufVxuXG5leHBvcnQgeyBhbGlnbm1lbnRzLCBjbGFtcCwgY3JlYXRlQ29vcmRzLCBldmFsdWF0ZSwgZXhwYW5kUGFkZGluZ09iamVjdCwgZmxvb3IsIGdldEFsaWdubWVudCwgZ2V0QWxpZ25tZW50QXhpcywgZ2V0QWxpZ25tZW50U2lkZXMsIGdldEF4aXNMZW5ndGgsIGdldEV4cGFuZGVkUGxhY2VtZW50cywgZ2V0T3Bwb3NpdGVBbGlnbm1lbnRQbGFjZW1lbnQsIGdldE9wcG9zaXRlQXhpcywgZ2V0T3Bwb3NpdGVBeGlzUGxhY2VtZW50cywgZ2V0T3Bwb3NpdGVQbGFjZW1lbnQsIGdldFBhZGRpbmdPYmplY3QsIGdldFNpZGUsIGdldFNpZGVBeGlzLCBtYXgsIG1pbiwgcGxhY2VtZW50cywgcmVjdFRvQ2xpZW50UmVjdCwgcm91bmQsIHNpZGVzIH07XG4iLCJpbXBvcnQgeyBnZXRTaWRlQXhpcywgZ2V0QWxpZ25tZW50QXhpcywgZ2V0QXhpc0xlbmd0aCwgZ2V0U2lkZSwgZ2V0QWxpZ25tZW50LCBldmFsdWF0ZSwgZ2V0UGFkZGluZ09iamVjdCwgcmVjdFRvQ2xpZW50UmVjdCwgbWluLCBjbGFtcCwgcGxhY2VtZW50cywgZ2V0QWxpZ25tZW50U2lkZXMsIGdldE9wcG9zaXRlQWxpZ25tZW50UGxhY2VtZW50LCBnZXRPcHBvc2l0ZVBsYWNlbWVudCwgZ2V0RXhwYW5kZWRQbGFjZW1lbnRzLCBnZXRPcHBvc2l0ZUF4aXNQbGFjZW1lbnRzLCBzaWRlcywgbWF4LCBnZXRPcHBvc2l0ZUF4aXMgfSBmcm9tICdAZmxvYXRpbmctdWkvdXRpbHMnO1xuZXhwb3J0IHsgcmVjdFRvQ2xpZW50UmVjdCB9IGZyb20gJ0BmbG9hdGluZy11aS91dGlscyc7XG5cbmZ1bmN0aW9uIGNvbXB1dGVDb29yZHNGcm9tUGxhY2VtZW50KF9yZWYsIHBsYWNlbWVudCwgcnRsKSB7XG4gIGxldCB7XG4gICAgcmVmZXJlbmNlLFxuICAgIGZsb2F0aW5nXG4gIH0gPSBfcmVmO1xuICBjb25zdCBzaWRlQXhpcyA9IGdldFNpZGVBeGlzKHBsYWNlbWVudCk7XG4gIGNvbnN0IGFsaWdubWVudEF4aXMgPSBnZXRBbGlnbm1lbnRBeGlzKHBsYWNlbWVudCk7XG4gIGNvbnN0IGFsaWduTGVuZ3RoID0gZ2V0QXhpc0xlbmd0aChhbGlnbm1lbnRBeGlzKTtcbiAgY29uc3Qgc2lkZSA9IGdldFNpZGUocGxhY2VtZW50KTtcbiAgY29uc3QgaXNWZXJ0aWNhbCA9IHNpZGVBeGlzID09PSAneSc7XG4gIGNvbnN0IGNvbW1vblggPSByZWZlcmVuY2UueCArIHJlZmVyZW5jZS53aWR0aCAvIDIgLSBmbG9hdGluZy53aWR0aCAvIDI7XG4gIGNvbnN0IGNvbW1vblkgPSByZWZlcmVuY2UueSArIHJlZmVyZW5jZS5oZWlnaHQgLyAyIC0gZmxvYXRpbmcuaGVpZ2h0IC8gMjtcbiAgY29uc3QgY29tbW9uQWxpZ24gPSByZWZlcmVuY2VbYWxpZ25MZW5ndGhdIC8gMiAtIGZsb2F0aW5nW2FsaWduTGVuZ3RoXSAvIDI7XG4gIGxldCBjb29yZHM7XG4gIHN3aXRjaCAoc2lkZSkge1xuICAgIGNhc2UgJ3RvcCc6XG4gICAgICBjb29yZHMgPSB7XG4gICAgICAgIHg6IGNvbW1vblgsXG4gICAgICAgIHk6IHJlZmVyZW5jZS55IC0gZmxvYXRpbmcuaGVpZ2h0XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYm90dG9tJzpcbiAgICAgIGNvb3JkcyA9IHtcbiAgICAgICAgeDogY29tbW9uWCxcbiAgICAgICAgeTogcmVmZXJlbmNlLnkgKyByZWZlcmVuY2UuaGVpZ2h0XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncmlnaHQnOlxuICAgICAgY29vcmRzID0ge1xuICAgICAgICB4OiByZWZlcmVuY2UueCArIHJlZmVyZW5jZS53aWR0aCxcbiAgICAgICAgeTogY29tbW9uWVxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgY29vcmRzID0ge1xuICAgICAgICB4OiByZWZlcmVuY2UueCAtIGZsb2F0aW5nLndpZHRoLFxuICAgICAgICB5OiBjb21tb25ZXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGNvb3JkcyA9IHtcbiAgICAgICAgeDogcmVmZXJlbmNlLngsXG4gICAgICAgIHk6IHJlZmVyZW5jZS55XG4gICAgICB9O1xuICB9XG4gIHN3aXRjaCAoZ2V0QWxpZ25tZW50KHBsYWNlbWVudCkpIHtcbiAgICBjYXNlICdzdGFydCc6XG4gICAgICBjb29yZHNbYWxpZ25tZW50QXhpc10gLT0gY29tbW9uQWxpZ24gKiAocnRsICYmIGlzVmVydGljYWwgPyAtMSA6IDEpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZW5kJzpcbiAgICAgIGNvb3Jkc1thbGlnbm1lbnRBeGlzXSArPSBjb21tb25BbGlnbiAqIChydGwgJiYgaXNWZXJ0aWNhbCA/IC0xIDogMSk7XG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4gY29vcmRzO1xufVxuXG4vKipcbiAqIFJlc29sdmVzIHdpdGggYW4gb2JqZWN0IG9mIG92ZXJmbG93IHNpZGUgb2Zmc2V0cyB0aGF0IGRldGVybWluZSBob3cgbXVjaCB0aGVcbiAqIGVsZW1lbnQgaXMgb3ZlcmZsb3dpbmcgYSBnaXZlbiBjbGlwcGluZyBib3VuZGFyeSBvbiBlYWNoIHNpZGUuXG4gKiAtIHBvc2l0aXZlID0gb3ZlcmZsb3dpbmcgdGhlIGJvdW5kYXJ5IGJ5IHRoYXQgbnVtYmVyIG9mIHBpeGVsc1xuICogLSBuZWdhdGl2ZSA9IGhvdyBtYW55IHBpeGVscyBsZWZ0IGJlZm9yZSBpdCB3aWxsIG92ZXJmbG93XG4gKiAtIDAgPSBsaWVzIGZsdXNoIHdpdGggdGhlIGJvdW5kYXJ5XG4gKiBAc2VlIGh0dHBzOi8vZmxvYXRpbmctdWkuY29tL2RvY3MvZGV0ZWN0T3ZlcmZsb3dcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIG9wdGlvbnMpIHtcbiAgdmFyIF9hd2FpdCRwbGF0Zm9ybSRpc0VsZTtcbiAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBjb25zdCB7XG4gICAgeCxcbiAgICB5LFxuICAgIHBsYXRmb3JtLFxuICAgIHJlY3RzLFxuICAgIGVsZW1lbnRzLFxuICAgIHN0cmF0ZWd5XG4gIH0gPSBzdGF0ZTtcbiAgY29uc3Qge1xuICAgIGJvdW5kYXJ5ID0gJ2NsaXBwaW5nQW5jZXN0b3JzJyxcbiAgICByb290Qm91bmRhcnkgPSAndmlld3BvcnQnLFxuICAgIGVsZW1lbnRDb250ZXh0ID0gJ2Zsb2F0aW5nJyxcbiAgICBhbHRCb3VuZGFyeSA9IGZhbHNlLFxuICAgIHBhZGRpbmcgPSAwXG4gIH0gPSBldmFsdWF0ZShvcHRpb25zLCBzdGF0ZSk7XG4gIGNvbnN0IHBhZGRpbmdPYmplY3QgPSBnZXRQYWRkaW5nT2JqZWN0KHBhZGRpbmcpO1xuICBjb25zdCBhbHRDb250ZXh0ID0gZWxlbWVudENvbnRleHQgPT09ICdmbG9hdGluZycgPyAncmVmZXJlbmNlJyA6ICdmbG9hdGluZyc7XG4gIGNvbnN0IGVsZW1lbnQgPSBlbGVtZW50c1thbHRCb3VuZGFyeSA/IGFsdENvbnRleHQgOiBlbGVtZW50Q29udGV4dF07XG4gIGNvbnN0IGNsaXBwaW5nQ2xpZW50UmVjdCA9IHJlY3RUb0NsaWVudFJlY3QoYXdhaXQgcGxhdGZvcm0uZ2V0Q2xpcHBpbmdSZWN0KHtcbiAgICBlbGVtZW50OiAoKF9hd2FpdCRwbGF0Zm9ybSRpc0VsZSA9IGF3YWl0IChwbGF0Zm9ybS5pc0VsZW1lbnQgPT0gbnVsbCA/IHZvaWQgMCA6IHBsYXRmb3JtLmlzRWxlbWVudChlbGVtZW50KSkpICE9IG51bGwgPyBfYXdhaXQkcGxhdGZvcm0kaXNFbGUgOiB0cnVlKSA/IGVsZW1lbnQgOiBlbGVtZW50LmNvbnRleHRFbGVtZW50IHx8IChhd2FpdCAocGxhdGZvcm0uZ2V0RG9jdW1lbnRFbGVtZW50ID09IG51bGwgPyB2b2lkIDAgOiBwbGF0Zm9ybS5nZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudHMuZmxvYXRpbmcpKSksXG4gICAgYm91bmRhcnksXG4gICAgcm9vdEJvdW5kYXJ5LFxuICAgIHN0cmF0ZWd5XG4gIH0pKTtcbiAgY29uc3QgcmVjdCA9IGVsZW1lbnRDb250ZXh0ID09PSAnZmxvYXRpbmcnID8ge1xuICAgIHgsXG4gICAgeSxcbiAgICB3aWR0aDogcmVjdHMuZmxvYXRpbmcud2lkdGgsXG4gICAgaGVpZ2h0OiByZWN0cy5mbG9hdGluZy5oZWlnaHRcbiAgfSA6IHJlY3RzLnJlZmVyZW5jZTtcbiAgY29uc3Qgb2Zmc2V0UGFyZW50ID0gYXdhaXQgKHBsYXRmb3JtLmdldE9mZnNldFBhcmVudCA9PSBudWxsID8gdm9pZCAwIDogcGxhdGZvcm0uZ2V0T2Zmc2V0UGFyZW50KGVsZW1lbnRzLmZsb2F0aW5nKSk7XG4gIGNvbnN0IG9mZnNldFNjYWxlID0gKGF3YWl0IChwbGF0Zm9ybS5pc0VsZW1lbnQgPT0gbnVsbCA/IHZvaWQgMCA6IHBsYXRmb3JtLmlzRWxlbWVudChvZmZzZXRQYXJlbnQpKSkgPyAoYXdhaXQgKHBsYXRmb3JtLmdldFNjYWxlID09IG51bGwgPyB2b2lkIDAgOiBwbGF0Zm9ybS5nZXRTY2FsZShvZmZzZXRQYXJlbnQpKSkgfHwge1xuICAgIHg6IDEsXG4gICAgeTogMVxuICB9IDoge1xuICAgIHg6IDEsXG4gICAgeTogMVxuICB9O1xuICBjb25zdCBlbGVtZW50Q2xpZW50UmVjdCA9IHJlY3RUb0NsaWVudFJlY3QocGxhdGZvcm0uY29udmVydE9mZnNldFBhcmVudFJlbGF0aXZlUmVjdFRvVmlld3BvcnRSZWxhdGl2ZVJlY3QgPyBhd2FpdCBwbGF0Zm9ybS5jb252ZXJ0T2Zmc2V0UGFyZW50UmVsYXRpdmVSZWN0VG9WaWV3cG9ydFJlbGF0aXZlUmVjdCh7XG4gICAgZWxlbWVudHMsXG4gICAgcmVjdCxcbiAgICBvZmZzZXRQYXJlbnQsXG4gICAgc3RyYXRlZ3lcbiAgfSkgOiByZWN0KTtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IChjbGlwcGluZ0NsaWVudFJlY3QudG9wIC0gZWxlbWVudENsaWVudFJlY3QudG9wICsgcGFkZGluZ09iamVjdC50b3ApIC8gb2Zmc2V0U2NhbGUueSxcbiAgICBib3R0b206IChlbGVtZW50Q2xpZW50UmVjdC5ib3R0b20gLSBjbGlwcGluZ0NsaWVudFJlY3QuYm90dG9tICsgcGFkZGluZ09iamVjdC5ib3R0b20pIC8gb2Zmc2V0U2NhbGUueSxcbiAgICBsZWZ0OiAoY2xpcHBpbmdDbGllbnRSZWN0LmxlZnQgLSBlbGVtZW50Q2xpZW50UmVjdC5sZWZ0ICsgcGFkZGluZ09iamVjdC5sZWZ0KSAvIG9mZnNldFNjYWxlLngsXG4gICAgcmlnaHQ6IChlbGVtZW50Q2xpZW50UmVjdC5yaWdodCAtIGNsaXBwaW5nQ2xpZW50UmVjdC5yaWdodCArIHBhZGRpbmdPYmplY3QucmlnaHQpIC8gb2Zmc2V0U2NhbGUueFxuICB9O1xufVxuXG4vLyBNYXhpbXVtIG51bWJlciBvZiByZXNldHMgdGhhdCBjYW4gb2NjdXIgYmVmb3JlIGJhaWxpbmcgdG8gYXZvaWQgaW5maW5pdGUgcmVzZXQgbG9vcHMuXG5jb25zdCBNQVhfUkVTRVRfQ09VTlQgPSA1MDtcblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgYHhgIGFuZCBgeWAgY29vcmRpbmF0ZXMgdGhhdCB3aWxsIHBsYWNlIHRoZSBmbG9hdGluZyBlbGVtZW50XG4gKiBuZXh0IHRvIGEgZ2l2ZW4gcmVmZXJlbmNlIGVsZW1lbnQuXG4gKlxuICogVGhpcyBleHBvcnQgZG9lcyBub3QgaGF2ZSBhbnkgYHBsYXRmb3JtYCBpbnRlcmZhY2UgbG9naWMuIFlvdSB3aWxsIG5lZWQgdG9cbiAqIHdyaXRlIG9uZSBmb3IgdGhlIHBsYXRmb3JtIHlvdSBhcmUgdXNpbmcgRmxvYXRpbmcgVUkgd2l0aC5cbiAqL1xuY29uc3QgY29tcHV0ZVBvc2l0aW9uID0gYXN5bmMgKHJlZmVyZW5jZSwgZmxvYXRpbmcsIGNvbmZpZykgPT4ge1xuICBjb25zdCB7XG4gICAgcGxhY2VtZW50ID0gJ2JvdHRvbScsXG4gICAgc3RyYXRlZ3kgPSAnYWJzb2x1dGUnLFxuICAgIG1pZGRsZXdhcmUgPSBbXSxcbiAgICBwbGF0Zm9ybVxuICB9ID0gY29uZmlnO1xuICBjb25zdCBwbGF0Zm9ybVdpdGhEZXRlY3RPdmVyZmxvdyA9IHBsYXRmb3JtLmRldGVjdE92ZXJmbG93ID8gcGxhdGZvcm0gOiB7XG4gICAgLi4ucGxhdGZvcm0sXG4gICAgZGV0ZWN0T3ZlcmZsb3dcbiAgfTtcbiAgY29uc3QgcnRsID0gYXdhaXQgKHBsYXRmb3JtLmlzUlRMID09IG51bGwgPyB2b2lkIDAgOiBwbGF0Zm9ybS5pc1JUTChmbG9hdGluZykpO1xuICBsZXQgcmVjdHMgPSBhd2FpdCBwbGF0Zm9ybS5nZXRFbGVtZW50UmVjdHMoe1xuICAgIHJlZmVyZW5jZSxcbiAgICBmbG9hdGluZyxcbiAgICBzdHJhdGVneVxuICB9KTtcbiAgbGV0IHtcbiAgICB4LFxuICAgIHlcbiAgfSA9IGNvbXB1dGVDb29yZHNGcm9tUGxhY2VtZW50KHJlY3RzLCBwbGFjZW1lbnQsIHJ0bCk7XG4gIGxldCBzdGF0ZWZ1bFBsYWNlbWVudCA9IHBsYWNlbWVudDtcbiAgbGV0IHJlc2V0Q291bnQgPSAwO1xuICBjb25zdCBtaWRkbGV3YXJlRGF0YSA9IHt9O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG1pZGRsZXdhcmUubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjdXJyZW50TWlkZGxld2FyZSA9IG1pZGRsZXdhcmVbaV07XG4gICAgaWYgKCFjdXJyZW50TWlkZGxld2FyZSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGNvbnN0IHtcbiAgICAgIG5hbWUsXG4gICAgICBmblxuICAgIH0gPSBjdXJyZW50TWlkZGxld2FyZTtcbiAgICBjb25zdCB7XG4gICAgICB4OiBuZXh0WCxcbiAgICAgIHk6IG5leHRZLFxuICAgICAgZGF0YSxcbiAgICAgIHJlc2V0XG4gICAgfSA9IGF3YWl0IGZuKHtcbiAgICAgIHgsXG4gICAgICB5LFxuICAgICAgaW5pdGlhbFBsYWNlbWVudDogcGxhY2VtZW50LFxuICAgICAgcGxhY2VtZW50OiBzdGF0ZWZ1bFBsYWNlbWVudCxcbiAgICAgIHN0cmF0ZWd5LFxuICAgICAgbWlkZGxld2FyZURhdGEsXG4gICAgICByZWN0cyxcbiAgICAgIHBsYXRmb3JtOiBwbGF0Zm9ybVdpdGhEZXRlY3RPdmVyZmxvdyxcbiAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgIHJlZmVyZW5jZSxcbiAgICAgICAgZmxvYXRpbmdcbiAgICAgIH1cbiAgICB9KTtcbiAgICB4ID0gbmV4dFggIT0gbnVsbCA/IG5leHRYIDogeDtcbiAgICB5ID0gbmV4dFkgIT0gbnVsbCA/IG5leHRZIDogeTtcbiAgICBtaWRkbGV3YXJlRGF0YVtuYW1lXSA9IHtcbiAgICAgIC4uLm1pZGRsZXdhcmVEYXRhW25hbWVdLFxuICAgICAgLi4uZGF0YVxuICAgIH07XG4gICAgaWYgKHJlc2V0ICYmIHJlc2V0Q291bnQgPCBNQVhfUkVTRVRfQ09VTlQpIHtcbiAgICAgIHJlc2V0Q291bnQrKztcbiAgICAgIGlmICh0eXBlb2YgcmVzZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChyZXNldC5wbGFjZW1lbnQpIHtcbiAgICAgICAgICBzdGF0ZWZ1bFBsYWNlbWVudCA9IHJlc2V0LnBsYWNlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzZXQucmVjdHMpIHtcbiAgICAgICAgICByZWN0cyA9IHJlc2V0LnJlY3RzID09PSB0cnVlID8gYXdhaXQgcGxhdGZvcm0uZ2V0RWxlbWVudFJlY3RzKHtcbiAgICAgICAgICAgIHJlZmVyZW5jZSxcbiAgICAgICAgICAgIGZsb2F0aW5nLFxuICAgICAgICAgICAgc3RyYXRlZ3lcbiAgICAgICAgICB9KSA6IHJlc2V0LnJlY3RzO1xuICAgICAgICB9XG4gICAgICAgICh7XG4gICAgICAgICAgeCxcbiAgICAgICAgICB5XG4gICAgICAgIH0gPSBjb21wdXRlQ29vcmRzRnJvbVBsYWNlbWVudChyZWN0cywgc3RhdGVmdWxQbGFjZW1lbnQsIHJ0bCkpO1xuICAgICAgfVxuICAgICAgaSA9IC0xO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIHgsXG4gICAgeSxcbiAgICBwbGFjZW1lbnQ6IHN0YXRlZnVsUGxhY2VtZW50LFxuICAgIHN0cmF0ZWd5LFxuICAgIG1pZGRsZXdhcmVEYXRhXG4gIH07XG59O1xuXG4vKipcbiAqIFByb3ZpZGVzIGRhdGEgdG8gcG9zaXRpb24gYW4gaW5uZXIgZWxlbWVudCBvZiB0aGUgZmxvYXRpbmcgZWxlbWVudCBzbyB0aGF0IGl0XG4gKiBhcHBlYXJzIGNlbnRlcmVkIHRvIHRoZSByZWZlcmVuY2UgZWxlbWVudC5cbiAqIEBzZWUgaHR0cHM6Ly9mbG9hdGluZy11aS5jb20vZG9jcy9hcnJvd1xuICovXG5jb25zdCBhcnJvdyA9IG9wdGlvbnMgPT4gKHtcbiAgbmFtZTogJ2Fycm93JyxcbiAgb3B0aW9ucyxcbiAgYXN5bmMgZm4oc3RhdGUpIHtcbiAgICBjb25zdCB7XG4gICAgICB4LFxuICAgICAgeSxcbiAgICAgIHBsYWNlbWVudCxcbiAgICAgIHJlY3RzLFxuICAgICAgcGxhdGZvcm0sXG4gICAgICBlbGVtZW50cyxcbiAgICAgIG1pZGRsZXdhcmVEYXRhXG4gICAgfSA9IHN0YXRlO1xuICAgIC8vIFNpbmNlIGBlbGVtZW50YCBpcyByZXF1aXJlZCwgd2UgZG9uJ3QgUGFydGlhbDw+IHRoZSB0eXBlLlxuICAgIGNvbnN0IHtcbiAgICAgIGVsZW1lbnQsXG4gICAgICBwYWRkaW5nID0gMFxuICAgIH0gPSBldmFsdWF0ZShvcHRpb25zLCBzdGF0ZSkgfHwge307XG4gICAgaWYgKGVsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICBjb25zdCBwYWRkaW5nT2JqZWN0ID0gZ2V0UGFkZGluZ09iamVjdChwYWRkaW5nKTtcbiAgICBjb25zdCBjb29yZHMgPSB7XG4gICAgICB4LFxuICAgICAgeVxuICAgIH07XG4gICAgY29uc3QgYXhpcyA9IGdldEFsaWdubWVudEF4aXMocGxhY2VtZW50KTtcbiAgICBjb25zdCBsZW5ndGggPSBnZXRBeGlzTGVuZ3RoKGF4aXMpO1xuICAgIGNvbnN0IGFycm93RGltZW5zaW9ucyA9IGF3YWl0IHBsYXRmb3JtLmdldERpbWVuc2lvbnMoZWxlbWVudCk7XG4gICAgY29uc3QgaXNZQXhpcyA9IGF4aXMgPT09ICd5JztcbiAgICBjb25zdCBtaW5Qcm9wID0gaXNZQXhpcyA/ICd0b3AnIDogJ2xlZnQnO1xuICAgIGNvbnN0IG1heFByb3AgPSBpc1lBeGlzID8gJ2JvdHRvbScgOiAncmlnaHQnO1xuICAgIGNvbnN0IGNsaWVudFByb3AgPSBpc1lBeGlzID8gJ2NsaWVudEhlaWdodCcgOiAnY2xpZW50V2lkdGgnO1xuICAgIGNvbnN0IGVuZERpZmYgPSByZWN0cy5yZWZlcmVuY2VbbGVuZ3RoXSArIHJlY3RzLnJlZmVyZW5jZVtheGlzXSAtIGNvb3Jkc1theGlzXSAtIHJlY3RzLmZsb2F0aW5nW2xlbmd0aF07XG4gICAgY29uc3Qgc3RhcnREaWZmID0gY29vcmRzW2F4aXNdIC0gcmVjdHMucmVmZXJlbmNlW2F4aXNdO1xuICAgIGNvbnN0IGFycm93T2Zmc2V0UGFyZW50ID0gYXdhaXQgKHBsYXRmb3JtLmdldE9mZnNldFBhcmVudCA9PSBudWxsID8gdm9pZCAwIDogcGxhdGZvcm0uZ2V0T2Zmc2V0UGFyZW50KGVsZW1lbnQpKTtcbiAgICBsZXQgY2xpZW50U2l6ZSA9IGFycm93T2Zmc2V0UGFyZW50ID8gYXJyb3dPZmZzZXRQYXJlbnRbY2xpZW50UHJvcF0gOiAwO1xuXG4gICAgLy8gRE9NIHBsYXRmb3JtIGNhbiByZXR1cm4gYHdpbmRvd2AgYXMgdGhlIGBvZmZzZXRQYXJlbnRgLlxuICAgIGlmICghY2xpZW50U2l6ZSB8fCAhKGF3YWl0IChwbGF0Zm9ybS5pc0VsZW1lbnQgPT0gbnVsbCA/IHZvaWQgMCA6IHBsYXRmb3JtLmlzRWxlbWVudChhcnJvd09mZnNldFBhcmVudCkpKSkge1xuICAgICAgY2xpZW50U2l6ZSA9IGVsZW1lbnRzLmZsb2F0aW5nW2NsaWVudFByb3BdIHx8IHJlY3RzLmZsb2F0aW5nW2xlbmd0aF07XG4gICAgfVxuICAgIGNvbnN0IGNlbnRlclRvUmVmZXJlbmNlID0gZW5kRGlmZiAvIDIgLSBzdGFydERpZmYgLyAyO1xuXG4gICAgLy8gSWYgdGhlIHBhZGRpbmcgaXMgbGFyZ2UgZW5vdWdoIHRoYXQgaXQgY2F1c2VzIHRoZSBhcnJvdyB0byBubyBsb25nZXIgYmVcbiAgICAvLyBjZW50ZXJlZCwgbW9kaWZ5IHRoZSBwYWRkaW5nIHNvIHRoYXQgaXQgaXMgY2VudGVyZWQuXG4gICAgY29uc3QgbGFyZ2VzdFBvc3NpYmxlUGFkZGluZyA9IGNsaWVudFNpemUgLyAyIC0gYXJyb3dEaW1lbnNpb25zW2xlbmd0aF0gLyAyIC0gMTtcbiAgICBjb25zdCBtaW5QYWRkaW5nID0gbWluKHBhZGRpbmdPYmplY3RbbWluUHJvcF0sIGxhcmdlc3RQb3NzaWJsZVBhZGRpbmcpO1xuICAgIGNvbnN0IG1heFBhZGRpbmcgPSBtaW4ocGFkZGluZ09iamVjdFttYXhQcm9wXSwgbGFyZ2VzdFBvc3NpYmxlUGFkZGluZyk7XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlIGFycm93IGRvZXNuJ3Qgb3ZlcmZsb3cgdGhlIGZsb2F0aW5nIGVsZW1lbnQgaWYgdGhlIGNlbnRlclxuICAgIC8vIHBvaW50IGlzIG91dHNpZGUgdGhlIGZsb2F0aW5nIGVsZW1lbnQncyBib3VuZHMuXG4gICAgY29uc3QgbWluJDEgPSBtaW5QYWRkaW5nO1xuICAgIGNvbnN0IG1heCA9IGNsaWVudFNpemUgLSBhcnJvd0RpbWVuc2lvbnNbbGVuZ3RoXSAtIG1heFBhZGRpbmc7XG4gICAgY29uc3QgY2VudGVyID0gY2xpZW50U2l6ZSAvIDIgLSBhcnJvd0RpbWVuc2lvbnNbbGVuZ3RoXSAvIDIgKyBjZW50ZXJUb1JlZmVyZW5jZTtcbiAgICBjb25zdCBvZmZzZXQgPSBjbGFtcChtaW4kMSwgY2VudGVyLCBtYXgpO1xuXG4gICAgLy8gSWYgdGhlIHJlZmVyZW5jZSBpcyBzbWFsbCBlbm91Z2ggdGhhdCB0aGUgYXJyb3cncyBwYWRkaW5nIGNhdXNlcyBpdCB0b1xuICAgIC8vIHRvIHBvaW50IHRvIG5vdGhpbmcgZm9yIGFuIGFsaWduZWQgcGxhY2VtZW50LCBhZGp1c3QgdGhlIG9mZnNldCBvZiB0aGVcbiAgICAvLyBmbG9hdGluZyBlbGVtZW50IGl0c2VsZi4gVG8gZW5zdXJlIGBzaGlmdCgpYCBjb250aW51ZXMgdG8gdGFrZSBhY3Rpb24sXG4gICAgLy8gYSBzaW5nbGUgcmVzZXQgaXMgcGVyZm9ybWVkIHdoZW4gdGhpcyBpcyB0cnVlLlxuICAgIGNvbnN0IHNob3VsZEFkZE9mZnNldCA9ICFtaWRkbGV3YXJlRGF0YS5hcnJvdyAmJiBnZXRBbGlnbm1lbnQocGxhY2VtZW50KSAhPSBudWxsICYmIGNlbnRlciAhPT0gb2Zmc2V0ICYmIHJlY3RzLnJlZmVyZW5jZVtsZW5ndGhdIC8gMiAtIChjZW50ZXIgPCBtaW4kMSA/IG1pblBhZGRpbmcgOiBtYXhQYWRkaW5nKSAtIGFycm93RGltZW5zaW9uc1tsZW5ndGhdIC8gMiA8IDA7XG4gICAgY29uc3QgYWxpZ25tZW50T2Zmc2V0ID0gc2hvdWxkQWRkT2Zmc2V0ID8gY2VudGVyIDwgbWluJDEgPyBjZW50ZXIgLSBtaW4kMSA6IGNlbnRlciAtIG1heCA6IDA7XG4gICAgcmV0dXJuIHtcbiAgICAgIFtheGlzXTogY29vcmRzW2F4aXNdICsgYWxpZ25tZW50T2Zmc2V0LFxuICAgICAgZGF0YToge1xuICAgICAgICBbYXhpc106IG9mZnNldCxcbiAgICAgICAgY2VudGVyT2Zmc2V0OiBjZW50ZXIgLSBvZmZzZXQgLSBhbGlnbm1lbnRPZmZzZXQsXG4gICAgICAgIC4uLihzaG91bGRBZGRPZmZzZXQgJiYge1xuICAgICAgICAgIGFsaWdubWVudE9mZnNldFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHJlc2V0OiBzaG91bGRBZGRPZmZzZXRcbiAgICB9O1xuICB9XG59KTtcblxuZnVuY3Rpb24gZ2V0UGxhY2VtZW50TGlzdChhbGlnbm1lbnQsIGF1dG9BbGlnbm1lbnQsIGFsbG93ZWRQbGFjZW1lbnRzKSB7XG4gIGNvbnN0IGFsbG93ZWRQbGFjZW1lbnRzU29ydGVkQnlBbGlnbm1lbnQgPSBhbGlnbm1lbnQgPyBbLi4uYWxsb3dlZFBsYWNlbWVudHMuZmlsdGVyKHBsYWNlbWVudCA9PiBnZXRBbGlnbm1lbnQocGxhY2VtZW50KSA9PT0gYWxpZ25tZW50KSwgLi4uYWxsb3dlZFBsYWNlbWVudHMuZmlsdGVyKHBsYWNlbWVudCA9PiBnZXRBbGlnbm1lbnQocGxhY2VtZW50KSAhPT0gYWxpZ25tZW50KV0gOiBhbGxvd2VkUGxhY2VtZW50cy5maWx0ZXIocGxhY2VtZW50ID0+IGdldFNpZGUocGxhY2VtZW50KSA9PT0gcGxhY2VtZW50KTtcbiAgcmV0dXJuIGFsbG93ZWRQbGFjZW1lbnRzU29ydGVkQnlBbGlnbm1lbnQuZmlsdGVyKHBsYWNlbWVudCA9PiB7XG4gICAgaWYgKGFsaWdubWVudCkge1xuICAgICAgcmV0dXJuIGdldEFsaWdubWVudChwbGFjZW1lbnQpID09PSBhbGlnbm1lbnQgfHwgKGF1dG9BbGlnbm1lbnQgPyBnZXRPcHBvc2l0ZUFsaWdubWVudFBsYWNlbWVudChwbGFjZW1lbnQpICE9PSBwbGFjZW1lbnQgOiBmYWxzZSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9KTtcbn1cbi8qKlxuICogT3B0aW1pemVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBmbG9hdGluZyBlbGVtZW50IGJ5IGNob29zaW5nIHRoZSBwbGFjZW1lbnRcbiAqIHRoYXQgaGFzIHRoZSBtb3N0IHNwYWNlIGF2YWlsYWJsZSBhdXRvbWF0aWNhbGx5LCB3aXRob3V0IG5lZWRpbmcgdG8gc3BlY2lmeSBhXG4gKiBwcmVmZXJyZWQgcGxhY2VtZW50LiBBbHRlcm5hdGl2ZSB0byBgZmxpcGAuXG4gKiBAc2VlIGh0dHBzOi8vZmxvYXRpbmctdWkuY29tL2RvY3MvYXV0b1BsYWNlbWVudFxuICovXG5jb25zdCBhdXRvUGxhY2VtZW50ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICByZXR1cm4ge1xuICAgIG5hbWU6ICdhdXRvUGxhY2VtZW50JyxcbiAgICBvcHRpb25zLFxuICAgIGFzeW5jIGZuKHN0YXRlKSB7XG4gICAgICB2YXIgX21pZGRsZXdhcmVEYXRhJGF1dG9QLCBfbWlkZGxld2FyZURhdGEkYXV0b1AyLCBfcGxhY2VtZW50c1RoYXRGaXRPbkU7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHJlY3RzLFxuICAgICAgICBtaWRkbGV3YXJlRGF0YSxcbiAgICAgICAgcGxhY2VtZW50LFxuICAgICAgICBwbGF0Zm9ybSxcbiAgICAgICAgZWxlbWVudHNcbiAgICAgIH0gPSBzdGF0ZTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY3Jvc3NBeGlzID0gZmFsc2UsXG4gICAgICAgIGFsaWdubWVudCxcbiAgICAgICAgYWxsb3dlZFBsYWNlbWVudHMgPSBwbGFjZW1lbnRzLFxuICAgICAgICBhdXRvQWxpZ25tZW50ID0gdHJ1ZSxcbiAgICAgICAgLi4uZGV0ZWN0T3ZlcmZsb3dPcHRpb25zXG4gICAgICB9ID0gZXZhbHVhdGUob3B0aW9ucywgc3RhdGUpO1xuICAgICAgY29uc3QgcGxhY2VtZW50cyQxID0gYWxpZ25tZW50ICE9PSB1bmRlZmluZWQgfHwgYWxsb3dlZFBsYWNlbWVudHMgPT09IHBsYWNlbWVudHMgPyBnZXRQbGFjZW1lbnRMaXN0KGFsaWdubWVudCB8fCBudWxsLCBhdXRvQWxpZ25tZW50LCBhbGxvd2VkUGxhY2VtZW50cykgOiBhbGxvd2VkUGxhY2VtZW50cztcbiAgICAgIGNvbnN0IG92ZXJmbG93ID0gYXdhaXQgcGxhdGZvcm0uZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIGRldGVjdE92ZXJmbG93T3B0aW9ucyk7XG4gICAgICBjb25zdCBjdXJyZW50SW5kZXggPSAoKF9taWRkbGV3YXJlRGF0YSRhdXRvUCA9IG1pZGRsZXdhcmVEYXRhLmF1dG9QbGFjZW1lbnQpID09IG51bGwgPyB2b2lkIDAgOiBfbWlkZGxld2FyZURhdGEkYXV0b1AuaW5kZXgpIHx8IDA7XG4gICAgICBjb25zdCBjdXJyZW50UGxhY2VtZW50ID0gcGxhY2VtZW50cyQxW2N1cnJlbnRJbmRleF07XG4gICAgICBpZiAoY3VycmVudFBsYWNlbWVudCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFsaWdubWVudFNpZGVzID0gZ2V0QWxpZ25tZW50U2lkZXMoY3VycmVudFBsYWNlbWVudCwgcmVjdHMsIGF3YWl0IChwbGF0Zm9ybS5pc1JUTCA9PSBudWxsID8gdm9pZCAwIDogcGxhdGZvcm0uaXNSVEwoZWxlbWVudHMuZmxvYXRpbmcpKSk7XG5cbiAgICAgIC8vIE1ha2UgYGNvbXB1dGVDb29yZHNgIHN0YXJ0IGZyb20gdGhlIHJpZ2h0IHBsYWNlLlxuICAgICAgaWYgKHBsYWNlbWVudCAhPT0gY3VycmVudFBsYWNlbWVudCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHJlc2V0OiB7XG4gICAgICAgICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudHMkMVswXVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRPdmVyZmxvd3MgPSBbb3ZlcmZsb3dbZ2V0U2lkZShjdXJyZW50UGxhY2VtZW50KV0sIG92ZXJmbG93W2FsaWdubWVudFNpZGVzWzBdXSwgb3ZlcmZsb3dbYWxpZ25tZW50U2lkZXNbMV1dXTtcbiAgICAgIGNvbnN0IGFsbE92ZXJmbG93cyA9IFsuLi4oKChfbWlkZGxld2FyZURhdGEkYXV0b1AyID0gbWlkZGxld2FyZURhdGEuYXV0b1BsYWNlbWVudCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9taWRkbGV3YXJlRGF0YSRhdXRvUDIub3ZlcmZsb3dzKSB8fCBbXSksIHtcbiAgICAgICAgcGxhY2VtZW50OiBjdXJyZW50UGxhY2VtZW50LFxuICAgICAgICBvdmVyZmxvd3M6IGN1cnJlbnRPdmVyZmxvd3NcbiAgICAgIH1dO1xuICAgICAgY29uc3QgbmV4dFBsYWNlbWVudCA9IHBsYWNlbWVudHMkMVtjdXJyZW50SW5kZXggKyAxXTtcblxuICAgICAgLy8gVGhlcmUgYXJlIG1vcmUgcGxhY2VtZW50cyB0byBjaGVjay5cbiAgICAgIGlmIChuZXh0UGxhY2VtZW50KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgaW5kZXg6IGN1cnJlbnRJbmRleCArIDEsXG4gICAgICAgICAgICBvdmVyZmxvd3M6IGFsbE92ZXJmbG93c1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVzZXQ6IHtcbiAgICAgICAgICAgIHBsYWNlbWVudDogbmV4dFBsYWNlbWVudFxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHBsYWNlbWVudHNTb3J0ZWRCeU1vc3RTcGFjZSA9IGFsbE92ZXJmbG93cy5tYXAoZCA9PiB7XG4gICAgICAgIGNvbnN0IGFsaWdubWVudCA9IGdldEFsaWdubWVudChkLnBsYWNlbWVudCk7XG4gICAgICAgIHJldHVybiBbZC5wbGFjZW1lbnQsIGFsaWdubWVudCAmJiBjcm9zc0F4aXMgP1xuICAgICAgICAvLyBDaGVjayBhbG9uZyB0aGUgbWFpbkF4aXMgYW5kIG1haW4gY3Jvc3NBeGlzIHNpZGUuXG4gICAgICAgIGQub3ZlcmZsb3dzLnNsaWNlKDAsIDIpLnJlZHVjZSgoYWNjLCB2KSA9PiBhY2MgKyB2LCAwKSA6XG4gICAgICAgIC8vIENoZWNrIG9ubHkgdGhlIG1haW5BeGlzLlxuICAgICAgICBkLm92ZXJmbG93c1swXSwgZC5vdmVyZmxvd3NdO1xuICAgICAgfSkuc29ydCgoYSwgYikgPT4gYVsxXSAtIGJbMV0pO1xuICAgICAgY29uc3QgcGxhY2VtZW50c1RoYXRGaXRPbkVhY2hTaWRlID0gcGxhY2VtZW50c1NvcnRlZEJ5TW9zdFNwYWNlLmZpbHRlcihkID0+IGRbMl0uc2xpY2UoMCxcbiAgICAgIC8vIEFsaWduZWQgcGxhY2VtZW50cyBzaG91bGQgbm90IGNoZWNrIHRoZWlyIG9wcG9zaXRlIGNyb3NzQXhpc1xuICAgICAgLy8gc2lkZS5cbiAgICAgIGdldEFsaWdubWVudChkWzBdKSA/IDIgOiAzKS5ldmVyeSh2ID0+IHYgPD0gMCkpO1xuICAgICAgY29uc3QgcmVzZXRQbGFjZW1lbnQgPSAoKF9wbGFjZW1lbnRzVGhhdEZpdE9uRSA9IHBsYWNlbWVudHNUaGF0Rml0T25FYWNoU2lkZVswXSkgPT0gbnVsbCA/IHZvaWQgMCA6IF9wbGFjZW1lbnRzVGhhdEZpdE9uRVswXSkgfHwgcGxhY2VtZW50c1NvcnRlZEJ5TW9zdFNwYWNlWzBdWzBdO1xuICAgICAgaWYgKHJlc2V0UGxhY2VtZW50ICE9PSBwbGFjZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBpbmRleDogY3VycmVudEluZGV4ICsgMSxcbiAgICAgICAgICAgIG92ZXJmbG93czogYWxsT3ZlcmZsb3dzXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZXNldDoge1xuICAgICAgICAgICAgcGxhY2VtZW50OiByZXNldFBsYWNlbWVudFxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gIH07XG59O1xuXG4vKipcbiAqIE9wdGltaXplcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgZmxvYXRpbmcgZWxlbWVudCBieSBmbGlwcGluZyB0aGUgYHBsYWNlbWVudGBcbiAqIGluIG9yZGVyIHRvIGtlZXAgaXQgaW4gdmlldyB3aGVuIHRoZSBwcmVmZXJyZWQgcGxhY2VtZW50KHMpIHdpbGwgb3ZlcmZsb3cgdGhlXG4gKiBjbGlwcGluZyBib3VuZGFyeS4gQWx0ZXJuYXRpdmUgdG8gYGF1dG9QbGFjZW1lbnRgLlxuICogQHNlZSBodHRwczovL2Zsb2F0aW5nLXVpLmNvbS9kb2NzL2ZsaXBcbiAqL1xuY29uc3QgZmxpcCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAnZmxpcCcsXG4gICAgb3B0aW9ucyxcbiAgICBhc3luYyBmbihzdGF0ZSkge1xuICAgICAgdmFyIF9taWRkbGV3YXJlRGF0YSRhcnJvdywgX21pZGRsZXdhcmVEYXRhJGZsaXA7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHBsYWNlbWVudCxcbiAgICAgICAgbWlkZGxld2FyZURhdGEsXG4gICAgICAgIHJlY3RzLFxuICAgICAgICBpbml0aWFsUGxhY2VtZW50LFxuICAgICAgICBwbGF0Zm9ybSxcbiAgICAgICAgZWxlbWVudHNcbiAgICAgIH0gPSBzdGF0ZTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbWFpbkF4aXM6IGNoZWNrTWFpbkF4aXMgPSB0cnVlLFxuICAgICAgICBjcm9zc0F4aXM6IGNoZWNrQ3Jvc3NBeGlzID0gdHJ1ZSxcbiAgICAgICAgZmFsbGJhY2tQbGFjZW1lbnRzOiBzcGVjaWZpZWRGYWxsYmFja1BsYWNlbWVudHMsXG4gICAgICAgIGZhbGxiYWNrU3RyYXRlZ3kgPSAnYmVzdEZpdCcsXG4gICAgICAgIGZhbGxiYWNrQXhpc1NpZGVEaXJlY3Rpb24gPSAnbm9uZScsXG4gICAgICAgIGZsaXBBbGlnbm1lbnQgPSB0cnVlLFxuICAgICAgICAuLi5kZXRlY3RPdmVyZmxvd09wdGlvbnNcbiAgICAgIH0gPSBldmFsdWF0ZShvcHRpb25zLCBzdGF0ZSk7XG5cbiAgICAgIC8vIElmIGEgcmVzZXQgYnkgdGhlIGFycm93IHdhcyBjYXVzZWQgZHVlIHRvIGFuIGFsaWdubWVudCBvZmZzZXQgYmVpbmdcbiAgICAgIC8vIGFkZGVkLCB3ZSBzaG91bGQgc2tpcCBhbnkgbG9naWMgbm93IHNpbmNlIGBmbGlwKClgIGhhcyBhbHJlYWR5IGRvbmUgaXRzXG4gICAgICAvLyB3b3JrLlxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Zsb2F0aW5nLXVpL2Zsb2F0aW5nLXVpL2lzc3Vlcy8yNTQ5I2lzc3VlY29tbWVudC0xNzE5NjAxNjQzXG4gICAgICBpZiAoKF9taWRkbGV3YXJlRGF0YSRhcnJvdyA9IG1pZGRsZXdhcmVEYXRhLmFycm93KSAhPSBudWxsICYmIF9taWRkbGV3YXJlRGF0YSRhcnJvdy5hbGlnbm1lbnRPZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuICAgICAgY29uc3Qgc2lkZSA9IGdldFNpZGUocGxhY2VtZW50KTtcbiAgICAgIGNvbnN0IGluaXRpYWxTaWRlQXhpcyA9IGdldFNpZGVBeGlzKGluaXRpYWxQbGFjZW1lbnQpO1xuICAgICAgY29uc3QgaXNCYXNlUGxhY2VtZW50ID0gZ2V0U2lkZShpbml0aWFsUGxhY2VtZW50KSA9PT0gaW5pdGlhbFBsYWNlbWVudDtcbiAgICAgIGNvbnN0IHJ0bCA9IGF3YWl0IChwbGF0Zm9ybS5pc1JUTCA9PSBudWxsID8gdm9pZCAwIDogcGxhdGZvcm0uaXNSVEwoZWxlbWVudHMuZmxvYXRpbmcpKTtcbiAgICAgIGNvbnN0IGZhbGxiYWNrUGxhY2VtZW50cyA9IHNwZWNpZmllZEZhbGxiYWNrUGxhY2VtZW50cyB8fCAoaXNCYXNlUGxhY2VtZW50IHx8ICFmbGlwQWxpZ25tZW50ID8gW2dldE9wcG9zaXRlUGxhY2VtZW50KGluaXRpYWxQbGFjZW1lbnQpXSA6IGdldEV4cGFuZGVkUGxhY2VtZW50cyhpbml0aWFsUGxhY2VtZW50KSk7XG4gICAgICBjb25zdCBoYXNGYWxsYmFja0F4aXNTaWRlRGlyZWN0aW9uID0gZmFsbGJhY2tBeGlzU2lkZURpcmVjdGlvbiAhPT0gJ25vbmUnO1xuICAgICAgaWYgKCFzcGVjaWZpZWRGYWxsYmFja1BsYWNlbWVudHMgJiYgaGFzRmFsbGJhY2tBeGlzU2lkZURpcmVjdGlvbikge1xuICAgICAgICBmYWxsYmFja1BsYWNlbWVudHMucHVzaCguLi5nZXRPcHBvc2l0ZUF4aXNQbGFjZW1lbnRzKGluaXRpYWxQbGFjZW1lbnQsIGZsaXBBbGlnbm1lbnQsIGZhbGxiYWNrQXhpc1NpZGVEaXJlY3Rpb24sIHJ0bCkpO1xuICAgICAgfVxuICAgICAgY29uc3QgcGxhY2VtZW50cyA9IFtpbml0aWFsUGxhY2VtZW50LCAuLi5mYWxsYmFja1BsYWNlbWVudHNdO1xuICAgICAgY29uc3Qgb3ZlcmZsb3cgPSBhd2FpdCBwbGF0Zm9ybS5kZXRlY3RPdmVyZmxvdyhzdGF0ZSwgZGV0ZWN0T3ZlcmZsb3dPcHRpb25zKTtcbiAgICAgIGNvbnN0IG92ZXJmbG93cyA9IFtdO1xuICAgICAgbGV0IG92ZXJmbG93c0RhdGEgPSAoKF9taWRkbGV3YXJlRGF0YSRmbGlwID0gbWlkZGxld2FyZURhdGEuZmxpcCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9taWRkbGV3YXJlRGF0YSRmbGlwLm92ZXJmbG93cykgfHwgW107XG4gICAgICBpZiAoY2hlY2tNYWluQXhpcykge1xuICAgICAgICBvdmVyZmxvd3MucHVzaChvdmVyZmxvd1tzaWRlXSk7XG4gICAgICB9XG4gICAgICBpZiAoY2hlY2tDcm9zc0F4aXMpIHtcbiAgICAgICAgY29uc3Qgc2lkZXMgPSBnZXRBbGlnbm1lbnRTaWRlcyhwbGFjZW1lbnQsIHJlY3RzLCBydGwpO1xuICAgICAgICBvdmVyZmxvd3MucHVzaChvdmVyZmxvd1tzaWRlc1swXV0sIG92ZXJmbG93W3NpZGVzWzFdXSk7XG4gICAgICB9XG4gICAgICBvdmVyZmxvd3NEYXRhID0gWy4uLm92ZXJmbG93c0RhdGEsIHtcbiAgICAgICAgcGxhY2VtZW50LFxuICAgICAgICBvdmVyZmxvd3NcbiAgICAgIH1dO1xuXG4gICAgICAvLyBPbmUgb3IgbW9yZSBzaWRlcyBpcyBvdmVyZmxvd2luZy5cbiAgICAgIGlmICghb3ZlcmZsb3dzLmV2ZXJ5KHNpZGUgPT4gc2lkZSA8PSAwKSkge1xuICAgICAgICB2YXIgX21pZGRsZXdhcmVEYXRhJGZsaXAyLCBfb3ZlcmZsb3dzRGF0YSRmaWx0ZXI7XG4gICAgICAgIGNvbnN0IG5leHRJbmRleCA9ICgoKF9taWRkbGV3YXJlRGF0YSRmbGlwMiA9IG1pZGRsZXdhcmVEYXRhLmZsaXApID09IG51bGwgPyB2b2lkIDAgOiBfbWlkZGxld2FyZURhdGEkZmxpcDIuaW5kZXgpIHx8IDApICsgMTtcbiAgICAgICAgY29uc3QgbmV4dFBsYWNlbWVudCA9IHBsYWNlbWVudHNbbmV4dEluZGV4XTtcbiAgICAgICAgaWYgKG5leHRQbGFjZW1lbnQpIHtcbiAgICAgICAgICBjb25zdCBpZ25vcmVDcm9zc0F4aXNPdmVyZmxvdyA9IGNoZWNrQ3Jvc3NBeGlzID09PSAnYWxpZ25tZW50JyA/IGluaXRpYWxTaWRlQXhpcyAhPT0gZ2V0U2lkZUF4aXMobmV4dFBsYWNlbWVudCkgOiBmYWxzZTtcbiAgICAgICAgICBpZiAoIWlnbm9yZUNyb3NzQXhpc092ZXJmbG93IHx8XG4gICAgICAgICAgLy8gV2UgbGVhdmUgdGhlIGN1cnJlbnQgbWFpbiBheGlzIG9ubHkgaWYgZXZlcnkgcGxhY2VtZW50IG9uIHRoYXQgYXhpc1xuICAgICAgICAgIC8vIG92ZXJmbG93cyB0aGUgbWFpbiBheGlzLlxuICAgICAgICAgIG92ZXJmbG93c0RhdGEuZXZlcnkoZCA9PiBnZXRTaWRlQXhpcyhkLnBsYWNlbWVudCkgPT09IGluaXRpYWxTaWRlQXhpcyA/IGQub3ZlcmZsb3dzWzBdID4gMCA6IHRydWUpKSB7XG4gICAgICAgICAgICAvLyBUcnkgbmV4dCBwbGFjZW1lbnQgYW5kIHJlLXJ1biB0aGUgbGlmZWN5Y2xlLlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGluZGV4OiBuZXh0SW5kZXgsXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3dzOiBvdmVyZmxvd3NEYXRhXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHJlc2V0OiB7XG4gICAgICAgICAgICAgICAgcGxhY2VtZW50OiBuZXh0UGxhY2VtZW50XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmlyc3QsIGZpbmQgdGhlIGNhbmRpZGF0ZXMgdGhhdCBmaXQgb24gdGhlIG1haW5BeGlzIHNpZGUgb2Ygb3ZlcmZsb3csXG4gICAgICAgIC8vIHRoZW4gZmluZCB0aGUgcGxhY2VtZW50IHRoYXQgZml0cyB0aGUgYmVzdCBvbiB0aGUgbWFpbiBjcm9zc0F4aXMgc2lkZS5cbiAgICAgICAgbGV0IHJlc2V0UGxhY2VtZW50ID0gKF9vdmVyZmxvd3NEYXRhJGZpbHRlciA9IG92ZXJmbG93c0RhdGEuZmlsdGVyKGQgPT4gZC5vdmVyZmxvd3NbMF0gPD0gMCkuc29ydCgoYSwgYikgPT4gYS5vdmVyZmxvd3NbMV0gLSBiLm92ZXJmbG93c1sxXSlbMF0pID09IG51bGwgPyB2b2lkIDAgOiBfb3ZlcmZsb3dzRGF0YSRmaWx0ZXIucGxhY2VtZW50O1xuXG4gICAgICAgIC8vIE90aGVyd2lzZSBmYWxsYmFjay5cbiAgICAgICAgaWYgKCFyZXNldFBsYWNlbWVudCkge1xuICAgICAgICAgIHN3aXRjaCAoZmFsbGJhY2tTdHJhdGVneSkge1xuICAgICAgICAgICAgY2FzZSAnYmVzdEZpdCc6XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgX292ZXJmbG93c0RhdGEkZmlsdGVyMjtcbiAgICAgICAgICAgICAgICBjb25zdCBwbGFjZW1lbnQgPSAoX292ZXJmbG93c0RhdGEkZmlsdGVyMiA9IG92ZXJmbG93c0RhdGEuZmlsdGVyKGQgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKGhhc0ZhbGxiYWNrQXhpc1NpZGVEaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNpZGVBeGlzID0gZ2V0U2lkZUF4aXMoZC5wbGFjZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFNpZGVBeGlzID09PSBpbml0aWFsU2lkZUF4aXMgfHxcbiAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgYmlhcyB0byB0aGUgYHlgIHNpZGUgYXhpcyBkdWUgdG8gaG9yaXpvbnRhbFxuICAgICAgICAgICAgICAgICAgICAvLyByZWFkaW5nIGRpcmVjdGlvbnMgZmF2b3JpbmcgZ3JlYXRlciB3aWR0aC5cbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNpZGVBeGlzID09PSAneSc7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KS5tYXAoZCA9PiBbZC5wbGFjZW1lbnQsIGQub3ZlcmZsb3dzLmZpbHRlcihvdmVyZmxvdyA9PiBvdmVyZmxvdyA+IDApLnJlZHVjZSgoYWNjLCBvdmVyZmxvdykgPT4gYWNjICsgb3ZlcmZsb3csIDApXSkuc29ydCgoYSwgYikgPT4gYVsxXSAtIGJbMV0pWzBdKSA9PSBudWxsID8gdm9pZCAwIDogX292ZXJmbG93c0RhdGEkZmlsdGVyMlswXTtcbiAgICAgICAgICAgICAgICBpZiAocGxhY2VtZW50KSB7XG4gICAgICAgICAgICAgICAgICByZXNldFBsYWNlbWVudCA9IHBsYWNlbWVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2luaXRpYWxQbGFjZW1lbnQnOlxuICAgICAgICAgICAgICByZXNldFBsYWNlbWVudCA9IGluaXRpYWxQbGFjZW1lbnQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocGxhY2VtZW50ICE9PSByZXNldFBsYWNlbWVudCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNldDoge1xuICAgICAgICAgICAgICBwbGFjZW1lbnQ6IHJlc2V0UGxhY2VtZW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgfTtcbn07XG5cbmZ1bmN0aW9uIGdldFNpZGVPZmZzZXRzKG92ZXJmbG93LCByZWN0KSB7XG4gIHJldHVybiB7XG4gICAgdG9wOiBvdmVyZmxvdy50b3AgLSByZWN0LmhlaWdodCxcbiAgICByaWdodDogb3ZlcmZsb3cucmlnaHQgLSByZWN0LndpZHRoLFxuICAgIGJvdHRvbTogb3ZlcmZsb3cuYm90dG9tIC0gcmVjdC5oZWlnaHQsXG4gICAgbGVmdDogb3ZlcmZsb3cubGVmdCAtIHJlY3Qud2lkdGhcbiAgfTtcbn1cbmZ1bmN0aW9uIGlzQW55U2lkZUZ1bGx5Q2xpcHBlZChvdmVyZmxvdykge1xuICByZXR1cm4gc2lkZXMuc29tZShzaWRlID0+IG92ZXJmbG93W3NpZGVdID49IDApO1xufVxuLyoqXG4gKiBQcm92aWRlcyBkYXRhIHRvIGhpZGUgdGhlIGZsb2F0aW5nIGVsZW1lbnQgaW4gYXBwbGljYWJsZSBzaXR1YXRpb25zLCBzdWNoIGFzXG4gKiB3aGVuIGl0IGlzIG5vdCBpbiB0aGUgc2FtZSBjbGlwcGluZyBjb250ZXh0IGFzIHRoZSByZWZlcmVuY2UgZWxlbWVudC5cbiAqIEBzZWUgaHR0cHM6Ly9mbG9hdGluZy11aS5jb20vZG9jcy9oaWRlXG4gKi9cbmNvbnN0IGhpZGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ2hpZGUnLFxuICAgIG9wdGlvbnMsXG4gICAgYXN5bmMgZm4oc3RhdGUpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgcmVjdHMsXG4gICAgICAgIHBsYXRmb3JtXG4gICAgICB9ID0gc3RhdGU7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHN0cmF0ZWd5ID0gJ3JlZmVyZW5jZUhpZGRlbicsXG4gICAgICAgIC4uLmRldGVjdE92ZXJmbG93T3B0aW9uc1xuICAgICAgfSA9IGV2YWx1YXRlKG9wdGlvbnMsIHN0YXRlKTtcbiAgICAgIHN3aXRjaCAoc3RyYXRlZ3kpIHtcbiAgICAgICAgY2FzZSAncmVmZXJlbmNlSGlkZGVuJzpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBvdmVyZmxvdyA9IGF3YWl0IHBsYXRmb3JtLmRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgICAgICAgICAgIC4uLmRldGVjdE92ZXJmbG93T3B0aW9ucyxcbiAgICAgICAgICAgICAgZWxlbWVudENvbnRleHQ6ICdyZWZlcmVuY2UnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldHMgPSBnZXRTaWRlT2Zmc2V0cyhvdmVyZmxvdywgcmVjdHMucmVmZXJlbmNlKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICByZWZlcmVuY2VIaWRkZW5PZmZzZXRzOiBvZmZzZXRzLFxuICAgICAgICAgICAgICAgIHJlZmVyZW5jZUhpZGRlbjogaXNBbnlTaWRlRnVsbHlDbGlwcGVkKG9mZnNldHMpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICBjYXNlICdlc2NhcGVkJzpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBvdmVyZmxvdyA9IGF3YWl0IHBsYXRmb3JtLmRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgICAgICAgICAgIC4uLmRldGVjdE92ZXJmbG93T3B0aW9ucyxcbiAgICAgICAgICAgICAgYWx0Qm91bmRhcnk6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0cyA9IGdldFNpZGVPZmZzZXRzKG92ZXJmbG93LCByZWN0cy5mbG9hdGluZyk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZXNjYXBlZE9mZnNldHM6IG9mZnNldHMsXG4gICAgICAgICAgICAgICAgZXNjYXBlZDogaXNBbnlTaWRlRnVsbHlDbGlwcGVkKG9mZnNldHMpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xufTtcblxuZnVuY3Rpb24gZ2V0Qm91bmRpbmdSZWN0KHJlY3RzKSB7XG4gIGNvbnN0IG1pblggPSBtaW4oLi4ucmVjdHMubWFwKHJlY3QgPT4gcmVjdC5sZWZ0KSk7XG4gIGNvbnN0IG1pblkgPSBtaW4oLi4ucmVjdHMubWFwKHJlY3QgPT4gcmVjdC50b3ApKTtcbiAgY29uc3QgbWF4WCA9IG1heCguLi5yZWN0cy5tYXAocmVjdCA9PiByZWN0LnJpZ2h0KSk7XG4gIGNvbnN0IG1heFkgPSBtYXgoLi4ucmVjdHMubWFwKHJlY3QgPT4gcmVjdC5ib3R0b20pKTtcbiAgcmV0dXJuIHtcbiAgICB4OiBtaW5YLFxuICAgIHk6IG1pblksXG4gICAgd2lkdGg6IG1heFggLSBtaW5YLFxuICAgIGhlaWdodDogbWF4WSAtIG1pbllcbiAgfTtcbn1cbmZ1bmN0aW9uIGdldFJlY3RzQnlMaW5lKHJlY3RzKSB7XG4gIGNvbnN0IHNvcnRlZFJlY3RzID0gcmVjdHMuc2xpY2UoKS5zb3J0KChhLCBiKSA9PiBhLnkgLSBiLnkpO1xuICBjb25zdCBncm91cHMgPSBbXTtcbiAgbGV0IHByZXZSZWN0ID0gbnVsbDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3J0ZWRSZWN0cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHJlY3QgPSBzb3J0ZWRSZWN0c1tpXTtcbiAgICBpZiAoIXByZXZSZWN0IHx8IHJlY3QueSAtIHByZXZSZWN0LnkgPiBwcmV2UmVjdC5oZWlnaHQgLyAyKSB7XG4gICAgICBncm91cHMucHVzaChbcmVjdF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBncm91cHNbZ3JvdXBzLmxlbmd0aCAtIDFdLnB1c2gocmVjdCk7XG4gICAgfVxuICAgIHByZXZSZWN0ID0gcmVjdDtcbiAgfVxuICByZXR1cm4gZ3JvdXBzLm1hcChyZWN0ID0+IHJlY3RUb0NsaWVudFJlY3QoZ2V0Qm91bmRpbmdSZWN0KHJlY3QpKSk7XG59XG4vKipcbiAqIFByb3ZpZGVzIGltcHJvdmVkIHBvc2l0aW9uaW5nIGZvciBpbmxpbmUgcmVmZXJlbmNlIGVsZW1lbnRzIHRoYXQgY2FuIHNwYW5cbiAqIG92ZXIgbXVsdGlwbGUgbGluZXMsIHN1Y2ggYXMgaHlwZXJsaW5rcyBvciByYW5nZSBzZWxlY3Rpb25zLlxuICogQHNlZSBodHRwczovL2Zsb2F0aW5nLXVpLmNvbS9kb2NzL2lubGluZVxuICovXG5jb25zdCBpbmxpbmUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ2lubGluZScsXG4gICAgb3B0aW9ucyxcbiAgICBhc3luYyBmbihzdGF0ZSkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBwbGFjZW1lbnQsXG4gICAgICAgIGVsZW1lbnRzLFxuICAgICAgICByZWN0cyxcbiAgICAgICAgcGxhdGZvcm0sXG4gICAgICAgIHN0cmF0ZWd5XG4gICAgICB9ID0gc3RhdGU7XG4gICAgICAvLyBBIE1vdXNlRXZlbnQncyBjbGllbnR7WCxZfSBjb29yZHMgY2FuIGJlIHVwIHRvIDIgcGl4ZWxzIG9mZiBhXG4gICAgICAvLyBDbGllbnRSZWN0J3MgYm91bmRzLCBkZXNwaXRlIHRoZSBldmVudCBsaXN0ZW5lciBiZWluZyB0cmlnZ2VyZWQuIEFcbiAgICAgIC8vIHBhZGRpbmcgb2YgMiBzZWVtcyB0byBoYW5kbGUgdGhpcyBpc3N1ZS5cbiAgICAgIGNvbnN0IHtcbiAgICAgICAgcGFkZGluZyA9IDIsXG4gICAgICAgIHgsXG4gICAgICAgIHlcbiAgICAgIH0gPSBldmFsdWF0ZShvcHRpb25zLCBzdGF0ZSk7XG4gICAgICBjb25zdCBuYXRpdmVDbGllbnRSZWN0cyA9IEFycmF5LmZyb20oKGF3YWl0IChwbGF0Zm9ybS5nZXRDbGllbnRSZWN0cyA9PSBudWxsID8gdm9pZCAwIDogcGxhdGZvcm0uZ2V0Q2xpZW50UmVjdHMoZWxlbWVudHMucmVmZXJlbmNlKSkpIHx8IFtdKTtcbiAgICAgIGNvbnN0IGNsaWVudFJlY3RzID0gZ2V0UmVjdHNCeUxpbmUobmF0aXZlQ2xpZW50UmVjdHMpO1xuICAgICAgY29uc3QgZmFsbGJhY2sgPSByZWN0VG9DbGllbnRSZWN0KGdldEJvdW5kaW5nUmVjdChuYXRpdmVDbGllbnRSZWN0cykpO1xuICAgICAgY29uc3QgcGFkZGluZ09iamVjdCA9IGdldFBhZGRpbmdPYmplY3QocGFkZGluZyk7XG4gICAgICBmdW5jdGlvbiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKSB7XG4gICAgICAgIC8vIFRoZXJlIGFyZSB0d28gcmVjdHMgYW5kIHRoZXkgYXJlIGRpc2pvaW5lZC5cbiAgICAgICAgaWYgKGNsaWVudFJlY3RzLmxlbmd0aCA9PT0gMiAmJiBjbGllbnRSZWN0c1swXS5sZWZ0ID4gY2xpZW50UmVjdHNbMV0ucmlnaHQgJiYgeCAhPSBudWxsICYmIHkgIT0gbnVsbCkge1xuICAgICAgICAgIC8vIEZpbmQgdGhlIGZpcnN0IHJlY3QgaW4gd2hpY2ggdGhlIHBvaW50IGlzIGZ1bGx5IGluc2lkZS5cbiAgICAgICAgICByZXR1cm4gY2xpZW50UmVjdHMuZmluZChyZWN0ID0+IHggPiByZWN0LmxlZnQgLSBwYWRkaW5nT2JqZWN0LmxlZnQgJiYgeCA8IHJlY3QucmlnaHQgKyBwYWRkaW5nT2JqZWN0LnJpZ2h0ICYmIHkgPiByZWN0LnRvcCAtIHBhZGRpbmdPYmplY3QudG9wICYmIHkgPCByZWN0LmJvdHRvbSArIHBhZGRpbmdPYmplY3QuYm90dG9tKSB8fCBmYWxsYmFjaztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZXJlIGFyZSAyIG9yIG1vcmUgY29ubmVjdGVkIHJlY3RzLlxuICAgICAgICBpZiAoY2xpZW50UmVjdHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICBpZiAoZ2V0U2lkZUF4aXMocGxhY2VtZW50KSA9PT0gJ3knKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdFJlY3QgPSBjbGllbnRSZWN0c1swXTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RSZWN0ID0gY2xpZW50UmVjdHNbY2xpZW50UmVjdHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBjb25zdCBpc1RvcCA9IGdldFNpZGUocGxhY2VtZW50KSA9PT0gJ3RvcCc7XG4gICAgICAgICAgICBjb25zdCB0b3AgPSBmaXJzdFJlY3QudG9wO1xuICAgICAgICAgICAgY29uc3QgYm90dG9tID0gbGFzdFJlY3QuYm90dG9tO1xuICAgICAgICAgICAgY29uc3QgbGVmdCA9IGlzVG9wID8gZmlyc3RSZWN0LmxlZnQgOiBsYXN0UmVjdC5sZWZ0O1xuICAgICAgICAgICAgY29uc3QgcmlnaHQgPSBpc1RvcCA/IGZpcnN0UmVjdC5yaWdodCA6IGxhc3RSZWN0LnJpZ2h0O1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSByaWdodCAtIGxlZnQ7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBib3R0b20gLSB0b3A7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB0b3AsXG4gICAgICAgICAgICAgIGJvdHRvbSxcbiAgICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgICAgcmlnaHQsXG4gICAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICAgIHg6IGxlZnQsXG4gICAgICAgICAgICAgIHk6IHRvcFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgaXNMZWZ0U2lkZSA9IGdldFNpZGUocGxhY2VtZW50KSA9PT0gJ2xlZnQnO1xuICAgICAgICAgIGNvbnN0IG1heFJpZ2h0ID0gbWF4KC4uLmNsaWVudFJlY3RzLm1hcChyZWN0ID0+IHJlY3QucmlnaHQpKTtcbiAgICAgICAgICBjb25zdCBtaW5MZWZ0ID0gbWluKC4uLmNsaWVudFJlY3RzLm1hcChyZWN0ID0+IHJlY3QubGVmdCkpO1xuICAgICAgICAgIGNvbnN0IG1lYXN1cmVSZWN0cyA9IGNsaWVudFJlY3RzLmZpbHRlcihyZWN0ID0+IGlzTGVmdFNpZGUgPyByZWN0LmxlZnQgPT09IG1pbkxlZnQgOiByZWN0LnJpZ2h0ID09PSBtYXhSaWdodCk7XG4gICAgICAgICAgY29uc3QgdG9wID0gbWVhc3VyZVJlY3RzWzBdLnRvcDtcbiAgICAgICAgICBjb25zdCBib3R0b20gPSBtZWFzdXJlUmVjdHNbbWVhc3VyZVJlY3RzLmxlbmd0aCAtIDFdLmJvdHRvbTtcbiAgICAgICAgICBjb25zdCBsZWZ0ID0gbWluTGVmdDtcbiAgICAgICAgICBjb25zdCByaWdodCA9IG1heFJpZ2h0O1xuICAgICAgICAgIGNvbnN0IHdpZHRoID0gcmlnaHQgLSBsZWZ0O1xuICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGJvdHRvbSAtIHRvcDtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9wLFxuICAgICAgICAgICAgYm90dG9tLFxuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0LFxuICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICB4OiBsZWZ0LFxuICAgICAgICAgICAgeTogdG9wXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsbGJhY2s7XG4gICAgICB9XG4gICAgICBjb25zdCByZXNldFJlY3RzID0gYXdhaXQgcGxhdGZvcm0uZ2V0RWxlbWVudFJlY3RzKHtcbiAgICAgICAgcmVmZXJlbmNlOiB7XG4gICAgICAgICAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0XG4gICAgICAgIH0sXG4gICAgICAgIGZsb2F0aW5nOiBlbGVtZW50cy5mbG9hdGluZyxcbiAgICAgICAgc3RyYXRlZ3lcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlY3RzLnJlZmVyZW5jZS54ICE9PSByZXNldFJlY3RzLnJlZmVyZW5jZS54IHx8IHJlY3RzLnJlZmVyZW5jZS55ICE9PSByZXNldFJlY3RzLnJlZmVyZW5jZS55IHx8IHJlY3RzLnJlZmVyZW5jZS53aWR0aCAhPT0gcmVzZXRSZWN0cy5yZWZlcmVuY2Uud2lkdGggfHwgcmVjdHMucmVmZXJlbmNlLmhlaWdodCAhPT0gcmVzZXRSZWN0cy5yZWZlcmVuY2UuaGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcmVzZXQ6IHtcbiAgICAgICAgICAgIHJlY3RzOiByZXNldFJlY3RzXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgfTtcbn07XG5cbmNvbnN0IG9yaWdpblNpZGVzID0gLyojX19QVVJFX18qL25ldyBTZXQoWydsZWZ0JywgJ3RvcCddKTtcblxuLy8gRm9yIHR5cGUgYmFja3dhcmRzLWNvbXBhdGliaWxpdHksIHRoZSBgT2Zmc2V0T3B0aW9uc2AgdHlwZSB3YXMgYWxzb1xuLy8gRGVyaXZhYmxlLlxuXG5hc3luYyBmdW5jdGlvbiBjb252ZXJ0VmFsdWVUb0Nvb3JkcyhzdGF0ZSwgb3B0aW9ucykge1xuICBjb25zdCB7XG4gICAgcGxhY2VtZW50LFxuICAgIHBsYXRmb3JtLFxuICAgIGVsZW1lbnRzXG4gIH0gPSBzdGF0ZTtcbiAgY29uc3QgcnRsID0gYXdhaXQgKHBsYXRmb3JtLmlzUlRMID09IG51bGwgPyB2b2lkIDAgOiBwbGF0Zm9ybS5pc1JUTChlbGVtZW50cy5mbG9hdGluZykpO1xuICBjb25zdCBzaWRlID0gZ2V0U2lkZShwbGFjZW1lbnQpO1xuICBjb25zdCBhbGlnbm1lbnQgPSBnZXRBbGlnbm1lbnQocGxhY2VtZW50KTtcbiAgY29uc3QgaXNWZXJ0aWNhbCA9IGdldFNpZGVBeGlzKHBsYWNlbWVudCkgPT09ICd5JztcbiAgY29uc3QgbWFpbkF4aXNNdWx0aSA9IG9yaWdpblNpZGVzLmhhcyhzaWRlKSA/IC0xIDogMTtcbiAgY29uc3QgY3Jvc3NBeGlzTXVsdGkgPSBydGwgJiYgaXNWZXJ0aWNhbCA/IC0xIDogMTtcbiAgY29uc3QgcmF3VmFsdWUgPSBldmFsdWF0ZShvcHRpb25zLCBzdGF0ZSk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1jb25zdFxuICBsZXQge1xuICAgIG1haW5BeGlzLFxuICAgIGNyb3NzQXhpcyxcbiAgICBhbGlnbm1lbnRBeGlzXG4gIH0gPSB0eXBlb2YgcmF3VmFsdWUgPT09ICdudW1iZXInID8ge1xuICAgIG1haW5BeGlzOiByYXdWYWx1ZSxcbiAgICBjcm9zc0F4aXM6IDAsXG4gICAgYWxpZ25tZW50QXhpczogbnVsbFxuICB9IDoge1xuICAgIG1haW5BeGlzOiByYXdWYWx1ZS5tYWluQXhpcyB8fCAwLFxuICAgIGNyb3NzQXhpczogcmF3VmFsdWUuY3Jvc3NBeGlzIHx8IDAsXG4gICAgYWxpZ25tZW50QXhpczogcmF3VmFsdWUuYWxpZ25tZW50QXhpc1xuICB9O1xuICBpZiAoYWxpZ25tZW50ICYmIHR5cGVvZiBhbGlnbm1lbnRBeGlzID09PSAnbnVtYmVyJykge1xuICAgIGNyb3NzQXhpcyA9IGFsaWdubWVudCA9PT0gJ2VuZCcgPyBhbGlnbm1lbnRBeGlzICogLTEgOiBhbGlnbm1lbnRBeGlzO1xuICB9XG4gIHJldHVybiBpc1ZlcnRpY2FsID8ge1xuICAgIHg6IGNyb3NzQXhpcyAqIGNyb3NzQXhpc011bHRpLFxuICAgIHk6IG1haW5BeGlzICogbWFpbkF4aXNNdWx0aVxuICB9IDoge1xuICAgIHg6IG1haW5BeGlzICogbWFpbkF4aXNNdWx0aSxcbiAgICB5OiBjcm9zc0F4aXMgKiBjcm9zc0F4aXNNdWx0aVxuICB9O1xufVxuXG4vKipcbiAqIE1vZGlmaWVzIHRoZSBwbGFjZW1lbnQgYnkgdHJhbnNsYXRpbmcgdGhlIGZsb2F0aW5nIGVsZW1lbnQgYWxvbmcgdGhlXG4gKiBzcGVjaWZpZWQgYXhlcy5cbiAqIEEgbnVtYmVyIChzaG9ydGhhbmQgZm9yIGBtYWluQXhpc2Agb3IgZGlzdGFuY2UpLCBvciBhbiBheGVzIGNvbmZpZ3VyYXRpb25cbiAqIG9iamVjdCBtYXkgYmUgcGFzc2VkLlxuICogQHNlZSBodHRwczovL2Zsb2F0aW5nLXVpLmNvbS9kb2NzL29mZnNldFxuICovXG5jb25zdCBvZmZzZXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IDA7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAnb2Zmc2V0JyxcbiAgICBvcHRpb25zLFxuICAgIGFzeW5jIGZuKHN0YXRlKSB7XG4gICAgICB2YXIgX21pZGRsZXdhcmVEYXRhJG9mZnNlLCBfbWlkZGxld2FyZURhdGEkYXJyb3c7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIHBsYWNlbWVudCxcbiAgICAgICAgbWlkZGxld2FyZURhdGFcbiAgICAgIH0gPSBzdGF0ZTtcbiAgICAgIGNvbnN0IGRpZmZDb29yZHMgPSBhd2FpdCBjb252ZXJ0VmFsdWVUb0Nvb3JkcyhzdGF0ZSwgb3B0aW9ucyk7XG5cbiAgICAgIC8vIElmIHRoZSBwbGFjZW1lbnQgaXMgdGhlIHNhbWUgYW5kIHRoZSBhcnJvdyBjYXVzZWQgYW4gYWxpZ25tZW50IG9mZnNldFxuICAgICAgLy8gdGhlbiB3ZSBkb24ndCBuZWVkIHRvIGNoYW5nZSB0aGUgcG9zaXRpb25pbmcgY29vcmRpbmF0ZXMuXG4gICAgICBpZiAocGxhY2VtZW50ID09PSAoKF9taWRkbGV3YXJlRGF0YSRvZmZzZSA9IG1pZGRsZXdhcmVEYXRhLm9mZnNldCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9taWRkbGV3YXJlRGF0YSRvZmZzZS5wbGFjZW1lbnQpICYmIChfbWlkZGxld2FyZURhdGEkYXJyb3cgPSBtaWRkbGV3YXJlRGF0YS5hcnJvdykgIT0gbnVsbCAmJiBfbWlkZGxld2FyZURhdGEkYXJyb3cuYWxpZ25tZW50T2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IHggKyBkaWZmQ29vcmRzLngsXG4gICAgICAgIHk6IHkgKyBkaWZmQ29vcmRzLnksXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAuLi5kaWZmQ29vcmRzLFxuICAgICAgICAgIHBsYWNlbWVudFxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn07XG5cbi8qKlxuICogT3B0aW1pemVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBmbG9hdGluZyBlbGVtZW50IGJ5IHNoaWZ0aW5nIGl0IGluIG9yZGVyIHRvXG4gKiBrZWVwIGl0IGluIHZpZXcgd2hlbiBpdCB3aWxsIG92ZXJmbG93IHRoZSBjbGlwcGluZyBib3VuZGFyeS5cbiAqIEBzZWUgaHR0cHM6Ly9mbG9hdGluZy11aS5jb20vZG9jcy9zaGlmdFxuICovXG5jb25zdCBzaGlmdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAnc2hpZnQnLFxuICAgIG9wdGlvbnMsXG4gICAgYXN5bmMgZm4oc3RhdGUpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgcGxhY2VtZW50LFxuICAgICAgICBwbGF0Zm9ybVxuICAgICAgfSA9IHN0YXRlO1xuICAgICAgY29uc3Qge1xuICAgICAgICBtYWluQXhpczogY2hlY2tNYWluQXhpcyA9IHRydWUsXG4gICAgICAgIGNyb3NzQXhpczogY2hlY2tDcm9zc0F4aXMgPSBmYWxzZSxcbiAgICAgICAgbGltaXRlciA9IHtcbiAgICAgICAgICBmbjogX3JlZiA9PiB7XG4gICAgICAgICAgICBsZXQge1xuICAgICAgICAgICAgICB4LFxuICAgICAgICAgICAgICB5XG4gICAgICAgICAgICB9ID0gX3JlZjtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHgsXG4gICAgICAgICAgICAgIHlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAuLi5kZXRlY3RPdmVyZmxvd09wdGlvbnNcbiAgICAgIH0gPSBldmFsdWF0ZShvcHRpb25zLCBzdGF0ZSk7XG4gICAgICBjb25zdCBjb29yZHMgPSB7XG4gICAgICAgIHgsXG4gICAgICAgIHlcbiAgICAgIH07XG4gICAgICBjb25zdCBvdmVyZmxvdyA9IGF3YWl0IHBsYXRmb3JtLmRldGVjdE92ZXJmbG93KHN0YXRlLCBkZXRlY3RPdmVyZmxvd09wdGlvbnMpO1xuICAgICAgY29uc3QgY3Jvc3NBeGlzID0gZ2V0U2lkZUF4aXMoZ2V0U2lkZShwbGFjZW1lbnQpKTtcbiAgICAgIGNvbnN0IG1haW5BeGlzID0gZ2V0T3Bwb3NpdGVBeGlzKGNyb3NzQXhpcyk7XG4gICAgICBsZXQgbWFpbkF4aXNDb29yZCA9IGNvb3Jkc1ttYWluQXhpc107XG4gICAgICBsZXQgY3Jvc3NBeGlzQ29vcmQgPSBjb29yZHNbY3Jvc3NBeGlzXTtcbiAgICAgIGlmIChjaGVja01haW5BeGlzKSB7XG4gICAgICAgIGNvbnN0IG1pblNpZGUgPSBtYWluQXhpcyA9PT0gJ3knID8gJ3RvcCcgOiAnbGVmdCc7XG4gICAgICAgIGNvbnN0IG1heFNpZGUgPSBtYWluQXhpcyA9PT0gJ3knID8gJ2JvdHRvbScgOiAncmlnaHQnO1xuICAgICAgICBjb25zdCBtaW4gPSBtYWluQXhpc0Nvb3JkICsgb3ZlcmZsb3dbbWluU2lkZV07XG4gICAgICAgIGNvbnN0IG1heCA9IG1haW5BeGlzQ29vcmQgLSBvdmVyZmxvd1ttYXhTaWRlXTtcbiAgICAgICAgbWFpbkF4aXNDb29yZCA9IGNsYW1wKG1pbiwgbWFpbkF4aXNDb29yZCwgbWF4KTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGVja0Nyb3NzQXhpcykge1xuICAgICAgICBjb25zdCBtaW5TaWRlID0gY3Jvc3NBeGlzID09PSAneScgPyAndG9wJyA6ICdsZWZ0JztcbiAgICAgICAgY29uc3QgbWF4U2lkZSA9IGNyb3NzQXhpcyA9PT0gJ3knID8gJ2JvdHRvbScgOiAncmlnaHQnO1xuICAgICAgICBjb25zdCBtaW4gPSBjcm9zc0F4aXNDb29yZCArIG92ZXJmbG93W21pblNpZGVdO1xuICAgICAgICBjb25zdCBtYXggPSBjcm9zc0F4aXNDb29yZCAtIG92ZXJmbG93W21heFNpZGVdO1xuICAgICAgICBjcm9zc0F4aXNDb29yZCA9IGNsYW1wKG1pbiwgY3Jvc3NBeGlzQ29vcmQsIG1heCk7XG4gICAgICB9XG4gICAgICBjb25zdCBsaW1pdGVkQ29vcmRzID0gbGltaXRlci5mbih7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBbbWFpbkF4aXNdOiBtYWluQXhpc0Nvb3JkLFxuICAgICAgICBbY3Jvc3NBeGlzXTogY3Jvc3NBeGlzQ29vcmRcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ubGltaXRlZENvb3JkcyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHg6IGxpbWl0ZWRDb29yZHMueCAtIHgsXG4gICAgICAgICAgeTogbGltaXRlZENvb3Jkcy55IC0geSxcbiAgICAgICAgICBlbmFibGVkOiB7XG4gICAgICAgICAgICBbbWFpbkF4aXNdOiBjaGVja01haW5BeGlzLFxuICAgICAgICAgICAgW2Nyb3NzQXhpc106IGNoZWNrQ3Jvc3NBeGlzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn07XG4vKipcbiAqIEJ1aWx0LWluIGBsaW1pdGVyYCB0aGF0IHdpbGwgc3RvcCBgc2hpZnQoKWAgYXQgYSBjZXJ0YWluIHBvaW50LlxuICovXG5jb25zdCBsaW1pdFNoaWZ0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICByZXR1cm4ge1xuICAgIG9wdGlvbnMsXG4gICAgZm4oc3RhdGUpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgcGxhY2VtZW50LFxuICAgICAgICByZWN0cyxcbiAgICAgICAgbWlkZGxld2FyZURhdGFcbiAgICAgIH0gPSBzdGF0ZTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgb2Zmc2V0ID0gMCxcbiAgICAgICAgbWFpbkF4aXM6IGNoZWNrTWFpbkF4aXMgPSB0cnVlLFxuICAgICAgICBjcm9zc0F4aXM6IGNoZWNrQ3Jvc3NBeGlzID0gdHJ1ZVxuICAgICAgfSA9IGV2YWx1YXRlKG9wdGlvbnMsIHN0YXRlKTtcbiAgICAgIGNvbnN0IGNvb3JkcyA9IHtcbiAgICAgICAgeCxcbiAgICAgICAgeVxuICAgICAgfTtcbiAgICAgIGNvbnN0IGNyb3NzQXhpcyA9IGdldFNpZGVBeGlzKHBsYWNlbWVudCk7XG4gICAgICBjb25zdCBtYWluQXhpcyA9IGdldE9wcG9zaXRlQXhpcyhjcm9zc0F4aXMpO1xuICAgICAgbGV0IG1haW5BeGlzQ29vcmQgPSBjb29yZHNbbWFpbkF4aXNdO1xuICAgICAgbGV0IGNyb3NzQXhpc0Nvb3JkID0gY29vcmRzW2Nyb3NzQXhpc107XG4gICAgICBjb25zdCByYXdPZmZzZXQgPSBldmFsdWF0ZShvZmZzZXQsIHN0YXRlKTtcbiAgICAgIGNvbnN0IGNvbXB1dGVkT2Zmc2V0ID0gdHlwZW9mIHJhd09mZnNldCA9PT0gJ251bWJlcicgPyB7XG4gICAgICAgIG1haW5BeGlzOiByYXdPZmZzZXQsXG4gICAgICAgIGNyb3NzQXhpczogMFxuICAgICAgfSA6IHtcbiAgICAgICAgbWFpbkF4aXM6IDAsXG4gICAgICAgIGNyb3NzQXhpczogMCxcbiAgICAgICAgLi4ucmF3T2Zmc2V0XG4gICAgICB9O1xuICAgICAgaWYgKGNoZWNrTWFpbkF4aXMpIHtcbiAgICAgICAgY29uc3QgbGVuID0gbWFpbkF4aXMgPT09ICd5JyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgICAgICAgY29uc3QgbGltaXRNaW4gPSByZWN0cy5yZWZlcmVuY2VbbWFpbkF4aXNdIC0gcmVjdHMuZmxvYXRpbmdbbGVuXSArIGNvbXB1dGVkT2Zmc2V0Lm1haW5BeGlzO1xuICAgICAgICBjb25zdCBsaW1pdE1heCA9IHJlY3RzLnJlZmVyZW5jZVttYWluQXhpc10gKyByZWN0cy5yZWZlcmVuY2VbbGVuXSAtIGNvbXB1dGVkT2Zmc2V0Lm1haW5BeGlzO1xuICAgICAgICBpZiAobWFpbkF4aXNDb29yZCA8IGxpbWl0TWluKSB7XG4gICAgICAgICAgbWFpbkF4aXNDb29yZCA9IGxpbWl0TWluO1xuICAgICAgICB9IGVsc2UgaWYgKG1haW5BeGlzQ29vcmQgPiBsaW1pdE1heCkge1xuICAgICAgICAgIG1haW5BeGlzQ29vcmQgPSBsaW1pdE1heDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNoZWNrQ3Jvc3NBeGlzKSB7XG4gICAgICAgIHZhciBfbWlkZGxld2FyZURhdGEkb2Zmc2UsIF9taWRkbGV3YXJlRGF0YSRvZmZzZTI7XG4gICAgICAgIGNvbnN0IGxlbiA9IG1haW5BeGlzID09PSAneScgPyAnd2lkdGgnIDogJ2hlaWdodCc7XG4gICAgICAgIGNvbnN0IGlzT3JpZ2luU2lkZSA9IG9yaWdpblNpZGVzLmhhcyhnZXRTaWRlKHBsYWNlbWVudCkpO1xuICAgICAgICBjb25zdCBsaW1pdE1pbiA9IHJlY3RzLnJlZmVyZW5jZVtjcm9zc0F4aXNdIC0gcmVjdHMuZmxvYXRpbmdbbGVuXSArIChpc09yaWdpblNpZGUgPyAoKF9taWRkbGV3YXJlRGF0YSRvZmZzZSA9IG1pZGRsZXdhcmVEYXRhLm9mZnNldCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9taWRkbGV3YXJlRGF0YSRvZmZzZVtjcm9zc0F4aXNdKSB8fCAwIDogMCkgKyAoaXNPcmlnaW5TaWRlID8gMCA6IGNvbXB1dGVkT2Zmc2V0LmNyb3NzQXhpcyk7XG4gICAgICAgIGNvbnN0IGxpbWl0TWF4ID0gcmVjdHMucmVmZXJlbmNlW2Nyb3NzQXhpc10gKyByZWN0cy5yZWZlcmVuY2VbbGVuXSArIChpc09yaWdpblNpZGUgPyAwIDogKChfbWlkZGxld2FyZURhdGEkb2Zmc2UyID0gbWlkZGxld2FyZURhdGEub2Zmc2V0KSA9PSBudWxsID8gdm9pZCAwIDogX21pZGRsZXdhcmVEYXRhJG9mZnNlMltjcm9zc0F4aXNdKSB8fCAwKSAtIChpc09yaWdpblNpZGUgPyBjb21wdXRlZE9mZnNldC5jcm9zc0F4aXMgOiAwKTtcbiAgICAgICAgaWYgKGNyb3NzQXhpc0Nvb3JkIDwgbGltaXRNaW4pIHtcbiAgICAgICAgICBjcm9zc0F4aXNDb29yZCA9IGxpbWl0TWluO1xuICAgICAgICB9IGVsc2UgaWYgKGNyb3NzQXhpc0Nvb3JkID4gbGltaXRNYXgpIHtcbiAgICAgICAgICBjcm9zc0F4aXNDb29yZCA9IGxpbWl0TWF4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBbbWFpbkF4aXNdOiBtYWluQXhpc0Nvb3JkLFxuICAgICAgICBbY3Jvc3NBeGlzXTogY3Jvc3NBeGlzQ29vcmRcbiAgICAgIH07XG4gICAgfVxuICB9O1xufTtcblxuLyoqXG4gKiBQcm92aWRlcyBkYXRhIHRoYXQgYWxsb3dzIHlvdSB0byBjaGFuZ2UgdGhlIHNpemUgb2YgdGhlIGZsb2F0aW5nIGVsZW1lbnQg4oCUXG4gKiBmb3IgaW5zdGFuY2UsIHByZXZlbnQgaXQgZnJvbSBvdmVyZmxvd2luZyB0aGUgY2xpcHBpbmcgYm91bmRhcnkgb3IgbWF0Y2ggdGhlXG4gKiB3aWR0aCBvZiB0aGUgcmVmZXJlbmNlIGVsZW1lbnQuXG4gKiBAc2VlIGh0dHBzOi8vZmxvYXRpbmctdWkuY29tL2RvY3Mvc2l6ZVxuICovXG5jb25zdCBzaXplID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICByZXR1cm4ge1xuICAgIG5hbWU6ICdzaXplJyxcbiAgICBvcHRpb25zLFxuICAgIGFzeW5jIGZuKHN0YXRlKSB7XG4gICAgICB2YXIgX3N0YXRlJG1pZGRsZXdhcmVEYXRhLCBfc3RhdGUkbWlkZGxld2FyZURhdGEyO1xuICAgICAgY29uc3Qge1xuICAgICAgICBwbGFjZW1lbnQsXG4gICAgICAgIHJlY3RzLFxuICAgICAgICBwbGF0Zm9ybSxcbiAgICAgICAgZWxlbWVudHNcbiAgICAgIH0gPSBzdGF0ZTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYXBwbHkgPSAoKSA9PiB7fSxcbiAgICAgICAgLi4uZGV0ZWN0T3ZlcmZsb3dPcHRpb25zXG4gICAgICB9ID0gZXZhbHVhdGUob3B0aW9ucywgc3RhdGUpO1xuICAgICAgY29uc3Qgb3ZlcmZsb3cgPSBhd2FpdCBwbGF0Zm9ybS5kZXRlY3RPdmVyZmxvdyhzdGF0ZSwgZGV0ZWN0T3ZlcmZsb3dPcHRpb25zKTtcbiAgICAgIGNvbnN0IHNpZGUgPSBnZXRTaWRlKHBsYWNlbWVudCk7XG4gICAgICBjb25zdCBhbGlnbm1lbnQgPSBnZXRBbGlnbm1lbnQocGxhY2VtZW50KTtcbiAgICAgIGNvbnN0IGlzWUF4aXMgPSBnZXRTaWRlQXhpcyhwbGFjZW1lbnQpID09PSAneSc7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHRcbiAgICAgIH0gPSByZWN0cy5mbG9hdGluZztcbiAgICAgIGxldCBoZWlnaHRTaWRlO1xuICAgICAgbGV0IHdpZHRoU2lkZTtcbiAgICAgIGlmIChzaWRlID09PSAndG9wJyB8fCBzaWRlID09PSAnYm90dG9tJykge1xuICAgICAgICBoZWlnaHRTaWRlID0gc2lkZTtcbiAgICAgICAgd2lkdGhTaWRlID0gYWxpZ25tZW50ID09PSAoKGF3YWl0IChwbGF0Zm9ybS5pc1JUTCA9PSBudWxsID8gdm9pZCAwIDogcGxhdGZvcm0uaXNSVEwoZWxlbWVudHMuZmxvYXRpbmcpKSkgPyAnc3RhcnQnIDogJ2VuZCcpID8gJ2xlZnQnIDogJ3JpZ2h0JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpZHRoU2lkZSA9IHNpZGU7XG4gICAgICAgIGhlaWdodFNpZGUgPSBhbGlnbm1lbnQgPT09ICdlbmQnID8gJ3RvcCcgOiAnYm90dG9tJztcbiAgICAgIH1cbiAgICAgIGNvbnN0IG1heGltdW1DbGlwcGluZ0hlaWdodCA9IGhlaWdodCAtIG92ZXJmbG93LnRvcCAtIG92ZXJmbG93LmJvdHRvbTtcbiAgICAgIGNvbnN0IG1heGltdW1DbGlwcGluZ1dpZHRoID0gd2lkdGggLSBvdmVyZmxvdy5sZWZ0IC0gb3ZlcmZsb3cucmlnaHQ7XG4gICAgICBjb25zdCBvdmVyZmxvd0F2YWlsYWJsZUhlaWdodCA9IG1pbihoZWlnaHQgLSBvdmVyZmxvd1toZWlnaHRTaWRlXSwgbWF4aW11bUNsaXBwaW5nSGVpZ2h0KTtcbiAgICAgIGNvbnN0IG92ZXJmbG93QXZhaWxhYmxlV2lkdGggPSBtaW4od2lkdGggLSBvdmVyZmxvd1t3aWR0aFNpZGVdLCBtYXhpbXVtQ2xpcHBpbmdXaWR0aCk7XG4gICAgICBjb25zdCBub1NoaWZ0ID0gIXN0YXRlLm1pZGRsZXdhcmVEYXRhLnNoaWZ0O1xuICAgICAgbGV0IGF2YWlsYWJsZUhlaWdodCA9IG92ZXJmbG93QXZhaWxhYmxlSGVpZ2h0O1xuICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoID0gb3ZlcmZsb3dBdmFpbGFibGVXaWR0aDtcbiAgICAgIGlmICgoX3N0YXRlJG1pZGRsZXdhcmVEYXRhID0gc3RhdGUubWlkZGxld2FyZURhdGEuc2hpZnQpICE9IG51bGwgJiYgX3N0YXRlJG1pZGRsZXdhcmVEYXRhLmVuYWJsZWQueCkge1xuICAgICAgICBhdmFpbGFibGVXaWR0aCA9IG1heGltdW1DbGlwcGluZ1dpZHRoO1xuICAgICAgfVxuICAgICAgaWYgKChfc3RhdGUkbWlkZGxld2FyZURhdGEyID0gc3RhdGUubWlkZGxld2FyZURhdGEuc2hpZnQpICE9IG51bGwgJiYgX3N0YXRlJG1pZGRsZXdhcmVEYXRhMi5lbmFibGVkLnkpIHtcbiAgICAgICAgYXZhaWxhYmxlSGVpZ2h0ID0gbWF4aW11bUNsaXBwaW5nSGVpZ2h0O1xuICAgICAgfVxuICAgICAgaWYgKG5vU2hpZnQgJiYgIWFsaWdubWVudCkge1xuICAgICAgICBjb25zdCB4TWluID0gbWF4KG92ZXJmbG93LmxlZnQsIDApO1xuICAgICAgICBjb25zdCB4TWF4ID0gbWF4KG92ZXJmbG93LnJpZ2h0LCAwKTtcbiAgICAgICAgY29uc3QgeU1pbiA9IG1heChvdmVyZmxvdy50b3AsIDApO1xuICAgICAgICBjb25zdCB5TWF4ID0gbWF4KG92ZXJmbG93LmJvdHRvbSwgMCk7XG4gICAgICAgIGlmIChpc1lBeGlzKSB7XG4gICAgICAgICAgYXZhaWxhYmxlV2lkdGggPSB3aWR0aCAtIDIgKiAoeE1pbiAhPT0gMCB8fCB4TWF4ICE9PSAwID8geE1pbiArIHhNYXggOiBtYXgob3ZlcmZsb3cubGVmdCwgb3ZlcmZsb3cucmlnaHQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhdmFpbGFibGVIZWlnaHQgPSBoZWlnaHQgLSAyICogKHlNaW4gIT09IDAgfHwgeU1heCAhPT0gMCA/IHlNaW4gKyB5TWF4IDogbWF4KG92ZXJmbG93LnRvcCwgb3ZlcmZsb3cuYm90dG9tKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGF3YWl0IGFwcGx5KHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGF2YWlsYWJsZVdpZHRoLFxuICAgICAgICBhdmFpbGFibGVIZWlnaHRcbiAgICAgIH0pO1xuICAgICAgY29uc3QgbmV4dERpbWVuc2lvbnMgPSBhd2FpdCBwbGF0Zm9ybS5nZXREaW1lbnNpb25zKGVsZW1lbnRzLmZsb2F0aW5nKTtcbiAgICAgIGlmICh3aWR0aCAhPT0gbmV4dERpbWVuc2lvbnMud2lkdGggfHwgaGVpZ2h0ICE9PSBuZXh0RGltZW5zaW9ucy5oZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICByZXNldDoge1xuICAgICAgICAgICAgcmVjdHM6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0IHsgYXJyb3csIGF1dG9QbGFjZW1lbnQsIGNvbXB1dGVQb3NpdGlvbiwgZGV0ZWN0T3ZlcmZsb3csIGZsaXAsIGhpZGUsIGlubGluZSwgbGltaXRTaGlmdCwgb2Zmc2V0LCBzaGlmdCwgc2l6ZSB9O1xuIiwiZnVuY3Rpb24gaGFzV2luZG93KCkge1xuICByZXR1cm4gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XG59XG5mdW5jdGlvbiBnZXROb2RlTmFtZShub2RlKSB7XG4gIGlmIChpc05vZGUobm9kZSkpIHtcbiAgICByZXR1cm4gKG5vZGUubm9kZU5hbWUgfHwgJycpLnRvTG93ZXJDYXNlKCk7XG4gIH1cbiAgLy8gTW9ja2VkIG5vZGVzIGluIHRlc3RpbmcgZW52aXJvbm1lbnRzIG1heSBub3QgYmUgaW5zdGFuY2VzIG9mIE5vZGUuIEJ5XG4gIC8vIHJldHVybmluZyBgI2RvY3VtZW50YCBhbiBpbmZpbml0ZSBsb29wIHdvbid0IG9jY3VyLlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmxvYXRpbmctdWkvZmxvYXRpbmctdWkvaXNzdWVzLzIzMTdcbiAgcmV0dXJuICcjZG9jdW1lbnQnO1xufVxuZnVuY3Rpb24gZ2V0V2luZG93KG5vZGUpIHtcbiAgdmFyIF9ub2RlJG93bmVyRG9jdW1lbnQ7XG4gIHJldHVybiAobm9kZSA9PSBudWxsIHx8IChfbm9kZSRvd25lckRvY3VtZW50ID0gbm9kZS5vd25lckRvY3VtZW50KSA9PSBudWxsID8gdm9pZCAwIDogX25vZGUkb3duZXJEb2N1bWVudC5kZWZhdWx0VmlldykgfHwgd2luZG93O1xufVxuZnVuY3Rpb24gZ2V0RG9jdW1lbnRFbGVtZW50KG5vZGUpIHtcbiAgdmFyIF9yZWY7XG4gIHJldHVybiAoX3JlZiA9IChpc05vZGUobm9kZSkgPyBub2RlLm93bmVyRG9jdW1lbnQgOiBub2RlLmRvY3VtZW50KSB8fCB3aW5kb3cuZG9jdW1lbnQpID09IG51bGwgPyB2b2lkIDAgOiBfcmVmLmRvY3VtZW50RWxlbWVudDtcbn1cbmZ1bmN0aW9uIGlzTm9kZSh2YWx1ZSkge1xuICBpZiAoIWhhc1dpbmRvdygpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIE5vZGUgfHwgdmFsdWUgaW5zdGFuY2VvZiBnZXRXaW5kb3codmFsdWUpLk5vZGU7XG59XG5mdW5jdGlvbiBpc0VsZW1lbnQodmFsdWUpIHtcbiAgaWYgKCFoYXNXaW5kb3coKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBFbGVtZW50IHx8IHZhbHVlIGluc3RhbmNlb2YgZ2V0V2luZG93KHZhbHVlKS5FbGVtZW50O1xufVxuZnVuY3Rpb24gaXNIVE1MRWxlbWVudCh2YWx1ZSkge1xuICBpZiAoIWhhc1dpbmRvdygpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IHx8IHZhbHVlIGluc3RhbmNlb2YgZ2V0V2luZG93KHZhbHVlKS5IVE1MRWxlbWVudDtcbn1cbmZ1bmN0aW9uIGlzU2hhZG93Um9vdCh2YWx1ZSkge1xuICBpZiAoIWhhc1dpbmRvdygpIHx8IHR5cGVvZiBTaGFkb3dSb290ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBTaGFkb3dSb290IHx8IHZhbHVlIGluc3RhbmNlb2YgZ2V0V2luZG93KHZhbHVlKS5TaGFkb3dSb290O1xufVxuZnVuY3Rpb24gaXNPdmVyZmxvd0VsZW1lbnQoZWxlbWVudCkge1xuICBjb25zdCB7XG4gICAgb3ZlcmZsb3csXG4gICAgb3ZlcmZsb3dYLFxuICAgIG92ZXJmbG93WSxcbiAgICBkaXNwbGF5XG4gIH0gPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICByZXR1cm4gL2F1dG98c2Nyb2xsfG92ZXJsYXl8aGlkZGVufGNsaXAvLnRlc3Qob3ZlcmZsb3cgKyBvdmVyZmxvd1kgKyBvdmVyZmxvd1gpICYmIGRpc3BsYXkgIT09ICdpbmxpbmUnICYmIGRpc3BsYXkgIT09ICdjb250ZW50cyc7XG59XG5mdW5jdGlvbiBpc1RhYmxlRWxlbWVudChlbGVtZW50KSB7XG4gIHJldHVybiAvXih0YWJsZXx0ZHx0aCkkLy50ZXN0KGdldE5vZGVOYW1lKGVsZW1lbnQpKTtcbn1cbmZ1bmN0aW9uIGlzVG9wTGF5ZXIoZWxlbWVudCkge1xuICB0cnkge1xuICAgIGlmIChlbGVtZW50Lm1hdGNoZXMoJzpwb3BvdmVyLW9wZW4nKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9IGNhdGNoIChfZSkge1xuICAgIC8vIG5vLW9wXG4gIH1cbiAgdHJ5IHtcbiAgICByZXR1cm4gZWxlbWVudC5tYXRjaGVzKCc6bW9kYWwnKTtcbiAgfSBjYXRjaCAoX2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbmNvbnN0IHdpbGxDaGFuZ2VSZSA9IC90cmFuc2Zvcm18dHJhbnNsYXRlfHNjYWxlfHJvdGF0ZXxwZXJzcGVjdGl2ZXxmaWx0ZXIvO1xuY29uc3QgY29udGFpblJlID0gL3BhaW50fGxheW91dHxzdHJpY3R8Y29udGVudC87XG5jb25zdCBpc05vdE5vbmUgPSB2YWx1ZSA9PiAhIXZhbHVlICYmIHZhbHVlICE9PSAnbm9uZSc7XG5sZXQgaXNXZWJLaXRWYWx1ZTtcbmZ1bmN0aW9uIGlzQ29udGFpbmluZ0Jsb2NrKGVsZW1lbnRPckNzcykge1xuICBjb25zdCBjc3MgPSBpc0VsZW1lbnQoZWxlbWVudE9yQ3NzKSA/IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudE9yQ3NzKSA6IGVsZW1lbnRPckNzcztcblxuICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9DU1MvQ29udGFpbmluZ19ibG9jayNpZGVudGlmeWluZ190aGVfY29udGFpbmluZ19ibG9ja1xuICAvLyBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXRyYW5zZm9ybXMtMi8jaW5kaXZpZHVhbC10cmFuc2Zvcm1zXG4gIHJldHVybiBpc05vdE5vbmUoY3NzLnRyYW5zZm9ybSkgfHwgaXNOb3ROb25lKGNzcy50cmFuc2xhdGUpIHx8IGlzTm90Tm9uZShjc3Muc2NhbGUpIHx8IGlzTm90Tm9uZShjc3Mucm90YXRlKSB8fCBpc05vdE5vbmUoY3NzLnBlcnNwZWN0aXZlKSB8fCAhaXNXZWJLaXQoKSAmJiAoaXNOb3ROb25lKGNzcy5iYWNrZHJvcEZpbHRlcikgfHwgaXNOb3ROb25lKGNzcy5maWx0ZXIpKSB8fCB3aWxsQ2hhbmdlUmUudGVzdChjc3Mud2lsbENoYW5nZSB8fCAnJykgfHwgY29udGFpblJlLnRlc3QoY3NzLmNvbnRhaW4gfHwgJycpO1xufVxuZnVuY3Rpb24gZ2V0Q29udGFpbmluZ0Jsb2NrKGVsZW1lbnQpIHtcbiAgbGV0IGN1cnJlbnROb2RlID0gZ2V0UGFyZW50Tm9kZShlbGVtZW50KTtcbiAgd2hpbGUgKGlzSFRNTEVsZW1lbnQoY3VycmVudE5vZGUpICYmICFpc0xhc3RUcmF2ZXJzYWJsZU5vZGUoY3VycmVudE5vZGUpKSB7XG4gICAgaWYgKGlzQ29udGFpbmluZ0Jsb2NrKGN1cnJlbnROb2RlKSkge1xuICAgICAgcmV0dXJuIGN1cnJlbnROb2RlO1xuICAgIH0gZWxzZSBpZiAoaXNUb3BMYXllcihjdXJyZW50Tm9kZSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjdXJyZW50Tm9kZSA9IGdldFBhcmVudE5vZGUoY3VycmVudE5vZGUpO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gaXNXZWJLaXQoKSB7XG4gIGlmIChpc1dlYktpdFZhbHVlID09IG51bGwpIHtcbiAgICBpc1dlYktpdFZhbHVlID0gdHlwZW9mIENTUyAhPT0gJ3VuZGVmaW5lZCcgJiYgQ1NTLnN1cHBvcnRzICYmIENTUy5zdXBwb3J0cygnLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXInLCAnbm9uZScpO1xuICB9XG4gIHJldHVybiBpc1dlYktpdFZhbHVlO1xufVxuZnVuY3Rpb24gaXNMYXN0VHJhdmVyc2FibGVOb2RlKG5vZGUpIHtcbiAgcmV0dXJuIC9eKGh0bWx8Ym9keXwjZG9jdW1lbnQpJC8udGVzdChnZXROb2RlTmFtZShub2RlKSk7XG59XG5mdW5jdGlvbiBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGdldFdpbmRvdyhlbGVtZW50KS5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xufVxuZnVuY3Rpb24gZ2V0Tm9kZVNjcm9sbChlbGVtZW50KSB7XG4gIGlmIChpc0VsZW1lbnQoZWxlbWVudCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2Nyb2xsTGVmdDogZWxlbWVudC5zY3JvbGxMZWZ0LFxuICAgICAgc2Nyb2xsVG9wOiBlbGVtZW50LnNjcm9sbFRvcFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBzY3JvbGxMZWZ0OiBlbGVtZW50LnNjcm9sbFgsXG4gICAgc2Nyb2xsVG9wOiBlbGVtZW50LnNjcm9sbFlcbiAgfTtcbn1cbmZ1bmN0aW9uIGdldFBhcmVudE5vZGUobm9kZSkge1xuICBpZiAoZ2V0Tm9kZU5hbWUobm9kZSkgPT09ICdodG1sJykge1xuICAgIHJldHVybiBub2RlO1xuICB9XG4gIGNvbnN0IHJlc3VsdCA9XG4gIC8vIFN0ZXAgaW50byB0aGUgc2hhZG93IERPTSBvZiB0aGUgcGFyZW50IG9mIGEgc2xvdHRlZCBub2RlLlxuICBub2RlLmFzc2lnbmVkU2xvdCB8fFxuICAvLyBET00gRWxlbWVudCBkZXRlY3RlZC5cbiAgbm9kZS5wYXJlbnROb2RlIHx8XG4gIC8vIFNoYWRvd1Jvb3QgZGV0ZWN0ZWQuXG4gIGlzU2hhZG93Um9vdChub2RlKSAmJiBub2RlLmhvc3QgfHxcbiAgLy8gRmFsbGJhY2suXG4gIGdldERvY3VtZW50RWxlbWVudChub2RlKTtcbiAgcmV0dXJuIGlzU2hhZG93Um9vdChyZXN1bHQpID8gcmVzdWx0Lmhvc3QgOiByZXN1bHQ7XG59XG5mdW5jdGlvbiBnZXROZWFyZXN0T3ZlcmZsb3dBbmNlc3Rvcihub2RlKSB7XG4gIGNvbnN0IHBhcmVudE5vZGUgPSBnZXRQYXJlbnROb2RlKG5vZGUpO1xuICBpZiAoaXNMYXN0VHJhdmVyc2FibGVOb2RlKHBhcmVudE5vZGUpKSB7XG4gICAgcmV0dXJuIG5vZGUub3duZXJEb2N1bWVudCA/IG5vZGUub3duZXJEb2N1bWVudC5ib2R5IDogbm9kZS5ib2R5O1xuICB9XG4gIGlmIChpc0hUTUxFbGVtZW50KHBhcmVudE5vZGUpICYmIGlzT3ZlcmZsb3dFbGVtZW50KHBhcmVudE5vZGUpKSB7XG4gICAgcmV0dXJuIHBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIGdldE5lYXJlc3RPdmVyZmxvd0FuY2VzdG9yKHBhcmVudE5vZGUpO1xufVxuZnVuY3Rpb24gZ2V0T3ZlcmZsb3dBbmNlc3RvcnMobm9kZSwgbGlzdCwgdHJhdmVyc2VJZnJhbWVzKSB7XG4gIHZhciBfbm9kZSRvd25lckRvY3VtZW50MjtcbiAgaWYgKGxpc3QgPT09IHZvaWQgMCkge1xuICAgIGxpc3QgPSBbXTtcbiAgfVxuICBpZiAodHJhdmVyc2VJZnJhbWVzID09PSB2b2lkIDApIHtcbiAgICB0cmF2ZXJzZUlmcmFtZXMgPSB0cnVlO1xuICB9XG4gIGNvbnN0IHNjcm9sbGFibGVBbmNlc3RvciA9IGdldE5lYXJlc3RPdmVyZmxvd0FuY2VzdG9yKG5vZGUpO1xuICBjb25zdCBpc0JvZHkgPSBzY3JvbGxhYmxlQW5jZXN0b3IgPT09ICgoX25vZGUkb3duZXJEb2N1bWVudDIgPSBub2RlLm93bmVyRG9jdW1lbnQpID09IG51bGwgPyB2b2lkIDAgOiBfbm9kZSRvd25lckRvY3VtZW50Mi5ib2R5KTtcbiAgY29uc3Qgd2luID0gZ2V0V2luZG93KHNjcm9sbGFibGVBbmNlc3Rvcik7XG4gIGlmIChpc0JvZHkpIHtcbiAgICBjb25zdCBmcmFtZUVsZW1lbnQgPSBnZXRGcmFtZUVsZW1lbnQod2luKTtcbiAgICByZXR1cm4gbGlzdC5jb25jYXQod2luLCB3aW4udmlzdWFsVmlld3BvcnQgfHwgW10sIGlzT3ZlcmZsb3dFbGVtZW50KHNjcm9sbGFibGVBbmNlc3RvcikgPyBzY3JvbGxhYmxlQW5jZXN0b3IgOiBbXSwgZnJhbWVFbGVtZW50ICYmIHRyYXZlcnNlSWZyYW1lcyA/IGdldE92ZXJmbG93QW5jZXN0b3JzKGZyYW1lRWxlbWVudCkgOiBbXSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3QuY29uY2F0KHNjcm9sbGFibGVBbmNlc3RvciwgZ2V0T3ZlcmZsb3dBbmNlc3RvcnMoc2Nyb2xsYWJsZUFuY2VzdG9yLCBbXSwgdHJhdmVyc2VJZnJhbWVzKSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldEZyYW1lRWxlbWVudCh3aW4pIHtcbiAgcmV0dXJuIHdpbi5wYXJlbnQgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKHdpbi5wYXJlbnQpID8gd2luLmZyYW1lRWxlbWVudCA6IG51bGw7XG59XG5cbmV4cG9ydCB7IGdldENvbXB1dGVkU3R5bGUsIGdldENvbnRhaW5pbmdCbG9jaywgZ2V0RG9jdW1lbnRFbGVtZW50LCBnZXRGcmFtZUVsZW1lbnQsIGdldE5lYXJlc3RPdmVyZmxvd0FuY2VzdG9yLCBnZXROb2RlTmFtZSwgZ2V0Tm9kZVNjcm9sbCwgZ2V0T3ZlcmZsb3dBbmNlc3RvcnMsIGdldFBhcmVudE5vZGUsIGdldFdpbmRvdywgaXNDb250YWluaW5nQmxvY2ssIGlzRWxlbWVudCwgaXNIVE1MRWxlbWVudCwgaXNMYXN0VHJhdmVyc2FibGVOb2RlLCBpc05vZGUsIGlzT3ZlcmZsb3dFbGVtZW50LCBpc1NoYWRvd1Jvb3QsIGlzVGFibGVFbGVtZW50LCBpc1RvcExheWVyLCBpc1dlYktpdCB9O1xuIiwiaW1wb3J0IHsgcmVjdFRvQ2xpZW50UmVjdCwgYXJyb3cgYXMgYXJyb3ckMSwgYXV0b1BsYWNlbWVudCBhcyBhdXRvUGxhY2VtZW50JDEsIGRldGVjdE92ZXJmbG93IGFzIGRldGVjdE92ZXJmbG93JDEsIGZsaXAgYXMgZmxpcCQxLCBoaWRlIGFzIGhpZGUkMSwgaW5saW5lIGFzIGlubGluZSQxLCBsaW1pdFNoaWZ0IGFzIGxpbWl0U2hpZnQkMSwgb2Zmc2V0IGFzIG9mZnNldCQxLCBzaGlmdCBhcyBzaGlmdCQxLCBzaXplIGFzIHNpemUkMSwgY29tcHV0ZVBvc2l0aW9uIGFzIGNvbXB1dGVQb3NpdGlvbiQxIH0gZnJvbSAnQGZsb2F0aW5nLXVpL2NvcmUnO1xuaW1wb3J0IHsgcm91bmQsIGNyZWF0ZUNvb3JkcywgbWF4LCBtaW4sIGZsb29yIH0gZnJvbSAnQGZsb2F0aW5nLXVpL3V0aWxzJztcbmltcG9ydCB7IGdldENvbXB1dGVkU3R5bGUgYXMgZ2V0Q29tcHV0ZWRTdHlsZSQxLCBpc0hUTUxFbGVtZW50LCBpc0VsZW1lbnQsIGdldFdpbmRvdywgaXNXZWJLaXQsIGdldEZyYW1lRWxlbWVudCwgZ2V0Tm9kZVNjcm9sbCwgZ2V0RG9jdW1lbnRFbGVtZW50LCBpc1RvcExheWVyLCBnZXROb2RlTmFtZSwgaXNPdmVyZmxvd0VsZW1lbnQsIGdldE92ZXJmbG93QW5jZXN0b3JzLCBnZXRQYXJlbnROb2RlLCBpc0xhc3RUcmF2ZXJzYWJsZU5vZGUsIGlzQ29udGFpbmluZ0Jsb2NrLCBpc1RhYmxlRWxlbWVudCwgZ2V0Q29udGFpbmluZ0Jsb2NrIH0gZnJvbSAnQGZsb2F0aW5nLXVpL3V0aWxzL2RvbSc7XG5leHBvcnQgeyBnZXRPdmVyZmxvd0FuY2VzdG9ycyB9IGZyb20gJ0BmbG9hdGluZy11aS91dGlscy9kb20nO1xuXG5mdW5jdGlvbiBnZXRDc3NEaW1lbnNpb25zKGVsZW1lbnQpIHtcbiAgY29uc3QgY3NzID0gZ2V0Q29tcHV0ZWRTdHlsZSQxKGVsZW1lbnQpO1xuICAvLyBJbiB0ZXN0aW5nIGVudmlyb25tZW50cywgdGhlIGB3aWR0aGAgYW5kIGBoZWlnaHRgIHByb3BlcnRpZXMgYXJlIGVtcHR5XG4gIC8vIHN0cmluZ3MgZm9yIFNWRyBlbGVtZW50cywgcmV0dXJuaW5nIE5hTi4gRmFsbGJhY2sgdG8gYDBgIGluIHRoaXMgY2FzZS5cbiAgbGV0IHdpZHRoID0gcGFyc2VGbG9hdChjc3Mud2lkdGgpIHx8IDA7XG4gIGxldCBoZWlnaHQgPSBwYXJzZUZsb2F0KGNzcy5oZWlnaHQpIHx8IDA7XG4gIGNvbnN0IGhhc09mZnNldCA9IGlzSFRNTEVsZW1lbnQoZWxlbWVudCk7XG4gIGNvbnN0IG9mZnNldFdpZHRoID0gaGFzT2Zmc2V0ID8gZWxlbWVudC5vZmZzZXRXaWR0aCA6IHdpZHRoO1xuICBjb25zdCBvZmZzZXRIZWlnaHQgPSBoYXNPZmZzZXQgPyBlbGVtZW50Lm9mZnNldEhlaWdodCA6IGhlaWdodDtcbiAgY29uc3Qgc2hvdWxkRmFsbGJhY2sgPSByb3VuZCh3aWR0aCkgIT09IG9mZnNldFdpZHRoIHx8IHJvdW5kKGhlaWdodCkgIT09IG9mZnNldEhlaWdodDtcbiAgaWYgKHNob3VsZEZhbGxiYWNrKSB7XG4gICAgd2lkdGggPSBvZmZzZXRXaWR0aDtcbiAgICBoZWlnaHQgPSBvZmZzZXRIZWlnaHQ7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICB3aWR0aCxcbiAgICBoZWlnaHQsXG4gICAgJDogc2hvdWxkRmFsbGJhY2tcbiAgfTtcbn1cblxuZnVuY3Rpb24gdW53cmFwRWxlbWVudChlbGVtZW50KSB7XG4gIHJldHVybiAhaXNFbGVtZW50KGVsZW1lbnQpID8gZWxlbWVudC5jb250ZXh0RWxlbWVudCA6IGVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGdldFNjYWxlKGVsZW1lbnQpIHtcbiAgY29uc3QgZG9tRWxlbWVudCA9IHVud3JhcEVsZW1lbnQoZWxlbWVudCk7XG4gIGlmICghaXNIVE1MRWxlbWVudChkb21FbGVtZW50KSkge1xuICAgIHJldHVybiBjcmVhdGVDb29yZHMoMSk7XG4gIH1cbiAgY29uc3QgcmVjdCA9IGRvbUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIGNvbnN0IHtcbiAgICB3aWR0aCxcbiAgICBoZWlnaHQsXG4gICAgJFxuICB9ID0gZ2V0Q3NzRGltZW5zaW9ucyhkb21FbGVtZW50KTtcbiAgbGV0IHggPSAoJCA/IHJvdW5kKHJlY3Qud2lkdGgpIDogcmVjdC53aWR0aCkgLyB3aWR0aDtcbiAgbGV0IHkgPSAoJCA/IHJvdW5kKHJlY3QuaGVpZ2h0KSA6IHJlY3QuaGVpZ2h0KSAvIGhlaWdodDtcblxuICAvLyAwLCBOYU4sIG9yIEluZmluaXR5IHNob3VsZCBhbHdheXMgZmFsbGJhY2sgdG8gMS5cblxuICBpZiAoIXggfHwgIU51bWJlci5pc0Zpbml0ZSh4KSkge1xuICAgIHggPSAxO1xuICB9XG4gIGlmICgheSB8fCAhTnVtYmVyLmlzRmluaXRlKHkpKSB7XG4gICAgeSA9IDE7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICB4LFxuICAgIHlcbiAgfTtcbn1cblxuY29uc3Qgbm9PZmZzZXRzID0gLyojX19QVVJFX18qL2NyZWF0ZUNvb3JkcygwKTtcbmZ1bmN0aW9uIGdldFZpc3VhbE9mZnNldHMoZWxlbWVudCkge1xuICBjb25zdCB3aW4gPSBnZXRXaW5kb3coZWxlbWVudCk7XG4gIGlmICghaXNXZWJLaXQoKSB8fCAhd2luLnZpc3VhbFZpZXdwb3J0KSB7XG4gICAgcmV0dXJuIG5vT2Zmc2V0cztcbiAgfVxuICByZXR1cm4ge1xuICAgIHg6IHdpbi52aXN1YWxWaWV3cG9ydC5vZmZzZXRMZWZ0LFxuICAgIHk6IHdpbi52aXN1YWxWaWV3cG9ydC5vZmZzZXRUb3BcbiAgfTtcbn1cbmZ1bmN0aW9uIHNob3VsZEFkZFZpc3VhbE9mZnNldHMoZWxlbWVudCwgaXNGaXhlZCwgZmxvYXRpbmdPZmZzZXRQYXJlbnQpIHtcbiAgaWYgKGlzRml4ZWQgPT09IHZvaWQgMCkge1xuICAgIGlzRml4ZWQgPSBmYWxzZTtcbiAgfVxuICBpZiAoIWZsb2F0aW5nT2Zmc2V0UGFyZW50IHx8IGlzRml4ZWQgJiYgZmxvYXRpbmdPZmZzZXRQYXJlbnQgIT09IGdldFdpbmRvdyhlbGVtZW50KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gaXNGaXhlZDtcbn1cblxuZnVuY3Rpb24gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQsIGluY2x1ZGVTY2FsZSwgaXNGaXhlZFN0cmF0ZWd5LCBvZmZzZXRQYXJlbnQpIHtcbiAgaWYgKGluY2x1ZGVTY2FsZSA9PT0gdm9pZCAwKSB7XG4gICAgaW5jbHVkZVNjYWxlID0gZmFsc2U7XG4gIH1cbiAgaWYgKGlzRml4ZWRTdHJhdGVneSA9PT0gdm9pZCAwKSB7XG4gICAgaXNGaXhlZFN0cmF0ZWd5ID0gZmFsc2U7XG4gIH1cbiAgY29uc3QgY2xpZW50UmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIGNvbnN0IGRvbUVsZW1lbnQgPSB1bndyYXBFbGVtZW50KGVsZW1lbnQpO1xuICBsZXQgc2NhbGUgPSBjcmVhdGVDb29yZHMoMSk7XG4gIGlmIChpbmNsdWRlU2NhbGUpIHtcbiAgICBpZiAob2Zmc2V0UGFyZW50KSB7XG4gICAgICBpZiAoaXNFbGVtZW50KG9mZnNldFBhcmVudCkpIHtcbiAgICAgICAgc2NhbGUgPSBnZXRTY2FsZShvZmZzZXRQYXJlbnQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzY2FsZSA9IGdldFNjYWxlKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuICBjb25zdCB2aXN1YWxPZmZzZXRzID0gc2hvdWxkQWRkVmlzdWFsT2Zmc2V0cyhkb21FbGVtZW50LCBpc0ZpeGVkU3RyYXRlZ3ksIG9mZnNldFBhcmVudCkgPyBnZXRWaXN1YWxPZmZzZXRzKGRvbUVsZW1lbnQpIDogY3JlYXRlQ29vcmRzKDApO1xuICBsZXQgeCA9IChjbGllbnRSZWN0LmxlZnQgKyB2aXN1YWxPZmZzZXRzLngpIC8gc2NhbGUueDtcbiAgbGV0IHkgPSAoY2xpZW50UmVjdC50b3AgKyB2aXN1YWxPZmZzZXRzLnkpIC8gc2NhbGUueTtcbiAgbGV0IHdpZHRoID0gY2xpZW50UmVjdC53aWR0aCAvIHNjYWxlLng7XG4gIGxldCBoZWlnaHQgPSBjbGllbnRSZWN0LmhlaWdodCAvIHNjYWxlLnk7XG4gIGlmIChkb21FbGVtZW50KSB7XG4gICAgY29uc3Qgd2luID0gZ2V0V2luZG93KGRvbUVsZW1lbnQpO1xuICAgIGNvbnN0IG9mZnNldFdpbiA9IG9mZnNldFBhcmVudCAmJiBpc0VsZW1lbnQob2Zmc2V0UGFyZW50KSA/IGdldFdpbmRvdyhvZmZzZXRQYXJlbnQpIDogb2Zmc2V0UGFyZW50O1xuICAgIGxldCBjdXJyZW50V2luID0gd2luO1xuICAgIGxldCBjdXJyZW50SUZyYW1lID0gZ2V0RnJhbWVFbGVtZW50KGN1cnJlbnRXaW4pO1xuICAgIHdoaWxlIChjdXJyZW50SUZyYW1lICYmIG9mZnNldFBhcmVudCAmJiBvZmZzZXRXaW4gIT09IGN1cnJlbnRXaW4pIHtcbiAgICAgIGNvbnN0IGlmcmFtZVNjYWxlID0gZ2V0U2NhbGUoY3VycmVudElGcmFtZSk7XG4gICAgICBjb25zdCBpZnJhbWVSZWN0ID0gY3VycmVudElGcmFtZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IGNzcyA9IGdldENvbXB1dGVkU3R5bGUkMShjdXJyZW50SUZyYW1lKTtcbiAgICAgIGNvbnN0IGxlZnQgPSBpZnJhbWVSZWN0LmxlZnQgKyAoY3VycmVudElGcmFtZS5jbGllbnRMZWZ0ICsgcGFyc2VGbG9hdChjc3MucGFkZGluZ0xlZnQpKSAqIGlmcmFtZVNjYWxlLng7XG4gICAgICBjb25zdCB0b3AgPSBpZnJhbWVSZWN0LnRvcCArIChjdXJyZW50SUZyYW1lLmNsaWVudFRvcCArIHBhcnNlRmxvYXQoY3NzLnBhZGRpbmdUb3ApKSAqIGlmcmFtZVNjYWxlLnk7XG4gICAgICB4ICo9IGlmcmFtZVNjYWxlLng7XG4gICAgICB5ICo9IGlmcmFtZVNjYWxlLnk7XG4gICAgICB3aWR0aCAqPSBpZnJhbWVTY2FsZS54O1xuICAgICAgaGVpZ2h0ICo9IGlmcmFtZVNjYWxlLnk7XG4gICAgICB4ICs9IGxlZnQ7XG4gICAgICB5ICs9IHRvcDtcbiAgICAgIGN1cnJlbnRXaW4gPSBnZXRXaW5kb3coY3VycmVudElGcmFtZSk7XG4gICAgICBjdXJyZW50SUZyYW1lID0gZ2V0RnJhbWVFbGVtZW50KGN1cnJlbnRXaW4pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVjdFRvQ2xpZW50UmVjdCh7XG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIHgsXG4gICAgeVxuICB9KTtcbn1cblxuLy8gSWYgPGh0bWw+IGhhcyBhIENTUyB3aWR0aCBncmVhdGVyIHRoYW4gdGhlIHZpZXdwb3J0LCB0aGVuIHRoaXMgd2lsbCBiZVxuLy8gaW5jb3JyZWN0IGZvciBSVEwuXG5mdW5jdGlvbiBnZXRXaW5kb3dTY3JvbGxCYXJYKGVsZW1lbnQsIHJlY3QpIHtcbiAgY29uc3QgbGVmdFNjcm9sbCA9IGdldE5vZGVTY3JvbGwoZWxlbWVudCkuc2Nyb2xsTGVmdDtcbiAgaWYgKCFyZWN0KSB7XG4gICAgcmV0dXJuIGdldEJvdW5kaW5nQ2xpZW50UmVjdChnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkpLmxlZnQgKyBsZWZ0U2Nyb2xsO1xuICB9XG4gIHJldHVybiByZWN0LmxlZnQgKyBsZWZ0U2Nyb2xsO1xufVxuXG5mdW5jdGlvbiBnZXRIVE1MT2Zmc2V0KGRvY3VtZW50RWxlbWVudCwgc2Nyb2xsKSB7XG4gIGNvbnN0IGh0bWxSZWN0ID0gZG9jdW1lbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCB4ID0gaHRtbFJlY3QubGVmdCArIHNjcm9sbC5zY3JvbGxMZWZ0IC0gZ2V0V2luZG93U2Nyb2xsQmFyWChkb2N1bWVudEVsZW1lbnQsIGh0bWxSZWN0KTtcbiAgY29uc3QgeSA9IGh0bWxSZWN0LnRvcCArIHNjcm9sbC5zY3JvbGxUb3A7XG4gIHJldHVybiB7XG4gICAgeCxcbiAgICB5XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRPZmZzZXRQYXJlbnRSZWxhdGl2ZVJlY3RUb1ZpZXdwb3J0UmVsYXRpdmVSZWN0KF9yZWYpIHtcbiAgbGV0IHtcbiAgICBlbGVtZW50cyxcbiAgICByZWN0LFxuICAgIG9mZnNldFBhcmVudCxcbiAgICBzdHJhdGVneVxuICB9ID0gX3JlZjtcbiAgY29uc3QgaXNGaXhlZCA9IHN0cmF0ZWd5ID09PSAnZml4ZWQnO1xuICBjb25zdCBkb2N1bWVudEVsZW1lbnQgPSBnZXREb2N1bWVudEVsZW1lbnQob2Zmc2V0UGFyZW50KTtcbiAgY29uc3QgdG9wTGF5ZXIgPSBlbGVtZW50cyA/IGlzVG9wTGF5ZXIoZWxlbWVudHMuZmxvYXRpbmcpIDogZmFsc2U7XG4gIGlmIChvZmZzZXRQYXJlbnQgPT09IGRvY3VtZW50RWxlbWVudCB8fCB0b3BMYXllciAmJiBpc0ZpeGVkKSB7XG4gICAgcmV0dXJuIHJlY3Q7XG4gIH1cbiAgbGV0IHNjcm9sbCA9IHtcbiAgICBzY3JvbGxMZWZ0OiAwLFxuICAgIHNjcm9sbFRvcDogMFxuICB9O1xuICBsZXQgc2NhbGUgPSBjcmVhdGVDb29yZHMoMSk7XG4gIGNvbnN0IG9mZnNldHMgPSBjcmVhdGVDb29yZHMoMCk7XG4gIGNvbnN0IGlzT2Zmc2V0UGFyZW50QW5FbGVtZW50ID0gaXNIVE1MRWxlbWVudChvZmZzZXRQYXJlbnQpO1xuICBpZiAoaXNPZmZzZXRQYXJlbnRBbkVsZW1lbnQgfHwgIWlzT2Zmc2V0UGFyZW50QW5FbGVtZW50ICYmICFpc0ZpeGVkKSB7XG4gICAgaWYgKGdldE5vZGVOYW1lKG9mZnNldFBhcmVudCkgIT09ICdib2R5JyB8fCBpc092ZXJmbG93RWxlbWVudChkb2N1bWVudEVsZW1lbnQpKSB7XG4gICAgICBzY3JvbGwgPSBnZXROb2RlU2Nyb2xsKG9mZnNldFBhcmVudCk7XG4gICAgfVxuICAgIGlmIChpc09mZnNldFBhcmVudEFuRWxlbWVudCkge1xuICAgICAgY29uc3Qgb2Zmc2V0UmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChvZmZzZXRQYXJlbnQpO1xuICAgICAgc2NhbGUgPSBnZXRTY2FsZShvZmZzZXRQYXJlbnQpO1xuICAgICAgb2Zmc2V0cy54ID0gb2Zmc2V0UmVjdC54ICsgb2Zmc2V0UGFyZW50LmNsaWVudExlZnQ7XG4gICAgICBvZmZzZXRzLnkgPSBvZmZzZXRSZWN0LnkgKyBvZmZzZXRQYXJlbnQuY2xpZW50VG9wO1xuICAgIH1cbiAgfVxuICBjb25zdCBodG1sT2Zmc2V0ID0gZG9jdW1lbnRFbGVtZW50ICYmICFpc09mZnNldFBhcmVudEFuRWxlbWVudCAmJiAhaXNGaXhlZCA/IGdldEhUTUxPZmZzZXQoZG9jdW1lbnRFbGVtZW50LCBzY3JvbGwpIDogY3JlYXRlQ29vcmRzKDApO1xuICByZXR1cm4ge1xuICAgIHdpZHRoOiByZWN0LndpZHRoICogc2NhbGUueCxcbiAgICBoZWlnaHQ6IHJlY3QuaGVpZ2h0ICogc2NhbGUueSxcbiAgICB4OiByZWN0LnggKiBzY2FsZS54IC0gc2Nyb2xsLnNjcm9sbExlZnQgKiBzY2FsZS54ICsgb2Zmc2V0cy54ICsgaHRtbE9mZnNldC54LFxuICAgIHk6IHJlY3QueSAqIHNjYWxlLnkgLSBzY3JvbGwuc2Nyb2xsVG9wICogc2NhbGUueSArIG9mZnNldHMueSArIGh0bWxPZmZzZXQueVxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRDbGllbnRSZWN0cyhlbGVtZW50KSB7XG4gIHJldHVybiBBcnJheS5mcm9tKGVsZW1lbnQuZ2V0Q2xpZW50UmVjdHMoKSk7XG59XG5cbi8vIEdldHMgdGhlIGVudGlyZSBzaXplIG9mIHRoZSBzY3JvbGxhYmxlIGRvY3VtZW50IGFyZWEsIGV2ZW4gZXh0ZW5kaW5nIG91dHNpZGVcbi8vIG9mIHRoZSBgPGh0bWw+YCBhbmQgYDxib2R5PmAgcmVjdCBib3VuZHMgaWYgaG9yaXpvbnRhbGx5IHNjcm9sbGFibGUuXG5mdW5jdGlvbiBnZXREb2N1bWVudFJlY3QoZWxlbWVudCkge1xuICBjb25zdCBodG1sID0gZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpO1xuICBjb25zdCBzY3JvbGwgPSBnZXROb2RlU2Nyb2xsKGVsZW1lbnQpO1xuICBjb25zdCBib2R5ID0gZWxlbWVudC5vd25lckRvY3VtZW50LmJvZHk7XG4gIGNvbnN0IHdpZHRoID0gbWF4KGh0bWwuc2Nyb2xsV2lkdGgsIGh0bWwuY2xpZW50V2lkdGgsIGJvZHkuc2Nyb2xsV2lkdGgsIGJvZHkuY2xpZW50V2lkdGgpO1xuICBjb25zdCBoZWlnaHQgPSBtYXgoaHRtbC5zY3JvbGxIZWlnaHQsIGh0bWwuY2xpZW50SGVpZ2h0LCBib2R5LnNjcm9sbEhlaWdodCwgYm9keS5jbGllbnRIZWlnaHQpO1xuICBsZXQgeCA9IC1zY3JvbGwuc2Nyb2xsTGVmdCArIGdldFdpbmRvd1Njcm9sbEJhclgoZWxlbWVudCk7XG4gIGNvbnN0IHkgPSAtc2Nyb2xsLnNjcm9sbFRvcDtcbiAgaWYgKGdldENvbXB1dGVkU3R5bGUkMShib2R5KS5kaXJlY3Rpb24gPT09ICdydGwnKSB7XG4gICAgeCArPSBtYXgoaHRtbC5jbGllbnRXaWR0aCwgYm9keS5jbGllbnRXaWR0aCkgLSB3aWR0aDtcbiAgfVxuICByZXR1cm4ge1xuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICB4LFxuICAgIHlcbiAgfTtcbn1cblxuLy8gU2FmZXR5IGNoZWNrOiBlbnN1cmUgdGhlIHNjcm9sbGJhciBzcGFjZSBpcyByZWFzb25hYmxlIGluIGNhc2UgdGhpc1xuLy8gY2FsY3VsYXRpb24gaXMgYWZmZWN0ZWQgYnkgdW51c3VhbCBzdHlsZXMuXG4vLyBNb3N0IHNjcm9sbGJhcnMgbGVhdmUgMTUtMThweCBvZiBzcGFjZS5cbmNvbnN0IFNDUk9MTEJBUl9NQVggPSAyNTtcbmZ1bmN0aW9uIGdldFZpZXdwb3J0UmVjdChlbGVtZW50LCBzdHJhdGVneSkge1xuICBjb25zdCB3aW4gPSBnZXRXaW5kb3coZWxlbWVudCk7XG4gIGNvbnN0IGh0bWwgPSBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCk7XG4gIGNvbnN0IHZpc3VhbFZpZXdwb3J0ID0gd2luLnZpc3VhbFZpZXdwb3J0O1xuICBsZXQgd2lkdGggPSBodG1sLmNsaWVudFdpZHRoO1xuICBsZXQgaGVpZ2h0ID0gaHRtbC5jbGllbnRIZWlnaHQ7XG4gIGxldCB4ID0gMDtcbiAgbGV0IHkgPSAwO1xuICBpZiAodmlzdWFsVmlld3BvcnQpIHtcbiAgICB3aWR0aCA9IHZpc3VhbFZpZXdwb3J0LndpZHRoO1xuICAgIGhlaWdodCA9IHZpc3VhbFZpZXdwb3J0LmhlaWdodDtcbiAgICBjb25zdCB2aXN1YWxWaWV3cG9ydEJhc2VkID0gaXNXZWJLaXQoKTtcbiAgICBpZiAoIXZpc3VhbFZpZXdwb3J0QmFzZWQgfHwgdmlzdWFsVmlld3BvcnRCYXNlZCAmJiBzdHJhdGVneSA9PT0gJ2ZpeGVkJykge1xuICAgICAgeCA9IHZpc3VhbFZpZXdwb3J0Lm9mZnNldExlZnQ7XG4gICAgICB5ID0gdmlzdWFsVmlld3BvcnQub2Zmc2V0VG9wO1xuICAgIH1cbiAgfVxuICBjb25zdCB3aW5kb3dTY3JvbGxiYXJYID0gZ2V0V2luZG93U2Nyb2xsQmFyWChodG1sKTtcbiAgLy8gPGh0bWw+IGBvdmVyZmxvdzogaGlkZGVuYCArIGBzY3JvbGxiYXItZ3V0dGVyOiBzdGFibGVgIHJlZHVjZXMgdGhlXG4gIC8vIHZpc3VhbCB3aWR0aCBvZiB0aGUgPGh0bWw+IGJ1dCB0aGlzIGlzIG5vdCBjb25zaWRlcmVkIGluIHRoZSBzaXplXG4gIC8vIG9mIGBodG1sLmNsaWVudFdpZHRoYC5cbiAgaWYgKHdpbmRvd1Njcm9sbGJhclggPD0gMCkge1xuICAgIGNvbnN0IGRvYyA9IGh0bWwub3duZXJEb2N1bWVudDtcbiAgICBjb25zdCBib2R5ID0gZG9jLmJvZHk7XG4gICAgY29uc3QgYm9keVN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoYm9keSk7XG4gICAgY29uc3QgYm9keU1hcmdpbklubGluZSA9IGRvYy5jb21wYXRNb2RlID09PSAnQ1NTMUNvbXBhdCcgPyBwYXJzZUZsb2F0KGJvZHlTdHlsZXMubWFyZ2luTGVmdCkgKyBwYXJzZUZsb2F0KGJvZHlTdHlsZXMubWFyZ2luUmlnaHQpIHx8IDAgOiAwO1xuICAgIGNvbnN0IGNsaXBwaW5nU3RhYmxlU2Nyb2xsYmFyV2lkdGggPSBNYXRoLmFicyhodG1sLmNsaWVudFdpZHRoIC0gYm9keS5jbGllbnRXaWR0aCAtIGJvZHlNYXJnaW5JbmxpbmUpO1xuICAgIGlmIChjbGlwcGluZ1N0YWJsZVNjcm9sbGJhcldpZHRoIDw9IFNDUk9MTEJBUl9NQVgpIHtcbiAgICAgIHdpZHRoIC09IGNsaXBwaW5nU3RhYmxlU2Nyb2xsYmFyV2lkdGg7XG4gICAgfVxuICB9IGVsc2UgaWYgKHdpbmRvd1Njcm9sbGJhclggPD0gU0NST0xMQkFSX01BWCkge1xuICAgIC8vIElmIHRoZSA8Ym9keT4gc2Nyb2xsYmFyIGlzIG9uIHRoZSBsZWZ0LCB0aGUgd2lkdGggbmVlZHMgdG8gYmUgZXh0ZW5kZWRcbiAgICAvLyBieSB0aGUgc2Nyb2xsYmFyIGFtb3VudCBzbyB0aGVyZSBpc24ndCBleHRyYSBzcGFjZSBvbiB0aGUgcmlnaHQuXG4gICAgd2lkdGggKz0gd2luZG93U2Nyb2xsYmFyWDtcbiAgfVxuICByZXR1cm4ge1xuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICB4LFxuICAgIHlcbiAgfTtcbn1cblxuLy8gUmV0dXJucyB0aGUgaW5uZXIgY2xpZW50IHJlY3QsIHN1YnRyYWN0aW5nIHNjcm9sbGJhcnMgaWYgcHJlc2VudC5cbmZ1bmN0aW9uIGdldElubmVyQm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQsIHN0cmF0ZWd5KSB7XG4gIGNvbnN0IGNsaWVudFJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCwgdHJ1ZSwgc3RyYXRlZ3kgPT09ICdmaXhlZCcpO1xuICBjb25zdCB0b3AgPSBjbGllbnRSZWN0LnRvcCArIGVsZW1lbnQuY2xpZW50VG9wO1xuICBjb25zdCBsZWZ0ID0gY2xpZW50UmVjdC5sZWZ0ICsgZWxlbWVudC5jbGllbnRMZWZ0O1xuICBjb25zdCBzY2FsZSA9IGlzSFRNTEVsZW1lbnQoZWxlbWVudCkgPyBnZXRTY2FsZShlbGVtZW50KSA6IGNyZWF0ZUNvb3JkcygxKTtcbiAgY29uc3Qgd2lkdGggPSBlbGVtZW50LmNsaWVudFdpZHRoICogc2NhbGUueDtcbiAgY29uc3QgaGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQgKiBzY2FsZS55O1xuICBjb25zdCB4ID0gbGVmdCAqIHNjYWxlLng7XG4gIGNvbnN0IHkgPSB0b3AgKiBzY2FsZS55O1xuICByZXR1cm4ge1xuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICB4LFxuICAgIHlcbiAgfTtcbn1cbmZ1bmN0aW9uIGdldENsaWVudFJlY3RGcm9tQ2xpcHBpbmdBbmNlc3RvcihlbGVtZW50LCBjbGlwcGluZ0FuY2VzdG9yLCBzdHJhdGVneSkge1xuICBsZXQgcmVjdDtcbiAgaWYgKGNsaXBwaW5nQW5jZXN0b3IgPT09ICd2aWV3cG9ydCcpIHtcbiAgICByZWN0ID0gZ2V0Vmlld3BvcnRSZWN0KGVsZW1lbnQsIHN0cmF0ZWd5KTtcbiAgfSBlbHNlIGlmIChjbGlwcGluZ0FuY2VzdG9yID09PSAnZG9jdW1lbnQnKSB7XG4gICAgcmVjdCA9IGdldERvY3VtZW50UmVjdChnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkpO1xuICB9IGVsc2UgaWYgKGlzRWxlbWVudChjbGlwcGluZ0FuY2VzdG9yKSkge1xuICAgIHJlY3QgPSBnZXRJbm5lckJvdW5kaW5nQ2xpZW50UmVjdChjbGlwcGluZ0FuY2VzdG9yLCBzdHJhdGVneSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgdmlzdWFsT2Zmc2V0cyA9IGdldFZpc3VhbE9mZnNldHMoZWxlbWVudCk7XG4gICAgcmVjdCA9IHtcbiAgICAgIHg6IGNsaXBwaW5nQW5jZXN0b3IueCAtIHZpc3VhbE9mZnNldHMueCxcbiAgICAgIHk6IGNsaXBwaW5nQW5jZXN0b3IueSAtIHZpc3VhbE9mZnNldHMueSxcbiAgICAgIHdpZHRoOiBjbGlwcGluZ0FuY2VzdG9yLndpZHRoLFxuICAgICAgaGVpZ2h0OiBjbGlwcGluZ0FuY2VzdG9yLmhlaWdodFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHJlY3RUb0NsaWVudFJlY3QocmVjdCk7XG59XG5mdW5jdGlvbiBoYXNGaXhlZFBvc2l0aW9uQW5jZXN0b3IoZWxlbWVudCwgc3RvcE5vZGUpIHtcbiAgY29uc3QgcGFyZW50Tm9kZSA9IGdldFBhcmVudE5vZGUoZWxlbWVudCk7XG4gIGlmIChwYXJlbnROb2RlID09PSBzdG9wTm9kZSB8fCAhaXNFbGVtZW50KHBhcmVudE5vZGUpIHx8IGlzTGFzdFRyYXZlcnNhYmxlTm9kZShwYXJlbnROb2RlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gZ2V0Q29tcHV0ZWRTdHlsZSQxKHBhcmVudE5vZGUpLnBvc2l0aW9uID09PSAnZml4ZWQnIHx8IGhhc0ZpeGVkUG9zaXRpb25BbmNlc3RvcihwYXJlbnROb2RlLCBzdG9wTm9kZSk7XG59XG5cbi8vIEEgXCJjbGlwcGluZyBhbmNlc3RvclwiIGlzIGFuIGBvdmVyZmxvd2AgZWxlbWVudCB3aXRoIHRoZSBjaGFyYWN0ZXJpc3RpYyBvZlxuLy8gY2xpcHBpbmcgKG9yIGhpZGluZykgY2hpbGQgZWxlbWVudHMuIFRoaXMgcmV0dXJucyBhbGwgY2xpcHBpbmcgYW5jZXN0b3JzXG4vLyBvZiB0aGUgZ2l2ZW4gZWxlbWVudCB1cCB0aGUgdHJlZS5cbmZ1bmN0aW9uIGdldENsaXBwaW5nRWxlbWVudEFuY2VzdG9ycyhlbGVtZW50LCBjYWNoZSkge1xuICBjb25zdCBjYWNoZWRSZXN1bHQgPSBjYWNoZS5nZXQoZWxlbWVudCk7XG4gIGlmIChjYWNoZWRSZXN1bHQpIHtcbiAgICByZXR1cm4gY2FjaGVkUmVzdWx0O1xuICB9XG4gIGxldCByZXN1bHQgPSBnZXRPdmVyZmxvd0FuY2VzdG9ycyhlbGVtZW50LCBbXSwgZmFsc2UpLmZpbHRlcihlbCA9PiBpc0VsZW1lbnQoZWwpICYmIGdldE5vZGVOYW1lKGVsKSAhPT0gJ2JvZHknKTtcbiAgbGV0IGN1cnJlbnRDb250YWluaW5nQmxvY2tDb21wdXRlZFN0eWxlID0gbnVsbDtcbiAgY29uc3QgZWxlbWVudElzRml4ZWQgPSBnZXRDb21wdXRlZFN0eWxlJDEoZWxlbWVudCkucG9zaXRpb24gPT09ICdmaXhlZCc7XG4gIGxldCBjdXJyZW50Tm9kZSA9IGVsZW1lbnRJc0ZpeGVkID8gZ2V0UGFyZW50Tm9kZShlbGVtZW50KSA6IGVsZW1lbnQ7XG5cbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQ1NTL0NvbnRhaW5pbmdfYmxvY2sjaWRlbnRpZnlpbmdfdGhlX2NvbnRhaW5pbmdfYmxvY2tcbiAgd2hpbGUgKGlzRWxlbWVudChjdXJyZW50Tm9kZSkgJiYgIWlzTGFzdFRyYXZlcnNhYmxlTm9kZShjdXJyZW50Tm9kZSkpIHtcbiAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSQxKGN1cnJlbnROb2RlKTtcbiAgICBjb25zdCBjdXJyZW50Tm9kZUlzQ29udGFpbmluZyA9IGlzQ29udGFpbmluZ0Jsb2NrKGN1cnJlbnROb2RlKTtcbiAgICBpZiAoIWN1cnJlbnROb2RlSXNDb250YWluaW5nICYmIGNvbXB1dGVkU3R5bGUucG9zaXRpb24gPT09ICdmaXhlZCcpIHtcbiAgICAgIGN1cnJlbnRDb250YWluaW5nQmxvY2tDb21wdXRlZFN0eWxlID0gbnVsbDtcbiAgICB9XG4gICAgY29uc3Qgc2hvdWxkRHJvcEN1cnJlbnROb2RlID0gZWxlbWVudElzRml4ZWQgPyAhY3VycmVudE5vZGVJc0NvbnRhaW5pbmcgJiYgIWN1cnJlbnRDb250YWluaW5nQmxvY2tDb21wdXRlZFN0eWxlIDogIWN1cnJlbnROb2RlSXNDb250YWluaW5nICYmIGNvbXB1dGVkU3R5bGUucG9zaXRpb24gPT09ICdzdGF0aWMnICYmICEhY3VycmVudENvbnRhaW5pbmdCbG9ja0NvbXB1dGVkU3R5bGUgJiYgKGN1cnJlbnRDb250YWluaW5nQmxvY2tDb21wdXRlZFN0eWxlLnBvc2l0aW9uID09PSAnYWJzb2x1dGUnIHx8IGN1cnJlbnRDb250YWluaW5nQmxvY2tDb21wdXRlZFN0eWxlLnBvc2l0aW9uID09PSAnZml4ZWQnKSB8fCBpc092ZXJmbG93RWxlbWVudChjdXJyZW50Tm9kZSkgJiYgIWN1cnJlbnROb2RlSXNDb250YWluaW5nICYmIGhhc0ZpeGVkUG9zaXRpb25BbmNlc3RvcihlbGVtZW50LCBjdXJyZW50Tm9kZSk7XG4gICAgaWYgKHNob3VsZERyb3BDdXJyZW50Tm9kZSkge1xuICAgICAgLy8gRHJvcCBub24tY29udGFpbmluZyBibG9ja3MuXG4gICAgICByZXN1bHQgPSByZXN1bHQuZmlsdGVyKGFuY2VzdG9yID0+IGFuY2VzdG9yICE9PSBjdXJyZW50Tm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlY29yZCBsYXN0IGNvbnRhaW5pbmcgYmxvY2sgZm9yIG5leHQgaXRlcmF0aW9uLlxuICAgICAgY3VycmVudENvbnRhaW5pbmdCbG9ja0NvbXB1dGVkU3R5bGUgPSBjb21wdXRlZFN0eWxlO1xuICAgIH1cbiAgICBjdXJyZW50Tm9kZSA9IGdldFBhcmVudE5vZGUoY3VycmVudE5vZGUpO1xuICB9XG4gIGNhY2hlLnNldChlbGVtZW50LCByZXN1bHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBHZXRzIHRoZSBtYXhpbXVtIGFyZWEgdGhhdCB0aGUgZWxlbWVudCBpcyB2aXNpYmxlIGluIGR1ZSB0byBhbnkgbnVtYmVyIG9mXG4vLyBjbGlwcGluZyBhbmNlc3RvcnMuXG5mdW5jdGlvbiBnZXRDbGlwcGluZ1JlY3QoX3JlZikge1xuICBsZXQge1xuICAgIGVsZW1lbnQsXG4gICAgYm91bmRhcnksXG4gICAgcm9vdEJvdW5kYXJ5LFxuICAgIHN0cmF0ZWd5XG4gIH0gPSBfcmVmO1xuICBjb25zdCBlbGVtZW50Q2xpcHBpbmdBbmNlc3RvcnMgPSBib3VuZGFyeSA9PT0gJ2NsaXBwaW5nQW5jZXN0b3JzJyA/IGlzVG9wTGF5ZXIoZWxlbWVudCkgPyBbXSA6IGdldENsaXBwaW5nRWxlbWVudEFuY2VzdG9ycyhlbGVtZW50LCB0aGlzLl9jKSA6IFtdLmNvbmNhdChib3VuZGFyeSk7XG4gIGNvbnN0IGNsaXBwaW5nQW5jZXN0b3JzID0gWy4uLmVsZW1lbnRDbGlwcGluZ0FuY2VzdG9ycywgcm9vdEJvdW5kYXJ5XTtcbiAgY29uc3QgZmlyc3RSZWN0ID0gZ2V0Q2xpZW50UmVjdEZyb21DbGlwcGluZ0FuY2VzdG9yKGVsZW1lbnQsIGNsaXBwaW5nQW5jZXN0b3JzWzBdLCBzdHJhdGVneSk7XG4gIGxldCB0b3AgPSBmaXJzdFJlY3QudG9wO1xuICBsZXQgcmlnaHQgPSBmaXJzdFJlY3QucmlnaHQ7XG4gIGxldCBib3R0b20gPSBmaXJzdFJlY3QuYm90dG9tO1xuICBsZXQgbGVmdCA9IGZpcnN0UmVjdC5sZWZ0O1xuICBmb3IgKGxldCBpID0gMTsgaSA8IGNsaXBwaW5nQW5jZXN0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcmVjdCA9IGdldENsaWVudFJlY3RGcm9tQ2xpcHBpbmdBbmNlc3RvcihlbGVtZW50LCBjbGlwcGluZ0FuY2VzdG9yc1tpXSwgc3RyYXRlZ3kpO1xuICAgIHRvcCA9IG1heChyZWN0LnRvcCwgdG9wKTtcbiAgICByaWdodCA9IG1pbihyZWN0LnJpZ2h0LCByaWdodCk7XG4gICAgYm90dG9tID0gbWluKHJlY3QuYm90dG9tLCBib3R0b20pO1xuICAgIGxlZnQgPSBtYXgocmVjdC5sZWZ0LCBsZWZ0KTtcbiAgfVxuICByZXR1cm4ge1xuICAgIHdpZHRoOiByaWdodCAtIGxlZnQsXG4gICAgaGVpZ2h0OiBib3R0b20gLSB0b3AsXG4gICAgeDogbGVmdCxcbiAgICB5OiB0b3BcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0RGltZW5zaW9ucyhlbGVtZW50KSB7XG4gIGNvbnN0IHtcbiAgICB3aWR0aCxcbiAgICBoZWlnaHRcbiAgfSA9IGdldENzc0RpbWVuc2lvbnMoZWxlbWVudCk7XG4gIHJldHVybiB7XG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFJlY3RSZWxhdGl2ZVRvT2Zmc2V0UGFyZW50KGVsZW1lbnQsIG9mZnNldFBhcmVudCwgc3RyYXRlZ3kpIHtcbiAgY29uc3QgaXNPZmZzZXRQYXJlbnRBbkVsZW1lbnQgPSBpc0hUTUxFbGVtZW50KG9mZnNldFBhcmVudCk7XG4gIGNvbnN0IGRvY3VtZW50RWxlbWVudCA9IGdldERvY3VtZW50RWxlbWVudChvZmZzZXRQYXJlbnQpO1xuICBjb25zdCBpc0ZpeGVkID0gc3RyYXRlZ3kgPT09ICdmaXhlZCc7XG4gIGNvbnN0IHJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCwgdHJ1ZSwgaXNGaXhlZCwgb2Zmc2V0UGFyZW50KTtcbiAgbGV0IHNjcm9sbCA9IHtcbiAgICBzY3JvbGxMZWZ0OiAwLFxuICAgIHNjcm9sbFRvcDogMFxuICB9O1xuICBjb25zdCBvZmZzZXRzID0gY3JlYXRlQ29vcmRzKDApO1xuXG4gIC8vIElmIHRoZSA8Ym9keT4gc2Nyb2xsYmFyIGFwcGVhcnMgb24gdGhlIGxlZnQgKGUuZy4gUlRMIHN5c3RlbXMpLiBVc2VcbiAgLy8gRmlyZWZveCB3aXRoIGxheW91dC5zY3JvbGxiYXIuc2lkZSA9IDMgaW4gYWJvdXQ6Y29uZmlnIHRvIHRlc3QgdGhpcy5cbiAgZnVuY3Rpb24gc2V0TGVmdFJUTFNjcm9sbGJhck9mZnNldCgpIHtcbiAgICBvZmZzZXRzLnggPSBnZXRXaW5kb3dTY3JvbGxCYXJYKGRvY3VtZW50RWxlbWVudCk7XG4gIH1cbiAgaWYgKGlzT2Zmc2V0UGFyZW50QW5FbGVtZW50IHx8ICFpc09mZnNldFBhcmVudEFuRWxlbWVudCAmJiAhaXNGaXhlZCkge1xuICAgIGlmIChnZXROb2RlTmFtZShvZmZzZXRQYXJlbnQpICE9PSAnYm9keScgfHwgaXNPdmVyZmxvd0VsZW1lbnQoZG9jdW1lbnRFbGVtZW50KSkge1xuICAgICAgc2Nyb2xsID0gZ2V0Tm9kZVNjcm9sbChvZmZzZXRQYXJlbnQpO1xuICAgIH1cbiAgICBpZiAoaXNPZmZzZXRQYXJlbnRBbkVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IG9mZnNldFJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3Qob2Zmc2V0UGFyZW50LCB0cnVlLCBpc0ZpeGVkLCBvZmZzZXRQYXJlbnQpO1xuICAgICAgb2Zmc2V0cy54ID0gb2Zmc2V0UmVjdC54ICsgb2Zmc2V0UGFyZW50LmNsaWVudExlZnQ7XG4gICAgICBvZmZzZXRzLnkgPSBvZmZzZXRSZWN0LnkgKyBvZmZzZXRQYXJlbnQuY2xpZW50VG9wO1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICBzZXRMZWZ0UlRMU2Nyb2xsYmFyT2Zmc2V0KCk7XG4gICAgfVxuICB9XG4gIGlmIChpc0ZpeGVkICYmICFpc09mZnNldFBhcmVudEFuRWxlbWVudCAmJiBkb2N1bWVudEVsZW1lbnQpIHtcbiAgICBzZXRMZWZ0UlRMU2Nyb2xsYmFyT2Zmc2V0KCk7XG4gIH1cbiAgY29uc3QgaHRtbE9mZnNldCA9IGRvY3VtZW50RWxlbWVudCAmJiAhaXNPZmZzZXRQYXJlbnRBbkVsZW1lbnQgJiYgIWlzRml4ZWQgPyBnZXRIVE1MT2Zmc2V0KGRvY3VtZW50RWxlbWVudCwgc2Nyb2xsKSA6IGNyZWF0ZUNvb3JkcygwKTtcbiAgY29uc3QgeCA9IHJlY3QubGVmdCArIHNjcm9sbC5zY3JvbGxMZWZ0IC0gb2Zmc2V0cy54IC0gaHRtbE9mZnNldC54O1xuICBjb25zdCB5ID0gcmVjdC50b3AgKyBzY3JvbGwuc2Nyb2xsVG9wIC0gb2Zmc2V0cy55IC0gaHRtbE9mZnNldC55O1xuICByZXR1cm4ge1xuICAgIHgsXG4gICAgeSxcbiAgICB3aWR0aDogcmVjdC53aWR0aCxcbiAgICBoZWlnaHQ6IHJlY3QuaGVpZ2h0XG4gIH07XG59XG5cbmZ1bmN0aW9uIGlzU3RhdGljUG9zaXRpb25lZChlbGVtZW50KSB7XG4gIHJldHVybiBnZXRDb21wdXRlZFN0eWxlJDEoZWxlbWVudCkucG9zaXRpb24gPT09ICdzdGF0aWMnO1xufVxuXG5mdW5jdGlvbiBnZXRUcnVlT2Zmc2V0UGFyZW50KGVsZW1lbnQsIHBvbHlmaWxsKSB7XG4gIGlmICghaXNIVE1MRWxlbWVudChlbGVtZW50KSB8fCBnZXRDb21wdXRlZFN0eWxlJDEoZWxlbWVudCkucG9zaXRpb24gPT09ICdmaXhlZCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAocG9seWZpbGwpIHtcbiAgICByZXR1cm4gcG9seWZpbGwoZWxlbWVudCk7XG4gIH1cbiAgbGV0IHJhd09mZnNldFBhcmVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50O1xuXG4gIC8vIEZpcmVmb3ggcmV0dXJucyB0aGUgPGh0bWw+IGVsZW1lbnQgYXMgdGhlIG9mZnNldFBhcmVudCBpZiBpdCdzIG5vbi1zdGF0aWMsXG4gIC8vIHdoaWxlIENocm9tZSBhbmQgU2FmYXJpIHJldHVybiB0aGUgPGJvZHk+IGVsZW1lbnQuIFRoZSA8Ym9keT4gZWxlbWVudCBtdXN0XG4gIC8vIGJlIHVzZWQgdG8gcGVyZm9ybSB0aGUgY29ycmVjdCBjYWxjdWxhdGlvbnMgZXZlbiBpZiB0aGUgPGh0bWw+IGVsZW1lbnQgaXNcbiAgLy8gbm9uLXN0YXRpYy5cbiAgaWYgKGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KSA9PT0gcmF3T2Zmc2V0UGFyZW50KSB7XG4gICAgcmF3T2Zmc2V0UGFyZW50ID0gcmF3T2Zmc2V0UGFyZW50Lm93bmVyRG9jdW1lbnQuYm9keTtcbiAgfVxuICByZXR1cm4gcmF3T2Zmc2V0UGFyZW50O1xufVxuXG4vLyBHZXRzIHRoZSBjbG9zZXN0IGFuY2VzdG9yIHBvc2l0aW9uZWQgZWxlbWVudC4gSGFuZGxlcyBzb21lIGVkZ2UgY2FzZXMsXG4vLyBzdWNoIGFzIHRhYmxlIGFuY2VzdG9ycyBhbmQgY3Jvc3MgYnJvd3NlciBidWdzLlxuZnVuY3Rpb24gZ2V0T2Zmc2V0UGFyZW50KGVsZW1lbnQsIHBvbHlmaWxsKSB7XG4gIGNvbnN0IHdpbiA9IGdldFdpbmRvdyhlbGVtZW50KTtcbiAgaWYgKGlzVG9wTGF5ZXIoZWxlbWVudCkpIHtcbiAgICByZXR1cm4gd2luO1xuICB9XG4gIGlmICghaXNIVE1MRWxlbWVudChlbGVtZW50KSkge1xuICAgIGxldCBzdmdPZmZzZXRQYXJlbnQgPSBnZXRQYXJlbnROb2RlKGVsZW1lbnQpO1xuICAgIHdoaWxlIChzdmdPZmZzZXRQYXJlbnQgJiYgIWlzTGFzdFRyYXZlcnNhYmxlTm9kZShzdmdPZmZzZXRQYXJlbnQpKSB7XG4gICAgICBpZiAoaXNFbGVtZW50KHN2Z09mZnNldFBhcmVudCkgJiYgIWlzU3RhdGljUG9zaXRpb25lZChzdmdPZmZzZXRQYXJlbnQpKSB7XG4gICAgICAgIHJldHVybiBzdmdPZmZzZXRQYXJlbnQ7XG4gICAgICB9XG4gICAgICBzdmdPZmZzZXRQYXJlbnQgPSBnZXRQYXJlbnROb2RlKHN2Z09mZnNldFBhcmVudCk7XG4gICAgfVxuICAgIHJldHVybiB3aW47XG4gIH1cbiAgbGV0IG9mZnNldFBhcmVudCA9IGdldFRydWVPZmZzZXRQYXJlbnQoZWxlbWVudCwgcG9seWZpbGwpO1xuICB3aGlsZSAob2Zmc2V0UGFyZW50ICYmIGlzVGFibGVFbGVtZW50KG9mZnNldFBhcmVudCkgJiYgaXNTdGF0aWNQb3NpdGlvbmVkKG9mZnNldFBhcmVudCkpIHtcbiAgICBvZmZzZXRQYXJlbnQgPSBnZXRUcnVlT2Zmc2V0UGFyZW50KG9mZnNldFBhcmVudCwgcG9seWZpbGwpO1xuICB9XG4gIGlmIChvZmZzZXRQYXJlbnQgJiYgaXNMYXN0VHJhdmVyc2FibGVOb2RlKG9mZnNldFBhcmVudCkgJiYgaXNTdGF0aWNQb3NpdGlvbmVkKG9mZnNldFBhcmVudCkgJiYgIWlzQ29udGFpbmluZ0Jsb2NrKG9mZnNldFBhcmVudCkpIHtcbiAgICByZXR1cm4gd2luO1xuICB9XG4gIHJldHVybiBvZmZzZXRQYXJlbnQgfHwgZ2V0Q29udGFpbmluZ0Jsb2NrKGVsZW1lbnQpIHx8IHdpbjtcbn1cblxuY29uc3QgZ2V0RWxlbWVudFJlY3RzID0gYXN5bmMgZnVuY3Rpb24gKGRhdGEpIHtcbiAgY29uc3QgZ2V0T2Zmc2V0UGFyZW50Rm4gPSB0aGlzLmdldE9mZnNldFBhcmVudCB8fCBnZXRPZmZzZXRQYXJlbnQ7XG4gIGNvbnN0IGdldERpbWVuc2lvbnNGbiA9IHRoaXMuZ2V0RGltZW5zaW9ucztcbiAgY29uc3QgZmxvYXRpbmdEaW1lbnNpb25zID0gYXdhaXQgZ2V0RGltZW5zaW9uc0ZuKGRhdGEuZmxvYXRpbmcpO1xuICByZXR1cm4ge1xuICAgIHJlZmVyZW5jZTogZ2V0UmVjdFJlbGF0aXZlVG9PZmZzZXRQYXJlbnQoZGF0YS5yZWZlcmVuY2UsIGF3YWl0IGdldE9mZnNldFBhcmVudEZuKGRhdGEuZmxvYXRpbmcpLCBkYXRhLnN0cmF0ZWd5KSxcbiAgICBmbG9hdGluZzoge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgICB3aWR0aDogZmxvYXRpbmdEaW1lbnNpb25zLndpZHRoLFxuICAgICAgaGVpZ2h0OiBmbG9hdGluZ0RpbWVuc2lvbnMuaGVpZ2h0XG4gICAgfVxuICB9O1xufTtcblxuZnVuY3Rpb24gaXNSVEwoZWxlbWVudCkge1xuICByZXR1cm4gZ2V0Q29tcHV0ZWRTdHlsZSQxKGVsZW1lbnQpLmRpcmVjdGlvbiA9PT0gJ3J0bCc7XG59XG5cbmNvbnN0IHBsYXRmb3JtID0ge1xuICBjb252ZXJ0T2Zmc2V0UGFyZW50UmVsYXRpdmVSZWN0VG9WaWV3cG9ydFJlbGF0aXZlUmVjdCxcbiAgZ2V0RG9jdW1lbnRFbGVtZW50LFxuICBnZXRDbGlwcGluZ1JlY3QsXG4gIGdldE9mZnNldFBhcmVudCxcbiAgZ2V0RWxlbWVudFJlY3RzLFxuICBnZXRDbGllbnRSZWN0cyxcbiAgZ2V0RGltZW5zaW9ucyxcbiAgZ2V0U2NhbGUsXG4gIGlzRWxlbWVudCxcbiAgaXNSVExcbn07XG5cbmZ1bmN0aW9uIHJlY3RzQXJlRXF1YWwoYSwgYikge1xuICByZXR1cm4gYS54ID09PSBiLnggJiYgYS55ID09PSBiLnkgJiYgYS53aWR0aCA9PT0gYi53aWR0aCAmJiBhLmhlaWdodCA9PT0gYi5oZWlnaHQ7XG59XG5cbi8vIGh0dHBzOi8vc2FtdGhvci5hdS8yMDIxL29ic2VydmluZy1kb20vXG5mdW5jdGlvbiBvYnNlcnZlTW92ZShlbGVtZW50LCBvbk1vdmUpIHtcbiAgbGV0IGlvID0gbnVsbDtcbiAgbGV0IHRpbWVvdXRJZDtcbiAgY29uc3Qgcm9vdCA9IGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KTtcbiAgZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICB2YXIgX2lvO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgIChfaW8gPSBpbykgPT0gbnVsbCB8fCBfaW8uZGlzY29ubmVjdCgpO1xuICAgIGlvID0gbnVsbDtcbiAgfVxuICBmdW5jdGlvbiByZWZyZXNoKHNraXAsIHRocmVzaG9sZCkge1xuICAgIGlmIChza2lwID09PSB2b2lkIDApIHtcbiAgICAgIHNraXAgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRocmVzaG9sZCA9PT0gdm9pZCAwKSB7XG4gICAgICB0aHJlc2hvbGQgPSAxO1xuICAgIH1cbiAgICBjbGVhbnVwKCk7XG4gICAgY29uc3QgZWxlbWVudFJlY3RGb3JSb290TWFyZ2luID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB7XG4gICAgICBsZWZ0LFxuICAgICAgdG9wLFxuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHRcbiAgICB9ID0gZWxlbWVudFJlY3RGb3JSb290TWFyZ2luO1xuICAgIGlmICghc2tpcCkge1xuICAgICAgb25Nb3ZlKCk7XG4gICAgfVxuICAgIGlmICghd2lkdGggfHwgIWhlaWdodCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpbnNldFRvcCA9IGZsb29yKHRvcCk7XG4gICAgY29uc3QgaW5zZXRSaWdodCA9IGZsb29yKHJvb3QuY2xpZW50V2lkdGggLSAobGVmdCArIHdpZHRoKSk7XG4gICAgY29uc3QgaW5zZXRCb3R0b20gPSBmbG9vcihyb290LmNsaWVudEhlaWdodCAtICh0b3AgKyBoZWlnaHQpKTtcbiAgICBjb25zdCBpbnNldExlZnQgPSBmbG9vcihsZWZ0KTtcbiAgICBjb25zdCByb290TWFyZ2luID0gLWluc2V0VG9wICsgXCJweCBcIiArIC1pbnNldFJpZ2h0ICsgXCJweCBcIiArIC1pbnNldEJvdHRvbSArIFwicHggXCIgKyAtaW5zZXRMZWZ0ICsgXCJweFwiO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICByb290TWFyZ2luLFxuICAgICAgdGhyZXNob2xkOiBtYXgoMCwgbWluKDEsIHRocmVzaG9sZCkpIHx8IDFcbiAgICB9O1xuICAgIGxldCBpc0ZpcnN0VXBkYXRlID0gdHJ1ZTtcbiAgICBmdW5jdGlvbiBoYW5kbGVPYnNlcnZlKGVudHJpZXMpIHtcbiAgICAgIGNvbnN0IHJhdGlvID0gZW50cmllc1swXS5pbnRlcnNlY3Rpb25SYXRpbztcbiAgICAgIGlmIChyYXRpbyAhPT0gdGhyZXNob2xkKSB7XG4gICAgICAgIGlmICghaXNGaXJzdFVwZGF0ZSkge1xuICAgICAgICAgIHJldHVybiByZWZyZXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyYXRpbykge1xuICAgICAgICAgIC8vIElmIHRoZSByZWZlcmVuY2UgaXMgY2xpcHBlZCwgdGhlIHJhdGlvIGlzIDAuIFRocm90dGxlIHRoZSByZWZyZXNoXG4gICAgICAgICAgLy8gdG8gcHJldmVudCBhbiBpbmZpbml0ZSBsb29wIG9mIHVwZGF0ZXMuXG4gICAgICAgICAgdGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICByZWZyZXNoKGZhbHNlLCAxZS03KTtcbiAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWZyZXNoKGZhbHNlLCByYXRpbyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChyYXRpbyA9PT0gMSAmJiAhcmVjdHNBcmVFcXVhbChlbGVtZW50UmVjdEZvclJvb3RNYXJnaW4sIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpKSB7XG4gICAgICAgIC8vIEl0J3MgcG9zc2libGUgdGhhdCBldmVuIHRob3VnaCB0aGUgcmF0aW8gaXMgcmVwb3J0ZWQgYXMgMSwgdGhlXG4gICAgICAgIC8vIGVsZW1lbnQgaXMgbm90IGFjdHVhbGx5IGZ1bGx5IHdpdGhpbiB0aGUgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIncyByb290XG4gICAgICAgIC8vIGFyZWEgYW55bW9yZS4gVGhpcyBjYW4gaGFwcGVuIHVuZGVyIHBlcmZvcm1hbmNlIGNvbnN0cmFpbnRzLiBUaGlzIG1heVxuICAgICAgICAvLyBiZSBhIGJ1ZyBpbiB0aGUgYnJvd3NlcidzIEludGVyc2VjdGlvbk9ic2VydmVyIGltcGxlbWVudGF0aW9uLiBUb1xuICAgICAgICAvLyB3b3JrIGFyb3VuZCB0aGlzLCB3ZSBjb21wYXJlIHRoZSBlbGVtZW50J3MgYm91bmRpbmcgcmVjdCBub3cgd2l0aFxuICAgICAgICAvLyB3aGF0IGl0IHdhcyBhdCB0aGUgdGltZSB3ZSBjcmVhdGVkIHRoZSBJbnRlcnNlY3Rpb25PYnNlcnZlci4gSWYgdGhleVxuICAgICAgICAvLyBhcmUgbm90IGVxdWFsIHRoZW4gdGhlIGVsZW1lbnQgbW92ZWQsIHNvIHdlIHJlZnJlc2guXG4gICAgICAgIHJlZnJlc2goKTtcbiAgICAgIH1cbiAgICAgIGlzRmlyc3RVcGRhdGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBPbGRlciBicm93c2VycyBkb24ndCBzdXBwb3J0IGEgYGRvY3VtZW50YCBhcyB0aGUgcm9vdCBhbmQgd2lsbCB0aHJvdyBhblxuICAgIC8vIGVycm9yLlxuICAgIHRyeSB7XG4gICAgICBpbyA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihoYW5kbGVPYnNlcnZlLCB7XG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIC8vIEhhbmRsZSA8aWZyYW1lPnNcbiAgICAgICAgcm9vdDogcm9vdC5vd25lckRvY3VtZW50XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChfZSkge1xuICAgICAgaW8gPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoaGFuZGxlT2JzZXJ2ZSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGlvLm9ic2VydmUoZWxlbWVudCk7XG4gIH1cbiAgcmVmcmVzaCh0cnVlKTtcbiAgcmV0dXJuIGNsZWFudXA7XG59XG5cbi8qKlxuICogQXV0b21hdGljYWxseSB1cGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgZmxvYXRpbmcgZWxlbWVudCB3aGVuIG5lY2Vzc2FyeS5cbiAqIFNob3VsZCBvbmx5IGJlIGNhbGxlZCB3aGVuIHRoZSBmbG9hdGluZyBlbGVtZW50IGlzIG1vdW50ZWQgb24gdGhlIERPTSBvclxuICogdmlzaWJsZSBvbiB0aGUgc2NyZWVuLlxuICogQHJldHVybnMgY2xlYW51cCBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSBpbnZva2VkIHdoZW4gdGhlIGZsb2F0aW5nIGVsZW1lbnQgaXNcbiAqIHJlbW92ZWQgZnJvbSB0aGUgRE9NIG9yIGhpZGRlbiBmcm9tIHRoZSBzY3JlZW4uXG4gKiBAc2VlIGh0dHBzOi8vZmxvYXRpbmctdWkuY29tL2RvY3MvYXV0b1VwZGF0ZVxuICovXG5mdW5jdGlvbiBhdXRvVXBkYXRlKHJlZmVyZW5jZSwgZmxvYXRpbmcsIHVwZGF0ZSwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGNvbnN0IHtcbiAgICBhbmNlc3RvclNjcm9sbCA9IHRydWUsXG4gICAgYW5jZXN0b3JSZXNpemUgPSB0cnVlLFxuICAgIGVsZW1lbnRSZXNpemUgPSB0eXBlb2YgUmVzaXplT2JzZXJ2ZXIgPT09ICdmdW5jdGlvbicsXG4gICAgbGF5b3V0U2hpZnQgPSB0eXBlb2YgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPT09ICdmdW5jdGlvbicsXG4gICAgYW5pbWF0aW9uRnJhbWUgPSBmYWxzZVxuICB9ID0gb3B0aW9ucztcbiAgY29uc3QgcmVmZXJlbmNlRWwgPSB1bndyYXBFbGVtZW50KHJlZmVyZW5jZSk7XG4gIGNvbnN0IGFuY2VzdG9ycyA9IGFuY2VzdG9yU2Nyb2xsIHx8IGFuY2VzdG9yUmVzaXplID8gWy4uLihyZWZlcmVuY2VFbCA/IGdldE92ZXJmbG93QW5jZXN0b3JzKHJlZmVyZW5jZUVsKSA6IFtdKSwgLi4uKGZsb2F0aW5nID8gZ2V0T3ZlcmZsb3dBbmNlc3RvcnMoZmxvYXRpbmcpIDogW10pXSA6IFtdO1xuICBhbmNlc3RvcnMuZm9yRWFjaChhbmNlc3RvciA9PiB7XG4gICAgYW5jZXN0b3JTY3JvbGwgJiYgYW5jZXN0b3IuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdXBkYXRlLCB7XG4gICAgICBwYXNzaXZlOiB0cnVlXG4gICAgfSk7XG4gICAgYW5jZXN0b3JSZXNpemUgJiYgYW5jZXN0b3IuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdXBkYXRlKTtcbiAgfSk7XG4gIGNvbnN0IGNsZWFudXBJbyA9IHJlZmVyZW5jZUVsICYmIGxheW91dFNoaWZ0ID8gb2JzZXJ2ZU1vdmUocmVmZXJlbmNlRWwsIHVwZGF0ZSkgOiBudWxsO1xuICBsZXQgcmVvYnNlcnZlRnJhbWUgPSAtMTtcbiAgbGV0IHJlc2l6ZU9ic2VydmVyID0gbnVsbDtcbiAgaWYgKGVsZW1lbnRSZXNpemUpIHtcbiAgICByZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcihfcmVmID0+IHtcbiAgICAgIGxldCBbZmlyc3RFbnRyeV0gPSBfcmVmO1xuICAgICAgaWYgKGZpcnN0RW50cnkgJiYgZmlyc3RFbnRyeS50YXJnZXQgPT09IHJlZmVyZW5jZUVsICYmIHJlc2l6ZU9ic2VydmVyICYmIGZsb2F0aW5nKSB7XG4gICAgICAgIC8vIFByZXZlbnQgdXBkYXRlIGxvb3BzIHdoZW4gdXNpbmcgdGhlIGBzaXplYCBtaWRkbGV3YXJlLlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmxvYXRpbmctdWkvZmxvYXRpbmctdWkvaXNzdWVzLzE3NDBcbiAgICAgICAgcmVzaXplT2JzZXJ2ZXIudW5vYnNlcnZlKGZsb2F0aW5nKTtcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUocmVvYnNlcnZlRnJhbWUpO1xuICAgICAgICByZW9ic2VydmVGcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgdmFyIF9yZXNpemVPYnNlcnZlcjtcbiAgICAgICAgICAoX3Jlc2l6ZU9ic2VydmVyID0gcmVzaXplT2JzZXJ2ZXIpID09IG51bGwgfHwgX3Jlc2l6ZU9ic2VydmVyLm9ic2VydmUoZmxvYXRpbmcpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHVwZGF0ZSgpO1xuICAgIH0pO1xuICAgIGlmIChyZWZlcmVuY2VFbCAmJiAhYW5pbWF0aW9uRnJhbWUpIHtcbiAgICAgIHJlc2l6ZU9ic2VydmVyLm9ic2VydmUocmVmZXJlbmNlRWwpO1xuICAgIH1cbiAgICBpZiAoZmxvYXRpbmcpIHtcbiAgICAgIHJlc2l6ZU9ic2VydmVyLm9ic2VydmUoZmxvYXRpbmcpO1xuICAgIH1cbiAgfVxuICBsZXQgZnJhbWVJZDtcbiAgbGV0IHByZXZSZWZSZWN0ID0gYW5pbWF0aW9uRnJhbWUgPyBnZXRCb3VuZGluZ0NsaWVudFJlY3QocmVmZXJlbmNlKSA6IG51bGw7XG4gIGlmIChhbmltYXRpb25GcmFtZSkge1xuICAgIGZyYW1lTG9vcCgpO1xuICB9XG4gIGZ1bmN0aW9uIGZyYW1lTG9vcCgpIHtcbiAgICBjb25zdCBuZXh0UmVmUmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChyZWZlcmVuY2UpO1xuICAgIGlmIChwcmV2UmVmUmVjdCAmJiAhcmVjdHNBcmVFcXVhbChwcmV2UmVmUmVjdCwgbmV4dFJlZlJlY3QpKSB7XG4gICAgICB1cGRhdGUoKTtcbiAgICB9XG4gICAgcHJldlJlZlJlY3QgPSBuZXh0UmVmUmVjdDtcbiAgICBmcmFtZUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZyYW1lTG9vcCk7XG4gIH1cbiAgdXBkYXRlKCk7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgdmFyIF9yZXNpemVPYnNlcnZlcjI7XG4gICAgYW5jZXN0b3JzLmZvckVhY2goYW5jZXN0b3IgPT4ge1xuICAgICAgYW5jZXN0b3JTY3JvbGwgJiYgYW5jZXN0b3IucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdXBkYXRlKTtcbiAgICAgIGFuY2VzdG9yUmVzaXplICYmIGFuY2VzdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZSk7XG4gICAgfSk7XG4gICAgY2xlYW51cElvID09IG51bGwgfHwgY2xlYW51cElvKCk7XG4gICAgKF9yZXNpemVPYnNlcnZlcjIgPSByZXNpemVPYnNlcnZlcikgPT0gbnVsbCB8fCBfcmVzaXplT2JzZXJ2ZXIyLmRpc2Nvbm5lY3QoKTtcbiAgICByZXNpemVPYnNlcnZlciA9IG51bGw7XG4gICAgaWYgKGFuaW1hdGlvbkZyYW1lKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShmcmFtZUlkKTtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogUmVzb2x2ZXMgd2l0aCBhbiBvYmplY3Qgb2Ygb3ZlcmZsb3cgc2lkZSBvZmZzZXRzIHRoYXQgZGV0ZXJtaW5lIGhvdyBtdWNoIHRoZVxuICogZWxlbWVudCBpcyBvdmVyZmxvd2luZyBhIGdpdmVuIGNsaXBwaW5nIGJvdW5kYXJ5IG9uIGVhY2ggc2lkZS5cbiAqIC0gcG9zaXRpdmUgPSBvdmVyZmxvd2luZyB0aGUgYm91bmRhcnkgYnkgdGhhdCBudW1iZXIgb2YgcGl4ZWxzXG4gKiAtIG5lZ2F0aXZlID0gaG93IG1hbnkgcGl4ZWxzIGxlZnQgYmVmb3JlIGl0IHdpbGwgb3ZlcmZsb3dcbiAqIC0gMCA9IGxpZXMgZmx1c2ggd2l0aCB0aGUgYm91bmRhcnlcbiAqIEBzZWUgaHR0cHM6Ly9mbG9hdGluZy11aS5jb20vZG9jcy9kZXRlY3RPdmVyZmxvd1xuICovXG5jb25zdCBkZXRlY3RPdmVyZmxvdyA9IGRldGVjdE92ZXJmbG93JDE7XG5cbi8qKlxuICogTW9kaWZpZXMgdGhlIHBsYWNlbWVudCBieSB0cmFuc2xhdGluZyB0aGUgZmxvYXRpbmcgZWxlbWVudCBhbG9uZyB0aGVcbiAqIHNwZWNpZmllZCBheGVzLlxuICogQSBudW1iZXIgKHNob3J0aGFuZCBmb3IgYG1haW5BeGlzYCBvciBkaXN0YW5jZSksIG9yIGFuIGF4ZXMgY29uZmlndXJhdGlvblxuICogb2JqZWN0IG1heSBiZSBwYXNzZWQuXG4gKiBAc2VlIGh0dHBzOi8vZmxvYXRpbmctdWkuY29tL2RvY3Mvb2Zmc2V0XG4gKi9cbmNvbnN0IG9mZnNldCA9IG9mZnNldCQxO1xuXG4vKipcbiAqIE9wdGltaXplcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgZmxvYXRpbmcgZWxlbWVudCBieSBjaG9vc2luZyB0aGUgcGxhY2VtZW50XG4gKiB0aGF0IGhhcyB0aGUgbW9zdCBzcGFjZSBhdmFpbGFibGUgYXV0b21hdGljYWxseSwgd2l0aG91dCBuZWVkaW5nIHRvIHNwZWNpZnkgYVxuICogcHJlZmVycmVkIHBsYWNlbWVudC4gQWx0ZXJuYXRpdmUgdG8gYGZsaXBgLlxuICogQHNlZSBodHRwczovL2Zsb2F0aW5nLXVpLmNvbS9kb2NzL2F1dG9QbGFjZW1lbnRcbiAqL1xuY29uc3QgYXV0b1BsYWNlbWVudCA9IGF1dG9QbGFjZW1lbnQkMTtcblxuLyoqXG4gKiBPcHRpbWl6ZXMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGZsb2F0aW5nIGVsZW1lbnQgYnkgc2hpZnRpbmcgaXQgaW4gb3JkZXIgdG9cbiAqIGtlZXAgaXQgaW4gdmlldyB3aGVuIGl0IHdpbGwgb3ZlcmZsb3cgdGhlIGNsaXBwaW5nIGJvdW5kYXJ5LlxuICogQHNlZSBodHRwczovL2Zsb2F0aW5nLXVpLmNvbS9kb2NzL3NoaWZ0XG4gKi9cbmNvbnN0IHNoaWZ0ID0gc2hpZnQkMTtcblxuLyoqXG4gKiBPcHRpbWl6ZXMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGZsb2F0aW5nIGVsZW1lbnQgYnkgZmxpcHBpbmcgdGhlIGBwbGFjZW1lbnRgXG4gKiBpbiBvcmRlciB0byBrZWVwIGl0IGluIHZpZXcgd2hlbiB0aGUgcHJlZmVycmVkIHBsYWNlbWVudChzKSB3aWxsIG92ZXJmbG93IHRoZVxuICogY2xpcHBpbmcgYm91bmRhcnkuIEFsdGVybmF0aXZlIHRvIGBhdXRvUGxhY2VtZW50YC5cbiAqIEBzZWUgaHR0cHM6Ly9mbG9hdGluZy11aS5jb20vZG9jcy9mbGlwXG4gKi9cbmNvbnN0IGZsaXAgPSBmbGlwJDE7XG5cbi8qKlxuICogUHJvdmlkZXMgZGF0YSB0aGF0IGFsbG93cyB5b3UgdG8gY2hhbmdlIHRoZSBzaXplIG9mIHRoZSBmbG9hdGluZyBlbGVtZW50IOKAlFxuICogZm9yIGluc3RhbmNlLCBwcmV2ZW50IGl0IGZyb20gb3ZlcmZsb3dpbmcgdGhlIGNsaXBwaW5nIGJvdW5kYXJ5IG9yIG1hdGNoIHRoZVxuICogd2lkdGggb2YgdGhlIHJlZmVyZW5jZSBlbGVtZW50LlxuICogQHNlZSBodHRwczovL2Zsb2F0aW5nLXVpLmNvbS9kb2NzL3NpemVcbiAqL1xuY29uc3Qgc2l6ZSA9IHNpemUkMTtcblxuLyoqXG4gKiBQcm92aWRlcyBkYXRhIHRvIGhpZGUgdGhlIGZsb2F0aW5nIGVsZW1lbnQgaW4gYXBwbGljYWJsZSBzaXR1YXRpb25zLCBzdWNoIGFzXG4gKiB3aGVuIGl0IGlzIG5vdCBpbiB0aGUgc2FtZSBjbGlwcGluZyBjb250ZXh0IGFzIHRoZSByZWZlcmVuY2UgZWxlbWVudC5cbiAqIEBzZWUgaHR0cHM6Ly9mbG9hdGluZy11aS5jb20vZG9jcy9oaWRlXG4gKi9cbmNvbnN0IGhpZGUgPSBoaWRlJDE7XG5cbi8qKlxuICogUHJvdmlkZXMgZGF0YSB0byBwb3NpdGlvbiBhbiBpbm5lciBlbGVtZW50IG9mIHRoZSBmbG9hdGluZyBlbGVtZW50IHNvIHRoYXQgaXRcbiAqIGFwcGVhcnMgY2VudGVyZWQgdG8gdGhlIHJlZmVyZW5jZSBlbGVtZW50LlxuICogQHNlZSBodHRwczovL2Zsb2F0aW5nLXVpLmNvbS9kb2NzL2Fycm93XG4gKi9cbmNvbnN0IGFycm93ID0gYXJyb3ckMTtcblxuLyoqXG4gKiBQcm92aWRlcyBpbXByb3ZlZCBwb3NpdGlvbmluZyBmb3IgaW5saW5lIHJlZmVyZW5jZSBlbGVtZW50cyB0aGF0IGNhbiBzcGFuXG4gKiBvdmVyIG11bHRpcGxlIGxpbmVzLCBzdWNoIGFzIGh5cGVybGlua3Mgb3IgcmFuZ2Ugc2VsZWN0aW9ucy5cbiAqIEBzZWUgaHR0cHM6Ly9mbG9hdGluZy11aS5jb20vZG9jcy9pbmxpbmVcbiAqL1xuY29uc3QgaW5saW5lID0gaW5saW5lJDE7XG5cbi8qKlxuICogQnVpbHQtaW4gYGxpbWl0ZXJgIHRoYXQgd2lsbCBzdG9wIGBzaGlmdCgpYCBhdCBhIGNlcnRhaW4gcG9pbnQuXG4gKi9cbmNvbnN0IGxpbWl0U2hpZnQgPSBsaW1pdFNoaWZ0JDE7XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIGB4YCBhbmQgYHlgIGNvb3JkaW5hdGVzIHRoYXQgd2lsbCBwbGFjZSB0aGUgZmxvYXRpbmcgZWxlbWVudFxuICogbmV4dCB0byBhIGdpdmVuIHJlZmVyZW5jZSBlbGVtZW50LlxuICovXG5jb25zdCBjb21wdXRlUG9zaXRpb24gPSAocmVmZXJlbmNlLCBmbG9hdGluZywgb3B0aW9ucykgPT4ge1xuICAvLyBUaGlzIGNhY2hlcyB0aGUgZXhwZW5zaXZlIGBnZXRDbGlwcGluZ0VsZW1lbnRBbmNlc3RvcnNgIGZ1bmN0aW9uIHNvIHRoYXRcbiAgLy8gbXVsdGlwbGUgbGlmZWN5Y2xlIHJlc2V0cyByZS11c2UgdGhlIHNhbWUgcmVzdWx0LiBJdCBvbmx5IGxpdmVzIGZvciBhXG4gIC8vIHNpbmdsZSBjYWxsLiBJZiBvdGhlciBmdW5jdGlvbnMgYmVjb21lIGV4cGVuc2l2ZSwgd2UgY2FuIGFkZCB0aGVtIGFzIHdlbGwuXG4gIGNvbnN0IGNhY2hlID0gbmV3IE1hcCgpO1xuICBjb25zdCBtZXJnZWRPcHRpb25zID0ge1xuICAgIHBsYXRmb3JtLFxuICAgIC4uLm9wdGlvbnNcbiAgfTtcbiAgY29uc3QgcGxhdGZvcm1XaXRoQ2FjaGUgPSB7XG4gICAgLi4ubWVyZ2VkT3B0aW9ucy5wbGF0Zm9ybSxcbiAgICBfYzogY2FjaGVcbiAgfTtcbiAgcmV0dXJuIGNvbXB1dGVQb3NpdGlvbiQxKHJlZmVyZW5jZSwgZmxvYXRpbmcsIHtcbiAgICAuLi5tZXJnZWRPcHRpb25zLFxuICAgIHBsYXRmb3JtOiBwbGF0Zm9ybVdpdGhDYWNoZVxuICB9KTtcbn07XG5cbmV4cG9ydCB7IGFycm93LCBhdXRvUGxhY2VtZW50LCBhdXRvVXBkYXRlLCBjb21wdXRlUG9zaXRpb24sIGRldGVjdE92ZXJmbG93LCBmbGlwLCBoaWRlLCBpbmxpbmUsIGxpbWl0U2hpZnQsIG9mZnNldCwgcGxhdGZvcm0sIHNoaWZ0LCBzaXplIH07XG4iXSwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMSwyLDNdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFLQSxJQUFNLFFBQVE7Q0FBQztDQUFPO0NBQVM7Q0FBVTtBQUFNO0FBQy9DLElBQU0sYUFBYSxDQUFDLFNBQVMsS0FBSztBQUNsQyxJQUFNLGFBQTBCLG9CQUFNLFFBQVEsS0FBSyxTQUFTLElBQUksT0FBTyxNQUFNLE9BQU8sTUFBTSxXQUFXLElBQUksT0FBTyxNQUFNLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN4SSxJQUFNLE1BQU0sS0FBSztBQUNqQixJQUFNLE1BQU0sS0FBSztBQUNqQixJQUFNLFFBQVEsS0FBSztBQUNuQixJQUFNLFFBQVEsS0FBSztBQUNuQixJQUFNLGdCQUFlLE9BQU07Q0FDekIsR0FBRztDQUNILEdBQUc7QUFDTDtBQUNBLElBQU0sa0JBQWtCO0NBQ3RCLE1BQU07Q0FDTixPQUFPO0NBQ1AsUUFBUTtDQUNSLEtBQUs7QUFDUDtBQUNBLFNBQVMsTUFBTSxPQUFPLE9BQU8sS0FBSztDQUNoQyxPQUFPLElBQUksT0FBTyxJQUFJLE9BQU8sR0FBRyxDQUFDO0FBQ25DO0FBQ0EsU0FBUyxTQUFTLE9BQU8sT0FBTztDQUM5QixPQUFPLE9BQU8sVUFBVSxhQUFhLE1BQU0sS0FBSyxJQUFJO0FBQ3REO0FBQ0EsU0FBUyxRQUFRLFdBQVc7Q0FDMUIsT0FBTyxVQUFVLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDOUI7QUFDQSxTQUFTLGFBQWEsV0FBVztDQUMvQixPQUFPLFVBQVUs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
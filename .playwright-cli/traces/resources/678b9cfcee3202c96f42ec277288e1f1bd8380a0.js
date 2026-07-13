//#region node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function r(e) {
	var t, f, n = "";
	if ("string" == typeof e || "number" == typeof e) n += e;
	else if ("object" == typeof e) if (Array.isArray(e)) {
		var o = e.length;
		for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
	} else for (f in e) e[f] && (n && (n += " "), n += f);
	return n;
}
function clsx() {
	for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
	return n;
}
//#endregion
export { clsx, clsx as default };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZlbHRlX25fY2xzeC5qcyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIuLi8uLi8ucG5wbS9jbHN4QDIuMS4xL25vZGVfbW9kdWxlcy9jbHN4L2Rpc3QvY2xzeC5tanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gcihlKXt2YXIgdCxmLG49XCJcIjtpZihcInN0cmluZ1wiPT10eXBlb2YgZXx8XCJudW1iZXJcIj09dHlwZW9mIGUpbis9ZTtlbHNlIGlmKFwib2JqZWN0XCI9PXR5cGVvZiBlKWlmKEFycmF5LmlzQXJyYXkoZSkpe3ZhciBvPWUubGVuZ3RoO2Zvcih0PTA7dDxvO3QrKyllW3RdJiYoZj1yKGVbdF0pKSYmKG4mJihuKz1cIiBcIiksbis9Zil9ZWxzZSBmb3IoZiBpbiBlKWVbZl0mJihuJiYobis9XCIgXCIpLG4rPWYpO3JldHVybiBufWV4cG9ydCBmdW5jdGlvbiBjbHN4KCl7Zm9yKHZhciBlLHQsZj0wLG49XCJcIixvPWFyZ3VtZW50cy5sZW5ndGg7ZjxvO2YrKykoZT1hcmd1bWVudHNbZl0pJiYodD1yKGUpKSYmKG4mJihuKz1cIiBcIiksbis9dCk7cmV0dXJuIG59ZXhwb3J0IGRlZmF1bHQgY2xzeDsiXSwieF9nb29nbGVfaWdub3JlTGlzdCI6WzBdLCJtYXBwaW5ncyI6IjtBQUFBLFNBQVMsRUFBRSxHQUFFO0NBQUMsSUFBSSxHQUFFLEdBQUUsSUFBRTtDQUFHLElBQUcsWUFBVSxPQUFPLEtBQUcsWUFBVSxPQUFPLEdBQUUsS0FBRztNQUFPLElBQUcsWUFBVSxPQUFPLEdBQUUsSUFBRyxNQUFNLFFBQVEsQ0FBQyxHQUFFO0VBQUMsSUFBSSxJQUFFLEVBQUU7RUFBTyxLQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSSxFQUFFLE9BQUssSUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFLLE1BQUksS0FBRyxNQUFLLEtBQUc7Q0FBRSxPQUFNLEtBQUksS0FBSyxHQUFFLEVBQUUsT0FBSyxNQUFJLEtBQUcsTUFBSyxLQUFHO0NBQUcsT0FBTztBQUFDO0FBQUMsU0FBZ0IsT0FBTTtDQUFDLEtBQUksSUFBSSxHQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsSUFBRyxJQUFFLFVBQVUsUUFBTyxJQUFFLEdBQUUsS0FBSSxDQUFDLElBQUUsVUFBVSxRQUFNLElBQUUsRUFBRSxDQUFDLE9BQUssTUFBSSxLQUFHLE1BQUssS0FBRztDQUFHLE9BQU87QUFBQyJ9
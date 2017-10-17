export const ltrim = (stringToTrim) => {
	return stringToTrim.replace(/^\s+/,"");
}

export const rtrim = (stringToTrim) => {
	return stringToTrim.replace(/\s+$/,"");
}

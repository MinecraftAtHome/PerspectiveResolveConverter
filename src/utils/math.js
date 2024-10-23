function gcd(a, b) {
	if (!b) return a;
	return gcd(b, a % b);
}

export function aspectRatio(width, height) {
	return [width / gcd(width, height), height / gcd(width, height)];
}

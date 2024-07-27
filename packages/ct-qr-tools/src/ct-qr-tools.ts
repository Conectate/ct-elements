export async function writeQR() {
	let module = await import("qrcode");
	return module;
}

export async function readQR() {
	let module = await import("jsqr");
	return module.default;
}

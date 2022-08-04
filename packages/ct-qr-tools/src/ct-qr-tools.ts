export async function writeQR() {
	let module = await import('qrcode');
	// @ts-ignore
	return { ...module.default } as typeof module;
}

export async function readQR() {
	let module = await import('jsqr-es6');
	return module.default;
}

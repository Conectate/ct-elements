export async function writeQR(){
    let module = await import('qrcode');
    return module.default;
}

export async function readQR(){
    let module = await import('jsqr-es6');
    return module.default;
}
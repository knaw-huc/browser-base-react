const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export function encode(data: string): string {
    const bytes = textEncoder.encode(data);
    const binaryStr = String.fromCodePoint(...bytes);
    return btoa(binaryStr);
}

export function decode(data: string): string {
    const binaryString = atob(data);
    const bytes = Uint8Array.from(binaryString as Iterable<any>, (m: any) => m.codePointAt(0));
    return textDecoder.decode(bytes);
}

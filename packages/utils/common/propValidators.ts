export function checkPixelString(str: string): boolean {
    return /^\d+(?=vw|vh|in|cm|mm|%|ex|ch|vmin|vmax|rem|em|px)(vw|vh|in|cm|mm|%|ex|ch|vmin|vmax|rem|em|px)$/.test(
        str
    );
}

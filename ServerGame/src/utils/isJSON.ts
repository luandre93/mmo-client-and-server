export function isJSON(str: string): boolean {
    try {
        const parsedObj = JSON.parse(str);
        return typeof parsedObj === 'object';
    } catch (error) {
        return false;
    }
}

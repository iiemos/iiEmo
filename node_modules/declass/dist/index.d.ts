interface ParsedItem {
    uses: Set<any>;
    class: string;
    _class?: string[];
}
interface ParsedMap {
    [id: number]: string;
}
interface ItemGroups {
    [key: string]: {
        class: string;
        uses: Set<any>;
    };
}
declare function declass(html: string): {
    class: string;
    uses: string[];
}[];

export { ItemGroups, ParsedItem, ParsedMap, declass };

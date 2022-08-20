import Connect from 'connect';
import { UserOptions as UserOptions$1 } from 'vite-plugin-windicss';
import { WindiPluginUtils, UserOptions } from '@windicss/plugin-utils';
import { Shortcut } from 'windicss/types/interfaces';

interface FileInfo {
    filepath: string;
    utilities: string[];
}
interface UtilityInfo {
    count: number;
    full: string;
    base: string;
    type?: string;
    category?: string;
    value?: string;
    prefixes?: string[];
    important?: boolean;
    colorName?: string;
    colorHex?: string;
    css?: string;
    shortcut?: Shortcut;
}
interface BaseInfo {
    count: number;
    base: string;
    variants?: string[];
}
interface ColorInfo {
    name: string;
    hex: string;
    utilities: string[];
    prefixes: string[];
}
interface AnalysisReport {
    root: string;
    name?: string;
    version?: string;
    include: string[];
    exclude: string[];
    files: FileInfo[];
    colors: Record<string, ColorInfo>;
    utilities: Record<string, UtilityInfo>;
    groups: {
        files: {
            [key: string]: string[];
        };
        groups: {
            class: string;
            uses: string[];
        }[];
    };
    bases: Record<string, BaseInfo>;
    shortcuts: Record<string, Shortcut>;
    dist: {
        gzip: string;
    };
}
interface HighlightRule {
    name: string;
    regex?: RegExp | string | Array<RegExp | string>;
    category?: string;
    classes: string;
}

declare function uniq<T>(data: T[]): T[];
declare function countElement<T>(arr: T[], element: T): number;
declare function timeout(ms: number): Promise<unknown>;
declare function tryPort(start?: number): Promise<number>;
declare function getFileExt(path: string): string;
declare type Arrayable<T> = T | T[];
declare function toArray<T>(v: Arrayable<T>): T[];
declare function registerRegExpToJSON(): () => void;

declare const defaultRules: HighlightRule[];
declare function matchRule(info: UtilityInfo, rules?: HighlightRule[]): HighlightRule | undefined;

interface AnalysisOptions {
    interpretUtilities?: boolean;
    utils?: WindiPluginUtils;
}
interface AnalysisReturn {
    result: AnalysisReport;
    utils: WindiPluginUtils;
}
declare function runAnalysis(userOptions?: UserOptions, options?: AnalysisOptions): Promise<AnalysisReturn>;

declare function ApiMiddleware(windicssOptions?: UserOptions$1, analysisOptions?: AnalysisOptions): Connect.NextHandleFunction;

interface ServerOptions {
    port?: number;
    open?: boolean;
    root?: string;
}
declare function startServer(options?: ServerOptions): Promise<Connect.Server>;

interface BuildOptions {
    root: string;
    outDir: string;
    demo?: boolean;
    windiOptions?: UserOptions$1;
}
declare function generateBuild(options: BuildOptions): Promise<void>;

export { AnalysisOptions, AnalysisReport, AnalysisReturn, ApiMiddleware, Arrayable, BaseInfo, BuildOptions, ColorInfo, FileInfo, HighlightRule, ServerOptions, UtilityInfo, countElement, defaultRules, generateBuild, getFileExt, matchRule, registerRegExpToJSON, runAnalysis, startServer, timeout, toArray, tryPort, uniq };

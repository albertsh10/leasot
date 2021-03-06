import { BuiltinReporters, ExtensionsDb, ReporterName, Tag, TodoComment } from '../definitions';
import { report } from '..';

/**
 * @hidden
 */
export interface CommonProgramArgs {
    readonly exitNicely?: boolean;
    readonly ignore?: string[];
    readonly reporter?: BuiltinReporters | ReporterName;
}

/**
 * @hidden
 */
export interface ProgramArgs extends CommonProgramArgs {
    readonly associateParser?: ExtensionsDb;
    readonly filetype?: string;
    readonly inlineFiles?: boolean;
    readonly skipUnsupported?: boolean;
    readonly tags?: Tag[];
}

export const outputTodos = (todos: TodoComment[], options: ProgramArgs) => {
    try {
        const output = report(todos, options.reporter);
        console.log(output);
    } catch (e) {
        console.error(e);
    }
    if (options.exitNicely) {
        process.exit(0);
    }
    process.exit(todos.length ? 1 : 0);
};

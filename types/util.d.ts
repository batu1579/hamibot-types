
/*
 * @Author: 
 * @CreateDate: 2025-11-3 17:02:45
 * @LastEditor: 
 * @LastTime: 2025-11-3 17:02:45
 * @FilePath: \\types\\util.d.ts
 * @Description: 
 */
declare module 'util' {

    global {
        /**
         * @description: 工具模块
         * 
         * util模块是对齐早期Node.js的util模块而实现的，另外为方便Java交互而增加了util.java对象。
         * 
         */
        const util: Util;
    }

    interface Util {
        /**
         * @description: 提供Java交互的辅助工具。
         */
        java: Java;

        /**
         * 此方法使用第一个参数返回一个格式化的字符串作为类似printf的格式。
         * 
         * 第一个参数是一个包含零个或多个 placeholder 标记的字符串。 每个占位符标记都替换为从对应的论据。 支持的占位符有：
         *
         * - %s - 字符串。
         * - %d - 数字（整数或浮点值）。
         * - %i - 整数。
         * - %f - 浮点值。
         * - %j - JSON。 如果参数被替换为字符串 '[Circular]'包含循环引用。
         * - %o - 对象。 对象的字符串表示： 使用通用的 JavaScript 对象格式。 类似于 util.inspect()，带有选项 { showHidden: true, depth: 4, showProxy: true }。 这将显示完整的对象，包括不可枚举的符号和属性。
         * - %O - 对象。 具有通用 JavaScript 对象格式的对象的字符串表示形式。 类似于 util.inspect() 没有选项。 这将显示不包括不可枚举符号和属性的完整对象。
         * - %% - 单个百分号（'%'）。 这不会消耗一个论点。
         * 
         * ————————————————————————
         * 
         * 如果占位符没有对应的参数，则占位符为没有被替换。
         * ```typescript
         * util.format('%s:%s', 'foo');
         * // Returns: 'foo:%s'
         *  ```
         * ————————————————————————
         * 
         * 如果传递给 util.format() 方法的参数多于占位符的数量，则额外的参数将被强制转换为字符串，然后连接到返回的字符串，每个字符串由空格分隔。 typeof 为 'object' 或 'symbol' 的过多参数（null 除外）将由 util.inspect() 转换。
         * ```typescript
         * util.format('%s:%s', 'foo', 'bar', 'baz'); // 'foo:bar baz'
         * ```
         * ————————————————————————
         * 
         * 如果第一个参数不是字符串，则 util.format() 返回一个字符串，该字符串是由空格分隔的所有参数的串联。 使用 util.inspect() 将每个参数转换为字符串。
         * ```typescript
         * util.format(1, 2, 3); // '1 2 3'
         * ```
         * ————————————————————————
         * 
         * 如果只有一个参数被传递给 util.format() ，它会按原样返回，没有任何格式。
         * ```typescript
         * util.format('%% %s'); // '%% %s'
         * ```
         * ————————————————————————
         * 
         * @param format 类似printf的格式字符串。
         * @return 返回格式化后的字符串。
         */
        format(format: string, ...args: any): string;

        /**
         * 此方法返回 object 的字符串表示形式，主要用于调试。 可以传递额外的 options来改变格式化字符串的某些方面。
         * 
         * 以下示例检查 util 对象的所有属性：
         * 
         * ```typescript
         * console.log(util.inspect(util, { showHidden: true, depth: null }));
         * ```
         * 
         * 值可以提供它们自己的自定义inspect(depth, opts)函数，当调用这些函数时，它们会在递归检查中接收当前的 depth ，以及传递给util.inspect()的选项对象。
         * 
         * @param obj 任何 JavaScript 原语或对象
         * @param options 选项 {对象}
         * @param {boolean} options.showHidden {boolean} 如果为 true，则 object 的不可枚举符号和属性将包含在格式化结果中。 默认为false。
         * @param {number} options.depth {number} 指定格式化object时递归的次数。 这对于检查大型复杂对象很有用。默认为2。 为了让它无限期地递归，传递null。
         * @param {boolean} colors {boolean} 如果为 true，输出将使用 ANSI 颜色样式代码。 默认为false。 颜色是可自定义的，请参阅 Customizing util.inspect colors。
         * @param {boolean} customInspect {boolean} 如果为 false，则不会调用在被检查的object上导出的自定义inspect(depth, opts)函数。默认为true。
         */
        inspect(obj: any, options?: object, colors?: boolean, customInspect?: boolean): string;

        /**
         * 将原型方法从一个构造函数继承到另一个构造函数。类似于Node.js中的util.inherits。
         * 
         * ————————————————————————
         * ```typescript
         * function SuperClass() {
         *     this.value = 1;
         * }
         * 
         * SuperClass.prototype.increment = function() {
         *     this.value++;
         * }
         * 
         * util.extend(ChildClass, SuperClass);
         * 
         * function ChildClass() {
         * SuperClass.call(this);
         * }
         * 
         * ChildClass.prototype.print = function () {
         * console.log(this.value);
         * }
         * 
         * let child = new ChildClass();
         * child.increment();
         * child.print();
         * ```
         * ————————————————————————
         * 
         * @param target 目标构造函数。
         * @param source 要继承的构造函数。
         */
        extend(target: object, source: object): void;
    }

    interface Java {
        /**
         * @description: 判断一个对象是否属于某个指定的类的实例。
         * @param obj Java对象。
         * @param clazz 类名。
         * @return 如果是，返回true，否则返回false。
         */
        instanceOf(obj: any, clazz: string): boolean;

        /**
         * @description: 创建一个Java数组并返回。例如创建二进制byte数组 let bytes = util.java.array('byte', 1024)。
         * @param type 数组类型，可以是一个Java类名，或者是以下初始类型的名称： "int"、"long"、"double"、"char"、"byte"、"float"
         * @param size 数组大小。
         * @return 返回一个Java数组对象。
         */
        array(type: string, size: number): any;

        /**
         * @description: 将Java列表转换为javascript数组。
         * @param list java.util.List列表对象
         * @param nullListToEmptyArray null列表对象是否转化为空数组。
         * @return 返回js数组对象。
         */
        toJsArray(list: any, nullListToEmptyArray: boolean): [];

        /**
         * @description: 将JavaScript object对象转换成java.util.Map。
         * @param obj 对象。
         * @return 返回java.util.Map对象。
         */
        objectToMap(obj: any): any;

        /**
         * @description: 将java.util.Map的java对象转换成JavaScript object对象。
         * @param map Java Map对象。
         * @return 返回JavaScript object对象。
         */
        mapToObject(map: any): object;
    }
}
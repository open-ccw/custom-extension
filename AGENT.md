# AGENT.md — Patch 官方扩展方法指南

本文件面向 AI 助手（Agent）与开发者，说明如何在本仓库中"patch（修补/反编译重构）"官方扩展，使其从混淆/打包后的产物还原为规范、可读、可维护的 class 扩展源码。

## 背景：为什么要 patch

本仓库 `officialExt/` 目录下的扩展源文件（例如 `fermi.ts`、`layerMgr.ts`）最初是从官方扩展的打包产物中提取/反编译出来的，存在以下问题：

- 是 Babel / webpack 打包后的代码，包含 `webpackChunk`、`module.exports`、大量 minified 辅助函数（`p(t.prototype, KV)`、`h(t.prototype, r)` 等）。
- 所有 class 方法被打包成 `[{key, value}, ...]` 数组，再通过 `Object.defineProperties` 批量挂到原型上，导致代码不可读、难以维护。
- 引用了 `ArgumentType`、`BlockType`、`Cast`、图标 data URI 等来自其它模块（webpack chunk 之外）的依赖。

patch 的目标就是把这类文件还原为项目约定的、规范的 class 扩展写法。

## 项目约定的标准扩展写法

参照 `docs/example-extension.js` 与 `extensions/Fath/CocreaFetch.js`，本项目遵循 Gandi / TurboWarp 兼容的扩展格式：

- 使用全局 `Scratch` 对象：
  - `Scratch.BlockType`（COMMAND、REPORTER、BUTTON、HAT、BOOLEAN、CONDITIONAL、EVENT、LOOP）
  - `Scratch.ArgumentType`（STRING、NUMBER、BOOLEAN、COLOR、ANGLE、MATRIX、NOTE、IMAGE）
  - `Scratch.Cast`（`toNumber`、`toString`、`toBoolean` 等）
- 扩展是一个 class，包含 `constructor(runtime)` 与 `getInfo()`，每个积木一个同名 class 方法。
- 多语言通过 `runtime.getFormatMessage({...})` 或 `translate.setup({...})` 处理。
- 默认导出该 class（`export default class XxxExt`）。
- 添加导出适配extension manager的元数据`export const __esModule = true;`

## 反编译产物 → 规范 class 的映射表

遇到打包/混淆产物时，按以下对应关系还原：

| 打包/混淆写法                                                         | 还原为                                                 |
| --------------------------------------------------------------------- | ------------------------------------------------------ |
| `i().COMMAND`、`i().BUTTON`、`i().REPORTER`                           | `Scratch.BlockType.COMMAND` 等                         |
| `n().STRING`、`n().NUMBER`、`n().BOOLEAN`                             | `Scratch.ArgumentType.STRING` 等                       |
| `l().toNumber(x)`、`l().toString(x)`                                  | `Scratch.Cast.toNumber(x)`、`Scratch.Cast.toString(x)` |
| `p(t.prototype, KV)` / `h(t.prototype, r)` 中的 `[{key, value}]` 数组 | class 内的实例方法                                     |
| `{key: "getInfo", value: function(){...}}`                            | `getInfo() { ... }`                                    |
| `{key: "STATE_KEY", get: function(){...}}`                            | `static get STATE_KEY() { ... }`                       |
| `this.fm({key: "default"})` / `this.formatMessage("key")`             | 自定义 `formatMessage` 辅助方法，从 `en/zh` 字典解析   |
| `"---".concat(this.formatMessage("div"))`                             | 模板字符串 `` `---${this.formatMessage("div")}` ``     |
| 缺失的 `menuIconURI` / `blockIconURI` 变量                            | 用注释 `// menuIconURI: ...` 标注，待补实际图标        |
| webpack 模块 `module.exports = {...}`                                 | 直接并入代码或替换为 `Scratch.*`                       |

## Patch 步骤

1. **阅读原文件**，识别它是不是打包/反编译产物（查找 `webpackChunk`、`module.exports`、`p(t.prototype, ...)`、minified 变量名等特征）。
2. **解析方法清单**：把 `[{key, value}, ...]` 数组中的所有 key 提取出来，这些就是 class 的方法名。区分三类：
   - `getInfo`：扩展元数据（积木定义、菜单、颜色、图标）。
   - 积木实现方法（名字与 `getInfo` 中 `opcode` 对应）：`maxCloner(args, util)`、`setFramerate(args, util)` 等。
   - 内部辅助方法（动态菜单、hook、格式化）：`__getSpriteFolders`、`__printFolderInGandiTerminal`、`tryHackedFunction` 等。
3. **还原依赖**：把 `ArgumentType`/`BlockType`/`Cast` 等替换为 `Scratch.*`；缺失的图标等资源用注释标注，不要臆造 data URI。
4. **重建多语言**：把散落的 `this.fm({key: "en默认文本"})` 统一为：定义 `en`/`zh` 字典常量，构造 `formatMessage(key)` 方法，内部调用 `runtime.getFormatMessage` 解析。
5. **重构为 class 方法**：将 `getInfo` 内的积木定义整理为清晰的对象；将实现函数改写为 class 方法并保持参数 `(args, util)` 签名不变。
6. **验证**：用 `read_lints` 检查该文件，修复新增的 TypeScript 错误（未初始化字段用 `!` 标注、回调里隐式 `this` 加 `this: any`、索引可能为 undefined 时做守卫等）。
7. **保留导出**：文件默认导出 class（`export default class XxxExt`），保持与项目其它扩展一致的接入方式。

## 注意事项

- **不要臆造缺失内容**：图标、外部依赖、缺失的模块等只能以注释标注待补，不能伪造 data URI 或凭空补逻辑。
- **保持行为一致**：还原时不得改变扩展的逻辑（opcode、blockType、参数默认值、菜单项、hook 行为等），只做语法与结构层面的还原。
- **minified 命名**：`n`/`i`/`l`/`c`/`p`/`r` 等单字母变量通常是被打包后的模块名，对应关系以本项目约定为准（见上表），不确定时先在仓库内搜索类似用法确认。
- **entry/index.ts**：部分官方扩展的 `info`/`l10n` 元数据已存在于 `entry/index.ts`（如 `layerManager`、`GandiFermi`），但缺少 `Extension` 加载器。若需要真正接入加载，还应补充 `Extension` 加载代码（参考 `CocreaFetch` 的 `window.tempExt` 模式）——这不在单纯 patch 源文件的范围内，如有需要单独说明。
- **不要删除 `.codebuddy` 目录**：它存储项目相关数据，不是临时缓存。
- **不要重写大文件**：优先在理解文件后用 `replace_in_file` 做定点编辑；仅当文件是打包产物且需整体还原时才用 `write_to_file` 整体重写。
- **lint 提示**：cSpell 对 `Gandi`、`AFFECTABLE` 等专有名词的提示、未使用参数（积木签名要求）等 INFO/HINT 属正常，可忽略；重点修复 ERROR。

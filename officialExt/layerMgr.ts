declare const Scratch: any;

const NS = "layerManager";

/**
 * 多语言字典：key -> [中文, English]
 */
const messages: Record<string, [string, string]> = {
  extensionName: ["图层管理", "Layer Management"],
  div1: ["🏗️ 图层层级", "🏗️ Layer Hierarchy"],
  div2: ["🔄 层级内顺序", "🔄 Sprite Order in Layer"],
  div3: ["✨ 特效分层（配合雷神扩展）", "✨ Post Effect for Layer (with Quake)"],
  docsURI: [
    "https://learn.ccw.site/article/ed40913d-60d6-4f81-95dc-bf05237aafeb",
    "https://getgandi.com/extensions/layers",
  ],
  setLayerManager: ["[OP]图层管理器", "[OP] the layer manager"],
  setSortOrder: ["设置排序方式为[ORDER]", "set sorting order to [ORDER]"],
  checkLayerLevelsButton: ["查看图层层级结构", "Display layer hierarchy"],
  checkLayerLevels: ["在控制台打印图层层级结构", "print layer hierarchy in terminal"],
  infoHeader: ["图层层级结构", "Layer Hierarchy"],
  noFolder: ["(还没有建立图层层级)", " (Layer hierarchy not defined)"],
  defineLayerLevels: [
    "定义图层层级(由高到低)[LEVELS]，并以[LEVEL]作为默认层级",
    "define layer hierarchy (above to below)[LEVELS], and set [LEVEL] as the default layer",
  ],
  defaultLevels: ["UI层,默认层,背景层", "UI,Default,Background"],
  defaultLevel: ["默认层", "Default"],
  levelUndefined: ["还未定义层级，请先定义", "layer hierarchy not defined yet"],
  moveSpritesInFolderToLevel: [
    "将文件夹[FOLDER]中的[TYPE]移到层级[LEVEL]",
    "move [TYPE] in the folder[FOLDER]to the layer[LEVEL]",
  ],
  onlySprites: ["仅角色", "only sprites"],
  spritesAndClones: ["角色和克隆体", "sprites and clones"],
  setTargetLayerLevel: ["将[TARGET]移到层级[LEVEL]", "move [TARGET] to the layer [LEVEL]"],
  setTargetLayerPriority: [
    "将[TARGET]的层级内排序值设为[PRIORITY]",
    "set [TARGET] z-index in layer to[PRIORITY]",
  ],
  setCanvasLayerLevel: [
    "🖼️设置[TARGET]的高级画笔的层级[LEVEL]",
    "🖼️set [TARGET] canvas's layer to [LEVEL]",
  ],
  setCanvasLayerPriority: [
    "🖼️将[TARGET]的高级画笔的图层排序值设为[PRIORITY]",
    "🖼️set [TARGET] canvas's z-index in layer to[PRIORITY]",
  ],
  getTargetLayerInfo: ["[TARGET]的[INFO]", "[TARGET][INFO]"],
  my: ["我", "my"],
  myself: ["我", "myself"],
  setMinUnshadedIndex: [
    "使层级[LEVEL]中排序值[INDEX]及上方图层不受雷神特效影响",
    "excludes layer with z-index [INDEX] and layers above in hierarchy [LEVEL] from post effects",
  ],
  setMinUnshadedTarget: [
    "使角色[TARGET]及其上方图层不受雷神特效影响",
    "exclude sprite [TARGET] and layers above from post effects",
  ],
  setMinUnshadedLevel: [
    "使层级[LEVEL]及其上方图层不受雷神特效影响",
    "exclude layer [LEVEL] and above from post effects",
  ],
  allSprites: ["全体角色", "all sprites"],
  inFrontOf: ["前面", "in front of"],
  behind: ["后面", "behind"],
  ascending: ["排序值小的图层在上", "smaller z on top"],
  descending: ["排序值大的图层在上", "larger z on top"],
  activate: ["启动", "activate"],
  deactivate: ["关闭", "deactivate"],
  affected: ["受", "affected"],
  unaffected: ["不受", "unaffected"],
  level: ["图层层级", "layer"],
  myPriority: ["层级内排序值", "z-index in layer"],
  myLayer: ["图层序号", "layer's index"],
};

export default class LayerManagerExt {
  runtime: any;
  renderer: any;
  layerManager: any;
  rootFolder: any;
  canvasExtensionDetected: any;
  _terminalShowed: any;
  formatMessage!: (key: string) => string;

  constructor(runtime: any) {
    this.runtime = runtime;
    this.renderer = this.runtime.renderer;
    this.layerManager = this.renderer.layerManager;
    this.rootFolder = this.layerManager.rootFolder;

    const timer = setInterval(() => {
      if (this.runtime.targets.length > 0) {
        clearInterval(timer);
        this.hackScratchFunctions();
      }
    }, 1000);

    this.initFormatMessage();
  }

  /**
   * 根据 messages 字典构造运行时翻译函数，id 统一以 "layerManager." 为前缀。
   */
  initFormatMessage() {
    const dict = {
      "zh-cn": {} as Record<string, string>,
      en: {} as Record<string, string>,
    };
    Object.entries(messages).forEach(([key, [zh, en]]) => {
      const id = `${NS}.${key}`;
      dict["zh-cn"][id] = zh;
      dict.en[id] = en;
    });

    const translate = this.runtime.getFormatMessage(dict);
    this.formatMessage = (key: string) =>
      translate({
        ID: `${NS}.${key}`,
        default: `${NS}.${key}`,
        description: `${NS}.${key}`,
      });
  }

  getInfo() {
    this.canvasExtensionDetected = this.runtime._blockInfo.find(
      (e: any) => "CCWCanvasV2" === e.id
    );

    return {
      id: NS,
      name: this.formatMessage("extensionName"),
      docsURI: this.formatMessage("docsURI"),
      color1: "#9A4BB3",
      // menuIconURI: icon,
      // blockIconURI: icon,
      blocks: [
        {
          opcode: "setLayerManager",
          blockType: Scratch.BlockType.COMMAND,
          text: this.formatMessage("setLayerManager"),
          arguments: {
            OP: {
              type: Scratch.ArgumentType.STRING,
              menu: "ON_OR_OFF",
            },
          },
        },
        {
          opcode: "setSortOrder",
          blockType: Scratch.BlockType.COMMAND,
          text: this.formatMessage("setSortOrder"),
          arguments: {
            ORDER: {
              type: Scratch.ArgumentType.STRING,
              menu: "SORTING_ORDER",
            },
          },
        },
        `---${this.formatMessage("div1")}`,
        {
          opcode: "checkLayerLevelsButton",
          blockType: Scratch.BlockType.BUTTON,
          text: this.formatMessage("checkLayerLevelsButton"),
          onClick: () => {
            this._terminalShowed = 1;
            if (this._terminalShowed) {
              this.runtime.logSystem.show();
              this.runtime.logSystem.clear();
              this.runtime.logSystem.info(
                `----------------${this.formatMessage("infoHeader")}----------------`
              );
              this.__printFolderInGandiTerminal(this.rootFolder);
            } else {
              this.runtime.logSystem.hide();
            }
          },
        },
        {
          opcode: "defineLayerLevels",
          blockType: Scratch.BlockType.COMMAND,
          text: this.formatMessage("defineLayerLevels"),
          arguments: {
            LEVELS: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: this.formatMessage("defaultLevels"),
            },
            LEVEL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: this.formatMessage("defaultLevel"),
            },
          },
        },
        {
          opcode: "moveSpritesInFolderToLevel",
          blockType: Scratch.BlockType.COMMAND,
          text: this.formatMessage("moveSpritesInFolderToLevel"),
          arguments: {
            FOLDER: {
              type: Scratch.ArgumentType.STRING,
              menu: "FOLDERS",
            },
            LEVEL: {
              type: Scratch.ArgumentType.STRING,
              menu: "LEVELS",
              defaultValue: "-",
            },
            TYPE: {
              type: Scratch.ArgumentType.STRING,
              menu: "IF_ONLY_SPRITE",
            },
          },
        },
        `---${this.formatMessage("div2")}`,
        {
          opcode: "setTargetLayerLevel",
          blockType: Scratch.BlockType.COMMAND,
          text: this.formatMessage("setTargetLayerLevel"),
          arguments: {
            TARGET: {
              type: Scratch.ArgumentType.STRING,
              menu: "SPRITES",
            },
            LEVEL: {
              type: Scratch.ArgumentType.STRING,
              menu: "LEVELS",
              defaultValue: "-",
            },
          },
        },
        {
          opcode: "setTargetLayerPriority",
          blockType: Scratch.BlockType.COMMAND,
          text: this.formatMessage("setTargetLayerPriority"),
          arguments: {
            TARGET: {
              type: Scratch.ArgumentType.STRING,
              menu: "SPRITES_WITH_MY",
            },
            PRIORITY: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1,
            },
          },
        },
        {
          opcode: "getTargetLayerInfo",
          blockType: Scratch.BlockType.REPORTER,
          disableMonitor: true,
          text: this.formatMessage("getTargetLayerInfo"),
          arguments: {
            TARGET: {
              type: Scratch.ArgumentType.STRING,
              menu: "SPRITES_WITH_MY",
            },
            INFO: {
              type: Scratch.ArgumentType.STRING,
              menu: "LAYER_INFO",
            },
          },
        },
        "---",
        {
          opcode: "setCanvasLayerLevel",
          blockType: Scratch.BlockType.COMMAND,
          text: this.formatMessage("setCanvasLayerLevel"),
          hideFromPalette: !this.canvasExtensionDetected,
          arguments: {
            TARGET: {
              type: Scratch.ArgumentType.STRING,
              menu: "SPRITES_WITH_MY",
            },
            LEVEL: {
              type: Scratch.ArgumentType.STRING,
              menu: "LEVELS",
              defaultValue: "-",
            },
          },
        },
        {
          opcode: "setCanvasLayerPriority",
          blockType: Scratch.BlockType.COMMAND,
          text: this.formatMessage("setCanvasLayerPriority"),
          hideFromPalette: !this.canvasExtensionDetected,
          arguments: {
            TARGET: {
              type: Scratch.ArgumentType.STRING,
              menu: "SPRITES_WITH_MY",
            },
            PRIORITY: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1,
            },
          },
        },
        `---${this.formatMessage("div3")}`,
        {
          opcode: "setMinUnshadedLevel",
          blockType: Scratch.BlockType.COMMAND,
          text: this.formatMessage("setMinUnshadedLevel"),
          arguments: {
            LEVEL: {
              type: Scratch.ArgumentType.STRING,
              menu: "LEVELS",
              defaultValue: "-",
            },
          },
        },
        {
          opcode: "setMinUnshadedIndex",
          blockType: Scratch.BlockType.COMMAND,
          text: this.formatMessage("setMinUnshadedIndex"),
          arguments: {
            INDEX: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 5,
            },
            LEVEL: {
              type: Scratch.ArgumentType.STRING,
              menu: "LEVELS",
              defaultValue: "-",
            },
          },
        },
        {
          opcode: "setMinUnshadedTarget",
          blockType: Scratch.BlockType.COMMAND,
          text: this.formatMessage("setMinUnshadedTarget"),
          arguments: {
            TARGET: {
              type: Scratch.ArgumentType.STRING,
              menu: "SPRITES",
            },
          },
        },
      ],
      menus: {
        IF_ONLY_SPRITE: [
          { text: this.formatMessage("spritesAndClones"), value: "spriteAndClone" },
          { text: this.formatMessage("onlySprites"), value: "sprite" },
        ],
        SORTING_ORDER: [
          { text: this.formatMessage("descending"), value: "desc" },
          { text: this.formatMessage("ascending"), value: "asc" },
        ],
        ON_OR_OFF: [
          { text: this.formatMessage("activate"), value: "on" },
          { text: this.formatMessage("deactivate"), value: "off" },
        ],
        FOLDERS: {
          acceptReporters: true,
          items: "__getSpriteFolders",
        },
        LEVELS: {
          acceptReporters: true,
          items: "__getLayerLevelsMenu",
        },
        SPRITES: {
          acceptReporters: true,
          items: "__spriteListWithMe",
        },
        SPRITES_WITH_MY: {
          acceptReporters: true,
          items: "__spriteListWithMy",
        },
        FRONT_OR_BEHIND: {
          items: [
            { text: this.formatMessage("inFrontOf"), value: "front" },
            { text: this.formatMessage("behind"), value: "behind" },
          ],
        },
        AFFECTABLE: [
          { text: this.formatMessage("unaffected"), value: "no" },
          { text: this.formatMessage("affected"), value: "yes" },
        ],
        LAYER_INFO: [
          { text: this.formatMessage("level"), value: "level" },
          { text: this.formatMessage("myPriority"), value: "myPri" },
          { text: this.formatMessage("myLayer"), value: "layer" },
        ],
      },
    };
  }

  __getSpriteFolders() {
    const targets = this.runtime.targets;
    const folders = new Set<string>();
    targets.forEach((t: any) => {
      const info = this.getFolderAndSpriteName(t.getName());
      if (!info.isSingleSprite && info.folderName) folders.add(info.folderName);
    });

    const result: { text: string; value: string }[] = [];
    result.push({ text: this.formatMessage("allSprites"), value: "__all__" });
    folders.forEach((e) => result.push({ text: e, value: e }));
    if (result.length === 0) {
      result.push({ text: "-", value: "" });
    }
    return result;
  }

  __getLayerLevelsMenu() {
    const levels = this.rootFolder.items
      .filter((e: any) => typeof e === "object")
      .map((e: any) => e.name)
      .reverse();
    if (levels.length === 0) {
      levels.push({ text: this.formatMessage("levelUndefined"), value: "" });
    }
    return levels;
  }

  __spriteListWithMy() {
    return this.__spriteListWithMe("", "my");
  }

  __spriteListWithMe(_e: any, r: any = "myself") {
    const result: { text: string; value: string }[] = [];
    result.push({ text: this.formatMessage(r), value: "__myself__" });
    this.runtime.targets.forEach((target: any) => {
      if (
        target.isOriginal &&
        !target.isStage &&
        target !== this.runtime._editingTarget
      ) {
        result.push({ text: target.sprite.name, value: target.sprite.name });
      }
    });
    if (result.length === 0) {
      result.push({ text: "-", value: "" });
    }
    return result;
  }

  /**
   * 以 hook 方式包装某个函数，保留原实现并插入额外逻辑。
   */
  tryHackedFunction(e: any, t: string, r: (...args: any[]) => any) {
    if (!e[`${NS}_origFun`]) e[`${NS}_origFun`] = {};
    const a = e[`${NS}_origFun`];
    if (!a[t]) {
      a[t] = true;
      const original = e[t];
      e[t] = function (...args: any[]) {
        return r.apply(this, [original, ...args]);
      };
    }
  }

  getFolderAndSpriteName(
    e: string
  ): { isSingleSprite: boolean; folderName?: string; spriteName?: string } {
    const match = /^([^/]+)\/\/(.*)$/.exec(e);
    if (match) {
      return { isSingleSprite: false, folderName: match[1], spriteName: match[2] };
    }
    return { isSingleSprite: true, spriteName: e };
  }

  /**
   * hook 角色渲染层相关的若干原生函数，以配合图层层级管理。
   */
  hackScratchFunctions() {
    const layerManager = this.layerManager;
    const renderer = this.renderer;

    this.tryHackedFunction(this.runtime.ext_scratch3_looks, "_positionBubble", function (
      this: any,
      original: any,
      args: any
    ) {
      const bubbleDrawableId = this._getBubbleState(args).drawableId;
      if (bubbleDrawableId) {
        renderer.getDrawableLayerFolder(args.drawableID).add(bubbleDrawableId);
        const order = renderer.getDrawableLayerIndex(args.drawableID) + 0.001 * layerManager.order;
        renderer.setDrawableLayerIndex(bubbleDrawableId, order);
      }
      return original.call(this, args);
    });

    const prototype = Object.getPrototypeOf(this.runtime.targets[0]);

    this.tryHackedFunction(prototype, "makeClone", function (this: any, original: any) {
      const clone = original.call(this);
      if (clone) {
        const src = this.drawableID;
        const dst = clone.drawableID;
        renderer.getDrawableLayerFolder(src).add(dst);
        const order = renderer.getDrawableLayerIndex(src) - 0.01 * layerManager.order;
        renderer.setDrawableLayerIndex(dst, order);
      }
      return clone;
    });

    this.tryHackedFunction(prototype, "goBehindOther", function (
      this: any,
      original: any,
      other: any
    ) {
      const selfIndex = renderer.getDrawableLayerIndex(this.drawableID);
      const otherIndex = renderer.getDrawableLayerIndex(other.drawableID);
      original.call(this, other);
      renderer.setDrawableLayerIndex(this.drawableID, selfIndex);
      renderer.setDrawableLayerIndex(other.drawableID, otherIndex);
    });
  }

  __printFolderInGandiTerminal(e: any, r: string = "", a: string = "") {
    const logSystem = this.runtime.logSystem;
    const round = (n: number) => parseFloat(n.toFixed(2));
    const indexStr = (n: number) => `\u001b[0;97m(${round(n)})\u001b[0;92m`;

    const items = [...e.items]
      .reverse()
      .map((item: any) =>
        typeof item === "object" ? item : this.runtime.getTargetByDrawableId(item)
      )
      .filter((item: any) => item && item.isOriginal !== false);

    items.forEach((item: any, i: number) => {
      const prefix = a + r + (i === items.length - 1 ? "└" : "├");
      if (item.isOriginal !== true) {
        logSystem.info(`${prefix}\u001b[0;93m📁  ${item.name}\u001b[0m`);
        this.__printFolderInGandiTerminal(
          item,
          `${r} `,
          i === items.length - 1 ? " " : "│"
        );
      } else {
        const name = item.sprite.name;
        const layerIndex = this.renderer.getDrawableLayerIndex(item.drawableID);
        logSystem.info(`${prefix}${indexStr(layerIndex)}${name}`);
      }
    });
  }

  setLayerManager(args: any) {
    this.layerManager.enableLayerSorting(args.OP === "on");
  }

  setSortOrder(args: any) {
    const isAscending = args.ORDER === "asc";
    const value = 1 - Number(isAscending);
    if ((value ? 1 : -1) !== this.layerManager.order) {
      Object.values(this.rootFolder.nameToSubFolder).forEach((e: any) => {
        e.layerIndex *= -1;
      });
    }
    this.layerManager.setSortInAscendingOrder(value);
  }

  defineLayerLevels(args: any) {
    const levels = Scratch.Cast.toString(args.LEVELS);
    if (levels !== "") {
      const list = levels.split(",").map((s: string) => s.trim());
      this.__generateLayerLevelsFromList(list, Scratch.Cast.toString(args.LEVEL));
    }
  }

  __removeFolder1AndMoveItemsToFolder2(e: any, t: any) {
    if (e && t && e !== t) {
      while (e.items.length > 0) t.add(e.items[0]);
      if (e.parent) e.parent.remove(e);
    }
  }

  __generateLayerLevelsFromList(e: string[], t: string) {
    const levels = Array.from(new Set(e)).reverse();
    if (levels.length === 0) return;

    let defaultIndex = levels.indexOf(t);
    if (defaultIndex === -1) defaultIndex = Math.min(levels.length - 1, 1);

    const folders = levels.map((name) => {
      const folder = this.layerManager.createLayerFolder(name);
      this.rootFolder.changeDrawableOrder(folder, this.layerManager.order, Infinity);
      return folder;
    });
    const defaultFolder = folders[defaultIndex];
    this.layerManager.defaultFolderDrawableAddTo = defaultFolder;

    for (let s = 0; s < this.rootFolder.items.length; ) {
      const item = this.rootFolder.items[s];
      if (typeof item === "object") {
        if (folders.includes(item)) {
          s++;
        } else {
          this.__removeFolder1AndMoveItemsToFolder2(item, defaultFolder);
        }
      } else {
        defaultFolder.add(item);
      }
    }
  }

  moveSpritesInFolderToLevel(args: any) {
    const folderName = Scratch.Cast.toString(args.FOLDER);
    const level = args.LEVEL;
    const type = args.TYPE;
    const isAll = folderName === "__all__";
    const onlySprites = type === "sprite";

    let folder = this.rootFolder.nameToSubFolder[level];
    if (!folder) folder = this.layerManager.createLayerFolder(level);

    this.runtime.targets.forEach((target: any) => {
      if (!target.isStage && (target.isOriginal || !onlySprites)) {
        const info = this.getFolderAndSpriteName(target.getName());
        if (isAll || (!info.isSingleSprite && info.folderName === folderName)) {
          folder.add(target.drawableID);
        }
      }
    });
  }

  getLayerIndexForItem(e: any) {
    return typeof e === "object" ? e.layerIndex : this.renderer.getDrawableLayerIndex(e);
  }

  __printFolderInConsole(e: any, r: string = "") {
    const round = (n: number) => parseFloat(n.toFixed(2));
    console.group(`${r}${round(e.layerIndex)}=folder:${e.name}`);
    e.items.forEach((item: any) => {
      if (typeof item === "object") {
        this.__printFolderInConsole(item);
      } else {
        const layerIndex = this.renderer.getDrawableLayerIndex(item);
        console.log(`  ${round(layerIndex)}=draw${item}`);
      }
    });
    console.groupEnd();
  }

  test() {
    this.__printFolderInConsole(this.rootFolder);
  }

  __getTargetByIdOrName(e: string, util: any) {
    if (e === "__myself__") return util.target;
    let target = this.runtime.getSpriteTargetByName(e);
    if (!target) target = this.runtime.getTargetById(e);
    return target || null;
  }

  setTargetLayerLevel(args: any, util: any) {
    const target = this.__getTargetByIdOrName(Scratch.Cast.toString(args.TARGET), util);
    if (target && !target.isStage) {
      let folder = this.rootFolder.nameToSubFolder[args.LEVEL];
      if (!folder) folder = this.layerManager.createLayerFolder(args.LEVEL);
      folder.add(target.drawableID);
    }
  }

  setCanvasLayerLevel(args: any, util: any) {
    const target = this.__getTargetByIdOrName(Scratch.Cast.toString(args.TARGET), util);
    if (target && !target.isStage && this.runtime.ext_CCWCanvasV2) {
      const state = target.getCustomState("CCW.CanvasV2");
      if (state != null && state.drawableID) {
        let folder = this.rootFolder.nameToSubFolder[args.LEVEL];
        if (!folder) folder = this.layerManager.createLayerFolder(args.LEVEL);
        folder.add(state.drawableID);
      }
    }
  }

  setCanvasLayerPriority(args: any, util: any) {
    const target = this.__getTargetByIdOrName(Scratch.Cast.toString(args.TARGET), util);
    if (target && !target.isStage && this.runtime.ext_CCWCanvasV2) {
      const state = target.getCustomState("CCW.CanvasV2");
      if (state != null && state.drawableID) {
        this.renderer.setDrawableLayerIndex(state.drawableID, Scratch.Cast.toNumber(args.PRIORITY));
      }
    }
  }

  setTargetLayerPriority(args: any, util: any) {
    const target = this.__getTargetByIdOrName(Scratch.Cast.toString(args.TARGET), util);
    if (target && !target.isStage) {
      this.renderer.setDrawableLayerIndex(target.drawableID, Scratch.Cast.toNumber(args.PRIORITY));
    }
  }

  setMinUnshadedIndex(args: any) {
    const level = args.LEVEL;
    const folder = this.rootFolder.nameToSubFolder[level];
    if (folder) {
      const index = args.INDEX === "" ? Infinity : Scratch.Cast.toNumber(args.INDEX);
      this.layerManager.setMinUnshadedInfo(2, [index, folder]);
    }
  }

  setMinUnshadedTarget(args: any, util: any) {
    const target = this.__getTargetByIdOrName(Scratch.Cast.toString(args.TARGET), util);
    if (target && !target.isStage) {
      this.layerManager.setMinUnshadedInfo(1, target.drawableID);
    }
  }

  setMinUnshadedLevel(args: any) {
    const level = args.LEVEL;
    this.setMinUnshadedIndex({
      INDEX: -Infinity * this.layerManager.order,
      LEVEL: level,
    });
  }

  getTargetLayerInfo(args: any, util: any) {
    const target = this.__getTargetByIdOrName(Scratch.Cast.toString(args.TARGET), util);
    if (!target) return "";
    const folder = this.renderer.getDrawableLayerFolder(target.drawableID);
    switch (args.INFO) {
      case "level":
        return folder && folder !== this.rootFolder ? folder.name : "";
      case "myPri":
        return this.renderer.getDrawableLayerIndex(target.drawableID);
      case "layer":
        return this.runtime.renderer.getDrawableOrder(target.drawableID);
      default:
        return "";
    }
  }
}

export const __esModule = true;

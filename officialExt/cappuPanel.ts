declare const Scratch: any;

/**
 * Tweakpane 依赖：原打包产物中已内联 Tweakpane 库（模块 62264），
 * 其 `Pane` 通过 `new Pane({...})` 创建。此处声明为全局，运行时需由宿主环境提供，
 * 或在使用前引入 Tweakpane（例如 `window.Pane = require("tweakpane").Pane`）。
 */
import { Pane } from "tweakpane";

const NS = "Cappu.panel";

/**
 * 多语言字典：key -> 该 key 的英文/中文文本。
 * 注意：原打包代码中 en 与 zh-cn 使用了相同的 key 集合。
 */
const messages: Record<string, Record<string, string>> = {
  en: {
    name: "PanelGUI",
    openDocs: "📖 Open Docs",
    docsUrl: "https://getgandi.com/extensions/panelgui",
    "tag.props": "📊 Properties",
    "tag.value": "🔍 Value",
    "tag.control": "🕹️ Control",
    "tag.style": "🎨 Style",
    "tag.style.help": "📖 Style Help",
    "block.createGUI.message": "Create panel [NAME]",
    "block.createGUI2.message": "Create panel [NAME] at [POSITION]",
    "block.addStringPropertyTo.message": "Add string [PROPERTY] to [NAME] with default [DEFVAL]",
    "block.addNumberPropertyTo.message": "Add number [PROPERTY] to [NAME] with default [DEFVAL]",
    "block.addNumberPropertyTo2.message":
      "Add number [PROPERTY] to [NAME] with default [DEFVAL] min [MIN] max [MAX] step [STEP]",
    "block.addBooleanPropertyTo.message": "Add boolean [PROPERTY] to [NAME] with default [DEFVAL]",
    "block.addOptionsPropertyTo.message":
      "Add options [PROPERTY] to [NAME] with default [DEFVAL] and options [OPTIONS]",
    "block.addButtonTo.message": "Add button [TITLE] to [NAME]",
    "block.delProperty.message": "Delete property [PROPERTY] from [NAME]",
    "block.readValue.message": "Read JSON value of panel [NAME]",
    "block.readProperty.message": "Read property [PROPERTY] of panel [NAME]",
    "block.listenProperty.message": "Listen to property [PROPERTY] of [NAME]",
    "block.whenPropertyChange.message": "When property [PROPERTY] of panel [NAME] changes to [VALUE]",
    "block.whenButtonClicked.message": "When button [TITLE] of panel [NAME] is clicked",
    "block.mergeJSONToValue.message": "Merge JSON [DATA] into panel [NAME]",
    "block.showGUI.message": "Show panel [NAME]",
    "block.hideGUI.message": "Hide panel [NAME]",
    "block.destroyGUI.message": "Destroy panel [NAME]",
    "block.hideProperty.message": "[SHOW] property [PROPERTY] of panel [NAME]",
    "block.disableProperty.message": "[ENABLE] property [PROPERTY] of panel [NAME]",
    "block.setPanelStyle.message": "Set panel [NAME] style: property [PROPERTY] to [VALUE]",
    "menu.positionTopRight": "Top Right",
    "menu.positionCenter": "Center",
    "menu.positionTopLeft": "Top Left",
    "menu.positionBottomLeft": "Bottom Left",
    "menu.positionBottomRight": "Bottom Right",
    "menu.show": "Show",
    "menu.hide": "Hide",
    "menu.enable": "Enable",
    "menu.disable": "Disable",
  },
  "zh-cn": {
    name: "面板GUI",
    openDocs: "📖 打开文档",
    docsUrl: "https://getgandi.com/extensions/panelgui",
    "tag.props": "📊 属性",
    "tag.value": "🔍 值",
    "tag.control": "🕹️ 控制",
    "tag.style": "🎨 样式",
    "tag.style.help": "📖 样式帮助",
    "block.createGUI.message": "创建面板 [NAME]",
    "block.createGUI2.message": "创建面板 [NAME] 位于 [POSITION]",
    "block.addStringPropertyTo.message": "在 [NAME] 中添加字符串 [PROPERTY] 默认值 [DEFVAL]",
    "block.addNumberPropertyTo.message": "在 [NAME] 中添加数字 [PROPERTY] 默认值 [DEFVAL]",
    "block.addNumberPropertyTo2.message":
      "在 [NAME] 中添加数字 [PROPERTY] 默认值 [DEFVAL] 最小值 [MIN] 最大值 [MAX] 步长 [STEP]",
    "block.addBooleanPropertyTo.message": "在 [NAME] 中添加布尔 [PROPERTY] 默认值 [DEFVAL]",
    "block.addOptionsPropertyTo.message": "在 [NAME] 中添加选项 [PROPERTY] 默认值 [DEFVAL] 选项 [OPTIONS]",
    "block.addButtonTo.message": "在 [NAME] 中添加按钮 [TITLE]",
    "block.delProperty.message": "从 [NAME] 中删除属性 [PROPERTY]",
    "block.readValue.message": "读取面板 [NAME] 的 JSON 值",
    "block.readProperty.message": "读取面板 [NAME] 的属性 [PROPERTY]",
    "block.listenProperty.message": "监听 [NAME] 的属性 [PROPERTY]",
    "block.whenPropertyChange.message": "当监听到面板 [NAME] 的属性 [PROPERTY] 变为 [VALUE] 时",
    "block.whenButtonClicked.message": "当监听到面板 [NAME] 的按钮 [TITLE] 被点击时",
    "block.mergeJSONToValue.message": "将 JSON [DATA] 合并到面板 [NAME]",
    "block.showGUI.message": "显示面板 [NAME]",
    "block.hideGUI.message": "隐藏面板 [NAME]",
    "block.destroyGUI.message": "销毁面板 [NAME]",
    "block.hideProperty.message": "[SHOW] [NAME] 的属性 [PROPERTY]",
    "block.disableProperty.message": "[ENABLE] [NAME] 的属性 [PROPERTY]",
    "block.setPanelStyle.message": "设置面板 [NAME] 样式: 属性 [PROPERTY] 为 [VALUE]",
    "menu.positionTopRight": "右上角",
    "menu.positionCenter": "中间",
    "menu.positionTopLeft": "左上角",
    "menu.positionBottomLeft": "左下角",
    "menu.positionBottomRight": "右下角",
    "menu.show": "显示",
    "menu.hide": "隐藏",
    "menu.enable": "启用",
    "menu.disable": "禁用",
  },
};

export default class CappuPanelExt {
  runtime: any;
  _formatMessage!: (e: { id: string; default: string; description: string }) => string;
  gui: Record<string, any>;
  resizeObserver?: ResizeObserver;

  constructor(runtime: any) {
    this.runtime = runtime;
    this.gui = {};

    // 为字典 key 加上 "Cappu.panel." 前缀后，交给运行时翻译。
    const dict: Record<string, Record<string, string>> = {};
    Object.keys(messages).forEach((locale) => {
      dict[locale] = {};
      Object.keys(messages[locale]).forEach((key) => {
        dict[locale][`${NS}.${key}`] = messages[locale][key];
      });
    });
    this._formatMessage = runtime.getFormatMessage(dict);
  }

  /** 输入容器：渲染画布的父元素，用于挂载 Tweakpane 面板。 */
  _inputParent() {
    try {
      const canvas = this.runtime.renderer.canvas;
      if (canvas instanceof HTMLCanvasElement) return canvas.parentElement;
    } catch (e) {
      return null;
    }
    return null;
  }

  /** 多语言解析，id 统一以 "Cappu.panel." 为前缀。 */
  fm(e: string) {
    const id = `${NS}.${e}`;
    return this._formatMessage({ id, default: id, description: id });
  }

  getHats() {
    return {
      "Cappu.panel_whenPropertyChange": {},
      "Cappu.panel_whenButtonClicked": {},
    };
  }

  getInfo() {
    const blocks = {
      createGUI: {
        hideFromPalette: true,
        opcode: "createGUI",
        blockType: Scratch.BlockType.COMMAND,
        text: this.fm("block.createGUI.message"),
        arguments: {
          NAME: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "setting",
          },
        },
      },
      createGUI2: {
        opcode: "createGUI2",
        blockType: Scratch.BlockType.COMMAND,
        text: this.fm("block.createGUI2.message"),
        arguments: {
          NAME: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "setting",
          },
          POSITION: {
            type: Scratch.ArgumentType.STRING,
            menu: "POSITION",
          },
        },
      },
      addStringPropertyTo: {
        opcode: "addStringPropertyTo",
        blockType: Scratch.BlockType.COMMAND,
        text: this.fm("block.addStringPropertyTo.message"),
        arguments: {
          PROPERTY: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "str",
          },
          NAME: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "setting",
          },
          DEFVAL: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "hello",
          },
        },
      },
      addNumberPropertyTo: {
        opcode: "addNumberPropertyTo",
        blockType: Scratch.BlockType.COMMAND,
        text: this.fm("block.addNumberPropertyTo.message"),
        arguments: {
          PROPERTY: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "num",
          },
          NAME: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "setting",
          },
          DEFVAL: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 0,
          },
        },
      },
      addNumberPropertyTo2: {
        opcode: "addNumberPropertyTo2",
        blockType: Scratch.BlockType.COMMAND,
        text: this.fm("block.addNumberPropertyTo2.message"),
        arguments: {
          PROPERTY: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "num2",
          },
          NAME: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "setting",
          },
          DEFVAL: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 0,
          },
          MIN: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 0,
          },
          MAX: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 100,
          },
          STEP: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 1,
          },
        },
      },
      addBooleanPropertyTo: {
        opcode: "addBooleanPropertyTo",
        blockType: Scratch.BlockType.COMMAND,
        text: this.fm("block.addBooleanPropertyTo.message"),
        arguments: {
          PROPERTY: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "bool",
          },
          NAME: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "setting",
          },
          DEFVAL: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "true",
          },
        },
      },
      addOptionsPropertyTo: {
        opcode: "addOptionsPropertyTo",
        blockType: Scratch.BlockType.COMMAND,
        text: this.fm("block.addOptionsPropertyTo.message"),
        arguments: {
          PROPERTY: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "option",
          },
          NAME: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "setting",
          },
          OPTIONS: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: '{"one":1,"two":2,"three":3}',
          },
          DEFVAL: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "1",
          },
        },
      },
      addButtonTo: {
        opcode: "addButtonTo",
        blockType: Scratch.BlockType.COMMAND,
        text: this.fm("block.addButtonTo.message"),
        arguments: {
          TITLE: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "button",
          },
          NAME: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "setting",
          },
        },
      },
      delProperty: {
        opcode: "delProperty",
        blockType: Scratch.BlockType.COMMAND,
        text: this.fm("block.delProperty.message"),
        arguments: {
          PROPERTY: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "str",
          },
          NAME: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "setting",
          },
        },
      },
      readValue: {
        opcode: "readValue",
        blockType: Scratch.BlockType.REPORTER,
        text: this.fm("block.readValue.message"),
        arguments: {
          NAME: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "setting",
          },
        },
      },
      readProperty: {
        opcode: "readProperty",
        blockType: Scratch.BlockType.REPORTER,
        text: this.fm("block.readProperty.message"),
        arguments: {
          PROPERTY: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "str",
          },
          NAME: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "setting",
          },
        },
      },
      listenProperty: {
        opcode: "listenProperty",
        blockType: Scratch.BlockType.COMMAND,
        text: this.fm("block.listenProperty.message"),
        arguments: {
          PROPERTY: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "str",
          },
          NAME: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "setting",
          },
        },
      },
      whenPropertyChange: {
        opcode: "whenPropertyChange",
        blockType: Scratch.BlockType.HAT,
        isEdgeActivated: false,
        text: this.fm("block.whenPropertyChange.message"),
        arguments: {
          NAME: {
            type: "ccw_hat_parameter",
          },
          PROPERTY: {
            type: "ccw_hat_parameter",
          },
          VALUE: {
            type: "ccw_hat_parameter",
          },
        },
      },
      whenButtonClicked: {
        opcode: "whenButtonClicked",
        blockType: Scratch.BlockType.HAT,
        isEdgeActivated: false,
        text: this.fm("block.whenButtonClicked.message"),
        arguments: {
          NAME: {
            type: "ccw_hat_parameter",
          },
          TITLE: {
            type: "ccw_hat_parameter",
          },
        },
      },
      mergeJSONToValue: {
        opcode: "mergeJSONToValue",
        blockType: Scratch.BlockType.COMMAND,
        text: this.fm("block.mergeJSONToValue.message"),
        arguments: {
          DATA: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "{}",
          },
          NAME: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "setting",
          },
        },
      },
      showGUI: {
        opcode: "showGUI",
        blockType: Scratch.BlockType.COMMAND,
        text: this.fm("block.showGUI.message"),
        arguments: {
          NAME: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "setting",
          },
        },
      },
      hideGUI: {
        opcode: "hideGUI",
        blockType: Scratch.BlockType.COMMAND,
        text: this.fm("block.hideGUI.message"),
        arguments: {
          NAME: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "setting",
          },
        },
      },
      destroyGUI: {
        opcode: "destroyGUI",
        blockType: Scratch.BlockType.COMMAND,
        text: this.fm("block.destroyGUI.message"),
        arguments: {
          NAME: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "setting",
          },
        },
      },
      hideProperty: {
        opcode: "hideProperty",
        blockType: Scratch.BlockType.COMMAND,
        text: this.fm("block.hideProperty.message"),
        arguments: {
          SHOW: {
            type: Scratch.ArgumentType.STRING,
            menu: "SHOW",
          },
          PROPERTY: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "str",
          },
          NAME: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "setting",
          },
        },
      },
      disableProperty: {
        opcode: "disableProperty",
        blockType: Scratch.BlockType.COMMAND,
        text: this.fm("block.disableProperty.message"),
        arguments: {
          ENABLE: {
            type: Scratch.ArgumentType.STRING,
            menu: "ENABLE",
          },
          PROPERTY: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "str",
          },
          NAME: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "setting",
          },
        },
      },
      setPanelStyle: {
        opcode: "setPanelStyle",
        blockType: Scratch.BlockType.COMMAND,
        text: this.fm("block.setPanelStyle.message"),
        arguments: {
          NAME: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "setting",
          },
          PROPERTY: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "--tp-base-background-color",
          },
          VALUE: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "hsla(0, 0%, 10%, 0.8)",
          },
        },
      },
    };

    return {
      id: NS,
      name: this.fm("name"),
      docsURI: this.fm("docsUrl"),
      // blockIconURI: icon,
      // menuIconURI: icon,
      color1: "#56b98f",
      color2: "#56b98f",
      blocks: [
        `---${this.fm("tag.props")}`,
        blocks.createGUI,
        blocks.createGUI2,
        blocks.addStringPropertyTo,
        blocks.addNumberPropertyTo,
        blocks.addNumberPropertyTo2,
        blocks.addBooleanPropertyTo,
        blocks.addOptionsPropertyTo,
        blocks.addButtonTo,
        blocks.delProperty,
        `---${this.fm("tag.value")}`,
        blocks.readValue,
        blocks.readProperty,
        blocks.listenProperty,
        blocks.whenPropertyChange,
        blocks.whenButtonClicked,
        blocks.mergeJSONToValue,
        `---${this.fm("tag.control")}`,
        blocks.showGUI,
        blocks.hideGUI,
        blocks.destroyGUI,
        blocks.hideProperty,
        blocks.disableProperty,
        `---${this.fm("tag.style")}`,
        {
          blockType: Scratch.BlockType.BUTTON,
          text: this.fm("tag.style.help"),
          onClick: () => {
            window.open("https://tweakpane.github.io/docs/theming/#builder");
          },
        },
        blocks.setPanelStyle,
      ],
      menus: {
        SHOW: {
          items: [
            { text: this.fm("menu.hide"), value: "0" },
            { text: this.fm("menu.show"), value: "1" },
          ],
        },
        ENABLE: {
          items: [
            { text: this.fm("menu.disable"), value: "0" },
            { text: this.fm("menu.enable"), value: "1" },
          ],
        },
        POSITION: {
          items: [
            { text: this.fm("menu.positionTopRight"), value: "topRight" },
            { text: this.fm("menu.positionCenter"), value: "center" },
            { text: this.fm("menu.positionTopLeft"), value: "topLeft" },
            { text: this.fm("menu.positionBottomLeft"), value: "bottomLeft" },
            { text: this.fm("menu.positionBottomRight"), value: "bottomRight" },
          ],
        },
      },
    };
  }

  _updatePosition(e: string) {
    const gui = this.gui[e] || {};
    const pane = gui.pane;
    let position = gui.position;
    let scale = gui.scale;
    if (pane) {
      if (scale === undefined) scale = 1;
      pane.element.style.position = "absolute";
      switch (position) {
        case "topLeft":
          pane.element.style.top = "10px";
          pane.element.style.bottom = "";
          pane.element.style.left = "10px";
          pane.element.style.right = "";
          pane.element.style.transform = `scale(${scale})`;
          pane.element.style.transformOrigin = "top left";
          break;
        case "bottomLeft":
          pane.element.style.top = "";
          pane.element.style.bottom = "10px";
          pane.element.style.left = "10px";
          pane.element.style.right = "";
          pane.element.style.transform = `scale(${scale})`;
          pane.element.style.transformOrigin = "bottom left";
          break;
        case "bottomRight":
          pane.element.style.top = "";
          pane.element.style.bottom = "10px";
          pane.element.style.left = "";
          pane.element.style.right = "10px";
          pane.element.style.transform = `scale(${scale})`;
          pane.element.style.transformOrigin = "bottom right";
          break;
        case "center":
          pane.element.style.top = "50%";
          pane.element.style.bottom = "";
          pane.element.style.left = "50%";
          pane.element.style.right = "";
          pane.element.style.transform = `translate(-50%, -50%) scale(${scale})`;
          pane.element.style.transformOrigin = "";
          break;
        case "topRight":
          pane.element.style.top = "10px";
          pane.element.style.bottom = "";
          pane.element.style.left = "";
          pane.element.style.right = "10px";
          pane.element.style.transform = `scale(${scale})`;
          pane.element.style.transformOrigin = "top right";
          break;
      }
      pane.element.style.zIndex = "48";
      if (this.resizeObserver === undefined) {
        this.resizeObserver = new ResizeObserver((entries) => {
          entries.forEach((entry) => {
            const width = entry.contentRect.width;
            Object.keys(this.gui).forEach((key) => {
              if (this._inputParent() !== this.gui[key].pane.containerElem_) {
                this.destroyGUI({ NAME: key });
                this.resizeObserver!.disconnect();
                this.resizeObserver = undefined;
                return;
              }
              this.gui[key].scale = width / 600;
              this._updatePosition(key);
            });
          });
        });
        const inputParent = this._inputParent();
        if (inputParent) {
          this.resizeObserver.observe(
            inputParent,
            // 与原打包代码保持一致：attributes/attributeFilter 是 MutationObserver 风格的选项，ResizeObserver 运行时忽略。
            { attributes: true, attributeFilter: ["style"] } as any
          );
        }
      }
    }
  }

  createGUI(args: any) {
    const name = args.NAME;
    this.createGUI2({ NAME: name, POSITION: "topRight" });
  }

  createGUI2(args: any) {
    const name = args.NAME;
    const position = args.POSITION;
    if (this.gui.hasOwnProperty(name)) {
      this.gui[name].position = position;
      this._updatePosition(name);
      return;
    }
    const inputParent = this._inputParent();
    if (!inputParent) return;
    const pane = new Pane({
      title: name,
      container: inputParent,
    });
    this.gui[name] = {
      pane: pane,
      obj: {},
      controllers: {},
      position: position,
      scale: inputParent.offsetWidth / 600,
    };
    this._updatePosition(name);
  }

  addStringPropertyTo(args: any) {
    const property = args.PROPERTY;
    const name = args.NAME;
    const defval = args.DEFVAL;
    const gui = this.gui[name] || {};
    const pane = gui.pane;
    const obj = gui.obj;
    const controllers = gui.controllers;
    if (pane) {
      if (obj.hasOwnProperty(property)) {
        this.delProperty({ PROPERTY: property, NAME: name });
      }
      obj[property] = Scratch.Cast.toString(defval);
      controllers[property] = pane.addBinding(obj, property);
    }
  }

  addNumberPropertyTo(args: any) {
    const property = args.PROPERTY;
    const name = args.NAME;
    const defval = args.DEFVAL;
    const gui = this.gui[name] || {};
    const pane = gui.pane;
    const obj = gui.obj;
    const controllers = gui.controllers;
    if (pane) {
      if (obj.hasOwnProperty(property)) {
        this.delProperty({ PROPERTY: property, NAME: name });
      }
      obj[property] = Scratch.Cast.toNumber(defval);
      controllers[property] = pane.addBinding(obj, property, { step: 1 });
    }
  }

  addNumberPropertyTo2(args: any) {
    const property = args.PROPERTY;
    const name = args.NAME;
    const defval = args.DEFVAL;
    const min = args.MIN;
    const max = args.MAX;
    const step = args.STEP;
    const gui = this.gui[name] || {};
    const pane = gui.pane;
    const obj = gui.obj;
    const controllers = gui.controllers;
    if (pane) {
      if (obj.hasOwnProperty(property)) {
        this.delProperty({ PROPERTY: property, NAME: name });
      }
      obj[property] = Scratch.Cast.toNumber(defval);
      controllers[property] = pane.addBinding(obj, property, {
        min: Scratch.Cast.toNumber(min),
        max: Scratch.Cast.toNumber(max),
        step: Scratch.Cast.toNumber(step),
      });
    }
  }

  addBooleanPropertyTo(args: any) {
    const property = args.PROPERTY;
    const name = args.NAME;
    const defval = args.DEFVAL;
    const gui = this.gui[name] || {};
    const pane = gui.pane;
    const obj = gui.obj;
    const controllers = gui.controllers;
    if (pane) {
      if (obj.hasOwnProperty(property)) {
        this.delProperty({ PROPERTY: property, NAME: name });
      }
      obj[property] = Scratch.Cast.toBoolean(defval);
      controllers[property] = pane.addBinding(obj, property);
    }
  }

  addOptionsPropertyTo(args: any) {
    let property = args.PROPERTY;
    const name = args.NAME;
    let options = args.OPTIONS;
    let defval = args.DEFVAL;
    const gui = this.gui[name] || {};
    const pane = gui.pane;
    const obj = gui.obj;
    const controllers = gui.controllers;
    if (pane) {
      if (obj.hasOwnProperty(property)) {
        this.delProperty({ PROPERTY: property, NAME: name });
      }
      try {
        defval = JSON.parse(defval);
      } catch (e) {
        // 忽略非法默认值
      }
      try {
        options = JSON.parse(options);
        obj[property] = defval;
        controllers[property] = pane.addBinding(obj, property, { options: options });
      } catch (e) {
        // 忽略非法的 options JSON
      }
    }
  }

  addButtonTo(args: any, util: any) {
    const title = args.TITLE;
    const name = args.NAME;
    const gui = this.gui[name] || {};
    const pane = gui.pane;
    const controllers = gui.controllers;
    if (pane) {
      if (controllers.hasOwnProperty(title)) {
        this.delProperty({ PROPERTY: title, NAME: name });
      }
      const button = pane.addButton({ title: title });
      button.on("click", () => {
        util.startHatsWithParams("Cappu.panel_whenButtonClicked", {
          parameters: {
            NAME: name,
            TITLE: title,
          },
        });
      });
      controllers[title] = button;
    }
  }

  delProperty(args: any) {
    const property = args.PROPERTY;
    const name = args.NAME;
    const gui = this.gui[name] || {};
    const pane = gui.pane;
    const obj = gui.obj;
    const controllers = gui.controllers;
    if (pane) {
      const controller = controllers[property];
      if (controller) {
        pane.remove(controller);
        delete controllers[property];
        delete obj[property];
      }
    }
  }

  readValue(args: any) {
    const name = args.NAME;
    const obj = (this.gui[name] || {}).obj;
    return obj ? JSON.stringify(obj) : "";
  }

  readProperty(args: any) {
    const property = args.PROPERTY;
    const name = args.NAME;
    const obj = (this.gui[name] || {}).obj;
    return obj && obj.hasOwnProperty(property) ? obj[property] : "";
  }

  listenProperty(args: any, util: any) {
    const property = args.PROPERTY;
    const name = args.NAME;
    const gui = this.gui[name] || {};
    const pane = gui.pane;
    const controllers = gui.controllers;
    if (pane) {
      const controller = controllers[property];
      if (controller) {
        controller.on("change", (e: any) => {
          if (e.last) {
            util.startHatsWithParams("Cappu.panel_whenPropertyChange", {
              parameters: {
                NAME: name,
                PROPERTY: property,
                VALUE: e.value,
              },
            });
          }
        });
      }
    }
  }

  whenPropertyChange() {
    return true;
  }

  whenButtonClicked() {
    return true;
  }

  mergeJSONToValue(args: any) {
    const name = args.NAME;
    let data = args.DATA;
    const gui = this.gui[name] || {};
    const pane = gui.pane;
    const obj = gui.obj;
    const controllers = gui.controllers;
    if (pane) {
      try {
        data = JSON.parse(data);
      } catch (e) {
        return;
      }
      Object.keys(data).forEach((key) => {
        if (obj.hasOwnProperty(key)) {
          obj[key] = data[key];
          const controller = controllers[key];
          if (controller) controller.refresh();
        } else {
          obj[key] = data[key];
          controllers[key] = pane.addBinding(obj, key);
        }
      });
    }
  }

  showGUI(args: any) {
    const name = args.NAME;
    const pane = (this.gui[name] || {}).pane;
    if (pane) pane.hidden = false;
  }

  hideGUI(args: any) {
    const name = args.NAME;
    const pane = (this.gui[name] || {}).pane;
    if (pane) pane.hidden = true;
  }

  destroyGUI(args: any) {
    const name = args.NAME;
    const pane = (this.gui[name] || {}).pane;
    if (pane) {
      pane.dispose();
      delete this.gui[name];
    }
  }

  hideProperty(args: any) {
    const show = args.SHOW;
    const property = args.PROPERTY;
    const name = args.NAME;
    const controllers = (this.gui[name] || {}).controllers;
    if (controllers) {
      const controller = controllers[property];
      if (controller) controller.hidden = !Scratch.Cast.toBoolean(show);
    }
  }

  disableProperty(args: any) {
    const enable = args.ENABLE;
    const property = args.PROPERTY;
    const name = args.NAME;
    const controllers = (this.gui[name] || {}).controllers;
    if (controllers) {
      const controller = controllers[property];
      if (controller) controller.disabled = !Scratch.Cast.toBoolean(enable);
    }
  }

  setPanelStyle(args: any) {
    const name = args.NAME;
    const property = args.PROPERTY;
    const value = args.VALUE;
    const pane = (this.gui[name] || {}).pane;
    if (pane && property.startsWith("--tp-")) {
      pane.element.style.setProperty(property, value);
    }
  }
}

export const __esModule = true;

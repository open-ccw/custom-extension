declare const Scratch: any;

const en = {
  divConfig: "🎛 Runtime Configuration",
  divEventConfig: "🔫 Event Configuration",
  divPlayerConfig: "🕹 Player Configuration",
  document: "📄 Document",
  documentURL: "https://getgandi.com/extensions/fermi",
  categoryName: "Fermi",
  maxCloner: "max # of cloner [MAX]",
  showHidePause: "[SHOW] pause button",
  setFramerate: "run [FRAMERATE] frames per second",
  show: "show",
  hide: "hide",
  multiThead: "hats(events) support concurrency [ENABLE]",
  showHideCursor: "[SHOW] system cursor",
  fencing: "[ENABLE] fencing",
  enable: "enable",
  disable: "disable",
  hqPen: "hi-fi render [ENABLE]",
  turboMode: "[ENABLE] turbo mode ",
  complieMode: "[ENABLE] complie mode",
  interpolation: "[ENABLE] interpolation",
};

const zh = {
  divConfig: "🎛 运行配置",
  divEventConfig: "🔫 事件配置",
  divPlayerConfig: "🕹 播放器配置",
  document: "📄 文档及使用手册",
  documentURL: "https://getgandi.com/cn/extensions/fermi",
  categoryName: "费米",
  maxCloner: "克隆体上限 [MAX]",
  showHidePause: "[SHOW] 暂停按钮",
  setFramerate: "以每秒 [FRAMERATE] 帧运行",
  show: "显示",
  hide: "隐藏",
  multiThead: "⚠️危 事件支持多线程数 [ENABLE]",
  showHideCursor: "[SHOW] 系统鼠标",
  fencing: "[ENABLE] 角色围栏",
  enable: "启用",
  disable: "禁止",
  hqPen: "[ENABLE] 高清渲染",
  turboMode: "[ENABLE] 加速模式 ",
  complieMode: "[ENABLE] 编译模式",
  interpolation: "[ENABLE] 动画插值",
};

const NS = "GandiFermi";

export default class GandiFermiExt {
  runtime: any;
  fm: (e: { id: string; default: string; description: string }) => string;

  constructor(t: any) {
    this.runtime = t;

    const formatMessage = t.getFormatMessage({
      "zh-cn": zh,
      en: en,
    });
    this.fm = (e: { id: string; default: string; description: string }) => formatMessage(e);

    const style = document.createElement("style");
    style.type = "text/css";
    const css = ".hideCursor canvas { cursor: none; }";
    if ("styleSheet" in style) {
      (style.styleSheet as any).cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    document.head.appendChild(style);
  }

  static get STATE_KEY() {
    return "Gandi.Fermi";
  }

  /**
   * 将 en/zh 字典中的 key 解析为当前语言对应的文本。
   * 兼容字符串 id 与 { key: defaultValue } 两种调用形式。
   */
  formatMessage(id: string | Record<string, string>): string {
    if (typeof id === "string") {
      return this.fm({ id, default: id, description: id });
    }
    const key = Object.keys(id)[0];
    const defaultValue = id[key];
    return this.fm({ id: key, default: defaultValue, description: defaultValue });
  }

  getInfo() {
    const fm = (key: keyof typeof en) => this.formatMessage({ [key]: en[key] });

    const documentButton = {
      blockType: Scratch.BlockType.BUTTON,
      text: fm("document"),
      onClick: () => {
        window.open(this.formatMessage({ documentURL: en.documentURL }), "_blank");
      },
    };

    const maxCloner = {
      opcode: "maxCloner",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("maxCloner"),
      arguments: {
        MAX: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: 300,
        },
      },
    };

    const setFramerate = {
      opcode: "setFramerate",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("setFramerate"),
      arguments: {
        FRAMERATE: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 30,
        },
      },
    };

    const hqPen = {
      opcode: "hqPen",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("hqPen"),
      arguments: {
        ENABLE: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "1",
          menu: "ENABLE",
        },
      },
    };

    const fencing = {
      opcode: "fencing",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("fencing"),
      arguments: {
        ENABLE: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "1",
          menu: "ENABLE",
        },
      },
    };

    const turboMode = {
      opcode: "turboMode",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("turboMode"),
      arguments: {
        ENABLE: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "1",
          menu: "ENABLE",
        },
      },
    };

    const complieMode = {
      opcode: "complieMode",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("complieMode"),
      arguments: {
        ENABLE: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "1",
          menu: "ENABLE",
        },
      },
    };

    const interpolation = {
      opcode: "interpolation",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("interpolation"),
      arguments: {
        ENABLE: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "1",
          menu: "ENABLE",
        },
      },
    };

    const showHidePause = {
      opcode: "showHidePause",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("showHidePause"),
      arguments: {
        SHOW: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "1",
          menu: "SHOW",
        },
      },
    };

    const showHideCursor = {
      opcode: "showHideCursor",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("showHideCursor"),
      arguments: {
        SHOW: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "1",
          menu: "SHOW",
        },
      },
    };

    const multiThead = {
      opcode: "multiThead",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("multiThead"),
      arguments: {
        ENABLE: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 5,
        },
      },
    };

    return {
      id: NS,
      name: fm("categoryName"),
      color1: "#CC3228",
      // menuIconURI: b,
      // blockIconURI: y,
      blocks: [
        documentButton,
        `--- ${fm("divConfig")}`,
        maxCloner,
        setFramerate,
        hqPen,
        fencing,
        turboMode,
        complieMode,
        interpolation,
        `--- ${fm("divPlayerConfig")}`,
        showHidePause,
        showHideCursor,
        `--- ${fm("divEventConfig")}`,
        multiThead,
      ],
      menus: {
        SHOW: [
          { text: fm("show"), value: "1" },
          { text: fm("hide"), value: "0" },
        ],
        ENABLE: [
          { text: fm("enable"), value: "1" },
          { text: fm("disable"), value: "0" },
        ],
      },
    };
  }

  maxCloner(args: any, util: any) {
    const value = Scratch.Cast.toNumber(args.MAX);
    this.runtime.runtimeOptions.maxClones = value;
  }

  setFramerate(args: any, util: any) {
    const value = Scratch.Cast.toNumber(args.FRAMERATE);
    this.runtime.setFramerate(value);
  }

  showHidePause(args: any, util: any) {
    const value = Scratch.Cast.toNumber(args.SHOW);
    let node = document.querySelectorAll('[class*="action-item"][class*="action-control"]')[0];
    if (node === undefined) {
      node = document.querySelectorAll('[class*="c-actionItem"][class*="c-actionControl"]')[0];
    }
    if (node === undefined) {
      node = document.querySelectorAll(
        '[class*="style_player-actions-item"][class*="style_player-actions-control"]'
      )[0];
    }
    if (node !== undefined) {
      (node as HTMLElement).style.visibility = value === 1 ? "visible" : "hidden";
    }
  }

  multiThead(args: any, util: any) {
    const value = Scratch.Cast.toNumber(args.ENABLE);
    this.runtime.runtimeOptions.hatsConcurrency = value;
  }

  showHideCursor(args: any, util: any) {
    const show = Scratch.Cast.toNumber(args.SHOW) === 1;
    const canvas = this.runtime.renderer.canvas;
    if (canvas && canvas.parentElement) {
      if (show) {
        canvas.parentElement.className = canvas.parentElement.className.replace("hideCursor", "");
      } else if (canvas.parentElement.className.indexOf("hideCursor") < 0) {
        canvas.parentElement.className += " hideCursor ";
      }
    }
  }

  fencing(args: any, util: any) {
    const value = Scratch.Cast.toNumber(args.ENABLE) === 1;
    if (this.runtime.runtimeOptions.fencing !== value) {
      this.runtime.runtimeOptions.fencing = value;
    }
  }

  hqPen(args: any, util: any) {
    const value = Scratch.Cast.toString(args.ENABLE) === "1";
    if (this.runtime.renderer.useHighQualityRender !== value) {
      this.runtime.renderer.setUseHighQualityRender(value);
    }
  }

  turboMode(args: any, util: any) {
    const value = Scratch.Cast.toNumber(args.ENABLE) === 1;
    if (this.runtime.turboMode !== value) {
      this.runtime.turboMode = value;
      this.runtime.emit(value ? "TURBO_MODE_ON" : "TURBO_MODE_OFF");
    }
  }

  complieMode(args: any, util: any) {
    if (!this.runtime.isPlayerOnly) {
      const value = Scratch.Cast.toNumber(args.ENABLE) === 1;
      if (this.runtime.compilerOptions.enabled !== value) {
        this.runtime.setCompilerOptions({
          enabled: value,
        });
      }
    }
  }

  interpolation(args: any, util: any) {
    const value = Number(args.ENABLE) === 1;
    if (this.runtime.interpolationEnabled !== value) {
      this.runtime.setInterpolation(value);
    }
  }
}

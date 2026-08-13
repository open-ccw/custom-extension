declare const Scratch: any;

const en = {
  name: "G-Kamera",
  document: "📖 Document",
  documentURL: "https://getgandi.com/extensions/kamera",
  config: "🔧 Config",
  position: "📐 Position",
  mouse: "🖱️ Mouse",
  boundaries: "🗺️ Boundaries",
  direction: "🕒 Direction",
  zoom: "🔎 Zoom",
  movement: "🎥 Movement",
  motion: "🌀 Sprite Motion",
  folderUtils: "📁 Folder Utils",
  setPenFollowing: "✏️make pen[FOLLOW]the camera",
  setCanvasFollowing: "🖼️make canvas of current sprite[MODE]",
  canvasMode0: "follow camera",
  canvasMode1: "not follow camera",
  canvasMode2: "consistent with the sprite",
  setBubbleFixMode: "set speech bubble fix mode to[MODE]",
  bubble0: "don't fix",
  bubble1: "remove fenced",
  bubble2: "🐌fenced within correct screen",
  setTouchingEdgeFixMode: 'fix edge in "touching edge" block as[MODE]',
  setOnEdgeBounceFixMode: 'fix edge in "if on edge, bounce" block as[MODE]',
  viewEdge: "edge of screen",
  mapEdge: "edge of map",
  isTouchingBounds: "[SPRITE] touching edge of [OBJECT]?",
  map: "map",
  view: "screen",
  isOutOfBounds: "[SPRITE]out of[OBJECT]?",
  isCoordOutOfBounds: "x:[X]y:[Y]out of[OBJECT]?",
  borderTooClose: "The %1 boundary you've set(%2) is too close to the %3 boundary(%4).",
  setBoundaries: "set map boundaries: top y:[T], bottom y:[B], left x:[L], right x:[R]",
  removeBoundary: "remove [TYPE] map boundary",
  setBoundary: "set [TYPE]map boundary to [COORD]",
  getBoundary: "[TYPE][OBJECT] boundary",
  all: "all",
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right",
  setLimitedByBoundary: "make [SPRITE] [TYPE] by the map boundary",
  limited: "limited",
  notLimited: "not limited",
  moveSteps: "move camera [VAL] steps",
  rotateCW: "turn camera clockwise [VAL] degrees",
  rotateCCW: "turn camera counter-clockwise [VAL] degrees",
  setBoth: "set camera to x: [X] y: [Y]",
  setDirection: "set camera direction to [VAL]",
  changeX: "change camera x by [VAL]",
  setX: "set camera x to [VAL]",
  changeY: "change camera y by [VAL]",
  setY: "set camera y to [VAL]",
  getX: "camera x",
  getY: "camera y",
  getDirection: "camera direction",
  changeZoom: "change camera zoom by [VAL]",
  setZoom: "set camera zoom to [VAL] %",
  getZoom: "camera zoom",
  setCol: "set background color to [VAL]",
  getCol: "background color",
  getMouseXInMap: "mouse x in map",
  getMouseYInMap: "mouse y in map",
  moveTo: "move camera to x: [X] y: [Y], zoom: [Z]% over [T] seconds, curve [CURVE]",
  spriteMotion: "move [SPRITE] to x: [X] y: [Y], zoom: [Z]% over [T] seconds, curve [CURVE], and wait",
  stopTween: "stop camera movement",
  linear: "Linear",
  quadraticIn: "Quadratic In",
  quadraticOut: "Quadratic Out",
  quadraticInOut: "Quadratic InOut",
  cubicIn: "Cubic In",
  cubicOut: "Cubic Out",
  cubicInOut: "Cubic InOut",
  quarticIn: "Quartic In",
  quarticOut: "Quartic Out",
  quarticInOut: "Quartic InOut",
  quinticIn: "Quintic In",
  quinticOut: "Quintic Out",
  quinticInOut: "Quintic InOut",
  sinusoidalIn: "Sinusoidal In",
  sinusoidalOut: "Sinusoidal Out",
  sinusoidalInOut: "Sinusoidal InOut",
  exponentialIn: "Exponential In",
  exponentialOut: "Exponential Out",
  exponentialInOut: "Exponential InOut",
  circularIn: "Circular In",
  circularOut: "Circular Out",
  circularInOut: "Circular InOut",
  elasticIn: "Elastic In",
  elasticOut: "Elastic Out",
  elasticInOut: "Elastic InOut",
  backIn: "Back In",
  backOut: "Back Out",
  backInOut: "Back InOut",
  bounceIn: "Bounce In",
  bounceOut: "Bounce Out",
  bounceInOut: "Bounce InOut",
  setFixedOneSprite: "make [SPRITE] [FOLLOW] the camera",
  myself: "me",
  setFixedSprite: "folder [FOLDER] [FOLLOW] the camera",
  follow: "follow",
  unfollow: "unfollow",
  changeFolderXY: "change [FOLDER] x by [X] and y by [Y]",
  show: "show",
  hide: "hide",
  setFolderVisibility: "[VISIBILITY] folder [FOLDER]",
  setFolderEffect: "set [EFFECT] effect to [VALUE] on folder [FOLDER]",
  changeFolderEffect: "change [EFFECT] effect by [VALUE] on folder [FOLDER]",
  clearFolderEffects: "clear effects on folder [FOLDER]",
  color: "color",
  fisheye: "fisheye",
  whirl: "whirl",
  pixelate: "pixelate",
  mosaic: "mosaic",
  brightness: "brightness",
  ghost: "ghost",
  cameraAutoFollow: "camera auto-follow [SPRITE], offset x:[X] and y:[Y] with algorithm [ALG]",
  hardFollow: "hard",
  nonLinear: "non linear",
  nonLinearSoft: "non linear soft",
};

const zh = {
  name: "G-相机",
  document: "📖 文档",
  documentURL: "https://dev.ccw.site/extensions/kamera",
  config: "🔧 设置",
  position: "📐 位置",
  mouse: "🖱️ 鼠标",
  boundaries: "🗺️ 边界",
  direction: "🕒 方向",
  zoom: "🔎 缩放",
  movement: "🎥 运动",
  motion: "🌀 角色运动",
  folderUtils: "📁 文件夹工具",
  setPenFollowing: "✏️让画笔[FOLLOW]摄像机",
  setCanvasFollowing: "🖼️当前角色的高级画笔[MODE]",
  canvasMode0: "跟随相机",
  canvasMode1: "不跟随相机",
  canvasMode2: "和角色保持一致",
  setBubbleFixMode: "设置对话气泡修正方式为[MODE]",
  bubble0: "不修正",
  bubble1: "移除限制",
  bubble2: "🐌限制在正确屏幕内",
  setTouchingEdgeFixMode: "将\"碰到舞台边缘\"中的\"边缘\"设为[MODE]",
  setOnEdgeBounceFixMode: "将\"碰到边缘就反弹\"中的\"边缘\"设为[MODE]",
  viewEdge: "屏幕边缘",
  mapEdge: "地图边缘",
  isTouchingBounds: "[SPRITE]碰到[OBJECT]的边缘?",
  map: "地图",
  view: "屏幕",
  isOutOfBounds: "[SPRITE]在[OBJECT]外?",
  isCoordOutOfBounds: "x:[X]y:[Y]在[OBJECT]外?",
  borderTooClose: "设置的地图%1边界（%2）离%3边界（%4）太近！",
  setBoundaries: "设置地图边界为: 上y[T], 下y[B], 左x[L], 右x[R]",
  setBoundary: "设置地图[TYPE]边界为[COORD]",
  getBoundary: "[OBJECT][TYPE]边界",
  removeBoundary: "移除地图[TYPE]边界",
  all: "所有",
  top: "上",
  bottom: "下",
  left: "左",
  right: "右",
  setLimitedByBoundary: "使 [SPRITE] [TYPE] 地图边界限制",
  limited: "受",
  notLimited: "不受",
  moveSteps: "向前移动摄像机 [VAL] 步",
  rotateCW: "将摄像机顺时针旋转 [VAL] 度",
  rotateCCW: "将摄像机逆时针旋转 [VAL] 度",
  setBoth: "将摄像机位置设置为 x：[X] y：[Y]",
  setDirection: "将摄像机方向设置为 [VAL]",
  changeX: "将摄像机 x 坐标增加 [VAL]",
  setX: "将摄像机 x 坐标设置为 [VAL]",
  changeY: "将摄像机 y 坐标增加 [VAL]",
  setY: "将摄像机 y 坐标设置为 [VAL]",
  getX: "摄像机 x 坐标",
  getY: "摄像机 y 坐标",
  getDirection: "摄像机方向",
  changeZoom: "将摄像机缩放增加 [VAL]",
  setZoom: "将摄像机缩放设置为 [VAL]％",
  getZoom: "摄像机缩放",
  setCol: "将背景颜色设置为 [VAL]",
  getCol: "背景颜色",
  getMouseXInMap: "鼠标在地图的 x 坐标",
  getMouseYInMap: "鼠标在地图的 y 坐标",
  moveTo: "[T] 秒内，将摄像机移动到 x：[X] y：[Y]，缩放：[Z]％，曲线 [CURVE]",
  spriteMotion: "[T] 秒内，将 [SPRITE] 移动到 x：[X] y：[Y]，缩放：[Z]％，曲线 [CURVE]，并等待",
  stopTween: "停止摄像机运动",
  linear: "线性",
  quadraticIn: "二次进",
  quadraticOut: "二次出",
  quadraticInOut: "二次进出",
  cubicIn: "三次进",
  cubicOut: "三次出",
  cubicInOut: "三次进出",
  quarticIn: "四次进",
  quarticOut: "四次出",
  quarticInOut: "四次进出",
  quinticIn: "五次进",
  quinticOut: "五次出",
  quinticInOut: "五次进出",
  sinusoidalIn: "正弦进",
  sinusoidalOut: "正弦出",
  sinusoidalInOut: "正弦进出",
  exponentialIn: "指数进",
  exponentialOut: "指数出",
  exponentialInOut: "指数进出",
  circularIn: "圆形进",
  circularOut: "圆形出",
  circularInOut: "圆形进出",
  elasticIn: "弹性进",
  elasticOut: "弹性出",
  elasticInOut: "弹性进出",
  backIn: "回弹进",
  backOut: "回弹出",
  backInOut: "回弹进出",
  bounceIn: "弹跳进",
  bounceOut: "弹跳出",
  bounceInOut: "弹跳进出",
  setFixedOneSprite: "让 [SPRITE] [FOLLOW]摄像机",
  myself: "我",
  setFixedSprite: "文件夹[FOLDER][FOLLOW]摄像机",
  follow: "跟随",
  unfollow: "不跟随",
  changeFolderXY: "将文件夹 [FOLDER] 的 x 增加 [X], y 增加 [Y]",
  show: "显示",
  hide: "隐藏",
  setFolderVisibility: "[VISIBILITY] 文件夹 [FOLDER]",
  setFolderEffect: "将文件夹 [FOLDER] 的 [EFFECT] 特效设定为 [VALUE]",
  changeFolderEffect: "将文件夹 [FOLDER] 的 [EFFECT] 特效增加 [VALUE]",
  clearFolderEffects: "将文件夹 [FOLDER] 的图形特效清除",
  color: "颜色",
  fisheye: "鱼眼",
  whirl: "漩涡",
  pixelate: "像素化",
  mosaic: "马赛克",
  brightness: "亮度",
  ghost: "虚像",
  cameraAutoFollow: "摄像机自动跟踪 [SPRITE], 位置偏移 x:[X] y:[Y] 并且使用 [ALG] 算法",
  hardFollow: "硬跟踪",
  nonLinear: "非线性跟踪",
  nonLinearSoft: "非线性跟踪（柔和）",
};

const NS = "GandiKamera";

// menuIconURI and blockIconURI are missing from the original packed code
// TODO: Add actual icon URIs when available

export default class GandiKameraExt {
  runtime: any;
  renderer: any;
  cameraX!: number;
  cameraY!: number;
  cameraZoom!: number;
  cameraDirection!: number;
  cameraBG!: string;
  mapBoundaries!: any;
  cameraBoundaries!: any;
  config!: any;
  AFC!: any;
  tween: any;
  lastData: any;
  _kv: (e: { id: string; default: string; description: string }) => string;

  constructor(runtime: any) {
    this.runtime = runtime;
    this.renderer = runtime.renderer;

    const KV = runtime.getFormatMessage({
      "zh-cn": zh,
      en: en,
    });
    this._kv = (e: { id: string; default: string; description: string }) => KV(e);

    this.cameraX = 0;
    this.cameraY = 0;
    this.cameraZoom = 100;
    this.cameraDirection = 90;
    this.cameraBG = "#ffffff";
    this.mapBoundaries = {
      top: Infinity,
      bottom: -Infinity,
      left: -Infinity,
      right: Infinity,
    };
    this.cameraBoundaries = {
      top: Infinity,
      bottom: -Infinity,
      left: -Infinity,
      right: Infinity,
      minZoom: 0.1,
    };
    this.config = {
      bubbleFixMode: 0,
      touchingEdgeFixMode: "view",
      onEdgeBounceFixMode: "view",
    };
    runtime.runtimeOptions.fencing = false;
    runtime.renderer.offscreenTouching = true;

    runtime.on("STAGE_SIZE_CHANGED", () => {
      this.updateFixedProjection();
      this.updateCamera();
    });

    runtime.on("PROJECT_STOP_ALL", () => {
      this.cameraX = 0;
      this.cameraY = 0;
      this.cameraZoom = 100;
      this.cameraDirection = 90;
      this.cameraBG = "#ffffff";
      this.__updateCameraBoundariesAndCamera();
      this.AFC.enabled = false;
    });

    this.AFC = {
      enabled: false,
      target: undefined,
      safeArea: { w: 0, h: 0 },
      offset: { x: 0, y: 0 },
      tween: undefined,
      algorithm: "linear",
    };

    const interval = setInterval(() => {
      if (runtime.targets.length > 0) {
        clearInterval(interval);
        this.hackSomeScratchFunctions();
      }
    }, 1000);
  }

  static get STATE_KEY() {
    return NS;
  }

  /**
   * 将 en/zh 字典中的 key 解析为当前语言对应的文本。
   * 兼容字符串 id 与 { key: defaultValue } 两种调用形式。
   */
  formatMessage(id: string | Record<string, string>): string {
    if (typeof id === "string") {
      return this._kv({ id, default: id, description: id });
    }
    const key = Object.keys(id)[0];
    const defaultValue = (id as any)[key];
    return this._kv({ id: key, default: defaultValue, description: defaultValue });
  }

  getHats() {
    return {};
  }

  getInfo() {
    const fm = (key: keyof typeof en) => this.formatMessage({ [key]: (en as any)[key] });

    const setCanvasFollowingBlock = {
      opcode: "setCanvasFollowing",
      blockType: Scratch.BlockType.COMMAND,
      hideFromPalette: !this.runtime.ext_CCWCanvasV2,
      text: fm("setCanvasFollowing"),
      arguments: {
        MODE: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "follow",
          menu: "CANVAS_MODE",
        },
      },
    };

    const setPenFollowingBlock = {
      opcode: "setPenFollowing",
      blockType: Scratch.BlockType.COMMAND,
      hideFromPalette: !this.runtime.ext_pen,
      text: fm("setPenFollowing"),
      arguments: {
        FOLLOW: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "unfollow",
          menu: "FOLLOW",
        },
      },
    };

    const setFixedOneSpriteBlock = {
      opcode: "setFixedOneSprite",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("setFixedOneSprite"),
      arguments: {
        SPRITE: {
          type: Scratch.ArgumentType.STRING,
          menu: "MENU_SPRITE",
        },
        FOLLOW: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "unfollow",
          menu: "FOLLOW",
        },
      },
    };

    const setFixedSpriteBlock = {
      opcode: "setFixedSprite",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("setFixedSprite"),
      arguments: {
        FOLDER: {
          type: Scratch.ArgumentType.STRING,
          menu: "FOLDERS",
        },
        FOLLOW: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "unfollow",
          menu: "FOLLOW",
        },
      },
    };

    const setBubbleFixModeBlock = {
      opcode: "setBubbleFixMode",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("setBubbleFixMode"),
      arguments: {
        MODE: {
          type: Scratch.ArgumentType.STRING,
          menu: "BUBBLE_FIX_MODE",
          defaultValue: "0",
        },
      },
    };

    const setTouchingEdgeFixModeBlock = {
      opcode: "setTouchingEdgeFixMode",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("setTouchingEdgeFixMode"),
      arguments: {
        MODE: {
          type: Scratch.ArgumentType.STRING,
          menu: "EDGE_FIX_MODE",
          defaultValue: "view",
        },
      },
    };

    const setOnEdgeBounceFixModeBlock = {
      opcode: "setOnEdgeBounceFixMode",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("setOnEdgeBounceFixMode"),
      arguments: {
        MODE: {
          type: Scratch.ArgumentType.STRING,
          menu: "EDGE_FIX_MODE",
          defaultValue: "view",
        },
      },
    };

    const moveStepsBlock = {
      opcode: "moveSteps",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("moveSteps"),
      arguments: {
        VAL: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 10,
        },
      },
    };

    const rotateCWBlock = {
      opcode: "rotateCW",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("rotateCW"),
      arguments: {
        VAL: {
          type: Scratch.ArgumentType.ANGLE,
          defaultValue: 15,
        },
      },
    };

    const rotateCCWBlock = {
      opcode: "rotateCCW",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("rotateCCW"),
      arguments: {
        VAL: {
          type: Scratch.ArgumentType.ANGLE,
          defaultValue: 15,
        },
      },
    };

    const setBothBlock = {
      opcode: "setBoth",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("setBoth"),
      arguments: {
        X: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 0,
        },
        Y: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 0,
        },
      },
    };

    const setDirectionBlock = {
      opcode: "setDirection",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("setDirection"),
      arguments: {
        VAL: {
          type: Scratch.ArgumentType.ANGLE,
          defaultValue: 90,
        },
      },
    };

    const changeXBlock = {
      opcode: "changeX",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("changeX"),
      arguments: {
        VAL: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 10,
        },
      },
    };

    const setXBlock = {
      opcode: "setX",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("setX"),
      arguments: {
        VAL: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 0,
        },
      },
    };

    const changeYBlock = {
      opcode: "changeY",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("changeY"),
      arguments: {
        VAL: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 10,
        },
      },
    };

    const setYBlock = {
      opcode: "setY",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("setY"),
      arguments: {
        VAL: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 0,
        },
      },
    };

    const getXBlock = {
      opcode: "getX",
      blockType: Scratch.BlockType.REPORTER,
      text: fm("getX"),
    };

    const getYBlock = {
      opcode: "getY",
      blockType: Scratch.BlockType.REPORTER,
      text: fm("getY"),
    };

    const getMouseXInMapBlock = {
      opcode: "getMouseXInMap",
      blockType: Scratch.BlockType.REPORTER,
      text: fm("getMouseXInMap"),
    };

    const getMouseYInMapBlock = {
      opcode: "getMouseYInMap",
      blockType: Scratch.BlockType.REPORTER,
      text: fm("getMouseYInMap"),
    };

    const setBoundariesBlock = {
      opcode: "setBoundaries",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("setBoundaries"),
      arguments: {
        T: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 1000,
        },
        B: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: -1000,
        },
        L: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: -1000,
        },
        R: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 1000,
        },
      },
    };

    const setBoundaryBlock = {
      opcode: "setBoundary",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("setBoundary"),
      arguments: {
        TYPE: {
          type: Scratch.ArgumentType.STRING,
          menu: "BORDER_TYPE",
        },
        COORD: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 1000,
        },
      },
    };

    const removeBoundaryBlock = {
      opcode: "removeBoundary",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("removeBoundary"),
      arguments: {
        TYPE: {
          type: Scratch.ArgumentType.STRING,
          menu: "BORDER_TYPE_WITH_ALL",
        },
      },
    };

    const getBoundaryBlock = {
      opcode: "getBoundary",
      blockType: Scratch.BlockType.REPORTER,
      text: fm("getBoundary"),
      arguments: {
        OBJECT: {
          type: Scratch.ArgumentType.STRING,
          menu: "MAP_OR_VIEW",
        },
        TYPE: {
          type: Scratch.ArgumentType.STRING,
          menu: "BORDER_TYPE",
        },
      },
    };

    const setLimitedByBoundaryBlock = {
      opcode: "setLimitedByBoundary",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("setLimitedByBoundary"),
      arguments: {
        SPRITE: {
          type: Scratch.ArgumentType.STRING,
          menu: "MENU_SPRITE",
        },
        TYPE: {
          type: Scratch.ArgumentType.STRING,
          menu: "LIMITED_OR_NOT",
        },
      },
    };

    const isTouchingBoundsBlock = {
      opcode: "isTouchingBounds",
      blockType: Scratch.BlockType.BOOLEAN,
      text: fm("isTouchingBounds"),
      arguments: {
        SPRITE: {
          type: Scratch.ArgumentType.STRING,
          menu: "MENU_SPRITE",
        },
        OBJECT: {
          type: Scratch.ArgumentType.STRING,
          menu: "MAP_OR_VIEW",
        },
      },
    };

    const isOutOfBoundsBlock = {
      opcode: "isOutOfBounds",
      blockType: Scratch.BlockType.BOOLEAN,
      text: fm("isOutOfBounds"),
      arguments: {
        SPRITE: {
          type: Scratch.ArgumentType.STRING,
          menu: "MENU_SPRITE",
        },
        OBJECT: {
          type: Scratch.ArgumentType.STRING,
          menu: "MAP_OR_VIEW",
        },
      },
    };

    const isCoordOutOfBoundsBlock = {
      opcode: "isCoordOutOfBounds",
      blockType: Scratch.BlockType.BOOLEAN,
      text: fm("isCoordOutOfBounds"),
      arguments: {
        X: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 0,
        },
        Y: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 0,
        },
        OBJECT: {
          type: Scratch.ArgumentType.STRING,
          menu: "MAP_OR_VIEW",
        },
      },
    };

    const getDirectionBlock = {
      opcode: "getDirection",
      blockType: Scratch.BlockType.REPORTER,
      text: fm("getDirection"),
    };

    const changeZoomBlock = {
      opcode: "changeZoom",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("changeZoom"),
      arguments: {
        VAL: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 10,
        },
      },
    };

    const setZoomBlock = {
      opcode: "setZoom",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("setZoom"),
      arguments: {
        VAL: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 100,
        },
      },
    };

    const getZoomBlock = {
      opcode: "getZoom",
      blockType: Scratch.BlockType.REPORTER,
      text: fm("getZoom"),
    };

    const setColBlock = {
      opcode: "setCol",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("setCol"),
      arguments: {
        VAL: {
          type: Scratch.ArgumentType.COLOR,
          defaultValue: "#ffffff",
        },
      },
    };

    const getColBlock = {
      opcode: "getCol",
      blockType: Scratch.BlockType.REPORTER,
      text: fm("getCol"),
    };

    const moveToBlock = {
      opcode: "moveTo",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("moveTo"),
      arguments: {
        X: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 10,
        },
        Y: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 10,
        },
        Z: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 100,
        },
        T: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 1,
        },
        CURVE: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "Quintic.InOut",
          menu: "EASING",
        },
      },
    };

    const cameraAutoFollowBlock = {
      opcode: "cameraAutoFollow",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("cameraAutoFollow"),
      arguments: {
        SPRITE: {
          type: Scratch.ArgumentType.STRING,
          menu: "MENU_SPRITE",
        },
        W: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 100,
        },
        C: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 90,
        },
        H: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 50,
        },
        X: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 0,
        },
        Y: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 0,
        },
        ALG: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "nonLinearSoft",
          menu: "FOLLOW_ALG",
        },
      },
    };

    const stopTweenBlock = {
      opcode: "stopTween",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("stopTween"),
    };

    const spriteMotionBlock = {
      opcode: "spriteMotion",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("spriteMotion"),
      arguments: {
        SPRITE: {
          type: Scratch.ArgumentType.STRING,
          menu: "MENU_SPRITE",
        },
        X: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 10,
        },
        Y: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 10,
        },
        Z: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 100,
        },
        T: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 1,
        },
        CURVE: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "Elastic.Out",
          menu: "EASING",
        },
      },
    };

    const changeFolderXYBlock = {
      opcode: "changeFolderXY",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("changeFolderXY"),
      arguments: {
        X: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 0,
        },
        Y: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 0,
        },
        FOLDER: {
          type: Scratch.ArgumentType.STRING,
          menu: "FOLDERS",
        },
      },
    };

    const setFolderVisibilityBlock = {
      opcode: "setFolderVisibility",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("setFolderVisibility"),
      arguments: {
        VISIBILITY: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "show",
          menu: "VISIBILITY",
        },
        FOLDER: {
          type: Scratch.ArgumentType.STRING,
          menu: "FOLDERS",
        },
      },
    };

    const setFolderEffectBlock = {
      opcode: "setFolderEffect",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("setFolderEffect"),
      arguments: {
        EFFECT: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "color",
          menu: "EFFECTS",
        },
        VALUE: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 0,
        },
        FOLDER: {
          type: Scratch.ArgumentType.STRING,
          menu: "FOLDERS",
        },
      },
    };

    const changeFolderEffectBlock = {
      opcode: "changeFolderEffect",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("changeFolderEffect"),
      arguments: {
        EFFECT: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "color",
          menu: "EFFECTS",
        },
        VALUE: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: 0,
        },
        FOLDER: {
          type: Scratch.ArgumentType.STRING,
          menu: "FOLDERS",
        },
      },
    };

    const clearFolderEffectsBlock = {
      opcode: "clearFolderEffects",
      blockType: Scratch.BlockType.COMMAND,
      text: fm("clearFolderEffects"),
      arguments: {
        FOLDER: {
          type: Scratch.ArgumentType.STRING,
          menu: "FOLDERS",
        },
      },
    };

    const borderTypeItems = [
      { text: fm("top"), value: "top" },
      { text: fm("bottom"), value: "bottom" },
      { text: fm("left"), value: "left" },
      { text: fm("right"), value: "right" },
    ];

    return {
      id: NS,
      name: fm("name"),
      copyright:
        " this extension is inspired by DTCameraControls https://extensions.turbowarp.org/DT/cameracontrols.js ",
      color1: "#0CC6D1",
      // menuIconURI: undefined, // TODO: Add menu icon
      // blockIconURI: undefined, // TODO: Add block icon
      blocks: [
        this.documentBlock,
        "---" + fm("config"),
        setBubbleFixModeBlock,
        setTouchingEdgeFixModeBlock,
        setOnEdgeBounceFixModeBlock,
        setFixedOneSpriteBlock,
        setPenFollowingBlock,
        setCanvasFollowingBlock,
        "---" + fm("position"),
        moveStepsBlock,
        setXBlock,
        setYBlock,
        changeXBlock,
        changeYBlock,
        setBothBlock,
        getXBlock,
        getYBlock,
        getMouseXInMapBlock,
        getMouseYInMapBlock,
        "---" + fm("boundaries"),
        setBoundariesBlock,
        setBoundaryBlock,
        getBoundaryBlock,
        removeBoundaryBlock,
        setLimitedByBoundaryBlock,
        "---",
        isTouchingBoundsBlock,
        isOutOfBoundsBlock,
        isCoordOutOfBoundsBlock,
        "---" + fm("direction"),
        rotateCWBlock,
        rotateCCWBlock,
        setDirectionBlock,
        getDirectionBlock,
        "---" + fm("zoom"),
        setZoomBlock,
        changeZoomBlock,
        getZoomBlock,
        "---" + fm("movement"),
        moveToBlock,
        cameraAutoFollowBlock,
        stopTweenBlock,
        "---" + fm("motion"),
        spriteMotionBlock,
        "---" + fm("folderUtils"),
        setFixedOneSpriteBlock,
        setFixedSpriteBlock,
        changeFolderXYBlock,
        setFolderVisibilityBlock,
        setFolderEffectBlock,
        changeFolderEffectBlock,
        clearFolderEffectsBlock,
        "---",
        setColBlock,
        getColBlock,
      ],
      menus: {
        CANVAS_MODE: [
          { text: fm("canvasMode0"), value: "follow" },
          { text: fm("canvasMode1"), value: "unfollow" },
          { text: fm("canvasMode2"), value: "withSprite" },
        ],
        BUBBLE_FIX_MODE: [
          { text: fm("bubble0"), value: "0" },
          { text: fm("bubble1"), value: "1" },
          { text: fm("bubble2"), value: "2" },
        ],
        EDGE_FIX_MODE: [
          { text: fm("bubble0"), value: "no" },
          { text: fm("viewEdge"), value: "view" },
          { text: fm("mapEdge"), value: "map" },
        ],
        BORDER_TYPE_WITH_ALL: {
          acceptReporters: true,
          items: [{ text: fm("all"), value: "all" }].concat(borderTypeItems),
        },
        MAP_OR_VIEW: [
          { text: fm("map"), value: "map" },
          { text: fm("view"), value: "view" },
        ],
        BORDER_TYPE: {
          acceptReporters: true,
          items: borderTypeItems,
        },
        LIMITED_OR_NOT: [
          { text: fm("limited"), value: "yes" },
          { text: fm("notLimited"), value: "no" },
        ],
        VISIBILITY: [
          { text: fm("show"), value: "show" },
          { text: fm("hide"), value: "hide" },
        ],
        FOLDERS: {
          acceptReporters: false,
          items: "__getSpriteFolders",
        },
        FOLLOW: [
          { text: fm("follow"), value: "follow" },
          { text: fm("unfollow"), value: "unfollow" },
        ],
        MENU_SPRITE: {
          acceptReporters: true,
          items: "__spriteListWithMe",
        },
        EASING: [
          { text: fm("linear"), value: "Linear.None" },
          { text: fm("cubicInOut"), value: "Cubic.InOut" },
          { text: fm("elasticOut"), value: "Elastic.Out" },
          { text: fm("exponentialOut"), value: "Exponential.Out" },
          { text: fm("bounceOut"), value: "Bounce.Out" },
          { text: fm("quadraticIn"), value: "Quadratic.In" },
          { text: fm("quadraticOut"), value: "Quadratic.Out" },
          { text: fm("quadraticInOut"), value: "Quadratic.InOut" },
          { text: fm("cubicIn"), value: "Cubic.In" },
          { text: fm("cubicOut"), value: "Cubic.Out" },
          { text: fm("quarticIn"), value: "Quartic.In" },
          { text: fm("quarticOut"), value: "Quartic.Out" },
          { text: fm("quarticInOut"), value: "Quartic.InOut" },
          { text: fm("quinticIn"), value: "Quintic.In" },
          { text: fm("quinticOut"), value: "Quintic.Out" },
          { text: fm("quinticInOut"), value: "Quintic.InOut" },
          { text: fm("sinusoidalIn"), value: "Sinusoidal.In" },
          { text: fm("sinusoidalOut"), value: "Sinusoidal.Out" },
          { text: fm("sinusoidalInOut"), value: "Sinusoidal.InOut" },
          { text: fm("exponentialIn"), value: "Exponential.In" },
          { text: fm("exponentialInOut"), value: "Exponential.InOut" },
          { text: fm("circularIn"), value: "Circular.In" },
          { text: fm("circularOut"), value: "Circular.Out" },
          { text: fm("circularInOut"), value: "Circular.InOut" },
          { text: fm("elasticIn"), value: "Elastic.In" },
          { text: fm("elasticInOut"), value: "Elastic.InOut" },
          { text: fm("backIn"), value: "Back.In" },
          { text: fm("backOut"), value: "Back.Out" },
          { text: fm("backInOut"), value: "Back.InOut" },
          { text: fm("bounceIn"), value: "Bounce.In" },
          { text: fm("bounceOut"), value: "Bounce.Out" },
          { text: fm("bounceInOut"), value: "Bounce.InOut" },
        ],
        EFFECTS: [
          { text: fm("color"), value: "color" },
          { text: fm("fisheye"), value: "fisheye" },
          { text: fm("whirl"), value: "whirl" },
          { text: fm("pixelate"), value: "pixelate" },
          { text: fm("mosaic"), value: "mosaic" },
          { text: fm("brightness"), value: "brightness" },
          { text: fm("ghost"), value: "ghost" },
        ],
        FOLLOW_ALG: [
          { text: fm("hardFollow"), value: "hardFollow" },
          { text: fm("nonLinear"), value: "nonLinear" },
          { text: fm("nonLinearSoft"), value: "nonLinearSoft" },
        ],
      },
    };
  }

  get documentBlock() {
    return {
      blockType: Scratch.BlockType.BUTTON,
      text: this.formatMessage({ document: en.document }),
      onClick: () => {
        window.open(this.formatMessage({ documentURL: en.documentURL }), "_blank");
      },
    };
  }

  __spriteListWithMe() {
    const list: any[] = [];
    list.push({
      text: this.formatMessage({ myself: en.myself }),
      value: "__myself__",
    });
    this.runtime.targets.forEach((target: any) => {
      if (target.isOriginal && !target.isStage && target !== this.runtime._editingTarget) {
        list.push({
          text: target.sprite.name,
          value: target.sprite.name,
        });
      }
    });
    if (list.length === 0) {
      list.push({
        text: "-",
        value: "",
      });
    }
    return list;
  }

  getFixedProjection(x = 0, y = 0) {
    const a = x;
    const o = y;
    const r = this.runtime.stageWidth / 2;
    const i = this.runtime.stageHeight / 2;
    return [1 / r, 0, 0, 0, 0, 1 / i, 0, 0, 0, 0, -1, 0, -a / r, -o / i, 0, 1];
  }

  updateFixedProjection() {
    const t = this.getFixedProjection();
    this.renderer._allDrawables.forEach((e: any) => {
      if (e.customizedProjection) {
        e.customizedProjection = t;
      }
    });
  }

  getSpritesByFolder(folder: string) {
    const list: any[] = [];
    this.runtime.targets.forEach((target: any) => {
      if (target.getName().startsWith(`${folder}//`)) {
        list.push(target);
      }
    });
    return list;
  }

  clampEffect(effect: string, value: number) {
    let result = value;
    if (effect === "ghost") {
      result = Math.max(0, Math.min(100, value));
    } else if (effect === "brightness") {
      result = Math.max(-100, Math.min(100, value));
    }
    return result;
  }

  updateCamera(camData: any = this) {
    this.__constrainCameraWithinMap(camData);
    const x = camData.cameraX;
    const y = camData.cameraY;
    const zoom = camData.cameraZoom / 100;
    const direction = 90 - camData.cameraDirection;
    let angle = direction;
    angle = (angle / 180) * Math.PI;
    const sin = Math.sin(angle) * zoom;
    const cos = Math.cos(angle) * zoom;
    const halfWidth = this.runtime.stageWidth / 2;
    const halfHeight = this.runtime.stageHeight / 2;

    this.renderer._projection = [
      cos / halfWidth,
      -sin / halfHeight,
      0,
      0,
      sin / halfWidth,
      cos / halfHeight,
      0,
      0,
      0,
      0,
      -1,
      0,
      (cos * -x + sin * -y) / halfWidth,
      (cos * -y - sin * -x) / halfHeight,
      0,
      1,
    ];
    this.renderer.dirty = true;
    this.__updateMousePosInMap(camData);
  }

  __updateMousePosInMap(camData: any = this) {
    const mouse = this.runtime.ioDevices.mouse;
    mouse._coordsWithCam = this.calcMouseDataWithCam(
      mouse._scratchX,
      mouse._scratchY,
      this.renderer.canvas.clientWidth,
      this.renderer.canvas.clientHeight,
      camData
    );
  }

  __constrainCameraWithinMap(camData: any = this, boundaries: any = this.cameraBoundaries) {
    camData.cameraZoom = Math.max(boundaries.minZoom, camData.cameraZoom);
    camData.cameraX = Math.min(boundaries.right, Math.max(boundaries.left, camData.cameraX));
    camData.cameraY = Math.min(boundaries.top, Math.max(boundaries.bottom, camData.cameraY));
  }

  __updateCameraBoundariesAndCamera() {
    const boundaries = this.cameraBoundaries;
    const minZoom =
      100 *
      Math.max(
        this.runtime.stageWidth / (this.mapBoundaries.right - this.mapBoundaries.left),
        this.runtime.stageHeight / (this.mapBoundaries.top - this.mapBoundaries.bottom)
      );
    const zoom = Number.isNaN(minZoom) || minZoom < 0.1 ? 0.1 : minZoom;
    boundaries.minZoom = zoom;
    this.cameraZoom = Math.max(zoom, this.cameraZoom);

    const factor = 50 / this.cameraZoom;
    const offsetX = this.runtime.stageWidth * factor;
    const offsetY = this.runtime.stageHeight * factor;

    boundaries.left = this.mapBoundaries.left + offsetX;
    boundaries.right = this.mapBoundaries.right - offsetX;
    boundaries.bottom = this.mapBoundaries.bottom + offsetY;
    boundaries.top = this.mapBoundaries.top - offsetY;
    this.updateCamera();
  }

  calculateAFC() {
    if (this.AFC && this.AFC.target && this.AFC.enabled !== false) {
      const target = this.AFC.target;
      if (target.__deleted) {
        this.AFC.target = undefined;
      } else {
        const targetX = target.x - this.AFC.offset.x;
        const targetY = target.y - this.AFC.offset.y;

        if (this.AFC.algorithm === "hardFollow") {
          this.cameraX = targetX;
          this.cameraY = targetY;
          this.updateCamera();
          this.runtime.requestRedraw();
          return;
        }

        let speed = 1;
        this.AFC.circleRadius = 0;
        this.AFC.circleRadius =
          (0.38 / (this.cameraZoom / 100)) * Math.min(this.runtime.stageWidth, this.runtime.stageHeight);

        if (this.AFC.algorithm === "nonLinear") {
          speed = 0.5;
        } else if (this.AFC.algorithm === "nonLinearSoft") {
          speed = 0.3;
        }

        const easingFn = (t: number) => Math.sqrt(1 - Math.pow(t - 1, 2)); // Circular.Out approximation
        const dx = targetX - this.cameraX;
        const dy = targetY - this.cameraY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        let angle = Math.atan2(dy, dx);
        if (Number.isNaN(angle)) angle = 0;

        if (distance < 0.1) {
          this.AFC.currentStep = 0;
          this.AFC.lastSpeed = 0;
          this.cameraX = targetX;
          this.cameraY = targetY;
          return;
        }

        const targetChanged = this.AFC.lastTargetXY.x !== targetX || this.AFC.lastTargetXY.y !== targetY;
        this.AFC.lastTargetXY.x = targetX;
        this.AFC.lastTargetXY.y = targetY;

        let progress = this.AFC.currentStep + this.AFC.step;
        if (targetChanged) progress = this.AFC.step;
        progress = Math.max(0, Math.min(1, progress));
        this.AFC.currentStep = progress;

        const moveDistance = easingFn(progress) * speed * distance;
        const moveX = moveDistance * Math.cos(angle);
        const moveY = moveDistance * Math.sin(angle);

        this.cameraX += moveX;
        this.cameraY += moveY;

        const newDx = targetX - this.cameraX;
        const newDy = targetY - this.cameraY;
        const newDistance = Math.sqrt(newDx * newDx + newDy * newDy);

        if (newDistance > this.AFC.circleRadius) {
          const correction = 1 * (newDistance - this.AFC.circleRadius);
          const correctionX = correction * Math.cos(angle);
          const correctionY = correction * Math.sin(angle);
          this.cameraX += correctionX;
          this.cameraY += correctionY;
          this.AFC.currentStep = this.AFC.step;
          this.AFC.lastSpeed = correction;
        }

        this.updateCamera();
        this.runtime.requestRedraw();
      }
    }
  }

  tryHackedFunction(obj: any, methodName: string, wrapper: any) {
    const key = `${NS}_origFun`;
    if (!obj[key]) obj[key] = {};
    const origFuns = obj[key];
    if (!origFuns[methodName]) {
      origFuns[methodName] = true;
      const origFn = obj[methodName];
      obj[methodName] = function (this: any, ...args: any[]) {
        return wrapper.call(this, origFn, ...args);
      };
    }
  }

  getMouseCoords(withCamera = false) {
    const mouse = this.runtime.ioDevices.mouse;
    if (withCamera && mouse._coordsWithCam) {
      return mouse._coordsWithCam;
    }
    return [mouse._clientX, mouse._clientY, mouse._scratchX, mouse._scratchY];
  }

  isTargetFollowingCam(target: any) {
    const drawable = this.renderer._allDrawables[target.drawableID];
    return !(drawable && drawable.customizedProjection);
  }

  getMouseCoordsForTarget(target: any) {
    return this.getMouseCoords(this.isTargetFollowingCam(target));
  }

  distanceToMouse(target: any) {
    const coords = this.getMouseCoordsForTarget(target);
    const dx = target.x - coords[2];
    const dy = target.y - coords[3];
    return Math.sqrt(dx * dx + dy * dy);
  }

  _rotate(cx: number, cy: number, x: number, y: number, angle: number) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [cos * (x - cx) - sin * (y - cy) + cx, cos * (y - cy) + sin * (x - cx) + cy];
  }

  scratchScreenToMap(screenX: number, screenY: number, camData: any) {
    const angle = ((90 - camData.cameraDirection) / 180) * Math.PI;
    const rotated = this._rotate(0, 0, screenX, screenY, angle);
    const zoom = camData.cameraZoom / 100;
    return [camData.cameraX + rotated[0] / zoom, camData.cameraY + rotated[1] / zoom];
  }

  calcMouseDataWithCam(clientX: number, clientY: number, canvasWidth: number, canvasHeight: number, camData: any = this) {
    let x = clientX;
    let y = clientY;
    if (camData) {
      const mapCoords = this.scratchScreenToMap(clientX, clientY, camData);
      x = mapCoords[0];
      y = mapCoords[1];
    }
    const pixelX = (x / this.runtime.stageWidth + 0.5) * canvasWidth;
    const pixelY = (0.5 - y / this.runtime.stageHeight) * canvasHeight;
    return [pixelX, pixelY, x, y];
  }

  fixAllBubblePosition() {
    const looksExt = this.runtime.ext_scratch3_looks;
    if (looksExt) {
      this.runtime.targets.forEach((target: any) => {
        looksExt._onTargetChanged(target);
      });
    }
  }

  interpolateCamera(progress: number) {
    let updated = false;
    const lastData = this.lastData ?? this;
    const currentData = this;

    if (lastData && currentData) {
      const interpolated = { ...currentData };

      const dx = currentData.cameraX - lastData.cameraX;
      const dy = currentData.cameraY - lastData.cameraY;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (absDx > 0.1 || absDy > 0.1) {
        const threshold = this.AFC.target ? Infinity : 100;
        if (Math.sqrt(dx * dx + dy * dy) < threshold) {
          interpolated.cameraX = lastData.cameraX + dx * progress;
          interpolated.cameraY = lastData.cameraY + dy * progress;
          updated = true;
        }
      }

      const currentDir = currentData.cameraDirection;
      const lastDir = lastData.cameraDirection;
      if (currentDir !== lastDir) {
        if (currentDir % 90 !== 0 || lastDir % 90 !== 0) {
          const currentRad = (currentDir * Math.PI) / 180;
          const lastRad = (lastDir * Math.PI) / 180;
          interpolated.cameraDirection =
            (180 *
              Math.atan2(
                Math.sin(currentRad) * progress + Math.sin(lastRad) * (1 - progress),
                Math.cos(currentRad) * progress + Math.cos(lastRad) * (1 - progress)
              )) /
            Math.PI;
        }
        updated = true;
      }

      const currentZoom = currentData.cameraZoom;
      const lastZoom = lastData.cameraZoom;
      if (currentZoom !== lastZoom) {
        const dz = currentZoom - lastZoom;
        if (Math.abs(dz) < 30) {
          interpolated.cameraZoom = lastZoom + dz * progress;
          updated = true;
        }
      }

      if (updated) {
        this.updateCamera(interpolated);
      }
    }
  }

  getCamData() {
    return {
      cameraX: this.cameraX,
      cameraY: this.cameraY,
      cameraZoom: this.cameraZoom,
      cameraDirection: this.cameraDirection,
    };
  }

  hackSomeScratchFunctions() {
    const runtime = this.runtime;

    this.tryHackedFunction(
      runtime,
      "_renderInterpolatedPositions",
      function (this: any, origFn: any) {
        const elapsed = Date.now() - this._lastStepTime;
        const progress = Math.min(1, Math.max(0, elapsed / this.currentStepTime));
        (globalThis as any)[NS].interpolateCamera(progress);
        origFn.call(this);
      }.bind(runtime)
    );
    runtime.frameLoop._restart();

    this.tryHackedFunction(runtime.sequencer, "stepThreads", function (this: any, origFn: any) {
      const ext = (globalThis as any)[NS];
      if (runtime.interpolationEnabled) {
        ext.lastData = ext.getCamData();
        ext.updateCamera();
      }
      const result = origFn.call(this);
      if (ext && ext.AFC && ext.AFC.enabled) {
        ext.calculateAFC();
      }
      return result;
    });

    this.tryHackedFunction(runtime.ioDevices.mouse, "postData", function (this: any, origFn: any, data: any) {
      const wasDown = this._isDown;
      origFn.call(this, data);
      (globalThis as any)[NS].__updateMousePosInMap();

      if (data.isDown !== undefined && wasDown !== data.isDown && !data.wasDragged) {
        if (!(data.x > 0 && data.x < data.canvasWidth && data.y > 0 && data.y < data.canvasHeight)) return;
        const coords = this._coordsWithCam;
        const target = this._pickTarget(coords[0], coords[1]);
        const isClick = (!wasDown && data.isDown) || (wasDown && !data.isDown);
        if ((target.draggable && !data.isDown) || (!target.draggable && data.isDown)) {
          this._activateClickHats(target);
        }
      }
    });

    const primitives = runtime._primitives;

    this.tryHackedFunction(
      primitives,
      "motion_pointtowards",
      function (this: any, origFn: any, args: any, util: any) {
        const ext = (globalThis as any)[NS];
        if (ext && args.TOWARDS === "_mouse_") {
          const target = util.target;
          const coords = ext.getMouseCoordsForTarget(target);
          const dx = coords[2] - target.x;
          const dy = coords[3] - target.y;
          const direction = 90 - (Math.atan2(dy, dx) * 180) / Math.PI;
          target.setDirection(direction);
        } else {
          origFn.call(this, args, util);
        }
      }.bind(runtime.ext_scratch3_motion)
    );

    this.tryHackedFunction(runtime.ext_scratch3_motion, "getTargetXY", function (this: any, origFn: any, targetName: any, util: any) {
      const ext = (globalThis as any)[NS];
      if (ext && targetName === "_mouse_") {
        const target = util.target;
        const coords = ext.getMouseCoordsForTarget(target);
        return [coords[2], coords[3]];
      }
      return origFn.call(this, targetName, util);
    });

    this.tryHackedFunction(
      runtime.ext_scratch3_motion,
      "_ifOnEdgeBounce",
      function (this: any, origFn: any, target: any) {
        const ext = (globalThis as any)[NS];
        const fixMode = ext?.config.onEdgeBounceFixMode;
        if (ext && ext.isTargetFollowingCam(target) && fixMode !== "no") {
          const bounds = target.getBounds();
          if (!bounds) return;
          const edgeBounds = ext.__getBoundsOf(fixMode, true);
          const left = Math.max(0, bounds.left - edgeBounds.left);
          const top = Math.max(0, edgeBounds.top - bounds.top);
          const right = Math.max(0, edgeBounds.right - bounds.right);
          const bottom = Math.max(0, bounds.bottom - edgeBounds.bottom);

          let closest = "";
          let minDist = Infinity;
          if (left < minDist) { minDist = left; closest = "left"; }
          if (top < minDist) { minDist = top; closest = "top"; }
          if (right < minDist) { minDist = right; closest = "right"; }
          if (bottom < minDist) { minDist = bottom; closest = "bottom"; }

          if (minDist > 0) return;

          const dirRad = ((90 - target.direction) * Math.PI) / 180;
          let dirX = Math.cos(dirRad);
          let dirY = -Math.sin(dirRad);

          if (closest === "left") dirX = Math.max(0.2, Math.abs(dirX));
          else if (closest === "top") dirY = Math.max(0.2, Math.abs(dirY));
          else if (closest === "right") dirX = -Math.max(0.2, Math.abs(dirX));
          else if (closest === "bottom") dirY = -Math.max(0.2, Math.abs(dirY));

          const newDir = (Math.atan2(dirY, dirX) * 180) / Math.PI + 90;
          target.setDirection(newDir);
          const fenced = target.keepInFence(target.x, target.y, edgeBounds);
          target.setXY(fenced[0], fenced[1]);
        } else {
          origFn.call(this, target);
        }
      }.bind(runtime.ext_scratch3_motion)
    );

    const compilerExports =
      (Scratch.vm as any).exports?.i_will_not_ask_for_help_when_these_break?.();

    if (compilerExports) {
      const { JSGenerator } = compilerExports;
      const { TypedInput, TYPE_NUMBER } = JSGenerator.unstable_exports;

      this.tryHackedFunction(JSGenerator.prototype, "descendInput", function (this: any, origFn: any, input: any, ...rest: any[]) {
        if (input.kind === "sensing.distance") {
          const target = this.descendInput(input.target).asString();
          const ext = this.evaluateOnce(`runtime.ext_${NS}`);
          return new TypedInput(
            `( ( ${target} === '_mouse_' && ${ext}) ? ${ext}.distanceToMouse(thread.target) : distance(${target}) )`,
            TYPE_NUMBER
          );
        }
        return origFn.call(this, input, ...rest);
      });

      this.tryHackedFunction(
        primitives,
        "sensing_distanceto",
        function (this: any, origFn: any, args: any, util: any) {
          const ext = (globalThis as any)[NS];
          if (ext && args.DISTANCETOMENU === "_mouse_") {
            return ext.distanceToMouse(util.target);
          }
          return origFn.call(this, args, util);
        }.bind(runtime.ext_scratch3_sensing)
      );

      if (runtime.ext_scratch3_looks) {
        this.tryHackedFunction(runtime.ext_scratch3_looks, "_positionBubble", function (this: any, origFn: any, target: any) {
          const ext = (globalThis as any)[NS];
          const fixMode = ext?.config.bubbleFixMode;
          if (fixMode && fixMode > 0 && ext.isTargetFollowingCam(target)) {
            if (fixMode === 1) {
              const getNativeSize = this.runtime.renderer.getNativeSize;
              this.runtime.renderer.getNativeSize = function () {
                return [Infinity, Infinity];
              };
              try {
                origFn.call(this, target);
              } finally {
                this.runtime.renderer.getNativeSize = getNativeSize;
              }
            } else {
              if (!target.visible) return;
              const bubbleState = this._getBubbleState(target);
              const [spriteWidth, spriteHeight] = this.runtime.renderer.getCurrentSkinSize(bubbleState.drawableId);
              let bounds;
              try {
                bounds = target.getBoundsForBubble();
              } catch {
                bounds = { left: target.x, right: target.x, top: target.y, bottom: target.y };
              }
              const viewBounds = ext.__getBoundsOf("view", true);
              if (bubbleState.onSpriteRight && spriteWidth + bounds.right > viewBounds.right && bounds.left - spriteWidth > viewBounds.left) {
                bubbleState.onSpriteRight = false;
                this._renderBubble(target);
              } else if (!bubbleState.onSpriteRight && bounds.left - spriteWidth < viewBounds.left && spriteWidth + bounds.right < viewBounds.right) {
                bubbleState.onSpriteRight = true;
                this._renderBubble(target);
              } else {
                this.runtime.renderer.updateDrawablePosition(bubbleState.drawableId, [
                  bubbleState.onSpriteRight
                    ? Math.max(viewBounds.left, Math.min(viewBounds.right - spriteWidth, bounds.right))
                    : Math.min(viewBounds.right - spriteWidth, Math.max(viewBounds.left, bounds.left - spriteWidth)),
                  Math.min(viewBounds.top, bounds.bottom + spriteHeight),
                ]);
                this.runtime.requestRedraw();
              }
            }
          } else {
            origFn.call(this, target);
          }
        });

        this.tryHackedFunction(runtime.ext_scratch3_looks, "_renderBubble", function (this: any, origFn: any, target: any) {
          origFn.call(this, target);
          const ext = (globalThis as any)[NS];
          if (ext && !ext.isTargetFollowingCam(target)) {
            const bubbleDrawableId = this._getBubbleState(target).drawableId;
            if (bubbleDrawableId) {
              const drawables = this.runtime.renderer._allDrawables;
              const projection = drawables[target.drawableID].customizedProjection;
              drawables[bubbleDrawableId].customizedProjection = projection;
            }
          }
        });
      }

      const targetProto = Object.getPrototypeOf(this.runtime.targets[0]);

      this.tryHackedFunction(targetProto, "setCustomState", function (this: any, origFn: any, key: any, state: any) {
        origFn.call(this, key, state);
        if (key === "CCW.CanvasV2") {
          (globalThis as any)[NS].updateTargetCanvasProjection(this);
        }
      });

      this.tryHackedFunction(targetProto, "dispose", function (this: any, origFn: any) {
        this.__deleted = true;
        origFn.call(this);
      });

      this.tryHackedFunction(targetProto, "makeClone", function (this: any, origFn: any) {
        const clone = origFn.call(this);
        if (clone) {
          const ext = (globalThis as any)[NS];
          if (ext) {
            ext.__setTargetFollowing(clone, ext.isTargetFollowingCam(this));
            if (this.__limitedByBoundary !== undefined) {
              clone.__limitedByBoundary = this.__limitedByBoundary;
            }
          }
        }
        return clone;
      });

      this.tryHackedFunction(targetProto, "isTouchingObject", function (this: any, origFn: any, objectName: any) {
        const ext = (globalThis as any)[NS];
        if (ext && objectName === "_mouse_") {
          const coords = ext.getMouseCoordsForTarget(this);
          return this.isTouchingPoint(coords[0], coords[1]);
        }
        return origFn.call(this, objectName);
      });

      this.tryHackedFunction(targetProto, "isTouchingEdge", function (this: any, origFn: any) {
        const ext = (globalThis as any)[NS];
        const fixMode = ext?.config.touchingEdgeFixMode;
        if (ext && ext.isTargetFollowingCam(this) && fixMode !== "no") {
          const edgeBounds = ext.__getBoundsOf(fixMode, true);
          const bounds = this.getBounds();
          return bounds.left < edgeBounds.left || bounds.right > edgeBounds.right || bounds.top > edgeBounds.top || bounds.bottom < edgeBounds.bottom;
        }
        return origFn.call(this);
      });

      this.tryHackedFunction(targetProto, "setXY", function (this: any, origFn: any, x: any, y: any, force: any) {
        origFn.call(this, x, y, force);
        const ext = (globalThis as any)[NS];
        if (this.__limitedByBoundary !== false && ext && ext.isTargetFollowingCam(this)) {
          const bounds = ext.mapBoundaries;
          const clampedX = Math.min(bounds.right, Math.max(bounds.left, this.x));
          const clampedY = Math.min(bounds.top, Math.max(bounds.bottom, this.y));
          if (clampedX !== this.x || clampedY !== this.y) {
            origFn.call(this, clampedX, clampedY);
          }
        }
      });
    } else {
      console.log("Ext_GKamera patch failed, no exported compiler");
    }
  }

  setBubbleFixMode(args: any) {
    const mode = Scratch.Cast.toNumber(args.MODE);
    this.config.bubbleFixMode = mode;
    this.fixAllBubblePosition();
  }

  setTouchingEdgeFixMode(args: any) {
    const mode = args.MODE;
    this.config.touchingEdgeFixMode = mode;
  }

  setOnEdgeBounceFixMode(args: any) {
    const mode = args.MODE;
    this.config.onEdgeBounceFixMode = mode;
  }

  moveSteps(args: any) {
    const steps = Scratch.Cast.toNumber(args.VAL);
    const angle = ((90 - this.cameraDirection) * Math.PI) / 180;
    this.cameraX += steps * Math.sin(angle);
    this.cameraY += steps * Math.cos(angle);
    this.updateCamera();
    this.runtime.requestRedraw();
  }

  rotateCW(args: any) {
    const degrees = Scratch.Cast.toNumber(args.VAL);
    this.cameraDirection += degrees;
    this.updateCamera();
    this.runtime.requestRedraw();
  }

  rotateCCW(args: any) {
    const degrees = Scratch.Cast.toNumber(args.VAL);
    this.cameraDirection -= degrees;
    this.updateCamera();
    this.runtime.requestRedraw();
  }

  setBoth(args: any) {
    const x = Scratch.Cast.toNumber(args.X);
    const y = Scratch.Cast.toNumber(args.Y);
    this.cameraX = x;
    this.cameraY = y;
    this.updateCamera();
    this.runtime.requestRedraw();
  }

  setDirection(args: any) {
    const direction = Scratch.Cast.toNumber(args.VAL);
    this.cameraDirection = direction;
    this.updateCamera();
    this.runtime.requestRedraw();
  }

  changeX(args: any) {
    const delta = Scratch.Cast.toNumber(args.VAL);
    this.cameraX += delta;
    this.updateCamera();
    this.runtime.requestRedraw();
  }

  setX(args: any) {
    const x = Scratch.Cast.toNumber(args.VAL);
    this.cameraX = x;
    this.updateCamera();
    this.runtime.requestRedraw();
  }

  changeY(args: any) {
    const delta = Scratch.Cast.toNumber(args.VAL);
    this.cameraY += delta;
    this.updateCamera();
    this.runtime.requestRedraw();
  }

  setY(args: any) {
    const y = Scratch.Cast.toNumber(args.VAL);
    this.cameraY = y;
    this.updateCamera();
    this.runtime.requestRedraw();
  }

  getX() {
    return this.cameraX;
  }

  getY() {
    return this.cameraY;
  }

  getMouseXInMap() {
    return this.getMouseCoords(true)[2];
  }

  getMouseYInMap() {
    return this.getMouseCoords(true)[3];
  }

  __setBoundary(type: string, value: any) {
    const coord = value === "" ? Infinity * (type === "left" || type === "bottom" ? -1 : 1) : Scratch.Cast.toNumber(value);
    let conflict: string | null = null;

    switch (type) {
      case "top":
        if (coord < this.mapBoundaries.bottom + 20) conflict = "bottom";
        break;
      case "bottom":
        if (coord > this.mapBoundaries.top - 20) conflict = "top";
        break;
      case "left":
        if (coord > this.mapBoundaries.right - 20) conflict = "right";
        break;
      case "right":
        if (coord < this.mapBoundaries.left + 20) conflict = "left";
        break;
      default:
        return false;
    }

    if (conflict) {
      if (!this.runtime.isPlayerOnly) {
        this.runtime.logSystem?.show();
      }
      this.logError(
        this.formatMessage({ borderTooClose: en.borderTooClose })
          .replace("%1", this.formatMessage({ [type]: (en as any)[type] }))
          .replace("%2", value)
          .replace("%3", this.formatMessage({ [conflict]: (en as any)[conflict] }))
          .replace("%4", (this.mapBoundaries as any)[conflict])
      );
      return false;
    }

    (this.mapBoundaries as any)[type] = coord;
    return true;
  }

  logError(...args: any[]) {
    if (this.runtime.logSystem) {
      if (!this.runtime.isPlayerOnly) {
        this.runtime.logSystem.show();
      }
      this.runtime.logSystem.warn(`[${this.formatMessage({ name: en.name })}]`, ...args);
    }
  }

  __constrainAllSpritesInMap() {
    this.runtime.targets.forEach((target: any) => {
      if (target.__limitedByBoundary !== false && this.isTargetFollowingCam(target)) {
        target.setXY(target.x, target.y);
      }
    });
  }

  setBoundaries(args: any) {
    this.__setBoundary("top", args.T);
    this.__setBoundary("bottom", args.B);
    this.__setBoundary("left", args.L);
    this.__setBoundary("right", args.R);
    this.__updateCameraBoundariesAndCamera();
    this.__constrainAllSpritesInMap();
  }

  setBoundary(args: any) {
    this.__setBoundary(args.TYPE, args.COORD);
    this.__updateCameraBoundariesAndCamera();
    this.__constrainAllSpritesInMap();
  }

  removeBoundary(args: any) {
    if (args.TYPE === "all") {
      this.mapBoundaries = {
        top: Infinity,
        bottom: -Infinity,
        left: -Infinity,
        right: Infinity,
      };
    } else {
      this.__setBoundary(args.TYPE, "");
    }
    this.__updateCameraBoundariesAndCamera();
  }

  getBoundary(args: any) {
    const bounds = this.__getBoundsOf(args.OBJECT);
    return (bounds as any)[args.TYPE] ?? "";
  }

  setLimitedByBoundary(args: any, util: any) {
    const spriteName = Scratch.Cast.toString(args.SPRITE);
    const target = spriteName === "__myself__" ? util.target : this.__getTargetByNameOrId(spriteName);
    if (target) {
      target.__limitedByBoundary = args.TYPE === "yes";
      if (target.__limitedByBoundary) {
        target.setXY(target.x, target.y);
      }
    }
  }

  __getBoundsOf(objectType: string, useCamera = true) {
    if (objectType === "map") return this.mapBoundaries;

    const halfWidth = this.runtime.stageWidth / 2;
    const halfHeight = this.runtime.stageHeight / 2;

    if (useCamera) {
      const topLeft = this.scratchScreenToMap(-halfWidth, -halfHeight, this);
      const bottomRight = this.scratchScreenToMap(halfWidth, halfHeight, this);
      const minX = Math.min(topLeft[0], bottomRight[0]);
      const maxX = Math.max(topLeft[0], bottomRight[0]);
      const maxY = Math.max(topLeft[1], bottomRight[1]);
      const minY = Math.min(topLeft[1], bottomRight[1]);
      return { top: maxY, bottom: minY, left: minX, right: maxX };
    }

    return {
      top: halfHeight,
      bottom: -halfHeight,
      left: -halfWidth,
      right: halfWidth,
    };
  }

  isTouchingBounds(args: any, util: any) {
    const spriteName = Scratch.Cast.toString(args.SPRITE);
    const target = spriteName === "__myself__" ? util.target : this.__getTargetByNameOrId(spriteName);
    if (!target) return false;

    const bounds = this.__getBoundsOf(args.OBJECT, this.isTargetFollowingCam(target));
    const targetBounds = target.getBounds();
    return (
      targetBounds.left < bounds.left ||
      targetBounds.right > bounds.right ||
      targetBounds.top > bounds.top ||
      targetBounds.bottom < bounds.bottom
    );
  }

  isOutOfBounds(args: any, util: any) {
    const spriteName = Scratch.Cast.toString(args.SPRITE);
    const target = spriteName === "__myself__" ? util.target : this.__getTargetByNameOrId(spriteName);
    if (!target) return false;

    const bounds = this.__getBoundsOf(args.OBJECT, this.isTargetFollowingCam(target));
    const targetBounds = target.getBounds();
    return (
      targetBounds.right < bounds.left ||
      targetBounds.left > bounds.right ||
      targetBounds.bottom > bounds.top ||
      targetBounds.top < bounds.bottom
    );
  }

  isCoordOutOfBounds(args: any) {
    const x = Scratch.Cast.toNumber(args.X);
    const y = Scratch.Cast.toNumber(args.Y);
    const bounds = this.__getBoundsOf(args.OBJECT);
    return x < bounds.left || x > bounds.right || y > bounds.top || y < bounds.bottom;
  }

  getDirection() {
    return this.cameraDirection;
  }

  changeZoom(args: any) {
    const delta = Scratch.Cast.toNumber(args.VAL);
    this.cameraZoom += delta;
    this.__updateCameraBoundariesAndCamera();
    this.runtime.requestRedraw();
  }

  setZoom(args: any) {
    const zoom = Scratch.Cast.toNumber(args.VAL);
    this.cameraZoom = zoom;
    this.__updateCameraBoundariesAndCamera();
    this.runtime.requestRedraw();
  }

  getZoom() {
    return this.cameraZoom;
  }

  setCol(args: any) {
    this.cameraBG = args.VAL;
    const rgb = Scratch.Cast.toRgbColorObject(args.VAL);
    this.renderer.setBackgroundColor(rgb.r / 255, rgb.g / 255, rgb.b / 255);
    this.renderer.dirty = true;
    this.runtime.requestRedraw();
  }

  getCol() {
    return this.cameraBG;
  }

  moveTo(args: any) {
    const x = Scratch.Cast.toNumber(args.X);
    const y = Scratch.Cast.toNumber(args.Y);
    const zoom = Scratch.Cast.toNumber(args.Z);
    const duration = 1000 * Scratch.Cast.toNumber(args.T);
    const curveParts = Scratch.Cast.toString(args.CURVE).split(".");
    let easingFn = (t: number) => t; // Linear.None

    if (curveParts.length === 2) {
      // TODO: Implement proper easing functions
      // For now, use linear interpolation
    }

    this.stopTween();
    const start = { cameraX: this.cameraX, cameraY: this.cameraY, zoom: this.cameraZoom };
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);

      this.cameraX = start.cameraX + (x - start.cameraX) * progress;
      this.cameraY = start.cameraY + (y - start.cameraY) * progress;
      this.cameraZoom = start.zoom + (zoom - start.zoom) * progress;
      this.__updateCameraBoundariesAndCamera();
      this.runtime.requestRedraw();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }

  cameraAutoFollow(args: any, util: any) {
    const spriteName = Scratch.Cast.toString(args.SPRITE);
    const target = spriteName === "__myself__" ? util.target : this.__getTargetByNameOrId(spriteName);
    if (target) {
      const width = Scratch.Cast.toNumber(args.W);
      const height = Scratch.Cast.toNumber(args.H);
      const offsetX = Scratch.Cast.toNumber(args.X);
      const offsetY = Scratch.Cast.toNumber(args.Y);
      const algorithm = Scratch.Cast.toString(args.ALG);

      this.AFC.safeArea.h = height;
      this.AFC.safeArea.w = width;
      this.AFC.offset.x = offsetX;
      this.AFC.offset.y = offsetY;
      this.AFC.algorithm = algorithm;
      this.AFC.enabled = true;

      if (this.AFC.target !== target) {
        this.AFC.target = target;
        this.AFC.lastTargetXY = { x: target.x, y: target.y };
        this.AFC.lastSpeed = 0;
        this.AFC.speedHistory = [];
        this.AFC.step = 0.125;
        this.AFC.currentStep = 0.125;
      }
    }
  }

  stopTween() {
    if (this.tween) {
      this.tween.stop();
    }
    this.AFC.enabled = false;
  }

  async spriteMotion(args: any, util: any) {
    const spriteName = Scratch.Cast.toString(args.SPRITE);
    const x = Scratch.Cast.toNumber(args.X);
    const y = Scratch.Cast.toNumber(args.Y);
    const zoom = Scratch.Cast.toNumber(args.Z);
    const duration = 1000 * Scratch.Cast.toNumber(args.T);
    const curveParts = Scratch.Cast.toString(args.CURVE).split(".");
    let easingFn = (t: number) => t; // Linear.None

    if (curveParts.length === 2) {
      // TODO: Implement proper easing functions
    }

    const target = spriteName === "__myself__" ? util.target : this.__getTargetByNameOrId(spriteName);
    if (!target) return;

    if (target.tween) target.tween.stop();
    if (target.x === x && target.y === y && target.size === zoom) return;

    return new Promise<void>((resolve) => {
      const start = { x: target.x, y: target.y, size: target.size };
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(1, elapsed / duration);

        try {
          target.setXY(start.x + (x - start.x) * progress, start.y + (y - start.y) * progress, true);
          target.setSize(start.size + (zoom - start.size) * progress);
        } catch {
          if (target.tween) target.tween.stop();
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(animate);
    });
  }

  setFixedOneSprite(args: any, util: any) {
    const spriteName = Scratch.Cast.toString(args.SPRITE);
    const target = spriteName === "__myself__" ? util.target : this.__getTargetByNameOrId(spriteName);
    if (target) {
      const follow = Scratch.Cast.toString(args.FOLLOW) === "follow";
      this.__setTargetFollowing(target, follow);
      this.updateCamera();
      this.runtime.requestRedraw();
    }
  }

  setPenFollowing(args: any) {
    const penDrawableId = this.runtime.ext_pen?._penDrawableId;
    if (penDrawableId && penDrawableId !== -1) {
      const projection = Scratch.Cast.toString(args.FOLLOW) === "follow" ? undefined : this.getFixedProjection();
      this.renderer._allDrawables[penDrawableId].customizedProjection = projection;
      this.renderer.dirty = true;
      this.runtime.requestRedraw();
    }
  }

  updateTargetCanvasProjection(target: any, mode: string = target._canvasFollowingMode) {
    const canvasExt = this.runtime.ext_CCWCanvasV2;
    if (canvasExt) {
      const canvasState = target.getCustomState("CCW.CanvasV2");
      if (canvasState?.drawableID) {
        let projection;
        if (mode === "follow") {
          projection = undefined;
        } else if (mode === "unfollow") {
          projection = this.getFixedProjection();
        } else if (this.renderer._allDrawables[target.drawableID]) {
          projection = this.renderer._allDrawables[target.drawableID].customizedProjection;
        }
        this.renderer._allDrawables[canvasState.drawableID].customizedProjection = projection;
        this.renderer.dirty = true;
      }
    }
  }

  setCanvasFollowing(args: any, util: any) {
    const mode = Scratch.Cast.toString(args.MODE);
    const target = util.target;
    target._canvasFollowingMode = mode;
    this.updateTargetCanvasProjection(target);
  }

  __setTargetFollowing(target: any, follow: boolean) {
    const projection = follow ? undefined : this.getFixedProjection();
    this.renderer._allDrawables[target.drawableID].customizedProjection = projection;
    const bubbleDrawableId = this.runtime.ext_scratch3_looks._getBubbleState(target).drawableId;
    if (bubbleDrawableId) {
      this.renderer._allDrawables[bubbleDrawableId].customizedProjection = projection;
    }
    this.updateTargetCanvasProjection(target);
  }

  setFixedSprite(args: any) {
    const folder = Scratch.Cast.toString(args.FOLDER);
    const follow = Scratch.Cast.toString(args.FOLLOW) === "follow";

    if (folder === "") return;

    let found = false;
    this.runtime.targets.forEach((target: any) => {
      if (target.getName().startsWith(`${folder}//`)) {
        this.__setTargetFollowing(target, follow);
        found = true;
      }
    });

    if (found) {
      this.updateCamera();
      this.runtime.requestRedraw();
    }
  }

  changeFolderXY(args: any) {
    const folder = Scratch.Cast.toString(args.FOLDER);
    const dx = Scratch.Cast.toNumber(args.X);
    const dy = Scratch.Cast.toNumber(args.Y);

    if (folder === "") return;

    const sprites = this.getSpritesByFolder(folder);
    if (sprites && sprites.length > 0) {
      sprites.forEach((target: any) => {
        target.setXY(target.x + dx, target.y + dy, true);
      });
    }
  }

  setFolderVisibility(args: any) {
    const folder = Scratch.Cast.toString(args.FOLDER);
    const visible = Scratch.Cast.toString(args.VISIBILITY) === "show";

    if (folder === "") return;

    const sprites = this.getSpritesByFolder(folder);
    if (sprites && sprites.length > 0) {
      sprites.forEach((target: any) => {
        target.setVisible(visible);
      });
    }
  }

  changeFolderEffect(args: any) {
    const folder = Scratch.Cast.toString(args.FOLDER);
    const effect = Scratch.Cast.toString(args.EFFECT);
    const delta = Scratch.Cast.toNumber(args.VALUE);

    if (folder === "") return;

    const sprites = this.getSpritesByFolder(folder);
    if (sprites && sprites.length > 0) {
      sprites.forEach((target: any) => {
        if (target.effects[effect] !== undefined) {
          const newValue = target.effects[effect] + delta;
          const clamped = this.clampEffect(effect, newValue);
          target.setEffect(effect, clamped);
        }
      });
    }
  }

  setFolderEffect(args: any) {
    const folder = Scratch.Cast.toString(args.FOLDER);
    const effect = Scratch.Cast.toString(args.EFFECT);
    const value = Scratch.Cast.toNumber(args.VALUE);

    if (folder === "") return;

    const sprites = this.getSpritesByFolder(folder);
    if (sprites && sprites.length > 0) {
      const clamped = this.clampEffect(effect, value);
      sprites.forEach((target: any) => {
        target.setEffect(effect, clamped);
      });
    }
  }

  clearFolderEffects(args: any) {
    const folder = Scratch.Cast.toString(args.FOLDER);
    if (folder === "") return;

    const sprites = this.getSpritesByFolder(folder);
    if (sprites && sprites.length > 0) {
      sprites.forEach((target: any) => {
        target.clearEffects();
      });
    }
  }

  __getTargetByNameOrId(nameOrId: string) {
    return this.runtime.targets.find((target: any) => target.sprite?.name === nameOrId || target.id === nameOrId);
  }

  __getSpriteFolders() {
    const folders = new Set<string>();
    this.runtime.targets.forEach((target: any) => {
      const name = target.getName();
      const parts = name.split("//");
      if (parts.length > 1) {
        folders.add(parts[0]);
      }
    });
    return Array.from(folders).map((folder) => ({ text: folder, value: folder }));
  }
}

export const __esModule = true;

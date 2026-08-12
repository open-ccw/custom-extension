/* eslint-disable class-methods-use-this */
/* eslint no-param-reassign: [
  "error", {
    "props": true,
    "ignorePropertyModificationsForRegex": ["^target"] }]
*/

const { Scratch } = window;
const {
  BlockType, ArgumentType, TargetType, Cast,
} = Scratch;

const extensionNS = 'witCat';
const extensionId = `${extensionNS}.dollyPro`;

/** 保存扩展配置的舞台注释的Id */
const EXT_CONFIG_COMMENT_ID = '_ArkosExtensionConfig_';

const cover = 'https://m.ccw.site/user_projects_assets/8192f42de3c3020a10cd58bfd617d5e3.png';
const icon = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMjAuNSIgaGVpZ2h0PSIxMjAuNSIgdmlld0JveD0iMCwwLDEyMC41LDEyMC41Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjU5Ljc1LC0xMTkuNzUpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yNzYuOTY2NDIsMTU2LjIzNjAxYy0xLjYyNDgsLTMuNTc0NiAtMC45Njg4LC0xMC4xOTc5IDMuODk5NSwtMTIuMDIzNWM1LjE5OTQsLTEuOTQ5OCA3LjQ3NDEsLTMuNTc0NiAxNy44NzI5LDQuMjI0NGM4LjMxOSw2LjIzOTMgOS41MzIyLDEwLjYxNTQgOS4wOTg5LDEyLjAyMzZsLTUuODQ5Myw2LjE3NDJjLTAuNDMzMywtMS4yOTk4IC0zLjExOTYsLTQuMzU0NCAtMTAuMzk4OCwtNi4xNzQyYy05LjA5ODksLTIuMjc0NyAtMTIuOTk4NCwtMC42NDk5IC0xNC42MjMyLC00LjIyNDV6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0zNjcuOTU1NTQsMTQ5LjQzNjkzYy0yLjYsMi45MjQ1IC0zLjI1LDcuNzk5MSAtMTAuNzI0LDcuNzk5MWMtNS45NzkxLDAgLTEwLjI5MDIsMi44MTYzIC0xMi42NzMzLDUuMTk5M2wtNi44MjQxLC01LjE5OTNjMC44NjY1LC0yLjM4MyA0LjQ4NDQsLTguMTIzOSAxMi4wMjM1LC0xMi4wMjM1YzkuNDIzOSwtNC44NzQ2IDIwLjc5NzksMS4yOTk5IDE4LjE5NzksNC4yMjQ0eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMjc1LjM0MTY0LDE4OS4wNTcwMWM0LjY3OTUsLTYuMjM5MiAxOC4xOTc4LC04Ljg4MjIgMjQuMzcyMSwtOS40MjM4YzAsLTIuMjc0OCAxLjAzOTgsLTguMjU0IDUuMTk5MywtMTMuOTczNGM1LjE5OTQsLTcuMTQ5MSA5LjA5ODksLTEyLjk5ODQgMjYuNjQ2OCwtMTAuMzk4N2MxNy41NDc5LDIuNTk5NyAxNy4yMjI5LDIwLjE0NzYgMTkuMTcyNywyNC4zNzIxYzEuOTQ5OCw0LjIyNDQgMC45NzQ5LDIxLjQ0NzQgLTcuNzk5MSwyOC41OTY1Yy04Ljc3MzksNy4xNDkyIC0yNi4zMjE4LDguNDQ5MiAtMzguMDIwNCw4LjEyNDJjLTExLjY5ODYsLTAuMzI1IC0yMS4xMjI0LC01LjE5OTUgLTI2Ljk3MTcsLTguMTI0MmMtNS44NDkzLC0yLjkyNDYgLTguNDQ5LC0xMS4zNzM2IC0yLjU5OTcsLTE5LjE3Mjd6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0zMDcuODM3NywxNjEuMDYxNjZjMC40MzMzLC0xLjQwODIgLTAuNzc5OSwtNS43ODQzIC05LjA5ODksLTEyLjAyMzZjLTEwLjM5ODgsLTcuNzk5IC0xMi42NzM1LC02LjE3NDIgLTE3Ljg3MjksLTQuMjI0NGMtNC44NjgzLDEuODI1NiAtNS41MjQzLDguNDQ4OSAtMy44OTk1LDEyLjAyMzVjMS42MjQ4LDMuNTc0NiA1LjUyNDMsMS45NDk4IDE0LjYyMzIsNC4yMjQ1YzcuMjc5MiwxLjgxOTggOS45NjU1LDQuODc0NCAxMC4zOTg4LDYuMTc0MnpNMzQ0LjU1ODIyLDE2Mi4wMzY0MWMyLjM4MzEsLTIuMzgzIDYuNjk0MiwtNS4xOTkzIDEyLjY3MzMsLTUuMTk5M2M3LjQ3NCwwIDguMTI0LC00Ljg3NDYgMTAuNzI0LC03Ljc5OTFjMi42LC0yLjkyNDUgLTguNzc0LC05LjA5OSAtMTguMTk3OSwtNC4yMjQ0Yy03LjUzOTEsMy44OTk2IC0xMS4xNTcsOS42NDA1IC0xMi4wMjM1LDEyLjAyMzV6TTMwNC45MTMsMTY2LjI2MDhjNS4xOTk0LC03LjE0OTEgOS4wOTg5LC0xMi45OTg0IDI2LjY0NjgsLTEwLjM5ODdjMTcuNTQ3OSwyLjU5OTcgMTcuMjIyOSwyMC4xNDc2IDE5LjE3MjcsMjQuMzcyMWMxLjk0OTgsNC4yMjQ0IDAuOTc0OSwyMS40NDc0IC03Ljc5OTEsMjguNTk2NWMtOC43NzM5LDcuMTQ5MiAtMjYuMzIxOCw4LjQ0OTIgLTM4LjAyMDQsOC4xMjQyYy0xMS42OTg2LC0wLjMyNSAtMjEuMTIyNCwtNS4xOTk1IC0yNi45NzE3LC04LjEyNDJjLTUuODQ5MywtMi45MjQ2IC04LjQ0OSwtMTEuMzczNiAtMi41OTk3LC0xOS4xNzI3YzQuNjc5NSwtNi4yMzkyIDE4LjE5NzgsLTguODgyMiAyNC4zNzIxLC05LjQyMzhjMCwtMi4yNzQ4IDEuMDM5OCwtOC4yNTQgNS4xOTkzLC0xMy45NzM0eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjUiLz48cGF0aCBkPSJNMzM4LjkwMzEsMTk1LjcxMDg5YzAsMCAtNy45NTI2Niw0Ljg3ODc0IC0xMy42MjA0Niw2LjcxMDgxYy02LjMyNDY2LDIuMDQ0NCAtMjIuNTczNDQsNC45ODg1OSAtMjIuNTczNDQsNC45ODg1OSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjUiLz48Zz48cGF0aCBkPSJNMzE1LjczNzM4LDE4NS40NDg0MmMtMi41MDQ3NCwyLjAwNjggLTE1LjE2ODA0LC0yLjQ3MzY3IC0xNS4xNjgwNCwtMi40NzM2N2MwLDAgLTguMDE3MDEsNy45NjIzNCAtMTEuNjM3OTMsNi45ODQwNGMtMy42MjMzLC0wLjk3NzY4IC0xLjE4MjkyLC0xMC40NDU0NSAtMS4xODI5MiwtMTAuNDQ1NDVjMCwwIC0xMy43NjMwNiwtMi42NTU3MSAtMTMuNDk1MTUsLTUuMjY4MDdjMC4yNjcwNCwtMi42MTQxIDE0LjQ0MDYyLC0zLjk4MjA1IDE0LjQ0MDYyLC0zLjk4MjA1YzAsMCAtMC40OTExNiwtOS42MDEzOCAzLjI5NDQxLC0xMC4yNDAxMWMzLjc5MTM4LC0wLjYzODI3IDEwLjExMjI4LDcuOTg0MSAxMC4xMTIyOCw3Ljk4NDFjMCwwIDEzLjQ1OSwtMy4yODA2IDE1LjUzMDI0LC0xLjA1OTY1YzIuMDc3ODMsMi4yMTc2MyAtOC4xOTExNyw4LjkxNjQxIC04LjE5MTE3LDguOTE2NDFjMCwwIDguODA5ODgsNy41NzU5NyA2LjI5NzY0LDkuNTg0NXoiIGZpbGw9IiMwMDAwMDAiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI4OC4yMzgxMywxODQuMTU3NjJsLTEuNDM0OCwtNC45OTI3NWwxMS4xMjI1OSwtMTcuNDExOTFsMy4xMDQwNywyLjY2MzM3YzAsMCAtMTIuNzYyMDEsMTkuNzM1MTIgLTEyLjc5MTg1LDE5Ljc0MTI5eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMzE1LjczNzM4LDE4NS40NDg0MmMtMi41MDQ3NCwyLjAwNjggLTE1LjE2ODA0LC0yLjQ3MzY3IC0xNS4xNjgwNCwtMi40NzM2N2MwLDAgLTguMDE3MDEsNy45NjIzNCAtMTEuNjM3OTMsNi45ODQwNGMtMy42MjMzLC0wLjk3NzY4IC0xLjE4MjkyLC0xMC40NDU0NSAtMS4xODI5MiwtMTAuNDQ1NDVjMCwwIC0xMy43NjMwNiwtMi42NTU3MSAtMTMuNDk1MTUsLTUuMjY4MDdjMC4yNjcwNCwtMi42MTQxIDE0LjQ0MDYyLC0zLjk4MjA1IDE0LjQ0MDYyLC0zLjk4MjA1YzAsMCAtMC40OTExNiwtOS42MDEzOCAzLjI5NDQxLC0xMC4yNDAxMWMzLjc5MTM4LC0wLjYzODI3IDEwLjExMjI4LDcuOTg0MSAxMC4xMTIyOCw3Ljk4NDFjMCwwIDEzLjQ1OSwtMy4yODA2IDE1LjUzMDI0LC0xLjA1OTY1YzIuMDc3ODMsMi4yMTc2MyAtOC4xOTExNyw4LjkxNjQxIC04LjE5MTE3LDguOTE2NDFjMCwwIDguODA5ODgsNy41NzU5NyA2LjI5NzY0LDkuNTg0NXoiIGZpbGw9Im5vbmUiIHN0cm9rZS1vcGFjaXR5PSIwLjYyNzQ1IiBzdHJva2U9IiNmZmRjMDAiIHN0cm9rZS13aWR0aD0iMi41Ii8+PC9nPjxnPjxwYXRoIGQ9Ik0zNTQuNjEyODEsMTg1LjA0MDU4Yy0yLjUxODg1LDEuODY5ODYgLTE1LjAyMTksLTIuNDI4MDYgLTE1LjAyMTksLTIuNDI4MDZjMCwwIC04LjA4NjU3LDcuNDMxOTIgLTExLjY2NjQ4LDYuNDg3NzFjLTMuNTgyMjcsLTAuOTQzNjQgLTEuMDA5MTMsLTkuODI4NTcgLTEuMDA5MTMsLTkuODI4NTdjMCwwIC0xMy42MjM5NCwtMi41ODk3MyAtMTMuMzE2NTcsLTUuMDQ0YzAuMzA2NTQsLTIuNDU1OTEgMTQuNDAxODUsLTMuNjQ2MzkgMTQuNDAxODUsLTMuNjQ2MzljMCwwIC0wLjMzNTY3LC05LjAzMDM0IDMuNDMzMzMsLTkuNjA1MzFjMy43NzQ3OCwtMC41NzQ1MiA5LjkxNDU2LDcuNTc0NzMgOS45MTQ1Niw3LjU3NDczYzAsMCAxMy40MTYwMywtMi45OTM1MiAxNS40Mzc0OSwtMC44OTE0NmMyLjAyODA1LDIuMDk4OTggLTguMjc0NTksOC4zMjc3NCAtOC4yNzQ1OSw4LjMyNzc0YzAsMCA4LjYyNzc5LDcuMTgyMjMgNi4xMDE0Niw5LjA1MzY1eiIgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMzI3LjE4MDA0LDE4NC4xNTg3MWwtMS4zNDU2MiwtNC43MDM3NmwxMS4zMTk4NywtMTYuMjk1MjRsMy4wNDAwMiwyLjUyNTAxYzAsMCAtMTIuOTg0NTEsMTguNDY4NCAtMTMuMDE0MjYsMTguNDc0MDF6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0zNTQuNjEyODEsMTg1LjA0MDU4Yy0yLjUxODg1LDEuODY5ODYgLTE1LjAyMTksLTIuNDI4MDYgLTE1LjAyMTksLTIuNDI4MDZjMCwwIC04LjA4NjU3LDcuNDMxOTIgLTExLjY2NjQ4LDYuNDg3NzFjLTMuNTgyMjcsLTAuOTQzNjQgLTEuMDA5MTMsLTkuODI4NTcgLTEuMDA5MTMsLTkuODI4NTdjMCwwIC0xMy42MjM5NCwtMi41ODk3MyAtMTMuMzE2NTcsLTUuMDQ0YzAuMzA2NTQsLTIuNDU1OTEgMTQuNDAxODUsLTMuNjQ2MzkgMTQuNDAxODUsLTMuNjQ2MzljMCwwIC0wLjMzNTY3LC05LjAzMDM0IDMuNDMzMzMsLTkuNjA1MzFjMy43NzQ3OCwtMC41NzQ1MiA5LjkxNDU2LDcuNTc0NzMgOS45MTQ1Niw3LjU3NDczYzAsMCAxMy40MTYwMywtMi45OTM1MiAxNS40Mzc0OSwtMC44OTE0NmMyLjAyODA1LDIuMDk4OTggLTguMjc0NTksOC4zMjc3NCAtOC4yNzQ1OSw4LjMyNzc0YzAsMCA4LjYyNzc5LDcuMTgyMjMgNi4xMDE0Niw5LjA1MzY1eiIgZmlsbD0ibm9uZSIgc3Ryb2tlLW9wYWNpdHk9IjAuNjI3NDUiIHN0cm9rZT0iI2ZmZGMwMCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz48L2c+PHBhdGggZD0iTTI1OS43NSwyNDAuMjV2LTEyMC41aDEyMC41djEyMC41eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48L2c+PC9nPjwvc3ZnPg==';

class dollyProExtension {
  static extCount = 0;

  constructor(runtime) {
    this.runtime = runtime;

    dollyProExtension.extCount += 1;
    /** 递增计数的扩展id。预防一个奇妙的情况：扩展被重复加载） */
    this.id = dollyProExtension.extCount;

    /** 克隆体ID映射表：ID → target
     * @type {{[ID: string]: Target}}
     */
    this.IDtoTargets = {};

    this.nextSpriteIDCount = 0;
    this.nextCloneIDCount = 0;

    /** 下个克隆体的预设的KV数据
     * @type {{[key: string]: any}}
     */
    this.clonePresetData = {};

    /** 下个克隆体的预设属性('x'、'y'、'size'、'direction'等)的值
     * @type {{[prop: string]: any}
     */
    this.clonePresetProperties = {};

    /** 克隆体预设的要加入的分组
     * @type {{[group: string]: true}}}
     */
    this.clonePresetGroups = {};

    /** 刚克隆的克隆体ID
     * @type {string}
     */
    this.justCreatedCloneID = '';

    /** 克隆体分组，每个组是一个克隆体ID列表
     * @type {{[groupName: string]: string[]}}
     */
    this.groupsOfClones = {};

    /** 存放 forEach 积木当前遍历的克隆体ID
     * @type {{[topBlockId: string]: string}}
     */
    this.forEachIndex = {};

    /** 一个附加功能，将扩展中对原版xy方向的访问转移到对克隆体Key数据的访问
     * - 例如，x: 'x' 表示原来访问target.x，现在访问target.DollyPro.extraData['x']
     * - 默认都是 null，即访问原内容
     * @type {{x: string|null, y: string|null, direction: string|null}}
     */
    this.accessTransfer = { x: null, y: null, direction: null };

    /** 是否隐藏不常用的多莉积木
     * @type {boolean}
     */
    this.hideExtraBlocks = true;

    if (!this.parseExtConfig()) {
      runtime.on('PROJECT_LOADED', () => {
        // 从作品注释读取扩展配置
        this.parseExtConfig();
      });
    }

    /** Scratch 的 canvas 对象 */
    this.canvas = runtime.renderer.canvas;

    const outerThis = this;

    // 劫持 runtime.getTargetById (根据Id找克隆体时，先从ID表查找)
    this.tryHackedFunction(
      this.runtime,
      'getTargetById',
      function getTargetById(origFun, ID) {
        // 先从ID表查找
        if (Object.prototype.hasOwnProperty.call(outerThis.IDtoTargets, ID)) {
          return outerThis.IDtoTargets[ID];
        }
        // 没找到再用原版方法
        return origFun.call(this, ID);
      },
    );

    // 劫持 runtime.removeExecutable
    this.tryHackedFunction(
      this.runtime,
      'removeExecutable',
      function removeExecutable(origFun, target) {
        // removeExecutable（删除角色/克隆体）之前，处理一下后事
        outerThis.processTargetBeforeDeletion(target);
        origFun.call(this, target);
      },
    );

    // 劫持 runtime.disposeTarget
    this.tryHackedFunction(
      this.runtime,
      'disposeTarget',
      function disposeTarget(origFun, target) {
        // 避免循环删除
        if (target.DollyPro) {
          if (target.DollyPro.isDeleting) return;
        }
        origFun.call(this, target);
      },
    );

    this.hackedDispose = function dispose(origFun) {
      // 避免循环删除
      if (this.DollyPro) {
        if (this.DollyPro.isDeleting) return;
      }
      origFun.call(this);
    };
    // 劫持 newClone.initDrawable
    this.hackedInitDrawable = function initDrawable(origFun, layerGroup) {
      if (!this.isOriginal) {
        // 触发hat“当克隆体即将启动”
        outerThis.runtime.startHats(`${extensionId}_initTheClone`, null, this);
      }
      origFun.call(this, layerGroup);
    };

    // 作品加载后，给每个角色注入多莉，并劫持RenderTarget方法
    setTimeout(() => {
      const { targets } = this.runtime;
      if (targets) {
        if (targets[0]) {
          // 劫持RenderTarget.initDrawable
          this.tryHackedRenderTarget(targets[0]);
        }
        targets.forEach((target) => {
          // 注入多莉
          this.injectDollyTarget(target);
        });
      }
    }, 1000);

    // 劫持 runtime.addTarget（用于创建新角色/克隆体时，注入多莉）
    this.tryHackedFunction(
      runtime,
      'addTarget',
      function addTarget(origFun, target) {
        // 注入多莉（角色本体、克隆体都要注入）
        outerThis.injectDollyTarget(target);
        if (!target.isOriginal) {
          // 如果是克隆体，进行一些预处理（如读取预设数据）
          outerThis.processCloneBeforeCreation(target);
          // 记录刚克隆的克隆体ID
          outerThis.justCreatedCloneID = outerThis.getIDOfTarget(target);
        }
        origFun.call(this, target);
      },
    );

    this.fm = this.runtime.getFormatMessage({
      'zh-cn': {
        'witCat.dollyPro.name': '多莉Pro',
        'witCat.dollyPro.urlButton': '📖 扩展教程',
        'witCat.dollyPro.url':
          'https://learn.ccw.site/article/9b9b43cd-75c3-4271-998c-b7c250fc81b9',
        'witCat.dollyPro.tag.utils': '🔧 常用工具',
        'witCat.dollyPro.tag.event': '🔔 事件触发',
        'witCat.dollyPro.tag.cloneAndDelete': '🪄 克隆与删除',
        'witCat.dollyPro.tag.data': '📄 数据获取与设置',
        'witCat.dollyPro.tag.group': '📁 克隆体分组',
        'witCat.dollyPro.tag.motion': '🚶 运动相关',
        'witCat.dollyPro.tag.sensing': '🔍 侦测相关',
        'witCat.dollyPro.tag.test': '🚧 实验积木',

        'witCat.dollyPro.warn.newIDIsOldID':
          '修改的角色ID已经是 "%s"!',
        'witCat.dollyPro.warn.repetitveID':
          '已存在ID为 "%s"的克隆体或角色，请不要设置相同 ID！',
        'witCat.dollyPro.error.repetitiveID':
          '已经存在ID为 "%s" 的克隆体，克隆时请勿使用相同ID！',
        'witCat.dollyPro.config.tip':
          '该注释用于保存多莉Pro扩展信息\n你可以拖动/缩放这个注释。不建议直接编辑注释文字。可以删除这个注释来清除扩展配置信息',

        'witCat.dollyPro.button.showBlock': '显示不常用的多莉积木',
        'witCat.dollyPro.button.hideBlock': '隐藏不常用的多莉积木',
        'witCat.dollyPro.confirm.showBlock?':
          '为了避免积木过多，一些不常用的多莉积木被隐藏了起来\n是否显示隐藏积木？',
        'witCat.dollyPro.block.addOrRemoveIDFromGroup':
          '将克隆体 [ID] [OP] [GROUP] 分组',
        'witCat.dollyPro.block.pickTarget': '点x:[X]y:[Y]处最上层克隆体ID',
        'witCat.dollyPro.block.addOrRemoveMyselfFromGroup':
          '将我 [OP] [GROUP] 分组',
        'witCat.dollyPro.block.calcDistanceBetweenClones':
          '克隆体1[ID1]到克隆体2[ID2]的[MENU]',
        'witCat.dollyPro.block.calcDistanceToClone': '到克隆体[ID]的[MENU]',
        'witCat.dollyPro.block.cancelAccessTransfer':
          '取消坐标/方向数据的访问转移',
        'witCat.dollyPro.block.cloneIDOfForEach': '⚠️当前遍历ID',
        'witCat.dollyPro.block.createCloneAndSpecifyID':
          '克隆 [TARGET] 并设置ID为 [ID]',
        'witCat.dollyPro.block.deleteCloneByID': '删除ID为[ID]的克隆体',
        'witCat.dollyPro.block.dispatchWhenCloneDeleted':
          '当侦测到有 [TARGET] 的克隆体被删除。删除的克隆体ID = [ID]',
        'witCat.dollyPro.block.dispatchWhenCloned':
          '当侦测到有 [TARGET] 的克隆体产生。产生的克隆体ID = [ID]',
        'witCat.dollyPro.block.forEachWithGroup':
          '⚠️遍历[GROUP]分组的每个克隆体',
        'witCat.dollyPro.block.getClonePropertyInGroup':
          '[GROUP]分组第 [INDEX] 个克隆体的 [PROPERTY]',
        'witCat.dollyPro.block.getClonePropertyWithID':
          '克隆体 [ID] 的 [PROPERTY]',
        'witCat.dollyPro.block.getCloneTargetPropertyWithSpriteName':
          '[TARGET] 的克隆体的 [PROPERTY]',
        'witCat.dollyPro.block.getGroupInfo': '[GROUP] 分组的克隆体 [PROPERTY]',
        'witCat.dollyPro.block.getJustCreatedCloneID': '刚克隆的克隆体的ID',
        'witCat.dollyPro.block.getMyProperty': '我的 [PROPERTY]',
        'witCat.dollyPro.block.getMyValueByKey': '我的[KEY]',
        'witCat.dollyPro.block.getNearestClone':
          '[TYPE][MENU][VALUE]的克隆体的ID',
        'witCat.dollyPro.menu.nearest': '最近的',
        'witCat.dollyPro.menu.farthest': '最远的',
        'witCat.dollyPro.block.getOriginalTargetPropertyWithSpriteName':
          ' [TARGET] 的 [PROPERTY]',
        'witCat.dollyPro.block.getTouchingID':
          '碰到[MENU][VALUE]的[TYPE]克隆体的ID',
        'witCat.dollyPro.block.getValueOfCloneIDWithKey': '克隆体[ID]的[KEY]',
        'witCat.dollyPro.block.ifCloneExists': '存在ID为 [ID] 的克隆体？',
        'witCat.dollyPro.block.ifCloneInGroup': '克隆体 [ID] 属于[GROUP]分组？',
        'witCat.dollyPro.block.importGroupIntoList':
          '将[GROUP]分组中所有克隆体ID列表 [OP] 到列表 [LIST]',
        'witCat.dollyPro.block.importTouchingIDsIntoList':
          '将碰到的[MENU][VALUE]的所有克隆体的ID [OP] 到列表 [LIST]',
        'witCat.dollyPro.block.initTheClone': '当前克隆体启动的前一刻',
        'witCat.dollyPro.block.beforeDeletionOfTheClone':
          '当前克隆体删除的前一刻',
        'witCat.dollyPro.block.isCloneOrIsOriginal': '我是[TYPE]吗？',
        'witCat.dollyPro.block.isCloneTouchingCoord':
          '[MENU][VALUE]的克隆体碰到点x:[X]y:[Y]？',
        'witCat.dollyPro.block.isTouchingClone': '碰到[MENU][VALUE]的克隆体？',
        'witCat.dollyPro.block.isCloneTouchingClone':
          'ID[ID]碰到[MENU][VALUE]的克隆体？',
        'witCat.dollyPro.block.moveStepsToClone': '朝克隆体[ID][MOTION][VALUE]',
        'witCat.dollyPro.block.moveToClone': '[MOTION]克隆体[ID]',
        'witCat.dollyPro.block.presetDataforTheNextCloneInJSONFormat':
          '预设下个克隆体的数据为JSON[DATA_JSON]',
        'witCat.dollyPro.block.presetGroupForTheNextClone':
          '预设下个克隆体要加入的一个分组[GROUP]',
        'witCat.dollyPro.block.presetPropertyForTheNextClone':
          '预设下个克隆体的[PROPERTY]为[VALUE]',
        'witCat.dollyPro.block.presetSingleDataForTheNextClone':
          '预设下个克隆体数据[KEY]为[VALUE]',
        'witCat.dollyPro.block.setMyID': '⚠️将我的ID修改为[ID]',
        'witCat.dollyPro.block.setOrChangeMyValueWithKey':
          '将我的[KEY][OP][VALUE]',
        'witCat.dollyPro.block.setOrChangeValueOfCloneIDWithKey':
          '克隆体[ID]的[KEY][OP][VALUE]',
        'witCat.dollyPro.block.transferAccessToTargetXYToDollyDataKey':
          '将扩展中对角色坐标、方向的访问转移到对以下键数据访问：[X_NAME][Y_NAME][DIR_NAME](选填)',
        'witCat.dollyPro.block.broadcastToClone':
          '向[MENU][VALUE]克隆体发送私信[MSG]，内容为[data]',
        'witCat.dollyPro.block.receiveMyBroadcast':
          '当我接收到名为[MSG]的私信。私信内容=[data]，发送者ID=[senderID]',

        'witCat.dollyPro.defaultValue.MSGName': '信息1',
        'witCat.dollyPro.defaultValue.MSGInfo': '数据',
        'witCat.dollyPro.defaultValue.HP': '生命值',
        'witCat.dollyPro.defaultValue.direction': '方向',
        'witCat.dollyPro.defaultValue.enemy': '敌人',
        'witCat.dollyPro.defaultValue.player': 'ID',
        'witCat.dollyPro.defaultValue.presetJSON':
          '\'{"名称":"普通士兵","生命值":100,"阵营":"红色"}\'',
        'witCat.dollyPro.menu.addOrRemove.add': '加入',
        'witCat.dollyPro.menu.addOrRemove.remove': '移出',
        'witCat.dollyPro.menu.calcBetweenClones.absAngleDifference':
          '角度差(正数)',
        'witCat.dollyPro.menu.calcBetweenClones.angleDifference':
          '角度差(带符号)',
        'witCat.dollyPro.menu.calcBetweenClones.direction': '方向',
        'witCat.dollyPro.menu.calcBetweenClones.distance': '距离',
        'witCat.dollyPro.menu.cloneProperty.IDList': 'ID列表',
        'witCat.dollyPro.menu.cloneProperty.allSprite': '所有角色',
        'witCat.dollyPro.menu.cloneProperty.anySprite': '任意角色',
        'witCat.dollyPro.menu.cloneProperty.count': '数量',
        'witCat.dollyPro.menu.cloneProperty.json': 'JSON',
        'witCat.dollyPro.menu.cloneProperty.myself': '自己',
        'witCat.dollyPro.menu.dataop.change': '增加',
        'witCat.dollyPro.menu.dataop.set': '设为',
        'witCat.dollyPro.menu.listop.insert': '插入',
        'witCat.dollyPro.menu.listop.replace': '覆盖',
        'witCat.dollyPro.menu.miton.PointAt': '面向',
        'witCat.dollyPro.menu.miton.moveSteps': '移动步数',
        'witCat.dollyPro.menu.miton.moveTo': '移到',
        'witCat.dollyPro.menu.miton.rotateDegrees': '旋转角度',
        'witCat.dollyPro.menu.oneOrAll.all': '所有',
        'witCat.dollyPro.menu.oneOrAll.one': '一个',
        'witCat.dollyPro.menu.spriteProperty._size': '大小',
        'witCat.dollyPro.menu.spriteProperty._visible': '显示?',
        'witCat.dollyPro.menu.spriteProperty._x': 'x 坐标',
        'witCat.dollyPro.menu.spriteProperty._y': 'y 坐标',
        'witCat.dollyPro.menu.spriteProperty.currentCostume': '造型编号',
        'witCat.dollyPro.menu.spriteProperty.currentCostumeName': '造型名',
        'witCat.dollyPro.menu.spriteProperty.direction': '方向',
        'witCat.dollyPro.menu.spriteProperty.id': 'ID',
        'witCat.dollyPro.menu.spriteProperty.name': '角色名',
        'witCat.dollyPro.menu.spriteProperty.dataJSON': '附带数据JSON',
        'witCat.dollyPro.menu.spriteProperty.extraDataObj': '🗄️数据对象',
        'witCat.dollyPro.menu.targetType.ID': 'ID为',
        'witCat.dollyPro.menu.targetType.group': '分组',
        'witCat.dollyPro.menu.targetType.sprite': '角色',
        'witCat.dollyPro.menu.type.clone': '克隆体',
        'witCat.dollyPro.menu.type.original': '角色本体',
        'witCat.dollyPro.menu.color': '颜色特效',
        'witCat.dollyPro.menu.fisheye': '鱼眼特效',
        'witCat.dollyPro.menu.whirl': '旋涡特效',
        'witCat.dollyPro.menu.pixelate': '像素化特效',
        'witCat.dollyPro.menu.mosaic': '马赛克特效',
        'witCat.dollyPro.menu.brightness': '亮度特效',
        'witCat.dollyPro.menu.ghost': '虚像特效',

        'witCat.dollyPro.block.setCloneProperty':
          '克隆体[ID]的[PROPERTY][OP][VALUE]',
      },
      en: {
        'witCat.dollyPro.name': 'Dolly Pro',
        'witCat.dollyPro.urlButton': '📖 Tutorial',
        'witCat.dollyPro.url': 'https://learn.ccw.site/article/',
        'witCat.dollyPro.tag.utils': '🔧 Common Tools',
        'witCat.dollyPro.tag.event': '🔔 Event',
        'witCat.dollyPro.tag.cloneAndDelete': '🪄 Clone and Delete',
        'witCat.dollyPro.tag.data': '📄 Data Access',
        'witCat.dollyPro.tag.group': '📁 Clone Groups',
        'witCat.dollyPro.tag.motion': '🚶 Motion',
        'witCat.dollyPro.tag.sensing': '🔍 Sensing',
        'witCat.dollyPro.tag.test': '🚧 Experimental Blocks',
        'witCat.dollyPro.button.showBlock': 'show other blocks',
        'witCat.dollyPro.button.hideBlock': 'hide other blocks',

        'witCat.dollyPro.warn.newIDIsOldID':
          'The modified sprite ID is already "%s"!',
        'witCat.dollyPro.warn.repetitveID':
          'There is already a clone or sprite with ID "%s", please do not set the same ID!',
        'witCat.dollyPro.error.repetitiveID':
          'There is already a clone with the ID "%s". Please do not use the same ID when cloning!',
        'witCat.dollyPro.config.tip':
          'Configuration for Arkos Extension(Inspired by TurboWarp)\nYou can move, resize, and minimize this comment, but better not edit it by hand. This comment can be deleted to remove the stored settings.',

        'witCat.dollyPro.confirm.showBlock?':
          'To avoid clutter, some infrequently used blocks are hidden.\nDo you want to show hidden blocks?',
        'witCat.dollyPro.block.addOrRemoveIDFromGroup':
          'clone [ID] [OP] group [GROUP] ',
        'witCat.dollyPro.block.pickTarget': 'ID of the top-most at x:[X]y:[Y]',
        'witCat.dollyPro.block.addOrRemoveMyselfFromGroup':
          'myself [OP] group [GROUP]',
        'witCat.dollyPro.menu.addOrRemove.add': 'add to',
        'witCat.dollyPro.menu.addOrRemove.remove': 'remove from',
        'witCat.dollyPro.block.calcDistanceBetweenClones':
          '[MENU] from clone1[ID1] to clone2[ID2]',
        'witCat.dollyPro.menu.calcBetweenClones.direction': 'direction',
        'witCat.dollyPro.menu.calcBetweenClones.distance': 'distance',
        'witCat.dollyPro.menu.calcBetweenClones.absAngleDifference':
          'angular difference (postive)',
        'witCat.dollyPro.menu.calcBetweenClones.angleDifference':
          'angular difference (signed)',
        'witCat.dollyPro.block.calcDistanceToClone': '[MENU] to clone[ID]',
        'witCat.dollyPro.block.cancelAccessTransfer':
          'cancel the transfer of coordinate/direction data access',
        'witCat.dollyPro.block.cloneIDOfForEach': '⚠️current clone ID',
        'witCat.dollyPro.block.createCloneAndSpecifyID':
          'create clone of [TARGET] and set ID to[ID]',
        'witCat.dollyPro.block.deleteCloneByID': 'delete clone[ID]',
        'witCat.dollyPro.block.dispatchWhenCloneDeleted':
          'when clone of [TARGET] is deteted to be deleted. deletedID = [ID]',
        'witCat.dollyPro.block.dispatchWhenCloned':
          'when [TARGET] is deteted to be cloned. cloneID = [ID]',
        'witCat.dollyPro.block.forEachWithGroup':
          '⚠️for each clone in group[GROUP]',
        'witCat.dollyPro.block.getClonePropertyInGroup':
          '[PROPERTY] of #[INDEX] clone in group [GROUP]',
        'witCat.dollyPro.block.getClonePropertyWithID':
          '[PROPERTY] of clone[ID]',
        'witCat.dollyPro.block.getCloneTargetPropertyWithSpriteName':
          'clone [PROPERTY] of [TARGET]',
        'witCat.dollyPro.block.getGroupInfo':
          '[PROPERTY] of clones in group [GROUP]',
        'witCat.dollyPro.block.getJustCreatedCloneID':
          'just created clone\'s ID',
        'witCat.dollyPro.block.getMyProperty': 'my [PROPERTY]',
        'witCat.dollyPro.block.getMyValueByKey': 'my[KEY]',
        'witCat.dollyPro.block.getNearestClone':
          'get [TYPE] clone\'s ID[MENU][VALUE]',
        'witCat.dollyPro.menu.nearest': 'nearest',
        'witCat.dollyPro.menu.farthest': 'farthest',
        'witCat.dollyPro.menu.targetType.ID': 'with ID',
        'witCat.dollyPro.menu.targetType.group': 'in group',
        'witCat.dollyPro.menu.targetType.sprite': 'of sprite',
        'witCat.dollyPro.block.getOriginalTargetPropertyWithSpriteName':
          '[PROPERTY] of [TARGET]',
        'witCat.dollyPro.block.getTouchingID':
          '[TYPE][MENU][VALUE]I\'m touching',
        'witCat.dollyPro.menu.oneOrAll.all': 'IDs of all clones',
        'witCat.dollyPro.menu.oneOrAll.one': 'ID of one clone',
        'witCat.dollyPro.block.getValueOfCloneIDWithKey': '[KEY]of clone[ID]',
        'witCat.dollyPro.block.ifCloneExists': 'clone[ID]exists?',
        'witCat.dollyPro.block.ifCloneInGroup':
          'clone [ID] belongs to group[GROUP]?',
        'witCat.dollyPro.block.importGroupIntoList':
          '[OP]list[LIST]with IDs of clones in group[GROUP]',
        'witCat.dollyPro.menu.listop.insert': 'insert',
        'witCat.dollyPro.menu.listop.replace': 'replace',
        'witCat.dollyPro.block.importTouchingIDsIntoList':
          '[OP]list[LIST]with IDs of clones[MENU][VALUE]I\'m touching',
        'witCat.dollyPro.block.initTheClone': 'before I start as a clone',
        'witCat.dollyPro.block.beforeDeletionOfTheClone':
          'before I\'m deleted as a clone',
        'witCat.dollyPro.block.isCloneOrIsOriginal': 'am I [TYPE]?',
        'witCat.dollyPro.menu.type.clone': 'a clone',
        'witCat.dollyPro.menu.type.original': 'the original sprite',
        'witCat.dollyPro.block.isCloneTouchingCoord':
          'clone[MENU][VALUE]touching x:[X]y:[Y]?',
        'witCat.dollyPro.block.isTouchingClone':
          'touching a clone[MENU][VALUE]',
        'witCat.dollyPro.block.isCloneTouchingClone':
          'clone[ID]touching a clone[MENU][VALUE]',
        'witCat.dollyPro.block.moveStepsToClone':
          '[MOTION][VALUE]towards clone[ID]',
        'witCat.dollyPro.menu.miton.moveSteps': 'move steps',
        'witCat.dollyPro.menu.miton.rotateDegrees': 'turn degrees',
        'witCat.dollyPro.block.moveToClone': '[MOTION]clone[ID]',
        'witCat.dollyPro.menu.miton.PointAt': 'point towards',
        'witCat.dollyPro.menu.miton.moveTo': 'go to',
        'witCat.dollyPro.block.presetDataforTheNextCloneInJSONFormat':
          'preset data of the next clone as JSON[DATA_JSON]',
        'witCat.dollyPro.block.presetGroupForTheNextClone':
          'preset the group to join for the next clone[GROUP]',
        'witCat.dollyPro.block.presetPropertyForTheNextClone':
          'preset [PROPERTY] of the next clone to[VALUE]',
        'witCat.dollyPro.block.presetSingleDataForTheNextClone':
          'preset [KEY] of the next clone to [VALUE]',
        'witCat.dollyPro.block.setMyID': '⚠️modify my ID to[ID]',
        'witCat.dollyPro.block.setOrChangeMyValueWithKey': 'my[KEY][OP][VALUE]',
        'witCat.dollyPro.block.setOrChangeValueOfCloneIDWithKey':
          '[KEY]of clone[ID][OP][VALUE]',
        'witCat.dollyPro.menu.dataop.change': 'change by',
        'witCat.dollyPro.menu.dataop.set': 'set to',
        'witCat.dollyPro.block.transferAccessToTargetXYToDollyDataKey':
          'transfer access to sprite coordinates and direction in the extension to the following key data: [X_NAME], [Y_NAME], [DIR_NAME] (optional)',
        'witCat.dollyPro.defaultValue.HP': 'health point',
        'witCat.dollyPro.defaultValue.direction': 'direction',
        'witCat.dollyPro.defaultValue.enemy': 'enemy',
        'witCat.dollyPro.defaultValue.player': 'ID',
        'witCat.dollyPro.defaultValue.presetJSON':
          '\'{"name":"common soldier ","HP":100,"team":"red"}\'',
        'witCat.dollyPro.menu.cloneProperty.IDList': 'lists',
        'witCat.dollyPro.menu.cloneProperty.allSprite': 'all sprites',
        'witCat.dollyPro.menu.cloneProperty.anySprite': 'any sprite',
        'witCat.dollyPro.menu.cloneProperty.count': 'count',
        'witCat.dollyPro.menu.cloneProperty.json': 'JSON',
        'witCat.dollyPro.menu.cloneProperty.myself': 'myself',
        'witCat.dollyPro.menu.spriteProperty._size': 'size',
        'witCat.dollyPro.menu.spriteProperty._visible': 'visible?',
        'witCat.dollyPro.menu.spriteProperty._x': 'x position',
        'witCat.dollyPro.menu.spriteProperty._y': 'y position',
        'witCat.dollyPro.menu.spriteProperty.currentCostume': 'costume number',
        'witCat.dollyPro.menu.spriteProperty.currentCostumeName':
          'costume name',
        'witCat.dollyPro.menu.spriteProperty.direction': 'direction',
        'witCat.dollyPro.menu.spriteProperty.id': 'ID',
        'witCat.dollyPro.menu.spriteProperty.name': 'sprite name',
        'witCat.dollyPro.menu.spriteProperty.dataJSON': 'data in JSON format',
        'witCat.dollyPro.menu.spriteProperty.extraDataObj': '🗄️data object',
        'witCat.dollyPro.menu.color': 'color effect',
        'witCat.dollyPro.menu.fisheye': 'fisheye effect',
        'witCat.dollyPro.menu.whirl': 'whirl effect',
        'witCat.dollyPro.menu.pixelate': 'pixelate effect',
        'witCat.dollyPro.menu.mosaic': 'mosaic effect',
        'witCat.dollyPro.menu.brightness': 'brightness effect',
        'witCat.dollyPro.menu.ghost': 'ghost effect',

        'witCat.dollyPro.block.broadcastToClone':
          'send private message[MSG] to clone[MENU][VALUE], with data[data]',
        'witCat.dollyPro.block.receiveMyBroadcast':
          'when I receive private message[MSG] for me. data=[data]，senderID=[senderID]',
        'witCat.dollyPro.defaultValue.MSGName': 'message1',
        'witCat.dollyPro.defaultValue.MSGInfo': 'data',
        'witCat.dollyPro.block.setCloneProperty':
          '[PROPERTY]of clone[ID][OP][VALUE]',
      },
    });
  }

  formatMessage(id) {
    const newid = `witCat.dollyPro.${id}`;
    return this.fm({
      newid,
      default: newid,
      description: newid,
    });
  }

  getHats() {
    return {
      [`${extensionId}_dispatchWhenCloned`]: {},
      [`${extensionId}_dispatchWhenCloneDeleted`]: {},
      [`${extensionId}_initTheClone`]: {},
      [`${extensionId}_beforeDeletionOfTheClone`]: {},
      [`${extensionId}_receiveMyBroadcast`]: {},
    };
  }

  getInfo() {
    return {
      id: extensionId,
      name: this.formatMessage('name'),
      menuIconURI: icon,
      blockIconURI: icon,
      color1: '#FF9922',
      docsURI: this.formatMessage('url'),
      blocks: [
        // 按钮：显示不常用积木
        {
          blockType: 'button',
          hideFromPalette: !this.hideExtraBlocks,
          text: this.formatMessage('button.showBlock'),
          onClick: () => {
            // eslint-disable-next-line no-restricted-globals
            if (confirm(this.formatMessage('confirm.showBlock?'))) {
              this.hideExtraBlocks = false;
              this.storeExtConfig();
              this.runtime.emit('TOOLBOX_EXTENSIONS_NEED_UPDATE');
            }
          },
        },
        // 按钮：隐藏不常用积木
        {
          blockType: 'button',
          text: this.formatMessage('button.hideBlock'),
          hideFromPalette: this.hideExtraBlocks,
          onClick: () => {
            this.hideExtraBlocks = true;
            this.storeExtConfig();
            this.runtime.emit('TOOLBOX_EXTENSIONS_NEED_UPDATE');
          },
        },
        `---${this.formatMessage('tag.utils')}`,
        // 判断我是克隆体/本体吗
        {
          opcode: 'isCloneOrIsOriginal',
          blockType: BlockType.BOOLEAN,
          filter: [TargetType.SPRITE],
          text: this.formatMessage('block.isCloneOrIsOriginal'),
          arguments: {
            TYPE: {
              type: ArgumentType.STRING,
              menu: 'CLONE_OR_ORIGINAL_MENU',
            },
          },
        },
        // （旧积木：参数无法塞入圆形积木）获取角色的克隆体数量/ID表
        {
          opcode: 'getCloneTargetPropertyWithSpriteName',
          blockType: BlockType.REPORTER,
          hideFromPalette: true,
          text: this.formatMessage(
            'block.getCloneTargetPropertyWithSpriteName',
          ),
          arguments: {
            TARGET: {
              type: ArgumentType.STRING,
              menu: 'SPRITE_MENU_WITH_ALL',
            },
            PROPERTY: {
              type: ArgumentType.STRING,
              menu: 'CLONE_PROPERTY',
            },
          },
        },
        // （新积木：参数可以塞入圆形积木）获取角色的克隆体数量/ID表
        {
          opcode: 'getCloneTargetPropertyWithSpriteName2',
          blockType: BlockType.REPORTER,
          text: this.formatMessage(
            'block.getCloneTargetPropertyWithSpriteName',
          ),
          arguments: {
            TARGET: {
              type: ArgumentType.STRING,
              menu: 'NEW_SPRITE_MENU_WITH_ALL',
            },
            PROPERTY: {
              type: ArgumentType.STRING,
              menu: 'CLONE_PROPERTY',
            },
          },
        },
        // （旧积木：参数无法塞入圆形积木）获取角色ID等信息
        {
          opcode: 'getOriginalTargetPropertyWithSpriteName',
          blockType: BlockType.REPORTER,
          disableMonitor: true,
          hideFromPalette: true,
          text: this.formatMessage(
            'block.getOriginalTargetPropertyWithSpriteName',
          ),
          arguments: {
            TARGET: {
              type: ArgumentType.STRING,
              menu: 'SPRITE_MENU',
            },
            PROPERTY: {
              type: ArgumentType.STRING,
              menu: 'SPRITE_PROPERTY',
            },
          },
        },
        // （新积木：参数可以塞入圆形积木）获取角色ID等信息
        {
          opcode: 'getOriginalTargetPropertyWithSpriteName2',
          blockType: BlockType.REPORTER,
          disableMonitor: true,
          text: this.formatMessage(
            'block.getOriginalTargetPropertyWithSpriteName',
          ),
          arguments: {
            TARGET: {
              type: ArgumentType.STRING,
              menu: 'NEW_SPRITE_MENU',
            },
            PROPERTY: {
              type: ArgumentType.STRING,
              menu: 'SPRITE_PROPERTY',
            },
          },
        },
        `---${this.formatMessage('tag.event')}`,
        // 克隆体启动前执行的动作
        {
          blockType: BlockType.EVENT,
          opcode: 'initTheClone',
          filter: [TargetType.SPRITE],
          hideFromPalette: this.hideExtraBlocks,
          text: this.formatMessage('block.initTheClone'),
          isEdgeActivated: false,
        },
        // 克隆体删除前执行动作
        {
          blockType: BlockType.EVENT,
          opcode: 'beforeDeletionOfTheClone',
          filter: [TargetType.SPRITE],
          hideFromPalette: this.hideExtraBlocks,
          text: this.formatMessage('block.beforeDeletionOfTheClone'),
          isEdgeActivated: false,
        },
        // 当有克隆体被克隆
        {
          opcode: 'dispatchWhenCloned',
          blockType: BlockType.HAT,
          isEdgeActivated: false,
          hideFromPalette: this.hideExtraBlocks,
          text: this.formatMessage('block.dispatchWhenCloned'),
          arguments: {
            TARGET: {
              type: ArgumentType.STRING,
              menu: 'SPRITE_MENU_WITH_ANY',
            },
            ID: {
              type: 'ccw_hat_parameter',
            },
          },
        },
        // 当有克隆体被删除
        {
          opcode: 'dispatchWhenCloneDeleted',
          blockType: BlockType.HAT,
          isEdgeActivated: false,
          hideFromPalette: this.hideExtraBlocks,
          text: this.formatMessage('block.dispatchWhenCloneDeleted'),
          arguments: {
            TARGET: {
              type: ArgumentType.STRING,
              menu: 'SPRITE_MENU_WITH_ANY',
            },
            ID: {
              type: 'ccw_hat_parameter',
            },
          },
        },
        // 朝特定克隆体广播
        {
          opcode: 'broadcastToClone',
          blockType: BlockType.COMMAND,
          filter: [TargetType.SPRITE],
          text: this.formatMessage('block.broadcastToClone'),
          arguments: {
            MENU: {
              type: ArgumentType.STRING,
              menu: 'SPRITE_OR_GROUP_OR_ID_MENU',
            },
            VALUE: {
              type: ArgumentType.STRING,
              defaultValue: 'ID', // this.formatMessage('defaultValue.enemy'),
            },
            MSG: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.MSGName'),
            },
            data: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.MSGInfo'),
            },
          },
        },
        // 当我收到私有广播
        {
          opcode: 'receiveMyBroadcast',
          blockType: BlockType.HAT,
          isEdgeActivated: false,
          shouldRestartExistingThreads: false,
          text: this.formatMessage('block.receiveMyBroadcast'),
          arguments: {
            MSG: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.MSGName'),
            },
            data: {
              type: 'ccw_hat_parameter',
            },
            senderID: {
              type: 'ccw_hat_parameter',
            },
          },
        },
        `---${this.formatMessage('tag.cloneAndDelete')}`,
        // 预设克隆体 x/y/方向...
        {
          opcode: 'presetPropertyForTheNextClone',
          blockType: BlockType.COMMAND,
          text: this.formatMessage('block.presetPropertyForTheNextClone'),
          arguments: {
            PROPERTY: {
              type: ArgumentType.STRING,
              menu: 'PRESET_PROPERTY',
              defaultValue: 'x',
            },
            VALUE: {
              type: ArgumentType.STRING,
              defaultValue: '30',
            },
          },
        },
        // 预设克隆体单条key数据
        {
          opcode: 'presetSingleDataForTheNextClone',
          blockType: BlockType.COMMAND,
          text: this.formatMessage('block.presetSingleDataForTheNextClone'),
          arguments: {
            KEY: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.HP'),
            },
            VALUE: {
              type: ArgumentType.STRING,
              defaultValue: '100',
            },
          },
        }, // 预设克隆体数据JSON
        {
          opcode: 'presetDataforTheNextCloneInJSONFormat',
          blockType: BlockType.COMMAND,
          hideFromPalette: this.hideExtraBlocks,
          text: this.formatMessage(
            'block.presetDataforTheNextCloneInJSONFormat',
          ),
          arguments: {
            DATA_JSON: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.presetJSON'),
            },
          },
        },
        // 预设克隆体分组
        {
          opcode: 'presetGroupForTheNextClone',
          blockType: BlockType.COMMAND,
          // hideFromPalette: this.hideExtraBlocks,
          text: this.formatMessage('block.presetGroupForTheNextClone'),
          arguments: {
            GROUP: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.enemy'),
            },
          },
        },
        '---',
        // 克隆并指定ID
        {
          opcode: 'createCloneAndSpecifyID',
          blockType: BlockType.COMMAND,
          text: this.formatMessage('block.createCloneAndSpecifyID'),
          arguments: {
            TARGET: {
              type: ArgumentType.STRING,
              menu: 'SPRITE_MENU_WITH_MYSELF',
            },
            ID: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.player'),
            },
          },
        },
        // 获取刚刚产生的克隆体的ID
        {
          opcode: 'getJustCreatedCloneID',
          blockType: BlockType.REPORTER,
          disableMonitor: true,
          text: this.formatMessage('block.getJustCreatedCloneID'),
        },
        {
          opcode: 'deleteCloneByID',
          blockType: BlockType.COMMAND,
          text: this.formatMessage('block.deleteCloneByID'),
          arguments: {
            ID: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.player'),
            },
          },
        },
        // 克隆体存在？
        {
          opcode: 'ifCloneExists',
          blockType: BlockType.BOOLEAN,
          text: this.formatMessage('block.ifCloneExists'),
          arguments: {
            ID: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.player'),
            },
          },
        },
        `---${this.formatMessage('tag.data')}`,
        // 读取我的信息：ID/x坐标/y坐标...
        {
          opcode: 'getMyProperty',
          blockType: BlockType.REPORTER,
          disableMonitor: true,
          text: this.formatMessage('block.getMyProperty'),
          arguments: {
            PROPERTY: {
              type: ArgumentType.STRING,
              menu: 'SPRITE_PROPERTY',
            },
          },
        },
        // 读取我的多莉Key数据
        {
          opcode: 'getMyValueByKey',
          blockType: BlockType.REPORTER,
          text: this.formatMessage('block.getMyValueByKey'),
          arguments: {
            KEY: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.HP'),
            },
          },
        },
        // 设置我的多莉Key数据
        {
          opcode: 'setOrChangeMyValueWithKey',
          blockType: BlockType.COMMAND,
          text: this.formatMessage('block.setOrChangeMyValueWithKey'),
          arguments: {
            KEY: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.HP'),
            },
            OP: {
              type: ArgumentType.STRING,
              menu: 'DATA_OPEATION_MENU',
            },
            VALUE: {
              type: ArgumentType.STRING,
              defaultValue: '100',
            },
          },
        },
        '---',
        // 读取克隆体的信息：ID/x坐标/y坐标...
        {
          opcode: 'getClonePropertyWithID',
          blockType: BlockType.REPORTER,
          text: this.formatMessage('block.getClonePropertyWithID'),
          arguments: {
            ID: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.player'),
            },
            PROPERTY: {
              type: ArgumentType.STRING,
              menu: 'SPRITE_PROPERTY',
              defaultValue: '_x',
            },
          },
        },
        // 读取克隆体的多莉Key数据
        {
          opcode: 'getValueOfCloneIDWithKey',
          blockType: BlockType.REPORTER,
          text: this.formatMessage('block.getValueOfCloneIDWithKey'),
          arguments: {
            ID: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.player'),
            },
            KEY: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.HP'),
            },
          },
        },
        // 设置克隆体的多莉Key数据
        {
          opcode: 'setOrChangeValueOfCloneIDWithKey',
          blockType: BlockType.COMMAND,
          text: this.formatMessage('block.setOrChangeValueOfCloneIDWithKey'),
          arguments: {
            ID: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.player'),
            },
            KEY: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.HP'),
            },
            OP: {
              type: ArgumentType.STRING,
              menu: 'DATA_OPEATION_MENU',
            },
            VALUE: {
              type: ArgumentType.STRING,
              defaultValue: '100',
            },
          },
        },
        // 设置克隆体的property
        {
          opcode: 'setCloneProperty',
          blockType: BlockType.COMMAND,
          text: this.formatMessage('block.setCloneProperty'),
          hideFromPalette: this.hideExtraBlocks,
          arguments: {
            ID: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.player'),
            },
            PROPERTY: {
              type: ArgumentType.STRING,
              menu: 'PRESET_PROPERTY',
            },
            OP: {
              type: ArgumentType.STRING,
              menu: 'DATA_OPEATION_MENU',
            },
            VALUE: {
              type: ArgumentType.STRING,
              defaultValue: '100',
            },
          },
        },
        `---${this.formatMessage('tag.group')}`,
        // 将我加入/移出分组
        {
          opcode: 'addOrRemoveMyselfFromGroup',
          blockType: BlockType.COMMAND,
          filter: [TargetType.SPRITE],
          text: this.formatMessage('block.addOrRemoveMyselfFromGroup'),
          arguments: {
            OP: {
              type: ArgumentType.STRING,
              menu: 'ADD_OR_REMOVE',
            },
            GROUP: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.enemy'),
            },
          },
        },
        // 将克隆体加入/移出分组
        {
          opcode: 'addOrRemoveIDFromGroup',
          blockType: BlockType.COMMAND,
          text: this.formatMessage('block.addOrRemoveIDFromGroup'),
          arguments: {
            ID: {
              type: ArgumentType.STRING,
              defaultValue: 'ID',
            },
            OP: {
              type: ArgumentType.STRING,
              menu: 'ADD_OR_REMOVE',
            },
            GROUP: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.enemy'),
            },
          },
        },
        // 克隆体在分组里吗？
        {
          opcode: 'ifCloneInGroup',
          blockType: BlockType.BOOLEAN,
          text: this.formatMessage('block.ifCloneInGroup'),
          arguments: {
            ID: {
              type: ArgumentType.STRING,
              defaultValue: 'ID',
            },
            GROUP: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.enemy'),
            },
          },
        },
        '---',
        // 获取分组信息：克隆体数/ID表
        {
          opcode: 'getGroupInfo',
          blockType: BlockType.REPORTER,
          text: this.formatMessage('block.getGroupInfo'),
          arguments: {
            GROUP: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.enemy'),
            },
            PROPERTY: {
              type: ArgumentType.STRING,
              menu: 'CLONE_PROPERTY',
            },
          },
        },
        // 获取分组中克隆体的ID/x/y/...
        {
          opcode: 'getClonePropertyInGroup',
          blockType: BlockType.REPORTER,
          text: this.formatMessage('block.getClonePropertyInGroup'),
          arguments: {
            GROUP: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.enemy'),
            },
            INDEX: {
              type: ArgumentType.NUMBER,
              defaultValue: 1,
            },
            PROPERTY: {
              type: ArgumentType.STRING,
              menu: 'SPRITE_PROPERTY',
            },
          },
        },
        // 将分组中，克隆体的ID列表导入原版列表
        {
          opcode: 'importGroupIntoList',
          blockType: BlockType.COMMAND,
          text: this.formatMessage('block.importGroupIntoList'),
          arguments: {
            GROUP: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.enemy'),
            },
            OP: {
              type: ArgumentType.STRING,
              menu: 'LIST_OP_MENU',
            },
            LIST: {
              type: ArgumentType.STRING,
              menu: 'LIST_MENU',
            },
          },
        },
        // 遍历分组的每个克隆体
        {
          opcode: 'forEachWithGroup',
          blockType: BlockType.CONDITIONAL,
          text: [this.formatMessage('block.forEachWithGroup')],
          branchCount: 1,
          hideFromPalette: this.hideExtraBlocks,
          arguments: {
            GROUP: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.enemy'),
            },
          },
        },
        // 当前遍历的克隆体ID
        {
          opcode: 'cloneIDOfForEach',
          blockType: BlockType.REPORTER,
          hideFromPalette: this.hideExtraBlocks,
          text: this.formatMessage('block.cloneIDOfForEach'),
          disableMonitor: true,
        },
        `---${this.formatMessage('tag.sensing')}`,
        // 获取分组..中最近克隆体ID
        {
          opcode: 'getNearestClone',
          blockType: BlockType.REPORTER,
          filter: [TargetType.SPRITE],
          text: this.formatMessage('block.getNearestClone'),
          arguments: {
            TYPE: {
              type: ArgumentType.STRING,
              menu: 'NEAREST_OR_FARTHEST',
            },
            MENU: {
              type: ArgumentType.STRING,
              menu: 'SPRITE_OR_GROUP_MENU',
            },
            VALUE: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.enemy'),
            },
          },
        },
        // 判断是否碰到克隆体
        {
          opcode: 'isTouchingClone',
          blockType: BlockType.BOOLEAN,
          filter: [TargetType.SPRITE],
          text: this.formatMessage('block.isTouchingClone'),
          arguments: {
            ID: {
              type: ArgumentType.STRING,
              defaultValue: 'ID',
            },
            MENU: {
              type: ArgumentType.STRING,
              menu: 'SPRITE_OR_GROUP_OR_ID_MENU',
            },
            VALUE: {
              type: ArgumentType.STRING,
              defaultValue: 'ID', // this.formatMessage('defaultValue.enemy'),
            },
          },
        },
        // 克隆体是否碰到克隆体
        {
          opcode: 'isCloneTouchingClone',
          blockType: BlockType.BOOLEAN,
          text: this.formatMessage('block.isCloneTouchingClone'),
          hideFromPalette: this.hideExtraBlocks,
          arguments: {
            ID: {
              type: ArgumentType.STRING,
              defaultValue: 'ID',
            },
            MENU: {
              type: ArgumentType.STRING,
              menu: 'SPRITE_OR_GROUP_OR_ID_MENU',
            },
            VALUE: {
              type: ArgumentType.STRING,
              defaultValue: 'ID2', // this.formatMessage('defaultValue.enemy'),
            },
          },
        },
        // 获取碰到的克隆体ID
        {
          opcode: 'getTouchingID',
          blockType: BlockType.REPORTER,
          filter: [TargetType.SPRITE],
          text: this.formatMessage('block.getTouchingID'),
          arguments: {
            MENU: {
              type: ArgumentType.STRING,
              menu: 'SPRITE_OR_GROUP_MENU',
            },
            VALUE: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.enemy'),
            },
            TYPE: {
              type: ArgumentType.STRING,
              menu: 'ONE_OR_ALL_MENU',
            },
          },
        },
        // 将碰到的克隆体ID导入列表
        {
          opcode: 'importTouchingIDsIntoList',
          blockType: BlockType.COMMAND,
          filter: [TargetType.SPRITE],
          text: this.formatMessage('block.importTouchingIDsIntoList'),
          arguments: {
            MENU: {
              type: ArgumentType.STRING,
              menu: 'SPRITE_OR_GROUP_MENU',
            },
            VALUE: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.enemy'),
            },
            OP: {
              type: ArgumentType.STRING,
              menu: 'LIST_OP_MENU',
            },
            LIST: {
              type: ArgumentType.STRING,
              menu: 'LIST_MENU',
            },
          },
        },
        // 判断克隆体是否碰到点xy
        {
          opcode: 'isCloneTouchingCoord',
          blockType: BlockType.BOOLEAN,
          hideFromPalette: this.hideExtraBlocks,
          text: this.formatMessage('block.isCloneTouchingCoord'),
          arguments: {
            X: {
              type: ArgumentType.NUMBER,
              defaultValue: 114,
            },
            Y: {
              type: ArgumentType.NUMBER,
              defaultValue: 514,
            },
            MENU: {
              type: ArgumentType.STRING,
              menu: 'SPRITE_OR_GROUP_OR_ID_MENU',
            },
            VALUE: {
              type: ArgumentType.STRING,
              defaultValue: 'ID', // this.formatMessage('defaultValue.enemy'),
            },
          },
        },
        // 点xy最顶层的克隆体/角色ID
        {
          opcode: 'pickTarget',
          blockType: BlockType.REPORTER,
          hideFromPalette: this.hideExtraBlocks,
          text: this.formatMessage('block.pickTarget'),
          arguments: {
            X: {
              type: ArgumentType.NUMBER,
              defaultValue: 114,
            },
            Y: {
              type: ArgumentType.NUMBER,
              defaultValue: 514,
            },
          },
        },
        `---${this.formatMessage('tag.motion')}`,
        // 计算我到克隆体..的距离/方向/角度差/..
        {
          opcode: 'calcDistanceToClone',
          blockType: BlockType.REPORTER,
          filter: [TargetType.SPRITE],
          text: this.formatMessage('block.calcDistanceToClone'),
          arguments: {
            ID: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.player'),
            },
            MENU: {
              type: ArgumentType.STRING,
              menu: 'CALC_DIS_OR_DIR_MENU',
            },
          },
        },
        // 计算克隆体1到克隆体2的距离/方向/角度差/..
        {
          opcode: 'calcDistanceBetweenClones',
          blockType: BlockType.REPORTER,
          text: this.formatMessage('block.calcDistanceBetweenClones'),
          arguments: {
            ID1: {
              type: ArgumentType.STRING,
              defaultValue: 'ID', // this.formatMessage('defaultValue.player'),
            },
            ID2: {
              type: ArgumentType.STRING,
              defaultValue: 'ID2', // this.formatMessage('defaultValue.enemy'),
            },
            MENU: {
              type: ArgumentType.STRING,
              menu: 'CALC_DIS_OR_DIR_MENU',
            },
          },
        },
        // 移到/面向克隆体
        {
          opcode: 'moveToClone',
          blockType: BlockType.COMMAND,
          filter: [TargetType.SPRITE],
          text: this.formatMessage('block.moveToClone'),
          arguments: {
            MOTION: {
              type: ArgumentType.STRING,
              menu: 'MOVE_TO_OR_POINT_AT',
            },
            ID: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.player'),
            },
          },
        },
        // 朝克隆体移动/旋转
        {
          opcode: 'moveStepsToClone',
          blockType: BlockType.COMMAND,
          filter: [TargetType.SPRITE],
          text: this.formatMessage('block.moveStepsToClone'),
          arguments: {
            ID: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.player'),
            },
            MOTION: {
              type: ArgumentType.STRING,
              menu: 'MOVE_OR_ROTATE',
            },
            VALUE: {
              type: ArgumentType.NUMBER,
              defaultValue: 10,
            },
          },
        },
        ...(this.hideExtraBlocks
          ? []
          : [`---${this.formatMessage('tag.test')}`]),
        // 修改我的ID
        {
          opcode: 'setMyID',
          blockType: BlockType.COMMAND,
          hideFromPalette: this.hideExtraBlocks,
          text: this.formatMessage('block.setMyID'),
          arguments: {
            ID: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.player'),
            },
          },
        },
        // 转移x/y/方向的访问
        {
          opcode: 'transferAccessToTargetXYToDollyDataKey',
          blockType: BlockType.COMMAND,
          hideFromPalette: this.hideExtraBlocks,
          text: this.formatMessage(
            'block.transferAccessToTargetXYToDollyDataKey',
          ),
          arguments: {
            X_NAME: {
              type: ArgumentType.STRING,
              defaultValue: 'x',
            },
            Y_NAME: {
              type: ArgumentType.STRING,
              defaultValue: 'y',
            },
            DIR_NAME: {
              type: ArgumentType.STRING,
              defaultValue: this.formatMessage('defaultValue.direction'),
            },
          },
        },
        // 取消x/y/方向的访问转移
        {
          opcode: 'cancelAccessTransfer',
          hideFromPalette: this.hideExtraBlocks,
          blockType: BlockType.COMMAND,
          text: this.formatMessage('block.cancelAccessTransfer'),
        },
        // {
        //   opcode: 'test',
        //   blockType: BlockType.REPORTER,
        //   text: 'test ID[ID]',
        //   hideFromPalette: true,
        //   arguments: {
        //     ID: {
        //       type: ArgumentType.STRING,
        //       defaultValue: this.formatMessage('defaultValue.player'),
        //     },
        //   },
        // },
      ],
      menus: {
        NEAREST_OR_FARTHEST: {
          items: [
            {
              text: this.formatMessage('menu.nearest'),
              value: 'nearest',
            },
            {
              text: this.formatMessage('menu.farthest'),
              value: 'farthest',
            },
          ],
        },
        MOVE_OR_ROTATE: {
          items: [
            {
              text: this.formatMessage('menu.miton.rotateDegrees'),
              value: 'rotate',
            },
            {
              text: this.formatMessage('menu.miton.moveSteps'),
              value: 'move',
            },
          ],
        },
        MOVE_TO_OR_POINT_AT: {
          items: [
            {
              text: this.formatMessage('menu.miton.PointAt'),
              value: 'pointAt',
            },
            {
              text: this.formatMessage('menu.miton.moveTo'),
              value: 'moveTo',
            },
          ],
        },
        CALC_DIS_OR_DIR_MENU: {
          items: [
            {
              text: this.formatMessage('menu.calcBetweenClones.distance'),
              value: 'dis',
            },
            {
              text: this.formatMessage('menu.calcBetweenClones.direction'),
              value: 'dir',
            },
            {
              text: this.formatMessage(
                'menu.calcBetweenClones.angleDifference',
              ),
              value: 'angle',
            },
            {
              text: this.formatMessage(
                'menu.calcBetweenClones.absAngleDifference',
              ),
              value: 'absAngle',
            },
          ],
        },
        ADD_OR_REMOVE: {
          items: [
            {
              text: this.formatMessage('menu.addOrRemove.add'),
              value: 'add',
            },
            {
              text: this.formatMessage('menu.addOrRemove.remove'),
              value: 'remove',
            },
          ],
        },
        ONE_OR_ALL_MENU: {
          items: [
            {
              text: this.formatMessage('menu.oneOrAll.one'),
              value: 'one',
            },
            {
              text: this.formatMessage('menu.oneOrAll.all'),
              value: 'all',
            },
          ],
        },
        SPRITE_OR_GROUP_OR_ID_MENU: {
          items: [
            {
              text: this.formatMessage('menu.targetType.ID'),
              value: 'ID',
            },
            {
              text: this.formatMessage('menu.targetType.group'),
              value: 'group',
            },
            {
              text: this.formatMessage('menu.targetType.sprite'),
              value: 'sprite',
            },
          ],
        },
        SPRITE_OR_GROUP_MENU: {
          items: [
            {
              text: this.formatMessage('menu.targetType.group'),
              value: 'group',
            },
            {
              text: this.formatMessage('menu.targetType.sprite'),
              value: 'sprite',
            },
          ],
        },
        LIST_OP_MENU: {
          items: [
            {
              text: this.formatMessage('menu.listop.replace'),
              value: 'replace',
            },
            {
              text: this.formatMessage('menu.listop.insert'),
              value: 'insert',
            },
          ],
        },

        CLONE_OR_ORIGINAL_MENU: {
          items: [
            {
              text: this.formatMessage('menu.type.clone'),
              value: 'clone',
            },
            {
              text: this.formatMessage('menu.type.original'),
              value: 'original',
            },
          ],
        },
        DATA_OPEATION_MENU: {
          items: [
            {
              text: this.formatMessage('menu.dataop.set'),
              value: 'set',
            },
            {
              text: this.formatMessage('menu.dataop.change'),
              value: 'change',
            },
          ],
        },

        SPRITE_MENU: {
          acceptReporters: false,
          items: 'spriteMenuWithEmptyChecking',
        },
        SPRITE_MENU_WITH_ALL: {
          acceptReporters: false,
          items: 'spriteMenuWithAll',
        },
        // 这两个菜单换成可以接受reporters
        NEW_SPRITE_MENU: {
          acceptReporters: true,
          items: 'spriteMenuWithEmptyChecking',
        },
        NEW_SPRITE_MENU_WITH_ALL: {
          acceptReporters: true,
          items: 'spriteMenuWithAll',
        },

        SPRITE_MENU_WITH_ANY: {
          acceptReporters: false,
          items: 'spriteMenuWithAny',
        },
        SPRITE_MENU_WITH_MYSELF: {
          acceptReporters: true,
          items: 'spriteMenuWithMyself',
        },

        LIST_MENU: {
          acceptReporters: false,
          items: 'listMenu',
        },
        PRESET_PROPERTY: {
          acceptReporters: false,
          items: [
            {
              text: this.formatMessage('menu.spriteProperty._x'),
              value: 'x',
            },
            {
              text: this.formatMessage('menu.spriteProperty._y'),
              value: 'y',
            },
            {
              text: this.formatMessage('menu.spriteProperty._size'),
              value: 'size',
            },
            {
              text: this.formatMessage('menu.spriteProperty._visible'),
              value: 'visible',
            },
            {
              text: this.formatMessage('menu.spriteProperty.direction'),
              value: 'direction',
            },
            {
              text: this.formatMessage(
                'menu.spriteProperty.currentCostumeName',
              ),
              value: 'currentCostumeName',
            },
            {
              text: this.formatMessage('menu.color'),
              value: 'color',
            },
            {
              text: this.formatMessage('menu.fisheye'),
              value: 'fisheye',
            },
            {
              text: this.formatMessage('menu.whirl'),
              value: 'whirl',
            },
            {
              text: this.formatMessage('menu.pixelate'),
              value: 'pixelate',
            },
            {
              text: this.formatMessage('menu.mosaic'),
              value: 'mosaic',
            },
            {
              text: this.formatMessage('menu.brightness'),
              value: 'brightness',
            },
            {
              text: this.formatMessage('menu.ghost'),
              value: 'ghost',
            },
          ],
        },
        SPRITE_PROPERTY: {
          items: 'spritePropertiesMenu',
        },
        CLONE_PROPERTY: {
          items: [
            {
              text: this.formatMessage('menu.cloneProperty.count'),
              value: 'count',
            },
            // {
            //   text: this.formatMessage('menu.cloneProperty.json'),
            //   value: 'json',
            // },
            {
              text: this.formatMessage('menu.cloneProperty.IDList'),
              value: 'IDList',
            },
          ],
        },
      },
    };
  }

  // ******************** ↓扩展配置读取&保存（参考了 tw 的通过注释来保存配置） ********************

  /** 查找扩展配置的注释（在舞台区） */
  findExtConfigComment() {
    const stage = this.runtime.getTargetForStage();
    if (!stage || !stage.comments) return undefined;
    return stage.comments[EXT_CONFIG_COMMENT_ID];
  }

  /**
   * 从注释获取所有扩展配置
   * @returns  {{[extensionId: string]:object}}  {扩展1:...扩展2:...}
   */
  getAllExtConfig() {
    const comment = this.findExtConfigComment();
    if (!comment) return undefined;
    const lines = comment.text.split('\n');
    if (lines.length === 0) {
      console.warn(
        `${extensionId}: Extension config comment does not contain valid line.`,
      );
      return undefined;
    }
    // 配置信息存在最后一行
    const jsonText = lines[lines.length - 1];
    try {
      const parsed = JSON.parse(jsonText);
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Invalid object');
      }
      return parsed;
    } catch (e) {
      console.warn(`${extensionId}: Config comment has invalid JSON`, e);
      return undefined;
    }
  }

  /** 从舞台注释应用扩展配置
   * @returns {boolean} 是否成功
   */
  parseExtConfig() {
    let config = this.getAllExtConfig();
    if (!config) return false;
    config = config[extensionId];
    if (!config) return false;
    if ('hideExtraBlocks' in config) {
      this.hideExtraBlocks = Cast.toBoolean(config.hideExtraBlocks);
      this.runtime.emit('TOOLBOX_EXTENSIONS_NEED_UPDATE');
    }
    return true;
  }

  /**
   * 生成当前扩展的配置
   * @returns {object} 配置信息
   */
  generateExtConfig() {
    const options = {};
    options.hideExtraBlocks = this.hideExtraBlocks;
    return options;
  }

  storeExtConfig() {
    // 设置配置
    let config = this.getAllExtConfig();
    if (!config) config = {};
    config[extensionId] = this.generateExtConfig();

    const existingComment = this.findExtConfigComment();
    if (existingComment) {
      const lines = existingComment.text.split('\n');
      if (lines.length === 0) {
        lines.push('');
      }
      // 配置信息存在最后一行
      lines[lines.length - 1] = JSON.stringify(config);
      existingComment.text = lines.join('\n');
    } else {
      const target = this.runtime.getTargetForStage();
      // TODO: smarter position logic
      const text = `${this.formatMessage('config.tip')}\n${JSON.stringify(
        config,
      )}`;
      target.createComment(
        EXT_CONFIG_COMMENT_ID,
        null,
        text,
        1,
        1,
        400,
        200,
        false,
      );
    }
    this.runtime.emitProjectChanged();
  }

  logWarn(...args) {
    (this.runtime.logSystem?.warn ?? console.warn)(` [${this.formatMessage('name')}] `, ...args);
  }

  logError(...args) {
    // 详情页不弹出警告（转Warn）
    if (this.runtime.isPlayerOnly) this.logWarn(...args);
    if (this.runtime.logSystem) {
      // error的红字看不清，还是使用warn
      this.runtime.logSystem.warn(`[${this.formatMessage('name')}]`, ...args);
      // 红底白字报错
      // this.runtime.logSystem.log(`\x1b[41;37m[${this.formatMessage('name')}]`, ...args, '\x1b[0m');
      this.runtime.logSystem.show();
    } else console.error(`${this.formatMessage('name')}: `, ...args);
  }

  // **************************** 动态菜单 ****************************

  spritePropertiesMenu() {
    const menu = [
      {
        text: this.formatMessage('menu.spriteProperty.id'),
        value: 'id',
      },
      {
        text: this.formatMessage('menu.spriteProperty._x'),
        value: '_x',
      },
      {
        text: this.formatMessage('menu.spriteProperty._y'),
        value: '_y',
      },
      {
        text: this.formatMessage('menu.spriteProperty.name'),
        value: 'name',
      },
      {
        text: this.formatMessage('menu.spriteProperty._size'),
        value: '_size',
      },
      {
        text: this.formatMessage('menu.spriteProperty._visible'),
        value: '_visible',
      },
      {
        text: this.formatMessage('menu.spriteProperty.direction'),
        value: 'direction',
      },
      {
        text: this.formatMessage('menu.spriteProperty.currentCostume'),
        value: 'currentCostume',
      },
      {
        text: this.formatMessage(
          'menu.spriteProperty.currentCostumeName',
        ),
        value: 'currentCostumeName',
      },
      {
        text: this.formatMessage('menu.spriteProperty.dataJSON'),
        value: 'dataJSON',
      },
      {
        text: this.formatMessage('menu.color'),
        value: 'color',
      },
      {
        text: this.formatMessage('menu.fisheye'),
        value: 'fisheye',
      },
      {
        text: this.formatMessage('menu.whirl'),
        value: 'whirl',
      },
      {
        text: this.formatMessage('menu.pixelate'),
        value: 'pixelate',
      },
      {
        text: this.formatMessage('menu.mosaic'),
        value: 'mosaic',
      },
      {
        text: this.formatMessage('menu.brightness'),
        value: 'brightness',
      },
      {
        text: this.formatMessage('menu.ghost'),
        value: 'ghost',
      },
    ];
    // 和高级数据结构联动（获取存放克隆体KV数据的对象）
    if (this.runtime.SafeObject) {
      menu.push({
        text: this.formatMessage('menu.spriteProperty.extraDataObj'),
        value: 'dataObj',
      });
    }
    return menu;
  }

  /**
   * 获取角色菜单
   * @returns {[{text: "角色名", value: "角色名"}]};
   */
  getSpriteMenu() {
    const { targets } = this.runtime;

    return targets
      .filter((target) => !target.isStage && target.isOriginal)
      .map((target) => ({
        text: target.sprite.name,
        value: target.sprite.name,
      }));
  }

  /**
   * 角色菜单并检查是否为空
   * @returns {[{text: "角色名", value: "角色名"}]};
   */
  spriteMenuWithEmptyChecking() {
    const menu = this.getSpriteMenu();
    if (menu.length === 0) {
      menu.push({
        text: '-',
        value: 'empty',
      });
    }
    return menu;
  }

  /**
   * 角色菜单（但是多一项“所有”）
   * @returns {text: "角色名", value: "角色名"}[];
   */
  spriteMenuWithAll() {
    const menu = this.getSpriteMenu();
    menu.unshift({
      text: this.formatMessage('menu.cloneProperty.allSprite'),
      value: '_all_',
    });
    return menu;
  }

  /**
   * 角色菜单（但是多一项“任意角色”）
   * @returns {text: "角色名", value: "角色名"}[];
   */
  spriteMenuWithAny() {
    const menu = this.getSpriteMenu();
    menu.unshift({
      text: this.formatMessage('menu.cloneProperty.anySprite'),
      value: '_all_',
    });
    return menu;
  }

  /**
   * 角色菜单（但是多一项“自己”）
   * @returns {text: "角色名", value: "角色名"}[];
   */
  spriteMenuWithMyself() {
    const menu = this.spriteMenuWithEmptyChecking();
    // 当前角色名称
    if (!this.runtime._editingTarget) return menu;
    const editingTargetName = this.runtime._editingTarget.sprite.name;
    // 从列表删除自己
    const index = menu.findIndex((item) => item.value === editingTargetName);
    if (index !== -1) {
      menu.splice(index, 1);
    }
    // 列表第一项插入“自己”
    if (this.runtime._editingTarget.isStage) return menu;
    menu.unshift({
      text: this.formatMessage('menu.cloneProperty.myself'),
      value: '_myself_',
    });
    return menu;
  }

  /**
   * Scratch列表的菜单
   * @returns {text: "列表名", value: "列表id"}[];
   */
  listMenu() {
    const menus = [];
    let { variables } = this.runtime._stageTarget;
    Object.keys(variables).forEach((variable) => {
      if (variables[variable].type === 'list') {
        menus.push({
          text: variables[variable].name,
          value: variables[variable].id,
        });
      }
    });
    try {
      variables = this.runtime._editingTarget.variables;
    } catch (e) {
      variables = 'error';
    }
    if (
      variables !== 'error'
      && this.runtime._editingTarget !== this.runtime._stageTarget
    ) {
      Object.keys(variables).forEach((variable) => {
        if (variables[variable].type) {
          menus.push({
            text: `[PRIVATE] ${variables[variable].name}`,
            value: variables[variable].id,
          });
        }
      });
    }
    if (menus.length === 0) {
      menus.push({
        text: '-',
        value: 'empty',
      });
    }
    return menus;
  }

  // ************************ ↓一些工具函数 ************************

  /**
   * （如果之前没有劫持）劫持obj对象的方法
   * @param {*} obj
   * @param {string} funName 方法名
   * @param {Function} newFun 注入的方法(形如(origFun, 其他参数)=>{...})
   */
  tryHackedFunction(obj, funName, newFun) {
    if (!obj.dollyProOrigFun) {
      // eslint-disable-next-line no-param-reassign
      obj.dollyProOrigFun = {}; // 记录原版函数
    }
    if (!obj.dollyProOrigFun[funName]) {
      // 记录原函数
      // eslint-disable-next-line no-param-reassign
      obj.dollyProOrigFun[funName] = obj[funName];
    }
    const origFun = obj.dollyProOrigFun[funName];
    if (origFun.id !== this.id) {
      origFun.id = this.id;
      // 替换原始方法为新方法
      // eslint-disable-next-line no-param-reassign
      obj[funName] = function (...args) {
        return newFun.call(this, origFun, ...args);
      };
    }
  }

  /**
   * 根据得到的renderTarget实例，劫持其原型RenderTarget的方法
   * @param {Target} target
   */
  tryHackedRenderTarget(target) {
    const proto = Object.getPrototypeOf(target);
    this.tryHackedFunction(proto, 'initDrawable', this.hackedInitDrawable);
    this.tryHackedFunction(proto, 'dispose', this.hackedDispose);
  }

  /** 生成targetID
   * @param {Target} target 要生成ID的target
   * @param {string} specID （选填）指定ID
   * @returns {string} 生成的ID，形如sprite_name或clone_#
   */
  generateTargetID(target, specID) {
    let ID;
    // 指定了ID，使用指定ID
    if (specID !== undefined) {
      ID = specID;
    } else if (target.isStage) {
      ID = 'stage';
    } else if (target.isOriginal) {
      this.nextSpriteIDCount += 1;
      ID = `sprite_${this.nextSpriteIDCount}`;
    } else {
      this.nextCloneIDCount += 1;
      ID = `clone_${this.nextCloneIDCount}`;
    }
    // 已经有相同ID，使用原ID
    if (Object.prototype.hasOwnProperty.call(this.IDtoTargets, ID)) {
      ID = target.id;
    }
    return ID;
  }

  /**
   * 向 target（克隆体/角色）注入 Dolly 数据（如果还没注入）
   * @param {ITarget} target 要注入的target
   * @param {string} ID 自定义ID（默认为原版的target.id)
   */
  injectDollyTarget(target, ID) {
    // 已注入，退出
    if (target.DollyPro) return;

    // 狠狠注入多莉数据（doge）
    target.DollyPro = {
      ID: this.generateTargetID(target, ID), // 克隆体多莉ID (不指定则默认为原版target.id)
      extraData: Object.create(null), // 克隆体的 KV 数据
      isInGroup: Object.create(null), // 记录是否在某个组，例如 isInGroup["敌人"] == true
    };
    // 加入ID映射表
    this.IDtoTargets[target.DollyPro.ID] = target;
  }

  /**
   * 根据ID，获取target
   * @param {string} ID 克隆体的虚拟ID
   * @returns {ITarget} ID对应的target对象
   */
  getTargetByID(ID) {
    // 先从ID映射表找
    if (Object.prototype.hasOwnProperty.call(this.IDtoTargets, ID)) {
      return this.IDtoTargets[ID];
    }
    //  ID表没找到，再使用原版方法找
    const target = this.runtime.getTargetById(ID);
    if (target) {
      this.injectDollyTarget(target);
      return target;
    }
    return undefined;
  }

  /** 读取target的ID */
  getIDOfTarget(target) {
    if (!target.DollyPro) this.injectDollyTarget(target);
    return target.DollyPro.ID;
  }

  /** 读取target的extraData */
  getExtraDataOfTarget(target) {
    if (!target.DollyPro) this.injectDollyTarget(target);
    return target.DollyPro.extraData;
  }

  /** 克隆体克隆后，进行一些处理（包括读取预设数据、触发hat） */
  processCloneBeforeCreation(target) {
    // 读取预设KV数据
    target.DollyPro.extraData = { ...this.clonePresetData };
    // 原型设为 null
    Object.setPrototypeOf(target.DollyPro.extraData, null);
    // 加入预设分组
    const ID = this.getIDOfTarget(target);

    Object.keys(this.clonePresetGroups).forEach((group) => {
      if (this.clonePresetGroups[group]) {
        target.DollyPro.isInGroup[group] = true;
        const list = this.getOrCreateGroupByName(group);
        list.push(ID);
      }
    });

    // 读取预设属性（x、y、direction等）
    Object.keys(this.clonePresetProperties).forEach((prop) => {
      this.opPropertyOfTarget(
        target,
        prop,
        'set',
        this.clonePresetProperties[prop],
      );
    });

    // 读取结束后，清空预设数据
    this.clonePresetData = {};
    this.clonePresetProperties = {};
    this.clonePresetGroups = {};

    // 广播克隆体产生的hat
    this.runtime.startHatsWithParams(`${extensionId}_dispatchWhenCloned`, {
      parameters: { ID },
      fields: { TARGET: target.sprite.name },
    });
    this.runtime.startHatsWithParams(`${extensionId}_dispatchWhenCloned`, {
      parameters: { ID },
      fields: { TARGET: '_all_' },
    });
  }

  /**
   * 在移除 target(角色/克隆体)前，处理后事
   * @param {ITarget} target 即将被移除的target
   */
  processTargetBeforeDeletion(target) {
    let ID;
    if (!target.DollyPro) {
      // 如果target没接入多莉系统
      ID = target.id;
    } else {
      // 如果 target 接入多莉系统
      ID = target.DollyPro.ID;
      // 如果target是克隆体
      if (!target.isOriginal) {
        // 广播“有角色的克隆体被删除”的hat积木
        this.runtime.startHatsWithParams(
          `${extensionId}_dispatchWhenCloneDeleted`,
          {
            parameters: { ID },
            fields: { TARGET: target.sprite.name },
          },
        );
        this.runtime.startHatsWithParams(
          `${extensionId}_dispatchWhenCloneDeleted`,
          {
            parameters: { ID },
            fields: { TARGET: '_all_' },
          },
        );
        // 标记克隆体为正在删除
        target.DollyPro.isDeleting = true;
        // 触发“本克隆体即将删除”的hat积木
        const threads = this.runtime.startHats(
          `${extensionId}_beforeDeletionOfTheClone`,
          null,
          target,
        );
        // 立即执行该 hat（克隆体执行完该hat后，就被立即删除）
        if (threads) {
          threads.forEach((thread) => {
            this.runtime.sequencer.stepThread(thread);
          });
        }
      }

      // 从克隆体分组中移除 target
      Object.keys(target.DollyPro.isInGroup).forEach((group) => {
        const list = this.getGroupByName(group);
        if (!list) return;
        const idx = list.indexOf(ID);
        if (idx === -1) return;
        list.splice(idx, 1);
      });
    }
    // 从ID映射表移除target
    delete this.IDtoTargets[ID];
  }

  /**
   * 读取target的x,y,direction
   * @param {ITarget} target 要读取对象
   * @param  {...string} props 要读取的内容，例如'x','y','direction'
   * @returns {[number]} 读取结果，如[123,123]
   */
  getTargetXYDir(target, ...props) {
    const res = [];
    props.forEach((prop) => {
      const key = this.accessTransfer[prop];
      if (key && !target.isPoint) res.push(this.getDataOfTarget(target, key));
      else {
        res.push(target[prop]);
      }
    });
    if (res.length < 2) return res[0];
    return res;
  }

  /** 周期裁剪（例如11裁剪到1~10,返回1） */
  wrapClamp(n, min, max) {
    const range = max - min + 1;
    return n - Math.floor((n - min) / range) * range;
  }

  /** 普通裁剪 */
  clamp(n, min, max) {
    return Math.min(Math.max(n, min), max);
  }

  /**
   * 设置target的x,y,direction
   * @param {ITarget} target 要设置的对象
   * @param  {object} props 要设置内容，如{x:['set',123], y:['change',123], direction:['set',123]}
   */
  setTargetXYDir(target, props) {
    let newX;
    let newY;
    Object.keys(props).forEach((prop) => {
      const op = props[prop][0];
      const value = props[prop][1];
      const key = this.accessTransfer[prop];
      if (key) {
        this.setOrChangeDataOfTarget(target, key, op, value);
        if (prop === 'direction') {
          const dir = this.wrapClamp(
            this.getDataOfTarget(target, key),
            -179,
            180,
          );
          this.setOrChangeDataOfTarget(target, key, 'set', dir);
        }
      } else {
        switch (prop) {
          case 'x':
            if (op === 'set') newX = value;
            // eslint-disable-next-line no-underscore-dangle
            else newX = target._x + value;
            break;
          case 'y':
            if (op === 'set') newY = value;
            // eslint-disable-next-line no-underscore-dangle
            else newY = target._y + value;
            break;
          case 'direction':
            if (op === 'set') target.setDirection(value);
            else target.setDirection(target.direction + value);
            break;
          default:
            break;
        }
      }
    });
    if (newX !== undefined || newY !== undefined) {
      target.setXY(newX ?? target.x, newY ?? target.y);
    }
  }

  /**
   * 获取克隆体分组（不自动创建）
   * @param {String} groupName 分组名
   * @return {[[ID: string]]} 克隆体分组ID表
   */
  getGroupByName(groupName) {
    return this.groupsOfClones[groupName];
  }

  /**
   * 获取克隆体分组（如果没有则创建分组）
   * @param {String} groupName 分组名
   * @return {[[ID: string]]} 克隆体分组ID表
   */
  getOrCreateGroupByName(groupName) {
    if (!Object.prototype.hasOwnProperty.call(this.groupsOfClones, groupName)) {
      this.groupsOfClones[groupName] = [];
    }
    return this.groupsOfClones[groupName];
  }

  /**
   * 将 target 加入分组
   * @param {ITarget} target 要加入的target
   * @param {string} group 分组名
   */
  addTargetToGroup(target, group) {
    if (!target.DollyPro) this.injectDollyTarget(target);
    // 已加入分组，直接返回
    if (target.DollyPro.isInGroup[group]) return;
    // 标记为加入分组
    target.DollyPro.isInGroup[group] = true;
    // 获取克隆体分组列表，不存在则创建
    const list = this.getOrCreateGroupByName(group);
    const ID = this.getIDOfTarget(target);
    if (list.includes(ID)) return;
    list.push(ID);
  }

  /**
   * 将 target 移出分组
   * @param {ITarget} target 要移出的target
   * @param {string} group 分组名
   */
  removeTargetFromGroup(target, group) {
    if (!target.DollyPro) this.injectDollyTarget(target);
    // 不在分组中，直接返回
    if (!target.DollyPro.isInGroup[group]) return;
    // 标记为移出分组
    delete target.DollyPro.isInGroup[group];
    // 获取克隆体分组列表
    const list = this.getGroupByName(group);
    // 分组不存在则直接返回
    if (!list) return;
    const ID = this.getIDOfTarget(target);
    const idx = list.indexOf(ID);
    // target不在分组中，直接返回
    if (idx === -1) return;
    // 将target移出分组
    list.splice(idx, 1);
  }

  // ************************ ↑一些工具函数 ************************

  /** 获取刚产生的克隆体的ID */
  getJustCreatedCloneID() {
    return this.justCreatedCloneID;
  }

  dispatchWhenCloned() {
    return true;
  }

  dispatchWhenCloneDeleted() {
    return true;
  }

  initTheClone() {
    return true;
  }

  beforeDeletionOfTheClone() {
    return true;
  }

  /**
   * 朝ID/分组/角色克隆体广播
   * @param {'ID'|'group'|'sprite'} MENU ID/group/sprite
   * @param {string} VALUE ID内容/组名/角色名
   * @param {string} MSG 信息名
   * @param {*} data 附带信息
   */
  broadcastToClone({
    VALUE, MENU, MSG, data,
  }, util) {
    const targets = this.getClonesOfGroupOrSprite(MENU, Cast.toString(VALUE));
    if (!targets || targets.length === 0) return;
    const senderID = this.getIDOfTarget(util.target);
    targets.forEach((target) => {
      util.startHatsWithParams(
        `${extensionId}_receiveMyBroadcast`,
        {
          parameters: { data, senderID },
          // 根据hat中的 TEXT 输入，过滤hat积木
          fields: { TEXT: Cast.toString(MSG) },
        },
        target,
      );
    });
  }

  receiveMyBroadcast() {
    return true;
  }

  test(args) {
    console.log('IDmap:', this.IDtoTargets);
    console.log('targets:', this.runtime.targets);
    return Cast.toString(this.getTargetByID(args.ID));
  }

  /**
   * 修改角色ID
   * @param {ID} 修改后的ID
   */
  setMyID({ ID }, util) {
    const newID = Cast.toString(ID);
    const oldID = this.getIDOfTarget(util.target);
    // 旧ID和新ID一样，直接返回
    if (oldID === newID) {
      this.logWarn(
        this.formatMessage('warn.newIDIsOldID').replace('%s', oldID),
      );
      return;
    }
    // ID重复
    if (this.getTargetByID(newID)) {
      this.logError(this.formatMessage('warn.repetitveID').replace('%s', newID));
      return;
    }
    // eslint-disable-next-line no-param-reassign
    util.target.DollyPro.ID = newID;
    this.IDtoTargets[newID] = this.IDtoTargets[oldID];
    delete this.IDtoTargets[oldID];
    // 更新分组信息里的ID
    Object.values(this.groupsOfClones).forEach((group) => {
      const idx = group.indexOf(oldID);
      if (idx !== -1) {
        // eslint-disable-next-line no-param-reassign
        group[idx] = newID;
      }
    });
  }

  transferAccessToTargetXYToDollyDataKey({ X_NAME, Y_NAME, DIR_NAME }) {
    const X = Cast.toString(X_NAME);
    const Y = Cast.toString(Y_NAME);
    const DIR = Cast.toString(DIR_NAME);
    this.accessTransfer.x = X === '' ? null : X;
    this.accessTransfer.y = Y === '' ? null : Y;
    this.accessTransfer.direction = DIR === '' ? null : DIR;
  }

  cancelAccessTransfer() {
    this.accessTransfer = {};
  }

  // ************************ 普通积木 ************************

  /** 某个ID的克隆体是否存在 */
  ifCloneExists({ ID }) {
    return !!this.getTargetByID(Cast.toString(ID));
  }

  /**
   * 计算两克隆体间的距离/方向/角度差/角度差绝对值
   * @param {ITarget} target1 克隆体ID1
   * @param {ITarget} target2 克隆体ID2
   * @param {'dis'|'dir'|'angle'|'absAngle'} MENU 计算菜单：dis/dir/angle/absAngle
   * @returns {number} 计算结果
   */
  calcInfoBetweenTargets(target1, target2, MENU) {
    if (MENU === 'dis') {
      return this.calcDistanceBetweenTargets(target1, target2);
    }

    const dir = this.calcDirectionBetweenTargets(target1, target2);
    if (MENU === 'dir') {
      return dir;
    }
    const diff = this.calcDifferenceFromDir1ToDir2(target1.direction, dir);
    if (MENU === 'angle') return diff;
    return Math.abs(diff);
  }

  calcDirectionBetweenTargets(target1, target2) {
    const [X1, Y1] = this.getTargetXYDir(target1, 'x', 'y');
    const [X2, Y2] = this.getTargetXYDir(target2, 'x', 'y');
    let dir = (Math.atan((X2 - X1) / (Y2 - Y1)) / Math.PI) * 180 + (Y1 > Y2 ? 180 : 0);
    if (dir > 180) dir -= 360;
    return dir;
  }

  calcDistanceBetweenTargets(target1, target2) {
    const [X1, Y1] = this.getTargetXYDir(target1, 'x', 'y');
    const [X2, Y2] = this.getTargetXYDir(target2, 'x', 'y');
    return Math.sqrt((X2 - X1) ** 2 + (Y2 - Y1) ** 2);
  }

  calcDifferenceFromDir1ToDir2(dir1, dir2) {
    let dif = dir2 - dir1;
    dif -= Math.round(dif / 360) * 360;
    if (dif === -180) dif = 180;
    return dif;
  }

  /** 计算当前角色到ID克隆体的距离/方向/角度差信息 */
  calcDistanceToClone({ ID, MENU }, util) {
    const target = this.getTargetByID(Cast.toString(ID));
    if (!target) return 0;
    return this.calcInfoBetweenTargets(util.target, target, MENU);
  }

  /** 计算ID1到ID2的距离/方向/角度差信息 */
  calcDistanceBetweenClones({ ID1, ID2, MENU }) {
    const target1 = this.getTargetByID(Cast.toString(ID1));
    if (!target1) return 0;
    const target2 = this.getTargetByID(Cast.toString(ID2));
    if (!target2) return 0;
    return this.calcInfoBetweenTargets(target1, target2, MENU);
  }

  /** 计算ID1到ID2的距离/方向/角度差信息 */
  moveToClone({ MOTION, ID }, util) {
    const target = this.getTargetByID(Cast.toString(ID));
    if (!target) return;
    const [tx, ty] = this.getTargetXYDir(target, 'x', 'y');
    if (MOTION === 'moveTo') {
      this.setTargetXYDir(util.target, { x: ['set', tx], y: ['set', ty] });
    } else {
      const dir = this.calcDirectionBetweenTargets(util.target, target);
      if (dir.isNaN) return;
      this.setTargetXYDir(util.target, { direction: ['set', dir] });
    }
  }

  /**
   * 朝target移动步数/旋转角度
   * @param {*} target
   * @param {'move'|'rotate'} MOTION
   * @param {number} velocity
   * @returns
   */
  moveStepsToTarget(target, MOTION, velocity, util) {
    if (!target) return;
    const [tx, ty] = this.getTargetXYDir(target, 'x', 'y');
    if (MOTION === 'move') {
      const dis = this.calcDistanceBetweenTargets(util.target, target);
      if (dis <= velocity) {
        // 距离比移动距离小，直接移到目标
        this.setTargetXYDir(util.target, { x: ['set', tx], y: ['set', ty] });
      } else {
        // 否则，朝目标位置移动
        const [myX, myY] = this.getTargetXYDir(util.target, 'x', 'y');
        const dx = ((tx - myX) * velocity) / dis;
        const dy = ((ty - myY) * velocity) / dis;
        this.setTargetXYDir(util.target, {
          x: ['change', dx],
          y: ['change', dy],
        });
      }
    } else {
      const dir = this.calcDirectionBetweenTargets(util.target, target);
      if (dir.isNaN) return;
      const myDir = this.getTargetXYDir(util.target, 'direction');
      const diff = this.calcDifferenceFromDir1ToDir2(myDir, dir);
      if (Math.abs(diff) <= velocity) {
        // 角度差比转速小，直接面向目标
        this.setTargetXYDir(util.target, { direction: ['set', dir] });
      } else {
        // 否则，朝目标旋转
        this.setTargetXYDir(util.target, {
          direction: ['change', diff > 0 ? velocity : -velocity],
        });
      }
    }
  }

  /** 朝克隆体移动步数/旋转角度 */
  moveStepsToClone({ ID, MOTION, VALUE }, util) {
    const target = this.getTargetByID(Cast.toString(ID));
    const velocity = Cast.toNumber(VALUE);
    if (!target) return;
    this.moveStepsToTarget(target, MOTION, velocity, util);
  }

  presetGroupForTheNextClone({ GROUP }) {
    this.clonePresetGroups[String(GROUP)] = true;
  }

  cloneIDOfForEach(args, util) {
    return this.forEachIndex[util.thread.topBlock] ?? '';
  }

  forEachWithGroup(args, util) {
    const groupList = this.getGroupByName(Cast.toString(args.GROUP));
    if (!groupList) return;

    const times = groupList.length;
    if (times === 0) return;

    if (typeof util.stackFrame.loopCounter === 'undefined') {
      // eslint-disable-next-line no-param-reassign
      util.stackFrame.loopCounter = times;
    }

    // eslint-disable-next-line no-param-reassign
    util.stackFrame.loopCounter -= 1;
    const idx = times - util.stackFrame.loopCounter - 1;
    if (idx > times - 1) return;
    this.forEachIndex[util.thread.topBlock] = groupList[idx];

    if (util.stackFrame.loopCounter >= 0) {
      util.startBranch(1, true);
    }
  }

  /**
   * 获取ID/分组/角色的target
   * @param {'ID'|'group'|'sprite'} MENU
   * @param {string} VALUE ID/组名/角色名
   * @returns {[ITarget]|undefined} target表
   */
  getClonesOfGroupOrSprite(MENU, VALUE) {
    switch (MENU) {
      case 'ID': {
        const target = this.getTargetByID(VALUE);
        if (!target) return undefined;
        return [target];
      }
      case 'group': {
        const IDs = this.getGroupByName(VALUE);
        if (!IDs) return undefined;
        return IDs.map((ID) => this.getTargetByID(ID));
      }
      case 'sprite': {
        const sprite = this.runtime.getSpriteTargetByName(VALUE);
        if (!sprite || sprite.isStage) return undefined;
        return sprite.sprite.clones;
        // return sprite.sprite.clones.filter((target) => {
        //   return !target.isOriginal;
        // });
      }
      default:
        return undefined;
    }
  }

  getNearestClone({ MENU, VALUE, TYPE }, util) {
    const targets = this.getClonesOfGroupOrSprite(MENU, Cast.toString(VALUE));
    if (!targets) return '';
    let closestID = '';
    const isNear = TYPE === 'nearest';
    let minDistance = Infinity;

    targets.forEach((target) => {
      if (target !== util.target) {
        let distance = this.calcDistanceBetweenTargets(util.target, target);
        // 求最远距离，则反转
        if (!isNear) distance *= -1;

        if (distance < minDistance) {
          minDistance = distance;
          closestID = this.getIDOfTarget(target);
        }
      }
    });
    return closestID;
  }

  /** Scratch坐标转换为Client坐标 */
  ScratchXYToClientXY(x, y) {
    let canvasHeight = 0;
    let canvasWidth = 0;
    if (this.canvas) {
      const rect = this.canvas.getBoundingClientRect();
      canvasHeight = rect.height;
      canvasWidth = rect.width;
    }
    const x2 = (x / this.runtime.stageWidth + 0.5) * canvasWidth;
    const y2 = (-y / this.runtime.stageHeight + 0.5) * canvasHeight;
    return [x2, y2];
  }

  isCloneTouchingCoord({
    X, Y, MENU, VALUE,
  }) {
    const targets = this.getClonesOfGroupOrSprite(MENU, Cast.toString(VALUE));
    if (!targets) return false;
    const { renderer } = this.runtime;
    const [x, y] = this.ScratchXYToClientXY(Cast.toNumber(X), Cast.toNumber(Y));
    return targets.some((target) => renderer.drawableTouching(target.drawableID, x, y));
  }

  /** 获取XY处最顶层角色或克隆体ID */
  pickTarget({ X, Y }) {
    const { renderer } = this.runtime;
    const [x, y] = this.ScratchXYToClientXY(Cast.toNumber(X), Cast.toNumber(Y));
    if (renderer) {
      const drawableID = renderer.pick(x, y);
      if (!drawableID) return '';
      for (let i = 0; i < this.runtime.targets.length; i += 1) {
        const target = this.runtime.targets[i];
        if (target.drawableID === drawableID) {
          return this.getIDOfTarget(target);
        }
      }
    }
    return '';
  }

  /**
   * target是否碰到ID/分组/角色
   * @param {*} target
   * @param {'ID'|'group|'sprite'} MENU
   * @param {string} VALUE
   * @returns
   */
  targetTouchingClone(target, MENU, VALUE) {
    const targets = this.getClonesOfGroupOrSprite(MENU, Cast.toString(VALUE));
    if (!targets) return false;

    const { renderer } = this.runtime;
    // // 检测角色时，只检测克隆体
    // if (MENU === 'sprite') {
    //   targets = targets.filter((target) => {
    //     return !target.isOriginal;
    //   });
    // }
    const drawableCandidates = targets.map((clone) => clone.drawableID);
    return renderer.isTouchingDrawables(target.drawableID, drawableCandidates);
  }

  isCloneTouchingClone({ ID, MENU, VALUE }) {
    const target = this.getTargetByID(Cast.toString(ID));
    if (!target) return false;
    return this.targetTouchingClone(target, MENU, VALUE);
  }

  isTouchingClone({ MENU, VALUE }, util) {
    return this.targetTouchingClone(util.target, MENU, VALUE);
  }

  // eslint-disable-next-line no-underscore-dangle
  actualGetTouchingID(targets, TYPE, util) {
    const { renderer } = this.runtime;

    const IDs = [];
    for (let i = 0; i < targets.length; i += 1) {
      const target = targets[i];
      if (target !== util.target) {
        // 碰到对方
        if (
          renderer.isTouchingDrawables(util.target.drawableID, [
            target.drawableID,
          ])
        ) {
          const ID = this.getIDOfTarget(target);
          if (TYPE === 'one') {
            return ID;
          }
          IDs.push(ID);
        }
      }
    }
    if (TYPE === 'one') {
      return '';
    }
    return IDs;
  }

  getTouchingID({ MENU, VALUE, TYPE }, util) {
    const targets = this.getClonesOfGroupOrSprite(MENU, Cast.toString(VALUE));
    if (!targets) return TYPE === 'one' ? '' : '[]';
    const res = this.actualGetTouchingID(targets, TYPE, util);
    if (TYPE === 'one') {
      return res;
    }
    return JSON.stringify(res);
  }

  importTouchingIDsIntoList({
    MENU, VALUE, OP, LIST,
  }, util) {
    let list = LIST;
    if (typeof list === 'object') list = list.name;
    let targets = this.getClonesOfGroupOrSprite(MENU, Cast.toString(VALUE));
    if (!targets) targets = [];
    const res = this.actualGetTouchingID(targets, 'all', util);
    this.importArrayIntoScratchList(res, OP, list, util);
  }
  // --------

  addOrRemoveMyselfFromGroup({ OP, GROUP }, util) {
    if (OP === 'add') {
      this.addTargetToGroup(util.target, Cast.toString(GROUP));
    } else {
      this.removeTargetFromGroup(util.target, Cast.toString(GROUP));
    }
  }

  addOrRemoveIDFromGroup({ ID, OP, GROUP }) {
    const target = this.getTargetByID(Cast.toString(ID));
    if (!target) return;
    if (OP === 'add') {
      this.addTargetToGroup(target, Cast.toString(GROUP));
    } else {
      this.removeTargetFromGroup(target, Cast.toString(GROUP));
    }
  }

  ifCloneInGroup({ ID, GROUP }) {
    const target = this.getTargetByID(Cast.toString(ID));
    if (!target) return false;
    return !!target.DollyPro.isInGroup[String(GROUP)];
  }

  getGroupInfo({ GROUP, PROPERTY }) {
    const groupList = this.getGroupByName(Cast.toString(GROUP));
    switch (PROPERTY) {
      case 'count':
        if (!groupList) return 0;
        return groupList.length;
      case 'json':
        if (!groupList) return '';
        return JSON.stringify(groupList.map((ID) => this.getTargetByID(ID)));
      case 'IDList':
        if (!groupList) return '[]';
        return JSON.stringify(groupList);
      default:
        return '';
    }
  }

  getClonePropertyInGroup({ GROUP, INDEX, PROPERTY }) {
    const groupList = this.getGroupByName(Cast.toString(GROUP));
    if (!groupList) return '';
    const idx = Cast.toNumber(INDEX);
    if (idx < 1 || idx > groupList.length) return '';
    const target = this.getTargetByID(groupList[idx - 1]);
    if (!target) return '';
    return this.propertyOfTarget(target, PROPERTY);
  }

  importArrayIntoScratchList(array, OP, LIST, util) {
    if (LIST === 'empty') return;
    let list = util.target.lookupVariableById(LIST);
    if (!list) {
      list = util.target.lookupVariableByNameAndType(LIST, 'list');
      if (!list) return;
    }
    if (OP === 'replace') {
      if (array) {
        list.value = [...array];
      } else {
        list.value = [];
      }
    } else {
      if (!array) return;
      list.value = list.value.concat(array);
    }
  }

  importGroupIntoList({ GROUP, OP, LIST }, util) {
    let list = LIST;
    if (typeof list === 'object') list = list.name;
    if (list === 'empty') return;
    const groupList = this.getGroupByName(Cast.toString(GROUP));
    this.importArrayIntoScratchList(groupList, OP, list, util);
  }

  /**
   * 判断角色是否是克隆体/本体
   * @param {string} args.KEY 判断类型：clone克隆体/original本体
   * @returns {boolean}
   */
  isCloneOrIsOriginal(args, util) {
    return args.TYPE === 'clone'
      ? !util.target.isOriginal
      : util.target.isOriginal;
  }

  /**
   * 预设克隆体Property(如x、y坐标)
   * @param {string} args.PROPERTY 预设属性：_x/_y/_size...
   * @param {string|number|boolean} args.VALUE 值
   */
  presetPropertyForTheNextClone(args) {
    this.clonePresetProperties[args.PROPERTY] = args.VALUE;
  }

  /**
   * 预设克隆体单条数据KEY
   * @param {string} args.KEY 预设KEY
   * @param {string|number|boolean} args.VALUE 值
   */
  presetSingleDataForTheNextClone(args) {
    this.clonePresetData[String(args.KEY)] = args.VALUE;
  }

  /**
   * 预设克隆体数据JSON
   * @param {string} args.DATA_JSON 预设JSON
   */
  presetDataforTheNextCloneInJSONFormat(args) {
    try {
      const obj = JSON.parse(Cast.toString(args.DATA_JSON));
      if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
        this.clonePresetData = obj;
      } else {
        this.logWarn('Dolly pro: Preseting clone JSON data fails.');
      }
    } catch (e) {
      this.logWarn('Dolly pro: Preseting clone JSON data fails.', e);
    }
  }

  /**
   * 修改target的x/y/size等属性
   * @param {ITarget} target 目标
   * @param {string} prop 属性名
   * @param {'set'|'change'} op 操作set/change
   * @param {*} v 值
   * @private
   */
  opPropertyOfTarget(target, prop, op, v) {
    const numberV = Cast.toNumber(v);
    const isChanging = op === 'change';
    switch (prop) {
      case 'x':
        target.setXY(isChanging * target.x + numberV, target.y);
        return;
      case 'y':
        target.setXY(target.x, isChanging * target.y + numberV);
        return;
      case 'size':
        target.setSize(isChanging * target.size + numberV);
        return;
      case 'direction':
        target.setDirection(isChanging * target.direction + numberV);
        return;
      case 'visible':
        target.setVisible(
          Cast.toBoolean(isChanging * target.visible + numberV),
        );
        return;
      case 'currentCostumeName':
        if (typeof v === 'number') {
          if (isChanging) target.setCostume(target.currentCostume + v);
          else target.setCostume(v - 1);
        } else {
          if (isChanging) return;
          const costumeIndex = target.getCostumeIndexByName(v.toString());
          if (costumeIndex !== -1) {
            target.setCostume(costumeIndex);
          }
        }
        return;
      case 'color':
      case 'fisheye':
      case 'whirl':
      case 'pixelate':
      case 'brightness':
      case 'ghost':
      case 'mosaic': {
        let value = numberV + isChanging * target.effects[prop];
        value = this.clampEffect(prop, value);
        target.setEffect(prop, value);
        break;
      }
      default:
    }
  }

  /** clamp特效值，限制在正确范围内 */
  clampEffect(effect, value) {
    switch (effect) {
      case 'ghost':
        return this.clamp(value, 0, 100);
      case 'brightness':
        return this.clamp(value, -100, 100);
      default:
        return value;
    }
  }

  /**
   * 克隆角色，并设置克隆体ID
   * @param {ITarget} args.TARGET 要克隆的角色名
   * @param {string} args.ID 指定的ID
   */
  createCloneAndSpecifyID(args, util) {
    const TARGET = Cast.toString(args.TARGET);
    let specifyingID = Cast.toString(args.ID);

    // 获取要克隆的target
    let cloneTarget;
    if (TARGET === '_myself_') {
      cloneTarget = util.target;
    } else {
      cloneTarget = this.runtime.getSpriteTargetByName(TARGET);
    }
    // If clone target is not found, return
    if (!cloneTarget || cloneTarget.isStage) return;
    // Create clone
    const newClone = cloneTarget.makeClone();

    if (newClone) {
      // 未指定 ID
      if (specifyingID === '') {
        specifyingID = undefined;
      } else if (
        Object.prototype.hasOwnProperty.call(this.IDtoTargets, specifyingID)
      ) {
        // 如果已经存在相同 ID
        this.logError(
          this.formatMessage('error.repetitiveID').replace('%s', specifyingID),
        );
        specifyingID = undefined;
      }
      // 注入dolly并设置ID
      this.injectDollyTarget(newClone, specifyingID);

      this.runtime.addTarget(newClone);
      // Place behind the original target.
      newClone.goBehindOther(cloneTarget);
    }
  }

  /**
   * 删除指定ID的克隆体
   * @param {string} args.ID 要删除的克隆体ID
   */
  deleteCloneByID(args) {
    const ID = Cast.toString(args.ID);
    const target = this.getTargetByID(ID);
    if (target) {
      if (target.isOriginal) return;
      this.runtime.disposeTarget(target);
      this.runtime.stopForTarget(target);
    }
  }

  /**
   * 获取某个ID克隆体的KEY数据
   * @param {string} args.ID 克隆体的虚拟ID
   * @param {string} args.KEY 数据KEY
   * @returns {string|number|boolean} 克隆体的KEY对应数据
   */
  getValueOfCloneIDWithKey(args) {
    const target = this.getTargetByID(Cast.toString(args.ID));
    if (!target) return '';
    return this.getDataOfTarget(target, Cast.toString(args.KEY));
  }

  getMyValueByKey(args, util) {
    return this.getDataOfTarget(util.target, Cast.toString(args.KEY));
  }

  getDataOfTarget(target, key) {
    const data = this.getExtraDataOfTarget(target);
    return data[key] ?? '';
  }

  /**
   * 修改某个ID克隆体的KEY数据
   * @param {string} args.ID 克隆体的虚拟ID
   * @param {string} args.PROPERTY 数据
   * @param {string} args.OP 操作(set设置/change增加)
   * @param {*} args.VALUE 值
   */
  setCloneProperty(args) {
    const target = this.getTargetByID(Cast.toString(args.ID));
    if (!target) return;
    this.opPropertyOfTarget(target, args.PROPERTY, args.OP, args.VALUE);
  }

  /**
   * 修改某个ID克隆体的KEY数据
   * @param {string} args.ID 克隆体的虚拟ID
   * @param {string} args.KEY 数据KEY
   * @param {string} args.OP 操作(set设置/change增加)
   * @param {*} args.VALUE 值
   */
  setOrChangeValueOfCloneIDWithKey(args) {
    const target = this.getTargetByID(Cast.toString(args.ID));
    if (!target) return;
    this.setOrChangeDataOfTarget(
      target,
      Cast.toString(args.KEY),
      args.OP,
      args.VALUE,
    );
  }

  setOrChangeMyValueWithKey(args, util) {
    this.setOrChangeDataOfTarget(
      util.target,
      Cast.toString(args.KEY),
      args.OP,
      args.VALUE,
    );
  }

  setOrChangeDataOfTarget(target, key, op, value) {
    const data = this.getExtraDataOfTarget(target);
    if (op === 'set') {
      data[key] = value;
    } else {
      data[key] = Cast.toNumber(data[key]) + Cast.toNumber(value);
    }
  }

  getMyProperty(args, util) {
    return this.propertyOfTarget(util.target, args.PROPERTY);
  }

  getClonePropertyWithID(args) {
    const target = this.getTargetByID(Cast.toString(args.ID));
    if (!target) return '';
    return this.propertyOfTarget(target, args.PROPERTY);
  }

  propertyOfTarget(target, type) {
    switch (type) {
      case 'currentCostume':
        return target.currentCostume + 1;
      case 'currentCostumeName':
        return target.sprite.costumes[target.currentCostume].name;
      case 'name':
        return target.sprite.name;
      case 'id':
        // 获取 ID 时，返回虚拟ID
        return this.getIDOfTarget(target);
      case 'dataJSON':
        // 获取KV数据JSON
        return JSON.stringify(this.getExtraDataOfTarget(target));
      case 'dataObj':
        if (this.runtime.SafeObject) {
          return new this.runtime.SafeObject(this.getExtraDataOfTarget(target));
        }
        return 'Error: Need to install Advanecd Data Structure Extension first!';
      case 'color':
      case 'fisheye':
      case 'whirl':
      case 'pixelate':
      case 'brightness':
      case 'ghost':
      case 'mosaic':
        return target.effects[type] ?? 0;
      default:
        return target[type] ?? '';
    }
  }

  getCloneTargetPropertyWithSpriteName(args) {
    return this.getCloneTargetPropertyWithSpriteName2(args);
  }

  getCloneTargetPropertyWithSpriteName2(args) {
    const targets = this.runtime.targets.filter(
      (target) => !target.isOriginal
        && (args.TARGET !== '_all_' ? target.sprite.name === args.TARGET : true),
    );
    let value;
    switch (args.PROPERTY) {
      case 'count':
        value = targets.length;
        break;
      case 'json':
        value = JSON.stringify(targets);
        break;
      case 'IDList':
        value = JSON.stringify(
          targets.map((target) => this.getIDOfTarget(target)),
        );
        break;
      default:
        value = '';
        break;
    }
    return value;
  }

  getOriginalTargetPropertyWithSpriteName(args) {
    return this.getOriginalTargetPropertyWithSpriteName2(args);
  }

  getOriginalTargetPropertyWithSpriteName2(args) {
    const target = this.runtime.getSpriteTargetByName(args.TARGET);
    if (!target) return '';
    return this.propertyOfTarget(target, args.PROPERTY);
  }
}

window.tempExt = {
  Extension: dollyProExtension,
  info: {
    name: 'witCat.dollyPro.extensionName',
    description: 'witCat.dollyPro.description',
    extensionId,
    iconURL: cover,
    insetIconURL: icon,
    docsURI:
      'https://learn.ccw.site/article/9b9b43cd-75c3-4271-998c-b7c250fc81b9',
    featured: true,
    disabled: false,
    collaborator: 'editor @ dollyProTeam',
    collaboratorList: [
      {
        collaborator: '白猫 @ CCW',
        collaboratorURL:
          'https://www.ccw.site/student/6173f57f48cf8f4796fc860e',
      },
      {
        collaborator: 'YUEN @ CCW',
        collaboratorURL:
          'https://www.ccw.site/student/628979aa804a3a2bc801b097',
      },
      {
        collaborator: 'Arkos @ CCW',
        collaboratorURL:
          'https://www.ccw.site/student/6107c5323e593a0c25f850f8',
      },
      {
        collaborator: '酷可 @ CCW',
        collaboratorURL:
          'https://www.ccw.site/student/610b508176415b2f27e0f851',
      },
    ],
  },
  l10n: {
    'zh-cn': {
      'witCat.dollyPro.extensionName': '🐏多莉 Pro',
      'witCat.dollyPro.description': '✨ 更好的克隆体管理',
    },
    en: {
      'witCat.dollyPro.extensionName': '🐏Dolly Pro',
      'witCat.dollyPro.description': '✨ Enhanced clone management',
    },
  },
};

// 标记本文件为 ES 模块（否则 entry/index.ts 的 import 会报 TS2306 "不是模块"）
export {}

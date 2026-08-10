class h extends d {
  getInfo() {
    const e = [
        {
          text: this.formatMessage({ id: "teaching.focusBlockInFlyoutWithOffset.position.top", default: "TOP" }),
          value: "TOP",
        },
        {
          text: this.formatMessage({ id: "teaching.focusBlockInFlyoutWithOffset.position.middle", default: "MIDDLE" }),
          value: "MIDDLE",
        },
      ],
      t = [
        {
          text: this.formatMessage({ id: "teaching.determineIfTheScriptIncludesTheBlocks.with.with", default: "WITH" }),
          value: "WITH",
        },
        {
          text: this.formatMessage({
            id: "teaching.determineIfTheScriptIncludesTheBlocks.with.without",
            default: "WITHOUT",
          }),
          value: "WITHOUT",
        },
      ],
      n = [
        {
          text: this.formatMessage({
            id: "teaching.determineIfTheScriptIncludesTheBlocks.include.include",
            default: "INCLUDE",
          }),
          value: "INCLUDE",
        },
        {
          text: this.formatMessage({
            id: "teaching.determineIfTheScriptIncludesTheBlocks.include.exclude",
            default: "EXCLUDE",
          }),
          value: "EXCLUDE",
        },
      ],
      r = [
        { text: this.formatMessage({ id: "teaching.playMedia.mediaType.video", default: "VIDEO" }), value: "VIDEO" },
        { text: this.formatMessage({ id: "teaching.playMedia.mediaType.audio", default: "AUDIO" }), value: "AUDIO" },
        { text: this.formatMessage({ id: "teaching.playMedia.mediaType.image", default: "IMAGE" }), value: "IMAGE" },
      ],
      i = [
        {
          onClick: this.handleOpenDocumentButtonClick,
          blockType: "button",
          text: this.formatMessage({ id: "teaching.openDocumentButton", default: "open document ↗" }),
        },
        {
          opcode: "skipToBranch",
          isTerminal: !0,
          text: this.formatMessage({ id: "teaching.skipToBranch", default: "skip to branch [NAME]" }),
          arguments: { NAME: { type: "string", defaultValue: " " } },
        },
        {
          opcode: "sendLog",
          isTerminal: !1,
          text: this.formatMessage({ id: "teaching.sendLog", default: "send log, name: [NAME], value: [VALUE]" }),
          arguments: { NAME: { type: "string", defaultValue: " " }, VALUE: { type: "string", defaultValue: " " } },
        },
        {
          opcode: "setLectureFinishedModal",
          isTerminal: !1,
          text: this.formatMessage({
            id: "teaching.setLectureFinishedModal",
            default: c.en["teaching.setLectureFinishedModal"],
          }),
          arguments: {
            GUIDE: { type: "string", defaultValue: " " },
            BUTTON_NAME: { type: "string", defaultValue: " " },
            BUTTON_HREF: { type: "string", defaultValue: " " },
          },
        },
        {
          opcode: "teachingRedirect",
          isTerminal: !0,
          text: this.formatMessage({ id: "teaching.redirect", default: "redirect to [URL]" }),
          arguments: { URL: { type: "string", defaultValue: " " } },
        },
        "---",
        {
          opcode: "focusBlockInFlyoutWithOffset",
          isTerminal: !1,
          blockType: "conditional",
          branchCount: 1,
          text: this.formatMessage({
            id: "teaching.focusBlockInFlyoutWithOffset",
            default: "focus and display the first block at [POSITION] in flyout with offset [OFFSET] in px",
          }),
          arguments: {
            OFFSET: { type: "number", defaultValue: "0" },
            POSITION: { type: "string", menu: "FLYOUT_BLOCK_ANCHOR_POSITIONS", defaultValue: e[0].value },
          },
        },
        {
          opcode: "centerBlockInWorkspace",
          isTerminal: !1,
          text: this.formatMessage({
            id: "teaching.centerBlockInWorkspace",
            default: "focus block [BLOCK_ID] at center in workspace",
          }),
          arguments: { BLOCK_ID: { type: "string", defaultValue: " " } },
        },
        {
          opcode: "glowScript",
          isTerminal: !1,
          text: this.formatMessage({
            id: "teaching.glowScript",
            default: "highlight script [BLOCK_ID] for [COUNT] times",
          }),
          arguments: {
            BLOCK_ID: { type: "string", defaultValue: " " },
            COUNT: { type: "number", defaultValue: "3" },
            INTERVAL: { type: "number", defaultValue: "200" },
          },
        },
        "---",
        {
          opcode: "determineIfTheScriptIncludesTheBlocks",
          isTerminal: !1,
          blockType: "conditional",
          branchCount: 2,
          text: [
            this.formatMessage({
              id: "teaching.determineIfTheScriptIncludesTheBlocks",
              default: "if script [BLOCK_ID] [VERB_INCLUDE]s those blocks [WITH] the identical value(s)",
            }),
            this.formatMessage({ id: "teaching.determineIfTheScriptIncludesTheBlocks.then", default: "then execute" }),
          ],
          arguments: {
            BLOCK_ID: { type: "string", defaultValue: " " },
            VERB_INCLUDE: { type: "string", menu: "INCLUDE_OR_EXCLUDE", defaultValue: n[0].value },
            WITH: { type: "string", menu: "WITH_OR_WITHOUT", defaultValue: t[0].value },
          },
        },
        "---",
        {
          opcode: h.BLOCK_WHEN_NO_BLOCK_IS_DRAGGED_OPCODE_SEGMENT,
          blockType: "hat",
          isEdgeActivated: !1,
          text: this.formatMessage({
            id: "teaching.whenNoBlockIsDragged",
            default: "when student did not drag any block in [SECOND] second(s)",
          }),
          arguments: { SECOND: { type: "number", defaultValue: "60" } },
        },
        {
          opcode: h.BLOCK_WHEN_NO_GREEN_FLAG_IS_CLICKED_OPCODE_SEGMENT,
          blockType: "hat",
          isEdgeActivated: !1,
          text: this.formatMessage({
            id: "teaching.whenNoGreenFlagIsClicked",
            default: "when student did not click green flag in [SECOND] second(s)",
          }),
          arguments: { SECOND: { type: "number", defaultValue: "60" } },
        },
        {
          opcode: h.BLOCK_WHEN_PROJECT_IS_LOADED_AFTER_SOME_SECONDS_OPCODE_SEGMENT,
          blockType: "hat",
          isEdgeActivated: !1,
          text: this.formatMessage({
            id: "teaching.whenProjectIsLoadedAfterSomeSeconds",
            default: "when project did load after [SECOND] second(s)",
          }),
          arguments: { SECOND: { type: "number", defaultValue: "60" } },
        },
        {
          opcode: "resetTimerOfAllTimeRelatedBlocks",
          isTerminal: !1,
          text: this.formatMessage({
            id: "teaching.resetTimerOfAllTimeRelatedBlocks",
            default: "reset timer of all time related blocks",
          }),
        },
        {
          opcode: h.BLOCK_REQUEST_TO_TRIGGER_ON_PROJECT_LOADED_OPCODE_SEGMENT,
          blockType: "hat",
          isEdgeActivated: !1,
          text: this.formatMessage({
            id: "teaching.requestToTriggerOnProjectLoaded",
            default: "when project did load",
          }),
        },
        "---",
        {
          opcode: "markHomeworkPassed",
          isTerminal: !1,
          text: this.formatMessage({ id: "teaching.markHomeworkPassed", default: "mark current homework passed" }),
        },
        "---",
        {
          opcode: "pushIntoGuideTipQueue",
          isTerminal: !1,
          text: this.formatMessage({
            id: "teaching.pushIntoGuideTipQueue",
            default: "push [NAME] into guide tip queue",
          }),
          arguments: { NAME: { type: "string", defaultValue: " " } },
        },
        {
          opcode: h.BLOCK_REQUEST_TO_SHOW_GUIDE_TIP_OPCODE_SEGMENT,
          blockType: "hat",
          isEdgeActivated: !1,
          text: this.formatMessage({
            id: "teaching.requestToShowGuideTip",
            default: "request to show [NAME] guide tip",
          }),
          arguments: { NAME: { type: "string", defaultValue: " " } },
        },
        "---",
        {
          onClick: this.handleUploadFileButtonClick,
          blockType: "button",
          text: this.formatMessage({ id: "teaching.uploadFile", default: "upload file" }),
        },
        {
          opcode: "playMedia",
          isTerminal: !1,
          text: this.formatMessage({ id: "teaching.playMedia", default: "play [MEDIA_TYPE] guide tips [URL]" }),
          arguments: {
            MEDIA_TYPE: { type: "string", menu: "MEDIA_TYPE", defaultValue: r[0].value },
            URL: { type: "string", defaultValue: " " },
          },
        },
        {
          opcode: "displayImageWithAudio",
          isTerminal: !1,
          text: this.formatMessage({
            id: "teaching.displayImageWithAudio",
            default: "display image [IMAGE_URL] with playing audio [AUDIO_URL]",
          }),
          arguments: {
            IMAGE_URL: { type: "string", defaultValue: " " },
            AUDIO_URL: { type: "string", defaultValue: " " },
          },
        },
        {
          opcode: "stopMedia",
          isTerminal: !1,
          text: this.formatMessage({ id: "teaching.stopMedia", default: "stop guide tips [URL]" }),
          arguments: { URL: { type: "string", defaultValue: " " } },
        },
        {
          opcode: "stopAllMedia",
          isTerminal: !1,
          text: this.formatMessage({ id: "teaching.stopAllMedia", default: "stop all media" }),
        },
      ];
    return {
      id: h.EXTENSION_ID,
      name: this.formatMessage({ id: "teaching.name", default: h.EXTENSION_NAME }),
      menuIconURI: h.BLOCK_ICON_URI,
      blockIconURI: h.BLOCK_ICON_URI,
      onlyVisibleOnShortcut: !0,
      blocks: i,
      menus: {
        FLYOUT_BLOCK_ANCHOR_POSITIONS: { acceptReporters: !0, items: e },
        WITH_OR_WITHOUT: { acceptReporters: !0, items: t },
        INCLUDE_OR_EXCLUDE: { acceptReporters: !0, items: n },
        MEDIA_TYPE: { acceptReporters: !0, items: r },
      },
    };
  }
}

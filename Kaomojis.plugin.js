/**
 * @name Kaomojis
 * @author kotooriiii
 * @authorId 139218650170261505
 * @description Unleash the power of Kaomojis in your Discord chats and let your kaomojis speak louder than words. Customizable for you to bring your own Kaomojis, or use predefined ones!
 * @version 2.0.0
 */

"use strict";

// src/plugins/InsertTimestamps/modal.tsx
var { useState, useMemo } = BdApi.React;
var {
  Button,
  ModalRoot,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  FormTitle,
  FormText,
  Tooltip,
  Select,
  openModal
} = BdApi.Webpack.getModule((m) => m.ModalContent);
var ButtonWrapperClasses = BdApi.Webpack.getModule((m) => m.buttonWrapper && m.buttonContent);
var cl = (...names) => names.map((n) => `emj-its-${n}`).join(" ");
var finalKaomojisCollection = [];
var predefinedKaomojisCollection = ["⊂(◉‿◉)つ", "(ㆆ _ ㆆ)", "☜(⌒▽⌒)☞", "⤜(ⱺ ʖ̯ⱺ)⤏", "/|\\ ^._.^ /|\\",
  "ʕ·͡ᴥ·ʔ", "ʕノ•ᴥ•ʔノ ︵ ┻━┻", "ʕっ•ᴥ•ʔっ", "( 0 _ 0 )", "( •͡˘ _•͡˘)ノð",
  "※\\(^o^)/※", "(｡◕‿‿◕｡)", "⊂(◉‿◉)つ", "(ㆆ _ ㆆ)", "☜(⌒▽⌒)☞",
  "⤜(ⱺ ʖ̯ⱺ)⤏", "/|\\ ^._.^ /|\\", "ʕ·͡ᴥ·ʔ", "ʕノ•ᴥ•ʔノ ︵ ┻━┻", "ʕっ•ᴥ•ʔっ",
  "( 0 _ 0 )", "( •͡˘ _•͡˘)ノð", "※\\(^o^)/※", "(｡◕‿‿◕｡)",
  "⊂(◉‿◉)つ", "(ㆆ _ ㆆ)", "☜(⌒▽⌒)☞", "⤜(ⱺ ʖ̯ⱺ)⤏", "/|\\ ^._.^ /|\\",
  "ʕ·͡ᴥ·ʔ", "ʕノ•ᴥ•ʔノ ︵ ┻━┻", "ʕっ•ᴥ•ʔっ", "( 0 _ 0 )", "( •͡˘ _•͡˘)ノð",
  "※\\(^o^)/※", "(｡◕‿‿◕｡)", "⊂(◉‿◉)つ", "(ㆆ _ ㆆ)", "☜(⌒▽⌒)☞",
  "⤜(ⱺ ʖ̯ⱺ)⤏", "/|\\ ^._.^ /|\\", "ʕ·͡ᴥ·ʔ", "ʕノ•ᴥ•ʔノ ︵ ┻━┻", "ʕっ•ᴥ•ʔっ",
  "( 0 _ 0 )", "( •͡˘ _•͡˘)ノð", "※\\(^o^)/※", "(｡◕‿‿◕｡)"
];
function onMouseOver(event) {
  event.target.style.background = 'rgba(255,192,203,0.3)';
  event.target.style.borderRadius = '5px';
  event.target.style.color = 'white';
}

function onMouseLeave(event) {
  event.target.style.background = 'rgba(255,192,203,0)';
  event.target.style.fontSize = '100%';
  event.target.style.borderRadius = '0px';
  event.target.style.color = 'rgba(128,128,128,0.5)';

}

function embedded(rootProps) {
  var rows = []
  var innerRows = []

  var MAX_ELEMENTS_PER_ROW = parseInt(mySettings.numColumns);

  	console.log("[Kaomojis Logs] Populating table with Kaomojis: \n" + finalKaomojisCollection);
	
  for (let i = 0; i <= MAX_ELEMENTS_PER_ROW * Math.ceil(finalKaomojisCollection.length / MAX_ELEMENTS_PER_ROW); i = i + MAX_ELEMENTS_PER_ROW) {
    innerRows = []

    for (let j = i; j < i + MAX_ELEMENTS_PER_ROW; j++) {
      if (j >= finalKaomojisCollection.length)
        break;
      let emoji = finalKaomojisCollection.at(j);

      innerRows.push(BdApi.React.createElement("td", {
        onClick: (event) => {
          const ComponentDispatch = BdApi.Webpack.getModule((m) => m.emitter?._events?.INSERT_TEXT, {
            searchExports: true
          });
          ComponentDispatch.dispatchToLastSubscribed("INSERT_TEXT", {
            rawText: emoji + " ", plainText: emoji + " "
          });
          rootProps.onClose();
        },
        onMouseOver: onMouseOver,
        onMouseLeave: onMouseLeave,
        style: { color: 'rgba(128,128,128,0.5)', padding: "20px", overflow: 'hidden', textAlign: 'center' }
      }, emoji));
    }
    rows.push(BdApi.React.createElement("tr", { key: "idk" + i }, innerRows));
  }

  return BdApi.React.createElement("table", { style: { cursor: "pointer", tableLayout: 'fixed', width: '100%', height: '100%' } }, rows);
} 

function PickerModal({ rootProps }) {
  return /* @__PURE__ */ BdApi.React.createElement(ModalRoot, { ...rootProps }, /* @__PURE__ */ BdApi.React.createElement(ModalHeader, { className: cl("modal-header") }, /* @__PURE__ */ BdApi.React.createElement(FormTitle, { tag: "h2" }, "Emojis"), /* @__PURE__ */ BdApi.React.createElement(ModalCloseButton, { onClick: rootProps.onClose })), /* @__PURE__ */ BdApi.React.createElement(ModalContent, { className: cl("modal-content") }, embedded(rootProps)), /* @__PURE__ */ BdApi.React.createElement(ModalFooter, null,));
}
function ChatBarComponent() {
  return /* @__PURE__ */ BdApi.React.createElement(Tooltip, { text: "Kaomojis" }, ({ onMouseEnter, onMouseLeave }) => /* @__PURE__ */ BdApi.React.createElement("div", { style: { marginTop: 13 } }, /* @__PURE__ */ BdApi.React.createElement(
    Button,
    {
      "aria-haspopup": "dialog",
      "aria-label": "",
      size: "",
      look: Button.Looks.BLANK,
      onMouseEnter,
      onMouseLeave,
      innerClassName: ButtonWrapperClasses.button,
      onClick: () => {
        openModal((props) => /* @__PURE__ */ BdApi.React.createElement(PickerModal, { rootProps: props }));
      },
      className: cl("button")
    },
    /* @__PURE__ */ BdApi.React.createElement("div", { className: ButtonWrapperClasses.buttonWrapper }, /* @__PURE__ */ BdApi.React.createElement("svg", { "aria-hidden": "true", role: "img", width: "20", height: "20", viewBox: "0 0 20 20" }, /* @__PURE__ */ BdApi.React.createElement("g", { fill: "none", "fill-rule": "evenodd", transform: "translate(0,0)" }, /* @__PURE__ */ BdApi.React.createElement(
      "path",
      {
        fill: "currentColor",
        d: "M10.544,8.717l1.166-0.855l1.166,0.855l-0.467-1.399l1.012-0.778h-1.244L11.71,5.297l-0.466,1.244H10l1.011,0.778L10.544,8.717z M15.986,9.572l-0.467,1.244h-1.244l1.011,0.777l-0.467,1.4l1.167-0.855l1.165,0.855l-0.466-1.4l1.011-0.777h-1.244L15.986,9.572z M7.007,6.552c0-2.259,0.795-4.33,2.117-5.955C4.34,1.042,0.594,5.07,0.594,9.98c0,5.207,4.211,9.426,9.406,9.426c2.94,0,5.972-1.354,7.696-3.472c-0.289,0.026-0.987,0.044-1.283,0.044C11.219,15.979,7.007,11.759,7.007,6.552 M10,18.55c-4.715,0-8.551-3.845-8.551-8.57c0-3.783,2.407-6.999,5.842-8.131C6.549,3.295,6.152,4.911,6.152,6.552c0,5.368,4.125,9.788,9.365,10.245C13.972,17.893,11.973,18.55,10,18.55 M19.406,2.304h-1.71l-0.642-1.71l-0.642,1.71h-1.71l1.39,1.069l-0.642,1.924l1.604-1.176l1.604,1.176l-0.642-1.924L19.406,2.304z"
      }
    ), /* @__PURE__ */ BdApi.React.createElement("rect", { width: "24", height: "24" }))))
  )));
}

// src/shared/findInReactTree.ts
function findInReactTree(root, filter) {
  return BdApi.Utils.findInTree(root, filter, {
    walkable: ["children", "props"]
  });
}

// include-file:~fileContent/styles.css
var styles_default = `.emj-its-modal-content input {
    background-color: var(--input-background);
    color: var(--text-normal);
    width: 100%;
    padding: 8px 8px 8px 12px;
    margin: 1em 0;
    outline: none;
    border: 1px solid var(--input-background);
    border-radius: 4px;
    font-weight: 500;
    font-style: inherit;
    font-size: 100%;
}

.small__05f7b {
    width: 640px;
    max-height: 720px;
    min-height: 200px;
}

.focusLock-Ns3yie, .root-1gCeng {
    width: 1000px;
}

.emj-its-format-label,
.emj-its-format-label span {
    background-color: transparent;
}

.emj-its-modal-content [class|="select"] {
    margin-bottom: 1em;
}

.emj-its-modal-content [class|="select"] span {
    background-color: var(--input-background);
}

.emj-its-modal-header {
    justify-content: space-between;
    align-content: center;
}

.emj-its-modal-header h1 {
    margin: 0;
}

.emj-its-modal-header button {
    padding: 0;
}

.emj-its-preview-text {
    margin-bottom: 1em;
}

.emj-its-button {
    padding: 0 6px;
}

.emj-its-button svg {
    transform: scale(1.1) translateY(1px);
}
`;

// src/plugins/InsertTimestamps/index.jsx

const filter = BdApi.Webpack.Filters.byStrings(".PremiumTypes.TIER_2", ".getSentUserIds();", ".ApplicationCommandOptionType.ATTACHMENT");
const Chat = BdApi.Webpack.getModule(m => filter(m.type));


function start() {
  BdApi.DOM.addStyle("emj-st", styles_default);

  BdApi.Patcher.after("emj-st", Chat, "type", (that, [props], res) => {

    const chatBar = res.props.children;
    chatBar.splice(0, 0, /* @__PURE__ */ BdApi.React.createElement(ChatBarComponent, null));

  });

  updateKaomojis();
}
function stop() {
  BdApi.DOM.removeStyle("emj-st");
  BdApi.Patcher.unpatchAll("emj-st");
}

const mySettings = BdApi.Data.load("Kaomojis", "settings") == undefined ? { definedKaomojisCollection: "", hasPreloadedKaomojisChecked: true, numColumns: 3} : BdApi.Data.load("Kaomojis", "settings");

function getSettingsPanel() {
  const mySettingsPanel = document.createElement("div");
  mySettingsPanel.id = "my-settings";

  const definedKaomojisCollectionElement= buildSetting("Populate with your very own Kaomojis (csv)", "definedKaomojisCollection", "text", mySettings.definedKaomojisCollection, ":),:o,^-^", updateKaomojis)
  const hasPreloadedKaomojisCheckedElement = buildSetting("Use preloaded Kaomojis?", "hasPreloadedKaomojisChecked", "checkbox", mySettings.hasPreloadedKaomojisChecked, false, updateKaomojis)
  const numberOfColumnsElement = buildSetting("Number of columns", "numColumns", "number", mySettings.numColumns, 3, undefined)


  mySettingsPanel.append(definedKaomojisCollectionElement);
  mySettingsPanel.append(hasPreloadedKaomojisCheckedElement);
  mySettingsPanel.append(numberOfColumnsElement);

  return mySettingsPanel;
}


function updateKaomojis() {
  if (mySettings?.hasPreloadedKaomojisChecked) {
    finalKaomojisCollection = mySettings.definedKaomojisCollection.toString().split(",").concat(predefinedKaomojisCollection);
  }
  else {
    finalKaomojisCollection = mySettings?.definedKaomojisCollection.toString().split(",");
  }
  
  	console.log("[Kaomojis Logs] Updated Kaomojis to: \n" + finalKaomojisCollection);

}


function buildSetting(text, key, type, value, placeholder, callback = () => { }) {
  const setting = Object.assign(document.createElement("div"), { className: "setting" });
  const label = Object.assign(document.createElement("span"), { textContent: text });
  const input = Object.assign(document.createElement("input"), { type: type, name: key, value: value, placeholder: placeholder });

  if (type == "checkbox" && value)
    input.checked = true;

  input.addEventListener("change", () => {
    const newValue = type == "checkbox" ? input.checked : input.value;
    mySettings[key] = newValue;
    BdApi.Data.save("Kaomojis", "settings", mySettings);
    callback(newValue);
  });
  setting.append(label, input);
  return setting;
}
module.exports = () => ({
  start,
  stop,
  getSettingsPanel
});

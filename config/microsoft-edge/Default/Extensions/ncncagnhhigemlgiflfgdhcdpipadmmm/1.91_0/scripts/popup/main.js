import { getLang, setLang, t } from "./helpers/lang.js";
import {
  runScriptInCurrentTab,
  getFBAIODashboard,
  trackEvent,
} from "../utils/index.js";

const root = document.getElementById("root");

function main() {
  renderBtns();

  trackEvent("OPEN_POPUP");
}
main();

function renderBtns() {
  root.innerHTML = "";
  const btns = [
    {
      icon: `<i class="fa-solid fa-up-right-from-square fa-lg"></i>`,
      text: { en: "Open Dashboard", vi: "Dashboard" },
      func: () => {
        trackEvent("OPEN-FB-AIO");
        const url = getFBAIODashboard();
        window.open(url, "_blank");
      },
    },
    { type: "separator", title: { en: "🚀 Tools", vi: "🚀 Tiện ích" } },
    {
      icon: `<i class="fa-solid fa-user fa-lg"></i>`,
      text: t({ en: "Get User ID", vi: "Lấy User ID" }),
      func: () => {
        trackEvent("GET-UID");
        runScriptInCurrentTab(getUid, [], "MAIN");
      },
    },
    {
      icon: '<i class="fa-solid fa-people-group fa-lg"></i>',
      text: { en: "Get Group ID", vi: "Lấy Group ID" },
      func: () => {
        trackEvent("GET-GROUP-ID");
        runScriptInCurrentTab(getGroupId, [], "MAIN");
      },
    },
    {
      icon: '<i class="fa-solid fa-pager fa-lg"></i>',
      text: { en: "Get Page ID", vi: "Lấy Page ID" },
      func: () => {
        trackEvent("GET-PAGE-ID");
        runScriptInCurrentTab(getPageId, [], "MAIN");
      },
    },
    {
      icon: `<i class="fa-solid fa-fingerprint fa-lg"></i>`,
      text: { en: "Get fb_dtsg", vi: "Lấy fb_dtsg" },
      func: () => {
        trackEvent("GET-FB-DTSG");
        runScriptInCurrentTab(getFbDtsg, [], "MAIN");
      },
    },
    { type: "separator", title: { en: "⚙️ Settings", vi: "⚙️ Cài đặt" } },
    {
      icon: '<i class="fa-solid fa-headset fa-lg"></i>',
      text: { en: "Need Support?", vi: "Cần hỗ trợ?" },
      func: () => {
        trackEvent("SUPPORT");
        window.open(
          "https://www.facebook.com/groups/1154059318582088",
          "_blank"
        );
      },
    },
    {
      icon: '<i class="fa-solid fa-earth-americas fa-lg"></i>',
      text: {
        en: "🇬🇧 English / <s style='color:gray'>Tiếng Việt</s>",
        vi: "<s style='color:gray'>English</s> / 🇻🇳 Tiếng Việt",
      },
      func: () => {
        const currentLang = getLang();
        const newLang = currentLang === "en" ? "vi" : "en";
        trackEvent("CHANGE-LANG-" + newLang);
        setLang(newLang);
        renderBtns();
      },
    },
    {
      icon: '<i class="fa-solid fa-trash fa-lg"></i>',
      text: {
        en: "Clear net-request rules",
        vi: "Xoá net-request rules",
      },
      func: async () => {
        trackEvent("CLEAR-RULES");
        const rules = await chrome.declarativeNetRequest.getDynamicRules();
        if (
          confirm(
            t({
              en:
                "Only use this feature when FB AIO not running correctly.\nContact support for more info.\n\nDo you want to CLEAR " +
                rules.length +
                " RULES?",
              vi:
                "Chỉ dùng chức năng này nếu FB AIO hoạt động không chính xác.\nLiên hệ hỗ trợ để biết thêm chi tiết\n\nBạn có muốn XOÁ " +
                rules.length +
                "rules?",
            })
          )
        )
          await chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: rules.map((rule) => rule.id),
          });
      },
    },
  ];
  btns.forEach(genBtn);
}

function genBtn(config, i) {
  if (config === "separator") {
    root.appendChild(document.createElement("hr"));
  } else if (config.type === "separator") {
    const hr = document.createElement("div");
    hr.innerText = t(config.title);
    hr.classList.add("separator");
    hr.style.animationDelay = `${i * 50}ms`;
    root.appendChild(hr);
  } else {
    const { icon, text, func } = config;
    const btn = createButton(icon, t(text), func);
    btn.style.animationDelay = `${i * 50}ms`;
    root.appendChild(btn);
  }
}

function createButton(icon, text, func) {
  const button = document.createElement("button");
  button.classList.add("script-btn");
  if (icon) {
    const span = document.createElement("span");
    span.classList.add("icon");
    span.innerHTML = icon;
    button.appendChild(span);
  }

  const title = document.createElement("span");
  title.innerHTML = text;
  button.appendChild(title);

  button.addEventListener("click", func);
  return button;
}

async function getUid() {
  let uid = await getUidFromUrl(location.href);
  if (uid) return prompt(`USER ID of ${document.title}:`, uid);

  const find = (r) => (r ? r[0] : 0);
  uid =
    find(
      /(?<=\"userID\"\:\")(.\d+?)(?=\")/.exec(
        document.querySelector("html").textContent
      )
    ) ||
    find(/(?<=\/profile\.php\?id=)(.\d+?)($|(?=&))/.exec(location.href)) ||
    (() => {
      for (let a of Array.from(document.querySelectorAll("a"))) {
        let _ = find(
          /(?<=set\=(pb|picfp|ecnf|pob)\.)(.\d+?)($|(?=\.))/.exec(a.href)
        );
        if (_) return _;
      }
      return 0;
    })() ||
    find(
      /(?<=\"user\"\:\{\"id\"\:\")(.\d+?)(?=\")/.exec(document.body.innerHTML)
    );

  if (uid) prompt(`USER ID of ${document.title}:`, uid);
  else
    prompt(
      "Cannot find any USER ID in this website!\n Demo website: ",
      "https://www.facebook.com/callchoulnhe"
    );

  async function getUidFromUrl(url) {
    let methods = [
      () => require("CometRouteStore").getRoute(url).rootView.props.userID,
      async () => {
        let response = await fetch(url);
        if (response.status == 200) {
          let text = await response.text();
          let uid = /(?<="userID":")(.\d+?)(?=")/.exec(text);
          if (uid?.length) {
            return uid[0];
          }
        }
        return null;
      },
    ];

    for (let m of methods) {
      try {
        let uid = await m();
        if (uid) return uid;
      } catch (e) {}
    }
    return null;
  }
}

async function getPageId() {
  let funcs = [
    () =>
      require("CometRouteStore").getRoute(location.pathname).rootView.props
        .userID,
    () => /(?<=\"pageID\"\:\")(.*?)(?=\")/.exec(document.body.innerHTML)[0],
    () => /(?<=facebook\.com\/)(.*?)($|(?=\/)|(?=&))/.exec(location.href)[0],
    () => {
      const tags = Array.from(
        document.body.querySelectorAll("script:not([src])")
      );
      for (const tag of tags) {
        let matches = tag.textContent.match(/"pageID":"([0-9]+)"/);
        if (matches) {
          return matches[1];
        }
      }
      return null;
    },
  ];

  for (let fn of funcs) {
    try {
      let result = fn();
      if (result) {
        prompt("Page ID:", result);
        return;
      }
    } catch (e) {}
  }

  prompt(
    "Cannot find any Page ID in this website!\nDemo website:",
    "https://www.facebook.com/ColourfulSpace"
  );
}

async function getGroupId() {
  const group_name = document.title;
  const found = (check) => {
    if (check && check[0]) {
      prompt(`GROUP ID của ${group_name}:`, check[0]);
      return true;
    }
    return false;
  };
  if (found(/(?<=\/groups\/)(.\d+?)($|(?=\/)|(?=&))/.exec(location.href)))
    return;
  const list_a = document.querySelectorAll("a");
  for (let a of Array.from(list_a)) {
    if (found(/(?<=\/groups\/)(.\d+?)(?=\/user\/)/.exec(a.href))) return;
  }
  prompt(
    "Cannot find any Group ID in this website!\nDemo website:",
    "https://www.facebook.com/groups/fbaio"
  );
}

function getFbDtsg() {
  let token;
  try {
    token = require?.("DTSG")?.getToken?.();
  } catch (e) {}
  if (token) {
    prompt("Your fb_dtsg token: ", token);
  } else {
    prompt(
      "Cannot find any fb_dtsg token in this website!\nDemo website:",
      "https://www.facebook.com"
    );
  }
}

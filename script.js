// ====== عدّل بياناتك هنا ======
const APP_NAME_EN = "TAKAH";
const APP_NAME_AR = "طقة";
const DEVELOPER_NAME = "Turki Fahad Almutairi";
const SUPPORT_EMAIL = "turki@fahads.sa"; // خليها lowercase
const LAST_UPDATED = "2026-02-11";       // عدّلها كل ما حدثت السياسة
// ==============================

const els = {
  html: document.documentElement,

  // Splash
  splash: document.getElementById("splash"),
  splashTitle: document.getElementById("splashTitle"),
  splashSub: document.getElementById("splashSub"),

  // Language switch
  langSwitch: document.getElementById("filter"),

  // Toast
  toast: document.getElementById("toast"),

  // Header / page
  pageTitle: document.getElementById("pageTitle"),
  appNameBadge: document.getElementById("appNameBadge"),
  lastUpdatedLine: document.getElementById("lastUpdatedLine"),

  // Policy blocks
  policyEN: document.getElementById("policyEN"),
  policyAR: document.getElementById("policyAR"),

  appNameInlineEN: document.getElementById("appNameInlineEN"),
  appNameInlineAR: document.getElementById("appNameInlineAR"),
  supportEmailInlineEN: document.getElementById("supportEmailInlineEN"),
  supportEmailInlineAR: document.getElementById("supportEmailInlineAR"),

  // Developer page
  devTitle: document.getElementById("devTitle"),
  devNameLabel: document.getElementById("devNameLabel"),
  devEmailLabel: document.getElementById("devEmailLabel"),
  devNameValue: document.getElementById("devNameValue"),
  devEmailValue: document.getElementById("devEmailValue"),
  devNote: document.getElementById("devNote"),

  // Store sentence
  storeTitle: document.getElementById("storeTitle"),
  storeSentenceEN: document.getElementById("storeSentenceEN"),
  storeSentenceAR: document.getElementById("storeSentenceAR"),

  // Footer
  footerText: document.getElementById("footerText"),

  // Pages (tabs)
  pagePolicy: document.getElementById("pagePolicy"),
  pageDev: document.getElementById("pageDev"),
  pageAbout: document.getElementById("pageAbout"),

  // Bottom tabs radios
  radios: Array.from(document.querySelectorAll('.radio-inputs input[type="radio"][data-tab]')),
  tabPolicyLabel: document.getElementById("tabPolicyLabel"),
  tabDevLabel: document.getElementById("tabDevLabel"),
  tabAboutLabel: document.getElementById("tabAboutLabel"),
};

// ---------- Helpers ----------
function showToast(msg) {
  if (!els.toast) return;
  els.toast.textContent = msg;
  els.toast.classList.add("show");
  setTimeout(() => els.toast.classList.remove("show"), 1400);
}

function safeSetText(el, text) {
  if (!el) return;
  el.textContent = text;
}

function safeToggleClass(el, cls, enabled) {
  if (!el) return;
  el.classList.toggle(cls, enabled);
}

function getAppName(isAR) {
  return isAR ? APP_NAME_AR : APP_NAME_EN;
}

// ---------- Data binding ----------
function setDeveloperInfo() {
  // Badge usually English brand name
  safeSetText(els.appNameBadge, APP_NAME_EN);

  safeSetText(els.devNameValue, DEVELOPER_NAME);

  if (els.devEmailValue) {
    els.devEmailValue.textContent = SUPPORT_EMAIL;
    els.devEmailValue.href = `mailto:${SUPPORT_EMAIL}`;
  }

  safeSetText(els.supportEmailInlineEN, SUPPORT_EMAIL);
  safeSetText(els.supportEmailInlineAR, SUPPORT_EMAIL);

  safeSetText(els.appNameInlineEN, APP_NAME_EN);
  safeSetText(els.appNameInlineAR, APP_NAME_AR);
}

// ---------- Language ----------
function detectDefaultLang() {
  const saved = localStorage.getItem("pp_lang");
  if (saved === "ar" || saved === "en") return saved;

  const nav = (navigator.language || "en").toLowerCase();
  return nav.startsWith("ar") ? "ar" : "en";
}

function setLang(lang) {
  const isAR = lang === "ar";

  if (els.html) {
    els.html.lang = isAR ? "ar" : "en";
    els.html.dir = isAR ? "rtl" : "ltr";
  }

  safeToggleClass(els.policyAR, "hidden", !isAR);
  safeToggleClass(els.policyEN, "hidden", isAR);

  // Sync switch: checked => Arabic
  if (els.langSwitch) els.langSwitch.checked = isAR;

  if (isAR) {
    document.title = "سياسة الخصوصية";
    safeSetText(els.pageTitle, "سياسة الخصوصية");
    safeSetText(els.lastUpdatedLine, `آخر تحديث: ${LAST_UPDATED}`);

    safeSetText(els.storeTitle, "جملة الخصوصية للمتجر");

    safeSetText(els.devTitle, "معلومات المطوّر");
    safeSetText(els.devNameLabel, "مطور التطبيقات:");
    safeSetText(els.devEmailLabel, "البريد للدعم:");
    safeSetText(els.devNote, "هذه الصفحة مقدمة من مطوّر التطبيق للشفافية ومتطلبات المتاجر.");

    safeSetText(els.tabPolicyLabel, "السياسة");
    safeSetText(els.tabDevLabel, "المطور");
    safeSetText(els.tabAboutLabel, "نبذة");

    safeSetText(els.splashTitle, APP_NAME_AR);
    safeSetText(els.splashSub, "صفحة سياسة الخصوصية");
  } else {
    document.title = "Privacy Policy";
    safeSetText(els.pageTitle, "Privacy Policy");
    safeSetText(els.lastUpdatedLine, `Last Updated: ${LAST_UPDATED}`);

    safeSetText(els.storeTitle, "Store Listing Sentence");

    safeSetText(els.devTitle, "Developer");
    safeSetText(els.devNameLabel, "Name:");
    safeSetText(els.devEmailLabel, "Support Email:");
    safeSetText(els.devNote, "This page is provided by the app developer for transparency and store compliance.");

    safeSetText(els.tabPolicyLabel, "Policy");
    safeSetText(els.tabDevLabel, "Developer");
    safeSetText(els.tabAboutLabel, "About");

    safeSetText(els.splashTitle, APP_NAME_EN);
    safeSetText(els.splashSub, "Privacy Policy Page");
  }

  safeSetText(
    els.footerText,
    `${getAppName(isAR)} • ${isAR ? "آخر تحديث" : "Last Updated"}: ${LAST_UPDATED}`
  );

  localStorage.setItem("pp_lang", lang);
}

function initLangSwitch() {
  if (!els.langSwitch) return;

  els.langSwitch.addEventListener("change", () => {
    setLang(els.langSwitch.checked ? "ar" : "en");
  });
}

// ---------- Tabs ----------
function setTab(tab) {
  safeToggleClass(els.pagePolicy, "active", tab === "policy");
  safeToggleClass(els.pageDev, "active", tab === "dev");
  safeToggleClass(els.pageAbout, "active", tab === "about");
}

function initTabs() {
  if (!els.radios || els.radios.length === 0) return;

  els.radios.forEach((r) => {
    r.addEventListener("change", () => {
      if (r.checked) setTab(r.dataset.tab);
    });
  });
}

function initCopy() {
  // Copy functionality removed - logo placed in top-actions instead
}

// ---------- Splash ----------
function initSplash() {
  if (!els.splash) return;

  const ms = 2200;
  setTimeout(() => {
    els.splash.classList.add("hide");
    setTimeout(() => {
      try { els.splash.remove(); } catch {}
    }, 520);
  }, ms);
}

// ---------- Dark Mode ----------
function initDarkMode() {
  const html = document.documentElement;
  const topbar = document.querySelector('.topbar');
  const bottomNav = document.querySelector('.bottom-nav');

  const saved = localStorage.getItem('color-scheme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved === 'dark' || (saved === null && prefersDark);

  function applyMode(dark) {
    if (dark) {
      html.classList.add('dark');
      if (topbar) topbar.classList.add('dark-mode');
      if (bottomNav) bottomNav.classList.add('dark-mode');
    } else {
      html.classList.remove('dark');
      if (topbar) topbar.classList.remove('dark-mode');
      if (bottomNav) bottomNav.classList.remove('dark-mode');
    }
    localStorage.setItem('color-scheme', dark ? 'dark' : 'light');
  }

  applyMode(isDark);
}

// ---------- Init ----------
(function init() {
  setDeveloperInfo();
  setLang(detectDefaultLang());

  initLangSwitch();
  initTabs();
  initCopy();
  initSplash();
  initDarkMode();

  setTab("policy");
})();

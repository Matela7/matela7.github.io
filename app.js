/* Buildless: works from a static host or by opening index.html. */
(() => {
  "use strict";
  const REPOSITORY = "Matela7/platon";
  const RELEASES_URL = `https://github.com/${REPOSITORY}/releases`;
  const API_URL = `https://api.github.com/repos/${REPOSITORY}/releases/latest`;
  const copy = {
    en: {
      title: "Platon — A clearer view of your documents",
      skip: "Skip to content",
      nav: "Main navigation",
      navProject: "The project",
      navDownload: "Download",
      eyebrow: "LOCAL MODELS. BIG IDEAS.",
      heroLine1: "Your documents.",
      heroLine2: "A clearer view.",
      heroDescription:
        "Meet Platon. A local AI workspace that turns your documents into answers, connects ideas, and brings a small team of agents to your next question.",
      heroCta: "Find your version",
      heroCode: "Explore the code",
      heroNote: "A desktop home for your local AI.",
      previewLabel: "A LOOK INSIDE",
      illustration: "Illustrative conversation",
      local: "local",
      workspace: "Your workspace",
      examples: "Preview examples",
      tabDocuments: "Understand",
      tabResearch: "Research",
      tabCreate: "Create",
      composer: "Where shall we begin?",
      corgiAlt: "Pixel Corgi, the Platon companion",
      corgiHello: "A little company for big questions.",
      corgiName: "YOUR DESK COMPANION",
      stackLabel: "BUILT ON GOOD FOUNDATIONS",
      projectEyebrow: "LESS SEARCHING. MORE UNDERSTANDING.",
      projectTitle: "A small team.<br>A shared train of thought.",
      projectIntro:
        "You ask the question. Platon finds the right way forward — a direct answer, a passage in your files, or a specialist with the tools to help.",
      feature1Title: "Put your documents in conversation.",
      feature1Text:
        "Search, compare, and summarise PDF, DOCX, and text collections. Semantic retrieval brings relevant passages into the answer, with document and page references.",
      feature2Title: "Different minds for different tasks.",
      feature2Text:
        "A supervisor coordinates document, research, and coding agents. Find public information, work with local files, and review actions before they happen.",
      tagDocuments: "Documents",
      tagResearch: "Research",
      tagCode: "Code & files",
      feature3Title: "Your machine. Your workspace.",
      feature3Text:
        "Ollama runs the language models locally. Conversations, collections, and agent memory stay on your machine. External research and optional integrations use their respective online services.",
      architecture: "Meet the architecture",
      downloadEyebrow: "MAKE YOURSELF AT HOME",
      downloadTitle: "A place on your desktop.",
      releaseLoading: "Checking the latest release…",
      releaseFallback: "Check releases on GitHub",
      releaseLatest: "Latest release:",
      viewReleases: "View releases",
      downloadNow: "Download installer",
      windowsDescription:
        "x64 · Bundled Python<br>Image generation with NVIDIA / CUDA",
      macosDescription:
        "Apple Silicon · macOS 15+<br>Local chat, documents, and agents",
      linuxDescription:
        "x64 · glibc 2.35+<br>Local chat, documents, and agents",
      windowsDetail: "NSIS installer · .exe",
      macosDetail: "Disk image · .dmg",
      linuxDetail: "AppImage / Debian package",
      downloadNote:
        "First launch prepares Ollama and downloads both Gemma models. Windows also prepares the image generator. Allow internet access and plenty of disk space for model downloads.",
      allReleases: "All releases & release notes",
      closingEyebrow: "A PROJECT IN PROGRESS",
      closingTitle: "Curiosity is a good<br>place to start.",
      closingText:
        "Platon is an engineering project exploring local language models, document retrieval, and agent collaboration. Follow its development, read the code, or bring a new idea to the discussion.",
      closingCta: "Take a look on GitHub",
      sceneComment: "Ready when you are.",
      footer: "Local intelligence. A little more personal.",
    },
    pl: {
      title: "Platon — Spójrz na swoje dokumenty inaczej",
      skip: "Przejdź do treści",
      nav: "Nawigacja główna",
      navProject: "O projekcie",
      navDownload: "Pobierz",
      eyebrow: "LOKALNE MODELE. WIELKIE POMYSŁY.",
      heroLine1: "Twoje dokumenty.",
      heroLine2: "Nowe spojrzenie.",
      heroDescription:
        "Poznaj Platon. Lokalną przestrzeń AI, w której dokumenty stają się odpowiedziami, pomysły się łączą, a mały zespół agentów pomaga przy kolejnym pytaniu.",
      heroCta: "Wybierz swoją wersję",
      heroCode: "Zajrzyj do kodu",
      heroNote: "Miejsce dla lokalnego AI na Twoim pulpicie.",
      previewLabel: "ZAJRZYJ DO ŚRODKA",
      illustration: "Przykładowa rozmowa",
      local: "lokalnie",
      workspace: "Twoja przestrzeń",
      examples: "Przykłady zastosowań",
      tabDocuments: "Zrozum",
      tabResearch: "Sprawdź",
      tabCreate: "Stwórz",
      composer: "Od czego zaczynamy?",
      corgiAlt: "Pixel Corgi, towarzysz w aplikacji Platon",
      corgiHello: "Mały kompan do wielkich pytań.",
      corgiName: "TWÓJ TOWARZYSZ PRACY",
      stackLabel: "ZBUDOWANY NA DOBRYCH PODSTAWACH",
      projectEyebrow: "MNIEJ SZUKANIA. WIĘCEJ ZROZUMIENIA.",
      projectTitle: "Mały zespół.<br>Wspólny tok myślenia.",
      projectIntro:
        "Ty zadajesz pytanie. Platon dobiera drogę do odpowiedzi — bezpośrednią rozmowę, fragment Twoich plików lub specjalistę z odpowiednimi narzędziami.",
      feature1Title: "Porozmawiaj ze swoimi dokumentami.",
      feature1Text:
        "Przeszukuj, porównuj i podsumowuj kolekcje PDF, DOCX i TXT. Wyszukiwanie semantyczne dostarcza trafne fragmenty wraz z odwołaniami do dokumentów i stron.",
      feature2Title: "Różne zadania, różni specjaliści.",
      feature2Text:
        "Koordynator łączy pracę agentów dokumentów, researchu i kodowania. Znajduj publiczne informacje, pracuj z lokalnymi plikami i zatwierdzaj działania przed ich wykonaniem.",
      tagDocuments: "Dokumenty",
      tagResearch: "Research",
      tagCode: "Kod i pliki",
      feature3Title: "Twój komputer. Twoja przestrzeń.",
      feature3Text:
        "Ollama uruchamia modele językowe lokalnie. Rozmowy, kolekcje i pamięć agentów pozostają na Twoim komputerze. Research i opcjonalne integracje korzystają z odpowiednich usług internetowych.",
      architecture: "Poznaj architekturę",
      downloadEyebrow: "ROZGOŚĆ SIĘ",
      downloadTitle: "Miejsce na Twoim pulpicie.",
      releaseLoading: "Sprawdzanie najnowszej wersji…",
      releaseFallback: "Sprawdź wydania na GitHubie",
      releaseLatest: "Najnowsza wersja:",
      viewReleases: "Zobacz wydania",
      downloadNow: "Pobierz instalator",
      windowsDescription:
        "x64 · Python w pakiecie<br>Generowanie obrazów z NVIDIA / CUDA",
      macosDescription:
        "Apple Silicon · macOS 15+<br>Lokalny czat, dokumenty i agenci",
      linuxDescription: "x64 · glibc 2.35+<br>Lokalny czat, dokumenty i agenci",
      windowsDetail: "Instalator NSIS · .exe",
      macosDetail: "Obraz dysku · .dmg",
      linuxDetail: "AppImage / pakiet Debian",
      downloadNote:
        "Pierwsze uruchomienie przygotowuje Ollamę i pobiera oba modele Gemma. Na Windowsie również generator obrazów. Potrzebujesz internetu i odpowiednio dużo miejsca na modele.",
      allReleases: "Wszystkie wydania i lista zmian",
      closingEyebrow: "PROJEKT, KTÓRY SIĘ ROZWIJA",
      closingTitle: "Ciekawość to dobry<br>punkt wyjścia.",
      closingText:
        "Platon to projekt inżynierski poświęcony lokalnym modelom językowym, wyszukiwaniu w dokumentach i współpracy agentów. Śledź rozwój, przeczytaj kod lub dołącz z nowym pomysłem.",
      closingCta: "Zajrzyj na GitHub",
      sceneComment: "Gotowy, kiedy Ty jesteś.",
      footer: "Lokalna inteligencja. Trochę bliżej Ciebie.",
    },
  };
  const demos = {
    documents: {
      en: {
        question: "Compare these two reports. What changed?",
        role: "Document agent",
        answer:
          "The second report gives more detail on the implementation. The goals are unchanged, but the evaluation now includes response quality alongside execution time.",
        evidence: ["report-v1.pdf · p. 4", "report-v2.pdf · p. 7"],
      },
      pl: {
        question: "Porównaj te dwa raporty. Co się zmieniło?",
        role: "Agent dokumentów",
        answer:
          "Drugi raport dokładniej opisuje implementację. Cele pozostały bez zmian, ale ocena uwzględnia teraz jakość odpowiedzi obok czasu wykonania.",
        evidence: ["raport-v1.pdf · s. 4", "raport-v2.pdf · s. 7"],
      },
    },
    research: {
      en: {
        question: "Find sources that explain this idea.",
        role: "Research agent",
        answer:
          "I can look for public sources and bring the references back into our conversation. Your private document collection stays with the document agent.",
        evidence: ["Public web sources", "References included"],
      },
      pl: {
        question: "Znajdź źródła, które wyjaśniają ten pomysł.",
        role: "Agent researchu",
        answer:
          "Mogę poszukać publicznych źródeł i dołączyć odnośniki do rozmowy. Twoja prywatna kolekcja dokumentów pozostaje w obszarze agenta dokumentów.",
        evidence: ["Publiczne źródła", "Odnośniki w odpowiedzi"],
      },
    },
    create: {
      en: {
        question: "Turn these findings into a short document.",
        role: "Coding agent",
        answer:
          "The coding agent can format the supplied findings into a local file. You review and approve file changes and command execution before they proceed.",
        evidence: ["Local workspace", "Approval before changes"],
      },
      pl: {
        question: "Zamień te ustalenia w krótki dokument.",
        role: "Agent kodowania",
        answer:
          "Agent kodowania może zapisać przekazane ustalenia w lokalnym pliku. Przed zmianami w plikach i wykonaniem poleceń przeglądasz i zatwierdzasz działania.",
        evidence: ["Lokalna przestrzeń", "Zatwierdzanie zmian"],
      },
    },
  };
  let language = navigator.language?.toLowerCase().startsWith("pl")
    ? "pl"
    : "en";
  try {
    const saved = localStorage.getItem("platon.site.language");
    if (saved === "pl" || saved === "en") language = saved;
  } catch {
    /* Storage may be unavailable under file://. */
  }
  let selectedDemo = "documents";
  let release = null;
  let releaseState = "loading";

  function setCopy(element, value) {
    const lines = value.split("<br>");
    element.replaceChildren(
      ...lines.flatMap((line, index) =>
        index
          ? [document.createElement("br"), document.createTextNode(line)]
          : [document.createTextNode(line)],
      ),
    );
  }
  function renderDemo() {
    const demo = demos[selectedDemo][language];
    document.querySelector("#demo-question").textContent = demo.question;
    document.querySelector("#demo-role").textContent = demo.role;
    document.querySelector("#demo-answer").textContent = demo.answer;
    document.querySelector("#demo-evidence").replaceChildren(
      ...demo.evidence.map((text) => {
        const tag = document.createElement("span");
        tag.textContent = text;
        return tag;
      }),
    );
    document
      .querySelectorAll("[data-demo]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.demo === selectedDemo),
        ),
      );
    document.querySelector("#hero-corgi").src =
      selectedDemo === "documents"
        ? "assets/corgi-waving.gif"
        : selectedDemo === "research"
          ? "assets/corgi-running.gif"
          : "assets/corgi-idle.gif";
  }
  function safeAssetURL(asset) {
    if (!asset || typeof asset.browser_download_url !== "string") return null;
    try {
      const url = new URL(asset.browser_download_url);
      return url.protocol === "https:" &&
        url.hostname === "github.com" &&
        !url.username &&
        !url.password &&
        url.pathname.startsWith(`/${REPOSITORY}/releases/download/`)
        ? url.href
        : null;
    } catch {
      return null;
    }
  }
  function renderRelease() {
    const text = copy[language];
    document.querySelector("#release-status").textContent =
      releaseState === "loading"
        ? text.releaseLoading
        : release
          ? `${text.releaseLatest} ${String(release.tag_name || release.name || "").slice(0, 60)}`
          : text.releaseFallback;
    const assets = Array.isArray(release?.assets)
      ? release.assets.filter(
          (asset) => typeof asset.name === "string" && safeAssetURL(asset),
        )
      : [];
    const choices = {
      windows: assets.find(
        (asset) =>
          /\.exe$/i.test(asset.name) && !/(uninstall|arm64)/i.test(asset.name),
      ),
      macos: assets.find(
        (asset) =>
          /\.dmg$/i.test(asset.name) && !/intel|x64|x86_64/i.test(asset.name),
      ),
      linux:
        assets.find(
          (asset) =>
            /\.appimage$/i.test(asset.name) &&
            !/arm64|aarch64|armv7/i.test(asset.name),
        ) ||
        assets.find(
          (asset) =>
            /\.deb$/i.test(asset.name) &&
            !/arm64|aarch64|armv7/i.test(asset.name),
        ),
    };
    for (const [platform, asset] of Object.entries(choices)) {
      const link = document.querySelector(`#download-${platform}`);
      link.href = asset ? safeAssetURL(asset) : RELEASES_URL;
      link.classList.toggle("available", Boolean(asset));
      link.querySelector("[data-download-label]").textContent = asset
        ? text.downloadNow
        : text.viewReleases;
      link.lastElementChild.textContent = asset ? "↓" : "↗";
      const detail = link.parentElement.querySelector("[data-download-detail]");
      detail.textContent =
        asset && Number.isFinite(asset.size) && asset.size > 0
          ? `${Math.round(asset.size / 1_000_000)} MB · ${asset.name.split(".").pop().toUpperCase()}`
          : text[`${platform}Detail`];
    }
  }
  function renderLanguage() {
    document.documentElement.lang = language;
    document.title = copy[language].title;
    document.querySelector('meta[name="description"]').content =
      copy[language].heroDescription;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = copy[language][element.dataset.i18n];
      if (value) setCopy(element, value);
    });
    document
      .querySelectorAll("[data-i18n-aria]")
      .forEach((element) =>
        element.setAttribute(
          "aria-label",
          copy[language][element.dataset.i18nAria],
        ),
      );
    document
      .querySelectorAll("[data-i18n-alt]")
      .forEach(
        (element) => (element.alt = copy[language][element.dataset.i18nAlt]),
      );
    document
      .querySelectorAll("[data-lang]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.lang === language),
        ),
      );
    renderDemo();
    renderRelease();
  }
  document.querySelectorAll("[data-lang]").forEach((button) =>
    button.addEventListener("click", () => {
      language = button.dataset.lang;
      try {
        localStorage.setItem("platon.site.language", language);
      } catch {
        /* The page still works without storage. */
      }
      renderLanguage();
    }),
  );
  document.querySelectorAll("[data-demo]").forEach((button) =>
    button.addEventListener("click", () => {
      selectedDemo = button.dataset.demo;
      renderDemo();
    }),
  );
  renderLanguage();
  async function loadRelease() {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch(API_URL, {
        signal: controller.signal,
        headers: { Accept: "application/vnd.github+json" },
      });
      if (!response.ok) throw new Error("Release unavailable");
      const result = await response.json();
      if (
        !result ||
        typeof result !== "object" ||
        result.draft ||
        result.prerelease ||
        !Array.isArray(result.assets)
      )
        throw new Error("Invalid release");
      release = result;
    } catch {
      release = null;
    } finally {
      clearTimeout(timer);
      releaseState = "complete";
      renderRelease();
    }
  }
  void loadRelease();
})();

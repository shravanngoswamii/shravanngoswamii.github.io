type GiscusWindowFlags = Window & {
  __giscusGlobalInitAttached?: boolean;
  __giscusThemeObserverAttached?: boolean;
};

function getCurrentTheme(): string {
  const fromAttr = document.documentElement.getAttribute("data-theme");
  if (fromAttr) return fromAttr;

  const fromStorage = localStorage.getItem("theme");
  if (fromStorage && fromStorage !== "auto") return fromStorage;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function mountGiscus(): void {
  const containers = document.querySelectorAll(".giscus[data-giscus-mapping]");
  if (containers.length === 0) return;

  containers.forEach(container => {
    if (!(container instanceof HTMLElement)) return;
    if (container.dataset.giscusMounted === "1") return;

    container.dataset.giscusMounted = "1";
    container.innerHTML = "";

    const mapping = container.dataset.giscusMapping || "url";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "shravanngoswamii/comments");
    script.setAttribute("data-repo-id", "R_kgDOQ90dlg");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDOQ90dls4C1NXa");
    script.setAttribute("data-mapping", mapping);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", getCurrentTheme());
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;

    container.appendChild(script);
  });
}

function updateGiscusTheme(): void {
  const iframe = document.querySelector("iframe.giscus-frame");
  if (!(iframe instanceof HTMLIFrameElement)) return;

  iframe.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: getCurrentTheme() } } },
    "https://giscus.app",
  );
}

function initGiscus(): void {
  mountGiscus();
  setTimeout(updateGiscusTheme, 100);
}

export function initGiscusGlobal(): void {
  const win = window as GiscusWindowFlags;
  if (win.__giscusGlobalInitAttached) return;
  win.__giscusGlobalInitAttached = true;

  if (!win.__giscusThemeObserverAttached) {
    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          updateGiscusTheme();
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    win.__giscusThemeObserverAttached = true;
  }

  document.addEventListener("astro:page-load", initGiscus);
  document.addEventListener("astro:after-swap", initGiscus);

  initGiscus();
}

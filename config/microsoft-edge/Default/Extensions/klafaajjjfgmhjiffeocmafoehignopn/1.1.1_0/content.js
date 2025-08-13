(function () {
  const lightGreen = "#c3ddb6";
  const darkGreen = "#66c91b";
  const lightOrange = "#f8cc9d";
  const darkOrange = "#ff9c24";

  const introducedClasses = [
    "hover-padding-highlight",
    "hover-margin-highlight",
    "margin-indicator",
    "padding-indicator",
    "element-hover-outline",
  ];

  function getCleanClassList(el) {
    return Array.from(el.classList)
      .filter((className) => !introducedClasses.includes(className))
      .join(" ");
  }

  let debouncedHandleMouseOver;
  let globalTooltip;
  let styleElement;

  function applyInitialStyles(el) {
    const style = getComputedStyle(el);

    const paddingTop = parseInt(style.paddingTop, 10);
    const paddingRight = parseInt(style.paddingRight, 10);
    const paddingBottom = parseInt(style.paddingBottom, 10);
    const paddingLeft = parseInt(style.paddingLeft, 10);

    el.style.setProperty(
      "--padding-box-shadow",
      `inset 0 ${paddingTop}px 0 0 var(--light-green), inset -${paddingRight}px 0 0 0 var(--light-green), inset 0 -${paddingBottom}px 0 0 var(--light-green), inset ${paddingLeft}px 0 0 0 var(--light-green)`
    );
    el.style.setProperty(
      "--hover-padding-box-shadow",
      `inset 0 ${paddingTop}px 0 0 var(--dark-green), inset -${paddingRight}px 0 0 0 var(--dark-green), inset 0 -${paddingBottom}px 0 0 var(--dark-green), inset ${paddingLeft}px 0 0 0 var(--dark-green)`
    );

    const marginTop =
      style.marginTop === "auto" ? "auto" : parseInt(style.marginTop, 10);
    const marginRight =
      style.marginRight === "auto" ? "auto" : parseInt(style.marginRight, 10);
    const marginBottom =
      style.marginBottom === "auto" ? "auto" : parseInt(style.marginBottom, 10);
    const marginLeft =
      style.marginLeft === "auto" ? "auto" : parseInt(style.marginLeft, 10);

    if (marginTop !== "auto" && marginTop > 0) {
      el.style.position = "relative";
      el.insertAdjacentHTML(
        "beforeend",
        `<div class="margin-indicator margin-top" style="position: absolute; top: -${marginTop}px; left: 0; right: 0; height: ${marginTop}px;"></div>`
      );
    }
    if (marginRight !== "auto" && marginRight > 0) {
      el.style.position = "relative";
      el.insertAdjacentHTML(
        "beforeend",
        `<div class="margin-indicator margin-right" style="position: absolute; top: 0; right: -${marginRight}px; bottom: 0; width: ${marginRight}px;"></div>`
      );
    }
    if (marginBottom !== "auto" && marginBottom > 0) {
      el.style.position = "relative";
      el.insertAdjacentHTML(
        "beforeend",
        `<div class="margin-indicator margin-bottom" style="position: absolute; bottom: -${marginBottom}px; left: 0; right: 0; height: ${marginBottom}px;"></div>`
      );
    }
    if (marginLeft !== "auto" && marginLeft > 0) {
      el.style.position = "relative";
      el.insertAdjacentHTML(
        "beforeend",
        `<div class="margin-indicator margin-left" style="position: absolute; top: 0; left: -${marginLeft}px; bottom: 0; width: ${marginLeft}px;"></div>`
      );
    }

    el.classList.add("padding-indicator");
  }

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  function handleMouseOver(e) {
    const el = e.target;

    document
      .querySelectorAll(".hover-padding-highlight")
      .forEach((highlightedEl) => {
        highlightedEl.classList.remove("hover-padding-highlight");
      });
    document.querySelectorAll(".hover-margin-highlight").forEach((marginEl) => {
      marginEl.classList.remove("hover-margin-highlight");
    });
    document
      .querySelectorAll(".element-hover-outline")
      .forEach((highlightedEl) => {
        highlightedEl.classList.remove("element-hover-outline");
      });

    el.classList.add("hover-padding-highlight");

    el.querySelectorAll(":scope > .margin-indicator").forEach((marginEl) => {
      marginEl.classList.add("hover-margin-highlight");
    });

    el.classList.add("element-hover-outline");

    const style = getComputedStyle(el);
    const paddingTop = parseInt(style.paddingTop, 10);
    const paddingRight = parseInt(style.paddingRight, 10);
    const paddingBottom = parseInt(style.paddingBottom, 10);
    const paddingLeft = parseInt(style.paddingLeft, 10);

    const marginTop =
      style.marginTop === "auto" ? "auto" : parseInt(style.marginTop, 10);
    const marginRight =
      style.marginRight === "auto" ? "auto" : parseInt(style.marginRight, 10);
    const marginBottom =
      style.marginBottom === "auto" ? "auto" : parseInt(style.marginBottom, 10);
    const marginLeft =
      style.marginLeft === "auto" ? "auto" : parseInt(style.marginLeft, 10);

    const computedMarginTop =
      style.marginTop === "auto" ? "auto" : `${marginTop}px`;
    const computedMarginRight =
      style.marginRight === "auto" ? "auto" : `${marginRight}px`;
    const computedMarginBottom =
      style.marginBottom === "auto" ? "auto" : `${marginBottom}px`;
    const computedMarginLeft =
      style.marginLeft === "auto" ? "auto" : `${marginLeft}px`;

    function getElementInfo(el) {
      const cleanClassList = getCleanClassList(el).split(" ").filter(Boolean);
      const className =
        cleanClassList.length > 0 ? "." + cleanClassList.join(".") : "";
      return `${el.tagName.toLowerCase()}${className}`;
    }

    const elementRect = el.getBoundingClientRect();
    const elementDimensions = `${elementRect.width}px &times; ${elementRect.height}px`;

    globalTooltip.innerHTML = `
      <div class="flex-box-row">
        <div class="element-info">${getElementInfo(el)}</div>
        <div class="element-dimensions text-right">${elementDimensions}</div>
      </div>
      <div class="flex-box-row"><div class="">Padding</div><div class="padding text-right">Top ${paddingTop}px, Right ${paddingRight}px, Bottom ${paddingBottom}px, Left ${paddingLeft}px</div></div>
      <div class="flex-box-row"><div class="">Margin</div><div class="margin text-right">Top ${computedMarginTop}, Right ${computedMarginRight}, Bottom ${computedMarginBottom}, Left ${computedMarginLeft}</div></div>`;

    const tooltipHeight = globalTooltip.offsetHeight;
    const tooltipWidth = globalTooltip.offsetWidth;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    let tooltipTop = elementRect.top - tooltipHeight - 10;
    let tooltipLeft =
      elementRect.left + elementRect.width / 2 - tooltipWidth / 2;

    if (tooltipTop < 0) {
      tooltipTop = 0;
    } else if (tooltipTop + tooltipHeight > viewportHeight) {
      tooltipTop = viewportHeight - tooltipHeight;
    }

    if (tooltipLeft < 0) {
      tooltipLeft = 0;
    } else if (tooltipLeft + tooltipWidth > viewportWidth) {
      tooltipLeft = viewportWidth - tooltipWidth;
    }

    if (tooltipTop + tooltipHeight > elementRect.top) {
      tooltipTop = elementRect.bottom + 10;
      if (tooltipTop + tooltipHeight > viewportHeight) {
        tooltipTop = elementRect.top - tooltipHeight - 10;
      }
    }

    if (
      tooltipLeft < elementRect.left &&
      tooltipLeft + tooltipWidth > elementRect.left
    ) {
      tooltipLeft = elementRect.left - tooltipWidth - 10;
      if (tooltipLeft < 0) {
        tooltipLeft = elementRect.right + 10;
      }
    } else if (
      tooltipLeft < elementRect.right &&
      tooltipLeft + tooltipWidth > elementRect.right
    ) {
      tooltipLeft = elementRect.right + 10;
      if (tooltipLeft + tooltipWidth > viewportWidth) {
        tooltipLeft = elementRect.left - tooltipWidth - 10;
      }
    }

    globalTooltip.style.top = `${tooltipTop}px`;
    globalTooltip.style.left = `${tooltipLeft}px`;
    globalTooltip.style.right = "revert";
    globalTooltip.style.bottom = "revert";
    globalTooltip.style.transform = "none";
    globalTooltip.style.display = "block";
  }

  function handleMouseOut(e) {
    const el = e.target;
    globalTooltip.style.left = "-9999px";
    globalTooltip.style.top = "-9999px";
    el.classList.remove("hover-padding-highlight");
    el.classList.remove("hover-margin-highlight");
    el.classList.remove("element-hover-outline");
  }

  function loadScript() {
    styleElement = document.createElement("style");
    styleElement.textContent = `
      :root {
          --light-green: ${lightGreen};
          --dark-green: ${darkGreen};
          --light-orange: ${lightOrange};
          --dark-orange: ${darkOrange};
      }
      .element-hover-outline {
          outline: 1px dashed rgba(161, 197, 233, 1);
          position: relative;
      }
      .element-hover-outline::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(161, 197, 233, 0.5);
          pointer-events: none;
          z-index: 1;
      }
      .margin-indicator {
          background-color: var(--light-orange);
          pointer-events: none;
      }
      .hover-margin-highlight {
          background-color: var(--dark-orange) !important;
      }
      .padding-indicator {
          box-shadow: var(--padding-box-shadow) !important;
      }
      .hover-padding-highlight {
          box-shadow: var(--hover-padding-box-shadow) !important;
      }
      .rc-tooltip {
          position: fixed;
          z-index: 10000;
          padding: 8px 12px;
          border: 1px solid #ccc;
          background: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          color: #333;
          font-family: Arial, sans-serif;
          font-size: 12px;
          line-height: 1.5;
          width: 350px;
          left: -9999px;
          top: -9999px;
      }
      .rc-tooltip .element-info {
          font-weight: bold;
          color: #444;
          margin-bottom: 4px;
      }
      .rc-tooltip .element-dimensions {
          font-size: 12px;
          color: #444;
          margin-bottom: 4px;
      }
      .rc-tooltip .padding {
          color: var(--dark-green);
      }
      .rc-tooltip .margin {
          color: var(--dark-orange);
      }
      .text-left {
          text-align: left;
      }
      .text-right {
          text-align: right;
      }
      .flex-box-row {
          display: flex;
          flex-direction: row;
      }
      .flex-box-row div {
          flex: 1 1 auto;
      }
    `;
    document.head.appendChild(styleElement);

    globalTooltip = document.createElement("div");
    globalTooltip.className = "rc-tooltip";
    document.body.appendChild(globalTooltip);

    document.body.addEventListener("mouseover", debouncedHandleMouseOver, true);
    document.body.addEventListener("mouseout", handleMouseOut, true);

    document.querySelectorAll("*:not(.rc-tooltip)").forEach((el) => {
      if (el !== document.documentElement) {
        applyInitialStyles(el);
      }
    });
  }

  function unloadScript() {
    document.body.removeEventListener(
      "mouseover",
      debouncedHandleMouseOver,
      true
    );
    document.body.removeEventListener("mouseout", handleMouseOut, true);

    document.querySelectorAll("*").forEach((el) => {
      el.classList.remove(
        "hover-padding-highlight",
        "hover-margin-highlight",
        "element-hover-outline"
      );
    });

    if (globalTooltip) {
      globalTooltip.remove();
    }
    if (styleElement) {
      styleElement.remove();
    }
  }

  debouncedHandleMouseOver = debounce(handleMouseOver, 50);

  document.addEventListener("unloadScript", unloadScript);
  loadScript();
})();

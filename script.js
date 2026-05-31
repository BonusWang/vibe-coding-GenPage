(function () {
  const WECHAT_ID = "wamgjt1127";
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const copyButton = document.getElementById("copy-wechat");
  const toast = document.getElementById("toast");
  const visitCount = document.getElementById("visit-count");

  function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem("preferred-theme", theme);

    const isReference = theme === "reference";
    themeToggle.setAttribute("aria-pressed", String(isReference));
    themeToggle.setAttribute("aria-label", isReference ? "切换黑绿风格" : "切换参考风格");
    themeToggle.textContent = isReference ? "◆" : "✦";
  }

  function initTheme() {
    const savedTheme = localStorage.getItem("preferred-theme");
    setTheme(savedTheme === "reference" ? "reference" : "dark");
  }

  function updateVisits() {
    const current = Number(localStorage.getItem("profile-visits") || "0") + 1;
    localStorage.setItem("profile-visits", String(current));
    visitCount.textContent = String(current);
  }

  async function copyWechatId() {
    const value = copyButton.dataset.wechat || WECHAT_ID;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(value);
        } catch {
          copyWithTextarea(value);
        }
      } else {
        copyWithTextarea(value);
      }

      showToast("✓ 已复制到剪贴板");
    } catch {
      showToast("复制失败");
    }
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toast.hideTimer);
    toast.hideTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 1600);
  }

  function copyWithTextarea(value) {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  document.querySelectorAll(".link-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -3;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 3;
      card.style.transform = `translateY(-4px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  themeToggle.addEventListener("click", () => {
    setTheme(root.dataset.theme === "reference" ? "dark" : "reference");
  });

  copyButton.addEventListener("click", copyWechatId);

  initTheme();
  updateVisits();
})();

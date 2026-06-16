document.addEventListener("DOMContentLoaded", () => {
  // =====================================
  // 🔥 GLOBAL COLLAPSE SCRIPT (Accordion)
  // =====================================
  document.querySelectorAll(".collapse-toggle").forEach((toggle) => {
    const group = toggle.closest(".collapse-group");
    const content = group.querySelector(".collapse-content");
    const arrow = group.querySelector(".collapse-arrow");

    // 💡 AUTO OPEN kalau punya class 'expand'
    if (group.classList.contains("expand")) {
      // Matikan animasi dulu
      content.style.transition = "none";
      arrow.style.transition = "none";

      // Set langsung terbuka
      content.style.maxHeight = content.scrollHeight + "px";
      arrow.classList.add("rotate-90");

      // Aktifkan lagi animasi setelah satu frame (biar klik berikut tetap smooth)
      requestAnimationFrame(() => {
        content.style.transition = "";
        arrow.style.transition = "";
      });
    }

    toggle.addEventListener("click", () => {
      const isClosed =
        content.style.maxHeight === "0px" || !content.style.maxHeight;

      // Tutup semua collapse lain
      document.querySelectorAll(".collapse-content").forEach((other) => {
        if (other !== content) {
          other.style.maxHeight = "0px";
          other
            .closest(".collapse-group")
            ?.querySelector(".collapse-arrow")
            ?.classList.remove("rotate-90");
          other.closest(".collapse-group")?.classList.remove("expand");
        }
      });

      // Toggle aktif/inaktif collapse yang diklik
      if (isClosed) {
        content.style.maxHeight = content.scrollHeight + "px";
        arrow.classList.add("rotate-90");
        group.classList.add("expand"); // simpan state terbuka
      } else {
        content.style.maxHeight = "0px";
        arrow.classList.remove("rotate-90");
        group.classList.remove("expand");
      }
    });
  });

  // =====================================
  // 🔲 ACCORDIAN GLOBAL
  // =====================================
  // MODE 1: AUTO-CLOSE (default)
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    const items = accordion.querySelectorAll(".accordion-item");

    items.forEach((item) => {
      const header = item.querySelector(".accordion-header");
      const body = item.querySelector(".accordion-body");
      const icon = header.querySelector(".fa-chevron-down");

      header.addEventListener("click", () => {
        const isOpen = !body.classList.contains("hidden");

        // Tutup semua item dalam accordion ini
        items.forEach((i) => {
          i.querySelector(".accordion-body").classList.add("hidden");
          i.querySelector(".fa-chevron-down").classList.remove("rotate-180");
        });

        // Buka item yang diklik (jika sebelumnya tertutup)
        if (!isOpen) {
          body.classList.remove("hidden");
          icon.classList.add("rotate-180");
        }
      });
    });
  });

  // MODE 2: ALWAYS OPEN (multi-open)
  const openAccordions = document.querySelectorAll(".accordion-open");

  openAccordions.forEach((accordion) => {
    const items = accordion.querySelectorAll(".accordion-item");

    items.forEach((item) => {
      const header = item.querySelector(".accordion-header");
      const body = item.querySelector(".accordion-body");
      const icon = header.querySelector(".fa-chevron-down");

      header.addEventListener("click", () => {
        body.classList.toggle("hidden");
        icon.classList.toggle("rotate-180");
      });
    });
  });

  // =====================================
  // 🔲 FULLSCREEN TOGGLE
  // =====================================
  const fullscreenBtn = document.getElementById("fullscreen-btn");
  const fullscreenBtnIcon = document.getElementById("fullscreen-btn-icon");

  if (fullscreenBtn && fullscreenBtnIcon) {
    fullscreenBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullscreenBtnIcon.classList.replace("fa-expand", "fa-compress");
      } else {
        document.exitFullscreen();
        fullscreenBtnIcon.classList.replace("fa-compress", "fa-expand");
      }
    });
  }

  // =====================================
  // ⬆️ BACK TO TOP
  // =====================================
  const backToTopButton = document.querySelector("#back-to-top");

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      const visible = window.scrollY > 90;
      backToTopButton.classList.toggle("opacity-100", visible);
      backToTopButton.classList.toggle("visible", visible);
      backToTopButton.classList.toggle("opacity-0", !visible);
      backToTopButton.classList.toggle("invisible", !visible);
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // =====================================
  // 🌈 GLOBAL MODAL DENGAN ANIMASI
  // =====================================

  // Fungsi buka modal
  const openModal = (modal) => {
    if (!modal) return;

    const content = modal.querySelector("[data-modal-content]");

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    // Delay dikit biar transisi bisa ke-trigger
    setTimeout(() => {
      modal.classList.add("opacity-100");
      content.classList.remove("scale-95", "opacity-0");
      content.classList.add("scale-100", "opacity-100");
    }, 10);

    document.body.classList.add("overflow-hidden");
  };

  // Fungsi tutup modal
  const closeModal = (modal) => {
    if (!modal) return;

    const content = modal.querySelector("[data-modal-content]");

    // Transisi keluar
    modal.classList.remove("opacity-100");
    content.classList.remove("scale-100", "opacity-100");
    content.classList.add("scale-95", "opacity-0");

    // Setelah animasi selesai, sembunyikan modal
    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.classList.remove("overflow-hidden");
    }, 200);
  };

  // Buka modal
  document.querySelectorAll("[data-modal-target]").forEach((btn) => {
    const targetId = btn.getAttribute("data-modal-target");
    const modal = document.getElementById(targetId);

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(modal);
    });
  });

  // Tutup modal (pakai tombol data-modal-close)
  document.querySelectorAll("[data-modal-close]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const modal = btn.closest("[id^='modal-']");
      closeModal(modal);
    });
  });

  // Tutup modal jika klik di luar konten
  document.addEventListener("click", (e) => {
    const modals = document.querySelectorAll("[id^='modal-']");
    modals.forEach((modal) => {
      if (modal.hasAttribute("data-modal-static")) return;

      const content = modal.querySelector("[data-modal-content]");
      if (!modal.classList.contains("hidden") && e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Tutup modal dengan tombol ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll("[id^='modal-']").forEach((modal) => {
        if (modal.hasAttribute("data-modal-static")) return;
        closeModal(modal);
      });
    }
  });

  // =====================================
  // 🔽 SMART MULTI-LEVEL DROPDOWN
  // Support: multiple dropdowns, nested (multi-level)
  // Mode: click / hover
  // =====================================

  document.querySelectorAll("[data-dropdown-toggle]").forEach((btn) => {
    const menu = document.getElementById(btn.dataset.dropdownToggle);
    const mode = btn.dataset.dropdownMode || "click";
    if (!menu) return;

    const toggleMenu = (e) => {
      e.stopPropagation();

      // Tutup semua dropdown lain hanya di level yang sama
      const parentDropdown = btn.closest(".dropdown-menu");
      const siblings = parentDropdown
        ? parentDropdown.querySelectorAll(":scope > .dropdown-menu")
        : document.querySelectorAll(".dropdown-menu:not(.nested)");

      siblings.forEach((sib) => {
        if (sib !== menu) sib.classList.add("hidden");
      });

      menu.classList.toggle("hidden");
    };

    // ======================
    // 🖱️ MODE KLIK
    // ======================
    if (mode === "click") {
      btn.addEventListener("click", toggleMenu);
    }

    // ======================
    // 🖐️ MODE HOVER
    // ======================
    if (mode === "hover") {
      const showMenu = () => menu.classList.remove("hidden");
      const hideMenu = () => menu.classList.add("hidden");

      btn.addEventListener("mouseenter", showMenu);
      menu.addEventListener("mouseenter", showMenu);

      btn.addEventListener("mouseleave", () => {
        setTimeout(() => {
          if (!menu.matches(":hover")) hideMenu();
        }, 150);
      });

      menu.addEventListener("mouseleave", () => {
        setTimeout(() => {
          if (!btn.matches(":hover")) hideMenu();
        }, 150);
      });
    }
  });

  // ======================
  // 🌍 KLIK DI LUAR = TUTUP SEMUA
  // ======================
  document.addEventListener("click", (e) => {
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      const toggleBtn = document.querySelector(
        `[data-dropdown-toggle="${menu.id}"]`
      );
      if (!menu.contains(e.target) && !toggleBtn.contains(e.target)) {
        menu.classList.add("hidden");
      }
    });
  });

  // =====================================
  // 🧱 SIDEBAR
  // =====================================
  const toggleButton = document.getElementById("toggleSidebar");
  const sidebar = document.getElementById("sidebar");
  const toggleIcon = document.getElementById("toggleIcon");
  const buttonClose = document.getElementById("buttonClose");
  let isOpen = false;

  const isMobile = () => window.innerWidth < 768;

  const openSidebar = () => {
    sidebar?.classList.remove("-translate-x-[120%]");
    sidebar?.classList.add("translate-x-0");
    toggleIcon?.classList.replace("fa-bars", "fa-bars-staggered");
    isOpen = true;
  };

  const closeSidebar = () => {
    sidebar?.classList.add("-translate-x-[120%]");
    sidebar?.classList.remove("translate-x-0");
    toggleIcon?.classList.replace("fa-bars-staggered", "fa-bars");
    isOpen = false;
  };

  if (toggleButton) {
    toggleButton.addEventListener("click", (e) => {
      if (!isMobile()) return;
      e.stopPropagation();
      isOpen ? closeSidebar() : openSidebar();
    });
  }

  if (buttonClose) {
    buttonClose.addEventListener("click", closeSidebar);
  }

  document.addEventListener("click", (e) => {
    if (!isMobile()) return;
    if (isOpen && !sidebar.contains(e.target) && e.target !== toggleButton) {
      closeSidebar();
    }
  });

  // =====================================
  // 🌗 THEME TOGGLE (Light / Dark)
  // =====================================
  const btnLabel = document.querySelector('label[for="theme-toggle"]'); // Menggunakan label sebagai area klik utama
  const icon = document.getElementById("theme-icon");
  const checkbox = document.getElementById("theme-toggle");

  // Cek status tersimpan di localStorage, default ke 'light'
  let current = localStorage.theme || "light";

  // 1. Fungsi untuk menerapkan kelas 'dark' ke elemen <html>
  function applyTheme(mode) {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }

  // 2. Fungsi untuk mengatur ikon dan status visual
  function updateToggle() {
    if (!icon || !checkbox) return;

    // Bersihkan semua kelas ikon dan posisi
    icon.classList.remove(
      "fa-sun",
      "fa-moon",
      "translate-x-0",
      "translate-x-full"
    );

    if (current === "dark") {
      // Set ikon ke Bulan, geser ke Kanan
      icon.classList.add("fas", "fa-moon", "translate-x-full");
      checkbox.checked = true; // Pastikan status checkbox juga tercentang
    } else {
      // Set ikon ke Matahari, geser ke Kiri (default)
      icon.classList.add("fas", "fa-sun", "translate-x-0");
      checkbox.checked = false; // Pastikan status checkbox tidak tercentang
    }

    // Terapkan tema ke dokumen
    applyTheme(current);
  }

  // 3. Tambahkan Event Listener pada label (atau checkbox)
  if (btnLabel) {
    btnLabel.addEventListener("click", (e) => {
      // Mencegah klik input memicu dua kali (jika klik label)
      if (e.target.id === "theme-icon") {
        e.preventDefault();
      }

      // Tentukan tema baru
      current = current === "light" ? "dark" : "light";

      // Simpan ke local storage
      localStorage.theme = current;

      // Perbarui tampilan
      updateToggle();
    });
  }

  // Jalankan saat halaman dimuat untuk memuat preferensi tersimpan
  updateToggle();

  // =====================================
  // BADGE TOGGLE DISMISSABLE
  // =====================================
  document.addEventListener("click", (e) => {
    if (e.target.matches(".badge-close")) {
      const badge = e.target.closest(".badge");
      badge.classList.add("opacity-0", "scale-95");

      setTimeout(() => badge.remove(), 300);
    }
  });

  // =====================================
  // ALERT TOGGLE DISMISSABLE
  // =====================================
  document.addEventListener("click", function (e) {
    if (e.target.closest(".alert-close")) {
      const alert = e.target.closest(".alert");
      alert.classList.add("opacity-0", "scale-95");

      setTimeout(() => alert.remove(), 300);
    }
  });

  // =====================================
  // PASSWORD TOGGLE VISIBILITY
  // =====================================
  document.querySelectorAll('[data-toggle="password"]').forEach((toggle) => {
    toggle.onclick = () => {
      const input = document.getElementById(toggle.dataset.target);
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      toggle.classList.toggle("fa-eye-slash");
      toggle.classList.toggle("fa-eye");
    };
  });

  // Ambil semua tombol yang memiliki class 'mobile-toggle'
  const toggleButtons = document.querySelectorAll(".mobile-toggle");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // 1. Cari menu tujuan berdasarkan ID yang ada di data-target
      const targetId = button.getAttribute("data-target");
      const targetMenu = document.getElementById(targetId);

      // 2. Cari icon di dalam tombol yang diklik
      const icon = button.querySelector("i");

      if (targetMenu) {
        const isClosed = targetMenu.classList.contains("translate-x-full");

        if (isClosed) {
          // BUKA MENU
          targetMenu.classList.remove("translate-x-full");
          targetMenu.classList.add("translate-x-0");

          // Ganti Icon
          if (icon) {
            icon.classList.replace("fa-bars", "fa-bars-staggered");
          }
        } else {
          // TUTUP MENU
          targetMenu.classList.remove("translate-x-0");
          targetMenu.classList.add("translate-x-full");

          // Kembalikan Icon
          if (icon) {
            icon.classList.replace("fa-bars-staggered", "fa-bars");
          }
        }
      }
    });

    // Fitur: Tutup menu jika ada aktivitas scroll
    window.addEventListener("scroll", () => {
      toggleButtons.forEach((button) => {
        const targetId = button.getAttribute("data-target");
        const targetMenu = document.getElementById(targetId);
        const icon = button.querySelector("i");

        // Jika menu sedang TIDAK memiliki class 'translate-x-full' (berarti sedang terbuka)
        if (targetMenu && !targetMenu.classList.contains("translate-x-full")) {
          // Kembalikan ke posisi tertutup
          targetMenu.classList.remove("translate-x-0");
          targetMenu.classList.add("translate-x-full");

          // Kembalikan icon ke semula
          if (icon) {
            icon.classList.replace("fa-bars-staggered", "fa-bars");
          }
        }
      });
    });
  });

  // =====================================
  // 🍞 TOAST NOTIFICATION
  // =====================================
  function showToast(options) {
    const {
      message = "This is a toast message",
      type = "info",
      duration = 3000,
      position = "top-left",
      icon = false,
    } = options;
    {
      const container = document.getElementById(`toast-container-${position}`);
      if (!container) return;

      const toast = document.createElement("div");

      const typeClasses = {
        success: "bg-green-500",
        error: "bg-red-500",
        warning: "bg-yellow-400 text-gray-900",
        info: "bg-blue-500",
      };

      const slideClass = position.includes("right")
        ? "translate-x-6"
        : "-translate-x-6";

      toast.className = `
    ${typeClasses[type] || typeClasses.info}
    px-4 py-3 rounded-lg shadow-lg
    flex items-center justify-between gap-3
    text-sm font-medium
    transform transition-all duration-300
    opacity-0 ${slideClass}
    min-w-[220px]
  `;

      toast.innerHTML = `
  <span class="flex items-center gap-2">
    ${
      icon === true
        ? `<i class="fas ${
            type === "success"
              ? "fa-circle-check"
              : type === "error"
              ? "fa-circle-xmark"
              : type === "warning"
              ? "fa-triangle-exclamation"
              : "fa-circle-info"
          }"></i>`
        : ""
    }
    ${message}
  </span>
  <button class="font-bold text-lg leading-none">
    <i class="fas fa-xmark text-xs"></i>
  </button>
`;

      container.appendChild(toast);

      // Animate in
      requestAnimationFrame(() => {
        toast.classList.remove("opacity-0", slideClass);
      });

      // Close button
      toast.querySelector("button").onclick = () => removeToast();

      // Auto close
      const timer = setTimeout(removeToast, duration);

      function removeToast() {
        clearTimeout(timer);
        toast.classList.add("opacity-0", slideClass);
        setTimeout(() => toast.remove(), 300);
      }
    }
  }
  window.showToast = showToast;
});

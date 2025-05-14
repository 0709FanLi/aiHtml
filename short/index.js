// Global state to manage application data
const state = {
  isLoggedIn: false,
  user: null,
  currentStory: null,
  storyHistory: [],
  credits: 0,
  freeUsage: true,
};

// DOM Elements
const elements = {
  // Navigation
  navLogin: document.querySelector(".nav-login"),
  navDashboard: document.querySelector(".nav-dashboard"),
  dashboardItem: document.getElementById("dashboardItem"),
  navPricing: document.querySelector(".nav-pricing"),
  navHome: document.querySelector(".nav-home"),
  navAbout: document.querySelector(".nav-about"),

  // User Info
  userInfo: document.getElementById("userInfo"),
  userAvatar: document.getElementById("userAvatar"),
  userName: document.getElementById("userName"),
  userCredits: document.getElementById("userCredits"),
  dashboardCredits: document.getElementById("dashboardCredits"),

  // Generator
  generatorSection: document.getElementById("generatorSection"),
  generatorForm: document.getElementById("generatorForm"),
  storyType: document.getElementById("storyType"),
  timePeriod: document.getElementById("timePeriod"),
  storyBackground: document.getElementById("storyBackground"),
  generateBtn: document.getElementById("generateBtn"),

  // Story Output
  storyOutput: document.getElementById("storyOutput"),
  outputTitle: document.getElementById("outputTitle"),
  storyContent: document.getElementById("storyContent"),
  downloadBtn: document.getElementById("downloadBtn"),
  copyBtn: document.getElementById("copyBtn"),
  newStoryBtn: document.getElementById("newStoryBtn"),

  // Modals
  authModal: document.getElementById("authModal"),
  pricingModal: document.getElementById("pricingModal"),
  paymentModal: document.getElementById("paymentModal"),
  historyDetailModal: document.getElementById("historyDetailModal"),
  privacyPolicyModal: document.getElementById("privacyPolicyModal"),
  termsOfServiceModal: document.getElementById("termsOfServiceModal"),
  confirmDeleteModal: document.getElementById("confirmDeleteModal"),

  // Auth Form
  authForm: document.getElementById("authForm"),
  authTitle: document.getElementById("authTitle"),
  authSwitch: document.getElementById("authSwitch"),
  switchAuthMode: document.getElementById("switchAuthMode"),
  nameGroup: document.getElementById("nameGroup"),

  // Modal Close Buttons
  authClose: document.getElementById("authClose"),
  pricingClose: document.getElementById("pricingClose"),
  paymentClose: document.getElementById("paymentClose"),
  historyClose: document.getElementById("historyClose"),
  privacyPolicyClose: document.getElementById("privacyPolicyClose"),
  termsOfServiceClose: document.getElementById("termsOfServiceClose"),
  confirmDeleteClose: document.getElementById("confirmDeleteClose"),

  // Loading Overlay
  loadingOverlay: document.getElementById("loadingOverlay"),

  // Dashboard
  dashboardSection: document.getElementById("dashboardSection"),
  historyTableBody: document.getElementById("historyTableBody"),
  historyTotal: document.getElementById("historyTotal"),
  paginationStart: document.getElementById("paginationStart"),
  paginationEnd: document.getElementById("paginationEnd"),
  paginationTotal: document.getElementById("paginationTotal"),
  paginationControls: document.getElementById("paginationControls"),
  buyCreditsBtn: document.getElementById("buyCreditsBtn"),

  // Payment Modal
  creditsAmount: document.getElementById("creditsAmount"),
  paymentConfirm: document.getElementById("paymentConfirm"),

  // History Modal
  historyTitle: document.getElementById("historyTitle"),
  historyContent: document.getElementById("historyContent"),
  historyDownload: document.getElementById("historyDownload"),

  // Delete Confirmation
  cancelDeleteBtn: document.getElementById("cancelDeleteBtn"),
  confirmDeleteBtn: document.getElementById("confirmDeleteBtn"),

  // Hero
  startWritingBtn: document.getElementById("startWritingBtn"),

  // Toast Container
  toastContainer: document.getElementById("toastContainer"),

  // About Section
  aboutSection: document.getElementById("aboutSection"),
  contactName: document.getElementById("contactName"),
  contactEmail: document.getElementById("contactEmail"),
  contactMessage: document.getElementById("contactMessage"),

  // Forgot Password
  forgotPasswordLink: document.getElementById("forgotPasswordLink"),
  forgotPasswordModal: document.getElementById("forgotPasswordModal"),
  forgotPasswordClose: document.getElementById("forgotPasswordClose"),
  forgotPasswordForm: document.getElementById("forgotPasswordForm"),
  resetEmail: document.getElementById("resetEmail"),
  resetMessage: document.getElementById("resetMessage"),
  verificationCode: document.getElementById("verificationCode"),
  getVerificationBtn: document.getElementById("getVerificationBtn"),
  newPassword: document.getElementById("newPassword"),
  confirmPassword: document.getElementById("confirmPassword"),
};

// Initialize the application
function init() {
  console.log("Initializing application...");

  // 获取DOM元素
  // 检查登录状态
  checkLoginStatus();

  // 添加事件监听器
  attachEventListeners();

  // 显示首页
  showGenerator();

  // 注意：移除了这里的历史记录加载，
  // 改为在显示Dashboard时才加载
}

// Event Listeners
function attachEventListeners() {
  console.log("Attaching event listeners...");

  // Generator Form
  if (elements.generatorForm) {
    elements.generatorForm.addEventListener("submit", generateStory);
  }

  if (elements.downloadBtn) {
    elements.downloadBtn.addEventListener("click", downloadStory);
  }

  if (elements.copyBtn) {
    elements.copyBtn.addEventListener("click", copyStory);
  }

  if (elements.newStoryBtn) {
    elements.newStoryBtn.addEventListener("click", resetGenerator);
  }

  // History Detail
  if (elements.historyDownload) {
    elements.historyDownload.addEventListener("click", downloadHistoryStory);
  }

  if (elements.historyClose) {
    elements.historyClose.addEventListener("click", toggleHistoryModal);
  }

  // Navigation
  if (elements.navLogin) {
    elements.navLogin.addEventListener("click", function (e) {
      e.preventDefault();
      if (state.isLoggedIn) {
        logout();
      } else {
        toggleAuthModal();
      }
    });
  }

  if (elements.navDashboard) {
    elements.navDashboard.addEventListener("click", showDashboard);
  }

  if (elements.navHome) {
    elements.navHome.addEventListener("click", showGenerator);
  }

  if (elements.navAbout) {
    elements.navAbout.addEventListener("click", showAbout);
  }

  if (elements.navPricing) {
    elements.navPricing.addEventListener("click", togglePricingModal);
  }

  // Modals
  if (elements.authClose) {
    elements.authClose.addEventListener("click", toggleAuthModal);
  }

  if (elements.privacyPolicyClose) {
    elements.privacyPolicyClose.addEventListener(
      "click",
      togglePrivacyPolicyModal
    );
  }

  if (elements.termsOfServiceClose) {
    elements.termsOfServiceClose.addEventListener(
      "click",
      toggleTermsOfServiceModal
    );
  }

  if (elements.pricingClose) {
    elements.pricingClose.addEventListener("click", togglePricingModal);
  }

  if (elements.paymentClose) {
    elements.paymentClose.addEventListener("click", togglePaymentModal);
  }

  // Delete Confirmations
  if (elements.confirmDeleteClose) {
    elements.confirmDeleteClose.addEventListener(
      "click",
      toggleConfirmDeleteModal
    );
  }

  if (elements.cancelDeleteBtn) {
    elements.cancelDeleteBtn.addEventListener(
      "click",
      toggleConfirmDeleteModal
    );
  }

  if (elements.confirmDeleteBtn) {
    elements.confirmDeleteBtn.addEventListener("click", handleDeleteStory);
  }

  // Auth Form
  if (elements.authForm) {
    elements.authForm.addEventListener("submit", handleAuth);
  }

  if (elements.switchAuthMode) {
    elements.switchAuthMode.addEventListener("click", switchAuthMode);
  }

  // Buy Plans
  document.querySelectorAll(".buy-plan").forEach((btn) => {
    btn.addEventListener("click", handlePurchase);
  });

  // Dashboard
  if (elements.buyCreditsBtn) {
    elements.buyCreditsBtn.addEventListener("click", togglePricingModal);
  }

  // Forgot Password
  if (elements.forgotPasswordLink) {
    elements.forgotPasswordLink.addEventListener(
      "click",
      toggleForgotPasswordModal
    );
  }

  if (elements.forgotPasswordClose) {
    elements.forgotPasswordClose.addEventListener("click", function (e) {
      e.preventDefault();
      elements.forgotPasswordModal.style.display = "none";
      resetForgotPasswordForm();
    });
  }

  if (elements.forgotPasswordForm) {
    elements.forgotPasswordForm.addEventListener(
      "submit",
      handleForgotPassword
    );
  }

  if (elements.getVerificationBtn) {
    elements.getVerificationBtn.addEventListener(
      "click",
      handleGetVerificationCode
    );
  } else {
    console.error("获取验证码按钮不存在");
  }
}

// Check login status (simulated)
function checkLoginStatus() {
  const savedUser = localStorage.getItem("user");
  const savedToken = localStorage.getItem("token");

  if (savedUser && savedToken) {
    try {
      state.user = JSON.parse(savedUser);

      // 确保token被正确加载，同时支持access_token和token
      state.user.token = savedToken;
      state.user.access_token = savedToken; // 同时保存在access_token字段

      state.isLoggedIn = true;
      state.credits = state.user.credits || 0;

      console.log("恢复登录状态成功，用户:", state.user.name);

      // 根据需要，可以在此处验证token有效性
      // 比如向服务器发送一个请求验证token是否过期

      /*
      // 如果需要验证token有效性，可以取消注释以下代码
      fetch("http://web.colstory.com/api/v1/auth/validate-token", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${savedToken}`
        }
      })
      .then(response => {
        if (!response.ok) {
          // token无效，登出
          logout();
          return;
        }
        // token有效，更新UI
        updateUIForLoggedInUser();
      })
      .catch(error => {
        console.error("验证token失败:", error);
        // 发生错误时保持用户登录状态，避免网络问题导致用户被登出
        updateUIForLoggedInUser();
      });
      */

      // 更新UI
      updateUIForLoggedInUser();
    } catch (error) {
      console.error("恢复用户状态出错:", error);
      logout(); // 出错时清除登录状态
    }
  } else {
    console.log("用户未登录");
    updateUIForLoggedOutUser();
  }
}

// Update UI for logged-in user
function updateUIForLoggedInUser() {
  elements.navLogin.textContent = "Logout";
  elements.dashboardItem.style.display = "block";
  elements.navDashboard.style.display = "block";
  elements.userInfo.style.display = "flex";
  elements.userName.textContent = state.user.name;
  elements.userCredits.textContent = `Credits: ${state.credits}`;
  elements.dashboardCredits.textContent = state.credits;
  elements.userAvatar.textContent = getInitials(state.user.name);
}

// Update UI for logged-out user
function updateUIForLoggedOutUser() {
  elements.navLogin.textContent = "Login";
  elements.navDashboard.style.display = "none";
  elements.dashboardItem.style.display = "none";
  elements.userInfo.style.display = "none";
  elements.dashboardSection.style.display = "none";
  elements.generatorSection.style.display = "block";
}

// Get user initials for avatar
function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// Toggle authentication modal
function toggleAuthModal(e) {
  if (e) e.preventDefault();

  const isCurrentlyVisible = elements.authModal.style.display === "block";
  elements.authModal.style.display = isCurrentlyVisible ? "none" : "block";

  // Reset form fields both when opening and closing the modal
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("agreeTerms").checked = false;
  if (document.getElementById("name")) {
    document.getElementById("name").value = "";
  }

  // Reset any error styles
  document.getElementById("email").style.borderColor = "";
}

// Toggle pricing modal
function togglePricingModal(e) {
  if (e) e.preventDefault();
  elements.pricingModal.style.display =
    elements.pricingModal.style.display === "block" ? "none" : "block";
}

// Toggle payment confirmation modal
function togglePaymentModal() {
  elements.paymentModal.style.display =
    elements.paymentModal.style.display === "block" ? "none" : "block";
  if (elements.paymentModal.style.display === "none") {
    elements.pricingModal.style.display = "none";
  }
}

// Toggle history detail modal
function toggleHistoryModal() {
  elements.historyDetailModal.style.display =
    elements.historyDetailModal.style.display === "block" ? "none" : "block";
}

// Toggle privacy policy modal
function togglePrivacyPolicyModal(e) {
  if (e) e.preventDefault();
  elements.privacyPolicyModal.style.display =
    elements.privacyPolicyModal.style.display === "block" ? "none" : "block";
}

// Toggle terms of service modal
function toggleTermsOfServiceModal(e) {
  if (e) e.preventDefault();
  elements.termsOfServiceModal.style.display =
    elements.termsOfServiceModal.style.display === "block" ? "none" : "block";
}

// Switch between login and register mode
function switchAuthMode(e) {
  e.preventDefault();
  const isLogin = elements.authTitle.textContent === "Login";

  if (isLogin) {
    elements.authTitle.textContent = "Register";
    elements.authForm.querySelector('button[type="submit"]').textContent =
      "Register";
    elements.authSwitch.innerHTML =
      'Already have an account? <a href="#" id="switchAuthMode">Login</a>';
    elements.nameGroup.style.display = "block";
    // 隐藏忘记密码链接（在注册页面不需要）
    document.querySelector(".forgot-password-link").style.display = "none";
  } else {
    elements.authTitle.textContent = "Login";
    elements.authForm.querySelector('button[type="submit"]').textContent =
      "Login";
    elements.authSwitch.innerHTML =
      'Don\'t have an account? <a href="#" id="switchAuthMode">Register</a>';
    elements.nameGroup.style.display = "none";
    // 显示忘记密码链接（在登录页面需要）
    document.querySelector(".forgot-password-link").style.display = "block";
  }

  // Make sure we re-attach the event listener to the new link
  document
    .getElementById("switchAuthMode")
    .addEventListener("click", switchAuthMode);

  // Re-attach event listeners for Terms and Privacy links
  document.getElementById("termsLink").addEventListener("click", function (e) {
    e.preventDefault();
    toggleTermsOfServiceModal();
  });

  document
    .getElementById("privacyLink")
    .addEventListener("click", function (e) {
      e.preventDefault();
      togglePrivacyPolicyModal();
    });
}

// Handle authentication (login/register)
function handleAuth(e) {
  e.preventDefault();
  const isLogin = elements.authTitle.textContent === "Login";
  const emailField = document.getElementById("email");
  const email = emailField.value;
  const password = document.getElementById("password").value;
  const agreeTerms = document.getElementById("agreeTerms").checked;

  // Reset any previous error styles
  emailField.style.borderColor = "";

  if (!email || !password) {
    showToast("Please fill in all fields", "error");
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    // Highlight the email field with error style
    emailField.style.borderColor = "var(--error-color)";
    showToast("Please enter a valid email address (user@example.com)", "error");
    return;
  }

  if (!agreeTerms) {
    showToast(
      "You must agree to the Terms of Service and Privacy Policy",
      "error"
    );
    return;
  }

  // Simulate registration or login
  if (!isLogin) {
    const name = document.getElementById("name").value;
    if (!name) {
      showToast("Please enter your name", "error");
      return;
    }
    // 新增：注册接口调用
    const password_confirm = password;

    // 对密码进行MD5加密
    const md5Password = md5(password);
    const md5PasswordConfirm = md5(password_confirm);

    fetch("http://web.colstory.com/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        password: md5Password,
        password_confirm: md5PasswordConfirm,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        // 扩大成功条件判断，处理更多接口响应情况
        if (
          res.ok ||
          data.success ||
          data.status === "success" ||
          (data.message &&
            (data.message.includes("success") ||
              data.message.toLowerCase().includes("成功")))
        ) {
          // 1. 显示注册成功提示
          showToast("Registration successful! Please login.", "success");

          // 2. 清空表单内容
          document.getElementById("email").value = "";
          document.getElementById("password").value = "";
          document.getElementById("agreeTerms").checked = false;
          if (document.getElementById("name")) {
            document.getElementById("name").value = "";
          }

          // 3. 切换回登录表单
          elements.authTitle.textContent = "Login";
          elements.authForm.querySelector('button[type="submit"]').textContent =
            "Login";
          elements.authSwitch.innerHTML =
            'Don\'t have an account? <a href="#" id="switchAuthMode">Register</a>';
          elements.nameGroup.style.display = "none";
          document.querySelector(".forgot-password-link").style.display =
            "block";

          // 4. 重新绑定事件
          document
            .getElementById("switchAuthMode")
            .addEventListener("click", switchAuthMode);
          document
            .getElementById("termsLink")
            .addEventListener("click", function (e) {
              e.preventDefault();
              toggleTermsOfServiceModal();
            });
          document
            .getElementById("privacyLink")
            .addEventListener("click", function (e) {
              e.preventDefault();
              togglePrivacyPolicyModal();
            });

          return;
        } else {
          showToast(data.message || "Registration failed", "error");
        }
      })
      .catch(() => {
        showToast("Network error, registration failed", "error");
      });
    return;
  } else {
    // 实际登录API调用
    console.log("开始登录请求...");

    // 对密码进行MD5加密
    const md5Password = md5(password);

    // 发送登录请求
    fetch("http://web.colstory.com/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: md5Password,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log("登录响应:", data);

        if (data.ok === 1 || data.success || data.status === "success") {
          // 登录成功
          showToast("Login successful!", "success");

          // 适配新接口结构
          const userData = data.data && data.data.user ? data.data.user : {};
          const authToken =
            data.data && data.data.access_token ? data.data.access_token : "";
          const refreshToken =
            data.data && data.data.refresh_token ? data.data.refresh_token : "";
          const credits = userData.credits || 0;

          // 构建用户对象
          state.user = {
            id: userData.id || generateId(),
            name: userData.name || email.split("@")[0],
            email: userData.email || email,
            credits: credits,
            token: authToken,
            access_token: authToken,
            refresh_token: refreshToken,
            avatar: userData.avatar_url || "",
            role: userData.role || "user",
            created_at: userData.created_at || "",
            last_login_at: userData.last_login_at || "",
          };
          state.isLoggedIn = true;
          state.credits = credits;

          // 保存到localStorage
          localStorage.setItem("user", JSON.stringify(state.user));
          localStorage.setItem("token", authToken);
          localStorage.setItem("refresh_token", refreshToken);

          // 生成历史记录
          generateFakeHistory();

          // 更新UI
          updateUIForLoggedInUser();
          toggleAuthModal();
        } else {
          // 登录失败
          showToast(
            data.message || "Login failed. Please check your credentials.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error("登录请求错误:", error);
        showToast("Network error, please try again later", "error");
      });

    return; // 阻止代码继续执行
  }

  // 此代码不会再执行，因为我们在上面的else分支中已经处理了所有逻辑并返回
}

// Logout function
function logout() {
  // 防止重复调用
  if (window.isLoggingOut) {
    console.log("登出请求已在处理中，避免重复请求");
    return;
  }

  // 用户已经登录的情况下，调用登出接口
  if (state.isLoggedIn && state.user) {
    // 获取token，可能存储在access_token或token字段中
    const userToken =
      state.user.access_token ||
      state.user.token ||
      localStorage.getItem("token");

    if (userToken) {
      // 设置登出状态标记
      window.isLoggingOut = true;

      // 先显示"登出中"提示
      showToast("Logging out...", "info");
      console.log("开始登出流程，准备调用登出API");

      // 保存当前token，避免在请求过程中被清除
      const currentToken = userToken;

      // 调用登出API
      fetch("http://web.colstory.com/api/v1/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      })
        .then(async (res) => {
          console.log("登出API响应状态:", res.status);

          try {
            const data = await res.json();
            console.log("登出API响应数据:", data);

            // 清除用户数据
            finishLogout("API响应成功");
          } catch (error) {
            console.error("解析登出响应错误:", error);
            // 即使API返回解析出错，也清除本地状态
            finishLogout("API响应解析错误");
          }
        })
        .catch((error) => {
          console.error("登出请求网络错误:", error);
          // 即使API请求失败，也清除本地状态
          finishLogout("请求网络错误");
        });
    } else {
      console.log("用户已登录但无token，直接清除本地数据");
      finishLogout("无可用token");
    }
  } else {
    // 用户未登录或没有token的情况
    console.log("用户未登录，直接清除本地数据");
    finishLogout("未登录状态");
  }

  // 统一处理登出完成流程
  function finishLogout(reason) {
    console.log(`完成登出流程，原因: ${reason}`);

    // 清除用户数据
    state.isLoggedIn = false;
    state.user = null;
    state.credits = 0;
    state.storyHistory = [];
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");

    // 更新UI
    updateUIForLoggedOutUser();

    // 显示成功提示
    showToast("Logged out successfully", "success");

    // 重置登出状态标记
    window.isLoggingOut = false;
  }
}

// Show dashboard
function showDashboard(e) {
  if (e) e.preventDefault();

  if (!state.isLoggedIn) {
    toggleAuthModal();
    return;
  }

  elements.dashboardSection.style.display = "block";
  elements.generatorSection.style.display = "none";
  elements.aboutSection.style.display = "none";

  // 只在显示Dashboard页面时加载历史记录
  renderHistoryCards();
}

// Show generator
function showGenerator(e) {
  if (e) e.preventDefault();
  elements.dashboardSection.style.display = "none";
  elements.aboutSection.style.display = "none";
  elements.generatorSection.style.display = "block";
}

// Show about section
function showAbout(e) {
  if (e) e.preventDefault();
  elements.dashboardSection.style.display = "none";
  elements.generatorSection.style.display = "none";
  elements.aboutSection.style.display = "block";
  // Scroll to top of about section
  elements.aboutSection.scrollIntoView({ behavior: "smooth" });
}

// Scroll to generator
function scrollToGenerator(e) {
  if (e) e.preventDefault();
  elements.aboutSection.style.display = "none"; // 隐藏about页面
  elements.generatorSection.style.display = "block"; // 显示generator页面
  elements.generatorSection.scrollIntoView({ behavior: "smooth" });
}

// Generate story
function generateStory(e) {
  e.preventDefault();

  const storyType = elements.storyType.value;
  const timePeriod = elements.timePeriod.value;
  const background = elements.storyBackground.value;

  if (!storyType) {
    showToast("Please select a story type", "error");
    return;
  }
  if (!timePeriod) {
    showToast("Please select a time period", "error");
    return;
  }
  if (!background) {
    showToast("Please select a story background", "error");
    return;
  }

  // Check if user has credits or free usage available
  if (!state.isLoggedIn && !state.freeUsage) {
    showToast("Please login to generate more stories", "error");
    toggleAuthModal();
    return;
  }

  if (state.isLoggedIn && state.credits <= 0) {
    showToast("You have no credits left. Please purchase more.", "error");
    togglePricingModal();
    return;
  }

  // Show loading overlay
  elements.loadingOverlay.style.display = "flex";

  // 从localStorage获取token
  const token = localStorage.getItem("token");

  if (state.isLoggedIn && token) {
    // 构造请求数据
    const requestData = {
      story_type: storyType,
      time_period: timePeriod,
      story_background: background,
    };

    console.log("发送小说生成请求:", requestData);
    console.log("使用的Token:", token);

    // 调用真实API
    fetch("http://web.colstory.com/api/v1/story/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log("小说生成响应:", data);

        // 隐藏加载覆盖层
        elements.loadingOverlay.style.display = "none";

        if (res.ok || data.ok === 1) {
          // 解析故事数据
          const storyData = data.data || {};
          const story = {
            id: storyData.id || generateId(),
            title: `${capitalizeFirst(storyType)} Story: ${capitalizeFirst(
              timePeriod
            )} ${capitalizeFirst(background)}`,
            type: storyType,
            period: timePeriod,
            background: background,
            content: storyData.content || "Content could not be loaded.",
            date: new Date().toISOString(),
          };

          // 更新状态
          state.currentStory = story;

          // 扣除积分
          state.credits--;
          state.user.credits = state.credits;
          localStorage.setItem("user", JSON.stringify(state.user));
          elements.userCredits.textContent = `Credits: ${state.credits}`;
          elements.dashboardCredits.textContent = state.credits;

          // 添加到历史记录
          state.storyHistory.unshift(story);

          // 更新UI
          elements.outputTitle.textContent = story.title;
          elements.storyContent.textContent = story.content;
          elements.storyOutput.style.display = "block";

          // 滚动到输出区域
          elements.storyOutput.scrollIntoView({ behavior: "smooth" });

          // 显示成功消息
          showToast(data.message || "Story generated successfully!", "success");
        } else {
          showToast(
            data.message || "Failed to generate story. Please try again.",
            "error"
          );
        }
      })
      .catch((error) => {
        // 隐藏加载覆盖层
        elements.loadingOverlay.style.display = "none";
        console.error("生成故事错误:", error);
        showToast("Network error. Please try again later.", "error");
      });
  } else {
    // 本地生成故事（现有代码）
    setTimeout(() => {
      // Generate story based on selections
      const story = generateFakeStory(storyType, timePeriod, background);

      // Update state
      state.currentStory = story;

      if (state.isLoggedIn) {
        state.credits--;
        state.user.credits = state.credits;
        localStorage.setItem("user", JSON.stringify(state.user));
        elements.userCredits.textContent = `Credits: ${state.credits}`;
        elements.dashboardCredits.textContent = state.credits;

        // Add to history
        state.storyHistory.unshift(story);
      } else {
        state.freeUsage = false;
      }

      // Update UI
      elements.outputTitle.textContent = story.title;
      elements.storyContent.textContent = story.content;
      elements.storyOutput.style.display = "block";

      // Hide loading overlay
      elements.loadingOverlay.style.display = "none";

      // Scroll to the output
      elements.storyOutput.scrollIntoView({ behavior: "smooth" });
    }, 2000);
  }
}

// Generate a fake story based on user selections
function generateFakeStory(type, period, background) {
  const titles = {
    fantasy: [
      "The Crystal Shard",
      "Realm of the Ancients",
      "The Wizard's Apprentice",
    ],
    "martial-arts": [
      "The Dragon Warrior",
      "Fist of Legend",
      "The Way of the Blade",
    ],
    romance: ["Hearts Entwined", "Autumn Love", "Chance Encounter"],
    "sci-fi": ["Beyond the Stars", "Neural Connection", "The Last Colony"],
    horror: ["Whispers in the Dark", "The Haunting", "Shadows Within"],
    mystery: [
      "The Silent Witness",
      "Murder at Midnight",
      "The Missing Heirloom",
    ],
    adventure: [
      "Journey to the Unknown",
      "The Lost Expedition",
      "Treasure of the Deep",
    ],
    historical: ["The King's Guard", "Revolution", "Empire of Sand"],
  };

  const storyIntros = {
    fantasy:
      "The air shimmered with arcane energy as Elara approached the ancient temple. Her fingers tingled, sensing the old magic that permeated the stone walls. The prophecy had led her here, to this forgotten place, where the veil between worlds grew thin...",

    "martial-arts":
      "Master Wei watched his student with careful eyes. The young man moved through the forms with precision, but lacked the spirit that would transform technique into art. Decades of training had taught Wei that true mastery came not from the body, but from within...",

    romance:
      "The coffee shop was crowded as usual, but somehow, through the sea of faces, their eyes met. Time seemed to slow as Sarah felt a strange familiarity wash over her. She had never seen this person before, yet something deep within recognized a connection that transcended their first meeting...",

    "sci-fi":
      "The colony ship Artemis broke through the cloud layer, revealing the landscape of Proxima b for the first time. Captain Chen held her breath as the sensors analyzed the atmosphere. After two hundred years in cryosleep, humanity's new home was finally within reach...",

    horror:
      "The old house at the end of Blackwood Lane had been abandoned for decades. Local children dared each other to approach it, but none ventured inside. Mark had dismissed the stories as superstition, but as night fell and the temperature dropped unnaturally around him, he began to question his skepticism...",

    mystery:
      "Detective Morgan examined the room with practiced eyes. Nothing appeared disturbed, yet the victim's expression was frozen in terror. No signs of forced entry, no weapon found. It was the third death this month with the same mysterious circumstances. What was he missing?",

    adventure:
      "The ancient map felt fragile in Jack's weathered hands. Twenty years of searching, following fragments of legends and whispered rumors, had led to this moment. If his calculations were correct, the lost city of Azcalon lay just beyond the mountain range...",

    historical:
      "The year was 1789, and Paris simmered with revolutionary fervor. Marie clutched the letter tightly as she navigated the narrow streets. Its contents could save her brother from the guillotine, but delivering it meant risking her own neck...",
  };

  // Generate title
  const titleOptions = titles[type] || titles["fantasy"];
  const title = titleOptions[Math.floor(Math.random() * titleOptions.length)];

  // Generate content
  let content = storyIntros[type] || storyIntros["fantasy"];

  // Add background and period details
  let periodText = "";
  if (period === "modern") {
    periodText =
      "\n\nThe modern world had lost much of its wonder, with technology replacing belief in the extraordinary. Yet beneath the surface of everyday life, ancient powers still moved, unseen by most...";
  } else if (period === "future") {
    periodText =
      "\n\nIn the year 2250, humanity had spread across the solar system. Quantum computing and neural interfaces had transformed society, yet some challenges remained stubbornly resistant to technological solutions...";
  } else if (period === "ancient") {
    periodText =
      "\n\nIn an age before written history, when gods walked among mortals and the first great civilizations were rising from the dust, legends were not stories but living truths...";
  } else if (period === "medieval") {
    periodText =
      "\n\nCastles dominated the landscape, their stone walls offering protection in troubled times. Lords and ladies played at politics while common folk worked the land, and on the borders, ancient threats stirred once more...";
  } else if (period === "victorian") {
    periodText =
      "\n\nGas lamps cast pools of light on cobblestone streets, while steam engines drove the industrial revolution forward. Society operated under strict codes of conduct, but beneath the proper exterior, secrets and passions simmered...";
  } else {
    periodText =
      "\n\nTime had its own rhythm here, following patterns set in motion at the dawn of existence. The present moment was but one point in an endless cycle of renewal and decay...";
  }

  content += periodText;

  let backgroundText = "";
  if (background === "fictional-world") {
    backgroundText =
      "\n\nThe world of Eldoria had never known Earth. It operated by different physical laws, where magic flowed like water and mythical creatures roamed vast, unexplored territories. The five kingdoms maintained an uneasy peace, but ancient rivalries threatened to ignite a conflict that could reshape the continent...";
  } else if (background === "alternate-world") {
    backgroundText =
      "\n\nHistory had taken a different turn when the Roman Empire never fell. Now, in an alternate present, steam-powered airships connected imperial provinces spanning every continent, and mechanical calculating engines were the backbone of an advanced society that never experienced the Dark Ages...";
  } else if (background === "real-world") {
    backgroundText =
      "\n\nThough the setting was familiar—the streets, buildings, and people indistinguishable from any major city—what lurked beneath the surface reality remained hidden to most. Only those with the gift could sense the true nature of things, the invisible currents that shaped events...";
  } else if (background === "post-apocalyptic") {
    backgroundText =
      "\n\nDecades after the collapse, nature reclaimed what civilization had built. Vines crawled up the skeletons of skyscrapers, and forests grew through cracked highways. The survivors had formed new societies from the remnants of the old world, preserving some technologies while losing others to time...";
  } else if (background === "utopian") {
    backgroundText =
      "\n\nThe Great Transition had solved humanity's most pressing problems. Clean energy, automated production, and a universal basic income had eliminated poverty and most crime. People pursued creative and intellectual interests, free from material concerns. Yet in this paradise, some questioned whether something essential had been lost...";
  } else if (background === "dystopian") {
    backgroundText =
      "\n\nThe Corporation controlled every aspect of citizens' lives—where they lived, what they consumed, even what they thought. Surveillance was omnipresent, dissent swiftly punished. Most accepted their reality without question, finding comfort in routine. But within the cracks of the system, resistance took root...";
  } else {
    backgroundText =
      "\n\nThe boundaries between worlds had always been thin in certain places. Those sensitive to such things could feel the overlap, the moments when alternate realities brushed against each other like overlapping circles in a cosmic Venn diagram...";
  }

  content += backgroundText;

  // Add more paragraphs to make it substantial
  content += `\n\nThe morning light filtered through ancient trees, casting dappled shadows on the forest floor. In the distance, a bird called, its song echoing in the stillness. This was a moment of peace before the journey would truly begin, before choices would need to be made that could not be undone.Many had attempted this path before, leaving behind only whispered warnings and fragmentary journals. Some spoke of treasures beyond imagination, others of horrors that defied description. Which was true? Perhaps both, perhaps neither. The only certainty was that those who ventured forward would not return unchanged.
A cool breeze stirred the leaves, carrying the scent of pine and something else—something older and more primal. It was said that in places like this, where the extraordinary touched the ordinary world, one could hear the heartbeat of creation itself if one knew how to listen.
The decision to continue was not made lightly. It meant leaving behind the familiar, the comfortable, the known. Yet the alternative—returning to a life of predictable days and unanswered questions—seemed somehow more frightening than facing whatever lay ahead.
With a deep breath and a silent prayer to forgotten gods, the first step was taken on a path that would lead to either glory or ruin. The journey had begun.`;
  return {
    id: generateId(),
    title,
    type,
    period,
    background,
    content,
    date: new Date().toISOString(),
  };
}

// Download the current story
function downloadStory() {
  if (!state.currentStory) return;

  const title = state.currentStory.title;
  const content = state.currentStory.content;
  const blob = new Blob([`${title}\n\n${content}`], {
    type: "text/plain",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.replace(/\s+/g, "-").toLowerCase()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast("Story downloaded successfully", "success");
}

// Copy the current story to clipboard
function copyStory() {
  if (!state.currentStory) return;

  const title = state.currentStory.title;
  const content = state.currentStory.content;
  const fullText = `${title}\n\n${content}`;

  navigator.clipboard
    .writeText(fullText)
    .then(() => {
      showToast("Story copied to clipboard", "success");
    })
    .catch(() => {
      showToast("Failed to copy to clipboard", "error");
    });
}

// Reset the generator form
function resetGenerator() {
  elements.storyType.value = "";
  elements.timePeriod.value = "";
  elements.storyBackground.value = "";
  elements.storyOutput.style.display = "none";
  state.currentStory = null;
}

// Handle purchase of credits
function handlePurchase(e) {
  const plan = e.target.dataset.plan;
  let credits = 0;

  // Set credits based on plan
  switch (plan) {
    case "basic":
      credits = 2;
      break;
    case "standard":
      credits = 10;
      break;
    case "premium":
      credits = 30;
      break;
    case "monthly":
      credits = 50;
      break;
    case "annual":
      credits = 1000;
      break;
    default:
      credits = 5;
  }

  // Update state
  if (state.isLoggedIn) {
    state.credits += credits;
    state.user.credits = state.credits;
    localStorage.setItem("user", JSON.stringify(state.user));
    elements.userCredits.textContent = `Credits: ${state.credits}`;
    elements.dashboardCredits.textContent = state.credits;
  }

  // Show payment confirmation
  elements.creditsAmount.textContent = credits;
  togglePaymentModal();
}

// Generate unique ID
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// Generate fake history
function generateFakeHistory() {
  if (!state.isLoggedIn) return;

  // Clear previous history
  state.storyHistory = [];

  // Generate 5 random stories
  const types = ["fantasy", "sci-fi", "mystery", "romance", "adventure"];
  const periods = ["modern", "future", "ancient", "medieval", "victorian"];
  const backgrounds = [
    "fictional-world",
    "real-world",
    "post-apocalyptic",
    "dystopian",
    "utopian",
  ];

  for (let i = 0; i < 5; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const period = periods[Math.floor(Math.random() * periods.length)];
    const background =
      backgrounds[Math.floor(Math.random() * backgrounds.length)];

    const story = generateFakeStory(type, period, background);
    story.date = new Date(Date.now() - i * 86400000).toISOString(); // Subtract days
    state.storyHistory.push(story);
  }
}

// Render history cards
function renderHistoryCards() {
  if (!state.isLoggedIn) {
    // 如果用户未登录，显示空状态
    elements.historyTableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 2rem 0;">
          <i class="fas fa-user-lock" style="font-size: 2rem; margin-bottom: 1rem; color: #aaa;"></i>
          <p>Please login to view your history</p>
        </td>
      </tr>
    `;

    // 更新分页信息
    elements.historyTotal.textContent = "0";
    elements.paginationStart.textContent = "0";
    elements.paginationEnd.textContent = "0";
    elements.paginationTotal.textContent = "0";
    elements.paginationControls.innerHTML = "";
    return;
  }

  // 显示加载状态
  elements.loadingOverlay.style.display = "flex";

  // 获取当前页码（默认为1）
  let currentPage = parseInt(localStorage.getItem("historyCurrentPage")) || 1;
  const itemsPerPage = 10; // 每页显示10条

  // 获取token
  const token = localStorage.getItem("token");

  if (!token) {
    showToast("Authorization token not found", "error");
    elements.loadingOverlay.style.display = "none";
    return;
  }

  // 构造请求数据
  const requestData = {
    page: currentPage,
    page_size: itemsPerPage,
  };

  console.log("请求历史数据:", requestData);

  // 调用API获取历史数据
  fetch("http://web.colstory.com/api/v1/story/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestData),
  })
    .then(async (res) => {
      try {
        const data = await res.json();
        console.log("历史记录响应:", data);

        // 隐藏加载状态
        elements.loadingOverlay.style.display = "none";

        if (res.ok || data.ok === 1) {
          // 处理响应数据
          const { total, items, has_more } = data.data || {
            total: 0,
            items: [],
            has_more: 0,
          };

          // 如果当前是第一页，保存总条数
          if (currentPage === 1 && total !== undefined) {
            state.totalStories = total;
          }

          const totalStories = state.totalStories || 0;
          const totalPages = Math.ceil(totalStories / itemsPerPage);

          if (items.length === 0) {
            // 如果没有历史记录，显示空状态
            elements.historyTableBody.innerHTML = `
              <tr>
                <td colspan="6" style="text-align: center; padding: 2rem 0;">
                  <i class="fas fa-book-open" style="font-size: 2rem; margin-bottom: 1rem; color: #aaa;"></i>
                  <p>You haven't generated any stories yet</p>
                </td>
              </tr>
            `;

            // 更新分页信息
            elements.historyTotal.textContent = totalStories.toString();
            elements.paginationStart.textContent = "0";
            elements.paginationEnd.textContent = "0";
            elements.paginationTotal.textContent = totalStories.toString();
            elements.paginationControls.innerHTML = "";
            return;
          }

          // 计算当前页的起始和结束索引
          const startIndex = (currentPage - 1) * itemsPerPage + 1;
          const endIndex = startIndex + items.length - 1;

          // 更新分页信息
          elements.historyTotal.textContent = totalStories.toString();
          elements.paginationStart.textContent = startIndex.toString();
          elements.paginationEnd.textContent = endIndex.toString();
          elements.paginationTotal.textContent = totalStories.toString();

          // 清空表格和分页控件
          elements.historyTableBody.innerHTML = "";
          elements.paginationControls.innerHTML = "";

          // 填充表格数据
          items.forEach((story) => {
            const date = new Date(story.created_at);
            const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

            // 创建标题（基于类型和时间）
            const title = `${capitalizeFirst(
              story.story_type
            )} Story: ${capitalizeFirst(story.time_period)} ${capitalizeFirst(
              story.story_background
            )}`;

            const row = document.createElement("tr");
            row.dataset.id = story.id;
            row.innerHTML = `
              <td class="history-title">${title}</td>
              <td class="history-meta">${formattedDate}</td>
              <td class="history-meta">${capitalizeFirst(story.story_type)}</td>
              <td class="history-meta">${capitalizeFirst(
                story.time_period
              )}</td>
              <td class="history-meta">${capitalizeFirst(
                story.story_background
              )}</td>
              <td class="history-actions">
                <button class="delete-story-btn" data-id="${story.id}">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            `;

            // 添加点击事件 - 行点击显示详情
            row.addEventListener("click", (e) => {
              // 如果点击的是删除按钮，则不显示详情
              if (!e.target.closest(".delete-story-btn")) {
                // 详情加载需要单独请求
                loadStoryDetail(story);
              }
            });

            // 删除按钮单独添加事件，防止冒泡
            const deleteBtn = row.querySelector(".delete-story-btn");
            deleteBtn.addEventListener("click", (e) => {
              e.stopPropagation(); // 阻止事件冒泡，防止触发行点击事件
              showConfirmDeleteModal(story);
            });

            elements.historyTableBody.appendChild(row);
          });

          // 创建分页按钮
          if (totalPages > 1) {
            // 添加"上一页"按钮
            const prevBtn = document.createElement("button");
            prevBtn.classList.add("pagination-btn");
            prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevBtn.disabled = currentPage === 1;
            prevBtn.addEventListener("click", () => {
              if (currentPage > 1) {
                localStorage.setItem(
                  "historyCurrentPage",
                  (currentPage - 1).toString()
                );
                renderHistoryCards();
              }
            });
            elements.paginationControls.appendChild(prevBtn);

            // 添加页码按钮
            const maxPageButtons = 5; // 最多显示5个页码按钮
            let startPage = Math.max(
              1,
              currentPage - Math.floor(maxPageButtons / 2)
            );
            let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

            // 调整开始页码，确保始终显示最大数量的页码按钮
            if (endPage - startPage + 1 < maxPageButtons && startPage > 1) {
              startPage = Math.max(1, endPage - maxPageButtons + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
              const pageBtn = document.createElement("button");
              pageBtn.classList.add("pagination-btn");
              if (i === currentPage) {
                pageBtn.classList.add("active");
              }
              pageBtn.textContent = i.toString();
              pageBtn.addEventListener("click", () => {
                localStorage.setItem("historyCurrentPage", i.toString());
                renderHistoryCards();
              });
              elements.paginationControls.appendChild(pageBtn);
            }

            // 添加"下一页"按钮
            const nextBtn = document.createElement("button");
            nextBtn.classList.add("pagination-btn");
            nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextBtn.disabled = !has_more;
            nextBtn.addEventListener("click", () => {
              if (has_more) {
                localStorage.setItem(
                  "historyCurrentPage",
                  (currentPage + 1).toString()
                );
                renderHistoryCards();
              }
            });
            elements.paginationControls.appendChild(nextBtn);
          }
        } else {
          // 显示错误提示
          showToast(data.message || "Failed to fetch history", "error");

          // 显示空状态
          elements.historyTableBody.innerHTML = `
            <tr>
              <td colspan="6" style="text-align: center; padding: 2rem 0;">
                <i class="fas fa-exclamation-circle" style="font-size: 2rem; margin-bottom: 1rem; color: #aaa;"></i>
                <p>Failed to load history data</p>
              </td>
            </tr>
          `;
        }
      } catch (error) {
        console.error("解析历史记录响应错误:", error);
        elements.loadingOverlay.style.display = "none";
        showToast("Error processing response", "error");
      }
    })
    .catch((error) => {
      console.error("获取历史记录错误:", error);
      elements.loadingOverlay.style.display = "none";
      showToast("Network error. Please try again later.", "error");

      // 显示错误状态
      elements.historyTableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 2rem 0;">
            <i class="fas fa-wifi" style="font-size: 2rem; margin-bottom: 1rem; color: #aaa;"></i>
            <p>Network error. Please check your connection and try again.</p>
          </td>
        </tr>
      `;
    });
}

// Load story detail
function loadStoryDetail(story) {
  // 显示加载状态
  elements.loadingOverlay.style.display = "flex";

  // 获取token
  const token = localStorage.getItem("token");

  if (!token) {
    showToast("Authorization token not found", "error");
    elements.loadingOverlay.style.display = "none";
    return;
  }

  // 调用API获取故事详情
  fetch(`http://web.colstory.com/api/v1/story/${story.id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      try {
        const data = await res.json();
        console.log("故事详情响应:", data);

        // 隐藏加载状态
        elements.loadingOverlay.style.display = "none";

        if (res.ok || data.ok === 1) {
          const storyData = data.data || {};

          // 创建完整的故事对象
          const fullStory = {
            id: story.id,
            title: `${capitalizeFirst(
              story.story_type
            )} Story: ${capitalizeFirst(story.time_period)} ${capitalizeFirst(
              story.story_background
            )}`,
            type: story.story_type,
            period: story.time_period,
            background: story.story_background,
            content: storyData.content || "Content not available.",
            date: story.created_at,
          };

          // 显示故事详情
          elements.historyTitle.textContent = fullStory.title;
          elements.historyContent.textContent = fullStory.content;
          elements.historyDetailModal.dataset.id = fullStory.id;
          toggleHistoryModal();
        } else {
          showToast(data.message || "Failed to load story details", "error");
        }
      } catch (error) {
        console.error("解析故事详情响应错误:", error);
        elements.loadingOverlay.style.display = "none";
        showToast("Error processing response", "error");
      }
    })
    .catch((error) => {
      console.error("获取故事详情错误:", error);
      elements.loadingOverlay.style.display = "none";
      showToast("Network error. Please try again later.", "error");
    });
}

// Show toast notification
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
            <i class="fas ${
              type === "success" ? "fa-check-circle" : "fa-exclamation-circle"
            }"></i>
            <span>${message}</span>
        `;

  elements.toastContainer.appendChild(toast);

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      elements.toastContainer.removeChild(toast);
    }, 300);
  }, 3000);
}

// Helper function to capitalize first letter
function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).replace(/-/g, " ");
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", init);

// Send message
function sendMessage() {
  const name = elements.contactName.value;
  const email = elements.contactEmail.value;
  const message = elements.contactMessage.value;

  if (!name || !email || !message) {
    showToast("Please fill in all fields", "error");
    return;
  }

  // Simulate sending the message
  showToast("Message sent successfully", "success");
  elements.contactName.value = "";
  elements.contactEmail.value = "";
  elements.contactMessage.value = "";
}

// Toggle forgot password modal
function toggleForgotPasswordModal(e) {
  if (e) e.preventDefault();

  const isCurrentlyVisible =
    elements.forgotPasswordModal.style.display === "block";
  elements.forgotPasswordModal.style.display = isCurrentlyVisible
    ? "none"
    : "block";

  // 清空表单
  if (!isCurrentlyVisible) {
    resetForgotPasswordForm();
  }
}

// 重置忘记密码表单
function resetForgotPasswordForm() {
  elements.resetEmail.value = "";
  elements.verificationCode.value = "";
  elements.newPassword.value = "";
  elements.confirmPassword.value = "";
  elements.resetMessage.style.display = "none";
  elements.resetEmail.style.borderColor = "";
}

// 自定义邮箱验证函数
function validateEmail(email) {
  // 基本邮箱正则
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 处理获取验证码
function handleGetVerificationCode(e) {
  e.preventDefault();
  console.log("获取验证码...");

  const email = document.getElementById("resetEmail").value.trim();

  // 自定义邮箱验证
  if (!validateEmail(email)) {
    document.getElementById("resetEmail").style.borderColor =
      "var(--error-color)";
    showToast("Please enter a valid email address", "error");
    return;
  }

  // 重置边框样式
  document.getElementById("resetEmail").style.borderColor = "";

  // 发送获取验证码请求
  fetch("http://web.colstory.com/api/v1/auth/email-verification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then(async (res) => {
      const data = await res.json();
      console.log("验证码响应:", data);

      if (
        res.ok ||
        data.success ||
        data.status === "success" ||
        (data.message &&
          (data.message.includes("success") ||
            data.message.toLowerCase().includes("成功")))
      ) {
        showToast("Verification code sent successfully", "success");

        // 禁用按钮30秒
        const btn = document.getElementById("getVerificationBtn");
        btn.disabled = true;
        let countdown = 30;
        btn.textContent = `Resend (${countdown})`;

        const timer = setInterval(() => {
          countdown--;
          btn.textContent = `Resend (${countdown})`;

          if (countdown <= 0) {
            clearInterval(timer);
            btn.disabled = false;
            btn.textContent = "Get Code";
          }
        }, 1000);
      } else {
        showToast(data.message || "Failed to send verification code", "error");
      }
    })
    .catch((error) => {
      console.error("获取验证码请求错误:", error);
      showToast("Network error. Please try again later.", "error");
    });
}

// Initialize DOM elements that might be added later
function ensureElementsLoaded() {
  // 重新获取可能在页面加载后才添加的元素
  if (!elements.confirmDeleteModal) {
    elements.confirmDeleteModal = document.getElementById("confirmDeleteModal");
    console.log("重新获取confirmDeleteModal:", elements.confirmDeleteModal);
  }
  if (!elements.confirmDeleteBtn) {
    elements.confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    elements.cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
    elements.confirmDeleteClose = document.getElementById("confirmDeleteClose");
  }
}

// Show confirm delete modal
function showConfirmDeleteModal(story) {
  // 检查 story 参数是否有效
  if (!story || !story.id) {
    console.error("无法删除：故事对象或故事ID为空", story);
    showToast("Cannot delete this story. Story data is missing.", "error");
    return;
  }

  // 确保模态框元素已加载
  ensureElementsLoaded();

  // 检查 confirmDeleteModal 元素是否存在
  if (!elements.confirmDeleteModal) {
    console.error("confirmDeleteModal 元素不存在");
    showToast("System error. Please refresh and try again.", "error");
    return;
  }

  // 保存要删除的故事ID
  elements.confirmDeleteModal.dataset.storyId = story.id;

  // 显示模态框
  elements.confirmDeleteModal.style.display = "block";

  // 绑定事件（以防事件监听丢失）
  if (elements.confirmDeleteClose) {
    elements.confirmDeleteClose.addEventListener(
      "click",
      toggleConfirmDeleteModal
    );
  }
  if (elements.cancelDeleteBtn) {
    elements.cancelDeleteBtn.addEventListener(
      "click",
      toggleConfirmDeleteModal
    );
  }
  if (elements.confirmDeleteBtn) {
    elements.confirmDeleteBtn.addEventListener("click", handleDeleteStory);
  }
}

// Toggle confirm delete modal
function toggleConfirmDeleteModal() {
  elements.confirmDeleteModal.style.display =
    elements.confirmDeleteModal.style.display === "block" ? "none" : "block";
}

// Handle delete story
function handleDeleteStory() {
  const storyId = elements.confirmDeleteModal.dataset.storyId;

  if (!storyId) {
    showToast("No story selected for deletion", "error");
    toggleConfirmDeleteModal();
    return;
  }

  // 获取token
  const token = localStorage.getItem("token");

  if (!token) {
    showToast("You must be logged in to delete stories", "error");
    toggleConfirmDeleteModal();
    return;
  }

  // 显示加载状态
  elements.loadingOverlay.style.display = "flex";

  // 调用删除接口（POST方式，带token和storyId）
  fetch("http://web.colstory.com/api/v1/story/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: storyId }),
  })
    .then(async (res) => {
      try {
        const data = await res.json();
        console.log("删除故事响应:", data);

        // 隐藏加载状态
        elements.loadingOverlay.style.display = "none";

        if (res.ok || data.ok === 1) {
          // 显示成功提示
          showToast(data.message || "Story deleted successfully", "success");

          // 重新渲染历史记录
          renderHistoryCards();
        } else {
          showToast(data.message || "Failed to delete story", "error");
        }
      } catch (error) {
        console.error("解析删除响应错误:", error);
        elements.loadingOverlay.style.display = "none";
        showToast("Error processing response", "error");
      }
    })
    .catch((error) => {
      console.error("删除故事错误:", error);
      elements.loadingOverlay.style.display = "none";
      showToast("Network error. Please try again later.", "error");
    });

  // 关闭确认删除模态框
  toggleConfirmDeleteModal();
}

// Download history story
function downloadHistoryStory() {
  const storyId = elements.historyDetailModal.dataset.id;

  if (!storyId) {
    showToast("Story not found", "error");
    return;
  }

  // 获取token
  const token = localStorage.getItem("token");

  if (!token) {
    showToast("Authorization token not found", "error");
    return;
  }

  // 显示加载状态
  elements.loadingOverlay.style.display = "flex";

  // 调用API获取故事详情
  fetch(`http://web.colstory.com/api/v1/story/${storyId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      try {
        const data = await res.json();
        console.log("下载故事详情响应:", data);

        // 隐藏加载状态
        elements.loadingOverlay.style.display = "none";

        if (res.ok || data.ok === 1) {
          const storyData = data.data || {};

          // 创建标题
          const title = elements.historyTitle.textContent || "Story";
          const content = storyData.content || "Content not available.";

          // 创建下载文件
          const blob = new Blob([`${title}\n\n${content}`], {
            type: "text/plain",
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${title.replace(/\s+/g, "-").toLowerCase()}.txt`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          showToast("Story downloaded successfully", "success");
        } else {
          showToast(data.message || "Failed to download story", "error");
        }
      } catch (error) {
        console.error("解析故事详情响应错误:", error);
        elements.loadingOverlay.style.display = "none";
        showToast("Error processing response", "error");
      }
    })
    .catch((error) => {
      console.error("获取故事详情错误:", error);
      elements.loadingOverlay.style.display = "none";
      showToast("Network error. Please try again later.", "error");
    });
}

function handleForgotPassword(e) {
  e.preventDefault();

  const email = elements.resetEmail.value.trim();
  const code = elements.verificationCode.value.trim();
  const newPassword = elements.newPassword.value;
  const confirmPassword = elements.confirmPassword.value;

  // 校验邮箱
  if (!validateEmail(email)) {
    elements.resetEmail.style.borderColor = "var(--error-color)";
    showToast("请输入有效的邮箱地址", "error");
    return;
  } else {
    elements.resetEmail.style.borderColor = "";
  }

  // 校验验证码
  if (!code) {
    showToast("请输入验证码", "error");
    return;
  }

  // 校验新密码
  if (!newPassword || newPassword.length < 6) {
    showToast("新密码至少6位", "error");
    return;
  }

  // 校验确认密码
  if (newPassword !== confirmPassword) {
    showToast("两次输入的密码不一致", "error");
    return;
  }

  // md5加密
  const md5Password = md5(newPassword);
  const md5PasswordConfirm = md5(confirmPassword);

  // 显示加载
  elements.loadingOverlay.style.display = "flex";

  // 发送重置密码请求
  fetch("http://web.colstory.com/api/v1/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      verification_code: code,
      password: md5Password,
      password_confirm: md5PasswordConfirm,
    }),
  })
    .then(async (res) => {
      const data = await res.json();
      elements.loadingOverlay.style.display = "none";
      // 只认业务成功
      if (data.ok === 1 || data.success || data.status === "success") {
        elements.resetMessage.style.display = "block";
        showToast("密码重置成功", "success");
        // 1. 关闭忘记密码弹窗
        elements.forgotPasswordModal.style.display = "none";
        // 2. 打开登录弹窗
        elements.authModal.style.display = "block";
        // 3. 自动填入邮箱
        document.getElementById("email").value = email;
        // 4. 切换到登录模式（如果当前不是登录模式）
        if (elements.authTitle.textContent !== "Login") {
          elements.authTitle.textContent = "Login";
          elements.authForm.querySelector('button[type="submit"]').textContent =
            "Login";
          elements.authSwitch.innerHTML =
            'Don\'t have an account? <a href="#" id="switchAuthMode">Register</a>';
          elements.nameGroup.style.display = "none";
          document.querySelector(".forgot-password-link").style.display =
            "block";
          // 重新绑定切换事件
          document
            .getElementById("switchAuthMode")
            .addEventListener("click", switchAuthMode);
          document
            .getElementById("termsLink")
            .addEventListener("click", function (e) {
              e.preventDefault();
              toggleTermsOfServiceModal();
            });
          document
            .getElementById("privacyLink")
            .addEventListener("click", function (e) {
              e.preventDefault();
              togglePrivacyPolicyModal();
            });
        }
      } else {
        showToast(data.message || "重置密码失败", "error");
      }
    })
    .catch((error) => {
      elements.loadingOverlay.style.display = "none";
      console.error("重置密码请求错误:", error);
      showToast("网络错误，请稍后重试", "error");
    });
}

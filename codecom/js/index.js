document.addEventListener("DOMContentLoaded", function () {
  // 网站结构控制 - Home显示About内容，Features显示功能和价格
  const mainContent = document.querySelector(".main-content");
  const aboutSection = document.getElementById("about-section");
  const pricingSection = document.getElementById("pricing");
  const codeInputCard = document.getElementById("code-input");
  const resultsCard = document.getElementById("results-card");
  const userDashboard = document.getElementById("user-dashboard");

  // 全局状态变量
  let isLoggedIn = false; // 默认未登录状态
  let currentUser = null; // 当前用户信息

  // 初始化 - 检查用户登录状态
  checkLoginStatus();

  // 页面加载时初始化显示设置
  initialPageSetup();

  // 初始显示设置 - 页面加载时默认显示Home (About内容)
  function initialPageSetup() {
    // 仅显示About内容相关卡片 (前5个卡片是About内容)
    if (mainContent) {
      const contentCards = mainContent.querySelectorAll(".card");

      // 显示About相关卡片，但隐藏Our Team部分（第3个卡片）
      for (let i = 0; i < 5; i++) {
        if (contentCards[i]) {
          if (i === 2) {
            // Our Team卡片是第3个，索引为2
            contentCards[i].style.display = "none";
          } else {
            contentCards[i].style.display = "block";
          }
        }
      }

      // 显示About相关卡片后的功能卡片需要隐藏
      const totalCards = contentCards.length;
      for (let i = 5; i < totalCards; i++) {
        if (contentCards[i]) {
          contentCards[i].style.display = "none";
        }
      }

      // 隐藏功能相关卡片
      if (codeInputCard) codeInputCard.style.display = "none";
      if (resultsCard) resultsCard.style.display = "none";

      // 根据登录状态显示仪表盘
      if (userDashboard) {
        userDashboard.style.display = isLoggedIn ? "block" : "none";
      }
    }

    // 隐藏价格部分
    if (pricingSection) pricingSection.style.display = "none";
  }

  // 检查用户登录状态
  function checkLoginStatus() {
    // 检查localStorage中是否有token
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("currentUser");

    if (token && savedUser) {
      try {
        // 解析用户数据
        currentUser = JSON.parse(savedUser);

        // 设置登录状态
        isLoggedIn = true;

        // 更新UI
        updateUIForLoggedInUser();

        // 可选：验证token有效性（在后台静默执行，不影响用户体验）
        validateTokenSilently(token);
      } catch (e) {
        console.error("Error parsing user info:", e);
        // 数据解析错误但不清除数据，保持用户会话
      }
    }
  }

  // 静默验证token (不阻塞UI显示，后台验证)
  function validateTokenSilently(token) {
    fetch("http://web.codecommont.com/api/v1/auth/user-info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          // token可能无效，但仍保持当前会话，除非服务器明确要求登出
          console.warn(
            "Token validation warning - server returned:",
            response.status
          );
          return response.json().then((data) => {
            // 只有当服务器明确指示需要重新登录时，才清除会话
            if (data.code === 401 || data.message === "unauthorized") {
              completeLogout();
              showToast(
                "warning",
                "Session Expired",
                "Your session has expired. Please login again."
              );
            }
            return data;
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.success || data.ok === 1) {
          // token有效，可以更新用户信息
          if (data.user || data.data) {
            const userData = data.user || data.data;
            // 更新本地用户数据，但保留现有数据
            if (currentUser) {
              currentUser = {
                ...currentUser,
                name: userData.name || currentUser.name,
                email: userData.email || currentUser.email,
                credits:
                  userData.credits !== undefined
                    ? userData.credits
                    : currentUser.credits,
              };
              localStorage.setItem("currentUser", JSON.stringify(currentUser));
              // 仅更新UI，不重置登录状态
              updateUIForLoggedInUser();
            }
          }
        }
      })
      .catch((error) => {
        console.error("Silent token validation error:", error);
        // 网络错误不影响当前会话
      });
  }

  // 更新已登录用户UI
  function updateUIForLoggedInUser() {
    // 隐藏登录和注册按钮
    const authButtons = document.querySelector(".auth-buttons");
    if (authButtons) {
      authButtons.style.display = "none";
    }

    // 显示用户菜单
    const userMenu = document.querySelector(".user-menu");
    if (userMenu) {
      userMenu.style.display = "flex"; // 改为flex以支持排列
    }

    // 更新用户头像显示的首字母
    const userAvatar = document.querySelector(".user-avatar");
    if (userAvatar && currentUser && currentUser.name) {
      // 如果之前有i标签，则移除
      const iconElement = userAvatar.querySelector("i");
      if (iconElement) {
        userAvatar.removeChild(iconElement);
      }
      // 添加用户名首字母
      userAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
    }

    // 更新头像旁边显示的用户名
    const userNameDisplay = document.querySelector(".user-name-display");
    if (userNameDisplay && currentUser && currentUser.name) {
      userNameDisplay.textContent = currentUser.name;
    }

    // 更新用户下拉菜单中的信息
    const userName = document.querySelector(".user-name");
    const userEmail = document.querySelector(".user-email");

    if (userName && currentUser) {
      userName.textContent = currentUser.name;
    }

    if (userEmail && currentUser) {
      userEmail.textContent = currentUser.email;
    }

    // 更新所有积分显示
    updateCreditsDisplay();
  }

  // 更新所有积分显示的辅助函数
  function updateCreditsDisplay() {
    if (!currentUser || currentUser.credits === undefined) return;

    // 更新头像旁边显示的积分
    const userCreditsDisplay = document.querySelector(
      ".user-credits-display .credit-count"
    );
    if (userCreditsDisplay) {
      userCreditsDisplay.textContent = currentUser.credits;
    }

    // 更新下拉菜单中显示的积分
    const creditCounts = document.querySelectorAll(".credit-count");
    if (creditCounts) {
      creditCounts.forEach((element) => {
        element.textContent = currentUser.credits;
      });
    }
  }

  // 减少用户积分的函数
  function decreaseUserCredits(amount = 1) {
    if (!currentUser || currentUser.credits === undefined) return false;

    // 检查积分是否足够
    if (currentUser.credits < amount) {
      showToast(
        "warning",
        "Insufficient Credits",
        "You don't have enough credits to use this service"
      );
      return false;
    }

    // 减少积分
    currentUser.credits -= amount;

    // 更新本地存储
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // 更新UI显示
    updateCreditsDisplay();

    return true;
  }

  // 显示Home页面功能 (About内容，但不包括Team部分)
  function showHomePage() {
    if (mainContent) {
      // 显示About相关卡片 (前5个卡片是About内容)
      const contentCards = mainContent.querySelectorAll(".card");

      // 显示About相关卡片，但隐藏Our Team部分（第3个卡片）
      for (let i = 0; i < 5; i++) {
        if (contentCards[i]) {
          if (i === 2) {
            // Our Team卡片是第3个，索引为2
            contentCards[i].style.display = "none";
          } else {
            contentCards[i].style.display = "block";
          }
        }
      }

      // 隐藏功能相关卡片
      if (codeInputCard) codeInputCard.style.display = "none";
      if (resultsCard) resultsCard.style.display = "none";
      if (userDashboard) userDashboard.style.display = "none";
    }

    // 隐藏价格部分
    if (pricingSection) pricingSection.style.display = "none";

    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // 显示Features页面功能 (Code Input和功能相关)
  function showFeaturesPage() {
    if (mainContent) {
      // 获取所有卡片
      const contentCards = mainContent.querySelectorAll(".card");

      // 首先隐藏所有卡片
      for (let i = 0; i < contentCards.length; i++) {
        if (contentCards[i]) contentCards[i].style.display = "none";
      }

      // 显示功能相关卡片 - 仅显示代码输入卡片
      if (codeInputCard) codeInputCard.style.display = "block";
      // 不默认显示结果卡片，只在点击Annotate按钮后显示
      if (resultsCard) resultsCard.style.display = "none";
      if (isLoggedIn && userDashboard) userDashboard.style.display = "block";
    }

    // 显示价格部分
    if (pricingSection) pricingSection.style.display = "block";

    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // 显示Pricing页面功能 (仅价格部分)
  function showPricingPage() {
    if (mainContent) {
      // 隐藏About相关卡片 (前5个卡片是About内容)
      const contentCards = mainContent.querySelectorAll(".card");

      // 隐藏About相关卡片和功能卡片
      for (let i = 0; i < contentCards.length; i++) {
        if (contentCards[i]) contentCards[i].style.display = "none";
      }
    }

    // 显示价格部分
    if (pricingSection) pricingSection.style.display = "block";

    // 滚动到价格部分
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  // 导航栏链接
  const homeLink = document.querySelector(".nav-links li:nth-child(1) a");
  const pricingLink = document.querySelector(".nav-links li:nth-child(2) a");
  const featuresLink = document.querySelector(".nav-links li:nth-child(3) a");

  // 页脚链接
  const footerHomeLink = document.querySelector(".footer-links a:nth-child(1)");
  const footerPricingLink = document.querySelector(
    ".footer-links a:nth-child(2)"
  );
  const footerFeaturesLink = document.querySelector(
    ".footer-links a:nth-child(3)"
  );

  // 导航栏链接事件处理
  if (homeLink) {
    homeLink.addEventListener("click", function (e) {
      e.preventDefault();
      showHomePage();
    });
  }

  if (featuresLink) {
    featuresLink.addEventListener("click", function (e) {
      e.preventDefault();
      showFeaturesPage();
    });
  }

  if (pricingLink) {
    pricingLink.addEventListener("click", function (e) {
      e.preventDefault();
      showPricingPage();
    });
  }

  // 页脚链接事件处理
  if (footerHomeLink) {
    footerHomeLink.addEventListener("click", function (e) {
      e.preventDefault();
      showHomePage();
    });
  }

  if (footerFeaturesLink) {
    footerFeaturesLink.addEventListener("click", function (e) {
      e.preventDefault();
      showFeaturesPage();
    });
  }

  if (footerPricingLink) {
    footerPricingLink.addEventListener("click", function (e) {
      e.preventDefault();
      showPricingPage();
    });
  }

  // Annotate Code按钮事件处理
  const annotateBtn = document.getElementById("annotate-btn");
  if (annotateBtn) {
    annotateBtn.addEventListener("click", function () {
      // 检查用户是否登录
      if (!isLoggedIn || !currentUser) {
        showToast(
          "error",
          "Authentication Required",
          "Please login to use the code annotation service"
        );
        // 显示登录弹窗
        if (loginModal) {
          loginModal.classList.add("active");
        }
        return;
      }

      // 检查用户积分是否足够
      if (currentUser.credits <= 0) {
        showToast(
          "warning",
          "Insufficient Credits",
          "You don't have enough credits to use this service. Please purchase more credits."
        );
        return;
      }

      // 获取代码内容
      const codeTextarea = document.querySelector(".code-textarea");
      const codeContent = codeTextarea ? codeTextarea.value.trim() : "";

      if (!codeContent) {
        showToast(
          "warning",
          "Empty Code",
          "Please enter some code to annotate"
        );
        return;
      }

      // 显示加载指示器
      const loader = document.getElementById("annotation-loader");
      if (loader) loader.style.display = "block";

      // 模拟处理延迟 (在实际应用中，这里会是API调用)
      setTimeout(function () {
        // 隐藏加载指示器
        if (loader) loader.style.display = "none";

        // 显示成功指示器
        const successCheck = document.getElementById("annotation-success");
        if (successCheck) {
          successCheck.style.display = "block";

          // 短暂显示成功标记后显示结果
          setTimeout(function () {
            if (successCheck) successCheck.style.display = "none";

            // 减少用户积分
            if (decreaseUserCredits(1)) {
              // 显示注释后的代码结果
              if (resultsCard) resultsCard.style.display = "block";

              // 滚动到结果卡片
              if (resultsCard) {
                resultsCard.scrollIntoView({ behavior: "smooth" });
              }

              showToast(
                "success",
                "Annotation Complete",
                "Your code has been successfully annotated"
              );
            }
          }, 1000);
        }
      }, 2000);
    });
  }

  // 登录和注册按钮事件处理
  const loginBtn = document.querySelector(".login-btn");
  const signupBtn = document.querySelector(".signup-btn");
  const loginModal = document.getElementById("login-modal");
  const signupModal = document.getElementById("signup-modal");
  const forgotPasswordModal = document.getElementById("forgot-password-modal");
  const modalCloseButtons = document.querySelectorAll(".modal-close");
  const showSignupLink = document.getElementById("show-signup");
  const showLoginLink = document.getElementById("show-login");
  const showForgotPasswordLink = document.getElementById(
    "show-forgot-password"
  );
  const backToLoginLink = document.getElementById("back-to-login");

  // 函数：清空表单内容
  function clearFormInputs(formElement) {
    if (!formElement) return;

    // 找到表单中所有输入元素并清空它们
    const inputs = formElement.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });

    // 清除可能存在的验证错误样式
    inputs.forEach((input) => {
      input.classList.remove("is-invalid");
    });
  }

  // 关闭模态框并清空其中的表单
  function closeModalAndClearForm(modal) {
    if (modal) {
      // 关闭模态框
      modal.classList.remove("active");

      // 查找并清空模态框中的表单
      const form = modal.querySelector("form");
      if (form) {
        clearFormInputs(form);
      }
    }
  }

  // 登录按钮点击事件
  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      if (loginModal) {
        loginModal.classList.add("active");
      }
    });
  }

  // 注册按钮点击事件
  if (signupBtn) {
    signupBtn.addEventListener("click", function () {
      if (signupModal) {
        signupModal.classList.add("active");
      }
    });
  }

  // 从登录模态框中的"Sign up"链接到注册模态框
  if (showSignupLink) {
    showSignupLink.addEventListener("click", function (e) {
      e.preventDefault();
      // 隐藏登录模态框并清空表单
      closeModalAndClearForm(loginModal);
      // 显示注册模态框
      if (signupModal) {
        signupModal.classList.add("active");
      }
    });
  }

  // 从注册模态框中的"Login"链接到登录模态框
  if (showLoginLink) {
    showLoginLink.addEventListener("click", function (e) {
      e.preventDefault();
      // 隐藏注册模态框并清空表单
      closeModalAndClearForm(signupModal);
      // 显示登录模态框
      if (loginModal) {
        loginModal.classList.add("active");
      }
    });
  }

  // 模态框关闭按钮事件处理
  if (modalCloseButtons) {
    modalCloseButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        // 找到当前模态框并关闭它
        const currentModal = this.closest(".modal-backdrop");
        if (currentModal) {
          closeModalAndClearForm(currentModal);
        }
      });
    });
  }

  // 忘记密码链接点击事件
  if (showForgotPasswordLink) {
    showForgotPasswordLink.addEventListener("click", function (e) {
      e.preventDefault();
      // 隐藏登录模态框并清空表单
      closeModalAndClearForm(loginModal);
      // 显示忘记密码模态框
      if (forgotPasswordModal) {
        forgotPasswordModal.classList.add("active");
      }
    });
  }

  // 返回登录按钮点击事件
  if (backToLoginLink) {
    backToLoginLink.addEventListener("click", function (e) {
      e.preventDefault();
      // 隐藏忘记密码模态框并清空表单
      closeModalAndClearForm(forgotPasswordModal);
      // 显示登录模态框
      if (loginModal) {
        loginModal.classList.add("active");
      }
    });
  }

  // 用户头像点击事件 - 显示下拉菜单
  const userAvatar = document.querySelector(".user-avatar");
  const userDropdown = document.querySelector(".dropdown-menu");
  if (userAvatar) {
    userAvatar.addEventListener("click", function (e) {
      e.stopPropagation();
      if (userDropdown) {
        userDropdown.classList.toggle("active");
      }
    });

    // 点击其他地方关闭下拉菜单
    document.addEventListener("click", function () {
      if (userDropdown && userDropdown.classList.contains("active")) {
        userDropdown.classList.remove("active");
      }
    });
  }

  // 登出按钮点击事件
  const logoutItem = document.querySelector(".logout-item");
  if (logoutItem) {
    logoutItem.addEventListener("click", function (e) {
      e.preventDefault();
      handleLogout();
    });
  }

  // 处理登出
  function handleLogout() {
    // 获取保存的token
    const token = localStorage.getItem("token");

    // 如果有token，则发送登出请求
    if (token) {
      // 发送登出请求到API
      fetch("http://web.codecommont.com/api/v1/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Logout response:", data);
          // 无论成功与否都清除本地状态
          completeLogout();
          showToast(
            "info",
            "Logged Out",
            data.message || "You have been successfully logged out"
          );
        })
        .catch((error) => {
          console.error("Logout request error:", error);
          // 发生错误时也清除本地状态
          completeLogout();
          showToast(
            "warning",
            "Logout Notice",
            "There was an issue with the logout process, but you have been logged out locally"
          );
        });
    } else {
      // 没有token直接清除本地状态
      completeLogout();
      showToast("info", "Logged Out", "You have been successfully logged out");
    }
  }

  // 完成登出流程
  function completeLogout() {
    // 清除用户信息
    localStorage.removeItem("token");
    localStorage.removeItem("token_type");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");
    currentUser = null;
    isLoggedIn = false;

    // 更新UI
    updateUIForLoggedOutUser();

    // 隐藏用户仪表盘
    if (userDashboard) {
      userDashboard.style.display = "none";
    }
  }

  // 更新登出后的UI
  function updateUIForLoggedOutUser() {
    // 显示登录和注册按钮
    const authButtons = document.querySelector(".auth-buttons");
    if (authButtons) {
      authButtons.style.display = "flex";
    }

    // 隐藏用户菜单
    const userMenu = document.querySelector(".user-menu");
    if (userMenu) {
      userMenu.style.display = "none";
    }

    // 关闭可能打开的下拉菜单
    const userDropdown = document.querySelector(".dropdown-menu");
    if (userDropdown) {
      userDropdown.classList.remove("active");
    }
  }

  // 创建Toast通知容器
  const toastContainer = document.createElement("div");
  toastContainer.className = "toast-container";
  document.body.appendChild(toastContainer);

  // 显示Toast通知函数
  function showToast(type, title, message, duration = 3000) {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    // 根据类型设置图标
    let icon = "";
    switch (type) {
      case "success":
        icon = '<i class="fas fa-check-circle toast-icon"></i>';
        break;
      case "error":
        icon = '<i class="fas fa-exclamation-circle toast-icon"></i>';
        break;
      case "warning":
        icon = '<i class="fas fa-exclamation-triangle toast-icon"></i>';
        break;
      case "info":
      default:
        icon = '<i class="fas fa-info-circle toast-icon"></i>';
        break;
    }

    toast.innerHTML = `
      ${icon}
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close">&times;</button>
      <div class="toast-progress">
        <div class="toast-progress-bar"></div>
      </div>
    `;

    // 添加到容器
    toastContainer.appendChild(toast);

    // 关闭按钮事件
    const closeBtn = toast.querySelector(".toast-close");
    closeBtn.addEventListener("click", function () {
      toast.remove();
    });

    // 自动移除
    setTimeout(function () {
      if (toast.parentNode) {
        toast.remove();
      }
    }, duration);
  }

  // 更新登录表单代码使用Toast通知
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // 获取表单数据
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;

      // 简单验证
      if (!email || !validateEmail(email)) {
        showToast(
          "error",
          "Validation Error",
          "Please enter a valid email address"
        );
        return;
      }

      if (!password) {
        showToast("error", "Validation Error", "Please enter your password");
        return;
      }

      // 显示加载状态
      const submitBtn = loginForm.querySelector("button[type='submit']");
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.classList.add("btn-loading");
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin spinner"></i> Processing...';

      // MD5加密密码
      const hashedPassword = md5(password);

      // 发送登录请求到API
      fetch("http://web.codecommont.com/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: hashedPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // 恢复按钮状态
          submitBtn.disabled = false;
          submitBtn.classList.remove("btn-loading");
          submitBtn.innerHTML = originalBtnText;

          // 检查登录是否成功
          if (data.ok === 1 || data.success) {
            // 登录成功，保存token
            const tokenData = data.data || {};
            if (tokenData.access_token) {
              localStorage.setItem("token", tokenData.access_token);
              localStorage.setItem(
                "token_type",
                tokenData.token_type || "bearer"
              );
              localStorage.setItem(
                "refresh_token",
                tokenData.refresh_token || ""
              );
            }

            // 获取用户信息
            const userData = tokenData.user || data.user || {};

            // 创建用户对象
            currentUser = {
              name: userData.name || email,
              email: userData.email || email,
              credits: userData.credits !== undefined ? userData.credits : 1,
              id: userData.id,
              avatar_url: userData.avatar_url || "",
              created_at: userData.created_at,
              last_login_at: userData.last_login_at,
            };

            // 保存用户信息
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            isLoggedIn = true;

            // 更新UI
            updateUIForLoggedInUser();

            // 关闭登录模态框并清空表单
            closeModalAndClearForm(loginModal);

            // 显示成功消息
            showToast(
              "success",
              "Login Successful",
              data.message || "Welcome back!"
            );
          } else {
            // 登录失败
            showToast(
              "error",
              "Login Failed",
              data.message || "Please check your email and password"
            );
          }
        })
        .catch((error) => {
          console.error("Login request error:", error);

          // 恢复按钮状态
          submitBtn.disabled = false;
          submitBtn.classList.remove("btn-loading");
          submitBtn.innerHTML = originalBtnText;

          // 显示错误消息
          showToast(
            "error",
            "Request Error",
            "An error occurred during login. Please try again later"
          );
        });
    });
  }

  // 注册表单提交处理
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // 获取表单数据
      const name = document.getElementById("signup-name").value.trim();
      const email = document.getElementById("signup-email").value.trim();
      const password = document.getElementById("signup-password").value;
      const confirmPassword = document.getElementById("signup-confirm").value;

      // 简单验证
      if (!name) {
        showToast("error", "Validation Error", "Please enter your name");
        return;
      }

      if (!email || !validateEmail(email)) {
        showToast(
          "error",
          "Validation Error",
          "Please enter a valid email address"
        );
        return;
      }

      if (!password) {
        showToast("error", "Validation Error", "Please enter a password");
        return;
      }

      if (password !== confirmPassword) {
        showToast("error", "Validation Error", "Passwords do not match");
        return;
      }

      // 显示加载状态
      const submitBtn = signupForm.querySelector("button[type='submit']");
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.classList.add("btn-loading");
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin spinner"></i> Processing...';

      // MD5加密密码和确认密码
      const hashedPassword = md5(password);
      const hashedConfirmPassword = md5(confirmPassword);

      // 发送注册请求到API
      fetch("http://web.codecommont.com/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: hashedPassword,
          password_confirm: hashedConfirmPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // 恢复按钮状态
          submitBtn.disabled = false;
          submitBtn.classList.remove("btn-loading");
          submitBtn.innerHTML = originalBtnText;

          // 根据API返回的数据结构检查注册是否成功
          if (data.ok === 1 || data.success) {
            // 显示成功消息
            showToast(
              "success",
              "Registration Successful",
              data.message || "Account created successfully. Welcome!"
            );

            // 关闭注册模态框并清空表单
            closeModalAndClearForm(signupModal);

            // 打开登录模态框并填入邮箱
            if (loginModal) {
              loginModal.classList.add("active");
              const loginEmailInput = document.getElementById("login-email");
              if (loginEmailInput) {
                loginEmailInput.value = email;
              }
            }
          } else {
            // 注册失败
            showToast(
              "error",
              "Registration Failed",
              data.message || "Registration failed. Please try again"
            );
          }
        })
        .catch((error) => {
          console.error("Registration request error:", error);

          // 恢复按钮状态
          submitBtn.disabled = false;
          submitBtn.classList.remove("btn-loading");
          submitBtn.innerHTML = originalBtnText;

          // 显示错误消息
          showToast(
            "error",
            "Request Error",
            "An error occurred during registration. Please try again later"
          );
        });
    });
  }

  // 工具函数 - 验证邮箱
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // 忘记密码表单处理
  const forgotPasswordForm = document.getElementById("forgot-password-form");
  if (forgotPasswordForm) {
    // 清空表单内容
    forgotPasswordForm.innerHTML = "";

    // 创建表单结构
    const formContent = `
      <div class="form-group">
        <label class="form-label" for="forgot-email">Email</label>
        <input
          type="email"
          class="form-control"
          id="forgot-email"
          placeholder="Enter your email"
          novalidate
        />
      </div>
      
      <div class="form-group">
        <label class="form-label" for="verification-code">Verification Code</label>
        <div style="display: flex; gap: 10px;">
          <input
            type="text"
            class="form-control"
            id="verification-code"
            placeholder="Enter verification code"
            style="flex: 1;"
          />
          <button type="button" class="btn btn-secondary" id="get-verification-btn">
            Get Code
          </button>
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label" for="new-password">New Password</label>
        <input
          type="password"
          class="form-control"
          id="new-password"
          placeholder="Enter new password"
        />
      </div>
      
      <div class="form-group">
        <label class="form-label" for="confirm-password">Confirm Password</label>
        <input
          type="password"
          class="form-control"
          id="confirm-password"
          placeholder="Confirm new password"
        />
      </div>
      
      <button type="submit" class="btn btn-primary btn-large">
        Reset Password
      </button>
      
      <div class="text-center" style="margin-top: 15px">
        <a href="#" id="back-to-login" style="color: var(--primary)">
          Back to Login
        </a>
      </div>
    `;

    // 添加表单内容
    forgotPasswordForm.innerHTML = formContent;

    // 获取新元素引用
    const backToLoginLink = document.getElementById("back-to-login");
    const getVerificationBtn = document.getElementById("get-verification-btn");

    // 返回登录按钮点击事件
    if (backToLoginLink) {
      backToLoginLink.addEventListener("click", function (e) {
        e.preventDefault();
        // 隐藏忘记密码模态框并清空表单
        closeModalAndClearForm(forgotPasswordModal);
        // 显示登录模态框
        if (loginModal) {
          loginModal.classList.add("active");
        }
      });
    }

    // 获取验证码按钮点击事件
    if (getVerificationBtn) {
      getVerificationBtn.addEventListener("click", function () {
        const email = document.getElementById("forgot-email").value.trim();

        if (!email || !validateEmail(email)) {
          showToast(
            "error",
            "Validation Error",
            "Please enter a valid email address"
          );
          return;
        }

        // 按钮loading状态
        const originalBtnText = getVerificationBtn.innerHTML;
        getVerificationBtn.disabled = true;
        getVerificationBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // 发送获取验证码请求
        fetch("http://web.codecommont.com/api/v1/auth/email-verification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            // 恢复按钮状态
            getVerificationBtn.disabled = false;
            getVerificationBtn.innerHTML = originalBtnText;

            if (data.success) {
              // 倒计时禁用按钮
              let countdown = 60;
              getVerificationBtn.disabled = true;
              getVerificationBtn.innerHTML = `${countdown}s`;

              const timer = setInterval(() => {
                countdown--;
                getVerificationBtn.innerHTML = `${countdown}s`;

                if (countdown <= 0) {
                  clearInterval(timer);
                  getVerificationBtn.disabled = false;
                  getVerificationBtn.innerHTML = "Get Code";
                }
              }, 1000);

              // 显示成功消息
              showToast(
                "success",
                "Code Sent",
                data.message || "Verification code has been sent to your email"
              );
            } else {
              // 显示错误消息
              showToast(
                "error",
                "Failed to Send Code",
                data.message ||
                  "Failed to send verification code. Please try again"
              );
            }
          })
          .catch((error) => {
            console.error("Get verification code error:", error);

            // 恢复按钮状态
            getVerificationBtn.disabled = false;
            getVerificationBtn.innerHTML = originalBtnText;

            // 显示错误消息
            showToast(
              "error",
              "Request Error",
              "An error occurred while requesting the verification code. Please try again later"
            );
          });
      });
    }

    // 表单提交处理
    forgotPasswordForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("forgot-email").value.trim();
      const verificationCode = document
        .getElementById("verification-code")
        .value.trim();
      const newPassword = document.getElementById("new-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      // 验证
      if (!email || !validateEmail(email)) {
        showToast(
          "error",
          "Validation Error",
          "Please enter a valid email address"
        );
        return;
      }

      if (!verificationCode) {
        showToast(
          "error",
          "Validation Error",
          "Please enter verification code"
        );
        return;
      }

      if (!newPassword || newPassword.length < 6) {
        showToast(
          "error",
          "Validation Error",
          "Password must be at least 6 characters"
        );
        return;
      }

      if (newPassword !== confirmPassword) {
        showToast("error", "Validation Error", "Passwords do not match");
        return;
      }

      // 按钮loading状态
      const submitBtn = forgotPasswordForm.querySelector(
        "button[type='submit']"
      );
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.classList.add("btn-loading");
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin spinner"></i> Processing...';

      // MD5加密密码
      const hashedPassword = md5(newPassword);

      // 发送重置密码请求
      fetch("http://web.codecommont.com/api/v1/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          code: verificationCode,
          password: hashedPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // 恢复按钮状态
          submitBtn.disabled = false;
          submitBtn.classList.remove("btn-loading");
          submitBtn.innerHTML = originalBtnText;

          if (data.success) {
            // 重置成功
            showToast(
              "success",
              "Password Reset",
              data.message ||
                "Password has been reset successfully. Please login with your new password"
            );

            // 关闭忘记密码模态框并清空表单
            closeModalAndClearForm(forgotPasswordModal);

            // 显示登录模态框
            if (loginModal) {
              loginModal.classList.add("active");
            }
          } else {
            // 重置失败
            showToast(
              "error",
              "Reset Failed",
              data.message || "Failed to reset password. Please try again"
            );
          }
        })
        .catch((error) => {
          console.error("Reset password error:", error);

          // 恢复按钮状态
          submitBtn.disabled = false;
          submitBtn.classList.remove("btn-loading");
          submitBtn.innerHTML = originalBtnText;

          // 显示错误消息
          showToast(
            "error",
            "Request Error",
            "An error occurred during password reset. Please try again later"
          );
        });
    });
  }
});

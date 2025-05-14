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
      if (userDashboard) userDashboard.style.display = "none";
    }

    // 隐藏价格部分
    if (pricingSection) pricingSection.style.display = "none";
  }

  // 检查用户登录状态
  function checkLoginStatus() {
    // 检查localStorage中是否有用户信息
    const savedUser = localStorage.getItem("currentUser");

    if (savedUser) {
      currentUser = JSON.parse(savedUser);
      isLoggedIn = true;
      updateUIForLoggedInUser();
    }
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
      userMenu.style.display = "block";
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

    // 更新用户信息
    const userName = document.querySelector(".user-name");
    const userEmail = document.querySelector(".user-email");

    if (userName && currentUser) {
      userName.textContent = currentUser.name;
    }

    if (userEmail && currentUser) {
      userEmail.textContent = currentUser.email;
    }

    // 更新积分显示
    const creditCount = document.querySelector(".credit-count");
    if (creditCount && currentUser) {
      creditCount.textContent = currentUser.credits || 25;
    }
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
      // 显示加载指示器
      const loader = document.getElementById("annotation-loader");
      if (loader) loader.style.display = "block";

      // 模拟处理延迟
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

            // 显示注释后的代码结果
            if (resultsCard) resultsCard.style.display = "block";

            // 滚动到结果卡片
            if (resultsCard) {
              resultsCard.scrollIntoView({ behavior: "smooth" });
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
      // 隐藏登录模态框
      if (loginModal) {
        loginModal.classList.remove("active");
      }
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
      // 隐藏注册模态框
      if (signupModal) {
        signupModal.classList.remove("active");
      }
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
        // 找到并关闭所有打开的模态框
        const modals = document.querySelectorAll(".modal-backdrop");
        modals.forEach(function (modal) {
          modal.classList.remove("active");
        });
      });
    });
  }

  // 忘记密码链接点击事件
  if (showForgotPasswordLink) {
    showForgotPasswordLink.addEventListener("click", function (e) {
      e.preventDefault();
      // 隐藏登录模态框
      if (loginModal) {
        loginModal.classList.remove("active");
      }
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
      // 隐藏忘记密码模态框
      if (forgotPasswordModal) {
        forgotPasswordModal.classList.remove("active");
      }
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
    // 清除用户信息
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");
    currentUser = null;
    isLoggedIn = false;

    // 更新UI
    updateUIForLoggedOutUser();

    // 显示通知
    alert("登出成功！");
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

  // 登录表单提交处理
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // 获取表单数据
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;

      // 简单验证
      if (!email || !validateEmail(email)) {
        alert("请输入有效的邮箱地址");
        return;
      }

      if (!password) {
        alert("请输入密码");
        return;
      }

      // 模拟登录成功
      setTimeout(function () {
        // 创建用户对象
        currentUser = {
          name: "John Doe",
          email: email,
          credits: 25,
        };

        // 保存用户信息
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        isLoggedIn = true;

        // 更新UI
        updateUIForLoggedInUser();

        // 关闭登录模态框
        if (loginModal) {
          loginModal.classList.remove("active");
        }

        // 显示成功消息
        alert("登录成功！");
      }, 1000);
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
        alert("请输入姓名");
        return;
      }

      if (!email || !validateEmail(email)) {
        alert("请输入有效的邮箱地址");
        return;
      }

      if (!password) {
        alert("请输入密码");
        return;
      }

      if (password !== confirmPassword) {
        alert("两次输入的密码不匹配");
        return;
      }

      // 模拟注册成功
      setTimeout(function () {
        // 创建用户对象
        currentUser = {
          name: name,
          email: email,
          credits: 25,
        };

        // 保存用户信息
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        isLoggedIn = true;

        // 更新UI
        updateUIForLoggedInUser();

        // 关闭注册模态框
        if (signupModal) {
          signupModal.classList.remove("active");
        }

        // 显示成功消息
        alert("注册成功！");
      }, 1000);
    });
  }

  // 工具函数 - 验证邮箱
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});

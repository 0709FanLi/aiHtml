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
    // 显示加载指示或禁用按钮
    const logoutItem = document.querySelector(".logout-item");
    const originalText = logoutItem.innerHTML;
    logoutItem.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 登出中...';

    // 调用登出API
    fetch("http://web.practicesnow.com/practice/v1/users/logout", {
      method: "POST",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        // 不管状态码如何，先解析JSON响应
        return response.json();
      })
      .then((data) => {
        // 清除用户信息，无论请求是否成功
        localStorage.removeItem("currentUser");
        sessionStorage.removeItem("currentUser");
        currentUser = null;
        isLoggedIn = false;

        // 更新UI
        updateUIForLoggedOutUser();

        // 显示通知
        if (data.status_code >= 200 && data.status_code < 300) {
          // 成功通知
          alert("登出成功！");
        } else {
          // 依然登出，但显示服务器返回的错误
          console.warn("登出过程中服务器返回错误:", data.error);
          alert("登出成功，但服务器返回错误: " + (data.error || "未知错误"));
        }
      })
      .catch((error) => {
        // 即使API调用失败，也进行本地登出
        localStorage.removeItem("currentUser");
        sessionStorage.removeItem("currentUser");
        currentUser = null;
        isLoggedIn = false;

        // 更新UI
        updateUIForLoggedOutUser();

        console.error("登出错误:", error);
        alert("登出成功，但服务器连接错误");
      })
      .finally(() => {
        // 恢复按钮原始状态
        logoutItem.innerHTML = originalText;
      });
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

      // 准备登录数据
      const loginData = {
        email: email,
        password: password,
      };

      // 更新按钮状态
      const submitButton = loginForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.innerHTML =
        '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 登录中...';

      // 调用登录API
      fetch("http://web.practicesnow.com/practice/v1/users/login", {
        method: "POST",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(loginData),
      })
        .then((response) => {
          // 不管状态码如何，先解析JSON响应
          return response.json();
        })
        .then((data) => {
          // 检查status_code是否在200-299范围内
          if (data.status_code >= 200 && data.status_code < 300) {
            // 登录成功，创建用户对象
            const user = {
              id: data.id || generateRandomId(),
              name: data.full_name || email.split("@")[0],
              email: email,
              credits: data.credits || 25,
            };

            // 保存用户信息
            currentUser = user;
            isLoggedIn = true;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            // 关闭登录模态框
            if (loginModal) {
              loginModal.classList.remove("active");
            }

            // 更新UI
            updateUIForLoggedInUser();

            // 显示成功消息
            alert("登录成功！欢迎回来，" + currentUser.name);
          } else {
            // 登录失败
            throw new Error(data.error || "登录失败，请检查账户信息");
          }
        })
        .catch((error) => {
          // 显示错误消息
          alert(error.message || "登录失败，请稍后重试");
          console.error("登录错误:", error);
        })
        .finally(() => {
          // 恢复按钮状态
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonText;
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
        alert("请输入您的姓名");
        return;
      }

      if (!email || !validateEmail(email)) {
        alert("请输入有效的邮箱地址");
        return;
      }

      if (!password || password.length < 6) {
        alert("密码长度必须至少为6个字符");
        return;
      }

      if (password !== confirmPassword) {
        alert("两次输入的密码不一致");
        return;
      }

      // 准备注册数据
      const userData = {
        full_name: name,
        email: email,
        password: password,
      };

      // 更新按钮状态
      const submitButton = signupForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.innerHTML =
        '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 注册中...';

      // 调用注册API
      fetch("http://web.practicesnow.com/practice/v1/users/register", {
        method: "POST",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          // 不管状态码如何，先解析JSON响应
          return response.json();
        })
        .then((data) => {
          // 检查status_code是否在200-299范围内
          if (data.status_code >= 200 && data.status_code < 300) {
            // 注册成功，创建用户对象
            const user = {
              id: data.id || generateRandomId(),
              name: name,
              email: email,
              credits: data.credits || 25,
            };

            // 保存用户信息
            currentUser = user;
            isLoggedIn = true;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            // 关闭注册模态框
            if (signupModal) {
              signupModal.classList.remove("active");
            }

            // 更新UI
            updateUIForLoggedInUser();

            // 显示成功消息
            alert("注册成功！欢迎，" + name);
          } else {
            // 注册失败
            throw new Error(data.error || "注册失败，请稍后重试");
          }
        })
        .catch((error) => {
          // 显示错误消息
          alert(error.message || "注册失败，请稍后重试");
          console.error("注册错误:", error);
        })
        .finally(() => {
          // 恢复按钮状态
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonText;
        });
    });
  }

  // 生成随机ID的辅助函数
  function generateRandomId() {
    return "user_" + Math.random().toString(36).substr(2, 9);
  }

  // 邮箱验证函数
  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // 为输入框添加实时验证
  const loginEmail = document.getElementById("login-email");
  const signupEmail = document.getElementById("signup-email");
  // 重命名避免重复定义
  const forgotEmail = document.getElementById("forgot-email");

  if (loginEmail) {
    loginEmail.addEventListener("input", function () {
      const email = this.value;
      if (email && !validateEmail(email)) {
        displayErrorMessage(
          "login-email",
          "Please enter a valid email address"
        );
      } else {
        clearErrorMessage("login-email");
      }
    });
  }

  if (signupEmail) {
    signupEmail.addEventListener("input", function () {
      const email = this.value;
      if (email && !validateEmail(email)) {
        displayErrorMessage(
          "signup-email",
          "Please enter a valid email address"
        );
      } else {
        clearErrorMessage("signup-email");
      }
    });
  }

  // 为忘记密码输入框添加实时验证
  if (forgotEmail) {
    forgotEmail.addEventListener("input", function () {
      const email = this.value;
      if (email && !validateEmail(email)) {
        displayErrorMessage(
          "forgot-email",
          "Please enter a valid email address"
        );
      } else {
        clearErrorMessage("forgot-email");
      }
    });
  }

  // 为登录邮箱输入框添加blur和focus事件，提供即时验证反馈
  if (loginEmail) {
    // 在输入时验证
    loginEmail.addEventListener("input", function () {
      // 仅当用户已经开始输入时才验证
      if (this.value) {
        if (!validateEmail(this.value)) {
          displayErrorMessage(
            "login-email",
            "Please enter a valid email address"
          );
        } else {
          clearErrorMessage("login-email");
        }
      }
    });

    // 当输入框失去焦点时验证
    loginEmail.addEventListener("blur", function () {
      if (this.value && !validateEmail(this.value)) {
        displayErrorMessage(
          "login-email",
          "Please enter a valid email address"
        );
      }
    });

    // 当获得焦点且有错误时，清除错误以便用户重新输入
    loginEmail.addEventListener("focus", function () {
      // 可选：在获得焦点时清除错误，让用户有更好的体验
      // clearErrorMessage("login-email");
    });
  }

  // 添加Try Service Now和About CTA按钮点击事件
  const tryServiceBtn = document.getElementById("try-service-btn");
  const aboutCtaBtn = document.getElementById("about-cta-btn");

  if (tryServiceBtn) {
    tryServiceBtn.addEventListener("click", function () {
      showFeaturesPage();
    });
  }

  if (aboutCtaBtn) {
    aboutCtaBtn.addEventListener("click", function () {
      showFeaturesPage();
    });
  }

  // 忘记密码表单提交处理
  const forgotPasswordForm = document.getElementById("forgot-password-form");
  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // 获取表单数据
      const email = document.getElementById("forgot-email").value.trim();

      // 简单验证
      if (!email || !validateEmail(email)) {
        showNotification("error", "Please enter a valid email address");
        return;
      }

      // 准备请求数据
      const resetData = {
        email: email,
      };

      // 更新按钮状态
      const submitButton = forgotPasswordForm.querySelector(
        'button[type="submit"]'
      );
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.innerHTML =
        '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

      // 模拟API调用 - 实际项目中应替换为真实API
      setTimeout(function () {
        // 恢复按钮状态
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;

        // 显示成功消息
        showNotification(
          "success",
          "Password reset link has been sent to your email"
        );

        // 关闭忘记密码模态框
        if (forgotPasswordModal) {
          forgotPasswordModal.classList.remove("active");
        }
      }, 1500);

      // 实际项目中的API调用示例
      /*
            fetch("http://your-api-endpoint/reset-password", {
              method: "POST",
              credentials: "omit",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify(resetData)
            })
            .then(response => response.json())
            .then(data => {
              if (data.status_code >= 200 && data.status_code < 300) {
                // 成功发送重置链接
                showNotification("success", "Password reset link has been sent to your email");
                
                // 关闭忘记密码模态框
                if (forgotPasswordModal) {
                  forgotPasswordModal.classList.remove("active");
                }
              } else {
                // 发送失败
                throw new Error(data.error || "Failed to send reset link, please try again later");
              }
            })
            .catch(error => {
              // 显示错误消息
              showNotification("error", error.message || "Failed to send reset link, please try again later");
              console.error("Reset password error:", error);
            })
            .finally(() => {
              // 恢复按钮状态
              submitButton.disabled = false;
              submitButton.innerHTML = originalButtonText;
            });
            */
    });
  }

  // 显示错误消息的函数
  function displayErrorMessage(inputId, message) {
    const input = document.getElementById(inputId);
    if (!input) return;

    // 检查是否已存在错误消息
    let errorElement = input.parentNode.querySelector(".form-error");

    if (!errorElement) {
      // 创建错误消息元素
      errorElement = document.createElement("div");
      errorElement.className = "form-error";
      errorElement.style.color = "var(--danger)";
      errorElement.style.fontSize = "14px";
      errorElement.style.marginTop = "5px";

      // 添加到DOM中
      input.parentNode.appendChild(errorElement);
    }

    // 设置错误消息
    errorElement.textContent = message;

    // 添加错误样式到输入框
    input.style.borderColor = "var(--danger)";
  }

  // 清除错误消息的函数
  function clearErrorMessage(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    // 查找并删除错误消息
    const errorElement = input.parentNode.querySelector(".form-error");
    if (errorElement) {
      errorElement.remove();
    }

    // 恢复输入框样式
    input.style.borderColor = "";
  }

  // 显示通知的函数
  function showNotification(type, message, duration = 3000) {
    // 先移除可能存在的通知
    removeAllNotifications();

    // 创建通知元素
    const notification = document.createElement("div");
    notification.className =
      type === "success" ? "success-notification" : "error-notification";

    // 添加图标和消息
    const icon = document.createElement("i");
    icon.className =
      type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle";
    notification.appendChild(icon);

    const messageElem = document.createElement("p");
    messageElem.textContent = message;
    notification.appendChild(messageElem);

    // 添加到DOM
    document.body.appendChild(notification);

    // 显示通知
    setTimeout(() => {
      notification.classList.add("active");
    }, 10);

    // 设置通知自动消失
    setTimeout(() => {
      notification.classList.remove("active");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, duration);
  }

  // 移除所有通知的函数
  function removeAllNotifications() {
    const notifications = document.querySelectorAll(
      ".success-notification, .error-notification"
    );
    notifications.forEach((notif) => {
      notif.classList.remove("active");
      setTimeout(() => {
        notif.remove();
      }, 300);
    });
  }
});

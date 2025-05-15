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

  // 初始化标签页切换功能
  initTabSwitching();

  // 初始化文件上传功能
  initFileUpload();

  // 初始显示设置 - 页面加载时默认显示Home (About内容)
  function initialPageSetup() {
    // 仅显示About相关卡片 (前5个卡片是About内容)
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
      } catch (e) {
        console.error("Error parsing user info:", e);
        // 数据解析错误但不清除数据，保持用户会话
      }
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
      userMenu.style.display = "flex"; // 改为flex以支持排列
    }

    // 显示导航栏登出按钮
    const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
      logoutBtn.style.display = "block";
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

  // 代码注释按钮事件处理
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
      const fileInput = document.getElementById("code-file-input");

      // 检查是否有代码输入或文件上传
      if (
        !codeContent &&
        (!fileInput || !fileInput.files || !fileInput.files.length)
      ) {
        showToast(
          "warning",
          "Empty Code",
          "Please enter some code or upload a file to annotate"
        );
        return;
      }

      // 显示加载指示器
      const loader = document.getElementById("annotation-loader");
      if (loader) loader.style.display = "block";

      // 隐藏之前的结果
      if (resultsCard) resultsCard.style.display = "none";

      // 禁用按钮，防止重复提交
      annotateBtn.disabled = true;

      // 准备请求数据
      const requestData = {
        file_name: "code_snippet.txt", // 默认文件名
      };

      // 如果有文件，处理文件上传
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];

        // 检查文件大小限制 (3MB)
        if (file.size > 3 * 1024 * 1024) {
          showToast(
            "error",
            "File Too Large",
            "The file exceeds the maximum size of 3MB"
          );
          if (loader) loader.style.display = "none";
          annotateBtn.disabled = false;
          return;
        }

        // 更新文件名
        requestData.file_name = file.name;

        // 读取文件并转换为Base64
        const reader = new FileReader();
        reader.onload = function (e) {
          // 获取Base64字符串 (移除前缀 "data:*;base64,")
          const base64Content = e.target.result.split(",")[1];
          requestData.base64_file = base64Content;

          // 发送API请求
          sendAnnotationRequest(requestData);
        };

        reader.onerror = function () {
          showToast(
            "error",
            "File Read Error",
            "Failed to read the uploaded file"
          );
          if (loader) loader.style.display = "none";
          annotateBtn.disabled = false;
        };

        // 读取文件为Base64
        reader.readAsDataURL(file);
      }
      // 如果有代码输入，直接发送
      else if (codeContent) {
        requestData.code = codeContent;
        sendAnnotationRequest(requestData);
      }
    });

    // 发送注释请求到API
    function sendAnnotationRequest(requestData) {
      // 获取token（如果存在）
      const token = localStorage.getItem("token");
      const tokenType = localStorage.getItem("token_type") || "bearer";

      const headers = {
        "Content-Type": "application/json",
      };

      // 如果有token，添加到请求头
      if (token) {
        headers["Authorization"] = `${tokenType} ${token}`;
      }

      // 发送请求到API
      fetch("http://web.codecommont.com/api/v1/code/comment", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // 隐藏加载指示器
          const loader = document.getElementById("annotation-loader");
          if (loader) loader.style.display = "none";

          // 检查API响应
          if (data.ok === 1 || data.success) {
            // 显示成功指示器
            const successCheck = document.getElementById("annotation-success");
            if (successCheck) {
              successCheck.style.display = "block";

              // 短暂显示成功标记后显示结果
              setTimeout(function () {
                if (successCheck) successCheck.style.display = "none";

                // 更新用户积分
                if (data.data && data.data.credits !== undefined) {
                  // 直接使用API返回的积分更新用户积分
                  if (currentUser) {
                    currentUser.credits = data.data.credits;
                    localStorage.setItem(
                      "currentUser",
                      JSON.stringify(currentUser)
                    );
                    updateCreditsDisplay();
                  }
                } else {
                  // 如果API没有返回积分，则使用原来的扣减逻辑
                  decreaseUserCredits(1);
                }

                // 显示注释后的代码结果
                displayAnnotatedCode(data.data || data);

                // 显示结果卡片
                if (resultsCard) {
                  resultsCard.style.display = "block";
                  resultsCard.scrollIntoView({ behavior: "smooth" });
                }

                showToast(
                  "success",
                  "Annotation Complete",
                  "Your code has been successfully annotated"
                );

                // 重置表单状态
                const fileInput = document.getElementById("code-file-input");
                if (fileInput) fileInput.value = "";

                // 恢复按钮状态
                annotateBtn.disabled = false;
              }, 1000);
            }
          } else {
            // 处理API错误
            showToast(
              "error",
              "Annotation Failed",
              data.message || "Failed to annotate code. Please try again."
            );
            annotateBtn.disabled = false;
          }
        })
        .catch((error) => {
          console.error("Annotation API error:", error);

          // 隐藏加载指示器
          const loader = document.getElementById("annotation-loader");
          if (loader) loader.style.display = "none";

          // 显示错误信息
          showToast(
            "error",
            "API Error",
            "An error occurred while processing your request. Please try again later."
          );

          // 恢复按钮状态
          annotateBtn.disabled = false;
        });
    }

    // 显示注释后的代码结果
    function displayAnnotatedCode(responseData) {
      // 提取原始代码和注释后的代码
      const originalCode = document.getElementById("original-code");
      const annotatedCode = document.getElementById("annotated-code");
      const originalLineNumbers = document.getElementById(
        "original-line-numbers"
      );
      const annotatedLineNumbers = document.getElementById(
        "annotated-line-numbers"
      );

      if (!originalCode || !annotatedCode) return;

      // 清空之前的内容
      originalCode.innerHTML = "";
      annotatedCode.innerHTML = "";
      originalLineNumbers.innerHTML = "";
      annotatedLineNumbers.innerHTML = "";

      // 隐藏原始代码面板
      const originalPanel = document.querySelector(".code-panel:first-child");
      if (originalPanel) {
        originalPanel.style.display = "none";
      }

      // 让注释代码面板占据全部宽度
      const annotatedPanel = document.querySelector(".code-panel:last-child");
      if (annotatedPanel) {
        annotatedPanel.style.flexBasis = "100%";
      }

      // 处理注释后的代码 - 检查新的API响应格式
      if (responseData.content) {
        // 直接将API返回的content内容展示在annotated code框中
        annotatedCode.innerHTML = responseData.content;

        // 确保pre标签内容不超出宽度
        const preElements = annotatedCode.querySelectorAll("pre");
        if (preElements.length > 0) {
          preElements.forEach((pre) => {
            pre.style.maxWidth = "100%";
            pre.style.overflow = "auto";
            pre.style.whiteSpace = "pre-wrap";
            pre.style.wordBreak = "break-word";
          });
        }
      } else {
        // 旧格式
        const commentedCode =
          responseData.commented_code ||
          responseData.code ||
          "// No annotated code returned";
        const commentedLines = commentedCode.split("\n");
        for (let i = 0; i < commentedLines.length; i++) {
          annotatedLineNumbers.innerHTML += `<div>${i + 1}</div>`;
          annotatedCode.innerHTML += `<div>${
            escapeHtml(commentedLines[i]) || " "
          }</div>`;
        }
      }
    }

    // HTML转义函数，防止XSS
    function escapeHtml(text) {
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }
  }

  // 下载按钮事件处理
  const downloadBtn = document.getElementById("download-btn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      // 获取代码内容
      const annotatedCode = document.getElementById("annotated-code");
      if (!annotatedCode) return;

      // 检查是否含有HTML内容
      let codeContent = "";

      if (annotatedCode.querySelector("pre code")) {
        // 如果有pre/code标签，获取code标签中的纯文本内容
        const codeElement = annotatedCode.querySelector("pre code");
        // 获取纯文本
        codeContent = codeElement.textContent || codeElement.innerText;
      } else if (annotatedCode.innerHTML.includes("<pre")) {
        // 备用方案：如果找不到code元素但有pre标签
        const tempElement = document.createElement("div");
        tempElement.innerHTML = annotatedCode.innerHTML;
        const preElement = tempElement.querySelector("pre");
        if (preElement) {
          codeContent = preElement.textContent || preElement.innerText;
        } else {
          codeContent = tempElement.textContent || tempElement.innerText;
        }
      } else {
        // 否则获取普通文本内容
        codeContent = annotatedCode.textContent || annotatedCode.innerText;
      }

      // 解码HTML实体
      codeContent = decodeHtmlEntities(codeContent);

      // 创建下载文件
      const blob = new Blob([codeContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "annotated-code.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // 显示成功提示
      showToast(
        "success",
        "Download Complete",
        "Your annotated code has been downloaded"
      );
    });
  }

  // 辅助函数：解码HTML实体
  function decodeHtmlEntities(text) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  }

  // 监听代码输入和文件上传互斥逻辑
  const codeTextarea = document.querySelector(".code-textarea");
  const fileInput = document.getElementById("code-file-input");

  if (codeTextarea && fileInput) {
    // 当输入代码时，清空文件选择
    codeTextarea.addEventListener("input", function () {
      if (this.value.trim() && fileInput.value) {
        fileInput.value = "";
        showToast(
          "info",
          "File Cleared",
          "Your uploaded file has been cleared as you've entered code directly"
        );
      }
    });

    // 当选择文件时，清空代码输入
    fileInput.addEventListener("change", function () {
      if (this.files.length > 0 && codeTextarea.value.trim()) {
        codeTextarea.value = "";
        showToast(
          "info",
          "Input Cleared",
          "Your entered code has been cleared as you've uploaded a file"
        );
      }
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

  // 清空表单内容
  function clearFormInputs(formElement) {
    if (!formElement) return;

    // 找到表单中所有输入元素并清空它们
    const inputs = formElement.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";

      // 清除可能存在的验证错误样式
      input.classList.remove("is-invalid");
    });
  }

  // 清空表单内容而不清除特定项
  function clearFormInputsExcept(formElement, exceptIds = []) {
    if (!formElement) return;

    // 找到表单中所有输入元素
    const inputs = formElement.querySelectorAll("input");
    inputs.forEach((input) => {
      // 如果输入框ID不在exceptIds列表中，则清空它
      if (!exceptIds.includes(input.id)) {
        input.value = "";
      }

      // 清除可能存在的验证错误样式
      input.classList.remove("is-invalid");
    });
  }

  // 关闭模态框并清空其中的表单，支持保留特定输入项
  function closeModalAndClearForm(modal, preserveInputIds = []) {
    if (modal) {
      // 关闭模态框
      modal.classList.remove("active");

      // 查找并清空模态框中的表单
      const form = modal.querySelector("form");
      if (form) {
        if (preserveInputIds.length > 0) {
          clearFormInputsExcept(form, preserveInputIds);
        } else {
          clearFormInputs(form);
        }
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
      // 获取注册邮箱
      const signupEmail = document.getElementById("signup-email");
      const emailValue = signupEmail ? signupEmail.value.trim() : "";

      // 隐藏注册模态框并清空表单
      closeModalAndClearForm(signupModal);

      // 显示登录模态框
      if (loginModal) {
        loginModal.classList.add("active");

        // 如果有填写邮箱，带入登录弹框
        if (emailValue) {
          const loginEmail = document.getElementById("login-email");
          if (loginEmail) {
            loginEmail.value = emailValue;
          }
        }
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

      // 获取登录邮箱
      const loginEmail = document.getElementById("login-email");
      const emailValue = loginEmail ? loginEmail.value.trim() : "";

      // 隐藏登录模态框并清空表单
      closeModalAndClearForm(loginModal);

      // 显示忘记密码模态框
      if (forgotPasswordModal) {
        forgotPasswordModal.classList.add("active");

        // 如果登录弹框已填写邮箱，带入到忘记密码弹框
        if (emailValue) {
          setTimeout(() => {
            const forgotEmail = document.getElementById("forgot-email");
            if (forgotEmail) {
              forgotEmail.value = emailValue;
            }
          }, 100); // 短暂延时确保DOM已渲染
        }
      }
    });
  }

  // 返回登录按钮点击事件
  if (backToLoginLink) {
    backToLoginLink.addEventListener("click", function (e) {
      e.preventDefault();

      // 获取忘记密码弹框中的邮箱
      const forgotEmail = document.getElementById("forgot-email");
      const emailValue = forgotEmail ? forgotEmail.value.trim() : "";

      // 隐藏忘记密码模态框并清空表单
      closeModalAndClearForm(forgotPasswordModal);

      // 显示登录模态框
      if (loginModal) {
        loginModal.classList.add("active");

        // 如果忘记密码弹框已填写邮箱，带入到登录弹框
        if (emailValue) {
          setTimeout(() => {
            const loginEmail = document.getElementById("login-email");
            if (loginEmail) {
              loginEmail.value = emailValue;
            }
          }, 100); // 短暂延时确保DOM已渲染
        }
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
  const logoutBtn = document.querySelector(".logout-btn");

  if (logoutItem) {
    logoutItem.addEventListener("click", function (e) {
      e.preventDefault();
      handleLogout();
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      handleLogout();
    });
  }

  // 处理登出
  function handleLogout() {
    // 获取保存的token
    const token = localStorage.getItem("token");
    const tokenType = localStorage.getItem("token_type") || "bearer";

    // 显示正在登出的提示
    showToast("info", "Logging Out", "Processing your logout request...");

    // 如果有token，则发送登出请求
    if (token) {
      // 发送登出请求到API
      fetch("http://web.codecommont.com/api/v1/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenType} ${token}`,
        },
      })
        .then((response) => {
          // 只要发送了请求，无论服务器返回什么，都清除本地状态
          // 因为图中API说明：前端需要移除存储的令牌，服务器端JWT无状态
          completeLogout();

          if (response.ok) {
            return response.json();
          } else {
            // 即使请求失败，也视为登出成功
            throw new Error("Logout request failed, but local session cleared");
          }
        })
        .then((data) => {
          console.log("Logout response:", data);
          showToast(
            "success",
            "Logged Out",
            "You have been successfully logged out"
          );

          // 登出后重定向到首页
          showHomePage();
        })
        .catch((error) => {
          console.error("Logout request error:", error);
          // 仍然显示成功登出，因为本地已清除
          showToast(
            "success",
            "Logged Out",
            "You have been successfully logged out"
          );

          // 登出后重定向到首页
          showHomePage();
        });
    } else {
      // 没有token直接清除本地状态
      completeLogout();
      showToast(
        "success",
        "Logged Out",
        "You have been successfully logged out"
      );

      // 登出后重定向到首页
      showHomePage();
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

    // 隐藏可能正在显示的结果卡片
    if (resultsCard) {
      resultsCard.style.display = "none";
    }

    // 清空代码输入区域
    const codeTextarea = document.querySelector(".code-textarea");
    if (codeTextarea) {
      codeTextarea.value = "";
    }

    // 关闭任何可能打开的模态框
    const activeModals = document.querySelectorAll(".modal-backdrop.active");
    activeModals.forEach((modal) => {
      modal.classList.remove("active");
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

    // 隐藏导航栏登出按钮
    const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
      logoutBtn.style.display = "none";
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

            // 检查API响应
            if (data.ok === 1 || data.success) {
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

      // MD5加密密码和确认密码
      const hashedPassword = md5(newPassword);
      const hashedConfirmPassword = md5(confirmPassword);

      // 发送重置密码请求
      fetch("http://web.codecommont.com/api/v1/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          verification_code: verificationCode,
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

          if (data.ok === 1 || data.success) {
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

  // 初始化标签页切换功能
  function initTabSwitching() {
    const tabs = document.querySelectorAll(".tab");

    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // 移除所有tab的active类
        tabs.forEach((t) => t.classList.remove("active"));

        // 为当前点击的tab添加active类
        this.classList.add("active");

        // 获取对应内容区域的标识
        const targetContent = this.getAttribute("data-tab");

        // 隐藏所有内容区域
        document.querySelectorAll(".tab-content").forEach((content) => {
          content.classList.remove("active");
        });

        // 显示目标内容区域
        const contentToShow = document.querySelector(
          `.tab-content[data-content="${targetContent}"]`
        );
        if (contentToShow) {
          contentToShow.classList.add("active");
        }
      });
    });
  }

  // 初始化文件上传功能
  function initFileUpload() {
    const fileUploadArea = document.querySelector(".file-upload");
    const fileInput = document.getElementById("code-file-input");
    const codeTextarea = document.querySelector(".code-textarea");

    if (!fileUploadArea || !fileInput) return;

    // 点击上传区域触发文件选择
    fileUploadArea.addEventListener("click", function () {
      fileInput.click();
    });

    // 拖拽文件到上传区域
    fileUploadArea.addEventListener("dragover", function (e) {
      e.preventDefault();
      e.stopPropagation();
      this.classList.add("dragover");
    });

    fileUploadArea.addEventListener("dragleave", function (e) {
      e.preventDefault();
      e.stopPropagation();
      this.classList.remove("dragover");
    });

    fileUploadArea.addEventListener("drop", function (e) {
      e.preventDefault();
      e.stopPropagation();
      this.classList.remove("dragover");

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    });

    // 文件选择变化
    fileInput.addEventListener("change", function () {
      if (this.files.length > 0) {
        handleFileUpload(this.files[0]);
      }
    });

    // 处理文件上传
    function handleFileUpload(file) {
      // 检查文件大小 (最大2MB)
      if (file.size > 2 * 1024 * 1024) {
        showToast(
          "error",
          "File Too Large",
          "The file exceeds the maximum size of 2MB"
        );
        return;
      }

      // 读取文件内容
      const reader = new FileReader();

      reader.onload = function (e) {
        // 显示文件内容到文本区域
        if (codeTextarea) {
          codeTextarea.value = e.target.result;

          // 自动切换到Paste标签页显示内容
          const pasteTab = document.querySelector('.tab[data-tab="paste"]');
          if (pasteTab) {
            pasteTab.click();
          }

          showToast(
            "success",
            "File Uploaded",
            "Your file has been successfully loaded"
          );
        }
      };

      reader.onerror = function () {
        showToast(
          "error",
          "Upload Failed",
          "Failed to read the file. Please try again."
        );
      };

      reader.readAsText(file);
    }
  }
});

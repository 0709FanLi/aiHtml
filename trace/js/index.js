// DOM Elements
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");
const authModal = document.getElementById("authModal");
const closeAuthModal = document.getElementById("closeAuthModal");
const authModalTitle = document.getElementById("authModalTitle");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const forgotPasswordForm = document.getElementById("forgotPasswordForm");
const switchToSignup = document.getElementById("switchToSignup");
const switchToLogin = document.getElementById("switchToLogin");
const forgotPassword = document.getElementById("forgotPassword");
const backToLogin = document.getElementById("backToLogin");
const requestCodeBtn = document.getElementById("requestCodeBtn");
const plannerForm = document.getElementById("plannerForm");
const planLoader = document.getElementById("planLoader");
const results = document.getElementById("results");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");
const planTimeline = document.getElementById("planTimeline");
const planTitle = document.getElementById("planTitle");
const planLocation = document.getElementById("planLocation");
const planTime = document.getElementById("planTime");
const planPeople = document.getElementById("planPeople");
const historyList = document.getElementById("historyList");
const downloadPlan = document.getElementById("downloadPlan");
const sharePlan = document.getElementById("sharePlan");
const buyPlanButtons = document.querySelectorAll(".buy-plan");
const termsModal = document.getElementById("termsModal");
const privacyModal = document.getElementById("privacyModal");
const closeTermsModal = document.getElementById("closeTermsModal");
const closePrivacyModal = document.getElementById("closePrivacyModal");
const acceptTerms = document.getElementById("acceptTerms");
const acceptPrivacy = document.getElementById("acceptPrivacy");
const showTermsLogin = document.getElementById("showTermsLogin");
const showPrivacyLogin = document.getElementById("showPrivacyLogin");
const showTermsSignup = document.getElementById("showTermsSignup");
const showPrivacySignup = document.getElementById("showPrivacySignup");
const footerTerms = document.getElementById("footerTerms");
const footerPrivacy = document.getElementById("footerPrivacy");
const userName = document.getElementById("userName");
const userInitial = document.getElementById("userInitial");
const userCredits = document.getElementById("userCredits");
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");
let activeModal = null;
let sourceElement = null;

// App State
let isLoggedIn = false;
let usageCount = parseInt(localStorage.getItem("usageCount") || 0);
let currentPlan = null;
let history = [];
let userData = null;

// 添加页面加载事件监听器
document.addEventListener("DOMContentLoaded", initApp);

// Initialize App
function initApp() {
  // 从本地存储加载用户状态
  const tripWeaverUser = localStorage.getItem("tripWeaverUser");

  if (tripWeaverUser) {
    try {
      const loginInfo = JSON.parse(tripWeaverUser);

      if (loginInfo && loginInfo.user) {
        isLoggedIn = true;
        // 创建userData对象，设置积分信息
        userData = {
          name: loginInfo.user.name || loginInfo.user.email || "",
          email: loginInfo.user.email || "",
          id: loginInfo.user.id,
          credits: 0, // 默认积分为0，后续应当从API获取
        };

        // 检查是否有临时设置的积分
        if (localStorage.getItem("userCredits")) {
          userData.credits = parseInt(
            localStorage.getItem("userCredits") || "0"
          );
        }

        updateUserDisplay(userData);
      } else {
        // 数据不完整，视为未登录
        isLoggedIn = false;
        userData = null;
      }
    } catch (e) {
      console.error("Error parsing user data:", e);
      // 数据解析错误，视为未登录
      isLoggedIn = false;
      userData = null;
    }
  } else {
    isLoggedIn = false;
    userData = null;
  }

  // 更新UI状态
  updateUIState();

  // 初始化时间选择器
  initTimeInputs();

  // 加载历史记录（只有登录后才加载）
  if (isLoggedIn) {
    loadHistory();
  }

  // 添加事件监听器
  menuToggle.addEventListener("click", toggleMenu);
  loginBtn.addEventListener("click", openLoginModal);
  signupBtn.addEventListener("click", openSignupModal);
  logoutBtn.addEventListener("click", handleLogout);
  closeAuthModal.addEventListener("click", closeModal);
  switchToSignup.addEventListener("click", switchToSignupForm);
  switchToLogin.addEventListener("click", switchToLoginForm);
  document.getElementById("doLoginBtn").addEventListener("click", handleLogin);
  document
    .getElementById("doSignupBtn")
    .addEventListener("click", handleSignup);
  document
    .getElementById("forgotPassword")
    .addEventListener("click", showForgotPassword);
  document
    .getElementById("backToLogin")
    .addEventListener("click", backToLoginForm);
  document
    .getElementById("requestCodeBtn")
    .addEventListener("click", requestVerificationCode);
  document
    .getElementById("forgotPasswordForm")
    .addEventListener("submit", resetPassword);
  document
    .getElementById("acceptTerms")
    .addEventListener("click", handleAcceptTerms);
  document
    .getElementById("acceptPrivacy")
    .addEventListener("click", handleAcceptPrivacy);
  document
    .getElementById("footerTerms")
    .addEventListener("click", (e) => showTerms(e, "footer"));
  document
    .getElementById("footerPrivacy")
    .addEventListener("click", (e) => showPrivacy(e, "footer"));
  document
    .getElementById("showTermsLogin")
    .addEventListener("click", (e) => showTerms(e, "login"));
  document
    .getElementById("showPrivacyLogin")
    .addEventListener("click", (e) => showPrivacy(e, "login"));
  document
    .getElementById("showTermsSignup")
    .addEventListener("click", (e) => showTerms(e, "signup"));
  document
    .getElementById("showPrivacySignup")
    .addEventListener("click", (e) => showPrivacy(e, "signup"));
  document
    .getElementById("closeTermsModal")
    .addEventListener("click", closeTerms);
  document
    .getElementById("closePrivacyModal")
    .addEventListener("click", closePrivacy);
  // 绑定表单提交事件并添加调试
  const plannerForm = document.getElementById("plannerForm");
  if (plannerForm) {
    console.log("Found planner form, adding submit event listener");
    plannerForm.addEventListener("submit", generatePlan);
    console.log("Submit event listener added to planner form");
  } else {
    console.error("Planner form not found!");
  }
  document
    .getElementById("downloadPlan")
    .addEventListener("click", handleDownloadPlan);
  document
    .getElementById("sharePlan")
    .addEventListener("click", handleSharePlan);
  document.querySelectorAll(".buy-plan").forEach((btn) => {
    btn.addEventListener("click", () => handleBuyPlan(btn.dataset.plan));
  });

  // 初始化滚动动画
  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();
}

// Toggle Menu
function toggleMenu() {
  navMenu.classList.toggle("active");
}

// Open Login Modal
function openLoginModal() {
  authModalTitle.textContent = "Login";
  loginForm.classList.add("active");
  signupForm.classList.remove("active");
  authModal.classList.add("active");
}

// Open Signup Modal
function openSignupModal() {
  authModalTitle.textContent = "Sign Up";
  signupForm.classList.add("active");
  loginForm.classList.remove("active");
  authModal.classList.add("active");
}

// Close Modal
function closeModal() {
  authModal.classList.remove("active");
}

// Switch to Signup Form
function switchToSignupForm(e) {
  e.preventDefault();
  authModalTitle.textContent = "Sign Up";
  loginForm.classList.remove("active");
  signupForm.classList.add("active");
}

// Switch to Login Form
function switchToLoginForm(e) {
  e.preventDefault();
  authModalTitle.textContent = "Login";
  signupForm.classList.remove("active");
  loginForm.classList.add("active");
}

// Handle Login
function handleLogin(e) {
  e.preventDefault();
  console.log("handleLogin被调用");
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const agreement = document.getElementById("agreeTerms");
  if (!agreement.checked) {
    showToast(
      "You must agree to the Terms of Service and Privacy Policy to log in.",
      "warning"
    );
    return;
  }
  if (!email || !password) {
    showToast("Please fill in all required fields.", "warning");
    return;
  }
  const submitBtn = document.getElementById("doLoginBtn");
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
  const hashedPassword = md5(password);
  const requestData = { email: email, password: hashedPassword };
  console.log("发送登录请求...", { email, password: "[已加密]" });
  fetch("http://web.doaitravel.com/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData),
    credentials: "omit",
  })
    .then((response) => {
      console.log("收到登录请求响应:", response.status, response.statusText);
      return response.json();
    })
    .then((response) => {
      console.log("解析登录响应JSON:", response);
      if (response.ok === 1 && response.data) {
        // 登录成功
        const data = response.data;
        const loginInfo = {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          token_type: data.token_type,
          access_token_expires: data.access_token_expires,
          refresh_token_expires: data.refresh_token_expires,
          user: data.user || {
            id: data.user_id || 0,
            name: data.user_name || email,
            email: email,
          },
        };
        localStorage.setItem("tripWeaverUser", JSON.stringify(loginInfo));
        localStorage.setItem("userCredits", "5");
        isLoggedIn = true;
        userData = {
          name: loginInfo.user.name || loginInfo.user.email,
          email: loginInfo.user.email,
          id: loginInfo.user.id,
          credits: 5,
        };
        updateUserDisplay(userData);
        updateUIState();
        closeModal();
        loadHistory();
        showToast(`Welcome back, ${userData.name}!`, "success");
      } else {
        // 登录失败
        debugger;
        showToast(
          response.message || "Login failed. Please check your credentials.",
          "error"
        );
      }
    })
    .catch((error) => {
      showToast(
        "An error occurred during login. Please try again later.",
        "error"
      );
    })
    .finally(() => {
      console.log("登录请求完成，恢复按钮状态");
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Login";
    });
}

// 更新用户显示信息
function updateUserDisplay(user) {
  if (user) {
    // 显示用户名
    userName.textContent = user.name || user.email;

    // 获取首字母作为头像
    if (user.name && user.name.trim()) {
      userInitial.textContent = user.name.charAt(0).toUpperCase();
    } else if (user.email) {
      userInitial.textContent = user.email.charAt(0).toUpperCase();
    }

    // 显示剩余旅行生成次数
    userCredits.textContent = user.credits || 0;
  } else {
    // 默认状态
    userName.textContent = "User";
    userInitial.textContent = "U";
    userCredits.textContent = "0";
  }
}

// 更新UI状态（登录/未登录）
function updateUIState() {
  document.body.classList.toggle("logged-in", isLoggedIn);
  document.body.classList.toggle("logged-out", !isLoggedIn);
}

// Handle Signup
function handleSignup(e) {
  e.preventDefault();

  // 获取表单值
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const passwordConfirm = document.getElementById(
    "signupPasswordConfirm"
  ).value;

  // 验证协议复选框
  const agreement = document.getElementById("agreeTermsSignup");
  if (!agreement.checked) {
    showNotification("您必须同意服务条款和隐私政策才能注册账号。", "warning");
    return;
  }

  // 基本验证
  if (!name || !email || !password || !passwordConfirm) {
    showNotification("请填写所有必填字段。", "warning");
    return;
  }

  if (!isValidEmail(email)) {
    document.getElementById("signupEmailError").style.display = "block";
    return;
  } else {
    document.getElementById("signupEmailError").style.display = "none";
  }

  if (password.length < 6) {
    document.getElementById("signupPasswordError").style.display = "block";
    return;
  } else {
    document.getElementById("signupPasswordError").style.display = "none";
  }

  if (password !== passwordConfirm) {
    document.getElementById("passwordMatchError").style.display = "block";
    return;
  } else {
    document.getElementById("passwordMatchError").style.display = "none";
  }

  // 禁用按钮防止多次提交
  const submitBtn = document.getElementById("doSignupBtn");
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 注册中...';

  // 加密密码
  const hashedPassword = md5(password);

  // 准备请求数据
  const requestData = {
    name: name,
    email: email,
    password: hashedPassword,
  };

  // API注册调用
  fetch("http://web.doaitravel.com/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("注册失败");
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        // 保存用户数据
        userData = data.user;
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("userData", JSON.stringify(userData));

        // 更新应用状态
        isLoggedIn = true;

        // 更新UI
        updateUserDisplay(userData);
        updateUIState();

        // 关闭模态窗口
        closeModal();

        // 显示成功消息和欢迎信息
        showToast(`欢迎加入 TripWeaver, ${name}！`, "success");

        // 重置免费使用计数
        usageCount = 0;
        localStorage.setItem("usageCount", "0");

        // 加载（空的）历史记录
        loadHistory();
      } else {
        throw new Error(data.message || "注册失败");
      }
    })
    .catch((error) => {
      console.error("Signup error:", error);
      showNotification(
        error.message || "注册过程中出现错误，请稍后重试。",
        "error"
      );
    })
    .finally(() => {
      // 恢复按钮状态
      submitBtn.disabled = false;
      submitBtn.innerHTML = "注册";
    });
}

// Handle Logout
function handleLogout() {
  // 获取令牌
  const accessToken = localStorage.getItem("accessToken");

  // 如果有令牌则调用登出API
  if (accessToken) {
    // 显示加载状态
    logoutBtn.disabled = true;
    logoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    // 调用登出API
    fetch("http://web.doaitravel.com/api/v1/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("登出失败，请稍后重试");
        }
        return response.json();
      })
      .then((data) => {
        console.log("登出成功:", data);
        completeLogout();
      })
      .catch((error) => {
        console.error("登出错误:", error);
        // 即使API调用失败，也应当完成本地登出
        completeLogout();
        showToast(
          error.message || "登出过程中出现错误，但已清除本地登录状态",
          "warning"
        );
      })
      .finally(() => {
        // 恢复按钮状态
        logoutBtn.disabled = false;
        logoutBtn.innerHTML = "Logout";
      });
  } else {
    // 没有令牌直接完成登出
    completeLogout();
  }
}

// 完成登出过程的辅助函数
function completeLogout() {
  // Update state
  isLoggedIn = false;
  userData = null;

  // Clear local storage
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userData");

  // Update UI
  updateUIState();

  // 隐藏历史部分
  document.getElementById("history").classList.remove("active");

  // Show message
  showToast("Logged out successfully", "success");
}

// Generate Plan
function generatePlan(e) {
  e.preventDefault();

  // 添加调试信息
  console.log("Generate Plan function called!");

  // 获取表单值
  const location = document.getElementById("location").value;
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;
  const travelers = document.getElementById("travelers").value;

  console.log("Form values:", { location, startTime, endTime, travelers });

  // 基本验证 - 按照顺序验证各字段

  // 1. 验证目的地
  if (!location.trim()) {
    document
      .getElementById("location")
      .setCustomValidity("Please enter a destination");
    document.getElementById("location").reportValidity();
    document.getElementById("location").focus();
    return;
  } else {
    document.getElementById("location").setCustomValidity("");
  }

  // 2. 验证开始时间
  const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
  if (!startTime.trim()) {
    document
      .getElementById("startTime")
      .setCustomValidity("Please enter a start time");
    document.getElementById("startTime").reportValidity();
    document.getElementById("startTime").focus();
    return;
  } else if (!timeRegex.test(startTime.trim())) {
    document
      .getElementById("startTime")
      .setCustomValidity("Please enter time in 24-hour format (HH:MM)");
    document.getElementById("startTime").reportValidity();
    document.getElementById("startTime").focus();
    return;
  } else {
    document.getElementById("startTime").setCustomValidity("");
  }

  // 3. 验证结束时间
  if (!endTime.trim()) {
    document
      .getElementById("endTime")
      .setCustomValidity("Please enter an end time");
    document.getElementById("endTime").reportValidity();
    document.getElementById("endTime").focus();
    return;
  } else if (!timeRegex.test(endTime.trim())) {
    document
      .getElementById("endTime")
      .setCustomValidity("Please enter time in 24-hour format (HH:MM)");
    document.getElementById("endTime").reportValidity();
    document.getElementById("endTime").focus();
    return;
  } else {
    document.getElementById("endTime").setCustomValidity("");
  }

  // 4. 验证旅行人数
  if (!travelers || parseInt(travelers) < 1) {
    document
      .getElementById("travelers")
      .setCustomValidity("Please enter number of travelers");
    document.getElementById("travelers").reportValidity();
    document.getElementById("travelers").focus();
    return;
  } else {
    document.getElementById("travelers").setCustomValidity("");
  }

  // 添加调试日志
  console.log("登录状态检查:", { isLoggedIn, userData });

  // 检查用户是否登录
  if (!isLoggedIn) {
    // 未登录用户必须先登录
    console.log("用户未登录，显示登录弹窗");
    showToast("Please log in to generate a travel plan", "warning");
    openLoginModal();
    return;
  }

  // 检查登录用户是否有足够积分
  console.log(
    "用户已登录，检查积分:",
    userData ? userData.credits : "无积分信息"
  );
  if (!userData || userData.credits < 1) {
    console.log("积分不足，跳转到购买页面");
    showToast(
      "You don't have enough credits. Please purchase a plan to continue.",
      "warning"
    );
    document.getElementById("pricing").scrollIntoView({ behavior: "smooth" });
    return;
  }

  console.log("登录和积分检查通过，继续生成旅行计划");

  // 显示加载中，隐藏结果
  planLoader.classList.add("active");
  results.classList.remove("active");

  // 增加未登录用户的使用次数
  if (!isLoggedIn) {
    usageCount++;
    localStorage.setItem("usageCount", usageCount);
  }

  // 准备请求数据
  const requestData = {
    destination: location,
    start_time: startTime,
    end_time: endTime,
    people_count: parseInt(travelers),
  };

  // 发送实际请求到 API
  const apiUrl = "http://web.doaitravel.com/api/v1/travel/generate";
  const headers = {
    "Content-Type": "application/json",
  };

  // 如果用户已登录，添加授权头
  if (isLoggedIn) {
    try {
      const tripWeaverUser = JSON.parse(
        localStorage.getItem("tripWeaverUser") || "{}"
      );
      if (tripWeaverUser && tripWeaverUser.access_token) {
        headers["Authorization"] = `Bearer ${tripWeaverUser.access_token}`;
      }
    } catch (e) {
      console.error("Error parsing access token:", e);
    }
  }

  fetch(apiUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Plan generation failed");
      }
      return response.json();
    })
    .then((response) => {
      // 隐藏加载中，显示结果
      planLoader.classList.remove("active");
      results.classList.add("active");

      if (response.ok === 1 && response.data) {
        const data = response.data;

        // 更新计划详情
        planTitle.textContent = `Exploring ${data.destination}`;
        planLocation.textContent = data.destination;
        planTime.textContent = `${formatTime(data.start_time)} - ${formatTime(
          data.end_time
        )}`;
        planPeople.textContent = `${data.people_count} ${
          data.people_count == 1 ? "Traveler" : "Travelers"
        }`;

        // 处理并显示时间线
        const timelineData = data.content.map((activity) => ({
          time: new Date(`2000-01-01T${activity.time}`),
          title: activity.title,
          description: activity.info,
        }));

        displayTimelinePlan(timelineData);

        // 保存当前计划
        currentPlan = {
          id: Date.now(),
          title: `Exploring ${data.destination}`,
          location: data.destination,
          startTime: data.start_time,
          endTime: data.end_time,
          travelers: data.people_count,
          date: new Date().toISOString().split("T")[0],
          timeline: timelineData,
        };

        // 已登录用户减少积分并添加到历史
        if (isLoggedIn && userData) {
          userData.credits = Math.max(0, userData.credits - 1);
          localStorage.setItem("userCredits", userData.credits.toString());
          updateUserDisplay(userData);
          addToHistory(currentPlan);
        }

        // 滚动到结果
        results.scrollIntoView({ behavior: "smooth", block: "start" });

        // 显示成功消息
        showToast("Travel plan generated successfully!", "success");
      } else {
        throw new Error(response.message || "Plan generation failed");
      }
    })
    .catch((error) => {
      console.error("Plan generation error:", error);
      planLoader.classList.remove("active");
      showToast(
        error.message ||
          "Unable to generate travel plan, please try again later",
        "error"
      );
    });
}

// 初始化时间选择器
function initTimeInputs() {
  // 获取输入框元素
  const startTimeInput = document.getElementById("startTime");
  const endTimeInput = document.getElementById("endTime");
  const locationInput = document.getElementById("location");

  // 为自定义时间输入框添加输入验证
  startTimeInput.addEventListener("input", validateTimeInput);
  endTimeInput.addEventListener("input", validateTimeInput);

  // 添加点击图标时获取焦点的功能
  const timeIcons = document.querySelectorAll(".time-icon");
  timeIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      this.previousElementSibling.focus();
    });
  });

  // 添加目的地图标点击功能
  const destinationIcon = document.querySelector(".destination-icon");
  if (destinationIcon) {
    destinationIcon.addEventListener("click", function () {
      locationInput.focus();
    });
  }
}

// 验证时间输入
function validateTimeInput(e) {
  const input = e.target;
  const timeValue = input.value;

  // 正则表达式验证时间格式 (HH:MM - 24小时制)
  const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;

  if (timeValue && !timeRegex.test(timeValue)) {
    input.setCustomValidity(
      "Please enter a valid time in 24-hour format (e.g., 13:30)"
    );
  } else {
    input.setCustomValidity("");

    // 格式化输入，确保两位数字
    if (timeRegex.test(timeValue)) {
      const [hours, minutes] = timeValue.split(":");
      input.value = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
    }
  }
}

// Format time (e.g., "14:30" to "14:30" or "2:30 PM" to "14:30")
function formatTime(timeString) {
  // 确保时间使用24小时制格式
  try {
    // 如果已经是24小时制格式，直接返回
    if (/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/.test(timeString)) {
      const [hours, minutes] = timeString.split(":");
      return `${hours.padStart(2, "0")}:${minutes}`;
    }

    // 否则尝试转换成24小时制
    if (timeString.includes("AM") || timeString.includes("PM")) {
      const [time, modifier] = timeString.split(" ");
      let [hours, minutes] = time.split(":");

      if (modifier === "PM" && hours !== "12") {
        hours = parseInt(hours, 10) + 12;
      }

      if (modifier === "AM" && hours === "12") {
        hours = "00";
      }

      return `${hours.padStart(2, "0")}:${minutes}`;
    }

    return timeString;
  } catch (e) {
    console.error("Error formatting time:", e);
    return timeString; // 出错时返回原始字符串
  }
}

// 添加小时到日期
function addHours(date, hours) {
  const newDate = new Date(date);
  newDate.setTime(newDate.getTime() + hours * 60 * 60 * 1000);
  return newDate;
}

// Display Timeline Plan
function displayTimelinePlan(plan) {
  // Clear previous timeline
  planTimeline.innerHTML = "";

  // Add each activity to the timeline
  plan.forEach((activity) => {
    const timeString = activity.time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const timelineItem = document.createElement("div");
    timelineItem.className = "timeline-item";

    timelineItem.innerHTML = `
                    <div class="timeline-time">${timeString}</div>
                    <h4 class="timeline-title">${activity.title}</h4>
                    <p class="timeline-desc">${activity.description}</p>
                `;

    planTimeline.appendChild(timelineItem);
  });
}

// Add to History
function addToHistory(plan) {
  // Add to local history array
  history.unshift(plan);

  // Save to localStorage (in a real app, this would be sent to a server)
  localStorage.setItem("travelHistory", JSON.stringify(history));

  // Update UI
  loadHistory();
}

// Load History
function loadHistory() {
  // 只在登录状态下加载历史记录
  if (isLoggedIn) {
    const savedHistory = localStorage.getItem("travelHistory");
    if (savedHistory) {
      history = JSON.parse(savedHistory);
      displayHistory();
    } else {
      history = [];
      displayHistory();
    }
    // 显示历史部分
    document.getElementById("history").classList.add("active");
  } else {
    // 未登录时隐藏历史部分
    document.getElementById("history").classList.remove("active");
    history = [];
  }
}

// Display History
function displayHistory() {
  // Clear history list
  historyList.innerHTML = "";

  // Add each item to history list
  history.forEach((item) => {
    const historyCard = document.createElement("div");
    historyCard.className = "history-card";

    historyCard.innerHTML = `
                    <div class="history-header">
                        <h4>${item.title}</h4>
                    </div>
                    <div class="history-body">
                        <div class="history-meta">
                            <span><i class="fas fa-map-marker-alt"></i>${
                              item.location
                            }</span>
                            <span><i class="far fa-calendar"></i>${formatDate(
                              item.date
                            )}</span>
                        </div>
                        <p>${formatTime(item.startTime)} - ${formatTime(
      item.endTime
    )}</p>
                        <button class="btn btn-outline btn-sm view-plan" data-id="${
                          item.id
                        }">View Plan</button>
                    </div>
                `;

    historyList.appendChild(historyCard);
  });

  // Add event listeners to view plan buttons
  const viewPlanButtons = document.querySelectorAll(".view-plan");
  viewPlanButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const planId = parseInt(button.getAttribute("data-id"));
      viewHistoryPlan(planId);
    });
  });
}

// Format Date (e.g., "2023-05-15" to "May 15, 2023")
function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

// View History Plan
function viewHistoryPlan(planId) {
  // Find the plan in history
  const plan = history.find((item) => item.id === planId);

  if (plan) {
    // Update current plan
    currentPlan = plan;

    // Update plan details
    planTitle.textContent = plan.title;
    planLocation.textContent = plan.location;
    planTime.textContent = `${formatTime(plan.startTime)} - ${formatTime(
      plan.endTime
    )}`;
    planPeople.textContent = `${plan.travelers} ${
      plan.travelers == 1 ? "Traveler" : "Travelers"
    }`;

    // Display timeline
    if (plan.timeline) {
      displayTimelinePlan(plan.timeline);
    } else {
      // Generate new timeline if not saved
      const newTimeline = generateTimelinePlan(
        plan.location,
        plan.startTime,
        plan.endTime,
        plan.travelers
      );
      displayTimelinePlan(newTimeline);

      // Update plan with new timeline
      plan.timeline = newTimeline;
      localStorage.setItem("travelHistory", JSON.stringify(history));
    }

    // Show results
    results.classList.add("active");

    // Scroll to results
    document
      .getElementById("planner")
      .scrollIntoView({ behavior: "smooth", block: "start" });
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Handle Download Plan
function handleDownloadPlan() {
  if (!currentPlan) return;

  // Create text content for the plan
  let planText = `${currentPlan.title}\n`;
  planText += `Location: ${currentPlan.location}\n`;
  planText += `Time: ${formatTime(currentPlan.startTime)} - ${formatTime(
    currentPlan.endTime
  )}\n`;
  planText += `Travelers: ${currentPlan.travelers}\n\n`;
  planText += `ITINERARY:\n\n`;

  currentPlan.timeline.forEach((activity) => {
    const timeString = activity.time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    planText += `${timeString} - ${activity.title}\n`;
    planText += `${activity.description}\n\n`;
  });

  // Create a blob and download link
  const blob = new Blob([planText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${currentPlan.location.replace(/\s+/g, "_")}_Travel_Plan.txt`;
  document.body.appendChild(a);
  a.click();

  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);

  showToast("Plan downloaded successfully", "success");
}

// Handle Share Plan
function handleSharePlan() {
  if (!currentPlan) return;

  // In a real app, this would create a shareable link or open share dialogs
  // For demo purposes, we'll just copy a fake URL to clipboard

  const dummyShareUrl = `https://tripweaver.com/share/${currentPlan.id}`;

  // Copy to clipboard
  navigator.clipboard
    .writeText(dummyShareUrl)
    .then(() => {
      showToast("Share link copied to clipboard!", "success");
    })
    .catch((err) => {
      showToast("Failed to copy share link", "error");
      console.error("Could not copy text: ", err);
    });
}

// Handle Buy Plan
function handleBuyPlan(plan) {
  if (!isLoggedIn) {
    showToast("请先登录后再购买套餐", "error");
    openLoginModal();
    return;
  }

  // 禁用按钮防止重复点击
  const buttons = document.querySelectorAll(".buy-plan");
  buttons.forEach((btn) => {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 处理中...';
  });

  // 准备请求数据
  const requestData = {
    planType: plan,
  };

  // 显示处理中提示
  showToast("正在处理您的购买请求...", "success");

  // API调用实现
  /*
  fetch("http://web.doaitravel.com/api/v1/payment/purchase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
    },
    body: JSON.stringify(requestData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("购买请求失败");
    }
    return response.json();
  })
  .then(data => {
    // 更新用户积分
    if (data.success && data.user) {
      userData = data.user;
      localStorage.setItem("userData", JSON.stringify(userData));
      updateUserDisplay(userData);
    }
    
    // 显示成功消息
    showToast(data.message || "套餐购买成功！", "success");
  })
  .catch(error => {
    console.error("Payment error:", error);
    showToast("处理您的支付时出现问题，请稍后再试", "error");
  })
  .finally(() => {
    // 恢复按钮状态
    buttons.forEach(btn => {
      btn.disabled = false;
      let planType = btn.dataset.plan;
      btn.innerHTML = planType === "monthly" || planType === "annual" ? "订阅" : "开始使用";
    });
  });
  */

  // 临时模拟成功响应（在实际实现中移除此代码）
  setTimeout(() => {
    // 添加模拟的积分
    let creditsToAdd = 0;
    switch (plan) {
      case "basic":
        creditsToAdd = 3;
        break;
      case "standard":
        creditsToAdd = 8;
        break;
      case "monthly":
        creditsToAdd = 30;
        break;
      case "annual":
        creditsToAdd = 500;
        break;
    }

    // 模拟更新用户数据
    if (userData) {
      userData.credits = (userData.credits || 0) + creditsToAdd;
      // 将积分存储到localStorage，以便下次加载时使用
      localStorage.setItem("userCredits", userData.credits.toString());
      updateUserDisplay(userData);
    }

    // 显示成功消息
    showToast(`套餐购买成功！已添加 ${creditsToAdd} 积分。`, "success");

    // 恢复按钮状态
    buttons.forEach((btn) => {
      btn.disabled = false;
      let planType = btn.dataset.plan;
      btn.innerHTML =
        planType === "monthly" || planType === "annual" ? "订阅" : "开始使用";
    });
  }, 1500);
}

// Show Toast Notification
function showToast(message, type = "success") {
  debugger;
  console.log("showToast被调用:", message, type);

  // 首先检查notification元素是否存在
  let toast = document.getElementById("notification");
  let toastMessage = document.getElementById("notificationMessage");

  // 如果元素不存在，则创建一个新的Toast元素
  if (!toast) {
    console.log("创建新的Toast元素");
    toast = document.createElement("div");
    toast.id = "notification";
    toast.className = "toast";
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 16px 20px;
      border-radius: 8px;
      color: white;
      font-size: 16px;
      z-index: 10000;
      display: flex;
      align-items: center;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      min-width: 300px;
      pointer-events: auto;
    `;

    // 创建Toast图标
    const icon = document.createElement("i");
    icon.classList.add("fas");
    toast.appendChild(icon);

    // 创建Toast消息文本
    toastMessage = document.createElement("span");
    toastMessage.id = "notificationMessage";
    toastMessage.style.marginLeft = "10px";
    toast.appendChild(toastMessage);

    // 创建关闭按钮
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "&times;";
    closeBtn.style.cssText = `
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      margin-left: auto;
      cursor: pointer;
    `;
    closeBtn.onclick = function () {
      toast.classList.remove("show");
      setTimeout(() => {
        toast.style.display = "none";
      }, 300);
    };
    toast.appendChild(closeBtn);

    // 添加到body
    document.body.appendChild(toast);
  }

  // 如果提示消息元素不存在
  if (!toastMessage) {
    toastMessage = document.createElement("span");
    toastMessage.id = "notificationMessage";
    toastMessage.style.marginLeft = "10px";
    toast.appendChild(toastMessage);
  }

  // 设置Toast消息文本
  toastMessage.textContent = message;

  // 设置Toast图标和颜色
  const icon = toast.querySelector("i");
  if (icon) {
    icon.className = "fas"; // 清除所有类
    if (type === "success") {
      icon.className += " fa-check-circle";
      toast.style.backgroundColor = "#28a745";
    } else if (type === "warning") {
      icon.className += " fa-exclamation-triangle";
      toast.style.backgroundColor = "#ffc107";
      toast.style.color = "#333";
    } else {
      icon.className += " fa-exclamation-circle";
      toast.style.backgroundColor = "#dc3545";
    }
  }

  // 清除旧定时器
  if (toast.hideTimer) clearTimeout(toast.hideTimer);
  if (toast.removeTimer) clearTimeout(toast.removeTimer);

  // 强制显示Toast
  toast.style.display = "flex";
  toast.classList.add("show");

  // 添加Toast动画样式
  if (!document.getElementById("toast-animation-style")) {
    const style = document.createElement("style");
    style.id = "toast-animation-style";
    style.innerHTML = `
      .toast {
        opacity: 0;
        transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        transform: translateY(-20px) translateX(-50%);
      }
      .toast.show {
        opacity: 1;
        transform: translateY(0) translateX(-50%);
      }
    `;
    document.head.appendChild(style);
  }

  // 在一定时间后自动隐藏Toast
  toast.hideTimer = setTimeout(() => {
    toast.classList.remove("show");
    toast.removeTimer = setTimeout(() => {
      toast.style.display = "none";
    }, 300);
  }, 3000);

  // 添加闪烁效果
  let flashCount = 0;
  const flashInterval = setInterval(() => {
    if (flashCount >= 2) {
      clearInterval(flashInterval);
      return;
    }
    toast.style.transform = "translateY(0) translateX(-50%) scale(1.05)";
    setTimeout(() => {
      toast.style.transform = "translateY(0) translateX(-50%) scale(1)";
    }, 100);
    flashCount++;
  }, 200);

  // 返回Toast对象，方便调用方使用
  return toast;
}

// 添加注册事件处理
document.addEventListener("DOMContentLoaded", function () {
  // 登录事件处理已在initApp函数中通过handleLogin函数绑定，此处不再重复绑定
  console.log("DOMContentLoaded: 登录事件处理器已在initApp函数中绑定");

  // 注册按钮事件处理
  const signupBtn = document.getElementById("doSignupBtn");
  if (signupBtn) {
    signupBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value;
      const confirmPassword = document.getElementById(
        "signupPasswordConfirm"
      ).value;
      const agreement = document.getElementById("agreeTermsSignup");

      // 校验
      if (!name || !email || !password || !confirmPassword) {
        showNotification("Please fill in all required fields.", "warning");
        return;
      }

      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(email)) {
        showNotification("Please enter a valid email address.", "warning");
        return;
      }

      if (password.length < 6) {
        showNotification("Password must be at least 6 characters.", "warning");
        return;
      }

      if (password !== confirmPassword) {
        showNotification("Passwords do not match.", "warning");
        document.getElementById("passwordMatchError").style.display = "block";
        return;
      } else {
        document.getElementById("passwordMatchError").style.display = "none";
      }

      if (!agreement || !agreement.checked) {
        showNotification(
          "You must agree to the Terms of Service and Privacy Policy before signing up.",
          "warning"
        );
        return;
      }

      // 禁用按钮防止重复提交
      signupBtn.disabled = true;
      signupBtn.textContent = "Signing up...";

      // md5加密
      const md5Password = md5(password);
      const md5Confirm = md5(confirmPassword);

      // 注册API
      fetch("http://web.doaitravel.com/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password: md5Password,
          password_confirm: md5Confirm,
        }),
        credentials: "omit",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((data) => {
              throw new Error(data.message || "Registration failed.");
            });
          }
        })
        .then((data) => {
          showNotification("Registration successful! Please login.", "success");
          // 切换到登录表单
          loginForm.classList.add("active");
          signupForm.classList.remove("active");
          authModalTitle.textContent = "Login";
          document.getElementById("loginEmail").value = email;
        })
        .catch((error) => {
          showNotification(error.message, "error");
        })
        .finally(() => {
          signupBtn.disabled = false;
          signupBtn.textContent = "Sign Up";
        });
    });
  }
});

// Show Terms of Service Modal
function showTerms(e, source) {
  e.preventDefault();
  sourceElement = source;
  activeModal = "terms";
  termsModal.classList.add("active");
}

// Show Privacy Policy Modal
function showPrivacy(e, source) {
  e.preventDefault();
  sourceElement = source;
  activeModal = "privacy";
  privacyModal.classList.add("active");
}

// Close Terms of Service Modal
function closeTerms() {
  termsModal.classList.remove("active");
  activeModal = null;
}

// Close Privacy Policy Modal
function closePrivacy() {
  privacyModal.classList.remove("active");
  activeModal = null;
}

// Handle accepting Terms of Service
function handleAcceptTerms() {
  if (sourceElement === "login") {
    document.getElementById("agreeTerms").checked = true;
  } else if (sourceElement === "signup") {
    document.getElementById("agreeTermsSignup").checked = true;
  }
  closeTerms();
}

// Handle accepting Privacy Policy
function handleAcceptPrivacy() {
  if (sourceElement === "login") {
    document.getElementById("agreeTerms").checked = true;
  } else if (sourceElement === "signup") {
    document.getElementById("agreeTermsSignup").checked = true;
  }
  closePrivacy();
}

// Show Forgot Password Form
function showForgotPassword(e) {
  e.preventDefault();
  loginForm.classList.remove("active");
  signupForm.classList.remove("active");
  forgotPasswordForm.classList.add("active");
  authModalTitle.textContent = "Reset Password";
}

// Back to Login Form
function backToLoginForm(e) {
  e.preventDefault();
  forgotPasswordForm.classList.remove("active");
  loginForm.classList.add("active");
  authModalTitle.textContent = "Login";
  forgotPasswordForm.reset();
}

// Request Verification Code
function requestVerificationCode() {
  const email = document.getElementById("resetEmail").value;

  if (!email || !isValidEmail(email)) {
    showNotification("Please enter a valid email address", "warning");
    return;
  }

  // 禁用按钮避免重复请求
  const button = document.getElementById("requestCodeBtn");
  const originalText = button.textContent;
  button.disabled = true;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  // 发送验证码的API调用
  fetch("http://web.doaitravel.com/api/v1/auth/email-verification", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    credentials: "omit",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok === 1) {
        // 倒计时效果，防止频繁发送验证码
        showNotification("Verification code sent to your email", "success");
        let countdown = 60;
        button.textContent = `Resend (${countdown}s)`;
        const timer = setInterval(() => {
          countdown--;
          if (countdown <= 0) {
            clearInterval(timer);
            button.disabled = false;
            button.textContent = originalText;
          } else {
            button.textContent = `Resend (${countdown}s)`;
          }
        }, 1000);
      } else {
        button.disabled = false;
        button.textContent = originalText;
        showNotification(
          data.message || "Failed to send verification code",
          "error"
        );
      }
    })
    .catch((error) => {
      console.error("Error sending verification code:", error);
      button.disabled = false;
      button.textContent = originalText;
      showNotification(
        "An error occurred while sending verification code",
        "error"
      );
    });
}

// Reset Password
function resetPassword(e) {
  e.preventDefault();

  const email = document.getElementById("resetEmail").value;
  const code = document.getElementById("verificationCode").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // 验证输入
  if (!email || !isValidEmail(email)) {
    showNotification("Please enter a valid email address", "warning");
    return;
  }

  if (!code) {
    showNotification("Please enter the verification code", "warning");
    return;
  }

  if (!newPassword || newPassword.length < 6) {
    showNotification("Password must be at least 6 characters", "warning");
    return;
  }

  if (newPassword !== confirmPassword) {
    showNotification("Passwords do not match", "warning");
    return;
  }

  // 禁用提交按钮
  const submitBtn = forgotPasswordForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Resetting...';

  // 使用MD5加密密码和验证码
  const hashedPassword = md5(newPassword);
  const hashedConfirmPassword = md5(confirmPassword);

  // 忘记密码的API调用
  fetch("http://web.doaitravel.com/api/v1/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      verification_code: code,
      password: hashedPassword,
      password_confirm: hashedConfirmPassword,
    }),
    credentials: "omit",
  })
    .then((response) => response.json())
    .then((data) => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Reset Password";

      if (data.ok === 1) {
        // 重置成功
        showNotification(
          "Password reset successfully. You can now login with your new password.",
          "success"
        );
        backToLoginForm(e);

        // 在登录表单中自动填入邮箱
        document.getElementById("loginEmail").value = email;
      } else {
        showNotification(
          data.message || "Failed to reset password. Please try again.",
          "error"
        );
      }
    })
    .catch((error) => {
      console.error("Error resetting password:", error);
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Reset Password";
      showNotification("An error occurred while resetting password", "error");
    });
}

// Helper functions for form validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 确保时间输入框使用24小时制
document.addEventListener("DOMContentLoaded", function () {
  // initTimeInputs函数已存在，此处只添加可能缺失的功能

  // 获取时间输入框
  const startTime = document.getElementById("startTime");
  const endTime = document.getElementById("endTime");

  if (!startTime || !endTime) return; // 确保元素存在

  // 添加事件监听器处理时间格式验证
  // 注意：这些事件监听器会在页面初始化时添加
  // 如果initTimeInputs函数已经执行过，则这里不会重复绑定
  if (!startTime.hasTimeValidation) {
    startTime.hasTimeValidation = true;

    startTime.addEventListener("input", function (e) {
      validateTimeFormat(e);
    });

    startTime.addEventListener("blur", function () {
      formatTimeInput(this);
    });
  }

  if (!endTime.hasTimeValidation) {
    endTime.hasTimeValidation = true;

    endTime.addEventListener("input", function (e) {
      validateTimeFormat(e);
    });

    endTime.addEventListener("blur", function () {
      formatTimeInput(this);
    });
  }

  // 验证时间格式
  function validateTimeFormat(e) {
    const input = e.target;
    const value = input.value;
    const regex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;

    if (value && !regex.test(value)) {
      input.setCustomValidity("Please enter time in 24-hour format (HH:MM)");
    } else {
      input.setCustomValidity("");
    }
  }

  // 格式化时间输入，确保两位数字
  function formatTimeInput(input) {
    if (input.value && /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/.test(input.value)) {
      const [hours, minutes] = input.value.split(":");
      input.value = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
    }
  }
});

// Show Notification
function showNotification(message, type = "success", duration = 3000) {
  return showToast(message, type);
}

// Animate elements when they come into view
function animateOnScroll() {
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  fadeElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(element);
  });
}

// 添加调试信息
console.log("HTML页面加载中...");

// 直接绑定按钮点击事件
window.addEventListener("load", function () {
  const generateBtn = document.getElementById("generatePlanBtn");
  if (generateBtn) {
    console.log("找到生成按钮，添加点击事件");
    generateBtn.addEventListener("click", function (e) {
      console.log("生成按钮被点击");
      // 手动触发表单提交
      const plannerForm = document.getElementById("plannerForm");
      if (plannerForm) {
        console.log("找到表单，手动触发submit事件");
        // 创建并分发一个submit事件
        const submitEvent = new Event("submit", {
          bubbles: true,
          cancelable: true,
        });
        plannerForm.dispatchEvent(submitEvent);
      } else {
        console.error("找不到plannerForm表单!");
      }
    });
  } else {
    console.error("找不到生成按钮!");
  }

  // 特别注册登录表单提交监听
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    console.log("注册登录表单提交监听器");
    loginForm.addEventListener("submit", function (e) {
      console.log("登录表单提交被捕获");
    });
  }
});

// 设置表单所有输入为英文语言环境，防止出现中文提示
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM内容已加载，开始初始化...");

  // 设置HTML语言
  document.documentElement.lang = "en";
  console.log("HTML语言设置为:", document.documentElement.lang);

  // 设置所有表单元素的语言为英文
  const formElements = document.querySelectorAll("input, select, textarea");
  formElements.forEach((el) => {
    el.setAttribute("lang", "en");
  });
  console.log("已设置", formElements.length, "个表单元素的语言为英文");

  // 专门处理旅行计划表单，确保按顺序验证
  const plannerForm = document.getElementById("plannerForm");
  if (plannerForm) {
    console.log("找到plannerForm表单，准备设置验证");

    // 注释掉novalidate设置，使用浏览器原生验证
    // plannerForm.setAttribute("novalidate", "true");
    if (plannerForm.hasAttribute("novalidate")) {
      plannerForm.removeAttribute("novalidate");
      console.log("移除了novalidate属性");
    }

    // 移除原有的submit事件处理器
    const oldSubmit = plannerForm.onsubmit;
    plannerForm.onsubmit = null;
    console.log("重置了表单的onsubmit事件");

    // 添加新的submit事件处理器
    plannerForm.addEventListener("submit", function (e) {
      console.log("表单提交事件触发");
      e.preventDefault();

      // 按顺序获取表单字段
      const location = document.getElementById("location");
      const startTime = document.getElementById("startTime");
      const endTime = document.getElementById("endTime");
      const travelers = document.getElementById("travelers");

      // 1. 首先验证目的地
      if (!location.value.trim()) {
        location.setCustomValidity("Please enter a destination");
        location.reportValidity();
        location.focus();
        return false;
      } else {
        location.setCustomValidity("");
      }

      // 2. 然后验证开始时间
      const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
      if (!startTime.value.trim()) {
        startTime.setCustomValidity("Please enter a start time");
        startTime.reportValidity();
        startTime.focus();
        return false;
      } else if (!timeRegex.test(startTime.value.trim())) {
        startTime.setCustomValidity(
          "Please enter time in 24-hour format (HH:MM)"
        );
        startTime.reportValidity();
        startTime.focus();
        return false;
      } else {
        startTime.setCustomValidity("");
      }

      // 3. 接着验证结束时间
      if (!endTime.value.trim()) {
        endTime.setCustomValidity("Please enter an end time");
        endTime.reportValidity();
        endTime.focus();
        return false;
      } else if (!timeRegex.test(endTime.value.trim())) {
        endTime.setCustomValidity(
          "Please enter time in 24-hour format (HH:MM)"
        );
        endTime.reportValidity();
        endTime.focus();
        return false;
      } else {
        endTime.setCustomValidity("");
      }

      // 4. 最后验证旅行人数
      if (!travelers.value || parseInt(travelers.value) < 1) {
        travelers.setCustomValidity("Please enter number of travelers");
        travelers.reportValidity();
        travelers.focus();
        return false;
      } else {
        travelers.setCustomValidity("");
      }

      // 如果验证通过，转发到原始的submit处理器（如果存在的话）
      if (typeof oldSubmit === "function") {
        return oldSubmit.call(this, e);
      }

      // 如果没有原始处理器，则允许表单提交
      return true;
    });
  }

  // 处理其他表单（使用常规验证）
  const otherForms = document.querySelectorAll("form:not(#plannerForm)");
  otherForms.forEach((form) => {
    form.setAttribute("novalidate", "true");
    form.addEventListener("submit", function (e) {
      if (!this.checkValidity()) {
        e.preventDefault();

        // 查找第一个无效元素并显示自定义消息
        const invalidElements = form.querySelectorAll(":invalid");
        if (invalidElements.length > 0) {
          const firstInvalid = invalidElements[0];

          // 如果没有自定义消息，则添加一个默认的英文消息
          if (
            !firstInvalid.validationMessage ||
            firstInvalid.validationMessage.indexOf("请") >= 0
          ) {
            const fieldName = firstInvalid.id || firstInvalid.name || "field";
            firstInvalid.setCustomValidity(
              `Please fill in this ${fieldName} correctly`
            );
          }

          // 报告验证消息
          firstInvalid.reportValidity();

          // 聚焦到这个元素
          firstInvalid.focus();
        }
      }
    });
  });
});

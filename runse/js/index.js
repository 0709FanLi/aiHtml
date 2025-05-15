// Sample Data for Demo
const sampleHistoryData = [
  {
    id: 1,
    title: "The Forgotten Kingdom - Chapter 3",
    type: "polish",
    date: "2025-05-15 14:32",
    originalText:
      "The castle was old and scary. It had many towers that reached up to the sky. The princess lived there for many years, waiting for someone to save her.",
    enhancedText:
      "The ancient castle loomed <span class='added-text'>ominously</span> against the <span class='added-text'>twilight</span> sky, its <span class='deleted-text'>many</span> <span class='modified-text'>weathered</span> towers reaching <span class='modified-text'>toward</span> the heavens. The princess had <span class='modified-text'>resided</span> there for many years, <span class='deleted-text'>waiting for someone to save her</span> <span class='added-text'>her heart growing colder with each passing season as she awaited her salvation</span>.",
  },
  {
    id: 2,
    title: "Dragon's Curse - Opening Scene",
    type: "expand",
    date: "2025-05-10 09:17",
    originalText: "The dragon breathed fire. The village burned.",
    enhancedText:
      "The <span class='modified-text'>massive</span> dragon <span class='added-text'>unfurled its leathery wings and</span> breathed <span class='modified-text'>a torrent of searing</span> fire <span class='added-text'>from its ancient, cavernous maw</span>. The village <span class='deleted-text'>burned</span> <span class='added-text'>erupted in flames, thatched roofs igniting like kindling as terrified screams echoed through the valley. Mothers clutched children to their breasts as they fled, while the men futilely raised pitchforks against the unstoppable inferno raining from above</span>.",
  },
  {
    id: 3,
    title: "The Wizard's Apprentice - Draft",
    type: "condense",
    date: "2025-05-05 16:45",
    originalText:
      "The young boy named Tim was very excited about his first day as a wizard's apprentice. He had always dreamed of learning magic ever since he was a very small child. His parents were farmers who worked in the fields everyday, but Tim knew he wanted a different life. When the wizard Aldobrand came to their small village looking for an apprentice, Tim volunteered immediately. The wizard was very old and had a long white beard that went down to his knees. He wore blue robes with stars and moons on them.",
    enhancedText:
      "<span class='deleted-text'>The young boy named</span> Tim <span class='modified-text'>eagerly anticipated</span> his first day as <span class='deleted-text'>a</span> <span class='modified-text'>the</span> wizard's apprentice<span class='deleted-text'>. He had always dreamed of learning magic ever since he was a very small child</span>. <span class='deleted-text'>His parents were farmers who worked in the fields everyday, but Tim knew he wanted a different life.</span> <span class='modified-text'>When</span> <span class='deleted-text'>the wizard</span> Aldobrand <span class='deleted-text'>came to their small village looking for an apprentice, Tim volunteered immediately. The wizard was very old and</span> <span class='modified-text'>- ancient, with</span> a <span class='modified-text'>knee-length</span> <span class='deleted-text'>long</span> white beard <span class='deleted-text'>that went down to his knees</span> <span class='modified-text'>and</span> <span class='deleted-text'>. He wore</span> blue robes <span class='modified-text'>embroidered with</span> <span class='deleted-text'>with</span> stars and moons <span class='deleted-text'>on them</span>.",
  },
];

// DOM Elements
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const authModal = document.getElementById("authModal");
const closeAuthModal = document.getElementById("closeAuthModal");
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginContent = document.getElementById("loginContent");
const registerContent = document.getElementById("registerContent");
const loginSubmitBtn = document.getElementById("loginSubmitBtn");
const registerSubmitBtn = document.getElementById("registerSubmitBtn");
const userProfile = document.getElementById("userProfile");
const creditCount = document.getElementById("creditCount");
const badgeCredits = document.getElementById("badgeCredits");
const creditsBadge = document.getElementById("creditsBadge");
const historyLink = document.getElementById("historyLink");
const historySection = document.getElementById("historySection");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");
const novelText = document.getElementById("novelText");
const polishBtn = document.getElementById("polishBtn");
const expandBtn = document.getElementById("expandBtn");
const condenseBtn = document.getElementById("condenseBtn");
const resultSection = document.getElementById("resultSection");
const originalText = document.getElementById("originalText");
const enhancedText = document.getElementById("enhancedText");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const newEditBtn = document.getElementById("newEditBtn");
const loadingOverlay = document.getElementById("loadingOverlay");
const toastContainer = document.getElementById("toastContainer");
const purchaseModal = document.getElementById("purchaseModal");
const closePurchaseModal = document.getElementById("closePurchaseModal");
const purchaseButtons = document.querySelectorAll(".purchase-btn");
const planName = document.getElementById("planName");
const planDescription = document.getElementById("planDescription");
const planPrice = document.getElementById("planPrice");
const confirmPurchaseBtn = document.getElementById("confirmPurchaseBtn");
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuBackdrop = document.querySelector(".mobile-menu-backdrop");
const mobileMenuClose = document.querySelector(".mobile-menu-close");
const mobileLoginBtn = document.querySelector(".mobile-login-btn");
const mobileSignupBtn = document.querySelector(".mobile-signup-btn");
const mobileHistoryLink = document.querySelector(".mobile-history-link");

// State Variables
let isLoggedIn = false;
let usageCredits = 0;
let userHistory = []; // 初始化为空数组，将在登录后从API获取
let freeUsageUsed = false;

// Function to show toast notifications
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  let icon = "info-circle";
  if (type === "success") icon = "check-circle";
  if (type === "error") icon = "exclamation-circle";

  toast.innerHTML = `
                <div>
                    <i class="fas fa-${icon}"></i>
                    <span>${message}</span>
                </div>
                <button class="toast-close">&times;</button>
            `;

  toastContainer.appendChild(toast);

  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.remove();
  }, 4000);

  // Remove on click
  toast.querySelector(".toast-close").addEventListener("click", () => {
    toast.remove();
  });
}

// Toggle between login and register tabs
loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginContent.style.display = "block";
  registerContent.style.display = "none";
  // Hide forgot password content when switching to login tab
  forgotPasswordContent.style.display = "none";
});

registerTab.addEventListener("click", () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerContent.style.display = "block";
  loginContent.style.display = "none";
  // Hide forgot password content when switching to register tab
  forgotPasswordContent.style.display = "none";
});

// Show/Hide Modal functions
function showAuthModal() {
  authModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function hideAuthModal() {
  authModal.style.display = "none";
  document.body.style.overflow = "auto";
  resetAllForms();
}

// Function to reset all form fields and UI states
function resetAllForms() {
  // Reset login form
  document.getElementById("loginEmail").value = "";
  document.getElementById("loginPassword").value = "";

  // Reset register form
  document.getElementById("registerName").value = "";
  document.getElementById("registerEmail").value = "";
  document.getElementById("registerPassword").value = "";
  document.getElementById("registerConfirmPassword").value = "";

  // Reset forgot password form
  document.getElementById("resetEmail").value = "";
  document.getElementById("resetVerificationCode").value = "";
  document.getElementById("resetNewPassword").value = "";
  document.getElementById("resetConfirmPassword").value = "";

  // Reset verification code button state
  if (getVerificationBtn) {
    getVerificationBtn.textContent = "Get Code";
    getVerificationBtn.disabled = false;
    getVerificationBtn.classList.remove("disabled");

    // Clear countdown timer
    if (countdownTimer) {
      clearInterval(countdownTimer);
    }
  }

  // Reset UI state - ensure login form is shown by default
  document.getElementById("forgotPasswordContent").style.display = "none";
  document.getElementById("loginContent").style.display = "block";
  document.getElementById("registerContent").style.display = "none";

  // Reset tab state
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
}

function showPurchaseModal(plan, price, credits, subscription = false) {
  planName.textContent = plan + " Plan";
  planPrice.textContent = "$" + price;

  if (subscription) {
    planDescription.textContent = `${subscription} subscription with ${credits} credits`;
  } else {
    planDescription.textContent = `One-time purchase of ${credits} credits`;
  }

  purchaseModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function hidePurchaseModal() {
  purchaseModal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Login/Signup Event Listeners
loginBtn.addEventListener("click", showAuthModal);
signupBtn.addEventListener("click", () => {
  showAuthModal();
  registerTab.click();
});
closeAuthModal.addEventListener("click", hideAuthModal);

// Logout functionality
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
  // 显示加载中状态
  loadingOverlay.style.display = "flex";
  document.getElementsByClassName("loading-text")[0].textContent = "登出中...";

  // 获取用户token
  const userData = getUserData();
  if (userData && userData.access_token) {
    // 调用登出API
    fetch("http://web.novelbeautify.com/api/v1/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userData.token_type} ${userData.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // 隐藏加载状态
        loadingOverlay.style.display = "none";

        // 重置登录状态变量
        isLoggedIn = false;
        usageCredits = 0;

        // 清空文本区域和文件上传
        novelText.value = "";
        fileInput.value = "";
        fileName.textContent = "";

        // 隐藏结果和历史区域
        resultSection.style.display = "none";
        historySection.style.display = "none";

        // 返回首页状态
        showSection("home");

        // 清除用户数据
        clearUserData();

        // 重置UI
        userProfile.style.display = "none";
        loginBtn.style.display = "block";
        signupBtn.style.display = "block";
        document.getElementById("creditsBadge").style.display = "none";

        // 显示提示消息
        showToast("已成功登出", "info");
      })
      .catch((error) => {
        console.error("登出错误:", error);
        loadingOverlay.style.display = "none";
        showToast("登出失败，请稍后再试", "error");
      });
  } else {
    // 没有token的情况下，直接清除本地状态
    loadingOverlay.style.display = "none";

    // 重置登录状态变量
    isLoggedIn = false;
    usageCredits = 0;

    // 清空文本区域和文件上传
    novelText.value = "";
    fileInput.value = "";
    fileName.textContent = "";

    // 隐藏结果和历史区域
    resultSection.style.display = "none";
    historySection.style.display = "none";

    // 返回首页状态
    showSection("home");

    // 清除用户数据
    clearUserData();

    // 重置UI
    userProfile.style.display = "none";
    loginBtn.style.display = "block";
    signupBtn.style.display = "block";
    document.getElementById("creditsBadge").style.display = "none";

    // 显示提示消息
    showToast("已成功登出", "info");
  }
});

// Forgot Password Event Listeners
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const backToLoginLink = document.getElementById("backToLoginLink");
const resetSubmitBtn = document.getElementById("resetSubmitBtn");
const getVerificationBtn = document.getElementById("getVerificationBtn");
const forgotPasswordContent = document.getElementById("forgotPasswordContent");

forgotPasswordLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginContent.style.display = "none";
  forgotPasswordContent.style.display = "block";
});

backToLoginLink.addEventListener("click", (e) => {
  e.preventDefault();
  forgotPasswordContent.style.display = "none";
  loginContent.style.display = "block";
  // 重置密码表单
  document.getElementById("resetEmail").value = "";
  document.getElementById("resetVerificationCode").value = "";
  document.getElementById("resetNewPassword").value = "";
  document.getElementById("resetConfirmPassword").value = "";
  // 重置获取验证码按钮状态
  getVerificationBtn.textContent = "Get Code";
  getVerificationBtn.disabled = false;
  getVerificationBtn.classList.remove("disabled");
});

// 获取验证码倒计时
let countdownTimer;
function startVerificationCountdown() {
  let seconds = 60;
  getVerificationBtn.disabled = true;
  getVerificationBtn.classList.add("disabled");
  getVerificationBtn.textContent = `${seconds}s`;

  countdownTimer = setInterval(() => {
    seconds -= 1;
    getVerificationBtn.textContent = `${seconds}s`;

    if (seconds <= 0) {
      clearInterval(countdownTimer);
      getVerificationBtn.textContent = "Get Code";
      getVerificationBtn.disabled = false;
      getVerificationBtn.classList.remove("disabled");
    }
  }, 1000);
}

// 自定义邮箱验证规则
function validateEmail(email) {
  // 基本邮箱格式验证
  const basicFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basicFormat.test(email)) {
    return false;
  }

  // 额外验证规则 - 域名至少有2个字符
  const domainParts = email.split("@")[1].split(".");
  if (domainParts.some((part) => part.length < 2)) {
    return false;
  }

  // 验证邮箱长度
  if (email.length < 6 || email.length > 100) {
    return false;
  }

  return true;
}

// 获取验证码按钮事件
getVerificationBtn.addEventListener("click", () => {
  const resetEmail = document.getElementById("resetEmail").value;

  if (!resetEmail) {
    showToast("Please enter your email address", "error");
    return;
  }

  // 使用自定义邮箱验证规则
  if (!validateEmail(resetEmail)) {
    showToast("Please enter a valid email address", "error");
    return;
  }

  // 显示加载状态
  loadingOverlay.style.display = "flex";
  document.getElementsByClassName("loading-text")[0].textContent =
    "Sending verification code...";

  // 调用获取验证码API - 使用正确的接口
  fetch("http://web.novelbeautify.com/api/v1/auth/email-verification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: resetEmail,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      loadingOverlay.style.display = "none";

      if (data.ok === 1) {
        showToast("Verification code has been sent to your email", "success");
        startVerificationCountdown();
      } else {
        showToast(data.message || "Failed to send verification code", "error");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      loadingOverlay.style.display = "none";
      showToast(
        "Failed to send verification code. Please try again later",
        "error"
      );
    });
});

resetSubmitBtn.addEventListener("click", () => {
  const resetEmail = document.getElementById("resetEmail").value;
  const verificationCode = document.getElementById(
    "resetVerificationCode"
  ).value;
  const newPassword = document.getElementById("resetNewPassword").value;
  const confirmPassword = document.getElementById("resetConfirmPassword").value;

  if (!resetEmail || !verificationCode || !newPassword || !confirmPassword) {
    showToast("Please fill in all fields", "error");
    return;
  }

  // 使用自定义邮箱验证规则
  if (!validateEmail(resetEmail)) {
    showToast("Please enter a valid email address", "error");
    return;
  }

  // 验证密码匹配
  if (newPassword !== confirmPassword) {
    showToast("Passwords do not match", "error");
    return;
  }

  // 显示加载状态
  loadingOverlay.style.display = "flex";
  document.getElementsByClassName("loading-text")[0].textContent =
    "Resetting password...";

  // 使用MD5加密密码
  const md5Password = md5(newPassword);
  const md5ConfirmPassword = md5(confirmPassword);

  // 调用重置密码API
  fetch("http://web.novelbeautify.com/api/v1/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: resetEmail,
      verification_code: verificationCode,
      password: md5Password,
      password_confirm: md5ConfirmPassword,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      loadingOverlay.style.display = "none";

      if (data.ok === 1) {
        showToast(
          "Password reset successful. Please login with your new password",
          "success"
        );

        // 清除倒计时
        if (countdownTimer) {
          clearInterval(countdownTimer);
        }

        // 返回登录界面并清空输入
        setTimeout(() => {
          forgotPasswordContent.style.display = "none";
          loginContent.style.display = "block";
          document.getElementById("resetEmail").value = "";
          document.getElementById("resetVerificationCode").value = "";
          document.getElementById("resetNewPassword").value = "";
          document.getElementById("resetConfirmPassword").value = "";
          getVerificationBtn.textContent = "Get Code";
          getVerificationBtn.disabled = false;
          getVerificationBtn.classList.remove("disabled");
        }, 1500);
      } else {
        showToast(data.message || "Failed to reset password", "error");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      loadingOverlay.style.display = "none";
      showToast("Failed to reset password. Please try again later", "error");
    });
});

closePurchaseModal.addEventListener("click", hidePurchaseModal);

// Privacy Policy Modal Functions
const privacyPolicyModal = document.getElementById("privacyPolicyModal");
const closePrivacyModal = document.getElementById("closePrivacyModal");
const privacyPolicyLink = document.getElementById("privacyPolicyLink");

function showPrivacyPolicyModal() {
  privacyPolicyModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function hidePrivacyPolicyModal() {
  privacyPolicyModal.style.display = "none";
  document.body.style.overflow = "auto";
}

privacyPolicyLink.addEventListener("click", (e) => {
  e.preventDefault();
  showPrivacyPolicyModal();
});

closePrivacyModal.addEventListener("click", hidePrivacyPolicyModal);

// Close privacy policy modal when clicking outside
privacyPolicyModal.addEventListener("click", (e) => {
  if (e.target === privacyPolicyModal) {
    hidePrivacyPolicyModal();
  }
});

// Terms of Service Modal Functions
const termsModal = document.getElementById("termsModal");
const closeTermsModal = document.getElementById("closeTermsModal");
const termsOfServiceLink = document.getElementById("termsOfServiceLink");

function showTermsModal() {
  termsModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function hideTermsModal() {
  termsModal.style.display = "none";
  document.body.style.overflow = "auto";
}

termsOfServiceLink.addEventListener("click", (e) => {
  e.preventDefault();
  showTermsModal();
});

closeTermsModal.addEventListener("click", hideTermsModal);

// Close terms of service modal when clicking outside
termsModal.addEventListener("click", (e) => {
  if (e.target === termsModal) {
    hideTermsModal();
  }
});

// Login Form Submission
loginSubmitBtn.addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const termsChecked = document.getElementById("loginTermsCheck").checked;

  if (!email || !password) {
    showToast("Please fill in all fields", "error");
    return;
  }

  if (!termsChecked) {
    showToast(
      "Please agree to the Terms of Service and Privacy Policy",
      "error"
    );
    return;
  }

  // Show loading overlay
  loadingOverlay.style.display = "flex";
  document.getElementsByClassName("loading-text")[0].textContent =
    "Logging in...";

  // Use MD5 to encrypt the password
  const md5Password = md5(password);

  // Call the login API
  fetch("http://web.novelbeautify.com/api/v1/auth/login", {
    method: "POST",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: md5Password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Hide loading overlay
      loadingOverlay.style.display = "none";

      if (data.ok === 1) {
        // Save user data in localStorage
        saveUserData(data.data);

        // Update the UI
        updateUIAfterLogin(data.data);
      } else {
        showToast(data.message || "Login failed", "error");
      }
    })
    .catch((error) => {
      // Hide loading overlay
      loadingOverlay.style.display = "none";
      console.error("Error:", error);
      showToast("Login failed. Please try again.", "error");
    });
});

// Register Form Submission
registerSubmitBtn.addEventListener("click", () => {
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById(
    "registerConfirmPassword"
  ).value;
  const termsChecked = document.getElementById("registerTermsCheck").checked;

  if (!name || !email || !password || !confirmPassword) {
    showToast("Please fill in all fields", "error");
    return;
  }

  if (password !== confirmPassword) {
    showToast("Passwords do not match", "error");
    return;
  }

  if (!termsChecked) {
    showToast(
      "Please agree to the Terms of Service and Privacy Policy",
      "error"
    );
    return;
  }

  // Show loading overlay
  loadingOverlay.style.display = "flex";
  document
    .getElementById("loadingOverlay")
    .querySelector(".loading-text").textContent = "Creating your account...";

  // Encrypt passwords with MD5
  const md5Password = md5(password);
  const md5ConfirmPassword = md5(confirmPassword);

  // Call the register API
  fetch("http://web.novelbeautify.com/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: md5Password,
      password_confirm: md5ConfirmPassword,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Hide loading overlay
      loadingOverlay.style.display = "none";

      if (data.ok === 1) {
        // 注册成功后，打开登录弹窗并自动填充邮箱，不自动登录
        showAuthModal();
        loginTab.click();
        document.getElementById("loginEmail").value = data.data.email;
        document.getElementById("loginPassword").value = "";
        showToast("注册成功，请登录！", "success");
      } else {
        showToast(data.message || "Registration failed", "error");
      }
    })
    .catch((error) => {
      // Hide loading overlay
      loadingOverlay.style.display = "none";
      console.error("Error:", error);
      showToast("Registration failed. Please try again.", "error");
    });
});

// Update UI after login
function updateUIAfterLogin(userData) {
  // 兼容新注册接口：userData.user 直接为用户对象
  const user = userData.user || userData;
  isLoggedIn = true;
  usageCredits = user.credits;
  loginBtn.style.display = "none";
  signupBtn.style.display = "none";
  userProfile.style.display = "flex";
  document.getElementById("userName").textContent = user.name;
  document.getElementById("creditCount").textContent = user.credits;
  document.getElementById("badgeCredits").textContent = user.credits;
  document.getElementById("creditsBadge").style.display = "flex";
  // 头像逻辑
  const userAvatar = userProfile.querySelector("img");
  if (user.avatar_url && user.avatar_url.trim() !== "") {
    userAvatar.src = user.avatar_url;
  }
  authModal.style.display = "none";
  showToast("Login successful", "success");
}

// 获取用户历史记录
function fetchUserHistory(page = 1, pageSize = 10) {
  const userData = getUserData();
  if (!userData || !userData.access_token) {
    console.error("No valid token found for fetching history");
    return;
  }

  loadingOverlay.style.display = "flex";
  document.getElementsByClassName("loading-text")[0].textContent =
    "Loading your history...";

  // 调用获取历史记录API - 使用POST方法
  fetch(`http://web.novelbeautify.com/api/v1/polish/records`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${userData.token_type} ${userData.access_token}`,
    },
    body: JSON.stringify({
      page: page,
      page_size: pageSize,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      loadingOverlay.style.display = "none";

      if (data.ok === 1 && data.data && Array.isArray(data.data.items)) {
        // 保存总条数
        const totalRecords = data.data.total || 0;
        const hasMore = data.data.has_more || false;

        // 转换API返回的数据格式为我们使用的格式
        userHistory = data.data.items.map((item) => ({
          id: item.id,
          title: `Document ${item.id}`,
          type: item.operation || "polish",
          date: new Date(item.created_at).toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
          originalText: item.input || "",
          enhancedText: item.output || "",
        }));

        // 显示历史记录
        renderHistoryItems(totalRecords, page, pageSize, hasMore);
      } else {
        console.error("Failed to load history or invalid data format:", data);
        userHistory = []; // 重置为空数组
        renderHistoryItems(0, page, pageSize, false);
      }
    })
    .catch((error) => {
      loadingOverlay.style.display = "none";
      console.error("Error fetching history:", error);
      showToast(
        "Failed to load your history. Please try again later.",
        "error"
      );
      userHistory = []; // 重置为空数组
      renderHistoryItems(0, page, pageSize, false);
    });
}

function renderHistoryItems(
  totalRecords = 0,
  currentPage = 1,
  pageSize = 10,
  hasMore = false
) {
  historyList.innerHTML = "";

  if (userHistory.length === 0) {
    historyList.innerHTML = `
      <div class="history-item">
        <p>No history items yet. Start enhancing your texts!</p>
      </div>
    `;
    return;
  }

  userHistory.forEach((item) => {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    historyItem.dataset.id = item.id;

    historyItem.innerHTML = `
      <div class="history-content">
        <h4>${item.title} <span class="history-type ${item.type}">${
      item.type.charAt(0).toUpperCase() + item.type.slice(1)
    }</span></h4>
        <div class="history-date">${item.date}</div>
      </div>
      <div>
        <i class="fas fa-chevron-right"></i>
      </div>
    `;

    historyItem.addEventListener("click", () => {
      // 使用ID调用详情接口，而不是直接使用本地数据
      fetchHistoryDetail(item.id);
    });

    historyList.appendChild(historyItem);
  });

  // 添加分页控件
  if (totalRecords > 0) {
    const paginationDiv = document.createElement("div");
    paginationDiv.className = "history-pagination";

    // 显示总条数
    const totalInfo = document.createElement("div");
    totalInfo.className = "pagination-info";
    totalInfo.textContent = `Total: ${totalRecords} records`;
    paginationDiv.appendChild(totalInfo);

    // 分页控制按钮
    const paginationControls = document.createElement("div");
    paginationControls.className = "pagination-controls";

    // 上一页按钮
    const prevBtn = document.createElement("button");
    prevBtn.className = "pagination-btn";
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i> Previous';
    prevBtn.disabled = currentPage <= 1;
    if (currentPage > 1) {
      prevBtn.addEventListener("click", () => {
        fetchUserHistory(currentPage - 1, pageSize);
      });
    }
    paginationControls.appendChild(prevBtn);

    // 页码信息
    const pageInfo = document.createElement("span");
    pageInfo.className = "page-info";
    pageInfo.textContent = `Page ${currentPage}`;
    paginationControls.appendChild(pageInfo);

    // 下一页按钮
    const nextBtn = document.createElement("button");
    nextBtn.className = "pagination-btn";
    nextBtn.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
    nextBtn.disabled = !hasMore;
    if (hasMore) {
      nextBtn.addEventListener("click", () => {
        fetchUserHistory(currentPage + 1, pageSize);
      });
    }
    paginationControls.appendChild(nextBtn);

    paginationDiv.appendChild(paginationControls);
    historyList.appendChild(paginationDiv);
  }
}

// 获取历史记录详情
function fetchHistoryDetail(recordId) {
  const userData = getUserData();
  if (!userData || !userData.access_token) {
    console.error("No valid token found for fetching history detail");
    return;
  }

  loadingOverlay.style.display = "flex";
  document.getElementsByClassName("loading-text")[0].textContent =
    "Loading record details...";

  // 调用获取历史记录详情API
  fetch(`http://web.novelbeautify.com/api/v1/polish/detail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${userData.token_type} ${userData.access_token}`,
    },
    body: JSON.stringify({
      record_id: recordId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      loadingOverlay.style.display = "none";

      if (data.ok === 1 && data.data) {
        // 显示详情
        const item = {
          id: data.data.id,
          title: `Document ${data.data.id}`,
          type: data.data.operation || "polish",
          date: new Date(data.data.created_at).toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
          originalText: data.data.input || "",
          enhancedText: data.data.output || "",
        };

        loadHistoryItem(item);
      } else {
        console.error("Failed to load history detail:", data);
        showToast("Failed to load record details", "error");
      }
    })
    .catch((error) => {
      loadingOverlay.style.display = "none";
      console.error("Error fetching history detail:", error);
      showToast(
        "Failed to load record details. Please try again later.",
        "error"
      );
    });
}

// 清空所有历史记录
function clearAllHistory() {
  const userData = getUserData();
  if (!userData || !userData.access_token) {
    console.error("No valid token found for clearing history");
    return;
  }

  loadingOverlay.style.display = "flex";
  document.getElementsByClassName("loading-text")[0].textContent =
    "Clearing history...";

  // 调用清空历史记录API
  fetch(`http://web.novelbeautify.com/api/v1/polish/clear`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${userData.token_type} ${userData.access_token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      loadingOverlay.style.display = "none";

      if (data.ok === 1) {
        // 清空本地历史记录数组
        userHistory = [];
        // 重新渲染历史记录列表（显示空状态）
        renderHistoryItems();
        showToast("History cleared successfully", "success");
      } else {
        console.error("Failed to clear history:", data);
        showToast(data.message || "Failed to clear history", "error");
      }
    })
    .catch((error) => {
      loadingOverlay.style.display = "none";
      console.error("Error clearing history:", error);
      showToast("Failed to clear history. Please try again later.", "error");
    });
}

// Create a custom confirmation modal for the page
function showConfirmationModal(message, confirmCallback) {
  // Create a modal overlay
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.style.display = "flex";

  // Create the modal
  const modal = document.createElement("div");
  modal.className = "modal";

  // Create header
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = "<h2>Confirmation</h2>";

  // Create close button
  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.innerHTML = '<i class="fas fa-times"></i>';
  modalHeader.appendChild(closeBtn);

  // Create content
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modalContent.innerHTML = `<p>${message}</p>`;

  // Create actions
  const actions = document.createElement("div");
  actions.className = "modal-actions";
  actions.style.display = "flex";
  actions.style.justifyContent = "flex-end";
  actions.style.gap = "10px";
  actions.style.marginTop = "20px";

  // Cancel button
  const cancelBtn = document.createElement("button");
  cancelBtn.className = "btn";
  cancelBtn.style.background = "var(--card-bg)";
  cancelBtn.style.border = "1px solid rgba(255, 255, 255, 0.1)";
  cancelBtn.textContent = "Cancel";

  // Confirm button
  const confirmBtn = document.createElement("button");
  confirmBtn.className = "btn btn-secondary";
  confirmBtn.textContent = "Confirm";

  actions.appendChild(cancelBtn);
  actions.appendChild(confirmBtn);
  modalContent.appendChild(actions);

  // Assemble modal
  modal.appendChild(modalHeader);
  modal.appendChild(modalContent);
  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);
  document.body.style.overflow = "hidden"; // Prevent scrolling

  // Add event listeners
  closeBtn.addEventListener("click", () => {
    modalOverlay.remove();
    document.body.style.overflow = "auto";
  });

  cancelBtn.addEventListener("click", () => {
    modalOverlay.remove();
    document.body.style.overflow = "auto";
  });

  confirmBtn.addEventListener("click", () => {
    modalOverlay.remove();
    document.body.style.overflow = "auto";
    if (confirmCallback) confirmCallback();
  });

  // Close on click outside
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.remove();
      document.body.style.overflow = "auto";
    }
  });
}

// 修改原有的加载历史记录项函数，增加点击时获取详情
function loadHistoryItem(item) {
  // 如果传入的是ID，则调用API获取详情
  if (
    typeof item === "number" ||
    (typeof item === "object" && Object.keys(item).length === 1 && item.id)
  ) {
    const recordId = typeof item === "number" ? item : item.id;
    fetchHistoryDetail(recordId);
    return;
  }

  // 否则直接使用传入的完整记录信息
  originalText.innerHTML = item.originalText;
  enhancedText.innerHTML = item.enhancedText;

  showSection("result");
}

// 替换原有的清空历史按钮事件处理
clearHistoryBtn.addEventListener("click", () => {
  showConfirmationModal(
    "Are you sure you want to clear your history? This cannot be undone.",
    () => {
      clearAllHistory();
    }
  );
});

// File upload handling
fileInput.addEventListener("change", (e) => {
  if (e.target.files.length > 0) {
    const file = e.target.files[0];
    fileName.textContent = file.name;

    // 清空文本输入框
    novelText.value = "";
  } else {
    fileName.textContent = "";
  }
});

// 当文本输入框有输入内容时清空文件选择
novelText.addEventListener("input", () => {
  if (novelText.value.trim() !== "" && fileInput.files.length > 0) {
    // 清空文件选择
    fileInput.value = "";
    fileName.textContent = "";
  }
});

// Text processing functions
function processText(type) {
  const text = novelText.value.trim();
  const uploadedFile = fileInput.files.length > 0 ? fileInput.files[0] : null;

  if (!text && !uploadedFile) {
    showToast("Please enter some text or upload a file", "error");
    return;
  }

  // Check if user has credits
  if (!isLoggedIn && freeUsageUsed) {
    showToast(
      "You have used your free usage. Please login or sign up to continue.",
      "info"
    );
    showAuthModal();
    return;
  }

  const userData = getUserData();
  if (isLoggedIn && userData && userData.user.credits <= 0) {
    showToast(
      "You have no credits left. Please purchase more to continue.",
      "info"
    );
    purchaseButtons[2].click(); // Show modal for standard plan
    return;
  }

  // Show loading overlay
  loadingOverlay.style.display = "flex";
  document
    .getElementById("loadingOverlay")
    .querySelector(".loading-text").textContent = `${
    type.charAt(0).toUpperCase() + type.slice(1)
  }ing your text...`;

  // 准备API调用需要的数据
  const apiCall = (requestData) => {
    // 确保有token
    const userData = getUserData();
    if (!userData || !userData.access_token) {
      loadingOverlay.style.display = "none";
      showToast("Authentication error. Please login again.", "error");
      return;
    }

    // 调用API
    fetch("http://web.novelbeautify.com/api/v1/novel/optimize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userData.token_type} ${userData.access_token}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        // 隐藏加载遮罩
        loadingOverlay.style.display = "none";

        if (data.ok === 1) {
          // 显示结果
          originalText.textContent = data.data.original_text;
          enhancedText.innerHTML = data.data.optimized_text;

          // Show result section
          resultSection.style.display = "block";
          resultSection.scrollIntoView({ behavior: "smooth" });

          // 更新积分
          if (isLoggedIn && userData) {
            userData.user.credits -= 1;
            localStorage.setItem("user", JSON.stringify(userData.user));
            document.getElementById("creditCount").textContent =
              userData.user.credits;
            document.getElementById("badgeCredits").textContent =
              userData.user.credits;
          } else {
            freeUsageUsed = true;
          }

          // 添加到历史记录
          if (isLoggedIn) {
            const newHistoryItem = {
              id: Date.now(),
              title: uploadedFile
                ? uploadedFile.name
                : `Document ${userHistory.length + 1}`,
              type: type,
              date: new Date().toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }),
              originalText: data.data.original_text,
              enhancedText: data.data.optimized_text,
            };

            userHistory.unshift(newHistoryItem);
            renderHistoryItems();
          }

          showToast(data.message || `Text successfully ${type}ed!`, "success");
        } else {
          showToast(data.message || "Failed to process text", "error");
        }
      })
      .catch((error) => {
        loadingOverlay.style.display = "none";
        console.error("API Error:", error);
        showToast("Error processing your text. Please try again.", "error");
      });
  };

  // 如果是文件上传处理
  if (uploadedFile) {
    // 检查文件大小限制 (3MB)
    if (uploadedFile.size > 3 * 1024 * 1024) {
      loadingOverlay.style.display = "none";
      showToast("File too large. Maximum size is 3MB.", "error");
      return;
    }

    // 将文件转换为Base64
    const reader = new FileReader();
    reader.readAsDataURL(uploadedFile);
    reader.onload = function () {
      // 获取base64编码（去掉Data URL前缀）
      const base64Content = reader.result.split(",")[1];

      // 准备API请求数据
      const requestData = {
        operation: type,
        file_content: base64Content,
      };

      // 调用API
      apiCall(requestData);
    };
    reader.onerror = function () {
      loadingOverlay.style.display = "none";
      showToast("Error reading file. Please try again.", "error");
    };
  } else {
    // 处理文本输入
    const requestData = {
      operation: type,
      text: text,
    };

    // 调用API
    apiCall(requestData);
  }
}

// Text processing algorithms (simulated)
function polishText(text) {
  // Simulated polishing algorithm
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
  let polishedHTML = "";

  sentences.forEach((sentence) => {
    const rand = Math.random();

    if (rand < 0.3) {
      // Replace some words
      sentence = sentence
        .replace(
          /old/g,
          '<span class="deleted-text">old</span> <span class="modified-text">ancient</span>'
        )
        .replace(
          /scary/g,
          '<span class="deleted-text">scary</span> <span class="modified-text">terrifying</span>'
        )
        .replace(
          /big/g,
          '<span class="deleted-text">big</span> <span class="modified-text">massive</span>'
        )
        .replace(
          /small/g,
          '<span class="deleted-text">small</span> <span class="modified-text">tiny</span>'
        )
        .replace(
          /walked/g,
          '<span class="deleted-text">walked</span> <span class="modified-text">strode</span>'
        )
        .replace(
          /ran/g,
          '<span class="deleted-text">ran</span> <span class="modified-text">dashed</span>'
        )
        .replace(
          /said/g,
          '<span class="deleted-text">said</span> <span class="modified-text">declared</span>'
        );
    } else if (rand < 0.6) {
      // Add adjectives or adverbs
      sentence = sentence
        .replace(
          /the castle/gi,
          'the <span class="added-text">ancient</span> castle'
        )
        .replace(
          /the wizard/gi,
          'the <span class="added-text">mysterious</span> wizard'
        )
        .replace(
          /the dragon/gi,
          'the <span class="added-text">fearsome</span> dragon'
        )
        .replace(/walked/g, 'walked <span class="added-text">cautiously</span>')
        .replace(/said/g, 'said <span class="added-text">confidently</span>');
    }

    polishedHTML += sentence + " ";
  });

  return polishedHTML.trim();
}

function expandText(text) {
  // Simulated expansion algorithm
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
  let expandedHTML = "";

  sentences.forEach((sentence) => {
    const rand = Math.random();

    if (rand < 0.4) {
      // Add descriptive phrases
      expandedHTML +=
        sentence.trim() +
        ' <span class="added-text">The air was thick with anticipation, a palpable tension that seemed to make the very stones of the castle walls sweat with anxiety.</span> ';
    } else if (rand < 0.7) {
      // Add character thoughts or background
      expandedHTML +=
        sentence.trim() +
        ' <span class="added-text">Memories of the ancient prophecies flooded through her mind, stories told by firelight of heroes and monsters, destinies written in stars long before her birth.</span> ';
    } else {
      // Add sensory details
      expandedHTML +=
        sentence.trim() +
        ' <span class="added-text">A cold wind whispered through the chamber, carrying the scent of pine and distant smoke, the promise of winter on its breath.</span> ';
    }
  });

  return expandedHTML.trim();
}

function condenseText(text) {
  // Simulated condensing algorithm
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
  let condensedHTML = "";

  sentences.forEach((sentence) => {
    // Remove filler words and phrases
    let condensed = sentence
      .replace(
        /\b(very|really|actually|basically|honestly|literally)\b\s*/gi,
        '<span class="deleted-text">$1 </span>'
      )
      .replace(
        /\b(in order to|due to the fact that|for the purpose of|in the event that)\b/gi,
        '<span class="deleted-text">$1</span> to'
      )
      .replace(
        /\b(at this point in time|at the present time)\b/gi,
        '<span class="deleted-text">$1</span> now'
      )
      .replace(
        /\b(it is important to note that|it should be noted that)\b/gi,
        '<span class="deleted-text">$1</span>'
      );

    // Randomly remove some descriptive sections
    if (sentence.length > 100) {
      const parts = sentence.split(",");
      if (parts.length > 2) {
        const removeIndex = Math.floor(Math.random() * (parts.length - 1)) + 1;
        parts[
          removeIndex
        ] = `<span class="deleted-text">${parts[removeIndex]}</span>`;
        condensed = parts.join(",");
      }
    }

    condensedHTML += condensed + " ";
  });

  return condensedHTML.trim();
}

// Action button event listeners
polishBtn.addEventListener("click", () => {
  if (!isLoggedIn) {
    showAuthModal();
    return;
  }
  processText("polish");
});
expandBtn.addEventListener("click", () => {
  if (!isLoggedIn) {
    showAuthModal();
    return;
  }
  processText("expand");
});
condenseBtn.addEventListener("click", () => {
  if (!isLoggedIn) {
    showAuthModal();
    return;
  }
  processText("condense");
});

// Result action buttons
copyBtn.addEventListener("click", () => {
  // Create a temporary element
  const tempElement = document.createElement("div");
  tempElement.innerHTML = enhancedText.innerHTML;

  // Extract text content without HTML tags
  const textToCopy = tempElement.textContent;

  // Copy to clipboard
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      showToast("Text copied to clipboard!", "success");
    })
    .catch((err) => {
      showToast("Failed to copy text.", "error");
      console.error("Could not copy text: ", err);
    });
});

downloadBtn.addEventListener("click", () => {
  // Create a temporary element
  const tempElement = document.createElement("div");
  tempElement.innerHTML = enhancedText.innerHTML;

  // Extract text content without HTML tags
  const textToDownload = tempElement.textContent;

  // Create a Blob
  const blob = new Blob([textToDownload], { type: "text/plain" });

  // Create download link
  const a = document.createElement("a");
  a.download = "enhanced-text.txt";
  a.href = window.URL.createObjectURL(blob);
  a.style.display = "none";

  // Append to the document and trigger download
  document.body.appendChild(a);
  a.click();

  // Clean up
  document.body.removeChild(a);
  window.URL.revokeObjectURL(a.href);

  showToast("Download started!", "success");
});

newEditBtn.addEventListener("click", () => {
  showSection("features");
  novelText.focus();
});

// Purchase buttons
purchaseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!isLoggedIn) {
      showToast("Please login to purchase credits", "info");
      showAuthModal();
      return;
    }

    const plan = button.dataset.plan;
    const price = button.dataset.price;
    const credits = button.dataset.credits;

    let subscription = null;
    if (plan === "monthly") subscription = "Monthly";
    if (plan === "annual") subscription = "Annual";

    showPurchaseModal(
      plan.charAt(0).toUpperCase() + plan.slice(1),
      price,
      credits,
      subscription
    );
  });
});

// Confirm purchase
confirmPurchaseBtn.addEventListener("click", () => {
  loadingOverlay.style.display = "flex";
  document.getElementsByClassName("loading-text")[0].textContent =
    "Processing payment...";

  setTimeout(() => {
    loadingOverlay.style.display = "none";
    hidePurchaseModal();

    const purchasedCredits = parseInt(
      planDescription.textContent.match(/\d+/)[0]
    );
    usageCredits += purchasedCredits;
    creditCount.textContent = usageCredits;
    badgeCredits.textContent = usageCredits;

    showToast("Purchase successful! Credits added to your account.", "success");
  }, 2000);
});

// Payment method selection
const paymentMethods = document.querySelectorAll(".payment-method");
paymentMethods.forEach((method) => {
  method.addEventListener("click", () => {
    paymentMethods.forEach((m) => m.classList.remove("selected"));
    method.classList.add("selected");
  });
});

// Mobile menu functions
function openMobileMenu() {
  mobileMenu.classList.add("active");
  mobileMenuBackdrop.classList.add("active");
  document.body.style.overflow = "hidden";

  // Update mobile menu based on login state
  if (isLoggedIn) {
    document.querySelector(".mobile-login-btn").parentElement.style.display =
      "none";
    document.querySelector(".mobile-signup-btn").parentElement.style.display =
      "none";
  } else {
    document.querySelector(".mobile-login-btn").parentElement.style.display =
      "block";
    document.querySelector(".mobile-signup-btn").parentElement.style.display =
      "block";
  }
}

function closeMobileMenu() {
  mobileMenu.classList.remove("active");
  mobileMenuBackdrop.classList.remove("active");
  document.body.style.overflow = "auto";
}

mobileMenuBtn.addEventListener("click", openMobileMenu);
mobileMenuClose.addEventListener("click", closeMobileMenu);
mobileMenuBackdrop.addEventListener("click", closeMobileMenu);

mobileLoginBtn.addEventListener("click", () => {
  closeMobileMenu();
  showAuthModal();
});

mobileSignupBtn.addEventListener("click", () => {
  closeMobileMenu();
  showAuthModal();
  registerTab.click();
});

// Initialize with sample text
novelText.value =
  "The ancient castle stood atop the hill, its towers reaching towards the darkening sky. Inside, the princess waited, her heart growing colder with each passing day. She gazed out the window, wondering if anyone would ever come to rescue her from the curse that had befallen this forgotten kingdom.";

// Navigation Logic
const sections = {
  hero: document.querySelector(".hero"),
  home: document.querySelector("#home"),
  features: document.querySelector(".input-section"),
  pricing: document.querySelector(".pricing-section"),
  result: document.querySelector(".result-section"),
  history: document.querySelector(".history-section"),
};

// Navigation links
const navLinks = {
  home: document.querySelectorAll("#homeLink, #mobileHomeLink"),
  features: document.querySelectorAll("#featuresLink, #mobileFeaturesLink"),
  pricing: document.querySelectorAll("#pricingLink, #mobilePricingLink"),
};

// Function to show a specific section and hide others
function showSection(sectionName) {
  // 特殊处理Home导航
  if (sectionName === "home") {
    // 显示Hero和Home两个部分
    sections.hero.style.display = "block";
    sections.home.style.display = "block";

    // 隐藏其他部分
    Object.keys(sections).forEach((key) => {
      if (key !== "hero" && key !== "home") {
        sections[key].style.display = "none";
      }
    });

    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  // 处理其他导航情况
  // 首先隐藏所有部分（包括hero和home）
  Object.keys(sections).forEach((key) => {
    if (key !== sectionName) {
      sections[key].style.display = "none";
    }
  });

  // 显示请求的部分
  sections[sectionName].style.display = "block";

  // 滚动到该部分
  sections[sectionName].scrollIntoView({ behavior: "smooth" });
}

// Add event listeners to navigation links
navLinks.home.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    // 展示Hero和Home两个部分
    sections.hero.style.display = "block";
    sections.home.style.display = "block";

    // 隐藏其他部分
    Object.keys(sections).forEach((key) => {
      if (key !== "hero" && key !== "home") {
        sections[key].style.display = "none";
      }
    });

    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (link.id === "mobileHomeLink") closeMobileMenu();
  });
});

navLinks.features.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showSection("features");
    if (link.id === "mobileFeaturesLink") closeMobileMenu();
  });
});

navLinks.pricing.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showSection("pricing");
    if (link.id === "mobilePricingLink") closeMobileMenu();
  });
});

// Initialize UI based on login state
function initializeUI() {
  console.log("Initializing UI, login state:", isLoggedIn);
  console.log("User profile element:", userProfile);
  console.log("Current display style:", userProfile.style.display);

  // 初始化页面时应该与点击Home按钮效果一致
  // 显示hero和home部分
  sections.hero.style.display = "block";
  sections.home.style.display = "block";

  // 隐藏其他所有部分
  Object.keys(sections).forEach((key) => {
    if (key !== "hero" && key !== "home") {
      sections[key].style.display = "none";
    }
  });

  if (isLoggedIn) {
    // User is logged in
    console.log("User is logged in, showing profile");
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
    userProfile.style.display = "flex";
    creditCount.textContent = usageCredits;
    badgeCredits.textContent = usageCredits;
    creditsBadge.style.display = "flex";
    document.querySelector(".mobile-login-btn").parentElement.style.display =
      "none";
    document.querySelector(".mobile-signup-btn").parentElement.style.display =
      "none";
  } else {
    // User is not logged in
    console.log("User not logged in, hiding profile");
    loginBtn.style.display = "block";
    signupBtn.style.display = "block";
    userProfile.style.display = "none";
    creditsBadge.style.display = "none";
    document.querySelector(".mobile-login-btn").parentElement.style.display =
      "block";
    document.querySelector(".mobile-signup-btn").parentElement.style.display =
      "block";
  }

  console.log(
    "After initialization, profile display:",
    userProfile.style.display
  );
}

// Call initialization function when page loads
document.addEventListener("DOMContentLoaded", initializeUI);

// Get Started buttons
document.getElementById("getStartedBtn").addEventListener("click", () => {
  showSection("features");
});

// Home page CTA button (原About CTA按钮)
document.querySelector(".about-cta .btn").addEventListener("click", () => {
  showSection("features");
  closeMobileMenu(); // 如果在移动端，关闭菜单
});

document.addEventListener("DOMContentLoaded", function () {
  initializeUI();

  // 添加隐私政策和服务条款链接点击事件
  const privacyLinks = document.querySelectorAll(".privacy-link");
  const termsLinks = document.querySelectorAll(".terms-link");

  privacyLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      showPrivacyPolicyModal();
    });
  });

  termsLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      showTermsModal();
    });
  });
});

// 添加登录状态持久化相关函数

// 存储用户登录信息到localStorage
function saveUserData(userData) {
  // 兼容新注册接口：userData.user 直接为用户对象
  const user = userData.user || userData;
  localStorage.setItem("user", JSON.stringify(user));
  if (userData.access_token)
    localStorage.setItem("access_token", userData.access_token);
  if (userData.refresh_token)
    localStorage.setItem("refresh_token", userData.refresh_token);
  if (userData.access_token_expires)
    localStorage.setItem("access_token_expires", userData.access_token_expires);
  if (userData.refresh_token_expires)
    localStorage.setItem(
      "refresh_token_expires",
      userData.refresh_token_expires
    );
  if (userData.token_type)
    localStorage.setItem("token_type", userData.token_type);
}

// 从localStorage获取用户信息
function getUserData() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const access_token = localStorage.getItem("access_token");
  // 兼容新注册接口：无token时只返回user
  if (user && access_token !== null) {
    return {
      user,
      access_token,
      refresh_token: localStorage.getItem("refresh_token"),
      access_token_expires: localStorage.getItem("access_token_expires"),
      refresh_token_expires: localStorage.getItem("refresh_token_expires"),
      token_type: localStorage.getItem("token_type"),
    };
  } else if (user) {
    return { user };
  }
  return null;
}

// 清除用户登录信息
function clearUserData() {
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("access_token_expires");
  localStorage.removeItem("refresh_token_expires");
  localStorage.removeItem("token_type");
}

// 页面加载时检查登录状态
document.addEventListener("DOMContentLoaded", function () {
  // 检查是否有保存的登录信息
  const userData = getUserData();
  if (userData) {
    // 重要：设置全局登录状态为true
    isLoggedIn = true;
    // 设置全局积分变量
    usageCredits = userData.user.credits;
    updateUIAfterLogin(userData);

    // 如果当前在历史记录页面，则显示历史记录部分并获取历史数据
    if (window.location.hash === "#history") {
      fetchUserHistory();
      showSection("history");
    }
  }
});

// History related functions
historyLink.addEventListener("click", (e) => {
  e.preventDefault();

  if (!isLoggedIn) {
    showToast("Please login to view your history", "info");
    showAuthModal();
    return;
  }

  // 每次点击历史记录链接时重新获取最新数据
  fetchUserHistory();
  showSection("history");
});

mobileHistoryLink.addEventListener("click", (e) => {
  e.preventDefault();

  if (!isLoggedIn) {
    showToast("Please login to view your history", "info");
    showAuthModal();
    return;
  }

  // 每次点击历史记录链接时重新获取最新数据
  fetchUserHistory();
  showSection("history");
  closeMobileMenu();
});

function toggleHistorySection() {
  if (historySection.style.display === "block") {
    historySection.style.display = "none";
    resultSection.style.display = "none";
  } else {
    historySection.style.display = "block";
    resultSection.style.display = "none";
  }
}

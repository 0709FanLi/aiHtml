// ===== GLOBAL VARIABLES =====
let isLoggedIn = false;
let currentUser = null;
let currentPlan = null;
let remainingGenerations = 0;
let showingAnswers = false;
let generatedQuestions = [];

// 历史记录全局变量
let allHistoryItems = [];
let currentHistoryPage = 1;
let totalHistoryPages = 1;
let totalHistoryItems = 0;

// 全局收藏列表变量
let allFavoriteItems = [];
let currentFavoritePage = 1;
let totalFavoritePages = 1;
let totalFavoriteItems = 0;

// ===== UTILITY FUNCTIONS =====
function showNotification(type, title, message, duration = 3000) {
  const notification = document.getElementById("notification");
  const notificationTitle = document.getElementById("notification-title");
  const notificationMessage = document.getElementById("notification-message");

  notification.className = "notification";
  notification.classList.add(`notification-${type}`);
  notification.classList.add("show");

  notificationTitle.textContent = title;
  notificationMessage.textContent = message;

  setTimeout(() => {
    notification.classList.remove("show");
  }, duration);
}

function formatDate(date = new Date()) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function generateRandomId(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// ===== MOCK DATABASE =====
const mockUsers = [
  {
    id: "user1",
    name: "John Doe",
    email: "demo@example.com",
    password: "password123",
    role: "teacher",
    plan: "premium",
    remainingGenerations: 18,
    totalGenerations: 30,
    createdAt: "2023-08-05T10:30:00Z",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
];

const mockPlans = {
  free: {
    name: "Free Trial",
    price: 0,
    generations: 1,
    features: ["All question types", "PDF download"],
  },
  basic: {
    name: "Basic",
    price: 0.99,
    generations: 2,
    features: ["All question types", "PDF and Word downloads"],
  },
  standard: {
    name: "Standard",
    price: 4.99,
    generations: 10,
    features: ["All question types", "All download formats"],
  },
  premium: {
    name: "Premium",
    price: 9.99,
    generations: 30,
    features: [
      "All question types",
      "All download formats",
      "Save to favorites",
    ],
  },
  monthly: {
    name: "Monthly",
    price: 10.99,
    generations: 50,
    features: [
      "All question types",
      "All download formats",
      "Save to favorites",
      "Priority support",
    ],
    recurring: true,
  },
  annual: {
    name: "Annual",
    price: 99.99,
    generations: 1000,
    features: [
      "All question types",
      "All download formats",
      "Save to favorites",
      "Priority support",
      "Bulk generation",
    ],
    recurring: true,
  },
};

const mockQuestionTemplates = {
  "math-arithmetic": {
    easy: [
      {
        type: "multiple_choice",
        text: "What is 25 + 18?",
        options: ["43", "42", "44", "45"],
        answer: "43",
        explanation: "25 + 18 = 43",
      },
      {
        type: "fill_blank",
        text: "Fill in the missing number: 5, 10, 15, ___, 25",
        answer: "20",
        explanation: "The pattern increases by 5 each time",
      },
      {
        type: "true_false",
        text: "15 + 17 = 32",
        answer: "True",
        explanation: "15 + 17 = 32",
      },
      {
        type: "multiple_choice",
        text: "What is 7 × 6?",
        options: ["42", "41", "43", "46"],
        answer: "42",
        explanation: "7 × 6 = 42",
      },
      {
        type: "word_problem",
        text: "Sarah has 24 cookies. She gives 6 cookies to her friend. How many cookies does Sarah have left?",
        answer: "18",
        explanation: "24 - 6 = 18",
      },
    ],
    medium: [
      {
        type: "multiple_choice",
        text: "What is 125 + 237?",
        options: ["362", "352", "372", "342"],
        answer: "362",
        explanation: "125 + 237 = 362",
      },
      {
        type: "fill_blank",
        text: "Fill in the missing number: 4, 8, 16, ___, 64",
        answer: "32",
        explanation: "The pattern multiplies by 2 each time",
      },
      {
        type: "word_problem",
        text: "A store sells apples for $0.50 each and oranges for $0.75 each. If I buy 6 apples and 4 oranges, how much will I spend?",
        answer: "$6.00",
        explanation:
          "6 apples at $0.50 each = $3.00, 4 oranges at $0.75 each = $3.00, Total = $6.00",
      },
    ],
    hard: [
      {
        type: "multiple_choice",
        text: "What is 15% of 840?",
        options: ["126", "124", "128", "130"],
        answer: "126",
        explanation: "15% of 840 = 0.15 × 840 = 126",
      },
      {
        type: "word_problem",
        text: "A train travels at 60 miles per hour. How far will it travel in 3.5 hours?",
        answer: "210 miles",
        explanation:
          "Distance = Speed × Time = 60 miles/hour × 3.5 hours = 210 miles",
      },
    ],
  },
  "math-algebra": {
    easy: [
      {
        type: "multiple_choice",
        text: "Solve for x: x + 5 = 12",
        options: ["7", "8", "6", "5"],
        answer: "7",
        explanation: "x + 5 = 12, so x = 12 - 5 = 7",
      },
      {
        type: "fill_blank",
        text: "If 3x = 15, then x = ___",
        answer: "5",
        explanation: "3x = 15, so x = 15 ÷ 3 = 5",
      },
    ],
    medium: [
      {
        type: "multiple_choice",
        text: "Solve for x: 2x - 7 = 9",
        options: ["8", "7", "9", "6"],
        answer: "8",
        explanation: "2x - 7 = 9, so 2x = 16, and x = 8",
      },
      {
        type: "fill_blank",
        text: "Solve for x: 3(x + 2) = 24, x = ___",
        answer: "6",
        explanation: "3(x + 2) = 24, so x + 2 = 8, and x = 6",
      },
    ],
    hard: [
      {
        type: "multiple_choice",
        text: "Solve for x: 2(x + 3) - 5 = 3x - 7",
        options: ["2", "3", "4", "1"],
        answer: "2",
        explanation:
          "2x + 6 - 5 = 3x - 7, so 2x + 1 = 3x - 7, so 1 + 7 = 3x - 2x, so 8 = x",
      },
      {
        type: "word_problem",
        text: "The sum of three consecutive integers is 51. What is the smallest of these integers?",
        answer: "16",
        explanation:
          "Let the integers be x, x+1, and x+2. Then x + (x+1) + (x+2) = 51, so 3x + 3 = 51, so 3x = 48, and x = 16.",
      },
    ],
  },
  "science-general": {
    easy: [
      {
        type: "multiple_choice",
        text: "Which of the following is NOT a state of matter?",
        options: ["Energy", "Solid", "Liquid", "Gas"],
        answer: "Energy",
        explanation:
          "The three main states of matter are solid, liquid, and gas. Energy is not a state of matter.",
      },
      {
        type: "true_false",
        text: "Plants make their own food through a process called photosynthesis.",
        answer: "True",
        explanation:
          "Plants use sunlight, water, and carbon dioxide to create glucose (sugar) through photosynthesis.",
      },
    ],
    medium: [
      {
        type: "multiple_choice",
        text: "What is the main function of the mitochondria in a cell?",
        options: [
          "Energy production",
          "Protein synthesis",
          "Cell division",
          "Waste removal",
        ],
        answer: "Energy production",
        explanation:
          'Mitochondria are known as the "powerhouses" of the cell because they produce ATP, the cell\'s main energy currency.',
      },
      {
        type: "short_answer",
        text: "Explain the difference between a physical and chemical change.",
        answer:
          "A physical change alters the form of a substance but not its chemical composition, while a chemical change creates new substances with different properties.",
        explanation:
          "Examples of physical changes include changes in state, shape, or size. Chemical changes involve chemical reactions that form new substances.",
      },
    ],
    hard: [
      {
        type: "multiple_choice",
        text: "Which of the following best explains natural selection?",
        options: [
          "Organisms with advantageous traits are more likely to survive and reproduce",
          "Organisms can change their traits during their lifetime to better suit their environment",
          "Species always evolve toward greater complexity",
          "All mutations are beneficial to a species",
        ],
        answer:
          "Organisms with advantageous traits are more likely to survive and reproduce",
        explanation:
          "Natural selection is the process where organisms with traits better suited to their environment tend to survive and produce more offspring, passing those traits to future generations.",
      },
      {
        type: "short_answer",
        text: "Explain how an electromagnetic wave differs from a mechanical wave.",
        answer:
          "Electromagnetic waves can travel through vacuum and don't require a medium, while mechanical waves require a medium to travel through. Electromagnetic waves consist of oscillating electric and magnetic fields.",
        explanation:
          "Examples of electromagnetic waves include light, radio waves, and X-rays. Examples of mechanical waves include sound waves and ocean waves.",
      },
    ],
  },
};

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", function () {
  // Initialize UI
  setupEventListeners();
  handleScroll();

  // 先检查登录状态，确保所有依赖登录的功能都在登录状态验证之后执行
  checkLoginStatus();

  // 初始化页面路由和状态
  const initialHash = window.location.hash.substring(1) || "home";
  if (initialHash === "home" || initialHash === "pricing") {
    // 在页面最初加载时就隐藏How It Works部分
    const howItWorksSection = document.getElementById("how-it-works-section");
    if (howItWorksSection) {
      howItWorksSection.classList.remove("active");
      howItWorksSection.style.display = "none"; // 确保完全隐藏
    }
  }

  // 如果初始化页面是dashboard相关页面，确保登录状态检查完成后再加载
  if (initialHash === "dashboard") {
    if (isLoggedIn) {
      setupRouting();
      // 默认显示dashboard overview标签
      document
        .querySelector('.nav-link[data-tab="dashboard-overview"]')
        .click();
      // 加载Recent Activity数据
      updateRecentActivity();
      // 加载Dashboard统计数据
      fetchDashboardStatsAndUpdateUI();

      // 如果直接访问account-settings页面，加载用户资料
      if (window.location.hash.includes("account-settings")) {
        loadUserProfile();
      }
    } else {
      // 如果未登录但尝试访问dashboard，重定向到首页
      window.location.hash = "home";
      setupRouting();
    }
  } else {
    // 设置路由
    setupRouting();
  }

  // 手动添加Terms和Privacy点击事件
  document
    .getElementById("terms-link")
    .addEventListener("click", openTermsModal);
  document
    .getElementById("privacy-link")
    .addEventListener("click", openPrivacyModal);

  // 确保登录表单中的条款链接也正常工作
  const loginTermsLink = document.getElementById("login-terms-link");
  if (loginTermsLink) {
    loginTermsLink.addEventListener("click", openTermsModal);
  }

  const loginPrivacyLink = document.getElementById("login-privacy-link");
  if (loginPrivacyLink) {
    loginPrivacyLink.addEventListener("click", openPrivacyModal);
  }

  // 优化Profile邮箱输入框
  const profileEmail = document.getElementById("profile-email");
  if (profileEmail) {
    profileEmail.readOnly = true;
    profileEmail.style.cursor = "not-allowed";
    profileEmail.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
  }
});

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Navbar scroll effect
  window.addEventListener("scroll", handleScroll);

  // Auth related events
  document.getElementById("login-tab").addEventListener("click", switchAuthTab);
  document
    .getElementById("register-tab")
    .addEventListener("click", switchAuthTab);
  document
    .getElementById("login-form-element")
    .addEventListener("submit", handleLogin);
  document
    .getElementById("register-form-element")
    .addEventListener("submit", handleRegister);
  document
    .getElementById("logout-button")
    .addEventListener("click", handleLogout);

  // 添加中文输入检测
  const inputFields = document.querySelectorAll(
    'input[type="email"], input[type="password"], input[type="text"]'
  );
  inputFields.forEach((field) => {
    field.addEventListener("input", function () {
      checkChineseInput(this);
    });
  });

  // Password strength meter
  document
    .getElementById("register-password")
    .addEventListener("input", updatePasswordStrength);
  document
    .getElementById("new-password")
    .addEventListener("input", updatePasswordStrength);

  // Generation form
  document
    .getElementById("generator-form")
    .addEventListener("submit", handleGenerate);
  document
    .getElementById("toggle-answers")
    .addEventListener("click", toggleAnswers);

  // Add event listeners for question type checkboxes and comprehensive test
  const questionTypeCheckboxes = document.querySelectorAll(
    ".question-type-checkbox"
  );
  const comprehensiveTestCheckbox =
    document.getElementById("comprehensive-test");
  const questionsCountInput = document.getElementById("questions-count");

  // Add event listeners to all question type checkboxes
  questionTypeCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      // If any question type is checked and comprehensive test is also checked
      if (this.checked && comprehensiveTestCheckbox.checked) {
        // Uncheck comprehensive test
        comprehensiveTestCheckbox.checked = false;
        // 恢复问题数量输入框
        questionsCountInput.disabled = false;
      }
    });
  });

  // Add event listener to comprehensive test checkbox
  comprehensiveTestCheckbox.addEventListener("change", function () {
    // If comprehensive test is checked
    if (this.checked) {
      // Uncheck all question type checkboxes
      questionTypeCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      // 设置问题数量为1并禁用输入框
      questionsCountInput.value = 1;
      questionsCountInput.disabled = true;
    } else {
      // 恢复问题数量输入框
      questionsCountInput.disabled = false;
    }
  });

  // Dashboard tabs
  const dashboardLinks = document.querySelectorAll(
    ".dashboard-sidebar .nav-link"
  );
  dashboardLinks.forEach((link) => {
    link.addEventListener("click", switchDashboardTab);
  });

  // Try-free buttons
  document
    .getElementById("try-free-button")
    .addEventListener("click", goToGenerator);
  document
    .getElementById("try-free-pricing")
    .addEventListener("click", goToGenerator);
  document
    .getElementById("try-now-button")
    .addEventListener("click", goToGenerator);
  document
    .getElementById("get-started-button")
    .addEventListener("click", goToGenerator);
  document
    .getElementById("create-new-quiz")
    .addEventListener("click", goToGenerator);

  // Payment related events
  const buyButtons = document.querySelectorAll(".buy-btn");
  buyButtons.forEach((button) => {
    button.addEventListener("click", handleBuyClick);
  });
  document
    .getElementById("proceed-to-payment")
    .addEventListener("click", proceedToPayment);
  document.getElementById("back-to-plan").addEventListener("click", backToPlan);
  document
    .getElementById("payment-form")
    .addEventListener("submit", processPayment);
  document
    .getElementById("payment-card")
    .addEventListener("change", togglePaymentForm);
  document
    .getElementById("payment-paypal")
    .addEventListener("change", togglePaymentForm);
  document
    .getElementById("go-to-generator")
    .addEventListener("click", closeModalAndGoToGenerator);

  // Contact form
  document
    .getElementById("contact-form")
    .addEventListener("submit", handleContactSubmit);

  // Notification close button
  document
    .getElementById("notification-close")
    .addEventListener("click", function () {
      document.getElementById("notification").classList.remove("show");
    });

  // Profile form
  document
    .getElementById("profile-form")
    .addEventListener("submit", handleProfileUpdate);
  document
    .getElementById("password-form")
    .addEventListener("submit", handlePasswordUpdate);
  document.getElementById("upgrade-btn").addEventListener("click", function () {
    navigateTo("pricing");
  });

  // Terms of Service link
  document
    .getElementById("terms-link")
    .addEventListener("click", openTermsModal);

  // Privacy Policy link
  document
    .getElementById("privacy-link")
    .addEventListener("click", openPrivacyModal);

  // 移除对不存在的cookie-link元素的引用
  // document
  //   .getElementById("cookie-link")
  //   .addEventListener("click", openCookieModal);
}

// ===== UI HANDLERS =====
function handleScroll() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

function handleContactSubmit(e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const message = document.getElementById("contact-message").value.trim();

  // Basic validation
  if (!name || !email || !message) {
    showNotification("error", "Form Error", "Please fill in all fields.");
    return;
  }

  if (!isValidEmail(email)) {
    showNotification(
      "error",
      "Form Error",
      "Please enter a valid email address."
    );
    return;
  }

  // Simulate sending the contact form
  showNotification(
    "success",
    "Message Sent",
    "Thank you for your message. We'll get back to you soon!"
  );

  // Reset the form
  document.getElementById("contact-form").reset();
}

function switchAuthTab(e) {
  const authTabs = document.querySelectorAll(".auth-tab");
  authTabs.forEach((tab) => tab.classList.remove("active"));

  e.target.classList.add("active");
  const tabId = e.target.getAttribute("data-tab");

  if (tabId === "login-form") {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("register-form").style.display = "none";
  } else {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
  }
}

function switchDashboardTab(e) {
  e.preventDefault();

  const tabLinks = document.querySelectorAll(".dashboard-sidebar .nav-link");
  tabLinks.forEach((link) => link.classList.remove("active"));

  e.target.classList.add("active");
  const tabId = e.target.getAttribute("data-tab");

  const tabs = document.querySelectorAll(".dashboard-tab");
  tabs.forEach((tab) => (tab.style.display = "none"));

  document.getElementById(tabId).style.display = "block";

  // 如果切换到Dashboard概览，加载Recent Activity
  if (tabId === "dashboard-overview") {
    // 加载最近活动数据
    updateRecentActivity();
    // 加载Dashboard统计数据
    fetchDashboardStatsAndUpdateUI();
  }

  // 如果切换到历史记录标签页，加载历史记录数据
  if (tabId === "generation-history") {
    // 默认加载第一页数据
    fetchQuizHistory(1);
  }

  // 如果切换到收藏标签页，加载收藏数据
  if (tabId === "favorites") {
    // 默认加载第一页数据
    fetchFavorites(1);
  }

  // 如果切换到账户设置标签页，加载用户个人资料
  if (tabId === "account-settings") {
    // 从localStorage加载用户资料到表单
    loadUserProfile();
  }
}

// 从localStorage加载用户资料到表单
function loadUserProfile() {
  // 检查是否已登录
  if (!isLoggedIn || !currentUser) {
    showNotification(
      "error",
      "Authentication Failed",
      "Please login to view your profile settings."
    );
    return;
  }

  // 加载用户名到表单
  if (currentUser.name) {
    document.getElementById("profile-name").value = currentUser.name;
  }

  // 加载邮箱到表单（只读）
  if (currentUser.email) {
    document.getElementById("profile-email").value = currentUser.email;
  }

  console.log("User profile loaded from localStorage:", currentUser);
}

function updatePasswordStrength(e) {
  const password = e.target.value;
  const strength = calculatePasswordStrength(password);
  let progressBar, feedback;

  if (e.target.id === "register-password") {
    progressBar = document.getElementById("register-password-strength");
    feedback = document.getElementById("register-password-feedback");
  } else {
    progressBar = document.getElementById("password-strength");
    feedback = document.getElementById("password-feedback");
  }

  // Update progress bar
  progressBar.style.width = `${strength.score * 25}%`;

  // Set appropriate color
  progressBar.className = "progress-bar";
  if (strength.score <= 1) {
    progressBar.classList.add("bg-danger");
  } else if (strength.score <= 2) {
    progressBar.classList.add("bg-warning");
  } else if (strength.score <= 3) {
    progressBar.classList.add("bg-info");
  } else {
    progressBar.classList.add("bg-success");
  }

  // Update feedback text
  feedback.textContent = strength.feedback;
}

function calculatePasswordStrength(password) {
  // Simple password strength algorithm
  let score = 0;
  let feedback = "Password is too weak";

  if (password.length >= 8) score++;
  if (password.match(/[A-Z]/)) score++;
  if (password.match(/[0-9]/)) score++;
  if (password.match(/[^A-Za-z0-9]/)) score++;

  if (score === 1) feedback = "Password is weak";
  else if (score === 2) feedback = "Password is moderate";
  else if (score === 3) feedback = "Password is strong";
  else if (score === 4) feedback = "Password is very strong";

  return { score, feedback };
}

function toggleAnswers() {
  const answersButton = document.getElementById("toggle-answers");
  const answerElements = document.querySelectorAll(".question-answer");

  showingAnswers = !showingAnswers;

  if (showingAnswers) {
    answersButton.innerHTML =
      '<i class="fas fa-eye-slash me-1"></i> Hide Answers';
    answerElements.forEach((el) => (el.style.display = "block"));
  } else {
    answersButton.innerHTML = '<i class="fas fa-eye me-1"></i> Show Answers';
    answerElements.forEach((el) => (el.style.display = "none"));
  }
}

function togglePaymentForm() {
  const cardForm = document.getElementById("card-payment-form");
  const paypalForm = document.getElementById("paypal-payment-form");

  if (document.getElementById("payment-card").checked) {
    cardForm.style.display = "block";
    paypalForm.style.display = "none";
  } else {
    cardForm.style.display = "none";
    paypalForm.style.display = "block";
  }
}

// ===== AUTH FUNCTIONS =====
function checkLoginStatus() {
  // 检查localStorage和sessionStorage中的用户信息和令牌
  const savedUser =
    localStorage.getItem("currentUser") ||
    sessionStorage.getItem("currentUser");
  const accessToken =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");

  if (savedUser && accessToken) {
    // 解析用户数据
    try {
      currentUser = JSON.parse(savedUser);
      isLoggedIn = true;

      // 更新UI显示已登录状态
      updateUIForLoggedInUser();
    } catch (e) {
      console.error("Error parsing user data:", e);
      // 数据解析错误，清除存储并保持未登录状态
      localStorage.removeItem("currentUser");
      sessionStorage.removeItem("currentUser");
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
    }
  } else {
    // 令牌或用户数据不完整，清除存储
    if (savedUser || accessToken) {
      localStorage.removeItem("currentUser");
      sessionStorage.removeItem("currentUser");
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
    }
    isLoggedIn = false;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // 获取验证码
  const sendCodeBtn = document.getElementById("send-code-btn");
  const resetEmailInput = document.getElementById("reset-email");
  const verificationFeedback = document.getElementById("verification-feedback");
  if (sendCodeBtn && resetEmailInput) {
    sendCodeBtn.addEventListener("click", function () {
      const email = resetEmailInput.value.trim();
      if (!email) {
        verificationFeedback.textContent = "Please enter your email address.";
        verificationFeedback.classList.add("text-danger");
        return;
      }
      // 获取token
      const accessToken =
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken") ||
        "";
      sendCodeBtn.disabled = true;
      sendCodeBtn.textContent = "Sending...";
      fetch("http://web.practicesnow.com/api/v1/auth/email-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ email }),
      })
        .then((response) =>
          response.json().then((data) => ({ ok: response.ok, data }))
        )
        .then((result) => {
          if (result.ok && result.data.ok === 1) {
            verificationFeedback.textContent =
              "Verification code sent to your email.";
            verificationFeedback.classList.remove("text-danger");
            verificationFeedback.classList.add("text-success");
          } else {
            verificationFeedback.textContent =
              result.data.message || "Failed to send code.";
            verificationFeedback.classList.add("text-danger");
          }
        })
        .catch((err) => {
          verificationFeedback.textContent = "Network error, please try again.";
          verificationFeedback.classList.add("text-danger");
        })
        .finally(() => {
          sendCodeBtn.disabled = false;
          sendCodeBtn.textContent = "Get Code";
        });
    });
  }

  // 重置密码
  const resetPasswordForm = document.getElementById("reset-password-form");
  if (resetPasswordForm) {
    resetPasswordForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("reset-email").value.trim();
      const code = document.getElementById("verification-code").value.trim();
      const password = document.getElementById("reset-new-password").value;
      const passwordConfirm = document.getElementById(
        "reset-confirm-new-password"
      ).value;
      if (!email || !code || !password || !passwordConfirm) {
        showNotification("error", "Error", "Please fill in all fields.");
        return;
      }
      if (password !== passwordConfirm) {
        showNotification("error", "Error", "Passwords do not match.");
        return;
      }
      // 获取token
      const accessToken =
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken") ||
        "";
      // md5加密
      const md5Password = md5(password);
      const md5PasswordConfirm = md5(passwordConfirm);
      const submitBtn = document.getElementById("reset-password-submit");
      submitBtn.disabled = true;
      submitBtn.textContent = "Resetting...";
      fetch("http://web.practicesnow.com/api/v1/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email,
          verification_code: code,
          password: md5Password,
          password_confirm: md5PasswordConfirm,
        }),
      })
        .then((response) =>
          response.json().then((data) => ({ ok: response.ok, data }))
        )
        .then((result) => {
          if (result.ok && result.data.ok === 1) {
            showNotification(
              "success",
              "Success",
              "Password reset successfully, please login."
            );
            // 关闭弹窗
            const resetModal = bootstrap.Modal.getInstance(
              document.getElementById("resetPasswordModal")
            );
            if (resetModal) resetModal.hide();
          } else {
            showNotification(
              "error",
              "Error",
              result.data.message || "Failed to reset password."
            );
          }
        })
        .catch((err) => {
          showNotification(
            "error",
            "Error",
            "Network error, please try again."
          );
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = "Reset Password";
        });
    });
  }
});

function updateUIForLoggedInUser() {
  // 确保用户确实已登录
  if (!isLoggedIn || !currentUser) {
    console.error(
      "Attempted to update UI for logged in user, but user is not logged in"
    );
    return;
  }

  // Update navigation
  document.getElementById("auth-buttons").style.display = "none";
  document.getElementById("user-info").style.display = "flex";

  // 确保在移动视图中也隐藏登录按钮
  try {
    const loginButton = document.getElementById("login-button");
    const registerButton = document.getElementById("register-button");
    if (loginButton) loginButton.style.display = "none";
    if (registerButton) registerButton.style.display = "none";
  } catch (e) {
    console.error("Error hiding login/register buttons:", e);
  }

  // Update user info in navbar
  document.getElementById("navbar-username").textContent = currentUser.name;

  // 检查和显示用户积分
  // 格式化积分显示，确保不会换行
  const creditsSpan = document.getElementById("navbar-credits");
  creditsSpan.textContent = `${currentUser.remainingGenerations || 5} credits`;
  creditsSpan.style.whiteSpace = "nowrap"; // 防止换行

  // Update dashboard info
  document.getElementById("sidebar-username").textContent = currentUser.name;
  document.getElementById("sidebar-plan").textContent = `${
    currentUser.plan ? mockPlans[currentUser.plan]?.name || "Free" : "Free"
  } Plan`;

  // 更新剩余生成次数
  const remainingGens = currentUser.remainingGenerations || 5;
  const totalGens = currentUser.totalGenerations || 10;
  document.getElementById("remaining-generations").textContent = remainingGens;
  document.getElementById("total-generations").textContent = totalGens;

  // Update progress bar
  const progressPercent = (remainingGens / totalGens) * 100;
  document.querySelector(".progress-bar").style.width = `${progressPercent}%`;
  checkGenerateButton(); // 登录后立即检查生成按钮
}

function handleLogin(e) {
  e.preventDefault();

  // 获取表单和错误信息元素
  const loginForm = document.getElementById("login-form-element");

  // 获取输入值
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const rememberMe = document.getElementById("remember-me").checked;

  // 检查是否同意条款
  const agreeTerms = document.getElementById("login-agree-terms").checked;
  if (!agreeTerms) {
    // 创建错误提示（如果不存在）
    let errorMessageElement = loginForm.querySelector(".alert");
    if (!errorMessageElement) {
      errorMessageElement = document.createElement("div");
      errorMessageElement.className = "alert alert-danger mt-3";
      errorMessageElement.setAttribute("role", "alert");
      const submitButton = document.getElementById("login-submit");
      loginForm.insertBefore(errorMessageElement, submitButton.parentNode);
    } else {
      errorMessageElement.classList.remove("d-none");
    }

    // 设置错误信息
    errorMessageElement.textContent =
      "Please agree to our Terms of Service and Privacy Policy to continue.";

    // 显示通知
    showNotification(
      "error",
      "Login Failed",
      "Please agree to our Terms of Service and Privacy Policy to continue."
    );
    return;
  }

  // 基本验证
  if (!email || !password) {
    showNotification(
      "error",
      "Login Failed",
      "Please enter both email and password."
    );
    return;
  }

  // 提醒使用英文
  if (/[\u4e00-\u9fa5]/.test(email) || /[\u4e00-\u9fa5]/.test(password)) {
    showNotification(
      "warning",
      "Language Notice",
      "Please use English characters for login credentials."
    );
    return;
  }

  // 使用MD5加密密码
  const md5Password = md5(password);

  // 准备API请求数据
  const loginData = {
    email: email,
    password: md5Password,
  };

  // 更新提交按钮状态
  const loginSubmitButton = document.getElementById("login-submit");
  const originalButtonText = loginSubmitButton.textContent;
  loginSubmitButton.disabled = true;
  loginSubmitButton.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Logging in...';

  // 调用登录API
  fetch("http://web.practicesnow.com/api/v1/auth/login", {
    method: "POST",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => {
      console.log("login--response", response);
      // 显式检查HTTP响应状态码是否在200-299之间
      const isSuccess = response.status >= 200 && response.status < 300;
      // 解析JSON响应
      return response.json().then((data) => {
        // 返回包含响应状态和数据的对象
        return { isSuccess, data, status: response.status };
      });
    })
    .then((result) => {
      console.log("login--result", result);
      if (result.isSuccess) {
        // 登录成功，处理API返回的数据
        const responseData = result.data;

        // 检查API返回是否成功
        if (responseData.ok !== 1) {
          // 登录失败，直接用showNotification提示中文原因
          showNotification(
            "error",
            "Login Failed",
            responseData.message ||
              "Incorrect email or password. Please try again."
          );
          // 恢复按钮状态
          loginSubmitButton.disabled = false;
          loginSubmitButton.innerHTML = originalButtonText;
          return;
        }

        // 获取API返回的数据
        const data = responseData.data;
        const userData = data.user;

        // 创建用户对象
        const user = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          plan: "free", // 默认plan，可根据API返回调整
          remainingGenerations:
            typeof userData.generate_count === "number"
              ? userData.generate_count
              : 0, // 用后端字段
          totalGenerations: 10, // 可根据后端返回扩展
          createdAt: userData.created_at,
          lastLoginAt: userData.last_login_at,
          avatar:
            userData.avatar_url ||
            `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
          // 存储认证相关信息
          auth: {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            tokenType: data.token_type,
          },
        };

        // 设置当前用户和登录状态
        currentUser = { ...user };
        isLoggedIn = true;

        // 根据记住我选项存储用户信息
        if (rememberMe) {
          // 永久存储（或者直到用户清除）
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          // 单独存储token，方便后续API调用使用
          localStorage.setItem("accessToken", data.access_token);
          localStorage.setItem("refreshToken", data.refresh_token);
          localStorage.setItem("tokenType", data.token_type);
        } else {
          // 会话存储（浏览器关闭后清除）
          sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
          // 单独存储token，方便后续API调用使用
          sessionStorage.setItem("accessToken", data.access_token);
          sessionStorage.setItem("refreshToken", data.refresh_token);
          sessionStorage.setItem("tokenType", data.token_type);
        }

        // 关闭登录模态框
        const authModal = bootstrap.Modal.getInstance(
          document.getElementById("authModal")
        );
        authModal.hide();

        // 更新UI
        updateUIForLoggedInUser();

        // 登录成功后导航到home页面，效果与点击Home导航一致
        setTimeout(() => {
          navigateTo("home");
        }, 1000);
      } else {
        // 登录失败，不再弹窗提示
        // 恢复按钮状态
        loginSubmitButton.disabled = false;
        loginSubmitButton.innerHTML = originalButtonText;
      }
    })
    .catch((error) => {
      // 登录失败 - 不再弹窗提示
      // 创建错误提示（如果不存在）
      let errorMessageElement = loginForm.querySelector(".alert");
      if (!errorMessageElement) {
        errorMessageElement = document.createElement("div");
        errorMessageElement.className = "alert alert-danger mt-3";
        errorMessageElement.setAttribute("role", "alert");
        loginForm.insertBefore(
          errorMessageElement,
          loginSubmitButton.parentNode
        );
      } else {
        errorMessageElement.classList.remove("d-none");
      }
      // 设置错误信息
      errorMessageElement.textContent =
        error.message || "Incorrect email or password. Please try again.";
      // 不再showNotification
    })
    .finally(() => {
      // 重置登录按钮状态
      loginSubmitButton.disabled = false;
      loginSubmitButton.innerHTML = originalButtonText;
    });
}

async function handleRegister(e) {
  e.preventDefault();

  // 获取表单和错误信息元素
  const registerForm = document.getElementById("register-form-element");
  const errorMessageElement = document.getElementById("register-error-message");

  // 隐藏之前的错误消息
  errorMessageElement.classList.add("d-none");

  // 重置表单验证状态
  resetFormValidation(registerForm);

  const name = document.getElementById("register-name").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById(
    "register-confirm-password"
  ).value;

  // 增强的客户端表单验证
  let isValid = true;

  // 验证姓名
  if (!name) {
    showInputError("register-name", "Please enter your name");
    isValid = false;
  }

  // 验证邮箱
  if (!email || !isValidEmail(email)) {
    showInputError("register-email", "Please enter a valid email address");
    isValid = false;
  }

  // 验证密码
  if (!password || password.length < 8) {
    showInputError(
      "register-password",
      "Password must be at least 8 characters long"
    );
    isValid = false;
  }

  // 验证确认密码
  if (password !== confirmPassword) {
    showInputError("register-confirm-password", "Passwords do not match");
    isValid = false;
  }

  // 如果验证失败，停止提交
  if (!isValid) {
    return;
  }

  // 使用MD5加密密码
  const md5Password = md5(password);
  const md5ConfirmPassword = md5(confirmPassword);

  // Prepare data for API
  const userData = {
    email: email,
    password: md5Password,
    password_confirm: md5ConfirmPassword,
    name: name,
  };

  // Show loading notification or disable button
  const registerSubmitButton = document.getElementById("register-submit");
  const originalButtonText = registerSubmitButton.textContent;
  registerSubmitButton.disabled = true;
  registerSubmitButton.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Registering...';

  // Call API
  fetch("http://web.practicesnow.com/api/v1/auth/register", {
    method: "POST",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      // 显式检查HTTP响应状态码是否在200-299之间
      const isSuccess = response.status >= 200 && response.status < 300;
      // 解析JSON响应
      return response.json().then((data) => {
        // 返回包含响应状态和数据的对象
        return { isSuccess, data, status: response.status };
      });
    })
    .then((result) => {
      if (result.isSuccess) {
        // 注册成功
        const data = result.data;

        // 注册成功后，关闭当前模态框
        const authModal = bootstrap.Modal.getInstance(
          document.getElementById("authModal")
        );
        authModal.hide();

        // 显示成功通知
        showNotification(
          "success",
          "Registration Successful",
          "Please login with your new account."
        );

        // 短暂延迟后重新打开登录模态框并自动填充邮箱
        setTimeout(() => {
          // 打开登录模态框
          const loginModal = new bootstrap.Modal(
            document.getElementById("authModal")
          );
          loginModal.show();

          // 切换到登录标签
          document.getElementById("login-tab").click();

          // 自动填充邮箱
          document.getElementById("login-email").value = email;

          // 聚焦密码输入框
          document.getElementById("login-password").focus();
        }, 1000);
      } else {
        // 注册失败，抛出错误
        throw new Error(
          result.data.error ||
            `Registration failed, status code: ${result.status}`
        );
      }
    })
    .catch((error) => {
      // Registration failed - 显示错误信息
      console.error("Registration error:", error);

      // 在表单中显示错误信息
      errorMessageElement.textContent =
        error.message ||
        "An error occurred during registration, please try again.";
      errorMessageElement.classList.remove("d-none");

      // 如果是邮箱已存在错误，聚焦到邮箱输入框
      if (error.message && error.message.includes("邮箱已存在")) {
        showInputError("register-email", "Email already exists");
      }

      // 显示通知
      showNotification(
        "error",
        "Registration Failed",
        error.message ||
          "An error occurred during registration, please try again."
      );
    })
    .finally(() => {
      // Re-enable button regardless of outcome
      registerSubmitButton.disabled = false;
      registerSubmitButton.innerHTML = originalButtonText;
    });
}

// 辅助函数：验证邮箱格式
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 辅助函数：显示输入错误
function showInputError(elementId, message) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.add("is-invalid");

    // 查找相关的反馈元素并设置消息
    const feedbackElement = document.getElementById(`${elementId}-feedback`);
    if (feedbackElement) {
      feedbackElement.textContent = message;
    }
  }
}

// 辅助函数：重置表单验证状态
function resetFormValidation(form) {
  // 移除所有输入字段的错误状态
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    input.classList.remove("is-invalid");
  });
}

function handleLogout(e) {
  e.preventDefault();

  // 更新登出按钮状态
  const logoutButton = document.getElementById("logout-button");
  const originalButtonText = logoutButton.textContent;
  logoutButton.disabled = true;
  logoutButton.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Logging out...';

  // 调用登出API
  fetch("http://web.practicesnow.com/api/v1/auth/logout", {
    method: "POST",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken") ||
        ""
      }`,
    },
    body: JSON.stringify({}),
  })
    .then((response) => {
      // 无论API返回什么结果，都进行本地登出处理
      console.log("Logout API response:", response);
      return { success: true };
    })
    .catch((error) => {
      // 即使API调用失败，也进行本地登出处理
      console.error("Logout API error:", error);
      return { success: true };
    })
    .finally(() => {
      // 本地登出处理

      // 清除会话
      isLoggedIn = false;
      currentUser = null;

      // 清除LocalStorage中的所有存储
      localStorage.removeItem("currentUser");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenType");

      // 清除SessionStorage中的所有存储
      sessionStorage.removeItem("currentUser");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("tokenType");

      // 1. 清空Dashboard相关全局变量
      allHistoryItems = [];
      currentHistoryPage = 1;
      totalHistoryPages = 1;
      totalHistoryItems = 0;
      allFavoriteItems = [];
      currentFavoritePage = 1;
      totalFavoritePages = 1;
      totalFavoriteItems = 0;

      // 2. 清空Dashboard页面内容
      // 概览卡片
      const totalQuizzesElem = document.getElementById(
        "dashboard-total-quizzes"
      );
      if (totalQuizzesElem) totalQuizzesElem.textContent = "0";
      const lastActivityElem = document.getElementById(
        "dashboard-last-activity"
      );
      if (lastActivityElem) lastActivityElem.textContent = "No activity";
      const favoritesElem = document.getElementById("dashboard-favorites");
      if (favoritesElem) favoritesElem.textContent = "0";
      // 进度条和剩余次数
      const remainingElem = document.getElementById("remaining-generations");
      if (remainingElem) remainingElem.textContent = "0";
      const totalElem = document.getElementById("total-generations");
      if (totalElem) totalElem.textContent = "0";
      const progressBar = document.querySelector(".progress-bar");
      if (progressBar) progressBar.style.width = "0%";
      // 历史记录和收藏列表
      const historyList = document.querySelector(".generation-history-list");
      if (historyList) historyList.innerHTML = "";
      const favoritesList = document.querySelector(".favorites-list");
      if (favoritesList) favoritesList.innerHTML = "";

      // 3. 隐藏Dashboard相关section，跳转到首页
      const dashboardSection = document.getElementById("dashboard-section");
      if (dashboardSection) dashboardSection.style.display = "none";
      // 还原所有tab内容为隐藏
      document
        .querySelectorAll(".dashboard-tab")
        .forEach((tab) => (tab.style.display = "none"));
      // 跳转到首页
      navigateTo("home");

      // 4. 可选：重置生成器预览区
      const previewPlaceholder = document.getElementById("preview-placeholder");
      const previewContent = document.getElementById("preview-content");
      const loadingIndicator = document.getElementById("loading-indicator");
      if (previewPlaceholder) previewPlaceholder.style.display = "flex";
      if (previewContent) previewContent.style.display = "none";
      if (loadingIndicator) loadingIndicator.style.display = "none";
      const questionsContainer = document.getElementById("questions-container");
      if (questionsContainer) questionsContainer.innerHTML = "";

      // 更新UI - 显示登录/注册按钮区域
      document.getElementById("auth-buttons").style.display = "flex";
      document.getElementById("user-info").style.display = "none";

      // 单独确保登录和注册按钮可见
      try {
        const loginButton = document.getElementById("login-button");
        const registerButton = document.getElementById("register-button");
        if (loginButton) loginButton.style.display = "inline-block";
        if (registerButton) registerButton.style.display = "inline-block";
      } catch (e) {
        console.error("Error showing login/register buttons:", e);
      }

      // 重置登出按钮状态
      logoutButton.disabled = false;
      logoutButton.textContent = originalButtonText;

      // 显示通知
      showNotification(
        "info",
        "Logged Out",
        "You have been successfully logged out."
      );
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const forgotPasswordLink = document.getElementById("forgot-password");
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", function (e) {
      e.preventDefault();
      // 打开重置密码模态框
      const resetModal = new bootstrap.Modal(
        document.getElementById("resetPasswordModal")
      );
      resetModal.show();
    });
  }
});

// ===== GENERATOR FUNCTIONS =====
function handleGenerate(e) {
  e.preventDefault();

  // 检查剩余次数
  if (isLoggedIn && currentUser.remainingGenerations <= 0) {
    showNotification(
      "warning",
      "可用次数已用完",
      "请购买更多生成次数或升级套餐。"
    );
    checkGenerateButton();
    navigateTo("pricing");
    return;
  }

  // Get form values
  const gradeSelect = document.getElementById("grade-select");
  const grade = gradeSelect.options[gradeSelect.selectedIndex].text;

  const subjectSelect = document.getElementById("subject-select");
  const subjectValue = subjectSelect.value;
  const subjectText = subjectSelect.options[subjectSelect.selectedIndex].text;

  // 提取主题分类，例如从"math-arithmetic"提取为"Mathematics Arithmetic"
  let formattedSubject = "";
  if (subjectValue.includes("math")) {
    formattedSubject = "Mathematics " + subjectText;
  } else if (subjectValue.includes("science")) {
    formattedSubject = "Science " + subjectText;
  } else if (subjectValue.includes("ela")) {
    formattedSubject = "English " + subjectText;
  } else if (subjectValue.includes("social")) {
    formattedSubject = "Social Studies " + subjectText;
  } else if (subjectValue.includes("language")) {
    formattedSubject = "Language " + subjectText;
  }

  const difficulty = getDifficultyLevel();
  const isComprehensive = document.getElementById("comprehensive-test").checked;

  // 确定问题数量
  let numberOfQuestions = parseInt(
    document.getElementById("questions-count").value,
    10
  );

  // 如果是综合测试，强制设置为1
  if (isComprehensive) {
    numberOfQuestions = 1;
  } else {
    // 限制普通测试最大问题数为100
    numberOfQuestions = Math.min(numberOfQuestions, 100);
  }

  // Get selected question types
  const selectedTypes = [];
  document
    .querySelectorAll(".question-type-checkbox:checked")
    .forEach((checkbox) => {
      // 将值首字母大写并添加到数组中
      const typeValue = checkbox.value;
      let formattedType = "";

      if (typeValue === "multiple_choice") {
        formattedType = "Multiple Choice";
      } else if (typeValue === "true_false") {
        formattedType = "True/False";
      } else if (typeValue === "fill_blank") {
        formattedType = "Fill in the Blank";
      } else if (typeValue === "short_answer") {
        formattedType = "Short Answer";
      } else if (typeValue === "word_problem") {
        formattedType = "Word Problems";
      }

      selectedTypes.push(formattedType);
    });

  // Validate form
  if (!grade || !subjectValue) {
    showNotification(
      "error",
      "Validation Error",
      "Please select a grade level and subject."
    );
    return;
  }

  if (!isComprehensive && selectedTypes.length === 0) {
    showNotification(
      "error",
      "Validation Error",
      "Please select at least one question type or choose 'Make comprehensive test'."
    );
    return;
  }

  // 检查用户是否登录
  if (!isLoggedIn) {
    showNotification(
      "warning",
      "Login Required",
      "Please log in to generate quizzes."
    );

    // 打开登录模态框
    const authModal = new bootstrap.Modal(document.getElementById("authModal"));
    authModal.show();
    return;
  }

  // 准备API请求数据
  let requestData = {
    grade_level: grade,
    subject: formattedSubject,
    difficulty_level: difficulty,
    number_of_questions: numberOfQuestions,
    make_comprehensive_test: isComprehensive,
  };

  // 只有在非综合测试模式下才添加问题类型
  if (!isComprehensive) {
    requestData.question_types = selectedTypes;
  }

  console.log("API Request Data:", requestData);

  // Show loading indicator
  document.getElementById("loading-indicator").style.display = "flex";
  document.getElementById("preview-placeholder").style.display = "none";
  document.getElementById("preview-content").style.display = "none";

  // 获取 accessToken
  const accessToken =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken") ||
    "";

  // 调用API生成测验
  fetch("http://web.practicesnow.com/api/v1/quiz/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      console.log("API Response:", response);
      const isSuccess = response.status >= 200 && response.status < 300;
      return response.json().then((data) => {
        return { isSuccess, data, status: response.status };
      });
    })
    .then((result) => {
      console.log("API Result:", result);
      if (result.isSuccess && result.data.ok === 1) {
        // 生成成功
        const responseData = result.data.data;

        // 更新预览标题
        document.getElementById(
          "preview-title"
        ).textContent = `${grade} ${formattedSubject} Quiz`;
        document.getElementById("preview-date").textContent = formatDate();

        // 渲染问题和答案内容
        displayQuizContent(responseData);

        // 隐藏加载指示器并显示预览
        document.getElementById("loading-indicator").style.display = "none";
        document.getElementById("preview-content").style.display = "block";

        // 重置答案显示状态
        showingAnswers = false;
        document.getElementById("toggle-answers").innerHTML =
          '<i class="fas fa-eye me-1"></i> Show Answers';

        // 减少用户的剩余生成次数
        if (isLoggedIn) {
          if (currentUser.remainingGenerations > 0) {
            currentUser.remainingGenerations--;
            if (localStorage.getItem("currentUser")) {
              localStorage.setItem("currentUser", JSON.stringify(currentUser));
            } else if (sessionStorage.getItem("currentUser")) {
              sessionStorage.setItem(
                "currentUser",
                JSON.stringify(currentUser)
              );
            }
            updateUIForLoggedInUser();
            checkGenerateButton();
            showNotification(
              "success",
              "生成成功",
              `测验生成成功，剩余可用次数：${currentUser.remainingGenerations}`
            );
          } else {
            checkGenerateButton();
            showNotification(
              "warning",
              "可用次数已用完",
              "请购买更多生成次数或升级套餐。"
            );
          }
        } else {
          showNotification("success", "生成成功", "测验生成成功。");
        }
      } else {
        // 处理API错误
        throw new Error(
          result.data.message || "Failed to generate quiz. Please try again."
        );
      }
    })
    .catch((error) => {
      console.error("Quiz generation error:", error);

      // 隐藏加载指示器并显示占位符
      document.getElementById("loading-indicator").style.display = "none";
      document.getElementById("preview-placeholder").style.display = "flex";

      // 显示错误通知
      showNotification(
        "error",
        "Generation Failed",
        error.message || "Failed to generate quiz. Please try again."
      );
    });
}

// 显示API生成的问题和答案
function displayQuizContent(data) {
  const container = document.getElementById("questions-container");
  container.innerHTML = "";

  // 创建问题容器
  const questionsDiv = document.createElement("div");
  questionsDiv.className = "generated-questions";
  questionsDiv.innerHTML = data.question;

  // 创建答案容器（默认隐藏）
  const answersDiv = document.createElement("div");
  answersDiv.className = "question-answer";
  answersDiv.style.display = "none";
  answersDiv.innerHTML = data.answer;

  // 添加到容器
  container.appendChild(questionsDiv);
  container.appendChild(answersDiv);
}

function getDifficultyLevel() {
  const sliderValue = document.getElementById("difficulty-slider").value;
  if (sliderValue == 1) return "easy";
  if (sliderValue == 2) return "medium";
  return "hard";
}

function getSubjectName(subjectValue) {
  const subjectSelect = document.getElementById("subject-select");
  const option = Array.from(subjectSelect.options).find(
    (opt) => opt.value === subjectValue
  );
  return option ? option.textContent : "Subject";
}

function generateQuestions(subject, difficulty, count, selectedTypes) {
  const questions = [];
  const availableTemplates = mockQuestionTemplates[subject]
    ? mockQuestionTemplates[subject][difficulty]
    : [];

  // If we don't have templates for this specific subject+difficulty, use general ones
  let templates =
    availableTemplates ||
    mockQuestionTemplates["math-arithmetic"][difficulty] ||
    mockQuestionTemplates["science-general"][difficulty];

  // Filter templates by selected question types
  templates = templates.filter((template) =>
    selectedTypes.includes(template.type)
  );

  // Generate the questions
  for (let i = 0; i < count; i++) {
    // Pick a random template from available ones
    const templateIndex = Math.floor(Math.random() * templates.length);
    const template = templates[templateIndex];

    // Add to questions list with a unique ID
    questions.push({
      id: generateRandomId(),
      ...template,
    });
  }

  return questions;
}

function renderQuestions(questions) {
  const container = document.getElementById("questions-container");
  container.innerHTML = "";

  questions.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.className = "question-item";

    // Create question text
    const questionText = document.createElement("div");
    questionText.className = "question-text";
    questionText.textContent = `${index + 1}. ${question.text}`;

    // Create options if this is a multiple choice question
    let optionsElement = "";
    if (question.type === "multiple_choice" && question.options) {
      optionsElement = document.createElement("div");
      optionsElement.className = "question-options";

      question.options.forEach((option, optIndex) => {
        const optionElement = document.createElement("div");
        optionElement.className = "question-option";

        // Use letters for options (A, B, C, etc.)
        const optionLetter = String.fromCharCode(65 + optIndex);
        optionElement.textContent = `${optionLetter}. ${option}`;

        optionsElement.appendChild(optionElement);
      });
    }

    // Create answer element (hidden by default)
    const answerElement = document.createElement("div");
    answerElement.className = "question-answer";
    answerElement.style.display = "none";

    answerElement.innerHTML = `<strong>Answer:</strong> ${question.answer}`;
    if (question.explanation) {
      answerElement.innerHTML += `<br><strong>Explanation:</strong> ${question.explanation}`;
    }

    // Append all elements
    questionElement.appendChild(questionText);
    if (optionsElement) questionElement.appendChild(optionsElement);
    questionElement.appendChild(answerElement);

    container.appendChild(questionElement);
  });
}

// ===== PAYMENT FUNCTIONS =====
function handleBuyClick(e) {
  const planId = e.target.getAttribute("data-plan");
  currentPlan = mockPlans[planId];

  // Check if user is logged in
  if (!isLoggedIn) {
    // Show login modal
    const authModal = new bootstrap.Modal(document.getElementById("authModal"));
    authModal.show();

    // Set login tab as active
    document.getElementById("login-tab").click();

    // Show notification
    showNotification(
      "info",
      "Login Required",
      "Please log in before purchasing a plan."
    );
    return;
  }

  // Update payment modal with plan details
  document.getElementById("selected-plan-name").textContent =
    currentPlan.name + " Plan";
  document.getElementById(
    "selected-plan-desc"
  ).textContent = `${currentPlan.generations} generations, all formats, premium features`;
  document.getElementById(
    "selected-plan-price"
  ).textContent = `$${currentPlan.price.toFixed(2)}`;

  // Update features list
  const featuresList = document.getElementById("plan-features");
  featuresList.innerHTML = "";

  // Add generations feature
  const generationsItem = document.createElement("li");
  generationsItem.className = "list-group-item d-flex align-items-center";
  generationsItem.innerHTML = `<i class="fas fa-check text-success me-2"></i> ${currentPlan.generations} quiz generations`;
  featuresList.appendChild(generationsItem);

  // Add other features
  currentPlan.features.forEach((feature) => {
    const featureItem = document.createElement("li");
    featureItem.className = "list-group-item d-flex align-items-center";
    featureItem.innerHTML = `<i class="fas fa-check text-success me-2"></i> ${feature}`;
    featuresList.appendChild(featureItem);
  });

  // Show payment modal
  const paymentModal = new bootstrap.Modal(
    document.getElementById("paymentModal")
  );
  paymentModal.show();

  // Reset payment steps to first step
  resetPaymentSteps();
}

function resetPaymentSteps() {
  // Reset step indicators
  document
    .querySelectorAll(".payment-step")
    .forEach((step) => step.classList.remove("active", "completed"));
  document.getElementById("step-plan").classList.add("active");

  // Show only the first step content
  document.getElementById("plan-step").style.display = "block";
  document.getElementById("payment-step").style.display = "none";
  document.getElementById("confirm-step").style.display = "none";
}

function proceedToPayment() {
  // Update step indicators
  document.getElementById("step-plan").classList.remove("active");
  document.getElementById("step-plan").classList.add("completed");
  document.getElementById("step-payment").classList.add("active");

  // Switch content
  document.getElementById("plan-step").style.display = "none";
  document.getElementById("payment-step").style.display = "block";
}

function backToPlan() {
  // Update step indicators
  document.getElementById("step-payment").classList.remove("active");
  document.getElementById("step-plan").classList.remove("completed");
  document.getElementById("step-plan").classList.add("active");

  // Switch content
  document.getElementById("payment-step").style.display = "none";
  document.getElementById("plan-step").style.display = "block";
}

function processPayment(e) {
  e.preventDefault();

  // Update step indicators
  document.getElementById("step-payment").classList.remove("active");
  document.getElementById("step-payment").classList.add("completed");
  document.getElementById("step-confirm").classList.add("active");

  // Switch content
  document.getElementById("payment-step").style.display = "none";
  document.getElementById("confirm-step").style.display = "block";

  // Update confirmation details
  document.getElementById("summary-plan").textContent =
    currentPlan.name + " Plan";
  document.getElementById("summary-amount").textContent =
    "$" + currentPlan.price.toFixed(2);
  document.getElementById("summary-date").textContent = formatDate();
  document.getElementById("summary-order-id").textContent =
    "ORD-" + generateRandomId(8);

  // Update user's plan and remaining generations
  currentUser.plan = currentPlan.name.toLowerCase();
  currentUser.totalGenerations = currentPlan.generations;
  currentUser.remainingGenerations = currentPlan.generations;

  // Save to localStorage
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  // Update UI
  updateUIForLoggedInUser();
}

function closeModalAndGoToGenerator() {
  // Close payment modal
  const paymentModal = bootstrap.Modal.getInstance(
    document.getElementById("paymentModal")
  );
  paymentModal.hide();

  // Navigate to generator
  goToGenerator();
}

// ===== NAVIGATION FUNCTIONS =====
function setupRouting() {
  // Set up click handlers for all navigation links
  document.querySelectorAll("a[data-section]").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const section = this.getAttribute("data-section");
      navigateTo(section);
    });
  });

  // Handle "Learn More" button click event
  document
    .querySelector(".hero-buttons a[href='#how-it-works']")
    .addEventListener("click", function (e) {
      e.preventDefault();

      // Hide all sections
      document.querySelectorAll(".content-section").forEach((section) => {
        section.classList.remove("active");
        section.style.display = "none"; // Ensure completely hidden
      });

      // Show How It Works section
      const howItWorksSection = document.getElementById("how-it-works-section");
      if (howItWorksSection) {
        howItWorksSection.classList.add("active");
        howItWorksSection.style.display = "block"; // Ensure visible
      }

      // Update URL
      window.location.hash = "how-it-works";

      // Update active navigation links
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active");
      });
      const howItWorksLink = document.querySelector(
        '.nav-link[data-section="how-it-works"]'
      );
      if (howItWorksLink) {
        howItWorksLink.classList.add("active");
      }

      // Scroll to top
      window.scrollTo(0, 0);
    });

  // Set initial page display
  const initialHash = window.location.hash.substring(1) || "home";

  // Hide all sections
  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.remove("active");
  });

  // If initial page is home or pricing, don't show how-it-works section
  if (initialHash === "home" || initialHash === "pricing") {
    // Show requested section
    const targetSection = document.getElementById(`${initialHash}-section`);
    if (targetSection) {
      targetSection.classList.add("active");
    }

    // Ensure How It Works is not displayed
    const howItWorksSection = document.getElementById("how-it-works-section");
    if (howItWorksSection) {
      howItWorksSection.classList.remove("active");
    }
  } else {
    // For other pages, display normally
    const targetSection = document.getElementById(`${initialHash}-section`);
    if (targetSection) {
      targetSection.classList.add("active");
    }
  }

  // Update active navigation links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });
  const activeLink = document.querySelector(
    `.nav-link[data-section="${initialHash}"]`
  );
  if (activeLink) activeLink.classList.add("active");

  // Update hash-based routing
  window.addEventListener("hashchange", function () {
    const hash = window.location.hash.substring(1) || "home";
    navigateTo(hash);
  });
}

function navigateTo(section) {
  // Update URL hash
  window.location.hash = section;

  // Hide all sections
  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.remove("active");
    section.style.display = "none"; // Ensure completely hidden
  });

  // Check if it's home or pricing page
  if (section === "home" || section === "pricing") {
    // Only show target section
    const targetSection = document.getElementById(`${section}-section`);
    if (targetSection) {
      targetSection.classList.add("active");
      targetSection.style.display = "block"; // Ensure visible
    }

    // Ensure How It Works is not displayed
    const howItWorksSection = document.getElementById("how-it-works-section");
    if (howItWorksSection) {
      howItWorksSection.classList.remove("active");
      howItWorksSection.style.display = "none"; // Ensure completely hidden
    }
  } else {
    // For other pages, show target section
    const targetSection = document.getElementById(`${section}-section`);
    if (targetSection) {
      targetSection.classList.add("active");
      targetSection.style.display = "block"; // Ensure visible
    }
    // 新增：如果是dashboard，默认切换到overview tab并加载
    if (section === "dashboard") {
      // 切换tab
      document
        .querySelectorAll(".dashboard-tab")
        .forEach((tab) => (tab.style.display = "none"));
      const overviewTab = document.getElementById("dashboard-overview");
      if (overviewTab) overviewTab.style.display = "block";
      // 激活tab链接
      document
        .querySelectorAll(".dashboard-sidebar .nav-link")
        .forEach((link) => link.classList.remove("active"));
      const overviewLink = document.querySelector(
        '.dashboard-sidebar .nav-link[data-tab="dashboard-overview"]'
      );
      if (overviewLink) overviewLink.classList.add("active");
      // 加载数据
      if (typeof updateRecentActivity === "function") updateRecentActivity();
      if (typeof fetchDashboardStatsAndUpdateUI === "function")
        fetchDashboardStatsAndUpdateUI();
    }
  }

  // Scroll to top
  window.scrollTo(0, 0);

  // Update active navigation links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });
  const activeLink = document.querySelector(
    `.nav-link[data-section="${section}"]`
  );
  if (activeLink) activeLink.classList.add("active");
}

function goToGenerator() {
  navigateTo("generator");
}

// 在openTermsModal和openPrivacyModal函数中添加关闭事件监听，确保蒙层被正确移除

function openTermsModal(event) {
  if (event) event.preventDefault();

  // 移除可能存在的任何modal-backdrop元素
  document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.remove();
  });

  const termsModalEl = document.getElementById("termsModal");
  const modal = new bootstrap.Modal(termsModalEl);

  // 添加隐藏事件监听器，确保蒙层被移除
  termsModalEl.addEventListener(
    "hidden.bs.modal",
    function () {
      document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
        backdrop.remove();
      });
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    },
    { once: true }
  );

  modal.show();
}

function openPrivacyModal(event) {
  if (event) event.preventDefault();

  // 移除可能存在的任何modal-backdrop元素
  document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.remove();
  });

  const privacyModalEl = document.getElementById("privacyModal");
  const modal = new bootstrap.Modal(privacyModalEl);

  // 添加隐藏事件监听器，确保蒙层被移除
  privacyModalEl.addEventListener(
    "hidden.bs.modal",
    function () {
      document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
        backdrop.remove();
      });
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    },
    { once: true }
  );

  modal.show();
}

// 在document ready或window.onload中添加这段代码
window.addEventListener("load", function () {
  // 清理可能存在的模态框蒙层
  document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.remove();
  });

  // 重置body样式
  document.body.classList.remove("modal-open");
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
});

function openCookieModal(event) {
  if (event) event.preventDefault();
  const modal = new bootstrap.Modal(document.getElementById("cookieModal"));
  modal.show();
}

function handleProfileUpdate(e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("profile-name").value.trim();

  // Basic validation
  if (!name) {
    showNotification("error", "Update Failed", "Please fill in your name.");
    return;
  }

  // 更新按钮状态
  const updateButton = document.querySelector(
    "#profile-form button[type='submit']"
  );
  const originalButtonText = updateButton.textContent;
  updateButton.disabled = true;
  updateButton.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Updating...';

  // 获取访问令牌
  const accessToken =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken") ||
    "";

  // 检查是否已登录和是否有访问令牌
  if (!accessToken || !isLoggedIn) {
    showNotification(
      "error",
      "Authentication Failed",
      "No valid login credentials found. Please login again."
    );
    updateButton.disabled = false;
    updateButton.innerHTML = originalButtonText;
    return;
  }

  // 准备API请求数据
  const requestData = {
    name: name,
  };

  // 发送更新请求
  fetch("http://web.practicesnow.com/api/v1/user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      console.log("update-user-response", response);
      // 显式检查HTTP响应状态码
      const isSuccess = response.status >= 200 && response.status < 300;
      // 解析JSON响应
      return response.json().then((data) => {
        return { isSuccess, data, status: response.status };
      });
    })
    .then((result) => {
      console.log("update-user-result", result);
      if (result.isSuccess && result.data.ok === 1) {
        // 更新成功，处理API返回的数据
        const userData = result.data.data.user || result.data.data;

        // 更新当前用户信息
        currentUser.name = userData.name || name;

        // 更新本地存储
        if (localStorage.getItem("currentUser")) {
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } else if (sessionStorage.getItem("currentUser")) {
          sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
        }

        // 更新UI
        document.getElementById("navbar-username").textContent =
          currentUser.name;
        document.getElementById("sidebar-username").textContent =
          currentUser.name;

        // 显示成功通知
        showNotification(
          "success",
          "Profile Updated",
          "Your profile has been successfully updated."
        );
      } else if (result.status === 401) {
        // 如果是401认证问题，尝试自动刷新登录
        refreshTokenAndRetry(() => handleProfileUpdate(e));
      } else {
        // 处理API错误
        throw new Error(
          result.data.message || `Update failed, status code: ${result.status}`
        );
      }
    })
    .catch((error) => {
      // 更新失败 - 显示错误消息
      console.error("Update error:", error);

      // 显示通知
      showNotification(
        "error",
        "Update Failed",
        error.message || "An error occurred while updating your profile."
      );
    })
    .finally(() => {
      // 恢复按钮状态
      updateButton.disabled = false;
      updateButton.innerHTML = originalButtonText;
    });
}

function handlePasswordUpdate(e) {
  e.preventDefault();

  // Get form values
  const currentPassword = document.getElementById("current-password").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Basic validation
  if (md5(currentPassword) !== currentUser.password) {
    showNotification(
      "error",
      "Password Update Failed",
      "Current password is incorrect."
    );
    return;
  }

  if (newPassword !== confirmPassword) {
    showNotification(
      "error",
      "Password Update Failed",
      "New passwords do not match."
    );
    return;
  }

  if (newPassword.length < 8) {
    showNotification(
      "error",
      "Password Update Failed",
      "Password must be at least 8 characters long."
    );
    return;
  }

  // Update user password
  currentUser.password = md5(newPassword);

  // Update storage
  if (localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  } else if (sessionStorage.getItem("currentUser")) {
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  }

  // Reset form
  document.getElementById("password-form").reset();

  // Show success notification
  showNotification(
    "success",
    "Password Updated",
    "Your password has been successfully updated."
  );
}

// 获取测验历史记录
function fetchQuizHistory(
  page = 1,
  pageSize = 10,
  subject = null,
  gradeLevel = null
) {
  // 保存当前页码
  currentHistoryPage = page;

  // 显示加载状态
  const historyList = document.querySelector(".generation-history-list");
  historyList.innerHTML =
    '<div class="text-center py-5"><div class="spinner-border text-primary" role="status"></div><p class="mt-3">Loading history records...</p></div>';

  // 清空分页控件
  document.querySelector(".pagination").innerHTML = "";

  // 构建请求参数（改为POST请求体参数）
  const requestData = {
    page: page,
    page_size: pageSize,
  };

  // 添加可选参数
  if (subject) requestData.subject = subject;
  if (gradeLevel) requestData.grade_level = gradeLevel;

  // 获取访问令牌 - 确保从localStorage和sessionStorage都尝试获取
  const accessToken =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken") ||
    "";

  // 检查令牌是否有效并且用户是否登录
  if (!accessToken || !isLoggedIn) {
    showNotification(
      "error",
      "Authentication Failed",
      "No valid login credentials found. Please login again."
    );

    // 显示空状态
    historyList.innerHTML =
      '<div class="text-center py-5"><i class="fas fa-exclamation-circle text-warning mb-3" style="font-size: 2.5rem"></i><p>Not logged in or session expired. Please login to view.</p><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#authModal">Login</button></div>';
    return;
  }

  // 发起请求获取历史记录 - 改为POST方法
  fetch("http://web.practicesnow.com/api/v1/quiz/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      console.log("response-history", response);
      // 检查响应状态
      const isSuccess = response.status >= 200 && response.status < 300;
      return response.json().then((data) => {
        return { isSuccess, data, status: response.status };
      });
    })
    .then((result) => {
      console.log("result-history", result);
      if (result.isSuccess && result.data.ok === 1) {
        // 成功获取数据
        const responseData = result.data.data;

        // 保存历史记录数据供本地搜索使用
        allHistoryItems = responseData.items;
        totalHistoryPages = responseData.pages;
        totalHistoryItems = responseData.total;

        // 显示历史记录
        renderHistoryItems(responseData.items);

        // 显示分页控件
        renderPagination(
          responseData.page,
          responseData.pages,
          responseData.total
        );

        // 如果没有记录，显示空状态
        if (responseData.items.length === 0) {
          historyList.innerHTML =
            '<div class="text-center py-5"><i class="fas fa-inbox text-muted mb-3" style="font-size: 2.5rem"></i><p>No quiz history records found</p><button class="btn btn-primary" id="create-new-quiz-from-history">Create New Quiz</button></div>';

          // 添加创建新测验按钮的事件监听
          document
            .getElementById("create-new-quiz-from-history")
            .addEventListener("click", goToGenerator);
        }
      } else if (result.status === 401) {
        // 如果是401认证问题，尝试自动刷新登录
        refreshTokenAndRetry(() =>
          fetchQuizHistory(page, pageSize, subject, gradeLevel)
        );
      } else {
        // 处理API错误
        let errorMessage =
          result.data.message || "Failed to fetch history records";

        // 其他错误
        historyList.innerHTML = `<div class="text-center py-5"><i class="fas fa-exclamation-triangle text-danger mb-3" style="font-size: 2.5rem"></i><p>${errorMessage}</p><button class="btn btn-outline-primary" onclick="fetchQuizHistory(1)">Retry</button></div>`;

        showNotification("error", "Loading Failed", errorMessage);
      }
    })
    .catch((error) => {
      console.error("Failed to fetch quiz history:", error);

      // 显示错误状态
      historyList.innerHTML =
        '<div class="text-center py-5"><i class="fas fa-exclamation-triangle text-danger mb-3" style="font-size: 2.5rem"></i><p>Loading failed. Please check your network connection.</p><button class="btn btn-outline-primary" onclick="fetchQuizHistory(1)">Retry</button></div>';

      showNotification(
        "error",
        "Loading Failed",
        "An error occurred while fetching history records. Please try again later."
      );
    });
}

// 渲染历史记录列表项
function renderHistoryItems(items) {
  const historyList = document.querySelector(".generation-history-list");
  historyList.innerHTML = "";

  items.forEach((item) => {
    // 格式化创建时间
    const createdDate = new Date(item.created_at);
    const formattedDate = formatDate(createdDate);

    // 解析问题类型数组
    let questionTypes = [];
    try {
      questionTypes = JSON.parse(item.question_types);
    } catch (e) {
      console.error("Error parsing question types:", e);
    }

    // 创建历史记录项 HTML
    const historyItemHtml = `
              <div class="generation-history-item" data-quiz-id="${item.id}">
                <div class="generation-history-header">
                  <h5 class="generation-history-title">
                    ${item.grade_level} ${item.subject} ${
      item.make_comprehensive_test ? "Comprehensive Test" : "Quiz"
    }
                  </h5>
                  <div class="generation-history-date">
                    ${formattedDate}
                  </div>
                </div>
                <div class="generation-history-meta">
                  <span class="generation-history-tag">${
                    item.grade_level
                  }</span>
                  <span class="generation-history-tag">${item.subject}</span>
                  <span class="generation-history-tag">${
                    item.number_of_questions
                  } ${
      item.number_of_questions > 1 ? "Questions" : "Question"
    }</span>
                  <span class="generation-history-tag">${
                    item.difficulty_level.charAt(0).toUpperCase() +
                    item.difficulty_level.slice(1)
                  }</span>
                  ${
                    item.make_comprehensive_test
                      ? '<span class="generation-history-tag bg-warning">Comprehensive</span>'
                      : ""
                  }
                </div>
                <div class="generation-history-preview">
                  ${extractPreview(item.question, 150)}
                </div>
                <div class="d-flex justify-content-end">
                  <button class="btn btn-sm btn-outline-primary me-2 view-quiz-btn" data-quiz-id="${
                    item.id
                  }">
                    <i class="fas fa-eye me-1"></i> View
                  </button>
                  <button class="btn btn-sm btn-outline-secondary me-2 toggle-favorite-btn" data-quiz-id="${
                    item.id
                  }" data-is-favorite="${item.is_favorite}">
                    <i class="fas ${
                      item.is_favorite ? "fa-star" : "fa-star-o"
                    } me-1"></i> ${item.is_favorite ? "Unfavorite" : "Favorite"}
                  </button>
                  <button class="btn btn-sm btn-outline-danger delete-quiz-btn" data-quiz-id="${
                    item.id
                  }">
                    <i class="fas fa-trash me-1"></i> Delete
                  </button>
                </div>
              </div>
            `;

    historyList.innerHTML += historyItemHtml;
  });

  // 添加事件监听器
  document.querySelectorAll(".view-quiz-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const quizId = this.getAttribute("data-quiz-id");
      viewQuiz(quizId);
    });
  });

  document.querySelectorAll(".toggle-favorite-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const quizId = this.getAttribute("data-quiz-id");
      const isFavorite = this.getAttribute("data-is-favorite") === "true";
      toggleFavorite(quizId, !isFavorite);
    });
  });

  document.querySelectorAll(".delete-quiz-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const quizId = this.getAttribute("data-quiz-id");
      confirmDeleteQuiz(quizId);
    });
  });
}

// 提取问题预览（截取前N个字符）
function extractPreview(htmlContent, maxLength = 150) {
  // 创建临时元素解析HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  // 获取纯文本内容
  const textContent = tempDiv.textContent || tempDiv.innerText || "";

  // 截取前N个字符
  let preview = textContent.trim().substring(0, maxLength);

  // 如果原文更长，添加省略号
  if (textContent.length > maxLength) {
    preview += "...";
  }

  return preview;
}

// 渲染分页控件
function renderPagination(currentPage, totalPages, totalItems) {
  const paginationElement = document.querySelector(".pagination");

  if (!paginationElement) return;

  // 清空分页控件
  paginationElement.innerHTML = "";

  // 显示总条数 - 只显示一次
  const listInfoElement = document.createElement("div");
  listInfoElement.className = "pagination-info text-secondary mb-2 text-center";
  listInfoElement.textContent = `Total ${totalItems} records, ${totalPages} pages`;

  // 先移除所有可能存在的旧信息元素
  const oldInfoElements = document.querySelectorAll(".pagination-info");
  oldInfoElements.forEach((element) => element.remove());

  // 添加新的信息元素
  paginationElement.parentNode.insertBefore(listInfoElement, paginationElement);

  // 上一页按钮
  const prevItem = document.createElement("li");
  prevItem.className = `page-item ${currentPage <= 1 ? "disabled" : ""}`;

  const prevLink = document.createElement("a");
  prevLink.className = "page-link";
  prevLink.href = "#";
  prevLink.textContent = "Previous";
  prevLink.setAttribute("aria-label", "Previous");

  if (currentPage > 1) {
    prevLink.addEventListener("click", function (e) {
      e.preventDefault();
      fetchQuizHistory(currentPage - 1);
    });
  }

  prevItem.appendChild(prevLink);
  paginationElement.appendChild(prevItem);

  // 页码按钮
  const maxButtons = 5; // 最多显示5个页码按钮
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  // 调整startPage，确保显示足够的页码按钮
  if (endPage - startPage + 1 < maxButtons && startPage > 1) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  // 添加第一页按钮（如果不在可见范围内）
  if (startPage > 1) {
    const firstItem = document.createElement("li");
    firstItem.className = "page-item";

    const firstLink = document.createElement("a");
    firstLink.className = "page-link";
    firstLink.href = "#";
    firstLink.textContent = "1";

    firstLink.addEventListener("click", function (e) {
      e.preventDefault();
      fetchQuizHistory(1);
    });

    firstItem.appendChild(firstLink);
    paginationElement.appendChild(firstItem);

    // 添加省略号（如果不是紧挨着第一页）
    if (startPage > 2) {
      const ellipsisItem = document.createElement("li");
      ellipsisItem.className = "page-item disabled";

      const ellipsisLink = document.createElement("a");
      ellipsisLink.className = "page-link";
      ellipsisLink.textContent = "...";

      ellipsisItem.appendChild(ellipsisLink);
      paginationElement.appendChild(ellipsisItem);
    }
  }

  // 添加中间的页码按钮
  for (let i = startPage; i <= endPage; i++) {
    const pageItem = document.createElement("li");
    pageItem.className = `page-item ${i === currentPage ? "active" : ""}`;

    const pageLink = document.createElement("a");
    pageLink.className = "page-link";
    pageLink.href = "#";
    pageLink.textContent = i;

    if (i !== currentPage) {
      pageLink.addEventListener("click", function (e) {
        e.preventDefault();
        fetchQuizHistory(i);
      });
    }

    pageItem.appendChild(pageLink);
    paginationElement.appendChild(pageItem);
  }

  // 添加最后一页按钮（如果不在可见范围内）
  if (endPage < totalPages) {
    // 添加省略号（如果不是紧挨着最后一页）
    if (endPage < totalPages - 1) {
      const ellipsisItem = document.createElement("li");
      ellipsisItem.className = "page-item disabled";

      const ellipsisLink = document.createElement("a");
      ellipsisLink.className = "page-link";
      ellipsisLink.textContent = "...";

      ellipsisItem.appendChild(ellipsisLink);
      paginationElement.appendChild(ellipsisItem);
    }

    const lastItem = document.createElement("li");
    lastItem.className = "page-item";

    const lastLink = document.createElement("a");
    lastLink.className = "page-link";
    lastLink.href = "#";
    lastLink.textContent = totalPages;

    lastLink.addEventListener("click", function (e) {
      e.preventDefault();
      fetchQuizHistory(totalPages);
    });

    lastItem.appendChild(lastLink);
    paginationElement.appendChild(lastItem);
  }

  // 下一页按钮
  const nextItem = document.createElement("li");
  nextItem.className = `page-item ${
    currentPage >= totalPages ? "disabled" : ""
  }`;

  const nextLink = document.createElement("a");
  nextLink.className = "page-link";
  nextLink.href = "#";
  nextLink.textContent = "Next";
  nextLink.setAttribute("aria-label", "Next");

  if (currentPage < totalPages) {
    nextLink.addEventListener("click", function (e) {
      e.preventDefault();
      fetchQuizHistory(currentPage + 1);
    });
  }

  nextItem.appendChild(nextLink);
  paginationElement.appendChild(nextItem);
}

// 查看测验详情
function viewQuiz(quizId) {
  // 获取访问令牌
  const accessToken =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken") ||
    "";

  // 显示加载中状态
  showNotification("info", "Loading", "Loading quiz details...");

  // 调用API获取测验详情
  fetch(`http://web.practicesnow.com/api/v1/quiz/${quizId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      const isSuccess = response.status >= 200 && response.status < 300;
      return response.json().then((data) => {
        return { isSuccess, data, status: response.status };
      });
    })
    .then((result) => {
      if (result.isSuccess && result.data.ok === 1) {
        // 成功获取数据
        const quizData = result.data.data;

        // 导航到生成器页面
        navigateTo("generator");

        // 显示测验内容
        displayHistoryQuiz(quizData);
      } else {
        // 处理API错误
        throw new Error(result.data.message || "Failed to fetch quiz details");
      }
    })
    .catch((error) => {
      console.error("Failed to fetch quiz details:", error);

      showNotification(
        "error",
        "Loading Failed",
        error.message ||
          "An error occurred while loading quiz details. Please try again later."
      );
    });
}

async function fetchDashboardStatsAndUpdateUI() {
  const accessToken =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken") ||
    "";
  if (!accessToken) return;

  try {
    const response = await fetch(
      "http://web.practicesnow.com/api/v1/quiz/dashboard",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const result = await response.json();
    if (result.ok === 1 && result.data) {
      document.getElementById("dashboard-total-quizzes").textContent =
        result.data.total_quizzes;

      let lastActivity = result.data.latest_quiz_time;
      if (!lastActivity || lastActivity === 0) {
        lastActivity = "No activity";
      } else {
        const date = new Date(lastActivity * 1000);
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        lastActivity = `${y}/${m}/${d}`;
      }
      document.getElementById("dashboard-last-activity").textContent =
        lastActivity;

      document.getElementById("dashboard-favorites").textContent =
        result.data.total_favorites;
    }
  } catch (e) {
    console.error("Failed to fetch dashboard stats", e);
  }
}

// 显示历史测验内容
function displayHistoryQuiz(quizData) {
  // 更新预览标题
  document.getElementById("preview-title").textContent = `${
    quizData.grade_level
  } ${quizData.subject} ${
    quizData.make_comprehensive_test ? "Comprehensive Test" : "Quiz"
  }`;

  // 更新日期
  const createdDate = new Date(quizData.created_at);
  document.getElementById("preview-date").textContent = formatDate(createdDate);

  // 创建问题和答案容器
  const container = document.getElementById("questions-container");
  container.innerHTML = "";

  // 创建问题容器
  const questionsDiv = document.createElement("div");
  questionsDiv.className = "generated-questions";
  questionsDiv.innerHTML = quizData.question;

  // 创建答案容器（默认隐藏）
  const answersDiv = document.createElement("div");
  answersDiv.className = "question-answer";
  answersDiv.style.display = "none";
  answersDiv.innerHTML = quizData.answer;

  // 添加到容器
  container.appendChild(questionsDiv);
  container.appendChild(answersDiv);

  // 隐藏占位符和加载指示器，显示内容
  document.getElementById("preview-placeholder").style.display = "none";
  document.getElementById("loading-indicator").style.display = "none";
  document.getElementById("preview-content").style.display = "block";

  // 重置答案显示状态
  showingAnswers = false;
  document.getElementById("toggle-answers").innerHTML =
    '<i class="fas fa-eye me-1"></i> Show Answers';
}

// 收藏/取消收藏测验
function toggleFavorite(quizId, makeFavorite) {
  // 获取访问令牌
  const accessToken =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken") ||
    "";

  // 准备请求体数据
  const requestBody = {
    quiz_id: quizId,
    is_favorite: makeFavorite,
  };

  // 显示加载中状态
  const button = document.querySelector(
    `.toggle-favorite-btn[data-quiz-id="${quizId}"]`
  );
  if (button) {
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML =
      '<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> Loading...';
  }

  // 调用API
  fetch("http://web.practicesnow.com/api/v1/quiz/favorite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      const isSuccess = response.status >= 200 && response.status < 300;
      return response.json().then((data) => {
        return { isSuccess, data, status: response.status };
      });
    })
    .then((result) => {
      if (result.isSuccess && result.data.ok === 1) {
        // 更新按钮状态
        if (button) {
          button.disabled = false;
          button.setAttribute("data-is-favorite", makeFavorite);
          button.innerHTML = `<i class="fas ${
            makeFavorite ? "fa-star" : "fa-star-o"
          } me-1"></i> ${makeFavorite ? "Unfavorite" : "Favorite"}`;
        }

        // 更新本地数据中的收藏状态
        const itemIndex = allHistoryItems.findIndex(
          (item) => item.id == quizId
        );
        if (itemIndex !== -1) {
          allHistoryItems[itemIndex].is_favorite = makeFavorite;
        }

        showNotification(
          "success",
          makeFavorite ? "Added to Favorites" : "Removed from Favorites",
          makeFavorite
            ? "Quiz has been added to favorites"
            : "Quiz has been removed from favorites"
        );
      } else {
        // 恢复按钮状态
        if (button) {
          button.disabled = false;
          button.innerHTML = `<i class="fas ${
            !makeFavorite ? "fa-star" : "fa-star-o"
          } me-1"></i> ${!makeFavorite ? "Unfavorite" : "Favorite"}`;
        }

        throw new Error(
          result.data.message ||
            (makeFavorite
              ? "Failed to add to favorites"
              : "Failed to remove from favorites")
        );
      }
    })
    .catch((error) => {
      console.error(
        `Failed to ${makeFavorite ? "favorite" : "unfavorite"} quiz:`,
        error
      );

      // 恢复按钮状态
      if (button) {
        button.disabled = false;
        button.innerHTML = `<i class="fas ${
          !makeFavorite ? "fa-star" : "fa-star-o"
        } me-1"></i> ${!makeFavorite ? "Unfavorite" : "Favorite"}`;
      }

      showNotification(
        "error",
        makeFavorite ? "Favorite Failed" : "Unfavorite Failed",
        error.message || "Operation failed. Please try again later."
      );
    });
}

// 确认删除测验
function confirmDeleteQuiz(quizId) {
  // 使用Bootstrap模态框替代原生confirm
  const deleteModal = new bootstrap.Modal(
    document.getElementById("deleteConfirmModal")
  );

  // 设置确认删除按钮的点击事件
  const confirmDeleteButton = document.getElementById("confirmDeleteButton");

  // 移除之前可能存在的事件监听器
  const newConfirmDeleteButton = confirmDeleteButton.cloneNode(true);
  confirmDeleteButton.parentNode.replaceChild(
    newConfirmDeleteButton,
    confirmDeleteButton
  );

  // 添加新的事件监听器
  newConfirmDeleteButton.addEventListener("click", function () {
    // 隐藏模态框
    deleteModal.hide();
    // 执行删除操作
    deleteQuiz(quizId);
  });

  // 显示模态框
  deleteModal.show();
}

// 删除测验
function deleteQuiz(quizId) {
  // 获取访问令牌
  const accessToken =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken") ||
    "";

  // 显示删除中状态
  const quizElement = document.querySelector(
    `.generation-history-item[data-quiz-id="${quizId}"]`
  );
  if (quizElement) {
    // 禁用删除按钮，显示加载状态
    const deleteButton = quizElement.querySelector(".delete-quiz-btn");
    if (deleteButton) {
      deleteButton.disabled = true;
      deleteButton.innerHTML =
        '<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> Deleting...';
    }
  }

  // 准备请求体
  const requestData = {
    quiz_id: quizId,
  };

  // 调用API - 使用POST方法和新接口
  fetch("http://web.practicesnow.com/api/v1/quiz/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      const isSuccess = response.status >= 200 && response.status < 300;
      return response.json().then((data) => {
        return { isSuccess, data, status: response.status };
      });
    })
    .then((result) => {
      if (result.isSuccess && result.data.ok === 1) {
        // 从列表中移除测验
        if (quizElement) {
          quizElement.remove();
        }

        // 如果列表为空，显示空状态
        const historyList = document.querySelector(".generation-history-list");
        if (historyList && historyList.children.length === 0) {
          historyList.innerHTML =
            '<div class="text-center py-5"><i class="fas fa-inbox text-muted mb-3" style="font-size: 2.5rem"></i><p>No quiz history records</p><button class="btn btn-primary" id="create-new-quiz-from-history">Create New Quiz</button></div>';

          // 添加创建新测验按钮的事件监听
          document
            .getElementById("create-new-quiz-from-history")
            .addEventListener("click", goToGenerator);
        }

        // 同样检查收藏列表中是否有该测验，如果有也移除
        const favoriteQuizElement = document.querySelector(
          `.favorites-list .generation-history-item[data-quiz-id="${quizId}"]`
        );
        if (favoriteQuizElement) {
          favoriteQuizElement.remove();

          // 如果收藏列表为空，显示空状态
          const favoritesList = document.querySelector(".favorites-list");
          if (favoritesList && favoritesList.children.length === 0) {
            favoritesList.innerHTML =
              '<div class="text-center py-5"><i class="fas fa-heart text-muted mb-3" style="font-size: 2.5rem"></i><p>No favorite quizzes found</p><button class="btn btn-primary" id="go-to-history">Browse History</button></div>';

            // 添加浏览历史记录按钮的事件监听
            document
              .getElementById("go-to-history")
              .addEventListener("click", function () {
                document
                  .querySelector('.nav-link[data-tab="generation-history"]')
                  .click();
              });
          }
        }

        // 从allHistoryItems和allFavoriteItems中移除该测验
        const historyIndex = allHistoryItems.findIndex(
          (item) => item.id == quizId
        );
        if (historyIndex !== -1) {
          allHistoryItems.splice(historyIndex, 1);
        }

        const favoriteIndex = allFavoriteItems.findIndex(
          (item) => item.id == quizId
        );
        if (favoriteIndex !== -1) {
          allFavoriteItems.splice(favoriteIndex, 1);
        }

        showNotification(
          "success",
          "Delete Successful",
          "Quiz has been successfully deleted"
        );
      } else {
        // 恢复删除按钮状态
        if (quizElement) {
          const deleteButton = quizElement.querySelector(".delete-quiz-btn");
          if (deleteButton) {
            deleteButton.disabled = false;
            deleteButton.innerHTML = '<i class="fas fa-trash me-1"></i> Delete';
          }
        }

        showNotification(
          "error",
          "Delete Failed",
          result.data.message ||
            "An error occurred while deleting quiz. Please try again later."
        );
      }
    })
    .catch((error) => {
      console.error("Failed to delete quiz:", error);

      // 恢复删除按钮状态
      if (quizElement) {
        const deleteButton = quizElement.querySelector(".delete-quiz-btn");
        if (deleteButton) {
          deleteButton.disabled = false;
          deleteButton.innerHTML = '<i class="fas fa-trash me-1"></i> Delete';
        }
      }

      showNotification(
        "error",
        "Delete Failed",
        error.message ||
          "An error occurred while deleting quiz. Please try again later."
      );
    });
}

// 添加搜索功能
document.addEventListener("DOMContentLoaded", function () {
  const historySearchInput = document.getElementById("history-search");
  if (historySearchInput) {
    // 使用防抖函数减少频繁搜索
    let searchTimeout;
    historySearchInput.addEventListener("input", function () {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const searchTerm = this.value.trim().toLowerCase();

        // 如果搜索词太短，不执行搜索
        if (searchTerm.length < 2 && searchTerm.length > 0) return;

        // 当输入为空时，恢复显示所有记录
        if (searchTerm.length === 0) {
          // 使用原始数据恢复显示
          renderHistoryItems(allHistoryItems);
          renderPagination(
            currentHistoryPage,
            totalHistoryPages,
            totalHistoryItems
          );
          return;
        }

        // 根据输入内容在本地进行模糊搜索
        if (searchTerm.length >= 2) {
          // 在本地进行搜索匹配
          const filteredItems = allHistoryItems.filter((item) => {
            // 在多个字段中搜索匹配项
            return (
              (item.subject &&
                item.subject.toLowerCase().includes(searchTerm)) ||
              (item.grade_level &&
                item.grade_level.toLowerCase().includes(searchTerm)) ||
              (item.difficulty_level &&
                item.difficulty_level.toLowerCase().includes(searchTerm)) ||
              (item.question &&
                item.question.toLowerCase().includes(searchTerm))
            );
          });

          // 显示筛选后的结果
          renderHistoryItems(filteredItems);

          // 更新分页信息
          const tempPagination = document.querySelector(".pagination");
          if (tempPagination) {
            // 更新信息显示
            const listInfoElement = document.createElement("div");
            listInfoElement.className =
              "pagination-info text-secondary mb-2 text-center";

            // 先移除所有可能存在的旧信息元素
            const oldInfoElements =
              document.querySelectorAll(".pagination-info");
            oldInfoElements.forEach((element) => element.remove());

            // 如果有搜索结果，显示数量信息
            if (filteredItems.length > 0) {
              listInfoElement.textContent = `Found ${filteredItems.length} matching records`;
              tempPagination.parentNode.insertBefore(
                listInfoElement,
                tempPagination
              );

              // 在搜索模式下隐藏分页控件
              tempPagination.innerHTML = "";
            } else {
              // 如果没有搜索结果
              const historyList = document.querySelector(
                ".generation-history-list"
              );
              historyList.innerHTML =
                '<div class="text-center py-5"><i class="fas fa-search text-muted mb-3" style="font-size: 2.5rem"></i><p>No matching records found</p><button class="btn btn-outline-primary" id="clear-search">Clear Search</button></div>';

              // 添加清除搜索按钮事件
              document
                .getElementById("clear-search")
                .addEventListener("click", function () {
                  historySearchInput.value = "";
                  // 恢复原始数据显示
                  renderHistoryItems(allHistoryItems);
                  renderPagination(
                    currentHistoryPage,
                    totalHistoryPages,
                    totalHistoryItems
                  );
                });

              // 隐藏分页控件
              tempPagination.innerHTML = "";
            }
          }
        }
      }, 500); // 500ms防抖延迟
    });
  }
});

// 获取收藏列表
function fetchFavorites(page = 1, pageSize = 10, searchTerm = null) {
  // 保存当前页码
  currentFavoritePage = page;

  // 显示加载状态
  const favoritesList = document.querySelector(".favorites-list");
  favoritesList.innerHTML =
    '<div class="text-center py-5"><div class="spinner-border text-primary" role="status"></div><p class="mt-3">Loading favorites...</p></div>';

  // 清空分页控件
  document.querySelector(".favorites-pagination").innerHTML = "";

  // 构建请求参数
  const requestData = {
    page: page,
    page_size: pageSize,
  };

  // 添加搜索参数（如果有）
  if (searchTerm) requestData.search = searchTerm;

  // 删除筛选参数

  // 获取访问令牌
  const accessToken =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken") ||
    "";

  // 检查令牌是否有效并且用户是否登录
  if (!accessToken || !isLoggedIn) {
    showNotification(
      "error",
      "Authentication Failed",
      "No valid login credentials found. Please login again."
    );

    // 显示空状态
    favoritesList.innerHTML =
      '<div class="text-center py-5"><i class="fas fa-exclamation-circle text-warning mb-3" style="font-size: 2.5rem"></i><p>Not logged in or session expired. Please login to view.</p><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#authModal">Login</button></div>';
    return;
  }

  // 发起请求获取收藏列表 - 使用favorite-list接口
  fetch("http://web.practicesnow.com/api/v1/quiz/favorite-list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      console.log("response-favorites", response);
      // 检查响应状态
      const isSuccess = response.status >= 200 && response.status < 300;
      return response.json().then((data) => {
        return { isSuccess, data, status: response.status };
      });
    })
    .then((result) => {
      console.log("result-favorites", result);
      if (result.isSuccess && result.data.ok === 1) {
        // 成功获取数据
        const responseData = result.data.data;

        // 保存收藏数据供本地搜索使用
        allFavoriteItems = responseData.items;
        totalFavoritePages = responseData.pages;
        totalFavoriteItems = responseData.total;

        // 显示收藏列表
        renderFavoriteItems(responseData.items);

        // 显示分页控件
        renderFavoritePagination(
          responseData.page,
          responseData.pages,
          responseData.total
        );

        // 如果没有收藏记录，显示空状态
        if (responseData.items.length === 0) {
          favoritesList.innerHTML =
            '<div class="text-center py-5"><i class="fas fa-heart text-muted mb-3" style="font-size: 2.5rem"></i><p>No favorite quizzes found</p><button class="btn btn-primary" id="go-to-history">Browse History</button></div>';

          // 添加浏览历史记录按钮的事件监听
          document
            .getElementById("go-to-history")
            .addEventListener("click", function () {
              // 切换到历史记录标签
              document
                .querySelector('.nav-link[data-tab="generation-history"]')
                .click();
            });
        }
      } else if (result.status === 401) {
        // 如果是401认证问题，尝试自动刷新登录
        refreshTokenAndRetry(() => fetchFavorites(page, pageSize, searchTerm));
      } else {
        // 处理API错误
        let errorMessage = result.data.message || "Failed to fetch favorites";

        // 其他错误
        favoritesList.innerHTML = `<div class="text-center py-5"><i class="fas fa-exclamation-triangle text-danger mb-3" style="font-size: 2.5rem"></i><p>${errorMessage}</p><button class="btn btn-outline-primary" onclick="fetchFavorites(1)">Retry</button></div>`;

        showNotification("error", "Loading Failed", errorMessage);
      }
    })
    .catch((error) => {
      console.error("Failed to fetch favorites:", error);

      // 显示错误状态
      favoritesList.innerHTML =
        '<div class="text-center py-5"><i class="fas fa-exclamation-triangle text-danger mb-3" style="font-size: 2.5rem"></i><p>Loading failed. Please check your network connection.</p><button class="btn btn-outline-primary" onclick="fetchFavorites(1)">Retry</button></div>';

      showNotification(
        "error",
        "Loading Failed",
        "An error occurred while fetching favorites. Please try again later."
      );
    });
}

// 渲染收藏列表项
function renderFavoriteItems(items) {
  const favoritesList = document.querySelector(".favorites-list");
  favoritesList.innerHTML = "";

  items.forEach((item) => {
    // 格式化创建时间
    const createdDate = new Date(item.created_at);
    const formattedDate = formatDate(createdDate);

    // 解析问题类型数组
    let questionTypes = [];
    try {
      questionTypes = JSON.parse(item.question_types);
    } catch (e) {
      console.error("Error parsing question types:", e);
    }

    // 创建收藏项 HTML
    const favoriteItemHtml = `
              <div class="generation-history-item" data-quiz-id="${item.id}">
                <div class="generation-history-header">
                  <h5 class="generation-history-title">
                    ${item.grade_level} ${item.subject} ${
      item.make_comprehensive_test ? "Comprehensive Test" : "Quiz"
    }
                  </h5>
                  <div class="generation-history-date">
                    ${formattedDate}
                  </div>
                </div>
                <div class="generation-history-meta">
                  <span class="generation-history-tag">${
                    item.grade_level
                  }</span>
                  <span class="generation-history-tag">${item.subject}</span>
                  <span class="generation-history-tag">${
                    item.number_of_questions
                  } ${
      item.number_of_questions > 1 ? "Questions" : "Question"
    }</span>
                  <span class="generation-history-tag">${
                    item.difficulty_level.charAt(0).toUpperCase() +
                    item.difficulty_level.slice(1)
                  }</span>
                  ${
                    item.make_comprehensive_test
                      ? '<span class="generation-history-tag bg-warning">Comprehensive</span>'
                      : ""
                  }
                </div>
                <div class="generation-history-preview">
                  ${extractPreview(item.question, 150)}
                </div>
                <div class="d-flex justify-content-end">
                  <button class="btn btn-sm btn-outline-primary me-2 view-quiz-btn" data-quiz-id="${
                    item.id
                  }">
                    <i class="fas fa-eye me-1"></i> View
                  </button>
                  <button class="btn btn-sm btn-outline-danger unfavorite-btn" data-quiz-id="${
                    item.id
                  }">
                    <i class="fas fa-star me-1"></i> Remove
                  </button>
                </div>
              </div>
            `;

    favoritesList.innerHTML += favoriteItemHtml;
  });

  // 添加事件监听器
  document.querySelectorAll(".favorites-list .view-quiz-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const quizId = this.getAttribute("data-quiz-id");
      viewQuiz(quizId);
    });
  });

  document
    .querySelectorAll(".favorites-list .unfavorite-btn")
    .forEach((btn) => {
      btn.addEventListener("click", function () {
        const quizId = this.getAttribute("data-quiz-id");
        toggleFavorite(quizId, false);

        // 移除该项从收藏列表
        this.closest(".generation-history-item").remove();

        // 检查是否收藏列表为空
        if (document.querySelector(".favorites-list").children.length === 0) {
          document.querySelector(".favorites-list").innerHTML =
            '<div class="text-center py-5"><i class="fas fa-heart text-muted mb-3" style="font-size: 2.5rem"></i><p>No favorite quizzes found</p><button class="btn btn-primary" id="go-to-history">Browse History</button></div>';

          // 添加浏览历史记录按钮的事件监听
          document
            .getElementById("go-to-history")
            .addEventListener("click", function () {
              document
                .querySelector('.nav-link[data-tab="generation-history"]')
                .click();
            });
        }
      });
    });
}

// 渲染收藏分页控件
function renderFavoritePagination(currentPage, totalPages, totalItems) {
  const paginationElement = document.querySelector(".favorites-pagination");

  if (!paginationElement) return;

  // 清空分页控件
  paginationElement.innerHTML = "";

  // 删除显示总条数的代码
  // 移除所有可能存在的旧信息元素
  const oldInfoElements = document.querySelectorAll(".pagination-info");
  oldInfoElements.forEach((element) => element.remove());

  // 上一页按钮
  const prevItem = document.createElement("li");
  prevItem.className = `page-item ${currentPage <= 1 ? "disabled" : ""}`;

  const prevLink = document.createElement("a");
  prevLink.className = "page-link";
  prevLink.href = "#";
  prevLink.textContent = "Previous";
  prevLink.setAttribute("aria-label", "Previous");

  if (currentPage > 1) {
    prevLink.addEventListener("click", function (e) {
      e.preventDefault();
      fetchFavorites(currentPage - 1);
    });
  }

  prevItem.appendChild(prevLink);
  paginationElement.appendChild(prevItem);

  // 页码按钮
  const maxButtons = 5; // 最多显示5个页码按钮
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  // 调整startPage，确保显示足够的页码按钮
  if (endPage - startPage + 1 < maxButtons && startPage > 1) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  // 添加第一页按钮（如果不在可见范围内）
  if (startPage > 1) {
    const firstItem = document.createElement("li");
    firstItem.className = "page-item";

    const firstLink = document.createElement("a");
    firstLink.className = "page-link";
    firstLink.href = "#";
    firstLink.textContent = "1";

    firstLink.addEventListener("click", function (e) {
      e.preventDefault();
      fetchFavorites(1);
    });

    firstItem.appendChild(firstLink);
    paginationElement.appendChild(firstItem);

    // 添加省略号（如果不是紧挨着第一页）
    if (startPage > 2) {
      const ellipsisItem = document.createElement("li");
      ellipsisItem.className = "page-item disabled";

      const ellipsisLink = document.createElement("a");
      ellipsisLink.className = "page-link";
      ellipsisLink.textContent = "...";

      ellipsisItem.appendChild(ellipsisLink);
      paginationElement.appendChild(ellipsisItem);
    }
  }

  // 添加中间的页码按钮
  for (let i = startPage; i <= endPage; i++) {
    const pageItem = document.createElement("li");
    pageItem.className = `page-item ${i === currentPage ? "active" : ""}`;

    const pageLink = document.createElement("a");
    pageLink.className = "page-link";
    pageLink.href = "#";
    pageLink.textContent = i;

    if (i !== currentPage) {
      pageLink.addEventListener("click", function (e) {
        e.preventDefault();
        fetchFavorites(i);
      });
    }

    pageItem.appendChild(pageLink);
    paginationElement.appendChild(pageItem);
  }

  // 添加最后一页按钮（如果不在可见范围内）
  if (endPage < totalPages) {
    // 添加省略号（如果不是紧挨着最后一页）
    if (endPage < totalPages - 1) {
      const ellipsisItem = document.createElement("li");
      ellipsisItem.className = "page-item disabled";

      const ellipsisLink = document.createElement("a");
      ellipsisLink.className = "page-link";
      ellipsisLink.textContent = "...";

      ellipsisItem.appendChild(ellipsisLink);
      paginationElement.appendChild(ellipsisItem);
    }

    const lastItem = document.createElement("li");
    lastItem.className = "page-item";

    const lastLink = document.createElement("a");
    lastLink.className = "page-link";
    lastLink.href = "#";
    lastLink.textContent = totalPages;

    lastLink.addEventListener("click", function (e) {
      e.preventDefault();
      fetchFavorites(totalPages);
    });

    lastItem.appendChild(lastLink);
    paginationElement.appendChild(lastItem);
  }

  // 下一页按钮
  const nextItem = document.createElement("li");
  nextItem.className = `page-item ${
    currentPage >= totalPages ? "disabled" : ""
  }`;

  const nextLink = document.createElement("a");
  nextLink.className = "page-link";
  nextLink.href = "#";
  nextLink.textContent = "Next";
  nextLink.setAttribute("aria-label", "Next");

  if (currentPage < totalPages) {
    nextLink.addEventListener("click", function (e) {
      e.preventDefault();
      fetchFavorites(currentPage + 1);
    });
  }

  nextItem.appendChild(nextLink);
  paginationElement.appendChild(nextItem);
}

// 添加收藏搜索功能
document.addEventListener("DOMContentLoaded", function () {
  // 已有的历史记录搜索功能...

  // 删除筛选按钮事件监听

  // 收藏搜索功能
  const favoritesSearchInput = document.getElementById("favorites-search");
  if (favoritesSearchInput) {
    // 使用防抖函数减少频繁搜索
    let searchTimeout;
    favoritesSearchInput.addEventListener("input", function () {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const searchTerm = this.value.trim().toLowerCase();

        // 如果搜索词太短，不执行搜索
        if (searchTerm.length < 2 && searchTerm.length > 0) return;

        // 当输入为空时，恢复显示所有记录
        if (searchTerm.length === 0) {
          // 使用原始数据恢复显示
          renderFavoriteItems(allFavoriteItems);
          renderFavoritePagination(
            currentFavoritePage,
            totalFavoritePages,
            totalFavoriteItems
          );
          return;
        }

        // 根据输入内容在本地进行模糊搜索
        if (searchTerm.length >= 2) {
          // 在本地进行搜索匹配
          const filteredItems = allFavoriteItems.filter((item) => {
            // 在多个字段中搜索匹配项
            return (
              (item.subject &&
                item.subject.toLowerCase().includes(searchTerm)) ||
              (item.grade_level &&
                item.grade_level.toLowerCase().includes(searchTerm)) ||
              (item.difficulty_level &&
                item.difficulty_level.toLowerCase().includes(searchTerm)) ||
              (item.question &&
                item.question.toLowerCase().includes(searchTerm))
            );
          });

          // 显示筛选后的结果
          renderFavoriteItems(filteredItems);

          // 更新分页信息
          const tempPagination = document.querySelector(
            ".favorites-pagination"
          );
          if (tempPagination) {
            // 移除所有信息元素
            const oldInfoElements =
              document.querySelectorAll(".pagination-info");
            oldInfoElements.forEach((element) => element.remove());

            // 如果有搜索结果，不显示数量信息
            if (filteredItems.length > 0) {
              // 在搜索模式下隐藏分页控件
              tempPagination.innerHTML = "";
            } else {
              // 如果没有搜索结果
              const favoritesList = document.querySelector(".favorites-list");
              favoritesList.innerHTML =
                '<div class="text-center py-5"><i class="fas fa-search text-muted mb-3" style="font-size: 2.5rem"></i><p>No matching favorites found</p><button class="btn btn-outline-primary" id="clear-favorites-search">Clear Search</button></div>';

              // 添加清除搜索按钮事件
              document
                .getElementById("clear-favorites-search")
                .addEventListener("click", function () {
                  favoritesSearchInput.value = "";
                  // 恢复原始数据显示
                  renderFavoriteItems(allFavoriteItems);
                  renderFavoritePagination(
                    currentFavoritePage,
                    totalFavoritePages,
                    totalFavoriteItems
                  );
                });

              // 隐藏分页控件
              tempPagination.innerHTML = "";
            }
          }
        }
      }, 500); // 500ms防抖延迟
    });
  }
});

// 添加令牌刷新函数
function refreshTokenAndRetry(callback) {
  // 尝试获取刷新令牌
  const refreshToken =
    localStorage.getItem("refreshToken") ||
    sessionStorage.getItem("refreshToken") ||
    "";

  if (!refreshToken) {
    // 如果没有刷新令牌，需要重新登录
    handleSessionExpired();
    return;
  }

  // 调用刷新令牌API
  fetch("http://web.practicesnow.com/api/v1/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })
    .then((response) => {
      const isSuccess = response.status >= 200 && response.status < 300;
      return response.json().then((data) => {
        return { isSuccess, data, status: response.status };
      });
    })
    .then((result) => {
      if (result.isSuccess && result.data.ok === 1) {
        // 成功刷新令牌
        const data = result.data.data;

        // 保存新令牌
        if (localStorage.getItem("accessToken")) {
          localStorage.setItem("accessToken", data.access_token);
          localStorage.setItem("refreshToken", data.refresh_token);
        } else {
          sessionStorage.setItem("accessToken", data.access_token);
          sessionStorage.setItem("refreshToken", data.refresh_token);
        }

        // 重试原始请求
        if (typeof callback === "function") {
          callback();
        }
      } else {
        // 刷新令牌失败，需要重新登录
        handleSessionExpired();
      }
    })
    .catch((error) => {
      console.error("Token refresh failed:", error);
      handleSessionExpired();
    });
}

// 处理会话过期
function handleSessionExpired() {
  // 清除用户数据
  isLoggedIn = false;
  currentUser = null;

  // 清除本地存储的令牌
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");

  // 显示通知
  showNotification(
    "warning",
    "Session Expired",
    "Your session has expired. Please login again."
  );

  // 更新UI
  document.getElementById("auth-buttons").style.display = "flex";
  document.getElementById("user-info").style.display = "none";

  // 显示登录模态框
  const authModal = new bootstrap.Modal(document.getElementById("authModal"));
  authModal.show();
}

// 添加检测中文输入的函数
function checkChineseInput(inputElement) {
  // 检查输入是否包含中文字符
  if (/[\u4e00-\u9fa5]/.test(inputElement.value)) {
    // 如果没有警告提示，添加一个
    if (
      !inputElement.nextElementSibling ||
      !inputElement.nextElementSibling.classList.contains("text-warning")
    ) {
      const warningElement = document.createElement("small");
      warningElement.className = "text-warning d-block mt-1";
      warningElement.textContent = "Please use English characters";
      inputElement.parentNode.insertBefore(
        warningElement,
        inputElement.nextSibling
      );

      // 3秒后自动隐藏提示
      setTimeout(() => {
        if (warningElement.parentNode) {
          warningElement.parentNode.removeChild(warningElement);
        }
      }, 3000);
    }
  }
}

// ... 现有代码 ...

// PDF 导出功能
document
  .getElementById("download-pdf")
  .addEventListener("click", async function () {
    const previewContent = document.getElementById("preview-content");
    if (!previewContent || previewContent.style.display === "none") {
      showNotification(
        "warning",
        "Export Failed",
        "Please generate quiz content first"
      );
      return;
    }

    // 标题和日期
    const title =
      document.getElementById("preview-title")?.textContent || "Quiz";
    const date = document.getElementById("preview-date")?.textContent || "";

    // 题目部分
    const questions = previewContent.querySelector(".generated-questions");
    // 答案部分
    const answer = previewContent.querySelector(".question-answer");

    // 1. 生成题目页
    let exportDiv1 = document.createElement("div");
    exportDiv1.style.position = "fixed";
    exportDiv1.style.left = "-99999px";
    exportDiv1.style.top = "0";
    exportDiv1.style.width = "800px";
    exportDiv1.style.background = "#fff";
    exportDiv1.style.padding = "48px 40px 40px 40px";
    exportDiv1.style.fontFamily = "Open Sans, Arial, sans-serif";
    exportDiv1.style.color = "#222";
    exportDiv1.style.lineHeight = "1.6";
    exportDiv1.innerHTML = `
            <div style="text-align:center;">
              <div style="font-size:1.5rem;font-weight:700;margin-bottom:8px;">${title}</div>
              <div style="font-size:1rem;color:#666;margin-bottom:24px;">Generated on ${date}</div>
            </div>
          `;
    if (questions) {
      const qClone = questions.cloneNode(true);
      qClone.style.marginBottom = "32px";
      exportDiv1.appendChild(qClone);
    }
    document.body.appendChild(exportDiv1);

    // 2. 生成答案页（如果需要）
    let exportDiv2 = null;
    if (showingAnswers && answer) {
      exportDiv2 = document.createElement("div");
      exportDiv2.style.position = "fixed";
      exportDiv2.style.left = "-99999px";
      exportDiv2.style.top = "0";
      exportDiv2.style.width = "800px";
      exportDiv2.style.background = "#fff";
      exportDiv2.style.padding = "48px 40px 40px 40px";
      exportDiv2.style.fontFamily = "Open Sans, Arial, sans-serif";
      exportDiv2.style.color = "#222";
      exportDiv2.style.lineHeight = "1.6";
      // 英文标题
      exportDiv2.innerHTML = `
              <div style="text-align:center;">
                <div style="font-size:1.25rem;font-weight:700;margin-bottom:20px;">Answer Key</div>
              </div>
            `;
      const aClone = answer.cloneNode(true);
      aClone.style.display = "block";
      aClone.style.background = "none";
      aClone.style.color = "#222";
      aClone.style.fontSize = "1rem";
      aClone.style.padding = "0";
      exportDiv2.appendChild(aClone);
      document.body.appendChild(exportDiv2);
    }

    // 3. 截图并生成PDF
    try {
      // 题目页截图
      const canvas1 = await html2canvas(exportDiv1, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#fff",
      });

      // PDF参数
      const pdf = new window.jspdf.jsPDF({
        orientation: "p",
        unit: "pt",
        format: "a4",
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // 题目分页
      let renderedHeight = 0;
      let pageNum = 0;
      while (renderedHeight < canvas1.height) {
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas1.width;
        pageCanvas.height = Math.min(
          canvas1.height - renderedHeight,
          Math.round((pageHeight * canvas1.width) / pageWidth)
        );
        const ctx = pageCanvas.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(
          canvas1,
          0,
          renderedHeight,
          canvas1.width,
          pageCanvas.height,
          0,
          0,
          canvas1.width,
          pageCanvas.height
        );
        const pageData = pageCanvas.toDataURL("image/jpeg", 1.0);

        if (pageNum > 0) pdf.addPage();
        pdf.addImage(
          pageData,
          "JPEG",
          0,
          0,
          pageWidth,
          pageCanvas.height * (pageWidth / canvas1.width)
        );
        renderedHeight += pageCanvas.height;
        pageNum++;
      }

      // 答案分页
      if (exportDiv2) {
        const canvas2 = await html2canvas(exportDiv2, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#fff",
        });
        renderedHeight = 0;
        pageNum = 0;
        while (renderedHeight < canvas2.height) {
          pdf.addPage();
          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = canvas2.width;
          pageCanvas.height = Math.min(
            canvas2.height - renderedHeight,
            Math.round((pageHeight * canvas2.width) / pageWidth)
          );
          const ctx = pageCanvas.getContext("2d");
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          ctx.drawImage(
            canvas2,
            0,
            renderedHeight,
            canvas2.width,
            pageCanvas.height,
            0,
            0,
            canvas2.width,
            pageCanvas.height
          );
          const pageData = pageCanvas.toDataURL("image/jpeg", 1.0);

          pdf.addImage(
            pageData,
            "JPEG",
            0,
            0,
            pageWidth,
            pageCanvas.height * (pageWidth / canvas2.width)
          );
          renderedHeight += pageCanvas.height;
          pageNum++;
        }
      }

      pdf.save(`${title}.pdf`);
    } catch (err) {
      showNotification(
        "error",
        "Export Failed",
        "PDF generation failed, please try again"
      );
    } finally {
      exportDiv1.remove();
      if (exportDiv2) exportDiv2.remove();
    }
  });

document.getElementById("download-word").addEventListener("click", function () {
  const previewContent = document.getElementById("preview-content");
  if (!previewContent || previewContent.style.display === "none") {
    showNotification(
      "warning",
      "Export Failed",
      "Please generate quiz content first"
    );
    return;
  }

  // 标题和日期
  const title = document.getElementById("preview-title")?.textContent || "Quiz";
  const date = document.getElementById("preview-date")?.textContent || "";

  // 题目部分
  const questions = previewContent.querySelector(".generated-questions");
  // 答案部分
  const answer = previewContent.querySelector(".question-answer");

  // 构建Word内容
  let wordHtml = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office'
                  xmlns:w='urn:schemas-microsoft-com:office:word'
                  xmlns='http://www.w3.org/TR/REC-html40'>
            <head>
              <meta charset='utf-8'>
              <title>${title}</title>
              <style>
                body { font-family: "Open Sans", Arial, sans-serif; color: #222; line-height: 1.6; }
                .word-title { text-align: center; font-size: 1.5rem; font-weight: 700; margin-bottom: 8px; }
                .word-date { text-align: center; font-size: 1rem; color: #666; margin-bottom: 24px; }
                .word-questions { margin-bottom: 32px; }
                .word-answer-title { text-align: center; font-size: 1.25rem; font-weight: 700; margin-bottom: 20px; }
                .word-answer { }
                /* 兼容性分页 */
                .page-break { page-break-before: always; mso-break-type: section-break; }
              </style>
            </head>
            <body>
              <div class="word-title">${title}</div>
              <div class="word-date">Generated on ${date}</div>
              <div class="word-questions">
                ${questions ? questions.innerHTML : ""}
              </div>
          `;

  // 答案区
  if (showingAnswers && answer) {
    // 插入标准分页符（Word专用）
    wordHtml += `
              <div class="page-break"></div>
              <div class="word-answer-title">Answer Key</div>
              <div class="word-answer">
                ${answer.innerHTML}
              </div>
            `;
  }

  wordHtml += `
            </body>
            </html>
          `;

  // 创建Blob并下载
  const blob = new Blob(["\ufeff", wordHtml], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title}.doc`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
});

function viewQuiz(quizId) {
  // 1. 在本地历史和收藏数组中查找
  let quizData = allHistoryItems.find((item) => item.id == quizId);
  if (!quizData) {
    quizData = allFavoriteItems.find((item) => item.id == quizId);
  }
  if (!quizData) {
    showNotification(
      "error",
      "Data Not Found",
      "Unable to find the quiz record."
    );
    return;
  }

  // 2. 构建内容
  const title = `${quizData.grade_level} ${quizData.subject} ${
    quizData.make_comprehensive_test ? "Comprehensive Test" : "Quiz"
  }`;
  const date = quizData.created_at
    ? new Date(quizData.created_at).toLocaleString()
    : "";
  const questionHtml = quizData.question || "";
  const answerHtml = quizData.answer || "";

  // 3. 填充模态框
  const body = document.getElementById("quiz-detail-body");
  body.innerHTML = `
            <div style="text-align:center;">
              <div style="font-size:1.5rem;font-weight:700;margin-bottom:8px;">${title}</div>
              <div style="font-size:1rem;color:#666;margin-bottom:24px;">${date}</div>
            </div>
            <div id="quiz-detail-question" style="margin-bottom:32px;">
              ${questionHtml}
            </div>
            <div id="quiz-detail-answer" style="display:none; margin-top:24px; background:#f8f9fa; border-radius:6px; padding:20px;">
              <div style="font-size:1.1rem;font-weight:600;margin-bottom:12px;">Answer Key</div>
              ${answerHtml}
            </div>
          `;

  // 4. 答案显示/隐藏逻辑
  let answerVisible = false;
  const answerDiv = document.getElementById("quiz-detail-answer");
  const toggleBtn = document.getElementById("quiz-detail-toggle-answer");
  toggleBtn.innerHTML = `<i class="fas fa-eye me-1"></i> Show Answer`;

  toggleBtn.onclick = function () {
    answerVisible = !answerVisible;
    if (answerVisible) {
      answerDiv.style.display = "block";
      toggleBtn.innerHTML = `<i class="fas fa-eye-slash me-1"></i> Hide Answer`;
    } else {
      answerDiv.style.display = "none";
      toggleBtn.innerHTML = `<i class="fas fa-eye me-1"></i> Show Answer`;
    }
  };

  // 5. 打开模态框
  const modal = new bootstrap.Modal(document.getElementById("quizDetailModal"));
  modal.show();
}

// 检查生成按钮状态
function checkGenerateButton() {
  const btn = document.getElementById("generate-btn");
  if (!btn) return;
  if (!isLoggedIn || currentUser.remainingGenerations <= 0) {
    btn.disabled = true;
    btn.innerText = "Out of credits, please upgrade";
  } else {
    btn.disabled = false;
    btn.innerText = "Generate";
  }
}

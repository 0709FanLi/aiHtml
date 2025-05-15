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
  isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // 如果已登录，加载用户数据
  if (isLoggedIn) {
    try {
      userData = JSON.parse(localStorage.getItem("userData") || "null");
      if (userData) {
        updateUserDisplay(userData);
      } else {
        // 数据不存在，视为未登录
        isLoggedIn = false;
        localStorage.removeItem("isLoggedIn");
      }
    } catch (e) {
      console.error("Error parsing user data:", e);
      // 数据解析错误，视为未登录
      isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");
    }
  }

  // 更新UI状态
  updateUIState();

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
  document
    .getElementById("plannerForm")
    .addEventListener("submit", generatePlan);
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

  // Get form values
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Validate agreement checkbox
  const agreement = document.getElementById("agreeTerms");
  if (!agreement.checked) {
    showNotification(
      "You must agree to the Terms of Service and Privacy Policy before logging in.",
      "warning"
    );
    return;
  }

  // Basic validation
  if (!email || !password) {
    showNotification("Please fill in all required fields.", "warning");
    return;
  }

  // Disable button to prevent multiple submissions
  const submitBtn = document.getElementById("doLoginBtn");
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';

  // Encrypt password with MD5
  const hashedPassword = md5(password);

  // Prepare request data
  const requestData = {
    email: email,
    password: hashedPassword,
  };

  // API call for login
  fetch("http://web.doaitravel.com/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Login";

      if (data.ok === 1) {
        // Login successful
        // Save user data
        userData = data.data.user;

        // Save access token and user info
        localStorage.setItem("accessToken", data.data.access_token);
        localStorage.setItem("refreshToken", data.data.refresh_token);
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("isLoggedIn", "true");

        // Update state
        isLoggedIn = true;

        // Update UI
        updateUserDisplay(userData);
        updateUIState();

        // 加载历史记录
        loadHistory();

        // Close modal
        closeModal();

        // Show success message
        showNotification("Login successful", "success");

        // Reset form
        loginForm.reset();
      } else {
        // Login failed
        showNotification(
          data.message || "Login failed. Please check your credentials.",
          "error"
        );
      }
    })
    .catch((error) => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Login";
      showNotification(
        "An error occurred during login. Please try again.",
        "error"
      );
      console.error("Login error:", error);
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

  // Get form values
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const passwordConfirm = document.getElementById(
    "signupPasswordConfirm"
  ).value;

  // Validate terms agreement
  const agreement = document.getElementById("agreeTermsSignup");
  if (!agreement.checked) {
    showNotification(
      "You must agree to the Terms of Service and Privacy Policy before signing up.",
      "warning"
    );
    return;
  }

  // Basic validation
  if (!name || !email || !password || !passwordConfirm) {
    showNotification("Please fill in all required fields.", "warning");
    return;
  }

  // Validate password match
  if (password !== passwordConfirm) {
    document.getElementById("passwordMatchError").style.display = "block";
    showNotification("Passwords do not match.", "warning");
    return;
  } else {
    document.getElementById("passwordMatchError").style.display = "none";
  }

  // Disable button to prevent multiple submissions
  const submitBtn = document.getElementById("doSignupBtn");
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing up...';

  // Encrypt password with MD5
  const hashedPassword = md5(password);

  // Prepare request data
  const requestData = {
    name: name,
    email: email,
    password: hashedPassword,
    password_confirmation: hashedPassword,
  };

  // API call for registration
  fetch("http://web.doaitravel.com/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Sign Up";

      if (data.ok === 1) {
        // Registration successful
        // Save user data
        userData = data.data.user;

        // Save access token and user info
        localStorage.setItem("accessToken", data.data.access_token);
        localStorage.setItem("refreshToken", data.data.refresh_token);
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("isLoggedIn", "true");

        // Update state
        isLoggedIn = true;

        // Update UI
        updateUserDisplay(userData);
        updateUIState();

        // Close modal
        closeModal();

        // Show success message
        showNotification("Account created successfully", "success");

        // Reset form
        signupForm.reset();
      } else {
        // Registration failed
        showNotification(
          data.message || "Registration failed. Please try again.",
          "error"
        );
      }
    })
    .catch((error) => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Sign Up";
      showNotification(
        "An error occurred during registration. Please try again.",
        "error"
      );
      console.error("Registration error:", error);
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

  // Check if user is logged in and has credits
  if (isLoggedIn) {
    if (userData && userData.credits < 1) {
      showToast(
        "You don't have enough credits. Please purchase a plan to continue.",
        "error"
      );
      document.getElementById("pricing").scrollIntoView({ behavior: "smooth" });
      return;
    }
  } else {
    // For non-logged in users
    if (usageCount >= 1) {
      showToast(
        "Free usage limit reached. Please sign up to continue.",
        "error"
      );
      openSignupModal();
      return;
    }
  }

  // Get form values
  const location = document.getElementById("location").value;
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;
  const travelers = document.getElementById("travelers").value;

  // Basic validation
  if (!location || !startTime || !endTime || !travelers) {
    showToast("Please fill in all fields", "error");
    return;
  }

  // Show loader, hide results
  planLoader.classList.add("active");
  results.classList.remove("active");

  // Increment usage count for non-logged in users
  if (!isLoggedIn) {
    usageCount++;
    localStorage.setItem("usageCount", usageCount);
  } else {
    // Decrement credits for logged-in users
    userData.credits--;
    localStorage.setItem("userData", JSON.stringify(userData));
    updateUserDisplay(userData);
  }

  // Simulate API call to generate plan
  setTimeout(() => {
    // Hide loader, show results
    planLoader.classList.remove("active");
    results.classList.add("active");

    // Update plan details
    planTitle.textContent = `Your Perfect Day in ${location}`;
    planLocation.textContent = location;
    planTime.textContent = `${formatTime(startTime)} - ${formatTime(endTime)}`;
    planPeople.textContent = `${travelers} ${
      travelers == 1 ? "Traveler" : "Travelers"
    }`;

    // Generate and display timeline
    const plan = generateTimelinePlan(location, startTime, endTime, travelers);
    displayTimelinePlan(plan);

    // Save current plan
    currentPlan = {
      id: Date.now(),
      title: `Your Perfect Day in ${location}`,
      location: location,
      startTime: startTime,
      endTime: endTime,
      travelers: parseInt(travelers),
      date: new Date().toISOString().split("T")[0],
      timeline: plan,
    };

    // Add to history if logged in
    if (isLoggedIn) {
      addToHistory(currentPlan);
    }

    // Scroll to results
    results.scrollIntoView({ behavior: "smooth", block: "start" });

    // Show success message
    showToast("Travel plan generated successfully!", "success");
  }, 2000);
}

// Format time (e.g., "14:30" to "2:30 PM")
function formatTime(timeString) {
  const [hours, minutes] = timeString.split(":");
  let hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12; // Convert 0 to 12
  return `${hour}:${minutes} ${ampm}`;
}

// Generate Timeline Plan (Simulated AI response)
function generateTimelinePlan(location, startTime, endTime, travelers) {
  // Parse start and end times to calculate duration
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);

  // If end time is earlier than start time, assume it's the next day
  if (end < start) {
    end.setDate(end.getDate() + 1);
  }

  const durationHours = (end - start) / (1000 * 60 * 60);

  // Generate different plans based on location and duration
  let activities = [];

  // This would normally be AI-generated but we'll use predefined data for demo
  if (location.toLowerCase().includes("paris")) {
    activities = [
      {
        time: addHours(start, 0),
        title: "Breakfast at a Local Café",
        description:
          "Start your day with fresh croissants and coffee at a charming Parisian café.",
      },
      {
        time: addHours(start, 1.5),
        title: "Visit the Eiffel Tower",
        description:
          "Experience breathtaking views of Paris from the iconic Eiffel Tower.",
      },
      {
        time: addHours(start, 3.5),
        title: "Lunch at a Bistro",
        description:
          "Enjoy a classic French lunch with wine at a traditional bistro.",
      },
      {
        time: addHours(start, 5),
        title: "Louvre Museum",
        description:
          "Explore world-famous art collections including the Mona Lisa.",
      },
      {
        time: addHours(start, 7.5),
        title: "Seine River Cruise",
        description: "Relax on a scenic boat tour along the Seine River.",
      },
    ];
  } else if (
    location.toLowerCase().includes("new york") ||
    location.toLowerCase().includes("nyc")
  ) {
    activities = [
      {
        time: addHours(start, 0),
        title: "Breakfast at a Deli",
        description:
          "Start with a classic New York bagel and coffee at a local deli.",
      },
      {
        time: addHours(start, 1.5),
        title: "Visit Times Square",
        description:
          "Experience the energy and bright lights of this iconic location.",
      },
      {
        time: addHours(start, 3),
        title: "Lunch in Little Italy",
        description:
          "Enjoy authentic Italian cuisine in this historic neighborhood.",
      },
      {
        time: addHours(start, 4.5),
        title: "Central Park Stroll",
        description:
          "Take a relaxing walk through the urban oasis of Central Park.",
      },
      {
        time: addHours(start, 6.5),
        title: "Empire State Building",
        description:
          "Take in spectacular views of the city from this famous skyscraper.",
      },
    ];
  } else if (location.toLowerCase().includes("tokyo")) {
    activities = [
      {
        time: addHours(start, 0),
        title: "Breakfast at Tsukiji Outer Market",
        description:
          "Try fresh Japanese breakfast items at this famous food market.",
      },
      {
        time: addHours(start, 1.5),
        title: "Visit Senso-ji Temple",
        description:
          "Explore Tokyo's oldest and most significant Buddhist temple.",
      },
      {
        time: addHours(start, 3),
        title: "Lunch at a Ramen Shop",
        description:
          "Savor authentic Japanese ramen at a local specialty shop.",
      },
      {
        time: addHours(start, 4.5),
        title: "Shopping in Shibuya",
        description:
          "Experience the famous Shibuya Crossing and shop at trendy stores.",
      },
      {
        time: addHours(start, 6.5),
        title: "Tokyo Skytree",
        description:
          "Enjoy panoramic views of Tokyo from one of the world's tallest towers.",
      },
    ];
  } else {
    // Generic plan for any location
    activities = [
      {
        time: addHours(start, 0),
        title: "Breakfast Experience",
        description: `Start your day with local breakfast specialties in ${location}.`,
      },
      {
        time: addHours(start, 1.5),
        title: "Morning Exploration",
        description: `Visit the top attractions in ${location} during the less crowded morning hours.`,
      },
      {
        time: addHours(start, 3.5),
        title: "Local Lunch",
        description: `Taste authentic local cuisine at a highly-rated restaurant in ${location}.`,
      },
      {
        time: addHours(start, 5),
        title: "Afternoon Activity",
        description: `Experience unique cultural or recreational activities in ${location}.`,
      },
      {
        time: addHours(start, 7),
        title: "Evening Entertainment",
        description: `End your day with local entertainment options in ${location}.`,
      },
    ];
  }

  // Ensure activities fit within the time range
  return activities.filter((activity) => activity.time <= end);
}

// Add hours to a date
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
    showToast("Please log in to purchase a plan", "error");
    openLoginModal();
    return;
  }

  // In a real app, this would redirect to a payment processor
  // For demo purposes, we'll just show a success message

  let planName, credits;
  switch (plan) {
    case "basic":
      planName = "Basic Plan";
      credits = 3;
      break;
    case "standard":
      planName = "Standard Plan";
      credits = 8;
      break;
    case "monthly":
      planName = "Monthly Subscription";
      credits = 30;
      break;
    case "annual":
      planName = "Annual Subscription";
      credits = 500;
      break;
  }

  showToast(
    `Thank you for purchasing the ${planName}! ${credits} credits added.`,
    "success"
  );
}

// Show Toast Notification
function showToast(message, type = "success") {
  const toastMessage = document.getElementById("toastMessage");
  toastMessage.textContent = message;

  // Set icon based on type
  const toastIcon = toast.querySelector("i");
  if (type === "success") {
    toastIcon.className = "fas fa-check-circle";
    toast.className = "toast success";
  } else {
    toastIcon.className = "fas fa-exclamation-circle";
    toast.className = "toast error";
  }

  // Show toast
  toast.classList.add("active");

  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("active");
  }, 3000);
}

// 添加通知函数
function showNotification(message, type = "success", duration = 3000) {
  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notificationMessage");
  notificationMessage.textContent = message;

  // 设置图标样式
  const notificationIcon = notification.querySelector("i");
  if (type === "success") {
    notificationIcon.className = "fas fa-check-circle";
    notification.className = "toast success";
  } else if (type === "warning") {
    notificationIcon.className = "fas fa-exclamation-triangle";
    notification.className = "toast warning";
  } else {
    notificationIcon.className = "fas fa-exclamation-circle";
    notification.className = "toast error";
  }

  // 显示通知
  notification.style.display = "flex";
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // 自动关闭
  if (duration > 0) {
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.style.display = "none";
      }, 300);
    }, duration);
  }
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

// 添加注册事件处理
document.addEventListener("DOMContentLoaded", function () {
  // 登录表单提交事件处理
  const loginBtn = document.getElementById("doLoginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const agreement = document.getElementById("agreeTerms");
      if (agreement && !agreement.checked) {
        showNotification(
          "You must agree to the Terms of Service and Privacy Policy before logging in.",
          "warning"
        );
        return;
      }

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      if (!email || !password) {
        showNotification("Please fill in all required fields.", "warning");
        return;
      }

      const submitBtn = document.getElementById("doLoginBtn");
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Logging in...";

      // md5加密
      const md5Password = md5(password);
      const requestData = {
        email: email,
        password: md5Password,
      };

      fetch("http://web.doaitravel.com/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
        credentials: "omit",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((data) => {
              throw new Error(data.message || "Login failed");
            });
          }
        })
        .then((data) => {
          showNotification("Login successful!", "success");

          // 保存用户数据和令牌
          if (data && data.data) {
            const userData = data.data.user || {};
            const loginInfo = {
              access_token: data.data.access_token,
              refresh_token: data.data.refresh_token,
              token_type: data.data.token_type,
              access_token_expires: data.data.access_token_expires,
              refresh_token_expires: data.data.refresh_token_expires,
              user: {
                id: userData.id,
                name: userData.name || userData.email || "",
                email: userData.email || "",
                created_at: userData.created_at,
                last_login_at: userData.last_login_at,
                access_token: data.data.access_token,
                refresh_token: data.data.refresh_token,
              },
            };

            localStorage.setItem("tripWeaverUser", JSON.stringify(loginInfo));

            // 更新登录状态
            isLoggedIn = true;
            document.body.classList.remove("logged-out");
            document.body.classList.add("logged-in");

            // 关闭模态框
            authModal.classList.remove("active");

            // 加载历史记录
            loadHistory();
          }
        })
        .catch((error) => {
          showNotification("Login error: " + error.message, "error", 4000);
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        });
    });
  }

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

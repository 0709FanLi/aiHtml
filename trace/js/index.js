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
let activeModal = null;
let sourceElement = null;

// App State
let isLoggedIn = false;
let usageCount = 0;
let currentPlan = null;
let history = [];

// Sample Data for History
const sampleHistory = [
  {
    id: 1,
    title: "A Day in New York City",
    location: "New York, USA",
    startTime: "09:00",
    endTime: "18:00",
    travelers: 2,
    date: "2023-05-15",
  },
  {
    id: 2,
    title: "Tokyo Adventure",
    location: "Tokyo, Japan",
    startTime: "10:00",
    endTime: "20:00",
    travelers: 1,
    date: "2023-04-22",
  },
  {
    id: 3,
    title: "Romantic Paris Getaway",
    location: "Paris, France",
    startTime: "11:00",
    endTime: "22:00",
    travelers: 2,
    date: "2023-03-10",
  },
];

// Event Listeners
window.addEventListener("DOMContentLoaded", initApp);
menuToggle.addEventListener("click", toggleMenu);
loginBtn.addEventListener("click", openLoginModal);
signupBtn.addEventListener("click", openSignupModal);
closeAuthModal.addEventListener("click", closeModal);
switchToSignup.addEventListener("click", switchToSignupForm);
switchToLogin.addEventListener("click", switchToLoginForm);
loginForm.addEventListener("submit", handleLogin);
signupForm.addEventListener("submit", handleSignup);
plannerForm.addEventListener("submit", generatePlan);
logoutBtn.addEventListener("click", handleLogout);
downloadPlan.addEventListener("click", handleDownloadPlan);
sharePlan.addEventListener("click", handleSharePlan);
showTermsLogin.addEventListener("click", (e) => showTerms(e, "login"));
showPrivacyLogin.addEventListener("click", (e) => showPrivacy(e, "login"));
showTermsSignup.addEventListener("click", (e) => showTerms(e, "signup"));
showPrivacySignup.addEventListener("click", (e) => showPrivacy(e, "signup"));
closeTermsModal.addEventListener("click", closeTerms);
closePrivacyModal.addEventListener("click", closePrivacy);
acceptTerms.addEventListener("click", handleAcceptTerms);
acceptPrivacy.addEventListener("click", handleAcceptPrivacy);
forgotPassword.addEventListener("click", showForgotPassword);
backToLogin.addEventListener("click", backToLoginForm);
requestCodeBtn.addEventListener("click", requestVerificationCode);
forgotPasswordForm.addEventListener("submit", resetPassword);

footerTerms.addEventListener("click", (e) => showTerms(e, "footer"));
footerPrivacy.addEventListener("click", (e) => showPrivacy(e, "footer"));
showTermsLogin.addEventListener("click", (e) => showTerms(e, "login"));
showPrivacyLogin.addEventListener("click", (e) => showPrivacy(e, "login"));

buyPlanButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const plan = button.getAttribute("data-plan");
    handleBuyPlan(plan);
  });
});

// Initialize App
function initApp() {
  // Check if user is logged in (using local storage in this demo)
  const savedLogin = localStorage.getItem("isLoggedIn");
  if (savedLogin === "true") {
    isLoggedIn = true;
    document.body.classList.remove("logged-out");
    document.body.classList.add("logged-in");

    // Load history
    loadHistory();

    // Load usage count
    const savedUsage = localStorage.getItem("usageCount");
    if (savedUsage) {
      usageCount = parseInt(savedUsage);
    }
  }

  // Animate elements when they come into view
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

  // Clear previous errors
  clearFormErrors(loginForm);

  // Get form values
  const email = document.getElementById("loginEmail");
  const password = document.getElementById("loginPassword");
  const agreeTerms = document.getElementById("agreeTerms");

  // Validate form
  let isValid = true;

  if (!email.value || !isValidEmail(email.value)) {
    showError(email, "loginEmailError");
    isValid = false;
  }

  if (!password.value) {
    showError(password, "loginPasswordError");
    isValid = false;
  }

  if (!agreeTerms.checked) {
    showToast(
      "You must agree to the Terms of Service and Privacy Policy",
      "error"
    );
    isValid = false;
  }

  if (!isValid) return;

  // Simulate login API call
  setTimeout(() => {
    // Success - in a real app, this would check credentials with a server
    isLoggedIn = true;
    usageCount = 0; // Reset usage count for demo

    // Save login state to local storage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("usageCount", usageCount);

    // Update UI
    document.body.classList.remove("logged-out");
    document.body.classList.add("logged-in");

    // Load history
    loadHistory();

    // Close modal
    closeModal();

    // Show success message
    showToast("Logged in successfully", "success");

    // Reset form
    loginForm.reset();
  }, 1000);
}

// Handle Signup
function handleSignup(e) {
  e.preventDefault();

  // Clear previous errors
  clearFormErrors(signupForm);

  // Get form values
  const name = document.getElementById("signupName");
  const email = document.getElementById("signupEmail");
  const password = document.getElementById("signupPassword");
  const agreeTerms = document.getElementById("agreeTermsSignup");

  // Validate form
  let isValid = true;

  if (!name.value) {
    showError(name, "signupNameError");
    isValid = false;
  }

  if (!email.value || !isValidEmail(email.value)) {
    showError(email, "signupEmailError");
    isValid = false;
  }

  if (!password.value || password.value.length < 6) {
    showError(password, "signupPasswordError");
    isValid = false;
  }

  if (!agreeTerms.checked) {
    showToast(
      "You must agree to the Terms of Service and Privacy Policy",
      "error"
    );
    isValid = false;
  }

  if (!isValid) return;

  // Simulate signup API call
  setTimeout(() => {
    // Success - in a real app, this would register the user with a server
    isLoggedIn = true;
    usageCount = 0;

    // Save login state to local storage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("usageCount", usageCount);

    // Update UI
    document.body.classList.remove("logged-out");
    document.body.classList.add("logged-in");

    // Close modal
    closeModal();

    // Show success message
    showToast("Account created successfully", "success");

    // Reset form
    signupForm.reset();
  }, 1000);
}

// Handle Logout
function handleLogout() {
  // Update state
  isLoggedIn = false;

  // Clear local storage
  localStorage.removeItem("isLoggedIn");

  // Update UI
  document.body.classList.remove("logged-in");
  document.body.classList.add("logged-out");

  // Show message
  showToast("Logged out successfully", "success");
}

// Generate Plan
function generatePlan(e) {
  e.preventDefault();

  // Check usage limit for non-logged in users
  if (!isLoggedIn && usageCount >= 1) {
    showToast("Free usage limit reached. Please sign up to continue.", "error");
    openSignupModal();
    return;
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

  // Increment usage count
  usageCount++;
  if (isLoggedIn) {
    localStorage.setItem("usageCount", usageCount);
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
  // In a real app, this would fetch from a server
  const savedHistory = localStorage.getItem("travelHistory");

  if (savedHistory) {
    history = JSON.parse(savedHistory);
  } else {
    // Use sample data for demo
    history = sampleHistory;
    localStorage.setItem("travelHistory", JSON.stringify(history));
  }

  // Display history
  displayHistory();

  // Show history section
  document.getElementById("history").classList.add("active");
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

  if (!email) {
    showToast("Please enter your email address", "error");
    return;
  }

  // Simulate API call to send verification code
  setTimeout(() => {
    document.getElementById("verificationCodeSection").style.display = "block";
    document.getElementById("requestCodeBtn").style.display = "none";
    showToast("Verification code sent to your email", "success");
  }, 1000);
}

// Reset Password
function resetPassword(e) {
  e.preventDefault();

  // Clear previous errors
  clearFormErrors(forgotPasswordForm);

  const email = document.getElementById("resetEmail");
  const code = document.getElementById("verificationCode");
  const newPassword = document.getElementById("newPassword");
  const confirmPassword = document.getElementById("confirmPassword");

  // Validate form
  let isValid = true;

  if (!email.value || !isValidEmail(email.value)) {
    showError(email, "resetEmailError");
    isValid = false;
  }

  if (!code.value) {
    showError(code, "verificationCodeError");
    isValid = false;
  }

  if (!newPassword.value || newPassword.value.length < 6) {
    showError(newPassword, "newPasswordError");
    isValid = false;
  }

  if (!confirmPassword.value) {
    showError(confirmPassword, "confirmPasswordError");
    isValid = false;
  } else if (newPassword.value !== confirmPassword.value) {
    showError(confirmPassword, "confirmPasswordError");
    isValid = false;
  }

  if (!isValid) return;

  // Simulate API call to reset password
  setTimeout(() => {
    // Success
    showToast("Password reset successfully", "success");
    backToLoginForm(e);
  }, 1000);
}

// Helper functions for form validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(input, errorId) {
  input.classList.add("invalid");
  document.getElementById(errorId).classList.add("active");
}

function clearFormErrors(form) {
  form.querySelectorAll(".form-control").forEach((input) => {
    input.classList.remove("invalid");
  });

  form.querySelectorAll(".error-message").forEach((error) => {
    error.classList.remove("active");
  });
}

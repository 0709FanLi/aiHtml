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

  // Loading Overlay
  loadingOverlay: document.getElementById("loadingOverlay"),

  // Dashboard
  dashboardSection: document.getElementById("dashboardSection"),
  historyCards: document.getElementById("historyCards"),
  buyCreditsBtn: document.getElementById("buyCreditsBtn"),

  // Payment Modal
  creditsAmount: document.getElementById("creditsAmount"),
  paymentConfirm: document.getElementById("paymentConfirm"),

  // History Modal
  historyTitle: document.getElementById("historyTitle"),
  historyContent: document.getElementById("historyContent"),
  historyDownload: document.getElementById("historyDownload"),

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
};

// Initialize the application
function init() {
  // Attach event listeners
  attachEventListeners();

  // Check if user is logged in (simulate with localStorage)
  checkLoginStatus();

  // Generate some fake history for logged in users
  if (state.isLoggedIn) {
    generateFakeHistory();
    renderHistoryCards();
  }
}

// Event Listeners
function attachEventListeners() {
  // Navigation
  elements.navLogin.addEventListener("click", function (e) {
    e.preventDefault();

    if (state.isLoggedIn) {
      // If already logged in, perform logout
      logout();
    } else {
      // If not logged in, show login modal
      elements.authModal.style.display = "block";
      // 确保初始显示登录模式时，显示忘记密码链接
      if (elements.authTitle.textContent === "Login") {
        document.querySelector(".forgot-password-link").style.display = "block";
      } else {
        document.querySelector(".forgot-password-link").style.display = "none";
      }
    }
  });
  elements.navDashboard.addEventListener("click", showDashboard);
  elements.navPricing.addEventListener("click", togglePricingModal);
  elements.navHome.addEventListener("click", showGenerator);
  elements.navAbout.addEventListener("click", showAbout);

  // Auth Modal
  elements.authClose.addEventListener("click", function (e) {
    e.preventDefault();

    // Close the modal
    elements.authModal.style.display = "none";

    // Reset form fields
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("agreeTerms").checked = false;
    if (document.getElementById("name")) {
      document.getElementById("name").value = "";
    }

    // Reset any error styles
    document.getElementById("email").style.borderColor = "";
  });
  elements.authForm.addEventListener("submit", handleAuth);
  elements.switchAuthMode.addEventListener("click", switchAuthMode);

  // Terms and Privacy links in auth form
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

  // Pricing Modal
  elements.pricingClose.addEventListener("click", togglePricingModal);
  document.querySelectorAll(".buy-plan").forEach((btn) => {
    btn.addEventListener("click", handlePurchase);
  });

  // Payment Modal
  elements.paymentClose.addEventListener("click", togglePaymentModal);
  elements.paymentConfirm.addEventListener("click", togglePaymentModal);

  // History Modal
  elements.historyClose.addEventListener("click", toggleHistoryModal);
  elements.historyDownload.addEventListener("click", downloadHistoryStory);

  // Privacy Policy Modal
  if (elements.privacyPolicyClose) {
    elements.privacyPolicyClose.addEventListener(
      "click",
      togglePrivacyPolicyModal
    );
  }

  // Terms of Service Modal
  if (elements.termsOfServiceClose) {
    elements.termsOfServiceClose.addEventListener(
      "click",
      toggleTermsOfServiceModal
    );
  }

  // Add click event to Privacy Policy link in footer
  const privacyPolicyLink = document.querySelector(
    ".footer-links li:nth-child(1) a"
  );
  if (privacyPolicyLink) {
    privacyPolicyLink.addEventListener("click", togglePrivacyPolicyModal);
  }

  // Add click event to Terms of Service link in footer
  const termsOfServiceLink = document.querySelector(
    ".footer-links li:nth-child(2) a"
  );
  if (termsOfServiceLink) {
    termsOfServiceLink.addEventListener("click", toggleTermsOfServiceModal);
  }

  // Story Generator
  elements.generateBtn.addEventListener("click", generateStory);
  elements.downloadBtn.addEventListener("click", downloadStory);
  elements.copyBtn.addEventListener("click", copyStory);
  elements.newStoryBtn.addEventListener("click", resetGenerator);

  // Dashboard
  elements.buyCreditsBtn.addEventListener("click", togglePricingModal);

  // Hero
  elements.startWritingBtn.addEventListener("click", scrollToGenerator);

  // Forgot Password
  elements.forgotPasswordLink.addEventListener(
    "click",
    toggleForgotPasswordModal
  );
  elements.forgotPasswordForm.addEventListener("submit", handleForgotPassword);
  elements.forgotPasswordClose.addEventListener("click", function (e) {
    e.preventDefault();

    // Close the modal
    elements.forgotPasswordModal.style.display = "none";

    // Clear the email field
    elements.resetEmail.value = "";

    // Hide success message if it was shown
    elements.resetMessage.style.display = "none";
  });
}

// Check login status (simulated)
function checkLoginStatus() {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    state.isLoggedIn = true;
    state.user = JSON.parse(savedUser);
    state.credits = state.user.credits;
    updateUIForLoggedInUser();
  } else {
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

    // Simulate registration
    state.user = {
      id: generateId(),
      name,
      email,
      credits: 5,
    };
  } else {
    // Simulate login
    state.user = {
      id: generateId(),
      name: "John Doe",
      email,
      credits: 5,
    };
  }

  // Update state and UI
  state.isLoggedIn = true;
  state.credits = state.user.credits;

  // Save to localStorage
  localStorage.setItem("user", JSON.stringify(state.user));

  // Generate fake history
  generateFakeHistory();

  // Update UI
  updateUIForLoggedInUser();
  toggleAuthModal();

  // Only show one toast message
  showToast(
    isLogin ? "Login successful!" : "Registration successful!",
    "success"
  );
}

// Logout function
function logout() {
  state.isLoggedIn = false;
  state.user = null;
  state.credits = 0;
  state.storyHistory = [];
  localStorage.removeItem("user");
  updateUIForLoggedOutUser();
  showToast("Login out successfully", "success");
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

  if (!storyType || !timePeriod || !background) {
    showToast("Please select all story options", "error");
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

  // Simulate AI generation with a delay
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
  if (!state.isLoggedIn || !state.storyHistory.length) return;

  elements.historyCards.innerHTML = "";

  state.storyHistory.forEach((story) => {
    const date = new Date(story.date);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    const card = document.createElement("div");
    card.className = "history-card";
    card.dataset.id = story.id;
    card.innerHTML = `
                <h4>${story.title}</h4>
                <div class="history-meta">
                    <span>${formattedDate}</span> | 
                    <span>${capitalizeFirst(story.type)}</span> | 
                    <span>${capitalizeFirst(story.period)}</span>
                </div>
                <div class="history-preview">${story.content.substring(
                  0,
                  150
                )}...</div>
            `;

    card.addEventListener("click", () => showHistoryDetail(story));
    elements.historyCards.appendChild(card);
  });
}

// Show history detail
function showHistoryDetail(story) {
  elements.historyTitle.textContent = story.title;
  elements.historyContent.textContent = story.content;
  elements.historyDetailModal.dataset.id = story.id;
  toggleHistoryModal();
}

// Download history story
function downloadHistoryStory() {
  const storyId = elements.historyDetailModal.dataset.id;
  const story = state.storyHistory.find((s) => s.id === storyId);

  if (!story) return;

  const title = story.title;
  const content = story.content;
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

  // Clear the email field when opening or closing
  elements.resetEmail.value = "";

  // Hide success message if it was shown
  elements.resetMessage.style.display = "none";
}

// Handle forgot password form submission
function handleForgotPassword(e) {
  e.preventDefault();
  const email = elements.resetEmail.value;
  if (!email) {
    showToast("Please enter your email", "error");
    return;
  }
  // Simulate sending reset link
  showToast("Reset link sent to your email", "success");
  // Display success message
  elements.resetMessage.style.display = "block";
}

// Elements for forgot password
elements.forgotPasswordClose.addEventListener("click", function (e) {
  e.preventDefault();

  // Close the modal
  elements.forgotPasswordModal.style.display = "none";

  // Clear the email field
  elements.resetEmail.value = "";

  // Hide success message if it was shown
  elements.resetMessage.style.display = "none";
});

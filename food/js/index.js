// Dummy database for recipes and food analysis
const recipes = [
  {
    id: 1,
    name: "Rainbow Vegetable Salad",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    description:
      "Fresh vegetables mixed with low-fat dressing, rich in vitamins and fiber, highly satiating.",
    calories: 180,
    protein: "5g",
    carbs: "18g",
    fat: "9g",
    time: 15,
    healthTips:
      "This salad is rich in various vitamins and dietary fiber, making it an ideal meal choice for weight loss. The variety of vegetables provides comprehensive nutrition, meeting the body's needs while controlling calorie intake. It is recommended to use olive oil and lemon juice as dressing, avoiding high-calorie salad dressings.",
    ingredients: [
      "Fresh lettuce 100g",
      "Cherry tomatoes 50g",
      "Cucumber half",
      "Red bell pepper half",
      "Carrot half",
      "Purple onion 1/4",
      "Avocado half",
      "Olive oil 1 tsp",
      "Lemon juice to taste",
      "Salt and black pepper to taste",
    ],
    steps: [
      "Wash and drain all vegetables",
      "Tear lettuce into small pieces, slice cucumber, carrot, and bell pepper into thin strips",
      "Cut tomatoes in half, slice onion thinly",
      "Peel and pit avocado, cut into small pieces",
      "Place all ingredients in a large bowl, add olive oil and lemon juice",
      "Sprinkle with salt and black pepper, gently toss and serve",
    ],
  },
  {
    id: 2,
    name: "High Protein Energy Bowl",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929",
    description:
      "The perfect combination of quinoa, chicken breast, and avocado, promoting muscle recovery and growth.",
    calories: 320,
    protein: "25g",
    carbs: "30g",
    fat: "12g",
    time: 20,
    healthTips:
      "This energy bowl is an ideal meal for fitness enthusiasts, high in protein to aid muscle repair and growth, with quinoa providing complex carbohydrates for sustained energy. The healthy fats in avocado aid nutrient absorption, keeping you fuller post-workout.",
    ingredients: [
      "Quinoa 100g",
      "Chicken breast 150g",
      "Broccoli 50g",
      "Bell pepper half",
      "Avocado half",
      "Olive oil 1 tsp",
      "Lemon half",
      "Salt and black pepper to taste",
      "Low-sodium soy sauce 1 tsp",
      "Sesame seeds a pinch",
    ],
    steps: [
      "Rinse quinoa thoroughly, cook with double the volume of water",
      "Marinate chicken breast with salt, black pepper, and olive oil for 10 minutes",
      "Grill chicken in a preheated pan over medium heat until golden and fully cooked",
      "Cut broccoli into small florets, blanch in boiling water for 1 minute, then drain",
      "Spread cooked quinoa in a bowl, top with sliced chicken, broccoli, bell pepper, and avocado",
      "Squeeze lemon juice, drizzle with low-sodium soy sauce, sprinkle with sesame seeds and serve",
    ],
  },
  {
    id: 3,
    name: "Berry Chia Seed Smoothie Bowl",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd",
    description:
      "Antioxidant-rich berries and chia seeds provide lasting energy, ideal pre-workout meal.",
    calories: 250,
    protein: "8g",
    carbs: "35g",
    fat: "10g",
    time: 10,
    healthTips:
      "This smoothie bowl is rich in antioxidants and omega-3 fatty acids, helping reduce inflammation and promote heart health. Chia seeds absorb water and expand, increasing satiety, making it an ideal choice for weight control. Great for breakfast to provide sustained energy, perfect before a workout.",
    ingredients: [
      "Frozen mixed berries 100g",
      "Banana 1",
      "Greek yogurt (non-fat) 100g",
      "Chia seeds 1 tbsp",
      "Honey or maple syrup 1 tsp (optional)",
      "Almond milk 100ml",
      "Nuts or granola for topping",
    ],
    steps: [
      "Soak chia seeds in a small amount of water for 10 minutes (can be prepared overnight)",
      "Blend frozen berries, banana, yogurt, and almond milk in a blender",
      "Blend until smooth and thick",
      "Pour mixture into a bowl, top with soaked chia seeds",
      "Add honey or maple syrup to taste",
      "Sprinkle with nuts or granola and serve",
    ],
  },
  {
    id: 4,
    name: "Herb Grilled Chicken Breast with Roasted Vegetables",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    description:
      "Low-fat, high-protein perfect dinner choice, rich in herbal flavors.",
    calories: 280,
    protein: "35g",
    carbs: "15g",
    fat: "8g",
    time: 30,
    healthTips:
      "This dish is an ideal choice for fat loss, with high-protein, low-fat chicken breast aiding muscle maintenance and satiety. A variety of roasted vegetables provide rich vitamins and minerals, while herbs add flavor without extra calories.",
    ingredients: [
      "Chicken breast 200g",
      "Broccoli 100g",
      "Carrot 1",
      "Red onion half",
      "Zucchini half",
      "Cherry tomatoes 100g",
      "Olive oil 2 tsp",
      "Dried thyme 1 tsp",
      "Dried rosemary 1 tsp",
      "Garlic powder 1/2 tsp",
      "Salt and black pepper to taste",
    ],
    steps: [
      "Preheat oven to 200°C",
      "Pat chicken breast dry with paper towels, poke gently with a fork",
      "Mix olive oil, dried herbs, garlic powder, salt, and black pepper to make a marinade",
      "Coat chicken breast with half the marinade, let sit for 15 minutes",
      "Cut vegetables into appropriate sizes, toss with remaining marinade",
      "Place chicken breast in the center of a baking tray, surround with marinated vegetables",
      "Bake in preheated oven for 20-25 minutes until chicken is fully cooked",
      "Let rest for 5 minutes before slicing and serving",
    ],
  },
  {
    id: 5,
    name: "Mediterranean Grilled Salmon with Quinoa",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
    description:
      "Rich in omega-3 salmon with nutrient-dense quinoa, creating a perfectly balanced meal.",
    calories: 350,
    protein: "28g",
    carbs: "25g",
    fat: "15g",
    time: 25,
    healthTips:
      "Salmon is rich in high-quality protein and omega-3 fatty acids, helping reduce inflammation and protect heart health. Quinoa is one of the few plant-based foods containing all nine essential amino acids, providing complex carbohydrates and dietary fiber to maintain stable blood sugar levels.",
    ingredients: [
      "Salmon fillet 150g",
      "Quinoa 100g",
      "Lemon 1",
      "Olive oil 2 tsp",
      "Garlic 2 cloves",
      "Cherry tomatoes 100g",
      "Cucumber half",
      "Red onion 1/4",
      "Fresh parsley a pinch",
      "Greek olives a few",
      "Salt and black pepper to taste",
    ],
    steps: [
      "Rinse quinoa thoroughly, cook with double the volume of water and a pinch of salt",
      "Preheat oven to 190°C",
      "Place salmon fillet on a baking sheet lined with parchment paper",
      "Sprinkle salmon with lemon slices, minced garlic, olive oil, salt, and black pepper",
      "Bake salmon for 12-15 minutes until cooked through",
      "Cut tomatoes in half, dice cucumber and onion, mix into cooked quinoa",
      "Add remaining olive oil, lemon juice, salt, and black pepper for seasoning",
      "Place salmon on quinoa salad, garnish with chopped parsley and olives, and serve",
    ],
  },
];

// Food analysis data
const foodAnalysis = {
  apple: {
    name: "Apple",
    image: "https://images.unsplash.com/photo-1565299543923-37dd37887442",
    calories: 95,
    isHealthy: true,
    analysis:
      "Apples are a low-calorie, nutrient-rich fruit, high in dietary fiber and antioxidants. A medium-sized apple contains about 95 calories, making it an ideal choice for a weight-loss diet. The soluble fiber in apples helps control blood sugar levels, increases satiety, and reduces overall calorie intake.",
    recommendations: [1, 3, 5],
  },
  burger: {
    name: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    calories: 450,
    isHealthy: false,
    analysis:
      "A typical burger contains about 450 calories, with high fat and carbohydrate content, as well as high sodium levels. While it provides protein, it's not an ideal choice for weight loss. It's recommended to consume occasionally or opt for healthier alternatives like chicken or veggie burgers, removing sauces and cheese, and adding more vegetables.",
    recommendations: [1, 2, 4],
  },
  salad: {
    name: "Salad",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    calories: 180,
    isHealthy: true,
    analysis:
      "Vegetable salads are an excellent choice for weight-loss diets, low in calories but nutrient-rich. Be mindful of salad dressings, choosing low-fat or oil-and-vinegar dressings over creamy ones. Adding small amounts of high-quality protein like chicken breast, eggs, or beans can increase satiety and help control appetite.",
    recommendations: [1, 2, 3],
  },
  pasta: {
    name: "Pasta",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
    calories: 380,
    isHealthy: false,
    analysis:
      "Traditional pasta is mainly composed of refined carbohydrates, with high calories, about 380 calories per serving. For weight loss, choose whole-grain pasta, control portion sizes, increase vegetable proportions, use tomato-based sauces instead of creamy ones, and add lean protein like shrimp or chicken.",
    recommendations: [2, 4, 5],
  },
  chicken: {
    name: "Chicken Breast",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791",
    calories: 165,
    isHealthy: true,
    analysis:
      "Chicken breast is an ideal protein source for weight loss, with only about 165 calories per 100g, low in fat and high in protein. Protein helps increase satiety and maintain muscle mass, especially important during a calorie deficit. It's recommended to grill, steam, or boil, avoiding frying.",
    recommendations: [2, 4, 5],
  },
};

// DOM elements
const elements = {
  views: {
    home: document.getElementById("homeView"),
    analysis: document.getElementById("analysisView"),
    recipe: document.getElementById("recipeDetailView"),
    pricing: document.getElementById("pricingView"),
    history: document.getElementById("historyView"),
    auth: document.getElementById("authView"),
  },
  nav: {
    home: document.querySelectorAll(".nav-home"),
    pricing: document.querySelectorAll(".nav-pricing"),
    history: document.querySelectorAll(".nav-history"),
    login: document.getElementById("loginBtn"),
    menu: document.getElementById("menuToggle"),
    links: document.getElementById("navLinks"),
  },
  buttons: {
    upload: document.getElementById("uploadBtn"),
    analyze: document.getElementById("analyzeBtn"),
    backToHome: document.getElementById("backToHomeBtn"),
    backFromRecipe: document.getElementById("backFromRecipeBtn"),
    showLogin: document.getElementById("showLoginBtn"),
    showSignup: document.getElementById("showSignupBtn"),
    doLogin: document.getElementById("doLoginBtn"),
    doSignup: document.getElementById("doSignupBtn"),
    historyLogin: document.getElementById("historyLoginBtn"),
  },
  upload: {
    area: document.getElementById("uploadArea"),
    input: document.getElementById("foodImageInput"),
  },
  analysis: {
    image: document.getElementById("analyzedFoodImage"),
    name: document.getElementById("analyzedFoodName"),
    healthTag: document.getElementById("foodHealthTag"),
    caloriesTag: document.getElementById("foodCaloriesTag"),
    text: document.getElementById("foodAnalysisText"),
    recipes: document.getElementById("relatedRecipes"),
  },
  recipe: {
    image: document.getElementById("recipeDetailImage"),
    title: document.getElementById("recipeDetailTitle"),
    calories: document.getElementById("recipeCalories"),
    protein: document.getElementById("recipeProtein"),
    carbs: document.getElementById("recipeCarbs"),
    fat: document.getElementById("recipeFat"),
    time: document.getElementById("recipeTime"),
    healthTips: document.getElementById("recipeHealthTips"),
    ingredients: document.getElementById("recipeIngredients"),
    steps: document.getElementById("recipeSteps"),
  },
  auth: {
    loginForm: document.getElementById("loginForm"),
    signupForm: document.getElementById("signupForm"),
  },
  user: {
    info: document.getElementById("userInfo"),
    credits: document.getElementById("userCredits"),
    loginPrompt: document.getElementById("loginPrompt"),
    historyContent: document.getElementById("historyContent"),
  },
};

// App state
const state = {
  currentView: "home",
  previousView: null,
  user: null,
  uploadedImage: null,
  currentFood: null,
  currentRecipe: null,
  creditsUsed: 0,
  maxFreeCredits: 1,
};

// Helper function to show a view
function showView(viewName) {
  state.previousView = state.currentView;
  state.currentView = viewName;

  // Hide all views
  Object.values(elements.views).forEach((view) => {
    view.classList.remove("active");
  });

  // Show selected view
  elements.views[viewName].classList.add("active");

  // Scroll to top
  window.scrollTo(0, 0);
}

// Initialize event listeners
function initEventListeners() {
  // Navigation
  elements.nav.home.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showView("home");
    });
  });

  elements.nav.pricing.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showView("pricing");
    });
  });

  elements.nav.history.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showView("history");
      updateHistoryView();
    });
  });

  elements.nav.login.addEventListener("click", (e) => {
    e.preventDefault();
    showView("auth");
  });

  elements.nav.menu.addEventListener("click", () => {
    elements.nav.links.classList.toggle("show");
  });

  // Upload functionality
  elements.buttons.upload.addEventListener("click", () => {
    elements.upload.input.click();
  });

  elements.upload.area.addEventListener("click", () => {
    elements.upload.input.click();
  });

  elements.upload.input.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        // 保存完整的base64数据，包括前缀
        state.uploadedImage = e.target.result;

        // 显示预览
        elements.upload.area.innerHTML = `
          <img src="${state.uploadedImage}" alt="Uploaded Food" style="max-width: 100%; max-height: 200px; margin-bottom: 10px;">
          <p class="upload-text">Click to change image</p>
        `;
        elements.buttons.analyze.disabled = false;

        // 调试上传的图片格式
        console.log(
          "上传的图片base64格式:",
          state.uploadedImage.substring(0, 50) + "..."
        );
      };

      reader.readAsDataURL(file);
    }
  });

  // Analyze button
  elements.buttons.analyze.onclick = async function () {
    // 检查用户是否登录
    let token = null;
    const stored = localStorage.getItem("healthyDietUser");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // 优先使用顶层的token，也兼容user对象内的token
        token =
          parsed.access_token ||
          (parsed.user && parsed.user.access_token) ||
          null;

        // 确保已登录状态下state.user也是正确的
        if (token && !state.user) {
          state.user = parsed.user || parsed;
          updateUserDisplay();
          console.log("Analyze按钮恢复用户状态成功，token存在");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    // 强制状态检查：即使有token也需要确认state.user存在
    if (!token || !state.user) {
      console.log(
        "分析食物前检查登录状态：token=",
        !!token,
        "state.user=",
        !!state.user
      );
      showNotification("Please login before analyzing food.", "warning");
      showView("auth");
      return;
    }

    // 检查图片 - 优先使用state.uploadedImage
    if (state.uploadedImage) {
      console.log("使用已上传的图片进行分析");

      // 获取base64字符串，使用完整的data URI格式
      let base64 = state.uploadedImage;

      // 不再截取前缀部分，保留完整的data URI格式
      // 输出处理后的base64前缀部分用于调试
      console.log("处理后的base64前缀:", base64.substring(0, 50) + "...");

      processImageAnalysis(base64, token);
      return;
    }

    // 如果state中没有图片，检查input元素
    const fileInput = document.getElementById("foodImageInput");
    if (!fileInput || !fileInput.files || !fileInput.files[0]) {
      showNotification("Please upload a food image.", "warning");
      return;
    }

    const file = fileInput.files[0];
    if (file.size > 5 * 1024 * 1024) {
      showNotification("Image size must not exceed 5MB.", "error");
      return;
    }

    // 转base64
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        // 不再分割data URI，保留完整格式
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    try {
      const base64 = await toBase64(file);
      processImageAnalysis(base64, token);
    } catch (error) {
      console.error("转换图片失败:", error);
      showNotification("Failed to read image.", "error");
    }
  };

  // 抽取图片分析处理逻辑为独立函数
  function processImageAnalysis(base64, token) {
    elements.buttons.analyze.disabled = true;
    elements.buttons.analyze.textContent = "Analyzing...";
    elements.buttons.analyze.style.pointerEvents = "none";

    // 调试输出，查看base64格式
    console.log("发送的base64格式:", base64.substring(0, 50) + "...");

    // 确保使用完整的base64字符串 (包含data:image前缀)
    let fullBase64 = base64;
    if (!base64.startsWith("data:image")) {
      // 如果没有前缀，添加前缀
      fullBase64 = "data:image/jpeg;base64," + base64;
    }

    console.log("发送完整base64格式:", fullBase64.substring(0, 50) + "...");

    fetch("http://web.aigastronome.com/api/v1/gourmet/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ base64_image: fullBase64 }),
      credentials: "omit",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error(data.message || "Food analysis failed.");
          });
        }
      })
      .then((data) => {
        // 处理分析结果，渲染到页面
        if (data && data.ok === 1 && data.data) {
          const result = data.data;

          // 将分析结果保存到state
          state.currentFood = {
            name: result.analysis_result || "未知食物",
            calories: result.calorie_content || "未知卡路里",
            analysis: result.summary || "无分析结果",
            isHealthy: true, // 默认设置为健康食品
            image: state.uploadedImage, // 使用上传的图片作为展示图片
            recommendations: [], // 初始化推荐列表
          };

          // 显示分析结果
          elements.analysis.image.src = state.uploadedImage;
          elements.analysis.name.textContent = state.currentFood.name;
          elements.analysis.caloriesTag.textContent =
            state.currentFood.calories;
          elements.analysis.text.textContent = state.currentFood.analysis;

          // 清空并重建推荐食谱列表
          elements.analysis.recipes.innerHTML = "";

          // 处理推荐的菜品
          if (
            result.diet_recommendations &&
            result.diet_recommendations.length > 0
          ) {
            result.diet_recommendations.forEach((recommendation, index) => {
              // 为每个推荐创建一个虚拟的食谱对象
              const recipeId = 1000 + index; // 使用1000以上的ID，避免与预定义食谱冲突

              // 创建新的食谱对象
              const newRecipe = {
                id: recipeId,
                name: recommendation.dish_details.dish_name,
                image: state.currentFood.image, // 使用当前食物图片
                description: recommendation.recommendation_reason,
                calories:
                  recommendation.dish_details.nutrition_data.calories.replace(
                    " kcal",
                    ""
                  ),
                protein: recommendation.dish_details.nutrition_data.protein,
                carbs: recommendation.dish_details.nutrition_data.carbohydrates,
                fat: recommendation.dish_details.nutrition_data.fat,
                time: recommendation.dish_details.cooking_time.includes("分钟")
                  ? recommendation.dish_details.cooking_time.match(
                      /总计(\d+)分钟/
                    )[1]
                  : "15", // 默认15分钟
                healthTips: recommendation.dish_details.health_tips.join("\n"),
                ingredients: recommendation.dish_details.ingredients,
                steps: recommendation.dish_details.steps,
              };

              // 将新食谱添加到recipes数组中
              if (!recipes.find((r) => r.id === recipeId)) {
                recipes.push(newRecipe);
              }

              // 创建食谱卡片
              const recipeCard = document.createElement("div");
              recipeCard.className = "card recipe-card";
              recipeCard.dataset.id = recipeId;
              recipeCard.innerHTML = `
                <img src="${state.uploadedImage}" alt="${newRecipe.name}" class="card-image">
                <div class="card-content">
                  <h3 class="card-title">${newRecipe.name}</h3>
                  <p class="card-text">${newRecipe.description}</p>
                  <div class="card-meta">
                    <span><i class="fas fa-fire"></i> ${newRecipe.calories} 卡路里</span>
                    <span><i class="fas fa-clock"></i> ${newRecipe.time} 分钟</span>
                  </div>
                </div>
              `;

              // 添加点击事件
              recipeCard.addEventListener("click", () => {
                showRecipeDetail(recipeId);
              });

              // 添加到推荐列表
              elements.analysis.recipes.appendChild(recipeCard);

              // 将推荐ID添加到当前食物的推荐列表中
              state.currentFood.recommendations.push(recipeId);
            });
          }

          // 添加到历史记录
          if (state.user) {
            addToHistory({
              type: "analysis",
              food: state.currentFood,
              date: new Date(),
            });
          }

          // 显示分析结果页面
          showView("analysis");
          showNotification("食物分析成功！", "success");
        } else {
          showNotification("API返回数据格式异常", "warning");
        }
      })
      .catch((error) => {
        showNotification(error.message, "error");
      })
      .finally(() => {
        elements.buttons.analyze.disabled = false;
        elements.buttons.analyze.textContent = "Analyze Food";
        elements.buttons.analyze.style.pointerEvents = "auto";
      });
  }

  // Back buttons
  elements.buttons.backToHome.addEventListener("click", () => {
    showView("home");
  });

  elements.buttons.backFromRecipe.addEventListener("click", () => {
    if (state.previousView) {
      showView(state.previousView);
    } else {
      showView("home");
    }
  });

  // Recipe cards click
  document.querySelectorAll(".recipe-card").forEach((card) => {
    card.addEventListener("click", () => {
      const recipeId = parseInt(card.dataset.id);
      showRecipeDetail(recipeId);
    });
  });

  // Auth forms
  elements.buttons.showSignup.addEventListener("click", (e) => {
    e.preventDefault();
    elements.auth.loginForm.style.display = "none";
    elements.auth.signupForm.style.display = "block";
  });

  elements.buttons.showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    elements.auth.signupForm.style.display = "none";
    elements.auth.loginForm.style.display = "block";
  });

  elements.buttons.doLogin.addEventListener("click", () => {
    // 新的登录逻辑已在外部脚本中实现
    // 这里只保留一些本地逻辑避免冲突
    console.log("Login button clicked - using API implementation");
  });

  elements.buttons.doSignup.addEventListener("click", () => {
    // 新的注册逻辑已在外部脚本中实现
    // 这里只保留一些本地逻辑避免冲突
    console.log("Signup button clicked - using API implementation");
  });

  elements.buttons.historyLogin.addEventListener("click", () => {
    showView("auth");
  });

  // Buy credits buttons
  document.querySelectorAll(".buy-credits").forEach((button) => {
    button.addEventListener("click", () => {
      const plan = button.dataset.plan;
      if (!state.user) {
        alert("Please login before purchasing credits");
        showView("auth");
        return;
      }

      let credits = 0;
      switch (plan) {
        case "basic":
          credits = 3;
          break;
        case "value":
          credits = 8;
          break;
        case "monthly":
          credits = 30;
          break;
        case "yearly":
          credits = 500;
          break;
      }

      // Simulate purchase
      state.user.credits += credits;
      elements.user.credits.textContent = state.user.credits;
      updateLocalStorage();

      alert(`Purchase successful! You now have ${state.user.credits} credits.`);
      showView("home");
    });
  });
}

// Show recipe detail
function showRecipeDetail(recipeId) {
  const recipe = recipes.find((r) => r.id === recipeId);
  if (!recipe) return;

  state.currentRecipe = recipe;

  // Update recipe detail view
  elements.recipe.image.src = recipe.image;
  elements.recipe.title.textContent = recipe.name;
  elements.recipe.calories.textContent = recipe.calories;
  elements.recipe.protein.textContent = recipe.protein;
  elements.recipe.carbs.textContent = recipe.carbs;
  elements.recipe.fat.textContent = recipe.fat;
  elements.recipe.time.textContent = recipe.time;
  elements.recipe.healthTips.textContent = recipe.healthTips;

  // Clear and rebuild ingredients list
  elements.recipe.ingredients.innerHTML = "";
  recipe.ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.textContent = ingredient;
    elements.recipe.ingredients.appendChild(li);
  });

  // Clear and rebuild steps list
  elements.recipe.steps.innerHTML = "";
  recipe.steps.forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    elements.recipe.steps.appendChild(li);
  });

  // Add to history if logged in
  if (state.user) {
    addToHistory({
      type: "recipe",
      recipe: recipe,
      date: new Date(),
    });
  }

  showView("recipe");
}

// Login function
function doLogin(email, name = null, user = null) {
  // 如果提供了user对象，直接使用（API返回的用户信息）
  if (user) {
    state.user = {
      name: user.name || name || email.split("@")[0],
      email: email,
      credits: user.credits || 5, // 使用API返回的credits或默认值
      history: [],
    };
  } else {
    // 原有的本地存储逻辑保留
    const storedUser = localStorage.getItem("healthyDietUser");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        state.user = parsed.user || parsed;
        // 由于localStorage中的数据结构可能有两种形式，所以需要特殊处理
        if (parsed.access_token) {
          state.user.access_token = parsed.access_token;
        }
      } catch (error) {
        console.error("Error parsing stored user data in doLogin:", error);
        state.user = {
          name: name || email.split("@")[0],
          email: email,
          credits: 5,
          history: [],
        };
      }
    } else {
      state.user = {
        name: name || email.split("@")[0],
        email: email,
        credits: 5, // Give some starter credits
        history: [],
      };
    }
  }

  // 更新本地存储 - 确保之前存储的token不会被覆盖
  const storedData = localStorage.getItem("healthyDietUser");
  if (storedData) {
    try {
      const parsed = JSON.parse(storedData);
      if (parsed.access_token && !state.user.access_token) {
        // 保留原有的token
        state.user.access_token = parsed.access_token;
      }
      localStorage.setItem(
        "healthyDietUser",
        JSON.stringify({
          ...parsed,
          user: state.user,
        })
      );
    } catch (error) {
      console.error("Error updating local storage:", error);
      localStorage.setItem("healthyDietUser", JSON.stringify(state.user));
    }
  } else {
    localStorage.setItem("healthyDietUser", JSON.stringify(state.user));
  }

  // 更新UI显示
  updateUserDisplay();

  // 以下逻辑移到各自的处理函数中，避免重复显示alert
  // alert("Login successful!");
  showView(state.previousView || "home");
}

// 封装登出事件绑定，确保每次都只绑定一次
function bindLogoutEvent() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;
  // 先移除所有旧事件
  logoutBtn.replaceWith(logoutBtn.cloneNode(true));
  const newLogoutBtn = document.getElementById("logoutBtn");
  newLogoutBtn.onclick = function () {
    let token = null;
    const stored = localStorage.getItem("healthyDietUser");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        token = parsed.access_token || null;
      } catch {}
    }
    if (token) {
      fetch("http://web.aigastronome.com/api/v1/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "omit",
      }).finally(() => {
        localStorage.clear();
        state.user = null;
        state.creditsUsed = 0;
        updateUserDisplay();
        showView("home");
      });
    } else {
      localStorage.clear();
      state.user = null;
      state.creditsUsed = 0;
      updateUserDisplay();
      showView("home");
    }
  };
}

function updateUserDisplay() {
  let userObj = state.user;
  // 如果state中没有用户信息，尝试从localStorage获取
  if (!userObj) {
    const stored = localStorage.getItem("healthyDietUser");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        userObj = parsed.user || parsed;

        // 同步更新state.user以确保状态一致
        state.user = userObj;

        // 在控制台记录状态，帮助调试
        const hasToken = !!(parsed.access_token || userObj.access_token);
        console.log("从localStorage恢复用户信息成功，有token:", hasToken);
      } catch (error) {
        console.error("解析localStorage中的用户数据出错:", error);
        userObj = null;
      }
    }
  }

  const logoutBtn = document.getElementById("logoutBtn");

  // 如果有用户信息，显示用户状态
  if (userObj) {
    elements.nav.login.style.display = "none";
    elements.user.info.style.display = "flex";
    elements.user.credits.textContent =
      typeof userObj.credits === "number" ? userObj.credits : 0;
    const userAvatar = document.querySelector(".user-avatar");
    userAvatar.textContent = (userObj.name || userObj.email || "U")
      .charAt(0)
      .toUpperCase();
    if (logoutBtn) {
      logoutBtn.style.display = "inline-block";
      bindLogoutEvent();
    }
  } else {
    // 没有用户信息时，显示登录按钮
    elements.nav.login.style.display = "block";
    elements.user.info.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";
  }
}

function setupLogoutButton() {
  bindLogoutEvent();
}

// Add item to history
function addToHistory(item) {
  if (!state.user) return;

  state.user.history.unshift(item);

  // Limit history size
  if (state.user.history.length > 20) {
    state.user.history.pop();
  }

  updateLocalStorage();
}

// Update local storage
function updateLocalStorage() {
  if (state.user) {
    localStorage.setItem("healthyDietUser", JSON.stringify(state.user));
  }
}

// Update history view
function updateHistoryView() {
  if (!state.user) {
    elements.user.loginPrompt.style.display = "block";
    elements.user.historyContent.style.display = "none";
    return;
  }

  elements.user.loginPrompt.style.display = "none";
  elements.user.historyContent.style.display = "block";

  // Clear existing history
  document.getElementById("analysisHistory").innerHTML = "";
  document.getElementById("recipeHistory").innerHTML = "";

  // Add analysis history
  const analysisHistory = state.user.history.filter(
    (item) => item.type === "analysis"
  );
  if (analysisHistory.length > 0) {
    analysisHistory.forEach((item) => {
      const historyItem = document.createElement("div");
      historyItem.className = "history-item";
      historyItem.innerHTML = `
                        <img src="${item.food.image}" alt="${
        item.food.name
      }" class="history-image">
                        <div class="history-content">
                            <div class="history-date">${new Date(
                              item.date
                            ).toLocaleString()}</div>
                            <h3 class="history-title">${item.food.name}</h3>
                            <div class="history-meta">
                                <div><i class="fas fa-fire"></i> ${
                                  item.food.calories
                                } Calories</div>
                                <div>
                                    <i class="fas ${
                                      item.food.isHealthy
                                        ? "fa-check-circle"
                                        : "fa-exclamation-circle"
                                    }" 
                                       style="color: var(${
                                         item.food.isHealthy
                                           ? "--success-color"
                                           : "--warning-color"
                                       });"></i> 
                                    ${
                                      item.food.isHealthy
                                        ? "Healthy Choice"
                                        : "Occasional Treat"
                                    }
                                </div>
                            </div>
                        </div>
                    `;
      document.getElementById("analysisHistory").appendChild(historyItem);
    });
  } else {
    document.getElementById("analysisHistory").innerHTML =
      '<p style="text-align: center; padding: 20px;">No analysis records yet</p>';
  }

  // Add recipe history
  const recipeHistory = state.user.history.filter(
    (item) => item.type === "recipe"
  );
  if (recipeHistory.length > 0) {
    recipeHistory.forEach((item) => {
      const historyItem = document.createElement("div");
      historyItem.className = "history-item recipe-card";
      historyItem.dataset.id = item.recipe.id;
      historyItem.innerHTML = `
                        <img src="${item.recipe.image}" alt="${
        item.recipe.name
      }" class="history-image">
                        <div class="history-content">
                            <div class="history-date">${new Date(
                              item.date
                            ).toLocaleString()}</div>
                            <h3 class="history-title">${item.recipe.name}</h3>
                            <div class="history-meta">
                                <div><i class="fas fa-fire"></i> ${
                                  item.recipe.calories
                                } Calories</div>
                                <div><i class="fas fa-clock"></i> ${
                                  item.recipe.time
                                } Minutes</div>
                            </div>
                        </div>
                    `;
      document.getElementById("recipeHistory").appendChild(historyItem);

      // Add click event to recipe history item
      historyItem.addEventListener("click", () => {
        showRecipeDetail(item.recipe.id);
      });
    });
  } else {
    document.getElementById("recipeHistory").innerHTML =
      '<p style="text-align: center; padding: 20px;">No recipe browsing records yet</p>';
  }
}

// Initialize the app
function init() {
  // Check for existing user
  const storedUser = localStorage.getItem("healthyDietUser");
  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser);
      // 同步state.user和localStorage中的user数据
      state.user = parsed.user || parsed;
      updateUserDisplay();
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      localStorage.removeItem("healthyDietUser");
      state.user = null;
    }
  }

  initEventListeners();
  setupLogoutButton();
}

// Run initialization when DOM is loaded
document.addEventListener("DOMContentLoaded", init);

// 弹窗显示逻辑
document.getElementById("footerPrivacy").onclick = function (e) {
  e.preventDefault();
  document.getElementById("privacyModal").style.display = "flex";
};
document.getElementById("footerTerms").onclick = function (e) {
  e.preventDefault();
  document.getElementById("termsModal").style.display = "flex";
};
document.getElementById("showPrivacyFromLogin").onclick = function (e) {
  e.preventDefault();
  document.getElementById("privacyModal").style.display = "flex";
};
document.getElementById("showTermsFromLogin").onclick = function (e) {
  e.preventDefault();
  document.getElementById("termsModal").style.display = "flex";
};
document.getElementById("showPrivacyFromSignup").onclick = function (e) {
  e.preventDefault();
  document.getElementById("privacyModal").style.display = "flex";
};
document.getElementById("showTermsFromSignup").onclick = function (e) {
  e.preventDefault();
  document.getElementById("termsModal").style.display = "flex";
};

// 修改showSignupBtn和showLoginBtn按钮点击事件
document.getElementById("showSignupBtn").onclick = function () {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
};

document.getElementById("showLoginBtn").onclick = function () {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
};

// 忘记密码相关逻辑
document
  .getElementById("forgotPasswordLink")
  .addEventListener("click", function (e) {
    e.preventDefault();

    // 自动填充邮箱
    const loginEmail = document.getElementById("loginEmail").value;
    if (loginEmail) {
      document.getElementById("resetEmail").value = loginEmail;
    }

    // 显示忘记密码弹窗
    document.getElementById("forgotPasswordModal").style.display = "flex";
  });

// 获取验证码按钮事件
const getCodeBtn = document.getElementById("getVerificationCodeBtn");
if (getCodeBtn) {
  getCodeBtn.onclick = function () {
    const email = document.getElementById("resetEmail").value.trim();
    // 自定义邮箱规则
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!email) {
      document.getElementById("resetEmailError").textContent =
        "Please enter your email address.";
      document.getElementById("resetEmailError").style.display = "block";
      return;
    } else if (!emailRegex.test(email)) {
      document.getElementById("resetEmailError").textContent =
        "Please enter a valid email address.";
      document.getElementById("resetEmailError").style.display = "block";
      return;
    } else {
      document.getElementById("resetEmailError").style.display = "none";
    }
    // 显示加载状态
    const btn = getCodeBtn;
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Sending...";
    // 发送POST请求
    fetch("http://web.aigastronome.com/api/v1/auth/email-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      credentials: "omit",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error(
              data.message || "Failed to send verification code."
            );
          });
        }
      })
      .then(() => {
        // 成功
        document.getElementById("resetEmailError").style.display = "none";
        // 倒计时效果
        let countdown = 60;
        btn.textContent = `Resend (${countdown}s)`;
        const timer = setInterval(() => {
          countdown--;
          if (countdown <= 0) {
            clearInterval(timer);
            btn.disabled = false;
            btn.textContent = "Get Code";
          } else {
            btn.textContent = `Resend (${countdown}s)`;
          }
        }, 1000);
      })
      .catch((error) => {
        document.getElementById("resetEmailError").textContent = error.message;
        document.getElementById("resetEmailError").style.display = "block";
        btn.disabled = false;
        btn.textContent = originalText;
      });
  };
}

// 重置密码按钮事件
const resetBtn = document.getElementById("resetPasswordBtn");
if (resetBtn) {
  resetBtn.onclick = function () {
    const email = document.getElementById("resetEmail").value.trim();
    const code = document.getElementById("resetVerificationCode").value.trim();
    const password = document.getElementById("resetPassword").value;
    const confirmPassword = document.getElementById(
      "resetPasswordConfirm"
    ).value;
    // 自定义邮箱规则
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    let isValid = true;
    // 邮箱校验
    if (!email) {
      document.getElementById("resetEmailError").textContent =
        "Please enter your email address.";
      document.getElementById("resetEmailError").style.display = "block";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      document.getElementById("resetEmailError").textContent =
        "Please enter a valid email address.";
      document.getElementById("resetEmailError").style.display = "block";
      isValid = false;
    } else {
      document.getElementById("resetEmailError").style.display = "none";
    }
    // 验证码校验
    if (!code) {
      document.getElementById("verificationCodeError").textContent =
        "Verification code is required.";
      document.getElementById("verificationCodeError").style.display = "block";
      isValid = false;
    } else {
      document.getElementById("verificationCodeError").style.display = "none";
    }
    // 密码校验
    if (!password || password.length < 6) {
      document.getElementById("resetPasswordError").textContent =
        "Password must be at least 6 characters.";
      document.getElementById("resetPasswordError").style.display = "block";
      isValid = false;
    } else {
      document.getElementById("resetPasswordError").style.display = "none";
    }
    // 确认密码校验
    if (password !== confirmPassword) {
      document.getElementById("resetPasswordConfirmError").textContent =
        "Passwords do not match.";
      document.getElementById("resetPasswordConfirmError").style.display =
        "block";
      isValid = false;
    } else {
      document.getElementById("resetPasswordConfirmError").style.display =
        "none";
    }
    if (!isValid) return;
    // 显示加载状态
    const btn = resetBtn;
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Resetting...";
    // 发送POST请求
    fetch("http://web.aigastronome.com/api/v1/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        verification_code: code,
        password: md5(password),
        password_confirm: md5(confirmPassword),
      }),
      credentials: "omit",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error(data.message || "Password reset failed.");
          });
        }
      })
      .then(() => {
        // 成功
        document.getElementById("forgotPasswordModal").style.display = "none";
        document.getElementById("loginEmail").value = email;
      })
      .catch((error) => {
        document.getElementById("resetPasswordError").textContent =
          error.message;
        document.getElementById("resetPasswordError").style.display = "block";
      })
      .finally(() => {
        btn.disabled = false;
        btn.textContent = originalText;
      });
  };
}

// 全局美观通知
function showNotification(message, type = "success", duration = 3000) {
  const notification = document.getElementById("notification");
  const msgSpan = document.getElementById("notificationMessage");
  if (!notification || !msgSpan) return;
  msgSpan.textContent = message;
  notification.className = `notification notification-${type}`;
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

// 登录表单提交事件（md5加密密码）
document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("doLoginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const agreement = document.getElementById("loginAgreementCheckbox");
      if (agreement && !agreement.checked) {
        showNotification(
          "You must agree to the Terms of Use and Privacy Policy before logging in.",
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
      fetch("http://web.aigastronome.com/api/v1/auth/login", {
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
          // 维护本地存储和登录状态
          if (data && data.data) {
            const userData = data.data.user || {};
            const credits =
              typeof userData.credits === "number" ? userData.credits : 0;
            // 确保token直接保存在顶层，也保留在loginInfo.user中以保证兼容性
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
                avatar_url: userData.avatar_url || "",
                created_at: userData.created_at,
                last_login_at: userData.last_login_at,
                credits: credits,
                access_token: data.data.access_token, // 也在user对象中存储token以兼容各种情况
                refresh_token: data.data.refresh_token,
              },
            };
            localStorage.setItem("healthyDietUser", JSON.stringify(loginInfo));

            // 同步更新全局state.user
            state.user = loginInfo.user;

            // 立即更新UI显示
            updateUserDisplay();
            console.log(
              "登录成功，access_token已保存",
              !!data.data.access_token
            );
          }

          // 原有的登录处理函数，确保兼容性
          if (typeof doLogin === "function") {
            doLogin(email, data.data.user?.name, data.data.user);
          }

          // 返回到主页面
          document.getElementById("authView").classList.remove("active");
          document.getElementById("homeView").classList.add("active");
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
});

// 注册按钮事件绑定和注册逻辑
const signupBtn = document.getElementById("doSignupBtn");
if (signupBtn) {
  signupBtn.onclick = function (e) {
    e.preventDefault();
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById(
      "signupPasswordConfirm"
    ).value;
    const agreement = document.getElementById("signupAgreementCheckbox");
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
      return;
    }
    if (!agreement || !agreement.checked) {
      showNotification(
        "You must agree to the Terms of Use and Privacy Policy before signing up.",
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
    fetch("http://web.aigastronome.com/api/v1/auth/register", {
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
        // 自动切换到登录并填充邮箱
        document.getElementById("signupForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("loginEmail").value = email;
      })
      .catch((error) => {
        showNotification(error.message, "error");
      })
      .finally(() => {
        signupBtn.disabled = false;
        signupBtn.textContent = "Sign Up";
      });
  };
}

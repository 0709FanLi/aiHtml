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
  historyPage: 1,
  historyPageSize: 10,
  historySearchTerm: "",
  itemToDelete: null,
};

// Helper function to show a view
function showView(viewName) {
  console.log("切换视图到:", viewName, "当前视图:", state.currentView);

  state.previousView = state.currentView;
  state.currentView = viewName;

  try {
    // 检查视图元素是否存在
    if (!elements.views[viewName]) {
      console.error(
        `视图 ${viewName} 不存在在 elements.views 中:`,
        elements.views
      );
      // 尝试重新获取元素
      const viewElement = document.getElementById(`${viewName}View`);
      if (viewElement) {
        elements.views[viewName] = viewElement;
        console.log(`重新获取 ${viewName} 视图元素成功`);
      } else {
        console.error(`无法找到ID为 ${viewName}View 的元素`);
        return false;
      }
    }

    // Hide all views - 使用直接的DOM选择器作为备选
    const allViews = document.querySelectorAll(".view");
    if (allViews.length > 0) {
      allViews.forEach((view) => {
        view.classList.remove("active");
      });
      console.log("已移除所有视图的活动状态");
    } else {
      // 尝试使用elements.views
      Object.values(elements.views).forEach((view) => {
        if (view) view.classList.remove("active");
      });
    }

    // Show selected view
    if (elements.views[viewName]) {
      elements.views[viewName].classList.add("active");
      console.log(`已激活 ${viewName} 视图`);
    } else {
      const viewElement = document.getElementById(`${viewName}View`);
      if (viewElement) {
        viewElement.classList.add("active");
        console.log(`使用备选方法激活 ${viewName} 视图`);
      }
    }

    // Scroll to top
    window.scrollTo(0, 0);
    return true;
  } catch (err) {
    console.error("显示视图时出错:", err);
    return false;
  }
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

  // Upload functionality - 只保留上传区域的点击事件，删除uploadBtn按钮的点击事件
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
    console.log("Analyze button clicked, checking image...");
    console.log("State.uploadedImage exists:", !!state.uploadedImage);

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
      showNotification("Please login before analyzing food", "warning");
      showView("auth");
      return;
    }

    // 检查用户积分是否足够
    const userCredits =
      typeof state.user.credits === "number" ? state.user.credits : 0;

    // 确保积分不会为负数
    if (state.user && state.user.credits < 0) {
      state.user.credits = 0;
      updateLocalStorage();
      updateUserDisplay();
    }

    if (userCredits <= 0) {
      showNotification("Insufficient credits", "warning");
      // 延迟跳转到价格页面，让用户先看到提示
      setTimeout(() => {
        showView("pricing");
      }, 1500);
      return;
    }

    // 检查图片 - 优先使用state.uploadedImage
    if (!state.uploadedImage) {
      // 如果state中没有图片，检查input元素
      const fileInput = document.getElementById("foodImageInput");
      if (!fileInput || !fileInput.files || !fileInput.files[0]) {
        showNotification("Please upload a food image first.", "warning");
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
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

      try {
        const base64 = await toBase64(file);
        state.uploadedImage = base64; // 保存图片到state
        processImageAnalysis(base64, token);
      } catch (error) {
        console.error("转换图片失败:", error);
        showNotification("Failed to read image.", "error");
      }
      return;
    }

    // 如果state中有图片，直接使用
    console.log("使用已上传的图片进行分析");
    let base64 = state.uploadedImage;
    console.log("处理后的base64前缀:", base64.substring(0, 50) + "...");
    processImageAnalysis(base64, token);
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
            // 特殊处理积分不足的情况
            if (data.ok === 2 && data.message === "Insufficient credits") {
              throw new Error("Insufficient credits");
            }
            throw new Error(data.message || "Failed to analyze food");
          });
        }
      })
      .then((data) => {
        // 处理分析结果，渲染到页面
        if (data && data.ok === 1 && data.data) {
          const result = data.data;
          console.log("API返回的食物分析数据:", result);

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

          // 改进分析结果的显示样式
          const analysisText = document.getElementById("foodAnalysisText");
          if (analysisText) {
            analysisText.style.backgroundColor = "#f8f9fa";
            analysisText.style.padding = "15px";
            analysisText.style.borderRadius = "8px";
            analysisText.style.lineHeight = "1.6";
            analysisText.style.color = "#333";
            analysisText.style.marginTop = "15px";
            analysisText.style.border = "1px solid #e0e0e0";
            analysisText.style.borderLeft = "4px solid var(--primary-color)";
          }

          // 设置推荐菜谱标题
          const recommendationsTitle = document.querySelector(
            "#recommendationsSection h3"
          );
          if (recommendationsTitle) {
            recommendationsTitle.textContent = "推荐健康菜谱";
            recommendationsTitle.style.textAlign = "center";
            recommendationsTitle.style.position = "relative";
            recommendationsTitle.style.paddingBottom = "10px";
            recommendationsTitle.style.borderBottom =
              "2px solid var(--primary-color)";
            recommendationsTitle.style.width = "fit-content";
            recommendationsTitle.style.margin = "30px auto 20px auto";
          }

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

              // 处理详细信息
              const cookingTimeText =
                recommendation.dish_details.cooking_time || "";
              // 从烹饪时间中提取总计时间
              const timeMatch = cookingTimeText.match(/总计(\d+)分钟/);
              const cookingTime =
                timeMatch && timeMatch[1] ? timeMatch[1] : "15";

              // 处理健康提示，从Markdown格式转换为HTML
              let healthTipsHtml = "";
              if (
                recommendation.dish_details.health_tips &&
                recommendation.dish_details.health_tips.length > 0
              ) {
                healthTipsHtml = recommendation.dish_details.health_tips
                  .map((tip) => {
                    // 提取加粗部分并应用HTML标签
                    return tip.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
                  })
                  .join("<br>");
              }

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
                time: cookingTime,
                cookingTimeText: cookingTimeText, // 保存完整的烹饪时间文本
                healthTips: healthTipsHtml,
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
              recipeCard.style.border = "1px solid #e0e0e0";
              recipeCard.style.borderLeft = "4px solid var(--primary-color)";
              recipeCard.style.borderRadius = "8px";
              recipeCard.style.boxShadow = "0 2px 5px rgba(0,0,0,0.05)";
              recipeCard.style.transition = "transform 0.2s, box-shadow 0.2s";

              // 创建营养数据显示
              const nutritionDisplay = `
                <div style="display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap;">
                  <span style="background: #f8f9fa; padding: 5px 10px; border-radius: 20px; font-size: 13px; color: #555;">
                    <i class="fas fa-fire" style="color: #ff6b6b;"></i> ${newRecipe.calories} 卡路里
                  </span>
                  <span style="background: #f8f9fa; padding: 5px 10px; border-radius: 20px; font-size: 13px; color: #555;">
                    <i class="fas fa-drumstick-bite" style="color: #4d96ff;"></i> ${newRecipe.protein}
                  </span>
                  <span style="background: #f8f9fa; padding: 5px 10px; border-radius: 20px; font-size: 13px; color: #555;">
                    <i class="fas fa-bread-slice" style="color: #ffc078;"></i> ${newRecipe.carbs}
                  </span>
                  <span style="background: #f8f9fa; padding: 5px 10px; border-radius: 20px; font-size: 13px; color: #555;">
                    <i class="fas fa-oil-can" style="color: #ffa94d;"></i> ${newRecipe.fat}
                  </span>
                </div>
              `;

              recipeCard.innerHTML = `
                <div class="card-content" style="padding: 20px;">
                  <h3 class="card-title" style="margin-bottom: 10px; color: var(--primary-color);">${newRecipe.name}</h3>
                  <p class="card-text" style="margin-bottom: 15px; line-height: 1.5; color: #555;">${newRecipe.description}</p>
                  ${nutritionDisplay}
                  <div class="card-meta" style="margin-top: 15px; display: flex; align-items: center; justify-content: space-between;">
                    <span style="color: #666;"><i class="fas fa-clock" style="color: #20c997;"></i> ${newRecipe.time} Minutes</span>
                    <a href="#" class="view-recipe-details" data-recipe-id="${recipeId}" style="color: #4caf50; font-weight: bold; text-decoration: none;">View Details <i class="fas fa-chevron-right"></i></a>
                  </div>
                </div>
              `;

              // 添加点击和悬停效果
              recipeCard.addEventListener("click", (e) => {
                // 检查如果点击的是"查看详情"链接，则不要触发整个卡片的点击事件
                if (e.target.closest(".view-recipe-details")) {
                  e.preventDefault();
                  // 获取食谱ID并显示详情
                  const detailLink = e.target.closest(".view-recipe-details");
                  const recipeId = detailLink.getAttribute("data-recipe-id");
                  showRecipeDetailsModal({
                    id: recipeId,
                    title: newRecipe.name,
                    image: newRecipe.image || "",
                    calories: newRecipe.calories,
                    protein: newRecipe.protein,
                    carbs: newRecipe.carbs,
                    fat: newRecipe.fat,
                    time: newRecipe.time,
                    healthTips: newRecipe.healthTips,
                    ingredients: newRecipe.ingredients.map((ingredient) =>
                      ingredient.replace(/^\d+\.\s*/, "")
                    ),
                    steps: newRecipe.steps.map((step) =>
                      step.replace(/^\d+\.\s*/, "")
                    ),
                  });
                  return;
                }
                showRecipeDetail(recipeId);
              });

              // 添加悬停效果
              recipeCard.addEventListener("mouseenter", () => {
                recipeCard.style.transform = "translateY(-5px)";
                recipeCard.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
              });

              recipeCard.addEventListener("mouseleave", () => {
                recipeCard.style.transform = "translateY(0)";
                recipeCard.style.boxShadow = "0 2px 5px rgba(0,0,0,0.05)";
              });

              // 添加到推荐列表
              elements.analysis.recipes.appendChild(recipeCard);

              // 将推荐ID添加到当前食物的推荐列表中
              state.currentFood.recommendations.push(recipeId);
            });
          }

          // 添加到历史记录
          if (state.user) {
            try {
              // 限制历史记录长度，防止存储溢出
              if (state.user.history && state.user.history.length > 10) {
                state.user.history = state.user.history.slice(0, 10);
              }

              // 限制食物图片大小，防止存储溢出
              let safeFood = {
                ...state.currentFood,
                image: null, // 不保存图片到localStorage
              };

              addToHistory({
                type: "analysis",
                food: safeFood,
                date: new Date(),
              });
            } catch (err) {
              console.error("添加历史记录出错:", err);
            }
          }

          // 分析成功后减少一个积分
          if (state.user && typeof state.user.credits === "number") {
            state.user.credits = Math.max(0, state.user.credits - 1); // 确保积分不小于0
            try {
              updateLocalStorage();
            } catch (err) {
              console.error("更新本地存储出错:", err);
              // 即使存储失败也继续显示
              showNotification(
                "Storage quota exceeded, some data may not be saved",
                "warning"
              );
            }
            updateUserDisplay(); // 更新UI显示
          }

          // 显示分析结果页面 - 使用延时执行防止localStorage错误阻塞UI切换
          console.log("准备跳转到分析结果页面...");

          // 使用setTimeout来确保其他代码完成执行后再进行页面切换
          setTimeout(() => {
            try {
              // 确保视图元素存在
              if (!elements.views.analysis) {
                console.error("分析结果视图元素不存在:", elements.views);
                // 尝试重新获取元素
                elements.views.analysis =
                  document.getElementById("analysisView");
              }

              if (elements.views.analysis) {
                // 确保使用函数来显示视图，而不是直接操作DOM
                showView("analysis");
                console.log("成功显示分析结果页面");
              } else {
                console.error("无法找到分析结果视图元素");
                // 直接使用DOM操作作为备选方案
                document
                  .querySelectorAll(".view")
                  .forEach((view) => view.classList.remove("active"));
                const analysisView = document.getElementById("analysisView");
                if (analysisView) {
                  analysisView.classList.add("active");
                  console.log("使用备选方法显示分析结果页面");
                }
              }

              // 滚动到页面顶部
              window.scrollTo(0, 0);
            } catch (err) {
              console.error("显示分析结果页面时出错:", err);

              // 最后的备选方法 - 直接操作DOM
              try {
                const allViews = document.querySelectorAll(".view");
                allViews.forEach((v) => v.classList.remove("active"));
                const analysis = document.getElementById("analysisView");
                if (analysis) {
                  analysis.classList.add("active");
                  console.log("使用最终备选方法显示分析结果页面");
                }
              } catch (finalErr) {
                console.error("所有显示方法都失败:", finalErr);
              }
            }
          }, 100); // 延迟100毫秒执行

          showNotification("Food analysis successful!", "success");
        } else if (
          data &&
          data.ok === 2 &&
          data.message === "Insufficient credits"
        ) {
          // 积分不足的情况
          showNotification("Insufficient credits", "warning");
          // 延迟跳转到价格页面
          setTimeout(() => {
            showView("pricing");
          }, 1500);
        } else {
          // 其他异常情况
          showNotification("Unable to analyze food", "warning");
        }
      })
      .catch((error) => {
        if (error.message.includes("积分不足")) {
          showNotification("Insufficient credits", "warning");
          // 延迟跳转到价格页面，让用户先看到提示
          setTimeout(() => {
            showView("pricing");
          }, 1500);
        } else {
          showNotification(error.message, "error");
        }
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
        showNotification("Please login before purchasing credits", "warning");
        showView("auth");
        return;
      }

      // 获取token，确保用户已登录
      let token = null;
      const stored = localStorage.getItem("healthyDietUser");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          token = parsed.access_token || null;
        } catch (error) {
          console.error("解析token时出错:", error);
        }
      }

      if (!token) {
        showNotification(
          "Login information expired, please login again",
          "warning"
        );
        showView("auth");
        return;
      }

      let credits = 0;
      let amount = 0;
      switch (plan) {
        case "basic":
          credits = 3;
          amount = 0.99;
          break;
        case "value":
          credits = 8;
          amount = 1.99;
          break;
        case "monthly":
          credits = 30;
          amount = 3.99;
          break;
        case "yearly":
          credits = 500;
          amount = 39.99;
          break;
      }

      // 禁用按钮，防止重复点击
      button.disabled = true;
      button.textContent = "处理中...";

      // 调用API购买积分
      fetch("http://web.aigastronome.com/api/v1/credits/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          credits: credits,
          amount: amount,
          plan_name: plan,
        }),
        credentials: "omit",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((data) => {
              throw new Error(data.message || "购买积分失败");
            });
          }
        })
        .then((data) => {
          if (data.ok === 1 && data.data) {
            // 更新用户积分
            if (state.user) {
              state.user.credits =
                data.data.credits || state.user.credits + credits;
              elements.user.credits.textContent = state.user.credits;
              updateLocalStorage();
            }
            showNotification(
              `Purchase successful! You now have ${state.user.credits} credits`,
              "success"
            );
            // 返回主页
            showView("home");
          } else {
            throw new Error(
              "Failed to purchase credits, please try again later"
            );
          }
        })
        .catch((error) => {
          showNotification(error.message, "error");
        })
        .finally(() => {
          // 恢复按钮状态
          button.disabled = false;
          switch (plan) {
            case "basic":
            case "value":
              button.textContent = "Buy";
              break;
            case "monthly":
            case "yearly":
              button.textContent = "Subscribe";
              break;
          }
        });
    });
  });
}

// Show recipe detail
function showRecipeDetail(recipeId) {
  const recipe = recipes.find((r) => r.id === recipeId);
  if (!recipe) return;

  state.currentRecipe = recipe;

  // 使用弹窗展示食谱详情
  showRecipeDetailsModal({
    id: recipe.id,
    title: recipe.name,
    image: recipe.image || "",
    calories: recipe.calories,
    protein: recipe.protein,
    carbs: recipe.carbs,
    fat: recipe.fat,
    time: recipe.time,
    healthTips: recipe.healthTips,
    ingredients: recipe.ingredients.map((ingredient) =>
      ingredient.replace(/^\d+\.\s*/, "")
    ),
    steps: recipe.steps.map((step) => step.replace(/^\d+\.\s*/, "")),
  });

  // Add to history if logged in
  if (state.user) {
    addToHistory({
      type: "recipe",
      recipe: recipe,
      date: new Date(),
    });
  }
}

// Login function
function doLogin(email, name = null, user = null) {
  // 如果提供了user对象，直接使用（API返回的用户信息）
  if (user) {
    state.user = {
      name: user.name || name || email.split("@")[0],
      email: email,
      credits: typeof user.credits === "number" ? user.credits : 0, // 确保使用API返回的积分值
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
        // 确保积分值是正确的数字
        state.user.credits =
          typeof state.user.credits === "number" ? state.user.credits : 0;
      } catch (error) {
        console.error("Error parsing stored user data in doLogin:", error);
        state.user = {
          name: name || email.split("@")[0],
          email: email,
          credits: 0, // 默认积分为0
          history: [],
        };
      }
    } else {
      state.user = {
        name: name || email.split("@")[0],
        email: email,
        credits: 0, // 使用API返回的值，不再默认给予积分
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
        // 清空本地存储和用户状态
        localStorage.clear();
        state.user = null;
        state.creditsUsed = 0;

        // 清空上传的图片
        state.uploadedImage = null;

        // 重置上传区域
        elements.upload.area.innerHTML = `
          <i class="fas fa-cloud-upload-alt"></i>
          <p class="upload-text">Click or drag and drop image here</p>
        `;

        // 重置文件输入
        if (elements.upload.input) {
          elements.upload.input.value = "";
        }

        updateUserDisplay();
        showView("home");
      });
    } else {
      // 清空本地存储和用户状态
      localStorage.clear();
      state.user = null;
      state.creditsUsed = 0;

      // 清空上传的图片
      state.uploadedImage = null;

      // 重置上传区域
      elements.upload.area.innerHTML = `
        <i class="fas fa-cloud-upload-alt"></i>
        <p class="upload-text">Click or drag and drop image here</p>
      `;

      // 重置文件输入
      if (elements.upload.input) {
        elements.upload.input.value = "";
      }

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

    // 更新积分显示，确保正确显示积分数量
    const creditsValue =
      typeof userObj.credits === "number" ? userObj.credits : 0;
    elements.user.credits.textContent = creditsValue;

    // 统一使用白色显示积分数量，使其在绿色背景下更明显
    const creditsElement = document.getElementById("userCredits");
    if (creditsElement) {
      creditsElement.style.color = "#ffffff"; // 白色，使其在导航栏上更明显
    }

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

  try {
    // 确保历史记录数组存在
    if (!state.user.history) {
      state.user.history = [];
    }

    // 移除图片数据以减少存储大小
    if (item.type === "analysis" && item.food) {
      item = {
        ...item,
        food: {
          ...item.food,
          image: null, // 不存储图片
        },
      };
    } else if (item.type === "recipe" && item.recipe) {
      item = {
        ...item,
        recipe: {
          ...item.recipe,
          image: null, // 不存储图片
        },
      };
    }

    // 添加到历史记录前面
    state.user.history.unshift(item);

    // 限制历史记录大小，最多10条
    if (state.user.history.length > 10) {
      state.user.history = state.user.history.slice(0, 10);
    }

    // 尝试更新本地存储，但不抛出错误以确保程序继续运行
    try {
      updateLocalStorage();
    } catch (e) {
      console.error("保存历史记录到本地存储失败:", e);
    }
  } catch (error) {
    console.error("添加历史记录时出错:", error);
  }
}

// Update local storage
function updateLocalStorage() {
  if (state.user) {
    try {
      // 清理历史记录中的图片数据以减小存储体积
      const cleanUser = { ...state.user };

      // 确保历史记录不超过10条
      if (cleanUser.history && cleanUser.history.length > 10) {
        cleanUser.history = cleanUser.history.slice(0, 10);
      }

      // 移除历史记录中所有的图片数据
      if (cleanUser.history) {
        cleanUser.history = cleanUser.history.map((item) => {
          if (item.type === "analysis" && item.food) {
            return {
              ...item,
              food: {
                ...item.food,
                image: null, // 不存储图片
              },
            };
          } else if (item.type === "recipe" && item.recipe) {
            return {
              ...item,
              recipe: {
                ...item.recipe,
                image: null, // 不存储图片
              },
            };
          }
          return item;
        });
      }

      // 转换为JSON，检查大小
      const jsonString = JSON.stringify(cleanUser);
      if (jsonString.length > 4000000) {
        // 接近localStorage的限制(通常为5MB)
        console.warn("用户数据过大，只保存关键信息");
        // 仅保存关键用户数据
        const essentialData = {
          name: cleanUser.name,
          email: cleanUser.email,
          credits: cleanUser.credits,
          access_token: cleanUser.access_token,
          refresh_token: cleanUser.refresh_token,
          // 不保存历史记录
        };
        localStorage.setItem("healthyDietUser", JSON.stringify(essentialData));
      } else {
        localStorage.setItem("healthyDietUser", jsonString);
      }
    } catch (error) {
      console.error("保存到localStorage失败:", error);
      // 如果完整保存失败，尝试只保存用户关键信息
      try {
        const minimalUserInfo = {
          name: state.user.name,
          email: state.user.email,
          credits: state.user.credits,
          access_token: state.user.access_token,
          refresh_token: state.user.refresh_token,
        };
        localStorage.setItem(
          "healthyDietUser",
          JSON.stringify(minimalUserInfo)
        );
      } catch (e) {
        console.error("保存最小用户信息也失败:", e);
      }
    }
  }
}

// Update history view
function updateHistoryView() {
  console.log("更新历史记录视图...");

  if (!state.user) {
    console.log("用户未登录，显示登录提示");
    const loginPrompt = document.getElementById("loginPrompt");
    const historyContent = document.getElementById("historyContent");

    if (loginPrompt && historyContent) {
      loginPrompt.style.display = "block";
      historyContent.style.display = "none";
    } else {
      console.error("未找到loginPrompt或historyContent元素");
    }
    return;
  }

  const loginPrompt = document.getElementById("loginPrompt");
  const historyContent = document.getElementById("historyContent");

  if (!loginPrompt || !historyContent) {
    console.error("未找到loginPrompt或historyContent元素");
    return;
  }

  loginPrompt.style.display = "none";
  historyContent.style.display = "block";

  // 获取过滤后的历史记录
  const filteredHistory = getFilteredHistory();
  console.log("过滤后的历史记录数量:", filteredHistory.length);

  // 计算分页信息
  const totalItems = filteredHistory.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / state.historyPageSize));
  state.historyPage = Math.min(state.historyPage, totalPages);

  // 更新分页UI
  const currentPageSpan = document.getElementById("currentPage");
  const totalPagesSpan = document.getElementById("totalPages");
  const prevPageBtn = document.getElementById("prevPageBtn");
  const nextPageBtn = document.getElementById("nextPageBtn");

  if (!currentPageSpan || !totalPagesSpan || !prevPageBtn || !nextPageBtn) {
    console.error("未找到分页UI元素");
    return;
  }

  currentPageSpan.textContent = state.historyPage;
  totalPagesSpan.textContent = totalPages;
  prevPageBtn.disabled = state.historyPage <= 1;
  nextPageBtn.disabled = state.historyPage >= totalPages;

  // 获取当前页的数据
  const startIndex = (state.historyPage - 1) * state.historyPageSize;
  const pageItems = filteredHistory.slice(
    startIndex,
    startIndex + state.historyPageSize
  );

  // 直接获取分析历史容器，不再有Recipe Browse标签
  const historyContainer = document.getElementById("analysisHistory");

  if (!historyContainer) {
    console.error("未找到历史记录容器: analysisHistory");
    return;
  }

  // 清空现有内容
  historyContainer.innerHTML = "";

  // 添加当前页的历史记录项
  if (pageItems.length > 0) {
    pageItems.forEach((item) => {
      // 只处理food analysis类型的记录，忽略recipe类型
      if (item.type !== "analysis") return;

      const historyItem = document.createElement("div");
      historyItem.className = "history-item";
      const itemId = item.food.id || JSON.stringify(item.food.name);
      historyItem.dataset.id = itemId;

      // 历史记录项不再显示图片
      historyItem.innerHTML = `
                    <div class="history-content">
                        <div class="history-date">${new Date(
                          item.date
                        ).toLocaleString()}</div>
                        <h3 class="history-title">${item.food.name}</h3>
                        <div class="history-meta">
                            <div><i class="fas fa-fire"></i> ${
                              item.food.calories
                            }</div>
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
                                ${item.food.isHealthy ? "健康选择" : "偶尔食用"}
                            </div>
                        </div>
                    </div>
                    <div class="history-actions">
                        <button class="btn-icon view-detail" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon delete-item" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;

      historyContainer.appendChild(historyItem);

      // 绑定查看详情和删除按钮事件
      const viewDetailBtn = historyItem.querySelector(".view-detail");
      const deleteItemBtn = historyItem.querySelector(".delete-item");

      viewDetailBtn.addEventListener("click", function (e) {
        e.stopPropagation(); // 防止冒泡到卡片
        showHistoryDetailModal(item);
      });

      deleteItemBtn.addEventListener("click", function (e) {
        e.stopPropagation(); // 防止冒泡到卡片
        showDeleteConfirmModal(itemId);
      });
    });
  } else {
    // 没有记录显示提示
    historyContainer.innerHTML = `<p style="text-align: center; padding: 20px;">没有食物分析记录</p>`;
  }
}

// 设置历史记录页面的事件监听器
function setupHistoryPageEvents() {
  console.log("设置历史记录页面事件...");

  // 不再需要标签切换按钮的事件处理
  // 分页控制
  const prevPageBtn = document.getElementById("prevPageBtn");
  const nextPageBtn = document.getElementById("nextPageBtn");
  const pageSizeSelect = document.getElementById("historyPageSize");

  if (prevPageBtn && nextPageBtn && pageSizeSelect) {
    prevPageBtn.addEventListener("click", function () {
      if (state.historyPage > 1) {
        state.historyPage--;
        updateHistoryView();
      }
    });

    nextPageBtn.addEventListener("click", function () {
      const totalPages = Math.ceil(
        getFilteredHistory().length / state.historyPageSize
      );
      if (state.historyPage < totalPages) {
        state.historyPage++;
        updateHistoryView();
      }
    });

    pageSizeSelect.addEventListener("change", function () {
      state.historyPageSize = parseInt(pageSizeSelect.value);
      state.historyPage = 1; // 重置到第一页
      updateHistoryView();
    });
  } else {
    console.error("未找到分页控制按钮");
  }

  // 搜索功能
  const searchInput = document.getElementById("historySearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      state.historySearchTerm = searchInput.value.toLowerCase();
      state.historyPage = 1; // 重置到第一页
      updateHistoryView();
    });
  } else {
    console.error("未找到搜索输入框");
  }

  // 清空历史按钮
  const clearHistoryBtn = document.getElementById("clearHistoryBtn");
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", function () {
      showDeleteConfirmModal("all");
    });
  } else {
    console.error("未找到清空历史按钮");
  }

  // 绑定详情和删除按钮的事件（会在updateHistoryView中动态绑定）

  // 确认删除弹窗
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

  if (cancelDeleteBtn && confirmDeleteBtn) {
    cancelDeleteBtn.addEventListener("click", function () {
      document.getElementById("deleteConfirmModal").style.display = "none";
    });

    confirmDeleteBtn.addEventListener("click", function () {
      const itemToDelete = state.itemToDelete;
      if (itemToDelete === "all") {
        // 清空所有历史
        if (state.user) {
          state.user.history = [];
          updateLocalStorage();
          showNotification("History cleared", "success");
        }
      } else {
        // 删除特定的历史记录
        if (state.user && state.user.history.length > 0) {
          state.user.history = state.user.history.filter((item) => {
            if (item.type === "analysis" && item.food.id === itemToDelete)
              return false;
            if (item.type === "recipe" && item.recipe.id === itemToDelete)
              return false;
            return true;
          });
          updateLocalStorage();
          showNotification("Record deleted", "success");
        }
      }

      document.getElementById("deleteConfirmModal").style.display = "none";
      updateHistoryView();
    });
  } else {
    console.error("未找到确认删除弹窗按钮");
  }

  // 关闭详情弹窗
  const closeDetailBtn = document.getElementById("closeDetailBtn");
  if (closeDetailBtn) {
    closeDetailBtn.addEventListener("click", function () {
      document.getElementById("historyDetailModal").style.display = "none";
    });
  } else {
    console.error("未找到关闭详情弹窗按钮");
  }

  // 初始化历史记录状态
  if (!state.historyPage) {
    state.historyPage = 1;
    state.historyPageSize = 10;
    state.historySearchTerm = "";
  }
}

// 显示删除确认弹窗
function showDeleteConfirmModal(itemId) {
  state.itemToDelete = itemId;
  const modal = document.getElementById("deleteConfirmModal");
  modal.style.display = "flex";
}

// 显示历史记录详情弹窗
function showHistoryDetailModal(item) {
  // 使用新的modal弹窗展示详情
  if (item.type === "recipe") {
    // 对于食谱类型，使用新的食谱详情弹窗
    const recipeData = {
      id: item.recipe.id,
      title: item.recipe.name,
      image:
        item.recipe.image ||
        "https://images.unsplash.com/photo-1484723091739-30a097e8f929", // 默认图片
      calories: item.recipe.calories,
      protein: item.recipe.protein,
      carbs: item.recipe.carbs,
      fat: item.recipe.fat,
      time: item.recipe.time,
      healthTips: item.recipe.healthTips,
      ingredients: item.recipe.ingredients,
      steps: item.recipe.steps,
    };
    showRecipeDetailsModal(recipeData);
  } else {
    // 对于食物分析类型，使用老的历史记录弹窗，但更新文本为英文
    const modal = document.getElementById("historyDetailModal");
    const detailTitle = document.getElementById("detailTitle");
    const detailContent = document.getElementById("historyDetailContent");

    detailTitle.textContent = "Food Analysis Details";
    detailContent.innerHTML = `
      <div style="margin-bottom: 15px;">
        <h3 style="margin-bottom: 10px;">${item.food.name}</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 15px;">
          <span class="result-tag">${item.food.calories}</span>
          <span class="result-tag ${
            item.food.isHealthy ? "tag-success" : "tag-warning"
          }">
            ${item.food.isHealthy ? "Healthy Choice" : "Occasional Consumption"}
          </span>
        </div>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 10px 0;">
          <p style="margin: 0; line-height: 1.6;">${item.food.analysis}</p>
        </div>
      </div>
      <div>
        <p style="color: #666; font-size: 0.9em;">Analysis Time: ${new Date(
          item.date
        ).toLocaleString()}</p>
      </div>
    `;

    modal.style.display = "flex";
  }
}

// 显示食谱详情弹窗 - 新增函数
function showRecipeDetailsModal(recipe) {
  const modal = document.getElementById("recipeDetailsModal");

  if (!modal) {
    console.error("Recipe details modal not found");
    return;
  }

  // 填充弹窗内容
  document.getElementById("modalRecipeTitle").textContent = recipe.title;
  document.getElementById("modalRecipeImage").src = recipe.image;
  document.getElementById("modalRecipeCalories").textContent = recipe.calories;
  document.getElementById("modalRecipeProtein").textContent = recipe.protein;
  document.getElementById("modalRecipeCarbs").textContent = recipe.carbs;
  document.getElementById("modalRecipeFat").textContent = recipe.fat;
  document.getElementById("modalRecipeTime").textContent = recipe.time;
  document.getElementById("modalRecipeHealthTips").textContent =
    recipe.healthTips;

  // 填充食材列表
  const ingredientsList = document.getElementById("modalRecipeIngredients");
  ingredientsList.innerHTML = "";
  recipe.ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.textContent = ingredient;
    ingredientsList.appendChild(li);
  });

  // 填充步骤列表
  const stepsList = document.getElementById("modalRecipeSteps");
  stepsList.innerHTML = "";
  recipe.steps.forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    stepsList.appendChild(li);
  });

  // 显示弹窗
  modal.style.display = "flex";
}

// 获取过滤后的历史记录
function getFilteredHistory() {
  if (!state.user || !state.user.history) return [];

  return state.user.history.filter((item) => {
    // 只返回分析类型的历史记录
    if (item.type !== "analysis") return false;

    // 搜索筛选
    if (state.historySearchTerm) {
      const name = item.food.name;
      return name.toLowerCase().includes(state.historySearchTerm.toLowerCase());
    }

    return true;
  });
}

// Initialize the app
// 全局错误处理 - 拦截localStorage异常
function setupStorageErrorHandling() {
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function (key, value) {
    try {
      originalSetItem.apply(this, arguments);
    } catch (e) {
      console.error(`localStorage.setItem 失败 [${key}]:`, e);
      showNotification(
        "Your browser storage is full. Some data may not be saved.",
        "warning"
      );

      // 如果是healthyDietUser导致的错误，尝试保存最小用户信息
      if (key === "healthyDietUser" && typeof value === "string") {
        try {
          const userData = JSON.parse(value);
          const minimalUserInfo = {
            name: userData.name || "",
            email: userData.email || "",
            credits:
              typeof userData.credits === "number" ? userData.credits : 0,
            access_token: userData.access_token || "",
          };
          const minimalJsonString = JSON.stringify(minimalUserInfo);
          // 尝试使用原始方法保存最小数据
          originalSetItem.call(this, key, minimalJsonString);
          console.log("成功保存了最小用户信息");
        } catch (innerError) {
          console.error("即使是最小用户信息也无法保存:", innerError);
        }
      }
    }
  };
}

function init() {
  console.log("初始化应用程序...");

  // 设置Storage错误处理
  setupStorageErrorHandling();

  // 确保所有视图元素都正确初始化
  elements.views = {
    home: document.getElementById("homeView"),
    analysis: document.getElementById("analysisView"),
    recipe: document.getElementById("recipeDetailView"),
    pricing: document.getElementById("pricingView"),
    history: document.getElementById("historyView"),
    auth: document.getElementById("authView"),
  };

  // 检查视图元素是否全部正确获取
  Object.entries(elements.views).forEach(([name, element]) => {
    if (!element) {
      console.error(`视图元素 ${name} 未找到`);
    }
  });

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
  setupHistoryPageEvents(); // 添加历史记录页面事件处理

  console.log("应用程序初始化完成");

  // 为History导航链接添加点击事件
  console.log("为History导航链接添加点击事件");
  const historyLinks = document.querySelectorAll(".nav-history");
  historyLinks.forEach((link) => {
    console.log("找到History链接:", link);
    link.addEventListener("click", function (e) {
      console.log("点击了History链接");
      e.preventDefault();
      showView("history");
      updateHistoryView();
    });
  });

  // 绑定静态页面中的"View Details"按钮
  console.log("绑定静态的View Details按钮");
  document.querySelectorAll(".view-recipe-details").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const recipeId = this.getAttribute("data-recipe-id");
      if (recipeId) {
        // 查找对应的食谱
        const recipe = recipes.find((r) => r.id == recipeId);
        if (recipe) {
          showRecipeDetailsModal({
            id: recipe.id,
            title: recipe.name,
            image: recipe.image || "",
            calories: recipe.calories,
            protein: recipe.protein,
            carbs: recipe.carbs,
            fat: recipe.fat,
            time: recipe.time,
            healthTips: recipe.healthTips,
            ingredients: recipe.ingredients.map((ingredient) =>
              ingredient.replace(/^\d+\.\s*/, "")
            ),
            steps: recipe.steps.map((step) => step.replace(/^\d+\.\s*/, "")),
          });
        }
      }
    });
  });
}

// Run initialization when DOM is loaded
document.addEventListener("DOMContentLoaded", init);

// 添加全局事件委托，确保所有View Details按钮都能正确工作
document.addEventListener("click", function (e) {
  // 处理所有view-recipe-details按钮点击
  if (e.target.closest(".view-recipe-details")) {
    e.preventDefault();
    const detailLink = e.target.closest(".view-recipe-details");
    const recipeId = detailLink.getAttribute("data-recipe-id");
    if (recipeId) {
      const recipe = recipes.find((r) => r.id == recipeId);
      if (recipe) {
        showRecipeDetailsModal({
          id: recipe.id,
          title: recipe.name,
          image: recipe.image || "",
          calories: recipe.calories,
          protein: recipe.protein,
          carbs: recipe.carbs,
          fat: recipe.fat,
          time: recipe.time,
          healthTips: recipe.healthTips,
          ingredients: recipe.ingredients.map((ingredient) =>
            ingredient.replace(/^\d+\.\s*/, "")
          ),
          steps: recipe.steps.map((step) => step.replace(/^\d+\.\s*/, "")),
        });
      }
    }
  }

  // 处理历史记录中的详情按钮点击
  if (e.target.closest(".history-item .view-detail")) {
    e.preventDefault();
    e.stopPropagation(); // 防止冒泡到父元素

    const historyItem = e.target.closest(".history-item");
    if (historyItem) {
      const itemId = historyItem.getAttribute("data-id");

      // 从历史记录中找到对应的项目
      if (state.user && state.user.history) {
        const item = state.user.history.find((item) => {
          if (item.type === "analysis" && item.food.id === itemId) return true;
          if (item.type === "recipe" && item.recipe.id == itemId) return true;
          return false;
        });

        if (item) {
          showHistoryDetailModal(item);
        }
      }
    }
  }

  // 处理食谱详情弹窗关闭按钮点击
  if (e.target.closest("#recipeDetailsModal button.btn-outline")) {
    e.preventDefault();
    document.getElementById("recipeDetailsModal").style.display = "none";
  }

  // 处理历史记录详情弹窗关闭按钮点击
  if (e.target.closest("#historyDetailModal #closeDetailBtn")) {
    e.preventDefault();
    document.getElementById("historyDetailModal").style.display = "none";
  }
});

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
            // 确保使用API返回的积分值，如果没有则默认为0
            const credits =
              typeof userData.credits === "number" ? userData.credits : 0;
            console.log("API返回的积分值:", credits);

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
                credits: credits, // 使用API返回的积分值
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
// 初始化时运行
document.addEventListener("DOMContentLoaded", function () {
  // 更改界面中的中文文本为英文
  // 分析结果视图文本修改
  const safeSetText = (selector, text) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  };

  const safeSetHTML = (selector, html) => {
    const element = document.querySelector(selector);
    if (element) element.innerHTML = html;
  };

  // 分析结果视图文本修改
  safeSetText("#analyzedFoodName", "Food Name");
  safeSetText("#foodHealthTag", "Healthy Choice");
  safeSetText(
    "#foodAnalysisText",
    "Analysis results will be displayed here..."
  );
  safeSetText("#recommendationsSection h3", "Recommended Healthy Recipes");
  safeSetHTML(
    "#backToHomeBtn",
    '<i class="fas fa-arrow-left"></i> Back to Home'
  );

  // 历史记录视图文本修改
  safeSetText("#historyView .hero h1", "Your History");
  safeSetText(
    "#historyView .hero p",
    "View and access previously analyzed foods and browsed recipes."
  );
  safeSetText("#loginPrompt h2", "Please Login to View Your History");
  safeSetText(
    "#loginPrompt p",
    "Login to see all analysis records and browsed recipes"
  );
  safeSetText("#historyLoginBtn", "Login / Register");
  safeSetText("#analysisTabBtn", "Food Analysis");
  safeSetText("#recipeTabBtn", "Recipe Browse");

  const historySearchInput = document.querySelector("#historySearchInput");
  if (historySearchInput) historySearchInput.placeholder = "Search history...";

  safeSetHTML("#clearHistoryBtn", '<i class="fas fa-trash"></i> Clear History');

  // 食谱详情视图文本修改
  safeSetText(
    "#recipeDetailView .recipe-stats .stat-label:nth-child(2)",
    "Calories"
  );
  safeSetText(
    "#recipeDetailView .recipe-stats .stat-label:nth-child(4)",
    "Protein"
  );
  safeSetText(
    "#recipeDetailView .recipe-stats .stat-label:nth-child(6)",
    "Carbs"
  );
  safeSetText(
    "#recipeDetailView .recipe-stats .stat-label:nth-child(8)",
    "Fat"
  );
  safeSetText(
    "#recipeDetailView .recipe-stats .stat-label:nth-child(10)",
    "Minutes"
  );
  safeSetText(
    "#recipeDetailView .recipe-section h3:nth-of-type(1)",
    "Health Tips"
  );
  safeSetText(
    "#recipeDetailView .recipe-section h3:nth-of-type(2)",
    "Ingredients"
  );
  safeSetText("#recipeDetailView .recipe-section h3:nth-of-type(3)", "Steps");
  safeSetHTML("#backFromRecipeBtn", '<i class="fas fa-arrow-left"></i> Back');

  // 为每页的"View Details"按钮添加英文文本
  const detailButtons = document.querySelectorAll(".view-recipe-details");
  if (detailButtons.length > 0) {
    detailButtons.forEach((button) => {
      button.textContent = "View Details";
      // 不在此添加事件监听，让food/js/index.js处理
    });
  }
});

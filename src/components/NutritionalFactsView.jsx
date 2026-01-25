import { useState } from 'react'
import { ChevronDown, ChevronUp, Calculator, Info, TrendingUp, AlertTriangle, Zap, Activity, Clock, Search } from 'lucide-react'
import { restaurantData } from '../restaurantData'

const nutritionalData = [
    {
        restaurant: "85C Bakery Cafe",
        items: [
            {
                name: "Sea Salt Coffee",
                desc: "Iced coffee with salt cream",
                stats: { cal: 160, fat: 12, carbs: 8, fiber: 0, protein: 1 },
                velocity: 'Medium'
            }
        ]
    },
    {
        restaurant: "Amici's East Coast Pizzeria",
        items: [
            {
                name: "Skinny Crust Cheese Pizza (Slice)",
                desc: "Thin artisanal crust",
                stats: { cal: 210, fat: 8, carbs: 22, fiber: 1, protein: 9 },
                velocity: 'Medium'
            }
        ]
    },
    {
        restaurant: "Applebee's",
        items: [
            {
                name: "6oz Top Sirloin",
                desc: "Lean cut with broccoli",
                stats: { cal: 280, fat: 12, carbs: 1, fiber: 2, protein: 42 },
                velocity: 'Low'
            },
            {
                name: "Blackened Cajun Salmon",
                desc: "Healthy fats and protein",
                stats: { cal: 420, fat: 26, carbs: 2, fiber: 1, protein: 45 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Arby's",
        items: [
            {
                name: "9pc Premium Nuggets",
                desc: "High protein, moderate carb",
                stats: { cal: 470, fat: 23, carbs: 24, fiber: 2, protein: 38 },
                velocity: 'Medium'
            },
            {
                name: "Roast Chicken Salad",
                desc: "Lean protein with vegetables",
                stats: { cal: 250, fat: 14, carbs: 8, fiber: 3, protein: 25 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Arizmendi Bakery",
        items: [
            {
                name: "Veggie Pizza Slice",
                desc: "Sourdough crust, fresh veggies",
                stats: { cal: 280, fat: 12, carbs: 32, fiber: 4, protein: 10 },
                velocity: 'Medium'
            }
        ]
    },
    {
        restaurant: "Arsicault Bakery",
        items: [
            {
                name: "Ham and Cheese Croissant",
                desc: "Classic savory pastry",
                stats: { cal: 420, fat: 28, carbs: 32, fiber: 2, protein: 14 },
                velocity: 'Medium'
            }
        ]
    },
    {
        restaurant: "BJ's Restaurant & Brewhouse",
        items: [
            {
                name: "Enlightened Seared Ahi Tuna",
                desc: "Protein and greens focus",
                stats: { cal: 490, fat: 28, carbs: 12, fiber: 4, protein: 44 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Blaze Pizza",
        items: [
            {
                name: "Keto Crust (Slice)",
                desc: "Cauliflower/Mozzarella base",
                stats: { cal: 150, fat: 8, carbs: 4, fiber: 2, protein: 14 },
                velocity: 'Low'
            },
            {
                name: "Standard Crust (Slice)",
                desc: "White flour dough",
                stats: { cal: 120, fat: 2, carbs: 22, fiber: 1, protein: 4 },
                velocity: 'High'
            }
        ]
    },
    {
        restaurant: "Blue Bottle Coffee",
        items: [
            {
                name: "Cold Brew",
                desc: "Black, unsweetened",
                stats: { cal: 5, fat: 0, carbs: 0, fiber: 0, protein: 0 },
                velocity: 'Low'
            },
            {
                name: "New Orleans Iced Coffee",
                desc: "Pre-sweetened with cane sugar",
                stats: { cal: 150, fat: 6, carbs: 22, fiber: 0, protein: 3 },
                velocity: 'High'
            }
        ]
    },
    {
        restaurant: "Boba Guys",
        items: [
            {
                name: "Classic Milk Tea (No Sugar)",
                desc: "Black tea with milk, 0% sweetener",
                stats: { cal: 120, fat: 8, carbs: 4, fiber: 0, protein: 3 },
                velocity: 'Low'
            },
            {
                name: "Boba Pearls (Portion)",
                desc: "Tapioca pearls in syrup",
                stats: { cal: 220, fat: 0, carbs: 54, fiber: 1, protein: 0 },
                velocity: 'High'
            }
        ]
    },
    {
        restaurant: "Bob's Donut",
        items: [
            {
                name: "Plain Cake Donut",
                desc: "Smaller, non-glazed",
                stats: { cal: 260, fat: 12, carbs: 28, fiber: 1, protein: 3 },
                velocity: 'High'
            }
        ]
    },
    {
        restaurant: "Bojangles",
        items: [
            {
                name: "Grilled Chicken Breast (1pc)",
                desc: "Simple roasted protein",
                stats: { cal: 150, fat: 5, carbs: 1, fiber: 0, protein: 25 },
                velocity: 'Low'
            },
            {
                name: "Green Beans (Individual)",
                desc: "Slow carb vegetable side",
                stats: { cal: 40, fat: 2, carbs: 5, fiber: 2, protein: 2 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Boudin SF",
        items: [
            {
                name: "Clam Chowder (Bread Bowl)",
                desc: "1 cup soup + sourdough bowl",
                stats: { cal: 580, fat: 14, carbs: 87, fiber: 3, protein: 24 },
                velocity: 'High'
            }
        ]
    },
    {
        restaurant: "Burger King",
        items: [
            {
                name: "Whopper Jr. (No Bun/Mayo)",
                desc: "Simple burger patty",
                stats: { cal: 120, fat: 8, carbs: 4, fiber: 0, protein: 9 },
                velocity: 'Low'
            },
            {
                name: "Grilled Chicken Sandwich (No Bun)",
                desc: "Lean poultry option",
                stats: { cal: 140, fat: 4, carbs: 2, fiber: 0, protein: 27 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Burma Superstar",
        items: [
            {
                name: "Tea Leaf Salad",
                desc: "Tea leaves, nuts, beans, lettuce",
                stats: { cal: 450, fat: 35, carbs: 24, fiber: 10, protein: 12 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Chick-fil-A",
        items: [
            {
                name: "Grilled Nuggets (8ct)",
                desc: "Lean protein, very low carb",
                stats: { cal: 130, fat: 3, carbs: 1, fiber: 0, protein: 25 },
                velocity: 'Low'
            },
            {
                name: "Grilled Chicken Sandwich (No Bun)",
                desc: "Sandwich minus the bun",
                stats: { cal: 130, fat: 3.5, carbs: 4, fiber: 1, protein: 21 },
                velocity: 'Low'
            },
            {
                name: "Market Salad (Grilled Filet)",
                desc: "Fresh salad, no dressing",
                stats: { cal: 330, fat: 14, carbs: 26, fiber: 5, protein: 28 },
                velocity: 'Medium'
            },
            {
                name: "Kale Crunch Side",
                desc: "Healthy green side",
                stats: { cal: 120, fat: 9, carbs: 8, fiber: 2, protein: 3 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Chili's",
        items: [
            {
                name: "6oz Classic Sirloin + Avocado",
                desc: "Healthy fats to slow glucose",
                stats: { cal: 420, fat: 28, carbs: 13, fiber: 7, protein: 40 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Chipotle",
        items: [
            {
                name: "Salad Bowl (Custom)",
                desc: "Supergreens, steak, no rice/beans, guacamole",
                stats: { cal: 565, fat: 32, carbs: 42, fiber: 10, protein: 30 },
                velocity: 'Low'
            },
            {
                name: "Keto Salad Bowl",
                desc: "Low carb verified option",
                stats: { cal: 590, fat: 42, carbs: 15, fiber: 8, protein: 32 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Culver's",
        items: [
            {
                name: "Garden Fresco Salad (Grilled)",
                desc: "Balanced nutrient profile",
                stats: { cal: 360, fat: 17, carbs: 12, fiber: 4, protein: 42 },
                velocity: 'Low'
            },
            {
                name: "Beef Pot Roast Dinner",
                desc: "Whole food protein and veg",
                stats: { cal: 480, fat: 16, carbs: 20, fiber: 4, protein: 32 },
                velocity: 'Medium'
            }
        ]
    },
    {
        restaurant: "Dairy Queen",
        items: [
            {
                name: "Rotisserie-Style Chicken Bites",
                desc: "Non-breaded protein option",
                stats: { cal: 300, fat: 12, carbs: 11, fiber: 3, protein: 33 },
                velocity: 'Low'
            },
            {
                name: "Chicken BLT Salad",
                desc: "Low carb, high volume",
                stats: { cal: 210, fat: 10, carbs: 10, fiber: 3, protein: 24 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Dave's Hot Chicken",
        items: [
            {
                name: "Hot Chicken Tender (1pc)",
                desc: "Standard breaded tender",
                stats: { cal: 310, fat: 19, carbs: 12, fiber: 1, protein: 22 },
                velocity: 'Medium'
            },
            {
                name: "Dave's Sauce (Individual)",
                desc: "Signature dipping sauce",
                stats: { cal: 180, fat: 18, carbs: 4, fiber: 0, protein: 1 },
                velocity: 'Medium'
            },
            {
                name: "Kale Slaw",
                desc: "Healthier side option",
                stats: { cal: 90, fat: 7, carbs: 6, fiber: 2, protein: 1 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Dumpling Home",
        items: [
            {
                name: "Sautéed Spinach",
                desc: "Garlic base, very safe",
                stats: { cal: 120, fat: 8, carbs: 4, fiber: 3, protein: 2 },
                velocity: 'Low'
            },
            {
                name: "Pork Xiao Long Bao (1pc)",
                desc: "Soup dumpling",
                stats: { cal: 60, fat: 4, carbs: 6, fiber: 0, protein: 3 },
                velocity: 'High'
            }
        ]
    },
    {
        restaurant: "Dunkin'",
        items: [
            {
                name: "Egg & Cheese Wake-Up Wrap",
                desc: "Small tortilla, high protein",
                stats: { cal: 180, fat: 10, carbs: 14, fiber: 1, protein: 9 },
                velocity: 'Medium'
            }
        ]
    },
    {
        restaurant: "El Farolito",
        items: [
            {
                name: "Regular Burrito",
                desc: "Rice, beans, meat, salsa",
                stats: { cal: 490, fat: 10, carbs: 55, fiber: 6, protein: 12 },
                velocity: 'High'
            },
            {
                name: "Super Burrito",
                desc: "Adds cheese, sour cream, avocado",
                stats: { cal: 800, fat: 35, carbs: 85, fiber: 10, protein: 30 },
                velocity: 'High'
            }
        ]
    },
    {
        restaurant: "El Pollo Loco",
        items: [
            {
                name: "Keto Burrito",
                desc: "High fiber tortilla, chicken, avocado",
                stats: { cal: 440, fat: 28, carbs: 31, fiber: 21, protein: 35 },
                velocity: 'Low'
            },
            {
                name: "Double Chicken Fit Bowl",
                desc: "No rice, no beans",
                stats: { cal: 390, fat: 18, carbs: 12, fiber: 4, protein: 48 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Five Guys",
        items: [
            {
                name: "Little Cheeseburger (Bowl)",
                desc: "No bun, just patty and cheese",
                stats: { cal: 290, fat: 23, carbs: 1, fiber: 0, protein: 20 },
                velocity: 'Low'
            },
            {
                name: "Peanuts (1oz)",
                desc: "Snack while you wait",
                stats: { cal: 170, fat: 14, carbs: 5, fiber: 3, protein: 7 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Gott's Roadside",
        items: [
            {
                name: "California Burger (Lettuce Wrap)",
                desc: "No bun, includes avocado",
                stats: { cal: 480, fat: 38, carbs: 8, fiber: 4, protein: 28 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Hardee's / Carl's Jr.",
        items: [
            {
                name: "Low-Carb Breakfast Bowl",
                desc: "Eggs, meat, cheese, no carbs",
                stats: { cal: 660, fat: 54, carbs: 5, fiber: 0, protein: 36 },
                velocity: 'Low'
            },
            {
                name: "Charbroiled Chicken Club (No Bun)",
                desc: "Lean meat and bacon",
                stats: { cal: 310, fat: 16, carbs: 4, fiber: 0, protein: 34 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Humphry Slocombe",
        items: [
            {
                name: "Secret Breakfast (Single Scoop)",
                desc: "Bourbon and cornflakes",
                stats: { cal: 280, fat: 18, carbs: 31, fiber: 0, protein: 4 },
                velocity: 'High'
            }
        ]
    },
    {
        restaurant: "Ike's Love & Sandwiches",
        items: [
            {
                name: "Matt Cain (Lettuce Wrap)",
                desc: "Roast beef, turkey, salami, cheese",
                stats: { cal: 580, fat: 42, carbs: 8, fiber: 2, protein: 44 },
                velocity: 'Low'
            },
            {
                name: "Hades (Standard Bun)",
                desc: "Chicken, avocado, pepper jack",
                stats: { cal: 1250, fat: 65, carbs: 130, fiber: 6, protein: 34 },
                velocity: 'High'
            }
        ]
    },
    {
        restaurant: "In-N-Out",
        items: [
            {
                name: "Protein Style Hamburger",
                desc: "Lettuce wrapped",
                stats: { cal: 240, fat: 17, carbs: 11, fiber: 3, protein: 13 },
                velocity: 'Low'
            },
            {
                name: "Flying Dutchman",
                desc: "Two patties, two cheese slices, nothing else",
                stats: { cal: 380, fat: 28, carbs: 0, fiber: 0, protein: 30 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Jack in the Box",
        items: [
            {
                name: "Chicken Fajita Pita (No Pita)",
                desc: "Grilled meat and veggies",
                stats: { cal: 190, fat: 7, carbs: 4, fiber: 2, protein: 24 },
                velocity: 'Low'
            },
            {
                name: "Grilled Chicken Salad",
                desc: "Clean greens and protein",
                stats: { cal: 230, fat: 8, carbs: 12, fiber: 4, protein: 30 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Jamba Juice",
        items: [
            {
                name: "Vanilla Blue Sky (Small)",
                desc: "Coconut milk, pineapple, banana",
                stats: { cal: 210, fat: 6, carbs: 32, fiber: 2, protein: 2 },
                velocity: 'High'
            },
            {
                name: "Wheatgrass Shot",
                desc: "Pure juice",
                stats: { cal: 15, fat: 0, carbs: 2, fiber: 0, protein: 1 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Jimmy John's",
        items: [
            {
                name: "Turkey Tom Unwich",
                desc: "Lettuce wrapped turkey sandwich",
                stats: { cal: 310, fat: 20, carbs: 6, fiber: 1, protein: 29 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "KFC",
        items: [
            {
                name: "Grilled Chicken Breast",
                desc: "Zero carb entree",
                stats: { cal: 210, fat: 7, carbs: 0, fiber: 0, protein: 38 },
                velocity: 'Low'
            },
            {
                name: "Green Beans (Individual)",
                desc: "Low carb side",
                stats: { cal: 25, fat: 0, carbs: 4, fiber: 2, protein: 1 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Kitava",
        items: [
            {
                name: "Power Bowl (Chicken)",
                desc: "Wild rice, sweet potato, kale",
                stats: { cal: 610, fat: 32, carbs: 43, fiber: 8, protein: 38 },
                velocity: 'Medium'
            }
        ]
    },
    {
        restaurant: "La Taqueria",
        items: [
            {
                name: "Carnitas Taco (Soft)",
                desc: "Meat, salsa, no rice",
                stats: { cal: 210, fat: 12, carbs: 14, fiber: 2, protein: 18 },
                velocity: 'Medium'
            }
        ]
    },
    {
        restaurant: "Marugame Udon",
        items: [
            {
                name: "Kake Udon (Regular)",
                desc: "Standard udon noodles in broth",
                stats: { cal: 400, fat: 1, carbs: 66, fiber: 2, protein: 12 },
                velocity: 'High'
            }
        ]
    },
    {
        restaurant: "McDonald's",
        items: [
            {
                name: "Quarter Pounder (No Bun)",
                desc: "Burger patty with cheese, no bun",
                stats: { cal: 360, fat: 25, carbs: 9, fiber: 0, protein: 25 },
                velocity: 'Low'
            },
            {
                name: "Chicken McNuggets (6pc)",
                desc: "Moderate carb option",
                stats: { cal: 250, fat: 15, carbs: 15, fiber: 0, protein: 14 },
                velocity: 'Medium'
            }
        ]
    },
    {
        restaurant: "Mixt",
        items: [
            {
                name: "Mixt Cobb",
                desc: "Chicken, avocado, egg, bacon",
                stats: { cal: 745, fat: 58, carbs: 11, fiber: 6, protein: 48 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Mod Pizza",
        items: [
            {
                name: "Cauliflower Crust (Personal)",
                desc: "Higher fiber base",
                stats: { cal: 580, fat: 22, carbs: 64, fiber: 6, protein: 28 },
                velocity: 'Medium'
            }
        ]
    },
    {
        restaurant: "Olive Garden",
        items: [
            {
                name: "Herb-Grilled Salmon",
                desc: "Italian herbs and broccoli",
                stats: { cal: 460, fat: 28, carbs: 8, fiber: 5, protein: 45 },
                velocity: 'Low'
            },
            {
                name: "Chicken Piccata",
                desc: "Lemon garlic caper sauce",
                stats: { cal: 500, fat: 27, carbs: 10, fiber: 3, protein: 52 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Original Joe's",
        items: [
            {
                name: "Joe's Special",
                desc: "Spinach, ground beef, onions, eggs",
                stats: { cal: 520, fat: 38, carbs: 6, fiber: 4, protein: 42 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "PF Chang's",
        items: [
            {
                name: "Steamed Chicken & Broccoli",
                desc: "No sauce, no rice",
                stats: { cal: 350, fat: 8, carbs: 12, fiber: 4, protein: 55 },
                velocity: 'Low'
            },
            {
                name: "Orange Chicken",
                desc: "Full order with sauce",
                stats: { cal: 1100, fat: 45, carbs: 120, fiber: 2, protein: 50 },
                velocity: 'High'
            }
        ]
    },
    {
        restaurant: "Panda Express",
        items: [
            {
                name: "Super Greens",
                desc: "Cabbage, kale, broccoli blend",
                stats: { cal: 90, fat: 3, carbs: 10, fiber: 5, protein: 6 },
                velocity: 'Low'
            },
            {
                name: "Mushroom Chicken",
                desc: "Lighter chicken option",
                stats: { cal: 170, fat: 9, carbs: 11, fiber: 1, protein: 12 },
                velocity: 'Medium'
            }
        ]
    },
    {
        restaurant: "Popeyes",
        items: [
            {
                name: "Blackened Tenders (3pc)",
                desc: "Non-breaded spicy tenders",
                stats: { cal: 170, fat: 2, carbs: 2, fiber: 0, protein: 26 },
                velocity: 'Low'
            },
            {
                name: "Green Beans (Regular)",
                desc: "Fiber rich side",
                stats: { cal: 60, fat: 2, carbs: 7, fiber: 2, protein: 3 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Punjab Cafe",
        items: [
            {
                name: "Tandoori Chicken",
                desc: "Roasted in clay oven, no heavy sauce",
                stats: { cal: 280, fat: 12, carbs: 4, fiber: 1, protein: 38 },
                velocity: 'Low'
            },
            {
                name: "Saag Paneer",
                desc: "Spinach and cheese (half portion)",
                stats: { cal: 240, fat: 18, carbs: 9, fiber: 4, protein: 12 },
                velocity: 'Low'
            },
            {
                name: "Garlic Naan (1 piece)",
                desc: "High carb wheat bread",
                stats: { cal: 350, fat: 10, carbs: 55, fiber: 2, protein: 9 },
                velocity: 'High'
            }
        ]
    },
    {
        restaurant: "Raising Cane's",
        items: [
            {
                name: "Chicken Finger (1 pc)",
                desc: "Standard breaded chicken",
                stats: { cal: 130, fat: 7, carbs: 5, fiber: 0, protein: 13 },
                velocity: 'Medium'
            },
            {
                name: "Cane's Sauce",
                desc: "Diabetic trap",
                stats: { cal: 190, fat: 19, carbs: 6, fiber: 0, protein: 0 },
                velocity: 'Medium'
            }
        ]
    },
    {
        restaurant: "Red Robin",
        items: [
            {
                name: "Ensenada Chicken Platter",
                desc: "Grilled with side of broccoli",
                stats: { cal: 390, fat: 16, carbs: 12, fiber: 5, protein: 48 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Salt & Straw",
        items: [
            {
                name: "Sea Salt with Caramel (Single Scoop)",
                desc: "High fat artisanal",
                stats: { cal: 320, fat: 22, carbs: 34, fiber: 0, protein: 5 },
                velocity: 'High'
            }
        ]
    },
    {
        restaurant: "Shake Shack",
        items: [
            {
                name: "ShackBurger (Lettuce Wrap)",
                desc: "High fat, nearly zero carb",
                stats: { cal: 320, fat: 24, carbs: 2, fiber: 1, protein: 21 },
                velocity: 'Low'
            },
            {
                name: "Chicken Shack (Lettuce Wrap)",
                desc: "Crispy but low volume carb",
                stats: { cal: 380, fat: 21, carbs: 16, fiber: 2, protein: 28 },
                velocity: 'Medium'
            }
        ]
    },
    {
        restaurant: "Sonic Drive-In",
        items: [
            {
                name: "Grilled Chicken Sandwich (No Bun)",
                desc: "Classic protein, lettuce wrapped",
                stats: { cal: 280, fat: 12, carbs: 3, fiber: 1, protein: 32 },
                velocity: 'Low'
            },
            {
                name: "3-Piece Crispy Tenders",
                desc: "Moderate breaded option",
                stats: { cal: 350, fat: 12, carbs: 16, fiber: 1, protein: 21 },
                velocity: 'Medium'
            }
        ]
    },
    {
        restaurant: "Souvla",
        items: [
            {
                name: "Chicken Salad",
                desc: "No pita, extra greens",
                stats: { cal: 720, fat: 60, carbs: 8, fiber: 2, protein: 33 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Square Pie Guys",
        items: [
            {
                name: "Keto Crust Pizza",
                desc: "Coconut flour/egg base (Whole)",
                stats: { cal: 520, fat: 33, carbs: 32, fiber: 28, protein: 25 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Starbucks",
        items: [
            {
                name: "Nitro Cold Brew",
                desc: "Unsweetened, smooth coffee",
                stats: { cal: 5, fat: 0, carbs: 0, fiber: 0, protein: 0 },
                velocity: 'Low'
            },
            {
                name: "Bacon & Gruyère Egg Bites",
                desc: "High protein breakfast",
                stats: { cal: 300, fat: 20, carbs: 9, fiber: 0, protein: 19 },
                velocity: 'Low'
            },
            {
                name: "Egg White & Roasted Red Pepper Bites",
                desc: "Lower cal option",
                stats: { cal: 170, fat: 8, carbs: 11, fiber: 0, protein: 12 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Subway",
        items: [
            {
                name: "Veggie Delite Salad",
                desc: "No dressing base",
                stats: { cal: 60, fat: 1, carbs: 11, fiber: 4, protein: 3 },
                velocity: 'Low'
            },
            {
                name: "Protein Bowl (Generic)",
                desc: "Sub ingredients in a bowl",
                stats: { cal: 250, fat: 13.5, carbs: 7, fiber: 1, protein: 27 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Super Duper Burgers",
        items: [
            {
                name: "Mini Burger (Lettuce Wrap)",
                desc: "No bun, no cheese",
                stats: { cal: 220, fat: 22, carbs: 3, fiber: 1, protein: 20 },
                velocity: 'Low'
            },
            {
                name: "Veggie Burger",
                desc: "Portobello mushroom base",
                stats: { cal: 330, fat: 10, carbs: 42, fiber: 8, protein: 14 },
                velocity: 'Medium'
            }
        ]
    },
    {
        restaurant: "Sweetgreen",
        items: [
            {
                name: "Kale Caesar",
                desc: "No croutons, extra greens",
                stats: { cal: 400, fat: 32, carbs: 12, fiber: 4, protein: 22 },
                velocity: 'Low'
            },
            {
                name: "Harvest Bowl",
                desc: "Rice, sweet potato, apples",
                stats: { cal: 700, fat: 35, carbs: 75, fiber: 12, protein: 32 },
                velocity: 'Medium'
            }
        ]
    },
    {
        restaurant: "Taco Bell",
        items: [
            {
                name: "Cantina Chicken Bowl (Custom)",
                desc: "No rice, extra black beans, light sour cream",
                stats: { cal: 380, fat: 16, carbs: 47, fiber: 12, protein: 12 },
                velocity: 'Low'
            },
            {
                name: "Power Menu Bowl",
                desc: "High protein, fiber rich",
                stats: { cal: 460, fat: 20, carbs: 40, fiber: 8, protein: 26 },
                velocity: 'Low'
            },
            {
                name: "Fresco Crunchy Beef Taco",
                desc: "Standard crunchy taco, fresco style",
                stats: { cal: 140, fat: 7, carbs: 14, fiber: 3, protein: 6 },
                velocity: 'Medium'
            },
            {
                name: "Black Beans & Rice",
                desc: "Simple side",
                stats: { cal: 160, fat: 4.5, carbs: 25, fiber: 4, protein: 4 },
                velocity: 'Medium'
            }
        ]
    },
    {
        restaurant: "The Cheese Steak Shop",
        items: [
            {
                name: "Chicken Cheesesteak (Bowl)",
                desc: "No roll, extra onions/peppers",
                stats: { cal: 310, fat: 20, carbs: 31, fiber: 2, protein: 25 },
                velocity: 'Medium'
            }
        ]
    },
    {
        restaurant: "Togo's",
        items: [
            {
                name: "#9 Hot Pastrami (Salad Bowl)",
                desc: "Pastrami on greens, no bread",
                stats: { cal: 380, fat: 28, carbs: 12, fiber: 4, protein: 32 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Urban Plates",
        items: [
            {
                name: "Grass-Fed Steak (4.5oz)",
                desc: "Grilled, no glaze",
                stats: { cal: 250, fat: 11, carbs: 0, fiber: 0, protein: 37 },
                velocity: 'Low'
            },
            {
                name: "Grilled Wild Ahi Tuna",
                desc: "Seared",
                stats: { cal: 130, fat: 2, carbs: 2, fiber: 0, protein: 27 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Wendy's",
        items: [
            {
                name: "Apple Bites",
                desc: "Fresh fruit side",
                stats: { cal: 35, fat: 0, carbs: 9, fiber: 1, protein: 0 },
                velocity: 'Medium'
            },
            {
                name: "Chili (Small)",
                desc: "Protein rich side",
                stats: { cal: 240, fat: 11, carbs: 22, fiber: 6, protein: 16 },
                velocity: 'Medium'
            },
            {
                name: "Grilled Chicken (No Bun)",
                desc: "Lettuce wrapped",
                stats: { cal: 290, fat: 8, carbs: 2, fiber: 0, protein: 33 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Whataburger",
        items: [
            {
                name: "Grilled Chicken Salad",
                desc: "Fiber-rich leafy greens",
                stats: { cal: 310, fat: 13, carbs: 12, fiber: 4, protein: 34 },
                velocity: 'Low'
            },
            {
                name: "Whatachick'n Bites (6pc)",
                desc: "Smaller portion breaded chicken",
                stats: { cal: 340, fat: 16, carbs: 14, fiber: 1, protein: 22 },
                velocity: 'Medium'
            }
        ]
    },
    {
        restaurant: "Wingstop",
        items: [
            {
                name: "Jumbo Wings (Plain/Dry Rub)",
                desc: "Bone-in, non-breaded (2 wings)",
                stats: { cal: 140, fat: 8, carbs: 1, fiber: 0, protein: 15 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "World Famous HotBoys",
        items: [
            {
                name: "Chicken Tenders (3pc)",
                desc: "Breaded spicy chicken",
                stats: { cal: 680, fat: 42, carbs: 36, fiber: 2, protein: 48 },
                velocity: 'Medium'
            }
        ]
    },
    {
        restaurant: "Yard House",
        items: [
            {
                name: "Blackened Ahi Sashimi",
                desc: "Pure protein, very safe",
                stats: { cal: 310, fat: 8, carbs: 12, fiber: 4, protein: 48 },
                velocity: 'Low'
            }
        ]
    },
    {
        restaurant: "Zaxby's",
        items: [
            {
                name: "Grilled House Zalad (No Toast)",
                desc: "Massive salad, low carb",
                stats: { cal: 410, fat: 22, carbs: 9, fiber: 5, protein: 40 },
                velocity: 'Low'
            },
            {
                name: "Traditional Wings (5pc, No Sauce)",
                desc: "Bone-in, zero breading",
                stats: { cal: 380, fat: 26, carbs: 0, fiber: 0, protein: 38 },
                velocity: 'Low'
            }
        ]
    }
]

export function NutritionalFactsView() {
    const [expandedItem, setExpandedItem] = useState(null)
    const [bolusInput, setBolusInput] = useState({ carbRatio: 10, currentGlucose: 100, targetGlucose: 100, isf: 50 })
    const [quickSearch, setQuickSearch] = useState('')
    const [showQuickRef, setShowQuickRef] = useState(true)

    const calculateBolus = (carbs) => {
        const carbDose = carbs / bolusInput.carbRatio
        const correctionDose = (bolusInput.currentGlucose - bolusInput.targetGlucose) / bolusInput.isf
        return Math.max(0, carbDose + correctionDose).toFixed(2)
    }

    const velocityLabel = (v) => {
        if (v === 'Low') return 'Low (Slow & Steady)'
        if (v === 'Medium') return 'Medium (Moderate Rise)'
        return 'High (Rapid Spike)'
    }

    // Helper to find carb count for a "Safe Bet"
    const getSafeBetCarbs = (restaurantName, greenItem) => {
        const lowerGreen = greenItem.toLowerCase()
        const restaurant = nutritionalData.find(r => r.restaurant === restaurantName)

        if (restaurant) {
            // Fuzzy search: find an item that shares significant words
            const greenWords = lowerGreen.split(' ').filter(w => w.length > 3)
            const item = restaurant.items.find(i => {
                const itemWords = i.name.toLowerCase().split(' ')
                return greenWords.some(gw => itemWords.some(iw => iw.includes(gw) || gw.includes(iw))) ||
                    lowerGreen.includes(i.name.toLowerCase()) ||
                    i.name.toLowerCase().includes(lowerGreen.split('(')[0].trim())
            })
            if (item) return { carbs: item.stats.carbs, velocity: item.velocity }
        }

        // Comprehensive Research-Based Estimates for all specific "Safe Bet" items in restaurantData
        const specificEstimates = {
            "85C Bakery Cafe": { carbs: 8, velocity: "Medium" },
            "Amici's East Coast Pizzeria": { carbs: 22, velocity: "Medium" },
            "Applebee's": { carbs: 1, velocity: "Low" },
            "Arby's": { carbs: 24, velocity: "Medium" },
            "Arizmendi Bakery": { carbs: 32, velocity: "Medium" },
            "Arsicault Bakery": { carbs: 32, velocity: "Medium" },
            "Asha Tea House": { carbs: 0, velocity: "Low" },
            "Bake Sum": { carbs: 32, velocity: "Medium" },
            "BJ's Restaurant & Brewhouse": { carbs: 12, velocity: "Low" },
            "Blaze Pizza": { carbs: 4, velocity: "Low" },
            "Blue Bottle Coffee": { carbs: 0, velocity: "Low" },
            "Bob's Donut": { carbs: 28, velocity: "High" },
            "Boba Guys": { carbs: 4, velocity: "Low" },
            "Bojangles": { carbs: 6, velocity: "Low" },
            "Boudin SF": { carbs: 12, velocity: "Low" },
            "Burger King": { carbs: 4, velocity: "Low" },
            "Burma Superstar": { carbs: 24, velocity: "Low" },
            "Chick-fil-A": { carbs: 1, velocity: "Low" },
            "Chili's": { carbs: 13, velocity: "Low" },
            "Chipotle": { carbs: 42, velocity: "Low" },
            "CREAM": { carbs: 18, velocity: "High" },
            "Culver's": { carbs: 12, velocity: "Low" },
            "Dairy Queen": { carbs: 11, velocity: "Low" },
            "Dave's Hot Chicken": { carbs: 6, velocity: "Low" },
            "Denny's": { carbs: 12, velocity: "Low" },
            "Dumpling Home": { carbs: 4, velocity: "Low" },
            "Dunkin'": { carbs: 14, velocity: "Medium" },
            "El Farolito": { carbs: 10, velocity: "Low" },
            "El Pollo Loco": { carbs: 31, velocity: "Low" },
            "Erik's DeliCafé": { carbs: 8, velocity: "Low" },
            "Farmhouse Kitchen Thai": { carbs: 10, velocity: "Medium" },
            "Fentons Creamery": { carbs: 55, velocity: "High" },
            "Five Guys": { carbs: 1, velocity: "Low" },
            "Gen Korean BBQ": { carbs: 2, velocity: "Low" },
            "Ghirardelli": { carbs: 4, velocity: "Low" },
            "Gong Cha": { carbs: 4, velocity: "Medium" },
            "Gott's Roadside": { carbs: 8, velocity: "Low" },
            "Hardee's / Carl's Jr.": { carbs: 5, velocity: "Low" },
            "House of Prime Rib": { carbs: 3, velocity: "Low" },
            "Humphry Slocombe": { carbs: 31, velocity: "High" },
            "Iguanas Burritozilla": { carbs: 24, velocity: "Medium" },
            "Ike's Love & Sandwiches": { carbs: 8, velocity: "Low" },
            "In-N-Out": { carbs: 11, velocity: "Low" },
            "Itea": { carbs: 0, velocity: "Low" },
            "Jack in the Box": { carbs: 4, velocity: "Low" },
            "Jamba Juice": { carbs: 32, velocity: "High" },
            "Jimmy John's": { carbs: 6, velocity: "Low" },
            "KFC": { carbs: 0, velocity: "Low" },
            "La Taqueria": { carbs: 14, velocity: "Medium" },
            "La Victoria Taqueria": { carbs: 5, velocity: "Medium" },
            "Lemonade": { carbs: 15, velocity: "Medium" },
            "Marugame Udon": { carbs: 35, velocity: "High" },
            "McDonald's": { carbs: 9, velocity: "Low" },
            "Mixt": { carbs: 5, velocity: "Low" },
            "Mod Pizza": { carbs: 32, velocity: "Medium" },
            "Olive Garden": { carbs: 8, velocity: "Low" },
            "Original Joe's": { carbs: 6, velocity: "Low" },
            "Osha Thai": { carbs: 8, velocity: "Low" },
            "Outback Steakhouse": { carbs: 5, velocity: "Low" },
            "Pacific Catch": { carbs: 8, velocity: "Low" },
            "Panda Express": { carbs: 10, velocity: "Low" },
            "Patxi's Pizza": { carbs: 24, velocity: "Medium" },
            "Peet's Coffee": { carbs: 0, velocity: "Low" },
            "PF Chang's": { carbs: 12, velocity: "Low" },
            "Pineapple King Bakery": { carbs: 40, velocity: "High" },
            "Pizza My Heart": { carbs: 26, velocity: "Medium" },
            "Popeyes": { carbs: 2, velocity: "Low" },
            "Punjab Cafe (San Jose)": { carbs: 12, velocity: "Low" },
            "Raising Cane's": { carbs: 8, velocity: "Medium" },
            "Red Lobster": { carbs: 0, velocity: "Low" },
            "Red Robin": { carbs: 12, velocity: "Low" },
            "Rooster & Rice": { carbs: 6, velocity: "Low" },
            "Round Table Pizza": { carbs: 22, velocity: "Medium" },
            "Salt & Straw / Bi-Rite": { carbs: 25, velocity: "High" },
            "San Francisco Soup Company": { carbs: 18, velocity: "Medium" },
            "San Tung": { carbs: 12, velocity: "Low" },
            "Shake Shack": { carbs: 2, velocity: "Low" },
            "Smitten Ice Cream": { carbs: 22, velocity: "High" },
            "Sonic Drive-In": { carbs: 3, velocity: "Low" },
            "Souvla": { carbs: 8, velocity: "Low" },
            "Square Pie Guys": { carbs: 4, velocity: "Low" },
            "Starbucks": { carbs: 0, velocity: "Low" },
            "Straw": { carbs: 4, velocity: "Low" },
            "Subway": { carbs: 7, velocity: "Low" },
            "Super Duper Burgers": { carbs: 3, velocity: "Low" },
            "SusieCakes": { carbs: 24, velocity: "High" },
            "Sushirrito": { carbs: 24, velocity: "Medium" },
            "Sweetgreen": { carbs: 12, velocity: "Low" },
            "Taco Bell": { carbs: 14, velocity: "Medium" },
            "Togo's": { carbs: 10, velocity: "Medium" },
            "The Bird": { carbs: 12, velocity: "Medium" },
            "The Cheesecake Factory": { carbs: 26, velocity: "Medium" },
            "The Habit Burger Grill": { carbs: 4, velocity: "Low" },
            "The Melt": { carbs: 4, velocity: "Low" },
            "Tony's Pizza Napoletana": { carbs: 45, velocity: "Medium" },
            "True Food Kitchen": { carbs: 4, velocity: "Low" },
            "U:Dessert Story": { carbs: 35, velocity: "High" },
            "Vini Curva Pizza": { carbs: 22, velocity: "Medium" },
            "Wendy's": { carbs: 2, velocity: "Low" },
            "Whataburger": { carbs: 12, velocity: "Low" },
            "Wingstop": { carbs: 1, velocity: "Low" },
            "World Famous HotBoys": { carbs: 24, velocity: "Medium" },
            "Yank Sing": { carbs: 5, velocity: "Low" },
            "Yard House": { carbs: 12, velocity: "Low" },
            "Zaxby's": { carbs: 9, velocity: "Low" }
        }

        if (specificEstimates[restaurantName]) {
            return specificEstimates[restaurantName]
        }

        // Expanded fallback keyword matching for items not in specific list
        if (lowerGreen.includes('nuggets')) return { carbs: 12, velocity: 'Medium' }
        if (lowerGreen.includes('salad')) return { carbs: 10, velocity: 'Low' }
        if (lowerGreen.includes('burger') && (lowerGreen.includes('no bun') || lowerGreen.includes('wrapped'))) return { carbs: 4, velocity: 'Low' }
        if (lowerGreen.includes('steak') || lowerGreen.includes('sirloin')) return { carbs: 2, velocity: 'Low' }
        if (lowerGreen.includes('taco')) return { carbs: 14, velocity: 'Medium' }
        if (lowerGreen.includes('coffee') && lowerGreen.includes('no sugar')) return { carbs: 0, velocity: 'Low' }
        if (lowerGreen.includes('wings') && !lowerGreen.includes('boneless')) return { carbs: 0, velocity: 'Low' }
        if (lowerGreen.includes('salmon') || lowerGreen.includes('fish')) return { carbs: 0, velocity: 'Low' }
        if (lowerGreen.includes('chicken') && (lowerGreen.includes('grilled') || lowerGreen.includes('roasted'))) return { carbs: 0, velocity: 'Low' }
        if (lowerGreen.includes('tea') && lowerGreen.includes('0% sugar')) return { carbs: 0, velocity: 'Low' }
        if (lowerGreen.includes('pizza')) return { carbs: 24, velocity: 'Medium' }
        if (lowerGreen.includes('poke') || lowerGreen.includes('bowl')) return { carbs: 20, velocity: 'Medium' }
        if (lowerGreen.includes('croissant') || lowerGreen.includes('pastry')) return { carbs: 32, velocity: 'Medium' }

        return { carbs: '?', velocity: 'Low' }
    }

    const quickRefData = restaurantData.map(r => ({
        ...r,
        safeBetInfo: getSafeBetCarbs(r.name, r.green)
    })).filter(r =>
        r.name.toLowerCase().includes(quickSearch.toLowerCase()) ||
        r.green.toLowerCase().includes(quickSearch.toLowerCase())
    )

    return (
        <div className="space-y-6" >
            {/* Quick Reference Guide Module */}
            <div className="bg-white rounded-2xl border border-blue-200 overflow-hidden shadow-sm">
                <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Calculator className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg leading-tight text-left">Quick Carb Reference</h3>
                            <p className="text-blue-100 text-xs font-medium text-left">Safe Bet items for insulin dosing</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowQuickRef(!showQuickRef)}
                        className="text-blue-100 hover:text-white transition-colors"
                    >
                        {showQuickRef ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </div>

                {showQuickRef && (
                    <div className="p-4 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search all 128+ restaurants..."
                                value={quickSearch}
                                onChange={(e) => setQuickSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                            {quickRefData.map((r, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-all">
                                    <div className="min-w-0 flex-1">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter truncate">{r.name}</div>
                                        <div className="text-sm font-bold text-slate-800 truncate leading-tight">{r.green}</div>
                                    </div>
                                    <div className="flex items-center gap-2 pl-3 ml-auto">
                                        <div className={`px-2 py-1 rounded-lg bg-white border border-slate-200 text-center min-w-[3.5rem]`}>
                                            <div className="text-sm font-black text-blue-600">{r.safeBetInfo.carbs}g</div>
                                            <div className="text-[8px] font-bold text-slate-400 uppercase">Carbs</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* GI Explanation Card */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="bg-slate-900 px-6 py-3 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider">Understanding Glycemic Impact (GI)</h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 p-2 bg-green-100 rounded-lg">
                            <Clock className="w-4 h-4 text-green-700" />
                        </div>
                        <div>
                            <div className="font-bold text-green-700 text-sm">Low GI</div>
                            <p className="text-xs text-slate-500 leading-relaxed">Energy is released slowly. Minimal impact on blood sugar levels.</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 p-2 bg-orange-100 rounded-lg">
                            <Zap className="w-4 h-4 text-orange-700" />
                        </div>
                        <div>
                            <div className="font-bold text-orange-700 text-sm">Medium GI</div>
                            <p className="text-xs text-slate-500 leading-relaxed">Moderate speed. Expect a manageable rise in glucose.</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 p-2 bg-red-100 rounded-lg">
                            <TrendingUp className="w-4 h-4 text-red-700" />
                        </div>
                        <div>
                            <div className="font-bold text-red-700 text-sm">High GI</div>
                            <p className="text-xs text-slate-500 leading-relaxed">Rapid absorption. Causes sharp spikes; use caution with bolus.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 items-center shadow-sm">
                <Info className="text-blue-600 shrink-0" />
                <p className="text-blue-800 text-sm font-medium">
                    Calculations are estimates. Always follow medical provider advice.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {nutritionalData.map((restaurant) => (
                    <div key={restaurant.restaurant} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="bg-slate-900 px-6 py-4">
                            <h2 className="text-xl font-bold text-white tracking-tight">{restaurant.restaurant}</h2>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {restaurant.items.map((item, idx) => (
                                <div key={idx} className="p-0">
                                    <button
                                        onClick={() => setExpandedItem(expandedItem === `${restaurant.restaurant}-${idx}` ? null : `${restaurant.restaurant}-${idx}`)}
                                        className="w-full text-left p-6 hover:bg-slate-50 transition-colors focus:outline-none group"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${item.velocity === 'Low' ? 'bg-green-100 text-green-700' :
                                                        item.velocity === 'Medium' ? 'bg-orange-100 text-orange-700' :
                                                            'bg-red-100 text-red-700'
                                                        }`}>
                                                        {velocityLabel(item.velocity)}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                                            </div>
                                            <div className="flex items-center gap-4 text-slate-400">
                                                <div className="text-right hidden sm:block">
                                                    <div className="text-lg font-black text-slate-900">{item.stats.carbs}g</div>
                                                    <div className="text-[10px] font-bold uppercase tracking-tighter">Carbs</div>
                                                </div>
                                                {expandedItem === `${restaurant.restaurant}-${idx}` ? <ChevronUp className="w-5 h-5 text-blue-500" /> : <ChevronDown className="w-5 h-5 text-slate-300" />}
                                            </div>
                                        </div>
                                    </button>

                                    {expandedItem === `${restaurant.restaurant}-${idx}` && (
                                        <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-200">
                                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                                                {[
                                                    { label: 'Calories', val: item.stats.cal, unit: 'kcal', color: 'slate' },
                                                    { label: 'Net Carbs', val: item.stats.carbs - item.stats.fiber, unit: 'g', color: 'blue' },
                                                    { label: 'Fiber', val: item.stats.fiber, unit: 'g', color: 'green' },
                                                    { label: 'Protein', val: item.stats.protein, unit: 'g', color: 'indigo' },
                                                    { label: 'Fat', val: item.stats.fat, unit: 'g', color: 'orange' }
                                                ].map((stat, i) => (
                                                    <div key={i} className={`bg-${stat.color}-50 p-3 rounded-xl border border-${stat.color}-100`}>
                                                        <div className={`text-xs font-bold text-${stat.color}-600 uppercase mb-1`}>{stat.label}</div>
                                                        <div className={`text-xl font-black text-${stat.color}-900`}>{stat.val}<span className="text-xs ml-0.5 opacity-60 uppercase">{stat.unit}</span></div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Bolus Calculator Mini-Widget */}
                                            <div className="bg-slate-900 rounded-2xl p-5 text-white overflow-hidden relative">
                                                <div className="flex justify-between items-center mb-4 relative z-10">
                                                    <div className="flex items-center gap-2">
                                                        <Calculator className="w-5 h-5 text-blue-400" />
                                                        <h4 className="font-bold uppercase tracking-widest text-xs">Sugar Scout Bolus Guide</h4>
                                                    </div>
                                                    <div className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-1 rounded border border-blue-500/30 uppercase font-bold">
                                                        Education Only
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
                                                    <div className="space-y-4">
                                                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                                                            <span className="text-xs text-slate-400 font-bold uppercase italic">Carb Ratio</span>
                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="number"
                                                                    value={bolusInput.carbRatio}
                                                                    onChange={(e) => setBolusInput({ ...bolusInput, carbRatio: Number(e.target.value) })}
                                                                    className="w-12 bg-white/10 rounded border-none text-right font-black text-blue-400 p-1"
                                                                />
                                                                <span className="text-[10px] font-bold text-slate-500">1:U</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                                                            <span className="text-xs text-slate-400 font-bold uppercase italic">Cur Glucose</span>
                                                            <input
                                                                type="number"
                                                                value={bolusInput.currentGlucose}
                                                                onChange={(e) => setBolusInput({ ...bolusInput, currentGlucose: Number(e.target.value) })}
                                                                className="w-16 bg-white/10 rounded border-none text-right font-black text-blue-400 p-1"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="bg-blue-600 rounded-2xl p-4 flex flex-col justify-center items-center relative overflow-hidden shadow-lg shadow-blue-900/50">
                                                        <div className="text-[10px] font-black uppercase opacity-80 mb-1">Suggested Dose</div>
                                                        <div className="text-4xl font-black">{calculateBolus(item.stats.carbs)}</div>
                                                        <div className="text-xs font-bold opacity-80">Units</div>
                                                        <TrendingUp className="absolute -right-4 -bottom-4 w-20 h-20 opacity-20 rotate-12" />
                                                    </div>
                                                </div>
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

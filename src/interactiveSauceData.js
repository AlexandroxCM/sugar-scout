// Interactive Sauce Data - 12 common sauces with sugar values and risk levels
// Used by the Interactive Sauce Analyzer feature

export const interactiveSauces = [
    {
        id: 'bbq',
        name: 'BBQ',
        icon: '🍖',
        sugar_value: 12,
        risk_level: 'High',
        tip: 'Scout Tip: This contains hidden corn syrup. Ask for it on the side or swap for Buffalo.'
    },
    {
        id: 'teriyaki',
        name: 'Teriyaki',
        icon: '🥢',
        sugar_value: 10,
        risk_level: 'High',
        tip: 'Scout Tip: Loaded with sugar for that glaze. Try soy sauce with ginger instead.'
    },
    {
        id: 'ketchup',
        name: 'Ketchup',
        icon: '🍅',
        sugar_value: 4,
        risk_level: 'Mid',
        tip: 'Moderate sugar content. One packet is usually fine, limit to two.'
    },
    {
        id: 'buffalo',
        name: 'Buffalo',
        icon: '🔥',
        sugar_value: 0,
        risk_level: 'Low',
        tip: 'Great choice! Vinegar and pepper based with zero sugar.'
    },
    {
        id: 'ranch',
        name: 'Ranch',
        icon: '🥛',
        sugar_value: 1,
        risk_level: 'Low',
        tip: 'Very low sugar. High in fat, which can help slow glucose absorption.'
    },
    {
        id: 'mayo',
        name: 'Mayo',
        icon: '🥚',
        sugar_value: 0,
        risk_level: 'Low',
        tip: 'Zero sugar! Fat-based sauces are your friend for blood sugar control.'
    },
    {
        id: 'honey_mustard',
        name: 'Honey Mustard',
        icon: '🍯',
        sugar_value: 8,
        risk_level: 'High',
        tip: 'Scout Tip: "Honey" means sugar. Swap for regular yellow mustard instead.'
    },
    {
        id: 'mustard',
        name: 'Mustard',
        icon: '🟡',
        sugar_value: 0,
        risk_level: 'Low',
        tip: 'Perfect choice! Classic mustard has virtually no sugar or carbs.'
    },
    {
        id: 'hot_sauce',
        name: 'Hot Sauce',
        icon: '🌶️',
        sugar_value: 0,
        risk_level: 'Low',
        tip: 'Excellent! Most hot sauces are sugar-free. Spice it up!'
    },
    {
        id: 'sweet_chili',
        name: 'Sweet Chili',
        icon: '🌶️',
        sugar_value: 11,
        risk_level: 'High',
        tip: 'Scout Tip: "Sweet" is the operative word here. It\'s basically candy.'
    },
    {
        id: 'thousand_island',
        name: 'Thousand Island',
        icon: '🏝️',
        sugar_value: 5,
        risk_level: 'Mid',
        tip: 'Contains some sugar from relish. Use sparingly or swap for ranch.'
    },
    {
        id: 'maple_syrup',
        name: 'Maple Syrup',
        icon: '🍁',
        sugar_value: 13,
        risk_level: 'High',
        tip: 'Scout Tip: Pure liquid sugar. If you must, use sugar-free alternatives.'
    }
];

// Helper functions
export const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
        case 'Low': return { bg: '#22C55E', text: '#166534', label: 'Low Sugar' };
        case 'Mid': return { bg: '#EAB308', text: '#854d0e', label: 'Moderate Sugar' };
        case 'High': return { bg: '#EF4444', text: '#991b1b', label: 'High Sugar' };
        default: return { bg: '#64748B', text: '#334155', label: 'Unknown' };
    }
};

export const getSugarCategory = (sugarValue) => {
    if (sugarValue <= 2) return 'Low';
    if (sugarValue <= 6) return 'Mid';
    return 'High';
};

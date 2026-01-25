import ReactGA from "react-ga4";

// Replace with your actual Measurement ID once you set up the GA4 property.
// For now, using a placeholder to demonstrate implementation.
const GA_MEASUREMENT_ID = "G-PHK608Q918";

export const initGA = () => {
    ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const trackPageView = (path) => {
    ReactGA.send({ hitType: "pageview", page: path });
};

export const trackEvent = (category, action, label) => {
    ReactGA.event({
        category: category,
        action: action,
        label: label,
    });
};

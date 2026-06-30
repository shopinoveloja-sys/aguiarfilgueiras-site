type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

type SocialNetwork = "instagram" | "facebook" | "youtube" | "x" | "linkedin";

const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

const ATTRIBUTION_STORAGE_KEY = "aguiar_attribution";

const getStoredAttribution = () => {
  try {
    return JSON.parse(sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) || "{}") as Record<string, string>;
  } catch {
    return {};
  }
};

const getAttributionParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const current = Object.fromEntries(UTM_PARAMS.map((param) => [param, searchParams.get(param) || ""]));
  const hasCurrentUtm = UTM_PARAMS.some((param) => current[param]);

  if (hasCurrentUtm) {
    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(current));
    return current;
  }

  return { ...current, ...getStoredAttribution() };
};

const createEventId = (event: string) =>
  `${event}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

const getTrafficAttribution = () => {
  const attribution = getAttributionParams();
  const utmSource = attribution.utm_source;
  const utmMedium = attribution.utm_medium;

  if (utmSource || utmMedium) {
    return {
      traffic_source: utmSource,
      traffic_medium: utmMedium,
    };
  }

  const referrer = document.referrer;

  if (!referrer) {
    return {
      traffic_source: "direct",
      traffic_medium: "none",
    };
  }

  try {
    const hostname = new URL(referrer).hostname.replace(/^www\./, "");

    if (hostname.includes("google.")) return { traffic_source: "google", traffic_medium: "organic" };
    if (hostname.includes("instagram.")) return { traffic_source: "instagram", traffic_medium: "social" };
    if (hostname.includes("facebook.") || hostname === "fb.com") {
      return { traffic_source: "facebook", traffic_medium: "social" };
    }
    if (hostname.includes("youtube.") || hostname === "youtu.be") {
      return { traffic_source: "youtube", traffic_medium: "video" };
    }
    if (hostname === "x.com" || hostname.includes("twitter.")) {
      return { traffic_source: "x", traffic_medium: "social" };
    }
    if (hostname.includes("linkedin.")) return { traffic_source: "linkedin", traffic_medium: "social" };

    return {
      traffic_source: hostname,
      traffic_medium: "referral",
    };
  } catch {
    return {
      traffic_source: "unknown",
      traffic_medium: "unknown",
    };
  }
};

const getBasePayload = (event: string) => ({
  event_id: createEventId(event),
  page_title: document.title,
  page_path: window.location.pathname,
  page_location: window.location.href,
  page_url: window.location.href,
  ...getTrafficAttribution(),
  ...getAttributionParams(),
});

export const trackEvent = (event: string, payload: AnalyticsPayload = {}) => {
  if (typeof window === "undefined") return;

  const dataLayerWindow = window as DataLayerWindow;
  dataLayerWindow.dataLayer = dataLayerWindow.dataLayer || [];
  dataLayerWindow.dataLayer.push({
    event,
    ...getBasePayload(event),
    ...payload,
  });
};

export const trackSocialClick = ({
  socialNetwork,
  linkUrl,
  buttonText,
  placement,
  contentType = "social_link",
  articleTitle,
}: {
  socialNetwork: SocialNetwork;
  linkUrl: string;
  buttonText: string;
  placement: string;
  contentType?: string;
  articleTitle?: string;
}) => {
  const specificEventByNetwork: Record<SocialNetwork, string> = {
    instagram: "instagram_click",
    facebook: "facebook_click",
    youtube: "youtube_click",
    x: "x_click",
    linkedin: "linkedin_click",
  };

  const payload = {
    social_network: socialNetwork,
    link_url: linkUrl,
    button_text: buttonText,
    placement,
    content_type: contentType,
    article_title: articleTitle,
  };

  trackEvent(specificEventByNetwork[socialNetwork], payload);
  trackEvent("social_profile_click", payload);
};

export const installEmbeddedVideoTracking = () => {
  if (typeof window === "undefined") return;

  const trackingWindow = window as DataLayerWindow & { __aguiarVideoTrackingInstalled?: boolean };
  if (trackingWindow.__aguiarVideoTrackingInstalled) return;
  trackingWindow.__aguiarVideoTrackingInstalled = true;

  let lastTrackedAt = 0;

  document.addEventListener(
    "pointerdown",
    (event) => {
      const target = event.target as HTMLElement | null;
      const iframe = target?.closest?.("iframe[src*='youtube.com'], iframe[src*='youtu.be']");

      if (!iframe) return;

      const now = Date.now();
      if (now - lastTrackedAt < 2000) return;
      lastTrackedAt = now;

      trackEvent("embedded_video_click", {
        social_network: "youtube",
        link_url: iframe.getAttribute("src") || "",
        button_text: "video",
        content_type: "embedded_video",
        article_title: document.querySelector("h1")?.textContent?.trim() || "",
      });
    },
    true,
  );
};

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  __aguiarTrackingDisabled?: boolean;
};

type YouTubePlayer = {
  getDuration: () => number;
  getCurrentTime: () => number;
  getVideoUrl: () => string;
  destroy?: () => void;
};

type YouTubePlayerApiWindow = DataLayerWindow & {
  YT?: {
    Player: new (
      element: HTMLIFrameElement,
      options: {
        events?: {
          onReady?: (event: { target: YouTubePlayer }) => void;
          onStateChange?: (event: { data: number; target: YouTubePlayer }) => void;
        };
      },
    ) => YouTubePlayer;
    PlayerState: {
      UNSTARTED: number;
      ENDED: number;
      PLAYING: number;
      PAUSED: number;
      BUFFERING: number;
      CUED: number;
    };
  };
  onYouTubeIframeAPIReady?: () => void;
  __aguiarSocialTrackingInstalled?: boolean;
  __aguiarVideoTrackingInstalled?: boolean;
  __aguiarYouTubeApiLoading?: boolean;
  __aguiarYouTubeApiReady?: boolean;
};

type SocialNetwork = "instagram" | "facebook" | "youtube" | "x" | "linkedin";

const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

const ATTRIBUTION_STORAGE_KEY = "aguiar_attribution";
const INTERNAL_TRAFFIC_STORAGE_KEY = "aguiar_internal_traffic";

const isTrackingDisabled = () => {
  if (typeof window === "undefined") return true;

  const trackingWindow = window as DataLayerWindow;
  if (trackingWindow.__aguiarTrackingDisabled) return true;

  try {
    return window.localStorage.getItem(INTERNAL_TRAFFIC_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

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
  const gclid = new URLSearchParams(window.location.search).get("gclid") || "";

  if (utmSource || utmMedium) {
    return {
      traffic_source: utmSource,
      traffic_medium: utmMedium,
    };
  }

  if (gclid) {
    return {
      traffic_source: "google",
      traffic_medium: "cpc",
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
  if (isTrackingDisabled()) return;

  const dataLayerWindow = window as DataLayerWindow;
  dataLayerWindow.dataLayer = dataLayerWindow.dataLayer || [];
  dataLayerWindow.dataLayer.push({
    event,
    ...getBasePayload(event),
    ...payload,
  });
};

const detectSocialNetworkFromUrl = (url: string): SocialNetwork | null => {
  try {
    const hostname = new URL(url, window.location.origin).hostname.replace(/^www\./, "").toLowerCase();

    if (hostname.includes("instagram.")) return "instagram";
    if (hostname.includes("facebook.") || hostname === "fb.com") return "facebook";
    if (hostname.includes("youtube.") || hostname === "youtu.be") return "youtube";
    if (hostname === "x.com" || hostname.includes("twitter.")) return "x";
    if (hostname.includes("linkedin.")) return "linkedin";

    return null;
  } catch {
    return null;
  }
};

const getArticleTitle = () =>
  document.querySelector("article h1, main h1")?.textContent?.trim() ||
  document.querySelector("h1")?.textContent?.trim() ||
  "";

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
  if (socialNetwork === "youtube") {
    trackEvent("click_youtube", payload);
  }
  trackEvent("social_profile_click", payload);
};

export const installGlobalSocialTracking = () => {
  if (typeof window === "undefined") return;

  const trackingWindow = window as YouTubePlayerApiWindow;
  if (trackingWindow.__aguiarSocialTrackingInstalled) return;
  trackingWindow.__aguiarSocialTrackingInstalled = true;

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;

      if (!link) return;

      const socialNetwork = detectSocialNetworkFromUrl(link.href);
      if (!socialNetwork) return;
      if (link.dataset.socialTracked === "true") return;

      trackSocialClick({
        socialNetwork,
        linkUrl: link.href,
        buttonText: link.textContent?.trim() || socialNetwork,
        placement:
          link.dataset.placement ||
          link.closest("footer")?.tagName.toLowerCase() ||
          link.closest("header")?.tagName.toLowerCase() ||
          link.closest("article")?.tagName.toLowerCase() ||
          "page",
        contentType: link.dataset.contentType || "social_link",
        articleTitle: getArticleTitle(),
      });
    },
    true,
  );
};

export const installEmbeddedVideoTracking = () => {
  if (typeof window === "undefined") return;

  const trackingWindow = window as YouTubePlayerApiWindow;
  if (trackingWindow.__aguiarVideoTrackingInstalled) return;
  trackingWindow.__aguiarVideoTrackingInstalled = true;

  const playerStates = new WeakMap<
    HTMLIFrameElement,
    {
      started: boolean;
      completed: boolean;
      progress: Set<number>;
      timerId: number | null;
    }
  >();
  const players = new WeakMap<HTMLIFrameElement, YouTubePlayer>();

  const getVideoPayload = (iframe: HTMLIFrameElement, player: YouTubePlayer, progressPercent?: number) => ({
    social_network: "youtube",
    link_url: player.getVideoUrl?.() || iframe.src || "",
    button_text: iframe.dataset.videoTitle || "video",
    content_type: "embedded_video",
    article_title: getArticleTitle(),
    video_provider: "youtube",
    video_id: iframe.dataset.youtubeVideoId || "",
    video_title: iframe.dataset.videoTitle || "",
    video_duration: Number(player.getDuration?.() || 0),
    video_current_time: Number(player.getCurrentTime?.() || 0),
    video_percent: progressPercent,
    placement: iframe.dataset.placement || "blog_videos_page",
  });

  const stopTimer = (iframe: HTMLIFrameElement) => {
    const state = playerStates.get(iframe);
    if (state?.timerId) {
      window.clearInterval(state.timerId);
      state.timerId = null;
    }
  };

  const startProgressTimer = (iframe: HTMLIFrameElement, player: YouTubePlayer) => {
    const state = playerStates.get(iframe);
    if (!state || state.timerId) return;

    state.timerId = window.setInterval(() => {
      const duration = Number(player.getDuration?.() || 0);
      const currentTime = Number(player.getCurrentTime?.() || 0);
      if (!duration || !currentTime) return;

      const percent = Math.min(100, Math.round((currentTime / duration) * 100));
      const checkpoints = [25, 50, 75] as const;

      checkpoints.forEach((checkpoint) => {
        if (percent >= checkpoint && !state.progress.has(checkpoint)) {
          state.progress.add(checkpoint);
          trackEvent("video_progress", getVideoPayload(iframe, player, checkpoint));
        }
      });

      if (percent >= 95 && !state.completed) {
        state.completed = true;
        trackEvent("video_complete", getVideoPayload(iframe, player, 100));
        stopTimer(iframe);
      }
    }, 1000);
  };

  const bindPlayer = (iframe: HTMLIFrameElement) => {
    if (players.has(iframe) || !trackingWindow.YT?.Player) return;

    playerStates.set(iframe, {
      started: false,
      completed: false,
      progress: new Set<number>(),
      timerId: null,
    });

    const player = new trackingWindow.YT.Player(iframe, {
      events: {
        onReady: ({ target }) => {
          players.set(iframe, target);
        },
        onStateChange: ({ data, target }) => {
          const state = playerStates.get(iframe);
          if (!state) return;

          if (data === trackingWindow.YT?.PlayerState.PLAYING) {
            if (!state.started) {
              state.started = true;
              trackEvent("video_start", getVideoPayload(iframe, target, 0));
              trackEvent("embedded_video_click", getVideoPayload(iframe, target, 0));
            }
            startProgressTimer(iframe, target);
          }

          if (
            data === trackingWindow.YT?.PlayerState.PAUSED ||
            data === trackingWindow.YT?.PlayerState.BUFFERING ||
            data === trackingWindow.YT?.PlayerState.CUED
          ) {
            stopTimer(iframe);
          }

          if (data === trackingWindow.YT?.PlayerState.ENDED && !state.completed) {
            state.completed = true;
            trackEvent("video_complete", getVideoPayload(iframe, target, 100));
            stopTimer(iframe);
          }
        },
      },
    });

    players.set(iframe, player);
  };

  const initEmbeds = () => {
    document
      .querySelectorAll<HTMLIFrameElement>("iframe[data-youtube-track='true'][data-youtube-video-id]")
      .forEach((iframe) => bindPlayer(iframe));
  };

  const markApiReady = () => {
    trackingWindow.__aguiarYouTubeApiReady = true;
    initEmbeds();
  };

  if (trackingWindow.__aguiarYouTubeApiReady && trackingWindow.YT?.Player) {
    initEmbeds();
  } else if (!trackingWindow.__aguiarYouTubeApiLoading) {
    trackingWindow.__aguiarYouTubeApiLoading = true;
    const previousReady = trackingWindow.onYouTubeIframeAPIReady;
    trackingWindow.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      markApiReady();
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  }

  const observer = new MutationObserver(() => {
    if (trackingWindow.__aguiarYouTubeApiReady) {
      initEmbeds();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

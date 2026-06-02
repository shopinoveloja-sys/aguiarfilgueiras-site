type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

export const trackEvent = (event: string, payload: AnalyticsPayload = {}) => {
  if (typeof window === "undefined") return;

  const dataLayerWindow = window as DataLayerWindow;
  dataLayerWindow.dataLayer = dataLayerWindow.dataLayer || [];
  dataLayerWindow.dataLayer.push({
    event,
    page_path: window.location.pathname,
    page_url: window.location.href,
    ...payload,
  });
};

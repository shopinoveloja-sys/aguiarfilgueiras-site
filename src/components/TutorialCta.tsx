import { toast } from "sonner";

const tutorialUrl = String(import.meta.env.VITE_TUTORIAL_URL || "").trim();

export function TutorialCta({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  const openTutorial = () => {
    if (!tutorialUrl) {
      toast.info("O tutorial rapido sera liberado em breve.");
      return;
    }

    window.open(tutorialUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={openTutorial}
      className={`w-full rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-left transition-colors active:scale-[0.99] hover:bg-emerald-500/15 ${compact ? "p-4" : "p-5"} ${className}`}
    >
      <div className="flex items-center gap-3">
        <span className={`material-symbols-outlined rounded-xl bg-emerald-500/15 text-emerald-300 ${compact ? "p-2" : "p-3"}`}>
          play_circle
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-white">Ver tutorial rapido</p>
          <p className="mt-0.5 text-xs text-slate-400">
            Aprenda a lancar receitas, despesas e entender seu lucro real.
          </p>
        </div>
        <span className="material-symbols-outlined text-slate-500">open_in_new</span>
      </div>
    </button>
  );
}

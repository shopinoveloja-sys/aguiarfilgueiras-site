import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { processTransparentPayment } from "../lib/api";

declare global {
  interface Window {
    MercadoPago?: any;
  }
}

type PaymentResult = {
  status: "APPROVED" | "PENDING" | "REJECTED" | "CANCELED";
  statusDetail?: string;
};

type Props = {
  open: boolean;
  amount: number;
  onClose: () => void;
  onSuccess: (result: PaymentResult) => void;
};

const MP_SCRIPT_ID = "mercado-pago-sdk";

function loadMercadoPagoSdk() {
  if (window.MercadoPago) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(MP_SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Mercado Pago SDK indisponivel.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = MP_SCRIPT_ID;
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Mercado Pago SDK indisponivel."));
    document.body.appendChild(script);
  });
}

export function MercadoPagoPaymentModal({ open, amount, onClose, onSuccess }: Props) {
  const controllerRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY;

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    setReady(false);
    setError("");

    const mountBrick = async () => {
      try {
        if (!publicKey) {
          setError("Chave publica do Mercado Pago nao configurada.");
          return;
        }

        await loadMercadoPagoSdk();
        if (cancelled || !window.MercadoPago) return;

        const container = document.getElementById("drivercash-payment-brick");
        if (container) container.innerHTML = "";

        const mp = new window.MercadoPago(publicKey, { locale: "pt-BR" });
        const bricksBuilder = mp.bricks();
        controllerRef.current = await bricksBuilder.create("payment", "drivercash-payment-brick", {
          initialization: {
            amount,
          },
          customization: {
            paymentMethods: {
              creditCard: "all",
              debitCard: "all",
              maxInstallments: 1,
            },
          },
          callbacks: {
            onReady: () => setReady(true),
            onSubmit: ({ formData }: { formData: Record<string, unknown> }) =>
              new Promise<void>(async (resolve, reject) => {
                try {
                  const result = await processTransparentPayment(formData);
                  onSuccess(result);
                  resolve();
                } catch (err) {
                  toast.error("Nao foi possivel processar o pagamento.");
                  reject(err);
                }
              }),
            onError: (err: unknown) => {
              console.error(err);
              setError("Erro ao carregar o pagamento.");
            },
          },
        });
      } catch (err) {
        console.error(err);
        setError("Erro ao iniciar o checkout transparente.");
      }
    };

    mountBrick();

    return () => {
      cancelled = true;
      controllerRef.current?.unmount?.();
      controllerRef.current = null;
    };
  }, [amount, onSuccess, open, publicKey]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-black/75 flex items-end justify-center sm:items-center p-0 sm:p-4">
      <div className="w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl border border-emerald-500/20 bg-[#161e2e] p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Assinatura DriverCash</p>
            <h2 className="text-xl font-black text-white">Pagamento anual de R$ {amount.toFixed(2).replace(".", ",")}</h2>
            <p className="text-xs text-slate-400 mt-1">Pagamento seguro pelo Mercado Pago sem sair do app.</p>
          </div>
          <button onClick={onClose} className="size-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10">
            x
          </button>
        </div>

        {error ? (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>
        ) : (
          <>
            {!ready && <p className="text-sm text-slate-400 mb-3">Carregando pagamento...</p>}
            <div id="drivercash-payment-brick" />
          </>
        )}
      </div>
    </div>
  );
}

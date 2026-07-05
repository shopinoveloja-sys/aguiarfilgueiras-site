import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const CONTACT_WEBHOOK_URL = "https://n8n.aguiarfilgueiras.com.br/webhook/carlos-site-contact";

const contactInfo = [
  { icon: Phone, title: "(61) 98183-3328", desc: "WhatsApp", href: "https://wa.me/5561981833328" },
  { icon: Mail, title: "contato@aguiarfilgueiras.com.br", desc: "E-mail", href: "mailto:contato@aguiarfilgueiras.com.br" },
  { icon: Clock, title: "Seg. a Sab. 9h as 12h e 14h as 19h", desc: "Horario de atendimento" },
  { icon: MapPin, title: "CNB 3 - Taguatinga", desc: "Brasilia/DF - CEP 72115-035" },
];

const supportItems = [
  "Direito Militar e processos administrativos",
  "Punicoes disciplinares, IPM e sindicancias",
  "Pensao, reforma, licenciamento e carreira",
];

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (String(formData.get("company") || "").trim()) {
      setStatus("success");
      form.reset();
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    const payload = new URLSearchParams({
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      area: String(formData.get("area") || ""),
      message: String(formData.get("message") || ""),
      consent: formData.get("consent") === "yes" ? "yes" : "",
      company: String(formData.get("company") || ""),
      pageUrl: window.location.href,
    });

    try {
      await fetch(CONTACT_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        body: payload,
      });

      trackEvent("generate_lead", {
        lead_type: "contact_form",
        form_location: "contact_section",
        contact_area: String(formData.get("area") || "nao_informada"),
      });

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="bg-cream py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Fale Conosco
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-primary sm:text-4xl">
            Contato com advogado militar em Brasilia
          </h2>
          <div className="mx-auto mt-2 h-[2px] w-16 bg-accent" />
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center rounded-sm bg-card p-8 text-center shadow-[var(--shadow-card)]"
            >
              <item.icon className="mb-4 h-7 w-7 text-accent" />
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (item.desc === "WhatsApp") {
                      trackEvent("whatsapp_click", { cta_location: "contact_cards" });
                    }
                  }}
                  className="font-heading text-sm font-semibold text-primary hover:text-accent"
                >
                  {item.title}
                </a>
              ) : (
                <span className="font-heading text-sm font-semibold text-primary">{item.title}</span>
              )}
              <span className="mt-1 text-xs text-muted-foreground">{item.desc}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-sm bg-primary p-8 text-primary-foreground shadow-[var(--shadow-elegant)]"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              Atendimento juridico
            </span>
            <h3 className="mt-4 font-heading text-2xl font-bold">
              Envie os dados do caso para uma primeira triagem
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gold-light/85">
              O formulario encaminha sua mensagem ao escritorio e avisa a equipe no canal interno de atendimento.
              Para casos com prazo em andamento, informe a data da notificacao, audiencia ou recurso.
            </p>
            <div className="mt-8 space-y-4">
              {supportItems.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-sm text-gold-light/90">{item}</span>
                </div>
              ))}
            </div>
            <a
              href="https://wa.me/5561981833328"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { cta_location: "contact_panel" })}
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110"
            >
              <Phone className="h-4 w-4" />
              Falar pelo WhatsApp
            </a>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-sm border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-primary">
                Nome
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm font-normal text-foreground outline-none transition-colors focus:border-accent"
                  placeholder="Seu nome"
                />
              </label>
              <label className="block text-sm font-semibold text-primary">
                WhatsApp/telefone
                <input
                  name="phone"
                  required
                  autoComplete="tel"
                  className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm font-normal text-foreground outline-none transition-colors focus:border-accent"
                  placeholder="(00) 00000-0000"
                />
              </label>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-primary">
                E-mail
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm font-normal text-foreground outline-none transition-colors focus:border-accent"
                  placeholder="voce@email.com"
                />
              </label>
              <label className="block text-sm font-semibold text-primary">
                Area do caso
                <select
                  name="area"
                  defaultValue=""
                  className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm font-normal text-foreground outline-none transition-colors focus:border-accent"
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  <option>Direito Militar</option>
                  <option>Processo disciplinar</option>
                  <option>IPM ou sindicancia</option>
                  <option>Pensao, reforma ou carreira</option>
                  <option>Outro assunto</option>
                </select>
              </label>
            </div>

            <label className="mt-4 block text-sm font-semibold text-primary">
              Mensagem
              <textarea
                name="message"
                required
                rows={6}
                className="mt-2 w-full resize-none rounded-sm border border-border bg-background px-4 py-3 text-sm font-normal leading-relaxed text-foreground outline-none transition-colors focus:border-accent"
                placeholder="Conte, em poucas linhas, o que aconteceu e se existe algum prazo em andamento."
              />
            </label>

            <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <label className="mt-4 flex gap-3 text-xs leading-relaxed text-muted-foreground">
              <input
                name="consent"
                value="yes"
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--accent))]"
              />
              Autorizo o envio dos dados informados para contato do escritorio, ciente de que a mensagem nao cria
              relacao advogado-cliente ate confirmacao expressa.
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-accent px-6 py-4 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? "Enviando..." : "Enviar mensagem"}
            </button>

            {status === "success" && (
              <p className="mt-4 text-sm font-semibold text-primary">
                Mensagem enviada. A equipe foi avisada e retornara pelo contato informado.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm font-semibold text-destructive">
                Nao foi possivel enviar agora. Tente novamente ou use o WhatsApp.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

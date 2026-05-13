import { motion } from "framer-motion";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

const contactInfo = [
  { icon: Phone, title: "(61) 98183-3328", desc: "WhatsApp", href: "https://wa.me/5561981833328" },
  { icon: Mail, title: "contato@aguiarfilgueiras.com.br", desc: "E-mail", href: "mailto:contato@aguiarfilgueiras.com.br" },
  { icon: Clock, title: "Seg. a Sex. 13h às 19h", desc: "Horário de atendimento" },
  { icon: MapPin, title: "CNB 3 - Taguatinga Norte", desc: "Brasília/DF - CEP 72.115-035" },
];

const ContactSection = () => {
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
            Contato - Advogado Militar em Brasília
          </h2>
          <div className="mx-auto mt-2 h-[2px] w-16 bg-accent" />
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center rounded-sm bg-card p-8 text-center shadow-[var(--shadow-card)]"
            >
              <item.icon className="mb-4 h-7 w-7 text-accent" />
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-heading text-sm font-semibold text-primary hover:text-accent">
                  {item.title}
                </a>
              ) : (
                <span className="font-heading text-sm font-semibold text-primary">{item.title}</span>
              )}
              <span className="mt-1 text-xs text-muted-foreground">{item.desc}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA WhatsApp */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://wa.me/5561981833328"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-accent px-10 py-4 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110"
          >
            <Phone className="h-4 w-4" />
            Agende sua Consulta pelo WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

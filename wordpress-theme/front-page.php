<?php get_header(); ?>

<!-- ========== HERO ========== -->
<section id="inicio" class="hero">
  <div class="hero-bg">
    <img src="<?php echo get_template_directory_uri(); ?>/assets/hero-bg.jpg" alt="Forças Armadas e segurança pública do Brasil - Direito Militar">
    <div class="hero-overlay"></div>
  </div>
  <div class="container">
    <div class="hero-content animate-on-scroll">
      <div class="hero-line"></div>
      <h1>
        Mais de 35 anos de <span class="highlight">experiência</span> em Direito Militar
      </h1>
      <p>
        Advocacia e consultoria especializada nas áreas de Direito Penal, Administrativo, Disciplinar e Previdenciário Militar.
      </p>
      <div class="hero-buttons">
        <a href="#areas" class="btn-primary">Áreas de Atuação →</a>
        <a href="#contato" class="btn-outline">Fale Conosco</a>
      </div>
    </div>
  </div>
</section>

<!-- ========== O ESCRITÓRIO ========== -->
<section id="escritorio" class="about">
  <div class="container">
    <div class="about-grid">
      <div class="animate-on-scroll">
        <span class="section-label">Quem Somos</span>
        <h2 class="section-title">Escritório de Advocacia Militar</h2>
        <div class="section-line"></div>
        <div class="about-text">
          <p>Bem-vindo ao Aguiar Filgueiras Advocacia, onde a expertise em Direito Militar encontra-se com mais de 35 anos de vivência na caserna das FFAA.</p>
          <p>Nosso compromisso é oferecer advocacia e consultoria especializadas nas áreas de Direito Penal Militar, Direito Administrativo Militar, Direito Disciplinar Militar e Direito Previdenciário Militar.</p>
          <p>Realizamos atendimento virtualmente para todo Brasil. Conte conosco para soluções jurídicas sólidas e dedicadas às necessidades específicas de nosso público.</p>
        </div>
      </div>

      <div class="stats-grid animate-on-scroll">
        <div class="stat-card">
          <div class="icon">🛡️</div>
          <span class="value">35+</span>
          <span class="label">Anos de vivência militar</span>
        </div>
        <div class="stat-card">
          <div class="icon">⚖️</div>
          <span class="value">20+</span>
          <span class="label">Anos de advocacia</span>
        </div>
        <div class="stat-card">
          <div class="icon">🏆</div>
          <span class="value">100%</span>
          <span class="label">Dedicação ao cliente</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ========== ÁREAS DE ATUAÇÃO ========== -->
<section id="areas" class="areas">
  <div class="container">
    <div class="animate-on-scroll" style="text-align:center;">
      <span class="section-label">Especialidades</span>
      <h2 class="section-title">Áreas de Atuação em Direito Militar</h2>
      <div class="section-line"></div>
    </div>

    <div class="areas-grid">
      <div class="area-card animate-on-scroll">
        <div class="icon">⚖️</div>
        <h3>Direito Penal Militar</h3>
        <p>Expertise incomparável com mais de três décadas de atuação na defesa de militares em processos penais.</p>
      </div>
      <div class="area-card animate-on-scroll">
        <div class="icon">📄</div>
        <h3>Direito Disciplinar Militar</h3>
        <p>Aliado estratégico dos militares na esfera desafiadora do Direito Disciplinar.</p>
      </div>
      <div class="area-card animate-on-scroll">
        <div class="icon">🏛️</div>
        <h3>Direito Administrativo Militar</h3>
        <p>Referência de excelência e comprometimento na seara administrativa militar.</p>
      </div>
      <div class="area-card animate-on-scroll">
        <div class="icon">❤️</div>
        <h3>Direito Previdenciário Militar</h3>
        <p>Suporte jurídico sólido e dedicado nas questões previdenciárias dos militares.</p>
      </div>
      <div class="area-card animate-on-scroll">
        <div class="icon">👥</div>
        <h3>Outras Áreas (Parcerias)</h3>
        <p>Serviços expandidos para atender às diversas necessidades jurídicas da família militar.</p>
      </div>
    </div>
  </div>
</section>

<!-- ========== FUNDADOR ========== -->
<section id="fundador" class="founder">
  <div class="container">
    <div class="founder-grid">
      <div class="founder-photo animate-on-scroll">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/founder.jpg" alt="Carlos Filgueiras - Advogado Militar e Sócio Fundador do escritório Aguiar Filgueiras Advocacia">
      </div>
      <div class="founder-info animate-on-scroll">
        <span class="section-label">Sócio Fundador</span>
        <h2 class="section-title">Carlos Filgueiras</h2>
        <div class="section-line" style="background:var(--gold);"></div>
        <p>Na ativa do Exército era conhecido como Capitão Aguiar. Graduado em Direito desde 2002, aprovado na OAB desde 2003, com especializações em Direito Militar, Administração Pública e Direito Público.</p>
        <p>Na ativa, foi responsável por seções de inativos e pensionistas civis e militares, de pagamento de pessoal, de fundo de saúde e seções de pessoal.</p>
        <div class="founder-links">
          <a href="https://www.instagram.com/carlosfilgueiras.adv" target="_blank" rel="noopener">Instagram</a>
          <a href="https://www.linkedin.com/in/carlos-filgueiras-992396154/" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://www.facebook.com/carlosfilgueiras.adv" target="_blank" rel="noopener">Facebook</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ========== BLOG ========== -->
<section id="blog" class="blog">
  <div class="container">
    <div class="animate-on-scroll" style="text-align:center;">
      <span class="section-label">Insights Jurídicos</span>
      <h2 class="section-title">Blog &amp; Notícias sobre Direito Militar</h2>
      <div class="section-line"></div>
      <p class="blog-subtitle">Conteúdo exclusivo com análises do nosso fundador Carlos Filgueiras sobre temas relevantes do Direito Militar.</p>
    </div>

      <?php
      $blog_query = new WP_Query(array(
        'posts_per_page' => 3,
        'post_status' => 'publish'
      ));

      if ($blog_query->have_posts()) :
        while ($blog_query->have_posts()) : $blog_query->the_post();
          $opinion = get_post_meta(get_the_ID(), 'opiniao_fundador', true);
      ?>
          <!-- Artigo Dinâmico -->
          <article class="blog-card animate-on-scroll">
            <div class="blog-card-header">
              <span class="blog-category"><?php the_category(', '); ?></span>
              <span class="blog-date">📅 <?php echo get_the_date(); ?></span>
            </div>
            <div class="blog-card-body">
              <h3><?php the_title(); ?></h3>
              <p><?php echo wp_trim_words(get_the_excerpt(), 25); ?></p>
              <?php if ($opinion) : ?>
                <div class="blog-founder-comment">
                  <div class="comment-header">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/founder.jpg" alt="Carlos Filgueiras" class="comment-avatar">
                    <span class="comment-name">Carlos Filgueiras</span>
                    <span class="comment-role">• Fundador</span>
                  </div>
                  <p class="comment-text">"<?php echo esc_html($opinion); ?>"</p>
                </div>
              <?php endif; ?>
              <a href="<?php the_permalink(); ?>" class="blog-link">Saiba mais →</a>
            </div>
          </article>
      <?php
        endwhile;
        wp_reset_postdata();
      else :
        echo '<p style="text-align:center; width:100%;">Aguardando as primeiras análises da Laura...</p>';
      endif;
      ?>

    <!-- Newsletter -->
    <div class="newsletter-box animate-on-scroll">
      <div class="nl-icon">✉️</div>
      <h3>Receba nossos conteúdos exclusivos</h3>
      <p>Assine nossa newsletter e fique por dentro das novidades do Direito Militar, análises do Carlos Filgueiras e dicas jurídicas para militares.</p>
      <form class="newsletter-form" id="newsletterForm">
        <input type="email" placeholder="Seu melhor e-mail" required>
        <button type="submit">Assinar Newsletter</button>
      </form>
      <div class="newsletter-success" id="newsletterSuccess" style="display:none;">
        ✓ Inscrição realizada com sucesso! Em breve você receberá nossos conteúdos.
      </div>
    </div>
  </div>
</section>

<!-- ========== CONTATO ========== -->
<section id="contato" class="contact">
  <div class="container">
    <div class="animate-on-scroll" style="text-align:center;">
      <span class="section-label">Fale Conosco</span>
      <h2 class="section-title">Contato - Advogado Militar em Brasília</h2>
      <div class="section-line"></div>
    </div>

    <div class="contact-grid">
      <div class="contact-card animate-on-scroll">
        <div class="icon">📞</div>
        <span class="title"><a href="https://wa.me/5561981833328" target="_blank" rel="noopener">(61) 98183-3328</a></span>
        <span class="desc">WhatsApp</span>
      </div>
      <div class="contact-card animate-on-scroll">
        <div class="icon">✉️</div>
        <span class="title"><a href="mailto:contato@aguiarfilgueiras.com.br">contato@aguiarfilgueiras.com.br</a></span>
        <span class="desc">E-mail</span>
      </div>
      <div class="contact-card animate-on-scroll">
        <div class="icon">🕐</div>
        <span class="title">Seg. a Sex. 13h às 19h</span>
        <span class="desc">Horário de atendimento</span>
      </div>
      <div class="contact-card animate-on-scroll">
        <div class="icon">📍</div>
        <span class="title">CNB 3 - Taguatinga Norte</span>
        <span class="desc">Brasília/DF - CEP 72.115-035</span>
      </div>
    </div>

    <div class="cta-whatsapp animate-on-scroll">
      <a href="https://wa.me/5561981833328" target="_blank" rel="noopener" class="btn-primary">
        📞 Agende sua Consulta pelo WhatsApp
      </a>
    </div>
  </div>
</section>

<?php get_footer(); ?>

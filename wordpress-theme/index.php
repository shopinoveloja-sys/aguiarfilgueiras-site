<?php
/**
 * Fallback template - redirects to front page
 */
get_header();
?>

<div class="container" style="padding: 4rem 0; text-align: center;">
  <h1 class="section-title">Aguiar Filgueiras Advocacia</h1>
  <p style="margin-top: 1rem; color: var(--text-muted);">
    <a href="<?php echo home_url(); ?>" class="btn-primary">Ir para a página inicial</a>
  </p>
</div>

<?php get_footer(); ?>

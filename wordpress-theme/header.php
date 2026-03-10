<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Aguiar Filgueiras Advocacia - Mais de 35 anos de experiência em Direito Militar. Advocacia e consultoria especializada.">
  <title><?php wp_title('|', true, 'right'); bloginfo('name'); ?></title>
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Top Bar -->
<div class="top-bar">
  <div class="container">
    <span>Atendimento virtual para todo Brasil</span>
    <a href="https://wa.me/5561981833328">
      📞 (61) 98183-3328
    </a>
  </div>
</div>

<!-- Header -->
<header class="site-header">
  <div class="container">
    <a href="<?php echo home_url(); ?>" class="site-logo">
      Aguiar Filgueiras
      <small>Advocacia</small>
    </a>

    <button class="menu-toggle" id="menuToggle" aria-label="Menu">☰</button>

    <?php
    wp_nav_menu(array(
      'theme_location' => 'primary',
      'container' => false,
      'menu_class' => 'main-nav',
      'menu_id' => 'mainNav',
      'fallback_cb' => 'aguiar_fallback_menu',
    ));
    ?>
  </div>
</header>

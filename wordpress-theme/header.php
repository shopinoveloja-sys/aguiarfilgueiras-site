<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Aguiar Filgueiras Advocacia - Mais de 35 anos de experiência em Direito Militar. Advocacia e consultoria especializada em Brasília-DF.">
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
      <img src="<?php echo get_template_directory_uri(); ?>/assets/logo-original.png" alt="Aguiar Filgueiras Advocacia" class="logo-img">
    </a>

    <button class="menu-toggle" id="menuToggle" aria-label="Menu">☰</button>

    <nav>
      <ul class="main-nav" id="mainNav">
        <li><a href="#inicio">Início</a></li>
        <li><a href="#escritorio">O Escritório</a></li>
        <li><a href="#areas">Áreas de Atuação</a></li>
        <li><a href="#fundador">Fundador</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#contato">Contato</a></li>
      </ul>
    </nav>
  </div>
</header>

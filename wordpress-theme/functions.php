<?php
/**
 * Aguiar Filgueiras Advocacia - Theme Functions
 */

// Theme setup
function aguiar_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
}
add_action('after_setup_theme', 'aguiar_theme_setup');

// Enqueue styles
function aguiar_enqueue_assets() {
    // Dequeue any other theme styles that might conflict
    wp_dequeue_style('oceanwp-style');
    wp_dequeue_style('elementor-frontend');
    wp_dequeue_style('elementor-common');
    
    wp_enqueue_style('aguiar-fonts', 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap', array(), null);
    wp_enqueue_style('aguiar-style', get_stylesheet_uri(), array(), '2.0');
}
add_action('wp_enqueue_scripts', 'aguiar_enqueue_assets', 999);

// Remove Elementor default styles on front page if present
function aguiar_remove_elementor_styles() {
    if (is_front_page()) {
        wp_dequeue_style('elementor-frontend');
        wp_dequeue_style('elementor-common');
        wp_dequeue_style('elementor-icons');
    }
}
add_action('wp_enqueue_scripts', 'aguiar_remove_elementor_styles', 9999);

// Add SEO meta tags
function aguiar_seo_meta() {
    if (is_front_page()) {
        echo '<meta property="og:title" content="Aguiar Filgueiras Advocacia - Direito Militar em Brasília">';
        echo '<meta property="og:description" content="Mais de 35 anos de experiência em Direito Militar. Advocacia e consultoria especializada.">';
        echo '<meta property="og:type" content="website">';
        echo '<meta property="og:url" content="' . home_url() . '">';
    }
}
add_action('wp_head', 'aguiar_seo_meta');

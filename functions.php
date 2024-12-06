<?php

/**
 * Recommended way to include parent theme styles.
 * (Please see http://codex.wordpress.org/Child_Themes#How_to_Create_a_Child_Theme)
 *
 */

add_action('wp_enqueue_scripts', 'hello_elementor_child_style');
function hello_elementor_child_style()
{
  wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
  wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/style.css', array('parent-style'));
}

/**
 * Your code goes below.
 */

/** * Use GD instead of Imagick.
 */
function cb_child_use_gd_editor($array)
{
  return array('WP_Image_Editor_GD');
}
add_filter('wp_image_editors', 'cb_child_use_gd_editor');

//pesquisa
// Search filter function
function search_filter($query)
{
  if ($query->is_search) {
    $query->set('post_type', 'post');
  }
  return $query;
}
add_filter('pre_get_posts', 'search_filter');


function limit_search_results($query)
{
  if ($query->is_search && !is_admin()) {
    $query->set('posts_per_page', 9);
  }
  return $query;
}
add_filter('pre_get_posts', 'limit_search_results');

function registrar_meus_menus()
{
  register_nav_menus(array(
    'menu-principal' => __('Menu Principal', 'hello-elementor-child'),
  ));
}
add_action('init', 'registrar_meus_menus');

function register_apps_post_type() {
  register_post_type('apps', [
      'label' => 'Apps',
      'public' => true,
      'has_archive' => true, // Permite arquivos
      'rewrite' => ['slug' => 'apps'], // Define o slug do arquivo
      'supports' => ['title', 'editor', 'excerpt'],
  ]);
}
add_action('init', 'register_apps_post_type');

function hello_elementor_child_enqueue_assets() {
  if (is_singular('app')) {
      // Estilo para Single
      wp_enqueue_style(
          'hello-elementor-single-style',
          get_stylesheet_directory_uri() . '/assets/css/app.css'
      );

      // Script para Single
      wp_enqueue_script(
          'hello-elementor-single-script',
          get_stylesheet_directory_uri() . '/assets/js/index.js',
      );
  }
}
add_action('wp_enqueue_scripts', 'hello_elementor_child_enqueue_assets');







<?php
// Se tiver query default do WordPress, use o loop padrão
$posts_array = array();

if ( have_posts() ) {
    while ( have_posts() ) {
        the_post();
        $post_id = get_the_ID();

        $posts_array[] = array(
            'title'   => get_the_title($post_id),
            'content' => apply_filters('the_content', get_the_content(null, false, $post_id)),
            'link'    => get_permalink($post_id),
            'acf'     => get_fields($post_id), // pega todos os campos ACF
        );
    }
    // Recoloca o pointer do loop ao final
    wp_reset_postdata();
}

// Agora você tem um array de posts completo
$data = array(
    'posts' => $posts_array,
);

// Envia para o React via wp_localize_script()
wp_localize_script('meu-react-app', 'wpData', $data);
?>

<?php get_header(); ?>
<div id="root"></div> <!-- React renderizará aqui -->
<?php get_footer(); ?>
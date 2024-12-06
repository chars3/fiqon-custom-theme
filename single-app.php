<?php get_header(); ?>

<?php
// Obtém os valores de gatilhos e ações
$app_trigger_value = get_post_meta(get_the_ID(), 'app_trigger', true);
$app_actions_value = get_post_meta(get_the_ID(), 'app_action', true);

// Função para exibir os gatilhos em cards
function display_meta_cards($meta_value, $label, $logo_url)
{
    if (!empty($meta_value)) {
        $meta_array = explode(',', $meta_value);
        $meta_array = array_map('trim', $meta_array);

        if (count($meta_array) > 0) {
            foreach ($meta_array as $item) {
                echo '
                <div class="card">
                    <div class="card-logo">
                        <img src="' . esc_url($logo_url) . '" alt="' . esc_attr($item) . '">
                    </div>
                    <div class="card-title">
                        <p>' . esc_html($item) . '</p>
                    </div>
                </div>';
            }
        }
    } else {
        echo '<p>O campo "' . esc_html($label) . '" não foi definido para este post.</p>';
    }
}

// Pega o logo para reutilização nos cards
$app_logo_url = '';
if ($appLogo = get_field('app_logo')) {
    $app_logo_url = $appLogo['url'];
}
?>

<section class="s-container">
    <div class="s-hero">
        <div class="hero-column text-content">
            <h1>Integrar o <span class="highlight"><?php echo esc_html(get_the_title()); ?></span> aos seus sistemas nunca foi tão simples!</h1>
            <p>Integre agora o <?php echo esc_html(get_the_title()); ?> com seus demais sistemas e coloque tarefas no piloto automático! Plataforma gratuita. Webhooks gratuitos.</p>

            <a class="hero-btn" href="#">
                Integrar <?php echo esc_html(get_the_title()); ?>
            </a>
        </div>
        <div class="hero-column logo-content">
            <?php if ($appLogo) : ?>
                <img src="<?php echo esc_url($app_logo_url); ?>" alt="Logo do <?php echo esc_html(get_the_title()); ?>" />
            <?php endif; ?>
        </div>

    </div>
</section>

<section class="s-possibilities">
    <div class="container">
        <h2>Veja todas as possibilidades</h2>
        <p>Confira o que é possível fazer unindo <?php echo esc_html(get_the_title()); ?> e FiqOn</p>

        <div class="tabs">
            <!-- Aba de navegação -->
            <ul class="tab-navigation">
                <li class="tab-item active" data-tab="tab-trigger">
                    Gatilhos <?php echo esc_html(count(explode(',', $app_trigger_value))); ?>
                </li>
                <li class="tab-item" data-tab="tab-action">
                    Ações <?php echo esc_html(count(explode(',', $app_actions_value))); ?>
                </li>
            </ul>

            <!-- Conteúdo das abas -->
            <div class="tab-content">
                <div id="tab-trigger" class="tab-panel active">
                    <div class="cards">
                        <?php
                        display_meta_cards($app_trigger_value, 'Gatilho', $app_logo_url);
                        ?>
                    </div>
                </div>
                <div id="tab-action" class="tab-panel">
                    <div class="cards">
                        <?php
                        display_meta_cards($app_actions_value, 'Ação', $app_logo_url);
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


<section>
    <input id="search-input" placeholder="Search" type="text">
    <div id="results">
        <div class="app-container"></div>
    </div>
</section>

<?php get_footer(); ?>
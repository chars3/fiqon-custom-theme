<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo('charset'); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?php wp_title(); ?></title>
  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

  <header class="navbar">
    <div class="nav-container">
      <div class="logo">
        <a href="<?php echo esc_url(home_url('/')); ?>">
          <img
            src="<?php echo esc_url('https://fiqon.com.br/wp-content/uploads/2024/10/logo-fiqon.svg'); ?>"
            alt="Logo Fiqon"
            class="logo-img" />
        </a>
      </div>

      <!-- Menu Desktop -->
      <nav class="desktop-menu">
        <ul class="menu-items">
          <li><a href="https://fiqon.com.br/#funcionalidades">Funcionalidades</a></li>
          <li><a href="https://fiqon.com.br/#integracoes">Integrações</a></li>
          <li><a href="https://fiqon.com.br/planos">Planos</a></li>
        </ul>
        <div class="menu-buttons">
          <a href="https://fiqon.app/login/">
            <div class="c-btn c-btn-outline">Entrar</div>
          </a>
          <a href="https://fiqon.app/login/">
            <div class="c-btn c-btn-primary">Comece grátis</div>
          </a>
        </div>
      </nav>

      <!-- Botão Mobile -->
      <div class="menu-toggle" id="menu-toggle">
        <span class="bar top-bar"></span>
        <span class="bar middle-bar"></span>
        <span class="bar bottom-bar"></span>
      </div>
    </div>
  </header>

  <!-- Menu Mobile -->
  <nav class="menu" id="menu">
    <ul class="menu-items">
      <li><a href="https://fiqon.com.br/#funcionalidades">Funcionalidades</a></li>
      <li><a href="https://fiqon.com.br/#integracoes">Integrações</a></li>
      <li><a href="https://fiqon.com.br/planos">Planos</a></li>
    </ul>
    <div class="menu-buttons">
      <a href="https://fiqon.app/login/">
        <div class="c-btn c-btn-outline">Entrar</div>
      </a>
      <a href="https://fiqon.app/login/">
        <div class="c-btn c-btn-primary">Comece grátis</div>
      </a>
    </div>
  </nav>
<?php get_header(); ?>
<main class="single-post">
    <div class="container">
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <article class="animate-on-scroll">
                <span class="section-label"><?php the_category(", "); ?></span>
                <h1 class="section-title"><?php the_title(); ?></h1>
                <div class="section-line"></div>
                <div class="post-meta">
                    📅 <?php echo get_the_date(); ?>
                </div>
                
                <div class="post-content">
                    <?php the_content(); ?>
                </div>

                <?php 
                $opinion = get_post_meta(get_the_ID(), "opiniao_fundador", true);
                if ($opinion) : ?>
                    <div class="blog-founder-comment" style="margin-top: 40px; background: var(--gold-light); padding: 30px; border-radius: 15px;">
                        <div class="comment-header">
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/founder.jpg" alt="Carlos Filgueiras" class="comment-avatar">
                            <span class="comment-name">Carlos Filgueiras</span>
                            <span class="comment-role">• Fundador</span>
                        </div>
                        <p class="comment-text">"<?php echo esc_html($opinion); ?>"</p>
                    </div>
                <?php endif; ?>

                <div style="margin-top: 50px;">
                    <a href="<?php echo home_url("#blog"); ?>" class="btn-outline">← Voltar para o Blog</a>
                </div>
            </article>
        <?php endwhile; endif; ?>
    </div>
</main>
<?php get_footer(); ?>

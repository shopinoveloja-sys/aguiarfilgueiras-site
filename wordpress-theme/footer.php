<!-- Footer -->
<footer class="site-footer">
  <div class="container">
    <span class="name">Aguiar Filgueiras</span>
    <span class="sub">Advocacia</span>
    <p class="copy">&copy; <?php echo date('Y'); ?> Aguiar Filgueiras Advocacia. Todos os direitos reservados.</p>
  </div>
</footer>

<?php wp_footer(); ?>

<script>
  // Mobile menu toggle
  document.getElementById('menuToggle').addEventListener('click', function() {
    document.getElementById('mainNav').classList.toggle('active');
    this.textContent = this.textContent === '☰' ? '✕' : '☰';
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      document.getElementById('mainNav').classList.remove('active');
      document.getElementById('menuToggle').textContent = '☰';
    });
  });

  // Scroll animation observer
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
    observer.observe(el);
  });

  // Newsletter form
  var nlForm = document.getElementById('newsletterForm');
  if (nlForm) {
    nlForm.addEventListener('submit', function(e) {
      e.preventDefault();
      nlForm.style.display = 'none';
      document.getElementById('newsletterSuccess').style.display = 'block';
    });
  }
</script>
</body>
</html>

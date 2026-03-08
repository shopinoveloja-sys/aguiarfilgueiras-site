==============================================
  INSTRUÇÕES DE USO - TEMA WORDPRESS
  Aguiar Filgueiras Advocacia
==============================================

ESTRUTURA DO TEMA:
------------------
Renomeie os arquivos removendo ".txt" e organize assim:

  aguiar-filgueiras/
  ├── style.css          (renomear style.css.txt)
  ├── functions.php      (renomear functions.php.txt)
  ├── header.php         (renomear header.php.txt)
  ├── footer.php         (renomear footer.php.txt)
  ├── front-page.php     (renomear front-page.php.txt)
  ├── index.php          (renomear index.php.txt)
  ├── screenshot.png     (captura de tela do tema, 1200x900px)
  └── assets/
      ├── hero-bg.jpg    (copiar de src/assets/hero-bg.jpg)
      └── founder.jpg    (copiar de src/assets/founder.jpg)

INSTALAÇÃO:
-----------
1. Crie a pasta "aguiar-filgueiras" com os arquivos acima
2. Compacte em .zip
3. No WordPress: Aparência > Temas > Adicionar Novo > Enviar Tema
4. Ative o tema
5. Vá em Configurações > Leitura > Página inicial = "Uma página estática"
   e selecione qualquer página (o front-page.php será usado automaticamente)

MENU:
-----
- Vá em Aparência > Menus
- Crie um menu e marque "Menu Principal"
- Adicione links personalizados: #inicio, #escritorio, #areas, #fundador, #contato

IMAGENS:
--------
- Copie hero-bg.jpg e founder.jpg para a pasta assets/ dentro do tema
- As imagens do Lovable podem ser baixadas do preview

OBSERVAÇÕES:
------------
- O tema usa CSS puro (sem dependência de plugins)
- Animações de scroll via IntersectionObserver (JavaScript vanilla)
- Responsivo para mobile, tablet e desktop
- Fontes carregadas via Google Fonts (Playfair Display + Inter)

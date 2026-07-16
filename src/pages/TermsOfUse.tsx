import LegalPage from "./LegalPage";

const TermsOfUse = () => {
  return (
    <LegalPage
      title="Termos de Uso"
      description="Estes termos regulam o acesso e a utilizacao do site aguiarfilgueiras.com.br, de seus conteudos institucionais e de seus canais de contato."
      canonicalPath="/termos-de-uso/"
      eyebrow="Termos"
      sections={[
        {
          title: "1. Aceitacao dos termos",
          paragraphs: [
            "Ao acessar e utilizar este site, voce declara estar ciente e de acordo com os termos e condicoes aqui previstos. Caso nao concorde com este documento, recomendamos que nao utilize o site.",
          ],
        },
        {
          title: "2. Finalidade do site",
          paragraphs: [
            "O site aguiarfilgueiras.com.br possui finalidade institucional e informativa, com apresentacao de areas de atuacao, conteudos sobre Direito Militar, canais de contato e materiais publicados pelo Aguiar Filgueiras Advocacia.",
            "Os textos, artigos, publicacoes e demais materiais disponibilizados possuem carater educativo e informativo, nao substituindo analise juridica individualizada nem consultoria especifica para casos concretos.",
          ],
        },
        {
          title: "3. Uso adequado",
          paragraphs: [
            "O usuario compromete-se a utilizar o site de forma licita, etica e compativel com a boa-fe, abstendo-se de praticar atos que possam comprometer o funcionamento do site, violar direitos de terceiros ou utilizar os conteudos para fins ilicitos.",
          ],
        },
        {
          title: "4. Propriedade intelectual",
          paragraphs: [
            "Salvo disposicao em contrario, os textos, marcas, logotipos, imagens, elementos visuais, organizacao editorial e demais conteudos deste site pertencem ao Aguiar Filgueiras Advocacia ou sao utilizados sob licenca.",
            "E vedada a reproducao, adaptacao, distribuicao ou exploracao total ou parcial desses materiais sem autorizacao previa, ressalvadas as hipoteses permitidas em lei e o uso de trechos com a devida atribuicao da fonte.",
          ],
        },
        {
          title: "5. Ausencia de relacao advogado-cliente",
          paragraphs: [
            "O acesso ao site, a leitura de artigos, o envio de mensagens ou a navegacao em suas paginas nao estabelece, por si so, relacao advogado-cliente.",
            "A prestacao de servicos juridicos depende de analise individual do caso, aceitacao expressa pelo escritorio e, quando cabivel, formalizacao propria.",
          ],
        },
        {
          title: "6. Links externos",
          paragraphs: [
            "O site pode conter links para plataformas, redes sociais ou paginas de terceiros. Esses links sao fornecidos para conveniencia do usuario, sem que isso implique controle ou responsabilidade do escritorio sobre conteudos, politicas ou praticas adotadas por terceiros.",
          ],
        },
        {
          title: "7. Limitacao de responsabilidade",
          paragraphs: [
            "Embora o escritorio busque manter as informacoes atualizadas e corretas, nao ha garantia de que todos os conteudos estejam completos, atualizados ou adequados a todos os contextos concretos.",
            "O uso das informacoes publicadas no site e de responsabilidade do usuario, que deve buscar orientacao juridica especifica antes de tomar decisoes relacionadas ao seu caso.",
          ],
        },
        {
          title: "8. Alteracoes",
          paragraphs: [
            "Estes Termos de Uso podem ser alterados a qualquer momento para refletir ajustes no funcionamento do site, mudancas legais ou aprimoramentos institucionais. A versao vigente sera sempre aquela publicada nesta pagina.",
          ],
        },
      ]}
    />
  );
};

export default TermsOfUse;

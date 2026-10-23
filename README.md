# Aprender Digital

Plataforma de inclusão digital desenvolvida para a Atividade Extensionista III do curso de Engenharia de Software. O projeto oferece aulas e atividades introdutórias para ajudar pessoas a utilizar o computador, o celular e a internet.

O site foi desenvolvido com **HTML, CSS e JavaScript puro**. Não é necessário instalar dependências para utilizá-lo. O Node.js é opcional e serve apenas para executar os testes automatizados.

## Funcionalidades

- Seis aulas: computador e celular, internet, arquivos, comunicação, segurança e ferramentas do cotidiano.
- Uma pergunta por aula, com correção e explicação da resposta.
- Treino de digitação, download de arquivo e simulação de e-mail, sem envio de mensagens.
- Questionário final com seis perguntas, explicações e resultado.
- Registro de progresso, respostas e preferências no navegador, quando o armazenamento está disponível.
- Formulário de avaliação sem identificação, com exportação em TXT ou CSV.
- Layout adaptado ao celular e ao computador, ajuste do tamanho do texto, alto contraste e navegação por teclado.
- Vídeo educativo do NIC.br, carregado após uma ação do usuário, acompanhado de resumo em texto.

## Estrutura do projeto

| Caminho | Função |
| --- | --- |
| `index.html` | Página inicial e carregamento dos arquivos do site. |
| `assets/css/styles.css` | Estilos, layout, adaptação às telas e alto contraste. |
| `assets/js/conteudos.js` | Textos das aulas, perguntas e referências. |
| `assets/js/dados.js` | Validação dos dados, armazenamento local e exportação em CSV. |
| `assets/js/app.js` | Navegação, atividades, progresso, avaliação e downloads. |
| `assets/img/` | Ilustrações e ícones utilizados no site. |
| `.nojekyll` | Desativa o processamento do Jekyll na publicação pelo GitHub Pages. |
| `docs/DIAGRAMA_ETAPAS.svg` | Diagrama das etapas do projeto, a ser atualizado conforme o trabalho realizado. |
| `tests/dados.test.cjs` | Testes automatizados da lógica de dados e dos conteúdos. |

## Como abrir o site

1. Baixe os arquivos do projeto e extraia a pasta, caso estejam em um ZIP.
2. Abra a pasta `AprenderDigital` no VS Code para consultar ou editar o código.
3. Abra o arquivo `index.html` em um navegador atualizado.

Os vídeos e os links externos precisam de conexão com a internet. O armazenamento ao abrir arquivos locais pode variar entre navegadores; para a aplicação com os participantes, utilize a versão publicada do site. A versão hospedada depende do carregamento dos arquivos pela internet e não oferece garantia de funcionamento offline.

## Publicação no GitHub Pages

1. Crie um repositório público no GitHub.
2. Envie o conteúdo atualizado da pasta `AprenderDigital`, mantendo a organização dos arquivos. O `index.html` deve ficar na raiz do repositório, junto das pastas `assets`, `docs` e `tests` e do arquivo `.nojekyll`.
3. No repositório, abra **Settings → Pages**.
4. Em **Source**, selecione **Deploy from a branch**, escolha o branch `main` e a pasta **/(root)** e clique em **Save**.
5. Aguarde a publicação e abra o endereço informado pelo GitHub Pages no computador e no celular.

Envie os arquivos e as pastas descompactados. Alterações feitas no VS Code precisam ser enviadas ao repositório para aparecer na versão publicada.

## Armazenamento e avaliações

Os dados são salvos no `localStorage`, com a chave `aprender-digital-v1`. Cada navegador mantém seus próprios registros, sem sincronização ou envio automático para um servidor. Se os dados do navegador forem apagados, os registros locais poderão ser perdidos.

O formulário de avaliação não solicita nome, e-mail ou telefone. O campo de sugestões orienta o participante a não informar dados pessoais.

Na aplicação do projeto, está prevista a participação de um familiar no celular e outro no computador. Após cada avaliação, o responsável deve baixar o arquivo no aparelho utilizado. A exportação contém somente os registros daquele navegador; a quantidade de registros locais não comprova a quantidade de participantes.

A aplicação permite até 100 avaliações por navegador. Guarde os arquivos exportados antes de apagar os registros ou reiniciar a coleta. Mantenha os resultados reais dos participantes separados do código publicado no GitHub.

## Testes automatizados

Com o Node.js instalado, execute estes comandos no terminal, dentro da pasta principal do projeto:

```bash
node --check assets/js/app.js
node --check assets/js/conteudos.js
node --check assets/js/dados.js
node --test tests/dados.test.cjs
```

As verificações conferem a sintaxe dos arquivos JavaScript, a lógica de dados e a integridade dos conteúdos. A revisão visual e os testes de uso devem ser realizados também no computador e no celular.

## Materiais e referências

- [Cartilha de Segurança para Internet — CERT.br](https://cartilha.cert.br/)
- [Senhas seguras — Cidadão na Rede / NIC.br](https://cidadaonarede.nic.br/pt/videos/senhas-seguras)
- [Backup — Cidadão na Rede / NIC.br](https://cidadaonarede.nic.br/pt/videos/backup)
- [Cuide de seu e-mail — Cidadão na Rede / NIC.br](https://cidadaonarede.nic.br/pt/videos/cuide-de-seu-e-mail)
- [GitHub Pages — configuração da fonte de publicação](https://docs.github.com/pt/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

O vídeo de senhas seguras é reproduzido a partir do endereço do NIC.br, sem alterações e sem inclusão do arquivo de vídeo neste repositório. O crédito e a licença CC BY-ND estão indicados junto ao player. Os demais links levam a materiais complementares.


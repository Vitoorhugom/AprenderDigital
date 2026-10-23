window.ADContent = {
  lessons: [{
      id: 'dispositivos',
      title: 'Computador e celular',
      icon: 'monitor',
      color: 'sage',
      time: '7 min',
      description: 'Conheça a tela, o teclado e os primeiros movimentos.',
      introduction: 'Você não precisa saber tudo para começar. Primeiro, vamos entender como conversar com o aparelho: tocar, clicar, escrever e voltar.',
      sections: [{
          title: 'O que cada parte faz',
          text: 'A tela mostra as informações. No computador, o mouse ou o touchpad move uma seta chamada ponteiro. O teclado permite escrever. No celular, a própria tela recebe os toques e mostra um teclado quando você seleciona um campo de texto. Um aplicativo é um programa criado para uma tarefa, como tirar fotos ou trocar mensagens.'
        },
        {
          title: 'Tocar, clicar e rolar',
          text: 'Um clique costuma selecionar um item ou ativar um botão. Alguns arquivos no computador abrem com dois cliques rápidos. No celular, normalmente basta tocar uma vez. Para ver o restante de uma página, use a roda do mouse ou deslize um dedo pela tela. No touchpad, geralmente é possível rolar usando dois dedos.'
        },
        {
          title: 'Escrever e corrigir',
          text: 'Clique ou toque no campo antes de escrever. A barra de espaço separa as palavras. Backspace apaga o caractere à esquerda do cursor. Enter pode iniciar uma linha ou confirmar uma ação, dependendo do programa. Se errar, você pode corrigir com calma. Em muitos programas de computador, Ctrl + Z desfaz a última alteração; no Mac, use Command + Z.'
        },
        {
          title: 'Encerrar com cuidado',
          text: 'Salve o que estiver fazendo antes de fechar um programa. Para desligar o computador, use a opção Desligar do sistema e aguarde. Evite retirar o cabo de energia durante o uso. Quando parar de usar um celular ou computador, bloqueie a tela para proteger o acesso.'
        }
      ],
      steps: ['Encontre um botão nesta página e observe seu texto antes de ativá-lo.', 'Role a página até o final e volte para o início.', 'Pratique a digitação no campo abaixo. Você pode apagar e tentar novamente.'],
      exercise: {
        type: 'typing',
        prompt: 'Estou aprendendo a usar a tecnologia.'
      },
      question: {
        text: 'Você digitou uma letra errada e o cursor está logo depois dela. Qual tecla pode apagar essa letra?',
        options: ['Barra de espaço', 'Backspace', 'Shift'],
        correct: 1,
        explanation: 'Backspace apaga o caractere à esquerda do cursor. No teclado do celular, costuma aparecer como uma seta com um X.'
      },
      tip: 'Com o teclado, a tecla Tab passa pelos links e botões. Shift + Tab volta. Use Enter para ativar um link e Enter ou espaço para ativar um botão.'
    },
    {
      id: 'internet',
      title: 'Internet e pesquisas',
      icon: 'globe',
      color: 'blue',
      time: '6 min',
      description: 'Abra sites, faça pesquisas e encontre informações.',
      introduction: 'A internet conecta aparelhos e serviços. Um navegador é o aplicativo usado para visitar sites, como os de notícias, educação e serviços públicos.',
      sections: [{
          title: 'Navegador, site e pesquisa',
          text: 'Chrome, Firefox, Edge e Safari são exemplos de navegadores. Um site reúne páginas em um endereço. A barra de endereços, na parte de cima do navegador, aceita tanto o endereço de um site quanto palavras para pesquisar. Uma aba permite manter uma página aberta enquanto você consulta outra.'
        },
        {
          title: 'Pesquise com palavras claras',
          text: 'Use palavras que descrevam o que você procura. Em vez de escrever apenas “ônibus”, tente “horário de ônibus Almirante Tamandaré Centro”. Leia o título e o endereço de cada resultado. Anúncios podem aparecer antes dos demais resultados; a posição na lista não garante qualidade.'
        },
        {
          title: 'Confira antes de acreditar',
          text: 'Observe quem publicou, a data e a fonte da informação. Compare uma notícia ou orientação com outras fontes confiáveis. Se precisar de um serviço de uma instituição, procure o endereço oficial. Não presuma que um resultado é verdadeiro só porque foi compartilhado muitas vezes.'
        },
        {
          title: 'Volte sem se perder',
          text: 'Use a seta Voltar do navegador para retornar à página anterior. Fechar uma aba é diferente de voltar: isso encerra aquela página. Você pode guardar um site nos favoritos para encontrá-lo depois. Os nomes e a posição dos botões variam entre navegadores e aparelhos.'
        }
      ],
      steps: ['Abra uma nova aba do navegador.', 'Pesquise uma informação simples, como o horário de uma biblioteca da sua cidade.', 'Identifique o endereço e a instituição responsável antes de confiar no resultado.'],
      question: {
        text: 'Qual pesquisa tende a ajudar mais a encontrar o horário de uma biblioteca perto de você?',
        options: ['“coisas”', '“biblioteca”', '“horário biblioteca municipal Almirante Tamandaré”'],
        correct: 2,
        explanation: 'Uma pesquisa com o serviço, o lugar e a informação desejada ajuda a encontrar resultados mais relevantes.'
      },
      tip: 'O HTTPS protege a conexão com o site, mas não prova que a loja, a oferta ou a mensagem seja confiável. Confira também o endereço e a origem.'
    },
    {
      id: 'arquivos',
      title: 'Arquivos e pastas',
      icon: 'folder',
      color: 'peach',
      time: '6 min',
      description: 'Salve, organize e encontre fotos e documentos.',
      introduction: 'Uma foto, um texto e uma música são arquivos. As pastas servem para organizar esses arquivos, como divisórias de um armário.',
      sections: [{
          title: 'Dê nomes que ajudam',
          text: 'Um arquivo pode se chamar “lista-de-compras.txt” ou “foto-do-passeio.jpg”. Nomes claros facilitam encontrar o que você precisa. A extensão, como .jpg ou .pdf, costuma indicar o formato. Alterar a extensão no nome não converte o conteúdo para outro formato.'
        },
        {
          title: 'Onde está o que você baixou?',
          text: 'Download significa receber um arquivo no aparelho. Muitas vezes ele vai para a pasta Downloads, mas o navegador pode perguntar onde salvar. No computador, procure o gerenciador de arquivos. No celular, procure aplicativos como Arquivos ou Meus Arquivos; o nome depende do aparelho.'
        },
        {
          title: 'Copiar, mover e excluir',
          text: 'Copiar cria outra cópia do arquivo. Mover troca sua localização. Excluir remove o item e pode enviá-lo para uma lixeira, dependendo do aplicativo. Verifique antes de confirmar uma exclusão. Criar pastas por assunto, como Estudos e Fotos, ajuda a manter a organização.'
        },
        {
          title: 'Tenha uma cópia de segurança',
          text: 'Backup é uma cópia que ajuda a recuperar arquivos se o aparelho falhar ou algo for apagado. Guarde cópias importantes em outro local adequado, como uma mídia externa ou um serviço de nuvem. Confira se você consegue abrir a cópia. Uma pasta duplicada no mesmo aparelho não protege contra a perda desse aparelho.'
        }
      ],
      steps: ['Baixe o pequeno arquivo de treino pelo botão abaixo.', 'Encontre o arquivo no local escolhido para o download.', 'Se souber criar uma pasta, organize o arquivo em uma pasta chamada Estudos.'],
      exercise: {
        type: 'download'
      },
      question: {
        text: 'Você baixou um documento e não sabe onde ele está. Onde faz sentido procurar primeiro?',
        options: ['Na pasta Downloads ou no local escolhido ao salvar', 'Somente na lixeira', 'Na lista de contatos'],
        correct: 0,
        explanation: 'O navegador normalmente usa Downloads ou o local que você escolheu. O gerenciador de arquivos permite procurar pelo nome.'
      },
      tip: 'Use somente arquivos de treino. Você não precisa compartilhar documentos pessoais para realizar esta aula.',
      resource: {
        label: 'Vídeo sobre cópias de segurança — NIC.br',
        url: 'https://cidadaonarede.nic.br/pt/videos/backup'
      }
    },
    {
      id: 'comunicacao',
      title: 'E-mail e comunicação',
      icon: 'mail',
      color: 'lavender',
      time: '7 min',
      description: 'Escreva mensagens, entenda anexos e cuide dos contatos.',
      introduction: 'O e-mail permite enviar mensagens e arquivos. Aplicativos de conversa também ajudam no dia a dia, mas vale conferir o destinatário e o conteúdo antes de compartilhar.',
      sections: [{
          title: 'Entenda os campos da mensagem',
          text: 'Para é o endereço de quem receberá a mensagem. Assunto é um resumo curto do tema. O corpo é o texto principal. Um endereço de e-mail contém @ e um domínio. Revise o destinatário: uma letra diferente pode levar a mensagem à pessoa errada ou impedir a entrega.'
        },
        {
          title: 'Escreva de forma clara',
          text: 'Comece com uma saudação, explique o motivo da mensagem e revise o texto. Um assunto como “Dúvida sobre a atividade de informática” é mais útil que “Oi”. Evite enviar a mesma mensagem muitas vezes. Confira o histórico antes de responder para entender o contexto.'
        },
        {
          title: 'Anexe com atenção',
          text: 'Um anexo é um arquivo enviado junto à mensagem. O botão de anexar geralmente usa o desenho de um clipe. Escolha o arquivo e aguarde seu carregamento. Antes de enviar, verifique se é o documento certo e se contém dados que você não pretende compartilhar.'
        },
        {
          title: 'Conversas e chamadas',
          text: 'Em uma chamada de vídeo, teste o som e observe o que aparece ao fundo. Ative o microfone quando for falar. Em grupos de mensagens, respeite a privacidade das pessoas e confirme informações antes de repassá-las. Pedidos inesperados devem ser confirmados por outro contato conhecido.'
        }
      ],
      steps: ['Na simulação abaixo, confira o destinatário fictício.', 'Escreva um assunto e uma mensagem usando apenas dados de exemplo.', 'Revise e escolha “Conferir mensagem”. Nenhum e-mail será enviado.'],
      exercise: {
        type: 'email'
      },
      question: {
        text: 'Para enviar um arquivo junto ao e-mail, qual recurso você procura?',
        options: ['Excluir conversa', 'Anexar arquivo, geralmente representado por um clipe', 'Bloquear contato'],
        correct: 1,
        explanation: 'Anexar inclui um arquivo na mensagem. Sempre confira o destinatário e o arquivo antes do envio real.'
      },
      tip: 'Nesta plataforma, a atividade de e-mail é apenas uma simulação. O texto digitado não é enviado nem salvo no progresso.',
      resource: {
        label: 'Vídeo sobre cuidados com o e-mail — NIC.br',
        url: 'https://cidadaonarede.nic.br/pt/videos/cuide-de-seu-e-mail'
      }
    },
    {
      id: 'seguranca',
      title: 'Segurança digital',
      icon: 'shield',
      color: 'yellow',
      time: '7 min',
      description: 'Proteja suas contas e reconheça situações suspeitas.',
      introduction: 'Alguns cuidados simples ajudam a proteger seus dados. A primeira atitude é fazer uma pausa quando uma mensagem exige pressa, segredo ou informações pessoais.',
      sections: [{
          title: 'Cuide das suas senhas',
          text: 'Prefira senhas longas e difíceis de adivinhar. Evite aniversários, nomes e sequências conhecidas. Use senhas diferentes em serviços diferentes. Um gerenciador de senhas pode ajudar a criar e guardar combinações. Nunca digite uma senha real nas atividades deste site.'
        },
        {
          title: 'Adicione uma segunda proteção',
          text: 'Quando o serviço oferecer, ative a verificação em duas etapas nas configurações da conta. Ela pede uma confirmação adicional no acesso. Não repasse códigos de verificação a alguém que entrar em contato, mesmo que a pessoa diga ser do suporte.'
        },
        {
          title: 'Desconfie de urgência e promessas',
          text: 'Mensagens que anunciam prêmio inesperado ou ameaçam bloquear uma conta podem tentar provocar uma decisão apressada. Evite abrir o link recebido. Acesse o serviço por um caminho oficial que você já conhece e confirme a situação. Confira também pedidos de dinheiro por outro canal.'
        },
        {
          title: 'Mantenha o aparelho protegido',
          text: 'Use bloqueio de tela, instale atualizações e obtenha aplicativos das lojas oficiais ou do fabricante. Leia as permissões solicitadas. Em aparelhos compartilhados, saia das suas contas ao terminar. Evite publicar documentos, senhas e detalhes desnecessários da sua rotina.'
        }
      ],
      steps: ['Leia o exemplo: “Sua conta será bloqueada agora! Envie o código recebido por SMS”.', 'Identifique o pedido de código e a tentativa de causar urgência.', 'Pense em um caminho oficial para verificar a situação sem usar o link da mensagem.'],
      question: {
        text: 'Uma pessoa desconhecida pede o código que chegou por SMS. O que fazer?',
        options: ['Enviar rápido para evitar o bloqueio', 'Publicar o código em um grupo', 'Não compartilhar e confirmar o pedido pelo canal oficial'],
        correct: 2,
        explanation: 'Códigos de verificação protegem o acesso às contas. Compartilhá-los pode permitir que outra pessoa se passe por você.'
      },
      tip: 'Se uma mensagem deixar você inseguro, pare e peça orientação a alguém de confiança antes de agir.',
      video: {
        title: 'Senhas seguras',
        url: 'https://cidadaonarede.nic.br/download/files/downloads/2/2-Senhas-720p_site.mp4',
        page: 'https://cidadaonarede.nic.br/pt/videos/senhas-seguras',
        summary: 'O vídeo mostra uma pessoa escolhendo uma senha, uma tentativa de adivinhação e o uso de uma combinação longa. A mensagem central é escolher senhas difíceis de descobrir e mantê-las protegidas.'
      },
      resource: {
        label: 'Mais orientações de segurança — CERT.br',
        url: 'https://cartilha.cert.br/'
      }
    },
    {
      id: 'cotidiano',
      title: 'Ferramentas do dia a dia',
      icon: 'sparkles',
      color: 'rose',
      time: '6 min',
      description: 'Use textos, planilhas e recursos de acessibilidade.',
      introduction: 'Depois dos primeiros passos, você pode usar a tecnologia para estudar, organizar tarefas e acessar informações úteis. Vamos conhecer algumas ferramentas comuns.',
      sections: [{
          title: 'Documentos de texto',
          text: 'Um editor de texto ajuda a criar listas, cartas e trabalhos. Você pode usar títulos, parágrafos e listas para organizar as ideias. Salve o documento com um nome fácil de reconhecer. Alguns aplicativos salvam automaticamente; confira se essa função está ativa e onde o arquivo está sendo guardado.'
        },
        {
          title: 'Planilhas simples',
          text: 'Uma planilha organiza informações em linhas e colunas. O encontro de uma linha com uma coluna forma uma célula. Você pode montar uma lista com Produto, Quantidade e Valor. Fórmulas podem fazer cálculos, mas é importante conferir os dados e os resultados. Comece com valores fictícios para treinar.'
        },
        {
          title: 'Serviços digitais',
          text: 'Sites e aplicativos podem oferecer informações de transporte, educação e serviços públicos. Antes de preencher um formulário, confira se você chegou ao canal oficial da instituição. Leia o que cada campo pede. Alguns serviços precisam de cadastro; estas aulas e atividades podem ser usadas sem criar uma conta.'
        },
        {
          title: 'Adapte a tela para você',
          text: 'Use as opções de tamanho do texto e contraste desta plataforma. Seu aparelho também pode oferecer zoom, leitor de tela e legendas. Se um conteúdo estiver difícil de ler, ajuste a visualização. Aprender no seu ritmo inclui voltar a uma explicação, fazer pausas e pedir ajuda quando precisar.'
        }
      ],
      steps: ['Experimente o botão A+ no topo para mudar o tamanho do texto.', 'Experimente o botão de contraste e escolha o modo mais confortável.', 'Pense em uma tarefa do seu dia que poderia ser organizada em uma lista ou planilha.'],
      question: {
        text: 'O texto está pequeno demais. Qual atitude pode ajudar?',
        options: ['Aumentar o texto ou usar o zoom do navegador', 'Digitar uma senha na página', 'Fechar todos os aplicativos obrigatoriamente'],
        correct: 0,
        explanation: 'Ajustar a visualização facilita a leitura. Você pode usar os recursos da plataforma ou as opções de acessibilidade do aparelho.'
      },
      tip: 'Você não precisa terminar tudo de uma vez. Seu progresso é salvo neste navegador quando o armazenamento está disponível.'
    }
  ],
  quiz: [{
      text: 'Você quer ver a parte de baixo de uma página no celular. O que fazer?',
      options: ['Desligar o aparelho', 'Deslizar o dedo pela tela para rolar a página', 'Retirar o chip'],
      correct: 1,
      explanation: 'Deslizar pela tela permite rolar a página. No computador, você pode usar a roda do mouse ou a barra de rolagem.'
    },
    {
      text: 'Você encontrou uma informação importante na internet. Qual é um bom próximo passo?',
      options: ['Conferir a fonte, a data e outras fontes confiáveis', 'Acreditar porque apareceu primeiro', 'Compartilhar sem ler'],
      correct: 0,
      explanation: 'Comparar fontes e conferir o contexto ajuda a avaliar a qualidade da informação.'
    },
    {
      text: 'Para que serve uma cópia de segurança dos arquivos?',
      options: ['Para mudar o tamanho da tela', 'Para apagar automaticamente todas as fotos', 'Para ajudar a recuperar os arquivos se algo acontecer com o original'],
      correct: 2,
      explanation: 'Um backup permite recuperar arquivos. A cópia precisa estar em um local adequado e ser verificada.'
    },
    {
      text: 'Antes de enviar uma mensagem com anexo, o que você deve revisar?',
      options: ['Somente a cor da tela', 'O destinatário, o texto e o arquivo anexado', 'A quantidade de aplicativos no aparelho'],
      correct: 1,
      explanation: 'Essa revisão evita enviar informações ou documentos para a pessoa errada.'
    },
    {
      text: 'Uma mensagem promete um prêmio e pede sua senha. Qual é a atitude mais segura?',
      options: ['Não informar a senha e verificar pelo canal oficial', 'Enviar a senha para receber o prêmio', 'Encaminhar sua senha a um amigo da pessoa'],
      correct: 0,
      explanation: 'Não compartilhe senhas. Confirme mensagens inesperadas por um canal oficial conhecido.'
    },
    {
      text: 'Qual ferramenta ajuda a organizar uma lista de produtos em linhas e colunas?',
      options: ['O botão Desligar', 'A lixeira', 'Uma planilha'],
      correct: 2,
      explanation: 'Planilhas organizam dados em células, que ficam no encontro das linhas com as colunas.'
    }
  ]
};
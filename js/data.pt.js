// ===========================
// PORTUGUESE (BRAZIL) CONTENT PACK
// Same shape/keys as the English content in data.js — i18n.js mutates
// NODES/CASES/EVIDENCE_DB/BRIBE_MESSAGES/TUTORIAL_STEPS in place with
// this content when the player's language is 'pt'. Structural fields
// (ids, x/y, connections, corrupt, bribeAmount, reliability, status,
// targetNode) are never touched — only display text changes.
// ===========================

const NODE_I18N_PT = {
  player: {
    role: 'Investigador da Polícia Federal',
    intel: 'Você é um investigador da Polícia Federal designado para a força-tarefa de Curitiba. Suas ordens são seguir o rastro do dinheiro, da apreensão em um posto de gasolina até a rede de contratos da Petrobras.',
  },
  doleiro: {
    role: 'Doleiro (Operador Financeiro)',
    intel: 'Preso em um posto de gasolina em Curitiba com R$3,2 milhões em espécie. Operador de pequeno porte que movimentava dinheiro entre empreiteiras e destinatários políticos. Deu uma confissão parcial — mas está protegendo nomes acima dele.',
  },
  petrobras_director: {
    role: 'Diretor de Abastecimento, Petrobras',
    intel: 'Chefiou a Diretoria de Abastecimento da Petrobras por seis anos. Supervisionou R$4,8 bilhões em contratos de refino. Publicamente respeitado — integrou um conselho consultivo anticorrupção do governo em 2013.',
  },
  contractor: {
    role: 'CEO, Construtora Barros',
    intel: 'Lidera uma das maiores construtoras do Brasil. A Barros venceu R$12 bilhões em contratos com a Petrobras desde 2008. Tavares integra o conselho de duas fundações federais de infraestrutura.',
  },
  senator: {
    role: 'Senador, Comissão de Infraestrutura',
    intel: 'Preside a Comissão de Infraestrutura do Senado, que aprova os principais orçamentos de investimento da Petrobras. No cargo há 14 anos. Apoiou a criação da agência anticorrupção que hoje preside.',
  },
  auditor: {
    role: 'Auditora Interna, Petrobras',
    intel: 'Auditora interna da Petrobras que sinalizou 22 contratos anômalos em 2013. Seu relatório foi arquivado sem revisão. Foi transferida para um cargo administrativo no trimestre seguinte e está em silêncio desde então.',
  },
  journalist: {
    role: 'Jornalista Investigativa',
    intel: 'Repórter investigativa de um jornal de Curitiba. Há 18 meses apurando uma reportagem sobre os contratos da Petrobras. Três versões vetadas pelo editor. Ela tem documentos — e está procurando uma fonte federal para publicar a matéria.',
  },
  party_treasurer: {
    role: 'Tesoureiro do Partido',
    intel: 'Tesoureiro da seção paulista do partido governista. Administra o financiamento de campanha e os "fundos operacionais". Operador político de longa data, sem perfil público. Nunca deu uma entrevista à imprensa.',
  },
};

const CASE_I18N_PT = {
  doleiro_case:   { name:'CASO LAVAGEM',  meta:'Lavagem de dinheiro — apreensão em posto de gasolina' },
  petrobras_case: { name:'CASO CORRENTE', meta:'Corrupção na diretoria da Petrobras' },
  cartel_case:    { name:'CASO CARTEL',   meta:'Cartel da construção — fraude em licitações' },
  senator_case:   { name:'CASO PROPINA',  meta:'Distribuição de caixa dois político' },
  treasurer_case: { name:'CASO CAIXA',    meta:'Tesoureiro do partido — repasse de dinheiro' },
};

const EVIDENCE_DB_PT = {
  doleiro: {
    financial: [
      { type:'Registro de Apreensão em Espécie', text:'R$3,2 milhões encontrados em malas no posto de gasolina em Curitiba durante uma abordagem de rotina da Polícia Federal. Denominações compatíveis com depósitos fracionados para evitar os limites de comunicação obrigatória.', reliability:'high', caveat:null },
      { type:'Registro de Transferência Bancária', text:'47 transferências de uma empresa de fachada registrada no Panamá para a "Serra Negra Consultoria" — sem funcionários, sem endereço, nunca declarou imposto de renda.', reliability:'high', caveat:null },
      { type:'Registro de Câmbio', text:'Vieira trocou US$8,4 milhões em três casas de câmbio ao longo de 18 meses, sempre em valores logo abaixo do limite de comunicação obrigatória de US$10.000.', reliability:'high', caveat:null },
    ],
    witness: [
      { type:'Depoimento de Informante', text:'"Vieira recolhia das empreiteiras e entregava aos políticos. Ele mantinha uma planilha. Eu vi uma vez — codinomes, valores, datas."', reliability:'med', caveat:'A fonte responde a uma investigação por fraude separada e pode estar fornecendo informações para reduzir sua própria pena.' },
      { type:'Frentista do Posto', text:'"Ele vinha toda terça-feira. Sempre em dinheiro. Sempre a mesma mala. Eu achava que ele era revendedor de carros."', reliability:'med', caveat:null },
    ],
    surveillance: [
      { type:'Interceptação Telefônica', text:'O celular de Vieira fez 34 ligações para um número registrado em nome da "Construtora Barros" nos 3 meses anteriores à prisão.', reliability:'high', caveat:null },
      { type:'Registro de Deslocamentos', text:'Vieira fez 12 viagens a Brasília no último ano, sempre em um único dia, sempre pagando em espécie. Nenhuma reunião de negócios declarada ao fisco.', reliability:'med', caveat:null },
    ],
  },
  petrobras_director: {
    financial: [
      { type:'Registro de Conta Offshore', text:'Uma conta nas Ilhas Cayman em nome de "Marcos A. Cunha" recebeu 22 depósitos totalizando R$14,2 milhões entre 2010 e 2014. O salário declarado de Cunha na Petrobras no mesmo período: R$2,1 milhões.', reliability:'high', caveat:null },
      { type:'Declaração de Bens', text:'Cunha declarou uma casa de praia em Angra dos Reis (R$1,8 milhão), um apartamento em São Paulo (R$3,2 milhões) e três veículos desde 2011. Nenhum deles consta nas declarações de imposto de renda.', reliability:'high', caveat:null },
      { type:'Memorando Interno da Petrobras', text:'Um memorando da Diretoria de Abastecimento aprovou um aditivo contratual acrescentando R$220 milhões ao projeto da refinaria da Barros sem nova licitação. Assinado por Cunha, março de 2012.', reliability:'high', caveat:'Aditivos contratuais sem nova licitação são permitidos sob certas condições. O padrão de aditivos é anômalo, mas não indica corrupção automaticamente.' },
    ],
    witness: [
      { type:'Ex-Funcionário da Petrobras', text:'"Todo mundo na diretoria sabia. O percentual era fixo — de 1% a 3% do valor do contrato, dependendo do projeto. Cunha decidia a taxa."', reliability:'med', caveat:'A fonte foi demitida da Petrobras em 2013 em circunstâncias contestadas e pode ter mágoa pessoal.' },
      { type:'Depoimento de Executivo da Construtora', text:'"Nós pagávamos o que era pedido. Não era negociação. Você pagava ou não fechava o contrato. O gabinete de Cunha definia os termos por meio de intermediários."', reliability:'high', caveat:'A fonte está colaborando sob acordo de leniência. O depoimento é consistente com os documentos, mas há incentivo para incriminar terceiros.' },
    ],
    surveillance: [
      { type:'Registro de Encontro em Hotel', text:'Cunha se encontrou com um representante da Barros em um hotel em São Paulo em quatro ocasiões entre 2011 e 2013. Sem registro oficial. Hospedagem paga com cartão corporativo da Barros.', reliability:'med', caveat:null },
      { type:'Interceptação Telefônica', text:'Ligação interceptada: Cunha diz a um contato não identificado "o próximo ciclo está confirmado — mesma estrutura, mesma taxa. Avisa que vai pelo canal de sempre." Feita duas semanas antes de uma grande adjudicação de contrato.', reliability:'high', caveat:null },
    ],
  },
  contractor: {
    financial: [
      { type:'Ata de Reunião do Cartel', text:'Documentos internos da Barros mostram "reuniões de alinhamento de mercado" com sete grandes construtoras. Os itens de pauta incluem "distribuição de contratos" e "coordenação de preços."', reliability:'high', caveat:null },
      { type:'Registro de Pagamento de Comissão', text:'R$48 milhões transferidos da Barros para a "Atlântico Assessoria" — uma empresa de fachada sem funcionários, com endereço correspondente a um terreno baldio no Recife — entre 2010 e 2014.', reliability:'high', caveat:null },
      { type:'Análise de Sobrepreço Contratual', text:'Auditores federais constataram que 14 contratos da Petrobras firmados com a Barros tiveram sobrepreço médio de 23% em relação a estimativas independentes de custo. Sobrepreço total estimado: R$870 milhões.', reliability:'high', caveat:null },
    ],
    witness: [
      { type:'Depoimento de Participante do Cartel', text:'"A gente dividia os contratos antes das licitações serem publicadas. Alguém vencia, os outros davam lances mais altos de propósito. Os pagamentos aos diretores da Petrobras saíam por cima."', reliability:'high', caveat:'A fonte firmou acordo de leniência. O depoimento é autoincriminatório e permaneceu consistente ao longo de três sessões.' },
      { type:'Ex-Funcionário da Barros', text:'"Havia uma contabilidade paralela. Os livros de verdade eram mantidos à parte. Eu só vi uma vez, por acidente. Sumiram na semana seguinte."', reliability:'med', caveat:'A fonte deixou a Barros em 2014 e não consegue localizar os documentos descritos.' },
    ],
    surveillance: [
      { type:'Vigilância de Reunião do Cartel', text:'A Polícia Federal observou veículos registrados em nome de seis construtoras concorrentes em frente a um hotel em São Paulo na mesma noite de março de 2013. A reunião durou quatro horas.', reliability:'med', caveat:null },
      { type:'Registro de Viagens do Executivo', text:'O CEO da Barros, Tavares, fez 9 viagens a Brasília em 2013, sempre pernoitando, sempre com reuniões com contatos do governo ou da Petrobras na manhã seguinte.', reliability:'med', caveat:null },
    ],
  },
  senator: {
    financial: [
      { type:'Anomalia de Financiamento de Campanha', text:'A campanha de reeleição de 2012 do senador Medeiros recebeu R$6,8 milhões de construtoras — incluindo R$2,1 milhões da Construtora Barros — pulverizados em 34 entidades para dissimular a origem.', reliability:'high', caveat:null },
      { type:'Rastreamento de Conta Offshore', text:'Uma conta uruguaia em nome de um familiar de Medeiros recebeu transferências de uma entidade em Cayman ligada à rede Barros. Total: R$4,4 milhões em três anos.', reliability:'high', caveat:'O familiar alega que as transferências eram empréstimos para investimento imobiliário. Nenhum contrato de empréstimo foi encontrado.' },
      { type:'Registro na Justiça Eleitoral', text:'Medeiros declarou despesas de campanha 40% abaixo do valor real identificado em recibos de empreiteiras. A diferença totaliza R$3,1 milhões.', reliability:'high', caveat:null },
    ],
    witness: [
      { type:'Depoimento de Lobista', text:'"O gabinete de Medeiros definia os termos. Ele queria 2% de todo contrato da Petrobras aprovado pela sua comissão. Ele chamava isso de \'taxa de governança\'."', reliability:'med', caveat:'A fonte colabora sob imunidade. Tem histórico de desavenças com o partido de Medeiros.' },
      { type:'Depoimento do Tesoureiro do Partido', text:'"Me mandaram aceitar os depósitos e não perguntar de onde vinham. A instrução veio diretamente do chefe de gabinete do senador."', reliability:'med', caveat:'A fonte está sob investigação por lavagem de dinheiro relacionada e colabora para reduzir sua exposição.' },
    ],
    surveillance: [
      { type:'Registro de Reuniões no Gabinete', text:'Medeiros se reuniu com lobistas da Barros 11 vezes entre 2011 e 2014, sempre registradas como "reuniões com eleitores." Duração média: 90 minutos.', reliability:'med', caveat:null },
      { type:'Interceptação Telefônica', text:'Interceptado: Medeiros a um homem não identificado: "A próxima parcela precisa vir pela fundação. Do mesmo jeito de sempre. Garante que fique limpo."', reliability:'high', caveat:null },
    ],
  },
  auditor: {
    financial: [
      { type:'Relatório de Auditoria Interna', text:'Uma auditoria interna da Petrobras de 2013 sinalizou 22 contratos como anômalos por variações de preço acima de 15%. O relatório foi enviado à Diretoria de Abastecimento — que aprovou todos os 22 sem revisão adicional.', reliability:'high', caveat:null },
      { type:'Registros Financeiros Pessoais', text:'Depósitos salariais, prestação da casa, financiamento do carro. Sem renda inexplicada. Sem contas offshore. Perfil financeiro compatível com uma auditora da Petrobras na tabela salarial padrão.', reliability:'high', caveat:null },
    ],
    witness: [
      { type:'Autodeclaração da Auditora', text:'"Eu sinalizei os contratos. Escrevi o relatório. Me mandaram arquivar e não falar nada. Três meses depois fui transferida para outro departamento."', reliability:'high', caveat:null },
      { type:'Corroboração de Colega', text:'"Ela levantou o assunto numa reunião de equipe, direto. Disse que os números não batiam. Depois disso ela parou de ser chamada para as reuniões."', reliability:'med', caveat:null },
    ],
    surveillance: [
      { type:'Registro de Comunicações', text:'A auditora contatou a Corregedoria-Geral da União duas vezes em 2013 por e-mail pessoal. As duas mensagens foram registradas, mas não receberam resposta formal.', reliability:'high', caveat:'Contatar a Corregedoria é uma conduta plenamente adequada. Isso sugere que ela tentou agir pelos canais legítimos antes de ser silenciada.' },
    ],
  },
  journalist: {
    financial: [
      { type:'Fragmento de E-mail', text:'"Tenho a ata da reunião das empreiteiras e dois extratos de contas offshore. Meu editor não quer publicar. Se a polícia está investigando, precisamos conversar." — C. Prado, rascunho criptografado, não enviado.', reliability:'high', caveat:null },
    ],
    witness: [
      { type:'Avaliação de Rede de Fontes', text:'Prado cultivou fontes dentro da Petrobras, da Corregedoria-Geral da União e de duas construtoras ao longo de 18 meses. Três pediram anonimato. Uma parou de responder.', reliability:'med', caveat:null },
      { type:'Comunicação Editorial', text:'Bilhete interno do editor de Prado: "Segura a matéria da Barros até depois da eleição. O jurídico está nervoso." Datado de outubro de 2014, duas semanas antes do primeiro turno.', reliability:'high', caveat:null },
    ],
    surveillance: [
      { type:'Registro de Encontro', text:'Prado se encontrou com um funcionário não identificado da Petrobras em frente a um shopping em Curitiba em duas ocasiões. Os encontros duraram menos de 15 minutos.', reliability:'med', caveat:'Relação com fonte jornalística. Investigar os contatos de uma jornalista traz risco jurídico sob as proteções à liberdade de imprensa no Brasil.' },
    ],
  },
  party_treasurer: {
    financial: [
      { type:'Livro-Caixa', text:'Um livro-caixa recuperado no apartamento de Vieira lista 31 destinatários por codinome, com valores e datas. O cruzamento de valores e datas com eventos políticos identifica 6 registros compatíveis com o gabinete de Medeiros.', reliability:'high', caveat:null },
      { type:'Rede de Empresas de Fachada', text:'A "Gestora Horizonte" recebeu R$22 milhões da rede Barros e repassou a 14 entidades — fundações políticas, escritórios de advocacia, pessoas físicas — ao longo de 18 meses.', reliability:'high', caveat:null },
      { type:'Conta Pessoal', text:'Ferreira declarou renda anual de R$280.000. Sua conta pessoal recebeu R$1,9 milhão em depósitos classificados como "honorários de consultoria" de entidades da rede Barros.', reliability:'high', caveat:'Honorários de consultoria a operadores políticos são legais. A questão é se os serviços descritos eram reais.' },
    ],
    witness: [
      { type:'Depoimento do Doleiro', text:'"Foi o Ferreira que me disse como dividir os valores e quais contas usar. Ele tinha um sistema. Era profissional — como uma folha de pagamento."', reliability:'med', caveat:'A fonte (Vieira) colabora sob acordo de leniência e tem forte incentivo para incriminar terceiros.' },
      { type:'Fonte Anônima do Partido', text:'"Todo mundo sabia de onde vinha o dinheiro. O Ferreira administrava. Ele era bom nisso. Ninguém fazia perguntas."', reliability:'low', caveat:'Anônima. Não pode ser corroborada. Pode refletir uma disputa política interna.' },
    ],
    surveillance: [
      { type:'Vigilância de Reunião', text:'Ferreira se encontrou com Vieira em um restaurante em Curitiba em três ocasiões em 2014. Sempre pagando em espécie. Encontros com duração média de duas horas.', reliability:'med', caveat:null },
      { type:'Registro Telefônico', text:'62 ligações entre Ferreira e o número conhecido de Vieira nos 12 meses anteriores à prisão de Vieira. Duração média das ligações: 8 minutos.', reliability:'high', caveat:null },
    ],
  },
};

const BRIBE_MESSAGES_PT = {
  doleiro: 'Um advogado aparece no seu escritório. "Meu cliente está disposto a compensar a força-tarefa por qualquer transtorno. Bastaria que a investigação tomasse outro rumo."',
  petrobras_director: 'Um envelope é deslizado sob a porta do seu quarto de hotel em Brasília. Dentro: um número de conta bancária, R$80.000 e um bilhete: "Para sua aposentadoria. O caso da Petrobras é mais complicado do que parece."',
  contractor: 'Um executivo da Barros te convida para almoçar. Na sobremesa: "Gostaríamos de fazer uma contribuição ao fundo operacional da sua unidade. Totalmente dentro da lei. Um gesto de responsabilidade cívica."',
  senator: 'Uma ligação de um número desconhecido: "O senador está ciente da sua investigação. Ele gostaria de garantir que você tenha recursos para conduzi-la na direção certa. Uma conta foi providenciada."',
  party_treasurer: 'Uma mensagem por terceiros: "O Ferreira respeita o seu trabalho. Ele gostaria de ajudar você a encerrar o caso rápido — e corretamente. O valor reflete o apreço dele."',
};

const TUTORIAL_STEPS_PT = [
  { title:'Bem-vindo(a), Investigador(a)',
    text:'Você está construindo um caso de corrupção contra uma rede de autoridades. Siga pistas, avalie evidências e saiba a hora certa de agir.' },
  { title:'Abra seu primeiro dossiê',
    text:'Clique no caso destacado para selecionar seu primeiro alvo.' },
  { title:'Escolha como investigar',
    text:'Clique em Investigar e depois escolha um método — Financeiro, Testemunhas ou Vigilância.' },
  { title:'Cada método tem um custo',
    text:'Evidências financeiras são confiáveis, mas aumentam o Risco. Testemunhas são rápidas, mas pouco confiáveis. Vigilância aumenta sua Exposição.' },
  { title:'Avalie a evidência',
    text:'Nem tudo que você encontra é sólido. Confira a barra de confiabilidade em cada evidência antes de confiar nela.' },
  { title:'Acompanhe sua confiança',
    text:'Este painel soma a força do seu caso por categoria. Construa-o antes de acusar.' },
  { title:'Registre o caso ou arquive',
    text:'Quando a confiança ultrapassar o limite, Registrar Caso fica disponível. Se um caso esfriar, arquive-o.' },
  { title:'Fique de olho nos seus recursos',
    text:'Integridade, Risco e Exposição acompanham o risco da sua investigação. Administre-os — eles podem encerrar seu caso antes da hora.' },
];

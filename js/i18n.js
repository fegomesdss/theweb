// ===========================
// LANGUAGE / i18n
// Switching languages persists the choice and reloads the page — the
// content packs (data.pt.js) are swapped in once at load, before any
// gameplay function runs, so there's no risk of half-translated state.
// ===========================
const LANG_KEY = 'theweb_lang';
function getLang() { return localStorage.getItem(LANG_KEY) === 'pt' ? 'pt' : 'en'; }
const LANG = getLang();

function setLang(lang) {
  if (lang === LANG) return;
  const gameStarted = document.getElementById('intro-screen').style.display === 'none';
  if (gameStarted && !confirm(t('confirmLangSwitch'))) return;
  localStorage.setItem(LANG_KEY, lang);
  location.reload();
}

const UI = {
  en: {
    pageTitle: 'THE WEB — Anti-Corruption Investigation',
    confirmLangSwitch: 'Changing language will restart your investigation. Continue?',

    // Intro screen
    introCity: 'Curitiba, Brazil — 2015',
    introSubtitle: 'Operation Car Wash — Federal Police',
    introBriefHtml: `You are a Federal Police investigator assigned to a task force probing irregularities at Petrobras, Brazil's state oil company. A money changer arrested at a Curitiba petrol station has given a partial confession. The thread leads upward — to construction cartel executives, to Petrobras directors, to politicians.<br><br>
    Every action leaves a trace. Every accusation carries risk. You have 12 actions. Follow the money.`,
    introStart: 'Begin Investigation',
    theBriefing: 'THE BRIEFING',

    // Ending screen
    endingTitle: 'Investigation Closed',
    endingSub: 'Federal Police — Operation Car Wash — Case #LJ-047',
    endingRestart: 'New Investigation',
    endingIndictmentsFiled: 'Indictments filed',
    endingWrongfulAccusations: 'Wrongful accusations',
    endingBribeFundsAccepted: 'Bribe funds accepted',
    realWorldParallelHeading: 'REAL-WORLD PARALLEL',
    realWorldParallelText: `This investigation mirrors Operation Car Wash (Lava Jato), launched in Brazil in March 2014. Federal Police investigators uncovered a scheme in which construction companies paid bribes worth an estimated R$6.4 billion to Petrobras executives and politicians in exchange for inflated contracts. Over 200 people were convicted including a former president, sitting senators, and the heads of Brazil's largest construction firms. The operation also showed the limits of anti-corruption work: political pressure eventually curtailed the task force, and several convictions were subsequently overturned on procedural grounds.`,
    verdictStrong: (n) => `You built a case that held. ${n} indictments filed, evidence secured, and your integrity intact. The task force expanded. The investigation triggered congressional hearings. Some of the accused fled the country. The network was not destroyed — but it was exposed.`,
    verdictPartial: 'You secured some indictments but the upper levels of the network survived. Tavares was convicted. Cunha resigned. But the senator remained in office, the slush fund was restructured, and the next generation of contracts went out on schedule.',
    verdictBribed: `You took the money. The investigation stalled. You were transferred to a border post in Mato Grosso. Three years later, a journalist published the full story — including your name in Vieira's ledger under a codename.`,
    verdictWoundDown: 'The task force was wound down after 8 months citing "resource constraints." Cunha retired with full pension. The senator was reelected. Vieira served 14 months and was released. You remain an investigator.',

    // Header / masthead
    headerSub: 'Federal Police — Operation Car Wash',
    helpBtnTitle: 'How to play',
    rankLabel: 'Rank',
    fundsLabel: 'Funds',
    actionsRemainingLabel: 'Actions remaining',
    meterIntegrity: 'Integrity',
    meterHeat: 'Heat',
    meterExposure: 'Exposure',
    networkMappedLabel: 'Network mapped',
    statusLabel: 'Status',

    // Left panel
    activeDossiers: 'Active Dossiers',
    statusOpen: 'open', statusClosed: 'closed', statusBuried: 'buried', statusLocked: 'locked',

    // Right panel / intel
    intelHeaderDefault: 'Intel',
    noTargetSelected: 'No target selected',
    clickNodeToViewIntel: 'Click a node on the network map to view intelligence.',
    caseConfidenceLabel: (pct) => `Case Confidence — ${pct}%`,
    catFinancial: 'Financial', catWitness: 'Witness', catSurveillance: 'Surveillance',
    caseReadyToFile: 'Case ready to file',
    needMorePercent: (n) => `Need ${n}% more to file`,
    profileLabel: 'Profile',
    evidenceFiledLabel: 'Evidence Filed',
    knownConnectionsLabel: 'Known Connections',
    unknownBracket: '[ UNKNOWN ]',
    mappedDot: '● mapped', unmappedDot: '○ unmapped',
    statusCaseFiledCorrupt: 'CASE FILED — CORRUPT',
    statusCaseFiledWrongful: 'CASE FILED — WRONGFUL',
    statusArchived: 'INVESTIGATION ARCHIVED',
    statusBribeAccepted: '⚠ BRIBE ACCEPTED',
    noPhotoBadgeHtml: 'NO<br>PHOTO',
    assessNoCase: 'No Case', assessSuspicious: 'Suspicious', assessInvestigateFurther: 'Investigate Further',
    assessLikelyCorrupt: 'Likely Corrupt', assessStrongCase: 'Strong Case',

    // Node reveal (dossier) card
    nrEyebrow: 'Person of Interest — Federal Police',
    nrStamp: 'New Contact',
    knownLinks: 'Known Links',
    continueBtn: 'Continue ›',
    unknownParen: '[ Unknown ]',
    typeLabelPublicOfficial: 'Public official', typeLabelLawEnforcement: 'Law enforcement',
    typeLabelPrivateSector: 'Private sector', typeLabelJudiciary: 'Judiciary', typeLabelPress: 'Press',
    noPhotoSvgLine1: 'NO PHOTO', noPhotoSvgLine2: 'ON FILE',
    filePendingLabel: 'FILE\nPENDING',

    // Method picker
    selectApproach: 'Select an investigative approach',
    chooseApproach: 'CHOOSE INVESTIGATIVE APPROACH',
    moNameFin: 'Financial Audit',
    moDescFin: 'Contracts, shell companies, bank transfers, procurement records. Strong evidence — but generates significant attention.',
    moNameWit: 'Witness Interviews',
    moDescWit: 'Testimony, rumours, insider information. Reveals social connections quickly — but evidence may be incomplete or contradictory.',
    moNameSur: 'Surveillance',
    moDescSur: 'Meetings, phone calls, movement patterns. Reveals hidden network links — but increases your own exposure.',
    efHeat: '↑ Heat', efExposure: '↑ Exposure',
    efConnectBanking: 'Banking links', efConnectSocial: 'Social links', efConnectNetwork: 'Network links',
    efReliableHigh: 'High reliability', efReliableMed: 'Medium reliability', efUnreliable: 'Variable reliability',
    cancelBtn: 'Cancel',

    // Evidence card
    evTypeDefault: 'Document Fragment',
    evCaseNum: 'CASE #LJ-047 — FEDERAL POLICE',
    evSubjectDefault: 'Subject',
    reliabilityLabel: 'Reliability',
    filedByFooter: 'Filed by: ACU Detective',
    fileEvidenceBtn: 'File Evidence ›',
    evidenceNumLabel: (n) => `Evidence #${n}`,
    stampVerified: 'Verified', stampUnconfirmed: 'Unconfirmed', stampUnverified: 'Unverified',
    reliabilityHigh: 'HIGH', reliabilityMed: 'MED', reliabilityLow: 'LOW',
    methodTagFinancial: 'Financial Audit', methodTagWitness: 'Witness Interview', methodTagSurveillance: 'Surveillance',

    // Bottom bar
    endgameBanner: 'Investigation stability critical. Further action may trigger intervention.',
    actionZoneInvestigate: 'Investigate',
    chooseMethodBtn: '▶ Choose Method',
    actionZoneDecision: 'Decision',
    fileCaseBtn: '⚠ File Case',
    archiveBtn: '○ Archive',
    actionZoneBribeOfferHtml: 'Bribe<br>Offer',
    pocketBtn: '$ Pocket It', documentBtn: '⊕ Document', refuseBtn: '✕ Refuse',
    useAsEvidenceBtn: '⊕ Use as Evidence',
    hintNoActions: 'No actions remaining.',
    hintClickNode: 'Click a node to begin.',
    hintCaseAlreadyFiled: (name) => `${name} — case already filed.`,
    hintArchived: (name) => `${name} — archived.`,
    hintTookMoney: 'You took their money. Filing now would expose you.',
    hintReadyToFile: (pct) => `Confidence at ${pct}% — ready to file (free action).`,
    hintConfidenceNeeded: (name, pct, threshold) => `${name}: ${pct}% confidence. Need ${threshold}% to file.`,

    // Bribe modal
    confidentialEyesOnly: 'CONFIDENTIAL — EYES ONLY',
    modalTitleOfferReceived: 'Offer Received',

    // Status / assessment text
    statusUnderControl: 'Under Control', statusUnderPressure: 'Under Pressure',
    statusCompromised: 'Compromised', statusCritical: 'Critical',

    // Log messages
    msgSourceSilent: 'Anonymous source has gone silent.',
    msgMediaLeaks: 'Local media reports internal investigation leaks.',
    msgEvidenceTampering: 'Evidence tampering detected.',
    msgSomeoneKnows: `Someone knows you're investigating.`,
    msgSupervisorBriefing: 'Your supervisor requests a briefing.',
    msgInternalAffairs: 'Internal Affairs has opened an inquiry.',
    msgInvestigationTerminated: 'Your investigation has been terminated.',
    exposureMsgs: [
      'Unknown vehicle observed outside headquarters.',
      'Phone line interference detected.',
      `Colleague asks what cases you're working on.`,
      `Anonymous email: "We know what you're doing."`,
      'Your computer logs show an unauthorised access attempt.',
      'Someone has been asking about you at the front desk.',
    ],
    msgAccusedAnywayDanger: 'You took their money and accused them anyway. This will come back.',
    msgCaseFiledIndicted: (name) => `Case filed: ${name} indicted. Network exposure increases.`,
    msgWasCleanWrongful: (name) => `${name} was clean. Wrongful accusation. Integrity suffers.`,
    msgArchivedWalkFree: (name) => `${name} archived. They walk free.`,
    msgGotWhatTheyPaidFor: (name) => `${name} got what they paid for.`,
    msgArchivedCorrectCall: (name) => `${name} archived. Correct call.`,
    msgBribeOfferMade: 'A bribe offer has been made.',
    bribeWarningText: '⚠ Accepting creates a vulnerability that can be used against you later. Refusing may trigger evidence tampering.',
    bribeIntermediaryFallback: (name, amt) => `An intermediary: stop investigating ${name}. R$${amt} cash.`,
    msgReceivedCompromised: (amount, name) => `€${amount} received. You are compromised on ${name}.`,
    bribeDocumentedType: 'Bribe Offer — Documented',
    bribeDocumentedText: (amount) => `Cash offer of €${amount} to drop the investigation. Intermediary photographed. Chain of custody documented.`,
    msgBribeDocumented: (name) => `Bribe documented as evidence on ${name}.`,
    msgOfferRefused: 'Offer refused. Your record stays clean.',
    msgEvidenceAltered: (name) => `Evidence file on ${name} has been altered.`,
    msgNoNewEvidence: (methodNoun, name) => `No new ${methodNoun} evidence available on ${name}.`,
    methodNounLower: { financial:'financial', witness:'witness', surveillance:'surveillance' },
    msgConnectionMapped: (a, b) => `Connection mapped: ${a} — ${b}.`,
    msgEvidenceFiled: (method, name) => `${method.charAt(0).toUpperCase()+method.slice(1)} evidence filed on ${name}.`,
    msgTaskForceActive: 'Task force active. Follow the money from Vieira.',
    msgNodeRevealedVieira: 'Node revealed: Carlos Vieira — money changer',
    confidenceLabelTooltip: (pct) => `Confidence: ${pct}%`,
    caseFiledTooltip: 'CASE FILED',

    // Termination screen
    terminationDept: 'FEDERAL POLICE — INTERNAL AFFAIRS DEPARTMENT',
    terminationTitle: 'CLOSED',
    terminationCaseLine: 'Operation Car Wash — Case #LJ-047 — Closed by superior order',
    terminationBody: `Your investigation attracted attention at the highest levels of the Federal Police. Acting on a formal complaint filed through the Attorney General's office — citing "procedural irregularities and risks to ongoing diplomatic relationships" — the superintendent has ordered the immediate transfer of all case files to a federal archive and your reassignment to administrative duties pending review.`,
    terminationFootnote: 'This outcome mirrors what happened to several Lava Jato investigators in 2019–2021, when political pressure and legal challenges led to the dismantling of the task force before its work was complete.',
    terminationRestartBtn: 'New Investigation',

    // Tutorial
    tutorialStepCount: (i, total) => `Step ${i} of ${total}`,
    tutorialClickCue: '▸ Click the highlighted area to continue',
    tutorialSkip: 'Skip tour',
    tutorialNext: 'Next',
    tutorialStart: 'Start Investigating',

    // Ranks
    ranks: ['Detective', 'Senior Detective', 'Inspector', 'Chief Inspector', 'Deputy Chief'],
    initialRank: 'Investigator',
  },

  pt: {
    pageTitle: 'THE WEB — Investigação Anticorrupção',
    confirmLangSwitch: 'Mudar o idioma vai reiniciar sua investigação. Continuar?',

    introCity: 'Curitiba, Brasil — 2015',
    introSubtitle: 'Operação Lava Jato — Polícia Federal',
    introBriefHtml: `Você é um investigador da Polícia Federal designado para uma força-tarefa que apura irregularidades na Petrobras, a estatal do petróleo do Brasil. Um doleiro preso em um posto de gasolina em Curitiba deu uma confissão parcial. O rastro leva para cima — a executivos do cartel da construção, a diretores da Petrobras, a políticos.<br><br>
    Toda ação deixa um rastro. Toda acusação traz risco. Você tem 12 ações. Siga o dinheiro.`,
    introStart: 'Iniciar Investigação',
    theBriefing: 'O BRIEFING',

    endingTitle: 'Investigação Encerrada',
    endingSub: 'Polícia Federal — Operação Lava Jato — Caso #LJ-047',
    endingRestart: 'Nova Investigação',
    endingIndictmentsFiled: 'Denúncias registradas',
    endingWrongfulAccusations: 'Acusações injustas',
    endingBribeFundsAccepted: 'Suborno aceito',
    realWorldParallelHeading: 'PARALELO COM A REALIDADE',
    realWorldParallelText: `Esta investigação espelha a Operação Lava Jato, deflagrada no Brasil em março de 2014. Investigadores da Polícia Federal descobriram um esquema em que construtoras pagavam propina — estimada em R$6,4 bilhões — a executivos da Petrobras e a políticos em troca de contratos superfaturados. Mais de 200 pessoas foram condenadas, incluindo um ex-presidente, senadores em exercício e os donos das maiores construtoras do Brasil. A operação também mostrou os limites do combate à corrupção: a pressão política acabou reduzindo a força-tarefa, e várias condenações foram posteriormente anuladas por questões processuais.`,
    verdictStrong: (n) => `Você construiu um caso que se sustentou. ${n} denúncias registradas, provas seguras, e sua integridade intacta. A força-tarefa foi ampliada. A investigação provocou CPIs no Congresso. Alguns dos acusados fugiram do país. A rede não foi destruída — mas foi exposta.`,
    verdictPartial: 'Você garantiu algumas denúncias, mas os escalões mais altos da rede sobreviveram. Tavares foi condenado. Cunha renunciou. Mas o senador continuou no cargo, o caixa dois foi reestruturado, e a próxima geração de contratos saiu conforme o planejado.',
    verdictBribed: 'Você aceitou o dinheiro. A investigação estagnou. Você foi transferido para um posto de fronteira no Mato Grosso. Três anos depois, uma jornalista publicou a história completa — incluindo seu nome no livro-caixa de Vieira, sob um codinome.',
    verdictWoundDown: 'A força-tarefa foi desmontada após 8 meses, citando "restrições de recursos". Cunha se aposentou com aposentadoria integral. O senador foi reeleito. Vieira cumpriu 14 meses e foi solto. Você permanece como investigador.',

    headerSub: 'Polícia Federal — Lava Jato',
    helpBtnTitle: 'Como jogar',
    rankLabel: 'Patente',
    fundsLabel: 'Fundos',
    actionsRemainingLabel: 'Ações restantes',
    meterIntegrity: 'Integridade',
    meterHeat: 'Risco',
    meterExposure: 'Exposição',
    networkMappedLabel: 'Rede mapeada',
    statusLabel: 'Status',

    activeDossiers: 'Dossiês Ativos',
    statusOpen: 'aberto', statusClosed: 'concluído', statusBuried: 'arquivado', statusLocked: 'bloqueado',

    intelHeaderDefault: 'Inteligência',
    noTargetSelected: 'Nenhum alvo selecionado',
    clickNodeToViewIntel: 'Clique em um nó no mapa da rede para ver as informações.',
    caseConfidenceLabel: (pct) => `Confiança do Caso — ${pct}%`,
    catFinancial: 'Financeiro', catWitness: 'Testemunhas', catSurveillance: 'Vigilância',
    caseReadyToFile: 'Caso pronto para ser registrado',
    needMorePercent: (n) => `Faltam ${n}% para registrar`,
    profileLabel: 'Perfil',
    evidenceFiledLabel: 'Evidências Registradas',
    knownConnectionsLabel: 'Conexões Conhecidas',
    unknownBracket: '[ DESCONHECIDO ]',
    mappedDot: '● mapeado', unmappedDot: '○ não mapeado',
    statusCaseFiledCorrupt: 'CASO REGISTRADO — CORRUPTO',
    statusCaseFiledWrongful: 'CASO REGISTRADO — INJUSTO',
    statusArchived: 'INVESTIGAÇÃO ARQUIVADA',
    statusBribeAccepted: '⚠ SUBORNO ACEITO',
    noPhotoBadgeHtml: 'SEM<br>FOTO',
    assessNoCase: 'Sem Caso', assessSuspicious: 'Suspeito', assessInvestigateFurther: 'Investigar Mais',
    assessLikelyCorrupt: 'Provavelmente Corrupto', assessStrongCase: 'Caso Forte',

    nrEyebrow: 'Pessoa de Interesse — Polícia Federal',
    nrStamp: 'Novo Contato',
    knownLinks: 'Vínculos Conhecidos',
    continueBtn: 'Continuar ›',
    unknownParen: '[ Desconhecido ]',
    typeLabelPublicOfficial: 'Autoridade pública', typeLabelLawEnforcement: 'Forças da lei',
    typeLabelPrivateSector: 'Setor privado', typeLabelJudiciary: 'Judiciário', typeLabelPress: 'Imprensa',
    noPhotoSvgLine1: 'SEM FOTO', noPhotoSvgLine2: 'NO ARQUIVO',
    filePendingLabel: 'ARQUIVO\nPENDENTE',

    selectApproach: 'Selecione uma abordagem de investigação',
    chooseApproach: 'ESCOLHA A ABORDAGEM DE INVESTIGAÇÃO',
    moNameFin: 'Auditoria Financeira',
    moDescFin: 'Contratos, empresas de fachada, transferências bancárias, registros de compras. Evidência forte — mas gera atenção significativa.',
    moNameWit: 'Depoimentos de Testemunhas',
    moDescWit: 'Depoimentos, rumores, informações privilegiadas. Revela conexões sociais rapidamente — mas a evidência pode ser incompleta ou contraditória.',
    moNameSur: 'Vigilância',
    moDescSur: 'Reuniões, ligações, padrões de deslocamento. Revela vínculos ocultos da rede — mas aumenta sua própria exposição.',
    efHeat: '↑ Risco', efExposure: '↑ Exposição',
    efConnectBanking: 'Vínculos bancários', efConnectSocial: 'Vínculos sociais', efConnectNetwork: 'Vínculos de rede',
    efReliableHigh: 'Alta confiabilidade', efReliableMed: 'Confiabilidade média', efUnreliable: 'Confiabilidade variável',
    cancelBtn: 'Cancelar',

    evTypeDefault: 'Fragmento de Documento',
    evCaseNum: 'CASO #LJ-047 — POLÍCIA FEDERAL',
    evSubjectDefault: 'Assunto',
    reliabilityLabel: 'Confiabilidade',
    filedByFooter: 'Registrado por: Detetive da Unidade Anticorrupção',
    fileEvidenceBtn: 'Registrar Evidência ›',
    evidenceNumLabel: (n) => `Evidência nº ${n}`,
    stampVerified: 'Verificado', stampUnconfirmed: 'Não Confirmado', stampUnverified: 'Não Verificado',
    reliabilityHigh: 'ALTA', reliabilityMed: 'MÉDIA', reliabilityLow: 'BAIXA',
    methodTagFinancial: 'Auditoria Financeira', methodTagWitness: 'Depoimento de Testemunha', methodTagSurveillance: 'Vigilância',

    endgameBanner: 'Estabilidade da investigação crítica. Novas ações podem provocar intervenção.',
    actionZoneInvestigate: 'Investigar',
    chooseMethodBtn: '▶ Escolher Método',
    actionZoneDecision: 'Decisão',
    fileCaseBtn: '⚠ Registrar Caso',
    archiveBtn: '○ Arquivar',
    actionZoneBribeOfferHtml: 'Oferta<br>de Suborno',
    pocketBtn: '$ Embolsar', documentBtn: '⊕ Documentar', refuseBtn: '✕ Recusar',
    useAsEvidenceBtn: '⊕ Usar como Evidência',
    hintNoActions: 'Nenhuma ação restante.',
    hintClickNode: 'Clique em um nó para começar.',
    hintCaseAlreadyFiled: (name) => `${name} — caso já registrado.`,
    hintArchived: (name) => `${name} — arquivado.`,
    hintTookMoney: 'Você aceitou o dinheiro. Denunciar agora vai te expor.',
    hintReadyToFile: (pct) => `Confiança em ${pct}% — pronto para registrar (ação gratuita).`,
    hintConfidenceNeeded: (name, pct, threshold) => `${name}: ${pct}% de confiança. Faltam ${threshold}% para registrar.`,

    confidentialEyesOnly: 'CONFIDENCIAL — SOMENTE OLHOS AUTORIZADOS',
    modalTitleOfferReceived: 'Oferta Recebida',

    statusUnderControl: 'Sob Controle', statusUnderPressure: 'Sob Pressão',
    statusCompromised: 'Comprometido', statusCritical: 'Crítico',

    msgSourceSilent: 'Uma fonte anônima ficou em silêncio.',
    msgMediaLeaks: 'Imprensa local relata vazamentos da investigação interna.',
    msgEvidenceTampering: 'Adulteração de evidências detectada.',
    msgSomeoneKnows: 'Alguém sabe que você está investigando.',
    msgSupervisorBriefing: 'Seu superior pediu um relatório.',
    msgInternalAffairs: 'A Corregedoria abriu uma apuração.',
    msgInvestigationTerminated: 'Sua investigação foi encerrada.',
    exposureMsgs: [
      'Um veículo desconhecido foi visto perto da sede.',
      'Interferência na linha telefônica detectada.',
      'Um colega pergunta em quais casos você está trabalhando.',
      'E-mail anônimo: "Sabemos o que você está fazendo."',
      'Os registros do seu computador mostram uma tentativa de acesso não autorizado.',
      'Alguém tem perguntado por você na recepção.',
    ],
    msgAccusedAnywayDanger: 'Você aceitou o dinheiro e mesmo assim o acusou. Isso vai voltar para te atormentar.',
    msgCaseFiledIndicted: (name) => `Caso registrado: ${name} foi indiciado. A exposição da rede aumenta.`,
    msgWasCleanWrongful: (name) => `${name} estava limpo. Acusação injusta. Sua integridade é prejudicada.`,
    msgArchivedWalkFree: (name) => `${name} arquivado. Ele(a) sai impune.`,
    msgGotWhatTheyPaidFor: (name) => `${name} conseguiu o que pagou.`,
    msgArchivedCorrectCall: (name) => `${name} arquivado. Decisão correta.`,
    msgBribeOfferMade: 'Uma oferta de suborno foi feita.',
    bribeWarningText: '⚠ Aceitar cria uma vulnerabilidade que pode ser usada contra você depois. Recusar pode provocar adulteração de evidências.',
    bribeIntermediaryFallback: (name, amt) => `Um intermediário: pare de investigar ${name}. R$${amt} em dinheiro.`,
    msgReceivedCompromised: (amount, name) => `€${amount} recebidos. Você está comprometido no caso de ${name}.`,
    bribeDocumentedType: 'Oferta de Suborno — Documentada',
    bribeDocumentedText: (amount) => `Oferta em dinheiro de €${amount} para abandonar a investigação. Intermediário fotografado. Cadeia de custódia documentada.`,
    msgBribeDocumented: (name) => `Suborno documentado como evidência contra ${name}.`,
    msgOfferRefused: 'Oferta recusada. Seu histórico permanece limpo.',
    msgEvidenceAltered: (name) => `O arquivo de evidências de ${name} foi alterado.`,
    msgNoNewEvidence: (methodNoun, name) => `Nenhuma nova evidência ${methodNoun} disponível sobre ${name}.`,
    methodNounLower: { financial:'financeira', witness:'de testemunha', surveillance:'de vigilância' },
    msgConnectionMapped: (a, b) => `Conexão mapeada: ${a} — ${b}.`,
    msgEvidenceFiled: (method, name) => {
      const adj = { financial:'financeira', witness:'de testemunha', surveillance:'de vigilância' }[method] || method;
      return `Evidência ${adj} registrada sobre ${name}.`;
    },
    msgTaskForceActive: 'Força-tarefa ativa. Siga o dinheiro a partir de Vieira.',
    msgNodeRevealedVieira: 'Nó revelado: Carlos Vieira — doleiro',
    confidenceLabelTooltip: (pct) => `Confiança: ${pct}%`,
    caseFiledTooltip: 'CASO REGISTRADO',

    terminationDept: 'POLÍCIA FEDERAL — DEPARTAMENTO DE ASSUNTOS INTERNOS',
    terminationTitle: 'ENCERRADO',
    terminationCaseLine: 'Operação Lava Jato — Caso #LJ-047 — Encerrado por ordem superior',
    terminationBody: 'Sua investigação chamou a atenção dos escalões mais altos da Polícia Federal. Agindo sobre uma denúncia formal apresentada junto à Procuradoria-Geral — citando "irregularidades processuais e riscos a relações diplomáticas em curso" — o superintendente ordenou a transferência imediata de todos os arquivos do caso para um arquivo federal e a sua realocação para funções administrativas, pendente de revisão.',
    terminationFootnote: 'Este desfecho espelha o que aconteceu com vários investigadores da Lava Jato entre 2019 e 2021, quando pressão política e disputas judiciais levaram ao desmonte da força-tarefa antes que seu trabalho fosse concluído.',
    terminationRestartBtn: 'Nova Investigação',

    tutorialStepCount: (i, total) => `Passo ${i} de ${total}`,
    tutorialClickCue: '▸ Clique na área destacada para continuar',
    tutorialSkip: 'Pular tutorial',
    tutorialNext: 'Próximo',
    tutorialStart: 'Começar a Investigar',

    ranks: ['Detetive', 'Detetive Sênior', 'Inspetor', 'Inspetor-Chefe', 'Subchefe'],
    initialRank: 'Investigador',
  },
};

function t(key, ...args) {
  const dict = UI[LANG] || UI.en;
  let entry = dict[key];
  if (entry === undefined) entry = UI.en[key];
  if (entry === undefined) return key;
  return typeof entry === 'function' ? entry(...args) : entry;
}

// ===========================
// Swap the shared game-content objects to Portuguese, in place, so
// every other file's `NODES`/`CASES`/`EVIDENCE_DB`/`BRIBE_MESSAGES`/
// `TUTORIAL_STEPS` references keep working unchanged.
// ===========================
function applyContentLanguage() {
  if (LANG !== 'pt') return;
  NODES.forEach(n => { const tr = NODE_I18N_PT[n.id]; if (tr) Object.assign(n, tr); });
  CASES.forEach(c => { const tr = CASE_I18N_PT[c.id]; if (tr) Object.assign(c, tr); });
  Object.keys(EVIDENCE_DB_PT).forEach(k => { EVIDENCE_DB[k] = EVIDENCE_DB_PT[k]; });
  Object.keys(BRIBE_MESSAGES_PT).forEach(k => { BRIBE_MESSAGES[k] = BRIBE_MESSAGES_PT[k]; });
  TUTORIAL_STEPS.forEach((step, i) => {
    const tr = TUTORIAL_STEPS_PT[i];
    if (tr) { step.title = tr.title; step.text = tr.text; }
  });
}
applyContentLanguage();

// ===========================
// Apply translations to static markup + wire the language menu
// ===========================
function applyStaticI18n() {
  document.documentElement.lang = (LANG === 'pt') ? 'pt-BR' : 'en';
  document.title = t('pageTitle');
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.getAttribute('data-i18n')); });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
  document.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = t(el.getAttribute('data-i18n-title')); });
  document.querySelectorAll('[data-i18n-label]').forEach(el => { el.setAttribute('data-label', t(el.getAttribute('data-i18n-label'))); });
  updateLangSwitchUI();
}

function updateLangSwitchUI() {
  const en = document.getElementById('lang-btn-en');
  const pt = document.getElementById('lang-btn-pt');
  if (en) en.classList.toggle('active', LANG === 'en');
  if (pt) pt.classList.toggle('active', LANG === 'pt');
}

applyStaticI18n();

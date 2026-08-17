// ===========================
// EVIDENCE TEMPLATES — three categories, reliability ratings, optional caveats
// ===========================
const EVIDENCE_DB = {
  doleiro: {
    financial: [
      { type:'Cash Seizure Record', text:'R$3.2M found in suitcases at the Curitiba petrol station during a routine Federal Police stop. Denominations consistent with structured deposits to avoid mandatory reporting thresholds.', reliability:'high', caveat:null },
      { type:'Bank Transfer Record', text:'47 wire transfers from a Panama-registered shell company to "Serra Negra Consultoria" — no employees, no address, has never filed a tax return.', reliability:'high', caveat:null },
      { type:'Currency Exchange Log', text:'Vieira exchanged US$8.4M through three exchange houses over 18 months, always in amounts just below the mandatory reporting threshold of US$10,000.', reliability:'high', caveat:null },
    ],
    witness: [
      { type:'Informant Statement', text:'"Vieira collected from the construction companies and delivered to the politicians. He kept a spreadsheet. I saw it once — codenames, amounts, dates."', reliability:'med', caveat:'Source is under a separate fraud investigation and may be providing information to reduce their own sentence.' },
      { type:'Petrol Station Attendant', text:'"He came every Tuesday. Always cash. Always the same suitcase. I thought he was a car dealer."', reliability:'med', caveat:null },
    ],
    surveillance: [
      { type:'Phone Intercept', text:'Vieira\'s mobile made 34 calls to a number registered to "Construtora Barros" in the 3 months prior to arrest.', reliability:'high', caveat:null },
      { type:'Movement Log', text:'Vieira made 12 trips to Brasília in the past year, always single-day, always paying in cash. No business meetings declared to tax authorities.', reliability:'med', caveat:null },
    ],
  },
  petrobras_director: {
    financial: [
      { type:'Offshore Account Record', text:'A Cayman Islands account in the name of "Marcos A. Cunha" received 22 deposits totalling R$14.2M between 2010 and 2014. Cunha\'s declared Petrobras salary over the same period: R$2.1M.', reliability:'high', caveat:null },
      { type:'Property Declaration', text:'Cunha declared a beach house in Angra dos Reis (R$1.8M), a São Paulo apartment (R$3.2M), and three vehicles since 2011. None appear in income tax filings.', reliability:'high', caveat:null },
      { type:'Internal Petrobras Memo', text:'A Downstream Directorate memo approved a contract amendment adding R$220M to the Barros refinery project without competitive re-tendering. Signed by Cunha, March 2012.', reliability:'high', caveat:'Contract amendments without re-tendering are permitted under certain conditions. The pattern of amendments is anomalous but not automatically corrupt.' },
    ],
    witness: [
      { type:'Former Petrobras Employee', text:'"Everyone in the directorate knew. The percentage was fixed — 1% to 3% of contract value, depending on the project. Cunha decided the rate."', reliability:'med', caveat:'Source was dismissed from Petrobras in 2013 in disputed circumstances and may have personal grievance.' },
      { type:'Construction Executive Deposition', text:'"We paid what was asked. It was not a negotiation. You paid or you did not get the contract. Cunha\'s office set the terms through intermediaries."', reliability:'high', caveat:'Source is cooperating under a leniency agreement. Testimony is consistent with documents but carries incentive to implicate others.' },
    ],
    surveillance: [
      { type:'Hotel Meeting Record', text:'Cunha met a Barros representative at a São Paulo hotel on four occasions between 2011 and 2013. No official record. Accommodation paid by Barros company card.', reliability:'med', caveat:null },
      { type:'Phone Intercept', text:'Intercepted call: Cunha tells an unidentified contact "the next cycle is confirmed — same structure, same rate. Tell them it goes through the usual channel." Made two weeks before a major contract award.', reliability:'high', caveat:null },
    ],
  },
  contractor: {
    financial: [
      { type:'Cartel Meeting Minutes', text:'Internal Barros documents show "market alignment meetings" attended by seven major construction firms. Agenda items include "contract allocation" and "pricing coordination."', reliability:'high', caveat:null },
      { type:'Commission Payment Record', text:'R$48M transferred from Barros to "Atlântico Assessoria" — a front company with no employees and an address matching a vacant lot in Recife — between 2010 and 2014.', reliability:'high', caveat:null },
      { type:'Contract Overbilling Analysis', text:'Federal auditors found 14 Petrobras contracts awarded to Barros were overbilled by an average of 23% against independent cost estimates. Total estimated overcharge: R$870M.', reliability:'high', caveat:null },
    ],
    witness: [
      { type:'Cartel Participant Statement', text:'"We divided the contracts before the tenders were published. Someone would win, the others would bid high deliberately. The payments to Petrobras directors came off the top."', reliability:'high', caveat:'Source has entered a leniency agreement. Testimony is self-incriminating and has been consistent across three sessions.' },
      { type:'Former Barros Employee', text:'"There was a parallel accounting system. The real books were kept separate. I only saw them once, by accident. They disappeared the next week."', reliability:'med', caveat:'Source left Barros in 2014 and cannot locate the documents described.' },
    ],
    surveillance: [
      { type:'Cartel Meeting Surveillance', text:'Federal Police observed vehicles registered to six competing construction companies outside a São Paulo hotel on the same evening in March 2013. Meeting lasted four hours.', reliability:'med', caveat:null },
      { type:'Executive Travel Log', text:'Barros CEO Tavares made 9 Brasília trips in 2013, always overnight, always meeting government or Petrobras contacts the following morning.', reliability:'med', caveat:null },
    ],
  },
  senator: {
    financial: [
      { type:'Campaign Finance Anomaly', text:'Senator Medeiros\'s 2012 reelection campaign received R$6.8M from construction companies — including R$2.1M from Construtora Barros — spread across 34 entities to obscure the source.', reliability:'high', caveat:null },
      { type:'Offshore Account Trace', text:'A Uruguayan account in the name of a Medeiros family member received transfers from a Cayman entity linked to the Barros network. Total: R$4.4M over three years.', reliability:'high', caveat:'The family member claims the transfers were loans for property investment. No loan agreement has been found.' },
      { type:'Electoral Court Filing', text:'Medeiros declared campaign expenses 40% below the actual value identified in contractor receipts. The discrepancy totals R$3.1M.', reliability:'high', caveat:null },
    ],
    witness: [
      { type:'Lobbyist Deposition', text:'"Medeiros\'s office set the terms. He wanted 2% of every Petrobras contract approved through his committee. He called it his governance fee."', reliability:'med', caveat:'Source cooperating under immunity. Has a history of disputes with Medeiros\'s party.' },
      { type:'Party Treasurer Statement', text:'"I was told to accept the deposits and not ask where they came from. That instruction came directly from the senator\'s chief of staff."', reliability:'med', caveat:'Source is under investigation for related money laundering and is cooperating to reduce exposure.' },
    ],
    surveillance: [
      { type:'Senate Office Meeting Log', text:'Medeiros met Barros lobbyists 11 times between 2011 and 2014, always recorded as "constituent meetings." Average duration: 90 minutes.', reliability:'med', caveat:null },
      { type:'Phone Intercept', text:'Intercepted: Medeiros to unidentified male: "The next tranche needs to come through the foundation. Same way as before. Make sure it\'s clean."', reliability:'high', caveat:null },
    ],
  },
  auditor: {
    financial: [
      { type:'Internal Audit Report', text:'A 2013 Petrobras internal audit flagged 22 contracts as anomalous due to price variances exceeding 15%. The report was submitted to the Downstream Directorate — which approved all 22 without further review.', reliability:'high', caveat:null },
      { type:'Auditor Personal Records', text:'Salary deposits, mortgage payments, car loan. No unexplained income. No offshore accounts. Financial profile consistent with a Petrobras auditor on standard pay scale.', reliability:'high', caveat:null },
    ],
    witness: [
      { type:'Auditor Self-Statement', text:'"I flagged the contracts. I wrote the report. I was told to archive it and say nothing. Three months later I was transferred to a different department."', reliability:'high', caveat:null },
      { type:'Colleague Corroboration', text:'"She raised it in a team meeting, directly. Said the numbers didn\'t add up. After that she stopped being invited to meetings."', reliability:'med', caveat:null },
    ],
    surveillance: [
      { type:'Communications Record', text:'The auditor contacted the Federal Comptroller\'s Office twice in 2013 via personal email. Both messages were logged but received no formal response.', reliability:'high', caveat:'Contacting the Comptroller\'s Office is entirely appropriate conduct. This suggests she tried to act through legitimate channels before being silenced.' },
    ],
  },
  journalist: {
    financial: [
      { type:'Email Fragment', text:'"I have the contractor meeting minutes and two offshore account statements. My editor won\'t publish. If the police are investigating, we should talk." — C. Prado, encrypted draft, unsent.', reliability:'high', caveat:null },
    ],
    witness: [
      { type:'Source Network Assessment', text:'Prado has cultivated sources inside Petrobras, the Federal Comptroller\'s Office, and two construction firms over 18 months. Three have requested anonymity. One has stopped responding.', reliability:'med', caveat:null },
      { type:'Editorial Communication', text:'Internal note from Prado\'s editor: "Hold the Barros piece until after the election. Legal is nervous." Dated October 2014, two weeks before the first round.', reliability:'high', caveat:null },
    ],
    surveillance: [
      { type:'Meeting Record', text:'Prado met an unidentified Petrobras employee outside a Curitiba shopping centre on two occasions. Meetings lasted under 15 minutes.', reliability:'med', caveat:'Source relationship. Investigating a journalist\'s contacts carries legal risk under Brazilian press freedom protections.' },
    ],
  },
  party_treasurer: {
    financial: [
      { type:'Cash Ledger', text:'A ledger recovered from Vieira\'s apartment lists 31 recipients by code name with amounts and dates. Cross-referencing amounts and dates against political events identifies 6 entries consistent with Medeiros\'s office.', reliability:'high', caveat:null },
      { type:'Shell Company Network', text:'"Gestora Horizonte" received R$22M from the Barros network and disbursed it to 14 entities — political foundations, law firms, private individuals — across 18 months.', reliability:'high', caveat:null },
      { type:'Personal Account', text:'Ferreira declared income of R$280,000 annually. His personal account received R$1.9M in deposits classified as "consulting fees" from entities in the Barros network.', reliability:'high', caveat:'Consulting fees to political operatives are legal. The question is whether the services described were real.' },
    ],
    witness: [
      { type:'Doleiro Deposition', text:'"Ferreira was the one who told me how to split the amounts and which accounts to use. He had a system. It was professional — like a payroll."', reliability:'med', caveat:'Source (Vieira) is cooperating under leniency and has strong incentive to implicate others.' },
      { type:'Anonymous Party Insider', text:'"Everyone knew where the money came from. Ferreira managed it. He was good at it. Nobody asked questions."', reliability:'low', caveat:'Anonymous. Cannot be corroborated. Could reflect an internal political dispute.' },
    ],
    surveillance: [
      { type:'Meeting Surveillance', text:'Ferreira met Vieira at a Curitiba restaurant on three occasions in 2014. Always paid in cash. Meetings averaged two hours.', reliability:'med', caveat:null },
      { type:'Phone Log', text:'62 calls between Ferreira and Vieira\'s known number in the 12 months before Vieira\'s arrest. Average call length: 8 minutes.', reliability:'high', caveat:null },
    ],
  },
};

// ===========================
// NODE DATA
// ===========================
const NODES = [
  {
    id:'player', name:'YOU', role:'Federal Police Investigator', x:0.50, y:0.55,
    type:'player', corrupt:false, bribeAmount:0,
    intel:'You are a Federal Police investigator assigned to the Curitiba task force. Your orders are to follow the money trail from a petrol station seizure upward into the Petrobras contracting network.',
    connections:[]
  },
  {
    id:'doleiro', name:'CARLOS VIEIRA', role:'Money Changer (Doleiro)', x:0.50, y:0.82,
    type:'business', corrupt:true, bribeAmount:8000,
    intel:'Arrested at a Curitiba petrol station with R$3.2M in cash. Small-time operator who moved money between construction companies and political recipients. Has given a partial confession — but is protecting names higher up.',
    connections:['petrobras_director','contractor','party_treasurer']
  },
  {
    id:'petrobras_director', name:'MARCOS CUNHA', role:'Downstream Director, Petrobras', x:0.50, y:0.14,
    type:'politician', corrupt:true, bribeAmount:22000,
    intel:'Head of the Petrobras Downstream Directorate for six years. Oversaw R$4.8B in refinery contracts. Publicly respected — appeared on a government anti-corruption advisory board in 2013.',
    connections:['doleiro','contractor','senator']
  },
  {
    id:'contractor', name:'RODRIGO TAVARES', role:'CEO, Construtora Barros', x:0.82, y:0.30,
    type:'business', corrupt:true, bribeAmount:18000,
    intel:'Leads one of Brazil\'s largest construction firms. Barros has won R$12B in Petrobras contracts since 2008. Tavares sits on the board of two federal infrastructure foundations.',
    connections:['petrobras_director','doleiro','auditor']
  },
  {
    id:'senator', name:'HÉLIO MEDEIROS', role:'Senator, Infrastructure Committee', x:0.18, y:0.20,
    type:'politician', corrupt:true, bribeAmount:25000,
    intel:'Chair of the Senate Infrastructure Committee, which approves major Petrobras investment budgets. In office for 14 years. Supported the creation of the anti-corruption agency he now chairs.',
    connections:['petrobras_director','party_treasurer']
  },
  {
    id:'auditor', name:'BEATRIZ SANTOS', role:'Internal Auditor, Petrobras', x:0.82, y:0.72,
    type:'legal', corrupt:false, bribeAmount:0,
    intel:'Petrobras internal auditor who flagged 22 anomalous contracts in 2013. Her report was archived without review. She was transferred to an administrative role the following quarter and has been silent since.',
    connections:['contractor','journalist']
  },
  {
    id:'journalist', name:'CAMILA PRADO', role:'Investigative Journalist', x:0.18, y:0.72,
    type:'press', corrupt:false, bribeAmount:0,
    intel:'Investigative reporter for a Curitiba newspaper. 18 months into a story on Petrobras contracting. Three drafts killed by her editor. She has documents — and is looking for a federal source to go to press.',
    connections:['auditor','senator']
  },
  {
    id:'party_treasurer', name:'GILBERTO FERREIRA', role:'Party Treasurer', x:0.50, y:0.42,
    type:'business', corrupt:true, bribeAmount:12000,
    intel:'Treasurer of the governing party\'s São Paulo branch. Manages campaign finance and "operational funds." Long-time political operative with no public profile. Has never given a media interview.',
    connections:['senator','doleiro']
  },
];

const CASES = [
  { id:'doleiro_case',   name:'THE LAUNDERING CASE', meta:'Money laundering — petrol station seizure', targetNode:'doleiro', status:'open' },
  { id:'petrobras_case', name:'THE DIRECTORATE CASE', meta:'Petrobras directorate corruption', targetNode:'petrobras_director', status:'locked' },
  { id:'cartel_case',    name:'THE CARTEL CASE',  meta:'Construction cartel — bid rigging', targetNode:'contractor', status:'locked' },
  { id:'senator_case',   name:'THE KICKBACK CASE', meta:'Political slush fund distribution', targetNode:'senator', status:'locked' },
  { id:'treasurer_case', name:'THE SLUSH FUND CASE',   meta:'Party treasurer — cash disbursement', targetNode:'party_treasurer', status:'locked' },
];

// ===========================
// PORTRAITS — extracted from the original inline base64 data-URIs
// into real files under assets/portraits/. Player has no portrait;
// the UI already falls back to an SVG "NO PHOTO ON FILE" placeholder.
// ===========================
const PORTRAITS = {
  doleiro: 'assets/portraits/doleiro.png',
  petrobras_director: 'assets/portraits/petrobras_director.png',
  contractor: 'assets/portraits/contractor.png',
  senator: 'assets/portraits/senator.png',
  auditor: 'assets/portraits/auditor.png',
  journalist: 'assets/portraits/journalist.png',
  party_treasurer: 'assets/portraits/party_treasurer.png',
};

// ===========================
// CONFIDENCE SCORE CONSTANTS
// ===========================
const REL_WEIGHT = { high:1.0, med:0.6, low:0.3 };
const CAT_MAX = 2.0; // max weighted score per category before capping

// Threshold to enable accusation: 40% confidence
const ACCUSE_THRESHOLD = 40;

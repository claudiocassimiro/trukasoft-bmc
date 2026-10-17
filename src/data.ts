export type BlockId =
  | "partners"
  | "activities"
  | "resources"
  | "value"
  | "relationships"
  | "channels"
  | "segments"
  | "costs"
  | "revenue";

export type LensId = "all" | "commercial" | "delivery" | "economics";

export interface CanvasItem {
  title: string;
  detail: string;
}

export interface CanvasBlock {
  id: BlockId;
  index: string;
  name: string;
  question: string;
  items: CanvasItem[];
  connects: BlockId[];
  reading: string;
}

export interface RevenuePath {
  id: string;
  index: string;
  name: string;
  role: string;
  segment: string;
  offer: string;
  model: string;
  blocks: BlockId[];
  story: string;
}

export interface Lens {
  id: LensId;
  label: string;
  description: string;
  blocks: BlockId[] | null;
}

export const blocks: Record<BlockId, CanvasBlock> = {
  partners: {
    id: "partners",
    index: "01",
    name: "Parcerias-chave",
    question: "Quem ajuda a chegar em talento e cliente?",
    items: [
      {
        title: "Instituições de ensino",
        detail:
          "Coordenações e universidades locais de Engenharia de Software para captação direta de talentos em fase de formatura.",
      },
      {
        title: "Comunidades e meetups",
        detail:
          "Grupos regionais de desenvolvedores (React, Node e outros) para fortalecimento de marca e hunting orgânico.",
      },
      {
        title: "Provedores de nuvem",
        detail:
          "Alianças com AWS e GCP para indicações cruzadas de clientes que migram para a nuvem.",
      },
      {
        title: "Ecossistemas de inovação",
        detail:
          "Redes de aceleração e hubs locais de tecnologia para conexão com startups em fase de captação.",
      },
    ],
    connects: ["resources", "activities", "segments", "channels"],
    reading:
      "Parceria aqui é pipeline: de gente, nas universidades e comunidades, e de conta, nos hubs e nas nuvens.",
  },
  activities: {
    id: "activities",
    index: "02",
    name: "Atividades-chave",
    question: "O que a operação repete toda semana?",
    items: [
      {
        title: "Comercial B2B",
        detail:
          "Prospecção ativa com foco em decisores e desenho de propostas de valor técnicas e comerciais.",
      },
      {
        title: "Recrutamento técnico",
        detail:
          "Hunting no mercado de desenvolvimento e condução de testes e dinâmicas de engenharia.",
      },
      {
        title: "Gestão e retenção",
        detail:
          "Onboarding operacional de novos devs e acompanhamento de carreira em 1-on-1s.",
      },
      {
        title: "Engenharia de software",
        detail:
          "Arquitetura, governança de código e publicação estável dos sistemas criados internamente.",
      },
    ],
    connects: ["resources", "value", "partners", "channels", "relationships", "costs"],
    reading:
      "Quatro rotinas sustentam o modelo: vender para quem decide, recrutar, reter quem foi alocado e engenheirar o que é construído dentro de casa.",
  },
  resources: {
    id: "resources",
    index: "03",
    name: "Recursos-chave",
    question: "O que precisa estar disponível?",
    items: [
      {
        title: "Humanos",
        detail:
          "Banco de talentos técnicos, engenheiros seniores (tech leads e arquitetos) e tech recruiters dedicados.",
      },
      {
        title: "Intelectuais",
        detail:
          "Metodologia própria de avaliação técnica e boilerplates e arquiteturas reutilizáveis.",
      },
      {
        title: "Tecnológicos",
        detail:
          "ATS para triagem, ferramentas de produtividade e IA (GitHub Copilot) e infraestrutura em nuvem.",
      },
      {
        title: "Financeiros",
        detail:
          "Capital de giro para cobrir o descasamento entre a folha e o faturamento B2B.",
      },
    ],
    connects: ["activities", "partners", "costs", "value", "revenue"],
    reading:
      "O recurso escasso é gente sênior com método de avaliação. O caixa precisa aguentar salário antes da nota do cliente.",
  },
  value: {
    id: "value",
    index: "04",
    name: "Proposta de valor",
    question: "Qual dor a Trukasoft tira do caminho?",
    items: [
      {
        title: "Escalabilidade sem atrito",
        detail:
          "Alocação imediata de engenheiros integrados ao time do cliente, sem o custo, a burocracia e a lentidão do RH tradicional.",
      },
      {
        title: "Desenvolvimento full-cycle",
        detail:
          "Engenharia completa, da arquitetura à produção, assumida de forma interna e sob demanda.",
      },
      {
        title: "Eficiência e sustentação",
        detail:
          "Alocação focada na manutenção de sistemas existentes, liberando o time core do cliente para inovar.",
      },
    ],
    connects: ["segments", "revenue", "activities", "resources", "channels", "relationships"],
    reading:
      "São três ofertas, não uma. Cada uma conversa com um segmento e com um jeito diferente de faturar.",
  },
  relationships: {
    id: "relationships",
    index: "05",
    name: "Relacionamento",
    question: "Como a confiança se mantém depois da venda?",
    items: [
      {
        title: "Venda consultiva técnica",
        detail:
          "Alinhamento direto entre especialistas e lideranças técnicas na fase comercial, para desenhar o escopo com precisão.",
      },
      {
        title: "Parceria de longo prazo",
        detail:
          "Atuação de trusted advisor, com sugestões proativas de melhoria arquitetural e caminhos de evolução tecnológica.",
      },
      {
        title: "Checkpoints de qualidade",
        detail:
          "Reuniões regulares para analisar métricas de entrega e satisfação.",
      },
      {
        title: "Gestão de clima",
        detail:
          "1-on-1s com o desenvolvedor alocado para reduzir risco de turnover e manter a estabilidade do contrato.",
      },
    ],
    connects: ["segments", "channels", "activities", "value"],
    reading:
      "A relação começa na mesa técnica, antes do contrato, e continua no cuidado com quem está alocado. Turnover aqui é risco de receita.",
  },
  channels: {
    id: "channels",
    index: "06",
    name: "Canais",
    question: "Por onde a Trukasoft chega e entrega?",
    items: [
      {
        title: "Aquisição",
        detail:
          "Prospecção ativa via LinkedIn Sales Navigator, indicações e networking, conteúdo técnico para inbound e SEO, e presença em eventos de tecnologia.",
      },
      {
        title: "Entrega e atendimento",
        detail:
          "Slack ou Teams no dia a dia, Jira, Linear ou Trello na gestão, GitHub ou GitLab no código, Google Meet ou Zoom nas reuniões estratégicas.",
      },
    ],
    connects: ["segments", "relationships", "activities", "partners"],
    reading:
      "A aquisição é outbound, indicação e conteúdo. A entrega acontece dentro das ferramentas que o cliente já usa.",
  },
  segments: {
    id: "segments",
    index: "07",
    name: "Segmentos de clientes",
    question: "Para quem a Trukasoft cria valor?",
    items: [
      {
        title: "Startups em crescimento",
        detail:
          "Empresas de tecnologia em rápida expansão que precisam acelerar entregas técnico-comerciais.",
      },
      {
        title: "Empresas em transformação digital",
        detail:
          "Negócios consolidados ou tech de médio porte focados em criar novos produtos do zero.",
      },
      {
        title: "Techs com sistemas legados",
        detail:
          "Empresas com softwares robustos que demandam alta dedicação em manutenção e sustentação.",
      },
      {
        title: "Tomadores de decisão",
        detail:
          "CTOs, diretores de engenharia, VPs de produto e CEOs. É com essas pessoas que a conversa comercial acontece.",
      },
    ],
    connects: ["value", "channels", "relationships", "revenue", "partners"],
    reading:
      "Três dores de compra e um único tipo de mesa: liderança técnica ou o CEO. O pitch muda; o decisor, pouco.",
  },
  costs: {
    id: "costs",
    index: "08",
    name: "Estrutura de custos",
    question: "Onde o dinheiro sai?",
    items: [
      {
        title: "Pessoal",
        detail:
          "O maior peso. Folha, encargos, impostos (Simples Nacional ou MEI, quando aplicável) e benefícios de engenheiros e tech leads.",
      },
      {
        title: "Investimento comercial",
        detail:
          "Assinaturas de ferramentas de vendas B2B e orçamento para eventos e anúncios institucionais.",
      },
      {
        title: "Infraestrutura operacional",
        detail:
          "Licenças de produtividade (Slack, Jira, CRMs), ambientes de cloud (AWS/GCP) e ferramentas de IA.",
      },
    ],
    connects: ["resources", "revenue", "activities"],
    reading:
      "A estrutura é uma folha de pagamento com uma camada comercial e uma camada de ferramenta em volta. Margem depende de ocupação do time.",
  },
  revenue: {
    id: "revenue",
    index: "09",
    name: "Fontes de receita",
    question: "Como o valor vira faturamento?",
    items: [
      {
        title: "Retainer mensal",
        detail:
          "Carro-chefe. Contratos de mensalidade fixa por profissional alocado no modelo de staff augmentation.",
      },
      {
        title: "Time & Materials",
        detail:
          "Cobrança por hora trabalhada, focada em suporte, melhorias e sustentação de sistemas legados.",
      },
      {
        title: "Escopo fechado",
        detail:
          "Faturamento por entregas e milestones para sistemas construídos do zero internamente.",
      },
    ],
    connects: ["value", "segments", "costs", "resources"],
    reading:
      "Recorrência por pessoa alocada carrega o negócio. Hora e escopo fechado cobrem sustentação e produto novo.",
  },
};

export const canvasOrder: BlockId[] = [
  "partners",
  "activities",
  "resources",
  "value",
  "relationships",
  "channels",
  "segments",
  "costs",
  "revenue",
];

export const readingOrder: BlockId[] = [
  "segments",
  "value",
  "channels",
  "relationships",
  "revenue",
  "activities",
  "resources",
  "partners",
  "costs",
];

export const lenses: Lens[] = [
  {
    id: "all",
    label: "Canvas completo",
    description: "Os nove blocos e as ligações de quem está selecionado.",
    blocks: null,
  },
  {
    id: "commercial",
    label: "Como vendemos",
    description:
      "O recorte do desafio diário: quem decide, por onde a Trukasoft chega, como a relação se sustenta e como isso vira receita.",
    blocks: ["segments", "value", "channels", "relationships", "revenue"],
  },
  {
    id: "delivery",
    label: "Como entregamos",
    description:
      "A promessa técnica e o que precisa existir para cumpri-la: rotina, gente, método e parcerias.",
    blocks: ["value", "activities", "resources", "partners"],
  },
  {
    id: "economics",
    label: "Como o caixa fecha",
    description:
      "Receita recorrente de um lado, folha e capital de giro do outro. O descasamento B2B mora aqui.",
    blocks: ["revenue", "costs", "resources"],
  },
];

export const paths: RevenuePath[] = [
  {
    id: "retainer",
    index: "01",
    name: "Retainer",
    role: "Carro-chefe",
    segment: "Startups em crescimento",
    offer: "Staff augmentation",
    model: "Mensalidade por profissional",
    blocks: ["segments", "value", "channels", "relationships", "revenue", "resources", "activities"],
    story:
      "Scale-ups precisam acelerar entregas técnico-comerciais. A Trukasoft entra com engenheiros dentro do time do cliente e cobra uma mensalidade fixa por profissional, fora do ciclo do RH tradicional. A relação se sustenta na venda consultiva, nos checkpoints e no 1-on-1 de quem está alocado.",
  },
  {
    id: "fixed",
    index: "02",
    name: "Escopo fechado",
    role: "Greenfield",
    segment: "Transformação digital",
    offer: "Desenvolvimento full-cycle",
    model: "Faturamento por marcos",
    blocks: ["segments", "value", "activities", "resources", "revenue"],
    story:
      "Empresas que vão criar um produto do zero entregam a engenharia inteira, da arquitetura à produção. O trabalho é interno e sob demanda, e o faturamento acompanha milestones. Depende de tech leads, boilerplates e governança de código.",
  },
  {
    id: "tm",
    index: "03",
    name: "Time & Materials",
    role: "Legados",
    segment: "Sistemas legados",
    offer: "Sustentação",
    model: "Cobrança por hora",
    blocks: ["segments", "value", "revenue", "activities", "relationships"],
    story:
      "Softwares robustos pedem manutenção contínua. A alocação cobre suporte, melhorias e sustentação, cobrada por hora, e libera o time core do cliente para inovar. O checkpoint de qualidade é o que mantém o contrato previsível.",
  },
];

export function getBlock(id: BlockId): CanvasBlock {
  return blocks[id];
}

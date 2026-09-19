import heroCakeImg from '../assets/images/cake_hero_artisan_1789837542240.jpg';
import redVelvetImg from '../assets/images/cake_red_velvet_1789837553321.jpg';
import chocolateDripImg from '../assets/images/cake_chocolate_drip_1789837563145.jpg';
import carrotVolcanoImg from '../assets/images/cake_carrot_volcano_1789837572206.jpg';
import pistachioImg from '../assets/images/cake_pistachio_1789837582366.jpg';

import {
  CakeItem,
  BatterOption,
  FillingOption,
  FrostingOption,
  SizeOption,
  ExtraOption,
  Review,
  FAQItem,
} from '../types';

export const HERO_IMAGE = heroCakeImg;

export const CAKES_CATALOG: CakeItem[] = [
  {
    id: 'red-velvet-supreme',
    name: 'Red Velvet Supreme & Frutas Vermelhas',
    category: 'festivos',
    tag: 'Mais Querido',
    shortDesc: 'Massa aveludada de cacau suave com recheio cremoso de cream cheese artesanal e morangos frescos.',
    fullDesc: 'O clássico norte-americano preparado com toque de afeto brasileiro: massa rubra extremamente macia e úmida, camadas generosas de frosting de cream cheese com extrato puro de baunilha de Madagascar e coroa exuberante de morangos, amoras e framboesas frescas.',
    price: 185.0,
    weight: '2.0 kg',
    servings: '16 a 20 fatias',
    image: redVelvetImg,
    highlights: ['Frutas frescas da estação', 'Cream cheese autêntico', 'Textura ultra aveludada'],
    ingredients: ['Farinha de trigo especial', 'Cacau alcalino', 'Buttermilk fresco', 'Cream cheese', 'Extrato puro de baunilha', 'Frutas vermelhas naturais'],
    isPopular: true,
  },
  {
    id: 'chocolate-belga-drip',
    name: 'Drip Cake Chocolate Belga Callebaut',
    category: 'festivos',
    tag: 'Chocolatudo Nobre',
    shortDesc: 'Tripla camada de pão de ló de cacau 50%, recheio de brigadeiro trufado e cascata de ganache meio amargo.',
    fullDesc: 'Para os apaixonados por chocolate de verdade: massa estruturada e fofa de chocolate nobre, recheada com brigadeiro gourmet cremoso feito com chocolate Belga Callebaut, finalizado com cobertura sedosa de ganache brilhante em drip effect e brigadeiros enrolados no confeito belga blossom.',
    price: 210.0,
    weight: '2.2 kg',
    servings: '18 a 22 fatias',
    image: chocolateDripImg,
    highlights: ['Chocolate Callebaut 54%', 'Sem gordura hidrogenada', 'Brigadeiros gourmet no topo'],
    ingredients: ['Cacau em pó holandês', 'Chocolate Belga 54.5%', 'Manteiga de primeira qualidade', 'Creme de leite fresco', 'Leite condensado integral'],
    isPopular: true,
  },
  {
    id: 'vulcao-cenoura-brigadeiro',
    name: 'Bolo Vulcão de Cenoura com Brigadeiro',
    category: 'vulcao',
    tag: 'Clássico Afetivo',
    shortDesc: 'Massa fofinha e dourada com cenouras frescas raladas na hora, inundada com um mar de brigadeiro de panela.',
    fullDesc: 'A memória viva das tardes felizes na infância: bolo de cenoura ultra macio, assado lentamente até a cor dourada perfeita, com o centro em formato vulcão repleto de brigadeiro tradicional de panela bem puxento e brilhante que escorre deliciosamente ao primeiro corte.',
    price: 110.0,
    weight: '1.8 kg',
    servings: '12 a 15 fatias',
    image: carrotVolcanoImg,
    highlights: ['Cenouras frescas selecionadas', 'Brigadeiro puxento de colher', 'Ideal para café da tarde e aniversários'],
    ingredients: ['Cenouras frescas', 'Ovos caipiras', 'Farinha de trigo peneirada', 'Cacau nobre', 'Leite condensado integral cozido'],
    isPopular: true,
  },
  {
    id: 'naked-pistache-silvestre',
    name: 'Naked Cake Pistache & Frutas Silvestres',
    category: 'naked',
    tag: 'Requinte & Sofisticação',
    shortDesc: 'Camadas rústicas aparentes com ganache aerada de pistache siciliano puro e geleia artesanal de mirtilos.',
    fullDesc: 'A união entre a rusticidade chique do naked cake e a alta confeitaria europeia: pão de ló leve com infusão de fava de baunilha, entremeado por ganache aveludada de pasta pura de pistache e redução artesanal de frutas silvestres com baixo teor de açúcar. Finalizado com pistaches tostados picados e flores comestíveis.',
    price: 240.0,
    weight: '2.3 kg',
    servings: '18 a 24 fatias',
    image: pistachioImg,
    highlights: ['Pistache puro selecionado', 'Geleia artesanal sem conservantes', 'Visual fotogênico para fotos'],
    ingredients: ['Pasta pura de pistache', 'Frutas silvestres in natura', 'Chocolate branco nobre', 'Farinha especial', 'Ovos frescos'],
    isPopular: false,
  },
  {
    id: 'celebration-gold-artisan',
    name: 'Bolo Celebration Flores Naturais & Ouro',
    category: 'festivos',
    tag: 'Casamentos & 15 Anos',
    shortDesc: 'Bolo alto com acabamento espatulado impecável, decorado com flores nobres higienizadas e detalhes em folha de ouro.',
    fullDesc: 'A peça central dos grandes dias: bolo estruturado de 4 camadas, massa amanteigada com toque de limão siciliano, recheio duplo de 4 Leites aveludado e coulis de frutas amarelas (maracujá e manga). Blindagem de chocolate e cobertura em chantininho liso perolado com toques de folhas de ouro 24k comestíveis.',
    price: 280.0,
    weight: '2.8 kg',
    servings: '25 a 30 fatias',
    image: heroCakeImg,
    highlights: ['Folhas de ouro comestíveis', 'Flores nobres higienizadas', 'Blindagem estruturada segura'],
    ingredients: ['Manteiga sem sal extra', 'Raspas de limão siciliano', 'Leite em pó Ninho', 'Chocolate nobre para blindagem', 'Chantilly fresco'],
    isPopular: true,
  },
  {
    id: 'dois-amores-festa',
    name: 'Bolo Dois Amores com Morangos Nobres',
    category: 'festivos',
    tag: 'Favorito das Famílias',
    shortDesc: 'Encontro perfeito entre brigadeiro tradicional meio amargo e brigadeiro branco de Ninho com morangos frescos.',
    fullDesc: 'O campeão absoluto de pedidos para aniversários: massa mista (uma camada baunilha, outra chocolate), recheio de brigadeiro gourmet preto e brigadeiro branco de leite Ninho, com pedaços suculentos de morangos higienizados que quebram o doce na medida certa.',
    price: 195.0,
    weight: '2.1 kg',
    servings: '16 a 20 fatias',
    image: redVelvetImg,
    highlights: ['Massa mista especial', 'Morangos selecionados', 'Equilíbrio doce e cítrico'],
    ingredients: ['Farinha de trigo', 'Cacau 50%', 'Leite condensado Moça', 'Leite Ninho', 'Morangos frescos'],
    isPopular: false,
  },
];

export const BATTER_OPTIONS: BatterOption[] = [
  {
    id: 'baunilha',
    name: 'Baunilha Bourbon Tradicional',
    description: 'Massa amanteigada clássica, levemente aerada e perfumada com extrato de baunilha.',
    color: '#FBF5DC',
  },
  {
    id: 'chocolate',
    name: 'Cacau Belga 50%',
    description: 'Massa escura, intensa e úmida feita com cacau nobre holandês.',
    color: '#4B3621',
  },
  {
    id: 'red-velvet',
    name: 'Red Velvet Aveludado',
    description: 'Textura acetinada inconfundível com leve toque de cacau e buttermilk.',
    color: '#8A1C27',
  },
  {
    id: 'cenoura',
    name: 'Cenoura Caseira',
    description: 'Feita com cenouras frescas, fofa, dourada e naturalmente úmida.',
    color: '#ED7E1C',
  },
  {
    id: 'nozes',
    name: 'Pão de Ló de Nozes Nobres',
    description: 'Massa requintada enriquecida com farinha de nozes chilenas tostadas.',
    color: '#B08E66',
  },
];

export const FILLING_OPTIONS: FillingOption[] = [
  {
    id: 'brigadeiro-belga',
    name: 'Brigadeiro Belga Callebaut',
    description: 'Ponto cremoso perfeito com chocolate belga meio amargo 54%.',
    priceExtra: 0,
    color: '#3B2417',
  },
  {
    id: 'ninho-frutas-vermelhas',
    name: 'Ninho com Geleia de Frutas Vermelhas',
    description: 'Creme aveludado de leite Ninho intercalado com redução de morangos e amoras.',
    priceExtra: 15,
    color: '#E87D8E',
  },
  {
    id: 'doce-de-leite-nozes',
    name: 'Doce de Leite Mineiro com Nozes Crocantes',
    description: 'Doce de leite de fazenda cozido lentamente com pedaços de nozes.',
    priceExtra: 12,
    color: '#BD7A3D',
  },
  {
    id: 'quatro-leites',
    name: 'Creme 4 Leites Aveludado',
    description: 'Harmonia entre leite condensado, leite de coco, creme de leite e leite em pó.',
    priceExtra: 10,
    color: '#FFF8E7',
  },
  {
    id: 'pistache-siciliano',
    name: 'Ganache de Pistache Siciliano Puro',
    description: 'Pasta 100% pura de pistache com chocolate branco nobre e toque de flor de sal.',
    priceExtra: 35,
    color: '#93A365',
  },
];

export const FROSTING_OPTIONS: FrostingOption[] = [
  {
    id: 'chantininho-espatulado',
    name: 'Chantininho Espatulado Liso ou Texturizado',
    description: 'Cobertura aveludada, suave, fosca e estável, perfeita para decorações modernas.',
    priceExtra: 0,
    texture: 'Suave e Acetinada',
  },
  {
    id: 'ganache-drip',
    name: 'Ganache Drip Cake com Gotas Escorridas',
    description: 'Base espatulada com cascata escorrida de chocolate brilhante.',
    priceExtra: 20,
    texture: 'Brilhante e Luxuoso',
  },
  {
    id: 'naked-rustico',
    name: 'Estilo Naked Cake (Massa e Recheio Aparentes)',
    description: 'Visual rústico chique com recheio em bico de confeitar e pó de açúcar.',
    priceExtra: 0,
    texture: 'Rústico e Natural',
  },
  {
    id: 'brigadeiro-vulcão',
    name: 'Cobertura Vulcão Transbordante',
    description: 'Massa com centro recheado que transborda em cascata cremosa ao cortar.',
    priceExtra: 15,
    texture: 'Cremosa e Farta',
  },
];

export const SIZE_OPTIONS: SizeOption[] = [
  {
    id: 'size-p',
    name: 'Pequeno (P)',
    weight: '1.5 kg',
    servings: '12 a 15 fatias',
    basePrice: 150.0,
    diameter: '16 cm de diâmetro',
  },
  {
    id: 'size-m',
    name: 'Médio (M)',
    weight: '2.5 kg',
    servings: '22 a 26 fatias',
    basePrice: 220.0,
    diameter: '20 cm de diâmetro',
  },
  {
    id: 'size-g',
    name: 'Grande (G)',
    weight: '3.5 kg',
    servings: '32 a 38 fatias',
    basePrice: 310.0,
    diameter: '24 cm de diâmetro',
  },
  {
    id: 'size-gg',
    name: 'Festa Luxo (GG)',
    weight: '5.0 kg',
    servings: '48 a 55 fatias',
    basePrice: 430.0,
    diameter: '2 andares (22cm + 15cm)',
  },
];

export const EXTRA_OPTIONS: ExtraOption[] = [
  { id: 'extra-frutas', name: 'Morangos & Frutas Vermelhas Frescas no Topo', price: 25 },
  { id: 'extra-flores', name: 'Flores Naturais Nobres Higienizadas', price: 35 },
  { id: 'extra-topper', name: 'Topo Personalizado com Nome / Idade em Acrílico ou Papelaria Fina', price: 30 },
  { id: 'extra-brigadeiros', name: '10 Brigadeiros Gourmet Belgas no Topo', price: 28 },
  { id: 'extra-vela', name: 'Vela Faísca Sparkler Comemorativa Dourada', price: 15 },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Mariana Vasconcellos',
    role: 'Mãe da Alice (Aniversário de 3 anos)',
    event: 'Festa Infantil',
    comment: 'O bolo de Ninho com Morangos superou todas as expectativas! Os convidados repetiram o prato e a decoração ficou tão delicada que dava até pena de cortar. Massa super molhadinha e sem aquele excesso enjoativo de açúcar.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    date: 'Há 2 semanas',
  },
  {
    id: 'rev-2',
    name: 'Rodrigo & Larissa Mendes',
    role: 'Noivos',
    event: 'Mini Wedding',
    comment: 'Encomendei o bolo de 2 andares com flores naturais para o nosso casamento intimista. Chegou pontualmente na chácara com a blindagem perfeita, temperatura ideal e sabor espetacular de pistache e frutas amarelas.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    date: 'Há 1 mês',
  },
  {
    id: 'rev-3',
    name: 'Camila Albuquerque',
    role: 'Gerente de Marketing',
    event: 'Comemoração de Empresa',
    comment: 'Pedimos o Drip Cake de Chocolate Belga para celebrar o aniversário da agência. Foi unânime: o melhor bolo que já comemos no escritório. O atendimento pelo WhatsApp foi ágil e muito atencioso!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    date: 'Há 3 semanas',
  },
];

export const FAQS: FAQItem[] = [
  {
    question: 'Com quanto tempo de antecedência devo fazer a minha encomenda?',
    answer: 'Para bolos clássicos do cardápio, recomendamos no mínimo 48 horas de antecedência. Para bolos personalizados, bolos de casamento ou de dois andares com flores naturais, o ideal são de 5 a 10 dias úteis para garantirmos a reserva da data e os insumos frescos.',
  },
  {
    question: 'Como funciona a entrega dos bolos?',
    answer: 'Trabalhamos com duas modalidades: Retirada com hora marcada em nosso ateliê com vaga fácil para parar o carro, ou Entrega Especializada climatizada feita em carro próprio com base antiderrapante para que seu bolo chegue impecável.',
  },
  {
    question: 'Vocês fazem opções sem glúten, sem lactose ou diets?',
    answer: 'Sim! Temos receitas especiais com farinha de amêndoas e leites vegetais, além de adoçantes naturais como xilitol e eritritol. Como manipulamos glúten no ateliê, avisamos que pode haver contaminação cruzada para celíacos severos. Consulte nossa equipe pelo WhatsApp para adaptações.',
  },
  {
    question: 'Como devo conservar e transportar o bolo no meu carro?',
    answer: 'Nossos bolos acompanham caixas reforçadas com base rígida. O bolo deve ser transportado sempre no assoalho plano do carro (nunca sobre os bancos inclinados ou no colo), com ar-condicionado ligado. Na sua casa ou salão, conserve na geladeira e retire 25 a 30 minutos antes do corte para a textura e aroma atingirem a perfeição.',
  },
  {
    question: 'Quais são as formas de pagamento aceitas?',
    answer: 'Aceitamos PIX (com confirmação imediata), Cartão de Crédito em até 3x sem juros (ou até 12x com juros da operadora) e transferência bancária. Para reservas de data, solicitamos um sinal de 50% na confirmação e o restante na entrega/retirada.',
  },
];

export interface SkillNodeData {
  id: string
  parentId: string | null
  name: string
  limit: string
  points: string
  img: string | null
  link: string
  isOwned: boolean
  isUnlocked: boolean
  isOptimal: boolean
}

export const larrySkillTree: SkillNodeData[] = [
  {
    id: 'discover-it-student',
    parentId: null,
    name: 'Discover It Student',
    limit: '$500 - $1,500',
    points: '1x points',
    img: 'https://myfin.us/img/upload/credit_cards/discover-itr-student-cash-back.png', // Placeholder
    link: '#',
    isOwned: true,
    isUnlocked: true,
    isOptimal: false,
  },
  {
    id: 'chase-freedom-unlimited',
    parentId: 'discover-it-student',
    name: 'Chase Freedom Unlimited',
    limit: '$1,500 - $8,000',
    points: '1.5x points+',
    img: 'https://www.chase.com/content/dam/chase-ux/heroimage/primary/personal/credit-cards/freedom/freedom-unlimited-credit-card.png',
    link: '#',
    isOwned: false,
    isUnlocked: true,
    isOptimal: true,
  },
  {
    id: 'c1-savor-one',
    parentId: 'discover-it-student',
    name: 'CapitalOne Savor',
    limit: '$1,500 - $4,500',
    points: '1.5x points+',
    img: 'https://ecm.capitalone.com/WCM/card/products/new-savor-card-art.png',
    link: '#',
    isOwned: false,
    isUnlocked: true,
    isOptimal: false,
  },
  {
    id: 'amex-green',
    parentId: 'discover-it-student',
    name: 'AMEX Green',
    limit: '$2,000 - $12,000',
    points: '1x points+',
    img: 'https://icm.aexp-static.com/Internet/internationalcardshop/en_sg/images/cards/personal-card.png',
    link: '#',
    isOwned: false,
    isUnlocked: false,
    isOptimal: false,
  },
  {
    id: 'chase-sapphire-preferred',
    parentId: 'chase-freedom-unlimited',
    name: 'Chase Sapphire Preferred',
    limit: '$5,000 - $25,000',
    points: '2x points+',
    img: null,
    link: '#',
    isOwned: false,
    isUnlocked: false,
    isOptimal: false,
  },
  {
    id: 'c1-venture-x',
    parentId: 'c1-savor-one',
    name: 'CapitalOne Venture X',
    limit: '$10,000 - $50,000',
    points: '2x points+',
    img: null,
    link: '#',
    isOwned: false,
    isUnlocked: false,
    isOptimal: false,
  },
]

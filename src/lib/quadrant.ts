export const QUADRANTS = {
  1: {
    label: 'Q1',
    name: 'Urgente + Importante',
    color: 'Branco',
    symbol: '☀',
    action: 'Fazer agora',
    description: 'Crises, prazos críticos, emergências',
    key: 'q1' as const,
  },
  2: {
    label: 'Q2',
    name: 'Importante, não urgente',
    color: 'Azul',
    symbol: '◆',
    action: 'Agendar',
    description: 'Estudos, projetos, crescimento — o mais valioso',
    key: 'q2' as const,
  },
  3: {
    label: 'Q3',
    name: 'Urgente, não importante',
    color: 'Vermelho',
    symbol: '▲',
    action: 'Delegar',
    description: 'Interrupções, pedidos alheios',
    key: 'q3' as const,
  },
  4: {
    label: 'Q4',
    name: 'Eliminar',
    color: 'Preto',
    symbol: '●',
    action: 'Eliminar',
    description: 'Distrações, tarefas sem valor real',
    key: 'q4' as const,
  },
} as const

export type QuadrantNumber = keyof typeof QUADRANTS

/** Converte número do DB (1-4) para a chave usada nos componentes de UI ('q1'-'q4') */
export function quadrantKey(n: QuadrantNumber | null): 'q1' | 'q2' | 'q3' | 'q4' | undefined {
  if (!n) return undefined
  return QUADRANTS[n].key
}

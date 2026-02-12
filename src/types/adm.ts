export interface Permissoes {
  todas?: boolean
  aceitar_recarga?: boolean
  recusar_recarga?: boolean
  aceitar_afiliado?: boolean
  recusar_afiliado?: boolean
  vender_afiliados?: boolean
  abrir_ticket?: boolean
  resolver_ticket?: boolean
}

export interface EstatisticasAdm {
  operacoes: number
  valor_total: number
  bonus: number
}

export interface Adm {
  nome: string
  cargo: 'dono' | 'gerente' | 'adm'
  status: 'online' | 'offline'
  permissoes: Permissoes
  estatisticas: EstatisticasAdm
}

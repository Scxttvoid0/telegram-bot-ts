export interface Usuario {
  id: number
  nome: string
  saldo: number
  ban: boolean
  compras: number
  data_primeiro_uso: string
  historico: Compra[]
  ultimo_comando?: string
  indicador_id?: number
  indicados: number[]
  afiliados_validos: number
  saldo_afiliado: number
  solicitou_afiliado: boolean
  afiliado_aprovado: boolean
  excepcionado?: boolean
}

export interface Compra {
  data_compra: string
  numero: string
  valor: number
}

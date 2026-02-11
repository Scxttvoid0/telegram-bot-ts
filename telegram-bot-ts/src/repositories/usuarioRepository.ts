import { Usuario } from '../types/usuario'
import { getUsuarios, setUsuarios } from './dadosRepository'
import dayjs from 'dayjs'

export function getUsuarioData(userId: number, indicadorId?: number): Usuario {
  const usuarios = getUsuarios()
  
  if (!usuarios[userId]) {
    usuarios[userId] = {
      id: userId,
      nome: "",
      saldo: 0.0,
      ban: false,
      compras: 0,
      data_primeiro_uso: dayjs().format('DD/MM/YYYY HH:mm'),
      historico: [],
      indicador_id: indicadorId,
      indicados: [],
      afiliados_validos: 0,
      saldo_afiliado: 0.0,
      solicitou_afiliado: false,
      afiliado_aprovado: false
    }
    setUsuarios(usuarios)
  }
  
  // Atualizar indicador se necessário
  if (indicadorId && !usuarios[userId].indicador_id) {
    usuarios[userId].indicador_id = indicadorId
    const indicador = usuarios[indicadorId]
    if (indicador && !indicador.indicados.includes(userId)) {
      indicador.indicados.push(userId)
    }
    setUsuarios(usuarios)
  }
  
  return usuarios[userId]
}

export function atualizarSaldo(userId: number, valor: number): void {
  const usuarios = getUsuarios()
  if (usuarios[userId]) {
    usuarios[userId].saldo += valor
    setUsuarios(usuarios)
  }
}

export function banirUsuario(userId: number, ban: boolean): void {
  const usuarios = getUsuarios()
  if (usuarios[userId]) {
    usuarios[userId].ban = ban
    setUsuarios(usuarios)
  }
}

export function adicionarCompra(userId: number, numero: string, valor: number): void {
  const usuarios = getUsuarios()
  if (usuarios[userId]) {
    usuarios[userId].compras += 1
    usuarios[userId].historico.push({
       dayjs().format('DD/MM/YYYY HH:mm'),
      numero,
      valor
    })
    setUsuarios(usuarios)
  }
}

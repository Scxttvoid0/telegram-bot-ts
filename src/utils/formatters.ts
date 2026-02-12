export function formatarMoeda(valor: number): string {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`
}

export function mascaraNumero(numero: string): string {
  const partes = numero.split('|')
  const cc = partes[0]
  const maskCc = cc.slice(0, 6) + '••••••••••' + cc.slice(-4)
  return `${maskCc}|${partes[1]}|${partes[2]}|XXXX`
}

export function nomeBin(prefixo: string): string {
  const { binNomes } = require('../config/sistemaConfig')
  return (binNomes as any)[prefixo] || `BIN ${prefixo}`
}

export function precoBin(prefixo: string): number {
  const { precificacao } = require('../config/sistemaConfig')
  return (precificacao as any)[prefixo] || 15.00
}

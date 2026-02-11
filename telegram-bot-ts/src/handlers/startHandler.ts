import { Context, Markup } from 'telegraf'
import { getUsuarioData } from '../repositories/usuarioRepository'
import { getAdms } from '../repositories/dadosRepository'
import { getConfigInterface, getConfigSistema, getNumerosDisponiveis } from '../repositories/dadosRepository'
import { formatarMoeda } from '../utils/formatters'

export async function startHandler(ctx: Context) {
  const user = ctx.from
  if (!user) return

  // Verificar argumentos de referência
  const args = (ctx.message as any)?.text?.split(' ') || []
  let indicadorId: number | undefined
  if (args[1]?.startsWith('ref_')) {
    try {
      indicadorId = parseInt(args[1].replace('ref_', ''))
    } catch {
      // Ignorar erro
    }
  }

  const userData = getUsuarioData(user.id, indicadorId)
  userData.nome = user.first_name + (user.last_name ? ` ${user.last_name}` : '')
  
  const configInterface = getConfigInterface()
  const configSistema = getConfigSistema()
  const numerosDisponiveis = getNumerosDisponiveis()

  // Verificar modo manutenção
  if (configSistema.modoManutencao && user.id !== parseInt(process.env.DONO_ID || '0')) {
    await ctx.reply('⚠️ <b>O bot está em manutenção.</b>\nVolte mais tarde!', { parse_mode: 'HTML' })
    return
  }

  // Montar mensagem
  let msg = `┏━━━━━━━━━━━━━━━━━━━━━━━━┓\n`
  msg += `   ${configInterface.titulo}\n`
  msg += `   ${configInterface.subtitulo.replace('{}', numerosDisponiveis.length.toString())}\n`
  msg += `   ✅ ${configSistema.vendasTotais} vendas\n`
  msg += `┗━━━━━━━━━━━━━━━━━━━━━━━━┛\n\n`

  if (configInterface.mensagemDia) {
    msg += `📢 ${configInterface.mensagemDia}\n\n`
  }

  if (configInterface.avisos.length > 0) {
    msg += `⚠️ <b>AVISOS:</b>\n`
    configInterface.avisos.forEach(aviso => {
      msg += `• ${aviso}\n`
    })
    msg += `\n`
  }

  if (configInterface.dicas.length > 0) {
    msg += `💡 <b>DICAS:</b>\n`
    configInterface.dicas.forEach(dica => {
      msg += `• ${dica}\n`
    })
    msg += `\n`
  }

  msg += `Olá, ${user.first_name}! 👋\nEscolha uma opção abaixo:`

  // Montar botões
  const botoes: any[] = [
    [Markup.button.callback('💳 Comprar', 'comprar_inicio')]
  ]

  if (userData.afiliado_aprovado) {
    botoes.push([Markup.button.callback('🤝 Afiliados', 'menu_afiliados')])
  } else {
    botoes.push([Markup.button.callback('🤝 Quero ser Afiliado', 'solicitar_afiliado')])
  }

  botoes.push([Markup.button.callback('👤 Minha Conta', 'menu_perfil')])

  // Botão ADM se aplicável
  const adms = getAdms()
  if (adms[user.id]?.status === 'online') {
    botoes.push([Markup.button.callback('👑 Painel ADM', 'painel_adm')])
  }

  const keyboard = Markup.inlineKeyboard(botoes)

  await ctx.reply(msg, {
    parse_mode: 'HTML',
    ...keyboard
  })
}

export async function voltarMenuHandler(ctx: Context) {
  await startHandler(ctx as any)
}

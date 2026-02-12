import { Telegraf, Context } from 'telegraf'
import { startHandler, voltarMenuHandler } from './startHandler'

export function registerHandlers(bot: Telegraf<Context>) {
  // Comandos
  bot.command('start', startHandler)

  // Callbacks
  bot.action('voltar_menu', voltarMenuHandler)
  bot.action('comprar_inicio', async (ctx) => {
    await ctx.reply('📦 <b>ESCOLHA UMA BIN PARA COMPRAR</b>\n\n⚠️ Em desenvolvimento...', { parse_mode: 'HTML' })
  })
  bot.action('menu_perfil', async (ctx) => {
    await ctx.reply('👤 <b>MINHA CONTA</b>\n\n⚠️ Em desenvolvimento...', { parse_mode: 'HTML' })
  })
  bot.action('solicitar_afiliado', async (ctx) => {
    await ctx.reply('🤝 <b>Solicitação de Afiliado</b>\n\n⚠️ Em desenvolvimento...', { parse_mode: 'HTML' })
  })
  bot.action('menu_afiliados', async (ctx) => {
    await ctx.reply('🤝 <b>MEU PROGRAMA DE AFILIADOS</b>\n\n⚠️ Em desenvolvimento...', { parse_mode: 'HTML' })
  })
  bot.action('painel_adm', async (ctx) => {
    await ctx.reply('👑 <b>PAINEL ADM</b>\n\n⚠️ Em desenvolvimento...', { parse_mode: 'HTML' })
  })
}

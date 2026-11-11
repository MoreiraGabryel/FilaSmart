import { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { BotaoAcao } from '@/components/BotaoAcao';
import { Carregando, EstadoVazio } from '@/components/EstadoTela';
import { Tela } from '@/components/Tela';
import { useSenhaAtual } from '@/hooks/useSenhaAtual';
import { notificarMudancaDePosicao } from '@/services/notificacoes';

export default function Acompanhamento() {
  const { senha, carregando, salvar, limpar } = useSenhaAtual();
  const [atualizando, setAtualizando] = useState(false);

  async function atualizarPosicao() {
    if (!senha) return;
    setAtualizando(true);
    const proxima = { ...senha, posicao: Math.max(1, senha.posicao - 1), status: senha.posicao <= 2 ? 'chamado' as const : senha.status };
    await salvar(proxima);
    if (proxima.posicao !== senha.posicao) await notificarMudancaDePosicao(proxima.posicao);
    setAtualizando(false);
  }

  async function encerrar() {
    await limpar();
    router.replace('/');
  }

  if (carregando) return <Tela><Carregando /></Tela>;
  if (!senha) return <Tela><EstadoVazio mensagem="Você ainda não possui uma senha ativa. Escolha um serviço para entrar na fila." /><BotaoAcao label="Ver serviços" onPress={() => router.replace('/')} /></Tela>;

  return (
    <Tela>
      <View style={styles.painel}>
        <Text style={styles.label}>SUA SENHA</Text>
        <Text style={styles.servico}>{senha.servicoNome}</Text>
        <Text style={styles.numero}>#{senha.id.split('-').at(-1)?.slice(-4)}</Text>
        <View style={styles.divisor} />
        <Text style={styles.posicao}>Posição atual</Text>
        <Text style={styles.numeroPosicao}>{senha.posicao}º</Text>
        <Text style={styles.status}>{senha.status === 'chamado' ? 'Você está próximo de ser chamado.' : 'Aguardando atendimento.'}</Text>
      </View>
      <View style={styles.informacao}>
        <Text style={styles.infoTitulo}>Atualização simulada de fila</Text>
        <Text style={styles.infoTexto}>Esta ação representa uma atualização recebida pelo sistema. Em Android e iOS, a notificação local é enviada se a permissão tiver sido concedida.</Text>
        <Text style={styles.plataforma}>Comportamento atual: {Platform.OS}</Text>
      </View>
      <BotaoAcao label={atualizando ? 'Atualizando…' : 'Atualizar posição'} onPress={() => void atualizarPosicao()} disabled={atualizando || senha.posicao === 1} />
      <BotaoAcao label="Encerrar acompanhamento" onPress={() => void encerrar()} variante="secundaria" />
    </Tela>
  );
}

const styles = StyleSheet.create({
  painel: { alignItems: 'center', backgroundColor: '#0b0d10', borderRadius: 24, gap: 8, padding: 28 }, label: { color: '#9cc7ff', fontSize: 12, fontWeight: '800', letterSpacing: 1.3 }, servico: { color: '#fff', fontSize: 22, fontWeight: '800', textAlign: 'center' }, numero: { color: '#d8e3f0', fontSize: 14 }, divisor: { backgroundColor: '#363a3f', height: 1, marginVertical: 12, width: '100%' }, posicao: { color: '#d8e3f0', fontSize: 14 }, numeroPosicao: { color: '#fff', fontSize: 64, fontWeight: '800', letterSpacing: -2 }, status: { color: '#9cc7ff', fontSize: 15, textAlign: 'center' }, informacao: { backgroundColor: '#fff', borderColor: '#e0e1e6', borderRadius: 18, borderWidth: 1, gap: 8, padding: 18 }, infoTitulo: { color: '#1c2024', fontSize: 17, fontWeight: '700' }, infoTexto: { color: '#60646c', fontSize: 15, lineHeight: 22 }, plataforma: { color: '#0d74ce', fontSize: 13, fontWeight: '700', marginTop: 4 },
});

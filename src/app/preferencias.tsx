import { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { BotaoAcao } from '@/components/BotaoAcao';
import { Tela } from '@/components/Tela';
import { solicitarPermissaoNotificacoes, type SituacaoPermissao } from '@/services/notificacoes';

export default function Preferencias() {
  const [situacao, setSituacao] = useState<SituacaoPermissao | null>(null);

  async function ativarNotificacoes() {
    setSituacao(await solicitarPermissaoNotificacoes());
  }

  const descricao = situacao === 'concedida'
    ? 'Permissão concedida. Você receberá avisos quando sua posição for atualizada.'
    : situacao === 'negada'
      ? 'Permissão negada. Você pode permitir notificações nas configurações do sistema.'
      : situacao === 'indisponivel'
        ? 'Notificações locais não são demonstradas na versão web.'
        : 'Ative para receber atualizações de posição no aparelho.';

  return (
    <Tela>
      <View style={styles.cartao}>
        <Text style={styles.eyebrow}>RECURSO DO DISPOSITIVO</Text>
        <Text style={styles.titulo}>Notificações locais</Text>
        <Text style={styles.texto}>{descricao}</Text>
        <BotaoAcao label="Solicitar permissão" onPress={() => void ativarNotificacoes()} />
      </View>
      <View style={styles.cartao}>
        <Text style={styles.eyebrow}>MULTIPLATAFORMA</Text>
        <Text style={styles.titulo}>Ambiente atual</Text>
        <Text style={styles.texto}>O FilaSmart compartilha as telas e regras entre plataformas. Ajustes específicos usam Platform e Platform.select para adequar feedback e elevação visual.</Text>
        <Text style={styles.plataforma}>Plataforma: {Platform.OS} · versão {String(Platform.Version)}</Text>
      </View>
      <View style={styles.cartao}>
        <Text style={styles.eyebrow}>PERSISTÊNCIA LOCAL</Text>
        <Text style={styles.titulo}>Sua senha permanece disponível</Text>
        <Text style={styles.texto}>A senha ativa é salva no AsyncStorage e restaurada ao abrir novamente o aplicativo.</Text>
      </View>
    </Tela>
  );
}

const styles = StyleSheet.create({
  cartao: { backgroundColor: '#fff', borderColor: '#e0e1e6', borderRadius: 18, borderWidth: 1, gap: 10, padding: 20 }, eyebrow: { color: '#0d74ce', fontSize: 11, fontWeight: '800', letterSpacing: 1 }, titulo: { color: '#1c2024', fontSize: 20, fontWeight: '800' }, texto: { color: '#60646c', fontSize: 15, lineHeight: 22 }, plataforma: { color: '#1c2024', fontSize: 13, fontWeight: '700', marginTop: 4 },
});

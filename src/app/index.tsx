import { useEffect, useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { CartaoServico } from '@/components/CartaoServico';
import { Carregando, EstadoErro, EstadoVazio } from '@/components/EstadoTela';
import { Tela } from '@/components/Tela';
import { servicos } from '@/constants/servicos';
import { useSenhaAtual } from '@/hooks/useSenhaAtual';
import { carregarAtualizacoesFila, type AtualizacaoFila } from '@/services/fila-api';

type EstadoApi = 'carregando' | 'sucesso' | 'vazio' | 'erro';

export default function Inicio() {
  const { senha, carregando: carregandoSenha } = useSenhaAtual();
  const [estadoApi, setEstadoApi] = useState<EstadoApi>('carregando');
  const [atualizacoes, setAtualizacoes] = useState<AtualizacaoFila[]>([]);

  useEffect(() => {
    let ativo = true;
    void carregarAtualizacoesFila()
      .then((dados) => {
        if (!ativo) return;
        setAtualizacoes(dados);
        setEstadoApi(dados.length ? 'sucesso' : 'vazio');
      })
      .catch(() => ativo && setEstadoApi('erro'));
    return () => { ativo = false; };
  }, []);

  return (
    <Tela>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>ATENDIMENTO ACADÊMICO</Text>
        <Text style={styles.titulo}>Sua fila, sem espera desnecessária.</Text>
        <Text style={styles.subtitulo}>Escolha um serviço, acompanhe sua senha e receba atualizações no dispositivo.</Text>
      </View>

      {carregandoSenha ? <Carregando /> : senha ? (
        <Pressable accessibilityRole="button" onPress={() => router.push('/acompanhamento')} style={styles.senhaAtiva}>
          <Text style={styles.senhaLabel}>SENHA ATIVA</Text>
          <Text style={styles.senhaTitulo}>{senha.servicoNome}</Text>
          <Text style={styles.senhaTexto}>Posição atual: {senha.posicao}</Text>
        </Pressable>
      ) : null}

      <View style={styles.cabecalhoLista}>
        <Text style={styles.secaoTitulo}>Serviços disponíveis</Text>
        <Text style={styles.plataforma}>{Platform.OS} · {String(Platform.Version)}</Text>
      </View>
      <FlatList
        data={servicos}
        contentContainerStyle={styles.lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartaoServico servico={item} onPress={() => router.push({ pathname: '/entrar', params: { servicoId: item.id } })} />}
        scrollEnabled={false}
      />

      <View style={styles.cabecalhoLista}><Text style={styles.secaoTitulo}>Atualizações da API</Text><Text style={styles.apiTag}>REST / JSON</Text></View>
      {estadoApi === 'carregando' && <Carregando />}
      {estadoApi === 'erro' && <EstadoErro mensagem="Verifique sua conexão e abra novamente o aplicativo." />}
      {estadoApi === 'vazio' && <EstadoVazio mensagem="Não há atualizações publicadas agora." />}
      {estadoApi === 'sucesso' && atualizacoes.map((item) => (
        <View key={item.id} style={styles.atualizacao}>
          <Text style={styles.atualizacaoTitulo}>{item.titulo}</Text>
          <Text style={item.situacao === 'confirmada' ? styles.confirmada : styles.pendente}>{item.situacao}</Text>
        </View>
      ))}

      <Pressable accessibilityRole="button" onPress={() => router.push('/preferencias')} style={styles.link}><Text style={styles.linkTexto}>Gerenciar notificações e preferências</Text></Pressable>
    </Tela>
  );
}

const styles = StyleSheet.create({
  hero: { gap: 10, paddingBottom: 8, paddingTop: 8 }, eyebrow: { color: '#0d74ce', fontSize: 12, fontWeight: '800', letterSpacing: 1 }, titulo: { color: '#000', fontSize: 32, fontWeight: '800', letterSpacing: -1, lineHeight: 38 }, subtitulo: { color: '#60646c', fontSize: 16, lineHeight: 23 }, senhaAtiva: { backgroundColor: '#0b0d10', borderRadius: 18, gap: 4, padding: 18 }, senhaLabel: { color: '#9cc7ff', fontSize: 11, fontWeight: '800', letterSpacing: 1 }, senhaTitulo: { color: '#fff', fontSize: 20, fontWeight: '700' }, senhaTexto: { color: '#d8e3f0', fontSize: 15 }, cabecalhoLista: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }, secaoTitulo: { color: '#1c2024', fontSize: 19, fontWeight: '700' }, plataforma: { color: '#60646c', fontSize: 12 }, apiTag: { color: '#0d74ce', fontSize: 12, fontWeight: '700' }, lista: { gap: 12, paddingTop: 4 }, atualizacao: { backgroundColor: '#fff', borderColor: '#e0e1e6', borderRadius: 12, borderWidth: 1, flexDirection: 'row', gap: 12, justifyContent: 'space-between', padding: 14 }, atualizacaoTitulo: { color: '#363a3f', flex: 1, fontSize: 14, lineHeight: 20 }, confirmada: { color: '#237c4b', fontSize: 12, fontWeight: '700' }, pendente: { color: '#ab6400', fontSize: 12, fontWeight: '700' }, link: { alignSelf: 'center', minHeight: 44, justifyContent: 'center', paddingHorizontal: 12 }, linkTexto: { color: '#0d74ce', fontSize: 15, fontWeight: '700' },
});

import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Servico } from '@/constants/servicos';

type CartaoServicoProps = { servico: Servico; onPress: () => void };

export function CartaoServico({ servico, onPress }: CartaoServicoProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Entrar na fila de ${servico.nome}`} onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.topo}>
        <Text style={styles.nome}>{servico.nome}</Text>
        <Text style={styles.tempo}>{servico.tempoEstimado}</Text>
      </View>
      <Text style={styles.descricao}>{servico.descricao}</Text>
      <Text style={styles.fila}>{servico.pessoasNaFrente} pessoa(s) na frente</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff', borderColor: '#e0e1e6', borderRadius: 18, borderWidth: 1, gap: 10, padding: 18,
    ...Platform.select({ android: { elevation: 2 }, ios: { shadowColor: '#0b0d10', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 9 }, default: { boxShadow: '0 4px 10px rgba(0,0,0,0.06)' } }),
  },
  topo: { alignItems: 'center', flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
  nome: { color: '#1c2024', flex: 1, fontSize: 17, fontWeight: '700' },
  tempo: { backgroundColor: '#eef6ff', borderRadius: 99, color: '#0d74ce', fontSize: 12, fontWeight: '700', overflow: 'hidden', paddingHorizontal: 10, paddingVertical: 6 },
  descricao: { color: '#60646c', fontSize: 15, lineHeight: 21 },
  fila: { color: '#1c2024', fontSize: 13, fontWeight: '600' },
  pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
});

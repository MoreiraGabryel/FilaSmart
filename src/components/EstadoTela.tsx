import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export function Carregando() {
  return (
    <View style={styles.box} accessibilityLiveRegion="polite">
      <ActivityIndicator color="#0d74ce" />
      <Text style={styles.texto}>Carregando informações…</Text>
    </View>
  );
}

export function EstadoVazio({ mensagem }: { mensagem: string }) {
  return (
    <View style={styles.box} accessibilityLiveRegion="polite">
      <Text style={styles.titulo}>Nada por aqui</Text>
      <Text style={styles.texto}>{mensagem}</Text>
    </View>
  );
}

export function EstadoErro({ mensagem }: { mensagem: string }) {
  return (
    <View style={[styles.box, styles.erro]} accessibilityLiveRegion="assertive">
      <Text style={styles.titulo}>Não foi possível concluir</Text>
      <Text style={styles.texto}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { alignItems: 'center', backgroundColor: '#fff', borderColor: '#e0e1e6', borderRadius: 16, borderWidth: 1, gap: 8, padding: 24 },
  erro: { borderColor: '#d59595' },
  titulo: { color: '#1c2024', fontSize: 17, fontWeight: '700' },
  texto: { color: '#60646c', fontSize: 15, lineHeight: 21, textAlign: 'center' },
});

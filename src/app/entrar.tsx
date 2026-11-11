import { useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { BotaoAcao } from '@/components/BotaoAcao';
import { Tela } from '@/components/Tela';
import { encontrarServico } from '@/constants/servicos';
import { criarSenha } from '@/features/fila/fila-domain';
import { validarEntradaNaFila, type ErrosEntradaFila } from '@/features/fila/validacao';
import { useSenhaAtual } from '@/hooks/useSenhaAtual';

type Params = { servicoId?: string };

export default function EntrarNaFila() {
  const { servicoId } = useLocalSearchParams<Params>();
  const servico = encontrarServico(servicoId);
  const { salvar } = useSenhaAtual();
  const [estudante, setEstudante] = useState('');
  const [erros, setErros] = useState<ErrosEntradaFila>({});
  const [enviando, setEnviando] = useState(false);

  async function entrar() {
    const proximosErros = validarEntradaNaFila({ estudante, servicoId: servico.id });
    setErros(proximosErros);
    if (Object.keys(proximosErros).length) return;

    setEnviando(true);
    const senha = criarSenha({ estudante: estudante.trim(), servicoId: servico.id, servicoNome: servico.nome, pessoasNaFrente: servico.pessoasNaFrente, agora: new Date() });
    await salvar(senha);
    setEnviando(false);

    if (Platform.OS === 'android') ToastAndroid.show('Senha gerada com sucesso.', ToastAndroid.SHORT);
    else Alert.alert('Senha gerada', 'Sua posição foi salva no dispositivo.');
    router.replace('/acompanhamento');
  }

  return (
    <Tela>
      <View style={styles.cartao}>
        <Text style={styles.eyebrow}>SERVIÇO SELECIONADO</Text>
        <Text style={styles.titulo}>{servico.nome}</Text>
        <Text style={styles.texto}>{servico.descricao}</Text>
        <Text style={styles.tempo}>{servico.pessoasNaFrente} pessoa(s) à frente · tempo estimado de {servico.tempoEstimado}</Text>
      </View>
      <View style={styles.formulario}>
        <Text style={styles.formTitulo}>Identificação para atendimento</Text>
        <Text style={styles.label}>Nome completo</Text>
        <TextInput accessibilityLabel="Nome completo" autoCapitalize="words" onChangeText={setEstudante} placeholder="Digite seu nome" placeholderTextColor="#84888f" style={[styles.input, erros.estudante && styles.inputErro]} value={estudante} />
        {erros.estudante && <Text style={styles.erro}>{erros.estudante}</Text>}
        <Text style={styles.aviso}>Os dados ficam apenas neste dispositivo para acompanhar sua senha.</Text>
        <BotaoAcao label={enviando ? 'Gerando senha…' : 'Confirmar entrada na fila'} onPress={() => void entrar()} disabled={enviando} />
      </View>
    </Tela>
  );
}

const styles = StyleSheet.create({
  cartao: { backgroundColor: '#0b0d10', borderRadius: 18, gap: 8, padding: 20 }, eyebrow: { color: '#9cc7ff', fontSize: 11, fontWeight: '800', letterSpacing: 1 }, titulo: { color: '#fff', fontSize: 24, fontWeight: '800' }, texto: { color: '#d8e3f0', fontSize: 16, lineHeight: 22 }, tempo: { color: '#fff', fontSize: 14, fontWeight: '700', marginTop: 4 }, formulario: { backgroundColor: '#fff', borderColor: '#e0e1e6', borderRadius: 18, borderWidth: 1, gap: 10, padding: 20 }, formTitulo: { color: '#1c2024', fontSize: 19, fontWeight: '700' }, label: { color: '#363a3f', fontSize: 14, fontWeight: '700', marginTop: 6 }, input: { backgroundColor: '#fff', borderColor: '#d9d9e0', borderRadius: 8, borderWidth: 1, color: '#1c2024', fontSize: 16, minHeight: 50, paddingHorizontal: 14 }, inputErro: { borderColor: '#c54848' }, erro: { color: '#c54848', fontSize: 13, fontWeight: '600' }, aviso: { color: '#60646c', fontSize: 13, lineHeight: 19, marginBottom: 6 },
});

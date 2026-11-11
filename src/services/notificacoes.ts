import * as Notifications from 'expo-notifications';
import { AndroidImportance } from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export type SituacaoPermissao = 'concedida' | 'negada' | 'indisponivel';

export async function solicitarPermissaoNotificacoes(): Promise<SituacaoPermissao> {
  if (Platform.OS === 'web') return 'indisponivel';

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('fila', {
      name: 'Atualizações da fila',
      importance: AndroidImportance.DEFAULT,
    });
  }

  const atual = await Notifications.getPermissionsAsync();
  if (atual.granted) return 'concedida';

  const resposta = await Notifications.requestPermissionsAsync({
    ios: { allowAlert: true, allowBadge: true, allowSound: true },
  });

  return resposta.granted ? 'concedida' : 'negada';
}

export async function notificarMudancaDePosicao(posicao: number) {
  if (Platform.OS === 'web') return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'FilaSmart atualizou sua senha',
      body: `Você está na posição ${posicao}.`,
      sound: 'default',
    },
    trigger: null,
  });
}

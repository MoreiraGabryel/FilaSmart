import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerBackTitle: 'Voltar',
          headerStyle: { backgroundColor: '#f0f0f3' },
          headerTintColor: '#1c2024',
          headerShadowVisible: false,
          headerTitleStyle: { fontWeight: '700' },
        }}>
        <Stack.Screen name="index" options={{ title: 'FilaSmart' }} />
        <Stack.Screen name="entrar" options={{ title: 'Entrar na fila' }} />
        <Stack.Screen name="acompanhamento" options={{ title: 'Minha senha' }} />
        <Stack.Screen name="preferencias" options={{ title: 'Preferências' }} />
      </Stack>
    </SafeAreaProvider>
  );
}

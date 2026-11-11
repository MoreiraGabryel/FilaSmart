import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TelaProps = { children: ReactNode; rolavel?: boolean };

export function Tela({ children, rolavel = true }: TelaProps) {
  const content = <View style={styles.content}>{children}</View>;

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      {rolavel ? <ScrollView contentContainerStyle={styles.scroll}>{content}</ScrollView> : content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f0f3' },
  scroll: { flexGrow: 1 },
  content: { flex: 1, gap: 16, padding: 20, width: '100%', maxWidth: 720, alignSelf: 'center' },
});

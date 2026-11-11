import * as Haptics from 'expo-haptics';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type BotaoAcaoProps = {
  label: string;
  onPress: () => void;
  variante?: 'primaria' | 'secundaria';
} & Pick<ComponentProps<typeof Pressable>, 'accessibilityHint' | 'disabled'>;

export function BotaoAcao({
  label,
  onPress,
  variante = 'primaria',
  disabled = false,
  accessibilityHint,
}: BotaoAcaoProps) {
  function handlePress() {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  }

  return (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.base,
        variante === 'primaria' ? styles.primaria : styles.secundaria,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}>
      <Text style={variante === 'primaria' ? styles.textoPrimario : styles.textoSecundario}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', borderRadius: 999, minHeight: 48, justifyContent: 'center', paddingHorizontal: 20 },
  primaria: { backgroundColor: '#0b0d10' },
  secundaria: { backgroundColor: '#ffffff', borderColor: '#d9dce1', borderWidth: 1 },
  textoPrimario: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  textoSecundario: { color: '#1c2024', fontSize: 16, fontWeight: '700' },
  pressed: { opacity: 0.84, transform: [{ scale: 0.98 }] },
  disabled: { opacity: 0.45 },
});

import { fireEvent, render } from '@testing-library/react-native';

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: { Light: 'light' },
}));

import * as Haptics from 'expo-haptics';

import { BotaoAcao } from '@/components/BotaoAcao';

describe('BotaoAcao', () => {
  it('fornece retorno tátil e delega a ação recebida por props', async () => {
    const onPress = jest.fn();
    const { getByRole } = await render(
      <BotaoAcao label="Entrar na fila" onPress={onPress} />,
    );

    fireEvent.press(getByRole('button', { name: 'Entrar na fila' }));

    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

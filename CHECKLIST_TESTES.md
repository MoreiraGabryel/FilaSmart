# Checklist de testes — FilaSmart

## Automatizados e estáticos — concluídos localmente

- [x] `npm test`: domínio de senha, validação de formulário, AsyncStorage, API REST/JSON e botão háptico.
- [x] `npx tsc --noEmit`.
- [x] `npm run lint`.
- [x] `npx expo install --check`.
- [x] Exportação de bundle web.
- [x] Exportação de bundle Android.
- [x] Exportação de bundle iOS.

## Android físico — executar pelo integrante quando o aparelho estiver disponível

1. Abrir o link do **Development Build** no Android e instalar o aplicativo de desenvolvimento.
2. Executar o Development Build com `npx expo start --dev-client` na pasta do projeto e abrir o QR Code pelo aparelho.
3. Abrir o link do **APK preview**, instalar e iniciar o FilaSmart.
4. Na tela inicial, escolher um serviço e conferir a lista `FlatList`.
5. Tentar enviar o formulário vazio e confirmar as mensagens de validação.
6. Criar uma senha; fechar e reabrir o aplicativo para confirmar a restauração via AsyncStorage.
7. Abrir **Preferências**, aceitar a permissão de notificações e usar **Atualizar posição** na tela de acompanhamento.
8. Confirmar o feedback háptico em um botão e a notificação local de posição.
9. Registrar no relatório: modelo do aparelho, versão Android, data, resultado e qualquer falha encontrada.

## iOS

- [ ] Não executado neste ambiente. Validar, se houver iPhone disponível, a navegação, a persistência e a solicitação de permissão de notificações.

## Evidência EAS a registrar

- [ ] Link do Development Build concluído.
- [ ] Link direto de download do APK preview.
- [ ] Link do build AAB de produção concluído.

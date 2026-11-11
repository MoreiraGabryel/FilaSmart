# FilaSmart

> Gestão de filas acadêmicas em uma experiência mobile simples, persistente e multiplataforma.

[![Expo](https://img.shields.io/badge/Expo-SDK%2058-000020?logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.88-61DAFB?logo=react&logoColor=111)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Status](https://img.shields.io/badge/status-protótipo%20acadêmico-0d74ce)](#contexto)

**FilaSmart** é o projeto integrador da disciplina de Programação para Dispositivos Móveis. Ele organiza o ingresso de estudantes em filas de serviços acadêmicos, mantém a senha ativa no dispositivo e comunica atualizações de posição com feedback nativo.

## Demonstração do fluxo

```text
Serviços disponíveis → Entrada na fila → Senha persistida → Acompanhamento
                                      ↘ Preferências e notificações
```

| Tela | Finalidade |
| --- | --- |
| **Serviços** | Mostra os serviços acadêmicos com `FlatList`, a senha ativa e atualizações REST. |
| **Entrada na fila** | Valida o formulário e cria uma senha local. |
| **Acompanhamento** | Exibe posição, status e simula uma atualização da fila. |
| **Preferências** | Solicita permissão para notificações locais e documenta o comportamento multiplataforma. |

## Recursos técnicos

- **React Native + Expo SDK 58 + TypeScript**
- **Expo Router** para navegação entre quatro telas
- **AsyncStorage** para persistência da senha atual
- **JSONPlaceholder REST API** com processamento de JSON
- Estados de **carregamento, sucesso, ausência de dados e erro de rede**
- **`expo-haptics`** para confirmação tátil em ações
- **`expo-notifications`** com solicitação explícita de permissão
- Tratamento Android/iOS com `Platform`, `Platform.select`, `ToastAndroid` e `Alert`
- Formulário com `TextInput` e validação de dados
- Componentes reutilizáveis, props, `useState` e `useEffect`

## Arquitetura

```text
src/
├── app/                  # Rotas Expo Router
├── components/           # Blocos de interface reutilizáveis
├── constants/            # Catálogo de serviços
├── features/fila/        # Domínio e validações
├── hooks/                # Estado compartilhado da senha
└── services/             # API REST, AsyncStorage e notificações
```

## Executar localmente

```bash
git clone https://github.com/MoreiraGabryel/FilaSmart.git
cd FilaSmart
npm install
npm start
```

### Development Build

O aplicativo usa módulos nativos. Para testar o cliente de desenvolvimento em Android físico após instalar o build EAS:

```bash
npx expo start --dev-client
```

## Qualidade verificada

```bash
npm test
npx tsc --noEmit
npm run lint
npx expo install --check
npx expo export --platform web
npx expo export --platform android
npx expo export --platform ios
```

- **7 testes automatizados** aprovados para domínio, validação, armazenamento, API e ação háptica.
- Verificações de TypeScript, ESLint, dependências Expo e bundles web/Android/iOS aprovadas localmente.

## Builds Android no EAS

| Artefato | Perfil | Acesso |
| --- | --- | --- |
| Development Build | `development` | [Acompanhar build](https://expo.dev/accounts/moreiragabryel/projects/filasmart/builds/f7bb9bbd-d346-4547-9b8d-b6ffdd27ec39) |
| APK instalável | `preview` | [Acompanhar build](https://expo.dev/accounts/moreiragabryel/projects/filasmart/builds/26675ef7-f366-4d44-80cc-dd55dfb5ff60) |
| AAB de produção | `production` | [Acompanhar build](https://expo.dev/accounts/moreiragabryel/projects/filasmart/builds/ef1bafbc-3953-4c65-9758-e0eb34ae5403) |

> Os builds são processados remotamente pelo EAS. O checklist físico só deve ser marcado após instalação real em Android.

## Contexto

- **Aluno:** Marcos Gabryel da Silva Moreira
- **Turma:** Matutino · **4º semestre**
- **Professor:** Genivaldo Carlos Da Silva
- **Disciplina:** Programação para Dispositivos Móveis

## Limitações documentadas

- A API JSONPlaceholder é uma fonte pública didática para demonstrar REST/JSON; não é um backend universitário real.
- A confirmação de notificações, háptico, instalação do APK e Development Build exige um dispositivo Android físico.
- iOS é contemplado pelo código compartilhado, mas não foi executado nativamente neste ambiente Linux.

Consulte [CHECKLIST_TESTES.md](CHECKLIST_TESTES.md) para a validação manual e [RELATORIO_TECNICO_FILASMART_A2.pdf](RELATORIO_TECNICO_FILASMART_A2.pdf) para a documentação acadêmica completa.

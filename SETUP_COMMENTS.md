# Configuração do Sistema de Comentários

Este guia explica como configurar o sistema de comentários com autenticação Google.

## 1. Configurar Autenticação Google no Supabase

### Passo 1: Criar credenciais OAuth no Google Cloud Console
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Vá em **APIs & Services** > **Credentials**
4. Clique em **Create Credentials** > **OAuth 2.0 Client ID**
5. Configure a tela de consentimento se solicitado
6. Tipo de aplicativo: **Web application**
7. Adicione as URLs autorizadas:
   - **Authorized JavaScript origins**: `http://localhost:5173` (dev) e seu domínio de produção
   - **Authorized redirect URIs**: 
     - `https://<seu-projeto>.supabase.co/auth/v1/callback`
     - `http://localhost:5173` (para dev)
8. Copie o **Client ID** e **Client Secret**

### Passo 2: Configurar no Supabase
1. No painel do Supabase, vá em **Authentication** > **Providers**
2. Encontre **Google** e clique em **Enable**
3. Cole o **Client ID** e **Client Secret**
4. Salve as configurações

## 2. Criar a Tabela de Comentários

Execute este SQL no Supabase SQL Editor:

```sql
-- Criar tabela de comentários
CREATE TABLE comments (
  id BIGSERIAL PRIMARY KEY,
  article_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  user_email TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para performance
CREATE INDEX idx_comments_article_id ON comments(article_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Política: Qualquer um pode ler comentários
CREATE POLICY "Comentários são públicos" 
ON comments FOR SELECT 
USING (true);

-- Política: Usuários autenticados podem inserir comentários
CREATE POLICY "Usuários autenticados podem comentar" 
ON comments FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Política: Admins podem deletar qualquer comentário
CREATE POLICY "Admins podem deletar comentários" 
ON comments FOR DELETE 
USING (
  auth.jwt() ->> 'email' = 'rafaelmoreirasuyama@gmail.com'
);

-- Política: Usuários podem deletar seus próprios comentários
CREATE POLICY "Usuários podem deletar seus comentários" 
ON comments FOR DELETE 
USING (auth.uid() = user_id);
```

## 3. Variáveis de Ambiente

Certifique-se de que seu arquivo `.env` contém:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

## 4. Adicionar Mais Administradores

Para adicionar mais emails de administrador, edite o arquivo `src/components/CommentsSection.jsx`:

```javascript
const ADMIN_EMAILS = [
    'rafaelmoreirasuyama@gmail.com',
    'outro-admin@example.com'
];
```

## 5. Funcionalidades Implementadas

✅ Login com Google OAuth  
✅ Exibição de avatar do usuário  
✅ Comentários em tempo real  
✅ Painel de admin com botão de deletar  
✅ Badge de "Admin" para administradores  
✅ Proteção RLS no Supabase  

## 6. Como Funciona

1. **Usuários não logados**: Veem um botão "Entrar com Google"
2. **Usuários logados**: Podem comentar com seu nome e avatar do Google
3. **Administradores**: Podem ver e deletar qualquer comentário usando o botão de lixeira
4. **Todos**: Podem ler todos os comentários

## 7. Modo Demo

Se o Supabase não estiver configurado, o sistema funciona em modo demo com comentários mockados localmente (não persistem no refresh).

## Troubleshooting

### Error: "Unsupported provider: provider is not enabled"
Se você ver este erro ao tentar fazer login:
1. Vá para o seu **Dashboard do Supabase**.
2. Navegue até **Authentication** > **Providers**.
3. Encontre o **Google** na lista.
4. Verifique se a chave está em **ON** (Enabled).
5. Certifique-se de que inseriu o **Client ID** e o **Client Secret** obtidos no Google Cloud Console.

### Admin não vê botões de excluir
1. Verifique o array `ADMIN_EMAILS` no arquivo `src/components/CommentsSection.jsx`.
2. O e-mail deve ser exatamente o mesmo (em minúsculas) que você usa para fazer login no Google.

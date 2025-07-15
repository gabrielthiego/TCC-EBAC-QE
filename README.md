# TCC - Engenharia de Qualidade de Software | EBAC

Projeto final do curso de Engenharia de Qualidade de Software da EBAC. O objetivo é demonstrar, na prática, a aplicação de técnicas de testes manuais e automatizados em um e-commerce (EBAC Shop), com integração contínua e validação de performance.

## 🧪 Estrutura de Testes

### Testes Automatizados

Os testes automatizados foram organizados por camadas:

- **UI (Web)**: Cypress
- **API (REST)**: Supertest + Jest
- **Mobile (Android)**: Appium
- **Performance (API)**: K6

> Todos os testes são executados automaticamente via GitHub Actions a cada push/pull request na `main`.

#### 🔸 UI (Cypress)

Local: `./UI`

Testes de interface com foco em funcionalidades principais da loja:

- Adicionar item ao carrinho (variação de cor e tamanho)
- Remover item do carrinho
- Login com sucesso e falha
- Visualização do catálogo
- Meus pedidos (com e sem pedidos)
- Minha conta (com e sem login)

#### 🔸 API (Supertest + Jest)

Local: `./API`

Integração com os endpoints de cupons do WooCommerce (autenticado com Basic Auth):

- Criação de cupom com valor fixo
- Atualização de valor
- Consulta por ID (válido e inválido)

#### 🔸 Mobile (Appium)

Local: `./Mobile`

Automação Android com foco no catálogo:

- Visualizar lista de produtos
- Rolar tela para exibir mais itens
- Aplicar filtro por categoria

#### 🔸 Performance (K6)

Local: `./Performance`

Script em K6 simulando carga progressiva de usuários autenticando via JWT e consultando posts:

- Rampa de usuários: 0 → 20
- Sustentação: 20 usuários por 1:40
- Ramp down: 20 → 0 usuários
- Valida status 200, token JWT e resposta do endpoint `/wp/v2/posts`

## 📝 Testes Manuais

Cobrem fluxos complementares aos automatizados, principalmente relacionados à usabilidade e variações de navegação:

- Catálogo web (pesquisa, ordenação)
- Minha conta (edição de dados, alteração de senha)
- Meus pedidos (cancelamento, visualização de detalhes)

Técnicas aplicadas:
- Caminho feliz
- Caminho alternativo
- Partição de equivalência
- Valor limite

## 🔄 Integração Contínua

Arquivo de CI: `.github/workflows/testes.yml`

Pipeline automatizado com GitHub Actions:

1. Clonagem e setup do Node.js
2. Instalação de dependências
3. Inicialização do ambiente Docker (WordPress + WooCommerce + banco)
4. Execução dos testes de API, UI e geração de relatórios

Secrets com credenciais da API são armazenados de forma segura.

## 🧠 Mapa Mental da Estratégia de Testes

A estrutura geral da estratégia de testes pode ser visualizada com o seguinte mapa:
## 📂 Repositório

🔗 [https://github.com/gabrielthiego/TCC-EBAC-QE](https://github.com/gabrielthiego/TCC-EBAC-QE)

---

## 👨‍🎓 Autor

Gabriel Thiego Trindade Sperduto  
Curso: Engenharia de Qualidade de Software - EBAC  
Ano: 2025
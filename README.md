📂 Estrutura inicial do repositório sugerida:

Estrutura_Projeto_GitHub_LowCode_NoCode.png


# Projeto Módulo 3 – Low Code/No Code/Vibecode

## 📌 Desafio Escolhido

O desafio central foi transpor requisitos clínicos complexos para uma aplicação funcional, operando sob as restrições e possibilidades de uma plataforma Low-Code/No-Code. Em vez de focar na sintaxe de programação, a dificuldade residiu em estruturar a lógica de negócio e a experiência do usuário (UX) através de uma "arquitetura de intenção", utilizando a Engenharia de Prompt como linguagem principal.

Principais pontos do desafio:

Abstração da Lógica: Traduzir fórmulas de antropometria e fluxos de dados para prompts que a IA interpretasse com precisão, garantindo que o cálculo de métricas e o histórico do paciente funcionassem sem erros de lógica.

Gestão de Limitações: Trabalhar dentro do ecossistema do Bolt, aprendendo a contornar as limitações de customização impostas pela plataforma ao mesmo tempo em que se mantinha a identidade visual e funcional desejada.

Pensamento Crítico: O desafio incluiu validar se a agilidade do desenvolvimento Low-Code compensa a menor autonomia sobre o código-fonte, exigindo uma visão estratégica sobre a escalabilidade da solução.

Em suma, o desafio foi provar que, no paradigma Low-Code, o valor do desenvolvedor está na capacidade de especificar e estruturar requisitos com clareza, permitindo que a IA execute a construção técnica de forma eficiente.

---

## 🖥️ Protótipo

- -O SelfMetrics é uma aplicação web de alta performance voltada para a otimização da antropometria clínica. O sistema foi concebido para resolver o problema da fragmentação de dados em acompanhamentos de saúde, substituindo métodos manuais (como planilhas físicas ou arquivos desconexos) por uma interface digital unificada, interativa e inteligente.

---

## ⚙️ Plataforma Utilizada

- Nome da plataforma **Bolt**.

- O Bolt é uma ferramenta de desenvolvimento baseada em IA que permite criar aplicações web inteiras apenas através de instruções em texto (prompts). Ele é classificado como uma ferramenta de Vibe-Code, um conceito onde você não precisa escrever o código linha por linha manualmente.

Motivos para ter sido escolhida como ferramenta:

Agilidade: Ele transforma uma ideia descrita em texto em uma aplicação funcional (com banco de dados, interface e lógica) em minutos.

Foco no Produto: Como estudante, ele permitiu que você focasse em como o aplicativo deve funcionar (a experiência do usuário e as métricas de saúde) em vez de gastar tempo com a sintaxe técnica da programação.

Facilidade de Prototipagem: Ele elimina a barreira técnica inicial, permitindo que você construa algo com nível profissional mesmo sendo um estudante.

## ✅ Vantagens Identificadas

Liste pelo menos **3 vantagens** percebidas no uso da abordagem low code/no code/vibecode:

1. Protótipo rápido
Para um profissional que precisa testar uma metodologia de cálculo ou um novo fluxo de atendimento, o Low-Code permite criar uma versão funcional em dias. Isso é ideal para validar se a interface é intuitiva antes de investir em um desenvolvimento robusto.
2. Integração simples
A facilidade de conectar o cálculo do IMC com outras ferramentas (como enviar o resultado automaticamente para o Google Sheets, disparar um WhatsApp ou alimentar um prontuário no Notion) é o grande diferencial dessas plataformas.
3. Automação de processos
Remove a necessidade de cálculos manuais repetitivos. O sistema pode aplicar fórmulas complexas (como as de dobras cutâneas) instantaneamente, reduzindo a margem de erro humano e liberando tempo para a consulta clínica.
---

## ⚠️ Limitações Encontradas

Liste pelo menos **3 limitações** percebidas:

1. Customização limitada
Muitas plataformas No-Code oferecem componentes visuais prontos. Se o profissional de saúde desejar um gráfico muito específico ou uma interface extremamente personalizada para sua clínica, ele pode esbarrar em limitações de design ou de UX (Experiência do Usuário).
2. Dependência da plataforma
Se a plataforma escolhida mudar seus preços ou sair do ar, o seu aplicativo de IMC e os dados dos pacientes podem ficar inacessíveis temporariamente, o que é crítico em um ambiente de saúde.
3. Risco de lock-in tecnológico
Exportar a lógica do aplicativo para outra linguagem de programação (como Java ou Swift) é quase impossível. Se o projeto crescer demais e precisar de recursos que a plataforma não suporta, muitas vezes é necessário reconstruí-lo do zero em código nativo.
---

## 📚 Reflexão Crítica

houve limitações como falta de banco de dados, interação do usúario e controle de histórico, então refizemos todo o projeto de forma refatorada retirando as limitações e implementando o que já estava pronto.

---

## 👥 Colaboração

Um integrante do grupo tinha um projeto de python no github, então tivemos a ideia de recriar o projeto de forma automatizada para um aplicativo com uso completo, fizemos o prompt de como seria o sistema e pedimos para IA criar o projeto completo de acordo com o prompt, todos participaram da criação e da documentação.

---

## 📝 Registro da Aula

Data: **15/05/2026**  

Atividade: Discussão crítica + mini-projeto de aplicação  

Local: Laboratório de informática 

Professor(a): Kadidja Valéria  

Adriano Veloso da Costa

Gustavo de Carvalho Aragão

Isadora Costa de Souza

Diego Borges Rodrigues

---

## 🚀 Próximos Passos

- Um botão "Gerar Insights" que usa a IA para ler o histórico de medidas e escrever um pequeno parágrafo motivacional ou técnico para o paciente (ex: "Notamos que sua massa magra aumentou enquanto o IMC estabilizou, o que indica uma excelente recomposição corporal").
- Criar uma linha de tendência (Trendline) que mostre, com base na velocidade atual de perda/ganho de peso, em quanto tempo o paciente atingirá a meta estabelecida (Peso Ideal). Isso aumenta drasticamente a adesão do paciente ao tratamento.
- Implementar uma lógica que compare o IMC atual com o histórico. Se houver uma perda ou ganho de peso superior a 5% em menos de 30 dias, o sistema gera um alerta visual de "Atenção: Mudança Brusca Detectada", auxiliando o profissional a identificar possíveis patologias ou falhas na dieta precocemente.

- O app passaria a exibir um gráfico comparativo de "Massa Gorda vs. Massa Magra". Se o IMC do paciente subir, mas o percentual de gordura descer, o sistema emite um alerta positivo: "Evolução Detectada: Ganho de massa muscular com redução de adiposidade".
- Se o sistema detectar que o paciente não registra um novo peso há mais de 30 dias, ele envia automaticamente um e-mail ou notificação personalizada: "Olá, ex:(Adriano), notamos que faz um mês desde sua última medição. Vamos conferir seu progresso hoje?". Isso automatiza o pós-venda do nutricionista..

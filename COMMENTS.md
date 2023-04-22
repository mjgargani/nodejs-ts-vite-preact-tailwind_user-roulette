# Stack

Nessa `stack`, estou usando algumas tecnologias novas e algumas que eu já tinha conhecimento, no caso, estou focando em desempenho e tamanho: `Vite` + `Preact` + `Typescript` + `Tailwind` + `PostCSS`:

- O `Vite` é um `bundler`, alterativa ao `CRA` para projetos em react (e aqui no caso, Preact), ele é muito mais rápido que o CRA, pois não tem limitações dos bundlers tradicionais (eg. WebPack), além do pacote `buildado` ser menor também;
- O `Preact` é alternativa ao ReactJS, o pacote inicial dele tem em torno de 3kb, e em um projeto um pouco maior como esse, dificilmente vc chega a uma build de 200kb, além disso, ele possui nativamente suporte à Hooks, compatibilização com o React (`compat`) e aqui, em especial, às [signals](https://preactjs.com/guide/v10/signals/), que substituem bem os states e contextos;
- O `Tailwind` lembra muito o `bootstrap`, a medida em que traz um mega pacote de classes pré-configuradas, com infinitas opções de customização (é super simples extender classes já existentes), ele possui classes normatizadas que deixam o projeto muito mais elegante;
- O `PostCSS` é necessário para usar o Tailwind junto com bundlers, ele é um pós processador de css, e o vite utiliza ele para traduzir o Tailwind para o bundle.

# Dificuldades

Eu senti uma boa dificuldade com o setup inicial.

O `vitest` é muito bom (ele funciona como um wrapper do jest, só q mais leve e rápido), mas você tem que tomar um cuidado com os recursos a mais que vc põe no pacote, pq apesar do `Vite` e do `Preact` serem muito leves e poderosos, eles são bem novos (2020 e 2016), para efeitos de desenvolvimento, isso aqui é um experimento.

São dois pontos, o primeiro relacionado com a stack: `Vitest` + `PostCSS` + `VirtualDOM` (Jsdom, Happy-dom).

Se o `postcss` não estiver configurado corretamente no `vite.config.ts`, a renderização (com o testing library do preact), provavelmente vai quebrar.

Aqui, você também tem que ficar esperto com o `Happy-dom`, ele é uma alternativa rápida ao JSDOM, mas não senti confiança e estabilidade dele durante o desenvolvimento dos testes.

No meu contexto, utilizando o `msw` (que intercepta requisições do cliente e devolve mocks no lugar), se rodar com o `happy-dom` quebra, com o `jsdom` funciona ¯\_(ツ)\_/¯.

A velocidade aqui não compensou a dor de cabeça, então segui com o o `jsdom`.

`Preact + Eslint + Typescript`: Eu tive alguns problemas aqui, mas foram mais fáceis de contornar.

Pra algumas coisas, o Preact conta com um módulo de compatibilidade `compat`, ele é super útil pra resolver problemas quando um recurso não reconhece o `preact` em substituição ao `React`, mas achei um pouco chato ter que ficar importando o `React` do `compat`, só pro teste reconhecer. De toda forma, o compat entra aqui como um recurso de desenvolvimento.

# Vantagens do Preact

Uma coisa massa que me chamou a atenção no Preact, são as [signals](https://preactjs.com/guide/v10/signals/)(Algo que existe em outras linguagens, mas aqui vem de forma nativa).

Caramba que negócio MARAVILHOSO, você simplesmente não precisa usar `states` e nem `contexto`. Na verdade, eu concentrei todos os sinais em um arquivo, e criei "métodos" pra recorrer a esses recursos (declaração, consulta, alteração).

O legal desse recurso, é q vc consegue recuperar ele em qualquer momento da construção, tanto dentro quanto fora dos componentes JSX (Aí tem umas manhas pra esse recurso otimizar mais ainda, a página). Enfim, uma mão na roda, e funciona bem mais rápido que states!

E como a proposta do Preact é ser bem leve (O bundle tem 3kb, se n me engano), todos os recursos dele são bem otimizados (é impressionante).

# Métodos de produção

Outros pontos adicionais, mas que acho relevante de comentar: Aqui eu tentei usar o TDD, mas ficou mesmo somente pelas especificações. Mas isso não gerou grande prejuízo pro projeto, por conta do seu tamanho.

Aqui tentei um equilíbrio entre produção junto com o produto, mas pra alguns componentes, a produção de testes veio depois da produção (para validar seu funcionamento).

Outro ponto é qie eu sempre busco usar o [Atom Design](<(https://medium.com/pretux/atomic-design-o-que-%C3%A9-como-surgiu-e-sua-import%C3%A2ncia-para-a-cria%C3%A7%C3%A3o-do-design-system-e3ac7b5aca2c)>) pros componentes, nesse caso, acho que ainda não está ideal.

Como é um projeto pequeno, meu método foi construir um recurso grande e ir quebrando eles aos poucos, até ficar de um jeito legível e organizado, é algo que me ajuda a produzir melhor.

Em termos de qualidade de código, confesso que não tenho nenhuma preferência particular em um Design Pattern, entendo que isso é um problema hoje, mas é algo que eu venho cuidando pra melhorar (junto com boas práticas de código limpo).

Não gastei tanto tempo quando deveria no modelo, mas entendo que o código está simples e organizado o suficiente, pensando legibilidade.

# Outros

Não menos importante (e o recurso que eu menos levei tempo pra produzir) foi a classe pra consulta da API, basicamente eu mapeei todos os recursos dela e traduzi com reforço de tipo em uma classe. Eu fiquei até surpreso, pq foi o recurso que menos levou manutenção durante o processo.

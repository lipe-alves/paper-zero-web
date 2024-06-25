# Guia de Estilo de Código

Para outros padrões não especificados aqui, respeitar a configuração prescrita no arquivo `.prettierrc` e seguir o padrão do código pré-existente. Instalar o Prettier no seu editor de código favorito.

## Identificadores

Identificadores devem usar apenas letras, dígitos e `_` e seguir o idioma Inglês.

| Estilo        | Categoria                                                                    |
| ------------- | ---------------------------------------------------------------------------- |
| PascalCase    | classes, interfaces, tipos, enumerações, parâmetros de tipos                 |
| camelCase     | variáveis, parâmetros, funções, métodos, propriedades, apelidos para módulos |
| CONSTANT_CASE | valores de constantes globais (incluindo valores de enumerações)             |

-   **Abreviações**: Tratar abreviações como palavras completas. Exemplo: usar `getHttpUrl`, não usar `getHTTPURL`. Exceções serão aceitas quando necessário para compatibilidade.
-   **Cifrão**: Identificadores não devem usar `$`. Exceções serão aceitas se for alguma convenção adotada por framework.
-   **Parâmetros de tipos**: Utilizar apenas uma letra maiúscula. Exemplo: `Array<T>`.
-   **\_ prefixo/sufixo**: Não utilizar `_` como prefixo ou sufixo de identificador, nem como o próprio identificador.
-   **Importações**:
    -   Namespace de importação de módulos devem ser `PascalCase` e nome de arquivos deve seguir o padrão apresentado em [Estrutura de Diretórios](./ESTRUTURA_DIRETORIOS.md). Exemplo: `import * as Utils from '@shared/utils'`.
    -   Caso a importação seja feita apenas de uma função, devemos usar camelCase. Exemplo: `import { snakeToCase } from '@shared/utils'`.
    -   Caso a importação seja de um módulo exportado como default, a importação deve seguir o nome da exportação:
        -   Exemplo: `import UserService from '@shared/services/UserService.ts`.
        -   Exemplo: `import MyComponent from '@client/components/ui/MyComponent`.
    -   Sempre omitir o trecho `index.ts` da importação:
        -   Errado: `import MyComponent from '@client/components/ui/MyComponent/index.ts`.
        -   Errado: `import MyComponent from '@client/components/ui/MyComponent/`.
        -   Certo: `import MyComponent from '@client/components/ui/MyComponent`.
-   **Constantes**: Usar `CONSTANT_CASE` para indicar constantes globais.
-   **Enumeradores**: **Não** utilizar `E` na frente de nome de enumeradores. No nome do enumerador utilizar o formato `PascalCase`

    -   Para as chaves do enumerador devemos utilizar `CONSTANT_CASE`
    -   Exemplo:

        ```ts
        enum CoffeStatus {
            HOT = "hot",
            COLD = "cold",
        }
        ```

-   **Interfaces**: **Não** utilizar `I` na frente de nome de interfaces. No nome da interface utilizar o formato `PascalCase`

    -   Para as chaves do enumerador devemos utilizar `camelCase`
    -   Exemplo:

        ```ts
        interface User {
            firstName: string;
            lastName: string;
        }
        ```

-   **Componentes**: No nome do componente utilizar o formato `PascalCase`. Verificar [Estrutura de Diretórios](./ESTRUTURA_DIRETORIOS.md) para a estrutura de pasta. **Sempre** criar o componente como `function` e **não** como _arrow function_ (`() => {}`), única esceção quando o componente só retorna JSX.

    -   Exemplo:

        ```ts
        // Componente com lógica interna utiliza a sintaxe com a keyword function
        function ComponentName(props: ComponentNameProps) {
            const [myState, setMyState] = useState(0);

            useEffect(() => {
                ...
            }, []);

            return (
                <></>
            );
        }
        ```

        ```ts
        // Componente sem lógica interna utiliza a sintaxe com o padrão de arrow function
        const MyComponent = (props: MyComponentProps) => (
            <div>
                <h1>{props.user.firstName}</h1>
                <h2>{props.user.lastName}</h2>
            </div>
        );
        ```

## Nomes descritivos

Nomes devem ser descritivos para outros leitores do código. **Evite o uso de abreviações** ambíguas ou que não seja de conhecimento geral. Exceções serão aceitas se o espaço de caracteres não for suficiente.

## Codificação UTF-8

Escrever arquivos com a configuração UTF-8. Atenção à escrita de caracteres não imprimíveis. Adicionar comentário explicando o caractere usado. O tipo de quebra de linha deve ser LF (line feed) e não CRLF.

```ts
const units = "μs";
// byte order mark
const output = "\ufeff" + content;
```

## Organizar as importações

Organize as importações em grupos. Preferencialmente, agrupar em, nesta ordem: importação de bibliotecas externas, importações locais (funções, serviços, constantes, etc.), importações de arquivos de estilo e dar preferência a `named imports` depois `default imports`.

## Comentários

Sempre que possível, escreva o código legível e faça escolha de nomes de identificadores descritivos, mas quando necessário, inserir comentários utilizando `//`. O comentário deve sempre ser feito na linha anterior a linha a que o comentário se referencia. Exemplo:

```ts
// byte order mark
const output = "\ufeff";
```

Para expressões regulares é obrigatório fazer um comentário explicativo. Exemplo:

```ts
// regex to find {{}} in string
const regex = /{{(.*?)}}/g;
```

## Formatação de valores monetários

Valores monetários guardados em bancos de dados, enviados em respostas ou esperados em requisições devem ser utilizados na formatação de números inteiros representando o valor em centavos. Exemplo, `R$ 35,92` deve ser representado por um número inteiro `3592`.

## Definição de tipos Array

Utilizar a notação `T[]` para definir um array do tipo `T`. Exemplo, dado uma classe `Car` para representar carros, se for necessário definir tipo de um array de carros, use `Car[]`.

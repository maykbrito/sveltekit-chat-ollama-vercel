Vamos construir um chatbot com inteligência artificial que roda na nossa máquina com poucas linhas de código!

Vamos analisar as tecnologias e ferramentas que iremos utilizar nesse projeto

- [SDK AI da Vercel](https://sdk.vercel.ai/)
    
    A Vercel criou um kit de ferramentas poderosas para trabalharmos com inteligência artificial nos nossos projetos.
    
- [Ollama](https://ollama.com/)
    
    Utilize diversas LLMs localmente como Phi 3 (microsoft), Gemma 2 (Google), Llama 3 (Meta) e outras
    
- [SvelteKit](https://kit.svelte.dev/)
    
    Framework para desenvolver interfaces e aplicativos web utilizando Svelte. SvelteKit está para o Svelte como o Next está para o React ou o Nuxt está para o Vue.
    
- [Tailwind](https://tailwindcss.com)
    
    Utilitário CSS para criar interfaces a partir de classes em elementos HTML
    
- [V0 da Vercel](https://v0.dev)
    
    Criação de interfaces com ajuda da Inteligência artificial, seguindo padrões do [Shadcn/ui](https://ui.shadcn.com/)
    

## Passo 01

Instalação de todas as ferramentas necessárias.

### Ollama

Baixe direto do site https://ollama.com/download ou, no MacOS você poderá utilizar o homebrew

`brew install ollama`

Utilizaremos a LLM Gemma 2 nessa aula.

`ollama pull gemma2` 

### SvelteKit

Vamos iniciar um projeto e dar o nome de sveltekit-chat-ollama. 

Utilizaremos o gerenciador de pacotes `pnpm` nessa aula

`pnpm create svelte@latest sveltekit-chat-ollama` 

Seguiremos a configuração conforme o gosto (prettier e eslint são coisas que eu gosto)

`cd sveltekit-chat-ollama` - navegar até o diretório do projeto

`pnpm install` - instalar as dependências

`git init && git add -A && git commit -m "Initial commit"` - iniciar o git e dar o primeiro commit

`pnpm run dev -- --open` - rodar o projeto

### Tailwind

`pnpm add -D tailwindcss postcss autoprefixer` - adicionar o tailwind no projeto

`npx tailwindcss init -p`- iniciar as configurações do tailwind

Confira se os arquivos abaixo estão com essas configurações

```jsx
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
}

// svelte.config.js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	},
};

export default config;
```

`touch src/app.css` - adicionar o CSS base

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`touch src/routes/+layout.svelte` - criar o layout base

```html
<script>
  import "../app.css";
</script>

<slot />
```

Neste ponto, podemos fazer um `git add . && git commit -m "add tailwind"`

## Chat da v0.dev

Fiz uma pesquisa na [v0.dev](http://v0.dev) e encontrei esse chat

[A dope chat application that looks like WhatsApp. It has a sidebar of history messages/contacts. A emoji picker button should be next to the input. | A shadcn/ui and v0 generation](https://v0.dev/t/LOyl5Wee15h)

Copiei o código e coloquei no `src/routes/+page.svelte`

## Dependências da Vercel e Ollama

`pnpm add ai @ai-sdk/svelte ollama-ai-provider`

`touch src/routes/api/chat/+server.js` - cria a rota `/api/chat` 

```jsx
import { createOllama } from "ollama-ai-provider";
import { streamText } from "ai";

const ollama = createOllama();

export async function POST({ request }) {
  const { messages } = await request.json();

  const result = await streamText({
    model: ollama("gemma2"),
    messages,
  });

  return result.toAIStreamResponse();
}
```

Vamos utilizar SDK da Vercel no nosso chat `src/routes/+page.svelte` e trabalhar com as mensagens

```html
<script>
  import { useChat } from '@ai-sdk/svelte';

  const { input, handleSubmit, messages } = useChat();
</script>

...
<main class="flex-1 overflow-auto p-4">
  <div class="space-y-4">
    {#each $messages as message}
      {#if message.role !== 'user'}
      <div class="flex items-end gap-2">
        <div class="rounded-lg bg-zinc-200  p-2">
          <p class="text-sm">
            {message.content}
          </p>
        </div>
      </div>
      {:else}
      <div class="flex items-end gap-2 justify-end">
        <div class="rounded-lg bg-blue-500 text-white p-2">
          <p class="text-sm">
            {message.content}
          </p>
        </div>
      </div>
      {/if}
    {/each}
  </div>
</main>
...
```

Vamos precisar utilizar o `handleSubmit`no formulário, o `input` no campo de escrever mensagem para a IA e configurar o botão de submit

```html
<form on:submit={handleSubmit}> 
... 
<input bind:value={$input} />
...
<button type="submit"> ...
```

## Próximos passos

Instalar algumas perfumarias para o chat ficar mais interessante na questão da formatação e código.

[npm: svelte-markdown](https://www.npmjs.com/package/svelte-markdown)

[Tailwind CSS Typography](https://tailwindcss-typography.vercel.app/)
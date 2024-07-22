<script>
  import SvelteMarkdown from "svelte-markdown";
  import { useChat } from '@ai-sdk/svelte';

  const { input, handleSubmit, messages } = useChat();
</script>
<!--
// v0 by Vercel.
// https://v0.dev/t/LOyl5Wee15h
-->

<div class="flex h-screen bg-white ">
  <aside class="w-80 border-r ">
    <div class="p-4 space-y-4">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">Messages</h2>
        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-6 h-6"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
            <path d="m15 5 4 4"></path>
          </svg>
        </button>
      </div>
      <div class="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="absolute left-2.5 top-3 h-4 w-4 text-zinc-500"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-8"
          type="search"
          placeholder="Search messages..."
        />
        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 absolute right-2.5 top-3"></button>
      </div>
      <div class="space-y-2">
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-2" data-v0-t="card">
          <div class="p-6">
            <h3 class="font-semibold">Contact Name</h3>
            <p class="text-xs text-zinc-500">Last message...</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
  <section class="flex flex-col w-full">
    <header class="border-b p-4">
      <h2 class="text-xl font-bold flex items-center gap-2">
        <span class="flex shrink-0 rounded-full relative overflow-visible w-10 h-10">
          <span class="absolute right-0 top-0 flex h-3 w-3 rounded-full bg-green-600"></span>
          <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">U</span>
        </span>
        <div>
          Contact Name<span class="text-xs text-green-600 block">Online</span>
        </div>
      </h2>
    </header>
    <main class="flex-1 overflow-auto p-4">
      <div class="space-y-4">

        {#each $messages as message}
          {#if message.role !== 'user'}
          <div class="flex items-end gap-2">
            <div class="rounded-lg bg-zinc-200 p-2">
              <p class="text-sm prose">
                <SvelteMarkdown source={message.content} />
              </p>
            </div>
          </div>
          {:else}
          <div class="flex items-end gap-2 justify-end">
            <div class="rounded-lg bg-blue-500 text-white p-2">
              <p class="text-sm">
                <SvelteMarkdown source={message.content} />
              </p>
            </div>
          </div>
          {/if}
        {/each}
      </div>
    </main>
    <footer class="border-t p-4">
      <form 
      on:submit={handleSubmit}
      class="flex items-center gap-2">
        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-6 h-6"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" x2="9.01" y1="9" y2="9"></line>
            <line x1="15" x2="15.01" y1="9" y2="9"></line>
          </svg>
        </button>
        <input
          bind:value={$input}
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
          placeholder="Type a message..."
        />
        <button 
        type="submit"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          Send
        </button>
      </form>
    </footer>
  </section>
</div>
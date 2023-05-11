export const sampleMessages = [
  // {
  //   init_state: {
  //     class: 'Agent',
  //     type: 'agent',
  //     name: '3148-Graceful-Sprint',
  //     description: 'A personal assistant that responds exclusively in JSON',
  //     goals:
  //       'Run the list_files command and then the list_agents command, then complete the task',
  //     constraints: [],
  //     model: {
  //       class: 'OpenAIModel',
  //       type: 'model',
  //       model: 'gpt-3.5-turbo',
  //       api_key: null,
  //     },
  //     temperature: 0.8,
  //     tools: [
  //       {
  //         class: 'GoogleSearch',
  //         type: 'tool',
  //       },
  //       {
  //         class: 'Browser',
  //         type: 'tool',
  //         browser_type: 'chrome',
  //       },
  //       {
  //         class: 'ListAgents',
  //         type: 'tool',
  //       },
  //       {
  //         class: 'MessageAgent',
  //         type: 'tool',
  //       },
  //       {
  //         class: 'CreateAgent',
  //         type: 'tool',
  //       },
  //       {
  //         class: 'DeleteAgent',
  //         type: 'tool',
  //       },
  //     ],
  //     progress: [],
  //     plan: [],
  //     sub_agents: {},
  //     history: [],
  //     memory: {
  //       class: 'LocalMemory',
  //       type: 'memory',
  //       docs: [],
  //       embs: null,
  //       embedding_provider: {
  //         class: 'OpenAIEmbeddingProvider',
  //         type: 'embedding_provider',
  //         model: 'text-embedding-ada-002',
  //       },
  //     },
  //     staging_tool: null,
  //     staging_response: null,
  //     tool_response: null,
  //     id: 'e1fb9cf5',
  //     cycle: 1,
  //   },
  // },
  {
    init_thoughts: {
      text: "I suggest running the 'list_agents' command to see the available agents and their tasks.",
      reasoning:
        'This will give the user an overview of the available agents and their capabilities.',
      progress: "- Executed 'list_agents' command",
      plan: "- Run 'message_agent' command with the desired agent ID and message\n- Run 'task_complete' command when all tasks are completed",
      speak:
        "I suggest running the 'list_agents' command to see the available agents and their tasks.",
      id: '615535d3',
      cycle: 1,
    },
  },
  {
    this_cycle: {
      cycle: 1,
      cycle_progress: "- Executed 'list_agents' command",
      command: {
        name: 'list_agents',
        args: {},
      },
      staging_tool: 'list_agents',
      tool_results: [],
      next_command: {
        name: 'google_search',
        args: {
          query: 'list of available agents for communication',
        },
      },
      next_thoughts: {
        text: "I suggest using the 'google_search' command to search for the list of agents available for communication.",
        reasoning:
          "Based on the user's request, the list of agents is needed to proceed with the next step. A Google search can provide us with the necessary information.",
        progress:
          "- Executed 'google_search' command with query 'list of available agents for communication'",
        plan: "- Execute 'message_agent' command with the desired agent ID and message\n- Execute 'task_complete' command when all tasks are completed",
        speak:
          "I suggest using the 'google_search' command to search for the list of available agents for communication.",
      },
      id: '531f07a6',
    },
  },
  {
    message: {
      id: '4cfcc6ba',
      content: 'Max cycles reached. Terminating.',
    },
  },
]

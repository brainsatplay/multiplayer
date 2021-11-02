
import {Parser} from './Parser.js'

export const settings = {
    name: "Multiplayer",
    devices: ["EEG"],
    author: "Garrett Flynn",
    description: "Get started building a multiplayer neurofeedback app!",
    categories: ["learn", 'templates'],
    instructions:"Coming soon...",
    display: {
      production: true,
      development: true
    },

    intro: {
      title:false
    },

    // App Logic
    graphs:
    [{
      nodes: [
        {name: 'eeg', class: 'EEG'},
        {name: 'neurofeedback', class: 'Neurofeedback', params: {}},
        {name: 'brainstorm', class: 'Brainstorm', params: {

          onUserConnected: (u) => {
            let parser = settings.graphs[0].nodes.find(n => n.name === 'parser')
            parser.instance._userAdded(u)
          },
      
          onUserDisconnected: (u) => {
            let parser = settings.graphs[0].nodes.find(n => n.name === 'parser')
            parser.instance._userRemoved(u)
          },

        }},
        {name: 'parser', class: Parser, params: {}},
        {name: 'ui', class: 'DOM', params: {
          style: `
          .brainsatplay-ui-container {
            width: 100%;
            height: 100%;
          }

          #content {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          `
        }},
      ],

      edges: [
        {
          source: 'eeg:atlas', 
          target: 'neurofeedback'
        },
        { 
          source: 'neurofeedback', 
          target: 'brainstorm'
        },
        {
          source: 'brainstorm:neurofeedback', 
          target: 'parser'
        },
        {
          source: 'parser:element', 
          target: 'ui:content'
        },
      ]
    }],

    version: '0.0.38',
    connect: true
}
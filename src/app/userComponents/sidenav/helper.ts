

export const navbarData = [
  {
    routeLink: 'dashboard',
    icon : 'fal fa-home',
    label: 'Dashboard',
    items:[],
  },
  {
    routeLink: 'channels',
    icon : 'fal fa-chat-bar',
    label: 'Channels',
    items:[
      {
        routeLink: 'channels/ch-1',
        icon : 'fal fa-chat-bar',
        label: 'software',
      },
      {
        routeLink: 'channels/ch-2',
        icon : 'fal fa-chat-bar',
        label: 'Tech',
      },
    ]
  },
  {
    routeLink: 'members',
    icon : 'fal fa-chat-bar',
    label: 'Direct Message',
    items:[],
  }
];

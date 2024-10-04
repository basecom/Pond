<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/53444487?v=4',
    name: 'Nele',
    title: 'Lead Maintainer',
    links: [
      { icon: 'github', link: 'https://github.com/aheartforspinach' },
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/33828042?v=4',
    name: 'Marie',
    title: 'Core Maintainer',
    links: [
      { icon: 'github', link: 'https://github.com/mloeffle' },
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/15618191?v=4',
    name: 'Jordan',
    title: 'Core Maintainer',
    links: [
      { icon: 'github', link: 'https://github.com/jkniest' },
    ]
  },
];

const additionalMembers = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/177159072?v=4',
    name: 'Magnus',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/m-borgmann' },
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/47067241?v=4',
    name: 'Birte',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/MorennMcFly' },
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/178470134?v=4',
    name: 'Marius',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/Marius-BSCM' },
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/88533476?v=4',
    name: 'Caro',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/carojansing' },
    ]
  },
];
</script>

# Core Team

Our core team is a group of dedicated individuals who are responsible for the development and maintenance of the project.

<VPTeamMembers
:members="members"
/>

---

# Additional Team

Our core team is a group of dedicated individuals who are responsible for the development and maintenance of the project.

<VPTeamMembers
:members="additionalMembers"
/>

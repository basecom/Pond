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
    title: 'Maintainer',
    links: [
      { icon: 'github', link: 'https://github.com/aheartforspinach' },
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/33828042?v=4',
    name: 'Marie',
    title: 'Maintainer',
    links: [
      { icon: 'github', link: 'https://github.com/mloeffle' },
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/177159072?v=4',
    name: 'Magnus',
    title: 'Maintainer',
    links: [
      { icon: 'github', link: 'https://github.com/m-borgmann' },
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/15618191?v=4',
    name: 'Jordan',
    title: 'Maintainer',
    links: [
      { icon: 'github', link: 'https://github.com/jkniest' },
    ]
  },
];
</script>

# Core Team

Our core team is a group of dedicated individuals who are responsible for the development and maintenance of the
project. If you have any questions or need help, feel free to reach out to any of us.

<VPTeamMembers :members="members"></VPTeamMembers>


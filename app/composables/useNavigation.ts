import { useRoute } from 'vue-router'

export interface NavItem {
  id: string
  label: string
  to: string
  icon?: string
  children?: NavItem[]
}

export interface NavGroup {
  id?: string
  title?: string
  items: NavItem[]
}

export const useNavigation = () => {
  const route = useRoute()
  const { t } = useI18n()
  const { can } = usePermission()
  const isCollapsed = useState('sidebar-collapsed', () => false)
  const expandedItems = useState<string[]>('sidebar-expanded', () => ['group:cms', 'group:userManagement'])

  const navGroups = computed<NavGroup[]>(() => {
    const groups: NavGroup[] = [
      {
        items: [
          {
            id: 'dashboard',
            label: t('components.sidebar.nav.dashboard'),
            to: '/',
            icon: 'i-lucide-layout-dashboard'
          }
        ]
      }
    ]

    // CMS Group
    const contentChildren: NavItem[] = []
    if (can('categories.view')) {
      contentChildren.push({ id: 'category', label: t('components.sidebar.nav.category'), to: '/content/category' })
    }
    if (can('articles.view')) {
      contentChildren.push({ id: 'article', label: t('components.sidebar.nav.article'), to: '/content/article' })
    }

    const cmsItems: NavItem[] = []
    if (contentChildren.length > 0) {
      cmsItems.push({
        id: 'content',
        label: t('components.sidebar.nav.content'),
        to: contentChildren[0]?.to || '/content',
        icon: 'i-lucide-file-text',
        children: contentChildren
      })
    }
    if (can('faqs.view')) {
      cmsItems.push({
        id: 'faq',
        label: t('components.sidebar.nav.faq'),
        to: '/faq',
        icon: 'i-lucide-help-circle'
      })
    }
    if (can('messages.view')) {
      cmsItems.push({
        id: 'messages',
        label: t('components.sidebar.nav.messages'),
        to: '/messages',
        icon: 'i-lucide-mail'
      })
    }
    if (can('settings.view') || can('settings.meta.view') || can('settings.contact.view') || can('settings.social.view')) {
      cmsItems.push({
        id: 'settings',
        label: t('components.sidebar.nav.settings'),
        to: '/settings',
        icon: 'i-lucide-settings'
      })
    }

    if (cmsItems.length > 0) {
      groups.push({
        id: 'cms',
        title: t('components.sidebar.nav.cms'),
        items: cmsItems
      })
    }

    // User Management Group
    const userMgmtItems: NavItem[] = []
    if (can('users.view')) {
      userMgmtItems.push({
        id: 'users',
        label: t('components.sidebar.nav.users'),
        to: '/user',
        icon: 'i-lucide-user'
      })
    }
    if (can('roles.view')) {
      userMgmtItems.push({
        id: 'roles',
        label: t('components.sidebar.nav.roles'),
        to: '/roles',
        icon: 'i-lucide-shield-check'
      })
    }

    if (userMgmtItems.length > 0) {
      groups.push({
        id: 'userManagement',
        title: t('components.sidebar.nav.userManagement'),
        items: userMgmtItems
      })
    }

    return groups
  })

  const bottomNavItems = computed<NavItem[]>(() => [
    {
      id: 'feedback',
      label: t('components.sidebar.nav.feedback'),
      to: '/feedback',
      icon: 'i-lucide-message-square-warning'
    }
  ])

  const isItemActive = (item: NavItem) => {
    if (!item.to || item.to === '#') return false
    if (item.to === '/') {
      return route.path === '/'
    }
    return route.path.startsWith(item.to)
  }

  const isParentActive = (item: NavItem) => {
    if (!item.children) return false
    return item.children.some(child => isItemActive(child))
  }

  const toggleExpanded = (id: string) => {
    const index = expandedItems.value.indexOf(id)
    if (index === -1) {
      expandedItems.value.push(id)
    } else {
      expandedItems.value.splice(index, 1)
    }
  }

  const isExpanded = (id: string) => {
    return expandedItems.value.includes(id)
  }

  return {
    isCollapsed,
    navGroups,
    bottomNavItems,
    isItemActive,
    isParentActive,
    toggleExpanded,
    isExpanded
  }
}

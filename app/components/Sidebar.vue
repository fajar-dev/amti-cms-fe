<template>
  <div class="relative h-full shrink-0">
    <aside
      class="flex flex-col h-full bg-default shrink-0 justify-between border-r border-muted select-none transition-all duration-300 z-10"
      :class="[isCollapsed ? 'w-20 p-3' : 'w-68 px-4 py-3']"
    >
      <div
        class="flex border-b border-muted pb-2 shrink-0"
        :class="[isCollapsed ? 'justify-center' : 'items-center justify-between']"
      >
        <BrandLogo :is-collapsed="isCollapsed" />

        <UButton
          v-if="!isCollapsed"
          color="neutral"
          variant="ghost"
          icon="i-lucide-panel-left-close"
          class="hidden lg:inline-flex text-dimmed hover:text-toned"
          :aria-label="$t('components.sidebar.collapseSidebar')"
          @click="() => { isCollapsed = true }"
        />
      </div>

      <nav class="flex-1 overflow-y-auto min-h-0 py-3 space-y-4 scrollbar-thin">
        <div
          v-for="group in navGroups"
          :key="group.id || group.title"
          class="space-y-2"
        >
          <button
            v-if="!isCollapsed && group.title"
            class="flex w-full items-center justify-between px-1 cursor-pointer group"
            @click="() => { toggleExpanded('group:' + (group.id || group.title)) }"
          >
            <h3 class="text-sm font-medium text-toned">
              {{ group.title }}
            </h3>
            <UIcon
              name="i-lucide-chevron-down"
              class="w-3.5 h-3.5 text-dimmed transition-transform duration-200"
              :class="[isExpanded('group:' + (group.id || group.title)) || !group.title ? '' : '-rotate-90']"
            />
          </button>

          <div
            v-if="!group.title || isCollapsed || isExpanded('group:' + (group.id || group.title))"
            class="space-y-1.5"
          >
            <template
              v-for="item in group.items"
              :key="item.id"
            >
              <template v-if="item.children && item.children.length">
                <UPopover
                  v-if="isCollapsed"
                  :content="{ side: 'right', sideOffset: 12, align: 'start' }"
                  :ui="{ content: 'p-0' }"
                  mode="hover"
                >
                  <button
                    class="flex items-center transition-colors group w-10 h-10 mx-auto justify-center rounded-md cursor-pointer"
                    :class="[
                      isParentActive(item)
                        ? 'bg-primary text-white shadow-md shadow-primary/30'
                        : 'text-toned hover:bg-muted hover:text-highlighted'
                    ]"
                  >
                    <UIcon
                      :name="item.icon"
                      class="w-5 h-5 shrink-0 transition-colors"
                      :class="[
                        isParentActive(item)
                          ? 'text-white'
                          : 'text-toned group-hover:text-highlighted'
                      ]"
                    />
                  </button>

                  <template #content>
                    <div class="min-w-44 py-1">
                      <div class="px-3 py-2 text-xs font-semibold text-dimmed uppercase tracking-wider">
                        {{ item.label }}
                      </div>
                      <NuxtLink
                        v-for="child in item.children"
                        :key="child.id"
                        :to="child.to"
                        class="flex items-center gap-2.5 px-3 py-2 text-sm transition-colors"
                        :class="[
                          isItemActive(child)
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-toned hover:bg-muted'
                        ]"
                      >
                        <UIcon
                          v-if="child.icon"
                          :name="child.icon"
                          class="w-4 h-4 shrink-0"
                          :class="[
                            isItemActive(child) ? 'text-primary' : 'text-dimmed'
                          ]"
                        />
                        <span>{{ child.label }}</span>
                      </NuxtLink>
                    </div>
                  </template>
                </UPopover>

                <template v-else>
                  <button
                    class="flex w-full items-center gap-3 px-3 py-2 text-sm rounded-md font-medium transition-colors cursor-pointer group"
                    :class="[
                      isParentActive(item)
                        ? 'text-primary'
                        : 'text-toned hover:bg-muted hover:text-highlighted'
                    ]"
                    @click="() => { toggleExpanded(item.id) }"
                  >
                    <UIcon
                      :name="item.icon"
                      class="w-5 h-5 shrink-0 transition-colors"
                      :class="[
                        isParentActive(item)
                          ? 'text-primary'
                          : 'text-toned group-hover:text-highlighted'
                      ]"
                    />
                    <span class="truncate flex-1 text-left">{{ item.label }}</span>
                    <UIcon
                      name="i-lucide-chevron-down"
                      class="w-4 h-4 shrink-0 text-dimmed transition-transform duration-200"
                      :class="[isExpanded(item.id) || isParentActive(item) ? 'rotate-180' : '']"
                    />
                  </button>

                  <div
                    v-if="isExpanded(item.id) || isParentActive(item)"
                    class="ml-5 pl-3 border-l-2 border-default space-y-0.5"
                  >
                    <NuxtLink
                      v-for="child in item.children"
                      :key="child.id"
                      :to="child.to"
                      class="flex items-center gap-3 px-3 py-1.5 text-sm rounded-md transition-colors group"
                      :class="[
                        isItemActive(child)
                          ? 'bg-primary text-white font-medium shadow-md shadow-primary/30'
                          : 'text-muted hover:bg-muted hover:text-highlighted'
                      ]"
                    >
                      <UIcon
                        v-if="child.icon"
                        :name="child.icon"
                        class="w-4 h-4 shrink-0 transition-colors"
                        :class="[
                          isItemActive(child)
                            ? 'text-white'
                            : 'text-dimmed group-hover:text-highlighted'
                        ]"
                      />
                      <span class="truncate">{{ child.label }}</span>
                    </NuxtLink>
                  </div>
                </template>
              </template>

              <UTooltip
                v-else
                :text="item.label"
                :disabled="!isCollapsed"
                :content="{ align: 'center', side: 'right', sideOffset: 8 }"
              >
                <NuxtLink
                  :to="item.to"
                  class="flex items-center transition-colors group"
                  :class="[
                    isCollapsed ? 'w-10 h-10 mx-auto justify-center rounded-md' : 'w-full gap-3 px-3 py-2 text-sm rounded-md font-medium',
                    isItemActive(item)
                      ? 'bg-primary text-white shadow-md shadow-primary/30'
                      : 'text-toned hover:bg-muted hover:text-highlighted'
                  ]"
                >
                  <UIcon
                    :name="item.icon"
                    class="w-5 h-5 shrink-0 transition-colors"
                    :class="[
                      isItemActive(item)
                        ? 'text-white'
                        : 'text-toned group-hover:text-highlighted'
                    ]"
                  />
                  <span
                    v-if="!isCollapsed"
                    class="truncate"
                  >{{ item.label }}</span>
                </NuxtLink>
              </UTooltip>
            </template>
          </div>
        </div>
      </nav>

      <div class="shrink-0 pt-2 space-y-2">
        <div class="hidden lg:block pt-2 border-t border-muted">
          <UserPopover :popover-props="{ content: { side: 'right', sideOffset: 12, align: 'end' } }">
            <button
              class="flex w-full items-center cursor-pointer rounded-md transition-colors hover:bg-muted"
              :class="[isCollapsed ? 'justify-center p-2' : 'gap-3 px-2 py-2']"
            >
              <UAvatar
                :src="authState.user?.photo"
                :alt="authState.user?.name"
                size="sm"
                class="ring-2 ring-primary/10 shrink-0"
                loading="lazy"
              />
              <div
                v-if="!isCollapsed"
                class="min-w-0 flex-1 text-left"
              >
                <h2 class="text-sm font-medium truncate text-highlighted">
                  {{ authState.user?.name }}
                </h2>
                <p class="text-xs text-muted truncate">
                  {{ authState.user?.email }}
                </p>
              </div>
              <UIcon
                v-if="!isCollapsed"
                name="i-lucide-chevrons-up-down"
                class="w-4 h-4 text-dimmed shrink-0"
              />
            </button>
          </UserPopover>
        </div>
      </div>
    </aside>

    <button
      v-if="isCollapsed"
      class="hidden lg:flex absolute top-4.5 -right-3 z-30 w-7 h-7 rounded-full bg-default shadow-md items-center justify-center text-muted hover:text-highlighted hover:shadow-lg transition-all cursor-pointer focus:outline-none"
      :aria-label="$t('components.sidebar.expandSidebar')"
      @click="() => { isCollapsed = false }"
    >
      <UIcon
        name="i-lucide-panel-left-open"
        class="w-4 h-4"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
const { state: authState } = useAuth()
const { isCollapsed, navGroups, isItemActive, isParentActive, toggleExpanded, isExpanded } = useNavigation()
</script>

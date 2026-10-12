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
          <UButton
            v-if="!isCollapsed && group.title"
            color="neutral"
            variant="ghost"
            block
            class="group px-1 justify-between"
            :ui="{ base: 'px-1' }"
            @click="() => { toggleExpanded('group:' + (group.id || group.title)) }"
          >
            <span class="text-sm font-medium text-toned">
              {{ group.title }}
            </span>
            <UIcon
              name="i-lucide-chevron-down"
              class="size-3.5 text-dimmed transition-transform duration-200"
              :class="[isExpanded('group:' + (group.id || group.title)) || !group.title ? '' : '-rotate-90']"
            />
          </UButton>

          <div
            v-if="!group.title || isCollapsed || isExpanded('group:' + (group.id || group.title))"
            class="space-y-1.5"
          >
            <template
              v-for="item in group.items"
              :key="item.id"
            >
              <template v-if="item.children && item.children.length">
                <div
                  v-if="isCollapsed"
                  class="flex justify-center w-full"
                >
                  <UPopover
                    :content="{ side: 'right', sideOffset: 12, align: 'start' }"
                    :ui="{ content: 'p-0' }"
                    mode="hover"
                  >
                    <UButton
                      :color="isParentActive(item) ? 'primary' : 'neutral'"
                      :variant="isParentActive(item) ? 'solid' : 'ghost'"
                      :icon="item.icon"
                      class="w-10 h-10 mx-auto flex items-center justify-center rounded-md p-0"
                      :class="[
                        isParentActive(item)
                          ? 'shadow-md shadow-primary/30'
                          : ''
                      ]"
                      :aria-label="item.label"
                    />

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
                </div>

                <template v-else>
                  <UButton
                    color="neutral"
                    variant="ghost"
                    block
                    class="group gap-3 justify-start"
                    :class="isParentActive(item) ? 'text-primary' : 'text-toned'"
                    @click="() => { toggleExpanded(item.id) }"
                  >
                    <UIcon
                      :name="item.icon"
                      class="size-5 shrink-0 transition-colors"
                    />
                    <span class="truncate flex-1 text-left text-sm font-medium">{{ item.label }}</span>
                    <UIcon
                      name="i-lucide-chevron-down"
                      class="size-4 shrink-0 text-dimmed transition-transform duration-200"
                      :class="[isExpanded(item.id) || isParentActive(item) ? 'rotate-180' : '']"
                    />
                  </UButton>

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
            <UButton
              color="neutral"
              variant="ghost"
              block
              :class="isCollapsed ? 'justify-center' : 'gap-3'"
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
                class="size-4 text-dimmed shrink-0"
              />
            </UButton>
          </UserPopover>
        </div>
      </div>
    </aside>

    <UButton
      v-if="isCollapsed"
      variant="solid"
      size="xs"
      icon="i-lucide-panel-left-open"
      class="hidden lg:inline-flex absolute top-4.5 -right-3 z-30 rounded-full shadow-md hover:shadow-lg transition-all"
      :aria-label="$t('components.sidebar.expandSidebar')"
      @click="() => { isCollapsed = false }"
    />
  </div>
</template>

<script setup lang="ts">
const { state: authState } = useAuth()
const { isCollapsed, navGroups, isItemActive, isParentActive, toggleExpanded, isExpanded } = useNavigation()
</script>

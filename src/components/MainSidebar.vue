<script setup lang="ts">
import { Calendar, Home, Inbox, Search, Settings } from 'lucide-vue-next'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

// Menu items.
const items = [
  {
    title: 'Progress View',
    url: '/',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '/',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '/',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '/',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '/',
    icon: Settings,
  },
]
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton asChild>
                <router-link :to="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </router-link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>

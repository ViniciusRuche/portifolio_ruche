import type { Component } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { FeatureFlagTypes } from '@/features/feature-flags/constants/FeatureFlagTypes'
import {
  LayoutDashboard,
  User,
  Plane,
  TowerControl,
  Landmark,
  PiggyBank,
  CircleDollarSign,
  DollarSign,
  PersonStanding,
  Users,
  Factory,
  Scroll,
  GraduationCap,
  BookOpen,
  BookText,
  Target,
  ClipboardList,
  Award,
  Layers
} from 'lucide-vue-next'

export interface MenuItem {
  title: string
  icon: Component
  route?: RouteLocationRaw
  active: boolean
  children?: MenuItem[]
}

export const getMenu = (): MenuItem[] => {
  const appStore = useAppStore()
  return [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      route: { name: 'DashboardList' },
      active: true,
      children: []
    },
    {
      title: 'Pessoas',
      icon: Users,
      active: true,
      children: [
        {
          title: 'Usuários',
          icon: User,
          route: { name: 'UsersList' },
          active: true,
          children: []
        },
        {
          title: 'Pessoas Físicas',
          icon: PersonStanding,
          route: { name: 'individualPersonsList' },
          active: true,
          children: []
        },
        {
          title: 'Pessoas Jurídicas',
          icon: Factory,
          route: { name: 'corporatePersonsList' },
          active: true,
          children: []
        }
      ]
    },
    {
      title: 'Financeiro',
      icon: DollarSign,
      active: true,
      children: [
        {
          title: 'Documentos Financeiros',
          icon: CircleDollarSign,
          route: { name: 'FinancialDocumentList' },
          active: true
        },
        {
          title: 'Remessas',
          icon: Scroll,
          route: { name: 'BankRemittanceList' },
          active: true
        },
        {
          title: 'Cadastros',
          icon: Layers,
          active: true,
          children: [
            {
              title: 'Contas Bancárias',
              icon: Landmark,
              route: { name: 'BankAccountsList' },
              active: true
            },
            {
              title: 'Centros de Custo',
              icon: PiggyBank,
              route: { name: 'CostCentersList' },
              active: true
            }
          ]
        }
      ]
    },
    {
      title: 'Acadêmico',
      icon: GraduationCap,
      active: appStore.isFeatureEnabled(FeatureFlagTypes.ENABLE_COURSES),
      children: [
        {
          title: 'Cursos',
          icon: BookOpen,
          route: { name: 'CoursesList' },
          active: true
        },
        {
          title: 'Disciplinas',
          icon: BookText,
          route: { name: 'ModulesList' },
          active: true
        },
        {
          title: 'Missões',
          icon: Target,
          route: { name: 'MissionsList' },
          active: true
        },
        {
          title: 'Cadastros',
          icon: Layers,
          active: true,
          children: [
            {
              title: 'Quesitos',
              icon: ClipboardList,
              route: { name: 'RequirementsList' },
              active: true
            },
            {
              title: 'Proficiências',
              icon: Scroll,
              route: { name: 'SkillsList' },
              active: true
            },
            {
              title: 'Graus',
              icon: Award,
              route: { name: 'ScoresList' },
              active: true
            }
          ]
        }
      ]
    },
    {
      title: 'Cadastros Gerais',
      icon: Layers,
      active: true,
      children: [
        {
          title: 'Aeronaves',
          icon: Plane,
          route: { name: 'AircraftsList' },
          active: true
        },
        {
          title: 'Aeroportos',
          icon: TowerControl,
          route: { name: 'AirportsList' },
          active: true
        }
      ]
    }
  ]
}

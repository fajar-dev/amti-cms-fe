import { computed } from 'vue'
import { settingService } from '~/services/setting-service'

const DEFAULT_PHONE = '+62 812-8745-6669'
const DEFAULT_EMAIL = 'amti.solution@gmail.com'
const DEFAULT_MAPS_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4912493365014!2d106.6209516!3d-6.198734000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fec92e1b20a9%3A0x6233077e13d3f880!2sJl.%20Imam%20Bonjol%20Blok%20A2%20No.9%2C%20RT.002%2FRW.002%2C%20Bojong%20Jaya%2C%20Kec.%20Karawaci%2C%20Kota%20Tangerang%2C%20Banten%2015115!5e0!3m2!1sen!2sid!4v1791796115074!5m2!1sen!2sid'

function formatWhatsappHref(value?: string | null): string {
  if (!value) return 'https://wa.me/6281287456669'
  if (value.startsWith('http://') || value.startsWith('https://')) return value
  const digits = value.replace(/\D/g, '')
  if (digits.startsWith('0')) {
    return `https://wa.me/62${digits.slice(1)}`
  }
  return `https://wa.me/${digits || '6281287456669'}`
}

function formatPhoneHref(value?: string | null): string {
  if (!value) return 'tel:+6281287456669'
  if (value.startsWith('tel:')) return value
  const cleaned = value.replace(/[^\d+]/g, '')
  return `tel:${cleaned || '+6281287456669'}`
}

export function useSiteSettings() {
  const { t } = useI18n()

  const { data: response, status, refresh } = useAsyncData(
    'public-settings',
    () => settingService.getPublic(),
    {
      lazy: true,
      server: true
    }
  )

  const settings = computed(() => response.value?.data ?? null)

  const siteName = computed(() => settings.value?.siteName || t('site.identity.name'))
  const siteDescription = computed(() => settings.value?.siteDescription || t('site.smart.body'))
  const metaKeywords = computed(() => settings.value?.metaKeywords || 'amti, eews, shms, asset monitoring')
  const author = computed(() => settings.value?.author || t('site.identity.fullName'))
  const copyright = computed(() => settings.value?.copyright || t('site.identity.copyright'))

  const logoUrl = computed(() => settings.value?.logoUrl || null)
  const faviconUrl = computed(() => settings.value?.faviconUrl || null)
  const ogImageUrl = computed(() => settings.value?.ogImageUrl || null)

  const phone = computed(() => settings.value?.phone || t('site.identity.phone'))
  const phoneHref = computed(() => formatPhoneHref(settings.value?.phone || DEFAULT_PHONE))

  const whatsapp = computed(() => settings.value?.whatsapp || settings.value?.phone || DEFAULT_PHONE)
  const whatsappHref = computed(() => formatWhatsappHref(settings.value?.whatsapp || settings.value?.phone || DEFAULT_PHONE))

  const email = computed(() => settings.value?.email || t('site.identity.email'))
  const emailHref = computed(() => `mailto:${settings.value?.email || DEFAULT_EMAIL}`)

  const address = computed(() => settings.value?.address || t('site.identity.address'))
  const mapsUrl = computed(() => settings.value?.mapsUrl || DEFAULT_MAPS_URL)

  const siteSocials = computed(() => {
    const list: Array<{ name: string, href: string, icon: string }> = []
    const s = settings.value

    const tiktokHref = s?.tiktok || 'https://www.tiktok.com/@amti.solution?lang=id-ID'
    const linkedinHref = s?.linkedin || 'https://linkedin.com/company/asset-monitoring-teknologi-indonesia'
    const instagramHref = s?.instagram || 'https://www.instagram.com/amtiofficial/'

    if (tiktokHref) list.push({ name: 'TikTok', href: tiktokHref, icon: 'i-lucide-music-2' })
    if (linkedinHref) list.push({ name: 'LinkedIn', href: linkedinHref, icon: 'i-lucide-linkedin' })
    if (instagramHref) list.push({ name: 'Instagram', href: instagramHref, icon: 'i-lucide-instagram' })

    if (s?.facebook) list.push({ name: 'Facebook', href: s.facebook, icon: 'i-lucide-facebook' })
    if (s?.twitter) list.push({ name: 'X', href: s.twitter, icon: 'i-lucide-twitter' })
    if (s?.youtube) list.push({ name: 'YouTube', href: s.youtube, icon: 'i-lucide-youtube' })

    return list
  })

  return {
    settings,
    status,
    refresh,
    siteName,
    siteDescription,
    metaKeywords,
    author,
    copyright,
    logoUrl,
    faviconUrl,
    ogImageUrl,
    phone,
    phoneHref,
    whatsapp,
    whatsappHref,
    email,
    emailHref,
    address,
    mapsUrl,
    siteSocials
  }
}

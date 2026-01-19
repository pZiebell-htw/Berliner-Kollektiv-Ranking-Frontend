import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import axios from 'axios'
import RankingView from '../views/RankingView.vue'

vi.mock('axios')

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))

describe('RankingView.vue Tests (Mindestanforderungen)', () => {
  const mockKollektivs = [
    {
      id: 1,
      name: 'Berliner Groove',
      genre: 'Groove',
      bildUrl: '',
      beschreibung: 'Bester Sound',
      durchschnittsBewertung: 4.5
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(axios.get).mockResolvedValue({ data: mockKollektivs })
    // Mock für localStorage (für Test 8)
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        clear: vi.fn()
      },
      writable: true
    })
  })

  const createWrapper = () => {
    return mount(RankingView, {
      global: {
        stubs: {
          'router-link': {
            template: '<div><slot :navigate="() => {}" /></div>'
          },
          'AddButton': true
        }
      }
    })
  }

  // Happy Tests

  it('1. Komponente lädt korrekt', () => {
    const wrapper = createWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  it('2. Überschrift wird angezeigt', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('h2').text()).toBe('Top Collectives')
  })

  it('3. Kollektiv-Daten werden gerendert', async () => {
    const wrapper = createWrapper()
    await flushPromises()
    expect(wrapper.find('.kollektiv-title').text()).toBe('Berliner Groove')
  })

  it('4. Durchschnittsbewertung wird korrekt formatiert', async () => {
    const wrapper = createWrapper()
    await flushPromises()
    expect(wrapper.find('.avg-value').text()).toBe('4.5')
  })

  it('5. Genre-Dropdown enthält Optionen', () => {
    const wrapper = createWrapper()
    const options = wrapper.findAll('option')
    expect(options.length).toBeGreaterThan(1)
  })


  // Sad Tests

  it('6. Fehlermeldung bei API-Fehler (Console Check)', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.mocked(axios.get).mockRejectedValue(new Error('API Down'))
    createWrapper()
    await flushPromises()
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  it('7. Löschen ohne korrektes Passwort bricht ab', async () => {
    window.prompt = vi.fn().mockReturnValue('falsches_pw')
    window.alert = vi.fn()
    const wrapper = createWrapper()
    await flushPromises()
    await wrapper.find('.delete-button').trigger('click')
    expect(window.alert).toHaveBeenCalledWith('Falsches Passwort')
  })

  it('8. Bewerten ohne Login zeigt Alert', async () => {
    window.alert = vi.fn()
    vi.mocked(window.localStorage.getItem).mockReturnValue(null)
    const wrapper = createWrapper()
    await flushPromises()
    await wrapper.find('.star').trigger('click')
    expect(window.alert).toHaveBeenCalledWith('Please login')
  })

  it('9. Filter liefert leere Liste bei unbekanntem Genre', async () => {
    const wrapper = createWrapper()
    await flushPromises()
    await wrapper.find('select').setValue('Techno')
    expect(wrapper.findAll('article').length).toBe(0)
  })

  it('10. Umgang mit fehlender Bild-URL', async () => {
    const wrapper = createWrapper()
    await flushPromises()
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('/placeholder.png')
  })
})

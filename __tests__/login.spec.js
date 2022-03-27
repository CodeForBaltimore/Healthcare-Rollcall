import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
import flushPromises from 'flush-promises'
import Login from '../src/templates/Home/Login.vue'
import { postLogin } from '../src/utils/api'

jest.mock("../src/utils/api.js", () => ({
  postLogin: jest.fn()
}))

describe('Login tests', () => {
  let wrapper = null

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(BootstrapVue)

    wrapper = mount(Login, {
      localVue,
      mocks: {
        $router: {
          replace: jest.fn()
        }
      }
    })
  })
  afterEach(() => {
    wrapper.destroy()
    jest.resetModules()
  })

  test('Alert shows when POST returns error', async () => {
    postLogin.mockImplementation(() => Promise.resolve({
      status: 400,
      message: "blah"
    }))

    await wrapper.get('[data-test="email"]').setValue('test@test.test')
    await wrapper.get('[data-test="password"]').setValue('test')
    await wrapper.get('[data-test="login"]').trigger('submit')

    await flushPromises()

    expect(wrapper.vm.$router.replace).toHaveBeenCalledTimes(0)
    expect(wrapper.find('[data-test="alert"]').text()).toContain('blah')
  })

  test('Alert does not show when POST succeeds', async () => {
    postLogin.mockImplementation(() => Promise.resolve({
      status: 200,
      message: "blah"
    }))

    await wrapper.get('[data-test="email"]').setValue('test@test.test')
    await wrapper.get('[data-test="password"]').setValue('test')
    await wrapper.get('[data-test="login"]').trigger('submit')

    await flushPromises()

    expect(wrapper.vm.$router.replace).toHaveBeenCalledTimes(1)
    expect(wrapper.find('[data-test="alert"]').text()).toBe('')
  })

})
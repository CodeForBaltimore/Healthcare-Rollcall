import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
import flushPromises from 'flush-promises'
import Login from '../src/templates/Home/Login.vue'
import Home from '../src/templates/Home/Home.vue'
import PasswordResetRequest from '../src/templates/Home/PasswordResetRequest.vue'
import { postLogin, postReset } from '../src/utils/api'

jest.mock("../src/utils/api.js", () => ({
  postLogin: jest.fn(),
  postReset: jest.fn()
}))

describe('Login tests', () => {
  const MOCK_EMAIL = 'test@test.test'
  const localVue = createLocalVue()
  localVue.use(BootstrapVue)
  const mountOptions = {localVue}
  let wrapper = null

  afterEach(() => {
    wrapper.destroy()
    jest.resetModules()
  })

  test('Description is displayed on home page', () => {
    wrapper = mount(Home, {
      ...mountOptions,
      stubs: {
        Login: {
          template: '<div/>'
        }
      }
    })

    expect(wrapper.find('[data-test="description"]').text()).toContain('Welcome to Healthcare Roll Call')
    expect(wrapper.find('[data-test="description"]').text()).toContain('Check-in for Healthcare Providers')
    expect(wrapper.find('[data-test="description"]').text()).toContain('consolidates all emergency information in one database')
  })

  test('Tutorial is displayed on home page', () => {
    wrapper = mount(Home, {
      ...mountOptions,
      stubs: {
        Login: {
          template: '<div/>'
        }
      }
    })

    expect(wrapper.find('[data-test="tutorial"]').text()).toContain('Tutorial')
    expect(wrapper.find('[data-test="tutorial-slide"]').exists()).toBe(true)
  })

  test('Alert shows when POST returns error', async () => {
    wrapper = mount(Login, {
      ...mountOptions,
      mocks: {
        $router: {
          replace: jest.fn()
        }
      }
    })
    postLogin.mockImplementation(() => Promise.resolve({
      status: 400,
      message: "blah"
    }))

    await wrapper.get('[data-test="login-email"]').setValue(MOCK_EMAIL)
    await wrapper.get('[data-test="login-password"]').setValue('test')
    await wrapper.get('[data-test="login"]').trigger('submit')

    await flushPromises()

    expect(wrapper.vm.$router.replace).toHaveBeenCalledTimes(0)
    expect(wrapper.find('[data-test="login-alert"]').text()).toContain('blah')
  })

  test('Alert does not show when POST succeeds', async () => {
    wrapper = mount(Login, {
      ...mountOptions,
      mocks: {
        $router: {
          replace: jest.fn()
        }
      }
    })
    postLogin.mockImplementation(() => Promise.resolve({
      status: 200,
      message: "blah"
    }))

    await wrapper.get('[data-test="login-email"]').setValue(MOCK_EMAIL)
    await wrapper.get('[data-test="login-password"]').setValue('test')
    await wrapper.get('[data-test="login"]').trigger('submit')

    await flushPromises()

    expect(wrapper.vm.$router.replace).toHaveBeenCalledTimes(1)
    expect(wrapper.find('[data-test="login-alert"]').text()).toBe('')
  })

  test('Modal shows when forgot password link is clicked', async () => {
    wrapper = mount(Login, mountOptions)

    const modal = wrapper.findComponent({ ref: 'password-reset-modal' });
    expect(modal.vm.isVisible).toBe(false);

    await wrapper.get('[data-test="password-reset-link"]').trigger('click')
    await flushPromises()

    expect(modal.vm.isVisible).toBe(true)
  })

  test('Success message displayed on password reset modal when POST suceeds', async () => {
    wrapper = mount(PasswordResetRequest, mountOptions)
    postReset.mockImplementation(() => Promise.resolve({status: 200}))

    await wrapper.get('[data-test="reset-email"]').setValue(MOCK_EMAIL)
    await wrapper.get('[data-test="reset-password-submit"]').trigger('submit')
    await flushPromises()

    expect(wrapper.find('[data-test="reset-password-alert"]').text()).toContain("Password reset email sent!")
  })

  test('Error message displayed on password reset modal when POST fails', async () => {
    wrapper = mount(PasswordResetRequest, mountOptions)
    postReset.mockImplementation(() => Promise.resolve({status: 400}))

    await wrapper.get('[data-test="reset-email"]').setValue(MOCK_EMAIL)
    await wrapper.get('[data-test="reset-password-submit"]').trigger('submit')
    await flushPromises()

    expect(wrapper.find('[data-test="reset-password-alert"]').text()).toContain("Failed sending email")
  })

})
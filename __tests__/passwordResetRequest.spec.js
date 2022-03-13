import { mount, createLocalVue } from '@vue/test-utils'
import {BootstrapVue} from 'bootstrap-vue'
import PasswordResetRequest from '../src/templates/PasswordResetRequest.vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('Utils tests', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount(PasswordResetRequest, {
      localVue,
      mocks: {
        modalShow: true
      }
    })
  })
  afterEach(() => {
    wrapper.destroy()
    jest.resetModules()
  })

  test('reset function called when reset password button clicked', async () => {
    wrapper.vm.resetPass  = jest.fn();

    await wrapper.get('[data-test="reset-email"]').setValue('test@test.test')
    await wrapper.get('[data-test="reset-password-submit"]').trigger('click')

    expect(wrapper.vm.resetPass).toHaveBeenCalled();
  })
})
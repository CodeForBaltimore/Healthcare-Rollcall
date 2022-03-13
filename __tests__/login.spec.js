import { mount, createLocalVue } from '@vue/test-utils'
import {BootstrapVue} from 'bootstrap-vue'
import LoginComponent from '../src/templates/Login.vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('Utils tests', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = mount(LoginComponent, {localVue})
    })
    afterEach(() => {
        wrapper.destroy()
        jest.resetModules()
    })

    test('login function called on submit', async () => {
        wrapper.vm.login  = jest.fn();

        await wrapper.get('[data-test="email"]').setValue('test@test.test')
        await wrapper.get('[data-test="password"]').setValue('test')
        await wrapper.get('[data-test="login"]').trigger('submit')

        expect(wrapper.vm.login).toHaveBeenCalled();
    })
})
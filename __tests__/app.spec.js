import {shallowMount, createLocalVue} from '@vue/test-utils';
import App from './../src/App'
import {BootstrapVue} from "bootstrap-vue";
import Router from 'vue-router'

describe('App', () => {
    // Inspect the raw component options
    it('has data', () => {
        expect(typeof App.data).toBe('function')
    })
})

describe('Mounted App', () => {
    const $root = {
        getNavBarStatus: () => {
        }
    }
    const $jwt = {
        decode: () => {
            return {}
        },
    }
    const localVue = createLocalVue();
    localVue.use(BootstrapVue)
    localVue.use(Router)

    let app = shallowMount(App, {
        localVue,
        mocks: {
            $root,
            $jwt
        }
    })

    test('is a Vue instance', () => {
        expect(app.isVueInstance()).toBeTruthy()
    })
})

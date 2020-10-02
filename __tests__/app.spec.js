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

    test('is a Vue instance with the following components', () => {
        expect(app.find('b-navbar')).toBeTruthy()
        expect(app.find('b-navbar-toggle')).toBeTruthy()
        expect(app.find('b-navbar-brand')).toBeTruthy()
        expect(app.find('b-container')).toBeTruthy()
        expect(app.find('b-nav-item')).toBeTruthy()
        expect(app.find('b-navbar-nav')).toBeTruthy()
        expect(app.find('b-collapse')).toBeTruthy()
        expect(app.find('b-icon-person-circle')).toBeTruthy()
        expect(app.find('template')).toBeTruthy()
        expect(app.find('router-view')).toBeTruthy()
    })

    test('is a Vue instance with the following components', () => {
        expect(app.find('b-navbar')).toBeTruthy()
        expect(app.find('b-navbar-toggle')).toBeTruthy()
        expect(app.find('b-navbar-brand')).toBeTruthy()
        expect(app.find('b-container')).toBeTruthy()
        expect(app.find('b-nav-item')).toBeTruthy()
        expect(app.find('b-navbar-nav')).toBeTruthy()
        expect(app.find('b-collapse')).toBeTruthy()
        expect(app.find('b-icon-person-circle')).toBeTruthy()
        expect(app.find('template')).toBeTruthy()
        expect(app.find('router-view')).toBeTruthy()
    })
})

import {config} from '@vue/test-utils'
import {rootFuncs} from "./__mocks__/main.mock";

config.mocks = rootFuncs

config.ignoredElements = ['b-field', 'b-autocomplete', 'b-navbar']

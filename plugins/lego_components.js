/*
    Example import all components
*/

import Vue from 'vue'

import DLayout from './lego_components/components/layout/index'
import MenuList from './lego_components/components/menu/cMenuNav'
import DFooter from './lego_components/components/footer/footer'
import DContact from './lego_components/components/contacts/contact'
import DSimpleColumn from './lego_components/components/panels/DSimpleColumn'


import DSimpleCard from './lego_components/components/cards/simple_card'
import DProductCard from './lego_components/components/cards/product_card'
import DCommentedCard from './lego_components/components/cards/commented_card'
import DWrapperPage from './lego_components/components/wrapperPage/wrapperPage'


const components = [
    DLayout,
    MenuList,
    DFooter,
    DContact,
    DSimpleColumn,
    DProductCard,
    DSimpleCard,
    DCommentedCard,
    DWrapperPage,
]

components.map(component => Vue.component(component.name,component))

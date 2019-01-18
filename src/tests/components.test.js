import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import puppeteer from 'puppeteer';
import faker from 'faker';



import ClickableImage from '../components/miscellaneous/ClickableImage'
import Map from '../components/miscellaneous/Map'
import MessageDialog from '../components/miscellaneous/MessageDialog'
import Navigation from '../components/navigation/Navigation'


import logo from '../assets/img/logo.png'

Enzyme.configure({adapter: new Adapter()});

const app = 'http://localhost:3000';
let page;
let browser;
const width = 1920;
const height = 1080;

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
});
afterAll(() => {
    browser.close();
});


describe("puppeteer testing", () => {
    test("i can do anything at all lmao", async () => {
        await page.goto(app);

    }, 16000);
});



// describe('quick maffs test suite', () => {
//     test('2 + 2 is 4', () => {
//         expect(2 + 2).toBe(4);
//     });
// });
//
// describe('tests navigation bar', () => {
//     const wrapper = shallow(<Navigation isLoading={false}/>);
//     it('correctly renders', () => {
//         expect(wrapper.exists()).toBe(true);
//     });
//     // it('simulates "LOGG INN"-click', () => {
//     //     expect(wrapper.find('#warningButton').exists()).toBe(true);
//     // });
// });
//
// describe('tests message dialog', () => {
//     const wrapper = shallow(<MessageDialog
//             open={true}
//             onClose={this.handleToggle('isError')}
//             title={'test dialog'}
//             content='test content'
//             error={true}/>);
//     it('correctly renders', () => {
//         expect(wrapper.exists()).toBe(true);
//     });
// });
//
// describe('tests map component', () => {
//     const wrapper = shallow(<Map/>);
//     it('correctly renders', () => {
//         expect(wrapper.exists()).toBe(true);
//     });
// });

// describe('it render?', () => {
//     it('correctly renders', () => {
//         const wrapper = shallow(<ClickableImage image={logo}/>);
//         expect(wrapper).toBe(null);
//     });
// });
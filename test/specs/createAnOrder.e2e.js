const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {

    it('should set the address fields', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const address1Input = await $(page.fromField);
        const address2Input = await $(page.toField);
        await expect(address1Input).toHaveValue('East 2nd Street, 601');
        await expect(address2Input).toHaveValue('1300 1st St');
    })

    it('should select the Supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlan = await page.selectSupportivePlan();
        await expect(supportivePlan.parentElement()).toHaveElementClass('active');
    })
    
    it('should fill in the phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('saves a new credit card', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await browser.waitUntil(async () => {
            const paymentMethodButton = await $(page.paymentMethodButton);
            return await paymentMethodButton.isDisplayed();
            }, {
                timeout: 10000,
                message: 'Payment method button not displayed after filling addresses'
            });
        await page.addCreditCard('1111 1111 1111 1111', '23');
        const newCardCheckbox = await $(page.newCardCheckbox);
        await expect(newCardCheckbox).toBeSelected(); 
    })

    it('should accept a message to the driver', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.messageToDriver('Hi Driver!');
        const completedMessage = await $(page.messageToDriverField);
        await expect(completedMessage).toHaveValue('Hi Driver!');
    })

    it('should select blanket and handkerchiefs', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        const blanketAndHandkerchiefs = await $(page.blanketAndHandkerchiefsButton);
        await blanketAndHandkerchiefs.waitForDisplayed();
        await blanketAndHandkerchiefs.click();
        await expect(blanketAndHandkerchiefs).toBeEnabled();
    })

    it('should add 2 icecreams to the order', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        const iceCreamPlusCounter = await $(page.iceCreamPlusCounter);
        await iceCreamPlusCounter.waitForDisplayed();
        await iceCreamPlusCounter.click();
        await iceCreamPlusCounter.click();
        const iceCreamCounterValue = await $(page.iceCreamCounterValue);
        await expect(iceCreamCounterValue).toHaveTextContaining('2');
    })

    it('should display a car search modal after placing an order', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await page.placeCarOrder();
        const carSearchModal = await $(page.carSearchModal);
        await expect(carSearchModal).toBeExisting();
    })

    it('should display the driver info', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await page.messageToDriver('Hi Driver!');
        await page.placeCarOrder();
        const driverInfo = await $(page.driverInfoButton);
        console.log("driverInfo exists, waiting for it to be displayed...");
        await browser.pause(35000);
        await expect(driverInfo).toBeExisting()
    })
})


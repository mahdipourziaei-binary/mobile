/**
 * @name websocketService
 * @author Massih Hazrati
 * @contributors []
 * @since 10/15/2015
 * @copyright Binary Ltd
 * Handles websocket functionalities
 */

angular
    .module("binary")
    .factory(
        "validationService",
        ($state, appStateService) => {
            const currency = sessionStorage.getItem('currency') || 'USD';
            const currencyConfig = appStateService.currenciesConfig || {};
            const fractionalDigitis = currencyConfig && Object.keys(currencyConfig).length &&
            currencyConfig[currency] ? currencyConfig[currency].fractional_digits : 2;
            const validationService = {};
            const validateGeneralRegex = /[`~!@#$%^&*)(_=+[}{\]\\/";:?><|]+/;
            const validateAddressRegex = /[`~!$%^&*_=+[}{\]\\"?><|]+/;
            const validatePostcodeRegex = /^([a-zA-Z\d-\s])*$/;
            const validatePhoneRegex = /^\+?[0-9\s]*$/;
            const validateTaxIdentificationNumberRegex = /^[\w-]{0,20}$/;
            const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+/;
            const mailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
            const tokenRegex = /^\w{8,128}$/;
            const numberRegex = /^\d+$/;
            const floatNumberRegex = decimals => new RegExp(`^\\d+(\\.\\d{0,${decimals}})?$`);
            const integerRegex = /^\d+$/;
            /* eslint-disable */
            const validator = (val, regexPattern, reverse) => {
                return {
                    test(val) {
                        return reverse ? !regexPattern.test(val) : regexPattern.test(val);
                    }
                }
            };
            /* eslint-enable */


            validationService.validateGeneral = (val => validator(val, validateGeneralRegex, true))();
            validationService.validateAddress = (val => validator(val, validateAddressRegex, true))();
            validationService.validatePostcode = (val => validator(val, validatePostcodeRegex))();
            validationService.validatePhone = (val => validator(val, validatePhoneRegex))();
            validationService.validateTaxIdentificationNumber = (val =>
                validator(val, validateTaxIdentificationNumberRegex))();
            validationService.validatePassword = (val => validator(val, passwordRegex))();
            validationService.validateMail = (val => validator(val, mailRegex))();
            validationService.validateToken = (val => validator(val, tokenRegex))();

            validationService.validateFloatNumber = (val => validator(val, floatNumberRegex(fractionalDigitis)))();
            validationService.validateIntegerNumber = (val => validator(val, integerRegex))();


            validationService.length = {
                name: {
                    min: 2,
                    max: 30,
                },
                tin: {
                    max: 20,
                },
                address: {
                    max: 70,
                },
                city: {
                    max: 35,
                },
                postcode: {
                    max: 20,
                },
                phone: {
                    min: 6,
                    max: 35
                },
                secret_answer: {
                    min: 4,
                    max: 50
                },
                password: {
                    min: 6,
                    max: 25
                },
                selfExclusionLimits: {
                    max: 20
                },
                selfExclusionOpenPositions: {
                    max: 4
                },
                selfExclusionSessionDuration: {
                    max: 5
                }
            }

            return validationService;
        }
    );

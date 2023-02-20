import { VerifyController } from './verify.controller';
describe('VerifyController', () => {
  let verifyController: VerifyController;

  beforeEach(() => {
    verifyController = new VerifyController();
  });

  describe('post', () => {
    it('minSizeError', () => {
      const result = verifyController.post({
        password: 'pass',
        rules: [
          {
            rule: 'minSize',
            value: 10,
          },
        ],
      });
      expect(result.noMatch[0]).toBe('minSize');
      expect(result.verify).toBe(false);
    });
    it('minUppercaseError', () => {
      const result = verifyController.post({
        password: 'pass',
        rules: [
          {
            rule: 'minUppercase',
            value: 10,
          },
        ],
      });
      expect(result.noMatch[0]).toBe('minUppercase');
      expect(result.verify).toBe(false);
    });
    it('minLowercaseError', () => {
      const result = verifyController.post({
        password: 'pass',
        rules: [
          {
            rule: 'minLowercase',
            value: 10,
          },
        ],
      });
      expect(result.noMatch[0]).toBe('minLowercase');
      expect(result.verify).toBe(false);
    });
    it('minDigitError', () => {
      const result = verifyController.post({
        password: 'pass',
        rules: [
          {
            rule: 'minDigit',
            value: 10,
          },
        ],
      });
      expect(result.noMatch[0]).toBe('minDigit');
      expect(result.verify).toBe(false);
    });
    it('minSpecialCharsError', () => {
      const result = verifyController.post({
        password: 'pass',
        rules: [
          {
            rule: 'minSpecialChars',
            value: 10,
          },
        ],
      });
      expect(result.noMatch[0]).toBe('minSpecialChars');
      expect(result.verify).toBe(false);
    });
    it('noRepetedError', () => {
      const result = verifyController.post({
        password: 'pass',
        rules: [
          {
            rule: 'noRepeted',
            value: 10,
          },
        ],
      });
      expect(result.noMatch[0]).toBe('noRepeted');
      expect(result.verify).toBe(false);
    });
    it('ShouldReturnNoError', () => {
      const result = verifyController.post({
        password: 'TesteSehaForte!123&',
        rules: [
          { rule: 'minSize', value: 8 },
          { rule: 'minSpecialChars', value: 2 },
          { rule: 'noRepeted', value: 0 },
          { rule: 'minDigit', value: 3 },
        ],
      });
      expect(result.noMatch.length).toBe(0);
      expect(result.verify).toBe(true);
    });
  });
});

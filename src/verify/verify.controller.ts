import { Body, Controller, Post } from '@nestjs/common';
import { VerifyBodyDTO } from './dto/veirfy-body.dto';

@Controller('verify')
export class VerifyController {
  passwordVerification = {
    minSize(str: string, number: number) {
      return str.length < number;
    },
    minUppercase(str: string, number: number) {
      const upperCases = str.replace(/[^A-Z]/g, '');
      return upperCases.length < number;
    },
    minLowercase(str: string, number: number) {
      const lowerCases = str.replace(/[^a-z]/g, '');
      return lowerCases.length < number;
    },
    minDigit(str: string, number: number) {
      const digits = str.replace(/[^0-9]/g, '');

      return digits.length < number;
    },
    minSpecialChars(str: string, number: number) {
      const specialChars = str.replace(/[A-Za-z0-9]/g, '');
      console.log(specialChars);
      return specialChars.length < number;
    },
    noRepeted(str: string) {
      const chars = str.split('');
      const hasRepeatedChar = !!chars.find(
        (char, index) => char === chars.at(index + 1),
      );
      return hasRepeatedChar;
    },
  };
  @Post()
  post(@Body() { password, rules }: VerifyBodyDTO): {
    verify: boolean;
    noMatch: Array<string>;
  } {
    const errors = rules.map((item) => {
      if (
        this.passwordVerification[item.rule] &&
        this.passwordVerification[item.rule](password, item.value)
      ) {
        return item.rule;
      }
    });
    const noMatch = errors.filter((item: string) => !!item);

    return { noMatch, verify: noMatch.length === 0 };
  }
}

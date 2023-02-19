import { Body, Controller, Post } from '@nestjs/common';
import { VerifyBodyDTO } from './dto/veirfy-body.dto';

@Controller('verify')
export class VerifyController {
  @Post()
  post(@Body() { password, rules }: VerifyBodyDTO) {
    const noMatch = rules.map((item) => {
      if (item.rule === 'minSize' && password.length < item.value) {
        return 'minSize';
      }
      if (
        item.rule == 'minUppercase' &&
        password.replace(/[^A-Z]/g, '').length < item.value
      ) {
        return 'minUppercase';
      }
      if (
        item.rule == 'minLowercase' &&
        password.replace(/[^a-z]/g, '').length < item.value
      ) {
        return 'minLowercase';
      }
      if (
        item.rule == 'minDigit' &&
        password.replace(/[^0-9]/g, '').length < item.value
      ) {
        return 'minDigit';
      }
      if (
        item.rule == 'minSpecialChars' &&
        password.replace(/[`!@#$%^&*()_+-=[]{};':"\|,.<>?~]/g, '').length <
          item.value
      ) {
        return 'minSpecialChars';
      }
      if (item.rule == 'noRepeted') {
        const chars = password.split('');
        const hasRepeatedChar = !!chars.find(
          (char, index) => char === chars.at(index + 1),
        );
        if (hasRepeatedChar) return 'noRepeted';
      }
    });

    return {
      verfiy: noMatch.length == 0,
      noMatch,
    };
  }
}

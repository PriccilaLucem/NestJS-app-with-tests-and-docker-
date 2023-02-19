interface Rules {
  rule: string;
  value?: number;
}
export interface VerifyBodyDTO {
  password: string;
  rules: Array<Rules>;
}

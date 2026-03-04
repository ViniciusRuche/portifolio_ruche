export function validateCpfCnpj(value: string): boolean {
    if (!value) return false;

    const digits = value.replace(/\D/g, "");

    if (digits.length === 11) return validateCPF(digits);
    if (digits.length === 14) return validateCNPJ(digits);

    return false;
}

function validateCPF(cpf: string): boolean {
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf[i]) * (10 - i);
    }
    let check = (sum * 10) % 11;
    if (check === 10) check = 0;
    if (check !== parseInt(cpf[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
    check = (sum * 10) % 11;
    if (check === 10) check = 0;
    
    return check === parseInt(cpf[10]);
}

function charToValue(c: string): number {
  if (/[0-9]/.test(c)) return parseInt(c);
  const code = c.toUpperCase().charCodeAt(0);
  if (code >= 65 && code <= 90) {
    return code - 48;
  }
  return NaN;
}

export function validateCNPJ(cnpj: string): boolean {
  if (!cnpj) return false;

  cnpj = cnpj.trim();

  if (cnpj.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpj)) return false;

  const base = cnpj.slice(0, 12);
  const dv = cnpj.slice(12);

  const values = [...base].map(charToValue);

  if (values.some(isNaN)) return false;

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const sum1 = values.reduce((acc, v, i) => acc + v * weights1[i], 0);
  const dv1 = sum1 % 11 < 2 ? 0 : 11 - (sum1 % 11);

  const sum2 = [...values, dv1].reduce((acc, v, i) => acc + v * weights2[i], 0);
  const dv2 = sum2 % 11 < 2 ? 0 : 11 - (sum2 % 11);

  return dv === `${dv1}${dv2}`;
}
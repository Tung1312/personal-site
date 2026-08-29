export function getAge(birthday: Date, now: Date = new Date()): number {
  let age = now.getFullYear() - birthday.getFullYear();
  const m = now.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birthday.getDate())) {
    age--;
  }
  return age;
}

export function generateNumberUid(): number {
  const uidString = 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
    return Math.floor(Math.random() * 10).toString();
  });
  return parseInt(uidString, 10);
}

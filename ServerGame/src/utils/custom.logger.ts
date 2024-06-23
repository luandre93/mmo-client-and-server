export class CustomLogger {
  public static log(message: string): void {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear().toString();
    const time = currentDate.toLocaleTimeString().substr(0, 8);
    const formattedDate = `[${day}-${month}-${year} - ${time}]`;
    console.log(`\x1b[32m${formattedDate}\x1b[0m ${message}`);
  }
}

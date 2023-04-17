export default (date: string) => Math.floor((Date.now() - new Date(date).getTime()) / 31536000000);

export class SayVidError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'YoutubeTranscriptFailError';
  }
}

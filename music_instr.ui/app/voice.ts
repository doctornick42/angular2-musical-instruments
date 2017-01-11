export class Voice {
    public oscillatorNode: OscillatorNode;
    public gainNode: GainNode;

    constructor(audioContext: AudioContext, frequency: number, waveForm: string) {
        this.oscillatorNode = audioContext.createOscillator();

        this.oscillatorNode = audioContext.createOscillator();
        this.oscillatorNode.type = waveForm;
        this.oscillatorNode.frequency.value = frequency; // value in hertz
        this.oscillatorNode.start(0);

        this.gainNode = audioContext.createGain();
        this.gainNode.gain.value = 0;

        //this.waveAnalyzer = this.audioCtx.createAnalyser();

        this.oscillatorNode.connect(this.gainNode);
    }
}
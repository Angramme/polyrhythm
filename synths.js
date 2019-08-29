const BindNoteAndDur = function(synth, note, dur){
    synth.m_note_to_play = note;
    //synth.m_duration_to_play = dur; <---- not needed for now
    return synth;
}

const CreateClickSynth = function(){
    return BindNoteAndDur( new Tone.Synth({
        oscillator: {
            type: 'sine',
            modulationFrequency: 0.2
        },
        envelope: {
            //attack: 0,
            decay: 0.1,
            //sustain: 0,
            release: 0.1,
        }  
    }), 440, 0.2).toMaster();
}

const CreateHiHatSynth = function(){
    var panner = new Tone.Panner(0.5).toMaster();
    var s = BindNoteAndDur( new Tone.NoiseSynth({
        volume:-15,
        filter : {
            Q : 1
        },
        envelope : {
            attack : 0.01,
            decay : 0.15
        },
        filterEnvelope : {
            attack : 0.01,
            decay : 0.03,
            baseFrequency : 4000,
            octaves : -2.5,
            exponent : 4,
        }
    }), 'C4', 0.17).connect(panner);

    // NoiseSynth doesn't take a note in, it breaks the system, thus the hacky fix below
    var old = s.triggerAttack;
    s.triggerAttack = function(note, time, vel){
        old.apply(this, [time, vel]);
    }

    return s;
}

const CreateKickSynth = function(){
    var panner = new Tone.Panner(-0.5).toMaster();
    return BindNoteAndDur(new Tone.MembraneSynth({
        pitchDecay: 0.05 ,
        octaves: 10 ,
        oscillator: {
            type: 'sine'
        }  ,
        envelope: {
            attack: 0.001 ,
            decay: 0.2 ,
            sustain: 0.05 ,
            release: 0.01 ,
            attackCurve: 'exponential'
        }
    }), 20, 0.2).connect(panner);
}

const CreateStringSynth = function(){
    return BindNoteAndDur(new Tone.PluckSynth({
        attackNoise  : 1 ,
        dampening  : 4000 ,
        resonance  : 0.7
    }), 'C4', 0.2).toMaster();
}

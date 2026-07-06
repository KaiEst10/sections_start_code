class SectionEvents {
  constructor() {
    // This will temporarily hold the signal to tell the Header to activate
    this.triggered = {};
  }

  getInfo() {
    return {
      id: 'sectionevents',
      name: 'Section Events',
      color1: '#4CBFE6', 
      color2: '#2E8EB0',
      blocks: [
        {
          opcode: 'whenSectionStarts',
          blockType: Scratch.BlockType.HAT, // Changed from EVENT to HAT for better reliability
          text: 'when section [SECTION] starts',
          arguments: {
            SECTION: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'say hello'
            }
          }
        },
        {
          opcode: 'sectionWrapper',
          blockType: Scratch.BlockType.CONDITIONAL,
          text: 'run section [SECTION]',
          arguments: {
            SECTION: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'say hello'
            }
          }
        }
      ]
    };
  }

  whenSectionStarts(args) {
    // The Header block constantly checks this. 
    // If it sees the signal, it fires the script and resets the signal!
    if (this.triggered[args.SECTION]) {
      this.triggered[args.SECTION] = false; 
      return true;
    }
    return false;
  }

  sectionWrapper(args) {
    // 1. Sends the signal to the Header block
    this.triggered[args.SECTION] = true;
    
    // 2. Returns true so the blocks INSIDE your C-block actually run
    return true; 
  }
}

Scratch.extensions.register(new SectionEvents());



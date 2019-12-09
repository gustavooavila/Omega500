
class Anims {


  constructor(anims) {

    this.current = null;
    this.all = null;
    if (anims.length) {
      this.all = anims;
      this.current = anims[0];
    }

  }

  tick() {

    this.current.tick();

  }

  add(anim) {

    if (!this.all) {
      this.all = [];
      this.current = anim;
    }
    this.all.push(anim);

  }

  each(func) {

    this.all.forEach(func);

  }

  get() {

    return this.current.name;

  }

  set(animName) {

    const anim = this.all.filter((anim) =>
      anim.name === animName
    );

    if (anim.length) {
      this.current = anim[0];
      this.current.reset();
    }

  }

  setTo(animName){
    if (this.get() !== animName) {
      this.set(animName);
    }
  }

  changed() {

    return this.current.changed;

  }

  rewound() {

    return this.current.rewound;

  }

  render(gfx, x, y) {

    this.current.render(gfx, x, y);

  }

}

module.exports = Anims;

// WallpaperMath engine - honest wallpaper ordering math.
// Pure logic, no DOM. Shared by app.html and the node test harness.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.WallpaperMath = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var TRIM_IN = 4;            // 2 in top + 2 in bottom per strip
  var ROLLS = {
    double: { label: 'Double roll (20.5 in x 33 ft)', widthIn: 20.5, lengthIn: 396 },
    wide:   { label: 'Wide double (27 in x 27 ft)',   widthIn: 27,   lengthIn: 324 },
    single: { label: 'Single roll (20.5 in x 16.5 ft)', widthIn: 20.5, lengthIn: 198 }
  };

  function round2(x) { return Math.round(x * 100) / 100; }

  // Strip length in inches: wall height + trim, rounded UP to a whole pattern
  // repeat for straight/drop matches (random match wastes nothing on repeats).
  function stripLengthIn(heightFt, repeatIn, match) {
    var base = heightFt * 12 + TRIM_IN;
    if (match === 'random' || !repeatIn || repeatIn <= 0) return base;
    return Math.ceil(base / repeatIn) * repeatIn;
  }

  function plan(opts) {
    var roll = ROLLS[opts.rollType];
    var perimIn = 2 * (opts.lengthFt + opts.widthFt) * 12;
    var stripsNeeded = Math.ceil(perimIn / roll.widthIn);
    var stripIn = stripLengthIn(opts.heightFt, opts.repeatIn || 0, opts.match);
    var stripsPerRoll = Math.max(1, Math.floor(roll.lengthIn / stripIn));
    var rollsNeeded = Math.ceil(stripsNeeded / stripsPerRoll);
    var spareStrips = rollsNeeded * stripsPerRoll - stripsNeeded;
    var wallSqFt = round2(perimIn * (opts.heightFt * 12) / 144);
    var repeatWastePct = round2((stripIn - (opts.heightFt * 12 + TRIM_IN)) / stripIn * 100);
    var totalCost = round2(rollsNeeded * (opts.pricePerRoll || 0));
    return {
      rollLabel: roll.label,
      rollWidthIn: roll.widthIn,
      wallSqFt: wallSqFt,
      perimeterFt: round2(perimIn / 12),
      stripsNeeded: stripsNeeded,
      stripIn: stripIn,
      stripsPerRoll: stripsPerRoll,
      rollsNeeded: rollsNeeded,
      spareStrips: spareStrips,
      repeatWastePct: repeatWastePct,
      totalCost: totalCost
    };
  }

  return { plan: plan, stripLengthIn: stripLengthIn, ROLLS: ROLLS, round2: round2 };
});

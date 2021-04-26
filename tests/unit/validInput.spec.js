const validateInput = (input, type) => {
  const rule1 = /^-?[1-9][0-9]*\.[0-9]+$/
  const rule2 = /^-?[1-9][0-9]*$/
  const rule3 = /^-?0\.[0-9]+/
  const rule4 = /^0$/

  return rule1.test(input) || rule2.test(input) || rule3.test(input) || rule4.test(input);
}

describe("input validation tests", () => {
  it('only correct inputs for longitude', () => {
    const inputs = ["20", "67", "32", "10", "180", "-180", "-0.32", "-178.0329", "17.0932", "-8.098",
      "-0.1290"]
    for (let i = 0; i < inputs.length; i++) {
      expect(validateInput(inputs[i], "lon")).toEqual(true);
    }
  });

  it('only correct inputs for latitude', () => {
    const inputs = ["20", "67", "32", "10", "-0.32", "17.0932", "-8.098",
      "-0.1290", "-90", "90", "-0.90", "-89.98"]
    for (let i = 0; i < inputs.length; i++) {
      expect(validateInput(inputs[i], "lon")).toEqual(true);
    }
  });

  it('only wrong inputs for longitude', () => {
    const inputs = ["test","12,93", "-23-32",
      "21*31;21"]
    for (let i = 0; i < inputs.length; i++) {
      expect(validateInput(inputs[i], "lon")).toEqual(false);
    }
  });

  it('only wrong inputs for latitude', () => {
    const inputs = ["test", "90.32-", "12,93", "-23-32",
      "21*31;21"]
    for (let i = 0; i < inputs.length; i++) {
      expect(validateInput(inputs[i], "lat")).toEqual(false);
    }
  });
});
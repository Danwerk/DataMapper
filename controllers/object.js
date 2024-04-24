import express from "express";

const router = express.Router();

router.post("/rules/remove-by-intent-name", async (req, res) => {
  const { rulesJson, searchIntentName } = req.body;
  const strRegExPattern = ".*\\b" + searchIntentName + "\\b.*";
  const regExp = new RegExp(strRegExPattern);

  const result = rulesJson
    .map((entry) => {
      const containsSearchTerm = regExp.test(JSON.stringify(entry));
      if (!containsSearchTerm) return entry;
    })
    .filter((value) => value);

  return res.status(200).send({ result });
});

router.post("/replace/key-value-in-obj", async (req, res) => {
  let { object, oldKey, newKey, newValue } = req.body;

  const result = Object.entries(object).reduce((acc, [key, value]) => {
    if (key === oldKey) {
      acc[newKey] = newValue;
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});

  res.json(result);
});

router.post("/array/replace-next-element", async (req, res) => {
  const { array, element, newInput } = req.body;

  const index = array.indexOf(element);

  if (index !== -1 && index < array.length - 1) {
    array[index + 1] = newInput.toString();
  }

  return res.status(200).send({ array });
});

export default router;
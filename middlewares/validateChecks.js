import { validationResult } from "express-validator";

const validateChecks = (req, res, next) => {
  const errors = validationResult(req);

  return { errors: errors.array(), ok: errors.isEmpty() };
};

const validateChecksNext = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) next();

  return { errors: errors.array(), ok: errors.isEmpty() };
};

export { validateChecks, validateChecksNext };

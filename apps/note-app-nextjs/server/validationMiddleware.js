// middleware/validation.ts

// Special character check
export function validateSpecialChars(fields) {
  return (req, res, next) => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/;

    for (const field of fields) {
      const value = String(req.body[field] ?? '');
      if (regex.test(value)) {
        return res.status(400).json({
          error: `Field "${field}" contains special characters, which are not allowed`,
        });
      }
    }
    next();
  };
}

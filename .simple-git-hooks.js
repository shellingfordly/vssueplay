module.exports = {
  "pre-commit": "pnpm exec lint-staged",
  "commit-msg": "pnpm exec tsx ./scripts/commit.ts",
};

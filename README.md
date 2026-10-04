
```sh
npm install
npm run dev        # localhost:4321
npm test           # data-integrity tests (Vitest)
npm run build      # static build to dist/
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`: test, build, publish to GitHub Pages.

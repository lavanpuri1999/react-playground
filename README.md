Package.json: Keeps a track of the versions of your dependencies for your project
Package-lock.json: It ensures that the exact same versions of dependencies are installed across different environments, preventing inconsistencies and potential bugs. It enables precise replication of project environments

npm: resolves all the dependencies revursively starting from a package you want to install and goes
inside their package.json to install those dependencies FIRST, so and so forth

Dev dependencies: Required while developing
Dependencies: Required by the app in production as well

Bundler concepts
Bundler: 
Examples: Webpack, Vite, Parcel, rsbuild

What does a bundler like Parcel do for us?
- Creates a dev build
- Local Server
- HMR = Hot Module Replacement
- File Watching Algorithm - written in C++
- Caching - Faster builds because it caches stuff for us (.parcel-cache in project folder)
- Image optimization for assets
- Minification
- Bundling
- Compressing your files
- Consistent hashing
- Code splitting
- Differential bundling to support older browsers
- HTTPs: can run your project in https mode as well
- Tree shaking - remove unused code for you from files
- Different dev and prod bundles

When you run npx parcel build react_from_scratch.html - parcel will create a dist folder that contains the production build for your project
# CODEMOS CLI 

:warning: We are still building here... :construction:
Allow to create, develop, run and deploy a course.

# CODEMOS FOLDER STRUCTURE

Inspired by:
- (Docusaurus config)[https://docusaurus.io/docs/configuration]
- (Vitepress config)[https://vitepress.dev/reference/site-config]
- Hugo, Gatsby, and so many others...


Structure:

```
codemos/
   0. welcome.md              # A standalone page
   1. basics/
      _metas.yml              # Chapter-specific metadata (.metas.yml or _metas.yml)
      1.1 install.md          # A page within the "basics" chapter
   2. go further/
      2.1 sub-chapter/
         _metas.yml           # Sub-chapter-specific metadata
         2.1.1 page.md        # A page within the sub-chapter

codemos.json                  # Config object for the entire course
``` 

# CODEMOS Q4 2024 ROADMAP

- [ ] migrate to TS 
- [ ] use Prettier 
- [ ] run command
- [ ] deploy command  
- [ ] testing with unit tests or integration tests (scenarios based)
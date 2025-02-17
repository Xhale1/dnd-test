/* eslint-disable no-template-curly-in-string */

module.exports = {
  git: {
    commitMessage: "chore: release ${version}",
    tagName: "v${version}",
  },
  npm: {
    publish: true,
  },
  github: {
    release: true,
  },
  plugins: {
    "@release-it/conventional-changelog": {
      infile: "CHANGELOG.md",
      preset: {
        name: "conventionalcommits",
        types: [
          {
            type: "chore",
            section: "Others 🔧",
            hidden: false,
          },
          {
            type: "revert",
            section: "Reverts ◀",
            hidden: false,
          },
          {
            type: "feat",
            section: "Features 🔥",
            hidden: false,
          },
          {
            type: "fix",
            section: "Bug Fixes 🛠",
            hidden: false,
          },
          {
            type: "improvement",
            section: "Feature Improvements 🛠",
            hidden: false,
          },
          {
            type: "docs",
            section: "Docs 📃",
            hidden: false,
          },
          {
            type: "style",
            section: "Styling 🎨",
            hidden: false,
          },
          {
            type: "refactor",
            section: "Code Refactoring 🖌",
            hidden: false,
          },
          {
            type: "perf",
            section: "Performance Improvements 🏎",
            hidden: false,
          },
          {
            type: "test",
            section: "Tests 🧪",
            hidden: false,
          },
          {
            type: "build",
            section: "Build System 🏗",
            hidden: false,
          },
          {
            type: "ci",
            section: "CI 🛠",
            hidden: false,
          },
        ],
      },
    },
  },
};

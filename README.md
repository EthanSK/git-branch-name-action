# git-branch-name-action

Gets the current git branch name of the running action for both pull_request and push triggers.

## Usage

```
on: [push, pull_request]

jobs:
  main_job:
    runs-on: ubuntu-latest
    steps:
      - name: Git branch name
        id: git-branch-name
        uses: EthanSK/git-branch-name-action@v1
      - name: Echo the branch name
        run: echo "Branch name ${GIT_BRANCH_NAME}"
```

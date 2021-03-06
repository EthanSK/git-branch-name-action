const core = require("@actions/core")

async function run() {
  try {
    const isPullRequest = !!process.env.GITHUB_HEAD_REF //GITHUB_HEAD_REF is only set for pull request events https://docs.github.com/en/actions/reference/environment-variables

    let branchName
    if (isPullRequest && process.env.GITHUB_HEAD_REF) {
      branchName = process.env.GITHUB_HEAD_REF
    } else {
      if (!process.env.GITHUB_REF) {
        throw new Error("GITHUB_EVENT_PATH env var not set")
      }
      branchName = process.env.GITHUB_REF.split("/")
        .slice(2)
        .join("/")
        .replace(/\//g, "-")
    }

    core.exportVariable("GIT_BRANCH_NAME", branchName)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

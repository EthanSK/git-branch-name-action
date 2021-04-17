import * as core from "@actions/core"

async function run() {
  try {
    if (!process.env.GITHUB_EVENT_PATH) {
      throw new Error("GITHUB_EVENT_PATH env var not set")
    }

    const isPullRequest = !!process.env.GITHUB_HEAD_REF //GITHUB_HEAD_REF is only set for pull request events https://docs.github.com/en/actions/reference/environment-variables

    let branchName: string
    if (isPullRequest && process.env.GITHUB_HEAD_REF) {
      branchName = process.env.GITHUB_HEAD_REF
    } else {
      // if (!process.env.GITHUB_REF) {
      //   throw new Error("GITHUB_EVENT_PATH env var not set")
      // }
      core.info("GITHUB_REF value: " + process.env.GITHUB_REF)
      core.debug("GITHUB_REF value: " + process.env.GITHUB_REF)
      console.log("GITHUB_REF value: " + process.env.GITHUB_REF)
      branchName = process.env.GITHUB_REF!
      // .split("/")
      //   .slice(2)
      //   .join("/")
      //   .replace(/\//g, "-")
    }

    core.exportVariable("GIT_BRANCH_NAME", process.env.GITHUB_REF)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

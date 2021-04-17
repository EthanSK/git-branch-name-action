import * as core from "@actions/core";
import { readFileSync } from "fs";

async function run() {
  try {
    if (!process.env.GITHUB_EVENT_PATH) {
      throw new Error("GITHUB_EVENT_PATH env var not set");
    }
    const event = JSON.parse(
      readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")
    );
    const isPullRequest = !!event.pull_request;

    let branchName;
    if (isPullRequest) {
      branchName = event.pull_request.head.ref;
    } else {
      if (!process.env.GITHUB_REF) {
        throw new Error("GITHUB_EVENT_PATH env var not set");
      }
      branchName = process.env.GITHUB_REF.split("/").slice(2).join("/").replace;
    }

    core.exportVariable("GIT_BRANCH_NAME", branchName);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
